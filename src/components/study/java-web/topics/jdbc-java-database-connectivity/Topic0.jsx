import React from "react";
import clsx from "clsx";

const Topic0 = () => {
    return (
        <div className="bg-gray-950 text-gray-200 min-h-screen px-6 py-10 leading-relaxed">

            {/* Scoped Animations */}
            <style>{`
                @keyframes fadeSlideUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Header */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
                <h1 className="text-3xl font-semibold text-blue-400 mb-4">
                    Introduction to JDBC
                </h1>
                <p className="text-gray-400">
                    JDBC is the backbone of Java database connectivity. It allows Java applications to communicate with databases like MySQL, Oracle, PostgreSQL, etc.
                </p>
            </section>

            {/* What is JDBC */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[100ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-green-400 mb-3">What is JDBC?</h2>
                    <p>
                        JDBC stands for <span className="text-yellow-400">Java Database Connectivity</span>.
                        It is an API provided by Java to connect and interact with databases.
                    </p>

                    <ul className="list-disc ml-6 mt-4 text-gray-400">
                        <li>Send SQL queries</li>
                        <li>Retrieve results</li>
                        <li>Update database records</li>
                        <li>Handle transactions</li>
                    </ul>
                </div>
            </section>

            {/* Real Life Analogy */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[200ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-purple-400 mb-3">Real-Life Analogy</h2>
                    <p>
                        Imagine <strong>Swadeep</strong> from Barrackpore wants to check his exam result stored in a school database.
                    </p>

                    <div className="mt-4">
                        <svg viewBox="0 0 400 120" className="w-full h-32">
                            <text x="10" y="60" fill="#60a5fa">Java Program</text>
                            <text x="150" y="60" fill="#34d399">JDBC</text>
                            <text x="280" y="60" fill="#facc15">Database</text>

                            <line x1="90" y1="55" x2="140" y2="55" stroke="#9ca3af" strokeWidth="2">
                                <animate attributeName="x2" values="90;140" dur="1s" repeatCount="indefinite" />
                            </line>

                            <line x1="220" y1="55" x2="270" y2="55" stroke="#9ca3af" strokeWidth="2">
                                <animate attributeName="x2" values="220;270" dur="1s" repeatCount="indefinite" />
                            </line>
                        </svg>
                    </div>

                    <p className="mt-4 text-gray-400">
                        JDBC acts like a <strong>translator</strong> between Java and the database.
                    </p>
                </div>
            </section>

            {/* Core Components */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[300ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-cyan-400 mb-3">Core Components of JDBC</h2>

                    <ul className="space-y-3 text-gray-400">
                        <li><strong>DriverManager</strong> → Manages database drivers</li>
                        <li><strong>Connection</strong> → Establishes connection</li>
                        <li><strong>Statement</strong> → Executes SQL queries</li>
                        <li><strong>ResultSet</strong> → Stores query results</li>
                    </ul>
                </div>
            </section>

            {/* Why JDBC */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[400ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-orange-400 mb-3">Why JDBC is Important?</h2>

                    <ul className="list-disc ml-6 text-gray-400">
                        <li>Used in almost every enterprise Java application</li>
                        <li>Foundation for frameworks like Hibernate, Spring</li>
                        <li>Direct control over database operations</li>
                    </ul>
                </div>
            </section>

            {/* Prototype Section */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[500ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-pink-400 mb-3">Important Method Prototype</h2>

                    <pre className="bg-black p-4 rounded text-sm text-green-400">
                        Connection getConnection(String url, String user, String password)
                    </pre>

                    <p className="mt-3 text-gray-400">
                        <strong>Return Type:</strong> Connection <br />
                        <strong>Purpose:</strong> Establish connection with database <br />
                        <strong>Used When:</strong> Starting any JDBC operation
                    </p>
                </div>
            </section>

            {/* Tips & Tricks */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[600ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-green-300 mb-3">Tips & Tricks (Professional)</h2>

                    <ul className="list-disc ml-6 text-gray-400">
                        <li>Always close connection (use try-with-resources)</li>
                        <li>Use PreparedStatement instead of Statement</li>
                        <li>Never hardcode DB credentials</li>
                    </ul>
                </div>
            </section>

            {/* Common Pitfalls */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[700ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-red-400 mb-3">Common Pitfalls</h2>

                    <ul className="list-disc ml-6 text-gray-400">
                        <li>Forgetting to close Connection → Memory leaks</li>
                        <li>Using wrong driver class</li>
                        <li>SQL syntax errors</li>
                    </ul>
                </div>
            </section>

            {/* Hint Section */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[800ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-yellow-300 mb-3">Hint</h2>
                    <p className="text-gray-400">
                        Think about how a translator works between two people speaking different languages.
                        JDBC plays a similar role between Java and databases.
                    </p>
                </div>
            </section>

            {/* Checklist */}
            <section className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[900ms]">
                <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                    <h2 className="text-xl text-blue-300 mb-3">Checklist</h2>

                    <ul className="list-disc ml-6 text-gray-400">
                        <li>Understand what JDBC is</li>
                        <li>Know its role in Java applications</li>
                        <li>Remember core components</li>
                        <li>Understand connection process</li>
                    </ul>
                </div>
            </section>

            {/* Teacher Note */}
            <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out] animation-delay-[1000ms]">
                <div className="p-6 rounded-xl bg-blue-900/30 hover:bg-blue-900/50 transition-all duration-300 border border-blue-500">
                    <h2 className="text-xl text-blue-300 mb-3">Teacher’s Note</h2>
                    <p className="text-gray-300">
                        JDBC is not just a topic — it is the foundation of backend development.
                        If you understand this properly, future topics like Spring Boot and Hibernate will become much easier.
                        Focus on understanding connection flow rather than memorizing syntax.
                    </p>
                    <p className="mt-3 text-sm text-gray-400">
                        Experience: {new Date().getFullYear() - 1998} years
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Topic0;