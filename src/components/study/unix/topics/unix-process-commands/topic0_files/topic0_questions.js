// topic0_files/topic0_questions.js
const questions = [
  {
    question: "What is a process in an operating system?",
    shortAnswer: "A process is a program in execution with its own memory and resources.",
    explanation: "A process includes the program code, current activity (program counter, registers), stack, data section, and system resources like open files. It's a living entity managed by the OS scheduler.",
    hint: "Think of a running web browser vs its installer file on disk.",
    level: "basic",
    codeExample: "ps aux | grep firefox"
  },
  {
    question: "How is a foreground process different from a background process?",
    shortAnswer: "Foreground occupies the terminal and waits for input; background runs independently without locking the shell.",
    explanation: "Foreground processes have control of the terminal's stdin, stdout, and stderr. Background processes detach from the terminal input but can still write to output unless redirected.",
    hint: "Observe what happens when you run 'sleep 30' vs 'sleep 30 &'",
    level: "basic",
    codeExample: "sleep 100 &"
  },
  {
    question: "What does the `&` symbol do when placed after a command in bash?",
    shortAnswer: "It runs the command as a background process, returning the shell prompt immediately.",
    explanation: "The ampersand instructs the shell to execute the command in a subshell in the background, printing a job id and PID before showing the prompt.",
    hint: "Try: `yes > /dev/null &` then run `jobs`",
    level: "beginner",
    codeExample: "find / -name '*.log' > logs.txt &"
  },
  {
    question: "Explain the concept of job control and its relevance to process management.",
    shortAnswer: "Job control allows moving processes between foreground and background, suspending and resuming them.",
    explanation: "Modern Unix shells provide job control via commands like `jobs`, `fg`, `bg`, and keystrokes Ctrl+Z (suspend), Ctrl+C (terminate). This enables multitasking in a single terminal.",
    hint: "Think about editing a file, suspending it, and then compiling something else.",
    level: "intermediate",
    codeExample: "vim script.py   # then press Ctrl+Z, then type 'bg'"
  },
  {
    question: "What happens when you press Ctrl+Z in a terminal?",
    shortAnswer: "It suspends (pauses) the currently running foreground process, returning control to the shell.",
    explanation: "The shell sends SIGTSTP signal to the foreground process group, stopping it. The process remains in memory but does not execute until resumed with `fg` or `bg`.",
    hint: "Try: `sleep 60` then Ctrl+Z, then `jobs` to see its state 'Stopped'",
    level: "basic",
    codeExample: "$ sleep 50\n^Z\n[1]+  Stopped                 sleep 50"
  },
  {
    question: "What is the default signal sent by `kill` command (without options) and how does it affect a background process?",
    shortAnswer: "SIGTERM (15) asks the process to terminate gracefully, allowing cleanup.",
    explanation: "SIGTERM can be caught, ignored, or handled. Background processes respond like any other; they receive the signal and may exit. Use `kill %1` to target job id.",
    hint: "Run `sleep 300 &`, note PID, then `kill PID` — the sleep ends.",
    level: "intermediate",
    codeExample: "kill 12345    # SIGTERM"
  },
  {
    question: "Can a background process read input from the terminal? If not, why?",
    shortAnswer: "By default, background processes cannot read from stdin because they are detached from the terminal's input queue.",
    explanation: "If a background process attempts to read, it receives a SIGTTIN signal and stops. This prevents multiple processes fighting for input. To provide input, bring it to foreground or use redirection.",
    hint: "Try `read test &` – it will stop and show 'stopped'",
    level: "advanced",
    codeExample: "cat < /dev/null &   # safe, no read attempt"
  },
  {
    question: "What is the difference between `&` and `nohup`?",
    shortAnswer: "`&` backgrounds the process but still ties to shell; `nohup` makes it immune to hangups (SIGHUP) and typically redirects output.",
    explanation: "When the shell exits, processes started with `&` receive SIGHUP and may terminate. `nohup` ignores SIGHUP and continues even after logout, appending output to nohup.out.",
    hint: "SSH into a remote machine, run `longtask &` and disconnect – it dies. `nohup longtask &` survives.",
    level: "expert",
    codeExample: "nohup ./backup.sh &"
  },
  {
    question: "How can you suspend a running background process without killing it?",
    shortAnswer: "Use `kill -STOP [PID]` to pause a background process, later resume with `kill -CONT`.",
    explanation: "Signals SIGSTOP (cannot be caught) or SIGTSTP (interactive stop) can suspend any process. Unlike Ctrl+Z which only affects foreground, `kill -STOP` works on any process you own.",
    hint: "Start `ping google.com > /dev/null &`, note PID, then `kill -STOP PID` and check process state with `ps`",
    level: "expert",
    codeExample: "kill -STOP 4567   # pauses\nkill -CONT 4567  # resumes"
  },
  {
    question: "What happens if you close the terminal where a background process was launched?",
    shortAnswer: "The process receives SIGHUP and typically terminates unless it handles or ignores HUP.",
    explanation: "When the terminal closes, the shell sends SIGHUP to its child processes. Background jobs are still children, so they die. To avoid, use `disown` or `nohup`.",
    hint: "Debangshu from Naihati tried `python server.py &` and closed laptop — server stopped. He should use `nohup`.",
    level: "intermediate",
    codeExample: "disown %1   # removes job from shell table"
  },
  {
    question: "Explain the role of the scheduler in relation to foreground/background processes.",
    shortAnswer: "The scheduler treats both equally but foreground may have slight terminal I/O priority boosts.",
    explanation: "Linux scheduler uses dynamic priority. Foreground processes can have higher 'interactivity' score because they commonly block on I/O. However, heavy background CPU workloads can still be scheduled equally.",
    hint: "Observe `top` — you'll see priority (nice) values, foreground not automatically higher.",
    level: "advanced",
    codeExample: "nice -n 19 background_task &   # lower priority"
  },
  {
    question: "What is a zombie process and how do foreground/background relate?",
    shortAnswer: "A zombie is a terminated process whose entry remains in process table until parent waits. Both fg/bg can create zombies.",
    explanation: "Zombies consume no resources except PID entry. They occur when parent doesn't call wait(). Foreground processes usually have the shell waiting, so zombies rare; background processes with orphaned children can leave zombies.",
    hint: "Check `ps aux | grep defunct` to see zombies.",
    level: "expert",
    codeExample: "kill -CHLD parentPID   # sometimes reaps zombies"
  },
  {
    question: "Why would a background process output messages interleaved with your shell prompt?",
    shortAnswer: "Because the background process writes to stdout (the terminal) while the shell also writes the prompt.",
    explanation: "The background process is not blocked from writing to the terminal. To avoid messy output, redirect to files or use terminal multiplexers like tmux.",
    hint: "Run `while true; do date; sleep 2; done &` and you'll see dates mixed with your prompt.",
    level: "basic",
    codeExample: "./logger_script > /dev/null 2>&1 &"
  },
  {
    question: "What does the `jobs` command display? Can it show PIDs?",
    shortAnswer: "`jobs` lists background and suspended jobs of the current shell. Use `jobs -l` to include PIDs.",
    explanation: "Jobs are identified with job numbers like [1], [2]. Each job may consist of one or more processes in a pipeline. `jobs -p` shows only PIDs.",
    hint: "Start `sleep 100 &`, `sleep 200 &`, then type `jobs -l`",
    level: "beginner",
    codeExample: "jobs -l\n[1]  - 12345 Running                 sleep 100\n[2]+ 12346 Running                 sleep 200"
  },
  {
    question: "What is the difference between `kill %1` and `kill 1234`?",
    shortAnswer: "`kill %1` targets a job by its job number in the current shell; `kill 1234` targets PID regardless of shell.",
    explanation: "Job numbers are local to a shell instance. PIDs are global. Both send SIGTERM by default. Use `kill -9 %1` for forceful termination.",
    hint: "Try `jobs` to see job numbers, then `kill %1` avoids looking up PID.",
    level: "intermediate",
    codeExample: "vim file.txt  # Ctrl+Z, then kill %1   # kills vim job"
  },
  {
    question: "How can you bring a background process to the foreground without stopping it?",
    shortAnswer: "Use the `fg` command followed by job specifier (e.g., `fg %1`).",
    explanation: "If a job is running in background (`sleep 300 &`), `fg` will bring it to foreground, restoring terminal control to the process. If suspended, `fg` resumes it as well.",
    hint: "Start `top &`, then type `fg` to bring it back. Press q to exit.",
    level: "basic",
    codeExample: "sleep 200 &\nfg %1"
  },
  {
    question: "Explain the existential 'orphaned process' and its relation to background jobs.",
    shortAnswer: "An orphaned process's parent has terminated; init (PID 1) adopts it. Background jobs can become orphans if the shell exits without terminating them.",
    explanation: "If a background process's parent shell dies (terminal closed) but the process ignored SIGHUP or used `disown`, it becomes orphaned and reparented to init. This keeps it alive.",
    hint: "Use `nohup` exactly makes the daemon immune and prevents immediate SIGHUP.",
    level: "advanced",
    codeExample: "(sleep 1000 &)   # subshell trick, parent exits, sleep becomes orphan"
  },
  {
    question: "What does `disown` actually do to a background job?",
    shortAnswer: "`disown` removes the job from the shell's job table so it won't receive SIGHUP when the shell exits.",
    explanation: "After `disown`, the process continues but you cannot manage it with `fg`, `bg`, or `jobs` from that shell. It behaves like a daemon.",
    hint: "Start `xeyes &`, then `disown %1`, close terminal — xeyes might stay alive.",
    level: "expert",
    codeExample: "long_running_script & disown"
  },
  {
    question: "Is there a way to run multiple background processes and wait for all of them in a script?",
    shortAnswer: "Yes, using `wait` command without arguments waits for all child background processes.",
    explanation: "`wait` pauses until all background jobs started by the script finish. You can also `wait %1` for specific job. This is crucial for parallel processing scripts.",
    hint: "Write a script: `sleep 2 & sleep 3 & wait; echo done` — it takes ~3 seconds total.",
    level: "intermediate",
    codeExample: "task1 & task2 & task3 & wait\necho 'All tasks completed'"
  },
  {
    question: "What signal does `kill -9` send and why is it dangerous?",
    shortAnswer: "SIGKILL (9) forces immediate termination without allowing cleanup; data loss may occur.",
    explanation: "SIGKILL cannot be caught, blocked, or ignored. The kernel terminates the process abruptly. It should be a last resort, after trying SIGTERM.",
    hint: "Imagine a database process handling transactions – kill -9 might corrupt files. Always try graceful termination first.",
    level: "intermediate",
    codeExample: "kill -9 9876   # forceful, immediate death"
  }
];

export default questions;