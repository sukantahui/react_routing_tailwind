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

// --- Animated SVG: T Flip-Flop from JK Flip-Flop ---
const TFlipFlopFromJKSVG = () => {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-3xl">
        {/* Background */}
        <rect x="20" y="20" width="660" height="310" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="350" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">T Flip-Flop Derived from JK Flip-Flop</text>
        
        {/* T Input */}
        <text x="60" y="150" fill="#ef4444" fontSize="18" fontWeight="bold">T</text>
        
        {/* Connection: T to both J and K */}
        <line x1="130" y1="150" x2="180" y2="150" stroke="#ef4444" strokeWidth="2" />
        <line x1="180" y1="150" x2="180" y2="120" stroke="#ef4444" strokeWidth="2" />
        <line x1="180" y1="150" x2="180" y2="180" stroke="#ef4444" strokeWidth="2" />
        
        {/* JK Flip-Flop Symbol */}
        <rect x="200" y="80" width="140" height="140" rx="8" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2.5" />
        <text x="270" y="155" fill="#8b5cf6" fontSize="24" textAnchor="middle" fontWeight="bold">JK</text>
        <text x="270" y="180" fill="#6b7280" fontSize="12" textAnchor="middle">FF</text>
        
        {/* J and K inputs on JK FF */}
        <text x="190" y="110" fill="#ef4444" fontSize="12" fontWeight="bold">J = T</text>
        <text x="190" y="195" fill="#3b82f6" fontSize="12" fontWeight="bold">K = T</text>
        
        {/* Clock input */}
        <line x1="200" y1="170" x2="170" y2="170" stroke="#f59e0b" strokeWidth="2" />
        <polygon points="170,158 170,182 185,170" fill="#f59e0b" />
        <text x="100" y="175" fill="#f59e0b" fontSize="14" fontWeight="bold">CLK</text>
        
        {/* Outputs */}
        <text x="380" y="120" fill="#10b981" fontSize="18" fontWeight="bold">Q</text>
        <text x="380" y="190" fill="#10b981" fontSize="18" fontWeight="bold">Q'</text>
        <line x1="340" y1="130" x2="370" y2="120" stroke="#10b981" strokeWidth="2.5" />
        <line x1="340" y1="180" x2="370" y2="190" stroke="#10b981" strokeWidth="2.5" />
        <circle cx="375" cy="185" r="5" fill="none" stroke="#10b981" strokeWidth="2" />
        
        {/* Toggle note */}
        <rect x="200" y="250" width="300" height="50" rx="6" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="350" y="272" fill="#8b5cf6" fontSize="13" textAnchor="middle" fontWeight="bold">✨ When T = 1, Q toggles on each clock edge</text>
        <text x="350" y="290" fill="#8b5cf6" fontSize="11" textAnchor="middle">When T = 0, Q holds its previous state</text>
      </svg>
    </div>
  );
};

// --- T Flip-Flop Symbol SVG ---
const TFlipFlopSymbolSVG = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* T Flip-Flop Symbol */}
        <rect x="150" y="40" width="120" height="120" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2" />
        <text x="210" y="105" fill="#8b5cf6" fontSize="24" textAnchor="middle" fontWeight="bold">T</text>
        <text x="210" y="125" fill="#6b7280" fontSize="10" textAnchor="middle">FF</text>
        
        {/* Input T */}
        <line x1="80" y1="80" x2="150" y2="80" stroke="#ef4444" strokeWidth="2" />
        <text x="50" y="85" fill="#ef4444" fontSize="14" fontWeight="bold">T</text>
        
        {/* Clock input with triangle */}
        <line x1="150" y1="120" x2="120" y2="120" stroke="#f59e0b" strokeWidth="2" />
        <polygon points="120,108 120,132 135,120" fill="#f59e0b" />
        <text x="50" y="125" fill="#f59e0b" fontSize="14" fontWeight="bold">CLK</text>
        
        {/* Outputs */}
        <line x1="270" y1="80" x2="340" y2="80" stroke="#10b981" strokeWidth="2" />
        <text x="355" y="85" fill="#10b981" fontSize="14" fontWeight="bold">Q</text>
        
        <line x1="270" y1="120" x2="340" y2="120" stroke="#10b981" strokeWidth="2" />
        <circle cx="275" cy="120" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
        <text x="355" y="125" fill="#10b981" fontSize="14" fontWeight="bold">Q'</text>
        
        <text x="210" y="180" fill="#6b7280" fontSize="12" textAnchor="middle">Toggle Flip-Flop (T FF)</text>
      </svg>
    </div>
  );
};

// --- Timing Diagram: Toggle Operation ---
const TimingDiagramSVG = () => {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md">
      <p className="text-sm font-semibold mb-2 text-center">T Flip-Flop Timing Diagram (Toggle Mode: T=1)</p>
      <svg viewBox="0 0 800 220" className="w-full h-auto">
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
        
        {/* T Input (T=1 constant) */}
        <text x="10" y="75" fill="#ef4444" fontSize="11" fontWeight="bold">T</text>
        <polyline points="60,80 740,80" fill="none" stroke="#ef4444" strokeWidth="2.5" />
        <text x="400" y="72" fill="#ef4444" fontSize="11" textAnchor="middle">T = 1 (Toggle Mode)</text>
        
        {/* Q Output - Toggles on each rising edge */}
        <text x="10" y="130" fill="#10b981" fontSize="11" fontWeight="bold">Q</text>
        <polyline points="60,135 100,135 100,115 140,115 140,135 180,135 180,115 220,115 220,135 260,135 260,115 300,115 300,135 340,135 340,115 380,115 380,135 420,135 420,115 460,115 460,135 500,135 500,115 540,115 540,135 580,135 580,115 620,115 620,135 660,135 660,115 700,115 700,135 740,135" fill="none" stroke="#10b981" strokeWidth="3" />
        
        {/* State labels */}
        <text x="80" y="108" fill="#10b981" fontSize="10" textAnchor="middle">0</text>
        <text x="160" y="108" fill="#10b981" fontSize="10" textAnchor="middle">1</text>
        <text x="240" y="108" fill="#10b981" fontSize="10" textAnchor="middle">0</text>
        <text x="320" y="108" fill="#10b981" fontSize="10" textAnchor="middle">1</text>
        <text x="400" y="108" fill="#10b981" fontSize="10" textAnchor="middle">0</text>
        <text x="480" y="108" fill="#10b981" fontSize="10" textAnchor="middle">1</text>
        <text x="560" y="108" fill="#10b981" fontSize="10" textAnchor="middle">0</text>
        <text x="640" y="108" fill="#10b981" fontSize="10" textAnchor="middle">1</text>
        
        {/* Frequency division note */}
        <text x="400" y="185" fill="#8b5cf6" fontSize="11" textAnchor="middle" fontWeight="bold">Output frequency = CLK frequency ÷ 2</text>
        <text x="400" y="200" fill="#6b7280" fontSize="10" textAnchor="middle">(Divide-by-2 counter)</text>
      </svg>
    </div>
  );
};

// --- Frequency Division Chain SVG ---
const FrequencyDivisionChainSVG = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <p className="text-sm font-semibold mb-3 text-center">Frequency Division Chain (Divide-by-2^n)</p>
      <svg viewBox="0 0 800 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* T Flip-Flop 1 */}
        <rect x="50" y="50" width="70" height="70" rx="4" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="85" y="90" fill="#8b5cf6" fontSize="14" textAnchor="middle" fontWeight="bold">T</text>
        
        {/* T Flip-Flop 2 */}
        <rect x="250" y="50" width="70" height="70" rx="4" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="285" y="90" fill="#8b5cf6" fontSize="14" textAnchor="middle" fontWeight="bold">T</text>
        
        {/* T Flip-Flop 3 */}
        <rect x="450" y="50" width="70" height="70" rx="4" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="485" y="90" fill="#8b5cf6" fontSize="14" textAnchor="middle" fontWeight="bold">T</text>
        
        {/* T Flip-Flop 4 (optional) */}
        <rect x="650" y="50" width="70" height="70" rx="4" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="685" y="90" fill="#8b5cf6" fontSize="14" textAnchor="middle" fontWeight="bold">T</text>
        
        {/* Connections */}
        <line x1="120" y1="85" x2="250" y2="85" stroke="#f59e0b" strokeWidth="2" />
        <line x1="320" y1="85" x2="450" y2="85" stroke="#f59e0b" strokeWidth="2" />
        <line x1="520" y1="85" x2="650" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
        
        {/* Clock input */}
        <line x1="20" y1="85" x2="50" y2="85" stroke="#f59e0b" strokeWidth="2" />
        <text x="10" y="80" fill="#f59e0b" fontSize="11" fontWeight="bold">f_in</text>
        
        {/* Outputs */}
        <text x="85" y="140" fill="#10b981" fontSize="10" textAnchor="middle">f_in/2</text>
        <text x="285" y="140" fill="#10b981" fontSize="10" textAnchor="middle">f_in/4</text>
        <text x="485" y="140" fill="#10b981" fontSize="10" textAnchor="middle">f_in/8</text>
        <text x="685" y="140" fill="#10b981" fontSize="10" textAnchor="middle">f_in/16</text>
        
        {/* Waveforms */}
        <line x1="85" y1="155" x2="120" y2="155" stroke="#10b981" strokeWidth="1" />
        <line x1="285" y1="155" x2="320" y2="155" stroke="#10b981" strokeWidth="1" />
        <line x1="485" y1="155" x2="520" y2="155" stroke="#10b981" strokeWidth="1" />
        
        {/* Title */}
        <text x="400" y="25" fill="#6b7280" fontSize="11" textAnchor="middle">Cascaded T Flip-Flops form Binary Counter / Frequency Divider</text>
      </svg>
    </div>
  );
};

// --- Characteristic Table SVG ---
const CharacteristicTableSVG = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl">
      <p className="text-lg font-semibold mb-3">Characteristic Table & Equation</p>
      <table className="w-full max-w-md mx-auto text-center border-collapse">
        <thead>
          <tr><th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">T</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">Q(t)</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">Q(t+1)</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-emerald-600 font-bold">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Hold</td>
          </tr>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-emerald-600 font-bold">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Hold</td>
          </tr>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-purple-600 font-bold">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Toggle</td>
          </tr>
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-purple-600 font-bold">0</td>
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Toggle</td>
          </tr>
        </tbody>
       </table>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
        Characteristic Equation: <strong className="text-purple-600">Q(t+1) = T ⊕ Q(t)</strong> (XOR)
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        Also written as: Q(t+1) = T·Q'(t) + T'·Q(t)
      </p>
    </div>
  );
};

const Topic11 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  const questions = [
    { q: "What is a T flip-flop? What does 'T' stand for?", a: "T flip-flop stands for 'Toggle' flip-flop. When T=1, the output toggles (Q becomes Q') on each clock edge. When T=0, it holds its state." },
    { q: "How is a T flip-flop derived from a JK flip-flop?", a: "Connect both J and K inputs together to form the T input. So J = T, K = T." },
    { q: "What is the characteristic equation of a T flip-flop?", a: "Q(t+1) = T ⊕ Q(t) (XOR). This means next state = T XOR current state." },
    { q: "Draw the truth table of a T flip-flop.", a: "T=0: Q(t+1)=Q(t) (Hold); T=1: Q(t+1)=Q'(t) (Toggle)." },
    { q: "What is frequency division? How does a T flip-flop achieve it?", a: "Frequency division means reducing input clock frequency by a factor. A T flip-flop with T=1 toggles on each clock edge, producing output at half the input frequency (divide-by-2)." },
    { q: "How can you create a divide-by-4 frequency divider?", a: "Cascade two T flip-flops (T=1 for both). First divides by 2, second divides by 2 again → total divide-by-4." },
    { q: "What is the difference between a T flip-flop and a JK flip-flop in toggle mode?", a: "JK with J=K=1 toggles, same as T=1. T flip-flop is essentially a JK with J=K=T, but T is simpler for counters." },
    { q: "How is a T flip-flop derived from a D flip-flop?", a: "Connect Q' (inverted output) to D input, then each clock edge toggles. But this requires T input control — add a multiplexer: D = T ⊕ Q." },
    { q: "Draw the timing diagram for a T flip-flop with T=1.", a: "Output Q toggles at every active clock edge. Frequency of Q = half of clock frequency." },
    { q: "What happens if T=0 in a T flip-flop?", a: "Output holds its previous state — no change on clock edge." },
    { q: "How many T flip-flops are needed to build an n-bit binary counter?", a: "n T flip-flops. Each FF toggles when all lower-order bits are 1 (synchronous counter) or cascaded (ripple counter)." },
    { q: "What is the excitation table for a T flip-flop?", a: "Q(t) → Q(t+1): 0→0 requires T=0; 0→1 requires T=1; 1→0 requires T=1; 1→1 requires T=0." },
    { q: "Why is the T flip-flop useful in counters?", a: "Toggle operation is perfect for counting — each flip-flop represents a binary bit, toggling at specific intervals." },
    { q: "What is the maximum frequency a T flip-flop can handle?", a: "Limited by setup time, hold time, and propagation delay. Maximum clock frequency = 1/(t_setup + t_propagation)." },
    { q: "How do you make a T flip-flop toggle on both clock edges?", a: "Use dual-edge triggering or connect output to input through XOR with T, but standard T FFs are single-edge triggered." },
    { q: "What is a 'ripple counter' using T flip-flops?", a: "Connect Q of one FF to CLK of next. Each FF toggles on falling edge of previous FF's output, creating asynchronous counting." },
    { q: "How do you implement a 'divide-by-3' frequency divider using T flip-flops?", a: "Use a 2-bit counter (2 T FFs) with feedback logic to reset at count 3. More complex than divide-by-2^n." },
    { q: "What is the difference between T flip-flop and toggle mode of JK?", a: "Functionally identical. T flip-flop is just a JK with J=K=T, often drawn as a separate symbol for simplicity." },
    { q: "In a 4-bit binary counter using T flip-flops, when does the third bit toggle?", a: "In synchronous counter: toggles when first two bits are both 1. In ripple counter: toggles when second bit falls." },
    { q: "What is the power consumption advantage of T flip-flops in counters?", a: "T flip-flops only toggle when needed (T=1), reducing dynamic power compared to always-toggling designs." }
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
              Topic 11 • The Toggle Specialist
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              T Flip-Flop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Simple toggle operation — the building block of counters and frequency dividers.
            </p>
          </div>
          
          {/* Circuit Diagram */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Construction: T Flip-Flop from JK
              </h2>
            </div>
            <div className="p-6">
              <TFlipFlopFromJKSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Simply connect J and K together to create T input. When T=1, JK acts as toggle mode.
              </p>
            </div>
          </div>
          
          {/* Symbol and Characteristic Table */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 text-center">Standard Symbol</h2>
              <TFlipFlopSymbolSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                T input controls toggle operation. Triangle indicates edge-triggering.
              </p>
            </div>
            <div className="transition-all duration-300 hover:scale-105">
              <CharacteristicTableSVG />
            </div>
          </div>
          
          {/* Timing Diagram */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Toggle Operation Timing</h2>
            <TimingDiagramSVG />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              With T=1, output toggles on every active clock edge — output frequency is half of input clock.
            </p>
          </div>
          
          {/* Frequency Division Chain */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequency Division Chain</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <FrequencyDivisionChainSVG />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Cascading T flip-flops creates divide-by-2, divide-by-4, divide-by-8, etc. — binary counter!
              </p>
            </div>
          </div>
          
          {/* Theory Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🔄 How Toggle Works</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The T flip-flop has a single input T that controls whether the output toggles:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li><span className="text-emerald-400">T = 0:</span> Hold mode — Q remains unchanged on clock edge</li>
                <li><span className="text-emerald-400">T = 1:</span> Toggle mode — Q becomes Q' (complement) on clock edge</li>
              </ul>
              <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                📌 <strong>Key Equation:</strong> Q(t+1) = T ⊕ Q(t) (XOR)
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">📊 Frequency Division</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">When T=1, each clock edge toggles the output. This means:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li><span className="text-purple-400">1 T FF:</span> Divide frequency by 2</li>
                <li><span className="text-purple-400">2 T FFs (cascade):</span> Divide frequency by 4</li>
                <li><span className="text-purple-400">n T FFs (cascade):</span> Divide frequency by 2^n</li>
              </ul>
              <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Analogy:</strong> Like <strong>Swadeep in Barrackpore</strong> flipping a light switch. Each time he flips (clock edge), the light changes state (toggles). If he flips at 2 Hz, the light toggles at 1 Hz — divide-by-2!</p>
            </div>
          </div>
          
          {/* Applications Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Real-World Applications
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-indigo-600 dark:text-indigo-400">⏰ Digital Clocks</div>
                <p className="text-sm mt-1">32.768 kHz crystal ÷ 2^15 = 1 Hz (one pulse per second) using cascaded T flip-flops.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-indigo-600 dark:text-indigo-400">🔢 Binary Counters</div>
                <p className="text-sm mt-1">Each T FF represents one bit. Counts from 0 to 2^n - 1.</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-indigo-600 dark:text-indigo-400">🎵 Frequency Synthesizers</div>
                <p className="text-sm mt-1">Generate different clock frequencies from a single master oscillator.</p>
              </div>
            </div>
          </div>
          
          {/* Tips & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>For divide-by-2^n, cascade T flip-flops with T=1 for all.</li>
                <li>In synchronous counters, use T flip-flops with T = AND of lower bits.</li>
                <li>Remember: T=0 means <strong>hold</strong>, T=1 means <strong>toggle</strong>.</li>
                <li>Characteristic equation Q(t+1) = T ⊕ Q(t) is XOR — easy to remember!</li>
                <li>Excitation table: To go from 0→0 or 1→1, T=0; To go from 0→1 or 1→0, T=1.</li>
                <li>For frequency measurement, count toggles of T FF over fixed time.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Forgetting that T flip-flop toggles <strong>only on clock edge</strong> (not continuously).</li>
                <li>Assuming T=1 toggles output immediately (it waits for clock edge).</li>
                <li>Confusing T flip-flop with transparent latch (different behavior).</li>
                <li>Not considering setup/hold time for T input changes.</li>
                <li>In ripple counters, forgetting that each FF adds propagation delay.</li>
              </ul>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="mb-16">
            <Teacher note="The T flip-flop is beautifully simple — toggle or hold. That's it! The XOR equation Q(t+1) = T ⊕ Q(t) is elegant and easy to derive. For exams, you'll often be asked to design counters using T flip-flops. Remember: In a binary counter, the nth bit toggles when all lower bits are 1 (synchronous) or from previous FF's output (asynchronous). The frequency division application is everywhere — your digital watch uses cascaded T flip-flops to divide 32,768 Hz down to 1 Hz!" />
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
              <strong>Observe carefully:</strong> In the timing diagram, what is the relationship between CLK frequency and Q frequency when T=1?<br />
              <strong>Try changing:</strong> If you cascade 3 T flip-flops (all T=1) and feed a 8 kHz clock, what are the output frequencies?<br />
              <strong>Consider:</strong> How would you create a divide-by-6 counter using T flip-flops? (Hint: You need feedback to reset at count 6)
            </p>
          </div>
          
          {/* Mini Checklist */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">✅ Mini Checklist</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>T=0 → Hold; T=1 → Toggle</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Characteristic eq: Q(t+1) = T ⊕ Q(t)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Divide-by-2 with T=1</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Cascade n T FFs → divide by 2^n</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Building block for binary counters</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Derived from JK (J=K=T) or D with XOR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic11;