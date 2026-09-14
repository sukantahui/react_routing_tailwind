// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 8: Comparing Revisions with git diff: Comparing Working Tree to HEAD, Index to HEAD, and arbitrary commits (git diff commitA commitB)
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What does running bare 'git diff' (with no arguments) compare?",
    options: [
      "The Working Directory against the Staging Area (Index)",
      "The Staging Area against the latest commit (HEAD)",
      "The local branch against the remote origin",
      "The last two commits in history"
    ],
    correctAnswer: 0,
    explanation: "'git diff' compares unstaged changes in the Working Directory against what has been cached in the Staging Area (Index)."
  },
  {
    id: 2,
    question: "Which command reveals exactly what changes are currently staged and ready to be committed?",
    options: [
      "git diff --staged (or git diff --cached)",
      "git diff HEAD",
      "git diff --index-only",
      "git diff --pending"
    ],
    correctAnswer: 0,
    explanation: "'git diff --staged' (and its legacy synonym 'git diff --cached') compares the Index against the HEAD commit."
  },
  {
    id: 3,
    question: "What does 'git diff HEAD' compare?",
    options: [
      "The entire Working Directory (both staged and unstaged modifications) directly against the HEAD commit",
      "Only untracked files",
      "The Staging Area against the remote branch",
      "The previous commit against HEAD"
    ],
    correctAnswer: 0,
    explanation: "'git diff HEAD' compares your active workspace on disk directly to the latest commit, ignoring the staging boundary."
  },
  {
    id: 4,
    question: "How does the three-dot diff 'git diff main...feature' differ from the two-dot diff 'git diff main..feature'?",
    options: [
      "Three-dot compares the common merge-base ancestor against 'feature' (showing only PR changes); two-dot directly compares the tips of both branches",
      "Three-dot deletes obsolete commits",
      "Two-dot only works on tags",
      "There is no difference in Git"
    ],
    correctAnswer: 0,
    explanation: "In 'git diff', 'A...B' calculates changes on branch B starting from the common merge-base ancestor shared with branch A (the PR view)."
  },
  {
    id: 5,
    question: "Which command compares the state of the repository between release tag 'v1.0.0' and release tag 'v2.0.0'?",
    options: [
      "git diff v1.0.0 v2.0.0",
      "git log v1.0.0 v2.0.0",
      "git compare v1.0.0 v2.0.0",
      "git checkout-diff v1.0.0 v2.0.0"
    ],
    correctAnswer: 0,
    explanation: "'git diff <commitA> <commitB>' calculates the direct difference between any two commit or tag snapshots."
  },
  {
    id: 6,
    question: "How can you restrict 'git diff' to display changes for only one specific file?",
    options: [
      "git diff -- path/to/file.js",
      "git diff --only path/to/file.js",
      "git diff --file path/to/file.js",
      "git check-diff path/to/file.js"
    ],
    correctAnswer: 0,
    explanation: "Appending '-- <path>' limits the diff calculation strictly to the specified pathspec."
  },
  {
    id: 7,
    question: "What does the command 'git diff --check' do?",
    options: [
      "Warns about whitespace errors, trailing whitespace, and leftover conflict markers (<<<<<<<, =======, >>>>>>>)",
      "Verifies GPG signatures on all commits",
      "Runs automated unit tests",
      "Checks internet connection to GitHub"
    ],
    correctAnswer: 0,
    explanation: "'git diff --check' identifies whitespace errors, trailing carriage returns, and unresolved merge conflict markers."
  },
  {
    id: 8,
    question: "Which flag displays only the names of files that changed between two branches without generating full diffs?",
    options: [
      "git diff --name-only main feature",
      "git diff --files-only main feature",
      "git diff --list main feature",
      "git diff --brief main feature"
    ],
    correctAnswer: 0,
    explanation: "'--name-only' outputs only the list of modified file paths."
  },
  {
    id: 9,
    question: "What is the effect of running 'git diff -w' (or 'git diff --ignore-all-space')?",
    options: [
      "Ignores all whitespace when comparing lines, preventing massive indentation diffs",
      "Writes the diff output directly to a file named 'w'",
      "Waits 5 seconds before printing diffs",
      "Warns about large files"
    ],
    correctAnswer: 0,
    explanation: "'-w' ignores all whitespace changes (spaces, tabs, indentation) when computing line differences."
  },
  {
    id: 10,
    question: "If Swadeep edits 'app.js' and runs 'git add app.js', what will 'git diff' output?",
    options: [
      "Nothing (empty output), because 'app.js' is now staged and identical to the index",
      "The full diff of app.js",
      "A fatal error",
      "The commit history of app.js"
    ],
    correctAnswer: 0,
    explanation: "Since 'app.js' was staged, the Working Tree matches the Index, so 'git diff' outputs nothing. 'git diff --staged' must be used."
  },
  {
    id: 11,
    question: "How can you view the summary statistics (insertions/deletions) when comparing two branches?",
    options: [
      "git diff --stat main feature",
      "git diff --metrics main feature",
      "git stat-diff main feature",
      "git log --diff-stat main feature"
    ],
    correctAnswer: 0,
    explanation: "'git diff --stat <revA> <revB>' outputs file modification statistics and histogram bars."
  },
  {
    id: 12,
    question: "What does 'git diff HEAD~3..HEAD' display?",
    options: [
      "The combined diff of the last 3 commits relative to the state 3 commits ago",
      "The 3rd line of HEAD",
      "All commits by author 3",
      "A syntax error"
    ],
    correctAnswer: 0,
    explanation: "'HEAD~3..HEAD' compares the snapshot 3 commits prior against the current HEAD snapshot."
  },
  {
    id: 13,
    question: "What does 'git diff --color-words' display?",
    options: [
      "A colored inline word-diff where added words are green and deleted words are red without entire lines being repeated",
      "A rainbow palette for every sentence",
      "A syntax-highlighted code editor",
      "The commit message word cloud"
    ],
    correctAnswer: 0,
    explanation: "'--color-words' displays word-by-word diffs using ANSI color codes."
  },
  {
    id: 14,
    question: "Which of the following compares your local 'main' branch against the remote tracking branch 'origin/main'?",
    options: [
      "git diff main origin/main",
      "git diff --remote main",
      "git check-remote main",
      "git compare-origin main"
    ],
    correctAnswer: 0,
    explanation: "'git diff main origin/main' calculates what changes exist between your local branch and the fetched remote branch."
  },
  {
    id: 15,
    question: "What does 'git diff --staged --stat' show?",
    options: [
      "File modification statistics for staged changes that will go into the next commit",
      "The statistics of untracked files",
      "The memory size of the staging area",
      "The status of the remote server"
    ],
    correctAnswer: 0,
    explanation: "Combining '--staged' with '--stat' gives a clean breakdown of insertions and deletions for staged changes."
  },
  {
    id: 16,
    question: "How can you compare a single file between two different branches (e.g., 'main' and 'feature/tax')?",
    options: [
      "git diff main feature/tax -- src/tax.js",
      "git compare main:src/tax.js feature/tax:src/tax.js",
      "git diff-branch main feature/tax src/tax.js",
      "git inspect-file main feature/tax src/tax.js"
    ],
    correctAnswer: 0,
    explanation: "'git diff branchA branchB -- <path>' compares that exact file across both branch tips."
  },
  {
    id: 17,
    question: "What does 'git diff --no-index dirA/ dirB/' allow developers to do?",
    options: [
      "Compare any two arbitrary filesystem directories even outside of a Git repository",
      "Delete the .git/index file",
      "Bypass index staging errors",
      "Speed up git diff by disabling indexes"
    ],
    correctAnswer: 0,
    explanation: "'git diff --no-index' uses Git's powerful diff algorithm to compare two arbitrary folders or files on disk outside any repository."
  },
  {
    id: 18,
    question: "What does 'git diff --ignore-space-change' (-b) ignore?",
    options: [
      "Changes in amount of whitespace (e.g. 2 spaces vs 4 spaces, or spaces vs tabs)",
      "All newline additions",
      "Blank files",
      "Comment lines"
    ],
    correctAnswer: 0,
    explanation: "'-b' ignores changes in the amount of whitespace, treating sequences of spaces as equivalent."
  },
  {
    id: 19,
    question: "What is the exit code of 'git diff --exit-code' when differences are detected?",
    options: [
      "Exit code 1 (useful in CI scripts to fail a build if uncommitted changes exist)",
      "Exit code 0",
      "Exit code 255",
      "Exit code 128"
    ],
    correctAnswer: 0,
    explanation: "'--exit-code' causes git diff to exit with 1 if differences were found, and 0 if no differences exist."
  },
  {
    id: 20,
    question: "How can Susmita view all unstaged changes excluding deleted files?",
    options: [
      "git diff --diff-filter=d",
      "git diff --no-deleted",
      "git diff --without-d",
      "git diff --skip-deletions"
    ],
    correctAnswer: 0,
    explanation: "'--diff-filter=d' (lowercase 'd' excludes deleted files) filters out deletions from the diff output."
  },
  {
    id: 21,
    question: "What does 'git diff --cached' do?",
    options: [
      "It is the exact legacy synonym for 'git diff --staged'",
      "It clears the Git memory cache",
      "It downloads remote cache objects",
      "It compares cached credentials"
    ],
    correctAnswer: 0,
    explanation: "'--cached' was the original flag in Git, later supplemented by the more intuitive alias '--staged'."
  },
  {
    id: 22,
    question: "What does a line starting with 'old mode 100644' and 'new mode 100755' in a git diff represent?",
    options: [
      "A file permission mode change (e.g. making a file executable with chmod +x)",
      "A file compression level upgrade",
      "An encryption algorithm switch",
      "A line ending format change"
    ],
    correctAnswer: 0,
    explanation: "Git tracks executable bit permission modes (644 normal vs 755 executable) and reports mode mutations in diffs."
  },
  {
    id: 23,
    question: "How can you view the diff of a specific commit against its parent using git diff?",
    options: [
      "git diff 7b1e4a8^ 7b1e4a8 (or git diff 7b1e4a8~1 7b1e4a8)",
      "git diff 7b1e4a8",
      "git diff --commit 7b1e4a8",
      "git diff --parent 7b1e4a8"
    ],
    correctAnswer: 0,
    explanation: "'7b1e4a8^' refers to the parent of 7b1e4a8; comparing parent to child yields the commit's diff."
  },
  {
    id: 24,
    question: "Why should developers always run 'git diff --staged' before executing 'git commit'?",
    options: [
      "To verify that only intended changes are staged and no debug logs, secrets, or temporary files are accidentally included",
      "Because Git requires it before committing",
      "To compress the staging area",
      "To test remote SSH credentials"
    ],
    correctAnswer: 0,
    explanation: "Reviewing staged diffs is standard engineering hygiene to prevent committing unwanted debug statements or secrets."
  },
  {
    id: 25,
    question: "Which of the following is the best command to check the exact differences between what is on disk vs what was last committed to HEAD?",
    options: [
      "git diff HEAD",
      "git diff --staged",
      "git diff",
      "git log -1"
    ],
    correctAnswer: 0,
    explanation: "'git diff HEAD' compares the entire Working Tree (both staged and unstaged edits) against the HEAD commit."
  }
];

export default questions;
