import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Code, Terminal, FileCode, Check, 
  Search, Info, Edit3
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const JAVA_KEYWORDS = new Set([
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
  "continue", "default", "do", "double", "else", "enum", "extends", "final", "finally", "float",
  "for", "goto", "if", "implements", "import", "instanceof", "int", "interface", "long", "native",
  "new", "package", "private", "protected", "public", "return", "short", "static", "strictfp", "super",
  "switch", "synchronized", "this", "throw", "throws", "transient", "try", "void", "volatile", "while",
  "true", "false", "null", "_"
]);

const IdentifierSyntaxValidator = () => {
  const [inputName, setInputName] = useState('studentRollNo');

  // Validate identifier against Java Language Specification
  const validateIdentifier = (name) => {
    const raw = name.trim();
    if (!raw) {
      return {
        valid: false,
        rules: [
          { label: "Cannot be empty", pass: false },
          { label: "Starts with letter, _, or $", pass: false },
          { label: "No illegal special characters (e.g. %, @, -, #)", pass: false },
          { label: "Not a reserved Java keyword", pass: false },
          { label: "No whitespace", pass: false }
        ],
        reason: "Please type an identifier name above."
      };
    }

    const hasWhitespace = /\s/.test(name);
    const startsWithDigit = /^[0-9]/.test(raw);
    const startsValid = /^[a-zA-Z_$]/.test(raw);
    const hasIllegalChars = /[^a-zA-Z0-9_$]/.test(raw);
    const isKeyword = JAVA_KEYWORDS.has(raw);

    const rules = [
      { label: "Starts with a letter (A-Z, a-z), underscore (_), or dollar ($)", pass: startsValid && !startsWithDigit },
      { label: "Contains ONLY letters, digits, underscores, or dollar signs", pass: !hasIllegalChars && !hasWhitespace },
      { label: "Does NOT start with a numeric digit (0-9)", pass: !startsWithDigit },
      { label: "Is NOT a reserved Java keyword (e.g., class, final, int, switch)", pass: !isKeyword },
      { label: "Does NOT contain whitespace (spaces or tabs)", pass: !hasWhitespace }
    ];

    const allPassed = rules.every(r => r.pass);

    let reason = "✅ Fully valid Java identifier conforming to JLS specifications.";
    if (hasWhitespace) reason = "❌ Invalid: Identifiers cannot contain spaces or tabs.";
    else if (startsWithDigit) reason = "❌ Invalid: Identifiers cannot start with a digit (0-9).";
    else if (isKeyword) reason = `❌ Invalid: '${raw}' is a reserved Java keyword and cannot be used as an identifier.`;
    else if (hasIllegalChars) reason = `❌ Invalid: Contains illegal characters. Only letters, digits, '_' and '$' are permitted.`;

    return { valid: allPassed, rules, reason };
  };

  const currentResult = validateIdentifier(inputName);

  const sampleScenarios = [
    { name: "char Section = 'D';", identifier: "Section", valid: true, note: "Valid identifier & valid single char literal" },
    { name: "int ab = 38;", identifier: "ab", valid: true, note: "Valid identifier and standard integer initialization" },
    { name: "double percentage = 87.6%;", identifier: "percentage", valid: false, note: "Invalid! '%' is the modulus operator, not a literal symbol" },
    { name: "int 1stRank = 1;", identifier: "1stRank", valid: false, note: "Invalid! Cannot start with a digit '1'" },
    { name: "double total-marks = 450.0;", identifier: "total-marks", valid: false, note: "Invalid! Hyphen '-' is interpreted as subtraction" },
    { name: "int $salary = 50000;", identifier: "$salary", valid: true, note: "Valid! Dollar sign '$' is permitted" },
    { name: "int class = 10;", identifier: "class", valid: false, note: "Invalid! 'class' is a reserved Java keyword" },
    { name: "int _count = 0;", identifier: "_count", valid: true, note: "Valid! Underscore '_' is permitted" }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider uppercase">
            <Edit3 className="w-4 h-4" />
            <span>Interactive Identifier Syntax Validator & Linter</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Java Variable Naming Rules & Syntax Inspector
          </h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
          currentResult.valid 
            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
            : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
        }`}>
          {currentResult.valid ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          <span>{currentResult.valid ? "VALID IDENTIFIER" : "SYNTAX ERROR"}</span>
        </div>
      </div>

      {/* Input Field */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <label className="text-xs font-semibold text-slate-300 block">
          Type or Test Any Identifier Name:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-sky-400"
            placeholder="e.g. studentRollNo, _total, 2ndAttempt"
          />
          <button
            onClick={() => setInputName("studentScore")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            Reset Default
          </button>
        </div>

        {/* Live Feedback Reason */}
        <div className={`p-3.5 rounded-xl text-xs font-mono flex items-start gap-2 ${
          currentResult.valid 
            ? "bg-emerald-950/60 border border-emerald-800/60 text-emerald-300" 
            : "bg-rose-950/60 border border-rose-800/60 text-rose-300"
        }`}>
          {currentResult.valid ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
          <span>{currentResult.reason}</span>
        </div>
      </div>

      {/* Rule Verification Checklist */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Java Language Specification (JLS) Rule Checklist:
        </h4>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {currentResult.rules.map((rule, idx) => (
            <div 
              key={idx} 
              className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                rule.pass 
                  ? "bg-emerald-950/30 border-emerald-900/40 text-slate-200" 
                  : "bg-rose-950/30 border-rose-900/40 text-rose-300"
              }`}
            >
              {rule.pass ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CBSE Scenario Test Bench */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Click to Test Common CBSE Class 12 IT Exam Declarations:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {sampleScenarios.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setInputName(item.identifier)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer space-y-1 ${
                inputName === item.identifier 
                  ? "bg-sky-500/20 border-sky-500/50 text-white" 
                  : "bg-slate-950 border-slate-800/80 hover:bg-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold truncate">{item.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold ${
                  item.valid ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                }`}>
                  {item.valid ? "VALID" : "INVALID"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">{item.note}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Topic3() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
          <Code className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Variable Declaration Rules & <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Valid / Invalid Identifiers</span> in Java
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the exact compiler rules governing variable names, reserved keywords, case sensitivity, and why declarations like <code className="text-amber-300 font-mono">char Section = 'D';</code> and <code className="text-amber-300 font-mono">int ab = 38;</code> are valid while <code className="text-rose-400 font-mono">double percentage = 87.6%;</code> triggers a compiler error.
        </p>
      </div>

      {/* Interactive Identifier Validator */}
      <div className="max-w-6xl mx-auto">
        <IdentifierSyntaxValidator />
      </div>

      {/* Rules Summary Matrix */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Character Set</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Letters (<code className="text-amber-300">A-Z, a-z</code>), digits (<code className="text-amber-300">0-9</code>), underscore (<code className="text-amber-300">_</code>), and dollar (<code className="text-amber-300">$</code>) only.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <XCircle className="w-4 h-4" />
            <span>2. Starting Character</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            MUST start with a letter, <code className="text-amber-300">_</code>, or <code className="text-amber-300">$</code>. Cannot start with a digit (<code className="text-rose-300 font-mono">1total</code> is illegal).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>3. No Keywords</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reserved words like <code className="text-rose-300">class</code>, <code className="text-rose-300">final</code>, <code className="text-rose-300">int</code>, <code className="text-rose-300">for</code> cannot be used as identifiers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>4. Case Sensitive</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Java treats <code className="text-purple-300">score</code>, <code className="text-purple-300">Score</code>, and <code className="text-purple-300">SCORE</code> as 3 distinct variables.
          </p>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Variable & Identifier Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Variable Declarations & Identifiers" 
          description="Test your understanding of valid identifier rules, illegal symbols, camelCase conventions, and CBSE board exam declaration traps." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="In CBSE board exams, whenever you see a variable declaration containing '%', '-', or '#', it is 100% INVALID! Semicolons are mandatory at the end of every declaration statement in Java." 
        />
      </div>
    </div>
  );
}
