import React, { useState } from 'react';
import { 
  Database, Calculator, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, ArrowRight, Sparkles, BookOpen, Code, Terminal, Film, Layers, Play
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

// Interactive Digit Visualizer & Live Validator
const DecimalDigitSlotVisualizer = () => {
  const [precision, setPrecision] = useState(3);
  const [scale, setScale] = useState(2);
  const [testInput, setTestInput] = useState('8.75');

  const intDigits = Math.max(0, precision - scale);
  const maxIntPart = intDigits > 0 ? '9'.repeat(intDigits) : '0';
  const maxDecPart = scale > 0 ? '9'.repeat(scale) : '';
  const maxVal = scale > 0 ? `${maxIntPart}.${maxDecPart}` : maxIntPart;

  // Test input validation logic
  const evaluateInput = (val, p, s) => {
    const num = parseFloat(val);
    if (isNaN(num)) return { status: 'invalid', msg: 'Please enter a valid number' };
    
    const parts = val.trim().split('.');
    const integerPart = parts[0].replace('-', '');
    const fractionalPart = parts[1] || '';

    const allowedIntDigits = p - s;
    if (integerPart.length > allowedIntDigits) {
      return { 
        status: 'error', 
        msg: `❌ Error 1264 (22003): Out of range value! Integer part has ${integerPart.length} digits, but DECIMAL(${p},${s}) allows only ${allowedIntDigits} digit(s) before the decimal point.` 
      };
    }

    if (fractionalPart.length > s) {
      const rounded = num.toFixed(s);
      return { 
        status: 'warning', 
        msg: `⚠️ Auto-Rounded: MySQL will round '${val}' to '${rounded}' because scale is ${s}.` 
      };
    }

    return { 
      status: 'success', 
      msg: `✅ Valid Entry: Stored exactly as '${num.toFixed(s)}' with zero precision loss.` 
    };
  };

  const validationResult = evaluateInput(testInput, precision, scale);

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Interactive DECIMAL(p, s) Visual Dissector</h4>
            <p className="text-xs text-slate-400">See how MySQL allocates physical digit slots before and after the decimal point</p>
          </div>
        </div>
        
        {/* Preset Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'IMDb Rating (3,2)', p: 3, s: 2, sample: '9.30' },
            { label: 'Percentage (4,2)', p: 4, s: 2, sample: '98.50' },
            { label: 'Tuition Fee (5,2)', p: 5, s: 2, sample: '850.00' },
            { label: 'Salary (8,2)', p: 8, s: 2, sample: '75000.00' }
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setPrecision(preset.p);
                setScale(preset.s);
                setTestInput(preset.sample);
              }}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                precision === preset.p && scale === preset.s
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-sky-300">
              Total Digits / Precision (p): <span className="text-white font-mono font-bold text-sm">{precision}</span>
            </label>
            <span className="text-[11px] text-slate-400">Total number of digits stored</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={precision}
            onChange={(e) => {
              const p = Number(e.target.value);
              setPrecision(p);
              if (scale > p) setScale(p);
            }}
            className="w-full accent-sky-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-emerald-300">
              Digits After Decimal / Scale (s): <span className="text-white font-mono font-bold text-sm">{scale}</span>
            </label>
            <span className="text-[11px] text-slate-400">Digits on right of decimal</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={precision} 
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Digit Slots Architecture */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center space-y-4">
        <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono font-bold text-amber-300">
          SQL TYPE: DECIMAL({precision}, {scale})
        </div>

        {/* Physical Slots Graphic */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {/* Integer Slots */}
          <div className="space-y-1">
            <div className="flex gap-1.5">
              {Array.from({ length: intDigits }).map((_, i) => (
                <div 
                  key={`int-${i}`} 
                  className="w-11 h-13 sm:w-13 sm:h-16 bg-sky-500/10 border-2 border-sky-400/80 rounded-xl flex flex-col items-center justify-center shadow-lg"
                >
                  <span className="text-base sm:text-xl font-mono font-black text-sky-300">9</span>
                  <span className="text-[9px] text-sky-400/70 font-sans">d{i + 1}</span>
                </div>
              ))}
              {intDigits === 0 && (
                <div className="w-11 h-13 sm:w-13 sm:h-16 bg-slate-800/40 border-2 border-slate-700 border-dashed rounded-xl flex items-center justify-center text-xs text-slate-500 font-mono">
                  0
                </div>
              )}
            </div>
            <span className="block text-[11px] font-bold text-sky-400">
              {intDigits} Digit{intDigits !== 1 ? 's' : ''} (p - s = {precision} - {scale})
            </span>
            <span className="block text-[10px] text-slate-400">Before Decimal Point</span>
          </div>

          {/* Decimal Point */}
          {scale > 0 && (
            <div className="px-1 flex flex-col items-center justify-center pt-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 leading-none">.</span>
              <span className="text-[9px] text-slate-500 uppercase tracking-wider mt-2">DOT</span>
            </div>
          )}

          {/* Scale / Fractional Slots */}
          {scale > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1.5">
                {Array.from({ length: scale }).map((_, i) => (
                  <div 
                    key={`dec-${i}`} 
                    className="w-11 h-13 sm:w-13 sm:h-16 bg-emerald-500/10 border-2 border-emerald-400/80 rounded-xl flex flex-col items-center justify-center shadow-lg"
                  >
                    <span className="text-base sm:text-xl font-mono font-black text-emerald-300">9</span>
                    <span className="text-[9px] text-emerald-400/70 font-sans">s{i + 1}</span>
                  </div>
                ))}
              </div>
              <span className="block text-[11px] font-bold text-emerald-400">
                {scale} Decimal Digit{scale !== 1 ? 's' : ''} (Scale s = {scale})
              </span>
              <span className="block text-[10px] text-slate-400">After Decimal Point</span>
            </div>
          )}
        </div>

        {/* Max Storable Value Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-3">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Maximum Positive Limit:</span>
            <span className="text-lg font-mono font-extrabold text-emerald-400">+{maxVal}</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Minimum Negative Limit:</span>
            <span className="text-lg font-mono font-extrabold text-rose-400">-{maxVal}</span>
          </div>
        </div>
      </div>

      {/* Live Value Insertion Tester */}
      <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
          <Play size={14} />
          <span>Interactive Value Tester: What Happens When You Insert Data?</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="e.g. 8.75, 9.99, 10.00, 8.456"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
            />
            <span className="absolute right-3 top-3.5 text-xs text-slate-500 font-mono">
              DECIMAL({precision},{scale})
            </span>
          </div>
          <div className="flex gap-2">
            {['8.75', '9.99', '10.00', '8.456'].map((sample) => (
              <button
                key={sample}
                onClick={() => setTestInput(sample)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-slate-300"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation Output Card */}
        <div className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition ${
          validationResult.status === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : validationResult.status === 'warning'
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {validationResult.msg}
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 2
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                CBSE Class XII High-Yield Numericals
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Deep Dive into DECIMAL(p, s): Precision vs Scale & Storable Limits
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand the exact arithmetic rules behind precision <code className="text-amber-300 font-mono">(p)</code>, scale <code className="text-emerald-300 font-mono">(s)</code>, maximum storable values, and why inserting <code className="text-rose-300 font-mono">10.00</code> into <code className="text-amber-300 font-mono">DECIMAL(3,2)</code> causes a fatal Out of Range Error.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. The Precision & Scale Rule', icon: BookOpen },
            { id: 'visualizer', label: '2. Interactive Visualizer', icon: Calculator },
            { id: 'imdb', label: '3. The IMDb Rating Case Study', icon: Film },
            { id: 'table', label: '4. CBSE Board Reference Table', icon: Layers },
            { id: 'code', label: '5. SQL Code Laboratory', icon: Code },
            { id: 'pitfalls', label: '6. Board Exam Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '7. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '8. Printable Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 border-b-2 border-amber-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: THE CONCEPT */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            
            {/* Core Definition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: What is Precision and Scale */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-amber-400">
                  <Calculator size={22} />
                  <h3 className="text-lg font-bold text-white">What is DECIMAL(p, s)?</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In MySQL, <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">DECIMAL(p, s)</code> (also called <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">NUMERIC(p, s)</code>) is used to store <strong>exact fractional numbers</strong> with zero rounding error.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-3.5 bg-sky-500/10 border border-sky-500/20 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">p</span>
                      Precision (Total Digits)
                    </div>
                    <p className="text-xs text-slate-300">
                      The <strong>total number of significant digits</strong> allowed in the entire number (both before and after the decimal point combined).
                    </p>
                  </div>

                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">s</span>
                      Scale (Fractional Digits)
                    </div>
                    <p className="text-xs text-slate-300">
                      The number of digits placed <strong>strictly after the decimal point</strong> (to the right of the dot).
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: The Golden Formula */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-sky-400">
                  <Sparkles size={22} />
                  <h3 className="text-lg font-bold text-white">The Golden Formula for Board Exams</h3>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 text-center space-y-2">
                  <span className="text-xs text-slate-400 block uppercase tracking-wider">Integer Digits Before The Decimal:</span>
                  <div className="text-2xl sm:text-3xl font-mono font-black text-sky-300">
                    Digits Before Dot = (p - s)
                  </div>
                  <p className="text-xs text-slate-400">
                    Subtract Scale from Precision to find how many whole integer digits are allowed!
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Precision range:</strong> 1 to 65 total digits.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Scale range:</strong> 0 to 30 (Scale can never be larger than Precision).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>If scale = 0:</strong> <code className="text-amber-300 font-mono">DECIMAL(5,0)</code> behaves like an exact integer up to 99999.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Step-by-Step Breakdown Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-sky-950/40 border border-sky-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator size={18} className="text-sky-400" />
                <span>Step-by-Step Analysis: How to Calculate DECIMAL(3, 2)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">1. Given Type:</span>
                  <span className="text-sm font-mono font-bold text-amber-300">DECIMAL(3, 2)</span>
                  <p className="text-[11px] text-slate-500">p = 3, s = 2</p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">2. Digits Before Dot:</span>
                  <span className="text-sm font-mono font-bold text-sky-300">p - s = 3 - 2 = 1</span>
                  <p className="text-[11px] text-slate-500">Only 1 whole digit allowed</p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">3. Digits After Dot:</span>
                  <span className="text-sm font-mono font-bold text-emerald-300">s = 2 digits</span>
                  <p className="text-[11px] text-slate-500">2 decimal places</p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">4. Maximum Value:</span>
                  <span className="text-sm font-mono font-bold text-amber-400">+9.99 / -9.99</span>
                  <p className="text-[11px] text-slate-500">1 digit (9) . 2 digits (99)</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: VISUALIZER */}
        {activeTab === 'visualizer' && (
          <DecimalDigitSlotVisualizer />
        )}

        {/* TAB 3: THE IMDB CASE STUDY */}
        {activeTab === 'imdb' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 text-amber-400">
                <Film size={24} />
                <div>
                  <h3 className="text-lg font-bold text-white">The Famous IMDb Rating Question (CBSE Favorite!)</h3>
                  <p className="text-xs text-slate-400">Why does storing rating 10.00 crash when column is DECIMAL(3,2)?</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
                <span className="text-slate-500">-- Suppose you create a movie database table:</span><br />
                <span className="text-sky-400">CREATE TABLE</span> MovieReview (<br />
                &nbsp;&nbsp;MovieID <span className="text-emerald-400">INT PRIMARY KEY</span>,<br />
                &nbsp;&nbsp;MovieName <span className="text-emerald-400">VARCHAR(60)</span>,<br />
                &nbsp;&nbsp;imdb_rating <span className="text-amber-400 font-bold">DECIMAL(3, 2)</span><br />
                );
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                
                {/* What Works */}
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Values That Succeed in DECIMAL(3, 2)</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 text-xs">
                    <li><strong className="text-emerald-300 font-mono">8.80</strong> (Inception) &rarr; 1 digit before, 2 after &rarr; <span className="text-emerald-400">Valid</span></li>
                    <li><strong className="text-emerald-300 font-mono">9.30</strong> (Shawshank Redemption) &rarr; 1 digit before, 2 after &rarr; <span className="text-emerald-400">Valid</span></li>
                    <li><strong className="text-emerald-300 font-mono">9.99</strong> (Highest Limit) &rarr; 1 digit before, 2 after &rarr; <span className="text-emerald-400">Valid</span></li>
                    <li><strong className="text-emerald-300 font-mono">8.456</strong> (3 Idiots) &rarr; Auto-rounded to <code className="text-amber-300 font-mono">8.46</code></li>
                  </ul>
                </div>

                {/* What Fails */}
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-rose-400 flex items-center gap-2">
                    <XCircle size={16} />
                    <span>The Fatal Mistake: Inserting 10.00</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    If a movie receives a perfect score of <code className="text-rose-300 font-mono">10.00</code>, MySQL throws:
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded-lg text-rose-300 font-mono text-[11px] border border-rose-500/30">
                    ERROR 1264 (22003): Out of range value for column 'imdb_rating'
                  </div>
                  <p className="text-xs text-slate-400">
                    <strong>Why?</strong> Because <code className="text-rose-300 font-mono">10.00</code> has <strong>2 digits before the decimal</strong> (<code className="text-white font-mono">'10'</code>), but <code className="text-amber-300 font-mono">DECIMAL(3,2)</code> allows only <code className="text-sky-300 font-mono">3 - 2 = 1</code> digit before the decimal!
                  </p>
                </div>

              </div>

              {/* How to Fix It */}
              <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl space-y-2">
                <h4 className="font-bold text-sky-400 text-xs sm:text-sm">
                  💡 How to fix the schema so ratings up to 10.00 are allowed?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-amber-300 font-mono block mb-1">Option A: DECIMAL(4, 2)</span>
                    <p className="text-slate-400">Allows 4 - 2 = 2 digits before dot (Max: 99.99). Supports 10.00 perfectly!</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-emerald-300 font-mono block mb-1">Option B: DECIMAL(3, 1)</span>
                    <p className="text-slate-400">Allows 3 - 1 = 2 digits before dot, 1 after (Max: 99.9). Supports 10.0!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CBSE REFERENCE TABLE */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">CBSE Class XII IT (802) Standard Data Type Capacity Chart</h3>
              <p className="text-xs text-slate-400">Memorize these common standard definitions for quick numerical solving in Section A and Section B:</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-sky-300 font-mono">
                      <th className="p-3">Data Type</th>
                      <th className="p-3">Real-World Use Case</th>
                      <th className="p-3">Precision (p)</th>
                      <th className="p-3">Scale (s)</th>
                      <th className="p-3">Digits Before Dot (p - s)</th>
                      <th className="p-3 text-emerald-400">Maximum Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 text-amber-300 font-bold">DECIMAL(3, 2)</td>
                      <td className="p-3 text-slate-400 font-sans">IMDb Movie Rating (e.g. 8.75)</td>
                      <td className="p-3">3</td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-sky-400">1 digit</td>
                      <td className="p-3 text-emerald-400 font-bold">+9.99</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 text-amber-300 font-bold">DECIMAL(4, 2)</td>
                      <td className="p-3 text-slate-400 font-sans">Class 12 Percentage (e.g. 98.75%)</td>
                      <td className="p-3">4</td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-sky-400">2 digits</td>
                      <td className="p-3 text-emerald-400 font-bold">+99.99</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 text-amber-300 font-bold">DECIMAL(5, 2)</td>
                      <td className="p-3 text-slate-400 font-sans">Bus Fare / Bill Amount (e.g. ₹450.50)</td>
                      <td className="p-3">5</td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-sky-400">3 digits</td>
                      <td className="p-3 text-emerald-400 font-bold">+999.99</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 text-amber-300 font-bold">DECIMAL(8, 2)</td>
                      <td className="p-3 text-slate-400 font-sans">Monthly Teacher Salary (e.g. ₹75,000.00)</td>
                      <td className="p-3">8</td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-sky-400">6 digits</td>
                      <td className="p-3 text-emerald-400 font-bold">+999,999.99</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 text-amber-300 font-bold">DECIMAL(10, 2)</td>
                      <td className="p-3 text-slate-400 font-sans">School Annual Budget (e.g. ₹50,00,000.00)</td>
                      <td className="p-3">10</td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-sky-400">8 digits</td>
                      <td className="p-3 text-emerald-400 font-bold">+99,999,999.99</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 text-amber-300 font-bold">DECIMAL(5, 0)</td>
                      <td className="p-3 text-slate-400 font-sans">Exact Item Stock Quantity</td>
                      <td className="p-3">5</td>
                      <td className="p-3">0</td>
                      <td className="p-3 text-sky-400">5 digits</td>
                      <td className="p-3 text-emerald-400 font-bold">+99,999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CODE LAB */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>MySQL DECIMAL Workbench Testing Script</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0 / InnoDB</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{`-- 1. Create Movie Table with DECIMAL(3, 2)
CREATE TABLE MovieReviews (
    MovieID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(80) NOT NULL,
    ReleaseYear INT,
    IMDb_Rating DECIMAL(3, 2), -- Max 9.99
    BoxOfficeCrores DECIMAL(10, 2) -- Max 99999999.99
);

-- 2. Valid Inserts
INSERT INTO MovieReviews (Title, ReleaseYear, IMDb_Rating, BoxOfficeCrores) VALUES
('3 Idiots', 2009, 8.40, 460.00),
('Interstellar', 2014, 8.70, 701.72),
('Masterpiece Max', 2026, 9.99, 1250.80);

-- 3. Inserting 8.456 automatically rounds up to 8.46
INSERT INTO MovieReviews (Title, ReleaseYear, IMDb_Rating, BoxOfficeCrores)
VALUES ('Dangal', 2016, 8.456, 2024.00);

-- 4. Inserting 10.00 causes Out of range value Error!
-- INSERT INTO MovieReviews (Title, ReleaseYear, IMDb_Rating, BoxOfficeCrores)
-- VALUES ('The Perfect Movie', 2026, 10.00, 500.00); 
-- ERROR 1264 (22003): Out of range value for column 'IMDb_Rating'

SELECT Title, IMDb_Rating, BoxOfficeCrores FROM MovieReviews;`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 6: PITFALLS & TIPS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 space-y-1">
                  <h4 className="font-bold">1. Confusing Precision (p) with Digits Before the Decimal</h4>
                  <p className="text-slate-300">
                    In <code className="text-amber-300 font-mono">DECIMAL(5, 2)</code>, students often mistakenly think 5 is the digits before the decimal. <strong>NO!</strong> 5 is the <strong>TOTAL</strong> digits. The digits before decimal = <code className="text-sky-300 font-mono">5 - 2 = 3</code> digits (Max: 999.99).
                  </p>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 space-y-1">
                  <h4 className="font-bold">2. What happens to Extra Decimal Digits vs Extra Integer Digits?</h4>
                  <p className="text-slate-300">
                    - Extra <strong>Decimal</strong> digits (e.g. inserting 8.756 into scale 2) are <strong>auto-rounded</strong> to 8.76.<br />
                    - Extra <strong>Integer</strong> digits (e.g. inserting 12.5 into DECIMAL(3,2)) trigger a fatal <strong>Out of Range Error</strong>!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 2 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 8: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – DECIMAL(p,s) Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic2_decimal_precision_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Remember: In CBSE IT 802 exams, whenever you see DECIMAL(p,s), immediately calculate: Digits Before Dot = (p - s) and Digits After Dot = s. For DECIMAL(3,2), it's 1 before and 2 after -> Max = 9.99! — Sukanta Hui" />

      </div>
    </div>
  );
}