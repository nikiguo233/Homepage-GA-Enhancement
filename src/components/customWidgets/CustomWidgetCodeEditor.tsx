import { useEffect, useMemo, useRef } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

const CODE_FONT =
  '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
const CODE_FONT_SIZE = 12;
const CODE_LINE_HEIGHT = 18;
const CODE_PADDING = 16;

function highlightHtml(code: string) {
  return highlight(code, languages.markup, "markup");
}

function getLineCount(value: string) {
  return Math.max(1, value.split("\n").length);
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
  const shellRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const lineCount = useMemo(() => getLineCount(value), [value]);

  useEffect(() => {
    const editor = shellRef.current?.querySelector<HTMLElement>(".custom-widget-code-editor");
    const gutter = gutterRef.current;
    if (!editor || !gutter) {
      return;
    }

    const syncGutterScroll = () => {
      gutter.scrollTop = editor.scrollTop;
    };

    syncGutterScroll();
    editor.addEventListener("scroll", syncGutterScroll, { passive: true });
    return () => editor.removeEventListener("scroll", syncGutterScroll);
  }, [lineCount]);

  return (
    <div className="custom-widget-code-editor-shell" ref={shellRef}>
      <div
        aria-hidden="true"
        className="custom-widget-code-editor-gutter"
        ref={gutterRef}
        style={{ paddingTop: CODE_PADDING }}
      >
        {Array.from({ length: lineCount }, (_, index) => (
          <div className="custom-widget-code-editor-line-number" key={index + 1}>
            {index + 1}
          </div>
        ))}
      </div>
      <Editor
        className="custom-widget-code-editor"
        highlight={highlightHtml}
        onValueChange={readOnly ? () => undefined : onChange}
        padding={CODE_PADDING}
        preClassName="custom-widget-code-editor-highlight"
        spellCheck={false}
        style={{
          fontFamily: CODE_FONT,
          fontSize: CODE_FONT_SIZE,
          lineHeight: `${CODE_LINE_HEIGHT}px`,
        }}
        readOnly={readOnly}
        textareaClassName="custom-widget-code-editor-textarea"
        value={value}
      />
    </div>
  );
}
