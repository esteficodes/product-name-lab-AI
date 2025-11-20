import React from "react";

interface ResultPanelProps {
  mainName: string;
  altNames: string[];
  onCopy: () => void;
  onRegenerate: () => void;
  copied: boolean;
}

const ResultPanel: React.FC<ResultPanelProps> = ({
  mainName,
  altNames,
  onCopy,
  onRegenerate,
  copied,
}) => {
  return (
    <>
      <section className="result-panel">
        <p className="result-label">SUGGESTED NAME</p>
        <p className="result-main">{mainName}</p>
        <div className="result-actions">
          <button type="button" className="secondary-button" onClick={onCopy}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={onRegenerate}
          >
            Regenerate
          </button>
        </div>
      </section>

      <ul className="alt-list">
        {altNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default ResultPanel;
