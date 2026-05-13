// topic3_questions.js – 20 FAQ questions about Normal mode navigation
// Topic: h, j, k, l, w, b, 0, $, gg, G and related movements

const questions = [
  {
    question: "Why should I use `h j k l` instead of arrow keys in vi?",
    shortAnswer: "Arrow keys require moving your right hand off the home row; `hjkl` keep fingers on `jkl;` for faster, more ergonomic editing.",
    explanation: "Touch typists place their right hand on `j k l ;`. By using `hjkl`, you never move your hand to the arrow cluster, reducing fatigue and improving speed. Many expert vi users disable arrow keys in `.vimrc` to force this habit.",
    hint: "Try covering the arrow keys with a sticky note for a day. You'll adapt quickly.",
    level: "moderate",
    codeExample: "`4j` moves down 4 lines; `2h` moves left 2 characters – all from home row."
  },
  {
    question: "What is the difference between `w` and `W`?",
    shortAnswer: "`w` moves to the start of the next word (alphanumeric + underscore), stopping at punctuation. `W` moves to the start of the next WORD (separated only by whitespace).",
    explanation: "In vi, a 'word' consists of letters, digits, and underscores. Punctuation like `. , ; :` stops `w`. A 'WORD' is any non‑whitespace sequence. For paths like `/usr/local/bin`, `W` treats the whole path as one WORD, while `w` stops at each slash.",
    hint: "Test on `foo_bar.baz` with `w` (stops at underscore, dot) vs `W` (stops only at spaces).",
    level: "moderate",
    codeExample: "Line 'hello.world' cursor at 'h' → `w` stops at '.'; `W` stops at end of 'hello.world'."
  },
  {
    question: "What does `0` (zero) do, and how is it different from `^`?",
    shortAnswer: "`0` moves to the first column (column 0) of the line. `^` moves to the first non‑blank character of the line.",
    explanation: "Use `0` to jump to the absolute beginning, e.g., to add a `#` at column 0. Use `^` to jump to the start of text after indentation, which is more common when editing code.",
    hint: "Try on a line that starts with spaces: `0` goes to column 0; `^` goes to the first letter.",
    level: "moderate",
    codeExample: "Line '    hello' → `0` puts cursor on first space; `^` puts cursor on 'h'."
  },
  {
    question: "How do `$` and `g_` differ?",
    shortAnswer: "`$` moves to the last character of the line (including trailing spaces). `g_` moves to the last non‑blank character of the line.",
    explanation: "`$` is useful when you want to append after the last character (use `A` for that). `g_` is better for jumping to the end of visible text, ignoring trailing whitespace. `g_` is a vim extension, not in original vi.",
    hint: "Use `g_` before a delete or yank to avoid grabbing unwanted spaces.",
    level: "expert",
    codeExample: "Line 'hello   ' (three spaces) → `$` on last space; `g_` on 'o'."
  },
  {
    question: "What does `gg` do, and how is it different from `G`?",
    shortAnswer: "`gg` moves the cursor to the first line of the file. `G` moves to the last line of the file.",
    explanation: "Both commands can take a count: `5gg` or `5G` move to line 5. Without a count, `gg` goes to line 1, `G` goes to last line.",
    hint: "Use `gg` to quickly start editing from the top; `G` to jump to the bottom of a log file.",
    level: "beginner",
    codeExample: "`gg` → line 1; `G` → last line; `10gg` → line 10."
  },
  {
    question: "How can I move to a specific line number efficiently?",
    shortAnswer: "Type the line number followed by `G` (e.g., `42G`) or use `:42` in Command mode.",
    explanation: "`42G` in Normal mode jumps to line 42. Alternatively, `:42` (Enter) in Command mode does the same. Both are equally valid; `G` with count is often faster because you stay in Normal mode.",
    hint: "If you have line numbers displayed (`:set number`), you can see the target line.",
    level: "moderate",
    codeExample: "`G` alone goes to end; `1G` is same as `gg`."
  },
  {
    question: "What is the difference between `e` and `w`?",
    shortAnswer: "`w` moves to the start of the next word; `e` moves to the end of the current word (or next word if at end).",
    explanation: "`e` is useful when you want to change the end of a word (e.g., replace suffix). Combine with `c` (change) to delete from cursor to word end: `ce`.",
    hint: "Compare on 'hello world' starting at 'h': `w` → 'w' of 'world'; `e` → 'o' of 'hello'.",
    level: "moderate",
    codeExample: "Cursor on 's' of 'testing' → `e` moves to 'g'; `w` moves to start of next word."
  },
  {
    question: "How do I move the cursor to the middle of the screen without using the mouse?",
    shortAnswer: "Use `M` (Middle) – it moves the cursor to the line in the middle of the current viewport.",
    explanation: "`H` moves to the top line of the screen, `M` to the middle, `L` to the bottom. These are extremely useful for navigating large files without losing context.",
    hint: "`H`, `M`, `L` are not file‑based jumps; they are relative to what you see on screen.",
    level: "moderate",
    codeExample: "After scrolling down, `M` jumps to center line, keeping your place roughly in the middle."
  },
  {
    question: "What does `ctrl-d` and `ctrl-u` do?",
    shortAnswer: "`ctrl-d` scrolls down half a page (forwards). `ctrl-u` scrolls up half a page (backwards).",
    explanation: "These half‑page scrolls keep more context than full page jumps (`ctrl-f`/`ctrl-b`). Many vi users prefer them for smoother navigation.",
    hint: "The number of lines scrolled can be customized with `scroll` option.",
    level: "moderate",
    codeExample: "`ctrl-d` moves view down ½ screen; cursor tries to stay near same relative position."
  },
  {
    question: "How can I move the cursor to the beginning of the previous sentence or paragraph?",
    shortAnswer: "Use `(` for previous sentence, `{` for previous paragraph. Use `)` and `}` for next sentence/paragraph.",
    explanation: "Sentence boundaries are defined by `. ! ?` followed by space or newline. Paragraphs are separated by blank lines. These motions are great for editing prose or documentation.",
    hint: "Not all vi implementations support sentence/paragraph objects; vim does.",
    level: "expert",
    codeExample: "In a text file, `{` jumps back to the last blank line; `}` jumps forward."
  },
  {
    question: "What does `%` do?",
    shortAnswer: "`%` jumps to the matching parenthesis, bracket, or brace.",
    explanation: "If the cursor is on `(`, `[`, `{`, `)`, `]`, or `}`, `%` moves to the matching counterpart. It is invaluable for navigating code blocks.",
    hint: "Use `%` to find the closing brace of a long function without counting.",
    level: "moderate",
    codeExample: "Cursor on the first `{` of a C function → `%` jumps to the matching `}`."
  },
  {
    question: "How do I move by `count` lines quickly? Ex: jump 10 lines down.",
    shortAnswer: "Type `10j` (down 10 lines) or `10k` (up 10 lines).",
    explanation: "Any movement command can be prefixed with a number. This is a core vi principle: `[count]command`.",
    hint: "Practice `3w`, `5b`, `2gg` to build muscle memory for counted moves.",
    level: "beginner",
    codeExample: "`8j` moves down 8 lines; `4k` moves up 4 lines."
  },
  {
    question: "What is the difference between `hjkl` and arrow keys when `wrap` is enabled?",
    shortAnswer: "`j` and `k` move to the next/previous *screen* line when `wrap` is on, while arrow keys (and `gj`/`gk`) move to the next/previous *physical* line.",
    explanation: "In vim, `j` moves down one logical line (by line number). If `wrap` is on, a long line may occupy multiple screen rows. `gj` moves down one screen row. Arrow keys in vim behave like `gj`/`gk` by default, causing confusion.",
    hint: "Use `gj` and `gk` to move visually on wrapped lines. Many set `nnoremap j gj` in .vimrc.",
    level: "expert",
    codeExample: "Long line wrapped twice: `j` jumps to next line number; `gj` moves down one screen row."
  },
  {
    question: "How can I quickly move to the next occurrence of a character on the same line?",
    shortAnswer: "Use `f` (find forward) or `F` (find backward), e.g., `fa` jumps to the next 'a' on the line.",
    explanation: "`f` places the cursor on the found character. `t` (till) places the cursor just before the character. `;` repeats the last `f`/`F`/`t`/`T` in the same direction; `,` repeats opposite direction.",
    hint: "Combine with `d` to delete until a character: `dt,` deletes from cursor to before the next comma.",
    level: "moderate",
    codeExample: "Line 'hello world' cursor at 'h' → `fo` jumps to 'o' of 'hello'; `;` jumps to 'o' of 'world'."
  },
  {
    question: "What does `''` (two single quotes) do?",
    shortAnswer: "`''` jumps back to the exact position (line and column) before the last jump.",
    explanation: "Vi remembers your previous cursor position. `''` returns you to that spot. The backtick `` ` `` does the same but also restores column. Very useful when exploring a file then returning to where you were editing.",
    hint: "After using `G` to go to bottom, `''` brings you back to previous line. Try it.",
    level: "expert",
    codeExample: "Line 42, do `G` (end), then `''` → back to line 42."
  },
  {
    question: "How do I move to the top of the screen without changing the file position?",
    shortAnswer: "Use `H` (High) – it moves cursor to the top line of the current window view.",
    explanation: "`H`, `M`, `L` are relative to your current scroll position. They do not change the file's absolute line numbers; they just reposition the cursor within the visible area.",
    hint: "Combine `H` with `zt` (scroll to top) to align the window.",
    level: "moderate",
    codeExample: "Scrolled down, press `H` → cursor jumps to the first visible line on screen."
  },
  {
    question: "What is the difference between `ctrl-e` and `ctrl-y`?",
    shortAnswer: "`ctrl-e` scrolls the window down (lines move up), `ctrl-y` scrolls the window up (lines move down).",
    explanation: "These commands scroll the view without moving the cursor (unless it would go off screen). Useful for reading while keeping cursor on a reference line.",
    hint: "`ctrl-e` is 'extra' line down; `ctrl-y` is 'yank' line up (mnemonic).",
    level: "expert",
    codeExample: "Hold `ctrl-e` to smoothly scroll through a file while cursor stays on the same line number."
  },
  {
    question: "What does `ge` (or `gE`) do?",
    shortAnswer: "`ge` moves backward to the end of the previous word. `gE` moves backward to the end of the previous WORD.",
    explanation: "These complement `e` and `E` for forward movement. `ge` is useful for moving to the end of the word you just passed.",
    hint: "Try: cursor at end of line, `ge` jumps to end of previous word.",
    level: "expert",
    codeExample: "Line 'abc def' cursor after 'f' → `ge` → cursor after 'c' (end of 'abc')."
  },
  {
    question: "How can I remember that `h` is left and `l` is right?",
    shortAnswer: "`h` is left because it's the leftmost of `hjkl` on the keyboard. `l` is rightmost. Mnemonic: 'h' stands for 'left' (no), but in many terminal programs, `h` is backspace, so it moves left.",
    explanation: "The keys are arranged on the keyboard: `h` is left, `j` points down (descender), `k` points up (ascender), `l` is right. Visualize the arrow keys in a row.",
    hint: "Place a small sticker with arrows on your keyboard until you memorize.",
    level: "beginner",
    codeExample: "No code needed – just practice `hhhh` moves left, `llll` moves right."
  },
  {
    question: "What is the fastest way to move to the first line of the file and delete it?",
    shortAnswer: "`ggdd` – `gg` goes to first line, `dd` deletes the line.",
    explanation: "This combines two commands: movement then delete. `gg` works even if you are far from the top. `dd` works on the current line.",
    hint: "To delete the last line: `Gdd`. To delete first 5 lines: `gg5dd`",
    level: "moderate",
    codeExample: "`gg` then `dd` → deletes line 1. `gg5dd` deletes lines 1 through 5."
  }
];

export default questions;