// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 4: Filtering History by Commit Message: Searching messages with git log --grep
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What does the 'git log --grep=\"keyword\"' command search?",
    options: [
      "The contents of the commit message (subject and body)",
      "The source code diffs inside the commit",
      "The files in the working directory",
      "The author and committer email fields"
    ],
    correctAnswer: 0,
    explanation: "'--grep' matches regular expression patterns against the commit message (both subject header and detailed body)."
  },
  {
    id: 2,
    question: "What is the behavior when multiple '--grep' flags are provided without '--all-match'?",
    options: [
      "Git treats them with logical OR (matches commits containing pattern A OR pattern B)",
      "Git treats them with logical AND",
      "Git only evaluates the last --grep flag",
      "Git raises a syntax error"
    ],
    correctAnswer: 0,
    explanation: "Multiple '--grep' flags default to logical OR matching in Git."
  },
  {
    id: 3,
    question: "Which flag forces Git to require that ALL specified '--grep' patterns match simultaneously?",
    options: [
      "--all-match",
      "--strict-match",
      "--and",
      "--full-match"
    ],
    correctAnswer: 0,
    explanation: "'--all-match' enforces that every specified match criterion (e.g. multiple --grep patterns) must be satisfied."
  },
  {
    id: 4,
    question: "How do you perform a case-insensitive commit message search?",
    options: [
      "git log --grep=\"pattern\" -i (or --regexp-ignore-case)",
      "git log --grep-no-case=\"pattern\"",
      "git log --icase --grep=\"pattern\"",
      "git grep -i --log"
    ],
    correctAnswer: 0,
    explanation: "Adding '-i' or '--regexp-ignore-case' turns on case-insensitive pattern evaluation."
  },
  {
    id: 5,
    question: "Which flag inverts the grep filter to show commits that DO NOT match the pattern?",
    options: [
      "--invert-grep",
      "--not-grep",
      "--exclude-grep",
      "--grep-v"
    ],
    correctAnswer: 0,
    explanation: "'--invert-grep' outputs only commits whose messages do not match the specified grep patterns."
  },
  {
    id: 6,
    question: "If a repository follows Conventional Commits, which command finds all bug fix commits?",
    options: [
      "git log --grep=\"^fix\"",
      "git log --bug-fixes",
      "git log --type=fix",
      "git log --only-fix"
    ],
    correctAnswer: 0,
    explanation: "Using the regex anchor '^fix' matches all Conventional Commit subjects starting with 'fix' or 'fix(...)'."
  },
  {
    id: 7,
    question: "What does 'git log -E --grep=\"(auth|billing)\"' do?",
    options: [
      "Uses Extended Regular Expressions (-E) to match commits mentioning either 'auth' or 'billing'",
      "Encrypts the log output with AES-256",
      "Searches only on enterprise branches",
      "Exports the matches to an external file"
    ],
    correctAnswer: 0,
    explanation: "'-E' activates Extended Regular Expressions (ERE), allowing modern regex syntax like unescaped parentheses and pipe alternations."
  },
  {
    id: 8,
    question: "How can you find all commits referencing Jira issue ticket 'JIRA-1042'?",
    options: [
      "git log --grep=\"JIRA-1042\"",
      "git log --ticket=\"JIRA-1042\"",
      "git log --issue=JIRA-1042",
      "git show JIRA-1042"
    ],
    correctAnswer: 0,
    explanation: "'git log --grep=\"JIRA-1042\"' searches all commit headers and bodies for the ticket identifier."
  },
  {
    id: 9,
    question: "What is the difference between 'git grep' and 'git log --grep'?",
    options: [
      "'git grep' searches text inside tracked source files; 'git log --grep' searches text inside commit messages",
      "'git grep' only searches branches, whereas 'git log --grep' searches files",
      "They are identical commands",
      "'git grep' is a Python script while 'git log --grep' is a C binary"
    ],
    correctAnswer: 0,
    explanation: "'git grep' scans actual file contents in your working tree or tree objects; 'git log --grep' strictly scans commit log messages."
  },
  {
    id: 10,
    question: "Which command searches for commits by author 'Debangshu' that also mention 'database' in the message?",
    options: [
      "git log --author=\"Debangshu\" --grep=\"database\" -i",
      "git log --author-and-grep=\"Debangshu:database\"",
      "git log --author=\"Debangshu\" && git log --grep=\"database\"",
      "git log --filter Debangshu database"
    ],
    correctAnswer: 0,
    explanation: "Combining '--author' and '--grep' filters for commits matching both the specified author and the message text."
  },
  {
    id: 11,
    question: "How does Git handle searching multi-line commit message bodies with '--grep'?",
    options: [
      "Git searches the entire commit message, matching text across subjects and any body paragraph",
      "Git only scans the first 50 characters",
      "Git ignores the body and checks the subject line only",
      "Git requires passing '--full-body-search'"
    ],
    correctAnswer: 0,
    explanation: "'--grep' examines the entire commit message string (both subject and all body paragraphs)."
  },
  {
    id: 12,
    question: "Can you combine '--grep' with '--oneline' and '--graph'?",
    options: [
      "Yes, Git allows combining format and graph flags with message filters",
      "No, --graph disables all text filtering",
      "Only if the repository is clean",
      "Only when executed as root"
    ],
    correctAnswer: 0,
    explanation: "All standard Git output flags (--oneline, --graph, --decorate, etc.) compose cleanly with '--grep'."
  },
  {
    id: 13,
    question: "What does 'git log --grep=\"BREAKING CHANGE\"' typically search for in modern open-source projects?",
    options: [
      "Commits that introduce breaking API changes according to the Conventional Commits specification",
      "Corrupted commits in the object store",
      "Commits that failed CI tests",
      "Commits that need immediate rebase"
    ],
    correctAnswer: 0,
    explanation: "'BREAKING CHANGE' in the commit body or footer is the standard convention for signaling backward-incompatible API shifts."
  },
  {
    id: 14,
    question: "How can you exclude automated merge commits from a grep search?",
    options: [
      "git log --no-merges --grep=\"feature\"",
      "git log --skip-merges --grep=\"feature\"",
      "git log --without-merge --grep=\"feature\"",
      "git log --clean-merges"
    ],
    correctAnswer: 0,
    explanation: "'--no-merges' filters out all commits with more than one parent."
  },
  {
    id: 15,
    question: "What regex pattern would match either 'discount' or 'coupon' using basic regular expressions?",
    options: [
      "git log --grep=\"discount\\|coupon\"",
      "git log --grep=\"discount || coupon\"",
      "git log --grep=\"discount,coupon\"",
      "git log --grep=\"[discount][coupon]\""
    ],
    correctAnswer: 0,
    explanation: "In Basic Regular Expressions (BRE), the alternation operator is escaped as '\\|'."
  },
  {
    id: 16,
    question: "If Swadeep wants to find all commits mentioning 'GST' in the last 30 days, which command should he run?",
    options: [
      "git log --grep=\"GST\" -i --since=\"30 days ago\" --oneline",
      "git log --text=\"GST\" --days=30",
      "git find --grep=\"GST\" --time=30d",
      "git show-commits --query=\"GST\" -30"
    ],
    correctAnswer: 0,
    explanation: "This command combines case-insensitive message searching ('--grep=\"GST\" -i'), date limiting ('--since=\"30 days ago\"'), and concise formatting ('--oneline')."
  },
  {
    id: 17,
    question: "What is the output of 'git log --grep=\"^docs:\"'?",
    options: [
      "All commits whose subject begins with 'docs:'",
      "All commits that modified a .md or .txt documentation file",
      "All files inside the /docs folder",
      "The Git manual page for docs"
    ],
    correctAnswer: 0,
    explanation: "The caret '^' asserts the start of the commit message string, matching Conventional Commits of type 'docs:'."
  },
  {
    id: 18,
    question: "What does '--basic-regexp' vs '--extended-regexp' (-E) vs '--perl-regexp' (-P) control in git log?",
    options: [
      "The regular expression flavor used when evaluating patterns like --grep and --author",
      "The programming language compiler required",
      "The compression ratio of .git/objects",
      "The format of the timestamp"
    ],
    correctAnswer: 0,
    explanation: "These flags select between BRE, ERE (-E), or PCRE (-P) regular expression engines for pattern matching."
  },
  {
    id: 19,
    question: "Why might a search for 'git log --grep=\"fix\"' match a commit titled 'feat(core): prefix generator'?",
    options: [
      "Because 'fix' is a substring inside the word 'prefix'",
      "Because Git automatically checks synonyms",
      "Because 'feat' and 'fix' are aliases in Git",
      "Because Git logs all commits on error"
    ],
    correctAnswer: 0,
    explanation: "By default, Git matches substrings. To match the exact word 'fix', use word boundary regex: '--grep=\"\\bfix\\b\"'."
  },
  {
    id: 20,
    question: "Which option matches commits containing exact whole words rather than substrings?",
    options: [
      "git log --grep=\"\\bword\\b\" (or git log -E --grep=\"\\<word\\>\")",
      "git log --grep-whole-word=\"word\"",
      "git log --exact=\"word\"",
      "git log --strict=\"word\""
    ],
    correctAnswer: 0,
    explanation: "Using regex word boundaries ('\\b') restricts matches strictly to standalone words."
  },
  {
    id: 21,
    question: "How can Susmita verify if any commit message contains a specific SQL CVE vulnerability identifier?",
    options: [
      "git log --grep=\"CVE-2026-\" -i",
      "git security --scan",
      "git cve --check",
      "git log --vuln"
    ],
    correctAnswer: 0,
    explanation: "'git log --grep=\"CVE-2026-\" -i' scans all commit notes and descriptions for security CVE identifiers."
  },
  {
    id: 22,
    question: "What does the command 'git log --all --grep=\"release\" --oneline' do?",
    options: [
      "Searches for 'release' across all local and remote branches and tags, outputting matching commits on one line each",
      "Publishes a release to GitHub",
      "Deletes release branches",
      "Rebases all branches onto release"
    ],
    correctAnswer: 0,
    explanation: "'--all' ensures all references across the whole repository are scanned for the grep query."
  },
  {
    id: 23,
    question: "What happens if no commits match the '--grep' pattern?",
    options: [
      "Git returns exit code 0 and prints nothing to stdout",
      "Git crashes with a fatal error",
      "Git resets the current branch",
      "Git prompts the user to enter a new pattern"
    ],
    correctAnswer: 0,
    explanation: "If no commits match, git log silently returns an empty output and exit status 0."
  },
  {
    id: 24,
    question: "How do you search for commit messages that contain quotation marks or special characters?",
    options: [
      "Wrap the search string in quotes or escape special regex characters with backslashes",
      "By converting the string to base64",
      "Special characters cannot be searched in git log",
      "By modifying .git/config"
    ],
    correctAnswer: 0,
    explanation: "Quoting strings in the terminal and escaping regex meta-characters (like $, ^, *, (, )) ensures exact literal matching."
  },
  {
    id: 25,
    question: "Which of the following is the most efficient command to find all commits mentioning 'hotfix' in the 'v1.0.0' release branch?",
    options: [
      "git log release/v1.0.0 --grep=\"hotfix\" -i --oneline",
      "git log --hotfix-all",
      "git find release/v1.0.0 hotfix",
      "git grep hotfix release/v1.0.0"
    ],
    correctAnswer: 0,
    explanation: "Passing the branch ref ('release/v1.0.0') with '--grep=\"hotfix\" -i' and '--oneline' targets the exact branch history efficiently."
  }
];

export default questions;
