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

const Topic22 = () => {
  // Truth table for 8:3 encoder (only one input active)
  const truthTable = [
    { I7:0, I6:0, I5:0, I4:0, I3:0, I2:0, I1:0, I0:1, A2:0, A1:0, A0:0 },
    { I7:0, I6:0, I5:0, I4:0, I3:0, I2:0, I1:1, I0:0, A2:0, A1:0, A0:1 },
    { I7:0, I6:0, I5:0, I4:0, I3:0, I2:1, I1:0, I0:0, A2:0, A1:1, A0:0 },
    { I7:0, I6:0, I5:0, I4:0, I3:1, I2:0, I1:0, I0:0, A2:0, A1:1, A0:1 },
    { I7:0, I6:0, I5:0, I4:1, I3:0, I2:0, I1:0, I0:0, A2:1, A1:0, A0:0 },
    { I7:0, I6:0, I5:1, I4:0, I3:0, I2:0, I1:0, I0:0, A2:1, A1:0, A0:1 },
    { I7:0, I6:1, I5:0, I4:0, I3:0, I2:0, I1:0, I0:0, A2:1, A1:1, A0:0 },
    { I7:1, I6:0, I5:0, I4:0, I3:0, I2:0, I1:0, I0:0, A2:1, A1:1, A0:1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">8:3 Encoder</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Converts one of eight active inputs into a 3-bit binary code – a common building block in digital systems.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> encoder_8to3(I7, I6, I5, I4, I3, I2, I1, I0) → (A2, A1, A0)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> I0–I7 (active-high, mutually exclusive)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> A2 (MSB), A1, A0 (LSB) – binary code of the active input</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Encode eight distinct signals into a 3-bit code; reduces the number of lines needed for transmission, storage, or processing.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In keyboard encoders, interrupt controllers, data compression, and as a building block for larger encoders.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Block Diagram</h2>
        <div className="flex justify-center">
          <div className="w-96 h-72 group">
            <svg viewBox="0 0 350 250" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Encoder block */}
              <rect x="120" y="60" width="120" height="140" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="180" y="120" fill="currentColor" fontSize="18" textAnchor="middle">ENCODER</text>
              <text x="180" y="150" fill="currentColor" fontSize="14" textAnchor="middle">8:3</text>

              {/* Inputs */}
              <line x1="50" y1="70" x2="120" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="75" fill="currentColor" fontSize="10">I0</text>
              <line x1="50" y1="90" x2="120" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="95" fill="currentColor" fontSize="10">I1</text>
              <line x1="50" y1="110" x2="120" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="115" fill="currentColor" fontSize="10">I2</text>
              <line x1="50" y1="130" x2="120" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="135" fill="currentColor" fontSize="10">I3</text>
              <line x1="50" y1="150" x2="120" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="155" fill="currentColor" fontSize="10">I4</text>
              <line x1="50" y1="170" x2="120" y2="170" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="175" fill="currentColor" fontSize="10">I5</text>
              <line x1="50" y1="190" x2="120" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="195" fill="currentColor" fontSize="10">I6</text>
              <line x1="50" y1="210" x2="120" y2="210" stroke="currentColor" strokeWidth="2" />
              <text x="35" y="215" fill="currentColor" fontSize="10">I7</text>

              {/* Outputs */}
              <line x1="240" y1="110" x2="290" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="115" fill="currentColor" fontSize="14" fontWeight="bold">A0</text>
              <line x1="240" y1="140" x2="290" y2="140" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="145" fill="currentColor" fontSize="14" fontWeight="bold">A1</text>
              <line x1="240" y1="170" x2="290" y2="170" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="175" fill="currentColor" fontSize="14" fontWeight="bold">A2</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          An 8:3 encoder accepts eight inputs and produces a 3-bit binary output corresponding to the active input line.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-1 px-1">I7</th><th>I6</th><th>I5</th><th>I4</th><th>I3</th><th>I2</th><th>I1</th><th>I0</th>
                <th className="text-purple-300">A2</th><th className="text-purple-300">A1</th><th className="text-purple-300">A0</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td>{row.I7}</td><td>{row.I6}</td><td>{row.I5}</td><td>{row.I4}</td><td>{row.I3}</td><td>{row.I2}</td><td>{row.I1}</td><td>{row.I0}</td>
                  <td className="font-bold text-green-400">{row.A2}</td>
                  <td className="font-bold text-green-400">{row.A1}</td>
                  <td className="font-bold text-green-400">{row.A0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Only one input is assumed active (1) at a time. The outputs give the binary index of the active input (I0 → 000, I1 → 001, ..., I7 → 111).
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-lg text-center">
            A0 = I1 + I3 + I5 + I7<br />
            A1 = I2 + I3 + I6 + I7<br />
            A2 = I4 + I5 + I6 + I7
          </p>
          <p className="text-gray-300 mt-2 text-center">
            These are derived from the truth table: each output is the OR of inputs whose binary code has a 1 in that bit position.
          </p>
        </div>
      </section>

      {/* Gate-Level Circuit */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Gate-Level Implementation</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl group">
            <svg viewBox="0 0 600 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Inputs */}
              <line x1="30" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="45" fill="currentColor" fontSize="10">I0</text>
              <line x1="30" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="75" fill="currentColor" fontSize="10">I1</text>
              <line x1="30" y1="100" x2="80" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="105" fill="currentColor" fontSize="10">I2</text>
              <line x1="30" y1="130" x2="80" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="135" fill="currentColor" fontSize="10">I3</text>
              <line x1="30" y1="160" x2="80" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="165" fill="currentColor" fontSize="10">I4</text>
              <line x1="30" y1="190" x2="80" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="195" fill="currentColor" fontSize="10">I5</text>
              <line x1="30" y1="220" x2="80" y2="220" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="225" fill="currentColor" fontSize="10">I6</text>
              <line x1="30" y1="250" x2="80" y2="250" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="255" fill="currentColor" fontSize="10">I7</text>

              {/* OR for A0 (I1+I3+I5+I7) */}
              <path d="M200 70 L230 70 L240 90 L230 110 L200 110 L200 70" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M190 70 L200 90 L190 110" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="215" y="95" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>
              <line x1="80" y1="70" x2="190" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="130" x2="190" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="190" x2="190" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="250" x2="190" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="240" y1="90" x2="300" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="95" fill="currentColor" fontSize="12" fontWeight="bold">A0</text>

              {/* OR for A1 (I2+I3+I6+I7) */}
              <path d="M350 100 L380 100 L390 120 L380 140 L350 140 L350 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M340 100 L350 120 L340 140" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="365" y="125" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>
              <line x1="80" y1="100" x2="340" y2="120" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="130" x2="340" y2="120" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="220" x2="340" y2="120" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="250" x2="340" y2="120" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="390" y1="120" x2="450" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="460" y="125" fill="currentColor" fontSize="12" fontWeight="bold">A1</text>

              {/* OR for A2 (I4+I5+I6+I7) */}
              <path d="M200 180 L230 180 L240 200 L230 220 L200 220 L200 180" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M190 180 L200 200 L190 220" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="215" y="205" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>
              <line x1="80" y1="160" x2="190" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="190" x2="190" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="220" x2="190" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="250" x2="190" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="240" y1="200" x2="300" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="205" fill="currentColor" fontSize="12" fontWeight="bold">A2</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The 8:3 encoder requires three OR gates, each with four inputs. No inverters are needed because inputs are active-high and mutually exclusive.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Example</h2>
        <p className="text-gray-300 mb-3">
          A classic example is an <strong>8-key keypad encoder</strong>. Imagine a telephone keypad with digits 0–7. When Tuhina presses key '5', the encoder outputs binary 101, which can be sent to a microcontroller or display.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I0 (key 0) → output 000</li>
          <li>I1 (key 1) → output 001</li>
          <li>I2 (key 2) → output 010</li>
          <li>I3 (key 3) → output 011</li>
          <li>I4 (key 4) → output 100</li>
          <li>I5 (key 5) → output 101</li>
          <li>I6 (key 6) → output 110</li>
          <li>I7 (key 7) → output 111</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build this circuit with pushbuttons and LEDs. They quickly notice that pressing two keys simultaneously produces a wrong output, highlighting the need for priority encoders (Topic 23).
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Observe the pattern: each output is the OR of inputs whose binary index has a 1 in that bit position. Can you see why?</li>
          <li>What would the Boolean expressions be for a 16:4 encoder? (A0 = I1+I3+I5+I7+I9+I11+I13+I15, etc.)</li>
          <li>If no input is active, all outputs are 0, which is the same as the code for I0. How could you distinguish these two cases? (Add a valid flag output.)</li>
          <li>Try designing an 8:3 encoder using only 4:2 encoder modules and additional logic.</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Assuming multiple inputs can be active:</strong> Basic 8:3 encoders assume mutual exclusion; otherwise output is invalid.</li>
          <li><strong>Misinterpreting I0:</strong> When I0 is active, outputs are 000, which is easily confused with "no input" case.</li>
          <li><strong>Forgetting the pattern:</strong> Each output must include all inputs where the corresponding bit is 1. Missing any input leads to incorrect encoding.</li>
          <li><strong>Using AND gates instead of OR:</strong> The expressions are sums (OR), not products (AND).</li>
          <li><strong>Leaving unused inputs floating:</strong> In a real circuit, all inputs should be pulled to GND to avoid spurious activation.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always include a "valid" output (e.g., V = I0+I1+...+I7) to distinguish the all-zero input case from I0 active.</li>
          <li>Use priority encoders (like 74148) when multiple inputs may be active simultaneously.</li>
          <li>Label inputs clearly with their binary weights (I0=000, I7=111).</li>
          <li>Simulate the circuit with all input combinations, including the all-zero case and multiple-active cases to verify expected behavior.</li>
          <li>In VHDL/Verilog, use a 'case' statement with a 'when others' clause to handle all possibilities.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Valid flag:</strong> Add an 8-input OR gate to generate a "group select" signal indicating that at least one input is active.</li>
          <li><strong>Expanding to 16:4:</strong> Use two 8:3 encoders with additional logic (OR gates and a multiplexer) to handle 16 inputs.</li>
          <li><strong>IC packages:</strong> The 74148 is an 8:3 priority encoder with active-low inputs and outputs, widely used in interrupt controllers.</li>
          <li><strong>Debouncing:</strong> If inputs come from mechanical switches, use debouncing circuits to avoid multiple transitions.</li>
          <li><strong>Active-low inputs:</strong> Many practical encoders use active-low inputs for noise immunity; adjust your design accordingly.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for an 8:3 encoder.</li>
          <li>I can write the Boolean expressions: A0 = I1+I3+I5+I7, A1 = I2+I3+I6+I7, A2 = I4+I5+I6+I7.</li>
          <li>I can implement the circuit using three OR gates.</li>
          <li>I understand the limitation when multiple inputs are active.</li>
          <li>I know that I0 active produces 000, which is ambiguous with the no-input case.</li>
          <li>I can extend the pattern to larger encoders (e.g., 16:4).</li>
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
          “The 8:3 encoder is where the pattern becomes crystal clear. I show my students in Barrackpore how each output corresponds to the OR of inputs where that bit is 1 in the binary index. They quickly see that A2 is I4–I7 because those numbers have the MSB set. Then we build it with OR gates and test it with eight switches. The 'aha' moment comes when they press two switches and get a wrong output – the perfect lead-in to priority encoders. I always emphasize that this pattern scales: for an N:log₂N encoder, each output is the OR of half the inputs. It's a beautiful example of how binary representation maps directly to hardware.”
        </p>
      </section>
    </div>
  );
};

export default Topic22;