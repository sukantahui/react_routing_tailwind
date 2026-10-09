const questions = [
  {
    id: 1,
    question: "Which category of software acts as an intermediary interface between computer hardware and user application programs?",
    options: [
      "Application Software",
      "System Software (Operating System)",
      "Utility Software",
      "Firmware Only"
    ],
    correctAnswer: 1,
    explanation: "System Software—specifically the Operating System—manages physical hardware resources (CPU, memory, disk, I/O) and provides a standard programming interface and execution environment for user application software.",
    hint: "Recall the layered architecture: User -> Application Software -> Operating System -> Hardware."
  },
  {
    id: 2,
    question: "Which of the following is a primary function of an Operating System?",
    options: [
      "Processor (CPU) Management & Scheduling",
      "Memory (RAM) Allocation & Deallocation",
      "File System & Device I/O Management",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The OS handles processor scheduling, primary/secondary memory management, file systems (directories, access rights), and device drivers for hardware I/O communication.",
    hint: "The OS controls all major hardware subsystems."
  },
  {
    id: 3,
    question: "What is the key difference between a Compiler and an Interpreter?",
    options: [
      "A compiler translates code line-by-line, whereas an interpreter translates the entire source code at once.",
      "A compiler translates the entire source code at once into an intermediate object/machine code, while an interpreter translates and executes line-by-line.",
      "Compilers are used only for machine language, while interpreters are for assembly language.",
      "There is no difference; both produce standalone executable binary files."
    ],
    correctAnswer: 1,
    explanation: "A Compiler translates the entire high-level program into machine code in one single pass before execution (generating object code), whereas an Interpreter parses, translates, and executes source code line-by-line without producing a permanent object file.",
    hint: "Python utilizes an interpreter (CPython bytecode interpreter), whereas C/C++ uses a compiler (gcc/clang)."
  },
  {
    id: 4,
    question: "An Assembler translates which type of programming language into machine code?",
    options: [
      "High-Level Language (Python, Java)",
      "Low-Level Assembly Language (mnemonics like MOV, ADD)",
      "Natural Language (English)",
      "Binary Machine Code"
    ],
    correctAnswer: 1,
    explanation: "An Assembler is a language processor that specifically translates low-level symbolic assembly language mnemonics (e.g., `MOV AX, BX`, `ADD AX, 5`) into binary machine language instructions.",
    hint: "Assembly language uses human-readable mnemonic codes corresponding directly to CPU opcodes."
  },
  {
    id: 5,
    question: "Which of the following is categorized as Utility Software?",
    options: [
      "Disk Defragmenter & Antivirus Scanner",
      "Spreadsheet Software (MS Excel)",
      "Web Browser (Google Chrome)",
      "Linux Operating System Kernel"
    ],
    correctAnswer: 0,
    explanation: "Utility software assists in system maintenance, housekeeping, optimization, and security without performing direct user business logic. Examples include Antivirus, Disk Defragmenter, Compression tools (WinRAR/7-Zip), and Backup utilities.",
    hint: "Utilities perform system maintenance and health upkeep."
  },
  {
    id: 6,
    question: "Which classification applies to operating systems designed to guarantee completion of critical tasks within strictly enforced microsecond/millisecond deadlines [Enrichment]?",
    options: [
      "Batch Processing Operating System",
      "Real-Time Operating System (RTOS)",
      "Distributed Operating System",
      "Single-User Single-Tasking OS"
    ],
    correctAnswer: 1,
    explanation: "A Real-Time Operating System (RTOS) is engineered for deterministic, mission-critical environments (flight avionics, cardiac pacemakers, industrial robotics) where deadlines must be strictly met (Hard RTOS) or prioritized (Soft RTOS).",
    hint: "Used in aerospace, robotics, and defense systems where latency failure causes catastrophe."
  },
  {
    id: 7,
    question: "What is an Operating System Kernel?",
    options: [
      "The outer graphical user interface (GUI) of the OS",
      "The central core of the OS that remains resident in main memory and controls low-level hardware access",
      "The user desktop wallpaper manager",
      "The browser rendering engine"
    ],
    correctAnswer: 1,
    explanation: "The Kernel is the core component of an Operating System that is loaded into memory during booting and manages CPU scheduling, physical memory, device drivers, and system calls with highest hardware privilege (Ring 0 / Kernel Mode).",
    hint: "It is the fundamental core holding root supervisor privileges."
  },
  {
    id: 8,
    question: "Which of the following is an example of Open Source System Software?",
    options: [
      "Microsoft Windows 11",
      "GNU/Linux (Ubuntu, Debian, Fedora)",
      "Apple macOS",
      "Adobe Photoshop"
    ],
    correctAnswer: 1,
    explanation: "GNU/Linux is free and open-source system software distributed under the GNU General Public License (GPL), allowing users to inspect, modify, and redistribute the underlying source code.",
    hint: "Created by Linus Torvalds and the GNU Project."
  },
  {
    id: 9,
    question: "What occurs during the initial 'Booting' process of a computer system?",
    options: [
      "The CPU compiles all Python programs on the hard drive.",
      "The BIOS/UEFI executes POST (Power-On Self-Test) and the bootstrap loader loads the OS kernel from secondary storage into RAM.",
      "The disk defragmenter reorganizes all sector clusters.",
      "The monitor updates its pixel refresh rate."
    ],
    correctAnswer: 1,
    explanation: "Booting involves firmware (BIOS/UEFI in ROM) testing hardware via POST, finding the boot sector, and invoking the bootstrap loader to transfer the OS kernel from secondary storage (SSD/HDD) into primary memory (RAM).",
    hint: "Bootstrap loading transfers the operating system kernel into volatile RAM."
  },
  {
    id: 10,
    question: "Which type of software is customized specifically for the unique operational requirements of a particular organization (e.g., Army Public School Barrackpore Fee Collection Portal)?",
    options: [
      "General Purpose Application Software",
      "Customized / Tailor-Made Application Software",
      "System Software",
      "Device Driver"
    ],
    correctAnswer: 1,
    explanation: "Tailor-made (customized) software is bespoke software designed, developed, and deployed to meet the explicit rules, workflows, and database schema of a specific organization.",
    hint: "Bespoke vs off-the-shelf software packages."
  },
  {
    id: 11,
    question: "What is a Device Driver?",
    options: [
      "A human who drives delivery vans for computer hardware",
      "A specialized system software program that enables the OS to communicate with a specific peripheral hardware device",
      "A hardware cable connecting the monitor to the CPU",
      "A Python compiler plugin"
    ],
    correctAnswer: 1,
    explanation: "A Device Driver translates general OS I/O commands (like 'print page') into device-specific low-level electrical control signals understood by that specific printer, GPU, or network card.",
    hint: "It acts as a translator between generic OS commands and peripheral hardware controllers."
  },
  {
    id: 12,
    question: "Which memory management technique divides physical RAM into fixed-size blocks called 'frames' and logical program memory into 'pages'?",
    options: [
      "Paging",
      "Segmentation",
      "Spooling",
      "Defragmentation"
    ],
    correctAnswer: 0,
    explanation: "Paging is an OS virtual memory management scheme that eliminates external fragmentation by allocating fixed-size blocks of physical memory (frames) to non-contiguous virtual memory blocks (pages).",
    hint: "Pages of virtual memory map into physical frames."
  },
  {
    id: 13,
    question: "What does SPOOLing stand for in Operating System terminology?",
    options: [
      "Simultaneous Peripheral Operations On-Line",
      "System Process Optimal Operating Logic",
      "Sequential Program Output Output Linker",
      "Standard Primary Operating Object Loader"
    ],
    correctAnswer: 0,
    explanation: "SPOOLing stands for 'Simultaneous Peripheral Operations On-Line'. It buffers print jobs or I/O data onto a disk queue so that slow output devices do not stall high-speed CPU execution.",
    hint: "Used by print queues to buffer documents."
  },
  {
    id: 14,
    question: "Which type of user interface requires users to type text commands with precise syntax at a prompt?",
    options: [
      "Graphical User Interface (GUI)",
      "Command Line Interface (CLI / CUI)",
      "Touch User Interface (TUI)",
      "Voice User Interface (VUI)"
    ],
    correctAnswer: 1,
    explanation: "A Command Line Interface (CLI) or Character User Interface (CUI) requires text-based commands (e.g. `ls`, `dir`, `cd`, `python3`) entered into a terminal prompt.",
    hint: "DOS and Unix shells are classic examples."
  },
  {
    id: 15,
    question: "Which of the following describes a Multi-User Operating System?",
    options: [
      "An OS that allows multiple people to access and share system hardware resources simultaneously",
      "An OS that can only run one single program for one user",
      "An OS with multiple desktop wallpapers",
      "An OS that runs on multi-core processors without network access"
    ],
    correctAnswer: 0,
    explanation: "A multi-user OS (such as Linux, Unix, Windows Server) allows multiple concurrent user sessions over networks, enforcing memory protection, security quotas, and isolated user permissions.",
    hint: "Allows simultaneous logged-in users with isolated home directories."
  },
  {
    id: 16,
    question: "What is an Operating System System Call?",
    options: [
      "A telephone call to technical customer support",
      "A programmatic programmatic request made by an active user process to the OS kernel to request privileged services (e.g., file reading, hardware I/O)",
      "An interrupt generated when the user clicks the mouse",
      "A compiler error message"
    ],
    correctAnswer: 1,
    explanation: "System calls (such as `open()`, `read()`, `write()`, `fork()`) are the programmatic API bridge that transitions execution from unprivileged User Mode to privileged Kernel Mode.",
    hint: "It is the gateway for user programs to ask the kernel for protected resources."
  },
  {
    id: 17,
    question: "Which of the following is NOT an operating system?",
    options: [
      "Ubuntu Linux",
      "macOS Sequoia",
      "Oracle 19c Database",
      "Microsoft Windows 11"
    ],
    correctAnswer: 2,
    explanation: "Oracle 19c is a Relational Database Management System (RDBMS) / Application-level server software, not an underlying operating system.",
    hint: "Oracle is a database engine that runs on top of an OS."
  },
  {
    id: 18,
    question: "What is the primary role of a Linker in the software compilation pipeline?",
    options: [
      "To connect computer hardware to the internet",
      "To combine multiple compiled object modules (`.o` / `.obj`) and library functions into a single executable file",
      "To format the hard disk drive",
      "To translate Python source code into HTML"
    ],
    correctAnswer: 1,
    explanation: "A Linker takes relocatable object code files generated by the compiler and binds them with precompiled library functions (like C `printf` or standard math libraries) to produce the final binary executable (`.exe` / `.elf`).",
    hint: "It links compiled code with external library modules."
  },
  {
    id: 19,
    question: "What is the primary role of a Loader?",
    options: [
      "To load the final executable program from secondary storage into primary memory (RAM) and initiate CPU execution",
      "To download files from web servers",
      "To load paper into the printer tray",
      "To compile Python code to bytecode"
    ],
    correctAnswer: 0,
    explanation: "The Loader is an OS system component that allocates memory space, reads the executable binary from disk, resolves memory addresses, and transfers CPU execution control to the program entry point (`main`).",
    hint: "It loads the executable into RAM and starts execution."
  },
  {
    id: 20,
    question: "How does a Time-Sharing Operating System allocate CPU time among multiple active processes?",
    options: [
      "By giving the entire CPU to one program until it completely finishes, ignoring all other users",
      "By allocating fixed, tiny slices of CPU time (time quantum) sequentially to each process using Round-Robin scheduling",
      "By random lottery draws",
      "By running only one program per calendar day"
    ],
    correctAnswer: 1,
    explanation: "Time-sharing systems use multi-programming with CPU time-slicing (quantum of e.g. 10–50 ms), rapidly switching between processes so users perceive seamless concurrent execution.",
    hint: "Uses rapid round-robin time quanta."
  },
  {
    id: 21,
    question: "Which type of software is MS Office Word / LibreOffice Writer?",
    options: [
      "System Software",
      "General Purpose Application Software",
      "Utility Software",
      "Device Driver"
    ],
    correctAnswer: 1,
    explanation: "Word processors like MS Word or LibreOffice Writer are General Purpose Application Software designed to fulfill generic end-user productivity tasks (document authoring, formatting, printing).",
    hint: "Widely used application software available off-the-shelf."
  },
  {
    id: 22,
    question: "What is Virtual Memory in an Operating System?",
    options: [
      "A fictitious memory chip sold online",
      "A storage allocation scheme that utilizes secondary storage (hard drive/SSD swap space) to extend the apparent capacity of physical RAM",
      "Memory used exclusively by virtual reality headsets",
      "ROM chips storing BIOS firmware"
    ],
    correctAnswer: 1,
    explanation: "Virtual Memory gives processes the illusion of contiguous, vast address space by swapping dormant memory pages between physical RAM and disk swap/pagefile storage.",
    hint: "Uses hard drive swap space as an extension of physical RAM."
  },
  {
    id: 23,
    question: "Which language processor produces bytecode (`.pyc`) before running it on a virtual machine?",
    options: [
      "Pure C Compiler",
      "CPython / Java Virtual Machine (JVM) Hybrid Execution System",
      "Hardware Assembler",
      "Macro Preprocessor"
    ],
    correctAnswer: 1,
    explanation: "Modern Python (CPython) compiles human-readable `.py` source code into platform-independent intermediate Bytecode (`.pyc`), which is then dynamically interpreted by the Python Virtual Machine (PVM).",
    hint: "Python source (.py) is compiled to bytecode (.pyc) before interpretation."
  },
  {
    id: 24,
    question: "Which file system is standard on modern Microsoft Windows operating systems?",
    options: [
      "FAT16",
      "NTFS (New Technology File System)",
      "ext4",
      "HFS+"
    ],
    correctAnswer: 1,
    explanation: "NTFS (New Technology File System) is the default journaling file system on modern Windows versions, providing file-level security permissions, encryption, disk quotas, and recovery journals.",
    hint: "NTFS replaced FAT32 on modern Windows systems."
  },
  {
    id: 25,
    question: "Case Study: Susmita is launching a video rendering tool that requires 20 GB of memory, but her PC only has 16 GB of physical RAM. Why does the program not crash immediately?",
    options: [
      "The CPU doubles its clock frequency to synthesize RAM.",
      "The Operating System uses Virtual Memory (Paging / Swap Space on the SSD) to compensate for the physical RAM shortage.",
      "The monitor buffers the remaining 4 GB of pixels.",
      "The program deletes all background Windows files to make space."
    ],
    correctAnswer: 1,
    explanation: "The OS Virtual Memory Manager pages out inactive memory blocks to the SSD pagefile/swap partition, allowing the total addressable memory to exceed physical RAM capacity without terminating the application.",
    hint: "The OS virtual memory manager pages inactive memory to disk swap space."
  }
];

export default questions;
