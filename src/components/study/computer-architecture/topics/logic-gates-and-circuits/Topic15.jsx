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

const Topic15 = () => {
  // Example truth table for 1:4 demultiplexer
  const demuxTruthTable = [
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
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Demultiplexer (DEMUX)</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A data distributor – takes a single input and routes it to one of many output lines based on select lines.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is a Demultiplexer?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> DEMUX(select_lines, data_in) → multiple outputs</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> 1 data input, n select lines</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> 2ⁿ output lines</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Route a single data signal to one of many destinations.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In data distribution, memory addressing, serial-to-parallel conversion, and as a decoder with data input.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Block Diagram (1:4 DEMUX)</h2>
        <div className="flex flex-col items-center">
          <div className="w-80 h-64 group">
            <svg viewBox="0 0 300 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Main DEMUX block */}
              <rect x="100" y="40" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="160" y="100" fill="currentColor" fontSize="18" textAnchor="middle">DEMUX</text>
              <text x="160" y="120" fill="currentColor" fontSize="12" textAnchor="middle">1:4</text>
              
              {/* Data input */}
              <line x1="40" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="105" fill="currentColor" fontSize="12">D</text>
              
              {/* Select lines */}
              <line x1="130" y1="160" x2="130" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="110" y="195" fill="currentColor" fontSize="12">S0</text>
              <line x1="190" y1="160" x2="190" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="195" fill="currentColor" fontSize="12">S1</text>
              
              {/* Outputs */}
              <line x1="220" y1="60" x2="260" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="65" fill="currentColor" fontSize="12">Y0</text>
              <line x1="220" y1="90" x2="260" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="95" fill="currentColor" fontSize="12">Y1</text>
              <line x1="220" y1="120" x2="260" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="125" fill="currentColor" fontSize="12">Y2</text>
              <line x1="220" y1="150" x2="260" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="155" fill="currentColor" fontSize="12">Y3</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-2">A 1:4 demultiplexer has 1 data input, 2 select lines, and 4 outputs.</p>
        </div>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (1:4 DEMUX)</h2>
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
              {demuxTruthTable.map((row, idx) => (
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
          The select lines determine which output receives the data input D; all other outputs are 0.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions (1:4 DEMUX)</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-lg text-center">
            Y0 = S1'·S0'·D<br />
            Y1 = S1'·S0·D<br />
            Y2 = S1·S0'·D<br />
            Y3 = S1·S0·D
          </p>
          <p className="text-gray-300 mt-2 text-center">
            Each output is an AND of the data input with the corresponding minterm of the select lines.
          </p>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 Circuit Diagram (1:4 DEMUX)</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 400 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Data input */}
              <line x1="20" y1="125" x2="80" y2="125" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="130" fill="currentColor" fontSize="12">D</text>

              {/* Select lines and inverters */}
              <line x1="60" y1="180" x2="60" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="45" y="215" fill="currentColor" fontSize="10">S0</text>
              <circle cx="70" cy="190" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="75" y1="190" x2="95" y2="190" stroke="currentColor" strokeWidth="2" />

              <line x1="100" y1="180" x2="100" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="85" y="215" fill="currentColor" fontSize="10">S1</text>
              <circle cx="110" cy="190" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="115" y1="190" x2="135" y2="190" stroke="currentColor" strokeWidth="2" />

              {/* AND gates for each output */}
              {/* Y0: S1' S0' D */}
              <path d="M150 50 L180 50 Q190 50 190 65 Q190 80 180 80 L150 80 L150 50" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="70" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="80" y1="125" x2="150" y2="125" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* D to all ANDs */}
              <line x1="95" y1="190" x2="170" y2="65" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0' to Y0 */}
              <line x1="135" y1="190" x2="170" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1' to Y0 */}
              <line x1="190" y1="65" x2="230" y2="65" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="70" fill="currentColor" fontSize="12">Y0</text>

              {/* Y1: S1' S0 D */}
              <path d="M150 100 L180 100 Q190 100 190 115 Q190 130 180 130 L150 130 L150 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="120" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="60" y1="190" x2="170" y2="115" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0 to Y1 */}
              <line x1="135" y1="190" x2="170" y2="105" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1' to Y1 */}
              <line x1="190" y1="115" x2="230" y2="115" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="120" fill="currentColor" fontSize="12">Y1</text>

              {/* Y2: S1 S0' D */}
              <path d="M150 150 L180 150 Q190 150 190 165 Q190 180 180 180 L150 180 L150 150" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="170" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="95" y1="190" x2="170" y2="165" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0' to Y2 */}
              <line x1="100" y1="190" x2="170" y2="155" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1 to Y2 */}
              <line x1="190" y1="165" x2="230" y2="165" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="170" fill="currentColor" fontSize="12">Y2</text>

              {/* Y3: S1 S0 D */}
              <path d="M150 200 L180 200 Q190 200 190 215 Q190 230 180 230 L150 230 L150 200" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="220" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="60" y1="190" x2="170" y2="215" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S0 to Y3 */}
              <line x1="100" y1="190" x2="170" y2="205" stroke="currentColor" strokeWidth="2" strokeDasharray="4" /> {/* S1 to Y3 */}
              <line x1="190" y1="215" x2="230" y2="215" stroke="currentColor" strokeWidth="2" />
              <text x="240" y="220" fill="currentColor" fontSize="12">Y3</text>

              {/* D connections to all ANDs (simplified) */}
              <line x1="80" y1="125" x2="80" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="140" x2="150" y2="140" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            A 1:4 demultiplexer built with four AND gates and two inverters. The data input D is connected to all AND gates, and the select lines (with complements) enable exactly one gate.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Demultiplexers are essential in many applications:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Data distribution:</strong> Sending a single data stream to one of several destinations (e.g., selecting which memory chip receives write data).</li>
          <li><strong>Serial-to-parallel conversion:</strong> A serial bit stream can be demultiplexed into parallel words.</li>
          <li><strong>Decoders with enable:</strong> A demultiplexer with data input fixed to 1 acts as a decoder.</li>
          <li><strong>Communication systems:</strong> Time-division demultiplexing separates interleaved channels.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Barrackpore lab, students use a 1:4 DEMUX to route a square wave to one of four LEDs, demonstrating how a single signal can be directed to different outputs based on switch settings.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How does a demultiplexer relate to a multiplexer? (They are inverse operations – MUX combines, DEMUX distributes.)</li>
          <li>Observe carefully: The Boolean expressions for a DEMUX are simply the minterms ANDed with the data input.</li>
          <li>Try drawing a 1:8 DEMUX. How many AND gates and inverters would you need? (8 AND gates, 3 inverters if you generate complements.)</li>
          <li>What happens if you connect the data input to VCC (logic 1)? (The DEMUX becomes a binary decoder.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing DEMUX with MUX:</strong> Remember DEMUX has one input and many outputs; MUX has many inputs and one output.</li>
          <li><strong>Forcing all outputs to be active:</strong> Only one output should be active at a time; all others are 0.</li>
          <li><strong>Incorrect select line order:</strong> The mapping of select bits to output numbers must be consistent.</li>
          <li><strong>Leaving unused outputs unconnected:</strong> In practice, unused outputs can be left open, but it's good practice to terminate them.</li>
          <li><strong>Using AND gates without buffering the data input:</strong> The data input may need to drive many AND gates; check fan-out.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Label outputs with their corresponding select combination (e.g., Y0 for S1S0=00).</li>
          <li>Use a truth table to define the DEMUX behavior before implementation.</li>
          <li>In schematics, use the standard trapezoid symbol (inverted compared to MUX).</li>
          <li>When cascading demultiplexers, ensure enable pins are properly managed.</li>
          <li>For high-speed designs, buffer the data input to drive all AND gates.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using decoders:</strong> A DEMUX is essentially a decoder with an enable input (the data line). Many decoder ICs can be used as demultiplexers.</li>
          <li><strong>Tree structures:</strong> Large demultiplexers can be built as trees, similar to multiplexers.</li>
          <li><strong>In VHDL/Verilog:</strong> Use a 'case' or 'with/select' statement to describe DEMUX behavior; synthesis tools generate the gates.</li>
          <li><strong>Power saving:</strong> Only one output switches; the others are static, so power is relatively low.</li>
          <li><strong>IC packages:</strong> Common TTL demultiplexers include 74139 (dual 1:4 DEMUX) and 74138 (3:8 decoder, can be used as 1:8 DEMUX with data on enable).</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the basic principle: one input, many outputs, select lines choose the destination.</li>
          <li>I can write the truth table for a 1:4 demultiplexer.</li>
          <li>I can derive the Boolean expressions for each output.</li>
          <li>I know the circuit implementation using AND gates and inverters.</li>
          <li>I can identify applications where demultiplexers are used.</li>
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
          “Demultiplexers are the perfect counterpart to multiplexers. I like to use the analogy of a post office sorting machine: letters (data) come in on one conveyor belt, and based on the zip code (select lines), they are routed to different outgoing chutes. In our Shyamnagar lab, we build a 1:4 DEMUX using AND gates and watch as a single square wave appears on one of four LEDs. This hands-on experience solidifies the concept. The next topics will explore specific demultiplexer sizes and their use as decoders – a powerful combination.”
        </p>
      </section>
    </div>
  );
};

export default Topic15;