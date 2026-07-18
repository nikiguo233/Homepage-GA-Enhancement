import aiSparkTabIconUrl from "../../assets/ai-spark-tab.svg";

export function AiGeneratedChip({ className }: { className?: string }) {
  return (
    <span className={`custom-widget-ai-generated-chip${className ? ` ${className}` : ""}`}>
      <img alt="" aria-hidden="true" className="custom-widget-ai-generated-chip-icon" src={aiSparkTabIconUrl} />
      <span className="custom-widget-ai-generated-chip-label">AI Generated</span>
    </span>
  );
}
