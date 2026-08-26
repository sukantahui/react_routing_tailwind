import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import code examples from topic15_files
import collectionsEL from "./topic15_files/collections.jsp?raw";
import operatorsEL from "./topic15_files/operators.jsp?raw";
import implicitObjects from "./topic15_files/implicitObjects.jsp?raw";
import advancedOperators from "./topic15_files/advancedOperators.jsp?raw";
import nestedCollections from "./topic15_files/nestedCollections.jsp?raw";

const Topic15 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          EL Advanced Features: Collections, Operators & Implicit Objects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Powerful expression language features for dynamic JSP pages
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Beyond Simple Access: Advanced EL</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            EL (Expression Language) in JSP 2.0 and later provides powerful features beyond simple property access.
            You can work with <strong>collections</strong> (arrays, Lists, Maps), use <strong>operators</strong> (arithmetic, relational, logical, empty), 
            and leverage <strong>implicit objects</strong> like <code>param</code>, <code>header</code>, <code>cookie</code>, <code>initParam</code>, and <code>pageContext</code>.
          </p>
          <p className="leading-relaxed">
            These features allow you to write concise, readable JSPs without scriptlets. They are essential for building dynamic UIs that respond to user input, 
            server configuration, and application state.
          </p>
        </div>
      </section>

      {/* SVG Diagram: EL in Action */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">How EL Works (Visual)</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="700" height="240" viewBox="0 0 700 240" className="w-full max-w-3xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              {/* EL Expression */}
              <rect x="20" y="90" width="120" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="80" y="125" textAnchor="middle" fill="white">{`\${...}`}</text>

              {/* Arrow */}
              <line x1="140" y1="120" x2="180" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* EL Engine */}
              <rect x="190" y="80" width="100" height="80" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="240" y="110" textAnchor="middle" fill="white">EL Engine</text>
              <text x="240" y="130" textAnchor="middle" fill="#9ca3af" fontSize="10">Resolves variables</text>
              <text x="240" y="145" textAnchor="middle" fill="#9ca3af" fontSize="10">Evaluates operators</text>

              {/* Arrow to Scopes */}
              <line x1="290" y1="120" x2="330" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Scopes/Objects */}
              <rect x="340" y="30" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="390" y="60" textAnchor="middle" fill="white">pageScope</text>
              <rect x="340" y="90" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="390" y="120" textAnchor="middle" fill="white">requestScope</text>
              <rect x="340" y="150" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="390" y="180" textAnchor="middle" fill="white">sessionScope</text>
              <rect x="340" y="210" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="390" y="240" textAnchor="middle" fill="white">applicationScope</text>

              {/* Arrow from EL Engine to Operators */}
              <line x1="240" y1="160" x2="240" y2="200" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="190" y="200" width="100" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="240" y="225" textAnchor="middle" fill="white">Operators</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            EL evaluates expressions by traversing scopes and applying operators.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Working with Collections</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Arrays and Lists</h3>
            <p className="leading-relaxed">
              Access by index: <code>{`\${myList[0]}`}</code> or <code>{`\${myArray[2]}`}</code>. Supports nested access like <code>{`\${myList[0].name}`}</code>.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Maps</h3>
            <p className="leading-relaxed">
              Access by key: <code>{`\${myMap['key']}`}</code> or <code>{`\${myMap.key}`}</code> (if key is a valid identifier).
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Collection Length</h3>
            <p className="leading-relaxed">
              Use <code>{`\${fn:length(collection)}`}</code> (JSTL fn) to get size.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Nested Collections</h3>
            <p className="leading-relaxed">
              Combine dot and bracket notation: <code>{`\${students[0].courses['Math']}`}</code>
            </p>
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Operators in EL</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Arithmetic</h3>
            <p><code>+ - * / %</code><br/>Example: <code>${5 + 3}</code> → 8</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Relational</h3>
            <p><code>== != &lt; &gt; &lt;= &gt;=</code><br/>Example: <code>{`\${age &gt;= 18}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Logical</h3>
            <p><code>&amp;&amp; || !</code><br/>Example: <code>{`\${user.loggedIn &amp;&amp; user.role == 'admin'}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Empty</h3>
            <p><code>empty</code> checks null or empty collection/string<br/>Example: <code>{`\${empty cart.items}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Conditional (ternary)</h3>
            <p><code>? :</code><br/>Example: <code>{`\${score >= 60 ? 'Pass' : 'Fail'}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">String Concatenation</h3>
            <p>Not directly supported, but can use <code>+=</code> in JSTL <code>c:set</code> or combine with <code>fn:concat</code>.</p>
          </div>
        </div>
      </section>

      {/* Implicit Objects */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">EL Implicit Objects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-md font-bold text-blue-600 dark:text-blue-400 mb-2">param, paramValues</h3>
            <p>Request parameters: <code>{`\${param.username}`}</code>, <code>{`\${paramValues.hobby[0]}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-md font-bold text-blue-600 dark:text-blue-400 mb-2">header, headerValues</h3>
            <p>HTTP headers: <code>{`\${header['User-Agent']}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-md font-bold text-blue-600 dark:text-blue-400 mb-2">cookie</h3>
            <p>Cookies: <code>{`\${cookie.user.value}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-md font-bold text-blue-600 dark:text-blue-400 mb-2">initParam</h3>
            <p>Context initialization parameters: <code>{`\${initParam.adminEmail}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-md font-bold text-blue-600 dark:text-blue-400 mb-2">pageContext</h3>
            <p>Access to servlet objects: <code>{`\${pageContext.request.contextPath}`}</code></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-md font-bold text-blue-600 dark:text-blue-400 mb-2">pageScope, requestScope, sessionScope, applicationScope</h3>
            <p>Explicit scope access: <code>{`\${sessionScope.user}`}</code> (avoids ambiguous resolution)</p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Code Examples</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. Collections (List, Map, Array)</h3>
            <JavaFileLoader
              fileModule={collectionsEL}
              title="collections.jsp"
              highlightLines={[7,8,9,10,11]}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. Operators (Arithmetic, Relational, Logical, Empty)</h3>
            <JavaFileLoader
              fileModule={operatorsEL}
              title="operators.jsp"
              highlightLines={[7,8,9,10]}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. Implicit Objects (param, header, cookie, initParam, pageContext)</h3>
            <JavaFileLoader
              fileModule={implicitObjects}
              title="implicitObjects.jsp"
              highlightLines={[7,8,9,10,11]}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. Advanced Operators (Conditional, Empty with Collections)</h3>
            <JavaFileLoader
              fileModule={advancedOperators}
              title="advancedOperators.jsp"
              highlightLines={[7,8,9]}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">5. Nested Collections (Real‑world scenario)</h3>
            <JavaFileLoader
              fileModule={nestedCollections}
              title="nestedCollections.jsp"
              highlightLines={[7,8,9]}
            />
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Applications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>Dynamic Forms:</strong> Use <code>{`\${param.field}`}</code> to repopulate forms after validation errors.</li>
            <li><strong>User‑Specific Content:</strong> Check <code>{`\${sessionScope.user.role}`}</code> to conditionally show admin panels.</li>
            <li><strong>Localization:</strong> Access <code>{`\${header['Accept-Language']}`}</code> to set locale.</li>
            <li><strong>Cart Summary:</strong> Compute total using arithmetic operators in JSTL or EL combined with <code>c:forEach</code>.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: In a school portal, you could display a custom greeting based on the time of day using <code>{`\${pageContext.request.time}`}</code> (though not directly, you'd need a bean), or check if the student's list is empty before showing a message.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use <code>{`\${empty collection}`}</code> to safely check for null or empty collections without scriptlets.</li>
            <li>Combine EL with JSTL tags: <code>&lt;c:if test="{`\${user.loggedIn &amp;&amp; fn:length(cart.items) > 0}`}"&gt;</code>.</li>
            <li>Access nested properties with dot notation even if the property name contains hyphens: use <code>{`\${bean['property-name']}`}</code>.</li>
            <li>When using <code>pageContext</code>, you can get the context path via <code>{`\${pageContext.request.contextPath}`}</code> for building URLs.</li>
            <li>EL also supports <code>gt</code>, <code>lt</code>, <code>ge</code>, <code>le</code>, <code>eq</code>, <code>ne</code> as aliases for comparison operators.</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Using <code>+</code> for string concatenation:</strong> EL treats numbers as arithmetic; use <code>fn:concat</code> or <code>c:set</code> with <code>+=</code>.</li>
            <li>❌ <strong>Forgetting that <code>empty</code> checks both null and empty collections/strings:</strong> <code>{`\${empty ""}`}</code> returns true.</li>
            <li>❌ <strong>Accessing map keys with dot when the key contains special characters:</strong> Use bracket notation <code>{`\${map['key with spaces']}`}</code>.</li>
            <li>❌ <strong>Assuming <code>{`\${param}`}</code> is a Map of all parameters:</strong> It's a single value; use <code>paramValues</code> for arrays.</li>
            <li>❌ <strong>Overlooking scope precedence:</strong> EL searches page → request → session → application. Use explicit scopes to avoid ambiguity.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Always use explicit scopes (<code>requestScope</code>, etc.) when variable names might conflict.</li>
            <li>Prefer EL over scriptlets for all dynamic content – it's cleaner and easier to maintain.</li>
            <li>Use <code>empty</code> operator to gracefully handle missing data.</li>
            <li>Combine EL with JSTL for powerful, readable views.</li>
            <li>For complex calculations, do them in the controller (servlet/bean) and store the result, not in EL.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> How would you display "Welcome back, User!" if the user is logged in, else show a login link? Use <code>{`\${empty sessionScope.user}`}</code> in a <code>c:choose</code>.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> In the <code>implicitObjects.jsp</code>, we used <code>{`\${header['User-Agent']}`}</code>. Why the quotes? Because the header name contains a hyphen.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Modify the <code>collections.jsp</code> to access the second course of the second student using a combination of dot and bracket.
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand collection access: Lists, Maps, arrays.</li>
            <li>✅ Know the operators: arithmetic, relational, logical, empty, ternary.</li>
            <li>✅ Use implicit objects: param, header, cookie, initParam, pageContext, and scope maps.</li>
            <li>✅ Use bracket notation for special characters or dynamic keys.</li>
            <li>✅ Prefer EL over scriptlets for all dynamic output.</li>
            <li>✅ Combine EL with JSTL for complex logic.</li>
            <li>✅ Always handle null/empty gracefully with the empty operator.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`Advanced EL features are what make JSP powerful without scriptlets. In my ${experienceYears} years of teaching (since 1998), I've seen students go from writing messy scriptlets to clean, maintainable JSPs once they master these features.
        A pro tip: always use explicit scopes when you have multiple variables with the same name. For example, if you have both requestScope.user and sessionScope.user, use {requestScope.user} to avoid ambiguity.
        Another important point: the empty operator is your best friend – it checks for null, empty strings, empty collections, and even maps. Use it liberally to prevent NullPointerExceptions.
        Remember that EL is not a full programming language; keep complex logic in your Java code. The view should only display data, not compute it.`}
      />
    </div>
  );
};

export default Topic15;