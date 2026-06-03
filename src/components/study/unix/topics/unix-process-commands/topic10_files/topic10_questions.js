const questions = [
  {
    question: "What is the first step when you suspect a runaway process?",
    shortAnswer: "Use `top` or `ps aux --sort=-%cpu` to identify the problematic PID.",
    explanation: "You need to locate the process consuming excessive resources before taking action.",
    hint: "Look for high CPU or memory usage.",
    level: "basic",
    codeExample: "$ ps aux --sort=-%cpu | head -5"
  },
  {
    question: "Why should you try `kill -15` before `kill -9`?",
    shortAnswer: "SIGTERM (15) allows the process to clean up resources; SIGKILL (9) forces immediate termination without cleanup.",
    explanation: "Using SIGTERM first is polite and safer for data integrity.",
    hint: "Think of it as asking nicely vs. pulling the plug.",
    level: "intermediate",
    codeExample: "$ kill -15 PID && sleep 2 && kill -0 PID || kill -9 PID"
  },
  {
    question: "How do you run a command with low CPU priority from the start?",
    shortAnswer: "Use `nice -n 19 command`.",
    explanation: "Nice values range from -20 (highest) to 19 (lowest). Default is 0.",
    hint: "Higher nice number = less priority.",
    level: "basic",
    codeExample: "$ nice -n 19 ./long_task &"
  },
  {
    question: "What command keeps a process running after you log out from SSH?",
    shortAnswer: "`nohup command &` or start with `disown` after backgrounding.",
    explanation: "nohup ignores SIGHUP and redirects output to nohup.out by default.",
    hint: "nohup = no hangup.",
    level: "intermediate",
    codeExample: "$ nohup ./server > server.log 2>&1 &"
  },
  {
    question: "How do you reload a daemon's configuration without restarting it?",
    shortAnswer: "Send the SIGHUP signal to the daemon's PID: `kill -HUP PID`.",
    explanation: "Many daemons (nginx, sshd, apache) reload config on SIGHUP.",
    hint: "HUP = HangUp, but repurposed for reload.",
    level: "advanced",
    codeExample: "$ sudo kill -HUP $(cat /var/run/nginx.pid)"
  },
  {
    question: "You have a background `tail -f` running. How do you stop it?",
    shortAnswer: "Bring it to foreground with `fg` then press Ctrl+C, or `kill %jobID`.",
    explanation: "You cannot directly Ctrl+C a background job because it does not receive terminal signals.",
    hint: "Background → foreground → interrupt.",
    level: "basic",
    codeExample: "$ fg %1\n^C"
  },
  {
    question: "How can you change the priority of an already running process?",
    shortAnswer: "Use `renice` with the PID: `renice +10 -p PID`.",
    explanation: "renice changes the nice value of a running process.",
    hint: "renice (re-nice).",
    level: "intermediate",
    codeExample: "$ renice +5 -p 12345"
  },
  {
    question: "What does `kill -0 PID` do?",
    shortAnswer: "It checks if the process exists without sending a signal.",
    explanation: "Useful in scripts to test whether a process is still alive.",
    hint: "0 is a null signal – no actual signal sent.",
    level: "advanced",
    codeExample: "if kill -0 $PID; then echo 'Process running'; fi"
  },
  {
    question: "Why does my background job stop when I close the terminal even with `&`?",
    shortAnswer: "Because `&` only backgrounds it; the shell still sends SIGHUP on exit. Use `nohup` or `disown`.",
    explanation: "The job is still a child of the shell. The shell sends hangup signal to all children when exiting.",
    hint: "Terminal logout sends SIGHUP to all jobs.",
    level: "intermediate",
    codeExample: "$ long_task &; disown"
  },
  {
    question: "How do you kill all processes belonging to a specific user?",
    shortAnswer: "Use `pkill -u username` or `killall -u username`.",
    explanation: "Be very careful with these commands; they can log out a user.",
    hint: "pkill can match by user, terminal, or pattern.",
    level: "expert",
    codeExample: "$ sudo pkill -u john"
  },
  {
    question: "What is the difference between `kill %1` and `kill PID`?",
    shortAnswer: "`%1` is a job ID (shell-specific), while PID is a system-wide process ID.",
    explanation: "Use job IDs when you're in the same shell; use PIDs when you need to affect processes from other sessions.",
    hint: "job IDs are easier in interactive shell.",
    level: "basic",
    codeExample: "$ kill %1   # within same shell"
  },
  {
    question: "How can you monitor a log file and also grep for errors in real-time?",
    shortAnswer: "`tail -f logfile | grep --line-buffered ERROR` in background.",
    explanation: "`--line-buffered` ensures grep outputs lines immediately for further processing.",
    hint: "Line buffering prevents delay.",
    level: "advanced",
    codeExample: "$ tail -f app.log | grep --line-buffered ERROR > errors.log &"
  },
  {
    question: "Your system is sluggish. Which command gives a quick overview?",
    shortAnswer: "`top` or `htop` (interactive), or `ps aux --sort=-%cpu | head`.",
    explanation: "These show real-time CPU and memory usage.",
    hint: "top is the standard tool.",
    level: "basic",
    codeExample: "$ top -o %CPU"
  },
  {
    question: "What signal should you send to a process to ask it to re-read its config?",
    shortAnswer: "SIGHUP (1) is conventional, but some daemons use SIGUSR1 or SIGUSR2.",
    explanation: "Check the daemon's documentation (e.g., `man nginx`).",
    hint: "HUP = reload config, not die.",
    level: "advanced",
    codeExample: "$ kill -HUP PID"
  },
  {
    question: "How do you make a process immune to SIGHUP without using nohup?",
    shortAnswer: "Use `disown` after starting the job in background.",
    explanation: "`disown` removes the job from the shell's job table, so no SIGHUP is sent.",
    hint: "disown = detach from current shell.",
    level: "intermediate",
    codeExample: "$ long_task &; disown %1"
  },
  {
    question: "What is the purpose of `wait` in a script with background jobs?",
    shortAnswer: "It pauses the script until the specified background job completes.",
    explanation: "Useful for synchronizing parallel tasks.",
    hint: "wait for child processes.",
    level: "intermediate",
    codeExample: "#!/bin/bash\ntask1 & task2 &\nwait\n echo 'Both done'"
  },
  {
    question: "How can you see the nice values of all processes?",
    shortAnswer: "`ps -eo pid,ni,comm` or `top` then press 'n' to sort by nice.",
    explanation: "NI column shows nice value.",
    hint: "NI = nice.",
    level: "basic",
    codeExample: "$ ps -eo pid,ni,comm --sort=ni"
  },
  {
    question: "What happens if you `kill -9` a process that holds important locks?",
    shortAnswer: "Locks may not be released, causing corruption or stale lock files.",
    explanation: "Always prefer SIGTERM unless absolutely necessary.",
    hint: "SIGKILL cannot be caught or ignored, hence no cleanup.",
    level: "expert",
    codeExample: "Use `kill -15` first, wait, then `kill -9` if still alive."
  },
  {
    question: "How do you start a command that continues even after the terminal closes, and also logs output?",
    shortAnswer: "`nohup command > output.log 2>&1 &`",
    explanation: "nohup prevents SIGHUP; redirection captures output.",
    hint: "Combine nohup, redirection, and &.",
    level: "advanced",
    codeExample: "$ nohup ./backup.sh > backup.log 2>&1 &"
  },
  {
    question: "Why might `ps` show a process as `Z` (zombie)?",
    shortAnswer: "The process has terminated but its parent has not yet called `wait()` to reap it.",
    explanation: "Zombies consume no resources except a PID entry. They are cleared when parent exits or calls wait.",
    hint: "Zombie = dead but not buried.",
    level: "expert",
    codeExample: "Use `ps aux | grep Z` to find zombies."
  }
];

export default questions;