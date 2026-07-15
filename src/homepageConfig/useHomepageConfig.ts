import { useCallback, useState } from "react";
import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import type { HomepageCleanupPlan } from "./homepageCleanup";
import type { HomepageLayout } from "./types";

type CleanupSnapshot = {
  addedWidgetIds: string[];
  hiddenMetricCardLabels: string[];
  removedWidgetIds: DashboardWidgetId[];
  widgetOrder: DashboardWidgetId[] | null;
};

export function useHomepageConfig() {
  const [layout, setLayout] = useState<HomepageLayout>("default");
  const [addedWidgetIds, setAddedWidgetIds] = useState<string[]>([]);
  const [widgetOrder, setWidgetOrder] = useState<DashboardWidgetId[] | null>(null);
  const [removedWidgetIds, setRemovedWidgetIds] = useState<DashboardWidgetId[]>([]);
  const [hiddenMetricCardLabels, setHiddenMetricCardLabels] = useState<string[]>([]);
  const [cleanupSnapshot, setCleanupSnapshot] = useState<CleanupSnapshot | null>(null);

  const applyAiGeneratedLayout = useCallback(() => {
    setLayout("ai-generated");
  }, []);

  const resetToDefaultLayout = useCallback(() => {
    setLayout("default");
    setAddedWidgetIds([]);
    setWidgetOrder(null);
    setRemovedWidgetIds([]);
    setHiddenMetricCardLabels([]);
  }, []);

  const addWidgets = useCallback((widgetIds: string[]) => {
    setAddedWidgetIds((current) => [...new Set([...current, ...widgetIds])]);
  }, []);

  const applyCleanupPlan = useCallback(
    (plan: HomepageCleanupPlan) => {
      setCleanupSnapshot({
        addedWidgetIds: [...addedWidgetIds],
        hiddenMetricCardLabels: [...hiddenMetricCardLabels],
        removedWidgetIds: [...removedWidgetIds],
        widgetOrder: widgetOrder ? [...widgetOrder] : null,
      });
      setRemovedWidgetIds((current) => [...new Set([...current, ...plan.removedWidgetIds])]);
      setHiddenMetricCardLabels(plan.hiddenMetricCardLabels);
      setWidgetOrder(plan.orderedWidgetIds);

      if (layout === "ai-generated") {
        setAddedWidgetIds(plan.orderedWidgetIds);
      }
    },
    [addedWidgetIds, hiddenMetricCardLabels, layout, removedWidgetIds, widgetOrder],
  );

  const undoCleanup = useCallback(() => {
    if (!cleanupSnapshot) {
      return;
    }

    setRemovedWidgetIds(cleanupSnapshot.removedWidgetIds);
    setHiddenMetricCardLabels(cleanupSnapshot.hiddenMetricCardLabels);
    setWidgetOrder(cleanupSnapshot.widgetOrder);

    if (layout === "ai-generated") {
      setAddedWidgetIds(cleanupSnapshot.addedWidgetIds);
    }

    setCleanupSnapshot(null);
  }, [cleanupSnapshot, layout]);

  return {
    addWidgets,
    addedWidgetIds,
    applyAiGeneratedLayout,
    applyCleanupPlan,
    hiddenMetricCardLabels,
    isAiGenerated: layout === "ai-generated",
    layout,
    removedWidgetIds,
    resetToDefaultLayout,
    setLayout,
    undoCleanup,
    widgetOrder,
  };
};
