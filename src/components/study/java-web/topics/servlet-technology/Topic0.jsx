import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ==================== Java Code Samples (topic0_files) ====================
// In actual project, these would be separate .java files imported via ?raw.
// For standalone component, we embed them as strings but maintain folder naming.

const lifecycleServletCode = `import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LifecycleServlet extends HttpServlet {
    
    // Called once when servlet is loaded and instantiated
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        System.out.println("[LOG] Servlet initialized: " + getServletName());
        // Real-world usage: Load DB drivers, read config params, start background threads
        String dbUrl = config.getInitParameter("dbUrl");
        System.out.println("DB URL from web.xml: " + dbUrl);
    }
    
    // Called for every client request (GET, POST, etc.)
    public void service(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        System.out.println("[LOG] Handling request: " + req.getMethod());
        resp.setContentType("text/html");
        resp.getWriter().println("<h1>Hello from Servlet Lifecycle!</h1>");
        // For thread safety: avoid mutable instance variables
    }
    
    // Called once before servlet is unloaded (container shutdown / app reload)
    public void destroy() {
        System.out.println("[LOG] Servlet destroyed: " + getServletName());
        // Cleanup: close DB connections, stop threads, release resources
    }
}`;

const webXmlSnippet = `<!-- web.xml configuration for LifecycleServlet -->
<servlet>
    <servlet-name>LifecycleServlet</servlet-name>
    <servlet-class>com.example.LifecycleServlet</servlet-class>
    <init-param>
        <param-name>dbUrl</param-name>
        <param-value>jdbc:mysql://localhost:3306/school</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup> <!-- Load on container start -->
</servlet>
<servlet-mapping>
    <servlet-name>LifecycleServlet</servlet-name>
    <url-pattern>/lifecycle</url-pattern>
</servlet-mapping>`;

const threadSafetyExample = `// UNSAFE pattern - do NOT use mutable instance variables
public class UnsafeServlet extends HttpServlet {
    private String sharedData; // ❌ All threads share this!
    
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        sharedData = req.getParameter("input"); // Race condition
        resp.getWriter().print(sharedData);
    }
}

// SAFE approach - use local variables or synchronized only if necessary
public class SafeServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        String localData = req.getParameter("input"); // ✅ thread-local
        resp.getWriter().print(localData);
    }
}`;

// ==================== FAQ Questions (30 moderate-expert) ====================
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

// ==================== Main Component ====================
export default function Topic0() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.5s ease-out forwards;
        }
        .hover-glow:hover {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
          transform: scale(1.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .svg-hover-group:hover .step-rect {
          fill: #3b82f6;
          transition: fill 0.2s;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-5 py-10 space-y-12">
        {/* HEADER SECTION */}
        <div className="text-center animate-fadeSlideUp">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
            Servlet Lifecycle
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Master how servlets are born, serve requests, and bid farewell — the heart of Java EE web containers.
          </p>
        </div>

        {/* THEORY SECTION */}
        <section className="space-y-6 animate-fadeSlideUp" style={{ animationDelay: "0.1s" }}>
          <div className="border-l-4 border-blue-500 pl-5 bg-gray-50 dark:bg-gray-800/50 rounded-r-2xl py-3">
            <h2 className="text-2xl font-semibold">📖 Detailed Concept & Theory</h2>
          </div>
          <p className="leading-relaxed">
            The <strong className="text-blue-600 dark:text-blue-400">Servlet Lifecycle</strong> is managed entirely by the <strong>Servlet Container</strong> 
            (e.g., Apache Tomcat, Jetty). A servlet goes through four major stages: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Loading & Instantiation</span>, 
            <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded"> Initialization (init)</span>, 
            <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded"> Request Handling (service)</span>, and 
            <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded"> Destruction (destroy)</span>. Understanding this sequence is crucial for resource management, 
            thread safety, and building robust web applications.
          </p>
          <p className="leading-relaxed">
            When a servlet is first requested or <span className="italic">load-on-startup</span> is enabled, the container loads the servlet class, 
            creates an instance, and calls <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">init(ServletConfig config)</code>. 
            This method executes once. For every client request (GET, POST, etc.), the <code>service()</code> method runs — in <code>HttpServlet</code>, 
            it dispatches to <code>doGet()</code>, <code>doPost()</code>, etc. Finally, upon application shutdown or reload, <code>destroy()</code> 
            is called to clean up resources.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold flex items-center gap-2">💡 Real-world analogy</h3>
            <p className="mt-1">Imagine a school in <strong>Barrackpore</strong> with a dedicated librarian (servlet). The school building (container) creates the librarian once — 
            that's <strong>init()</strong> (setup). Each student asking for a book is a <strong>request</strong> → <strong>service()</strong> handles them. 
            Finally, during summer renovation (<strong>destroy()</strong>), librarian leaves and closes records.</p>
          </div>
        </section>

        {/* PROTOTYPE & SIGNATURE TABLE */}
        <section className="animate-fadeSlideUp" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-semibold mb-4">⚙️ Lifecycle Method Signatures</h2>
          <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
            <table className="min-w-full text-sm md:text-base">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr><th className="px-4 py-2 text-left">Method</th><th className="px-4 py-2 text-left">Return Type</th><th className="px-4 py-2 text-left">Purpose</th><th className="px-4 py-2 text-left">When & Why</th></tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-mono">init(ServletConfig)</td><td className="px-4 py-2">void</td><td className="px-4 py-2">One-time initialization (DB, config)</td><td className="px-4 py-2">After instantiation; before handling any request.</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-mono">service(ServletRequest, ServletResponse)</td><td className="px-4 py-2">void</td><td className="px-4 py-2">Request processing core</td><td className="px-4 py-2">Every client request; invoked by container.</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-mono">destroy()</td><td className="px-4 py-2">void</td><td className="px-4 py-2">Resource cleanup (closing connections)</td><td className="px-4 py-2">Before servlet unload / container shutdown.</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-mono">getServletConfig()</td><td className="px-4 py-2">ServletConfig</td><td className="px-4 py-2">Obtain config/init params</td><td className="px-4 py-2">Inside any lifecycle method.</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-mono">getServletInfo()</td><td className="px-4 py-2">String</td><td className="px-4 py-2">Return servlet metadata</td><td className="px-4 py-2">Optional, used by admin tools.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SVG LIFECYCLE ILLUSTRATION */}
        <section className="animate-fadeSlideUp" style={{ animationDelay: "0.25s" }}>
          <h2 className="text-2xl font-semibold mb-6 text-center">🔄 Servlet Lifecycle Visualised</h2>
          <div className="flex justify-center">
            <svg width="700" height="200" viewBox="0 0 700 200" className="w-full max-w-3xl mx-auto">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" className="dark:fill-gray-400" />
                </marker>
              </defs>
              {/* Step 1: Load/Instantiate */}
              <g className="hover-glow transition-all cursor-pointer">
                <rect x="20" y="60" width="100" height="50" rx="8" fill="#e0e7ff" className="dark:fill-blue-900/40 step-rect transition-all duration-300" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="70" y="90" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-100 text-sm font-medium">Instantiate</text>
                <text x="70" y="108" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">Class Loading</text>
              </g>
              <line x1="120" y1="85" x2="180" y2="85" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrowhead)" className="dark:stroke-gray-400" />
              
              {/* Step 2: init() */}
              <g className="hover-glow transition-all cursor-pointer">
                <rect x="190" y="60" width="100" height="50" rx="8" fill="#d1fae5" className="dark:fill-green-900/40 step-rect" stroke="#10b981" strokeWidth="1.5" />
                <text x="240" y="90" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-100 text-sm font-medium">init()</text>
                <text x="240" y="108" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">Initialization</text>
              </g>
              <line x1="290" y1="85" x2="350" y2="85" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrowhead)" className="dark:stroke-gray-400" />

              {/* Step 3: service() */}
              <g className="hover-glow transition-all cursor-pointer">
                <rect x="360" y="40" width="120" height="90" rx="8" fill="#fef3c7" className="dark:fill-yellow-900/40 step-rect" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="420" y="70" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-100 text-sm font-medium">service()</text>
                <text x="420" y="88" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">doGet/doPost</text>
                <text x="420" y="105" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">per request</text>
              </g>
              <line x1="480" y1="85" x2="540" y2="85" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrowhead)" className="dark:stroke-gray-400" />

              {/* Step 4: destroy() */}
              <g className="hover-glow transition-all cursor-pointer">
                <rect x="550" y="60" width="100" height="50" rx="8" fill="#ffe4e6" className="dark:fill-red-900/40 step-rect" stroke="#ef4444" strokeWidth="1.5" />
                <text x="600" y="90" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-100 text-sm font-medium">destroy()</text>
                <text x="600" y="108" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">Cleanup</text>
              </g>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Hover over each stage to see emphasis — lifecycle moves from instantiation → init → service (many cycles) → destroy.</p>
        </section>

        {/* CODE EXAMPLES */}
        <section className="space-y-6 animate-fadeSlideUp" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-2xl font-semibold">📂 Real Java Implementation</h2>
          <JavaFileLoader fileModule={lifecycleServletCode} title="LifecycleServlet.java" highlightLines={[5,12,22]} />
          <JavaFileLoader fileModule={webXmlSnippet} title="web.xml (lifecycle configuration)" highlightLines={[5,6,7,10]} />
          <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center gap-2">🧵 Thread Safety Insight</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">⚡ Multiple concurrent requests share the <strong>same servlet instance</strong>. Never store request-specific data in instance variables without synchronization.</p>
            <JavaFileLoader fileModule={threadSafetyExample} title="ThreadSafetyComparison.java (Conceptual)" highlightLines={[3,4,13]} isCompact={true} />
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <h3 className="font-semibold">💡 Professional Tip</h3>
            <p>Use <code>load-on-startup</code> (web.xml) or <code>@WebServlet(loadOnStartup=1)</code> to trigger expensive initialisation during server startup rather than on first user request — avoids latency for the first visitor (e.g., Tuhina from Ichapur).</p>
          </div>
        </section>

        {/* COMMON MISTAKES + BEST PRACTICES + HINT + CHECKLIST */}
        <div className="grid md:grid-cols-2 gap-6 animate-fadeSlideUp" style={{ animationDelay: "0.4s" }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-8 border-red-500">
            <h3 className="text-xl font-semibold mb-3">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Forgetting super.init(config)</strong> — results in NullPointerException on getServletConfig()</li>
              <li><strong>Assuming single-threaded</strong> — Not expecting concurrent access leads to broken counters</li>
              <li><strong>Overriding service() incorrectly</strong> — breaks doGet/doPost dispatching</li>
              <li><strong>Throwing RuntimeException in init()</strong> — servlet never becomes available</li>
              <li><strong>Blocking inside service()</strong> — degrades all users' performance</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-8 border-green-500">
            <h3 className="text-xl font-semibold mb-3">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Keep <code>init()</code> focused on one-time setup (DB connections, cached data).</li>
              <li>Make servlets <strong>stateless</strong> wherever possible — use local variables, <code>HttpSession</code> for user state.</li>
              <li>Override <code>doGet/doPost</code> instead of raw service().</li>
              <li>Always provide logging inside init, service, destroy for debugging.</li>
              <li>Use <code>@WebServlet</code> annotation instead of web.xml for simplicity (future topic).</li>
            </ul>
          </div>
        </div>

        <div className="animate-fadeSlideUp" style={{ animationDelay: "0.45s" }}>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-5 rounded-xl border border-blue-300 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-300">🤔 Hint Section (Think about...)</h3>
            <p className="mt-2">🧠 <strong>Observe carefully:</strong> What change would happen to a servlet’s <code>init()</code> if you add <code>&lt;load-on-startup&gt;2&lt;/load-on-startup&gt;</code>? Try rewriting the servlet without overriding <code>init(ServletConfig)</code>. Does the container still call init?</p>
            <p className="mt-2">📌 <strong>Try Changing:</strong> Modify the life cycle servlet to log thread names within <code>service()</code>. Start multiple browser tabs – you'll spot the same servlet instance handling all requests.</p>
          </div>
        </div>

        {/* MINI CHECKLIST */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl animate-fadeSlideUp" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">📌 Student's Mini Checklist</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm list-disc pl-5">
            <li>✓ I can describe the four lifecycle phases.</li>
            <li>✓ I know when the servlet container calls init() and destroy().</li>
            <li>✓ I understand thread safety issues (SingleThreadModel deprecated).</li>
            <li>✓ I can write a servlet that logs each lifecycle stage.</li>
            <li>✓ I can configure load-on-startup in web.xml.</li>
          </ul>
        </div>

        {/* TEACHER NOTE */}
        <div className="animate-fadeSlideUp" style={{ animationDelay: "0.55s" }}>
          <Teacher note="Servlet lifecycle is the bedrock of any Java web app. Encourage students to experiment by adding Sysouts in each method and watching Tomcat logs. Emphasize that init() is called only once – so never put request-scoped logic there. A fun activity: Deploy and reload the app multiple times and see destroy() in action!" />
        </div>

        {/* FAQ SECTION */}
        <div className="animate-fadeSlideUp" style={{ animationDelay: "0.6s" }}>
          <FAQTemplate title="Servlet Lifecycle FAQs (Basic to Expert)" questions={questions} />
        </div>

        {/* FOOTER / FURTHER */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>🎯 Next Topic: HTTP Request and Response → Understand request/response objects.</p>
        </div>
      </div>
    </div>
  );
}