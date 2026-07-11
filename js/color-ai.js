// color-ai.js
// FashionAI Color Intelligence

const COLOR_FAMILIES = {
  black: ["black", "jet black", "charcoal"],
  white: ["white", "ivory", "cream", "off white"],
  grey: ["grey", "gray", "silver"],
  blue: ["blue", "navy", "sky blue", "royal blue", "teal"],
  red: ["red", "maroon", "burgundy", "wine"],
  green: ["green", "olive", "forest green", "sage", "mint"],
  brown: ["brown", "tan", "camel", "chocolate"],
  beige: ["beige", "khaki", "sand", "stone"],
  yellow: ["yellow", "mustard", "gold"],
  orange: ["orange", "rust", "terracotta"],
  pink: ["pink", "rose", "blush"],
  purple: ["purple", "violet", "lavender"]
};

const HARMONY = {
  black: ["white", "grey", "beige", "brown", "blue", "green", "red"],
  white: ["black", "navy", "blue", "grey", "brown", "green"],
  blue: ["white", "grey", "brown", "beige"],
  brown: ["beige", "white", "blue", "green"],
  green: ["brown", "beige", "white"],
  beige: ["brown", "black", "white", "green"],
  red: ["black", "white", "grey"],
  pink: ["grey", "white", "navy"],
  purple: ["white", "grey"],
  yellow: ["navy", "black"],
  orange: ["navy", "white"]
};

function normalizeColor(color) {
  if (!color) return null;

  const value = color.toLowerCase().trim();

  for (const family in COLOR_FAMILIES) {
    if (COLOR_FAMILIES[family].includes(value)) {
      return family;
    }
  }

  return value;
}

export function getColorMatchScore(color1, color2) {

  const a = normalizeColor(color1);
  const b = normalizeColor(color2);

  if (!a || !b) return 40;

  if (a === b) return 95;

  if (
    HARMONY[a] &&
    HARMONY[a].includes(b)
  ) {
    return 100;
  }

  return 55;
}

export function normalizeFashionColor(color) {
  return normalizeColor(color);
}
