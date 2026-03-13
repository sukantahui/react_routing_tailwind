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

const Topic31 = () => {
  // Truth table for 2:4 decoder with active-high enable
  // When E=0, all outputs are 0 (disabled)
  // When E=1, normal decoding
  const truthTable = [
    { E: 0, A1: 'X', A0: 'X', Y0: 0, Y1: 0, Y2: 0, Y3: 0 },
    { E: 1, A1: 0, A0: 0, Y0: 1, Y1: 0, Y2: 0, Y3: 0 },
    { E: 1, A1: 0, A0: 1, Y0: 0, Y1: 1, Y2: 0, Y3: 0 },
    { E: 1, A1: 1, A0: 0, Y0: 0, Y1: 0, Y2: 1, Y3: 0 },
    { E: 1, A1: 1, A0: 1, Y0: 0, Y1: 0, Y2: 0, Y3: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Decoder with Enable Input</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          An enable pin allows a decoder to be turned on or off – essential for memory addressing, cascading, and power management.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is an Enable Input?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Definition:</span> An additional input that controls whether the decoder is active. When enabled, the decoder functions normally; when disabled, all outputs are forced to an inactive state (usually 0 or 1, depending on design).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Allows multiple decoders to share the same address lines without conflict, enables power saving, and simplifies cascading.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Enable polarity:</span> Enables can be active-high (EN=1 enables) or active-low (EN=0 enables). Common ICs like 74138 have multiple enables of both polarities.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In memory chip selection, bus interfacing, and building larger decoders from smaller ones.</p>
          </div>
        </div>
      </section>

      {/* Logic Symbol */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔣 Logic Symbol (2:4 Decoder with Enable)</h2>
        <div className="flex justify-center">
          <div className="w-80 h-64 group">
            <svg viewBox="0 0 300 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Decoder block */}
              <rect x="100" y="30" width="120" height="140" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="160" y="90" fill="currentColor" fontSize="16" textAnchor="middle">DECODER</text>
              <text x="160" y="115" fill="currentColor" fontSize="12" textAnchor="middle">2:4</text>

              {/* Address inputs */}
              <line x1="50" y1="70" x2="100" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="75" fill="currentColor" fontSize="12">A0</text>
              <line x1="50" y1="110" x2="100" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="115" fill="currentColor" fontSize="12">A1</text>

              {/* Enable input (active-high) */}
              <line x1="160" y1="170" x2="160" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="195" fill="currentColor" fontSize="12">EN</text>

              {/* Outputs */}
              <line x1="220" y1="50" x2="260" y2="50" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="55" fill="currentColor" fontSize="10">Y0</text>
              <line x1="220" y1="80" x2="260" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="85" fill="currentColor" fontSize="10">Y1</text>
              <line x1="220" y1="110" x2="260" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="115" fill="currentColor" fontSize="10">Y2</text>
              <line x1="220" y1="140" x2="260" y2="140" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="145" fill="currentColor" fontSize="10">Y3</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A 2:4 decoder with an active‑high enable pin. When EN=0, all outputs are 0; when EN=1, the selected output is 1.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (active-high enable)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-purple-300">EN</th><th className="py-2 px-2 text-purple-300">A1</th><th className="py-2 px-2 text-purple-300">A0</th>
                <th className="py-2 px-2 text-purple-300">Y3</th><th className="py-2 px-2 text-purple-300">Y2</th><th className="py-2 px-2 text-purple-300">Y1</th><th className="py-2 px-2 text-purple-300">Y0</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-2">{row.E}</td>
                  <td className="py-1 px-2">{row.A1}</td>
                  <td className="py-1 px-2">{row.A0}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y3}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y2}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y1}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          When EN=0, all outputs are 0 regardless of address. When EN=1, the decoder operates normally.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            Y0 = EN · A1' · A0'<br />
            Y1 = EN · A1' · A0<br />
            Y2 = EN · A1 · A0'<br />
            Y3 = EN · A1 · A0
          </p>
          <p className="text-gray-300 mt-2 text-center">
            The enable is ANDed with each minterm. This is the general form for an active‑high enable.
          </p>
        </div>
      </section>

      {/* Gate-Level Circuit */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Gate-Level Implementation</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 450 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Inputs */}
              <line x1="30" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="65" fill="currentColor" fontSize="10">A0</text>
              <line x1="30" y1="100" x2="80" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="105" fill="currentColor" fontSize="10">A1</text>
              <line x1="30" y1="140" x2="80" y2="140" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="145" fill="currentColor" fontSize="10">EN</text>

              {/* Inverters */}
              <circle cx="95" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="2" />

              <circle cx="95" cy="100" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="100" x2="90" y2="100" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="2" />

              {/* Three-input AND gates (EN · A1 · A0 etc.) */}
              {/* Y0: EN·A1'·A0' */}
              <path d="M160 30 L190 30 Q200 30 200 45 Q200 60 190 60 L160 60 L160 30" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="50" fill="currentColor" fontSize="8" textAnchor="middle">&</text>
              <line x1="120" y1="60" x2="180" y2="45" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="120" y1="100" x2="180" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="140" x2="180" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="200" y1="45" x2="250" y2="45" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="50" fill="currentColor" fontSize="10">Y0</text>

              {/* Y1: EN·A1'·A0 */}
              <path d="M160 80 L190 80 Q200 80 200 95 Q200 110 190 110 L160 110 L160 80" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="100" fill="currentColor" fontSize="8" textAnchor="middle">&</text>
              <line x1="80" y1="60" x2="180" y2="95" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="120" y1="100" x2="180" y2="85" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="140" x2="180" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="200" y1="95" x2="250" y2="95" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="100" fill="currentColor" fontSize="10">Y1</text>

              {/* Y2: EN·A1·A0' */}
              <path d="M160 130 L190 130 Q200 130 200 145 Q200 160 190 160 L160 160 L160 130" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="150" fill="currentColor" fontSize="8" textAnchor="middle">&</text>
              <line x1="120" y1="60" x2="180" y2="145" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="100" x2="180" y2="135" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="140" x2="180" y2="140" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="200" y1="145" x2="250" y2="145" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="150" fill="currentColor" fontSize="10">Y2</text>

              {/* Y3: EN·A1·A0 */}
              <path d="M160 180 L190 180 Q200 180 200 195 Q200 210 190 210 L160 210 L160 180" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="200" fill="currentColor" fontSize="8" textAnchor="middle">&</text>
              <line x1="80" y1="60" x2="180" y2="195" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="100" x2="180" y2="185" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="140" x2="180" y2="190" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="200" y1="195" x2="250" y2="195" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="200" fill="currentColor" fontSize="10">Y3</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The enable input is ANDed with each minterm. In practice, this can be implemented with three‑input AND gates or by using the enable as a gating signal before the decoder.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Decoders with enable are used everywhere:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Memory chip selection:</strong> The enable can be connected to a memory request signal – only when the CPU requests memory does the decoder activate a chip.</li>
          <li><strong>Cascading decoders:</strong> As seen in Topic 29, enables allow multiple decoders to be combined into larger ones.</li>
          <li><strong>Power management:</strong> Disabling a decoder when not in use saves power.</li>
          <li><strong>Demultiplexers:</strong> A decoder with enable can function as a demultiplexer by using the enable as the data input.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Barrackpore lab, students use a 74138 (with its three enables) to control eight LEDs. They learn how the enables can be used to turn the whole decoder off, or to add an extra address bit by using one enable as a chip select.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How would the truth table change for an active‑low enable? (EN=0 enables; EN=1 disables, outputs all 0.)</li>
          <li>Observe carefully: In the gate‑level circuit, the enable is ANDed with each minterm. This is the same as adding an extra input to the decoder.</li>
          <li>Try using the enable of a 74138 as an address line to build a 4:16 decoder. (Connect the MSB to one enable and its complement to another.)</li>
          <li>What happens if you leave the enable pin floating? (It may float to an indeterminate state – always connect it to a known logic level.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Forgetting the enable polarity:</strong> Using an active‑high enable where an active‑low is required (or vice versa) will keep the decoder permanently disabled.</li>
          <li><strong>Leaving enables unconnected:</strong> Floating inputs can pick up noise and cause erratic behavior.</li>
          <li><strong>Assuming all outputs are high when disabled:</strong> Some decoders (like 74138) force outputs high when disabled (active‑low outputs), others force low. Check the datasheet.</li>
          <li><strong>Using the enable as a data input without considering inversion:</strong> When using a decoder as a demultiplexer, the enable might need to be inverted depending on output polarity.</li>
          <li><strong>Overlooking multiple enables:</strong> ICs like 74138 have three enables with different polarities – all must be satisfied for the chip to be enabled.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always connect unused enable pins to their inactive levels (e.g., GND for active‑high, VCC for active‑low) through a resistor if necessary.</li>
          <li>In schematics, label the enable pin clearly and indicate its active polarity (e.g., with a bubble for active‑low).</li>
          <li>When cascading, ensure that the enable signals are properly derived from address lines and that no two chips are enabled simultaneously.</li>
          <li>Simulate the circuit to verify that the enable works as expected for all combinations.</li>
          <li>Use decoupling capacitors near each IC to reduce power supply noise.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using enables as extra address bits:</strong> By connecting an address line to an enable (and its complement to another enable), you can effectively increase the number of address bits without adding more decoder ICs.</li>
          <li><strong>Active‑low enables for wired‑OR:</strong> In systems with multiple sources driving a common bus, active‑low enables can simplify bus arbitration.</li>
          <li><strong>Power gating:</strong> Use the enable to shut down the decoder when not needed, reducing dynamic power consumption.</li>
          <li><strong>Demultiplexer mode:</strong> Connect a data signal to the enable and use the address lines as select – the selected output will follow the data (inverted if outputs are active‑low).</li>
          <li><strong>Glitch prevention:</strong> Ensure that the enable is stable while address lines change, or use the enable to gate the address lines to avoid output glitches.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the purpose of an enable input on a decoder.</li>
          <li>I can read and interpret a truth table with an enable.</li>
          <li>I can write Boolean expressions that include the enable.</li>
          <li>I know how to use enables to cascade decoders.</li>
          <li>I am aware of the polarity (active‑high vs. active‑low) and its implications.</li>
          <li>I can apply decoders with enables in real‑world systems like memory addressing.</li>
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
          “The enable input is a small addition with huge consequences. In my Shyamnagar lab, we start with a 2:4 decoder built from gates, then add an enable and see how it controls the whole circuit. Students quickly grasp that the enable is like a master switch. We then use it to cascade decoders, which is the foundation of memory expansion. I emphasize that every memory chip in a computer has a chip‑select (enable) pin, and understanding this is key to interfacing with microprocessors. This topic neatly ties together gates, decoders, and system‑level design.”
        </p>
      </section>
    </div>
  );
};

export default Topic31;