import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useEffect, useRef, useState } from "react";
import aiSparkTabIconUrl from "../../assets/ai-spark-tab.svg";

export type CreateWidgetOption = "html" | "embed" | "ai";

export function CreateWidgetDropdown({
  onSelect,
}: {
  onSelect: (option: CreateWidgetOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (option: CreateWidgetOption) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="create-widget-dropdown" ref={containerRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="custom-widget-primary-button create-widget-dropdown-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>Create Widget</span>
        <ArrowDropDownIcon aria-hidden="true" className="create-widget-dropdown-chevron" />
      </button>
      {open ? (
        <div className="create-widget-dropdown-menu" role="menu">
          <button
            className="homepage-actions-menu-item"
            onClick={() => handleSelect("html")}
            role="menuitem"
            type="button"
          >
            <CodeOutlinedIcon />
            <span>Custom HTML</span>
          </button>
          <button
            className="homepage-actions-menu-item"
            onClick={() => handleSelect("embed")}
            role="menuitem"
            type="button"
          >
            <LinkOutlinedIcon />
            <span>Embedded Content</span>
          </button>
          <button
            className="homepage-actions-menu-item create-widget-dropdown-menu-item-ai"
            onClick={() => handleSelect("ai")}
            role="menuitem"
            type="button"
          >
            <img alt="" aria-hidden="true" className="create-widget-dropdown-ai-icon" src={aiSparkTabIconUrl} />
            <span>Create with AI</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
