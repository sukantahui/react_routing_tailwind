// topic7_questions.js – 20 FAQ questions about undo and redo

const questions = [
  {
    question: "What does `u` do in Normal mode?",
    shortAnswer: "Undoes the last change.",
    explanation: "`u` reverts the most recent edit. Each press undoes one more step backward in the history. In vim, you can undo many steps – not just one.",
    hint: "Try making several changes and press `u` repeatedly to see each undone.",
    level: "beginner",
    codeExample: "Insert 'hello', then `u` → 'hello' disappears."
  },
  {
    question: "What is the difference between `u` and `U`?",
    shortAnswer: "`u` undoes the last change. `U` undoes all changes made to the current line, restoring it to its original state.",
    explanation: "`U` is a line‑wide undo. It's useful if you've messed up a line and want to start over without leaving the line. Be careful: it discards all changes since you last arrived on that line.",
    hint: "Use `U` only when you want to reset an entire line completely.",
    level: "moderate",
    codeExample: "Line 'foo', change to 'bar', then to 'baz', then `U` → back to 'foo'."
  },
  {
    question: "How do I redo after an undo in vim?",
    shortAnswer: "Press `Ctrl+R` (hold Ctrl and press R).",
    explanation: "`Ctrl+R` reverses an undo. If you undo too much, `Ctrl+R` brings back the changes. This works in vim; plain vi may not have redo.",
    hint: "Remember: `u` undoes, `Ctrl+R` redoes.",
    level: "moderate",
    codeExample: "Type 'a', `u` (undo), `Ctrl+R` → 'a' returns."
  },
  {
    question: "Can I undo multiple steps at once?",
    shortAnswer: "Yes, use a count: `3u` undoes the last three changes.",
    explanation: "Counts work with `u` just like other commands. This is faster than pressing `u` three times.",
    hint: "Try `5u` to go back 5 steps.",
    level: "moderate",
    codeExample: "Make 3 changes: `3u` undoes all 3."
  },
  {
    question: "Does vi remember undo history after saving?",
    shortAnswer: "Yes, in vim the undo history persists after `:w` (write). In classic vi, undo may be limited after save.",
    explanation: "Vim retains the undo tree across writes. You can undo changes that were made before the last save. This is very powerful.",
    hint: "Test: edit, save (`:w`), edit more, then `u` – it undoes the last edit, not the save.",
    level: "expert",
    codeExample: "Change A, `:w`, change B, `u` → reverts to A (still after save)."
  },
  {
    question: "What happens if I press `u` in Insert mode?",
    shortAnswer: "It types the letter 'u' into the file – it does not undo.",
    explanation: "Undo only works in Normal mode. If you are typing and need to undo, press `ESC` first to go to Normal mode, then `u`.",
    hint: "Always `ESC` before undo.",
    level: "beginner",
    codeExample: "In Insert mode: `u` prints 'u'. `ESC` then `u` undoes."
  },
  {
    question: "Does vi support redo in plain vi (not vim)?",
    shortAnswer: "Traditional vi does not have a built‑in redo command. Some implementations (nvi) may support `.` to repeat, but not redo.",
    explanation: "Redo (`Ctrl+R`) is a vim extension. In classic vi, you cannot redo an undo. You would need to re‑type or use other recovery methods.",
    hint: "If you use strict vi, be careful not to undo too much.",
    level: "expert",
    codeExample: "In nvi, `u` undoes, but no `Ctrl+R`; you must redo manually."
  },
  {
    question: "What does `:undolist` show?",
    shortAnswer: "Shows the list of undo branches and their positions (vim only).",
    explanation: "Vim maintains a tree of changes if you undo then make a new change. `:undolist` helps navigate branches. Advanced users can use `:undo n` to jump to a specific state.",
    hint: "Explore `:help undo-tree` for advanced usage.",
    level: "expert",
    codeExample: "`:undolist` → displays number of undo leaves."
  },
  {
    question: "How can I undo all changes since the last save?",
    shortAnswer: "Use `:e!` (edit with force) – it reloads the file, discarding all changes since last save.",
    explanation: "`e!` (edit!) abandons modifications and reloads from disk. This is more drastic than `u`, but useful when you've made a mess.",
    hint: "Be careful: `:e!` cannot be undone (you lose all unsaved changes).",
    level: "moderate",
    codeExample: "After multiple edits, `:e!` reverts to last saved version."
  },
  {
    question: "What is the difference between `u` and `:undo`?",
    shortAnswer: "`u` is a Normal mode command. `:undo` is an Ex command that does the same thing (undo one change).",
    explanation: "You can also use `:undo 5` to undo to a specific change number (from `:undolist`). This is more precise but less common.",
    hint: "Stick with `u` for everyday use.",
    level: "expert",
    codeExample: "`:undo` same as `u`; `:undo 2` undoes two changes."
  },
  {
    question: "Can I undo a yank operation?",
    shortAnswer: "Yanking (copying) does not change the buffer, so it doesn't affect undo history. You cannot 'undo' a yank because it doesn't modify text.",
    explanation: "Undo only tracks changes that alter the file content. Movements, yanks, and searches are not recorded.",
    hint: "Don't worry about undoing yanks – they are harmless.",
    level: "moderate",
    codeExample: "`yy` then `u` does nothing regarding the yank (undo may affect previous edit)."
  },
  {
    question: "Does `U` affect the entire line even if I moved the cursor?",
    shortAnswer: "Yes, `U` restores the line to the state it was in when you first arrived on it (or last saved).",
    explanation: "The line's original state is remembered. Even if you have moved away and come back, `U` will revert to that line's original content when you started editing the file.",
    hint: "`U` is line‑specific and powerful – use deliberately.",
    level: "moderate",
    codeExample: "Line 'A', change to 'B', move away, come back, `U` → back to 'A'."
  },
  {
    question: "How can I redo a specific number of times?",
    shortAnswer: "Use a count with `Ctrl+R`: `3Ctrl+R` redoes the last three undos.",
    explanation: "Just like `u` with count, `Ctrl+R` accepts a count. Very handy for stepping forward multiple steps.",
    hint: "Try `5Ctrl+R` to fast‑forward through five undone steps.",
    level: "moderate",
    codeExample: "Undo 3 changes, then `3Ctrl+R` redoes them all."
  },
  {
    question: "What is the undo tree in vim?",
    shortAnswer: "Vim stores branches of undo history when you undo and then make a new change, creating a tree instead of a linear list.",
    explanation: "In most editors, undo is linear. Vim allows you to go back to a state, make a new change, and still return to the 'alternate future'. Navigate with `:undolist` and `:undo n`.",
    hint: "This is advanced, but once you understand it, you can experiment fearlessly.",
    level: "expert",
    codeExample: "Change A, B, undo to A, change C → now you have two branches (B and C)."
  },
  {
    question: "How do I move between branches in the undo tree?",
    shortAnswer: "Use `:undo n` where n is a change number from `:undolist`. Or use `:earlier` and `:later` with time specifications.",
    explanation: "You can also use `g-` and `g+` to move through the tree (vim). This is more intuitive for navigating branches.",
    hint: "Explore `:help undo` for the full power.",
    level: "expert",
    codeExample: "`:earlier 5m` goes back 5 minutes; `:later 1m` goes forward."
  },
  {
    question: "Can I undo changes made in another session?",
    shortAnswer: "No, undo history is cleared when you close vi. Persistent undo can be enabled in vim with `:set undofile`.",
    explanation: "With `undofile`, vim saves undo history to disk. Next time you open the same file, you can undo changes from previous sessions. Very useful for long projects.",
    hint: "Add `set undofile` to .vimrc and `set undodir=~/.vim/undo`.",
    level: "expert",
    codeExample: "`set undofile` → after restart, `u` can undo previous session's changes."
  },
  {
    question: "What does `:later` do?",
    shortAnswer: "Moves forward in time (redo) to a specified amount, e.g., `:later 3s` redoes changes from the last 3 seconds.",
    explanation: "`:later` is like a time‑based redo. It's part of vim's time‑based undo/redo. Useful to jump to a known time state.",
    hint: "Combine with `:earlier` to navigate by time.",
    level: "expert",
    codeExample: "`:later 10m` goes forward 10 minutes in undo history."
  },
  {
    question: "Why does `u` sometimes undo more than one change in Insert mode?",
    shortAnswer: "Each time you enter and leave Insert mode is considered one 'change' for undo. So all typing done in a single Insert session is undone together.",
    explanation: "If you type 'hello world' without leaving Insert mode, `u` undoes the entire 'hello world'. To undo character by character, use `Ctrl+W` (delete word) in Insert mode, or use `gU` etc.",
    hint: "Press `ESC` frequently to break typing into smaller undo chunks.",
    level: "moderate",
    codeExample: "Type 'hello', `ESC`, type ' world', `u` → removes ' world' only (not 'hello')."
  },
  {
    question: "What is `g-` and `g+`?",
    shortAnswer: "`g-` and `g+` are Normal mode commands to go backward and forward through the undo tree (vim).",
    explanation: "`g-` is like `u` but works across branches; `g+` is like `Ctrl+R` but also works across branches. They are more predictable in the undo tree than `u`.",
    hint: "If you work with undo branches, use `g-` and `g+`.",
    level: "expert",
    codeExample: "After creating a branch, `g-` moves to previous state in the tree."
  },
  {
    question: "Is there a visual indication of undo/redo?",
    shortAnswer: "Not by default, but you can enable `set lazyredraw` or use plugins. Usually there's no indication – you see the text change.",
    explanation: "Vim does not pop up a message when you undo. You just see the text revert. Some users add a mapping to show a message, but it's not standard.",
    hint: "Trust the visual change – watch the screen.",
    level: "expert",
    codeExample: "No code example – just observe the text."
  }
];

export default questions;