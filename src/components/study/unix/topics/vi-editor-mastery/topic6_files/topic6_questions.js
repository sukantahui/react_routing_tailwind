// topic6_questions.js – 20 FAQ questions about basic editing (x, dd, yy, p)

const questions = [
  {
    question: "What does `x` do in Normal mode?",
    shortAnswer: "Deletes the character under the cursor.",
    explanation: "`x` removes one character at the cursor position. The rest of the line shifts left. You can use counts like `5x` to delete five characters.",
    hint: "Useful for fixing small typing mistakes.",
    level: "beginner",
    codeExample: "Line 'Helo', cursor on 'e' → `x` → 'Hlo'"
  },
  {
    question: "How do I delete an entire line?",
    shortAnswer: "Use `dd` in Normal mode.",
    explanation: "`dd` deletes the entire line and stores it in a register. You can paste it using `p`. Use `3dd` to delete three lines.",
    hint: "Cursor moves to the next line after deletion.",
    level: "beginner",
    codeExample: "Line 'delete me' → `dd` → line removed"
  },
  {
    question: "What is the difference between `yy` and `y`?",
    shortAnswer: "`yy` copies the whole line, while `y` requires a motion (like `yw`).",
    explanation: "`yy` is used for copying lines. `y` must be combined with movement commands like `yw`, `y$`, etc.",
    hint: "`yy` = full line copy.",
    level: "moderate",
    codeExample: "`yy` → full line, `y$` → till end of line"
  },
  {
    question: "What does `p` do?",
    shortAnswer: "Pastes copied or deleted text after the cursor.",
    explanation: "`p` puts text from the register. For lines, it pastes below; for characters, it pastes after the cursor.",
    hint: "Use `P` to paste before.",
    level: "moderate",
    codeExample: "`yy` then `p` → line pasted below"
  },
  {
    question: "How do I delete a word?",
    shortAnswer: "Use `dw`.",
    explanation: "`dw` deletes from the cursor to the beginning of the next word. To delete the whole word cleanly, use `daw`.",
    hint: "`dw` depends on cursor position.",
    level: "moderate",
    codeExample: "'hello world', cursor on 'e' → `dw` → 'h world'"
  },
  {
    question: "What happens with `dd` followed by `p`?",
    shortAnswer: "The line moves one position down.",
    explanation: "`dd` deletes a line, `p` pastes it below the next line. This effectively moves the line downward.",
    hint: "`ddp` swaps two adjacent lines.",
    level: "moderate",
    codeExample: "A, B → `ddp` → B, A"
  },
  {
    question: "What is the difference between `x` and `dl`?",
    shortAnswer: "No difference; both delete the current character.",
    explanation: "`x` is the same as `dl`. `X` deletes the character before the cursor.",
    hint: "`x` = delete forward, `X` = delete backward.",
    level: "expert",
    codeExample: "`x` = `dl`, `X` = `dh`"
  },
  {
    question: "How do I copy multiple lines?",
    shortAnswer: "Use `5yy` to copy five lines.",
    explanation: "Counts can be used with `yy` to copy multiple lines quickly.",
    hint: "Also possible with Visual mode (`V`).",
    level: "moderate",
    codeExample: "`3yy` copies 3 lines"
  },
  {
    question: "Can I paste multiple times?",
    shortAnswer: "Yes, use a count like `3p`.",
    explanation: "This repeats the paste operation multiple times.",
    hint: "Great for duplication.",
    level: "moderate",
    codeExample: "`yy` then `3p`"
  },
  {
    question: "Which register does `yy` use?",
    shortAnswer: "The unnamed register.",
    explanation: "You can also use named registers like `\"ayy`.",
    hint: "Paste using `\"ap`.",
    level: "expert",
    codeExample: "`\"ayy` then `\"ap`"
  },
  {
    question: "How do I delete to the end of a line?",
    shortAnswer: "Use `d$` or `D`.",
    explanation: "`D` is a shortcut for `d$`.",
    hint: "`C` also deletes and enters insert mode.",
    level: "moderate",
    codeExample: "`d$` deletes till end"
  },
  {
    question: "Difference between `p` and `P`?",
    shortAnswer: "`p` pastes after, `P` pastes before.",
    explanation: "For lines: `p` → below, `P` → above.",
    hint: "`P` = previous.",
    level: "moderate",
    codeExample: "`P` pastes above"
  },
  {
    question: "What if `x` is used at end of line?",
    shortAnswer: "Deletes the last character.",
    explanation: "It does not delete the newline.",
    hint: "Use `dd` to remove line.",
    level: "moderate",
    codeExample: "'abc' → cursor on 'c' → `x` → 'ab'"
  },
  {
    question: "How do I delete multiple lines?",
    shortAnswer: "Use `5dd`.",
    explanation: "Deletes five lines including current.",
    hint: "Counts work everywhere.",
    level: "moderate",
    codeExample: "`4dd` deletes 4 lines"
  },
  {
    question: "What happens if I use `yy` on an empty line?",
    shortAnswer: "Copies a blank line.",
    explanation: "Pasting will insert another blank line.",
    hint: "Useful for formatting.",
    level: "moderate",
    codeExample: "blank → `yy` → `p` → two blanks"
  },
  {
    question: "How to paste from system clipboard?",
    shortAnswer: "Use `\"+p` in Vim.",
    explanation: "Requires clipboard support.",
    hint: "Check using `vim --version`.",
    level: "expert",
    codeExample: "`\"+p`"
  },
  {
    question: "Difference between `dd` and `D`?",
    shortAnswer: "`dd` deletes full line, `D` deletes to end.",
    explanation: "`dd` removes the line completely including newline. `D` only removes from cursor to end.",
    hint: "`D` = `d$`.",
    level: "moderate",
    codeExample: "cursor at middle → `D` → partial delete"
  },
  {
    question: "How to yank a word without space?",
    shortAnswer: "Use `yiw`.",
    explanation: "`yiw` copies inner word without spaces.",
    hint: "Better than `yw`.",
    level: "expert",
    codeExample: "`yiw`"
  },
  {
    question: "How to swap two lines?",
    shortAnswer: "Use `ddp`.",
    explanation: "Deletes current line and pastes below next line.",
    hint: "Works for adjacent lines.",
    level: "expert",
    codeExample: "A, B → `ddp` → B, A"
  },
  {
    question: "What does `xp` do?",
    shortAnswer: "Swaps two characters.",
    explanation: "`x` deletes character, `p` pastes it after next character.",
    hint: "Useful for fixing typos.",
    level: "expert",
    codeExample: "'teh' → `xp` → 'the'"
  }
];

export default questions;