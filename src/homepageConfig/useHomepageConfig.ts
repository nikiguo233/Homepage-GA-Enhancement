import { useCallback, useState } from "react";
import { DASHBOARD_WIDGET_CATALOG, isDashboardWidgetId, type DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import { isCustomWidgetId } from "../customWidgets/types";
import type { AiGeneratedDashboardVariant } from "../ai/types";
import type { HomepageCleanupPlan } from "./homepageCleanup";
import type { HomepageLayout } from "./types";

type CleanupSnapshot = {
  addedWidgetIds: string[];
  aiLibraryWidgetIds: DashboardWidgetId[];
  hiddenMetricCardLabels: string[];
  metricCardOrder: string[] | null;
  removedWidgetIds: DashboardWidgetId[];
  widgetOrder: DashboardWidgetId[] | null;
};

export function useHomepageConfig() {
  const [layout, setLayout] = useState<HomepageLayout>("default");
  const [addedWidgetIds, setAddedWidgetIds] = useState<string[]>([]);
  const [widgetOrder, setWidgetOrder] = useState<DashboardWidgetId[] | null>(null);
  const [removedWidgetIds, setRemovedWidgetIds] = useState<DashboardWidgetId[]>([]);
  const [hiddenMetricCardLabels, setHiddenMetricCardLabels] = useState<string[]>([]);
  const [metricCardOrder, setMetricCardOrder] = useState<string[] | null>(null);
  const [cleanupSnapshot, setCleanupSnapshot] = useState<CleanupSnapshot | null>(null);
  const [aiDashboardVariant, setAiDashboardVariant] = useState<AiGeneratedDashboardVariant>("default");
  const [aiLibraryWidgetIds, setAiLibraryWidgetIds] = useState<DashboardWidgetId[]>([]);

  const applyAiGeneratedLayout = useCallback(
    (options?: { libraryWidgetIds?: DashboardWidgetId[]; variant?: AiGeneratedDashboardVariant }) => {
      setLayout("ai-generated");
      setAiDashboardVariant(options?.variant ?? "default");
      setAiLibraryWidgetIds(options?.libraryWidgetIds ?? []);
    },
    [],
  );

  const resetToDefaultLayout = useCallback(() => {
    setLayout("default");
    setAddedWidgetIds([]);
    setWidgetOrder(null);
    setRemovedWidgetIds([]);
    setHiddenMetricCardLabels([]);
    setMetricCardOrder(null);
    setAiDashboardVariant("default");
    setAiLibraryWidgetIds([]);
  }, []);

  const addWidgets = useCallback(
    (widgetIds: string[]) => {
      setAddedWidgetIds((current) => [...new Set([...current, ...widgetIds])]);

      if (layout === "ai-generated") {
        const dashboardWidgetIds = widgetIds.filter(isDashboardWidgetId);

        if (dashboardWidgetIds.length > 0) {
          setAiLibraryWidgetIds((current) => [...new Set([...current, ...dashboardWidgetIds])]);
        }
      }
    },
    [layout],
  );

  const removeWidget = useCallback(
    (widgetId: string) => {
      if (isCustomWidgetId(widgetId)) {
        setAddedWidgetIds((current) => current.filter((id) => id !== widgetId));
        return;
      }

      if (!isDashboardWidgetId(widgetId)) {
        return;
      }

      setRemovedWidgetIds((current) => [...new Set([...current, widgetId])]);
      setAddedWidgetIds((current) => current.filter((id) => id !== widgetId));

      if (layout === "ai-generated") {
        setAiLibraryWidgetIds((current) => current.filter((id) => id !== widgetId));
      }
    },
    [layout],
  );

  const applyCleanupPlan = useCallback(
    (plan: HomepageCleanupPlan, options?: { startWithEmptyHomepage?: boolean }) => {
      setCleanupSnapshot({
        addedWidgetIds: [...addedWidgetIds],
        aiLibraryWidgetIds: [...aiLibraryWidgetIds],
        hiddenMetricCardLabels: [...hiddenMetricCardLabels],
        metricCardOrder: metricCardOrder ? [...metricCardOrder] : null,
        removedWidgetIds: [...removedWidgetIds],
        widgetOrder: widgetOrder ? [...widgetOrder] : null,
      });
      setRemovedWidgetIds((current) => [...new Set([...current, ...plan.removedWidgetIds])]);
      setHiddenMetricCardLabels(plan.hiddenMetricCardLabels);
      setWidgetOrder(plan.orderedWidgetIds);

      if (plan.metricCardOrder.length > 0) {
        setMetricCardOrder(plan.metricCardOrder);
      }

      if (layout === "ai-generated") {
        const libraryIdSet = new Set(aiLibraryWidgetIds);
        const addedIdSet = new Set(addedWidgetIds);
        const nextLibraryOrder = plan.orderedWidgetIds.filter((id) => libraryIdSet.has(id));
        const nextAddedOrder = plan.orderedWidgetIds.filter((id) => addedIdSet.has(id));

        if (nextLibraryOrder.length > 0) {
          setAiLibraryWidgetIds(nextLibraryOrder);
        }

        if (nextAddedOrder.length > 0) {
          const nextAddedOrderSet = new Set<string>(nextAddedOrder);
          const remainder = addedWidgetIds.filter((id) => !nextAddedOrderSet.has(id));
          setAddedWidgetIds([...nextAddedOrder, ...remainder]);
        }
      } else {
        const dashboardIds = new Set<DashboardWidgetId>([
          ...DASHBOARD_WIDGET_CATALOG.map((widget) => widget.id),
          "revenue-progress",
        ]);
        const customIds = addedWidgetIds.filter((id) => !dashboardIds.has(id as DashboardWidgetId));
        const dashboardOnHomepage = addedWidgetIds.filter((id): id is DashboardWidgetId =>
          dashboardIds.has(id as DashboardWidgetId),
        );
        const shouldSyncAddedWidgetIds =
          options?.startWithEmptyHomepage === true || dashboardOnHomepage.length > 0;

        if (shouldSyncAddedWidgetIds) {
          const onHomepage = new Set<DashboardWidgetId>(dashboardOnHomepage);

          if (options?.startWithEmptyHomepage && plan.orderedWidgetIds.includes("revenue-progress")) {
            onHomepage.add("revenue-progress");
          }

          const reorderedDashboard = plan.orderedWidgetIds.filter((id) => onHomepage.has(id));
          setAddedWidgetIds([...reorderedDashboard, ...customIds]);
        }
      }
    },
    [
      addedWidgetIds,
      aiLibraryWidgetIds,
      hiddenMetricCardLabels,
      layout,
      metricCardOrder,
      removedWidgetIds,
      widgetOrder,
    ],
  );

  const undoCleanup = useCallback(() => {
    if (!cleanupSnapshot) {
      return;
    }

    setRemovedWidgetIds(cleanupSnapshot.removedWidgetIds);
    setHiddenMetricCardLabels(cleanupSnapshot.hiddenMetricCardLabels);
    setMetricCardOrder(cleanupSnapshot.metricCardOrder);
    setWidgetOrder(cleanupSnapshot.widgetOrder);

    if (layout === "ai-generated") {
      setAddedWidgetIds(cleanupSnapshot.addedWidgetIds);
      setAiLibraryWidgetIds(cleanupSnapshot.aiLibraryWidgetIds);
    } else {
      setAddedWidgetIds(cleanupSnapshot.addedWidgetIds);
    }

    setCleanupSnapshot(null);
  }, [cleanupSnapshot, layout]);

  return {
    addWidgets,
    addedWidgetIds,
    aiDashboardVariant,
    aiLibraryWidgetIds,
    applyAiGeneratedLayout,
    applyCleanupPlan,
    hiddenMetricCardLabels,
    isAiGenerated: layout === "ai-generated",
    layout,
    metricCardOrder,
    removedWidgetIds,
    removeWidget,
    resetToDefaultLayout,
    setLayout,
    undoCleanup,
    widgetOrder,
  };
};
