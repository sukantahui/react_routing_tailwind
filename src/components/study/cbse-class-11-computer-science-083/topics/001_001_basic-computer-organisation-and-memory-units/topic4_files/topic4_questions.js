// topic4_questions.js
// CBSE Class XI Computer Science (083) - Topic 4 FAQs & Questions Bank
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: "q1",
    question: "What is the primary difference between RAM and ROM?",
    answer: "RAM (Random Access Memory) is volatile, read/write memory used to store active programs and data during system operation. ROM (Read Only Memory) is non-volatile, read-mostly memory that permanently stores the bootstrap loader and BIOS firmware.",
    explanation: "RAM loses its contents immediately when the computer loses electrical power, while ROM retains its stored instructions permanently.",
    explanationBn: "RAM একটি ভোলাটাইল (বিদ্যুৎ চলে গেলে ডেটা মুছে যায়) মেমোরি যা চলমান প্রোগ্রাম ধারণ করে; আর ROM নন-ভোলাটাইল (স্থায়ী) মেমোরি যা কম্পিউটার চালু করার ফার্মওয়্যার ধরে রাখে।",
    category: "Concepts"
  },
  {
    id: "q2",
    question: "Why does DRAM require continuous periodic electrical refreshing while SRAM does not?",
    answer: "DRAM stores each bit of data inside a micro-capacitor (using 1 transistor + 1 capacitor) which naturally leaks electrical charge over time and must be recharged thousands of times per second. SRAM stores bits using 4 to 6 transistors configured as a bistable flip-flop latch that holds state indefinitely without refreshing as long as power is applied.",
    explanation: "Refreshing circuitry in DRAM slightly increases latency but allows immense storage densities per silicon die.",
    explanationBn: "DRAM-এ ক্যাপাসিটরে চার্জ হিসেবে ডেটা থাকে যা ক্রমাগত লিক করে, তাই এটি বারবার রিফ্রেশ করতে হয়। SRAM ফ্লিপ-ফ্লপ ল্যাচ দিয়ে তৈরি হওয়ায় রিফ্রেশ করতে হয় না।",
    category: "RAM Technologies"
  },
  {
    id: "q3",
    question: "Why is SRAM used for CPU Cache memory instead of DRAM?",
    answer: "Because SRAM offers ultra-low access latency (0.5 to 5 nanoseconds) matching the high clock speeds of the CPU core, whereas DRAM is substantially slower (10 to 50 nanoseconds) due to capacitive charge times and refresh overhead.",
    explanation: "Although SRAM is more expensive and occupies more silicon real estate, its raw speed prevents CPU execution pipeline stalls.",
    explanationBn: "SRAM অত্যন্ত দ্রুতগতির (০.৫ থেকে ৫ ন্যানোসেকেন্ড) হওয়ায় এটি CPU-র ভেতরের ক্যাশ মেমোরি হিসেবে ব্যবহৃত হয়।",
    category: "RAM Technologies"
  },
  {
    id: "q4",
    question: "What does 'EPROM' stand for and how is its stored data erased?",
    answer: "EPROM stands for 'Erasable Programmable Read-Only Memory'. It is erased by exposing the transparent quartz crystal window on the top of the chip package to intense Ultraviolet (UV) light for 15 to 20 minutes.",
    explanation: "The UV photons excite trapped electrons in floating-gate transistors, clearing all memory cells back to logical 1s simultaneously.",
    explanationBn: "EPROM = Erasable Programmable Read-Only Memory। এর কাঁচের জানালার ওপর ১৫-২০ মিনিট অতিবেগুনি (UV) রশ্মি ফেলে ডেটা মোছা হয়।",
    category: "ROM Variations"
  },
  {
    id: "q5",
    question: "What is an 'EEPROM' and why is it superior to an EPROM for motherboard firmware?",
    answer: "EEPROM stands for 'Electrically Erasable Programmable ROM'. It is superior because it can be erased and reprogrammed electrically byte-by-byte in-circuit without removing the chip or needing a UV lamp, allowing painless BIOS firmware updates.",
    explanation: "Modern computer motherboards utilize Flash EEPROM chips so users can update BIOS versions safely via software utilities.",
    explanationBn: "EEPROM বৈদ্যুতিক সিগন্যাল দিয়ে মাদারবোর্ডে রেখেই আপডেট করা যায়, তাই বায়োস ফার্মওয়্যার হিসেবে এটি EPROM-এর চেয়ে অনেক উন্নত।",
    category: "ROM Variations"
  },
  {
    id: "q6",
    question: "What is a 'Bootstrap Loader' and where is it permanently stored?",
    answer: "The Bootstrap Loader is the initial startup code that initializes system hardware, performs Power-On Self-Test (POST), and loads the operating system kernel from secondary storage (SSD/HDD) into RAM. It is permanently stored in ROM (BIOS/UEFI).",
    explanation: "Because RAM is empty upon power-on, the CPU must fetch its very first instruction from non-volatile ROM.",
    explanationBn: "বুটস্ট্র্যাপ লোডার হলো প্রাথমিক স্টার্টআপ কোড যা কম্পিউটার অন করার পর হার্ডওয়্যার পরীক্ষা করে ও ওএস লোড করে; এটি ROM-এ সংরক্ষিত থাকে।",
    category: "Boot Process"
  },
  {
    id: "q7",
    question: "Differentiate between PROM and Masked ROM.",
    answer: "Masked ROM is programmed with permanent data during factory fabrication at the silicon semiconductor foundry. PROM (Programmable ROM) is manufactured blank and programmed once by the customer using high-voltage fuse burning (One-Time Programmable).",
    explanation: "Neither can be erased once written.",
    explanationBn: "Masked ROM ফ্যাক্টরিতে তৈরির সময়েই লেখা হয়ে যায়; আর PROM ফাঁকা তৈরি হয় এবং পরে ব্যবহারকারী একবার মাত্র প্রোগ্রাম করতে পারে।",
    category: "ROM Variations"
  },
  {
    id: "q8",
    question: "What is the meaning of 'Random Access' in RAM?",
    answer: "'Random Access' means that any memory cell in the entire address space can be read or written in the exact same amount of time, regardless of its physical location or the sequence of prior accesses.",
    explanation: "This contrasts with sequential access media (like magnetic tape), where accessing data requires physically spooling through earlier blocks.",
    explanationBn: "র‍্যান্ডম অ্যাক্সেস বলতে বোঝায় মেমোরির যেকোনো ঠিকানায় ডেটা পড়তে বা লিখতে ঠিক একই সময় লাগে, কোনো ক্রমানুসারে খোঁজার প্রয়োজন হয় না।",
    category: "Concepts"
  },
  {
    id: "q9",
    question: "What is DDR RAM (e.g. DDR4 / DDR5) used in modern desktop computers?",
    answer: "DDR stands for 'Double Data Rate' Synchronous DRAM, a technology that transfers data on both the rising edge and the falling edge of the system clock signal, doubling data throughput.",
    explanation: "DDR5 operates at voltages as low as 1.1V with transfer rates exceeding 4800 to 6400 MegaTransfers/second (MT/s).",
    explanationBn: "DDR (Double Data Rate) ক্লক সিগন্যালের ওঠা এবং নামা উভয় প্রান্তেই ডেটা আদান-প্রদান করে গতি দ্বিগুণ করে দেয়।",
    category: "Modern Standards"
  },
  {
    id: "q10",
    question: "State whether the following statement is True or False: 'Flash memory used in USB pendrives is a variant of EEPROM.'",
    answer: "True. Flash memory is a high-density, block-erasable solid-state variation of EEPROM technology.",
    explanation: "Flash memory erases in blocks of sectors (e.g. 512 KB) rather than single bytes, drastically increasing write speed and storage density.",
    explanationBn: "সত্য। পেনড্রাইভে ব্যবহৃত ফ্ল্যাশ মেমোরি হলো ব্লক-ইরেজেবল উচ্চগতির আধুনিক EEPROM-এর সংস্করণ।",
    category: "True/False"
  },
  {
    id: "q11",
    question: "Why is primary memory called 'Primary' or 'Internal' memory?",
    answer: "Because it communicates directly with the Central Processing Unit across the internal system bus without requiring intermediate disk controller interfaces or software driver handshakes.",
    explanation: "Every byte in primary memory possesses a unique numeric hardware address directly accessible by the CPU's MAR.",
    explanationBn: "কারণ এটি কোনো মধ্যবর্তী ড্রাইভ কন্ট্রোলার ছাড়াই সরাসরি প্রসেসরের অ্যাড্রেস ও ডেটা বাসের সাথে যুক্ত থাকে।",
    category: "Concepts"
  },
  {
    id: "q12",
    question: "What happens to the program code executing in RAM if a power failure occurs?",
    answer: "All volatile RAM memory cells lose their capacitive/transistor states instantly, causing all unsaved documents, variables, and process states to be permanently lost.",
    explanation: "This is why operating systems provide Uninterruptible Power Supply (UPS) daemons and auto-save disk writebacks.",
    explanationBn: "বিদ্যুৎ চলে যাওয়ার সাথে সাথে র‍্যামের সমস্ত ডেটা সম্পূর্ণ মুছে যায়।",
    category: "Volatility"
  },
  {
    id: "q13",
    question: "What is 'POST' in the computer startup sequence?",
    answer: "POST stands for 'Power-On Self-Test', a diagnostic firmware routine executed by the ROM BIOS upon startup to verify that keyboard, RAM, GPU, and motherboard buses are operational.",
    explanation: "If an error is found during POST, the system produces beep codes or diagnostic LED codes.",
    explanationBn: "POST (Power-On Self-Test) হলো কম্পিউটার চালুর পর হার্ডওয়্যারের প্রাথমিক সুস্থতা যাচাই করার স্বয়ংক্রিয় পরীক্ষা।",
    category: "Boot Process"
  },
  {
    id: "q14",
    question: "Why does DRAM consume less power in standby than SRAM?",
    answer: "DRAM uses only one single transistor per bit compared to 4 to 6 continuous current-drawing transistors in an SRAM flip-flop cell, giving DRAM lower idle power consumption per gigabyte.",
    explanation: "However, during active refreshing bursts, DRAM consumes short spikes of electrical current.",
    explanationBn: "DRAM-এ প্রতি বিটের জন্য মাত্র ১টি ট্রানজিস্টর লাগে, ফলে নিষ্ক্রিয় অবস্থায় এটি কম বিদ্যুৎ খরচ করে।",
    category: "Technical Details"
  },
  {
    id: "q15",
    question: "What is 'Shadow RAM' in computer architecture?",
    answer: "Shadow RAM is a technique where the slow ROM BIOS routines are copied into high-speed RAM during bootup and executed from RAM to accelerate system calls.",
    explanation: "Because RAM has a 10x higher bus bandwidth than legacy motherboard ROM chips, shadowing boosts BIOS execution performance.",
    explanationBn: "ধীরগতির ROM-এর কোড দ্রুতগতির RAM-এ কপি করে সেখান থেকে চালানোর পদ্ধতিকে Shadow RAM বলে।",
    category: "Architecture"
  },
  {
    id: "q16",
    question: "Which type of memory uses Floating-Gate Transistors to retain data without power?",
    answer: "EPROM, EEPROM, and NAND Flash Memory use Floating-Gate MOSFET transistors where electrons are trapped in an isolated gate dielectric.",
    explanation: "The trapped electric charge remains stable for decades without external voltage, preserving non-volatile data.",
    explanationBn: "Floating-Gate ট্রানজিস্টর চার্জ আটকে রেখে বিদ্যুৎ ছাড়াই বছরের পর বছর মেমোরি ডেটা অক্ষুণ্ণ রাখে।",
    category: "Technical Details"
  },
  {
    id: "q17",
    question: "If a school computer lab has 16 GB of DDR4 RAM and a 16 MB BIOS chip, convert both capacities into Megabytes (MB).",
    answer: "16 GB RAM = 16 × 1024 MB = 16,384 Megabytes (MB).\nBIOS Chip = 16 Megabytes (MB).\nRatio: RAM is exactly 1,024 times larger in capacity than the BIOS ROM chip.",
    explanation: "1 GB = 1024 MB.",
    explanationBn: "১৬ জিবি র‍্যাম = ১৬ × ১০২৪ = ১৬,৩৮৪ এমবি; আর বায়োস চিপ হলো ১৬ এমবি।",
    category: "Calculations"
  },
  {
    id: "q18",
    question: "What is a 'Memory Cell'?",
    answer: "A Memory Cell is the smallest fundamental electronic circuit capable of storing one single binary digit (1 bit: Logic 0 or Logic 1).",
    explanation: "Billions of memory cells are arranged in a 2D matrix of rows (wordlines) and columns (bitlines) inside a RAM chip.",
    explanationBn: "মেমোরি সেল হলো ১ বিট (০ বা ১) ডেটা ধরে রাখার জন্য ক্ষুদ্রতম মৌলিক বৈদ্যুতিক সার্কিট।",
    category: "Concepts"
  },
  {
    id: "q19",
    question: "Why is ROM generally much smaller in capacity (e.g. 16-32 MB) compared to RAM (8-64 GB)?",
    answer: "Because ROM only needs to hold tiny, highly compressed system startup firmware, hardware drivers, and security keys, whereas RAM must hold the entire multitasking OS kernel, running web browsers, and user application datasets.",
    explanation: "Designing massive gigabyte-scale ROMs is economically unnecessary when high-capacity DRAM can load data dynamically.",
    explanationBn: "কারণ ROM-এ কেবল বুটিংয়ের জন্য প্রয়োজনীয় ছোট কোড থাকে; আর RAM-এ বিশাল অপারেটিং সিস্টেম ও সমস্ত চলমান অ্যাপ্লিকেশন থাকে।",
    category: "Architecture"
  },
  {
    id: "q20",
    question: "What is 'Dual-Channel Memory Architecture'?",
    answer: "Dual-Channel is a memory controller technology that utilizes two separate 64-bit communication channels simultaneously, providing a combined 128-bit data bus width to double memory bandwidth.",
    explanation: "Installing matching RAM sticks into color-coded motherboard slots enables dual-channel mode.",
    explanationBn: "ডুয়াল-চ্যানেল মেমোরি একসাথে দুটি পৃথক ৬৪-বিট চ্যানেল ব্যবহার করে ডেটা বাসের ব্যান্ডউইডথ দ্বিগুণ করে দেয়।",
    category: "Modern Standards"
  },
  {
    id: "q21",
    question: "What is the difference between BIOS and UEFI stored in motherboard ROM?",
    answer: "BIOS (Basic Input/Output System) is legacy 16-bit firmware limited to 2 TB drives (MBR partition scheme). UEFI (Unified Extensible Firmware Interface) is modern 64-bit firmware with GUI mouse support, Secure Boot encryption, and multi-terabyte GPT drive support.",
    explanation: "Modern motherboards utilize UEFI stored on Flash EEPROM chips.",
    explanationBn: "BIOS হলো পুরোনো ১৬-বিট সিস্টেম; আর UEFI হলো আধুনিক ৬৪-বিট নিরাপদ গ্রাফিক্যাল ফার্মওয়্যার।",
    category: "Boot Process"
  },
  {
    id: "q22",
    question: "Explain the term 'CAS Latency' (CL) in RAM specifications.",
    answer: "CAS Latency (Column Address Strobe Latency) is the delay time (measured in clock cycles) between the instant a memory controller sends a column address to a RAM module and the moment the requested data is available on the Data Bus pins.",
    explanation: "Lower CAS latency ratings (e.g., CL16 vs CL22) signify faster responsive data delivery.",
    explanationBn: "CAS Latency হলো মেমোরি কন্ট্রোলার কলাম অ্যাড্রেস চাওয়ার পর র‍্যাম থেকে ডেটা বেরিয়ে আসতে যতগুলো ক্লক সাইকেল সময় লাগে।",
    category: "Technical Details"
  },
  {
    id: "q23",
    question: "True or False: 'When computer RAM is full, the OS expands into virtual memory on the secondary SSD/HDD.'",
    answer: "True. Operating systems use Virtual Memory (Paging / Swap Space) on disk as an overflow safety buffer when physical RAM runs out.",
    explanation: "Virtual memory prevents out-of-memory software crashes at the expense of slower access speeds.",
    explanationBn: "সত্য। ফিজিক্যাল র‍্যাম পূর্ণ হয়ে গেলে ওএস সেকেন্ডারি ড্রাইভের একটি অংশকে ভার্চুয়াল মেমোরি (সোয়াপ স্পেস) হিসেবে ব্যবহার করে।",
    category: "True/False"
  },
  {
    id: "q24",
    question: "What is 'NVRAM' (Non-Volatile RAM)?",
    answer: "NVRAM is static RAM backed by a small lithium battery or emerging resistive/magnetoresistive technologies (MRAM, FRAM) that preserves CMOS clock settings and hardware configurations without main power.",
    explanation: "The CR2032 coin cell on motherboards keeps the Real-Time Clock (RTC) and CMOS setup RAM ticking when the PC is unplugged.",
    explanationBn: "NVRAM হলো ব্যাটারি-চালিত বা বিশেষ নন-ভোলাটাইল র‍্যাম যা মাদারবোর্ডের ঘড়ির সময় এবং বায়োস সেটিংস সংরক্ষণ করে রাখে।",
    category: "Modern Standards"
  },
  {
    id: "q25",
    question: "Summary Question: Classify each as SRAM, DRAM, or ROM/EEPROM: (a) CPU L2 Cache, (b) DDR4 8GB Stick, (c) Motherboard BIOS Chip, (d) USB Thumb Drive storage cells.",
    answer: "(a) CPU L2 Cache: SRAM (Static RAM)\n(b) DDR4 8GB Stick: DRAM (Dynamic RAM)\n(c) Motherboard BIOS Chip: EEPROM (Flash ROM)\n(d) USB Thumb Drive storage: Flash EEPROM.",
    explanation: "Demonstrates complete mastery of primary memory taxonomy and hardware roles.",
    explanationBn: "(ক) CPU L2 Cache = SRAM, (খ) DDR4 8GB = DRAM, (গ) BIOS Chip = EEPROM, (ঘ) USB Pendrive = Flash EEPROM।",
    category: "Summary"
  }
];

export default questions;
