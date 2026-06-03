const questions = [
  {
    question: "What is a macro in Vim?",
    shortAnswer: "A recorded sequence of keystrokes stored in a register that can be replayed.",
    explanation: "Macros automate repetitive editing. You record your actions into a register (a‑z), then replay them with `@`.",
    hint: "Think of it as a 'macro recorder' like in spreadsheets, but for text editing.",
    level: "basic",
    codeExample: "qa           // start recording into register a\n... actions ...\nq            // stop\n@a           // replay once"
  },
  {
    question: "How do I start recording a macro?",
    shortAnswer: "Press `q` followed by a register letter (e.g., `qa`).",
    explanation: "Vim enters recording mode. The status line shows 'recording @a'. Everything you type (Normal, Insert, Command) is stored.",
    hint: "Capital letter (e.g., `qA`) appends to an existing macro.",
    level: "basic",
    codeExample: "qa\nqq\nq1   (numbers also work, but letters are typical)"
  },
  {
    question: "How do I stop recording?",
    shortAnswer: "Press `q` again (while still in Normal mode).",
    explanation: "If you're in Insert mode, press `<Esc>` first, then `q`. The 'recording' indicator disappears.",
    hint: "You can also stop by typing `:stoprecording` but `q` is faster.",
    level: "basic",
    codeExample: "qa      // start\niHello<Esc>\nq       // stop"
  },
  {
    question: "How do I replay a macro?",
    shortAnswer: "Use `@` followed by the register letter (e.g., `@a`).",
    explanation: "To repeat multiple times, prefix with a number: `10@a`. The last used macro can be replayed with `@@`.",
    hint: "If you recorded into register q, `@q` then `@@` repeats it.",
    level: "basic",
    codeExample: "@a\n5@a\n@@"
  },
  {
    question: "Can I see what keystrokes are stored in a macro?",
    shortAnswer: "Yes, use `:reg a` (or `:reg` to see all registers).",
    explanation: "It shows the literal keystrokes, including escape sequences (shown as `^[`). This helps debug macros.",
    hint: "Special keys like `<Esc>` appear as `^[`. You can copy and paste the content to edit it.",
    level: "intermediate",
    codeExample: ":reg a\n:let @a = 'ddj'   // manually set macro"
  },
  {
    question: "How do I edit a macro manually?",
    shortAnswer: "Paste the register content into a buffer, edit, then yank back.",
    explanation: "Use `\"ap` to put the macro into the buffer, edit the text, then select and `\"ay` to put it back into register a.",
    hint: "Make sure to escape special characters correctly (e.g., `<Esc>` as `^[`).",
    level: "advanced",
    codeExample: "\"ap          // paste macro content\n... edit ...\nviw\"ay       // yank back into register a"
  },
  {
    question: "What does `@@` do?",
    shortAnswer: "Replays the last used macro again.",
    explanation: "After running `@a`, `@@` is equivalent to `@a`. After `@b`, `@@` runs `@b`. Very fast for iterative replay.",
    hint: "Use `@@` repeatedly to step through a file manually.",
    level: "basic",
    codeExample: "@a\n@@   // same as @a\n"
  },
  {
    question: "How can I make a macro repeat on multiple lines automatically?",
    shortAnswer: "End the macro with a motion that moves to the next target (e.g., `j` or `/pattern<CR>`).",
    explanation: "Then you can replay with a count: `100@a`. If the macro includes `j` at the end, it will move down each time.",
    hint: "Also ensure the macro doesn't fail on the last line (use `:silent!` to ignore errors).",
    level: "intermediate",
    codeExample: "qa\nI# <Esc>\njq    // adds # at start of line and moves down\n100@a"
  },
  {
    question: "Can I use a macro during recording?",
    shortAnswer: "Yes, you can call another macro or even the same macro recursively.",
    explanation: "Be careful of infinite loops. Typically used for nested automation.",
    hint: "Recursive macro pattern: `qq ... @q q` then `@q` – it repeats until failure.",
    level: "advanced",
    codeExample: "qq\n:echo 'hello'<CR>\n@q\nq   // infinite loop unless stopped by condition"
  },
  {
    question: "How do I stop a macro that is running away (infinite loop)?",
    shortAnswer: "Press `Ctrl+C` or `Ctrl+Break` (sometimes `Ctrl+[`).",
    explanation: "This interrupts macro execution. You may need to spam `Ctrl+C` a few times.",
    hint: "Avoid infinite loops by ensuring a search fails or using a counter.",
    level: "intermediate",
    codeExample: ":echo 'running...'\nCtrl+C   // interrupts"
  },
  {
    question: "Can macros include Command mode commands?",
    shortAnswer: "Yes, any ex command (starting with `:`) can be part of a macro.",
    explanation: "Example: `:w` to save, `:n` to go to next file, `:s/foo/bar/g` etc. They are recorded exactly as typed.",
    hint: "End command mode with `<CR>` – Vim records that as `^M`.",
    level: "intermediate",
    codeExample: "qq\n:w\n:n\nq   // macro that saves and goes to next file"
  },
  {
    question: "How do I store a macro in my .vimrc for permanent use?",
    shortAnswer: "Use `let @a = '...'` where the string contains the exact keystrokes.",
    explanation: "To escape special characters, record the macro first, then `:reg a`, copy the content, and paste it inside single quotes, escaping any backslashes or quotes.",
    hint: "For readability, write macros using `:normal` commands: `let @a = \"Ihello\<Esc>j\"`.",
    level: "advanced",
    codeExample: "let @a = 'IHello world!\\<Esc>j'\n\" then @a will insert 'Hello world!' at line start and move down"
  },
  {
    question: "What is the difference between `q` and `q` with capital letter?",
    shortAnswer: "Lowercase starts recording (or stops). Capital letter (e.g., `qA`) appends to an existing macro in register a.",
    explanation: "Useful for building macros incrementally without overwriting.",
    hint: "You can also use `qA` even if register a is empty – it works like `qa`.",
    level: "intermediate",
    codeExample: "qa\nA; <Esc>\nq\nqA\nA <Esc>\nq   // now macro a appends '; ' and then a space"
  },
  {
    question: "Can macros be used across multiple files?",
    shortAnswer: "Yes, macros are stored in registers and persist when you switch buffers or files (within the same Vim session).",
    explanation: "You can record a macro in one file, then open another file and replay it. Macros are not global by default; they are stored in the register, which is session-based.",
    hint: "To make a macro available permanently, store it in .vimrc or source a file that defines it.",
    level: "advance",
    codeExample: ":sp anotherfile.txt\n@a   // replay macro from current session"
  },
  {
    question: "How do I run a macro on a range of lines?",
    shortAnswer: "Use `:normal` with a range: `:4,8normal @a` runs macro a on lines 4 through 8.",
    explanation: "Each line is processed independently, with the cursor moved to the beginning of the line before the macro runs.",
    hint: "Use `:.,+5normal @a` for relative range.",
    level: "advanced",
    codeExample: ":10,20normal @a\n:'<,'>normal @a   // in visual mode"
  },
  {
    question: "Why does my macro stop after a few repetitions?",
    shortAnswer: "A command inside the macro failed (e.g., search not found, move beyond end of file).",
    explanation: "Vim stops macro execution on any error. Use `:silent!` inside the macro to ignore errors and continue.",
    hint: "Add `:silent!` before commands that might fail, like `:silent! /pattern`.",
    level: "intermediate",
    codeExample: "qq\n:silent! /XXX\nnormal dd\nq"
  },
  {
    question: "Can I use macros in Insert mode?",
    shortAnswer: "You can replay a macro from Insert mode using `<C-o>@a` (Ctrl+O followed by @a).",
    explanation: "`<C-o>` allows one Normal mode command, then returns to Insert. This is useful for inserting pre-recorded boilerplate.",
    hint: "You can also use `<C-r>a` to insert the contents of register a (as text, not as macro).",
    level: "advanced",
    codeExample: "iStart <C-o>@a<C-o>@a   // replays macro twice within Insert mode"
  },
  {
    question: "How do I record a macro without leaving a beeping sound?",
    shortAnswer: "Disable error beeps with `:set noerrorbells` or `:set visualbell`.",
    explanation: "By default, Vim beeps on errors, which can happen during macros. Turn it off for silent recording.",
    hint: "Add `set noerrorbells` to .vimrc.",
    level: "basic",
    codeExample: ":set noerrorbells\n:set visualbell t_vb="
  },
  {
    question: "What is the maximum length of a macro?",
    shortAnswer: "Limited by available memory and the maximum register size (usually thousands of characters).",
    explanation: "In practice, you can record very long macros, but it's better to break them into smaller pieces.",
    hint: "Use `:reg a` to check the size. If it's huge, consider refactoring.",
    level: "basic",
    codeExample: ":echo len(@a)   // shows number of characters in register a"
  },
  {
    question: "How do I transfer a macro from one Vim session to another?",
    shortAnswer: "Write the register to a file: `:redir @+> macrodump.txt | silent reg a | redir END`, then source or copy.",
    explanation: "Simpler: record macro, then `:let @a='...'` as shown earlier, and paste that line into the target's .vimrc.",
    hint: "Use `:redir` to capture register contents into a file.",
    level: "advanced",
    codeExample: ":redir! > ~/macro.txt\n:reg a\n:redir END\n// then edit macro.txt"
  }
];

export default questions;