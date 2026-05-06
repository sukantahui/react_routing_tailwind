// topic10_questions.js
const questions = [
  {
    question: "What are the five classic process states?",
    shortAnswer: "New, Ready, Running, Waiting (Blocked), Terminated.",
    explanation: "These states describe the lifecycle of a process from creation to termination. Modern operating systems have additional states but these are the core.",
    hint: "Draw the diagram from memory.",
    level: "basic",
    codeExample: "ps -l shows state letter."
  },
  {
    question: "What does the R state mean in ps output?",
    shortAnswer: "Running or runnable (ready to run, waiting for CPU).",
    explanation: "Actually 'R' means the process is in the run queue – it may be running or ready. Linux does not differentiate between 'ready' and 'running' in user‑visible tools.",
    hint: "top shows CPU usage for R processes.",
    level: "basic",
    codeExample: "ps -e -o pid,stat,comm | grep '^ *[0-9] R'"
  },
  {
    question: "What does the S state mean in ps output?",
    shortAnswer: "Sleeping (interruptible sleep), waiting for an event or I/O.",
    explanation: "Process is not using CPU. Can be woken by signals. Most processes spend most of their time in S.",
    hint: "ps -l shows S for idle shell.",
    level: "basic",
    codeExample: "ps -e -o stat | grep -c S"
  },
  {
    question: "What does the D state mean?",
    shortAnswer: "Uninterruptible sleep – usually waiting for disk I/O. Cannot be killed.",
    explanation: "Process is stuck in a kernel routine (e.g., NFS, swap). High D count indicates I/O problems.",
    hint: "kill -9 does not work on D state.",
    level: "intermediate",
    codeExample: "ps aux | awk '$8 ~ /D/ {print}'"
  },
  {
    question: "What does the Z state mean?",
    shortAnswer: "Zombie – process terminated but parent hasn't reaped it.",
    explanation: "Zombies consume only a PCB entry. Too many zombies can fill the process table.",
    hint: "Look for '<defunct>' in ps output.",
    level: "intermediate",
    codeExample: "ps aux | grep defunct"
  },
  {
    question: "What does the T state mean?",
    shortAnswer: "Stopped – usually by SIGSTOP, SIGTSTP (Ctrl+Z), or debugger.",
    explanation: "Process is suspended. Can be resumed with SIGCONT.",
    hint: "Use fg or bg to continue.",
    level: "intermediate",
    codeExample: "kill -CONT <PID>"
  },
  {
    question: "How does a process transition from New to Ready?",
    shortAnswer: "After the kernel completes creating the process (PCB, memory allocation), it moves it to the ready queue.",
    explanation: "This is called 'admit'. The process is now eligible to be scheduled.",
    hint: "After fork(), child is ready.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does a process transition from Ready to Running?",
    shortAnswer: "The scheduler selects the process from the ready queue and dispatches it to a CPU core.",
    explanation: "This is called 'dispatch' or 'schedule'.",
    hint: "The scheduler picks based on priority, time slice, etc.",
    level: "basic",
    codeExample: "The `sched` system calls influence this."
  },
  {
    question: "How does a process transition from Running to Ready?",
    shortAnswer: "When its time slice expires (timer interrupt) or a higher priority process becomes ready (preemption).",
    explanation: "The process is moved back to the ready queue to wait for its next turn.",
    hint: "Preemptive multitasking.",
    level: "intermediate",
    codeExample: "sched_yield() voluntarily yields CPU."
  },
  {
    question: "How does a process transition from Running to Waiting?",
    shortAnswer: "When it requests an I/O operation (read, write), waits for a signal, or locks a mutex that is not available.",
    explanation: "The process is blocked; it is not eligible for CPU until the event occurs.",
    hint: "System calls like read, pause, wait cause waiting state.",
    level: "intermediate",
    codeExample: "read(fd, buf, 1); // blocks if no data"
  },
  {
    question: "How does a process transition from Waiting to Ready?",
    shortAnswer: "When the event it was waiting for occurs (I/O completion, lock available, signal delivered).",
    explanation: "The kernel wakes up the process and moves it to the ready queue.",
    hint: "I/O interrupt or signal wakes the process.",
    level: "intermediate",
    codeExample: "Data arrives on socket → process becomes ready."
  },
  {
    question: "How does a process transition from Running to Terminated?",
    shortAnswer: "When it calls exit(), returns from main, or receives a fatal signal (SIGKILL, SIGTERM).",
    explanation: "The process becomes a zombie until its parent calls wait().",
    hint: "The exit code is saved for the parent.",
    level: "basic",
    codeExample: "exit(0); or return 0; in main."
  },
  {
    question: "What is a 'preemptive' scheduler?",
    shortAnswer: "One that can forcibly remove a process from the CPU (preempt it) before it voluntarily yields.",
    explanation: "Modern operating systems are preemptive, allowing fair CPU sharing and real‑time response.",
    hint: "Time‑sharing systems use preemption.",
    level: "intermediate",
    codeExample: "The kernel timer interrupt triggers preemption."
  },
  {
    question: "What is the difference between interruptible and uninterruptible sleep?",
    shortAnswer: "Interruptible (S) can be woken by signals; uninterruptible (D) cannot (until I/O completes).",
    explanation: "D state is for critical kernel operations where signal handling would be unsafe.",
    hint: "You cannot kill a process in D state.",
    level: "advanced",
    codeExample: "cat /proc/<pid>/status | grep State"
  },
  {
    question: "What is a context switch?",
    shortAnswer: "The act of saving the state of one process and restoring another, moving from Running to Ready and vice versa.",
    explanation: "Context switches occur when the scheduler decides to change the running process.",
    hint: "vmstat shows context switch count (cs).",
    level: "intermediate",
    codeExample: "vmstat 1 | column -t"
  },
  {
    question: "What is the 'WCHAN' column in ps?",
    shortAnswer: "The kernel function or wait channel where the process is sleeping, if any.",
    explanation: "Useful for debugging: e.g., 'read', 'wait', 'do_exit'.",
    hint: "ps -l shows WCHAN.",
    level: "advanced",
    codeExample: "ps -o pid,stat,wchan,comm"
  },
  {
    question: "Can a process be in both Ready and Waiting at the same time?",
    shortAnswer: "No, a process is in exactly one state at any instant, as recorded in its PCB.",
    explanation: "The state field in task_struct is exclusive.",
    hint: "State is a single value.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the purpose of the 'stopped' state (T)?",
    shortAnswer: "To temporarily suspend execution, often for job control (Ctrl+Z) or debugging.",
    explanation: "The process is not eligible for CPU until a SIGCONT is received.",
    hint: "bg, fg, Ctrl+Z",
    level: "intermediate",
    codeExample: "kill -STOP <pid>; kill -CONT <pid>"
  },
  {
    question: "What is the difference between a process waiting for CPU (Ready) and waiting for I/O (Sleeping)?",
    shortAnswer: "Ready means the process could run now if the CPU were available; Sleeping means it cannot run because it's waiting for an event.",
    explanation: "The scheduler only selects processes from the ready queue.",
    hint: "Ready → R state; Sleeping → S/D state.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you see the state of a specific process continuously?",
    shortAnswer: "Use `watch -n 1 'ps -o pid,stat,comm -p <PID>'` or `top -p <PID>`.",
    explanation: "These tools update the state every second.",
    hint: "watch 'ps -o stat -p $$'",
    level: "basic",
    codeExample: "watch -n 0.5 'ps -o pid,stat,comm -p 1234'"
  },
  {
    question: "What does the 'S+' state mean in ps?",
    shortAnswer: "S (sleeping) and + (foreground process group).",
    explanation: "The '+' indicates the process is in the foreground process group for its terminal.",
    hint: "ps -l shows extra flags.",
    level: "intermediate",
    codeExample: "ps -o pid,stat,tty,comm"
  },
  {
    question: "Why does a process sometimes consume 100% CPU and stay in R state?",
    shortAnswer: "It is CPU‑bound (e.g., infinite loop). The scheduler keeps it running unless preempted.",
    explanation: "Such processes may starve other processes if not properly prioritised.",
    hint: "nice can reduce its priority.",
    level: "intermediate",
    codeExample: "while (1);"
  },
  {
    question: "What is the 'idle' process (PID 0) state?",
    shortAnswer: "The kernel's idle thread runs when no other process is ready; it has state 'I' (idle).",
    explanation: "It's a kernel thread that puts the CPU into low‑power state.",
    hint: "not visible in normal ps.",
    level: "advanced",
    codeExample: "ps -e -o pid,stat,comm | grep ' 0 '"
  },
  {
    question: "What does the 'WCHAN' value '-' mean?",
    shortAnswer: "The process is running (not sleeping).",
    explanation: "It means the process is on CPU or ready, not blocked.",
    hint: "For running processes, WCHAN is '-'.",
    level: "intermediate",
    codeExample: "ps -o pid,stat,wchan -C some_process"
  },
  {
    question: "Can a process in 'D' state be killed?",
    shortAnswer: "No, not even with SIGKILL. You must resolve the I/O issue or reboot.",
    explanation: "The process is stuck in kernel code that cannot handle signals.",
    hint: "Often NFS or swap issues.",
    level: "advanced",
    codeExample: "kill -9 <D_pid> has no effect."
  },
  {
    question: "What is the relationship between process state and signals?",
    shortAnswer: "Signals can wake sleeping processes (if interruptible), stop running ones (SIGSTOP), or terminate them (SIGKILL).",
    explanation: "Signals cause state transitions: e.g., SIGCONT moves T → Ready.",
    hint: "man 7 signal",
    level: "advanced",
    codeExample: "kill -CONT <stopped_pid>"
  },
  {
    question: "How many processes can be in the Running state on a single‑CPU system?",
    shortAnswer: "At most one, because only one can execute at a time.",
    explanation: "On multi‑core systems, one per core can be running simultaneously.",
    hint: "`ps -e -o stat | grep R` shows runnable processes, not necessarily running.",
    level: "basic",
    codeExample: "nproc shows number of cores."
  },
  {
    question: "What is a 'run queue'?",
    shortAnswer: "The list of processes in Ready state, waiting for CPU.",
    explanation: "The scheduler picks the next process from the run queue.",
    hint: "`vmstat 1` shows run queue length (r column).",
    level: "intermediate",
    codeExample: "vmstat 1 5"
  },
  {
    question: "What does the 'kernel stack' have to do with process states?",
    shortAnswer: "The kernel stack saves process context during state transitions (e.g., when blocking).",
    explanation: "It contains CPU registers and the kernel function call chain.",
    hint: "Each process has a kernel stack.",
    level: "expert",
    codeExample: "cat /proc/<pid>/stack"
  },
  {
    question: "What is the difference between 'preemptive' and 'cooperative' multitasking?",
    shortAnswer: "Preemptive: kernel forcibly switches processes; cooperative: processes voluntarily yield CPU.",
    explanation: "Unix systems use preemptive multitasking; old Windows 3.1 used cooperative.",
    hint: "Modern Linux is preemptive.",
    level: "intermediate",
    codeExample: "Preemptive: time slice expiration triggers switch."
  }
];

export default questions;