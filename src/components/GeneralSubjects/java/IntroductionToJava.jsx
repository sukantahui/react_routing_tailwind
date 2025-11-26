import React from "react";
import {
    BookOpen,
    Code,
    Cpu,
    Info,
    ChevronRight,
    CheckCircle2,
    Lightbulb,
    Database,
    Layers,
    Globe,
    Terminal,
} from "lucide-react";

const IntroductionToJava = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 p-6 md:p-12">

            {/* HEADER */}
            <header className="text-center mb-14">
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow tracking-wide">
                    Introduction to Java
                </h1>
                <p className="text-gray-400 mt-4 text-lg max-w-3xl mx-auto">
                    A complete, authoritative chapter on Java fundamentals — explained with clarity, depth, and modern software engineering insights.
                </p>
            </header>

            {/* MAIN CARD */}
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 p-10 rounded-3xl shadow-2xl space-y-14">

                {/* WHAT IS JAVA */}
                <section>
                    <h2 className="text-3xl font-bold text-blue-300 flex items-center gap-2">
                        <BookOpen className="w-8 h-8" /> What is Java?
                    </h2>
                    <p className="mt-4 text-gray-300 text-lg leading-relaxed">
                        <strong>Java</strong> is a general-purpose, object-oriented, class-based programming language designed to have as few implementation dependencies as possible. It is widely used across industries because of its reliability, security, and scalability.
                    </p>

                    {/* WHY “JAVA” NAME? */}
                    <div className="bg-gray-800/70 border border-gray-700 p-6 mt-6 rounded-xl">
                        <h3 className="text-xl font-bold text-teal-300">☕ Why the name “Java”?</h3>
                        <p className="text-gray-300 mt-3">
                            Java was named after <strong>Java coffee</strong> because the developers consumed a lot of coffee during development. The name symbolizes energy and productivity.
                        </p>
                    </div>
                </section>

                {/* JAVA EDITIONS */}
                <section>
                    <h2 className="text-3xl font-bold text-yellow-300 mb-4">Java Editions</h2>
                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl text-blue-300 font-bold mb-2">Java SE</h3>
                            <p className="text-gray-300">Java Standard Edition — core libraries & basic features for building general applications.</p>
                        </div>

                        <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl text-purple-300 font-bold mb-2">Java EE / Jakarta EE</h3>
                            <p className="text-gray-300">Used for enterprise applications: Servlets, JSP, EJB, Spring, large-scale systems.</p>
                        </div>

                        <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl text-green-300 font-bold mb-2">Java ME</h3>
                            <p className="text-gray-300">Micro Edition — used in embedded systems & mobile devices.</p>
                        </div>

                    </div>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-3xl font-bold text-purple-300 flex items-center gap-2">
                        <CheckCircle2 className="w-8 h-8" /> Key Features of Java
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        {[
                            "Simple & easy compared to C/C++",
                            "Object-Oriented (Everything is an object)",
                            "Platform Independent using JVM",
                            "Secure with bytecode verification",
                            "Robust memory management & garbage collection",
                            "Multithreaded programming support",
                            "Dynamic linking of classes",
                            "Rich standard library & ecosystem",
                            "High performance with JIT compiler",
                            "Distributed systems support (RMI, CORBA)",
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800/70 p-4 border border-gray-700 rounded-xl flex gap-3">
                                <ChevronRight className="text-blue-400" />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* JVM INTERNALS */}
                <section>
                    <h2 className="text-3xl font-bold text-green-300 flex items-center gap-3">
                        <Cpu className="w-8 h-8" /> JVM Internals (Detailed)
                    </h2>

                    <div className="bg-gray-800/70 p-6 border border-gray-700 rounded-xl mt-4">
                        <p className="text-gray-300 mb-4">
                            JVM (Java Virtual Machine) is responsible for converting bytecode into machine-specific instructions.
                        </p>

                        <h3 className="text-xl font-semibold text-lime-300">JVM Memory Structure</h3>

                        <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-300">
                            <li><strong>Class Loader</strong> – Loads classes into memory.</li>
                            <li><strong>Heap</strong> – Stores objects.</li>
                            <li><strong>Stack</strong> – Stores method calls & local variables.</li>
                            <li><strong>Method Area</strong> – Stores class metadata.</li>
                            <li><strong>PC Register</strong> – Tracks instructions.</li>
                            <li><strong>Native Method Stack</strong> – Linked with C/C++ native code.</li>
                        </ul>

                        <pre className="bg-gray-900/60 p-6 mt-6 rounded-xl text-gray-200 overflow-auto">{`
   +---------------------------+
   |      Method Area         |
   +---------------------------+
   |        Heap              |
   +---------------------------+
   |    Java Stack (per thread)
   +---------------------------+
   |   PC Register            |
   +---------------------------+
   | Native Method Stack      |
   +---------------------------+
            `}</pre>
                    </div>
                </section>

                {/* JIT COMPILER */}
                <section>
                    <h2 className="text-3xl font-bold text-orange-300 flex items-center gap-3">
                        ⚡ Just-In-Time (JIT) Compiler
                    </h2>

                    <p className="text-gray-300 mt-4 leading-relaxed">
                        JIT compiler improves performance by compiling frequently executed bytecode into native machine code during runtime. This reduces overhead and speeds up execution significantly.
                    </p>

                    <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-300">
                        <li>Converts bytecode to native code.</li>
                        <li>Optimizes repeated execution.</li>
                        <li>Improves runtime performance.</li>
                    </ul>
                </section>

                {/* BYTECODE STRUCTURE */}
                <section>
                    <h2 className="text-3xl font-bold text-red-300">Understanding Bytecode</h2>
                    <p className="text-gray-300 mt-4">
                        Bytecode is a highly optimized instruction set designed to be executed by JVM.
                    </p>

                    <div className="bg-gray-800/70 border border-gray-700 p-6 rounded-xl mt-6">
                        <pre className="text-gray-200">{`
   0: ldc   #2    // String "Hello, World!"
   2: astore_1
   3: getstatic java/lang/System.out
   6: aload_1
   7: invokevirtual println
   10: return
            `}</pre>
                    </div>
                </section>

                {/* REAL-WORLD APPLICATIONS */}
                <section>
                    <h2 className="text-3xl font-bold text-cyan-300 flex gap-3 items-center">
                        <Globe className="w-7 h-7" /> Real-World Uses of Java
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {[
                            "Banking Systems (Core Banking Solutions)",
                            "Enterprise Software (ERP, CRM, HRMS)",
                            "Android Apps (Kotlin/Java)",
                            "Scientific & Research Applications",
                            "E-commerce Platforms (Amazon, Flipkart)",
                            "High-Frequency Trading Systems",
                            "Web Servers (Tomcat, Jetty)",
                            "Big Data & Analytics (Hadoop, Spark)",
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/60 p-3 rounded-lg border border-gray-700 flex items-center gap-3 hover:bg-gray-800 transition"
                            >
                                <Terminal className="text-cyan-400 w-5 h-5" />
                                <p className="text-gray-300 text-sm">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/* ADVANTAGES & LIMITATIONS */}
                <section>
                    <h2 className="text-3xl font-bold text-blue-300">Advantages & Limitations</h2>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-gray-800/70 border border-gray-700 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-green-300">Advantages</h3>
                            <ul className="list-disc pl-6 mt-3 text-gray-300 space-y-2">
                                <li>Highly scalable</li>
                                <li>Platform independent</li>
                                <li>Huge community support</li>
                                <li>Secure & reliable</li>
                            </ul>
                        </div>

                        <div className="bg-gray-800/70 border border-gray-700 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-red-300">Limitations</h3>
                            <ul className="list-disc pl-6 mt-3 text-gray-300 space-y-2">
                                <li>Slower than C++ due to JVM layer</li>
                                <li>Verbose syntax</li>
                                <li>High memory usage</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* INTERVIEW QUESTIONS */}
                <section>
                    <h2 className="text-3xl font-bold text-pink-300">Top Interview Questions</h2>

                    <ul className="list-decimal pl-6 mt-4 space-y-3 text-gray-300">
                        <li>What is JVM? Explain its components.</li>
                        <li>What is the difference between JDK, JRE, and JVM?</li>
                        <li>Explain platform independence.</li>
                        <li>Why Java is not 100% object-oriented?</li>
                        <li>Explain the role of the class loader.</li>
                        <li>What is bytecode?</li>
                    </ul>
                </section>

                {/* QUIZ */}
                <section>
                    <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl mt-10">
                        <h3 className="text-2xl font-bold text-lime-300 flex items-center gap-2">
                            <Lightbulb className="w-7 h-7" /> Quick Quiz
                        </h3>

                        <ul className="list-decimal pl-6 mt-4 space-y-3 text-gray-200">
                            <li>Name the creator of Java.</li>
                            <li>Explain “Write Once, Run Anywhere”.</li>
                            <li>What is a Just-In-Time compiler?</li>
                            <li>Is Java compiled or interpreted?</li>
                            <li>What is the Java heap?</li>
                        </ul>
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-3xl font-bold text-purple-300">Frequently Asked Questions</h2>

                    <div className="space-y-6 mt-6">
                        <div>
                            <h4 className="text-xl font-semibold text-blue-300">1. Is Java hard to learn?</h4>
                            <p className="text-gray-300 mt-2">Not at all. Java syntax is structured and easier than C++.</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-blue-300">2. Why Java is slower than C?</h4>
                            <p className="text-gray-300 mt-2">Because it runs on JVM which adds an abstraction layer.</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-blue-300">3. Is Java still in demand?</h4>
                            <p className="text-gray-300 mt-2">Yes — banking, fintech, enterprise apps depend heavily on Java.</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default IntroductionToJava;
