import growthStandards from "../assets/growthStandards.js";
import { Z_SCORE_THRESHOLDS } from "../constants.js";

export function calculateZScores({ height, weight, gender }) {
  const genderKey = gender === "female" ? "girls" : "boys";

  // weight-for-length data is the first array (index 0)
  const weightForLength = growthStandards[genderKey][0];

  const nearest = weightForLength.reduce((prev, curr) =>
    Math.abs(curr.Length - height) < Math.abs(prev.Length - height) ? curr : prev
  );

  const whz = computeZ(weight, nearest.M, nearest.L, nearest.S);
  return { whz };
}

function computeZ(X, M, L, S) {
  return L === 0 ? Math.log(X / M) / S : (Math.pow(X / M, L) - 1) / (L * S);
}

export function classifyZScore(z, hasEdema) {
  if (hasEdema) return "sam";
  if (z < Z_SCORE_THRESHOLDS.SAM) return "sam";
  if (z < Z_SCORE_THRESHOLDS.MAM) return "mam";
  return "normal";
}
  
