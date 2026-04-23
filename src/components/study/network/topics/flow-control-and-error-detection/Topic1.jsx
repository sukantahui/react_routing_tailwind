// File: src/components/topics/Topic1.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic1_files/topic1_questions';

/**
 * Topic1: Flow Control – Stop-and-Wait & Sliding Window
 * 
 * @component
 * @returns {JSX.Element} The component explaining flow control mechanisms at the Data Link Layer.
 * 
 * @purpose To provide a thorough understanding of how senders and receivers coordinate data rates
 *          to prevent buffer overflow and ensure reliable transmission, covering both simple
 *          (Stop-and-Wait) and efficient (Sliding Window) protocols.
 * 
 * @when_to_use Used after introducing the Data Link Layer's flow control function. Essential before
 *               error detection/correction topics because flow control works alongside ARQ.
 * 
 * @why_important Flow control prevents a fast sender from overwhelming a slow receiver. Without it,
 *                frames are dropped, retransmissions skyrocket, and throughput collapses.
 */
export default function Topic1() {
  // Helper data for comparison table
  const comparison = [
    { aspect: "Sender behavior", stopAndWait: "Sends one frame, waits for ACK", slidingWindow: "Sends up to W frames, then waits for ACK" },
    { aspect: "Channel utilization", stopAndWait: "Low, especially on long/fast links", slidingWindow: "High, can saturate the link" },
    { aspect: "Sequence number bits", stopAndWait: "1 bit (0/1)", slidingWindow: "Multiple bits (e.g., 3 bits → 0–7)" },
    { aspect: "ACK type", stopAndWait: "Individual ACK for each frame", slidingWindow: "Cumulative ACK (or selective)" },
    { aspect: "Complexity", stopAndWait: "Very simple", slidingWindow: "Moderate to high" },
  ];

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Flow Control: Stop-and-Wait & Sliding Window
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            Preventing the sender from flooding the receiver.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Flow control is a set of protocols that ensure a sender does not transmit data faster than the receiver can process and buffer it.
            Without flow control, a high‑speed sender (e.g., a server in <strong className="font-semibold">Ichapur</strong>) could overwhelm a slower receiver
            (e.g., <strong className="font-semibold">Tuhina's</strong> older laptop in <strong className="font-semibold">Shyamnagar</strong>), causing dropped frames and wasted retransmissions.
            We explore two fundamental approaches: the simple <strong className="font-semibold text-blue-600 dark:text-blue-400">Stop‑and‑Wait</strong> and the efficient
            <strong className="font-semibold text-blue-600 dark:text-blue-400"> Sliding Window</strong> protocol.
          </p>
        </section>

        {/* Conceptual Explanation */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Why Flow Control? The Receiver's Buffer Problem</h2>
            <p className="mb-3">
              Every network interface has a finite buffer – like a mailbox that can hold only a certain number of letters. 
              If the sender (e.g., <strong className="font-medium">Debangshu</strong> sending a large project file) pushes frames faster than 
              <strong className="font-medium">Abhronila</strong> (the receiver) can take them out of the buffer and process them, the mailbox overflows.
              Overflowing frames are simply discarded. The sender then has to retransmit them (if error detection is used), which wastes bandwidth.
            </p>
            <p>
              Flow control provides <strong className="font-semibold">dynamic feedback</strong> from the receiver to the sender: “Slow down” or “I’m ready for more.”
              This feedback is carried in <strong className="font-semibold">acknowledgment (ACK)</strong> frames, sometimes with special fields like <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">rwnd</code> (receiver window).
            </p>
          </div>
        </section>

        {/* Stop-and-Wait Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">1. Stop‑and‑Wait Protocol</h2>
            <p className="mb-3 italic">“Send one, wait for ACK, then send next.”</p>
            <p>
              The sender transmits a single frame, starts a timer, and <strong className="font-semibold">stops</strong>.
              It waits for an acknowledgment (ACK) from the receiver. Only after receiving a correct ACK does it send the next frame.
              If the ACK is lost or the frame is corrupted, the timer expires and the sender retransmits the same frame.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                <h3 className="font-semibold text-green-600 dark:text-green-400">✅ Advantages</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Extremely simple to implement.</li>
                  <li>Only 1 bit needed for sequence number (0 or 1).</li>
                  <li>Works correctly even on very error‑prone links.</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                <h3 className="font-semibold text-red-600 dark:text-red-400">❌ Disadvantages</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Very low throughput on high‑bandwidth, long‑delay links (the “bandwidth‑delay product” problem).</li>
                  <li>Sender idle most of the time → poor link utilization.</li>
                  <li>Timer management adds complexity when combined with error detection.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
              <p className="text-sm"><strong className="font-semibold">💡 Analogy:</strong> Swadeep asks one question, Tuhina answers, then Swadeep asks the next. If Tuhina is slow or the answer is delayed, Swadeep just sits idle.</p>
            </div>
          </div>
        </section>

        {/* SVG: Stop-and-Wait timeline */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-center mb-3">Stop‑and‑Wait: Sender Action Timeline</h3>
            <svg width="100%" height="200" viewBox="0 0 800 180" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6"/></marker>
              </defs>
              <rect x="20" y="20" width="120" height="30" rx="5" fill="#3B82F6" opacity="0.8" />
              <text x="80" y="40" textAnchor="middle" fill="white" fontSize="12">Send Frame #0</text>
              <line x1="140" y1="35" x2="280" y2="35" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 2"/>
              <rect x="290" y="80" width="120" height="30" rx="5" fill="#10B981" opacity="0.8" />
              <text x="350" y="100" textAnchor="middle" fill="white" fontSize="12">Receive ACK #0</text>
              <line x1="410" y1="95" x2="550" y2="95" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 2"/>
              <rect x="560" y="20" width="120" height="30" rx="5" fill="#3B82F6" opacity="0.8" />
              <text x="620" y="40" textAnchor="middle" fill="white" fontSize="12">Send Frame #1</text>
              <text x="80" y="70" textAnchor="middle" fill="#4B5563" className="dark:fill-gray-400 text-xs">Sender</text>
              <text x="350" y="140" textAnchor="middle" fill="#4B5563" className="dark:fill-gray-400 text-xs">Idle waiting for ACK</text>
              <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze"/>
            </svg>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">Sender is idle for most of the round‑trip time → low utilization</p>
          </div>
        </section>

        {/* Sliding Window Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">2. Sliding Window Protocol</h2>
            <p className="mb-3 italic">“Send up to W frames without waiting, then slide the window forward as ACKs arrive.”</p>
            <p>
              The sender maintains a <strong className="font-semibold">window</strong> of outstanding, unacknowledged frames.
              It can send up to <strong className="font-semibold">W</strong> frames (window size) back‑to‑back, without waiting for ACKs.
              As ACKs for the oldest frames arrive, the window <strong className="font-semibold">slides forward</strong>, allowing new frames to be sent.
              This keeps the pipe full and dramatically boosts throughput.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                <h3 className="font-semibold text-green-600 dark:text-green-400">✅ Advantages</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>High link utilization, even on high BDP links.</li>
                  <li>Supports cumulative ACKs (reduces ACK traffic).</li>
                  <li>Can be combined with selective repeat for error recovery.</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                <h3 className="font-semibold text-red-600 dark:text-red-400">❌ Disadvantages</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>More complex to implement (buffer management, timers).</li>
                  <li>Requires larger sequence number space (at least 2×W for Go‑Back‑N).</li>
                  <li>May retransmit more frames than necessary in Go‑Back‑N.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
              <p className="text-sm"><strong className="font-semibold">💡 Analogy:</strong> Susmita has a stack of 5 worksheets (window size = 5). She gives all 5 to Abhronila at once. As Abhronila finishes each, she returns it. Susmita immediately gives a new one to keep 5 worksheets always in circulation.</p>
            </div>
          </div>
        </section>

        {/* SVG: Sliding Window concept */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-center mb-3">Sliding Window (Window Size = 4)</h3>
            <svg width="100%" height="180" viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="30" width="120" height="50" rx="6" fill="#E5E7EB" stroke="#6B7280" className="dark:fill-gray-700 dark:stroke-gray-500" />
              <text x="90" y="60" textAnchor="middle" fill="#111827" className="dark:fill-white">Sent, ACKed</text>
              <rect x="160" y="30" width="120" height="50" rx="6" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" className="dark:fill-blue-800 dark:stroke-blue-400" />
              <text x="220" y="60" textAnchor="middle" fill="#1E3A8A" className="dark:fill-blue-100">Sent, no ACK</text>
              <rect x="290" y="30" width="120" height="50" rx="6" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5 3" className="dark:fill-blue-900 dark:stroke-blue-400" />
              <text x="350" y="60" textAnchor="middle" fill="#1E3A8A" className="dark:fill-blue-200">Within window</text>
              <rect x="420" y="30" width="120" height="50" rx="6" fill="#E5E7EB" stroke="#9CA3AF" className="dark:fill-gray-700 dark:stroke-gray-500" />
              <text x="480" y="60" textAnchor="middle" fill="#6B7280" className="dark:fill-gray-400">Outside window</text>
              {/* Arrow to show sliding */}
              <line x1="220" y1="95" x2="350" y2="95" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="285" y="112" textAnchor="middle" fill="#3B82F6" fontSize="12">Window slides as ACKs arrive</text>
            </svg>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Stop‑and‑Wait vs. Sliding Window</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-2 text-left">Aspect</th><th className="p-2 text-left">Stop‑and‑Wait</th><th className="p-2 text-left">Sliding Window</th></tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-medium">{row.aspect}</td>
                    <td className="p-2">{row.stopAndWait}</td>
                    <td className="p-2">{row.slidingWindow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Real-world usage, Pitfalls, Best Practices */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.4s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">Real‑World Usage</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>TCP (Transmission Control Protocol):</strong> Uses a sliding window (advertised window + congestion window) for flow control. The window size is dynamic and can be thousands of segments.</li>
              <li><strong>HDLC / PPP:</strong> Older point‑to‑point protocols use sliding window variants (e.g., LAPB).</li>
              <li><strong>Bluetooth (ACL links):</strong> Uses a simple flow control based on credit‑based sliding window.</li>
              <li><strong>USB bulk transfers:</strong> Employ a form of sliding window to manage host‑device throughput.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">Common Pitfalls (Beginner Mistakes)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Misunderstanding window size:</strong> A window size of 1 turns Sliding Window into Stop‑and‑Wait, but with unnecessary overhead.</li>
              <li><strong>Sequence number wrap‑around:</strong> With a small field (e.g., 3 bits), numbers repeat quickly. Stallings’ “maximum window size ≤ sequence number space” is critical.</li>
              <li><strong>Not handling duplicate ACKs:</strong> In real implementations, duplicate ACKs indicate lost frames and trigger fast retransmit.</li>
              <li><strong>Ignoring bandwidth‑delay product:</strong> If window size &lt; BDP, the link cannot be fully utilized – a hidden performance killer.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">Best Practices (Professional)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Calculate required window size:</strong> WindowSize ≈ Bandwidth × RTT / FrameSize. Use this to avoid under‑ or over‑buffering.</li>
              <li><strong>Use cumulative ACKs:</strong> Reduces ACK traffic and simplifies timer management.</li>
              <li><strong>Implement selective repeat instead of Go‑Back‑N</strong> when link errors are frequent; Go‑Back‑N wastes bandwidth on retransmitting good frames.</li>
              <li><strong>Set timeout > RTT + processing delay</strong> to avoid spurious retransmissions.</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.45s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Pro Tips & Tricks</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Debugging with `iperf`:</strong> Run `iperf -w 64K` to set the TCP window size. A low window limits throughput – you’ll see the effect immediately.</li>
              <li><strong>Classroom demonstration:</strong> Have <strong>Swadeep</strong> pass index cards to <strong>Susmita</strong>. Stop‑and‑Wait: pass one, wait for “got it”, then pass next. Sliding window: pass 5 cards, wait for “got cards 1–3”, then pass 3 new ones.</li>
              <li><strong>Piggybacking:</strong> In full‑duplex links, ACKs can be attached to outgoing data frames instead of separate ACK frames – reduces overhead.</li>
              <li><strong>Tool: `ss -i` (Linux)</strong> shows TCP window size and RTT. Watch how the window grows as the connection warms up.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.5s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">✅ Flow Control Checklist</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded" /> I can explain why flow control is needed.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded" /> I understand the Stop‑and‑Wait protocol and its limitations.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded" /> I can describe the sliding window concept and window size.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded" /> I know the difference between cumulative ACK and individual ACK.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded" /> I can compute the minimum window size to saturate a link.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded" /> I recognise when to use Go‑Back‑N vs. Selective Repeat.</label>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.55s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              - If the round‑trip time (RTT) is 50 ms and bandwidth is 1 Gbps, how many bytes can be “in flight”? What window size (in frames of 1500 bytes) is needed to keep the pipe full?<br />
              - Why does Stop‑and‑Wait become unusable for satellite links (RTT ~500 ms)?<br />
              - Try changing the sequence number bits from 3 to 4. How does the maximum window size change for Go‑Back‑N?
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQTemplate title="Flow Control (Stop-and-Wait & Sliding Window) FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Emphasise the 'bandwidth-delay product' concept: students often overlook that a large window is useless if the link is short. Use real numbers: Ethernet (small BDP) vs. satellite (huge BDP). Show that Stop‑and‑Wait is not just 'slow' – it's mathematically limited. A good exercise: have students calculate the maximum throughput of Stop‑and‑Wait given frame size and RTT. Then compare to sliding window. Relate to TCP's dynamic window – they will see the same idea in later courses."} />

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.4s_ease-out_forwards\\] { animation: none !important; opacity: 1 !important; transform: translateY(0) !important; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}