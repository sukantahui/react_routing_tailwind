// Topic1.jsx
import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';

/**
 * Topic1: Multiplexing - FDM, TDM, WDM
 * 
 * Prototype: function Topic1()
 * Return type: JSX.Element
 * Purpose: Explain how multiple signals share a single communication channel
 * When & why used: To maximize utilization of expensive transmission media (fiber, satellite, etc.)
 */

const Topic1 = () => {
  // Sample data for TDM time slots
  const channels = ['A', 'B', 'C', 'D'];
  const frameStructure = [0, 1, 2, 3, 0, 1, 2, 3]; // TDM frame slot indices

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-400 dark:to-teal-400 bg-clip-text text-transparent">
            Multiplexing: FDM, TDM, WDM
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Sharing a single communication channel among multiple users — the secret behind efficient networks.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">FDM</span>
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">TDM</span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">WDM</span>
          </div>
        </div>

        {/* Why Multiplexing */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4">Why Multiplexing?</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 leading-relaxed space-y-3">
            <p>
              Imagine a cable connecting <span className="font-semibold text-indigo-600 dark:text-indigo-400">Barrackpore</span> and 
              <span className="font-semibold"> Shyamnagar</span>. Instead of laying one cable per conversation, 
              <strong className="text-teal-600 dark:text-teal-400"> multiplexing</strong> allows hundreds of calls simultaneously.
              <span className="font-semibold"> Swadeep, Tuhina, Abhronila, and Susmita</span> can all talk without interfering.
            </p>
            <p>
              Without multiplexing, global communication would be impossibly expensive. Modern networks (4G/5G, fiber optics, satellite)
              rely on it to serve millions of users with limited spectrum.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm italic">💡 <span className="font-semibold">Think about:</span> How does your Wi-Fi handle multiple devices? How does a cell tower serve thousands of calls?</p>
            </div>
          </div>
        </section>

        {/* FDM Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.2s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4">FDM (Frequency Division Multiplexing)</h2>
            <span className="text-sm bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full">Analog / Radio / TV</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">How it works:</span> Each signal occupies a different frequency band (carrier), all transmitted simultaneously over the same medium.</p>
              <p><span className="font-bold">Real-world use:</span> Radio broadcasting (different stations at different frequencies), Cable TV, DSL (discrete multitone), 4G/5G subcarriers.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">FM Radio: 91.1 MHz (Channel A), 93.5 MHz (Channel B), ...</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-green-600 dark:text-green-400">✅ Pros: Continuous transmission, low latency, no synchronization needed</p>
                <p className="text-red-600 dark:text-red-400">❌ Cons: Guard bands waste spectrum, requires linear amplifiers, cross-talk risk</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <FdmSvg />
            </div>
          </div>
        </section>

        {/* TDM Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.3s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-4">TDM (Time Division Multiplexing)</h2>
            <span className="text-sm bg-teal-100 dark:bg-teal-900/40 px-3 py-1 rounded-full">Digital / Synchronous</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">How it works:</span> Users take turns using the full channel bandwidth for a short time slot. A frame cycles through all users.</p>
              <p><span className="font-bold">Real-world use:</span> Telephone backbone (T1/E1 lines), SONET/SDH, USB (polling), Ethernet (statistical TDM).</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Frame: [Slot A][Slot B][Slot C][Slot D] → repeats</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-green-600 dark:text-green-400">✅ Pros: No guard bands, fully digital, flexible bandwidth allocation</p>
                <p className="text-red-600 dark:text-red-400">❌ Cons: Requires synchronization, overhead for framing, delay</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <TdmSvg channels={channels} frameSlots={frameStructure} />
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
            <p>📘 <span className="font-semibold">Real Story:</span> When <span className="font-mono">Debangshu</span> in <span className="font-mono">Naihati</span> learned TDM, he realized why old landline calls had a slight delay — they were sharing the same wire with neighbors!</p>
          </div>
        </section>

        {/* WDM Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.4s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4">WDM (Wavelength Division Multiplexing)</h2>
            <span className="text-sm bg-amber-100 dark:bg-amber-900/40 px-3 py-1 rounded-full">Fiber Optics</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">How it works:</span> FDM in optical fibers — each signal uses a different light wavelength (color). Dense WDM (DWDM) packs 80+ wavelengths.</p>
              <p><span className="font-bold">Real-world use:</span> Undersea cables, backbone internet, cable TV (RFoG), data center interconnects.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">λ1 = 1550.12 nm, λ2 = 1550.92 nm, ... each carries 100 Gbps</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-green-600 dark:text-green-400">✅ Pros: Immense capacity (terabits/s), low loss, no electromagnetic interference</p>
                <p className="text-red-600 dark:text-red-400">❌ Cons: Expensive lasers and filters, temperature sensitivity</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <WdmSvg />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.5s] overflow-x-auto">
          <h2 className="text-2xl font-semibold border-l-4 border-gray-500 pl-4 mb-4">Multiplexing Techniques Compared</h2>
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Aspect</th>
                <th className="p-3 text-left">FDM</th>
                <th className="p-3 text-left">TDM</th>
                <th className="p-3 text-left">WDM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Domain</td><td>Frequency</td><td>Time</td><td>Wavelength (Optical)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Synchronization</td><td>Not needed</td><td>Essential</td><td>Not needed</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Guard bands</td><td>Yes (frequency gaps)</td><td>Guard times (small)</td><td>Guard wavelengths</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Typical medium</td><td>Radio, copper</td><td>Copper, fiber</td><td>Optical fiber</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Example</td><td>FM radio, TV</td><td>T1/E1, SONET</td><td>DWDM, PON</td></tr>
            </tbody>
          </table>
        </section>

        {/* Tips & Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4">Professional Tips & Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl hover:shadow-md transition-all">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-400">🎯 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li>Use FDM when signals are continuous (analog) and you need real-time.</li>
                <li>TDM is ideal for digital bursty traffic (data networks).</li>
                <li>WDM is the king for long-haul fiber — always consider DWDM for backbone.</li>
                <li>Statistical TDM (STDM) allocates slots dynamically for better efficiency.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl hover:shadow-md transition-all">
              <h3 className="font-bold text-red-700 dark:text-red-400">⚠️ Common Mistakes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li>Confusing TDM with TDMA (multiple access vs multiplexing).</li>
                <li>Assuming FDM has no crosstalk — poor filtering causes adjacent channel interference.</li>
                <li>Thinking WDM works with any fiber — dispersion and nonlinearities matter.</li>
                <li>Ignoring overhead in TDM (framing bits reduce net throughput).</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
            <p className="font-mono text-sm">📌 <span className="font-semibold">Checklist:</span> ✅ Know which technique suits continuous vs bursty traffic ✅ Understand guard bands/time slots ✅ Recognize real protocols (Wi-Fi uses OFDM which is FDM+TDM) ✅ Calculate efficiency</p>
          </div>
        </section>

        {/* FAQ & Teacher Note */}
        <div className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.7s]">
          <FAQTemplate 
            title="Multiplexing FAQs"
            questions={questions}
          />
        </div>
        <div className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.8s]">
          <Teacher note={
            "Students often think TDM is obsolete, but it's alive in every digital phone call and USB. Use the analogy of a round-robin tournament for TDM. For FDM, compare to different colored lights in the same room. Show them a DWDM spectrum plot — it's beautiful! Also emphasize that modern networks combine multiple techniques: OFDM (4G/5G) is FDM + TDM, and WDM uses TDM inside each wavelength."
          } />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animation-delay-\\[0\\.1s\\] { animation-delay: 0.1s; }
        .animation-delay-\\[0\\.2s\\] { animation-delay: 0.2s; }
        .animation-delay-\\[0\\.3s\\] { animation-delay: 0.3s; }
        .animation-delay-\\[0\\.4s\\] { animation-delay: 0.4s; }
        .animation-delay-\\[0\\.5s\\] { animation-delay: 0.5s; }
        .animation-delay-\\[0\\.6s\\] { animation-delay: 0.6s; }
        .animation-delay-\\[0\\.7s\\] { animation-delay: 0.7s; }
        .animation-delay-\\[0\\.8s\\] { animation-delay: 0.8s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.5s_ease-out_forwards\\] {
            animation: none; opacity: 1; transform: none;
          }
        }
      `}</style>
    </div>
  );
};

// FDM SVG: Three channels in frequency domain
const FdmSvg = () => {
  const width = 500;
  const height = 150;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="20" textAnchor="middle" fontSize="12" fill="#4b5563">Frequency Domain</text>
      {/* Channel A */}
      <rect x="30" y="40" width="100" height="30" fill="#3b82f6" opacity="0.7" rx="4" />
      <text x="80" y="60" textAnchor="middle" fontSize="10" fill="white">Channel A</text>
      {/* Guard band */}
      <rect x="135" y="40" width="20" height="30" fill="#ccc" opacity="0.5" />
      {/* Channel B */}
      <rect x="160" y="40" width="100" height="30" fill="#10b981" opacity="0.7" rx="4" />
      <text x="210" y="60" textAnchor="middle" fontSize="10" fill="white">Channel B</text>
      {/* Guard band */}
      <rect x="265" y="40" width="20" height="30" fill="#ccc" opacity="0.5" />
      {/* Channel C */}
      <rect x="290" y="40" width="100" height="30" fill="#f59e0b" opacity="0.7" rx="4" />
      <text x="340" y="60" textAnchor="middle" fontSize="10" fill="white">Channel C</text>
      <text x={width/2} y="130" textAnchor="middle" fontSize="10" fill="#6b7280">Frequency →</text>
      {/* Animated scanning line */}
      <line x1="0" y1="0" x2="0" y2={height} stroke="#ef4444" strokeWidth="1.5">
        <animate attributeName="x1" values="0;500" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="0;500" dur="4s" repeatCount="indefinite" />
      </line>
    </svg>
  );
};

// TDM SVG: Time slots cycling
const TdmSvg = ({ channels, frameSlots }) => {
  const width = 500;
  const height = 120;
  const slotWidth = width / frameSlots.length;
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">Time Domain: TDM Frame</text>
      {frameSlots.map((slot, idx) => (
        <g key={idx}>
          <rect x={idx * slotWidth} y="35" width={slotWidth-2} height="45" fill={colors[slot % colors.length]} opacity="0.7" rx="2" />
          <text x={idx * slotWidth + slotWidth/2} y="62" textAnchor="middle" fontSize="11" fill="white">Ch {channels[slot]}</text>
        </g>
      ))}
      {/* Animated moving pointer */}
      <polygon points="0,95 5,105 -5,105" fill="#ef4444">
        <animate attributeName="transform" type="translate" values={`0,0;${width},0`} dur="4s" repeatCount="indefinite" />
      </polygon>
      <text x={width/2} y={height-8} textAnchor="middle" fontSize="10" fill="#6b7280">Time →</text>
    </svg>
  );
};

// WDM SVG: Multiple wavelengths in fiber
const WdmSvg = () => {
  const width = 500;
  const height = 120;
  const wavelengths = [
    { color: '#ef4444', name: 'λ1', x: 60 },
    { color: '#f59e0b', name: 'λ2', x: 140 },
    { color: '#10b981', name: 'λ3', x: 220 },
    { color: '#3b82f6', name: 'λ4', x: 300 },
    { color: '#8b5cf6', name: 'λ5', x: 380 },
  ];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">WDM: Different Colors in One Fiber</text>
      {/* Fiber representation */}
      <rect x="20" y="50" width="460" height="20" fill="#333" rx="10" />
      {wavelengths.map((wl, i) => (
        <circle key={i} cx={wl.x} cy="60" r="6" fill={wl.color} opacity="0.9">
          <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" begin={`${i*0.3}s`} />
        </circle>
      ))}
      {wavelengths.map((wl, i) => (
        <text key={`label-${i}`} x={wl.x} y="45" textAnchor="middle" fontSize="9" fill={wl.color}>{wl.name}</text>
      ))}
      <text x={width/2} y={height-8} textAnchor="middle" fontSize="10" fill="#6b7280">Wavelength → (shorter λ → longer λ)</text>
    </svg>
  );
};

export default Topic1;