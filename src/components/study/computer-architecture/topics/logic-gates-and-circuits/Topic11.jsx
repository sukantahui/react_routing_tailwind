import React from 'react';
import clsx from 'clsx';
import sixteenToOneMultiplexer from './topic11_files/sixteen_to_one_multiplexer.png';
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

const Topic11 = () => {
    // Truth table for 16:1 multiplexer (simplified representation)
    // S3,S2,S1,S0 select one of 16 inputs D0..D15
    const truthTableRows = [
        { S3: 0, S2: 0, S1: 0, S0: 0, output: 'D0' },
        { S3: 0, S2: 0, S1: 0, S0: 1, output: 'D1' },
        { S3: 0, S2: 0, S1: 1, S0: 0, output: 'D2' },
        { S3: 0, S2: 0, S1: 1, S0: 1, output: 'D3' },
        { S3: 0, S2: 1, S1: 0, S0: 0, output: 'D4' },
        { S3: 0, S2: 1, S1: 0, S0: 1, output: 'D5' },
        { S3: 0, S2: 1, S1: 1, S0: 0, output: 'D6' },
        { S3: 0, S2: 1, S1: 1, S0: 1, output: 'D7' },
        { S3: 1, S2: 0, S1: 0, S0: 0, output: 'D8' },
        { S3: 1, S2: 0, S1: 0, S0: 1, output: 'D9' },
        { S3: 1, S2: 0, S1: 1, S0: 0, output: 'D10' },
        { S3: 1, S2: 0, S1: 1, S0: 1, output: 'D11' },
        { S3: 1, S2: 1, S1: 0, S0: 0, output: 'D12' },
        { S3: 1, S2: 1, S1: 0, S0: 1, output: 'D13' },
        { S3: 1, S2: 1, S1: 1, S0: 0, output: 'D14' },
        { S3: 1, S2: 1, S1: 1, S0: 1, output: 'D15' },
    ];

    return (
        <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
            <style>{animationStyles}</style>

            {/* Header */}
            <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h1 className="text-4xl font-bold text-blue-400 mb-2">16:1 Multiplexer (using multiple ICs)</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Cascading two 8:1 multiplexers (e.g., IC 74151) to create a 16-input selector with four select lines.
                </p>
            </header>

            {/* Specifications */}
            <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> 16 data lines (D0–D15), 4 select lines (S3, S2, S1, S0)</p>
                        <p className="text-lg"><span className="font-mono text-purple-300">Output:</span> Y (selected data)</p>
                        <p className="text-lg"><span className="font-mono text-purple-300">Building blocks:</span> Two 8:1 MUX ICs (e.g., 74151), an inverter, and an OR gate (or 2:1 MUX)</p>
                    </div>
                    <div>
                        <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Expand multiplexing capability beyond a single IC.</p>
                        <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In systems requiring many input sources, e.g., large data acquisition, memory addressing, CPU register selection.</p>
                    </div>
                </div>
            </section>

            {/* Block Diagram */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 Cascading Two 8:1 Multiplexers</h2>
                <div className="flex flex-col items-center">
                    
                    <div className="w-full max-w-3xl group">
                        <svg viewBox="0 0 500 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
                            {/* First 8:1 MUX (for D0-D7) */}
                            <rect x="50" y="50" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                            <text x="110" y="110" fill="currentColor" fontSize="14" textAnchor="middle">8:1 MUX</text>
                            <text x="110" y="130" fill="currentColor" fontSize="12" textAnchor="middle">(74151)</text>

                            {/* Second 8:1 MUX (for D8-D15) */}
                            <rect x="250" y="50" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                            <text x="310" y="110" fill="currentColor" fontSize="14" textAnchor="middle">8:1 MUX</text>
                            <text x="310" y="130" fill="currentColor" fontSize="12" textAnchor="middle">(74151)</text>

                            {/* Data inputs to first MUX */}
                            <line x1="10" y1="70" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
                            <text x="5" y="75" fill="currentColor" fontSize="10">D0</text>
                            <line x1="10" y1="90" x2="50" y2="90" stroke="currentColor" strokeWidth="2" />
                            <text x="5" y="95" fill="currentColor" fontSize="10">...</text>
                            <line x1="10" y1="130" x2="50" y2="130" stroke="currentColor" strokeWidth="2" />
                            <text x="5" y="135" fill="currentColor" fontSize="10">D7</text>

                            {/* Data inputs to second MUX */}
                            <line x1="210" y1="70" x2="250" y2="70" stroke="currentColor" strokeWidth="2" />
                            <text x="190" y="75" fill="currentColor" fontSize="10">D8</text>
                            <line x1="210" y1="90" x2="250" y2="90" stroke="currentColor" strokeWidth="2" />
                            <text x="190" y="95" fill="currentColor" fontSize="10">...</text>
                            <line x1="210" y1="130" x2="250" y2="130" stroke="currentColor" strokeWidth="2" />
                            <text x="190" y="135" fill="currentColor" fontSize="10">D15</text>

                            {/* Select lines S2,S1,S0 to both MUXes */}
                            <line x1="110" y1="170" x2="110" y2="200" stroke="currentColor" strokeWidth="2" />
                            <line x1="310" y1="170" x2="310" y2="200" stroke="currentColor" strokeWidth="2" />
                            <text x="200" y="215" fill="currentColor" fontSize="12">S2,S1,S0</text>
                            <path d="M110 200 L310 200" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />

                            {/* Enable logic */}
                            <text x="50" y="240" fill="currentColor" fontSize="12">S3</text>
                            <line x1="60" y1="240" x2="90" y2="240" stroke="currentColor" strokeWidth="2" />
                            <circle cx="100" cy="240" r="5" fill="none" stroke="currentColor" strokeWidth="2" /> {/* inverter */}
                            <line x1="105" y1="240" x2="130" y2="240" stroke="currentColor" strokeWidth="2" />
                            <line x1="130" y1="240" x2="130" y2="190" stroke="currentColor" strokeWidth="2" /> {/* to second MUX enable */}
                            <line x1="60" y1="240" x2="60" y2="190" stroke="currentColor" strokeWidth="2" /> {/* S3 directly to first MUX enable (active-low) */}

                            {/* Enable pins (active-low) on MUXes */}
                            <circle cx="170" cy="170" r="3" fill="currentColor" />
                            <circle cx="370" cy="170" r="3" fill="currentColor" />

                            {/* Outputs to OR gate */}
                            <line x1="170" y1="110" x2="200" y2="110" stroke="currentColor" strokeWidth="2" />
                            <line x1="370" y1="110" x2="400" y2="110" stroke="currentColor" strokeWidth="2" />

                            {/* OR gate */}
                            <path d="M410 90 L440 90 L450 110 L440 130 L410 130 L410 90" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M400 90 L410 110 L400 130" fill="none" stroke="currentColor" strokeWidth="2" />
                            <text x="425" y="115" fill="currentColor" fontSize="12" textAnchor="middle">≥1</text>

                            {/* Final output */}
                            <line x1="450" y1="110" x2="480" y2="110" stroke="currentColor" strokeWidth="2" />
                            <text x="490" y="115" fill="currentColor" fontSize="14" fontWeight="bold">Y</text>
                        </svg>
                    </div>
                    <p className="text-gray-300 mt-4 text-center">
                        Two 8:1 multiplexers share the lower three select lines (S2,S1,S0). The MSB (S3) selects which chip is enabled (via an inverter for the second chip). The outputs are ORed to produce the final 16:1 output.
                    </p>
                </div>
            </section>

            {/* Alternative: Using a 2:1 MUX at output */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔄 Alternative: Final 2:1 Multiplexer</h2>
                <p className="text-gray-300 mb-4">
                    Instead of ORing the outputs, you can feed the two 8:1 MUX outputs into a 2:1 multiplexer controlled by the same MSB (S3). This avoids any issues with totem-pole outputs and is equally valid.
                </p>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 text-center">
                    <p className="font-mono text-green-400">Y = S3'·(output of MUX1) + S3·(output of MUX2)</p>
                </div>
            </section>

            {/* Truth Table */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (16:1 MUX)</h2>
                <div className="overflow-x-auto">
                    <div className="max-w-4xl w-full flex justify-center">
                        <img
                            src={sixteenToOneMultiplexer}
                            alt="16:1 Multiplexer Circuit"
                            className="dark:invert w-full h-auto object-contain"
                        />
                    </div>
                    <table className="w-full max-w-2xl mx-auto text-center border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="py-2 px-2 text-purple-300">S3 (MSB)</th>
                                <th className="py-2 px-2 text-purple-300">S2</th>
                                <th className="py-2 px-2 text-purple-300">S1</th>
                                <th className="py-2 px-2 text-purple-300">S0 (LSB)</th>
                                <th className="py-2 px-2 text-purple-300">Output Y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {truthTableRows.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-700">
                                    <td className="py-1 px-2">{row.S3}</td>
                                    <td className="py-1 px-2">{row.S2}</td>
                                    <td className="py-1 px-2">{row.S1}</td>
                                    <td className="py-1 px-2">{row.S0}</td>
                                    <td className="py-1 px-2 font-bold text-green-400">{row.output}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-gray-300 mt-4 text-center">
                    The 4-bit select code directly chooses one of 16 data inputs.
                </p>
            </section>

            {/* Boolean Expression */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expression</h2>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                    <p className="font-mono text-green-400 text-lg text-center">
                        Y = S3'·(S2'S1'S0'·D0 + S2'S1'S0·D1 + ... + S2S1S0·D7) + S3·(S2'S1'S0'·D8 + S2'S1'S0·D9 + ... + S2S1S0·D15)
                    </p>
                    <p className="text-gray-300 mt-2 text-center">
                        This can be implemented using the cascaded structure shown above.
                    </p>
                </div>
            </section>

            {/* Real-World Example */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
                <p className="text-gray-300 mb-3">
                    A 16:1 multiplexer built from two 8:1 ICs is common in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li><strong>Data acquisition systems:</strong> Selecting one of 16 sensor signals for ADC conversion.</li>
                    <li><strong>Memory addressing:</strong> Choosing one of 16 memory banks.</li>
                    <li><strong>CPU register files:</strong> Selecting one of 16 registers for reading/writing.</li>
                    <li><strong>Communication:</strong> Time-division multiplexing of 16 low-speed channels onto one line.</li>
                </ul>
                <p className="text-gray-300 mt-3">
                    In the Naihati lab, students use two 74151s, a 7404 inverter, and a 7432 OR gate to build a 16:1 MUX that selects from 16 switches, displaying the result on an LED.
                </p>
            </section>

            {/* Hints Section */}
            <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                    💡 Think About...
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>Why do we need an inverter for the second chip's enable? (Because the enable is active-low; we want one chip enabled when S3=0, the other when S3=1.)</li>
                    <li>Observe carefully: The lower three select lines are connected in parallel to both chips – they share the same address within each bank.</li>
                    <li>Try drawing the circuit using a 2:1 MUX at the output instead of an OR gate. What are the trade-offs?</li>
                    <li>What happens if both chips are accidentally enabled at the same time? (Output contention – never do that!)</li>
                </ul>
            </section>

            {/* Common Pitfalls */}
            <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li><strong>Both chips enabled simultaneously:</strong> Incorrect connection of enables can cause both to output, leading to contention.</li>
                    <li><strong>Forgetting the active-low property:</strong> Assuming enable = 1 enables the chip will result in no output.</li>
                    <li><strong>ORing totem-pole outputs without ensuring only one active:</strong> If both are active, ORing may still work if the disabled output is 0, but if disabled output is high-Z (not the case for 74151), it would fail.</li>
                    <li><strong>Using the wrong select order:</strong> Mixing up S3 with S2 can map inputs incorrectly.</li>
                    <li><strong>Leaving unused data inputs floating:</strong> Always tie unused D pins to GND or VCC to avoid noise.</li>
                </ul>
            </section>

            {/* Best Practices */}
            <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>Clearly label all select lines and data inputs on your schematic.</li>
                    <li>Use a decoupling capacitor (0.1µF) near each IC to reduce power supply noise.</li>
                    <li>When ORing outputs, verify that the disabled chip's output is truly 0 (not high-Z) – check the datasheet.</li>
                    <li>For larger multiplexers, consider using a tree of 2:1 MUXes or dedicated larger ICs.</li>
                    <li>Simulate the design before building hardware to verify correct selection.</li>
                </ul>
            </section>

            {/* Tips & Tricks */}
            <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li><strong>Using a 2:1 MUX at output:</strong> Provides a clean, expandable structure; can be built with a 74157 quad 2:1 MUX.</li>
                    <li><strong>Enable expansion:</strong> The same technique can be used to create 32:1, 64:1 MUXes by adding more stages.</li>
                    <li><strong>High-speed design:</strong> Use faster logic families (74F, 74HC) to minimize propagation delay through multiple stages.</li>
                    <li><strong>Debugging:</strong> If a particular input doesn't appear, check the corresponding chip's enable and select lines with a logic probe.</li>
                    <li><strong>Power consumption:</strong> Only one chip is active at a time, so power is relatively low.</li>
                </ul>
            </section>

            {/* Mini Checklist */}
            <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>I understand how to cascade two 8:1 MUXes to make a 16:1 MUX.</li>
                    <li>I know the role of the MSB select line and enable pins.</li>
                    <li>I can draw the block diagram with two 8:1 MUXes, an inverter, and an OR gate.</li>
                    <li>I understand the truth table for 16:1 selection.</li>
                    <li>I am aware of common pitfalls like enabling both chips simultaneously.</li>
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
                    “Cascading multiplexers is a great way to teach hierarchical design. I have my students in Barrackpore first build a 16:1 MUX on a breadboard using two 74151s, a 7404 inverter, and a 7432 OR gate. They love seeing the 16 switches and watching the LED respond to the four select pushbuttons. I remind them that this is exactly how large multiplexers are built inside FPGAs and CPUs. Always emphasize that only one chip should be enabled at a time – it's a fundamental concept in bus-oriented design.”
                </p>
            </section>
        </div>
    );
};

export default Topic11;