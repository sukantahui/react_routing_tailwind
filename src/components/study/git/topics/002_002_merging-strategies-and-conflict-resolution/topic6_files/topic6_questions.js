// ==============================================================================
// TOPIC 6 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Anatomy of Conflict Markers: <<<<<<< HEAD, =======, and >>>>>>> feature
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "How many consecutive '<' characters denote the beginning of a Git conflict marker block?",
    options: [
      "3 (< < <)",
      "5 (< < < < <)",
      "7 (<<<<<<<)",
      "10 (<<<<<<<<<<)"
    ],
    answer: 2,
    explanation: "Git strictly uses seven consecutive less-than signs (`<<<<<<<`) followed by a space and the active branch/HEAD ref name to mark the start of a conflict block."
  },
  {
    id: 2,
    question: "What does the text located between `<<<<<<< HEAD` and `=======` represent?",
    options: [
      "The incoming changes from the remote branch",
      "The current changes on the branch you are actively standing on (HEAD / 'ours')",
      "The original ancestor code before any commits",
      "Git configuration metadata"
    ],
    answer: 1,
    explanation: "The section between `<<<<<<< HEAD` and `=======` contains the local version of the code residing on the current branch (HEAD)."
  },
  {
    id: 3,
    question: "What does the line containing `=======` (7 equals signs) represent in a conflict block?",
    options: [
      "A mathematical equation",
      "The central divider boundary separating the current (HEAD) version from the incoming version",
      "An indicator that both branches have equal priority",
      "A syntax comment that is ignored by compilers"
    ],
    answer: 1,
    explanation: "The `=======` line acts as the dividing partition between the local (HEAD) changes and the incoming (theirs) changes."
  },
  {
    id: 4,
    question: "What does `>>>>>>> feature-branch` signify in a conflict marker?",
    options: [
      "The start of a rebase sequence",
      "The end of the conflicting section, specifying the branch or commit hash being merged in",
      "An error in the network connection",
      "A fast-forward merge confirmation"
    ],
    answer: 1,
    explanation: "Seven greater-than characters followed by the branch name mark the end boundary of the conflict block and identify the incoming branch."
  },
  {
    id: 5,
    question: "What happens if a developer forgets to remove `<<<<<<< HEAD` from a JavaScript file before committing?",
    options: [
      "Node.js will treat it as a comment",
      "The JavaScript engine will throw a fatal `SyntaxError: Unexpected token '<'` when parsed",
      "Git will automatically delete the marker at runtime",
      "GitHub will automatically reformat the file"
    ],
    answer: 1,
    explanation: "Conflict markers are raw text strings. Leftover markers in source code result in runtime syntax and compilation errors."
  },
  {
    id: 6,
    question: "What additional section is displayed when `merge.conflictStyle` is configured to `diff3` or `zdiff3`?",
    options: [
      "A security audit log",
      "The common base (ancestor) code demarcated by `||||||| base`",
      "A list of GitHub usernames",
      "A timeline graph of all commits"
    ],
    answer: 1,
    explanation: "In `diff3` and `zdiff3` styles, Git inserts a `||||||| <base>` section showing the original common ancestor code before both branches diverged."
  },
  {
    id: 7,
    question: "Why is `diff3` or `zdiff3` conflict style often preferred by senior software engineers?",
    options: [
      "It makes the files 50% smaller",
      "It provides complete context by showing what the code looked like originally, making it easier to understand why each developer modified it",
      "It resolves all conflicts automatically without human intervention",
      "It prevents junior developers from pushing commits"
    ],
    answer: 1,
    explanation: "Knowing the ancestor code (Base) clarifies intent: you can easily see that Base was ₹500, Sachin raised it to ₹1,200, and Susmita changed it to ₹2,500."
  },
  {
    id: 8,
    question: "Which command configures Git to globally use modern `zdiff3` conflict markers?",
    options: [
      "git config --global merge.conflictStyle zdiff3",
      "git config --global markers.show 3way",
      "git set-conflict 3way",
      "git merge --style=modern"
    ],
    answer: 0,
    explanation: "`git config --global merge.conflictStyle zdiff3` enables zealous diff3, which cleans up common prefix/suffix lines and shows the base block."
  },
  {
    id: 9,
    question: "When resolving a conflict, which lines must ALWAYS be deleted?",
    options: [
      "Only the `=======` divider",
      "All conflict marker lines (`<<<<<<<`, `|||||||`, `=======`, `>>>>>>>`)",
      "The entire file contents",
      "Only the incoming branch code"
    ],
    answer: 1,
    explanation: "All delimiter lines injected by Git must be completely removed so that only valid, syntactically clean code remains."
  },
  {
    id: 10,
    question: "Can a conflict resolution involve combining code from BOTH HEAD and incoming branches?",
    options: [
      "No, Git only allows picking one or the other",
      "Yes, the developer can freely edit the code to combine features, add conditionals, or rewrite the logic entirely",
      "Only if authorized by GitHub Enterprise",
      "Only when using Linux"
    ],
    answer: 1,
    explanation: "The developer has complete freedom: accept current, accept incoming, combine both into a unified function, or write an entirely new implementation."
  },
  {
    id: 11,
    question: "What command should be run immediately after manually editing and cleaning all conflict markers in a file?",
    options: [
      "git push origin main",
      "git add <filename>",
      "git rebase --hard",
      "git branch -m"
    ],
    answer: 1,
    explanation: "Running `git add <filename>` stages the resolved file and signals to Git that the conflict on that file has been resolved."
  },
  {
    id: 12,
    question: "What does `git status` display for a file where conflict markers have been resolved and staged via `git add`?",
    options: [
      "both modified (red)",
      "modified: src/file.js (green, under 'Changes to be committed')",
      "fatal: unmerged files exist",
      "untracked files"
    ],
    answer: 1,
    explanation: "Once staged with `git add`, the file transitions from red 'Unmerged paths' to green 'Changes to be committed' ready for merge commit."
  },
  {
    id: 13,
    question: "In VS Code, what do the CodeLens buttons above conflict markers ('Accept Current Change', 'Accept Incoming Change', 'Accept Both Changes', 'Compare Changes') do?",
    options: [
      "They send an email to the repository owner",
      "They provide one-click visual shortcuts to strip markers and retain the selected code block automatically",
      "They run `git push --force` in the background",
      "They format the code with Prettier"
    ],
    answer: 1,
    explanation: "VS Code's built-in Git integration recognizes `<<<<<<<` syntax and offers one-click actions to resolve the block effortlessly."
  },
  {
    id: 14,
    question: "If a file contains 3 separate conflict blocks, can you resolve some with 'Current' and others with 'Incoming'?",
    options: [
      "No, the whole file must use one branch's version",
      "Yes, each conflict block within a file is independent and can be resolved individually",
      "Only if you split the file into three separate files first",
      "Only in Git 3.0+"
    ],
    answer: 1,
    explanation: "Each conflict block represents a local line collision and can be resolved independently based on the specific logic requirements."
  },
  {
    id: 15,
    question: "What is the primary difference between `diff3` and `zdiff3` in modern Git?",
    options: [
      "zdiff3 compresses files with zip algorithm",
      "zdiff3 ('zealous diff3') strips common prefix and suffix lines from the conflict block, resulting in smaller, cleaner conflict regions",
      "zdiff3 is deprecated",
      "zdiff3 only works on GitHub Actions"
    ],
    answer: 1,
    explanation: "Introduced in Git 2.35, `zdiff3` trims matching lines from the start and end of the conflicted region to present a much more focused diff."
  },
  {
    id: 16,
    question: "If `git commit` is executed during a merge conflict without staging resolved files, what does Git output?",
    options: [
      "Git automatically commits whatever is in the working tree",
      "Git aborts with: 'fatal: Exiting because of an unresolved conflict.' or 'error: Committing is not possible because you have unmerged files.'",
      "Git creates a corrupted commit",
      "Git restarts the computer"
    ],
    answer: 1,
    explanation: "Git strictly guards against accidental commits of unmerged files and blocks the commit until all unmerged paths are staged."
  },
  {
    id: 17,
    question: "Which command searches the entire repository for any leftover conflict markers before a production release?",
    options: [
      "git grep '<<<<<<<'",
      "git status --clean",
      "git verify --markers",
      "git clean -df"
    ],
    answer: 0,
    explanation: "Running `git grep '<<<<<<<'` searches all tracked files for accidental leftover conflict delimiters."
  },
  {
    id: 18,
    question: "Why might a conflict marker show a commit SHA like `>>>>>>> 4f8a92b` instead of a branch name?",
    options: [
      "Because the branch was deleted, or the merge was initiated directly using a commit SHA, tag, or detached HEAD reference",
      "Because Git forgot the branch name",
      "Because SHA-1 is being replaced with SHA-256",
      "Because the repository is corrupted"
    ],
    answer: 0,
    explanation: "When merging a specific commit SHA, tag, or detached commit, Git displays the target SHA rather than a branch name."
  },
  {
    id: 19,
    question: "In Coder & AccoTax's billing system, Sachin sees `<<<<<<< HEAD` with ₹1,200 and `>>>>>>> feature` with ₹2,500. What is the best engineering decision?",
    options: [
      "Delete Susmita's code without telling her",
      "Discuss with Susmita and implement a tiered function `calculateBill(amount, tier = 'corporate')` supporting both rates",
      "Delete the file and quit the project",
      "Flip a coin"
    ],
    answer: 1,
    explanation: "Software engineering is collaborative: resolving business conflicts requires understanding both requirements and building a robust solution."
  },
  {
    id: 20,
    question: "What tool does Git provide to launch an external 3-way visual resolution GUI?",
    options: [
      "git mergetool",
      "git open-gui",
      "git resolve --visual",
      "git ui merge"
    ],
    answer: 0,
    explanation: "`git mergetool` opens configured visual merge tools like VS Code, Meld, KDiff3, or Beyond Compare."
  },
  {
    id: 21,
    question: "Can conflict markers appear in binary files (like .png or .zip)?",
    options: [
      "Yes, Git writes markers inside image pixels",
      "No, Git cannot insert text markers into binaries; it flags 'Binary files differ' and requires selecting one version or using `checkout --ours/--theirs`",
      "Only in SVG vector files",
      "Only in animated GIFs"
    ],
    answer: 1,
    explanation: "Git treats binary files as atomic blobs; it cannot inject text markers and requires explicit selection of `--ours` or `--theirs`."
  },
  {
    id: 22,
    question: "How do you choose 'our' version of a binary image during a merge conflict?",
    options: [
      "git checkout --ours -- assets/logo.png && git add assets/logo.png",
      "git merge --accept-ours",
      "git delete incoming/logo.png",
      "git keep image.png"
    ],
    answer: 0,
    explanation: "`git checkout --ours -- <file>` extracts Stage 2 (current branch) blob from the index, which is then staged with `git add`."
  },
  {
    id: 23,
    question: "How do you choose 'their' (incoming) version of a binary file during a merge conflict?",
    options: [
      "git checkout --theirs -- assets/logo.png && git add assets/logo.png",
      "git pull --force-binary",
      "git restore --theirs",
      "git accept-theirs"
    ],
    answer: 0,
    explanation: "`git checkout --theirs -- <file>` pulls the Stage 3 version into the working directory, followed by `git add`."
  },
  {
    id: 24,
    question: "When Git pauses with conflict markers, what file in the `.git` directory stores the active merge message?",
    options: [
      ".git/MERGE_MSG",
      ".git/CONFLICT_LOG",
      ".git/HEAD_MERGE",
      ".git/index.lock"
    ],
    answer: 0,
    explanation: "Git prepares the default merge commit message in `.git/MERGE_MSG`, which will be used when you finally execute `git commit`."
  },
  {
    id: 25,
    question: "What is Sukanta Sir's key piece of advice when dealing with multiple conflict markers?",
    options: [
      "Work methodically file-by-file and chunk-by-chunk, test the code after removing all markers, and never commit without running unit tests",
      "Delete all markers as fast as possible without reading the code",
      "Always accept current changes blindly",
      "Never merge on a Friday"
    ],
    answer: 0,
    explanation: "Sukanta Sir emphasizes systematic resolution: inspect each marker, write clean unified code, delete all delimiter lines, verify tests, and commit."
  }
];

export default questions;
