// Topic4.jsx
// Topic: DNS Resolution Process: Recursive and Iterative queries
// This component explains the two query types used in DNS resolution with detailed examples.

import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4 - DNS Resolution Process: Recursive and Iterative queries
 * Purpose: Differentiate between recursive and iterative queries and understand when each is used.
 * When & Why: After learning server types, students need to understand the communication patterns.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic4 = () => {
  const [activeMode, setActiveMode] = useState("recursive");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Recursive vs Iterative Queries
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Two distinct communication patterns that power DNS resolution
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Section 1: Mode Selector with Descriptions */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              <button
                onClick={() => setActiveMode("recursive")}
                className={clsx(
                  "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2",
                  activeMode === "recursive"
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                <span className="text-xl">🔄</span> Recursive Query
              </button>
              <button
                onClick={() => setActiveMode("iterative")}
                className={clsx(
                  "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2",
                  activeMode === "iterative"
                    ? "bg-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                <span className="text-xl">🔁</span> Iterative Query
              </button>
            </div>

            {activeMode === "recursive" && (
              <div className="space-y-4 animate-[fadeUp_0.4s_ease-out]">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">🔄 Recursive Query</h2>
                <p className="leading-relaxed">
                  A <strong className="text-blue-600">recursive query</strong> asks the DNS server to take full responsibility for finding the answer.
                  The client (stub resolver) sends a recursive query to its configured recursive resolver.
                  The recursive resolver must either return a valid answer (IP address) or an error — it cannot return a referral.
                  This shifts all the work of following referrals to the server.
                </p>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="font-mono text-sm">Client → Recursive Resolver: "Find google.com's IP address for me, and don't come back until you have it!"</p>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Used by end-user devices (stub resolvers)</li>
                  <li>Requires the server to have recursion enabled (RA flag)</li>
                  <li>Simplifies client logic — client just waits for final answer</li>
                  <li>Common with ISP DNS, public DNS (8.8.8.8, 1.1.1.1)</li>
                </ul>
              </div>
            )}

            {activeMode === "iterative" && (
              <div className="space-y-4 animate-[fadeUp_0.4s_ease-out]">
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">🔁 Iterative Query</h2>
                <p className="leading-relaxed">
                  An <strong className="text-purple-600">iterative query</strong> asks the DNS server to return the best answer it knows,
                  which may be a referral to another server. The client (usually a recursive resolver) is responsible for
                  following referrals and continuing the query. Iterative queries are used between DNS servers (recursive → root → TLD → authoritative).
                </p>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="font-mono text-sm">Recursive Resolver → Root Server: "Do you know google.com's IP? If not, tell me who might know."</p>
                  <p className="font-mono text-sm mt-2">Root Server → Recursive Resolver: "I don't know, but here are the .com TLD servers."</p>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Used between DNS servers during resolution</li>
                  <li>Each server returns a referral, not a final answer (until authoritative)</li>
                  <li>Client must know how to follow referrals</li>
                  <li>Root servers and TLD servers only respond iteratively by default</li>
                </ul>
              </div>
            )}
          </section>

          {/* Section 2: SVG Flow Diagram */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold mb-6 text-center">📊 Query Flow Comparison</h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="750" height="340" viewBox="0 0 750 340" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <marker id="arrowRecur" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#2563EB" />
                  </marker>
                  <marker id="arrowIter" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#7C3AED" />
                  </marker>
                </defs>

                {/* Client */}
                <rect x="30" y="140" width="100" height="50" rx="8" fill="#3B82F6" />
                <text x="80" y="170" textAnchor="middle" fill="white" fontSize="12">Client</text>
                <text x="80" y="185" textAnchor="middle" fill="#BFDBFE" fontSize="10">(Stub Resolver)</text>

                {/* Recursive Resolver */}
                <rect x="200" y="130" width="130" height="55" rx="8" fill="#2563EB" />
                <text x="265" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Recursive</text>
                <text x="265" y="170" textAnchor="middle" fill="#BFDBFE" fontSize="10">Resolver</text>

                {/* Root/TLD/Auth (group) */}
                <rect x="420" y="40" width="100" height="40" rx="6" fill="#F59E0B" />
                <text x="470" y="65" textAnchor="middle" fill="#1F2937" fontSize="11">Root</text>

                <rect x="420" y="130" width="100" height="40" rx="6" fill="#8B5CF6" />
                <text x="470" y="155" textAnchor="middle" fill="white" fontSize="11">.com TLD</text>

                <rect x="420" y="220" width="110" height="40" rx="6" fill="#10B981" />
                <text x="475" y="245" textAnchor="middle" fill="white" fontSize="10">Authoritative</text>

                {/* Recursive Query (blue) */}
                <line x1="130" y1="165" x2="198" y2="160" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowRecur)" />
                <text x="164" y="145" textAnchor="middle" fill="#2563EB" fontSize="10">Recursive</text>
                <text x="164" y="155" textAnchor="middle" fill="#2563EB" fontSize="9">(RD=1)</text>

                <line x1="330" y1="150" x2="418" y2="60" stroke="#7C3AED" strokeWidth="1.5" markerEnd="url(#arrowIter)" strokeDasharray="4 2" />
                <line x1="330" y1="150" x2="418" y2="150" stroke="#7C3AED" strokeWidth="1.5" markerEnd="url(#arrowIter)" strokeDasharray="4 2" />
                <line x1="330" y1="150" x2="418" y2="240" stroke="#7C3AED" strokeWidth="1.5" markerEnd="url(#arrowIter)" strokeDasharray="4 2" />

                <text x="375" y="55" textAnchor="middle" fill="#7C3AED" fontSize="9">Iterative</text>
                <text x="375" y="110" textAnchor="middle" fill="#7C3AED" fontSize="9">Iterative</text>
                <text x="375" y="280" textAnchor="middle" fill="#7C3AED" fontSize="9">Iterative</text>

                {/* Responses */}
                <line x1="420" y1="60" x2="330" y2="180" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowIter)" />
                <line x1="420" y1="150" x2="330" y2="180" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowIter)" />
                <line x1="420" y1="240" x2="330" y2="190" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowIter)" />

                <text x="375" y="195" textAnchor="middle" fill="#16A34A" fontSize="9">Referrals</text>

                {/* Final answer back to client */}
                <line x1="330" y1="180" x2="130" y2="185" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowRecur)" />
                <text x="230" y="200" textAnchor="middle" fill="#2563EB" fontSize="10">Final IP</text>

                <text x="265" y="230" textAnchor="middle" fill="#6B7280" fontSize="10">Only ONE recursive query</text>
                <text x="265" y="245" textAnchor="middle" fill="#6B7280" fontSize="10">Multiple iterative queries</text>
              </svg>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              Recursive: client asks once, server does all work. Iterative: server gives referrals, client follows.
            </p>
          </section>

          {/* Section 3: Detailed Analogy */}
          <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-300">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-4">🏫 Analogy: Asking for Directions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-700">🔄 Recursive (Like a Travel Agent)</h3>
                <p className="mt-2 leading-relaxed">Debangshu wants to go to a specific shop in Kolkata. He calls a travel agent and says: "Find me the exact address and don't hang up until you have it." The agent calls multiple sources, follows referrals, and finally gives the address. Debangshu makes one call.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700">🔁 Iterative (Like Asking Strangers)</h3>
                <p className="mt-2 leading-relaxed">Mahima asks a person: "Where is the shop?" Person says: "I don't know, but ask the policeman on the corner." She asks the policeman: "Where?" He says: "Ask the shopkeeper two blocks down." She asks the shopkeeper, who gives the address. She makes multiple calls.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Real-World Example */}
          <section className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400">
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">🌐 Real-World: Abhronila visits a website</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">1.</span>
                <p>Abhronila types <code>example.com</code>. Her laptop's <strong>stub resolver</strong> sends a <strong className="text-blue-600">recursive query</strong> to her ISP's recursive resolver (RD=1).</p>
              </div>
              <div className="flex gap-3">
                <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">2.</span>
                <p>ISP recursive resolver now performs <strong className="text-purple-600">iterative queries</strong>: asks root server → gets referral to .com TLD → asks .com TLD → gets referral to example.com authoritative → asks authoritative → gets A record.</p>
              </div>
              <div className="flex gap-3">
                <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">3.</span>
                <p>The recursive resolver returns the final IP to Abhronila's laptop. Only <strong>one recursive query</strong> was sent from the client.</p>
              </div>
            </div>
          </section>

          {/* Section 5: Tips & Tricks */}
          <section className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 border-l-8 border-indigo-400 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">💡 Professional Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <code>dig +recurse</code> to force recursive mode; <code>dig +norecurse</code> to disable recursion.</li>
              <li>Check the <code>RA</code> (Recursion Available) flag in response: <code>dig example.com | grep flags:</code></li>
              <li>Open resolvers (allow recursion from anyone) are dangerous — restrict with ACLs.</li>
              <li>Use <code>dig +trace</code> to see iterative queries in action (bypasses recursive resolver).</li>
              <li>For debugging, send recursive query to authoritative-only server — expect REFUSED.</li>
            </ul>
          </section>

          {/* Section 6: Common Mistakes & Best Practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-600">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Confusing the terms:</strong> Recursive refers to the <em>client's request type</em>, not the server type.</li>
                <li><strong>Assuming recursive resolver is the only one doing recursion:</strong> Stub resolvers send recursive queries.</li>
                <li><strong>Misconfiguring recursion on authoritative-only servers:</strong> Creates security risks.</li>
                <li><strong>Not understanding RD/RA flags:</strong> Leads to misinterpretation of responses.</li>
                <li><strong>Using iterative queries from a stub resolver:</strong> Most stub resolvers don't implement iteration.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Always set <code>recursion no;</code> on authoritative-only nameservers.</li>
                <li>Use ACLs to restrict recursion to trusted networks on recursive resolvers.</li>
                <li>Test recursive vs iterative behavior with <code>dig +recurse</code> and <code>dig +norecurse</code>.</li>
                <li>Enable DNSSEC validation on recursive resolvers for security.</li>
                <li>Monitor the ratio of recursive vs iterative queries for performance tuning.</li>
              </ul>
            </div>
          </div>

          {/* Section 7: Hint Section */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">🧪 Try This</h2>
            <p className="leading-relaxed">Run <code>dig example.com +norecurse</code>. What do you see? Compare with <code>dig example.com +recurse</code>. Now try <code>dig @a.root-servers.net google.com +norecurse</code>. Why does the root server give a referral instead of an IP?</p>
          </div>

          {/* Section 8: Checklist */}
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-4">📋 Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Define recursive query and explain when it's used",
                "Define iterative query and explain when it's used",
                "Differentiate between RD (Recursion Desired) and RA (Recursion Available)",
                "Explain why stub resolvers use recursive queries",
                "Describe the iterative process between recursive resolver and root/TLD servers",
                "Use dig +recurse and +norecurse flags"
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
            <FAQTemplate title="Recursive vs Iterative Queries FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <Teacher note="Use the analogy of 'phone versus in-person direction asking' to cement the difference. Show dig +trace which uses iterative queries internally. Emphasize that recursion is a service — a server can choose to offer it or not. Ask students what happens if a recursive resolver goes down (no internet unless they manually change DNS settings)." />
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

export default Topic4;