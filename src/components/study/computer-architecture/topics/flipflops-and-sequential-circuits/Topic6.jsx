import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

// --- Animated SVG: Level vs Edge Triggering Comparison ---
const TriggeringComparisonSVG = ({ activeMode, onHover }) => {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-4xl">
        {/* Clock Signal Background */}
        <rect x="20" y="20" width="760" height="240" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="12" fill="#6b7280" fontSize="12" textAnchor="middle" className="dark:fill-gray-400">Clock Signal (CLK)</text>
        
        {/* Clock Waveform */}
        <polyline
          points="20,60 80,60 80,30 160,30 160,60 220,60 220,30 300,30 300,60 360,60 360,30 440,30 440,60 500,60 500,30 580,30 580,60 640,60 640,30 720,30 720,60 780,60"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Level-Sensitive Section (High period) */}
        <rect x="80" y="70" width="80" height="40" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" rx="4" />
        <text x="120" y="95" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Transparent</text>
        <text x="120" y="130" fill="#10b981" fontSize="10" textAnchor="middle">Output follows D</text>
        
        <rect x="220" y="70" width="80" height="40" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" rx="4" />
        <text x="260" y="95" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Transparent</text>
        
        <rect x="360" y="70" width="80" height="40" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" rx="4" />
        <text x="400" y="95" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Transparent</text>
        
        <rect x="500" y="70" width="80" height="40" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" rx="4" />
        <text x="540" y="95" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Transparent</text>
        
        <rect x="640" y="70" width="80" height="40" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" rx="4" />
        <text x="680" y="95" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Transparent</text>
        
        {/* Level-Sensitive Label */}
        <text x="40" y="100" fill="#10b981" fontSize="13" fontWeight="bold">Level:</text>
        
        {/* Edge-Triggered Section */}
        {/* Positive Edge Arrows */}
        <g>
          <line x1="80" y1="30" x2="80" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="76,180 80,190 84,180" fill="#ef4444" />
          <text x="70" y="200" fill="#ef4444" fontSize="10" textAnchor="end">↑ Rising</text>
        </g>
        <g>
          <line x1="220" y1="30" x2="220" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="216,180 220,190 224,180" fill="#ef4444" />
        </g>
        <g>
          <line x1="360" y1="30" x2="360" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="356,180 360,190 364,180" fill="#ef4444" />
        </g>
        <g>
          <line x1="500" y1="30" x2="500" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="496,180 500,190 504,180" fill="#ef4444" />
        </g>
        <g>
          <line x1="640" y1="30" x2="640" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="636,180 640,190 644,180" fill="#ef4444" />
        </g>
        
        {/* Negative Edge Arrows */}
        <g>
          <line x1="160" y1="30" x2="160" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="156,210 160,200 164,210" fill="#f59e0b" />
          <text x="170" y="220" fill="#f59e0b" fontSize="10">↓ Falling</text>
        </g>
        <g>
          <line x1="300" y1="30" x2="300" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="296,210 300,200 304,210" fill="#f59e0b" />
        </g>
        <g>
          <line x1="440" y1="30" x2="440" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="436,210 440,200 444,210" fill="#f59e0b" />
        </g>
        <g>
          <line x1="580" y1="30" x2="580" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="576,210 580,200 584,210" fill="#f59e0b" />
        </g>
        <g>
          <line x1="720" y1="30" x2="720" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="716,210 720,200 724,210" fill="#f59e0b" />
        </g>
        
        {/* Edge-Triggered Label */}
        <text x="40" y="195" fill="#ef4444" fontSize="13" fontWeight="bold">Edge:</text>
        
        {/* Legend */}
        <rect x="300" y="240" width="12" height="12" fill="#10b981" fillOpacity="0.5" stroke="#10b981" strokeWidth="1" />
        <text x="318" y="251" fill="#6b7280" fontSize="11" className="dark:fill-gray-400">Level-Sensitive (Transparent)</text>
        <rect x="500" y="240" width="12" height="12" fill="#ef4444" />
        <text x="518" y="251" fill="#6b7280" fontSize="11" className="dark:fill-gray-400">Positive Edge-Triggered</text>
        <rect x="660" y="240" width="12" height="12" fill="#f59e0b" />
        <text x="678" y="251" fill="#6b7280" fontSize="11" className="dark:fill-gray-400">Negative Edge-Triggered</text>
      </svg>
    </div>
  );
};

// --- Data Waveform Comparison SVG ---
const DataWaveformSVG = ({ triggerType }) => {
  const colors = {
    level: { clk: '#10b981', data: '#6366f1', output: '#f59e0b' },
    posedge: { clk: '#3b82f6', data: '#6366f1', output: '#ef4444' },
    negedge: { clk: '#8b5cf6', data: '#6366f1', output: '#ec489a' }
  }[triggerType];
  
  const title = {
    level: 'Level-Sensitive (Transparent Latch)',
    posedge: 'Positive Edge-Triggered (D Flip-Flop)',
    negedge: 'Negative Edge-Triggered (D Flip-Flop)'
  }[triggerType];
  
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md">
      <p className="text-sm font-semibold mb-2 text-center" style={{ color: colors.clk }}>{title}</p>
      <svg viewBox="0 0 600 200" className="w-full h-auto">
        {/* Clock */}
        <text x="10" y="35" fill="#6b7280" fontSize="10">CLK</text>
        <polyline points="60,30 100,30 100,15 140,15 140,30 180,30 180,15 220,15 220,30 260,30 260,15 300,15 300,30 340,30 340,15 380,15 380,30 420,30 420,15 460,15 460,30 500,30 500,15 540,15 540,30 580,30" fill="none" stroke={colors.clk} strokeWidth="2.5" />
        
        {/* Data */}
        <text x="10" y="75" fill="#6b7280" fontSize="10">DATA</text>
        <polyline points="60,80 140,80 140,60 260,60 260,80 340,80 340,60 460,60 460,80 540,80 580,80" fill="none" stroke={colors.data} strokeWidth="2.5" />
        <text x="200" y="55" fill={colors.data} fontSize="9">0</text>
        <text x="300" y="55" fill={colors.data} fontSize="9">1</text>
        <text x="400" y="75" fill={colors.data} fontSize="9">0</text>
        
        {/* Output */}
        <text x="10" y="120" fill="#6b7280" fontSize="10">OUT</text>
        {triggerType === 'level' && (
          <polyline points="60,125 100,125 100,105 140,105 140,125 180,125 180,105 260,105 260,125 300,125 300,105 340,105 340,125 380,125 380,105 460,105 460,125 500,125 500,105 540,105 540,125 580,125" fill="none" stroke={colors.output} strokeWidth="2.5" />
        )}
        {triggerType === 'posedge' && (
          <>
            <polyline points="60,125 140,125 140,105 180,105 180,125 260,125 260,105 300,105 300,125 340,125 340,105 380,105 380,125 460,125 460,105 500,105 500,125 540,125 540,105 580,125" fill="none" stroke={colors.output} strokeWidth="2.5" />
            {/* Mark sampling points */}
            <circle cx="100" cy="15" r="3" fill={colors.clk} />
            <circle cx="180" cy="15" r="3" fill={colors.clk} />
            <circle cx="260" cy="15" r="3" fill={colors.clk} />
            <circle cx="340" cy="15" r="3" fill={colors.clk} />
            <circle cx="420" cy="15" r="3" fill={colors.clk} />
            <circle cx="500" cy="15" r="3" fill={colors.clk} />
          </>
        )}
        {triggerType === 'negedge' && (
          <>
            <polyline points="60,125 100,125 100,105 140,105 140,125 220,125 220,105 260,105 260,125 300,125 300,105 380,105 380,125 420,125 420,105 500,105 500,125 540,125 540,105 580,125" fill="none" stroke={colors.output} strokeWidth="2.5" />
            {/* Mark sampling points */}
            <circle cx="140" cy="30" r="3" fill={colors.clk} />
            <circle cx="220" cy="30" r="3" fill={colors.clk} />
            <circle cx="300" cy="30" r="3" fill={colors.clk} />
            <circle cx="380" cy="30" r="3" fill={colors.clk} />
            <circle cx="460" cy="30" r="3" fill={colors.clk} />
            <circle cx="540" cy="30" r="3" fill={colors.clk} />
          </>
        )}
      </svg>
    </div>
  );
};

const Topic6 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedComparison, setSelectedComparison] = useState('level');
  
  const questions = [
    { q: "What is the fundamental difference between level-sensitive and edge-triggered devices?", a: "Level-sensitive devices (latches) are transparent and respond to the input as long as the enable signal is active. Edge-triggered devices (flip-flops) sample the input only at the moment of a clock transition (rising or falling edge)." },
    { q: "Why is edge triggering preferred over level triggering in most synchronous systems?", a: "Edge triggering eliminates the transparency window, preventing race conditions and making timing analysis deterministic. It allows multiple flip-flops to be clocked simultaneously without data racing through." },
    { q: "Explain positive edge triggering with an example.", a: "A positive edge-triggered D flip-flop samples D on the rising edge of CLK. At all other times, output Q holds its previous value. Example: 74HC74 is a dual positive-edge D flip-flop." },
    { q: "What is negative edge triggering? When is it used?", a: "Negative edge triggering samples on the falling edge. Used in some counters and to avoid hold time violations when interfacing with slower logic. Example: 74HC112 is a negative-edge JK flip-flop." },
    { q: "Draw the timing diagram of a level-sensitive latch vs an edge-triggered flip-flop.", a: "Level-sensitive: Output follows input during CLK=HIGH, holds during LOW. Edge-triggered: Output changes only at clock edge, holding value between edges." },
    { q: "What is the 'transparency' problem in level-sensitive devices?", a: "If input changes while the latch is transparent, output changes immediately. This can cause data to race through multiple latches in one clock cycle if not properly controlled." },
    { q: "How does edge triggering solve the race condition?", a: "By sampling only at the edge, the input is captured at a precise instant. The output remains stable for the entire cycle, preventing data from propagating through multiple stages unintentionally." },
    { q: "Can a flip-flop be built from latches? Explain.", a: "Yes, a master-slave flip-flop uses two latches in series: master latch is transparent on CLK=HIGH, slave on CLK=LOW. This creates edge-triggered behavior." },
    { q: "What is the significance of the term 'clocked' in sequential circuits?", a: "Clocked means the circuit's state changes only at specific times determined by a clock signal, providing synchronization across the system." },
    { q: "Compare setup time and hold time for latches vs flip-flops.", a: "Both require setup and hold relative to the clock edge (for FF) or enable edge (for latch). However, latches can have more relaxed hold constraints due to transparency." },
    { q: "What are 'dual-edge triggered' flip-flops? Give an application.", a: "Dual-edge triggered FFs sample on both rising and falling edges, effectively doubling data rate without increasing clock frequency. Used in DDR memory (e.g., DDR SDRAM)." },
    { q: "Why do most FPGAs use edge-triggered flip-flops as their basic storage element?", a: "Edge-triggered FFs provide predictable timing, simplify synthesis, and avoid transparency issues, making them ideal for synchronous design methodology." },
    { q: "Explain how clock gating affects level vs edge sensitive circuits.", a: "For level-sensitive latches, clock gating can cause glitches if not done carefully. Edge-triggered FFs are more robust—gated clocks must still meet edge timing." },
    { q: "What is a 'transparent high' latch? 'Transparent low'?", a: "Transparent high: output follows input when CLK=1. Transparent low: output follows when CLK=0. Edge-triggered FFs are often built from two opposite-phase latches." },
    { q: "In a synchronous system, can you mix level and edge-triggered devices?", a: "Yes, but carefully. Level-sensitive latches can be used in time-borrowing designs or two-phase clock systems. Mixed designs require strict timing analysis to avoid races." },
    { q: "What is the advantage of negative edge triggering in ripple counters?", a: "In asynchronous (ripple) counters, using negative edge-triggered FFs allows each FF to toggle on the falling edge of the previous FF's output, simplifying the design." },
    { q: "How would you convert a positive-edge FF to negative-edge?", a: "Add an inverter on the clock input, or use a flip-flop with both clock polarity options (like 74HC74 has separate CLK pins)." },
    { q: "What is the difference between 'clock enable' and 'edge trigger'?", a: "Clock enable gates the clock or the FF's input. Edge trigger is the sampling mechanism itself. A FF can be edge-triggered and also have a clock enable." },
    { q: "Explain the concept of 'time borrowing' in level-sensitive circuits.", a: "In level-sensitive designs, combinational logic can 'borrow' time from the next phase if the current phase's logic is slow. Not possible with edge-triggered FFs." },
    { q: "Why is edge-triggering fundamental to pipelined processors?", a: "Pipeline stages are separated by edge-triggered registers. Each stage computes during the clock cycle, and results are captured at the next edge, enabling high throughput." }
  ];
  
  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-4">
            Topic 6 • Critical Distinction
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Level-Sensitive vs Edge-Triggered
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding when a circuit is transparent vs when it samples—the foundation of synchronous design.
          </p>
        </div>
        
        {/* Main Comparison Graphic */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Visual Comparison: When Does the Output Change?
            </h2>
          </div>
          <div className="p-6">
            <TriggeringComparisonSVG />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Level-sensitive: Output changes during entire HIGH period (transparent). Edge-triggered: Output changes only at clock transitions.
            </p>
          </div>
        </div>
        
        {/* Interactive Waveform Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Waveform Behavior Comparison</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedComparison('level')}
              className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", selectedComparison === 'level' ? "bg-emerald-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50")}
            >Level-Sensitive (Latch)</button>
            <button
              onClick={() => setSelectedComparison('posedge')}
              className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", selectedComparison === 'posedge' ? "bg-blue-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/50")}
            >Positive Edge-Triggered</button>
            <button
              onClick={() => setSelectedComparison('negedge')}
              className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", selectedComparison === 'negedge' ? "bg-purple-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/50")}
            >Negative Edge-Triggered</button>
          </div>
          <DataWaveformSVG triggerType={selectedComparison} />
        </div>
        
        {/* Theory Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🔓 Level-Sensitive (Latch)</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">The device is <strong>"transparent"</strong>—output follows input as long as the enable/clock signal is active. When inactive, output holds its last value.</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Analogy:</strong> Like a door that stays open while a switch is pressed. <strong>Tuhina in Shyamnagar</strong> can see the playground (input) as long as the teacher holds the door open. When door closes, she remembers the last view.</p>
            <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">📌 <strong>Use when:</strong> Time borrowing, two-phase clocks, high-speed memory arrays.</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-blue-500 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">⚡ Edge-Triggered (Flip-Flop)</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">Samples input <strong>only at the instant</strong> of a clock transition (rising or falling). Between edges, output is completely independent of input.</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Analogy:</strong> Like a camera shutter that captures a single moment. <strong>Abhronila in Kolkata</strong> takes a photo at the exact instant the timer beeps—the scene before/after doesn't affect the photo.</p>
            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">📌 <strong>Use when:</strong> Synchronous systems, pipelined processors, counters, registers (most digital designs).</div>
          </div>
        </div>
        
        {/* Why Edge Triggering is Important */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.9s_ease-out] motion-safe:animate-[fadeSlideUp_0.9s_ease-out]">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Why Edge Triggering Dominates Modern Design
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">1. Race Condition Elimination</div>
              <p className="text-sm mt-1">Data cannot race through multiple stages in one cycle because each stage only captures at the edge.</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">2. Deterministic Timing</div>
              <p className="text-sm mt-1">Setup/hold windows are well-defined relative to clock edges, enabling static timing analysis (STA).</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">3. Simplified Design</div>
              <p className="text-sm mt-1">Engineers can think in terms of "clock cycles" rather than managing transparency windows.</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm"><strong>Real-world:</strong> Your smartphone's processor (e.g., Snapdragon or Apple A-series) uses billions of edge-triggered flip-flops. If they were level-sensitive, a single glitch could corrupt the entire pipeline!</p>
        </div>
        
        {/* Tips & Pitfalls */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always specify edge type in schematics: ↑ for rising, ↓ for falling.</li>
              <li>For counters, negative edge-triggered FFs simplify ripple counter design.</li>
              <li>Use <strong>clock enable</strong> instead of gating the clock for edge-triggered FFs.</li>
              <li>In FPGAs, use dedicated clock pins for edge-triggered registers.</li>
              <li>When in doubt, default to positive edge-triggered—most standard.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Using a latch where an edge-triggered FF is intended (synthesis mismatch).</li>
              <li>Forgetting that level-sensitive devices are transparent—data can flow through.</li>
              <li>Mixing edge types without proper synchronization can cause metastability.</li>
              <li>Assuming all flip-flops are positive-edge triggered (check datasheets!).</li>
              <li>Drawing timing diagrams without marking the active edge.</li>
            </ul>
          </div>
        </div>
        
        {/* Teacher's Note */}
        <div className="mb-16 animate-[fadeSlideUp_1.1s_ease-out] motion-safe:animate-[fadeSlideUp_1.1s_ease-out]">
          <Teacher note="This is a make-or-break concept in digital design. Students often confuse 'level' with 'edge'. Remember: latches are like a door held open; flip-flops are like a camera shutter. In 99% of real systems (CPUs, phones, IoT devices), edge-triggered flip-flops are used. For exams, always check if the clock symbol has a triangle (edge) or just a line (level). Practice drawing both timing diagrams until it becomes second nature." />
        </div>
        
        {/* Q&A */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-16 transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.9s_ease-out] motion-safe:animate-[fadeSlideUp_0.9s_ease-out]">
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
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_1.1s_ease-out] motion-safe:animate-[fadeSlideUp_1.1s_ease-out]">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">🔍 Think & Observe</h3>
          <p className="text-gray-700 dark:text-gray-300"><strong>Observe carefully:</strong> In the waveform comparison, when does the output change for each type?<br />
          <strong>Try changing:</strong> If you had a positive-edge FF and a negative-edge FF connected in series, what would happen?<br />
          <strong>Consider:</strong> Why don't we use level-sensitive latches in most modern CPUs? What problem would arise if we did?</p>
        </div>
      </div>
    </div>
  );
};

export default Topic6;