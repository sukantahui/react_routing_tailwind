import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Example JSP snippets (would be stored in topic18_files/ folder)
import includeExample from "./topic18_files/include_action.jsp?raw";
import forwardExample from "./topic18_files/forward_action.jsp?raw";
import useBeanExample from "./topic18_files/usebean_action.jsp?raw";
import pluginExample from "./topic18_files/plugin_action.jsp?raw";
import elementExample from "./topic18_files/element_action.jsp?raw";

// Inline keyframes for reveal animation (fade + slide-up)
const keyframes = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic18 = () => {
  return (
    <>
      <style>{keyframes}</style>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
        {/* Header Section */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8 space-y-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
            JSP Action Elements
          </h1>
          <p className="text-lg">
            JSP action elements are XML‑style tags that execute during the
            <strong> request processing phase</strong>. They provide standard
            behaviours like including pages dynamically, forwarding requests,
            working with JavaBeans, and generating HTML elements dynamically.
            Unlike directives (which are processed at translation time),
            actions are evaluated at runtime.
          </p>
        </div>

        {/* Why Action Elements? (with SVG illustration) */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Why Use Action Elements?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Directive tags (<code>&lt;%@ include %&gt;</code>) are static:
                they copy content at translation time. Action tags
                (<code>&lt;jsp:include&gt;</code>) are dynamic: the decision
                which resource to include is made at runtime. Actions enable:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Dynamic page composition (conditional includes).</li>
                <li>Request forwarding with parameter passing.</li>
                <li>Clean JavaBean integration without scriptlets.</li>
                <li>Dynamic generation of HTML element names.</li>
              </ul>
            </div>
            {/* SVG: Directive vs Action comparison */}
            <div className="flex justify-center p-4">
              <svg
                width="300"
                height="180"
                viewBox="0 0 300 180"
                className="stroke-current text-indigo-500 dark:text-indigo-400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="10"
                  y="20"
                  width="120"
                  height="60"
                  rx="8"
                  className="fill-gray-200 dark:fill-gray-800 stroke-2"
                />
                <text x="20" y="50" className="text-xs fill-gray-700 dark:fill-gray-300">
                  Directive
                </text>
                <text x="20" y="70" className="text-xs fill-gray-500 dark:fill-gray-400">
                  Static include
                </text>
                <line
                  x1="70"
                  y1="80"
                  x2="140"
                  y2="110"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="150" cy="110" r="6" className="fill-indigo-500" />
                <text x="160" y="115" className="text-xs fill-gray-700 dark:fill-gray-300">
                  Runtime
                </text>
                <rect
                  x="170"
                  y="90"
                  width="120"
                  height="60"
                  rx="8"
                  className="fill-green-100 dark:fill-green-900/30 stroke-2 stroke-green-600 dark:stroke-green-500"
                />
                <text x="180" y="120" className="text-xs fill-gray-700 dark:fill-gray-300">
                  &lt;jsp:include&gt;
                </text>
                <text x="180" y="140" className="text-xs fill-gray-500 dark:fill-gray-400">
                  Dynamic action
                </text>
                {/* Animated arrow */}
                <line
                  x1="160"
                  y1="145"
                  x2="190"
                  y2="145"
                  stroke="green"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                >
                  <animate
                    attributeName="x2"
                    values="160;190;160"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="4"
                    refX="3"
                    refY="2"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 2, 0 4" fill="green" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* Overview: List of JSP Actions */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[200ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Standard JSP Action Elements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:include&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:forward&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:param&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:useBean&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:getProperty&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:setProperty&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:plugin&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:element&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:attribute&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:body&gt;
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center font-mono text-sm">
              &lt;jsp:fallback&gt;
            </div>
          </div>
        </section>

        {/* Detailed Explanation of Each Action */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[300ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📖 Detailed Breakdown</h2>

          {/* 1. jsp:include */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 mb-6">
            <h3 className="text-xl font-medium mb-2">
              &lt;jsp:include&gt; – Dynamic Inclusion
            </h3>
            <p className="mb-2">
              <strong>Prototype:</strong>{" "}
              <code>
                &lt;jsp:include page="relativeURL" flush="true"&gt; &lt;jsp:param
                name="..." value="..." /&gt; &lt;/jsp:include&gt;
              </code>
            </p>
            <p className="mb-2">
              <strong>Return type:</strong> void (output is written to the
              response)
            </p>
            <p className="mb-4">
              <strong>Purpose:</strong> Includes the output of another resource
              (servlet, JSP) at runtime. The included resource is processed
              separately. Use <code>flush="true"</code> to flush the buffer
              before inclusion.
            </p>
            <p className="mb-4">
              <strong>When & Why:</strong> Perfect for reusable components like
              headers, footers, or sidebars that may change based on logic. For
              example, show a different promotion banner depending on the time
              of day.
            </p>
            <JavaFileLoader
              fileModule={includeExample}
              title="include_action.jsp"
              highlightLines={[5, 8]}
            />
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              💡 Pro tip: Unlike <code>&lt;%@ include %&gt;</code>, changes to
              the included file are reflected without recompiling the main JSP.
            </div>
          </div>

          {/* 2. jsp:forward */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 mb-6">
            <h3 className="text-xl font-medium mb-2">
              &lt;jsp:forward&gt; &amp; &lt;jsp:param&gt; – Request Forwarding
            </h3>
            <p className="mb-2">
              <strong>Prototype:</strong>{" "}
              <code>
                &lt;jsp:forward page="relativeURL" /&gt;
              </code>
            </p>
            <p className="mb-2">
              <strong>Return type:</strong> void (does not return to calling
              page)
            </p>
            <p className="mb-4">
              <strong>Purpose:</strong> Transfers processing and control to
              another resource on the server (internal forward, not a client
              redirect). The browser URL does not change. <code>&lt;jsp:param&gt;</code> adds
              request parameters.
            </p>
            <p className="mb-4">
              <strong>When & Why:</strong> Implement MVC pattern: a controller
              JSP validates input then forwards to a view JSP. Also used for
              error handling or access control.
            </p>
            <JavaFileLoader
              fileModule={forwardExample}
              title="forward_action.jsp"
              highlightLines={[7, 10]}
            />
          </div>

          {/* 3. JavaBean Actions */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 mb-6">
            <h3 className="text-xl font-medium mb-2">
              &lt;jsp:useBean&gt;, &lt;jsp:getProperty&gt;, &lt;jsp:setProperty&gt;
            </h3>
            <p className="mb-2">
              <strong>Prototypes:</strong>
            </p>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded-lg text-sm mb-2 overflow-x-auto">
              {`<jsp:useBean id="beanName" class="package.Class" scope="page|request|session|application" />
<jsp:getProperty name="beanName" property="propertyName" />
<jsp:setProperty name="beanName" property="propertyName" value="newValue" />`}
            </pre>
            <p className="mb-4">
              <strong>Purpose:</strong> <code>useBean</code> instantiates or
              locates an existing JavaBean in the given scope.{" "}
              <code>getProperty</code> prints the bean’s property value (calls
              getter). <code>setProperty</code> sets a property (calls setter).
            </p>
            <p className="mb-4">
              <strong>When & Why:</strong> To separate data handling from
              presentation. For example, a student registration form populates a{" "}
              <code>StudentBean</code> and displays the data on a confirmation
              page.
            </p>
            <JavaFileLoader
              fileModule={useBeanExample}
              title="usebean_action.jsp"
              highlightLines={[6, 9, 12]}
            />
          </div>

          {/* 4. jsp:plugin */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 mb-6">
            <h3 className="text-xl font-medium mb-2">
              &lt;jsp:plugin&gt; – Embedding Applets / Components
            </h3>
            <p className="mb-2">
              <strong>Prototype:</strong>{" "}
              <code>&lt;jsp:plugin type="applet" code="MyApplet.class" ...&gt; ... &lt;/jsp:plugin&gt;</code>
            </p>
            <p className="mb-4">
              <strong>Purpose:</strong> Generates browser‑specific HTML
              (<code>&lt;object&gt;</code> or <code>&lt;embed&gt;</code>) to
              include a Java applet or JavaBean component. Also supports
              <code>&lt;jsp:fallback&gt;</code> for browsers without plugin
              support.
            </p>
            <p className="mb-4">
              <strong>When & Why:</strong> Rarely used today (applets are
              deprecated), but historically for interactive content.
            </p>
            <JavaFileLoader
              fileModule={pluginExample}
              title="plugin_action.jsp"
              highlightLines={[]}
            />
          </div>

          {/* 5. Dynamic HTML Actions (jsp:element, jsp:attribute, jsp:body) */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 mb-6">
            <h3 className="text-xl font-medium mb-2">
              &lt;jsp:element&gt;, &lt;jsp:attribute&gt;, &lt;jsp:body&gt; –
              Dynamic HTML Generation
            </h3>
            <p className="mb-2">
              <strong>Prototype:</strong>
            </p>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded-lg text-sm mb-2 overflow-x-auto">
              {`<jsp:element name="\${dynamicTagName}">
  <jsp:attribute name="class">\${dynamicClass}</jsp:attribute>
  <jsp:body>Dynamic content</jsp:body>
</jsp:element>`}
            </pre>
            <p className="mb-4">
              <strong>Purpose:</strong> Create HTML (or XML) elements whose tag
              name, attributes, and body are determined at runtime. Useful when
              the structure depends on user input or configuration.
            </p>
            <p className="mb-4">
              <strong>When & Why:</strong> Building dynamic forms, theming
              engines, or custom dashboards where element names are not known at
              development time.
            </p>
            <JavaFileLoader
              fileModule={elementExample}
              title="element_action.jsp"
              highlightLines={[5, 8]}
            />
          </div>
        </section>

        {/* Real-World Example: School Registration System */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[400ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">
            🏫 Real‑World Example: Student Registration
          </h2>
          <p className="mb-4">
            Students <strong>Swadeep</strong> (from Barrackpore) and{" "}
            <strong>Tuhina</strong> (from Shyamnagar) register for courses. The
            JSP uses:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              <code>&lt;jsp:useBean&gt;</code> to hold student data.
            </li>
            <li>
              <code>&lt;jsp:setProperty&gt;</code> to populate from form
              parameters.
            </li>
            <li>
              <code>&lt;jsp:forward&gt;</code> to send to a confirmation page.
            </li>
            <li>
              <code>&lt;jsp:include&gt;</code> to show a campus‑specific
              footer (Ichapur campus vs Naihati campus).
            </li>
          </ul>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="font-medium">📌 Typical flow:</p>
            <p className="text-sm">
              registration.jsp → (useBean + setProperty) → forward to
              confirm.jsp → includes footer.jsp (dynamic based on campus)
            </p>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[500ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">💡 Tips & Tricks</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong><code>&lt;jsp:include&gt;</code> vs <code>&lt;%@ include %&gt;</code>:</strong> Use
                static include for truly fixed content (e.g., copyright
                notice). Use dynamic include for content that may change based
                on runtime conditions.
              </li>
              <li>
                <strong>Parameter passing with <code>&lt;jsp:param&gt;</code>:</strong> Works with both{" "}
                <code>include</code> and <code>forward</code>. The target page
                retrieves parameters via <code>request.getParameter()</code>.
              </li>
              <li>
                <strong>Bean property naming:</strong> For a property{" "}
                <code>firstName</code>, the bean must have{" "}
                <code>getFirstName()</code> and <code>setFirstName()</code>.
                Case sensitivity matters.
              </li>
              <li>
                <strong><code>&lt;jsp:setProperty&gt;</code> wildcard:</strong>{" "}
                <code>property="*"</code> automatically matches request
                parameters to bean properties of the same name – huge time
                saver.
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[600ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">⚠️ Common Pitfalls</h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Confusing <code>jsp:include</code> with <code>jsp:forward</code>:</strong>{" "}
                <code>include</code> returns to the original page after
                inclusion; <code>forward</code> does not.
              </li>
              <li>
                <strong>Forgetting the bean class in <code>useBean</code>:</strong> Missing{" "}
                <code>class</code> attribute causes
                <code>InstantiationException</code>.
              </li>
              <li>
                <strong>Using <code>jsp:getProperty</code> on a property without a getter:</strong> The
                container throws a <code>NoSuchMethodException</code>.
              </li>
              <li>
                <strong>Relative paths in <code>page</code> attribute:</strong> They are relative to
                the current JSP, not the web app root. Use
                <code>{"${pageContext.request.contextPath}"}</code> if needed.
              </li>
              <li>
                <strong>Overuse of <code>jsp:element</code>:</strong> For simple dynamic text, EL is
                cleaner. Only use <code>jsp:element</code> when the tag name
                itself is dynamic.
              </li>
            </ul>
          </div>
        </section>

        {/* Best Practices */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[700ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">✅ Best Practices</h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Use <code>&lt;jsp:include&gt;</code> for reusable UI components
                (headers, footers, menus) to avoid code duplication.
              </li>
              <li>
                Combine <code>&lt;jsp:useBean&gt;</code> with{" "}
                <code>property="*"</code> to automatically bind form data.
              </li>
              <li>
                Keep JavaBeans in dedicated packages (e.g.,{" "}
                <code>com.school.model</code>) and follow standard naming
                conventions.
              </li>
              <li>
                Prefer <code>&lt;jsp:forward&gt;</code> over
                <code>response.sendRedirect()</code> when you want to preserve
                the original request scope.
              </li>
              <li>
                Use <code>flush="true"</code> only when necessary; flushing too
                early can cause “response already committed” errors.
              </li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[800ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📋 Mini Checklist</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> I
                understand that JSP actions are executed at <strong>runtime</strong>.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> I
                can differentiate between <code>jsp:include</code> (dynamic) and
                the directive <code>@ include</code> (static).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> I
                know how to forward a request using{" "}
                <code>&lt;jsp:forward&gt;</code> and pass parameters with{" "}
                <code>&lt;jsp:param&gt;</code>.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> I
                can use <code>&lt;jsp:useBean&gt;</code> and the property
                actions to handle form data cleanly.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> I
                am aware of <code>&lt;jsp:element&gt;</code> for dynamic HTML
                but will use it sparingly.
              </li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[900ms]"
          )}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded hover:shadow-lg transition-all duration-300">
            <p className="font-medium">💭 Think about…</p>
            <p className="mt-2">
              Suppose you have a <code>menu.jsp</code> that should show
              different items based on whether the user is logged in as a
              student (<strong>Abhronila</strong>) or as a teacher. Could you
              use <code>&lt;jsp:include&gt;</code> to achieve this? How would
              you pass the user role? What action would you use inside the
              included page to display the correct menu?
            </p>
          </div>
        </section>

        {/* Teacher's Note */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1000ms]"
          )}
        >
          <Teacher
            note={`JSP Action Elements are the bridge between static markup and dynamic behavior. 
Remind students that <jsp:useBean> combined with property="*" eliminates almost all scriptlets for form handling.
A good exercise: Create a simple "Library Management" system where a JSP uses <jsp:forward> to send a book search request to a servlet, which then forwards to a results JSP — all using action tags.
Highlight that <jsp:element> is seldom needed in modern JSP, but it demonstrates the power of runtime generation.`}
          />
        </section>

        {/* Hint Section (duplicate for consistent closing) */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 pb-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1100ms]"
          )}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded hover:shadow-lg transition-all duration-300">
            <p className="font-medium">💡 Try changing this…</p>
            <p className="mt-2">
              Replace a <code>&lt;%@ include file="footer.jsp" %&gt;</code> with{" "}
              <code>&lt;jsp:include page="footer.jsp" /&gt;</code>. Observe that
              modifications to <code>footer.jsp</code> now appear without
              restarting the server. That’s the power of dynamic inclusion!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic18;