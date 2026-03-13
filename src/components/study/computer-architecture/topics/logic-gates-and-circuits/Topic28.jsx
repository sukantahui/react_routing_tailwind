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

const Topic28 = () => {
  // Truth table for 4:16 decoder (active-high outputs, enabled)
  // We'll show a few representative rows for brevity
  const truthTableRows = [
    { A3:0, A2:0, A1:0, A0:0, Y0:1, others:0 },
    { A3:0, A2:0, A1:0, A0:1, Y1:1, others:0 },
    { A3:0, A2:0, A1:1, A0:0, Y2:1, others:0 },
    { A3:0, A2:0, A1:1, A0:1, Y3:1, others:0 },
    { A3:1, A2:1, A1:1, A0:1, Y15:1, others:0 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">4:16 Decoder</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Converts a 4-bit binary input into one of 16 mutually exclusive outputs – a key component in memory addressing and large-scale selection.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> decoder_4to16(A3, A2, A1, A0) → (Y0 ... Y15)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> A3 (MSB), A2, A1, A0 (LSB) – 4-bit address</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> 16 outputs (active-high or active-low, depending on IC)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Select one of 16 output lines based on a 4-bit code.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In large memory systems (e.g., selecting one of 16 RAM chips), in instruction decoding, and in complex logic functions.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Block Diagram</h2>
        <div className="flex justify-center">
          <div className="w-96 h-80 group">
            <svg viewBox="0 0 350 280" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Decoder block */}
              <rect x="120" y="40" width="120" height="200" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="180" y="120" fill="currentColor" fontSize="18" textAnchor="middle">DECODER</text>
              <text x="180" y="150" fill="currentColor" fontSize="14" textAnchor="middle">4:16</text>

              {/* Inputs */}
              <line x1="50" y1="70" x2="120" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="75" fill="currentColor" fontSize="12">A0</text>
              <line x1="50" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="105" fill="currentColor" fontSize="12">A1</text>
              <line x1="50" y1="130" x2="120" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="135" fill="currentColor" fontSize="12">A2</text>
              <line x1="50" y1="160" x2="120" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="165" fill="currentColor" fontSize="12">A3</text>

              {/* Outputs (only first and last shown for clarity) */}
              <line x1="240" y1="60" x2="290" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="65" fill="currentColor" fontSize="10">Y0</text>
              <line x1="240" y1="90" x2="290" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="95" fill="currentColor" fontSize="10">Y1</text>
              <line x1="240" y1="120" x2="290" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="125" fill="currentColor" fontSize="10">Y2</text>
              <line x1="240" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="155" fill="currentColor" fontSize="10">Y3</text>
              <text x="265" y="190" fill="currentColor" fontSize="10">...</text>
              <line x1="240" y1="210" x2="290" y2="210" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="215" fill="currentColor" fontSize="10">Y15</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A 4:16 decoder accepts a 4-bit address and activates one of 16 outputs.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (representative rows, active-high)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-1 px-2">A3</th><th className="py-1 px-2">A2</th><th className="py-1 px-2">A1</th><th className="py-1 px-2">A0</th>
                <th className="py-1 px-2">Active Output</th><th className="py-1 px-2">Others</th>
              </tr>
            </thead>
            <tbody>
              {truthTableRows.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-2">{row.A3}</td><td className="py-1 px-2">{row.A2}</td><td className="py-1 px-2">{row.A1}</td><td className="py-1 px-2">{row.A0}</td>
                  <td className="py-1 px-2 font-bold text-green-400">
                    {Object.keys(row).find(key => key.startsWith('Y') && row[key] === 1)}
                  </td>
                  <td className="py-1 px-2 text-gray-400">all 0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          For each 4-bit input combination, exactly one output is active (1). The pattern follows the binary value of (A3 A2 A1 A0).
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-sm text-center">
            Y0  = A3'·A2'·A1'·A0'<br />
            Y1  = A3'·A2'·A1'·A0<br />
            Y2  = A3'·A2'·A1·A0'<br />
            Y3  = A3'·A2'·A1·A0<br />
            ...<br />
            Y15 = A3·A2·A1·A0
          </p>
          <p className="text-gray-300 mt-2 text-center">
            Each output is a minterm of the four input variables – the logical AND of each input or its complement.
          </p>
        </div>
      </section>

      {/* Implementation using two 3:8 decoders */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Implementation with Two 3:8 Decoders (e.g., 74138)</h2>
        <p className="text-gray-300 mb-4">
          A 4:16 decoder can be built by cascading two 3:8 decoders (like the 74138) using the most significant address bit as a chip select.
        </p>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl group">
            <svg viewBox="0 0 500 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* First 3:8 decoder (for A3=0) */}
              <rect x="80" y="50" width="120" height="150" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="140" y="110" fill="currentColor" fontSize="12" textAnchor="middle">74138</text>
              <text x="140" y="130" fill="currentColor" fontSize="10" textAnchor="middle">(A3=0)</text>
              <line x1="30" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2" /><text x="10" y="85" fill="currentColor" fontSize="8">A0</text>
              <line x1="30" y1="110" x2="80" y2="110" stroke="currentColor" strokeWidth="2" /><text x="10" y="115" fill="currentColor" fontSize="8">A1</text>
              <line x1="30" y1="140" x2="80" y2="140" stroke="currentColor" strokeWidth="2" /><text x="10" y="145" fill="currentColor" fontSize="8">A2</text>
              {/* Enable for first decoder: G1 = A3' (via inverter) */}
              <circle cx="55" cy="180" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="30" y1="180" x2="50" y2="180" stroke="currentColor" strokeWidth="2" /><text x="10" y="185" fill="currentColor" fontSize="8">A3</text>
              <line x1="60" y1="180" x2="80" y2="180" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="180" x2="80" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <text x="90" y="175" fill="currentColor" fontSize="8">to G1</text>

              {/* Second 3:8 decoder (for A3=1) */}
              <rect x="280" y="50" width="120" height="150" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="340" y="110" fill="currentColor" fontSize="12" textAnchor="middle">74138</text>
              <text x="340" y="130" fill="currentColor" fontSize="10" textAnchor="middle">(A3=1)</text>
              <line x1="230" y1="80" x2="280" y2="80" stroke="currentColor" strokeWidth="2" /><text x="210" y="85" fill="currentColor" fontSize="8">A0</text>
              <line x1="230" y1="110" x2="280" y2="110" stroke="currentColor" strokeWidth="2" /><text x="210" y="115" fill="currentColor" fontSize="8">A1</text>
              <line x1="230" y1="140" x2="280" y2="140" stroke="currentColor" strokeWidth="2" /><text x="210" y="145" fill="currentColor" fontSize="8">A2</text>
              {/* Enable for second decoder: G1 = A3 (direct) */}
              <line x1="30" y1="180" x2="280" y2="180" stroke="currentColor" strokeWidth="2" />
              <line x1="280" y1="180" x2="280" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <text x="290" y="175" fill="currentColor" fontSize="8">to G1</text>

              {/* Outputs */}
              <line x1="200" y1="60" x2="250" y2="60" stroke="currentColor" strokeWidth="2" /><text x="260" y="65" fill="currentColor" fontSize="8">Y0-7</text>
              <line x1="400" y1="60" x2="450" y2="60" stroke="currentColor" strokeWidth="2" /><text x="460" y="65" fill="currentColor" fontSize="8">Y8-15</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            Two 3:8 decoders (74138) with the MSB (A3) enabling one chip at a time. The lower three address bits (A2,A1,A0) go to both decoders. When A3=0, the first decoder is enabled; when A3=1, the second decoder is enabled (via an inverter for the first, direct for the second, depending on enable polarity).
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Example: Large Memory System</h2>
        <p className="text-gray-300 mb-3">
          A 4:16 decoder is often used to select one of 16 memory chips in a system with 64KB of memory, where each chip is 4KB. The CPU's address lines A15–A12 are connected to the decoder inputs, and each output enables one 4KB RAM chip. The remaining address lines (A11–A0) are connected to all chips to select a byte within the chip.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Address 0x0000–0x0FFF → chip 0 selected</li>
          <li>Address 0x1000–0x1FFF → chip 1 selected</li>
          <li>... up to chip 15 at 0xF000–0xFFFF</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build a simulation using two 74138s to create a 4:16 decoder and drive 16 LEDs, demonstrating how a microprocessor would select memory banks.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many AND gates would be needed for a direct gate-level implementation? (16 AND gates, each with 4 inputs, plus 4 inverters.)</li>
          <li>Observe carefully: The cascading method using two 3:8 decoders reduces the number of ICs – a common optimization.</li>
          <li>Try designing a 4:16 decoder using four 2:4 decoders and additional logic. How would you connect them?</li>
          <li>What are the advantages of using a single 4:16 decoder IC versus cascading smaller ones? (Space, power, but may not be available.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Incorrect enable connections when cascading:</strong> Ensure that only one chip is enabled at a time; overlapping enables will cause multiple outputs active.</li>
          <li><strong>Forcing active-high outputs when using active-low decoders:</strong> Remember to invert if your system expects active-high.</li>
          <li><strong>Address line order:</strong> A3 is MSB, A0 LSB; mixing them up maps addresses to wrong outputs.</li>
          <li><strong>Leaving unused inputs floating:</strong> All inputs should be connected to a known logic level.</li>
          <li><strong>Assuming all decoders have the same enable polarity:</strong> Check datasheets; 74138 enables are mixed polarity.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Draw a clear block diagram showing how smaller decoders are cascaded.</li>
          <li>Label all address lines with their bit significance.</li>
          <li>Use decoupling capacitors near each IC in physical circuits.</li>
          <li>Simulate the cascaded design before hardware implementation to verify correct enabling.</li>
          <li>If using a single 4:16 IC, consult the datasheet for enable and output polarity.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Cascading efficiently:</strong> Use the enables of the 74138 to create larger decoders without extra gates. The MSB address line can drive the active-high enable (G1) of one chip and, through an inverter, the active-low enables (G2A, G2B) of the other.</li>
          <li><strong>Active-low outputs:</strong> If you need active-high outputs, add inverters (e.g., 7404) on the outputs, or use a decoder with active-high outputs (like 74154).</li>
          <li><strong>IC availability:</strong> The 74154 is a dedicated 4:16 decoder with active-low outputs and two enable inputs, ideal for large systems.</li>
          <li><strong>Power saving:</strong> Disable unused decoder sections via enable pins to reduce power consumption.</li>
          <li><strong>Glitch-free operation:</strong> Ensure address lines change only when the decoder is disabled (by gating enables) to avoid output glitches.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand that a 4:16 decoder has 16 outputs, one for each 4-bit input combination.</li>
          <li>I can write the Boolean expressions (minterms) for each output.</li>
          <li>I can build a 4:16 decoder by cascading two 3:8 decoders (e.g., 74138).</li>
          <li>I know the role of the MSB address line as a chip select in cascaded designs.</li>
          <li>I can apply a 4:16 decoder in memory address decoding.</li>
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
          “The 4:16 decoder is where students truly appreciate hierarchical design. In my Shyamnagar lab, after mastering the 3:8 decoder, I challenge them to build a 4:16 using two 74138s. They quickly realize the MSB becomes a chip select. We then use it to address 16 LEDs, simulating a memory address space. This hands-on experience reinforces the concept of address decoding – a cornerstone of computer architecture. I remind them that every memory access in a computer involves such decoders, and understanding them at this level demystifies how CPUs talk to memory.”
        </p>
      </section>
    </div>
  );
};

export default Topic28;