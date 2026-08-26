// Topic16.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import StrutsActionExample from "./topic16_files/StrutsLoginAction.java?raw";
import StrutsConfigXml from "./topic16_files/struts-config.xml?raw";
import SpringMvcController from "./topic16_files/SpringHelloController.java?raw";
import SpringConfig from "./topic16_files/spring-config.xml?raw";
import WebXmlFrameworks from "./topic16_files/web.xml?raw";

// FAQ questions for this topic
import questions from "./topic16_files/topic16_questions";

const Topic16 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
            Introduction to Web Frameworks (Struts, Spring MVC)
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From plain servlets to enterprise frameworks – understanding Struts 2 and Spring MVC.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
        >
          <h2 className="text-2xl font-semibold text-emerald-400 flex items-center gap-2">
            <span>🏗️</span> Why Web Frameworks?
          </h2>
          <p className="mt-3 text-gray-300">
            While servlets and JSP provide the foundation, building large applications with them leads to repetitive code (boilerplate), scattered navigation logic, and low maintainability. Web frameworks abstract common tasks:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
            <li>Request handling and routing (front controller)</li>
            <li>Form validation and data binding</li>
            <li>Dependency injection (Spring)</li>
            <li>View resolution and internationalisation</li>
          </ul>
          <p className="mt-3 text-gray-300">
            Two historically dominant frameworks: <strong>Apache Struts 2</strong> (based on MVC) and <strong>Spring MVC</strong> (part of Spring Framework). Both are built on servlet technology.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-emerald-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world context:</strong> The school’s admission portal was rewritten from plain servlets to Spring MVC. Now adding a new form takes minutes instead of days. Struts is still used in many legacy systems across banks and government.
            </p>
          </div>
        </section>

        {/* SVG: Framework Layers */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">📦 Framework Architecture (vs Servlet)</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 750 220" className="w-full max-w-4xl h-auto">
              <rect x="20" y="20" width="150" height="180" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="95" y="45" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Plain Servlet</text>
              <rect x="45" y="70" width="100" height="30" rx="4" fill="#2d3748" stroke="#60a5fa" />
              <text x="95" y="90" textAnchor="middle" fill="#93c5fd" fontSize="10">Servlet</text>
              <rect x="45" y="115" width="100" height="30" rx="4" fill="#2d3748" stroke="#60a5fa" />
              <text x="95" y="135" textAnchor="middle" fill="#93c5fd" fontSize="10">JSP</text>
              <text x="95" y="170" textAnchor="middle" fill="#9ca3af" fontSize="10">Manual wiring</text>

              <rect x="220" y="20" width="230" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="335" y="45" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="bold">Struts 2</text>
              <rect x="245" y="70" width="180" height="25" rx="4" fill="#2d3748" stroke="#fcd34d" />
              <text x="335" y="87" textAnchor="middle" fill="#fde68a" fontSize="10">FilterDispatcher (Front Controller)</text>
              <rect x="245" y="105" width="180" height="25" rx="4" fill="#2d3748" stroke="#fcd34d" />
              <text x="335" y="122" textAnchor="middle" fill="#fde68a" fontSize="10">Action (POJO)</text>
              <rect x="245" y="140" width="180" height="25" rx="4" fill="#2d3748" stroke="#fcd34d" />
              <text x="335" y="157" textAnchor="middle" fill="#fde68a" fontSize="10">Result (JSP/FreeMarker)</text>
              <text x="335" y="185" textAnchor="middle" fill="#9ca3af" fontSize="10">XML/Annotation config</text>

              <rect x="500" y="20" width="230" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="615" y="45" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">Spring MVC</text>
              <rect x="525" y="70" width="180" height="25" rx="4" fill="#2d3748" stroke="#6ee7b7" />
              <text x="615" y="87" textAnchor="middle" fill="#a7f3d0" fontSize="10">DispatcherServlet</text>
              <rect x="525" y="105" width="180" height="25" rx="4" fill="#2d3748" stroke="#6ee7b7" />
              <text x="615" y="122" textAnchor="middle" fill="#a7f3d0" fontSize="10">@Controller + @RequestMapping</text>
              <rect x="525" y="140" width="180" height="25" rx="4" fill="#2d3748" stroke="#6ee7b7" />
              <text x="615" y="157" textAnchor="middle" fill="#a7f3d0" fontSize="10">ViewResolver → JSP/Thymeleaf</text>
              <text x="615" y="185" textAnchor="middle" fill="#9ca3af" fontSize="10">Java config / annotations</text>
            </svg>
          </div>
        </section>

        {/* 1. Apache Struts 2 Overview */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">🎭 Apache Struts 2 – Action‑Based MVC</h2>
          <p className="mt-3 text-gray-300">
            Struts 2 combines WebWork and Struts 1. It uses a <strong>FilterDispatcher</strong> (now StrutsPrepareAndExecuteFilter) as the front controller. Actions are simple POJOs with an <code>execute()</code> method. Configuration is mainly XML (<code>struts.xml</code>).
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>Form → Action → Result (JSP)</li>
            <li>Built‑in validation and interceptors</li>
            <li>OGNL for data binding</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={StrutsActionExample}
              title="LoginAction.java – Struts 2 Action"
              highlightLines={[4, 6, 7, 8, 9, 10, 11]}
            />
          </div>
          <div className="mt-4">
            <JavaFileLoader
              fileModule={StrutsConfigXml}
              title="struts.xml – Action Mapping"
              highlightLines={[2, 3, 4, 5]}
            />
          </div>
        </section>

        {/* 2. Spring MVC Overview */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-emerald-400">🍃 Spring MVC – Annotation‑Driven, Flexible</h2>
          <p className="mt-3 text-gray-300">
            Spring MVC is part of the Spring Framework. It uses <strong>DispatcherServlet</strong> as front controller. Controllers are annotated with <code>@Controller</code> and <code>@RequestMapping</code>. It integrates seamlessly with Spring’s dependency injection and other modules (Security, Data, Boot).
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>POJO controllers with method‑level mappings</li>
            <li>Powerful data binding and validation</li>
            <li>Flexible view resolution (JSP, Thymeleaf, JSON, etc.)</li>
          </ul>
          <JavaFileLoader
            fileModule={SpringMvcController}
            title="HelloController.java – Spring MVC"
            highlightLines={[5, 6, 8, 9, 10]}
          />
        </section>

        {/* 3. Spring Configuration (JavaConfig) */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-emerald-400">⚙️ Spring MVC Configuration (JavaConfig)</h2>
          <p className="mt-3 text-gray-300">Modern Spring uses <code>@Configuration</code> and <code>@EnableWebMvc</code> instead of XML.</p>
          <JavaFileLoader
            fileModule={SpringConfig}
            title="WebConfig.java – Spring Java Config"
            highlightLines={[5, 6, 7, 8]}
          />
        </section>

        {/* 4. web.xml for both frameworks */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-emerald-400">📄 web.xml Integration</h2>
          <p className="mt-3 text-gray-300">Both frameworks are just servlets at heart – they require a front controller servlet or filter to be configured in web.xml.</p>
          <JavaFileLoader
            fileModule={WebXmlFrameworks}
            title="web.xml – Struts2 & Spring MVC Front Controllers"
            highlightLines={[6, 7, 15, 16]}
          />
        </section>

        {/* Comparison Table */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-emerald-400">📊 Struts 2 vs Spring MVC</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-800 text-emerald-300">
                <tr><th className="px-4 py-2">Aspect</th><th>Struts 2</th><th>Spring MVC</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr><td className="px-4 py-2">Front Controller</td><td>Filter (StrutsPrepareAndExecuteFilter)</td><td>Servlet (DispatcherServlet)</td></tr>
                <tr><td className="px-4 py-2">Configuration</td><td>XML (struts.xml) or annotations</td><td>Annotations + JavaConfig / XML</td></tr>
                <tr><td className="px-4 py-2">Action / Controller</td><td>POJO with execute()</td><td>POJO with @RequestMapping methods</td></tr>
                <tr><td className="px-4 py-2">Dependency Injection</td><td>Limited (via Spring plugin)</td><td>Full Spring DI (native)</td></tr>
                <tr><td className="px-4 py-2">View Technology</td><td>JSP, FreeMarker, Velocity</td><td>JSP, Thymeleaf, JSON, XML, etc.</td></tr>
                <tr><td className="px-4 py-2">Popularity today</td><td>Legacy systems</td><td>Very high (Spring Boot)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Spring MVC became dominant */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-emerald-400">📈 Why Spring MVC Dominates Today</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Seamless integration with Spring ecosystem (Data, Security, Cloud)</li>
            <li>Annotation‑driven, minimal XML</li>
            <li>Excellent REST support (<code>@RestController</code>)</li>
            <li>Spring Boot makes configuration effortless</li>
          </ul>
          <p className="mt-3 text-gray-300">Struts 2 still appears in older enterprise apps, but most new projects choose Spring MVC or other modern frameworks (e.g., Micronaut, Quarkus).</p>
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><strong>Struts 2:</strong> Forgetting the <code>execute()</code> method or returning wrong result string.</li>
            <li><strong>Struts 2:</strong> Not including the Struts filter mapping in web.xml → 404.</li>
            <li><strong>Spring MVC:</strong> Missing <code>@EnableWebMvc</code> or component scanning – controllers not found.</li>
            <li><strong>Spring MVC:</strong> Returning a view name that does not resolve (no ViewResolver configured).</li>
            <li><strong>Both:</strong> Mixing framework annotations with servlet code incorrectly.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">✅ Best Practices</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>For new projects, prefer Spring MVC (or Spring Boot) over Struts.</li>
            <li>Understand that frameworks are built on servlets – your servlet knowledge is transferable.</li>
            <li>Use convention over configuration where possible.</li>
            <li>Keep controllers thin and delegate business logic to services.</li>
            <li>Prefer Java config over XML for Spring.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Understand servlets are the foundation",
              "✅ Know Struts 2: FilterDispatcher, Action, Result",
              "✅ Know Spring MVC: DispatcherServlet, @Controller",
              "✅ Configure front controller in web.xml",
              "✅ Write a simple action/controller",
              "✅ Define view (JSP) and test",
              "✅ Compare two frameworks",
              "✅ Recognise role of dependency injection",
              "✅ Prefer Spring MVC for new work",
              "✅ Document framework choice for maintainability"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-emerald-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-emerald-500/30"
        >
          <h2 className="text-xl font-semibold text-emerald-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Look at the stack trace – it still goes through servlet containers.</li>
            <li>⚙️ <strong>Try changing:</strong> Convert a plain servlet/JSP login page into a Spring MVC controller – see how much code is removed.</li>
            <li>📂 <strong>Think about:</strong> Why did Struts 2 use XML while Spring moved to annotations? (Easier to see mappings in code).</li>
            <li>🧩 <strong>Debug:</strong> A 404 in Spring MVC – check if the DispatcherServlet is mapped and if @RequestMapping path matches.</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Web Frameworks FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="End the servlet series by showing students where the industry has moved. Emphasise that servlets are still inside every framework – they didn't learn obsolete material. A live demo: build a simple 'Hello World' in both Struts 2 and Spring MVC so they see the difference. For capstone, let them refactor a earlier servlet assignment into a Spring MVC project. They’ll appreciate how much boilerplate frameworks eliminate." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 16: Introduction to Web Frameworks (Struts, Spring MVC) – End of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic16;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>