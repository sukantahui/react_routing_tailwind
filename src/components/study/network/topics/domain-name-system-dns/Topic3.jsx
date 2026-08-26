// Topic3.jsx
// Topic: Types of DNS Servers: Root Server, TLD Server, Authoritative Server, Recursive Resolver
// This component explains the four essential server types in DNS hierarchy and their roles.

import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3 - Types of DNS Servers
 * Purpose: Differentiate the four server types and understand their roles in resolution.
 * When & Why: After learning resolution steps, students need to know each server's responsibility.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic3 = () => {
  const [selectedServer, setSelectedServer] = useState("recursive");

  const servers = {
    recursive: {
      title: "Recursive Resolver",
      icon: "🔄",
      color: "blue",
      role: "Client-facing server that performs full resolution on behalf of users.",
      details: "Also called 'recursive resolver' or 'DNS recursor'. Usually provided by ISPs or public DNS (8.8.8.8, 1.1.1.1). It receives recursive queries from stub resolvers, then iteratively queries root, TLD, and authoritative servers. It caches answers to speed up future queries.",
      example: "Your home router or ISP DNS (e.g., 203.0.113.1)",
      commands: "nslookup google.com  # Your configured recursive resolver handles it"
    },
    root: {
      title: "Root Server",
      icon: "🌍",
      color: "orange",
      role: "Top of DNS hierarchy; directs queries to the appropriate TLD servers.",
      details: "There are 13 logical root server families (A-M) with hundreds of physical instances via anycast. They don't know IP addresses for domains, only where to find TLD servers (.com, .org, .in, etc.). Root zone file is managed by IANA.",
      example: "a.root-servers.net (198.41.0.4), b.root-servers.net (199.9.14.201)",
      commands: "dig . NS  # List root servers"
    },
    tld: {
      title: "TLD Server",
      icon: "🏢",
      color: "purple",
      role: "Manages top-level domains (.com, .org, .in, .edu, etc.) and points to authoritative servers.",
      details: "TLD servers are operated by registries like Verisign (.com), PIR (.org), NIXI (.in). They store NS records for second-level domains (example.com). They do not store A records, only delegations. TLD servers also provide glue records when needed.",
      example: "a.gtld-servers.net (for .com), ns1.registry.in (for .in)",
      commands: "dig NS google.com  # Shows .com TLD delegation"
    },
    authoritative: {
      title: "Authoritative Server",
      icon: "📜",
      color: "green",
      role: "The source of truth for a domain; provides actual DNS records (A, MX, TXT, etc.).",
      details: "Authoritative servers are the final answer in resolution. They can be primary (master) or secondary (slave) for redundancy. They respond with the requested record (e.g., A for IPv4). They never perform recursion for others (though they can be configured to).",
      example: "ns1.cloudflare.com (for many domains), ns1.google.com",
      commands: "dig @ns1.google.com google.com A  # Query authoritative directly"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Types of DNS Servers
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            The four pillars of DNS infrastructure — each with a distinct job
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Section 1: Interactive Server Selector */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🗂️</span> Server Types at a Glance
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(servers).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedServer(key)}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    selectedServer === key
                      ? `bg-${servers[key].color}-600 text-white shadow-md`
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {servers[key].icon} {servers[key].title}
                </button>
              ))}
            </div>
            <div className={clsx(
              "rounded-xl p-5 transition-all duration-300",
              selectedServer === "recursive" && "bg-blue-50 dark:bg-blue-900/20 border-l-8 border-blue-500",
              selectedServer === "root" && "bg-amber-50 dark:bg-amber-900/20 border-l-8 border-amber-500",
              selectedServer === "tld" && "bg-purple-50 dark:bg-purple-900/20 border-l-8 border-purple-500",
              selectedServer === "authoritative" && "bg-green-50 dark:bg-green-900/20 border-l-8 border-green-500"
            )}>
              <h3 className="text-2xl font-bold mb-2">{servers[selectedServer].icon} {servers[selectedServer].title}</h3>
              <p className="text-lg font-semibold mb-3">{servers[selectedServer].role}</p>
              <p className="leading-relaxed mb-3">{servers[selectedServer].details}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Example:</strong> {servers[selectedServer].example}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><strong>Test command:</strong> <code>{servers[selectedServer].commands}</code></p>
            </div>
          </section>

          {/* Section 2: Hierarchy Diagram SVG */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold mb-6 text-center">📊 DNS Server Hierarchy</h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="750" height="380" viewBox="0 0 750 380" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradRecursive" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="gradRoot" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                  <linearGradient id="gradTLD" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#6D28D9" />
                  </linearGradient>
                  <linearGradient id="gradAuth" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <marker id="arrowDown" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#6B7280" />
                  </marker>
                </defs>

                {/* Levels */}
                <rect x="300" y="20" width="150" height="50" rx="8" fill="url(#gradRecursive)" className="drop-shadow-md" />
                <text x="375" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Recursive Resolver</text>
                <text x="375" y="80" textAnchor="middle" fill="#6B7280" fontSize="11">(e.g., ISP DNS, 8.8.8.8)</text>

                <line x1="375" y1="70" x2="375" y2="110" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowDown)" />

                <rect x="100" y="120" width="120" height="45" rx="8" fill="url(#gradRoot)" className="drop-shadow-md" />
                <text x="160" y="148" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">🌍 Root Server</text>
                <text x="160" y="180" textAnchor="middle" fill="#6B7280" fontSize="10">(13 families)</text>

                <rect x="315" y="120" width="120" height="45" rx="8" fill="url(#gradTLD)" className="drop-shadow-md" />
                <text x="375" y="148" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">🏢 TLD Server</text>
                <text x="375" y="180" textAnchor="middle" fill="#6B7280" fontSize="10">(.com, .org, .in)</text>

                <rect x="530" y="120" width="120" height="45" rx="8" fill="url(#gradAuth)" className="drop-shadow-md" />
                <text x="590" y="148" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">📜 Authoritative</text>
                <text x="590" y="180" textAnchor="middle" fill="#6B7280" fontSize="10">(example.com)</text>

                {/* Arrows from Recursive to each */}
                <path d="M 330 70 L 200 110" stroke="#6B7280" strokeWidth="1.5" fill="none" markerEnd="url(#arrowDown)" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.5s" repeatCount="indefinite" />
                </path>
                <path d="M 380 70 L 375 110" stroke="#6B7280" strokeWidth="1.5" fill="none" markerEnd="url(#arrowDown)" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.5s" repeatCount="indefinite" begin="0.2s" />
                </path>
                <path d="M 420 70 L 550 110" stroke="#6B7280" strokeWidth="1.5" fill="none" markerEnd="url(#arrowDown)" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.5s" repeatCount="indefinite" begin="0.4s" />
                </path>

                {/* Labels */}
                <text x="210" y="100" textAnchor="middle" fill="#4B5563" fontSize="10">Step 1: Ask root</text>
                <text x="375" y="100" textAnchor="middle" fill="#4B5563" fontSize="10">Step 2: Ask TLD</text>
                <text x="570" y="100" textAnchor="middle" fill="#4B5563" fontSize="10">Step 3: Ask Auth</text>

                {/* Responses back */}
                <path d="M 200 170 L 330 220" stroke="#16A34A" strokeWidth="1.5" fill="none" markerEnd="url(#arrowDown)" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.5s" repeatCount="indefinite" begin="0.6s" />
                </path>
                <path d="M 375 170 L 375 220" stroke="#16A34A" strokeWidth="1.5" fill="none" markerEnd="url(#arrowDown)" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.5s" repeatCount="indefinite" begin="0.8s" />
                </path>
                <path d="M 590 170 L 420 220" stroke="#16A34A" strokeWidth="1.5" fill="none" markerEnd="url(#arrowDown)" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.5s" repeatCount="indefinite" begin="1.0s" />
                </path>

                <text x="265" y="205" textAnchor="middle" fill="#16A34A" fontSize="9">referral</text>
                <text x="375" y="205" textAnchor="middle" fill="#16A34A" fontSize="9">referral</text>
                <text x="505" y="205" textAnchor="middle" fill="#16A34A" fontSize="9">A record</text>

                {/* Final answer */}
                <rect x="300" y="300" width="150" height="40" rx="8" fill="url(#gradRecursive)" opacity="0.8" />
                <text x="375" y="325" textAnchor="middle" fill="white" fontSize="12">Returns IP to client</text>
                <line x1="375" y1="265" x2="375" y2="298" stroke="#16A34A" strokeWidth="2" markerEnd="url(#arrowDown)" />
              </svg>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              Resolution flow: Recursive resolver queries root → TLD → authoritative → returns answer
            </p>
          </section>

          {/* Section 3: Comparison Table */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-300 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">📋 Server Comparison</h2>
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-3 text-left">Feature</th><th className="p-3 text-left">Recursive Resolver</th><th className="p-3 text-left">Root Server</th><th className="p-3 text-left">TLD Server</th><th className="p-3 text-left">Authoritative Server</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr><td className="p-3 font-medium">Primary Role</td><td className="p-3">Answer client queries via iteration</td><td className="p-3">Point to TLD servers</td><td className="p-3">Point to authoritative servers</td><td className="p-3">Provide final DNS records</td></tr>
                <tr><td className="p-3 font-medium">Caches Data</td><td className="p-3">Yes (extensive)</td><td className="p-3">Minimal (root hints)</td><td className="p-3">Yes (but limited)</td><td className="p-3">Only per record; no recursive cache</td></tr>
                <tr><td className="p-3 font-medium">Knows A Records?</td><td className="p-3">Only from cache</td><td className="p-3">No</td><td className="p-3">No (only NS delegations)</td><td className="p-3">Yes (for its zone)</td></tr>
                <tr><td className="p-3 font-medium">Examples</td><td className="p-3">8.8.8.8, 1.1.1.1, ISP DNS</td><td className="p-3">a.root-servers.net</td><td className="p-3">a.gtld-servers.net</td><td className="p-3">ns1.cloudflare.com</td></tr>
                <tr><td className="p-3 font-medium">Who operates?</td><td className="p-3">ISPs, Google, Cloudflare</td><td className="p-3">Various orgs (ICANN, Verisign, etc.)</td><td className="p-3">Registry operators</td><td className="p-3">Domain owners or DNS hosting</td></tr>
              </tbody>
            </table>
          </section>

          {/* Section 4: Real-world scenario with Susmita */}
          <section className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400">
            <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">🌐 Real-World: Susmita in Jadavpur visits a college website</h2>
            <p className="leading-relaxed mb-3">Susmita types <code>jadavpur-university.edu.in</code>. Here's which server does what:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Recursive Resolver (BSNL DNS):</strong> Receives her query, starts recursive process.</li>
              <li><strong>Root Server (e.root-servers.net):</strong> Tells BSNL DNS: ".in TLD servers are at x.x.x.x".</li>
              <li><strong>.in TLD Server (ns1.registry.in):</strong> Tells BSNL DNS: ".edu.in zone is delegated to ns1.edu.in".</li>
              <li><strong>.edu.in TLD Server:</strong> Tells BSNL DNS: "jadavpur-university.edu.in authoritative servers are ns1.university.edu".</li>
              <li><strong>Authoritative Server (ns1.university.edu):</strong> Returns A record 203.0.113.99.</li>
            </ul>
            <p className="mt-3 italic text-gray-600 dark:text-gray-400">Each server type has a specific, non-overlapping role. No single server does everything.</p>
          </section>

          {/* Section 5: Tips & Tricks */}
          <section className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-6 md:p-8 border-l-8 border-amber-400 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">💡 Professional Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <code>dig +trace</code> to see which root, TLD, and authoritative servers are contacted.</li>
              <li>To find your current recursive resolver: <code>nslookup google.com</code> and check the "Server" line.</li>
              <li>Check TLD delegation health with <code>dig NS domain.com +trace</code>.</li>
              <li>Authoritative-only servers should never be used as recursive resolvers (security risk).</li>
              <li>Root server anycast means you're always routed to the nearest instance.</li>
            </ul>
          </section>

          {/* Section 6: Common Mistakes & Best Practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-600">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Confusing recursive vs authoritative:</strong> Many think a single server does both — usually separate.</li>
                <li><strong>Assuming root servers know all IPs:</strong> They only know TLD locations.</li>
                <li><strong>TLD servers don't store A records:</strong> They only delegate; don't query TLD for A.</li>
                <li><strong>Not having at least two authoritative NS records:</strong> Single point of failure.</li>
                <li><strong>Misconfigured NS records at registrar:</strong> Makes domain unresolvable.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use diverse authoritative nameservers (different providers, geographies).</li>
                <li>Monitor root and TLD response times for latency issues.</li>
                <li>Configure DNSSEC on authoritative servers to protect your domain.</li>
                <li>For recursive resolvers, implement rate limiting to prevent DDoS amplification.</li>
                <li>Regularly audit NS records to ensure correct delegation.</li>
              </ul>
            </div>
          </div>

          {/* Section 7: Hint */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">🔎 Try This</h2>
            <p className="leading-relaxed">Run <code>dig +trace google.com</code> and note the names of root servers (e.g., a.root-servers.net), TLD servers (e.g., e.gtld-servers.net), and authoritative servers (e.g., ns1.google.com). Can you identify which is which?</p>
          </div>

          {/* Section 8: Checklist */}
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-4">📋 Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Identify the four types of DNS servers and their roles",
                "Explain why root servers don't store A records",
                "Describe what a TLD server does",
                "Differentiate authoritative from recursive resolvers",
                "Understand that recursive resolvers cache answers",
                "Run dig +trace to observe each server type in action"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="animate-[fadeUp_0.6s_ease-out] animation-delay-900">
            <FAQTemplate title="Types of DNS Servers FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <Teacher note="Use the interactive server selector to focus on one type at a time. Walk through a live 'dig +trace' on screen. Emphasize that root servers are not a single machine but anycast clusters. Ask students: 'If the root servers go down, does the entire internet stop?' (Yes, but they are highly redundant.)" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-\\[fadeUp_0\\.6s_ease-out\\] { animation: fadeUp 0.6s ease-out forwards; }
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
          .animate-\\[fadeUp_0\\.6s_ease-out\\] { animation: none; opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Topic3;