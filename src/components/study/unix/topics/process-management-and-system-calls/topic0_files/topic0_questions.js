// topic0_questions.js — 30 mixed-level questions from moderate to expert
const questions = [
  {
    question: "What is the key difference between a program and a process?",
    shortAnswer: "A program is a passive executable file on disk; a process is an active instance in memory with state.",
    explanation: "A program (e.g., /bin/bash) is just code and data. When loaded into memory and executed by the kernel, it becomes a process with its own PID, address space, and resources.",
    hint: "Think about a recipe (static) vs. actually cooking (dynamic).",
    level: "basic",
    codeExample: "ls -l is a program; running it creates a process with a unique PID."
  },
  {
    question: "How does the kernel identify a unique process?",
    shortAnswer: "Using the Process ID (PID), a non-negative integer assigned at creation.",
    explanation: "PIDs are allocated sequentially up to a maximum (default 32768 on many Linux), then wrap around. Kernel also uses PID namespaces for containers.",
    hint: "ps -e shows PIDs. Try echo $$ in bash.",
    level: "basic",
    codeExample: "int pid = fork(); if(pid == 0) printf('Child PID: %d', getpid());"
  },
  {
    question: "What is the Process Control Block (PCB)?",
    shortAnswer: "Kernel data structure that stores all information about a process (state, registers, memory map, etc.)",
    explanation: "In Linux, it's struct task_struct, containing over 100 fields including PID, state, filesystem info, signal handlers.",
    hint: "It's the 'ID card' of a process for the kernel.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What does the 'text segment' of a process contain?",
    shortAnswer: "The actual machine code (instructions) of the program, usually read-only.",
    explanation: "Shared among multiple instances of the same program to save memory. Modern Linux uses ASLR but text segment is typically mmap'd readonly.",
    hint: "Cannot be modified at runtime; a segmentation fault if you try.",
    level: "intermediate",
    codeExample: "objdump -d a.out shows text segment as .text"
  },
  {
    question: "Where are global variables stored in a process memory layout?",
    shortAnswer: "Data segment (initialized) and BSS (uninitialized globals).",
    explanation: "Initialized globals have fixed values; BSS is zero-initialized at load. Both are part of data segment.",
    hint: "int x = 10; // initialized data , int y; // BSS",
    level: "basic",
    codeExample: "static int count; // BSS"
  },
  {
    question: "Can two processes share the same physical memory?",
    shortAnswer: "Yes, via shared memory IPC or copy-on-write after fork().",
    explanation: "Kernel uses virtual memory mapping; pages can be marked shared. fork() initially shares all pages as COW.",
    hint: "mmap with MAP_SHARED allows multiple processes to see same memory.",
    level: "expert",
    codeExample: "shm_open() / mmap(..., MAP_SHARED, ...)"
  },
  {
    question: "What happens when you run the same program twice simultaneously?",
    shortAnswer: "Two separate processes are created, each with its own PID, memory space, and registers.",
    explanation: "Text segment may be shared but data/heap/stack are independent. Executable file is read but process contexts differ.",
    hint: "Open two terminals, run 'vim' in both – two processes.",
    level: "intermediate",
    codeExample: "ps aux | grep vim | wc -l"
  },
  {
    question: "Explain the term 'context switch' related to processes.",
    shortAnswer: "Switching CPU from one process to another, saving/restoring PCB state.",
    explanation: "Involves saving registers, program counter, and updating memory maps. Overhead can affect performance.",
    hint: "Think about multitasking: kernel scheduler decides when to switch.",
    level: "intermediate",
    codeExample: "vmstat 1 shows 'cs' column (context switches per second)."
  },
  {
    question: "What is the maximum number of processes on a typical Linux system?",
    shortAnswer: "Limited by kernel.pid_max (usually 32768) and available memory.",
    explanation: "Each process consumes at least a small kernel stack. Adjust via /proc/sys/kernel/pid_max. 64-bit systems can go higher.",
    hint: "cat /proc/sys/kernel/pid_max",
    level: "expert",
    codeExample: "sysctl kernel.pid_max"
  },
  {
    question: "Difference between user mode and kernel mode in process execution.",
    shortAnswer: "User mode: restricted instructions, cannot access hardware directly. Kernel mode: full system access.",
    explanation: "Process switches to kernel mode via system calls (e.g., read, write) or interrupts.",
    hint: "A process in user mode can't write arbitrary physical memory.",
    level: "intermediate",
    codeExample: "strace ls shows system calls transitioning to kernel mode."
  },
  {
    question: "What is the PID of the init process (systemd) on modern Linux?",
    shortAnswer: "PID 1.",
    explanation: "The first userspace process started by kernel, responsible for adopting orphans and system initialization.",
    hint: "ps -p 1",
    level: "basic",
    codeExample: "pstree -p 1"
  },
  {
    question: "Can a process change its own PID?",
    shortAnswer: "No. PIDs are assigned by kernel and immutable for the lifetime of process.",
    explanation: "For security and uniqueness. Namespaces can create new PID namespace but the original remains.",
    hint: "clone() with CLONE_NEWPID creates a new PID namespace.",
    level: "expert",
    codeExample: "unshare --fork --pid"
  },
  {
    question: "What is the typical size of the stack segment for a process?",
    shortAnswer: "Default 8MB on many Linux systems (ulimit -s).",
    explanation: "Stack grows dynamically but limited. Exceeding leads to segmentation fault.",
    hint: "ulimit -s unlimited may cause runaway memory.",
    level: "intermediate",
    codeExample: "getrlimit(RLIMIT_STACK, &rl)"
  },
  {
    question: "What is the role of ELF (Executable and Linkable Format)?",
    shortAnswer: "Standard binary format for executables, object code, core dumps on Unix.",
    explanation: "Kernel reads ELF headers to map segments (text, data) into memory and setup entry point.",
    hint: "file /bin/ls shows ELF 64-bit LSB executable.",
    level: "expert",
    codeExample: "readelf -h /bin/bash"
  },
  {
    question: "What are process exit codes?",
    shortAnswer: "Integer returned by process to parent indicating success (0) or failure (non-zero).",
    explanation: "Shell variable $? contains last exit code. Used in scripting and error handling.",
    hint: "ls nosuchfile; echo $? returns 2.",
    level: "basic",
    codeExample: "exit(EXIT_FAILURE);"
  },
  {
    question: "What is a process's working directory and how is it stored?",
    shortAnswer: "Current directory for relative paths; stored in PCB (task_struct->fs).",
    explanation: "Can be changed via chdir() system call. Inherited from parent.",
    hint: "pwd shows working directory of shell.",
    level: "intermediate",
    codeExample: "chdir('/home/swadeep');"
  },
  {
    question: "What is process accounting in Unix?",
    shortAnswer: "System feature that records per-process resource usage (CPU, I/O).",
    explanation: "Enabled via accton, data written to /var/account/pacct. Useful for billing/auditing.",
    hint: "lastcomm command shows previously executed processes.",
    level: "expert",
    codeExample: "accton on && sa"
  },
  {
    question: "Define 'process image' in memory.",
    shortAnswer: "Complete representation of process: text, data, stack, heap, and kernel stack.",
    explanation: "It's what gets swapped to disk during swap out.",
    hint: "pmap <pid> displays detailed memory map.",
    level: "intermediate",
    codeExample: "cat /proc/self/maps"
  },
  {
    question: "What is the effect of exec() family of system calls on a process?",
    shortAnswer: "Replaces current process image with a new program, keeping same PID.",
    explanation: "It discards text, data, heap, stack of old program and loads new one. No new process created.",
    hint: "shell uses fork+exec to run commands.",
    level: "advanced",
    codeExample: "execlp('ls', 'ls', '-l', NULL);"
  },
  {
    question: "What is a 'process group'?",
    shortAnswer: "Collection of one or more processes that can receive signals together.",
    explanation: "Used for job control in shells (e.g., Ctrl+C sends SIGINT to all in foreground group).",
    hint: "ps -o pid,pgid,comm shows process group IDs.",
    level: "intermediate",
    codeExample: "setpgid() or kill(-pgid, SIGTERM)"
  },
  {
    question: "How does the scheduler know about process states?",
    shortAnswer: "From PCB: state field (TASK_RUNNING, TASK_INTERRUPTIBLE, etc.)",
    explanation: "Scheduler picks next process based on priority, timeslice, and state.",
    hint: "Process in TASK_UNINTERRUPTIBLE won't respond to signals.",
    level: "expert",
    codeExample: "ps -l shows process state code (R, S, D, Z, T)."
  },
  {
    question: "Why is the kernel stack separate from user stack?",
    shortAnswer: "Security and stability: kernel stack used during system calls and interrupts, isolated from user space.",
    explanation: "Prevents user processes from corrupting kernel data.",
    hint: "Each process has a small kernel stack (e.g., 8KB).",
    level: "expert",
    codeExample: "CONFIG_THREAD_SIZE in kernel config."
  },
  {
    question: "What is a 'fork bomb'?",
    shortAnswer: "A malicious process that recursively calls fork() exponentially, exhausting system resources.",
    explanation: "Example: :(){ :|:& };:  — creates infinite processes.",
    hint: "Prevent via ulimit -u to limit user processes.",
    level: "intermediate",
    codeExample: "systemd limits DefaultTasksMax in cgroup."
  },
  {
    question: "What does the 'resident set size (RSS)' mean?",
    shortAnswer: "Portion of process memory currently held in RAM (not swapped).",
    explanation: "Used by tools like top and ps to estimate memory usage.",
    hint: "Cannot be relied for exact usage due to shared libraries.",
    level: "intermediate",
    codeExample: "ps -o pid,rss,vsz"
  },
  {
    question: "What is ASLR and how does it affect processes?",
    shortAnswer: "Address Space Layout Randomization: randomizes memory regions to prevent exploit predictability.",
    explanation: "Makes buffer overflow attacks harder. Can be disabled per process.",
    hint: "echo 0 > /proc/sys/kernel/randomize_va_space",
    level: "expert",
    codeExample: "gdb will show randomized addresses."
  },
  {
    question: "How to trace system calls made by a process without source code?",
    shortAnswer: "Use strace (Linux) or truss (Solaris).",
    explanation: "Intercepts and prints kernel interactions. Heavy overhead.",
    hint: "strace -p PID -e trace=file",
    level: "advanced",
    codeExample: "strace -c ls"
  },
  {
    question: "What is the purpose of a process's environment block?",
    shortAnswer: "Stores key-value strings (PATH, HOME) inherited from parent.",
    explanation: "Accessed via environ variable or third argument to main(). Shared across exec unless execle used.",
    hint: "printenv shows current environment.",
    level: "basic",
    codeExample: "extern char **environ;"
  },
  {
    question: "What is 'copy-on-write' optimization in fork()?",
    shortAnswer: "Parent and child share physical pages until one writes, then page duplicated.",
    explanation: "Eliminates unnecessary copying, makes fork cheap.",
    hint: "After fork, both processes see same page but marked read-only.",
    level: "expert",
    codeExample: "fork() + modifying a variable triggers page fault."
  },
  {
    question: "Define 'real-time process' on Unix.",
    shortAnswer: "Process with SCHED_FIFO or SCHED_RR scheduling policy, higher priority than normal.",
    explanation: "Used for time-sensitive tasks. Requires root or CAP_SYS_NICE.",
    hint: "chrt -f 99 ./my-app",
    level: "expert",
    codeExample: "sched_setscheduler()"
  },
  {
    question: "What is the 'no_new_privs' flag on Linux processes?",
    shortAnswer: "Security flag preventing privilege escalation via execve (setuid binaries ineffective).",
    explanation: "Used in seccomp and containers to restrict new privileges.",
    hint: "prctl(PR_SET_NO_NEW_PRIVS, 1);",
    level: "expert",
    codeExample: "echo 1 > /proc/self/attr/no_new_privs"
  }
];

export default questions;