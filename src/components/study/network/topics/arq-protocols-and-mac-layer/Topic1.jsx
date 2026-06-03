import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";

const animationStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes gentlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal-section { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

const GoBackNARQ = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed antialiased">
      <style>{animationStyles}</style>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* Header */}
        <section className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards" }}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-400 dark:to-purple-300 bg-clip-text text-transparent">
            Go-Back-N ARQ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 border-l-4 border-indigo-500 pl-4">
            Keep the pipe full: send up to N frames without waiting, but retransmit everything from the lost frame onward.
          </p>
        </section>

        {/* Concept & Theory */}
        <section className="reveal-section space-y-4 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl hover:shadow-md transition-all duration-300" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.05s" }}>
          <h2 className="text-2xl font-semibold flex items-center gap-2">📈 Why Go‑Back‑N?</h2>
          <p>
            <strong>Go‑Back‑N ARQ</strong> improves upon Stop‑and‑Wait by allowing the sender to transmit up to <strong>N</strong> frames without waiting for an individual ACK for each. This keeps the channel busy, increasing utilization. However, when a frame is lost or corrupted, the sender <strong>goes back</strong> to that frame and retransmits <u>all subsequent frames</u> (even those possibly received correctly).
          </p>
          <p>
            A sliding window of size N is maintained at the sender. The receiver only accepts frames <strong>in order</strong>; out‑of‑order frames are discarded. A cumulative ACK (ACK with sequence number k) implicitly acknowledges all frames up to k-1.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl">
              <span className="font-bold">✅ Real‑world analogy</span>
              <p className="text-sm mt-1">Mahima sends a group of 5 WhatsApp messages; if the third gets lost, she re‑sends messages 3,4,5.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl">
              <span className="font-bold">⚙️ Use cases</span>
              <p className="text-sm mt-1">HDLC, older TCP implementations, radio links with low bit error rates, and many serial protocols.</p>
            </div>
          </div>
        </section>

        {/* Protocol behavior signature */}
        <section className="reveal-section space-y-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.1s" }}>
          <h2 className="text-2xl font-semibold">📜 Protocol Signature</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700"><tr><th className="px-4 py-2">Element</th><th>Description</th></tr></thead>
              <tbody>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Window size (N)</td><td>Maximum outstanding frames; fixed.</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">Base</td><td>Sequence number of oldest unacknowledged frame.</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="px-4 py-2 font-mono">NextSeqNum</td><td>Next frame to send.</td></tr>
                <tr><td className="px-4 py-2 font-mono">ACK (cumulative)</td><td>ACK with seq = n acknowledges all frames &lt; n.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic"><strong>When used:</strong> Channels with moderate error rates where retransmitting a window is acceptable; simpler receiver (no reordering buffer).</p>
        </section>

        {/* SVG Animation: sliding window + lost frame scenario */}
        <section className="reveal-section space-y-5" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.15s" }}>
          <h2 className="text-2xl font-semibold">🎬 Go‑Back‑N in action (Window N=4, loss of frame 2)</h2>
          <div className="bg-gray-100 dark:bg-gray-800/60 p-4 rounded-2xl flex justify-center hover:shadow-xl transition-all">
            <svg width="750" height="300" viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl">
              <rect x="30" y="20" width="140" height="55" rx="8" fill="#4F46E5" className="dark:fill-indigo-700" />
              <text x="100" y="52" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">SENDER</text>
              <rect x="580" y="20" width="140" height="55" rx="8" fill="#0D9488" className="dark:fill-teal-700" />
              <text x="650" y="52" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">RECEIVER</text>

              {/* Direction lines */}
              <line x1="170" y1="47" x2="580" y2="47" stroke="#64748B" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="580" y1="105" x2="170" y2="105" stroke="#64748B" strokeWidth="2" strokeDasharray="5 5" />

              {/* Animated packets: frames 0,1,2,3 (frame2 lost - not animated) */}
              {/* Frame0 */}
              <circle r="10" fill="#F59E0B">
                <animateMotion path="M180,47 L560,47" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
              <text x="-3" y="-10" fontSize="9" fill="white" fontWeight="bold">
                <animateMotion path="M180,47 L560,47" dur="1.5s" begin="0s" repeatCount="indefinite">0</animateMotion>
              </text>

              {/* Frame1 */}
              <circle r="10" fill="#F59E0B">
                <animateMotion path="M180,47 L560,47" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
              </circle>
              <text x="-3" y="-10" fontSize="9" fill="white" fontWeight="bold">
                <animateMotion path="M180,47 L560,47" dur="1.5s" begin="0.3s" repeatCount="indefinite">1</animateMotion>
              </text>

              {/* Frame2 (lost) – we show a red X instead of motion */}
              <circle cx="360" cy="47" r="12" fill="#EF4444" />
              <text x="360" y="51" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2 ❌</text>

              {/* Frame3 (will be sent but later retransmitted because frame2 lost) */}
              <circle r="10" fill="#F59E0B" opacity="0.6">
                <animateMotion path="M180,47 L560,47" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
              </circle>
              <text x="-3" y="-10" fontSize="9" fill="white">
                <animateMotion path="M180,47 L560,47" dur="1.5s" begin="0.9s" repeatCount="indefinite">3</animateMotion>
              </text>

              {/* ACK cumulative for frame1 only (after frame0 and frame1 received) */}
              <g>
                <rect x="500" y="95" width="55" height="20" rx="4" fill="#10B981" opacity="0.0">
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="530" y="109" fontSize="10" fill="white" textAnchor="middle" opacity="0">
                  ACK 2
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="3s" repeatCount="indefinite" />
                </text>
              </g>

              <text x="420" y="170" fontSize="12" fill="#EF4444" fontWeight="bold" className="dark:fill-red-400">Timeout → retransmit 2,3,4...</text>
              <text x="50" y="220" fontSize="12" fill="#334155" className="dark:text-gray-300">Receiver discards frame3 (out of order), sends no ACK for frame3.</text>
            </svg>
          </div>
          <p className="text-center text-sm">🟡 Frames 0,1 succeed. Frame2 lost → sender later retransmits 2,3,... (Go‑Back‑N behavior).</p>
        </section>

        {/* Step‑by‑step normal vs error */}
        <section className="reveal-section grid md:grid-cols-2 gap-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.2s" }}>
          <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold">✅ Normal operation (no loss)</h3>
            <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
              <li>Sender sends frames 0..3 (window size 4).</li>
              <li>Receiver acknowledges each in‑order frame with cumulative ACK.</li>
              <li>Window slides; sender continues sending.</li>
            </ol>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-white dark:from-gray-800 p-5 rounded-xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold">🔄 Loss or corruption</h3>
            <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
              <li>Frame2 lost; receiver discards frame3 (out of order).</li>
              <li>No ACK for frame2 → timer expires.</li>
              <li>Sender retransmits frame2 and all subsequent frames (3,4,...).</li>
            </ol>
          </div>
        </section>

        {/* Tips, pitfalls, best practices */}
        <section className="reveal-section space-y-6" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.25s" }}>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border-l-8 border-yellow-500">
            <h3 className="text-xl font-bold">💡 Tips & Tricks (professional)</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Choose window size N ≤ (Bandwidth × RTT) / FrameSize + 1 to keep pipe full.</li>
              <li>Use cumulative ACKs with sequence numbers modulo (N+1) or larger.</li>
              <li>Implement a single timer for the oldest outstanding frame (base).</li>
              <li>On timeout, retransmit from base to nextSeqNum-1 (entire window).</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-8 border-red-500">
            <h3 className="text-xl font-bold">⚠️ Common Pitfalls</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Setting N too large → memory waste and excessive retransmissions on loss.</li>
              <li>Forgetting to reset timer when ACK for base arrives.</li>
              <li>Using cumulative ACK only – if ACK for frame2 is lost but ACK for frame3 arrives, that’s fine (cumulative). But if all ACKs after a loss are lost, timeout still recovers.</li>
              <li>Sequence number wrap‑around: ensure modulo arithmetic is correct.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
            <h3 className="text-xl font-bold">🧠 Best Practices & Checklist</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>✓ Maintain base and nextSeqNum; window = nextSeqNum - base.</li>
              <li>✓ On ACK with seq = y, advance base to y (if y > base).</li>
              <li>✓ Discard any ACK outside current window.</li>
              <li>✓ Use a separate timeout per frame only if needed – simpler: single timer for base frame.</li>
              <li>✓ Simulate with small N (e.g., 4) before deploying.</li>
            </ul>
          </div>
        </section>

        {/* Hint section */}
        <div className="reveal-section bg-gray-100 dark:bg-gray-800 p-5 rounded-xl italic border border-indigo-300 dark:border-indigo-700" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.3s" }}>
          <p className="font-semibold">🔍 Think about ...</p>
          <p>"Why does Go‑Back‑N discard correctly received frames that are out of order? Could we ever avoid that inefficiency?"</p>
          <p className="text-sm mt-2">Observe carefully: discarding simplifies receiver design but wastes bandwidth – that's the trade‑off that leads to Selective Repeat.</p>
        </div>

        {/* FAQ Section */}
        <div className="reveal-section" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.35s" }}>
          <FAQTemplate title="Go‑Back‑N ARQ – deep dive" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="reveal-section pt-4" style={{ animation: "fadeSlideUp 0.6s ease forwards", animationDelay: "0.4s" }}>
          <Teacher note="Go‑Back‑N is a natural stepping stone. Emphasize the cumulative ACK idea and the 'go back' concept. Use Abhronila from Ichapur as the sender with window size 3 – students can draw timeline diagrams. Remind them: increasing window size boosts throughput but also increases retransmission cost on error." />
        </div>
      </div>
    </div>
  );
};

export default GoBackNARQ;