const questions = [
  {
    question: "What is the purpose of ServletContextListener?",
    shortAnswer: "To react to web application startup and shutdown events.",
    explanation: "contextInitialized() runs when the app is deployed; contextDestroyed() when undeployed.",
    hint: "Used for one-time initialisation like database connection pools.",
    level: "basic",
    codeExample: "@WebListener public class MyListener implements ServletContextListener { ... }"
  },
  {
    question: "How do you register a listener without web.xml?",
    shortAnswer: "Use the @WebListener annotation on the listener class.",
    explanation: "The container scans for this annotation and auto-registers the listener.",
    level: "basic"
  },
  {
    question: "Which listener interface would you implement to track active user sessions?",
    shortAnswer: "HttpSessionListener",
    explanation: "Its sessionCreated() and sessionDestroyed() methods fire when sessions are created or invalidated.",
    level: "basic"
  },
  {
    question: "Can a single class implement multiple listener interfaces?",
    shortAnswer: "Yes, it will be registered for all implemented listener types.",
    explanation: "For example, a class can implement both ServletContextListener and HttpSessionListener.",
    level: "intermediate"
  },
  {
    question: "What method is called when a request is about to be processed?",
    shortAnswer: "ServletRequestListener.requestInitialized()",
    explanation: "It fires before any servlet or filter processes the request.",
    level: "basic"
  },
  {
    question: "How can you access the ServletContext inside a ServletContextListener?",
    shortAnswer: "Via ServletContextEvent.getServletContext()",
    level: "basic",
    codeExample: "public void contextInitialized(ServletContextEvent sce) { ServletContext ctx = sce.getServletContext(); }"
  },
  // ... generate 24 more covering:
  // - Difference between HttpSessionListener and HttpSessionAttributeListener
  // - ServletRequestAttributeListener methods
  // - Listener execution order (web.xml order)
  // - Can you throw an exception in contextInitialized? What happens?
  // - How to share data between listeners and servlets
  // - Thread-safety of listeners (context listener runs in container thread, session/request are concurrent)
  // - Handling session timeout vs explicit invalidate (both call sessionDestroyed)
  // - Memory leak issues with listeners (storing references to sessions)
  // - Asynchronous listeners? (Not directly, but can use AsyncContext)
  // - Listener vs Filter use cases
  // - Servlet 4.0 push builder and listeners? (No, but can be combined)
  // - Using ServletContextListener with Spring (ContextLoaderListener)
  // - And more – total 30
];

export default questions;