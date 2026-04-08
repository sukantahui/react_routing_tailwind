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

// --- Animated SVG: Master-Slave JK Flip-Flop Internal Structure ---
const MasterSlaveJKFlipFlopSVG = ({ showClockPhase }) => {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-5xl">
        {/* Background */}
        <rect x="20" y="20" width="860" height="460" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="450" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Master-Slave JK Flip-Flop (Two-Stage Operation)</text>
        
        {/* Clock Phase Indicator */}
        {showClockPhase && (
          <g>
            <rect x="30" y="60" width="180" height="30" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1" />
            <text x="120" y="80" fill="#3b82f6" fontSize="11" textAnchor="middle">CLK=1 → Master Active</text>
            <rect x="30" y="420" width="180" height="30" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
            <text x="120" y="440" fill="#f59e0b" fontSize="11" textAnchor="middle">CLK=0 → Slave Active</text>
          </g>
        )}
        
        {/* ==================== MASTER SECTION ==================== */}
        <rect x="60" y="100" width="350" height="300" rx="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 3" />
        <text x="235" y="125" fill="#3b82f6" fontSize="14" textAnchor="middle" fontWeight="bold">MASTER JK Flip-Flop</text>
        <text x="235" y="142" fill="#6b7280" fontSize="10" textAnchor="middle">(Enabled when CLK = 1)</text>
        
        {/* Master J and K Inputs */}
        <text x="30" y="180" fill="#ef4444" fontSize="14" fontWeight="bold">J</text>
        <text x="30" y="240" fill="#3b82f6" fontSize="14" fontWeight="bold">K</text>
        
        {/* Master AND gates */}
        <rect x="120" y="165" width="80" height="45" rx="4" fill="#374151" stroke="#ef4444" strokeWidth="1.5" />
        <text x="160" y="190" fill="#ef4444" fontSize="10" textAnchor="middle">AND</text>
        <text x="160" y="202" fill="#9ca3af" fontSize="8" textAnchor="middle">J·Qm'·CLK</text>
        
        <rect x="120" y="230" width="80" height="45" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="160" y="255" fill="#3b82f6" fontSize="10" textAnchor="middle">AND</text>
        <text x="160" y="267" fill="#9ca3af" fontSize="8" textAnchor="middle">K·Qm·CLK</text>
        
        {/* Master SR Latch */}
        <rect x="260" y="175" width="130" height="100" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="325" y="195" fill="#8b5cf6" fontSize="10" textAnchor="middle">SR Latch</text>
        
        <rect x="280" y="205" width="45" height="30" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1" />
        <text x="302" y="225" fill="#10b981" fontSize="8" textAnchor="middle">NOR</text>
        
        <rect x="280" y="240" width="45" height="30" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1" />
        <text x="302" y="260" fill="#10b981" fontSize="8" textAnchor="middle">NOR</text>
        
        <line x1="325" y1="220" x2="355" y2="255" stroke="#10b981" strokeWidth="1" />
        <line x1="325" y1="255" x2="355" y2="220" stroke="#10b981" strokeWidth="1" />
        
        {/* Master outputs */}
        <text x="430" y="210" fill="#10b981" fontSize="12" fontWeight="bold">Qm</text>
        <text x="430" y="260" fill="#10b981" fontSize="12" fontWeight="bold">Qm'</text>
        <line x1="390" y1="220" x2="420" y2="210" stroke="#10b981" strokeWidth="1.5" />
        <line x1="390" y1="255" x2="420" y2="260" stroke="#10b981" strokeWidth="1.5" />
        
        {/* Master feedback lines */}
        <line x1="420" y1="210" x2="200" y2="187" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="420" y1="260" x2="200" y2="252" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
        
        {/* Master clock line */}
        <line x1="80" y1="310" x2="160" y2="310" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="160" y1="310" x2="160" y2="187" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="160" y1="310" x2="160" y2="252" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Master CLK=1 indicator */}
        <rect x="80" y="300" width="60" height="20" rx="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
        <text x="110" y="314" fill="#f59e0b" fontSize="9" textAnchor="middle">CLK=1</text>
        
        {/* ==================== SLAVE SECTION ==================== */}
        <rect x="490" y="100" width="350" height="300" rx="8" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
        <text x="665" y="125" fill="#f59e0b" fontSize="14" textAnchor="middle" fontWeight="bold">SLAVE JK Flip-Flop</text>
        <text x="665" y="142" fill="#6b7280" fontSize="10" textAnchor="middle">(Enabled when CLK = 0)</text>
        
        {/* Slave J and K connected to Master Q and Q' */}
        <text x="500" y="180" fill="#ef4444" fontSize="11" fontWeight="bold">J_s = Qm</text>
        <text x="500" y="240" fill="#3b82f6" fontSize="11" fontWeight="bold">K_s = Qm'</text>
        
        <line x1="440" y1="210" x2="510" y2="180" stroke="#10b981" strokeWidth="1.5" />
        <line x1="440" y1="260" x2="510" y2="240" stroke="#10b981" strokeWidth="1.5" />
        
        {/* Slave AND gates */}
        <rect x="560" y="165" width="80" height="45" rx="4" fill="#374151" stroke="#ef4444" strokeWidth="1.5" />
        <text x="600" y="190" fill="#ef4444" fontSize="10" textAnchor="middle">AND</text>
        <text x="600" y="202" fill="#9ca3af" fontSize="8" textAnchor="middle">J_s·Qs'·CLK'</text>
        
        <rect x="560" y="230" width="80" height="45" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="600" y="255" fill="#3b82f6" fontSize="10" textAnchor="middle">AND</text>
        <text x="600" y="267" fill="#9ca3af" fontSize="8" textAnchor="middle">K_s·Qs·CLK'</text>
        
        {/* Slave SR Latch */}
        <rect x="700" y="175" width="120" height="100" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="760" y="195" fill="#8b5cf6" fontSize="10" textAnchor="middle">SR Latch</text>
        
        <rect x="718" y="205" width="40" height="30" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1" />
        <text x="738" y="225" fill="#10b981" fontSize="8" textAnchor="middle">NOR</text>
        
        <rect x="718" y="240" width="40" height="30" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1" />
        <text x="738" y="260" fill="#10b981" fontSize="8" textAnchor="middle">NOR</text>
        
        <line x1="758" y1="220" x2="785" y2="255" stroke="#10b981" strokeWidth="1" />
        <line x1="758" y1="255" x2="785" y2="220" stroke="#10b981" strokeWidth="1" />
        
        {/* Slave outputs (Final Q and Q') */}
        <text x="860" y="210" fill="#10b981" fontSize="14" fontWeight="bold">Q</text>
        <text x="860" y="260" fill="#10b981" fontSize="14" fontWeight="bold">Q'</text>
        <line x1="820" y1="220" x2="850" y2="210" stroke="#10b981" strokeWidth="2" />
        <line x1="820" y1="255" x2="850" y2="260" stroke="#10b981" strokeWidth="2" />
        
        {/* Slave clock line (inverted) */}
        <line x1="510" y1="310" x2="600" y2="310" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" />
        <line x1="600" y1="310" x2="600" y2="187" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="600" y1="310" x2="600" y2="252" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Inverter bubble on slave clock */}
        <circle cx="510" cy="310" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        
        {/* Slave CLK=0 indicator */}
        <rect x="510" y="300" width="60" height="20" rx="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
        <text x="540" y="314" fill="#f59e0b" fontSize="9" textAnchor="middle">CLK=0</text>
        
        {/* Main Clock Input */}
        <text x="50" y="370" fill="#f59e0b" fontSize="14" fontWeight="bold">CLK</text>
        <line x1="110" y1="370" x2="80" y2="310" stroke="#f59e0b" strokeWidth="2" />
        <line x1="110" y1="370" x2="510" y2="370" stroke="#f59e0b" strokeWidth="2" />
        <line x1="510" y1="370" x2="510" y2="310" stroke="#f59e0b" strokeWidth="2" />
        
        {/* Legend */}
        <rect x="60" y="420" width="12" height="12" fill="#3b82f6" />
        <text x="78" y="430" fill="#6b7280" fontSize="10">Master (CLK=1)</text>
        <rect x="200" y="420" width="12" height="12" fill="#f59e0b" />
        <text x="218" y="430" fill="#6b7280" fontSize="10">Slave (CLK=0)</text>
        <rect x="340" y="420" width="12" height="12" fill="#10b981" />
        <text x="358" y="430" fill="#6b7280" fontSize="10">Feedback Paths</text>
      </svg>
    </div>
  );
};

// --- Timing Diagram SVG ---
const TimingDiagramSVG = () => {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md">
      <p className="text-sm font-semibold mb-2 text-center">Master-Slave JK Flip-Flop Timing Diagram (Eliminates Race-Around)</p>
      <svg viewBox="0 0 850 300" className="w-full h-auto">
        {/* Clock */}
        <text x="10" y="35" fill="#f59e0b" fontSize="11" fontWeight="bold">CLK</text>
        <polyline points="60,30 100,30 100,15 140,15 140,30 180,30 180,15 220,15 220,30 260,30 260,15 300,15 300,30 340,30 340,15 380,15 380,30 420,30 420,15 460,15 460,30 500,30 500,15 540,15 540,30 580,30 580,15 620,15 620,30 660,30 660,15 700,15 700,30 740,30 740,15 780,15 780,30 820,30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        
        {/* Rising and falling edge markers */}
        <circle cx="100" cy="15" r="3" fill="#f59e0b" />
        <circle cx="180" cy="15" r="3" fill="#f59e0b" />
        <circle cx="260" cy="15" r="3" fill="#f59e0b" />
        <circle cx="340" cy="15" r="3" fill="#f59e0b" />
        <circle cx="100" cy="30" r="3" fill="#ef4444" />
        <circle cx="180" cy="30" r="3" fill="#ef4444" />
        <circle cx="260" cy="30" r="3" fill="#ef4444" />
        <circle cx="340" cy="30" r="3" fill="#ef4444" />
        
        {/* J Input */}
        <text x="10" y="80" fill="#ef4444" fontSize="11" fontWeight="bold">J</text>
        <polyline points="60,85 140,85 140,65 260,65 260,85 340,85 340,65 460,65 460,85 540,85 540,65 660,65 660,85 820,85" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        
        {/* K Input */}
        <text x="10" y="120" fill="#3b82f6" fontSize="11" fontWeight="bold">K</text>
        <polyline points="60,125 140,125 140,105 260,105 260,125 340,125 340,105 460,105 460,125 540,125 540,105 660,105 660,125 820,125" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
        
        {/* Master Output Qm */}
        <text x="10" y="170" fill="#8b5cf6" fontSize="11" fontWeight="bold">Qm</text>
        <polyline points="60,175 100,175 100,155 140,155 140,175 180,175 180,155 220,155 220,175 260,175 260,155 300,155 300,175 340,175 340,155 380,155 380,175 420,175 420,155 460,155 460,175 500,175 500,155 540,155 540,175 580,175 580,155 620,155 620,175 660,175 660,155 700,155 700,175 740,175 740,155 780,155 780,175 820,175" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="8 4" />
        
        {/* Slave Output Q (Final) */}
        <text x="10" y="220" fill="#10b981" fontSize="11" fontWeight="bold">Q</text>
        <polyline points="60,225 140,225 140,205 220,205 220,225 300,225 300,205 380,205 380,225 460,225 460,205 540,205 540,225 620,225 620,205 700,205 700,225 780,225 780,205 820,225" fill="none" stroke="#10b981" strokeWidth="3" />
        
        {/* Phase labels */}
        <text x="120" y="260" fill="#3b82f6" fontSize="9" textAnchor="middle">Master</text>
        <text x="200" y="260" fill="#f59e0b" fontSize="9" textAnchor="middle">Slave</text>
        <text x="280" y="260" fill="#3b82f6" fontSize="9" textAnchor="middle">Master</text>
        <text x="360" y="260" fill="#f59e0b" fontSize="9" textAnchor="middle">Slave</text>
        
        {/* Arrows showing propagation */}
        <line x1="140" y1="170" x2="140" y2="205" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="300" y1="170" x2="300" y2="205" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="460" y1="170" x2="460" y2="205" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="620" y1="170" x2="620" y2="205" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Note */}
        <text x="425" y="285" fill="#6b7280" fontSize="10" textAnchor="middle">Q changes only on falling edge of CLK (when slave samples master)</text>
      </svg>
    </div>
  );
};

// --- Working Stages SVG ---
const WorkingStagesSVG = () => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    { title: "Stage 1: CLK = 1 (Master Active)", description: "Master J-K samples inputs based on J, K, Qm, Qm'. Slave is disabled (CLK=0 via inverter). Master output Qm changes according to J,K and current Qm." },
    { title: "Stage 2: CLK Transitions 1→0", description: "At falling edge, master is disabled (stops sampling). Slave is enabled as CLK' becomes 1." },
    { title: "Stage 3: CLK = 0 (Slave Active)", description: "Slave J-K samples from Master outputs (J_s = Qm, K_s = Qm'). Slave output Q becomes Qm. Final output Q updates once per full clock cycle." }
  ];
  
  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl">
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {stages.map((stage, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStage(idx)}
            className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", activeStage === idx ? "bg-indigo-600 text-white shadow-lg scale-105" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50")}
          >
            {stage.title.split(':')[0]}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 w-full transition-all duration-300">
        <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">{stages[activeStage].title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{stages[activeStage].description}</p>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <strong>Key Insight:</strong> Master and slave are NEVER active simultaneously → Race-around eliminated!
      </div>
    </div>
  );
};

const Topic10 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showClockPhase, setShowClockPhase] = useState(false);
  
  const questions = [
    { q: "What is a master-slave JK flip-flop? Why is it called 'master-slave'?", a: "It consists of two JK flip-flops in series: Master (active on CLK=1) and Slave (active on CLK=0). The master 'learns' the input, and the slave 'copies' the master on the falling edge." },
    { q: "How does master-slave configuration eliminate the race-around condition?", a: "Master and slave are never active simultaneously (master on CLK=1, slave on CLK=0). The output toggles only once per clock cycle, preventing multiple toggles." },
    { q: "Draw the block diagram of a master-slave JK flip-flop.", a: "Master JK FF output Qm connects to Slave J input, Qm' to Slave K input. Master clock = CLK, Slave clock = NOT CLK (inverter)." },
    { q: "What happens during CLK=1 in a master-slave JK flip-flop?", a: "Master is enabled and samples J,K inputs. Its output Qm changes according to J,K and its current state. Slave is disabled (output holds previous value)." },
    { q: "What happens at the falling edge of CLK?", a: "Master is disabled (stops sampling). Slave becomes enabled and copies Qm to its output Q. Final output updates once." },
    { q: "What happens during CLK=0 after the falling edge?", a: "Master remains disabled (holds Qm). Slave is enabled but its inputs J_s=Qm and K_s=Qm' are stable, so Q holds the value from the falling edge." },
    { q: "Why does the master-slave JK flip-flop still have a setup time requirement?", a: "J and K must be stable before the falling edge to ensure proper sampling by the master during CLK=1." },
    { q: "What is the difference between master-slave and edge-triggered JK flip-flops?", a: "Both eliminate race-around. Master-slave uses two latches (level-sensitive). Modern edge-triggered uses pulse shaping but behaves similarly." },
    { q: "Draw the timing diagram for a master-slave JK flip-flop with J=K=1.", a: "Qm toggles during CLK=1 (multiple times if level-sensitive), but slave copies only the final Qm value at falling edge, so Q toggles once per clock cycle." },
    { q: "What is the propagation delay of a master-slave JK flip-flop?", a: "Two stage delays (master propagation + slave propagation). Slower than single-stage but predictable." },
    { q: "How is a master-slave D flip-flop constructed?", a: "Replace JK with D by connecting J=D, K=D' (inverter). Same two-stage operation." },
    { q: "What are the advantages of master-slave configuration?", a: "Eliminates race-around, predictable one-toggle-per-cycle, works with level-sensitive clocks." },
    { q: "What are the disadvantages of master-slave configuration?", a: "Slower (two propagation delays), more complex (twice the gates), still sensitive to clock pulse width." },
    { q: "Why is the master-slave JK flip-flop still taught if modern ICs use edge-triggered?", a: "It clearly demonstrates the concept of two-stage operation and how race-around is solved conceptually." },
    { q: "What happens if the clock pulse is too short in a master-slave JK flip-flop?", a: "Master may not have enough time to sample properly, causing metastability or incorrect latching." },
    { q: "How many transistors are in a typical master-slave JK flip-flop?", a: "About 40-50 transistors (two JK flip-flops + inverter). Double that of a single JK." },
    { q: "What is the difference between 74LS76 and 74LS73?", a: "74LS76 is dual master-slave JK flip-flop with preset/clear. 74LS73 is similar but without preset." },
    { q: "In a master-slave JK, when is the output Q updated?", a: "Only on the falling edge of the clock (when slave copies master). The output is stable between falling edges." },
    { q: "Can a master-slave JK flip-flop be used as a divide-by-2 circuit?", a: "Yes! Connect J=K=1. Master toggles during CLK=1, slave copies at falling edge → Q toggles once per clock cycle → divide-by-2." },
    { q: "What is the difference between master-slave and pulse-triggered flip-flops?", a: "Master-slave is a specific implementation of pulse-triggered. Both are level-sensitive internally but appear edge-triggered externally." }
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
              Topic 10 • The Race-Around Solution
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              Master-Slave JK Flip-Flop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Two-stage operation that eliminates race-around condition with clever clock phasing.
            </p>
          </div>
          
          {/* Circuit Diagram with Toggle for Clock Phase */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Internal Architecture: Master + Slave
              </h2>
              <button
                onClick={() => setShowClockPhase(!showClockPhase)}
                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", showClockPhase ? "bg-emerald-500 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50")}
              >
                {showClockPhase ? "Hide Clock Phases" : "Show Clock Phases"}
              </button>
            </div>
            <div className="p-6">
              <MasterSlaveJKFlipFlopSVG showClockPhase={showClockPhase} />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Master enabled on CLK=1 (samples J,K). Slave enabled on CLK=0 (copies Master). Never active together!
              </p>
            </div>
          </div>
          
          {/* Working Stages Interactive */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works — Step by Step</h2>
            <WorkingStagesSVG />
          </div>
          
          {/* Timing Diagram */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Timing Diagram Analysis</h2>
            <TimingDiagramSVG />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Notice: Q changes only on falling edge of CLK, and toggles exactly once per cycle even with J=K=1.
            </p>
          </div>
          
          {/* Theory Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🔧 Why It Works</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The key innovation is <strong>two-stage operation with complementary clocks</strong>:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li><span className="text-emerald-400">CLK=1:</span> Master active, samples J,K. Slave disabled (holds previous Q).</li>
                <li><span className="text-emerald-400">Falling Edge:</span> Master disabled, slave enabled.</li>
                <li><span className="text-emerald-400">CLK=0:</span> Slave active, copies Master's Qm to output Q.</li>
              </ul>
              <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                📌 <strong>Result:</strong> Output updates exactly once per clock cycle — no race-around!
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🏆 Advantages & Trade-offs</h2>
              <div className="space-y-3">
                <div>
                  <div className="font-bold text-green-600 dark:text-green-400">✅ Advantages:</div>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 ml-4">
                    <li>Completely eliminates race-around condition</li>
                    <li>Predictable one-toggle-per-cycle for J=K=1</li>
                    <li>Works with level-sensitive clock inputs</li>
                    <li>Conceptually clear for teaching</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-red-600 dark:text-red-400">⚠️ Disadvantages:</div>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 ml-4">
                    <li>Slower (two propagation delays)</li>
                    <li>More complex (double the gates)</li>
                    <li>Still requires minimum clock pulse width</li>
                    <li>Not used in modern high-speed ICs (edge-triggered is faster)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Real-World Analogy */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Real-World Analogy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Imagine <strong>Debangshuk in Naihati</strong> writing an exam. The <strong>Master</strong> is like him reading a question (active during CLK=1). The <strong>Slave</strong> is like him writing the answer on paper (active during CLK=0). He cannot read and write simultaneously — this prevents confusion (race-around). At the falling edge (end of reading time), he starts writing the final answer. The answer (Q) is updated only once per question cycle!
            </p>
          </div>
          
          {/* Tips & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Master-slave is <strong>pulse-triggered</strong> (responds to full clock pulse, not just edge).</li>
                <li>For frequency division, J=K=1 gives divide-by-2 with clean output.</li>
                <li>In exams, remember: Q updates on <strong>falling edge</strong> (when slave copies master).</li>
                <li>The inverter between master and slave clocks is critical — never omit it!</li>
                <li>Modern designs use <strong>edge-triggered</strong> FFs (faster), but master-slave teaches the concept.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Forgetting that master-slave is <strong>not edge-triggered</strong> (it's pulse-triggered).</li>
                <li>Assuming Q changes on rising edge (it changes on falling edge).</li>
                <li>Not understanding that master can still race internally (but slave prevents output racing).</li>
                <li>Confusing master-slave JK with edge-triggered JK in datasheets.</li>
                <li>Using master-slave in high-speed designs where edge-triggered is better.</li>
              </ul>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="mb-16">
            <Teacher note="The master-slave JK flip-flop is a brilliant solution to the race-around problem. The key insight: separate sampling (master) from output (slave) using complementary clocks. In exams, you'll often be asked to draw the timing diagram for J=K=1 — remember that Qm toggles during CLK=1, but Q only changes at the falling edge. This is the 'divide-by-2' behavior. For modern designs, we use edge-triggered FFs, but understanding master-slave gives you deep insight into clocking strategies." />
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
              <strong>Observe carefully:</strong> In the timing diagram, why does Qm change during CLK=1 but Q only changes at the falling edge?<br />
              <strong>Try changing:</strong> What would happen if you removed the inverter between master and slave clocks? (Answer: Both would be active simultaneously → race-around returns!)<br />
              <strong>Consider:</strong> How would you modify this circuit to make it edge-triggered instead of pulse-triggered?
            </p>
          </div>
          
          {/* Mini Checklist */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">✅ Mini Checklist</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Master active on CLK=1, Slave on CLK=0</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Never active simultaneously → No race-around</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Output Q updates on falling edge of CLK</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>J=K=1 → Q toggles exactly once per cycle</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Slower but predictable timing</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Pulse-triggered (not edge-triggered)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic10;