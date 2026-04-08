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

// --- Animated SVG: Master-Slave Concept with Clock Phases ---
const MasterSlaveConceptSVG = ({ showTiming }) => {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-5xl">
        {/* Background */}
        <rect x="20" y="20" width="860" height="410" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="450" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Master-Slave Flip-Flop: Two-Stage Operation</text>
        
        {/* Clock Signal at top */}
        {showTiming && (
          <>
            <text x="60" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold">CLK</text>
            <polyline points="120,65 160,65 160,50 200,50 200,65 240,65 240,50 280,50 280,65 320,65 320,50 360,50 360,65 400,65 400,50 440,50 440,65 480,65 480,50 520,50 520,65 560,65 560,50 600,50 600,65 640,65 640,50 680,50 680,65 720,65 720,50 760,50 760,65 800,65" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <rect x="120" y="42" width="40" height="30" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1" />
            <text x="140" y="62" fill="#3b82f6" fontSize="9" textAnchor="middle">Master</text>
            <rect x="200" y="42" width="40" height="30" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
            <text x="220" y="62" fill="#f59e0b" fontSize="9" textAnchor="middle">Slave</text>
            <rect x="280" y="42" width="40" height="30" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1" />
            <text x="300" y="62" fill="#3b82f6" fontSize="9" textAnchor="middle">Master</text>
            <rect x="360" y="42" width="40" height="30" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
            <text x="380" y="62" fill="#f59e0b" fontSize="9" textAnchor="middle">Slave</text>
          </>
        )}
        
        {/* Master Section */}
        <rect x="80" y="100" width="350" height="280" rx="10" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
        <rect x="80" y="100" width="350" height="35" rx="10" fill="#3b82f6" fillOpacity="0.2" />
        <text x="255" y="123" fill="#3b82f6" fontSize="16" textAnchor="middle" fontWeight="bold">MASTER STAGE</text>
        <text x="255" y="142" fill="#6b7280" fontSize="11" textAnchor="middle">(Active when CLK = 1)</text>
        
        {/* Master Flip-Flop Symbol */}
        <rect x="150" y="165" width="120" height="100" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
        <text x="210" y="215" fill="#8b5cf6" fontSize="18" textAnchor="middle" fontWeight="bold">FF</text>
        
        {/* Master Inputs */}
        <text x="60" y="200" fill="#ef4444" fontSize="13" fontWeight="bold">J</text>
        <text x="60" y="240" fill="#3b82f6" fontSize="13" fontWeight="bold">K</text>
        <line x1="100" y1="200" x2="150" y2="200" stroke="#ef4444" strokeWidth="2" />
        <line x1="100" y1="240" x2="150" y2="240" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Master Clock (CLK=1) */}
        <line x1="100" y1="300" x2="130" y2="300" stroke="#f59e0b" strokeWidth="2" />
        <text x="60" y="305" fill="#f59e0b" fontSize="13" fontWeight="bold">CLK</text>
        <text x="115" y="318" fill="#3b82f6" fontSize="10" textAnchor="middle">=1</text>
        
        {/* Master Outputs */}
        <text x="320" y="200" fill="#10b981" fontSize="13" fontWeight="bold">Qm</text>
        <text x="320" y="245" fill="#10b981" fontSize="13" fontWeight="bold">Qm'</text>
        <line x1="270" y1="205" x2="310" y2="200" stroke="#10b981" strokeWidth="2" />
        <line x1="270" y1="245" x2="310" y2="245" stroke="#10b981" strokeWidth="2" />
        
        {/* Connection between Master and Slave */}
        <line x1="350" y1="200" x2="480" y2="200" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8 4" />
        <line x1="350" y1="245" x2="480" y2="245" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8 4" />
        <text x="415" y="190" fill="#10b981" fontSize="10" textAnchor="middle">J_slave = Qm</text>
        <text x="415" y="260" fill="#10b981" fontSize="10" textAnchor="middle">K_slave = Qm'</text>
        
        {/* Slave Section */}
        <rect x="470" y="100" width="350" height="280" rx="10" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" />
        <rect x="470" y="100" width="350" height="35" rx="10" fill="#f59e0b" fillOpacity="0.2" />
        <text x="645" y="123" fill="#f59e0b" fontSize="16" textAnchor="middle" fontWeight="bold">SLAVE STAGE</text>
        <text x="645" y="142" fill="#6b7280" fontSize="11" textAnchor="middle">(Active when CLK = 0)</text>
        
        {/* Slave Flip-Flop Symbol */}
        <rect x="540" y="165" width="120" height="100" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
        <text x="600" y="215" fill="#8b5cf6" fontSize="18" textAnchor="middle" fontWeight="bold">FF</text>
        
        {/* Slave Inputs (from Master outputs) */}
        <text x="490" y="200" fill="#10b981" fontSize="11" fontWeight="bold">J_s = Qm</text>
        <text x="490" y="245" fill="#10b981" fontSize="11" fontWeight="bold">K_s = Qm'</text>
        
        {/* Slave Clock (inverted) */}
        <line x1="490" y1="300" x2="520" y2="300" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="495" cy="300" r="5" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="460" y="305" fill="#f59e0b" fontSize="13" fontWeight="bold">CLK</text>
        <text x="505" y="318" fill="#f59e0b" fontSize="10" textAnchor="middle">=0</text>
        
        {/* Slave Outputs (Final) */}
        <text x="710" y="200" fill="#10b981" fontSize="14" fontWeight="bold">Q</text>
        <text x="710" y="245" fill="#10b981" fontSize="14" fontWeight="bold">Q'</text>
        <line x1="660" y1="205" x2="700" y2="200" stroke="#10b981" strokeWidth="2.5" />
        <line x1="660" y1="245" x2="700" y2="245" stroke="#10b981" strokeWidth="2.5" />
        <circle cx="705" cy="240" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
        
        {/* Inverter between Master and Slave clocks */}
        <rect x="415" y="290" width="60" height="25" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="445" y="307" fill="#f59e0b" fontSize="10" textAnchor="middle">NOT</text>
        <circle cx="475" cy="302" r="3" fill="#f59e0b" />
        <line x1="350" y1="302" x2="415" y2="302" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="480" y1="302" x2="490" y2="302" stroke="#f59e0b" strokeWidth="1.5" />
        
        {/* Legend */}
        <rect x="80" y="400" width="12" height="12" fill="#3b82f6" />
        <text x="98" y="410" fill="#6b7280" fontSize="10">Master (CLK=1)</text>
        <rect x="220" y="400" width="12" height="12" fill="#f59e0b" />
        <text x="238" y="410" fill="#6b7280" fontSize="10">Slave (CLK=0)</text>
        <rect x="360" y="400" width="12" height="12" fill="#10b981" />
        <text x="378" y="410" fill="#6b7280" fontSize="10">Internal Feedback</text>
      </svg>
    </div>
  );
};

// --- Timing Diagram: Master-Slave Operation ---
const TimingDiagramSVG = () => {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md">
      <p className="text-sm font-semibold mb-2 text-center">Master-Slave Timing Diagram (Race-Around Eliminated)</p>
      <svg viewBox="0 0 850 320" className="w-full h-auto">
        {/* Clock */}
        <text x="10" y="35" fill="#f59e0b" fontSize="11" fontWeight="bold">CLK</text>
        <polyline points="60,30 100,30 100,15 140,15 140,30 180,30 180,15 220,15 220,30 260,30 260,15 300,15 300,30 340,30 340,15 380,15 380,30 420,30 420,15 460,15 460,30 500,30 500,15 540,15 540,30 580,30 580,15 620,15 620,30 660,30 660,15 700,15 700,30 740,30 740,15 780,15 780,30 820,30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        
        {/* Phase labels */}
        <text x="120" y="55" fill="#3b82f6" fontSize="9" textAnchor="middle">Master</text>
        <text x="200" y="55" fill="#f59e0b" fontSize="9" textAnchor="middle">Slave</text>
        <text x="280" y="55" fill="#3b82f6" fontSize="9" textAnchor="middle">Master</text>
        <text x="360" y="55" fill="#f59e0b" fontSize="9" textAnchor="middle">Slave</text>
        <text x="440" y="55" fill="#3b82f6" fontSize="9" textAnchor="middle">Master</text>
        <text x="520" y="55" fill="#f59e0b" fontSize="9" textAnchor="middle">Slave</text>
        
        {/* J Input */}
        <text x="10" y="90" fill="#ef4444" fontSize="11" fontWeight="bold">J</text>
        <polyline points="60,95 140,95 140,75 260,75 260,95 340,95 340,75 460,75 460,95 540,95 540,75 660,75 660,95 820,95" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        
        {/* K Input */}
        <text x="10" y="130" fill="#3b82f6" fontSize="11" fontWeight="bold">K</text>
        <polyline points="60,135 140,135 140,115 260,115 260,135 340,135 340,115 460,115 460,135 540,135 540,115 660,115 660,135 820,135" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
        
        {/* Master Output Qm */}
        <text x="10" y="180" fill="#8b5cf6" fontSize="11" fontWeight="bold">Qm</text>
        <polyline points="60,185 100,185 100,165 140,165 140,185 180,185 180,165 220,165 220,185 260,185 260,165 300,165 300,185 340,185 340,165 380,165 380,185 420,185 420,165 460,165 460,185 500,185 500,165 540,165 540,185 580,185 580,165 620,165 620,185 660,185 660,165 700,165 700,185 740,185 740,165 780,165 780,185 820,185" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="8 4" />
        
        {/* Master toggles during CLK=1 */}
        <rect x="140" y="165" width="120" height="30" fill="#3b82f6" fillOpacity="0.15" />
        <rect x="300" y="165" width="120" height="30" fill="#3b82f6" fillOpacity="0.15" />
        <rect x="460" y="165" width="120" height="30" fill="#3b82f6" fillOpacity="0.15" />
        
        {/* Slave Output Q (Final) */}
        <text x="10" y="235" fill="#10b981" fontSize="11" fontWeight="bold">Q</text>
        <polyline points="60,240 140,240 140,220 220,220 220,240 300,240 300,220 380,220 380,240 460,240 460,220 540,220 540,240 620,240 620,220 700,220 700,240 780,240 780,220 820,240" fill="none" stroke="#10b981" strokeWidth="3" />
        
        {/* Q changes only at falling edges */}
        <circle cx="140" cy="220" r="4" fill="#10b981" />
        <circle cx="300" cy="220" r="4" fill="#10b981" />
        <circle cx="460" cy="220" r="4" fill="#10b981" />
        <circle cx="620" cy="220" r="4" fill="#10b981" />
        
        {/* Arrows showing sampling points */}
        <line x1="180" y1="185" x2="180" y2="220" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="340" y1="185" x2="340" y2="220" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="500" y1="185" x2="500" y2="220" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Explanation */}
        <text x="425" y="290" fill="#6b7280" fontSize="10" textAnchor="middle">Master samples J,K during CLK=1. Slave copies Qm at falling edge.</text>
        <text x="425" y="305" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">Result: Q changes exactly once per clock cycle → No race-around!</text>
      </svg>
    </div>
  );
};

// --- Race-Around Comparison SVG ---
const RaceAroundComparisonSVG = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <text x="400" y="20" fill="#6b7280" fontSize="12" textAnchor="middle">Comparison: Single JK (Level-Sensitive) vs Master-Slave JK</text>
        
        {/* Single JK (Race-Around) */}
        <rect x="50" y="40" width="330" height="180" rx="6" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" />
        <text x="215" y="65" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">❌ Single JK (Level-Sensitive)</text>
        
        {/* Waveform for Single JK */}
        <text x="65" y="95" fill="#f59e0b" fontSize="9">CLK</text>
        <polyline points="90,90 110,90 110,80 130,80 130,90 150,90 150,80 170,80 170,90 190,90 190,80 210,80 210,90 230,90 230,80 250,80 250,90 270,90 270,80 290,80 290,90 310,90 310,80 330,80 330,90 350,90 370,90" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        
        <text x="65" y="115" fill="#10b981" fontSize="9">Q</text>
        <polyline points="90,115 110,115 110,100 120,100 120,115 130,115 130,100 140,100 140,115 150,115 150,100 160,100 160,115 170,115 170,100 180,100 180,115 190,115 190,100 200,100 200,115 210,115 210,100 220,100 220,115 230,115 230,100 240,100 240,115 250,115 250,100 260,100 260,115 270,115 270,100 280,100 280,115 290,115 290,100 300,100 300,115 310,115 310,100 320,100 320,115 330,115 330,100 340,100 340,115 350,115 350,100 360,100 360,115 370,115" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <text x="215" y="145" fill="#ef4444" fontSize="9" textAnchor="middle">Multiple toggles during CLK=1 → Unpredictable!</text>
        <rect x="130" y="78" width="120" height="45" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Master-Slave JK (No Race-Around) */}
        <rect x="420" y="40" width="330" height="180" rx="6" fill="#1f2937" stroke="#10b981" strokeWidth="1.5" />
        <text x="585" y="65" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">✅ Master-Slave JK</text>
        
        {/* Waveform for Master-Slave */}
        <text x="435" y="95" fill="#f59e0b" fontSize="9">CLK</text>
        <polyline points="460,90 480,90 480,80 500,80 500,90 520,90 520,80 540,80 540,90 560,90 560,80 580,80 580,90 600,90 600,80 620,80 620,90 640,90 640,80 660,80 660,90 680,90 680,80 700,80 700,90 720,90 740,90" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        
        <text x="435" y="115" fill="#10b981" fontSize="9">Qm</text>
        <polyline points="460,115 480,115 480,100 500,100 500,115 520,115 520,100 540,100 540,115 560,115 560,100 580,100 580,115 600,115 600,100 620,100 620,115 640,115 640,100 660,100 660,115 680,115 680,100 700,100 700,115 720,115 740,115" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 3" />
        
        <text x="435" y="140" fill="#10b981" fontSize="9">Q</text>
        <polyline points="460,145 480,145 480,130 500,130 500,145 540,145 540,130 580,130 580,145 620,145 620,130 660,130 660,145 700,145 700,130 740,130 740,145" fill="none" stroke="#10b981" strokeWidth="2" />
        
        <text x="585" y="170" fill="#10b981" fontSize="9" textAnchor="middle">Q changes only at falling edge → One toggle per cycle!</text>
        <circle cx="500" cy="130" r="3" fill="#10b981" />
        <circle cx="580" cy="130" r="3" fill="#10b981" />
        <circle cx="660" cy="130" r="3" fill="#10b981" />
      </svg>
    </div>
  );
};

// --- Two-Stage Operation Explanation ---
const TwoStageOperationSVG = () => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    { 
      title: "Stage 1: CLK = 1 (Master Active)", 
      description: "Master enabled, Slave disabled (isolated from output). Master samples J and K inputs, updates its internal state Qm based on J, K, and feedback. Output Q remains at previous value (held by slave).",
      icon: "🔓",
      color: "#3b82f6"
    },
    { 
      title: "Stage 2: CLK Transitions 1 → 0 (Falling Edge)", 
      description: "At the falling edge, Master is disabled (stops sampling). Slave becomes enabled. The inverter ensures clean transition — no overlap.",
      icon: "⚡",
      color: "#f59e0b"
    },
    { 
      title: "Stage 3: CLK = 0 (Slave Active)", 
      description: "Slave enabled, Master disabled. Slave copies Master's Qm to output Q. Final output updates exactly once per clock cycle. Race-around eliminated!",
      icon: "🔒",
      color: "#10b981"
    }
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
            {stage.icon} {stage.title.split(':')[0]}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 w-full transition-all duration-300">
        <h3 className="font-bold mb-2" style={{ color: stages[activeStage].color }}>{stages[activeStage].title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{stages[activeStage].description}</p>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <strong>Key Insight:</strong> Master and slave are <strong>never active simultaneously</strong> — the race-around condition is physically impossible!
      </div>
    </div>
  );
};

const Topic13 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showTiming, setShowTiming] = useState(false);
  
  const questions = [
    { q: "What is a master-slave flip-flop?", a: "A master-slave flip-flop consists of two flip-flops (master and slave) connected in series with complementary clocks. Master is active on CLK=1, slave on CLK=0." },
    { q: "How does master-slave configuration eliminate the race-around condition?", a: "Master and slave are never active simultaneously. Master samples during CLK=1, slave copies during CLK=0. Output updates only once per clock cycle." },
    { q: "What is the role of the inverter in a master-slave flip-flop?", a: "The inverter creates complementary clocks for master and slave, ensuring they never activate at the same time." },
    { q: "Draw the block diagram of a master-slave JK flip-flop.", a: "Master JK FF output Qm connects to Slave J input, Qm' to Slave K input. Master clock = CLK, Slave clock = NOT CLK." },
    { q: "What happens during CLK=1 in a master-slave flip-flop?", a: "Master is enabled and samples inputs. Slave is disabled, so output Q holds its previous value." },
    { q: "What happens at the falling edge of CLK?", a: "Master is disabled (stops sampling). Slave becomes enabled and copies master's Qm to output Q." },
    { q: "What happens during CLK=0 after the falling edge?", a: "Slave remains enabled but its inputs (J_s=Qm, K_s=Qm') are stable, so Q holds the value from the falling edge." },
    { q: "Why does master-slave configuration prevent multiple toggles when J=K=1?", a: "Master may toggle multiple times during CLK=1, but slave copies only the final Qm value at the falling edge. Output toggles exactly once per cycle." },
    { q: "What is the difference between master-slave and edge-triggered flip-flops?", a: "Master-slave uses two latches (level-sensitive) with complementary clocks. Edge-triggered uses pulse shaping but behaves similarly externally." },
    { q: "What is the propagation delay of a master-slave flip-flop?", a: "Two stage delays (master propagation + slave propagation). Slower than single-stage but predictable." },
    { q: "What are the advantages of master-slave configuration?", a: "Eliminates race-around, predictable one-toggle-per-cycle, works with level-sensitive clocks, conceptually clear." },
    { q: "What are the disadvantages of master-slave configuration?", a: "Slower (two propagation delays), more complex (double the gates), still requires minimum clock pulse width." },
    { q: "What is the 'one-shot' property of master-slave flip-flops?", a: "Output changes exactly once per clock cycle regardless of how many times master toggles — ideal for counters." },
    { q: "How does a master-slave D flip-flop differ from master-slave JK?", a: "Same structure, but master and slave are D flip-flops instead of JK. D input connects to master D, master Q connects to slave D." },
    { q: "What is the minimum clock pulse width requirement for master-slave?", a: "CLK=1 must be long enough for master to settle (≥ t_setup + t_prop_master). CLK=0 must be long enough for slave to settle (≥ t_hold + t_prop_slave)." },
    { q: "Why is master-slave still taught if modern ICs use edge-triggered?", a: "It clearly demonstrates two-stage operation and conceptually explains how race-around is solved." },
    { q: "What happens if clock pulse is too narrow in master-slave?", a: "Master may not have enough time to sample properly, causing metastability or incorrect latching." },
    { q: "How many transistors in a typical master-slave JK flip-flop?", a: "About 40-50 transistors (two JK flip-flops + inverter). Double that of a single JK." },
    { q: "What is the difference between 74LS76 and 74LS107?", a: "74LS76 is dual master-slave JK flip-flop with preset/clear. 74LS107 is dual JK flip-flop with different pinout." },
    { q: "In a master-slave flip-flop, when is the output Q updated?", a: "Only on the falling edge of the clock (when slave copies master). Output is stable between falling edges." }
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
              Topic 13 • Two-Stage Mastery
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              Master-Slave Flip-Flop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Two-stage operation, complementary clocks, and the elegant solution to race-around.
            </p>
          </div>
          
          {/* Master-Slave Concept with Toggle for Timing */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Two-Stage Architecture
              </h2>
              <button
                onClick={() => setShowTiming(!showTiming)}
                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", showTiming ? "bg-emerald-500 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50")}
              >
                {showTiming ? "Hide Clock Phases" : "Show Clock Phases"}
              </button>
            </div>
            <div className="p-6">
              <MasterSlaveConceptSVG showTiming={showTiming} />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Master active on CLK=1, Slave active on CLK=0 (inverted). Never active simultaneously → No race-around!
              </p>
            </div>
          </div>
          
          {/* Two-Stage Operation Interactive */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">How Two-Stage Operation Works</h2>
            <TwoStageOperationSVG />
          </div>
          
          {/* Race-Around Comparison */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Single JK vs Master-Slave JK</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <RaceAroundComparisonSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Master-slave eliminates multiple toggles — output changes exactly once per clock cycle!
              </p>
            </div>
          </div>
          
          {/* Timing Diagram */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Detailed Timing Analysis</h2>
            <TimingDiagramSVG />
          </div>
          
          {/* Theory Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🔧 Why It Works</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The master-slave configuration solves race-around through <strong>temporal separation</strong>:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li><span className="text-emerald-400">CLK=1:</span> Master samples inputs, slave holds output</li>
                <li><span className="text-emerald-400">Falling Edge:</span> Master disabled, slave enabled</li>
                <li><span className="text-emerald-400">CLK=0:</span> Slave copies master, output updates</li>
              </ul>
              <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                📌 <strong>Result:</strong> Master and slave are NEVER active at the same time!
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🏆 Key Properties</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li><span className="text-purple-400">One-shot property:</span> Output changes exactly once per clock cycle</li>
                <li><span className="text-purple-400">Race-around free:</span> Even with J=K=1, no multiple toggles</li>
                <li><span className="text-purple-400">Pulse-triggered:</span> Responds to full clock pulse, not just edge</li>
                <li><span className="text-purple-400">Predictable timing:</span> Output updates at falling edge</li>
              </ul>
              <p className="mt-3 text-gray-700 dark:text-gray-300"><strong>Analogy:</strong> Like <strong>Abhronila in Kolkata</strong> taking notes. She listens during lecture (master active), then writes notes during break (slave active). Never does both at once — no confusion!</p>
            </div>
          </div>
          
          {/* Advantages & Disadvantages */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">✅ Advantages</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Completely eliminates race-around condition</li>
                <li>Predictable one-toggle-per-cycle for J=K=1</li>
                <li>Works with level-sensitive clock inputs</li>
                <li>Conceptually clear for understanding sequential logic</li>
                <li>Output stable between clock edges</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">⚠️ Disadvantages</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Slower (two propagation delays)</li>
                <li>More complex (double the gates)</li>
                <li>Still requires minimum clock pulse width</li>
                <li>Not used in modern high-speed ICs</li>
                <li>Edge-triggered FFs are faster and simpler</li>
              </ul>
            </div>
          </div>
          
          {/* Timing Control Section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Timing Control & Constraints
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-blue-600 dark:text-blue-400">⏱️ Setup Time</div>
                <p className="text-sm mt-1">J and K must be stable before the falling edge (when slave samples).</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-blue-600 dark:text-blue-400">⏱️ Hold Time</div>
                <p className="text-sm mt-1">J and K must remain stable after the falling edge for slave to capture correctly.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-blue-600 dark:text-blue-400">⏱️ Minimum Pulse Width</div>
                <p className="text-sm mt-1">CLK=1 must be ≥ master propagation delay; CLK=0 must be ≥ slave propagation delay.</p>
              </div>
            </div>
          </div>
          
          {/* Tips & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Master-slave is <strong>pulse-triggered</strong> — responds to entire clock pulse, not just edge.</li>
                <li>For frequency division, J=K=1 gives divide-by-2 with clean output.</li>
                <li>Remember: Q updates on <strong>falling edge</strong> (when slave copies master).</li>
                <li>The inverter between master and slave clocks is critical — never omit it!</li>
                <li>Modern designs use edge-triggered FFs, but master-slave teaches the concept.</li>
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
            <Teacher note="The master-slave flip-flop is the elegant solution to the race-around problem. The key insight: separate sampling (master) from output (slave) using complementary clocks. In exams, you'll often be asked to draw the timing diagram for J=K=1 — remember that Qm toggles during CLK=1, but Q only changes at the falling edge. This is the 'divide-by-2' behavior. For modern designs, we use edge-triggered FFs, but understanding master-slave gives you deep insight into clocking strategies and timing analysis." />
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
              <strong>Observe carefully:</strong> In the timing diagram, why does Qm toggle during CLK=1 but Q only changes at falling edges?<br />
              <strong>Try changing:</strong> What would happen if you removed the inverter between master and slave clocks? (Answer: Both active simultaneously → race-around returns!)<br />
              <strong>Consider:</strong> How would you modify this circuit to make it positive-edge triggered instead of falling-edge triggered?
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

export default Topic13;