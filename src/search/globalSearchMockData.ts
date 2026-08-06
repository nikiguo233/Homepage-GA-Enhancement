export type GlobalSearchCategory =
  | "Customers"
  | "Subscriptions"
  | "Invoices"
  | "Credit Memos"
  | "Bill Runs"
  | "Payments"
  | "Orders"
  | "Navigation";

export type GlobalSearchEntityResult = {
  id: string;
  title: string;
  meta: string;
  status?: "ACTIVE" | "DRAFT" | "PAID" | "OPEN";
  category: GlobalSearchCategory;
  keywords: string[];
};

export const GLOBAL_SEARCH_CATEGORIES: GlobalSearchCategory[] = [
  "Customers",
  "Subscriptions",
  "Invoices",
  "Credit Memos",
  "Bill Runs",
  "Payments",
  "Orders",
  "Navigation",
];

const CUSTOMER_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "customer-1",
    title: "Account Name",
    meta: "A00001234 · $ 100.00",
    status: "ACTIVE",
    category: "Customers",
    keywords: ["account", "customer", "subscription", "active"],
  },
  {
    id: "customer-2",
    title: "Acme Corporation",
    meta: "A00004567 · $ 128,450.00",
    status: "ACTIVE",
    category: "Customers",
    keywords: ["acme", "account", "customer", "corporation"],
  },
  {
    id: "customer-3",
    title: "Northwind Traders",
    meta: "A00007891 · $ 54,320.00",
    status: "ACTIVE",
    category: "Customers",
    keywords: ["northwind", "account", "customer", "traders"],
  },
  {
    id: "customer-4",
    title: "Blue Sky Systems",
    meta: "A00003456 · $ 89,120.00",
    status: "ACTIVE",
    category: "Customers",
    keywords: ["blue", "sky", "account", "customer"],
  },
  {
    id: "customer-5",
    title: "Vertex Analytics",
    meta: "A00009876 · $ 12,480.00",
    status: "ACTIVE",
    category: "Customers",
    keywords: ["vertex", "account", "customer", "analytics"],
  },
];

const SUBSCRIPTION_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "subscription-1",
    title: "Enterprise Platform Subscription",
    meta: "S00001234 · Acme Corporation",
    status: "ACTIVE",
    category: "Subscriptions",
    keywords: ["subscription", "enterprise", "platform", "acme"],
  },
  {
    id: "subscription-2",
    title: "Growth Plan Subscription",
    meta: "S00005678 · Northwind Traders",
    status: "ACTIVE",
    category: "Subscriptions",
    keywords: ["subscription", "growth", "northwind"],
  },
  {
    id: "subscription-3",
    title: "Analytics Add-on Subscription",
    meta: "S00009012 · Blue Sky Systems",
    status: "ACTIVE",
    category: "Subscriptions",
    keywords: ["subscription", "analytics", "addon"],
  },
];

const INVOICE_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "invoice-1",
    title: "Invoice INV-10482",
    meta: "A00001234 · $ 100.00",
    status: "OPEN",
    category: "Invoices",
    keywords: ["invoice", "inv-10482", "billing", "subscription"],
  },
  {
    id: "invoice-2",
    title: "Invoice INV-10491",
    meta: "A00004567 · $ 4,820.00",
    status: "PAID",
    category: "Invoices",
    keywords: ["invoice", "inv-10491", "paid"],
  },
];

const CREDIT_MEMO_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "credit-1",
    title: "Credit Memo CM-2201",
    meta: "A00001234 · $ 250.00",
    status: "ACTIVE",
    category: "Credit Memos",
    keywords: ["credit", "memo", "cm-2201"],
  },
];

const BILL_RUN_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "bill-run-1",
    title: "September 2024 Bill Run",
    meta: "BR000045 · 128 invoices",
    status: "ACTIVE",
    category: "Bill Runs",
    keywords: ["bill", "run", "september"],
  },
];

const PAYMENT_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "payment-1",
    title: "Payment PMT-8831",
    meta: "A00001234 · $ 100.00",
    status: "ACTIVE",
    category: "Payments",
    keywords: ["payment", "pmt-8831"],
  },
];

const ORDER_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "order-1",
    title: "Order ORD-7712",
    meta: "A00004567 · Enterprise Platform",
    status: "ACTIVE",
    category: "Orders",
    keywords: ["order", "ord-7712", "enterprise"],
  },
];

const NAVIGATION_RESULTS: GlobalSearchEntityResult[] = [
  {
    id: "nav-1",
    title: "Revenue Contracts",
    meta: "Page · Revenue",
    category: "Navigation",
    keywords: ["page", "revenue", "contracts", "navigation"],
  },
  {
    id: "nav-2",
    title: "Data Integration",
    meta: "Page · Settings",
    category: "Navigation",
    keywords: ["page", "data", "integration", "settings"],
  },
];

export const GLOBAL_SEARCH_MOCK_RESULTS: GlobalSearchEntityResult[] = [
  ...CUSTOMER_RESULTS,
  ...SUBSCRIPTION_RESULTS,
  ...INVOICE_RESULTS,
  ...CREDIT_MEMO_RESULTS,
  ...BILL_RUN_RESULTS,
  ...PAYMENT_RESULTS,
  ...ORDER_RESULTS,
  ...NAVIGATION_RESULTS,
];

const CATEGORY_RESULT_COUNTS: Record<GlobalSearchCategory, number> = {
  Customers: 200,
  Subscriptions: 84,
  Invoices: 156,
  "Credit Memos": 24,
  "Bill Runs": 12,
  Payments: 96,
  Orders: 48,
  Navigation: 18,
};

function matchesQuery(result: GlobalSearchEntityResult, normalized: string) {
  if (!normalized) {
    return true;
  }

  const haystack = [result.title, result.meta, result.category, ...result.keywords]
    .join(" ")
    .toLowerCase();

  return normalized.split(/\s+/).every((token) => haystack.includes(token));
}

export function filterGlobalSearchResults(
  query: string,
  category: GlobalSearchCategory,
): GlobalSearchEntityResult[] {
  const normalized = query.trim().toLowerCase();

  return GLOBAL_SEARCH_MOCK_RESULTS.filter(
    (result) => result.category === category && matchesQuery(result, normalized),
  ).slice(0, 5);
}

export function getGlobalSearchCategoryCounts(query: string): Record<GlobalSearchCategory, number> {
  const normalized = query.trim().toLowerCase();

  return GLOBAL_SEARCH_CATEGORIES.reduce(
    (counts, category) => {
      const matches = GLOBAL_SEARCH_MOCK_RESULTS.filter(
        (result) => result.category === category && matchesQuery(result, normalized),
      ).length;

      counts[category] = matches > 0 ? CATEGORY_RESULT_COUNTS[category] : 0;
      return counts;
    },
    {} as Record<GlobalSearchCategory, number>,
  );
}

export function getDefaultGlobalSearchCategory(
  query: string,
  categoryCounts: Record<GlobalSearchCategory, number>,
): GlobalSearchCategory {
  const normalized = query.trim().toLowerCase();

  if (normalized.includes("subscription")) {
    return categoryCounts.Subscriptions > 0 ? "Subscriptions" : "Customers";
  }

  if (normalized.includes("invoice")) {
    return categoryCounts.Invoices > 0 ? "Invoices" : "Customers";
  }

  const firstWithResults = GLOBAL_SEARCH_CATEGORIES.find((category) => categoryCounts[category] > 0);
  return firstWithResults ?? "Customers";
}

export function getTotalEntityCount(categoryCounts: Record<GlobalSearchCategory, number>) {
  const total = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  return total > 999 ? "999+" : String(total);
}

export function hasGlobalSearchResults(categoryCounts: Record<GlobalSearchCategory, number>) {
  return Object.values(categoryCounts).some((count) => count > 0);
}

export function getCategoryResultCount(
  category: GlobalSearchCategory,
  categoryCounts: Record<GlobalSearchCategory, number>,
) {
  return categoryCounts[category] ?? 0;
}
