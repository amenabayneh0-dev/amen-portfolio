/** Seconds the hero entrance waits so it lands as the SOLUS intro lifts away (0 when motion is reduced). */
export const INTRO_HERO_OFFSET =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : 3;
