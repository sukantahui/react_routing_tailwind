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

// --- Animated SVG: JK Flip-Flop Internal Circuit ---
const JKFlipFlopCircuitSVG = ({ showRaceCondition }) => {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <svg viewBox="0 0 850 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-5xl">
        {/* Background */}
        <rect x="20" y="20" width="810" height="380" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="425" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">JK Flip-Flop Construction from SR Flip-Flop</text>
        
        {/* Inputs */}
        <text x="50" y="130" fill="#ef4444" fontSize="16" fontWeight="bold">J</text>
        <text x="50" y="190" fill="#3b82f6" fontSize="16" fontWeight="bold">K</text>
        <text x="50" y="260" fill="#f59e0b" fontSize="16" fontWeight="bold">CLK</text>
        
        {/* Feedback lines from Q and Q' */}
        <text x="720" y="130" fill="#10b981" fontSize="14" fontWeight="bold">Q</text>
        <text x="720" y="190" fill="#10b981" fontSize="14" fontWeight="bold">Q'</text>
        
        {/* Feedback line from Q to AND1 */}
        <line x1="700" y1="130" x2="280" y2="130" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 3" />
        <text x="490" y="125" fill="#10b981" fontSize="9" textAnchor="middle">Feedback</text>
        
        {/* Feedback line from Q' to AND2 */}
        <line x1="700" y1="190" x2="280" y2="190" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 3" />
        <text x="490" y="205" fill="#10b981" fontSize="9" textAnchor="middle">Feedback</text>
        
        {/* AND1 for J and Q' (top) */}
        <rect x="280" y="110" width="90" height="50" rx="4" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
        <text x="325" y="135" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">AND</text>
        <text x="325" y="150" fill="#9ca3af" fontSize="8" textAnchor="middle">J · Q' · CLK</text>
        
        {/* AND2 for K and Q (bottom) */}
        <rect x="280" y="175" width="90" height="50" rx="4" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
        <text x="325" y="200" fill="#3b82f6" fontSize="10" textAnchor="middle" fontWeight="bold">AND</text>
        <text x="325" y="215" fill="#9ca3af" fontSize="8" textAnchor="middle">K · Q · CLK</text>
        
        {/* J and K inputs to ANDs */}
        <line x1="130" y1="130" x2="280" y2="130" stroke="#ef4444" strokeWidth="2" />
        <line x1="130" y1="190" x2="280" y2="190" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Clock to both ANDs */}
        <line x1="130" y1="260" x2="250" y2="260" stroke="#f59e0b" strokeWidth="2" />
        <line x1="250" y1="260" x2="250" y2="135" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="250" y1="260" x2="250" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="250" y1="135" x2="280" y2="135" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="250" y1="200" x2="280" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* SR Latch (NOR-based) */}
        <rect x="440" y="110" width="200" height="140" rx="8" fill="#374151" stroke="#8b5cf6" strokeWidth="2" />
        <text x="540" y="135" fill="#8b5cf6" fontSize="12" textAnchor="middle" fontWeight="bold">SR Latch (NOR)</text>
        
        {/* NOR1 (Set side) */}
        <rect x="470" y="150" width="70" height="40" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="505" y="175" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">NOR</text>
        
        {/* NOR2 (Reset side) */}
        <rect x="470" y="195" width="70" height="40" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="505" y="220" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">NOR</text>
        
        {/* Cross-coupling */}
        <line x1="540" y1="170" x2="580" y2="215" stroke="#10b981" strokeWidth="2" />
        <line x1="540" y1="215" x2="580" y2="170" stroke="#10b981" strokeWidth="2" />
        
        {/* Connections from ANDs to SR Latch */}
        <line x1="370" y1="135" x2="470" y2="170" stroke="#ef4444" strokeWidth="2" />
        <line x1="370" y1="200" x2="470" y2="215" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Outputs */}
        <text x="680" y="140" fill="#10b981" fontSize="16" fontWeight="bold">Q</text>
        <text x="680" y="210" fill="#10b981" fontSize="16" fontWeight="bold">Q'</text>
        <line x1="640" y1="170" x2="670" y2="140" stroke="#10b981" strokeWidth="2" />
        <line x1="640" y1="215" x2="670" y2="210" stroke="#10b981" strokeWidth="2" />
        <circle cx="675" cy="205" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
        
        {/* Toggle Mode Highlight */}
        {showRaceCondition && (
          <g>
            <rect x="380" y="280" width="320" height="70" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" />
            <text x="540" y="305" fill="#ef4444" fontSize="13" textAnchor="middle" fontWeight="bold">⚠️ RACE-AROUND CONDITION</text>
            <text x="540" y="325" fill="#ef4444" fontSize="11" textAnchor="middle">When J=K=1 and CLK=1 → Output toggles multiple times</text>
            <text x="540" y="342" fill="#ef4444" fontSize="10" textAnchor="middle">Solution: Master-Slave or Edge-Triggering</text>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
          </g>
        )}
        
        {/* Truth Table */}
        <rect x="620" y="300" width="200" height="90" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1" />
        <text x="720" y="320" fill="#9ca3af" fontSize="11" textAnchor="middle" fontWeight="bold">Truth Table (CLK=1)</text>
        <text x="650" y="340" fill="#ef4444" fontSize="10">J K | Q(t+1)</text>
        <text x="650" y="358" fill="#9ca3af" fontSize="10">0 0 | Q(t) [Hold]</text>
        <text x="650" y="374" fill="#9ca3af" fontSize="10">0 1 | 0 [Reset]</text>
        <text x="650" y="390" fill="#9ca3af" fontSize="10">1 0 | 1 [Set]</text>
        <text x="780" y="358" fill="#10b981" fontSize="10">1 1 | Q'(t) [Toggle]</text>
      </svg>
    </div>
  );
};

// --- JK Flip-Flop Symbol SVG ---
const JKFlipFlopSymbolSVG = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* JK Flip-Flop Symbol */}
        <rect x="150" y="40" width="120" height="120" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
        <text x="210" y="105" fill="#8b5cf6" fontSize="20" textAnchor="middle" fontWeight="bold">JK</text>
        <text x="210" y="125" fill="#6b7280" fontSize="10" textAnchor="middle">FF</text>
        
        {/* Input J */}
        <line x1="80" y1="60" x2="150" y2="60" stroke="#ef4444" strokeWidth="2" />
        <text x="50" y="65" fill="#ef4444" fontSize="14" fontWeight="bold">J</text>
        
        {/* Input K */}
        <line x1="80" y1="100" x2="150" y2="100" stroke="#3b82f6" strokeWidth="2" />
        <text x="50" y="105" fill="#3b82f6" fontSize="14" fontWeight="bold">K</text>
        
        {/* Clock input with triangle */}
        <line x1="150" y1="130" x2="120" y2="130" stroke="#f59e0b" strokeWidth="2" />
        <polygon points="120,118 120,142 135,130" fill="#f59e0b" />
        <text x="50" y="135" fill="#f59e0b" fontSize="14" fontWeight="bold">CLK</text>
        
        {/* Outputs */}
        <line x1="270" y1="60" x2="340" y2="60" stroke="#10b981" strokeWidth="2" />
        <text x="355" y="65" fill="#10b981" fontSize="14" fontWeight="bold">Q</text>
        
        <line x1="270" y1="100" x2="340" y2="100" stroke="#10b981" strokeWidth="2" />
        <circle cx="275" cy="100" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
        <text x="355" y="105" fill="#10b981" fontSize="14" fontWeight="bold">Q'</text>
        
        <text x="210" y="180" fill="#6b7280" fontSize="12" textAnchor="middle">Positive Edge-Triggered JK Flip-Flop</text>
      </svg>
    </div>
  );
};

// --- Timing Diagram SVG ---
const TimingDiagramSVG = ({ showRaceAround }) => {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md">
      <p className="text-sm font-semibold mb-2 text-center">
        {showRaceAround ? "JK Flip-Flop with Race-Around (J=K=1, CLK=1)" : "JK Flip-Flop Normal Operation (Edge-Triggered)"}
      </p>
      <svg viewBox="0 0 800 260" className="w-full h-auto">
        {/* Clock */}
        <text x="10" y="35" fill="#f59e0b" fontSize="11" fontWeight="bold">CLK</text>
        <polyline points="60,30 100,30 100,15 140,15 140,30 180,30 180,15 220,15 220,30 260,30 260,15 300,15 300,30 340,30 340,15 380,15 380,30 420,30 420,15 460,15 460,30 500,30 500,15 540,15 540,30 580,30 580,15 620,15 620,30 660,30 660,15 700,15 700,30 740,30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        
        {/* Rising edge markers */}
        <circle cx="100" cy="15" r="3" fill="#f59e0b" />
        <circle cx="180" cy="15" r="3" fill="#f59e0b" />
        <circle cx="260" cy="15" r="3" fill="#f59e0b" />
        <circle cx="340" cy="15" r="3" fill="#f59e0b" />
        <circle cx="420" cy="15" r="3" fill="#f59e0b" />
        <circle cx="500" cy="15" r="3" fill="#f59e0b" />
        <circle cx="580" cy="15" r="3" fill="#f59e0b" />
        <circle cx="660" cy="15" r="3" fill="#f59e0b" />
        
        {/* J Input */}
        <text x="10" y="75" fill="#ef4444" fontSize="11" fontWeight="bold">J</text>
        <polyline points="60,80 140,80 140,60 260,60 260,80 340,80 340,60 460,60 460,80 540,80 540,60 660,60 660,80 740,80" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        
        {/* K Input */}
        <text x="10" y="115" fill="#3b82f6" fontSize="11" fontWeight="bold">K</text>
        <polyline points="60,120 140,120 140,100 260,100 260,120 340,120 340,100 460,100 460,120 540,120 540,100 660,100 660,120 740,120" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
        
        {/* Q Output */}
        <text x="10" y="165" fill="#10b981" fontSize="11" fontWeight="bold">Q</text>
        
        {!showRaceAround ? (
          // Normal edge-triggered behavior
          <polyline points="60,170 100,170 100,150 140,150 140,170 180,170 180,150 220,150 220,170 260,170 260,150 300,150 300,170 340,170 340,150 380,150 380,170 420,170 420,150 460,150 460,170 500,170 500,150 540,150 540,170 580,170 580,150 620,150 620,170 660,170 660,150 700,150 700,170 740,170" fill="none" stroke="#10b981" strokeWidth="2.5" />
        ) : (
          // Race-around: multiple toggles during CLK=1
          <>
            <polyline points="60,170 100,170 100,150 140,150 140,170 160,170 160,150 180,150 180,170 200,170 200,150 220,150 220,170 240,170 240,150 260,150 260,170 300,170 300,150 340,150 340,170 380,170 380,150 420,150 420,170 460,170 460,150 500,150 500,170 540,170 540,150 580,150 580,170 620,170 620,150 660,150 660,170 700,170 740,170" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <rect x="140" y="135" width="120" height="50" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="200" y="205" fill="#ef4444" fontSize="9" textAnchor="middle">Multiple toggles!</text>
          </>
        )}
        
        {/* Labels for J/K values */}
        <text x="100" y="55" fill="#ef4444" fontSize="9">0</text>
        <text x="200" y="55" fill="#ef4444" fontSize="9">1</text>
        <text x="300" y="55" fill="#ef4444" fontSize="9">0</text>
        <text x="400" y="55" fill="#ef4444" fontSize="9">1</text>
        
        <text x="100" y="95" fill="#3b82f6" fontSize="9">0</text>
        <text x="200" y="95" fill="#3b82f6" fontSize="9">1</text>
        <text x="300" y="95" fill="#3b82f6" fontSize="9">1</text>
        <text x="400" y="95" fill="#3b82f6" fontSize="9">0</text>
        
        {!showRaceAround && (
          <text x="400" y="235" fill="#6b7280" fontSize="10" textAnchor="middle">Q toggles only at clock edges when J=K=1</text>
        )}
        {showRaceAround && (
          <text x="400" y="235" fill="#ef4444" fontSize="10" textAnchor="middle">⚠️ During CLK=1, Q oscillates multiple times (Race-Around)</text>
        )}
      </svg>
    </div>
  );
};

// --- Characteristic Table SVG ---
const CharacteristicTableSVG = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl">
      <p className="text-lg font-semibold mb-3">Characteristic Table</p>
      <table className="w-full max-w-md mx-auto text-center border-collapse">
        <thead>
          <tr><th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">J</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">K</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">Q(t+1)</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td><td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-emerald-600 font-bold">Q(t)</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Hold</td>
          </tr>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td><td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-blue-600 font-bold">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Reset</td>
          </tr>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td><td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 font-bold">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Set</td>
          </tr>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-purple-50 dark:bg-purple-900/20">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td><td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-purple-600 font-bold">Q'(t)</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Toggle ✨</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
        Characteristic Equation: <strong className="text-purple-600">Q(t+1) = J·Q'(t) + K'·Q(t)</strong>
      </p>
    </div>
  );
};

const Topic9 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showRaceHighlight, setShowRaceHighlight] = useState(false);
  const [showRaceAroundTiming, setShowRaceAroundTiming] = useState(false);
  
  const questions = [
    { q: "What is a JK flip-flop? How does it improve upon the SR flip-flop?", a: "JK flip-flop has two inputs J and K. It eliminates the invalid state of SR flip-flop by defining J=K=1 as toggle mode (Q becomes Q')." },
    { q: "What happens when J=1 and K=1 in a JK flip-flop?", a: "The output toggles — Q becomes the complement of its previous value (Q' ) on each clock edge." },
    { q: "What is the characteristic equation of a JK flip-flop?", a: "Q(t+1) = J·Q'(t) + K'·Q(t). This gives next state in terms of J, K, and current Q." },
    { q: "Explain the race-around condition in JK flip-flops.", a: "When J=K=1 and the clock pulse is wide (level-sensitive), the output toggles multiple times during the same clock pulse, leading to unpredictable behavior." },
    { q: "How can the race-around condition be solved?", a: "Using edge-triggered JK flip-flops (samples only at edge) or master-slave JK flip-flops (two-stage operation)." },
    { q: "Draw the truth table of a JK flip-flop.", a: "J=0,K=0 → Hold; J=0,K=1 → Reset (0); J=1,K=0 → Set (1); J=1,K=1 → Toggle (Q' )." },
    { q: "What is the difference between JK and SR flip-flops?", a: "JK eliminates the invalid state by defining J=K=1 as toggle. SR's S=R=1 is invalid." },
    { q: "How is a JK flip-flop constructed from an SR flip-flop?", a: "Add feedback from Q to the K AND gate and Q' to the J AND gate. J becomes S = J·Q'·CLK, K becomes R = K·Q·CLK." },
    { q: "What is a T flip-flop? How is it derived from JK?", a: "T flip-flop (Toggle) is derived by connecting J=K=T. Then on each clock edge, output toggles." },
    { q: "Why is the JK flip-flop called a 'universal' flip-flop?", a: "Because it can be configured to work as SR (J=S, K=R, but avoid 11), D (J=D, K=D'), or T (J=K=1)." },
    { q: "What is the difference between level-sensitive and edge-triggered JK flip-flops?", a: "Level-sensitive JK responds while CLK=1 (prone to race-around). Edge-triggered samples only at clock edge (no race-around)." },
    { q: "Draw the timing diagram for JK flip-flop in toggle mode.", a: "At each active clock edge, Q changes to its opposite value. Between edges, Q holds steady." },
    { q: "What is the significance of the toggle operation in digital circuits?", a: "Toggle is used for frequency division (divide-by-2), binary counters, and ripple counters." },
    { q: "How many JK flip-flops are needed to build a 4-bit binary counter?", a: "4 JK flip-flops in toggle mode (J=K=1 for all), with appropriate connections for synchronous or asynchronous counting." },
    { q: "What happens if J=1, K=0 and the clock edge arrives?", a: "Output sets to 1 (Q becomes 1), regardless of previous state." },
    { q: "What is the excitation table for JK flip-flop?", a: "Q(t) → Q(t+1): 0→0 requires J=0,K=X; 0→1 requires J=1,K=X; 1→0 requires J=X,K=1; 1→1 requires J=X,K=0." },
    { q: "How does a master-slave JK flip-flop eliminate race-around?", a: "Master is enabled on CLK=1, slave on CLK=0. Slave samples master's output at falling edge, preventing multiple toggles." },
    { q: "What are the applications of JK flip-flops?", a: "Counters (binary, BCD, ring), frequency dividers, shift registers, and sequential state machines." },
    { q: "What is the difference between 74LS76 and 74LS112?", a: "74LS76 is dual JK flip-flop with preset/clear, negative edge-triggered. 74LS112 is similar but positive edge-triggered." },
    { q: "Why is the toggle condition J=K=1 useful in asynchronous counters?", a: "Each flip-flop toggles when its clock input receives a transition, creating a binary counting sequence." }
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
              Topic 9 • The Improved SR Flip-Flop
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              JK Flip-Flop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Eliminating the invalid state with toggle capability, but introducing the race-around challenge.
            </p>
          </div>
          
          {/* Circuit Diagram with Toggle for Race Highlight */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Internal Circuit: JK from SR with Feedback
              </h2>
              <button
                onClick={() => setShowRaceHighlight(!showRaceHighlight)}
                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", showRaceHighlight ? "bg-red-500 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/50")}
              >
                {showRaceHighlight ? "Hide Race-Around" : "Show Race-Around Zone"}
              </button>
            </div>
            <div className="p-6">
              <JKFlipFlopCircuitSVG showRaceCondition={showRaceHighlight} />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Feedback from Q and Q' to the AND gates enables toggle mode (J=K=1).
              </p>
            </div>
          </div>
          
          {/* Symbol and Characteristic Table */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 text-center">Standard Symbol</h2>
              <JKFlipFlopSymbolSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Triangle indicates edge-triggering (positive edge shown)
              </p>
            </div>
            <div className="transition-all duration-300 hover:scale-105">
              <CharacteristicTableSVG />
            </div>
          </div>
          
          {/* Timing Diagram Interactive */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Timing Diagram Analysis</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setShowRaceAroundTiming(false)}
                className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", !showRaceAroundTiming ? "bg-emerald-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50")}
              >
                Normal (Edge-Triggered)
              </button>
              <button
                onClick={() => setShowRaceAroundTiming(true)}
                className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", showRaceAroundTiming ? "bg-red-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/50")}
              >
                Race-Around (Level-Sensitive)
              </button>
            </div>
            <TimingDiagramSVG showRaceAround={showRaceAroundTiming} />
          </div>
          
          {/* Theory Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🔄 Toggle Mode (J=K=1)</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The most powerful feature of JK flip-flop is the <strong>toggle operation</strong>. When J=1 and K=1:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li>Q becomes Q' (complement) on each clock edge</li>
                <li>Frequency division (divide-by-2 counter)</li>
                <li>Building block for binary counters</li>
              </ul>
              <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                📌 <strong>Key Insight:</strong> Toggle mode is what makes JK flip-flops essential for counters.
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-red-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🏃 Race-Around Condition</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">When J=K=1 and the flip-flop is <strong>level-sensitive</strong> (not edge-triggered):</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li>Output toggles continuously during CLK=1</li>
                <li>Multiple toggles occur before CLK returns to 0</li>
                <li>Final state becomes unpredictable</li>
              </ul>
              <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Analogy:</strong> Like <strong>Abhronila in Kolkata</strong> pressing a light switch rapidly while the power is on — the light may end up on or off unpredictably!</p>
            </div>
          </div>
          
          {/* Race-Around Deep Dive */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Race-Around Condition Explained
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-red-600 dark:text-red-400">What causes it?</div>
                <p className="text-sm mt-1">With J=K=1 and CLK=1, the AND gates output J·Q'·CLK = Q' and K·Q·CLK = Q. These feed the SR latch, causing Q to toggle. But after toggling, the inputs change again, causing another toggle — repeating rapidly.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-red-600 dark:text-red-400">Solutions</div>
                <p className="text-sm mt-1">1. Use <strong>edge-triggered</strong> JK flip-flops (sample only at edge)<br />
                2. Use <strong>master-slave</strong> configuration (two-stage operation)<br />
                3. Ensure clock pulse width &lt; propagation delay (difficult in practice)</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm"><strong>Real-world example:</strong> In <strong>Tuhina's frequency counter in Shyamnagar</strong>, if a level-sensitive JK flip-flop is used with J=K=1, the counter would give wrong readings due to multiple toggles. Edge-triggered or master-slave FFs are essential.</p>
          </div>
          
          {/* Tips & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>For toggle operation, <strong>always use edge-triggered JK</strong> to avoid race-around.</li>
                <li>Connect J and K together to create a T flip-flop (T=J=K).</li>
                <li>To make a D flip-flop from JK: J=D, K=D'.</li>
                <li>In counters, use J=K=1 for flip-flops that need to toggle.</li>
                <li>For synchronous counters, use JK with J and K derived from previous stages.</li>
                <li>Remember the excitation table for state transition design.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Using level-sensitive JK flip-flops in toggle mode (race-around!).</li>
                <li>Forgetting that JK flip-flop has <strong>two feedback paths</strong> (Q and Q').</li>
                <li>Assuming J=K=1 produces the same as SR's invalid state (it doesn't — it toggles).</li>
                <li>Not understanding the difference between level and edge triggering.</li>
                <li>Mixing JK with other flip-flop types without proper synchronization.</li>
              </ul>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="mb-16">
            <Teacher note="The JK flip-flop is clever — it turns the SR's 'forbidden' state into a useful 'toggle' state. That's engineering elegance! But with great power comes great responsibility: the race-around condition. For exams, remember the truth table and characteristic equation. For practical designs, always use edge-triggered or master-slave JK flip-flops. The toggle mode (J=K=1) is perfect for counters — that's why we love JK flip-flops in sequential circuit design." />
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
              <strong>Observe carefully:</strong> In the timing diagram, what's the difference between edge-triggered and level-sensitive behavior when J=K=1?<br />
              <strong>Try changing:</strong> If you connect J=1, K=0, what happens? What about J=0, K=1?<br />
              <strong>Consider:</strong> How would you build a 4-bit binary counter using JK flip-flops in toggle mode?
            </p>
          </div>
          
          {/* Mini Checklist */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">✅ Mini Checklist</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>J=K=1 → Toggle mode (Q' )</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>No invalid state (unlike SR)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Characteristic eq: Q(t+1) = J·Q' + K'·Q</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Race-around: J=K=1 with level-sensitive CLK</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Universal flip-flop (can make SR, D, T)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Used in counters, frequency dividers, FSM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic9;