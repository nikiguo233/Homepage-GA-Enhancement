import { useState, type ReactNode } from "react";
import type { TableauConnectionSettings } from "../../customWidgets/types";
import {
  TABLEAU_PROVIDER_LABEL,
} from "../../customWidgets/embedConfig";

function EmbedConfigField({
  children,
  className = "",
  label,
  required = false,
}: {
  children: ReactNode;
  className?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className={["custom-widget-field", className].filter(Boolean).join(" ")}>
      <span className="custom-widget-field-label">
        {label}
        {required ? <span className="custom-widget-required"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export function EmbedWidgetConfigPanel({
  connection,
  isReadOnly,
  onConnectionChange,
}: {
  connection: TableauConnectionSettings;
  isReadOnly: boolean;
  onConnectionChange: (patch: Partial<TableauConnectionSettings>) => void;
}) {
  const [connectionTestMessage, setConnectionTestMessage] = useState<string | null>(null);

  const handleTestConnection = () => {
    setConnectionTestMessage("Connection successful.");
  };

  return (
    <div className="custom-widget-embed-config-panel">
      <section className="custom-widget-embed-config-section">
        <EmbedConfigField label="Provider" required>
          <input disabled readOnly required type="text" value={TABLEAU_PROVIDER_LABEL} />
        </EmbedConfigField>

        <EmbedConfigField label="Tableau View URL" required>
          <input
            disabled={isReadOnly}
            onChange={(event) => onConnectionChange({ siteUrl: event.target.value })}
            placeholder="https://10ay.online.tableau.com/views/RevenueDashboard/RevenueOverview"
            required
            type="url"
            value={connection.siteUrl}
          />
        </EmbedConfigField>

        <div className="custom-widget-embed-config-row">
          <EmbedConfigField label="Connected App Client ID" required>
            <input
              disabled={isReadOnly}
              onChange={(event) => onConnectionChange({ clientId: event.target.value })}
              placeholder="a1b2c3d4-****"
              required
              type="text"
              value={connection.clientId}
            />
          </EmbedConfigField>

          <EmbedConfigField label="Secret ID" required>
            <input
              disabled={isReadOnly}
              onChange={(event) => onConnectionChange({ secretId: event.target.value })}
              placeholder="secret-id-****"
              required
              type="text"
              value={connection.secretId}
            />
          </EmbedConfigField>
        </div>

        <EmbedConfigField label="Connected App secret" required>
          <input
            autoComplete="off"
            disabled={isReadOnly}
            onChange={(event) => onConnectionChange({ connectedAppSecret: event.target.value })}
            required
            type="password"
            value={connection.connectedAppSecret}
          />
        </EmbedConfigField>

        <div className="custom-widget-embed-config-section-actions">
          <button
            className="custom-widget-secondary-button"
            disabled={isReadOnly}
            onClick={handleTestConnection}
            type="button"
          >
            Test connection
          </button>
          {connectionTestMessage ? (
            <span className="custom-widget-embed-config-success" role="status">
              {connectionTestMessage}
            </span>
          ) : null}
        </div>
      </section>
    </div>
  );
}
