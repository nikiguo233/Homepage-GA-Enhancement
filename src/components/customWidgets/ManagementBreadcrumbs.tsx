type BreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

export function ManagementBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="custom-widget-breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span className="custom-widget-breadcrumb-item" key={item.label}>
            {item.onClick && !isLast ? (
              <button onClick={item.onClick} type="button">
                {item.label}
              </button>
            ) : (
              <span>{item.label}</span>
            )}
            {!isLast ? <span className="custom-widget-breadcrumb-separator">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
