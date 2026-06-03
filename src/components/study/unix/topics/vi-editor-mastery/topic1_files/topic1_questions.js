// topic1_questions.js – 20 questions about starting vi/vim
const questions = [
  {
    question: "What is the difference between `vi filename` and `vim filename`?",
    shortAnswer: "`vi` is the POSIX‑required editor (may be a minimal clone), while `vim` is the enhanced version with extra features.",
    explanation: "On many Linux distributions `vi` is actually a symlink to `vim` in compatibility mode. But on embedded systems or older Unix, `vi` might be `nvi` or `busybox vi`. Using `vim` explicitly ensures you get the full feature set if installed.",
    hint: "Run `vi --version` and `vim --version` on your system. Do they point to the same binary?",
    level: "moderate",
    codeExample: "$ ls -l $(which vi)\n/usr/bin/vi -> /usr/bin/vim"
  },
  {
    question: "How do you open a file and immediately go to line 25 with vi?",
    shortAnswer: "Use `vi +25 filename` or `vim +25 filename`.",
    explanation: "The `+` flag can be followed by a line number. This is extremely useful when debugging error messages that report a line number, e.g., from a compiler or runtime error.",
    hint: "Try `vi +10 /etc/passwd` – your cursor will start on the 10th line.",
    level: "moderate",
    codeExample: "$ vi +42 script.sh"
  },
  {
    question: "What does `vi +/search_term filename` do?",
    shortAnswer: "Opens the file and places the cursor on the first occurrence of `search_term` after the opening.",
    explanation: "This is a powerful way to jump directly to a pattern – for example, opening a configuration file and searching for a directive. The search uses regular expressions.",
    hint: "Combine with `n` and `N` after opening to navigate further matches.",
    level: "moderate",
    codeExample: "$ vi +/Listen 80 /etc/apache2/ports.conf"
  },
  {
    question: "How can you open multiple files at once with vi?",
    shortAnswer: "List them after the command: `vi file1 file2 file3`. Use `:n` (next) and `:prev` to navigate.",
    explanation: "This is the classic way to edit several files in one vi session. After finishing the first, `:w` saves and `:n` takes you to the next file. You can also use `:rew` to go back to the first.",
    hint: "Use `:args` to see the list of files you opened.",
    level: "expert",
    codeExample: "$ vi *.conf\n# then :n, :prev, :rew, :args"
  },
  {
    question: "What is the purpose of the `view` command?",
    shortAnswer: "`view` opens a file in read‑only mode, equivalent to `vi -R`. It prevents accidental modifications.",
    explanation: "When exploring system files or logs, using `view` adds a safety layer. If you try to write, vi will show 'File is read only'. It's ideal for beginners reviewing configuration files.",
    hint: "Try `view /etc/shadow` – you can look but not touch.",
    level: "beginner",
    codeExample: "$ view /etc/fstab"
  },
  {
    question: "What happens if you type `vi` without a filename?",
    shortAnswer: "Vi starts with an empty buffer. You can later save it to a file using `:w filename`.",
    explanation: "This is useful when you want to start writing notes or code and decide a filename later. The status line shows '[No Name]'.",
    hint: "Type some text, then `:w mynotes.txt` to save.",
    level: "moderate",
    codeExample: "$ vi\n# then press i, type something, ESC, :w junk.txt"
  },
  {
    question: "How do you open a file and start editing immediately (without pressing `i`)?",
    shortAnswer: "You cannot – vi always starts in Normal mode. You must press `i`, `a`, `o`, or similar to enter Insert mode.",
    explanation: "This is the most common confusion for beginners. They see the file on screen but can't type. The editor is in command mode. The correct next step is to type `i` (insert) or `a` (append).",
    hint: "After opening a file with `vi file`, look at the bottom line. It does not say '-- INSERT --' until you press `i`.",
    level: "beginner",
    codeExample: "$ vi newfile\n# now press 'i' – bottom left shows -- INSERT --"
  },
  {
    question: "What is the difference between `vi -R` and `vi` followed by `:set readonly`?",
    shortAnswer: "`vi -R` starts with the readonly flag already set; `:set readonly` toggles it later. Both prevent writing unless `:w!` is used.",
    explanation: "Using `-R` is safer because you can't forget to set it. However, a determined user can still override with `:w!` (write override).",
    hint: "Open a file with `vi -R`, try `:w` – it fails. Then try `:w!` – it succeeds but warns you.",
    level: "expert",
    codeExample: "$ vi -R important.cfg\n:set noreadonly   # now you can write normally"
  },
  {
    question: "How do you open a file and execute a command immediately after loading?",
    shortAnswer: "Use `vi -c 'command' filename`. You can chain multiple `-c` flags.",
    explanation: "This is extremely powerful for automation. For example, `vi -c 'norm dd' -c 'wq' file` deletes the first line and saves. It can replace `sed` in some cases.",
    hint: "The command is an ex command, so omit the leading colon. Use `norm` to simulate normal mode commands.",
    level: "expert",
    codeExample: "$ vi -c '%s/foo/bar/g' -c 'wq' config.txt"
  },
  {
    question: "What does the `+` flag mean when used without a line number or search? (e.g., `vi + file`)",
    shortAnswer: "It opens the file and places the cursor on the last line of the file.",
    explanation: "Technically `+` is equivalent to `+0` or `+$`. This is a quick way to jump to the end of a file, e.g., to append new content.",
    hint: "Compare `vi file` (cursor at line 1) with `vi + file` (cursor at last line).",
    level: "moderate",
    codeExample: "$ vi + /var/log/dmesg"
  },
  {
    question: "How can you open a file with vi such that the cursor is positioned at the first line containing a specific pattern, but also perform a substitution automatically?",
    shortAnswer: "Combine `+` with `-c`: `vi -c '/pattern' -c 's/old/new/' file`. Note the search command is `/pattern` (not `+/pattern` when inside `-c`).",
    explanation: "This shows how to chain multiple startup commands. The search positions the cursor, then the substitution works on that line.",
    hint: "The `-c` flag can be used multiple times; they execute in order.",
    level: "expert",
    codeExample: "$ vi -c '/Listen' -c 's/80/8080/' -c 'wq' apache.conf"
  },
  {
    question: "What environment variables affect how vi starts?",
    shortAnswer: "$EDITOR, $VISUAL, $VIM, $VIMRUNTIME, and $SHELL (for shell commands inside vi).",
    explanation: "Many programs use $EDITOR to decide which editor to launch. $VIM and $VIMRUNTIME tell Vim where to find its runtime files. $SHELL determines which shell is used for `:!` commands.",
    hint: "Set `export EDITOR=vi` in your .bashrc to make other tools use vi.",
    level: "expert",
    codeExample: "$ export VISUAL=vim\n$ crontab -e   # opens with vim"
  },
  {
    question: "Why does `vi filename` sometimes create a swap file `.filename.swp` immediately?",
    shortAnswer: "Vi creates a swap file as a recovery mechanism as soon as you start editing (or even when opening a file if configured).",
    explanation: "The swap file appears in the same directory. It is used to recover unsaved changes after a crash. Some distributions enable swap file creation on open even before modifications.",
    hint: "Look for hidden files with `ls -la .*.swp`. Recovery: `vi -r filename`",
    level: "moderate",
    codeExample: "$ vi test.txt\n# In another terminal: ls -la .test.txt.swp"
  },
  {
    question: "How do you open a file and have line numbers displayed automatically?",
    shortAnswer: "Use `vi -c 'set number' filename` or alias `vi` to include the setting in your .vimrc.",
    explanation: "While you can type `:set number` after opening, adding it to a startup command is one‑shot. For permanent behavior, place `set number` in `~/.vimrc`.",
    hint: "Create a simple .vimrc with `set number` and then open any file.",
    level: "moderate",
    codeExample: "$ vi -c 'set number' /etc/hosts"
  },
  {
    question: "What is the difference between opening a file with `vi` and `vim -u NONE`?",
    shortAnswer: "`vim -u NONE` starts Vim without loading any user configuration or plugins, simulating a minimal vi behavior.",
    explanation: "When troubleshooting issues with your .vimrc or testing portability, this flag ignores all customizations. The `vi` command may still load system vimrc files. `-u NONE` gives a truly vanilla environment.",
    hint: "Use `vim -u NONE -U NONE -N -i NONE` to disable even more (no swap, no viminfo).",
    level: "expert",
    codeExample: "$ vim -u NONE /etc/issue"
  },
  {
    question: "How do you open a file and start with the cursor in Insert mode?",
    shortAnswer: "Use `vi -c 'startinsert' file` or `vi -c 'norm i' file`.",
    explanation: "This tricks vi into entering insert mode immediately after loading. Some users create an alias `vimi` for this purpose.",
    hint: "The ex command `startinsert` is from Vim. For plain vi, you may need `-c 'norm i'`.",
    level: "expert",
    codeExample: "$ alias vimi='vi -c \"startinsert\"'\n$ vimi newfile"
  },
  {
    question: "What happens if you try to open a directory with vi?",
    shortAnswer: "Vi will show a directory listing (netrw in Vim) or an error depending on the version. Many versions allow browsing and selecting files.",
    explanation: "Vim's netrw plugin lets you navigate directories and open files. Plain vi may just show gibberish or refuse. It's not reliable for directory browsing.",
    hint: "Try `vim .` in a directory – you get a file explorer!",
    level: "moderate",
    codeExample: "$ vim /etc   # opens netrw file browser"
  },
  {
    question: "How can you open a file and limit the lines displayed (e.g., first 50 lines) in vi?",
    shortAnswer: "Vi does not natively limit display, but you can use `vi -c 'normal 50G' file` to jump to line 50 or use `view -` with `head`.",
    explanation: "For large files, you might want to see only the beginning. Use external tools: `head -50 largefile | vi -` to open the first 50 lines in vi.",
    hint: "Piping to `vi -` is a classic trick: `command | vi -`",
    level: "expert",
    codeExample: "$ head -n 50 huge.log | vi -"
  },
  {
    question: "What does the `--` (double dash) argument mean when calling vi? (e.g., `vi -- file`)?",
    shortAnswer: "`--` signals the end of options; any following arguments are filenames even if they start with a dash.",
    explanation: "If you have a file whose name begins with a hyphen (e.g., `-myfile`), vi would interpret it as an option. Using `vi -- -myfile` treats it as a filename.",
    hint: "Try creating a file named `-R` with `touch -- -R`, then open with `vi -- -R`.",
    level: "expert",
    codeExample: "$ vi -- -unusual-filename.txt"
  },
  {
    question: "Why might `vi filename` give a 'Permission denied' error even if the file is readable?",
    shortAnswer: "Vi attempts to create a swap file in the same directory. If you don't have write permission on the directory, vi fails.",
    explanation: "Even when opening a file readonly, vi (especially vim) tries to create a swap file for recovery. If the directory is not writable, it refuses. You can use `vi -n` to disable swap file.",
    hint: "Use `vi -n /etc/passwd` to open without swap, then you can view but not edit.",
    level: "expert",
    codeExample: "$ vi -n /etc/shadow   # works even without write permission in /etc"
  }
];
export default questions;