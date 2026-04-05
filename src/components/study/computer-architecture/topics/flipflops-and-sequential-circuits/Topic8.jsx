import React, { useState } from 'react';
import clsx from 'clsx';

// Fallback Teacher component
const Teacher = ({ note }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 border-l-4 border-indigo-500 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Teacher's Note (Sukanta Hui)</div>
          <p className="text-gray-700 dark:text-gray-300">{note}</p>
        </div>
      </div>
    </div>
  );
};

// --- Animated SVG: D Flip-Flop Internal Circuit ---
const DFlipFlopCircuitSVG = () => {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-4xl">
        {/* Background */}
        <rect x="20" y="20" width="760" height="310" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">D Flip-Flop Construction from SR Flip-Flop</text>
        
        {/* D Input */}
        <text x="60" y="130" fill="#ef4444" fontSize="16" fontWeight="bold">D (Data)</text>
        
        {/* Inverter */}
        <rect x="180" y="110" width="60" height="40" rx="4" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" />
        <text x="210" y="135" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">NOT</text>
        <circle cx="240" cy="130" r="4" fill="#f59e0b" />
        
        {/* Lines from D to Inverter and direct */}
        <line x1="140" y1="130" x2="180" y2="130" stroke="#ef4444" strokeWidth="2" />
        <line x1="140" y1="170" x2="300" y2="170" stroke="#ef4444" strokeWidth="2" />
        <line x1="240" y1="130" x2="300" y2="130" stroke="#f59e0b" strokeWidth="2" />
        
        {/* AND Gates with CLK */}
        {/* AND1 for D (top) */}
        <rect x="300" y="100" width="80" height="50" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="340" y="130" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">AND</text>
        <text x="340" y="145" fill="#9ca3af" fontSize="9" textAnchor="middle">D · CLK</text>
        
        {/* AND2 for D' (bottom) */}
        <rect x="300" y="150" width="80" height="50" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="340" y="180" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">AND</text>
        <text x="340" y="195" fill="#9ca3af" fontSize="9" textAnchor="middle">D' · CLK</text>
        
        {/* Clock Input */}
        <text x="60" y="250" fill="#3b82f6" fontSize="16" fontWeight="bold">CLK</text>
        <line x1="140" y1="250" x2="280" y2="250" stroke="#3b82f6" strokeWidth="2" />
        <line x1="280" y1="250" x2="280" y2="125" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="280" y1="250" x2="280" y2="175" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="280" y1="125" x2="300" y2="125" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="280" y1="175" x2="300" y2="175" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* SR Latch (NOR-based) */}
        <rect x="440" y="100" width="200" height="130" rx="8" fill="#374151" stroke="#8b5cf6" strokeWidth="2" />
        <text x="540" y="125" fill="#8b5cf6" fontSize="12" textAnchor="middle" fontWeight="bold">SR Latch (NOR)</text>
        
        {/* NOR1 (Set side) */}
        <rect x="470" y="135" width="65" height="40" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="502" y="160" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">NOR</text>
        
        {/* NOR2 (Reset side) */}
        <rect x="470" y="180" width="65" height="40" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="502" y="205" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">NOR</text>
        
        {/* Cross-coupling */}
        <line x1="535" y1="155" x2="580" y2="200" stroke="#10b981" strokeWidth="2" />
        <line x1="535" y1="200" x2="580" y2="155" stroke="#10b981" strokeWidth="2" />
        
        {/* Connections from ANDs to SR Latch */}
        <line x1="380" y1="125" x2="470" y2="155" stroke="#ef4444" strokeWidth="2" />
        <line x1="380" y1="175" x2="470" y2="200" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Outputs */}
        <text x="680" y="130" fill="#10b981" fontSize="16" fontWeight="bold">Q</text>
        <text x="680" y="190" fill="#10b981" fontSize="16" fontWeight="bold">Q'</text>
        <line x1="640" y1="155" x2="670" y2="130" stroke="#10b981" strokeWidth="2" />
        <line x1="640" y1="200" x2="670" y2="190" stroke="#10b981" strokeWidth="2" />
        <circle cx="675" cy="185" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
        
        {/* Labels */}
        <text x="340" y="85" fill="#ef4444" fontSize="11" textAnchor="middle">S = D · CLK</text>
        <text x="340" y="235" fill="#3b82f6" fontSize="11" textAnchor="middle">R = D' · CLK</text>
        
        {/* Note: No Invalid State */}
        <rect x="480" y="250" width="240" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
        <text x="600" y="270" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">✅ No Invalid State!</text>
        <text x="600" y="288" fill="#10b981" fontSize="10" textAnchor="middle">S and R are never both 1 (complementary inputs)</text>
      </svg>
    </div>
  );
};

// --- Animated SVG: D Flip-Flop Symbol and Timing ---
const DFlipFlopSymbolSVG = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* D Flip-Flop Symbol */}
        <rect x="150" y="50" width="120" height="100" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
        <text x="210" y="105" fill="#8b5cf6" fontSize="20" textAnchor="middle" fontWeight="bold">D</text>
        <text x="210" y="125" fill="#6b7280" fontSize="10" textAnchor="middle">FF</text>
        
        {/* Input D */}
        <line x1="80" y1="70" x2="150" y2="70" stroke="#ef4444" strokeWidth="2" />
        <text x="50" y="75" fill="#ef4444" fontSize="14" fontWeight="bold">D</text>
        
        {/* Clock input with triangle (edge trigger) */}
        <line x1="150" y1="120" x2="120" y2="120" stroke="#3b82f6" strokeWidth="2" />
        <polygon points="120,108 120,132 135,120" fill="#3b82f6" />
        <text x="50" y="125" fill="#3b82f6" fontSize="14" fontWeight="bold">CLK</text>
        
        {/* Outputs */}
        <line x1="270" y1="70" x2="340" y2="70" stroke="#10b981" strokeWidth="2" />
        <text x="355" y="75" fill="#10b981" fontSize="14" fontWeight="bold">Q</text>
        
        <line x1="270" y1="100" x2="340" y2="100" stroke="#10b981" strokeWidth="2" />
        <circle cx="275" cy="100" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
        <text x="355" y="105" fill="#10b981" fontSize="14" fontWeight="bold">Q'</text>
        
        {/* Small triangle on clock (edge indicator) */}
        <text x="210" y="170" fill="#6b7280" fontSize="12" textAnchor="middle">Positive Edge-Triggered D Flip-Flop</text>
      </svg>
    </div>
  );
};

// --- Timing Diagram SVG ---
const TimingDiagramSVG = () => {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md">
      <p className="text-sm font-semibold mb-2 text-center">D Flip-Flop Timing Diagram (Positive Edge-Triggered)</p>
      <svg viewBox="0 0 750 200" className="w-full h-auto">
        {/* Clock */}
        <text x="10" y="35" fill="#3b82f6" fontSize="11" fontWeight="bold">CLK</text>
        <polyline points="60,30 100,30 100,15 140,15 140,30 180,30 180,15 220,15 220,30 260,30 260,15 300,15 300,30 340,30 340,15 380,15 380,30 420,30 420,15 460,15 460,30 500,30 500,15 540,15 540,30 580,30 580,15 620,15 620,30 660,30 660,15 700,15 700,30 740,30" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
        
        {/* Rising edge markers */}
        <circle cx="100" cy="15" r="4" fill="#3b82f6" />
        <circle cx="180" cy="15" r="4" fill="#3b82f6" />
        <circle cx="260" cy="15" r="4" fill="#3b82f6" />
        <circle cx="340" cy="15" r="4" fill="#3b82f6" />
        <circle cx="420" cy="15" r="4" fill="#3b82f6" />
        <circle cx="500" cy="15" r="4" fill="#3b82f6" />
        <circle cx="580" cy="15" r="4" fill="#3b82f6" />
        <circle cx="660" cy="15" r="4" fill="#3b82f6" />
        
        {/* Data Input D */}
        <text x="10" y="75" fill="#ef4444" fontSize="11" fontWeight="bold">D</text>
        <polyline points="60,80 140,80 140,60 260,60 260,80 340,80 340,60 460,60 460,80 540,80 540,60 660,60 660,80 740,80" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        
        {/* Data labels */}
        <text x="100" y="55" fill="#ef4444" fontSize="10">0</text>
        <text x="200" y="55" fill="#ef4444" fontSize="10">1</text>
        <text x="300" y="55" fill="#ef4444" fontSize="10">0</text>
        <text x="400" y="55" fill="#ef4444" fontSize="10">1</text>
        <text x="500" y="75" fill="#ef4444" fontSize="10">0</text>
        <text x="600" y="55" fill="#ef4444" fontSize="10">1</text>
        
        {/* Output Q */}
        <text x="10" y="120" fill="#10b981" fontSize="11" fontWeight="bold">Q</text>
        <polyline points="60,125 100,125 100,105 140,105 140,125 180,125 180,105 220,105 220,125 260,125 260,105 300,105 300,125 340,125 340,105 380,105 380,125 420,125 420,105 460,105 460,125 500,125 500,105 540,105 540,125 580,125 580,105 620,105 620,125 660,125 660,105 700,105 700,125 740,125" fill="none" stroke="#10b981" strokeWidth="2.5" />
        
        {/* Setup/Hold indication */}
        <rect x="70" y="135" width="40" height="15" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
        <text x="90" y="146" fill="#f59e0b" fontSize="8" textAnchor="middle">Setup</text>
        
        <rect x="100" y="135" width="30" height="15" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1" />
        <text x="115" y="146" fill="#ef4444" fontSize="8" textAnchor="middle">Hold</text>
        
        {/* Legend */}
        <text x="300" y="170" fill="#6b7280" fontSize="10">Q changes only at ↑ edge, capturing D value at that instant</text>
      </svg>
    </div>
  );
};

// --- Characteristic Equation SVG ---
const CharacteristicEquationSVG = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl">
      <p className="text-lg font-semibold mb-3">Characteristic Equation</p>
      <div className="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
        Q(t+1) = D
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
        Next state equals the Data input. <br />
        Simple! No constraints, no invalid states.
      </p>
    </div>
  );
};

const Topic8 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  const questions = [
    { q: "What is a D flip-flop? Why is it called 'Data' or 'Delay' flip-flop?", a: "A D flip-flop has a single data input D. The output Q takes the value of D at the active clock edge. It's called Data (stores data) or Delay (delays input by one clock cycle)." },
    { q: "How is a D flip-flop constructed from an SR flip-flop?", a: "Add an inverter between S and R inputs. Connect D to S and D' (inverted) to R. This ensures S and R are never both 1, eliminating the invalid state." },
    { q: "What is the characteristic equation of a D flip-flop?", a: "Q(t+1) = D. This means the next state equals the current D input value at the clock edge." },
    { q: "Why does the D flip-flop have no invalid state?", a: "Because S and R are complements of each other (S=D, R=D'). They can never both be 1 simultaneously." },
    { q: "Draw the truth table of a positive edge-triggered D flip-flop.", a: "At rising edge: if D=0 → Q=0; if D=1 → Q=1. Between edges, Q holds its value regardless of D changes." },
    { q: "What is the difference between a D latch and a D flip-flop?", a: "D latch is level-sensitive (transparent when CLK=1). D flip-flop is edge-triggered (samples only at clock edge). Flip-flops are built from two latches (master-slave)." },
    { q: "Explain the 'transparency' concept in D latch vs D flip-flop.", a: "D latch: output follows D while CLK=1 (transparent). D flip-flop: output only changes at edge, never transparent." },
    { q: "What are setup time and hold time for a D flip-flop?", a: "Setup time: D must be stable before clock edge. Hold time: D must remain stable after clock edge. Violations cause metastability." },
    { q: "Why is the D flip-flop the most important sequential element in digital design?", a: "Simple, no invalid states, easy to synthesize, and forms the basis of registers, counters, and memory elements in almost all digital systems." },
    { q: "How many D flip-flops are needed to store an 8-bit number?", a: "8 D flip-flops (one per bit). This forms an 8-bit register." },
    { q: "What is a 'register' in terms of D flip-flops?", a: "A register is a group of D flip-flops sharing a common clock, used to store multiple bits of data." },
    { q: "Draw the timing diagram for a D flip-flop showing setup/hold violations.", a: "If D changes during setup/hold window, output may become metastable (unpredictable) or take longer to settle." },
    { q: "How can you convert a D flip-flop to a T flip-flop?", a: "Connect Q' (inverted output) back to D input. Then each clock edge toggles the output." },
    { q: "What is the difference between synchronous and asynchronous inputs in a D flip-flop?", a: "D is synchronous (sampled at clock edge). Asynchronous preset/clear override the clock and set/reset immediately." },
    { q: "What happens if clock is connected to a D flip-flop but D is constant 1?", a: "Q becomes 1 on the first clock edge and stays 1. It does NOT toggle on every edge." },
    { q: "Explain the concept of 'pipelining' using D flip-flops.", a: "D flip-flops separate combinational logic stages. Each stage computes during clock cycle, and FFs capture results at next edge, enabling high throughput." },
    { q: "How many transistors are typically in a CMOS D flip-flop?", a: "About 24-32 transistors (6 for clocked inverters + pass gates). Much simpler than JK or SR." },
    { q: "What is the 'clock-to-Q' delay (t_cq) in a D flip-flop?", a: "Time from clock edge to output Q becoming valid. Critical for timing analysis." },
    { q: "How does a D flip-flop store memory when the clock is not active?", a: "Internal feedback loop (master-slave structure) holds the value using cross-coupled inverters." },
    { q: "What is the difference between 74HC74 and 74HC175?", a: "74HC74 is dual D flip-flop (individual clocks). 74HC175 is quad D flip-flop with common clock (4-bit register)." },
    { q: "Why do most modern CPUs use D flip-flops in their pipelines?", a: "Simple, fast, no race conditions, easy timing closure, and low power consumption." },
    { q: "Draw the internal circuit of an edge-triggered D flip-flop using transmission gates.", a: "Two back-to-back latches: master latch (transparent on CLK=0) and slave latch (transparent on CLK=1), with D input and Q output." }
  ];
  
  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
  const keyframes = `
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fadeSlideUp {
      animation: fadeSlideUp 0.6s ease-out forwards;
    }
  `;
  
  return (
    <>
      <style>{keyframes}</style>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="text-center mb-16 animate-fadeSlideUp">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-4">
              Topic 8 • The Workhorse of Digital Design
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              D Flip-Flop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The most important sequential element — Simple, reliable, and the foundation of registers and memory.
            </p>
          </div>
          
          {/* Circuit Diagram */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Internal Circuit: D Flip-Flop from SR
              </h2>
            </div>
            <div className="p-6">
              <DFlipFlopCircuitSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Inverter ensures S and R are always complementary → No invalid state!
              </p>
            </div>
          </div>
          
          {/* Symbol and Characteristic Equation */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 text-center">Standard Symbol</h2>
              <DFlipFlopSymbolSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Triangle on clock input indicates edge-triggered (positive edge shown)
              </p>
            </div>
            <div className="transition-all duration-300 hover:scale-105">
              <CharacteristicEquationSVG />
            </div>
          </div>
          
          {/* Timing Diagram */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Timing Diagram Analysis</h2>
            <TimingDiagramSVG />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Output Q captures the value of D at each rising clock edge and holds it until the next rising edge.
            </p>
          </div>
          
          {/* Theory Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">💾 How It Works</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The D flip-flop samples the D input <strong>only at the active clock edge</strong> (rising or falling). Between edges, the output Q remains unchanged.</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">At the clock edge:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li><span className="text-emerald-400">If D = 0</span> → Q becomes 0 (Reset)</li>
                <li><span className="text-emerald-400">If D = 1</span> → Q becomes 1 (Set)</li>
              </ul>
              <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                📌 <strong>Key Insight:</strong> Q(t+1) = D — Next state equals current D input.
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🏗️ Real-World Applications</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Registers:</strong> 8-bit, 16-bit, 32-bit registers in CPUs</li>
                <li><strong>Memory Arrays:</strong> SRAM cells use D flip-flop structures</li>
                <li><strong>Shift Registers:</strong> Serial-to-parallel conversion</li>
                <li><strong>Counters:</strong> Binary counters, ring counters</li>
                <li><strong>Pipeline Registers:</strong> In processors between stages</li>
                <li><strong>Data Synchronizers:</strong> Crossing clock domains</li>
                <li><strong>Frequency Dividers:</strong> Connect Q' to D (toggle mode)</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <strong>Example:</strong> In <strong>Swadeep's computer in Barrackpore</strong>, billions of D flip-flops form the processor registers, cache memory, and pipeline stages.
              </p>
            </div>
          </div>
          
          {/* Advantages Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Why D Flip-Flop Dominates Digital Design
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">1. No Invalid State</div>
                <p className="text-sm mt-1">Single input D eliminates S=R=1 condition. Safe and predictable.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">2. Simple Equation</div>
                <p className="text-sm mt-1">Q(t+1) = D — Easy to understand and synthesize.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">3. Universal Building Block</div>
                <p className="text-sm mt-1">Can create T, JK, and SR flip-flops from D with minimal logic.</p>
              </div>
            </div>
          </div>
          
          {/* Tips & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Always initialize D flip-flops with a <strong>reset signal</strong> (asynchronous or synchronous).</li>
                <li>For high-speed designs, use <strong>positive edge-triggered</strong> as standard.</li>
                <li>Connect Q' to D to create a <strong>toggle flip-flop</strong> (divide-by-2).</li>
                <li>Use <strong>clock enable</strong> instead of gating the clock for power savings.</li>
                <li>In FPGAs, let the synthesizer infer D flip-flops from <strong>always @(posedge clk)</strong> blocks.</li>
                <li>For shift registers, chain D flip-flops with Q → D of next stage.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Forgetting that D flip-flop is <strong>edge-triggered</strong>, not level-sensitive.</li>
                <li>Violating <strong>setup/hold time</strong> → metastability.</li>
                <li>Using both clock edges in the same design without careful synchronization.</li>
                <li>Assuming D flip-flop toggles when D=1 (it doesn't — it sets to 1 once).</li>
                <li>Not providing a reset → unknown initial state.</li>
                <li>Using asynchronous resets without proper de-assertion timing.</li>
              </ul>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="mb-16">
            <Teacher note="The D flip-flop is your best friend in digital design. Memorize this: Q(t+1) = D. That's it! No complicated constraints like SR or JK. In 90% of practical designs, you'll use D flip-flops. For exams, practice drawing timing diagrams — they love asking 'What is Q at each clock edge?' Also remember: a D flip-flop stores ONE BIT. To store 8 bits, you need 8 D flip-flops (a register). When in doubt, use positive edge-triggered D flip-flops — they're the industry standard." />
          </div>
          
          {/* Q&A Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-16 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Self-Assessment Questions
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {questions.map((item, idx) => (
                <div key={idx} className="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <button onClick={() => toggleAnswer(idx)} className="w-full text-left px-6 py-4 flex justify-between items-center">
                    <span className="font-medium pr-8">{idx+1}. {item.q}</span>
                    <svg className={clsx("w-5 h-5 text-gray-500 transition-transform duration-300", activeQuestion === idx && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={clsx("px-6 overflow-hidden transition-all duration-300", activeQuestion === idx ? "max-h-96 pb-4" : "max-h-0")}>
                    <div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg border-l-4 border-indigo-500">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hint Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">🔍 Think & Observe</h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Observe carefully:</strong> In the timing diagram, what happens to Q when D changes between clock edges? Why?<br />
              <strong>Try changing:</strong> If you connected Q' back to D, what would happen on each clock edge? (Try it — this creates a toggle flip-flop!)<br />
              <strong>Consider:</strong> Why is the D flip-flop called a 'Delay' flip-flop? How does it relate to pipelining?
            </p>
          </div>
          
          {/* Mini Checklist */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">✅ Mini Checklist</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Characteristic equation: Q(t+1) = D</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>No invalid state (S and R are complements)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Edge-triggered (not level-sensitive)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Setup/hold time must be respected</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>One FF stores one bit</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Building block for registers, counters, shift registers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic8;