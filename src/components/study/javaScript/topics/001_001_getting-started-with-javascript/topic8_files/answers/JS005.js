/**
 * JS005: Three Web Pillars: Coordinating Structure, Style & Behavior
 * Module: 001_001_getting-started-with-javascript (Topic 2)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

// Theme Controller demonstrating Separation of Concerns:
// HTML holds the DOM structure
// CSS classes define styles (.theme-dark, .theme-light)
// JavaScript manages state transitions & class toggling
const ThemeController = {
  currentTheme: "light",

  themes: {
    light: { background: "#ffffff", color: "#0f172a", className: "theme-light" },
    dark: { background: "#0f172a", color: "#f8fafc", className: "theme-dark" }
  },

  toggle() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    const activeConfig = this.themes[this.currentTheme];

    // In a browser runtime, toggle classes on documentElement
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.classList.remove("theme-light", "theme-dark");
      document.documentElement.classList.add(activeConfig.className);
    }

    return {
      activeTheme: this.currentTheme,
      appliedClass: activeConfig.className,
      computedStyles: {
        backgroundColor: activeConfig.background,
        textColor: activeConfig.color
      }
    };
  }
};

console.log("Initial State:", ThemeController.currentTheme);
console.log("Toggle 1:", ThemeController.toggle());
console.log("Toggle 2:", ThemeController.toggle());
