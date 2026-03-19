import React from "react";
import clsx from "clsx";

// Java file loader component
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Raw imports of example Java files (place in ./topic6_files/)
import pomXml from "./topic6_files/pom.xml?raw";
import buildGradle from "./topic6_files/build.gradle?raw";
import helloWorldServlet from "./topic6_files/HelloWorldServlet.java?raw";

// ----------------------------------------------------------------------
// Topic 6: Setting Up Development Environment (Eclipse/IntelliJ, Maven/Gradle Basics)
// ----------------------------------------------------------------------
// This topic walks through configuring a Java web development environment:
// choosing an IDE, understanding project structure, and using build tools
// like Maven and Gradle.
// ----------------------------------------------------------------------

export default function Topic6() {
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
              Setting Up Development Environment
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              IDEs, Build Tools, and Project Structure
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
              Why a Proper Setup Matters
            </h2>
            <p className="mb-3">
              A well‑configured development environment saves hours of frustration.
              It includes an IDE (Integrated Development Environment) for writing code,
              a build tool for managing dependencies and compiling, and a server for
              deployment. In this topic, we'll set up everything needed to start
              building Java web applications.
            </p>
            <p>
              Whether you choose Eclipse, IntelliJ IDEA, or VS Code, the core concepts
              remain the same. We'll also introduce Maven and Gradle – the industry
              standards for dependency management and build automation.
            </p>
          </section>

          {/* IDEs Comparison */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Choosing an IDE
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Eclipse */}
              <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4 dark:bg-purple-900/20">
                <h3 className="font-bold text-purple-800 dark:text-purple-300">Eclipse</h3>
                <p className="text-sm">
                  Free, open‑source, widely used in academia. Excellent plugin
                  ecosystem (Maven, Tomcat, etc.). Great for learning.
                </p>
              </div>
              {/* IntelliJ IDEA */}
              <div className="rounded-lg border-l-4 border-orange-600 bg-orange-50 p-4 dark:bg-orange-900/20">
                <h3 className="font-bold text-orange-800 dark:text-orange-300">IntelliJ IDEA</h3>
                <p className="text-sm">
                  Community edition is free. Industry favorite, with smart code
                  completion and deep framework support. Ultimate edition adds EE features.
                </p>
              </div>
              {/* VS Code */}
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">VS Code</h3>
                <p className="text-sm">
                  Lightweight, extensible with Java extensions. Good for microservices
                  and modern workflows, but less integrated for EE.
                </p>
              </div>
            </div>
            <p className="mt-4">
              <span className="font-semibold">Teacher's advice:</span> Start with
              Eclipse or IntelliJ Community – both are free and have excellent Java EE
              support. Tuhina uses IntelliJ, while Debangshu prefers Eclipse; both work
              well for the projects in Barrackpore.
            </p>
          </section>

          {/* Build Tools Section */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Build Tools: Maven vs Gradle
            </h2>
            <p className="mb-3">
              Build tools automate compiling, testing, packaging, and dependency
              management. Instead of manually downloading JARs, you declare them in a
              configuration file, and the tool fetches them from repositories.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-bold text-blue-700 dark:text-blue-300">Apache Maven</h3>
                <ul className="list-inside list-disc text-sm">
                  <li>Uses <code>pom.xml</code> for configuration.</li>
                  <li>Convention over configuration – standard project layout.</li>
                  <li>Extensive plugin ecosystem.</li>
                  <li>Steep learning curve but widely adopted.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-green-700 dark:text-green-300">Gradle</h3>
                <ul className="list-inside list-disc text-sm">
                  <li>Uses Groovy or Kotlin DSL (<code>build.gradle</code>).</li>
                  <li>More flexible and faster than Maven (incremental builds).</li>
                  <li>Preferred for Android and modern projects.</li>
                  <li>Can be simpler for small projects.</li>
                </ul>
              </div>
            </div>
            <p className="mt-3">
              For this course, we'll use Maven because of its prevalence in enterprise
              Java and simpler XML syntax. But the concepts translate directly to Gradle.
            </p>
          </section>

          {/* Example Configuration Files */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Sample Configuration Files
            </h2>
            <p className="mb-4">
              Below are typical <code>pom.xml</code> (Maven) and <code>build.gradle</code>
              (Gradle) files for a simple Servlet‑based web application.
            </p>

            {/* Maven pom.xml */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={pomXml}
                title="pom.xml (Maven)"
                highlightLines={[10, 15, 20]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Maven configuration declaring project metadata, dependencies, and build
                plugins (like the war plugin for packaging).
              </p>
            </div>

            {/* Gradle build.gradle */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={buildGradle}
                title="build.gradle (Gradle)"
                highlightLines={[5, 9, 13]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Equivalent Gradle build script using the Groovy DSL.
              </p>
            </div>

            {/* Example Servlet */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={helloWorldServlet}
                title="HelloWorldServlet.java"
                highlightLines={[7, 12]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A minimal Servlet that can be built and deployed using the above
                configurations.
              </p>
            </div>
          </section>

          {/* Step-by-Step Setup Guide */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[500ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Step‑by‑Step Setup (Using Eclipse + Maven + Tomcat)
            </h2>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                <span className="font-semibold">Install Java JDK:</span> Download and
                install JDK 11 or 17 from Oracle or OpenJDK. Set <code>JAVA_HOME</code>.
              </li>
              <li>
                <span className="font-semibold">Install an IDE:</span> Eclipse IDE for
                Enterprise Java Developers (includes Maven and Tomcat integration).
              </li>
              <li>
                <span className="font-semibold">Install Apache Tomcat:</span> Download
                and extract Tomcat 10 (or 9). In Eclipse, add it as a Server runtime.
              </li>
              <li>
                <span className="font-semibold">Create a Maven project:</span> File →
                New → Maven Project. Choose the <code>maven‑archetype‑webapp</code>.
              </li>
              <li>
                <span className="font-semibold">Add dependencies:</span> In
                <code>pom.xml</code>, add the Servlet API dependency (scope provided).
              </li>
              <li>
                <span className="font-semibold">Write your first Servlet:</span> Create
                a Java class extending <code>HttpServlet</code>, annotate with
                <code>@WebServlet</code>.
              </li>
              <li>
                <span className="font-semibold">Build and deploy:</span> Right‑click
                project → Run As → Run on Server. Tomcat will start and open your app
                in the browser.
              </li>
            </ol>
          </section>

          {/* Real-World Context */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[600ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Real‑World Context
            </h2>
            <p className="mb-3">
              In professional environments, the setup is often standardized by the team.
              Many companies use Maven or Gradle with a corporate repository (like Nexus
              or Artifactory) to cache dependencies. IDEs are a matter of preference,
              but IntelliJ is dominant in startups, while Eclipse is still common in
              large enterprises.
            </p>
            <p>
              When Swadeep interned at a Barrackpore IT firm, he was given a Maven
              project and told to import it into Eclipse. Understanding the structure
              and the <code>pom.xml</code> allowed him to start contributing immediately.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section
            className={clsx(
              "rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20",
              "border border-blue-200 dark:border-blue-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[700ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              💡 Tips & Tricks
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Use an archetype:</span> Maven archetypes
                generate a ready‑to‑run project skeleton. The <code>maven-archetype-webapp</code>
                is perfect for web apps.
              </li>
              <li>
                <span className="font-medium">Leverage IDE shortcuts:</span> In Eclipse,
                <code>Ctrl+Shift+O</code> organizes imports; in IntelliJ, <code>Ctrl+Alt+O</code>.
              </li>
              <li>
                <span className="font-medium">Keep <code>pom.xml</code> tidy:</span> Use
                <code>&lt;properties&gt;</code> for version numbers to avoid duplication.
              </li>
              <li>
                <span className="font-medium">Tomcat logs:</span> Check the console
                output in Eclipse – it shows deployment status and errors.
              </li>
            </ul>
          </section>

          {/* Common Mistakes */}
          <section
            className={clsx(
              "rounded-lg bg-red-50 p-6 dark:bg-red-900/20",
              "border border-red-200 dark:border-red-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[800ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ⚠️ Common Mistakes Beginners Make
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Missing <code>JAVA_HOME</code>:</span> Many
                tools (Maven, Tomcat) rely on this environment variable. If not set,
                you'll get cryptic errors.
              </li>
              <li>
                <span className="font-medium">Incorrect Tomcat version:</span> Using
                Tomcat 10 with Jakarta EE 9+ packages (<code>jakarta.servlet</code>)
                instead of <code>javax.servlet</code> will cause <code>ClassNotFoundException</code>.
              </li>
              <li>
                <span className="font-medium">Forgetting to add Servlet API dependency:</span>{" "}
                Without it, your code won't compile. Remember to set scope to
                <code>provided</code> because the server already includes it.
              </li>
              <li>
                <span className="font-medium">Not refreshing the project:</span> After
                changing <code>pom.xml</code>, you need to update the project (Maven
                → Update Project) to download new dependencies.
              </li>
            </ul>
          </section>

          {/* Best Practices */}
          <section
            className={clsx(
              "rounded-lg bg-green-50 p-6 dark:bg-green-900/20",
              "border border-green-200 dark:border-green-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[900ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ✅ Best Practices
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Use a build tool from day one:</span> Even
                for small projects, Maven or Gradle enforce a standard structure and
                manage dependencies.
              </li>
              <li>
                <span className="font-medium">Keep dependencies up‑to‑date:</span> Use
                the latest stable versions, but be aware of major changes (like Jakarta EE).
              </li>
              <li>
                <span className="font-medium">Version control everything:</span> Include
                <code>pom.xml</code>, but exclude IDE‑specific files (add them to
                <code>.gitignore</code>).
              </li>
              <li>
                <span className="font-medium">Understand the directory layout:</span>{" "}
                <code>src/main/java</code> for sources, <code>src/main/webapp</code> for
                web resources (JSP, HTML, <code>WEB-INF</code>).
              </li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section
            className={clsx(
              "rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20",
              "border border-yellow-200 dark:border-yellow-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1000ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              📋 Mini Checklist – What to Remember
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>☐ JDK installed and <code>JAVA_HOME</code> set.</li>
              <li>☐ IDE installed (Eclipse or IntelliJ).</li>
              <li>☐ Tomcat (or another server) downloaded and configured in IDE.</li>
              <li>☐ Maven or Gradle installed (or use IDE bundled).</li>
              <li>☐ Maven project created with webapp archetype.</li>
              <li>☐ Servlet API dependency added with scope <code>provided</code>.</li>
              <li>☐ Project structure: <code>src/main/java</code>, <code>src/main/webapp</code>.</li>
            </ul>
          </section>

          {/* Hint Section */}
          <section
            className={clsx(
              "rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20",
              "border border-indigo-200 dark:border-indigo-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1100ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              🤔 Think About…
            </h2>
            <p className="mb-2">
              <span className="font-medium">Observe carefully:</span> In the
              <code>pom.xml</code>, why is the Servlet API dependency scope set to
              <code>provided</code>? (Hint: who provides the actual JAR at runtime?)
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> What happens if
              you change the scope to <code>compile</code> and package the app? Will it
              still run on Tomcat? Why or why not?
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
                  “Setting up the environment is the first real challenge for any
                  developer. I've seen students spend hours on a problem that was simply
                  a missing <code>JAVA_HOME</code> or an incorrect Tomcat version. My
                  advice: follow the steps methodically, and when something fails, read
                  the error message carefully – it often tells you exactly what's wrong.
                  Abhronila once spent an afternoon debugging a '404' only to realize
                  she hadn't deployed the app. Don't skip the basics.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> A solid setup saves
                  days of frustration later.
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