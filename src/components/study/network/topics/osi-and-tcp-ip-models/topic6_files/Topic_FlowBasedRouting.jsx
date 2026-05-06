// topic6_files/Topic_FlowBasedRouting.jsx
import React from 'react';
import FAQTemplate from '../../../../../../common/FAQTemplate';
import questions from './topic_flow_questions';

const Topic_FlowBasedRouting = () => {
  const keyframesStyle = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(1.5rem); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Header */}
          <section className="text-center space-y-4 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400">
              Flow‑Based Routing
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A congestion‑aware routing technique that dynamically balances traffic across multiple paths
            </p>
          </section>

          {/* Concept */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🔍 What is Flow‑Based Routing?
            </h2>
            <p>
              Flow‑based routing is an advanced network layer technique where routes are chosen not only by destination address but also by the <strong>traffic flow's characteristics</strong> (e.g., source, destination, protocol, QoS requirements). It aims to avoid congestion by <strong>splitting traffic</strong> across multiple parallel paths based on current network load.
            </p>
            <p className="mt-3">
              Unlike traditional <strong>destination‑based routing</strong> (same path for all packets to a given destination), flow‑based routing can send different flows (e.g., video streaming vs email) over different routes, optimising resource utilisation and reducing packet loss.
            </p>
            <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              💡 <span className="font-bold">Key idea:</span> Treats independent conversations (flows) separately. The first packet of a flow determines the path; subsequent packets follow the same path to preserve ordering.
            </div>
          </section>

          {/* Why Flow‑Based Routing? */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-cyan-500 pl-4 mb-4">
              📈 Why Use Flow‑Based Routing?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <span className="font-bold">🚦 Congestion Avoidance</span>
                <p className="text-sm mt-1">Load‑sensitive routing can move flows away from overloaded links, reducing packet loss and delays.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <span className="font-bold">⚖️ Load Balancing</span>
                <p className="text-sm mt-1">Parallel paths are used efficiently; no single link is over‑utilised while others are idle.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <span className="font-bold">🎯 Per‑Flow QoS</span>
                <p className="text-sm mt-1">High‑priority flows can be placed on low‑latency paths, while best‑effort traffic uses cheaper routes.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <span className="font-bold">📊 Flow‑Aware Security</span>
                <p className="text-sm mt-1">Monitoring per‑flow behaviour helps detect anomalies (e.g., DDoS attacks).</p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              ⚙️ How Flow‑Based Routing Works
            </h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li><strong>Flow definition:</strong> A flow is identified by a 5‑tuple (source IP, destination IP, source port, destination port, protocol).</li>
              <li><strong>Flow detection:</strong> The router inspects the first packet of a flow (or uses a flow cache).</li>
              <li><strong>Path selection:</strong> Based on current network state (link utilisation, queue lengths, delay), the router computes a path using a cost function (e.g., minimise maximum utilisation).</li>
              <li><strong>Flow placement:</strong> All subsequent packets of that flow follow the same path (to avoid reordering).</li>
              <li><strong>Dynamic adaptation:</strong> If link conditions change significantly, flows can be rerouted.</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              💡 <span className="font-bold">Real‑world example:</span> Multiprotocol Label Switching (MPLS) traffic engineering uses flow‑based routing to steer flows away from congested links.
            </div>
          </section>

          {/* SVG Diagram */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🎨 Visual: Flow‑Based vs Destination‑Based Routing
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="600" height="250" viewBox="0 0 600 250" className="max-w-full h-auto">
                {/* Destination‑based (left) */}
                <text x="150" y="30" textAnchor="middle" className="fill-current font-bold" fontSize="14">Destination‑Based</text>
                <rect x="100" y="50" width="100" height="40" fill="#ef4444" rx="5" />
                <text x="150" y="75" textAnchor="middle" fill="white">Src A</text>
                <rect x="250" y="50" width="100" height="40" fill="#3b82f6" rx="5" />
                <text x="300" y="75" textAnchor="middle" fill="white">Router</text>
                <rect x="400" y="50" width="100" height="40" fill="#10b981" rx="5" />
                <text x="450" y="75" textAnchor="middle" fill="white">Dest B</text>
                <line x1="200" y1="70" x2="250" y2="70" stroke="#ffaa44" strokeWidth="2" />
                <line x1="350" y1="70" x2="400" y2="70" stroke="#ffaa44" strokeWidth="2" />
                <text x="300" y="110" textAnchor="middle" className="fill-current" fontSize="12">All flows take same path</text>

                {/* Flow‑based (right) */}
                <text x="150" y="160" textAnchor="middle" className="fill-current font-bold" fontSize="14">Flow‑Based</text>
                <rect x="100" y="180" width="80" height="40" fill="#ef4444" rx="5" />
                <text x="140" y="205" textAnchor="middle" fill="white">Flow 1</text>
                <rect x="100" y="230" width="80" height="40" fill="#ef4444" rx="5" />
                <text x="140" y="255" textAnchor="middle" fill="white">Flow 2</text>
                <rect x="260" y="180" width="80" height="40" fill="#3b82f6" rx="5" />
                <text x="300" y="205" textAnchor="middle" fill="white">Router</text>
                <rect x="260" y="230" width="80" height="40" fill="#3b82f6" rx="5" />
                <text x="300" y="255" textAnchor="middle" fill="white">Router</text>
                <rect x="450" y="180" width="80" height="40" fill="#10b981" rx="5" />
                <text x="490" y="205" textAnchor="middle" fill="white">Dest</text>
                <rect x="450" y="230" width="80" height="40" fill="#10b981" rx="5" />
                <text x="490" y="255" textAnchor="middle" fill="white">Dest</text>
                <path d="M180 200 L260 200" stroke="#ffaa44" strokeWidth="2" />
                <path d="M260 200 L450 200" stroke="#ffaa44" strokeWidth="2" />
                <path d="M180 250 L260 250" stroke="#ffaa44" strokeWidth="2" strokeDasharray="5" />
                <path d="M340 250 L450 250" stroke="#ffaa44" strokeWidth="2" strokeDasharray="5" />
                <text x="220" y="170" fill="#ffaa44" fontSize="10">Path 1</text>
                <text x="220" y="270" fill="#ffaa44" fontSize="10">Path 2</text>
                <text x="330" y="290" textAnchor="middle" className="fill-current" fontSize="12">Flows split across multiple paths</text>
              </svg>
            </div>
          </section>

          {/* Algorithms */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🧮 Flow‑Based Routing Algorithms
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Shortest Path (OSPF, IS‑IS):</strong> Cannot split flows; all traffic follows same path.</li>
              <li><strong>Equal‑Cost Multi‑Path (ECMP):</strong> Splits flows across multiple shortest paths using a hash (e.g., source‑dest IP). Simple, but does not react to congestion.</li>
              <li><strong>Load‑Sensitive Routing (e.g., MPLS‑TE, Q‑Routing):</strong> Uses link metrics that reflect congestion (delay, loss) to re‑route flows dynamically.</li>
              <li><strong>Flow‑Aware Routing (FAR):</strong> Monitors flow size; large flows may be moved to less congested routes.</li>
            </ul>
          </section>

          {/* Advantages & Challenges */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              ✔️ Advantages & ⚠️ Challenges
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <span className="font-bold text-green-700">✅ Advantages</span>
                <ul className="list-disc list-inside mt-2 text-sm">
                  <li>Better network utilisation</li>
                  <li>Reduces congestion bottlenecks</li>
                  <li>Enables QoS differentiation</li>
                  <li>Faster reaction to link failures</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <span className="font-bold text-red-700">⚠️ Challenges</span>
                <ul className="list-disc list-inside mt-2 text-sm">
                  <li>Increased router complexity (state per flow)</li>
                  <li>Flow cache size limitations</li>
                  <li>Potential for packet reordering</li>
                  <li>Routing oscillations (route flaps)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real‑World Applications */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🌍 Real‑World Applications
            </h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>MPLS Traffic Engineering (TE):</strong> Explicit paths for traffic trunks, offline optimisation.</li>
              <li><strong>Load‑Balancing in Data Centers:</strong> Fat‑tree topologies use flow‑based routing (e.g., Hedera, CONGA).</li>
              <li><strong>SDN (OpenFlow):</strong> Controllers install flow entries to manage congestion.</li>
              <li><strong>Google's B4 WAN:</strong> Uses flow‑based routing to optimise inter‑data centre traffic.</li>
            </ul>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Professional Tips
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Use <span className="font-bold">ECMP with per‑flow hashing</span> when simple load balancing is enough (e.g., commodity routers).</li>
              <li>For real‑time traffic, implement <span className="font-bold">Q‑routing</span> or <span className="font-bold">QoS‑aware flow assignment</span>.</li>
              <li>Monitor <span className="font-bold">flow completion times (FCT)</span> in data centres – short flows should not be blocked behind large flows (use priority queuing).</li>
              <li>In SDN, use <span className="font-bold">centralised flow admission control</span> to avoid oscillations.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              📋 Student Mini‑Checklist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Flow = 5‑tuple (src/dst IP/port + protocol)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Flow‑based routing can avoid congestion</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> ECMP splits flows but not congestion‑aware</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> MPLS‑TE and SDN use flow‑based routing</div>
            </div>
          </section>

          {/* FAQ */}
          <FAQTemplate title="Flow‑Based Routing – Frequently Asked Questions" questions={questions} />

          {/* Teacher's Note */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40 p-6 rounded-2xl border border-teal-200 dark:border-teal-800">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👨‍🏫</div>
              <div>
                <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300">Teacher's Note</h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
                <p className="mt-3 leading-relaxed">
                  “Flow‑based routing is a beautiful concept that shows how the network layer can be enhanced to be 'congestion‑aware'. In my classes at Barrackpore, I draw the two‑path diagram and ask: 'Which path would you send a VoIP call? A large file download?' This sparks discussion on trade‑offs. Demonstrating `traceroute` to a site that uses ECMP (multiple IP paths) is an eye‑opener.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic_FlowBasedRouting;