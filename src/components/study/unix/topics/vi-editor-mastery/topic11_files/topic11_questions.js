const questions = [
  {
    question: "What is a buffer in Vim?",
    shortAnswer: "A buffer is an in-memory representation of a file loaded into Vim.",
    explanation: "Each file you open (or create) lives in a buffer. Buffers exist even when not visible. You can have multiple buffers open simultaneously and switch between them without losing changes.",
    hint: "Think of buffers like pages in a notebook – you can flip between them even if only one page is visible at a time.",
    level: "basic",
    codeExample: ":ls               // list all buffers\n:b 3              // go to buffer number 3\n:buffer config.js  // go to buffer by name (partial works with Tab)"
  },
  {
    question: "How do you open a new file for editing without quitting Vim?",
    shortAnswer: "Use `:e filename` (edit command).",
    explanation: "`:e filename` loads the specified file into the current buffer, replacing the existing one. To keep changes from the previous buffer, save it first or use `:set hidden`.",
    hint: "Try `:e#` to toggle back to the previous file – super useful for flipping between two files.",
    level: "basic",
    codeExample: ":e /etc/hosts\n:e ../backup/config.old"
  },
  {
    question: "What does `:n` do and when would you use it?",
    shortAnswer: "`:n` moves to the next file in the argument list.",
    explanation: "When you start Vim with multiple files (e.g., `vim file1 file2 file3`), the argument list holds these files in order. `:n` goes forward, `:prev` or `:N` goes backward. If you modify a file, you must save it before moving (or set `autowrite`).",
    hint: "Observe `:args` to see the current argument list. `:n` respects your position in that list.",
    level: "intermediate",
    codeExample: "vim main.c util.c header.h\n:args   // shows main.c util.c header.h\n:n      // goes to util.c\n:n      // goes to header.h\n:prev   // back to util.c"
  },
  {
    question: "How can you see a list of all open buffers?",
    shortAnswer: "Use `:ls` (or `:buffers`).",
    explanation: "`:ls` displays each buffer with a number, status (active, hidden, modified), and file name. You can then switch directly using `:b <number>`.",
    hint: "Pay attention to the `+` sign – it indicates a modified buffer with unsaved changes.",
    level: "basic",
    codeExample: ":ls\n  1 %a   \"config.json\"         line 12\n  2 #h   \"README.md\"           line 5\n  3      + \"script.py\"           line 23"
  },
  {
    question: "What is the difference between the buffer list and the argument list?",
    shortAnswer: "The buffer list holds every file ever opened or created; the argument list is a subset – files passed at startup or set with `:args`.",
    explanation: "Argument list is like a playlist: you can navigate it with `:n` and `:prev`. Buffer list is like a library: it can contain many more files, including those opened later with `:e`. You can also add files to argument list dynamically.",
    hint: "Use `:args *.js` to replace argument list with all JS files – then `:n` walks through them even if they aren't currently in buffers.",
    level: "intermediate",
    codeExample: ":args src/*.c\n:n               // next in argument list\n:ls              // all buffers (maybe more than argument list)"
  },
  {
    question: "How do you switch to a buffer by name (or partial name) without typing the full number?",
    shortAnswer: "Use `:b part_of_name` and press Tab for completion.",
    explanation: "`:b` followed by a unique substring of the buffer name will jump directly. If not unique, Tab cycles through matches. This is much faster than remembering numbers.",
    hint: "Try `:b conf<Tab>` when you have `config.h`, `configure.ac`, etc.",
    level: "intermediate",
    codeExample: ":b index\n:b st<Tab>   // completes to 'styles.css' if unique\n:b mai      // might go to 'main.py' or 'mailer.rb' – use Tab to see options"
  },
  {
    question: "What does the Vim command `Ctrl+^` do?",
    shortAnswer: "Toggles between the current file and the alternate file (the previously edited buffer).",
    explanation: "The alternate file is usually the buffer you were last in before the current one. `Ctrl+^` (often written as `Ctrl+6`) provides a lightning-fast way to flip between two files – essential for comparing or cross-referencing.",
    hint: "Use after `:e #` or after switching buffers – `Ctrl+^` is the same as `:e #` but faster.",
    level: "intermediate",
    codeExample: ":e file1.txt\n:e file2.txt\nCtrl+^  // back to file1.txt\nCtrl+^  // back to file2.txt"
  },
  {
    question: "How can you close (delete) a buffer without closing Vim or affecting the file on disk?",
    shortAnswer: "Use `:bd` (buffer delete).",
    explanation: "`:bd` removes the buffer from the buffer list. The file itself is untouched. If the buffer was modified, Vim warns you; add `!` to force (e.g., `:bd!`). Useful for cleaning up after editing temporary files.",
    hint: "After `:bd`, the buffer number is gone. `:ls` will not show it. Use `:bufdo` only on buffers you intend to keep.",
    level: "intermediate",
    codeExample: ":bd 3\n:bd temp.log\n:bd!   // delete current buffer even with unsaved changes"
  },
  {
    question: "What does `:set hidden` do and why is it useful?",
    shortAnswer: "It allows switching to another buffer without saving the current one; the unsaved buffer becomes hidden.",
    explanation: "By default, Vim prevents you from abandoning a modified buffer (`:e` or `:b`) without saving or force. `:set hidden` lifts this restriction – the buffer stays in memory (hidden) with its changes. You can return later and save it. This mimics multi-file editors like Notepad++.",
    hint: "Think of hidden buffers as ‘background tabs’ that aren’t visible but still hold your work. Add `set hidden` to your `.vimrc` for smoother workflow.",
    level: "advanced",
    codeExample: ":set hidden\n:e file1.txt\n   (make changes)\n:b file2.txt   // no error, file1.txt becomes hidden\n:ls            // shows file1.txt as #h (hidden)\n:b file1.txt   // back, changes still there"
  },
  {
    question: "How can you run a command (like substitution) across all open buffers?",
    shortAnswer: "Use `:bufdo` followed by the command. Then optionally `:wall` to save all.",
    explanation: "`:bufdo` executes a command on every buffer in the buffer list. For example, `:bufdo %s/foo/bar/g | update` replaces 'foo' with 'bar' in all buffers and saves if changed. Powerful for large refactors.",
    hint: "Be careful: `:bufdo` applies to ALL buffers, including hidden ones. Use `:ls` first to see what you'll affect.",
    level: "advanced",
    codeExample: ":bufdo %s/Copyright 2023/Copyright 2025/g | update\n:bufdo set fileencoding=utf-8\n:bufdo normal @q    // play macro 'q' in every buffer"
  },
  {
    question: "What happens if you try to switch buffers with `:bnext` and the current buffer has unsaved changes?",
    shortAnswer: "By default, Vim will refuse and show an error. You must either save (`:w`), force (`:bnext!`), or enable `hidden`.",
    explanation: "Vim protects you from losing unsaved work. `:bnext!` discards changes (be careful). Better practice: `:set hidden` allows backgrounding without forcing.",
    hint: "Observe the error: 'No write since last change'. Use `:w` then `:bnext` or set `hidden` to avoid interruption.",
    level: "intermediate",
    codeExample: ":bnext\nE37: No write since last change (add ! to override)\n:bnext!\n:wnext        // save and go to next buffer"
  },
  {
    question: "How do you add more files to the argument list after starting Vim?",
    shortAnswer: "Use `:args` with the new list of files. Or `:argadd filename` (Vim 7+).",
    explanation: "`:args` replaces the entire argument list. To append, you can use `:argadd`. Example: `:argadd *.txt` adds all .txt files to the existing list.",
    hint: "After `:argadd`, `:n` will now cycle through both old and new files. Use `:args` to verify.",
    level: "advanced",
    codeExample: ":args config.h main.c\n:argadd test.c\n:args          // shows config.h main.c test.c\n:n             // goes to main.c"
  },
  {
    question: "What is the difference between `:e!` and `:bufdo!`?",
    shortAnswer: "`:e!` reloads the current buffer from disk discarding changes. `:bufdo!` forces the command execution (ignoring errors) across buffers.",
    explanation: "The `!` suffix varies by command. For `:e`, it means 'revert changes'. For `:bufdo`, it means 'execute even if errors occur in some buffers'.",
    hint: "Don't confuse the two. `:bufdo! %s/old/new/g` will continue substitution across buffers even if one buffer is read‑only.",
    level: "advanced",
    codeExample: ":e!                // revert current file\necho :bufdo! write   // force write on all buffers, skipping readonly errors"
  },
  {
    question: "How can you see which buffer is currently active (displayed)?",
    shortAnswer: "In `:ls` output, the active buffer is marked with `%a`.",
    explanation: "Also, the alternate file (previous buffer) shows `#h` or `#`. The current buffer number appears at the bottom of statusline (if enabled).",
    hint: "Run `:ls` and look for the `%a` marker. That's your current buffer.",
    level: "basic",
    codeExample: ":ls\n  1 %a   \"index.html\"         line 42\n  2       \"style.css\"           line 10"
  },
  {
    question: "What does `:buf #` do?",
    shortAnswer: "Switches to the alternate buffer (the one marked with `#` in `:ls`).",
    explanation: "It's equivalent to `:b#` or `Ctrl+^`. The `#` stands for the previous buffer. Useful when you know the previous file but not its number.",
    hint: "Combine with `:ls` to identify which buffer number is the alternate. For example, `:b #` is a synonym for `Ctrl+^`.",
    level: "intermediate",
    codeExample: ":e foo.txt\n:e bar.txt\n:buf #   // back to foo.txt"
  },
  {
    question: "How can you delete all buffers except the current one?",
    shortAnswer: "Use `:bufdo bd` followed by `:bd`.",
    explanation: "A classic trick: `:bufdo bd` tries to delete every buffer, but fails on the current one, leaving you with one buffer. After that, you can delete the current one separately.",
    hint: "Try `:bufdo bd!` then `:bd`. Or use `:%bdelete!` in newer Vim versions.",
    level: "advanced",
    codeExample: ":bufdo bd       // all except current\n:bd              // delete the remaining one"
  },
  {
    question: "What is the purpose of the `:set autowrite` option?",
    shortAnswer: "Automatically saves a buffer when moving to another file (`:n`, `:prev`, `:make`, etc.) if the buffer has been modified.",
    explanation: "It prevents the 'No write since last change' warning. Combined with `:set hidden`, it makes Vim behave like modern editors that auto‑save in background.",
    hint: "Add `set autowrite` to your vimrc for smoother multi‑file editing. But be aware – it writes silently.",
    level: "intermediate",
    codeExample: ":set autowrite\n:e file1.txt\n(change something)\n:n        // automatically writes file1.txt before opening next"
  },
  {
    question: "How do you go back to the previous buffer without using `Ctrl+^` or `:b#`?",
    shortAnswer: "Use `:e#` (edit alternate file).",
    explanation: "The `#` expands to the alternate file name. `:e#` is equivalent to `Ctrl+^`. Also `:b#` works. This is helpful in scripts or mappings.",
    hint: "Try `:e#` and `:e#` repeatedly – it toggles between the same two files.",
    level: "intermediate",
    codeExample: ":e fileA.txt\n:e fileB.txt\n:e#        // back to fileA.txt\n:e#        // back to fileB.txt"
  },
  {
    question: "Can you use `:b` with Tab completion to open a buffer that is not currently loaded from disk?",
    shortAnswer: "Yes, `:b` with a name that doesn't match any existing buffer will create a new empty buffer with that name.",
    explanation: "If you type `:b newfile.txt` and no buffer named 'newfile.txt' exists, Vim creates an empty buffer. When you write it, a new file appears on disk.",
    hint: "This is a quick way to start a new file without leaving your current editing session.",
    level: "intermediate",
    codeExample: ":b notes.md\n(contents)\n:w         // creates notes.md on disk"
  },
  {
    question: "What is a hidden buffer and how can you list only hidden buffers?",
    shortAnswer: "A hidden buffer has unsaved changes but is not displayed in any window. `:ls` shows them with 'h' marker.",
    explanation: "Listing only hidden buffers can be done with `:filter /h/ ls` or using `:ls!` (shows all, but you can parse). Hidden buffers consume memory; clean them with `:bd` if no longer needed.",
    hint: "Observe `:ls` – buffers marked `h` (or `ah` for active+hidden) are hidden. Use `:bufdo bd` on hidden buffers only is tricky; better to manually delete.",
    level: "advanced",
    codeExample: ":set hidden\n:e foo\n(change)\n:b bar\n:ls\n  1 #h   \"foo\"   // hidden\n:bd 1\n:ls            // buffer gone"
  }
];

export default questions;