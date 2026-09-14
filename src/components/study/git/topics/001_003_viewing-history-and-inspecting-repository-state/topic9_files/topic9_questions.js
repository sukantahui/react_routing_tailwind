// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 9: Line-by-Line Code Forensics with git blame: Identifying author, commit hash, and timestamp for every line in a file
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What is the primary function of the 'git blame' command?",
    options: [
      "Annotates every line in a file with the commit hash, author name, timestamp, and line number of who last modified that line",
      "Assigns bug tickets automatically to the author on GitHub",
      "Deletes faulty lines of code from history",
      "Locks the file against concurrent edits"
    ],
    correctAnswer: 0,
    explanation: "'git blame' annotates each line of a tracked file with the commit hash, author identity, and timestamp of the last modification."
  },
  {
    id: 2,
    question: "Which flag displays author email addresses instead of author names in git blame output?",
    options: [
      "git blame -e",
      "git blame --email-only",
      "git blame -m",
      "git blame --user-email"
    ],
    correctAnswer: 0,
    explanation: "'-e' instructs git blame to output author email addresses enclosed in angle brackets."
  },
  {
    id: 3,
    question: "How can you view relative timestamps (e.g. '2 weeks ago') in git blame output?",
    options: [
      "git blame --date=relative <file>",
      "git blame -r <file>",
      "git blame --time=ago <file>",
      "git blame --human-date <file>"
    ],
    correctAnswer: 0,
    explanation: "'--date=relative' formats timestamps into readable elapsed time strings."
  },
  {
    id: 4,
    question: "What does the caret '^' prefix (e.g. '^7b1e4a8') in git blame output signify for a line?",
    options: [
      "The line has never been modified since the initial 'boundary' / root commit of the repository",
      "The line contains an exponentiation operator",
      "The commit was cherry-picked",
      "The commit was signed with a GPG key"
    ],
    correctAnswer: 0,
    explanation: "A leading caret '^' marks a boundary commit (such as the initial root commit) where the line was first created."
  },
  {
    id: 5,
    question: "What is the true engineering purpose of 'git blame' in professional software teams?",
    options: [
      "To trace the commit hash and read the commit message explaining why a line was introduced, and to find the author for context",
      "To penalize developers during performance reviews",
      "To automatically revert broken code",
      "To lock branches against junior engineers"
    ],
    correctAnswer: 0,
    explanation: "'git blame' provides architectural context: it lets you find the commit hash to inspect the full commit message and understand design decisions."
  },
  {
    id: 6,
    question: "How can you run git blame on a file as it existed in release tag 'v1.0.0'?",
    options: [
      "git blame v1.0.0 -- path/to/file.js",
      "git blame --tag v1.0.0 path/to/file.js",
      "git checkout v1.0.0 && git blame path/to/file.js",
      "git show-blame v1.0.0:path/to/file.js"
    ],
    correctAnswer: 0,
    explanation: "Passing a revision reference (e.g. 'v1.0.0') before '--' inspects the file at that historical milestone without checking it out."
  },
  {
    id: 7,
    question: "Which flag displays the full 40-character SHA hash in git blame?",
    options: [
      "git blame -l",
      "git blame --full-hash",
      "git blame --sha-long",
      "git blame -40"
    ],
    correctAnswer: 0,
    explanation: "'-l' outputs the long 40-character hexadecimal SHA-1 hash for each line."
  },
  {
    id: 8,
    question: "What does 'git blame -s <file>' do?",
    options: [
      "Suppresses author names and timestamps, showing only commit hashes and line contents",
      "Runs git blame silently",
      "Sorts lines by author name",
      "Shows stashed lines"
    ],
    correctAnswer: 0,
    explanation: "'-s' suppresses the author name and timestamp fields, yielding a compact hash-only annotation."
  },
  {
    id: 9,
    question: "How can you view the commit details of a hash found with git blame?",
    options: [
      "git show <commit_hash>",
      "git find <commit_hash>",
      "git verify <commit_hash>",
      "git open <commit_hash>"
    ],
    correctAnswer: 0,
    explanation: "'git show <commit_hash>' immediately displays the author, message, and unified diff for that commit."
  },
  {
    id: 10,
    question: "What does 'git blame --date=short <file>' output for timestamps?",
    options: [
      "YYYY-MM-DD format (e.g., '2026-09-14')",
      "Unix epoch seconds",
      "Day of the week only",
      "Hour and minute only"
    ],
    correctAnswer: 0,
    explanation: "'--date=short' formats timestamps cleanly as 'YYYY-MM-DD'."
  },
  {
    id: 11,
    question: "If a line was modified in your uncommitted working tree, what does git blame show for that line?",
    options: [
      "A pseudo-hash of all zeros (00000000) and 'Not Committed Yet'",
      "An error message saying file is dirty",
      "The last committed author",
      "A blank space"
    ],
    correctAnswer: 0,
    explanation: "Uncommitted working tree changes appear with hash '00000000' (or '000000000000...') marked as 'Not Committed Yet'."
  },
  {
    id: 12,
    question: "Can git blame be executed on a file that has unstaged modifications on disk?",
    options: [
      "Yes, Git blames both committed lines and marks uncommitted edits as 'Not Committed Yet'",
      "No, git blame requires a completely clean working tree",
      "Only if you pass '--allow-dirty'",
      "Only on untracked files"
    ],
    correctAnswer: 0,
    explanation: "Git blame seamlessly incorporates active working tree edits into its line annotations."
  },
  {
    id: 13,
    question: "What does 'git blame -c' output?",
    options: [
      "Uses the same format mode as 'git annotate' for backward compatibility",
      "Compiles the code before blaming",
      "Counts line occurrences",
      "Checks GPG certificates"
    ],
    correctAnswer: 0,
    explanation: "'-c' uses the same output format as the traditional 'git annotate' utility."
  },
  {
    id: 14,
    question: "Which of the following is equivalent to 'git blame' in the Git toolset?",
    options: [
      "git annotate (legacy synonym)",
      "git blame-tree",
      "git who",
      "git inspect-lines"
    ],
    correctAnswer: 0,
    explanation: "'git annotate' is an older alias for 'git blame'."
  },
  {
    id: 15,
    question: "Why might a mass code-reformatting commit (e.g. running Prettier or ESLint --fix) ruin standard git blame output?",
    options: [
      "Because the reformatting commit becomes the 'last modified' author for every line, obscuring original business logic authors",
      "Because Git deletes the history",
      "Because formatting corrupts SHA hashes",
      "Because blame only works on unformatted JavaScript"
    ],
    correctAnswer: 0,
    explanation: "A linter reformatting commit touches every line, masking the original authors in standard git blame unless '-w' or '--ignore-rev' is used."
  },
  {
    id: 16,
    question: "How do modern IDEs like VS Code (via GitLens) provide inline line attribution?",
    options: [
      "By running 'git blame' under the hood and rendering the annotation at the end of the active cursor line",
      "By querying a central cloud database",
      "By scanning file creation dates",
      "By using an AI code interpreter"
    ],
    correctAnswer: 0,
    explanation: "Extensions like GitLens execute git blame asynchronously to display author annotations inline."
  },
  {
    id: 17,
    question: "What does 'git blame -f' do?",
    options: [
      "Shows the filename in the original commit where the line was introduced (useful when code was moved from another file)",
      "Forces blame on binary files",
      "Fast-forwards the blame",
      "Formats output in JSON"
    ],
    correctAnswer: 0,
    explanation: "'-f' includes the source filename in each line's annotation header."
  },
  {
    id: 18,
    question: "What does 'git blame --line-porcelain' provide?",
    options: [
      "Full, machine-readable multi-line metadata per code line for script parsers and IDE plugins",
      "A porcelain tea mug ASCII graphic",
      "A condensed 1-character output",
      "A colorized HTML page"
    ],
    correctAnswer: 0,
    explanation: "'--line-porcelain' outputs structured key-value metadata for every line, ideal for third-party tooling."
  },
  {
    id: 19,
    question: "How can you tell if a line of code was written by Swadeep or Susmita?",
    options: [
      "Run 'git blame <file>' and inspect the author name in parentheses next to the line",
      "Check the branch name",
      "Check the package.json contributors list",
      "Run git log --all"
    ],
    correctAnswer: 0,
    explanation: "The author name is displayed directly inside the parenthetical metadata on each line."
  },
  {
    id: 20,
    question: "What happens if you run 'git blame' on a binary file like an image (.png)?",
    options: [
      "Git outputs 'fatal: cannot blame non-text file'",
      "Git prints hex dump annotations",
      "Git converts the image to text",
      "Git corrupts the repository"
    ],
    correctAnswer: 0,
    explanation: "Git blame requires text content and rejects binary files with 'cannot blame non-text file'."
  },
  {
    id: 21,
    question: "What does 'git blame -t' show?",
    options: [
      "Raw Unix epoch timestamps instead of formatted dates",
      "Tree objects",
      "Terminal tab sizes",
      "Total execution time"
    ],
    correctAnswer: 0,
    explanation: "'-t' outputs raw timestamps in seconds since the epoch (1970-01-01 00:00:00 UTC)."
  },
  {
    id: 22,
    question: "How can you see the commit author who wrote line 15 in 'app.js'?",
    options: [
      "Run 'git blame -L 15,15 app.js'",
      "Run 'git blame app.js' and scroll to line 15",
      "Both A and B work",
      "git inspect line 15 app.js"
    ],
    correctAnswer: 2,
    explanation: "Both scrolling through full blame or restricting line ranges with '-L' will identify the author of line 15."
  },
  {
    id: 23,
    question: "What is the effect of 'git blame -w'?",
    options: [
      "Ignores whitespace-only commits, attributing lines to the author of the actual code logic rather than formatting tweaks",
      "Writes output to disk",
      "Watches the file for changes",
      "Warns about broken lines"
    ],
    correctAnswer: 0,
    explanation: "'-w' bypasses pure whitespace edits during attribution (covered in depth in Topic 10)."
  },
  {
    id: 24,
    question: "If a line was committed by Sukanta Hui, what command reveals his full commit explanation message?",
    options: [
      "Copy the commit hash from git blame and run: git show <hash>",
      "git author-message Sukanta",
      "git log --last-author",
      "git blame --explain"
    ],
    correctAnswer: 0,
    explanation: "Pairing git blame with 'git show <hash>' is the standard forensic workflow."
  },
  {
    id: 25,
    question: "Which of the following commands provides the most readable author and short-date attribution for 'tax_calc.js'?",
    options: [
      "git blame --date=short tax_calc.js",
      "git blame --raw tax_calc.js",
      "git blame -40 tax_calc.js",
      "git blame --full-meta tax_calc.js"
    ],
    correctAnswer: 0,
    explanation: "'git blame --date=short tax_calc.js' formats dates as YYYY-MM-DD, keeping column widths consistent and readable."
  }
];

export default questions;
