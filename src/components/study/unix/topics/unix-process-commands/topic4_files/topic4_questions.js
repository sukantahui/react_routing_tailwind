// topic4_files/topic4_questions.js
const questions = [
  {
    question: "What does the `bg` command do?",
    shortAnswer: "Resumes a suspended (stopped) job and runs it in the background.",
    explanation: "Suspended jobs are paused (by Ctrl+Z or SIGTSTP). `bg` sends SIGCONT to the process group and detaches it from terminal input, but output may still appear.",
    hint: "Try `sleep 30`, then Ctrl+Z, then `bg` – the sleep continues in background.",
    level: "basic",
    codeExample: "sleep 30\n^Z\nbg"
  },
  {
    question: "How do you suspend a foreground job?",
    shortAnswer: "Press Ctrl+Z (sends SIGTSTP).",
    explanation: "The shell stops the foreground process group and returns control to the shell. The job appears as 'Stopped' in `jobs`.",
    hint: "Try `yes > /dev/null` then Ctrl+Z – it stops producing output.",
    level: "basic",
    codeExample: "yes > /dev/null\n^Z"
  },
  {
    question: "How do you see the list of jobs that can be backgrounded?",
    shortAnswer: "Use the `jobs` command.",
    explanation: "`jobs` shows job numbers, state (Running, Stopped), and command. Jobs marked '+' are the current job.",
    hint: "`jobs -l` also shows PIDs.",
    level: "basic",
    codeExample: "jobs"
  },
  {
    question: "What happens if you run `bg` without any argument?",
    shortAnswer: "It backgrounds the most recent stopped job (the one marked with `+`).",
    explanation: "If no job is stopped, `bg` does nothing (or prints an error).",
    hint: "Suspended a job? `bg` alone works. Suspended two? `jobs` shows which has '+'.",
    level: "intermediate",
    codeExample: "sleep 30\n^Z\nbg"
  },
  {
    question: "Can you background a job that is already running in foreground?",
    shortAnswer: "No – you must suspend it first (Ctrl+Z) then `bg`.",
    explanation: "`bg` only acts on stopped jobs. To background a running foreground job, suspend it first.",
    hint: "Alternative: start with `&` from the beginning.",
    level: "basic",
    codeExample: "yes > /dev/null  # running, press Ctrl+Z then bg"
  },
  {
    question: "What signal does `bg` send to the process?",
    shortAnswer: "SIGCONT (continue).",
    explanation: "SIGCONT resumes a stopped process. It is the same signal sent by `fg` or `kill -CONT`.",
    hint: "`kill -CONT PID` is the low‑level equivalent of `bg` for a specific PID.",
    level: "intermediate",
    codeExample: "kill -CONT 1234"
  },
  {
    question: "What is the difference between `bg` and `fg`?",
    shortAnswer: "`bg` resumes a job in the background (shell not blocked); `fg` brings it to the foreground (shell blocked).",
    explanation: "Both send SIGCONT. `fg` attaches the job to the terminal's input and waits for it; `bg` detaches input but allows output.",
    hint: "`bg` returns the prompt immediately; `fg` waits until the job finishes or is suspended.",
    level: "basic",
    codeExample: "sleep 30; ^Z; bg  # prompt returns; fg # waits"
  },
  {
    question: "Can I background a job that was started with `&` (already background)?",
    shortAnswer: "No, `bg` only works on stopped jobs. A background job is already running.",
    explanation: "If a job is already in background (`Running` state), `bg` does nothing or errors.",
    hint: "Check state with `jobs`. If it says `Running`, you don't need `bg`.",
    level: "intermediate",
    codeExample: "sleep 30 &   # already background, bg does nothing"
  },
  {
    question: "Will a backgrounded job still output to the terminal?",
    shortAnswer: "Yes, unless you redirect its output. It will write to stdout/stderr (terminal).",
    explanation: "Background jobs are not disconnected from stdout/err. Use redirection to avoid clutter: `cmd > log 2>&1`.",
    hint: "Run `while true; do date; sleep 1; done`, suspend and `bg` – you'll see dates interleaved with prompt.",
    level: "intermediate",
    codeExample: "some_long_task > /dev/null 2>&1 &"
  },
  {
    question: "How do you bring a background job back to the foreground?",
    shortAnswer: "Use `fg` with the job number or `fg` alone for current job.",
    explanation: "`fg %1` brings job #1 to foreground. If a background job is running, it will block the shell.",
    hint: "`fg` without arguments brings the most recent job (either background or stopped).",
    level: "basic",
    codeExample: "fg %2"
  },
  {
    question: "What is a job number and how do you reference it with `bg`?",
    shortAnswer: "A job number is an identifier assigned by the shell to each pipeline, shown in `jobs`. Use `%n` to refer to it.",
    explanation: "Job numbers start from 1. `bg %1` backgrounds job #1. `%` alone refers to the current job.",
    hint: "`jobs` shows `[1]`, `[2]` – those are job numbers.",
    level: "intermediate",
    codeExample: "bg %1"
  },
  {
    question: "Why would I use `bg` instead of just starting a command with `&`?",
    shortAnswer: "When you start a command in foreground and later decide you want the terminal back without restarting it.",
    explanation: "Useful if you forgot the `&` or if you want to pause a long task, do something else, then background it.",
    hint: "Example: running a database import, realising it takes hours – suspend then `bg`.",
    level: "intermediate",
    codeExample: "pg_restore ...   # too long, ^Z, bg"
  },
  {
    question: "Can I background a suspended pipeline (e.g., `cmd1 | cmd2`)?",
    shortAnswer: "Yes, the whole pipeline is a single job. `bg` resumes the entire pipeline.",
    explanation: "A job can consist of multiple processes connected by pipes. Suspending stops all; `bg` continues all in background.",
    hint: "`cat /dev/zero | gzip > /dev/null &` is a background pipeline from start; but if suspended, `bg` works.",
    level: "advanced",
    codeExample: "yes | head -1000 | wc -l; ^Z; bg"
  },
  {
    question: "What happens to a backgrounded job when I log out?",
    shortAnswer: "It receives SIGHUP and typically terminates, unless you `disown` it or use `nohup`.",
    explanation: "Background jobs are still children of the shell. When the shell exits, it sends SIGHUP to all children. Use `disown` to remove from shell's job table.",
    hint: "After `bg`, run `disown %1` to make it survive logout.",
    level: "advanced",
    codeExample: "sleep 100; ^Z; bg; disown"
  },
  {
    question: "How do I check if a job is actually running in background after `bg`?",
    shortAnswer: "Use `jobs` (shows state) or `ps` to see the PID.",
    explanation: "`bg` may fail silently if the process cannot be continued (e.g., interactive program that ignores SIGCONT).",
    hint: "`jobs -l` shows PID and state – 'Running' means success.",
    level: "intermediate",
    codeExample: "jobs -l"
  },
  {
    question: "What is the difference between suspending with Ctrl+Z and using `kill -STOP`?",
    shortAnswer: "Both send SIGTSTP (or SIGSTOP). Ctrl+Z works on foreground job; `kill -STOP` can target any process.",
    explanation: "`kill -STOP PID` works on background or even unrelated processes (if you own them).",
    hint: "`kill -CONT PID` is the equivalent of `bg` for a specific PID.",
    level: "advanced",
    codeExample: "kill -STOP 1234  # pause, then kill -CONT 1234 to resume"
  },
  {
    question: "Can I use `bg` inside a shell script?",
    shortAnswer: "Yes, but it's rarely needed because scripts can use `&` directly.",
    explanation: "`bg` works in scripts as well, but `cmd &` is simpler. However, you might use `bg` after a `kill -STOP` of a background job.",
    hint: "Scripting: start a process, read its PID, pause/continue it with `kill`.",
    level: "expert",
    codeExample: "sleep 30 &\nPID=$!\nkill -STOP $PID\nbg %1\nwait"
  },
  {
    question: "Why does `top` not update when backgrounded?",
    shortAnswer: "`top` reads terminal input to know when to refresh; in background it cannot read terminal, so it freezes.",
    explanation: "Many interactive programs (like `vim`, `less`) will not work correctly in background because they need terminal input. `bg` should only be used for non‑interactive tasks.",
    hint: "If you background `top`, you can't control it; you have to `fg` to interact again.",
    level: "intermediate",
    codeExample: "top; ^Z; bg   # top stops updating"
  },
  {
    question: "What does `bg %%` mean?",
    shortAnswer: "`%%` refers to the current job; same as `bg` without argument.",
    explanation: "`%+` also means current job. `bg %+` is same as `bg`. `bg %-` backgrounds the previous job.",
    hint: "`jobs` shows `+` for current, `-` for previous.",
    level: "advanced",
    codeExample: "bg %+   # backgrounds current job"
  },
  {
    question: "How can I prevent a backgrounded job from being terminated when I exit the terminal?",
    shortAnswer: "Use `disown <job>` or start with `nohup`.",
    explanation: "`disown` removes the job from the shell's job table, so SIGHUP is not sent on exit. `nohup` also redirects output and ignores SIGHUP from the start.",
    hint: "After `bg %1`, run `disown %1` to make it independent.",
    level: "advanced",
    codeExample: "long_task; ^Z; bg; disown"
  }
];

export default questions;