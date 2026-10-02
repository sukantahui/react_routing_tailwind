import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";

// ─── Topic 11 Data & Code Imports ──────────────────────────────────────
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

import tenSimpleSeekTellCode from "./topic11_files/ten_simple_seek_tell_examples.py?raw";
import example1SeekTellBasics from "./topic11_files/example1_seek_tell_basics.py?raw";
import example2FilesizeAndSkip from "./topic11_files/example2_filesize_and_skip.py?raw";
import example3RplusInplaceUpdate from "./topic11_files/example3_rplus_inplace_update.py?raw";
import example4BinaryRelativeSeeking from "./topic11_files/example4_binary_relative_seeking.py?raw";
import example5LineIndexRandomAccess from "./topic11_files/example5_line_index_random_access.py?raw";
import example6ReverseLogTailer from "./topic11_files/example6_reverse_log_tailer.py?raw";

/**
 * Topic11 – File Pointer Manipulation: tell() and seek()
 * Module: 002_008_file-handling (File Handling & Persistence (Text, CSV & JSON))
 * Track: Python from Basic to Pro
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with 10 Simple Pointer Examples,
 *                        4-Lab Flight Simulator Workbench, 2 Architectural SVGs,
 *                        6 In-Depth Python Code Modules, FAQs, and ASCII Notes.
 */
const Topic11 = () => {
  // ─── 10 Simple Examples State ─────────────────────────────────────────
  const [selectedSimpleEx, setSelectedSimpleEx] = useState(1);
  const [copiedSimpleEx, setCopiedSimpleEx] = useState(false);

  // ─── Workbench State ──────────────────────────────────────────────────
  const [workbenchTab, setWorkbenchTab] = useState("tape"); // "tape" | "whence" | "inplace" | "indexer"
  
  // Lab 1: Pointer Tape Simulator State
  const [tapePointerPos, setTapePointerPos] = useState(0);
  const [tapeReadLength, setTapeReadLength] = useState(15);
  const [tapeLastReadText, setTapeLastReadText] = useState("");
  
  // Sample file stream for Lab 1
  const tapeSampleData = "Mamata:Barrackpore;Debangshu:Jadavpur;Susmita:Kolkata;Mahima:Ichapur;";
  const tapeTotalBytes = tapeSampleData.length;

  // Lab 2: Whence Triad Simulator State
  const [whenceAnchor, setWhenceAnchor] = useState(0); // 0 (SET), 1 (CUR), 2 (END)
  const [whenceOffset, setWhenceOffset] = useState(0);
  const [whenceMode, setWhenceMode] = useState("binary"); // "text" | "binary"
  const [whenceErrorAlert, setWhenceErrorAlert] = useState(null);
  const [whenceSimulatedCursor, setWhenceSimulatedCursor] = useState(25);
  const whenceFileSize = 60;

  // Lab 3: In-Place Surgery State ('r+' mode)
  const [inplaceRecords, setInplaceRecords] = useState([
    { id: 101, name: "Mamata", center: "Barrackpore", status: "PENDING ", offset: 26 },
    { id: 102, name: "Debangshu", center: "Jadavpur", status: "PENDING ", offset: 68 },
    { id: 103, name: "Susmita", center: "Kolkata", status: "PENDING ", offset: 110 }
  ]);
  const [inplaceActiveStudent, setInplaceActiveStudent] = useState(101);
  const [inplaceSelectedStatus, setInplaceSelectedStatus] = useState("APPROVED");
  const [inplaceLogHistory, setInplaceLogHistory] = useState([
    "Initial status ledger loaded in memory."
  ]);

  // Lab 4: O(1) Line Indexer State
  const [indexerActiveLine, setIndexerActiveLine] = useState(1);
  const indexerSampleLines = [
    { line: 1, text: "Record 01: Mamata (Course: Python Masterclass, Fee: ₹4500)", offset: 0, length: 60 },
    { line: 2, text: "Record 02: Debangshu (Course: Data Analytics, Fee: ₹5200)", offset: 60, length: 59 },
    { line: 3, text: "Record 03: Susmita (Course: Full Stack Python, Fee: ₹6000)", offset: 119, length: 60 },
    { line: 4, text: "Record 04: Mahima (Course: Python & ML, Fee: ₹5500)", offset: 179, length: 53 },
    { line: 5, text: "Record 05: Abhronila (Course: Django Web API, Fee: ₹5800)", offset: 232, length: 58 }
  ];

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

  // 10 Simple Examples Data
  const simpleExamplesList = [
    {
      num: 1,
      title: "tell() Basics & Rewinding with seek(0)",
      badge: "tell() & Rewind",
      desc: "Reading lines, checking current byte position with tell(), and rewinding the cursor back to byte 0 with seek(0).",
      code: `# Example 1: Check pointer position and rewind to start
with open("students.txt", "r", encoding="utf-8") as f:
    print("Initial pointer position:", f.tell())  # Returns 0
    
    line1 = f.readline()
    print("Read Line 1:", line1.strip())
    print("Pointer after Line 1:", f.tell())       # Returns byte count of line 1
    
    # Rewind pointer back to start
    f.seek(0)
    print("After f.seek(0), pointer reset to:", f.tell())  # Returns 0
    
    line1_again = f.readline()
    print("Re-read after rewind:", line1_again.strip())`,
      output: `Initial pointer position: 0
Read Line 1: Mamata (Barrackpore)
Pointer after Line 1: 22
After f.seek(0), pointer reset to: 0
Re-read after rewind: Mamata (Barrackpore)`,
      keyTakeaway: "f.tell() inspects current stream position; f.seek(0) resets the pointer to the file start without re-opening."
    },
    {
      num: 2,
      title: "Measuring File Size with seek(0, 2) & tell()",
      badge: "File Size",
      desc: "Moving the file pointer to the end of the file (whence=2) to calculate the exact file size in bytes.",
      code: `# Example 2: Measure exact file size in bytes
with open("barrackpore_hub.txt", "rb") as f:
    # Move pointer 0 bytes from the END of the file (os.SEEK_END = 2)
    f.seek(0, 2)
    file_size_bytes = f.tell()
    print(f"Total file size: {file_size_bytes} bytes")
    
    # Reset cursor back to start for subsequent reads
    f.seek(0)
    print("Cursor restored to offset:", f.tell())`,
      output: `Total file size: 68 bytes
Cursor restored to offset: 0`,
      keyTakeaway: "f.seek(0, 2) navigates directly to EOF. Calling f.tell() immediately yields the total byte length."
    },
    {
      num: 3,
      title: "Skipping File Headers & Metadata Banners",
      badge: "Skip Metadata",
      desc: "Advancing the file pointer past header comments and metadata blocks directly to the structured data rows.",
      code: `# Example 3: Skip header metadata lines
with open("dataset.csv", "r", encoding="utf-8") as f:
    # Skip first 3 metadata banner lines
    for _ in range(3):
        f.readline()
        
    data_start_offset = f.tell()
    print(f"Data rows start at byte offset: {data_start_offset}")
    
    # Read first real data line
    first_record = f.readline()
    print("First data record:", first_record.strip())`,
      output: `Data rows start at byte offset: 84
First data record: 101,Mamata,Barrackpore,4500`,
      keyTakeaway: "Capturing f.tell() after header ingestion allows future jobs to jump directly to data rows via f.seek()."
    },
    {
      num: 4,
      title: "In-Place Updates using Mode 'r+'",
      badge: "In-Place 'r+'",
      desc: "Overwriting specific fields in an existing file without rewriting the entire file from scratch.",
      code: `# Example 4: Surgical in-place status overwrite
# Original: "STATUS: [PENDING ] | Student: Mamata"
with open("ledger.txt", "r+", encoding="utf-8") as f:
    # Seek directly to byte offset 9 where 'PENDING ' starts
    f.seek(9)
    f.write("APPROVED")  # Overwrites 8 characters in-place

with open("ledger.txt", "r", encoding="utf-8") as f:
    print("Updated file:", f.read().strip())`,
      output: `Updated file: STATUS: [APPROVED] | Student: Mamata`,
      keyTakeaway: "Mode 'r+' opens for read/write without wiping data. f.seek() positions the write head for targeted in-place updates."
    },
    {
      num: 5,
      title: "Multi-Pass File Analysis without Re-opening",
      badge: "Multi-Pass",
      desc: "Performing multiple passes (e.g. counting lines in pass 1, calculating averages in pass 2) using f.seek(0).",
      code: `# Example 5: Two analytical passes on a single open file
with open("scores.txt", "r", encoding="utf-8") as f:
    # Pass 1: Count total student rows
    total_students = sum(1 for _ in f)
    print(f"Pass 1: Found {total_students} students.")
    
    # Rewind pointer for Pass 2
    f.seek(0)
    
    # Pass 2: Calculate average marks
    total_marks = sum(int(line.split(",")[1]) for line in f)
    avg_score = total_marks / total_students
    print(f"Pass 2: Average Score = {avg_score:.1f}%")`,
      output: `Pass 1: Found 4 students.
Pass 2: Average Score = 93.8%`,
      keyTakeaway: "f.seek(0) avoids repeated OS open/close system calls, saving file handle overhead on large datasets."
    },
    {
      num: 6,
      title: "Binary Mode Relative Seeking (SEEK_CUR)",
      badge: "Relative seek(1)",
      desc: "Opening in binary mode ('rb') and stepping forward relative to the current file pointer position (whence=1).",
      code: `import os

# Example 6: Relative seeking from current pointer (whence=1)
with open("records.bin", "rb") as f:
    # Skip 16-byte fixed header
    f.seek(16, os.SEEK_SET)  # Offset 16
    
    # Read Record 1 (16 bytes)
    rec1 = f.read(16)
    print("Read Record 1:", rec1)
    
    # Skip 4 padding bytes forward from CURRENT pointer position
    f.seek(4, os.SEEK_CUR)
    print("Pointer after relative +4 seek:", f.tell())  # Offset 36`,
      output: `Read Record 1: b'RECORD_001_DATA_'
Pointer after relative +4 seek: 36`,
      keyTakeaway: "whence=1 (os.SEEK_CUR) computes offsets relative to current position. Fully supported in binary mode ('rb')."
    },
    {
      num: 7,
      title: "Reading Last N Bytes from EOF (SEEK_END)",
      badge: "EOF seek(2)",
      desc: "Seeking backwards from the end of a file in binary mode (whence=2) to inspect the latest log entries.",
      code: `import os

# Example 7: Read last 30 bytes of a log file
with open("server.log", "rb") as f:
    # Seek -30 bytes relative to END of file (whence=2)
    f.seek(-30, os.SEEK_END)
    last_bytes = f.read()
    print("Tail output:", last_bytes.decode("utf-8").strip())`,
      output: `Tail output: CRITICAL ALERT ERROR 500`,
      keyTakeaway: "Negative offsets with whence=2 (os.SEEK_END) enable instant reverse log tailing in O(1) RAM."
    },
    {
      num: 8,
      title: "Building an Offset Index for O(1) Line Jumps",
      badge: "Line Indexing",
      desc: "Creating a hash map of {line_number: byte_offset} during pass 1 to jump directly to any line in O(1) time.",
      code: `# Example 8: Byte offset index table for large files
line_index = {}
with open("large_data.txt", "r", encoding="utf-8") as f:
    line_no = 1
    while True:
        pos = f.tell()
        line = f.readline()
        if not line:
            break
        line_index[line_no] = pos
        line_no += 1

# Instant direct jump to Line #3 without scanning Lines 1 & 2
with open("large_data.txt", "r", encoding="utf-8") as f:
    f.seek(line_index[3])
    print(f"Line 3 direct jump (Offset {line_index[3]}):", f.readline().strip())`,
      output: `Line 3 direct jump (Offset 74): Record 03: Susmita (Kolkata)`,
      keyTakeaway: "Indexing byte offsets enables sub-millisecond random line lookups without loading entire files into RAM."
    },
    {
      num: 9,
      title: "UTF-8 Multi-Byte Character Safety Rule",
      badge: "Unicode Gotcha",
      desc: "Understanding why seeking into the middle of a 3-byte or 4-byte UTF-8 character crashes with UnicodeDecodeError.",
      code: `# Example 9: Safe text seeking in multi-byte UTF-8 files
# Note: Indian Rupee symbol '₹' takes 3 bytes in UTF-8
text = "Student: Mamata | Fee: ₹4500"

with open("receipt.txt", "w", encoding="utf-8") as f:
    f.write(text)

with open("receipt.txt", "r", encoding="utf-8") as f:
    pos_start = f.tell()             # Byte 0
    segment = f.read(17)             # Reads "Student: Mamata |"
    pos_after = f.tell()             # Byte 17
    print(f"Read '{segment}' -> Pointer moved from {pos_start} to {pos_after}")
    
    # GOLDEN RULE: In text mode, only seek to 0, EOF, or positions returned by tell()!`,
      output: `Read 'Student: Mamata |' -> Pointer moved from 0 to 17`,
      keyTakeaway: "In UTF-8 text mode, never guess arbitrary byte numbers. Only seek to 0, EOF, or offsets captured from tell()."
    },
    {
      num: 10,
      title: "Fixed-Width Binary Struct Lookup Engine",
      badge: "Binary Struct",
      desc: "Directly accessing record N using arithmetic: seek(record_id * RECORD_SIZE) with Python's struct module.",
      code: `import struct

# Example 10: Fixed-width binary record engine (18 bytes per student)
# Format: integer ID (4 bytes) + 10-char name + integer score (4 bytes)
RECORD_FORMAT = "i10si"
RECORD_SIZE = struct.calcsize(RECORD_FORMAT)  # 18 bytes

# Instant jump to Student #2 (index 1 = Debangshu)
target_index = 1
with open("students.bin", "rb") as f:
    f.seek(target_index * RECORD_SIZE)
    packed_record = f.read(RECORD_SIZE)
    sid, sname, score = struct.unpack(RECORD_FORMAT, packed_record)
    print(f"Record {target_index}: ID={sid}, Name={sname.decode().strip()}, Score={score}%")`,
      output: `Record 1: ID=102, Name=Debangshu, Score=94%`,
      keyTakeaway: "Fixed-width binary formats enable true random access databases with seek(index * RECORD_SIZE)."
    }
  ];

  const currentSimple = simpleExamplesList.find((ex) => ex.num === selectedSimpleEx) || simpleExamplesList[0];

  const handleCopySimple = () => {
    navigator.clipboard.writeText(currentSimple.code);
    setCopiedSimpleEx(true);
    setTimeout(() => setCopiedSimpleEx(false), 2000);
  };

  // Lab 1 Handlers: Tape Simulator
  const handleTapeSeek = (newPos) => {
    const clampedPos = Math.max(0, Math.min(tapeTotalBytes, newPos));
    setTapePointerPos(clampedPos);
    setTapeLastReadText("");
  };

  const handleTapeRead = () => {
    const readEnd = Math.min(tapeTotalBytes, tapePointerPos + tapeReadLength);
    const chunk = tapeSampleData.slice(tapePointerPos, readEnd);
    setTapeLastReadText(chunk);
    setTapePointerPos(readEnd);
  };

  // Lab 2 Handlers: Whence Triad
  const calculateWhenceDestination = () => {
    let base = 0;
    if (whenceAnchor === 0) base = 0;
    else if (whenceAnchor === 1) base = whenceSimulatedCursor;
    else if (whenceAnchor === 2) base = whenceFileSize;

    const dest = base + whenceOffset;
    return dest;
  };

  const handleExecuteWhence = () => {
    setWhenceErrorAlert(null);
    if (whenceMode === "text" && whenceAnchor !== 0 && whenceOffset !== 0) {
      setWhenceErrorAlert("io.UnsupportedOperation: can't do nonzero cur-relative or end-relative seeks in text mode! Must use binary mode ('rb').");
      return;
    }
    const dest = calculateWhenceDestination();
    if (dest < 0) {
      setWhenceErrorAlert("ValueError: negative seek position not allowed!");
      return;
    }
    setWhenceSimulatedCursor(dest);
  };

  // Lab 3 Handlers: In-Place Surgery
  const handlePerformInplaceUpdate = () => {
    const activeStudentObj = inplaceRecords.find((r) => r.id === inplaceActiveStudent);
    if (!activeStudentObj) return;

    // Pad status to exact 8 characters
    const paddedStatus = inplaceSelectedStatus.padEnd(8, " ");
    
    setInplaceRecords((prev) =>
      prev.map((rec) =>
        rec.id === inplaceActiveStudent ? { ...rec, status: paddedStatus } : rec
      )
    );

    setInplaceLogHistory((prev) => [
      `[f.seek(${activeStudentObj.offset})] Overwrote byte offset ${activeStudentObj.offset} with '${paddedStatus.trim()}' for ID ${activeStudentObj.id} (${activeStudentObj.name})`,
      ...prev
    ]);
  };

  // Deep Code Showcase Data
  const codeModules = [
    {
      id: "ex1",
      title: "1. Pointer Basics & seek(0) Rewind",
      badge: "Core Mechanics",
      desc: "Inspecting cursor advancement with f.tell(), reading lines sequentially, and rewinding to offset 0 with f.seek(0).",
      codeModule: example1SeekTellBasics,
      highlights: [14, 27, 34, 43]
    },
    {
      id: "ex2",
      title: "2. Measuring File Size & Header Skipping",
      badge: "Navigation & Metadata",
      desc: "Using f.seek(0, 2) in binary mode to measure total byte size and skipping comment banners using tell() bookmarks.",
      codeModule: example2FilesizeAndSkip,
      highlights: [25, 33, 44]
    },
    {
      id: "ex3",
      title: "3. In-Place Updates with Mode 'r+'",
      badge: "Surgical Overwrite",
      desc: "Reading structured student ledger records, seeking to exact byte offsets, and overwriting status tags without rewriting.",
      codeModule: example3RplusInplaceUpdate,
      highlights: [19, 29, 36, 44]
    },
    {
      id: "ex4",
      title: "4. Binary Mode Relative Seeking (whence 1 & 2)",
      badge: "Binary Arithmetic",
      desc: "Mastering SEEK_SET, SEEK_CUR, and SEEK_END with Python's struct module for fixed-width binary records.",
      codeModule: example4BinaryRelativeSeeking,
      highlights: [18, 30, 37, 43]
    },
    {
      id: "ex5",
      title: "5. Fast Byte Offset Indexing for O(1) Jumps",
      badge: "Random Access Engine",
      desc: "Building a line offset lookup table {line_number: byte_offset} to achieve instant random line jumping.",
      codeModule: example5LineIndexRandomAccess,
      highlights: [22, 28, 38, 44]
    },
    {
      id: "ex6",
      title: "6. High-Performance Reverse Log Tailer",
      badge: "Industrial Tool",
      desc: "Reading backwards from EOF in chunks to extract trailing log lines with O(1) memory utilization.",
      codeModule: example6ReverseLogTailer,
      highlights: [18, 26, 33, 48]
    },
    {
      id: "ex10_master",
      title: "7. Master Script: 10 Simple Pointer Examples",
      badge: "10-in-1 Master",
      desc: "Complete runnable script containing all 10 simple tell() and seek() functions in one clean Python module.",
      codeModule: tenSimpleSeekTellCode,
      highlights: [14, 32, 48, 68, 86, 110, 128, 144, 172, 196]
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
        @keyframes pulsePointer {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(45, 212, 191, 0.6)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 16px rgba(45, 212, 191, 1)); }
        }
        .animate-pointer {
          animation: pulsePointer 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-teal-950/40">
            <span>🐍</span>
            <span>Python Masterclass · Module 002_008 · Topic 11</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            File Pointer Manipulation: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300">tell() &amp; seek()</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the file cursor: navigating byte streams with <code className="text-teal-300 font-mono">tell()</code>, repositioning with <code className="text-cyan-300 font-mono">seek(offset, whence)</code>, surgical in-place updates with mode <code className="text-amber-300 font-mono">'r+'</code>, and 10 practical real-world examples.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300 flex items-center gap-1.5">
              <span>📍</span> file.tell() → Byte Offset
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300 flex items-center gap-1.5">
              <span>🧭</span> file.seek(offset, whence)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-emerald-300 flex items-center gap-1.5">
              <span>💉</span> Mode 'r+' In-Place Overwrite
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
                Teacher's Concept Breakdown: The Tape Recorder Playhead Model
              </h2>
              <p className="text-xs text-slate-400">
                Detailed conceptual architecture by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Analogy Box */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>📼</span> The Cassette Tape &amp; Playhead Analogy
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                Think of an open file on your disk as a long magnetic cassette tape:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40 space-y-2">
                  <div className="font-bold text-teal-300 flex items-center gap-2">
                    <span className="text-base">📍</span> file.tell() — Reading the Counter
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <code className="text-teal-200 font-mono">f.tell()</code> is like looking at the digital tape counter. It tells you the exact byte distance from the beginning where the read/write head is currently hovering.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-2">
                  <div className="font-bold text-cyan-300 flex items-center gap-2">
                    <span className="text-base">⏩</span> file.seek(offset, whence) — Fast Forward &amp; Rewind
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <code className="text-cyan-200 font-mono">f.seek()</code> physically moves the playhead. Calling <code className="text-amber-200 font-mono">f.seek(0)</code> rewinds all the way back to the beginning of the song, so you can listen to it again from start!
                  </p>
                </div>
              </div>
            </div>

            {/* Whence Triad Table */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
                <span>🧭</span> The Three 'whence' Reference Anchors
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                      <th className="p-3">Whence Value</th>
                      <th className="p-3">Standard Constant</th>
                      <th className="p-3">Reference Anchor</th>
                      <th className="p-3">Text Mode Rules</th>
                      <th className="p-3">Binary Mode ('rb') Rules</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-teal-300 font-bold">0</td>
                      <td className="p-3 text-cyan-300">os.SEEK_SET</td>
                      <td className="p-3 text-amber-300">Start of File (Byte 0)</td>
                      <td className="p-3 text-emerald-300">Allowed (0 or tell() offsets)</td>
                      <td className="p-3 text-emerald-300">Full byte arithmetic supported</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-teal-300 font-bold">1</td>
                      <td className="p-3 text-cyan-300">os.SEEK_CUR</td>
                      <td className="p-3 text-amber-300">Current Pointer Position</td>
                      <td className="p-3 text-rose-400 font-bold">❌ Only offset=0 allowed</td>
                      <td className="p-3 text-emerald-300">Relative + / - shifts allowed</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-teal-300 font-bold">2</td>
                      <td className="p-3 text-cyan-300">os.SEEK_END</td>
                      <td className="p-3 text-amber-300">End of File (EOF)</td>
                      <td className="p-3 text-amber-300">Only seek(0, 2) allowed</td>
                      <td className="p-3 text-emerald-300">Negative offsets (seek(-N, 2)) allowed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2.5 ELABORATE TECHNICAL ARCHITECTURE & DEEP-DIVE ─ */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950 p-6 md:p-8 shadow-2xl shadow-cyan-950/20 space-y-8"
        >
          <div className="border-b border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono font-bold uppercase mb-2 border border-cyan-800">
              🔬 Deep-Dive Architectural Masterclass
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              File Pointer Mechanics: Under the Hood of Kernel Offsets &amp; Stream Buffers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              An elaborate technical breakdown of how operating system kernels, C runtime libraries, and the Python 3 <code className="text-cyan-300 font-mono">io</code> layer manage stream positions, coordinate system mathematics, and random access I/O.
            </p>
          </div>

          {/* Subsection 1: 3-Tier OS Architecture */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span>🏗️</span> 1. The 3-Tier Operating System I/O Stack
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When Python calls <code className="text-teal-300 font-mono">f.tell()</code> or <code className="text-cyan-300 font-mono">f.seek()</code>, operations travel through three distinct abstraction boundaries before reaching physical NVMe or SSD storage:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-teal-400 font-bold text-sm flex items-center gap-1.5">
                  <span>🐍</span> Tier 1: Python io Layer
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">
                  <code className="text-teal-200 font-mono">io.TextIOWrapper</code> or <code className="text-teal-200 font-mono">io.BufferedReader</code>. Manages internal user-space RAM cache (usually 8KB). Translates logical stream positions and tracks decoder states.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold text-sm flex items-center gap-1.5">
                  <span>📋</span> Tier 2: Process FD Table
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">
                  The OS process maintains a File Descriptor Table where integer handles (e.g. <code className="text-cyan-200 font-mono">fd = 3</code>) map to kernel file structures. Calling <code className="text-cyan-200 font-mono">seek()</code> issues the low-level <code className="text-cyan-200 font-mono">lseek()</code> syscall.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                  <span>💾</span> Tier 3: Kernel Open File Table
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">
                  The OS kernel stores the actual 64-bit cursor offset (<code className="text-amber-200 font-mono">f_pos</code>) in the vnode/inode table. When data is read or written, the kernel increments <code className="text-amber-200 font-mono">f_pos</code> automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection 2: Mathematical Coordinate Formalism */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span>🧮</span> 2. Mathematical Coordinate Space of 'whence'
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The target byte position in a file is calculated deterministically based on the chosen reference anchor:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-teal-800/60 space-y-2">
                <div className="text-teal-300 font-bold">whence = 0 (os.SEEK_SET)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-amber-300 text-center font-bold">
                  New_Pos = offset
                </div>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  Absolute offset from byte 0. Requires <code className="text-slate-300">offset &gt;= 0</code>. Negative values raise <code className="text-rose-400">ValueError</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/60 space-y-2">
                <div className="text-cyan-300 font-bold">whence = 1 (os.SEEK_CUR)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-amber-300 text-center font-bold">
                  New_Pos = Current_Pos + offset
                </div>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  Relative shift from current cursor. <code className="text-slate-300">+offset</code> jumps forward; <code className="text-slate-300">-offset</code> jumps backward.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-800/60 space-y-2">
                <div className="text-indigo-300 font-bold">whence = 2 (os.SEEK_END)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-amber-300 text-center font-bold">
                  New_Pos = File_Size + offset
                </div>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  Relative offset from EOF. To read the trailing 100 bytes, pass <code className="text-slate-300">offset = -100</code>.
                </p>
              </div>
            </div>

            {/* Sparse Files Note */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 font-mono uppercase">
                <span>⚡</span> Edge Case: Seeking Beyond End-of-File (Sparse Files)
              </span>
              <p className="text-slate-300 font-sans leading-relaxed">
                What happens if you seek to byte 1,000 on a 100-byte file? The OS allows it! If you read immediately, Python returns empty (<code className="text-teal-300 font-mono">b''</code>). But if you write data at offset 1,000, modern filesystems (NTFS, ext4, APFS) automatically fill the gap between byte 100 and 999 with <strong>null bytes (<code className="text-teal-300 font-mono">\x00</code>)</strong> without physically allocating empty disk blocks (creating a high-efficiency <em>Sparse File</em>).
              </p>
            </div>
          </div>

          {/* Subsection 3: The 4 Golden Laws of Text vs Binary Mode */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>⚖️</span> 3. The 4 Fundamental Laws of Text vs Binary Seeking
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-teal-300 font-mono text-sm">
                  Law #1: The Opaque Token Law (Text Mode tell())
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  In Python 3 text mode, the integer returned by <code className="text-teal-200 font-mono">f.tell()</code> is not a simple character counter—it is an opaque cookie containing encoded decoder state flags. You should <strong>never perform math</strong> on text-mode tell() cookies (e.g. <code className="text-rose-300 font-mono">f.seek(f.tell() + 5)</code> is invalid).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300 font-mono text-sm">
                  Law #2: The Multi-Byte Unicode Boundary Law
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  UTF-8 characters take between 1 and 4 bytes. English letters take 1 byte, Bengali/Devanagari characters (like 'ন' or '₹') take 3 bytes, and emojis take 4 bytes. Arbitrary byte seeking that lands in the middle of a 3-byte sequence immediately triggers fatal <code className="text-rose-400 font-mono">UnicodeDecodeError</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-300 font-mono text-sm">
                  Law #3: The Windows CRLF Translation Law
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  On Windows, lines on disk terminate with 2 bytes: carriage return + line feed (<code className="text-indigo-200 font-mono">\r\n</code>). In text mode, Python automatically normalizes this to a single <code className="text-indigo-200 font-mono">\n</code> in memory. Consequently, string character indices diverge from physical disk byte offsets unless opened with <code className="text-teal-300 font-mono">newline=''</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-amber-300 font-mono text-sm">
                  Law #4: The Binary Mode Arithmetic Law
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  In binary mode (<code className="text-amber-200 font-mono">'rb'</code> or <code className="text-amber-200 font-mono">'rb+'</code>), Python disables all encoding decoders and newline translations. Direct byte arithmetic, forward/backward relative seeking (<code className="text-amber-200 font-mono">whence=1</code> / <code className="text-amber-200 font-mono">whence=2</code>), and fixed-width struct stepping are 100% reliable.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection 4: 5 Industrial Design Patterns */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🚀</span> 4. 5 Production-Grade Industrial Pointer Patterns
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-teal-300">Pattern A: Zero-Overhead 2-Pass Parser</span>
                  <span className="text-slate-500">f.seek(0) Rewind</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Instead of closing and reopening a large CSV file (which triggers redundant filesystem open syscalls, permissions checks, and descriptor table reallocations), pass 1 counts total lines and validates schemas, then calls <code className="text-teal-300 font-mono">f.seek(0)</code> to execute pass 2 aggregation with instant CPU memory reset.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-cyan-300">Pattern B: Surgical In-Place Record Overwrites ('r+')</span>
                  <span className="text-slate-500">f.seek(offset) + f.write()</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  When updating a single student's status in a 1GB ledger from <code className="text-amber-300 font-mono">'PENDING '</code> to <code className="text-emerald-300 font-mono">'APPROVED'</code>, writing the whole 1GB file causes massive disk I/O thrashing. Opening in <code className="text-cyan-300 font-mono">'r+'</code>, seeking directly to the 8-byte status field, and writing 8 bytes completes in <strong>0.1 milliseconds</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-indigo-300">Pattern C: O(1) Binary Struct Random Access</span>
                  <span className="text-slate-500">f.seek(record_id * STRUCT_SIZE)</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  In high-performance telemetry and database engines, records are stored as fixed-width binary structs (e.g. 24 bytes). Seeking to record #50,000 is computed mathematically as <code className="text-indigo-300 font-mono">f.seek(50000 * 24)</code>, jumping instantly without scanning the first 49,999 records.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-amber-300">Pattern D: Reverse Log Tailer with O(1) RAM</span>
                  <span className="text-slate-500">f.seek(-chunk_size, os.SEEK_END)</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  To inspect the last 10 crash errors from a 20GB cloud server log, opening the file in binary mode and seeking backwards in 1KB chunks from EOF allows extracting the trailing lines while keeping memory usage strictly under <strong>2MB</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-emerald-300">Pattern E: Byte Offset Hash Index Table</span>
                  <span className="text-slate-500">&#123;line_no: byte_offset&#125;</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Building a compact in-memory index table of byte offsets during startup converts any sequential text file into a random-access database. Lookups for any arbitrary line execute via a single direct <code className="text-emerald-300 font-mono">f.seek(index[line_number])</code> jump.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection 5: Pre-Flight Developer Checklist */}
          <div className="p-5 rounded-xl bg-slate-950 border border-teal-500/30 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
              <span>✅</span> Pre-Flight Checklist for Senior Python Developers
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">1.</span>
                <span>Are you using binary mode (<code className="text-teal-200 font-mono">'rb'</code>/<code className="text-teal-200 font-mono">'rb+'</code>) whenever calculating relative byte offsets?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">2.</span>
                <span>In text mode, are you strictly restricting <code className="text-teal-200 font-mono">seek()</code> targets to 0, EOF, or values returned by <code className="text-teal-200 font-mono">tell()</code>?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">3.</span>
                <span>When performing in-place updates with <code className="text-teal-200 font-mono">'r+'</code>, are replacement strings padded to match exact field byte widths?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">4.</span>
                <span>If working on Windows with CSV files, did you specify <code className="text-teal-200 font-mono">newline=''</code> to prevent CRLF offset distortion?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">5.</span>
                <span>If sharing a file descriptor across threads, have you guarded pointer movements with a <code className="text-teal-200 font-mono">threading.Lock()</code>?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">6.</span>
                <span>Have you verified whether the underlying stream supports random seeking via <code className="text-teal-200 font-mono">f.seekable()</code>?</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. 10 SIMPLE & ESSENTIAL SEEK & TELL EXAMPLES ──── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💡</span> 10 Simple tell() &amp; seek() Examples (Beginner to Intermediate)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Click on any scenario below to view the Python code, live console output, and key architectural takeaways.
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
              </div>

              <button
                onClick={handleCopySimple}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
              >
                <span>{copiedSimpleEx ? "✓ Copied!" : "📋 Copy Code"}</span>
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentSimple.desc}
            </p>

            {/* Code View */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Python Implementation:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed shadow-inner">
                {currentSimple.code}
              </pre>
            </div>

            {/* Output & Key Takeaways */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-wider">
                  🖥️ Expected Console Output:
                </span>
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {currentSimple.output}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/50 space-y-2">
                <span className="text-teal-300 font-bold uppercase tracking-wider">
                  🎯 Key Architectural Takeaway:
                </span>
                <p className="text-slate-200 font-sans leading-relaxed text-sm">
                  {currentSimple.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. INTERACTIVE WORKBENCH: THE FILE POINTER FLIGHT SIMULATOR */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">🎛️</span> Interactive Python Workbench: The File Pointer Flight Simulator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Interact with live stream playheads, whence calculations, in-place ledger surgeries, and O(1) line indexing.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setWorkbenchTab("tape")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "tape"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. Tape &amp; tell()
              </button>
              <button
                onClick={() => setWorkbenchTab("whence")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "whence"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. Whence Triad
              </button>
              <button
                onClick={() => setWorkbenchTab("inplace")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "inplace"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. In-Place 'r+'
              </button>
              <button
                onClick={() => setWorkbenchTab("indexer")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "indexer"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                4. O(1) Line Indexer
              </button>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* LAB 1: Pointer Tape & tell() */}
            {workbenchTab === "tape" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
                    <span>📍</span> Lab 1: Byte Stream Tape &amp; Cursor Visualizer
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    File Size: {tapeTotalBytes} bytes
                  </span>
                </div>

                {/* Tape Filmstrip */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Offset 0 (Start)</span>
                    <span className="text-teal-300 font-bold">f.tell() = {tapePointerPos} bytes</span>
                    <span>Offset {tapeTotalBytes} (EOF)</span>
                  </div>

                  {/* Visual Byte Filmstrip */}
                  <div className="relative p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
                    <div className="flex items-center gap-1 font-mono text-xs select-none">
                      {tapeSampleData.split("").map((ch, idx) => (
                        <div
                          key={idx}
                          className={clsx(
                            "w-6 h-8 rounded flex items-center justify-center border text-[11px] transition-all",
                            idx < tapePointerPos
                              ? "bg-slate-900/80 border-slate-800 text-slate-500"
                              : idx === tapePointerPos
                              ? "bg-teal-500 text-slate-950 font-black border-teal-300 scale-110 shadow-lg shadow-teal-500/50 z-10"
                              : "bg-slate-900 border-slate-800/60 text-slate-300"
                          )}
                          title={`Byte #${idx}: '${ch}'`}
                        >
                          {ch === " " ? "␣" : ch}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <label className="text-xs font-mono text-slate-300 block">
                      Reposition Pointer via Seek Slider: <code className="text-teal-300">f.seek({tapePointerPos})</code>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={tapeTotalBytes}
                      value={tapePointerPos}
                      onChange={(e) => handleTapeSeek(parseInt(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTapeSeek(0)}
                        className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-teal-300"
                      >
                        f.seek(0) [Rewind]
                      </button>
                      <button
                        onClick={() => handleTapeSeek(21)}
                        className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300"
                      >
                        Seek Debangshu (21)
                      </button>
                      <button
                        onClick={() => handleTapeSeek(tapeTotalBytes)}
                        className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-amber-300"
                      >
                        f.seek(0, 2) [EOF]
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-300">
                        Read next {tapeReadLength} bytes:
                      </span>
                      <button
                        onClick={handleTapeRead}
                        disabled={tapePointerPos >= tapeTotalBytes}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold transition-colors"
                      >
                        f.read({tapeReadLength})
                      </button>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs">
                      <span className="text-slate-500">Read buffer output: </span>
                      <span className="text-emerald-300 font-bold">
                        {tapeLastReadText ? `"${tapeLastReadText}"` : "(No read action executed yet)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: Whence Triad */}
            {workbenchTab === "whence" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                    <span>🧭</span> Lab 2: The Whence Triad Flight Calculator
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span>Mode:</span>
                    <button
                      onClick={() => setWhenceMode("binary")}
                      className={clsx(
                        "px-2 py-0.5 rounded border",
                        whenceMode === "binary" ? "bg-cyan-950 text-cyan-300 border-cyan-500 font-bold" : "text-slate-500 border-slate-800"
                      )}
                    >
                      'rb' (Binary)
                    </button>
                    <button
                      onClick={() => setWhenceMode("text")}
                      className={clsx(
                        "px-2 py-0.5 rounded border",
                        whenceMode === "text" ? "bg-amber-950 text-amber-300 border-amber-500 font-bold" : "text-slate-500 border-slate-800"
                      )}
                    >
                      'r' (Text)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Anchor selection */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-slate-400 block">1. Select 'whence' Anchor:</span>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => setWhenceAnchor(0)}
                        className={clsx(
                          "w-full p-2 rounded text-left font-mono text-xs border transition-all",
                          whenceAnchor === 0 ? "bg-teal-950 border-teal-500 text-teal-200 font-bold" : "border-slate-800 text-slate-400"
                        )}
                      >
                        whence=0 (os.SEEK_SET) [Start: Byte 0]
                      </button>
                      <button
                        onClick={() => setWhenceAnchor(1)}
                        className={clsx(
                          "w-full p-2 rounded text-left font-mono text-xs border transition-all",
                          whenceAnchor === 1 ? "bg-cyan-950 border-cyan-500 text-cyan-200 font-bold" : "border-slate-800 text-slate-400"
                        )}
                      >
                        whence=1 (os.SEEK_CUR) [Current: Byte {whenceSimulatedCursor}]
                      </button>
                      <button
                        onClick={() => setWhenceAnchor(2)}
                        className={clsx(
                          "w-full p-2 rounded text-left font-mono text-xs border transition-all",
                          whenceAnchor === 2 ? "bg-indigo-950 border-indigo-500 text-indigo-200 font-bold" : "border-slate-800 text-slate-400"
                        )}
                      >
                        whence=2 (os.SEEK_END) [EOF: Byte {whenceFileSize}]
                      </button>
                    </div>
                  </div>

                  {/* Offset slider */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono text-slate-400 block">2. Offset Delta: <code className="text-teal-300 font-bold">{whenceOffset} bytes</code></span>
                    <input
                      type="range"
                      min={whenceAnchor === 2 ? -whenceFileSize : -30}
                      max={whenceAnchor === 2 ? 0 : 30}
                      value={whenceOffset}
                      onChange={(e) => setWhenceOffset(parseInt(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                    <div className="text-[11px] text-slate-400 font-mono">
                      Calculated Destination: <span className="text-emerald-300 font-bold">{calculateWhenceDestination()} bytes</span>
                    </div>
                    <button
                      onClick={handleExecuteWhence}
                      className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-md shadow-cyan-950"
                    >
                      Execute f.seek({whenceOffset}, {whenceAnchor})
                    </button>
                  </div>

                  {/* Live Code & Error Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                    <span className="text-slate-400 block">3. Python Expression:</span>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-teal-300">
                      f.seek({whenceOffset}, {whenceAnchor === 0 ? "os.SEEK_SET" : whenceAnchor === 1 ? "os.SEEK_CUR" : "os.SEEK_END"})
                    </div>
                    <div className="text-[11px] text-slate-300 pt-1">
                      Current Pointer Location: <span className="text-cyan-300 font-bold">{whenceSimulatedCursor} bytes</span>
                    </div>
                    {whenceErrorAlert && (
                      <div className="p-2.5 rounded bg-rose-950/80 border border-rose-700 text-rose-300 text-[11px] leading-relaxed">
                        ⚠️ {whenceErrorAlert}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: In-Place Surgery 'r+' */}
            {workbenchTab === "inplace" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <span>💉</span> Lab 3: In-Place Ledger Surgery with Mode 'r+'
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    Mode: open("ledger.txt", "r+", encoding="utf-8")
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ledger Display */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-wider block">
                      Disk Ledger (Fixed-Width Bytes):
                    </span>
                    <div className="space-y-2">
                      {inplaceRecords.map((rec) => (
                        <div
                          key={rec.id}
                          className={clsx(
                            "p-3 rounded-lg border transition-all flex justify-between items-center",
                            inplaceActiveStudent === rec.id
                              ? "bg-slate-900 border-amber-500 shadow-md shadow-amber-950/40"
                              : "bg-slate-900/50 border-slate-800"
                          )}
                        >
                          <div>
                            <span className="text-slate-500">[{rec.id}] </span>
                            <span className="text-white font-bold">{rec.name} </span>
                            <span className="text-slate-400">({rec.center})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500">Offset {rec.offset}</span>
                            <span
                              className={clsx(
                                "px-2 py-0.5 rounded text-[10px] font-bold",
                                rec.status.includes("APPROVED")
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                  : rec.status.includes("REJECTED")
                                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                                  : "bg-amber-950 text-amber-300 border border-amber-800"
                              )}
                            >
                              {rec.status.trim()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Surgical Controller */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Target &amp; Overwrite Controls:
                    </span>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 block">Select Student Target:</label>
                      <select
                        value={inplaceActiveStudent}
                        onChange={(e) => setInplaceActiveStudent(parseInt(e.target.value))}
                        className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200"
                      >
                        {inplaceRecords.map((r) => (
                          <option key={r.id} value={r.id}>
                            ID {r.id} - {r.name} (Offset {r.offset})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 block">New Status Tag (8 Bytes):</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["APPROVED", "REJECTED", "PAID    "].map((st) => (
                          <button
                            key={st}
                            onClick={() => setInplaceSelectedStatus(st)}
                            className={clsx(
                              "p-1.5 rounded text-xs font-mono font-bold border transition-all",
                              inplaceSelectedStatus === st
                                ? "bg-amber-950 border-amber-500 text-amber-200"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                            )}
                          >
                            {st.trim()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handlePerformInplaceUpdate}
                      className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-amber-950"
                    >
                      f.seek(offset) &amp; f.write('{inplaceSelectedStatus.trim()}')
                    </button>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-400 max-h-20 overflow-y-auto space-y-1">
                      {inplaceLogHistory.map((log, idx) => (
                        <div key={idx}>• {log}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: O(1) Line Indexer */}
            {workbenchTab === "indexer" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                    <span>⚡</span> Lab 4: O(1) Sub-Millisecond Line Indexer
                  </h3>
                  <span className="text-xs font-mono text-teal-400">
                    Hash Index: &#123;line_no: byte_offset&#125;
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Index Map */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-wider block">
                      In-Memory Byte Offset Index Table:
                    </span>
                    <div className="space-y-1.5">
                      {indexerSampleLines.map((row) => (
                        <button
                          key={row.line}
                          onClick={() => setIndexerActiveLine(row.line)}
                          className={clsx(
                            "w-full p-2 rounded-lg border text-left flex justify-between items-center transition-all",
                            indexerActiveLine === row.line
                              ? "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold"
                              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
                          )}
                        >
                          <span>Line #{String(row.line).padStart(2, "0")}</span>
                          <span className="text-teal-400">f.seek({row.offset})</span>
                          <span className="text-[10px] text-slate-500">{row.length} bytes</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Direct Jump Viewer */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-wider block">
                      Simulated Direct Seek Jump:
                    </span>
                    
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                      <div className="text-slate-400">
                        1. Calling: <code className="text-teal-300 font-bold">f.seek(index[{indexerActiveLine}])</code> (Offset {indexerSampleLines.find(r => r.line === indexerActiveLine)?.offset} bytes)
                      </div>
                      <div className="text-slate-400">
                        2. Calling: <code className="text-cyan-300 font-bold">f.readline()</code>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 space-y-1">
                      <span className="text-emerald-400 font-bold block">Instant Retrieved Row (O(1) Access):</span>
                      <p className="text-slate-200 font-sans text-sm font-semibold">
                        {indexerSampleLines.find(r => r.line === indexerActiveLine)?.text}
                      </p>
                    </div>

                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      💡 Even in a 50GB file with 10 million lines, accessing Line 5,000,000 takes under <strong>1 millisecond</strong> because the disk controller seeks directly to the byte offset without scanning intermediate rows!
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ─── 5. ARCHITECTURAL SVGS ──────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-teal-400">📐</span> File Pointer Navigation Architecture &amp; Lifecycle
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Visualizing the byte coordinate system, whence reference points, and UTF-8 encoding stream safety.
            </p>
          </div>

          {/* SVG 1: Pointer Coordinates & Whence Anchors */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
              <span>🧭</span> Diagram 1: The 'whence' Coordinate Anchor Grid
            </h3>
            
            <div className="overflow-x-auto">
              <svg viewBox="0 0 900 320" className="w-full min-w-[700px] h-auto font-mono text-xs">
                {/* Background Grid */}
                <rect x="20" y="20" width="860" height="280" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />
                
                {/* File Stream Bar */}
                <rect x="60" y="110" width="780" height="48" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                
                {/* Byte Marks */}
                {[0, 100, 200, 300, 400, 500, 600, 700, 780].map((b, i) => (
                  <g key={i} transform={`translate(${60 + b}, 110)`}>
                    <line x1="0" y1="0" x2="0" y2="48" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="4" y="62" fill="#64748b" fontSize="10">{b}B</text>
                  </g>
                ))}

                {/* Sample Content Inside Tape */}
                <text x="90" y="140" fill="#94a3b8" fontSize="12">Record 1 (Mamata: ₹4500)</text>
                <text x="320" y="140" fill="#94a3b8" fontSize="12">Record 2 (Debangshu: ₹5200)</text>
                <text x="590" y="140" fill="#94a3b8" fontSize="12">Record 3 (Susmita: ₹6000)</text>

                {/* Anchor 0: SEEK_SET */}
                <g transform="translate(60, 50)">
                  <circle cx="0" cy="0" r="6" fill="#14b8a6" />
                  <path d="M0,0 L0,52" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)" />
                  <text x="10" y="4" fill="#2dd4bf" fontWeight="bold" fontSize="11">whence=0 (os.SEEK_SET)</text>
                  <text x="10" y="18" fill="#94a3b8" fontSize="10">Offset from Start (Byte 0)</text>
                </g>

                {/* Anchor 1: SEEK_CUR */}
                <g transform="translate(420, 210)">
                  <circle cx="0" cy="0" r="6" fill="#38bdf8" />
                  <path d="M0,0 L0,-45" stroke="#38bdf8" strokeWidth="2" />
                  <text x="10" y="8" fill="#38bdf8" fontWeight="bold" fontSize="11">whence=1 (os.SEEK_CUR)</text>
                  <text x="10" y="22" fill="#94a3b8" fontSize="10">Relative from Current (+/- N)</text>
                </g>

                {/* Anchor 2: SEEK_END */}
                <g transform="translate(840, 50)">
                  <circle cx="0" cy="0" r="6" fill="#f59e0b" />
                  <path d="M0,0 L0,52" stroke="#f59e0b" strokeWidth="2" />
                  <text x="-160" y="4" fill="#fbbf24" fontWeight="bold" fontSize="11">whence=2 (os.SEEK_END)</text>
                  <text x="-160" y="18" fill="#94a3b8" fontSize="10">Relative from EOF (-N Bytes)</text>
                </g>

                {/* Playhead Pointer */}
                <g transform="translate(420, 95)" className="animate-pointer">
                  <polygon points="-8,-14 8,-14 0,0" fill="#2dd4bf" stroke="#99f6e4" strokeWidth="1.5" />
                  <text x="-45" y="-20" fill="#2dd4bf" fontWeight="bold" fontSize="11">Active Pointer (tell() = 360)</text>
                </g>
              </svg>
            </div>
          </div>

          {/* SVG 2: Multi-Byte UTF-8 Decoding Boundary */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>⚠️</span> Diagram 2: UTF-8 Variable-Length Multi-Byte Seeking Pitfall
            </h3>
            
            <div className="overflow-x-auto">
              <svg viewBox="0 0 900 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <rect x="20" y="20" width="860" height="200" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />
                
                {/* ASCII Character (1 Byte) */}
                <g transform="translate(60, 60)">
                  <rect x="0" y="0" width="80" height="60" rx="6" fill="#064e3b" stroke="#059669" strokeWidth="1.5" />
                  <text x="40" y="32" fill="#6ee7b7" fontWeight="bold" fontSize="14" textAnchor="middle">'M'</text>
                  <text x="40" y="50" fill="#a7f3d0" fontSize="9" textAnchor="middle">1 Byte (ASCII)</text>
                  <text x="40" y="80" fill="#64748b" fontSize="10" textAnchor="middle">Byte #0</text>
                </g>

                {/* Rupee Symbol ₹ (3 Bytes) */}
                <g transform="translate(160, 60)">
                  <rect x="0" y="0" width="240" height="60" rx="6" fill="#451a03" stroke="#d97706" strokeWidth="1.5" />
                  <text x="120" y="32" fill="#fde68a" fontWeight="bold" fontSize="14" textAnchor="middle">'₹' (Rupee Symbol)</text>
                  <text x="120" y="50" fill="#fef3c7" fontSize="9" textAnchor="middle">3 Bytes in UTF-8 (\xe2 \x82 \xb9)</text>
                  
                  {/* 3 internal slices */}
                  <line x1="80" y1="0" x2="80" y2="60" stroke="#b45309" strokeDasharray="2 2" />
                  <line x1="160" y1="0" x2="160" y2="60" stroke="#b45309" strokeDasharray="2 2" />
                  
                  <text x="40" y="80" fill="#64748b" fontSize="10" textAnchor="middle">Byte #1</text>
                  <text x="120" y="80" fill="#f87171" fontSize="10" textAnchor="middle">Byte #2 (MID)</text>
                  <text x="200" y="80" fill="#f87171" fontSize="10" textAnchor="middle">Byte #3 (MID)</text>
                </g>

                {/* Emoji Character (4 Bytes) */}
                <g transform="translate(420, 60)">
                  <rect x="0" y="0" width="320" height="60" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="160" y="32" fill="#c7d2fe" fontWeight="bold" fontSize="14" textAnchor="middle">'🐍' (Python Emoji)</text>
                  <text x="160" y="50" fill="#e0e7ff" fontSize="9" textAnchor="middle">4 Bytes in UTF-8 (\xf0 \x9f \x90 \x8d)</text>
                  <text x="160" y="80" fill="#64748b" fontSize="10" textAnchor="middle">Bytes #4, #5, #6, #7</text>
                </g>

                {/* Danger Callout */}
                <g transform="translate(160, 165)">
                  <rect x="0" y="0" width="680" height="35" rx="6" fill="#4c0519" stroke="#be123c" strokeWidth="1" />
                  <text x="20" y="22" fill="#fecdd3" fontSize="11">
                    🚨 CRITICAL: Calling f.seek(2) lands in the middle of '₹' -> Raises UnicodeDecodeError in text mode!
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── 6. CODE MODULE SHOWCASE (7 PYTHON MODULES) ──────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">📦</span> Deep Code Modules: Production Reference Scripts
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Explore 7 production-grade scripts demonstrating pointer navigation, in-place updates, binary struct arithmetic, and reverse log tailing.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-mono font-bold">
              7 Python Files
            </span>
          </div>

          {/* Code Module Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {codeModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveCodeTab(mod.id)}
                className={clsx(
                  "p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between",
                  activeCodeTab === mod.id
                    ? "bg-teal-950 border-teal-500 text-teal-200 shadow-md shadow-teal-950"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                <span className="text-[10px] font-mono text-teal-400 font-bold">{mod.badge}</span>
                <span className="font-semibold mt-1 line-clamp-1">{mod.title}</span>
              </button>
            ))}
          </div>

          {/* Active Python File Loader */}
          {(() => {
            const activeMod = codeModules.find((m) => m.id === activeCodeTab) || codeModules[0];
            return (
              <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-6 md:p-8 space-y-4 shadow-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeMod.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{activeMod.desc}</p>
                </div>
                
                <PythonFileLoader
                  code={activeMod.codeModule}
                  fileName={`${activeMod.id}.py`}
                  highlightLines={activeMod.highlights}
                />
              </div>
            );
          })()}
        </section>

        {/* ─── 7. REAL-WORLD REGIONAL CASE STUDIES ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">🏭</span> West Bengal Industry Case Studies
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              How students and engineers across Barrackpore, Kolkata, Jadavpur, and Salt Lake use tell() &amp; seek().
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-300 text-sm">Barrackpore Education Ledger</span>
                <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-400 text-[10px] font-mono">In-Place 'r+'</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Mamata</strong> manages an active student registry of 25,000 students. Instead of rewriting the entire 500MB ledger on every fee confirmation, she uses <code className="text-teal-300 font-mono">f.seek(student_offset)</code> with mode <code className="text-teal-300 font-mono">'r+'</code> to surgically update payment status tags in 0.2 milliseconds.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 text-sm">Jadavpur Cloud Cluster Monitor</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono">Reverse Tailer</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> built a real-time alerting microservice for university compute clusters. By seeking backwards from <code className="text-cyan-300 font-mono">os.SEEK_END</code> in 1KB chunks, his daemon inspects the latest critical errors without ever loading multi-gigabyte log files into server RAM.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300 text-sm">Salt Lake Sector V Banking Indexer</span>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 text-[10px] font-mono">O(1) Line Index</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Susmita</strong> created an instant ledger lookup engine for high-frequency financial CSV records. During startup, the service indexes <code className="text-indigo-300 font-mono">tell()</code> byte offsets for all 10 million transactions, providing sub-millisecond query responses for auditors.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-sm">Ichapur Municipal Utility Database</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-mono">Binary Struct</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Mahima</strong> structured municipal water and electricity meter records into 24-byte binary structs. Using <code className="text-amber-300 font-mono">f.seek(consumer_id * 24)</code>, utility billing clerks can look up or update any resident's consumption instantly.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 8. SENIOR PITFALLS & DEFENSIVE CODING ───────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-rose-400">🛡️</span> Senior Pitfalls &amp; Defensive Coding Standards
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Critical gotchas that lead to data corruption, encoding errors, and performance degradation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Relative Seeking with Non-Zero Offsets in Text Mode
              </div>
              <p className="text-slate-300 leading-relaxed">
                Calling <code className="text-rose-200 font-mono">f.seek(10, 1)</code> or <code className="text-rose-200 font-mono">f.seek(-5, 2)</code> on text streams raises <code className="text-rose-200 font-mono">io.UnsupportedOperation</code> in Python 3.
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: Always open in binary mode ('rb' / 'rb+') for relative offset calculations!
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Splitting Multi-Byte UTF-8 Characters
              </div>
              <p className="text-slate-300 leading-relaxed">
                Seeking to an arbitrary byte offset inside a 3-byte Bengali character or 4-byte emoji splits the byte sequence, causing immediate <code className="text-rose-200 font-mono">UnicodeDecodeError</code>.
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: In text mode, only seek to 0, EOF, or offsets captured from f.tell().
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Overwriting with Shorter/Longer Strings in 'r+' Mode
              </div>
              <p className="text-slate-300 leading-relaxed">
                In-place writing does NOT shift neighboring bytes. If you replace 8 bytes with 5 bytes, the trailing 3 original characters will remain visible on disk as garbage data!
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: Always pad replacement fields to match the exact fixed width (e.g. str.padEnd(8)).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Windows CRLF ('\r\n') Offset Mismatch
              </div>
              <p className="text-slate-300 leading-relaxed">
                On Windows, newlines take 2 bytes on disk ('\r\n') but appear as 1 character in Python. This causes character length arithmetic to diverge from byte offsets.
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: Specify newline='' when exact disk byte tracking is required.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. TEACHER & NOTE SECTION ──────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <Teacher
            quote="The file pointer is your direct physical probe into disk storage. In text mode, treat tell() offsets as sacred bookmarks. In binary mode, embrace the mathematical precision of byte arithmetic. Master tell() and seek(), and you master true random-access I/O!"
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINT NOTE ───────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint content={noteText} />
        </section>

        {/* ─── 11. FAQ TEMPLATE (30 EXAM QUESTIONS) ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Topic 11: File Pointer Manipulation (tell & seek) – FAQ & Exam Bank"
            questions={questions}
          />
        </section>

        {/* ─── 12. Footer Section ─────────────────────────────── */}
        <footer className="max-w-5xl mx-auto text-center border-t border-slate-800/80 pt-8 pb-12 text-xs text-slate-400">
          <p>
            Python Masterclass · Module 002_008 · Developed by{" "}
            <span className="text-teal-400 font-semibold">Sukanta Hui</span> (Coder &amp; AccoTax, Barrackpore)
          </p>
          <p className="mt-1">
            Persisting and Navigating Structured Data with Modern Python 3.12+
          </p>
        </footer>

      </div>
    </>
  );
};

export default Topic11;
