import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import JSP examples as raw text
import setExample from "./topic6_files/core_set_example.jsp?raw";
import ifExample from "./topic6_files/core_if_example.jsp?raw";
import chooseExample from "./topic6_files/core_choose_example.jsp?raw";
import forEachExample from "./topic6_files/core_foreach_example.jsp?raw";
import urlExample from "./topic6_files/core_url_example.jsp?raw";

// Inline keyframes for reveal animation (fade + slide-up)
const keyframes = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic6 = () => {
  // Calculate Sukanta Hui's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

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
            JSTL Core Tags
          </h1>
          <p className="text-lg">
            JSTL (JavaServer Pages Standard Tag Library) provides a set of
            custom tags that encapsulate core functionality common to many JSP
            applications. The <strong>Core tags</strong> (prefix{" "}
            <code>c</code>) handle variable management, flow control, and URL
            manipulation — replacing scriptlets with clean, maintainable markup.
          </p>
        </div>

        {/* Why JSTL Core? (with SVG illustration) */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Why JSTL Core?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Before JSTL, JSP pages were often cluttered with Java code
                snippets (scriptlets). This made pages hard to read, maintain,
                and debug. JSTL Core tags bring declarative programming to JSP:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Clean separation of concerns (MVC).</li>
                <li>Reusable and readable tags.</li>
                <li>Automatic handling of null values and escaping.</li>
                <li>Integration with Expression Language (EL).</li>
              </ul>
            </div>
            {/* SVG Illustration: scriptlet vs JSTL */}
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
                  Scriptlets
                </text>
                <text x="20" y="70" className="text-xs fill-gray-500 dark:fill-gray-400">
                  &lt;% if(...) %&gt;
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
                  Refactor
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
                  &lt;c:if&gt;
                </text>
                <text x="180" y="140" className="text-xs fill-gray-500 dark:fill-gray-400">
                  JSTL Core
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Setup: Taglib Directive */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[200ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Setting Up JSTL Core
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
            <p className="mb-4">
              To use JSTL core tags, you need to include the JSTL library in
              your project (e.g., <code>jakarta.servlet.jsp.jstl-3.0.0.jar</code>{" "}
              for Jakarta EE) and declare the taglib at the top of your JSP:
            </p>
            <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">
                {`<%@ taglib uri="jakarta.tags.core" prefix="c" %>`}
              </code>
            </pre>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Hint:</strong> For legacy JSP 2.x, use{" "}
              <code>uri="http://java.sun.com/jsp/jstl/core"</code>.
            </p>
          </div>
        </section>

        {/* Core Tags Categories */}
        {/* 1. Variable Support */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[300ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🔧 Variable Tags</h2>
          <div className="grid gap-6">
            {/* c:set */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">
                &lt;c:set&gt; – Set a variable
              </h3>
              <p className="mb-2">
                <strong>Prototype:</strong>{" "}
                <code>
                  &lt;c:set var="name" value="value" [scope="page|request|session|application"] /&gt;
                </code>
              </p>
              <p className="mb-4">
                <strong>Purpose:</strong> Creates or replaces a scoped variable.
                Can also set bean properties using <code>target</code> and{" "}
                <code>property</code>.
              </p>
              <JavaFileLoader
                fileModule={setExample}
                title="core_set_example.jsp"
                highlightLines={[]}
              />
            </div>

            {/* c:out */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">
                &lt;c:out&gt; – Output with escaping
              </h3>
              <p className="mb-2">
                <strong>Prototype:</strong>{" "}
                <code>
                  &lt;c:out value="expression" [escapeXml="true|false"] [default="defaultValue"] /&gt;
                </code>
              </p>
              <p className="mb-4">
                <strong>Purpose:</strong> Safely displays a value, escaping XML
                characters by default to prevent XSS. If the value is{" "}
                <code>null</code>, the default (or empty string) is shown.
              </p>
              {/* Example can be combined with c:set, but we'll show a simple usage */}
              <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg text-sm">
                {`<c:out value="\${student.name}" default="Unknown" />`}
              </pre>
            </div>
          </div>
        </section>

        {/* 2. Conditional Tags */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[400ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">⚖️ Conditional Tags</h2>
          <div className="grid gap-6">
            {/* c:if */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">&lt;c:if&gt;</h3>
              <p className="mb-2">
                <strong>Prototype:</strong>{" "}
                <code>
                  &lt;c:if test="\${`{condition}`}" var="result" [scope="..."]&gt; body &lt;/c:if&gt;
                </code>
              </p>
              <p className="mb-4">
                <strong>Purpose:</strong> Evaluates a test expression and
                includes its body only if the condition is true. The{" "}
                <code>var</code> and <code>scope</code> store the result as a
                Boolean for later use.
              </p>
              <JavaFileLoader
                fileModule={ifExample}
                title="core_if_example.jsp"
                highlightLines={[]}
              />
            </div>

            {/* c:choose / c:when / c:otherwise */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">
                &lt;c:choose&gt; (switch-case)
              </h3>
              <p className="mb-2">
                <strong>Prototype:</strong>
              </p>
              <pre className="bg-white dark:bg-gray-900 p-2 rounded text-sm">
                {`<c:choose>
  <c:when test="\${condition1}">...</c:when>
  <c:when test="\${condition2}">...</c:when>
  <c:otherwise>...</c:otherwise>
</c:choose>`}
              </pre>
              <p className="mt-2 mb-4">
                <strong>Purpose:</strong> Multi-way conditional. Only the first
                <code>when</code> with a true test is executed; if none,
                <code>otherwise</code> runs.
              </p>
              <JavaFileLoader
                fileModule={chooseExample}
                title="core_choose_example.jsp"
                highlightLines={[]}
              />
            </div>
          </div>
        </section>

        {/* 3. Iteration Tags */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[500ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🔄 Iteration Tags</h2>
          <div className="grid gap-6">
            {/* c:forEach */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">&lt;c:forEach&gt;</h3>
              <p className="mb-2">
                <strong>Prototype:</strong>{" "}
                <code>
                  &lt;c:forEach items="\${`{collection}`}" var="item" varStatus="status" begin="..." end="..." step="..."&gt; body &lt;/c:forEach&gt;
                </code>
              </p>
              <p className="mb-4">
                <strong>Purpose:</strong> Iterates over arrays, collections,
                maps, comma‑separated strings, or a range of numbers. The{" "}
                <code>varStatus</code> gives loop metadata (index, count,
                first, last).
              </p>
              <JavaFileLoader
                fileModule={forEachExample}
                title="core_foreach_example.jsp"
                highlightLines={[]}
              />
            </div>

            {/* c:forTokens */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">&lt;c:forTokens&gt;</h3>
              <p className="mb-2">
                <strong>Prototype:</strong>{" "}
                <code>
                  &lt;c:forTokens items="string" delims="delimiters" var="token" ... /&gt;
                </code>
              </p>
              <p className="mb-4">
                <strong>Purpose:</strong> Splits a string into tokens using the
                specified delimiters and iterates over them.
              </p>
              <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg text-sm">
                {`<c:forTokens items="apple,banana,orange" delims="," var="fruit">
  \${fruit}<br/>
</c:forTokens>`}
              </pre>
            </div>
          </div>
        </section>

        {/* 4. URL Management */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[600ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🌐 URL Tags</h2>
          <div className="grid gap-6">
            {/* c:url and c:param */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">
                &lt;c:url&gt; and &lt;c:param&gt;
              </h3>
              <p className="mb-2">
                <strong>Prototype:</strong>
              </p>
              <pre className="bg-white dark:bg-gray-900 p-2 rounded text-sm">
                {`<c:url value="/path" var="url" [context="..."] [scope="..."]>
  <c:param name="key" value="value" />
</c:url>`}
              </pre>
              <p className="mt-2 mb-4">
                <strong>Purpose:</strong> Builds a URL with proper rewriting
                (session tracking) and URL encoding. Parameters are automatically
                encoded.
              </p>
              <JavaFileLoader
                fileModule={urlExample}
                title="core_url_example.jsp"
                highlightLines={[]}
              />
            </div>

            {/* c:redirect */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">&lt;c:redirect&gt;</h3>
              <p className="mb-2">
                <strong>Prototype:</strong>{" "}
                <code>
                  &lt;c:redirect url="/newPage" [context="..."]&gt;
                  &lt;c:param ... /&gt; &lt;/c:redirect&gt;
                </code>
              </p>
              <p className="mb-4">
                <strong>Purpose:</strong> Sends an HTTP redirect to the client.
                Can include parameters.
              </p>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[700ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">💡 Tips & Tricks</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Combine with EL:</strong> Always use EL expressions
                (<code>{"${expression}"}</code>) inside tag attributes to
                keep code clean.
              </li>
              <li>
                <strong>Use <code>varStatus</code> wisely:</strong> It provides
                <code>index</code>, <code>count</code>, <code>first</code>,{" "}
                <code>last</code> — perfect for styling alternating rows.
              </li>
              <li>
                <strong>Empty collections:</strong> <code>&lt;c:forEach&gt;</code>{" "}
                simply outputs nothing if the collection is null or empty – no
                error.
              </li>
              <li>
                <strong>Default value in <code>&lt;c:out&gt;</code>:</strong>{" "}
                Prevents displaying "null" and improves user experience.
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[800ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">⚠️ Common Pitfalls</h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Missing taglib declaration:</strong> JSP will treat
                <code>&lt;c:if&gt;</code> as plain text. Always add{" "}
                <code>&lt;%@ taglib ... %&gt;</code>.
              </li>
              <li>
                <strong>Wrong URI:</strong> Using the old JSTL 1.x URI with
                Jakarta EE 9+ causes errors. Use{" "}
                <code>jakarta.tags.core</code> for modern servers.
              </li>
              <li>
                <strong>Forgetting to escape user input:</strong> Rely on
                <code>&lt;c:out&gt;</code> or set <code>escapeXml="true"</code>.
              </li>
              <li>
                <strong>Using scriptlets alongside JSTL:</strong> Mixing styles
                makes code unmaintainable. Stick to one approach.
              </li>
            </ul>
          </div>
        </section>

        {/* Best Practices */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[900ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">✅ Best Practices</h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Keep JSPs focused on presentation – push business logic to
                servlets or backing beans.
              </li>
              <li>
                Use <code>&lt;c:set&gt;</code> sparingly; prefer placing data in
                scope from a servlet.
              </li>
              <li>
                Always use <code>&lt;c:out&gt;</code> or EL's built-in escaping
                (<code>{"${...}"}</code> escapes by default) when displaying
                dynamic content.
              </li>
              <li>
                Organize JSTL tags with consistent indentation to improve
                readability.
              </li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1000ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📋 Mini Checklist</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span>{" "}
                Taglib declared with correct URI.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span>{" "}
                JSTL JAR present in <code>/WEB-INF/lib</code>.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span>{" "}
                No scriptlets inside JSP (only JSTL/EL).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span>{" "}
                User-generated content escaped.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span>{" "}
                Loop metadata (<code>varStatus</code>) used for row styling.
              </li>
            </ul>
          </div>
        </section>

        {/* Teacher's Note */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1100ms]"
          )}
        >
          <Teacher
            note={`JSTL Core tags are the workhorses of modern JSP. 
Encourage students to think of them as "HTML-friendly control structures". 
Show them how replacing a scriptlet loop with <c:forEach> instantly makes the page more readable. 
A good exercise: take a JSP full of scriptlets and refactor it using only Core tags and EL. 
Remind them that the varStatus attribute is often overlooked but extremely handy for alternating row colours or numbering.`}
          />
        </section>

        {/* Hint Section */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 pb-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1200ms]"
          )}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded hover:shadow-lg transition-all duration-300">
            <p className="font-medium">💭 Think about...</p>
            <p className="mt-2">
              How would you display a numbered list of students from a
              collection using <code>&lt;c:forEach&gt;</code>? What attribute
              gives you the current index?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic6;