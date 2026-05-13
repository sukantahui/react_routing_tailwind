const questions = [
  {
    question: "What is the main difference between foreground and background processes?",
    shortAnswer: "Foreground processes block the shell; background processes run concurrently, allowing shell interaction.",
    explanation: "Foreground takes control of the terminal's input and output, while background releases the terminal to accept new commands.",
    hint: "Think of foreground as 'focused window' – the shell is busy.",
    level: "basic",
    codeExample: "$ sleep 5   # shell waits\n$ sleep 5 & # shell returns prompt immediately"
  },
  {
    question: "How do you start a command in the background?",
    shortAnswer: "Append an ampersand (&) to the command.",
    explanation: "Example: `long_running_task &`. The shell prints a job number and PID, then immediately gives you a new prompt.",
    hint: "It's like saying 'run this but don't wait'.",
    level: "basic",
    codeExample: "$ find / -name '*.log' > files.txt &"
  },
  {
    question: "What happens if a background process tries to read from stdin?",
    shortAnswer: "It receives SIGTTIN and stops (suspended).",
    explanation: "Background jobs that attempt to read from the terminal are automatically stopped by the kernel. You must bring them to foreground to provide input.",
    hint: "Try `read var &` – see what happens.",
    level: "intermediate",
    codeExample: "$ read answer &\n[1]+  Stopped                 read answer"
  },
  {
    question: "How can you bring a background job to the foreground?",
    shortAnswer: "Use the `fg` command with the job ID (e.g., `fg %1`).",
    explanation: "If no job ID is given, `fg` brings the current job (marked with +) to foreground.",
    hint: "`fg` by itself works on the most recent background/suspended job.",
    level: "basic",
    codeExample: "$ sleep 100 &\n$ fg %1\nsleep 100   # now in foreground"
  },
  {
    question: "What does Ctrl+Z do to a foreground process?",
    shortAnswer: "It suspends (stops) the process and returns control to the shell.",
    explanation: "The process is stopped but still exists. You can resume it with `fg` (foreground) or `bg` (background).",
    hint: "Z for 'pause' – like a video game.",
    level: "basic",
    codeExample: "$ vim file.txt\n^Z\n[1]+  Stopped                 vim file.txt"
  },
  {
    question: "How do you resume a suspended job in the background?",
    shortAnswer: "Use `bg` followed by the job ID (e.g., `bg %1`).",
    explanation: "The job continues execution but does not take control of the terminal.",
    hint: "bg = background resume.",
    level: "basic",
    codeExample: "$ bg %1\n[1]+ vim file.txt &"
  },
  {
    question: "Will a background job survive closing the terminal?",
    shortAnswer: "No, it receives SIGHUP and terminates unless you `disown` it or use `nohup`.",
    explanation: "When the shell exits, it sends hangup signal to all child jobs. Use `disown %jobID` to remove the job from the shell's job table and prevent SIGHUP.",
    hint: "Think 'hangup' – terminal hangs up.",
    level: "intermediate",
    codeExample: "$ long_task &\n$ disown %1\n$ exit   # long_task continues"
  },
  {
    question: "What is the difference between `command &` and `(command &)`?",
    shortAnswer: "The subshell version `(command &)` cannot be brought back with `fg` because it runs in a separate shell.",
    explanation: "The parentheses create a subshell, and the background job is a child of that subshell, not your main shell. The main shell sees no job.",
    hint: "Try both and run `jobs` after each.",
    level: "advanced",
    codeExample: "$ (sleep 100 &)   # no job entry in main shell"
  },
  {
    question: "How do you send a background job to the foreground by its command name?",
    shortAnswer: "Use job specifiers like `%?partial` or `%string`.",
    explanation: "`fg %?vim` brings the job whose command contains 'vim' to foreground. Useful when you forgot job numbers.",
    hint: "`%?` works like a substring search.",
    level: "intermediate",
    codeExample: "$ fg %?sleep   # brings a job that has 'sleep' in its command line"
  },
  {
    question: "Why does `jobs` sometimes show nothing even though I started background commands?",
    shortAnswer: "Those commands may have already finished, or you're in a subshell where job control is disabled.",
    explanation: "Background commands that complete quickly are removed from the job list. Also, non-interactive scripts disable job control.",
    hint: "Check if you're in a script or subshell.",
    level: "intermediate",
    codeExample: "#!/bin/bash\nsleep 1 &\njobs   # may output nothing because job finished"
  },
  {
    question: "Can you have multiple background jobs?",
    shortAnswer: "Yes, each gets a unique job number (1, 2, 3...).",
    explanation: "The shell can manage many background and stopped jobs simultaneously. Use `jobs -l` to see all.",
    hint: "Each `&` adds a new job.",
    level: "basic",
    codeExample: "$ sleep 100 &\n$ sleep 200 &\n$ jobs -l\n[1]- 12345 Running ...\n[2]+ 12346 Running ..."
  },
  {
    question: "What does the '+' sign mean in `jobs` output?",
    shortAnswer: "It marks the current job – the default target for `fg` or `bg` if no job ID is given.",
    explanation: "The most recent background or stopped job becomes current. The previous job gets '-'.",
    hint: "Think of `+` as 'most recent'.",
    level: "basic",
    codeExample: "$ jobs\n[1]-  Running  sleep 100\n[2]+  Stopped  vim\n$ fg   # brings vim to foreground"
  },
  {
    question: "How do you kill a background job without bringing it to foreground?",
    shortAnswer: "Use `kill %jobID` or `kill PID`.",
    explanation: "`kill` sends signals. By default it sends SIGTERM (terminate). Example: `kill %2` kills job number 2.",
    hint: "Job IDs are easier than PIDs when you're in the same shell.",
    level: "basic",
    codeExample: "$ sleep 500 &\n$ kill %1\n[1]+  Terminated  sleep 500"
  },
  {
    question: "What is the difference between suspending (Ctrl+Z) and interrupting (Ctrl+C)?",
    shortAnswer: "Ctrl+Z suspends (stops) the process; Ctrl+C terminates (kills) it.",
    explanation: "Suspended processes can be resumed; terminated processes cannot.",
    hint: "Z = pause, C = cancel.",
    level: "basic",
    codeExample: "$ yes\n^Z  # stops\n$ fg  # resumes\n^C   # kills"
  },
  {
    question: "How do you redirect output of a background job to a file?",
    shortAnswer: "Use redirection as usual: `command > output.log 2>&1 &`.",
    explanation: "Redirect stdout and stderr to a file to avoid clutter on the terminal.",
    hint: "Always redirect background job output – it's professional practice.",
    level: "basic",
    codeExample: "$ ./data_process > log.txt 2>&1 &"
  },
  {
    question: "What is the purpose of the `wait` command with respect to background jobs?",
    shortAnswer: "`wait` pauses the shell until a specified background job finishes.",
    explanation: "Useful in scripts: start a background job, then `wait %1` to block until it's done.",
    hint: "`wait` makes the shell synchronise.",
    level: "intermediate",
    codeExample: "#!/bin/bash\nlong_task &\nwait %1\necho 'Task completed'"
  },
  {
    question: "Can you background a process that is already running in the foreground?",
    shortAnswer: "Yes: suspend it with Ctrl+Z, then type `bg`.",
    explanation: "This is the classic way to move a running foreground process to the background.",
    hint: "Ctrl+Z then bg – a two-step dance.",
    level: "basic",
    codeExample: "$ long_command\n^Z\n[1]+  Stopped\n$ bg\n[1]+ long_command &"
  },
  {
    question: "Why does my background process stop when I log out even if I used `&`?",
    shortAnswer: "Because `&` does not protect against SIGHUP. Use `nohup` or `disown`.",
    explanation: "`&` only runs the command in the background; the shell still considers it a job and sends SIGHUP on exit.",
    hint: "`nohup` = no hangup.",
    level: "intermediate",
    codeExample: "$ nohup long_task &> log.txt &"
  },
  {
    question: "What happens if you run `fg` when there are no background jobs?",
    shortAnswer: "`fg` returns an error: 'fg: no current job'.",
    explanation: "There must be at least one suspended or background job to bring to foreground.",
    hint: "Run `jobs` first to see candidates.",
    level: "basic",
    codeExample: "$ fg\n-bash: fg: current: no such job"
  },
  {
    question: "How do you list only the PIDs of background jobs?",
    shortAnswer: "Use `jobs -p` to get process group IDs, or parse `jobs -l`.",
    explanation: "`jobs -p` outputs PIDs, one per line, which can be fed to other commands.",
    hint: "`-p` stands for 'process IDs'.",
    level: "intermediate",
    codeExample: "$ jobs -p\n12345\n12346"
  }
];

export default questions;