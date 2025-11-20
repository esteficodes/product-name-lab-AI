import React, { useState } from "react";
import StylePill from "./StylePill";
import ResultPanel from "./ResultPanel";
import { generateNames } from "../api";

const STYLE_OPTIONS = [
  "Techy",
  "Luxury",
  "Cute",
  "Minimalist",
  "Strong",
] as const;
type StyleOption = (typeof STYLE_OPTIONS)[number];

const ProductNameLab: React.FC = () => {
  const [description, setDescription] = useState<string>(
    "A minimalist to-do app for busy parents that uses AI to suggest daily priorities"
  );
  const [selectedStyles, setSelectedStyles] = useState<StyleOption[]>([
    "Minimalist",
  ]);
  const [mainName, setMainName] = useState<string>("PrioritiZen");
  const [altNames, setAltNames] = useState<string[]>([
    "FlowNest",
    "ParentPulse",
    "ClarityLane",
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  const toggleStyle = (style: StyleOption) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setValidationError(
        "Please describe your product before generating a name."
      );
      return;
    }
    setValidationError("");
    setError("");
    setCopied(false);
    setLoading(true);
    try {
      const result = await generateNames(description, selectedStyles);
      setMainName(result.mainName);
      setAltNames(result.alternatives);
    } catch (err) {
      console.error(err);
      setError("Could not generate names. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!mainName) return;
    try {
      await navigator.clipboard.writeText(mainName);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
      setError("Copy failed. You can copy the name manually.");
    }
  };

  const handleRegenerate = async () => {
    await handleGenerate();
  };

  return (
    <div className="card">
      <header className="card-header">
        <div className="card-title-row">
          <span className="brain-icon" role="img" aria-label="brain">
            🧠
          </span>
          <div>
            <h1 className="card-title">Product Name Lab</h1>
            <p className="card-subtitle">AI-powered ideas</p>
          </div>
        </div>
      </header>

      <section className="field-section">
        <label className="field-label" htmlFor="description">
          Describe your product
        </label>
        <textarea
          id="description"
          className="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        {validationError && (
          <p className="validation-error">{validationError}</p>
        )}
      </section>

      <section className="field-section">
        <p className="field-label">Style &amp; tone</p>
        <div className="pill-row">
          {STYLE_OPTIONS.map((style) => (
            <StylePill
              key={style}
              label={style}
              selected={selectedStyles.includes(style)}
              onClick={() => toggleStyle(style)}
            />
          ))}
        </div>
      </section>

      <button
        className="primary-button"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating…" : "Generate Name"}
      </button>

      <ResultPanel
        mainName={mainName}
        altNames={altNames}
        onCopy={handleCopy}
        onRegenerate={handleRegenerate}
        copied={copied}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ProductNameLab;
