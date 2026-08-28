/**
 * JS008: Modern Script Loading: Defer vs Async Attribute Lifecycle
 * Module: 001_001_getting-started-with-javascript (Topic 4)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

const timeline = [];

function recordTimelineEvent(phase, description) {
  timeline.push({
    order: timeline.length + 1,
    phase,
    description
  });
}

// Model the browser parsing and execution pipeline
recordTimelineEvent("HTML Parsing", "Browser HTML Tokenizer begins parsing document from top to bottom.");
recordTimelineEvent("Async Download", "<script async src='analytics.js'> encountered -> Downloads in parallel in background.");
recordTimelineEvent("Defer Download", "<script defer src='app.js'> encountered -> Downloads in parallel in background.");
recordTimelineEvent("Async Execution", "analytics.js finishes downloading -> Parser pauses, analytics.js executes immediately!");
recordTimelineEvent("HTML Complete", "HTML Tokenizer reaches </html> -> DOM Tree construction finished.");
recordTimelineEvent("Defer Execution", "app.js executes with guaranteed access to the fully constructed DOM Tree in FIFO order.");
recordTimelineEvent("DOMContentLoaded", "Browser fires 'DOMContentLoaded' event -> UI is interactive.");

console.log("🌐 Browser Script Execution Lifecycle:");
console.table(timeline);
