import type { ReactNode, RefObject } from "react";
import { SearchField } from "./SearchField";

export function StickyHeader({
  active,
  announcementCount,
  headerActionsSlotRef,
  onAnnouncementChipClick,
  showAnnouncementChip,
  stickyHeaderRef,
  stickySearchPlaceholderRef,
  title,
}: {
  active: boolean;
  announcementCount?: number;
  headerActionsSlotRef: RefObject<HTMLDivElement | null>;
  onAnnouncementChipClick?: () => void;
  showAnnouncementChip?: boolean;
  stickyHeaderRef: RefObject<HTMLElement | null>;
  stickySearchPlaceholderRef: RefObject<HTMLLabelElement | null>;
  title: string;
}) {
  const announcementLabel =
    announcementCount === 1 ? "1 announcement" : `${announcementCount ?? 0} announcements`;

  return (
    <header
      className="homepage-sticky-header"
      aria-hidden={!active}
      ref={stickyHeaderRef as RefObject<HTMLElement>}
    >
      <div className="sticky-header-leading">
        <h1>{title}</h1>
        {showAnnouncementChip ? (
          <button
            aria-label={`View ${announcementLabel}`}
            className="announcement-chip"
            onClick={onAnnouncementChipClick}
            type="button"
          >
            {announcementLabel}
          </button>
        ) : null}
      </div>
      <div className="sticky-actions">
        <SearchField className="sticky-search-placeholder" compact hidden ref={stickySearchPlaceholderRef} />
        <div className="header-actions-slot" aria-hidden="true" ref={headerActionsSlotRef} />
      </div>
    </header>
  );
}

export function MorphingSearchField() {
  return <SearchField className="morphing-search-control" />;
}

export function MorphingFloatingActions({ children }: { children: ReactNode }) {
  return <div className="morphing-floating-actions">{children}</div>;
}

export function WelcomeSearchHero({
  title,
  welcomeSearchPlaceholderRef,
  welcomeSearchRef,
}: {
  title: string;
  welcomeSearchPlaceholderRef: RefObject<HTMLLabelElement | null>;
  welcomeSearchRef: RefObject<HTMLElement | null>;
}) {
  return (
    <section className="welcome-search" ref={welcomeSearchRef as RefObject<HTMLElement>}>
      <h2>{title}</h2>
      <SearchField className="welcome-search-placeholder" hidden ref={welcomeSearchPlaceholderRef} />
    </section>
  );
}
