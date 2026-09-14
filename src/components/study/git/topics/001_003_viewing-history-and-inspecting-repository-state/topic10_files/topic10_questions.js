// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 10: Advanced git blame Filtering: Ignoring whitespace changes (-w) and restricting line ranges (-L start,end)
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What is the primary benefit of adding the '-w' flag to 'git blame'?",
    options: [
      "It ignores commits that only changed whitespace/indentation, attributing lines to the author of the actual logical code",
      "It warns the user if code contains syntax errors",
      "It writes the blame output to a web browser",
      "It watches the file in real-time"
    ],
    correctAnswer: 0,
    explanation: "'-w' ignores whitespace-only changes, looking through formatting passes to find the original author of the underlying logic."
  },
  {
    id: 2,
    question: "How can you restrict git blame to only inspect lines 20 through 35 in 'billing.js'?",
    options: [
      "git blame -L 20,35 billing.js",
      "git blame --lines 20..35 billing.js",
      "git blame -r 20:35 billing.js",
      "git blame --range=20-35 billing.js"
    ],
    correctAnswer: 0,
    explanation: "'-L <start>,<end>' (e.g., '-L 20,35') scopes git blame strictly to that inclusive range of line numbers."
  },
  {
    id: 3,
    question: "What does the syntax 'git blame -L 50,+15 app.js' mean?",
    options: [
      "Blame 15 lines starting from line 50 (lines 50 through 64)",
      "Blame line 50 and line 15 only",
      "Add 15 to all line numbers",
      "Blame commits with at least 15 additions"
    ],
    correctAnswer: 0,
    explanation: "The '+<offset>' syntax specifies an offset count, blaming N lines beginning at the start line."
  },
  {
    id: 4,
    question: "How can you blame a JavaScript function by its function name rather than line numbers?",
    options: [
      "git blame -L :calculateGST src/tax.js",
      "git blame --function=calculateGST src/tax.js",
      "git blame -F calculateGST src/tax.js",
      "git blame @calculateGST src/tax.js"
    ],
    correctAnswer: 0,
    explanation: "'-L :<funcname>' uses Git's built-in language regex patterns to automatically discover function boundaries."
  },
  {
    id: 5,
    question: "What does the '--ignore-rev <commit_hash>' flag allow teams to do in git blame?",
    options: [
      "Ignore a specific mass-reformatting or automated linter commit during blame attribution",
      "Delete a commit from the history",
      "Revert the specified revision automatically",
      "Skip tests for that revision"
    ],
    correctAnswer: 0,
    explanation: "'--ignore-rev' instructs git blame to bypass the specified commit when determining line authorship."
  },
  {
    id: 6,
    question: "Which Git configuration setting specifies a file containing a list of commits to ignore permanently during blame?",
    options: [
      "blame.ignoreRevsFile",
      "core.ignoreBlameRevs",
      "git.blameIgnoreList",
      "log.ignoreRevisions"
    ],
    correctAnswer: 0,
    explanation: "'blame.ignoreRevsFile' (typically pointing to '.git-blame-ignore-revs') lists commits to automatically ignore."
  },
  {
    id: 7,
    question: "What does the '-C' flag in git blame accomplish?",
    options: [
      "Detects lines that were moved or copied from other files modified in the same commit",
      "Compresses the blame cache",
      "Converts line endings to CRLF",
      "Colors lines by age"
    ],
    correctAnswer: 0,
    explanation: "'-C' detects code movement across different files within the same commit."
  },
  {
    id: 8,
    question: "What does passing '-C -C' (or '-CC') to git blame do?",
    options: [
      "Extends copy detection to files created in the same commit where the file was created",
      "Runs blame twice for verification",
      "Caches the blame results in RAM",
      "Checks C++ source files only"
    ],
    correctAnswer: 0,
    explanation: "'-C -C' looks back at the commit that created the file, searching for code copied from other files."
  },
  {
    id: 9,
    question: "What does '-C -C -C' (or '-CCC') do in git blame?",
    options: [
      "Searches across ALL commits in repository history for the origin of moved or copied lines",
      "Runs an exhaustive multi-threaded analysis",
      "Blames all branches simultaneously",
      "Generates a cryptographic checksum"
    ],
    correctAnswer: 0,
    explanation: "'-CCC' instructs Git to search the entire repository history for the original source of any copied block of code."
  },
  {
    id: 10,
    question: "What is the purpose of '-M' in git blame?",
    options: [
      "Detects lines moved or copied within the same file",
      "Shows merge commits only",
      "Sets maximum memory limit",
      "Modifies file metadata"
    ],
    correctAnswer: 0,
    explanation: "'-M' detects code blocks rearranged, moved, or refactored within the same file."
  },
  {
    id: 11,
    question: "If Swadeep ran Prettier formatting across the whole project, how should Debangshu blame 'server.js' to see real authors?",
    options: [
      "git blame -w server.js",
      "git blame --force server.js",
      "git blame --clean server.js",
      "git blame --author-only server.js"
    ],
    correctAnswer: 0,
    explanation: "'git blame -w' disregards whitespace and indentation changes introduced by Prettier."
  },
  {
    id: 12,
    question: "Can you pass regular expressions to '-L' (e.g., git blame -L '/start/',/'end/' file.js)?",
    options: [
      "Yes, Git allows regex patterns to define the start and end boundaries of the blame range",
      "No, only integer line numbers are supported",
      "Only if PCRE is compiled into Git",
      "Only on Linux servers"
    ],
    correctAnswer: 0,
    explanation: "'-L /regex_start/,/regex_end/' dynamically identifies line boundaries using regular expression matching."
  },
  {
    id: 13,
    question: "What does 'git blame -L 100,-10 app.js' mean?",
    options: [
      "Blames 10 lines ending at line 100 (lines 91 through 100)",
      "Subtracts 10 from line 100",
      "Deletes 10 lines at line 100",
      "Blames lines 10 through 100"
    ],
    correctAnswer: 0,
    explanation: "Negative offset '-<offset>' counts backward from the starting line."
  },
  {
    id: 14,
    question: "Why is '.git-blame-ignore-revs' widely adopted by major open-source projects like Chromium and React?",
    options: [
      "To prevent mass reformatting commits (like TypeScript conversion or Prettier rollout) from polluting git blame permanently",
      "To hide secrets committed by contributors",
      "To reduce repository clone size",
      "To speed up GitHub pull request loading"
    ],
    correctAnswer: 0,
    explanation: "A shared '.git-blame-ignore-revs' file lets everyone ignore large architectural reformatting commits during blame."
  },
  {
    id: 15,
    question: "What happens if a line was refactored with BOTH variable name changes AND indentation changes?",
    options: [
      "'-w' ignores the indentation changes, but will still attribute the line to the commit that renamed the variable",
      "Git throws a conflict error",
      "Git attributes the line to Linus Torvalds",
      "Git ignores the entire file"
    ],
    correctAnswer: 0,
    explanation: "'-w' only bypasses purely whitespace changes. If actual token/variable characters changed, that commit is correctly attributed."
  },
  {
    id: 16,
    question: "How can you combine whitespace ignoring with a 10-line range filter?",
    options: [
      "git blame -w -L 40,50 src/tax_calc.js",
      "git blame --no-spaces --lines=40..50 src/tax_calc.js",
      "git blame -w --range 40-50 src/tax_calc.js",
      "git blame -L 40,50 -w src/tax_calc.js (Both A and D are valid)"
    ],
    correctAnswer: 3,
    explanation: "Git command flags are modular and order-independent; combining '-w' and '-L 40,50' works in either sequence."
  },
  {
    id: 17,
    question: "What does 'git config --global blame.markIgnoredLines true' do?",
    options: [
      "Marks lines that were attributed through an ignored commit with a visual asterisk (*) marker",
      "Deletes ignored lines",
      "Disables blame permanently",
      "Highlights ignored lines in red"
    ],
    correctAnswer: 0,
    explanation: "Setting 'blame.markIgnoredLines = true' visually indicates when a line was attributed past an ignored commit."
  },
  {
    id: 18,
    question: "What does 'git config --global blame.markUnblamableLines true' do?",
    options: [
      "Marks lines whose authorship could not be determined due to ignored boundary revisions",
      "Encrypts unblamable lines",
      "Flags syntax errors",
      "Exports unblamable lines to a log"
    ],
    correctAnswer: 0,
    explanation: "It annotates unblamable lines with an asterisk or indicator when all relevant revisions were ignored."
  },
  {
    id: 19,
    question: "How does Git detect copied code when using '-C'?",
    options: [
      "By computing alphanumeric similarity hashes of code blocks across candidate files",
      "By checking file timestamps",
      "By reading clipboard history",
      "By executing compiler AST checks"
    ],
    correctAnswer: 0,
    explanation: "Git's internal copy-detection algorithm compares block hashes across files to find identical or near-identical code fragments."
  },
  {
    id: 20,
    question: "Can you pass multiple '-L' options to blame multiple separate functions in a single file?",
    options: [
      "Yes, e.g.: git blame -L 10,20 -L 80,90 app.js",
      "No, only a single line range is allowed",
      "Only on macOS",
      "Only when exporting to XML"
    ],
    correctAnswer: 0,
    explanation: "Passing multiple '-L' flags allows you to target multiple discontinuous regions in the same file."
  },
  {
    id: 21,
    question: "What does 'git blame -w -M -L 1,20 app.js' combine?",
    options: [
      "Whitespace ignoring (-w), intra-file move detection (-M), and line range restriction (-L 1,20)",
      "Multi-threaded blame with memory limits",
      "Markdown formatting with word diffs",
      "Merge conflict scanning"
    ],
    correctAnswer: 0,
    explanation: "This command combines whitespace filtering, line move detection within the file, and range limiting."
  },
  {
    id: 22,
    question: "How can you check who wrote the last line of a 500-line file without scrolling?",
    options: [
      "git blame -L 500,500 file.js (or git blame -L '$',+1 file.js)",
      "git blame --tail file.js",
      "git blame -1 file.js",
      "git tail-blame file.js"
    ],
    correctAnswer: 0,
    explanation: "Using '-L 500,500' or '-L \"$\",+1' (where '$' represents end of file) targets the last line directly."
  },
  {
    id: 23,
    question: "Why should teams commit '.git-blame-ignore-revs' to the root of their repository?",
    options: [
      "So every team member and CI pipeline shares the exact same list of ignored formatting commits",
      "Because Git requires it for git init",
      "To prevent GitHub from deleting branches",
      "To encrypt blame outputs"
    ],
    correctAnswer: 0,
    explanation: "Storing it in the repo root ensures standardized blame results across the whole engineering organization."
  },
  {
    id: 24,
    question: "What is the default minimum number of alphanumeric characters Git requires to consider a block 'copied' in '-C'?",
    options: [
      "40 characters (customizable via -C<num>)",
      "5 characters",
      "500 characters",
      "1000 characters"
    ],
    correctAnswer: 0,
    explanation: "By default, Git looks for blocks of at least 40 characters of identical code; this threshold can be tuned with '-C<n>'."
  },
  {
    id: 25,
    question: "Which of the following is the most effective command to inspect who wrote the 'calculateTax' function, ignoring any recent Prettier reformatting?",
    options: [
      "git blame -w -L :calculateTax src/tax.js",
      "git blame calculateTax src/tax.js",
      "git show calculateTax src/tax.js",
      "git log -w calculateTax src/tax.js"
    ],
    correctAnswer: 0,
    explanation: "'git blame -w -L :calculateTax src/tax.js' targets the exact function while bypassing all whitespace reformatting noise."
  }
];

export default questions;
