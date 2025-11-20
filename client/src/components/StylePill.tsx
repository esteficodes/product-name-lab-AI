import React from "react";

interface StylePillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const StylePill: React.FC<StylePillProps> = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      className={`style-pill ${selected ? "style-pill--selected" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default StylePill;
