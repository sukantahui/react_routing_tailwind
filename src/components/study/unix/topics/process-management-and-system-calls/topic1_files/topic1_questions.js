// topic1_questions.js
const questions = [
  {
    question: "What system call creates a new process in Unix?",
    shortAnswer: "fork()",
    explanation: "fork() duplicates the calling process, producing a child process that runs concurrently. The child gets a copy of parent's memory, file descriptors, and environment.",
    hint: "Think of cloning a running program.",
    level: "basic",
    codeExample: "pid_t pid = fork();"
  },
  {
    question: "What is the difference between fork() and vfork()?",
    shortAnswer: "vfork() suspends parent until child calls exec() or _exit(), sharing memory without copy.",
    explanation: "vfork() was an optimization before copy-on-write. Now mostly obsolete but still seen in legacy code.",
    hint: "vfork is dangerous – child must not modify memory before exec.",
    level: "intermediate",
    codeExample: "pid_t pid = vfork(); if (pid == 0) { execlp(...); _exit(1); }"
  },
  {
    question: "After fork(), which process runs first?",
    shortAnswer: "Unspecified – depends on scheduler. Both parent and child are eligible to run.",
    explanation: "Never rely on order; use synchronization mechanisms like wait() if ordering needed.",
    hint: "Don't assume parent runs first.",
    level: "intermediate",
    codeExample: "sleep() after fork can force order but not portable."
  },
  {
    question: "What are the five classic process states?",
    shortAnswer: "New, Ready, Running, Waiting (Blocked), Terminated.",
    explanation: "Additional states exist (Suspended, Zombie) but these are core for lifecycle understanding.",
    hint: "Draw the state diagram with arrows.",
    level: "basic",
    codeExample: "ps -l shows state letter (R=running, S=sleeping, D=uninterruptible wait, Z=zombie, T=stopped)."
  },
  {
    question: "What event moves a process from Running to Ready?",
    shortAnswer: "Timer interrupt (time slice expired) or preemption by higher priority process.",
    explanation: "Scheduler may also move voluntarily via sched_yield().",
    hint: "It’s involuntary preemption.",
    level: "intermediate",
    codeExample: "sched_yield();"
  },
  {
    question: "What is the purpose of wait() system call?",
    shortAnswer: "To collect termination status of a child process and free its PCB (prevent zombie).",
    explanation: "Parent calls wait() to block until any child exits. Returns child PID and exit code.",
    hint: "Without wait(), child becomes zombie after exit.",
    level: "basic",
    codeExample: "wait(&status);"
  },
  {
    question: "Can a process be in more than one state at a time?",
    shortAnswer: "No. At any instant, a process has exactly one state as recorded in its PCB.",
    explanation: "However, it can be ‘ready’ and also have pending signals, but scheduler state is singular.",
    hint: "Think of traffic light – only one colour at a time.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What does the scheduler do when a process completes its time slice?",
    shortAnswer: "Saves its context, moves it from Running to Ready, then selects next process from ready queue.",
    explanation: "The timer interrupt triggers this. It's called preemptive multitasking.",
    hint: "Similar to teacher calling on next student.",
    level: "intermediate",
    codeExample: "nice or renice changes priority and affects slice."
  },
  {
    question: "How is a process terminated?",
    shortAnswer: "By calling _exit() (explicit) or returning from main, or receiving a fatal signal.",
    explanation: "Kernel releases resources, sends SIGCHLD to parent, and process becomes zombie until parent reaps.",
    hint: "exit() does cleanup, _exit() goes straight to kernel.",
    level: "basic",
    codeExample: "exit(EXIT_SUCCESS);"
  },
  {
    question: "What is a 'zombie' process?",
    shortAnswer: "A terminated process whose parent hasn't called wait() yet; only PCB remains.",
    explanation: "Zombies consume minimal memory (just PCB entry). Too many zombies can fill process table.",
    hint: "You cannot kill a zombie – kill the parent.",
    level: "intermediate",
    codeExample: "ps aux | grep defunct"
  },
  {
    question: "What is an 'orphan' process?",
    shortAnswer: "A process whose parent has terminated before it. Adopted by init (PID 1).",
    explanation: "Init periodically calls wait() to reap orphans, preventing long‑term zombies.",
    hint: "prctl(PR_SET_CHILD_SUBREAPER) can change reaper.",
    level: "intermediate",
    codeExample: "double fork trick to daemonize creates orphan."
  },
  {
    question: "Can a process change its state from Waiting to Running directly?",
    shortAnswer: "No. It goes Waiting → Ready → Running (when scheduled).",
    explanation: "The transition is always via ready queue. Scheduler decides when to run.",
    hint: "Wait state means ‘not ready for CPU’.",
    level: "intermediate",
    codeExample: "I/O completion signal makes process ready."
  },
  {
    question: "What is copy-on-write (COW) in fork()?",
    shortAnswer: "Pages are shared between parent and child until one writes, then a copy is made.",
    explanation: "COW makes fork fast and memory efficient. Implemented via page table tricks.",
    hint: "Both processes see same physical page as read-only.",
    level: "expert",
    codeExample: "fork(); // after fork, write to variable triggers page fault and copy."
  },
  {
    question: "What does the clone() system call do?",
    shortAnswer: "Linux‑specific fork variant that allows sharing of address space, file descriptors, etc. (used to create threads).",
    explanation: "clone() flags control what is shared. POSIX threads (pthreads) are built on clone.",
    hint: "clone(CLONE_VM | CLONE_FS | CLONE_FILES, ...) creates thread.",
    level: "expert",
    codeExample: "clone(child_func, stack, CLONE_VM, arg);"
  },
  {
    question: "How can a parent prevent waiting indefinitely for children?",
    shortAnswer: "Install SIGCHLD handler with SA_NOCLDWAIT, or use waitpid() with WNOHANG.",
    explanation: "SIGCHLD handler can call wait() without blocking.",
    hint: "signal(SIGCHLD, SIG_IGN); causes child to be automatically reaped.",
    level: "advanced",
    codeExample: "signal(SIGCHLD, SIG_IGN); // Linux-specific auto-reap."
  },
  {
    question: "What happens if a process calls fork() in a signal handler?",
    shortAnswer: "Undefined behavior in POSIX (except async‑signal‑safe functions). fork() is not async‑signal‑safe.",
    explanation: "Could cause deadlocks or corrupt state. Avoid.",
    hint: "Use posix_spawn() instead if needed.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the process creation overhead?",
    shortAnswer: "Allocating PCB, copying memory tables, duplicating file descriptors (100s of microseconds on modern systems).",
    explanation: "COW reduces memory copy cost. Thousands of forks per second possible.",
    hint: "vfork was faster but dangerous.",
    level: "intermediate",
    codeExample: "time bash -c 'for i in {1..1000}; do /bin/true; done'"
  },
  {
    question: "What does 'ps -l' column 'PRI' mean?",
    shortAnswer: "Kernel priority (higher number = lower priority).",
    explanation: "Dynamic priority based on nice value + recent CPU usage.",
    hint: "Real‑time processes have negative priority values.",
    level: "intermediate",
    codeExample: "renice +5 -p PID lowers priority."
  },
  {
    question: "What is the difference between 'sleep' state and 'stopped' state?",
    shortAnswer: "Sleep (S): waiting for I/0; Stopped (T): suspended by SIGSTOP/SIGTSTP.",
    explanation: "Stopped process can be resumed with SIGCONT.",
    hint: "Ctrl+Z sends SIGTSTP → stopped state.",
    level: "basic",
    codeExample: "kill -STOP PID && kill -CONT PID"
  },
  {
    question: "How does the scheduler handle processes in 'uninterruptible sleep' (D state)?",
    shortAnswer: "Cannot be interrupted by signals; scheduler still sees it as waiting, not ready.",
    explanation: "Usually waiting for disk I/O (e.g., NFS). High D state count indicates I/O problems.",
    hint: "You cannot kill a process in D state with SIGKILL.",
    level: "expert",
    codeExample: "ps aux | grep ' D'"
  },
  {
    question: "What are 'process groups' and 'sessions'?",
    shortAnswer: "Process groups: set of related processes for job control. Sessions: collection of process groups attached to a terminal.",
    explanation: "Introduced for shell job control. Ctrl+C sends SIGINT to entire foreground group.",
    hint: "setsid() creates new session (daemon).",
    level: "advanced",
    codeExample: "kill -SIGINT -PGID"
  },
  {
    question: "How does a daemon process create a new session?",
    shortAnswer: "Call fork(), parent exits, child calls setsid() to become session leader.",
    explanation: "Also chdir to /, umask(0), close file descriptors.",
    hint: "Double fork ensures daemon is not a session leader (avoid acquiring controlling tty).",
    level: "expert",
    codeExample: "pid = fork(); if (pid) exit(0); setsid();"
  },
  {
    question: "What is the maximum number of processes a user can create?",
    shortAnswer: "Limited by ulimit -u (usually 4096 on many Linux).",
    explanation: "Applies per real user ID. Root has no limit by default.",
    hint: "cat /proc/sys/kernel/threads-max",
    level: "intermediate",
    codeExample: "ulimit -u unlimited"
  },
  {
    question: "Can a parent process be terminated before its child?",
    shortAnswer: "Yes. The child becomes orphan and is adopted by init (PID 1).",
    explanation: "Init will wait for it eventually. Orphanage avoids zombies in parent-less processes.",
    hint: "prctl(PR_SET_CHILD_SUBREAPER) changes adopter.",
    level: "intermediate",
    codeExample: "kill -9 parent_pid"
  },
  {
    question: "What does the 'execlp' function do if the program file is not found?",
    shortAnswer: "Returns -1 and sets errno to ENOENT. The process continues running the old image.",
    explanation: "Unlike execle, execlp searches PATH. Always check return value.",
    hint: "perror() after exec failure.",
    level: "basic",
    codeExample: "if (execlp(...) == -1) { perror('execlp'); exit(1); }"
  },
  {
    question: "What are the advantages of posix_spawn() over fork+exec?",
    shortAnswer: "Better performance and memory usage on some systems (e.g., macOS, real‑time).",
    explanation: "posix_spawn() can avoid copying page tables in some implementations.",
    hint: "Used by many system libraries (e.g., system()).",
    level: "expert",
    codeExample: "posix_spawn(&pid, '/bin/ls', NULL, NULL, argv, environ);"
  },
  {
    question: "Why does fork() sometimes fail with EAGAIN?",
    shortAnswer: "Process limit reached (system‑wide or per‑user), or insufficient memory.",
    explanation: "Check RLIMIT_NPROC and kernel.pid_max.",
    hint: "ulimit -u shows user limit.",
    level: "advanced",
    codeExample: "errno == EAGAIN"
  },
  {
    question: "What does the kernel do during context switch?",
    shortAnswer: "Saves current process's registers, program counter, and restores next process's state.",
    explanation: "Also switches address space (CR3 on x86) and updates TLB.",
    hint: "Context switch overhead can be high: microseconds.",
    level: "expert",
    codeExample: "vmstat's 'cs' column shows context switches per second."
  },
  {
    question: "What is the difference between 'TASK_INTERRUPTIBLE' and 'TASK_UNINTERRUPTIBLE'?",
    shortAnswer: "Interruptible sleep can be woken by signals; uninterruptible cannot.",
    explanation: "Uninterruptible is typically for critical kernel operations (e.g., disk I/O).",
    hint: "D state often seen during NFS issues.",
    level: "expert",
    codeExample: "echo 'w' > /proc/sysrq-trigger shows blocked tasks."
  },
  {
    question: "How does the 'nice' value affect process lifecycle?",
    shortAnswer: "Higher nice value = lower priority, so process gets less CPU time but still cycles through states.",
    explanation: "Nice value influences how often process is moved from Ready to Running.",
    hint: "renice +19 makes process very nice (low CPU).",
    level: "intermediate",
    codeExample: "nice -n 10 long_running_command"
  }
];

export default questions;