import type { ReactNode } from "react";
import type { TableauConnectionSettings } from "../../customWidgets/types";
import { isTableauConnectionStepValid, TABLEAU_PROVIDER_LABEL } from "../../customWidgets/embedConfig";

function EmbedConfigField({
  children,
  className = "",
  hint,
  label,
  required = false,
}: {
  children: ReactNode;
  className?: string;
  hint?: string;
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
      {hint ? <span className="custom-widget-field-hint">{hint}</span> : null}
    </label>
  );
}

export function EmbedWidgetConfigPanel({
  connection,
  connectionTestMessage = null,
  connectionVerified = false,
  isReadOnly,
  onConnectionChange,
  onTestConnection,
}: {
  connection: TableauConnectionSettings;
  connectionTestMessage?: string | null;
  connectionVerified?: boolean;
  isReadOnly: boolean;
  onConnectionChange: (patch: Partial<TableauConnectionSettings>) => void;
  onTestConnection: () => void;
}) {
  const canTestConnection = isTableauConnectionStepValid(connection);

  return (
    <div className="custom-widget-embed-config-panel">
      <section className="custom-widget-embed-config-section">
        <EmbedConfigField label="Provider" required>
          <select disabled required value={TABLEAU_PROVIDER_LABEL}>
            <option value={TABLEAU_PROVIDER_LABEL}>{TABLEAU_PROVIDER_LABEL}</option>
          </select>
        </EmbedConfigField>

        <EmbedConfigField label="Tableau View URL" required>
          <input
            disabled={isReadOnly}
            onChange={(event) => onConnectionChange({ siteUrl: event.target.value })}
            required
            type="url"
            value={connection.siteUrl}
          />
        </EmbedConfigField>

        <EmbedConfigField label="Secret ID" required>
          <input
            disabled={isReadOnly}
            onChange={(event) => onConnectionChange({ secretId: event.target.value })}
            required
            type="text"
            value={connection.secretId}
          />
        </EmbedConfigField>

        <EmbedConfigField label="Secret Value" required>
          <input
            autoComplete="off"
            disabled={isReadOnly}
            onChange={(event) => onConnectionChange({ connectedAppSecret: event.target.value })}
            required
            type="password"
            value={connection.connectedAppSecret}
          />
        </EmbedConfigField>

        <EmbedConfigField label="Client ID" required>
          <input
            disabled={isReadOnly}
            onChange={(event) => onConnectionChange({ clientId: event.target.value })}
            required
            type="text"
            value={connection.clientId}
          />
        </EmbedConfigField>

        <EmbedConfigField
          hint="Your Tableau Cloud login email — not a localhost username"
          label="Tableau Username (JWT sub)"
          required
        >
          <input
            disabled={isReadOnly}
            onChange={(event) => onConnectionChange({ tableauUsernameJwtSub: event.target.value })}
            required
            type="text"
            value={connection.tableauUsernameJwtSub}
          />
        </EmbedConfigField>

        <div className="custom-widget-embed-config-section-actions">
          <button
            className="custom-widget-primary-button"
            disabled={isReadOnly || !canTestConnection}
            onClick={onTestConnection}
            type="button"
          >
            Test Connection and Preview
          </button>
          {connectionTestMessage ? (
            <span
              className={
                connectionVerified
                  ? "custom-widget-embed-config-success"
                  : "custom-widget-embed-config-error"
              }
              role="status"
            >
              {connectionTestMessage}
            </span>
          ) : null}
        </div>
      </section>
    </div>
  );
}
