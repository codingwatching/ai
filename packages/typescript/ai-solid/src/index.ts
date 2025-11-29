export { useChat } from './use-chat'
export type {
  UseChatOptions,
  UseChatReturn,
  UIMessage,
  ChatRequestBody,
} from './types'

// Solid Start server function integration
export { createServerFnTool } from './create-server-fn-tool'
export type {
  CreateServerFnToolConfig,
  ServerFnToolResult,
} from './create-server-fn-tool'

// Re-export from ai-client for convenience
export {
  fetchServerSentEvents,
  fetchHttpStream,
  stream,
  createChatClientOptions,
  type ConnectionAdapter,
  type FetchConnectionOptions,
  type InferChatMessages,
} from '@tanstack/ai-client'
