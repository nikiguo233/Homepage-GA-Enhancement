import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

const CODE_FONT =
  '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

function highlightHtml(code: string) {
  return highlight(code, languages.markup, "markup");
}

export function CustomWidgetCodeEditor({
  onChange,
  readOnly = false,
  value,
}: {
  onChange: (value: string) => void;
  readOnly?: boolean;
  value: string;
}) {
  return (
    <Editor
      className="custom-widget-code-editor"
      highlight={highlightHtml}
      onValueChange={readOnly ? () => undefined : onChange}
      padding={16}
      preClassName="custom-widget-code-editor-highlight"
      spellCheck={false}
      style={{
        fontFamily: CODE_FONT,
        fontSize: 12,
        lineHeight: "18px",
      }}
      readOnly={readOnly}
      textareaClassName="custom-widget-code-editor-textarea"
      value={value}
    />
  );
}
