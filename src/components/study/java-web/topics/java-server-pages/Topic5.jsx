import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw JSP examples
import elBasic from "./topic5_files/el_basic.jsp?raw";
import elImplicit from "./topic5_files/el_implicit_objects.jsp?raw";
import elOperators from "./topic5_files/el_operators.jsp?raw";
import elBeanAccess from "./topic5_files/el_bean_access.jsp?raw";

// ----------------------------------------------------------------------
// Inline keyframes for animations (no config needed)
const animationKeyframes = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
// ----------------------------------------------------------------------

const Topic5 = () => {
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
          Expression Language (EL)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A simpler, cleaner way to access dynamic data in JSP.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[0]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">
          What is Expression Language (EL)?
        </h2>
        <p className="mb-3">
          EL (Expression Language) is a scripting language introduced in JSP 2.0 to make it
          easier to access and manipulate data stored in JavaBeans, maps, lists, and implicit
          objects. It replaces the need for cumbersome scriptlets and expressions, promoting
          cleaner, more readable JSP pages.
        </p>
        <p className="mb-2">
          <strong className="text-indigo-600 dark:text-indigo-400">
            Real‑world analogy:
          </strong>{" "}
          Think of EL as a library catalogue system. Instead of walking into the stacks and
          searching manually (scriptlets), you can simply ask the librarian for a book by
          title – the librarian finds it for you. EL does the same: you give a simple
          expression, and the container locates the data from the appropriate scope or object.
        </p>
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic">
            <span className="font-semibold">💡 Teacher's Note (Sukanta Hui):</span>{" "}
            "I always tell my students from Shyamnagar: EL is your best friend. It
            automatically handles null values gracefully – no more NullPointerExceptions
            in your JSP! It also respects the different scopes, searching from page to
            application scope in order."
          </p>
        </div>
      </section>

      {/* SVG Illustration – EL Overview */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[1]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          How EL Works
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <svg
            viewBox="0 0 700 200"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* EL expression */}
            <g transform="translate(50,70)">
              <rect
                x="0"
                y="0"
                width="180"
                height="80"
                rx="10"
                fill="#fef9c3"
                stroke="#ca8a04"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-yellow-100 dark:hover:fill-yellow-900/50"
              />
              <text x="90" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#854d0e">
                {"\${student.name}"}
              </text>
              <text x="90" y="60" textAnchor="middle" fontSize="10" fill="#854d0e">
                EL Expression
              </text>
            </g>

            {/* Arrow */}
            <line
              x1="230"
              y1="110"
              x2="300"
              y2="110"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>

            {/* EL Processor */}
            <g transform="translate(320,40)">
              <rect
                x="0"
                y="0"
                width="150"
                height="140"
                rx="10"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-blue-100 dark:hover:fill-blue-900/50"
              />
              <text x="75" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
                EL Processor
              </text>
              <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#1e40af">
                1. Searches scopes
              </text>
              <text x="75" y="70" textAnchor="middle" fontSize="9" fill="#1e40af">
                page → request → session → app
              </text>
              <text x="75" y="95" textAnchor="middle" fontSize="9" fill="#1e40af">
                2. Evaluates dot/bracket
              </text>
              <text x="75" y="115" textAnchor="middle" fontSize="9" fill="#1e40af">
                3. Handles null gracefully
              </text>
            </g>

            {/* Output */}
            <g transform="translate(520,70)">
              <rect
                x="0"
                y="0"
                width="130"
                height="60"
                rx="10"
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-green-100 dark:hover:fill-green-900/50"
              />
              <text x="65" y="35" textAnchor="middle" fontSize="14" fill="#166534">
                "Swadeep"
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Core EL Concepts */}
      <section
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-2 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[2]}ms`, animationFillMode: "both" }}
      >
        {/* Syntax Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-indigo-200 dark:border-indigo-900 hover:shadow-lg transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-700">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
            <span className="mr-2">🔤</span> Syntax & Basics
          </h3>
          <p className="text-sm mb-2">
            <strong>Immediate evaluation:</strong> <code>${'{'}expr{`}`}</code>
          </p>
          <p className="text-sm mb-2">
            <strong>Deferred evaluation (for JSF):</strong> <code>#{'{'}expr{`}`}</code>
          </p>
          <p className="text-sm mb-2">
            EL expressions can be used in template text, tag attributes, and inside JSP actions.
          </p>
          <p className="text-sm mb-2">
            <strong>Reserved words:</strong> <code>and, or, not, eq, ne, lt, gt, le, ge, true, false, null, instanceof, empty</code>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            If the expression evaluates to null, nothing is displayed (empty string).
          </p>
        </div>

        {/* Implicit Objects Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-indigo-200 dark:border-indigo-900 hover:shadow-lg transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-700">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
            <span className="mr-2">📦</span> EL Implicit Objects
          </h3>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><code>pageScope</code>, <code>requestScope</code>, <code>sessionScope</code>, <code>applicationScope</code></li>
            <li><code>param</code> – maps request parameters (single value)</li>
            <li><code>paramValues</code> – maps request parameters (multiple values)</li>
            <li><code>header</code>, <code>headerValues</code> – HTTP headers</li>
            <li><code>cookie</code> – map of cookies</li>
            <li><code>initParam</code> – context init parameters</li>
            <li><code>pageContext</code> – provides access to JSP implicit objects (e.g., <code>{"\${pageContext.request.contextPath}"}</code>)</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Example: <code>{"\${param.username}"}</code> gets request parameter "username".
          </p>
        </div>

        {/* Operators Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-indigo-200 dark:border-indigo-900 hover:shadow-lg transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-700">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
            <span className="mr-2">⚙️</span> Operators
          </h3>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>Arithmetic:</strong> +, -, *, / (div), % (mod)</li>
            <li><strong>Logical:</strong> &amp;&amp; (and), || (or), ! (not)</li>
            <li><strong>Relational:</strong> == (eq), != (ne), &lt; (lt), &gt; (gt), &lt;= (le), &gt;= (ge)</li>
            <li><strong>Empty:</strong> <code>empty variable</code> – true if null or empty (collection, string, array)</li>
            <li><strong>Conditional (ternary):</strong> <code>{"\${condition ? value1 : value2}"}</code></li>
          </ul>
        </div>

        {/* Accessing Data Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-indigo-200 dark:border-indigo-900 hover:shadow-lg transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-700">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
            <span className="mr-2">🔍</span> Accessing Data
          </h3>
          <p className="text-sm mb-2">
            <strong>Dot notation:</strong> <code>{"\${student.name}"}</code> calls <code>student.getName()</code>.
          </p>
          <p className="text-sm mb-2">
            <strong>Bracket notation:</strong> <code>{`\${student["name"]}`}</code> – useful when property name contains special characters or is dynamic.
          </p>
          <p className="text-sm mb-2">
            <strong>Collections:</strong> <code>{`\${list[0]}`}</code>, <code>{`\${map['key']}`}</code>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            EL automatically coerces types: e.g., <code>{`\${param.age + 1}`}</code> converts the string to a number.
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

        {/* Basic EL */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={elBasic}
            title="el_basic.jsp – Simple EL expressions"
            highlightLines={[8,9,10]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Basic arithmetic and string concatenation using EL.
          </p>
        </div>

        {/* EL Implicit Objects */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={elImplicit}
            title="el_implicit_objects.jsp – Using implicit objects"
            highlightLines={[7,8,9,10]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Access request parameters, headers, cookies, and context path using EL implicit objects.
          </p>
        </div>

        {/* EL Operators */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={elOperators}
            title="el_operators.jsp – Demonstrating operators"
            highlightLines={[7,8,9,10,11]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Shows relational, logical, and empty operators, plus the ternary operator.
          </p>
        </div>

        {/* EL with JavaBean */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={elBeanAccess}
            title="el_bean_access.jsp – Accessing a JavaBean"
            highlightLines={[7,9,10]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Combines <code>&lt;jsp:useBean&gt;</code> with EL to read bean properties.
          </p>
        </div>

        {/* Hint Section */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            🔍 Observe carefully:
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            EL searches for attributes in the order: page → request → session → application.
            If you want to restrict the search, use the scope map: <code>{`\${sessionScope.student.name}`}</code>.
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
              <strong>Using EL in unsupported environments:</strong> Ensure your web container supports JSP 2.0 or later.
            </li>
            <li>
              <strong>Forgetting to escape ${`{`} in text:</strong> If you need to display literal <code>{"\${...}"}</code>, use <code>{"\\${...}"}</code>.
            </li>
            <li>
              <strong>Assuming EL can call arbitrary methods:</strong> EL can only call getters and methods that follow the JavaBeans pattern.
            </li>
            <li>
              <strong>Misunderstanding empty operator:</strong> <code>empty</code> returns true for null, empty string, empty array, empty collection, or empty map.
            </li>
            <li>
              <strong>Not handling numbers in expressions:</strong> EL performs arithmetic, but if a value is null, it's treated as 0 for numbers, which may be unexpected.
            </li>
            <li>
              <strong>Over-reliance on default scope search:</strong> If multiple scopes contain an attribute with the same name, you might get the wrong one. Use scope prefixes.
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
              <strong>Always use scope prefixes</strong> to avoid ambiguity and improve readability: e.g., <code>{`\${sessionScope.user.name}`}</code>.
            </li>
            <li>
              <strong>Prefer dot notation</strong> for bean properties, bracket notation for dynamic keys or names with special characters.
            </li>
            <li>
              <strong>Combine with JSTL</strong> for control structures (if, loop) instead of scriptlets.
            </li>
            <li>
              <strong>Use <code>empty</code> to check for null or empty collections</strong> before accessing them.
            </li>
            <li>
              <strong>Keep expressions simple;</strong> if logic is complex, move it to a controller or a helper bean.
            </li>
            <li>
              <strong>Escape EL in JavaScript</strong> if you need to embed server-side values in client-side code, using appropriate quoting.
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
              "I've seen students from Barrackpore struggle with scriptlets and then fall in
              love with EL. Remember, EL is not just for output; you can use it in tag
              attributes too. For example, <code>&lt;c:if test={"\${user.loggedIn}"}&gt;</code>.
              It's concise, safe, and makes your JSPs look like real template files."
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
              I understand EL syntax <code>${'{'}...{`}`}</code> and <code>#{'{'}...{`}`}</code>.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can list all EL implicit objects and their purposes.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I know the difference between dot and bracket notation.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can use operators like <code>empty</code> and the ternary operator.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I understand that EL automatically searches scopes and handles null.
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
              Temporarily output <code>${'{'}pageContext.request.attributeNames{`}`}</code> or
              use <code>&lt;c:forEach&gt;</code> to inspect attributes in a scope.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🚀 Performance Trick</p>
            <p className="text-sm">
              Avoid EL in attributes that are evaluated many times, like inside loops. If
              the expression is expensive, compute it once in a controller and store it in
              a scope variable.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🧠 Maintainability</p>
            <p className="text-sm">
              Use EL to externalize messages or configuration from JSP. For example,
              <code>{`\${initParam.defaultTitle}`}</code> from <code>web.xml</code> context parameters.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">📦 Quick Tip</p>
            <p className="text-sm">
              To concatenate strings, just use <code>{`\${firstName} \${lastName}`}</code> – EL
              will automatically convert and join them.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
        <p>Topic 5: Expression Language (EL) — The modern way to access data in JSP.</p>
        <p className="mt-1">
          Examples inspired by students from Barrackpore, Shyamnagar, Ichapur, Naihati.
        </p>
      </footer>
    </div>
  );
};

export default Topic5;