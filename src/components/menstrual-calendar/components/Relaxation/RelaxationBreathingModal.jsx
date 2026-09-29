import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Heart, Sparkles, Wind } from 'lucide-react';

export default function RelaxationBreathingModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(false);
  const [technique, setTechnique] = useState('478'); // '478' (Calm/Sleep/Cramps) or 'box' (Box Breathing)
  const [step, setStep] = useState('Inhale'); // 'Inhale', 'Hold', 'Exhale'
  const [count, setCount] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer = null;

    if (isActive) {
      timer = setInterval(() => {
        setCount((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Transition to next breathing stage
          if (technique === '478') {
            if (step === 'Inhale') {
              setStep('Hold');
              return 7;
            } else if (step === 'Hold') {
              setStep('Exhale');
              return 8;
            } else {
              setStep('Inhale');
              setCycleCount((c) => c + 1);
              return 4;
            }
          } else {
            // Box Breathing 4-4-4-4
            if (step === 'Inhale') {
              setStep('Hold');
              return 4;
            } else if (step === 'Hold') {
              setStep('Exhale');
              return 4;
            } else if (step === 'Exhale') {
              setStep('Hold (Rest)');
              return 4;
            } else {
              setStep('Inhale');
              setCycleCount((c) => c + 1);
              return 4;
            }
          }
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, step, technique]);

  if (!isOpen) return null;

  const handleReset = () => {
    setIsActive(false);
    setStep('Inhale');
    setCount(technique === '478' ? 4 : 4);
    setCycleCount(0);
  };

  const getScaleClass = () => {
    if (!isActive) return 'scale-100';
    if (step === 'Inhale') return 'scale-125 duration-[4000ms]';
    if (step === 'Hold') return 'scale-125 duration-[7000ms]';
    if (step === 'Exhale') return 'scale-90 duration-[8000ms]';
    return 'scale-90';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
      <div
        className="bg-gradient-to-b from-slate-900 via-[#0e1628] to-[#1a1024] border border-slate-800 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative text-slate-200 flex flex-col items-center text-center space-y-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Close breathing modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
            <Wind className="w-3.5 h-3.5" /> Mindful Calm &amp; Cramp Relief
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Soothing Breathing Session
          </h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Deep rhythmic breathing stimulates the vagus nerve, calming uterine muscle tension and reducing cycle stress.
          </p>
        </div>

        {/* Technique Switcher */}
        <div className="flex p-1 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => { setTechnique('478'); handleReset(); }}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              technique === '478'
                ? 'bg-gradient-to-r from-rose-500/30 to-purple-500/30 text-rose-200 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4-7-8 Relax &amp; Sleep
          </button>
          <button
            onClick={() => { setTechnique('box'); handleReset(); }}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              technique === 'box'
                ? 'bg-gradient-to-r from-sky-500/30 to-indigo-500/30 text-sky-200 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4-4-4-4 Box Reset
          </button>
        </div>

        {/* Animated Breathing Orb */}
        <div className="relative w-64 h-64 flex items-center justify-center my-2">
          {/* Outer Glow Ring */}
          <div
            className={`absolute inset-4 rounded-full bg-gradient-to-tr from-rose-500/20 via-purple-500/20 to-sky-500/20 blur-xl transition-transform ease-in-out ${getScaleClass()}`}
          ></div>

          {/* Main Breathing Circle */}
          <div
            className={`w-48 h-48 rounded-full border-2 border-white/20 bg-gradient-to-tr from-rose-500/30 via-purple-600/30 to-indigo-600/30 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl transition-all ease-in-out ${getScaleClass()}`}
          >
            <span className="text-xs uppercase tracking-widest font-bold text-rose-300">
              {isActive ? step : 'Ready'}
            </span>
            <span className="text-4xl font-black font-mono text-white mt-1">
              {isActive ? count : '4s'}
            </span>
            <span className="text-[10px] text-slate-300 mt-1">
              {isActive ? `Cycle #${cycleCount + 1}` : 'Click Start below'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsActive((a) => !a)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-rose-500/25 transition-all cursor-pointer"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : 'Start Session'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Comforting affirmation */}
        <p className="text-[11px] text-slate-400 italic">
          "Breathe in calm and nourishment; breathe out tension and fatigue."
        </p>
      </div>
    </div>
  );
}
