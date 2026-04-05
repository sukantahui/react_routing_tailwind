import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

// --- Helper Component for Animated SVG Pulse ---
const AnimatedPulseSVG = ({ isActive, colorClass }) => (
  <div className="flex justify-center items-center p-4">
    <svg width="180" height="100" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      {/* Background Grid */}
      <line x1="20" y1="75" x2="380" y2="75" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="10" y="80" fill="#6b7280" fontSize="12" className="dark:fill-gray-400">0V</text>
      <text x="10" y="25" fill="#6b7280" fontSize="12" className="dark:fill-gray-400">V_H</text>
      
      {/* Pulse Waveform */}
      <polyline
        points="20,75 60,75 60,25 100,25 100,75 140,75 140,25 180,25 180,75 220,75 220,25 260,25 260,75 300,75 300,25 340,25 340,75 380,75"
        fill="none"
        stroke={colorClass}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx("transition-all duration-300", isActive && "drop-shadow-[0_0_6px_currentColor]")}
      >
        <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </polyline>
      
      {/* Animated Dot following the pulse */}
      <circle r="6" fill={colorClass} className="transition-all duration-300">
        <animateMotion dur="2s" repeatCount="indefinite" path="M20,75 L60,75 L60,25 L100,25 L100,75 L140,75 L140,25 L180,25 L180,75 L220,75 L220,25 L260,25 L260,75 L300,75 L300,25 L340,25 L340,75 L380,75" />
      </circle>
      
      {/* Labels */}
      <text x="180" y="115" fill="#374151" fontSize="14" fontWeight="bold" textAnchor="middle" className="dark:fill-gray-200">Pulse Train (Clock Signal)</text>
      <text x="60" y="15" fill="#6b7280" fontSize="11" className="dark:fill-gray-400">Pulse Width (t_w)</text>
      <line x1="60" y1="20" x2="100" y2="20" stroke="#6b7280" strokeWidth="1" />
      <text x="220" y="45" fill="#6b7280" fontSize="11" className="dark:fill-gray-400">Period (T)</text>
      <line x1="220" y1="50" x2="340" y2="50" stroke="#6b7280" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  </div>
);

const Topic5 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [pulseType, setPulseType] = useState('narrow'); // 'narrow', 'wide', 'glitch'

  const pulseColor = {
    narrow: '#10b981', // emerald
    wide: '#3b82f6',   // blue
    glitch: '#ef4444'  // red
  }[pulseType];

  const pulseDescription = {
    narrow: 'Narrow Pulse (Clean) — Reliable for edge detection.',
    wide: 'Wide Pulse (Level-sensitive) — May cause transparency issues.',
    glitch: 'Glitchy Pulse — Real-world noise, risk of false triggering.'
  }[pulseType];

  const questions = [
    {
      q: "Define pulse triggering in sequential circuits.",
      a: "Pulse triggering means the circuit responds to the duration (width) of the clock pulse, not just the transition. It is sensitive to the entire high or low period of the clock."
    },
    {
      q: "How does a pulse-triggered flip-flop differ from an edge-triggered one?",
      a: "A pulse-triggered FF is active during the entire clock pulse (level-sensitive), while edge-triggered reacts only at the rising or falling edge. Pulse triggering is more prone to race conditions."
    },
    {
      q: "What is a 'transparent' latch?",
      a: "A transparent latch allows data to pass through to the output as long as the enable signal (clock pulse) is active. It becomes 'opaque' when the enable is inactive."
    },
    {
      q: "Explain 'pulse width' and 'duty cycle'.",
      a: "Pulse width (t_w) is the duration the signal stays high. Duty cycle = (t_w / Period) * 100%. For a square wave, duty cycle is 50%."
    },
    {
      q: "Why are narrow pulses preferred in synchronous design?",
      a: "Narrow pulses reduce the time window where the circuit is transparent, minimizing the chance of race conditions and making timing analysis easier."
    },
    {
      q: "What is a glitch? How can it affect sequential circuits?",
      a: "A glitch is an unwanted, short-duration pulse due to propagation delays or logic hazards. It can erroneously trigger flip-flops, leading to metastability or wrong states."
    },
    {
      q: "Draw and explain a timing diagram for a positive pulse-triggered latch.",
      a: "Output follows input while clock is high (transparent). When clock goes low, output holds last value. The diagram shows data sampled during the entire high period."
    },
    {
      q: "What are the key timing parameters for pulse signals?",
      a: "Rise time (t_r), fall time (t_f), pulse width (t_w), period (T), frequency (f = 1/T), duty cycle."
    },
    {
      q: "Why is synchronization critical in multi-clock systems?",
      a: "Without synchronization, metastability can occur when a signal changes near a clock edge. Pulse-based synchronizers use flip-flops to avoid race conditions."
    },
    {
      q: "How does a pulse trigger relate to 'one-shot' circuits?",
      a: "A one-shot (monostable multivibrator) generates a single fixed-width pulse when triggered. It's used in debouncing switches or generating timing pulses."
    },
    {
      q: "Explain 'set-up time' and 'hold time' for pulse-triggered devices.",
      a: "Setup time is the data must be stable before the active pulse edge. Hold time is the data must remain stable after the pulse ends. Violations cause metastability."
    },
    {
      q: "What is the difference between a latch and a flip-flop in terms of pulse response?",
      a: "A latch is level-sensitive (transparent during pulse), while a flip-flop is edge-triggered (samples only at transition). Flip-flops are built from two latches (master-slave)."
    },
    {
      q: "In real-world designs, why do we often use edge-triggered FFs instead of pulse-triggered?",
      a: "Edge-triggered FFs are less sensitive to pulse width variations and noise, making them more reliable. Pulse-triggered latches are still used in high-speed memory arrays."
    },
    {
      q: "What is a 'clock skew' problem? How does pulse width affect it?",
      a: "Clock skew is when the clock arrives at different times at different FFs. Wide pulses can cause data to 'bleed through' if skew makes one FF see the pulse later."
    },
    {
      q: "How do you design a pulse generator using a 555 timer?",
      a: "The 555 in monostable mode outputs a single pulse when triggered. Pulse width = 1.1 * R * C. This is used for debouncing or timed delays."
    },
    {
      q: "Describe the role of Schmitt triggers in pulse shaping.",
      a: "Schmitt triggers clean up noisy or slow-edged pulses by providing hysteresis. They convert a ragged signal into a sharp, well-defined pulse for digital circuits."
    },
    {
      q: "What is 'pulse swallower' or 'pulse stealing' technique?",
      a: "It's a technique where a circuit briefly holds a pulse to meet hold time requirements, effectively 'stealing' time from the next clock cycle. Used in high-speed designs."
    },
    {
      q: "How do you measure pulse width with an oscilloscope?",
      a: "Use cursors to measure the time between the 50% rising edge and 50% falling edge. Trigger on the rising edge and adjust timebase to see the pulse clearly."
    },
    {
      q: "Explain a 'digital pulse counter' circuit.",
      a: "A counter incremented by each pulse. Used in frequency meters, odometers, and event counters. Must include debouncing for mechanical switches."
    },
    {
      q: "What happens if a pulse is shorter than the propagation delay of the following gate?",
      a: "The gate may not respond at all (the pulse is 'swallowed'), or the output may be an unpredictable runt pulse. This violates timing constraints."
    }
  ];

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section with Animation */}
        <div className="text-center mb-16 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-4">
            Topic 5 • Synchronization Mastery
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Pulse Triggering & Timing Diagrams
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding clock pulse behavior, waveform analysis, and real-world synchronization challenges.
          </p>
        </div>

        {/* Interactive Pulse Demonstrator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Live Pulse Visualization
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              <button
                onClick={() => setPulseType('narrow')}
                className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", pulseType === 'narrow' ? "bg-emerald-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50")}
              >Narrow Pulse (Clean)</button>
              <button
                onClick={() => setPulseType('wide')}
                className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", pulseType === 'wide' ? "bg-blue-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/50")}
              >Wide Pulse (Level)</button>
              <button
                onClick={() => setPulseType('glitch')}
                className={clsx("px-5 py-2 rounded-full font-medium transition-all duration-300", pulseType === 'glitch' ? "bg-red-500 text-white shadow-lg scale-105" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/50")}
              >Glitchy Pulse (Noise)</button>
            </div>
            <AnimatedPulseSVG isActive={true} colorClass={pulseColor} />
            <p className="text-center mt-4 text-gray-600 dark:text-gray-300 font-mono text-sm bg-gray-100 dark:bg-gray-900/50 p-2 rounded-lg">{pulseDescription}</p>
          </div>
        </div>

        {/* Theory Section - Cards with stagger animation */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Concept */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-indigo-500 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-2xl font-bold">Pulse Triggering Explained</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">In sequential circuits, <strong className="text-indigo-600 dark:text-indigo-400">pulse triggering</strong> means the circuit responds to the entire duration (width) of the clock pulse, not just the instant it changes. Unlike edge-triggered flip-flops that sample only at a transition, pulse-triggered devices (latches) are <strong>level-sensitive</strong>—they are 'transparent' while the pulse is active.</p>
            <p className="text-gray-700 dark:text-gray-300">A perfect pulse is a square wave, but real-world pulses have finite rise/fall times, overshoot, and ringing. The <strong>pulse width (t_w)</strong> and <strong>duty cycle</strong> are critical parameters. Too narrow a pulse may not meet setup time; too wide may cause race conditions.</p>
          </div>

          {/* Card 2: Timing Diagram */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              </div>
              <h2 className="text-2xl font-bold">Timing Diagrams</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">A <strong>timing diagram</strong> shows how digital signals change over time. It's the oscilloscope view of your circuit. Key elements: time on x-axis, voltage levels (0/1) on y-axis, arrows for cause-effect relationships.</p>
            <p className="text-gray-700 dark:text-gray-300">Engineers use timing diagrams to verify setup/hold times, detect glitches, and debug race conditions. In pulse-triggered systems, the diagram must show the <strong>transparent window</strong> and when data is latched.</p>
          </div>
        </div>

        {/* Real-World Significance */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.9s_ease-out] motion-safe:animate-[fadeSlideUp_0.9s_ease-out]">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Real-World Synchronization
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Imagine <strong>Swadeep in Barrackpore</strong> sending a data packet to <strong>Tuhina in Shyamnagar</strong> over a noisy line. Without proper pulse shaping and synchronization, a glitch might flip a bit, corrupting her school project. Similarly, in <strong>digital clocks</strong> (like at Ichapur station), a 32.768 kHz crystal's pulses are divided down—any pulse irregularity makes the clock gain or lose seconds.</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Key applications:</strong> Debouncing mechanical switches (eliminates false pulses), frequency synthesizers (PLLs use pulse edges), and data buses (DDR memory uses both edges). Modern CPUs use <strong>edge-triggering</strong> to avoid pulse-width sensitivity, but pulse-triggered latches are still used in register files for speed.</p>
        </div>

        {/* Tips & Tricks + Common Mistakes */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">💡 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use a <strong>Schmitt trigger</strong> input to clean slow or noisy pulses.</li>
              <li>For critical signals, add a <strong>glitch filter</strong> (RC + gate) to reject narrow pulses.</li>
              <li>Measure pulse width at <strong>50% amplitude</strong> for consistent results.</li>
              <li>In FPGAs, avoid using gate-level clocks; use dedicated clock buffers.</li>
              <li><strong>Duty cycle distortion</strong> occurs when rise/fall times differ—check with oscilloscope.</li>
              <li>When simulating, always run <strong>worst-case timing analysis</strong> for pulse width.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Assuming a pulse is ideal square—real pulses have <strong>finite rise/fall</strong>.</li>
              <li>Violating <strong>pulse width minimum</strong> spec of a flip-flop leads to metastability.</li>
              <li>Using a <strong>level-sensitive latch</strong> where an edge-triggered FF is needed.</li>
              <li>Forgetting <strong>debouncing</strong> switches—results in multiple false pulses.</li>
              <li>Ignoring <strong>clock skew</strong> when distributing wide pulses across a chip.</li>
              <li>Drawing timing diagrams with <strong>no causality arrows</strong>—hard to debug.</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="mb-16 animate-[fadeSlideUp_1.1s_ease-out] motion-safe:animate-[fadeSlideUp_1.1s_ease-out]">
          <Teacher note="Pulse triggering is the foundation of understanding latches. Remember: a pulse is not just a 'blip'—its width, rise time, and noise matter. In exams, always draw timing diagrams with clear alignment between clock and data. For real-world designs, prefer edge-triggered flip-flops unless you need the speed of a transparent latch. Practice reading datasheets—they specify minimum pulse widths and setup/hold times relative to the pulse edges." />
        </div>

        {/* Questions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-16 transition-all duration-300 hover:shadow-xl animate-[fadeSlideUp_0.9s_ease-out] motion-safe:animate-[fadeSlideUp_0.9s_ease-out]">
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Self-Assessment (15-20 Questions)
            </h2>
            <p className="text-gray-300 text-sm mt-1">Click on any question to reveal the answer. Test your understanding!</p>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {questions.map((item, idx) => (
              <div key={idx} className="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <button
                  onClick={() => toggleAnswer(idx)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200 pr-8">{idx+1}. {item.q}</span>
                  <svg className={clsx("w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0", activeQuestion === idx && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={clsx("px-6 overflow-hidden transition-all duration-300 ease-in-out", activeQuestion === idx ? "max-h-96 pb-4" : "max-h-0")}>
                  <div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg text-gray-700 dark:text-gray-300 border-l-4 border-indigo-500">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_1.1s_ease-out] motion-safe:animate-[fadeSlideUp_1.1s_ease-out]">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">🔍 Think About...</h3>
          <p className="text-gray-700 dark:text-gray-300"><strong>Observe carefully:</strong> How does the duty cycle of a clock affect the maximum operating frequency of a pulse-triggered latch?<br />
          <strong>Try changing this:</strong> In the interactive SVG, switch between narrow and wide pulse. Imagine a D latch connected—during which pulse type would the output be more likely to change multiple times?<br />
          <strong>Consider:</strong> If a glitch occurs right at the falling edge of a clock, could it be mistaken for a valid pulse? How would you filter it?</p>
        </div>
      </div>
    </div>
  );
};

export default Topic5;