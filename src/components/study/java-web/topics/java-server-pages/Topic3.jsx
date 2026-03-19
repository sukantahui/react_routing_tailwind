import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw JSP examples
import pageDirectiveExample from "./topic3_files/page_directive_example.jsp?raw";
import includeDirectiveExample from "./topic3_files/include_directive_example.jsp?raw";
import includedFile from "./topic3_files/included_file.jsp?raw";
import taglibDirectiveExample from "./topic3_files/taglib_directive_example.jsp?raw";

// ----------------------------------------------------------------------
// Inline keyframes for animations (no config needed)
const animationKeyframes = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
// ----------------------------------------------------------------------

const Topic3 = () => {
  // Calculate Sukanta Hui's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998; // Started in 1998

  // Staggered animation delays (in ms)
  const delays = [100, 200, 300, 400, 500, 600];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 md:p-8 font-sans leading-relaxed">
      {/* Inject keyframes globally for this component */}
      <style>{animationKeyframes}</style>

      {/* Header Section */}
      <header
        className="max-w-4xl mx-auto mb-12 text-center animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationFillMode: "both" }}
      >
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">
          JSP Directives
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Instructions to the JSP container that control page processing and inclusion.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[0]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">
          What are JSP Directives?
        </h2>
        <p className="mb-3">
          JSP directives are special instructions enclosed in <code>&lt;%@ ... %&gt;</code> tags. 
          They provide global information about the JSP page to the container, such as page 
          properties, included files, or custom tag libraries. Directives do not produce any 
          output; they tell the container how to translate the JSP into a servlet.
        </p>
        <p className="mb-2">
          <strong className="text-indigo-600 dark:text-indigo-400">
            Real‑world analogy:
          </strong>{" "}
          Think of a directive like the settings on a printer before printing a document. 
          You specify paper size (page directive), a header to include on every page (include 
          directive), or a special font pack (taglib directive). The printer uses these 
          settings to produce the final output.
        </p>
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic">
            <span className="font-semibold">💡 Teacher's Note (Sukanta Hui):</span>{" "}
            "Directives are processed at translation time, not at request time. So if you 
            change an included file, the change might not reflect until you recompile the 
            main JSP. I remind my students from Shyamnagar: directives are like the 
            foundation of a house – laid once, but everything else depends on them."
          </p>
        </div>
      </section>

      {/* SVG Illustration – Three Directives */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[1]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          The Three Types of Directives
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <svg
            viewBox="0 0 700 220"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Page Directive */}
            <g transform="translate(70,60)" className="directive-group">
              <rect
                x="0"
                y="0"
                width="160"
                height="110"
                rx="10"
                fill="#fef9c3"
                stroke="#ca8a04"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-yellow-100 dark:hover:fill-yellow-900/50"
              />
              <text x="80" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#854d0e">
                &lt;%@ page ... %&gt;
              </text>
              <text x="80" y="45" textAnchor="middle" fontSize="12" fill="#854d0e">
                Page Directive
              </text>
              <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#6b7280">
                Sets page properties:
              </text>
              <text x="80" y="90" textAnchor="middle" fontSize="9" fill="#6b7280">
                import, contentType, session, etc.
              </text>
            </g>

            {/* Include Directive */}
            <g transform="translate(270,60)" className="directive-group">
              <rect
                x="0"
                y="0"
                width="160"
                height="110"
                rx="10"
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-green-100 dark:hover:fill-green-900/50"
              />
              <text x="80" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
                &lt;%@ include ... %&gt;
              </text>
              <text x="80" y="45" textAnchor="middle" fontSize="12" fill="#166534">
                Include Directive
              </text>
              <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#6b7280">
                Includes file at
              </text>
              <text x="80" y="90" textAnchor="middle" fontSize="9" fill="#6b7280">
                translation time (static)
              </text>
            </g>

            {/* Taglib Directive */}
            <g transform="translate(470,60)" className="directive-group">
              <rect
                x="0"
                y="0"
                width="160"
                height="110"
                rx="10"
                fill="#fae8ff"
                stroke="#a21caf"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-fuchsia-100 dark:hover:fill-fuchsia-900/50"
              />
              <text x="80" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#86198f">
                &lt;%@ taglib ... %&gt;
              </text>
              <text x="80" y="45" textAnchor="middle" fontSize="12" fill="#86198f">
                Taglib Directive
              </text>
              <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#6b7280">
                Declares custom tag
              </text>
              <text x="80" y="90" textAnchor="middle" fontSize="9" fill="#6b7280">
                libraries (e.g., JSTL)
              </text>
            </g>

            {/* Bottom description */}
            <text x="350" y="180" textAnchor="middle" fontSize="11" fill="#6b7280">
              Directives are processed during JSP translation into servlet.
            </text>
          </svg>
        </div>
      </section>

      {/* Detailed Cards for Each Directive */}
      <section
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-3 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[2]}ms`, animationFillMode: "both" }}
      >
        {/* Page Directive Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-yellow-200 dark:border-yellow-900 hover:shadow-lg transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-700">
          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-2 flex items-center">
            <span className="mr-2">📄</span> Page Directive
          </h3>
          <p className="text-sm mb-2">
            <strong>Syntax:</strong> <code>&lt;%@ page attribute="value" %&gt;</code>
          </p>
          <p className="text-sm mb-2">
            <strong>Purpose:</strong> Defines page-dependent properties, such as scripting
            language, imports, error pages, buffering, and content type.
          </p>
          <p className="text-sm mb-2 font-medium">Common attributes:</p>
          <ul className="text-xs list-disc list-inside mb-2 space-y-1">
            <li><code>import="java.util.*"</code> – imports classes</li>
            <li><code>contentType="text/html; charset=UTF-8"</code></li>
            <li><code>session="true|false"</code> – enables/disables session</li>
            <li><code>isErrorPage="true|false"</code> – marks as error page</li>
            <li><code>errorPage="error.jsp"</code> – specifies error page</li>
            <li><code>buffer="8kb"</code> – sets buffer size</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            ⚠️ Page directives can appear multiple times, but attributes (except import) 
            can only be used once.
          </p>
        </div>

        {/* Include Directive Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-green-200 dark:border-green-900 hover:shadow-lg transition-all duration-300 hover:border-green-400 dark:hover:border-green-700">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
            <span className="mr-2">🔗</span> Include Directive
          </h3>
          <p className="text-sm mb-2">
            <strong>Syntax:</strong> <code>&lt;%@ include file="relativeURL" %&gt;</code>
          </p>
          <p className="text-sm mb-2">
            <strong>Purpose:</strong> Includes the content of another file at translation time.
            The included file is treated as if its content were part of the main JSP.
          </p>
          <p className="text-sm mb-2">
            <strong>Characteristics:</strong>
          </p>
          <ul className="text-xs list-disc list-inside mb-2 space-y-1">
            <li>Static inclusion (content is copied once)</li>
            <li>Included file can be HTML, JSP, or text</li>
            <li>Changes to included file require re‑translation of the main JSP</li>
            <li>Variables defined in the included file are accessible in the main page</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            ⚠️ Do not confuse with <code>&lt;jsp:include&gt;</code> (dynamic inclusion).
          </p>
        </div>

        {/* Taglib Directive Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-fuchsia-200 dark:border-fuchsia-900 hover:shadow-lg transition-all duration-300 hover:border-fuchsia-400 dark:hover:border-fuchsia-700">
          <h3 className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-400 mb-2 flex items-center">
            <span className="mr-2">🏷️</span> Taglib Directive
          </h3>
          <p className="text-sm mb-2">
            <strong>Syntax:</strong> <code>&lt;%@ taglib uri="URI" prefix="prefix" %&gt;</code>
          </p>
          <p className="text-sm mb-2">
            <strong>Purpose:</strong> Declares a custom tag library, defining a set of tags
            that can be used in the JSP. The <code>uri</code> references the tag library
            descriptor (TLD), and <code>prefix</code> distinguishes tags from that library.
          </p>
          <p className="text-sm mb-2">
            <strong>Example:</strong>
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
{`<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
...
<c:out value="\${user.name}"/>`}
          </pre>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            ⚠️ The prefix must be unique and should not use reserved prefixes like <code>jsp</code>, <code>jspx</code>, <code>java</code>, <code>javax</code>, <code>servlet</code>, <code>sun</code>, <code>sunw</code>.
          </p>
        </div>
      </section>

      {/* Code Examples Section */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[3]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          Practical Examples
        </h2>

        {/* Page Directive Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={pageDirectiveExample}
            title="page_directive_example.jsp – Using page directive"
            highlightLines={[1,2,3]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This page directive imports multiple packages, sets content type, and defines an error page.
          </p>
        </div>

        {/* Include Directive Example (main) */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={includeDirectiveExample}
            title="include_directive_example.jsp – Using include directive"
            highlightLines={[1]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            The main page includes a header and footer using the include directive. Notice the static inclusion.
          </p>
        </div>

        {/* Included file (header/footer) */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={includedFile}
            title="included_file.jsp – File included via directive"
            highlightLines={[]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This file is included in the main page. It contains common HTML elements.
          </p>
        </div>

        {/* Taglib Directive Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={taglibDirectiveExample}
            title="taglib_directive_example.jsp – Using taglib directive"
            highlightLines={[1]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This example declares the JSTL core taglib and uses a simple tag (even though JSTL is covered later, the directive syntax is shown).
          </p>
        </div>

        {/* Hint Section */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            🔍 Observe carefully:
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            The <code>include</code> directive merges the included file at <strong>translation time</strong>. 
            If you change the included file, you must recompile the main JSP (or touch it) to see changes.
            This is different from <code>&lt;jsp:include&gt;</code>, which includes dynamically at request time.
          </p>
        </div>
      </section>

      {/* Common Pitfalls & Best Practices */}
      <div
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-2 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[4]}ms`, animationFillMode: "both" }}
      >
        {/* Pitfalls */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
            <span className="mr-2">⚠️</span> Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Duplicate page directive attributes:</strong> Attributes like 
              <code>contentType</code> can appear only once; repeating causes a translation error.
            </li>
            <li>
              <strong>Misunderstanding static vs. dynamic include:</strong> Using 
              <code>&lt;%@ include ... %&gt;</code> when you need runtime inclusion 
              (<code>&lt;jsp:include&gt;</code>) leads to stale content.
            </li>
            <li>
              <strong>Forgetting to import classes:</strong> In scriptlets, you must either 
              use fully qualified names or include an <code>import</code> attribute.
            </li>
            <li>
              <strong>Using reserved prefixes in taglib:</strong> Prefixes like <code>jsp</code>, 
              <code>servlet</code> are reserved and will cause errors.
            </li>
            <li>
              <strong>Placing directives after template text:</strong> Directives can appear 
              anywhere, but it's conventional (and safe) to place them at the top of the page.
            </li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
            <span className="mr-2">✅</span> Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Place all page directives at the top of the JSP</strong> for readability.
            </li>
            <li>
              <strong>Use separate lines for each import</strong> to improve clarity, or 
              combine with commas: <code>import="java.util.*,java.io.*"</code>.
            </li>
            <li>
              <strong>Choose meaningful prefixes for taglibs</strong> (e.g., <code>c</code> for core, 
              <code>fmt</code> for formatting).
            </li>
            <li>
              <strong>For reusable components, consider using <code>&lt;jsp:include&gt;</code> 
              (dynamic) unless you specifically need compile-time merging.</strong>
            </li>
            <li>
              <strong>Always specify <code>contentType</code> and <code>pageEncoding</code></strong> 
              to avoid character encoding issues.
            </li>
          </ul>
        </section>
      </div>

      {/* Teacher's Note & Mini Checklist */}
      <div
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-2 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[5]}ms`, animationFillMode: "both" }}
      >
        {/* Teacher's Note */}
        <section className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-200 dark:border-indigo-800">
          <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center">
            <span className="mr-2">🧑‍🏫</span> Teacher's Note
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in,
              mobile: 7003756860)
            </p>
            <p>
              <strong>Experience:</strong> {experience} years (since 1998)
            </p>
            <p>
              <strong>Skill areas:</strong> Programming Languages, RDBMS, Operating
              Systems, Web Development
            </p>
            <hr className="border-indigo-300 dark:border-indigo-700 my-3" />
            <p className="italic">
              "When teaching students from Ichapur, I emphasize that the <code>include</code> 
              directive is like photocopying a page into a book – once copied, changes to the 
              original don't affect the book. For dynamic parts, use <code>&lt;jsp:include&gt;</code> 
              – like a page reference that always shows the latest version. Also, remind them 
              that <code>import</code> is the only attribute that can be repeated."
            </p>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">📋</span> Mini Checklist
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can name the three JSP directives.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I know common attributes of the page directive (import, session, errorPage, etc.).
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I understand the difference between static and dynamic inclusion.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can write a taglib directive to use a custom tag library.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I remember that import is the only repeatable page directive attribute.
            </li>
          </ul>
        </section>
      </div>

      {/* Tips & Tricks */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[6] || 700}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-4 flex items-center">
          <span className="mr-2">💎</span> Professional Tips & Tricks
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🔧 Debugging Tip</p>
            <p className="text-sm">
              If a page directive causes an error, check the generated servlet in the work 
              directory. The line numbers often point to the directive that caused the problem.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🚀 Performance Trick</p>
            <p className="text-sm">
              Use <code>&lt;%@ include file="..." %&gt;</code> for static content (e.g., 
              copyright footer) to avoid runtime overhead of <code>&lt;jsp:include&gt;</code>.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🧠 Maintainability</p>
            <p className="text-sm">
              For large projects, create a "common.jsp" that contains all necessary page 
              directives and includes, then include that file in every JSP using 
              <code>&lt;%@ include file="common.jsp" %&gt;</code>.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">📦 Quick Tip</p>
            <p className="text-sm">
              To see all available imports in your container, check the container's 
              <code>WEB-INF/lib</code> and <code>lib</code> folders. You can import any 
              class from those JARs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
        <p>Topic 3: JSP Directives — Controlling JSP translation.</p>
        <p className="mt-1">
          Examples inspired by students from Barrackpore, Shyamnagar, Ichapur, Naihati.
        </p>
      </footer>
    </div>
  );
};

export default Topic3;