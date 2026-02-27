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

const Topic27 = () => {
  // Truth table for 74138 (3-to-8 decoder with active-low outputs and enables)
  // G1 must be high, G2A and G2B must be low for the decoder to be enabled.
  // When disabled, all outputs are high.
  // We'll show a simplified table focusing on the enabled case.
  const truthTableRows = [
    { C:0, B:0, A:0, Y0:0, Y1:1, Y2:1, Y3:1, Y4:1, Y5:1, Y6:1, Y7:1 },
    { C:0, B:0, A:1, Y0:1, Y1:0, Y2:1, Y3:1, Y4:1, Y5:1, Y6:1, Y7:1 },
    { C:0, B:1, A:0, Y0:1, Y1:1, Y2:0, Y3:1, Y4:1, Y5:1, Y6:1, Y7:1 },
    { C:0, B:1, A:1, Y0:1, Y1:1, Y2:1, Y3:0, Y4:1, Y5:1, Y6:1, Y7:1 },
    { C:1, B:0, A:0, Y0:1, Y1:1, Y2:1, Y3:1, Y4:0, Y5:1, Y6:1, Y7:1 },
    { C:1, B:0, A:1, Y0:1, Y1:1, Y2:1, Y3:1, Y4:1, Y5:0, Y6:1, Y7:1 },
    { C:1, B:1, A:0, Y0:1, Y1:1, Y2:1, Y3:1, Y4:1, Y5:1, Y6:0, Y7:1 },
    { C:1, B:1, A:1, Y0:1, Y1:1, Y2:1, Y3:1, Y4:1, Y5:1, Y6:1, Y7:0 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">3:8 Decoder (IC 74138)</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A 3-to-8 line decoder with active-low outputs and three enable inputs – a widely used IC in memory addressing and demultiplexing.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">IC 74138 Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> A, B, C (address lines, C is MSB), G1 (active-high enable), G2A, G2B (active-low enables)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Y0–Y7 (active-low, mutually exclusive)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Logic:</span> When enabled (G1=1, G2A=0, G2B=0), the output corresponding to the binary number CBA goes low; all others high.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Convert a 3-bit binary code into one of eight active-low outputs.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> Memory address decoding, data routing, generating chip selects, and as a building block for larger decoders.</p>
          </div>
        </div>
      </section>

      {/* Pinout / Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 IC 74138 Pinout</h2>
        <div className="flex justify-center">
          <div className="w-80 h-96 group">
            <svg viewBox="0 0 250 300" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* IC rectangle */}
              <rect x="50" y="20" width="150" height="260" rx="10" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="125" y="60" fill="currentColor" fontSize="14" textAnchor="middle">74138</text>

              {/* Address inputs left */}
              <line x1="20" y1="80" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="85" fill="currentColor" fontSize="10">A</text>
              <line x1="20" y1="120" x2="50" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="125" fill="currentColor" fontSize="10">B</text>
              <line x1="20" y1="160" x2="50" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="165" fill="currentColor" fontSize="10">C</text>

              {/* Enable inputs left */}
              <line x1="20" y1="200" x2="50" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="205" fill="currentColor" fontSize="10">G1</text>
              <line x1="20" y1="240" x2="50" y2="240" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="245" fill="currentColor" fontSize="10">G2A</text>
              <line x1="20" y1="280" x2="50" y2="280" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="285" fill="currentColor" fontSize="10">G2B</text>

              {/* Outputs right */}
              <line x1="200" y1="50" x2="230" y2="50" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="55" fill="currentColor" fontSize="8">Y0</text>
              <line x1="200" y1="80" x2="230" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="85" fill="currentColor" fontSize="8">Y1</text>
              <line x1="200" y1="110" x2="230" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="115" fill="currentColor" fontSize="8">Y2</text>
              <line x1="200" y1="140" x2="230" y2="140" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="145" fill="currentColor" fontSize="8">Y3</text>
              <line x1="200" y1="170" x2="230" y2="170" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="175" fill="currentColor" fontSize="8">Y4</text>
              <line x1="200" y1="200" x2="230" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="205" fill="currentColor" fontSize="8">Y5</text>
              <line x1="200" y1="230" x2="230" y2="230" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="235" fill="currentColor" fontSize="8">Y6</text>
              <line x1="200" y1="260" x2="230" y2="260" stroke="currentColor" strokeWidth="2" />
              <text x="235" y="265" fill="currentColor" fontSize="8">Y7</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The 74138 has three address inputs (A, B, C), three enable inputs (G1, G2A, G2B), and eight active-low outputs.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (enabled, G1=1, G2A=0, G2B=0)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-1 px-1 text-purple-300">C</th><th className="py-1 px-1 text-purple-300">B</th><th className="py-1 px-1 text-purple-300">A</th>
                <th className="py-1 px-1 text-purple-300">Y7</th><th className="py-1 px-1 text-purple-300">Y6</th><th className="py-1 px-1 text-purple-300">Y5</th><th className="py-1 px-1 text-purple-300">Y4</th>
                <th className="py-1 px-1 text-purple-300">Y3</th><th className="py-1 px-1 text-purple-300">Y2</th><th className="py-1 px-1 text-purple-300">Y1</th><th className="py-1 px-1 text-purple-300">Y0</th>
              </tr>
            </thead>
            <tbody>
              {truthTableRows.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-1">{row.C}</td><td className="py-1 px-1">{row.B}</td><td className="py-1 px-1">{row.A}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y7}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y6}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y5}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y4}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y3}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y2}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y1}</td>
                  <td className="py-1 px-1 font-bold text-green-400">{row.Y0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          When enabled, the output corresponding to the binary number (C B A) goes LOW; all other outputs remain HIGH.
        </p>
        <p className="text-gray-300 mt-2 text-sm">
          When disabled (G1=0 or G2A=1 or G2B=1), all outputs are HIGH regardless of address.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions (active-low)</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-sm text-center">
            Y0 = (C'·B'·A')' &nbsp; (i.e., Y0 is low when C=0,B=0,A=0)<br />
            Y1 = (C'·B'·A)' <br />
            Y2 = (C'·B·A')' <br />
            Y3 = (C'·B·A)' <br />
            Y4 = (C·B'·A')' <br />
            Y5 = (C·B'·A)' <br />
            Y6 = (C·B·A')' <br />
            Y7 = (C·B·A)'
          </p>
          <p className="text-gray-300 mt-2 text-center">
            In terms of the enable condition, the full expression for Y0 is: <span className="font-mono text-green-400">Y0 = (G1·G2A'·G2B'·C'·B'·A')'</span>
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Example: Memory Address Decoding</h2>
        <p className="text-gray-300 mb-3">
          The 74138 is commonly used to select one of eight memory chips in an 8‑bank memory system. Suppose we have eight 2KB RAM chips, and the CPU has a 16‑bit address bus (A15..A0). The upper three address lines (A15, A14, A13) are connected to C, B, A of the decoder. The decoder's outputs (active-low) are connected to the chip‑enable pins of the RAM chips.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>When A15A14A13 = 000, Y0 goes low, enabling RAM chip 0.</li>
          <li>When A15A14A13 = 001, Y1 goes low, enabling RAM chip 1.</li>
          <li>… and so on.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          The enable pins can be used to gate the decoder with additional control signals (e.g., a memory request signal from the CPU). For instance, connect the memory request (active-high) to G1, and connect G2A and G2B to ground.
        </p>
        <p className="text-gray-300 mt-2">
          In the Shyamnagar lab, students build this circuit with a 74138 and eight LEDs to simulate memory chip selection.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Why does the 74138 have three enable inputs? (To allow flexible enabling conditions – you can use them as additional address bits or control signals.)</li>
          <li>Observe carefully: When the decoder is disabled, all outputs are high. How could you use this to build a larger decoder (e.g., 4-to-16)?</li>
          <li>Try using the 74138 as a 1:8 demultiplexer. (Connect the data input to one of the enables, and use the address lines as select.)</li>
          <li>What would happen if you connected G2A and G2B together and used them as an active-high enable? (You would need an inverter.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Forgetting the enables:</strong> The 74138 will not function unless G1=1 and G2A=G2B=0. Leaving enables floating can disable the chip.</li>
          <li><strong>Misunderstanding active-low outputs:</strong> The selected output goes LOW, not HIGH. This can cause confusion when driving active-high inputs.</li>
          <li><strong>Incorrect address order:</strong> C is the MSB. Swapping A and C will map addresses to the wrong outputs.</li>
          <li><strong>Using the wrong enable combination:</strong> G1 is active-high; G2A and G2B are active-low. Mixing them up will keep the decoder disabled.</li>
          <li><strong>Leaving unused outputs unconnected:</strong> While allowed, it's good practice to terminate them or leave them open (they are outputs).</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always connect unused enable pins to their inactive levels (G2A and G2B to GND, G1 to VCC if not used).</li>
          <li>Use decoupling capacitors (0.1µF) near the IC to reduce power supply noise.</li>
          <li>Label address lines clearly (A LSB, C MSB) on your schematic.</li>
          <li>When cascading, ensure the enables are correctly driven to avoid multiple chips being enabled simultaneously.</li>
          <li>Simulate the circuit to verify correct decoding and enable behavior.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Cascading to make a 4-to-16 decoder:</strong> Use two 74138s. Connect the MSB address line to the enables: one chip's G1 gets the MSB, the other's G2A and G2B get the MSB through an inverter. The other address lines go to A,B,C of both chips.</li>
          <li><strong>Using as a demultiplexer:</strong> Connect the data signal to G1, and use G2A and G2B as address enables. The output selected by A,B,C will follow the data (inverted, since outputs are active-low).</li>
          <li><strong>Active-low to active-high conversion:</strong> If you need active-high outputs, add inverters (e.g., 7404) after each output.</li>
          <li><strong>Power saving:</strong> When not in use, disable the decoder by setting G1=0; this forces all outputs high and reduces power consumption.</li>
          <li><strong>Glitch-free addressing:</strong> Ensure address lines change only when the decoder is disabled (by gating the enables) to avoid output glitches.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the pinout of the 74138 (A,B,C, G1, G2A, G2B, Y0–Y7).</li>
          <li>I know the enabling condition: G1=1, G2A=0, G2B=0.</li>
          <li>I can interpret the truth table with active-low outputs.</li>
          <li>I can use the 74138 in memory address decoding.</li>
          <li>I know how to cascade two 74138s to make a 4-to-16 decoder.</li>
          <li>I can use the 74138 as a demultiplexer.</li>
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
          “The 74138 is a workhorse in digital design. In my Barrackpore lab, we start by using it to drive eight LEDs – a simple demonstration of address decoding. Then we move to memory interfacing, connecting it to RAM chips. The enable pins teach students about chip selection and cascading. I always emphasize the active-low nature of the outputs, as it's a common stumbling block. Once they master the 74138, they can tackle larger decoders and understand how microprocessors access memory.”
        </p>
      </section>
    </div>
  );
};

export default Topic27;