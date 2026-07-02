---
'@tanstack/ai-anthropic': minor
---

Add first-class support for Claude Sonnet 5 (`claude-sonnet-5`) and Claude Fable 5 (`claude-fable-5`). Both models now carry accurate metadata (adaptive thinking, sticker pricing for Sonnet 5) and per-model provider-option types that match the API: adaptive-only `thinking` on Fable 5 (explicit `disabled` and `budget_tokens` are rejected), adaptive-or-disabled `thinking` on Sonnet 5, and no `temperature` / `top_p` / `top_k` on either. `output_config.effort` gains the `'xhigh'` level (Opus 4.7+, Sonnet 5, Fable 5). Both models are registered for native combined tools + output-schema requests, and the tool-capability type map now covers `claude-sonnet-5`, `claude-fable-5`, `claude-opus-4.8`, `claude-opus-4.8-fast`, and `claude-opus-4-7-fast` so provider tools type-check on those models. Closes #880.
