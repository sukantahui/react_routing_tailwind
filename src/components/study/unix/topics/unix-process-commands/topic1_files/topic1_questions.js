// topic1_files/topic1_questions.js
const questions = [
  {
    question: "What does the `ps` command do?",
    shortAnswer: "It displays information about active processes (a snapshot).",
    explanation: "Unlike `top` which updates continuously, `ps` gives a static view of processes at the moment it is run.",
    hint: "Run `ps` and then run `ps -e` — what changed?",
    level: "basic",
    codeExample: "ps -ef"
  },
  {
    question: "How do you list all processes on the system using `ps`?",
    shortAnswer: "Use `ps -e` (standard) or `ps aux` (BSD style).",
    explanation: "`-e` selects every process. `-A` is equivalent. `aux` shows all processes in user-oriented format.",
    hint: "Try `ps -e | wc -l` to count total processes.",
    level: "basic",
    codeExample: "ps -e"
  },
  {
    question: "What does the `-f` option add to the output?",
    shortAnswer: "Full‑format listing with columns like UID, PPID, C, STIME, TTY, TIME, CMD.",
    explanation: "PPID (parent process ID) is especially useful to understand process hierarchy.",
    hint: "Compare `ps` vs `ps -f` — you'll see extra columns.",
    level: "basic",
    codeExample: "ps -f"
  },
  {
    question: "Explain the difference between `ps -e` and `ps -ef`.",
    shortAnswer: "`ps -e` lists all PIDs; `ps -ef` adds the full‑format columns.",
    explanation: "`-ef` is a common combination: `-e` (all) + `-f` (full).",
    hint: "Run both and observe column differences.",
    level: "basic",
    codeExample: "ps -ef | head"
  },
  {
    question: "How can you see processes owned by a specific user, say 'tuhina'?",
    shortAnswer: "`ps -u tuhina` or `ps -u tuhina` (standard) or `ps -U tuhina` (real UID).",
    explanation: "The `-u` option filters by effective user ID (name or number).",
    hint: "Try `ps -u root | head` to see root's processes.",
    level: "intermediate",
    codeExample: "ps -u abhronila"
  },
  {
    question: "What does the STAT column show in `ps` output?",
    shortAnswer: "Process state codes: R (running), S (sleeping), Z (zombie), T (stopped), etc.",
    explanation: "Additional modifiers: `<` (high priority), `N` (low priority), `s` (session leader).",
    hint: "Find a sleeping process (`S`) and a running one (`R`).",
    level: "intermediate",
    codeExample: "ps aux | grep '^USER\\|R\\|S'"
  },
  {
    question: "How can you display only the PID and command name of all processes?",
    shortAnswer: "Use `ps -eo pid,comm` (custom output format).",
    explanation: "`-o` specifies user‑defined output; `comm` shows executable name without arguments.",
    hint: "`ps -eo pid,cmd` shows full command line including arguments.",
    level: "advanced",
    codeExample: "ps -eo pid,comm --sort=pid"
  },
  {
    question: "What is the PPID column and why is it important?",
    shortAnswer: "Parent Process ID – the PID of the process that started this process.",
    explanation: "It reveals the hierarchy; e.g., a shell (bash) has PPID of its parent (often another bash or login).",
    hint: "Run `ps -f` and see which process has PPID=1 (init/systemd).",
    level: "intermediate",
    codeExample: "ps -ef | grep -E 'PID|bash'"
  },
  {
    question: "How do you sort `ps` output by memory usage?",
    shortAnswer: "Use `--sort=-%mem` with custom format: `ps aux --sort=-%mem`.",
    explanation: "The `--sort` flag works on any column; prefix `-` for descending order.",
    hint: "`ps aux --sort=-%cpu` sorts by CPU usage descending.",
    level: "expert",
    codeExample: "ps -eo pid,%mem,cmd --sort=-%mem | head -10"
  },
  {
    question: "What is the difference between `ps -ef` and `ps aux`?",
    shortAnswer: "Both show all processes but column names and default formats differ (UNIX vs BSD style).",
    explanation: "`ps aux` includes %CPU, %MEM, VSZ, RSS; `ps -ef` includes UID, PID, PPID, STIME.",
    hint: "Check the manual: `man ps` and search for 'STANDARD FORMAT SPECIFIERS'.",
    level: "expert",
    codeExample: "ps aux | head -2; echo '---'; ps -ef | head -2"
  },
  {
    question: "How can you display a process tree with `ps`?",
    shortAnswer: "Use `ps -ef --forest` (Linux) or `ps -e -o pid,args --forest`.",
    explanation: "This shows hierarchical relations in an ASCII tree, making parent/child relationships clear.",
    hint: "Try `ps -ef --forest | less` and navigate.",
    level: "advanced",
    codeExample: "ps -e -o pid,args --forest"
  },
  {
    question: "Why does `ps | grep sleep` sometimes show the grep command itself?",
    shortAnswer: "Because the `grep sleep` command line contains the word 'sleep', so it matches itself.",
    explanation: "To avoid this, use `ps | grep [s]leep` – the bracket makes the pattern not match itself.",
    hint: "Observe: `ps aux | grep sshd` vs `ps aux | grep [s]shd`.",
    level: "intermediate",
    codeExample: "ps -ef | grep '[s]leep'"
  },
  {
    question: "What does `ps -u $(whoami)` do?",
    shortAnswer: "It lists processes belonging to the current logged‑in user.",
    explanation: "`whoami` returns the username; command substitution passes it to `-u`.",
    hint: "Alias it: `alias myps='ps -u $(whoami)'`",
    level: "basic",
    codeExample: "ps -u $(id -un)"
  },
  {
    question: "How do you view threads with `ps`?",
    shortAnswer: "Use `-L` option: `ps -eLf` shows threads (LWP, NLWP columns).",
    explanation: "Each thread appears as a separate line with same PID but different LWP.",
    hint: "Run `ps -eLf | head` and look for NLWP > 1.",
    level: "expert",
    codeExample: "ps -eLf | grep firefox"
  },
  {
    question: "What is the meaning of `TIME` in `ps` output?",
    shortAnswer: "Cumulative CPU time consumed by the process (not real wall‑clock time).",
    explanation: "If a process sleeps or waits for I/O, TIME doesn't increase.",
    hint: "Compare `time sleep 2` (real vs user+sys).",
    level: "basic",
    codeExample: "ps -eo pid,time,cmd --sort=-time | head"
  },
  {
    question: "How can you continuously monitor a specific process with `ps`?",
    shortAnswer: "Use `watch -n 1 'ps -p <PID> -o pid,pcpu,pmem,cmd'`.",
    explanation: "`watch` reruns the command every second. This gives pseudo‑real‑time monitoring without `top`.",
    hint: "Replace `<PID>` with actual PID of your browser or compiler.",
    level: "advanced",
    codeExample: "watch -n 2 'ps -u swadeep -o pid,%cpu,cmd'"
  },
  {
    question: "What does the `C` column in `ps -f` represent?",
    shortAnswer: "Processor utilization (scheduler's internal priority, decayed CPU usage).",
    explanation: "It's a legacy column showing recent CPU use; on modern Linux it's often 0 or a small integer.",
    hint: "Run `ps -f` and look for the column under 'C'.",
    level: "intermediate",
    codeExample: "ps -f"
  },
  {
    question: "How do you list all processes in a nice, readable hierarchical format?",
    shortAnswer: "Use `pstree` command, but with `ps` you can use `ps -ejH` or `ps -e --forest`.",
    explanation: "`-j` shows job control info, `-H` shows process tree.",
    hint: "`ps -e --forest -o pid,args` is great for scripts.",
    level: "expert",
    codeExample: "ps -e --forest -o pid,cmd"
  },
  {
    question: "What is the difference between `ps -U` and `ps -u`?",
    shortAnswer: "`-u` selects by effective user ID; `-U` selects by real user ID (login user).",
    explanation: "Setuid programs: `-U` shows the original owner, `-u` shows the effective user under which it runs.",
    hint: "Try running `sudo -u nobody ps -U nobody` vs `-u nobody`.",
    level: "expert",
    codeExample: "ps -U root -u root"
  },
  {
    question: "How can you display the environment variables of a running process with `ps`?",
    shortAnswer: "Use `ps e -p <PID>` (show environment).",
    explanation: "The `e` option adds the environment after the command. Output can be very verbose.",
    hint: "`ps eww -p 1` shows environment of init/systemd with unlimited width.",
    level: "advanced",
    codeExample: "ps e -p $$   # environment of current shell"
  },
  {
    question: "What is the significance of a zombie process (STAT `Z`)?",
    shortAnswer: "A process that has terminated but its entry remains because parent hasn't read its exit status.",
    explanation: "Zombies consume no memory/CPU but occupy a PID slot. Parent should call `wait()`. Kill the parent to reparent to init, which reaps them.",
    hint: "Find zombies with `ps aux | grep 'Z'`.",
    level: "expert",
    codeExample: "ps aux | awk '$8==\"Z\" {print}'"
  }
];

export default questions;