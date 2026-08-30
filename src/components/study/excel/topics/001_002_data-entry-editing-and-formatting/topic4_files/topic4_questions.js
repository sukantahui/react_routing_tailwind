const questions = [
  {
    question: "What is the primary function of pressing the `F2` key on a selected worksheet cell in Excel?",
    options: [
      "Toggles Edit Mode to place the cursor directly inside the cell at the end of existing content",
      "Clears all formatting and resets the cell to General",
      "Opens the Format Cells dialog box",
      "Deletes the active cell contents permanently"
    ],
    correctAnswer: 0,
    explanation: "Pressing `F2` activates Edit Mode, placing the text cursor directly inside the active cell so you can edit contents without overwriting existing data."
  },
  {
    question: "How does typing directly into a selected cell differ from pressing `F2` before typing?",
    options: [
      "Direct typing overwrites and replaces all existing cell contents; pressing F2 allows in-cell editing without deleting existing content",
      "Direct typing converts text into numbers; F2 converts numbers into text",
      "Direct typing requires pressing Enter twice; F2 saves automatically",
      "There is no difference between direct typing and F2"
    ],
    correctAnswer: 0,
    explanation: "Directly typing on a selected cell erases its prior contents and starts fresh input. Pressing `F2` enters Edit Mode, preserving existing cell text/formulas for precision editing."
  },
  {
    question: "What keyboard shortcut toggles the expansion/collapse of the Formula Bar height for viewing long formulas?",
    options: [
      "Ctrl + Shift + U",
      "Alt + F2",
      "Ctrl + F1",
      "Shift + Enter"
    ],
    correctAnswer: 0,
    explanation: "`Ctrl + Shift + U` expands or collapses the Formula Bar height, allowing analysts to inspect multi-line formulas without obscure truncation."
  },
  {
    question: "What keyboard shortcut opens the Find and Replace dialog box with the 'Replace' tab active?",
    options: [
      "Ctrl + H",
      "Ctrl + F",
      "Alt + R",
      "Ctrl + R"
    ],
    correctAnswer: 0,
    explanation: "`Ctrl + H` opens Find & Replace directly to the Replace tab. `Ctrl + F` opens the Find tab."
  },
  {
    question: "In Excel's Find & Replace dialog, what wildcard character represents any single individual character?",
    options: [
      "The question mark (`?`)",
      "The asterisk (`*`)",
      "The tilde (`~`)",
      "The ampersand (`&`)"
    ],
    correctAnswer: 0,
    explanation: "The question mark `?` matches exactly one character (e.g. `B?ll` matches 'Ball', 'Bell', 'Bill'). The asterisk `*` matches any sequence of characters."
  },
  {
    question: "How do you search for a literal asterisk (`*`) or question mark (`?`) in Find & Replace without triggering wildcard matching?",
    options: [
      "Prefix the character with a tilde (`~*` or `~?`)",
      "Wrap the character in double quotes (`\"*\"`)",
      "Enclose the character in square brackets (`[*]`)",
      "Prefix the character with a backslash (`\\*`)"
    ],
    correctAnswer: 0,
    explanation: "Preceding a wildcard with a tilde (`~`) escapes its wildcard behavior, instructing Excel to search for the literal `*` or `?` symbol."
  },
  {
    question: "What key opens the Paste Special dialog box after copying a cell (`Ctrl + C`)?",
    options: [
      "Ctrl + Alt + V (or Alt + E + S)",
      "Ctrl + Shift + V",
      "Alt + V",
      "Ctrl + P"
    ],
    correctAnswer: 0,
    explanation: "`Ctrl + Alt + V` (or the legacy sequence `Alt + E + S`) opens the Paste Special dialog box, giving access to Values, Formats, Column Widths, Operations, and Transpose."
  },
  {
    question: "Which Paste Special option converts dynamic formula outputs into static, immutable raw values?",
    options: [
      "Paste Values (Shortcut: Alt + E + S + V)",
      "Paste Formats (Shortcut: Alt + E + S + T)",
      "Paste Formulas (Shortcut: Alt + E + S + F)",
      "Paste Column Widths (Shortcut: Alt + E + S + W)"
    ],
    correctAnswer: 0,
    explanation: "Paste Values strips away underlying formula logic, replacing formula cells with their current calculated constant values."
  },
  {
    question: "What does selecting 'Skip Blanks' in the Paste Special dialog achieve when pasting data over an existing range?",
    options: [
      "Prevents blank cells in the copied range from overwriting existing non-blank data in the target range",
      "Deletes all blank rows in the worksheet",
      "Replaces empty cells with zero",
      "Fills blank cells with green background"
    ],
    correctAnswer: 0,
    explanation: "'Skip Blanks' ensures that empty/blank cells within the copied source range do not overwrite existing data in the destination cells."
  },
  {
    question: "How does 'Clear All' (`Alt + H + E + A`) differ from pressing the `Delete` key on a selected cell?",
    options: [
      "'Clear All' removes cell contents, formatting, comments, and hyperlinks; 'Delete' removes only cell contents while keeping formatting intact",
      "'Delete' removes formatting while 'Clear All' keeps formats",
      "'Clear All' deletes the physical cell grid structure; 'Delete' does not",
      "Both commands perform identical operations"
    ],
    correctAnswer: 0,
    explanation: "Pressing `Delete` removes only cell values/formulas (Clear Contents). `Clear All` (`Alt + H + E + A`) completely strips values, fill colors, borders, custom number formats, comments, and active hyperlinks."
  },
  {
    question: "What is the shortcut to repeat your very last worksheet editing or formatting action in Excel?",
    options: [
      "F4 (or Ctrl + Y)",
      "F2",
      "Ctrl + R",
      "Alt + Enter"
    ],
    correctAnswer: 0,
    explanation: "`F4` (or `Ctrl + Y`) acts as Redo / Repeat Last Action. If you just inserted a row or formatted a fill color, pressing `F4` repeats that exact operation on the new selection."
  },
  {
    question: "What keyboard shortcut performs an Undo operation to roll back the previous change in Excel?",
    options: [
      "Ctrl + Z",
      "Ctrl + Y",
      "Alt + Backspace",
      "Esc"
    ],
    correctAnswer: 0,
    explanation: "`Ctrl + Z` undoes the most recent editing, formatting, or structural change in the active workbook session."
  },
  {
    question: "What happens if you use Paste Special -> Transpose (`Alt + E + S + E`) on a 3-row by 5-column range?",
    options: [
      "Converts the range into a 5-row by 3-column orientation, rotating rows into columns",
      "Flips the order of rows upside down",
      "Mirrors the text backwards",
      "Deletes the original 3x5 matrix"
    ],
    correctAnswer: 0,
    explanation: "Transpose rotates horizontal rows into vertical columns and vice-versa, transforming a $3 \\times 5$ matrix into a $5 \\times 3$ grid orientation."
  },
  {
    question: "What Paste Special Operation allows you to multiply an entire column of numbers by a constant factor (e.g. 1.18 for GST) without writing formulas?",
    options: [
      "Copy factor -> Select range -> Paste Special -> Multiply (`Alt + E + S + M`)",
      "Paste Values -> Transpose",
      "Paste Formats -> Add",
      "Flash Fill (Ctrl + E)"
    ],
    correctAnswer: 0,
    explanation: "Copying a constant cell (e.g. `1.18`) and executing Paste Special -> Multiply directly multiplies every value in the target range by `1.18` in-place."
  },
  {
    question: "How do you insert a hard line break inside a single cell while editing text in Excel?",
    options: [
      "Alt + Enter",
      "Ctrl + Enter",
      "Shift + Enter",
      "Tab"
    ],
    correctAnswer: 0,
    explanation: "`Alt + Enter` inserts a multi-line carriage return inside a single cell during in-cell editing mode."
  },
  {
    question: "What key sequence cancels Edit Mode without committing your edits to the cell?",
    options: [
      "Esc",
      "Enter",
      "Tab",
      "Ctrl + Z"
    ],
    correctAnswer: 0,
    explanation: "Pressing `Esc` while editing a cell discards all pending keystrokes and restores the cell to its pre-edited state."
  },
  {
    question: "What keyboard shortcut populates identical data or formulas across all currently selected cells simultaneously?",
    options: [
      "Ctrl + Enter",
      "Alt + Enter",
      "Shift + Enter",
      "Ctrl + Shift + Enter"
    ],
    correctAnswer: 0,
    explanation: "Highlighting a range, typing a value or formula, and pressing `Ctrl + Enter` writes that input across every selected cell in one atomic operation."
  },
  {
    question: "Which option in Find & Replace restricts the search to exact complete cell matches rather than partial string fragments?",
    options: [
      "Match entire cell contents",
      "Match case",
      "Look in: Formulas",
      "Search: By Columns"
    ],
    correctAnswer: 0,
    explanation: "Checking 'Match entire cell contents' prevents partial matches (e.g. searching 'Tax' won't match 'Taxation' or 'Pre-Tax')."
  },
  {
    question: "What Paste Special shortcut sequence specifically pastes only exact column widths from a source table to a target table?",
    options: [
      "Alt + E + S + W (or Alt + H + V + W)",
      "Alt + E + S + V",
      "Alt + E + S + T",
      "Ctrl + Shift + W"
    ],
    correctAnswer: 0,
    explanation: "Paste Column Widths (`Alt + E + S + W`) adjusts destination column widths to match the source range perfectly without affecting target cell values."
  },
  {
    question: "What command ribbon sequence executes 'Clear Formats' on highlighted cells?",
    options: [
      "Alt + H + E + F",
      "Alt + H + E + A",
      "Alt + H + E + C",
      "Delete"
    ],
    correctAnswer: 0,
    explanation: "`Alt + H + E + F` executes Home -> Editing -> Clear -> Clear Formats, stripping colors, borders, and custom masks while keeping raw values."
  },
  {
    question: "What happens if you perform a Find & Replace with 'Look in: Values' selected instead of 'Look in: Formulas'?",
    options: [
      "Searches the calculated rendered output text displayed in cells rather than underlying formula syntax",
      "Searches only static hardcoded numbers",
      "Searches cell comments and notes",
      "Causes Find & Replace to run 10x slower"
    ],
    correctAnswer: 0,
    explanation: "Searching in 'Values' inspects the rendered text visible on the grid (e.g. finding calculated formula totals), whereas 'Formulas' searches raw formula code string."
  },
  {
    question: "What does the Formula Bar display when a cell containing a calculated formula (e.g. `=SUM(A1:A10)`) is selected?",
    options: [
      "The underlying formula string `=SUM(A1:A10)`",
      "Only the final numeric result",
      "A blank text area",
      "The cell coordinate address"
    ],
    correctAnswer: 0,
    explanation: "The Formula Bar always exposes the unformatted underlying formula text or raw value stored inside the active cell memory."
  },
  {
    question: "Which keyboard shortcut fills content from the cell directly above into the active cell?",
    options: [
      "Ctrl + D (Fill Down)",
      "Ctrl + R (Fill Right)",
      "Ctrl + U",
      "Alt + Down"
    ],
    correctAnswer: 0,
    explanation: "`Ctrl + D` (Fill Down) copies both the value and formula/formatting from the cell immediately above into the active cell."
  },
  {
    question: "Which keyboard shortcut fills content from the cell directly to the left into the active cell?",
    options: [
      "Ctrl + R (Fill Right)",
      "Ctrl + D (Fill Down)",
      "Ctrl + L",
      "Alt + Right"
    ],
    correctAnswer: 0,
    explanation: "`Ctrl + R` (Fill Right) copies value, formula, and formatting from the cell immediately to the left into the active cell."
  },
  {
    question: "Why should analysts avoid manually re-typing calculated numbers over formula cells when static values are required?",
    options: [
      "Manual typing introduces human transcription errors; Paste Special Values (`Alt + E + S + V`) guarantees 100% exact numerical fidelity",
      "Manual typing deletes the worksheet tab",
      "Paste Special Values automatically formats text in red",
      "Manual typing increases file size"
    ],
    correctAnswer: 0,
    explanation: "Paste Special Values instantly freezes dynamic formulas into static numbers with 100% double-precision accuracy, avoiding manual typo mistakes."
  },
  {
    question: "What Paste Special Operation subtracts copied values from target cell values directly on the grid?",
    options: [
      "Paste Special -> Operation: Subtract (`Alt + E + S + S`)",
      "Paste Special -> Operation: Add (`Alt + E + S + D`)",
      "Paste Special -> Operation: Divide (`Alt + E + S + I`)",
      "Clear Contents"
    ],
    correctAnswer: 0,
    explanation: "Paste Special -> Operation: Subtract (`Alt + E + S + S`) subtracts the source copied values from existing destination cell values in-place."
  },
  {
    question: "What is the result of using Paste Special -> Formulas (`Alt + E + S + F`)?",
    options: [
      "Pastes formula text and logic without transferring source cell formatting, colors, or borders",
      "Pastes only cell fill colors",
      "Converts formulas into static text strings",
      "Pastes column widths only"
    ],
    correctAnswer: 0,
    explanation: "Paste Formulas transfers only underlying formula strings and cell logic while leaving the recipient cell’s visual styling untouched."
  },
  {
    question: "How do you navigate through search results sequentially after executing Find (`Ctrl + F`)?",
    options: [
      "Press Enter (or Shift + Enter to search backwards)",
      "Press Tab",
      "Press F2",
      "Press Alt + F4"
    ],
    correctAnswer: 0,
    explanation: "Pressing `Enter` jumps to the next match in Find results; `Shift + Enter` cycles backwards to previous matches."
  },
  {
    question: "What status bar mode indicator displays when you press `F2` once on an active cell?",
    options: [
      "'EDIT' mode",
      "'READY' mode",
      "'ENTER' mode",
      "'POINT' mode"
    ],
    correctAnswer: 0,
    explanation: "Pressing `F2` shifts the Excel status bar mode from 'READY' to 'EDIT', allowing text cursor manipulation inside the cell."
  },
  {
    question: "Why is Paste Special Transpose critical when restructuring legacy accounting reports into tabular database format?",
    options: [
      "Instantly converts wide horizontal monthly report headers into vertical database rows for pivot table readiness",
      "Deletes duplicate records automatically",
      "Changes currency symbols from USD to INR",
      "Locks the worksheet against editing"
    ],
    correctAnswer: 0,
    explanation: "Pasting Transpose converts horizontal reporting columns into normalized vertical database rows, making legacy datasets ready for Power Query and Pivot Tables."
  }
];

export default questions;
