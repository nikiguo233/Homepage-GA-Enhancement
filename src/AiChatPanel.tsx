import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useEffect, useId, useState } from "react";
import aiSparkIconUrl from "./assets/ai-spark.svg";
import aiSparkTabIconUrl from "./assets/ai-spark-tab.svg";

type AiChatTab = "chat" | "history";

function AiSparkIcon({ className }: { className?: string }) {
  return <img alt="" aria-hidden="true" className={className} src={aiSparkIconUrl} />;
}

function AiSparkTabIcon({ className }: { className?: string }) {
  return <img alt="" aria-hidden="true" className={className} src={aiSparkTabIconUrl} />;
}

export function AiChatBadge({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="Open Zuora AI chat"
      className="ai-chat-badge"
      data-node-id="174:20460"
      onClick={onClick}
      type="button"
    >
      <AiSparkIcon className="ai-chat-badge-icon" />
    </button>
  );
}

export function AiChatPanel({ onClose, open }: { onClose: () => void; open: boolean }) {
  const [activeTab, setActiveTab] = useState<AiChatTab>("chat");
  const [message, setMessage] = useState("");
  const panelTitleId = useId();
  const chatPanelId = useId();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <aside
      aria-labelledby={panelTitleId}
      className="ai-chat-panel"
      data-node-id="174:27875"
      id={chatPanelId}
    >
      <div className="ai-chat-panel-frame">
        <div className="ai-chat-panel-gradient-blur" aria-hidden="true" />
        <div className="ai-chat-panel-gradient-border" aria-hidden="true" />
        <div className="ai-chat-panel-shell">
          <div className="ai-chat-panel-surface">
            <header className="ai-chat-panel-header">
              <div className="ai-chat-panel-header-main">
                <h2 id={panelTitleId}>Zuora AI</h2>
                <div className="ai-chat-panel-header-actions">
                  <button aria-label="Start new chat" className="ai-chat-icon-button" type="button">
                    <AddIcon />
                  </button>
                  <button aria-label="Open chat in new window" className="ai-chat-icon-button" type="button">
                    <OpenInNewIcon />
                  </button>
                  <button aria-label="Close Zuora AI chat" className="ai-chat-icon-button" onClick={onClose} type="button">
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </header>

            <div className="ai-chat-panel-body">
              <div className="ai-chat-tabs" role="tablist" aria-label="Zuora AI views">
                <button
                  aria-selected={activeTab === "chat"}
                  className={`ai-chat-tab${activeTab === "chat" ? " ai-chat-tab-active" : ""}`}
                  onClick={() => setActiveTab("chat")}
                  role="tab"
                  type="button"
                >
                  <span className="ai-chat-tab-content">
                    <AiSparkTabIcon className="ai-chat-tab-icon" />
                    <span
                      className={`ai-chat-tab-label${activeTab === "chat" ? " ai-chat-tab-label-gradient" : ""}`}
                    >
                      Chat
                    </span>
                  </span>
                </button>
                <button
                  aria-selected={activeTab === "history"}
                  className={`ai-chat-tab${activeTab === "history" ? " ai-chat-tab-active" : ""}`}
                  onClick={() => setActiveTab("history")}
                  role="tab"
                  type="button"
                >
                  <span className="ai-chat-tab-content">
                    <HistoryIcon aria-hidden="true" className="ai-chat-tab-icon" />
                    <span className="ai-chat-tab-label">History</span>
                  </span>
                </button>
              </div>

              {activeTab === "chat" ? (
                <div className="ai-chat-message-list" role="tabpanel">
                  <div className="ai-chat-message ai-chat-message-assistant">
                    <p>👋 Hey, Rachel! How can I assist you today?</p>
                  </div>
                </div>
              ) : (
                <div className="ai-chat-history-placeholder" role="tabpanel">
                  <p>No chat history yet.</p>
                </div>
              )}
            </div>

            <footer className="ai-chat-input-region">
              <label className="ai-chat-input-shell">
                <div className="ai-chat-input-area">
                  <textarea
                    aria-label="Ask Zuora AI"
                    className="ai-chat-input"
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Ask Zuora AI"
                    rows={3}
                    value={message}
                  />
                  <div className="ai-chat-input-actions">
                    <button aria-label="Add attachment" className="ai-chat-icon-button" type="button">
                      <AddIcon />
                    </button>
                    <div className="ai-chat-input-actions-right">
                      <button aria-label="Use microphone" className="ai-chat-icon-button" type="button">
                        <MicNoneOutlinedIcon />
                      </button>
                      <button aria-label="Send message" className="ai-chat-icon-button" type="button">
                        <SendOutlinedIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            </footer>
          </div>
        </div>
      </div>
    </aside>
  );
}
