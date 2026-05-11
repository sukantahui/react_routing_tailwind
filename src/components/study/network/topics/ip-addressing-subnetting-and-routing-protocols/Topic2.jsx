// Topic2.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';

/**
 * Topic2 Component: Routing Protocols (RIP, OSPF, BGP)
 * @returns {JSX.Element} Full educational section on dynamic routing
 * Purpose: Explain how routers learn paths automatically using distance-vector (RIP),
 *          link-state (OSPF), and path-vector (BGP) protocols.
 * When & Why used: After IP addressing and subnetting; core to network scalability.
 */

const Topic2 = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={clsx(darkMode ? 'dark' : '', 'min-h-screen')}>
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-section {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Routing Protocols: RIP, OSPF, BGP
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                How routers find the best path across the internet
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Section 1: Introduction */}
          <section className="animated-section space-y-4 animate-[fadeSlideUp_0.6s_ease-out] delay-[0ms]">
            <div className="bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500 p-6 rounded-r-xl">
              <p className="text-lg leading-relaxed">
                Imagine giving directions to a friend: you can either send a letter with turn-by-turn instructions (static routing), or your friend can ask every person they meet on the street for the best way (dynamic routing).  
                <span className="font-semibold text-orange-600 dark:text-orange-400"> Routing protocols </span> 
                allow routers to automatically discover and adapt to network changes — essential for the internet.  
                Three major families: <strong>RIP</strong> (simple, distance‑vector), <strong>OSPF</strong> (scalable, link‑state), and <strong>BGP</strong> (the glue of the internet, path‑vector).
              </p>
            </div>
          </section>

          {/* Section 2: Three Protocol Cards (stacked, not side-by-side) */}
          <div className="space-y-6">
            <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[100ms]">
              <div className="group bg-gray-50 dark:bg-gray-800/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l2-2M5 10v4a2 2 0 002 2h10a2 2 0 002-2v-4M5 10h14m-7 4h.01" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">RIP (Routing Information Protocol)</h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed list-disc pl-5">
                  <li><span className="font-mono">Distance-vector</span> protocol, uses hop count as metric (max 15 hops).</li>
                  <li>Sends full routing table every 30 seconds → slow convergence, prone to "count to infinity".</li>
                  <li><span className="font-semibold">RIPv2</span> supports CIDR, authentication, multicast (224.0.0.9).</li>
                  <li>Best for very small networks (e.g., Abhronila's home lab with 3 routers).</li>
                  <li>Not used in large enterprise or ISP backbones.</li>
                </ul>
                <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded text-sm">
                  💡 <span className="font-mono">show ip route</span> – routes marked "R" are from RIP.
                </div>
              </div>
            </div>

            <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[200ms]">
              <div className="group bg-gray-50 dark:bg-gray-800/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">OSPF (Open Shortest Path First)</h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed list-disc pl-5">
                  <li><span className="font-mono">Link-state</span> protocol: each router builds a complete map of the network using Dijkstra's algorithm.</li>
                  <li>Metric = cost (cumulative bandwidth-based). Fast convergence, no hop limit.</li>
                  <li>Hierarchical design: Areas (Area 0 backbone) reduce routing table size.</li>
                  <li>Used in large campus networks (e.g., Jadavpur University’s multi‑building network).</li>
                  <li>Multicast addresses: <code>224.0.0.5</code> (all OSPF routers), <code>224.0.0.6</code> (DR/BDR).</li>
                </ul>
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded text-sm">
                  💡 <span className="font-mono">show ip ospf neighbor</span> – check adjacency state.
                </div>
              </div>
            </div>

            <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[300ms]">
              <div className="group bg-gray-50 dark:bg-gray-800/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">BGP (Border Gateway Protocol)</h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed list-disc pl-5">
                  <li><span className="font-mono">Path-vector</span> protocol: uses AS_PATH, next-hop, and many attributes to choose best path.</li>
                  <li>Connects Autonomous Systems (AS) – the routing protocol of the internet.</li>
                  <li><span className="font-semibold">eBGP</span> between different ASes, <span className="font-semibold">iBGP</span> within an AS.</li>
                  <li>Decisions based on policy, not just shortest path (e.g., avoid certain countries).</li>
                  <li>Example: Susmita’s ISP in Kolkata uses BGP to exchange routes with Tata, Airtel, and international providers.</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
                  💡 <span className="font-mono">show ip bgp summary</span> – see BGP neighbors.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Comparison Table and SVG Animation */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[400ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-3">Quick Comparison</h2>
            <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="text-left p-2">Feature</th><th className="text-left p-2">RIP</th><th className="text-left p-2">OSPF</th><th className="text-left p-2">BGP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2">Type</td><td>Distance-vector</td><td>Link-state</td><td>Path-vector</td></tr>
                  <tr><td className="p-2">Metric</td><td>Hop count</td><td>Cost (bandwidth)</td><td>Attributes (AS_PATH, MED, etc.)</td></tr>
                  <tr><td className="p-2">Convergence</td><td>Slow (~180 sec)</td><td>Fast (seconds)</td><td>Slow (can be minutes, but stable)</td></tr>
                  <tr><td className="p-2">Scope</td><td>Small ({`<`}15 hops)</td><td>Enterprise, large campus</td><td>Internet (global ASes)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-2">
              <svg width="300" height="60" viewBox="0 0 300 60" className="max-w-full h-auto">
                <rect x="10" y="10" width="280" height="40" rx="20" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="1.5">
                  <animate attributeName="width" values="280;260;280" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="150" y="35" textAnchor="middle" fontSize="12" fill="#f97316" className="dark:text-orange-300">RIP → OSPF → BGP: increasing scale & complexity</text>
              </svg>
            </div>
          </div>

          {/* Section 4: Real-World Analogy */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[500ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-3">Real-World Analogy: Directions at a Big Festival</h2>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border-l-8 border-amber-500">
              <p className="leading-relaxed">
                <span className="font-semibold">RIP</span> is like a lost child asking each person for the way home – but if someone gives a wrong answer, it takes many rounds to correct.  
                <span className="font-semibold">OSPF</span> is like every person having a complete map; they all update each other immediately when a road closes.  
                <span className="font-semibold">BGP</span> is like the federation of city planners (each city = AS) – they agree on which roads to use based on political agreements, not just distance.
              </p>
              <p className="mt-3 italic text-sm">Example: Debangshu in Barrackpore wants to reach Mamata in Kolkata. RIP: 3 hops – but the “hop” might be a slow link. OSPF: calculates cost (fiber = 1, DSL = 10). BGP: selects path that goes through trusted partners even if longer.</p>
            </div>
          </div>

          {/* Section 5: Tips, Pitfalls, Best Practices */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[600ms] space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border-l-8 border-indigo-400">
              <h3 className="text-xl font-semibold">💡 Pro Tips & Tricks</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li>Always use <strong>passive-interface</strong> in OSPF to prevent sending hellos on unused interfaces.</li>
                <li>For RIP, avoid using on links with more than 15 routers (hop count limit).</li>
                <li>BGP: Use route maps to filter prefixes and set local preference for outgoing traffic engineering.</li>
                <li>Use <code>show ip route [protocol]</code> to verify correct route propagation.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-xl border-l-8 border-red-400">
              <h3 className="text-xl font-semibold">⚠️ Common Mistakes & Misconceptions</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li><span className="font-bold">Thinking RIP is still widely used:</span> Rare nowadays except in legacy or tiny networks.</li>
                <li><span className="font-bold">OSPF areas not properly designed:</span> Placing all routers in Area 0 defeats hierarchy.</li>
                <li><span className="font-bold">BGP `network` command misunderstanding:</span> It does not "advertise" a network unless an exact matching route exists in the IP routing table.</li>
                <li><span className="font-bold">Forgetting to configure router-id in OSPF:</span> May cause adjacency issues if not unique.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
              <h3 className="text-xl font-semibold">✅ Best Practices & Checklist</h3>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>✔ Plan your routing protocol based on network size: RIP for tiny ({`<`}50 routers), OSPF for larger, BGP for connecting to ISPs.</li>
                <li>✔ Secure routing updates: use authentication (MD5 for OSPF, keychain for BGP).</li>
                <li>✔ In BGP, implement prefix limits to avoid DDoS via route table overflow.</li>
                <li>✔ Monitor convergence times: after changes, ensure all routes installed.</li>
              </ul>
              <p className="mt-3 text-sm italic">Mini checklist: Know the difference between IGP (internal) and EGP (external) – RIP/OSPF are IGPs, BGP is EGP. Understand metric vs. administrative distance.</p>
            </div>
          </div>

          {/* Hint Section */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[700ms] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-xl text-center italic">
            <p className="text-gray-700 dark:text-gray-300">🧠 <span className="font-semibold">Observe carefully:</span> Why does BGP take longer to converge? How does OSPF's link-state flooding differ from RIP's periodic broadcasts?</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Try configuring a small OSPF area in GNS3/EVE-NG and watch the SPF calculation after a link flap.</p>
          </div>

          {/* FAQ */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[800ms]">
            <FAQTemplate title="Routing Protocols (RIP, OSPF, BGP) FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[900ms]">
            <Teacher note="Students often confuse administrative distance (trustworthiness of a protocol) with metric (cost within a protocol). Use the analogy: AD is 'who do you trust more?', metric is 'which path within that person's advice?' Also, highlight that BGP is policy-based – not about shortest path. I like to show a live looking glass (e.g., route-views) to see BGP routes in action." />
          </div>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Networking Foundations — Routing Protocols (RIP, OSPF, BGP)</p>
        </footer>
      </div>
    </div>
  );
};

export default Topic2;