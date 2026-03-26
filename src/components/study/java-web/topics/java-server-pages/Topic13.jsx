import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import code examples from topic13_files
import studentBeanJava from "./topic13_files/StudentBean.java?raw";
import useBeanJSP from "./topic13_files/useBean.jsp?raw";
import setPropertyJSP from "./topic13_files/setProperty.jsp?raw";
import getPropertyJSP from "./topic13_files/getProperty.jsp?raw";
import formProcessingJSP from "./topic13_files/formProcessing.jsp?raw";
import beanWithJSTL from "./topic13_files/beanWithJSTL.jsp?raw";

const Topic13 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Using JavaBeans as Data Containers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Encapsulating data and business logic in reusable Java classes
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">What are JavaBeans?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            A <strong>JavaBean</strong> is a reusable Java class that follows specific conventions: 
            it has a no-argument constructor, private properties with public getter and setter methods, and is serializable. 
            In JSP, JavaBeans are used as data containers to encapsulate data and pass it between layers.
          </p>
          <p className="leading-relaxed">
            The JSP specification provides special tags like <code>&lt;jsp:useBean&gt;</code>, <code>&lt;jsp:setProperty&gt;</code>, and 
            <code>&lt;jsp:getProperty&gt;</code> to work with beans, making it easy to populate and display data without scriptlets.
          </p>
        </div>
      </section>

      {/* SVG Diagram: Bean Lifecycle in JSP */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">How Beans Work in JSP</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="700" height="280" viewBox="0 0 700 280" className="w-full max-w-3xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              {/* Form Submission */}
              <rect x="20" y="110" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="145" textAnchor="middle" fill="white">HTML Form</text>

              {/* Arrow */}
              <line x1="120" y1="140" x2="160" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* JSP with useBean */}
              <rect x="170" y="100" width="120" height="80" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="230" y="135" textAnchor="middle" fill="white">JSP</text>
              <text x="230" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">useBean / setProperty</text>

              {/* Arrow down to Bean */}
              <line x1="230" y1="180" x2="230" y2="220" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* JavaBean */}
              <rect x="170" y="220" width="120" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="230" y="252" textAnchor="middle" fill="white">JavaBean Instance</text>

              {/* Arrow right to Output */}
              <line x1="290" y1="245" x2="330" y2="245" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Output */}
              <rect x="340" y="220" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="390" y="252" textAnchor="middle" fill="white">Display (getProperty)</text>

              {/* Additional note */}
              <text x="390" y="190" textAnchor="middle" fill="#9ca3af" fontSize="10">Data flows automatically</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            JavaBeans act as intermediaries between form data and JSP output, eliminating the need for manual request parameter handling.
          </p>
        </div>
      </section>

      {/* Bean Components */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">JavaBean Requirements</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">1. No‑argument Constructor</h3>
            <p className="leading-relaxed">
              Public constructor with no parameters, so the JSP container can instantiate the bean.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">2. Private Properties</h3>
            <p className="leading-relaxed">
              Fields are private, preventing direct access.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">3. Public Getters & Setters</h3>
            <p className="leading-relaxed">
              For each property, provide <code>getProperty()</code> and <code>setProperty()</code> methods.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">4. Serializable (optional)</h3>
            <p className="leading-relaxed">
              Implement <code>Serializable</code> for persistence and session replication.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Code Examples</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. StudentBean.java – A Simple Bean</h3>
            <JavaFileLoader
              fileModule={studentBeanJava}
              title="StudentBean.java"
              highlightLines={[5,6,7,12,13,14]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              A typical JavaBean with private fields, getters/setters, and a no‑arg constructor.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. Using jsp:useBean</h3>
            <JavaFileLoader
              fileModule={useBeanJSP}
              title="useBean.jsp"
              highlightLines={[5,6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <code>jsp:useBean</code> creates or retrieves a bean, optionally setting properties.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. Automatically Populating from Form Parameters</h3>
            <JavaFileLoader
              fileModule={setPropertyJSP}
              title="setProperty.jsp"
              highlightLines={[5,6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <code>jsp:setProperty</code> with <code>property="*"</code> automatically matches request parameters to bean properties.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. Displaying Bean Properties</h3>
            <JavaFileLoader
              fileModule={getPropertyJSP}
              title="getProperty.jsp"
              highlightLines={[7,8]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Use <code>jsp:getProperty</code> to output bean properties.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">5. Complete Form Processing Example</h3>
            <JavaFileLoader
              fileModule={formProcessingJSP}
              title="formProcessing.jsp"
              highlightLines={[5,6,7,8,9,10]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              A JSP that receives form data, populates a bean, and displays it.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">6. Bean with JSTL</h3>
            <JavaFileLoader
              fileModule={beanWithJSTL}
              title="beanWithJSTL.jsp"
              highlightLines={[5,6,7]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Access bean properties using EL after <code>jsp:useBean</code> (modern approach).
            </p>
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Applications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>Data Transfer Objects (DTOs):</strong> Beans are perfect for carrying data between layers (e.g., from servlet to JSP).</li>
            <li><strong>Form Handling:</strong> Automatically map HTML form fields to bean properties, reducing boilerplate.</li>
            <li><strong>Session Storage:</strong> Store user‑specific data in the session as a bean (e.g., <code>UserBean</code>).</li>
            <li><strong>Configuration Objects:</strong> Use beans to encapsulate application settings or database connection parameters.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: In a school system in Barrackpore, a <code>StudentBean</code> can hold admission details and be used across registration, fee payment, and report generation pages.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use <code>&lt;jsp:setProperty property="*" /&gt;</code> to automatically populate all matching request parameters – saves time.</li>
            <li>Always scope beans appropriately: request scope for temporary data, session for user-specific data, application for global data.</li>
            <li>Combine <code>jsp:useBean</code> with JSTL/EL for cleaner code; you can directly access properties via <code>{`\${student.name}`}</code>.</li>
            <li>Make beans <code>Serializable</code> when storing in session to support session persistence and clustering.</li>
            <li>Add validation logic inside setters to ensure data integrity (e.g., check if age is positive).</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Missing no‑arg constructor:</strong> <code>jsp:useBean</code> cannot instantiate the bean.</li>
            <li>❌ <strong>Inconsistent property names:</strong> The bean property name must match the request parameter name exactly (case‑sensitive).</li>
            <li>❌ <strong>Forgetting to declare the bean class fully qualified:</strong> <code>class="com.example.StudentBean"</code> not just <code>StudentBean</code>.</li>
            <li>❌ <strong>Using <code>jsp:getProperty</code> on a bean with no getter:</strong> JSP container will throw an error.</li>
            <li>❌ <strong>Not considering thread safety:</strong> Beans stored in application or session scope must be thread‑safe if accessed concurrently.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Place beans in a dedicated package (e.g., <code>com.school.model</code>).</li>
            <li>Use meaningful property names that match database columns or form fields.</li>
            <li>Prefer <code>&lt;jsp:useBean&gt;</code> over scriptlets for creating beans.</li>
            <li>Combine bean usage with JSTL and EL to avoid mixing Java code and HTML.</li>
            <li>Implement <code>toString()</code> for debugging purposes.</li>
            <li>Use bean validation annotations (if using Java EE) or custom validation inside setters.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> If you have a form with fields <code>studentName</code>, <code>studentAge</code>, and <code>studentClass</code>, how would you name the bean properties to auto‑populate?
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> In the <code>formProcessing.jsp</code>, we used <code>property="*"</code>. What happens if the bean has an extra property that doesn't match any request parameter?
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Modify the <code>StudentBean</code> to include a <code>setAddress(String address)</code> that trims whitespace. Then see how the auto‑population behaves.
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand the JavaBean conventions (no‑arg constructor, getters/setters, serializable).</li>
            <li>✅ Know how to declare a bean using <code>&lt;jsp:useBean&gt;</code>.</li>
            <li>✅ Use <code>&lt;jsp:setProperty property="*" /&gt;</code> to auto‑populate from request parameters.</li>
            <li>✅ Display bean properties with <code>&lt;jsp:getProperty&gt;</code> or EL.</li>
            <li>✅ Choose the appropriate scope (request, session, application).</li>
            <li>✅ Combine beans with JSTL for cleaner JSPs.</li>
            <li>✅ Avoid scriptlets; let JSP tags handle data.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`JavaBeans are the workhorses of data handling in classic JSP applications. In my ${experienceYears} years of teaching (since 1998), I've seen that mastering beans is a turning point for students. They allow you to separate presentation from data logic and drastically reduce scriptlets. 
        A common oversight is not setting the correct scope: if you put a bean in session but only need it for one request, you'll waste memory and may cause concurrency issues. Always choose the smallest scope that works. 
        Another pro tip: when using <code>property="*"</code>, be aware that any request parameter with a matching name will overwrite the bean property. This can be a security risk if you expose internal properties. Always validate and sanitize input in the bean's setters or in a separate controller. 
        I encourage you to combine beans with JSTL and EL for maximum readability. In a school management system, you might have a <code>RegistrationBean</code> that captures all student data, then pass it to a confirmation page and later persist it. That's the power of beans!`}
      />
    </div>
  );
};

export default Topic13;