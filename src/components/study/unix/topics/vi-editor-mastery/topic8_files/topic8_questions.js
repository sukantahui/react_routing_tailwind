// topic8_questions.js – 20 FAQ questions about Visual mode (v, V, Ctrl+v)

const questions = [
  {
    question: "What is Visual mode and how do I enter it?",
    shortAnswer: "Visual mode highlights text for selection. Enter it with `v` (character), `V` (line), or `Ctrl+v` (block).",
    explanation: "In Normal mode, press one of those keys. Use movement keys (`h`, `j`, `k`, `l`, `w`, `b`, etc.) to expand the selection. The selected area is highlighted.",
    hint: "Press `ESC` to exit Visual mode without acting on the selection.",
    level: "beginner",
    codeExample: "`v` then `j` selects from cursor to next line character‑wise."
  },
  {
    question: "What is the difference between `v` and `V`?",
    shortAnswer: "`v` selects characters (can be part of lines), `V` selects entire lines.",
    explanation: "`v` is for granular selection, useful for words or partial lines. `V` is for line‑oriented operations like deleting multiple lines or indenting blocks.",
    hint: "Choose `V` when you want to affect whole lines; `v` when you need precision.",
    level: "moderate",
    codeExample: "`Vjj` selects three whole lines; `vjj` selects from cursor to end of two lines down (partial)."
  },
  {
    question: "What is `Ctrl+v` used for?",
    shortAnswer: "Enter block‑wise visual mode for rectangular selections (columns).",
    explanation: "Block visual mode lets you select a vertical rectangle of text, regardless of line lengths. It's invaluable for editing tables, CSV columns, or adding a prefix to multiple lines.",
    hint: "Use `Ctrl+v` to delete a column of spaces or add a comment character in front of several lines.",
    level: "moderate",
    codeExample: "Move to column 0, `Ctrl+v`, then `jjjj` selects four rows in the first column."
  },
  {
    question: "How do I delete the selected text in Visual mode?",
    shortAnswer: "Press `d` (delete). The selected text is removed and stored in the register.",
    explanation: "After pressing `d`, vi quits Visual mode and the text is deleted. You can paste it later with `p`. Use `x` also works for character deletion.",
    hint: "`d` works on any visual selection (character, line, block).",
    level: "beginner",
    codeExample: "Visual select a word, `d` → word deleted."
  },
  {
    question: "How do I yank (copy) selected text in Visual mode?",
    shortAnswer: "Press `y` (yank). The selected text is copied to the register.",
    explanation: "The selection is not deleted. You can then move elsewhere and press `p` to paste.",
    hint: "After yanking, Visual mode ends automatically.",
    level: "beginner",
    codeExample: "`V` select lines, `y`, then `p` pastes them elsewhere."
  },
  {
    question: "How can I replace selected text with the yanked text?",
    shortAnswer: "Visual select the target area, then press `p` (put). The selection is replaced by the register content.",
    explanation: "Pasting over a visual selection does not just paste after it – it replaces the selected text entirely. This is a powerful way to swap or overwrite text.",
    hint: "Be careful: `p` in Visual mode overwrites, does not insert.",
    level: "moderate",
    codeExample: "Yank a word (`yw`), select another word with `v`, then `p` → replaces."
  },
  {
    question: "How can I indent a block of code in Visual mode?",
    shortAnswer: "Use `V` to select lines, then press `>` (shift right) or `<` (shift left).",
    explanation: "This is one of the most common uses of line‑wise visual mode. Each `>` adds one shift width (usually `shiftwidth`=4 spaces).",
    hint: "Use `2>` to indent twice, or `.` to repeat the indent after exiting Visual mode.",
    level: "moderate",
    codeExample: "`Vjj` selects three lines, `>` indents them all one level."
  },
  {
    question: "How do I change case of selected text with Visual mode?",
    shortAnswer: "Select text with `v`, then press `~` (tilde) to toggle case, `U` to uppercase, `u` to lowercase.",
    explanation: "`~` flips the case of each character. `U` converts to uppercase, `u` to lowercase. This works on character, line, or block selections.",
    hint: "Try `v` then `U` to make a word uppercase.",
    level: "moderate",
    codeExample: "Select 'hello', `U` → 'HELLO'."
  },
  {
    question: "How can I insert the same text at the beginning of several lines?",
    shortAnswer: "Use block visual mode (`Ctrl+v`), select the first column across the desired lines, then press `I` (capital I), type the text, and press `ESC`.",
    explanation: "This is a classic trick for adding a comment prefix (`#`, `//`) or bullet points to many lines at once. Only works in vim (not plain vi).",
    hint: "After `I`, type your text and `ESC` – the text appears on every selected line at the cursor's column.",
    level: "expert",
    codeExample: "`Ctrl+v jjj I # ESC` → adds '# ' to the beginning of four lines."
  },
  {
    question: "How do I append the same text at the end of several lines?",
    shortAnswer: "Use block visual mode, select a column that includes the end of lines (or just select the lines), then press `A` (capital A), type text, `ESC`.",
    explanation: "Unlike `I`, `A` in block visual appends after the selection on each line, not necessarily at line end. You may need to extend the block to the line end with `$`.",
    hint: "For line end appending, it's easier to use `:normal Atext` command. But block `A` works if the block covers the line end.",
    level: "expert",
    codeExample: "`Ctrl+v $` to select to line end, then `A` + `;` + `ESC` adds semicolon to all lines."
  },
  {
    question: "What does `gv` do?",
    shortAnswer: "Reselects the last visual selection.",
    explanation: "Very useful if you accidentally exit Visual mode or want to re‑apply an operation on the same area. Works for any visual mode (character, line, block).",
    hint: "After a deletion, `gv` reselects the same text (if still present).",
    level: "moderate",
    codeExample: "`v` select some text, `d` delete, `u` undo, `gv` reselects it."
  },
  {
    question: "Can I move the cursor to the other end of the visual selection?",
    shortAnswer: "Yes, press `o` (lowercase o) while in Visual mode. The cursor jumps to the opposite end of the selection.",
    explanation: "This allows you to adjust the selection size from the other side without starting over.",
    hint: "Use `o` multiple times to toggle ends.",
    level: "moderate",
    codeExample: "`v` start select, `j` expand, `o` now cursor at start, `k` shrinks selection."
  },
  {
    question: "How do I exit Visual mode without performing any action?",
    shortAnswer: "Press `ESC` (once or twice).",
    explanation: "`ESC` cancels Visual mode and returns to Normal mode. The selection highlight disappears.",
    hint: "You can also press `v` again (depending on settings) but `ESC` is universal.",
    level: "beginner",
    codeExample: "`v` then `ESC` → back to Normal mode, no change."
  },
  {
    question: "Is Visual mode available in classic vi (not vim)?",
    shortAnswer: "No, Visual mode is a vim feature. Original vi does not have visual highlighting.",
    explanation: "Classic vi has `v` for 'visual' but it didn't highlight; it had a different meaning. For portability, avoid Visual mode in scripts, but for interactive use, vim is standard on most Linux systems.",
    hint: "If `v` doesn't highlight, you're probably in nvi or legacy vi.",
    level: "expert",
    codeExample: "In nvi, `v` enters 'visual' mode but without highlight; commands still work."
  },
  {
    question: "How can I replace a block of text with a single line of text?",
    shortAnswer: "Select the block with `Ctrl+v` (block visual), then press `c` (change) and type the replacement text. The block is replaced by one line? Actually, block change replaces each line's selected part.",
    explanation: "If you want to replace a rectangular block with a single line of text, that's not directly possible. You would need to delete the block (`d`) then insert the line. Block change is line‑wise per row.",
    hint: "For replacing multiple lines with one line, use `V` to select lines, then `c` to change them all – but that deletes the lines and enters Insert mode; type once, the line replaces the selected lines.",
    level: "expert",
    codeExample: "`Vjjc` then type 'new line' → replaces three lines with one line."
  },
  {
    question: "What is the difference between `v` and `v` then `$`?",
    shortAnswer: "`v` alone selects from cursor to cursor (no movement). `v$` selects from cursor to end of line.",
    explanation: "You need to extend the selection with movement keys. `v$` is a common pattern to select to line end. `v0` selects to line start.",
    hint: "Combine `v` with any movement: `vw` selects a word, `vib` selects inner block.",
    level: "moderate",
    codeExample: "`v$` highlights from cursor to end of line."
  },
  {
    question: "How can I visually select the entire file?",
    shortAnswer: "Use `ggVG`: `gg` goes to top, `V` enters line‑wise visual, `G` goes to bottom, selecting all lines.",
    explanation: "Alternatively, `y` with no movement yanks the whole file, but `ggVG` gives visual feedback. `:1,$` is another way.",
    hint: "`gg` then `vG` selects character‑wise whole file.",
    level: "moderate",
    codeExample: "`ggVG` selects all lines. `ggvG` selects all characters."
  },
  {
    question: "Can I use the mouse to select text in vim's Visual mode?",
    shortAnswer: "Yes, if `set mouse=a` is enabled. Click and drag operates as Visual mode.",
    explanation: "In terminal vim with mouse support, you can select with the mouse. The selection appears as a Visual mode selection. This helps beginners transition.",
    hint: "Add `set mouse=a` to your .vimrc to enable mouse selection.",
    level: "moderate",
    codeExample: "`set mouse=a` then click+drag selects text visually."
  },
  {
    question: "How do I copy (yank) a column of numbers using block visual?",
    shortAnswer: "Use `Ctrl+v` to select the column, then `y` to yank. Then move to another location and `p` to paste the column.",
    explanation: "Pasting a block will insert as a rectangle, preserving column alignment. This is great for rearranging table data.",
    hint: "Make sure the target area has enough space to receive the block.",
    level: "expert",
    codeExample: "Column selection with `Ctrl+v`, `y`, move, `p` → pastes block."
  },
  {
    question: "What happens if I press `p` in Visual mode without yanking anything first?",
    shortAnswer: "It replaces the selected text with the contents of the unnamed register (which may be from previous yank/delete).",
    explanation: "This is not an error; it's a feature. It's a quick way to replace a selection with previously copied text.",
    hint: "If you want to paste without replacing, use `P` or exit Visual mode first then `p`.",
    level: "expert",
    codeExample: "Select some text, press `p` → the selected text is replaced by whatever was last yanked/deleted."
  }
];

export default questions;