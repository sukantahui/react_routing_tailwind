// topic11_questions.js
const questions = [
  {
    question: "What is the role of the process scheduler?",
    shortAnswer: "Decides which process runs on the CPU and for how long.",
    explanation: "The scheduler balances fairness, throughput, responsiveness, and power consumption.",
    hint: "Brain of multitasking.",
    level: "basic",
    codeExample: "sched_yield(); // voluntarily yield"
  },
  {
    question: "What is preemptive multitasking?",
    shortAnswer: "The kernel can forcibly remove a process from the CPU (e.g., after its time slice expires).",
    explanation: "Unix uses preemptive multitasking, ensuring no single process can monopolise the CPU.",
    hint: "Time slice expiry triggers preemption.",
    level: "intermediate",
    codeExample: "Timer interrupt forces context switch."
  },
  {
    question: "What is a context switch?",
    shortAnswer: "Saving the state of one process and restoring another.",
    explanation: "Includes saving registers, program counter, and memory management info.",
    hint: "vmstat shows cs (context switches) per second.",
    level: "intermediate",
    codeExample: "The scheduler performs context switch."
  },
  {
    question: "What is the difference between FCFS and Round Robin?",
    shortAnswer: "FCFS runs a process until it blocks/terminates; RR gives each a fixed time slice.",
    explanation: "RR is fair and responsive; FCFS can cause the 'convoy effect' where short jobs wait behind long ones.",
    hint: "RR prevents starvation.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is a time slice (quantum)?",
    shortAnswer: "The maximum time a process can run before the scheduler preempts it.",
    explanation: "Typical Linux values: 4–100ms. It influences responsiveness vs throughput.",
    hint: "sysctl kernel.sched_min_granularity_ns",
    level: "intermediate",
    codeExample: "sched_rr_get_interval() shows quantum for SCHED_RR."
  },
  {
    question: "What is the nice value in Unix?",
    shortAnswer: "A user-space priority adjustment from -20 (highest) to +19 (lowest). Default 0.",
    explanation: "'Niceness' – a higher nice value means the process is nicer to others, thus lower priority.",
    hint: "nice -n 10 ./program",
    level: "basic",
    codeExample: "nice(10); // lower priority"
  },
  {
    question: "How does Linux's Completely Fair Scheduler (CFS) work?",
    shortAnswer: "Each process gets a virtual runtime (vruntime). The scheduler always runs the process with the smallest vruntime.",
    explanation: "CFS uses a red‑black tree for ready processes and aims to make vruntime equal over time.",
    hint: "Fairness: processes get proportional CPU time.",
    level: "advanced",
    codeExample: "cat /proc/sched_debug"
  },
  {
    question: "What is the purpose of sched_yield()?",
    shortAnswer: "Voluntarily yields the CPU to other processes of same priority.",
    explanation: "Useful in cooperative multitasking or spinlock implementations; rarely needed in modern code.",
    hint: "sched_yield();",
    level: "intermediate",
    codeExample: "while (spinlock) sched_yield();"
  },
  {
    question: "What are real‑time scheduling policies?",
    shortAnswer: "SCHED_FIFO (first in, first out) and SCHED_RR (round robin) – higher priority than normal processes.",
    explanation: "Real‑time policies are not subject to the CFS fairness; they can starve normal processes.",
    hint: "Requires root or CAP_SYS_NICE.",
    level: "advanced",
    codeExample: "chrt -f 99 ./program"
  },
  {
    question: "What does the 'load average' mean?",
    shortAnswer: "Average number of processes in the run queue over 1, 5, and 15 minutes.",
    explanation: "A load average of 1.0 on a single‑core system means 100% utilisation; higher means contention.",
    hint: "uptime, top show load average.",
    level: "intermediate",
    codeExample: "uptime"
  },
  {
    question: "How can a process pin itself to a specific CPU core?",
    shortAnswer: "Using sched_setaffinity() or taskset command.",
    explanation: "CPU affinity improves cache locality and can reduce context switching overhead.",
    hint: "taskset -c 0 ./program",
    level: "advanced",
    codeExample: "CPU_ZERO(&mask); CPU_SET(0, &mask); sched_setaffinity(0, sizeof(mask), &mask);"
  },
  {
    question: "What is the difference between process priority and nice value?",
    shortAnswer: "Nice is a user‑level adjustment; kernel uses dynamic priority (which includes nice and other factors).",
    explanation: "Priority also includes penalty/reward based on I/O and interactivity.",
    hint: "top shows PR and NI columns.",
    level: "intermediate",
    codeExample: "ps -o pid,pri,nice,comm"
  },
  {
    question: "What happens when a process blocks on I/O?",
    shortAnswer: "The scheduler moves it to waiting state and runs another process from the ready queue.",
    explanation: "The I/O completion will later move it back to ready.",
    hint: "I/O‑bound processes get scheduled quickly.",
    level: "basic",
    codeExample: "read() blocks; scheduler runs another process."
  },
  {
    question: "What is the 'HZ' kernel constant?",
    shortAnswer: "The number of timer interrupts per second (100, 250, 1000 Hz on typical systems).",
    explanation: "HZ determines the maximum preemption granularity.",
    hint: "getconf CLK_TCK",
    level: "advanced",
    codeExample: "cat /proc/sys/kernel/hz"
  },
  {
    question: "What is the difference between SCHED_OTHER and SCHED_BATCH?",
    shortAnswer: "SCHED_OTHER is the default CFS policy; SCHED_BATCH is for CPU‑intensive, non‑interactive tasks with lower scheduling latency.",
    explanation: "SCHED_BATCH processes are slightly de‑prioritised to favour interactive ones.",
    hint: "sched_setscheduler(..., SCHED_BATCH, ...);",
    level: "expert",
    codeExample: "chrt -b 0 ./batch_job"
  },
  {
    question: "How to check the scheduling policy of a running process?",
    shortAnswer: "Use chrt -p <PID> or see /proc/<PID>/sched.",
    explanation: "Output shows policy (0=normal, 1=FIFO, 2=RR).",
    hint: "chrt -p $$",
    level: "intermediate",
    codeExample: "cat /proc/$$/sched | grep policy"
  },
  {
    question: "What is 'priority inversion'?",
    shortAnswer: "A low‑priority process holds a lock needed by a high‑priority process, causing the high‑priority to wait.",
    explanation: "Solved by priority inheritance, e.g., in mutexes (PTHREAD_PRIO_INHERIT).",
    hint: "Real‑time systems face this.",
    level: "expert",
    codeExample: "pthread_mutexattr_setprotocol(&attr, PTHREAD_PRIO_INHERIT);"
  },
  {
    question: "What is the effect of setting a real‑time priority too high?",
    shortAnswer: "The process can starve all normal processes, potentially making the system unresponsive.",
    explanation: "Real‑time tasks must yield or block regularly, or be scheduled with SCHED_RR with a time slice.",
    hint: "Avoid infinite loops in SCHED_FIFO.",
    level: "expert",
    codeExample: "while (1); // with SCHED_FIFO priority 99 freezes system"
  },
  {
    question: "What is the 'run queue'?",
    shortAnswer: "A data structure (list, tree) of all processes in the ready state.",
    explanation: "CFS uses a red‑black tree keyed by vruntime; O(1) scheduler used per‑CPU run queues.",
    hint: "vmstat's r column is run queue length.",
    level: "intermediate",
    codeExample: "vmstat 1"
  },
  {
    question: "Does sched_yield() immediately cause a context switch?",
    shortAnswer: "Yes, the calling process goes to the end of the run queue for its priority level.",
    explanation: "If no other process is ready, it continues immediately.",
    hint: "May not help if only one process.",
    level: "intermediate",
    codeExample: "sched_yield(); // moves to back of queue"
  },
  {
    question: "What is the default time slice length on a typical Linux?",
    shortAnswer: "Not fixed; CFS uses target latency (e.g., 6ms) and minimum granularity (e.g., 0.75ms).",
    explanation: "The time slice dynamically adjusts based on the number of runnable processes.",
    hint: "sysctl kernel.sched_min_granularity_ns",
    level: "advanced",
    codeExample: "cat /proc/sys/kernel/sched_min_granularity_ns"
  },
  {
    question: "What is the role of the scheduler_tick() function?",
    shortAnswer: "Called on each timer interrupt; decrements timeslice and may set need_resched flag.",
    explanation: "In CFS, it updates vruntime and checks if current process should be preempted.",
    hint: "Kernel source: kernel/sched/core.c",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is 'SCHED_DEADLINE'?",
    shortAnswer: "A real‑time scheduling policy based on earliest deadline first (EDF).",
    explanation: "Processes specify a runtime, period, and deadline; kernel guarantees they meet them if possible.",
    hint: "For hard real‑time tasks.",
    level: "expert",
    codeExample: "sched_setattr() with SCHED_DEADLINE"
  },
  {
    question: "How can a process see how much CPU time it has consumed?",
    shortAnswer: "getrusage(RUSAGE_SELF, &usage) or clock_gettime(CLOCK_PROCESS_CPUTIME_ID).",
    explanation: "Returns user and system CPU time.",
    hint: "time ./program",
    level: "intermediate",
    codeExample: "struct rusage ru; getrusage(RUSAGE_SELF, &ru);"
  },
  {
    question: "What does the 'PRI' column in ps -l indicate?",
    shortAnswer: "Current kernel priority (higher number = lower priority).",
    explanation: "It is dynamic: base nice value + penalty/bonus.",
    hint: "top's PR column.",
    level: "intermediate",
    codeExample: "ps -l -p $$"
  },
  {
    question: "What is the difference between I/O‑bound and CPU‑bound processes regarding scheduling?",
    shortAnswer: "I/O‑bound processes often get higher dynamic priority because they block frequently, improving responsiveness.",
    explanation: "CFS gives I/O‑bound tasks a virtual runtime boost.",
    hint: "Interactive tasks get more CPU when they need it.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the purpose of the 'sched_wakeup' event?",
    shortAnswer: "When a process becomes ready (e.g., I/O completion), the scheduler is notified and may preempt current process if new one has higher priority.",
    explanation: "Wakeup preemption ensures low latency.",
    hint: "strace shows futex wakeups.",
    level: "expert",
    codeExample: "perf sched record /bin/sleep 1"
  },
  {
    question: "Can a user change a process's scheduling policy to real‑time?",
    shortAnswer: "Only if the user has CAP_SYS_NICE capability (usually root).",
    explanation: "On many systems, normal users can only lower priority (nice) but not raise to real‑time.",
    hint: "sudo chrt -f 99 ./program",
    level: "advanced",
    codeExample: "ulimit -r 99"
  },
  {
    question: "What is the 'check_preempt_curr' function in the Linux scheduler?",
    shortAnswer: "Checks if the newly woken or created process should preempt the currently running process.",
    explanation: "Part of CFS; uses vruntime comparison.",
    hint: "kernel/sched/fair.c",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the purpose of the ‘sched_min_granularity’ tunable?",
    shortAnswer: "Minimum CPU time a process gets before being preempted.",
    explanation: "Prevents excessive context switching with many runnable processes.",
    hint: "sysctl kernel.sched_min_granularity_ns",
    level: "expert",
    codeExample: "sudo sysctl kernel.sched_min_granularity_ns=3000000"
  }
];

export default questions;