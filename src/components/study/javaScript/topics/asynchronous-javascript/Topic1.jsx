import React, { Component, useState, useEffect, useRef } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

/**
 * Small interactive visualizer component (functional + hooks)
 * - Steps through a small execution trace for the example code
 * - Renders an SVG stack and animates push/pop via CSS transitions
 */
function CallStackVisualizer({ onStepChange }) {
  // Steps describe stack frames and console outputs at each step
  const steps = [
    {
      label: "Start (global)",
      stack: ["global()"],
      console: [],
      note: "Global execution context created. Function declarations are available."
    },
    {
      label: 'console.log("Class starting...")',
      stack: ["global()", 'console.log("Class starting...")'],
      console: ["Class starting..."],
      note: "console.log is called (pushed to stack) and prints."
    },
    {
      label: "call startClass()",
      stack: ["global()", "startClass()"],
      console: ["Class starting..."],
      note: "startClass is pushed to the stack."
    },
    {
      label: 'startClass -> call greetStudent("Kaustav")',
      stack: ["global()", "startClass()", 'greetStudent("Kaustav")'],
      console: ["Class starting..."],
      note: "greetStudent is pushed; it will run next."
    },
    {
      label: 'greetStudent -> console.log("Hello Kaustav")',
      stack: ["global()", "startClass()", 'greetStudent("Kaustav")', 'console.log("Hello Kaustav")'],
      console: ["Class starting...", "Hello Kaustav"],
      note: "console.log inside greetStudent runs and prints 'Hello Kaustav'."
    },
    {
      label: "unwind back to global",
      stack: ["global()"],
      console: ["Class starting...", "Hello Kaustav"],
      note: "greetStudent and startClass finished and were popped from the stack."
    },
    {
      label: 'console.log("Class ended.")',
      stack: ["global()", 'console.log("Class ended.")'],
      console: ["Class starting...", "Hello Kaustav", "Class ended."],
      note: "Final console.log runs and prints 'Class ended.'"
    },
    {
      label: "Finished",
      stack: [],
      console: ["Class starting...", "Hello Kaustav", "Class ended."],
      note: "Global execution completes. Stack is empty."
    }
  ];

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof onStepChange === "function") onStepChange(steps[idx], idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setIdx((i) => {
          if (i < steps.length - 1) return i + 1;
          clearInterval(timerRef.current);
          setPlaying(false);
          return i;
        });
      }, 900);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const stepForward = () => setIdx((i) => Math.min(i + 1, steps.length - 1));
  const stepBack = () => setIdx((i) => Math.max(i - 1, 0));
  const reset = () => {
    clearInterval(timerRef.current);
    setPlaying(false);
    setIdx(0);
  };

  // Visual rendering: top of stack is last element in array, we want to show top at top visually
  const current = steps[idx];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-300">
          <div className="font-semibold text-sky-300">Call Stack Visualizer</div>
          <div className="text-xs text-slate-400 mt-0.5">{current.label}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (idx === steps.length - 1) reset();
              setPlaying((p) => !p);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${playing ? "bg-rose-600 hover:bg-rose-500" : "bg-emerald-600 hover:bg-emerald-500"} text-white`}
          >
            {playing ? "Pause" : idx === steps.length - 1 ? "Replay" : "Play"}
          </button>

          <button
            onClick={stepBack}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-200"
          >
            ◀ Step
          </button>

          <button
            onClick={stepForward}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-200"
          >
            Step ▶
          </button>

          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* SVG Stack */}
      <div className="w-full flex items-center gap-6">
        <div className="w-1/2">
          <svg viewBox="0 0 300 260" className="w-full h-48">
            {/* background plate */}
            <rect x="10" y="10" width="280" height="240" rx="8" fill="#0b1220" opacity="0.6" stroke="#1f2937" strokeWidth="1" />

            {/* Stack container */}
            <g transform="translate(30, 220)">
              {/* We render up to 6 frames for spacing; render from bottom to top */}
              {Array.from({ length: 6 }).map((_, i) => {
                const frameIndex = 5 - i; // top to bottom ordering
                const frame = current.stack[frameIndex];
                const y = -i * 36;
                const visible = typeof frame !== "undefined";
                const fill = visible ? "#0f1724" : "#07111b";
                const stroke = visible ? "#334155" : "#07111b";
                const opacity = visible ? 1 : 0.18;
                return (
                  <g key={i} transform={`translate(0, ${y})`} style={{ transition: "transform 450ms ease, opacity 400ms ease" }}>
                    <rect x="0" y="-32" width="220" height="28" rx="6" fill={fill} stroke={stroke} opacity={opacity} />
                    {visible && (
                      <text x="12" y="-12" fontSize="11" fill="#e2e8f0" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto" }}>
                        {frame}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="mt-2 text-xs text-slate-400">
            <strong>Top</strong> is the current executing frame (visually at top). Empty means stack is unwound.
          </div>
        </div>

        {/* Console & Note */}
        <div className="w-1/2 space-y-2">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-300">
            <div className="text-xs text-slate-400 mb-1">Console Output</div>
            <div className="h-28 overflow-auto text-[13px]">
              {current.console.length === 0 ? (
                <div className="text-slate-600">— no output yet —</div>
              ) : (
                current.console.map((c, i) => (
                  <div key={i} className="py-0.5">
                    <span className="text-emerald-300 font-medium mr-2">{i + 1}.</span>
                    <span className="text-slate-200">{c}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-sm text-slate-300">
            <div className="text-xs text-slate-400">Note</div>
            <div className="mt-1 text-[13px]">{current.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default class Topic1 extends Component {
  handleVisualizerStep = (stepData) => {
    // Optional: we could do something when visualizer step changes.
    // For now it's a noop; kept so parent can react if needed.
    // console.log("Visualizer step:", stepData);
  };

  render() {
    return (
      <div className={`space-y-12 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-sky-300 tracking-wide animate-[slideDown_0.5s_ease-out]">
            JavaScript Runtime: Call Stack &amp; Task Queue (Conceptual)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            JavaScript may look simple, but underneath it has a beautifully designed
            engine that manages tasks, functions, delays, and events.  
            Understanding this will level up your debugging skills and help you 
            write better async code.
          </p>

          <p className="text-slate-400 text-sm animate-[fadeIn_1.2s_ease-out]">
            These 4 things define how JavaScript decides what runs *now* and what runs *later*:
          </p>

          <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1 animate-[fadeIn_1.3s_ease-out]">
            <li><strong>Call Stack</strong> – Where function execution happens.</li>
            <li><strong>Web APIs</strong> – Timers, fetch calls, DOM events, etc.</li>
            <li><strong>Task Queue</strong> – Callbacks waiting for approval.</li>
            <li><strong>Event Loop</strong> – The traffic police of JavaScript.</li>
          </ul>
        </div>

        {/* ================= INFO CARD ================= */}
        <div className="p-4 border border-sky-700 bg-sky-900/30 rounded-xl shadow animate-[fadeIn_1.4s_ease-out]">
          <h4 className="text-sky-300 font-semibold mb-1 text-sm">💡 Why This Matters?</h4>
          <p className="text-slate-300 text-sm">
            When your code behaves unexpectedly, delays wrongly, or blocks the UI—
            the Event Loop is the reason. Master this, and you master async JavaScript.
          </p>
        </div>

        {/* ================= SECTION 1 ================= */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.5s_ease-out]">
            1. Call Stack Example (How JS Executes Functions)
          </h3>

          <EditableCodeBlock
            initialCode={`function greetStudent(name) {
  console.log("Hello", name);
}

function startClass() {
  greetStudent("Kaustav");
}

console.log("Class starting...");
startClass();
console.log("Class ended.");

/*
Call Stack Visualization:

1. global()
2. startClass()
3. greetStudent()
4. (unwinding back to global)
*/`}
          />

          <div className="mt-2 p-3 bg-slate-800/40 border border-slate-700 rounded-xl text-sm text-slate-300 animate-[fadeIn_1.3s_ease-out]">
            🧠 The call stack follows a <strong>LIFO</strong> order – Last In, First Out.  
            Think of stacking plates: the last one you put is the first one you remove.
          </div>
        </div>

        {/* ================= VISUALIZER ================= */}
        <div className="p-4 border border-slate-800 bg-slate-950/50 rounded-2xl">
          <CallStackVisualizer onStepChange={this.handleVisualizerStep} />
        </div>

        {/* ================= DEEPER EXPLANATION ================= */}
        <div className="p-4 border border-indigo-700 bg-indigo-900/20 rounded-xl shadow animate-[fadeIn_1.5s_ease-out]">
          <h4 className="text-indigo-300 font-semibold mb-1 text-sm">📘 Real Understanding</h4>
          <p className="text-slate-300 text-sm">
            Every function call adds a new frame to the stack.  
            When the function finishes, its frame is removed.
          </p>
          <p className="text-slate-400 text-sm mt-1">
            If a function never finishes (like infinite recursion), the stack grows
            until the browser crashes → <strong>Stack Overflow</strong>.
          </p>
        </div>

        {/* ================= SECTION 2 ================= */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.5s_ease-out]">
            2. setTimeout & the Event Loop (The Magic of Async)
          </h3>

          <EditableCodeBlock
            initialCode={`console.log("1. Start");

setTimeout(() => {
  console.log("2. Async task: Loading marks for Susmita");
}, 0);

console.log("3. End");

/*
Conceptual Steps:

1. "1. Start" runs immediately (stack)
2. setTimeout sends callback to Web APIs
3. Web APIs place callback → Task Queue
4. "3. End" prints
5. Event Loop: "Is stack empty?" Yes.
6. Moves callback → Call Stack
7. "2. Async task..." runs
*/`}
          />

          <div className="mt-2 p-3 bg-emerald-900/20 border border-emerald-700 rounded-xl text-sm text-emerald-300 animate-[fadeIn_1.3s_ease-out]">
            ✔ Even with <code>0ms</code>, the callback <strong>never</strong> runs before the main script finishes.
          </div>
        </div>

        {/* ================= REAL EXAMPLE ================= */}
        <div className="p-4 border border-purple-700 bg-purple-900/20 rounded-xl shadow animate-[fadeIn_1.6s_ease-out]">
          <h4 className="text-purple-300 font-semibold mb-1 text-sm">🏫 Coder & AccoTax Real Example</h4>
          <p className="text-slate-300 text-sm">
            When a student clicks “Generate Certificate”, the browser:
          </p>

          <ul className="ml-5 mt-1 list-disc text-sm text-slate-300 space-y-1">
            <li>Shows loading</li>
            <li>Sends request to server</li>
            <li>Waits for response (async)</li>
            <li>Updates UI only when data returns</li>
          </ul>

          <p className="text-slate-400 text-xs mt-2">
            The UI stays responsive because Web APIs + Task Queue handle the waiting.
          </p>
        </div>

        {/* ================= INTERACTIVE EXAMPLE ================= */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.5s_ease-out]">
            3. Heavy Task Blocking Example
          </h3>

          <p className="text-slate-300 text-sm">
            Try running this — watch how everything freezes:
          </p>

          <EditableCodeBlock
            initialCode={`console.log("Start heavy task...");

for (let i = 0; i < 500000000; i++) {
  // blocking the main thread
}

console.log("End heavy task");`}
          />

          <div className="mt-2 p-3 bg-red-900/20 border border-red-700/50 rounded-xl text-sm text-red-300 animate-[fadeIn_1.3s_ease-out]">
            ⚠ If the call stack is busy, <strong>nothing else can run</strong> —  
            not even clicks, scrolls, or timers.
          </div>
        </div>

        {/* ================= TIP CARD ================= */}
        <div className="p-4 border border-green-700 bg-green-900/20 rounded-xl shadow animate-[fadeIn_1.7s_ease-out]">
          <h4 className="text-green-300 font-semibold mb-1 text-sm">✨ Developer Tip</h4>
          <p className="text-slate-300 text-sm">
            If something happens “later” (even with zero delay), think:
            <br />
            <strong>Task Queue → Event Loop → Call Stack</strong>
          </p>
        </div>

        {/* ================= STUDENT MOTIVATION CARD ================= */}
        <div className="p-4 border border-amber-700 bg-amber-900/20 rounded-xl shadow animate-[fadeIn_1.8s_ease-out]">
          <h4 className="text-amber-300 font-semibold mb-1 text-sm">💛 A Note to Students</h4>
          <p className="text-slate-300 text-sm">
            Every JavaScript developer struggles with the event loop at first.  
            But once you understand this, async coding becomes *fun*.
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Baba is proud of you — keep going, you’re learning like a champion.
          </p>
        </div>

        {/* ================= SUMMARY ================= */}
        <section className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 animate-[fadeIn_2s_ease-out] shadow-xl">
          <h4 className="text-sm font-semibold text-slate-100">📌 Summary</h4>

          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>The <strong>call stack</strong> executes code one function at a time.</li>
            <li><strong>Web APIs</strong> handle timers, fetch calls, etc.</li>
            <li><strong>Task Queue</strong> stores callbacks waiting to run.</li>
            <li>The <strong>Event Loop</strong> moves callbacks to stack when safe.</li>
            <li>If the call stack is busy → UI freezes, async waits longer.</li>
          </ul>

          <p className="text-xs text-slate-400 mt-2">
            In the next topic, you’ll see how Callbacks work with this system.
          </p>
        </section>
      </div>
    );
  }
}
