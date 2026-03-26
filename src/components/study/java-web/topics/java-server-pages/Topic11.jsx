import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import code examples from topic11_files
import fmtFormatNumber from "./topic11_files/fmt_formatNumber.jsp?raw";
import fmtFormatDate from "./topic11_files/fmt_formatDate.jsp?raw";
import fnFunctions from "./topic11_files/fn_functions.jsp?raw";
import combinedExample from "./topic11_files/combined_example.jsp?raw";

const Topic11 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          JSTL Formatting Tags (fmt) and Functions Tags (fn)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Internationalization, number/date formatting, and string manipulation in JSP
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Why fmt and fn?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            JSTL provides two powerful tag libraries: <strong>fmt</strong> (formatting) and <strong>fn</strong> (functions). 
            The fmt library handles internationalization (i18n), number and date formatting, and resource bundles. 
            The fn library offers a set of useful string functions like <code>contains()</code>, <code>startsWith()</code>, <code>join()</code>, and more.
          </p>
          <p className="leading-relaxed">
            Using these tags reduces the need for scriptlets and makes JSP pages cleaner, more maintainable, and locale-aware. 
            They are essential for building applications that serve users in different regions.
          </p>
        </div>
      </section>

      {/* SVG Diagram: Formatting Pipeline */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">How fmt Works (Visual)</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="700" height="180" viewBox="0 0 700 180" className="w-full max-w-3xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              {/* Raw Value */}
              <rect x="20" y="60" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="95" textAnchor="middle" fill="white">Raw Value</text>

              {/* Arrow */}
              <line x1="120" y1="90" x2="160" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* fmt Tag */}
              <rect x="170" y="60" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="220" y="95" textAnchor="middle" fill="white">fmt:formatNumber</text>

              {/* Arrow */}
              <line x1="270" y1="90" x2="310" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Formatted Output */}
              <rect x="320" y="60" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="370" y="95" textAnchor="middle" fill="white">Formatted Output</text>

              {/* Additional locale note */}
              <text x="220" y="140" textAnchor="middle" fill="#9ca3af" fontSize="12">Locale-aware</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            The fmt tags transform raw values into locale-specific representations.
          </p>
        </div>
      </section>

      {/* Formatting Tags */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Formatting Tags (fmt)</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fmt:formatNumber</h3>
            <p className="leading-relaxed">
              Formats numbers as currency, percentages, or custom patterns. Supports grouping separators, decimal places, etc.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fmt:formatDate</h3>
            <p className="leading-relaxed">
              Formats date/time objects according to a locale or a custom pattern.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fmt:setLocale</h3>
            <p className="leading-relaxed">
              Sets the locale for the page or a scope.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fmt:bundle / fmt:message</h3>
            <p className="leading-relaxed">
              Load resource bundles and output localized messages.
            </p>
          </div>
        </div>
      </section>

      {/* Functions Tags */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Functions Tags (fn)</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fn:contains, fn:startsWith, fn:endsWith</h3>
            <p className="leading-relaxed">
              Check if a string contains a substring or starts/ends with a prefix/suffix.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fn:join, fn:split</h3>
            <p className="leading-relaxed">
              Convert arrays/collections to strings and vice versa.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fn:length, fn:toUpperCase, fn:toLowerCase</h3>
            <p className="leading-relaxed">
              Get length, change case.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">fn:replace, fn:substring, fn:substringAfter</h3>
            <p className="leading-relaxed">
              Manipulate strings.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Code Examples</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. Formatting Numbers</h3>
            <JavaFileLoader
              fileModule={fmtFormatNumber}
              title="fmt_formatNumber.jsp"
              highlightLines={[4,5,6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Demonstrates currency, percent, and custom pattern formatting.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. Formatting Dates</h3>
            <JavaFileLoader
              fileModule={fmtFormatDate}
              title="fmt_formatDate.jsp"
              highlightLines={[4,5,6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Shows short/medium/long date styles and custom patterns.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. Using fn Functions</h3>
            <JavaFileLoader
              fileModule={fnFunctions}
              title="fn_functions.jsp"
              highlightLines={[4,5,6,7,8]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Common string operations: contains, startsWith, join, length, etc.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. Combined Example: Resource Bundle + fmt + fn</h3>
            <JavaFileLoader
              fileModule={combinedExample}
              title="combined_example.jsp"
              highlightLines={[4,5,6,7,8]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Uses resource bundles for localization and fn functions to validate input.
            </p>
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Applications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>Internationalization (i18n):</strong> Build multi-language websites by using resource bundles and fmt:message.</li>
            <li><strong>Financial Applications:</strong> Format monetary values with correct currency symbols and decimal places.</li>
            <li><strong>Reporting:</strong> Display dates and numbers in user-friendly formats.</li>
            <li><strong>String Validation:</strong> Use fn functions to check user inputs before processing (e.g., ensure a search term isn't empty).</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: A school portal in Barrackpore might display exam dates in different formats for students and teachers, using fmt:formatDate.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Set locale once using <code>fmt:setLocale</code> in a common header or filter.</li>
            <li>Use <code>fmt:parseNumber</code> and <code>fmt:parseDate</code> to convert formatted strings back to numbers/dates.</li>
            <li>Combine fn functions with JSTL core tags for powerful data transformation (e.g., <code>c:forEach</code> with <code>fn:split</code>).</li>
            <li>Resource bundles should be placed under <code>/WEB-INF/classes</code> with base name like <code>messages_en.properties</code>.</li>
            <li>Use <code>fmt:setBundle</code> to load a specific resource bundle and <code>fmt:message</code> to output keys.</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Forgetting to declare taglib:</strong> You need <code>&lt;%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %&gt;</code> and <code>&lt;%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %&gt;</code>.</li>
            <li>❌ <strong>Using fn functions on null values:</strong> Some functions (like <code>fn:length</code>) will throw exceptions if the argument is null. Check with <code>c:if</code> first.</li>
            <li>❌ <strong>Incorrect pattern syntax:</strong> Patterns for <code>fmt:formatNumber</code> and <code>fmt:formatDate</code> must follow Java DecimalFormat and SimpleDateFormat rules.</li>
            <li>❌ <strong>Not providing resource bundle files:</strong> If you use <code>fmt:bundle</code> without actual properties files, you'll get missing resource errors.</li>
            <li>❌ <strong>Assuming <code>fmt:formatDate</code> works with string dates:</strong> It requires a <code>java.util.Date</code> object. Use <code>fmt:parseDate</code> first if you have a string.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Store all resource bundles in <code>/WEB-INF/classes</code> and use a consistent naming convention.</li>
            <li>Always specify a default locale using <code>fmt:setLocale</code> to avoid fallback issues.</li>
            <li>Prefer fn functions over scriptlets for string manipulation; they are more readable and maintainable.</li>
            <li>Use <code>fn:escapeXml</code> when outputting user‑supplied data to prevent XSS attacks.</li>
            <li>Combine <code>fmt:formatNumber</code> with CSS classes to style numbers consistently.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> How would you display a price of ₹1,234.56 for Indian users and $1,234.56 for US users without changing the JSP logic?
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> In the <code>fmt:formatNumber</code> example, notice how the <code>type="currency"</code> automatically picks up the currency symbol based on the current locale.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Modify the date format to show "dd-MMM-yyyy" instead of the default style. Check how the output changes.
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand the purpose of fmt and fn libraries.</li>
            <li>✅ Know how to declare fmt and fn taglibs.</li>
            <li>✅ Use <code>fmt:formatNumber</code> and <code>fmt:formatDate</code> for locale‑aware formatting.</li>
            <li>✅ Employ fn functions for string operations.</li>
            <li>✅ Set locale and resource bundles for internationalization.</li>
            <li>✅ Avoid scriptlets by leveraging these tags.</li>
            <li>✅ Validate input with fn before processing.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`The fmt and fn libraries are indispensable for professional JSP development. In my ${experienceYears} years of teaching (since 1998), I've seen how they dramatically improve code clarity and reduce bugs related to localization and string handling. 
        Always remember: use fmt:setLocale at the start of your JSP or in a filter to define the user's locale. For production applications, consider loading resource bundles from a database to allow dynamic updates without redeployment. 
        The fn functions are especially handy when working with collections and arrays. For example, ${'$'}{fn:join(myArray, ', ')} can quickly display a comma-separated list. 
        A common oversight is forgetting that fn:length returns the length of a collection, not just strings – it's great for checking if a list is empty before iterating. 
        Keep these tools in your toolkit, and you'll write cleaner, more maintainable JSP pages.`}
      />
    </div>
  );
};

export default Topic11;