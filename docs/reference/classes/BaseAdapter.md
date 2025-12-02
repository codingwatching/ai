---
id: BaseAdapter
title: BaseAdapter
---

# Abstract Class: BaseAdapter\<TChatModels, TEmbeddingModels, TChatProviderOptions, TEmbeddingProviderOptions, TModelProviderOptionsByName, TModelInputModalitiesByName\>

Defined in: [base-adapter.ts:24](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L24)

Base adapter class with support for endpoint-specific models and provider options.

Generic parameters:
- TChatModels: Models that support chat/text completion
- TEmbeddingModels: Models that support embeddings
- TChatProviderOptions: Provider-specific options for chat endpoint
- TEmbeddingProviderOptions: Provider-specific options for embedding endpoint
- TModelProviderOptionsByName: Provider-specific options for model by name
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

## Implements

- [`AIAdapter`](../interfaces/AIAdapter.md)\<`TChatModels`, `TEmbeddingModels`, `TChatProviderOptions`, `TEmbeddingProviderOptions`, `TModelProviderOptionsByName`, `TModelInputModalitiesByName`\>

## Constructors

### Constructor

```ts
new BaseAdapter<TChatModels, TEmbeddingModels, TChatProviderOptions, TEmbeddingProviderOptions, TModelProviderOptionsByName, TModelInputModalitiesByName>(config): BaseAdapter<TChatModels, TEmbeddingModels, TChatProviderOptions, TEmbeddingProviderOptions, TModelProviderOptionsByName, TModelInputModalitiesByName>;
```

Defined in: [base-adapter.ts:58](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L58)

#### Parameters

##### config

[`AIAdapterConfig`](../interfaces/AIAdapterConfig.md) = `{}`

#### Returns

`BaseAdapter`\<`TChatModels`, `TEmbeddingModels`, `TChatProviderOptions`, `TEmbeddingProviderOptions`, `TModelProviderOptionsByName`, `TModelInputModalitiesByName`\>

## Properties

### \_chatProviderOptions?

```ts
optional _chatProviderOptions: TChatProviderOptions;
```

Defined in: [base-adapter.ts:51](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L51)

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`_chatProviderOptions`](../interfaces/AIAdapter.md#_chatprovideroptions)

***

### \_embeddingProviderOptions?

```ts
optional _embeddingProviderOptions: TEmbeddingProviderOptions;
```

Defined in: [base-adapter.ts:52](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L52)

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`_embeddingProviderOptions`](../interfaces/AIAdapter.md#_embeddingprovideroptions)

***

### \_modelInputModalitiesByName?

```ts
optional _modelInputModalitiesByName: TModelInputModalitiesByName;
```

Defined in: [base-adapter.ts:56](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L56)

Type-only map from model name to its supported input modalities.
Used by the core AI types to narrow ContentPart types based on the selected model.
Must be provided by all adapters.

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`_modelInputModalitiesByName`](../interfaces/AIAdapter.md#_modelinputmodalitiesbyname)

***

### \_modelProviderOptionsByName

```ts
_modelProviderOptionsByName: TModelProviderOptionsByName;
```

Defined in: [base-adapter.ts:54](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L54)

Type-only map from model name to its specific provider options.
Used by the core AI types to narrow providerOptions based on the selected model.
Must be provided by all adapters.

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`_modelProviderOptionsByName`](../interfaces/AIAdapter.md#_modelprovideroptionsbyname)

***

### \_providerOptions?

```ts
optional _providerOptions: TChatProviderOptions;
```

Defined in: [base-adapter.ts:50](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L50)

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`_providerOptions`](../interfaces/AIAdapter.md#_provideroptions)

***

### config

```ts
protected config: AIAdapterConfig;
```

Defined in: [base-adapter.ts:47](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L47)

***

### embeddingModels?

```ts
optional embeddingModels: TEmbeddingModels;
```

Defined in: [base-adapter.ts:46](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L46)

Models that support embeddings

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`embeddingModels`](../interfaces/AIAdapter.md#embeddingmodels)

***

### models

```ts
abstract models: TChatModels;
```

Defined in: [base-adapter.ts:45](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L45)

Models that support chat/text completion

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`models`](../interfaces/AIAdapter.md#models)

***

### name

```ts
abstract name: string;
```

Defined in: [base-adapter.ts:44](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L44)

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`name`](../interfaces/AIAdapter.md#name)

## Methods

### chatStream()

```ts
abstract chatStream(options): AsyncIterable<StreamChunk>;
```

Defined in: [base-adapter.ts:62](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L62)

#### Parameters

##### options

[`ChatOptions`](../interfaces/ChatOptions.md)

#### Returns

`AsyncIterable`\<[`StreamChunk`](../type-aliases/StreamChunk.md)\>

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`chatStream`](../interfaces/AIAdapter.md#chatstream)

***

### createEmbeddings()

```ts
abstract createEmbeddings(options): Promise<EmbeddingResult>;
```

Defined in: [base-adapter.ts:67](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L67)

#### Parameters

##### options

[`EmbeddingOptions`](../interfaces/EmbeddingOptions.md)

#### Returns

`Promise`\<[`EmbeddingResult`](../interfaces/EmbeddingResult.md)\>

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`createEmbeddings`](../interfaces/AIAdapter.md#createembeddings)

***

### generateId()

```ts
protected generateId(): string;
```

Defined in: [base-adapter.ts:69](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L69)

#### Returns

`string`

***

### summarize()

```ts
abstract summarize(options): Promise<SummarizationResult>;
```

Defined in: [base-adapter.ts:64](https://github.com/TanStack/ai/blob/main/packages/typescript/ai/src/base-adapter.ts#L64)

#### Parameters

##### options

[`SummarizationOptions`](../interfaces/SummarizationOptions.md)

#### Returns

`Promise`\<[`SummarizationResult`](../interfaces/SummarizationResult.md)\>

#### Implementation of

[`AIAdapter`](../interfaces/AIAdapter.md).[`summarize`](../interfaces/AIAdapter.md#summarize)
