import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

// Keyframes for entrance animations (motion-safe)
const animationStyles = `
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gentlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal-section {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

const StopAndWaitARQ = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed antialiased">
      <style>{animationStyles}</style>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* ========== HEADER ========== */}
        <section
          className="reveal-section transition-all duration-300"
          style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0s" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent">
            Stop-and-Wait ARQ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 border-l-4 border-blue-500 pl-4">
            The simplest retransmission protocol: send one frame → wait for acknowledgment → repeat.
          </p>
        </section>

        {/* ========== CONCEPT & THEORY ========== */}
        <section
          className="reveal-section space-y-4 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10"
          style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.05s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">📡 What & Why — Stop-and-Wait ARQ</h2>
          <p>
            <strong>Stop-and-Wait Automatic Repeat reQuest (ARQ)</strong> is a flow control and error-control method used in
            data link layer and transport layer. The sender transmits a single frame, then <strong>stops</strong> and waits for an
            acknowledgment (ACK) from the receiver. Only after receiving a positive ACK does the sender proceed with the next frame.
          </p>
          <p>
            If the ACK is not received within a timeout period (due to loss or corruption), the sender <strong>retransmits</strong> the
            same frame. This guarantees reliable delivery at the cost of low channel utilization, especially on high-latency links.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl">
              <span className="font-bold">✅ Real‑world analogy</span>
              <p className="text-sm mt-1">
                Mamata waits for Mahima's "got it" text before sending the next photo — no overwhelming, no loss.
              </p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-xl">
              <span className="font-bold">⚙️ Real use cases</span>
              <p className="text-sm mt-1">
                Legacy satellite links, Bluetooth ACL links, simple IoT sensors, and initial TCP SYN handshake pattern.
              </p>
            </div>
          </div>
        </section>

        {/* ========== PROTOCOL SIGNATURE / BEHAVIOR ========== */}
        <section
          className="reveal-section space-y-4 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl"
          style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold">📜 Protocol “Signature” – Finite State Machine</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr><th className="px-4 py-2">Component</th><th className="px-4 py-2">Responsibility</th></tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Sender()</td><td>Transmit frame → start timer → wait for ACK(seq) → on ACK: send next, on timeout: resend.</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Receiver()</td><td>Receive frame → send ACK(seq) → deliver to network layer (if not duplicate).</td></tr>
                <tr><td className="px-4 py-2 font-mono">Timeout handler</td><td>After RTO (Retransmission TimeOut), resend the pending frame.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic mt-2">
            <strong>Purpose:</strong> Guarantee ordered, loss‑free delivery with minimal buffer requirements (only 1 outstanding frame).
            <br />
            <strong>When used:</strong> Simple links with small delay × bandwidth product. Not efficient for long‑fat networks.
          </p>
        </section>

        {/* ========== SVG ANIMATION : STEP-BY-STEP FLOW (animateMotion) ========== */}
        <section
          className="reveal-section space-y-5"
          style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.15s" }}
        >
          <h2 className="text-2xl font-semibold">📦 Packet & ACK dance — animated visualization</h2>
          <div className="bg-gray-100 dark:bg-gray-800/60 p-4 rounded-2xl flex justify-center transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <svg width="700" height="280" viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl">
              <rect x="30" y="30" width="120" height="70" rx="10" fill="#2563EB" className="dark:fill-blue-600" stroke="#1E3A8A" strokeWidth="2" />
              <text x="90" y="70" fill="white" textAnchor="middle" fontSize="14" fontWeight="bold">SENDER</text>
              <rect x="550" y="30" width="120" height="70" rx="10" fill="#0D9488" className="dark:fill-teal-700" stroke="#115E59" strokeWidth="2" />
              <text x="610" y="70" fill="white" textAnchor="middle" fontSize="14" fontWeight="bold">RECEIVER</text>
              
              {/* Data Path (Sender → Receiver) */}
              <line x1="150" y1="65" x2="550" y2="65" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
              {/* ACK Path (Receiver → Sender) */}
              <line x1="550" y1="120" x2="150" y2="120" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />

              {/* Data packet moving (animated motion)*/}
              <g>
                <circle r="12" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5">
                  <animateMotion
                    path="M170,65 L530,65"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0s"
                  />
                </circle>
                <g>
                  <text fontSize="10" fill="white" fontWeight="bold" x="-4" y="-12">
                    <animateMotion
                      path="M170,65 L530,65"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="0s"
                    />
                    DATA
                  </text>
                </g>
              </g>

              {/* ACK packet moving back (delay start to simulate processing) */}
              <g>
                <circle r="10" fill="#10B981" stroke="#047857" strokeWidth="1.5">
                  <animateMotion
                    path="M530,120 L170,120"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin="1.2s"
                  />
                </circle>
                <text fontSize="10" fill="white" fontWeight="bold" x="-3" y="-10">
                  <animateMotion
                    path="M530,120 L170,120"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin="1.2s"
                  />
                  ACK
                </text>
              </g>

              {/* Timer icon (pulse) */}
              <circle cx="90" cy="180" r="16" fill="#EAB308" fillOpacity="0.7">
                <animate attributeName="r" values="16;20;16" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <text x="90" y="186" textAnchor="middle" fontSize="12" fill="black">⏱️</text>
              <text x="90" y="215" textAnchor="middle" fontSize="10" fill="#6B7280">Timeout timer</text>
            </svg>
          </div>
          <p className="text-center text-sm">
            🟡 <strong>data packet</strong> travels → receiver replies with 🟢 <strong>ACK</strong> → sender waits, then sends next frame.
          </p>
        </section>

        {/* ========== STEP-BY-STEP + TIMEOUT SCENARIO ========== */}
        <section
          className="reveal-section grid md:grid-cols-2 gap-6"
          style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.2s" }}
        >
          <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">✅ Without loss</h3>
            <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
              <li>Sender transmits frame #0</li>
              <li>Starts timer</li>
              <li>Receiver gets frame #0 → sends ACK#0</li>
              <li>Sender gets ACK → stops timer & moves to next frame #1</li>
            </ol>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-white dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">⏱️ Timeout & retransmission</h3>
            <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
              <li>Frame lost or corrupted → ACK never arrives</li>
              <li>Timer expires → Sender retransmits same frame</li>
              <li>Receiver (duplicate) discards but resends ACK</li>
              <li>Prevents indefinite blocking</li>
            </ol>
          </div>
        </section>

        {/* ========== PROFESSIONAL TIPS, PITFALLS, BEST PRACTICES ========== */}
        <section
          className="reveal-section space-y-6"
          style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.25s" }}
        >
          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border-l-8 border-yellow-500">
            <h3 className="text-xl font-bold">💡 Tips & Tricks (industry veterans)</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Set RTO = 2 × RTT (smoothed) — prevents premature timeout</li>
              <li>Always use alternate sequence numbers (0/1) to distinguish duplicates.</li>
              <li>For better throughput, avoid Stop-and-Wait if bandwidth-delay product > 1 frame.</li>
              <li>Use cumulative ACK only if you extend; with stop-and-wait explicit ACK per frame.</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-8 border-red-500">
            <h3 className="text-xl font-bold">⚠️ Common Pitfalls (beginners)</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>ACK loss mistaken for data loss</strong> → sender retransmits, receiver gets duplicate.</li>
              <li>Setting timeout too small → unnecessary retransmissions (network thrashing).</li>
              <li>Forgetting to reset timer after receiving ACK → spurious timeout.</li>
              <li>Ignoring half‑duplex constraints: stop-and-wait idle time hurts efficiency.</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
            <h3 className="text-xl font-bold">🧠 Best Practices & Mini Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <ul className="list-check list-inside space-y-1">
                <li>✓ Use separate sequence number modulo 2.</li>
                <li>✓ Always compute RTO with jitter margin.</li>
                <li>✓ Discard out‑of‑window ACKs.</li>
                <li>✓ Simulate before implementing on hardware.</li>
              </ul>
              <ul className="list-check list-inside space-y-1">
                <li>✓ Validate checksum before sending ACK.</li>
                <li>✓ Log retransmission count for diagnosis.</li>
                <li>✓ Classroom tip: Abhronila from Jadavpur simulated this on her FPGA board.</li>
              </ul>
            </div>
            <p className="mt-3 text-sm font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">✅ REMEMBER: Stop-and-Wait trades throughput for simplicity — ideal for error‑prone low‑speed links.</p>
          </div>
        </section>

        {/* ========== HINT SECTION (Encourages thinking) ========== */}
        <div className="reveal-section bg-gray-100 dark:bg-gray-800 p-5 rounded-xl italic border border-blue-300 dark:border-blue-700" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.3s" }}>
          <p className="font-semibold">🔍 Think about ...</p>
          <p>"What happens if the receiver’s ACK is delayed, but not lost? How does the sender distinguish between a lost packet and a slow ACK?"</p>
          <p className="text-sm mt-2">Observe carefully: Stop-and-Wait only uses one outstanding packet — that's why the timeout mechanism is critical.</p>
        </div>

        {/* ========== FAQ SECTION ========== */}
        <div className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.35s" }}>
          <FAQTemplate title="Stop-and-Wait ARQ — deep dive" questions={questions} />
        </div>

        {/* ========== TEACHER'S NOTE ========== */}
        <div className="reveal-section pt-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.4s" }}>
          <Teacher note="Stop-and-Wait is the foundation of all ARQ mechanisms. Encourage students to manually simulate timeout scenarios by drawing timelines. Use names like Susmita (sender) and Debangshu (receiver) for role‑play. Stress on the fact that efficiency drops drastically as RTT grows — that naturally motivates Go-Back-N and Selective Repeat." />
        </div>
      </div>
    </div>
  );
};

export default StopAndWaitARQ;