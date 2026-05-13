// Topic2.jsx
// Topic: Working of DNS: Step-by-step name resolution process
// This component explains the complete resolution flow from user request to IP address.

import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2 - Working of DNS: Step-by-step name resolution process
 * Purpose: Walk through the exact steps a resolver takes to convert a domain name to an IP address.
 * When & Why: After understanding domain vs IP, students need to know the translation mechanism.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic2 = () => {
  const [step, setStep] = useState(0); // Interactive step visualizer
  const steps = [
    "1. User types domain → Stub resolver checks cache",
    "2. Query sent to recursive resolver (ISP DNS)",
    "3. Recursive resolver checks its cache",
    "4. Resolver queries root server (.) for TLD location",
    "5. Root returns referral to .com TLD servers",
    "6. Resolver queries .com TLD servers",
    "7. .com TLD returns NS of example.com",
    "8. Resolver queries authoritative server for example.com",
    "9. Authoritative server returns A record (IP address)",
    "10. IP returned to browser, website loads"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Step-by-Step DNS Resolution
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            The journey of a DNS query — from browser to root servers and back
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Section 1: Overview flowchart with SVG */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🗺️</span> The Resolution Journey
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="800" height="320" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#2563EB" />
                  </marker>
                  <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#16A34A" />
                  </marker>
                </defs>
                
                <!-- Step 1: User -->
                <rect x="30" y="140" width="100" height="50" rx="8" fill="#3B82F6" className="drop-shadow-md transition-all hover:scale-105" />
                <text x="80" y="170" textAnchor="middle" fill="white" fontSize="14">Browser</text>
                
                <!-- Step 2: Stub resolver -->
                <rect x="170" y="140" width="100" height="50" rx="8" fill="#8B5CF6" />
                <text x="220" y="170" textAnchor="middle" fill="white" fontSize="12">Stub Resolver</text>
                
                <!-- Step 3: Recursive resolver -->
                <rect x="310" y="140" width="110" height="50" rx="8" fill="#EC4899" />
                <text x="365" y="170" textAnchor="middle" fill="white" fontSize="11">Recursive</text>
                <text x="365" y="182" textAnchor="middle" fill="white" fontSize="10">Resolver (ISP)</text>
                
                <!-- Step 4: Root -->
                <rect x="460" y="60" width="80" height="40" rx="6" fill="#F59E0B" />
                <text x="500" y="84" textAnchor="middle" fill="#1F2937" fontSize="12">Root</text>
                
                <!-- Step 5: TLD -->
                <rect x="460" y="140" width="80" height="40" rx="6" fill="#F59E0B" />
                <text x="500" y="164" textAnchor="middle" fill="#1F2937" fontSize="12">.com TLD</text>
                
                <!-- Step 6: Authoritative -->
                <rect x="460" y="220" width="100" height="40" rx="6" fill="#10B981" />
                <text x="510" y="244" textAnchor="middle" fill="white" fontSize="10">Authoritative</text>
                <text x="510" y="254" textAnchor="middle" fill="white" fontSize="9">(example.com)</text>
                
                <!-- Arrows -->
                <line x1="130" y1="165" x2="168" y2="165" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                <line x1="270" y1="165" x2="308" y2="165" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                
                <!-- Resolver to root -->
                <line x1="420" y1="145" x2="458" y2="80" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.6s" repeatCount="indefinite" />
                </line>
                <line x1="540" y1="80" x2="580" y2="145" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowGreen)">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.6s" repeatCount="indefinite" begin="0.3s" />
                </line>
                
                <!-- Resolver to TLD -->
                <line x1="420" y1="160" x2="458" y2="160" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.6s" repeatCount="indefinite" begin="0.6s" />
                </line>
                <line x1="540" y1="160" x2="580" y2="160" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowGreen)">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.6s" repeatCount="indefinite" begin="0.9s" />
                </line>
                
                <!-- Resolver to Authoritative -->
                <line x1="420" y1="185" x2="458" y2="240" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.6s" repeatCount="indefinite" begin="1.2s" />
                </line>
                <line x1="560" y1="240" x2="600" y2="185" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowGreen)">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.6s" repeatCount="indefinite" begin="1.5s" />
                </line>
                
                <text x="365" y="210" textAnchor="middle" fill="#4B5563" fontSize="10">Query path → → →</text>
                <text x="365" y="225" textAnchor="middle" fill="#4B5563" fontSize="10">Response ← ← ←</text>
              </svg>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">Sequential resolution: cache → root → TLD → authoritative → answer</p>
          </section>

          {/* Section 2: Step-by-Step Interactive Explainer */}
          <section className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold mb-4">🔢 Step-by-Step Breakdown</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStep(idx)}
                  className={clsx(
                    "px-3 py-1 rounded-full text-sm transition-all duration-200",
                    step === idx
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-inner min-h-[160px]">
              <p className="text-lg leading-relaxed">{steps[step]}</p>
              {step === 0 && <p className="mt-2 text-gray-600 dark:text-gray-400">💡 The browser (or OS) first checks its local DNS cache. If found, resolution ends here — fast!</p>}
              {step === 1 && <p className="mt-2 text-gray-600 dark:text-gray-400">🌐 The stub resolver sends a recursive query to your configured DNS server (usually your ISP or public DNS like 8.8.8.8).</p>}
              {step === 2 && <p className="mt-2 text-gray-600 dark:text-gray-400">⚡ The recursive resolver checks its own cache. Popular domains often are cached, skipping the long path.</p>}
              {step === 3 && <p className="mt-2 text-gray-600 dark:text-gray-400">🌍 The resolver asks one of the 13 root server clusters: "Where can I find .com TLD servers?"</p>}
              {step === 4 && <p className="mt-2 text-gray-600 dark:text-gray-400">📡 Root returns a referral list of nameservers for the .com TLD (with glue records).</p>}
              {step === 5 && <p className="mt-2 text-gray-600 dark:text-gray-400">🏢 Resolver queries a .com TLD server: "What are the nameservers for example.com?"</p>}
              {step === 6 && <p className="mt-2 text-gray-600 dark:text-gray-400">📋 .com TLD returns NS records for example.com's authoritative nameservers (and possibly glue).</p>}
              {step === 7 && <p className="mt-2 text-gray-600 dark:text-gray-400">🔍 Resolver queries the authoritative server: "What is the A record for example.com?"</p>}
              {step === 8 && <p className="mt-2 text-gray-600 dark:text-gray-400">✅ Authoritative server answers with the IP address (e.g., 93.184.216.34).</p>}
              {step === 9 && <p className="mt-2 text-gray-600 dark:text-gray-400">🎉 IP is returned to browser, which initiates HTTP request. The website loads!</p>}
            </div>
          </section>

          {/* Section 3: Caching Layers */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl animate-[fadeUp_0.6s_ease-out] animation-delay-300">
            <h2 className="text-2xl font-bold mb-4">💾 Where Caching Happens</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-xl">🖥️</span>
                <div><strong className="text-blue-600">Browser Cache:</strong> Chrome/Firefox cache DNS for a few seconds to minutes. Can be cleared via chrome://net-internals/#dns.</div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-xl">💻</span>
                <div><strong className="text-blue-600">OS Cache (stub resolver):</strong> Windows, macOS, Linux cache responses based on TTL. Use <code>ipconfig /displaydns</code> (Windows) or <code>sudo killall -HUP mDNSResponder</code> (macOS) to flush.</div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-xl">🌍</span>
                <div><strong className="text-blue-600">Recursive Resolver Cache:</strong> Your ISP or public DNS caches for millions of users, drastically reducing upstream queries.</div>
              </div>
            </div>
          </section>

          {/* Section 4: Real-World Example with Mamata */}
          <section className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400">
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">📖 Real-World Story: Mamata in Barrackpore visits a school website</h2>
            <p className="leading-relaxed mb-3">Mamata types <code>jadavpur-high-school.edu.in</code> in her browser. Here's what happens behind the scenes:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Browser cache:</strong> No record, so she asks OS stub resolver.</li>
              <li><strong>OS cache:</strong> Not found. Query forwarded to ISP's DNS resolver (e.g., 203.0.113.1).</li>
              <li><strong>ISP recursive resolver:</strong> Has no cache for this domain. It starts from root servers to find .edu.in TLD.</li>
              <li><strong>Root servers:</strong> Refer to .in TLD servers (since .edu.in is under .in ccTLD).</li>
              <li><strong>.in TLD:</strong> Refers to .edu.in registry (owned by NIXI).</li>
              <li><strong>.edu.in TLD:</strong> Returns NS records for jadavpur-high-school.edu.in's authoritative DNS.</li>
              <li><strong>Authoritative server:</strong> Returns A record (203.0.113.88).</li>
              <li><strong>Caching:</strong> ISP caches the IP for TTL (e.g., 1 hour). Mamata's OS also caches.</li>
              <li><strong>Browser:</strong> Connects to 203.0.113.88 and loads the website.</li>
            </ol>
            <p className="mt-3 italic text-gray-600 dark:text-gray-400">Total time: usually 20-100ms. Caching makes subsequent visits instant!</p>
          </section>

          {/* Section 5: Tips & Tricks */}
          <section className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-6 md:p-8 border-l-8 border-amber-400 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">🎓 Professional Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <code>dig +trace domain.com</code> to see the exact step-by-step resolution in real time.</li>
              <li>Set <code>options single-request</code> in /etc/resolv.conf on Linux to avoid IPv4/IPv6 race conditions.</li>
              <li>Monitor resolver performance with <code>dnstracer</code> or <code>dnsperf</code>.</li>
              <li>Always configure at least two nameservers in /etc/resolv.conf for redundancy.</li>
              <li>Flush local DNS cache when testing changes to avoid stale results.</li>
            </ul>
          </section>

          {/* Section 6: Common Mistakes & Best Practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-600">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Assuming resolution is instant:</strong> First query may take hundreds of ms; caching hides this.</li>
                <li><strong>Forgetting DNS propagation:</strong> Changes can take up to 48 hours due to TTL caches.</li>
                <li><strong>Misunderstanding recursion vs iteration:</strong> The stub resolver only does recursion; the recursive resolver does iteration.</li>
                <li><strong>Not testing with +trace:</strong> Many think their local DNS is broken when it's actually a remote issue.</li>
                <li><strong>Single point of failure:</strong> Only one nameserver in resolv.conf -> outage brings down resolution.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Set TTLs appropriately: 300 seconds for dynamic records, 86400 for stable records.</li>
                <li>Use <code>dig +trace</code> to debug delegation issues.</li>
                <li>Configure DNS over TLS/HTTPS to prevent eavesdropping on queries.</li>
                <li>Regularly monitor resolver response times and cache hit rates.</li>
                <li>Document the full resolution path for critical domains.</li>
              </ul>
            </div>
          </div>

          {/* Section 7: Hint Section */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">🧠 Try This</h2>
            <p className="leading-relaxed">Open your terminal and run <code>dig +trace google.com</code>. Observe each referral: first root (.), then .com TLD, then google's nameservers. Can you identify the glue records? How long does the trace take compared to a normal <code>dig google.com</code>?</p>
          </div>

          {/* Section 8: Checklist */}
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-4">📋 Resolution Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Describe the 4 main server types involved (stub, recursive, root, TLD, authoritative)",
                "Explain the difference between recursive and iterative queries",
                "List at least 3 caching layers and their TTL effects",
                "Trace a sample domain using dig +trace",
                "Identify the purpose of root servers (13 logical families)",
                "Understand why TLD servers don't store A records — only delegations"
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
            <FAQTemplate title="DNS Resolution Process FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <Teacher note="Walk students through 'dig +trace' live on a big screen. Show how caching drastically reduces latency on second run. Emphasize that root servers do not answer for specific domains — they only point to TLDs. Relate iterative queries to asking for directions step by step, rather than having someone else do all the work." />
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

export default Topic2;