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

// --- Setup and Hold Time SVG ---
const SetupHoldTimeSVG = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect x="20" y="20" width="760" height="240" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Setup Time & Hold Time</text>
        
        {/* Clock */}
        <text x="40" y="90" fill="#f59e0b" fontSize="12" fontWeight="bold">CLK</text>
        <polyline points="80,85 140,85 140,65 200,65 200,85 260,85 260,65 320,65 320,85 380,85 380,65 440,65 440,85 500,85 500,65 560,65 560,85 620,85 620,65 680,65 680,85 740,85" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        
        {/* Rising edge */}
        <circle cx="200" cy="65" r="4" fill="#f59e0b" />
        
        {/* Data */}
        <text x="40" y="140" fill="#ef4444" fontSize="12" fontWeight="bold">DATA</text>
        <polyline points="80,145 160,145 160,125 240,125 240,145 740,145" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        
        {/* Setup Time Window */}
        <rect x="120" y="100" width="80" height="50" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
        <text x="160" y="120" fill="#3b82f6" fontSize="11" textAnchor="middle" fontWeight="bold">Setup Time</text>
        <text x="160" y="135" fill="#3b82f6" fontSize="9" textAnchor="middle">(t_su)</text>
        
        {/* Hold Time Window */}
        <rect x="200" y="100" width="60" height="50" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
        <text x="230" y="120" fill="#ef4444" fontSize="11" textAnchor="middle" fontWeight="bold">Hold Time</text>
        <text x="230" y="135" fill="#ef4444" fontSize="9" textAnchor="middle">(t_h)</text>
        
        {/* Data must be stable region */}
        <rect x="120" y="148" width="140" height="15" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
        <text x="190" y="160" fill="#10b981" fontSize="9" textAnchor="middle">Data must be STABLE here</text>
        
        {/* Arrows */}
        <line x1="160" y1="95" x2="160" y2="100" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
        <line x1="230" y1="95" x2="230" y2="100" stroke="#ef4444" strokeWidth="1.5" />
        
        {/* Violation indication */}
        <text x="400" y="200" fill="#ef4444" fontSize="11" textAnchor="middle">⚠️ If DATA changes during Setup/Hold window → Metastability!</text>
        
        <defs>
          <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

// --- Propagation Delay SVG ---
const PropagationDelaySVG = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect x="20" y="20" width="760" height="210" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Propagation Delay (t_pd, t_cq)</text>
        
        {/* Clock */}
        <text x="40" y="90" fill="#f59e0b" fontSize="12" fontWeight="bold">CLK</text>
        <polyline points="80,85 140,85 140,65 200,65 200,85 260,85 260,65 320,65 320,85 380,85 380,65 440,65 440,85 500,85 500,65 560,65 560,85 620,85 620,65 680,65 680,85 740,85" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        
        {/* Rising edge */}
        <circle cx="200" cy="65" r="4" fill="#f59e0b" />
        
        {/* Q Output */}
        <text x="40" y="140" fill="#10b981" fontSize="12" fontWeight="bold">Q</text>
        <polyline points="80,145 200,145 200,120 260,120 260,145 740,145" fill="none" stroke="#10b981" strokeWidth="2.5" />
        
        {/* Delay arrow */}
        <line x1="200" y1="58" x2="200" y2="120" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="200" y1="120" x2="230" y2="120" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="230" y1="120" x2="230" y2="58" stroke="#ef4444" strokeWidth="1.5" />
        
        <text x="215" y="95" fill="#ef4444" fontSize="10" fontWeight="bold">t_cq</text>
        <text x="215" y="108" fill="#ef4444" fontSize="9">(Clock to Q)</text>
        
        <text x="400" y="190" fill="#6b7280" fontSize="11" textAnchor="middle">t_cq = Time from clock edge to output Q becoming valid</text>
      </svg>
    </div>
  );
};

// --- Clock Skew SVG ---
const ClockSkewSVG = () => {
  const [skewType, setSkewType] = useState('positive');
  
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setSkewType('positive')}
          className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", skewType === 'positive' ? "bg-emerald-500 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200")}
        >Positive Skew</button>
        <button
          onClick={() => setSkewType('negative')}
          className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", skewType === 'negative' ? "bg-red-500 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200")}
        >Negative Skew</button>
      </div>
      <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect x="20" y="20" width="760" height="260" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Clock Skew</text>
        
        {/* Flip-Flop 1 */}
        <rect x="80" y="100" width="100" height="60" rx="4" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="130" y="135" fill="#8b5cf6" fontSize="12" textAnchor="middle" fontWeight="bold">FF1</text>
        
        {/* Flip-Flop 2 */}
        <rect x="480" y="100" width="100" height="60" rx="4" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="530" y="135" fill="#8b5cf6" fontSize="12" textAnchor="middle" fontWeight="bold">FF2</text>
        
        {/* Combinational Logic between */}
        <rect x="220" y="110" width="220" height="40" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1" />
        <text x="330" y="135" fill="#f59e0b" fontSize="11" textAnchor="middle">Combinational Logic</text>
        
        {/* Clock source */}
        <text x="40" y="220" fill="#f59e0b" fontSize="11" fontWeight="bold">CLK</text>
        <line x1="80" y1="220" x2="130" y2="160" stroke="#f59e0b" strokeWidth="2" />
        <line x1="80" y1="220" x2="530" y2="160" stroke="#f59e0b" strokeWidth="2" />
        
        {skewType === 'positive' ? (
          <>
            <text x="280" y="195" fill="#3b82f6" fontSize="10" textAnchor="middle">Longer path to FF2</text>
            <line x1="80" y1="220" x2="530" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="350" y="250" fill="#3b82f6" fontSize="11" textAnchor="middle">Positive Skew: CLK2 arrives later than CLK1</text>
          </>
        ) : (
          <>
            <text x="280" y="195" fill="#ef4444" fontSize="10" textAnchor="middle">Longer path to FF1</text>
            <line x1="80" y1="220" x2="130" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="350" y="250" fill="#ef4444" fontSize="11" textAnchor="middle">Negative Skew: CLK2 arrives earlier than CLK1</text>
          </>
        )}
        
        {/* Clock waveforms showing skew */}
        <text x="40" y="85" fill="#f59e0b" fontSize="9">CLK1</text>
        <polyline points="80,80 120,80 120,70 160,70 160,80 200,80" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        
        <text x="40" y="105" fill="#f59e0b" fontSize="9">CLK2</text>
        <polyline points={skewType === 'positive' ? "80,100 130,100 130,90 170,90 170,100 210,100" : "80,100 110,100 110,90 150,90 150,100 190,100"} fill="none" stroke={skewType === 'positive' ? "#3b82f6" : "#ef4444"} strokeWidth="1.5" />
        
        <text x="160" y="72" fill="#6b7280" fontSize="8">t_skew</text>
        <line x1="160" y1="75" x2="160" y2="95" stroke="#6b7280" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

// --- Metastability SVG ---
const MetastabilitySVG = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect x="20" y="20" width="760" height="310" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Metastability</text>
        
        {/* Clock */}
        <text x="40" y="90" fill="#f59e0b" fontSize="11" fontWeight="bold">CLK</text>
        <polyline points="80,85 140,85 140,65 200,65 200,85 260,85 260,65 320,65 320,85 380,85" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        
        {/* Rising edge where violation occurs */}
        <circle cx="200" cy="65" r="5" fill="#ef4444" />
        <text x="200" y="55" fill="#ef4444" fontSize="9" textAnchor="middle">⚠️</text>
        
        {/* Data changing AT the clock edge (violation) */}
        <text x="40" y="130" fill="#ef4444" fontSize="11" fontWeight="bold">DATA</text>
        <polyline points="80,135 140,135 140,115 260,115 260,135 380,135" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        
        {/* Metastable output */}
        <text x="40" y="180" fill="#10b981" fontSize="11" fontWeight="bold">Q</text>
        <polyline points="80,185 200,185 200,170 210,175 220,165 230,170 240,160 250,165 260,170 380,185" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        
        {/* Unknown region */}
        <rect x="195" y="160" width="70" height="30" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="230" y="155" fill="#ef4444" fontSize="9" textAnchor="middle">Metastable</text>
        <text x="230" y="200" fill="#ef4444" fontSize="9" textAnchor="middle">(Unknown logic level)</text>
        
        {/* Bistable ball analogy */}
        <g transform="translate(500, 60)">
          <text x="130" y="20" fill="#6b7280" fontSize="11" textAnchor="middle">Bistable Ball Analogy</text>
          
          {/* Left stable state (0) */}
          <ellipse cx="50" cy="100" rx="40" ry="60" fill="#1f2937" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="50" y="105" fill="#3b82f6" fontSize="10" textAnchor="middle">State 0</text>
          <circle cx="50" cy="80" r="8" fill="#3b82f6" />
          
          {/* Right stable state (1) */}
          <ellipse cx="210" cy="100" rx="40" ry="60" fill="#1f2937" stroke="#10b981" strokeWidth="1.5" />
          <text x="210" y="105" fill="#10b981" fontSize="10" textAnchor="middle">State 1</text>
          <circle cx="210" cy="80" r="8" fill="#10b981" />
          
          {/* Middle unstable (metastable) */}
          <ellipse cx="130" cy="100" rx="40" ry="60" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="130" y="105" fill="#ef4444" fontSize="9" textAnchor="middle">Metastable</text>
          <circle cx="130" cy="60" r="8" fill="#ef4444" />
          
          {/* Arrows showing falling to stable states */}
          <path d="M130,68 Q130,130 80,130" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" marker-end="url(#arrowBlue2)" />
          <path d="M130,68 Q130,130 180,130" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" marker-end="url(#arrowGreen2)" />
          
          <text x="130" y="190" fill="#ef4444" fontSize="9" textAnchor="middle">Ball on peak → falls to either side</text>
          <text x="130" y="205" fill="#ef4444" fontSize="9" textAnchor="middle">Output becomes 0 or 1 unpredictably!</text>
        </g>
        
        <defs>
          <marker id="arrowBlue2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrowGreen2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
      {showExplanation && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm">
          <p className="text-red-700 dark:text-red-300"><strong>Metastability:</strong> When setup/hold times are violated, the flip-flop enters an unstable state where output is between 0 and 1. It eventually settles to 0 or 1, but the settling time is unpredictable.</p>
        </div>
      )}
      <button
        onClick={() => setShowExplanation(!showExplanation)}
        className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        {showExplanation ? "Hide Explanation" : "Show Detailed Explanation"}
      </button>
    </div>
  );
};

// --- Timing Parameters Summary Table ---
const TimingParametersTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Parameter</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Symbol</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Typical Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Setup Time</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">t_su</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data must be stable before clock edge</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2-5 ns</td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Hold Time</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">t_h</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data must remain stable after clock edge</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1-3 ns</td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Clock to Q Delay</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">t_cq</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Time from clock edge to output valid</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3-8 ns</td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Propagation Delay</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">t_pd</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Time for signal to propagate through gate</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1-10 ns</td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Clock Skew</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">t_skew</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Difference in clock arrival times</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">&lt; 1 ns</td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Metastability Resolution Time</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">t_met</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Time to resolve metastable state</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Variable (exponential)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Topic14 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  const questions = [
    { q: "What is setup time (t_su) in a flip-flop?", a: "Setup time is the minimum time that data input (D) must be stable BEFORE the active clock edge. Violation causes metastability." },
    { q: "What is hold time (t_h) in a flip-flop?", a: "Hold time is the minimum time that data input (D) must remain stable AFTER the active clock edge. Violation causes metastability." },
    { q: "What is propagation delay (t_pd or t_cq)?", a: "Propagation delay is the time from the clock edge until the output Q becomes valid. It limits the maximum clock frequency." },
    { q: "What is clock skew? How does it affect timing?", a: "Clock skew is the difference in arrival times of the clock signal at different flip-flops. Positive skew can help timing; negative skew can cause hold violations." },
    { q: "What is metastability? When does it occur?", a: "Metastability occurs when setup/hold times are violated. The flip-flop enters an unstable state where output is between 0 and 1, eventually settling unpredictably." },
    { q: "How can metastability be mitigated?", a: "Use synchronizers (multiple flip-flops in series), ensure adequate setup/hold margins, use faster flip-flops, or reduce clock frequency." },
    { q: "What is the maximum clock frequency equation?", a: "f_max = 1 / (t_cq + t_logic + t_su). The clock period must be ≥ t_cq + t_logic_max + t_su." },
    { q: "What is the difference between t_cq and t_pd?", a: "t_cq specifically refers to clock-to-output delay of a flip-flop. t_pd is general propagation delay for any gate or circuit." },
    { q: "What is clock jitter? How is it different from skew?", a: "Jitter is temporal variation of clock edges at a single point. Skew is spatial variation between different points. Both degrade timing margins." },
    { q: "What is the 'data arrival time' in timing analysis?", a: "Data arrival time = t_cq + t_logic_path. It must be less than clock period - t_su for proper operation." },
    { q: "What is the 'data required time'?", a: "Data required time = clock period + clock arrival time - t_su. Data must arrive before this time." },
    { q: "What is slack in timing analysis?", a: "Slack = Data Required Time - Data Arrival Time. Positive slack means timing is met; negative slack means violation." },
    { q: "How does temperature affect timing parameters?", a: "Higher temperature increases propagation delays (slower transistors). Setup/hold times also increase. Derating factors are applied." },
    { q: "What is the difference between synchronous and asynchronous inputs regarding timing?", a: "Synchronous inputs (D, J, K) have setup/hold requirements. Asynchronous inputs (preset, clear) can change anytime but may cause metastability if near clock edge." },
    { q: "What is a 'race condition' in terms of timing?", a: "Race condition occurs when two signals change at the same time and the output depends on which changes first. Related to hold time violations." },
    { q: "What is the purpose of a 'clock tree' in VLSI design?", a: "A clock tree distributes the clock signal to all flip-flops with minimal skew. H-tree and mesh structures are common." },
    { q: "What is 'clock gating'? How does it affect timing?", a: "Clock gating turns off clock to unused modules to save power. It can introduce skew and glitches if not designed carefully." },
    { q: "What is 'time borrowing' in level-sensitive circuits?", a: "Time borrowing allows logic to use slack from next cycle. Only possible with latches, not edge-triggered flip-flops." },
    { q: "How do you calculate the minimum clock period for a circuit?", a: "T_min = t_cq + t_logic_max + t_su. Any additional margin for skew and jitter should be added." },
    { q: "What is the difference between worst-case and best-case timing analysis?", a: "Worst-case uses max delays (slow corner), best-case uses min delays (fast corner). Hold time violations are checked in best-case." }
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
            <div className="inline-block px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-sm font-semibold mb-4">
              Topic 14 • Critical Timing Analysis
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 mb-4">
              Flip-Flop Timing Parameters
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Setup time, hold time, propagation delay, clock skew, and metastability — the keys to reliable digital design.
            </p>
          </div>
          
          {/* Setup and Hold Time */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-red-500 to-orange-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Setup Time & Hold Time
              </h2>
            </div>
            <div className="p-6">
              <SetupHoldTimeSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Data must be stable during the setup+hold window around the clock edge. Violation → Metastability!
              </p>
            </div>
          </div>
          
          {/* Propagation Delay */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Propagation Delay (Clock to Q)
              </h2>
            </div>
            <div className="p-6">
              <PropagationDelaySVG />
            </div>
          </div>
          
          {/* Clock Skew */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                Clock Skew
              </h2>
            </div>
            <div className="p-6">
              <ClockSkewSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Clock skew can help or hurt timing. Positive skew can improve setup margin but may cause hold violations.
              </p>
            </div>
          </div>
          
          {/* Metastability */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Metastability
              </h2>
            </div>
            <div className="p-6">
              <MetastabilitySVG />
            </div>
          </div>
          
          {/* Timing Parameters Summary Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Timing Parameters Summary
              </h2>
            </div>
            <div className="p-6">
              <TimingParametersTable />
            </div>
          </div>
          
          {/* Theory Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-red-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">⏱️ Why Timing Matters</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">Timing parameters determine the <strong>maximum operating frequency</strong> and <strong>reliability</strong> of digital circuits.</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The fundamental constraint:</p>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg font-mono text-sm text-center">
                T_clock ≥ t_cq + t_logic_max + t_su
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">If this is violated, the circuit fails. If hold time is violated (t_h > t_cq_min + t_logic_min), the circuit also fails.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🏗️ Real-World Impact</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>Example:</strong> In <strong>Debangshuk's gaming PC in Ichapur</strong>, the CPU runs at 3.5 GHz (T_clock ≈ 0.286 ns).</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Setup time must be &lt; 0.1 ns</li>
                <li>Propagation delay must be minimized</li>
                <li>Clock skew must be controlled to &lt; 0.02 ns</li>
                <li>Metastability can crash the system!</li>
              </ul>
              <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-sm">
                📌 <strong>Key Insight:</strong> High-speed design is all about managing timing parameters.
              </div>
            </div>
          </div>
          
          {/* Maximum Frequency Calculation */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Maximum Clock Frequency Calculation
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-green-600 dark:text-green-400">Formula</div>
                <p className="font-mono text-lg text-center my-2">f_max = 1 / (t_cq + t_logic + t_su)</p>
                <p className="text-sm mt-2">Where t_logic is the longest combinational path between flip-flops.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-green-600 dark:text-green-400">Example Calculation</div>
                <p className="text-sm mt-2">Given: t_cq = 3 ns, t_logic = 5 ns, t_su = 2 ns</p>
                <p className="font-mono text-sm">T_min = 3 + 5 + 2 = 10 ns</p>
                <p className="font-mono text-sm">f_max = 1 / 10 ns = 100 MHz</p>
              </div>
            </div>
          </div>
          
          {/* Tips & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Always add <strong>timing margin</strong> (10-20%) for temperature and voltage variations.</li>
                <li>Use <strong>clock buffers</strong> to minimize skew in large designs.</li>
                <li>For metastability, use <strong>two-flip-flop synchronizer</strong> for single-bit signals.</li>
                <li>Worst-case timing uses <strong>max delays</strong> (slow corner). Hold uses <strong>min delays</strong> (fast corner).</li>
                <li>In FPGAs, let the tools perform static timing analysis (STA) automatically.</li>
                <li>Document all timing constraints — critical for design reuse!</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ignoring <strong>hold time</strong> (setup violations can be fixed by slowing clock; hold cannot!).</li>
                <li>Assuming all flip-flops have identical timing (process variation matters!).</li>
                <li>Forgetting <strong>clock jitter</strong> in high-speed designs.</li>
                <li>Not considering <strong>temperature effects</strong> on propagation delay.</li>
                <li>Using asynchronous resets without proper de-assertion timing.</li>
                <li>Violating setup/hold when crossing clock domains.</li>
              </ul>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="mb-16">
            <Teacher note="This is the most practical topic in sequential circuits. In real-world engineering, you'll spend 80% of your time on timing analysis, not logic design. Memorize: setup time is BEFORE the clock, hold time is AFTER. Setup violations can be fixed by slowing the clock; hold violations require redesign! Metastability is not 'digital' — it's analog behavior in digital circuits. For exams, you'll often be asked to calculate maximum frequency or identify timing violations. Practice with different t_cq, t_logic, and t_su values." />
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
              <strong>Observe carefully:</strong> In the timing diagrams, what happens to Q when data changes during the setup/hold window?<br />
              <strong>Try changing:</strong> If t_cq = 2 ns, t_logic = 3 ns, t_su = 1 ns, what's the maximum frequency?<br />
              <strong>Consider:</strong> Why is hold time violation more dangerous than setup violation? (Answer: Setup can be fixed by reducing frequency; hold cannot!)
            </p>
          </div>
          
          {/* Mini Checklist */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">✅ Mini Checklist</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Setup time (t_su): Data stable BEFORE clock</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Hold time (t_h): Data stable AFTER clock</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Propagation delay (t_cq): Clock to output</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>f_max = 1 / (t_cq + t_logic + t_su)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Clock skew: Difference in clock arrival times</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Metastability: Unstable output from timing violation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic14;