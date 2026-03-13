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

const Topic13 = () => {
  // Example: Implement full adder Sum using 8:1 MUX
  // Truth table for Sum (A,B,Cin)
  const sumTruthTable = [
    { A:0, B:0, Cin:0, Sum:0 },
    { A:0, B:0, Cin:1, Sum:1 },
    { A:0, B:1, Cin:0, Sum:1 },
    { A:0, B:1, Cin:1, Sum:0 },
    { A:1, B:0, Cin:0, Sum:1 },
    { A:1, B:0, Cin:1, Sum:0 },
    { A:1, B:1, Cin:0, Sum:0 },
    { A:1, B:1, Cin:1, Sum:1 },
  ];

  // Example: Implement majority function using 4:1 MUX
  // Truth table for majority (A,B,C) – simplified by using C as data input
  const majorityTruthTable = [
    { A:0, B:0, C:0, Y:0 },
    { A:0, B:0, C:1, Y:0 },
    { A:0, B:1, C:0, Y:0 },
    { A:0, B:1, C:1, Y:1 },
    { A:1, B:0, C:0, Y:0 },
    { A:1, B:0, C:1, Y:1 },
    { A:1, B:1, C:0, Y:1 },
    { A:1, B:1, C:1, Y:1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Implementing Boolean Functions using Multiplexers</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Use a multiplexer as a universal logic module – any Boolean function can be realized by setting the data inputs appropriately.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Concept Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Idea:</span> A 2ⁿ:1 multiplexer can implement any n+1 variable Boolean function by connecting n variables to the select lines and the remaining variable(s) (or constants) to the data inputs.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Why it works:</span> The multiplexer output is a sum of minterms of the select variables, each multiplied by the corresponding data input. By setting each data input to 0, 1, or a function of the remaining variable(s), we can realize any truth table.</p>
          </div>
        </div>
      </section>

      {/* Method 1: Using n select variables + constants */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Method 1: n select variables, data inputs = constants (0/1)</h2>
        <p className="text-gray-300 mb-4">
          For a function of n variables, use an n:1 MUX with the n variables as select lines. The data inputs are set to 0 or 1 according to the truth table.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200 font-semibold mb-2">Example: Implement F(A,B,C) = Σ(1,2,4,7) using 8:1 MUX</p>
          <p className="font-mono text-green-400">Truth table:</p>
          <table className="w-full max-w-xs mx-auto text-center border-collapse text-sm mb-2">
            <thead><tr><th>A</th><th>B</th><th>C</th><th>F</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>0</td><td>0</td><td>1</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>0</td></tr>
              <tr><td>1</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>1</td><td>0</td><td>1</td><td>0</td></tr>
              <tr><td>1</td><td>1</td><td>0</td><td>0</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td></tr>
            </tbody>
          </table>
          <p className="text-gray-200">
            Connect A,B,C to select lines S2,S1,S0. Set D0=0, D1=1, D2=1, D3=0, D4=1, D5=0, D6=0, D7=1. Output Y = F.
          </p>
        </div>
      </section>

      {/* Method 2: Using n-1 select variables + data inputs as function of remaining variable */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Method 2: n-1 select variables, data inputs = function of remaining variable</h2>
        <p className="text-gray-300 mb-4">
          For an n-variable function, use an 2ⁿ⁻¹:1 MUX (i.e., n-1 select lines). Each data input is set to 0, 1, the remaining variable (say X), or its complement X'.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200 font-semibold mb-2">Example: Full Adder Sum (A,B,Cin) using 4:1 MUX</p>
          <p className="text-gray-300 mb-2">Sum = A ⊕ B ⊕ Cin. Use A,B as select lines (S1,S0) and Cin as data variable.</p>
          <table className="w-full max-w-sm mx-auto text-center border-collapse text-sm mb-2">
            <thead><tr><th>A</th><th>B</th><th>Sum</th><th>Data input</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>0</td><td>Cin</td><td>D0 = Cin</td></tr>
              <tr><td>0</td><td>1</td><td>Cin'</td><td>D1 = Cin'</td></tr>
              <tr><td>1</td><td>0</td><td>Cin'</td><td>D2 = Cin'</td></tr>
              <tr><td>1</td><td>1</td><td>Cin</td><td>D3 = Cin</td></tr>
            </tbody>
          </table>
          <p className="text-green-400 font-mono">Y = S1'S0'·Cin + S1'S0·Cin' + S1S0'·Cin' + S1S0·Cin</p>
        </div>
      </section>

      {/* Circuit Diagram Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 Circuit Example: Majority Function using 4:1 MUX</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 400 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* 4:1 MUX symbol */}
              <polygon points="150,50 250,50 250,200 150,200 130,125" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="190" y="125" fill="currentColor" fontSize="18" textAnchor="middle">MUX</text>
              <text x="190" y="150" fill="currentColor" fontSize="14" textAnchor="middle">4:1</text>
              
              {/* Data inputs */}
              <line x1="80" y1="70" x2="150" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="60" y="75" fill="currentColor" fontSize="12">D0 = 0</text>
              <line x1="80" y1="110" x2="150" y2="110" stroke="currentColor" strokeWidth="2" />
              <text x="60" y="115" fill="currentColor" fontSize="12">D1 = C</text>
              <line x1="80" y1="150" x2="150" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="60" y="155" fill="currentColor" fontSize="12">D2 = C</text>
              <line x1="80" y1="190" x2="150" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="60" y="195" fill="currentColor" fontSize="12">D3 = 1</text>

              {/* Select lines */}
              <line x1="200" y1="200" x2="200" y2="230" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="245" fill="currentColor" fontSize="12">S0 (B)</text>
              <line x1="170" y1="200" x2="170" y2="230" stroke="currentColor" strokeWidth="2" />
              <text x="140" y="245" fill="currentColor" fontSize="12">S1 (A)</text>

              {/* Output */}
              <line x1="250" y1="125" x2="300" y2="125" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="130" fill="currentColor" fontSize="14" fontWeight="bold">Y = Majority</text>

              {/* Additional annotations */}
              <text x="190" y="30" fill="currentColor" fontSize="12">Majority function: Y = AB + AC + BC</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            Implementing the majority function (A,B,C) using a 4:1 MUX. With A,B as select lines, D0=0, D1=C, D2=C, D3=1. Verify: when A=0,B=0 → Y=0; A=0,B=1 → Y=C; A=1,B=0 → Y=C; A=1,B=1 → Y=1.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Using multiplexers to implement Boolean functions is common in:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>FPGA Look-Up Tables (LUTs):</strong> The basic building block of FPGAs is a small multiplexer-based LUT that can implement any function of a few variables.</li>
          <li><strong>Function generators:</strong> In lab equipment, multiplexers are used to generate arbitrary waveforms by selecting pre-stored values.</li>
          <li><strong>Arithmetic logic units:</strong> ALU operations can be implemented with multiplexers selecting between different functions.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          For instance, in the Shyamnagar lab, students use a 74151 to implement a full adder, demonstrating how a single chip can replace multiple gates.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>When using an 8:1 MUX, how many variables can be implemented directly? (Three variables, with data inputs as constants.)</li>
          <li>Observe carefully: For an n-variable function, you can either use an n:1 MUX with constants, or an (n-1):1 MUX with the remaining variable as data.</li>
          <li>Try implementing the XOR function (A⊕B) using a 2:1 MUX. (Set D0 = B, D1 = B'.)</li>
          <li>Why is a multiplexer called a "universal logic module"? (Because it can implement any function by appropriately setting the data inputs.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Incorrect mapping:</strong> Assigning the wrong minterm to a data input – always double-check the truth table order.</li>
          <li><strong>Forgetting to connect unused data inputs:</strong> They must be tied to 0 or 1 to avoid floating inputs.</li>
          <li><strong>Using the wrong MUX size:</strong> For n variables, a 2ⁿ:1 MUX is needed if using all variables as selects; for (n-1) selects, you need a 2ⁿ⁻¹:1 MUX.</li>
          <li><strong>Confusing select line order:</strong> LSB vs MSB matters; the truth table must match the select order.</li>
          <li><strong>Assuming data inputs can be left unconnected:</strong> Floating inputs cause unpredictable outputs.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Start with a truth table of the function.</li>
          <li>Decide which variables will be select lines and which (if any) will be data inputs.</li>
          <li>For each combination of select lines, determine the required data input value (0,1, variable, or its complement).</li>
          <li>Label all pins clearly on your schematic.</li>
          <li>Test the implementation by simulating all input combinations.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using the enable pin:</strong> The enable can be used as an additional input, expanding the function by one more variable (with active-low enable acting as an inverter on a select line).</li>
          <li><strong>Shannon expansion:</strong> This method is based on Shannon's expansion theorem: f(x1,...,xn) = x1'·f(0,x2,...,xn) + x1·f(1,x2,...,xn).</li>
          <li><strong>Multiplexer trees:</strong> For many variables, use cascaded multiplexers – the same principle applies hierarchically.</li>
          <li><strong>In VHDL/Verilog:</strong> Synthesis tools automatically map Boolean functions to multiplexers when appropriate.</li>
          <li><strong>Power saving:</strong> When data inputs are tied to VCC/GND, there is no dynamic power on those lines.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can implement any 3-variable function using an 8:1 MUX with constants.</li>
          <li>I can implement any 3-variable function using a 4:1 MUX with one variable as data input.</li>
          <li>I understand Shannon's expansion and its relation to multiplexers.</li>
          <li>I can choose the optimal MUX size for a given function (minimizing IC count).</li>
          <li>I know how to handle unused data inputs.</li>
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
          “This is one of my favorite topics – it connects truth tables, Boolean algebra, and hardware in a powerful way. I challenge my students in Barrackpore: 'Given a 4:1 MUX and an inverter, can you implement any function of three variables?' They soon realize that by choosing the right data inputs (0,1, variable, or complement), they can. We then extend to larger functions, and they appreciate how FPGAs use LUTs. I remind them that this is Shannon's expansion in action – a concept that reappears in many areas of computer science.”
        </p>
      </section>
    </div>
  );
};

export default Topic13;