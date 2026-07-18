import { useCallback, useEffect, useMemo, useState } from "react";
import { SEED_HOMEPAGE_TEMPLATES } from "./seedHomepageTemplates";
import {
  createTemplateId,
  type HomepageTemplate,
  type HomepageTemplateDraft,
} from "./teamTemplate";

const STORAGE_KEY = "zuora-homepage-templates";
const SEEDED_FLAG_KEY = "zuora-homepage-templates-seeded";

function loadTemplates(): HomepageTemplate[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as HomepageTemplate[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistTemplates(templates: HomepageTemplate[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

function ensureSeedTemplates(): HomepageTemplate[] {
  const existing = loadTemplates();

  if (existing.length > 0) {
    return existing;
  }

  if (window.localStorage.getItem(SEEDED_FLAG_KEY) === "true") {
    return existing;
  }

  window.localStorage.setItem(SEEDED_FLAG_KEY, "true");
  persistTemplates(SEED_HOMEPAGE_TEMPLATES);
  return SEED_HOMEPAGE_TEMPLATES;
}


export function useHomepageTemplates() {
  const [templates, setTemplates] = useState<HomepageTemplate[]>(() => ensureSeedTemplates());

  useEffect(() => {
    persistTemplates(templates);
  }, [templates]);

  const publishedTemplates = useMemo(
    () => templates.filter((template) => template.status === "published"),
    [templates],
  );
  const draftTemplates = useMemo(
    () => templates.filter((template) => template.status === "draft"),
    [templates],
  );

  const getTemplateById = useCallback(
    (templateId: string) => templates.find((template) => template.id === templateId),
    [templates],
  );

  const saveTemplate = useCallback((draft: HomepageTemplateDraft) => {
    const now = new Date().toISOString();

    setTemplates((current) => {
      const existingIndex = current.findIndex((template) => template.id === draft.id);

      if (existingIndex === -1) {
        return [...current, { ...draft, createdAt: now, updatedAt: now }];
      }

      return current.map((template, index) =>
        index === existingIndex
          ? {
              ...template,
              ...draft,
              updatedAt: now,
            }
          : template,
      );
    });

    return draft.id;
  }, []);

  const createTemplate = useCallback((draft?: HomepageTemplateDraft) => {
    const now = new Date().toISOString();
    const nextTemplate: HomepageTemplate = draft
      ? { ...draft, createdAt: now, updatedAt: now }
      : {
          id: createTemplateId(),
          name: "",
          description: "",
          audience: "",
          dashboardWidgetIds: [],
          customWidgetRefs: [],
          status: "draft",
          createdAt: now,
          updatedAt: now,
        };

    setTemplates((current) => [...current, nextTemplate]);
    return nextTemplate.id;
  }, []);

  const deleteTemplate = useCallback((templateId: string) => {
    setTemplates((current) => current.filter((template) => template.id !== templateId));
  }, []);

  const publishTemplate = useCallback((draft: HomepageTemplateDraft) => {
    saveTemplate({ ...draft, status: "published" });
  }, [saveTemplate]);

  return {
    createTemplate,
    deleteTemplate,
    draftTemplates,
    getTemplateById,
    publishTemplate,
    publishedTemplates,
    saveTemplate,
    templates,
  };
}
