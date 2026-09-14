/**
 * Topic 11 FAQ Assessment Questions:
 * "Interactive Cleaning: Running git clean -i for safe step-by-step interactive pruning"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t11-q1",
    "question": "What is the primary advantage of running `git clean -i` over `git clean -f`?",
    "shortAnswer": "It provides an interactive prompt menu allowing developers to review, filter by pattern, select specific numbers, or confirm deletions file-by-file.",
    "options": [
      "It provides a menu to select, filter, or individually confirm deletions before permanently deleting files",
      "It runs 50% faster",
      "It automatically stages files instead of deleting them",
      "It saves files to Google Drive"
    ],
    "answer": "It provides a menu to select, filter, or individually confirm deletions before permanently deleting files",
    "explanation": "Interactive mode eliminates the risk of accidental mass deletions by giving granular item-by-item control.",
    "hint": "Interactive mode provides a safety menu.",
    "level": "basic",
    "codeExample": "git clean -i"
  },
  {
    "id": "undo-t11-q2",
    "question": "What are the standard 6 menu options presented by `git clean -i`?",
    "shortAnswer": "1: clean, 2: filter by pattern, 3: select by numbers, 4: ask each, 5: quit, 6: help.",
    "options": [
      "1: clean, 2: filter by pattern, 3: select by numbers, 4: ask each, 5: quit, 6: help",
      "1: yes, 2: no, 3: maybe, 4: cancel, 5: skip, 6: retry",
      "1: add, 2: commit, 3: push, 4: pull, 5: branch, 6: merge",
      "1: soft, 2: mixed, 3: hard, 4: keep, 5: merge, 6: abort"
    ],
    "answer": "1: clean, 2: filter by pattern, 3: select by numbers, 4: ask each, 5: quit, 6: help",
    "explanation": "These 6 commands form the interactive CLI menu for fine-grained pruning.",
    "hint": "The standard numbered commands 1-6.",
    "level": "basic",
    "codeExample": "*** Commands ***\n1: clean 2: filter by pattern 3: select by numbers 4: ask each 5: quit 6: help"
  },
  {
    "id": "undo-t11-q3",
    "question": "Which interactive command option prompts for individual confirmation (`y/n`) on every single untracked file?",
    "shortAnswer": "Option 4 (`ask each`).",
    "options": [
      "Option 4: `ask each`",
      "Option 1: `clean`",
      "Option 2: `filter by pattern`",
      "Option 5: `quit`"
    ],
    "answer": "Option 4: `ask each`",
    "explanation": "The `ask each` option steps through candidate files sequentially, asking 'Remove <file> [y/N]?' on each.",
    "hint": "Option 4 is ask each.",
    "level": "basic",
    "codeExample": "Remove scratch.txt [y/N]? y"
  },
  {
    "id": "undo-t11-q4",
    "question": "How do you select specific files to delete using Option 3 (`select by numbers`) in `git clean -i`?",
    "shortAnswer": "Enter individual numbers or ranges separated by commas/spaces (e.g. `1, 3, 5-8`), then press Enter on an empty line.",
    "options": [
      "Type item numbers/ranges like `1, 3, 5-7` and press Enter with an empty line to confirm",
      "Type the full filename in hexadecimal",
      "Click with the mouse",
      "Type the file size in kilobytes"
    ],
    "answer": "Type item numbers/ranges like `1, 3, 5-7` and press Enter with an empty line to confirm",
    "explanation": "Git supports range syntax and individual indices. An empty input line finishes the selection process.",
    "hint": "Specify numbers or ranges like 1, 3, 5-7.",
    "level": "intermediate",
    "codeExample": "Select items to delete>> 1, 2, 4-6"
  },
  {
    "id": "undo-t11-q5",
    "question": "What happens when you select Option 5 (`quit`) in `git clean -i`?",
    "shortAnswer": "Git immediately terminates and exits to the terminal prompt without deleting any files.",
    "options": [
      "Git aborts and exits without deleting any files",
      "Git deletes half the files",
      "Git resets the repository to initial commit",
      "Git closes the terminal application"
    ],
    "answer": "Git aborts and exits without deleting any files",
    "explanation": "Option 5 is the safe exit hatch. Zero modifications are made to the filesystem.",
    "hint": "Quit safely exits without deletions.",
    "level": "basic",
    "codeExample": "What now> 5\nBye."
  },
  {
    "id": "undo-t11-q6",
    "question": "How can you combine recursive directory cleaning with interactive mode?",
    "shortAnswer": "`git clean -id` (or `git clean -i -d`).",
    "options": [
      "`git clean -id`",
      "`git clean -i --all`",
      "`git clean -ir`",
      "`git clean -i --deep`"
    ],
    "answer": "`git clean -id`",
    "explanation": "Combining `-i` (interactive) and `-d` (directories) includes whole untracked directories in the interactive list.",
    "hint": "-id combines interactive with directories.",
    "level": "basic",
    "codeExample": "git clean -id"
  },
  {
    "id": "undo-t11-q7",
    "question": "What does Option 2 (`filter by pattern`) do in `git clean -i`?",
    "shortAnswer": "It prompts you to enter an exclusion pattern (e.g. `*.sql` or `!important.txt`) to exclude files from deletion.",
    "options": [
      "It filters the candidate list by prompt pattern so specified files are excluded from deletion",
      "It searches for syntax errors in candidate files",
      "It renames files matching the pattern",
      "It converts text files to PDF"
    ],
    "answer": "It filters the candidate list by prompt pattern so specified files are excluded from deletion",
    "explanation": "Filter by pattern allows dynamic excluding of matching glob patterns from the pending deletion list.",
    "hint": "Filter by pattern excludes matching globs.",
    "level": "intermediate",
    "codeExample": "Input ignore patterns>> *.env"
  },
  {
    "id": "undo-t11-q8",
    "question": "In the classroom at Barrackpore, Abhronila has 20 untracked log files and 1 untracked `database_schema.sql` file. How can she safely clean the logs without deleting the SQL file?",
    "shortAnswer": "Run `git clean -id`, choose Option 2 (`filter by pattern`), enter `*.sql`, and then select Option 1 (`clean`).",
    "options": [
      "Run `git clean -id`, choose Option 2 (`filter by pattern`), enter `*.sql`, then choose Option 1 (`clean`)",
      "Run `git clean -fdx`",
      "Delete everything manually in Windows Explorer",
      "Run `git reset --hard`"
    ],
    "answer": "Run `git clean -id`, choose Option 2 (`filter by pattern`), enter `*.sql`, then choose Option 1 (`clean`)",
    "explanation": "Interactive pattern filtering shields the SQL file while cleaning the 20 log files safely.",
    "hint": "Filter pattern *.sql to protect schema file.",
    "level": "intermediate",
    "codeExample": "# In interactive prompt:\n# 2 -> Input ignore patterns>> *.sql -> 1 (clean)"
  },
  {
    "id": "undo-t11-q9",
    "question": "Does `git clean -i` require the `-f` flag when launched?",
    "shortAnswer": "No. Passing `-i` (or `-n`) satisfies Git's `clean.requireForce` safety check without requiring `-f`.",
    "options": [
      "No; passing `-i` satisfies the safety check because interactive confirmation is explicit",
      "Yes; you must always type `git clean -if`",
      "Only on macOS",
      "Only in non-bare repositories"
    ],
    "answer": "No; passing `-i` satisfies the safety check because interactive confirmation is explicit",
    "explanation": "Git recognizes interactive mode as an explicit user action, so `-f` is not needed.",
    "hint": "-i satisfies the safety requirement on its own.",
    "level": "intermediate",
    "codeExample": "git clean -i # Valid without -f"
  },
  {
    "id": "undo-t11-q10",
    "question": "What is the prompt displayed by `git clean -i` when waiting for your choice?",
    "shortAnswer": "`What now> `",
    "options": [
      "`What now> `",
      "`Enter choice: `",
      "`Clean? (y/n): `",
      "`Command: `"
    ],
    "answer": "`What now> `",
    "explanation": "Git's interactive porcelain prompts with `What now> ` for command selection.",
    "hint": "What now> is the prompt.",
    "level": "basic",
    "codeExample": "What now> 1"
  },
  {
    "id": "undo-t11-q11",
    "question": "If you enter an invalid number or text at the `What now> ` prompt, what does Git do?",
    "shortAnswer": "It re-displays the command menu without taking any destructive action.",
    "options": [
      "It re-displays the command menu safely",
      "It deletes all files immediately",
      "It exits with error code 1",
      "It formats the screen"
    ],
    "answer": "It re-displays the command menu safely",
    "explanation": "Git's interactive loop handles invalid input defensively by re-rendering the prompt menu.",
    "hint": "Invalid input safely re-displays the menu.",
    "level": "basic",
    "codeExample": "# Safely re-prompts on invalid input"
  },
  {
    "id": "undo-t11-q12",
    "question": "Can you use `git clean -i` to clean untracked files AND ignored files simultaneously?",
    "shortAnswer": "Yes, by passing `-x`: `git clean -idx`.",
    "options": [
      "Yes, by passing `git clean -idx`",
      "No, interactive mode does not support ignored files",
      "Only with third-party Git extensions",
      "Only if run as root/administrator"
    ],
    "answer": "Yes, by passing `git clean -idx`",
    "explanation": "Combining `-i`, `-d`, and `-x` allows interactive review of all untracked and `.gitignore` matches.",
    "hint": "-idx includes ignored files in the interactive prompt.",
    "level": "intermediate",
    "codeExample": "git clean -idx"
  },
  {
    "id": "undo-t11-q13",
    "question": "What visual indication does `git clean -i` give for selected vs unselected items when using Option 3 (`select by numbers`)?",
    "shortAnswer": "Selected items are marked with an asterisk (`*`) next to their number.",
    "options": [
      "Selected items are marked with an asterisk (`*`) next to their index number",
      "Selected items are displayed in bold red",
      "Selected items are hidden from the list",
      "Selected items have '(DELETED)' appended"
    ],
    "answer": "Selected items are marked with an asterisk (`*`) next to their index number",
    "explanation": "Toggling item numbers prepends or removes an asterisk (`*`) to show active selection status.",
    "hint": "Asterisk marks selected items.",
    "level": "intermediate",
    "codeExample": " 1: *scratch.txt\n 2:  keep_me.txt"
  },
  {
    "id": "undo-t11-q14",
    "question": "How do you un-select an already selected file in `select by numbers` mode in `git clean -i`?",
    "shortAnswer": "Type the item number again (it acts as a toggle).",
    "options": [
      "Type the item number again to toggle it off",
      "Type `-<number>`",
      "Press Backspace",
      "Type `unselect <number>`"
    ],
    "answer": "Type the item number again to toggle it off",
    "explanation": "Entering the number of an already selected item toggles the asterisk off.",
    "hint": "Typing the number toggles selection on/off.",
    "level": "intermediate",
    "codeExample": "# Toggle off item 1:\nSelect items to delete>> 1"
  },
  {
    "id": "undo-t11-q15",
    "question": "When is `git clean -i` especially recommended over automated scripts?",
    "shortAnswer": "When working in an unfamiliar codebase or after running experimental build steps with mixed output files.",
    "options": [
      "When working in a large repository with mixed untracked files where you need visual confirmation",
      "In automated background cron jobs",
      "During CI/CD unattended deployments",
      "When no terminal is available"
    ],
    "answer": "When working in a large repository with mixed untracked files where you need visual confirmation",
    "explanation": "Interactive mode requires human input and is ideal for manual developer inspection.",
    "hint": "Best for deliberate human inspection.",
    "level": "basic",
    "codeExample": "# Ideal for manual repository housekeeping"
  },
  {
    "id": "undo-t11-q16",
    "question": "What happens if you run `git clean -i` and select Option 1 (`clean`) immediately without filtering or deselecting anything?",
    "shortAnswer": "All untracked candidate files listed in the menu are deleted.",
    "options": [
      "All untracked files shown in the initial candidate list are deleted",
      "Nothing happens",
      "Only the first file is deleted",
      "Git asks for your password"
    ],
    "answer": "All untracked files shown in the initial candidate list are deleted",
    "explanation": "By default, all candidates are slated for cleaning unless filtered or deselected.",
    "hint": "Option 1 executes deletion of all current candidates.",
    "level": "basic",
    "codeExample": "What now> 1\nRemoving scratch.txt..."
  },
  {
    "id": "undo-t11-q17",
    "question": "What does Option 6 (`help`) display in `git clean -i`?",
    "shortAnswer": "A short summary explaining the functionality of each of the 5 commands.",
    "options": [
      "A short description explaining what each menu option does",
      "A link to GitHub documentation",
      "The Git version number",
      "A list of active branches"
    ],
    "answer": "A short description explaining what each menu option does",
    "explanation": "Option 6 prints built-in quick documentation for the interactive commands.",
    "hint": "Help prints menu command explanations.",
    "level": "basic",
    "codeExample": "What now> 6"
  },
  {
    "id": "undo-t11-q18",
    "question": "Can `git clean -i` be cancelled at any point by pressing `Ctrl + C`?",
    "shortAnswer": "Yes. Pressing `Ctrl + C` sends a SIGINT signal that safely terminates the process without deleting pending files.",
    "options": [
      "Yes; `Ctrl + C` cleanly aborts the process without deleting unconfirmed files",
      "No; it forces immediate deletion of all files",
      "Only on Linux",
      "It locks the terminal"
    ],
    "answer": "Yes; `Ctrl + C` cleanly aborts the process without deleting unconfirmed files",
    "explanation": "Standard interrupt signals safely abort before the execution phase.",
    "hint": "Ctrl+C safely cancels.",
    "level": "basic",
    "codeExample": "# Ctrl+C aborts clean immediately"
  },
  {
    "id": "undo-t11-q19",
    "question": "In the classroom at Barrackpore, Sachin has 5 untracked files: `1: a.tmp`, `2: b.tmp`, `3: c.tmp`, `4: keep.txt`, `5: d.tmp`. Which input in `select by numbers` will choose only the `.tmp` files?",
    "shortAnswer": "`1-3, 5` (or `1 2 3 5`).",
    "options": [
      "`1-3, 5`",
      "`*.tmp`",
      "`all except 4`",
      "`delete tmp`"
    ],
    "answer": "`1-3, 5`",
    "explanation": "`select by numbers` accepts number ranges (`1-3`) and individual indices (`5`).",
    "hint": "Use range 1-3 and single index 5.",
    "level": "basic",
    "codeExample": "Select items to delete>> 1-3, 5"
  },
  {
    "id": "undo-t11-q20",
    "question": "True or False: `git clean -i` modifies git commit history.",
    "shortAnswer": "False. `git clean` only touches the working tree filesystem, never commit objects or history.",
    "options": [
      "False; it only operates on untracked working tree files and never touches commit history",
      "True; it rewrites recent commits",
      "True; it creates a commit called 'Clean'",
      "False; but it updates git log"
    ],
    "answer": "False; it only operates on untracked working tree files and never touches commit history",
    "explanation": "Clean is strictly a working tree disk utility.",
    "hint": "Clean only touches disk files, not commit history.",
    "level": "basic",
    "codeExample": "# Commit history is 100% untouched"
  },
  {
    "id": "undo-t11-q21",
    "question": "What is the equivalent flag for interactive mode when adding files to the staging index?",
    "shortAnswer": "`git add -i` (or `git add -p`).",
    "options": [
      "`git add -i` (or `git add -p`)",
      "`git add --ask`",
      "`git stage --menu`",
      "`git add -m`"
    ],
    "answer": "`git add -i` (or `git add -p`)",
    "explanation": "Git provides interactive modes across multiple tools, including `git add -i` and `git clean -i`.",
    "hint": "git add -i provides an analogous interactive staging menu.",
    "level": "intermediate",
    "codeExample": "git add -i"
  },
  {
    "id": "undo-t11-q22",
    "question": "Does `git clean -i` delete tracked files that were modified but unstaged?",
    "shortAnswer": "No. Tracked files are never considered candidates for `git clean`.",
    "options": [
      "No; tracked files are completely ignored by `git clean`",
      "Yes; if they are selected by number",
      "Yes; if `-f` is passed",
      "Only if they are empty files"
    ],
    "answer": "No; tracked files are completely ignored by `git clean`",
    "explanation": "Clean strictly limits its scope to untracked files.",
    "hint": "Tracked files are exempt from git clean.",
    "level": "basic",
    "codeExample": "# Tracked files are never shown in git clean"
  },
  {
    "id": "undo-t11-q23",
    "question": "If you want to exit interactive clean without taking any action, what two options can you use?",
    "shortAnswer": "Choose Option 5 (`quit`) or press `Ctrl + C`.",
    "options": [
      "Choose Option 5 (`quit`) or press `Ctrl + C`",
      "Choose Option 1",
      "Type `exit 0`",
      "Close VS Code"
    ],
    "answer": "Choose Option 5 (`quit`) or press `Ctrl + C`",
    "explanation": "Both Option 5 and `Ctrl + C` cleanly abort the process.",
    "hint": "Option 5 (quit) or Ctrl+C.",
    "level": "basic",
    "codeExample": "What now> 5"
  },
  {
    "id": "undo-t11-q24",
    "question": "How does `git clean -i` handle untracked symlinks on Linux/macOS?",
    "shortAnswer": "It treats untracked symlinks as candidate files to be deleted without traversing the symlink destination.",
    "options": [
      "It deletes the untracked symlink file itself without deleting the target destination",
      "It follows the symlink and deletes the target folder contents",
      "It converts symlinks to hard links",
      "It ignores symlinks completely"
    ],
    "answer": "It deletes the untracked symlink file itself without deleting the target destination",
    "explanation": "Git safely unlinks the symlink pointer file without recursive traversal of external target directories.",
    "hint": "Unlinks the symlink without touching target destination.",
    "level": "advanced",
    "codeExample": "# Symlink itself is unlinked safely"
  },
  {
    "id": "undo-t11-q25",
    "question": "In summary, what is the best practice workflow when pruning untracked files in a complex project?",
    "shortAnswer": "Run `git clean -nd` for a fast preview; if unsure about candidate files, run `git clean -id` for interactive selection.",
    "options": [
      "Run `git clean -nd` for a quick preview; use `git clean -id` when fine-grained item selection is needed",
      "Run `rm -rf .`",
      "Never clean anything",
      "Run `git clean -fdx` blindly"
    ],
    "answer": "Run `git clean -nd` for a quick preview; use `git clean -id` when fine-grained item selection is needed",
    "explanation": "This tiered approach combines quick visual audits with interactive precision.",
    "hint": "Dry-run for quick checks; Interactive for fine-grained control.",
    "level": "basic",
    "codeExample": "# 1. Quick check: git clean -nd\n# 2. Precision clean: git clean -id"
  }
];

export default questions;
