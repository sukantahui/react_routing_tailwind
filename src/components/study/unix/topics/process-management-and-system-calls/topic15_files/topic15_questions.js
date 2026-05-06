// topic15_questions.js
const questions = [
  {
    question: "What is the range of nice values?",
    shortAnswer: "-20 (highest priority) to +19 (lowest priority).",
    explanation: "Default is 0. Negative values require superuser privileges.",
    hint: "ps -l shows NI column.",
    level: "basic",
    codeExample: "nice -n 10 command"
  },
  {
    question: "What does a higher nice value mean?",
    shortAnswer: "Higher nice = lower priority = process gets less CPU time.",
    explanation: "It's 'nicer' to others, yielding the CPU more often.",
    hint: "Think 'nice to others' = yields CPU.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How to run a command with a nice value of 15?",
    shortAnswer: "nice -n 15 command",
    explanation: "The -n option specifies the increment (or absolute value depending on implementation).",
    hint: "nice -n 15 ./script.sh",
    level: "basic",
    codeExample: "nice -n 15 long_running_task"
  },
  {
    question: "How to change the nice value of an already running process?",
    shortAnswer: "renice -n <new_nice> -p <PID>",
    explanation: "Requires appropriate privileges. Only root can set negative (higher priority) nice values.",
    hint: "renice -n 10 -p 1234",
    level: "intermediate",
    codeExample: "renice -n -5 -p 7890  # needs root"
  },
  {
    question: "Why can't a normal user set a negative nice value?",
    shortAnswer: "Negative nice values increase priority, which could starve other processes; only root has that privilege.",
    explanation: "Allowing anyone to set high priority would lead to unfair resource usage.",
    hint: "Security and fairness.",
    level: "intermediate",
    codeExample: "nice -n -10 command  # fails for non‑root"
  },
  {
    question: "What is the default nice value of a shell?",
    shortAnswer: "0 (unless inherited from parent with a different nice).",
    explanation: "The login shell typically starts with nice 0.",
    hint: "ps -o ni,comm -p $$",
    level: "basic",
    codeExample: "echo $$; ps -o ni -p $$"
  },
  {
    question: "Does nice affect I/O bandwidth?",
    shortAnswer: "No, nice affects only CPU scheduling. Use ionice for disk I/O priority.",
    explanation: "ionice (Linux) sets I/O scheduling class and priority independently.",
    hint: "ionice -c 3 -p PID",
    level: "advanced",
    codeExample: "ionice -c 2 -n 0 cp largefile destination"
  },
  {
    question: "What happens if you nice a command without specifying a value?",
    shortAnswer: "Most versions add +10 to the current nice value.",
    explanation: "For example, if current nice is 0, `nice command` runs with nice 10.",
    hint: "nice ./script.sh",
    level: "intermediate",
    codeExample: "nice stress --cpu 1"
  },
  {
    question: "How to check the nice value of a running process?",
    shortAnswer: "Use ps -o ni -p PID, top (NI column), or htop.",
    explanation: "In top, press 'f' and select NI column if not shown.",
    hint: "ps -l shows NI.",
    level: "basic",
    codeExample: "ps -o pid,ni,comm -p 1234"
  },
  {
    question: "What is the relationship between nice value and Linux CFS weights?",
    shortAnswer: "CFS maps nice values to weights; nice -20 weight ~ 88761, nice 0 weight = 1024, nice +19 weight = 15.",
    explanation: "CPU time is proportional to weight. The effect is exponential, not linear.",
    hint: "cat /proc/sys/kernel/sched_min_granularity_ns",
    level: "expert",
    codeExample: "grep '^weight' /proc/sched_debug"
  },
  {
    question: "Can you renice a process that belongs to another user?",
    shortAnswer: "Only root can renice processes owned by other users.",
    explanation: "Normal users can only renice their own processes, and only to higher nice (lower priority).",
    hint: "sudo renice ...",
    level: "intermediate",
    codeExample: "sudo renice -n -10 -u swadeep"
  },
  {
    question: "Does nice affect real‑time processes (SCHED_FIFO/RR)?",
    shortAnswer: "No, real‑time processes ignore nice values; they have fixed priorities defined by sched_param.",
    explanation: "Real‑time policies are independent of the nice mechanism.",
    hint: "chrt -p PID",
    level: "advanced",
    codeExample: "chrt -f 99 ./realtime_task"
  },
  {
    question: "How to renice all processes of a specific user?",
    shortAnswer: "renice -n <value> -u <username>",
    explanation: "This changes the nice value of all processes owned by that user.",
    hint: "renice -n +10 -u swadeep",
    level: "intermediate",
    codeExample: "renice -n 15 -u tuhina"
  },
  {
    question: "What is the effect of nice on a single‑core vs multi‑core system?",
    shortAnswer: "On multi‑core, the effect is still present, but a high‑nice process can run on a core if other cores are idle.",
    explanation: "Load balancing may reduce the visible effect when system is not fully loaded.",
    hint: "taskset to pin processes for experiment.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can I set a process's nice value to -21?",
    shortAnswer: "No, the range is fixed from -20 to +19. Values outside are clamped.",
    explanation: "Kernel enforces the limit when setting priority.",
    hint: "nice -n -21 command  # becomes -20",
    level: "basic",
    codeExample: "nice -n -21 stress --cpu 1 & ps -l"
  },
  {
    question: "What is the nice function in C?",
    shortAnswer: "int nice(int inc); increases the nice value by inc (subject to privileges).",
    explanation: "Returns the new nice value, or -1 on error. Requires #include <unistd.h>.",
    hint: "nice(10);",
    level: "intermediate",
    codeExample: "int new_nice = nice(5);"
  },
  {
    question: "How do I get the current nice value in a C program?",
    shortAnswer: "Call nice(0) – it returns the current nice without changing it.",
    explanation: "However, the return value may be -1 for error, so check errno.",
    hint: "int curr = nice(0); if (curr == -1 && errno != 0) perror('nice');",
    level: "intermediate",
    codeExample: "printf('Current nice: %d\\n', nice(0));"
  },
  {
    question: "Why do I get 'Permission denied' when setting nice -10?",
    shortAnswer: "Only root can set negative (higher priority) nice values.",
    explanation: "Normal users can only lower priority (increase nice).",
    hint: "sudo nice -n -10 command",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between nice and cpulimit?",
    shortAnswer: "nice adjusts scheduling priority within the kernel; cpulimit actively pauses the process to enforce a CPU percentage limit.",
    explanation: "cpulimit is more aggressive and works even on systems where the scheduler might give too much CPU to a low‑nice process.",
    hint: "cpulimit -l 20 -p PID",
    level: "expert",
    codeExample: "cpulimit -e cpu_hungry -l 30"
  },
  {
    question: "Can I set a nice value for a shell script that calls other programs?",
    shortAnswer: "Yes, the nice value is inherited by child processes unless the child explicitly changes it.",
    explanation: "Start the script with nice, and all its subprocesses will run with that nice.",
    hint: "nice -n 10 ./myscript.sh",
    level: "intermediate",
    codeExample: "nice -n 15 bash -c 'stress --cpu 1 &'"
  },
  {
    question: "How does the `ulimit -e` command relate to nice?",
    shortAnswer: "ulimit -e sets the scheduling priority (nice) limit for the shell, but is not commonly used. Use nice/renice instead.",
    explanation: "ulimit -e value is the maximum nice value that can be set; it's rarely used in practice.",
    hint: "ulimit -a | grep nice",
    level: "advanced",
    codeExample: "ulimit -e 10  # set max nice to 10"
  },
  {
    question: "What is the nice value of a kernel thread?",
    shortAnswer: "Kernel threads often show nice 0 or negative values, but their scheduling is handled differently.",
    explanation: "Some kernel threads have RT priority; viewing with ps may show negative PR but NI is often 0.",
    hint: "ps -e -o pid,ni,comm | grep '\\['",
    level: "expert",
    codeExample: null
  },
  {
    question: "Is there a standard command to reset a process's nice value to 0?",
    shortAnswer: "renice -n 0 -p PID",
    explanation: "Resets the process priority to default.",
    hint: "renice 0 `pgrep firefox`",
    level: "basic",
    codeExample: "renice -n 0 -p 1234"
  },
  {
    question: "How to launch a low‑priority X application that remains responsive?",
    shortAnswer: "Set nice to +10 or +15 for compute‑intensive parts, but note that GUI responsiveness is more about I/O and scheduling class.",
    explanation: "X applications often handle user input via events; nice alone may not help much if the app is already interactive.",
    hint: "nice -n 10 firefox &",
    level: "advanced",
    codeExample: "nice -n 19 tar -czf backup.tgz ~/"
  },
  {
    question: "What does 'PR' column in top mean?",
    shortAnswer: "PR (priority) combines the nice value and real‑time status. RT means real‑time; otherwise, PR = 20 + NI.",
    explanation: "For normal processes, PR = 20 + NI (so NI 0 → PR 20, NI -20 → PR 0).",
    hint: "Top shows PR and NI.",
    level: "intermediate",
    codeExample: "top -p $$"
  },
  {
    question: "Can a child process have a different nice value than its parent?",
    shortAnswer: "Yes, after fork the child can call nice() to change its own priority independently.",
    explanation: "The child inherits the parent's nice at creation but can modify it.",
    hint: "fork(); if (pid == 0) nice(10);",
    level: "intermediate",
    codeExample: "pid = fork(); if (pid == 0) nice(15); else wait(NULL);"
  },
  {
    question: "What is the effect of 'nice -n -20' on system responsiveness?",
    shortAnswer: "It can starve other processes of CPU, potentially causing the system to become sluggish or unresponsive.",
    explanation: "Use with extreme caution. Usually only justified for critical audio/video processing or real‑time tasks.",
    hint: "Avoid unless absolutely necessary.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can I use renice on a process that is stopped (state T)?",
    shortAnswer: "Yes, renice works on any process regardless of its state, but the effect will apply when it resumes.",
    explanation: "Nice is a process attribute stored in the PCB, not dependent on being running.",
    hint: "kill -STOP PID; renice -n -5 PID; kill -CONT PID",
    level: "expert",
    codeExample: "renice -n 10 -p 5678"
  },
  {
    question: "What is the difference between `nice -5` and `nice -n 5`?",
    shortAnswer: "On many systems, `nice -5` is interpreted as an increment of 5 (like `nice -n 5`). But to avoid confusion, always use `nice -n value`.",
    explanation: "Older versions use `nice -5` to set absolute nice 5; modern GNU coreutils treat it as increment. Better to be explicit.",
    hint: "Check `man nice` on your system.",
    level: "intermediate",
    codeExample: "nice -n 10 command"
  },
  {
    question: "What is the nice value of init (PID 1)?",
    shortAnswer: "Typically 0, but may be negative on some systems.",
    explanation: "init runs with default priority unless configured otherwise. On systemd, it may have RT priority for some tasks.",
    hint: "ps -o ni -p 1",
    level: "basic",
    codeExample: "ps -p 1 -o ni"
  }
];

export default questions;