// topic7_questions.js
const questions = [
  {
    question: "What is a zombie process?",
    shortAnswer: "A process that has terminated but still has an entry in the process table because its parent has not yet called wait().",
    explanation: "Zombies exist so that the parent can retrieve the child's exit status. They consume no memory or CPU, only a process table slot.",
    hint: "ps aux shows 'defunct'.",
    level: "basic",
    codeExample: "ps -l | grep Z"
  },
  {
    question: "What state letter does a zombie show in ps output?",
    shortAnswer: "Z (or Z+ for foreground zombie).",
    explanation: "The STAT column in 'ps -l' includes Z for zombie/defunct processes.",
    hint: "ps -e -o pid,stat,comm | grep Z",
    level: "basic",
    codeExample: "ps -e -o pid,stat,command | head -1; ps -e -o pid,stat,command | grep Z"
  },
  {
    question: "Can you kill a zombie process with SIGKILL (kill -9)?",
    shortAnswer: "No, zombies are already dead. The kernel ignores signals sent to zombies.",
    explanation: "Zombies have no memory or execution context; they only hold an exit status. The only way to remove them is to have the parent call wait() or kill the parent.",
    hint: "kill -9 <zombie_pid> does nothing.",
    level: "intermediate",
    codeExample: "kill -9 12345  # no effect if 12345 is zombie"
  },
  {
    question: "How do you remove a zombie process?",
    shortAnswer: "Either the parent calls wait() (or waitpid), or the parent itself terminates, causing init to adopt and reap the zombie.",
    explanation: "If the parent is still running, you must fix the parent code to wait. Killing the parent will make init reap the zombie.",
    hint: "kill the parent, not the zombie.",
    level: "intermediate",
    codeExample: "kill -TERM <parent_pid>"
  },
  {
    question: "Why do zombie processes exist at all?",
    shortAnswer: "To allow the parent to read the child's exit status after it terminates.",
    explanation: "The kernel cannot discard the status until the parent has acknowledged it via wait(). The zombie state holds that information.",
    hint: "Design feature, not a bug.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What resources does a zombie process consume?",
    shortAnswer: "Only a process table entry (roughly the task_struct, about 1–2 KB on Linux).",
    explanation: "The zombie's memory (stack, heap, code) has been freed. No CPU time is used.",
    hint: "ps -o vsz,rss -p <zombie_pid> shows 0.",
    level: "intermediate",
    codeExample: "ps -o pid,stat,vsz,rss,comm -p 12345"
  },
  {
    question: "What happens when a parent dies leaving a zombie?",
    shortAnswer: "The zombie becomes an orphan and is reparented to init (PID 1). Init will eventually call wait() and reap it.",
    explanation: "Init's main loop includes wait() so orphans are cleaned up automatically.",
    hint: "This is why double‑fork daemonisation works – init becomes the parent.",
    level: "intermediate",
    codeExample: "while :; do (sleep 30 &); done  # parent (subshell) dies, sleep becomes orphan adopted by init"
  },
  {
    question: "What is the difference between a zombie and an orphan?",
    shortAnswer: "A zombie is a terminated child not yet reaped; an orphan is a running process whose parent has died.",
    explanation: "Orphans are adopted by init; zombies are dead processes that need reaping. An orphan can become a zombie only after it exits.",
    hint: "Orphan = living but parent dead; Zombie = dead but not reaped.",
    level: "intermediate",
    codeExample: "ps -o pid,ppid,stat,comm"
  },
  {
    question: "How can a parent prevent zombies without calling wait() synchronously?",
    shortAnswer: "Set a SIGCHLD handler that calls waitpid(-1, NULL, WNOHANG), or set SIGCHLD to SIG_IGN (on Linux).",
    explanation: "The signal handler reaps children asynchronously. On Linux, ignoring SIGCHLD automatically reaps.",
    hint: "signal(SIGCHLD, SIG_IGN);  # Linux only",
    level: "advanced",
    codeExample: "signal(SIGCHLD, sigchld_handler); void handler(int s) { while (waitpid(-1, NULL, WNOHANG) > 0); }"
  },
  {
    question: "Does a zombie process appear in top or htop?",
    shortAnswer: "Yes, top shows a zombie count on the first line, and htop highlights zombies in red.",
    explanation: "In top, the 'zombie' number on the Tasks line shows how many zombies exist.",
    hint: "Look for 'Tasks: X total, Y running, Z sleeping, W zombie'",
    level: "basic",
    codeExample: "top -b -n 1 | grep -i zombie"
  },
  {
    question: "What is the maximum number of zombies a system can have?",
    shortAnswer: "Limited by the maximum number of processes (kernel.pid_max) and per‑user limits (ulimit -u).",
    explanation: "Each zombie consumes a PID. Once the process table is full, no new processes can be created.",
    hint: "cat /proc/sys/kernel/pid_max",
    level: "advanced",
    codeExample: "ulimit -u"
  },
  {
    question: "Can a multithreaded program create zombies?",
    shortAnswer: "Yes, fork() duplicates only the calling thread. If the parent thread does not wait, children become zombies.",
    explanation: "Threads share the same PID, but fork() creates a separate process. The same wait() rules apply.",
    hint: "pthread_atfork() can help manage this.",
    level: "expert",
    codeExample: "pthread_atfork(prepare, parent, child);"
  },
  {
    question: "What is the difference between 'defunct' and 'zombie'?",
    shortAnswer: "They are synonyms; 'defunct' is the text shown by ps, 'zombie' is the state name.",
    explanation: "ps reports '<defunct>' in the command field; the STAT column shows 'Z'.",
    hint: "ps aux | grep defunct",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does the kernel store for a zombie process?",
    shortAnswer: "PID, exit status, resource usage statistics, and parent PID.",
    explanation: "The task_struct is preserved but most fields (memory pointers) are freed or set to NULL.",
    hint: "check /proc/<zombie_pid>/",
    level: "expert",
    codeExample: "ls -l /proc/12345  # very limited entries for zombie"
  },
  {
    question: "How can a parent reap multiple children efficiently?",
    shortAnswer: "Loop waitpid(-1, NULL, WNOHANG) until it returns 0, or loop wait() until it returns -1 with errno ECHILD.",
    explanation: "The loop ensures all children are reaped without blocking.",
    hint: "while (wait(NULL) > 0);",
    level: "intermediate",
    codeExample: "int status; while (waitpid(-1, &status, WNOHANG) > 0);"
  },
  {
    question: "Why does a parent's call to wait() sometimes return -1 with errno ECHILD?",
    shortAnswer: "The calling process has no unwaited‑for children (e.g., all children have already been reaped or no children).",
    explanation: "This is normal after all children have been reaped.",
    hint: "Check errno after wait.",
    level: "intermediate",
    codeExample: "if (wait(NULL) == -1 && errno == ECHILD) printf('No children left');"
  },
  {
    question: "Can a zombie be attached to a debugger (gdb)?",
    shortAnswer: "No, because it is not running – it has no execution context.",
    explanation: "gdb can only attach to running or stopped processes, not zombies.",
    hint: "gdb -p <zombie_pid> fails",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What does the /proc filesystem show for a zombie?",
    shortAnswer: "Very limited entries: usually only 'stat', 'status', 'cmdline' (empty), and some basic files.",
    explanation: "Most memory-related files (maps, smaps, mem) are not present.",
    hint: "ls /proc/12345",
    level: "expert",
    codeExample: "cat /proc/12345/status | grep State"
  },
  {
    question: "What is a 'zombie leak'?",
    shortAnswer: "A situation where a program continuously creates processes and fails to wait for them, accumulating zombies over time.",
    explanation: "Eventually the process table fills, and new processes (or even new logins) may fail.",
    hint: "Monitor zombie count over time.",
    level: "intermediate",
    codeExample: "watch -n 1 'ps -e -o stat | grep -c Z'"
  },
  {
    question: "What is the purpose of the 'child_subreaper' feature?",
    shortAnswer: "A process can mark itself as a subreaper using prctl(PR_SET_CHILD_SUBREAPER). Then it will adopt orphaned descendants within its subtree, like init.",
    explanation: "Useful for container runtimes to manage processes without relying on global init.",
    hint: "prctl(PR_SET_CHILD_SUBREAPER, 1);",
    level: "expert",
    codeExample: "prctl(PR_SET_CHILD_SUBREAPER, 1); fork(); // child's orphan grandchildren will be reparented to this process"
  },
  {
    question: "How do shells like bash handle zombies?",
    shortAnswer: "They use waitpid() in a SIGCHLD handler or periodic checks, and they wait for foreground processes synchronously.",
    explanation: "When a foreground child terminates, the shell's wait() returns immediately and reaps it. Background children are reaped via SIGCHLD.",
    hint: "strace -p $$ to see wait4 calls.",
    level: "expert",
    codeExample: "sleep 10 &; strace -p $$"
  },
  {
    question: "What is the difference between wait() and waitpid() for zombie reaping?",
    shortAnswer: "wait() reaps any child; waitpid() can reap a specific child or use non‑blocking mode.",
    explanation: "Both remove the zombie. waitpid is more flexible for non‑blocking or selective reaping.",
    hint: "Use waitpid with WNOHANG in signal handlers.",
    level: "intermediate",
    codeExample: "waitpid(child_pid, NULL, 0);"
  },
  {
    question: "Can a process create a zombie of a zombie?",
    shortAnswer: "No, a zombie cannot create any processes (it's dead).",
    explanation: "Zombies have no execution context, so they cannot call fork() or any system call.",
    hint: "Zombie stat shows 'Z', no activity possible.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does the kernel do with a zombie when the parent calls wait()?",
    shortAnswer: "It returns the exit status and PID to the parent, then frees the process table entry (the zombie is gone).",
    explanation: "The kernel also cleans up any remaining resources and may deliver SIGCHLD again.",
    hint: "After wait(), the process disappears from ps.",
    level: "intermediate",
    codeExample: "wait(&status); // zombie disappears"
  },
  {
    question: "Is it possible to have a zombie process with PID 1?",
    shortAnswer: "No, init (PID 1) never becomes a zombie because the kernel handles it specially and init itself typically reaps orphans before dying.",
    explanation: "If init dies (kernel panic), the system crashes. PID 1 cannot be a zombie.",
    hint: "kill -9 1 is ignored.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How does systemd manage child reaping?",
    shortAnswer: "Systemd as PID 1 uses signalfd() and waits for children in its main event loop, reaping them immediately.",
    explanation: "It also supports 'Delegate=yes' to let services act as subreapers.",
    hint: "systemd's source contains src/core/main.c.",
    level: "expert",
    codeExample: "systemd-run --scope -p Delegate=yes command"
  },
  {
    question: "What happens if you strace a zombie?",
    shortAnswer: "You cannot; strace attaches to a running process. Zombies are not running.",
    explanation: "strace will fail with 'No such process' or similar.",
    hint: "Don't bother trying.",
    level: "expert",
    codeExample: "strace -p <zombie_pid>"
  },
  {
    question: "What is the difference between a zombie and a 'defunct' process?",
    shortAnswer: "None, they are the same: 'defunct' is just the text shown by ps.",
    explanation: "Some older systems use 'defunct' exclusively.",
    hint: "Synonymous.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can a zombie be created without a fork?",
    shortAnswer: "No, zombies are always child processes whose parent hasn't waited.",
    explanation: "Only a child can become a zombie after termination.",
    hint: "The parent-child relationship is necessary.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the 'zombie memory' myth?",
    shortAnswer: "A common myth that zombies consume significant memory. In reality, they only consume a tiny kernel structure (a few KB).",
    explanation: "The myth arises from confusing zombies with processes that are still alive but stuck.",
    hint: "Check RSS of zombie – it's 0.",
    level: "intermediate",
    codeExample: "ps -o pid,stat,vsz,rss,comm -p <zombie_pid>"
  }
];

export default questions;