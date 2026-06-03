import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";

const animationStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes radioWave {
    0% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 0.6; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(1.5); }
  }
  @keyframes collisionFlash {
    0%, 100% { fill: #EF4444; opacity: 0.3; }
    50% { fill: #DC2626; opacity: 0.9; }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal-section { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

const ALOHAProtocols = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed antialiased">
      <style>{animationStyles}</style>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* Header */}
        <section className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards" }}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            ALOHA Protocols
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 border-l-4 border-orange-500 pl-4">
            The original random access protocol: transmit whenever you have data, then listen for collisions and retransmit.
          </p>
        </section>

        {/* Concept & Theory */}
        <section className="reveal-section space-y-4 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.05s" }}>
          <h2 className="text-2xl font-semibold flex items-center gap-2">📡 What are ALOHA Protocols?</h2>
          <p>
            Developed at the University of Hawaii in the 1970s, <strong>ALOHA</strong> was the first radio network protocol. It allows multiple users to share a common channel by transmitting whenever they have data. When two transmissions overlap (collision), both are destroyed, and each sender waits a random time before retransmitting.
          </p>
          <p>
            Two main variants exist: <strong>Pure ALOHA</strong> (transmit anytime) and <strong>Slotted ALOHA</strong> (transmit only at discrete slot boundaries). Slotted ALOHA doubles the maximum throughput (from 18.4% to 36.8%) by reducing the vulnerable period.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl">
              <span className="font-bold">✅ Real‑world analogy</span>
              <p className="text-sm mt-1">Students in a classroom raising hands to answer – if two speak at once, both stop and try again after a random pause.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-xl">
              <span className="font-bold">⚙️ Use cases</span>
              <p className="text-sm mt-1">Early satellite networks, RFID anti‑collision, LoRaWAN uplink, and the basis for Ethernet CSMA/CD.</p>
            </div>
          </div>
        </section>

        {/* Protocol signature / variants */}
        <section className="reveal-section space-y-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.1s" }}>
          <h2 className="text-2xl font-semibold">📜 ALOHA Family – Pure vs Slotted</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr><th className="px-4 py-2">Variant</th><th>Transmission rule</th><th>Vulnerable period</th><th>Max throughput (S)</th></tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Pure ALOHA</td><td>Any time</td><td>2 × frame time</td><td>1/(2e) ≈ 18.4%</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Slotted ALOHA</td><td>Start of slot only</td><td>1 × frame time</td><td>1/e ≈ 36.8%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic mt-2">
            <strong>Purpose:</strong> Enable multi‑access without central coordination, trading off throughput for simplicity.<br />
            <strong>When used:</strong> Wireless environments where listening before talk is hard (e.g., satellite) or where low cost is paramount.
          </p>
        </section>

        {/* SVG Animation: Pure ALOHA collision and retransmission */}
        <section className="reveal-section space-y-5" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.15s" }}>
          <h2 className="text-2xl font-semibold">🎬 Pure ALOHA – Collision & Random Backoff</h2>
          <div className="bg-gray-100 dark:bg-gray-800/60 p-4 rounded-2xl flex justify-center hover:shadow-xl transition-all">
            <svg width="750" height="300" viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl">
              {/* Three stations */}
              <rect x="30" y="20" width="120" height="40" rx="6" fill="#F97316" />
              <text x="90" y="45" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Station A</text>
              <rect x="30" y="90" width="120" height="40" rx="6" fill="#EF4444" />
              <text x="90" y="115" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Station B</text>
              <rect x="30" y="160" width="120" height="40" rx="6" fill="#3B82F6" />
              <text x="90" y="185" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Station C</text>

              {/* Channel (shared medium) */}
              <rect x="200" y="20" width="520" height="180" rx="10" fill="#1F2937" stroke="#6B7280" strokeWidth="2" />
              <text x="460" y="45" textAnchor="middle" fill="#9CA3AF" fontSize="12">Shared Channel</text>

              {/* Transmissions: A, B (collision), then C after backoff */}
              {/* Frame A (blue) */}
              <rect x="250" y="70" width="80" height="20" rx="3" fill="#3B82F6" opacity="0.0">
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;0.9" dur="4s" repeatCount="indefinite" />
              </rect>
              <text x="290" y="84" fontSize="10" fill="white" textAnchor="middle" opacity="0">A1</text>

              {/* Frame B (red) colliding with A */}
              <rect x="290" y="70" width="80" height="20" rx="3" fill="#EF4444" opacity="0.0">
                <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.2;0.35;0.7;0.9" dur="4s" repeatCount="indefinite" />
              </rect>
              <text x="330" y="84" fontSize="10" fill="white" textAnchor="middle" opacity="0">B1</text>

              {/* Collision flash overlay */}
              <rect x="250" y="68" width="130" height="24" rx="3" fill="#DC2626" opacity="0">
                <animate attributeName="opacity" values="0;0;0.7;0.7;0" keyTimes="0;0.3;0.45;0.65;0.8" dur="4s" repeatCount="indefinite" />
              </rect>

              {/* Retransmission of A2 after random backoff */}
              <rect x="450" y="130" width="80" height="20" rx="3" fill="#3B82F6" opacity="0">
                <animate attributeName="opacity" values="0;0;0;0;1;1;0" keyTimes="0;0.4;0.65;0.75;0.85;0.95;1" dur="4s" repeatCount="indefinite" />
              </rect>
              <text x="490" y="144" fontSize="10" fill="white" textAnchor="middle" opacity="0">A2 (retry)</text>

              {/* Retransmission of B2 after different backoff */}
              <rect x="520" y="130" width="80" height="20" rx="3" fill="#EF4444" opacity="0">
                <animate attributeName="opacity" values="0;0;0;0;0;0;1;1;0" keyTimes="0;0.4;0.65;0.75;0.85;0.9;0.92;0.97;1" dur="4s" repeatCount="indefinite" />
              </rect>
              <text x="560" y="144" fontSize="10" fill="white" textAnchor="middle" opacity="0">B2</text>

              {/* Success indicator */}
              <text x="460" y="200" textAnchor="middle" fontSize="10" fill="#10B981" opacity="0">
                ✅ A2 success
                <animate attributeName="opacity" values="0;0;0;0;0;0;1;1;0" keyTimes="0;0.4;0.65;0.75;0.85;0.9;0.93;0.97;1" dur="4s" repeatCount="indefinite" />
              </text>
            </svg>
          </div>
          <p className="text-center text-sm">🧨 Frames A1 and B1 collide → both retransmit after random delays (A2, B2).</p>
        </section>

        {/* Step‑by-step: Pure vs Slotted ALOHA */}
        <section className="reveal-section grid md:grid-cols-2 gap-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.2s" }}>
          <div className="bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold">📡 Pure ALOHA</h3>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Transmit whenever a frame arrives.</li>
              <li>Collision possible if any overlap with another transmission.</li>
              <li>Vulnerable period = 2 × frame time.</li>
              <li>Max throughput S = 1/(2e) ≈ 0.184 (18.4%).</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold">⏲️ Slotted ALOHA</h3>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Time divided into slots (equal to frame transmission time).</li>
              <li>Transmit only at slot boundaries.</li>
              <li>Vulnerable period = 1 × frame time.</li>
              <li>Max throughput S = 1/e ≈ 0.368 (36.8%).</li>
            </ul>
          </div>
        </section>

        {/* Throughput analysis, tips, pitfalls */}
        <section className="reveal-section space-y-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.25s" }}>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border-l-8 border-yellow-500">
            <h3 className="text-xl font-bold">📈 Throughput Analysis (Poisson traffic)</h3>
            <p className="mt-2">Assume aggregate offered load G (frames per frame time). For Pure ALOHA, throughput S = G × e<sup>−2G</sup>. Maximum at G = 0.5 → S_max = 0.5 × e<sup>−1</sup> = 0.184. For Slotted ALOHA, S = G × e<sup>−G</sup>, maximum at G = 1 → S_max = 1/e = 0.368.</p>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-8 border-red-500">
            <h3 className="text-xl font-bold">⚠️ Common Pitfalls (Beginners)</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Assuming Slotted ALOHA works without global time synchronization – it needs slot alignment.</li>
              <li>Forgetting that retransmission delay must be random; fixed retry leads to repeated collisions (synchronization).</li>
              <li>Ignoring the capture effect: in practice, a stronger signal may survive collision (but basic ALOHA assumes all destroyed).</li>
              <li>Misunderstanding the vulnerable period: in Pure ALOHA, a frame starting just after another's end can still collide if it ends after the other's start.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
            <h3 className="text-xl font-bold">🧠 Best Practices & Mini Checklist</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>✓ Use exponential backoff (e.g., wait random between 0 and 2^k slots) to reduce collision probability.</li>
              <li>✓ For Slotted ALOHA, ensure slot synchronization via a common clock (e.g., GPS or beacon).</li>
              <li>✓ Monitor channel load: when G > 1, throughput collapses (unstable). Implement admission control or adapt backoff.</li>
              <li>✓ In modern systems (LoRaWAN), ALOHA is used with spreading factors to reduce collision probability.</li>
            </ul>
          </div>
        </section>

        {/* Hint section */}
        <div className="reveal-section bg-gray-100 dark:bg-gray-800 p-5 rounded-xl italic border border-orange-300 dark:border-orange-700" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.3s" }}>
          <p className="font-semibold">🔍 Think about ...</p>
          <p>"Why does the maximum throughput of Slotted ALOHA occur at G = 1 (average one transmission per slot), while Pure ALOHA peaks at G = 0.5?"</p>
          <p className="text-sm mt-2">Observe carefully: collisions happen when two or more transmissions overlap. In Pure ALOHA, the vulnerable window is twice as large, so lower load is optimal.</p>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.35s" }}>
          <FAQTemplate title="ALOHA Protocols – deep dive" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section pt-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.4s" }}>
          <Teacher note="ALOHA is the foundation of random access. Use a classroom role‑play: give each student a card to 'transmit' (raise hand). Count collisions. Then introduce slotted timing (a metronome). Show that throughput improves. Discuss how retransmission randomness is essential – Susmita from Jadavpur can demonstrate exponential backoff with a dice. Also, connect to modern LoRaWAN – students love real examples." />
        </div>
      </div>
    </div>
  );
};

export default ALOHAProtocols;