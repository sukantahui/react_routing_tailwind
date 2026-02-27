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

const Topic18 = () => {
  // Truth table for 1:8 demultiplexer (simplified representation)
  // S2,S1,S0 select one of eight outputs
  const truthTableRows = [
    { S2:0, S1:0, S0:0, Y0:'D', Y1:0, Y2:0, Y3:0, Y4:0, Y5:0, Y6:0, Y7:0 },
    { S2:0, S1:0, S0:1, Y0:0, Y1:'D', Y2:0, Y3:0, Y4:0, Y5:0, Y6:0, Y7:0 },
    { S2:0, S1:1, S0:0, Y0:0, Y1:0, Y2:'D', Y3:0, Y4:0, Y5:0, Y6:0, Y7:0 },
    { S2:0, S1:1, S0:1, Y0:0, Y1:0, Y2:0, Y3:'D', Y4:0, Y5:0, Y6:0, Y7:0 },
    { S2:1, S1:0, S0:0, Y0:0, Y1:0, Y2:0, Y3:0, Y4:'D', Y5:0, Y6:0, Y7:0 },
    { S2:1, S1:0, S0:1, Y0:0, Y1:0, Y2:0, Y3:0, Y4:0, Y5:'D', Y6:0, Y7:0 },
    { S2:1, S1:1, S0:0, Y0:0, Y1:0, Y2:0, Y3:0, Y4:0, Y5:0, Y6:'D', Y7:0 },
    { S2:1, S1:1, S0:1, Y0:0, Y1:0, Y2:0, Y3:0, Y4:0, Y5:0, Y6:0, Y7:'D' },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">1:8 Demultiplexer</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Routes a single data input to one of eight output lines based on three select lines.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> demux_1to8(S2, S1, S0, D) → (Y0, Y1, Y2, Y3, Y4, Y5, Y6, Y7)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> D (data), S2, S1, S0 (select)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Y0–Y7 (data outputs)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Distribute a single signal to one of eight destinations.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In data routing, memory chip selection, display multiplexing, and as a building block for larger demultiplexers or decoders.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 1:8 Demultiplexer Circuit</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl group">
            <svg viewBox="0 0 600 400" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Data input */}
              <line x1="20" y1="200" x2="60" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="205" fill="currentColor" fontSize="14" fontWeight="bold">D</text>

              {/* Select lines and inverters */}
              <line x1="40" y1="300" x2="40" y2="330" stroke="currentColor" strokeWidth="2" />
              <text x="25" y="345" fill="currentColor" fontSize="10">S0</text>
              <circle cx="50" cy="315" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="55" y1="315" x2="75" y2="315" stroke="currentColor" strokeWidth="2" />

              <line x1="100" y1="300" x2="100" y2="330" stroke="currentColor" strokeWidth="2" />
              <text x="85" y="345" fill="currentColor" fontSize="10">S1</text>
              <circle cx="110" cy="315" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="115" y1="315" x2="135" y2="315" stroke="currentColor" strokeWidth="2" />

              <line x1="160" y1="300" x2="160" y2="330" stroke="currentColor" strokeWidth="2" />
              <text x="145" y="345" fill="currentColor" fontSize="10">S2</text>
              <circle cx="170" cy="315" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="175" y1="315" x2="195" y2="315" stroke="currentColor" strokeWidth="2" />

              {/* AND gates for each output (shown in two rows for clarity) */}
              {/* Row 1: Y0-Y3 */}
              {[0,1,2,3].map((idx) => {
                const yPos = 40 + idx * 70;
                return (
                  <g key={idx}>
                    <path d={`M200 ${yPos} L230 ${yPos} Q240 ${yPos} 240 ${yPos+15} Q240 ${yPos+30} 230 ${yPos+30} L200 ${yPos+30} L200 ${yPos}`} fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="220" y={yPos+18} fill="currentColor" fontSize="8" textAnchor="middle">&</text>
                    <line x1="60" y1="200" x2="200" y2={yPos+15} stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                    <line x1="240" y1={yPos+15} x2="280" y2={yPos+15} stroke="currentColor" strokeWidth="2" />
                    <text x="290" y={yPos+18} fill="currentColor" fontSize="12">{`Y${idx}`}</text>
                  </g>
                );
              })}
              {/* Row 2: Y4-Y7 */}
              {[4,5,6,7].map((idx) => {
                const yPos = 260 + (idx-4) * 70;
                return (
                  <g key={idx}>
                    <path d={`M200 ${yPos} L230 ${yPos} Q240 ${yPos} 240 ${yPos+15} Q240 ${yPos+30} 230 ${yPos+30} L200 ${yPos+30} L200 ${yPos}`} fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="220" y={yPos+18} fill="currentColor" fontSize="8" textAnchor="middle">&</text>
                    <line x1="60" y1="200" x2="200" y2={yPos+15} stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                    <line x1="240" y1={yPos+15} x2="280" y2={yPos+15} stroke="currentColor" strokeWidth="2" />
                    <text x="290" y={yPos+18} fill="currentColor" fontSize="12">{`Y${idx}`}</text>
                  </g>
                );
              })}

              {/* Select line connections to AND gates (conceptual - not all shown) */}
              <text x="350" y="150" fill="currentColor" fontSize="10">Each AND gate receives</text>
              <text x="350" y="170" fill="currentColor" fontSize="10">the appropriate combination</text>
              <text x="350" y="190" fill="currentColor" fontSize="10">of S2,S1,S0 and their complements.</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            A 1:8 demultiplexer built with eight AND gates and three inverters. The select lines (S2,S1,S0) enable exactly one AND gate, passing D to the corresponding output.
          </p>
        </div>
      </section>

      {/* Logic Symbol */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔣 Logic Symbol</h2>
        <div className="flex justify-center">
          <div className="w-80 h-56 group">
            <svg viewBox="0 0 300 180" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Trapezoid DEMUX symbol */}
              <polygon points="130,20 240,20 240,160 130,160 100,90" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="180" y="90" fill="currentColor" fontSize="18" textAnchor="middle">DEMUX</text>
              <text x="180" y="115" fill="currentColor" fontSize="14" textAnchor="middle">1:8</text>
              
              {/* Data input */}
              <line x1="50" y1="90" x2="100" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="95" fill="currentColor" fontSize="12">D</text>
              
              {/* Select lines */}
              <line x1="180" y1="160" x2="180" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="200" y="185" fill="currentColor" fontSize="12">S0</text>
              <line x1="150" y1="160" x2="150" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="125" y="185" fill="currentColor" fontSize="12">S1</text>
              <line x1="120" y1="160" x2="120" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="95" y="185" fill="currentColor" fontSize="12">S2</text>
              
              {/* Outputs (grouped) */}
              <line x1="240" y1="40" x2="280" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="45" fill="currentColor" fontSize="10">Y0</text>
              <line x1="240" y1="70" x2="280" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="75" fill="currentColor" fontSize="10">Y1</text>
              <line x1="240" y1="100" x2="280" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="105" fill="currentColor" fontSize="10">Y2</text>
              <line x1="240" y1="130" x2="280" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="135" fill="currentColor" fontSize="10">Y3</text>
              <text x="260" y="155" fill="currentColor" fontSize="10">...</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-center">Standard symbol for a 1:8 demultiplexer.</p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (partial)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-1 px-1 text-purple-300">S2</th><th className="py-1 px-1 text-purple-300">S1</th><th className="py-1 px-1 text-purple-300">S0</th>
                <th className="py-1 px-1 text-purple-300">Y0</th><th className="py-1 px-1 text-purple-300">Y1</th><th className="py-1 px-1 text-purple-300">Y2</th><th className="py-1 px-1 text-purple-300">Y3</th>
                <th className="py-1 px-1 text-purple-300">Y4</th><th className="py-1 px-1 text-purple-300">Y5</th><th className="py-1 px-1 text-purple-300">Y6</th><th className="py-1 px-1 text-purple-300">Y7</th>
              </tr>
            </thead>
            <tbody>
              {truthTableRows.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-1">{row.S2}</td><td className="py-1 px-1">{row.S1}</td><td className="py-1 px-1">{row.S0}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y0}</td><td className="py-1 px-1 font-bold text-green-400">{row.Y1}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y2}</td><td className="py-1 px-1 font-bold text-green-400">{row.Y3}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y4}</td><td className="py-1 px-1 font-bold text-green-400">{row.Y5}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y6}</td><td className="py-1 px-1 font-bold text-green-400">{row.Y7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The 3-bit select code (S2 S1 S0) determines which output receives the data D; all other outputs are 0.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-sm text-center">
            Y0 = S2'·S1'·S0'·D<br />
            Y1 = S2'·S1'·S0·D<br />
            Y2 = S2'·S1·S0'·D<br />
            Y3 = S2'·S1·S0·D<br />
            Y4 = S2·S1'·S0'·D<br />
            Y5 = S2·S1'·S0·D<br />
            Y6 = S2·S1·S0'·D<br />
            Y7 = S2·S1·S0·D
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
          A 1:8 demultiplexer is commonly used in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Memory addressing:</strong> Select one of eight memory chips by routing the chip enable signal to the appropriate chip.</li>
          <li><strong>Data distribution:</strong> Demultiplex a serial data stream into eight parallel channels for processing.</li>
          <li><strong>Display multiplexing:</strong> Drive one of eight digits in a 7-segment display system.</li>
          <li><strong>As a 3-to-8 decoder:</strong> With D fixed to 1, the 1:8 DEMUX becomes a 3-to-8 line decoder.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students use a 74138 (3-to-8 decoder) configured as a 1:8 demultiplexer by applying the data signal to the enable input and the select lines to the address inputs.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many AND gates are needed for a 1:8 DEMUX? (8 AND gates, plus 3 inverters for the select lines.)</li>
          <li>Observe carefully: The Boolean expressions are exactly the eight minterms of S2,S1,S0 multiplied by D.</li>
          <li>Try building a 1:8 DEMUX using two 1:4 DEMUXes and a 1:2 DEMUX in a tree.</li>
          <li>What happens if you tie D to VCC? (The circuit becomes a 3-to-8 line decoder with active-high outputs.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing select line order:</strong> S2 is typically MSB, S0 LSB; ensure truth table and connections match.</li>
          <li><strong>Multiple outputs active:</strong> Only one output should be active (equal to D) at any time.</li>
          <li><strong>Forgetting inverters:</strong> AND gates need both true and complemented forms of all select lines.</li>
          <li><strong>Leaving unused outputs unconnected:</strong> While allowed, it's good practice to terminate them.</li>
          <li><strong>Overloading the data input:</strong> D drives eight AND gates; buffer if necessary.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Clearly label select lines with their weights (S0 LSB, S2 MSB) on schematics.</li>
          <li>Use the standard trapezoid symbol for demultiplexers.</li>
          <li>Test the circuit with all combinations of selects and D=0/D=1.</li>
          <li>When cascading, buffer the data input to drive multiple stages.</li>
          <li>In VHDL/Verilog, use a 'case' statement or a loop for clarity.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using as a decoder:</strong> With D=1, the 1:8 DEMUX becomes a 3-to-8 line decoder, useful for address decoding in microprocessors.</li>
          <li><strong>Tree structure:</strong> Larger demultiplexers (1:16, 1:32) can be built from 1:8 DEMUXes in a tree.</li>
          <li><strong>IC packages:</strong> The 74138 is a 3-to-8 decoder that can be used as a 1:8 demultiplexer by applying data to one of its enable pins.</li>
          <li><strong>Power saving:</strong> Only one output switches; others are static, so power is relatively low.</li>
          <li><strong>Glitch avoidance:</strong> Ensure select lines change only when D is stable to avoid glitches.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the 1:8 demultiplexer operation: D routed to Yn where n is the binary value of (S2 S1 S0).</li>
          <li>I can write the Boolean expressions for all eight outputs.</li>
          <li>I can draw the circuit using eight AND gates and three inverters.</li>
          <li>I know how to build a 1:8 DEMUX from smaller DEMUXes.</li>
          <li>I can use a 1:8 DEMUX as a building block for larger demultiplexers or as a 3-to-8 decoder.</li>
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
          “The 1:8 demultiplexer is where students start to appreciate the power of systematic design. By now, they see the pattern: for 2ⁿ outputs, we need n inverters and 2ⁿ AND gates. In our Barrackpore lab, we build a 1:8 DEMUX using a 74138 (configured as a DEMUX) and eight LEDs. Watching the data pulse travel to the selected LED based on three switches is always a memorable moment. I also emphasize that this same circuit, with D=1, becomes a 3-to-8 decoder – a key component in memory address decoding. This dual-use concept is central to efficient digital design.”
        </p>
      </section>
    </div>
  );
};

export default Topic18;