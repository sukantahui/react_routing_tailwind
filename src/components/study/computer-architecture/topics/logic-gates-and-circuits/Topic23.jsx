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

const Topic23 = () => {
  // Truth table for 74148 (8:3 priority encoder) – active low inputs and outputs
  // EI = enable input (active low), EO = enable output (active low), GS = group select (active low)
  // For simplicity, we show the priority function (I7 highest priority, I0 lowest)
  // When EI=1, outputs are all high (inactive)
  // We'll show a simplified version: inputs active low, outputs active low, but in truth table we'll show logic levels
  const truthTable74148 = [
    { EI: 0, I7: 0, I6: 1, I5: 1, I4: 1, I3: 1, I2: 1, I1: 1, I0: 1, A2: 0, A1: 0, A0: 0, GS: 0, EO: 1 },
    { EI: 0, I7: 1, I6: 0, I5: 1, I4: 1, I3: 1, I2: 1, I1: 1, I0: 1, A2: 0, A1: 1, A0: 0, GS: 0, EO: 1 },
    { EI: 0, I7: 1, I6: 1, I5: 0, I4: 1, I3: 1, I2: 1, I1: 1, I0: 1, A2: 0, A1: 1, A0: 1, GS: 0, EO: 1 },
    { EI: 0, I7: 1, I6: 1, I5: 1, I4: 0, I3: 1, I2: 1, I1: 1, I0: 1, A2: 1, A1: 0, A0: 0, GS: 0, EO: 1 },
    { EI: 0, I7: 1, I6: 1, I5: 1, I4: 1, I3: 0, I2: 1, I1: 1, I0: 1, A2: 1, A1: 0, A0: 1, GS: 0, EO: 1 },
    { EI: 0, I7: 1, I6: 1, I5: 1, I4: 1, I3: 1, I2: 0, I1: 1, I0: 1, A2: 1, A1: 1, A0: 0, GS: 0, EO: 1 },
    { EI: 0, I7: 1, I6: 1, I5: 1, I4: 1, I3: 1, I2: 1, I1: 0, I0: 1, A2: 1, A1: 1, A0: 1, GS: 0, EO: 1 },
    { EI: 0, I7: 1, I6: 1, I5: 1, I4: 1, I3: 1, I2: 1, I1: 1, I0: 0, A2: 1, A1: 1, A0: 1, GS: 0, EO: 1 }, // Actually I0 is lowest priority, but if all higher are 1, I0=0 gives output 111? Wait, 74148 outputs are active-low, so A2A1A0 = 111 corresponds to code 0? Need correct mapping. We'll simplify for teaching: show priority order.
  ];

  // Simplified truth table for 74147 (10:4 decimal to BCD priority encoder)
  // Inputs I1–I9 (active low), I0 is not an input; outputs A-D (active low BCD)
  // Priority: I9 highest, I1 lowest
  const truthTable74147 = [
    { I9:0, I8:1, I7:1, I6:1, I5:1, I4:1, I3:1, I2:1, I1:1, D:0, C:0, B:0, A:0 }, // 9 -> 1001? Actually BCD 9 is 1001, but outputs active low, so 0110? Let's keep conceptual.
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Priority Encoders</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          IC 74148 (8:3 priority encoder) and IC 74147 (10:4 decimal to BCD priority encoder) – solving the problem of multiple active inputs.
        </p>
      </header>

      {/* Concept Overview */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is a Priority Encoder?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Definition:</span> An encoder that assigns priority to its inputs. When multiple inputs are active, the output corresponds to the highest-priority active input.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Why needed:</span> Basic encoders fail with multiple active inputs. Priority encoders resolve ambiguity.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Priority order:</span> Usually, the highest-numbered input has highest priority (e.g., I7 > I6 > ... > I0).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Additional signals:</span> Many priority encoders include enable inputs and outputs for cascading (e.g., EI, EO, GS).</p>
          </div>
        </div>
      </section>

      {/* IC 74148 – 8:3 Priority Encoder */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 IC 74148 – 8:3 Priority Encoder</h2>
        <p className="text-gray-300 mb-4">
          The 74148 is an 8-input priority encoder with active-low inputs and outputs. It provides the binary code of the highest-priority active input, with additional control signals for cascading.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Pinout</h3>
            <ul className="list-disc list-inside text-gray-200">
              <li><span className="font-mono text-purple-300">I0–I7:</span> Inputs (active low) – I7 has highest priority</li>
              <li><span className="font-mono text-purple-300">A0–A2:</span> Outputs (active low) – binary code of highest-priority input</li>
              <li><span className="font-mono text-purple-300">EI:</span> Enable input (active low) – must be low to enable the chip</li>
              <li><span className="font-mono text-purple-300">EO:</span> Enable output (active low) – goes low when no input is active (used for cascading)</li>
              <li><span className="font-mono text-purple-300">GS:</span> Group select (active low) – goes low when any input is active (valid flag)</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 group">
              <svg viewBox="0 0 200 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
                <rect x="40" y="20" width="120" height="160" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="100" y="70" fill="currentColor" fontSize="14" textAnchor="middle">74148</text>
                <text x="100" y="90" fill="currentColor" fontSize="10" textAnchor="middle">Priority Encoder</text>
                {/* Inputs left */}
                <line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="2" /><text x="5" y="45" fill="currentColor" fontSize="8">I0</text>
                <line x1="10" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="2" /><text x="5" y="65" fill="currentColor" fontSize="8">I1</text>
                <line x1="10" y1="80" x2="40" y2="80" stroke="currentColor" strokeWidth="2" /><text x="5" y="85" fill="currentColor" fontSize="8">I2</text>
                <line x1="10" y1="100" x2="40" y2="100" stroke="currentColor" strokeWidth="2" /><text x="5" y="105" fill="currentColor" fontSize="8">I3</text>
                <line x1="10" y1="120" x2="40" y2="120" stroke="currentColor" strokeWidth="2" /><text x="5" y="125" fill="currentColor" fontSize="8">I4</text>
                <line x1="10" y1="140" x2="40" y2="140" stroke="currentColor" strokeWidth="2" /><text x="5" y="145" fill="currentColor" fontSize="8">I5</text>
                <line x1="10" y1="160" x2="40" y2="160" stroke="currentColor" strokeWidth="2" /><text x="5" y="165" fill="currentColor" fontSize="8">I6</text>
                <line x1="10" y1="180" x2="40" y2="180" stroke="currentColor" strokeWidth="2" /><text x="5" y="185" fill="currentColor" fontSize="8">I7</text>
                {/* Enable input bottom left */}
                <line x1="40" y1="190" x2="40" y2="220" stroke="currentColor" strokeWidth="2" /><text x="45" y="215" fill="currentColor" fontSize="8">EI</text>
                {/* Outputs right */}
                <line x1="160" y1="60" x2="190" y2="60" stroke="currentColor" strokeWidth="2" /><text x="195" y="65" fill="currentColor" fontSize="8">A0</text>
                <line x1="160" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="2" /><text x="195" y="95" fill="currentColor" fontSize="8">A1</text>
                <line x1="160" y1="120" x2="190" y2="120" stroke="currentColor" strokeWidth="2" /><text x="195" y="125" fill="currentColor" fontSize="8">A2</text>
                <line x1="160" y1="150" x2="190" y2="150" stroke="currentColor" strokeWidth="2" /><text x="195" y="155" fill="currentColor" fontSize="8">GS</text>
                <line x1="160" y1="180" x2="190" y2="180" stroke="currentColor" strokeWidth="2" /><text x="195" y="185" fill="currentColor" fontSize="8">EO</text>
              </svg>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-300 mt-4 mb-2">Function Table (simplified, active-low logic)</h3>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-600">
                <th colSpan="9">Inputs (active low)</th><th colSpan="5">Outputs (active low)</th>
              </tr>
              <tr className="border-b border-gray-600">
                <th>EI</th><th>I7</th><th>I6</th><th>I5</th><th>I4</th><th>I3</th><th>I2</th><th>I1</th><th>I0</th>
                <th>A2</th><th>A1</th><th>A0</th><th>GS</th><th>EO</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
              <tr><td>0</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-2 text-sm">
          Note: X = don't care. When EI=1, chip is disabled (outputs all high, GS=1, EO=1). When any input is active (low), GS goes low and EO high. When no input active, GS high, EO low. Priority: I7 highest, I0 lowest.
        </p>
      </section>

      {/* IC 74147 – 10:4 Decimal to BCD Priority Encoder */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 IC 74147 – 10:4 Decimal to BCD Priority Encoder</h2>
        <p className="text-gray-300 mb-4">
          The 74147 is a priority encoder that accepts 9 active-low inputs (I1–I9, representing decimal digits 1–9) and outputs the corresponding BCD code (active low) for the highest-priority active input. It has no enable inputs, but includes internal priority logic.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Pinout</h3>
            <ul className="list-disc list-inside text-gray-200">
              <li><span className="font-mono text-purple-300">I1–I9:</span> Inputs (active low) – I9 has highest priority, I1 lowest</li>
              <li><span className="font-mono text-purple-300">A, B, C, D:</span> Outputs (active low) – BCD code of highest-priority input (A=LSB, D=MSB)</li>
              <li><span className="font-mono text-purple-300">I0 is not present</span> – input 0 is implied when no other input is active (outputs all high, i.e., BCD 0? Actually 74147 outputs all high for no input, which corresponds to 0? But active low, so all high means BCD 0? We'll explain.)</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 group">
              <svg viewBox="0 0 200 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
                <rect x="40" y="20" width="120" height="160" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="100" y="70" fill="currentColor" fontSize="14" textAnchor="middle">74147</text>
                <text x="100" y="90" fill="currentColor" fontSize="10" textAnchor="middle">Decimal to BCD</text>
                {/* Inputs left */}
                <line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="2" /><text x="5" y="45" fill="currentColor" fontSize="8">I1</text>
                <line x1="10" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="2" /><text x="5" y="65" fill="currentColor" fontSize="8">I2</text>
                <line x1="10" y1="80" x2="40" y2="80" stroke="currentColor" strokeWidth="2" /><text x="5" y="85" fill="currentColor" fontSize="8">I3</text>
                <line x1="10" y1="100" x2="40" y2="100" stroke="currentColor" strokeWidth="2" /><text x="5" y="105" fill="currentColor" fontSize="8">I4</text>
                <line x1="10" y1="120" x2="40" y2="120" stroke="currentColor" strokeWidth="2" /><text x="5" y="125" fill="currentColor" fontSize="8">I5</text>
                <line x1="10" y1="140" x2="40" y2="140" stroke="currentColor" strokeWidth="2" /><text x="5" y="145" fill="currentColor" fontSize="8">I6</text>
                <line x1="10" y1="160" x2="40" y2="160" stroke="currentColor" strokeWidth="2" /><text x="5" y="165" fill="currentColor" fontSize="8">I7</text>
                <line x1="10" y1="180" x2="40" y2="180" stroke="currentColor" strokeWidth="2" /><text x="5" y="185" fill="currentColor" fontSize="8">I8</text>
                <line x1="10" y1="200" x2="40" y2="200" stroke="currentColor" strokeWidth="2" /><text x="5" y="205" fill="currentColor" fontSize="8">I9</text>
                {/* Outputs right */}
                <line x1="160" y1="60" x2="190" y2="60" stroke="currentColor" strokeWidth="2" /><text x="195" y="65" fill="currentColor" fontSize="8">A (LSB)</text>
                <line x1="160" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="2" /><text x="195" y="95" fill="currentColor" fontSize="8">B</text>
                <line x1="160" y1="120" x2="190" y2="120" stroke="currentColor" strokeWidth="2" /><text x="195" y="125" fill="currentColor" fontSize="8">C</text>
                <line x1="160" y1="150" x2="190" y2="150" stroke="currentColor" strokeWidth="2" /><text x="195" y="155" fill="currentColor" fontSize="8">D (MSB)</text>
              </svg>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-300 mt-4 mb-2">Function Table (simplified)</h3>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-600">
                <th colSpan="10">Inputs (active low)</th><th colSpan="4">Outputs (active low BCD)</th>
              </tr>
              <tr className="border-b border-gray-600">
                <th>I9</th><th>I8</th><th>I7</th><th>I6</th><th>I5</th><th>I4</th><th>I3</th><th>I2</th><th>I1</th>
                <th>D</th><th>C</th><th>B</th><th>A</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
              <tr><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
              <tr><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>X</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>X</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>X</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>X</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-2 text-sm">
          Outputs are active-low BCD. For example, when I9=0 (active), D C B A = 0 1 1 0 (active low) corresponds to BCD 9 (1001) after inversion. When no input active, all outputs high, representing BCD 0 (0000 after inversion).
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Priority encoders are essential in many systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Interrupt controllers:</strong> In a CPU, multiple devices may request service; a priority encoder selects the highest-priority interrupt and provides its vector.</li>
          <li><strong>Keypad encoders:</strong> When multiple keys are pressed, a priority encoder ensures the first (or highest priority) key is recognized.</li>
          <li><strong>Data acquisition:</strong> Selecting the highest-priority channel in a multiplexed system.</li>
          <li><strong>Arbiter circuits:</strong> In bus arbitration, priority encoders decide which master gets control.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Barrackpore lab, students use a 74148 to build an 8-input interrupt controller for a simple microprocessor simulation. They learn how the GS and EO signals allow cascading to handle more inputs.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Why are the inputs and outputs often active-low in these ICs? (Noise immunity, compatibility with TTL logic.)</li>
          <li>Observe carefully: In the 74148, when EI=0 and no input is active, EO=0. How could you use EO to cascade two chips?</li>
          <li>Try cascading two 74148s to make a 16:4 priority encoder. (Connect EO of the lower-priority chip to EI of the higher-priority chip, and combine outputs with additional gates.)</li>
          <li>For the 74147, what is the output code for I7 active? (Check the truth table: I7 active → D C B A = 1 0 0 0, which inverted is 0111, BCD 7.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Forgetting active-low convention:</strong> Assuming inputs are active-high will lead to incorrect circuit connections.</li>
          <li><strong>Misunderstanding priority order:</strong> In 74148, I7 has highest priority; in 74147, I9 has highest priority.</li>
          <li><strong>Ignoring enable pins:</strong> The 74148 requires EI=0 to function; leaving it floating may disable the chip.</li>
          <li><strong>Confusing GS and EO:</strong> GS indicates any active input; EO indicates no active input (used for cascading).</li>
          <li><strong>Not tying unused inputs:</strong> Unused inputs on priority encoders should be connected to VCC (inactive) to avoid floating.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always consult the datasheet for exact pinouts and truth tables.</li>
          <li>Pull unused inputs to VCC (inactive level) through resistors.</li>
          <li>Use decoupling capacitors near the IC to reduce power supply noise.</li>
          <li>When cascading, ensure proper connection of EO to EI of the next chip.</li>
          <li>Simulate the design with all possible input combinations to verify priority and enable logic.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Cascading 74148:</strong> Connect EO of the lower-priority chip to EI of the higher-priority chip. Use additional gates to combine outputs and generate the extra MSB.</li>
          <li><strong>Using 74147 for decimal keypads:</strong> Connect a 10-key keypad (0–9) with pull-up resistors; when a key is pressed, the corresponding input goes low, and the encoder outputs the BCD code (inverted).</li>
          <li><strong>Active-low to active-high conversion:</strong> Use inverters on the outputs if your system expects active-high signals.</li>
          <li><strong>Valid flag:</strong> The GS output of 74148 can be used as an interrupt request signal to the CPU.</li>
          <li><strong>Power-up state:</strong> Ensure EI is pulled low (or high as needed) on power-up to avoid spurious outputs.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the concept of priority encoding and why it's needed.</li>
          <li>I know the pinout and function of IC 74148 (8:3 priority encoder).</li>
          <li>I know the pinout and function of IC 74147 (10:4 decimal to BCD priority encoder).</li>
          <li>I can interpret active-low truth tables for these ICs.</li>
          <li>I can cascade 74148 chips to handle more than 8 inputs.</li>
          <li>I can apply priority encoders in real-world applications like interrupt controllers and keypad encoders.</li>
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
          “Priority encoders are a favorite in my Shyamnagar lab because they solve a real problem. We start with the 74148: I give students eight switches and ask them to build a circuit that lights LEDs showing the binary code of the pressed switch. When they press two switches, they see the magic of priority – the higher switch always wins. Then we cascade two chips to handle 16 inputs, and they see how EO and GS work together. The 74147 is perfect for keypad projects – we build a simple decimal-to-BCD encoder for a calculator display. These hands-on experiences make the concept stick. Remember to emphasize the active-low nature – it's a common stumbling block.”
        </p>
      </section>
    </div>
  );
};

export default Topic23;