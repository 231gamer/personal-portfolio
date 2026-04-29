"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "What tech do you use?",
  "Show me your projects",
  "How can I hire you?",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey! I'm your portfolio guide. Ask me about the tech stack, projects, or how to get in touch. What would you like to know?",
};

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary), rgba(46,196,182,0.5))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 12,
        }}
      >
        ✦
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border)",
          borderRadius: "4px 16px 16px 16px",
          padding: "10px 14px",
          display: "flex",
          gap: 5,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--primary)",
              display: "block",
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  // Simple markdown-ish renderer: bold and bullet points
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold
      const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? (
          <strong key={j} style={{ color: "var(--primary)", fontWeight: 600 }}>
            {part}
          </strong>
        ) : (
          part
        )
      );

      // Bullet point
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
      if (isBullet) {
        return (
          <div key={i} style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <span style={{ color: "var(--primary)", marginTop: 1 }}>▸</span>
            <span>{parts}</span>
          </div>
        );
      }

      return (
        <p key={i} style={{ margin: i > 0 ? "4px 0 0" : 0 }}>
          {parts}
        </p>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary), rgba(46,196,182,0.5))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 12,
          }}
        >
          ✦
        </div>
      )}
      <div
        style={{
          maxWidth: "78%",
          padding: "10px 14px",
          borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          background: isUser
            ? "linear-gradient(135deg, var(--primary), rgba(46,196,182,0.7))"
            : "rgba(255,255,255,0.06)",
          border: isUser ? "none" : "1px solid var(--border)",
          color: isUser ? "#0f1220" : "var(--foreground)",
          fontSize: 13.5,
          lineHeight: 1.55,
          fontWeight: isUser ? 500 : 400,
          backdropFilter: "blur(8px)",
        }}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showInitialTooltip, setShowInitialTooltip] = useState(true);
  const [showHoverTooltip, setShowHoverTooltip] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
      setHasNewMessage(false);
    }
  }, [isOpen, messages]);

  // Auto-hide tooltip after 3 seconds
  useEffect(() => {
    if (!showInitialTooltip) return;

    const timer = setTimeout(() => {
      setShowInitialTooltip(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showInitialTooltip]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: Message = { role: "user", content: trimmed };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.filter((m) => m.role !== "assistant" || m !== WELCOME_MESSAGE),
          }),
        });

        const data = await res.json();
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message || "Sorry, I couldn't get a response. Try again!",
        };
        setMessages((prev) => [...prev, assistantMessage]);
        if (!isOpen) setHasNewMessage(true);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Something went wrong. Please try again." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, isOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(46,196,182,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(46,196,182,0); }
          100% { box-shadow: 0 0 0 0 rgba(46,196,182,0); }
        }
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tooltipFadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(8px); }
        }
        .chat-window {
          animation: chatSlideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .chat-toggle:hover {
          transform: scale(1.08);
        }
        .chat-toggle {
          transition: transform 0.2s ease;
        }
        .tooltip {
          animation: tooltipFadeIn 0.3s ease-out forwards;
        }
        .tooltip.fade-out {
          animation: tooltipFadeOut 0.3s ease-out forwards;
        }
        .msg-input:focus {
          outline: none;
          border-color: rgba(46,196,182,0.5) !important;
          box-shadow: 0 0 0 3px rgba(46,196,182,0.1);
        }
        .suggested-btn:hover {
          background: rgba(46,196,182,0.15) !important;
          border-color: rgba(46,196,182,0.5) !important;
          color: var(--primary) !important;
        }
        .send-btn:hover:not(:disabled) {
          background: rgba(46,196,182,0.9) !important;
        }
        .send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>

      {/* Floating Toggle Button with Tooltip */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 12,
          zIndex: 9999,
        }}
        onMouseEnter={() => {
          if (!isOpen) setShowHoverTooltip(true);
        }}
        onMouseLeave={() => setShowHoverTooltip(false)}
      >
        {/* Tooltip */}
        {(showInitialTooltip || showHoverTooltip) && (
          <div
            className={`tooltip ${!showInitialTooltip && showHoverTooltip ? "" : showInitialTooltip && !showHoverTooltip ? "" : "fade-out"}`}
            style={{
              position: "absolute",
              bottom: 72,
              right: 0,
              background: "rgba(20, 24, 43, 0.95)",
              border: "1px solid rgba(46,196,182,0.2)",
              borderRadius: 10,
              padding: "8px 12px",
              color: "var(--foreground)",
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: "nowrap",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              pointerEvents: "none",
            }}
          >
            Chat with AG
            {/* Arrow pointer */}
            <div
              style={{
                position: "absolute",
                bottom: -4,
                right: 12,
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid rgba(46,196,182,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -3,
                right: 12,
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid rgba(20, 24, 43, 0.95)",
              }}
            />
          </div>
        )}

        {/* Button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="chat-toggle"
          aria-label={isOpen ? "Close chat" : "Open chat"}
          style={{
            position: "relative",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary), rgba(46,196,182,0.7))",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(46,196,182,0.35), 0 2px 8px rgba(0,0,0,0.4)",
            animation: !isOpen ? "pulse-ring 2.5s ease-out infinite" : "none",
            color: "#0f1220",
            fontSize: isOpen ? 22 : 24,
            fontWeight: 700,
          }}
        >
          {isOpen ? "✕" : "✦"}
          {hasNewMessage && !isOpen && (
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff4d6d",
                border: "2px solid var(--background)",
            }}
          />
          )}
        </button>
      </div>
      {isOpen && (
        <div
          className="chat-window"
          style={{
            position: "fixed",
            bottom: 88,
            right: 12,
            width: 360,
            height: 520,
            borderRadius: 20,
            background: "rgba(20, 24, 43, 0.82)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(46,196,182,0.18)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 18px",
              borderBottom: "1px solid rgba(46,196,182,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(46,196,182,0.04)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), rgba(46,196,182,0.4))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--foreground)" }}>
                Portfolio Assistant
              </div>
              <div style={{ fontSize: 12, color: "var(--primary)", display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    display: "inline-block",
                    boxShadow: "0 0 6px var(--primary)",
                  }}
                />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              scrollbarWidth: "none",
            }}
          >
            {/* Suggested prompts — show only at start */}
            {messages.length === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    className="suggested-btn"
                    onClick={() => sendMessage(prompt)}
                    style={{
                      background: "rgba(46,196,182,0.07)",
                      border: "1px solid rgba(46,196,182,0.2)",
                      borderRadius: 10,
                      padding: "8px 12px",
                      color: "var(--muted)",
                      fontSize: 12.5,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(46,196,182,0.1)",
              display: "flex",
              gap: 8,
              background: "rgba(15,18,32,0.5)",
            }}
          >
            <input
              ref={inputRef}
              className="msg-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(46,196,182,0.2)",
                borderRadius: 12,
                padding: "9px 14px",
                color: "var(--foreground)",
                fontSize: 13.5,
                transition: "border-color 0.2s, box-shadow 0.2s",
                fontFamily: "inherit",
              }}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0f1220",
                fontSize: 16,
                fontWeight: 700,
                flexShrink: 0,
                transition: "background 0.15s ease",
                alignSelf: "center",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}