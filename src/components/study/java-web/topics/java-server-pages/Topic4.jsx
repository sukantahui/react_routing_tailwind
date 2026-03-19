import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw JSP and Java examples
import studentBeanJava from "./topic4_files/Student.java?raw";
import useBeanExample from "./topic4_files/useBean_example.jsp?raw";
import setPropertyExample from "./topic4_files/setProperty_example.jsp?raw";
import getPropertyExample from "./topic4_files/getProperty_example.jsp?raw";
import scopeExample from "./topic4_files/scope_example.jsp?raw";

// ----------------------------------------------------------------------
// Inline keyframes for animations (no config needed)
const animationKeyframes = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
// ----------------------------------------------------------------------

const Topic4 = () => {
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
          JavaBeans in JSP
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Encapsulating data and logic in reusable components.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[0]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">
          What are JavaBeans?
        </h2>
        <p className="mb-3">
          A JavaBean is a reusable Java class that follows specific conventions:
          a public no‑argument constructor, private properties with public getter/setter methods,
          and it is serializable (optional but common). In JSP, JavaBeans are used to separate
          data (model) from presentation (view), promoting cleaner, more maintainable code.
        </p>
        <p className="mb-2">
          <strong className="text-indigo-600 dark:text-indigo-400">
            Real‑world analogy:
          </strong>{" "}
          Think of a student registration form. The <strong>JavaBean</strong> is like a blank
          registration card (with fields for name, age, course). The JSP page is the clerk who
          fills in the card (<code>jsp:setProperty</code>) and reads information from it
          (<code>jsp:getProperty</code>). Multiple clerks (different JSPs) can use the same card
          design.
        </p>
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic">
            <span className="font-semibold">💡 Teacher's Note (Sukanta Hui):</span>{" "}
            "Students from Barrackpore often ask why we need beans when we can just use request
            attributes. Beans enforce a contract – they ensure data is properly encapsulated
            and reusable across pages. They're the foundation of MVC in JSP."
          </p>
        </div>
      </section>

      {/* SVG Illustration – JSP ↔ JavaBean interaction */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[1]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          How JSP Interacts with JavaBeans
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <svg
            viewBox="0 0 700 220"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* JSP Page */}
            <g transform="translate(50,60)">
              <rect
                x="0"
                y="0"
                width="160"
                height="120"
                rx="10"
                fill="#fef9c3"
                stroke="#ca8a04"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-yellow-100 dark:hover:fill-yellow-900/50"
              />
              <text x="80" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#854d0e">
                JSP Page
              </text>
              <text x="80" y="50" textAnchor="middle" fontSize="10" fill="#854d0e">
                &lt;jsp:useBean&gt;
              </text>
              <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#854d0e">
                &lt;jsp:setProperty&gt;
              </text>
              <text x="80" y="90" textAnchor="middle" fontSize="10" fill="#854d0e">
                &lt;jsp:getProperty&gt;
              </text>
            </g>

            {/* Arrow to Bean */}
            <line
              x1="210"
              y1="120"
              x2="290"
              y2="120"
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

            {/* JavaBean */}
            <g transform="translate(310,40)">
              <rect
                x="0"
                y="0"
                width="200"
                height="160"
                rx="10"
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-green-100 dark:hover:fill-green-900/50"
              />
              <text x="100" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
                JavaBean
              </text>
              <text x="100" y="50" textAnchor="middle" fontSize="10" fill="#166534">
                public class Student {`{`}
              </text>
              <text x="30" y="70" fontSize="10" fill="#166534">- name: String</text>
              <text x="30" y="90" fontSize="10" fill="#166534">- age: int</text>
              <text x="30" y="110" fontSize="10" fill="#166534">+ getName()</text>
              <text x="30" y="130" fontSize="10" fill="#166534">+ setName()</text>
              <text x="30" y="150" fontSize="10" fill="#166534">+ getAge() / setAge()</text>
              <text x="100" y="175" textAnchor="middle" fontSize="10" fill="#166534">{`}`}</text>
            </g>

            {/* Scope indicators */}
            <text x="500" y="120" fontSize="11" fill="#6b7280">
              Scopes: page | request | session | application
            </text>
          </svg>
        </div>
      </section>

      {/* Core Tags Explanation */}
      <section
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-3 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[2]}ms`, animationFillMode: "both" }}
      >
        {/* useBean */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-blue-200 dark:border-blue-900 hover:shadow-lg transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-700">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
            <span className="mr-2">🫘</span> &lt;jsp:useBean&gt;
          </h3>
          <p className="text-sm mb-2">
            <strong>Syntax:</strong> <code>&lt;jsp:useBean id="beanId" class="package.Class" scope="..." /&gt;</code>
          </p>
          <p className="text-sm mb-2">
            <strong>Purpose:</strong> Declares and instantiates a JavaBean (or locates an existing one) in a specified scope.
          </p>
          <p className="text-sm mb-2">
            <strong>Attributes:</strong>
          </p>
          <ul className="text-xs list-disc list-inside mb-2 space-y-1">
            <li><code>id</code> – name used to refer to the bean</li>
            <li><code>class</code> – fully qualified class name</li>
            <li><code>scope</code> – page, request, session, or application</li>
            <li><code>type</code> (optional) – type of the bean reference</li>
            <li><code>beanName</code> (optional) – name for instantiation</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            If the bean already exists in the given scope, it is reused; otherwise a new instance is created.
          </p>
        </div>

        {/* setProperty */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-green-200 dark:border-green-900 hover:shadow-lg transition-all duration-300 hover:border-green-400 dark:hover:border-green-700">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
            <span className="mr-2">✏️</span> &lt;jsp:setProperty&gt;
          </h3>
          <p className="text-sm mb-2">
            <strong>Syntax:</strong> <code>&lt;jsp:setProperty name="beanId" property="propName" value="value" /&gt;</code>
          </p>
          <p className="text-sm mb-2">
            <strong>Purpose:</strong> Sets a property of a JavaBean, either from a fixed value or from a request parameter.
          </p>
          <p className="text-sm mb-2">
            <strong>Special features:</strong>
          </p>
          <ul className="text-xs list-disc list-inside mb-2 space-y-1">
            <li><code>property="*"</code> – matches all request parameters to bean properties</li>
            <li><code>param="requestParam"</code> – uses a specific request parameter</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Type conversion is automatically performed for primitive types and common types (e.g., String → int).
          </p>
        </div>

        {/* getProperty */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-200 dark:border-purple-900 hover:shadow-lg transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-700">
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center">
            <span className="mr-2">🔍</span> &lt;jsp:getProperty&gt;
          </h3>
          <p className="text-sm mb-2">
            <strong>Syntax:</strong> <code>&lt;jsp:getProperty name="beanId" property="propName" /&gt;</code>
          </p>
          <p className="text-sm mb-2">
            <strong>Purpose:</strong> Retrieves the value of a bean property and outputs it to the response.
          </p>
          <p className="text-sm mb-2">
            <strong>Equivalent:</strong> In scriptlets: <code>&lt;%= bean.getProperty() %&gt;</code>, but cleaner.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            The property must have a public getter method following the naming convention (e.g., <code>getName()</code> for property <code>name</code>).
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

        {/* JavaBean Source */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={studentBeanJava}
            title="Student.java – A simple JavaBean"
            highlightLines={[]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This JavaBean follows the conventions: private fields, public no‑arg constructor, getters/setters.
          </p>
        </div>

        {/* useBean Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={useBeanExample}
            title="useBean_example.jsp – Creating and accessing a bean"
            highlightLines={[7]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            The <code>&lt;jsp:useBean&gt;</code> tag creates a new bean instance (or finds an existing one) in page scope.
          </p>
        </div>

        {/* setProperty Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={setPropertyExample}
            title="setProperty_example.jsp – Setting properties from request"
            highlightLines={[8,9,10]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Using <code>property="*"</code> automatically populates bean properties from matching request parameters.
          </p>
        </div>

        {/* getProperty Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={getPropertyExample}
            title="getProperty_example.jsp – Displaying bean properties"
            highlightLines={[13,14]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            The <code>&lt;jsp:getProperty&gt;</code> tag outputs property values directly.
          </p>
        </div>

        {/* Scope Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={scopeExample}
            title="scope_example.jsp – Bean across different scopes"
            highlightLines={[7,18]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Demonstrates a session‑scoped bean that persists across requests from the same user.
          </p>
        </div>

        {/* Hint Section */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            🔍 Observe carefully:
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            When using <code>property="*"</code>, the request parameter names must exactly match the bean property names.
            Also, the bean must have a no‑argument constructor; otherwise <code>&lt;jsp:useBean&gt;</code> will fail.
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
              <strong>Missing no‑arg constructor:</strong> The bean class must have a public no‑argument constructor.
            </li>
            <li>
              <strong>Property name mismatches:</strong> In <code>property="*"</code>, request parameter names must match bean property names exactly (case‑sensitive).
            </li>
            <li>
              <strong>Forgetting to import the bean class:</strong> The JSP page must be able to see the bean class (usually in <code>WEB-INF/classes</code> or a JAR).
            </li>
            <li>
              <strong>Using wrong scope:</strong> If you expect the bean to persist across requests, you must use <code>scope="session"</code>.
            </li>
            <li>
              <strong>Misunderstanding type conversion:</strong> Automatic conversion works for primitives and common types, but for custom types you need to handle manually.
            </li>
            <li>
              <strong>Scriptlet interference:</strong> Mixing scriptlets with bean tags can lead to confusion and errors.
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
              <strong>Use beans as pure data containers:</strong> Avoid business logic inside beans; keep them simple.
            </li>
            <li>
              <strong>Leverage <code>property="*"</code> for form processing:</strong> It saves time and reduces code.
            </li>
            <li>
              <strong>Combine with Expression Language (EL):</strong> EL can directly access bean properties: <code>{"\${student.name}"}</code>.
            </li>
            <li>
              <strong>Choose the narrowest scope possible:</strong> Prefer request scope over session unless you need to persist across requests.
            </li>
            <li>
              <strong>Always specify the full class name in <code>class</code> attribute:</strong> Including the package.
            </li>
            <li>
              <strong>Use <code>&lt;jsp:useBean&gt;</code> with <code>type</code> and <code>class</code> for interfaces/abstract classes.</strong>
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
              "I tell my students from Naihati: a JavaBean is like a well‑organized drawer.
              You put things in (<code>setProperty</code>), take them out (<code>getProperty</code>),
              and you can have the same drawer in different rooms (scopes). Always ensure your
              drawer (bean) is properly built – with a default constructor and proper getters/setters.
              This simple habit saves hours of debugging."
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
              I know the conventions for a JavaBean (no‑arg constructor, private fields, public getters/setters).
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can use <code>&lt;jsp:useBean&gt;</code> to create or locate a bean.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I understand how <code>property="*"</code> automatically maps request parameters.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can choose the appropriate scope (page, request, session, application).
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can display bean properties using <code>&lt;jsp:getProperty&gt;</code>.
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
              If <code>property="*"</code> doesn't populate your bean, check that the request
              parameter names exactly match the bean property names. Also ensure the bean has
              setter methods (e.g., <code>setName()</code> for property <code>name</code>).
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🚀 Performance Trick</p>
            <p className="text-sm">
              Avoid putting large objects in session scope. If you need to keep data across
              requests, store only an ID and retrieve the full object from a database when needed.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🧠 Maintainability</p>
            <p className="text-sm">
              Use a base or abstract bean for common properties (like <code>id</code>, 
              <code>createdDate</code>) to reduce duplication.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">📦 Quick Tip</p>
            <p className="text-sm">
              You can combine <code>&lt;jsp:setProperty&gt;</code> with a specific <code>param</code>
              to map a request parameter to a differently named property.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
        <p>Topic 4: JavaBeans in JSP — Clean separation of data and presentation.</p>
        <p className="mt-1">
          Examples inspired by students from Barrackpore, Shyamnagar, Ichapur, Naihati.
        </p>
      </footer>
    </div>
  );
};

export default Topic4;