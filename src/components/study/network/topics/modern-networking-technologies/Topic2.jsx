// Topic2.jsx
// Prototype: function Topic2(): JSX.Element
// Return type: JSX.Element
// Purpose: Provides a comprehensive, interactive lesson on Software Defined Networking (SDN),
//          including control/data plane separation, SDN architecture, OpenFlow, real-world applications, and best practices.
// When & why used: Essential for students learning modern networking, cloud infra, and network programmability.
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic2_files/topic2_questions';

// Inline keyframes (zero config, motion-safe)
const keyframes = `
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
  @keyframes flowDash {
    0% { stroke-dashoffset: 24; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes packetMove {
    0% { transform: translateX(0); opacity: 0.3; }
    50% { transform: translateX(60px); opacity: 1; }
    100% { transform: translateX(120px); opacity: 0.3; }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeSlideUp, .animate-flowDash, .animate-packetMove {
      animation: none !important;
      opacity: 1;
      transform: none;
    }
  }
`;

const Topic2 = () => {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <section className="space-y-4 text-center animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Software Defined Networking (SDN)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Decoupling control from hardware – programmable, agile, and centralized network intelligence.
          </p>
          <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
        </section>

        {/* Core concept: separation of planes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-100" style={{animationDelay: '100ms'}}>
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-purple-300">
              <span>🧠</span> What is SDN?
            </h2>
            <p className="mt-3 leading-relaxed text-gray-200">
              Traditional networking devices (routers, switches) have <strong className="text-yellow-300">control plane</strong> (decision-making: routing protocols, spanning tree) and <strong className="text-yellow-300">data plane</strong> (forwarding packets) tightly coupled inside the same box.
            </p>
            <p className="mt-2 leading-relaxed text-gray-200">
              <strong className="text-purple-300">SDN separates these two planes</strong>. The control plane moves to a centralized software entity called the <strong className="text-green-300">SDN Controller</strong>, while switches become simple forwarding devices that just follow flow rules.
            </p>
            <p className="mt-3 text-gray-300 italic rounded-md bg-gray-800/40 p-3">
              🏫 <strong>Analogy:</strong> Traditional network = each teacher makes their own lesson plan (distributed control). SDN = a central curriculum department tells all teachers what to teach (centralized control). Changing the curriculum is instant for everyone.
            </p>
          </div>
        </section>

        {/* SDN Architecture Diagram with Animated SVG */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-200" style={{animationDelay: '200ms'}}>
          <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700 transition-all duration-300 hover:border-indigo-500/40">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">🏗️ SDN Architecture: Control & Data Plane Separation</h2>
            <div className="flex justify-center">
              <svg viewBox="0 0 800 480" className="w-full max-w-3xl h-auto bg-gray-900 rounded-xl p-2 shadow-inner">
                {/* Application Layer */}
                <rect x="280" y="20" width="240" height="60" rx="12" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
                <text x="400" y="48" textAnchor="middle" fill="#bfdbfe" fontSize="14" fontWeight="bold">Application Layer</text>
                <text x="400" y="68" textAnchor="middle" fill="#9ca3af" fontSize="11">(Security, Load Balancing, Monitoring)</text>

                {/* Northbound API Arrow */}
                <line x1="400" y1="80" x2="400" y2="115" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="5 3">
                  <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
                </line>
                <text x="410" y="102" fill="#fcd34d" fontSize="10">Northbound API (REST, gRPC)</text>

                {/* Controller Layer */}
                <rect x="250" y="115" width="300" height="70" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2.5" />
                <text x="400" y="145" textAnchor="middle" fill="#a7f3d0" fontSize="15" fontWeight="bold">SDN Controller (Control Plane)</text>
                <text x="400" y="165" textAnchor="middle" fill="#9ca3af" fontSize="11">OpenFlow, NETCONF, OVSDB, P4</text>
                <text x="400" y="180" textAnchor="middle" fill="#6b7280" fontSize="10">Centralized network OS</text>

                {/* Southbound API Arrows */}
                <line x1="320" y1="185" x2="180" y2="280" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite" />
                </line>
                <line x1="480" y1="185" x2="620" y2="280" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite" />
                </line>
                <text x="230" y="240" fill="#d8b4fe" fontSize="10">Southbound API</text>
                <text x="560" y="240" fill="#d8b4fe" fontSize="10">Southbound API</text>

                {/* Data Plane Switches */}
                <rect x="90" y="280" width="170" height="60" rx="8" fill="#111827" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="175" y="308" textAnchor="middle" fill="#cbd5e1" fontSize="12">Switch (Data Plane)</text>
                <text x="175" y="325" textAnchor="middle" fill="#6b7280" fontSize="10">Flow Tables</text>

                <rect x="540" y="280" width="170" height="60" rx="8" fill="#111827" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="625" y="308" textAnchor="middle" fill="#cbd5e1" fontSize="12">Switch (Data Plane)</text>
                <text x="625" y="325" textAnchor="middle" fill="#6b7280" fontSize="10">Flow Tables</text>

                {/* Packet Flow (animated) */}
                <circle cx="130" cy="400" r="8" fill="#3b82f6">
                  <animate attributeName="cx" values="130;620;130" dur="5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;1" dur="5s" repeatCount="indefinite" />
                </circle>
                <text x="400" y="430" textAnchor="middle" fill="#60a5fa" fontSize="11">Programmable packet forwarding (no local control logic)</text>
              </svg>
            </div>
            <p className="text-center text-gray-400 text-sm mt-3">🔁 <strong>Live SVG:</strong> Dashed lines show API communication; moving packet demonstrates controller‑directed forwarding.</p>
          </div>
        </section>

        {/* OpenFlow and Key Components */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-300" style={{animationDelay: '300ms'}}>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-blue-600/40 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-300">📦 OpenFlow – The Pioneering Protocol</h3>
            <p className="mt-1 text-gray-300 text-sm">OpenFlow defines how controller talks to switches. It allows adding/removing flow entries (match+action).</p>
            <div className="mt-2 bg-gray-900/60 p-2 rounded font-mono text-xs text-gray-300">
              Match: {`{`}` in_port=1, eth_type=0x800, ip_dst=10.0.0.2 {`}`}<br />
              Action: output=2
            </div>
            <p className="mt-2 text-gray-400 text-xs">Flow entry: priority, counters, timeout, cookie.</p>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-green-600/40 hover:border-green-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-300">🔌 Southbound Protocols</h3>
            <ul className="mt-2 space-y-1 text-gray-200 list-disc pl-5 text-sm">
              <li><strong>OpenFlow</strong> – original SDN protocol</li>
              <li><strong>NETCONF</strong> – configuration of network devices</li>
              <li><strong>OVSDB</strong> – manage Open vSwitch bridges</li>
              <li><strong>P4 Runtime</strong> – program data plane independently</li>
              <li><strong>gNMI/gRPC</strong> – modern telemetry & config</li>
            </ul>
          </div>
        </section>

        {/* Real-World Benefits & Use Cases */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-400" style={{animationDelay: '400ms'}}>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-emerald-600/40 hover:border-emerald-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-emerald-300">🌍 Real‑World Usage</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Google B4 WAN</strong> – SDN controlling inter‑datacenter traffic → 95% link utilization.</li>
              <li><strong>VMware NSX</strong> – network virtualization for cloud data centers.</li>
              <li><strong>Cisco ACI</strong> – policy‑driven data center automation.</li>
              <li><strong>OpenStack Neutron</strong> – SDN for virtual networking in private clouds.</li>
              <li><strong>Barrackpore college lab</strong> uses <strong>Mininet + Ryu controller</strong> for teaching SDN.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-sky-600/40 hover:border-sky-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-sky-300">✅ Key Benefits</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Agility</strong> – deploy network policies instantly across entire network.</li>
              <li><strong>Centralized visibility</strong> – single dashboard for traffic, topology, and anomalies.</li>
              <li><strong>Cost reduction</strong> – use commodity white‑box switches.</li>
              <li><strong>Programmability</strong> – automate with Python, REST APIs, and CI/CD.</li>
              <li><strong>Vendor independence</strong> – open standards avoid lock‑in.</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips & Common Mistakes */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-500" style={{animationDelay: '500ms'}}>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-yellow-600/40 hover:border-yellow-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-300">💡 Pro Tips & Tricks</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Start with Mininet</strong> – emulate SDN networks on your laptop (great for learning).</li>
              <li><strong>Use Wireshark + OpenFlow dissector</strong> – inspect controller–switch messages.</li>
              <li><strong>Choose controllers wisely</strong> – ONOS (carrier‑grade), OpenDaylight (modular), Ryu (Pythonic), POX (educational).</li>
              <li><strong>Write idempotent REST policies</strong> – northbound API calls should be repeatable without side effects.</li>
              <li><strong>Think in flows</strong> – Match fields (MAC, IP, port, VLAN) → actions (forward, drop, modify).</li>
              <li><strong>Use proactive flow setup</strong> for known traffic to reduce latency vs reactive.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-red-600/40 hover:border-red-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-red-300">⚠️ Common Mistakes (Beginners)</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Controller as a single point of failure</strong> – always cluster controllers.</li>
              <li><strong>Ignoring switch flow table capacity</strong> – fine for labs, but production switches have limited TCAM.</li>
              <li><strong>Assuming SDN = OpenFlow only</strong> – other southbound protocols exist (P4, gNMI, NETCONF).</li>
              <li><strong>Too much reactive flow setup</strong> → high latency for first packet; use proactive rules for common flows.</li>
              <li><strong>No TLS between controller and switches</strong> – security risk (man‑in‑the‑middle).</li>
              <li><strong>Forgetting to handle switch‑controller reconnection</strong> – flows may be lost.</li>
            </ul>
          </div>
        </section>

        {/* Best Practices + Mini Checklist */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-600" style={{animationDelay: '600ms'}}>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-blue-600/30">
            <h3 className="text-xl font-semibold text-blue-200">✅ Best Practices</h3>
            <ul className="mt-2 space-y-1.5 text-gray-200 list-decimal pl-5">
              <li>Design controller redundancy – clusters of 3+ nodes.</li>
              <li>Use secure channels (SSL/TLS) for southbound communication.</li>
              <li>Separate control and management networks (out‑of‑band control).</li>
              <li>Implement gradual rollback of flow policies (atomic changes).</li>
              <li>Monitor controller health via metrics (Prometheus, Grafana).</li>
              <li>Use <strong>intent‑based northbound interfaces</strong> for higher abstraction.</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-green-600/30">
            <h3 className="text-xl font-semibold text-green-200">📋 Mini Checklist</h3>
            <ul className="mt-2 space-y-1.5 text-gray-200 list-check">
              <li>✔️ Understand separation of control & data plane.</li>
              <li>✔️ Know major southbound protocols: OpenFlow, NETCONF, P4.</li>
              <li>✔️ Able to explain northbound REST APIs and their role.</li>
              <li>✔️ Recognize real SDN use cases (campus, data center, WAN).</li>
              <li>✔️ Avoid vendor lock‑in with standard APIs.</li>
              <li>✔️ Can set up a basic Mininet + controller lab.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <div className="bg-gray-800/60 border-l-4 border-purple-400 p-5 rounded-r-xl animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-700" style={{animationDelay: '700ms'}}>
          <p className="text-purple-200 italic">💭 <strong>Think about:</strong> “How would you update firewall rules for 1000 switches in a traditional network? How long would that take? In SDN, what changes?”</p>
          <p className="text-gray-300 text-sm mt-2">Observe carefully: In SDN, the controller sends one policy update via southbound API, and all switches receive it simultaneously. No manual SSH into each device.</p>
        </div>

        {/* FAQs - 30 questions */}
        <FAQTemplate
          title="Software Defined Networking – FAQ"
          questions={questions}
        />

        {/* Teacher's Note */}
        <Teacher note={
          "SDN flips the traditional networking model on its head. Emphasize that the controller is not merely a 'manager' but a programmable OS for the network. Use live demos: Mininet with Ryu controller, show how a flow rule appears after a ping. Let students watch OpenFlow messages in Wireshark. Discuss tradeoffs: centralized control simplifies management but introduces scalability and availability challenges. Always relate back to the analogy of classroom vs central curriculum office."
        } />

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          © Software Defined Networking — Industry‑grade fundamentals | Production‑ready learning
        </div>
      </div>
    </main>
  );
};

export default Topic2;