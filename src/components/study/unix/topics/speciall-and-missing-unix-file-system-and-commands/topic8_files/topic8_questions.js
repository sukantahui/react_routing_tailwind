// topic8_questions.js - 30 questions about redirection operators > and >>

const questions = [
  {
    question: "What does the `>` operator do?",
    shortAnswer: "Redirects standard output (stdout) to a file, overwriting the file if it exists.",
    explanation: "If the file does not exist, it is created. If it exists, its contents are replaced (truncated).",
    hint: "Think of it as saving output to a file, erasing previous content.",
    level: "basic",
    codeExample: "echo hello > greeting.txt"
  },
  {
    question: "What is the difference between `>` and `>>`?",
    shortAnswer: "`>` overwrites; `>>` appends (adds to the end, preserving existing content).",
    explanation: "`>>` is safer for logs because it does not erase previous entries.",
    hint: "Double `>` means double the content, not replace.",
    level: "basic",
    codeExample: "echo line1 > file; echo line2 >> file"
  },
  {
    question: "How do you redirect only error messages (stderr) to a file?",
    shortAnswer: "`command 2> error.log` (overwrite) or `command 2>> error.log` (append).",
    explanation: "File descriptor 2 represents stderr. The number must be immediately before `>` without space (in most shells).",
    hint: "`2` stands for stderr; `1` is stdout (default).",
    level: "basic",
    codeExample: "ls nonexistent 2> err.txt"
  },
  {
    question: "How do you redirect both stdout and stderr to the same file?",
    shortAnswer: "`command > file 2>&1` (POSIX) or `command &> file` (bash).",
    explanation: "Order matters: `2>&1` must come after `>` to capture stderr into the redirected stdout. `&>` is a bash shortcut.",
    hint: "Think of '2>&1' as 'send stderr to wherever stdout is going'.",
    level: "intermediate",
    codeExample: "find / -name 'foo' > all.txt 2>&1"
  },
  {
    question: "What is wrong with `command 2>&1 > file`?",
    shortAnswer: "It redirects stderr to the current stdout (terminal), then stdout to file – stderr is not captured.",
    explanation: "The order is evaluated left to right. First `2>&1` duplicates stdout (still terminal), then `> file` redirects stdout only.",
    hint: "Always put `2>&1` after the stdout redirection.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What does `2> /dev/null` do?",
    shortAnswer: "Discards all error messages by sending stderr to the null device.",
    explanation: "`/dev/null` discards any data written to it. Useful for silencing expected errors.",
    hint: "Often used in cron jobs or searches that might hit permission errors.",
    level: "basic",
    codeExample: "grep -r 'secret' /etc 2>/dev/null"
  },
  {
    question: "How do you redirect output of multiple commands to the same file without clearing between?",
    shortAnswer: "Use `>>` for each command, or run them in a subshell with `(command1; command2) >> file`.",
    explanation: "Appending avoids overwriting. Subshell groups output before appending.",
    hint: "`>>` is your friend for log accumulation.",
    level: "intermediate",
    codeExample: "(date; uptime) >> system_status.log"
  },
  {
    question: "What is the purpose of `1>`?",
    shortAnswer: "Explicitly redirects stdout (same as `>`). Usually omitted because `>` defaults to stdout.",
    explanation: "It can be used for clarity: `command 1> out.txt 2> err.txt`.",
    hint: "File descriptor 1 is stdout.",
    level: "basic",
    codeExample: "ls 1> stdout.txt"
  },
  {
    question: "How do you redirect a specific file descriptor (e.g., 3) to a file?",
    shortAnswer: "`exec 3> file.txt` then `command >&3`. Close with `exec 3>&-`.",
    explanation: "You can open custom file descriptors for advanced redirection.",
    hint: "Not commonly needed but powerful for scripts.",
    level: "expert",
    codeExample: "exec 3> custom.log; echo 'log' >&3; exec 3>&-"
  },
  {
    question: "What does `&>` do in bash?",
    shortAnswer: "Redirects both stdout and stderr to a file (overwrite). `&>>` appends.",
    explanation: "Bash extension; not POSIX. Equivalent to `> file 2>&1`.",
    hint: "Use POSIX form for portability across shells.",
    level: "intermediate",
    codeExample: "my_script &> output.log"
  },
  {
    question: "How can you prevent accidental overwrites with `>`?",
    shortAnswer: "Use `set -o noclobber` (or `set -C`) to disallow overwriting existing files.",
    explanation: "When noclobber is set, `>` fails if file exists. Override with `>|`.",
    hint: "Add `set -o noclobber` to your `.bashrc` for safety.",
    level: "advanced",
    codeExample: "set -o noclobber; echo text > existing.txt  # fails"
  },
  {
    question: "What does `>|` do?",
    shortAnswer: "Force overwrite even when `noclobber` is set.",
    explanation: "Useful when you know you want to replace the file despite the safety option.",
    hint: "Only available when `noclobber` is active; otherwise same as `>`.",
    level: "advanced",
    codeExample: "set -o noclobber; echo force >| file"
  },
  {
    question: "How do you redirect stdout and stderr to separate files?",
    shortAnswer: "`command > stdout.log 2> stderr.log`",
    explanation: "Each stream goes to its own file. This is common for logging where errors are handled differently.",
    hint: "You can then process each stream independently.",
    level: "intermediate",
    codeExample: "make > build.log 2> errors.log"
  },
  {
    question: "What is the difference between `2>&1` and `2>&1`? (trick question about spacing)",
    shortAnswer: "No difference; spacing does not matter. The key is the order relative to `>`.",
    explanation: "`2>&1` means 'redirect file descriptor 2 to wherever file descriptor 1 currently points'. Space before or after `>&` is ignored.",
    hint: "But `2>&1` must not have spaces inside the token.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How can you redirect stderr to stdout and also to a file (duplicate)?",
    shortAnswer: "Use `command > file 2>&1` (both to file) or `command 2>&1 | tee file` (both to file and terminal).",
    explanation: "`tee` reads stdin and writes to both stdout and a file.",
    hint: "`tee -a` appends to file.",
    level: "advanced",
    codeExample: "my_script 2>&1 | tee -a log.txt"
  },
  {
    question: "What is the effect of `> file` without a command?",
    shortAnswer: "Creates an empty file (or truncates an existing file to zero length).",
    explanation: "This is a common idiom to clear a file or ensure it exists.",
    hint: "Equivalent to `: > file` or `true > file`.",
    level: "intermediate",
    codeExample: "> empty.txt"
  },
  {
    question: "How do you redirect only stdout to a file and let stderr go to terminal?",
    shortAnswer: "`command > file` (stderr remains unaffected, goes to terminal).",
    explanation: "Default redirection only affects stdout; stderr is unchanged.",
    hint: "This is the default behavior of `>`.",
    level: "basic",
    codeExample: "ls /existing /nonexistent > out.txt"
  },
  {
    question: "What does `&>file` do in scripts that run under `sh` (not bash)?",
    shortAnswer: "It may cause a syntax error because `&>` is not POSIX. Use `> file 2>&1` for portability.",
    explanation: "`sh` on many systems is a POSIX shell (dash, busybox) that does not recognise `&>`. Always prefer the POSIX form for scripts that need to run on any Unix.",
    hint: "Check shebang: if `#!/bin/bash`, `&>` is fine; if `#!/bin/sh`, avoid it.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you redirect output to a file that includes spaces in its name?",
    shortAnswer: "Quote the filename: `command > 'my file.txt'` or escape: `command > my\\ file.txt`.",
    explanation: "Without quoting, the shell splits the argument, causing errors.",
    hint: "Use double quotes to allow variable expansion: `command > \"$filename\"`.",
    level: "basic",
    codeExample: "echo hello > 'hello world.txt'"
  },
  {
    question: "What happens to already open file descriptors when you redirect?",
    shortAnswer: "The shell opens the new file and replaces the file descriptor for the command (or for the shell if using `exec`).",
    explanation: "For a simple command, redirection lasts only for that command. For `exec`, it affects the shell itself.",
    hint: "`exec > file` redirects all subsequent output of the script to `file`.",
    level: "advanced",
    codeExample: "exec 2> error.log; ls /nonexistent"
  },
  {
    question: "How can you redirect stdout to a file and also see it on terminal?",
    shortAnswer: "Use `tee`: `command | tee file` (overwrites) or `command | tee -a file` (appends).",
    explanation: "`tee` reads from stdin and writes to both stdout and the specified file.",
    hint: "Works with pipelines: `ls -l | tee listing.txt | grep '^d'`",
    level: "intermediate",
    codeExample: "echo 'Hello' | tee hello.txt"
  },
  {
    question: "What is the purpose of `1>&2`?",
    shortAnswer: "Redirects stdout to stderr (send normal output to error stream).",
    explanation: "Useful for printing error messages without mixing with normal output.",
    hint: "Common in scripts to output warnings: `echo 'Warning' 1>&2`.",
    level: "intermediate",
    codeExample: "echo 'Error: file not found' 1>&2"
  },
  {
    question: "What does `<<` (here-document) do? Is it related to `>`?",
    shortAnswer: "`<<` is a different redirection: it reads input from the script until a delimiter. It redirects stdin, not stdout.",
    explanation: "`<<` is used for multi-line strings. Not directly related to `>` and `>>`.",
    hint: "Example: `cat << EOF ... EOF`",
    level: "advanced",
    codeExample: "cat << END > output.txt\nline1\nline2\nEND"
  },
  {
    question: "How do you redirect both stdout and stderr to different files and also show errors on terminal?",
    shortAnswer: "`command > out 2> err; cat err >&2` or use `tee` with process substitution.",
    explanation: "Complicated; usually you either capture both or send both to terminal. To see errors on terminal while also logging, use `2>&1 | tee -a log`.",
    hint: "`command 2> >(tee error.log)` in bash.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between `> file` and `| tee file`?",
    shortAnswer: "`>` only writes to file; `tee` writes to both file and stdout.",
    explanation: "`tee` is useful when you want to see the output while saving it.",
    hint: "`tee -a` appends, similar to `>>`.",
    level: "basic",
    codeExample: "echo 'data' | tee file.txt"
  },
  {
    question: "How do you redirect stderr to a file but also keep it on terminal?",
    shortAnswer: "`command 2> >(tee error.log)` in bash (process substitution).",
    explanation: "`>(command)` creates a file-like descriptor that writes to the command. This is advanced.",
    hint: "Or use `command 2>&1 | tee error.log` (stderr merged with stdout, but loses distinction).",
    level: "expert",
    codeExample: "find / 2> >(tee errors.txt)"
  },
  {
    question: "Why does `(ls; ls) > out.txt` send both outputs to the file?",
    shortAnswer: "The subshell groups the commands, and the redirection applies to the entire subshell's stdout.",
    explanation: "Parentheses create a subshell; all output from commands inside goes to the redirection target.",
    hint: "Without parentheses, only the last command would be redirected.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the difference between `> file 2>&1` and `2>&1 > file`?",
    shortAnswer: "The first redirects both stdout and stderr to `file`; the second redirects stderr to the current stdout (terminal) and then stdout to `file`, leaving stderr on terminal.",
    explanation: "Order matters: redirections are processed left to right.",
    hint: "Always put stdout redirection first when combining.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How can you check which file descriptors are open for a process?",
    shortAnswer: "Use `lsof -p PID` or look in `/proc/PID/fd/`.",
    explanation: "This shows all open file descriptors, including redirections.",
    hint: "Example: `ls -l /proc/$$/fd` shows open fds for current shell.",
    level: "expert",
    codeExample: "lsof -p $$"
  }
];

export default questions;