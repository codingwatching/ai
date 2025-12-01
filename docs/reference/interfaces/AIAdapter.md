---
id: AIAdapter
title: AIAdapter
---

# Interface: AIAdapter\<TChatModels, TEmbeddingModels, TChatProviderOptions, TEmbeddingProviderOptions, TModelProviderOptionsByName, TModelInputModalitiesByName\>

Defined in: [types.ts:614](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L614)

AI adapter interface with support for endpoint-specific models and provider options.

Generic parameters:
- TChatModels: Models that support chat/text completion
- TEmbeddingModels: Models that support embeddings
- TChatProviderOptions: Provider-specific options for chat endpoint
- TEmbeddingProviderOptions: Provider-specific options for embedding endpoint
- TModelProviderOptionsByName: Map from model name to its specific provider options
- TModelInputModalitiesByName: Map from model name to its supported input modalities

## Type Parameters

### TChatModels

`TChatModels` *extends* `ReadonlyArray`\<`string`\> = `ReadonlyArray`\<`string`\>

### TEmbeddingModels

`TEmbeddingModels` *extends* `ReadonlyArray`\<`string`\> = `ReadonlyArray`\<`string`\>

### TChatProviderOptions

`TChatProviderOptions` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

### TEmbeddingProviderOptions

`TEmbeddingProviderOptions` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

### TModelProviderOptionsByName

`TModelProviderOptionsByName` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

### TModelInputModalitiesByName

`TModelInputModalitiesByName` *extends* `Record`\<`string`, `ReadonlyArray`\<[`Modality`](../type-aliases/Modality.md)\>\> = `Record`\<`string`, `ReadonlyArray`\<[`Modality`](../type-aliases/Modality.md)\>\>

## Properties

### \_chatProviderOptions?

```ts
optional _chatProviderOptions: TChatProviderOptions;
```

Defined in: [types.ts:634](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L634)

***

### \_embeddingProviderOptions?

```ts
optional _embeddingProviderOptions: TEmbeddingProviderOptions;
```

Defined in: [types.ts:635](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L635)

***

### \_modelInputModalitiesByName?

```ts
optional _modelInputModalitiesByName: TModelInputModalitiesByName;
```

Defined in: [types.ts:647](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L647)

Type-only map from model name to its supported input modalities.
Used by the core AI types to narrow ContentPart types based on the selected model.
Must be provided by all adapters.

***

### \_modelProviderOptionsByName

```ts
_modelProviderOptionsByName: TModelProviderOptionsByName;
```

Defined in: [types.ts:641](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L641)

Type-only map from model name to its specific provider options.
Used by the core AI types to narrow providerOptions based on the selected model.
Must be provided by all adapters.

***

### \_providerOptions?

```ts
optional _providerOptions: TChatProviderOptions;
```

Defined in: [types.ts:633](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L633)

***

### chatStream()

```ts
chatStream: (options) => AsyncIterable<StreamChunk>;
```

Defined in: [types.ts:650](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L650)

#### Parameters

##### options

[`ChatOptions`](./ChatOptions.md)\<`string`, `TChatProviderOptions`\>

#### Returns

`AsyncIterable`\<[`StreamChunk`](../type-aliases/StreamChunk.md)\>

***

### createEmbeddings()

```ts
createEmbeddings: (options) => Promise<EmbeddingResult>;
```

Defined in: [types.ts:658](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L658)

#### Parameters

##### options

[`EmbeddingOptions`](./EmbeddingOptions.md)

#### Returns

`Promise`\<[`EmbeddingResult`](./EmbeddingResult.md)\>

***

### embeddingModels?

```ts
optional embeddingModels: TEmbeddingModels;
```

Defined in: [types.ts:630](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L630)

Models that support embeddings

***

### models

```ts
models: TChatModels;
```

Defined in: [types.ts:627](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L627)

Models that support chat/text completion

***

### name

```ts
name: string;
```

Defined in: [types.ts:625](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L625)

***

### summarize()

```ts
summarize: (options) => Promise<SummarizationResult>;
```

Defined in: [types.ts:655](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/types.ts#L655)

#### Parameters

##### options

[`SummarizationOptions`](./SummarizationOptions.md)

#### Returns

`Promise`\<[`SummarizationResult`](./SummarizationResult.md)\>
