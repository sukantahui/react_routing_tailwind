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

const Topic10 = () => {
  // Truth table for 8:1 multiplexer (IC 74151)
  // Assume S2, S1, S0 are select lines (S2 MSB, S0 LSB)
  // Enable is active low: when E = 1, outputs are disabled (Y=0, W=1)
  // When E = 0, Y = Dn, W = not Dn based on select
  const truthTable = [
    { E: 0, S2: 0, S1: 0, S0: 0, Y: 'D0', W: 'D0\'' },
    { E: 0, S2: 0, S1: 0, S0: 1, Y: 'D1', W: 'D1\'' },
    { E: 0, S2: 0, S1: 1, S0: 0, Y: 'D2', W: 'D2\'' },
    { E: 0, S2: 0, S1: 1, S0: 1, Y: 'D3', W: 'D3\'' },
    { E: 0, S2: 1, S1: 0, S0: 0, Y: 'D4', W: 'D4\'' },
    { E: 0, S2: 1, S1: 0, S0: 1, Y: 'D5', W: 'D5\'' },
    { E: 0, S2: 1, S1: 1, S0: 0, Y: 'D6', W: 'D6\'' },
    { E: 0, S2: 1, S1: 1, S0: 1, Y: 'D7', W: 'D7\'' },
    { E: 1, S2: 'X', S1: 'X', S0: 'X', Y: 0, W: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">8:1 Multiplexer (IC 74151)</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A single-chip 8-input multiplexer with complementary outputs and active-low enable.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">IC 74151 Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> D0–D7 (data), A, B, C (select lines), G (active-low enable)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Y (true output), W (inverted output)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Select lines:</span> A (LSB), B, C (MSB) – 8 combinations</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Select one of eight data sources; complementary outputs eliminate need for external inverter.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In data routing, function generation, and as a building block for larger multiplexers.</p>
          </div>
        </div>
      </section>

      {/* Pinout / Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 IC 74151 Pinout / Block Diagram</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md group">
            <svg viewBox="0 0 300 220" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* IC rectangle */}
              <rect x="60" y="20" width="180" height="180" rx="10" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="150" y="110" fill="currentColor" fontSize="16" textAnchor="middle">74151</text>
              
              {/* Data inputs left side */}
              <line x1="20" y1="35" x2="60" y2="35" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="40" fill="currentColor" fontSize="12">D0</text>
              <line x1="20" y1="55" x2="60" y2="55" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="60" fill="currentColor" fontSize="12">D1</text>
              <line x1="20" y1="75" x2="60" y2="75" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="80" fill="currentColor" fontSize="12">D2</text>
              <line x1="20" y1="95" x2="60" y2="95" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="100" fill="currentColor" fontSize="12">D3</text>
              <line x1="20" y1="115" x2="60" y2="115" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="120" fill="currentColor" fontSize="12">D4</text>
              <line x1="20" y1="135" x2="60" y2="135" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="140" fill="currentColor" fontSize="12">D5</text>
              <line x1="20" y1="155" x2="60" y2="155" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="160" fill="currentColor" fontSize="12">D6</text>
              <line x1="20" y1="175" x2="60" y2="175" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="180" fill="currentColor" fontSize="12">D7</text>

              {/* Select lines bottom */}
              <line x1="80" y1="200" x2="80" y2="220" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="235" fill="currentColor" fontSize="12">A (LSB)</text>
              <line x1="130" y1="200" x2="130" y2="220" stroke="currentColor" strokeWidth="2" />
              <text x="130" y="235" fill="currentColor" fontSize="12">B</text>
              <line x1="180" y1="200" x2="180" y2="220" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="235" fill="currentColor" fontSize="12">C (MSB)</text>

              {/* Enable bottom */}
              <line x1="230" y1="200" x2="230" y2="220" stroke="currentColor" strokeWidth="2" />
              <text x="230" y="235" fill="currentColor" fontSize="12">G (EN)</text>

              {/* Outputs right side */}
              <line x1="240" y1="70" x2="280" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="75" fill="currentColor" fontSize="14">Y</text>
              <line x1="240" y1="130" x2="280" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="135" fill="currentColor" fontSize="14">W</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            The IC 74151 has 8 data inputs, 3 select lines (A LSB, C MSB), an active-low enable (G), and complementary outputs Y and W.
          </p>
        </div>
      </section>

      {/* Logic Symbol */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔣 Logic Symbol (8:1 MUX)</h2>
        <div className="flex justify-center">
          <div className="w-80 h-56 group">
            <svg viewBox="0 0 300 180" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Trapezoid MUX symbol */}
              <polygon points="80,30 220,30 220,150 80,150 50,90" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="150" y="90" fill="currentColor" fontSize="20" textAnchor="middle">MUX</text>
              <text x="150" y="115" fill="currentColor" fontSize="16" textAnchor="middle">8:1</text>
              
              {/* Data inputs (grouped) */}
              <line x1="30" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="45" fill="currentColor" fontSize="12">D0</text>
              <line x1="30" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="75" fill="currentColor" fontSize="12">D1</text>
              <line x1="30" y1="100" x2="80" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="105" fill="currentColor" fontSize="12">D2</text>
              <line x1="30" y1="130" x2="80" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="135" fill="currentColor" fontSize="12">D3</text>
              <text x="45" y="160" fill="currentColor" fontSize="12" opacity="0.7">... D4-D7</text>
              
              {/* Select lines */}
              <line x1="140" y1="150" x2="140" y2="180" stroke="currentColor" strokeWidth="2" />
              <text x="140" y="195" fill="currentColor" fontSize="12">A</text>
              <line x1="170" y1="150" x2="170" y2="180" stroke="currentColor" strokeWidth="2" />
              <text x="170" y="195" fill="currentColor" fontSize="12">B</text>
              <line x1="200" y1="150" x2="200" y2="180" stroke="currentColor" strokeWidth="2" />
              <text x="200" y="195" fill="currentColor" fontSize="12">C</text>
              
              {/* Enable (active low) */}
              <line x1="110" y1="150" x2="110" y2="180" stroke="currentColor" strokeWidth="2" />
              <circle cx="110" cy="165" r="2" fill="currentColor" />
              <text x="110" y="195" fill="currentColor" fontSize="12">G</text>
              
              {/* Outputs */}
              <line x1="220" y1="70" x2="270" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="280" y="75" fill="currentColor" fontSize="14">Y</text>
              <line x1="220" y1="110" x2="270" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="280" y="115" fill="currentColor" fontSize="14">W</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-center">The bubble on G indicates active-low enable. W is the inverted output.</p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (IC 74151)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-3xl mx-auto text-center border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-purple-300">G (Enable)</th>
                <th className="py-2 px-2 text-purple-300">C (MSB)</th>
                <th className="py-2 px-2 text-purple-300">B</th>
                <th className="py-2 px-2 text-purple-300">A (LSB)</th>
                <th className="py-2 px-2 text-purple-300">Y</th>
                <th className="py-2 px-2 text-purple-300">W</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-2">{row.E}</td>
                  <td className="py-1 px-2">{row.S2}</td>
                  <td className="py-1 px-2">{row.S1}</td>
                  <td className="py-1 px-2">{row.S0}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.Y}</td>
                  <td className="py-1 px-2 font-bold text-yellow-400">{row.W}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          When G = 1 (inactive), Y = 0 and W = 1 regardless of select lines. When G = 0, the selected data input appears at Y, and its complement at W.
        </p>
      </section>

      {/* Boolean Expression */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expression</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            Y = G' · (C'B'A'·D0 + C'B'A·D1 + C'BA'·D2 + C'BA·D3 + CB'A'·D4 + CB'A·D5 + CBA'·D6 + CBA·D7)
          </p>
          <p className="font-mono text-green-400 text-xl text-center">
            W = G' · (C'B'A'·D0' + C'B'A·D1' + ... )  [or simply W = Y']
          </p>
          <p className="text-gray-300 mt-2 text-center">
            Since W is the complement of Y when enabled, W = Y' (when G=0). When G=1, Y=0, W=1.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          The 74151 is widely used in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Data acquisition:</strong> Select one of eight sensor inputs for processing.</li>
          <li><strong>Memory addressing:</strong> Route address lines to different memory banks.</li>
          <li><strong>Function generators:</strong> Implement any 4-variable Boolean function by tying D0–D7 to VCC or GND.</li>
          <li><strong>Cascading:</strong> Combine multiple 74151s to create 16:1, 32:1, or larger multiplexers.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students use a 74151 to select which of eight switches' states is displayed on a single LED, controlled by three pushbuttons (select lines) and a master enable.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Why does the 74151 have both Y and W outputs? (To provide both true and complemented signals without extra gates.)</li>
          <li>Observe carefully: The enable is active-low. What happens if you leave the enable pin floating? (It might float to an indeterminate state; always connect it to GND or VCC.)</li>
          <li>Try using the 74151 to implement a full adder's sum or carry function by connecting D0–D7 to appropriate constants.</li>
          <li>How would you cascade two 74151s to make a 16:1 multiplexer? (Use the enable pins and an additional select line.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Forgetting the active-low enable:</strong> Assuming enable = 1 enables the chip can lead to no output.</li>
          <li><strong>Incorrect select line order:</strong> Mixing up A (LSB) and C (MSB) will select the wrong input.</li>
          <li><strong>Leaving enable floating:</strong> Unconnected TTL inputs may float high, disabling the chip unexpectedly.</li>
          <li><strong>Ignoring output current limits:</strong> The 74151 can only source/sink a limited current; driving LEDs directly may require resistors.</li>
          <li><strong>Not tying unused data inputs:</strong> Unused D inputs should be connected to GND or VCC to avoid noise.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always connect unused data inputs to a known logic level (GND or VCC) through a resistor if necessary.</li>
          <li>Pull the enable pin low through a resistor to keep the chip enabled; use a switch to control it.</li>
          <li>Decouple the power supply with a 0.1µF capacitor near the IC to reduce noise.</li>
          <li>In schematics, label the select lines with their weight (A=LSB, C=MSB) to avoid confusion.</li>
          <li>When cascading, use the enable pins to select the appropriate chip.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Implementing logic functions:</strong> To implement any 4-variable function, connect the three select lines to three variables, and tie D0–D7 to 0, 1, or the fourth variable as needed.</li>
          <li><strong>Complementary outputs:</strong> Use W when you need an inverted signal without an extra inverter – saves gates and propagation delay.</li>
          <li><strong>Cascading:</strong> To make a 16:1 MUX, use two 74151s with their enables driven by an additional select line (via an inverter if needed).</li>
          <li><strong>Power-up state:</strong> On power-up, the enable might be high; ensure your circuit initializes correctly.</li>
          <li><strong>High-speed design:</strong> The 74151 has a typical propagation delay of ~20ns; for faster systems, consider 74F151 or 74HC151.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I know the pinout of IC 74151: D0–D7, A, B, C, G, Y, W, VCC, GND.</li>
          <li>I understand the truth table: when G=0, Y = Dn and W = not Dn based on select lines.</li>
          <li>I can use the 74151 to implement any 4-variable logic function.</li>
          <li>I know how to cascade multiple 74151s to build larger multiplexers.</li>
          <li>I can identify the active-low enable and use it correctly.</li>
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
          “The 74151 is a classic chip that every student should work with hands-on. In my classes at Barrackpore, we build a simple circuit where eight switches provide data, three pushbuttons select the channel, and an LED shows the output. The complementary output W is handy for driving both an LED and its inverse for a second indicator. I emphasize the active-low enable because it's a common source of confusion. Once students master the 74151, they can tackle larger multiplexers with confidence. Remember to always check the datasheet for pin assignments – they can vary slightly between manufacturers.”
        </p>
      </section>
    </div>
  );
};

export default Topic10;