// topic3_questions.js
// CBSE Class XI Computer Science (083) - Topic 3 FAQs & Questions Bank
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: "q1",
    question: "What is the Instruction Execution Cycle in computer systems?",
    answer: "The Instruction Execution Cycle (or Machine Cycle) is the four-phase sequence: Fetch, Decode, Execute, and Store, which the CPU repeatedly performs to execute individual machine code instructions.",
    explanation: "This loop continues uninterrupted from system boot-up until the CPU encounters a HALT instruction or is powered down.",
    explanationBn: "ইন্সট্রাকশন এক্সিকিউশন সাইকেল হলো ৪টি ধাপের (Fetch, Decode, Execute, Store) ধারাবাহিক চক্র যার মাধ্যমে প্রসেসর প্রতি মুহূর্তে নির্দেশসমূহ সম্পন্ন করে।",
    category: "Concepts"
  },
  {
    id: "q2",
    question: "Which CPU component is responsible for the 'Decode' phase of the machine cycle?",
    answer: "The Control Unit (CU) decodes the binary opcode present in the Instruction Register (IR) using internal combinational logic or microcode ROM.",
    explanation: "The Control Unit interprets what type of operation is requested and prepares the appropriate electrical control signals for the ALU and buses.",
    explanationBn: "কন্ট্রোল ইউনিট (CU) Instruction Register (IR)-এ থাকা অপকোড ডিকোড করে পরবর্তী কাজের সিগন্যাল তৈরি করে।",
    category: "Decode Phase"
  },
  {
    id: "q3",
    question: "What happens to the Program Counter (PC) during the 'Fetch' phase?",
    answer: "During the Fetch phase, the address in the PC is copied to the MAR, and the PC is immediately incremented by 1 (or by the word size in bytes) to point to the subsequent instruction.",
    explanation: "Incrementing PC during the fetch phase ensures that the CPU is ready to fetch the next sequential instruction in the next cycle unless a jump occurs.",
    explanationBn: "ফেচ করার সময় PC-র মান MAR-এ স্থানান্তরিত হওয়ার সাথে সাথেই PC-র মান স্বয়ংক্রিয়ভাবে ১ বৃদ্ধি পেয়ে পরবর্তী নির্দেশের ঠিকানায় চলে যায়।",
    category: "Fetch Phase"
  },
  {
    id: "q4",
    question: "What occurs during the 'Execute' phase for an arithmetic addition instruction?",
    answer: "The Control Unit directs the ALU to accept the operands from the Accumulator and memory buffer (MDR), add the binary values together, and update status condition flags (Zero, Carry, Overflow).",
    explanation: "The ALU circuitry activates binary adders and logic circuits to produce the numerical sum.",
    explanationBn: "এক্সিকিউট ধাপে ALU রেজিস্টার এবং মেমোরি থেকে ডেটা নিয়ে যোগ সম্পন্ন করে এবং স্ট্যাটাস ফ্ল্যাগ আপডেট করে।",
    category: "Execute Phase"
  },
  {
    id: "q5",
    question: "What is the 'Store' (or Writeback) phase of the machine cycle?",
    answer: "The Store phase writes the final result produced by the ALU during the Execute phase into the destination register (such as the Accumulator) or into a designated RAM address via the MDR and Data Bus.",
    explanation: "This ensures the computed value is retained for subsequent instructions or persistent program storage.",
    explanationBn: "স্টোর বা রাইটব্যাক ধাপে গণনাকৃত ফলাফল Accumulator অথবা মেমোরির নির্দিষ্ট ঠিকানায় স্থায়ীভাবে সংরক্ষণ করা হয়।",
    category: "Store Phase"
  },
  {
    id: "q6",
    question: "What is the role of the Instruction Register (IR) during the machine cycle?",
    answer: "The IR holds the binary instruction word fetched from memory throughout the Decode and Execute phases so that the Control Unit has a steady, unchanging opcode to inspect.",
    explanation: "Because memory buses may be reused to fetch operands during the execute phase, the IR prevents the instruction code from being overwritten prematurely.",
    explanationBn: "IR নির্দেশটিকে সম্পূর্ণ ডিকোড ও এক্সিকিউট হওয়া পর্যন্ত অপরিবর্তিতভাবে ধারণ করে রাখে।",
    category: "Registers"
  },
  {
    id: "q7",
    question: "How does a conditional branch instruction (e.g., `if x == 0:`) alter the normal sequence of the instruction cycle?",
    answer: "If the test condition is met (e.g. Zero Flag = 1), the Control Unit overwrites the Program Counter (PC) with the target branch address, causing execution to jump instead of advancing to the next sequential line.",
    explanation: "If the condition is false, the PC retains its normally incremented sequential address.",
    explanationBn: "শর্ত সত্য হলে (যেমন Zero Flag = 1) কন্ট্রোল ইউনিট PC-তে নতুন জাম্প অ্যাড্রেস লোড করে, ফলে কোড স্বাভাবিক ধারার বদলে নতুন লাইনে লাফিয়ে যায়।",
    category: "Branching"
  },
  {
    id: "q8",
    question: "What is CPI in computer performance analysis?",
    answer: "CPI stands for 'Cycles Per Instruction', which measures the average number of clock cycles a processor requires to complete all four phases of a single machine instruction.",
    explanation: "Simple RISC instructions often have a CPI near 1.0, while complex CISC instructions may require 4 to 10 clock cycles.",
    explanationBn: "CPI (Cycles Per Instruction) বোঝায় একটি নির্দেশ সম্পন্ন করতে গড়ে কতটি ক্লক সাইকেল বা বিদ্যুৎ স্পন্দনের প্রয়োজন হয়।",
    category: "Performance"
  },
  {
    id: "q9",
    question: "Calculate the time required to execute 1,000,000 instructions on a 2.0 GHz CPU with an average CPI of 2.0.",
    answer: "Total Clock Cycles = 1,000,000 × 2.0 = 2,000,000 cycles.\nClock Period T = 1 / (2.0 × 10^9) = 0.5 nanoseconds.\nTotal Time = 2,000,000 × 0.5 × 10^-9 s = 0.001 seconds (1.0 millisecond).",
    explanation: "Total Time = Number of Instructions × CPI × Clock Cycle Time.",
    explanationBn: "মোট সময় = ১০,০০,০০০ × ২ × (১ / ২×১০^৯) = ০.০০১ সেকেন্ড বা ১ মিলি-সেকেন্ড।",
    category: "Calculations"
  },
  {
    id: "q10",
    question: "What is Instruction Pipelining in modern CPU design?",
    answer: "Instruction Pipelining is an architectural technique where multiple instructions are overlapped in execution across consecutive stages (Fetch, Decode, Execute, Store) simultaneously.",
    explanation: "Just like an automotive assembly line, pipelining allows the CPU to finish one instruction on every single clock tick once the pipeline is full.",
    explanationBn: "পাইপলাইনিং হলো এমন এক প্রযুক্তি যেখানে একটি নির্দেশের ফেচ, অন্যটির ডিকোড ও আরেকটির এক্সিকিউশন একই সাথে ভিন্ন ভিন্ন হার্ডওয়্যার ইউনিটে সম্পন্ন হয়।",
    category: "Pipelining"
  },
  {
    id: "q11",
    question: "What is a 'Pipeline Hazard' in instruction pipelining?",
    answer: "A Pipeline Hazard is a condition (structural, data dependency, or branch control) that prevents the next instruction from executing in its designated clock cycle, requiring pipeline bubbles (stalls).",
    explanation: "For example, a data hazard occurs when Instruction 2 needs the result of Instruction 1 before Instruction 1 has finished writing it back.",
    explanationBn: "পাইপলাইন হ্যাজার্ড হলো এমন পরিস্থিতি যখন ডেটা নির্ভরতা বা ব্রাঞ্চিংয়ের কারণে পরবর্তী নির্দেশ আটকে যায় (স্টল ঘটে)।",
    category: "Pipelining"
  },
  {
    id: "q12",
    question: "Differentiate between Machine Cycle and Instruction Cycle.",
    answer: "An Instruction Cycle encompasses the entire lifecycle to complete one instruction (Fetch, Decode, Execute, Store). A Machine Cycle refers to a single basic hardware operation within that cycle (such as a Memory Read cycle or Memory Write cycle).",
    explanation: "One Instruction Cycle may consist of multiple Machine Cycles and several Clock T-States.",
    explanationBn: "ইন্সট্রাকশন সাইকেল হলো পুরো নির্দেশের শুরু থেকে শেষ পর্যন্ত কাজ; আর মেশিন সাইকেল হলো তার ভেতরের একটি একক মেমোরি রিড বা রাইট অপারেশন।",
    category: "Concepts"
  },
  {
    id: "q13",
    question: "What is a 'T-State' in processor timing?",
    answer: "A T-State (Transition State) is the duration of one complete clock pulse (from one rising edge to the next rising edge) produced by the crystal oscillator.",
    explanation: "Sub-operations of a machine cycle take an integer number of T-states (e.g. 3 T-states for fetch).",
    explanationBn: "একটি সম্পূর্ণ ক্লক পালসের সময়কালকে ১টি T-State বলে।",
    category: "Timing"
  },
  {
    id: "q14",
    question: "What is an Interrupt Cycle and when is it checked in the machine cycle?",
    answer: "At the end of every Instruction Cycle (after the Store phase), the Control Unit checks if an interrupt signal (INTR) is active. If active, it pauses normal execution and transfers control to the Interrupt Service Routine (ISR).",
    explanation: "Checking at instruction boundaries ensures the processor never leaves registers in a half-executed corrupted state.",
    explanationBn: "প্রতিটি নির্দেশ চক্রের শেষে (স্টোর ধাপের পর) প্রসেসর ইন্টারাপ্ট সিগন্যাল পরীক্ষা করে কোনো বাহ্যিক জরুরি সিগন্যাল এসেছে কিনা।",
    category: "Interrupts"
  },
  {
    id: "q15",
    question: "What is the 'HALT' instruction and how does it affect the instruction cycle?",
    answer: "The HALT instruction stops the continuous fetch-decode-execute loop, disabling clock distribution to execution units until a hardware interrupt or system reset occurs.",
    explanation: "This saves power and prevents the CPU from executing random uninitialized memory bytes.",
    explanationBn: "HALT নির্দেশ চক্রটি বন্ধ করে দেয় এবং প্রসেসরকে স্লিপ মোডে পাঠায় যতক্ষণ না নতুন কোনো ইন্টারাপ্ট বা রিসেট আসে।",
    category: "Execution"
  },
  {
    id: "q16",
    question: "True or False: 'During the Decode phase, data is transferred across the external Data Bus.'",
    answer: "False. The Decode phase is purely an internal CPU operation where the Control Unit examines the opcode already inside the Instruction Register (IR).",
    explanation: "External data transfers occur during Fetch (instruction fetch) or Execute/Store (operand read/write).",
    explanationBn: "ভুল। ডিকোড পর্ব সম্পূর্ণ CPU-র ভেতরে ঘটে; এতে বাহ্যিক ডেটা বাসের ব্যবহার হয় না।",
    category: "True/False"
  },
  {
    id: "q17",
    question: "What is 'Microcode' in the context of the Control Unit decode phase?",
    answer: "Microcode is low-level hardware firmware stored inside the CPU's Control Store ROM that translates complex machine opcodes into sequences of elemental micro-instructions for gates and multiplexers.",
    explanation: "Used extensively in CISC processors (x86) to implement complex multi-step instructions.",
    explanationBn: "মাইক্রোকোড হলো CPU-র ভেতরের ছোট ছোট নির্দেশমালা যা জটিল অপকোডগুলোকে সহজ ইলেক্ট্রিক্যাল সিগন্যালে রূপান্তর করে।",
    category: "Control Unit"
  },
  {
    id: "q18",
    question: "What is the difference between Hardwired Control Units and Microprogrammed Control Units?",
    answer: "Hardwired Control Units use fixed combinational logic gates to generate control signals at maximum speed (used in RISC/ARM). Microprogrammed Control Units use a control memory ROM to sequence signals, offering greater flexibility (used in x86).",
    explanation: "Hardwired is faster; Microprogrammed is easier to modify and update with CPU microcode patches.",
    explanationBn: "হার্ডওয়্যার্ড কন্ট্রোল গেট দিয়ে তৈরি দ্রুতগতির; আর মাইক্রোপ্রোগ্রামড কন্ট্রোল মেমোরি দিয়ে নিয়ন্ত্রিত ও সহজে পরিবর্তনযোগ্য।",
    category: "Control Unit"
  },
  {
    id: "q19",
    question: "Why must the PC be incremented before the current instruction finishes executing?",
    answer: "To allow the instruction fetch unit to immediately begin pre-fetching the next sequential instruction while the current instruction is being decoded and executed, eliminating pipeline dead time.",
    explanation: "This architectural look-ahead maximizes processor throughput.",
    explanationBn: "যাতে বর্তমান নির্দেশটি চলার সময়েই প্রসেসর পরবর্তী নির্দেশের জন্য প্রস্তুত হতে পারে এবং কোনো সময় নষ্ট না হয়।",
    category: "Fetch Phase"
  },
  {
    id: "q20",
    question: "Explain the role of the Stack Pointer (SP) when a function CALL instruction is executed.",
    answer: "The CPU decrements the SP and pushes the incremented Program Counter (the return address) onto the memory stack, ensuring that when the function returns (RET), execution resumes immediately after the CALL.",
    explanation: "Without saving the PC on the stack, the CPU would lose its place in the main calling program.",
    explanationBn: "ফাংশন কল হলে রিটার্ন অ্যাড্রেসটি স্ট্যাক পয়েন্টার (SP)-এর মাধ্যমে মেমোরিতে সেভ রাখা হয় যাতে কাজ শেষে আগের জায়গায় ফিরে আসা যায়।",
    category: "Execution"
  },
  {
    id: "q21",
    question: "What is 'Branch Prediction' in modern processor instruction cycles?",
    answer: "Branch Prediction is a hardware mechanism where the CPU guesses the outcome of a conditional decision (e.g. loop will repeat) and speculatively fetches instructions down the predicted path before the test is even executed.",
    explanation: "If the prediction is correct, execution speed is doubled; if wrong, the speculative instructions are flushed.",
    explanationBn: "ব্রাঞ্চ প্রেডিকশন হলো এমন এক কৌশল যার মাধ্যমে প্রসেসর আগে থেকেই আন্দাজ করে কোন শর্তটি সত্য হতে পারে এবং সেই অনুযায়ী নির্দেশ লোড করে রাখে।",
    category: "Modern Standards"
  },
  {
    id: "q22",
    question: "Which phase of the instruction cycle updates the Zero (Z) flag?",
    answer: "The Execute phase (or ALU operation phase) updates the Zero flag based on whether the computed arithmetic or logical output equals zero.",
    explanation: "If result == 0, Z is set to 1; otherwise, Z is cleared to 0.",
    explanationBn: "এক্সিকিউট ধাপে ALU গণনার ফলাফল শূন্য হলে Zero Flag-কে ১ করে দেয়।",
    category: "Execute Phase"
  },
  {
    id: "q23",
    question: "If an instruction is `STORE 500`, describe the exact role of MAR and MDR in the Store phase.",
    answer: "MAR is loaded with memory address 500; MDR is loaded with the value currently held in the Accumulator; the Control Unit asserts MEM_WRITE, latching MDR data into RAM[500].",
    explanation: "This writes the final computed result to persistent RAM.",
    explanationBn: "MAR-এ ঠিকানা ৫০০ যায়; MDR-এ Accumulator-এর মান যায়; এবং CU মেমোরি রাইট সিগন্যাল পাঠিয়ে র‍্যামে সংরক্ষণ করে।",
    category: "Store Phase"
  },
  {
    id: "q24",
    question: "What is an 'Out-of-Order Execution' (OoOE) engine in modern CPUs?",
    answer: "An OoOE engine allows instructions to be executed as soon as their input operands are available in registers, rather than waiting in strict program sequence order, provided data dependencies are respected.",
    explanation: "This avoids CPU stalls while waiting for slow memory data.",
    explanationBn: "ইনপুট প্রস্তুত থাকলে নির্দেশের স্বাভাবিক ক্রমের জন্য অপেক্ষা না করে দ্রুত কাজ শেষ করার আধুনিক পদ্ধতিকে Out-of-Order Execution বলে।",
    category: "Modern Standards"
  },
  {
    id: "q25",
    question: "Summary Question: Arrange in exact chronological sequence: (A) ALU computes result, (B) PC incremented, (C) Opcode decoded by CU, (D) Instruction loaded into IR, (E) Result written to Accumulator.",
    answer: "Correct Order: (D) Instruction loaded into IR ➔ (B) PC incremented ➔ (C) Opcode decoded by CU ➔ (A) ALU computes result ➔ (E) Result written to Accumulator.",
    explanation: "This corresponds directly to Fetch (D, B) -> Decode (C) -> Execute (A) -> Store (E).",
    explanationBn: "সঠিক ক্রম: D (IR-এ লোড) ➔ B (PC বৃদ্ধি) ➔ C (CU দ্বারা ডিকোড) ➔ A (ALU দ্বারা গণনা) ➔ E (ফলাফল সংরক্ষণ)।",
    category: "Sequencing"
  }
];

export default questions;
