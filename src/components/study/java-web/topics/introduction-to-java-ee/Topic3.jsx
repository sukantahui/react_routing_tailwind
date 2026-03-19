import React from "react";
import clsx from "clsx";

// Java file loader component
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Raw imports of example Java files (these must be placed in ./topic3_files/)
import servletExample from "./topic3_files/ExampleServlet.java?raw";
import layeredArchExample from "./topic3_files/LayeredArchitectureExample.java?raw";
import requestResponseCycle from "./topic3_files/RequestResponseCycle.java?raw";

// ----------------------------------------------------------------------
// Topic 3: Web Application Architecture Fundamentals
// ----------------------------------------------------------------------
// This topic explains the core concepts of web application architecture:
// client-server model, request-response cycle, multi-tiered architecture,
// and how Java components fit into the picture.
// ----------------------------------------------------------------------

export default function Topic3() {
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
              Web Application Architecture Fundamentals
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Understanding the blueprint of modern web applications.
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
              What is Web Application Architecture?
            </h2>
            <p className="mb-3">
              Web application architecture defines how the components of a web
              application (client, server, database, etc.) interact with each other.
              It’s the high‑level structure that ensures the application is scalable,
              secure, and maintainable.
            </p>
            <p>
              In a typical Java web application, the architecture follows a
              <span className="font-bold"> client‑server model</span> with multiple
              tiers: the client tier (browser), the web tier (Servlets/JSP), the
              business tier (EJBs or services), and the data tier (database accessed
              via JDBC). This separation of concerns is fundamental to building robust
              enterprise applications.
            </p>
          </section>

          {/* SVG Architecture Diagram */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Typical Multi‑Tier Web Architecture
            </h2>
            <div className="flex justify-center">
              <svg
                width="700"
                height="300"
                viewBox="0 0 700 300"
                className="max-w-full"
                aria-label="Multi-tier web architecture diagram"
              >
                <rect width="700" height="300" fill="transparent" />

                {/* Client Tier */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="30"
                    y="120"
                    width="120"
                    height="60"
                    rx="8"
                    fill="#f97316"
                    className="transition-all duration-300 hover:fill-orange-400"
                  />
                  <text x="65" y="155" fill="white" fontSize="14" fontWeight="bold">
                    Client
                  </text>
                  <text x="55" y="175" fill="white" fontSize="10">
                    (Browser, Mobile)
                  </text>
                </g>

                {/* Arrow */}
                <line
                  x1="150"
                  y1="150"
                  x2="220"
                  y2="150"
                  stroke="#4b5563"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  className="dark:stroke-gray-400"
                />

                {/* Web Tier */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="230"
                    y="100"
                    width="140"
                    height="100"
                    rx="8"
                    fill="#3b82f6"
                    className="transition-all duration-300 hover:fill-blue-400"
                  />
                  <text x="265" y="140" fill="white" fontSize="14" fontWeight="bold">
                    Web Tier
                  </text>
                  <text x="255" y="165" fill="white" fontSize="10">
                    Servlets, JSP, Filters
                  </text>
                </g>

                {/* Arrow to Business Tier */}
                <line
                  x1="370"
                  y1="150"
                  x2="440"
                  y2="150"
                  stroke="#4b5563"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  className="dark:stroke-gray-400"
                />

                {/* Business Tier */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="450"
                    y="100"
                    width="140"
                    height="100"
                    rx="8"
                    fill="#8b5cf6"
                    className="transition-all duration-300 hover:fill-purple-400"
                  />
                  <text x="485" y="140" fill="white" fontSize="14" fontWeight="bold">
                    Business Tier
                  </text>
                  <text x="475" y="165" fill="white" fontSize="10">
                    EJBs, Services, DAOs
                  </text>
                </g>

                {/* Arrow to Data Tier */}
                <line
                  x1="520"
                  y1="200"
                  x2="520"
                  y2="240"
                  stroke="#4b5563"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  className="dark:stroke-gray-400"
                />

                {/* Data Tier */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect
                    x="450"
                    y="250"
                    width="140"
                    height="60"
                    rx="8"
                    fill="#ef4444"
                    className="transition-all duration-300 hover:fill-red-400"
                  />
                  <text x="485" y="285" fill="white" fontSize="14" fontWeight="bold">
                    Data Tier
                  </text>
                  <text x="475" y="300" fill="white" fontSize="10">
                    Database (via JDBC)
                  </text>
                </g>

                {/* Dashed line for response path */}
                <line
                  x1="520"
                  y1="250"
                  x2="520"
                  y2="200"
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  markerEnd="url(#arrow)"
                  className="dark:stroke-gray-400"
                />
                <line
                  x1="590"
                  y1="150"
                  x2="230"
                  y2="150"
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeDasharray="4 4"
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

                {/* Labels */}
                <text x="160" y="130" fill="#6b7280" fontSize="12">
                  HTTP Request
                </text>
                <text x="160" y="180" fill="#6b7280" fontSize="12">
                  HTTP Response (dashed)
                </text>
              </svg>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              The client sends a request that flows through web and business tiers,
              possibly accessing data, then returns a response.
            </p>
          </section>

          {/* Detailed Explanation of Tiers */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              The Four Tiers Explained
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Client Tier */}
              <div className="rounded-lg border-l-4 border-orange-600 bg-orange-50 p-4 dark:bg-orange-900/20">
                <h3 className="mb-2 font-bold text-orange-800 dark:text-orange-300">
                  Client Tier
                </h3>
                <p>
                  The user interface—typically a web browser or mobile app. It sends
                  HTTP requests and renders the HTML/JSON response. No business logic
                  resides here; it only displays data.
                </p>
              </div>

              {/* Web Tier */}
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 font-bold text-blue-800 dark:text-blue-300">
                  Web Tier (Presentation Tier)
                </h3>
                <p>
                  Handles HTTP requests, manages sessions, and decides which view to
                  return. In Java, this is where Servlets, JSP, and filters live. It
                  delegates business logic to the next tier.
                </p>
              </div>

              {/* Business Tier */}
              <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4 dark:bg-purple-900/20">
                <h3 className="mb-2 font-bold text-purple-800 dark:text-purple-300">
                  Business Tier (Application Tier)
                </h3>
                <p>
                  Contains the core business logic: calculations, workflows, and rules.
                  Implemented as EJBs, Spring services, or plain Java classes. It may
                  also coordinate transactions and security.
                </p>
              </div>

              {/* Data Tier */}
              <div className="rounded-lg border-l-4 border-red-600 bg-red-50 p-4 dark:bg-red-900/20">
                <h3 className="mb-2 font-bold text-red-800 dark:text-red-300">
                  Data Tier (Persistence Tier)
                </h3>
                <p>
                  Responsible for data storage and retrieval. Typically a relational
                  database accessed via JDBC, JPA, or Hibernate. It ensures data
                  integrity and provides query capabilities.
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
              Java Code Examples
            </h2>
            <p className="mb-4">
              The following examples illustrate how Java components map to the tiers
              described above.
            </p>

            {/* Example 1: Servlet (Web Tier) */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={servletExample}
                title="ExampleServlet.java (Web Tier)"
                highlightLines={[5, 10]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A simple Servlet that receives a request, calls a business service,
                and forwards to a JSP. This is the controller in MVC.
              </p>
            </div>

            {/* Example 2: Layered Architecture Example */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={layeredArchExample}
                title="LayeredArchitectureExample.java (Business & Data Tiers)"
                highlightLines={[9, 18]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A demonstration of separating concerns: a service class (business tier)
                uses a DAO (data tier) to fetch data.
              </p>
            </div>

            {/* Example 3: Request-Response Cycle */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={requestResponseCycle}
                title="RequestResponseCycle.java (Conceptual)"
                highlightLines={[7, 14]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A conceptual illustration of the request‑response flow through the
                tiers, using simple method calls.
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
              Real‑World Context
            </h2>
            <p className="mb-3">
              Consider the online portal used by students in Barrackpore to check exam
              results. The architecture follows the same pattern:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <span className="font-bold">Client:</span> Swadeep’s browser on his
                phone.
              </li>
              <li>
                <span className="font-bold">Web Tier:</span> A <code>ResultServlet</code>{" "}
                receives the request and validates the input.
              </li>
              <li>
                <span className="font-bold">Business Tier:</span> A{" "}
                <code>ResultService</code> computes grade points and checks eligibility.
              </li>
              <li>
                <span className="font-bold">Data Tier:</span> A{" "}
                <code>ResultDAO</code> uses JDBC to fetch marks from the database.
              </li>
            </ul>
            <p className="mt-3">
              This layered approach allows each part to evolve independently—for
              example, the database can be replaced without changing the web tier.
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
                <span className="font-medium">Keep tiers loosely coupled:</span> Use
                interfaces between layers. The web tier should depend on service
                interfaces, not concrete implementations. This makes testing easier.
              </li>
              <li>
                <span className="font-medium">Don’t skip the business tier:</span> Even
                for simple apps, create a service layer. Putting logic in Servlets or
                directly in DAOs leads to spaghetti code.
              </li>
              <li>
                <span className="font-medium">Understand your deployment target:</span>{" "}
                If you’re using a Servlet container (like Tomcat), you won’t have EJB
                or JTA support unless you add them via libraries.
              </li>
              <li>
                <span className="font-medium">Use DTOs for cross‑tier communication:</span>{" "}
                Data Transfer Objects (simple POJOs) help avoid exposing entity objects
                directly to the web tier.
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
                <span className="font-medium">Tight coupling between tiers:</span>{" "}
                Directly calling database code from a JSP or Servlet. This destroys
                maintainability.
              </li>
              <li>
                <span className="font-medium">Ignoring the business tier:</span> Putting
                all logic in Servlets, which become huge and untestable.
              </li>
              <li>
                <span className="font-medium">Not using connection pooling:</span>{" "}
                Opening a new database connection per request kills performance.
              </li>
              <li>
                <span className="font-medium">Misunderstanding the request scope:</span>{" "}
                Storing large objects in session or not cleaning up attributes leads to
                memory issues.
              </li>
              <li>
                <span className="font-medium">Forgetting that the web is stateless:</span>{" "}
                Trying to maintain client state without proper session management.
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
                <span className="font-medium">Follow the principle of separation of concerns:</span>{" "}
                Each tier has a distinct responsibility.
              </li>
              <li>
                <span className="font-medium">Use a well‑defined API between tiers:</span>{" "}
                Define clear interfaces so that tiers can be developed and tested in
                isolation.
              </li>
              <li>
                <span className="font-medium">Apply dependency injection:</span> Use
                frameworks like Spring to wire components together, making the
                architecture more flexible.
              </li>
              <li>
                <span className="font-medium">Design for scalability:</span> Stateless
                middle tiers can be easily replicated. Keep session data minimal or
                externalized.
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
              <li>☐ Web apps follow a client‑server model with multiple tiers.</li>
              <li>☐ Tiers: Client, Web (presentation), Business, Data.</li>
              <li>☐ Each tier has a clear responsibility.</li>
              <li>☐ Use interfaces to decouple tiers.</li>
              <li>☐ Business logic belongs in the business tier, not in Servlets or JSPs.</li>
              <li>☐ Data access code (JDBC) belongs in the data tier (DAOs).</li>
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
              why are there two arrows (solid and dashed) between client and web tier?
              (Hint: think request vs. response.)
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> What would happen
              if the business tier directly accessed the database without using a DAO?
              How would that affect testing and maintainability?
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
                  “I’ve seen too many projects where a student, like Debangshu from
                  Ichapur, tries to build everything in one layer—Servlets with embedded
                  SQL and HTML. The result is a nightmare to debug. Remember: layers are
                  your friends. They help you isolate problems, swap implementations,
                  and work in teams. When Tuhina builds her first real application, I
                  always tell her to sketch the tiers on paper before writing a single
                  line of code.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> Architecture first,
                  code second.
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