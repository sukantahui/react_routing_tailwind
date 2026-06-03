// Topic0.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic0_files/topic0_questions';

/**
 * Topic0: Encoding Techniques – NRZ, Manchester, Differential Manchester
 * 
 * Purpose: Explain how digital bits are converted into physical signals on a medium.
 * When & why: Used in networking (Ethernet, USB, RS-232) to ensure clock recovery,
 *             DC balance, and noise immunity.
 * 
 * Prototype / signature (conceptual):
 *   - nrzEncode(bits: string): SignalLevel[]   // 0→low, 1→high
 *   - manchesterEncode(bits: string): SignalLevel[] // bit start transition
 *   - diffManchesterEncode(bits: string, initialLevel: number): SignalLevel[]
 * Return type: Array of voltage levels (e.g., -1, 1) or transition descriptions.
 */

const Topic0 = () => {
  // Sample bit sequence used in all SVG demonstrations
  const sampleBits = "1 0 1 0";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Header Section – fade + slide up */}
      <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Encoding Techniques
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          NRZ, Manchester, and Differential Manchester – turning bits into signals that travel through wires, fiber, or air.
        </p>
      </div>

      {/* Theory Section */}
      <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            📡 Why Encode? The Physical Layer Challenge
          </h2>
          <p className="leading-relaxed mb-3">
            Computers speak in <strong>bits (0s and 1s)</strong>, but physical media (copper wire, fiber optic, radio) 
            require <strong>voltage levels, light pulses, or frequency shifts</strong>. Encoding solves:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Synchronisation</strong> – receiver must know when each bit starts/ends.</li>
            <li><strong>DC balance</strong> – avoid long runs of same voltage (which cause baseline wander).</li>
            <li><strong>Noise immunity</strong> – transitions help detect bits even with interference.</li>
          </ul>
          <p className="mt-3 italic text-sm">
            Think of Swadeep sending a secret message to Tuhina using a flashlight: 
            <em> “on=1, off=0” (NRZ)</em> works, but if he forgets to blink, she loses sync. 
            Manchester solves this by always changing the light state mid‑bit.
          </p>
        </div>
      </div>

      {/* Three Encoding Cards – Staggered appearance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* NRZ Card */}
        <div className="group rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">🔵 NRZ <span className="text-sm font-normal text-gray-500">(Non‑Return to Zero)</span></h3>
          <p className="leading-relaxed mb-4">
            <strong>How it works:</strong> High voltage = 1, low voltage = 0. No transition within a bit.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <svg viewBox="0 0 400 120" className="w-full h-auto">
              {/* Grid lines */}
              <line x1="20" y1="60" x2="380" y2="60" stroke="#ccc" strokeDasharray="2,2" />
              <line x1="20" y1="20" x2="380" y2="20" stroke="#ccc" strokeDasharray="2,2" />
              <line x1="20" y1="100" x2="380" y2="100" stroke="#ccc" strokeDasharray="2,2" />
              {/* NRZ waveform for bits 1,0,1,0 */}
              <polyline points="20,20 110,20 110,100 200,100 200,20 290,20 290,100 380,100" stroke="#3b82f6" strokeWidth="3" fill="none" className="transition-all duration-300 group-hover:stroke-blue-400" />
              {/* Animated dot moving along the waveform */}
              <circle r="5" fill="#ef4444">
                <animate attributeName="cx" values="20;110;110;200;200;290;290;380" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="20;20;100;100;20;20;100;100" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Bit labels */}
              <text x="65" y="15" textAnchor="middle" fontSize="12">1</text>
              <text x="155" y="15" textAnchor="middle" fontSize="12">0</text>
              <text x="245" y="15" textAnchor="middle" fontSize="12">1</text>
              <text x="335" y="15" textAnchor="middle" fontSize="12">0</text>
            </svg>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>✅ Pros:</strong> Simple, uses less bandwidth.</p>
            <p><strong>❌ Cons:</strong> No clock information; long runs of same bit cause sync loss.</p>
            <p><strong>📌 Used in:</strong> RS‑232, USB (low speed), legacy Ethernet (10Base‑2).</p>
          </div>
        </div>

        {/* Manchester Card */}
        <div className="group rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-green-400 dark:hover:border-green-500 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">🟢 Manchester <span className="text-sm font-normal text-gray-500">(Biphase)</span></h3>
          <p className="leading-relaxed mb-4">
            <strong>How it works:</strong> Transition in the middle of each bit: low→high = 0, high→low = 1 (IEEE 802.3 standard). Guarantees a transition per bit.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <svg viewBox="0 0 400 120" className="w-full h-auto">
              <line x1="20" y1="60" x2="380" y2="60" stroke="#ccc" strokeDasharray="2,2" />
              <line x1="20" y1="20" x2="380" y2="20" stroke="#ccc" strokeDasharray="2,2" />
              <line x1="20" y1="100" x2="380" y2="100" stroke="#ccc" strokeDasharray="2,2" />
              {/* Manchester: bit1 (1→0), bit0 (0→1), bit1 (1→0), bit0 (0→1) */}
              <polyline points="20,20 65,20 65,100 110,100 110,20 155,20 155,100 200,100 200,20 245,20 245,100 290,100 290,20 335,20 335,100 380,100" stroke="#22c55e" strokeWidth="3" fill="none" className="transition-all duration-300 group-hover:stroke-green-400" />
              <circle r="5" fill="#ef4444">
                <animate attributeName="cx" values="20;65;65;110;110;155;155;200;200;245;245;290;290;335;335;380" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="20;20;100;100;20;20;100;100;20;20;100;100;20;20;100;100" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="65" y="15" textAnchor="middle" fontSize="12">1</text>
              <text x="155" y="15" textAnchor="middle" fontSize="12">0</text>
              <text x="245" y="15" textAnchor="middle" fontSize="12">1</text>
              <text x="335" y="15" textAnchor="middle" fontSize="12">0</text>
            </svg>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>✅ Pros:</strong> Self‑clocking, DC balanced.</p>
            <p><strong>❌ Cons:</strong> Requires twice the bandwidth of NRZ.</p>
            <p><strong>📌 Used in:</strong> 10 Mbps Ethernet (10Base‑T), RFID, some bus systems.</p>
          </div>
        </div>

        {/* Differential Manchester Card */}
        <div className="group rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-purple-400 dark:hover:border-purple-500 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">🟣 Differential Manchester</h3>
          <p className="leading-relaxed mb-4">
            <strong>How it works:</strong> Transition at start of bit = 0; no transition = 1. Always a transition mid‑bit for clock.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <svg viewBox="0 0 400 120" className="w-full h-auto">
              <line x1="20" y1="60" x2="380" y2="60" stroke="#ccc" strokeDasharray="2,2" />
              <line x1="20" y1="20" x2="380" y2="20" stroke="#ccc" strokeDasharray="2,2" />
              <line x1="20" y1="100" x2="380" y2="100" stroke="#ccc" strokeDasharray="2,2" />
              {/* Differential Manchester: assume prev level high. bit1 → start transition, bit0 → no start transition, etc. */}
              <polyline points="20,20 65,100 110,100 155,20 200,20 245,100 290,100 335,20 380,20" stroke="#a855f7" strokeWidth="3" fill="none" className="transition-all duration-300 group-hover:stroke-purple-400" />
              <circle r="5" fill="#ef4444">
                <animate attributeName="cx" values="20;65;110;155;200;245;290;335;380" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="20;100;100;20;20;100;100;20;20" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="65" y="15" textAnchor="middle" fontSize="12">1</text>
              <text x="155" y="15" textAnchor="middle" fontSize="12">0</text>
              <text x="245" y="15" textAnchor="middle" fontSize="12">1</text>
              <text x="335" y="15" textAnchor="middle" fontSize="12">0</text>
            </svg>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>✅ Pros:</strong> Self‑clocking + noise immunity (transition matters, not absolute voltage).</p>
            <p><strong>❌ Cons:</strong> Complex decoding, still twice bandwidth.</p>
            <p><strong>📌 Used in:</strong> Token Ring, some industrial fieldbuses.</p>
          </div>
        </div>
      </div>

      {/* Real-world usage, Tips, Common Mistakes, Best Practices – in an accordion style? But we use simple sections */}
      <div className="space-y-10">
        {/* Real-world examples */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">🌍 Real‑World Usage & Stories</h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li><strong>Ethernet (10Base‑T):</strong> Uses Manchester encoding so that every bit has a transition – no need for a separate clock line. Swadeep’s home router talks to his PC this way.</li>
            <li><strong>USB 1.0/1.1:</strong> Uses NRZ but adds <strong>bit stuffing</strong> (insert a 0 after six consecutive 1s) to force transitions. Tuhina’s old mouse used this trick.</li>
            <li><strong>RFID (NFC):</strong> Uses modified Manchester to encode data while also powering the tag.</li>
            <li><strong>Barrackpore railway station’s display board:</strong> Uses RS‑232 (NRZ) to update train arrival information.</li>
          </ul>
        </div>

        {/* Tips & Tricks */}
        <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">💡 Pro Tips & Tricks</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <p className="font-bold">🧠 Clock Recovery Insight</p>
              <p>Manchester’s mid‑bit transition allows the receiver to <strong>multiply the incoming frequency</strong> to recover the clock. That’s why it’s called “self‑clocking”.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <p className="font-bold">⚡ Bandwidth Trade‑off</p>
              <p>If you need high speed (e.g., 10 Gbps), Manchester is inefficient. Use NRZ with scrambling or 8b/10b encoding (like PCIe).</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <p className="font-bold">🔍 Debugging Signal Issues</p>
              <p>On an oscilloscope, a flat line for too long indicates NRZ with long runs of same bit. That often causes baseline wander – check your encoding.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <p className="font-bold">📈 Differential Manchester Advantage</p>
              <p>Because it looks at <em>transitions</em> not absolute voltage, it works even if the wire polarity is swapped – a lifesaver in noisy industrial plants (Shyamnagar factories use this).</p>
            </div>
          </div>
        </div>

        {/* Common Mistakes & Misconceptions */}
        <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">⚠️ Common Pitfalls (Even Experts Make These)</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Confusing Manchester polarities:</strong> Some standards define 0 as low→high, others high→low. Always check the spec (IEEE 802.3 vs. old Ethernet).</li>
            <li><strong>Believing NRZ needs no clock:</strong> It absolutely needs a separate clock or a synchronisation preamble. That’s why UART uses start/stop bits.</li>
            <li><strong>Differential Manchester “transition at start” logic:</strong> Remember: <em>transition = 0, no transition = 1</em> (for most implementations). Reverse is rare but possible – verify with datasheet.</li>
            <li><strong>Bandwidth miscalculation:</strong> Manchester uses double the bandwidth of NRZ for the same bit rate. Students from Ichapur often forget this in exams.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">✅ Best Practices (Classroom & Industry)</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Choose encoding based on medium:</strong> Use Manchester for short, noisy copper; use NRZ with scrambling for high-speed serial links.</li>
            <li><strong>Always include a preamble:</strong> A known bit pattern at start helps the receiver lock onto the clock.</li>
            <li><strong>Simulate before building:</strong> Use Python or Octave to visualise your encoded waveform – Susmita saved hours of debugging this way.</li>
            <li><strong>Document the polarity convention:</strong> In your design document, explicitly state “1 = +5V, 0 = 0V” or the transition rules.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-3">📋 Mini Checklist – “What I must remember”</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2"><span className="text-green-600 text-xl">✓</span> NRZ – simple but no clock; needs separate sync.</div>
            <div className="flex items-start gap-2"><span className="text-green-600 text-xl">✓</span> Manchester – transition every bit; self‑clocking, double bandwidth.</div>
            <div className="flex items-start gap-2"><span className="text-green-600 text-xl">✓</span> Diff Manchester – transition at start = 0; polarity‑independent.</div>
            <div className="flex items-start gap-2"><span className="text-green-600 text-xl">✓</span> Always draw the waveform for at least 4 bits when solving problems.</div>
            <div className="flex items-start gap-2"><span className="text-green-600 text-xl">✓</span> Real use: Ethernet (Manchester), USB (NRZ+bit stuffing), Token Ring (Diff Manchester).</div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-6 border-l-8 border-amber-500 italic">
          <p className="text-lg font-medium">🤔 Think about…</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Observe carefully:</strong> In the Manchester SVG above, why does the red dot always change direction mid‑bit?</li>
            <li><strong>Try changing this:</strong> What would happen if you send eight ‘1’ bits using NRZ? How would the receiver know where one bit ends and the next starts?</li>
            <li><strong>Why does Differential Manchester not care about voltage polarity?</strong> Hint: The receiver looks only for presence/absence of a transition at the start.</li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <FAQTemplate title="Encoding Techniques FAQs" questions={questions} />
      </div>

      {/* Teacher’s Note */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <Teacher note="Many students ask: 'Why not just use NRZ everywhere?' The answer lies in synchronisation – imagine Debangshu clapping a rhythm. If he claps at a steady beat (clock), you can follow. NRZ without transitions is like him clapping only once every 10 seconds – you lose the beat. Manchester gives you a guaranteed clap (transition) every bit. Also, remember to draw the waveforms with proper voltage levels – that's the #1 mistake in exams." />
      </div>

      {/* Inline keyframes for fade+slide-up animation */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeSlideUp_0\\.6s_ease-out\\] {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic0;