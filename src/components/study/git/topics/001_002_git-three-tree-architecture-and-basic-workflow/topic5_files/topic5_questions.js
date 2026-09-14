/**
 * Topic 5 Questions: Interactive Staging with git add -p (Patch Mode)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic5_questions = [
  {
    id: 1,
    question: "What is the primary purpose of running `git add -p` (or `git add --patch`)?",
    options: [
      "To download software patches from upstream",
      "To interactively review and stage partial diff hunks within modified files instead of staging entire files",
      "To compress git commit history",
      "To push patches via email"
    ],
    correctAnswer: 1,
    explanation: "`git add -p` enables interactive patch mode, allowing you to selectively stage specific hunks or lines of code within a file."
  },
  {
    id: 2,
    question: "In the `git add -p` interactive prompt `Stage this hunk [y,n,q,a,d,s,e,?]?`, what does pressing `y` do?",
    options: [
      "Yields to background process",
      "Stages the currently displayed hunk into the staging index",
      "Deletes the hunk from disk",
      "Stages all hunks in all files"
    ],
    correctAnswer: 1,
    explanation: "`y` stands for 'yes'—it stages the currently displayed hunk into the index."
  },
  {
    id: 3,
    question: "What does pressing `n` do at the `git add -p` prompt?",
    options: [
      "Creates a new branch",
      "Skips the current hunk, leaving it unstaged in the working directory",
      "Deletes the entire file",
      "Reverts the file to HEAD"
    ],
    correctAnswer: 1,
    explanation: "`n` stands for 'no'—it skips staging this hunk, preserving it in the working tree without adding it to the index."
  },
  {
    id: 4,
    question: "What does pressing `s` do in `git add -p`?",
    options: [
      "Saves the file to disk",
      "Splits the current hunk into smaller sub-hunks if they are separated by unmodified lines",
      "Submits the commit to GitHub",
      "Skips the remainder of the file"
    ],
    correctAnswer: 1,
    explanation: "`s` splits the current diff hunk into smaller independent sub-hunks if there is unchanged context code separating the edits."
  },
  {
    id: 5,
    question: "When is the `s` (split) option NOT available for a hunk in `git add -p`?",
    options: [
      "When the hunk contains only comments",
      "When the changes in the hunk are contiguous (adjacent lines) without any intervening unchanged context lines",
      "When the file is in JavaScript",
      "When using a Windows machine"
    ],
    correctAnswer: 1,
    explanation: "If changes are immediately adjacent on consecutive lines, Git cannot automatically split them. You must use `e` (edit) instead."
  },
  {
    id: 6,
    question: "What does pressing `e` do during `git add -p`?",
    options: [
      "Exports the hunk to an external patch file",
      "Opens the hunk diff in your configured text editor so you can manually edit which exact lines are staged",
      "Erases the changes from disk",
      "Executes the unit tests"
    ],
    correctAnswer: 1,
    explanation: "`e` opens your command-line editor to manually manipulate the diff chunk before staging."
  },
  {
    id: 7,
    question: "What does pressing `q` do during `git add -p`?",
    options: [
      "Cancels all previously staged hunks",
      "Quits interactive patch mode immediately, preserving any hunks that were ALREADY staged during the session",
      "Force pushes changes",
      "Quarantines modified files"
    ],
    correctAnswer: 1,
    explanation: "`q` exits patch mode immediately without processing remaining hunks, keeping whatever hunks you already marked with `y` in the index."
  },
  {
    id: 8,
    question: "What does pressing `a` do during `git add -p`?",
    options: [
      "Stages this hunk and ALL remaining hunks in the current file",
      "Aborts the staging process",
      "Appends a comment to the hunk",
      "Adds all untracked files"
    ],
    correctAnswer: 0,
    explanation: "`a` stages the current hunk and all subsequent hunks in that specific file."
  },
  {
    id: 9,
    question: "What does pressing `d` do during `git add -p`?",
    options: [
      "Deletes the hunk from disk",
      "Does NOT stage this hunk or any of the remaining hunks in this file",
      "Displays the git log",
      "Duplicates the hunk"
    ],
    correctAnswer: 1,
    explanation: "`d` skips the current hunk and all remaining hunks in the current file."
  },
  {
    id: 10,
    question: "Can `git add -p` be run on newly created, untracked (`??`) files directly?",
    options: [
      "Yes, Git natively supports patch mode on untracked files without any preliminary steps",
      "No, Git tracks diffs against the index; an untracked file has no baseline in index unless staged with `git add -N` (intent-to-add) first",
      "Only in Linux terminal",
      "Only if the file is smaller than 1KB"
    ],
    correctAnswer: 1,
    explanation: "Because untracked files have no baseline in index, `git add -p` will skip them unless you first run `git add -N <file>` (intent-to-add) to introduce empty tracking."
  },
  {
    id: 11,
    question: "What does the command `git add -N <file>` (or `--intent-to-add`) do?",
    options: [
      "Stages the file with null contents, establishing an entry in the index so that `git diff` and `git add -p` can recognize and patch it",
      "Deletes the file from disk",
      "Marks the file as non-committable",
      "Prevents future modifications"
    ],
    correctAnswer: 0,
    explanation: "`git add -N` records the file path in index without staging content, enabling patch staging (`git add -p`) on brand new files."
  },
  {
    id: 12,
    question: "Which other Git commands support the `-p` (patch) flag?",
    options: [
      "git checkout -p / git restore -p",
      "git reset -p",
      "git stash -p",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Patch mode (`-p`) is widely supported across Git: `git restore -p`, `git reset -p`, `git stash -p`, and `git diff -p` all use the same interactive interface."
  },
  {
    id: 13,
    question: "How does `git checkout -p <file>` (or `git restore -p <file>`) differ from `git add -p <file>`?",
    options: [
      "`git restore -p` lets you interactively DISCARD specific hunks from your working tree on disk",
      "`git restore -p` is faster",
      "`git restore -p` uploads hunks to GitHub",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "`git restore -p` lets you selectively revert or discard specific code hunks from your working directory while keeping other edits."
  },
  {
    id: 14,
    question: "What does `git reset -p` (or `git restore --staged -p`) do?",
    options: [
      "Reboots your operating system",
      "Allows you to interactively UNSTAGE specific hunks from the Index back to unstaged working tree status",
      "Resets remote repository branch",
      "Deletes Git history"
    ],
    correctAnswer: 1,
    explanation: "`git reset -p` (or `git restore --staged -p`) lets you selectively unstage hunks from the index without losing them from disk."
  },
  {
    id: 15,
    question: "In the manual hunk editor (`e`), how do you exclude an added line (`+const x = 10;`) from being staged?",
    options: [
      "Delete the entire line",
      "Replace the leading `+` with a space ` `",
      "Write `#ignore` at the start",
      "Type `EXIT`"
    ],
    correctAnswer: 1,
    explanation: "In the patch hunk editor, changing `+` to a space turns the addition into unchanged context, excluding it from being staged."
  },
  {
    id: 16,
    question: "In the manual hunk editor (`e`), how do you exclude a deleted line (`-const y = 20;`) from being staged?",
    options: [
      "Delete the minus line completely",
      "Change `-` to `+`",
      "Add `//` before the minus",
      "Replace `-` with `#`"
    ],
    correctAnswer: 0,
    explanation: "Deleting the `-` line entirely in the hunk editor tells Git not to stage the deletion."
  },
  {
    id: 17,
    question: "Susmita is working on `Invoice.jsx`. She fixed a critical tax calculation bug and also added 5 `console.log` statements for debugging. What is her best workflow?",
    options: [
      "Stage the whole file with `git add .` and commit the debug statements",
      "Use `git add -p Invoice.jsx` to stage only the tax calculation fix, commit it cleanly, and then remove debug statements",
      "Delete `Invoice.jsx` and re-write from scratch",
      "Create a separate branch for every line of code"
    ],
    correctAnswer: 1,
    explanation: "Interactive patch staging (`git add -p`) lets developers separate clean production logic from temporary debugging clutter."
  },
  {
    id: 18,
    question: "What does the `?` key do when prompted by `git add -p`?",
    options: [
      "Prints the built-in help text summarizing all available key commands",
      "Runs an AI search",
      "Deletes the hunk",
      "Cancels the commit"
    ],
    correctAnswer: 0,
    explanation: "Pressing `?` prints a helpful breakdown of all interactive options (`y`, `n`, `q`, `a`, `d`, `s`, `e`, etc.)."
  },
  {
    id: 19,
    question: "What does the `/` command do in `git add -p`?",
    options: [
      "Searches forward for a hunk matching a specified regular expression",
      "Divides the hunk into two halves",
      "Comments out lines in the hunk",
      "Quits the program"
    ],
    correctAnswer: 0,
    explanation: "Typing `/` followed by a regex searches for the next hunk matching that pattern."
  },
  {
    id: 20,
    question: "If you staged 2 hunks with `y` and skipped 1 hunk with `n` in `app.js`, what does `git status -s` display?",
    options: [
      "A  app.js",
      "MM app.js",
      " M app.js",
      "M  app.js"
    ],
    correctAnswer: 1,
    explanation: "Because `app.js` has changes staged in Index (the 2 hunks) AND changes still unstaged in Working Tree (the skipped hunk), its status is `MM`."
  },
  {
    id: 21,
    question: "Which command shows only the staged hunks currently in the index?",
    options: [
      "git diff",
      "git diff --staged (or git diff --cached)",
      "git show HEAD",
      "git status -v"
    ],
    correctAnswer: 1,
    explanation: "`git diff --staged` shows precisely the staged hunks that will be incorporated into the next commit."
  },
  {
    id: 22,
    question: "Which command shows the unstaged hunks still remaining in the working directory?",
    options: [
      "git diff",
      "git diff --staged",
      "git diff HEAD",
      "git status"
    ],
    correctAnswer: 0,
    explanation: "`git diff` (without flags) displays differences between the working tree and the staging index."
  },
  {
    id: 23,
    question: "Why is `git stash -p` especially useful during code reviews or urgent hotfixes?",
    options: [
      "It allows you to selectively stash experimental code snippets while keeping your bug fix active in the working tree",
      "It speeds up internet connection",
      "It merges remote branches automatically",
      "It creates binary backups"
    ],
    correctAnswer: 0,
    explanation: "`git stash -p` lets you interactively stash experimental changes, leaving only clean code in your working tree."
  },
  {
    id: 24,
    question: "What happens if you make a syntax error when manually editing a hunk with `e` in `git add -p`?",
    options: [
      "Git crashes your computer",
      "Git rejects the edited patch with an error message ('patch does not apply') and leaves the hunk in its original state",
      "Git deletes the file",
      "Git commits anyway"
    ],
    correctAnswer: 1,
    explanation: "If an edited diff is malformed or invalid, Git refuses to apply it, reports an error, and prompts you again."
  },
  {
    id: 25,
    question: "What is the core philosophy taught by Sukanta Hui regarding `git add -p`?",
    options: [
      "Code messily during development, but curate cleanly during commit",
      "Never edit code in text editors",
      "Always commit entire directories at once",
      "Avoid using Git branches"
    ],
    correctAnswer: 0,
    explanation: "Sukanta Hui teaches that exploratory coding can be fluid and iterative, but Git version history must be curated cleanly using tools like `git add -p`."
  }
];

export default topic5_questions;
