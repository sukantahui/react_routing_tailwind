// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 6: Viewing Detailed Changes in Log: git log -p (inline diffs) and git log --stat (file modification statistics)
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What does the '-p' flag (or '--patch') add to the git log output?",
    options: [
      "The full unified diff patch showing exact line-by-line additions and deletions for every modified file",
      "A progress bar indicating repository download status",
      "Permissions configuration for branch protection",
      "The GPG public key of the committer"
    ],
    correctAnswer: 0,
    explanation: "'-p' (shorthand for '--patch' or '-u') renders the unified diff showing exact line insertions and deletions underneath each commit."
  },
  {
    id: 2,
    question: "What information does 'git log --stat' provide below each commit?",
    options: [
      "A list of modified files, a visual histogram bar of insertions (+) and deletions (-), and total changed lines",
      "The memory usage of the Git daemon",
      "The network packet transfer rate",
      "The database index size"
    ],
    correctAnswer: 0,
    explanation: "'--stat' prints file names modified, line change counts with visual '+' and '-' bars, and a cumulative summary line."
  },
  {
    id: 3,
    question: "Which flag is completely synonymous with 'git log -p'?",
    options: [
      "git log --patch (and git log -u)",
      "git log --print",
      "git log --preview",
      "git log --plain"
    ],
    correctAnswer: 0,
    explanation: "'-p', '-u', and '--patch' are completely interchangeable synonyms in Git."
  },
  {
    id: 4,
    question: "What does 'git log --shortstat' output?",
    options: [
      "Only the condensed summary line (e.g., '3 files changed, 14 insertions(+), 2 deletions(-)') without individual file names",
      "A 2-character abbreviation of the commit message",
      "Short commit hashes only",
      "A truncated list of the first 2 files"
    ],
    correctAnswer: 0,
    explanation: "'--shortstat' suppresses the per-file breakdown and only outputs the final numeric summary line."
  },
  {
    id: 5,
    question: "Why is 'git log --numstat' preferred by DevOps automation scripts over 'git log --stat'?",
    options: [
      "It provides exact machine-readable numbers for insertions and deletions separated by tabs (%x09)",
      "It encrypts stats for security",
      "It skips merge commits automatically",
      "It computes cyclomatic code complexity"
    ],
    correctAnswer: 0,
    explanation: "'--numstat' outputs tab-delimited integer counts (<added>\\t<deleted>\\t<filename>), making it trivial to parse in bash, Python, or awk."
  },
  {
    id: 6,
    question: "In unified diff output, what does a line beginning with '+++ b/filename' represent?",
    options: [
      "The post-image (new state of the file after the commit changes are applied)",
      "A file that was marked read-only",
      "A newly created branch",
      "An invalid syntax error"
    ],
    correctAnswer: 0,
    explanation: "'--- a/file' represents the pre-image (old state) and '+++ b/file' represents the post-image (new state)."
  },
  {
    id: 7,
    question: "What does a hunk header like '@@ -10,5 +10,7 @@' signify in a git log -p diff?",
    options: [
      "The original file started at line 10 (length 5 lines); the modified file starts at line 10 (length 7 lines)",
      "Commit hash metadata",
      "The file permissions mode 755",
      "The author ID and timezone"
    ],
    correctAnswer: 0,
    explanation: "Hunk headers define coordinates: -<old_start>,<old_length> +<new_start>,<new_length>."
  },
  {
    id: 8,
    question: "How can you view the patch diff for the latest commit only?",
    options: [
      "git log -p -1 (or git log -p -n 1)",
      "git log --patch-only",
      "git diff-latest",
      "git show-patch -1"
    ],
    correctAnswer: 0,
    explanation: "Combining '-p' with '-1' (or '-n 1') restricts diff patch rendering to the single most recent commit."
  },
  {
    id: 9,
    question: "How can you suppress pure whitespace changes when inspecting diffs with 'git log -p'?",
    options: [
      "Add the '-w' or '--ignore-all-space' flag",
      "Set core.whitespace = none",
      "Add '--no-spaces'",
      "Pass '-s'"
    ],
    correctAnswer: 0,
    explanation: "'-w' (or '--ignore-all-space') ignores whitespace when comparing lines in diffs."
  },
  {
    id: 10,
    question: "What does 'git log --name-status' display underneath each commit?",
    options: [
      "Status letters (e.g. 'M' for Modified, 'A' for Added, 'D' for Deleted) next to file names",
      "The HTTP status code",
      "The author's full job title",
      "The GitHub Actions build status"
    ],
    correctAnswer: 0,
    explanation: "'--name-status' displays single-letter mutation status codes (A, M, D, R, C) alongside modified file paths."
  },
  {
    id: 11,
    question: "What is the difference between 'git log --stat' and 'git log --name-only'?",
    options: [
      "'--stat' includes line change counts and histograms; '--name-only' prints only the list of modified file paths",
      "'--name-only' includes diff hunks",
      "They are identical flags",
      "'--stat' only works on binary files"
    ],
    correctAnswer: 0,
    explanation: "'--name-only' lists just the file names without calculating insertion/deletion line counts."
  },
  {
    id: 12,
    question: "How can you view the patch diff of a specific file across its last 3 commits?",
    options: [
      "git log -p -3 -- path/to/file.js",
      "git diff -3 path/to/file.js",
      "git patch-history path/to/file.js -3",
      "git show -p 3 path/to/file.js"
    ],
    correctAnswer: 0,
    explanation: "Combining '-p', '-3', and '-- path/to/file.js' targets the exact file, count, and patch diff."
  },
  {
    id: 13,
    question: "What does the symbol 'Binary files a/logo.png and b/logo.png differ' mean in git log -p?",
    options: [
      "The modified file is binary (non-text), so Git does not compute line-by-line unified text diffs",
      "The image file is corrupted",
      "The file cannot be tracked by Git",
      "Git failed to compress the object"
    ],
    correctAnswer: 0,
    explanation: "Git detects binary content (null bytes) and summarizes the change without printing binary byte diffs."
  },
  {
    id: 14,
    question: "What is the effect of 'git log -p --word-diff'?",
    options: [
      "Shows inline changes at the word level rather than highlighting the entire modified line",
      "Spell checks all commit messages",
      "Converts markdown words to uppercase",
      "Counts words in source code comments"
    ],
    correctAnswer: 0,
    explanation: "'--word-diff' highlights specific words added or removed inside modified lines (e.g., '[-old-] {+new+}')."
  },
  {
    id: 15,
    question: "How can Susmita check the top 5 largest code changes in recent history?",
    options: [
      "Run 'git log --stat -n 5' and inspect the file modification histograms",
      "Run git log --huge",
      "Run git check-size -5",
      "Run git status --size"
    ],
    correctAnswer: 0,
    explanation: "'git log --stat -n 5' provides immediate visual feedback on insertions and deletions across recent commits."
  },
  {
    id: 16,
    question: "What does 'git log --stat --oneline' accomplish?",
    options: [
      "Condenses the commit header to a single line while retaining the multi-line file modification statistics beneath each commit",
      "Puts everything including diff statistics onto one continuous single line",
      "Throws an incompatible flags error",
      "Hides all statistics"
    ],
    correctAnswer: 0,
    explanation: "'--oneline' simplifies the commit message block to a 7-hex hash and subject, followed immediately by the '--stat' summary."
  },
  {
    id: 17,
    question: "Which flag allows you to customize the width of the visual histogram bar in 'git log --stat'?",
    options: [
      "--stat-width=<width> and --stat-name-width=<name-width>",
      "--bar-size=<px>",
      "--column-width=<int>",
      "--histogram-scale=<factor>"
    ],
    correctAnswer: 0,
    explanation: "'--stat-width=<width>' customizes the total column width allocated for the visual diff histogram."
  },
  {
    id: 18,
    question: "What does a line starting with '-' in red in a unified diff represent?",
    options: [
      "A line of code that was removed in that commit",
      "A line of code that was added",
      "A syntax error flagged by the compiler",
      "A Git configuration comment"
    ],
    correctAnswer: 0,
    explanation: "Leading '-' indicates lines removed from the pre-image."
  },
  {
    id: 19,
    question: "What does a line starting with '+' in green in a unified diff represent?",
    options: [
      "A line of code that was newly introduced in that commit",
      "A line of code that was deleted",
      "A positive test result",
      "A GPG signature"
    ],
    correctAnswer: 0,
    explanation: "Leading '+' indicates lines newly added into the post-image."
  },
  {
    id: 20,
    question: "Why might a senior developer prefer 'git log -p' over opening every commit manually in a web browser?",
    options: [
      "It allows rapid keyboard-driven browsing directly in the terminal pager without network roundtrips",
      "It bypasses corporate firewalls",
      "It automatically fixes merge conflicts",
      "It converts JavaScript code to TypeScript"
    ],
    correctAnswer: 0,
    explanation: "Terminal diff inspection is instantaneous, offline, and can be searched with '/' inside the terminal pager."
  },
  {
    id: 21,
    question: "What does 'git log --compact-summary' do?",
    options: [
      "Shows a high-density summary combining file creation/deletion mode indicators with modified file names",
      "Outputs a 1-word summary of the commit",
      "Summarizes audio files",
      "Compresses git log into a .zip archive"
    ],
    correctAnswer: 0,
    explanation: "'--compact-summary' shows a condensed summary of file changes with status markers (new, delete, mode change)."
  },
  {
    id: 22,
    question: "What is the command to view patch diffs ignoring blank line additions or removals?",
    options: [
      "git log -p --ignore-blank-lines",
      "git log -p --no-blanks",
      "git log -p --strip-empty",
      "git log -p --clean-lines"
    ],
    correctAnswer: 0,
    explanation: "'--ignore-blank-lines' suppresses diff hunks that consist solely of blank line changes."
  },
  {
    id: 23,
    question: "How can you view the diff patch showing 5 lines of surrounding context instead of the default 3 lines?",
    options: [
      "git log -p -U5 (or --unified=5)",
      "git log -p --context=5",
      "git log -p --lines=5",
      "git log -p --surround=5"
    ],
    correctAnswer: 0,
    explanation: "'-U<n>' (or '--unified=<n>') configures the number of unchanged surrounding context lines displayed in diff hunks."
  },
  {
    id: 24,
    question: "What does 'git log --stat -M' ensure during file renames?",
    options: [
      "Git detects renames and displays stats as 'old_name => new_name' rather than 100% deletion and 100% insertion",
      "Git merges the renamed branches",
      "Git moves the files on disk",
      "Git creates a symlink"
    ],
    correctAnswer: 0,
    explanation: "'-M' enables rename detection, showing the transformation accurately in stat summaries."
  },
  {
    id: 25,
    question: "Which of the following commands gives the best high-level overview of files touched in the last 5 commits by Debangshu?",
    options: [
      "git log --author=\"Debangshu\" -n 5 --stat --oneline",
      "git stat -5 Debangshu",
      "git check-author Debangshu --stat",
      "git show Debangshu -n 5 --stat"
    ],
    correctAnswer: 0,
    explanation: "Combining author filter, count limit, '--stat', and '--oneline' produces an optimal high-density change summary."
  }
];

export default questions;
