---
id: assertMessages
title: assertMessages
---

# Function: assertMessages()

```ts
function assertMessages<TAdapter, TModel>(_options, msgs): TAdapter extends AIAdapter<any, any, any, any, any, ModelInputModalities> ? TModel extends keyof ModelInputModalities ? ModelInputModalities[TModel<TModel>] extends readonly Modality[] ? ConstrainedModelMessage<any[any]>[] : ModelMessage<
  | string
  | ContentPart<unknown, unknown, unknown, unknown>[]
  | null>[] : ModelMessage<
  | string
  | ContentPart<unknown, unknown, unknown, unknown>[]
  | null>[] : ModelMessage<
  | string
  | ContentPart<unknown, unknown, unknown, unknown>[]
  | null>[];
```

Defined in: [utilities/messages.ts:99](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/utilities/messages.ts#L99)

Type assertion helper that narrows an array of unknown messages to be
compatible with a specific model's input modalities.

Use this when you have messages from an external source (like request.json())
that you want to use with a type-safe chat call. This is a type-level assertion
and does NOT perform runtime validation.

## Type Parameters

### TAdapter

`TAdapter` *extends* [`AIAdapter`](../interfaces/AIAdapter.md)\<`any`, `any`, `any`, `any`, `any`, `any`\>

### TModel

`TModel` *extends* `any`

## Parameters

### \_options

#### adapter

`TAdapter`

#### model

`TModel`

### msgs

`unknown`

## Returns

`TAdapter` *extends* [`AIAdapter`](../interfaces/AIAdapter.md)\<`any`, `any`, `any`, `any`, `any`, `ModelInputModalities`\> ? `TModel` *extends* keyof `ModelInputModalities` ? `ModelInputModalities`\[`TModel`\<`TModel`\>\] *extends* readonly [`Modality`](../type-aliases/Modality.md)[] ? [`ConstrainedModelMessage`](../type-aliases/ConstrainedModelMessage.md)\<`any`\[`any`\]\>[] : [`ModelMessage`](../interfaces/ModelMessage.md)\<
  \| `string`
  \| [`ContentPart`](../type-aliases/ContentPart.md)\<`unknown`, `unknown`, `unknown`, `unknown`\>[]
  \| `null`\>[] : [`ModelMessage`](../interfaces/ModelMessage.md)\<
  \| `string`
  \| [`ContentPart`](../type-aliases/ContentPart.md)\<`unknown`, `unknown`, `unknown`, `unknown`\>[]
  \| `null`\>[] : [`ModelMessage`](../interfaces/ModelMessage.md)\<
  \| `string`
  \| [`ContentPart`](../type-aliases/ContentPart.md)\<`unknown`, `unknown`, `unknown`, `unknown`\>[]
  \| `null`\>[]

## Example

```typescript
import { assertMessages, chat } from '@tanstack/ai'
import { openai } from '@tanstack/ai-openai'

const adapter = openai()
const { messages: incomingMessages } = await request.json()

// Assert that incoming messages are compatible with gpt-4o
const typedMessages = assertMessages({ adapter, model: 'gpt-4o' }, incomingMessages)

// Now you can safely spread them without polluting type inference
const stream = chat({
  adapter,
  model: 'gpt-4o',
  messages: [
    ...typedMessages,
    { role: 'user', content: [{ type: 'text', text: 'Hello' }] }
  ]
})
```

## Warning

This is a compile-time assertion only. If the runtime data doesn't
match the expected shape, you may get runtime errors. For runtime validation,
use a schema validation library like Zod.
