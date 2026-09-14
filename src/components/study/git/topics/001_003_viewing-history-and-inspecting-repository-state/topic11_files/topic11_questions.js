// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 11: The Pickaxe Operator: Searching history for commits that added or removed specific code strings with git log -S 'search_string'
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What is the primary function of the Git 'Pickaxe' operator (git log -S 'string')?",
    options: [
      "Finds all commits in repository history where the count of occurrences of 'string' changed (added or deleted in code diffs)",
      "Mines Bitcoin in background threads",
      "Compresses the object database with heavy algorithmic packing",
      "Searches commit message subject lines only"
    ],
    correctAnswer: 0,
    explanation: "'git log -S' (the pickaxe) looks for commits that introduced or removed instances of a specified string in code diffs."
  },
  {
    id: 2,
    question: "Why can 'git log -S' find deleted code that 'git grep' completely misses?",
    options: [
      "Because 'git grep' only searches the current working directory / tree snapshot, whereas 'git log -S' searches the entire historical diff stream across all past commits",
      "Because git grep only works on Linux",
      "Because git log -S uses an AI model",
      "Because git grep ignores deleted branches"
    ],
    correctAnswer: 0,
    explanation: "'git grep' only looks at files present in the current state on disk; 'git log -S' mines historical diffs where the code previously existed."
  },
  {
    id: 3,
    question: "What is the key difference between 'git log -S <string>' and 'git log -G <regex>'?",
    options: [
      "'-S' only triggers when the occurrence count of the string changes; '-G' triggers on any diff hunk where added/removed lines match the regex (even if count is unchanged)",
      "'-S' searches file names, '-G' searches commit messages",
      "'-S' is deprecated in Git 2.0",
      "'-G' only works on GitHub"
    ],
    correctAnswer: 0,
    explanation: "'-S' counts occurrences (0 -> 1 or 1 -> 0); '-G' looks for regex matches on any '+' or '-' line in the patch."
  },
  {
    id: 4,
    question: "How can you view the commit list AND the inline patch diff where a function 'applyDiscount' was added or removed?",
    options: [
      "git log -S \"applyDiscount\" -p",
      "git log --find-code \"applyDiscount\"",
      "git pickaxe \"applyDiscount\"",
      "git diff --search \"applyDiscount\""
    ],
    correctAnswer: 0,
    explanation: "Combining '-S' with '-p' displays both the commit headers and the exact patch hunks containing the string addition/deletion."
  },
  {
    id: 5,
    question: "What does the command 'git log -S \"AUTH_TOKEN\" --oneline' output?",
    options: [
      "A single-line list of all commits that added or removed the string 'AUTH_TOKEN'",
      "All active auth tokens in the environment",
      "A fatal security error",
      "All branches containing AUTH_TOKEN in their name"
    ],
    correctAnswer: 0,
    explanation: "It outputs abbreviated hashes and commit subjects for all commits that changed the occurrence count of 'AUTH_TOKEN'."
  },
  {
    id: 6,
    question: "If a developer renamed a file without changing the number of times 'calculateGST' appears in it, will 'git log -S \"calculateGST\"' log that commit?",
    options: [
      "No, because the number of occurrences of the string did not change in that commit",
      "Yes, because the filename changed",
      "Yes, if the commit was signed",
      "Only if -p is added"
    ],
    correctAnswer: 0,
    explanation: "Pickaxe '-S' strictly looks for changes in occurrence count; pure moves/renames without string additions or deletions are ignored."
  },
  {
    id: 7,
    question: "What flag makes 'git log -S' evaluate the search string as a regular expression instead of an exact literal string?",
    options: [
      "--pickaxe-regex",
      "--regex-s",
      "-E",
      "--s-regex"
    ],
    correctAnswer: 0,
    explanation: "'--pickaxe-regex' instructs '-S' to treat the query as a regular expression and count changes in regex matches."
  },
  {
    id: 8,
    question: "How can you search for when a string was added or removed across ALL local and remote branches?",
    options: [
      "git log -S \"searchString\" --all --oneline",
      "git log --all-branches -S \"searchString\"",
      "git pickaxe-all \"searchString\"",
      "git search-history --all \"searchString\""
    ],
    correctAnswer: 0,
    explanation: "Adding '--all' causes Git to traverse every reachable ref in the repository DAG during the pickaxe search."
  },
  {
    id: 9,
    question: "What does '--pickaxe-all' do when passed alongside 'git log -S'?",
    options: [
      "When a commit touches multiple files, it displays the entire diff of the whole commit, not just the file containing the matched string",
      "Searches all branches",
      "Searches binary files",
      "Searches commit messages as well"
    ],
    correctAnswer: 0,
    explanation: "'--pickaxe-all' outputs the complete changeset of matching commits across all modified files."
  },
  {
    id: 10,
    question: "If a function was deleted in commit '7b1e4a8', how can you cleanly view the deleted function code from the commit immediately prior?",
    options: [
      "git show 7b1e4a8~1:path/to/file.js",
      "git restore 7b1e4a8",
      "git log 7b1e4a8",
      "git checkout --deleted 7b1e4a8"
    ],
    correctAnswer: 0,
    explanation: "Inspecting parent snapshot '7b1e4a8~1:path' lets you extract the deleted function in its fully functional state."
  },
  {
    id: 11,
    question: "Which command searches for commits that modified calls matching the regex pattern 'connectDB\\(.*\\)'?",
    options: [
      "git log -G \"connectDB\\(.*\\)\" -p",
      "git log --regex-db",
      "git log -S connectDB()",
      "git grep \"connectDB(.*)\""
    ],
    correctAnswer: 0,
    explanation: "'-G' is the regex diff hunk scanner, matching any line change containing the pattern."
  },
  {
    id: 12,
    question: "What happens if a developer modified the body of a function without changing its function signature line 'function calculateGST()'? Which command finds it?",
    options: [
      "'git log -G' or 'git log -L :calculateGST' finds the modification; 'git log -S \"function calculateGST()\"' will NOT trigger because the signature count was unchanged",
      "Neither will find it",
      "git blame only",
      "git status"
    ],
    correctAnswer: 0,
    explanation: "Since the signature string occurrence count stayed at 1, '-S' ignores it, whereas '-G' or function-level '-L' detects the diff."
  },
  {
    id: 13,
    question: "Can 'git log -S' be scoped to a specific folder or file path?",
    options: [
      "Yes: git log -S \"discountCode\" -- src/billing/",
      "No, pickaxe always searches the entire repository",
      "Only if the folder is in the root directory",
      "Only on macOS"
    ],
    correctAnswer: 0,
    explanation: "Pathspecs can be appended after '--' to restrict the pickaxe search space."
  },
  {
    id: 14,
    question: "How does Git optimize pickaxe searches across millions of lines of code?",
    options: [
      "Git inspects pre-computed bloom filters and skips tree diffs where blob hashes are identical between parent and child",
      "Git sends queries to a remote indexing server",
      "Git compiles code to WebAssembly",
      "Git checks only the latest 10 commits"
    ],
    correctAnswer: 0,
    explanation: "Git short-circuits evaluation when parent and child tree pointers match, searching only modified blob deltas."
  },
  {
    id: 15,
    question: "What is the output of 'git log -S \"TODO: fix later\" --oneline'?",
    options: [
      "All commits where a 'TODO: fix later' comment was either added or resolved/deleted from code",
      "A list of open GitHub issues",
      "The current lines in the working directory",
      "A compiler warning"
    ],
    correctAnswer: 0,
    explanation: "It identifies every historical commit where this exact TODO comment was created or removed."
  },
  {
    id: 16,
    question: "Why is 'git log -S' affectionately called the 'Pickaxe' by Git core contributors?",
    options: [
      "Because it acts like a miner's pickaxe digging deep into the historical sedimentary layers of repository diffs",
      "Because it was written by an engineer named Pickaxe",
      "Because its CLI flag is -P in early versions",
      "Because it breaks repositories into pieces"
    ],
    correctAnswer: 0,
    explanation: "The nickname 'pickaxe' reflects its ability to dig deep into historical strata of commits to unearth buried code strings."
  },
  {
    id: 17,
    question: "How can Susmita find when an API endpoint string '/api/v1/invoices' was first introduced?",
    options: [
      "Run 'git log -S \"/api/v1/invoices\" --reverse --oneline' and check the first result",
      "Run git show --first /api/v1/invoices",
      "Run git grep /api/v1/invoices",
      "Run git check-endpoint /api/v1/invoices"
    ],
    correctAnswer: 0,
    explanation: "Combining '-S' with '--reverse' lists matching commits in chronological order, putting the genesis commit at the top."
  },
  {
    id: 18,
    question: "What does 'git log -S \"SECRET_KEY\" --since=\"3 months ago\"' do?",
    options: [
      "Searches for additions or deletions of 'SECRET_KEY' in commits created during the last 3 months",
      "Rotates the secret key",
      "Deletes commits older than 3 months",
      "Encrypts the repository"
    ],
    correctAnswer: 0,
    explanation: "Time filtering (--since) composes seamlessly with the pickaxe search operator."
  },
  {
    id: 19,
    question: "What does 'git log -G \"import.*from.*lodash\"' match?",
    options: [
      "Any commit where lodash import statements were added, removed, or modified in code diffs",
      "Only commits whose commit message contains 'lodash'",
      "Only the package.json file",
      "The npm registry"
    ],
    correctAnswer: 0,
    explanation: "'-G' scans patch diff lines against the regular expression pattern matching lodash imports."
  },
  {
    id: 20,
    question: "Can pickaxe searches be combined with author filters like '--author=\"Swadeep\"'?",
    options: [
      "Yes: git log --author=\"Swadeep\" -S \"discountFormula\" -p",
      "No, pickaxe disables author filtering",
      "Only on Linux",
      "Only when tracking the main branch"
    ],
    correctAnswer: 0,
    explanation: "All filtering dimensions (author, path, date, message, pickaxe) can be composed together in Git."
  },
  {
    id: 21,
    question: "What is the result of running 'git log -S \"nonExistentString\"'?",
    options: [
      "Git silently exits with return code 0 and outputs nothing",
      "Git throws a fatal error",
      "Git creates an empty commit",
      "Git prints the full repository log"
    ],
    correctAnswer: 0,
    explanation: "If the string's occurrence count never changed in any commit, git log returns an empty output with exit code 0."
  },
  {
    id: 22,
    question: "How can you view author and date alongside pickaxe results in single-line format?",
    options: [
      "git log -S \"myString\" --pretty=format:'%h %ad | %s [%an]' --date=short",
      "git log -S \"myString\" --verbose-short",
      "git pickaxe-format \"myString\"",
      "git show -S \"myString\""
    ],
    correctAnswer: 0,
    explanation: "Custom pretty formats compose cleanly with pickaxe searches."
  },
  {
    id: 23,
    question: "What happens if a commit replaces 1 instance of 'taxRate' with 1 instance of 'taxRate' on another line in the same file?",
    options: [
      "'git log -S \"taxRate\"' will NOT match because the total occurrence count in the file stayed at 1 (net change = 0)",
      "It matches twice",
      "Git crashes",
      "Git prompts for user confirmation"
    ],
    correctAnswer: 0,
    explanation: "Because net count change is 0, '-S' does not match. '-G' must be used if you want to catch line-by-line substitutions."
  },
  {
    id: 24,
    question: "How do you search for commits where a CSS class '.promo-badge' was introduced?",
    options: [
      "git log -S \".promo-badge\" -p -- \"*.css\" \"*.scss\"",
      "git find-css \".promo-badge\"",
      "git style-search \".promo-badge\"",
      "git log --class \".promo-badge\""
    ],
    correctAnswer: 0,
    explanation: "Combining '-S \".promo-badge\"' with CSS glob pathspecs pinpoints the exact styling commit."
  },
  {
    id: 25,
    question: "Which of the following is the ultimate command to find who deleted the 'calculateGST' function, when, and in what commit?",
    options: [
      "git log -S \"calculateGST\" -p",
      "git status --find calculateGST",
      "git cat-file calculateGST",
      "git log --grep=\"calculateGST\""
    ],
    correctAnswer: 0,
    explanation: "'git log -S \"calculateGST\" -p' finds every commit where the string count changed and renders the full unified diff showing the exact deletion."
  }
];

export default questions;
