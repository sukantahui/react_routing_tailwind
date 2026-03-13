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

const Topic12 = () => {
  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Cascading Multiplexers</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Combining smaller multiplexers to build larger ones – a hierarchical approach to data selection.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is Cascading?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Definition:</span> Using multiple multiplexer ICs (or gates) in a tree structure to create a larger multiplexer.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Example:</span> Three 2:1 MUXes can form a 4:1 MUX; two 4:1 MUXes + a 2:1 MUX form an 8:1 MUX, etc.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> To expand the number of selectable inputs beyond what a single IC provides, or to implement using only NAND gates (universal).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In FPGA architectures, large data routers, and when only smaller multiplexers are available.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram: 4:1 from three 2:1 MUXes */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 4:1 MUX using three 2:1 MUXes</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl group">
            <svg viewBox="0 0 500 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* First stage MUXes */}
              <rect x="50" y="40" width="80" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="90" y="70" fill="currentColor" fontSize="12" textAnchor="middle">2:1</text>
              <text x="90" y="85" fill="currentColor" fontSize="10" textAnchor="middle">MUX</text>
              
              <rect x="50" y="140" width="80" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="90" y="170" fill="currentColor" fontSize="12" textAnchor="middle">2:1</text>
              <text x="90" y="185" fill="currentColor" fontSize="10" textAnchor="middle">MUX</text>

              {/* Second stage MUX */}
              <rect x="250" y="90" width="80" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="120" fill="currentColor" fontSize="12" textAnchor="middle">2:1</text>
              <text x="290" y="135" fill="currentColor" fontSize="10" textAnchor="middle">MUX</text>

              {/* Data inputs */}
              <line x1="10" y1="55" x2="50" y2="55" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="60" fill="currentColor" fontSize="10">I0</text>
              <line x1="10" y1="75" x2="50" y2="75" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="80" fill="currentColor" fontSize="10">I1</text>

              <line x1="10" y1="155" x2="50" y2="155" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="160" fill="currentColor" fontSize="10">I2</text>
              <line x1="10" y1="175" x2="50" y2="175" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="180" fill="currentColor" fontSize="10">I3</text>

              {/* Select lines */}
              <line x1="90" y1="100" x2="90" y2="120" stroke="currentColor" strokeWidth="2" />
              <line x1="90" y1="200" x2="90" y2="220" stroke="currentColor" strokeWidth="2" />
              <text x="100" y="230" fill="currentColor" fontSize="12">S0</text>

              <line x1="290" y1="150" x2="290" y2="180" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="190" fill="currentColor" fontSize="12">S1</text>

              {/* Connections */}
              <line x1="130" y1="70" x2="250" y2="110" stroke="currentColor" strokeWidth="2" />
              <line x1="130" y1="170" x2="250" y2="130" stroke="currentColor" strokeWidth="2" />
              
              {/* Output */}
              <line x1="330" y1="120" x2="380" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="390" y="125" fill="currentColor" fontSize="14" fontWeight="bold">Y</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            A 4:1 multiplexer built from three 2:1 multiplexers. The first stage uses S0 to select between I0/I1 and I2/I3; the second stage uses S1 to choose between the two stage outputs.
          </p>
        </div>
      </section>

      {/* General Tree Structure */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌳 General Tree Structure</h2>
        <p className="text-gray-300 mb-4">
          Any N:1 multiplexer can be built using a binary tree of 2:1 multiplexers. The number of 2:1 MUXes required is N-1. For example:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>4:1 MUX requires 3 two-input MUXes.</li>
          <li>8:1 MUX requires 7 two-input MUXes (or two 4:1 + one 2:1).</li>
          <li>16:1 MUX requires 15 two-input MUXes (or two 8:1 + one 2:1, etc.).</li>
        </ul>
        <p className="text-gray-300 mt-4">
          The select lines are arranged hierarchically: the least significant select bit often controls the first stage, and more significant bits control later stages.
        </p>
      </section>

      {/* Boolean Expression for Cascaded Structure */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expression (4:1 cascaded)</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            Y = S1'·(S0'·I0 + S0·I1) + S1·(S0'·I2 + S0·I3)
          </p>
          <p className="text-gray-300 mt-2 text-center">
            This matches the standard 4:1 expression but shows the hierarchical structure.
          </p>
        </div>
      </section>

      {/* Truth Table for 4:1 (reference) */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (4:1 MUX)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">S1</th>
                <th className="py-2 px-4 text-purple-300">S0</th>
                <th className="py-2 px-4 text-purple-300">Y</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0</td><td>0</td><td>I0</td></tr>
              <tr><td>0</td><td>1</td><td>I1</td></tr>
              <tr><td>1</td><td>0</td><td>I2</td></tr>
              <tr><td>1</td><td>1</td><td>I3</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Cascading multiplexers is fundamental in digital design:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>FPGA architectures:</strong> Look-up tables (LUTs) are often implemented as cascaded multiplexers.</li>
          <li><strong>Large data routers:</strong> In networking switches, huge multiplexers route packets from many sources to destinations.</li>
          <li><strong>Microprocessor register files:</strong> Selecting one of many registers often uses a tree of multiplexers.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Shyamnagar lab, students build an 8:1 MUX using two 4:1 MUX ICs (74153) and a 2:1 MUX (74157) to understand hierarchical design.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How would you build an 8:1 MUX from 2:1 MUXes? (A three-level tree.)</li>
          <li>Observe carefully: In the tree, the total delay equals the number of stages × delay per MUX – critical for high-speed design.</li>
          <li>Try drawing a 16:1 MUX using 4:1 MUXes as building blocks. How many levels?</li>
          <li>Why might you choose a tree structure over a single large decoder+AND-OR implementation? (Modularity, using available ICs.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Incorrect select line order:</strong> Connecting S0 to the second stage instead of the first will cause wrong mapping.</li>
          <li><strong>Not buffering select lines:</strong> In large trees, the fan-out can be high; select lines may need buffers.</li>
          <li><strong>Ignoring propagation delay:</strong> The accumulated delay can cause timing issues; consider pipelining if needed.</li>
          <li><strong>Using the wrong MUX type:</strong> Some MUXes have active-low enables; ensure they are properly controlled.</li>
          <li><strong>Leaving unused inputs floating:</strong> In intermediate stages, unused inputs must be tied to GND or VCC.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Draw a clear block diagram showing all interconnections.</li>
          <li>Label select lines with their significance (e.g., S0 LSB, S1, etc.).</li>
          <li>Simulate the cascaded design before hardware implementation.</li>
          <li>Use decoupling capacitors near each IC in physical circuits.</li>
          <li>Consider using a single larger MUX IC if available to save space and power.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Balanced tree:</strong> For minimum delay, keep the tree balanced (equal number of stages to all inputs).</li>
          <li><strong>Using enable pins:</strong> Enable pins can be used to build even larger trees without extra gates.</li>
          <li><strong>Glitch reduction:</strong> Ensure select lines change synchronously to avoid glitches in intermediate outputs.</li>
          <li><strong>In VHDL/Verilog:</strong> Cascading is implicit when you use a 'case' statement; synthesis tools generate the optimal tree.</li>
          <li><strong>Power optimization:</strong> In CMOS, a tree of transmission gates is often more power-efficient than a decoder-based design.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand that N-1 two-input MUXes are needed for an N:1 MUX.</li>
          <li>I can draw the tree structure for a 4:1 and an 8:1 MUX.</li>
          <li>I know how select lines are assigned in a cascaded design.</li>
          <li>I am aware of the delay accumulation and its impact on performance.</li>
          <li>I can use cascading to build multiplexers of any size from available smaller ones.</li>
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
          “Cascading multiplexers is a beautiful illustration of the divide-and-conquer approach in digital design. In my Barrackpore classes, we start with a 4:1 MUX built from 2:1 MUXes using discrete gates, then move to 8:1 with two 4:1 ICs and a 2:1. Students from Ichapur enjoy the puzzle of connecting the select lines correctly. I always emphasize that the same principle applies in software – building complex functions from simpler ones. This topic solidifies their understanding of hierarchy and prepares them for larger systems like ALUs and CPUs.”
        </p>
      </section>
    </div>
  );
};

export default Topic12;