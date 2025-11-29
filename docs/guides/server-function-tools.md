# Server Function Tools

`createServerFnTool` is a helper that creates a tool definition, server implementation, and callable server function from a single definition.

## Why This Exists

In traditional setups, you might define the same logic twice:

```typescript
// ❌ Duplicate logic
// For AI tool
const getProductsTool = toolDefinition(...).server(async (args) => {
  return await db.products.search(args.query)
})

// For direct server function calls
export async function getProducts(query: string) {
  return await db.products.search(query)
}
```

With `createServerFnTool`, **define once and get both**:

```typescript
// ✅ Single definition
const getProducts = createServerFnTool({
  name: 'getProducts',
  inputSchema: z.object({ query: z.string() }),
  execute: async ({ query }) => db.products.search(query),
})

// Use in AI chat: getProducts.server
// Call from components: getProducts.serverFn({ query: 'laptop' })
```

## Works With or Without TanStack Start

**Without TanStack Start:** You get a validated server function that you can call directly from your API routes or components.

**With TanStack Start:** Even better integration - the `serverFn` works seamlessly with TanStack Start's server function system for features like prefetching, caching, and more.

We think TanStack AI + TanStack Start is the best way to build AI applications, but it absolutely works without it!

## Installation

Available in both `@tanstack/ai-react` and `@tanstack/ai-solid`.

## Basic Usage

```typescript
import { createServerFnTool } from '@tanstack/ai-react' // or '@tanstack/ai-solid'
import { z } from 'zod'

const getGuitarsTool = createServerFnTool({
  name: 'getGuitars',
  description: 'Get all guitars from the database',
  inputSchema: z.object({
    style: z.string().optional(),
    priceRange: z.object({
      min: z.number(),
      max: z.number(),
    }).optional(),
  }),
  outputSchema: z.array(z.object({
    id: z.string(),
    name: z.string(),
    brand: z.string(),
    price: z.number(),
    style: z.string(),
  })),
  execute: async ({ style, priceRange }) => {
    // This runs on the server
    return await db.guitars.findMany({
      where: {
        ...(style && { style }),
        ...(priceRange && {
          price: {
            gte: priceRange.min,
            lte: priceRange.max,
          },
        }),
      },
    })
  },
})
```

## What You Get

`createServerFnTool` returns an object with three properties:

### 1. `toolDefinition`

The base tool definition (for client-side execution):

```typescript
// In your API route
chat({
  adapter: openai(),
  messages,
  tools: [getGuitarsTool.toolDefinition], // Client will execute
})
```

### 2. `server`

The server tool implementation (for server-side execution):

```typescript
// In your API route
chat({
  adapter: openai(),
  messages,
  tools: [getGuitarsTool.server], // Server will execute
})
```

### 3. `serverFn`

A callable server function with automatic Zod validation:

```typescript
// In your React/Solid component
function GuitarList() {
  const [guitars, setGuitars] = useState([])
  
  const loadGuitars = async () => {
    // Call directly with full type safety!
    const result = await getGuitarsTool.serverFn({
      style: 'acoustic',
      priceRange: { min: 500, max: 2000 },
    })
    setGuitars(result)
  }
  
  return (
    <div>
      <button onClick={loadGuitars}>Load Guitars</button>
      {/* Render guitars */}
    </div>
  )
}
```

## Complete Example

```typescript
// lib/guitar-tools.ts
import { createServerFnTool } from '@tanstack/ai-react'
import { z } from 'zod'
import { db } from './db'

export const getGuitarsTool = createServerFnTool({
  name: 'getGuitars',
  description: 'Search for guitars in the catalog',
  inputSchema: z.object({
    query: z.string().optional(),
    maxPrice: z.number().optional(),
  }),
  outputSchema: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  })),
  execute: async ({ query, maxPrice }) => {
    return await db.guitars.findMany({
      where: {
        ...(query && {
          name: { contains: query, mode: 'insensitive' },
        }),
        ...(maxPrice && {
          price: { lte: maxPrice },
        }),
      },
    })
  },
})

export const createOrderTool = createServerFnTool({
  name: 'createOrder',
  description: 'Create a new order for a guitar',
  inputSchema: z.object({
    guitarId: z.string(),
    quantity: z.number(),
  }),
  outputSchema: z.object({
    orderId: z.string(),
    total: z.number(),
  }),
  needsApproval: true, // Requires user approval
  execute: async ({ guitarId, quantity }) => {
    const guitar = await db.guitars.findUnique({ where: { id: guitarId } })
    const order = await db.orders.create({
      data: { guitarId, quantity },
    })
    return {
      orderId: order.id,
      total: guitar.price * quantity,
    }
  },
})

// api/chat/route.ts
import { chat, toStreamResponse } from '@tanstack/ai'
import { openai } from '@tanstack/ai-openai'
import { getGuitarsTool, createOrderTool } from '@/lib/guitar-tools'

export async function POST(request: Request) {
  const { messages } = await request.json()

  const stream = chat({
    adapter: openai(),
    messages,
    model: 'gpt-4o',
    tools: [
      getGuitarsTool.server,    // AI can search guitars
      createOrderTool.server,   // AI can create orders (with approval)
    ],
  })

  return toStreamResponse(stream)
}

// components/GuitarSearch.tsx
import { getGuitarsTool } from '@/lib/guitar-tools'
import { useState } from 'react'

function GuitarSearch() {
  const [guitars, setGuitars] = useState([])
  const [loading, setLoading] = useState(false)

  const searchGuitars = async (query: string) => {
    setLoading(true)
    try {
      // Call server function directly - fully typed!
      const results = await getGuitarsTool.serverFn({
        query,
        maxPrice: 2000,
      })
      setGuitars(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => searchGuitars(e.target.value)}
        placeholder="Search guitars..."
      />
      {loading && <div>Loading...</div>}
      {guitars.map((guitar) => (
        <div key={guitar.id}>
          {guitar.name} - ${guitar.price}
        </div>
      ))}
    </div>
  )
}
```

## Benefits

### 1. **Single Definition**
Define your tool schema and execution logic once, use it in multiple ways.

### 2. **Full Type Safety**
Zod schemas provide end-to-end type safety from server to client.

### 3. **Automatic Validation**
Input arguments are automatically validated against the Zod schema.

### 4. **Code Reuse**
Share the same logic between AI tools and regular server functions.

### 5. **Flexibility**
Choose whether to execute tools server-side (via AI) or call them directly from components.

## Type Safety Example

```typescript
const guitarTool = createServerFnTool({
  name: 'getGuitar',
  inputSchema: z.object({
    id: z.string(),
  }),
  outputSchema: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  }),
  execute: async ({ id }) => {
    return await db.guitars.findUnique({ where: { id } })
  },
})

// ✅ Fully typed!
const guitar = await guitarTool.serverFn({ id: '123' })
//    ^ { id: string, name: string, price: number }

// ❌ Type error - missing required field
const guitar = await guitarTool.serverFn({})

// ❌ Type error - wrong type
const guitar = await guitarTool.serverFn({ id: 123 })
```

## With Approval Flow

```typescript
const purchaseTool = createServerFnTool({
  name: 'purchaseGuitar',
  description: 'Purchase a guitar',
  inputSchema: z.object({
    guitarId: z.string(),
    quantity: z.number(),
  }),
  outputSchema: z.object({
    orderId: z.string(),
    total: z.number(),
  }),
  needsApproval: true, // Requires user approval when used in AI chat
  execute: async ({ guitarId, quantity }) => {
    const guitar = await db.guitars.findUnique({ where: { id: guitarId } })
    const order = await db.orders.create({
      data: { guitarId, quantity, total: guitar.price * quantity },
    })
    return {
      orderId: order.id,
      total: order.total,
    }
  },
})

// In AI chat - requires approval
chat({ tools: [purchaseTool.server] })

// Direct call - no approval needed
const order = await purchaseTool.serverFn({
  guitarId: '123',
  quantity: 2,
})
```

## Comparison: With vs Without TanStack Start

### Without TanStack Start (Any Framework)

```typescript
// Define tool
const getProductsDef = toolDefinition({
  name: 'getProducts',
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.array(z.object({ id: z.string(), name: z.string() })),
})

// AI tool implementation
const getProductsServer = getProductsDef.server(async ({ query }) => {
  return await db.products.search(query)
})

// Separate server function for direct calls
export async function fetchProducts(query: string) {
  return await db.products.search(query) // ❌ Duplicate logic!
}

// In API route
chat({ tools: [getProductsServer] })

// In component (requires manual API call)
const response = await fetch('/api/products', {
  method: 'POST',
  body: JSON.stringify({ query: 'laptop' }),
})
const products = await response.json()
```

### With TanStack Start (Better!)

```typescript
import { createServerFnTool } from '@tanstack/ai-react'

// ✅ Single definition for both!
const getProducts = createServerFnTool({
  name: 'getProducts',
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.array(z.object({ id: z.string(), name: z.string() })),
  execute: async ({ query }) => db.products.search(query),
})

// In AI chat - same implementation
chat({ tools: [getProducts.server] })

// In component - same implementation, fully typed!
const products = await getProducts.serverFn({ query: 'laptop' })
```

**Benefits:**
- ✅ **No duplicate logic** - Write once, use everywhere
- ✅ **Full type safety** - Zod types flow to both AI and components
- ✅ **Automatic validation** - Input validation for both paths
- ✅ **Better DX** - Less code, more features

## Best Practices

1. **Define schemas once** - Keep tool definitions in a shared location
2. **Use outputSchema** - Ensures consistent response types
3. **Handle errors in execute** - Return error states in your output schema
4. **Keep execute functions pure** - Avoid side effects outside the function
5. **Use TypeScript** - Let Zod infer types for maximum safety

## Next Steps

- [Tools Overview](./tools.md) - Learn about the isomorphic tool system
- [Server Tools](./server-tools.md) - Deep dive into server-side tools
- [Client Tools](./client-tools.md) - Deep dive into client-side tools
- [Tool Approval Flow](./tool-approval.md) - Implementing approval workflows
