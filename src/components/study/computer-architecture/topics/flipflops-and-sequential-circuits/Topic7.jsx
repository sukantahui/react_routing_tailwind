import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

// --- Animated SVG: Clocked SR Flip-Flop Internal Structure ---
const ClockedSRFlipFlopSVG = ({ showRaceCondition }) => {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-4xl">
        {/* Background */}
        <rect x="20" y="20" width="760" height="360" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Clocked SR Flip-Flop (Level-Sensitive)</text>
        
        {/* Inputs */}
        <text x="60" y="120" fill="#ef4444" fontSize="14" fontWeight="bold">S (Set)</text>
        <text x="60" y="200" fill="#3b82f6" fontSize="14" fontWeight="bold">R (Reset)</text>
        <text x="60" y="280" fill="#f59e0b" fontSize="14" fontWeight="bold">CLK (Clock)</text>
        
        {/* AND Gates */}
        {/* AND1 for S */}
        <rect x="140" y="100" width="80" height="50" rx="4" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
        <text x="180" y="130" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">AND</text>
        <text x="180" y="145" fill="#9ca3af" fontSize="10" textAnchor="middle">S · CLK</text>
        
        {/* AND2 for R */}
        <rect x="140" y="180" width="80" height="50" rx="4" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" />
        <text x="180" y="210" fill="#3b82f6" fontSize="12" textAnchor="middle" fontWeight="bold">AND</text>
        <text x="180" y="225" fill="#9ca3af" fontSize="10" textAnchor="middle">R · CLK</text>
        
        {/* Lines from inputs to AND gates */}
        <line x1="140" y1="120" x2="100" y2="120" stroke="#ef4444" strokeWidth="2" />
        <line x1="140" y1="200" x2="100" y2="200" stroke="#3b82f6" strokeWidth="2" />
        <line x1="140" y1="280" x2="100" y2="280" stroke="#f59e0b" strokeWidth="2" />
        
        {/* Clock line branching to both ANDs */}
        <line x1="120" y1="280" x2="120" y2="125" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="120" y1="125" x2="140" y2="125" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="120" y1="280" x2="120" y2="205" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="120" y1="205" x2="140" y2="205" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* SR Latch (NOR-based) */}
        <rect x="300" y="120" width="200" height="160" rx="8" fill="#374151" stroke="#8b5cf6" strokeWidth="2" />
        <text x="400" y="145" fill="#8b5cf6" fontSize="12" textAnchor="middle" fontWeight="bold">SR Latch (NOR)</text>
        
        {/* NOR1 (Top) */}
        <rect x="340" y="160" width="70" height="45" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="375" y="187" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">NOR</text>
        
        {/* NOR2 (Bottom) */}
        <rect x="340" y="220" width="70" height="45" rx="4" fill="#1f2937" stroke="#10b981" strokeWidth="2" />
        <text x="375" y="247" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">NOR</text>
        
        {/* Cross-coupling lines */}
        <line x1="410" y1="182" x2="460" y2="242" stroke="#10b981" strokeWidth="2" />
        <line x1="410" y1="242" x2="460" y2="182" stroke="#10b981" strokeWidth="2" />
        
        {/* Outputs */}
        <text x="580" y="150" fill="#10b981" fontSize="16" fontWeight="bold">Q</text>
        <text x="580" y="210" fill="#10b981" fontSize="16" fontWeight="bold">Q'</text>
        
        <line x1="500" y1="182" x2="560" y2="150" stroke="#10b981" strokeWidth="2" />
        <line x1="500" y1="242" x2="560" y2="210" stroke="#10b981" strokeWidth="2" />
        
        {/* Inverter bubble on Q' output */}
        <circle cx="565" cy="205" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
        
        {/* Connections from ANDs to SR Latch */}
        <line x1="220" y1="125" x2="340" y2="182" stroke="#ef4444" strokeWidth="2" />
        <line x1="220" y1="205" x2="340" y2="242" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Race Condition Highlight */}
        {showRaceCondition && (
          <g>
            <rect x="280" y="300" width="240" height="60" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" />
            <text x="400" y="325" fill="#ef4444" fontSize="13" textAnchor="middle" fontWeight="bold">⚠️ RACE CONDITION ZONE</text>
            <text x="400" y="345" fill="#ef4444" fontSize="11" textAnchor="middle">When S=R=1 and CLK=1 → Both outputs try to become 0</text>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
          </g>
        )}
        
        {/* Truth Table */}
        <rect x="560" y="280" width="200" height="90" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1" />
        <text x="660" y="300" fill="#9ca3af" fontSize="11" textAnchor="middle" fontWeight="bold">Truth Table (CLK=1)</text>
        <text x="590" y="320" fill="#ef4444" fontSize="10">S R | Q(t+1)</text>
        <text x="590" y="338" fill="#9ca3af" fontSize="10">0 0 | Q(t) [Hold]</text>
        <text x="590" y="354" fill="#9ca3af" fontSize="10">0 1 | 0 [Reset]</text>
        <text x="590" y="370" fill="#9ca3af" fontSize="10">1 0 | 1 [Set]</text>
        <text x="720" y="338" fill="#ef4444" fontSize="10">1 1 | Invalid</text>
      </svg>
    </div>
  );
};

// --- Timing Diagram SVG ---
const TimingDiagramSVG = ({ scenario }) => {
  const scenarios = {
    normal: {
      title: "Normal Operation (S/R not simultaneously 1)",
      s: [0,1,1,0,0,0,1,0],
      r: [0,0,0,1,1,0,0,0],
      clk: [0,1,1,1,1,1,0,1],
      q: [0,1,1,1,0,0,0,1]
    },
    race: {
      title: "Race Condition (S=R=1 during CLK=1)",
      s: [0,1,1,1,1,0,0,0],
      r: [0,0,1,1,1,0,0,0],
      clk: [0,1,1,1,1,1,0,1],
      q: [0,1,1,0,0,0,0,0],
      note: "⚠️ Output becomes unpredictable when S=R=1"
    }
  };
  
  const data = scenarios[scenario];
  const colors = { s: '#ef4444', r: '#3b82f6', clk: '#f59e0b', q: '#10b981' };
  
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md">
      <p className="text-sm font-semibold mb-2 text-center">{data.title}</p>
      
      {
      data.note && <p className="text-xs text-red-500 mt-2">{data.note}</p>
      }
    </div>
  );
};

const Topic7 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showRaceHighlight, setShowRaceHighlight] = useState(false);
  const [timingScenario, setTimingScenario] = useState('normal');
  
  const questions = [
    { q: "What is a clocked SR flip-flop? How does it differ from a basic SR latch?", a: "A clocked SR flip-flop adds a clock input that enables the S and R inputs only when CLK=1 (level-sensitive). Basic SR latch responds immediately to S/R changes. Clocked version provides synchronization." },
    { q: "Draw the internal circuit of a clocked SR flip-flop using NAND gates.", a: "Two AND gates feed into a basic SR latch (either NOR or NAND based). The AND gates have S & CLK and R & CLK inputs. Outputs go to the latch inputs." },
    { q: "What is the invalid state in a clocked SR flip-flop?", a: "When CLK=1 and S=1, R=1 simultaneously, both Q and Q' try to become 0 (for NOR latch) or 1 (for NAND latch), violating the complementary output condition." },
    { q: "Explain the race condition in clocked SR flip-flops.", a: "When S=R=1 and CLK=1, both outputs attempt to go to 0. Due to propagation delays, one may win, making the final state unpredictable. This is the race condition." },
    { q: "How does the clock signal control the SR flip-flop?", a: "The clock acts as an enable. When CLK=0, the AND gates output 0 regardless of S/R, so the latch holds state. When CLK=1, the AND gates pass S and R to the latch." },
    { q: "What is the characteristic equation of a clocked SR flip-flop?", a: "Q(t+1) = S + R'·Q(t), with constraint S·R = 0 (invalid if both 1). The clock is implicit in that equation applies only when CLK=1." },
    { q: "Why is S=R=1 considered invalid in SR flip-flops?", a: "Because it forces both outputs to the same logic level (both 0 for NOR, both 1 for NAND), which violates the definition of complementary outputs Q and Q'." },
    { q: "What happens if S=R=1 and then CLK returns to 0?", a: "When CLK goes to 0, the AND gates block S and R. The latch enters a metastable state, and the final output depends on which gate turned off first (race condition)." },
    { q: "How can the invalid state be avoided in SR flip-flops?", a: "By ensuring S and R are never 1 simultaneously. This is why D flip-flop (single input) and JK flip-flop (toggle mode) were invented." },
    { q: "Draw the truth table for a clocked SR flip-flop.", a: "CLK=0: Q(t+1)=Q(t) (hold). CLK=1: S=0,R=0 → Hold; S=0,R=1 → Reset (0); S=1,R=0 → Set (1); S=1,R=1 → Invalid." },
    { q: "What is the difference between level-sensitive and edge-triggered SR flip-flop?", a: "Level-sensitive SR (covered here) responds while CLK=1. Edge-triggered SR samples only at the clock edge, eliminating transparency but still has invalid state when S=R=1 at the edge." },
    { q: "Explain the role of propagation delay in the race condition.", a: "When S=R=1, both NOR gates try to output 0. But due to different gate delays, one output may become 0 slightly faster, forcing the other to 1. The winner is unpredictable." },
    { q: "How would you convert a clocked SR flip-flop to a D flip-flop?", a: "Add an inverter between S and R. Then S = D, R = D'. This eliminates the S=R=1 condition." },
    { q: "What are the applications of clocked SR flip-flops?", a: "Switch debouncing, simple state machines, control circuits where Set and Reset are mutually exclusive, and as building blocks for more complex flip-flops." },
    { q: "Why is the clocked SR flip-flop rarely used in modern IC design?", a: "Due to the invalid state and race condition. Modern designs use D flip-flops (single input) or JK flip-flops (toggle capability without invalid state)." },
    { q: "What happens if the clock pulse is too narrow in a clocked SR flip-flop?", a: "If the pulse is shorter than the setup time or propagation delay, the AND gates may not pass S/R reliably, causing metastability or incorrect latching." },
    { q: "Draw the timing diagram for a clocked SR flip-flop showing set, reset, and hold operations.", a: "CLK high periods: S=1,R=0 → Q rises; S=0,R=1 → Q falls; S=0,R=0 → Q holds; S=1,R=1 → invalid/race." },
    { q: "What is the difference between synchronous and asynchronous inputs in SR flip-flops?", a: "S and R are synchronous (enabled by clock). Asynchronous preset/clear (not shown) override the clock and set/reset immediately regardless of CLK." },
    { q: "How does a master-slave configuration solve the race condition?", a: "Master-slave uses two latches: master enabled on CLK=1, slave on CLK=0. The slave samples the master's output at the falling edge, preventing race during the high period." },
    { q: "In a clocked SR flip-flop, what is the significance of the 'hold' state?", a: "When S=R=0 (and CLK=1), the latch retains its previous state. This memory capability is the foundation of sequential circuits." }
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
            Topic 7 • Clocked Sequential Element
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Clocked SR Flip-Flop
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Internal structure, clock-controlled operation, race condition, and the infamous invalid state.
          </p>
        </div>
        
        {/* Circuit Diagram with Toggle for Race Highlight */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              Internal Circuit Architecture
            </h2>
            <button
              onClick={() => setShowRaceHighlight(!showRaceHighlight)}
              className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", showRaceHighlight ? "bg-red-500 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/50")}
            >
              {showRaceHighlight ? "Hide Race Condition" : "Show Race Condition Zone"}
            </button>
          </div>
          <div className="p-6">
            <ClockedSRFlipFlopSVG showRaceCondition={showRaceHighlight} />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Two AND gates enable S and R inputs only when CLK=1. The NOR-based SR latch provides memory.
            </p>
          </div>
        </div>
        
        {/* Timing Diagram Interactive */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Timing Diagram Analysis</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setTimingScenario('normal')}
              className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", timingScenario === 'normal' ? "bg-emerald-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50")}
            >Normal Operation</button>
            <button
              onClick={() => setTimingScenario('race')}
              className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", timingScenario === 'race' ? "bg-red-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/50")}
            >Race Condition (S=R=1)</button>
          </div>
          <TimingDiagramSVG scenario={timingScenario} />
        </div>
        
        {/* Theory Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🔧 How It Works</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">When <strong>CLK=0</strong>, both AND gates output 0 regardless of S and R. The SR latch holds its previous state (memory mode).</p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">When <strong>CLK=1</strong>, the AND gates pass S and R to the latch:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
              <li><span className="text-emerald-400">S=0, R=0</span> → Hold state (Q unchanged)</li>
              <li><span className="text-emerald-400">S=0, R=1</span> → Reset (Q=0)</li>
              <li><span className="text-emerald-400">S=1, R=0</span> → Set (Q=1)</li>
              <li><span className="text-red-400">S=1, R=1</span> → <strong>Invalid/Race</strong> (both outputs forced to 0)</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-red-500 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ The Invalid State Problem</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">When <strong>S=1 and R=1</strong> during CLK=1, both NOR gates output 0. This violates the complementary condition Q = NOT Q'.</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Real-world analogy:</strong> Imagine <strong>Debangshuk in Ichapur</strong> trying to push a door both open AND closed simultaneously. The door mechanism (latch) becomes unpredictable. When CLK returns to 0, the final state depends on which gate "wins" the race—hence <strong>race condition</strong>.</p>
            <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">📌 <strong>Consequence:</strong> Output becomes metastable or unpredictable. This is why SR flip-flops are rarely used alone in practical designs.</div>
          </div>
        </div>
        
        {/* Race Condition Deep Dive */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.9s_ease-out] motion-safe:animate-[fadeSlideUp_0.9s_ease-out]">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Race Condition Explained
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="font-bold text-red-600 dark:text-red-400">What causes it?</div>
              <p className="text-sm mt-1">When S=R=1, both NOR gates try to output 0. The cross-coupled feedback makes each gate's output depend on the other. Due to propagation delays, one gate may switch faster, creating a momentary 0-1 or 1-0 condition that races through the loop.</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="font-bold text-red-600 dark:text-red-400">Why is it unpredictable?</div>
              <p className="text-sm mt-1">The winner depends on tiny variations in temperature, voltage, and manufacturing. The same chip may behave differently each time. This makes the circuit non-deterministic—unacceptable in digital systems.</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm"><strong>Real-world example:</strong> In <strong>Ritaja's traffic light controller in Barrackpore</strong>, if S and R were accidentally both 1, the light might show both red and green simultaneously—dangerous! This is why real controllers use D or JK flip-flops.</p>
        </div>
        
        {/* Tips & Pitfalls */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always ensure S and R are mutually exclusive in your logic (use one-hot encoding).</li>
              <li>Add a <strong>priority encoder</strong> if both inputs could theoretically be 1.</li>
              <li>For synthesis, describe SR behavior with <strong>if-else</strong> ensuring S and R are never both true.</li>
              <li>Use <strong>asynchronous preset/clear</strong> for initialization, not S/R during clock.</li>
              <li>In simulations, check for S=R=1 condition—it's a common bug.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Assuming S=R=1 produces a toggling output (it does not—it's invalid).</li>
              <li>Forgetting that the clocked SR FF is <strong>level-sensitive</strong> (not edge-triggered).</li>
              <li>Using SR when D or JK would be simpler and safer.</li>
              <li>Not considering race condition in timing analysis.</li>
              <li>Drawing timing diagrams with S=R=1 and assuming deterministic output.</li>
            </ul>
          </div>
        </div>
        
        {/* Teacher's Note */}
        <div className="mb-16 animate-[fadeSlideUp_1.1s_ease-out] motion-safe:animate-[fadeSlideUp_1.1s_ease-out]">
          <Teacher note="The clocked SR flip-flop is a teaching essential but a practical liability. Its invalid state is the reason JK and D flip-flops were created. When I see students designing with SR, I always ask: 'What happens if both inputs are 1?' If they can't guarantee mutual exclusion, the design will fail. For exams, master the truth table and understand WHY S=R=1 is forbidden—it's not arbitrary, it's because of the NOR latch's behavior. The race condition is a preview of why synchronous design is so careful about timing." />
        </div>
        
        {/* Q&A Section */}
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
          <p className="text-gray-700 dark:text-gray-300"><strong>Observe carefully:</strong> In the timing diagram, what happens to Q when S and R are both 1 during CLK=1? Why doesn't it go to a stable 0 or 1?<br />
          <strong>Try changing:</strong> If you replaced the NOR latch with a NAND latch, how would the truth table change? (Answer: S and R become active-low, invalid state becomes S=R=0)<br />
          <strong>Consider:</strong> Could you add external logic to prevent S=R=1 from ever reaching the AND gates? How?</p>
        </div>
      </div>
    </div>
  );
};

export default Topic7;