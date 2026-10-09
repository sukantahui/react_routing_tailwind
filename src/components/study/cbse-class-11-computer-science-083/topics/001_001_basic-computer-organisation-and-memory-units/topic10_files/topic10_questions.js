// topic10_questions.js
// CBSE Class XI Computer Science (083) - Topic 10: 30-Question Board Exam Simulator
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "Which register in the CPU stores the memory address of the NEXT instruction to be fetched and executed?",
    options: [
      "Instruction Register (IR)",
      "Program Counter (PC)",
      "Memory Data Register (MDR)",
      "Accumulator (ACC)"
    ],
    answer: "Program Counter (PC)",
    explanation: "The Program Counter (PC) holds the address of the next instruction waiting in the sequence. It is incremented during the Fetch phase.",
    explanationBn: "Program Counter (PC) পরবর্তী নির্দেশের মেমোরি অ্যাড্রেস ধারণ করে।"
  },
  {
    id: 2,
    question: "How many distinct memory locations can be directly addressed by a 32-bit Address Bus?",
    options: [
      "65,536 Bytes (64 KB)",
      "1,048,576 Bytes (1 MB)",
      "4,294,967,296 Bytes (4 GB)",
      "16 Terabytes (16 TB)"
    ],
    answer: "4,294,967,296 Bytes (4 GB)",
    explanation: "Max addressable space = 2^32 bytes = 4,294,967,296 bytes = 4 Gigabytes (GB).",
    explanationBn: "৩২-বিট অ্যাড্রেস বাসের জন্য মেমোরি ধারণক্ষমতা = ২^৩২ বাইট = ৪ GB।"
  },
  {
    id: 3,
    question: "Which of the following buses is strictly UNIDIRECTIONAL in computer architecture?",
    options: [
      "Data Bus",
      "Address Bus",
      "Control Bus",
      "PCIe Expansion Bus"
    ],
    answer: "Address Bus",
    explanation: "The Address Bus is strictly unidirectional because memory addresses are generated only by the CPU and transmitted outward to memory and I/O devices.",
    explanationBn: "অ্যাড্রেস বাস কেবল CPU থেকে মেমোরির দিকে একমুখীভাবে সিগন্যাল পাঠায়।"
  },
  {
    id: 4,
    question: "During which phase of the instruction execution cycle is the binary opcode decoded into micro-control signals by the Control Unit?",
    options: [
      "Fetch Phase",
      "Decode Phase",
      "Execute Phase",
      "Store Phase"
    ],
    answer: "Decode Phase",
    explanation: "The Control Unit decodes the opcode held inside the Instruction Register (IR) during the Decode phase.",
    explanationBn: "ডিকোড ধাপে কন্ট্রোল ইউনিট IR-এ থাকা অপকোড ডিকোড করে প্রয়োজনীয় সিগন্যাল তৈরি করে।"
  },
  {
    id: 5,
    question: "Why does Dynamic RAM (DRAM) require periodic electrical refreshing while Static RAM (SRAM) does not?",
    options: [
      "DRAM uses mechanical switches that disconnect over time",
      "DRAM uses micro-capacitors that naturally leak electrical charge",
      "DRAM has magnetic platters that lose magnetism",
      "DRAM operates at higher optical wavelengths"
    ],
    answer: "DRAM uses micro-capacitors that naturally leak electrical charge",
    explanation: "DRAM cells consist of 1 transistor + 1 capacitor. Capacitors lose charge over milliseconds and must be refreshed periodically.",
    explanationBn: "DRAM ক্যাপাসিটর দিয়ে তৈরি যা চার্জ লিক করে, তাই এটি বারবার রিফ্রেশ করতে হয়।"
  },
  {
    id: 6,
    question: "Which type of non-volatile ROM is erased by exposing its quartz crystal window to Ultraviolet (UV) light?",
    options: [
      "Masked ROM",
      "PROM",
      "EPROM",
      "EEPROM"
    ],
    answer: "EPROM",
    explanation: "EPROM (Erasable Programmable ROM) is erased by shining intense UV light through its quartz window for 15-20 minutes.",
    explanationBn: "EPROM-এর কাঁচের জানালার ওপর অতিবেগুনি (UV) রশ্মি ফেলে ডেটা মোছা হয়।"
  },
  {
    id: 7,
    question: "The principle that memory locations accessed recently are likely to be accessed again in the near future is known as:",
    answer: "Temporal Locality",
    options: [
      "Spatial Locality",
      "Temporal Locality",
      "Virtual Paging",
      "DMA Arbitration"
    ],
    explanation: "Temporal Locality refers to locality in time (e.g. variables in a loop).",
    explanationBn: "সময়ানুক্রমিক পুনঃব্যবহারের এই নীতিকে Temporal Locality বলে।"
  },
  {
    id: 8,
    question: "Calculate the Average Memory Access Time (AMAT) if Hit Time = 1 ns, Hit Ratio = 90% (Miss Rate = 0.10), and Miss Penalty = 50 ns.",
    options: [
      "51.0 ns",
      "6.0 ns",
      "5.0 ns",
      "0.6 ns"
    ],
    answer: "6.0 ns",
    explanation: "AMAT = Hit Time + (Miss Rate × Miss Penalty) = 1 + (0.10 × 50) = 1 + 5 = 6.0 nanoseconds.",
    explanationBn: "AMAT = ১ + (০.১০ × ৫০) = ১ + ৫ = ৬.০ ন্যানোসেকেন্ড।"
  },
  {
    id: 9,
    question: "What are the concentric circular data recording rings on a magnetic hard disk platter called?",
    options: [
      "Sectors",
      "Tracks",
      "Cylinders",
      "Clusters"
    ],
    answer: "Tracks",
    explanation: "Tracks are the concentric rings on each platter surface; sectors are subdivisions of tracks.",
    explanationBn: "ডিস্ক প্লাটারের বৃত্তাকার রিংগুলোকে Tracks বলা হয়।"
  },
  {
    id: 10,
    question: "Which optical storage medium uses a 405 nm blue-violet laser to achieve up to 50 GB storage capacity?",
    options: [
      "CD-ROM",
      "DVD-ROM",
      "Blu-ray Disc (BD)",
      "Floppy Disk"
    ],
    answer: "Blu-ray Disc (BD)",
    explanation: "Blu-ray uses a shorter 405nm laser, enabling much smaller physical pit sizes and higher track density.",
    explanationBn: "ব্লু-রে ৪০৫ ন্যানোমিটারের নীল লেজার ব্যবহার করে ২৫ থেকে ৫০ জিবি ডেটা ধারণ করে।"
  },
  {
    id: 11,
    question: "How many bits are contained in 2.5 Kilobytes (KB)?",
    options: [
      "2,500 bits",
      "20,000 bits",
      "20,480 bits",
      "2,560 bits"
    ],
    answer: "20,480 bits",
    explanation: "2.5 KB = 2.5 × 1,024 Bytes = 2,560 Bytes. Total Bits = 2,560 × 8 = 20,480 bits.",
    explanationBn: "২.৫ × ১০২৪ × ৮ = ২০,৪৮০ বিট।"
  },
  {
    id: 12,
    question: "How many 512 MB video files can fit on a 16 GB SD card?",
    options: [
      "16 files",
      "32 files",
      "64 files",
      "128 files"
    ],
    answer: "32 files",
    explanation: "16 GB = 16 × 1,024 MB = 16,384 MB. Total Files = 16,384 / 512 = 32 files.",
    explanationBn: "১৬ GB = ১৬,৩৮৪ MB। মোট ফাইল = ১৬,৩৮৪ / ৫১২ = ৩২টি ফাইল।"
  },
  {
    id: 13,
    question: "Which input device is universally used in banking to process and clear bank cheques securely?",
    options: [
      "OMR",
      "OCR",
      "MICR",
      "Barcode Reader"
    ],
    answer: "MICR",
    explanation: "MICR (Magnetic Ink Character Recognition) reads magnetic iron-oxide numbers on cheques.",
    explanationBn: "MICR ব্যাংকের চেক দ্রুত ও নির্ভুলভাবে ক্লিয়ার করার জন্য ব্যবহৃত হয়।"
  },
  {
    id: 14,
    question: "Which of the following is an IMPACT printer capable of producing duplicate carbon copies?",
    options: [
      "Laser Printer",
      "Inkjet Printer",
      "Dot Matrix Printer",
      "Thermal Printer"
    ],
    answer: "Dot Matrix Printer",
    explanation: "Dot matrix printers physically strike mechanical pins against an inked ribbon onto carbon paper.",
    explanationBn: "ডট মেট্রিক্স প্রিন্টার কার্বন পেপারে চাপ দিয়ে ডুপ্লিকেট কপি ছাপতে পারে।"
  },
  {
    id: 15,
    question: "A Nibble is a group of exactly how many binary bits?",
    options: [
      "2 bits",
      "4 bits",
      "8 bits",
      "16 bits"
    ],
    answer: "4 bits",
    explanation: "1 Nibble = 4 bits (half of a Byte).",
    explanationBn: "১ নিবল = ৪টি বিট।"
  },
  {
    id: 16,
    question: "What is the primary role of the Memory Data Register (MDR / MBR)?",
    options: [
      "Holds address of next instruction",
      "Holds data or instructions transferred across the Data Bus",
      "Decodes binary opcodes",
      "Generates clock pulses"
    ],
    answer: "Holds data or instructions transferred across the Data Bus",
    explanation: "MDR acts as the bidirectional data transceiver between the CPU and memory.",
    explanationBn: "MDR ডেটা বাসে আসা বা যাওয়ার ডেটা ও নির্দেশ সাময়িকভাবে ধরে রাখে।"
  },
  {
    id: 17,
    question: "Express 1 Terabyte (TB) in terms of powers of 2 (Bytes).",
    options: [
      "2^10 Bytes",
      "2^20 Bytes",
      "2^30 Bytes",
      "2^40 Bytes"
    ],
    answer: "2^40 Bytes",
    explanation: "1 KB = 2^10 B, 1 MB = 2^20 B, 1 GB = 2^30 B, 1 TB = 2^40 Bytes.",
    explanationBn: "১ TB = ২^৪০ বাইট।"
  },
  {
    id: 18,
    question: "Calculate the clock cycle time (T) of a 2.5 GHz CPU processor.",
    options: [
      "0.4 nanoseconds",
      "2.5 nanoseconds",
      "4.0 nanoseconds",
      "0.25 nanoseconds"
    ],
    answer: "0.4 nanoseconds",
    explanation: "Period T = 1 / Frequency = 1 / (2.5 × 10^9 s^-1) = 0.4 × 10^-9 s = 0.4 nanoseconds.",
    explanationBn: "T = ১ / (২.৫ × ১০^৯) = ০.৪ ন্যানোসেকেন্ড।"
  },
  {
    id: 19,
    question: "Which level of cache memory is embedded directly inside the CPU core die and provides the fastest access latency?",
    options: [
      "L1 Cache",
      "L2 Cache",
      "L3 Cache",
      "System DRAM"
    ],
    answer: "L1 Cache",
    explanation: "L1 cache is integrated directly into the core execution pipeline with 1-4 cycle access times.",
    explanationBn: "L1 ক্যাশ সরাসরি CPU কোরের ভেতরে থাকে এবং সবচেয়ে দ্রুতগতির।"
  },
  {
    id: 20,
    question: "In hard disk physics, what is the time taken for the actuator arm to position the read/write head over the target track called?",
    options: [
      "Rotational Latency",
      "Seek Time",
      "Transfer Time",
      "Access Overhead"
    ],
    answer: "Seek Time",
    explanation: "Seek Time is the mechanical movement delay of the head arm moving radially across tracks.",
    explanationBn: "হেড সঠিক ট্র্যাকে যাওয়ার সময়কে Seek Time বলে।"
  },
  {
    id: 21,
    question: "Which vector output device uses physical colored ink pens to draw architectural blueprints and CAD schematics?",
    options: [
      "Laser Printer",
      "Dot Matrix Printer",
      "Plotter",
      "VDU Monitor"
    ],
    answer: "Plotter",
    explanation: "Plotters draw continuous mathematical vector lines on large roll paper.",
    explanationBn: "প্লটার পেন দিয়ে ভেক্টর ব্লুপ্রিন্ট ও বড় ইঞ্জিনিয়ারিং নকশা আঁকে।"
  },
  {
    id: 22,
    question: "If an address bus has 24 address lines, what is the maximum directly addressable RAM capacity?",
    options: [
      "1 MB",
      "16 MB",
      "64 MB",
      "1 GB"
    ],
    answer: "16 MB",
    explanation: "Capacity = 2^24 Bytes = 2^4 × 2^20 Bytes = 16 × 1 MB = 16 Megabytes (MB).",
    explanationBn: "২^২৪ বাইট = ১৬ মেগাবাইট (16 MB)।"
  },
  {
    id: 23,
    question: "What unit of measurement comes immediately after Exabyte (EB) in the memory measurement hierarchy?",
    options: [
      "Petabyte (PB)",
      "Terabyte (TB)",
      "Zettabyte (ZB)",
      "Yottabyte (YB)"
    ],
    answer: "Zettabyte (ZB)",
    explanation: "Hierarchy: PB -> EB -> ZB -> YB.",
    explanationBn: "Exabyte (EB)-এর পরবর্তী একক হলো Zettabyte (ZB)।"
  },
  {
    id: 24,
    question: "Which of the following devices is classified as BOTH an Input and an Output (Hybrid) device?",
    options: [
      "Touchscreen Monitor",
      "Flatbed Scanner",
      "Laser Printer",
      "Barcode Reader"
    ],
    answer: "Touchscreen Monitor",
    explanation: "Touchscreen displays visual output and captures touch gesture inputs.",
    explanationBn: "টাচস্ক্রিন একই সাথে প্রদর্শন করে (আউটপুট) এবং স্পর্শ গ্রহণ করে (ইনপুট)।"
  },
  {
    id: 25,
    question: "What is the purpose of the Accumulator (ACC) register in the CPU?",
    options: [
      "Holds memory address of next instruction",
      "Temporarily holds intermediate arithmetic and logical results computed by ALU",
      "Stores system BIOS boot code",
      "Controls fan speeds"
    ],
    answer: "Temporarily holds intermediate arithmetic and logical results computed by ALU",
    explanation: "The Accumulator stores running totals and ALU computational outputs.",
    explanationBn: "Accumulator হলো ALU দ্বারা গণনাকৃত অন্তর্বর্তীকালীন ফলাফল ধারণকারী রেজিস্টার।"
  },
  {
    id: 26,
    question: "Convert 1 Gigabyte (GB) into Kilobytes (KB).",
    options: [
      "1,000 KB",
      "1,024 KB",
      "1,048,576 KB",
      "1,000,000 KB"
    ],
    answer: "1,048,576 KB",
    explanation: "1 GB = 1,024 MB = 1,024 × 1,024 KB = 1,048,576 Kilobytes.",
    explanationBn: "১ GB = ১০২৪ × ১০২৪ = ১,০৪৮,৫৭৬ KB।"
  },
  {
    id: 27,
    question: "Which memory update policy writes data simultaneously to both Cache and Main Memory?",
    options: [
      "Write-Back",
      "Write-Through",
      "Direct Mapping",
      "Paging"
    ],
    answer: "Write-Through",
    explanation: "Write-Through writes to both cache and RAM simultaneously for data safety.",
    explanationBn: "Write-Through ক্যাশ ও র‍্যাম উভয় স্থানে একই সাথে ডেটা লেখে।"
  },
  {
    id: 28,
    question: "What is the average rotational latency of a 7,200 RPM desktop hard disk drive?",
    options: [
      "8.33 ms",
      "4.17 ms",
      "2.08 ms",
      "12.5 ms"
    ],
    answer: "4.17 ms",
    explanation: "Rotational delay = (60 / 7200 / 2) × 1000 = (30,000 / 7200) = 4.166... ≈ 4.17 milliseconds.",
    explanationBn: "গড় ঘূর্ণন বিলম্ব = ৩০,০০০ / ৭২০০ = ৪.১৭ মিলি-সেকেন্ড।"
  },
  {
    id: 29,
    question: "Which technology allows USB flash drives and SSDs to retain data without electrical power?",
    options: [
      "Floating-Gate / Charge-Trap NAND Flash Transistors",
      "Dynamic Micro-Capacitors",
      "Electromagnetic Induction Coils",
      "Piezoelectric Crystals"
    ],
    answer: "Floating-Gate / Charge-Trap NAND Flash Transistors",
    explanation: "Trapped electrons in isolated floating dielectric gates preserve bits for decades without voltage.",
    explanationBn: "Floating-Gate ট্রানজিস্টরে চার্জ আটকে রেখে বিদ্যুৎ ছাড়াই ডেটা সংরক্ষিত থাকে।"
  },
  {
    id: 30,
    question: "In the 4-phase machine cycle, which phase immediately precedes the Execute phase?",
    options: [
      "Fetch Phase",
      "Decode Phase",
      "Store Phase",
      "Interrupt Phase"
    ],
    answer: "Decode Phase",
    explanation: "Sequence: Fetch ➔ Decode ➔ Execute ➔ Store.",
    explanationBn: "Fetch ➔ Decode ➔ Execute ➔ Store; তাই Execute-এর ঠিক আগে Decode ঘটে।"
  }
];

export default questions;
