// topic3_files/topic3_questions.js
const questions = [
  {
    question: "What is the default signal sent by the `kill` command?",
    shortAnswer: "SIGTERM (signal number 15).",
    explanation: "SIGTERM requests a process to terminate gracefully, giving it a chance to clean up.",
    hint: "Run `kill` without any signal option – it sends SIGTERM.",
    level: "basic",
    codeExample: "kill 1234  # sends SIGTERM"
  },
  {
    question: "What does `kill -9` do and why is it considered dangerous?",
    shortAnswer: "It sends SIGKILL which forcibly terminates the process without any cleanup.",
    explanation: "SIGKILL cannot be ignored or handled; the OS removes the process immediately, possibly leaving corrupted files or resources.",
    hint: "Try `kill -9` on a text editor with unsaved changes – data is lost.",
    level: "basic",
    codeExample: "kill -9 5678"
  },
  {
    question: "How can you list all signal names and numbers?",
    shortAnswer: "Use `kill -l` (lowercase L).",
    explanation: "On most Linux systems, `kill -l` prints a list of signal names. You can also use `trap -l` in bash.",
    hint: "`kill -l` shows 31 or 64 signals; `kill -l 9` prints 'KILL'.",
    level: "basic",
    codeExample: "kill -l"
  },
  {
    question: "What is the purpose of `kill -0 PID`?",
    shortAnswer: "It checks whether a process exists and you have permission to signal it, without sending an actual signal.",
    explanation: "Exit code 0 means process exists, non‑zero means no such process or permission denied.",
    hint: "Use in scripts: `if kill -0 $PID 2>/dev/null; then echo alive; fi`",
    level: "intermediate",
    codeExample: "kill -0 1234 && echo exists"
  },
  {
    question: "Can you send a signal to multiple processes at once?",
    shortAnswer: "Yes, use `kill PID1 PID2 ...` or `pkill` by name.",
    explanation: "`kill` accepts multiple PIDs. `pkill httpd` kills all processes named httpd. `killall` also works.",
    hint: "`pkill -f 'python server.py'` kills scripts by pattern.",
    level: "intermediate",
    codeExample: "kill 1001 1002 1003"
  },
  {
    question: "What is the difference between `kill` and `pkill`?",
    shortAnswer: "`kill` uses PIDs; `pkill` uses process names or other attributes.",
    explanation: "`pkill` searches for processes based on pattern, then sends signals. `kill` requires exact PIDs.",
    hint: "Use `pgrep -l nginx` to see what `pkill` would match.",
    level: "intermediate",
    codeExample: "pkill -15 chrome"
  },
  {
    question: "How can you resume a stopped process using `kill`?",
    shortAnswer: "Send SIGCONT signal: `kill -CONT PID`.",
    explanation: "If a process was stopped (by SIGSTOP or SIGTSTP), SIGCONT resumes it.",
    hint: "`kill -STOP PID` pauses it, `kill -CONT PID` resumes.",
    level: "intermediate",
    codeExample: "kill -CONT 9876"
  },
  {
    question: "What happens if you try to `kill` a zombie process?",
    shortAnswer: "You cannot kill a zombie because it is already dead; the entry disappears when parent reaps it.",
    explanation: "Zombies only occupy a PID entry. Killing the parent may reparent to init, which then reaps the zombie.",
    hint: "Find zombies with `ps aux | grep Z`.",
    level: "advanced",
    codeExample: "kill -9 <zombie_pid> # has no effect"
  },
  {
    question: "What signal number is SIGHUP and how is it often used?",
    shortAnswer: "SIGHUP = 1; commonly used to reload configuration without restarting.",
    explanation: "Daemons like nginx, sshd, or systemd services often reload config on SIGHUP.",
    hint: "`kill -HUP $(cat /var/run/nginx.pid)` reloads nginx.",
    level: "advanced",
    codeExample: "kill -1 1234"
  },
  {
    question: "Why might `kill -9` not work (process remains)?",
    shortAnswer: "Uninterruptible sleep (D state) or the process is a kernel thread; SIGKILL can't kill them.",
    explanation: "Processes in 'D' (disk sleep) are waiting for I/O and cannot be killed. Reboot maybe required.",
    hint: "Check state with `ps aux | grep D`.",
    level: "expert",
    codeExample: "ps aux | awk '$8==\"D\" {print}'"
  },
  {
    question: "What does `kill -SIGTERM` do?",
    shortAnswer: "Same as `kill -15`, sends termination request.",
    explanation: "You can use signal names instead of numbers: `kill -SIGTERM 1234`.",
    hint: "Use `kill -l` to see name‑number mapping.",
    level: "basic",
    codeExample: "kill -SIGTERM 8888"
  },
  {
    question: "How can you send a signal to all processes of a specific user?",
    shortAnswer: "Use `pkill -u username` or `killall -u username`.",
    explanation: "This terminates all processes owned by that user. Root only for other users.",
    hint: "Very dangerous: `pkill -u root` would crash system!",
    level: "advanced",
    codeExample: "pkill -9 -u swadeep"
  },
  {
    question: "What is the difference between `kill` and `killall`?",
    shortAnswer: "`kill` works on PID; `killall` works on process name and kills all matching.",
    explanation: "`killall` matches exact command name (by default). Use `-I` for case‑insensitive.",
    hint: "`killall sleep` kills every `sleep` process running.",
    level: "intermediate",
    codeExample: "killall firefox"
  },
  {
    question: "Can a process ignore SIGTERM?",
    shortAnswer: "Yes, a program can install a signal handler that ignores SIGTERM or delays exit.",
    explanation: "Many daemons catch SIGTERM to perform shutdown routines, but they can also choose to block it.",
    hint: "SIGKILL cannot be ignored; that's why it's the 'nuclear' option.",
    level: "intermediate",
    codeExample: "trap '' TERM  # in a shell script, ignores TERM"
  },
  {
    question: "How do you kill a process that is stuck in 'D' state?",
    shortAnswer: "Usually cannot; reboot is required or fix the underlying I/O issue.",
    explanation: "Uninterruptible sleep typically happens during disk I/O or NFS. Unkillable until I/O completes.",
    hint: "Check kernel logs (`dmesg`) for I/O errors.",
    level: "expert",
    codeExample: "echo b > /proc/sysrq-trigger  # emergency reboot (not recommended)"
  },
  {
    question: "What is the purpose of `kill -l 9`?",
    shortAnswer: "It prints the signal name corresponding to number 9, which is 'KILL'.",
    explanation: "`kill -l [number]` converts signal number to name, and vice versa.",
    hint: "`kill -l KILL` prints 9.",
    level: "intermediate",
    codeExample: "kill -l 9"
  },
  {
    question: "How can you kill a process by its PID without typing the number?",
    shortAnswer: "Use `kill $(pgrep -f pattern)` or command substitution.",
    explanation: "`pgrep` returns PIDs; backticks or `$()` substitute them.",
    hint: "`kill $(pgrep -f 'long_running_script')`",
    level: "advanced",
    codeExample: "kill `pidof mysqld`"
  },
  {
    question: "What signal does `Ctrl+C` send to the foreground process?",
    shortAnswer: "SIGINT (signal number 2).",
    explanation: "SIGINT is interactive interrupt, which can be caught and handled gracefully by many programs.",
    hint: "Compare `kill -INT PID` to `Ctrl+C`.",
    level: "basic",
    codeExample: "kill -2 1234  # same as pressing Ctrl+C on that foreground process"
  },
  {
    question: "How does `kill -9 -1` behave?",
    shortAnswer: "It sends SIGKILL to every process you own (except the shell itself in some implementations).",
    explanation: "PID -1 is a special value meaning 'all processes except init and kernel threads'. Very dangerous.",
    hint: "Don't test this unless you're ready to lose your session.",
    level: "expert",
    codeExample: "# kill -9 -1   # DO NOT RUN"
  },
  {
    question: "What is the exit status of `kill` if the process does not exist?",
    shortAnswer: "Non‑zero (usually 1) and error message like 'No such process'.",
    explanation: "You can check `$?` after `kill`. Use `kill -0` to test existence without error.",
    hint: "`kill -0 9999 2>/dev/null ; echo $?` prints 1.",
    level: "basic",
    codeExample: "kill 9999 2>/dev/null; echo $?"
  }
];

export default questions;