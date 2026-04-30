// topic6_questions.js - 30 questions about find command

const questions = [
  {
    question: "What does `find . -name '*.txt'` do?",
    shortAnswer: "Searches recursively from current directory for files/directories with names ending in `.txt`.",
    explanation: "The `-name` test is case-sensitive. Always quote the pattern to prevent shell expansion.",
    hint: "Without quotes, the shell expands `*.txt` before find runs.",
    level: "basic",
    codeExample: "find /home -name 'README'"
  },
  {
    question: "How do you make the name search case‑insensitive?",
    shortAnswer: "Use `-iname` instead of `-name`.",
    explanation: "`-iname` matches regardless of case. Useful for finding files like 'Readme', 'README', 'readme'.",
    hint: "Example: `find . -iname 'makefile'`",
    level: "basic",
    codeExample: "find . -iname '*.jpg'"
  },
  {
    question: "How do you find only directories?",
    shortAnswer: "`find . -type d`",
    explanation: "`-type d` selects directories. Other types: `f` (regular file), `l` (symbolic link), `b` (block device), `c` (character device).",
    hint: "Combine with `-name` to find directories with specific names.",
    level: "basic",
    codeExample: "find /var -type d -name 'log'"
  },
  {
    question: "What does `-size +10M` mean?",
    shortAnswer: "Finds files larger than 10 megabytes.",
    explanation: "Units: `c` (bytes), `k` (KiB), `M` (MiB), `G` (GiB). `+` means greater than, `-` means less than, no sign means exact.",
    hint: "`find . -size -1k` finds files smaller than 1 KiB.",
    level: "intermediate",
    codeExample: "find . -size +100M -type f"
  },
  {
    question: "How do you find files modified in the last 24 hours?",
    shortAnswer: "`find . -mtime 0` or `find . -mtime -1`",
    explanation: "`-mtime n` means modified exactly n*24 hours ago. `-mtime 0` = last 24 hours. `-mtime -1` = less than 1 day ago (same).",
    hint: "Use `-mmin` for minutes: `-mmin -60` for last hour.",
    level: "intermediate",
    codeExample: "find logs/ -mtime -7"
  },
  {
    question: "What is the difference between `-mtime +7`, `-mtime 7`, and `-mtime -7`?",
    shortAnswer: "+7 = more than 7 days old; 7 = exactly 7 days old; -7 = less than 7 days old (i.e., within last 7 days).",
    explanation: "Age is calculated in days (24-hour periods) from the current time. The exact boundary can be tricky; use `-mmin` for finer control.",
    hint: "`+7` includes files last modified 8 days ago or more.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you execute a command on each found file?",
    shortAnswer: "Use `-exec command {} \\;` or `-exec command {} +`.",
    explanation: "The `{}` placeholder is replaced by the current file path. `\\;` terminates the command (semicolon escaped). `+` batches arguments.",
    hint: "Use `-ok` instead of `-exec` for confirmation.",
    level: "intermediate",
    codeExample: "find . -name '*.tmp' -exec rm {} \\;"
  },
  {
    question: "What is the advantage of `-exec ... {} +` over `{} \\;`?",
    shortAnswer: "It runs the command fewer times by appending multiple files, reducing process overhead.",
    explanation: "Similar to `xargs`. Example: `find . -name '*.c' -exec grep -l 'main' {} +` runs grep once with many arguments.",
    hint: "`{} +` requires the command to accept multiple arguments.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you delete all empty files in a directory tree?",
    shortAnswer: "`find . -type f -empty -delete`",
    explanation: "`-empty` matches empty files and directories. `-delete` removes them. Safer to test with `-print` first.",
    hint: "Also `find . -type d -empty -delete` removes empty directories.",
    level: "intermediate",
    codeExample: "find /tmp -type f -empty -delete"
  },
  {
    question: "How do you exclude a directory from search (prune)?",
    shortAnswer: "Use `-path ./exclude -prune -o -name 'pattern' -print`.",
    explanation: "`-prune` prevents descending into a directory. The `-o` (or) ensures other branches are still searched.",
    hint: "Example: `find . -path './.git' -prune -o -name '*.c' -print`",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What does `-maxdepth 1` do?",
    shortAnswer: "Limits the search to the current directory only, no subdirectories.",
    explanation: "Useful for searching only immediate children. `-maxdepth 0` would mean just the starting point.",
    hint: "`find . -maxdepth 1 -name '*.txt'`",
    level: "basic",
    codeExample: "find /etc -maxdepth 1 -name '*.conf'"
  },
  {
    question: "How do you find files owned by a specific user?",
    shortAnswer: "`find / -user username`",
    explanation: "Also `-group groupname` for group ownership. Combine with other tests.",
    hint: "Use `-nouser` to find files with no valid user.",
    level: "intermediate",
    codeExample: "find /home -user swadeep"
  },
  {
    question: "How do you find files with specific permissions (e.g., 755)?",
    shortAnswer: "`find . -perm 755` (exact match) or `-perm -755` (at least these bits set).",
    explanation: "`-perm -mode` tests that all bits in `mode` are set; `-perm /mode` tests any of the bits.",
    hint: "Use `-perm -u=x` to find files executable by owner.",
    level: "advanced",
    codeExample: "find . -perm -u=rwx,g=rx,o=rx"
  },
  {
    question: "How do you combine multiple conditions with AND and OR?",
    shortAnswer: "AND is default; use `-o` for OR. Group with escaped parentheses `\\( ... \\)`.",
    explanation: "Example: `find . \\( -name '*.c' -o -name '*.h' \\) -type f`",
    hint: "Without parentheses, `-o` binds more loosely than implied AND.",
    level: "advanced",
    codeExample: "find . -name 'a*' -o -name 'b*' -type f"
  },
  {
    question: "What does `-regex` do?",
    shortAnswer: "Matches the full path against a regular expression (GNU extension).",
    explanation: "`-regex` uses emacs regular expressions by default; `-regextype` can change it to `posix-egrep` etc.",
    hint: "Use `-iregex` for case‑insensitive version.",
    level: "expert",
    codeExample: "find . -regex '.*/[0-9]+\.txt$'"
  },
  {
    question: "How do you find files that have not been accessed in over 90 days?",
    shortAnswer: "`find . -atime +90`",
    explanation: "`-atime` measures last access time. Useful for archiving stale data.",
    hint: "Combine with `-type f` to exclude directories.",
    level: "intermediate",
    codeExample: "find /home -atime +90 -type f"
  },
  {
    question: "How can you find files by inode number?",
    shortAnswer: "`find . -inum NUM`",
    explanation: "Inode numbers are unique per filesystem. Useful for finding hard links or recovering files by inode.",
    hint: "Use `-samefile` to find hard links to a given file.",
    level: "advanced",
    codeExample: "find / -inum 12345 2>/dev/null"
  },
  {
    question: "What does `-print0` do and why use it?",
    shortAnswer: "Prints each result followed by a null character, not newline, to handle filenames with spaces or newlines.",
    explanation: "Used with `xargs -0`. Example: `find . -name '*.txt' -print0 | xargs -0 grep 'pattern'`",
    hint: "Always use `-print0` when piping to `xargs` if filenames may contain spaces.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you find links (hard or symbolic) to a specific file?",
    shortAnswer: "For hard links: `find . -samefile target_file`. For symlinks: `find . -lname 'target_path'`.",
    explanation: "`-samefile` compares inode numbers; `-lname` matches the content of symlinks.",
    hint: "`-samefile` works within the same filesystem.",
    level: "expert",
    codeExample: "find . -samefile /path/to/original"
  },
  {
    question: "How do you find files larger than 1 GB and show their sizes?",
    shortAnswer: "`find . -size +1G -exec ls -lh {} \\;` or use `-exec du -h {} \\;`.",
    explanation: "Combining `-exec` with `ls` gives human‑readable sizes. Be careful with performance on many files.",
    hint: "Use `+` instead of `\\;` for fewer `ls` invocations: `-exec ls -lh {} +`",
    level: "advanced",
    codeExample: "find /var -size +1G -exec du -h {} \\; 2>/dev/null"
  },
  {
    question: "What is the purpose of `-quit`?",
    shortAnswer: "Stops the search after the first match (GNU extension).",
    explanation: "Useful for performance when you only need one result. Example: `find . -name 'core' -quit` finds first core dump and stops.",
    hint: "Often combined with `-print` and then `-quit`.",
    level: "expert",
    codeExample: "find / -name 'passwd' -print -quit 2>/dev/null"
  },
  {
    question: "How do you find files newer than a reference file?",
    shortAnswer: "`find . -newer reference_file`",
    explanation: "Compares modification times (mtime). Also `-newerXY` for other timestamps: `-newerat`, `-newermt`, `-newerct`.",
    hint: "Example: `find . -newermt '2024-01-01'`",
    level: "advanced",
    codeExample: "find . -newer backup.tar.gz"
  },
  {
    question: "What does `-path` do?",
    shortAnswer: "Matches the entire path, not just the basename.",
    explanation: "Useful for excluding or including based on directory structure. Example: `find . -path '*/.git/*' -prune`",
    hint: "`-ipath` is case‑insensitive version.",
    level: "advanced",
    codeExample: "find . -path '*/test/*' -name '*.py'"
  },
  {
    question: "How do you avoid descending into directories that match a pattern?",
    shortAnswer: "Use `-prune` on the directory. Example: `find . -name 'node_modules' -prune -o -name '*.js' -print`.",
    explanation: "`-prune` stops traversal; the `-o` ensures the rest of the tree (non‑pruned) is still processed.",
    hint: "Order matters: place `-prune` before the `-o`.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between `-exec` and `-execdir`?",
    shortAnswer: "`-execdir` runs the command from the directory containing the matched file, safer for operations that affect the file's parent.",
    explanation: "`-execdir` changes to the file's directory before running the command, reducing race conditions. GNU extension.",
    hint: "`-execdir` is preferred for commands like `rm` when using relative paths.",
    level: "expert",
    codeExample: "find . -name '*.tmp' -execdir rm {} \\;"
  },
  {
    question: "How can you find files with a specific extension and copy them to a folder?",
    shortAnswer: "`find . -name '*.jpg' -exec cp {} /destination/ \\;` or use `-exec cp -t /destination {} +`.",
    explanation: "The `-t` option of `cp` allows specifying target directory first, which works well with `{} +`.",
    hint: "Always test with `echo` before actual copy.",
    level: "intermediate",
    codeExample: "find . -name '*.pdf' -exec cp -t ~/pdfs/ {} +"
  },
  {
    question: "What does `-fprintf` do?",
    shortAnswer: "Writes find output to a file with a format similar to `printf`.",
    explanation: "GNU extension. Example: `find . -name '*.c' -fprintf results.txt '%p\\n'`",
    hint: "Useful for logging search results.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you find symbolic links that point to nowhere (dangling)?",
    shortAnswer: "`find . -type l ! -exec test -e {} \\; -print` or `find . -xtype l` (GNU).",
    explanation: "`-xtype l` checks the type of the link target. Dangling links have no target type.",
    hint: "`-xtype` is not POSIX but available on GNU/Linux.",
    level: "expert",
    codeExample: "find / -xtype l 2>/dev/null"
  },
  {
    question: "How do you use `find` to count the number of files of each extension?",
    shortAnswer: "`find . -type f | sed 's/.*\\.//' | sort | uniq -c`",
    explanation: "This pipeline extracts extensions and counts them. Not pure `find`, but common combination.",
    hint: "Use `-printf '%f\\n'` to output only filenames for cleaner processing.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the performance impact of using `-exec` vs `-exec ... +`?",
    shortAnswer: "`-exec {} \\;` forks a new process per file, which can be slow for many files. `{} +` forks once per batch (~128k arguments), much faster.",
    explanation: "For thousands of files, the difference is dramatic. Use `+` whenever your command can take multiple arguments.",
    hint: "Example: `grep`, `ls`, `chmod`, `cp -t` work well with `+`.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you find files with a name longer than 50 characters?",
    shortAnswer: "`find . -name '??????????????????????????????????????????????????'` (50 question marks) or use `-regex`.",
    explanation: "The `-regex` approach: `find . -regex './[^/]\\{50,\\}$'`",
    hint: "Using `-regex` is more flexible than many `?`.",
    level: "expert",
    codeExample: null
  }
];

export default questions;