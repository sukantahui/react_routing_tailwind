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

const Topic16 = () => {
  // Truth table for 1:2 demultiplexer
  const truthTable = [
    { S: 0, Y0: 'D', Y1: 0 },
    { S: 1, Y0: 0, Y1: 'D' },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">1:2 Demultiplexer</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          The simplest demultiplexer – routes a single data input to one of two output lines based on a select line.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> demux_1to2(S, D) → (Y0, Y1)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> D (data), S (select)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Y0, Y1 (data outputs)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Distribute a single signal to one of two destinations.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> As a building block for larger demultiplexers, in data routing, and as a basic selector.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 1:2 Demultiplexer Circuit</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* SVG Circuit */}
          <div className="w-80 h-56 group">
            <svg viewBox="0 0 300 180" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Data input */}
              <line x1="20" y1="90" x2="60" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="95" fill="currentColor" fontSize="14" fontWeight="bold">D</text>

              {/* Select line */}
              <line x1="20" y1="140" x2="60" y2="140" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="145" fill="currentColor" fontSize="14" fontWeight="bold">S</text>

              {/* Inverter for S */}
              <circle cx="75" cy="140" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="140" x2="70" y2="140" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="140" x2="100" y2="140" stroke="currentColor" strokeWidth="2" />

              {/* AND gate for Y0 (S'·D) */}
              <path d="M120 60 L150 60 Q160 60 160 75 Q160 90 150 90 L120 90 L120 60" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="140" y="80" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="60" y1="90" x2="120" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* D to AND0 */}
              <line x1="100" y1="140" x2="140" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S' to AND0 */}
              <line x1="160" y1="75" x2="200" y2="75" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="80" fill="currentColor" fontSize="14" fontWeight="bold">Y0</text>

              {/* AND gate for Y1 (S·D) */}
              <path d="M120 110 L150 110 Q160 110 160 125 Q160 140 150 140 L120 140 L120 110" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="140" y="130" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="60" y1="90" x2="120" y2="125" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* D to AND1 */}
              <line x1="60" y1="140" x2="140" y2="125" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S to AND1 */}
              <line x1="160" y1="125" x2="200" y2="125" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="130" fill="currentColor" fontSize="14" fontWeight="bold">Y1</text>
            </svg>
          </div>

          {/* Boolean expressions */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Boolean Expressions</h3>
            <p className="font-mono text-green-400 text-xl">Y0 = S'·D</p>
            <p className="font-mono text-green-400 text-xl">Y1 = S·D</p>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The circuit uses an inverter, two AND gates. When S=0, Y0 = D; when S=1, Y1 = D.
        </p>
      </section>

      {/* Logic Symbol */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔣 Logic Symbol</h2>
        <div className="flex justify-center">
          <div className="w-64 h-40 group">
            <svg viewBox="0 0 200 120" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Trapezoid DEMUX symbol */}
              <polygon points="100,20 180,20 180,100 100,100 80,60" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="140" y="60" fill="currentColor" fontSize="16" textAnchor="middle">DEMUX</text>
              <text x="140" y="80" fill="currentColor" fontSize="12" textAnchor="middle">1:2</text>
              
              {/* Data input */}
              <line x1="40" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="25" y="65" fill="currentColor" fontSize="12">D</text>
              
              {/* Select line */}
              <line x1="140" y1="100" x2="140" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="160" y="115" fill="currentColor" fontSize="12">S</text>
              
              {/* Outputs */}
              <line x1="180" y1="40" x2="220" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="230" y="45" fill="currentColor" fontSize="12">Y0</text>
              <line x1="180" y1="80" x2="220" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="230" y="85" fill="currentColor" fontSize="12">Y1</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-center">Standard symbol for a 1:2 demultiplexer.</p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-sm mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">S</th>
                <th className="py-2 px-4 text-purple-300">Y0</th>
                <th className="py-2 px-4 text-purple-300">Y1</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.S}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Y0}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Y1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          When S=0, Y0 = D and Y1 = 0; when S=1, Y1 = D and Y0 = 0.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          A 1:2 demultiplexer appears in many simple systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>LED selection:</strong> A single square wave can be directed to one of two LEDs based on a switch (S).</li>
          <li><strong>Data routing:</strong> In a simple microcontroller, a 1:2 DEMUX can route a serial data stream to one of two peripherals.</li>
          <li><strong>Memory chip select:</strong> Use the DEMUX to enable one of two memory chips by connecting D to the chip enable and using S to select the chip.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build a 1:2 DEMUX on a breadboard and watch as a pulse alternates between two LEDs by toggling the select switch.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How does this circuit relate to a 2:1 multiplexer? (They are inverses – MUX combines, DEMUX splits.)</li>
          <li>Observe carefully: The Boolean expressions are exactly the minterms multiplied by D.</li>
          <li>Try drawing the circuit using only NAND gates. (Hint: AND + inverter can be built from NANDs.)</li>
          <li>What happens if D is connected to VCC (logic 1)? (The outputs become Y0 = S', Y1 = S – a simple decoder.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing with multiplexer:</strong> Remember DEMUX has one input and many outputs, MUX has many inputs and one output.</li>
          <li><strong>Both outputs active simultaneously:</strong> In a correctly designed DEMUX, only one output should be active (equal to D) at any time; the other is 0.</li>
          <li><strong>Incorrect connection of inverter:</strong> Forgetting the inverter on one AND gate will cause the wrong output to be active.</li>
          <li><strong>Leaving unused outputs unconnected:</strong> While allowed, it's good practice to terminate them to avoid noise.</li>
          <li><strong>Overloading the data input:</strong> D drives two AND gates; ensure the source can handle the fan-out.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Clearly label inputs and outputs on schematics: D, S, Y0, Y1.</li>
          <li>Use the standard trapezoid symbol for demultiplexers.</li>
          <li>Test the circuit with all combinations of S and D (D=0 and D=1) to verify correct routing.</li>
          <li>When cascading, ensure that the data input is buffered if it drives many gates.</li>
          <li>In VHDL/Verilog, use a conditional assignment: <span className="font-mono">Y0 &lt;= D when S='0' else '0'; Y1 &lt;= D when S='1' else '0';</span></li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using as a decoder:</strong> With D=1, the 1:2 DEMUX becomes a 1-of-2 decoder (or a 2-line to 4-line decoder with an enable).</li>
          <li><strong>Building larger DEMUXes:</strong> A 1:4 DEMUX can be built from three 1:2 DEMUXes in a tree structure.</li>
          <li><strong>IC packages:</strong> The 74139 is a dual 1:4 demultiplexer, but a single 1:2 DEMUX is often built from a 7404 (inverter) and 7408 (AND).</li>
          <li><strong>Power saving:</strong> Since only one output switches, power consumption is minimal.</li>
          <li><strong>Glitch avoidance:</strong> Ensure the select line changes only when D is stable to avoid glitches on outputs.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the 1:2 demultiplexer operation: D routed to Y0 when S=0, to Y1 when S=1.</li>
          <li>I can write the Boolean expressions: Y0 = S'·D, Y1 = S·D.</li>
          <li>I can draw the circuit using an inverter and two AND gates.</li>
          <li>I know how to build a 1:2 DEMUX from NAND gates (universal).</li>
          <li>I can use a 1:2 DEMUX as a building block for larger demultiplexers.</li>
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
          “The 1:2 demultiplexer is the perfect introduction to data distribution. I like to use the analogy of a railway switch: the incoming train (D) can go to either track Y0 or Y1, and the switch (S) determines which. In our Naihati lab, students build this circuit with a 7404 inverter and a 7408 AND gate, then watch an LED light up depending on the switch. It's a simple but satisfying experiment that builds intuition for more complex demultiplexers and decoders. Emphasize that this is the inverse of the 2:1 multiplexer – a concept that will reappear throughout digital design.”
        </p>
      </section>
    </div>
  );
};

export default Topic16;