import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import code examples from topic17_files
import scriptletBadJSP from "./topic17_files/scriptletBad.jsp?raw";
import jstlSafeJSP from "./topic17_files/jstlSafe.jsp?raw";
import elSafeJSP from "./topic17_files/elSafe.jsp?raw";
import customTagSafeJSP from "./topic17_files/customTagSafe.jsp?raw";
import xssVulnerableJSP from "./topic17_files/xssVulnerable.jsp?raw";
import xssSafeJSP from "./topic17_files/xssSafe.jsp?raw";
import mvcControllerJava from "./topic17_files/MvcController.java?raw";
import mvcViewJSP from "./topic17_files/mvcView.jsp?raw";

const Topic17 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Security Considerations: Avoiding Scriptlets
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Building secure JSP applications by eliminating scriptlets
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Why Avoid Scriptlets?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            Scriptlets (<code>&lt;% ... %&gt;</code>) embed Java code directly into JSP pages. While convenient, they introduce <strong>serious security risks</strong>:
            <strong>Cross‑Site Scripting (XSS)</strong>, <strong>SQL injection</strong>, and <strong>exposure of business logic</strong>. 
            Scriptlets also break the MVC pattern, making code hard to maintain and test.
          </p>
          <p className="leading-relaxed">
            Modern JSP development uses <strong>JSTL</strong>, <strong>EL</strong>, and <strong>custom tags</strong> to separate presentation from logic. 
            This approach not only improves security (by automatically escaping output) but also enforces best practices.
          </p>
        </div>
      </section>

      {/* SVG Diagram: Security Risks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Security Risks of Scriptlets (Visual)</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="750" height="280" viewBox="0 0 750 280" className="w-full max-w-4xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
                </marker>
              </defs>

              {/* Scriptlet */}
              <rect x="20" y="110" width="100" height="60" rx="8" fill="#7f1a1a" stroke="#ef4444" strokeWidth="2" />
              <text x="70" y="145" textAnchor="middle" fill="white">Scriptlet</text>

              {/* Arrows to vulnerabilities */}
              <line x1="120" y1="140" x2="160" y2="140" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="170" y="120" width="100" height="40" rx="8" fill="#7f1a1a" stroke="#ef4444" strokeWidth="2" />
              <text x="220" y="147" textAnchor="middle" fill="white">XSS</text>

              <line x1="70" y1="170" x2="70" y2="210" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="20" y="210" width="100" height="40" rx="8" fill="#7f1a1a" stroke="#ef4444" strokeWidth="2" />
              <text x="70" y="237" textAnchor="middle" fill="white">SQL Injection</text>

              <line x1="70" y1="170" x2="70" y2="210" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="20" y="210" width="100" height="40" rx="8" fill="#7f1a1a" stroke="#ef4444" strokeWidth="2" />
              <text x="70" y="237" textAnchor="middle" fill="white">SQL Injection</text>

              <line x1="70" y1="170" x2="70" y2="210" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="20" y="210" width="100" height="40" rx="8" fill="#7f1a1a" stroke="#ef4444" strokeWidth="2" />
              <text x="70" y="237" textAnchor="middle" fill="white">SQL Injection</text>

              {/* Additional risks */}
              <text x="370" y="150" fill="#ef4444" fontSize="12">+ Business logic exposure</text>
              <text x="370" y="170" fill="#ef4444" fontSize="12">+ Hard to test</text>
              <text x="370" y="190" fill="#ef4444" fontSize="12">+ Poor maintainability</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Scriptlets open multiple attack vectors and architectural flaws.
          </p>
        </div>
      </section>

      {/* Security Principles */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Key Security Principles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">1. Output Encoding</h3>
            <p className="leading-relaxed">
              Always escape dynamic content to prevent XSS. JSTL's <code>&lt;c:out&gt;</code> and EL automatically escape by default.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">2. Input Validation</h3>
            <p className="leading-relaxed">
              Validate and sanitize all user input on the server side before processing. Never trust client‑side validation alone.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">3. Parameterized Queries</h3>
            <p className="leading-relaxed">
              Use <code>PreparedStatement</code> to prevent SQL injection. Never concatenate user input into SQL strings.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">4. Separation of Concerns</h3>
            <p className="leading-relaxed">
              Follow MVC: JSPs only for presentation, servlets for control, JavaBeans for model. This limits exposure.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Code Examples: Scriptlet vs. Secure Alternatives</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. Bad: Scriptlet (Vulnerable to XSS)</h3>
            <JavaFileLoader
              fileModule={scriptletBadJSP}
              title="scriptletBad.jsp"
              highlightLines={[6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Directly outputs user input without escaping – enables XSS.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. Good: Using JSTL <code>&lt;c:out&gt;</code></h3>
            <JavaFileLoader
              fileModule={jstlSafeJSP}
              title="jstlSafe.jsp"
              highlightLines={[6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <code>&lt;c:out&gt;</code> escapes HTML/XML characters automatically, preventing XSS.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. Good: Using EL (Expression Language)</h3>
            <JavaFileLoader
              fileModule={elSafeJSP}
              title="elSafe.jsp"
              highlightLines={[6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              EL also escapes by default (since JSP 2.0). Ensure <code>isELIgnored="false"</code>.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. Good: Using Custom Tags</h3>
            <JavaFileLoader
              fileModule={customTagSafeJSP}
              title="customTagSafe.jsp"
              highlightLines={[6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Custom tags encapsulate logic and output, promoting reusability and security.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">5. XSS Vulnerability Example</h3>
            <JavaFileLoader
              fileModule={xssVulnerableJSP}
              title="xssVulnerable.jsp"
              highlightLines={[5]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>DANGEROUS:</strong> This page will execute JavaScript from the <code>name</code> parameter.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">6. XSS Protection with <code>&lt;c:out&gt;</code></h3>
            <JavaFileLoader
              fileModule={xssSafeJSP}
              title="xssSafe.jsp"
              highlightLines={[6]}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">7. MVC Pattern to Separate Logic</h3>
            <JavaFileLoader
              fileModule={mvcControllerJava}
              title="MvcController.java"
              highlightLines={[14,15,16]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Servlet handles logic and passes data to JSP view.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">8. JSP View in MVC (Safe)</h3>
            <JavaFileLoader
              fileModule={mvcViewJSP}
              title="mvcView.jsp"
              highlightLines={[6]}
            />
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Security Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>Escape all output:</strong> Always use <code>&lt;c:out&gt;</code> or EL when displaying user‑supplied data.</li>
            <li><strong>Use parameterized queries:</strong> In servlets/beans, use <code>PreparedStatement</code> instead of string concatenation.</li>
            <li><strong>Validate input:</strong> On the server, check types, lengths, and patterns (e.g., email format).</li>
            <li><strong>Disable scriptlets in web.xml:</strong> <code>&lt;scripting-invalid&gt;true&lt;/scripting-invalid&gt;</code> to enforce no scriptlets.</li>
            <li><strong>Set HTTP security headers:</strong> Use <code>Content-Security-Policy</code>, <code>X-Content-Type-Options: nosniff</code>, etc.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: A school management system in Barrackpore uses JSTL for all output; when a teacher enters student feedback, it's escaped to prevent script injection.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use <code>&lt;c:out value="{`\${userInput}`}" default="N/A" /&gt;</code> to provide a default and escape.</li>
            <li>For rich HTML output (e.g., from a WYSIWYG editor), use a library like OWASP Java Encoder to safely render HTML.</li>
            <li>In EL, you can also force escaping by setting <code>{`\${fn:escapeXml(userInput)}`}</code> (JSTL fn).</li>
            <li>Configure <code>web.xml</code> to disable scriptlets: <code>&lt;scripting-invalid&gt;true&lt;/scripting-invalid&gt;</code>.</li>
            <li>Use a security filter to set response headers and validate sessions.</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Assuming client‑side validation is enough:</strong> Always validate on the server.</li>
            <li>❌ <strong>Using <code>&lt;%= %&gt;</code> without escaping:</strong> This is as dangerous as scriptlets.</li>
            <li>❌ <strong>Concatenating SQL strings:</strong> Leads to SQL injection; use <code>PreparedStatement</code>.</li>
            <li>❌ <strong>Storing sensitive data in cookies or hidden fields:</strong> Use server-side sessions.</li>
            <li>❌ <strong>Forgetting to set character encoding:</strong> <code>request.setCharacterEncoding("UTF-8")</code> to prevent encoding attacks.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Adopt MVC framework like Spring MVC to enforce separation.</li>
            <li>Use a security library like OWASP ESAPI for additional protections.</li>
            <li>Regularly scan dependencies for vulnerabilities (e.g., using OWASP Dependency Check).</li>
            <li>Enable HTTPS and use secure session cookies (<code>HttpOnly</code>, <code>Secure</code> flags).</li>
            <li>Educate developers about common attacks (XSS, CSRF, SQL injection).</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> If you disable scriptlets in <code>web.xml</code>, what would happen to legacy JSPs that contain scriptlets? They would throw translation errors – forcing you to refactor.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> In the <code>xssSafe.jsp</code>, the scriptlet is replaced by <code>&lt;c:out&gt;</code>. How does <code>&lt;c:out&gt;</code> escape the input? Look at the generated HTML source.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Replace the <code>PreparedStatement</code> in the servlet with string concatenation and see how it would be vulnerable. Then fix it.
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand the risks of scriptlets: XSS, SQL injection, logic exposure.</li>
            <li>✅ Use JSTL (<code>&lt;c:out&gt;</code>) and EL to escape output.</li>
            <li>✅ Validate and sanitize all user input on the server side.</li>
            <li>✅ Use <code>PreparedStatement</code> for database queries.</li>
            <li>✅ Apply MVC pattern: servlets/beans for logic, JSPs only for presentation.</li>
            <li>✅ Disable scriptlets in <code>web.xml</code>.</li>
            <li>✅ Set secure HTTP headers and use HTTPS.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`Security is not an afterthought—it's a fundamental design requirement. In my ${experienceYears} years of teaching (since 1998), I've seen many applications compromised because developers used scriptlets without proper escaping. 
        The rule is simple: never trust user input. Always escape output. 
        Modern JSP development with JSTL and EL makes this easy. 
        I also strongly recommend disabling scriptlets entirely in your web.xml – it forces good habits. 
        Another critical point: use parameterized queries even in simple examples; it's the only way to prevent SQL injection. 
        Finally, educate your team on OWASP Top 10 and use tools like static code analyzers to catch vulnerabilities early.`}
      />
    </div>
  );
};

export default Topic17;