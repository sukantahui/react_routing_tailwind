// topic0_questions.js - 30 questions about System Call Interface

const questions = [
  {
    question: "What is a system call?",
    shortAnswer: "A request from user space to the kernel for a privileged operation.",
    explanation: "System calls provide an interface between applications and the OS kernel, enabling operations like file I/O, process control, and networking.",
    hint: "Think of it as a waiter taking your order to the kitchen (kernel).",
    level: "basic",
    codeExample: "ssize_t write(int fd, const void *buf, size_t count);"
  },
  {
    question: "Why can't user programs directly access hardware?",
    shortAnswer: "For security and stability – the kernel mediates all hardware access.",
    explanation: "Direct hardware access could allow a buggy or malicious program to crash the system or bypass security. The CPU supports user/kernel mode separation.",
    hint: "Without protection, one misbehaving app could bring down the whole system.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between a library function and a system call?",
    shortAnswer: "Library functions run in user space; system calls enter the kernel.",
    explanation: "For example, `printf()` is a library function that buffers output and eventually calls the `write()` system call. Many library functions are wrappers around syscalls.",
    hint: "`strace` shows you the actual syscalls behind library functions.",
    level: "intermediate",
    codeExample: "printf(\"hello\") → write(1, \"hello\", 5)"
  },
  {
    question: "How does the CPU switch from user mode to kernel mode during a syscall?",
    shortAnswer: "Via a software interrupt (int 0x80 on x86) or dedicated `syscall`/`sysenter` instruction.",
    explanation: "The trap instruction raises privilege level, saves registers, and jumps to a predefined kernel entry point.",
    hint: "Modern CPUs have fast syscall instructions (e.g., `syscall` on x86-64).",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the purpose of the `errno` variable?",
    shortAnswer: "It holds the error code set by system calls or library functions on failure.",
    explanation: "When a syscall returns -1, `errno` contains a numeric code (e.g., EACCES, ENOENT) that explains the error. Use `perror()` or `strerror()` to convert to a readable message.",
    hint: "Always check `errno` immediately after a failed syscall.",
    level: "basic",
    codeExample: "if (open(\"file\", O_RDONLY) == -1) { perror(\"open\"); }"
  },
  {
    question: "What is the system call overhead?",
    shortAnswer: "The cost of switching to kernel mode and back, typically thousands of CPU cycles.",
    explanation: "Overhead includes saving/restoring registers, switching address spaces, and cache/TLB effects. Batching I/O (reading/writing large buffers) reduces per-byte overhead.",
    hint: "A single `read` of 4096 bytes is much cheaper than 4096 reads of 1 byte.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Name five common system call categories.",
    shortAnswer: "Process control, file management, device management, information maintenance, communication.",
    explanation: "Examples: fork/exec (process), open/read/write (file), ioctl (device), getpid (info), socket/send/recv (communication).",
    hint: "These map to the classic OS textbook categories.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does `strace` do?",
    shortAnswer: "Traces system calls and signals made by a process.",
    explanation: "`strace` attaches to a program (or runs it) and prints every syscall name, arguments, and return value. Invaluable for debugging and performance analysis.",
    hint: "Use `strace -e trace=open` to see only file openings.",
    level: "intermediate",
    codeExample: "strace -c ls        # summary\nstrace -e trace=file ls  # file-related syscalls"
  },
  {
    question: "What is the difference between `read()` and `fread()`?",
    shortAnswer: "`read()` is a system call; `fread()` is a stdio library function that uses buffering.",
    explanation: "`fread()` reads large chunks via `read()` into a user‑space buffer, then serves small requests from that buffer. This reduces syscall overhead.",
    hint: "`fread()` is more efficient for many small reads.",
    level: "intermediate",
    codeExample: "fread(buf, 1, 100, fp)  // may call read() only once"
  },
  {
    question: "What is `EINTR` and why does it happen?",
    shortAnswer: "A system call was interrupted by a signal before it could complete.",
    explanation: "If a signal handler is installed without SA_RESTART, slow syscalls (read, write, wait) may return -1 with errno=EINTR. The programmer should retry the call.",
    hint: "Check `man 7 signal` for restart behaviour.",
    level: "expert",
    codeExample: "while ((n = read(fd, buf, size)) == -1 && errno == EINTR);"
  },
  {
    question: "How are system calls implemented in the Linux kernel?",
    shortAnswer: "Each syscall has a unique number and a corresponding handler function.",
    explanation: "The kernel maintains a sys_call_table array. When a syscall trap occurs, the kernel indexes this table by the syscall number and calls the handler.",
    hint: "Look for `SYSCALL_DEFINEn` macros in kernel source.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `fork()` system call?",
    shortAnswer: "Creates a new process by duplicating the calling process.",
    explanation: "The new process (child) is an exact copy of the parent, except for PID and certain resources. Returns 0 to the child, child PID to the parent.",
    hint: "After fork, both processes run concurrently.",
    level: "basic",
    codeExample: "pid_t pid = fork(); if (pid == 0) { /* child */ } else { /* parent */ }"
  },
  {
    question: "What does the `execve()` syscall do?",
    shortAnswer: "Replaces the current process image with a new program.",
    explanation: "`execve()` loads a new executable file into the calling process, replacing its code, data, heap, and stack. No return on success.",
    hint: "Often used after `fork()` to launch a different program.",
    level: "intermediate",
    codeExample: "execve(\"/bin/ls\", args, envp);"
  },
  {
    question: "What is the `waitpid()` system call used for?",
    shortAnswer: "Waits for a specific child process to change state (terminate, stop, resume).",
    explanation: "Allows a parent to collect the child's exit status and avoid zombie processes. Options like WNOHANG make it non‑blocking.",
    hint: "Without `wait`, terminated children become zombies.",
    level: "intermediate",
    codeExample: "waitpid(pid, &status, 0);"
  },
  {
    question: "How does `open()` return a file descriptor?",
    shortAnswer: "It returns a small integer indexing the process's file descriptor table.",
    explanation: "The kernel allocates a new file descriptor (0,1,2 are usually reserved for stdin/out/err). The fd is used for subsequent read/write/close syscalls.",
    hint: "Use `ulimit -n` to see max open files per process.",
    level: "basic",
    codeExample: "int fd = open(\"data.txt\", O_RDONLY);"
  },
  {
    question: "What is the difference between `O_SYNC` and `O_DSYNC` flags in `open()`?",
    shortAnswer: "O_SYNC ensures data and metadata written to disk; O_DSYNC only data (or metadata required to retrieve data).",
    explanation: "These flags affect write behaviour: O_SYNC makes writes block until all data and metadata are on stable storage, O_DSYNC is slightly less strict.",
    hint: "See `man 2 open` for POSIX sync details.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `ioctl()` system call?",
    shortAnswer: "A multipurpose device‑specific control operation.",
    explanation: "`ioctl()` performs operations on files or devices that are not covered by regular read/write (e.g., setting terminal attributes, ejecting a CD).",
    hint: "Often used with special files in /dev.",
    level: "advanced",
    codeExample: "ioctl(fd, TCGETS, &termios);"
  },
  {
    question: "What is the `mmap()` syscall?",
    shortAnswer: "Maps files or devices into memory, allowing direct byte access.",
    explanation: "`mmap()` creates a memory mapping that can be shared or private. It can significantly improve I/O performance for random access.",
    hint: "Combine with `madvise()` for performance hints.",
    level: "advanced",
    codeExample: "char *addr = mmap(NULL, size, PROT_READ, MAP_PRIVATE, fd, 0);"
  },
  {
    question: "What is the `clone()` system call?",
    shortAnswer: "A lower-level syscall that creates a new process or thread with finer control over sharing.",
    explanation: "`clone()` is used to implement threads (pthreads) by sharing address space, file descriptors, etc. Flags determine what is shared between parent and child.",
    hint: "`fork()` is implemented as `clone()` with specific flags.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `select()` system call?",
    shortAnswer: "Monitors multiple file descriptors to see if they are ready for I/O.",
    explanation: "`select()` allows a program to wait for events on many descriptors (input, output, exceptions). It's the predecessor to `poll()` and `epoll()`.",
    hint: "Limited to FD_SETSIZE (usually 1024). Use `poll()` or `epoll()` for many fds.",
    level: "intermediate",
    codeExample: "select(maxfd+1, &readfds, NULL, NULL, &timeout);"
  },
  {
    question: "What is the `epoll` family of syscalls?",
    shortAnswer: "Scalable I/O event notification mechanism for Linux.",
    explanation: "`epoll_create`, `epoll_ctl`, `epoll_wait` allow efficient monitoring of thousands of file descriptors without O(n) scanning.",
    hint: "Used in high‑performance servers (nginx, redis).",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a ‘zombie’ process and how does it relate to syscalls?",
    shortAnswer: "A process that has terminated but still has an entry in the process table because parent hasn't called `wait()`.",
    explanation: "After exit, the kernel retains the PID and exit status until the parent calls `wait()` (or `waitpid`). Too many zombies can exhaust process IDs.",
    hint: "Parent must `wait()` or use `sigaction` with SA_NOCLDWAIT.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What does the `sync()` syscall do?",
    shortAnswer: "Flushes all filesystem buffers to disk.",
    explanation: "`sync()` schedules all dirty buffers for writeback, but does not wait for completion. For data safety, use `fsync()` or `fdatasync()` on specific files.",
    hint: "The `sync` command calls this syscall.",
    level: "basic",
    codeExample: "sync();"
  },
  {
    question: "What is the `getpid()` system call?",
    shortAnswer: "Returns the process ID of the calling process.",
    explanation: "A very simple syscall – often cached by the C library to avoid kernel traps, but the actual syscall is `getpid()`.",
    hint: "`getpid()` is often implemented in the VDSO for speed.",
    level: "basic",
    codeExample: "printf(\"My PID = %d\\n\", getpid());"
  },
  {
    question: "How can you invoke a system call directly without the C library?",
    shortAnswer: "Use inline assembly or the `syscall()` function defined in <sys/syscall.h>.",
    explanation: "The `syscall()` function takes a syscall number and arguments, then executes the trap instruction. Architecture‑dependent.",
    hint: "Example: `syscall(SYS_write, 1, \"hello\", 5);`",
    level: "expert",
    codeExample: "long res = syscall(SYS_getpid);"
  },
  {
    question: "What is the `ptrace()` system call?",
    shortAnswer: "Allows one process to observe and control the execution of another process.",
    explanation: "`ptrace()` is used by debuggers (gdb) and system call tracers (strace). It can read/write registers and memory of the traced process.",
    hint: "Requires appropriate privileges.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `prctl()` syscall?",
    shortAnswer: "Performs process‑specific control operations (e.g., set name, seccomp).",
    explanation: "`prctl()` is an extensible interface for process attributes not covered by other syscalls. Used by systemd, Docker, and security tools.",
    hint: "Read `man 2 prctl` for many options.",
    level: "advanced",
    codeExample: "prctl(PR_SET_NAME, \"myproc\");"
  },
  {
    question: "Why do some syscalls return `-EAGAIN` instead of `-1` with errno?",
    shortAnswer: "In kernel internal interfaces, errors are returned as negative errnos. The libc wrapper converts them to -1 and sets errno.",
    explanation: "When writing kernel code, you return `-EAGAIN`. The `SYSCALL_DEFINE` macros and wrapper handle the user‑space convention.",
    hint: "Study kernel source to see this pattern.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `seccomp` syscall?",
    shortAnswer: "Limits the system calls a process can make, improving security.",
    explanation: "`seccomp` (secure computing mode) allows a process to enter a filtered state where only a whitelist of syscalls is permitted. Used by Chrome, Docker, systemd.",
    hint: "Filter mode `SECCOMP_MODE_FILTER` uses BPF.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `bpf()` system call?",
    shortAnswer: "Performs various operations on eBPF programs and maps.",
    explanation: "`bpf()` loads eBPF bytecode into the kernel for packet filtering, tracing, performance monitoring, etc. Part of modern Linux observability.",
    hint: "Used by `bpftool`, `tcpdump` (in eBPF mode), and Cilium.",
    level: "expert",
    codeExample: null
  }
];

export default questions;