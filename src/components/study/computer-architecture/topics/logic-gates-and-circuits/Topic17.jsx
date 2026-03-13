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

const Topic17 = () => {
  // Truth table for 1:4 demultiplexer
  const truthTable = [
    { S1: 0, S0: 0, Y0: 'D', Y1: 0, Y2: 0, Y3: 0 },
    { S1: 0, S0: 1, Y0: 0, Y1: 'D', Y2: 0, Y3: 0 },
    { S1: 1, S0: 0, Y0: 0, Y1: 0, Y2: 'D', Y3: 0 },
    { S1: 1, S0: 1, Y0: 0, Y1: 0, Y2: 0, Y3: 'D' },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">1:4 Demultiplexer</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Routes a single data input to one of four output lines based on two select lines.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> demux_1to4(S1, S0, D) → (Y0, Y1, Y2, Y3)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> D (data), S1, S0 (select)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Y0, Y1, Y2, Y3 (data outputs)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Distribute a single signal to one of four destinations.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In data routing, memory chip selection, and as a building block for larger demultiplexers or decoders.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 1:4 Demultiplexer Circuit</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 450 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Data input */}
              <line x1="20" y1="150" x2="60" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="155" fill="currentColor" fontSize="14" fontWeight="bold">D</text>

              {/* Select lines and inverters */}
              <line x1="40" y1="220" x2="40" y2="250" stroke="currentColor" strokeWidth="2" />
              <text x="25" y="265" fill="currentColor" fontSize="12">S0</text>
              <circle cx="50" cy="235" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="55" y1="235" x2="75" y2="235" stroke="currentColor" strokeWidth="2" />

              <line x1="100" y1="220" x2="100" y2="250" stroke="currentColor" strokeWidth="2" />
              <text x="85" y="265" fill="currentColor" fontSize="12">S1</text>
              <circle cx="110" cy="235" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="115" y1="235" x2="135" y2="235" stroke="currentColor" strokeWidth="2" />

              {/* AND gates for each output */}
              {/* Y0: S1'·S0'·D */}
              <path d="M150 40 L180 40 Q190 40 190 55 Q190 70 180 70 L150 70 L150 40" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="60" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="60" y1="150" x2="150" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* D to all ANDs */}
              <line x1="75" y1="235" x2="170" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0' to Y0 */}
              <line x1="135" y1="235" x2="170" y2="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1' to Y0 */}
              <line x1="190" y1="55" x2="230" y2="55" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="60" fill="currentColor" fontSize="14" fontWeight="bold">Y0</text>

              {/* Y1: S1'·S0·D */}
              <path d="M150 100 L180 100 Q190 100 190 115 Q190 130 180 130 L150 130 L150 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="120" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="40" y1="235" x2="170" y2="115" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0 to Y1 */}
              <line x1="135" y1="235" x2="170" y2="105" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1' to Y1 */}
              <line x1="190" y1="115" x2="230" y2="115" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="120" fill="currentColor" fontSize="14" fontWeight="bold">Y1</text>

              {/* Y2: S1·S0'·D */}
              <path d="M150 160 L180 160 Q190 160 190 175 Q190 190 180 190 L150 190 L150 160" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="180" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="75" y1="235" x2="170" y2="175" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0' to Y2 */}
              <line x1="100" y1="235" x2="170" y2="165" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1 to Y2 */}
              <line x1="190" y1="175" x2="230" y2="175" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="180" fill="currentColor" fontSize="14" fontWeight="bold">Y2</text>

              {/* Y3: S1·S0·D */}
              <path d="M150 220 L180 220 Q190 220 190 235 Q190 250 180 250 L150 250 L150 220" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="240" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="40" y1="235" x2="170" y2="235" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0 to Y3 */}
              <line x1="100" y1="235" x2="170" y2="225" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1 to Y3 */}
              <line x1="190" y1="235" x2="230" y2="235" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="240" fill="currentColor" fontSize="14" fontWeight="bold">Y3</text>

              {/* D connection vertical line */}
              <line x1="60" y1="150" x2="60" y2="240" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            A 1:4 demultiplexer built with four AND gates and two inverters. The select lines (S1,S0) enable exactly one AND gate, passing D to the corresponding output.
          </p>
        </div>
      </section>

      {/* Logic Symbol */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔣 Logic Symbol</h2>
        <div className="flex justify-center">
          <div className="w-72 h-48 group">
            <svg viewBox="0 0 250 150" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Trapezoid DEMUX symbol */}
              <polygon points="110,20 200,20 200,130 110,130 80,75" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="150" y="80" fill="currentColor" fontSize="18" textAnchor="middle">DEMUX</text>
              <text x="150" y="105" fill="currentColor" fontSize="14" textAnchor="middle">1:4</text>
              
              {/* Data input */}
              <line x1="40" y1="75" x2="80" y2="75" stroke="currentColor" strokeWidth="2" />
              <text x="25" y="80" fill="currentColor" fontSize="12">D</text>
              
              {/* Select lines */}
              <line x1="150" y1="130" x2="150" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="155" fill="currentColor" fontSize="12">S0</text>
              <line x1="120" y1="130" x2="120" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="95" y="155" fill="currentColor" fontSize="12">S1</text>
              
              {/* Outputs */}
              <line x1="200" y1="40" x2="240" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="250" y="45" fill="currentColor" fontSize="12">Y0</text>
              <line x1="200" y1="70" x2="240" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="250" y="75" fill="currentColor" fontSize="12">Y1</text>
              <line x1="200" y1="100" x2="240" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="250" y="105" fill="currentColor" fontSize="12">Y2</text>
              <line x1="200" y1="130" x2="240" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="250" y="135" fill="currentColor" fontSize="12">Y3</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-center">Standard symbol for a 1:4 demultiplexer.</p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-purple-300">S1</th>
                <th className="py-2 px-2 text-purple-300">S0</th>
                <th className="py-2 px-2 text-purple-300">Y0</th>
                <th className="py-2 px-2 text-purple-300">Y1</th>
                <th className="py-2 px-2 text-purple-300">Y2</th>
                <th className="py-2 px-2 text-purple-300">Y3</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-2">{row.S1}</td>
                  <td className="py-1 px-2">{row.S0}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y0}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y1}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y2}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The binary number formed by (S1 S0) determines which output receives the data D; all other outputs are 0.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-lg text-center">
            Y0 = S1'·S0'·D<br />
            Y1 = S1'·S0·D<br />
            Y2 = S1·S0'·D<br />
            Y3 = S1·S0·D
          </p>
          <p className="text-gray-300 mt-2 text-center">
            Each output is the AND of D with the corresponding minterm of the select lines.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          A 1:4 demultiplexer is widely used in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Memory chip selection:</strong> In a 4-bank memory system, a 1:4 DEMUX routes the write data to the selected bank.</li>
          <li><strong>Data distribution:</strong> A single serial data stream can be demultiplexed into four parallel channels for processing.</li>
          <li><strong>LED matrix control:</strong> Drive one of four rows in an LED matrix using a DEMUX with a common data line.</li>
          <li><strong>As a decoder:</strong> With D fixed to 1, the 1:4 DEMUX becomes a 2-to-4 line decoder.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Barrackpore lab, students use a 74139 dual 1:4 demultiplexer to route a clock signal to one of four counters, observing which counter increments based on the select lines.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many AND gates are needed for a 1:4 DEMUX? (4 AND gates, plus 2 inverters for the select lines.)</li>
          <li>Observe carefully: The Boolean expressions are exactly the minterms of S1,S0 multiplied by D.</li>
          <li>Try building a 1:4 DEMUX using two 1:2 DEMUXes in a tree. (First stage selects between Y0/Y1 and Y2/Y3; second stage selects within each pair.)</li>
          <li>What happens if you tie D to VCC? (The circuit becomes a 2-to-4 line decoder with active-high outputs.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing S1 and S0 order:</strong> The mapping of select bits to output numbers must be consistent; typically S1 is MSB, S0 LSB.</li>
          <li><strong>Both outputs active simultaneously:</strong> In a correctly designed DEMUX, only one output should be active (equal to D) at any time.</li>
          <li><strong>Forgetting inverters:</strong> The AND gates need both true and complemented forms of select lines.</li>
          <li><strong>Leaving unused outputs unconnected:</strong> While allowed, it's good practice to terminate them to avoid noise.</li>
          <li><strong>Overloading the data input:</strong> D drives four AND gates; ensure the source can handle the fan-out.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Clearly label select lines with their weights (S0 LSB, S1 MSB) on schematics.</li>
          <li>Use the standard trapezoid symbol for demultiplexers.</li>
          <li>Test the circuit with all combinations of S1,S0 and D=0 and D=1 to verify correct routing.</li>
          <li>When cascading, buffer the data input to drive multiple stages.</li>
          <li>In VHDL/Verilog, use a 'with/select' or 'case' statement for clarity.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using as a decoder:</strong> With D=1, the 1:4 DEMUX becomes a 2-to-4 line decoder, useful for address decoding.</li>
          <li><strong>Tree structure:</strong> Larger demultiplexers (1:8, 1:16) can be built from 1:4 DEMUXes in a tree, reducing the number of gates.</li>
          <li><strong>IC packages:</strong> The 74139 contains two independent 1:4 demultiplexers with common enables, ideal for compact designs.</li>
          <li><strong>Power saving:</strong> Only one output switches; others are static, so power is relatively low.</li>
          <li><strong>Glitch avoidance:</strong> Ensure select lines change only when D is stable to avoid glitches on outputs.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the 1:4 demultiplexer operation: D routed to Y0 when S1S0=00, to Y1 when 01, to Y2 when 10, to Y3 when 11.</li>
          <li>I can write the Boolean expressions: Y0 = S1'·S0'·D, Y1 = S1'·S0·D, Y2 = S1·S0'·D, Y3 = S1·S0·D.</li>
          <li>I can draw the circuit using inverters and four AND gates.</li>
          <li>I know how to build a 1:4 DEMUX from 1:2 DEMUXes.</li>
          <li>I can use a 1:4 DEMUX as a building block for larger demultiplexers or as a decoder.</li>
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
          “The 1:4 demultiplexer is a natural extension of the 1:2 version and a great way to introduce the concept of minterms in hardware. I challenge my students in Shyamnagar to build it using discrete gates on a breadboard – they quickly see the pattern of AND gates and inverters. Then we explore its alter ego as a decoder by tying D to VCC. This dual nature is a powerful idea: the same hardware can serve different purposes depending on how we use the inputs. It also sets the stage for understanding memory address decoding and data distribution in microprocessors.”
        </p>
      </section>
    </div>
  );
};

export default Topic17;