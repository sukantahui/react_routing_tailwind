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

// --- Characteristic Tables Comparison SVG ---
const CharacteristicTablesSVG = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-5xl">
        {/* Background */}
        <rect x="20" y="20" width="860" height="360" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="450" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Characteristic Tables (Q(t+1) as function of inputs and Q(t))</text>
        
        {/* SR Table */}
        <rect x="40" y="60" width="190" height="200" rx="6" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" />
        <text x="135" y="85" fill="#ef4444" fontSize="13" textAnchor="middle" fontWeight="bold">SR Flip-Flop</text>
        <text x="135" y="105" fill="#9ca3af" fontSize="10" textAnchor="middle">Q(t+1) = S + R'·Q</text>
        
        <text x="55" y="130" fill="#f59e0b" fontSize="10">S R | Q(t) | Q(t+1)</text>
        <line x1="50" y1="138" x2="220" y2="138" stroke="#6b7280" strokeWidth="0.5" />
        <text x="55" y="155" fill="#9ca3af" fontSize="9">0 0 | 0 | 0</text>
        <text x="55" y="170" fill="#9ca3af" fontSize="9">0 0 | 1 | 1</text>
        <text x="55" y="190" fill="#9ca3af" fontSize="9">0 1 | 0 | 0</text>
        <text x="55" y="205" fill="#9ca3af" fontSize="9">0 1 | 1 | 0</text>
        <text x="55" y="225" fill="#9ca3af" fontSize="9">1 0 | 0 | 1</text>
        <text x="55" y="240" fill="#9ca3af" fontSize="9">1 0 | 1 | 1</text>
        <text x="55" y="260" fill="#ef4444" fontSize="9">1 1 | 0 | X</text>
        <text x="55" y="275" fill="#ef4444" fontSize="9">1 1 | 1 | X</text>
        
        {/* D Table */}
        <rect x="250" y="60" width="160" height="200" rx="6" fill="#1f2937" stroke="#10b981" strokeWidth="1.5" />
        <text x="330" y="85" fill="#10b981" fontSize="13" textAnchor="middle" fontWeight="bold">D Flip-Flop</text>
        <text x="330" y="105" fill="#9ca3af" fontSize="10" textAnchor="middle">Q(t+1) = D</text>
        
        <text x="265" y="130" fill="#f59e0b" fontSize="10">D | Q(t) | Q(t+1)</text>
        <line x1="260" y1="138" x2="400" y2="138" stroke="#6b7280" strokeWidth="0.5" />
        <text x="265" y="155" fill="#9ca3af" fontSize="9">0 | 0 | 0</text>
        <text x="265" y="170" fill="#9ca3af" fontSize="9">0 | 1 | 0</text>
        <text x="265" y="190" fill="#9ca3af" fontSize="9">1 | 0 | 1</text>
        <text x="265" y="205" fill="#9ca3af" fontSize="9">1 | 1 | 1</text>
        
        {/* JK Table */}
        <rect x="430" y="60" width="200" height="200" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="530" y="85" fill="#8b5cf6" fontSize="13" textAnchor="middle" fontWeight="bold">JK Flip-Flop</text>
        <text x="530" y="105" fill="#9ca3af" fontSize="10" textAnchor="middle">Q(t+1) = J·Q' + K'·Q</text>
        
        <text x="445" y="130" fill="#f59e0b" fontSize="10">J K | Q(t) | Q(t+1)</text>
        <line x1="440" y1="138" x2="620" y2="138" stroke="#6b7280" strokeWidth="0.5" />
        <text x="445" y="155" fill="#9ca3af" fontSize="9">0 0 | 0 | 0</text>
        <text x="445" y="170" fill="#9ca3af" fontSize="9">0 0 | 1 | 1</text>
        <text x="445" y="190" fill="#9ca3af" fontSize="9">0 1 | 0 | 0</text>
        <text x="445" y="205" fill="#9ca3af" fontSize="9">0 1 | 1 | 0</text>
        <text x="445" y="225" fill="#9ca3af" fontSize="9">1 0 | 0 | 1</text>
        <text x="445" y="240" fill="#9ca3af" fontSize="9">1 0 | 1 | 1</text>
        <text x="445" y="260" fill="#8b5cf6" fontSize="9">1 1 | 0 | 1</text>
        <text x="445" y="275" fill="#8b5cf6" fontSize="9">1 1 | 1 | 0</text>
        
        {/* T Table */}
        <rect x="650" y="60" width="200" height="200" rx="6" fill="#1f2937" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="750" y="85" fill="#f59e0b" fontSize="13" textAnchor="middle" fontWeight="bold">T Flip-Flop</text>
        <text x="750" y="105" fill="#9ca3af" fontSize="10" textAnchor="middle">Q(t+1) = T ⊕ Q</text>
        
        <text x="665" y="130" fill="#f59e0b" fontSize="10">T | Q(t) | Q(t+1)</text>
        <line x1="660" y1="138" x2="840" y2="138" stroke="#6b7280" strokeWidth="0.5" />
        <text x="665" y="155" fill="#9ca3af" fontSize="9">0 | 0 | 0</text>
        <text x="665" y="170" fill="#9ca3af" fontSize="9">0 | 1 | 1</text>
        <text x="665" y="190" fill="#9ca3af" fontSize="9">1 | 0 | 1</text>
        <text x="665" y="205" fill="#9ca3af" fontSize="9">1 | 1 | 0</text>
        
        {/* Footer note */}
        <text x="450" y="350" fill="#6b7280" fontSize="11" textAnchor="middle">Characteristic Table: Given current state and inputs, what is the next state?</text>
      </svg>
    </div>
  );
};

// --- Excitation Tables Comparison SVG ---
const ExcitationTablesSVG = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-5xl">
        {/* Background */}
        <rect x="20" y="20" width="860" height="360" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="450" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Excitation Tables (Given Q(t) → Q(t+1), what inputs are needed?)</text>
        
        {/* SR Excitation */}
        <rect x="40" y="60" width="190" height="200" rx="6" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" />
        <text x="135" y="85" fill="#ef4444" fontSize="13" textAnchor="middle" fontWeight="bold">SR Excitation</text>
        
        <text x="55" y="115" fill="#f59e0b" fontSize="10">Q(t) | Q(t+1) | S R</text>
        <line x1="50" y1="123" x2="220" y2="123" stroke="#6b7280" strokeWidth="0.5" />
        <text x="55" y="143" fill="#9ca3af" fontSize="9">0 | 0 | 0 X</text>
        <text x="55" y="163" fill="#9ca3af" fontSize="9">0 | 1 | 1 0</text>
        <text x="55" y="183" fill="#9ca3af" fontSize="9">1 | 0 | 0 1</text>
        <text x="55" y="203" fill="#9ca3af" fontSize="9">1 | 1 | X 0</text>
        <text x="55" y="230" fill="#ef4444" fontSize="9">Note: X = Don't Care</text>
        
        {/* D Excitation */}
        <rect x="250" y="60" width="160" height="200" rx="6" fill="#1f2937" stroke="#10b981" strokeWidth="1.5" />
        <text x="330" y="85" fill="#10b981" fontSize="13" textAnchor="middle" fontWeight="bold">D Excitation</text>
        
        <text x="265" y="115" fill="#f59e0b" fontSize="10">Q(t) | Q(t+1) | D</text>
        <line x1="260" y1="123" x2="400" y2="123" stroke="#6b7280" strokeWidth="0.5" />
        <text x="265" y="143" fill="#9ca3af" fontSize="9">0 | 0 | 0</text>
        <text x="265" y="163" fill="#9ca3af" fontSize="9">0 | 1 | 1</text>
        <text x="265" y="183" fill="#9ca3af" fontSize="9">1 | 0 | 0</text>
        <text x="265" y="203" fill="#9ca3af" fontSize="9">1 | 1 | 1</text>
        <text x="265" y="230" fill="#10b981" fontSize="9">D = Q(t+1)</text>
        
        {/* JK Excitation */}
        <rect x="430" y="60" width="200" height="200" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="530" y="85" fill="#8b5cf6" fontSize="13" textAnchor="middle" fontWeight="bold">JK Excitation</text>
        
        <text x="445" y="115" fill="#f59e0b" fontSize="10">Q(t) | Q(t+1) | J K</text>
        <line x1="440" y1="123" x2="620" y2="123" stroke="#6b7280" strokeWidth="0.5" />
        <text x="445" y="143" fill="#9ca3af" fontSize="9">0 | 0 | 0 X</text>
        <text x="445" y="163" fill="#9ca3af" fontSize="9">0 | 1 | 1 X</text>
        <text x="445" y="183" fill="#9ca3af" fontSize="9">1 | 0 | X 1</text>
        <text x="445" y="203" fill="#9ca3af" fontSize="9">1 | 1 | X 0</text>
        <text x="445" y="230" fill="#8b5cf6" fontSize="9">X = Don't Care</text>
        
        {/* T Excitation */}
        <rect x="650" y="60" width="200" height="200" rx="6" fill="#1f2937" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="750" y="85" fill="#f59e0b" fontSize="13" textAnchor="middle" fontWeight="bold">T Excitation</text>
        
        <text x="665" y="115" fill="#f59e0b" fontSize="10">Q(t) | Q(t+1) | T</text>
        <line x1="660" y1="123" x2="840" y2="123" stroke="#6b7280" strokeWidth="0.5" />
        <text x="665" y="143" fill="#9ca3af" fontSize="9">0 | 0 | 0</text>
        <text x="665" y="163" fill="#9ca3af" fontSize="9">0 | 1 | 1</text>
        <text x="665" y="183" fill="#9ca3af" fontSize="9">1 | 0 | 1</text>
        <text x="665" y="203" fill="#9ca3af" fontSize="9">1 | 1 | 0</text>
        <text x="665" y="230" fill="#f59e0b" fontSize="9">T = Q(t) ⊕ Q(t+1)</text>
        
        {/* Footer note */}
        <text x="450" y="350" fill="#6b7280" fontSize="11" textAnchor="middle">Excitation Table: Given desired transition, what inputs must be applied?</text>
      </svg>
    </div>
  );
};

// --- Conversion Methods SVG ---
const ConversionMethodsSVG = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-4xl">
        <rect x="20" y="20" width="760" height="260" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="400" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Flip-Flop Conversion Methods</text>
        
        {/* Method 1: Using Excitation Tables */}
        <rect x="40" y="65" width="340" height="190" rx="6" fill="#1f2937" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="210" y="90" fill="#3b82f6" fontSize="13" textAnchor="middle" fontWeight="bold">Method 1: Excitation Table Method</text>
        <text x="60" y="115" fill="#9ca3af" fontSize="10">1. Write desired state transition (Q(t) → Q(t+1))</text>
        <text x="60" y="135" fill="#9ca3af" fontSize="10">2. Choose target flip-flop type (e.g., JK, D, T)</text>
        <text x="60" y="155" fill="#9ca3af" fontSize="10">3. Use excitation table to find required inputs</text>
        <text x="60" y="175" fill="#9ca3af" fontSize="10">4. Express inputs in terms of circuit variables</text>
        <text x="60" y="195" fill="#9ca3af" fontSize="10">5. Derive logic equations (K-maps or Boolean)</text>
        <text x="60" y="220" fill="#f59e0b" fontSize="10">✨ Best for: JK to D, SR to JK, etc.</text>
        
        {/* Method 2: Characteristic Equation Method */}
        <rect x="420" y="65" width="340" height="190" rx="6" fill="#1f2937" stroke="#10b981" strokeWidth="1.5" />
        <text x="590" y="90" fill="#10b981" fontSize="13" textAnchor="middle" fontWeight="bold">Method 2: Characteristic Equation</text>
        <text x="440" y="115" fill="#9ca3af" fontSize="10">1. Write characteristic eq of target FF</text>
        <text x="440" y="135" fill="#9ca3af" fontSize="10">2. Write characteristic eq of source FF</text>
        <text x="440" y="155" fill="#9ca3af" fontSize="10">3. Equate Q(t+1) expressions</text>
        <text x="440" y="175" fill="#9ca3af" fontSize="10">4. Solve for target inputs in terms of source</text>
        <text x="440" y="195" fill="#9ca3af" fontSize="10">5. Simplify using Boolean algebra</text>
        <text x="440" y="220" fill="#f59e0b" fontSize="10">✨ Best for: D to T, T to D, simple conversions</text>
      </svg>
    </div>
  );
};

// --- Flip-Flop Conversion Examples SVG ---
const ConversionExamplesSVG = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <svg viewBox="0 0 900 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-5xl">
        <rect x="20" y="20" width="860" height="310" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="450" y="45" fill="#6b7280" fontSize="14" textAnchor="middle" className="dark:fill-gray-400" fontWeight="bold">Common Flip-Flop Conversions</text>
        
        {/* JK to D */}
        <rect x="40" y="65" width="260" height="230" rx="6" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="170" y="90" fill="#8b5cf6" fontSize="12" textAnchor="middle" fontWeight="bold">JK → D Conversion</text>
        <text x="60" y="115" fill="#9ca3af" fontSize="10">Step 1: Q(t+1)_D = D</text>
        <text x="60" y="135" fill="#9ca3af" fontSize="10">Step 2: Q(t+1)_JK = J·Q' + K'·Q</text>
        <text x="60" y="155" fill="#9ca3af" fontSize="10">Step 3: Equate: D = J·Q' + K'·Q</text>
        <text x="60" y="175" fill="#9ca3af" fontSize="10">Step 4: Choose J=D, K=D'</text>
        <text x="60" y="200" fill="#10b981" fontSize="10">✨ Result: J = D, K = D'</text>
        <rect x="70" y="215" width="200" height="60" rx="4" fill="#374151" stroke="#10b981" strokeWidth="1" />
        <text x="170" y="235" fill="#10b981" fontSize="10" textAnchor="middle">D → J</text>
        <text x="170" y="250" fill="#10b981" fontSize="10" textAnchor="middle">J = D, K = D'</text>
        <text x="170" y="265" fill="#9ca3af" fontSize="9" textAnchor="middle">Inverter between J and K</text>
        
        {/* D to T */}
        <rect x="320" y="65" width="260" height="230" rx="6" fill="#1f2937" stroke="#10b981" strokeWidth="1.5" />
        <text x="450" y="90" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">D → T Conversion</text>
        <text x="340" y="115" fill="#9ca3af" fontSize="10">Step 1: Q(t+1)_T = T ⊕ Q</text>
        <text x="340" y="135" fill="#9ca3af" fontSize="10">Step 2: Q(t+1)_D = D</text>
        <text x="340" y="155" fill="#9ca3af" fontSize="10">Step 3: Equate: D = T ⊕ Q</text>
        <text x="340" y="175" fill="#9ca3af" fontSize="10">Step 4: D = T·Q' + T'·Q</text>
        <text x="340" y="200" fill="#10b981" fontSize="10">✨ Result: D = T ⊕ Q</text>
        <rect x="350" y="215" width="200" height="60" rx="4" fill="#374151" stroke="#10b981" strokeWidth="1" />
        <text x="450" y="235" fill="#10b981" fontSize="10" textAnchor="middle">T → D</text>
        <text x="450" y="250" fill="#10b981" fontSize="10" textAnchor="middle">D = T ⊕ Q</text>
        <text x="450" y="265" fill="#9ca3af" fontSize="9" textAnchor="middle">Requires XOR gate</text>
        
        {/* JK to T */}
        <rect x="600" y="65" width="260" height="230" rx="6" fill="#1f2937" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="730" y="90" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">JK → T Conversion</text>
        <text x="620" y="115" fill="#9ca3af" fontSize="10">Step 1: Q(t+1)_T = T ⊕ Q</text>
        <text x="620" y="135" fill="#9ca3af" fontSize="10">Step 2: Q(t+1)_JK = J·Q' + K'·Q</text>
        <text x="620" y="155" fill="#9ca3af" fontSize="10">Step 3: Equate: J·Q' + K'·Q = T⊕Q</text>
        <text x="620" y="175" fill="#9ca3af" fontSize="10">Step 4: Choose J=T, K=T</text>
        <text x="620" y="200" fill="#10b981" fontSize="10">✨ Result: J = T, K = T</text>
        <rect x="630" y="215" width="200" height="60" rx="4" fill="#374151" stroke="#10b981" strokeWidth="1" />
        <text x="730" y="235" fill="#10b981" fontSize="10" textAnchor="middle">T → JK</text>
        <text x="730" y="250" fill="#10b981" fontSize="10" textAnchor="middle">J = T, K = T</text>
        <text x="730" y="265" fill="#9ca3af" fontSize="9" textAnchor="middle">Connect J and K together</text>
      </svg>
    </div>
  );
};

// --- Quick Reference Card SVG ---
const QuickReferenceCard = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6">
      <h3 className="text-lg font-bold text-center mb-4">📋 Quick Reference: Characteristic vs Excitation</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Characteristic Table</div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Answers: <strong>"Given current state and inputs, what is the next state?"</strong></p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Format: Inputs | Current State | Next State</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Used for: Forward analysis, simulation</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="font-bold text-purple-600 dark:text-purple-400 mb-2">Excitation Table</div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Answers: <strong>"Given desired transition, what inputs are needed?"</strong></p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Format: Current State | Next State | Inputs</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Used for: Design, synthesis, state minimization</p>
        </div>
      </div>
    </div>
  );
};

const Topic12 = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  const questions = [
    { q: "What is the difference between a characteristic table and an excitation table?", a: "Characteristic table shows next state (Q(t+1)) given current state (Q(t)) and inputs. Excitation table shows required inputs given desired state transition (Q(t) → Q(t+1))." },
    { q: "Write the characteristic equation for each flip-flop type.", a: "SR: Q(t+1)=S+R'Q, SR=0; D: Q(t+1)=D; JK: Q(t+1)=JQ'+K'Q; T: Q(t+1)=T⊕Q." },
    { q: "Write the excitation table for SR flip-flop.", a: "0→0: S=0,R=X; 0→1: S=1,R=0; 1→0: S=0,R=1; 1→1: S=X,R=0." },
    { q: "Write the excitation table for JK flip-flop.", a: "0→0: J=0,K=X; 0→1: J=1,K=X; 1→0: J=X,K=1; 1→1: J=X,K=0." },
    { q: "Write the excitation table for D flip-flop.", a: "0→0: D=0; 0→1: D=1; 1→0: D=0; 1→1: D=1. (D = Q(t+1))" },
    { q: "Write the excitation table for T flip-flop.", a: "0→0: T=0; 0→1: T=1; 1→0: T=1; 1→1: T=0. (T = Q(t) ⊕ Q(t+1))" },
    { q: "How do you convert a JK flip-flop to a D flip-flop?", a: "Connect J = D, K = D' (inverter). Then JK behaves as D flip-flop." },
    { q: "How do you convert a D flip-flop to a T flip-flop?", a: "Connect D = T ⊕ Q (XOR gate). Then D flip-flop toggles when T=1." },
    { q: "How do you convert a JK flip-flop to a T flip-flop?", a: "Connect J = T, K = T. Then JK toggles when T=1, holds when T=0." },
    { q: "How do you convert a T flip-flop to a D flip-flop?", a: "Connect T = D ⊕ Q (or use T = D·Q' + D'·Q)." },
    { q: "What is the significance of 'don't care' (X) in excitation tables?", a: "X means the input can be either 0 or 1 — both produce the desired transition. This gives flexibility in minimization." },
    { q: "Why do we use excitation tables in sequential circuit design?", a: "When designing from a state diagram, we know desired transitions (Q→Q_next). Excitation tables tell us what inputs to apply to achieve that transition." },
    { q: "Convert SR flip-flop to JK flip-flop using excitation table method.", a: "Compare excitation tables: SR inputs expressed in terms of J,K,Q. Derive S = J·Q', R = K·Q." },
    { q: "Convert D flip-flop to JK flip-flop.", a: "D = J·Q' + K'·Q. Use this equation to drive D input from J,K, and Q." },
    { q: "What is the characteristic equation of SR flip-flop with constraint?", a: "Q(t+1) = S + R'·Q, with constraint S·R = 0 (cannot both be 1)." },
    { q: "What is the excitation equation for T flip-flop?", a: "T = Q(t) ⊕ Q(t+1). This means T=1 when state changes, T=0 when state stays same." },
    { q: "How do you remember excitation tables quickly for exams?", a: "SR: S sets (0→1 needs S=1), R resets (1→0 needs R=1). JK: J sets (0→1 needs J=1), K resets (1→0 needs K=1). D: D = Q_next. T: T = 1 when Q changes." },
    { q: "What is the difference between synchronous and asynchronous inputs in excitation tables?", a: "Excitation tables typically cover synchronous inputs (clocked). Asynchronous preset/clear have separate timing." },
    { q: "How many rows are in a full characteristic table for JK flip-flop?", a: "8 rows (2 J × 2 K × 2 Q = 8 combinations)." },
    { q: "Why is the excitation table for D flip-flop the simplest?", a: "Because D = Q(t+1) directly — no dependence on Q(t). The required input is exactly the desired next state." }
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
              Topic 12 • Design Tables Mastery
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              Characteristic vs Excitation Tables
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understanding the difference, conversion methods, and using excitation tables for circuit design.
            </p>
          </div>
          
          {/* Characteristic Tables */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Characteristic Tables (Forward Analysis)
              </h2>
            </div>
            <div className="p-6">
              <CharacteristicTablesSVG />
            </div>
          </div>
          
          {/* Excitation Tables */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                Excitation Tables (Backward Design)
              </h2>
            </div>
            <div className="p-6">
              <ExcitationTablesSVG />
            </div>
          </div>
          
          {/* Quick Reference Card */}
          <div className="mb-8 animate-fadeSlideUp">
            <QuickReferenceCard />
          </div>
          
          {/* Conversion Methods */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Flip-Flop Conversion Methods</h2>
            <ConversionMethodsSVG />
          </div>
          
          {/* Conversion Examples */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Common Conversion Examples</h2>
            <ConversionExamplesSVG />
          </div>
          
          {/* Theory Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-emerald-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">📖 Characteristic Table Deep Dive</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The <strong>characteristic table</strong> is a truth table that shows the next state (Q(t+1)) for all combinations of current state (Q(t)) and inputs.</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>Example reading:</strong> In JK characteristic table, when J=1, K=0, and Q(t)=0, then Q(t+1)=1 (set operation).</p>
              <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                📌 <strong>Use case:</strong> Simulating sequential circuits, verifying behavior, understanding flip-flop operation.
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500 animate-fadeSlideUp">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">🎯 Excitation Table Deep Dive</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The <strong>excitation table</strong> answers: "Given I want to go from Q(t) to Q(t+1), what inputs must I apply?"</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>Example reading:</strong> In JK excitation table, to go from 0→1, J must be 1, K can be anything (X).</p>
              <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-sm">
                📌 <strong>Use case:</strong> Designing sequential circuits from state diagrams, flip-flop conversion, state minimization.
              </div>
            </div>
          </div>
          
          {/* Exam Tricks Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-6 mb-16 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              Exam Tricks & Shortcuts
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-amber-600 dark:text-amber-400">🔑 Memory Aid for SR</div>
                <p className="text-sm mt-1"><strong>S</strong>et needs <strong>S</strong>=1; <strong>R</strong>eset needs <strong>R</strong>=1. Don't care when holding.</p>
                <p className="text-sm mt-1">0→0: S=0,R=X; 0→1: S=1,R=0; 1→0: S=0,R=1; 1→1: S=X,R=0</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-amber-600 dark:text-amber-400">🔑 Memory Aid for JK</div>
                <p className="text-sm mt-1"><strong>J</strong> sets (0→1 needs J=1), <strong>K</strong> resets (1→0 needs K=1). Hold: J=0,K=0; Toggle: J=1,K=1</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="font-bold text-amber-600 dark:text-amber-400">🔑 Memory Aid for T</div>
                <p className="text-sm mt-1"><strong>T=1 when state changes</strong>, T=0 when state same. T = Q(t) ⊕ Q(t+1)</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm"><strong>Pro tip for <span className="font-bold text-amber-600">Ritaja in Kolkata</span>:</strong> When converting flip-flops, always start with the excitation table of the target flip-flop and characteristic equation of the source!</p>
          </div>
          
          {/* Tips & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>For design:</strong> Use excitation table (know where you want to go).</li>
                <li><strong>For analysis:</strong> Use characteristic table (know where you are).</li>
                <li>X (don't care) in excitation tables gives you freedom to minimize logic.</li>
                <li>When converting JK→D, remember D = J·Q' + K'·Q, then set J=D, K=D'.</li>
                <li>T flip-flop excitation is simplest: T = 1 when Q changes.</li>
                <li>In K-maps, don't cares (X) can be treated as 0 or 1 to form larger groups.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Confusing characteristic table with excitation table (most common mistake!).</li>
                <li>Forgetting the SR constraint S·R=0 in characteristic equation.</li>
                <li>Using characteristic table for design (wrong direction!).</li>
                <li>Ignoring don't cares (X) — they're opportunities for simplification!</li>
                <li>For JK excitation: 0→1 needs J=1 (K=X), not J=1,K=0.</li>
                <li>Mixing up J and K roles (J sets, K resets).</li>
              </ul>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="mb-16">
            <Teacher note="This topic is the bridge between theory and practice. In exams, you'll definitely get questions on flip-flop conversion. My advice: memorize the excitation tables — they're smaller and more useful for design. For SR: 'S for Set to 1, R for Reset to 0'. For JK: 'J for Jump to 1, K for Kill to 0'. For T: 'T for Toggle when changing'. Practice converting JK to D and D to T — these are the most common. And always remember: characteristic = forward, excitation = backward!" />
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
              <strong>Observe carefully:</strong> Compare the characteristic table and excitation table for D flip-flop. Why are they so similar?<br />
              <strong>Try changing:</strong> If you have a JK flip-flop and want to convert it to T, what happens to the K input when T=1?<br />
              <strong>Consider:</strong> How would you design a circuit that counts 0→1→2→3 using D flip-flops? What excitation table would you use?
            </p>
          </div>
          
          {/* Mini Checklist */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">✅ Mini Checklist</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Characteristic: Inputs + Q(t) → Q(t+1)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>Excitation: Q(t) + Q(t+1) → Inputs</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>X = Don't Care = Design flexibility</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>JK→D: J=D, K=D'</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>D→T: D = T ⊕ Q</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>JK→T: J=T, K=T</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic12;