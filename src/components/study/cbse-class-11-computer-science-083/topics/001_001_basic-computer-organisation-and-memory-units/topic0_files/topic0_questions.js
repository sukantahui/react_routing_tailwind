/**
 * Topic 0 FAQ Assessment Questions:
 * "Basic Computer Organisation, CPU Architecture & Memory Units"
 * Module: 001_001_basic-computer-organisation-and-memory-units
 * Subject: CBSE Class XI Computer Science (Subject Code: 083)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  // ─── BASIC FOUNDATIONAL QUESTIONS (1 - 8) ─────────────────────────────
  {
    id: "cso-q1",
    question: "What are the four primary functional components of a digital computer system according to von Neumann architecture?",
    shortAnswer: "Input Unit, Central Processing Unit (ALU + CU + Registers), Memory Unit (Primary + Secondary), and Output Unit.",
    options: [
      "Input Unit, Central Processing Unit (ALU & CU), Memory Unit, and Output Unit",
      "Monitor, Keyboard, Mouse, and Hard Disk Drive",
      "Operating System, Python Interpreter, Compiler, and Assembler",
      "Power Supply Unit, Motherboard, Graphics Card, and System Cooling Fan"
    ],
    answer: "Input Unit, Central Processing Unit (ALU & CU), Memory Unit, and Output Unit",
    explanation: "Under the classical von Neumann computer architecture, a computer consists of an Input Unit (capturing external data), a Central Processing Unit containing the Arithmetic Logic Unit and Control Unit along with internal registers, a Memory Unit (storing instructions and data), and an Output Unit (presenting results).",
    hint: "Recall the standard functional block diagram of a digital computer.",
    level: "basic",
    codeExample: "# Functional data flow in Python abstraction:\nuser_input = input('Enter data: ')  # Input Unit\nprocessed = int(user_input) * 2     # CPU (ALU operation)\nprint(processed)                    # Output Unit"
  },
  {
    id: "cso-q2",
    question: "Which component of the CPU is responsible for directing and coordinating all computer operations and instruction execution?",
    shortAnswer: "The Control Unit (CU).",
    options: [
      "Control Unit (CU)",
      "Arithmetic Logic Unit (ALU)",
      "Accumulator Register (AC)",
      "Secondary Storage Drive (SSD)"
    ],
    answer: "Control Unit (CU)",
    explanation: "The Control Unit (CU) acts as the central supervisor or nervous system of the CPU. It fetches instructions from memory, decodes what operation needs to be done, and generates precise electrical timing/control signals to direct the ALU, registers, and buses.",
    hint: "Think of this unit as the manager or conductor of an orchestra.",
    level: "basic",
    codeExample: null
  },
  {
    id: "cso-q3",
    question: "What operations are performed by the Arithmetic Logic Unit (ALU)?",
    shortAnswer: "Arithmetic operations (+, -, *, /) and logical/relational comparisons (<, >, ==, AND, OR, NOT).",
    options: [
      "Arithmetic calculations (addition, subtraction, multiplication, division) and logical decision comparisons",
      "Storing the operating system bootloader firmware permanently",
      "Decoding instruction opcodes into machine timing signals",
      "Managing file storage allocations across hard disk partitions"
    ],
    answer: "Arithmetic calculations (addition, subtraction, multiplication, division) and logical decision comparisons",
    explanation: "The ALU contains high-speed electronic circuits that perform arithmetic calculations (addition, subtraction, multiplication, division) and logical operations (AND, OR, NOT, comparisons such as less than, greater than, or equal to).",
    hint: "ALU stands for Arithmetic and Logic Unit.",
    level: "basic",
    codeExample: "# ALU operations in Python:\nsum_val = 45 + 55        # Arithmetic\nis_valid = (sum_val > 50) # Logical comparison"
  },
  {
    id: "cso-q4",
    question: "How many bits constitute a 'Nibble' and a 'Byte' respectively?",
    shortAnswer: "1 Nibble = 4 bits; 1 Byte = 8 bits.",
    options: [
      "1 Nibble = 4 bits; 1 Byte = 8 bits",
      "1 Nibble = 8 bits; 1 Byte = 16 bits",
      "1 Nibble = 2 bits; 1 Byte = 4 bits",
      "1 Nibble = 16 bits; 1 Byte = 32 bits"
    ],
    answer: "1 Nibble = 4 bits; 1 Byte = 8 bits",
    explanation: "A binary digit (0 or 1) is a 'bit'. A combination of 4 contiguous bits is defined as a 'Nibble' (often representing a single hexadecimal digit), while a group of 8 contiguous bits is a standard 'Byte' (capable of representing 256 distinct values, such as an ASCII character).",
    hint: "A byte is double the size of a nibble.",
    level: "basic",
    codeExample: "# A single ASCII character takes exactly 1 Byte (8 bits):\nimport sys\nprint(sys.getsizeof('A'))"
  },
  {
    id: "cso-q5",
    question: "Why is Random Access Memory (RAM) categorized as 'volatile' memory?",
    shortAnswer: "Because RAM loses all its stored data immediately when power supply is interrupted.",
    options: [
      "Because its contents are erased immediately when electric power is switched off",
      "Because its data changes randomly on every clock cycle without software control",
      "Because it can only be accessed once per CPU instruction cycle",
      "Because it contains sensitive cryptographic keys that expire every minute"
    ],
    answer: "Because its contents are erased immediately when electric power is switched off",
    explanation: "Volatile memory requires continuous electrical power to maintain its state. When the computer is restarted or powered down, all active data, program variables, and operating system buffers held in RAM are immediately wiped.",
    hint: "Volatile means temporary and power-dependent.",
    level: "basic",
    codeExample: null
  },
  {
    id: "cso-q6",
    question: "Which type of primary memory holds the firmware instructions needed to bootstrap the computer during power-on?",
    shortAnswer: "Read Only Memory (ROM), containing the BIOS/UEFI firmware.",
    options: [
      "Read Only Memory (ROM)",
      "Dynamic Random Access Memory (DRAM)",
      "Virtual Memory Paging File",
      "Solid State Cache (SSD)"
    ],
    answer: "Read Only Memory (ROM)",
    explanation: "ROM is non-volatile primary memory that retains its contents permanently even without electrical power. It houses the BIOS (Basic Input/Output System) or UEFI firmware which runs the Power-On Self-Test (POST) and loads the OS bootloader into RAM.",
    hint: "This memory is read-only and pre-programmed by the motherboard manufacturer.",
    level: "basic",
    codeExample: null
  },
  {
    id: "cso-q7",
    question: "What is the primary difference between Static RAM (SRAM) and Dynamic RAM (DRAM)?",
    shortAnswer: "SRAM uses flip-flops and does not need periodic refreshing (faster, expensive; used in cache); DRAM uses capacitors that leak charge and require constant refreshing (slower, dense; used as main RAM).",
    options: [
      "SRAM does not require periodic refreshing and is faster; DRAM stores charge on capacitors and requires constant refreshing",
      "SRAM is non-volatile while DRAM is volatile",
      "SRAM is used for hard disk storage while DRAM is used for CPU registers",
      "SRAM only works on Linux systems while DRAM works on Windows systems"
    ],
    answer: "SRAM does not require periodic refreshing and is faster; DRAM stores charge on capacitors and requires constant refreshing",
    explanation: "SRAM uses transistor flip-flops to store each bit, making it extremely fast without requiring refresh cycles, but it is expensive and bulky (used in CPU Cache). DRAM uses a transistor-capacitor pair where charge leaks over time, necessitating periodic refreshing thousands of times per second (used as Main RAM due to high storage density).",
    hint: "Think about capacitor leakage and the need for a memory refresh controller.",
    level: "basic",
    codeExample: null
  },
  {
    id: "cso-q8",
    question: "How many Kilobytes (KB) are there in exactly 1 Megabyte (MB) under standard binary computing measurement?",
    shortAnswer: "1 MB = 1024 KB (2^10 KB = 2^20 Bytes).",
    options: [
      "1024 KB",
      "1000 KB",
      "2048 KB",
      "512 KB"
    ],
    answer: "1024 KB",
    explanation: "In binary computing systems: 1 KB = 1024 Bytes ($2^{10}$ Bytes), 1 MB = 1024 KB ($2^{20}$ Bytes), 1 GB = 1024 MB ($2^{30}$ Bytes), and 1 TB = 1024 GB ($2^{40}$ Bytes).",
    hint: "Recall powers of 2: 2^10 = 1024.",
    level: "basic",
    codeExample: "# Memory conversion formula in Python:\nmb = 16\nkb = mb * 1024\nbytes_total = kb * 1024\nprint(f'{mb} MB = {kb} KB = {bytes_total} Bytes')"
  },

  // ─── INTERMEDIATE CONCEPTUAL & ARCHITECTURE QUESTIONS (9 - 18) ────────
  {
    id: "cso-q9",
    question: "What are the three components of the System Bus, and what are their respective directional characteristics?",
    shortAnswer: "Address Bus (Unidirectional from CPU to memory), Data Bus (Bidirectional between CPU, memory, and I/O), and Control Bus (Carries timing signals).",
    options: [
      "Address Bus (Unidirectional), Data Bus (Bidirectional), and Control Bus (Bidirectional/Unidirectional control lines)",
      "Input Bus (Unidirectional), Process Bus (Internal), and Output Bus (Unidirectional)",
      "Serial Bus, Parallel Bus, and Universal Serial Bus (USB)",
      "Power Bus, Ground Bus, and Signal Bus"
    ],
    answer: "Address Bus (Unidirectional), Data Bus (Bidirectional), and Control Bus (Bidirectional/Unidirectional control lines)",
    explanation: "The system bus consists of: 1) Address Bus (Unidirectional: CPU sends memory addresses to locate data), 2) Data Bus (Bidirectional: transmits actual data values between CPU, RAM, and devices), and 3) Control Bus (transmits read/write, clock, and interrupt commands).",
    hint: "The CPU tells WHERE to go (Address), sends/receives WHAT (Data), and specifies HOW (Control).",
    level: "intermediate",
    codeExample: null
  },
  {
    id: "cso-q10",
    question: "If a CPU has a 32-bit Address Bus, what is the maximum directly addressable physical memory capacity?",
    shortAnswer: "2^32 Bytes = 4 Gigabytes (4 GB).",
    options: [
      "4 Gigabytes (4 GB)",
      "32 Megabytes (32 MB)",
      "2 Gigabytes (2 GB)",
      "64 Gigabytes (64 GB)"
    ],
    answer: "4 Gigabytes (4 GB)",
    explanation: "A 32-bit address bus can generate $2^{32}$ distinct memory addresses. Since each address references 1 Byte of memory: $2^{32} \\text{ Bytes} = 4,294,967,296 \\text{ Bytes} = 4 \\times 1024 \\times 1024 \\times 1024 \\text{ Bytes} = 4 \\text{ GB}$. This is why 32-bit operating systems cannot utilize more than 4 GB of RAM.",
    hint: "Compute 2^32 bytes in Gigabytes.",
    level: "intermediate",
    codeExample: "# Calculate addressable memory in Python:\naddress_lines = 32\ntotal_bytes = 2 ** address_lines\ngb = total_bytes / (1024 ** 3)\nprint(f'{address_lines}-bit Address Bus can address {gb:.0f} GB of RAM')"
  },
  {
    id: "cso-q11",
    question: "What is the specific role of the Program Counter (PC) register inside the CPU?",
    shortAnswer: "It holds the memory address of the next instruction to be fetched and executed.",
    options: [
      "It holds the memory address of the next sequential instruction to be fetched",
      "It stores the intermediate mathematical result of the latest ALU calculation",
      "It counts the total number of lines in the user's Python source code file",
      "It tracks the number of times a while loop has iterated"
    ],
    answer: "It holds the memory address of the next sequential instruction to be fetched",
    explanation: "The Program Counter (PC) register points to the exact memory address of the upcoming instruction. As soon as the current instruction is fetched, the PC automatically increments to point to the next instruction (or jumps to a target address in branch/loop instructions).",
    hint: "The PC points to what the CPU will execute next.",
    level: "intermediate",
    codeExample: null
  },
  {
    id: "cso-q12",
    question: "What is the primary function of the Accumulator (AC) register in a processor?",
    shortAnswer: "It holds the intermediate operands and output results of ALU arithmetic and logic operations.",
    options: [
      "It temporarily stores intermediate arithmetic and logical results generated by the ALU",
      "It holds the binary opcode of the currently executing instruction",
      "It coordinates bus arbitration between USB and PCIe peripherals",
      "It stores the system clock frequency setting"
    ],
    answer: "It temporarily stores intermediate arithmetic and logical results generated by the ALU",
    explanation: "The Accumulator (AC) is a dedicated CPU register connected directly to the output of the ALU. When an arithmetic or logical operation is executed (e.g. `ADD R1`), the resulting value is held in the accumulator before being stored back into memory or transferred to another register.",
    hint: "It 'accumulates' calculation outcomes.",
    level: "intermediate",
    codeExample: null
  },
  {
    id: "cso-q13",
    question: "What are the four sequential phases of the CPU Machine Instruction Execution Cycle?",
    shortAnswer: "Fetch -> Decode -> Execute -> Store (Writeback).",
    options: [
      "Fetch -> Decode -> Execute -> Store (Writeback)",
      "Compile -> Link -> Load -> Run",
      "Input -> Process -> Calculate -> Display",
      "Read -> Write -> Refresh -> Purge"
    ],
    answer: "Fetch -> Decode -> Execute -> Store (Writeback)",
    explanation: "During every instruction cycle: 1) Fetch: The CU fetches the instruction from RAM using the address in the PC. 2) Decode: The instruction is parsed and decoded in the Instruction Register. 3) Execute: The ALU or CU performs the required operation. 4) Store: The result is written back to registers or RAM.",
    hint: "F-D-E-S cycle.",
    level: "intermediate",
    codeExample: null
  },
  {
    id: "cso-q14",
    question: "What principle enables High-Speed Cache Memory to dramatically speed up CPU processing?",
    shortAnswer: "The Principle of Locality of Reference (Temporal Locality and Spatial Locality).",
    options: [
      "Principle of Locality of Reference (Temporal Locality and Spatial Locality)",
      "Principle of Virtual Memory Paging",
      "Direct Memory Access (DMA) Bus Mastering",
      "Dynamic Frequency Scaling & Overclocking"
    ],
    answer: "Principle of Locality of Reference (Temporal Locality and Spatial Locality)",
    explanation: "Cache memory relies on Locality of Reference: Temporal Locality (data/instructions accessed recently are likely to be accessed again soon, e.g. loops) and Spatial Locality (data stored near currently accessed memory is likely to be accessed next, e.g. sequential arrays/lists).",
    hint: "Think about accessing array items in a loop.",
    level: "intermediate",
    codeExample: "# Temporal & Spatial Locality in a Python loop:\nnumbers = [10, 20, 30, 40, 50]\ntotal = 0\nfor num in numbers:  # Sequential memory access (Spatial) & repeated loop code (Temporal)\n    total += num"
  },
  {
    id: "cso-q15",
    question: "How is memory hierarchy organized in modern computers from fastest/most expensive to slowest/least expensive?",
    shortAnswer: "CPU Registers -> L1 Cache -> L2 Cache -> L3 Cache -> Main Memory (RAM) -> Solid State Drive (SSD) -> Hard Disk (HDD).",
    options: [
      "CPU Registers -> L1/L2/L3 Cache -> RAM -> SSD / Secondary Storage",
      "Hard Disk -> RAM -> Cache -> Registers",
      "RAM -> L1 Cache -> Registers -> Hard Disk",
      "SSD -> L3 Cache -> L1 Cache -> RAM"
    ],
    answer: "CPU Registers -> L1/L2/L3 Cache -> RAM -> SSD / Secondary Storage",
    explanation: "As you move closer to the CPU core, memory speed increases by orders of magnitude, but cost per byte increases and capacity decreases. Registers operate in fractions of a nanosecond, followed by L1/L2/L3 Cache, then RAM (nanoseconds), and finally secondary storage (microseconds to milliseconds).",
    hint: "Smallest & fastest is closest to the CPU.",
    level: "intermediate",
    codeExample: null
  },
  {
    id: "cso-q16",
    question: "What is an EEPROM, and how does it differ from traditional EPROM?",
    shortAnswer: "EEPROM (Electrically Erasable Programmable ROM) can be erased and reprogrammed byte-by-byte using electrical voltage, whereas EPROM requires exposure to ultraviolet (UV) light.",
    options: [
      "EEPROM is erased electrically using voltage, while EPROM requires exposure to ultraviolet (UV) light",
      "EEPROM is volatile while EPROM is non-volatile",
      "EEPROM is only used in hard disks while EPROM is used in RAM",
      "EEPROM cannot be rewritten once programmed by the factory"
    ],
    answer: "EEPROM is erased electrically using voltage, while EPROM requires exposure to ultraviolet (UV) light",
    explanation: "EPROM (Erasable PROM) requires removal from the motherboard and exposure to intense UV light through a quartz window for 20 minutes to erase. EEPROM (Electrically Erasable PROM) can be updated in-place electrically, forming the basis of modern Flash BIOS and USB flash drives.",
    hint: "The extra 'E' stands for Electrically.",
    level: "intermediate",
    codeExample: null
  },
  {
    id: "cso-q17",
    question: "What distinguishes Optical Mark Recognition (OMR) from Optical Character Recognition (OCR)?",
    shortAnswer: "OMR detects marked shaded bubbles or checkboxes (like exam answer sheets); OCR recognizes printed or handwritten alphanumeric text and converts it into editable digital text.",
    options: [
      "OMR detects marked positions (shaded pencil/pen bubbles), whereas OCR recognizes and converts alphanumeric text characters",
      "OMR is an output device while OCR is an input device",
      "OMR is used solely for magnetic cheques while OCR is used for scanning barcodes",
      "OMR converts voice to text while OCR converts text to speech"
    ],
    answer: "OMR detects marked positions (shaded pencil/pen bubbles), whereas OCR recognizes and converts alphanumeric text characters",
    explanation: "OMR (Optical Mark Reader) detects the presence of marks at specific pre-defined coordinate positions (e.g. CBSE multiple-choice answer sheets). OCR (Optical Character Recognition) uses pattern recognition algorithms to identify actual letter shapes from scanned document images and translate them into editable string characters.",
    hint: "Think about competitive exam answer sheets vs scanning a book page into Word.",
    level: "intermediate",
    codeExample: null
  },
  {
    id: "cso-q18",
    question: "Why are Solid-State Drives (SSDs) significantly faster than Hard Disk Drives (HDDs)?",
    shortAnswer: "SSDs use flash memory with no moving parts (near-instant electrical access), whereas HDDs rely on spinning magnetic platters and mechanical actuator read/write heads.",
    options: [
      "SSDs use non-volatile flash memory semiconductor chips with no moving mechanical parts",
      "SSDs use magnetic platters that rotate at over 100,000 RPM",
      "SSDs are connected directly to the CPU registers via optical fibers",
      "SSDs compress all files using lossy audio compression"
    ],
    answer: "SSDs use non-volatile flash memory semiconductor chips with no moving mechanical parts",
    explanation: "HDDs suffer from mechanical seek time and rotational latency because physical read/write heads must position over spinning magnetic tracks. SSDs use NAND flash memory chips, providing near-instantaneous random access and transfer rates 5x to 25x faster than mechanical drives.",
    hint: "No moving mechanical parts equals zero seek latency.",
    level: "intermediate",
    codeExample: null
  },

  // ─── ADVANCED EXAM DRILLS & CALCULATION QUESTIONS (19 - 25) ──────────
  {
    id: "cso-q19",
    question: "A high-definition video recording file has a size of 4.5 Gigabytes (GB). How many Kilobytes (KB) does this represent in exact binary notation?",
    shortAnswer: "4.5 * 1024 * 1024 = 4,718,592 KB.",
    options: [
      "4,718,592 KB",
      "4,500,000 KB",
      "4,608,000 KB",
      "4,194,304 KB"
    ],
    answer: "4,718,592 KB",
    explanation: "To convert Gigabytes (GB) to Kilobytes (KB):\n1) $4.5 \\text{ GB} \\times 1024 = 4608 \\text{ MB}$\n2) $4608 \\text{ MB} \\times 1024 = 4,718,592 \\text{ KB}$.\nIn decimal decimal approximations (often used by marketing storage vendors), it would be $4,500,000 \\text{ KB}$, but in CBSE standard binary computing ($2^{10}$), it is exactly $4,718,592 \\text{ KB}$.",
    hint: "Multiply 4.5 by 1024 twice.",
    level: "advanced",
    codeExample: "# Exact binary conversion in Python:\ngb = 4.5\nkb = gb * 1024 * 1024\nprint(f'{gb} GB = {kb:,.0f} KB')"
  },
  {
    id: "cso-q20",
    question: "Arrange the following digital storage units in strictly ascending order: Terabyte (TB), Exabyte (EB), Gigabyte (GB), Petabyte (PB), Zettabyte (ZB).",
    shortAnswer: "Gigabyte (GB) < Terabyte (TB) < Petabyte (PB) < Exabyte (EB) < Zettabyte (ZB).",
    options: [
      "GB < TB < PB < EB < ZB",
      "TB < GB < PB < ZB < EB",
      "GB < PB < TB < EB < ZB",
      "ZB < EB < PB < TB < GB"
    ],
    answer: "GB < TB < PB < EB < ZB",
    explanation: "The standard ascending hierarchy of digital units is:\nBit -> Byte -> Kilobyte (KB) -> Megabyte (MB) -> Gigabyte (GB, $2^{30}$) -> Terabyte (TB, $2^{40}$) -> Petabyte (PB, $2^{50}$) -> Exabyte (EB, $2^{60}$) -> Zettabyte (ZB, $2^{70}$) -> Yottabyte (YB, $2^{80}$).",
    hint: "Memory mnemonic: King Mega Giga Tera Peta Exa Zetta Yotta.",
    level: "advanced",
    codeExample: "# Unit multiplier verification:\nunits = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']\nfor idx, unit in enumerate(units):\n    print(f'1 {unit:<4} = 2^{idx*10} Bytes')"
  },
  {
    id: "cso-q21",
    question: "What specific register in the CPU holds the instruction code currently being decoded and executed?",
    shortAnswer: "Instruction Register (IR).",
    options: [
      "Instruction Register (IR)",
      "Memory Address Register (MAR)",
      "Memory Buffer Register (MBR / MDR)",
      "Program Counter (PC)"
    ],
    answer: "Instruction Register (IR)",
    explanation: "When an instruction is fetched from memory, it is loaded through the Memory Buffer Register (MBR) directly into the Instruction Register (IR). The Control Unit then decodes the binary opcode in the IR to determine what operation to perform.",
    hint: "It holds the *Instruction* itself.",
    level: "advanced",
    codeExample: null
  },
  {
    id: "cso-q22",
    question: "What is the distinction between Memory Address Register (MAR) and Memory Buffer Register (MBR)?",
    shortAnswer: "MAR holds the memory address being read from or written to; MBR holds the actual data or instruction fetched from or to be written into memory.",
    options: [
      "MAR holds the memory address location; MBR holds the actual data value being transferred",
      "MAR is used for arithmetic calculations; MBR is used for logical comparisons",
      "MAR is located inside RAM; MBR is located on the hard disk",
      "MAR is volatile while MBR is non-volatile"
    ],
    answer: "MAR holds the memory address location; MBR holds the actual data value being transferred",
    explanation: "The Memory Address Register (MAR) connects to the Address Bus and holds the address of the target memory cell. The Memory Buffer Register (MBR, also called MDR - Memory Data Register) connects to the Data Bus and holds the contents copied from or sent to that memory cell.",
    hint: "Address vs Buffer/Data.",
    level: "advanced",
    codeExample: null
  },
  {
    id: "cso-q23",
    question: "Which special input device is used in banking systems to process cheques by reading magnetic iron-oxide ink characters?",
    shortAnswer: "Magnetic Ink Character Reader (MICR).",
    options: [
      "Magnetic Ink Character Recognition (MICR)",
      "Optical Character Recognition (OCR)",
      "Optical Mark Recognition (OMR)",
      "Radio Frequency Identification (RFID)"
    ],
    answer: "Magnetic Ink Character Recognition (MICR)",
    explanation: "MICR (Magnetic Ink Character Recognition) is widely used in banking. Bank cheques are printed with special magnetic ink (containing iron oxide) at the bottom containing the 9-digit MICR code (City code, Bank code, Branch code). MICR scanners magnetize the ink and read the characters with near-zero error rates even if the cheque is stamped or folded.",
    hint: "Found at the bottom of bank cheques.",
    level: "advanced",
    codeExample: null
  },
  {
    id: "cso-q24",
    question: "What is an Impact Printer versus a Non-Impact Printer, and what is an example of each?",
    shortAnswer: "Impact printers physically strike an inked ribbon against paper (e.g. Dot Matrix); Non-impact printers form images using electrostatic toner or ink spray without striking (e.g. Laser, Inkjet).",
    options: [
      "Impact printers strike an inked ribbon against paper (Dot Matrix); Non-impact printers use toner/ink sprays without mechanical contact (Laser, Inkjet)",
      "Impact printers are wireless while Non-impact printers require USB cables",
      "Impact printers print in color while Non-impact printers print only in black and white",
      "Impact printers are used in smartphones while Non-impact printers are used in supercomputers"
    ],
    answer: "Impact printers strike an inked ribbon against paper (Dot Matrix); Non-impact printers use toner/ink sprays without mechanical contact (Laser, Inkjet)",
    explanation: "Impact printers (e.g. Dot Matrix printers used for railway tickets, electricity bills) physically strike pins against an inked ribbon, making them noisy but capable of producing carbon copies. Non-impact printers (e.g. Laser printers using toner powder or Inkjet printers spraying micro-droplets) are quiet, fast, and produce high-resolution graphics.",
    hint: "Think about railway reservation tickets with carbon copies.",
    level: "advanced",
    codeExample: null
  },
  {
    id: "cso-q25",
    question: "How many 256 MB RAM modules are needed to assemble a system with 4 GB of total primary memory?",
    shortAnswer: "16 modules (4 GB = 4096 MB; 4096 / 256 = 16).",
    options: [
      "16 modules",
      "8 modules",
      "32 modules",
      "4 modules"
    ],
    answer: "16 modules",
    explanation: "Calculation:\n1) $4 \\text{ GB} = 4 \\times 1024 \\text{ MB} = 4096 \\text{ MB}$.\n2) Total modules required = $4096 \\text{ MB} / 256 \\text{ MB} = 16 \\text{ modules}$.",
    hint: "Convert 4 GB to MB (4 * 1024 = 4096) and divide by 256.",
    level: "advanced",
    codeExample: "# Memory module calculation in Python:\ntarget_gb = 4\nmodule_mb = 256\ntarget_mb = target_gb * 1024\nmodules_needed = target_mb // module_mb\nprint(f'{target_gb} GB requires {modules_needed} modules of {module_mb} MB each')"
  }
];

export default questions;
