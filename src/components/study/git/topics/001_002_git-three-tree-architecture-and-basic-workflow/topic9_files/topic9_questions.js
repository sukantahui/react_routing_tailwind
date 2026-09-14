/**
 * Topic 9 Questions: Inspecting Unstaged vs Staged Changes with git diff
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic9_questions = [
  {
    id: 1,
    question: "What two trees does the command `git diff` (with no flags) compare by default?",
    options: [
      "Working Tree vs Staging Area (Index)",
      "Staging Area (Index) vs HEAD Commit",
      "Local HEAD vs Remote origin/main",
      "Current branch vs default branch"
    ],
    correctAnswer: 0,
    explanation: "`git diff` shows unstaged modifications by comparing what is currently in your Working Directory against what is recorded in the Staging Area (Index)."
  },
  {
    id: 2,
    question: "What two trees does `git diff --staged` (or `git diff --cached`) compare?",
    options: [
      "Staging Area (Index) vs HEAD (last commit)",
      "Working Tree vs Index",
      "Local master vs GitHub",
      "Stash vs Working Tree"
    ],
    correctAnswer: 0,
    explanation: "`git diff --staged` displays the changes currently staged in the index ready to be written to the next commit, comparing the Index against HEAD."
  },
  {
    id: 3,
    question: "What is the relationship between `git diff --staged` and `git diff --cached`?",
    options: [
      "They are exact synonyms and produce completely identical output",
      "`--cached` only works in older Git versions and has been removed",
      "`--staged` requires root permissions",
      "`--cached` only compares binary files"
    ],
    correctAnswer: 0,
    explanation: "`--staged` was introduced as a more intuitive synonym for `--cached`; both do the exact same comparison."
  },
  {
    id: 4,
    question: "What does the command `git diff HEAD` compare?",
    options: [
      "Working Tree directly against the latest HEAD commit (showing all changes since last commit, both staged and unstaged)",
      "The staging area against the remote branch",
      "The initial root commit against the latest commit",
      "The author of the commit against the committer"
    ],
    correctAnswer: 0,
    explanation: "`git diff HEAD` compares the working directory on disk directly to the latest commit in HEAD, showing the sum total of all uncommitted work."
  },
  {
    id: 5,
    question: "In standard unified diff format, what does the hunk header `@@ -15,4 +15,6 @@` signify?",
    options: [
      "The original file started at line 15 and had 4 lines; the new version starts at line 15 and now has 6 lines",
      "There are 15 files with 4 errors and 6 warnings",
      "The commit was authored on day 15 by 4 contributors",
      "Memory offset coordinates"
    ],
    correctAnswer: 0,
    explanation: "In `@@ -l,s +l,s @@`, `-` denotes the baseline file (starting at line 15, length 4) and `+` denotes the new target file (starting at line 15, length 6)."
  },
  {
    id: 6,
    question: "What does a line starting with `+` in green represent in a unified diff?",
    options: [
      "A line that was added or modified in the target version",
      "A positive math operation",
      "A permission increase",
      "An unmerged conflict marker"
    ],
    correctAnswer: 0,
    explanation: "Lines prefixed with `+` represent lines added in the target state relative to the baseline."
  },
  {
    id: 7,
    question: "What does a line starting with `-` in red represent in a unified diff?",
    options: [
      "A line that was removed or replaced in the target version",
      "A negative test assertion",
      "A failed commit",
      "A decrement operator"
    ],
    correctAnswer: 0,
    explanation: "Lines prefixed with `-` represent lines deleted in the target state relative to the baseline."
  },
  {
    id: 8,
    question: "Which flag allows you to ignore all whitespace and indentation differences when viewing diffs?",
    options: [
      "git diff -w (or --ignore-all-space)",
      "git diff --clean",
      "git diff -s",
      "git diff --no-spaces"
    ],
    correctAnswer: 0,
    explanation: "`git diff -w` (or `--ignore-all-space`) ignores whitespace when comparing lines, perfect for filtering out indentation reformats."
  },
  {
    id: 9,
    question: "Which flag produces a high-level summary of changed files with numeric insertion/deletion bars?",
    options: [
      "git diff --stat",
      "git diff --summary-only",
      "git diff -b",
      "git diff --chart"
    ],
    correctAnswer: 0,
    explanation: "`git diff --stat` prints a file-by-file summary of changed lines with visual `+` and `-` graph bars."
  },
  {
    id: 10,
    question: "How do you view word-level highlights inside modified lines instead of full-line replacements?",
    options: [
      "git diff --word-diff",
      "git diff --words",
      "git diff -W",
      "git diff --highlight"
    ],
    correctAnswer: 0,
    explanation: "`git diff --word-diff` highlights changes inline between words `[-old-]{+new+}` rather than entire lines."
  },
  {
    id: 11,
    question: "If you want to view diffs for only a specific file `src/tax.js`, what is the command syntax?",
    options: [
      "git diff src/tax.js (or git diff -- src/tax.js)",
      "git diff -f src/tax.js",
      "git diff:src/tax.js",
      "git show src/tax.js"
    ],
    correctAnswer: 0,
    explanation: "Passing a file path (optionally preceded by `--` path separator) scopes the diff strictly to that target file."
  },
  {
    id: 12,
    question: "If a new file is completely untracked (`??`), why does `git diff` show nothing for it?",
    options: [
      "Because untracked files are not in the index; Git diff only compares tracked entities unless staged or given `--no-index`",
      "Because Git diff only works on text files under 100 bytes",
      "Because untracked files are encrypted",
      "Because Git status deleted them"
    ],
    correctAnswer: 0,
    explanation: "`git diff` only checks tracked files against the index. Untracked files have no baseline in index."
  },
  {
    id: 13,
    question: "How can you use `git diff` to compare two arbitrary files outside of a git repository?",
    options: [
      "git diff --no-index fileA.txt fileB.txt",
      "git diff --external fileA fileB",
      "git compare fileA fileB",
      "git diff fileA -> fileB"
    ],
    correctAnswer: 0,
    explanation: "`git diff --no-index fileA fileB` uses Git's unified diff engine to compare any two arbitrary files on disk."
  },
  {
    id: 14,
    question: "What command outputs ONLY the list of changed file paths without the diff hunks?",
    options: [
      "git diff --name-only",
      "git diff --files",
      "git diff -l",
      "git diff --list"
    ],
    correctAnswer: 0,
    explanation: "`git diff --name-only` prints just the file paths that have modifications."
  },
  {
    id: 15,
    question: "What command compares the differences between two branches `feature` and `main`?",
    options: [
      "git diff main..feature",
      "git diff main feature",
      "Both git diff main..feature and git diff main feature",
      "git diff --branches"
    ],
    correctAnswer: 2,
    explanation: "`git diff main..feature` (or `git diff main feature`) compares the tip of `main` against the tip of `feature`."
  },
  {
    id: 16,
    question: "What does the triple-dot syntax `git diff main...feature` compare?",
    options: [
      "The common ancestor (merge-base) of `main` and `feature` against the tip of `feature`",
      "All three branches",
      "Every commit in reverse",
      "Only untracked files"
    ],
    correctAnswer: 0,
    explanation: "Triple-dot `git diff A...B` shows changes made on branch B starting from the point where it originally diverged from A (merge-base)."
  },
  {
    id: 17,
    question: "Susmita edits `invoice.js`, runs `git add invoice.js`, and then runs `git diff`. What does she see?",
    options: [
      "Nothing (blank output), because the working tree matches the staging index!",
      "The full diff of invoice.js",
      "A git conflict error",
      "The git log"
    ],
    correctAnswer: 0,
    explanation: "Since she staged all changes into the index, Working Tree == Index, so `git diff` outputs nothing. She should run `git diff --staged` to see her staged changes!"
  },
  {
    id: 18,
    question: "If Sachin wants to see what changes he is about to commit to the repository right now, which command should he run?",
    options: [
      "git diff --staged",
      "git diff",
      "git log",
      "git status -u"
    ],
    correctAnswer: 0,
    explanation: "`git diff --staged` is the authoritative command to inspect exactly what will be recorded in the next commit."
  },
  {
    id: 19,
    question: "What does `git diff --check` do?",
    options: [
      "Warns if changes introduce trailing whitespace, whitespace errors, or conflict markers",
      "Runs automated unit tests",
      "Checks internet connection to GitHub",
      "Checks disk space"
    ],
    correctAnswer: 0,
    explanation: "`git diff --check` scans for whitespace errors (e.g. trailing spaces at line ends, leftover conflict markers) and returns non-zero if found."
  },
  {
    id: 20,
    question: "How can you view the diff of changes made in the latest commit (HEAD vs its parent HEAD~1)?",
    options: [
      "git show HEAD (or git diff HEAD~1 HEAD)",
      "git diff --latest",
      "git diff --parent",
      "git inspect HEAD"
    ],
    correctAnswer: 0,
    explanation: "`git show HEAD` (or `git diff HEAD~1 HEAD`) displays the diff introduced by the most recent commit."
  },
  {
    id: 21,
    question: "What command opens your visual GUI diff tool (e.g., VS Code, Beyond Compare, Meld)?",
    options: [
      "git difftool",
      "git gui-diff",
      "git visual",
      "code --diff-all"
    ],
    correctAnswer: 0,
    explanation: "`git difftool` launches your configured visual diff comparison program."
  },
  {
    id: 22,
    question: "What is the purpose of the `--color-words` flag in `git diff`?",
    options: [
      "Highlights added and removed words in colored inline text without diff bracket markers",
      "Changes terminal background to rainbow colors",
      "Formats CSS colors into hexadecimal",
      "Colorizes HTML syntax"
    ],
    correctAnswer: 0,
    explanation: "`--color-words` provides a clean, colored inline word-diff visualization."
  },
  {
    id: 23,
    question: "If you have 10 modified files and want to see the diff of only JavaScript files, what command do you run?",
    options: [
      "git diff '*.js'",
      "git diff --type=js",
      "git diff -js",
      "git diff [js]"
    ],
    correctAnswer: 0,
    explanation: "Pathspec pattern `git diff '*.js'` filters the diff output to JavaScript files."
  },
  {
    id: 24,
    question: "Why does Sukanta Hui emphasize running both `git diff` and `git diff --staged` during the coding loop?",
    options: [
      "To guarantee total visibility: `git diff` checks what's left on disk, while `git diff --staged` audits what is entering the permanent record",
      "Because Git requires both before allowing a push",
      "Because it resets CPU throttling",
      "To clean temporary cache files"
    ],
    correctAnswer: 0,
    explanation: "Dual diff inspection ensures that you never commit half-baked code or leave critical changes behind unstaged."
  },
  {
    id: 25,
    question: "What does `git diff -U5` do?",
    options: [
      "Increases the unchanged context lines shown around each diff hunk from the default 3 lines to 5 lines",
      "Compares 5 commits",
      "Runs diff with 5 threads",
      "Upgrades diff algorithm to version 5"
    ],
    correctAnswer: 0,
    explanation: "The `-U<n>` (or `--unified=<n>`) option controls how many context lines of code Git displays above and below each diff hunk."
  }
];

export default topic9_questions;
