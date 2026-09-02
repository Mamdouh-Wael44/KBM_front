import { useState } from "react";
import {
  MessageCircle,
  Send,
  Plus,
  Sparkles,
  Bot,
  ArrowLeft,
  Trash2,
} from "lucide-react";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! 👋 How can I help you today?",
      sender: "ai",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Temporary AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for your question! I'm here to help you.",
          sender: "ai",
        },
      ]);
    }, 700);
  };

  const newConversation = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! 👋 How can I help you today?",
        sender: "ai",
      },
    ]);

    setMessage("");
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <>
      {/* =====================================================
          FLOATING CHAT BUTTON
      ====================================================== */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          className="
            fixed bottom-6 right-6 z-50
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-blue-600
            text-white
            shadow-xl shadow-blue-600/25
            transition-all duration-300
            hover:scale-110
            hover:bg-blue-700
            hover:shadow-2xl hover:shadow-blue-600/30
            active:scale-95
          "
        >
          <MessageCircle size={25} strokeWidth={2.2} />
        </button>
      )}

      {/* =====================================================
          FULL AI ASSISTANT
      ====================================================== */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-[100]
            flex
            bg-slate-50
            text-slate-900
            dark:bg-[#07111d]
            dark:text-slate-100
          "
        >
          {/* =================================================
              SIDEBAR
          ================================================== */}
          <aside
            className="
               w-[260px] shrink-0
              border-r border-slate-200
              bg-white
              md:flex md:flex-col
              dark:border-slate-800
              dark:bg-[#0d1927]
            "
          >
            {/* Sidebar Header */}
            <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl
                    bg-blue-600
                    text-white
                    shadow-lg shadow-blue-600/20
                  "
                >
                  <Sparkles size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    AI Assistant
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Knowledge Assistant
                  </p>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 dark:text-slate-500">
                  History
                </span>

                <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Today
                </span>
              </div>

              {/* Current conversation */}
              <button
                className="
                  group flex w-full items-center gap-3
                  rounded-xl border
                  border-blue-100
                  bg-blue-50
                  px-3 py-3
                  text-left
                  transition-all
                  hover:border-blue-200
                  dark:border-blue-500/20
                  dark:bg-blue-500/10
                  dark:hover:bg-blue-500/15
                "
              >
                <div
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-blue-100
                    text-blue-600
                    dark:bg-blue-500/15
                    dark:text-blue-400
                  "
                >
                  <MessageCircle size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                    New Conversation
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-500">
                    Just now
                  </p>
                </div>
              </button>

              {/* Empty state */}
              <div className="mt-10 px-4 text-center">
                <div
                  className="
                    mx-auto flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-slate-100
                    text-slate-400
                    dark:bg-slate-800
                    dark:text-slate-500
                  "
                >
                  <MessageCircle size={21} />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Your conversations will appear here
                </p>
              </div>
            </div>

            {/* New Conversation */}
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              <button
                onClick={newConversation}
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-xl
                  bg-blue-600
                  px-4 py-3
                  text-sm font-semibold
                  text-white
                  shadow-lg shadow-blue-600/20
                  transition-all
                  hover:bg-blue-700
                  hover:shadow-xl hover:shadow-blue-600/25
                  active:scale-[0.98]
                "
              >
                <Plus size={17} />
                New Conversation
              </button>
            </div>
          </aside>

          {/* =================================================
              MAIN CHAT
          ================================================== */}
          <main
            className="
              flex min-w-0 flex-1 flex-col
              bg-slate-50
              dark:bg-[#07111d]
            "
          >
            {/* =================================================
                HEADER
            ================================================== */}
            <header
              className="
                flex h-[76px] shrink-0 items-center
                justify-between
                border-b
                border-slate-200
                bg-white/90
                px-4
                backdrop-blur-xl
                sm:px-6
                dark:border-slate-800
                dark:bg-[#0a1725]/90
              "
            >
              <div className="flex items-center gap-3">
                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close AI Assistant"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    text-slate-500
                    transition-all
                    hover:border-slate-300
                    hover:bg-slate-100
                    hover:text-slate-900
                    dark:border-slate-700
                    dark:bg-slate-800/70
                    dark:text-slate-400
                    dark:hover:bg-slate-800
                    dark:hover:text-white
                  "
                >
                  <ArrowLeft size={19} />
                </button>

                {/* AI Logo */}
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl
                    bg-blue-600
                    text-white
                    shadow-lg shadow-blue-600/20
                  "
                >
                  <Sparkles size={19} />
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                    AI Assistant
                  </h1>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear */}
              <button
                onClick={clearConversation}
                title="Clear conversation"
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                  dark:hover:bg-red-500/10
                "
              >
                <Trash2 size={17} />
              </button>
            </header>

            {/* =================================================
                MESSAGES
            ================================================== */}
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-5xl px-4 py-7 sm:px-8 lg:px-10">
                {/* Welcome heading */}
                {messages.length <= 1 && (
                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-blue-600 dark:text-blue-400">
                      Welcome
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                      How can I help you?
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Ask me anything about your lessons, courses, or
                      knowledge base.
                    </p>
                  </div>
                )}

                {/* Messages */}
                <div className="space-y-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 ${msg.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                        }`}
                    >
                      {/* AI Icon */}
                      {msg.sender === "ai" && (
                        <div
                          className="
                            flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-xl
                            bg-blue-100
                            text-blue-600
                            dark:bg-blue-500/10
                            dark:text-blue-400
                          "
                        >
                          <Bot size={17} />
                        </div>
                      )}

                      {/* Message */}
                      <div
                        className={`
                          max-w-[75%]
                          rounded-2xl
                          px-4 py-3
                          text-sm
                          leading-6
                          shadow-sm
                          ${msg.sender === "user"
                            ? `
                                rounded-br-md
                                bg-blue-600
                                text-white
                                shadow-blue-600/10
                              `
                            : `
                                rounded-tl-md
                                border
                                border-slate-200
                                bg-white
                                text-slate-700
                                dark:border-slate-800
                                dark:bg-[#111f2e]
                                dark:text-slate-200
                              `
                          }
                        `}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                INPUT
            ================================================== */}
            <div
              className="
                border-t
                border-slate-200
                bg-white/90
                px-4 py-4
                backdrop-blur-xl
                sm:px-6
                dark:border-slate-800
                dark:bg-[#0a1725]/90
              "
            >
              <div className="mx-auto max-w-5xl">
                <div
                  className="
                    flex items-center gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-3 py-2
                    shadow-sm
                    transition-all
                    focus-within:border-blue-400
                    focus-within:ring-4
                    focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-[#111f2e] dark:focus-within:border-blue-500
                  "
                >
                  {/* AI icon */}
                  <div
                    className="
                      hidden h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-blue-100
                      text-blue-600
                      sm:flex
                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    <Sparkles size={16} />
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    placeholder="Ask me anything about your knowledge base..."
                    className="
                      min-w-0 flex-1
                      bg-transparent
                      px-1
                      py-2
                      text-sm
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      dark:text-slate-100
                      dark:placeholder:text-slate-500
                    "
                  />

                  {/* Send */}
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    aria-label="Send message"
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-blue-600
                      text-white
                      shadow-md
                      shadow-blue-600/20
                      transition-all
                      hover:bg-blue-700
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                      disabled:shadow-none
                    "
                  >
                    <Send size={17} />
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="mt-3 text-center text-[10px] text-slate-400 dark:text-slate-500">
                  AI may produce inaccurate information. Verify important
                  facts with original documents.
                </p>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Chatbot;