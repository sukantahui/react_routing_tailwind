// topic10_questions.js – 20 FAQ questions about global substitution with ranges

const questions = [
  {
    question: "What does `%` mean in `:%s/old/new/g`?",
    shortAnswer: "`%` is a range that means the entire file (lines 1 to $).",
    explanation: "`%` is shorthand for `1,$` (first line to last line). It's the most common range for global replacement.",
    hint: "Think of `%` as 'percent of file' or 'whole file'.",
    level: "beginner",
    codeExample: "`:%s/foo/bar/g` replaces 'foo' with 'bar' everywhere in the file."
  },
  {
    question: "How do I replace text only in lines 10 to 20?",
    shortAnswer: "Use `:10,20s/old/new/g`.",
    explanation: "Specify the start and end line numbers separated by a comma. The range is inclusive.",
    hint: "You can also use `.` for current line and `$` for last line.",
    level: "moderate",
    codeExample: "`:5,15s/error/warning/g` replaces only in lines 5 through 15."
  },
  {
    question: "How do I replace from current line to the end of the file?",
    shortAnswer: "Use `:.,$s/old/new/g` (`.` = current line, `$` = last line).",
    explanation: "The range can combine relative (`.`) and absolute (`$`). You can also use `:%` for whole file, but `.,$` is useful when you want from cursor onward.",
    hint: "`:.+5,$` starts 5 lines below current to the end.",
    level: "moderate",
    codeExample: "`:.,$s/old/new/g` replaces from current line to bottom."
  },
  {
    question: "How can I repeat the last global substitution on the same range?",
    shortAnswer: "Use `&` (ampersand) in Normal mode, or `:s` with no arguments.",
    explanation: "After a successful `:%s/foo/bar/g`, pressing `&` repeats it on the same range (entire file). `:s` alone repeats on current line; to repeat global, you may need to re‑enter the range.",
    hint: "In vim, `:&` repeats the last substitute with the same flags and range.",
    level: "expert",
    codeExample: "After `:%s/foo/bar/gc`, `:&` repeats with confirmation."
  },
  {
    question: "What is the difference between `:%s/old/new/g` and `:1,$s/old/new/g`?",
    shortAnswer: "They are identical. `%` is just shorthand for `1,$`.",
    explanation: "Both mean from line 1 to last line. `%` is preferred because it's shorter and clearer.",
    hint: "Use whichever you remember – both work.",
    level: "beginner",
    codeExample: "`:%s/a/b/g` = `:1,$s/a/b/g`."
  },
  {
    question: "How do I replace only in the last visual selection?",
    shortAnswer: "Select lines with `V`, then press `:` – the range `'<,'>` is automatically inserted. Then type `s/old/new/g`.",
    explanation: "Visual mode fills the command line with `:'<,'>`, meaning from the start to the end of the visual area. This is extremely handy for quick block edits.",
    hint: "You can also manually type `:'<,'>` if you remember the marks.",
    level: "moderate",
    codeExample: "`Vjj` to select 3 lines, then `:s/foo/bar/g` (the range appears as `:'<,'>s/foo/bar/g`)."
  },
  {
    question: "How can I replace text on lines that match a pattern (conditional substitution)?",
    shortAnswer: "Use the global command `:g/pattern/s/old/new/g`.",
    explanation: "The `:g` command executes a command on lines matching a pattern. Combining with `:s` limits the substitution to only those lines.",
    hint: "This is more efficient than `:%s` because it skips lines without the pattern.",
    level: "expert",
    codeExample: "`:g/debug/s/level/info/g` changes 'level' to 'info' only on lines containing 'debug'."
  },
  {
    question: "How do I replace except on lines matching a pattern?",
    shortAnswer: "Use `:v/pattern/s/old/new/g` (v is inverse of g).",
    explanation: "`:v` executes the command on lines that do NOT match the pattern. Useful for excluding certain sections.",
    hint: "Remember: `:v` = 'inverse global' (or 'v' for 'non‑matching').",
    level: "expert",
    codeExample: "`:v/^#/s/foo/bar/g` replaces 'foo' with 'bar' on lines that do NOT start with '#' (comments)."
  },
  {
    question: "What does the `c` flag do in `:%s/old/new/gc`?",
    shortAnswer: "Prompts for confirmation before each replacement.",
    explanation: "`c` stands for 'confirm'. Vi will show each match and ask 'y/n/a/q/l/^E/^Y'. Answer `y` to replace, `n` to skip, `a` for all remaining, `q` to quit.",
    hint: "Always use `gc` the first time to avoid unintended changes.",
    level: "moderate",
    codeExample: "`:%s/foo/bar/gc` – vi asks before each substitution."
  },
  {
    question: "How can I replace text in only the first 10 lines of the file?",
    shortAnswer: "Use `:1,10s/old/new/g`.",
    explanation: "Specify the exact range of line numbers. You can also use `:.,10` if you are on line 5, but that would be 5 to 10 (not 1 to 10).",
    hint: "Count lines with `:set number` to know your line numbers.",
    level: "moderate",
    codeExample: "`:1,10s/^/    /` adds four spaces to the first 10 lines."
  },
  {
    question: "What is the difference between `:s/old/new/g` and `:%s/old/new/g`?",
    shortAnswer: "No range defaults to current line `:.`; `%` means whole file.",
    explanation: "Without a range, `:s` works only on the current line. With `%`, it works on all lines. This is the most common confusion.",
    hint: "If you forget `%`, you'll only change one line. Always check the range.",
    level: "moderate",
    codeExample: "`:s/foo/bar/g` changes only current line; `:%s/foo/bar/g` changes all lines."
  },
  {
    question: "How can I replace across multiple files?",
    shortAnswer: "Use argument list: `:argdo %s/old/new/g` then `:wall` to save all.",
    explanation: "`:argdo` runs a command on all files in the argument list (files opened with `vi file1 file2 ...`). This is powerful for batch refactoring.",
    hint: "Combine with `:bufdo` for buffers or `:windo` for windows.",
    level: "expert",
    codeExample: "`vi *.txt` then `:argdo %s/foo/bar/g | update`"
  },
  {
    question: "What does the `e` flag do in `:%s/old/new/ge`?",
    shortAnswer: "Prevents 'Pattern not found' error if no matches exist.",
    explanation: "`e` (no error) suppresses the error message. Useful in scripts or when you're not sure if the pattern exists.",
    hint: "Combine with `c` if needed: `:%s/old/new/gce`.",
    level: "expert",
    codeExample: "`:%s/nonexistent/foo/ge` – no error message, just does nothing."
  },
  {
    question: "How can I replace using a different delimiter to avoid escaping slashes?",
    shortAnswer: "Change the delimiter, e.g., `:%s#/usr/local#/opt#g`.",
    explanation: "After `s`, any non‑alphanumeric character can be the delimiter. Common ones: `#`, `|`, `+`, `:`. This avoids having to escape `/` in paths.",
    hint: "Choose a delimiter not present in your pattern to keep it clean.",
    level: "expert",
    codeExample: "`:%s|C:\\temp|/tmp|g` replaces Windows paths."
  },
  {
    question: "What does `:&` do?",
    shortAnswer: "Repeats the last substitute with the same range and flags.",
    explanation: "In vim, `:&` is equivalent to `:s` (repeat on current line) but can also take a range. `:&&` repeats with the same flags.",
    hint: "`:&` is useful after a global substitution to re‑apply on a different range.",
    level: "expert",
    codeExample: "After `:%s/foo/bar/gc`, `:'<,'>&` repeats on visual selection."
  },
  {
    question: "How can I replace text using case‑insensitive pattern?",
    shortAnswer: "Add `i` flag: `:%s/foo/bar/gi`.",
    explanation: "The `i` flag makes the search case‑insensitive. You can combine with `g` and `c`: `:%s/foo/bar/gci`.",
    hint: "Alternatively, use `\\c` in the pattern: `:%s/\\cfoo/bar/g`",
    level: "moderate",
    codeExample: "`:%s/error/ERROR/gi` replaces 'error', 'Error', 'ERROR' with 'ERROR'."
  },
  {
    question: "What does the `n` flag do in `:%s/old/new/gn`?",
    shortAnswer: "Counts matches without replacing (report only).",
    explanation: "`n` tells vi to just count and display the number of matches. No changes are made. Very useful for checking impact.",
    hint: "Use `n` before actually replacing to see how many changes will happen.",
    level: "expert",
    codeExample: "`:%s/foo/bar/gn` → '8 matches on 5 lines'."
  },
  {
    question: "How can I replace text only in lines that contain a word AND not another word?",
    shortAnswer: "Nested `:g` and `:v`: `:g/foo/v/bar/s/old/new/g`.",
    explanation: "This executes substitute on lines matching `foo` but not `bar`. You can chain `:g` and `:v` arbitrarily.",
    hint: "Read from left to right: global for 'foo', inside that, v (inverse) for 'bar', then substitute.",
    level: "expert",
    codeExample: "`:g/include/v/DEBUG/s/printf/LOG/g` replaces 'printf' on lines with 'include' but not 'DEBUG'."
  },
  {
    question: "How do I replace text across a range of lines that is not contiguous?",
    shortAnswer: "You cannot with a single range. Use `:g` with a pattern that selects the lines, or use visual selection multiple times.",
    explanation: "Ranges are contiguous. For non‑contiguous lines, you need a pattern (like `:g`). Alternatively, mark lines and use commands like `:g/^\\s*$/d` to delete blank lines, but for substituting, patterns are the way.",
    hint: "Use `:g/pattern/ s/old/new/g` to target scattered lines.",
    level: "expert",
    codeExample: "`:g/^ERROR/s/level/CRITICAL/g` replaces on every line that starts with 'ERROR'."
  },
  {
    question: "How can I see a preview of substitutions before applying?",
    shortAnswer: "Use `:set inccommand=split` (vim only) to show live preview as you type.",
    explanation: "Recent versions of vim have `inccommand` option. As you type `:%s/old/new/g`, the substitutions appear highlighted in the split window. Very safe.",
    hint: "Add `set inccommand=split` to your .vimrc for interactive substitution.",
    level: "expert",
    codeExample: "`:set inccommand=split` then `:%s/foo/bar/g` shows live preview."
  }
];

export default questions;