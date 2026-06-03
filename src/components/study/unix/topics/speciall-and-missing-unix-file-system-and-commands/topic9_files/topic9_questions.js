// topic9_questions.js - 30 questions about tee command

const questions = [
  {
    question: "What is the purpose of the `tee` command?",
    shortAnswer: "Reads from standard input and writes to standard output and to one or more files.",
    explanation: "Named after the T‑junction in plumbing, `tee` splits a single stream into multiple outputs.",
    hint: "Think of a pipe with a side branch to a file.",
    level: "basic",
    codeExample: "ls -l | tee listing.txt"
  },
  {
    question: "How do you make `tee` append to a file instead of overwriting?",
    shortAnswer: "Use the `-a` (or `--append`) option.",
    explanation: "Without `-a`, `tee` truncates the file before writing. With `-a`, it writes at the end.",
    hint: "`-a` stands for 'append'.",
    level: "basic",
    codeExample: "echo 'new line' | tee -a log.txt"
  },
  {
    question: "Why does `sudo echo 'text' > /root/file` fail, but `echo 'text' | sudo tee /root/file` work?",
    shortAnswer: "Redirection (`>`) is performed by the shell before sudo, so the shell needs write access. `tee` runs as root and can write the file.",
    explanation: "`sudo` only elevates the command, not the shell's redirection. `tee` solves this elegantly.",
    hint: "Use `sudo tee` for writing to root-owned files.",
    level: "intermediate",
    codeExample: "echo 'nameserver 8.8.8.8' | sudo tee /etc/resolv.conf"
  },
  {
    question: "How can you use `tee` to capture both stdout and stderr of a command?",
    shortAnswer: "Merge stderr into stdout first: `command 2>&1 | tee output.log`",
    explanation: "`tee` only reads from stdin. By redirecting stderr to stdout, both streams go through the pipe.",
    hint: "`2>&1` must come before the pipe.",
    level: "intermediate",
    codeExample: "make 2>&1 | tee build.log"
  },
  {
    question: "Can `tee` write to more than one file at a time?",
    shortAnswer: "Yes: `command | tee file1 file2 file3`",
    explanation: "All specified files receive the entire stream. Useful for duplicating logs.",
    hint: "Useful for backup copies or for multiple consumers.",
    level: "basic",
    codeExample: "ps aux | tee process1.txt process2.txt"
  },
  {
    question: "What does the `-i` option do in `tee`?",
    shortAnswer: "Ignores interrupt signals (SIGINT), allowing tee to continue writing even if the pipe is broken.",
    explanation: "May be useful in scripts where you don't want tee to exit prematurely.",
    hint: "`-i` stands for 'ignore interrupts'.",
    level: "advanced",
    codeExample: "long_command | tee -i output.log"
  },
  {
    question: "How do you suppress the terminal output while still writing to a file with `tee`?",
    shortAnswer: "`command | tee file > /dev/null` (stdout goes to /dev/null after tee).",
    explanation: "`tee` writes to both stdout and file; redirecting stdout to /dev/null hides the terminal copy.",
    hint: "Useful for silent logging.",
    level: "intermediate",
    codeExample: "backup_script | tee backup.log > /dev/null"
  },
  {
    question: "What is the exit code of `tee` if one of the output files cannot be opened?",
    shortAnswer: "Non-zero, but tee continues to write to other files and stdout.",
    explanation: "`tee` returns failure if any file could not be opened, but it does not stop.",
    hint: "Check `$?` after the pipeline; also use `PIPESTATUS` in bash.",
    level: "advanced",
    codeExample: "echo data | tee /dev/full file.txt 2>/dev/null; echo $?"
  },
  {
    question: "How can you use `tee` to split a stream between two commands (not files)?",
    shortAnswer: "Use process substitution: `command | tee >(cmd1) >(cmd2) >/dev/null`",
    explanation: "Process substitution creates named pipes; tee writes to them as if they were files.",
    hint: "Requires bash or zsh.",
    level: "expert",
    codeExample: "cat data.txt | tee >(grep ERROR > errors.log) >(wc -l > count.txt) >/dev/null"
  },
  {
    question: "Why is `tee` called `tee`?",
    shortAnswer: "Named after the T‑shaped pipe fitting in plumbing that splits a single flow into two.",
    explanation: "The command's behavior resembles a T‑junction: one input, two outputs (stdout and a file).",
    hint: "Think of the letter T.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Is `tee` a POSIX command?",
    shortAnswer: "Yes, `tee` is part of POSIX and available on all Unix-like systems.",
    explanation: "It is defined in the POSIX standard and exists on Linux, macOS, BSD, Solaris, etc.",
    hint: "Use it in portable shell scripts without worry.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can `tee` be used to write to a file with spaces in the name?",
    shortAnswer: "Yes, quote the filename: `echo hi | tee 'my file.txt'`",
    explanation: "Like any command, spaces require quoting or escaping.",
    hint: "Use double quotes if variable expansion needed: `tee \"$file\"`",
    level: "basic",
    codeExample: "echo hi | tee 'hello world.txt'"
  },
  {
    question: "What is the difference between `tee file` and `> file`?",
    shortAnswer: "`tee file` writes to both stdout and the file; `> file` writes only to the file (overwrites).",
    explanation: "`tee` allows you to see the output while saving it; `>` alone does not show anything.",
    hint: "`tee` is like a 'T' that splits the stream.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you use `tee` with `set -o pipefail` to catch failures?",
    shortAnswer: "`set -o pipefail` makes the pipeline return the last non-zero exit status; `tee`'s exit code may cause failure if a file cannot be written.",
    explanation: "Useful for scripts that must ensure logging succeeded.",
    hint: "Combine with `set -e` for strict error handling.",
    level: "expert",
    codeExample: "set -o pipefail; echo data | tee /root/file || echo 'tee failed'"
  },
  {
    question: "What does `tee --version` output?",
    shortAnswer: "Shows the version of tee (typically from GNU coreutils).",
    explanation: "Helpful for debugging if features like `-a` or `-i` are available.",
    hint: "`tee --help` shows usage.",
    level: "basic",
    codeExample: "tee --version"
  },
  {
    question: "Can `tee` read from a file instead of stdin?",
    shortAnswer: "No, `tee` only reads from stdin. Use input redirection: `tee out.txt < input.txt`.",
    explanation: "This reads from input.txt and writes to out.txt and stdout.",
    hint: "`tee` without stdin simply waits.",
    level: "intermediate",
    codeExample: "tee output.txt < data.txt"
  },
  {
    question: "How can you use `tee` to write to a file and also to a network socket?",
    shortAnswer: "Use process substitution: `cmd | tee >(nc host port) > file`",
    explanation: "`>(command)` creates a named pipe that execs the command. Tee writes to it.",
    hint: "Advanced technique for real‑time streaming.",
    level: "expert",
    codeExample: "logger | tee >(nc logserver 514) /var/log/local.log"
  },
  {
    question: "What happens if you specify the same file twice to `tee`?",
    shortAnswer: "The file is opened twice; data is written twice (but both writes go to the same file).",
    explanation: "May cause interleaving writes but ultimately same content. Usually not useful.",
    hint: "Avoid duplicate arguments.",
    level: "advanced",
    codeExample: "echo hi | tee same.txt same.txt"
  },
  {
    question: "How does `tee` interact with pipes if a command in the pipeline fails?",
    shortAnswer: "`tee` continues to run until stdin closes. It does not notice failure of subsequent commands unless SIGPIPE is received.",
    explanation: "If a later command exits, `tee` may get SIGPIPE when writing to stdout (if stdout is piped).",
    hint: "Use `set -o pipefail` to propagate errors.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the purpose of `tee -a` in cron jobs?",
    shortAnswer: "Appends logs instead of overwriting, preserving history across cron runs.",
    explanation: "Without `-a`, each cron run would clear the log file.",
    hint: "Always use `-a` for cron log accumulation.",
    level: "intermediate",
    codeExample: "0 * * * * backup.sh 2>&1 | tee -a /var/log/backup.log"
  },
  {
    question: "How do you write to a file with `tee` and also pipe to a second command without losing the terminal view?",
    shortAnswer: "`command | tee file.txt | second_command` – tee writes to file and stdout, and stdout goes to second_command.",
    explanation: "The second command receives the same stream that also goes to the terminal (unless second_command suppresses it).",
    hint: "Use `tee` as a branch point.",
    level: "advanced",
    codeExample: "cat data.csv | tee debug.csv | wc -l"
  },
  {
    question: "Can `tee` be used to capture output from a process substitution?",
    shortAnswer: "Yes, but you need to redirect appropriately. Example: `tee out.txt <(command)` is wrong; instead `command | tee out.txt`.",
    explanation: "`tee` expects stdin, so use a pipe from the command.",
    hint: "Process substitution is for providing file arguments, not for stdin.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What does `tee /dev/stderr` do?",
    shortAnswer: "Writes stdin to both stdout and stderr (because /dev/stderr is a symlink to stderr).",
    explanation: "Useful for duplicating output to both standard streams.",
    hint: "`/dev/stderr` is available on Linux.",
    level: "intermediate",
    codeExample: "echo 'error' | tee /dev/stderr | grep error"
  },
  {
    question: "How can you use `tee` to write to a file and also count the lines without saving the entire output?",
    shortAnswer: "`command | tee >(wc -l > count.txt) > file.txt` (process substitution).",
    explanation: "The `>` is process substitution; `wc -l` runs in parallel and receives the stream.",
    hint: "Both outputs happen simultaneously.",
    level: "expert",
    codeExample: "ls -R / | tee >(wc -l > linecount.txt) > fulllisting.txt"
  },
  {
    question: "Is there a way to make `tee` flush output immediately (line buffered)?",
    shortAnswer: "Use `stdbuf -oL tee file` or `script` or `unbuffer` to change buffering.",
    explanation: "By default, `tee` uses block buffering when writing to files, which may delay output. `stdbuf` can override.",
    hint: "`stdbuf -oL` sets line buffering for stdout.",
    level: "expert",
    codeExample: "stdbuf -oL command | tee log.txt"
  },
  {
    question: "What is the difference between `command | tee file` and `command > file`?",
    shortAnswer: "`tee` also outputs to the terminal; `>` only to file.",
    explanation: "`tee` is interactive-friendly; `>` is for silent capture.",
    hint: "Use `tee` when you want to watch progress.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How can you verify that `tee` actually wrote to disk (not just cached)?",
    shortAnswer: "Invoke `sync` after `tee`, or use `tee` with `fsync`? `tee` does not guarantee sync; you can call `sync` manually.",
    explanation: "For critical data, consider `dd` with `conv=fsync` or write to a filesystem mounted with `sync`.",
    hint: "`sync` flushes all filesystem buffers.",
    level: "expert",
    codeExample: "command | tee file.txt; sync"
  },
  {
    question: "Can `tee` be used to write to a file that is a named pipe (FIFO)?",
    shortAnswer: "Yes, if the other end of the pipe is open, `tee` can write to it like a regular file.",
    explanation: "Writing to a FIFO blocks until a reader attaches. This can be used to coordinate processes.",
    hint: "Use with caution to avoid deadlock.",
    level: "expert",
    codeExample: "mkfifo mypipe; tee mypipe < data.txt & cat mypipe"
  },
  {
    question: "What is the difference between `tee -a` and appending via `>>` after `tee`?",
    shortAnswer: "`tee -a` is built‑in; `>>` after `tee` doesn't work because `tee` writes to files directly, not through shell redirection.",
    explanation: "You cannot append `tee`'s output using `>>` because `tee` writes to the file itself. Use `-a` or pipe to `cat >> file`.",
    hint: "`tee -a` is the correct way.",
    level: "intermediate",
    codeExample: "echo text | tee -a file   # correct"
  },
  {
    question: "How can you use `tee` to create a log file with timestamps on each line?",
    shortAnswer: "Pipe through `ts` (from moreutils) before `tee`: `command | ts | tee logfile`.",
    explanation: "`ts` prepends timestamps. `tee` then writes the timestamped lines.",
    hint: "Install `moreutils` if `ts` is not available.",
    level: "advanced",
    codeExample: "make 2>&1 | ts '[%Y-%m-%d %H:%M:%S]' | tee build.log"
  }
];

export default questions;