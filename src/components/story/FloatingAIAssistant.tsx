import { useState, type FormEvent } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Copy,
  Check,
} from 'lucide-react';

import { Story } from '../../types';
import { useAppStore, showToast } from '../../store/useAppStore';

const quickPrompts = [
  'Explain this in simple words.',
  'Why should I care?',
  'How could this affect me?',
  'Give me the key facts.',
  'What are the risks?',
  'What are both sides saying?',
];

interface FloatingAIAssistantProps {
  story?: Story;
}

export function FloatingAIAssistant({
  story,
}: FloatingAIAssistantProps = {}) {
  const {
    isStoryAIOpen,
    activeStoryForAI,
    chatHistory,
    sendAssistantMessage,
    closeModals,
    openStoryAssistant,
  } = useAppStore();

  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Use the currently active AI story if available.
  // Otherwise fall back to the story passed to this component.
  const activeStory = activeStoryForAI || story;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = inputVal.trim();

    if (!message || !activeStory) {
      return;
    }

    sendAssistantMessage(message, activeStory);
    setInputVal('');
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!activeStory) {
      return;
    }

    sendAssistantMessage(prompt, activeStory);
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedId(id);
      showToast('Copied answer to clipboard');

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      showToast('Unable to copy answer');
    }
  };

  /*
   * Floating trigger
   */
  if (!isStoryAIOpen) {
    if (!story) return null;
    return (
      <button
        type="button"
        onClick={() => openStoryAssistant(story)}
        aria-label="Ask NexVarta AI"
        className="
          fixed
          bottom-6
          right-6
          z-40
          flex
          items-center
          gap-2
          rounded-full
          bg-[#7C5CFF]
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          shadow-[0_4px_25px_rgba(124,92,255,0.4)]
          transition-all
          hover:scale-105
          hover:bg-[#6D4AEF]
        "
      >
        <Sparkles className="h-4 w-4 text-[#22D3EE]" />
        <span>Ask NexVarta AI</span>
      </button>
    );
  }

  /*
   * AI panel
   */
  return (
    <div
      className="
        fixed
        inset-y-0
        right-0
        z-50
        flex
        w-full
        flex-col
        border-l
        border-[#252B38]
        bg-[#10141D]
        shadow-2xl
        sm:w-[480px]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#252B38]
          bg-[#171C27]
          p-4
        "
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="rounded-lg bg-[#7C5CFF]/20 p-2 text-[#7C5CFF]">
            <Bot className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <h4 className="flex items-center gap-1.5 font-mono text-sm font-bold text-white">
              <span>NexVarta Story Intelligence</span>

              <span
                className="
                  rounded
                  border
                  border-emerald-500/20
                  bg-emerald-950/60
                  px-1.5
                  py-0.5
                  text-[10px]
                  text-emerald-400
                "
              >
                LIVE
              </span>
            </h4>

            {activeStory && (
              <p className="max-w-[280px] truncate text-[11px] text-slate-400">
                Context: {activeStory.headline}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={closeModals}
          aria-label="Close AI Assistant"
          className="
            rounded-lg
            p-1.5
            text-slate-400
            transition-colors
            hover:bg-[#252B38]
            hover:text-white
          "
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Quick Prompts */}
      <div
        className="
          space-x-2
          overflow-x-auto
          whitespace-nowrap
          border-b
          border-[#252B38]
          bg-[#080B12]/80
          p-3
        "
      >
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => handleQuickPrompt(prompt)}
            className="
              inline-block
              rounded-full
              border
              border-[#252B38]
              bg-[#171C27]
              px-2.5
              py-1
              text-xs
              text-slate-300
              transition-all
              hover:border-[#7C5CFF]/50
              hover:bg-[#7C5CFF]/20
              hover:text-white
            "
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {chatHistory.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-xs text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#7C5CFF]/20">
                <Sparkles className="h-6 w-6 text-[#7C5CFF]" />
              </div>

              <h3 className="mb-1 text-sm font-semibold text-white">
                Ask NexVarta AI
              </h3>

              <p className="text-xs leading-relaxed text-slate-400">
                Ask questions about this story, its facts, risks, impact,
                or what it could mean for you.
              </p>
            </div>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {/* Assistant avatar */}
              {msg.role === 'assistant' && (
                <div
                  className="
                    mt-0.5
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#7C5CFF]/40
                    bg-[#7C5CFF]/20
                    text-[#7C5CFF]
                  "
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              )}

              {/* Message */}
              <div
                className={`max-w-[85%] rounded-xl p-3.5 ${
                  msg.role === 'user'
                    ? 'rounded-br-none bg-[#7C5CFF] text-white'
                    : 'rounded-bl-none border border-[#252B38] bg-[#171C27] text-slate-200 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.content}
                </div>

                {/* Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2.5 border-t border-[#252B38] pt-2 text-[10px] font-mono text-slate-400">
                    <span className="text-slate-500">
                      CITED SOURCES:{' '}
                    </span>

                    <span className="text-[#22D3EE]">
                      {msg.sources.join(', ')}
                    </span>
                  </div>
                )}

                {/* Copy */}
                {msg.role === 'assistant' && (
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(msg.id, msg.content)
                      }
                      className="
                        flex
                        items-center
                        gap-1
                        text-[10px]
                        text-slate-400
                        transition-colors
                        hover:text-white
                      "
                    >
                      {copiedId === msg.id ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}

                      <span>
                        {copiedId === msg.id ? 'Copied' : 'Copy'}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* User avatar */}
              {msg.role === 'user' && (
                <div
                  className="
                    mt-0.5
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#252B38]
                    text-slate-300
                  "
                >
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="
          flex
          items-center
          gap-2
          border-t
          border-[#252B38]
          bg-[#171C27]
          p-3
        "
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask anything about this story..."
          className="
            flex-1
            rounded-lg
            border
            border-[#252B38]
            bg-[#10141D]
            px-3
            py-2
            text-xs
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-[#7C5CFF]
          "
        />

        <button
          type="submit"
          disabled={!inputVal.trim()}
          aria-label="Send message"
          className="
            rounded-lg
            bg-[#7C5CFF]
            p-2
            text-white
            transition-colors
            hover:bg-[#6D4AEF]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}