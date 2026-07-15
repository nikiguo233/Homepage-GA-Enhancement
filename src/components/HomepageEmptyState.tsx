const EMPTY_WIDGET_PLACEHOLDER_COUNT = 6;

export function HomepageEmptyState() {
  return (
    <section aria-label="Empty homepage" className="homepage-empty-state">
      {Array.from({ length: EMPTY_WIDGET_PLACEHOLDER_COUNT }, (_, index) => (
        <div aria-hidden="true" className="homepage-empty-widget-placeholder" key={index} />
      ))}
    </section>
  );
}
