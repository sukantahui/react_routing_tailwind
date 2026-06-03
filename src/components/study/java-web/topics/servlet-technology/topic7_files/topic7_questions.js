const questions = [
  {
    question: "What is the minimum Servlet version required to use annotations like @WebServlet?",
    shortAnswer: "Servlet 3.0 (part of Java EE 6)",
    explanation: "Servlet 3.0 introduced annotations to reduce web.xml configuration.",
    hint: "Check your web.xml version or container support.",
    level: "basic",
    codeExample: "@WebServlet(\"/hello\")"
  },
  {
    question: "How do you define multiple URL patterns for a servlet using annotations?",
    shortAnswer: "Use the urlPatterns attribute with an array of strings.",
    explanation: "Example: @WebServlet(urlPatterns = {\"/user\", \"/account/*\"})",
    level: "basic"
  },
  {
    question: "What annotation would you use to register a ServletContextListener without web.xml?",
    shortAnswer: "@WebListener",
    explanation: "The container scans for this annotation and automatically registers the listener.",
    level: "basic"
  },
  {
    question: "How can you specify init parameters for a servlet using annotations?",
    shortAnswer: "Use the initParams attribute of @WebServlet with an array of @WebInitParam.",
    level: "intermediate",
    codeExample: "@WebServlet(urlPatterns=\"/\", initParams={@WebInitParam(name=\"p\",value=\"v\")})"
  },
  {
    question: "Can you use both @WebServlet and web.xml for the same servlet? What happens?",
    shortAnswer: "Yes, but web.xml overrides the annotation if both define the same servlet name or conflicting mappings.",
    explanation: "Container merges definitions; web.xml has higher precedence.",
    level: "advanced"
  },
  // ... generate 25 more covering:
  // - @WebFilter dispatcherTypes
  // - order of filters with annotations
  // - asyncSupported attribute
  // - loadOnStartup default value (negative = lazy)
  // - When to use web.xml over annotations (configuration without recompile)
  // - How to disable annotation scanning (metadata-complete)
  // - Multiple listeners in one class
  // - Annotation inheritance (does not inherit from superclass unless annotated)
  // - Value vs urlPatterns difference
  // - Servlet 4.0 additions (push support annotations? Not specifically)
  // - Common container compatibility issues
  // - package scanning implications on startup time
  // - Alternatives: web-fragment.xml for modular annotation handling
  // - And more – total 30
];

export default questions;