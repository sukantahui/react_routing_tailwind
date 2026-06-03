const questions = [
  {
    question: "What are the stages of the servlet lifecycle?",
    shortAnswer: "Loading/Instantiation, Initialization (init), Request Handling (service), Destruction (destroy).",
    explanation: "The servlet container controls these stages. init() runs once after servlet class loading, service() per request, destroy() on container shutdown.",
    hint: "Think of a school: Enrollment (load), Orientation (init), Daily classes (service), School demolition (destroy).",
    level: "basic",
    codeExample: "public void init(ServletConfig config) throws ServletException { }"
  },
  {
    question: "How many times is the init() method invoked?",
    shortAnswer: "Exactly once in the servlet's lifetime.",
    explanation: "init() is called after the servlet class is instantiated and before it serves any requests. Subsequent requests reuse the same servlet instance.",
    hint: "Observe that servlet container maintains a singleton instance per servlet class (unless SingleThreadModel).",
    level: "basic"
  },
  {
    question: "What happens if init() throws a ServletException?",
    shortAnswer: "The servlet is not placed into active service; container may retry or mark it as unavailable.",
    explanation: "When init() fails, the container releases the servlet instance and later may attempt to load another instance. Clients may see HTTP 503 errors.",
    hint: "Try throwing exception in init and check server logs.",
    level: "intermediate"
  },
  {
    question: "Can we override the service() method directly?",
    shortAnswer: "Yes, but usually you override doGet/doPost instead of generic service().",
    explanation: "HttpServlet's service() method dispatches to HTTP-specific methods. Overriding service() gives full control but requires manual method handling. Rarely done.",
    hint: "Compare with doGet/doPost — more convenient.",
    level: "intermediate",
    codeExample: "protected void service(HttpServletRequest req, HttpServletResponse resp) throws ... { if (req.getMethod().equals(\"GET\")) { doGet(req,resp); } }"
  },
  {
    question: "What is the purpose of destroy()?",
    shortAnswer: "Cleanup resources (database connections, file handles, threads).",
    explanation: "Container calls destroy() before removing servlet instance. Use it to release any resources allocated in init() to prevent memory leaks.",
    hint: "Think about closing connection pools.",
    level: "basic"
  },
  {
    question: "What is load-on-startup in web.xml?",
    shortAnswer: "Integer value that orders servlet loading at container startup.",
    explanation: "Positive values load during server start (lower numbers load first). Without it, servlet loads on first request. Zero or negative indicates container-specific deferred loading.",
    hint: "Useful for initialization-heavy servlets.",
    level: "intermediate"
  },
  {
    question: "Is the servlet instance thread-safe by default?",
    shortAnswer: "No, a single servlet instance handles concurrent requests – you must ensure thread safety.",
    explanation: "Container reuses the same servlet object. Instance variables are shared across threads. Use local variables, synchronized blocks, or avoid mutable state.",
    hint: "Consider racing condition when updating instance counter.",
    level: "expert"
  },
  {
    question: "What is the difference between init(ServletConfig) and init()?",
    shortAnswer: "init(ServletConfig) is the lifecycle method; default init() is a convenience no-arg version.",
    explanation: "Framework calls init(config). Override that version if you need config. The no-arg init() is called internally only if you don't override config version.",
    hint: "Always call super.init(config) in your overridden method.",
    level: "intermediate"
  },
  {
    question: "How can a servlet know its initialization parameters?",
    shortAnswer: "Using ServletConfig.getInitParameter(name).",
    explanation: "Within init(ServletConfig config) - config.getInitParameter(). Also from any method by calling getServletConfig().getInitParameter().",
    hint: "Look for <init-param> in web.xml.",
    level: "basic",
    codeExample: "String dbUrl = getServletConfig().getInitParameter(\"databaseURL\");"
  },
  {
    question: "What is SingleThreadModel? Why is it deprecated?",
    shortAnswer: "Old interface that forced single request per instance, deprecated in Servlet 2.4. Performance killer.",
    explanation: "SingleThreadModel caused container to pool multiple servlet instances, leading to memory overhead and not solving thread safety correctly. Better to code thread-safe servlets.",
    hint: "Avoid using it – modern approach is stateless design.",
    level: "expert"
  },
  {
    question: "What happens to a servlet when the web application is reloaded?",
    shortAnswer: "Container calls destroy() on all servlets before unloading, then new instances are created with init().",
    explanation: "During hot deployment, existing servlet instances are gracefully destroyed; new classloader loads new servlet classes and calls init() again.",
    hint: "Observe logs during redeployment.",
    level: "intermediate"
  },
  {
    question: "Can we have constructors in servlets?",
    shortAnswer: "Yes, but container relies on no-arg constructor for instantiation, rarely used for logic.",
    explanation: "Servlet container uses Class.newInstance() which requires a public no-arg constructor. Any custom constructor should not replace init() responsibilities.",
    hint: "Best practice: Put all initialization in init(), not constructor.",
    level: "basic"
  },
  {
    question: "What methods from GenericServlet does HttpServlet inherit?",
    shortAnswer: "init(), service(), destroy(), getServletConfig(), getServletInfo(), log() etc.",
    explanation: "HttpServlet extends GenericServlet, which implements Servlet interface. GenericServlet provides config management and logging.",
    level: "basic"
  },
  {
    question: "What is the return type of getServletInfo()?",
    shortAnswer: "String – returns servlet description/version.",
    explanation: "Optional method to provide developer information; can be overridden to return copyright, author, version.",
    hint: "Used by admin consoles.",
    level: "basic",
    codeExample: "public String getServletInfo() { return \"LifecycleDemo v1.0 by Barrackpore Team\"; }"
  },
  {
    question: "How does container handle service() exceptions?",
    shortAnswer: "Container logs the exception and sends an error response to client (500 Internal Server Error).",
    explanation: "Depending on error handling configuration, custom error pages can be displayed. Unhandled exceptions cause servlet to be marked as unavailable temporarily? Rare.",
    hint: "Always catch and handle gracefully.",
    level: "intermediate"
  },
  {
    question: "Explain the phrase 'Servlet is a singleton per mapping'.",
    shortAnswer: "One servlet class instance serves all requests to its URL pattern.",
    explanation: "Container creates exactly one instance of each servlet class (unless SingleThreadModel anti-pattern). All client requests hit same object. Hence thread-safety critical.",
    hint: "Think of a single receptionist handling many visitors simultaneously.",
    level: "intermediate"
  },
  {
    question: "What is the role of ServletContext in lifecycle?",
    shortAnswer: "Provides application-wide initialization and context for all servlets.",
    explanation: "ServletContext is created at application deployment, before any servlet init(). ServletConfig gives access to ServletContext. Used for cross-servlet data.",
    hint: "Context parameters vs init parameters.",
    level: "intermediate"
  },
  {
    question: "Can a servlet call its own init()?",
    shortAnswer: "Technically yes, but violates lifecycle contract. Container calls init() exactly once.",
    explanation: "Manual init() call could cause multiple initializations, resource leaks, and inconsistent state. Never call init() from servlet code.",
    hint: "Let container manage the lifecycle.",
    level: "expert"
  },
  {
    question: "What happens if destroy() throws an exception?",
    shortAnswer: "Exception is logged, but servlet is still destroyed and garbage collected.",
    explanation: "Container ignores exceptions in destroy() — best effort cleanup. However you should not throw runtime exceptions.",
    hint: "Wrap cleanup with try-catch.",
    level: "intermediate"
  },
  {
    question: "How do servlet lifecycle and filters relate?",
    shortAnswer: "Filters are invoked before servlet’s service() method in a chained manner.",
    explanation: "Filters (init, doFilter, destroy) have separate lifecycle but interwoven with request processing. Filter chain proceeds before hitting servlet.",
    hint: "Later topic, but note ordering.",
    level: "intermediate"
  },
  {
    question: "Is it possible to stop a servlet from being loaded?",
    shortAnswer: "Through web.xml configuration load-on-startup with negative value or container settings.",
    explanation: "Negative load-on-startup means 'first request loads', but you cannot prevent deployment. Use security constraints to block access.",
    hint: "Container still instantiates when request arrives.",
    level: "intermediate"
  },
  {
    question: "What is the effect of multiple servlet mappings to same class?",
    shortAnswer: "Container creates a single instance because the class is same, but each mapping uses same servlet object.",
    explanation: "Two <url-pattern> entries referencing same servlet class cause a single instance. Requests to both patterns are handled by same servlet.",
    hint: "Watch for shared state across different endpoints.",
    level: "expert"
  },
  {
    question: "How to get hold of servlet’s own name?",
    shortAnswer: "getServletName() from ServletConfig.",
    explanation: "Returns the <servlet-name> from web.xml or default name if annotation used. Useful for logging.",
    codeExample: "String name = getServletConfig().getServletName();",
    level: "basic"
  },
  {
    question: "When does container call destroy() on servlet?",
    shortAnswer: "During application shutdown, undeployment, or when container decides to reclaim resources.",
    explanation: "Graceful shutdown: destroy() called. Container may also reclaim idle servlets in some implementations, but standard behavior guarantees call before removal.",
    hint: "Don't rely on timing for critical data saving.",
    level: "basic"
  },
  {
    question: "Is it legal to have init() synchronized?",
    shortAnswer: "Yes, but container ensures init() is called only once per instance so synchronization is redundant.",
    explanation: "Multiple threads cannot call init() on same servlet because container guards initialization using class lock. Adding synchronized doesn't harm but unnecessary.",
    hint: "Focus on resource initialization inside init() only.",
    level: "expert"
  },
  {
    question: "How does asynchronous servlet affect lifecycle?",
    shortAnswer: "Lifecycle same, but service() can return without committing response, later completing in another thread.",
    explanation: "AsyncContext allows longer request processing without tying container thread. init/destroy unchanged.",
    hint: "Topic9 will cover in detail.",
    level: "expert"
  },
  {
    question: "What is the difference between GenericServlet and HttpServlet w.r.t lifecycle?",
    shortAnswer: "HttpServlet adds HTTP-specific request handling but inherits same init/destroy lifecycle.",
    explanation: "GenericServlet is protocol-independent, HttpServlet extends it and adds doGet/doPost. Lifecycle methods remain identical.",
    hint: "Use HttpServlet for web apps.",
    level: "basic"
  },
  {
    question: "Can a servlet be both in web.xml and annotated?",
    shortAnswer: "Yes, but may cause duplicate mapping errors unless properly configured.",
    explanation: "Container merges metadata. If both define same servlet, attributes combine or conflict. Best practice: use one consistent approach.",
    hint: "Later topic on annotations.",
    level: "intermediate"
  },
  {
    question: "Provide a real-world scenario controlling init parameters.",
    shortAnswer: "Database configuration: JDBC URL, username/password as init parameters retrieved in init().",
    explanation: "Instead of hardcoding, web.xml init-param allows changing DB details without recompiling servlet. Enables ops flexibility.",
    hint: "Think of Shyamnagar school system using diff DB config after migration.",
    level: "intermediate"
  },
  {
    question: "Why is it not recommended to override service() and then call super.service()?",
    shortAnswer: "It defeats purpose of HTTP method separation, possibly causing double processing or infinite loops.",
    explanation: "Overriding service() without careful call to super may break standard behavior. Override doGet/POST for clarity.",
    hint: "Let parent service() do dispatching.",
    level: "expert"
  }
];

export default questions;