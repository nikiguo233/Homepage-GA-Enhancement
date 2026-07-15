import type { EmbedUrlValidation } from "../../customWidgets/embedPolicy";
import {
  EMBED_AUTHENTICATION_TYPE_OPTIONS,
  getEmbedCredentialFieldLabels,
  type EmbedAuthenticationMode,
  type EmbedAuthenticationType,
  type EmbedCredentials,
} from "../../customWidgets/embedConfig";

export function EmbedWidgetConfigPanel({
  authenticationMode,
  authenticationType,
  credentials,
  embedUrl,
  embedValidation,
  isReadOnly,
  onAuthenticationModeChange,
  onAuthenticationTypeChange,
  onCredentialChange,
  onEmbedUrlChange,
}: {
  authenticationMode: EmbedAuthenticationMode;
  authenticationType: EmbedAuthenticationType;
  credentials: EmbedCredentials;
  embedUrl: string;
  embedValidation: EmbedUrlValidation | null;
  isReadOnly: boolean;
  onAuthenticationModeChange: (mode: EmbedAuthenticationMode) => void;
  onAuthenticationTypeChange: (type: EmbedAuthenticationType) => void;
  onCredentialChange: (key: keyof EmbedCredentials, value: string) => void;
  onEmbedUrlChange: (value: string) => void;
}) {
  const showSharedCredentialFields = authenticationMode === "shared-credentials";
  const credentialLabels = getEmbedCredentialFieldLabels(authenticationType);
  const credentialKeys = ["credential1", "credential2", "credential3", "credential4"] as const;

  return (
    <div className="custom-widget-embed-config-panel">
      <label className="custom-widget-field">
        <span className="custom-widget-field-label">
          Embed URL <span className="custom-widget-required">*</span>
        </span>
        <textarea
          className={`custom-widget-embed-config-url${
            embedValidation && !embedValidation.valid ? " is-invalid" : ""
          }`}
          disabled={isReadOnly}
          onChange={(event) => onEmbedUrlChange(event.target.value)}
          placeholder="Input URL"
          rows={3}
          spellCheck={false}
          value={embedUrl}
        />
        {embedValidation && !embedValidation.valid ? (
          <span className="custom-widget-embed-config-error">{embedValidation.error}</span>
        ) : null}
      </label>

      <fieldset className="custom-widget-embed-config-fieldset">
        <legend className="custom-widget-field-label">
          Authentication Mode <span className="custom-widget-required">*</span>
        </legend>
        <div className="custom-widget-embed-config-radio-group" role="radiogroup">
          <label className="custom-widget-embed-config-radio">
            <input
              checked={authenticationMode === "shared-credentials"}
              disabled={isReadOnly}
              name="embed-authentication-mode"
              onChange={() => onAuthenticationModeChange("shared-credentials")}
              type="radio"
              value="shared-credentials"
            />
            <span>Shared Credentials</span>
          </label>
          <label className="custom-widget-embed-config-radio">
            <input
              checked={authenticationMode === "user-login-required"}
              disabled={isReadOnly}
              name="embed-authentication-mode"
              onChange={() => onAuthenticationModeChange("user-login-required")}
              type="radio"
              value="user-login-required"
            />
            <span>User Login Required</span>
          </label>
        </div>
      </fieldset>

      {showSharedCredentialFields ? (
        <>
          <label className="custom-widget-field">
            <span className="custom-widget-field-label">
              Authentication Type <span className="custom-widget-required">*</span>
            </span>
            <select
              disabled={isReadOnly}
              onChange={(event) =>
                onAuthenticationTypeChange(event.target.value as EmbedAuthenticationType)
              }
              value={authenticationType}
            >
              {EMBED_AUTHENTICATION_TYPE_OPTIONS.map((option) => (
                <option key={option.value || "placeholder"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {authenticationType
            ? credentialKeys.map((key, index) => (
                <label className="custom-widget-field" key={key}>
                  <span className="custom-widget-field-label">{credentialLabels[index]}</span>
                  <input
                    disabled={isReadOnly}
                    onChange={(event) => onCredentialChange(key, event.target.value)}
                    type="text"
                    value={credentials[key]}
                  />
                </label>
              ))
            : null}
        </>
      ) : null}
    </div>
  );
}
