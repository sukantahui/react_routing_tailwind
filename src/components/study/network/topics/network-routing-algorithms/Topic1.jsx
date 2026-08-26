// File: src/components/topics/Topic1/Topic1.jsx
// Topic: Shortest Path Algorithm (Dijkstra) – core concept for routing protocols
// React 19 functional component with full Tailwind styling, dark/light mode, animations.

import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';

/**
 * Component: Topic1
 * Prototype: function Topic1() : JSX.Element
 * Purpose: Introduce the shortest path problem and Dijkstra's algorithm,
 *          explaining how routers compute optimal routes using link-state databases.
 * When & Why used: After understanding "routing", students learn the algorithm
 *                  that powers OSPF and many GPS navigations.
 * Return Type: JSX.Element – full lesson layout with theory, diagram, and practices.
 */
export default function Topic1() {
  const [isDark, setIsDark] = useState(true); // dark mode default

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className={clsx(isDark ? 'dark' : '', 'min-h-screen transition-colors duration-300')}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
        {/* Dark mode toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
          {/* Hero Section */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
              Shortest Path Algorithms
            </h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              How routers and navigation apps find the best route – Dijkstra’s algorithm explained step by step.
            </p>
          </section>

          {/* Theory */}
          <section className="animate-[fade-up_0.5s_ease-out_0.1s] motion-safe:animate-[fade-up_0.5s_ease-out_0.1s]   [animation-fill-mode:forwards]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">📐 What is the Shortest Path Problem?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                In a weighted graph (nodes = routers, edges = links with costs like delay or hop count),
                the shortest path between two nodes is the one with minimum total weight. Routing protocols
                like <strong>OSPF</strong> use Dijkstra’s algorithm to compute the shortest path tree from a router
                to all destinations.
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                Think of Mamata driving from Barrackpore to Jadavpur: she wants the quickest route, not necessarily
                the shortest in kilometers. Different “costs” (traffic, road quality) can be assigned, and the
                algorithm finds the minimal cost path.
              </p>
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <p className="text-sm font-mono">💡 Key insight: Dijkstra works only with non‑negative edge weights.</p>
              </div>
            </div>
          </section>

          {/* Real-world & Tips */}
          <section className="animate-[fade-up_0.5s_ease-out_0.2s] motion-safe:animate-[fade-up_0.5s_ease-out_0.2s]   [animation-fill-mode:forwards]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl p-6">
                <h3 className="text-xl font-semibold">🌍 Real‑World Usage</h3>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>OSPF (Open Shortest Path First) – the most common IGP.</li>
                  <li>GPS devices (Google Maps, Waze) – real‑time shortest path with live traffic.</li>
                  <li>Network routing in data centres (ECMP based on equal costs).</li>
                  <li>Social networks (degrees of separation).</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl p-6">
                <h3 className="text-xl font-semibold">🧠 Pro Tips</h3>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Use a priority queue (binary heap) for O((V+E) log V) efficiency.</li>
                  <li>Remember: Dijkstra fails with negative weights – use Bellman‑Ford then.</li>
                  <li>In OSPF, each router runs Dijkstra on the same link‑state database.</li>
                  <li>Pre‑compute all‑pairs paths with Floyd‑Warshall only for small graphs.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SVG – Dijkstra step-by-step animation */}
          <section className="animate-[fade-up_0.5s_ease-out_0.3s] motion-safe:animate-[fade-up_0.5s_ease-out_0.3s]   [animation-fill-mode:forwards] bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">📡 Dijkstra’s Algorithm in Action</h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="800" height="400" viewBox="0 0 800 400" className="max-w-full h-auto">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                  </marker>
                </defs>
                {/* <!-- Nodes (routers) --> */}
                <circle cx="80" cy="200" r="28" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
                <text x="80" y="206" textAnchor="middle" fill="white" fontSize="14">A</text>
                <circle cx="260" cy="120" r="28" fill="#10b981" stroke="#064e3b" strokeWidth="2" />
                <text x="260" y="126" textAnchor="middle" fill="white" fontSize="14">B</text>
                <circle cx="400" cy="240" r="28" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                <text x="400" y="246" textAnchor="middle" fill="white" fontSize="14">C</text>
                <circle cx="560" cy="120" r="28" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
                <text x="560" y="126" textAnchor="middle" fill="white" fontSize="14">D</text>
                <circle cx="720" cy="200" r="28" fill="#8b5cf6" stroke="#4c1d95" strokeWidth="2" />
                <text x="720" y="206" textAnchor="middle" fill="white" fontSize="14">E</text>

                {/* <!-- Edges with weights --> */}
                <line x1="108" y1="200" x2="232" y2="120" stroke="#9ca3af" strokeWidth="3" marker-end="url(#arrowhead)" />
                <text x="160" y="145" fill="currentColor" fontSize="16" className="text-gray-700 dark:text-gray-300">4</text>
                <line x1="108" y1="200" x2="372" y2="240" stroke="#9ca3af" strokeWidth="3" marker-end="url(#arrowhead)" />
                <text x="220" y="230" fill="currentColor" fontSize="16">2</text>
                <line x1="288" y1="120" x2="372" y2="240" stroke="#9ca3af" strokeWidth="3" marker-end="url(#arrowhead)" />
                <text x="310" y="170" fill="currentColor" fontSize="16">1</text>
                <line x1="288" y1="120" x2="532" y2="120" stroke="#9ca3af" strokeWidth="3" marker-end="url(#arrowhead)" />
                <text x="400" y="105" fill="currentColor" fontSize="16">3</text>
                <line x1="428" y1="240" x2="532" y2="120" stroke="#9ca3af" strokeWidth="3" marker-end="url(#arrowhead)" />
                <text x="470" y="190" fill="currentColor" fontSize="16">5</text>
                <line x1="428" y1="240" x2="692" y2="200" stroke="#9ca3af" strokeWidth="3" marker-end="url(#arrowhead)" />
                <text x="560" y="230" fill="currentColor" fontSize="16">6</text>
                <line x1="588" y1="120" x2="692" y2="200" stroke="#9ca3af" strokeWidth="3" marker-end="url(#arrowhead)" />
                <text x="630" y="150" fill="currentColor" fontSize="16">2</text>

                {/* <!-- Animated packet exploring nodes (simple moving dot along the final shortest path A->B->C? Actually shortest from A to E: A->B->D->E cost 4+3+2=9? Let's compute: A->B(4), B->D(3), D->E(2) total 9; or A->C(2)+C->D(5)+D->E(2)=9 same; we'll show A->B->D->E) --> */}
                <path id="shortestPath" d="M108,200 L232,120 L532,120 L692,200" fill="none" stroke="none" />
                <circle r="6" fill="#ff0080" stroke="white" strokeWidth="1.5">
                  <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#shortestPath" />
                  </animateMotion>
                </circle>

                <text x="400" y="330" textAnchor="middle" fill="currentColor" fontSize="14" className="text-gray-700 dark:text-gray-300">
                  Shortest path from A to E: A → B → D → E (total cost = 9)
                </text>
                <text x="400" y="355" textAnchor="middle" fill="currentColor" fontSize="12" className="text-gray-500 dark:text-gray-400">
                  Each node maintains the lowest distance found so far; unvisited nodes are relaxed.
                </text>
              </svg>
            </div>
            <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
              Hover over an edge or node to see the cost — Dijkstra’s greedy method guarantees optimality.
            </p>
          </section>

          {/* Dijkstra Step Table */}
          <section className="animate-[fade-up_0.5s_ease-out_0.4s] motion-safe:animate-[fade-up_0.5s_ease-out_0.4s]   [animation-fill-mode:forwards]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">🔍 Dijkstra’s Algorithm Steps</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr><th className="px-4 py-2">Step</th><th>Current Node</th><th>Distances (A→...)</th><th>Visited Set</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr><td className="px-4 py-2">0</td><td>Start (A)</td><td>A:0, B:∞, C:∞, D:∞, E:∞</td><td>{}</td></tr>
                    <tr>
                        <td className="px-4 py-2">1</td>
                        <td>A</td><td>A:0, B:4, C:2, D:∞, E:∞</td>
                        <td>{`{A}`}</td></tr>
                    <tr><td className="px-4 py-2">2</td><td>C</td><td>A:0, B:3 (via C), C:2, D:7, E:∞</td><td>{`{A,C}`}</td></tr>
                    <tr><td className="px-4 py-2">3</td><td>B</td><td>A:0, B:3, C:2, D:6 (via B), E:∞</td><td>{`{A,C,B}`}</td></tr>
                    <tr><td className="px-4 py-2">4</td><td>D</td><td>A:0, B:3, C:2, D:6, E:8 (via D)</td><td>{`{A,C,B,D}`}</td></tr>
                    <tr><td className="px-4 py-2">5</td><td>E</td><td>A:0, B:3, C:2, D:6, E:8</td><td>All</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Pitfalls and Best Practices */}
          <section className="animate-[fade-up_0.5s_ease-out_0.5s] motion-safe:animate-[fade-up_0.5s_ease-out_0.5s]   [animation-fill-mode:forwards]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
                <ul className="list-disc ml-5 mt-2 space-y-2">
                  <li>Using Dijkstra with negative edge weights (gives wrong results).</li>
                  <li>Forgetting to mark nodes as visited → infinite loop.</li>
                  <li>Using a simple queue instead of a priority queue → O(V²) performance.</li>
                  <li>Assuming the graph is fully connected before running.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg p-6">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">✅ Best Practices</h3>
                <ul className="list-disc ml-5 mt-2 space-y-2">
                  <li>Always validate edge weights for non‑negativity.</li>
                  <li>Implement with a binary heap or Fibonacci heap for large graphs.</li>
                  <li>Test with small graphs manually (like the one above).</li>
                  <li>In network routing, use OSPF’s SPF algorithm which is Dijkstra with optimizations.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mini Checklist */}
          <div className="animate-[fade-up_0.5s_ease-out_0.6s] motion-safe:animate-[fade-up_0.5s_ease-out_0.6s]   [animation-fill-mode:forwards] bg-gray-100 dark:bg-gray-700/50 rounded-xl p-5">
            <h3 className="font-bold text-lg">📋 Checklist – Shortest Path</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <label><input type="checkbox" className="mr-2" /> Understand Dijkstra’s greedy strategy</label>
              <label><input type="checkbox" className="mr-2" /> Know the difference from Bellman‑Ford</label>
              <label><input type="checkbox" className="mr-2" /> Be able to trace the algorithm on paper</label>
              <label><input type="checkbox" className="mr-2" /> Explain why OSPF uses Dijkstra</label>
            </div>
          </div>

          {/* Hints */}
          <div className="animate-[fade-up_0.5s_ease-out_0.7s] motion-safe:animate-[fade-up_0.5s_ease-out_0.7s]   [animation-fill-mode:forwards] border-l-4 border-blue-400 pl-5 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-xl">
            <p className="italic">💭 Think about… Why does Dijkstra fail with negative edges? Try adding a negative edge in the SVG and observe what happens.</p>
            <p className="italic mt-2">✨ Observe carefully: In the distance table, when we relax edges, we only update if new distance is smaller.</p>
          </div>

          {/* FAQ */}
          <FAQTemplate title="Shortest Path Algorithms – FAQs" questions={questions} />

          {/* Teacher's Note */}
          <Teacher note="Dijkstra is like a methodical explorer: always expand the closest unvisited node. For routing in networks, costs can be configured (bandwidth, delay). Emphasise the link‑state database concept – every router has the same map before running Dijkstra. A great exercise: let students simulate the algorithm on a whiteboard with the classroom network topology." />
        </main>

        <style>{`
          @keyframes fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[fade-up_0\\.5s_ease-out\\],
            .animate-\\[fade-up_0\\.5s_ease-out_0\\.1s\\],
            .animate-\\[fade-up_0\\.5s_ease-out_0\\.2s\\],
            .animate-\\[fade-up_0\\.5s_ease-out_0\\.3s\\],
            .animate-\\[fade-up_0\\.5s_ease-out_0\\.4s\\],
            .animate-\\[fade-up_0\\.5s_ease-out_0\\.5s\\],
            .animate-\\[fade-up_0\\.5s_ease-out_0\\.6s\\],
            .animate-\\[fade-up_0\\.5s_ease-out_0\\.7s\\] {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}