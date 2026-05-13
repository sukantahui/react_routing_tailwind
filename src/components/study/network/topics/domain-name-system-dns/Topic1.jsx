// Topic1.jsx
// Topic: Domain Names vs IP Addresses: Human-readable vs machine-readable addressing
// This component explains the fundamental difference between human-friendly domain names and numeric IP addresses.

import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1 - Domain Names vs IP Addresses
 * Purpose: Clarify why both naming systems exist and how they complement each other.
 * When & Why: Used after introducing DNS to establish the core problem DNS solves.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic1 = () => {
  // State for interactive toggles (show/hide comparisons)
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Domain Names vs IP Addresses
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Human-readable names vs machine-readable numbers — a fundamental duality of the internet
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Section 1: Core Concept - Two Sides of the Same Coin */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🧩</span> Two Addressing Systems, One Purpose
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl">
                <div className="text-4xl mb-2">🌐</div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Domain Name</h3>
                <p className="mt-2 leading-relaxed">
                  Human-friendly, memorable, and meaningful.<br />
                  Example: <code className="bg-white dark:bg-gray-800 px-1 rounded">www.kolkata.gov.in</code>
                </p>
                <ul className="list-disc pl-5 mt-3 text-sm space-y-1">
                  <li>Easy to remember (e.g., google.com)</li>
                  <li>Hierarchical (subdomain.domain.tld)</li>
                  <li>Case-insensitive</li>
                  <li>Can be changed without breaking links</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl">
                <div className="text-4xl mb-2">🔢</div>
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">IP Address</h3>
                <p className="mt-2 leading-relaxed">
                  Machine-readable, numeric, and location-specific.<br />
                  Example: <code className="bg-white dark:bg-gray-800 px-1 rounded">203.0.113.5</code> (IPv4)
                </p>
                <ul className="list-disc pl-5 mt-3 text-sm space-y-1">
                  <li>Unique identifier for each device</li>
                  <li>Used for routing packets</li>
                  <li>Two versions: IPv4 (32-bit) and IPv6 (128-bit)</li>
                  <li>Hard for humans to remember</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {showComparison ? "Hide" : "Show"} Detailed Comparison Table
              </button>
            </div>
            {showComparison && (
              <div className="mt-5 overflow-x-auto animate-[fadeUp_0.4s_ease-out]">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr><th className="p-3 text-left">Aspect</th><th className="p-3 text-left">Domain Name</th><th className="p-3 text-left">IP Address</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr><td className="p-3 font-medium">Example</td><td className="p-3">blog.abhronila.in</td><td className="p-3">192.0.2.88</td></tr>
                    <tr><td className="p-3 font-medium">Length</td><td className="p-3">Up to 253 chars</td><td className="p-3">IPv4: 15 chars max, IPv6: up to 39 chars</td></tr>
                    <tr><td className="p-3 font-medium">Memorability</td><td className="p-3">High</td><td className="p-3">Very low</td></tr>
                    <tr><td className="p-3 font-medium">Stability</td><td className="p-3">Can change without user impact (DNS)</td><td className="p-3">Changes when device moves or network changes</td></tr>
                    <tr><td className="p-3 font-medium">Used by</td><td className="p-3">Humans, browsers, email clients</td><td className="p-3">Routers, network devices, servers</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Section 2: Why Two? The Problem of Human Memory */}
          <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-300">🤔 Why can't we just use one?</h2>
            <p className="leading-relaxed mb-4">
              Imagine if you had to remember the IP address of every website you visit: <strong>142.250.185.46</strong> for Google, 
              <strong>31.13.79.246</strong> for Facebook, <strong>151.101.1.140</strong> for Reddit. Humans can only reliably remember 
              5–9 random numbers (Miller's Law). Domain names solve this by providing meaningful, branded names.
            </p>
            <p className="leading-relaxed">
              On the other hand, computers need numeric addresses to route packets efficiently. IP addresses encode network location 
              (like a postal code + house number). DNS acts as the translator between the two worlds.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-amber-500">
              <p className="italic">💡 <strong>Think about:</strong> When Mamata in Barrackpore writes a letter, she uses "Kolkata, West Bengal" (human-readable), but the postal sorting machine uses PIN code 700120 (machine-readable). DNS is the post office's sorting system.</p>
            </div>
          </section>

          {/* Section 3: Illustrated Comparison with SVG */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-300">
            <h2 className="text-2xl font-bold mb-6 text-center">🖼️ Visual: Human vs Machine World</h2>
            <div className="flex justify-center">
              <svg width="700" height="240" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="humanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="machineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                {/* Human side */}
                <rect x="30" y="30" width="280" height="180" rx="16" fill="url(#humanGrad)" opacity="0.15" />
                <text x="170" y="60" textAnchor="middle" fill="#3B82F6" fontWeight="bold" fontSize="18">👤 Human World</text>
                <text x="170" y="90" textAnchor="middle" fill="#1F2937" fontSize="14">www.mamata-school.edu</text>
                <text x="170" y="115" textAnchor="middle" fill="#4B5563" fontSize="12">barrackpore.gov.in</text>
                <text x="170" y="140" textAnchor="middle" fill="#4B5563" fontSize="12">blog.susmita.com</text>
                <text x="170" y="175" textAnchor="middle" fill="#6B7280" fontSize="11">Meaningful, memorable</text>

                {/* Arrow */}
                <line x1="310" y1="120" x2="390" y2="120" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
                <text x="350" y="105" textAnchor="middle" fill="#6B7280" fontSize="11">DNS</text>
                <text x="350" y="145" textAnchor="middle" fill="#6B7280" fontSize="10">Translation</text>

                {/* Machine side */}
                <rect x="390" y="30" width="280" height="180" rx="16" fill="url(#machineGrad)" opacity="0.15" />
                <text x="530" y="60" textAnchor="middle" fill="#EC4899" fontWeight="bold" fontSize="18">🤖 Machine World</text>
                <text x="530" y="90" textAnchor="middle" fill="#1F2937" fontSize="14">192.0.2.1</text>
                <text x="530" y="115" textAnchor="middle" fill="#4B5563" fontSize="12">203.0.113.45</text>
                <text x="530" y="140" textAnchor="middle" fill="#4B5563" fontSize="12">2001:db8::1</text>
                <text x="530" y="175" textAnchor="middle" fill="#6B7280" fontSize="11">Numeric, routable</text>

                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                  </marker>
                </defs>
              </svg>
            </div>
          </section>

          {/* Section 4: Real-world usage examples */}
          <section className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">🌍 Real-World Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-bold text-lg">🏫 School Websites</h3>
                <p>A school in Jadavpur advertises <code>jadavpur-high.edu.in</code> on its brochures. Students remember that easily. Behind the scenes, DNS points it to <code>103.245.15.20</code>. If the school changes ISP (new IP), they update DNS — students still use the same domain.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-bold text-lg">📧 Email Configuration</h3>
                <p>Your email client (Outlook/Gmail) asks you to enter <code>imap.gmail.com</code> (domain). It's much easier than remembering <code>74.125.28.109</code>. And if Google changes its server IPs, you don't need to update thousands of email clients.</p>
              </div>
            </div>
          </section>

          {/* Section 5: Tips & Tricks */}
          <section className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 border-l-8 border-indigo-400 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">💡 Pro Tips</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
              <li>You can directly use an IP address in your browser (e.g., <code>http://142.250.185.46</code>), but it may not work for virtual hosting (multiple sites on one IP).</li>
              <li>Use <code>ping</code> or <code>nslookup</code> to see the IP behind any domain name.</li>
              <li>IPv6 addresses are longer but provide vastly more addresses; you'll see them in modern networks.</li>
              <li>Private IP ranges (like 192.168.x.x) are not reachable from the internet — they need domain names only for internal networks.</li>
            </ul>
          </section>

          {/* Section 6: Common mistakes & best practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-600">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Assuming one-to-one mapping:</strong> A domain can have multiple IPs (load balancing) and multiple domains can point to one IP (virtual hosting).</li>
                <li><strong>Confusing public vs private IPs:</strong> 192.168.x.x won't work on the internet.</li>
                <li><strong>Case sensitivity:</strong> Domain names are case-insensitive (Google.com == google.com), but that's not true for paths after the domain.</li>
                <li><strong>Forgetting the trailing dot:</strong> In DNS configs, <code>example.com.</code> (with dot) is fully qualified; without dot, it's relative.</li>
              </ul>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use descriptive domain names that are easy to spell and type.</li>
                <li>Always have both A (IPv4) and AAAA (IPv6) records for dual-stack support.</li>
                <li>Monitor IP address changes and update DNS records promptly.</li>
                <li>Use a reputable DNS hosting provider for reliability.</li>
              </ul>
            </div>
          </div>

          {/* Section 7: Hint Section */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">🔎 Observe Carefully</h2>
            <p className="leading-relaxed">Try this: Open your command line and type <code>ping google.com</code>. Write down the IP address. Then wait an hour and ping again. Did it change? Now try <code>ping -4 google.com</code> vs <code>ping -6 google.com</code>. What do you notice about the IPv6 address format?</p>
          </div>

          {/* Section 8: Mini Checklist */}
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">📋 Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Distinguish between domain names and IP addresses",
                "Explain why humans prefer domain names",
                "Explain why computers need IP addresses",
                "Provide an example of a domain name and its corresponding IP",
                "Identify that one IP can host many domains (virtual hosting)",
                "Know how to check a domain's IP using ping or nslookup",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="animate-[fadeUp_0.6s_ease-out] animation-delay-900">
            <FAQTemplate title="Domain Names vs IP Addresses FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <Teacher note="Encourage students to open a terminal and run 'nslookup' on various domains. Ask them to share the IPs they find. Highlight the difference between IPv4 dotted decimal and IPv6 hexadecimal notation. Use real local examples: IP of kolkata.gov.in vs a student's home router IP (192.168.x.x)." />
        </div>
      </div>

      {/* Inline keyframes */}
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

export default Topic1;