import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";

const animationStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes tokenMove {
    0% { transform: translateX(0); }
    100% { transform: translateX(400px); }
  }
  @keyframes signalWave {
    0% { stroke-dashoffset: 200; }
    100% { stroke-dashoffset: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal-section { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

const IEEEStandards = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed antialiased">
      <style>{animationStyles}</style>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* Header */}
        <section className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards" }}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-cyan-700 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            IEEE 802 Standards: 802.3 · 802.4 · 802.5
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 border-l-4 border-blue-500 pl-4">
            The three pillars of classic LAN: Ethernet (CSMA/CD), Token Bus, and Token Ring.
          </p>
        </section>

        {/* Concept & Theory */}
        <section className="reveal-section space-y-4 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.05s" }}>
          <h2 className="text-2xl font-semibold flex items-center gap-2">🏛️ The 802 Family – Three Medium Access Methods</h2>
          <p>
            In the 1980s, IEEE standardized three major LAN technologies, each with a different approach to sharing the medium:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>802.3 (Ethernet)</strong> – Carrier Sense Multiple Access with Collision Detection (CSMA/CD). The most successful, still in use today (though CD is rare on modern switched networks).</li>
            <li><strong>802.4 (Token Bus)</strong> – A logical ring over a physical bus. Stations pass a token in order of address; only the token holder may transmit. Used in factory automation (MAP).</li>
            <li><strong>802.5 (Token Ring)</strong> – A physical ring topology where a token circulates; a station captures the token to send a frame, then releases it.</li>
          </ul>
          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-xl text-center">
              <span className="font-bold">🔌 802.3</span>
              <p className="text-xs">CSMA/CD<br />Contention‑based</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-xl text-center">
              <span className="font-bold">⚙️ 802.4</span>
              <p className="text-xs">Token Bus<br />Deterministic</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-xl text-center">
              <span className="font-bold">💍 802.5</span>
              <p className="text-xs">Token Ring<br />Physical ring</p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="reveal-section space-y-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.1s" }}>
          <h2 className="text-2xl font-semibold">📊 Key Differences at a Glance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr><th className="px-4 py-2">Feature</th><th>802.3 Ethernet</th><th>802.4 Token Bus</th><th>802.5 Token Ring</th></tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2">Topology</td><td>Bus (logical), star (physical)</td><td>Physical bus, logical ring</td><td>Physical ring</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2">Access Method</td><td>CSMA/CD</td><td>Token passing on logical ring</td><td>Token passing (explicit)</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2">Deterministic</td><td>No (collisions possible)</td><td>Yes (bounded max latency)</td><td>Yes</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2">Speed evolution</td><td>10 Mbps → 100 Gbps+</td><td>1–10 Mbps, obsolete</td><td>4–16 Mbps, obsolete</td></tr>
                <tr><td className="px-4 py-2">Collision handling</td><td>Detect, jam, backoff</td><td>No collisions (token ensures single talker)</td><td>No collisions</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SVG Animation: Token Ring vs Ethernet CSMA/CD */}
        <section className="reveal-section space-y-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.15s" }}>
          <h2 className="text-2xl font-semibold">🎬 Media Access Illustrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Token Ring animation */}
            <div className="bg-gray-100 dark:bg-gray-800/60 p-4 rounded-2xl hover:shadow-xl transition-all">
              <p className="text-center font-semibold mb-2">📀 Token Ring (802.5)</p>
              <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <circle cx="150" cy="100" r="70" fill="none" stroke="#6B7280" strokeWidth="3" strokeDasharray="8 4" />
                <circle cx="150" cy="30" r="12" fill="#3B82F6" />
                <text x="150" y="34" textAnchor="middle" fontSize="8" fill="white">A</text>
                <circle cx="220" cy="70" r="12" fill="#3B82F6" />
                <text x="220" y="74" textAnchor="middle" fontSize="8" fill="white">B</text>
                <circle cx="220" cy="130" r="12" fill="#3B82F6" />
                <text x="220" y="134" textAnchor="middle" fontSize="8" fill="white">C</text>
                <circle cx="150" cy="170" r="12" fill="#3B82F6" />
                <text x="150" y="174" textAnchor="middle" fontSize="8" fill="white">D</text>
                <circle cx="80" cy="130" r="12" fill="#3B82F6" />
                <text x="80" y="134" textAnchor="middle" fontSize="8" fill="white">E</text>
                <circle cx="80" cy="70" r="12" fill="#3B82F6" />
                <text x="80" y="74" textAnchor="middle" fontSize="8" fill="white">F</text>
                {/* Token moving */}
                <circle r="6" fill="#F59E0B">
                  <animateMotion path="M150,30 A70,70 0 1,1 149.9,30" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="-2" y="-3" fontSize="7" fill="white" fontWeight="bold">
                  <animateMotion path="M150,30 A70,70 0 1,1 149.9,30" dur="4s" repeatCount="indefinite">T</animateMotion>
                </text>
                <text x="150" y="195" textAnchor="middle" fontSize="9">Token circulates → only token holder transmits</text>
              </svg>
            </div>

            {/* CSMA/CD animation */}
            <div className="bg-gray-100 dark:bg-gray-800/60 p-4 rounded-2xl hover:shadow-xl transition-all">
              <p className="text-center font-semibold mb-2">⚡ Ethernet CSMA/CD (802.3)</p>
              <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <rect x="30" y="80" width="240" height="40" rx="5" fill="#1F2937" stroke="#4B5563" strokeWidth="1.5" />
                <text x="150" y="103" textAnchor="middle" fill="#9CA3AF" fontSize="10">Shared Bus</text>
                <rect x="50" y="40" width="30" height="20" rx="3" fill="#EF4444" />
                <text x="65" y="54" textAnchor="middle" fill="white" fontSize="8">A</text>
                <rect x="130" y="40" width="30" height="20" rx="3" fill="#3B82F6" />
                <text x="145" y="54" textAnchor="middle" fill="white" fontSize="8">B</text>
                <rect x="210" y="40" width="30" height="20" rx="3" fill="#10B981" />
                <text x="225" y="54" textAnchor="middle" fill="white" fontSize="8">C</text>
                {/* Collision indicator */}
                <g>
                  <rect x="120" y="130" width="60" height="16" rx="2" fill="#DC2626" opacity="0">
                    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.7;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="150" y="142" textAnchor="middle" fill="white" fontSize="7" opacity="0">
                    COLLISION!
                    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.7;0.8" dur="3s" repeatCount="indefinite" />
                  </text>
                </g>
                <text x="150" y="180" textAnchor="middle" fontSize="9">Random backoff after collision</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Deep dive into each standard */}
        <section className="reveal-section space-y-5" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-semibold">🔍 Individual Standards – Detailed</h2>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">📡 802.3 – Ethernet (CSMA/CD)</h3>
            <p className="mt-2 text-sm">Stations listen before transmitting (Carrier Sense). If the medium is idle, they transmit; if collision occurs (detected by comparing transmitted signal to received), they send a jamming signal and back off for a random time (binary exponential backoff). Ethernet originally ran on coaxial bus, then twisted pair with hubs, now full‑duplex switched.</p>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li><strong>Frame format:</strong> Preamble, SFD, Dest MAC, Src MAC, Length/Type, Payload, FCS.</li>
              <li><strong>Minimum frame size:</strong> 64 bytes (to ensure collision detection before end of transmission).</li>
              <li><strong>Slot time:</strong> 512 bit times (≈51.2 µs for 10 Mbps).</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300">⚙️ 802.4 – Token Bus</h3>
            <p className="mt-2 text-sm">A physical bus (like Ethernet) but stations form a logical ring by passing a token according to a cyclic order (e.g., increasing MAC addresses). A station can only transmit when it holds the token. After transmission, it passes the token to its logical successor. This provides deterministic access (bounded latency), used in factory automation (MAP). No collisions. However, complex and less resilient than Ethernet.</p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">💍 802.5 – Token Ring</h3>
            <p className="mt-2 text-sm">A physical ring topology. A special 3‑byte token circulates. A station wishing to transmit seizes the token, modifies it to a start‑of‑frame delimiter, and sends its frame. The frame circulates back to the sender, which then releases a new token. Token Ring also supports priority and beaconing for fault recovery. Common speeds: 4 Mbps and 16 Mbps (IBM mainstay).</p>
          </div>
        </section>

        {/* Tips, pitfalls, best practices */}
        <section className="reveal-section space-y-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.25s" }}>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border-l-8 border-yellow-500">
            <h3 className="text-xl font-bold">💡 Tips & Tricks (Professional)</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Modern Ethernet uses full‑duplex switching – CSMA/CD is disabled. But understanding it helps debug legacy or half‑duplex links.</li>
              <li>In Token Ring, "beaconing" isolates faults – a useful concept for resilient ring designs (e.g., SONET rings).</li>
              <li>Token Bus was complex; but the idea of a logical ring over arbitrary media appears in some wireless mesh protocols.</li>
              <li>When teaching, emphasize why Ethernet "won": simplicity, low cost, and scalability with switches.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-8 border-red-500">
            <h3 className="text-xl font-bold">⚠️ Common Pitfalls</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Confusing physical bus (802.3 original) with logical bus (802.4) vs physical ring (802.5).</li>
              <li>Assuming CSMA/CD works on switched networks (it does only if the switch port is half‑duplex).</li>
              <li>Mistaking Token Ring's "token" for a frame; the token is a separate control frame.</li>
              <li>Believing that Token Bus and Token Ring are the same – different topologies and token passing mechanisms.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
            <h3 className="text-xl font-bold">🧠 Best Practices & Checklist</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>✓ Understand the trade‑offs: contention (802.3) vs token passing (802.4/802.5) – deterministic vs statistical.</li>
              <li>✓ Remember that Ethernet’s min frame size ensures collision detection.</li>
              <li>✓ Token passing protocols are deterministic, ideal for real‑time apps (e.g., industrial control).</li>
              <li>✓ For modern networks, study switched Ethernet and 802.1Q, but the IEEE 802 legacy is foundational.</li>
            </ul>
          </div>
        </section>

        {/* Hint section */}
        <div className="reveal-section bg-gray-100 dark:bg-gray-800 p-5 rounded-xl italic border border-blue-300 dark:border-blue-700" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.3s" }}>
          <p className="font-semibold">🔍 Think about ...</p>
          <p>"Why did Ethernet eventually dominate over Token Ring and Token Bus, despite Token Ring having better performance under heavy load in theory?"</p>
          <p className="text-sm mt-2">Observe carefully: cost, simplicity, and the rise of switching (which eliminated collisions) made Ethernet unstoppable.</p>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.35s" }}>
          <FAQTemplate title="IEEE 802 standards – deep dive" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section pt-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.4s" }}>
          <Teacher note="This is a historical but crucial topic. Use a timeline: show that before Ethernet's dominance, there was a standards war. Invite students to role‑play a token ring (pass an object). Mention Mamata from Kolkata who worked in a factory using MAP (Token Bus). Also highlight that modern Wi‑Fi is CSMA/CA, a descendant of 802.3 philosophy. Emphasize why deterministic protocols are still used in some niches (e.g., TSN – Time‑Sensitive Networking)." />
        </div>
      </div>
    </div>
  );
};

export default IEEEStandards;