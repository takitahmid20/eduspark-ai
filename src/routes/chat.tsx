import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/app/shell";
import { Send, Bot, User, Sparkles, Loader2, AlertTriangle, Plus, PanelRight, PanelRightClose, Trash2, MessageSquare } from "lucide-react";
import { MarkdownRender } from "@/components/app/markdown-render";
import { sendChatMessage } from "@/lib/api";
import type { ChatMessage } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "TAAI Chat" }] }),
  component: ChatPage,
});

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  error?: boolean;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
};

const STORAGE_KEY = "taai_chat_sessions";
const ACTIVE_KEY = "taai_chat_active";

function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSessions(sessions: ChatSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function getActiveId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_KEY);
}

function setActiveId(id: string) {
  localStorage.setItem(ACTIVE_KEY, id);
}

const SUGGESTIONS = [
  "What's the average score for Physics Exam?",
  "Show me students who scored below 50%",
  "How many assignments are pending grading?",
  "Summarize Rakib's performance",
];

function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(getActiveId);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;
  const messages = activeSession?.messages || [];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function createNewChat() {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    setActiveSessionId(newSession.id);
    setActiveId(newSession.id);
    saveSessions(updated);
  }

  function switchSession(id: string) {
    setActiveSessionId(id);
    setActiveId(id);
  }

  function deleteSession(id: string) {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    saveSessions(updated);
    if (activeSessionId === id) {
      const next = updated[0]?.id || null;
      setActiveSessionId(next);
      if (next) setActiveId(next);
    }
  }

  function updateSession(sessionId: string, newMessages: Message[], title?: string) {
    const updated = sessions.map((s) =>
      s.id === sessionId ? { ...s, messages: newMessages, title: title || s.title } : s
    );
    setSessions(updated);
    saveSessions(updated);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  }

  async function handleSend(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;

    // Create session if none active
    let sessionId = activeSessionId;
    if (!sessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: content.slice(0, 40),
        messages: [],
        createdAt: new Date().toISOString(),
      };
      const updated = [newSession, ...sessions];
      setSessions(updated);
      setActiveSessionId(newSession.id);
      setActiveId(newSession.id);
      saveSessions(updated);
      sessionId = newSession.id;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    const currentMessages = [...messages, userMsg];

    // Update title if first message
    const isFirst = messages.length === 0;
    const title = isFirst ? content.slice(0, 40) : undefined;
    updateSession(sessionId, currentMessages, title);

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setLoading(true);

    // Build history
    const history: ChatMessage[] = currentMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const result = await sendChatMessage(content, history);

    let assistantMsg: Message;
    if (result.error) {
      assistantMsg = { id: (Date.now() + 1).toString(), role: "assistant", content: result.error, timestamp: new Date(), error: true };
    } else {
      assistantMsg = { id: (Date.now() + 1).toString(), role: "assistant", content: result.data?.data.response || "No response", timestamp: new Date() };
    }

    updateSession(sessionId, [...currentMessages, assistantMsg], title);
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
      <div className="w-full h-[calc(100vh-140px)] flex">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={createNewChat}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-xs font-medium hover:bg-accent transition cursor-pointer"
            >
              <Plus className="size-3.5" /> New Chat
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-xs font-medium hover:bg-accent transition cursor-pointer"
            >
              {showHistory ? <PanelRightClose className="size-3.5" /> : <PanelRight className="size-3.5" />}
              History
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="size-16 rounded-lg bg-primary/10 grid place-items-center mb-4">
                  <Sparkles className="size-7 text-primary" />
                </div>
                <h2 className="text-xl font-display font-bold mb-2">TAAI Chat</h2>
                <p className="text-sm text-muted-foreground max-w-md mb-8">
                  Ask me anything about your students, assignments, grades, or teaching workflow.
                </p>
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
                          : msg.error
                          ? "bg-destructive/10 border border-destructive/20 text-destructive"
                          : "bg-card border border-border"
                      }`}
                    >
                      {msg.error && <AlertTriangle className="size-3.5 inline mr-1.5" />}
                      {msg.role === "assistant" ? <MarkdownRender content={msg.content} className="text-sm" /> : msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="size-8 rounded-md bg-muted grid place-items-center shrink-0 mt-0.5">
                        <User className="size-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}

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

          {/* Input */}
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
            </div>
          </div>
        </div>

        {/* History sidebar */}
        <div className={cn(
          "border-l border-border bg-card transition-all duration-200 overflow-hidden shrink-0",
          showHistory ? "w-72" : "w-0"
        )}>
          {showHistory && (
            <div className="w-72 h-full flex flex-col">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-sm">Chat History</h3>
                <span className="text-[10px] text-muted-foreground">{sessions.length} chats</span>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {sessions.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs text-muted-foreground">No chat history yet.</div>
                ) : (
                  <div className="py-1">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className={cn(
                          "group flex items-center gap-2 px-4 py-2.5 cursor-pointer transition",
                          session.id === activeSessionId ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-accent border-l-2 border-l-transparent"
                        )}
                        onClick={() => switchSession(session.id)}
                      >
                        <MessageSquare className="size-3.5 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">{session.title || "New Chat"}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {session.messages.length} messages
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                          className="size-6 rounded grid place-items-center opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition cursor-pointer"
                        >
                          <Trash2 className="size-3 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
