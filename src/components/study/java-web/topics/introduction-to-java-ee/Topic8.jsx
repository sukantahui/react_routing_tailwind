import React from "react";
import clsx from "clsx";

// Java file loader component
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Raw imports of example files (place in ./topic8_files/)
import lifecycleServlet from "./topic8_files/LifecycleDemoServlet.java?raw";
import contextListener from "./topic8_files/AppContextListener.java?raw";
import containerDemo from "./topic8_files/ContainerDemoServlet.java?raw";

// ----------------------------------------------------------------------
// Topic 8: Introduction to Servlet Containers
// ----------------------------------------------------------------------
// This topic explains what a servlet container (web container) is,
// its core responsibilities, how it manages servlets (lifecycle,
// threading, request/response), and introduces popular containers
// like Tomcat, Jetty, and Undertow.
// ----------------------------------------------------------------------

export default function Topic8() {
  return (
    <div className="dark">
      <main
        className={clsx(
          "min-h-screen bg-gray-50 px-4 py-12 font-sans leading-relaxed text-gray-800",
          "dark:bg-gray-900 dark:text-gray-200",
          "motion-safe:animate-[fadeIn_0.6s_ease-out]"
        )}
      >
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <header
            className={clsx(
              "border-l-4 border-blue-600 pl-4",
              "motion-safe:animate-[slideUp_0.5s_ease-out]"
            )}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Introduction to Servlet Containers
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              The runtime environment for Java servlets.
            </p>
          </header>

          {/* Introduction Card */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[100ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              What is a Servlet Container?
            </h2>
            <p className="mb-3">
              A <span className="font-bold text-blue-600 dark:text-blue-400">servlet container</span> (also called a web container) is the part of a web server that manages the lifecycle of servlets, maps URLs to servlets, and ensures that HTTP requests are properly delivered to and processed by servlets. It is the runtime environment for Java servlets and JSPs.
            </p>
            <p>
              Popular examples include Apache Tomcat, Eclipse Jetty, and Undertow. A servlet container implements the Servlet specification (part of Java EE / Jakarta EE). It provides the infrastructure so that developers can focus on writing business logic inside servlets without worrying about low‑level networking, threading, or resource management.
            </p>
          </section>

          {/* Core Responsibilities */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Core Responsibilities of a Servlet Container
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-bold">Servlet Lifecycle Management:</span> The container loads servlet classes, instantiates them, calls <code>init()</code>, manages service requests via <code>service()</code>, and finally calls <code>destroy()</code> when the servlet is taken out of service.
              </li>
              <li>
                <span className="font-bold">Request/Response Handling:</span> It creates <code>HttpServletRequest</code> and <code>HttpServletResponse</code> objects, passes them to the servlet's service method, and sends the response back to the client.
              </li>
              <li>
                <span className="font-bold">Multithreading Support:</span> The container typically assigns a separate thread to each request, allowing multiple clients to be served concurrently. (But beware of thread safety in servlets!)
              </li>
              <li>
                <span className="font-bold">Mapping URLs to Servlets:</span> It uses deployment descriptors (<code>web.xml</code>) or annotations (<code>@WebServlet</code>) to determine which servlet should handle a given URL pattern.
              </li>
              <li>
                <span className="font-bold">Security:</span> It can enforce authentication, authorization, and secure communication (SSL) based on declarative security settings.
              </li>
              <li>
                <span className="font-bold">JSP Support:</span> The container translates JSP pages into servlets, compiles them, and executes them.
              </li>
              <li>
                <span className="font-bold">Session Management:</span> It maintains HTTP sessions, usually via cookies or URL rewriting.
              </li>
            </ul>
          </section>

          {/* SVG Diagram: Servlet Container Internals */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              How a Servlet Container Works
            </h2>
            <div className="flex justify-center">
              <svg
                width="650"
                height="250"
                viewBox="0 0 650 250"
                className="max-w-full"
                aria-label="Servlet container internal flow"
              >
                <rect width="650" height="250" fill="transparent" />

                {/* Client */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect x="20" y="100" width="80" height="40" rx="5" fill="#f97316" />
                  <text x="40" y="125" fill="white" fontSize="12" fontWeight="bold">Client</text>
                </g>

                {/* Arrow to Container */}
                <line x1="100" y1="120" x2="160" y2="120" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Servlet Container Box */}
                <rect x="170" y="50" width="360" height="140" rx="10" fill="#e5e7eb" stroke="#3b82f6" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-blue-400" />
                <text x="280" y="40" fill="#3b82f6" fontSize="14" fontWeight="bold">Servlet Container</text>

                {/* Connector */}
                <rect x="190" y="80" width="80" height="30" rx="5" fill="#10b981" />
                <text x="200" y="100" fill="white" fontSize="10">Connector</text>

                {/* Servlet Instance */}
                <rect x="300" y="80" width="80" height="30" rx="5" fill="#8b5cf6" />
                <text x="315" y="100" fill="white" fontSize="10">Servlet</text>

                {/* Thread Pool */}
                <rect x="410" y="80" width="80" height="30" rx="5" fill="#f59e0b" />
                <text x="425" y="100" fill="white" fontSize="10">Thread Pool</text>

                {/* Session Manager */}
                <rect x="190" y="130" width="80" height="30" rx="5" fill="#ef4444" />
                <text x="200" y="150" fill="white" fontSize="10">Session</text>

                {/* JSP Engine */}
                <rect x="300" y="130" width="80" height="30" rx="5" fill="#3b82f6" />
                <text x="310" y="150" fill="white" fontSize="10">JSP Engine</text>

                {/* Arrows inside container */}
                <line x1="270" y1="95" x2="300" y2="95" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="380" y1="95" x2="410" y2="95" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="230" y1="110" x2="230" y2="130" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="340" y1="110" x2="340" y2="130" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" />

                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#4b5563" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              The container receives a request, assigns a thread, invokes the servlet,
              manages sessions, and may compile JSPs on the fly.
            </p>
          </section>

          {/* Popular Servlet Containers */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Popular Servlet Containers
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-3 dark:bg-blue-900/20">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">Apache Tomcat</h3>
                <p className="text-sm">
                  The most widely used open‑source servlet container. Lightweight,
                  implements Servlet and JSP specifications. Often used for production
                  web applications.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-3 dark:bg-green-900/20">
                <h3 className="font-bold text-green-800 dark:text-green-300">Eclipse Jetty</h3>
                <p className="text-sm">
                  Highly scalable, often embedded in applications (e.g., inside a JAR).
                  Used in large‑scale projects like Apache ActiveMQ.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-3 dark:bg-purple-900/20">
                <h3 className="font-bold text-purple-800 dark:text-purple-300">Undertow</h3>
                <p className="text-sm">
                  Flexible, high‑performance web server from JBoss. Used as the default
                  in WildFly and can be embedded. Supports both blocking and non‑blocking
                  I/O.
                </p>
              </div>
            </div>
          </section>

          {/* Servlet Lifecycle Explanation */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[500ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Servlet Lifecycle Managed by Container
            </h2>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                <span className="font-bold">Loading and Instantiation:</span> The container
                loads the servlet class (usually on first request or at startup) and
                creates an instance.
              </li>
              <li>
                <span className="font-bold">Initialization (<code>init()</code>):</span>{" "}
                The container calls the <code>init()</code> method once. Here the servlet
                can set up resources (database connections, etc.).
              </li>
              <li>
                <span className="font-bold">Request Handling (<code>service()</code>):</span>{" "}
                For each request, the container calls the <code>service()</code> method,
                which dispatches to <code>doGet()</code>, <code>doPost()</code>, etc.
                This may happen concurrently in multiple threads.
              </li>
              <li>
                <span className="font-bold">Destruction (<code>destroy()</code>):</span>{" "}
                When the container decides to take the servlet out of service (e.g., when
                shutting down or reloading the application), it calls <code>destroy()</code>
                to release resources.
              </li>
            </ol>
          </section>

          {/* Java Code Examples */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[600ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Java Code Examples: Interacting with the Container
            </h2>

            {/* Example 1: LifecycleDemoServlet */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={lifecycleServlet}
                title="LifecycleDemoServlet.java"
                highlightLines={[10, 20, 27]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A servlet that logs the lifecycle methods. When deployed, you can see
                when the container calls <code>init()</code>, <code>service()</code>, and
                <code>destroy()</code>.
              </p>
            </div>

            {/* Example 2: ContextListener */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={contextListener}
                title="AppContextListener.java"
                highlightLines={[8, 15]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A <code>ServletContextListener</code> that is notified when the web
                application is initialized or destroyed. Useful for setting up shared
                resources.
              </p>
            </div>

            {/* Example 3: Simple Container interaction */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={containerDemo}
                title="ContainerDemoServlet.java"
                highlightLines={[12, 18]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Demonstrates accessing container‑provided objects like
                <code>ServletContext</code> and <code>HttpSession</code>.
              </p>
            </div>
          </section>

          {/* Real-World Context */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[700ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Real‑World Context
            </h2>
            <p>
              In a production environment, the servlet container is often hidden behind
              a reverse proxy (like Apache HTTPD or Nginx) that handles SSL termination,
              load balancing, and serving static content. The container runs the dynamic
              part of the application. For example, the Barrackpore college website might
              use Tomcat to run the student portal, while Nginx serves images and CSS.
              Understanding the container helps you troubleshoot issues like
              <code>OutOfMemoryError</code> (tune the JVM) or thread starvation (adjust
              the connector's maxThreads).
            </p>
          </section>

          {/* Tips & Tricks */}
          <section
            className={clsx(
              "rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20",
              "border border-blue-200 dark:border-blue-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[800ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              💡 Tips & Tricks
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Know your container's configuration:</span>{" "}
                Tomcat uses <code>server.xml</code> for global settings (connectors,
                host) and <code>context.xml</code> per application.
              </li>
              <li>
                <span className="font-medium">Use listeners for startup/shutdown tasks:</span>{" "}
                Instead of relying on a servlet's <code>init()</code> (which runs per
                servlet), use <code>ServletContextListener</code> for app‑wide setup.
              </li>
              <li>
                <span className="font-medium">Monitor thread pools:</span> If your
                application becomes slow under load, check the container's thread pool
                settings – you may need more threads or a different executor.
              </li>
              <li>
                <span className="font-medium">Embedded containers simplify development:</span>{" "}
                With Spring Boot, you can embed Tomcat or Jetty and run your app as a
                plain Java main method.
              </li>
            </ul>
          </section>

          {/* Common Mistakes */}
          <section
            className={clsx(
              "rounded-lg bg-red-50 p-6 dark:bg-red-900/20",
              "border border-red-200 dark:border-red-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[900ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ⚠️ Common Mistakes Beginners Make
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Assuming servlets are thread‑safe:</span> The
                container uses multiple threads to call the same servlet instance. If you
                have instance variables, you must handle synchronization or risk data
                corruption.
              </li>
              <li>
                <span className="font-medium">Forgetting that <code>init()</code> runs once:</span>{" "}
                Putting per‑request code in <code>init()</code> will not work as expected.
              </li>
              <li>
                <span className="font-medium">Misunderstanding context vs. session:</span>{" "}
                Storing user‑specific data in <code>ServletContext</code> makes it visible
                to all users – a classic security/privacy mistake.
              </li>
              <li>
                <span className="font-medium">Not configuring connectors properly:</span>{" "}
                Using default HTTP connector without SSL in production exposes sensitive data.
              </li>
            </ul>
          </section>

          {/* Best Practices */}
          <section
            className={clsx(
              "rounded-lg bg-green-50 p-6 dark:bg-green-900/20",
              "border border-green-200 dark:border-green-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1000ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ✅ Best Practices
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Keep servlets stateless:</span> If possible,
                avoid instance variables; use local variables or thread‑safe constructs.
              </li>
              <li>
                <span className="font-medium">Use async servlets for long‑running tasks:</span>{" "}
                Servlet 3.0+ supports asynchronous processing to free up container threads.
              </li>
              <li>
                <span className="font-medium">Configure <code>loadOnStartup</code> for critical servlets:</span>{" "}
                If a servlet is heavy to initialize, set a positive integer in
                <code>@WebServlet(loadOnStartup=1)</code> so it starts with the app.
              </li>
              <li>
                <span className="font-medium">Tune the container for your workload:</span>{" "}
                Adjust thread pool size, connection timeouts, and buffer sizes based on
                expected traffic.
              </li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section
            className={clsx(
              "rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20",
              "border border-yellow-200 dark:border-yellow-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1100ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              📋 Mini Checklist – What to Remember
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>☐ Servlet container manages servlet lifecycle: init, service, destroy.</li>
              <li>☐ It creates request/response objects and maps URLs to servlets.</li>
              <li>☐ Multiple threads may call the same servlet – watch thread safety.</li>
              <li>☐ Popular containers: Tomcat, Jetty, Undertow.</li>
              <li>☐ Use listeners for app startup/shutdown.</li>
              <li>☐ Container configuration files (server.xml, context.xml) control its behavior.</li>
            </ul>
          </section>

          {/* Hint Section */}
          <section
            className={clsx(
              "rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20",
              "border border-indigo-200 dark:border-indigo-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1200ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              🤔 Think About…
            </h2>
            <p className="mb-2">
              <span className="font-medium">Observe carefully:</span> In the lifecycle,
              why does the container create only one instance of each servlet? (Hint:
              memory efficiency and shared state.)
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> If you deployed the
              same servlet class with two different URL mappings, how many instances would
              the container create? Why?
            </p>
          </section>

          {/* Teacher’s Note */}
          <section
            className={clsx(
              "rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20",
              "border border-purple-200 dark:border-purple-800",
              "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              👨‍🏫 Teacher’s Note – Sukanta Hui
            </h2>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <p className="mb-2">
                  <span className="font-bold">Sukanta Hui</span> (27 years of experience
                  in Programming, RDBMS, OS, and Web Development)
                </p>
                <p className="mb-2">
                  📧{" "}
                  <a
                    href="mailto:sukantahui@codernaccotax.co.in"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    sukantahui@codernaccotax.co.in
                  </a>
                </p>
                <p>📞 7003756860</p>
              </div>
              <div className="flex-1">
                <p className="italic">
                  “When I first learned servlets, I imagined the container as a magic box.
                  But it's really a well‑defined engine. Understanding its internals helps
                  you write better code and debug faster. I've seen students, like Abhronila,
                  wonder why a counter in a servlet instance variable didn't work as
                  expected – the answer was thread safety. The container doesn't protect
                  you from concurrency; it gives you the tools to handle it.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> The container is your
                  partner, not a mystery.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Inline keyframes for animations (zero‑config) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animation-delay-\\[100ms\\] { animation-delay: 100ms; }
        .animation-delay-\\[200ms\\] { animation-delay: 200ms; }
        .animation-delay-\\[300ms\\] { animation-delay: 300ms; }
        .animation-delay-\\[400ms\\] { animation-delay: 400ms; }
        .animation-delay-\\[500ms\\] { animation-delay: 500ms; }
        .animation-delay-\\[600ms\\] { animation-delay: 600ms; }
        .animation-delay-\\[700ms\\] { animation-delay: 700ms; }
        .animation-delay-\\[800ms\\] { animation-delay: 800ms; }
        .animation-delay-\\[900ms\\] { animation-delay: 900ms; }
        .animation-delay-\\[1000ms\\] { animation-delay: 1000ms; }
        .animation-delay-\\[1100ms\\] { animation-delay: 1100ms; }
        .animation-delay-\\[1200ms\\] { animation-delay: 1200ms; }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeIn_0\\.6s_ease-out\\],
          .motion-safe\\:animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}