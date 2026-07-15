// File: src/components/topics/Topic8.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic8_files/topic8_questions';

/**
 * Topic8: Stop-and-Wait Protocol – Explanation & Efficiency
 *
 * @component
 * @returns {JSX.Element} A complete lesson on Stop‑and‑Wait, from basic operation to efficiency calculation.
 *
 * @purpose To teach why Stop‑and‑Wait is simple but inefficient, and how to quantify its performance.
 *
 * @when_to_use After introducing flow control; this topic motivates the need for sliding window.
 *
 * @why_important This is a cornerstone concept in networking; understanding it helps grasp TCP's flow control.
 */
export default function Topic8() {
  // State for calculator
  const [transmissionTime, setTransmissionTime] = useState(2);
  const [propagationDelay, setPropagationDelay] = useState(18);
  const [efficiency, setEfficiency] = useState(null);

  const computeEfficiency = () => {
    if (transmissionTime <= 0 || propagationDelay < 0) {
      alert('Transmission Time must be positive, Propagation Delay must be non‑negative.');
      return;
    }
    const Tt = transmissionTime;
    const Tp = propagationDelay;
    const eff = Tt / (Tt + 2 * Tp);
    setEfficiency(eff);
  };

  const examples = [
    { label: 'Local (fast)', Tt: 20, Tp: 2 },
    { label: 'City network', Tt: 10, Tp: 5 },
    { label: 'Long‑distance', Tt: 2, Tp: 18 },
    { label: 'Satellite', Tt: 1, Tp: 20 },
    { label: 'Very short', Tt: 5, Tp: 0.5 },
  ];

  const loadExample = (Tt, Tp) => {
    setTransmissionTime(Tt);
    setPropagationDelay(Tp);
    setEfficiency(null);
  };

  const getBarWidths = () => {
    if (efficiency === null) return { useful: 0, waiting: 0 };
    return { useful: efficiency * 100, waiting: 100 - efficiency * 100 };
  };

  const { useful, waiting } = getBarWidths();

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* ======= HERO ======= */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Stop‑and‑Wait Protocol
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            Simple flow control, but inefficient on long links.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Stop‑and‑Wait is the simplest form of flow control. The sender sends one frame, then pauses
            until it receives an acknowledgment (ACK) from the receiver. This ensures the receiver is ready,
            but it also means the sender spends most of its time waiting.
          </p>
        </section>

        {/* ======= THEORY – STOP‑AND‑WAIT EXPLAINED ======= */}
        <section className="space-y-8 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">📘 What is Stop‑and‑Wait?</h2>

            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Imagine you are sending packets (frames) to another computer. With Stop‑and‑Wait, the sender follows this rule:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Send one frame.</li>
                  <li>Stop.</li>
                  <li>Wait for the ACK (Acknowledgement).</li>
                  <li>After receiving the ACK, send the next frame.</li>
                </ol>
              </div>
              <p>So only one frame is in the network at any time.</p>

              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">
{`Sender                          Receiver

Frame 1  ------------------------->
                     (Travelling...)
                     Received
ACK     <--------------------------

Sender receives ACK

Frame 2  ------------------------->
ACK     <--------------------------`}
                </pre>
              </div>
              <p>Notice that the sender <strong>cannot</strong> send Frame 2 until the ACK for Frame 1 arrives.</p>

              {/* Two key times */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border-l-4 border-blue-400">
                <p className="font-semibold">Two Key Times</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>
                    <strong>Transmission Time (T<sub>t</sub>)</strong> – how long it takes to put all bits of a frame onto the transmission medium.<br />
                    <em>Example: 1000 bits at 1 Mbps → T<sub>t</sub> = 1 ms.</em>
                  </li>
                  <li>
                    <strong>Propagation Delay (T<sub>p</sub>)</strong> – the time taken by the signal to travel from sender to receiver.<br />
                    <em>Example: 20 ms for a long‑distance link.</em>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-4">Why Does It Waste Time?</h3>
              <p>
                Suppose T<sub>t</sub> = 1 ms and T<sub>p</sub> = 20 ms.
                The sender spends 1 ms sending the frame. Then the frame travels for 20 ms. The receiver immediately sends an ACK (assume ACK transmission time is negligible), and the ACK takes another 20 ms to return.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border-l-4 border-yellow-400">
                <p className="font-semibold">Timeline</p>
                <pre className="text-sm font-mono mt-1">
{`0 ms  1 ms                   21 ms                  41 ms
|-----|---------------------|---------------------|
 Send   Frame travels       ACK travels
        (20 ms)             (20 ms)`}
                </pre>
                <p className="mt-2">Total time = 1 + 20 + 20 = <strong>41 ms</strong>. Only 1 ms was useful transmission.</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border-l-4 border-red-400">
                <p className="font-semibold">Actual Work</p>
                <p>Useful time = 1 ms. Waiting time = 40 ms.</p>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden mt-1">
                  <div className="h-full bg-green-500" style={{ width: `${(1/41)*100}%` }} />
                  <div className="h-full bg-red-400" style={{ width: `${(40/41)*100}%` }} />
                </div>
                <p className="text-xs mt-1">📤 Sending ████ &nbsp;&nbsp; ⏳ Waiting ██████████████████████████████████████</p>
              </div>

              <h3 className="text-xl font-semibold mt-4">Efficiency Formula</h3>
              <p>
                Efficiency tells us how much of the total time is actually used to transmit useful data.
                For Stop‑and‑Wait:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded font-mono text-center text-lg">
                Efficiency = T<sub>t</sub> / (T<sub>t</sub> + 2 × T<sub>p</sub>)
              </div>
              <p>
                Multiply by 100 to get a percentage. The term 2×T<sub>p</sub> accounts for the round‑trip time.
              </p>

              {/* Numerical example */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border-l-4 border-green-400">
                <p className="font-semibold">Example</p>
                <p>T<sub>t</sub> = 2 ms, T<sub>p</sub> = 18 ms.</p>
                <p>Efficiency = 2 / (2 + 2×18) = 2 / 38 = 0.0526 → <strong>5.26%</strong></p>
                <p className="text-sm mt-1">The sender uses only 5.26% of the time for actual data – the rest is waiting.</p>
              </div>

              <p>
                As propagation delay increases, efficiency decreases dramatically. This is why Stop‑and‑Wait is unsuitable for satellite links (T<sub>p</sub> ≈ 250 ms) or long‑distance WAN connections.
              </p>
            </div>
          </div>
        </section>

        {/* ======= INTERACTIVE CALCULATOR ======= */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">🧮 Efficiency Calculator</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Transmission Time (T<sub>t</sub>) in ms</label>
                  <input
                    type="number"
                    value={transmissionTime}
                    onChange={(e) => setTransmissionTime(parseFloat(e.target.value) || 0)}
                    min="0.1"
                    step="0.1"
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Propagation Delay (T<sub>p</sub>) in ms</label>
                  <input
                    type="number"
                    value={propagationDelay}
                    onChange={(e) => setPropagationDelay(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.1"
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <button
                  onClick={computeEfficiency}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                >
                  Compute Efficiency
                </button>
                <div>
                  <p className="text-sm font-medium">Quick Examples:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {examples.map(ex => (
                      <button
                        key={ex.label}
                        onClick={() => loadExample(ex.Tt, ex.Tp)}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Results */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Efficiency</label>
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded text-center min-h-[4rem] flex items-center justify-center">
                    {efficiency !== null ? (
                      <span className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
                        {(efficiency * 100).toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-gray-400">Press "Compute"</span>
                    )}
                  </div>
                </div>
                {efficiency !== null && (
                  <div>
                    <p className="text-sm font-medium mb-1">Visual Breakdown</p>
                    <div className="w-full h-6 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden flex">
                      <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${useful}%` }} />
                      <div className="h-full bg-red-400 transition-all duration-500" style={{ width: `${waiting}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-green-600 dark:text-green-400">Useful: {useful.toFixed(1)}%</span>
                      <span className="text-red-500 dark:text-red-400">Waiting: {waiting.toFixed(1)}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {efficiency < 0.5
                        ? '⚠️ Low efficiency – consider using a sliding window protocol.'
                        : efficiency < 0.8
                        ? '⚖️ Moderate efficiency – you may still benefit from pipelining.'
                        : '✅ High efficiency – Stop‑and‑Wait works well for this link.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ======= WORKED EXAMPLES (same as before) ======= */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">📝 Worked Numerical Examples</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">T<sub>t</sub> (ms)</th>
                    <th className="p-2 text-left">T<sub>p</sub> (ms)</th>
                    <th className="p-2 text-left">Efficiency</th>
                    <th className="p-2 text-left">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { Tt: 20, Tp: 2, eff: 83.33, note: 'Local network – excellent' },
                    { Tt: 10, Tp: 5, eff: 50.00, note: 'City‑wide – moderate' },
                    { Tt: 2, Tp: 18, eff: 5.26, note: 'Long‑distance – poor' },
                    { Tt: 1, Tp: 20, eff: 2.44, note: 'Satellite – very poor' },
                    { Tt: 5, Tp: 0.5, eff: 83.33, note: 'Very short link – good' },
                  ].map((ex, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-2 font-mono">{ex.Tt}</td>
                      <td className="p-2 font-mono">{ex.Tp}</td>
                      <td className="p-2 font-mono">{ex.eff.toFixed(2)}%</td>
                      <td className="p-2">{ex.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ======= REAL‑WORLD, PITFALLS, BEST PRACTICES ======= */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">Real‑World Implications</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Satellite communication:</strong> Huge T<sub>p</sub> (≈250 ms) makes Stop‑and‑Wait unusable; sliding window is mandatory.</li>
              <li><strong>WAN links:</strong> Routers use window‑based protocols (like TCP) to keep the pipe full.</li>
              <li><strong>Local Ethernet:</strong> Small delays make Stop‑and‑Wait acceptable in some early protocols.</li>
              <li><strong>Wireless networks:</strong> Medium delays still benefit from sliding window.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">Common Pitfalls</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Misunderstanding T<sub>t</sub> vs T<sub>p</sub>:</strong> T<sub>t</sub> is about bit rate, T<sub>p</sub> is about distance.</li>
              <li><strong>Ignoring ACK transmission time:</strong> In reality, ACKs also take time, reducing efficiency further.</li>
              <li><strong>Assuming efficiency can exceed 100%:</strong> It cannot; the formula yields a fraction ≤ 1.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">Best Practices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Always compute efficiency before choosing a protocol</strong> for a given link.</li>
              <li><strong>When efficiency &lt 50%</strong>, sliding window is strongly recommended.</li>
              <li><strong>In performance analysis</strong>, include ACK transmission time for accurate results.</li>
            </ul>
          </div>
        </section>

        {/* ======= PRO TIPS ======= */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards]">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 Pro Tips</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Classroom demo:</strong> Have <strong>Swadeep</strong> and <strong>Tuhina</strong> simulate Stop‑and‑Wait with a ping‑pong ball (frame) and a whistle (ACK). Measure the round‑trip and see the idle time.</li>
              <li><strong>Tool: `ping`</strong> can estimate RTT (≈2×T<sub>p</sub>). Use it to compute efficiency for a given frame size.</li>
              <li><strong>Debugging:</strong> If a network link is slow, check if the window size is too small – the efficiency may be low.</li>
            </ul>
          </div>
        </section>

        {/* ======= CHECKLIST ======= */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">✅ Stop‑and‑Wait Checklist</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label><input type="checkbox" className="mr-2" /> I can explain the Stop‑and‑Wait protocol.</label>
              <label><input type="checkbox" className="mr-2" /> I understand the difference between T<sub>t</sub> and T<sub>p</sub>.</label>
              <label><input type="checkbox" className="mr-2" /> I can compute efficiency using the formula.</label>
              <label><input type="checkbox" className="mr-2" /> I can interpret the efficiency result.</label>
              <label><input type="checkbox" className="mr-2" /> I know when sliding window is needed.</label>
              <label><input type="checkbox" className="mr-2" /> I can use the calculator to test scenarios.</label>
            </div>
          </div>
        </section>

        {/* ======= HINT SECTION ======= */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.4s_forwards]">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              - What happens to efficiency if you double the frame size (T<sub>t</sub>)?<br />
              - If you move from Earth to Mars (T<sub>p</sub> ≈ 15 minutes), what efficiency would Stop‑and‑Wait give?<br />
              - Why is the efficiency independent of the data rate? (Hint: T<sub>t</sub> = frame size / data rate; both scale.)<br />
              - Can you design a scenario where efficiency is 100%? (Hint: T<sub>p</sub> = 0.)
            </p>
          </div>
        </section>

        {/* ======= FAQ ======= */}
        <FAQTemplate title="Stop-and-Wait Efficiency FAQs" questions={questions} />

        {/* ======= TEACHER'S NOTE ======= */}
        <Teacher note={"The efficiency formula is a classic in networking exams. Emphasise the difference between transmission time and propagation delay – students often confuse them. Use the calculator to show that even moderate propagation delays drastically reduce efficiency. This will motivate the need for sliding window protocols. You can also tie in the bandwidth‑delay product concept: if you multiply the data rate by RTT, you get the amount of data that could be 'in flight' – that's the window size needed for full utilisation."} />

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