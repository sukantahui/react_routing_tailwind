// topic5_files/topic5_questions.js
const questions = [
  {
    question: "What does the `fg` command do?",
    shortAnswer: "It brings a background or suspended job to the foreground, attaching terminal input/output.",
    explanation: "The shell waits for the foreground job to finish or be suspended again. The job regains stdin and terminal signals.",
    hint: "Run `sleep 300 &`, then `fg` – the shell waits until sleep finishes.",
    level: "basic",
    codeExample: "sleep 100 &; fg"
  },
  {
    question: "How do you bring the most recent background job to foreground?",
    shortAnswer: "Just type `fg` without any argument.",
    explanation: "The job marked with `+` in `jobs` output becomes the current job and is brought to foreground.",
    hint: "`jobs` shows `[1]+` for the current job; `fg` brings it.",
    level: "basic",
    codeExample: "fg"
  },
  {
    question: "What happens to the shell when a job is foregrounded?",
    shortAnswer: "The shell blocks (waits) until that job finishes, is suspended, or is terminated.",
    explanation: "While the job is in foreground, you cannot run other commands in that shell until it completes or is backgrounded again.",
    hint: "Try `sleep 10 &` then `fg` – you cannot type new commands for 10 seconds.",
    level: "basic",
    codeExample: "sleep 5 &; fg; echo 'Done'"
  },
  {
    question: "How can I bring job number 2 to the foreground?",
    shortAnswer: "Use `fg %2`.",
    explanation: "Job numbers are assigned by the shell when jobs are started. Use `jobs` to see the numbers.",
    hint: "Start two jobs: `sleep 100 &` then `sleep 200 &`. `jobs` shows [1] and [2]. `fg %2` brings the second.",
    level: "basic",
    codeExample: "fg %2"
  },
  {
    question: "Can I bring a job to foreground if it is already in foreground?",
    shortAnswer: "No; `fg` only applies to background or suspended jobs.",
    explanation: "If a job is already running in foreground, `fg` does nothing (or prints an error).",
    hint: "In foreground, you already have control; use Ctrl+Z to suspend then `bg` or `fg` again.",
    level: "intermediate",
    codeExample: "sleep 100   # in foreground, then try fg"
  },
  {
    question: "What is the difference between `fg` and `bg`?",
    shortAnswer: "`fg` brings a job to foreground (shell blocked); `bg` resumes a suspended job in background (shell free).",
    explanation: "Both send SIGCONT, but `fg` attaches terminal control, `bg` does not.",
    hint: "Suspend a job with Ctrl+Z: `bg` continues it in background, `fg` brings it back to foreground.",
    level: "basic",
    codeExample: "sleep 30; ^Z; bg; fg"
  },
  {
    question: "How do I refer to a job using a string from its command line?",
    shortAnswer: "Use `fg %?string` or `fg %string` (if string is a prefix).",
    explanation: "For example, `fg %?sleep` brings any job whose command contains 'sleep'. `%vim` brings job with command starting with 'vim'.",
    hint: "`jobs` shows commands; `fg %?date` would foreground a job running `date`.",
    level: "advanced",
    codeExample: "sleep 500 &; fg %?sleep"
  },
  {
    question: "What does `fg %+` mean?",
    shortAnswer: "`%+` is the current job; same as `fg` alone.",
    explanation: "`%+` and `%%` both refer to the current job. `%-` refers to the previous job.",
    hint: "`jobs` output shows `[1]+` (current) and `[2]-` (previous).",
    level: "intermediate",
    codeExample: "fg %+"
  },
  {
    question: "Can I use `fg` in a script?",
    shortAnswer: "Yes, but it's rarely useful because scripts run without an interactive terminal, and `fg` would block.",
    explanation: "Scripts can use `fg` to bring a job foreground, but then the script halts until the job finishes. Usually `wait` is preferred.",
    hint: "In a script, `cmd &; fg` is equivalent to just `cmd` (since background and immediate foreground).",
    level: "expert",
    codeExample: "#!/bin/bash\nsleep 10 &\nfg\nwait"
  },
  {
    question: "What happens if I foreground a job that was suspended using `kill -STOP`?",
    shortAnswer: "It continues in foreground (receives SIGCONT and attaches to terminal).",
    explanation: "`fg` sends SIGCONT; the process wakes up and runs in foreground.",
    hint: "Background job: `kill -STOP %1; fg %1` resumes it in foreground.",
    level: "advanced",
    codeExample: "sleep 300 &; kill -STOP %1; fg"
  },
  {
    question: "How do I know which job will be foregrounded when I type `fg` without arguments?",
    shortAnswer: "The job marked with `+` in `jobs` output.",
    explanation: "`jobs` shows the current job with a plus sign. That’s the one `fg` (and `bg` without arguments) acts on.",
    hint: "Run `jobs` before `fg` to see which has `+`.",
    level: "basic",
    codeExample: "jobs; fg"
  },
  {
    question: "Can I foreground a pipeline (e.g., `cmd1 | cmd2`)?",
    shortAnswer: "Yes, the entire pipeline is one job; `fg` brings the whole pipeline to foreground.",
    explanation: "The shell treats a pipeline as a single job. Foregrounding it attaches all processes in the pipeline to the terminal.",
    hint: "`yes | head -1000 | wc -l &` then `fg` brings the entire pipeline, and it will complete.",
    level: "advanced",
    codeExample: "yes | head -10 &; fg"
  },
  {
    question: "What happens to output when a job is brought to foreground?",
    shortAnswer: "Its stdout and stderr become attached to the terminal (if not redirected).",
    explanation: "If the job was writing to a file, foregrounding does not change that. Only if it was not redirected will output appear on screen.",
    hint: "Background job writing to terminal will interleave; foregrounding makes it sole writer.",
    level: "intermediate",
    codeExample: "while true; do date; sleep 1; done &; fg   # now terminal fills with dates"
  },
  {
    question: "How do I bring a job to foreground after I have logged out and logged back in?",
    shortAnswer: "You cannot – jobs are tied to the shell session; after logout they are terminated or reparented.",
    explanation: "Use `nohup` or `disown` to make processes survive logout, but you cannot `fg` them into a new shell – they are no longer jobs of that shell.",
    hint: "To regain control, use `reptyr` (advanced) or start a terminal multiplexer like `tmux`.",
    level: "expert",
    codeExample: "nohup longtask &   # cannot fg later from different shell"
  },
  {
    question: "What does `fg %-` do?",
    shortAnswer: "Brings the previous job (marked with `-` in `jobs`) to foreground.",
    explanation: "The previous job is the one before the current job in the job table. Useful when you have multiple jobs.",
    hint: "Start three background jobs; `jobs` shows `[1]`, `[2]`, `[3]+`. `fg %-` brings job 2.",
    level: "intermediate",
    codeExample: "sleep 100 &; sleep 200 &; fg %-"
  },
  {
    question: "Why would I use `fg` instead of just running the command in foreground initially?",
    shortAnswer: "Because you might have started it in background and later need to interact with it (e.g., supply input).",
    explanation: "For example, you start a debugger in background, then bring it to foreground when you want to type commands.",
    hint: "`gdb prog &` then later `fg` to interact.",
    level: "intermediate",
    codeExample: "python -i script.py &; fg   # now you can type Python commands"
  },
  {
    question: "If I bring a job to foreground and then press Ctrl+Z, where does it go?",
    shortAnswer: "It becomes suspended (stopped) and remains in the job list.",
    explanation: "Ctrl+Z sends SIGTSTP to the foreground job, stopping it. The shell returns prompt and the job shows 'Stopped'.",
    hint: "`fg` then Ctrl+Z then `bg` – you can cycle through states.",
    level: "basic",
    codeExample: "sleep 300; ^Z; bg; fg; ^Z"
  },
  {
    question: "Can I foreground a job from a different shell session?",
    shortAnswer: "No, job control is per shell session. But you can send signals across sessions using `kill`.",
    explanation: "`fg` only works on jobs belonging to the current shell. To interact with a process from another shell, you'd need to use `kill -CONT` and maybe `reptyr`.",
    hint: "Use `tmux` or `screen` to detach/attach sessions, not plain `fg`.",
    level: "expert",
    codeExample: "kill -CONT 1234   # resumes but not attached to terminal"
  },
  {
    question: "What is the difference between `fg %1` and `wait %1`?",
    shortAnswer: "`fg` brings the job to foreground and attaches terminal; `wait` only waits for completion without changing terminal ownership.",
    explanation: "`wait` can be used in scripts to block until a background job finishes, but does not give it the terminal.",
    hint: "In a script, `cmd &; wait` is like `cmd` (runs foreground) but with possible parallelism.",
    level: "advanced",
    codeExample: "sleep 5 &; wait %1; echo done"
  },
  {
    question: "What happens if I foreground a job that has been terminated?",
    shortAnswer: "You get an error: 'fg: job has terminated'.",
    explanation: "The shell job table may still have an entry for a terminated job until you run `jobs` or start a new prompt.",
    hint: "Run `jobs` to clean up terminated job entries.",
    level: "basic",
    codeExample: "sleep 1 &; sleep 2; fg   # job already finished"
  }
];

export default questions;