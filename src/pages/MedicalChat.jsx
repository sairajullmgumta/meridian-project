import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Stethoscope, Sparkles, User, ArrowLeft, MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm your Meridian Health medical assistant. I can help answer general health questions, clarify your symptom analysis, or provide guidance on next steps after your appointment. How can I help you today?\n\n*Note: I provide general information only — not a substitute for professional medical advice.*",
  ts: new Date(),
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-teal-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
        isUser
          ? "bg-gradient-to-br from-slate-600 to-slate-700"
          : "bg-gradient-to-br from-teal-500 to-emerald-600 shadow-md shadow-teal-500/20"
      }`}>
        {isUser
          ? <User className="w-4 h-4 text-white" />
          : <Stethoscope className="w-4 h-4 text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
        isUser
          ? "bg-gradient-to-br from-teal-600 to-emerald-600 text-white rounded-tr-sm"
          : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm"
      }`}>
        {msg.content.split("\n").map((line, i) => (
          <p key={i} className={line.startsWith("*") ? "text-xs opacity-60 mt-1 italic" : ""}>
            {line.startsWith("*") ? line.replace(/\*/g, "") : line}
          </p>
        ))}
        <p className={`text-xs mt-1.5 ${isUser ? "text-white/50 text-right" : "text-slate-300"}`}>
          {new Date(msg.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
}

export default function MedicalChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, thinking]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || thinking) return;

    const userMsg = { id: Date.now(), role: "user", content: text, ts: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    // Build conversation history for context
    const history = messages.slice(-8).map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n");

    const reply = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a compassionate and knowledgeable medical assistant for Meridian Health hospital.
You provide clear, reassuring, general health information.
You NEVER diagnose or prescribe. You always recommend consulting a doctor for medical decisions.
Keep responses concise (2-4 sentences typically), warm, and professional.
If a question is outside general health info, politely redirect.

Conversation so far:
${history}

User: ${text}

Respond as the assistant:`,
    });

    const assistantMsg = { id: Date.now() + 1, role: "assistant", content: reply, ts: new Date() };
    setMessages((prev) => [...prev, assistantMsg]);
    setThinking(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to={createPageUrl("Home")}
            className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Meridian Medical Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-600 font-medium">Online</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100">
            <Sparkles className="w-3 h-3 text-teal-500" />
            <span className="text-xs font-semibold text-teal-600">AI-Powered</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {/* Quick prompts */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center py-2"
            >
              {[
                "Explain my symptoms analysis",
                "What should I expect at my appointment?",
                "When should I go to the ER?",
                "How can I manage mild pain at home?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 font-medium hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-all shadow-sm"
                >
                  {q}
                </button>
              ))}
            </motion.div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {thinking && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-slate-100 shadow-lg shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-end gap-2 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-teal-400 focus-within:bg-white transition-all px-4 py-2">
            <MessageCircle className="w-4 h-4 text-slate-300 shrink-0 mb-1.5" />
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a health question… (Enter to send)"
              rows={1}
              disabled={thinking}
              className="flex-1 resize-none bg-transparent text-slate-700 text-sm leading-relaxed placeholder:text-slate-300 focus:outline-none max-h-32"
              style={{ minHeight: "24px" }}
            />
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={sendMessage}
              disabled={!input.trim() || thinking}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center shrink-0 shadow-md shadow-teal-600/20 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4 text-white" />
            </motion.button>
          </div>
          <p className="text-center text-xs text-slate-300 mt-2">
            For emergencies, call 911 or visit your nearest ER.
          </p>
        </div>
      </div>
    </div>
  );
}