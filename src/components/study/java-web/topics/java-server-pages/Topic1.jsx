import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw JSP examples
import scriptletExample from "./topic1_files/scriptlet_example.jsp?raw";
import expressionExample from "./topic1_files/expression_example.jsp?raw";
import declarationExample from "./topic1_files/declaration_example.jsp?raw";
import combinedExample from "./topic1_files/combined_example.jsp?raw";

// ----------------------------------------------------------------------
// Inline keyframes for animations (no config needed)
const animationKeyframes = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
// ----------------------------------------------------------------------

const Topic1 = () => {
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
                    Scriptlet, Expression, Declaration
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    The three core scripting elements of JSP – how to embed Java code in your pages.
                </p>
            </header>

            {/* Introduction Section */}
            <section
                className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
                style={{ animationDelay: `${delays[0]}ms`, animationFillMode: "both" }}
            >
                <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">
                    What are Scripting Elements?
                </h2>
                <p className="mb-3">
                    JSP provides three types of scripting elements that allow you to insert Java code
                    directly into your HTML. They are translated into servlet code by the container
                    (as we learned in Topic 0). Understanding them is essential for working with
                    legacy JSPs and grasping how JSP evolved into modern view technologies.
                </p>
                <p className="mb-2">
                    <strong className="text-indigo-600 dark:text-indigo-400">
                        Real‑world analogy:
                    </strong>{" "}
                    Think of a classroom blackboard. The <strong>declaration</strong> is like writing
                    a rule that stays for the whole day (class‑level). The <strong>scriptlet</strong>
                    is like a teacher's step‑by‑step instruction during a lesson (inside _jspService).
                    The <strong>expression</strong> is like the answer written on the board – it
                    appears directly to the students (output).
                </p>
                <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <p className="text-sm italic">
                        <span className="font-semibold">💡 Teacher's Note (Sukanta Hui):</span>{" "}
                        Students like Swadeep from Barrackpore often ask: "Why do we need three
                        different ways?" The answer lies in where the code ends up in the generated
                        servlet. Declarations go outside <code>_jspService</code>, scriptlets go inside,
                        and expressions are just shorthand for <code>out.print()</code>.
                    </p>
                </div>
            </section>

            {/* SVG Illustration for the three elements */}
            <section
                className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
                style={{ animationDelay: `${delays[1]}ms`, animationFillMode: "both" }}
            >
                <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
                    The Three Scripting Elements
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <svg
                        viewBox="0 0 800 300"
                        className="w-full h-auto"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Declaration Box */}
                        <g transform="translate(80,60)">
                            <rect
                                x="0"
                                y="0"
                                width="160"
                                height="100"
                                rx="10"
                                fill="#fef3c7"
                                stroke="#d97706"
                                strokeWidth="2"
                                className="transition-all duration-300 hover:fill-amber-100 dark:hover:fill-amber-900/50"
                            />
                            <text x="80" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
                                &lt;%! ... %&gt;
                            </text>
                            <text x="80" y="45" textAnchor="middle" fontSize="12" fill="#92400e">
                                Declaration
                            </text>
                            <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#6b7280">
                                Methods / fields
                            </text>
                            <text x="80" y="85" textAnchor="middle" fontSize="10" fill="#6b7280">
                                (outside _jspService)
                            </text>
                        </g>

                        {/* Arrow to Servlet Class representation */}
                        <line
                            x1="240"
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

                        {/* Simple Servlet Class Outline */}
                        <g transform="translate(320,40)">
                            <rect
                                x="0"
                                y="0"
                                width="280"
                                height="180"  // Increased height to fit all lines
                                rx="5"
                                fill="#e0f2fe"
                                stroke="#0284c7"
                                strokeWidth="2"
                                className="transition-all duration-300 hover:fill-sky-100 dark:hover:fill-sky-900/50"
                            />
                            <text x="140" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
                                Generated Servlet
                            </text>
                            <text x="20" y="50" fontSize="10" fill="#0369a1">{`public class index_jsp extends HttpJspBase {`}</text>
                            <text x="30" y="70" fontSize="10" fill="#0369a1">// Declaration code becomes members</text>
                            <text x="30" y="90" fontSize="10" fill="#0369a1">{`public void _jspService(...) {`}</text>
                            <text x="40" y="110" fontSize="10" fill="#0369a1">// Scriptlet code goes here</text>
                            <text x="40" y="130" fontSize="10" fill="#0369a1">// Expression becomes out.print(...)</text>
                            <text x="30" y="150" fontSize="10" fill="#0369a1">{`}`}</text>
                            <text x="20" y="170" fontSize="10" fill="#0369a1">{`}`}</text>
                        </g>

                        {/* Scriptlet Box */}
                        <g transform="translate(80,170)">
                            <rect
                                x="0"
                                y="0"
                                width="160"
                                height="100"
                                rx="10"
                                fill="#d1fae5"
                                stroke="#059669"
                                strokeWidth="2"
                                className="transition-all duration-300 hover:fill-emerald-100 dark:hover:fill-emerald-900/50"
                            />
                            <text x="80" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#065f46">
                                &lt;% ... %&gt;
                            </text>
                            <text x="80" y="45" textAnchor="middle" fontSize="12" fill="#065f46">
                                Scriptlet
                            </text>
                            <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#6b7280">
                                Java statements
                            </text>
                            <text x="80" y="85" textAnchor="middle" fontSize="10" fill="#6b7280">
                                (inside _jspService)
                            </text>
                        </g>

                        {/* Expression Box */}
                        <g transform="translate(440,170)">
                            <rect
                                x="0"
                                y="0"
                                width="160"
                                height="100"
                                rx="10"
                                fill="#fae8ff"
                                stroke="#a21caf"
                                strokeWidth="2"
                                className="transition-all duration-300 hover:fill-fuchsia-100 dark:hover:fill-fuchsia-900/50"
                            />
                            <text x="80" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#86198f">
                                &lt;%= ... %&gt;
                            </text>
                            <text x="80" y="45" textAnchor="middle" fontSize="12" fill="#86198f">
                                Expression
                            </text>
                            <text x="80" y="70" textAnchor="middle" fontSize="10" fill="#6b7280">
                                Evaluates and outputs
                            </text>
                            <text x="80" y="85" textAnchor="middle" fontSize="10" fill="#6b7280">
                                (becomes out.print())
                            </text>
                        </g>
                    </svg>
                </div>
            </section>

            {/* Detailed Cards for Each Element */}
            <section
                className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-3 animate-[fadeSlideUp_0.6s_ease-out]"
                style={{ animationDelay: `${delays[2]}ms`, animationFillMode: "both" }}
            >
                {/* Declaration Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-amber-200 dark:border-amber-900 hover:shadow-lg transition-all duration-300 hover:border-amber-400 dark:hover:border-amber-700">
                    <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center">
                        <span className="mr-2">📜</span> Declaration
                    </h3>
                    <p className="text-sm mb-2">
                        <strong>Syntax:</strong> <code>&lt;%! Java code %&gt;</code>
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Purpose:</strong> Define methods or instance variables that become
                        members of the generated servlet class. They are initialized when the servlet
                        is loaded.
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Example:</strong>
                    </p>
                    <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                        {`<%! 
  private int counter = 0;
  public String greet(String name) {
    return "Hello " + name;
  }
%>`}
                    </pre>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        ⚠️ Not thread‑safe if you modify instance variables without synchronization.
                    </p>
                </div>

                {/* Scriptlet Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-emerald-200 dark:border-emerald-900 hover:shadow-lg transition-all duration-300 hover:border-emerald-400 dark:hover:border-emerald-700">
                    <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center">
                        <span className="mr-2">📝</span> Scriptlet
                    </h3>
                    <p className="text-sm mb-2">
                        <strong>Syntax:</strong> <code>&lt;% Java code %&gt;</code>
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Purpose:</strong> Embed any Java statements (loops, conditionals,
                        method calls) directly into the <code>_jspService()</code> method. They are
                        executed for every request.
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Example:</strong>
                    </p>
                    <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                        {`<%
  String name = request.getParameter("name");
  if (name == null) {
    name = "Guest";
  }
%>`}
                    </pre>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        ⚠️ Overuse leads to unmaintainable "spaghetti code".
                    </p>
                </div>

                {/* Expression Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-fuchsia-200 dark:border-fuchsia-900 hover:shadow-lg transition-all duration-300 hover:border-fuchsia-400 dark:hover:border-fuchsia-700">
                    <h3 className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-400 mb-2 flex items-center">
                        <span className="mr-2">🔤</span> Expression
                    </h3>
                    <p className="text-sm mb-2">
                        <strong>Syntax:</strong> <code>&lt;%= expression %&gt;</code>
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Purpose:</strong> Evaluate a Java expression and insert its result
                        into the response. It is shorthand for <code>out.print(expression)</code>.
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Example:</strong>
                    </p>
                    <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                        {`<p>Welcome, <%= name %>!</p>
<p>Current time: <%= new java.util.Date() %></p>`}
                    </pre>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        ⚠️ Do NOT end with a semicolon inside the tag.
                    </p>
                </div>
            </section>

            {/* Code Examples Section */}
            <section
                className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
                style={{ animationDelay: `${delays[3]}ms`, animationFillMode: "both" }}
            >
                <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
                    Live Examples
                </h2>

                {/* Scriptlet Example */}
                <div className="mb-8">
                    <JavaFileLoader
                        fileModule={scriptletExample}
                        title="scriptlet_example.jsp – Using Scriptlet"
                        highlightLines={[7, 8, 9, 10, 11]}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        This scriptlet reads a request parameter and conditionally sets a variable.
                        Notice the Java code is embedded directly.
                    </p>
                </div>

                {/* Expression Example */}
                <div className="mb-8">
                    <JavaFileLoader
                        fileModule={expressionExample}
                        title="expression_example.jsp – Using Expressions"
                        highlightLines={[13, 14]}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Expressions output the value of <code>name</code> and the current date.
                        No semicolons inside the tags.
                    </p>
                </div>

                {/* Declaration Example */}
                <div className="mb-8">
                    <JavaFileLoader
                        fileModule={declarationExample}
                        title="declaration_example.jsp – Using Declarations"
                        highlightLines={[1, 2, 3, 4, 5]}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        A method <code>getGreeting</code> is declared and then used in a scriptlet.
                        The method becomes a member of the servlet class.
                    </p>
                </div>

                {/* Combined Example */}
                <div className="mb-8">
                    <JavaFileLoader
                        fileModule={combinedExample}
                        title="combined_example.jsp – All Three Together"
                        highlightLines={[]}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        A complete page showing declaration, scriptlet, and expression in harmony.
                    </p>
                </div>

                {/* Hint Section */}
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        🔍 Observe carefully:
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        In the generated servlet (as seen in Topic0), declarations become fields or
                        methods outside <code>_jspService</code>, scriptlets are copied verbatim inside,
                        and expressions become arguments to <code>out.print()</code>.
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
                            <strong>Using semicolons in expressions:</strong> <code>&lt;%= name; %&gt;</code> causes a compilation error. Expressions should not end with a semicolon.
                        </li>
                        <li>
                            <strong>Declaring variables with &lt;%! %&gt; that should be local:</strong> Instance variables are shared across requests, leading to thread‑safety issues.
                        </li>
                        <li>
                            <strong>Forgetting to import classes:</strong> Inside scriptlets, you must use fully qualified names or include an <code>@page import</code> directive.
                        </li>
                        <li>
                            <strong>Mixing HTML and Java without proper braces:</strong> In scriptlets, forgetting to close curly braces can break the entire page.
                        </li>
                        <li>
                            <strong>Assuming scriptlets are the only way:</strong> Modern JSP encourages EL and JSTL to separate concerns.
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
                            <strong>Minimize scriptlets:</strong> Use EL and JSTL for control flow and data display.
                        </li>
                        <li>
                            <strong>Use declarations sparingly:</strong> Only for utility methods that don't depend on request state.
                        </li>
                        <li>
                            <strong>Always import needed classes:</strong> Use <code>&lt;%@ page import="java.util.*" %&gt;</code> at the top.
                        </li>
                        <li>
                            <strong>Keep expressions simple:</strong> Avoid complex logic; if needed, move it to a method (declaration) or a separate Java class.
                        </li>
                        <li>
                            <strong>Consider thread safety:</strong> If you must use instance variables (declarations), synchronize access or use <code>ThreadLocal</code>.
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
                            "Students from Shyamnagar and Ichapur often struggle with where each
                            element lands in the servlet. I tell them: imagine the servlet class as a
                            house. Declarations are the furniture (always there), scriptlets are the
                            daily activities (happen in the living room), and expressions are the
                            paintings on the wall (displayed directly). Keep this mental model, and
                            you'll never mix them up."
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
                            I can distinguish between &lt;% %&gt;, &lt;%= %&gt;, and &lt;%! %&gt;.
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            I know that expressions must not end with a semicolon.
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            I understand that declarations become servlet members (shared across requests).
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            I can explain why scriptlets are discouraged in modern JSP.
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            I have seen examples of all three in a JSP page.
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
                            If you get a compilation error on a JSP, check the generated servlet in the
                            container's work directory. The error line numbers often point to the
                            translated Java code, which helps locate the offending scriptlet.
                        </p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="font-medium">🚀 Performance Trick</p>
                        <p className="text-sm">
                            Declare frequently used constants or utility methods in a declaration to
                            avoid re-evaluating them on each request. But remember thread safety!
                        </p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="font-medium">🧠 Maintainability</p>
                        <p className="text-sm">
                            Replace complex scriptlets with custom tags or JavaBeans. This not only
                            cleans up the JSP but also makes it easier for designers to work with.
                        </p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="font-medium">📦 Quick Import</p>
                        <p className="text-sm">
                            Use the page directive <code>&lt;%@ page import="pkg.*" %&gt;</code> to
                            import multiple classes at once. You can also have multiple import
                            attributes separated by commas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
                <p>Topic 1: Scriptlet, Expression, Declaration — Building on the JSP Lifecycle.</p>
                <p className="mt-1">
                    Examples inspired by students from Barrackpore, Shyamnagar, Ichapur, Naihati.
                </p>
            </footer>
        </div>
    );
};

export default Topic1;