import growthStandards from "../assets/growthStandards.js";
import { Z_SCORE_THRESHOLDS } from "../constants.js";

// LMS z-score calculation
export function calculateZScores({ ageInMonths, height, weight, gender }) {
  const idx = ageInMonths <= 24 ? 0 : 1;
  const standards =
    growthStandards[gender === "female" ? "girls" : "boys"][idx];

  const rec = (value, key) =>
    standards.reduce((prev, curr) =>
      Math.abs(curr[key] - value) < Math.abs(prev[key] - value) ? curr : prev
    );

  const byAge =
    standards.find((s) => Math.floor((s.Length - 45) * 2) === ageInMonths) ||
    rec(ageInMonths, "Length");
  const byHeight = rec(height, "Length");

  const { L: L_age, M: M_age, S: S_age } = byAge;
  const { L: L_ht, M: M_ht, S: S_ht } = byHeight;

  return {
    waz: computeZ(weight, M_age, L_age, S_age),
    haz: computeZ(height, M_age, L_age, S_age),
    whz: computeZ(weight, M_ht, L_ht, S_ht),
  };
}

function computeZ(X, M, L, S) {
  return L === 0 ? Math.log(X / M) / S : (Math.pow(X / M, L) - 1) / (L * S);
}

export function classifyZScore(z, hasEdema) {
  if (hasEdema) return "sam";
  if (z < Z_SCORE_THRESHOLDS.MAM) return "sam";
  if (z < Z_SCORE_THRESHOLDS.NORMAL) return "mam";
  return "normal";
}
