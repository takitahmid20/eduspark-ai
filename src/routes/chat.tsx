import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/app/shell";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { MathText } from "@/components/app/math-text";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "TAAI Chat" }] }),
  component: ChatPage,
});

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUGGESTIONS = [
  "What's the average score for Physics Exam?",
  "Show me students who scored below 50%",
  "How many assignments are pending grading?",
  "Summarize Rakib's performance across all assignments",
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  }

  async function handleSend(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setLoading(true);

    // TODO: Replace with actual API call when backend chat endpoint is ready
    // Simulating AI response for now
    await new Promise((r) => setTimeout(r, 1500));

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "I'm TAAI Chat — your AI teaching assistant. This feature is coming soon. Once connected, I'll be able to help you with:\n\n• Checking student scores and performance\n• Summarizing assignment results\n• Answering questions about your data\n• Helping with grading decisions\n\nThe chat API is not yet integrated. Please check back later.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <AppShell title="TAAI Chat" subtitle="Ask anything about your students, assignments, and grades">
      <div className="w-full h-[calc(100vh-140px)] flex flex-col">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="size-16 rounded-lg bg-primary/10 grid place-items-center mb-4">
                <Sparkles className="size-7 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold mb-2">TAAI Chat</h2>
              <p className="text-sm text-muted-foreground max-w-md mb-8">
                Ask me anything about your students, assignments, grades, or teaching workflow. I have access to all your data.
              </p>

              {/* Suggestions */}
              <div className="grid sm:grid-cols-2 gap-2 max-w-lg w-full">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-left px-4 py-3 rounded-md border border-border bg-card text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="max-w-3xl mx-auto py-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="size-8 rounded-md bg-primary/10 grid place-items-center shrink-0 mt-0.5">
                      <Bot className="size-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-lg text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <MathText text={msg.content} />
                  </div>
                  {msg.role === "user" && (
                    <div className="size-8 rounded-md bg-muted grid place-items-center shrink-0 mt-0.5">
                      <User className="size-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-md bg-primary/10 grid place-items-center shrink-0">
                    <Bot className="size-4 text-primary" />
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border pt-4 pb-2">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 px-4 py-3 rounded-lg border border-border bg-card focus-within:border-primary/50 transition">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about students, assignments, grades..."
                rows={1}
                className="flex-1 bg-transparent outline-none text-sm resize-none max-h-40 placeholder:text-muted-foreground"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="size-8 rounded-md bg-primary text-primary-foreground grid place-items-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="size-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              TAAI Chat has access to your assignments, students, and grading data.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
