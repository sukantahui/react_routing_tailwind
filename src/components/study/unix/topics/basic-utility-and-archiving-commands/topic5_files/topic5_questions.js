const questions = [
  {
    question: "What does the `echo` command do?",
    shortAnswer: "Displays a line of text (or variable values) to the standard output.",
    explanation: "`echo` is used in shell scripts and command line to print messages, variable values, or generate output.",
    hint: "It's the shell equivalent of `print` in Python or `Console.WriteLine` in C#.",
    level: "basic",
    codeExample: "echo 'Hello, World!'"
  },
  {
    question: "What is the difference between single and double quotes with `echo`?",
    shortAnswer: "Single quotes preserve literal text; double quotes expand variables and command substitutions.",
    explanation: "Inside double quotes, `$var` is expanded; inside single quotes, it's literal `$var`.",
    hint: "Use double quotes when you want variable values; single quotes for fixed strings.",
    level: "intermediate",
    codeExample: "name=Debangshu\necho 'Hello $name' # Hello $name\necho \"Hello $name\" # Hello Debangshu"
  },
  {
    question: "How do you print text without a trailing newline using `echo`?",
    shortAnswer: "Use the `-n` option: `echo -n 'Text'`",
    explanation: "Normally echo adds a newline; `-n` suppresses it, useful for prompts.",
    hint: "Alternatively, use `printf` for complete control.",
    level: "basic",
    codeExample: "echo -n 'Enter your name: '; read name"
  },
  {
    question: "What does `echo -e` do?",
    shortAnswer: "Enables interpretation of backslash escape sequences (e.g., `\\n`, `\\t`).",
    explanation: "With `-e`, special characters like newline, tab, and backspace become functional.",
    hint: "`echo -e 'Line1\\nLine2'` prints two lines.",
    level: "intermediate",
    codeExample: "echo -e 'Name\\tAge\\nAlice\\t30\\nBob\\t25'"
  },
  {
    question: "How can you print a literal backslash using `echo`?",
    shortAnswer: "Use `echo -E '\\\\'` or `echo '\\\\'` (with single quotes).",
    explanation: "Without `-e`, backslash is literal; with `-e`, you need to double it: `\\\\` prints one backslash.",
    hint: "To be portable, use `printf '\\\\n'`",
    level: "advanced",
    codeExample: "echo 'C:\\\\Users\\\\Sukanta'"
  },
  {
    question: "Why does `echo $var` collapse multiple spaces?",
    shortAnswer: "Because the shell performs word splitting on the unquoted variable, reducing multiple spaces to a single separator.",
    explanation: "Always double-quote variables: `echo \"$var\"` preserves spacing.",
    hint: "Quote to keep formatting.",
    level: "intermediate",
    codeExample: "var='   spaced   '\necho $var   # spaced (single spaces)\necho \"$var\" #   spaced   "
  },
  {
    question: "How can you print a variable that contains special characters without expansion?",
    shortAnswer: "Use single quotes: `echo '$var'` or escape each special character.",
    explanation: "Single quotes prevent all expansions. For partial, use double quotes and backslashes.",
    hint: "`echo \"The cost is \\$10\"` prints $10.",
    level: "intermediate",
    codeExample: "echo 'There is no $variable here'"
  },
  {
    question: "Is `echo` portable across different Unix-like systems?",
    shortAnswer: "Not completely; options like `-n` and `-e` are implemented inconsistently, especially between Bash and POSIX sh.",
    explanation: "For maximum portability, use `printf` instead of `echo` for complex formatting.",
    hint: "`printf` is the recommended alternative.",
    level: "expert",
    codeExample: "printf '%s\n' 'Hello'   # portable newline"
  },
  {
    question: "How do you redirect `echo` output to a file?",
    shortAnswer: "Use `>` to overwrite or `>>` to append: `echo 'Hello' > file.txt`",
    explanation: "The redirection sends stdout to a file instead of the terminal.",
    hint: "Use `>>` to add to end of file.",
    level: "basic",
    codeExample: "echo 'First line' > output.txt\necho 'Second line' >> output.txt"
  },
  {
    question: "How can you display an error message to stderr with `echo`?",
    shortAnswer: "Redirect stderr: `echo 'Error message' >&2`",
    explanation: "`>&2` redirects stdout (file descriptor 1) to stderr (file descriptor 2).",
    hint: "Useful in scripts to separate normal output from errors.",
    level: "intermediate",
    codeExample: "echo 'Something went wrong' >&2"
  },
  {
    question: "What is the difference between `echo` and `printf`?",
    shortAnswer: "`echo` is simpler but less portable; `printf` offers formatted output and is more reliable across systems.",
    explanation: "`printf` requires a format string and does not automatically add newline.",
    hint: "Use `printf` when you need precise control or cross-platform compatibility.",
    level: "advanced",
    codeExample: "printf 'Name: %s\nAge: %d\n' 'Tuhina' 22"
  },
  {
    question: "How can you print a colored message using `echo`?",
    shortAnswer: "Use ANSI escape codes with `echo -e`: `echo -e '\\033[31mRed\\033[0m'`",
    explanation: "ANSI sequences change text color, background, and style; reset with `\\033[0m`.",
    hint: "Define variables for colors to reuse.",
    level: "expert",
    codeExample: "RED='\\033[0;31m'; NC='\\033[0m'; echo -e \"${RED}Error${NC}\""
  },
  {
    question: "Why does `echo -n` sometimes not work in some shells?",
    shortAnswer: "The `-n` option is not POSIX; some older shells (like original Bourne shell) do not support it.",
    explanation: "POSIX `echo` does not define any options; `-n` is a common extension but not guaranteed.",
    hint: "Use `printf '%s' 'text'` for portability.",
    level: "expert",
    codeExample: "printf 'No newline here'"
  },
  {
    question: "How do you print a backspace character with `echo`?",
    shortAnswer: "`echo -e 'abc\\b\\b'` prints 'a' (deletes 'b' and 'c').",
    explanation: "`\\b` sends backspace; the effect depends on terminal.",
    hint: "Carriage return `\\r` is more useful for overwriting lines.",
    level: "advanced",
    codeExample: "echo -e '12345\\b\\b\\bAB'  # prints 12AB5"
  },
  {
    question: "How can you print multiple lines using a single `echo`?",
    shortAnswer: "Use `echo -e 'Line1\\nLine2\\nLine3'` or use a heredoc.",
    explanation: "With `-e`, `\\n` creates newlines. Or embed actual newlines inside quotes.",
    hint: "Triple quotes are not available; just press Enter inside quotes.",
    level: "basic",
    codeExample: "echo -e 'First\nSecond\nThird'"
  },
  {
    question: "What happens if you `echo` a variable that contains command substitution?",
    shortAnswer: "If double-quoted, the command runs and its output is echoed; if single-quoted, it's literal.",
    explanation: "Command substitution `$(cmd)` executes `cmd` and replaces with its output.",
    hint: "`echo \"Today is $(date)\"` prints date.",
    level: "intermediate",
    codeExample: "echo \"The current directory is $(pwd)\""
  },
  {
    question: "How do you prevent `echo` from interpreting options?",
    shortAnswer: "Use `echo -- \"-n\"` (if supported) or use `printf '%s\\n' \"-n\"`.",
    explanation: "Some echoes treat `-n` as an option; `--` marks end of options.",
    hint: "Portable: `printf '%s\\n' '-n'`.",
    level: "expert",
    codeExample: "echo -- '-n message'"
  },
  {
    question: "Can `echo` produce binary output?",
    shortAnswer: "Not directly; `echo` outputs text. For binary, use `printf` or `xxd`.",
    explanation: "You can output escape sequences like `\\x41` with `echo -e`, but better to use `printf`.",
    hint: "`printf '\\x41\\x42\\x43'` outputs 'ABC'.",
    level: "expert",
    codeExample: "printf '\\x48\\x65\\x6c\\x6c\\x6f'"
  },
  {
    question: "Why does `echo` sometimes add extra spaces between arguments?",
    shortAnswer: "Because `echo` separates its arguments with a single space by default.",
    explanation: "If you pass multiple arguments, `echo` joins them with a space. Use one quoted string to avoid.",
    hint: "`echo \"Hello   World\"` preserves multiple spaces.",
    level: "basic",
    codeExample: "echo Hello   World   # Hello World (single space)\necho \"Hello   World\"   # Hello   World"
  },
  {
    question: "How can you use `echo` to create a multi-line variable?",
    shortAnswer: "Use `echo -e` with `\\n` and assign: `multiline=$(echo -e 'Line1\\nLine2')`",
    explanation: "Or use a heredoc: `multiline=$(cat <<EOF\nLine1\nLine2\nEOF)`",
    hint: "Variables can contain newlines if quoted correctly.",
    level: "advanced",
    codeExample: "msg=$(echo -e 'First line\\nSecond line'); echo \"$msg\""
  },
  {
    question: "What is the difference between `echo` in bash and sh?",
    shortAnswer: "Bash's `echo` supports `-e`, `-n`, `-E`; POSIX `sh` may not support any options.",
    explanation: "In `/bin/sh` (often dash), `echo` does not interpret escapes; you must use `printf`.",
    hint: "Write portable scripts using `printf`.",
    level: "expert",
    codeExample: "#!/bin/sh\nprintf 'Hello\\n'"
  },
  {
    question: "How can you print environment variables using `echo`?",
    shortAnswer: "`echo $HOME`, `echo $PATH`, or `env | grep`.",
    explanation: "All environment variables are available as shell variables.",
    hint: "`echo \"User: $USER, Home: $HOME\"`.",
    level: "basic",
    codeExample: "echo \"My shell is $SHELL\""
  },
  {
    question: "How do you suppress the trailing newline in a way that works on all systems?",
    shortAnswer: "Use `printf '%s' 'text'` instead of `echo -n`.",
    explanation: "`printf` is POSIX and does not add newline unless you specify `\\n`.",
    hint: "`printf` is the portable solution.",
    level: "advanced",
    codeExample: "printf 'Prompt: '; read answer"
  },
  {
    question: "Can `echo` be used to display the exit status of the last command?",
    shortAnswer: "Yes, `echo $?` prints the exit status of the previous command.",
    explanation: "`$?` holds the exit code; `echo` prints it.",
    hint: "Useful for debugging scripts: `command; echo \"Exit code: $?\"`",
    level: "intermediate",
    codeExample: "ls /nonexistent; echo $?"
  },
  {
    question: "How do you print a large block of text without escaping every line?",
    shortAnswer: "Use a heredoc: `cat << EOF ... EOF` or `echo` with multiline string.",
    explanation: "Heredoc allows natural multiline input.",
    hint: "`cat << 'EOF' ... EOF` preserves formatting.",
    level: "intermediate",
    codeExample: "cat << 'EOF'\nThis is line 1\nThis is line 2\nEOF"
  },
  {
    question: "What does `echo {1..5}` do?",
    shortAnswer: "Brace expansion: prints `1 2 3 4 5`.",
    explanation: "The shell expands the braces before `echo` sees them.",
    hint: "`echo {a..z}` prints alphabet.",
    level: "basic",
    codeExample: "echo {1..10}"
  },
  {
    question: "How can you clear the terminal using `echo`?",
    shortAnswer: "`echo -e '\\033[2J\\033[H'` sends ANSI clear screen and home cursor.",
    explanation: "Not as portable as `clear` command but works on many terminals.",
    hint: "Just use `clear` command.",
    level: "advanced",
    codeExample: "echo -e '\\033[2J\\033[H'"
  },
  {
    question: "Why does `echo` in a script sometimes output 'missing argument'?",
    shortAnswer: "Because the variable is empty, and `echo` with no arguments prints a blank line (not an error).",
    explanation: "If you intend to print nothing, it's fine. To detect empty, check before echoing.",
    hint: "`echo \"${var:-default}\"` provides a default.",
    level: "intermediate",
    codeExample: "unset var; echo \"$var\"   # prints blank line"
  },
  {
    question: "How can you echo a literal dollar sign?",
    shortAnswer: "Use single quotes: `echo '$100'` or escape: `echo \"\\$100\"`.",
    explanation: "Double quotes require escaping `$` to prevent variable expansion.",
    hint: "`echo 'Price: $10'`",
    level: "basic",
    codeExample: "echo \"The cost is \\$5.00\""
  },
  {
    question: "What is the difference between `echo` and `cat` when displaying a file?",
    shortAnswer: "`echo` prints its arguments; `cat` prints file contents. `echo $(<file)` can print a file but poorly.",
    explanation: "Use `cat` for files; `echo` for strings.",
    hint: "`cat file.txt` is proper; `echo \"$(<file.txt)\"` is messy.",
    level: "basic",
    codeExample: "echo 'Hello' > test; cat test"
  }
];

export default questions;