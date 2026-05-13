// Topic5.jsx
// Topic: A Record (IPv4 mapping)
// This component explains the Address record that maps domain names to IPv4 addresses.

import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5 - A Record (IPv4 mapping)
 * Purpose: Understand the most fundamental DNS record type that maps domains to IPv4 addresses.
 * When & Why: After learning resolution, students need to know the record that actually provides the IP.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic5 = () => {
  const [showBinary, setShowBinary] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            A Record (IPv4 Address Mapping)
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            The backbone of DNS — translating domain names into IPv4 addresses
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Section 1: What is an A Record? */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔤</span> What is an A Record?
            </h2>
            <p className="leading-relaxed mb-4">
              The <strong className="text-blue-600 dark:text-blue-400">A record</strong> (Address record) is the most fundamental DNS record type.
              It maps a domain name (or subdomain) to a <strong className="text-blue-600">32-bit IPv4 address</strong>.
              Without A records, domain names would be useless — they provide the final answer that browsers need to connect to web servers.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg font-mono text-sm">
              example.com.    A    93.184.216.34
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Syntax: <code>domain TTL IN A IPv4_address</code>. TTL is optional (defaults to zone minimum).
            </p>
            <button
              onClick={() => setShowBinary(!showBinary)}
              className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showBinary ? "Hide" : "Show"} IPv4 binary representation
            </button>
            {showBinary && (
              <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs">
                <p>93.184.216.34 in binary:</p>
                <p>93 → 01011101 | 184 → 10111000 | 216 → 11011000 | 34 → 00100010</p>
                <p>Full 32-bit: 01011101101110001101100000100010</p>
              </div>
            )}
          </section>

          {/* Section 2: When and Why Use A Records */}
          <section className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">🎯 Purpose & Usage</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Website hosting:</strong> Point your domain to your web server's IP address.</li>
              <li><strong>Subdomain delegation:</strong> Create separate A records for www, blog, mail, etc.</li>
              <li><strong>Load balancing:</strong> Multiple A records (round-robin) distribute traffic across servers.</li>
              <li><strong>Geo-location:</strong> Different A records for users from different regions (via GeoDNS).</li>
              <li><strong>Internal networks:</strong> Map internal hostnames to private IPs (192.168.x.x).</li>
            </ul>
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="font-mono text-sm">; Multiple A records for round-robin load balancing<br/>
              webserver1.example.com.  A  192.0.2.10<br/>
              webserver2.example.com.  A  192.0.2.11<br/>
              webserver3.example.com.  A  192.0.2.12</p>
            </div>
          </section>

          {/* Section 3: SVG Illustration - A Record Lookup */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-300">
            <h2 className="text-2xl font-bold mb-6 text-center">🖼️ A Record Resolution Flow</h2>
            <div className="flex justify-center">
              <svg width="700" height="200" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <marker id="arrowA" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#2563EB" />
                  </marker>
                </defs>
                <rect x="30" y="70" width="140" height="50" rx="8" fill="#3B82F6" />
                <text x="100" y="100" textAnchor="middle" fill="white" fontSize="13">www.example.com</text>
                <text x="100" y="115" textAnchor="middle" fill="#BFDBFE" fontSize="11">(Domain Name)</text>

                <line x1="170" y1="95" x2="230" y2="95" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowA)" />
                <text x="200" y="85" textAnchor="middle" fill="#2563EB" fontSize="11">DNS Query</text>

                <rect x="240" y="60" width="160" height="70" rx="8" fill="#8B5CF6" />
                <text x="320" y="90" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">A Record</text>
                <text x="320" y="110" textAnchor="middle" fill="#E9D5FF" fontSize="11">93.184.216.34</text>

                <line x1="400" y1="95" x2="460" y2="95" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowA)" />
                <text x="430" y="85" textAnchor="middle" fill="#2563EB" fontSize="11">Returns IP</text>

                <rect x="470" y="70" width="140" height="50" rx="8" fill="#10B981" />
                <text x="540" y="95" textAnchor="middle" fill="white" fontSize="13">93.184.216.34</text>
                <text x="540" y="112" textAnchor="middle" fill="#D1FAE5" fontSize="11">(IPv4 Address)</text>

                <animate attributeName="opacity" values="1" dur="2s" repeatCount="indefinite" />
              </svg>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
              The A record is the final answer in DNS resolution for IPv4 connections.
            </p>
          </section>

          {/* Section 4: Real-World Example with Mamata's School */}
          <section className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-4">🏫 Real-World: Mamata's School Website</h2>
            <p className="leading-relaxed mb-3">Mamata's school in Barrackpore registers <code>barrackpore-girls-school.edu.in</code>. They host the website on a server with IPv4 address <code>203.0.113.88</code>. The DNS administrator creates an A record:</p>
            <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm my-3">
              barrackpore-girls-school.edu.in.  3600  IN  A  203.0.113.88
            </div>
            <p>When Mamata types the domain, DNS returns 203.0.113.88, and her browser connects. If the school moves to a new hosting provider (new IP), the admin simply updates the A record — Mamata still uses the same domain name.</p>
          </section>

          {/* Section 5: Professional Tips & Tricks */}
          <section className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 border-l-8 border-indigo-400 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">💡 Pro Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <code>dig A example.com +short</code> to quickly see the IP address.</li>
              <li>Multiple A records = round-robin load balancing; clients pick the first IP.</li>
              <li>Set TTL appropriately: short (300-600s) for dynamic IPs, long (86400s) for stable servers.</li>
              <li>Always have at least two A records for redundancy (different IPs/availability zones).</li>
              <li>For private/internal DNS, use RFC 1918 addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).</li>
              <li>Check A record propagation: <code>dig @8.8.8.8 example.com A</code> vs <code>dig @1.1.1.1 example.com A</code>.</li>
            </ul>
          </section>

          {/* Section 6: Common Mistakes & Best Practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-600">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Wrong IP address:</strong> Typo in A record makes website unreachable.</li>
                <li><strong>Forgetting trailing dot in zone files:</strong> <code>example.com. A 1.2.3.4</code> vs <code>example.com A 1.2.3.4</code> (relative vs FQDN).</li>
                <li><strong>Using public IPs in internal DNS:</strong> Causes routing issues; use private IPs internally.</li>
                <li><strong>Single A record for critical services:</strong> No redundancy; server goes down = site down.</li>
                <li><strong>Not updating A records after IP change:</strong> Users see old cached IP for up to TTL.</li>
                <li><strong>Confusing IPv4 with IPv6:</strong> A record is only for IPv4; use AAAA for IPv6.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Always set TTL before changing IP (lower TTL 24 hours in advance).</li>
                <li>Use health checks to automatically remove failed A records from load balancer rotation.</li>
                <li>Document all A records with purpose (e.g., "web server primary", "backup mail").</li>
                <li>Implement monitoring: probe each A record IP for uptime.</li>
                <li>Use separate A records for different services (www, api, mail).</li>
                <li>Use authoritative DNS providers with API for automated updates.</li>
              </ul>
            </div>
          </div>

          {/* Section 7: Hint Section */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">🔍 Observe Carefully</h2>
            <p className="leading-relaxed">Run <code>dig google.com A</code>. You'll see multiple A records. Try <code>dig google.com A +short</code>. Now run it several times — does the order of IPs change? This is round-robin DNS load balancing. Try <code>dig @ns1.google.com google.com A</code> to query authoritative server directly.</p>
          </div>

          {/* Section 8: Mini Checklist */}
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-4">📋 Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Define A record and its purpose (domain → IPv4)",
                "Write correct syntax for an A record in a zone file",
                "Explain what happens when a domain has multiple A records",
                "Understand TTL implications for A records",
                "Use dig/nslookup to query A records",
                "Differentiate between A record and AAAA record"
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

          {/* FAQ Section */}
          <div className="animate-[fadeUp_0.6s_ease-out] animation-delay-900">
            <FAQTemplate title="A Record (IPv4 Mapping) FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <Teacher note="Show students how to add an A record in a real DNS control panel (e.g., Cloudflare demo). Emphasize that the '@' symbol in zone files represents the root of the zone (apex domain). Demonstrate propagation delay by changing an A record and querying from different public resolvers. Use the analogy of a phone number: domain = person's name, A record = phone number." />
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

export default Topic5;