import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import code examples from topic16_files
import ajaxDemoJSP from "./topic16_files/ajaxDemo.jsp?raw";
import dataServletJava from "./topic16_files/DataServlet.java?raw";
import simpleAjaxJS from "./topic16_files/simpleAjax.js?raw";
import jqueryAjaxJSP from "./topic16_files/jqueryAjax.jsp?raw";
import jsonServletJava from "./topic16_files/JsonServlet.java?raw";
import dynamicTableJSP from "./topic16_files/dynamicTable.jsp?raw";

const Topic16 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Introduction to AJAX Integration
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Asynchronous web interactions with JSP and Servlets
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">What is AJAX?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            <strong>AJAX (Asynchronous JavaScript and XML)</strong> is a technique that allows web pages to communicate with the server 
            without reloading the entire page. It sends requests in the background and updates parts of the page dynamically.
          </p>
          <p className="leading-relaxed">
            In JSP applications, AJAX is typically implemented using JavaScript (or jQuery) on the client side, and a servlet or JSP on the server side 
            that returns data (often in JSON or XML format). This enables responsive, interactive features like auto‑complete, live search, 
            form validation, and real‑time updates.
          </p>
        </div>
      </section>

      {/* SVG Diagram: AJAX Flow */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">How AJAX Works (Visual)</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="750" height="250" viewBox="0 0 750 250" className="w-full max-w-4xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              {/* Browser/Client */}
              <rect x="20" y="90" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="125" textAnchor="middle" fill="white">Browser</text>

              {/* Arrow down to JavaScript */}
              <line x1="70" y1="150" x2="70" y2="190" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="20" y="190" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="222" textAnchor="middle" fill="white">JavaScript</text>

              {/* Arrow to Server */}
              <line x1="120" y1="215" x2="160" y2="215" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Server */}
              <rect x="170" y="190" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="220" y="222" textAnchor="middle" fill="white">Servlet/JSP</text>

              {/* Arrow up to Browser */}
              <line x1="220" y1="190" x2="220" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Updated Part */}
              <rect x="150" y="30" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="220" y="65" textAnchor="middle" fill="white">Partial Page Update</text>

              {/* Arrow from Browser to Updated Part */}
              <line x1="120" y1="120" x2="150" y2="60" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            JavaScript initiates a request, the server responds with data, and the page updates dynamically.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Key Components</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Client‑Side (JavaScript)</h3>
            <p className="leading-relaxed">
              Uses <code>XMLHttpRequest</code> or the modern <code>fetch()</code> API to send asynchronous requests and handle responses.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Server‑Side (JSP/Servlet)</h3>
            <p className="leading-relaxed">
              Processes the request and returns data (plain text, HTML, JSON, or XML). No full page rendering.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Data Format</h3>
            <p className="leading-relaxed">
              JSON (JavaScript Object Notation) is the most common today due to its lightweight nature and easy parsing.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">DOM Manipulation</h3>
            <p className="leading-relaxed">
              After receiving the response, JavaScript updates specific parts of the DOM (e.g., filling a dropdown, displaying a message).
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Code Examples</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. Basic AJAX with XMLHttpRequest (JSP + Servlet)</h3>
            <JavaFileLoader
              fileModule={ajaxDemoJSP}
              title="ajaxDemo.jsp"
              highlightLines={[15,16,17,18,19,20]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              A JSP page with JavaScript that sends a request to a servlet and updates a div with the response.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. Servlet Handling AJAX Request</h3>
            <JavaFileLoader
              fileModule={dataServletJava}
              title="DataServlet.java"
              highlightLines={[18,19,20]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              A simple servlet that returns a text message based on a parameter.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. Using fetch() API (Modern JavaScript)</h3>
            <JavaFileLoader
              fileModule={simpleAjaxJS}
              title="simpleAjax.js"
              highlightLines={[3,4,5,6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              A JavaScript function using the fetch API to get data from a servlet.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. jQuery AJAX Example</h3>
            <JavaFileLoader
              fileModule={jqueryAjaxJSP}
              title="jqueryAjax.jsp"
              highlightLines={[10,11,12,13,14]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Uses jQuery's <code>$.ajax</code> for simplicity, often used in legacy projects.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">5. Returning JSON from Servlet</h3>
            <JavaFileLoader
              fileModule={jsonServletJava}
              title="JsonServlet.java"
              highlightLines={[14,15,16]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Creates a JSON string (manually or using a library like Gson) and returns it.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">6. Dynamic Table from JSON Response</h3>
            <JavaFileLoader
              fileModule={dynamicTableJSP}
              title="dynamicTable.jsp"
              highlightLines={[15,16,17,18]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Fetches JSON data and builds an HTML table dynamically.
            </p>
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Applications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>Live Search / Autocomplete:</strong> As the user types, suggestions are fetched from the server.</li>
            <li><strong>Form Validation:</strong> Validate email or username availability without reloading.</li>
            <li><strong>Infinite Scrolling:</strong> Load more content as the user scrolls down.</li>
            <li><strong>Chat Applications:</strong> Poll the server for new messages and display them.</li>
            <li><strong>Dashboard Widgets:</strong> Refresh data (like stock prices) periodically.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: In a school system, AJAX can be used to fetch student details as you type their roll number, or to load exam results without refreshing the page.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use <code>response.setContentType("application/json")</code> to inform the browser of JSON data.</li>
            <li>For security, always validate and sanitize input on the server side.</li>
            <li>Handle errors gracefully: show user‑friendly messages when the request fails.</li>
            <li>Consider using a library like Gson or Jackson to convert Java objects to JSON easily.</li>
            <li>For larger applications, implement a RESTful API (e.g., using JAX‑RS or Spring MVC) instead of plain servlets.</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Forgetting to set response content type:</strong> Browser may not parse JSON/XML correctly.</li>
            <li>❌ <strong>Not handling asynchronous nature:</strong> Trying to use the result before the request completes.</li>
            <li>❌ <strong>Hardcoding URLs:</strong> Use relative paths or <code>{`\${pageContext.request.contextPath}`}</code> for portability.</li>
            <li>❌ <strong>Returning full HTML page fragments:</strong> Usually better to return structured data (JSON) and let client build UI.</li>
            <li>❌ <strong>Ignoring cross‑origin issues:</strong> If servlet is on a different domain, CORS headers must be set.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use the <code>fetch</code> API for modern browsers; fallback to XMLHttpRequest if needed.</li>
            <li>Always send a meaningful HTTP status code (200, 404, 500) and handle accordingly.</li>
            <li>Implement a loading indicator to improve user experience during requests.</li>
            <li>Keep servlets focused on data access; separate business logic into service classes.</li>
            <li>Log AJAX requests on the server for debugging.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> How would you implement a "check username availability" feature? The client would send the username, the servlet would query a database, and return a boolean or message.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> In the <code>jsonServlet.java</code>, we manually construct JSON. Can you think of a library that would make this easier?
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Modify the <code>dynamicTable.jsp</code> to sort the table by clicking on a column header, fetching sorted data from the server.
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand the AJAX workflow: client → server → update.</li>
            <li>✅ Know how to create XMLHttpRequest or use fetch().</li>
            <li>✅ Implement a servlet that returns JSON or plain text.</li>
            <li>✅ Handle the response and update DOM elements.</li>
            <li>✅ Set proper response content type.</li>
            <li>✅ Handle errors and loading states.</li>
            <li>✅ Consider using libraries for easier JSON handling.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`AJAX is a cornerstone of modern web applications. In my ${experienceYears} years of teaching (since 1998), I've seen students transform static JSPs into interactive, responsive applications once they grasp AJAX. 
        A common pitfall is trying to mix AJAX with full page submits. Remember that AJAX is asynchronous; you must handle the response in a callback. 
        When working with JSP, a typical pattern is to have a servlet act as a REST endpoint (returning JSON) and JSPs as the views. This keeps your code clean and maintainable.
        I recommend starting with fetch() and JSON, as they are the current standards. Don't forget to use the 'async/await' syntax to make your code cleaner. 
        Also, always consider security: validate inputs on the server side, and use HTTPS in production.`}
      />
    </div>
  );
};

export default Topic16;