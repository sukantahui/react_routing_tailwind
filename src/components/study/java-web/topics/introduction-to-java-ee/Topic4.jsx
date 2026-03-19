import React from "react";
import clsx from "clsx";

// Java file loader component
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Raw imports of example Java files (place in ./topic4_files/)
import simpleServlet from "./topic4_files/SimpleServlet.java?raw";
import ejbExample from "./topic4_files/MyEJB.java?raw";
import serverComparison from "./topic4_files/ServerComparison.java?raw";

// ----------------------------------------------------------------------
// Topic 4: Web Servers vs Application Servers (Tomcat, GlassFish, Jetty)
// ----------------------------------------------------------------------
// This topic clarifies the distinction between web servers (servlet containers)
// and full Java EE application servers, and when to use each.
// ----------------------------------------------------------------------

export default function Topic4() {
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
              Web Servers vs Application Servers
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Tomcat, GlassFish, Jetty – understanding the runtime environment.
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
              What's the Difference?
            </h2>
            <p className="mb-3">
              In the Java world, the terms "web server" and "application server" are
              often used interchangeably, but they refer to different runtime environments.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <span className="font-bold text-blue-600 dark:text-blue-400">Web Server (Servlet Container)</span>{" "}
                – Handles HTTP requests and responses, and provides the environment for
                Servlets, JSP, and static resources. Examples: Apache Tomcat, Jetty, Undertow.
              </li>
              <li>
                <span className="font-bold text-green-600 dark:text-green-400">Application Server</span>{" "}
                – A full Java EE (now Jakarta EE) server that includes a web container
                plus additional services like EJB, JTA, JMS, CDI, and more. Examples:
                GlassFish, Payara, WildFly, WebLogic.
              </li>
            </ul>
            <p className="mt-3">
              The key distinction is that an application server provides the complete
              Java EE stack, while a web server only handles the web tier. Your choice
              depends on the complexity of your application.
            </p>
          </section>

          {/* SVG Comparison Diagram */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Comparison at a Glance
            </h2>
            <div className="flex justify-center">
              <svg
                width="700"
                height="250"
                viewBox="0 0 700 250"
                className="max-w-full"
                aria-label="Comparison diagram: Web Server vs Application Server"
              >
                <rect width="700" height="250" fill="transparent" />

                {/* Web Server Box */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="50"
                    y="40"
                    width="200"
                    height="160"
                    rx="8"
                    fill="#3b82f6"
                    className="transition-all duration-300 hover:fill-blue-400"
                  />
                  <text x="110" y="70" fill="white" fontSize="16" fontWeight="bold">
                    Web Server
                  </text>
                  <text x="80" y="100" fill="white" fontSize="12">
                    (Servlet Container)
                  </text>
                  <text x="70" y="130" fill="white" fontSize="10">
                    • Servlets
                  </text>
                  <text x="70" y="145" fill="white" fontSize="10">
                    • JSP
                  </text>
                  <text x="70" y="160" fill="white" fontSize="10">
                    • Static Resources
                  </text>
                  <text x="70" y="175" fill="white" fontSize="10">
                    • Filters, Listeners
                  </text>
                </g>

                {/* Application Server Box */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="400"
                    y="20"
                    width="250"
                    height="200"
                    rx="8"
                    fill="#10b981"
                    className="transition-all duration-300 hover:fill-green-400"
                  />
                  <text x="470" y="50" fill="white" fontSize="16" fontWeight="bold">
                    Application Server
                  </text>
                  <text x="450" y="75" fill="white" fontSize="12">
                    (Full Java EE)
                  </text>
                  <text x="430" y="105" fill="white" fontSize="10">
                    • Web Container (Servlets, JSP)
                  </text>
                  <text x="430" y="120" fill="white" fontSize="10">
                    • EJB Container
                  </text>
                  <text x="430" y="135" fill="white" fontSize="10">
                    • JTA (Transactions)
                  </text>
                  <text x="430" y="150" fill="white" fontSize="10">
                    • JMS (Messaging)
                  </text>
                  <text x="430" y="165" fill="white" fontSize="10">
                    • CDI (Dependency Injection)
                  </text>
                  <text x="430" y="180" fill="white" fontSize="10">
                    • JPA (Persistence)
                  </text>
                  <text x="430" y="195" fill="white" fontSize="10">
                    • Security, Connectors
                  </text>
                </g>

                {/* Label for common area */}
                <text x="250" y="120" fill="#6b7280" fontSize="12">
                  includes
                </text>
                <line
                  x1="250"
                  y1="130"
                  x2="400"
                  y2="130"
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              An application server includes all features of a web server, plus enterprise services.
            </p>
          </section>

          {/* Popular Servers */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Popular Java Web/Application Servers
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Tomcat */}
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-3 dark:bg-blue-900/20">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">Apache Tomcat</h3>
                <p className="text-sm">
                  Pure web server (servlet container). Lightweight, widely used for
                  Spring Boot and microservices. No EJB, JTA, etc.
                </p>
              </div>
              {/* Jetty */}
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-3 dark:bg-blue-900/20">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">Eclipse Jetty</h3>
                <p className="text-sm">
                  Embedded web server, highly scalable. Often used in embedded
                  scenarios (e.g., inside a JAR).
                </p>
              </div>
              {/* GlassFish */}
              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-3 dark:bg-green-900/20">
                <h3 className="font-bold text-green-800 dark:text-green-300">GlassFish</h3>
                <p className="text-sm">
                  Full Jakarta EE application server. Includes everything: web,
                  EJB, JMS, etc. Reference implementation of Java EE.
                </p>
              </div>
              {/* Payara */}
              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-3 dark:bg-green-900/20">
                <h3 className="font-bold text-green-800 dark:text-green-300">Payara Server</h3>
                <p className="text-sm">
                  Production‑ready fork of GlassFish. Popular for enterprise
                  applications needing full EE support.
                </p>
              </div>
              {/* WildFly */}
              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-3 dark:bg-green-900/20">
                <h3 className="font-bold text-green-800 dark:text-green-300">WildFly</h3>
                <p className="text-sm">
                  Formerly JBoss AS. Full EE server, modular, lightweight for a
                  full stack.
                </p>
              </div>
              {/* Undertow */}
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-3 dark:bg-blue-900/20">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">Undertow</h3>
                <p className="text-sm">
                  Web server used by WildFly; can be embedded. Flexible, high performance.
                </p>
              </div>
            </div>
          </section>

          {/* Java Code Examples */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Java Code Examples: What Runs Where?
            </h2>
            <p className="mb-4">
              The following examples illustrate components that can run on both web servers
              and application servers, and those that require a full EE environment.
            </p>

            {/* Example 1: Simple Servlet (runs on both) */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={simpleServlet}
                title="SimpleServlet.java (Runs on any servlet container)"
                highlightLines={[5, 10]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A simple Servlet – can be deployed on Tomcat, Jetty, GlassFish, etc.
              </p>
            </div>

            {/* Example 2: EJB (requires application server) */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={ejbExample}
                title="MyEJB.java (Requires full EE server)"
                highlightLines={[6, 12]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                An EJB – only runs on an application server that provides an EJB container
                (GlassFish, WildFly, Payara). Will not deploy on Tomcat.
              </p>
            </div>

            {/* Example 3: Server comparison code */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={serverComparison}
                title="ServerComparison.java (Conceptual)"
                highlightLines={[15, 25]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A conceptual class that checks for the presence of EE features to
                illustrate the difference.
              </p>
            </div>
          </section>

          {/* Real-World Context */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[500ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Real‑World Decisions
            </h2>
            <p className="mb-3">
              When building a web application, the choice of server affects architecture,
              deployment, and maintainability.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <span className="font-semibold">Microservices / REST APIs:</span> Often use
                embedded Tomcat or Jetty inside Spring Boot – lightweight, fast startup.
              </li>
              <li>
                <span className="font-semibold">Traditional enterprise applications:</span>{" "}
                With complex transactions, messaging, and distributed components, a full
                EE server like Payara or WildFly is common.
              </li>
              <li>
                <span className="font-semibold">Legacy systems:</span> Many banks and
                government offices (like those in Barrackpore) still run on WebLogic or
                WebSphere – full EE servers with heavy management.
              </li>
            </ul>
            <p className="mt-3">
              Tuhina's first job might involve deploying a Spring Boot app on Tomcat,
              while Debangshu's project at a larger firm could require GlassFish for
              EJB and JMS.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section
            className={clsx(
              "rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20",
              "border border-blue-200 dark:border-blue-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[600ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              💡 Tips & Tricks
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Know your target:</span> Before starting,
                decide if you need a full EE server. If you only need Servlets/JSP,
                stick with Tomcat – it's simpler.
              </li>
              <li>
                <span className="font-medium">Embedded vs standalone:</span> For
                microservices, embedded servers (like Spring Boot's embedded Tomcat)
                simplify deployment.
              </li>
              <li>
                <span className="font-medium">Use the right profile:</span> Jakarta EE
                defines a "Web Profile" – a subset of the full platform that includes
                web technologies and basic persistence, but not EJB or JMS. Some servers
                (like Payara Micro) support it.
              </li>
              <li>
                <span className="font-medium">Check compatibility:</span> When using
                frameworks like Hibernate, ensure they work with your chosen server.
                Most do, but JTA transactions may need a full EE server.
              </li>
            </ul>
          </section>

          {/* Common Mistakes */}
          <section
            className={clsx(
              "rounded-lg bg-red-50 p-6 dark:bg-red-900/20",
              "border border-red-200 dark:border-red-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[700ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ⚠️ Common Mistakes Beginners Make
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Deploying EJBs to Tomcat:</span> Tomcat has
                no EJB container – the deployment will fail with ClassNotFoundException.
              </li>
              <li>
                <span className="font-medium">Using EE APIs without a full server:</span>{" "}
                Trying to use <code>@PersistenceContext</code> or JTA in Tomcat will
                cause errors unless you manually add libraries (and even then, container
                services are missing).
              </li>
              <li>
                <span className="font-medium">Confusing "web server" with "web container":</span>{" "}
                Apache HTTPD is a web server, but it doesn't run Servlets. Java web
                servers like Tomcat are often called "servlet containers" to avoid
                confusion.
              </li>
              <li>
                <span className="font-medium">Over‑engineering:</span> Choosing a full
                EE server for a simple CRUD app adds complexity – Swadeep learned this
                when his first project took hours to configure.
              </li>
            </ul>
          </section>

          {/* Best Practices */}
          <section
            className={clsx(
              "rounded-lg bg-green-50 p-6 dark:bg-green-900/20",
              "border border-green-200 dark:border-green-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[800ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ✅ Best Practices
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Match server to requirements:</span> If you
                don't need EJBs or JMS, stick with a web server. If you do, use a full
                EE server.
              </li>
              <li>
                <span className="font-medium">Standardize on configuration:</span> Use
                server‑specific configuration files (like <code>context.xml</code> in
                Tomcat) but keep them external to the code when possible.
              </li>
              <li>
                <span className="font-medium">Test on the target server early:</span>{" "}
                Develop with an embedded server for speed, but regularly test on the
                production‑like environment.
              </li>
              <li>
                <span className="font-medium">Use connection pooling:</span> Both web and
                application servers offer connection pooling – configure it instead of
                creating connections manually.
              </li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section
            className={clsx(
              "rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20",
              "border border-yellow-200 dark:border-yellow-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[900ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              📋 Mini Checklist – What to Remember
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>☐ Web server = Servlet container (Tomcat, Jetty).</li>
              <li>☐ Application server = Web container + EJB + JTA + JMS + ... (GlassFish, WildFly).</li>
              <li>☐ Choose based on required technologies.</li>
              <li>☐ You can run Servlets on both.</li>
              <li>☐ EJBs need a full application server.</li>
              <li>☐ Embedded servers are great for microservices.</li>
            </ul>
          </section>

          {/* Hint Section */}
          <section
            className={clsx(
              "rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20",
              "border border-indigo-200 dark:border-indigo-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1000ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              🤔 Think About…
            </h2>
            <p className="mb-2">
              <span className="font-medium">Observe carefully:</span> In the diagram,
              why does the application server box contain the web server box? (Hint:
              inheritance of capabilities.)
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> If you had to deploy
              an application that uses JMS (messaging) and EJBs, which servers would you
              consider? Which would you avoid?
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
                  “I've seen many students, like Abhronila from Barrackpore, get confused
                  when they try to deploy an EJB on Tomcat. My advice: always check the
                  server's documentation. Tomcat is great for web apps, but if you need
                  distributed transactions or messaging, move to a full EE server.
                  Remember, the server is part of your architecture – choose wisely.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> The server is not just
                  a place to deploy – it provides the runtime services your application
                  relies on.
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