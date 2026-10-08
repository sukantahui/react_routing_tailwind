import React, { useState } from 'react';
import { 
  FileCode, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Check, XCircle, ShieldAlert, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const DataTypeMatrixStudio = () => {
  const [selectedTypeKey, setSelectedTypeKey] = useState('double');

  const typesData = {
    int: {
      name: "int / Integer",
      category: "Primitive / Wrapper",
      status: "ALLOWED",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/40",
      code: `int day = 3;
switch (day) {
    case 1: System.out.println("Mon"); break;
    case 3: System.out.println("Wed"); break;
}`,
      diagnostic: "COMPILES CLEANLY (Native 32-bit tableswitch bytecode in JVM)",
      reason: "Native 32-bit signed integer. The JVM can map cases directly to jump table offsets in constant O(1) time."
    },
    char: {
      name: "char / Character",
      category: "Primitive / Wrapper",
      status: "ALLOWED",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/40",
      code: `char grade = 'A';
switch (grade) {
    case 'A': System.out.println("Excellent"); break;
    case 65:  // Valid! Unicode 65 == 'A'
}`,
      diagnostic: "COMPILES CLEANLY (Unsigned 16-bit Unicode integer promoted to int)",
      reason: "Characters are represented internally as 16-bit unsigned integers (0 to 65,535), which are fully compatible with integer tables."
    },
    string: {
      name: "String",
      category: "Reference Object (Java 7+)",
      status: "ALLOWED",
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/40",
      code: `String role = "ADMIN";
switch (role) {
    case "ADMIN": grantAllAccess(); break;
    case "USER":  grantUserAccess(); break;
}`,
      diagnostic: "COMPILES CLEANLY (Dual-stage: hashCode() integer switch + equals() verification)",
      reason: "Introduced in Java 7. The compiler switches on role.hashCode() first, then verifies with role.equals(\"ADMIN\") to protect against hash collisions."
    },
    byteShort: {
      name: "byte / short",
      category: "Primitive Integers",
      status: "ALLOWED",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/40",
      code: `byte b = 10;
switch (b) {
    case 10: System.out.println("Ten"); break;
    case 127: System.out.println("Max"); break;
}`,
      diagnostic: "COMPILES CLEANLY (Automatically widened to 32-bit int in bytecode)",
      reason: "8-bit byte and 16-bit short integers widen implicitly to 32-bit int operands without loss of precision."
    },
    double: {
      name: "double / Double",
      category: "Floating-Point (64-bit)",
      status: "FORBIDDEN",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/40",
      code: `double price = 99.5;
switch (price) { // COMPILE ERROR!
    case 99.5: System.out.println("Match"); break;
}`,
      diagnostic: "error: selector type not allowed (incompatible types: possible lossy conversion from double to int)",
      reason: "IEEE 754 floating-point binary representation suffers from rounding imprecision (e.g. 0.1 + 0.2 != 0.3). Exact binary equality (==) cannot be guaranteed reliably!"
    },
    float: {
      name: "float / Float",
      category: "Floating-Point (32-bit)",
      status: "FORBIDDEN",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/40",
      code: `float rating = 4.5f;
switch (rating) { // COMPILE ERROR!
    case 4.5f: System.out.println("Top"); break;
}`,
      diagnostic: "error: selector type not allowed (incompatible types: possible lossy conversion from float to int)",
      reason: "Like double, single-precision IEEE 754 floats have binary representation gaps where fractional decimals cannot be compared with exact binary equality."
    },
    boolean: {
      name: "boolean / Boolean",
      category: "Logical Primitive",
      status: "FORBIDDEN",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/40",
      code: `boolean isMember = true;
switch (isMember) { // COMPILE ERROR!
    case true:  System.out.println("VIP"); break;
}`,
      diagnostic: "error: selector type not allowed (boolean is not permitted in switch)",
      reason: "A boolean only has 2 possible states (true / false). An if-else construct is significantly simpler and more idiomatic than a verbose switch block."
    },
    long: {
      name: "long / Long",
      category: "64-bit Big Integer",
      status: "FORBIDDEN",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/40",
      code: `long accountId = 10000000000L;
switch (accountId) { // COMPILE ERROR!
    case 10000000000L: break;
}`,
      diagnostic: "error: selector type not allowed (incompatible types: possible lossy conversion from long to int)",
      reason: "The underlying JVM bytecode instructions (tableswitch & lookupswitch) operate strictly on 32-bit integer indexes. A 64-bit long cannot fit into the 32-bit jump table."
    }
  };

  const currentType = typesData[selectedTypeKey];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Cpu className="w-3.5 h-3.5" /> Compiler Diagnostic Lab
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Permissible vs Forbidden Switch Data Types in Java
          </h2>
        </div>
        
        <div className="text-xs text-slate-400">
          Click any data type below to inspect compatibility and compiler error diagnostics
        </div>
      </div>

      {/* Type Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8 font-mono text-xs">
        {Object.entries(typesData).map(([key, item]) => {
          const isSelected = selectedTypeKey === key;
          const isAllowed = item.status === "ALLOWED";
          return (
            <button
              key={key}
              onClick={() => setSelectedTypeKey(key)}
              className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                isSelected 
                  ? `${item.bg} ${item.border} border-2 shadow-lg shadow-black/40` 
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <span className="font-bold text-slate-200">{item.name.split(" ")[0]}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-sans ${
                isAllowed 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {isAllowed ? '✓ ALLOWED' : '✗ ILLEGAL'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Diagnostic Detail Card */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-mono">{currentType.name}</h3>
              <span className="text-xs text-slate-400 font-sans">({currentType.category})</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Compatibility Status: <strong className={currentType.color}>{currentType.status}</strong>
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 border ${
            currentType.status === "ALLOWED" 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            {currentType.status === "ALLOWED" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            <span>{currentType.status === "ALLOWED" ? "Compiles Successfully" : "Compilation Error"}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sample Code Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Java Syntax Sample:
            </span>
            <pre className={`p-4 rounded-xl border font-mono text-xs leading-relaxed overflow-x-auto ${
              currentType.status === "ALLOWED" 
                ? 'bg-slate-900 border-slate-800 text-slate-200' 
                : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
            }`}>
              {currentType.code}
            </pre>
          </div>

          {/* Diagnostic & Architectural Reason */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
                javac Diagnostic Compiler Output:
              </span>
              <div className={`p-3 rounded-xl border font-mono text-xs ${
                currentType.status === "ALLOWED"
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                {currentType.diagnostic}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-amber-400 font-bold block mb-1">
                Underlying Architectural Rationale:
              </strong>
              <p className="text-slate-400 leading-relaxed">
                {currentType.reason}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic6() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <FileCode className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Permissible Switch Data Types in Java
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master the exact data types supported by Java's <code className="text-emerald-400 font-mono">switch</code> statement (<code className="text-emerald-400 font-mono">int</code>, <code className="text-emerald-400 font-mono">char</code>, <code className="text-emerald-400 font-mono">short</code>, <code className="text-emerald-400 font-mono">byte</code>, <code className="text-sky-400 font-mono">String</code>, <code className="text-purple-400 font-mono">enum</code>), and understand why <code className="text-rose-400 font-mono">float</code>, <code className="text-rose-400 font-mono">double</code>, <code className="text-rose-400 font-mono">boolean</code>, and <code className="text-rose-400 font-mono">long</code> cause compile-time errors.
        </p>
      </div>

      {/* Interactive Type Matrix Studio */}
      <div className="max-w-6xl mx-auto">
        <DataTypeMatrixStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Permissible Switch Data Types Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Switch Data Types" 
          description="Master 25 exam-style questions on allowable vs illegal switch types, floating-point precision hazards, 32-bit bytecode limits, String hashing mechanics, and enum syntax with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="CBSE Board Examiner Favorite 1-Mark MCQ: 'Which of the following data types cannot be used in a switch statement in Java?' Options will include int, char, byte, and double (or float, or boolean). Remember: floating-point numbers are strictly forbidden because IEEE 754 precision issues make exact binary equality (==) comparisons unreliable! Memorize the 4 forbidden types: float, double, boolean, and long." 
        />
      </div>
    </div>
  );
}
