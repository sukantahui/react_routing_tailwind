import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import code examples from topic12_files
import frontControllerServlet from "./topic12_files/FrontControllerServlet.java?raw";
import loginController from "./topic12_files/LoginController.java?raw";
import studentListJSP from "./topic12_files/studentList.jsp?raw";
import loginJSP from "./topic12_files/login.jsp?raw";
import webXML from "./topic12_files/web.xml?raw";

const Topic12 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          MVC with JSP and Servlets (Front Controller Pattern)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Separating concerns for maintainable web applications
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">What is MVC and Front Controller?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            <strong>Model-View-Controller (MVC)</strong> is a design pattern that separates an application into three interconnected components:
            <strong>Model</strong> (data/business logic), <strong>View</strong> (presentation), and <strong>Controller</strong> (request handling).
          </p>
          <p className="leading-relaxed">
            The <strong>Front Controller</strong> pattern is a specialized controller that handles all incoming requests, centralizes common logic (authentication, logging), and delegates to appropriate handlers. 
            In JSP/Servlet applications, the Front Controller is typically a servlet that dispatches to JSP views or other servlets based on the request.
          </p>
          <p className="leading-relaxed mt-2">
            This approach promotes <strong>separation of concerns</strong>, making the application easier to maintain, test, and scale.
          </p>
        </div>
      </section>

      {/* SVG Diagram: MVC Flow */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">MVC + Front Controller Flow</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="750" height="280" viewBox="0 0 750 280" className="w-full max-w-4xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              {/* Client */}
              <rect x="20" y="110" width="80" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="145" textAnchor="middle" fill="white">Client</text>

              {/* Arrow */}
              <line x1="100" y1="140" x2="140" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Front Controller Servlet */}
              <rect x="150" y="100" width="120" height="80" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="210" y="135" textAnchor="middle" fill="white">Front Controller</text>
              <text x="210" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">(Servlet)</text>

              {/* Arrow down to Action */}
              <line x1="210" y1="180" x2="210" y2="220" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Action/Command */}
              <rect x="150" y="220" width="120" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="210" y="252" textAnchor="middle" fill="white">Action/Command</text>

              {/* Arrow right to Model */}
              <line x1="270" y1="245" x2="310" y2="245" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Model */}
              <rect x="320" y="220" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="370" y="252" textAnchor="middle" fill="white">Model</text>

              {/* Arrow up from Model to Controller */}
              <line x1="370" y1="220" x2="370" y2="180" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Dispatcher */}
              <rect x="320" y="140" width="100" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="370" y="165" textAnchor="middle" fill="white">Dispatcher</text>

              {/* Arrow right to View */}
              <line x1="420" y1="160" x2="460" y2="160" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* View (JSP) */}
              <rect x="470" y="130" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="520" y="165" textAnchor="middle" fill="white">View (JSP)</text>

              {/* Arrow back to Client */}
              <line x1="570" y1="160" x2="610" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="590" y="120" textAnchor="middle" fill="#9ca3af" fontSize="10">Response</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            The Front Controller receives all requests, delegates to commands, interacts with the model, and forwards to the appropriate view.
          </p>
        </div>
      </section>

      {/* Components Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Key Components</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Model</h3>
            <p className="leading-relaxed">
              JavaBeans or POJOs that hold data and business logic. In a school system, Student, Teacher, Course classes.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">View</h3>
            <p className="leading-relaxed">
              JSP pages that present data using JSTL/EL. They contain no business logic, only presentation.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Controller</h3>
            <p className="leading-relaxed">
              A servlet (Front Controller) that receives requests, delegates to command objects, and forwards to the view.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Implementation Examples</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. Front Controller Servlet</h3>
            <JavaFileLoader
              fileModule={frontControllerServlet}
              title="FrontControllerServlet.java"
              highlightLines={[15,16,17,18,19,20]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              The main entry point that handles all requests, extracts the <code>action</code> parameter, and delegates to command classes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. Command Implementation (LoginController)</h3>
            <JavaFileLoader
              fileModule={loginController}
              title="LoginController.java"
              highlightLines={[6,7,8]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Each command implements a common interface and returns a view name after processing.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. View (login.jsp)</h3>
            <JavaFileLoader
              fileModule={loginJSP}
              title="login.jsp"
              highlightLines={[8,9]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Simple JSP form that submits to the Front Controller with an action parameter.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. View (studentList.jsp)</h3>
            <JavaFileLoader
              fileModule={studentListJSP}
              title="studentList.jsp"
              highlightLines={[5,6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              JSP that displays a list of students using JSTL. Data is passed from the controller via request attributes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">5. web.xml Configuration</h3>
            <JavaFileLoader
              fileModule={webXML}
              title="web.xml"
              highlightLines={[6,7,8,9,10]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Maps the Front Controller to a URL pattern (e.g., <code>/controller/*</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Applications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>Enterprise Applications:</strong> Large systems use Front Controller to centralize security, logging, and navigation.</li>
            <li><strong>Frameworks:</strong> Spring MVC, Struts, and other frameworks are built on this pattern.</li>
            <li><strong>School Portals:</strong> A single controller can handle student registration, fee payment, exam results, etc., by dispatching to specific commands.</li>
            <li><strong>REST APIs:</strong> Even RESTful APIs use a similar pattern where a dispatcher routes to resource handlers.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: In a school system at Barrackpore, a <code>/app/*</code> servlet could route <code>/app/student/list</code> to a command that retrieves students and forwards to <code>studentList.jsp</code>.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use a <strong>command interface</strong> to enforce consistent execution across all actions.</li>
            <li>Implement a <strong>request processor</strong> to pre-populate common data (e.g., user session) before command execution.</li>
            <li>Store view names as constants to avoid typos.</li>
            <li>Use <strong>request dispatcher</strong> for forwarding; never include business logic in JSPs.</li>
            <li>Consider using <strong>ActionForm</strong> objects to encapsulate request parameters and validation.</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Leaking business logic into JSPs:</strong> JSPs should only display data, not process it.</li>
            <li>❌ <strong>Hardcoding action names:</strong> Use a configuration file (e.g., XML or properties) to map actions to command classes.</li>
            <li>❌ <strong>Forgetting to set the character encoding:</strong> Ensure request/response encoding is set in the controller.</li>
            <li>❌ <strong>Not handling exceptions:</strong> Centralize exception handling in the controller to show friendly error pages.</li>
            <li>❌ <strong>Using <code>redirect</code> instead of <code>forward</code></strong> when you need to preserve request attributes.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Keep controllers thin: move business logic to service classes (Model).</li>
            <li>Use JSTL and EL for views; avoid scriptlets.</li>
            <li>Validate input in the controller before calling the model.</li>
            <li>Implement a <strong>base command</strong> that provides common services like logging and authentication.</li>
            <li>Use <strong>dependency injection</strong> (via frameworks or manual) to make commands testable.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> How would you implement a logout feature without modifying every JSP? The Front Controller can handle it by checking a parameter and clearing the session.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> The <code>FrontControllerServlet</code> uses a <code>Map</code> to look up commands. What would happen if the map didn't contain a key? How would you handle 404?
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Modify the <code>LoginController</code> to also set a welcome message attribute after successful login. Display it on the home page.
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand the MVC pattern and separation of concerns.</li>
            <li>✅ Know the role of Front Controller: central request handling.</li>
            <li>✅ Implement commands with a common interface.</li>
            <li>✅ Use request dispatcher to forward to JSPs.</li>
            <li>✅ Store data in request/session attributes and display via JSTL/EL.</li>
            <li>✅ Map the controller servlet in web.xml.</li>
            <li>✅ Avoid scriptlets and business logic in JSPs.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`The MVC pattern is the foundation of professional web development. In my ${experienceYears} years of teaching (since 1998), I've seen that students who master this pattern can build maintainable, scalable applications. The Front Controller pattern adds a layer of abstraction that simplifies adding cross-cutting concerns like security and logging. 
        A common mistake is to put too much code in the controller (fat controller). Always delegate heavy lifting to service objects. Also, remember that the view should only display data – no complex logic. 
        Use the request object to pass data to the view, and consider using a request-scoped bean to hold form data. This approach makes your application testable and easier to debug. 
        For example, when building a school management system, you can have a single controller that handles all student-related actions: /student?action=list, /student?action=add, etc. This keeps your URL structure clean and centralizes authorization checks.`}
      />
    </div>
  );
};

export default Topic12;