// Topic3.jsx
import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';

/**
 * Topic3: Applications in Real Networks
 * 
 * Prototype: function Topic3()
 * Return type: JSX.Element
 * Purpose: Show how encoding, multiplexing, and switching are used in real-world networks
 * When & why used: To connect theory to practical systems like Ethernet, DSL, fiber optics, internet, telephone
 */

const Topic3 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 dark:from-green-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Applications in Real Networks
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            How encoding, multiplexing, and switching come together in Ethernet, DSL, fiber optics, telephones, and the internet.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">Ethernet</span>
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full">DSL / Fiber</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">Telephone / Internet</span>
          </div>
        </div>

        {/* Real-World Context */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">From Theory to Practice</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 leading-relaxed space-y-3">
            <p>
              <span className="font-semibold text-green-600 dark:text-green-400">Swadeep</span> in <span className="font-semibold">Barrackpore</span> uses the internet daily — but behind the scenes, 
              <strong className="text-cyan-600 dark:text-cyan-400"> encoding, multiplexing, and switching</strong> work together. 
              This topic connects each technique to real systems you've actually used.
            </p>
            <p>
              We'll explore: Ethernet (Manchester encoding), DSL (FDM), T1/E1 (TDM), DWDM (WDM), 
              telephone network (circuit switching), and the internet (packet switching).
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm italic">💡 <span className="font-semibold">Think about:</span> When you plug an Ethernet cable, what encoding is used? How does your DSL modem separate voice from data?</p>
            </div>
          </div>
        </section>

        {/* Application 1: Ethernet */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.2s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4">Ethernet (10Base‑T) — Manchester Encoding</h2>
            <span className="text-sm bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-full">Encoding</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">What it uses:</span> Manchester encoding (low-to-high = 1, high-to-low = 0).</p>
              <p><span className="font-bold">Why:</span> Provides built-in clock recovery, no DC component, works over twisted pair.</p>
              <p><span className="font-bold">Real speed:</span> 10 Mbps (later standards use other encodings: 100Base-TX uses MLT-3, 1000Base-T uses PAM-5).</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Ethernet frame → Manchester encoded → twisted pair → receiver recovers clock</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <EthernetSvg />
            </div>
          </div>
        </section>

        {/* Application 2: DSL (FDM) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.3s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-cyan-500 pl-4">DSL — Frequency Division Multiplexing</h2>
            <span className="text-sm bg-cyan-100 dark:bg-cyan-900/40 px-3 py-1 rounded-full">Multiplexing</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">What it uses:</span> FDM over telephone copper wires: voice (0-4 kHz), upstream (25-138 kHz), downstream (138-1104 kHz).</p>
              <p><span className="font-bold">Why:</span> Allows simultaneous voice and data on same line, no new wiring.</p>
              <p><span className="font-bold">Variants:</span> ADSL (asymmetric), VDSL (very high bitrate), G.fast.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Phone ↔ splitter ↔ DSL modem ↔ PC (data) and phone (voice)</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <DslSvg />
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
            <p>📘 <span className="font-semibold">Real Story:</span> <span className="font-mono">Susmita</span> in <span className="font-mono">Ichapur</span> wondered why her DSL line could handle phone calls and internet at the same time — the answer is FDM!</p>
          </div>
        </section>

        {/* Application 3: T1/E1 (TDM) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.4s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">T1/E1 — Time Division Multiplexing</h2>
            <span className="text-sm bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full">Multiplexing</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">What it uses:</span> Synchronous TDM. T1: 24 channels × 64 kbps = 1.544 Mbps. E1: 32 channels × 64 kbps = 2.048 Mbps.</p>
              <p><span className="font-bold">Why:</span> Carries multiple phone calls or data streams over a single line.</p>
              <p><span className="font-bold">Use cases:</span> Legacy telephone backbone, PRI (Primary Rate Interface) for PBX, backhaul.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">T1 frame: [Framing][Ch1][Ch2]...[Ch24] repeated 8000 times/sec</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <TdmAppSvg />
            </div>
          </div>
        </section>

        {/* Application 4: DWDM (WDM) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.5s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4">DWDM — Dense Wavelength Division Multiplexing</h2>
            <span className="text-sm bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-full">Multiplexing</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">What it uses:</span> WDM with 40-160 wavelengths in C-band (1530-1565 nm), each carrying 10-400 Gbps.</p>
              <p><span className="font-bold">Why:</span> Enormous capacity (terabits/s) over single fiber, used in undersea cables and backbones.</p>
              <p><span className="font-bold">Components:</span> Lasers, AWG mux/demux, EDFA amplifiers, ROADM.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">80 wavelengths × 100 Gbps = 8 Tbps per fiber pair</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <DwdmSvg />
            </div>
          </div>
        </section>

        {/* Application 5: Telephone Network (Circuit Switching) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.6s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4">Telephone Network — Circuit Switching</h2>
            <span className="text-sm bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-full">Switching</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">What it uses:</span> Circuit switching (dedicated 64 kbps path per call) with SS7 signaling.</p>
              <p><span className="font-bold">Why:</span> Guaranteed low latency, no jitter, perfect for real-time voice.</p>
              <p><span className="font-bold">Modern evolution:</span> Many telcos now use VoIP over packet networks, but the PSTN backbone still uses TDM circuits.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Dial → Setup → Ring → Connect → Talk → Hang up → Teardown</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <CircuitAppSvg />
            </div>
          </div>
        </section>

        {/* Application 6: Internet (Packet Switching) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.7s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4">The Internet — Packet Switching (Datagram)</h2>
            <span className="text-sm bg-orange-100 dark:bg-orange-900/40 px-3 py-1 rounded-full">Switching</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">What it uses:</span> IP datagram packet switching (connectionless). Each packet routed independently.</p>
              <p><span className="font-bold">Why:</span> Highly scalable, robust to failures, efficient for bursty traffic.</p>
              <p><span className="font-bold">Underlying technologies:</span> Ethernet (LAN), MPLS (core), DWDM (backbone).</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Packet has src/dst IP → routers forward via routing table → may take different paths</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <InternetSvg />
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
            <p>📘 <span className="font-semibold">Teacher's Note:</span> <span className="font-mono">Debangshu</span> in <span className="font-mono">Naihati</span> was amazed that his email packets might travel different routes across continents — that's the power of packet switching!</p>
          </div>
        </section>

        {/* Combined Summary Table */}
        <section className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.8s] overflow-x-auto">
          <h2 className="text-2xl font-semibold border-l-4 border-gray-500 pl-4 mb-4">Real Network Applications Summary</h2>
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Network</th>
                <th className="p-3 text-left">Encoding</th>
                <th className="p-3 text-left">Multiplexing</th>
                <th className="p-3 text-left">Switching</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">10Base-T Ethernet</td><td className="p-3">Manchester</td><td class="p-3">—</td><td class="p-3">Frame switching (MAC)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">DSL</td><td class="p-3">DMT (QAM)</td><td class="p-3">FDM</td><td class="p-3">Packet (ATM or IP)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">T1/E1</td><td class="p-3">B8ZS/AMI/HDB3</td><td class="p-3">TDM</td><td class="p-3">Circuit (TSI)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">DWDM Backbone</td><td class="p-3">NRZ (optical)</td><td class="p-3">WDM</td><td class="p-3">Optical (wavelength routing)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">PSTN (Phone)</td><td class="p-3">PCM (μ-law)</td><td class="p-3">TDM</td><td class="p-3">Circuit switching</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Internet (IP)</td><td class="p-3">Various (depending on link)</td><td class="p-3">Statistical TDM</td><td class="p-3">Packet (datagram)</td></tr>
            </tbody>
          </table>
        </section>

        {/* Tips & Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.9s]">
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4">Professional Insights</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl hover:shadow-md transition-all">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-400">🎯 Industry Reality</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li>Modern Ethernet (1G/10G) uses advanced encoding like PAM-5, 64B/66B, not Manchester.</li>
                <li>DSL is being replaced by fiber (GPON, XGS-PON) but still used in rural areas.</li>
                <li>Most voice traffic now travels as VoIP over packet networks, but TDM persists in legacy.</li>
                <li>DWDM + MPLS + IP is the standard backbone stack for ISPs.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl hover:shadow-md transition-all">
              <h3 className="font-bold text-red-700 dark:text-red-400">⚠️ Common Misconceptions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li>Thinking Ethernet always uses Manchester — only 10 Mbps does.</li>
                <li>Believing circuit switching is dead — it's still in every phone call (though hybrid).</li>
                <li>Confusing DSL's FDM with OFDM — DSL uses DMT, which is a form of FDM with many subcarriers.</li>
                <li>Assuming the internet is purely datagram — MPLS virtual circuits exist inside core.</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
            <p className="font-mono text-sm">📌 <span className="font-semibold">Checklist:</span> ✅ Know which real system uses which encoding/multiplexing/switching ✅ Understand why a technique is chosen (cost, distance, QoS) ✅ Recognize that modern networks combine multiple techniques ✅ Be aware of legacy vs modern standards</p>
          </div>
        </section>

        {/* FAQ & Teacher Note */}
        <div className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[1.0s]">
          <FAQTemplate 
            title="Real Network Applications FAQs"
            questions={questions}
          />
        </div>
        <div className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[1.1s]">
          <Teacher note={
            "Students love this topic because it connects theory to what they use daily. Emphasize that no single technique dominates — engineers choose based on requirements. Use the DSL example (voice+data on same wire) to show FDM in action. For packet switching, show traceroute output to illustrate different paths. If possible, bring a DSL splitter or an old Ethernet card for show-and-tell."
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
        .animation-delay-\\[0\\.9s\\] { animation-delay: 0.9s; }
        .animation-delay-\\[1\\.0s\\] { animation-delay: 1.0s; }
        .animation-delay-\\[1\\.1s\\] { animation-delay: 1.1s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.5s_ease-out_forwards\\] {
            animation: none; opacity: 1; transform: none;
          }
        }
      `}</style>
    </div>
  );
};

// SVG for Ethernet (Manchester encoding visual)
const EthernetSvg = () => {
  const width = 500;
  const height = 120;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">10Base-T Ethernet: Manchester Encoding</text>
      {/* Waveform */}
      <path d="M 30 60 L 30 30 L 50 30 L 50 60 L 70 60 L 70 30 L 90 30 L 90 60 L 110 60 L 110 30 L 130 30 L 130 60" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="40" y="85" textAnchor="middle" fontSize="8" fill="#6b7280">1</text>
      <text x="80" y="85" textAnchor="middle" fontSize="8" fill="#6b7280">0</text>
      <text x="120" y="85" textAnchor="middle" fontSize="8" fill="#6b7280">1</text>
      <text x={width/2} y="105" textAnchor="middle" fontSize="9" fill="#6b7280">RJ-45 connector → twisted pair</text>
    </svg>
  );
};

// SVG for DSL (FDM frequency bands)
const DslSvg = () => {
  const width = 500;
  const height = 130;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">DSL: FDM over Telephone Line</text>
      {/* Frequency bands */}
      <rect x="30" y="35" width="60" height="25" fill="#ef4444" rx="3" />
      <text x="60" y="51" textAnchor="middle" fontSize="8" fill="white">Voice</text>
      <rect x="100" y="35" width="70" height="25" fill="#f97316" rx="3" />
      <text x="135" y="51" textAnchor="middle" fontSize="8" fill="white">Upstream</text>
      <rect x="180" y="35" width="250" height="25" fill="#10b981" rx="3" />
      <text x="305" y="51" textAnchor="middle" fontSize="8" fill="white">Downstream (many subcarriers)</text>
      <text x="60" y="80" textAnchor="middle" fontSize="8" fill="#6b7280">4 kHz</text>
      <text x="135" y="80" textAnchor="middle" fontSize="8" fill="#6b7280">~138 kHz</text>
      <text x="305" y="80" textAnchor="middle" fontSize="8" fill="#6b7280">~1.1 MHz</text>
      <text x={width/2} y="110" textAnchor="middle" fontSize="9" fill="#6b7280">Frequency →</text>
    </svg>
  );
};

// SVG for T1/E1 TDM application
const TdmAppSvg = () => {
  const width = 500;
  const height = 110;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">T1/E1: TDM Frame</text>
      {/* Time slots */}
      {[0,1,2,3,4,5,6,7].map((_, i) => (
        <rect key={i} x={30 + i*50} y="40" width="45" height="30" fill="#3b82f6" opacity="0.7" rx="2" />
      ))}
      <text x="52" y="60" textAnchor="middle" fontSize="8" fill="white">Ch1</text>
      <text x="102" y="60" textAnchor="middle" fontSize="8" fill="white">Ch2</text>
      <text x="152" y="60" textAnchor="middle" fontSize="8" fill="white">Ch3</text>
      <text x="202" y="60" textAnchor="middle" fontSize="8" fill="white">...</text>
      <text x="252" y="60" textAnchor="middle" fontSize="8" fill="white">Ch24</text>
      <text x={width/2} y="95" textAnchor="middle" fontSize="9" fill="#6b7280">Each slot = 8 bits, frame repeats 8000 times/sec</text>
    </svg>
  );
};

// SVG for DWDM
const DwdmSvg = () => {
  const width = 500;
  const height = 120;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">DWDM: Many Wavelengths in One Fiber</text>
      {/* Fiber */}
      <rect x="20" y="55" width="460" height="20" fill="#333" rx="10" />
      {/* Colored circles as wavelengths */}
      <circle cx="60" cy="65" r="7" fill="#ef4444" />
      <circle cx="110" cy="65" r="7" fill="#f97316" />
      <circle cx="160" cy="65" r="7" fill="#eab308" />
      <circle cx="210" cy="65" r="7" fill="#10b981" />
      <circle cx="260" cy="65" r="7" fill="#3b82f6" />
      <circle cx="310" cy="65" r="7" fill="#8b5cf6" />
      <circle cx="360" cy="65" r="7" fill="#ec4899" />
      <circle cx="410" cy="65" r="7" fill="#06b6d4" />
      <text x={width/2} y="105" textAnchor="middle" fontSize="9" fill="#6b7280">80+ wavelengths × 100-400 Gbps each → Terabits/s</text>
    </svg>
  );
};

// SVG for Circuit Switching (Phone)
const CircuitAppSvg = () => {
  const width = 500;
  const height = 120;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">PSTN: Circuit Switching</text>
      {/* Phones */}
      <circle cx="40" cy="60" r="12" fill="#ef4444" />
      <text x="40" y="65" textAnchor="middle" fontSize="8" fill="white">A</text>
      <circle cx="460" cy="60" r="12" fill="#ef4444" />
      <text x="460" y="65" textAnchor="middle" fontSize="8" fill="white">B</text>
      {/* Switches */}
      <rect x="100" y="48" width="40" height="24" fill="#f97316" rx="3" />
      <text x="120" y="64" textAnchor="middle" fontSize="8" fill="white">SW1</text>
      <rect x="210" y="48" width="40" height="24" fill="#f97316" rx="3" />
      <text x="230" y="64" textAnchor="middle" fontSize="8" fill="white">SW2</text>
      <rect x="320" y="48" width="40" height="24" fill="#f97316" rx="3" />
      <text x="340" y="64" textAnchor="middle" fontSize="8" fill="white">SW3</text>
      {/* Dedicated path */}
      <line x1="52" y1="60" x2="100" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
      <line x1="140" y1="60" x2="210" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
      <line x1="250" y1="60" x2="320" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
      <line x1="360" y1="60" x2="448" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
      <text x={width/2} y="105" textAnchor="middle" fontSize="9" fill="#6b7280">Dedicated 64 kbps path for call duration</text>
    </svg>
  );
};

// SVG for Internet Packet Switching
const InternetSvg = () => {
  const width = 500;
  const height = 130;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">Internet: Packet Switching (Datagram)</text>
      {/* Source and destination */}
      <circle cx="40" cy="65" r="12" fill="#ea580c" />
      <text x="40" y="70" textAnchor="middle" fontSize="8" fill="white">PC</text>
      <circle cx="460" cy="65" r="12" fill="#ea580c" />
      <text x="460" y="70" textAnchor="middle" fontSize="8" fill="white">Server</text>
      {/* Routers */}
      <rect x="110" y="53" width="35" height="24" fill="#f97316" rx="3" />
      <text x="127" y="69" textAnchor="middle" fontSize="7" fill="white">R1</text>
      <rect x="220" y="35" width="35" height="24" fill="#f97316" rx="3" />
      <text x="237" y="51" textAnchor="middle" fontSize="7" fill="white">R2</text>
      <rect x="220" y="85" width="35" height="24" fill="#f97316" rx="3" />
      <text x="237" y="101" textAnchor="middle" fontSize="7" fill="white">R3</text>
      <rect x="330" y="53" width="35" height="24" fill="#f97316" rx="3" />
      <text x="347" y="69" textAnchor="middle" fontSize="7" fill="white">R4</text>
      {/* Packet paths */}
      <line x1="52" y1="65" x2="110" y2="65" stroke="#f97316" strokeWidth="1.5" />
      <line x1="145" y1="65" x2="220" y2="47" stroke="#f97316" strokeWidth="1.5" />
      <line x1="255" y1="47" x2="330" y2="65" stroke="#f97316" strokeWidth="1.5" />
      <line x1="365" y1="65" x2="448" y2="65" stroke="#f97316" strokeWidth="1.5" />
      <line x1="145" y1="65" x2="220" y2="97" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="255" y1="97" x2="330" y2="65" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" />
      {/* Animated packets */}
      <circle r="4" fill="#10b981">
        <animate attributeName="cx" values="40;460" dur="2s" repeatCount="indefinite" />
        <animate attributeName="cy" values="65;65" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#3b82f6">
        <animate attributeName="cx" values="40;460" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="cy" values="65;65" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <text x={width/2} y="122" textAnchor="middle" fontSize="9" fill="#6b7280">Packets take independent routes → robust, efficient</text>
    </svg>
  );
};

export default Topic3;