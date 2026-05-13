const questions = [
  {
    question: "What is the `view` command?",
    shortAnswer: "`view` is a symbolic link to Vim that opens files in read-only mode.",
    explanation: "It enables the `readonly` option, which helps prevent accidental modifications. All navigation, search, and viewing features of Vim work normally.",
    hint: "It behaves exactly like `vim -R`.",
    level: "basic",
    codeExample: "view /etc/passwd"
  },
  {
    question: "How is `view` different from `less`?",
    shortAnswer: "`view` provides full Vim features (syntax highlighting, advanced navigation, visual selection), while `less` is simpler and more efficient for very large files.",
    explanation: "`less` is mainly used for paging through large files quickly, while `view` gives access to powerful Vim features in read-only mode.",
    hint: "Use `view` for power, `less` for speed.",
    level: "intermediate",
    codeExample: "dmesg | view -   # then use :set syntax=on"
  },
  {
    question: "Can I edit a file opened with `view`?",
    shortAnswer: "Yes, by disabling read-only mode using `:set noreadonly`, if you have write permission.",
    explanation: "`view` starts in read-only mode as a safety feature. You can modify the file only after removing the readonly restriction and if proper permissions exist.",
    hint: "Read-only is a safety feature, not a strict lock.",
    level: "basic",
    codeExample: ":set noreadonly\n:w"
  },
  {
    question: "How do I pipe command output into `view`?",
    shortAnswer: "Use `command | view -` to read input from standard input.",
    explanation: "The `-` tells Vim to read from stdin. You can then search, copy, and navigate the output easily.",
    hint: "You can also set filetype manually using `+` option.",
    level: "intermediate",
    codeExample: "ps aux | view -\ngrep error /var/log/syslog | view -"
  },
  {
    question: "How do I make Vim always start in read-only mode?",
    shortAnswer: "Use `vim -R`, `view`, or set `readonly` in the .vimrc file.",
    explanation: "Adding `set readonly` in `.vimrc` forces all files to open in read-only mode, though this is usually not recommended.",
    hint: "Better option: create an alias like `alias rvim='vim -R'`.",
    level: "basic",
    codeExample: "alias rvim='vim -R'\nrvim important.txt"
  },
  {
    question: "Can I use `view` with syntax highlighting for logs?",
    shortAnswer: "Yes, if syntax highlighting is enabled.",
    explanation: "If `syntax on` is enabled in `.vimrc`, Vim will automatically highlight logs. You can also manually set file type.",
    hint: "Use `:set ft=log` if needed.",
    level: "intermediate",
    codeExample: "view /var/log/auth.log\n:syntax on"
  },
  {
    question: "What happens if I press `i` in `view`?",
    shortAnswer: "You enter Insert mode, but saving changes will fail unless readonly is disabled.",
    explanation: "You can type and modify the buffer, but you cannot save unless you remove the readonly setting and have proper permissions.",
    hint: "Use `:q!` to exit without saving.",
    level: "basic",
    codeExample: ":echo &readonly   # shows 1 if readonly"
  },
  {
    question: "How do I exit `view`?",
    shortAnswer: "Use `:q` or `:q!`.",
    explanation: "`:q` works if no changes were made. If changes exist, use `:q!` to discard them.",
    hint: "`ZZ` attempts to save and quit, which may fail in readonly mode.",
    level: "basic",
    codeExample: ":q\n:q!"
  },
  {
    question: "Can I use `view` to read compressed files?",
    shortAnswer: "Not directly, but you can pipe decompressed output into `view`.",
    explanation: "Use tools like `zcat`, `bzcat`, or `xzcat`. Some Vim setups support gzip plugin for automatic decompression.",
    hint: "Example: `zcat file.gz | view -`",
    level: "advanced",
    codeExample: "zcat huge.log.gz | view -\nbzcat archive.bz2 | view -"
  },
  {
    question: "How do I make `view` the default pager for `man`?",
    shortAnswer: "Set the `MANPAGER` environment variable.",
    explanation: "This replaces the default `less` pager with `view`.",
    hint: "You may need `col -b` to remove formatting.",
    level: "intermediate",
    codeExample: "export MANPAGER='col -b | view -'\nman bash"
  },
  {
    question: "Does `view` support line numbers?",
    shortAnswer: "Yes, using `:set number`.",
    explanation: "All Vim features like line numbers and relative numbers work in read-only mode.",
    hint: "Use `:set relativenumber` for better navigation.",
    level: "basic",
    codeExample: ":set number\n:set relativenumber"
  },
  {
    question: "What is the difference between `view` and `vim -R`?",
    shortAnswer: "There is no difference.",
    explanation: "`view` is simply a shortcut for `vim -R`.",
    hint: "Check using `which view`.",
    level: "basic",
    codeExample: "view myfile\nvim -R myfile"
  },
  {
    question: "How do I search in `view`?",
    shortAnswer: "Use `/` to search forward and `?` to search backward.",
    explanation: "Press `n` to repeat forward and `N` to repeat backward. You can also use `*` to search for the word under the cursor.",
    hint: "`*` is very powerful for quick searches.",
    level: "intermediate",
    codeExample: "/error\nn\nN\n*"
  },
  {
    question: "Can I use `view` like `tail -f`?",
    shortAnswer: "No, it does not auto-refresh.",
    explanation: "`view` loads the file once. Use `:e` to reload manually. For live logs, use `tail -f` or `less +F`.",
    hint: "Use `tail -f` for real-time monitoring.",
    level: "advanced",
    codeExample: "tail -f app.log"
  },
  {
    question: "How do I copy text in `view`?",
    shortAnswer: "Use Visual mode and `y` to yank text.",
    explanation: "Press `v` or `V` to select text, then press `y` to copy. You can paste within Vim or use system clipboard.",
    hint: "Use `\"+y` for system clipboard.",
    level: "intermediate",
    codeExample: "Vjjj\ny\n:new\np"
  },
  {
    question: "Why does `view` show `[readonly]`?",
    shortAnswer: "It indicates the file is opened in read-only mode.",
    explanation: "This is a visual indicator in the status line. It helps prevent accidental editing.",
    hint: "Controlled by the `readonly` option.",
    level: "basic",
    codeExample: "set statusline=%f%m%r%h%w"
  },
  {
    question: "Can I open multiple files in `view`?",
    shortAnswer: "Yes, using `view file1 file2`.",
    explanation: "You can switch between files using `:n` (next) and `:prev` (previous).",
    hint: "All files open in read-only mode.",
    level: "intermediate",
    codeExample: "view /etc/hosts /etc/hostname\n:n\n:prev"
  },
  {
    question: "How do I disable swap file in `view`?",
    shortAnswer: "Use `view -n`.",
    explanation: "Swap files are created by default even in read-only mode. Use `-n` to disable them.",
    hint: "Useful for large files or limited disk space.",
    level: "advanced",
    codeExample: "view -n hugefile.txt"
  },
  {
    question: "What happens if I use `:q!` in `view`?",
    shortAnswer: "You exit without saving any changes.",
    explanation: "Any modifications in the buffer are discarded.",
    hint: "Safe way to exit after accidental edits.",
    level: "basic",
    codeExample: ":q!"
  },
  {
    question: "Is `view` available on all Unix/Linux systems?",
    shortAnswer: "`view` is available if Vim is installed.",
    explanation: "If `view` is not available, you can use `vi -R` as an alternative.",
    hint: "Use `vi -R` for better portability.",
    level: "basic",
    codeExample: "vi -R /etc/passwd"
  }
];

export default questions;