// topic5_questions.js – 20 FAQ questions about exiting vi/vim

const questions = [
  {
    question: "What is the most basic command to quit vi?",
    shortAnswer: "`:q` (colon q) – but it fails if there are unsaved changes.",
    explanation: "From Normal mode, press `:` to enter Command mode, then type `q` and press Enter. Vi will quit only if no modifications have been made since the last save.",
    hint: "If you see 'No write since last change', you need `:q!` or to save first.",
    level: "beginner",
    codeExample: "`ESC :q Enter`"
  },
  {
    question: "How do you force quit vi without saving?",
    shortAnswer: "Use `:q!` (colon q bang). It discards all changes and exits immediately.",
    explanation: "The exclamation mark overrides the safety check. It's the universal 'get me out of here' command. Use it when you've made a mess and just want to start over.",
    hint: "Memorize `:q!` as your emergency exit before you learn anything else.",
    level: "beginner",
    codeExample: "`ESC :q! Enter`"
  },
  {
    question: "What is the difference between `:wq` and `:x`?",
    shortAnswer: "Both save and quit. `:wq` always writes the file (updates modification time). `:x` writes only if the file was modified.",
    explanation: "If you open a file, make no changes, and type `:wq`, the file's timestamp updates unnecessarily. `:x` (or `ZZ`) avoids this, which can be important for build systems or backup scripts that rely on timestamps.",
    hint: "Use `:x` or `ZZ` for a 'smart' save and quit.",
    level: "moderate",
    codeExample: "`:x` = write if modified + quit; `:wq` = always write + quit."
  },
  {
    question: "What does `ZZ` do and why is it special?",
    shortAnswer: "`ZZ` saves (if modified) and quits, all from Normal mode – no colon, no Enter.",
    explanation: "`ZZ` is a Normal mode command (not ex command). It's the fastest exit: just two uppercase Z's. It behaves like `:x`. Very handy for quick edits.",
    hint: "Make sure you are in Normal mode (press ESC) then type `ZZ` (shift+z twice).",
    level: "moderate",
    codeExample: "`ESC ZZ` is enough to save and quit."
  },
  {
    question: "What happens if you type `:q` when there are unsaved changes?",
    shortAnswer: "Vi refuses to quit and shows an error: 'No write since last change'.",
    explanation: "Vi protects you from accidentally losing work. You must either save (`:w`) then quit, or force quit (`:q!`) to discard changes.",
    hint: "Read the error message carefully – it tells you what to do.",
    level: "beginner",
    codeExample: "`:q` -> 'E37: No write since last change (add ! to override)'"
  },
  {
    question: "Can I exit vi without using the colon?",
    shortAnswer: "Yes, use `ZZ` (save and quit) or `ZQ` (quit without saving – vim only).",
    explanation: "`ZQ` is a vim‑specific shortcut for `:q!`. It's less known but useful. In original vi, only `ZZ` works.",
    hint: "`ZQ` = quit without saving, `ZZ` = save and quit. Both from Normal mode.",
    level: "expert",
    codeExample: "`ESC ZQ` forces quit without saving (vim)."
  },
  {
    question: "How can I save a file and stay in vi (without quitting)?",
    shortAnswer: "Use `:w` (write). You can keep editing after saving.",
    explanation: "Saving frequently is a good habit. `:w` writes the current buffer to disk. You can then continue typing. Use `:w filename` to save to a different name.",
    hint: "Map `:w` to a function key if you want, but better to get used to typing it.",
    level: "moderate",
    codeExample: "`:w` saves; `:w newname.txt` saves as newname.txt."
  },
  {
    question: "What is the difference between `:wq!` and `:wq`?",
    shortAnswer: "`:wq!` forces the write even if the file is read‑only (if you have permissions to override via sudo, etc.), then quits.",
    explanation: "The `!` in `:wq!` forces the write. For example, if you opened a file without write permission but you are root, `:wq!` can still write. `:wq` would fail.",
    hint: "Generally you don't need `:wq!`; `:wq` is enough for normal files.",
    level: "expert",
    codeExample: "`:wq!` forces write even if file permissions say read‑only (if you have system permission)."
  },
  {
    question: "How can I exit vi if the keyboard is frozen or behaving weirdly?",
    shortAnswer: "Press `Ctrl+C` (interrupt) to cancel any partial command, then `ESC` several times, then `:q!`.",
    explanation: "Sometimes you may be in Insert mode and have typed a partial colon command. `Ctrl+C` returns to Normal mode and aborts the command line. Then `:q!` works.",
    hint: "As a last resort, kill the terminal session, but that leaves swap files.",
    level: "expert",
    codeExample: "`Ctrl+C` `ESC` `:q!` Enter"
  },
  {
    question: "What does `:cq` do?",
    shortAnswer: "`:cq` quits vi with a non‑zero exit code (failure), used in scripts to indicate an error.",
    explanation: "This is an advanced command. If you are writing a script that calls vi and you want to signal failure (e.g., compilation errors), `:cq` makes vi exit with code 1.",
    hint: "Not for daily use – mostly for automation.",
    level: "expert",
    codeExample: "`:cq` causes echo $? to return 1 (error)."
  },
  {
    question: "What is the easiest way to save and quit for a beginner?",
    shortAnswer: "`:wq` (write and quit) is clear and works everywhere.",
    explanation: "While `ZZ` is faster, `:wq` is easier to remember: write then quit. Forcing with `:q!` is also essential for emergency exits.",
    hint: "Practice both `:wq` and `:q!` until they're automatic.",
    level: "beginner",
    codeExample: "`ESC :wq Enter`"
  },
  {
    question: "What happens if I type `:x` on a file that hasn't been changed?",
    shortAnswer: "`:x` will not write the file; it simply quits, leaving the file unchanged and timestamp intact.",
    explanation: "This is the key difference from `:wq`. Many build systems check timestamps; avoiding unnecessary writes speeds up compiles.",
    hint: "Use `:x` as your default save+quit for smart behavior.",
    level: "moderate",
    codeExample: "Open file, type `:x` immediately → quits without writing."
  },
  {
    question: "Is there a way to quit vi and save only if there are errors?",
    shortAnswer: "No built‑in command. You would need a script or use `:cq` to indicate failure, but saving conditionally requires custom logic.",
    explanation: "Vi itself doesn't have context‑aware quitting based on file content. You can use `:help` to explore scripting.",
    hint: "Not a typical use case; most users save explicitly.",
    level: "expert",
    codeExample: "You would need an autocommand or external wrapper."
  },
  {
    question: "How do I quit vi if I accidentally opened it with `sudo` and now I'm stuck?",
    shortAnswer: "The same commands work: `:q!` to discard, `:wq` to save. `sudo` only affects permissions, not the quit commands.",
    explanation: "Some users think `sudo vi` changes exit commands – it doesn't. The only difference is you may be able to write to system files.",
    hint: "Just type `:q!` as usual.",
    level: "moderate",
    codeExample: "`ESC :q!` works regardless of sudo."
  },
  {
    question: "Can I map a key to exit vi quickly?",
    shortAnswer: "Yes, in `.vimrc` you can map, e.g., `nnoremap <F2> :q!<CR>`. But it's better to learn the standard ways.",
    explanation: "While custom mappings are possible, relying on them makes you less portable. Standard commands work everywhere.",
    hint: "If you must map, use something unobtrusive, but first master `:q!`.",
    level: "expert",
    codeExample: "`nnoremap <F5> :wq<CR>` in .vimrc."
  },
  {
    question: "What is the difference between `ZQ` and `:cq`?",
    shortAnswer: "`ZQ` quits without saving (like `:q!`) with normal exit code. `:cq` quits with error code.",
    explanation: "Both discard changes. `:cq` is special for scripts; `ZQ` is just a faster `:q!` in vim.",
    hint: "`ZQ` is vim‑specific; `:cq` is more universal (ex command).",
    level: "expert",
    codeExample: "`ZQ` = `:q!` (exit code 0); `:cq` = exit code 1."
  },
  {
    question: "How can I exit vi if I am in a terminal that doesn't send ESC properly?",
    shortAnswer: "Try `Ctrl+[` (which is equivalent to ESC). Then type `:q!`.",
    explanation: "Some terminal emulators or keyboard configurations may not send ESC. `Ctrl+[` is the ASCII escape character and works identically.",
    hint: "Test `Ctrl+[` in vi – it acts exactly like ESC.",
    level: "expert",
    codeExample: "`Ctrl+[` then `:q!` Enter"
  },
  {
    question: "What do I do if I type `:q` and get 'E37: No write since last change'?",
    shortAnswer: "Either save with `:w` then `:q`, or force quit with `:q!` to discard changes.",
    explanation: "Vi is protecting you. Read the error: it suggests adding `!` to override. So `:q!` is the quick solution.",
    hint: "Don't panic – just add the bang.",
    level: "beginner",
    codeExample: "`:q!` solves it."
  },
  {
    question: "Is there a difference between `:x` and `:xit`?",
    shortAnswer: "No, `:xit` is an alias for `:x` in vi. Both do the same: write if modified and quit.",
    explanation: "Some older vi versions use `:xit`. In modern vi/vim, `:x` and `:xit` are interchangeable.",
    hint: "Stick with `:x` for brevity.",
    level: "moderate",
    codeExample: "`:x` and `:xit` behave identically."
  },
  {
    question: "How can I quit vi if I have multiple files open (e.g., `vi a b c`)?",
    shortAnswer: "Use `:q` to quit the current file (move to next). To quit all at once, use `:qa` (quit all) or `:wqa` (write all and quit).",
    explanation: "When editing multiple files, `:q` closes the current buffer. `:qa` forces quit of all buffers. `:wqa` saves all and quits.",
    hint: "Add `!` to force: `:qa!` discards all changes across all files.",
    level: "moderate",
    codeExample: "`:qa!` discards changes in all files and exits."
  }
];

export default questions;