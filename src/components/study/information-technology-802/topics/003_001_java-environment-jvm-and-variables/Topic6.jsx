import React, { useState } from 'react';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, 
  XCircle, HelpCircle, Sparkles, BookOpen, 
  ArrowRight, ShieldCheck, RefreshCw, Code, 
  Terminal, FileCode, Check, Bug, Search
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const CompilerTrapDetective = () => {
  const [activeTrapIdx, setActiveTrapIdx] = useState(0);
  const [revealedFixes, setRevealedFixes] = useState({});

  const traps = [
    {
      title: "Trap 1: Missing Float Literal Suffix",
      category: "Lossy Conversion",
      color: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      buggyCode: `float temperature = 98.4; // COMPILER ERROR!`,
      fixedCode: `float temperature = 98.4f; // Fixed with 'f' suffix\n// OR: double temperature = 98.4;`,
      errorMessage: `error: incompatible types: possible lossy conversion from double to float`,
      why: "In Java, all decimal literals (like 98.4) are 8-byte 'double' by default. Assigning an 8-byte double to a 4-byte float without an explicit 'f' suffix causes a lossy conversion compile error.",
      examTip: "Always look for floating numbers assigned to 'float' variables in CBSE exam papers — if there is no 'f' or 'F', it's an error!"
    },
    {
      title: "Trap 2: Character Literal in Double Quotes",
      category: "Type Mismatch",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      buggyCode: `char grade = "A"; // COMPILER ERROR!`,
      fixedCode: `char grade = 'A'; // Fixed with single quotes ''`,
      errorMessage: `error: incompatible types: java.lang.String cannot be converted to char`,
      why: "Double quotes (\"A\") create a String reference object, whereas char is a primitive type that strictly requires single quotes ('A').",
      examTip: "Single quotes ('A') = char (primitive 2 bytes); Double quotes (\"A\") = String (object reference)."
    },
    {
      title: "Trap 3: Uninitialized Local Variable",
      category: "Memory Safety",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      buggyCode: `public void calculateTotal() {\n    int bonus;\n    int total = 1000 + bonus; // COMPILER ERROR!\n    System.out.println(total);\n}`,
      fixedCode: `public void calculateTotal() {\n    int bonus = 0; // Explicitly initialized\n    int total = 1000 + bonus;\n    System.out.println(total);\n}`,
      errorMessage: `error: variable bonus might not have been initialized`,
      why: "Unlike class instance fields (which get default 0/null values), local variables declared inside methods MUST be explicitly initialized before they can be read.",
      examTip: "If a local variable inside a method is read before being assigned a value, javac will refuse to compile the program."
    },
    {
      title: "Trap 4: Using Reserved Keyword as Identifier",
      category: "Syntax Violation",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      buggyCode: `int class = 12; // COMPILER ERROR!\ndouble final = 85.0; // COMPILER ERROR!`,
      fixedCode: `int classGrade = 12; // Valid identifier\ndouble finalScore = 85.0; // Valid identifier`,
      errorMessage: `error: not a statement / <identifier> expected`,
      why: "'class' and 'final' are reserved Java keywords that have dedicated structural meanings in the language. They cannot be used as variable names.",
      examTip: "Look for keywords like: class, public, static, void, final, int, switch, default, new, null, true, false."
    },
    {
      title: "Trap 5: Byte Value Overflow (> 127)",
      category: "Range Overflow",
      color: "text-indigo-400",
      border: "border-indigo-500/40",
      bg: "bg-indigo-500/10",
      buggyCode: `byte studentRoll = 145; // COMPILER ERROR!`,
      fixedCode: `short studentRoll = 145; // Or: int studentRoll = 145;`,
      errorMessage: `error: incompatible types: possible lossy conversion from int to byte`,
      why: "The signed byte type can only store numbers from -128 to +127. 145 exceeds the 8-bit capacity and triggers a compile error.",
      examTip: "Byte range is -128 to 127. Any number >= 128 assigned to byte is an immediate compile error!"
    },
    {
      title: "Trap 6: Case Sensitivity Class Names",
      category: "Case Sensitivity",
      color: "text-teal-400",
      border: "border-teal-500/40",
      bg: "bg-teal-500/10",
      buggyCode: `string city = "Barrackpore"; // COMPILER ERROR!\nsystem.out.println(city); // COMPILER ERROR!`,
      fixedCode: `String city = "Barrackpore"; // Capital 'S'\nSystem.out.println(city); // Capital 'S'`,
      errorMessage: `error: cannot find symbol: class string / package system does not exist`,
      why: "Java is strictly case-sensitive. The standard Java API classes are 'String' and 'System' with capital 'S'. Lowercase 'string' and 'system' do not exist.",
      examTip: "Always check the capitalization of String, System, and Math in CBSE exam questions."
    },
    {
      title: "Trap 7: Illegal Hyphen in Identifier",
      category: "Operator Misinterpretation",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      buggyCode: `double total-marks = 450.0; // COMPILER ERROR!`,
      fixedCode: `double total_marks = 450.0; // Or: double totalMarks = 450.0;`,
      errorMessage: `error: not a statement / unexpected type`,
      why: "Hyphen '-' is parsed as the subtraction operator (total minus marks). Identifiers can only use underscore '_' or dollar '$'.",
      examTip: "Hyphens '-' are NEVER allowed in Java variable names. Use camelCase or underscores."
    },
    {
      title: "Trap 8: Multi-Character Char Literal",
      category: "Character Syntax",
      color: "text-pink-400",
      border: "border-pink-500/40",
      bg: "bg-pink-500/10",
      buggyCode: `char section = 'AB'; // COMPILER ERROR!`,
      fixedCode: `String section = "AB"; // Fixed using String\n// OR: char section = 'A';`,
      errorMessage: `error: unclosed character literal`,
      why: "A char literal in single quotes can only hold EXACTLY ONE character. Two or more characters require a String enclosed in double quotes.",
      examTip: "Single quotes with more than 1 character ('AB', '12') is an immediate syntax error."
    }
  ];

  const cur = traps[activeTrapIdx];
  const isFixed = !!revealedFixes[activeTrapIdx];

  const toggleFix = () => {
    setRevealedFixes(prev => ({
      ...prev,
      [activeTrapIdx]: !prev[activeTrapIdx]
    }));
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs tracking-wider uppercase">
            <Bug className="w-4 h-4" />
            <span>CBSE Compiler Bug Hunter & Trap Detective</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            8 Classic Java Variable Declaration Traps
          </h3>
        </div>
        <button
          onClick={toggleFix}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            isFixed
              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
              : "bg-gradient-to-r from-rose-500 to-amber-600 text-white shadow-lg shadow-rose-500/20"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isFixed ? "Show Buggy Code" : "Reveal Compiler Fix"}</span>
        </button>
      </div>

      {/* Trap Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {traps.map((trap, idx) => {
          const isActive = activeTrapIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveTrapIdx(idx)}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? `${trap.bg} ${trap.border} border-2 shadow-lg`
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isActive ? "bg-slate-950 text-white" : "bg-slate-900 text-slate-500"
              }`}>
                Trap {idx + 1}
              </span>
              <p className={`text-xs font-bold truncate max-w-full ${isActive ? trap.color : "text-slate-300"}`}>
                {trap.category}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Trap Detailed Breakdown */}
      <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{cur.category} Trap</span>
            <h4 className={`text-xl font-black ${cur.color}`}>{cur.title}</h4>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-300">
            CBSE Favorite Trap
          </span>
        </div>

        {/* Code Snippet Terminal */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-500 text-[11px]">
            <span>Code Inspection // {isFixed ? "Corrected Syntax" : "Buggy Snippet"}</span>
            <span className={isFixed ? "text-emerald-400" : "text-rose-400 font-bold"}>
              {isFixed ? "✅ PASSED COMPILATION" : "❌ COMPILE ERROR"}
            </span>
          </div>
          <pre className={`whitespace-pre-wrap leading-relaxed ${isFixed ? "text-emerald-300 font-bold" : "text-rose-300 font-bold"}`}>
            {isFixed ? cur.fixedCode : cur.buggyCode}
          </pre>
          {!isFixed && (
            <div className="p-2.5 rounded-lg bg-rose-950/70 border border-rose-900/60 text-[11px] text-rose-200">
              <span className="font-bold text-rose-400">Compiler Diagnostic: </span>
              {cur.errorMessage}
            </div>
          )}
        </div>

        {/* Diagnostic Reason */}
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block">
              Why javac Throws This Error:
            </span>
            <p className="text-slate-200 leading-relaxed">{cur.why}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1.5">
            <span className="text-amber-400 font-semibold uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CBSE Board Exam Golden Strategy:</span>
            </span>
            <p className="text-slate-300 leading-relaxed">{cur.examTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic6() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
          <Bug className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 6</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Common Compiler Traps in <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">Java Variable Declarations</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the art of identifying and debugging syntax traps in CBSE Class 12 IT (802) board questions: float suffixes, lossy conversions, char quote mismatches, uninitialized locals, and case-sensitivity errors.
        </p>
      </div>

      {/* Interactive Compiler Trap Detective */}
      <div className="max-w-6xl mx-auto">
        <CompilerTrapDetective />
      </div>

      {/* Checklist Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>1. Float Literal Rule</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Never write <code className="text-rose-300">float f = 3.14;</code>. Always append <code className="text-emerald-300">f</code>: <code className="text-emerald-300">float f = 3.14f;</code>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Code className="w-4 h-4" />
            <span>2. Char Quotes Rule</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Single quotes only: <code className="text-emerald-300">'A'</code>. Double quotes <code className="text-rose-300">"A"</code> produce String objects.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>3. Capital S in String / System</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <code className="text-emerald-300">String</code> and <code className="text-emerald-300">System</code> are classes and must always start with capital S.
          </p>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Compiler Traps & Debugging Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Compiler Traps & Code Debugging" 
          description="Test your debugging precision with 25 authentic CBSE Class 12 IT code-finding questions and detailed explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="In Section B and C of CBSE IT-802 papers, questions often present 2-line snippets and ask you to rewrite them after removing all syntax errors. Underline every correction you make (e.g. adding 'f' to float, changing double quotes to single quotes for char, or capitalizing String) to guarantee full marks!" 
        />
      </div>
    </div>
  );
}
