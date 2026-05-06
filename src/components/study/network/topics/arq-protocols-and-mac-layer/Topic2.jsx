import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";

const animationStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes gentleBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes glowPulse {
    0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
    70% { box-shadow: 0 0 0 8px rgba(139, 92, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal-section { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

const SelectiveRepeatARQ = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed antialiased">
      <style>{animationStyles}</style>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* Header */}
        <section className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards" }}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-400 dark:to-pink-300 bg-clip-text text-transparent">
            Selective Repeat ARQ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 border-l-4 border-purple-500 pl-4">
            The smart retransmission protocol: only retransmit the lost frame – keep all correctly received frames.
          </p>
        </section>

        {/* Concept & Theory */}
        <section className="reveal-section space-y-4 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.05s" }}>
          <h2 className="text-2xl font-semibold flex items-center gap-2">🎯 Why Selective Repeat?</h2>
          <p>
            <strong>Selective Repeat ARQ</strong> combines the efficiency of pipelining with the precision of retransmitting only the frames that are lost or corrupted. The sender maintains a window of outstanding frames, and the receiver buffers out‑of‑order frames. When a frame is missing, the receiver sends a <strong>negative acknowledgment (NAK)</strong> or uses selective ACKs to inform the sender exactly which frame to retransmit – no need to "go back".
          </p>
          <p>
            This protocol achieves higher throughput than Go‑Back‑N on error‑prone channels, at the cost of more complex receiver buffering and sequence number management.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl">
              <span className="font-bold">✅ Real‑world analogy</span>
              <p className="text-sm mt-1">Debangshu sends 10 pages to Susmita via fax; only page 5 is garbled → she asks for page 5 only, not all 10.</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-xl">
              <span className="font-bold">⚙️ Use cases</span>
              <p className="text-sm mt-1">TCP with SACK (Selective Acknowledgment), modern wireless networks (Wi‑Fi block ACK), reliable multicast.</p>
            </div>
          </div>
        </section>

        {/* Protocol signature */}
        <section className="reveal-section space-y-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.1s" }}>
          <h2 className="text-2xl font-semibold">📜 Protocol Signature</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">……
                <th className="px-4 py-2">Element</th>
                <th className="px-4 py-2">Description</th>
                ……
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Sender window</td><td>N outstanding frames; timer per frame.</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Receiver window</td><td>Also size N, buffers out‑of‑order frames.</td></tr>
                <tr><td className="px-4 py-2 font-mono">ACK / NAK</td><td>Individual ACKs per frame; NAK triggers fast retransmission.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic"><strong>When used:</strong> High error‑rate links (wireless, satellite) where retransmitting entire windows is wasteful. Also used in high‑speed networks with selective ACK extensions (TCP SACK).</p>
        </section>

        {/* SVG Animation: Selective Repeat with buffer */}
        <section className="reveal-section space-y-5" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.15s" }}>
          <h2 className="text-2xl font-semibold">🎬 Selective Repeat in action (Window N=4, loss of frame 2)</h2>
          <div className="bg-gray-100 dark:bg-gray-800/60 p-4 rounded-2xl flex justify-center hover:shadow-xl transition-all">
            <svg width="800" height="320" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl">
              <rect x="30" y="20" width="140" height="55" rx="8" fill="#8B5CF6" className="dark:fill-purple-700" />
              <text x="100" y="52" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">SENDER</text>
              <rect x="630" y="20" width="140" height="55" rx="8" fill="#EC4899" className="dark:fill-pink-700" />
              <text x="700" y="52" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">RECEIVER</text>

              {/* data path */}
              <line x1="170" y1="47" x2="630" y2="47" stroke="#64748B" strokeWidth="2" strokeDasharray="5 5" />
              {/* ACK/NAK path */}
              <line x1="630" y1="110" x2="170" y2="110" stroke="#64748B" strokeWidth="2" strokeDasharray="5 5" />

              {/* Frames 0,1,2,3 with frame2 lost */}
              <circle r="12" fill="#F59E0B">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="0s" repeatCount="indefinite" />
              </circle>
              <text x="-4" y="-12" fontSize="10" fill="white" fontWeight="bold">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="0s" repeatCount="indefinite">0</animateMotion>
              </text>

              <circle r="12" fill="#F59E0B">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
              </circle>
              <text x="-4" y="-12" fontSize="10" fill="white" fontWeight="bold">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="0.3s" repeatCount="indefinite">1</animateMotion>
              </text>

              {/* Frame 2 lost – red X */}
              <circle cx="390" cy="47" r="14" fill="#EF4444" />
              <text x="390" y="51.5" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2 ❌</text>

              <circle r="12" fill="#F59E0B">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="0.9s" repeatCount="indefinite" />
              </circle>
              <text x="-4" y="-12" fontSize="10" fill="white" fontWeight="bold">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="0.9s" repeatCount="indefinite">3</animateMotion>
              </text>

              {/* Receiver buffer: shows stored frames 1 and 3 (waiting for 2) */}
              <rect x="640" y="180" width="120" height="100" rx="6" fill="#2D3748" stroke="#A0AEC0" strokeWidth="1.5" />
              <text x="700" y="198" textAnchor="middle" fontSize="10" fill="#CBD5E0">Receiver Buffer</text>
              <rect x="650" y="210" width="35" height="25" rx="3" fill="#48BB78" />
              <text x="667" y="227" textAnchor="middle" fontSize="10" fill="white">1</text>
              <rect x="695" y="210" width="35" height="25" rx="3" fill="#48BB78" />
              <text x="712" y="227" textAnchor="middle" fontSize="10" fill="white">3</text>
              <text x="667" y="258" fontSize="9" fill="#F56565">missing: 2</text>

              {/* NAK for frame2 */}
              <g>
                <rect x="500" y="100" width="70" height="20" rx="4" fill="#F56565" opacity="0">
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="535" y="114" fontSize="9" fill="white" textAnchor="middle" opacity="0">
                  NAK 2
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
                </text>
              </g>

              {/* Retransmission of only frame2 */}
              <circle r="10" fill="#F59E0B" stroke="#DD6B20">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="1.8s" repeatCount="indefinite" />
              </circle>
              <text x="-4" y="-10" fontSize="9" fill="white" fontWeight="bold">
                <animateMotion path="M180,47 L610,47" dur="1.2s" begin="1.8s" repeatCount="indefinite">2R</animateMotion>
              </text>

              <text x="420" y="290" fontSize="12" fill="#8B5CF6" fontWeight="bold">Only frame 2 retransmitted – buffer delivers 1,2,3 in order later.</text>
            </svg>
          </div>
          <p className="text-center text-sm">🟢 Frames 1 and 3 are buffered; only frame 2 is retransmitted → efficient use of bandwidth.</p>
        </section>

        {/* Step‑by-step: normal, loss, NAK */}
        <section className="reveal-section grid md:grid-cols-2 gap-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.2s" }}>
          <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold">✅ Normal operation</h3>
            <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
              <li>Sender transmits frames up to window size N.</li>
              <li>Receiver buffers out‑of‑order frames, sends individual ACKs.</li>
              <li>Sender slides window on receiving ACK for oldest frame.</li>
            </ol>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-white dark:from-gray-800 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold">🔄 Loss recovery</h3>
            <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
              <li>Frame2 lost; receiver keeps frames 1 and 3 in buffer.</li>
              <li>Receiver sends NAK for missing frame 2 (or uses selective ACK).</li>
              <li>Sender retransmits only frame2; receiver delivers in order.</li>
            </ol>
          </div>
        </section>

        {/* Tips, pitfalls, best practices */}
        <section className="reveal-section space-y-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.25s" }}>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border-l-8 border-yellow-500">
            <h3 className="text-xl font-bold">💡 Tips & Tricks (professional)</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Use a timer per frame (or at least per missing frame) to handle loss of ACK/NAK.</li>
              <li>Sequence number space must be at least 2× window size to avoid ambiguity (modulo ≥ 2N).</li>
              <li>Implement NAK sparingly; in many systems, duplicate ACKs or SACK blocks replace NAKs.</li>
              <li>Receiver window should be of size N for correct reordering; advance only when contiguous.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-8 border-red-500">
            <h3 className="text-xl font-bold">⚠️ Common Pitfalls</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Using modulo sequence numbers &lt; 2N → window wrap ambiguity (deadly for selective repeat).</li>
              <li>Forgetting to implement a timer for retransmission of NAK’ed frames; relying solely on NAK may cause deadlock if NAK is lost.</li>
              <li>Incorrect buffer management: delivering frames to upper layer before contiguous block is ready.</li>
              <li>Choosing window size larger than receiver buffer capacity.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
            <h3 className="text-xl font-bold">🧠 Best Practices & Checklist</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>✓ Maintain both sender and receiver windows of equal size N.</li>
              <li>✓ Use modulo arithmetic with modulus ≥ 2N.</li>
              <li>✓ On receiving ACK, mark frame as acked; slide window if the oldest is acked.</li>
              <li>✓ On receiving NAK, retransmit exactly that frame (without moving window).</li>
              <li>✓ Implement a timeout per frame (or per missing frame) – important for lost NAK/ACK.</li>
              <li>✓ Test with loss patterns: isolated loss, burst loss, ACK loss.</li>
            </ul>
          </div>
        </section>

        {/* Hint section */}
        <div className="reveal-section bg-gray-100 dark:bg-gray-800 p-5 rounded-xl italic border border-purple-300 dark:border-purple-700" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.3s" }}>
          <p className="font-semibold">🔍 Think about ...</p>
          <p>"Why is the sequence number space requirement larger for Selective Repeat than for Go-Back-N? Could we ever reuse sequence numbers safely?"</p>
          <p className="text-sm mt-2">Observe carefully: because the sender may receive ACKs for later frames while the earliest frame is still outstanding, the window can wrap without the sender realizing it.</p>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.35s" }}>
          <FAQTemplate title="Selective Repeat ARQ – deep dive" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section pt-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.4s" }}>
          <Teacher note="Selective Repeat is the most efficient but also the most complex. Emphasize the buffer management and modulo rule (2N). Use Abhronila from Kolkata as the receiver with a buffer of size 4. Walk through a step‑by‑step timeline on the board – students often confuse sender ACK handling with receiver delivery. Also note that TCP SACK is a practical implementation of selective acknowledgment." />
        </div>
      </div>
    </div>
  );
};

export default SelectiveRepeatARQ;