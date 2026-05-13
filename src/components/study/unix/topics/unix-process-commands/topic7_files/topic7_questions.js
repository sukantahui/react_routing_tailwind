// topic7_files/topic7_questions.js
const questions = [
  {
    question: "What is the default nice value of a process?",
    shortAnswer: "0.",
    explanation: "Unless changed by the user or system, processes start with a nice value of 0 (normal priority).",
    hint: "Run `ps -l` and check the NI column for a typical command.",
    level: "basic",
    codeExample: "ps -l | grep $$"
  },
  {
    question: "What is the range of nice values?",
    shortAnswer: "-20 (highest priority) to 19 (lowest priority).",
    explanation: "The more negative, the higher the priority. Positive values mean 'nice' (yielding) to others.",
    hint: "Run `nice -n 19 command` yields lowest priority; only root can use negative numbers.",
    level: "basic",
    codeExample: "nice -n 19 sleep 100 &   # very low priority"
  },
  {
    question: "Who can set a negative nice value?",
    shortAnswer: "Only the root user (superuser).",
    explanation: "Because negative nice values increase a process's priority, which could starve other processes, only root is allowed.",
    hint: "Try `nice -n -5 sleep 10` as a normal user – permission denied.",
    level: "basic",
    codeExample: "sudo nice -n -5 ./critical_task"
  },
  {
    question: "How do you start a command with a nice value of 10?",
    shortAnswer: "`nice -n 10 command` or `nice -10 command` (legacy).",
    explanation: "The `-n` flag is portable; the value is an adjustment (adds to default 0).",
    hint: "Check with `ps -l` after starting.",
    level: "basic",
    codeExample: "nice -n 10 dd if=/dev/zero of=/dev/null &"
  },
  {
    question: "What does `renice` do?",
    shortAnswer: "Changes the nice value of an already running process.",
    explanation: "Renice can adjust priority of a process by PID, by user, or by process group.",
    hint: "Use `renice -n 10 -p 1234` to lower priority of PID 1234.",
    level: "intermediate",
    codeExample: "renice +5 -p $(pgrep firefox)"
  },
  {
    question: "How can I check the nice value of a running process?",
    shortAnswer: "Use `ps -l` (NI column) or `top` (NI column), or `ps -o pid,ni,cmd`.",
    explanation: "The `NI` column displays the nice value. `top` also shows it.",
    hint: "`ps -eo pid,ni,comm | grep process_name`",
    level: "basic",
    codeExample: "ps -l -p 1234"
  },
  {
    question: "If I run `nice -n 15 ./script.sh`, does it guarantee the script will get less CPU?",
    shortAnswer: "No, it only suggests a lower priority; if the system is idle, it may still use all CPU.",
    explanation: "Nice affects scheduling only when there is contention. On an otherwise idle system, even very nice processes can saturate CPU.",
    hint: "Run two CPU hogs: one nice 19 and one nice 0. On idle system, both get CPU; only under load does priority matter.",
    level: "intermediate",
    codeExample: "stress --cpu 2 &; nice -n 19 stress --cpu 2 &"
  },
  {
    question: "Can a process change its own nice value?",
    shortAnswer: "Yes, using the `nice()` system call (e.g., via C or `renice` on itself).",
    explanation: "A process can lower its priority (increase nice), but only root can raise priority.",
    hint: "`renice -n 10 -p $$` in the shell lowers the shell's own priority.",
    level: "advanced",
    codeExample: "bash -c 'renice -n 10 -p $$'"
  },
  {
    question: "What is the difference between `nice` and `renice`?",
    shortAnswer: "`nice` sets priority when starting a command; `renice` changes it for existing processes.",
    explanation: "Use `nice` for one‑shot commands, `renice` for long‑running tasks you want to adjust.",
    hint: "See `man nice` and `man renice`.",
    level: "intermediate",
    codeExample: "renice -n 5 -u tuhina   # lower priority of all Tuhina's processes"
  },
  {
    question: "What happens if I run `nice -n -20` as root?",
    shortAnswer: "The process runs with the highest possible CPU priority (lowest nice).",
    explanation: "This can starve other processes; use with extreme caution.",
    hint: "Only for time‑critical system tasks.",
    level: "advanced",
    codeExample: "sudo nice -n -20 /sbin/reboot   # not recommended"
  },
  {
    question: "Does nice affect I/O performance?",
    shortAnswer: "No, `nice` only affects CPU scheduling. For I/O priority, use `ionice`.",
    explanation: "A process with high nice can still saturate disk if it does heavy I/O.",
    hint: "Combine `nice -n 19` with `ionice -c 3` for truly low‑impact background jobs.",
    level: "expert",
    codeExample: "nice -n 19 ionice -c 3 rsync -av /source /dest"
  },
  {
    question: "What is the default nice value of a child process?",
    shortAnswer: "It inherits the parent's nice value, unless changed by the parent or by explicit `nice`.",
    explanation: "For example, a shell with nice 0 starts children with nice 0.",
    hint: "Start a shell with nice 10, then run a command – the command also runs with nice 10.",
    level: "intermediate",
    codeExample: "nice -n 10 bash -c 'sleep 100 &' # sleep inherits nice 10"
  },
  {
    question: "Can I use `nice` with a pipe?",
    shortAnswer: "Yes, but the `nice` applies only to the command it precedes. For the whole pipeline, use a subshell.",
    explanation: "`nice -n 10 cmd1 | cmd2` – only cmd1 is niced. Use `(nice -n 10 cmd1 | nice -n 10 cmd2)` to nice both.",
    hint: "`(nice -n 10 cmd1 | cmd2)` – the subshell's nice is inherited by both.",
    level: "advanced",
    codeExample: "nice -n 10 sh -c 'cmd1 | cmd2'"
  },
  {
    question: "What does `renice -n -10 -g 1234` do?",
    shortAnswer: "Changes the nice value of all processes in process group 1234 by -10 (increase priority).",
    explanation: "`-g` refers to process group ID. Only root can increase priority.",
    hint: "Use `ps -o pid,pgid,cmd` to see process groups.",
    level: "expert",
    codeExample: "renice -n -10 -g 5678"
  },
  {
    question: "Why are my `renice` changes not showing immediate effect in `top`?",
    shortAnswer: "The change is effective immediately, but `top` updates every few seconds. Wait or press `k` to refresh.",
    explanation: "Also, some kernels have additional scheduling policies (e.g., SCHED_BATCH) that override nice.",
    hint: "Run `ps` to verify the new nice value instantly.",
    level: "basic",
    codeExample: "ps -o ni -p PID"
  },
  {
    question: "What is the relationship between nice value and priority (PRI) in `ps -l`?",
    shortAnswer: "PRI = (dynamic priority) = 20 + nice value + other adjustments (e.g., sleep penalty).",
    explanation: "The PRI column is a kernel‑internal number; lower PRI means higher actual priority.",
    hint: "Default nice 0 gives PRI around 80 on Linux.",
    level: "advanced",
    codeExample: "ps -l -p $$   # see NI and PRI"
  },
  {
    question: "Can I set nice value permanently for a user?",
    shortAnswer: "Yes, via `ulimit -e` in bash or PAM limits (limits.conf).",
    explanation: "`ulimit -e` sets the maximum nice value a user can request (not the default).",
    hint: "Add `username hard nice 10` to `/etc/security/limits.conf`.",
    level: "expert",
    codeExample: "ulimit -e 10   # user cannot set nice below 10 (less priority)"
  },
  {
    question: "How does `nice` interact with `cgroups` or `systemd`?",
    shortAnswer: "Modern systems may enforce CPU limits via cgroups; `nice` still works but is one factor among many.",
    explanation: "Systemd slices and scopes can override or cap CPU usage regardless of nice.",
    hint: "Check `systemd-cgtop` to see cgroup CPU usage.",
    level: "expert",
    codeExample: "systemd-run --user --nice=15 command"
  },
  {
    question: "What is the difference between `nice` and `cpulimit`?",
    shortAnswer: "`nice` adjusts scheduling priority; `cpulimit` caps CPU percentage use (e.g., 20% max).",
    explanation: "`cpulimit` sends SIGSTOP/SIGCONT to enforce a CPU cap, independent of nice.",
    hint: "`cpulimit -l 20 -p 1234` limits to 20% CPU.",
    level: "expert",
    codeExample: "cpulimit -l 30 ./heavy_task"
  },
  {
    question: "Why does `nice -n 19` sometimes still consume a lot of CPU?",
    shortAnswer: "Because if no higher priority process wants CPU, the `nice` process can still use 100%.",
    explanation: "Nice only matters under CPU contention. On an idle system, even the nicest process can saturate a core.",
    hint: "Use `cpulimit` or `taskset` to enforce CPU limits if needed.",
    level: "intermediate",
    codeExample: "while true; do :; done &   # same as nice 19 if no others"
  }
];

export default questions;