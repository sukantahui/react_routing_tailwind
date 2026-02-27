import React from 'react';
import clsx from 'clsx';

// Inline keyframes for fade + slide-up animation
const animationStyles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;

const Topic14 = () => {
  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Multiplexer Trees</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Hierarchical structures of multiplexers used to build large selectors efficiently and to implement multi-level logic.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What are Multiplexer Trees?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Definition:</span> A network of multiplexers arranged in a tree-like hierarchy where the outputs of lower-level MUXes become inputs to higher-level MUXes.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> To build larger multiplexers from smaller ones, to implement complex logic functions, and to reduce wiring congestion.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In VLSI design, FPGA architectures, data routers, and any system requiring large-scale data selection.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Key idea:</span> Recursive decomposition – an N:1 MUX can be built from two (N/2):1 MUXes and a 2:1 MUX.</p>
          </div>
        </div>
      </section>

      {/* Binary Tree Structure */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌳 Binary Tree Structure</h2>
        <p className="text-gray-300 mb-4">
          The most common multiplexer tree is a binary tree. For an 8:1 MUX, we can use a three-level tree of 2:1 MUXes.
        </p>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl group">
            <svg viewBox="0 0 500 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Level 1 (inputs) */}
              <rect x="20" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="50" y="45" fill="currentColor" fontSize="10" textAnchor="middle">I0</text>
              <rect x="20" y="80" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="50" y="105" fill="currentColor" fontSize="10" textAnchor="middle">I1</text>
              
              <rect x="120" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="150" y="45" fill="currentColor" fontSize="10" textAnchor="middle">I2</text>
              <rect x="120" y="80" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="150" y="105" fill="currentColor" fontSize="10" textAnchor="middle">I3</text>

              <rect x="220" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="250" y="45" fill="currentColor" fontSize="10" textAnchor="middle">I4</text>
              <rect x="220" y="80" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="250" y="105" fill="currentColor" fontSize="10" textAnchor="middle">I5</text>

              <rect x="320" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="350" y="45" fill="currentColor" fontSize="10" textAnchor="middle">I6</text>
              <rect x="320" y="80" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="350" y="105" fill="currentColor" fontSize="10" textAnchor="middle">I7</text>

              {/* Level 2 (first stage 2:1 MUXes) */}
              <rect x="50" y="140" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="80" y="165" fill="currentColor" fontSize="10" textAnchor="middle">2:1</text>
              <rect x="150" y="140" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="180" y="165" fill="currentColor" fontSize="10" textAnchor="middle">2:1</text>
              <rect x="250" y="140" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="280" y="165" fill="currentColor" fontSize="10" textAnchor="middle">2:1</text>
              <rect x="350" y="140" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="380" y="165" fill="currentColor" fontSize="10" textAnchor="middle">2:1</text>

              {/* Connections: input pairs to first stage */}
              <line x1="50" y1="60" x2="80" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="50" y1="120" x2="80" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="150" y1="60" x2="180" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="150" y1="120" x2="180" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="250" y1="60" x2="280" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="250" y1="120" x2="280" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="350" y1="60" x2="380" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="350" y1="120" x2="380" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />

              {/* Level 3 (second stage) */}
              <rect x="140" y="200" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="170" y="225" fill="currentColor" fontSize="10" textAnchor="middle">2:1</text>
              <rect x="260" y="200" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="290" y="225" fill="currentColor" fontSize="10" textAnchor="middle">2:1</text>

              {/* Connections from first stage to second stage */}
              <line x1="110" y1="160" x2="170" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="210" y1="160" x2="170" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="310" y1="160" x2="290" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="410" y1="160" x2="290" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />

              {/* Level 4 (third stage) */}
              <rect x="200" y="260" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="230" y="285" fill="currentColor" fontSize="10" textAnchor="middle">2:1</text>

              {/* Connections from second stage to third stage */}
              <line x1="200" y1="220" x2="230" y2="260" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />
              <line x1="320" y1="220" x2="260" y2="260" stroke="currentColor" strokeWidth="1" strokeDasharray="2" />

              {/* Final output */}
              <line x1="260" y1="280" x2="300" y2="280" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="285" fill="currentColor" fontSize="14" fontWeight="bold">Y</text>

              {/* Select lines (simplified) */}
              <text x="20" y="280" fill="currentColor" fontSize="10">S0 controls level 1</text>
              <text x="20" y="260" fill="currentColor" fontSize="10">S1 controls level 2</text>
              <text x="20" y="240" fill="currentColor" fontSize="10">S2 controls level 3</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            An 8:1 multiplexer built as a binary tree of 2:1 MUXes. Each level uses one select line.
          </p>
        </div>
      </section>

      {/* Mathematical Representation */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Recursive Formula</h2>
        <p className="text-gray-300 mb-4">
          An N:1 multiplexer (where N is a power of two) can be expressed recursively:
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 text-center">
          <p className="font-mono text-green-400 text-xl">
            MUX<sub>N</sub>(I<sub>0..N-1</sub>, S<sub>0..k-1</sub>) = <br />
            S<sub>k-1</sub>' · MUX<sub>N/2</sub>(I<sub>0..N/2-1</sub>, S<sub>0..k-2</sub>) + <br />
            S<sub>k-1</sub> · MUX<sub>N/2</sub>(I<sub>N/2..N-1</sub>, S<sub>0..k-2</sub>)
          </p>
          <p className="text-gray-300 mt-2">where k = log₂(N). This is exactly a binary tree.</p>
        </div>
      </section>

      {/* Tree Types */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌲 Types of Multiplexer Trees</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Binary tree:</strong> Each node is a 2:1 MUX; balanced, uniform delay.</li>
          <li><strong>Quaternary tree:</strong> Uses 4:1 MUXes as nodes; fewer levels, faster but wider.</li>
          <li><strong>Mixed tree:</strong> Combines different MUX sizes to optimize area/delay trade-offs.</li>
          <li><strong>Incomplete tree:</strong> For N not a power of two, some inputs may be tied off.</li>
        </ul>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Multiplexer trees are fundamental in modern digital design:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>FPGA Look-Up Tables (LUTs):</strong> A 4-input LUT is essentially a 16:1 multiplexer tree with SRAM cells at the leaves.</li>
          <li><strong>High-speed routers:</strong> Packet switches use huge multiplexer trees to route data from many input ports to output ports.</li>
          <li><strong>CPU register files:</strong> Selecting one of many registers often uses a decoder followed by a multiplexer tree.</li>
          <li><strong>Telecom cross-connects:</strong> Large-scale switching fabrics are built as trees of smaller switches.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build a 16:1 multiplexer using a tree of 4:1 MUX ICs to understand hierarchical design and delay accumulation.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many levels are needed for a 64:1 multiplexer using 2:1 MUXes? (log₂64 = 6 levels.)</li>
          <li>Observe carefully: In a binary tree, the path from any input to the output goes through the same number of MUXes – balanced delay.</li>
          <li>Try designing a 32:1 MUX using a mix of 4:1 and 2:1 MUXes. How many levels?</li>
          <li>What is the advantage of using higher-radix MUXes (e.g., 4:1) in a tree? (Fewer levels, lower delay but wider interconnects.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Unbalanced tree:</strong> Different path delays can cause timing hazards (glitches).</li>
          <li><strong>Incorrect select line assignment:</strong> The MSB should control the top level, LSB the bottom level.</li>
          <li><strong>Fan-out issues:</strong> Select lines may need buffering to drive many MUXes in parallel.</li>
          <li><strong>Ignoring propagation delay:</strong> The total delay is the sum of delays through each level; critical for high-speed design.</li>
          <li><strong>Power dissipation:</strong> Large trees consume dynamic power; consider clock gating or enable controls.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Draw a clear hierarchical block diagram showing each level.</li>
          <li>Label select lines with their bit significance.</li>
          <li>Simulate the tree to verify correct selection and timing.</li>
          <li>Buffer select lines if fan-out exceeds the drive capability.</li>
          <li>Consider pipelining for very deep trees to improve throughput.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Use higher-radix MUXes</strong> to reduce depth and delay (e.g., 4:1 or 8:1 MUXes as building blocks).</li>
          <li><strong>In CMOS VLSI,</strong> transmission-gate MUX trees are compact and fast; but careful sizing is needed to avoid signal degradation.</li>
          <li><strong>For FPGAs,</strong> synthesis tools automatically optimize the tree structure; you can guide them with constraints.</li>
          <li><strong>Power optimization:</strong> Disable unused branches via enable pins to reduce switching activity.</li>
          <li><strong>Glitch reduction:</strong> Ensure select lines change synchronously and consider adding output registers.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand that an N:1 MUX can be built recursively from smaller MUXes.</li>
          <li>I can draw a binary tree for an 8:1 MUX.</li>
          <li>I know how select lines are assigned in a tree.</li>
          <li>I am aware of the delay vs. area trade-offs with different tree structures.</li>
          <li>I can apply multiplexer trees to implement large selection functions efficiently.</li>
        </ul>
      </section>

      {/* Teacher's Note */}
      <section className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-2 flex items-center gap-2">
          👩‍🏫 Teacher's Note
        </h2>
        <p className="text-gray-200 mb-3">
          <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in | mobile: 7003756860) has 27 years of experience teaching programming, RDBMS, operating systems, and web development.
        </p>
        <p className="text-gray-300 italic">
          “Multiplexer trees beautifully illustrate the concept of recursion in hardware. I encourage students from Barrackpore to think of it as a tournament bracket – the select lines decide which input 'wins' at each round. We build a physical tree using 2:1 MUX ICs and watch the signal propagate. It's also a great lead-in to understanding how FPGAs work internally. The key takeaway: any large multiplexer is just a tree of smaller ones, and the same recursive thinking applies to many other digital structures like decoders and adders.”
        </p>
      </section>
    </div>
  );
};

export default Topic14;