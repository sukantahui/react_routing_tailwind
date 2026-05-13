// Topic6.jsx
// Topic: AAAA Record (IPv6 mapping)
// This component explains the IPv6 address record, its syntax, usage, and importance.

import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6 - AAAA Record (IPv6 mapping)
 * Purpose: Understand the IPv6 counterpart of the A record, mapping domain names to 128-bit IPv6 addresses.
 * When & Why: After learning A records, students need to know IPv6 support for modern internet.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic6 = () => {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            AAAA Record (IPv6 Address Mapping)
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            The future of internet addressing — mapping domains to 128-bit IPv6 addresses
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Section 1: What is an AAAA Record? */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🟣</span> What is an AAAA Record?
            </h2>
            <p className="leading-relaxed mb-4">
              The <strong className="text-purple-600 dark:text-purple-400">AAAA record</strong> (pronounced "quad-A") maps a domain name to an 
              <strong className="text-purple-600"> IPv6 address</strong> (128-bit). IPv6 is the successor to IPv4, designed to solve the address exhaustion problem.
              "AAAA" stands for 4 times the size of an A record (4 × 32 bits = 128 bits).
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg font-mono text-sm">
              example.com.    AAAA    2001:0db8:85a3:0000:0000:8a2e:0370:7334
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Syntax: <code>domain TTL IN AAAA IPv6_address</code>. IPv6 addresses can be compressed (e.g., <code>::1</code> for loopback).
            </p>
            <button
              onClick={() => setShowExpanded(!showExpanded)}
              className="mt-4 text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              {showExpanded ? "Hide" : "Show"} IPv6 address compression examples
            </button>
            {showExpanded && (
              <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs space-y-1">
                <p>Full: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
                <p>Leading zeros omitted: 2001:db8:85a3:0:0:8a2e:370:7334</p>
                <p>Double colon (once): 2001:db8:85a3::8a2e:370:7334</p>
                <p>Loopback: ::1</p>
                <p>IPv4-mapped: ::ffff:192.0.2.1</p>
              </div>
            )}
          </section>

          {/* Section 2: Why IPv6 and AAAA Records? */}
          <section className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">🌍 Why IPv6 & AAAA Records?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">IPv4 exhaustion:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>~4.3 billion addresses (theoretically)</li>
                  <li>IANA ran out in 2011, RIRs depleted by 2021</li>
                  <li>NAT hides the problem but breaks end-to-end connectivity</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">IPv6 advantages:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>~340 undecillion addresses (3.4×10³⁸)</li>
                  <li>No NAT needed — every device can have public IP</li>
                  <li>Built-in IPSec, better multicast, simpler header</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="font-mono text-sm">; Dual-stack configuration (both IPv4 and IPv6)<br/>
              example.com.    A    192.0.2.1<br/>
              example.com.    AAAA 2001:db8::1</p>
            </div>
          </section>

          {/* Section 3: SVG Illustration - IPv4 vs IPv6 */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-300">
            <h2 className="text-2xl font-bold mb-6 text-center">🔄 IPv4 vs IPv6 Address Size Comparison</h2>
            <div className="flex justify-center">
              <svg width="650" height="180" viewBox="0 0 650 180" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <rect x="50" y="30" width="220" height="60" rx="8" fill="#3B82F6" opacity="0.8" />
                <text x="160" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">IPv4 (A Record)</text>
                <text x="160" y="75" textAnchor="middle" fill="#BFDBFE" fontSize="12">32 bits → 4.3 billion addresses</text>

                <rect x="380" y="30" width="220" height="60" rx="8" fill="#8B5CF6" opacity="0.8" />
                <text x="490" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">IPv6 (AAAA Record)</text>
                <text x="490" y="75" textAnchor="middle" fill="#E9D5FF" fontSize="12">128 bits → 340 undecillion addresses</text>

                <line x1="270" y1="60" x2="378" y2="60" stroke="#6B7280" strokeWidth="2" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
                <text x="325" y="50" textAnchor="middle" fill="#4B5563" fontSize="10">×4 bits</text>

                <rect x="150" y="120" width="350" height="40" rx="6" fill="#F59E0B" opacity="0.7" />
                <text x="325" y="145" textAnchor="middle" fill="#1F2937" fontSize="13">AAAA records are essential for modern internet and future-proofing</text>
              </svg>
            </div>
          </section>

          {/* Section 4: Real-World Example with Susmita */}
          <section className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-4">🏠 Real-World: Susmita's Home Network</h2>
            <p className="leading-relaxed mb-3">Susmita in Jadavpur gets a new ISP that provides native IPv6. She wants her personal blog <code>susmita-tech.blog</code> to be reachable via both IPv4 and IPv6. The DNS administrator adds:</p>
            <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm my-3">
              susmita-tech.blog.   3600   IN   A     203.0.113.45<br/>
              susmita-tech.blog.   3600   IN   AAAA  2001:db8:1234::1
            </div>
            <p>Now users with IPv6 (most mobile networks, many ISPs) connect directly to her server via IPv6, avoiding NAT and reducing latency. Dual-stack ensures everyone can reach the site.</p>
          </section>

          {/* Section 5: Professional Tips & Tricks */}
          <section className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 border-l-8 border-indigo-400 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">💡 Pro Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <code>dig AAAA example.com +short</code> to fetch IPv6 address.</li>
              <li>Test IPv6 connectivity: <code>ping6 google.com</code> or <code>curl -6 https://example.com</code>.</li>
              <li>Dual-stack (both A and AAAA) is recommended; don't rely solely on IPv6 yet.</li>
              <li>For internal networks, use Unique Local Addresses (fd00::/8) instead of public IPv6.</li>
              <li>Check AAAA records propagation with <code>dig @8.8.8.8 example.com AAAA</code>.</li>
              <li>Use IPv6 compression correctly: <code>::</code> can appear only once in an address.</li>
            </ul>
          </section>

          {/* Section 6: Common Mistakes & Best Practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-600">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Forgetting colon syntax:</strong> IPv6 uses colons, not dots — easy to mistype.</li>
                <li><strong>Multiple <code>::</code> compression:</strong> Using two double-colons makes address ambiguous.</li>
                <li><strong>No AAAA for IPv6-only networks:</strong> Clients can't reach your site if only A exists.</li>
                <li><strong>Assuming IPv6 is faster:</strong> Not always; depends on routing and ISP.</li>
                <li><strong>Firewall rules not updated:</strong> IPv6 bypasses IPv4 firewall if not configured.</li>
                <li><strong>Not testing both protocols:</strong> Site may work on IPv4 but break on IPv6.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Implement dual-stack (A + AAAA) for all public websites.</li>
                <li>Set consistent TTLs for A and AAAA records to avoid mismatched caches.</li>
                <li>Use IPv6-friendly monitoring (e.g., Nagios with ping6).</li>
                <li>Configure PTR records for IPv6 reverse DNS (ip6.arpa zone).</li>
                <li>Test with <code>https://ipv6-test.com/validate.php</code>.</li>
                <li>Document IPv6 addresses in DNS with meaningful names.</li>
              </ul>
            </div>
          </div>

          {/* Section 7: Hint Section */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">🔍 Try This</h2>
            <p className="leading-relaxed">Run <code>dig google.com AAAA +short</code>. You'll see IPv6 addresses (starting with 2a00: or 2404: etc.). Now try <code>ping6 google.com</code> (on macOS/Linux). Does it work? Check if your network has IPv6: <code>ip addr show</code> (Linux) or <code>ifconfig</code> (macOS) — look for 'inet6' lines.</p>
          </div>

          {/* Section 8: Mini Checklist */}
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-4">📋 Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Define AAAA record and its purpose (domain → IPv6)",
                "Distinguish between A and AAAA records",
                "Write correct syntax for an AAAA record (including compression)",
                "Explain why dual-stack is important",
                "Use dig to query AAAA records",
                "Test IPv6 connectivity with ping6 or curl -6"
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
            <FAQTemplate title="AAAA Record (IPv6 Mapping) FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <Teacher note="Explain the exhaustion of IPv4 using real statistics. Show students how to check if their home network has IPv6 (most mobile networks do). Demonstrate the difference between ping and ping6. Emphasize that AAAA is not just 'more addresses' but also simplifies network architecture by removing NAT. Use the analogy: IPv4 is like a 4-digit phone number (soon exhausted), IPv6 is like a 12-digit number — enough for every grain of sand on Earth." />
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

export default Topic6;