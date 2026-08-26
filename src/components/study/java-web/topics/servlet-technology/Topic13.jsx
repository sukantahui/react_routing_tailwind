// Topic13.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import ExactPatternServlet from "./topic13_files/ExactPatternServlet.java?raw";
import PrefixPatternServlet from "./topic13_files/PrefixPatternServlet.java?raw";
import SuffixPatternServlet from "./topic13_files/SuffixPatternServlet.java?raw";
import DefaultServletMapping from "./topic13_files/DefaultServlet.java?raw";
import MappingConflictDemo from "./topic13_files/MappingConflictServlet.java?raw";
import WebXmlMappings from "./topic13_files/web_mappings.xml?raw";

// FAQ questions for this topic
import questions from "./topic13_files/topic13_questions";

const Topic13 = () => {
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
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        URL Mapping Patterns
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Mapping URLs to servlets – exact match, wildcards, prefix, suffix, and the default servlet.
                    </p>
                </header>

                {/* What & Why */}
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
                >
                    <h2 className="text-2xl font-semibold text-teal-400 flex items-center gap-2">
                        <span>🗺️</span> What are URL Mapping Patterns?
                    </h2>
                    <p className="mt-3 text-gray-300">
                        URL mapping tells the servlet container which servlet should handle which incoming request URL. Mappings are defined either via <code>@WebServlet</code> annotation or in <code>web.xml</code>. They use pattern matching rules inspired by Unix path matching.
                    </p>
                    <p className="mt-3 text-gray-300">
                        The container evaluates patterns in a specific order: exact matches first, then path (prefix) matches, then extension (suffix) matches, and finally the default servlet (<code>/</code>).
                    </p>
                    <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-teal-500">
                        <p className="text-sm italic text-gray-300">
                            📘 <strong>School analogy:</strong> At Barrackpore High, the principal handles any request (default mapping). Specific teachers handle exact room numbers (exact mapping), subjects like "math/*" (prefix), and file extensions like "*.pdf" (suffix).
                        </p>
                    </div>
                </section>

                {/* SVG: Mapping Types */}
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                >
                    <h2 className="text-2xl font-semibold text-teal-400">📐 Types of URL Patterns</h2>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <svg viewBox="0 0 220 160" className="w-52 h-auto">
                            <rect x="10" y="10" width="200" height="140" rx="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
                            <text x="110" y="35" textAnchor="middle" fill="#5eead4" fontSize="14" fontWeight="bold">Exact Match</text>
                            <text x="110" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="12">/login</text>
                            <text x="110" y="80" textAnchor="middle" fill="#9ca3af" fontSize="10">/profile</text>
                            <text x="110" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">/logout</text>
                            <text x="110" y="125" textAnchor="middle" fill="#fcd34d" fontSize="10">Highest priority</text>
                        </svg>
                        <svg viewBox="0 0 220 160" className="w-52 h-auto">
                            <rect x="10" y="10" width="200" height="140" rx="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
                            <text x="110" y="35" textAnchor="middle" fill="#5eead4" fontSize="14" fontWeight="bold">Path Prefix</text>
                            <text x="110" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="12">/admin/*</text>
                            <text x="110" y="80" textAnchor="middle" fill="#9ca3af" fontSize="10">/user/*</text>
                            <text x="110" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">/api/v1/*</text>
                            <text x="110" y="125" textAnchor="middle" fill="#fcd34d" fontSize="10">Matches subpaths</text>
                        </svg>
                        <svg viewBox="0 0 220 160" className="w-52 h-auto">
                            <rect x="10" y="10" width="200" height="140" rx="8" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
                            <text x="110" y="35" textAnchor="middle" fill="#5eead4" fontSize="14" fontWeight="bold">Extension</text>
                            <text x="110" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="12">*.jsp</text>
                            <text x="110" y="80" textAnchor="middle" fill="#9ca3af" fontSize="10">*.do</text>
                            <text x="110" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">*.json</text>
                            <text x="110" y="125" textAnchor="middle" fill="#fcd34d" fontSize="10">Lowest priority</text>
                        </svg>
                        <svg viewBox="0 0 220 160" className="w-52 h-auto">
                            <rect x="10" y="10" width="200" height="140" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="110" y="35" textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="bold">Default Servlet</text>
                            <text x="110" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="12">/</text>
                            <text x="110" y="85" textAnchor="middle" fill="#9ca3af" fontSize="10">Catch-all when</text>
                            <text x="110" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">no other matches</text>
                            <text x="110" y="125" textAnchor="middle" fill="#fcd34d" fontSize="10">Lowest priority</text>
                        </svg>
                    </div>
                </section>

                {/* 1. Exact Match */}
                <section
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                >
                    <h2 className="text-2xl font-semibold text-teal-400">🎯 Exact Match Patterns</h2>
                    <p className="mt-3 text-gray-300">
                        The URL pattern must exactly equal the request path. Examples: <code>/login</code>, <code>/home</code>, <code>/user/profile</code>. No wildcards.
                    </p>
                    <JavaFileLoader
                        content={ExactPatternServlet}
                        title="ExactPatternServlet.java"
                        highlightLines={[4, 5]}
                    />
                    <div className="mt-4 p-3 bg-teal-950/30 border-l-4 border-teal-500 rounded">
                        <p className="text-sm">💡 <strong>Tip:</strong> Exact matches have the highest priority. Use them for specific resources like login, logout, or static endpoints.</p>
                    </div>
                </section>

                {/* 2. Prefix (Path) Mapping */}
                <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-semibold text-teal-400">📂 Prefix Mapping: <code>/path/*</code></h2>
                    <p className="mt-3 text-gray-300">
                        Matches any request where the path starts with the given prefix, followed by any substring. Example: <code>/admin/*</code> matches <code>/admin/dashboard</code>, <code>/admin/users/123</code>.
                    </p>
                    <JavaFileLoader
                        fileModule={PrefixPatternServlet}
                        title="PrefixPatternServlet.java"
                    highlightLines={[4, 5]}
          />
                </section>

                {/* 3. Suffix (Extension) Mapping */}
                <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-semibold text-teal-400">📄 Suffix Mapping: <code>*.extension</code></h2>
                    <p className="mt-3 text-gray-300">
                        Matches any request whose path ends with the specified extension. Examples: <code>*.jsp</code>, <code>*.do</code>, <code>*.html</code>.
                    </p>
                    <JavaFileLoader
                        fileModule={SuffixPatternServlet}
                        title="SuffixPatternServlet.java"
                    highlightLines={[4, 5]}
          />
                    <div className="mt-4 p-3 bg-amber-950/30 border-l-4 border-amber-500 rounded">
                        <p className="text-sm">⚠️ <strong>Caution:</strong> Extension mapping has lower priority than exact and prefix. Avoid mixing <code>/*</code> and <code>*.something</code> – it's invalid.</p>
                    </div>
                </section>

                {/* 4. Default Servlet */}
                <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-semibold text-teal-400">🏠 Default Servlet: <code>/</code></h2>
                    <p className="mt-3 text-gray-300">
                        The pattern <code>/</code> defines the default servlet. It handles any request not matched by any other pattern. The container also provides a built‑in default servlet for static resources, but you can override it.
                    </p>
                    <JavaFileLoader
                        fileModule={DefaultServletMapping}
                        title="DefaultServlet.java"
                    highlightLines={[4, 5]}
          />
                </section>

                {/* 5. Multiple Patterns and Order */}
                <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-semibold text-teal-400">🔀 Multiple Patterns & Resolution Order</h2>
                    <p className="mt-3 text-gray-300">
                        A servlet can have multiple URL patterns (array in annotation or multiple <code>&lt;url-pattern&gt;</code> in web.xml). The container chooses the best match following this order:
                    </p>
                    <ol className="list-decimal list-inside text-gray-300 mt-2 space-y-1">
                        <li>Exact match (most specific)</li>
                        <li>Longest path prefix match (<code>/admin/users/*</code> beats <code>/admin/*</code>)</li>
                        <li>Extension match (<code>*.jsp</code>)</li>
                        <li>Default servlet (<code>/</code>)</li>
                    </ol>
                    <JavaFileLoader
                        fileModule={MappingConflictDemo}
                        title="MappingConflictServlet.java – Demonstrating Order"
                        highlightLines={[4, 5, 6]}
                    />
                </section>

                {/* web.xml examples */}
                <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-semibold text-teal-400">📜 URL Mappings in web.xml</h2>
                    <p className="mt-3 text-gray-300">Define <code>&lt;url-pattern&gt;</code> inside <code>&lt;servlet-mapping&gt;</code>. Multiple patterns are allowed per servlet.</p>
                    <JavaFileLoader
                        fileModule={WebXmlMappings}
                        title="web.xml – URL Mapping Examples"
                        highlightLines={[2, 3, 4, 9, 10]}
                    />
                </section>

                {/* Common Pitfalls */}
                <section
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                >
                    <h2 className="text-2xl font-semibold text-teal-400">⚠️ Common Pitfalls</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
                        <li><strong>Using both <code>/*</code> and <code>*.jsp</code> in the same mapping</strong> – Not allowed; pattern can only be prefix or suffix, not mixed.</li>
                        <li><strong>Forgetting the leading slash in exact patterns</strong> – <code>login</code> is invalid; must be <code>/login</code>.</li>
                        <li><strong>Assuming extension mapping matches subpaths like <code>/path/file.jsp</code></strong> – It does, extension mapping matches any path ending with that extension.</li>
                        <li><strong>Overriding container's default servlet</strong> – If you map <code>/</code> to your own servlet, static resources (CSS, JS) may stop working unless you forward them.</li>
                        <li><strong>Patterns are case-sensitive</strong> – <code>/User</code> ≠ <code>/user</code>.</li>
                    </ul>
                </section>

                {/* Best Practices */}
                <section
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                >
                    <h2 className="text-2xl font-semibold text-teal-400">✅ Best Practices</h2>
                    <ul className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Use exact matches for fixed endpoints (e.g., <code>/login</code>, <code>/logout</code>).</li>
                        <li>Use prefix mappings for RESTful APIs (e.g., <code>/api/v1/*</code>).</li>
                        <li>Avoid extension mappings for modern MVC; use prefix or exact.</li>
                        <li>Never map <code>/*</code> to a servlet unless you intend to handle all requests (including static resources).</li>
                        <li>Order mappings from most specific to least specific when using <code>web.xml</code> (container selects best match anyway).</li>
                        <li>Document your URL patterns in a central place (e.g., API document).</li>
                    </ul>
                </section>

                {/* Mini Checklist */}
                <section
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                >
                    <h2 className="text-2xl font-semibold text-teal-400">📋 Mini Checklist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {[
                            "✅ Understand exact, prefix, suffix, and default patterns",
                            "✅ Use @WebServlet or web.xml consistently",
                            "✅ Remember exact matches have highest priority",
                            "✅ Prefix longer paths before shorter ones",
                            "✅ Extension mapping works anywhere in path",
                            "✅ Avoid mixing /* and *.jsp in one pattern",
                            "✅ Test overlapping mappings thoroughly",
                            "✅ Be aware of case sensitivity",
                            "✅ Document URL patterns",
                            "✅ Consider using path variables with extract parameters"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                                <span className="text-teal-400">✓</span> {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Hint Section */}
                <section
                    ref={(el) => (sectionRefs.current[6] = el)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-teal-500/30"
                >
                    <h2 className="text-xl font-semibold text-teal-400">🧠 Hints – Think Like a Pro</h2>
                    <ul className="space-y-2 text-gray-300 italic">
                        <li>🔍 <strong>Observe carefully:</strong> Deploy a servlet with pattern <code>/test/*</code> and another with <code>/test/hello</code>. Which one handles <code>/test/hello</code>? (Exact match wins).</li>
                        <li>⚙️ <strong>Try changing:</strong> Map a servlet to <code>/</code> and see how static files are affected. Make it forward to the container's default servlet to serve static content.</li>
                        <li>📂 <strong>Think about:</strong> Why does the container prefer longer prefix matches? (Because they are more specific).</li>
                        <li>🧩 <strong>Debug:</strong> Your servlet is not receiving requests – check the mapping pattern in browser and ensure no trailing spaces or case mismatch.</li>
                    </ul>
                </section>

                {/* FAQ Component */}
                <FAQTemplate title="URL Mapping Patterns FAQs" questions={questions} />

                {/* Teacher's Note */}
                <div className="mt-8">
                    <Teacher note="URL mapping is foundational, yet students often mess up pattern syntax. Emphasise that the container uses a specific algorithm: exact → longest prefix → extension → default. Use the classroom whiteboard to visualise where a URL like `/admin/user/123` would go. A great exercise: give them a list of mappings and ask which servlet gets a given URL. Then have them implement a small mapping demo with annotations and test with a browser. Also show how to extract path info using `request.getPathInfo()` when using prefix mapping." />
                </div>

                <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
                    Topic 13: URL Mapping Patterns – Part of Servlet Mastery Series
                </footer>
            </div>
        </div>
    );
};

export default Topic13;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>