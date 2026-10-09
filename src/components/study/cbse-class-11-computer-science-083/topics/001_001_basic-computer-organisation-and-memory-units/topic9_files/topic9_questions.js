// topic9_questions.js
// CBSE Class XI Computer Science (083) - Topic 9 FAQs & Questions Bank
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: "q1",
    question: "What is the primary benefit of having downloadable laboratory scripts and notes?",
    answer: "Downloadable offline scripts and printable plain text revision notes allow students to practice Python architectural simulations offline and perform quick paper-based revision before school and board exams.",
    explanation: "Offline access supports uninterrupted study regardless of internet availability.",
    explanationBn: "অফলাইন স্ক্রিপ্ট ও প্রিন্টযোগ্য নোটের মাধ্যমে শিক্ষার্থীরা ইন্টারনেট ছাড়াই কম্পিউটারে প্র্যাকটিস এবং পরীক্ষার আগে দ্রুত রিভিশন দিতে পারে।",
    category: "Revision"
  },
  {
    id: "q2",
    question: "Summarize the Von Neumann Architecture bottleneck ('Memory Wall').",
    answer: "The Von Neumann bottleneck refers to the throughput throughput limit caused by the fact that data and instructions must share the same system bus between the ultra-fast CPU and slower main memory.",
    explanation: "Multi-level SRAM cache hierarchies (L1/L2/L3) directly alleviate this bottleneck.",
    explanationBn: "ভন নিউম্যান বটলনেক হলো প্রসেসরের গতি ও মেমোরি বাসের গতির মধ্যকার তারতম্যজনিত সমস্যা, যা ক্যাশ মেমোরির সাহায্যে সমাধান করা হয়।",
    category: "Architecture"
  },
  {
    id: "q3",
    question: "How does the memory hierarchy balance cost, capacity, and access speed?",
    answer: "By placing small, ultra-expensive, fast memory (Registers, L1/L2 Cache) closest to the CPU, backed by moderate-cost DRAM for main memory, and vast, inexpensive secondary storage (SSDs, HDDs) at the bottom.",
    explanation: "This pyramid hierarchy delivers near-SRAM average speeds at an affordable total system cost.",
    explanationBn: "গতিশীল ও দামি মেমোরি CPU-র কাছে এবং বড় ও সাশ্রয়ী মেমোরি নিচে রেখে গতি ও খরচের নিখুঁত ভারসাম্য তৈরি করা হয়।",
    category: "Hierarchy"
  },
  {
    id: "q4",
    question: "Which register directly drives the Address Bus during the Fetch phase?",
    answer: "The Memory Address Register (MAR) holds the physical address and directly drives the unidirectional Address Bus lines.",
    explanation: "PC supplies the address to MAR; MAR drives the external bus pins.",
    explanationBn: "Memory Address Register (MAR) সরাসরি অ্যাড্রেস বাসের সাথে যুক্ত থাকে।",
    category: "Registers"
  },
  {
    id: "q5",
    question: "What is the exact relationship between Clock Frequency (GHz) and Clock Period (ns)?",
    answer: "Clock Period T (seconds) = 1 / Frequency (Hertz). A 4.0 GHz CPU has a period T = 1 / (4.0 × 10^9) = 0.25 nanoseconds (250 picoseconds).",
    explanation: "Higher clock frequency yields shorter individual clock periods.",
    explanationBn: "T = ১ / f। ৪.০ গিগাহার্টজ প্রসেসরের প্রতিটি ক্লক সাইকেল ০.২৫ ন্যানোসেকেন্ড সময় নেয়।",
    category: "Calculations"
  },
  {
    id: "q6",
    question: "Why can't non-impact printers make carbon copies?",
    answer: "Because non-impact printers (laser/inkjet) do not apply mechanical striking pressure to the surface of the paper to transfer ink through carbon layers.",
    explanation: "Only impact printers (dot matrix) exert the physical force required for carbon duplication.",
    explanationBn: "কারণ নন-ইমপ্যাক্ট প্রিন্টার কাগজে কোনো যান্ত্রিক আঘাত করে না; তাই কার্বন পেপারে চাপ পড়ে না।",
    category: "Printers"
  },
  {
    id: "q7",
    question: "Convert 2^36 bytes into Gigabytes (GB).",
    answer: "2^36 Bytes = 2^6 × 2^30 Bytes = 64 Gigabytes (GB).",
    explanation: "Since 2^30 Bytes = 1 GB, 2^36 = 64 GB.",
    explanationBn: "২^৩৬ বাইট = ২^৬ × ২^৩০ = ৬৪ GB।",
    category: "Calculations"
  },
  {
    id: "q8",
    question: "What is the difference between Spatial and Temporal locality?",
    answer: "Temporal locality refers to accessing the same memory address repeatedly over a short time window. Spatial locality refers to accessing nearby adjacent addresses in sequence.",
    explanation: "Temporal = loops; Spatial = arrays.",
    explanationBn: "Temporal: একই ডেটা বারবার ব্যবহার। Spatial: পাশাপাশি থাকা মেমোরি ডেটার ধারাবাহিক ব্যবহার।",
    category: "Locality"
  },
  {
    id: "q9",
    question: "Why is ROM considered primary memory despite being non-volatile?",
    answer: "Because ROM is wired directly to the system address and data buses, allowing the CPU to fetch bootstrap instructions byte-by-byte without an intermediate drive controller.",
    explanation: "Direct bus addressability defines primary memory.",
    explanationBn: "কারণ ROM সরাসরি প্রসেসরের সিস্টেম বাসের সাথে যুক্ত থাকে এবং বাইট অনুযায়ী অ্যাড্রেস করা যায়।",
    category: "ROM"
  },
  {
    id: "q10",
    question: "What is an OMR device's typical error rate compared to human manual checking?",
    answer: "OMR error rate is less than 0.01% (virtually 100% accurate) compared to 2-5% for manual human exam paper evaluation.",
    explanation: "Optical sensor calibration guarantees precise, unbiased scoring.",
    explanationBn: "OMR-এর ভুলের মাত্রা ০.০১%-এরও কম, যা মানুষের ম্যানুয়াল মূল্যায়নের চেয়ে বহুগুণ নির্ভুল।",
    category: "Input Devices"
  },
  {
    id: "q11",
    question: "How many Kilobytes are in 1 Petabyte (PB)?",
    answer: "1 PB = 1024 TB = 1024 × 1024 GB = 1024^3 MB = 1024^4 KB = 2^40 KB = 1,099,511,627,776 Kilobytes.",
    explanation: "Multiply by 1024 for each step: PB -> TB -> GB -> MB -> KB.",
    explanationBn: "১ PB = ১০২৪^৪ KB = ১,০৯৯,৫১১,৬২৭,৭৭৬ KB (২^৪০ KB)।",
    category: "Calculations"
  },
  {
    id: "q12",
    question: "What role does the Accumulator play in multi-step arithmetic calculations?",
    answer: "The Accumulator holds the running total and intermediate outputs of ALU operations so they do not need to be written back to slow main memory after every individual step.",
    explanation: "Dramatically reduces bus traffic during heavy computational tasks.",
    explanationBn: "Accumulator গাণিতিক হিসাবের অন্তর্বর্তীকালীন ফলাফল ধারণ করে বাস ট্রাফিক কমায়।",
    category: "Registers"
  },
  {
    id: "q13",
    question: "What is the function of the POST (Power-On Self-Test) routine in ROM BIOS?",
    answer: "POST checks all critical hardware (keyboard, RAM modules, graphics card, storage controllers) upon power-up to confirm the system is safe to boot.",
    explanation: "Emits beep codes or diagnostic errors if a hardware fault is detected.",
    explanationBn: "POST কম্পিউটার অন হওয়ার পর সমস্ত হার্ডওয়্যার সঠিকভাবে কাজ করছে কিনা তা পরীক্ষা করে।",
    category: "Boot Process"
  },
  {
    id: "q14",
    question: "Differentiate between a 1D Barcode and a 2D QR Code.",
    answer: "1D barcodes hold ~20 characters in horizontal bars; 2D QR codes hold up to 4,000+ characters in a 2D matrix, supporting URLs, payment strings, and built-in error correction.",
    explanation: "QR codes offer 200x higher data density than linear barcodes.",
    explanationBn: "১ডি বারকোডে ২০টি অক্ষর ধরে; আর ২ডি কিউআর কোডে ৪০০০-এর বেশি অক্ষর ও ইউপিআই লিঙ্ক ধরে।",
    category: "Scanners"
  },
  {
    id: "q15",
    question: "Calculate the rotational latency of a 10,000 RPM enterprise SAS hard drive.",
    answer: "Latency = (30,000 / 10,000) ms = 3.0 milliseconds.",
    explanation: "Formula: Average Rotational Delay = 30000 / RPM (in ms).",
    explanationBn: "ঘূর্ণন বিলম্ব = ৩০,০০০ / ১০,০০০ = ৩.০ মিলি-সেকেন্ড।",
    category: "Calculations"
  },
  {
    id: "q16",
    question: "Why is the Data Bus bidirectional while the Address Bus is unidirectional?",
    answer: "CPU only sends addresses out to target devices (unidirectional), but must both read incoming data and write outgoing data (bidirectional).",
    explanation: "Memory never initiates addresses back into the CPU.",
    explanationBn: "CPU কেবল অ্যাড্রেস পাঠায় (একমুখী), কিন্তু ডেটা গ্রহণ ও প্রেরণ উভয়ই করে (দ্বিমুখী)।",
    category: "Bus Architecture"
  },
  {
    id: "q17",
    question: "What is the difference between PROM and EEPROM?",
    answer: "PROM is One-Time Programmable (OTP) by fuse burning; EEPROM can be electrically erased and rewritten thousands of times in-circuit.",
    explanation: "Modern BIOS uses EEPROM (Flash ROM) for software updates.",
    explanationBn: "PROM-এ মাত্র একবার লেখা যায়; আর EEPROM বারবার বিদ্যুৎ দিয়ে মুছে পুনরায় লেখা যায়।",
    category: "ROM Variations"
  },
  {
    id: "q18",
    question: "What is an 'instruction word' in computer architecture?",
    answer: "An instruction word is a fixed-width binary packet consisting of an Opcode (operation code) and zero or more Operands (memory addresses or registers).",
    explanation: "Example: `ADD R1, R2` encodes the operation and target registers into binary.",
    explanationBn: "ইন্সট্রাকশন ওয়ার্ড হলো অপকোড এবং অপারেন্ড সমন্বিত একটি বাইনারি নির্দেশের প্যাকেট।",
    category: "Instruction Architecture"
  },
  {
    id: "q19",
    question: "Why are plotters preferred over inkjet printers for engineering blueprints?",
    answer: "Plotters draw continuous mathematical vector lines with physical pens, preventing pixelation and jagged edges on massive multi-meter architectural plans.",
    explanation: "Delivers crisp vector precision at large physical scales.",
    explanationBn: "প্লটার পেন দিয়ে মসৃণ ভেক্টর লাইন আঁকে, ফলে বড় ড্রয়িংয়ে কোনো পিক্সেল ফেটে যায় না।",
    category: "Plotters"
  },
  {
    id: "q20",
    question: "What happens during a Cache Miss in L1 cache?",
    answer: "The request cascades to L2 cache; if L2 misses, it checks L3 cache; if L3 misses, a 64-byte block is fetched from main DRAM into all cache tiers.",
    explanation: "The pipeline stalls for the duration of the miss penalty.",
    explanationBn: "L1-এ মিস হলে L2, তারপর L3 এবং পরিশেষে র‍্যাম থেকে ডেটা এনে ক্যাশে লোড করা হয়।",
    category: "Cache Mechanics"
  },
  {
    id: "q21",
    question: "How many bits are in 0.75 Megabytes?",
    answer: "0.75 MB = 0.75 × 1024 × 1024 Bytes = 786,432 Bytes.\nTotal Bits = 786,432 × 8 = 6,291,456 bits.",
    explanation: "Convert MB -> Bytes -> Bits.",
    explanationBn: "০.৭৫ × ১০২৪ × ১০২৪ × ৮ = ৬,২৯১,৪৫৬ বিট।",
    category: "Calculations"
  },
  {
    id: "q22",
    question: "Which bus carries the MEM_READ and MEM_WRITE control strobes?",
    answer: "The Control Bus carries all memory and I/O command strobes.",
    explanation: "Tells memory hardware whether to latch or output data.",
    explanationBn: "কন্ট্রোল বাস MEM_READ এবং MEM_WRITE সিগন্যাল বহন করে।",
    category: "Control Bus"
  },
  {
    id: "q23",
    question: "Why is MICR font E-13B designed with specific distinctive character shapes?",
    answer: "The distinctive thick geometric shapes ensure that magnetic read heads can reliably identify characters by their unique magnetic flux waveforms.",
    explanation: "Prevents misreading between similar digits like 0, 8, and 6.",
    explanationBn: "E-13B ফন্টের বিশেষ আকৃতি ম্যাগনেটিক রিডারকে নির্ভুলভাবে প্রতিটি অক্ষর চিনতে সাহায্য করে।",
    category: "MICR"
  },
  {
    id: "q24",
    question: "True or False: 'A 64-bit CPU has 64-bit wide internal registers.'",
    answer: "True. The word size of a 64-bit CPU means its internal registers and ALU process 64 bits (8 bytes) per clock cycle.",
    explanation: "Enables single-cycle processing of 64-bit integers and large pointers.",
    explanationBn: "সত্য। ৬৪-বিট প্রসেসরের অভ্যন্তরীণ রেজিস্টারগুলো ৬৪ বিট চওড়া হয়।",
    category: "True/False"
  },
  {
    id: "q25",
    question: "Summary Question: Outline the full path of data when a user types a character 'K' on a keyboard until it appears on an OLED monitor.",
    answer: "1. Keypress generates Scan Code for 'K'.\n2. Keyboard controller pulls INTR line on Control Bus.\n3. CPU executes ISR, reads ASCII 75 via Data Bus into RAM buffer.\n4. CPU renders font glyph into Video RAM (VRAM) buffer.\n5. GPU outputs RGB raster stream to OLED monitor pixels.",
    explanation: "This full cycle shows input, control, registers, memory, bus, and output operating seamlessly.",
    explanationBn: "১. কিবোর্ডে চাপ ➔ ২. ইন্টারাপ্ট সিগন্যাল ➔ ৩. ডেটা বাসে ASCII কোড র‍্যামে লোড ➔ ৪. GPU ফন্ট রেন্ডার করে VRAM-এ ➔ ৫. মনিটরে 'K' দৃশ্যমান হয়।",
    category: "Tracing"
  }
];

export default questions;
