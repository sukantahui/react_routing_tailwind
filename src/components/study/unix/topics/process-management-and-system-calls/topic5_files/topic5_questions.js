// topic5_questions.js
const questions = [
  {
    question: "What does getpid() return?",
    shortAnswer: "The process ID of the calling process.",
    explanation: "getpid() always succeeds and returns a positive integer (the PID) that is unique at that moment.",
    hint: "man 2 getpid",
    level: "basic",
    codeExample: "printf('My PID: %d\\n', getpid());"
  },
  {
    question: "What does getppid() return?",
    shortAnswer: "The process ID of the parent of the calling process.",
    explanation: "If the parent has already terminated, the child is reparented to init (PID 1), so getppid() returns 1.",
    hint: "After fork, child's getppid() equals parent's getpid().",
    level: "basic",
    codeExample: "printf('Parent PID: %d\\n', getppid());"
  },
  {
    question: "Can getpid() ever fail?",
    shortAnswer: "No, it always returns a valid PID and has no error return.",
    explanation: "The system call is trivial – it just reads a field from the process's task struct.",
    hint: "No need to check return value for error.",
    level: "intermediate",
    codeExample: "pid_t me = getpid(); // always succeeds"
  },
  {
    question: "What is the pid_t data type?",
    shortAnswer: "Signed integer type used to represent process IDs (typically int on Linux).",
    explanation: "Defined in <sys/types.h>. It's opaque, but reliably holds any PID.",
    hint: "On Linux, PID_MAX is 4194304 (64-bit) but pid_t is still 32-bit.",
    level: "intermediate",
    codeExample: "pid_t pid = getpid();"
  },
  {
    question: "How can you get the parent PID in a shell script?",
    shortAnswer: "Use the $PPID variable (Bash, Zsh, etc.).",
    explanation: "$PPID is read-only and gives the PID of the parent shell.",
    hint: "echo $PPID",
    level: "basic",
    codeExample: "echo \"My parent's PID is $PPID\""
  },
  {
    question: "What does $$ represent in Bash?",
    shortAnswer: "The process ID of the current shell (not the subshell if in a pipeline).",
    explanation: "Expands to the PID of the shell. In a subshell, it may still represent the original shell depending on context.",
    hint: "echo $$",
    level: "basic",
    codeExample: "echo \"Current shell PID: $$\""
  },
  {
    question: "Can two processes have the same PID?",
    shortAnswer: "No, at any given time PIDs are unique across the system (in the same PID namespace).",
    explanation: "PIDs are recycled after a process exits, but not reused immediately.",
    hint: "cat /proc/sys/kernel/pid_max",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the PPID of init (PID 1)?",
    shortAnswer: "0 (or sometimes 0; on Linux it's 0).",
    explanation: "init has no parent; the kernel sets its PPID to 0.",
    hint: "ps -p 1 -o ppid=",
    level: "intermediate",
    codeExample: "ps -o pid,ppid,comm -p 1"
  },
  {
    question: "What happens to getppid() after the parent dies?",
    shortAnswer: "It returns 1 (the PID of init/systemd) because the kernel reparents orphans.",
    explanation: "The parent is gone, so the child's new parent becomes PID 1.",
    hint: "Orphan process adoption.",
    level: "intermediate",
    codeExample: "sleep 1000 &  # kill its parent; then check PPID"
  },
  {
    question: "Can getppid() return 0?",
    shortAnswer: "Yes for kernel threads (like kthreadd) or for init on some systems.",
    explanation: "In Linux, PID 1's getppid() returns 0, and kernel threads also often have PPID 0.",
    hint: "ps -e | grep -E ' ^1'",
    level: "expert",
    codeExample: "ps -e -o pid,ppid,comm | grep ' 0 '"
  },
  {
    question: "How can you get a process's PID from its name?",
    shortAnswer: "Use pgrep, pidof, or ps with grep.",
    explanation: "pgrep -x bash gives PIDs of all bash processes.",
    hint: "pidof systemd",
    level: "basic",
    codeExample: "pgrep -u $USER sshd"
  },
  {
    question: "Is there any relation between process groups and PIDs?",
    shortAnswer: "The process group ID (PGID) is often equal to the PID of the group leader.",
    explanation: "PGID identifies a set of processes for job control. The leader's PID equals the PGID.",
    hint: "ps -o pid,pgid,comm",
    level: "advanced",
    codeExample: "ps -o pid,pgid,comm -C bash"
  },
  {
    question: "How does getpid() interact with PID namespaces?",
    shortAnswer: "Inside a PID namespace, getpid() returns the PID within that namespace, not the global one.",
    explanation: "Containers use this to make a process appear as PID 1 inside the container.",
    hint: "unshare --pid --fork --mount-proc bash",
    level: "expert",
    codeExample: "readlink /proc/self/ns/pid"
  },
  {
    question: "Why would a program call getpid() multiple times?",
    shortAnswer: "To ensure it has the correct PID after fork, or to log repeated operations with consistent identifier.",
    explanation: "PID never changes for a process, so storing it once is sufficient.",
    hint: "Cache the result.",
    level: "basic",
    codeExample: "pid_t mypid = getpid(); // store once"
  },
  {
    question: "What is the difference between getpid() and gettid()?",
    shortAnswer: "getpid() returns process ID (same for all threads), gettid() returns thread ID (unique per thread).",
    explanation: "On Linux, threads are implemented as processes sharing a PID namespace, so gettid() gives a distinct ID.",
    hint: "man 2 gettid",
    level: "advanced",
    codeExample: "syscall(SYS_gettid)"
  },
  {
    question: "What is the /proc/self symlink?",
    shortAnswer: "A symbolic link that points to /proc/[PID] of the current process.",
    explanation: "Using /proc/self/status allows a process to examine its own metadata without knowing its PID.",
    hint: "cat /proc/self/status | grep Pid",
    level: "intermediate",
    codeExample: "cat /proc/self/comm"
  },
  {
    question: "Can a process change its own PID?",
    shortAnswer: "No, never. PIDs are assigned by the kernel at creation.",
    explanation: "Attempting to change PID would break the kernel's process table integrity.",
    hint: "Only kernel can assign.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How does the kernel assign PIDs?",
    shortAnswer: "Sequentially from 1 up to pid_max, wrapping around, skipping already used PIDs.",
    explanation: "Default pid_max is 32768 on 32-bit, up to 4194304 on 64-bit.",
    hint: "cat /proc/sys/kernel/pid_max",
    level: "advanced",
    codeExample: "sudo sysctl kernel.pid_max"
  },
  {
    question: "What is the purpose of the `pid_t` type being signed?",
    shortAnswer: "To allow -1 return for errors (in functions like waitpid), though getpid() never returns -1.",
    explanation: "Historical reasons; most PID values are positive.",
    hint: "waitpid returns -1 on error.",
    level: "intermediate",
    codeExample: "if ((pid = waitpid(...)) == -1) perror('waitpid');"
  },
  {
    question: "How can you find the parent PID of a process given its PID?",
    shortAnswer: "Read /proc/<pid>/stat or /proc/<pid>/status, or use ps -o ppid= -p <pid>.",
    explanation: "The fourth field in /proc/<pid>/stat is PPID.",
    hint: "ps -o ppid= -p 1234",
    level: "intermediate",
    codeExample: "awk '{print $4}' /proc/1234/stat"
  },
  {
    question: "What is the difference between $$ and $BASHPID?",
    shortAnswer: "$$ is the original shell's PID; $BASHPID is the current subshell's PID (Bash 4+).",
    explanation: "In a subshell, $$ remains unchanged, but $BASHPID reflects the subshell's actual PID.",
    hint: "( echo $$ $BASHPID )",
    level: "advanced",
    codeExample: "bash -c 'echo $$ $BASHPID'"
  },
  {
    question: "Can getpid() ever be used to create a unique filename?",
    shortAnswer: "Yes, but with caution: PIDs are recycled, so not guaranteed unique across time.",
    explanation: "Better to combine with time or use mkstemp.",
    hint: "tempnam() or mkstemp() are safer.",
    level: "intermediate",
    codeExample: "snprintf(path, sizeof(path), '/tmp/myapp_%d', getpid());"
  },
  {
    question: "What is PID 0 on Linux?",
    shortAnswer: "The idle process (swapper), a kernel thread that runs when no other process is ready.",
    explanation: "Not visible in normal ps; its PPID is 0.",
    hint: "ps -e | grep ' 0'",
    level: "expert",
    codeExample: "ps -eo pid,comm | grep '^ *0'"
  },
  {
    question: "How does systemd-logind use PIDs?",
    shortAnswer: "It tracks which processes belong to which user session via cgroups and PIDs.",
    explanation: "logind watches /proc for new PIDs and assigns them to seats/sessions.",
    hint: "loginctl list-sessions",
    level: "expert",
    codeExample: "loginctl show-session $(loginctl | tail -n +2 | head -1 | awk '{print $1}')"
  },
  {
    question: "What is the maximum PID on a typical Linux system?",
    shortAnswer: "Default 32768 on 32-bit; 4194304 on 64-bit (configurable).",
    explanation: "Set via /proc/sys/kernel/pid_max. Can be increased up to 2^22.",
    hint: "sysctl kernel.pid_max",
    level: "advanced",
    codeExample: "echo 65536 | sudo tee /proc/sys/kernel/pid_max"
  },
  {
    question: "What is the 'tgid' field in /proc/pid/stat?",
    shortAnswer: "Thread group ID – the PID of the process (same for all threads).",
    explanation: "For a single-threaded process, tgid = pid. For threads, they share the same tgid.",
    hint: "ps -eLf shows thread IDs (LWP).",
    level: "expert",
    codeExample: "cat /proc/$$/stat | awk '{print $1, $2, $20}'"
  },
  {
    question: "Why does `getppid()` return 1 for orphaned processes?",
    shortAnswer: "Because the kernel reparents them to init (PID 1), the universal parent.",
    explanation: "init's responsibility includes waiting for all orphaned processes.",
    hint: "Double-fork daemon technique.",
    level: "intermediate",
    codeExample: "while true; do (sleep 5 &); done  # see orphans"
  },
  {
    question: "What is the 'pidfd' feature in Linux?",
    shortAnswer: "File descriptors referring to a process, used for race‑free signals and waiting.",
    explanation: "Introduced to avoid PID recycling races. Use pidfd_open() to obtain.",
    hint: "man 2 pidfd_open",
    level: "expert",
    codeExample: "int fd = pidfd_open(1234, 0);"
  },
  {
    question: "Can a process get the PID of its parent after the parent has forked again?",
    shortAnswer: "Yes, getppid() returns the current parent, which may be a different process if reparenting occurred.",
    explanation: "Parent PID can change only due to reparenting, not due to the parent forking new children.",
    hint: "The parent's PID remains constant for the child unless the parent dies.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you print pid_t portably?",
    shortAnswer: "Cast to long and use %ld, or use %d if you know it's int.",
    explanation: "POSIX does not guarantee pid_t is int, but on Linux it is. Safer to cast to long.",
    hint: "printf('%ld', (long)getpid());",
    level: "intermediate",
    codeExample: "printf('PID: %ld\\n', (long)getpid());"
  }
];

export default questions;