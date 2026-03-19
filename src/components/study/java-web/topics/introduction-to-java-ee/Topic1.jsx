import React from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------
// Topic 1: Java SE vs Java EE
// ----------------------------------------------------------------------
// This topic clarifies the distinction between Java Standard Edition (SE)
// and Java Enterprise Edition (EE). It explains their purposes, scope,
// and how they complement each other in building applications.
// ----------------------------------------------------------------------

export default function Topic1() {
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
              Java SE vs Java EE
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Understanding the two platforms and when to use each.
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
              What Are Java SE and Java EE?
            </h2>
            <p className="mb-3">
              <span className="font-bold text-blue-600 dark:text-blue-400">Java SE</span>{" "}
              (Standard Edition) is the core Java platform. It provides the fundamental
              libraries and APIs for developing general‑purpose applications—everything
              from desktop apps to basic networking. It includes the JVM, the Java
              language itself, and packages like <code>java.lang</code>,{" "}
              <code>java.util</code>, and <code>java.io</code>.
            </p>
            <p className="mb-3">
              <span className="font-bold text-green-600 dark:text-green-400">Java EE</span>{" "}
              (Enterprise Edition) builds on top of Java SE. It adds specifications and
              APIs designed for large‑scale, distributed, multi‑tier enterprise
              applications. These include Servlets, JSP, EJB, JPA, and more. Java EE
              applications run in special containers (like Tomcat, Payara, or WildFly)
              that provide services such as transactions, security, and persistence.
            </p>
            <p>
              <span className="font-semibold">Analogy:</span> Think of Java SE as the
              engine and chassis of a car—the essential parts. Java EE is the bodywork,
              interior, and navigation system—the components that make it suitable for
              passengers, long trips, and specific uses. A car (Java SE) can run without
              them, but an enterprise vehicle (Java EE) needs them to function in its
              environment.
            </p>
          </section>

          {/* ===== Visual Comparison (SVG) ===== */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Relationship at a Glance
            </h2>
            <div className="flex justify-center">
              <svg
                width="500"
                height="250"
                viewBox="0 0 500 250"
                className="max-w-full"
                aria-label="Diagram showing Java SE as foundation and Java EE as extension"
              >
                {/* Background */}
                <rect width="500" height="250" fill="transparent" />

                {/* Java SE base */}
                <rect
                  x="50"
                  y="150"
                  width="400"
                  height="60"
                  rx="8"
                  fill="#f97316"
                  className="transition-all duration-300 hover:fill-orange-400"
                />
                <text x="200" y="185" fill="white" fontSize="18" fontWeight="bold">
                  Java SE (Foundation)
                </text>
                <text x="160" y="205" fill="white" fontSize="12">
                  JVM, Language, Core APIs
                </text>

                {/* Java EE layers on top */}
                <rect
                  x="80"
                  y="70"
                  width="340"
                  height="50"
                  rx="8"
                  fill="#3b82f6"
                  className="transition-all duration-300 hover:fill-blue-400"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;1;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text x="180" y="105" fill="white" fontSize="14" fontWeight="bold">
                  Java EE (Enterprise Extensions)
                </text>
                <text x="160" y="120" fill="white" fontSize="10">
                  Servlets, JSP, EJB, JPA, JMS, etc.
                </text>

                {/* Label for containers */}
                <rect
                  x="120"
                  y="20"
                  width="260"
                  height="30"
                  rx="5"
                  fill="#10b981"
                  className="transition-all duration-300 hover:fill-green-400"
                />
                <text x="150" y="40" fill="white" fontSize="12" fontWeight="bold">
                  Container (Application Server)
                </text>

                {/* Connecting lines */}
                <line
                  x1="250"
                  y1="70"
                  x2="250"
                  y2="150"
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="dark:stroke-gray-400"
                />
                <text x="260" y="110" fill="#6b7280" fontSize="10">
                  runs inside
                </text>
              </svg>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Java EE adds enterprise features on top of the solid Java SE foundation.
              The container provides the runtime environment.
            </p>
          </section>

          {/* ===== Detailed Comparison Card ===== */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Key Differences
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Java SE column */}
              <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                <h3 className="mb-2 text-lg font-bold text-orange-700 dark:text-orange-300">
                  Java SE
                </h3>
                <ul className="list-inside list-disc space-y-1">
                  <li>Core language and JVM</li>
                  <li>For desktop, console, basic networking</li>
                  <li>Runs as standalone applications</li>
                  <li>APIs: java.lang, java.util, java.io, etc.</li>
                  <li>No built-in support for web or distributed transactions</li>
                  <li>Entry point: public static void main(String[] args)</li>
                </ul>
              </div>
              {/* Java EE column */}
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 text-lg font-bold text-blue-700 dark:text-blue-300">
                  Java EE
                </h3>
                <ul className="list-inside list-disc space-y-1">
                  <li>Extends SE with enterprise APIs</li>
                  <li>For web apps, microservices, large systems</li>
                  <li>Runs inside a container (application server)</li>
                  <li>APIs: Servlets, JSP, EJB, JPA, JMS, JSF, etc.</li>
                  <li>Container provides transactions, security, pooling</li>
                  <li>Components are deployed (WAR, EAR files)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ===== Real-World Context ===== */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Real‑World Usage
            </h2>
            <p className="mb-3">
              When Abhronila writes a simple calculator program in her computer lab at
              Barrackpore, she’s using Java SE. When Debangshu builds a web application
              for the Naihati public library to manage book loans online, he needs Java
              EE (or a framework built on it) to handle HTTP requests, database
              connections, and user sessions.
            </p>
            <p className="mb-3">
              <span className="font-semibold">Example:</span> A bank’s ATM software uses
              Java SE for the local interface. The backend banking system that processes
              transactions across branches (in Shyamnagar and Ichapur) is built with
              Java EE to ensure reliability and scalability.
            </p>
            <p>
              Many modern applications use Java EE concepts even if they adopt lightweight
              frameworks like Spring Boot. Those frameworks still rely on the Servlet API
              and often run in a Servlet container—demonstrating that the distinction
              remains relevant.
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
                <span className="font-medium">Start with SE:</span> Master Java SE
                fundamentals before diving into EE. Tuhina found that solid SE knowledge
                made EE concepts much easier to grasp.
              </li>
              <li>
                <span className="font-medium">Use a build tool:</span> Maven or Gradle
                can help manage the many dependencies required for EE projects.
              </li>
              <li>
                <span className="font-medium">Know your server:</span> Understand whether
                your target runtime is a full Java EE server (like Payara) or a Servlet
                container (like Tomcat). The APIs available differ.
              </li>
              <li>
                <span className="font-medium">Profile vs. platform:</span> Java EE defines
                different profiles (Web Profile, Full Platform). Choose the one that fits
                your project to keep it lightweight.
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
                <span className="font-medium">Thinking Java EE replaces Java SE:</span>{" "}
                It doesn’t. You always need the JDK (SE) to run any Java program, EE
                included.
              </li>
              <li>
                <span className="font-medium">Using EE APIs in a SE-only project:</span>{" "}
                For example, trying to use <code>@WebServlet</code> in a simple console
                app will cause errors because the container isn’t present.
              </li>
              <li>
                <span className="font-medium">Forgetting the container:</span> When
                Swadeep first wrote a Servlet, he tried to run it with just the
                <code>java</code> command—it failed because Servlets need a server.
              </li>
              <li>
                <span className="font-medium">Mixing up versions:</span> Java EE is now
                Jakarta EE (from version 8 onward). The package names changed from
                <code>javax.*</code> to <code>jakarta.*</code>. Be careful when reading
                old tutorials.
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
                <span className="font-medium">Build on a solid SE base:</span> Ensure you
                are comfortable with collections, exceptions, I/O, and multithreading
                before tackling EE.
              </li>
              <li>
                <span className="font-medium">Use the right edition for the job:</span>{" "}
                For a simple REST API, a Servlet container (like Tomcat) with JAX‑RS may
                be enough; you don’t always need a full EE server.
              </li>
              <li>
                <span className="font-medium">Leverage EE services:</span> If you do use
                a full EE server, take advantage of its built‑in transaction management,
                connection pooling, and security—don’t reinvent the wheel.
              </li>
              <li>
                <span className="font-medium">Stay updated:</span> Java EE / Jakarta EE
                evolves. Follow the official specifications and use the latest stable
                versions.
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
              <li>☐ Java SE is the core; Java EE builds on it.</li>
              <li>☐ SE applications run standalone; EE applications need a container.</li>
              <li>☐ EE provides enterprise APIs (Servlets, JPA, EJB, etc.).</li>
              <li>☐ You can use parts of EE (e.g., Servlets) without using the full platform.</li>
              <li>☐ Jakarta EE is the new name for Java EE (version 9+).</li>
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
              <span className="font-medium">Observe carefully:</span> Why would a large
              organization choose Java EE over Java SE for a new project? (Hint:
              think about scalability, security, and existing infrastructure.)
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> If you were asked
              to build a simple blog with a few static pages, would you still use Java EE?
              Why or why not? (Hint: consider the overhead.)
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
                  “I often tell my students: Java SE is like learning to drive a car;
                  Java EE is learning to drive a truck. The basic controls are the same,
                  but the truck has extra features—air brakes, multiple gears—that you
                  need to handle heavy loads. Start with the car, then move to the truck
                  once you’re comfortable. Swadeep and Tuhina both appreciated this
                  analogy when they began their web projects in Barrackpore.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> The foundation is
                  everything. A shaky SE understanding leads to shaky EE applications.
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