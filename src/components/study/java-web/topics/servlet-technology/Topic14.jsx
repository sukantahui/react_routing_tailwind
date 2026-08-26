// Topic14.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java & JSP example files (raw imports)
import MvcControllerServlet from "./topic14_files/StudentController.java?raw";
import StudentModel from "./topic14_files/Student.java?raw";
import StudentViewJsp from "./topic14_files/studentView.jsp?raw";
import LoginMvcServlet from "./topic14_files/LoginController.java?raw";
import ProductListServlet from "./topic14_files/ProductController.java?raw";

// FAQ questions for this topic
import questions from "./topic14_files/topic14_questions";

const Topic14 = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark min-h-screen bg-gray-950 text-gray-100 font-sans leading-relaxed p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            MVC Architecture with Servlets and JSP
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Model‑View‑Controller – separating concerns for maintainable, scalable web applications.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
            <span>🏛️</span> What is MVC?
          </h2>
          <p className="mt-3 text-gray-300">
            MVC (Model‑View‑Controller) is a design pattern that separates an application into three interconnected components:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
            <li><strong>Model</strong> – data and business logic (e.g., Java beans, database access).</li>
            <li><strong>View</strong> – presentation layer (typically JSP, HTML).</li>
            <li><strong>Controller</strong> – request handler (Servlet) that processes input, updates model, and selects view.</li>
          </ul>
          <p className="mt-3 text-gray-300">
            In servlet/JSP applications, the servlet acts as the Controller, JSP as the View, and plain Java classes as the Model. This separation improves maintainability, testability, and team collaboration.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-blue-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>School analogy:</strong> At Shyamnagar Public School, the principal (Controller) receives a request (parent wants student grades). The principal fetches data from the office computer (Model) and hands a formatted report (View) to the parent. The parent never touches the office computer directly.
            </p>
          </div>
        </section>

        {/* SVG: MVC Flow */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">🔄 MVC Request Flow</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 750 200" className="w-full max-w-4xl h-auto">
              <rect x="20" y="30" width="120" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="80" y="55" textAnchor="middle" fill="#93c5fd" fontSize="13">Client</text>
              <text x="80" y="72" textAnchor="middle" fill="#9ca3af" fontSize="10">Browser</text>

              <rect x="190" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="260" y="50" textAnchor="middle" fill="#fcd34d" fontSize="13">Controller</text>
              <text x="260" y="67" textAnchor="middle" fill="#9ca3af" fontSize="10">Servlet</text>

              <rect x="380" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="450" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="13">Model</text>
              <text x="450" y="67" textAnchor="middle" fill="#9ca3af" fontSize="10">Java Bean / DB</text>

              <rect x="570" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="640" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="13">View</text>
              <text x="640" y="67" textAnchor="middle" fill="#9ca3af" fontSize="10">JSP</text>

              <line x1="140" y1="55" x2="188" y2="55" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrMvc)" />
              <line x1="330" y1="55" x2="378" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrMvc)" />
              <line x1="520" y1="55" x2="568" y2="55" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrMvc)" />

              <defs>
                <marker id="arrMvc" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#3b82f6" />
                </marker>
              </defs>
              <text x="260" y="125" textAnchor="middle" fill="#9ca3af" fontSize="11">1. Request →</text>
              <text x="450" y="125" textAnchor="middle" fill="#9ca3af" fontSize="11">2. Fetch/Update Model →</text>
              <text x="640" y="125" textAnchor="middle" fill="#9ca3af" fontSize="11">3. Forward to View</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Steps: Client request → Controller (Servlet) → Model (data) → View (JSP) → Response back to client.
          </p>
        </section>

        {/* 1. Model - Java Bean */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">📦 Model – Java Bean / Data Layer</h2>
          <p className="mt-3 text-gray-300">
            The Model represents data and business logic. In simple MVC, it's often a POJO (Plain Old Java Object) with properties and getters/setters. It may also contain data access logic (DAO pattern).
          </p>
          <JavaFileLoader
            fileModule={StudentModel}
            title="Student.java – Model Class"
            highlightLines={[3, 4, 5, 11, 14]}
          />
        </section>

        {/* 2. Controller - Servlet */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">🎮 Controller – Servlet as Orchestrator</h2>
          <p className="mt-3 text-gray-300">
            The servlet receives the request, interacts with the Model (e.g., fetches data from database), stores the data in request attributes, and forwards to a JSP for rendering.
          </p>
          <JavaFileLoader
            fileModule={MvcControllerServlet}
            title="StudentController.java – Servlet Controller"
            highlightLines={[12, 13, 14, 16, 17, 18]}
          />
          <div className="mt-4 p-3 bg-blue-950/30 border-l-4 border-blue-500 rounded">
            <p className="text-sm">💡 <strong>Tip:</strong> Always forward to JSPs placed under <code>/WEB-INF/views/</code> to prevent direct access.</p>
          </div>
        </section>

        {/* 3. View - JSP */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">🖼️ View – JSP for Presentation</h2>
          <p className="mt-3 text-gray-300">
            {`JSP focuses on displaying data passed by the controller. Use JSTL (EL) to access attributes. Avoid scriptlets (<% %>) – keep logic out of the view.`}
          </p>
          <JavaFileLoader
            fileModule={StudentViewJsp}
            title="studentView.jsp – View File"
            highlightLines={[1, 6, 7, 8, 9]}
          />
        </section>

        {/* 4. Complete Example: Login MVC */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-blue-400">🔐 Complete MVC Example – Login Flow</h2>
          <p className="mt-3 text-gray-300">Controller validates credentials, sets model (user object), and forwards to success or error view.</p>
          <JavaFileLoader
            fileModule={LoginMvcServlet}
            title="LoginController.java – Full MVC Controller"
            highlightLines={[12, 13, 14, 15, 16, 17]}
          />
        </section>

        {/* 5. Product List Example (Model List) */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-blue-400">📋 MVC with List Data</h2>
          <p className="mt-3 text-gray-300">Often you need to pass a collection of objects from model to view.</p>
          <JavaFileLoader
            fileModule={ProductListServlet}
            title="ProductController.java – List of Products"
            highlightLines={[12, 13, 14, 15]}
          />
        </section>

        {/* Benefits of MVC */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">✅ Benefits of MVC with Servlets & JSP</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Separation of concerns</strong> – each component has a single responsibility.</li>
            <li><strong>Reusability</strong> – same model can be used by different views.</li>
            <li><strong>Maintainability</strong> – change UI without touching controller logic.</li>
            <li><strong>Testability</strong> – model and controller can be unit tested independently.</li>
            <li><strong>Team collaboration</strong> – frontend developers work on JSPs, backend on servlets/models.</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">⚠️ Common Pitfalls</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Putting business logic in JSP (scriptlets)</strong> – makes code unreadable and untestable.</li>
            <li><strong>Direct database calls from JSP</strong> – violates MVC and security.</li>
            <li><strong>Forwarding to JSPs not under WEB-INF</strong> – users can bypass controller by accessing JSP directly.</li>
            <li><strong>Overloading the controller with too many responsibilities</strong> – use multiple servlets per resource.</li>
            <li><strong>Not using request attributes correctly</strong> – attributes must be set before forward.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">✅ Best Practices (Professional)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Keep JSPs clean: use JSTL, EL, custom tags – no Java code.</li>
            <li>Place all JSPs under /WEB-INF/views or similar to enforce controller-only access.</li>
            <li>Use a single front controller (DispatcherServlet) pattern for advanced applications, or one servlet per logical resource.</li>
            <li>Implement DAO (Data Access Object) pattern for database operations – separate from model beans.</li>
            <li>Use request.setAttribute() to pass model objects, not session (unless needed across requests).</li>
            <li>Create a base servlet or interceptor for cross-cutting concerns (logging, authentication).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Identify Model (data + logic)",
              "✅ Identify Controller (servlet)",
              "✅ Identify View (JSP)",
              "✅ Controller fetches model and forwards",
              "✅ JSP uses EL to display model data",
              "✅ No scriptlets in JSP",
              "✅ Store JSPs under WEB‑INF",
              "✅ Use request attributes, not session",
              "✅ Plan separate servlets per resource",
              "✅ Test controller with mock model"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-blue-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-blue-500/30"
        >
          <h2 className="text-xl font-semibold text-blue-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Check the URL bar when you visit a page – if it's a JSP directly, that's bad MVC. Good MVC keeps the servlet URL.</li>
            <li>⚙️ <strong>Try changing:</strong> Move a JSP out of WEB‑INF and access it directly – see how it bypasses the controller.</li>
            <li>📂 <strong>Think about:</strong> How would you refactor a monolithic JSP that contains database queries into proper MVC? (Create a servlet, extract DB code to model, forward to JSP).</li>
            <li>🧩 <strong>Debug:</strong> Use browser dev tools to see the request chain; ensure servlet is called, not the JSP directly.</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="MVC Architecture FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="MVC is the foundation of almost every web framework (Struts, Spring MVC). Emphasise that students should never put database queries inside JSPs – that's an anti-pattern. A great classroom exercise: take a messy JSP that displays student grades and mixes HTML, Java, and SQL. Refactor it step by step: extract model (StudentGrade class), create a servlet controller, and finally a clean JSP. Also show them how to protect JSPs by placing them under WEB‑INF. This lesson bridges basic servlets to modern frameworks." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 14: MVC Architecture with Servlets and JSP – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic14;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>