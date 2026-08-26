import React from "react";
import clsx from "clsx";

// Java file loader component
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Raw imports of example Java files (place in ./topic2_files/)
import loginServlet from "./topic2_files/LoginServlet.java?raw";
import userDAO from "./topic2_files/UserDAO.java?raw";
import userBean from "./topic2_files/UserBean.java?raw";

// ----------------------------------------------------------------------
// Topic 2: Role of JDBC, JSP, and Servlets
// ----------------------------------------------------------------------
// This topic explains the distinct responsibilities of JDBC, JSP, and
// Servlets in a Java web application, and how they work together to
// implement the MVC pattern.
// ----------------------------------------------------------------------

export default function Topic2() {
    return (
        <div className="dark">
            <main
                className={clsx(
                    "min-h-screen bg-gray-50 px-4 py-12 font-sans leading-relaxed text-gray-800",
                    "dark:bg-gray-900 dark:text-gray-200",
                    "motion-safe:animate-[fadeIn_0.6s_ease-out]"
                )}
            >
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Header */}
                    <header
                        className={clsx(
                            "border-l-4 border-blue-600 pl-4",
                            "motion-safe:animate-[slideUp_0.5s_ease-out]"
                        )}
                    >
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Role of JDBC, JSP, and Servlets
                        </h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                            The three pillars of Java web applications.
                        </p>
                    </header>

                    {/* Introduction Card */}
                    <section
                        className={clsx(
                            "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[100ms]"
                        )}
                    >
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                            How They Fit Together
                        </h2>
                        <p className="mb-3">
                            In a typical Java web application, three core technologies handle the
                            complete request‑response cycle:
                        </p>
                        <ul className="list-inside list-disc space-y-1">
                            <li>
                                <span className="font-bold text-blue-600 dark:text-blue-400">Servlets</span>{" "}
                                – act as the controller, receiving HTTP requests, processing them, and
                                coordinating the response.
                            </li>
                            <li>
                                <span className="font-bold text-green-600 dark:text-green-400">JSP</span>{" "}
                                – serves as the view, generating dynamic HTML content to be sent to the
                                client.
                            </li>
                            <li>
                                <span className="font-bold text-purple-600 dark:text-purple-400">JDBC</span>{" "}
                                – provides the data access layer, connecting to databases to retrieve or
                                store information.
                            </li>
                        </ul>
                        <p className="mt-3">
                            Together they form the basis of the Model‑View‑Controller (MVC) pattern:
                            Servlet (Controller), JSP (View), and JavaBeans / POJOs (Model). JDBC is
                            used inside the Model to interact with the database.
                        </p>
                    </section>

                    {/* SVG Flow Diagram */}
                    <section
                        className={clsx(
                            "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
                        )}
                    >
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                            Request Flow with JDBC, JSP, and Servlets
                        </h2>
                        <div className="flex justify-center">
                            <svg
                                width="650"
                                height="220"
                                viewBox="0 0 650 220"
                                className="max-w-full"
                                aria-label="Flow diagram: Client -> Servlet -> JDBC -> Database -> JSP -> Client"
                            >
                                <rect width="650" height="220" fill="transparent" />

                                {/* Client */}
                                <g className="transition-all duration-300 hover:opacity-80">
                                    <rect
                                        x="30"
                                        y="80"
                                        width="100"
                                        height="60"
                                        rx="8"
                                        fill="#f97316"
                                        className="transition-all duration-300 hover:fill-orange-400"
                                    />
                                    <text x="60" y="115" fill="white" fontSize="14" fontWeight="bold">
                                        Client
                                    </text>
                                    <text x="55" y="130" fill="white" fontSize="10">
                                        (Browser)
                                    </text>
                                </g>

                                {/* Arrow to Servlet */}
                                <line
                                    x1="130"
                                    y1="110"
                                    x2="200"
                                    y2="110"
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    markerEnd="url(#arrow)"
                                    className="dark:stroke-gray-400"
                                />

                                {/* Servlet */}
                                <g className="transition-all duration-300 hover:opacity-80">
                                    <rect
                                        x="210"
                                        y="30"
                                        width="120"
                                        height="60"
                                        rx="8"
                                        fill="#3b82f6"
                                        className="transition-all duration-300 hover:fill-blue-400"
                                    />
                                    <text x="240" y="65" fill="white" fontSize="14" fontWeight="bold">
                                        Servlet
                                    </text>
                                    <text x="235" y="80" fill="white" fontSize="10">
                                        (Controller)
                                    </text>
                                    {/* Animated dot on Servlet */}
                                    <circle cx="320" cy="60" r="6" fill="#fbbf24">
                                        <animate
                                            attributeName="opacity"
                                            values="1;0.3;1"
                                            dur="1.5s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                </g>

                                {/* Arrow from Servlet to JDBC */}
                                <line
                                    x1="270"
                                    y1="90"
                                    x2="270"
                                    y2="140"
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    markerEnd="url(#arrow)"
                                    className="dark:stroke-gray-400"
                                />

                                {/* JDBC */}
                                <g className="transition-all duration-300 hover:opacity-80">
                                    <rect
                                        x="210"
                                        y="150"
                                        width="120"
                                        height="60"
                                        rx="8"
                                        fill="#8b5cf6"
                                        className="transition-all duration-300 hover:fill-purple-400"
                                    />
                                    <text x="240" y="185" fill="white" fontSize="14" fontWeight="bold">
                                        JDBC
                                    </text>
                                    <text x="235" y="200" fill="white" fontSize="10">
                                        (Data Access)
                                    </text>
                                </g>

                                {/* Arrow from JDBC to Database */}
                                <line
                                    x1="330"
                                    y1="180"
                                    x2="400"
                                    y2="180"
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    markerEnd="url(#arrow)"
                                    className="dark:stroke-gray-400"
                                />

                                {/* Database */}
                                <g className="transition-all duration-300 hover:opacity-80">
                                    <rect
                                        x="410"
                                        y="150"
                                        width="120"
                                        height="60"
                                        rx="8"
                                        fill="#ef4444"
                                        className="transition-all duration-300 hover:fill-red-400"
                                    />
                                    <text x="440" y="185" fill="white" fontSize="14" fontWeight="bold">
                                        Database
                                    </text>
                                </g>

                                {/* Return arrow from JDBC to Servlet (dashed) */}
                                <line
                                    x1="270"
                                    y1="210"
                                    x2="270"
                                    y2="100"
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    strokeDasharray="2 4"
                                    markerEnd="url(#arrow)"
                                    className="dark:stroke-gray-400"
                                />

                                {/* Arrow from Servlet to JSP */}
                                <line
                                    x1="330"
                                    y1="60"
                                    x2="410"
                                    y2="60"
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    markerEnd="url(#arrow)"
                                    className="dark:stroke-gray-400"
                                />

                                {/* JSP */}
                                <g className="transition-all duration-300 hover:opacity-80">
                                    <rect
                                        x="420"
                                        y="30"
                                        width="120"
                                        height="60"
                                        rx="8"
                                        fill="#10b981"
                                        className="transition-all duration-300 hover:fill-green-400"
                                    />
                                    <text x="450" y="65" fill="white" fontSize="14" fontWeight="bold">
                                        JSP
                                    </text>
                                    <text x="445" y="80" fill="white" fontSize="10">
                                        (View)
                                    </text>
                                </g>

                                {/* Arrow from JSP to Client */}
                                <line
                                    x1="540"
                                    y1="60"
                                    x2="610"
                                    y2="100"
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    markerEnd="url(#arrow)"
                                    className="dark:stroke-gray-400"
                                />

                                <defs>
                                    <marker
                                        id="arrow"
                                        markerWidth="10"
                                        markerHeight="10"
                                        refX="9"
                                        refY="5"
                                        orient="auto"
                                    >
                                        <path d="M0,0 L10,5 L0,10 Z" fill="#4b5563" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            Flow: Client request → Servlet processes, calls JDBC → JDBC queries database → results
                            returned → Servlet forwards to JSP → JSP generates HTML response → Client receives page.
                        </p>
                    </section>

                    {/* Detailed Roles */}
                    <section
                        className={clsx(
                            "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
                        )}
                    >
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                            Deep Dive: Each Component’s Role
                        </h2>

                        {/* Servlet */}
                        <div className="mb-6 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4 dark:bg-blue-900/20">
                            <h3 className="mb-2 text-lg font-bold text-blue-800 dark:text-blue-300">
                                Servlet – The Controller
                            </h3>
                            <p className="mb-2">
                                A Servlet is a Java class that extends the capabilities of a server. It
                                receives HTTP requests, reads parameters, invokes business logic (often
                                using JavaBeans or services), and decides which view (JSP) to forward the
                                request to.
                            </p>
                            <p className="font-mono text-sm">public class LoginServlet extends HttpServlet {`{... }`}</p>
                            <p>
                                <span className="font-semibold">Real-world:</span> When Tuhina submits a
                                login form, the <code>LoginServlet</code> validates her credentials using
                                JDBC, then forwards to welcome.jsp or back to`{' '}`
                                login.jsp with an error.
                            </p>
                        </div>

                        {/* JSP */}
                        <div className="mb-6 rounded-lg border-l-4 border-green-600 bg-green-50 p-4 dark:bg-green-900/20">
                            <h3 className="mb-2 text-lg font-bold text-green-800 dark:text-green-300">
                                JSP – The View
                            </h3>
                            <p className="mb-2">
                                JavaServer Pages (JSP) allow embedding Java code inside HTML to generate
                                dynamic content. In modern practice, scriptlets are avoided; instead,
                                JSP uses Expression Language (EL) and JSTL tags to display data passed
                                from the Servlet.
                            </p>
                            <p className="font-mono text-sm">
                                &lt;h2&gt;Welcome, ${'{'}user.name{'}'}&lt;/h2&gt;
                            </p>
                            <p className="mt-2">
                                <span className="font-semibold">Real‑world:</span> After Abhronila logs in,
                                the Servlet stores her details in request scope, and the JSP displays her
                                personalized dashboard.
                            </p>
                        </div>

                        {/* JDBC */}
                        <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4 dark:bg-purple-900/20">
                            <h3 className="mb-2 text-lg font-bold text-purple-800 dark:text-purple-300">
                                JDBC – The Data Layer
                            </h3>
                            <p className="mb-2">
                                Java Database Connectivity (JDBC) is the API that connects Java applications
                                to relational databases. It provides methods to query and update data,
                                manage transactions, and handle result sets.
                            </p>
                            <p className="font-mono text-sm">
                                Connection conn = DriverManager.getConnection(url, user, password);<br />
                                PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username=?");<br />
                                ResultSet rs = ps.executeQuery();
                            </p>
                            <p className="mt-2">
                                <span className="font-semibold">Real‑world:</span> When Debangshu searches
                                for books in the Naihati library system, the Servlet calls a DAO that uses
                                JDBC to query the database and returns matching records.
                            </p>
                        </div>
                    </section>

                    {/* Java Code Examples */}
                    <section
                        className={clsx(
                            "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
                        )}
                    >
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                            Java Code Examples
                        </h2>
                        <p className="mb-4">
                            The following examples illustrate how each component is implemented in code.
                        </p>

                        {/* Example 1: Servlet */}
                        <div className="mb-6">
                            <JavaFileLoader
                                fileModule={loginServlet}
                                title="LoginServlet.java (Servlet – Controller)"
                                highlightLines={[13, 25]}
                            />
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                A Servlet that handles login requests, calls a DAO, and forwards to a JSP.
                            </p>
                        </div>

                        {/* Example 2: JDBC DAO */}
                        <div className="mb-6">
                            <JavaFileLoader
                                fileModule={userDAO}
                                title="UserDAO.java (JDBC – Data Layer)"
                                highlightLines={[12, 22]}
                            />
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                A Data Access Object that uses JDBC to query the database.
                            </p>
                        </div>

                        {/* Example 3: JavaBean (Model) */}
                        <div className="mb-6">
                            <JavaFileLoader
                                fileModule={userBean}
                                title="UserBean.java (Model – used by JSP)"
                                highlightLines={[5, 15]}
                            />
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                A simple JavaBean that holds user data, typically used in JSP with EL.
                            </p>
                        </div>
                    </section>

                    {/* Real-World Context */}
                    <section
                        className={clsx(
                            "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[500ms]"
                        )}
                    >
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                            Real‑World Example: Student Portal
                        </h2>
                        <p className="mb-3">
                            Consider a student portal used in Barrackpore colleges. When Swadeep wants
                            to view his grades:
                        </p>
                        <ol className="list-inside list-decimal space-y-1">
                            <li>
                                His browser sends a request to <code>/grades</code>.
                            </li>
                            <li>
                                The <code>GradeServlet</code> (Servlet) intercepts the request, retrieves
                                Swadeep’s user ID from the session, and calls a <code>GradeDAO</code>.
                            </li>
                            <li>
                                The <code>GradeDAO</code> uses JDBC to execute a query on the database.
                            </li>
                            <li>
                                The results are returned to the Servlet, which stores them in request
                                attributes and forwards to <code>grades.jsp</code>.
                            </li>
                            <li>
                                <code>grades.jsp</code> uses JSTL to loop through the grades and display
                                them in a neat HTML table.
                            </li>
                        </ol>
                        <p className="mt-3">
                            This separation keeps the code organized: Servlet handles control flow, JSP
                            handles presentation, and JDBC (in a DAO) handles data persistence.
                        </p>
                    </section>

                    {/* Tips & Tricks */}
                    <section
                        className={clsx(
                            "rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20",
                            "border border-blue-200 dark:border-blue-800",
                            "transition-all duration-300 hover:shadow-lg",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[600ms]"
                        )}
                    >
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            💡 Tips & Tricks
                        </h2>
                        <ul className="list-inside list-disc space-y-2">
                            <li>
                                <span className="font-medium">Never put database code in JSPs:</span> JSP
                                is for display only. Use Servlets or separate service/DAO classes for
                                JDBC calls. This keeps your view clean and maintainable.
                            </li>
                            <li>
                                <span className="font-medium">Use PreparedStatement always:</span> It
                                prevents SQL injection and handles escaping automatically. Tuhina learned
                                this the hard way when a simple quote broke her query.
                            </li>
                            <li>
                                <span className="font-medium">Forward, not redirect, for internal flow:</span>{" "}
                                Use <code>RequestDispatcher.forward()</code> to pass control to a JSP
                                without an extra round trip. Redirect only when you need a new request
                                (e.g., after a form submission to avoid double posting).
                            </li>
                            <li>
                                <span className="font-medium">Keep JDBC resources closed:</span> Always
                                close Connection, Statement, and ResultSet in finally blocks or use
                                try‑with‑resources to avoid connection leaks.
                            </li>
                        </ul>
                    </section>

                    {/* Common Mistakes */}
                    <section
                        className={clsx(
                            "rounded-lg bg-red-50 p-6 dark:bg-red-900/20",
                            "border border-red-200 dark:border-red-800",
                            "transition-all duration-300 hover:shadow-lg",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[700ms]"
                        )}
                    >
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            ⚠️ Common Mistakes Beginners Make
                        </h2>
                        <ul className="list-inside list-disc space-y-2">
                            <li>
                                <span className="font-medium">Mixing responsibilities:</span> Putting SQL
                                queries directly inside JSP scriptlets. This makes the application
                                impossible to maintain.
                            </li>
                            <li>
                                <span className="font-medium">Forgetting to handle exceptions:</span> JDBC
                                operations throw checked SQLException. Ignoring them leads to crashes and
                                poor user experience.
                            </li>
                            <li>
                                <span className="font-medium">Using Statement instead of PreparedStatement:</span>{" "}
                                Vulnerable to SQL injection and harder to read.
                            </li>
                            <li>
                                <span className="font-medium">Not closing database connections:</span>{" "}
                                This quickly exhausts the connection pool and brings the application down.
                            </li>
                            <li>
                                <span className="font-medium">Overloading Servlets with business logic:</span>{" "}
                                Servlets should delegate to service classes; otherwise they become
                                monolithic and untestable.
                            </li>
                        </ul>
                    </section>

                    {/* Best Practices */}
                    <section
                        className={clsx(
                            "rounded-lg bg-green-50 p-6 dark:bg-green-900/20",
                            "border border-green-200 dark:border-green-800",
                            "transition-all duration-300 hover:shadow-lg",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[800ms]"
                        )}
                    >
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            ✅ Best Practices
                        </h2>
                        <ul className="list-inside list-disc space-y-2">
                            <li>
                                <span className="font-medium">Apply MVC rigorously:</span> Servlet as
                                Controller, JSP as View, JavaBeans/POJOs as Model. Use JDBC within the
                                Model (often inside Data Access Objects).
                            </li>
                            <li>
                                <span className="font-medium">Use connection pooling:</span> In a real
                                application, never open a new connection per request. Configure a
                                DataSource with connection pooling (e.g., HikariCP) in your server.
                            </li>
                            <li>
                                <span className="font-medium">Prefer JSTL and EL over scriptlets:</span>{" "}
                                They make JSPs cleaner and easier to read. Modern JSP best practices
                                forbid scriptlets entirely.
                            </li>
                            <li>
                                <span className="font-medium">Handle transactions properly:</span> For
                                operations that involve multiple updates, use transaction management
                                (commit/rollback) either via JDBC or container‑managed transactions.
                            </li>
                        </ul>
                    </section>

                    {/* Mini Checklist */}
                    <section
                        className={clsx(
                            "rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20",
                            "border border-yellow-200 dark:border-yellow-800",
                            "transition-all duration-300 hover:shadow-lg",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[900ms]"
                        )}
                    >
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            📋 Mini Checklist – What to Remember
                        </h2>
                        <ul className="list-inside list-disc space-y-2">
                            <li>☐ Servlets handle requests and control flow.</li>
                            <li>☐ JSP generates the HTML view.</li>
                            <li>☐ JDBC connects Java to databases.</li>
                            <li>☐ Always use PreparedStatement to avoid SQL injection.</li>
                            <li>☐ Keep JDBC code out of JSPs and Servlets (use DAO layer).</li>
                            <li>☐ Close resources (Connection, Statement, ResultSet) reliably.</li>
                        </ul>
                    </section>

                    {/* Hint Section */}
                    <section
                        className={clsx(
                            "rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20",
                            "border border-indigo-200 dark:border-indigo-800",
                            "transition-all duration-300 hover:shadow-lg",
                            "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1000ms]"
                        )}
                    >
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            🤔 Think About…
                        </h2>
                        <p className="mb-2">
                            <span className="font-medium">Observe carefully:</span> In the flow diagram,
                            why does the Servlet forward to JSP instead of generating HTML itself?
                            (Hint: separation of concerns, designer‑friendly templates.)
                        </p>
                        <p>
                            <span className="font-medium">Try changing this:</span> If you removed JDBC
                            and used files to store data, how would the architecture change? What new
                            challenges would appear?
                        </p>
                    </section>

                    {/* Teacher’s Note */}
                    <section
                        className={clsx(
                            "rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20",
                            "border border-purple-200 dark:border-purple-800",
                            "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                        )}
                    >
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            👨‍🏫 Teacher’s Note – Sukanta Hui
                        </h2>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="flex-1">
                                <p className="mb-2">
                                    <span className="font-bold">Sukanta Hui</span> (27 years of experience
                                    in Programming, RDBMS, OS, and Web Development)
                                </p>
                                <p className="mb-2">
                                    📧{" "}
                                    <a
                                        href="mailto:sukantahui@codernaccotax.co.in"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        sukantahui@codernaccotax.co.in
                                    </a>
                                </p>
                                <p>📞 7003756860</p>
                            </div>
                            <div className="flex-1">
                                <p className="italic">
                                    “When I teach this, I always compare it to a restaurant. The Servlet is
                                    the waiter who takes your order; the JSP is the chef who prepares the
                                    dish (HTML); JDBC is the pantry where ingredients (data) are stored.
                                    Each has a specific job, and if one tries to do another’s job, the
                                    kitchen becomes chaos. Swadeep and Abhronila found this analogy helpful
                                    when building their first library system for Ichapur.”
                                </p>
                                <p className="mt-2 text-sm">
                                    <span className="font-semibold">Remember:</span> Clear roles make
                                    applications easy to build, debug, and scale.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Inline keyframes for animations (zero‑config) */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animation-delay-\\[100ms\\] { animation-delay: 100ms; }
        .animation-delay-\\[200ms\\] { animation-delay: 200ms; }
        .animation-delay-\\[300ms\\] { animation-delay: 300ms; }
        .animation-delay-\\[400ms\\] { animation-delay: 400ms; }
        .animation-delay-\\[500ms\\] { animation-delay: 500ms; }
        .animation-delay-\\[600ms\\] { animation-delay: 600ms; }
        .animation-delay-\\[700ms\\] { animation-delay: 700ms; }
        .animation-delay-\\[800ms\\] { animation-delay: 800ms; }
        .animation-delay-\\[900ms\\] { animation-delay: 900ms; }
        .animation-delay-\\[1000ms\\] { animation-delay: 1000ms; }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeIn_0\\.6s_ease-out\\],
          .motion-safe\\:animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
        </div>
    );
}