// topic6_questions.js
const questions = [
  {
    question: "What does the wait() system call do?",
    shortAnswer: "Suspends the calling process until one of its child processes terminates, returning the child's PID and exit status.",
    explanation: "wait() cleans up the child's process table entry (PCB) and prevents zombies. It blocks if no child has terminated yet.",
    hint: "man 2 wait",
    level: "basic",
    codeExample: "int status; pid_t pid = wait(&status);"
  },
  {
    question: "What is the difference between wait() and waitpid()?",
    shortAnswer: "wait() waits for any child; waitpid() can wait for a specific child or set of children, and supports non‑blocking mode (WNOHANG).",
    explanation: "waitpid() gives finer control: choose which child, non‑blocking, and can report stopped/continued processes.",
    hint: "Use waitpid(-1, &status, 0) for same as wait().",
    level: "intermediate",
    codeExample: "waitpid(child_pid, &status, WNOHANG);"
  },
  {
    question: "What happens if a parent does not call wait()?",
    shortAnswer: "Terminated children become zombie processes (defunct), consuming memory in the process table.",
    explanation: "Zombies have no memory except a PCB entry. Too many zombies can fill the process table, preventing new processes.",
    hint: "ps aux | grep defunct",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does wait() return on success?",
    shortAnswer: "The PID of the child that terminated.",
    explanation: "The status pointer is filled with termination information that must be decoded with macros.",
    hint: "pid_t child = wait(NULL); // ignore status",
    level: "basic",
    codeExample: "printf('Reaped child %d\\n', wait(&status));"
  },
  {
    question: "What does wait() return if there are no children?",
    shortAnswer: "-1 and errno is set to ECHILD.",
    explanation: "This indicates that the calling process has no unwaited‑for children.",
    hint: "Check errno after wait.",
    level: "intermediate",
    codeExample: "if (wait(&status) == -1 && errno == ECHILD) printf('No children\\n');"
  },
  {
    question: "How can you check a child's exit code from the status?",
    shortAnswer: "Use WIFEXITED(status) to check if child exited normally, then WEXITSTATUS(status) to get the value.",
    explanation: "Other macros: WIFSIGNALED, WTERMSIG, WIFSTOPPED, WSTOPSIG.",
    hint: "man 2 waitpid for macros.",
    level: "intermediate",
    codeExample: "if (WIFEXITED(status)) printf('Exit: %d\\n', WEXITSTATUS(status));"
  },
  {
    question: "What is WNOHANG and when would you use it?",
    shortAnswer: "Option for waitpid that returns immediately if no child has terminated, instead of blocking.",
    explanation: "Used to periodically check for child exits without blocking the main program (e.g., in event loops).",
    hint: "waitpid(-1, &status, WNOHANG) returns 0 if nothing ready.",
    level: "intermediate",
    codeExample: "if (waitpid(-1, &status, WNOHANG) > 0) // child reaped"
  },
  {
    question: "How does SIGCHLD relate to wait()?",
    shortAnswer: "SIGCHLD is sent to the parent when a child terminates, stops, or continues, allowing the parent to call wait() asynchronously.",
    explanation: "In a signal handler, you must use waitpid() with WNOHANG to avoid blocking the handler.",
    hint: "signal(SIGCHLD, sigchld_handler);",
    level: "advanced",
    codeExample: "void handler(int s) { while (waitpid(-1, NULL, WNOHANG) > 0); }"
  },
  {
    question: "What is a zombie process?",
    shortAnswer: "A process that has terminated but whose parent has not yet called wait(), keeping its entry in the process table.",
    explanation: "Zombies only store exit status and PID; they consume no memory or CPU but occupy a process slot.",
    hint: "ps -l shows state 'Z'.",
    level: "basic",
    codeExample: "ps aux | grep 'Z'"
  },
  {
    question: "How can a parent wait for all its children to exit?",
    shortAnswer: "Call wait() in a loop until it returns -1 with errno == ECHILD.",
    explanation: "Alternatively, use waitpid(-1, NULL, 0) repeatedly until it fails.",
    hint: "while (wait(NULL) > 0);",
    level: "intermediate",
    codeExample: "int status; while (wait(&status) > 0);"
  },
  {
    question: "What is the difference between exit() and _exit() in the child after fork?",
    shortAnswer: "exit() flushes stdio buffers and runs atexit handlers; _exit() terminates immediately without cleanup.",
    explanation: "In the child after fork, _exit() is safer to avoid corrupting parent's buffers.",
    hint: "Use _exit() in child when exec fails.",
    level: "intermediate",
    codeExample: "if (pid == 0) { execlp(...); _exit(1); }"
  },
  {
    question: "Can wait() be interrupted by a signal?",
    shortAnswer: "Yes, unless the signal handler was installed with SA_RESTART. Then wait() returns -1 and errno == EINTR.",
    explanation: "Check for EINTR and possibly restart wait() if needed.",
    hint: "while ((pid = wait(&status)) == -1 && errno == EINTR);",
    level: "advanced",
    codeExample: "if (errno == EINTR) /* restart */;"
  },
  {
    question: "What is the purpose of waitpid() with a pid argument of -1?",
    shortAnswer: "Waits for any child, same as wait().",
    explanation: "This is a common pattern when you want to use WNOHANG or other options.",
    hint: "waitpid(-1, &status, WNOHANG);",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can a parent wait for a specific child only?",
    shortAnswer: "Use waitpid(child_pid, &status, 0).",
    explanation: "The parent will block until that exact child terminates (or if that child already a zombie, returns immediately).",
    hint: "Save child's PID from fork.",
    level: "intermediate",
    codeExample: "pid_t child_pid = fork(); if (child_pid == 0) { ... } else { waitpid(child_pid, &status, 0); }"
  },
  {
    question: "What does wait() do if the child was stopped by a signal?",
    shortAnswer: "By default, wait() does not return for stopped children unless WUNTRACED option is used.",
    explanation: "WUNTRACED causes waitpid to return when a child is stopped (SIGSTOP, SIGTSTP).",
    hint: "waitpid(pid, &status, WUNTRACED);",
    level: "advanced",
    codeExample: "if (WIFSTOPPED(status)) printf('Stopped by %d\\n', WSTOPSIG(status));"
  },
  {
    question: "What is the maximum number of zombies allowed?",
    shortAnswer: "Limited by the process table size (kernel.pid_max). There is no per‑process limit on zombies.",
    explanation: "A single process can have thousands of zombies until its parent reaps them or the parent terminates.",
    hint: "ulimit -u does not limit zombies directly.",
    level: "advanced",
    codeExample: "while (fork() == 0) exit(0); // parent creates zombies"
  },
  {
    question: "How does waitpid() with WNOHANG behave when there are multiple children?",
    shortAnswer: "It returns the PID of one terminated child, or 0 if none, but does not block. You need to call it repeatedly to reap all.",
    explanation: "Common idiom: while (waitpid(-1, NULL, WNOHANG) > 0); reaps all ready children.",
    hint: "Use a loop in SIGCHLD handler.",
    level: "intermediate",
    codeExample: "while (waitpid(-1, NULL, WNOHANG) > 0);"
  },
  {
    question: "What is the difference between waitpid() with pid < -1?",
    shortAnswer: "Waits for any child whose process group ID equals the absolute value of pid.",
    explanation: "Used to reap all children in a specific process group without blocking.",
    hint: "setpgid() to set group.",
    level: "expert",
    codeExample: "waitpid(-pgid, &status, 0);"
  },
  {
    question: "Can a process wait for a child that is not its direct child?",
    shortAnswer: "No, wait() and waitpid() only work for direct children. To wait for grandchildren, you must use process groups or ptrace.",
    explanation: "Other mechanisms: pidfd, process group signalling, or using a subreaper.",
    hint: "prctl(PR_SET_CHILD_SUBREAPER) allows a process to adopt grandchildren.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the purpose of the WCONTINUED option?",
    shortAnswer: "Causes waitpid() to return when a stopped child is resumed by SIGCONT.",
    explanation: "Useful for job control shells to track process state changes.",
    hint: "Linux 2.6.10+",
    level: "advanced",
    codeExample: "waitpid(pid, &status, WCONTINUED);"
  },
  {
    question: "How does wait() interact with PID namespaces?",
    shortAnswer: "Within a PID namespace, wait() sees PIDs as they appear in that namespace (e.g., init becomes 1).",
    explanation: "The parent must be in the same namespace or have visibility to see child's termination.",
    hint: "Containers use this.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the typical use of waitpid() with a pid of 0?",
    shortAnswer: "Waits for any child in the same process group as the caller.",
    explanation: "This is used in job control shells: the foreground process group can manage multiple children.",
    hint: "ps -o pid,pgid,comm",
    level: "expert",
    codeExample: "waitpid(0, &status, 0);"
  },
  {
    question: "Why might wait() return -1 with errno set to EINTR?",
    shortAnswer: "Because a signal interrupted the wait() call, and the signal handler did not have SA_RESTART.",
    explanation: "The parent can simply call wait() again unless it wants to handle the signal specially.",
    hint: "Use SA_RESTART for SIGCHLD if you want automatic restart.",
    level: "advanced",
    codeExample: "struct sigaction sa = { .sa_flags = SA_RESTART };"
  },
  {
    question: "What is the 'status' integer layout returned by wait()?",
    shortAnswer: "It packs exit code and signal information into a 16‑bit field with multiple macros to decode.",
    explanation: "The low 8 bits store the signal number (if terminated by signal), the next 8 bits store exit code, etc.",
    hint: "See the implementation of WIFEXITED et al.",
    level: "expert",
    codeExample: "printf('Raw status: %d\\n', status);"
  },
  {
    question: "How can you wait for a child without blocking but also without busy‑looping?",
    shortAnswer: "Set up a SIGCHLD handler that calls waitpid() with WNOHANG, and use pause() or select() to sleep until a signal arrives.",
    explanation: "This is more efficient than polling WNOHANG in a loop.",
    hint: "sigsuspend() can atomically wait for signals.",
    level: "expert",
    codeExample: "sigemptyset(&mask); sigsuspend(&mask);"
  },
  {
    question: "What happens if a parent terminates without reaping its children?",
    shortAnswer: "The children become orphans and are reparented to init (PID 1). init will eventually wait() for them.",
    explanation: "This is why daemons often double‑fork – to be reparented to init and not leave zombies.",
    hint: "Init reaps orphans automatically.",
    level: "intermediate",
    codeExample: "fork(); if (fork() > 0) exit(0); // child becomes orphan"
  },
  {
    question: "What is the difference between wait() and waitid()?",
    shortAnswer: "waitid() provides more detailed status information in a siginfo_t structure, supports waiting for a specific child, and can wait for events other than exit (e.g., stop/continue).",
    explanation: "waitid() is newer (POSIX.1-2001) and preferred for new code requiring detailed status.",
    hint: "man 2 waitid",
    level: "advanced",
    codeExample: "siginfo_t info; waitid(P_PID, child_pid, &info, WEXITED);"
  },
  {
    question: "How can you prevent a parent from creating zombies?",
    shortAnswer: "Call wait() or waitpid() promptly, or ignore SIGCHLD (SIG_IGN) which causes Linux to automatically reap children.",
    explanation: "Setting SIGCHLD to SIG_IGN prevents zombies but also loses exit status; not portable to all Unix systems.",
    hint: "signal(SIGCHLD, SIG_IGN);",
    level: "advanced",
    codeExample: "signal(SIGCHLD, SIG_IGN); // Linux only"
  },
  {
    question: "What is the resource usage information wait() can provide?",
    shortAnswer: "Using wait4() or waitpid() with the status pointer alone does not give resource usage. wait4() returns rusage structure.",
    explanation: "wait4() is BSD‑specific; getrusage() can also be used.",
    hint: "man 2 wait4",
    level: "expert",
    codeExample: "struct rusage ru; wait4(-1, &status, 0, &ru);"
  },
  {
    question: "What is the typical error when wait() unexpectedly returns -1?",
    shortAnswer: "Common errors: ECHILD (no children), EINTR (interrupted), EINVAL (invalid options).",
    explanation: "Always check errno after wait() failure.",
    hint: "perror('wait');",
    level: "intermediate",
    codeExample: "if (wait(&status) == -1) { perror('wait'); exit(1); }"
  }
];

export default questions;