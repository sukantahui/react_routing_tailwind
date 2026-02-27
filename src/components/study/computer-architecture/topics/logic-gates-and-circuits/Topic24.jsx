import React from 'react';
import clsx from 'clsx';

// Inline keyframes for fade + slide-up animation
const animationStyles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;

const Topic24 = () => {
  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Encoder Applications – Keyboard Encoder</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          How encoders are used in keyboards and keypads to convert key presses into binary codes.
        </p>
      </header>

      {/* Why Encoders in Keyboards? */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">⌨️ Why Encoders in Keyboards?</h2>
        <p className="text-gray-300 mb-4">
          A typical computer keyboard has 101+ keys. Connecting each key directly to a processor pin would be impractical. Instead, keyboards use <strong>matrix encoding</strong> and <strong>priority encoders</strong> to reduce the number of connections and to handle multiple key presses (rollover).
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Reduce pin count:</strong> 8×8 matrix = 64 keys using only 16 pins.</li>
          <li><strong>Generate unique codes:</strong> Each key press is converted to a scan code or ASCII.</li>
          <li><strong>Handle multiple presses:</strong> Priority encoders decide which key to report when two are pressed simultaneously.</li>
        </ul>
      </section>

      {/* Basic Keyboard Encoder with Priority Encoder */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 Basic Keyboard Encoder Using 74147</h2>
        <p className="text-gray-300 mb-4">
          The 74147 (10-line to 4-line priority encoder) is ideal for a numeric keypad (0–9). Each key, when pressed, pulls the corresponding input low. The encoder outputs the BCD code (active low) of the highest-priority key pressed.
        </p>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl group">
            <svg viewBox="0 0 500 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* 74147 IC */}
              <rect x="200" y="100" width="120" height="160" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="160" fill="currentColor" fontSize="14" textAnchor="middle">74147</text>
              <text x="260" y="180" fill="currentColor" fontSize="10" textAnchor="middle">Priority Encoder</text>
              
              {/* Keypad (0-9) */}
              <rect x="20" y="50" width="120" height="200" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="80" y="30" fill="currentColor" fontSize="12">Keypad</text>
              <text x="50" y="80" fill="currentColor" fontSize="10">1</text>
              <text x="80" y="80" fill="currentColor" fontSize="10">2</text>
              <text x="110" y="80" fill="currentColor" fontSize="10">3</text>
              <text x="50" y="120" fill="currentColor" fontSize="10">4</text>
              <text x="80" y="120" fill="currentColor" fontSize="10">5</text>
              <text x="110" y="120" fill="currentColor" fontSize="10">6</text>
              <text x="50" y="160" fill="currentColor" fontSize="10">7</text>
              <text x="80" y="160" fill="currentColor" fontSize="10">8</text>
              <text x="110" y="160" fill="currentColor" fontSize="10">9</text>
              <text x="80" y="200" fill="currentColor" fontSize="10">0</text>

              {/* Connections from keypad to encoder inputs (active low) */}
              <line x1="140" y1="70" x2="200" y2="110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="90" x2="200" y2="130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="110" x2="200" y2="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="130" x2="200" y2="170" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="150" x2="200" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="170" x2="200" y2="210" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="190" x2="200" y2="230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="210" x2="200" y2="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />
              <line x1="140" y1="230" x2="200" y2="270" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3" />

              {/* Outputs to display */}
              <line x1="320" y1="150" x2="380" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="400" y="155" fill="currentColor" fontSize="12">BCD out</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            A 10-key keypad connected to a 74147 priority encoder. When a key is pressed, the corresponding input goes low, and the encoder outputs the inverted BCD code of the highest-priority key.
          </p>
        </div>
      </section>

      {/* Matrix Keyboard Scanning */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔲 Matrix Keyboard Scanning</h2>
        <p className="text-gray-300 mb-4">
          For full-sized keyboards, a matrix arrangement is used. Rows are driven sequentially, and columns are read by encoders. A microcontroller or dedicated keyboard encoder (like 74C922) performs scanning and debouncing.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200 font-mono text-center">
            4×4 matrix: 16 keys, 8 pins (4 rows + 4 columns)
          </p>
          <p className="text-gray-300 mt-2">
            Operation: Drive one row low, read column inputs. If a key is pressed at the intersection, the corresponding column goes low. A priority encoder on columns helps detect multiple key presses in the same row.
          </p>
        </div>
      </section>

      {/* Modern Keyboard Encoder ICs */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🛠️ Dedicated Keyboard Encoder ICs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>74C922/74C923:</strong> 16-key or 20-key encoders with built-in debouncing, scanning, and three-state outputs. They output a 4-bit code for the pressed key and signal when a key is pressed.</li>
          <li><strong>MM74C922:</strong> Includes internal oscillator for scanning, debounce circuitry, and data available flag.</li>
          <li><strong>Microcontroller-based:</strong> Modern keyboards use a small MCU (e.g., 8051, ARM) to scan the matrix, debounce, and communicate via USB or PS/2.</li>
        </ul>
      </section>

      {/* Real-World Example: PC Keyboard */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💻 Real-World Example: PC Keyboard</h2>
        <p className="text-gray-300 mb-4">
          A standard PS/2 or USB keyboard contains a matrix of keys (typically 16×8 for 101 keys). A microcontroller performs the following steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-200">
          <li><strong>Scan rows:</strong> Drive each row low one at a time.</li>
          <li><strong>Read columns:</strong> Read the column lines (often via internal pull-ups).</li>
          <li><strong>Detect press:</strong> If a column is low, a key at that row/column is pressed.</li>
          <li><strong>Debounce:</strong> Wait a few milliseconds and read again to confirm.</li>
          <li><strong>Generate scan code:</strong> Map the (row, column) pair to a scan code (e.g., make code).</li>
          <li><strong>Handle rollover:</strong> For multiple keys, generate sequences or use NKRO (N-key rollover).</li>
          <li><strong>Transmit:</strong> Send the scan code to the computer via USB/PS/2.</li>
        </ol>
        <p className="text-gray-300 mt-3">
          Priority encoders are often used within the microcontroller's firmware to decide which key to report first when multiple are pressed.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Why is debouncing necessary in mechanical keyboards? (Contacts bounce, causing multiple false presses.)</li>
          <li>How would you design a 64-key keyboard using a matrix and a priority encoder? (8 rows, 8 columns, use an 8:3 priority encoder on columns.)</li>
          <li>What happens if three keys are pressed simultaneously in a basic matrix scan? (Ghosting – unintended key detection.) How is it prevented? (Diode isolation.)</li>
          <li>Try implementing a simple 4×4 keypad decoder using a 74148 and a microcontroller in simulation.</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>No debouncing:</strong> Directly reading keys without debouncing leads to multiple counts per press.</li>
          <li><strong>Ignoring ghosting:</strong> In matrix keyboards without diodes, pressing three keys can create a phantom key.</li>
          <li><strong>Incorrect priority:</strong> Using a basic encoder without priority may give wrong codes when multiple keys are pressed.</li>
          <li><strong>Floating inputs:</strong> Unconnected inputs on encoder ICs must be pulled up/down to avoid noise.</li>
          <li><strong>Misinterpreting active-low:</strong> Many keyboard encoder ICs have active-low inputs/outputs; forgetting to invert can reverse logic.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Use pull-up resistors on all inputs to ensure a defined logic level when no key is pressed.</li>
          <li>Implement debouncing in hardware (RC filter) or software (delay and check again).</li>
          <li>For matrix keyboards, add diodes at each switch to prevent ghosting (especially in high-speed scanning).</li>
          <li>Choose a priority encoder that matches the required number of keys (e.g., 74148 for 8 inputs, 74147 for 10).</li>
          <li>Simulate the keyboard circuit before building to verify correct encoding and priority behavior.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Use a dedicated keyboard encoder IC:</strong> 74C922 simplifies design with built-in debounce and scanning – just connect a matrix and read the output.</li>
          <li><strong>For NKRO (N-key rollover):</strong> Use a diode on every switch and a fast microcontroller that scans the matrix and reports all keys simultaneously.</li>
          <li><strong>Low-power design:</strong> Scan the keyboard only when a key might be pressed (interrupt on key press) to save power in battery-operated devices.</li>
          <li><strong>Scan codes:</strong> Standard PS/2 keyboards use make and break codes – the encoder must differentiate between press and release.</li>
          <li><strong>Test with all keys:</strong> Ensure the priority encoder handles the highest-priority key correctly even when multiple are pressed.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the need for encoders in keyboards (reducing pins, generating codes).</li>
          <li>I know how a simple numeric keypad encoder works using 74147.</li>
          <li>I understand matrix scanning and the role of priority encoders.</li>
          <li>I am aware of debouncing and ghosting issues and their solutions.</li>
          <li>I know about dedicated keyboard encoder ICs like 74C922.</li>
          <li>I can design a basic keyboard interface using a priority encoder and a microcontroller.</li>
        </ul>
      </section>

      {/* Teacher's Note */}
      <section className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-2 flex items-center gap-2">
          👩‍🏫 Teacher's Note
        </h2>
        <p className="text-gray-200 mb-3">
          <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in | mobile: 7003756860) has 27 years of experience teaching programming, RDBMS, operating systems, and web development.
        </p>
        <p className="text-gray-300 italic">
          “Keyboard encoding is one of the most satisfying applications of encoders for students. In our Naihati lab, we build a 16-key matrix with a 74C922 and watch the BCD output change as we press keys. They learn about scanning, debouncing, and priority all in one go. I challenge them to add diodes to prevent ghosting and to implement NKRO with a microcontroller. This topic brings together many concepts: encoders, multiplexing, and real-world interfacing. It's a perfect capstone for the encoder series.”
        </p>
      </section>
    </div>
  );
};

export default Topic24;