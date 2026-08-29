import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("User message:", message);
    setMessage("");
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[450px] w-[350px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
            <div>
              <h2 className="font-bold">AI Assistant</h2>
              <p className="text-xs text-blue-100">How can I help you?</p>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="w-fit max-w-[80%] text-black rounded-2xl rounded-tl-none bg-gray-100 p-3 text-sm">
              Hello 👋 How can I help you today?
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t p-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 rounded-full border px-4 py-2 outline-none text-black focus:border-blue-500"
            />

            <button
              onClick={handleSend}
              className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:scale-110 hover:bg-blue-700"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </>
  );
};

export default Chatbot;