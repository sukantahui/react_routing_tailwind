import React from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------
// Topic 0: Overview of Java EE Architecture
// ----------------------------------------------------------------------
// This component explains the big picture of Java Enterprise Edition (Java EE),
// its layered architecture, core containers, and how it supports scalable web applications.
// ----------------------------------------------------------------------

export default function Topic0() {
  return (
    // Force dark mode as default (respects system preference via media query)
    <div className="dark">
      <main
        className={clsx(
          "min-h-screen bg-gray-50 px-4 py-12 font-sans leading-relaxed text-gray-800",
          "dark:bg-gray-900 dark:text-gray-200",
          "motion-safe:animate-[fadeIn_0.6s_ease-out]"
        )}
      >
        {/* Container for content width */}
        <div className="mx-auto max-w-4xl space-y-8">
          {/* ===== Header ===== */}
          <header
            className={clsx(
              "border-l-4 border-blue-600 pl-4",
              "motion-safe:animate-[slideUp_0.5s_ease-out]"
            )}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Overview of Java EE Architecture
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Understanding the blueprint of enterprise Java applications.
            </p>
          </header>

          {/* ===== Introduction Card ===== */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[100ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              What is Java EE?
            </h2>
            <p className="mb-3">
              Java Platform, Enterprise Edition (Java EE) is a set of specifications
              that extend the Java Standard Edition (Java SE) with APIs and runtime
              services needed for developing and running large‑scale, multi‑tiered,
              secure, and reliable network applications.
            </p>
            <p>
              Think of Java EE as a blueprint for building the backend of applications
              like online banking, e‑commerce platforms, or the student information
              system used in schools across Barrackpore. It provides ready‑made
              components (Servlets, JSP, EJB, JPA) so developers can focus on business
              logic instead of low‑level plumbing.
            </p>
          </section>

          {/* ===== Architecture Diagram (SVG with animations) ===== */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Layered Architecture of Java EE
            </h2>
            <div className="flex justify-center">
              <svg
                width="650"
                height="300"
                viewBox="0 0 650 300"
                className="max-w-full"
                aria-label="Java EE layered architecture diagram"
              >
                {/* Background (optional) */}
                <rect width="650" height="300" fill="transparent" />

                {/* Client Tier */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="30"
                    y="50"
                    width="120"
                    height="80"
                    rx="8"
                    fill="#3b82f6"
                    className="transition-all duration-300 hover:fill-blue-400"
                  />
                  <text x="50" y="95" fill="white" fontSize="14" fontWeight="bold">
                    Client Tier
                  </text>
                  <text x="50" y="115" fill="white" fontSize="12">
                    (Browser, App)
                  </text>
                  {/* Animated pulse on client icon */}
                  <circle cx="160" cy="90" r="8" fill="#fbbf24">
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                {/* Arrow */}
                <line
                  x1="150"
                  y1="90"
                  x2="220"
                  y2="90"
                  stroke="#4b5563"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  className="dark:stroke-gray-400"
                />
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                  >
                    <path d="M0,0 L10,5 L0,10 Z" fill="#4b5563" />
                  </marker>
                </defs>

                {/* Web Tier (Servlet/JSP) */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="230"
                    y="30"
                    width="140"
                    height="100"
                    rx="8"
                    fill="#10b981"
                    className="transition-all duration-300 hover:fill-green-400"
                  />
                  <text x="250" y="70" fill="white" fontSize="14" fontWeight="bold">
                    Web Tier
                  </text>
                  <text x="250" y="95" fill="white" fontSize="12">
                    Servlets, JSP
                  </text>
                  {/* Animated dash array on border */}
                  <rect
                    x="230"
                    y="30"
                    width="140"
                    height="100"
                    rx="8"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;20;0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>

                {/* Arrow */}
                <line
                  x1="370"
                  y1="80"
                  x2="430"
                  y2="80"
                  stroke="#4b5563"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  className="dark:stroke-gray-400"
                />

                {/* Business Tier (EJB / Services) */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="440"
                    y="30"
                    width="140"
                    height="100"
                    rx="8"
                    fill="#8b5cf6"
                    className="transition-all duration-300 hover:fill-purple-400"
                  />
                  <text x="460" y="70" fill="white" fontSize="14" fontWeight="bold">
                    Business Tier
                  </text>
                  <text x="460" y="95" fill="white" fontSize="12">
                    EJB, Services
                  </text>
                </g>

                {/* Arrow */}
                <line
                  x1="510"
                  y1="130"
                  x2="510"
                  y2="180"
                  stroke="#4b5563"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  className="dark:stroke-gray-400"
                />

                {/* EIS Tier (Database) */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="440"
                    y="190"
                    width="140"
                    height="80"
                    rx="8"
                    fill="#ef4444"
                    className="transition-all duration-300 hover:fill-red-400"
                  />
                  <text x="460" y="235" fill="white" fontSize="14" fontWeight="bold">
                    EIS Tier
                  </text>
                  <text x="460" y="255" fill="white" fontSize="12">
                    Database, ERP
                  </text>
                </g>

                {/* Additional label */}
                <text x="30" y="270" fill="#6b7280" fontSize="12" className="dark:fill-gray-400">
                  Request/Response flow: Client → Web → Business → Database
                </text>
              </svg>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Java EE divides the application into logical tiers. Each tier can run on
              separate machines and is managed by a container (e.g., Web container, EJB container).
            </p>
          </section>

          {/* ===== Core Components Card ===== */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Key Java EE Components
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium text-blue-600 dark:text-blue-400">Servlets</span> – Handle HTTP requests/responses (the controller).
              </li>
              <li>
                <span className="font-medium text-green-600 dark:text-green-400">JSP</span> – Generate dynamic web pages (the view).
              </li>
              <li>
                <span className="font-medium text-purple-600 dark:text-purple-400">EJB</span> – Encapsulate business logic with transaction support.
              </li>
              <li>
                <span className="font-medium text-red-600 dark:text-red-400">JPA / Hibernate</span> – Object‑relational mapping for database access.
              </li>
              <li>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">JMS</span> – Asynchronous messaging between components.
              </li>
              <li>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">JavaMail</span> – Sending emails.
              </li>
            </ul>
            <p className="mt-3">
              <span className="font-semibold">Real‑world example:</span> When Swadeep from
              Barrackpore logs into his college portal, a Servlet authenticates him, JSP
              renders his dashboard, and EJBs manage his registration and fees.
            </p>
          </section>

          {/* ===== Real-World Context Card ===== */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Java EE in the Real World
            </h2>
            <p className="mb-3">
              Java EE is the backbone of countless enterprise systems:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Banking applications (like those used in Shyamnagar co‑operative banks)
              </li>
              <li>
                Airline reservation systems
              </li>
              <li>
                Government portals (e.g., Ichapur municipal services)
              </li>
              <li>
                Large‑scale e‑commerce (think of an online store run by Tuhina’s family
                in Naihati)
              </li>
            </ul>
            <p className="mt-3">
              Java EE provides built‑in security, scalability, and transaction management,
              so developers can concentrate on solving business problems.
            </p>
          </section>

          {/* ===== Tips & Tricks ===== */}
          <section
            className={clsx(
              "rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20",
              "border border-blue-200 dark:border-blue-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[500ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              💡 Tips & Tricks
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Think in layers:</span> Always separate
                presentation, business logic, and data access. This makes your application
                easier to maintain and test.
              </li>
              <li>
                <span className="font-medium">Use annotations:</span> Modern Java EE (now
                Jakarta EE) relies on annotations (@WebServlet, @Stateless) to reduce XML
                configuration.
              </li>
              <li>
                <span className="font-medium">Learn by building:</span> Start with a simple
                Servlet/JSP project, then gradually introduce EJB and JPA. Abhronila found
                this step‑by‑step approach very effective.
              </li>
              <li>
                <span className="font-medium">Debugging:</span> Enable logging (e.g., using
                java.util.logging or Log4j) to trace requests across tiers.
              </li>
            </ul>
          </section>

          {/* ===== Common Mistakes ===== */}
          <section
            className={clsx(
              "rounded-lg bg-red-50 p-6 dark:bg-red-900/20",
              "border border-red-200 dark:border-red-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[600ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ⚠️ Common Mistakes Beginners Make
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Mixing Java EE with Java SE:</span> Forgetting
                that Java EE runs inside a container – you cannot just run a main() method.
                You must deploy to a server.
              </li>
              <li>
                <span className="font-medium">Ignoring the container:</span> Not understanding
                that the container manages lifecycle, threading, and transactions.
              </li>
              <li>
                <span className="font-medium">Overcomplicating the first project:</span>
                Debangshu once tried to use every EE feature at once; start small!
              </li>
              <li>
                <span className="font-medium">Forgetting dependencies:</span> In modern
                Maven/Gradle projects, you need to include the correct Jakarta EE API
                dependencies.
              </li>
            </ul>
          </section>

          {/* ===== Best Practices ===== */}
          <section
            className={clsx(
              "rounded-lg bg-green-50 p-6 dark:bg-green-900/20",
              "border border-green-200 dark:border-green-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[700ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ✅ Best Practices
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Follow MVC:</span> Use Servlets as controllers,
                JSP as views, and JavaBeans/EJB as models.
              </li>
              <li>
                <span className="font-medium">Use dependency injection:</span> @Resource,
                @Inject to let the container provide resources.
              </li>
              <li>
                <span className="font-medium">Keep business logic out of Servlets:</span>
                Servlets should only handle HTTP, delegate to service classes.
              </li>
              <li>
                <span className="font-medium">Write unit tests:</span> Use embedded containers
                (like Arquillian) to test EE components.
              </li>
            </ul>
          </section>

          {/* ===== Mini Checklist ===== */}
          <section
            className={clsx(
              "rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20",
              "border border-yellow-200 dark:border-yellow-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[800ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              📋 Mini Checklist – What to Remember
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>☐ Java EE builds on Java SE – know the basics first.</li>
              <li>☐ It’s a set of specifications, not a product. Vendors implement it (Tomcat, Payara, etc.).</li>
              <li>☐ The main tiers: Client, Web, Business, EIS.</li>
              <li>☐ Containers manage components (Servlets, EJBs).</li>
              <li>☐ Java EE is now Jakarta EE (same concepts, new name).</li>
            </ul>
          </section>

          {/* ===== Hint Section ===== */}
          <section
            className={clsx(
              "rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20",
              "border border-indigo-200 dark:border-indigo-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[900ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              🤔 Think About…
            </h2>
            <p className="mb-2">
              <span className="font-medium">Observe carefully:</span> How does a typical
              Java EE application handle a user request from browser to database and back?
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> If you moved the
              business logic into the Servlet, what problems would arise? (Hint:
              maintainability, reusability, testing)
            </p>
          </section>

          {/* ===== Teacher’s Note ===== */}
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
                  <span className="font-bold">Sukanta Hui</span> (27 years of experience in
                  Programming, RDBMS, OS, and Web Development)
                </p>
                <p className="mb-2">
                  📧 <a href="mailto:sukantahui@codernaccotax.co.in" className="text-blue-600 dark:text-blue-400 hover:underline">sukantahui@codernaccotax.co.in</a>
                </p>
                <p>📞 7003756860</p>
              </div>
              <div className="flex-1">
                <p className="italic">
                  “Java EE is not just about learning APIs – it’s about understanding how
                  large applications are structured. When Tuhina builds her first Servlet,
                  I remind her: you are now writing code that runs inside a professional
                  server, handling real requests. Respect the container, and it will serve
                  you well.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> The architecture is your
                  map. Without it, even experienced developers get lost.
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
        /* Custom animation delays (arbitrary values) */
        .animation-delay-\\[100ms\\] { animation-delay: 100ms; }
        .animation-delay-\\[200ms\\] { animation-delay: 200ms; }
        .animation-delay-\\[300ms\\] { animation-delay: 300ms; }
        .animation-delay-\\[400ms\\] { animation-delay: 400ms; }
        .animation-delay-\\[500ms\\] { animation-delay: 500ms; }
        .animation-delay-\\[600ms\\] { animation-delay: 600ms; }
        .animation-delay-\\[700ms\\] { animation-delay: 700ms; }
        .animation-delay-\\[800ms\\] { animation-delay: 800ms; }
        .animation-delay-\\[900ms\\] { animation-delay: 900ms; }

        /* Respect reduced motion */
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