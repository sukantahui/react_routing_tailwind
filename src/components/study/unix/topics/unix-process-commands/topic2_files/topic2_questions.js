// topic2_files/topic2_questions.js
const questions = [
  {
    question: "What is the primary purpose of the `top` command?",
    shortAnswer: "To display real‑time system summary and list of processes with dynamic resource usage.",
    explanation: "Unlike `ps` (static), `top` updates every few seconds (default 3s) and provides interactive control.",
    hint: "Run `top` and watch how numbers change.",
    level: "basic",
    codeExample: "top"
  },
  {
    question: "How can you exit `top`?",
    shortAnswer: "Press the `q` key.",
    explanation: "`q` stands for quit. Also Ctrl+C works in some versions.",
    hint: "When stuck, remember `q` is the universal quit key in many interactive Unix tools.",
    level: "basic",
    codeExample: "Just press 'q'"
  },
  {
    question: "What does load average in `top` indicate?",
    shortAnswer: "The number of processes in runnable or uninterruptible sleep state, averaged over 1,5,15 minutes.",
    explanation: "Load average > number of CPU cores indicates overloading. For a 4‑core machine, load 4.0 means fully saturated.",
    hint: "Compare load average with number of cores (`nproc`).",
    level: "intermediate",
    codeExample: "cat /proc/loadavg"
  },
  {
    question: "How can you sort processes by memory usage inside `top`?",
    shortAnswer: "Press capital `M` (Shift+m).",
    explanation: "Pressing `M` immediately sorts the process list by `%MEM` column descending. `P` sorts by CPU.",
    hint: "Try `M` then `P` to see sorting in action.",
    level: "basic",
    codeExample: "top then M"
  },
  {
    question: "How to kill a process directly from within `top`?",
    shortAnswer: "Press `k`, then enter the PID, and then the signal (default 15 = SIGTERM).",
    explanation: "`top` prompts for PID and signal number. You can also send SIGKILL (9) by typing '9' after PID.",
    hint: "Use `k` followed by PID, then `9` to force kill.",
    level: "intermediate",
    codeExample: "Within top: k → 1234 → 15"
  },
  {
    question: "What does the `%wa` value represent in the CPU line?",
    shortAnswer: "Percentage of CPU time waiting for I/O (disk, network).",
    explanation: "High `%wa` suggests slow disk or storage bottleneck, not necessarily high CPU usage.",
    hint: "If `%wa` > 10% and system feels slow, investigate disk I/O.",
    level: "intermediate",
    codeExample: "iostat -x 1"
  },
  {
    question: "How can you monitor only a specific user's processes with `top`?",
    shortAnswer: "Start top with `top -u username` or inside top press `u` then enter username.",
    explanation: "This filters the process list to only processes owned by that user.",
    hint: "Monitor system services: `top -u root`",
    level: "basic",
    codeExample: "top -u abhronila"
  },
  {
    question: "What does the `RES` column mean in the process list?",
    shortAnswer: "Resident memory size – physical memory (RAM) currently used by the process (not swapped).",
    explanation: "Does not include swapped or virtual memory. `VIRT` is total virtual, `RES` is physical.",
    hint: "Compare `RES` with `%MEM`; they are directly related.",
    level: "intermediate",
    codeExample: "top -o %MEM"
  },
  {
    question: "How can you change the update interval in `top`?",
    shortAnswer: "Press `s` and then type the number of seconds (e.g., `1` for every second).",
    explanation: "Default is 3.0 seconds. Be careful: very small intervals increase overhead.",
    hint: "For quick troubleshooting, `s` followed by `0.5` gives faster refresh.",
    level: "advanced",
    codeExample: "top then s 2"
  },
  {
    question: "What does it mean if a process shows `%CPU` of 300%?",
    shortAnswer: "The process is using 3 CPU cores fully (multi‑threaded).",
    explanation: "In `top`, CPU usage is summed across all cores. 100% = one core 100% busy.",
    hint: "Press `1` to see per‑core usage and verify.",
    level: "advanced",
    codeExample: "top -p <PID>"
  },
  {
    question: "How can you run `top` in batch mode and capture output to a file?",
    shortAnswer: "`top -b -n 1 > snapshot.txt`",
    explanation: "`-b` for batch mode, `-n 1` for one iteration only. Without `-n`, it never exits.",
    hint: "Combine with `head` to see only top processes: `top -b -n 1 | head -20`",
    level: "intermediate",
    codeExample: "top -b -n 2 > two_snapshots.log"
  },
  {
    question: "What key toggles the display of individual CPU cores?",
    shortAnswer: "Press `1` (the number one).",
    explanation: "Shows separate lines for each CPU/core in the header. Press again to collapse.",
    hint: "Useful on multi‑core servers to spot imbalance.",
    level: "basic",
    codeExample: "top then 1"
  },
  {
    question: "How can you change the priority (nice value) of a running process from `top`?",
    shortAnswer: "Press `r`, then enter PID, then the new nice value (-20 to 19).",
    explanation: "Lower nice = higher priority (requires root to lower below 0).",
    hint: "Increase nice to reduce priority: `r` → PID → 19.",
    level: "advanced",
    codeExample: "top then r"
  },
  {
    question: "What does the `TIME+` column represent?",
    shortAnswer: "Total CPU time consumed by the process since it started, shown with hundredths of a second.",
    explanation: "A process that sleeps a lot will have low TIME+ even if it has been running for days.",
    hint: "A process with huge TIME+ but low %CPU may be a long‑running daemon.",
    level: "basic",
    codeExample: "top -o TIME+"
  },
  {
    question: "How can you monitor only specific PIDs with `top`?",
    shortAnswer: "Use `top -p pid1,pid2,pid3`",
    explanation: "Monitors only those processes; useful for watching critical applications.",
    hint: "`top -p $(pgrep -d',' nginx)` watches all nginx workers.",
    level: "advanced",
    codeExample: "top -p 1234,5678"
  },
  {
    question: "What is the significance of the `zombie` count?",
    shortAnswer: "Number of processes that have terminated but have not been cleaned up (waited for) by their parent.",
    explanation: "A few zombies are normal, but many indicate a buggy parent process that doesn't call `wait()`.",
    hint: "Zombies show status `Z` in `ps`. They don't consume memory, only a PID slot.",
    level: "intermediate",
    codeExample: "ps aux | grep 'Z'"
  },
  {
    question: "How to toggle the display of full command lines (with arguments) in `top`?",
    shortAnswer: "Press `c` (lowercase c).",
    explanation: "Toggles between just the executable name and the full command line with arguments.",
    hint: "Very useful for debugging scripts with many parameters.",
    level: "basic",
    codeExample: "top then c"
  },
  {
    question: "What does the `buff/cache` line in memory summary mean?",
    shortAnswer: "Memory used by kernel buffers and page cache (often available for reuse).",
    explanation: "This memory is not free, but can be reclaimed quickly if applications need it.",
    hint: "Linux uses free memory for caching – don't panic if `free` memory is low.",
    level: "intermediate",
    codeExample: "free -h"
  },
  {
    question: "How can you save your custom `top` configuration?",
    shortAnswer: "Inside `top`, press `W` (uppercase W). It writes configuration to `~/.toprc`.",
    explanation: "Saves sort order, delay, display fields, color scheme, etc.",
    hint: "After customising, press `W` once – next time `top` will look the same.",
    level: "expert",
    codeExample: "Inside top: W"
  },
  {
    question: "What is the difference between `SHR` and `RES`?",
    shortAnswer: "`SHR` is shared memory (libraries, mmap), `RES` is total physical memory (including shared).",
    explanation: "Multiple processes can share the same `SHR` pages, so `RES` might be larger than unique memory.",
    hint: "Use `smem` to get a 'unique' memory view.",
    level: "advanced",
    codeExample: "top -o RES"
  },
  {
    question: "How can you see a tree view of processes in `top`?",
    shortAnswer: "Press `V` (uppercase V).",
    explanation: "It toggles forest view, displaying child processes indented under their parent.",
    hint: "`V` is less known but very powerful for understanding process ancestry.",
    level: "expert",
    codeExample: "top then V"
  }
];

export default questions;