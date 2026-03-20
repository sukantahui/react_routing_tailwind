import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import examples
import staticInclude from "./topic8_files/static_include.jsp?raw";
import dynamicInclude from "./topic8_files/dynamic_include.jsp?raw";
import includedFile from "./topic8_files/included_file.jsp?raw";

// Inline keyframes
const keyframes = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic8 = () => {
  // Teacher experience
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <>
      <style>{keyframes}</style>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
        {/* Header */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8 space-y-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
            JSP Include Directive vs Include Action
          </h1>
          <p className="text-lg">
            JSP provides two ways to include content from another file: the <strong>include directive</strong> and the <strong>include action</strong>. They appear similar but behave very differently – one is static (compile‑time), the other dynamic (runtime). Understanding the difference is crucial for building maintainable JSP applications.
          </p>
        </div>

        {/* Comparison Overview */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Feature</th>
                  <th className="px-4 py-2 text-left">Include Directive (<code>&lt;%@ include %&gt;</code>)</th>
                  <th className="px-4 py-2 text-left">Include Action (<code>&lt;jsp:include&gt;</code>)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                <tr>
                  <td className="px-4 py-2 font-medium">When processed</td>
                  <td className="px-4 py-2">At translation time (compile time)</td>
                  <td className="px-4 py-2">At request time (runtime)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">How it works</td>
                  <td className="px-4 py-2">The included file is inserted into the main JSP <strong>before</strong> compilation. A single servlet is generated.</td>
                  <td className="px-4 py-2">The included file is executed separately and its output is merged into the response.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Variables scope</td>
                  <td className="px-4 py-2">Variables defined in the main page are visible in the included file (they share the same translation unit).</td>
                  <td className="px-4 py-2">Each page has its own variable scope. Only request/session attributes are shared.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Dynamic inclusion</td>
                  <td className="px-4 py-2">File name must be known at compile time (cannot be a runtime expression).</td>
                  <td className="px-4 py-2">File name can be a runtime expression (e.g., <code>&lt;jsp:include page="&lt%= dynamicPath %&gt" /&gt;</code>).</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Performance</td>
                  <td className="px-4 py-2">Slightly faster (no extra request processing).</td>
                  <td className="px-4 py-2">Slightly slower (additional processing at runtime).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Include Directive (Static) */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[200ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📄 Include Directive (Static Inclusion)</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <p className="mb-4">
              The include directive (<code>&lt;%@ include file="relativeURL" %&gt;</code>) tells the JSP container to insert the contents of the specified file at the location of the directive <strong>during the translation phase</strong>. The resulting merged JSP page is then compiled into a single servlet.
            </p>
            <p className="mb-4">
              <strong>Key characteristics:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The included file is inserted before the JSP is converted to a servlet.</li>
              <li>Variables, methods, and page directives are shared (can cause conflicts).</li>
              <li>Changes to the included file require the main JSP to be recompiled (often automatic, but worth noting).</li>
              <li>Cannot include a file that itself includes the same file recursively.</li>
            </ul>
          </div>
        </section>

        {/* Include Action (Dynamic) */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[300ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">⚙️ Include Action (Dynamic Inclusion)</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <p className="mb-4">
              The include action (<code>&lt;jsp:include page="relativeURL" /&gt;</code> or <code>&lt;jsp:include page="relativeURL" flush="true"&gt;</code>) processes the included resource <strong>at request time</strong>. The container invokes the included resource (which can be a JSP, servlet, or static HTML) and merges its output into the response.
            </p>
            <p className="mb-4">
              <strong>Key characteristics:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Each resource is compiled separately.</li>
              <li>Variables are not shared (only request parameters and attributes).</li>
              <li>The page attribute can be dynamic (e.g., <code>&lt;jsp:include page="&lt%= someExpression %&gt" /&gt;</code>).</li>
              <li>You can pass parameters using <code>&lt;jsp:param&gt;</code>.</li>
              <li>Useful for building modular, reusable components.</li>
            </ul>
          </div>
        </section>

        {/* Examples */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[400ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📝 Examples</h2>
          <div className="grid gap-6">
            {/* Static Include */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">1. Static Include Directive</h3>
              <JavaFileLoader
                fileModule={staticInclude}
                title="static_include.jsp"
                highlightLines={[]}
              />
            </div>

            {/* Dynamic Include */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">2. Dynamic Include Action</h3>
              <JavaFileLoader
                fileModule={dynamicInclude}
                title="dynamic_include.jsp"
                highlightLines={[]}
              />
            </div>

            {/* Shared File */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">3. File to be Included (common_footer.jsp)</h3>
              <JavaFileLoader
                fileModule={includedFile}
                title="included_file.jsp"
                highlightLines={[]}
              />
            </div>
          </div>
        </section>

        {/* When to Use Which */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[500ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🤔 When to Use Which?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2 text-green-700 dark:text-green-400">✅ Use Include Directive when:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>You need to share Java variables or methods between pages.</li>
                <li>The included content is static and rarely changes.</li>
                <li>You want slightly better performance.</li>
                <li>You are building a common header/footer that uses the same variables as the main page.</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2 text-blue-700 dark:text-blue-400">✅ Use Include Action when:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>The included content depends on runtime conditions (e.g., different pages for different users).</li>
                <li>You want to pass parameters to the included page.</li>
                <li>The included file is dynamic and might change frequently.</li>
                <li>You want to avoid variable naming conflicts.</li>
              </ul>
            </div>
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
                <strong>Duplicate page directives:</strong> If the included file contains <code>&lt;%@ page import="..." %&gt;</code>, it's merged into the main page. Duplicate imports cause errors.
              </li>
              <li>
                <strong>Variable name conflicts:</strong> In static include, variables defined in the main page are visible in the included file. Accidentally reusing a name can cause subtle bugs.
              </li>
              <li>
                <strong>Misunderstanding scope:</strong> Developers often expect <code>&lt;jsp:include&gt;</code> to share variables. It does not – use request attributes.
              </li>
              <li>
                <strong>Including the same file multiple times:</strong> With static include, this may cause compilation errors if the file contains duplicate variable definitions.
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
                <strong>Use include directive for truly static fragments</strong> (like headers and footers that don't contain variable declarations).
              </li>
              <li>
                <strong>Prefer include action for modular components</strong> that may be reused across pages (like a user menu, news panel).
              </li>
              <li>
                <strong>Avoid using page directives in included files</strong> when using static include – keep them in the main page.
              </li>
              <li>
                <strong>Use <code>&lt;jsp:param&gt;</code> to pass data to included resources</strong> when using include action.
              </li>
              <li>
                <strong>Consider using JSTL or custom tags instead of includes</strong> when you need more control or better reuse.
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
                <span className="text-green-600 dark:text-green-400">✔</span> Understand the difference between translation‑time and request‑time inclusion.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> For static includes, ensure no duplicate page directives or variable names.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> For dynamic includes, use <code>&lt;jsp:param&gt;</code> to pass data if needed.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Test both approaches when performance or maintainability matters.
              </li>
            </ul>
          </div>
        </section>

        {/* Teacher's Note */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[900ms]"
          )}
        >
          <Teacher
            note={`The include directive vs action is a classic interview question. 
I like to ask students: "What happens if you change the included file and refresh the page?" 
With static include, the change might not appear until the main page is recompiled. 
With dynamic include, changes appear immediately. 
Encourage them to experiment by modifying the included file and watching the effect. 
Also, remind them that too many dynamic includes can impact performance – use wisely.`}
          />
        </section>

        {/* Hint Section */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 pb-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1000ms]"
          )}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded hover:shadow-lg transition-all duration-300">
            <p className="font-medium">💭 Think about...</p>
            <p className="mt-2">
              Suppose you have a common footer that displays the current year. 
              If you use a static include, the year would be compiled once; if you use dynamic include, the year is evaluated each request. 
              Which approach would you choose? What if the footer needs to be dynamically generated based on user preferences?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic8;