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

const Topic21 = () => {
  // Truth table for 4:2 encoder
  const truthTable = [
    { I3: 0, I2: 0, I1: 0, I0: 1, A1: 0, A0: 0 },
    { I3: 0, I2: 0, I1: 1, I0: 0, A1: 0, A0: 1 },
    { I3: 0, I2: 1, I1: 0, I0: 0, A1: 1, A0: 0 },
    { I3: 1, I2: 0, I1: 0, I0: 0, A1: 1, A0: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">4:2 Encoder</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A combinational circuit that converts one of four active inputs into a 2-bit binary code.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> encoder_4to2(I3, I2, I1, I0) → (A1, A0)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> I0, I1, I2, I3 (active-high, mutually exclusive)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> A1 (MSB), A0 (LSB) – binary code of the active input</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Encode four distinct signals into a 2-bit code; reduces the number of lines needed for transmission or storage.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In keyboard encoding, interrupt prioritization (with priority logic), and data compression applications.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Block Diagram</h2>
        <div className="flex justify-center">
          <div className="w-96 h-64 group">
            <svg viewBox="0 0 350 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Encoder block */}
              <rect x="100" y="40" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="160" y="100" fill="currentColor" fontSize="18" textAnchor="middle">ENCODER</text>
              <text x="160" y="125" fill="currentColor" fontSize="14" textAnchor="middle">4:2</text>

              {/* Inputs */}
              <line x1="30" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="65" fill="currentColor" fontSize="12">I0</text>
              <line x1="30" y1="90" x2="100" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="95" fill="currentColor" fontSize="12">I1</text>
              <line x1="30" y1="120" x2="100" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="125" fill="currentColor" fontSize="12">I2</text>
              <line x1="30" y1="150" x2="100" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="155" fill="currentColor" fontSize="12">I3</text>

              {/* Outputs */}
              <line x1="220" y1="80" x2="270" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="280" y="85" fill="currentColor" fontSize="14" fontWeight="bold">A0</text>
              <line x1="220" y1="120" x2="270" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="280" y="125" fill="currentColor" fontSize="14" fontWeight="bold">A1</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A 4:2 encoder accepts four inputs and produces a 2-bit binary output corresponding to the active input line.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-purple-300">I3</th><th className="py-2 px-2 text-purple-300">I2</th><th className="py-2 px-2 text-purple-300">I1</th><th className="py-2 px-2 text-purple-300">I0</th>
                <th className="py-2 px-2 text-purple-300">A1</th><th className="py-2 px-2 text-purple-300">A0</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-2">{row.I3}</td><td className="py-1 px-2">{row.I2}</td><td className="py-1 px-2">{row.I1}</td><td className="py-1 px-2">{row.I0}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.A1}</td><td className="py-1 px-2 font-bold text-green-400">{row.A0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Only one input is assumed active (1) at a time. The outputs give the binary index of the active input (I0 → 00, I1 → 01, I2 → 10, I3 → 11).
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            A1 = I2 + I3<br />
            A0 = I1 + I3
          </p>
          <p className="text-gray-300 mt-2 text-center">
            These are derived directly from the truth table. For A1, it is 1 when I2 or I3 is active. For A0, it is 1 when I1 or I3 is active.
          </p>
        </div>
      </section>

      {/* Gate-Level Circuit */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Gate-Level Implementation</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 450 200" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Inputs */}
              <line x1="30" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="45" fill="currentColor" fontSize="12">I0</text>
              <line x1="30" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="85" fill="currentColor" fontSize="12">I1</text>
              <line x1="30" y1="120" x2="80" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="125" fill="currentColor" fontSize="12">I2</text>
              <line x1="30" y1="160" x2="80" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="165" fill="currentColor" fontSize="12">I3</text>

              {/* OR for A1 (I2 + I3) */}
              <path d="M150 100 L180 100 L190 120 L180 140 L150 140 L150 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M140 100 L150 120 L140 140" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="165" y="125" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>
              <line x1="80" y1="120" x2="140" y2="120" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="160" x2="140" y2="160" stroke="currentColor" strokeWidth="2" />
              <line x1="140" y1="120" x2="140" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="140" y1="160" x2="140" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="190" y1="120" x2="250" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="125" fill="currentColor" fontSize="14" fontWeight="bold">A1</text>

              {/* OR for A0 (I1 + I3) */}
              <path d="M150 40 L180 40 L190 60 L180 80 L150 80 L150 40" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M140 40 L150 60 L140 80" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="165" y="65" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>
              <line x1="80" y1="80" x2="140" y2="60" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="160" x2="140" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="140" y1="60" x2="140" y2="70" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="190" y1="60" x2="250" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="65" fill="currentColor" fontSize="14" fontWeight="bold">A0</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The 4:2 encoder requires only two OR gates. No inverters are needed because the inputs are active-high and mutually exclusive.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Example</h2>
        <p className="text-gray-300 mb-3">
          A classic example is a <strong>simple keypad encoder</strong>. Imagine four pushbuttons labeled with digits 0, 1, 2, 3. When Swadeep presses button 2, the encoder outputs binary 10. This code can be sent to a display or a microcontroller.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I0 (button 0) → output 00</li>
          <li>I1 (button 1) → output 01</li>
          <li>I2 (button 2) → output 10</li>
          <li>I3 (button 3) → output 11</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Shyamnagar lab, students build this circuit with pushbuttons and LEDs to see the encoding in action. However, they quickly discover the problem: pressing two buttons simultaneously gives a wrong output, leading to the need for a priority encoder.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Why is I3 connected to both OR gates? (Because its binary code is 11, so it contributes to both A1 and A0.)</li>
          <li>What would the output be if I0 and I1 are pressed together? (A1 = 0, A0 = 1 → code 01, which incorrectly indicates I1 only.)</li>
          <li>Try designing an 8:3 encoder using the same pattern. How many OR gates? (Three OR gates, each with four inputs.)</li>
          <li>What happens if no input is active? (The output is 00, which is the same as I0's code – ambiguity! This is why some encoders include a "valid" flag.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Assuming multiple inputs can be active:</strong> Basic 4:2 encoders assume mutual exclusion; otherwise output is invalid.</li>
          <li><strong>Misinterpreting I0:</strong> When I0 is active, outputs are 00, which is easily confused with "no input" case.</li>
          <li><strong>Forgetting that I3 contributes to both outputs:</strong> Its minterms are 11, so it must be ORed into both A1 and A0.</li>
          <li><strong>Using AND gates instead of OR:</strong> The expressions are sums, not products.</li>
          <li><strong>Leaving unused inputs floating:</strong> In a real circuit, all inputs should be pulled to GND to avoid spurious activation.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always include a "valid" output if the all-zero input state is possible. (e.g., an additional output V = I0 + I1 + I2 + I3).</li>
          <li>Use priority encoders (Topic 23) when multiple inputs may be active simultaneously.</li>
          <li>Label inputs clearly with their binary weights to avoid confusion.</li>
          <li>Simulate the circuit with all input combinations, including the all-zero case.</li>
          <li>In VHDL/Verilog, use a 'case' statement with a 'when others' clause to handle all possibilities.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Expanding to 8:3:</strong> Use the same pattern: A0 = I1+I3+I5+I7, A1 = I2+I3+I6+I7, A2 = I4+I5+I6+I7.</li>
          <li><strong>Valid flag:</strong> Add an OR gate across all inputs to indicate that at least one input is active.</li>
          <li><strong>IC packages:</strong> For a ready-made 4:2 encoder, you can use a 74HC148 (8:3) and ignore the extra inputs, or combine two OR gates from a 7432.</li>
          <li><strong>Debouncing:</strong> If the inputs come from mechanical switches, use debouncing circuits to avoid multiple transitions.</li>
          <li><strong>Priority vs. basic:</strong> In practice, priority encoders are almost always used because multiple inputs can occur (e.g., two keys pressed simultaneously).</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for a 4:2 encoder.</li>
          <li>I can write the Boolean expressions: A1 = I2 + I3, A0 = I1 + I3.</li>
          <li>I can implement the circuit using two OR gates.</li>
          <li>I understand the limitation when multiple inputs are active.</li>
          <li>I know that I0 active produces 00, which is ambiguous with the no-input case.</li>
          <li>I can extend the pattern to larger encoders (e.g., 8:3).</li>
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
          “The 4:2 encoder is deceptively simple, but it exposes a key limitation: what happens when two inputs are active? In my Barrackpore class, after building the circuit with OR gates, I ask Abhronila and Debangshu to press two buttons simultaneously. The LEDs show a wrong code, and the lightbulb moment happens – they understand why we need priority encoders. I also emphasize the pattern for larger encoders; students quickly see that each output is the OR of inputs whose binary representation has a 1 in that bit position. This insight makes the 8:3 encoder (next topic) a simple extension.”
        </p>
      </section>
    </div>
  );
};

export default Topic21;