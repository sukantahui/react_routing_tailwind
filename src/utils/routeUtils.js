/**
 * routeUtils.js
 * Central routing and path utility functions.
 */

/**
 * Checks if the current pathname belongs to the tutorials or study section.
 * @param {string} pathname
 * @returns {boolean}
 */
export const isTutorialRoute = (pathname = "") => {
  if (!pathname || typeof pathname !== "string") return false;
  const p = pathname.toLowerCase();
  return (
    p.includes("/roadmap") ||
    p.includes("/module/") ||
    p.includes("/topic/") ||
    p.startsWith("/study") ||
    p.includes("/chapter")
  );
};
