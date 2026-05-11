// File: src/components/topics/Topic0/Topic0.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';

export default function Topic0() {
  const [isDark, setIsDark] = useState(true);
  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className={clsx(isDark ? 'dark' : '', 'min-h-screen transition-colors duration-300')}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
        <div className="fixed top-4 right-4 z-50">
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none">
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
        <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
          {/* Hero Section */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Concept of Routing
            </h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              How data finds its way across networks — from your device to servers around the world.
            </p>
          </section>

          {/* Theory & Explanation Card */}
          <section className="animate-[fade-up_0.5s_ease-out_0.1s] motion-safe:animate-[fade-up_0.5s_ease-out_0.1s]  [animation-fill-mode:forwards]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2">📡 What is Routing?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                Routing is the process of selecting paths in a network along which to send network traffic.
                In any network of interconnected devices (like the Internet), routing directs data packets
                from a source to a destination through intermediate nodes called <strong>routers</strong>.
                Each router makes independent forwarding decisions based on its internal <strong>routing table</strong>.
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                Think of it like a postal system: Mamata in Barrackpore wants to send a letter to Debangshu in Jadavpur.
                The local post office (router) looks up the best route — maybe via Ichapur sorting hub,
                then Kolkata central, finally to Jadavpur. Each hop decides the next hop based on the destination.
              </p>
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <p className="text-sm font-mono">💡 Core idea: Routing is about making next-hop decisions, not knowing the full path.</p>
              </div>
            </div>
          </section>

          {/* Real-world analogy & professional tips */}
          <section className="animate-[fade-up_0.5s_ease-out_0.2s] motion-safe:animate-[fade-up_0.5s_ease-out_0.2s]   [animation-fill-mode:forwards]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold">🌍 Real-World Examples</h3>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Your home WiFi router sending data to Netflix servers.</li>
                  <li>GPS navigation recalculating a route when you miss a turn (dynamic routing).</li>
                  <li>Large ISPs using BGP to exchange routing info between autonomous systems.</li>
                  <li>School network separating classrooms into different subnets.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold">🧠 Professional Tips</h3>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Always design with redundancy: multiple paths prevent single point of failure.</li>
                  <li>Use static routing for simple, stable networks; dynamic routing for large or changing topologies.</li>
                  <li>Regularly audit routing tables to avoid black holes or loops.</li>
                  <li>Routing metrics (cost, hops, bandwidth) matter — choose wisely.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Interactive SVG Illustration */}
          <section className="animate-[fade-up_0.5s_ease-out_0.3s] motion-safe:animate-[fade-up_0.5s_ease-out_0.3s]   [animation-fill-mode:forwards] bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">📦 Packet Routing in Action</h2>
            <div className="flex justify-center">
              <svg width="700" height="320" viewBox="0 0 700 320" className="max-w-full h-auto">
                <rect width="700" height="320" fill="transparent" />
                <circle cx="100" cy="160" r="30" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
                <text x="100" y="166" textAnchor="middle" fill="white" fontSize="12">R1</text>
                <circle cx="280" cy="80" r="30" fill="#10b981" stroke="#064e3b" strokeWidth="2" />
                <text x="280" y="86" textAnchor="middle" fill="white" fontSize="12">R2</text>
                <circle cx="450" cy="160" r="30" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                <text x="450" y="166" textAnchor="middle" fill="white" fontSize="12">R3</text>
                <circle cx="600" cy="160" r="30" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
                <text x="600" y="166" textAnchor="middle" fill="white" fontSize="12">R4</text>
                <line x1="130" y1="160" x2="250" y2="80" stroke="#9ca3af" strokeWidth="3" strokeDasharray="5,3" />
                <line x1="130" y1="160" x2="420" y2="160" stroke="#9ca3af" strokeWidth="3" />
                <line x1="310" y1="80" x2="420" y2="160" stroke="#9ca3af" strokeWidth="3" strokeDasharray="5,3" />
                <line x1="480" y1="160" x2="570" y2="160" stroke="#9ca3af" strokeWidth="3" />
                <path id="packetPath" d="M130,160 L420,160 L570,160" fill="none" stroke="none" />
                <circle r="8" fill="#ff0080" stroke="white" strokeWidth="2">
                  <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#packetPath" />
                  </animateMotion>
                  <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.8;0.9;1" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="300" y="260" textAnchor="middle" fill="currentColor" fontSize="12" className="text-gray-600 dark:text-gray-400">
                  Packet travels: R1 → R3 → R4 (shortest path)
                </text>
                <text x="300" y="280" textAnchor="middle" fill="currentColor" fontSize="11" className="text-gray-500 dark:text-gray-400">
                  Each router checks its routing table to forward the packet.
                </text>
              </svg>
            </div>
            <p className="text-sm text-center mt-2 text-gray-500 dark:text-gray-400">
              Hover over routers to see their role — each one makes an independent routing decision.
            </p>
          </section>

          {/* Static vs Dynamic Routing Comparison */}
          <section className="animate-[fade-up_0.5s_ease-out_0.4s] motion-safe:animate-[fade-up_0.5s_ease-out_0.4s]   [animation-fill-mode:forwards]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">⚖️ Static vs Dynamic Routing</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr><th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aspect</th><th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Static Routing</th><th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dynamic Routing</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr><td className="px-6 py-4">Administration</td><td className="px-6 py-4">Manual, by network admin</td><td className="px-6 py-4">Automatic via protocols (OSPF, BGP)</td></tr>
                    <tr><td className="px-6 py-4">Scalability</td><td className="px-6 py-4">Limited to small networks</td><td className="px-6 py-4">Highly scalable</td></tr>
                    <tr><td className="px-6 py-4">Adaptability</td><td className="px-6 py-4">Does not adapt to failures</td><td className="px-6 py-4">Adapts to topology changes</td></tr>
                    <tr><td className="px-6 py-4">Resource Usage</td><td className="px-6 py-4">No extra overhead</td><td className="px-6 py-4">CPU/memory for routing protocols</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Common Pitfalls & Best Practices */}
          <section className="animate-[fade-up_0.5s_ease-out_0.5s] motion-safe:animate-[fade-up_0.5s_ease-out_0.5s]   [animation-fill-mode:forwards]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
                <ul className="list-disc ml-5 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Forgetting default gateway — leads to packets being dropped.</li>
                  <li>Routing loops (packets bounce forever) due to inconsistent tables.</li>
                  <li>Using static routes in large, dynamic networks (maintenance nightmare).</li>
                  <li>Misunderstanding administrative distance leading to unwanted routes.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg p-6">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">✅ Best Practices</h3>
                <ul className="list-disc ml-5 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Always document manual routing changes.</li>
                  <li>Implement route summarization to reduce table size.</li>
                  <li>Use bidirectional forwarding detection (BFD) for fast failure detection.</li>
                  <li>Test routing policies in a lab before production.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mini Checklist */}
          <div className="animate-[fade-up_0.5s_ease-out_0.6s] motion-safe:animate-[fade-up_0.5s_ease-out_0.6s]   [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-700/50 rounded-xl p-5">
            <h3 className="font-bold text-lg">📋 Mini Checklist: Routing Concepts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Understand forwarding vs routing</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Know the structure of routing table</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Differentiate static and dynamic methods</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Explain how routers avoid loops</label>
            </div>
          </div>

          <div className="animate-[fade-up_0.5s_ease-out_0.7s] motion-safe:animate-[fade-up_0.5s_ease-out_0.7s]   [animation-fill-mode:forwards] border-l-4 border-blue-400 pl-5 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-xl">
            <p className="italic text-gray-600 dark:text-gray-300">💭 Think about… how does Google’s infrastructure route your search query to the nearest data center? Observe carefully how each router only knows the next hop, not the entire map.</p>
            <p className="italic text-gray-600 dark:text-gray-300 mt-2">✨ Try changing the packet color in the SVG or imagine if R2 fails — what path would R1 choose next?</p>
          </div>

          <FAQTemplate title="Routing Fundamentals FAQs" questions={questions} />
          <Teacher note="Routing is the backbone of internet communication. Emphasize to students that routers do not have a full map — they just know 'where to send next'. Use the postal service analogy for intuition. Encourage tracing traceroute outputs to see real routing hops." />
        </main>
        <style>{`
          @keyframes fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[fade-up_0\\.5s_ease-out\\] { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}