import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";

// ─── Topic 12 Data & Code Imports ──────────────────────────────────────
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

import tenSimpleBytesCode from "./topic12_files/ten_simple_bytes_examples.py?raw";
import example1BytesBasics from "./topic12_files/example1_bytes_basics.py?raw";
import example2BytearrayMutation from "./topic12_files/example2_bytearray_mutation.py?raw";
import example3MagicNumbers from "./topic12_files/example3_magic_numbers.py?raw";
import example4ChunkedFileCloner from "./topic12_files/example4_chunked_file_cloner.py?raw";
import example5XorCryptoBytearray from "./topic12_files/example5_xor_crypto_bytearray.py?raw";
import example6MemoryviewZerocopy from "./topic12_files/example6_memoryview_zerocopy.py?raw";

/**
 * Topic12 – Working with Bytes & Bytearray for Binary Files
 * Module: 002_008_file-handling (File Handling & Persistence (Text, CSV & JSON))
 * Track: Python from Basic to Pro
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with 10 Simple Binary Examples,
 *                        4-Lab Binary Hex Workbench, 2 Architectural SVGs,
 *                        6 In-Depth Python Code Modules, FAQs, and ASCII Notes.
 */
const Topic12 = () => {
  // ─── 10 Simple Examples State ─────────────────────────────────────────
  const [selectedSimpleEx, setSelectedSimpleEx] = useState(1);
  const [copiedSimpleEx, setCopiedSimpleEx] = useState(false);

  // ─── Workbench State ──────────────────────────────────────────────────
  const [workbenchTab, setWorkbenchTab] = useState("hex"); // "hex" | "mutation" | "magic" | "xor"

  // Lab 1: Hex Dump Inspector State
  const [hexInputText, setHexInputText] = useState("Coder & AccoTax Barrackpore Hub 2026");
  const [selectedByteIdx, setSelectedByteIdx] = useState(0);

  // Lab 2: Bytearray In-Place Mutation State
  const [mutationStatus, setMutationStatus] = useState("APPROVED");
  const [mutationVersion, setMutationVersion] = useState("2");
  const [mutationHistory, setMutationHistory] = useState([
    "Initial bytearray buffer created in memory (No disk allocation)."
  ]);

  // Lab 3: Magic Number Identifier State
  const [magicFilePreset, setMagicFilePreset] = useState("png");

  // Lab 4: In-Place XOR Cryptography State
  const [xorSecretKey, setXorSecretKey] = useState(90); // 0x5A
  const [xorOriginalText, setXorOriginalText] = useState("Mamata: 98/100 | Fee: Rs.4500");
  const [xorIsEncrypted, setXorIsEncrypted] = useState(false);

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
      title: "Creating Bytes Literals & Writing ('wb')",
      badge: "Bytes Literal",
      desc: "Creating raw immutable bytes with the b'...' literal syntax and writing directly to disk using mode 'wb'.",
      code: `# Example 1: Write raw immutable bytes to a binary file
raw_data = b"Coder & AccoTax\\x00\\x01\\x02\\xFFBarrackpore"

with open("output.bin", "wb") as f:
    bytes_written = f.write(raw_data)
    print(f"Wrote {bytes_written} raw bytes to disk.")`,
      output: `Wrote 30 raw bytes to disk.`,
      keyTakeaway: "Mode 'wb' writes raw byte streams directly to disk without any UTF-8 encoding or newline translation."
    },
    {
      num: 2,
      title: "Reading Binary Data & Integer Indexing ('rb')",
      badge: "Integer Indexing",
      desc: "Opening binary files in 'rb' mode and inspecting byte integer values (0-255) vs bytes slices.",
      code: `# Example 2: Read bytes and inspect byte integers
with open("output.bin", "rb") as f:
    data = f.read()
    print("Total Bytes:", len(data))
    
    # CRITICAL: data[0] returns an INTEGER (0-255), data[0:1] returns BYTES
    first_byte = data[0]
    print(f"data[0] -> Integer: {first_byte} (ASCII '{chr(first_byte)}')")
    print(f"data[0:5] -> Bytes slice: {data[0:5]}")`,
      output: `Total Bytes: 30
data[0] -> Integer: 67 (ASCII 'C')
data[0:5] -> Bytes slice: b'Coder'`,
      keyTakeaway: "Indexing a bytes object (b[0]) yields an integer (0-255); slice notation (b[0:1]) yields a bytes object."
    },
    {
      num: 3,
      title: "String to Bytes Encoding & Decoding",
      badge: "UTF-8 Bridge",
      desc: "Converting Unicode text to bytes using .encode('utf-8') and reconstructing strings with .decode('utf-8').",
      code: `# Example 3: String to bytes encode and decode
student_record = "Student: Mamata | Center: Barrackpore | Fee: Rs.4500"

# 1. Encode Unicode string into raw UTF-8 bytes
encoded_bytes = student_record.encode("utf-8")
with open("student.dat", "wb") as f:
    f.write(encoded_bytes)

# 2. Read bytes and decode back into Unicode string
with open("student.dat", "rb") as f:
    raw_payload = f.read()
    restored_text = raw_payload.decode("utf-8")
    print("Decoded text:", restored_text)`,
      output: `Decoded text: Student: Mamata | Center: Barrackpore | Fee: Rs.4500`,
      keyTakeaway: "Always use explicit encodings (e.g. 'utf-8') when converting between strings and binary bytes."
    },
    {
      num: 4,
      title: "In-Place Mutation with Mutable bytearray",
      badge: "Mutable bytearray",
      desc: "Modifying specific bytes and slices in-place without creating a new copy in memory.",
      code: `# Example 4: In-place byte mutation using bytearray
header = bytearray(b"STATUS:[PENDING ]-ID:101-NAME:MAMATA")
print("Original:", header.decode("latin1"))

# In-place replace 'PENDING ' (offset 8) with 'APPROVED'
header[8:16] = b"APPROVED"
print("Mutated :", header.decode("latin1"))

with open("header.bin", "wb") as f:
    f.write(header)`,
      output: `Original: STATUS:[PENDING ]-ID:101-NAME:MAMATA
Mutated : STATUS:[APPROVED]-ID:101-NAME:MAMATA`,
      keyTakeaway: "Unlike immutable bytes, bytearray allows in-place element assignment and slice substitution."
    },
    {
      num: 5,
      title: "Hexadecimal Conversion (hex() & fromhex())",
      badge: "Hex Strings",
      desc: "Converting human-readable hexadecimal strings to raw bytes and vice-versa.",
      code: `# Example 5: Hex strings to bytes and back
hex_data = "48656c6c6f204261727261636b706f7265"  # 'Hello Barrackpore'

# Convert Hex to bytes
binary_data = bytes.fromhex(hex_data)
print("Binary data:", binary_data)

# Convert bytes back to Hex
print("Hex format :", binary_data.hex())`,
      output: `Binary data: b'Hello Barrackpore'
Hex format : 48656c6c6f204261727261636b706f7265`,
      keyTakeaway: "bytes.fromhex() and b.hex() provide fast two-way conversions between binary streams and hex strings."
    },
    {
      num: 6,
      title: "Magic Number File Format Identification",
      badge: "Magic Numbers",
      desc: "Validating real file types (PNG, JPEG, PDF, ZIP) by inspecting the leading 4-8 signature bytes.",
      code: `# Example 6: Validate PNG file signature
# PNG magic number: \\x89 P N G \\r \\n \\x1a \\n
with open("sample.png", "wb") as f:
    f.write(b"\\x89PNG\\r\\n\\x1a\\n\\x00\\x00\\x00\\rIHDR")

with open("sample.png", "rb") as f:
    signature = f.read(8)
    if signature == b"\\x89PNG\\r\\n\\x1a\\n":
        print("Verified: Valid PNG Image File!")
    else:
        print("Invalid file signature.")`,
      output: `Verified: Valid PNG Image File!`,
      keyTakeaway: "Inspect the first 4 to 8 bytes in 'rb' mode to identify real file formats regardless of file extensions."
    },
    {
      num: 7,
      title: "High-Speed Chunked Binary File Cloning",
      badge: "Chunked Stream",
      desc: "Cloning arbitrary binary files in 64KB chunks to keep memory consumption at O(1) constant size.",
      code: `# Example 7: High-performance chunked file cloner
CHUNK_SIZE = 64 * 1024  # 64 KB chunks

with open("source.iso", "rb") as src, open("clone.iso", "wb") as dst:
    while True:
        chunk = src.read(CHUNK_SIZE)
        if not chunk:
            break
        dst.write(chunk)

print("Binary file cloned successfully in 64KB chunks.")`,
      output: `Binary file cloned successfully in 64KB chunks.`,
      keyTakeaway: "Reading in chunks prevents MemoryError crashes when copying or streaming multi-gigabyte files."
    },
    {
      num: 8,
      title: "In-Place XOR Binary Encryption & Decryption",
      badge: "XOR Crypto",
      desc: "Encrypting and decrypting sensitive binary payloads using symmetric XOR bitwise operations on bytearray.",
      code: `# Example 8: Symmetric XOR encryption on bytearray
KEY = 0x5A  # Secret key byte
data = bytearray(b"Barrackpore Confidential Exam 2026")

# Encrypt in-place
for i in range(len(data)):
    data[i] ^= KEY
print("Encrypted Hex:", data.hex()[:32], "...")

# Decrypt in-place (XOR again with same key)
for i in range(len(data)):
    data[i] ^= KEY
print("Decrypted Text:", data.decode("utf-8"))`,
      output: `Encrypted Hex: 183b28283b3931203528...
Decrypted Text: Barrackpore Confidential Exam 2026`,
      keyTakeaway: "Bitwise XOR with the same key restores original data: (A ^ K) ^ K = A, executing 100% in-place."
    },
    {
      num: 9,
      title: "Generating a Minimal Raw BMP Image",
      badge: "Raw BMP File",
      desc: "Constructing a valid 2x2 pixel 24-bit RGB bitmap file directly from packed header bytes.",
      code: `# Example 9: Create a 2x2 pixel BMP image from raw bytes
# 54-byte BMP Header + 16-byte BGR Pixel rows with padding
bmp_header = bytes.fromhex(
    "424d46000000000000003600000028000000"
    "020000000200000001001800000000001000"
    "0000130b0000130b00000000000000000000"
)
pixel_data = bytes.fromhex(
    "ff00000000ff0000"  # Blue, Red + padding
    "00ff00ffffff0000"  # Green, White + padding
)

with open("pixel_art.bmp", "wb") as f:
    f.write(bmp_header + pixel_data)

print("Created 70-byte valid BMP image file.")`,
      output: `Created 70-byte valid BMP image file.`,
      keyTakeaway: "Direct byte writing allows creating valid image, audio, and container formats from pure Python code."
    },
    {
      num: 10,
      title: "Zero-Copy Slicing with memoryview",
      badge: "Zero-Copy",
      desc: "Slicing and modifying binary buffer segments without RAM reallocation using Python's memoryview.",
      code: `# Example 10: Zero-copy buffer slicing with memoryview
buffer = bytearray(b"HEADER_V1.0_STUDENT_MAMATA_FEE_4500")

# Wrap in zero-copy memoryview
mv = memoryview(buffer)

# Modify version slice directly without creating a new copy
mv[7:11] = b"V2.5"

print("Modified original buffer in-place:")
print(buffer.decode("latin1"))`,
      output: `Modified original buffer in-place:
HEADER_V2.5_STUDENT_MAMATA_FEE_4500`,
      keyTakeaway: "memoryview avoids memory duplication by creating a direct window over existing binary buffers."
    }
  ];

  const currentSimple = simpleExamplesList.find((ex) => ex.num === selectedSimpleEx) || simpleExamplesList[0];

  const handleCopySimple = () => {
    navigator.clipboard.writeText(currentSimple.code);
    setCopiedSimpleEx(true);
    setTimeout(() => setCopiedSimpleEx(false), 2000);
  };

  // Lab 1: Hex Dump Generator
  const getHexDumpRows = () => {
    const encoder = new TextEncoder();
    const bytesArr = encoder.encode(hexInputText);
    const rows = [];
    for (let i = 0; i < bytesArr.length; i += 16) {
      const slice = bytesArr.slice(i, i + 16);
      rows.push({
        offset: i,
        bytes: Array.from(slice),
        ascii: Array.from(slice).map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
      });
    }
    return { rows, totalBytes: bytesArr.length, rawBytes: Array.from(bytesArr) };
  };

  const hexData = getHexDumpRows();
  const selectedByteVal = hexData.rawBytes[selectedByteIdx] ?? 65;

  // Lab 2: Mutation Handlers
  const handlePerformMutation = (field, val) => {
    if (field === "status") {
      setMutationStatus(val);
      setMutationHistory((prev) => [
        `[In-Place Slice] buffer[8:16] = b'${val.padEnd(8, " ")}' -> Mutated status tag without memory copy.`,
        ...prev
      ]);
    } else if (field === "version") {
      setMutationVersion(val);
      setMutationHistory((prev) => [
        `[In-Place Byte] buffer[9] = ord('${val}') (${val.charCodeAt(0)}) -> Mutated version integer directly.`,
        ...prev
      ]);
    }
  };

  // Lab 3: Magic Signatures Data
  const magicSignaturesMap = {
    png: { name: "PNG Image", ext: ".png", magicHex: "89 50 4E 47 0D 0A 1A 0A", ascii: "‰PNG....", desc: "Portable Network Graphics image" },
    jpeg: { name: "JPEG Image", ext: ".jpg", magicHex: "FF D8 FF E0", ascii: "ÿØÿà", desc: "Joint Photographic Experts Group image" },
    pdf: { name: "PDF Document", ext: ".pdf", magicHex: "25 50 44 46 2D", ascii: "%PDF-", desc: "Adobe Portable Document Format" },
    zip: { name: "ZIP Archive", ext: ".zip", magicHex: "50 4B 03 04", ascii: "PK..", desc: "PKZIP compressed container (used in DOCX/XLSX/JAR)" },
    gif: { name: "GIF89a Image", ext: ".gif", magicHex: "47 49 46 38 39 61", ascii: "GIF89a", desc: "Graphics Interchange Format animated image" },
    exe: { name: "Windows PE Executable", ext: ".exe", magicHex: "4D 5A", ascii: "MZ", desc: "DOS MZ / Windows Portable Executable" }
  };

  // Lab 4: XOR Cryptography Handlers
  const handleToggleXor = () => {
    setXorIsEncrypted(!xorIsEncrypted);
  };

  const calculateXorOutput = () => {
    const encoder = new TextEncoder();
    const raw = encoder.encode(xorOriginalText);
    const xorBytes = Array.from(raw).map((b) => b ^ xorSecretKey);
    const hex = xorBytes.map((b) => b.toString(16).padStart(2, "0")).join(" ");
    
    // Decoded preview (latin1 representation)
    const preview = xorBytes.map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "·")).join("");
    return { hex, preview, rawXor: xorBytes };
  };

  const xorComputed = calculateXorOutput();

  // Deep Code Showcase Data
  const codeModules = [
    {
      id: "ex1",
      title: "1. Raw Bytes Literals & Hex Representation",
      badge: "Core Basics",
      desc: "Creating bytes literals, inspecting integer indexing (b[0] -> int), and writing raw bytes with mode 'wb'.",
      codeModule: example1BytesBasics,
      highlights: [14, 25, 33, 40]
    },
    {
      id: "ex2",
      title: "2. In-Place Binary Mutation with bytearray",
      badge: "Mutable Buffers",
      desc: "Mutating bytes in-place, slice replacements, and dynamic checksum calculation without copying memory.",
      codeModule: example2BytearrayMutation,
      highlights: [13, 20, 27, 36]
    },
    {
      id: "ex3",
      title: "3. File Signature & Magic Number Validator",
      badge: "Security & Validation",
      desc: "Detecting true file formats (PNG, JPEG, PDF, ZIP) by inspecting the leading binary header bytes.",
      codeModule: example3MagicNumbers,
      highlights: [13, 24, 38]
    },
    {
      id: "ex4",
      title: "4. Chunked Binary File Stream Cloner",
      badge: "High-Speed I/O",
      desc: "Copying multi-gigabyte binary files in fixed 64KB chunks with SHA-256 integrity streaming in O(1) RAM.",
      codeModule: example4ChunkedFileCloner,
      highlights: [14, 23, 35]
    },
    {
      id: "ex5",
      title: "5. In-Place XOR Binary Stream Encryption",
      badge: "Binary Cryptography",
      desc: "Encrypting and decrypting sensitive student files using multi-byte symmetric bitwise XOR on bytearray.",
      codeModule: example5XorCryptoBytearray,
      highlights: [13, 24, 38]
    },
    {
      id: "ex6",
      title: "6. Zero-Copy Slicing with memoryview",
      badge: "Zero-Allocation",
      desc: "Wrapping bytearray in memoryview for ultra-high-performance zero-copy slicing and buffer manipulation.",
      codeModule: example6MemoryviewZerocopy,
      highlights: [14, 22, 28, 36]
    },
    {
      id: "ex10_master",
      title: "7. Master Script: 10 Simple Bytes Examples",
      badge: "10-in-1 Master",
      desc: "Complete runnable script containing all 10 simple bytes and bytearray functions in one clean Python module.",
      codeModule: tenSimpleBytesCode,
      highlights: [12, 24, 37, 56, 73, 90, 112, 131, 149, 172]
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
        @keyframes pulseHex {
          0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.4)); }
          50% { opacity: 1; filter: drop-shadow(0 0 14px rgba(14, 165, 233, 0.9)); }
        }
        .animate-hex {
          animation: pulseHex 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-950/40">
            <span>🐍</span>
            <span>Python Masterclass · Module 002_008 · Topic 12</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Working with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Bytes &amp; Bytearray</span> for Binary Files
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master raw binary I/O: understanding immutable <code className="text-cyan-300 font-mono">bytes</code> vs mutable <code className="text-teal-300 font-mono">bytearray</code>, hex conversions, file magic signatures, zero-copy <code className="text-amber-300 font-mono">memoryview</code>, and 10 practical real-world examples.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300 flex items-center gap-1.5">
              <span>🔢</span> bytes (Immutable 0-255)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300 flex items-center gap-1.5">
              <span>🛠️</span> bytearray (Mutable In-Place)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300 flex items-center gap-1.5">
              <span>🛡️</span> Magic Number Validation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300 flex items-center gap-1.5">
              <span>⚡</span> 10 Simple Examples Included
            </span>
          </div>
        </header>

        {/* ─── 2. Classroom Teacher Masterclass Section ───────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-cyan-950/20"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-xl border border-cyan-500/30">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Teacher's Concept Breakdown: Text Streams vs Binary Hardware Octets
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
                <span>🧱</span> The Stone Tablet vs Clay Mold Analogy
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                When working with low-level binary data in Python, understand the two fundamental container types:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-2">
                  <div className="font-bold text-cyan-300 flex items-center gap-2">
                    <span className="text-base">🗿</span> 'bytes' (Immutable Stone Carving)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    A <code className="text-cyan-200 font-mono">bytes</code> object is like a carved stone tablet. Once written, individual bytes can never be altered. If you want to change one letter, you must carve an entirely new stone tablet in RAM!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40 space-y-2">
                  <div className="font-bold text-teal-300 flex items-center gap-2">
                    <span className="text-base">🏺</span> 'bytearray' (Mutable Soft Clay)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    A <code className="text-teal-200 font-mono">bytearray</code> is like soft clay. You can reshape individual bytes (<code className="text-teal-200 font-mono">ba[0] = 74</code>), slice out blocks, append new data, and overwrite packet headers in-place with <strong>zero extra memory allocation</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Rules Table */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <span>📊</span> Key Structural Differences: bytes vs bytearray
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                      <th className="p-3">Property</th>
                      <th className="p-3">bytes Type (b'...')</th>
                      <th className="p-3">bytearray Type</th>
                      <th className="p-3">Performance &amp; Memory Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-cyan-300 font-bold">Mutability</td>
                      <td className="p-3 text-rose-400 font-bold">Immutable (Read-Only)</td>
                      <td className="p-3 text-emerald-300 font-bold">Mutable (In-Place Edit)</td>
                      <td className="p-3 text-slate-300">bytearray avoids RAM reallocations on edits</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-cyan-300 font-bold">Indexing (data[0])</td>
                      <td className="p-3 text-amber-300">Integer (0 to 255)</td>
                      <td className="p-3 text-amber-300">Integer (0 to 255)</td>
                      <td className="p-3 text-slate-300">Both return raw unsigned 8-bit integer values</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-cyan-300 font-bold">Hashable / Dict Key</td>
                      <td className="p-3 text-emerald-300 font-bold">Yes (Can be dict key / set item)</td>
                      <td className="p-3 text-rose-400 font-bold">No (TypeError: unhashable)</td>
                      <td className="p-3 text-slate-300">Use bytes for fixed keys, bytearray for processing</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 text-cyan-300 font-bold">Methods Supported</td>
                      <td className="p-3 text-slate-300">find, split, replace, hex, decode</td>
                      <td className="p-3 text-teal-300">All bytes methods + append, extend, insert, pop, reverse</td>
                      <td className="p-3 text-slate-300">bytearray behaves like a mutable list of bytes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. 10 SIMPLE & ESSENTIAL BYTES EXAMPLES ────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">💡</span> 10 Simple Bytes &amp; Bytearray Examples (Beginner to Intermediate)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Click on any scenario below to view the Python code, console output, and key architectural takeaways.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
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
                    ? "bg-cyan-950/90 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/50 scale-[1.02]"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400">#{ex.num}</span>
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
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
                    Example #{currentSimple.num}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 text-xs font-mono">
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
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
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

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 space-y-2">
                <span className="text-cyan-300 font-bold uppercase tracking-wider">
                  🎯 Key Architectural Takeaway:
                </span>
                <p className="text-slate-200 font-sans leading-relaxed text-sm">
                  {currentSimple.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. INTERACTIVE WORKBENCH: THE BINARY HEX & BYTEARRAY FORGE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">🎛️</span> Interactive Python Workbench: The Binary Hex &amp; Bytearray Forge
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Explore live 16-byte hex dumps, in-place bytearray slice surgeries, magic number scanners, and XOR cryptography.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setWorkbenchTab("hex")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "hex"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. Hex Dump Inspector
              </button>
              <button
                onClick={() => setWorkbenchTab("mutation")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "mutation"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. In-Place Surgery
              </button>
              <button
                onClick={() => setWorkbenchTab("magic")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "magic"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Magic Validator
              </button>
              <button
                onClick={() => setWorkbenchTab("xor")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  workbenchTab === "xor"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                4. XOR Crypto Engine
              </button>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* LAB 1: Hex Dump Inspector */}
            {workbenchTab === "hex" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                    <span>🔍</span> Lab 1: Interactive 16-Byte Hex Dump &amp; Integer Inspector
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Total: {hexData.totalBytes} bytes
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 block">
                    Type text to encode into raw binary stream:
                  </label>
                  <input
                    type="text"
                    value={hexInputText}
                    onChange={(e) => {
                      setHexInputText(e.target.value);
                      setSelectedByteIdx(0);
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Hex Dump Table */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto font-mono text-xs space-y-2 shadow-inner">
                  <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-900 flex justify-between">
                    <span>OFFSET (HEX)</span>
                    <span>HEX VALUES (00 to 0F)</span>
                    <span>ASCII DECODED</span>
                  </div>

                  {hexData.rows.map((row) => (
                    <div key={row.offset} className="flex justify-between items-center py-1 hover:bg-slate-900/50 rounded px-1">
                      <span className="text-slate-500">
                        {row.offset.toString(16).padStart(8, "0").toUpperCase()}
                      </span>

                      {/* Hex bytes */}
                      <div className="flex gap-1.5">
                        {row.bytes.map((b, i) => {
                          const globalIdx = row.offset + i;
                          const isSelected = selectedByteIdx === globalIdx;
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedByteIdx(globalIdx)}
                              className={clsx(
                                "w-6 h-6 rounded text-center text-[11px] transition-all",
                                isSelected
                                  ? "bg-cyan-500 text-slate-950 font-black scale-110 shadow-md shadow-cyan-500/50"
                                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                              )}
                              title={`Byte #${globalIdx}: Dec=${b}, Hex=${b.toString(16).toUpperCase()}`}
                            >
                              {b.toString(16).padStart(2, "0").toUpperCase()}
                            </button>
                          );
                        })}
                      </div>

                      {/* ASCII side */}
                      <span className="text-emerald-400 font-bold tracking-widest">
                        {row.ascii.join("")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Selected Byte Detail Inspector */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Byte Index:</span>
                    <span className="text-cyan-300 font-bold text-sm">#{selectedByteIdx}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Decimal (data[{selectedByteIdx}]):</span>
                    <span className="text-emerald-300 font-bold text-sm">{selectedByteVal}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Hex Value:</span>
                    <span className="text-amber-300 font-bold text-sm">0x{selectedByteVal.toString(16).toUpperCase().padStart(2, "0")}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">8-Bit Binary:</span>
                    <span className="text-cyan-300 font-bold text-sm">{selectedByteVal.toString(2).padStart(8, "0")}₂</span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: Bytearray In-Place Mutation */}
            {workbenchTab === "mutation" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
                    <span>🛠️</span> Lab 2: In-Place bytearray Buffer Surgery
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    Memory Allocation: O(1) Zero-Copy
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Visual Buffer */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-wider block">
                      Active In-Memory bytearray:
                    </span>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="text-slate-500 text-[11px]">ASCII String Representation:</div>
                      <div className="text-white text-sm font-bold tracking-wider">
                        STATUS:[<span className="text-amber-400">{mutationStatus.padEnd(8, " ")}</span>]-V{mutationVersion}.0-STUDENT:MAMATA
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1 text-[11px] text-slate-400">
                      <div>• Status Slice <code className="text-teal-300">ba[8:16]</code> = <code className="text-amber-300">b'{mutationStatus.padEnd(8, " ")}'</code></div>
                      <div>• Version Byte <code className="text-teal-300">ba[19]</code> = <code className="text-cyan-300">{mutationVersion.charCodeAt(0)} (ord('{mutationVersion}'))</code></div>
                    </div>
                  </div>

                  {/* Surgical Controller */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      In-Place Mutation Controls:
                    </span>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 block">1. Mutate Status Slice in-place (8 bytes):</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["APPROVED", "REJECTED", "PENDING "].map((st) => (
                          <button
                            key={st}
                            onClick={() => handlePerformMutation("status", st.trim())}
                            className={clsx(
                              "p-2 rounded-lg text-xs font-mono font-bold border transition-all",
                              mutationStatus === st.trim()
                                ? "bg-teal-950 border-teal-500 text-teal-200"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                            )}
                          >
                            {st.trim()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 block">2. Mutate Version Byte (Single Integer 0-255):</label>
                      <div className="flex gap-2">
                        {["1", "2", "3", "9"].map((v) => (
                          <button
                            key={v}
                            onClick={() => handlePerformMutation("version", v)}
                            className={clsx(
                              "flex-1 p-1.5 rounded-lg text-xs font-mono font-bold border transition-all",
                              mutationVersion === v
                                ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                            )}
                          >
                            V{v}.0
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-400 max-h-24 overflow-y-auto space-y-1">
                      {mutationHistory.map((h, i) => (
                        <div key={i}>• {h}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: Magic Validator */}
            {workbenchTab === "magic" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
                    <span>🛡️</span> Lab 3: File Format Magic Number &amp; Signature Validator
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    Header Offset: 0x00000000
                  </span>
                </div>

                {/* Format Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {Object.entries(magicSignaturesMap).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setMagicFilePreset(key)}
                      className={clsx(
                        "p-2.5 rounded-xl text-center border text-xs font-mono transition-all",
                        magicFilePreset === key
                          ? "bg-indigo-950 border-indigo-500 text-indigo-200 font-bold shadow-md shadow-indigo-950"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      <div className="text-[10px] text-slate-500">{item.ext}</div>
                      <div className="font-bold mt-0.5">{item.name.split(" ")[0]}</div>
                    </button>
                  ))}
                </div>

                {/* Magic Detail Card */}
                {(() => {
                  const currentPreset = magicSignaturesMap[magicFilePreset] || magicSignaturesMap.png;
                  return (
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                        <div>
                          <span className="text-white font-bold text-sm">{currentPreset.name}</span>
                          <p className="text-slate-400 text-xs font-sans mt-0.5">{currentPreset.desc}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold">
                          Signature Match 100%
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                          <span className="text-slate-500 text-[10px] uppercase">Magic Bytes (Hex Signature):</span>
                          <div className="text-amber-300 font-black text-sm tracking-wider">
                            {currentPreset.magicHex}
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                          <span className="text-slate-500 text-[10px] uppercase">ASCII Representation:</span>
                          <div className="text-emerald-300 font-bold text-sm tracking-wider">
                            {currentPreset.ascii}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 text-xs font-mono">
                        <span className="text-teal-400 font-bold">Python Inspection Code:</span>
                        <div className="text-cyan-300 mt-1">
                          with open("file{currentPreset.ext}", "rb") as f:<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;sig = f.read({currentPreset.magicHex.split(" ").length})<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;assert sig.hex().upper() == "{currentPreset.magicHex.replace(/\s+/g, "")}"
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* LAB 4: In-Place XOR Cryptography */}
            {workbenchTab === "xor" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <span>🔐</span> Lab 4: In-Place Symmetric XOR Binary Stream Cryptography
                  </h3>
                  <span className="text-xs font-mono text-teal-400">
                    Symmetric: (A ^ K) ^ K = A
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Input & Key Controls */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <label className="text-slate-400 block">Plaintext Payload to Encrypt:</label>
                    <input
                      type="text"
                      value={xorOriginalText}
                      onChange={(e) => setXorOriginalText(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />

                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Secret XOR Key Byte:</span>
                        <span className="text-amber-300 font-bold">
                          {xorSecretKey} (0x{xorSecretKey.toString(16).toUpperCase().padStart(2, "0")})
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={255}
                        value={xorSecretKey}
                        onChange={(e) => setXorSecretKey(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <button
                      onClick={handleToggleXor}
                      className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-amber-950"
                    >
                      {xorIsEncrypted ? "↺ Decrypt Stream (XOR with Key)" : "🔒 Encrypt Stream (XOR with Key)"}
                    </button>
                  </div>

                  {/* Right: Cryptographic Transformation Output */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-wider block">
                      Stream State: {xorIsEncrypted ? "🔒 ENCRYPTED CIPHERTEXT" : "📄 PLAINTEXT STREAM"}
                    </span>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-500 text-[10px]">Hex Byte Output:</span>
                      <div className="text-amber-300 font-mono text-xs break-all leading-relaxed max-h-16 overflow-y-auto">
                        {xorIsEncrypted ? xorComputed.hex : xorOriginalText.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-500 text-[10px]">ASCII / Decoded View:</span>
                      <div className="text-emerald-300 font-bold text-xs">
                        {xorIsEncrypted ? xorComputed.preview : xorOriginalText}
                      </div>
                    </div>

                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      💡 Applying the exact same XOR bitwise loop with Key <code className="text-amber-300 font-mono">0x{xorSecretKey.toString(16).toUpperCase()}</code> completely restores the original bytes with zero information loss!
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
              <span className="text-cyan-400">📐</span> Binary Memory Architecture &amp; Encoding Lifecycle
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Visualizing the byte integer memory layout, single indexing vs slicing, and the Unicode-to-Bytes UTF-8 bridge.
            </p>
          </div>

          {/* SVG 1: Binary Memory & Indexing */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🧠</span> Diagram 1: Bytes Memory Layout, Integer Indexing &amp; Slices
            </h3>
            
            <div className="overflow-x-auto">
              <svg viewBox="0 0 900 280" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <rect x="20" y="20" width="860" height="240" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />
                
                {/* 6 Memory Cells */}
                {[
                  { idx: 0, char: "C", dec: 67, hex: "0x43", bin: "01000011" },
                  { idx: 1, char: "o", dec: 111, hex: "0x6F", bin: "01101111" },
                  { idx: 2, char: "d", dec: 100, hex: "0x64", bin: "01100100" },
                  { idx: 3, char: "e", dec: 101, hex: "0x65", bin: "01100101" },
                  { idx: 4, char: "r", dec: 114, hex: "0x72", bin: "01110010" },
                  { idx: 5, char: "\\x00", dec: 0, hex: "0x00", bin: "00000000" }
                ].map((c, i) => (
                  <g key={i} transform={`translate(${60 + i * 130}, 60)`}>
                    <rect x="0" y="0" width="115" height="110" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    
                    {/* Index Tag */}
                    <rect x="0" y="0" width="115" height="24" rx="10" fill="#1e293b" />
                    <text x="57" y="16" fill="#94a3b8" fontSize="11" textAnchor="middle">Index [{c.idx}]</text>
                    
                    {/* Character */}
                    <text x="57" y="52" fill="#38bdf8" fontWeight="bold" fontSize="16" textAnchor="middle">{c.char}</text>
                    
                    {/* Dec & Hex */}
                    <text x="57" y="74" fill="#a7f3d0" fontSize="10" textAnchor="middle">Dec: {c.dec} ({c.hex})</text>
                    
                    {/* 8-bit binary */}
                    <text x="57" y="94" fill="#64748b" fontSize="9" textAnchor="middle">{c.bin}₂</text>
                  </g>
                ))}

                {/* Pointer Callouts */}
                <g transform="translate(60, 200)">
                  <rect x="0" y="0" width="375" height="40" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="1" />
                  <text x="15" y="24" fill="#6ee7b7" fontSize="11">
                    📌 data[0] &rarr; Returns INTEGER: <strong>67</strong> (Not b'C')
                  </text>
                </g>

                <g transform="translate(465, 200)">
                  <rect x="0" y="0" width="375" height="40" rx="8" fill="#0c4a6e" stroke="#0284c7" strokeWidth="1" />
                  <text x="15" y="24" fill="#7dd3fc" fontSize="11">
                    ✂️ data[0:5] &rarr; Returns BYTES slice: <strong>b'Coder'</strong>
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* SVG 2: Unicode to UTF-8 Bridge */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
              <span>🌉</span> Diagram 2: The String Unicode $\longleftrightarrow$ UTF-8 Byte Stream Bridge
            </h3>
            
            <div className="overflow-x-auto">
              <svg viewBox="0 0 900 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <rect x="20" y="20" width="860" height="180" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="2" />
                
                {/* Text String Side */}
                <g transform="translate(60, 60)">
                  <rect x="0" y="0" width="260" height="100" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#c7d2fe" fontWeight="bold" fontSize="13">Unicode String (str)</text>
                  <text x="20" y="55" fill="#a5b4fc" fontSize="11">"Mamata | ₹4,500"</text>
                  <text x="20" y="80" fill="#6366f1" fontSize="10">Abstract Code Points (U+20B9)</text>
                </g>

                {/* Bridge Arrows */}
                <g transform="translate(340, 75)">
                  {/* Encode arrow */}
                  <line x1="0" y1="15" x2="200" y2="15" stroke="#14b8a6" strokeWidth="2.5" />
                  <polygon points="205,15 195,10 195,20" fill="#14b8a6" />
                  <text x="100" y="8" fill="#2dd4bf" fontSize="10" textAnchor="middle" fontWeight="bold">.encode('utf-8')</text>

                  {/* Decode arrow */}
                  <line x1="205" y1="50" x2="5" y2="50" stroke="#38bdf8" strokeWidth="2.5" />
                  <polygon points="0,50 10,45 10,55" fill="#38bdf8" />
                  <text x="100" y="68" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">.decode('utf-8')</text>
                </g>

                {/* Raw Bytes Side */}
                <g transform="translate(560, 60)">
                  <rect x="0" y="0" width="280" height="100" rx="12" fill="#042f2e" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#99f6e4" fontWeight="bold" fontSize="13">Raw Bytes Stream (bytes)</text>
                  <text x="20" y="55" fill="#5eead4" fontSize="10">b'Mamata | \\xe2\\x82\\xb94,500'</text>
                  <text x="20" y="80" fill="#14b8a6" fontSize="10">Hardware 8-bit Octets on Disk</text>
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
                <span className="text-cyan-400">📦</span> Deep Code Modules: Production Reference Scripts
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Explore 7 production-grade scripts covering bytes literals, in-place bytearray mutation, magic number verification, chunked cloning, and XOR crypto.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
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
                    ? "bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{mod.badge}</span>
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
              How engineering teams in Barrackpore, Jadavpur, Salt Lake, and Ichapur leverage bytes &amp; bytearray.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 text-sm">Barrackpore Biometric Security</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono">BLOB Packets</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Mamata</strong> engineered a high-speed fingerprint scanner ingestion daemon. By reading raw 512-byte sensor packets in mode <code className="text-cyan-300 font-mono">'rb'</code>, she parses student fingerprint templates directly into SQLite BLOB storage with sub-millisecond response times.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-300 text-sm">Jadavpur Satellite Imagery Pipeline</span>
                <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-400 text-[10px] font-mono">Chunk Cloner</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> built a multi-spectral raster processor for agricultural satellite imaging. By streaming 4GB TIFF files in 64KB chunks with <code className="text-teal-300 font-mono">iter(lambda: f.read(chunk), b'')</code>, his cluster processes gigabytes without exceeding 16MB of RAM.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300 text-sm">Salt Lake Sector V ATM Cryptography</span>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 text-[10px] font-mono">In-Place XOR</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Susmita</strong> designed a lightweight in-place binary stream encryptor for ATM transaction receipts. Using <code className="text-indigo-300 font-mono">bytearray</code> in-place bitwise XOR operations, payment logs are scrambled before transmission without allocating redundant memory buffers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-sm">Ichapur IoT Water Metering</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-mono">Binary Structs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Mahima</strong> created automated telemetry collectors parsing 24-byte telemetry packets sent by municipal water flow sensors over LoRaWAN, validating magic packet headers and CRC checksums in real-time.
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
              Critical gotchas that lead to data corruption, memory exhaustion, and type mismatch exceptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Opening Binary Files in Text Mode ('r' or 'w')
              </div>
              <p className="text-slate-300 leading-relaxed">
                Reading PNGs, PDFs, or ZIPs in text mode causes immediate <code className="text-rose-200 font-mono">UnicodeDecodeError</code> crashes and corrupts raw byte values due to OS newline translation.
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: Always specify 'rb', 'wb', or 'ab' when opening binary files!
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Assigning Out-of-Range Integers to bytearray
              </div>
              <p className="text-slate-300 leading-relaxed">
                Executing <code className="text-rose-200 font-mono">ba[0] = 300</code> or <code className="text-rose-200 font-mono">ba[0] = -1</code> raises <code className="text-rose-200 font-mono">ValueError: byte must be in range(0, 256)</code>.
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: Ensure byte assignments are strictly between 0 and 255 (unsigned 8-bit).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Loading Multi-Gigabyte Binary Files into RAM
              </div>
              <p className="text-slate-300 leading-relaxed">
                Calling <code className="text-rose-200 font-mono">f.read()</code> on a 10GB database or video file attempts to allocate 10GB of contiguous RAM, causing instantaneous <code className="text-rose-200 font-mono">MemoryError</code>.
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: Stream data in 64KB or 1MB chunks using iter(lambda: f.read(chunk), b'').
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Pitfall: Assuming b[0] Returns a 1-Byte bytes Object
              </div>
              <p className="text-slate-300 leading-relaxed">
                In Python 3, <code className="text-rose-200 font-mono">b[0]</code> returns an <code className="text-rose-200 font-mono">int</code> (e.g. 65 for 'A'). Comparing <code className="text-rose-200 font-mono">b[0] == b'A'</code> evaluates to <code className="text-rose-200 font-mono">False</code>!
              </p>
              <div className="p-2 rounded bg-slate-950 border border-rose-900/50 text-emerald-300 font-mono">
                Cure: Use b[0] == 65 or slice b[0:1] == b'A'.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. TEACHER & NOTE SECTION ──────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <Teacher
            quote="Binary I/O gives you direct mastery over hardware and raw disk memory. Treat bytes as mathematical integers, stream large payloads in chunks, and use bytearray for in-place surgeries. Master binary streams, and you master high-performance computing!"
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINT NOTE ───────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint content={noteText} />
        </section>

        {/* ─── 11. FAQ TEMPLATE (30 EXAM QUESTIONS) ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Topic 12: Working with Bytes & Bytearray – FAQ & Exam Bank"
            questions={questions}
          />
        </section>

        {/* ─── 12. Footer Section ─────────────────────────────── */}
        <footer className="max-w-5xl mx-auto text-center border-t border-slate-800/80 pt-8 pb-12 text-xs text-slate-400">
          <p>
            Python Masterclass · Module 002_008 · Developed by{" "}
            <span className="text-cyan-400 font-semibold">Sukanta Hui</span> (Coder &amp; AccoTax, Barrackpore)
          </p>
          <p className="mt-1">
            Persisting and Manipulating Raw Binary Streams with Modern Python 3.12+
          </p>
        </footer>

      </div>
    </>
  );
};

export default Topic12;
