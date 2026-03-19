import React from "react";
import clsx from "clsx";

// Java file loader component
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Raw imports of example files (place in ./topic7_files/)
import demoWARServlet from "./topic7_files/DemoWARServlet.java?raw";
import webXml from "./topic7_files/web.xml?raw";
import warStructure from "./topic7_files/war-structure.txt?raw";

// ----------------------------------------------------------------------
// Topic 7: WAR File Structure and Deployment
// ----------------------------------------------------------------------
// This topic explains the Web Application Archive (WAR) file format,
// its internal structure, the role of the deployment descriptor (web.xml),
// and how to build and deploy WAR files to a servlet container like Tomcat.
// ----------------------------------------------------------------------

export default function Topic7() {
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
              WAR File Structure and Deployment
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Packaging and deploying Java web applications.
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
              What is a WAR File?
            </h2>
            <p className="mb-3">
              A WAR (Web Application Archive) file is a JAR-like archive used to
              distribute a collection of JavaServer Pages, servlets, Java classes,
              XML files, tag libraries, static web pages (HTML, CSS, JavaScript),
              and other resources that together constitute a web application.
            </p>
            <p>
              WAR files follow a standard directory structure defined by the Java
              Servlet specification. They are deployed inside a servlet container
              (like Tomcat) or a full Java EE application server. The container
              unpacks the WAR (or runs it directly) and makes the application
              available at a specified context path.
            </p>
          </section>

          {/* WAR Structure SVG */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Standard WAR Directory Layout
            </h2>
            <div className="flex justify-center">
              <svg
                width="500"
                height="320"
                viewBox="0 0 500 320"
                className="max-w-full"
                aria-label="WAR file directory structure"
              >
                <rect width="500" height="320" fill="transparent" />

                {/* Root folder */}
                <text x="50" y="40" fill="#3b82f6" fontSize="16" fontWeight="bold">
                  my-webapp.war
                </text>
                <line x1="50" y1="45" x2="200" y2="45" stroke="#3b82f6" strokeWidth="2" />

                {/* WEB-INF */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect x="70" y="60" width="120" height="30" rx="5" fill="#10b981" />
                  <text x="85" y="80" fill="white" fontSize="14" fontWeight="bold">
                    WEB-INF/
                  </text>
                </g>

                {/* web.xml under WEB-INF */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect x="100" y="100" width="180" height="25" rx="5" fill="#f59e0b" />
                  <text x="115" y="118" fill="white" fontSize="12">
                    web.xml (deployment descriptor)
                  </text>
                </g>

                {/* classes/ under WEB-INF */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect x="100" y="135" width="120" height="25" rx="5" fill="#f59e0b" />
                  <text x="115" y="153" fill="white" fontSize="12">
                    classes/
                  </text>
                </g>
                <text x="130" y="170" fill="#6b7280" fontSize="10">
                  (compiled .class files, properties)
                </text>

                {/* lib/ under WEB-INF */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect x="100" y="185" width="100" height="25" rx="5" fill="#f59e0b" />
                  <text x="115" y="203" fill="white" fontSize="12">
                    lib/
                  </text>
                </g>
                <text x="130" y="220" fill="#6b7280" fontSize="10">
                  (JAR dependencies)
                </text>

                {/* META-INF */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect x="70" y="240" width="120" height="30" rx="5" fill="#10b981" />
                  <text x="85" y="260" fill="white" fontSize="14" fontWeight="bold">
                    META-INF/
                  </text>
                </g>
                <text x="100" y="280" fill="#6b7280" fontSize="10">
                  (MANIFEST.MF, context.xml)
                </text>

                {/* Static resources (root) */}
                <g className="transition-all duration-300 hover:opacity-80">
                  <rect x="70" y="290" width="150" height="25" rx="5" fill="#8b5cf6" />
                  <text x="85" y="308" fill="white" fontSize="12">
                    index.html, CSS, JS, images
                  </text>
                </g>
              </svg>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              All files and directories under <code>WEB-INF</code> are private (not accessible directly by the client).
              Static resources at the root level are publicly accessible.
            </p>
          </section>

          {/* Detailed Explanation */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Key Directories and Files
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-bold text-blue-600 dark:text-blue-400">WEB-INF/</span> – 
                Contains private resources; not directly accessible via HTTP.
              </li>
              <li>
                <span className="font-bold text-green-600 dark:text-green-400">WEB-INF/web.xml</span> – 
                The deployment descriptor (optional in Servlet 3.0+). Configures servlets, filters,
                listeners, context parameters, welcome files, error pages, etc.
              </li>
              <li>
                <span className="font-bold text-purple-600 dark:text-purple-400">WEB-INF/classes/</span> – 
                Holds compiled Java classes (.class files) and resource bundles. The classloader looks here first.
              </li>
              <li>
                <span className="font-bold text-orange-600 dark:text-orange-400">WEB-INF/lib/</span> – 
                Contains JAR files (dependencies) needed by the application.
              </li>
              <li>
                <span className="font-bold text-red-600 dark:text-red-400">META-INF/</span> – 
                Optional; can contain <code>MANIFEST.MF</code> (used by Java) and container-specific
                configuration like <code>context.xml</code> for Tomcat.
              </li>
              <li>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Static resources</span> – 
                HTML, CSS, JavaScript, images placed at the root (or any subfolder not under WEB-INF)
                are directly accessible.
              </li>
            </ul>
          </section>

          {/* Deployment Descriptor (web.xml) */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              The Deployment Descriptor (web.xml)
            </h2>
            <p className="mb-3">
              Historically, <code>web.xml</code> was required to map servlets, define filters,
              set context parameters, etc. Since Servlet 3.0, annotations (<code>@WebServlet</code>,
              <code>@WebFilter</code>) can replace much of the XML configuration. However,
              <code>web.xml</code> is still needed for:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Defining welcome files (<code>&lt;welcome-file-list&gt;</code>).</li>
              <li>Configuring security roles and constraints.</li>
              <li>Setting context parameters that are not annotation-driven.</li>
              <li>Defining error pages for specific HTTP status codes.</li>
              <li>Overriding or extending annotation-based configuration.</li>
            </ul>
          </section>

          {/* Java Code Examples */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[500ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Example Files
            </h2>

            {/* Example Servlet */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={demoWARServlet}
                title="DemoWARServlet.java"
                highlightLines={[8, 14]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A simple servlet that will be packaged in the WAR. It uses the
                <code>@WebServlet</code> annotation, so no <code>web.xml</code> mapping is required.
              </p>
            </div>

            {/* web.xml */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={webXml}
                title="web.xml"
                highlightLines={[10, 15]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A minimal <code>web.xml</code> that sets a welcome file and an error page.
              </p>
            </div>

            {/* WAR structure text */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={warStructure}
                title="war-structure.txt"
                highlightLines={[]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A sample listing of the contents of a typical WAR file after build.
              </p>
            </div>
          </section>

          {/* Building and Deploying */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[600ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Building and Deploying a WAR
            </h2>
            <h3 className="mb-2 font-bold">Building with Maven</h3>
            <p className="mb-2">
              In a Maven project with <code>&lt;packaging&gt;war&lt;/packaging&gt;</code>,
              run <code>mvn clean package</code>. The WAR file is generated in the
              <code>target/</code> directory.
            </p>
            <h3 className="mb-2 font-bold">Building with Gradle</h3>
            <p className="mb-2">
              With the <code>war</code> plugin applied, run <code>gradle war</code>. The WAR
              appears in <code>build/libs/</code>.
            </p>
            <h3 className="mb-2 font-bold">Deploying to Tomcat</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <span className="font-semibold">Manual:</span> Copy the WAR file to Tomcat's
                <code>webapps/</code> directory. Tomcat will automatically unpack and deploy
                it (if autoDeploy is enabled). The application will be available at
                <code>http://localhost:8080/context-root/</code> (the context root defaults
                to the WAR filename).
              </li>
              <li>
                <span className="font-semibold">Tomcat Manager:</span> Use the Manager web
                application (if configured) to upload and deploy WAR files.
              </li>
              <li>
                <span className="font-semibold">IDE integration:</span> Eclipse/IntelliJ can
                automatically deploy to a configured Tomcat instance when you "Run on Server".
              </li>
            </ul>
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
              When Tuhina's team at a Barrackpore startup built a customer portal,
              they used Maven to create a WAR file, which was then deployed to a
              Tomcat server in the cloud. Understanding the WAR structure helped them
              debug a <code>ClassNotFoundException</code> – they had forgotten to include
              a dependency JAR in <code>WEB-INF/lib</code>. In larger enterprises,
              deployment is often automated via CI/CD pipelines (Jenkins, GitLab CI)
              that build and deploy WARs to application servers like WebLogic or
              WebSphere.
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
                <span className="font-medium">Use <code>jar tf myapp.war</code>:</span> To
                inspect the contents of a WAR without extracting it.
              </li>
              <li>
                <span className="font-medium">Check <code>WEB-INF/classes</code> first:</span>{" "}
                If you see a class not found error, verify that the compiled class is present
                in the correct package directory under <code>WEB-INF/classes</code>.
              </li>
              <li>
                <span className="font-medium">Keep <code>web.xml</code> minimal:</span> Use
                annotations for servlets and filters unless you need XML‑only features.
              </li>
              <li>
                <span className="font-medium">Context root customization:</span> In Tomcat,
                you can rename the WAR file (e.g., <code>ROOT.war</code>) to deploy at the
                root context (<code>/</code>), or use a <code>META-INF/context.xml</code> to
                set the path.
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
                <span className="font-medium">Missing <code>WEB-INF/classes</code>:</span>{" "}
                Placing compiled classes at the root instead of under WEB-INF; they won't be
                found by the classloader.
              </li>
              <li>
                <span className="font-medium">Not including dependencies:</span> Forgetting
                to package required JARs in <code>WEB-INF/lib</code> leads to
                <code>ClassNotFoundException</code> at runtime.
              </li>
              <li>
                <span className="font-medium">Incorrect <code>web.xml</code> version:</span>{" "}
                Using a DOCTYPE or schema that doesn't match the servlet container version
                can cause deployment failures.
              </li>
              <li>
                <span className="font-medium">Overwriting the WAR while server is running:</span>{" "}
                This can corrupt deployment. Either stop the server or use hot‑deployment
                features.
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
                <span className="font-medium">Always use a build tool:</span> Let Maven or
                Gradle construct the WAR correctly; don't manually assemble it.
              </li>
              <li>
                <span className="font-medium">Version your WARs:</span> Include version in
                the filename (e.g., <code>myapp-1.0.0.war</code>) to track deployments.
              </li>
              <li>
                <span className="font-medium">Externalize configuration:</span> Use
                <code>context.xml</code> or JNDI for environment‑specific settings (database
                URLs, credentials) rather than hardcoding them.
              </li>
              <li>
                <span className="font-medium">Test on target server early:</span> Deploy
                regularly to catch environment mismatches.
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
              <li>☐ WAR structure: WEB-INF/classes, WEB-INF/lib, web.xml, static resources.</li>
              <li>☐ web.xml is optional but useful for welcome files, error pages, security.</li>
              <li>☐ Build with Maven/Gradle → get a .war file.</li>
              <li>☐ Deploy by copying to Tomcat's webapps/ or using Manager.</li>
              <li>☐ Context root = WAR filename (unless configured otherwise).</li>
              <li>☐ Inspect WAR with <code>jar tf</code> to verify contents.</li>
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
              <span className="font-medium">Observe carefully:</span> Why are
              <code>WEB-INF/lib</code> and <code>WEB-INF/classes</code> not accessible via
              a web browser? (Hint: security.)
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> If you had two
              versions of the same JAR in <code>WEB-INF/lib</code>, which one would the
              classloader use? What problems could this cause?
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
                  “I've lost count of the times a student, like Debangshu from Ichapur,
                  came to me saying 'my servlet works in Eclipse but not on the server'.
                  The answer was almost always a missing JAR in <code>WEB-INF/lib</code>.
                  Learn to inspect your WAR. It's the final deliverable – what's inside
                  is what runs. Make it right.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> The WAR is your
                  application's ship – pack it carefully.
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