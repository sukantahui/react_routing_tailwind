import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";

// ─── Topic 10 Data & Code Imports ──────────────────────────────────────
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

import tenSimpleExamplesCode from "./topic10_files/ten_simple_write_examples.py?raw";
import example1WriteBasics from "./topic10_files/example1_write_basics.py?raw";
import example2WritelinesLists from "./topic10_files/example2_writelines_lists.py?raw";
import example3AppendingLogs from "./topic10_files/example3_appending_logs.py?raw";
import example4CsvManualWriter from "./topic10_files/example4_csv_manual_writer.py?raw";
import example5BufferingAndFlush from "./topic10_files/example5_buffering_and_flush.py?raw";
import example6SafeAtomicWrite from "./topic10_files/example6_safe_atomic_write.py?raw";

/**
 * Topic10 – Writing Files: write(), writelines(), appending data
 * Module: 002_008_file-handling (File Handling & Persistence (Text, CSV & JSON))
 * Track: Python from Basic to Pro
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with 10 Simple Write File Examples,
 *                        Advanced 4-Lab Workbench, Semantic SVGs, 6 Deep Code Modules, FAQs, and Notes.
 */
const Topic10 = () => {
  // ─── 10 Simple Examples State ─────────────────────────────────────────
  const [selectedSimpleEx, setSelectedSimpleEx] = useState(1);
  const [copiedSimpleEx, setCopiedSimpleEx] = useState(false);

  // ─── Workbench State ──────────────────────────────────────────────────
  const [workbenchTab, setWorkbenchTab] = useState("write"); // "write" | "writelines" | "modes" | "buffer"
  
  // Tab 1: write() simulator state
  const [writeStudent, setWriteStudent] = useState("Mamata");
  const [writeIncludeNewline, setWriteIncludeNewline] = useState(true);
  const [writeSimulateTypeError, setWriteSimulateTypeError] = useState(false);
  const [writeOutputLines, setWriteOutputLines] = useState([
    "=== CODER & ACCOTAX - BARRACKPORE HUB ===",
    "Student Admissions & Fees Ledger 2026"
  ]);
  const [writeLastReturnVal, setWriteLastReturnVal] = useState(null);
  const [writeLastError, setWriteLastError] = useState(null);

  // Tab 2: writelines() simulator state
  const [writelinesStudents, setWritelinesStudents] = useState(["Mamata", "Debangshu", "Susmita"]);
  const [writelinesIncludeNewline, setWritelinesIncludeNewline] = useState(false);
  const [writelinesUseGenerator, setWritelinesUseGenerator] = useState(false);
  const [writelinesFileContent, setWritelinesFileContent] = useState("");
  const [writelinesExecuted, setWritelinesExecuted] = useState(false);

  // Tab 3: Modes Battle state ('w' vs 'a' vs 'x')
  const [modesActiveMode, setModesActiveMode] = useState("a");
  const [modesFileExists, setModesFileExists] = useState(true);
  const [modesDiskFileContent, setModesDiskFileContent] = useState(
    "[2026-10-02 09:00:00] [AUDIT] System started at Barrackpore\n[2026-10-02 09:15:20] [PAYMENT] Mamata: ₹4,500\n[2026-10-02 09:30:10] [PAYMENT] Debangshu: ₹5,200\n"
  );
  const [modesLogMessages, setModesLogMessages] = useState([]);
  const [modesErrorAlert, setModesErrorAlert] = useState(null);

  // Tab 4: Memory Buffer & flush() simulator state
  const [bufferItems, setBufferItems] = useState([]);
  const [diskPersistedItems, setDiskPersistedItems] = useState([
    "Initial server boot log record (Persisted on disk)"
  ]);
  const [bufferCapacity] = useState(4);
  const [bufferCrashed, setBufferCrashed] = useState(false);

  // Deep showcase tab
  const [activeCodeTab, setActiveCodeTab] = useState("ex1");

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Student directory
  const studentDirectory = {
    Mamata: { center: "Barrackpore", course: "Python Masterclass", fee: 4500, score: 96 },
    Debangshu: { center: "Jadavpur", course: "Data Analytics", fee: 5200, score: 94 },
    Susmita: { center: "Kolkata", course: "Full Stack Python", fee: 6000, score: 98 },
    Mahima: { center: "Ichapur", course: "Python & ML", fee: 5500, score: 95 },
    Abhronila: { center: "Barrackpore", course: "Django Services", fee: 5800, score: 92 }
  };

  // 10 Simple Examples Data
  const simpleExamplesList = [
    {
      num: 1,
      title: "Write a Single Line of Text",
      badge: "Basic Write",
      desc: "Opening a file in write mode ('w') and writing a single line of greeting text with UTF-8 encoding.",
      code: `# Example 1: Write a single line of text
with open("hello.txt", "w", encoding="utf-8") as f:
    f.write("Hello World! Welcome to Coder & AccoTax Barrackpore.\\n")

print("File 'hello.txt' created successfully with 1 line.")`,
      output: `Hello World! Welcome to Coder & AccoTax Barrackpore.`,
      keyTakeaway: "The 'w' mode creates 'hello.txt' if missing, or wipes it to 0 bytes if it already exists."
    },
    {
      num: 2,
      title: "Write Multiple Lines with '\\n'",
      badge: "Multiple Lines",
      desc: "Calling f.write() multiple times to write separate lines on disk with explicit newline breaks.",
      code: `# Example 2: Write multiple consecutive lines
with open("students.txt", "w", encoding="utf-8") as f:
    f.write("Student 1: Mamata (Barrackpore)\\n")
    f.write("Student 2: Debangshu (Jadavpur)\\n")
    f.write("Student 3: Susmita (Kolkata)\\n")

print("Wrote 3 student records to 'students.txt'.")`,
      output: `Student 1: Mamata (Barrackpore)
Student 2: Debangshu (Jadavpur)
Student 3: Susmita (Kolkata)`,
      keyTakeaway: "Unlike print(), f.write() does NOT add newlines automatically. You must add '\\n' explicitly."
    },
    {
      num: 3,
      title: "Writing Numbers using f-Strings",
      badge: "Type Conversion",
      desc: "Converting numeric integers and floats into strings before writing to prevent TypeError exceptions.",
      code: `# Example 3: Write numbers & formatted variables
student_name = "Mahima"
roll_no = 104
fee_paid = 5500
score = 95.5

with open("receipt.txt", "w", encoding="utf-8") as f:
    # Notice: f.write(fee_paid) raises TypeError! Must format inside string:
    f.write(f"Roll No: {roll_no}\\n")
    f.write(f"Student: {student_name}\\n")
    f.write(f"Fee Paid: ₹{fee_paid:,}\\n")
    f.write(f"Score: {score}%\\n")`,
      output: `Roll No: 104
Student: Mahima
Fee Paid: ₹5,500
Score: 95.5%`,
      keyTakeaway: "f.write(str) strictly expects string objects. Always wrap numeric data inside f-strings or str()."
    },
    {
      num: 4,
      title: "Append Mode ('a') — Adding Records",
      badge: "Append Safe",
      desc: "Adding new records to the end of an existing file without deleting or wiping earlier entries.",
      code: `# Example 4: Append new attendance entry without overwriting
with open("attendance.txt", "a", encoding="utf-8") as f:
    f.write("[09:05 AM] Debangshu: Present (Jadavpur)\\n")
    f.write("[09:10 AM] Susmita: Present (Kolkata)\\n")

print("Appended 2 attendance records safely.")`,
      output: `[Existing records from earlier remain safe]
[09:05 AM] Debangshu: Present (Jadavpur)
[09:10 AM] Susmita: Present (Kolkata)`,
      keyTakeaway: "Mode 'a' moves the write pointer to EOF (End of File). Historical logs stay completely safe."
    },
    {
      num: 5,
      title: "Write a List of Strings with writelines()",
      badge: "Batch Writing",
      desc: "Writing an entire list of pre-formatted strings into a file in a single convenient call.",
      code: `# Example 5: Write a list of strings with writelines()
batch_roster = [
    "1. Mamata - Python Masterclass\\n",
    "2. Debangshu - Data Science\\n",
    "3. Susmita - Web Development\\n",
    "4. Abhronila - Machine Learning\\n"
]

with open("batch_roster.txt", "w", encoding="utf-8") as f:
    f.writelines(batch_roster)`,
      output: `1. Mamata - Python Masterclass
2. Debangshu - Data Science
3. Susmita - Web Development
4. Abhronila - Machine Learning`,
      keyTakeaway: "f.writelines() consumes any iterable of strings. Each item must have '\\n' to appear on a new line."
    },
    {
      num: 6,
      title: "Write Multiline Block / Docstring",
      badge: "Docstrings",
      desc: "Writing a triple-quoted multiline paragraph with preserved indentation in a single f.write() call.",
      code: `# Example 6: Multiline block notice
notice_text = """--------------------------------------------------
CODER & ACCOTAX NOTICE BOARD (BARRACKPORE)
Topic: Python File Handling Examination
Date: Saturday, 10:00 AM
Venue: Lab 1 & Lab 2
--------------------------------------------------
"""

with open("notice.txt", "w", encoding="utf-8") as f:
    f.write(notice_text)`,
      output: `--------------------------------------------------
CODER & ACCOTAX NOTICE BOARD (BARRACKPORE)
Topic: Python File Handling Examination
Date: Saturday, 10:00 AM
Venue: Lab 1 & Lab 2
--------------------------------------------------`,
      keyTakeaway: "Triple quotes (\"\"\" ... \"\"\") preserve all embedded newlines, margins, and ASCII layout borders."
    },
    {
      num: 7,
      title: "Capturing Return Value (Char Count)",
      badge: "Stream Info",
      desc: "Inspecting the integer character count returned by f.write() to track data written.",
      code: `# Example 7: Capture exact character count
with open("char_log.txt", "w", encoding="utf-8") as f:
    count1 = f.write("Coder & AccoTax\\n")    # Returns 16 chars
    count2 = f.write("Barrackpore Hub\\n")    # Returns 16 chars
    total_chars = count1 + count2
    print(f"Characters written: Line 1={count1}, Line 2={count2}, Total={total_chars}")`,
      output: `Characters written: Line 1=16, Line 2=16, Total=32`,
      keyTakeaway: "f.write() returns the integer count of characters (or bytes in binary mode) written into the stream."
    },
    {
      num: 8,
      title: "Writing User Input to a File",
      badge: "Interactive",
      desc: "Taking interactive console input from a student and saving it permanently into a diary note.",
      code: `# Example 8: Write student input into a file
student_name = input("Enter student name: ")  # e.g., "Mamata"
topic_note = input("Enter study topic: ")     # e.g., "File Handling write()"

with open("student_diary.txt", "w", encoding="utf-8") as f:
    f.write(f"Student: {student_name}\\n")
    f.write(f"Topic: {topic_note}\\n")
    f.write("Status: Completed at Barrackpore Lab\\n")`,
      output: `Student: Mamata
Topic: File Handling write()
Status: Completed at Barrackpore Lab`,
      keyTakeaway: "input() returns a string object, which can be formatted with f-strings and saved directly."
    },
    {
      num: 9,
      title: "Using print() with file= Parameter",
      badge: "Print Redirection",
      desc: "Directing Python's built-in print() function to write directly into an open file stream.",
      code: `# Example 9: Redirect print() to write into a file
with open("print_demo.txt", "w", encoding="utf-8") as f:
    # print automatically formats types and adds '\\n'
    print("ID", "Student", "Center", "Fee", sep=" | ", file=f)
    print(101, "Mamata", "Barrackpore", 4500, sep=" | ", file=f)
    print(102, "Debangshu", "Jadavpur", 5200, sep=" | ", file=f)`,
      output: `ID | Student | Center | Fee
101 | Mamata | Barrackpore | 4500
102 | Debangshu | Jadavpur | 5200`,
      keyTakeaway: "print(..., file=f) automatically handles non-string conversion and appends newlines (end='\\n')."
    },
    {
      num: 10,
      title: "Writing Formatted Tabular Report Card",
      badge: "Tabular Layout",
      desc: "Formatting aligned columns, headings, and score totals into an elegant ASCII report card table.",
      code: `# Example 10: Formatted tabular examination report card
exam_data = [
    {"name": "Mamata", "theory": 95, "practical": 98},
    {"name": "Debangshu", "theory": 92, "practical": 94},
    {"name": "Susmita", "theory": 88, "practical": 96}
]

with open("report_card.txt", "w", encoding="utf-8") as f:
    f.write("=" * 42 + "\\n")
    f.write(f"{'STUDENT PERFORMANCE REPORT':^42}\\n")
    f.write("=" * 42 + "\\n")
    f.write(f"{'Name':<12} {'Theory':>8} {'Practical':>10} {'Total':>8}\\n")
    f.write("-" * 42 + "\\n")
    for s in exam_data:
        total = s["theory"] + s["practical"]
        f.write(f"{s['name']:<12} {s['theory']:>8} {s['practical']:>10} {total:>8}\\n")
    f.write("=" * 42 + "\\n")`,
      output: `==========================================
        STUDENT PERFORMANCE REPORT        
==========================================
Name           Theory  Practical    Total
------------------------------------------
Mamata             95         98      193
Debangshu          92         94      186
Susmita            88         96      184
==========================================`,
      keyTakeaway: "Using f-string alignment specifiers (<12, >8, ^42) creates aligned, professional text tables."
    }
  ];

  const currentSimple = simpleExamplesList.find((ex) => ex.num === selectedSimpleEx) || simpleExamplesList[0];

  const handleCopySimpleCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedSimpleEx(true);
    setTimeout(() => setCopiedSimpleEx(false), 2000);
  };

  // ─── Actions for Tab 1: write() ──────────────────────────────────────
  const handleExecuteWrite = () => {
    setWriteLastError(null);

    if (writeSimulateTypeError) {
      setWriteLastError(
        "TypeError: write() argument must be str, not int. You cannot write numeric 4500 directly; convert with str(4500) or f-string!"
      );
      setWriteLastReturnVal(null);
      return;
    }

    const s = studentDirectory[writeStudent];
    const timeNow = new Date().toTimeString().split(" ")[0];
    const formattedText = `[${timeNow}] Student: ${writeStudent.padEnd(10, " ")} | Hub: ${s.center.padEnd(11, " ")} | Fee: ₹${s.fee.toLocaleString("en-IN")}${writeIncludeNewline ? "\n" : ""}`;
    const charsCount = formattedText.length;

    setWriteLastReturnVal(charsCount);

    if (writeIncludeNewline) {
      setWriteOutputLines((prev) => [...prev, formattedText.replace(/\n$/, "")]);
    } else {
      setWriteOutputLines((prev) => {
        if (prev.length === 0) return [formattedText];
        const last = prev[prev.length - 1];
        return [...prev.slice(0, prev.length - 1), last + formattedText];
      });
    }
  };

  const handleClearWriteFile = () => {
    setWriteOutputLines([]);
    setWriteLastReturnVal(null);
    setWriteLastError(null);
  };

  // ─── Actions for Tab 2: writelines() ──────────────────────────────────
  const handleExecuteWritelines = () => {
    setWritelinesExecuted(true);
    let items = [];

    if (writelinesIncludeNewline) {
      items = writelinesStudents.map(
        (name) => `ID: 2026-WB-${name.toUpperCase()} | Student: ${name} | Center: ${studentDirectory[name].center}\n`
      );
    } else {
      items = writelinesStudents.map(
        (name) => `ID: 2026-WB-${name.toUpperCase()} | Student: ${name} | Center: ${studentDirectory[name].center}`
      );
    }

    setWritelinesFileContent(items.join(""));
  };

  const toggleStudentForWritelines = (name) => {
    setWritelinesStudents((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // ─── Actions for Tab 3: Modes Battle ──────────────────────────────────
  const handleExecuteModeOperation = () => {
    setModesErrorAlert(null);
    const timeNow = new Date().toTimeString().split(" ")[0];
    const sampleRecord = `[${timeNow}] [NEW-ENTRY] Abhronila (Barrackpore Hub) - Fee Paid: ₹5,800\n`;

    if (modesActiveMode === "x") {
      if (modesFileExists) {
        setModesErrorAlert(
          "FileExistsError: [Errno 17] File exists: 'audit.log'. Mode 'x' refused to open and protected existing data from overwrite!"
        );
        return;
      } else {
        setModesFileExists(true);
        setModesDiskFileContent(sampleRecord);
        setModesLogMessages((prev) => [
          `[${timeNow}] Mode 'x': File created exclusively and written.`,
          ...prev
        ]);
        return;
      }
    }

    if (modesActiveMode === "w" || modesActiveMode === "w+") {
      setModesDiskFileContent(sampleRecord);
      setModesFileExists(true);
      setModesLogMessages((prev) => [
        `[${timeNow}] Mode '${modesActiveMode}': Existing data WIPED to 0 bytes! Wrote 1 record.`,
        ...prev
      ]);
    } else if (modesActiveMode === "a" || modesActiveMode === "a+") {
      setModesDiskFileContent((prev) => prev + sampleRecord);
      setModesFileExists(true);
      setModesLogMessages((prev) => [
        `[${timeNow}] Mode '${modesActiveMode}': Preserved history and appended to end of file.`,
        ...prev
      ]);
    }
  };

  const handleResetModesFile = () => {
    setModesFileExists(true);
    setModesErrorAlert(null);
    setModesDiskFileContent(
      "[2026-10-02 09:00:00] [AUDIT] System started at Barrackpore\n[2026-10-02 09:15:20] [PAYMENT] Mamata: ₹4,500\n[2026-10-02 09:30:10] [PAYMENT] Debangshu: ₹5,200\n"
    );
    setModesLogMessages([]);
  };

  const handleDeleteModesFile = () => {
    setModesFileExists(false);
    setModesDiskFileContent("");
    setModesErrorAlert(null);
    setModesLogMessages((prev) => ["File deleted from disk. File exists = False", ...prev]);
  };

  // ─── Actions for Tab 4: Buffering & flush() ───────────────────────────
  const handleWriteToBuffer = () => {
    if (bufferCrashed) setBufferCrashed(false);
    const timeNow = new Date().toTimeString().split(" ")[0];
    const sName = ["Mamata", "Debangshu", "Susmita", "Mahima", "Abhronila"][
      bufferItems.length % 5
    ];
    const newEntry = `[${timeNow}] Sensor Reading: Telemetry from ${studentDirectory[sName].center} OK (₹${studentDirectory[sName].fee})`;

    const updatedBuffer = [...bufferItems, newEntry];

    if (updatedBuffer.length >= bufferCapacity) {
      setDiskPersistedItems((prev) => [...prev, ...updatedBuffer]);
      setBufferItems([]);
    } else {
      setBufferItems(updatedBuffer);
    }
  };

  const handleExplicitFlush = () => {
    if (bufferItems.length > 0) {
      setDiskPersistedItems((prev) => [...prev, ...bufferItems]);
      setBufferItems([]);
    }
  };

  const handleSimulateCrash = () => {
    setBufferCrashed(true);
    setBufferItems([]);
  };

  // Deep Code Examples Metadata
  const deepCodeModules = [
    {
      id: "ex1",
      title: "1. write() Basics & Character Counting",
      badge: "Fundamental",
      desc: "Opening in 'w' mode, explicit \\n management, and capturing the integer character count returned by write().",
      codeModule: example1WriteBasics,
      highlights: [20, 27, 36, 40]
    },
    {
      id: "ex2",
      title: "2. writelines() Batch Lists & Generators",
      badge: "Batch I/O",
      desc: "Writing sequences of strings, handling the 'no auto newline' catch, and streaming huge datasets with generator expressions.",
      codeModule: example2WritelinesLists,
      highlights: [24, 30, 42]
    },
    {
      id: "ex3",
      title: "3. Append Mode ('a') for Real-Time Logs",
      badge: "Audit Trails",
      desc: "Preserving historical data, appending student fee payment records with timestamps and Rupee currency formatting.",
      codeModule: example3AppendingLogs,
      highlights: [17, 20, 39]
    },
    {
      id: "ex4",
      title: "4. Structured CSV & Tabular ASCII Reports",
      badge: "Reporting",
      desc: "Formatting aligned columns, comma-separated datasets, running totals, and batch averages directly using write().",
      codeModule: example4CsvManualWriter,
      highlights: [22, 28, 38, 51]
    },
    {
      id: "ex5",
      title: "5. Buffering, file.flush() & Crash Safety",
      badge: "Production Resilience",
      desc: "Understanding Python RAM buffer vs OS page cache, calling file.flush() and os.fsync() for real-time sensor streams.",
      codeModule: example5BufferingAndFlush,
      highlights: [20, 37, 40]
    },
    {
      id: "ex6",
      title: "6. Safe Atomic File Writing Pattern",
      badge: "Enterprise Standard",
      desc: "Writing to a temporary staging file first and atomically swapping via os.replace() to prevent corrupted files on crash.",
      codeModule: example6SafeAtomicWrite,
      highlights: [21, 27, 33]
    },
    {
      id: "ex10_master",
      title: "7. Master Script: 10 Simple Write Examples",
      badge: "10-in-1 Master",
      desc: "Complete runnable master script containing all 10 simple write file functions in one Python module.",
      codeModule: tenSimpleExamplesCode,
      highlights: [10, 20, 31, 48, 66, 80, 97, 109, 122, 136]
    }
  ];

  return (
    <>
      <style>{`
        .reveal-section {
          transform: translateY(0);
          transition: transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 6px rgba(45, 212, 191, 0.4)); }
          50% { opacity: 1; filter: drop-shadow(0 0 14px rgba(45, 212, 191, 0.8)); }
        }
        .animate-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-teal-950/40">
            <span>🐍</span>
            <span>Python Masterclass · Module 002_008 · Topic 10</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Writing Files in Python: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300">write(), writelines() &amp; Appending Data</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the complete mechanics of persistent file writing: understanding stream character counts, explicit newline discipline, append-mode audit trails, memory buffering with <code className="text-teal-300 font-mono">flush()</code>, and 10 crystal-clear practical examples.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300 flex items-center gap-1.5">
              <span>✍️</span> file.write(str) → int
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300 flex items-center gap-1.5">
              <span>📜</span> file.writelines(iterable) → None
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-emerald-300 flex items-center gap-1.5">
              <span>➕</span> Mode 'a' (Append Safe)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300 flex items-center gap-1.5">
              <span>⚡</span> 10 Simple Examples Included
            </span>
          </div>
        </header>

        {/* ─── 2. Classroom Teacher Masterclass Section ───────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-teal-950/20"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-xl border border-teal-500/30">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Teacher's Concept Breakdown: Writing Files from First Principles
              </h2>
              <p className="text-xs text-slate-400">
                Detailed conceptual breakdown by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Analogy Box */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>📖</span> The Classroom Notebook Analogy: Fresh Slate vs Cumulative Diary
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                Imagine managing student records at our Barrackpore center. Think of the filesystem as a notebook:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-2">
                  <div className="font-bold text-rose-300 flex items-center gap-2">
                    <span className="text-base">🗑️</span> Mode 'w' (Write Mode = Tear &amp; Replace)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Opening with <code className="text-rose-200 font-mono">'w'</code> is like tearing out every previous page and starting with a blank sheet (<strong>truncation to 0 bytes</strong>). Any old marks or fee records in that file are instantly lost forever!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
                  <div className="font-bold text-emerald-300 flex items-center gap-2">
                    <span className="text-base">📝</span> Mode 'a' (Append Mode = Turn to Next Page)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Opening with <code className="text-emerald-200 font-mono">'a'</code> is like turning to the very last line of the notebook and writing the new admission record below the existing ones. Previous history remains 100% preserved.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Signatures Comparison */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
                <span>⚙️</span> Method Signatures &amp; Return Types: write() vs writelines()
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                      <th className="p-3">Method Signature</th>
                      <th className="p-3">Argument Type</th>
                      <th className="p-3">Return Value</th>
                      <th className="p-3">Automatic '\n'?</th>
                      <th className="p-3">Primary Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-teal-300 font-bold">file.write(str)</td>
                      <td className="p-3 text-cyan-300">Single String (<code className="text-teal-200">str</code>)</td>
                      <td className="p-3 text-amber-300 font-bold">int (character count)</td>
                      <td className="p-3 text-rose-400 font-bold">❌ NO (Must add \n)</td>
                      <td className="p-3 text-slate-300">Formatted lines, single text blocks, CSV rows</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-teal-300 font-bold">file.writelines(iterable)</td>
                      <td className="p-3 text-cyan-300">Iterable of strings (list, tuple, generator)</td>
                      <td className="p-3 text-slate-400 font-bold">None</td>
                      <td className="p-3 text-rose-400 font-bold">❌ NO (Must include \n in items)</td>
                      <td className="p-3 text-slate-300">Batch writing pre-formatted lists or generator streams</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-teal-300 font-bold">file.flush()</td>
                      <td className="p-3 text-slate-500">None</td>
                      <td className="p-3 text-slate-400 font-bold">None</td>
                      <td className="p-3 text-slate-500">N/A</td>
                      <td className="p-3 text-slate-300">Emptying Python memory buffer to OS stream immediately</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* File Mode Matrix */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <span>📊</span> Comprehensive File Opening Modes Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-teal-300 font-mono text-sm">Mode 'w'</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-bold">TRUNCATES</span>
                  </div>
                  <p className="text-slate-400">Creates if absent. Wipes to 0 bytes if exists. Write-only at index 0.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-300 font-mono text-sm">Mode 'a'</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">PRESERVES</span>
                  </div>
                  <p className="text-slate-400">Creates if absent. Preserves existing data. Writes always append to EOF.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-300 font-mono text-sm">Mode 'x'</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold">EXCLUSIVE</span>
                  </div>
                  <p className="text-slate-400">Exclusive creation. Fails with <code className="text-amber-200">FileExistsError</code> if file already exists.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-rose-300 font-mono text-sm">Mode 'w+'</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-bold">READ + WIPE</span>
                  </div>
                  <p className="text-slate-400">Opens for Read &amp; Write, but <strong>erases existing content</strong> to 0 bytes on open!</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-300 font-mono text-sm">Mode 'a+'</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-bold">READ + APPEND</span>
                  </div>
                  <p className="text-slate-400">Opens for Read &amp; Append without wiping. Pointer starts at EOF; seek(0) to read.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sky-300 font-mono text-sm">Mode 'r+'</span>
                    <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 text-[10px] font-bold">UPDATE NO WIPE</span>
                  </div>
                  <p className="text-slate-400">Read &amp; Write in-place. Requires file to exist. Does not truncate automatically.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. 10 SIMPLE & ESSENTIAL WRITE FILE EXAMPLES ──── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💡</span> 10 Simple Write File Examples (Beginner to Intermediate)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Click on any of the 10 scenarios below to view the simple Python code, expected disk output, and key takeaways.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-mono font-bold">
              10 Quick Snippets
            </span>
          </div>

          {/* 10 Example Pill Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {simpleExamplesList.map((ex) => (
              <button
                key={ex.num}
                onClick={() => setSelectedSimpleEx(ex.num)}
                className={clsx(
                  "p-2.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between",
                  selectedSimpleEx === ex.num
                    ? "bg-teal-950/90 border-teal-500 text-teal-200 shadow-md shadow-teal-950/50 scale-[1.02]"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-teal-400">#{ex.num}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                    {ex.badge}
                  </span>
                </div>
                <span className="text-xs font-semibold line-clamp-1 mt-1">{ex.title}</span>
              </button>
            ))}
          </div>

          {/* Active Simple Example Card */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 text-xs font-mono font-bold">
                    Example #{currentSimple.num}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono">
                    {currentSimple.badge}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mt-1.5">
                  {currentSimple.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{currentSimple.desc}</p>
              </div>

              <button
                onClick={() => handleCopySimpleCode(currentSimple.code)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-teal-300 text-xs font-mono flex items-center gap-1.5 transition active:scale-95"
              >
                <span>{copiedSimpleEx ? "✓ Copied!" : "📋 Copy Python Code"}</span>
              </button>
            </div>

            {/* Code Block & Output Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Python Code Snippet */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span>🐍</span> Python Code Snippet:
                </span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto min-h-[160px] leading-relaxed">
                  <pre className="whitespace-pre">{currentSimple.code}</pre>
                </div>
              </div>

              {/* Expected Disk Output */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span>📄</span> Resulting File on Disk:
                </span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-teal-200 overflow-x-auto min-h-[160px] leading-relaxed">
                  <pre className="whitespace-pre">{currentSimple.output}</pre>
                </div>
              </div>
            </div>

            {/* Key Takeaway Callout */}
            <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-800/60 text-xs text-teal-200 flex items-start gap-2">
              <span className="text-base">💡</span>
              <div>
                <strong className="font-bold block">Key Pedagogical Insight:</strong>
                <span>{currentSimple.keyTakeaway}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Pedagogical SVG Concept Diagrams ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-teal-400">📐</span> Visual Architecture: File Writing Internals
          </h2>

          {/* SVG Diagram 1: File Write Modes & Pointer Behavior */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-teal-300">
                Diagram 1: File Pointer &amp; Truncation Behavior Across Modes ('w' vs 'a' vs 'x')
              </h3>
              <span className="text-xs px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-800">
                Pointer Architecture
              </span>
            </div>
            
            <div className="w-full overflow-x-auto py-2">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <rect width="850" height="240" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />
                
                {/* MODE 'w' Box */}
                <g transform="translate(30, 30)">
                  <rect width="240" height="180" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="12" y="24" fill="#f43f5e" fontWeight="bold" fontSize="13">Mode 'w' (Write/Overwrite)</text>
                  <rect x="12" y="38" width="216" height="35" rx="4" fill="#881337" opacity="0.4" stroke="#e11d48" strokeDasharray="3,3" />
                  <text x="20" y="60" fill="#fda4af" fontSize="11">Old Data Wiped! [0 Bytes]</text>
                  
                  {/* Pointer Arrow */}
                  <line x1="20" y1="105" x2="220" y2="105" stroke="#334155" strokeWidth="4" />
                  <circle cx="20" cy="105" r="7" fill="#f43f5e" />
                  <text x="20" y="130" fill="#f43f5e" fontSize="10" fontWeight="bold">Pointer = 0</text>
                  <text x="12" y="160" fill="#94a3b8" fontSize="10">Overwrites all content from byte 0</text>
                </g>

                {/* MODE 'a' Box */}
                <g transform="translate(305, 30)">
                  <rect width="240" height="180" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="12" y="24" fill="#10b981" fontWeight="bold" fontSize="13">Mode 'a' (Append Safe)</text>
                  <rect x="12" y="38" width="130" height="35" rx="4" fill="#064e3b" stroke="#059669" />
                  <text x="20" y="60" fill="#6ee7b7" fontSize="11">Existing History</text>
                  <rect x="146" y="38" width="82" height="35" rx="4" fill="#047857" opacity="0.7" stroke="#34d399" strokeDasharray="2,2" />
                  <text x="154" y="60" fill="#a7f3d0" fontSize="10">+New Row</text>

                  {/* Pointer Arrow */}
                  <line x1="20" y1="105" x2="220" y2="105" stroke="#334155" strokeWidth="4" />
                  <circle cx="146" cy="105" r="7" fill="#10b981" />
                  <text x="130" y="130" fill="#10b981" fontSize="10" fontWeight="bold">Pointer = EOF</text>
                  <text x="12" y="160" fill="#94a3b8" fontSize="10">History preserved; writes append</text>
                </g>

                {/* MODE 'x' Box */}
                <g transform="translate(580, 30)">
                  <rect width="240" height="180" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="12" y="24" fill="#f59e0b" fontWeight="bold" fontSize="13">Mode 'x' (Exclusive Shield)</text>
                  
                  <rect x="12" y="38" width="216" height="35" rx="4" fill="#78350f" opacity="0.5" stroke="#d97706" />
                  <text x="20" y="60" fill="#fcd34d" fontSize="11">File Exists? → FileExistsError</text>
                  
                  {/* Shield Status */}
                  <rect x="12" y="88" width="216" height="40" rx="4" fill="#1e293b" stroke="#475569" />
                  <text x="20" y="112" fill="#cbd5e1" fontSize="11">File Absent? → Creates Fresh</text>
                  <text x="12" y="160" fill="#94a3b8" fontSize="10">Guarantees zero accidental overwrite</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400">
              💡 <strong>Key Takeaway:</strong> Mode <code className="text-rose-300 font-mono">'w'</code> immediately resets the file length to 0. For continuous logging and transactional data, always default to mode <code className="text-emerald-300 font-mono">'a'</code>.
            </p>
          </div>

          {/* SVG Diagram 2: Memory Buffering to Disk Lifecycle */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-cyan-300">
                Diagram 2: Python I/O Buffer, file.flush(), and Physical Hardware Commitment
              </h3>
              <span className="text-xs px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Crash-Resilience Pipeline
              </span>
            </div>
            
            <div className="w-full overflow-x-auto py-2">
              <svg viewBox="0 0 850 200" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <rect width="850" height="200" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />
                
                {/* Stage 1: Python Process */}
                <g transform="translate(30, 30)">
                  <rect width="160" height="140" rx="8" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5" />
                  <text x="12" y="24" fill="#2dd4bf" fontWeight="bold">1. Python Code</text>
                  <rect x="12" y="40" width="136" height="50" rx="4" fill="#134e4a" stroke="#0d9488" />
                  <text x="18" y="60" fill="#a7f3d0" fontSize="10">f.write("Line\n")</text>
                  <text x="18" y="78" fill="#5eead4" fontSize="10">Returns: 5 chars</text>
                  <text x="12" y="115" fill="#94a3b8" fontSize="9">User-space execution</text>
                </g>

                {/* Arrow 1 */}
                <g transform="translate(195, 90)">
                  <line x1="0" y1="10" x2="40" y2="10" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="4,2" />
                  <polygon points="40,5 50,10 40,15" fill="#2dd4bf" />
                </g>

                {/* Stage 2: Python C-Level RAM Buffer */}
                <g transform="translate(250, 30)">
                  <rect width="160" height="140" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="12" y="24" fill="#38bdf8" fontWeight="bold">2. Python RAM Buffer</text>
                  <rect x="12" y="40" width="136" height="50" rx="4" fill="#075985" stroke="#0284c7" />
                  <text x="18" y="60" fill="#bae6fd" fontSize="10">RAM Page (4KB/8KB)</text>
                  <text x="18" y="78" fill="#7dd3fc" fontSize="9">Pending Disk Flush</text>
                  <text x="12" y="115" fill="#f59e0b" fontSize="9">⚡ file.flush() fires here</text>
                </g>

                {/* Arrow 2 */}
                <g transform="translate(415, 90)">
                  <line x1="0" y1="10" x2="40" y2="10" stroke="#38bdf8" strokeWidth="2" />
                  <polygon points="40,5 50,10 40,15" fill="#38bdf8" />
                </g>

                {/* Stage 3: OS Kernel Page Cache */}
                <g transform="translate(470, 30)">
                  <rect width="160" height="140" rx="8" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="12" y="24" fill="#818cf8" fontWeight="bold">3. OS Page Cache</text>
                  <rect x="12" y="40" width="136" height="50" rx="4" fill="#312e81" stroke="#4338ca" />
                  <text x="18" y="60" fill="#c7d2fe" fontSize="10">Kernel Dirty Pages</text>
                  <text x="18" y="78" fill="#a5b4fc" fontSize="9">Visible to OS tools</text>
                  <text x="12" y="115" fill="#a5b4fc" fontSize="9">⚡ os.fsync() forces write</text>
                </g>

                {/* Arrow 3 */}
                <g transform="translate(635, 90)">
                  <line x1="0" y1="10" x2="40" y2="10" stroke="#818cf8" strokeWidth="2" />
                  <polygon points="40,5 50,10 40,15" fill="#818cf8" />
                </g>

                {/* Stage 4: Physical Storage Hardware */}
                <g transform="translate(690, 30)">
                  <rect width="130" height="140" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="10" y="24" fill="#10b981" fontWeight="bold">4. Disk / SSD</text>
                  <rect x="10" y="40" width="110" height="50" rx="4" fill="#064e3b" stroke="#059669" />
                  <text x="16" y="60" fill="#a7f3d0" fontSize="10">Non-Volatile</text>
                  <text x="16" y="78" fill="#6ee7b7" fontSize="10">Flash / Platter</text>
                  <text x="10" y="115" fill="#34d399" fontSize="9">100% Persisted</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400">
              💡 <strong>Why This Matters:</strong> Data passed to <code className="text-teal-300 font-mono">f.write()</code> stays in memory until the buffer fills or <code className="text-teal-300 font-mono">f.close()</code> / <code className="text-teal-300 font-mono">f.flush()</code> is triggered. The <code className="text-cyan-300 font-mono">with</code> statement guarantees closure and buffer flushing automatically.
            </p>
          </div>
        </section>

        {/* ─── 5. INTERACTIVE WORKBENCH (4 LABS) ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">⚡</span> Interactive Python Workbench: Under the Hood
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Simulate character return counts, missing newline traps, mode battles, and RAM buffer flushes in real-time.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
              4 Live Labs
            </span>
          </div>

          {/* Workbench Mode Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => setWorkbenchTab("write")}
              className={clsx(
                "p-3 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between",
                workbenchTab === "write"
                  ? "bg-teal-950/90 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/40"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <span className="text-[10px] font-mono uppercase font-bold text-teal-400">Lab 1</span>
              <span className="text-xs font-bold mt-1">file.write(str)</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Char count &amp; '\n' rule</span>
            </button>

            <button
              onClick={() => setWorkbenchTab("writelines")}
              className={clsx(
                "p-3 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between",
                workbenchTab === "writelines"
                  ? "bg-cyan-950/90 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/40"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">Lab 2</span>
              <span className="text-xs font-bold mt-1">file.writelines()</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Batch lists &amp; generators</span>
            </button>

            <button
              onClick={() => setWorkbenchTab("modes")}
              className={clsx(
                "p-3 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between",
                workbenchTab === "modes"
                  ? "bg-amber-950/90 border-amber-500 text-amber-200 shadow-lg shadow-amber-950/40"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400">Lab 3</span>
              <span className="text-xs font-bold mt-1">'w' vs 'a' vs 'x'</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Overwrite vs Append vs Shield</span>
            </button>

            <button
              onClick={() => setWorkbenchTab("buffer")}
              className={clsx(
                "p-3 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between",
                workbenchTab === "buffer"
                  ? "bg-indigo-950/90 border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-950/40"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-400">Lab 4</span>
              <span className="text-xs font-bold mt-1">RAM Buffering &amp; flush()</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Crash safety &amp; page cache</span>
            </button>
          </div>

          {/* ─── TAB 1: write() Mechanics ─── */}
          {workbenchTab === "write" && (
            <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 text-xs font-mono font-bold">
                    Method Inspection: file.write(string) -&gt; int
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Observe how <code className="text-teal-300 font-mono">f.write()</code> returns the exact number of characters written into the stream, strictly requires <code className="text-teal-300 font-mono">str</code> type, and never appends newline characters automatically.
                </p>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Select Student Record:
                  </label>
                  <select
                    value={writeStudent}
                    onChange={(e) => setWriteStudent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-teal-400 focus:outline-none"
                  >
                    {Object.keys(studentDirectory).map((name) => (
                      <option key={name} value={name}>
                        {name} ({studentDirectory[name].center} - ₹{studentDirectory[name].fee})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Formatting &amp; Type Options:
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="optNewline"
                      checked={writeIncludeNewline}
                      onChange={(e) => setWriteIncludeNewline(e.target.checked)}
                      className="w-4 h-4 rounded text-teal-500 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="optNewline" className="text-xs text-slate-300 cursor-pointer">
                      Include <code className="text-teal-300 font-mono">'\n'</code> at end of line
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="optTypeErr"
                      checked={writeSimulateTypeError}
                      onChange={(e) => setWriteSimulateTypeError(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-500 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="optTypeErr" className="text-xs text-rose-300 cursor-pointer">
                      Pass raw <code className="text-rose-300 font-mono">int(4500)</code> (Simulate TypeError)
                    </label>
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-2">
                  <button
                    onClick={handleExecuteWrite}
                    className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-teal-950/40 transition active:scale-95"
                  >
                    ▶ Call f.write(...)
                  </button>
                  <button
                    onClick={handleClearWriteFile}
                    className="w-full py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 text-xs font-mono transition"
                  >
                    Clear File Stream
                  </button>
                </div>
              </div>

              {/* Error Display if TypeError Triggered */}
              {writeLastError && (
                <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
                  <span className="text-base">🚨</span>
                  <div>
                    <strong className="block font-bold">Python Exception Raised:</strong>
                    <span>{writeLastError}</span>
                  </div>
                </div>
              )}

              {/* Simulated Output & Generated Code */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Visual File View */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      📄 Simulated File: <code className="text-teal-300">admissions.txt</code>
                    </span>
                    {writeLastReturnVal !== null && (
                      <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 text-[11px] font-mono font-bold">
                        f.write() Returned: {writeLastReturnVal} chars
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto min-h-[160px] max-h-[220px]">
                    {writeOutputLines.length > 0 ? (
                      <div className="space-y-1">
                        {writeOutputLines.map((line, idx) => (
                          <div key={idx} className="flex gap-3 text-teal-200">
                            <span className="text-slate-600 select-none">{idx + 1}</span>
                            <span className="whitespace-pre">{line}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-slate-600 italic text-center py-10">
                        [ File is empty (0 characters) ]
                      </div>
                    )}
                  </div>

                  {!writeIncludeNewline && writeOutputLines.length > 2 && (
                    <p className="text-[11px] text-amber-400 flex items-center gap-1">
                      <span>⚠️</span> Notice: Because <code className="text-amber-200 font-mono">'\n'</code> was disabled, text merged onto the exact same line without a break!
                    </p>
                  )}
                </div>

                {/* Generated Python Source */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    🐍 Equivalent Python Code:
                  </span>
                  
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto min-h-[160px] leading-relaxed">
                    <span className="text-slate-500"># Opening file in write mode</span>
                    <br />
                    <span className="text-cyan-400">with</span> open(<span className="text-amber-300">"admissions.txt"</span>, <span className="text-teal-300">"w"</span>, encoding=<span className="text-amber-300">"utf-8"</span>) <span className="text-cyan-400">as</span> f:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;student_name = <span className="text-amber-300">"{writeStudent}"</span>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;fee = <span className="text-indigo-300">{studentDirectory[writeStudent].fee}</span>
                    <br />
                    <br />
                    {writeSimulateTypeError ? (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-rose-400"># ❌ WRONG: Passing integer raises TypeError!</span>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;f.write(fee)  <span className="text-rose-400"># TypeError!</span>
                      </>
                    ) : (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># Format line (returns int count of chars written)</span>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;line = <span className="text-amber-300">{'f"Student: {student_name} | Fee: ₹{fee}' + (writeIncludeNewline ? '\\n"' : '"')}</span>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;chars_written = f.write(line)
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">print</span>(<span className="text-amber-300">{'f"Wrote {chars_written} chars"'}</span>)
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 2: writelines() Mechanics ─── */}
          {workbenchTab === "writelines" && (
            <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
                    Method Inspection: file.writelines(iterable) -&gt; None
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <code className="text-cyan-300 font-mono">f.writelines()</code> accepts an iterable of strings (list, tuple, or generator). <strong>Key Trap:</strong> It does NOT add newline characters between items on its own!
                </p>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Students in Batch:
                  </label>
                  <div className="space-y-1.5">
                    {Object.keys(studentDirectory).map((name) => (
                      <label key={name} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={writelinesStudents.includes(name)}
                          onChange={() => toggleStudentForWritelines(name)}
                          className="w-3.5 h-3.5 rounded text-cyan-500 bg-slate-900 border-slate-700"
                        />
                        <span>{name} ({studentDirectory[name].center})</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Formatting &amp; Stream Type:
                  </span>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="optWlNewline"
                      checked={writelinesIncludeNewline}
                      onChange={(e) => setWritelinesIncludeNewline(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="optWlNewline" className="text-xs text-slate-300 cursor-pointer">
                      Pre-format each item with <code className="text-cyan-300 font-mono">'\n'</code>
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="optWlGen"
                      checked={writelinesUseGenerator}
                      onChange={(e) => setWritelinesUseGenerator(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="optWlGen" className="text-xs text-emerald-300 cursor-pointer">
                      Use Generator Expression (O(1) RAM)
                    </label>
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-2">
                  <button
                    onClick={handleExecuteWritelines}
                    disabled={writelinesStudents.length === 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-cyan-950/40 transition active:scale-95"
                  >
                    ▶ Call f.writelines(...)
                  </button>
                  <span className="text-[11px] text-slate-400 text-center font-mono">
                    Return value is always <strong className="text-slate-200">None</strong>
                  </span>
                </div>
              </div>

              {/* Output Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      📄 File Result on Disk:
                    </span>
                    {writelinesExecuted && (
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-[11px] font-mono">
                        Return: None
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto min-h-[160px] max-h-[220px]">
                    {writelinesFileContent ? (
                      <pre className="text-cyan-200 whitespace-pre leading-relaxed">
                        {writelinesFileContent}
                      </pre>
                    ) : (
                      <div className="text-slate-600 italic text-center py-10">
                        [ Click "Call f.writelines(...)" to execute ]
                      </div>
                    )}
                  </div>

                  {!writelinesIncludeNewline && writelinesExecuted && (
                    <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300">
                      ⚠️ <strong>Look at the output!</strong> Because items lacked <code className="text-rose-200 font-mono">'\n'</code>, all records got glued together horizontally into one long sentence!
                    </div>
                  )}
                </div>

                {/* Generated Python Source */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    🐍 Generated Python Code:
                  </span>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto min-h-[160px] leading-relaxed">
                    <span className="text-slate-500"># Raw student names list</span>
                    <br />
                    students = {JSON.stringify(writelinesStudents)}
                    <br />
                    <br />
                    <span className="text-cyan-400">with</span> open(<span className="text-amber-300">"roster.txt"</span>, <span className="text-teal-300">"w"</span>, encoding=<span className="text-amber-300">"utf-8"</span>) <span className="text-cyan-400">as</span> f:
                    <br />
                    {writelinesUseGenerator ? (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># Memory-efficient generator expression</span>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;stream = ({'f"ID: 2026-WB-{s} | {s}' + (writelinesIncludeNewline ? '\\n"' : '"')} <span className="text-cyan-400">for</span> s <span className="text-cyan-400">in</span> students)
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;f.writelines(stream)
                      </>
                    ) : (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># List comprehension</span>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;lines = [{`f"ID: 2026-WB-{s} | {s}` + (writelinesIncludeNewline ? `\\n"` : `" `)} <span className="text-cyan-400">for</span> s <span className="text-cyan-400">in</span> students]
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;f.writelines(lines)
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 3: Modes Battle ('w' vs 'a' vs 'x') ─── */}
          {workbenchTab === "modes" && (
            <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-xs font-mono font-bold">
                    File Mode Battle: 'w' (Overwrite) vs 'a' (Append) vs 'x' (Exclusive)
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Test the difference between modes on an existing file with 3 historical payment records. See why accidental use of <code className="text-rose-300 font-mono">'w'</code> erases historical logs while <code className="text-emerald-300 font-mono">'a'</code> safely appends.
                </p>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Choose Open Mode:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["w", "a", "x"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setModesActiveMode(m)}
                        className={clsx(
                          "py-2 px-2 rounded-lg font-mono text-xs font-bold border transition",
                          modesActiveMode === m
                            ? m === "w"
                              ? "bg-rose-950 border-rose-500 text-rose-200"
                              : m === "a"
                              ? "bg-emerald-950 border-emerald-500 text-emerald-200"
                              : "bg-amber-950 border-amber-500 text-amber-200"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        )}
                      >
                        '{m}'
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    File System State:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetModesFile}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700 transition"
                    >
                      Reset 3 Existing Records
                    </button>
                    <button
                      onClick={handleDeleteModesFile}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/50 text-rose-300 text-xs border border-slate-700 transition"
                    >
                      Delete File (Simulate Missing)
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    File Exists: <strong className={modesFileExists ? "text-emerald-400" : "text-rose-400"}>{modesFileExists ? "YES" : "NO"}</strong>
                  </span>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={handleExecuteModeOperation}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-teal-600 hover:from-amber-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 transition active:scale-95"
                  >
                    ▶ open('audit.log', '{modesActiveMode}') &amp; write()
                  </button>
                </div>
              </div>

              {/* Exception Alert */}
              {modesErrorAlert && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
                  <span className="text-base">🛡️</span>
                  <div>
                    <strong className="block font-bold">Safety Shield Exception:</strong>
                    <span>{modesErrorAlert}</span>
                  </div>
                </div>
              )}

              {/* File Content Preview & Log */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      📄 File on Disk: <code className="text-amber-300">audit.log</code>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Size: {modesDiskFileContent.length} bytes
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto min-h-[160px] max-h-[220px]">
                    {modesDiskFileContent ? (
                      <pre className="text-slate-200 whitespace-pre leading-relaxed">
                        {modesDiskFileContent}
                      </pre>
                    ) : (
                      <div className="text-slate-600 italic text-center py-10">
                        [ File is empty (0 bytes) or does not exist ]
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    📋 Mode Activity Audit:
                  </span>
                  
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 min-h-[160px] max-h-[220px] overflow-y-auto">
                    {modesLogMessages.length > 0 ? (
                      modesLogMessages.map((msg, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-900/80 text-slate-300 border border-slate-800 text-[11px]">
                          {msg}
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-600 italic text-center py-10">
                        [ Select a mode and click execute to see actions ]
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 4: Buffering & flush() ─── */}
          {workbenchTab === "buffer" && (
            <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono font-bold">
                    I/O RAM Buffer, file.flush() &amp; Power Crash Simulation
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Python does not write every single character to physical disk immediately. It holds writes in a memory buffer. Click "Write Telemetry Line" to add data to the RAM buffer. Notice it only reaches the physical disk when the buffer fills (4 items) or when you explicitly click <code className="text-indigo-300 font-mono">file.flush()</code>!
                </p>
              </div>

              {/* Buffer Bar Visualization */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">RAM Buffer Occupancy:</span>
                  <span className="text-amber-300 font-bold">
                    {bufferItems.length} / {bufferCapacity} items ({Math.round((bufferItems.length / bufferCapacity) * 100)}%)
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${(bufferItems.length / bufferCapacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleWriteToBuffer}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/40 transition active:scale-95 flex items-center gap-2"
                >
                  <span>✍️</span> 1. f.write(sensor_reading)
                </button>

                <button
                  onClick={handleExplicitFlush}
                  disabled={bufferItems.length === 0}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 disabled:opacity-40 text-white font-bold text-xs shadow-lg shadow-amber-950/40 transition active:scale-95 flex items-center gap-2"
                >
                  <span>⚡</span> 2. file.flush() (Force Disk Write)
                </button>

                <button
                  onClick={handleSimulateCrash}
                  disabled={bufferItems.length === 0}
                  className="py-2.5 px-4 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-200 font-bold text-xs transition active:scale-95 flex items-center gap-2"
                >
                  <span>💥</span> 3. Simulate Power Cut / Crash
                </button>
              </div>

              {bufferCrashed && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
                  <span className="text-base">💥</span>
                  <div>
                    <strong className="block font-bold">Process Crashed Before Flush!</strong>
                    <span>All unflushed data in the Python RAM buffer was destroyed. Notice that the physical disk storage only contains lines that were explicitly flushed before the crash!</span>
                  </div>
                </div>
              )}

              {/* Dual View: RAM Buffer vs Physical Disk Storage */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* User-Space RAM Buffer */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span>🧠</span> Python RAM Buffer (Volatile Memory):
                  </span>
                  
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/40 font-mono text-xs space-y-1.5 min-h-[160px]">
                    {bufferItems.length > 0 ? (
                      bufferItems.map((item, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-amber-950/40 text-amber-200 border border-amber-800/60 text-[11px]">
                          [RAM Buffer {idx + 1}] {item}
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-600 italic text-center py-10">
                        [ Buffer is empty — all data flushed to disk ]
                      </div>
                    )}
                  </div>
                </div>

                {/* Hard Disk Storage */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span>💾</span> Physical Hard Disk / SSD (Persisted Storage):
                  </span>

                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-800/40 font-mono text-xs space-y-1.5 min-h-[160px] max-h-[220px] overflow-y-auto">
                    {diskPersistedItems.map((item, idx) => (
                      <div key={idx} className="p-1.5 rounded bg-emerald-950/40 text-emerald-200 border border-emerald-800/60 text-[11px]">
                        [Disk Block] {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ─── 6. Comprehensive Code Showcase (Deep Modules) ──── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">📚</span> Production Code Showcase: 7 In-Depth Python Scripts
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-world, classroom-tested Python scripts with line-by-line pedagogical annotations
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
              7 Source Files
            </span>
          </div>

          {/* Tab Navigation for All Deep Examples */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {deepCodeModules.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setActiveCodeTab(ex.id)}
                className={clsx(
                  "p-2.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between",
                  activeCodeTab === ex.id
                    ? "bg-teal-950/80 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/50"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                <span className="text-[10px] font-mono uppercase font-bold text-teal-400 mb-1">
                  {ex.badge}
                </span>
                <span className="text-xs font-semibold line-clamp-1">{ex.title.split(". ")[1] || ex.title}</span>
              </button>
            ))}
          </div>

          {/* Active Code Loader Section */}
          {deepCodeModules.map(
            (ex) =>
              activeCodeTab === ex.id && (
                <div
                  key={ex.id}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 md:p-7 space-y-4 shadow-2xl animate-[fadeIn_0.3s_ease-out]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>🐍</span> {ex.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ex.desc}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-teal-300 font-mono text-xs">
                      Module: 002_008_file-handling
                    </span>
                  </div>

                  <PythonFileLoader
                    fileModule={ex.codeModule}
                    title={ex.title}
                    highlightLines={ex.highlights}
                  />

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-teal-300 font-mono">
                      💡 Pro-Tip: Notice UTF-8 encoding is explicitly specified to support ₹ Rupee and regional characters.
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">PEP 8 Compliant</span>
                  </div>
                </div>
              )
          )}
        </section>

        {/* ─── 7. Real-World West Bengal Engineering Scenarios ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Scenario 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE HUB
                  </span>
                  <span className="text-xs text-slate-400">Educational ERP</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  Student Fee Audit Ledger with Append Mode ('a')
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Mamata implemented automated student fee collection logging at Coder &amp; AccoTax in Barrackpore. Using append mode (<code className="text-amber-300 font-mono">'a'</code>), each fee collection of ₹4,500 to ₹6,000 is written with an ISO timestamp. Even across system restarts, prior student records are strictly preserved without risk of overwrite.
                </p>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 flex justify-between items-center">
                <span>Outcome: 100% Audit Integrity</span>
                <span className="text-slate-500">Zero Overwrites</span>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-teal-500/50 transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    JADAVPUR UNIVERSITY
                  </span>
                  <span className="text-xs text-slate-400">IoT Telemetry</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  Real-Time Weather Telemetry with file.flush()
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Debangshu programmed environmental IoT sensors across Jadavpur and Kolkata. By issuing <code className="text-teal-300 font-mono">file.flush()</code> on every telemetry reading, downstream real-time web dashboards view air quality and temperature metrics immediately without waiting for the 8KB memory buffer to fill.
                </p>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300 flex justify-between items-center">
                <span>Latency: Sub-Second Stream</span>
                <span className="text-slate-500">Live Dashboard Sync</span>
              </div>
            </div>

            {/* Scenario 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    KOLKATA LOGISTICS HUB
                  </span>
                  <span className="text-xs text-slate-400">E-Commerce Pipeline</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  Batch Dispatch Manifests with Generator writelines()
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Susmita created a batch parcel manifest export service at a Salt Lake Sector V distribution center. By passing generator expressions to <code className="text-cyan-300 font-mono">file.writelines()</code>, the service streams 75,000 consignment records into CSV dispatch files with less than 12MB of RAM consumption.
                </p>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 flex justify-between items-center">
                <span>Memory Overhead: O(1) Stream</span>
                <span className="text-slate-500">High Throughput</span>
              </div>
            </div>

            {/* Scenario 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                    ICHAPUR METAL WORKS
                  </span>
                  <span className="text-xs text-slate-400">Industrial Manufacturing</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  Atomic Production Shift Counter with os.replace()
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Mahima engineered a factory shift production counter in Ichapur. To guard against sudden industrial power cuts, configuration updates are written to a temporary staging file first and atomically swapped using <code className="text-emerald-300 font-mono">os.replace()</code>, eliminating corrupted or half-written shift logs.
                </p>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 flex justify-between items-center">
                <span>Safety: Zero File Corruption</span>
                <span className="text-slate-500">Atomic Swaps</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. Senior Pitfalls & Production Best Practices ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Common Pitfalls &amp; Defensive Best Practices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pitfalls */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Critical Traps for Beginners
              </h3>
              
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-rose-200 block">• The Missing '\n' in write():</strong>
                Calling <code className="text-rose-300 font-mono">f.write("Mamata")</code> and <code className="text-rose-300 font-mono">f.write("Barrackpore")</code> produces <code className="text-slate-400 font-mono">"MamataBarrackpore"</code> on a single line. Always append <code className="text-rose-300 font-mono">"\n"</code> explicitly!
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-rose-200 block">• TypeError on Numeric Arguments:</strong>
                Calling <code className="text-rose-300 font-mono">f.write(4500)</code> raises <code className="text-rose-300 font-mono">TypeError: write() argument must be str, not int</code>. You must pass <code className="text-teal-300 font-mono">{'f"{4500}\\n"'}</code> or <code className="text-teal-300 font-mono">str(4500)</code>.
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-rose-200 block">• Overwriting History with 'w' instead of 'a':</strong>
                Opening a transactional log with <code className="text-rose-300 font-mono">open("log.txt", "w")</code> empties the file instantly. Always use <code className="text-emerald-300 font-mono">"a"</code> for cumulative logs.
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-rose-200 block">• Assuming writelines() Adds Newlines:</strong>
                <code className="text-rose-300 font-mono">f.writelines(["A", "B"])</code> outputs <code className="text-slate-400 font-mono">"AB"</code>. Pre-format items with <code className="text-teal-300 font-mono">{'[f"{x}\\n" for x in items]'}</code>.
              </div>
            </div>

            {/* Best Practices */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Engineering Standards
              </h3>
              
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-emerald-200 block">• Always Use Context Managers:</strong>
                Always open files with <code className="text-emerald-300 font-mono">with open(...) as f:</code>. This guarantees automatic buffer flushing and file descriptor release even during runtime exceptions.
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-emerald-200 block">• Explicit UTF-8 Encoding:</strong>
                Always pass <code className="text-emerald-300 font-mono">encoding="utf-8"</code>. On Windows, omitting this defaults to ANSI/cp1252, causing crashes on Rupee (<code className="text-amber-300 font-mono">₹</code>) or Indian language text.
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-emerald-200 block">• Use Generators for Massive Datasets:</strong>
                Pass generator expressions <code className="text-emerald-300 font-mono">{'f.writelines(f"{x}\\n" for x in big_data)'}</code> to prevent multi-gigabyte RAM allocation spikes.
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <strong className="text-emerald-200 block">• Crash-Proof Atomic Writes:</strong>
                For vital configs or databases, write to a temp file first and call <code className="text-emerald-300 font-mono">os.replace(temp_file, target)</code> for atomic replacement.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. Hints & Mental Models ───────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">💡</span> Pedagogical Hints &amp; Mental Models
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-indigo-300 font-bold block text-sm">🤔 Think About...</span>
              <p className="text-slate-300 leading-relaxed">
                Why does <code className="text-indigo-200 font-mono">print("hi", file=f)</code> add a newline while <code className="text-indigo-200 font-mono">f.write("hi")</code> does not? Because print is high-level output with default <code className="text-indigo-200 font-mono">end="\n"</code>, whereas write is a raw byte/character stream method.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-cyan-300 font-bold block text-sm">🔍 Observe Carefully...</span>
              <p className="text-slate-300 leading-relaxed">
                What happens when you open in <code className="text-cyan-200 font-mono">'w+'</code> vs <code className="text-cyan-200 font-mono">'a+'</code>? Both permit reading and writing, but <code className="text-rose-300 font-mono">'w+'</code> wipes the file clean immediately on open, whereas <code className="text-emerald-300 font-mono">'a+'</code> keeps all history intact!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/50 space-y-2">
              <span className="text-amber-300 font-bold block text-sm">⚡ Try Changing This...</span>
              <p className="text-slate-300 leading-relaxed">
                In Lab 1 above, uncheck the "Include '\n'" box and click "Call f.write" twice with different students. Notice how the second student's name attaches directly to the end of the previous line!
              </p>
            </div>
          </div>
        </section>

        {/* ─── 10. Student Mini Checklist ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/30 space-y-4">
            <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
              <span>📋</span> Student Mini Checklist: What You Must Remember
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">☑</span>
                <span><strong className="text-white">write(str)</strong> returns character count (int); <strong className="text-white">writelines()</strong> returns None.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">☑</span>
                <span>Neither write() nor writelines() automatically injects <strong className="text-white">\n</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">☑</span>
                <span>Mode <strong className="text-rose-300">'w'</strong> destroys existing content; mode <strong className="text-emerald-300">'a'</strong> appends at end.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">☑</span>
                <span>Mode <strong className="text-amber-300">'x'</strong> prevents accidental overwrite by throwing <code className="text-amber-200">FileExistsError</code>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">☑</span>
                <span>Always specify <strong className="text-white">encoding="utf-8"</strong> for currency symbols (₹) and Indian text.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">☑</span>
                <span>Use <strong className="text-white">file.flush()</strong> and <strong className="text-white">os.fsync()</strong> for mission-critical real-time streams.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 11. FAQ & Practice Questions ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Writing Files: write(), writelines(), appending data FAQs"
            questions={questions}
            subtitle="Master file writing with 30 comprehensive examination and interview questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 12. Printable Plain Text Note ──────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Writing Files: write(), writelines(), appending data"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* ─── 13. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Writing data to persistent storage is where your programs transition from ephemeral calculations to real-world software. " +
              "Always remember: mode 'w' is destructive, mode 'a' is preservative, write() returns character count, and neither write() nor writelines() inserts newlines automatically. " +
              "Master the 'with' statement and atomic write patterns early, and your production applications will never suffer from corrupted files or lost data!"
            }
          />
        </section>

        {/* ─── 14. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 10 · Writing Files: write(), writelines(), appending data · Python Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic10;
