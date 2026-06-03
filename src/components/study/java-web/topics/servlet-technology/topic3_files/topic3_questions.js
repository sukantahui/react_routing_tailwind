const questions = [
  {
    question: "What is the main purpose of ServletConfig?",
    shortAnswer: "Provides servlet-specific initialization parameters and access to ServletContext.",
    explanation: "ServletConfig is passed to the servlet's init() method and holds configuration data defined per servlet.",
    hint: "Think of it as a constructor argument for the servlet.",
    level: "basic",
    codeExample: "String val = getServletConfig().getInitParameter(\"myParam\");"
  },
  {
    question: "How many ServletContext objects exist in a web application?",
    shortAnswer: "Exactly one per web application.",
    explanation: "The container creates one ServletContext object when the application starts and destroys it on shutdown.",
    hint: "It's shared across all servlets, JSPs, and filters.",
    level: "basic"
  },
  {
    question: "Can you get ServletContext from a ServletConfig object?",
    shortAnswer: "Yes, using config.getServletContext().",
    explanation: "ServletConfig provides a reference to the application's ServletContext.",
    level: "basic"
  },
  // ... (remaining 27 questions follow the same pattern)
  {
    question: "What happens if two servlets define the same context attribute name?",
    shortAnswer: "The last write wins, potentially causing unexpected overwrites.",
    explanation: "ServletContext attributes are global; subsequent setAttribute() with same name replaces the value.",
    hint: "Use unique names or prefix with servlet name to avoid collisions.",
    level: "intermediate"
  },
  {
    question: "Is ServletContext thread-safe?",
    shortAnswer: "No; modifications to shared attributes must be synchronized manually.",
    explanation: "Multiple servlets can access context concurrently; use synchronized blocks or AtomicInteger for counters.",
    level: "advanced"
  }
  // Up to 30
];

export default questions;