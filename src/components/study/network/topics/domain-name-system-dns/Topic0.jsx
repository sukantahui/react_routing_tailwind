// Topic0.jsx
// Topic: Introduction to DNS: What is Domain Name System and why it is needed
// This component provides a comprehensive lesson on DNS fundamentals with animations, SVGs, and interactive sections.

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0 - Introduction to DNS
 * Purpose: Explain the Domain Name System, its necessity, and basic operation.
 * When & Why: Used as the first lesson in a DNS curriculum to establish foundational knowledge.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic0 = () => {
  // State for interactive demo (optional, enhances learning)
  const [showAnalogy, setShowAnalogy] = useState(false);

  // Animation classes for staggered children (using inline keyframes)
  // Parent container will have fade-up reveal for each section
  useEffect(() => {
    // No side effects needed for animations; purely CSS-driven
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section with animated gradient underline */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Domain Name System (DNS)
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            The Phonebook of the Internet — translating human-friendly names to machine-readable addresses
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Grid - one column, stacked sections */}
        <div className="space-y-12">
          {/* Section 1: What is DNS? - Detailed concept */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔍</span> What is DNS?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="leading-relaxed">
                The <strong className="text-blue-600 dark:text-blue-400">Domain Name System (DNS)</strong> is a hierarchical and decentralized naming system for computers, services, or any resource connected to the internet or a private network. It translates human-readable domain names (like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">www.example.com</code>) into numerical IP addresses (like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">192.0.2.1</code>) that computers use to identify each other on the network.
              </p>
              <p className="mt-4 leading-relaxed">
                Think of DNS as the <strong className="text-purple-600 dark:text-purple-400">global phonebook of the internet</strong>. Without DNS, we would have to remember long strings of numbers (IP addresses) for every website we want to visit — an impossible task for humans. DNS works silently in the background, making the web accessible and user-friendly.
              </p>
            </div>

            {/* Interactive Analogy Button */}
            <button
              onClick={() => setShowAnalogy(!showAnalogy)}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200"
            >
              <span>{showAnalogy ? "Hide" : "Show"} Real-World Analogy</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAnalogy ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            {showAnalogy && (
              <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-l-4 border-blue-500 animate-[fadeUp_0.4s_ease-out]">
                <p className="italic text-gray-700 dark:text-gray-300">
                  📞 <strong>Analogy:</strong> When you want to call your friend "Mamata" from Barrackpore, you don't dial her name — you look up her phone number in your contacts app. DNS does the same: you type "kolkata.gov.in", DNS finds the IP address "203.0.113.5" and connects you.
                </p>
              </div>
            )}
          </section>

          {/* Section 2: Why DNS is needed - Real world usage */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">❓</span> Why is DNS essential?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Human Convenience</h3>
                <p className="leading-relaxed">We remember names like <strong>google.com</strong> easily, but not <strong>142.250.185.46</strong>. DNS bridges the gap.</p>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-green-600 dark:text-green-400">Scalability & Flexibility</h3>
                <p className="leading-relaxed">Websites can change IP addresses (e.g., moving servers) without affecting users, as long as DNS records update.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">Load Balancing & Redundancy</h3>
                <p className="leading-relaxed">DNS can return different IPs for the same domain to distribute traffic (e.g., round-robin DNS).</p>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-orange-600 dark:text-orange-400">Security & Organization</h3>
                <p className="leading-relaxed">Hierarchy allows centralized management and security extensions like DNSSEC.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Illustrated DNS Workflow with SVG */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-300">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">🔄</span> How DNS Works (High-Level)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="100%" height="260" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradUser" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="gradDNS" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                  </marker>
                </defs>

                {/* User Computer */}
                <rect x="40" y="90" width="120" height="80" rx="12" fill="url(#gradUser)" className="drop-shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl origin-center" />
                <text x="100" y="130" textAnchor="middle" fill="white" font-weight="bold" fontSize="14">Your Device</text>
                <text x="100" y="150" textAnchor="middle" fill="#E0E7FF" fontSize="12">(Browser/App)</text>

                {/* DNS Resolver */}
                <rect x="340" y="90" width="140" height="80" rx="12" fill="url(#gradDNS)" className="drop-shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl origin-center" />
                <text x="410" y="130" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">DNS Resolver</text>
                <text x="410" y="150" textAnchor="middle" fill="#FCE7F3" fontSize="12">(Usually ISP)</text>

                {/* Website Server */}
                <rect x="640" y="90" width="120" height="80" rx="12" fill="url(#gradUser)" className="drop-shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl origin-center" />
                <text x="700" y="130" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">Website Server</text>
                <text x="700" y="150" textAnchor="middle" fill="#E0E7FF" fontSize="12">(IP Address)</text>

                {/* Arrows with animation */}
                <line x1="160" y1="130" x2="330" y2="130" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5 5">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                </line>
                <text x="245" y="120" textAnchor="middle" fill="#4B5563" fontSize="12">1. Query: www.site.com</text>

                <line x1="480" y1="130" x2="630" y2="130" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5 5">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" begin="0.5s" />
                </line>
                <text x="555" y="120" textAnchor="middle" fill="#4B5563" fontSize="12">2. Ask for IP</text>

                <line x1="630" y1="170" x2="480" y2="190" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5 5">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" begin="1s" />
                </line>
                <text x="560" y="200" textAnchor="middle" fill="#4B5563" fontSize="12">3. Return IP (192.0.2.1)</text>

                <line x1="410" y1="190" x2="160" y2="210" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5 5">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" begin="1.5s" />
                </line>
                <text x="285" y="230" textAnchor="middle" fill="#4B5563" fontSize="12">4. IP returned to device</text>
              </svg>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              Simplified DNS resolution flow: Your device asks a DNS resolver, which finds the IP and returns it.
            </p>
          </section>

          {/* Section 4: Tips & Tricks from Professionals */}
          <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400 border border-amber-200 dark:border-amber-800">
            <h2 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-300">💡 Pro Tips & Tricks</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200">
              <li>Use <code className="bg-white dark:bg-gray-800 px-1 rounded">nslookup</code> or <code className="bg-white dark:bg-gray-800 px-1 rounded">dig</code> to manually query DNS and debug resolution issues.</li>
              <li>Flush your local DNS cache (<code className="bg-white dark:bg-gray-800 px-1 rounded">ipconfig /flushdns</code> on Windows, <code className="bg-white dark:bg-gray-800 px-1 rounded">sudo dscacheutil -flushcache</code> on macOS) to clear corrupted entries.</li>
              <li>Change to public DNS servers like Google (8.8.8.8) or Cloudflare (1.1.1.1) for faster and more private browsing.</li>
              <li>Understand TTL (Time to Live) values — lower TTL means faster propagation but more queries; higher TTL improves caching but delays updates.</li>
            </ul>
          </section>

          {/* Section 5: Beginner Mistakes & Best Practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
                <li><strong>Assuming DNS is instant:</strong> Propagation can take up to 48 hours due to caching.</li>
                <li><strong>Ignoring DNS cache:</strong> Old records cause "site not found" errors even after migration.</li>
                <li><strong>Misconfiguring TTL too low:</strong> Increases load on authoritative servers unnecessarily.</li>
                <li><strong>Not using secondary DNS:</strong> Single point of failure brings down entire domain.</li>
                <li><strong>Confusion between domain registrar and DNS hosting:</strong> They are separate services.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
                <li>Always set at least two authoritative name servers for redundancy.</li>
                <li>Monitor DNS performance and uptime using tools like DNSPerf.</li>
                <li>Enable DNSSEC to protect against cache poisoning and spoofing.</li>
                <li>Document all DNS records and their purposes for team collaboration.</li>
                <li>Test DNS changes using <code className="bg-white dark:bg-gray-800 px-1 rounded">dig +trace</code> before applying critical updates.</li>
              </ul>
            </div>
          </div>

          {/* Section 6: Hint Section to encourage thinking */}
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-600 border-l-8 border-indigo-400">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">🤔 Think About...</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              What happens if the DNS resolver you're using goes down? Can you still access websites by their IP addresses directly? Try changing your computer's DNS settings to <code className="bg-white dark:bg-gray-800 px-1 rounded">1.1.1.1</code> and observe any difference in browsing speed.
            </p>
          </div>

          {/* Section 7: Mini Checklist */}
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-4">📋 Lesson Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Define DNS and its primary purpose",
                "Explain why humans need DNS (vs IP addresses)",
                "Describe the basic resolution flow (user → resolver → IP)",
                "List at least two real-world benefits of DNS",
                "Identify common DNS mistakes and how to avoid them",
                "Know how to flush DNS cache on your OS",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <FAQTemplate
              title="DNS Introduction FAQs"
              questions={questions}
            />
          </div>

          {/* Teacher's Note */}
          <div className="animate-[fadeUp_0.6s_ease-out] animation-delay-900">
            <Teacher
              note={"Emphasize that DNS is like a distributed database, not a single server. Encourage students to run 'nslookup google.com' on their terminals. Relate the hierarchy to real-world addressing — Kolkata to specific street numbers."}
            />
          </div>
        </div>
      </div>

      {/* Inline keyframes for animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-\\[fadeUp_0\\.6s_ease-out\\] {
          animation: fadeUp 0.6s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeUp_0\\.6s_ease-out\\] {
            animation: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Topic0;