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

const Topic0 = () => {
  // Gate data for easy mapping
  const gates = [
    {
      name: 'AND',
      symbol: (
        <svg width="80" height="60" viewBox="0 0 80 60" className="w-20 h-16">
          <path d="M20 10 L20 50 L45 50 Q65 50 65 30 Q65 10 45 10 L20 10" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="65" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="2" />
          <text x="40" y="30" textAnchor="middle" fill="currentColor" fontSize="12">&</text>
        </svg>
      ),
      expression: 'Y = A · B',
      truthTable: [
        { A: 0, B: 0, Y: 0 },
        { A: 0, B: 1, Y: 0 },
        { A: 1, B: 0, Y: 0 },
        { A: 1, B: 1, Y: 1 },
      ],
      description: 'Output HIGH only when ALL inputs are HIGH.',
      example: 'Swadeep and Tuhina must both press the button to ring the bell (AND).',
    },
    {
      name: 'OR',
      symbol: (
        <svg width="80" height="60" viewBox="0 0 80 60" className="w-20 h-16">
          <path d="M20 10 Q45 10 55 30 Q45 50 20 50 L20 10" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="55" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="2" />
          <text x="40" y="30" textAnchor="middle" fill="currentColor" fontSize="12">≥1</text>
        </svg>
      ),
      expression: 'Y = A + B',
      truthTable: [
        { A: 0, B: 0, Y: 0 },
        { A: 0, B: 1, Y: 1 },
        { A: 1, B: 0, Y: 1 },
        { A: 1, B: 1, Y: 1 },
      ],
      description: 'Output HIGH when at least ONE input is HIGH.',
      example: 'If Abhronila OR Debangshu turns on the switch, the light turns on.',
    },
    {
      name: 'NOT',
      symbol: (
        <svg width="80" height="60" viewBox="0 0 80 60" className="w-20 h-16">
          <polygon points="20,10 45,30 20,50 20,10" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="55" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="2" />
          <text x="32" y="30" textAnchor="middle" fill="currentColor" fontSize="12">1</text>
        </svg>
      ),
      expression: 'Y = ¬A or Y = A\'',
      truthTable: [
        { A: 0, Y: 1 },
        { A: 1, Y: 0 },
      ],
      description: 'Output is the inverse of the input.',
      example: 'A security alarm that triggers when a window is NOT closed.',
    },
    {
      name: 'NAND',
      symbol: (
        <svg width="80" height="60" viewBox="0 0 80 60" className="w-20 h-16">
          <path d="M20 10 L20 50 L45 50 Q65 50 65 30 Q65 10 45 10 L20 10" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
          <circle cx="70" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="75" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="2" /> {/* dummy to avoid missing line */}
          <text x="45" y="30" textAnchor="middle" fill="currentColor" fontSize="12">&</text>
        </svg>
      ),
      expression: 'Y = ¬(A · B)',
      truthTable: [
        { A: 0, B: 0, Y: 1 },
        { A: 0, B: 1, Y: 1 },
        { A: 1, B: 0, Y: 1 },
        { A: 1, B: 1, Y: 0 },
      ],
      description: 'AND followed by NOT. Output LOW only when ALL inputs are HIGH.',
      example: 'A car seatbelt warning: light OFF only when both seats are buckled (NAND).',
    },
    {
      name: 'NOR',
      symbol: (
        <svg width="80" height="60" viewBox="0 0 80 60" className="w-20 h-16">
          <path d="M20 10 Q45 10 55 30 Q45 50 20 50 L20 10" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="65" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="2" />
          <text x="40" y="30" textAnchor="middle" fill="currentColor" fontSize="12">≥1</text>
        </svg>
      ),
      expression: 'Y = ¬(A + B)',
      truthTable: [
        { A: 0, B: 0, Y: 1 },
        { A: 0, B: 1, Y: 0 },
        { A: 1, B: 0, Y: 0 },
        { A: 1, B: 1, Y: 0 },
      ],
      description: 'OR followed by NOT. Output HIGH only when ALL inputs are LOW.',
      example: 'A two-key lock that opens only when no key is turned (NOR).',
    },
    {
      name: 'XOR',
      symbol: (
        <svg width="80" height="60" viewBox="0 0 80 60" className="w-20 h-16">
          <path d="M20 10 Q45 10 55 30 Q45 50 20 50 L20 10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M10 10 Q35 10 45 30 Q35 50 10 50" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="40" x2="10" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="55" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="2" />
          <text x="35" y="30" textAnchor="middle" fill="currentColor" fontSize="12">=1</text>
        </svg>
      ),
      expression: 'Y = A ⊕ B',
      truthTable: [
        { A: 0, B: 0, Y: 0 },
        { A: 0, B: 1, Y: 1 },
        { A: 1, B: 0, Y: 1 },
        { A: 1, B: 1, Y: 0 },
      ],
      description: 'Output HIGH when inputs are DIFFERENT.',
      example: 'A staircase light controlled by two switches (XOR).',
    },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header section */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Basic Logic Gates</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          AND, OR, NOT, NAND, NOR, XOR — the fundamental building blocks of digital circuits.
        </p>
      </header>

      {/* Prototype / signature overview */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Gate Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> Y = f(A, B, ...)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Return type:</span> Binary (0 or 1)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Perform basic logical operations</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In every digital system—from adders to memory units.</p>
          </div>
        </div>
      </section>

      {/* Gates grid (stacked vertically as cards) */}
      <div className="space-y-8">
        {gates.map((gate, index) => (
          <div
            key={gate.name}
            className={clsx(
              "group bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700",
              "transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-500",
              "animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Gate symbol with hover animation */}
              <div className="flex-shrink-0 w-24 h-20 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300">
                {gate.symbol}
              </div>

              {/* Gate details */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{gate.name} Gate</h3>
                <p className="text-lg font-mono text-purple-300 mb-2">{gate.expression}</p>
                <p className="text-gray-300 mb-3">{gate.description}</p>
                <p className="text-sm italic text-gray-400">💡 {gate.example}</p>
              </div>

              {/* Truth table */}
              <div className="flex-shrink-0 bg-gray-900 p-3 rounded-lg border border-gray-600">
                <table className="text-sm">
                  <thead>
                    <tr className="text-gray-400">
                      {gate.truthTable[0].A !== undefined && <th className="px-2">A</th>}
                      {gate.truthTable[0].B !== undefined && <th className="px-2">B</th>}
                      <th className="px-2">Y</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gate.truthTable.map((row, i) => (
                      <tr key={i} className="text-center border-t border-gray-700">
                        {row.A !== undefined && <td className="px-2">{row.A}</td>}
                        {row.B !== undefined && <td className="px-2">{row.B}</td>}
                        <td className="px-2 font-bold text-green-400">{row.Y}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hints Section */}
      <section className="mt-12 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How does an AND gate behave differently from an OR gate? (Imagine Swadeep and Tuhina each controlling a switch.)</li>
          <li>What happens if you put a NOT gate after an AND? (You get NAND.)</li>
          <li>XOR is like “difference” — can you use it to compare two bits?</li>
          <li>Observe carefully: NAND and NOR are called universal gates — why?</li>
          <li>Try changing the inputs in your mind: what if both inputs of XOR are 1?</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing AND with OR:</strong> Remember AND needs all inputs high; OR needs at least one.</li>
          <li><strong>Forgetting the NOT bubble:</strong> In NAND/NOR, the bubble inverts the output — don't ignore it.</li>
          <li><strong>Misreading XOR:</strong> XOR is not the same as OR; it’s 1 only when inputs differ.</li>
          <li><strong>Assuming more than 2 inputs:</strong> Basic gates can have multiple inputs, but the truth table expands.</li>
          <li><strong>IDE/Compiler errors:</strong> In hardware description languages, using wrong operator (e.g., & vs |).</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always label inputs and outputs clearly on diagrams.</li>
          <li>Use truth tables to verify gate behavior before building circuits.</li>
          <li>Prefer NAND/NOR for implementation as they are universal and often cheaper.</li>
          <li>Keep gate symbols consistent with IEEE/ANSI standards.</li>
          <li>Document Boolean expressions alongside schematics.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Universal gates:</strong> Any logic circuit can be built using only NAND or only NOR gates — a handy fact for IC-limited designs.</li>
          <li><strong>DeMorgan's Theorem:</strong> Use it to convert AND/OR combinations into NAND/NOR forms (e.g., ¬(A·B) = ¬A + ¬B).</li>
          <li><strong>Shortcut for XOR:</strong> XOR can be built from four NAND gates — useful when XOR ICs aren’t available.</li>
          <li><strong>Debugging:</strong> If a circuit doesn’t work, check the voltage levels; a floating input can behave erratically.</li>
          <li><strong>Simulation first:</strong> Test your gate-level design in software before hardware implementation.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the symbol for each basic gate.</li>
          <li>I can write the Boolean expression for each gate.</li>
          <li>I can produce the truth table from memory.</li>
          <li>I understand the difference between AND/OR and NAND/NOR.</li>
          <li>I know that XOR outputs 1 when inputs differ.</li>
          <li>I can give a real-world example for each gate.</li>
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
          “Basic gates are the ABCs of digital electronics. Spend time here — it will pay off when we build adders, multiplexers, and ALUs. Remember, every complex chip is just a network of these simple gates. Practice drawing them until they become second nature. And always relate them to real situations: AND is like two keys to open a locker, OR is like two switches for a staircase light, and NOT is like an inverted alarm. The students from Barrackpore, Shyamnagar, Ichapur, and Naihati found these analogies very helpful.”
        </p>
      </section>
    </div>
  );
};

export default Topic0;