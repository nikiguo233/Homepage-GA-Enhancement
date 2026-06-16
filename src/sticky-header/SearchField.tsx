import SearchIcon from "@mui/icons-material/Search";
import { forwardRef } from "react";

export const SearchField = forwardRef<
  HTMLLabelElement,
  {
    className?: string;
    compact?: boolean;
    hidden?: boolean;
    placeholder?: string;
    tabIndex?: number;
  }
>(function SearchField(
  { className, compact = false, hidden = false, placeholder = "Search in Zuora", tabIndex },
  ref,
) {
  const classes = ["search-field", compact ? "search-field-compact" : "", className].filter(Boolean).join(" ");

  return (
    <label className={classes} aria-hidden={hidden || undefined} ref={ref}>
      <SearchIcon />
      <input aria-label={placeholder} placeholder={placeholder} tabIndex={hidden ? -1 : tabIndex} />
    </label>
  );
});
