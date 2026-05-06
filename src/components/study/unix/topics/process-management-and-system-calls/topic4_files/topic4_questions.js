// topic4_questions.js
const questions = [
  {
    question: "What does the fork() system call do?",
    shortAnswer: "Creates a new process by duplicating the calling process.",
    explanation: "The child process is an exact copy of the parent, except for PID, PPID, resource statistics, and pending signals. Both continue execution from the next instruction.",
    hint: "man 2 fork",
    level: "basic",
    codeExample: "pid_t pid = fork();"
  },
  {
    question: "What are the possible return values of fork()?",
    shortAnswer: "Negative on error, zero to child, positive (child's PID) to parent.",
    explanation: "Error returns -1 and sets errno; successful call returns twice: 0 in child, child's PID in parent.",
    hint: "Check return to decide parent vs child code.",
    level: "basic",
    codeExample: "if (pid == 0) { /* child */ } else if (pid > 0) { /* parent */ } else { /* error */ }"
  },
  {
    question: "Why does fork() return two different values?",
    shortAnswer: "Because it executes in two different contexts after duplication – the return value distinguishes them.",
    explanation: "The kernel copies the process, then each process continues with the return value adjusted: child gets 0, parent gets child PID.",
    hint: "The fork() call does not 'return' twice – two processes each return once.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is Copy‑on‑Write (COW) in relation to fork()?",
    shortAnswer: "Pages of memory are shared read‑only until either process writes, then a private copy is made.",
    explanation: "This optimization avoids duplicating entire address space, making fork() very fast.",
    hint: "Under the hood, page tables are duplicated, not physical memory.",
    level: "intermediate",
    codeExample: "fork(); // after fork, write to variable triggers page fault and copy"
  },
  {
    question: "What is the difference between fork() and vfork()?",
    shortAnswer: "vfork() suspends parent until child calls exec() or _exit(), sharing address space without copying.",
    explanation: "vfork() is obsolete; never use it in new code. COW made fork() efficient.",
    hint: "man 2 vfork warns 'this function is dangerous'.",
    level: "advanced",
    codeExample: "pid_t pid = vfork(); if (pid == 0) { execlp(...); _exit(1); }"
  },
  {
    question: "After fork(), which process runs first?",
    shortAnswer: "Unspecified – depends on scheduler. Never rely on order.",
    explanation: "Use synchronization primitives (wait, pipes, signals) if ordering required.",
    hint: "sleep() is not a guarantee.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What file descriptors are inherited by the child?",
    shortAnswer: "All open file descriptors, including their file offsets and flags.",
    explanation: "The child gets copies of the descriptors, referring to the same open file descriptions.",
    hint: "Close-on-exec flag does not affect fork, only exec.",
    level: "intermediate",
    codeExample: "int fd = open(...); fork(); // both share the same file offset"
  },
  {
    question: "How are signal handlers affected by fork()?",
    shortAnswer: "Signal handlers are inherited, but pending signals are not.",
    explanation: "The child resets pending signals and timers. Signal masks are inherited.",
    hint: "sigpending() will show none in child initially.",
    level: "advanced",
    codeExample: "signal(SIGINT, handler); fork(); // child also has handler"
  },
  {
    question: "What happens if fork() fails?",
    shortAnswer: "Returns -1 and sets errno (EAGAIN, ENOMEM, etc.). No child is created.",
    explanation: "EAGAIN: process limit reached. ENOMEM: insufficient memory for new process.",
    hint: "ulimit -u to check user process limit.",
    level: "intermediate",
    codeExample: "if ((pid = fork()) == -1) { perror('fork'); exit(1); }"
  },
  {
    question: "Does the child inherit the parent's memory locks (mlock)?",
    shortAnswer: "No, memory locks (mlock, mlockall) are not inherited.",
    explanation: "Child starts with no locked pages; would need to call mlock again.",
    hint: "MLOCK_ONFAULT not inherited either.",
    level: "expert",
    codeExample: "mlock(ptr, size); fork(); // child's pages not locked"
  },
  {
    question: "What is a 'fork bomb'?",
    shortAnswer: "Malicious or buggy program that calls fork() repeatedly, exhausting system processes.",
    explanation: "Example: while(1) fork();. Mitigated by process limits (ulimit -u).",
    hint: ":(){ :|:& };:  # bash fork bomb",
    level: "intermediate",
    codeExample: "while (1) fork();"
  },
  {
    question: "How does fork() interact with threads?",
    shortAnswer: "Only the calling thread is duplicated; other threads disappear in the child.",
    explanation: "Can cause deadlocks if child tries to acquire locks held by non‑existent threads.",
    hint: "pthread_atfork() registers handlers to clean up.",
    level: "expert",
    codeExample: "pthread_atfork(prepare, parent, child);"
  },
  {
    question: "Why should you call _exit() instead of exit() after fork() in the child?",
    shortAnswer: "exit() flushes stdio buffers and runs atexit handlers, potentially corrupting parent's buffers.",
    explanation: "_exit() terminates immediately without cleanup, safe for child.",
    hint: "Use _exit() after fork if exec fails.",
    level: "intermediate",
    codeExample: "if (pid == 0) { execlp(...); _exit(1); }"
  },
  {
    question: "What is the typical size of a process after fork()?",
    shortAnswer: "Virtual memory is same as parent, but physical memory usage increases only on writes due to COW.",
    explanation: "Initially, child shares parent's physical pages. Resident Set Size (RSS) only grows when child writes.",
    hint: "Check /proc/[pid]/smaps before and after write.",
    level: "expert",
    codeExample: "char *p = malloc(1<<20); fork(); memset(p, 0, 1<<20); // now child gets private copy"
  },
  {
    question: "What happens to open directory streams (opendir) after fork?",
    shortAnswer: "Directory streams (DIR*) are copied, but the position may be shared; not well‑defined.",
    explanation: "Better to re-open directories in child for reliable behavior.",
    hint: "Use fdopendir() and set close-on-exec.",
    level: "advanced",
    codeExample: "DIR *d = opendir('.'); fork(); // child may see wrong entries"
  },
  {
    question: "Can you call fork() from a signal handler?",
    shortAnswer: "Not allowed – fork() is not async‑signal‑safe according to POSIX.",
    explanation: "May lead to deadlocks or corruption. Use posix_spawn() if needed.",
    hint: "Man page signal-safety(7).",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does fork() affect performance on a modern Linux system?",
    shortAnswer: "Very fast – typically 10–50 microseconds, mainly from page table duplication.",
    explanation: "COW eliminates memory copying. Thousands of forks per second are possible.",
    hint: "benchmark with time(1).",
    level: "intermediate",
    codeExample: "time bash -c 'for i in {1..1000}; do /bin/true; done'"
  },
  {
    question: "What is the difference between fork() and clone()?",
    shortAnswer: "clone() is a Linux‑specific syscall that allows fine‑grained sharing (memory, files, signals) – used to implement threads.",
    explanation: "fork() is implemented via clone() with flags that copy everything (SIGCHLD only).",
    hint: "strace fork shows clone(child_stack=0, flags=SIGCHLD).",
    level: "expert",
    codeExample: "clone(child_func, stack, CLONE_VM | CLONE_FILES, arg); // create thread"
  },
  {
    question: "What is the purpose of the 'vfork' flag in clone()?",
    shortAnswer: "Equivalent to vfork() – shares address space and suspends parent until child exec or exit.",
    explanation: "Clone with CLONE_VFORK | CLONE_VM. Rarely used today.",
    hint: "Avoid unless you know what you're doing.",
    level: "expert",
    codeExample: "clone(..., CLONE_VFORK | CLONE_VM);"
  },
  {
    question: "Can a child process inherit the parent's environment variables?",
    shortAnswer: "Yes, entire environment array is copied to child.",
    explanation: "Modifications in child do not affect parent. Use execle to change environment.",
    hint: "extern char **environ;",
    level: "basic",
    codeExample: "fork(); if (pid==0) setenv('FOO','bar',1); // only child sees FOO"
  },
  {
    question: "What happens to the program counter (PC) after fork()?",
    shortAnswer: "Both parent and child have PC pointing to the instruction after fork().",
    explanation: "The child does not start from main() again – it continues from exactly where fork() returned.",
    hint: "Same line of C code is executed by both.",
    level: "intermediate",
    codeExample: "printf('before fork\\n'); fork(); printf('after fork\\n'); // prints 3 lines total?"
  },
  {
    question: "How do you avoid duplicate output when using printf before fork()?",
    shortAnswer: "Call fflush(stdout) before fork(), or use unbuffered output (setbuf).",
    explanation: "Because stdio buffers are duplicated; flushes ensure data is written once.",
    hint: "fflush(stdout) before fork.",
    level: "intermediate",
    codeExample: "printf('Hello'); fflush(stdout); fork();"
  },
  {
    question: "What is the maximum number of children a process can have?",
    shortAnswer: "Limited by system process limit (kernel.pid_max, user limits).",
    explanation: "Each child consumes a PID slot until reaped. Can be thousands.",
    hint: "ulimit -u shows per‑user max.",
    level: "advanced",
    codeExample: "while (fork() != -1) counter++; // fork until failure"
  },
  {
    question: "What does the kernel do during fork() at the lowest level?",
    shortAnswer: "Allocates new task_struct, copies task fields, duplicates page tables, and sets child to TASK_RUNNING.",
    explanation: "Also increments file descriptor and memory region reference counts.",
    hint: "Source: kernel/fork.c, do_fork() → copy_process().",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a 'PID namespace' in Linux?",
    shortAnswer: "Isolates process IDs: inside the namespace, a process can have PID 1 (init) even if outside it has a high PID.",
    explanation: "Used by containers. fork() inside a namespace creates child with new PID inside that namespace.",
    hint: "ls -l /proc/self/ns/pid",
    level: "expert",
    codeExample: "unshare --pid --fork --mount-proc bash"
  },
  {
    question: "How does fork() interact with resource limits (setrlimit)?",
    shortAnswer: "Child inherits both soft and hard limits from parent.",
    explanation: "Changes to limits after fork affect only the calling process.",
    hint: "ulimit -a",
    level: "intermediate",
    codeExample: "getrlimit(RLIMIT_NPROC, &rl);"
  },
  {
    question: "What is the 'fork-exec' pattern and why is it used?",
    shortAnswer: "fork to create new process, then exec to replace it with a different program.",
    explanation: "Allows the parent to continue running while child runs a new program. Used by shells, servers.",
    hint: "Almost every command in bash: fork+exec.",
    level: "basic",
    codeExample: "if (fork() == 0) execlp('ls','ls',NULL); else wait(NULL);"
  },
  {
    question: "Can a child process access the parent's memory after fork?",
    shortAnswer: "Only via shared memory (mmap MAP_SHARED) or by reading /proc/pid/mem, otherwise completely isolated.",
    explanation: "Virtual memory is duplicated (COW), so modifications are private.",
    hint: "COW ensures isolation.",
    level: "intermediate",
    codeExample: "int *ptr = mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0); fork(); // child sees same memory"
  },
  {
    question: "What is the effect of 'nice' values on fork()?",
    shortAnswer: "Child inherits the parent's nice value (priority).",
    explanation: "Scheduling priority is inherited; can be changed independently later.",
    hint: "renice in child doesn't affect parent.",
    level: "intermediate",
    codeExample: "nice(10); fork(); // child also has nice 10"
  },
  {
    question: "What is the return type of fork() and why?",
    shortAnswer: "pid_t, signed integer, because it must return -1 on error.",
    explanation: "On Linux, pid_t is int (32-bit). Max PID is 4194304 on 64-bit.",
    hint: "pid_t defined in <sys/types.h>",
    level: "basic",
    codeExample: "pid_t pid = fork();"
  }
];

export default questions;