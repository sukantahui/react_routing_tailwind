const questions = [
    {
        question: "What does the `jobs` command display?",
        shortAnswer: "It displays a list of active background and suspended jobs in the current shell session.",
        explanation: "The jobs command shows job IDs, states (Running, Stopped, Terminated), and command names for processes started from the current shell that are not in the foreground.",
        hint: "Think about tasks you've sent to background with & or suspended with Ctrl+Z.",
        level: "basic",
        codeExample: "$ sleep 100 &\n[1] 12345\n$ jobs\n[1]+  Running                 sleep 100 &"
    },
    {
        question: "How do you list process IDs along with job information?",
        shortAnswer: "Use `jobs -l` (lowercase L).",
        explanation: "The -l option adds the process ID (PID) of each job's process group leader to the output, which is useful for debugging or when you need to send signals.",
        hint: "Look for an option that stands for 'long' or 'list PIDs'.",
        level: "basic",
        codeExample: "$ jobs -l\n[1]-  12345 Running                 sleep 300 &\n[2]+  12346 Stopped                 nano report.txt"
    },
    {
        question: "What is the difference between job ID `%1` and PID `12345`?",
        shortAnswer: "Job ID (%1) is a shell-assigned number valid only in the current session; PID is a system-wide unique process identifier.",
        explanation: "Job IDs (1,2,3...) simplify referring to jobs for shell built-ins like fg, bg, kill. PIDs are used by system tools like ps or kill from any terminal.",
        hint: "Job IDs are like seat numbers in a classroom; PIDs are like government IDs worldwide.",
        level: "intermediate",
        codeExample: "$ sleep 100 &\n[1] 12345\n$ kill %1   # kills by job ID\n$ kill 12345 # same effect, different reference"
    },
    {
        question: "What does the `+` and `-` signs mean in `jobs` output?",
        shortAnswer: "`+` indicates the current job (default target for fg/bg), `-` indicates the previous job.",
        explanation: "The current job is the most recently stopped or backgrounded job. The previous job is the one before that. This helps quickly switch between two tasks.",
        hint: "Think of `+` as 'now' and `-` as 'before'.",
        level: "basic",
        codeExample: "$ jobs\n[1]-  Running                 sleep 100 &\n[2]+  Stopped                 vim notes.txt"
    },
    {
        question: "How can you refer to a job whose command contains the word 'report'?",
        shortAnswer: "Use `%?report` as the job specifier.",
        explanation: "The `%?string` syntax matches any job whose command line contains the given substring. Useful when you don't remember the exact start.",
        hint: "Use the question mark pattern `%?` similar to substring search.",
        level: "intermediate",
        codeExample: "$ jobs\n[1]  Running                 generate_report.sh &\n[2]  Stopped                 less report.log\n$ fg %?report   # brings generate_report.sh to foreground"
    },
    {
        question: "What happens to background jobs when you close the terminal?",
        shortAnswer: "They receive a SIGHUP and are terminated unless they are disowned or run with nohup.",
        explanation: "When the shell exits, it sends hangup signal to all child jobs. To keep them alive, use `disown %jobID` or start with `nohup`.",
        hint: "Consider the word 'hangup' – that's HUP in SIGHUP.",
        level: "intermediate",
        codeExample: "$ long_running_task &\n$ disown %1\nNow the task survives terminal closure."
    },
    {
        question: "Which option shows only jobs that have changed status since last notification?",
        shortAnswer: "`jobs -n`",
        explanation: "The -n option filters output to jobs where the status has changed (e.g., from Running to Stopped or Terminated) since the shell last reported them.",
        hint: "n stands for 'new' or 'notified'.",
        level: "advanced",
        codeExample: "$ jobs -n\n(only shows recently changed jobs)"
    },
    {
        question: "How can you see only running jobs?",
        shortAnswer: "Use `jobs -r`",
        explanation: "The -r option restricts output to jobs that are currently running (not stopped, terminated, or done). Useful to quickly see what's still active.",
        hint: "r for 'running'.",
        level: "basic",
        codeExample: "$ jobs -r\n[1]  Running                 python data_crunch.py &\n[3]  Running                 tail -f log"
    },
    {
        question: "Why does `jobs` show nothing in a script even though background jobs were started?",
        shortAnswer: "Because job control is disabled in non-interactive shells (like scripts) by default.",
        explanation: "The `jobs` command only works when job control is enabled (usually in interactive terminals). In scripts, you should use `wait` or process management with PIDs.",
        hint: "Think about interactive vs non-interactive shell differences.",
        level: "advanced",
        codeExample: "#!/bin/bash\nsleep 10 &\njobs  # Will output nothing in a script"
    },
    {
        question: "What does `kill %2` do?",
        shortAnswer: "Sends SIGTERM (termination signal) to job number 2.",
        explanation: "When you use `kill` with a job ID, the shell translates it to the process group ID and sends the signal (default SIGTERM) to all processes in that job.",
        hint: "Same as `kill -15 %2`.",
        level: "basic",
        codeExample: "$ sleep 1000 &\n[1] 12345\n$ kill %1\n[1]+  Terminated              sleep 1000"
    },
    {
        question: "How do you bring a stopped job to the foreground and also run it in the background immediately?",
        shortAnswer: "Bring to foreground with `fg %jobID`, then suspend (Ctrl+Z) and `bg`. Or directly use `bg %jobID` if you want it running in background without bringing to foreground.",
        explanation: "`bg` resumes a stopped job in the background. It never brings it to the foreground.",
        hint: "bg = background resume, fg = foreground resume.",
        level: "intermediate",
        codeExample: "$ jobs\n[1]+  Stopped                 vim file.txt\n$ bg %1\n[1]+ vim file.txt &"
    },
    {
        question: "What does `disown %1` do?",
        shortAnswer: "Removes job 1 from the shell's job table so it won't receive SIGHUP when the shell exits.",
        explanation: "Disowning tells the shell to forget the job. The process continues running but is no longer considered a job. It becomes an orphan and is reparented to init (PID 1).",
        hint: "The opposite of 'own'. You are disowning the job.",
        level: "intermediate",
        codeExample: "$ long_task &\n$ disown %1\n$ exit   # long_task continues"
    },
    {
        question: "Can you use `jobs` in a pipeline?",
        shortAnswer: "Yes, but it will show jobs of the subshell, which are usually none. So `jobs | grep` is often useless.",
        explanation: "Each side of a pipeline runs in a subshell. The `jobs` command in that subshell sees only jobs started inside that subshell, not the parent shell's jobs.",
        hint: "Remember subshells have their own job tables.",
        level: "advanced",
        codeExample: "$ jobs | wc -l   # always 0 in a pipeline"
    },
    {
        question: "How do you get only the job IDs (numbers) from `jobs` output?",
        shortAnswer: "Use `jobs -p` to get PIDs, or parse `jobs` output with awk/sed. For job numbers, `jobs | cut -d'[' -f2 | cut -d']' -f1`.",
        explanation: "There's no direct option to list only job numbers. But you can use parameter expansion or external tools.",
        hint: "Job numbers appear inside brackets. Extract them.",
        level: "expert",
        codeExample: "$ jobs | sed -n 's/^\\[\([0-9]*\)\\].*/\\1/p'"
    },
    {
        question: "What signal does `kill %+` send?",
        shortAnswer: "SIGTERM to the current job (the one marked with +).",
        explanation: "The `%+` job specifier refers to the current job. `kill %+` is equivalent to `kill %%` or `kill` without arguments if no PID given? Actually, `kill` alone doesn't default to current job; you must specify `%+`.",
        hint: "`+` means current job.",
        level: "intermediate",
        codeExample: "$ jobs\n[1]-  Stopped    less log.txt\n[2]+  Stopped    vim config\n$ kill %+   # kills vim config"
    },
    {
        question: "How can you see jobs from all terminals?",
        shortAnswer: "You cannot with the `jobs` command. Use `ps` or `pstree` to see processes system-wide, but job control is per shell session.",
        explanation: "The `jobs` command only shows the child processes of the current shell. To see background processes from other terminals, use system monitoring tools like `ps aux`, `htop`, or `pstree`.",
        hint: "Jobs belong to a shell instance. Different terminals, different job tables.",
        level: "advanced",
        codeExample: "$ ps -o pid,stat,cmd -u $USER  # shows all your processes"
    },
    {
        question: "What does it mean when a job shows 'Done' in `jobs` output?",
        shortAnswer: "The job has completed successfully (exit code 0) and has been removed from the job table (unless you check very quickly).",
        explanation: "Jobs that finish normally may briefly appear as 'Done' before disappearing. By default, the shell removes them immediately. Use `set -o notify` to get immediate notifications.",
        hint: "Done = finished with success.",
        level: "basic",
        codeExample: "$ sleep 1 &\n[1] 12345\n$ jobs   # after 1 second, may show nothing or 'Done'"
    },
    {
        question: "How do you prevent a job from being listed in `jobs` after it finishes?",
        shortAnswer: "You cannot prevent it, but finished jobs are automatically removed from the list shortly after they complete.",
        explanation: "The shell automatically cleans up completed jobs to keep the job table tidy. If you want to keep a job, you can suspend it or keep it running.",
        hint: "Automatic cleanup is default behavior.",
        level: "basic",
        codeExample: "No code needed – it's automatic."
    },
    {
        question: "What is the difference between a background job and a daemon?",
        shortAnswer: "A background job is tied to a shell session; a daemon is a long-running process detached from any terminal.",
        explanation: "Daemons (like sshd, cron) are started by init/systemd and have no controlling terminal. Background jobs are started from a shell and will receive SIGHUP if the shell exits unless disowned.",
        hint: "Daemons survive terminal logout; background jobs generally don't.",
        level: "expert",
        codeExample: "$ myserver --daemon   # starts a daemon\n$ myserver &          # starts a background job"
    },
    {
        question: "Why does `jobs` sometimes show 'Exit' instead of 'Done'?",
        shortAnswer: "'Exit' indicates the job terminated with a non-zero exit status (it failed).",
        explanation: "When a job finishes with an error, the shell marks it as 'Exit' and may show the exit code. This helps debug why a background process failed.",
        hint: "Exit = non-zero return, Done = zero return.",
        level: "intermediate",
        codeExample: "$ false &\n[1] 12345\n$ jobs\n[1]+  Exit 1                  false"
    },
    {
        question: "How can you get a notification when a background job finishes?",
        shortAnswer: "Use the `wait` built-in with the job ID, or enable `set -b` (notify) which reports status changes immediately.",
        explanation: "`wait %jobID` blocks until that job completes, then you can act. Alternatively, `set -o notify` (or `set -b`) tells the shell to print job completion messages right away.",
        hint: "wait for synchronous notification, notify for asynchronous.",
        level: "advanced",
        codeExample: "$ long_task &\n$ wait %1 && echo 'Task finished!'"
    }
];

export default questions;