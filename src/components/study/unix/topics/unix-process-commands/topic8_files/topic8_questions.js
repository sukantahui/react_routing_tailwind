// topic8_files/topic8_questions.js
const questions = [
  {
    question: "What does `nohup` stand for?",
    shortAnswer: "No hangup.",
    explanation: "It ignores the SIGHUP (hangup) signal, so the process continues after the terminal closes.",
    hint: "The name comes from 'no hangup'.",
    level: "basic",
    codeExample: "nohup sleep 3600 &"
  },
  {
    question: "Why does a process normally die when you close the terminal?",
    shortAnswer: "The terminal sends SIGHUP to its child processes, which by default terminates them.",
    explanation: "SIGHUP originally meant the phone line hung up; today it's used to notify processes that the controlling terminal is gone.",
    hint: "Try `trap 'echo caught' HUP` and then close the terminal?",
    level: "intermediate",
    codeExample: "bash -c 'trap \"echo HUP\" HUP; sleep 100' &"
  },
  {
    question: "What does `nohup command &` do?",
    shortAnswer: "Runs `command` in the background, ignoring SIGHUP, so it survives terminal logout.",
    explanation: "Output from `command` is appended to `nohup.out` unless redirected.",
    hint: "`&` backgrounds immediately; `nohup` ignores HUP.",
    level: "basic",
    codeExample: "nohup ./long_script.sh &"
  },
  {
    question: "Where does `nohup` write output by default?",
    shortAnswer: "To `nohup.out` in the current directory, or `$HOME/nohup.out` if the current directory isn't writable.",
    explanation: "Both stdout and stderr are merged into that file unless you redirect them.",
    hint: "Check with `tail -f nohup.out` while the command runs.",
    level: "basic",
    codeExample: "ls -l nohup.out"
  },
  {
    question: "How can I redirect `nohup` output to a specific file?",
    shortAnswer: "Use shell redirection: `nohup command > mylog.log 2>&1 &`",
    explanation: "This overrides the default `nohup.out`.",
    hint: "Always include `2>&1` to capture stderr as well.",
    level: "intermediate",
    codeExample: "nohup backup.sh > backup.log 2>&1 &"
  },
  {
    question: "Can `nohup` be used with shell builtins like `cd`?",
    shortAnswer: "No, because `cd` is not an external command. Use `nohup bash -c \"cd /tmp; command\"`.",
    explanation: "`nohup` only works on external executables; builtins are part of the shell itself.",
    hint: "`type cd` shows that it's a shell builtin.",
    level: "advanced",
    codeExample: "nohup bash -c 'sleep 30 && echo done' &"
  },
  {
    question: "What is the difference between `nohup command &` and `command &`?",
    shortAnswer: "`nohup` makes the process ignore SIGHUP; without it, `&` alone dies when the terminal closes.",
    explanation: "Both run in background, but only `nohup` survives logout.",
    hint: "Start both, close terminal, re-login and check `ps`.",
    level: "basic",
    codeExample: "sleep 100 &   # dies on logout"
  },
  {
    question: "What is the difference between `nohup` and `disown`?",
    shortAnswer: "`nohup` starts a process immune to SIGHUP from the beginning; `disown` removes a running job from the shell's job table after it's started.",
    explanation: "`disown` does not change the signal disposition; it only prevents the shell from sending SIGHUP on exit.",
    hint: "`disown` works on jobs that were started with `&`; `nohup` works on new processes.",
    level: "advanced",
    codeExample: "sleep 100 &; disown   # now immune"
  },
  {
    question: "Does `nohup` prevent all signals?",
    shortAnswer: "No, it only ignores SIGHUP. SIGTERM, SIGINT (Ctrl+C), etc., still affect the process.",
    explanation: "You can still kill a `nohup` process with `kill` or `kill -9`.",
    hint: "Try `nohup sleep 500 &; kill %1` – it will terminate.",
    level: "intermediate",
    codeExample: "kill -15 PID_of_nohup_process"
  },
  {
    question: "How can I run a `nohup` process without producing any output file?",
    shortAnswer: "Redirect to `/dev/null`: `nohup command > /dev/null 2>&1 &`",
    explanation: "This discards all output, preventing `nohup.out` from being created.",
    hint: "Use this for truly silent background daemons.",
    level: "advanced",
    codeExample: "nohup ./daemon > /dev/null 2>&1 &"
  },
  {
    question: "Can I use `nohup` with a pipeline?",
    shortAnswer: "Yes, but wrap the pipeline in a subshell: `nohup bash -c \"cmd1 | cmd2\" &`",
    explanation: "`nohup` only affects the command directly following it; without subshell, only the first command gets `nohup`.",
    hint: "`nohup cmd1 | cmd2` – only cmd1 is protected.",
    level: "expert",
    codeExample: "nohup sh -c 'cat /dev/zero | gzip > /dev/null' &"
  },
  {
    question: "How do I check if a `nohup` process is still running after logout?",
    shortAnswer: "Log back in and use `ps aux | grep process_name` or check the PID file.",
    explanation: "The process will have a PPID of 1 (init/systemd) after logout.",
    hint: "`ps -o pid,ppid,cmd -p $PID` shows the parent.",
    level: "basic",
    codeExample: "ps -ef | grep mytask"
  },
  {
    question: "What happens to the file descriptors of a `nohup` process?",
    shortAnswer: "`nohup` closes stdin (0) and redirects stdout/stderr to `nohup.out` or your custom file.",
    explanation: "It ensures the process doesn't wait for input or write to a dead terminal.",
    hint: "Use `lsof -p PID` to see open files.",
    level: "expert",
    codeExample: "lsof -p $(pgrep -f 'nohup')"
  },
  {
    question: "Can I `nohup` a command that is already running?",
    shortAnswer: "No; you must start it with `nohup` from the beginning. But you can use `disown` to detach an existing background job.",
    explanation: "`disown` removes the job from the shell's table and prevents SIGHUP on exit.",
    hint: "`Ctrl+Z`, then `bg`, then `disown`.",
    level: "advanced",
    codeExample: "sleep 100; ^Z; bg; disown"
  },
  {
    question: "Why does `nohup` sometimes write to `nohup.out` even when I redirect output?",
    shortAnswer: "If you redirect only stdout or only stderr, the other stream still goes to `nohup.out`. Always redirect both.",
    explanation: "Use `> file 2>&1` to capture both.",
    hint: "Check for error messages: `command 2> err.log` still leaves stdout to `nohup.out`.",
    level: "intermediate",
    codeExample: "nohup mycmd > out 2> err &   # no nohup.out"
  },
  {
    question: "Is `nohup` needed in a systemd service?",
    shortAnswer: "No, systemd manages services and does not use SIGHUP in the same way. It's unnecessary.",
    explanation: "Systemd can restart processes, handle log output, and survive user logout by design.",
    hint: "For production, use systemd instead of `nohup`+`&`.",
    level: "expert",
    codeExample: "systemctl start myservice"
  },
  {
    question: "Can I use `nohup` inside a `cron` job?",
    shortAnswer: "It's redundant; cron already runs jobs independently of any terminal.",
    explanation: "Cron jobs don't receive SIGHUP from a terminal because they are not attached to one.",
    hint: "Still, adding `nohup` does no harm.",
    level: "intermediate",
    codeExample: "# crontab: 0 2 * * * nohup /backup.sh > /dev/null 2>&1"
  },
  {
    question: "What does the error `nohup: ignoring input and appending output to 'nohup.out'` mean?",
    shortAnswer: "It's an informational message showing that `nohup` is working and output will go to that file.",
    explanation: "Not an error; you can suppress it by redirecting output.",
    hint: "The message goes to stderr; redirect stderr if you want to hide it.",
    level: "basic",
    codeExample: "nohup ./script 2> /dev/null &"
  },
  {
    question: "How can I see the output of a `nohup` process while it's running?",
    shortAnswer: "Use `tail -f nohup.out` (or your custom log file) to watch live output.",
    explanation: "This is useful for monitoring progress.",
    hint: "`tail -f` follows the file as it grows.",
    level: "basic",
    codeExample: "tail -f nohup.out"
  },
  {
    question: "What happens if the current directory is deleted while a `nohup` process is running?",
    shortAnswer: "The process remains running, but `nohup.out` might become inaccessible. Output may be lost.",
    explanation: "The process holds a file handle, but if the directory is removed, writes may fail silently.",
    hint: "Always use absolute paths or change to a stable directory before starting `nohup`.",
    level: "expert",
    codeExample: "cd /tmp; nohup ./important_script &"
  }
];

export default questions;