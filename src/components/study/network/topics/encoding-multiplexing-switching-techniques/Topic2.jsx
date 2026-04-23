// Topic2.jsx
import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';

/**
 * Topic2: Switching - Circuit, Packet, Message Switching
 * 
 * Prototype: function Topic2()
 * Return type: JSX.Element
 * Purpose: Explain how data is routed from source to destination through intermediate nodes
 * When & why used: Fundamental to network design (telephone, internet, telegraph networks)
 */

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Switching: Circuit, Packet, Message
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            How data finds its way across networks — from old telephone exchanges to the modern internet.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">Circuit Switching</span>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">Packet Switching</span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">Message Switching</span>
          </div>
        </div>

        {/* Why Switching */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4">Why Switching?</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 leading-relaxed space-y-3">
            <p>
              Imagine <span className="font-semibold text-red-600 dark:text-red-400">Swadeep</span> in <span className="font-semibold">Barrackpore</span> wants to call 
              <span className="font-semibold"> Tuhina</span> in <span className="font-semibold">Shyamnagar</span>. Without switching, you'd need a direct wire between every pair — 
              impossible for millions of users. <strong className="text-orange-600 dark:text-orange-400">Switching</strong> allows sharing of network links.
            </p>
            <p>
              Switches (or routers) forward data from input to output ports based on addresses, labels, or dedicated paths. 
              Three main approaches exist: circuit (old phones), packet (internet), and message (historic telegraph).
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm italic">💡 <span className="font-semibold">Think about:</span> What happens when you make a phone call? How does an email find you across continents?</p>
            </div>
          </div>
        </section>

        {/* Circuit Switching */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.2s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4">Circuit Switching</h2>
            <span className="text-sm bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-full">Dedicated Path</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">How it works:</span> Establish a dedicated end-to-end path before transmission. Resources reserved for the entire conversation. Three phases: setup, data transfer, teardown.</p>
              <p><span className="font-bold">Real-world use:</span> Traditional telephone network (PSTN), ISDN, some private leased lines.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Caller dials → switches allocate timeslot/frequency → conversation → release</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-green-600 dark:text-green-400">✅ Pros: Guaranteed bandwidth, low latency (after setup), no per-packet overhead</p>
                <p className="text-red-600 dark:text-red-400">❌ Cons: Inefficient for bursty traffic, long setup time, blocking if no resources</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <CircuitSwitchingSvg />
            </div>
          </div>
        </section>

        {/* Message Switching */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.3s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4">Message Switching</h2>
            <span className="text-sm bg-amber-100 dark:bg-amber-900/40 px-3 py-1 rounded-full">Store-and-Forward</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">How it works:</span> Entire message is received at each switch, stored, then forwarded to next hop. No dedicated path; each hop may buffer.</p>
              <p><span className="font-bold">Real-world use:</span> Telegraph networks, UUCP (Unix-to-Unix Copy), early email (store-and-forward).</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Message → switch (store) → forward → switch (store) → forward → destination</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-green-600 dark:text-green-400">✅ Pros: No path setup, efficient for non-real-time, can retransmit on failure</p>
                <p className="text-red-600 dark:text-red-400">❌ Cons: High latency, large storage needed, unsuitable for interactive traffic</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <MessageSwitchingSvg />
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm">
            <p>📘 <span className="font-semibold">Historical Note:</span> <span className="font-mono">Abhronila</span> learned that early internet precursors used message switching — like FidoNet, where computers called each other overnight to exchange mail batches.</p>
          </div>
        </section>

        {/* Packet Switching */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.4s]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4">Packet Switching</h2>
            <span className="text-sm bg-orange-100 dark:bg-orange-900/40 px-3 py-1 rounded-full">Datagram & Virtual Circuit</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-3">
              <p><span className="font-bold">How it works:</span> Messages split into packets (≤ MTU). Each packet forwarded independently (datagram) or along a pre-established path (virtual circuit).</p>
              <p><span className="font-bold">Real-world use:</span> Internet (IP), Ethernet, MPLS, Frame Relay, X.25.</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm font-mono">Packet has header (src/dst) + payload → routers forward based on IP address</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-green-600 dark:text-green-400">✅ Pros: Efficient for bursty traffic, robust to failures, scalable</p>
                <p className="text-red-600 dark:text-red-400">❌ Cons: Variable delay, per-packet overhead, possible loss/out-of-order</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:shadow-xl transition-all duration-300">
              <PacketSwitchingSvg />
            </div>
          </div>
        </section>

     
        <section className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.5s] overflow-x-auto">
          <h2 className="text-2xl font-semibold border-l-4 border-gray-500 pl-4 mb-4">Switching Techniques Compared</h2>
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Feature</th>
                <th className="p-3 text-left">Circuit</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Packet (Datagram)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Path setup</td><td>Required</td><td>None</td><td>None (or optional VC)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Resource reservation</td><td>Yes (end-to-end)</td><td>No</td><td>No (best-effort)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Store-and-forward</td><td>No</td><td>Yes (whole message)</td><td>Yes (per packet)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Delay</td><td>Low (after setup)</td><td>High</td><td>Variable</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Overhead</td><td>Low</td><td>Low (address per message)</td><td>High (per packet)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Failure recovery</td><td>Call drops</td><td>Retransmit message</td><td>Re-route packets</td></tr>
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
                <li>Circuit switching is still used in voice backbones (SS7) for guaranteed QoS.</li>
                <li>Packet switching dominates data; use TCP for reliability, UDP for real-time.</li>
                <li>Message switching survives in delay-tolerant networks (DTN) like space communication.</li>
                <li>Virtual circuit (e.g., MPLS) gives a middle ground: setup once, fast forwarding.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl hover:shadow-md transition-all">
              <h3 className="font-bold text-red-700 dark:text-red-400">⚠️ Common Mistakes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li>Confusing packet switching with datagram vs virtual circuit.</li>
                <li>Thinking circuit switching has no delay — setup time can be seconds.</li>
                <li>Assuming message switching is obsolete — it's used in email queues and IoT store-and-forward.</li>
                <li>Forgetting that the internet uses both datagram (IP) and virtual circuit (MPLS, TCP connection).</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
            <p className="font-mono text-sm">📌 <span className="font-semibold">Checklist:</span> ✅ Understand the three phases of circuit switching ✅ Know the difference between datagram and virtual circuit packet switching ✅ Recognize real-world examples of each ✅ Analyze trade-offs: latency vs efficiency vs overhead</p>
          </div>
        </section>

        {/* FAQ & Teacher Note */}
        <div className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.7s]">
          <FAQTemplate 
            title="Switching FAQs"
            questions={questions}
          />
        </div>
        <div className="animate-[fadeSlideUp_0.5s_ease-out_forwards] animation-delay-[0.8s]">
          <Teacher note={
            "Students often ask: why do we need both packet and circuit? Use the analogy of a restaurant: circuit switching = private dining room (reserved, guaranteed quiet); packet switching = food court (anyone sits, may wait, but efficient). Message switching = a post office (takes time, but reliable). Emphasize that modern networks combine them: voice over IP uses packet switching but tries to emulate circuit behavior with QoS."
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

// SVG for Circuit Switching: dedicated path through switches
const CircuitSwitchingSvg = () => {
  const width = 500;
  const height = 150;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">Circuit Switching: Dedicated Path</text>
      {/* Endpoints */}
      <circle cx="40" cy="75" r="15" fill="#ef4444" />
      <text x="40" y="80" textAnchor="middle" fontSize="10" fill="white">A</text>
      <circle cx="460" cy="75" r="15" fill="#ef4444" />
      <text x="460" y="80" textAnchor="middle" fontSize="10" fill="white">B</text>
      {/* Switches */}
      <rect x="120" y="60" width="40" height="30" fill="#f97316" rx="4" />
      <text x="140" y="80" textAnchor="middle" fontSize="9" fill="white">S1</text>
      <rect x="240" y="60" width="40" height="30" fill="#f97316" rx="4" />
      <text x="260" y="80" textAnchor="middle" fontSize="9" fill="white">S2</text>
      <rect x="360" y="60" width="40" height="30" fill="#f97316" rx="4" />
      <text x="380" y="80" textAnchor="middle" fontSize="9" fill="white">S3</text>
      {/* Dedicated path lines */}
      <line x1="55" y1="75" x2="120" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
      <line x1="160" y1="75" x2="240" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
      <line x1="280" y1="75" x2="360" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
      <line x1="400" y1="75" x2="445" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
      {/* Animated data flow */}
      <circle r="4" fill="#10b981">
        <animate attributeName="cx" values="40;460" dur="3s" repeatCount="indefinite" />
        <animate attributeName="cy" values="75;75" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x={width/2} y="130" textAnchor="middle" fontSize="10" fill="#6b7280">Reserved path → low delay, guaranteed bandwidth</text>
    </svg>
  );
};

// SVG for Message Switching: store-and-forward with full messages
const MessageSwitchingSvg = () => {
  const width = 500;
  const height = 160;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">Message Switching: Store-and-Forward</text>
      {/* Nodes */}
      <circle cx="40" cy="70" r="14" fill="#f59e0b" />
      <text x="40" y="75" textAnchor="middle" fontSize="9" fill="white">Src</text>
      <rect x="120" y="55" width="45" height="30" fill="#d97706" rx="4" />
      <text x="142" y="73" textAnchor="middle" fontSize="8" fill="white">Switch1</text>
      <rect x="230" y="55" width="45" height="30" fill="#d97706" rx="4" />
      <text x="252" y="73" textAnchor="middle" fontSize="8" fill="white">Switch2</text>
      <circle cx="460" cy="70" r="14" fill="#f59e0b" />
      <text x="460" y="75" textAnchor="middle" fontSize="9" fill="white">Dst</text>
      {/* Message envelope at first switch */}
      <rect x="130" y="100" width="30" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" rx="2" />
      <text x="145" y="113" textAnchor="middle" fontSize="7" fill="#78350f">Msg</text>
      {/* Arrow from src to switch1 */}
      <line x1="54" y1="70" x2="120" y2="70" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrowMsg)" />
      {/* Arrow from switch1 to switch2 after store */}
      <line x1="165" y1="70" x2="230" y2="70" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3,3" />
      <line x1="275" y1="70" x2="446" y2="70" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrowMsg)" />
      <defs>
        <marker id="arrowMsg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
        </marker>
      </defs>
      {/* Storage icon */}
      <rect x="195" y="100" width="20" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" rx="2" />
      <text x="205" y="113" textAnchor="middle" fontSize="7" fill="#78350f">Buf</text>
      <text x={width/2} y="148" textAnchor="middle" fontSize="10" fill="#6b7280">Entire message stored at each hop → high latency</text>
    </svg>
  );
};

// SVG for Packet Switching: packets traversing network independently
const PacketSwitchingSvg = () => {
  const width = 500;
  const height = 160;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md h-auto bg-white dark:bg-gray-900 rounded-lg shadow-inner">
      <rect width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      <text x={width/2} y="18" textAnchor="middle" fontSize="12" fill="#4b5563">Packet Switching: Independent packets</text>
      {/* Nodes */}
      <circle cx="40" cy="70" r="14" fill="#ea580c" />
      <text x="40" y="75" textAnchor="middle" fontSize="9" fill="white">A</text>
      <rect x="110" y="55" width="40" height="30" fill="#f97316" rx="4" />
      <text x="130" y="73" textAnchor="middle" fontSize="8" fill="white">R1</text>
      <rect x="200" y="40" width="40" height="30" fill="#f97316" rx="4" />
      <text x="220" y="58" textAnchor="middle" fontSize="8" fill="white">R2</text>
      <rect x="200" y="100" width="40" height="30" fill="#f97316" rx="4" />
      <text x="220" y="118" textAnchor="middle" fontSize="8" fill="white">R3</text>
      <rect x="310" y="55" width="40" height="30" fill="#f97316" rx="4" />
      <text x="330" y="73" textAnchor="middle" fontSize="8" fill="white">R4</text>
      <circle cx="460" cy="70" r="14" fill="#ea580c" />
      <text x="460" y="75" textAnchor="middle" fontSize="9" fill="white">B</text>
      
      {/* Multiple packet paths */}
      <line x1="54" y1="70" x2="110" y2="70" stroke="#f97316" strokeWidth="1.5" />
      <line x1="150" y1="70" x2="200" y2="55" stroke="#f97316" strokeWidth="1.5" />
      <line x1="240" y1="55" x2="310" y2="70" stroke="#f97316" strokeWidth="1.5" />
      <line x1="350" y1="70" x2="446" y2="70" stroke="#f97316" strokeWidth="1.5" />
      <line x1="150" y1="70" x2="200" y2="115" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="240" y1="115" x2="310" y2="70" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" />
      
      {/* Animated packets */}
      <circle r="4" fill="#10b981">
        <animate attributeName="cx" values="40;460" dur="2s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70;70" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#3b82f6">
        <animate attributeName="cx" values="40;460" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70;70" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x={width/2} y="148" textAnchor="middle" fontSize="10" fill="#6b7280">Packets take different routes → robust, efficient</text>
    </svg>
  );
};

export default Topic2;