// aiClient.js

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean);
}

function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generate(description, styles) {
  const baseTokens = [
    ...slugify(description),
    ...styles.map((s) => s.toLowerCase()),
  ];

  const tokens =
    baseTokens.length > 0 ? baseTokens : ["prioriti", "zen", "flow", "nest"];

  const suggestions = new Set();

  while (suggestions.size < 5 && suggestions.size < tokens.length ** 2) {
    const a = randomItem(tokens);
    let b = randomItem(tokens);
    if (b === a && tokens.length > 1) {
      b = randomItem(tokens.filter((t) => t !== a));
    }
    suggestions.add(titleCase(a) + titleCase(b));
  }

  if (suggestions.size === 0) {
    ["PrioritiZen", "FlowNest", "ParentPulse", "ClarityLane"].forEach((n) =>
      suggestions.add(n)
    );
  }

  return Array.from(suggestions);
}

async function generateNames(description, styles) {
  return generate(description, styles);
}

module.exports = { generateNames };
