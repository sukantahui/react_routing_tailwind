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

const Topic30 = () => {
  // Example: Full adder Sum using 3:8 decoder + OR
  // Truth table for Sum (A,B,Cin)
  const sumMinterms = [1, 2, 4, 7]; // Rows where Sum=1

  // Example: Full adder Carry using 3:8 decoder + OR
  const carryMinterms = [3, 5, 6, 7]; // Rows where Carry=1

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Implementing Boolean Functions using Decoders</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A decoder generates all minterms of its inputs. By OR-ing the appropriate minterms, we can realize any Boolean function.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Concept Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Idea:</span> An n-to-2ⁿ decoder produces all 2ⁿ minterms of its n input variables. Any Boolean function of these n variables can be expressed as a sum of minterms (SOP). By feeding the decoder outputs into an OR gate (or multiple OR gates for multiple outputs), we can implement the function.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Why it works:</span> The decoder generates the minterms, and the OR gate combines the required ones. This is a direct hardware realization of the SOP form.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In simple control logic, instruction decoding, and as a teaching tool for understanding the relationship between minterms and hardware.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 General Block Diagram</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Decoder */}
              <rect x="50" y="40" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="110" y="100" fill="currentColor" fontSize="14" textAnchor="middle">DECODER</text>
              <text x="110" y="120" fill="currentColor" fontSize="12" textAnchor="middle">n:2ⁿ</text>

              {/* Inputs */}
              <line x1="20" y1="70" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="75" fill="currentColor" fontSize="10">A0</text>
              <line x1="20" y1="100" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="105" fill="currentColor" fontSize="10">A1</text>
              <line x1="20" y1="130" x2="50" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="135" fill="currentColor" fontSize="10">A2</text>

              {/* Outputs (minterms) */}
              <line x1="170" y1="50" x2="220" y2="50" stroke="currentColor" strokeWidth="2" />
              <text x="230" y="55" fill="currentColor" fontSize="8">m0</text>
              <line x1="170" y1="70" x2="220" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="230" y="75" fill="currentColor" fontSize="8">m1</text>
              <line x1="170" y1="90" x2="220" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="230" y="95" fill="currentColor" fontSize="8">m2</text>
              <line x1="170" y1="110" x2="220" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="230" y="115" fill="currentColor" fontSize="8">m3</text>
              <text x="195" y="135" fill="currentColor" fontSize="8">...</text>

              {/* OR gate */}
              <path d="M300 70 L330 70 L340 90 L330 110 L300 110 L300 70" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M290 70 L300 90 L290 110" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="315" y="95" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>

              {/* Connections from selected minterms to OR */}
              <line x1="220" y1="50" x2="290" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="220" y1="70" x2="290" y2="85" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="220" y1="110" x2="290" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />

              {/* Output */}
              <line x1="340" y1="90" x2="380" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="390" y="95" fill="currentColor" fontSize="12">F</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The decoder generates all minterms. The OR gate combines the minterms where the function is 1.
        </p>
      </section>

      {/* Example: Full Adder Sum using 3:8 decoder + OR */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Example: Full Adder Sum using 3:8 Decoder</h2>
        <p className="text-gray-300 mb-4">
          The full adder sum is S = Σ(1,2,4,7). Using a 3:8 decoder (inputs A, B, Cin), we connect the decoder outputs m1, m2, m4, m7 to a 4-input OR gate. The OR output is the Sum.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200 font-mono text-center">
            Sum = m1 + m2 + m4 + m7
          </p>
          <p className="text-gray-300 mt-2 text-center">
            Where m1 = A'·B'·Cin, m2 = A'·B·Cin', m4 = A·B'·Cin', m7 = A·B·Cin.
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-md group">
            <svg viewBox="0 0 400 150" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Decoder (simplified) */}
              <rect x="30" y="20" width="100" height="100" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="70" fill="currentColor" fontSize="10" textAnchor="middle">3:8</text>
              <text x="80" y="90" fill="currentColor" fontSize="8" textAnchor="middle">Decoder</text>

              {/* OR gate */}
              <path d="M200 50 L230 50 L240 70 L230 90 L200 90 L200 50" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M190 50 L200 70 L190 90" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="215" y="75" fill="currentColor" fontSize="8" textAnchor="middle">≥1</text>

              {/* Connect m1, m2, m4, m7 to OR */}
              <line x1="130" y1="30" x2="190" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="130" y1="45" x2="190" y2="65" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="130" y1="75" x2="190" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="130" y1="90" x2="190" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />

              {/* Output */}
              <line x1="240" y1="70" x2="280" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="75" fill="currentColor" fontSize="10">Sum</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Example: Full Adder Carry using 3:8 decoder + OR */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Example: Full Adder Carry using 3:8 Decoder</h2>
        <p className="text-gray-300 mb-4">
          The full adder carry is Cout = Σ(3,5,6,7). Connect decoder outputs m3, m5, m6, m7 to a 4-input OR gate.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200 font-mono text-center">
            Cout = m3 + m5 + m6 + m7
          </p>
          <p className="text-gray-300 mt-2">
            This demonstrates that multiple functions can be implemented from the same decoder by using separate OR gates.
          </p>
        </div>
      </section>

      {/* Multiple Outputs */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 Implementing Multiple Functions</h2>
        <p className="text-gray-300 mb-4">
          A single decoder can serve multiple functions simultaneously. For example, to implement both Sum and Carry of a full adder, we use the same 3:8 decoder and two OR gates – one for each function.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200">
            This is more efficient than building separate circuits, especially when many functions share the same input variables.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Decoder-based function implementation is used in:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Microinstruction decoding:</strong> In a microprogrammed control unit, a decoder generates control signals based on the opcode.</li>
          <li><strong>Look-up tables (LUTs) in FPGAs:</strong> Small LUTs are essentially small decoders followed by a memory or multiplexer.</li>
          <li><strong>Arithmetic circuits:</strong> Adder, subtractor, and multiplier control logic can be built with decoders and OR gates.</li>
          <li><strong>Display decoders:</strong> BCD to 7-segment decoders are a classic example (though they use a more complex mapping).</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students use a 74138 and a 7432 (OR gates) to build a full adder, seeing how the minterms combine to produce the sum and carry.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>What is the advantage of using a decoder over discrete gates? (You get all minterms for free; complex functions become simple OR of selected minterms.)</li>
          <li>Observe carefully: The decoder outputs are minterms. How would you implement a function in product-of-sums form? (Use a NOR of the maxterms, or invert the outputs and use AND.)</li>
          <li>Try implementing a 2-bit comparator (A=B) using a 2:4 decoder. (When A1A0 = B1B0, the output is 1. That's a single minterm.)</li>
          <li>What if your decoder has active-low outputs? How would you adapt? (Use NAND instead of OR, or add inverters.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using the wrong minterms:</strong> Double-check the truth table to ensure the correct minterms are ORed.</li>
          <li><strong>Forgetting that decoder outputs may be active-low:</strong> If using a 74138, the outputs are active-low, so you need to invert them or use a NAND gate as the OR.</li>
          <li><strong>OR gate fan-in:</strong> Ensure the OR gate has enough inputs for the number of minterms.</li>
          <li><strong>Ignoring unused outputs:</strong> Unconnected outputs are fine, but don't leave them floating if they are inputs to something else.</li>
          <li><strong>Confusing minterm numbers:</strong> Remember the order of inputs (LSB vs MSB) when mapping to minterms.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Start from a truth table and list the minterms where the function is 1.</li>
          <li>Choose a decoder with the correct number of inputs (n for n-variable function).</li>
          <li>If the decoder has active-low outputs, either invert them or use a NAND gate (since NAND with active-low inputs acts as OR).</li>
          <li>Use multiple OR gates for multiple functions sharing the same inputs.</li>
          <li>Simulate the circuit to verify that the OR output matches the truth table.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Active-low decoders:</strong> If your decoder has active-low outputs (like 74138), connect the selected outputs to a NAND gate. The NAND acts as an OR of the inverted inputs: <span className="font-mono">(m1'·m2'·...)' = m1 + m2 + ...</span></li>
          <li><strong>Using OR gates with many inputs:</strong> If you need an OR with more inputs than available, cascade OR gates or use a wired-OR (with open-collector outputs and pull-up).</li>
          <li><strong>Decoders with enable:</strong> The enable can be used as an additional input variable, effectively expanding the function by one more variable without a larger decoder.</li>
          <li><strong>FPGA implementation:</strong> Synthesis tools often map small functions to LUTs, which are essentially small decoders with configurable outputs.</li>
          <li><strong>Power saving:</strong> Only the selected minterms' outputs switch; the others are static, so power is moderate.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand that a decoder generates all minterms of its inputs.</li>
          <li>I can implement any SOP function by OR-ing the required minterms from a decoder.</li>
          <li>I can adapt the design for active-low decoder outputs.</li>
          <li>I can implement multiple functions from the same decoder.</li>
          <li>I know the limitations (fan-in, propagation delay) and how to address them.</li>
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
          “This topic beautifully ties together truth tables, minterms, and hardware. After covering decoders, I challenge my students in Barrackpore to build a full adder using a 74138 and a 7432. They see the minterms they wrote on paper become actual wires. The 'aha' moment is when they realize that any Boolean function can be built this way – it's a universal method. I remind them that this is exactly how early computers implemented control logic, and it's still used in FPGAs today. It's a perfect synthesis of theory and practice.”
        </p>
      </section>
    </div>
  );
};

export default Topic30;