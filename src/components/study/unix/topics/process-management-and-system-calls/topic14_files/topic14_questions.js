// topic14_questions.js
const questions = [
  {
    question: "What does the 'top' command display?",
    shortAnswer: "Real‑time system summary and list of processes sorted by resource usage.",
    explanation: "top shows CPU, memory, load, task counts, and an updatable list of processes with details like PID, %CPU, %MEM, command, etc.",
    hint: "man top",
    level: "basic",
    codeExample: "top"
  },
  {
    question: "How do you exit top?",
    shortAnswer: "Press 'q' (quit).",
    explanation: "Top also exits on Ctrl+C or by closing the terminal.",
    hint: "q key.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How to sort processes by memory usage in top?",
    shortAnswer: "Press 'M' (uppercase).",
    explanation: "This sorts the process list by resident memory (%MEM or RES).",
    hint: "M for memory.",
    level: "basic",
    codeExample: "top then press M"
  },
  {
    question: "How to sort by CPU usage in top?",
    shortAnswer: "Press 'P' (uppercase).",
    explanation: "This is the default sort order; it sorts by %CPU column.",
    hint: "P for processor.",
    level: "basic",
    codeExample: "top then press P"
  },
  {
    question: "How to kill a process from inside top?",
    shortAnswer: "Press 'k', then enter the PID, then the signal number (default 15 = SIGTERM).",
    explanation: "You can use 9 (SIGKILL) to forcibly terminate. Verify PID before confirming.",
    hint: "'k' key.",
    level: "intermediate",
    codeExample: "top -> press k -> enter PID -> 9 -> enter"
  },
  {
    question: "How to display only processes belonging to a specific user in top?",
    shortAnswer: "Press 'u', then type the username.",
    explanation: "This filters the process list. Press 'u' again with blank to show all.",
    hint: "'u' key.",
    level: "intermediate",
    codeExample: "top -> press u -> swadeep"
  },
  {
    question: "What does the '%CPU' column represent?",
    shortAnswer: "CPU usage percentage since the last screen refresh (not cumulative).",
    explanation: "On multi‑core systems, it can exceed 100% because it sums usage across cores.",
    hint: "Use 'H' to toggle threads.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the difference between VIRT, RES, and SHR?",
    shortAnswer: "VIRT = virtual memory (total), RES = resident memory (in RAM), SHR = shared memory (shared with other processes).",
    explanation: "RES is the most relevant for understanding process physical memory usage.",
    hint: "RES is what matters for OOM.",
    level: "intermediate",
    codeExample: "top then press 'f' to select fields"
  },
  {
    question: "What does the 'S' column (process status) show?",
    shortAnswer: "R = running, S = sleeping (interruptible), D = uninterruptible sleep, Z = zombie, T = stopped.",
    explanation: "Familiarise with these to diagnose system issues.",
    hint: "man ps for all states.",
    level: "basic",
    codeExample: "top"
  },
  {
    question: "How to change the update delay in top?",
    shortAnswer: "Press 's' then enter the number of seconds.",
    explanation: "Default is 3 seconds. Use smaller values for faster refresh (but more overhead).",
    hint: "'s' key.",
    level: "intermediate",
    codeExample: "top -> press s -> 1"
  },
  {
    question: "How to save your top configuration?",
    shortAnswer: "Press 'W' (uppercase). This writes settings to ~/.toprc.",
    explanation: "Saved fields, sort order, colour scheme, and delay will be restored next time.",
    hint: "capital W.",
    level: "advanced",
    codeExample: "top -> configure -> press W"
  },
  {
    question: "What is batch mode in top?",
    shortAnswer: "top -b runs without interactive control, useful for logging to file.",
    explanation: "Combine with -n 1 to take a single snapshot, or -n 10 for repeated samples.",
    hint: "top -b -n 1 > snapshot.txt",
    level: "intermediate",
    codeExample: "top -b -n 1 | head -20"
  },
  {
    question: "How to monitor only specific PIDs with top?",
    shortAnswer: "top -p PID1,PID2,... (comma‑separated).",
    explanation: "Only those processes will be shown. Great for watching a single service.",
    hint: "top -p 1234,5678",
    level: "advanced",
    codeExample: "top -p $$,1"
  },
  {
    question: "What does the load average mean in top?",
    shortAnswer: "Average number of processes in the run queue over 1, 5, and 15 minutes.",
    explanation: "Values less than the number of CPU cores are generally fine.",
    hint: "top's first line.",
    level: "intermediate",
    codeExample: "uptime"
  },
  {
    question: "Why does %CPU sometimes show > 100%?",
    shortAnswer: "Because the process is using multiple CPU cores. The value is the sum of usage across cores.",
    explanation: "If a process uses 100% of two cores, %CPU shows 200%.",
    hint: "htop shows this more clearly.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How to show full command line arguments in top?",
    shortAnswer: "Press 'c' (toggle).",
    explanation: "Shows the complete command line instead of just the truncated command name.",
    hint: "'c' key.",
    level: "basic",
    codeExample: "top -> press c"
  },
  {
    question: "How to view process tree (forest view) in top?",
    shortAnswer: "Press 'V' (uppercase).",
    explanation: "Displays processes in a tree structure, showing parent‑child relationships.",
    hint: "capital V.",
    level: "intermediate",
    codeExample: "top -> press V"
  },
  {
    question: "What is the difference between 'top' and 'htop'?",
    shortAnswer: "htop is more colourful, supports mouse, easier scrolling, and has better process management.",
    explanation: "htop also shows per‑core CPU usage graphically, and can kill without prompting for signal.",
    hint: "sudo apt install htop",
    level: "basic",
    codeExample: "htop"
  },
  {
    question: "How to rename a process's nice value (priority) from inside top?",
    shortAnswer: "Press 'r', then enter the PID, then enter the new nice value (-20 to +19).",
    explanation: "Lower nice value = higher priority. Default is 0.",
    hint: "'r' key.",
    level: "intermediate",
    codeExample: "top -> press r -> PID -> -5"
  },
  {
    question: "How to display cumulative CPU time (TIME+) instead of %CPU?",
    shortAnswer: "Sort by TIME+ by pressing 'T'.",
    explanation: "Useful to find which process has used the most CPU time overall.",
    hint: "capital T.",
    level: "basic",
    codeExample: "top -> press T"
  },
  {
    question: "How to filter displayed fields in top?",
    shortAnswer: "Press 'f' to enter field management screen, then use arrow keys and space to toggle fields.",
    explanation: "You can add/remove columns and reorder them.",
    hint: "'f' key.",
    level: "advanced",
    codeExample: "top -> f -> move cursor -> space to select"
  },
  {
    question: "What does the 'ni' column (nice value) mean?",
    shortAnswer: "The process's nice value, affecting scheduling priority. -20 is highest, 19 is lowest.",
    explanation: "Lower nice = higher priority. Only root can lower nice (increase priority).",
    hint: "nice command.",
    level: "intermediate",
    codeExample: "top -> look at NI column"
  },
  {
    question: "How to run top in a single iteration (non‑interactive) for scripting?",
    shortAnswer: "top -b -n 1",
    explanation: "Outputs once and exits, suitable for parsing with grep/awk.",
    hint: "top -b -n 1 | grep 'Cpu(s)'",
    level: "intermediate",
    codeExample: "top -b -n 1 | head -10"
  },
  {
    question: "What does the 'PR' column (priority) represent?",
    shortAnswer: "Kernel's dynamic priority (rt for real‑time, numbers for normal).",
    explanation: "PR = 20 + nice for normal processes; real‑time processes show 'rt'.",
    hint: "man top for details.",
    level: "advanced",
    codeExample: "top"
  },
  {
    question: "How to see per‑thread CPU usage in top?",
    shortAnswer: "Press 'H' (uppercase) to toggle thread view.",
    explanation: "Each thread of a process appears as a separate entry.",
    hint: "'H' key.",
    level: "advanced",
    codeExample: "top -> press H"
  },
  {
    question: "Why does top show a process with negative nice when I haven't set it?",
    shortAnswer: "Some kernel threads and real‑time processes run with lower nice or real‑time priority.",
    explanation: "It's normal for system processes; don't change them unless you understand.",
    hint: "Check with ps -eo pid,ni,comm.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How to change the unit of memory displayed (KiB, MiB, GiB) in top?",
    shortAnswer: "Press 'e' (lowercase) to cycle through units.",
    explanation: "'e' toggles: KiB, MiB, GiB, TiB, PiB, EiB for memory columns.",
    hint: "'e' key.",
    level: "intermediate",
    codeExample: "top -> press e a few times"
  },
  {
    question: "What is the purpose of `top -d` option?",
    shortAnswer: "Sets the delay (refresh interval) in seconds.",
    explanation: "Example: `top -d 0.5` refreshes every half second (requires root for < 0.1).",
    hint: "top -d 5",
    level: "basic",
    codeExample: "top -d 2"
  },
  {
    question: "How to highlight running processes in top?",
    shortAnswer: "Press 'R' (uppercase) to reverse the sort order. Combine with sort by CPU or memory.",
    explanation: "The current sort column is highlighted; you can also use colour configuration.",
    hint: "'R' toggles reverse sort.",
    level: "intermediate",
    codeExample: "top -> press P (sort by CPU) then R (reverse)"
  },
  {
    question: "What does the 'st' (stolen time) mean in CPU summary?",
    shortAnswer: "Percentage of CPU time stolen by the hypervisor from a virtual machine.",
    explanation: "High 'st' indicates that the host is overcommitted, affecting performance.",
    hint: "Especially relevant in cloud VMs.",
    level: "advanced",
    codeExample: "top -> look at the CPU line"
  }
];

export default questions;