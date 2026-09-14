// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 3: Limiting and Filtering History: Limiting by count (-n), date ranges (--since, --until), and author (--author)
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "Which command restricts git log output to the 10 most recent commits?",
    options: [
      "git log -n 10 (or git log -10)",
      "git log --limit 10",
      "git log --top 10",
      "git log --count=10"
    ],
    correctAnswer: 0,
    explanation: "'-n <number>' or '-<number>' (e.g. '-n 10' or '-10') limits the number of commits output by git log."
  },
  {
    id: 2,
    question: "Which two flags are completely synonymous for specifying the start of a date filtering window in git log?",
    options: [
      "--since and --after",
      "--since and --from",
      "--start and --after",
      "--begin and --since"
    ],
    correctAnswer: 0,
    explanation: "'--since' and '--after' are identical aliases in Git's command line interface."
  },
  {
    id: 3,
    question: "Which two flags are synonymous for specifying the end date of a commit filtering range?",
    options: [
      "--until and --before",
      "--until and --to",
      "--end and --before",
      "--stop and --until"
    ],
    correctAnswer: 0,
    explanation: "'--until' and '--before' are synonymous flags used to set the upper boundary for commit timestamps."
  },
  {
    id: 4,
    question: "How does Git evaluate the argument passed to '--author=\"John\"'?",
    options: [
      "It searches for 'John' as a regular expression pattern matching either the Author's name or Author's email",
      "It requires an exact match of the developer's system username",
      "It matches against the committer field only",
      "It searches for 'John' inside the commit message body"
    ],
    correctAnswer: 0,
    explanation: "'--author' accepts a substring or regular expression pattern that matches against both Author Name and Author Email fields."
  },
  {
    id: 5,
    question: "What is the command to list all commits authored by 'Susmita' in the last 2 weeks?",
    options: [
      "git log --author=\"Susmita\" --since=\"2 weeks ago\"",
      "git log --user=\"Susmita\" --past=\"2w\"",
      "git log --author=\"Susmita\" --time=\"-14d\"",
      "git log --filter-author=\"Susmita\" --days=14"
    ],
    correctAnswer: 0,
    explanation: "'git log --author=\"Susmita\" --since=\"2 weeks ago\"' cleanly combines author regex matching with human-readable relative date filtering."
  },
  {
    id: 6,
    question: "Can Git understand human date expressions like 'yesterday', '3 days ago', or '2026-09-01'?",
    options: [
      "Yes, Git's date parser natively supports a wide variety of relative and absolute date strings",
      "No, Git only accepts raw Unix epoch timestamps",
      "No, Git only accepts UTC timestamps formatted in hex",
      "Only if Python is installed on the host machine"
    ],
    correctAnswer: 0,
    explanation: "Git has a built-in approximate date parser that handles phrases like 'yesterday', 'midnight', '2.months.ago', and ISO formats."
  },
  {
    id: 7,
    question: "How can you make the '--author' search case-insensitive?",
    options: [
      "Add the '-i' or '--regexp-ignore-case' flag",
      "Set core.ignoreCase = false",
      "Pass '--author-case=ignore'",
      "By capitalizing all characters"
    ],
    correctAnswer: 0,
    explanation: "Adding '-i' or '--regexp-ignore-case' makes pattern-matching flags like '--author', '--committer', and '--grep' case-insensitive."
  },
  {
    id: 8,
    question: "What does the command 'git log --committer=\"Sukanta\"' search for?",
    options: [
      "Commits where the committer (the person who applied/merged the commit) matches 'Sukanta'",
      "Commits where the original code author is named Sukanta",
      "Commits where Sukanta is mentioned in the PR description",
      "Commits signed with Sukanta's SSH key"
    ],
    correctAnswer: 0,
    explanation: "'--committer' specifically searches the Committer metadata field rather than the Author field."
  },
  {
    id: 9,
    question: "Which flag allows you to find commits created between September 1, 2026 and September 14, 2026?",
    options: [
      "git log --since=\"2026-09-01\" --until=\"2026-09-14\"",
      "git log --between=\"2026-09-01,2026-09-14\"",
      "git log --date-range=\"2026-09-01..2026-09-14\"",
      "git log --from=\"2026-09-01\" --to=\"2026-09-14\""
    ],
    correctAnswer: 0,
    explanation: "Combining '--since' and '--until' creates a bounded time window for commit filtering."
  },
  {
    id: 10,
    question: "If Swadeep wants to see commits authored by EITHER Debangshu OR Susmita, what syntax should he use?",
    options: [
      "git log --author=\"Debangshu\\|Susmita\"",
      "git log --author=Debangshu --and-author=Susmita",
      "git log --authors=Debangshu,Susmita",
      "git log --union Debangshu Susmita"
    ],
    correctAnswer: 0,
    explanation: "Since '--author' supports regex patterns, using the regex alternation operator ('Debangshu\\|Susmita' or with -E 'Debangshu|Susmita') matches either author."
  },
  {
    id: 11,
    question: "What date does Git filter on when evaluating '--since' or '--until'?",
    options: [
      "The AuthorDate by default",
      "The local file system file creation date",
      "The date the repository was initialized",
      "The last modified date of the .git/config file"
    ],
    correctAnswer: 0,
    explanation: "Git filters on the AuthorDate of the commit object by default."
  },
  {
    id: 12,
    question: "What happens if you combine '-n 3' with '--since=\"1 month ago\"'?",
    options: [
      "Git displays at most 3 commits among those created within the last month",
      "Git displays 3 commits from exactly 1 month ago",
      "Git throws a conflicting arguments error",
      "Git resets the log pointer"
    ],
    correctAnswer: 0,
    explanation: "Git filters the history to only those commits satisfying the date criteria, and then takes the first 3 matching results."
  },
  {
    id: 13,
    question: "What does 'git log --author=\"@barrackpore-devs\\.org\"' match?",
    options: [
      "All commits where the author's email domain contains '@barrackpore-devs.org'",
      "Only the GitHub team account",
      "No commits because @ is not a valid character",
      "Only commits created on the remote server"
    ],
    correctAnswer: 0,
    explanation: "Since email is included in the author string ('Name <email>'), filtering by email domain string matches all team members from that organization."
  },
  {
    id: 14,
    question: "Which command displays the 5 most recent commits on one line each?",
    options: [
      "git log -n 5 --oneline",
      "git log --top-5 --compact",
      "git head -5",
      "git log --short -5"
    ],
    correctAnswer: 0,
    explanation: "Combining '-n 5' with '--oneline' produces a clean 5-line summary of recent repository changes."
  },
  {
    id: 15,
    question: "What is the purpose of the '--max-count=' flag in git log?",
    options: [
      "It is the long-form equivalent of '-n' (limits maximum commits logged)",
      "It limits maximum file size in bytes",
      "It limits maximum branch count",
      "It sets maximum merge parents allowed"
    ],
    correctAnswer: 0,
    explanation: "'--max-count=<number>' is the exact long-form option for '-n <number>'."
  },
  {
    id: 16,
    question: "What does the '--skip=5' flag do when passed to git log?",
    options: [
      "Skips the first 5 matching commits before starting to output results",
      "Skips the first 5 modified files in diffs",
      "Skips commits with less than 5 lines changed",
      "Deletes 5 commits"
    ],
    correctAnswer: 0,
    explanation: "'--skip=<number>' bypasses the first N commits before starting to output, useful for paginated log queries."
  },
  {
    id: 17,
    question: "How can you query commits created specifically before noon yesterday?",
    options: [
      "git log --before=\"yesterday noon\"",
      "git log --time-lt=\"yesterday 12:00\"",
      "git log --until-hour=12",
      "git log --midday-filter"
    ],
    correctAnswer: 0,
    explanation: "Git's date parser effortlessly resolves phrases like 'yesterday noon' or 'yesterday.midnight'."
  },
  {
    id: 18,
    question: "If multiple '--author' flags are specified with '--all-match', what happens?",
    options: [
      "Git requires all filter conditions to be matched simultaneously",
      "Git matches any of the authors",
      "Git outputs an error",
      "Git resets the configuration"
    ],
    correctAnswer: 0,
    explanation: "'--all-match' enforces that every specified match criterion must be satisfied."
  },
  {
    id: 19,
    question: "Which of the following is NOT a valid date specification for git log --since?",
    options: [
      "--since=\"3.weeks.ago\"",
      "--since=\"2026-09-01T09:00:00+05:30\"",
      "--since=\"next year\"",
      "--since=\"yesterday\""
    ],
    correctAnswer: 2,
    explanation: "While '--since=\"next year\"' is parsed, it refers to future dates and will match zero commits in normal repositories."
  },
  {
    id: 20,
    question: "How can you combine graphical branch visualization with an author filter?",
    options: [
      "git log --graph --oneline --author=\"Debangshu\"",
      "git log --author=\"Debangshu\" --make-graph",
      "git graph --author=\"Debangshu\"",
      "git log --visual --user=Debangshu"
    ],
    correctAnswer: 0,
    explanation: "'--graph', '--oneline', and '--author' can be composed together without restriction."
  },
  {
    id: 21,
    question: "What is the difference between filtering by author vs searching the commit message with git log?",
    options: [
      "--author filters by person's name/email; --grep filters by text inside the commit message",
      "--author filters branches; --grep filters tags",
      "They are identical flags",
      "--author only works on GitHub"
    ],
    correctAnswer: 0,
    explanation: "'--author' inspects identity metadata, while '--grep' scans the subject and body of commit messages."
  },
  {
    id: 22,
    question: "What does the command 'git log -1 --format=%cd' output?",
    options: [
      "The committer date of the latest commit",
      "The first 10 files committed",
      "The CD-ROM directory of the repository",
      "The code diff of commit 1"
    ],
    correctAnswer: 0,
    explanation: "'-1' requests only the latest commit, and '%cd' formats its committer date."
  },
  {
    id: 23,
    question: "Why might 'git log --since=\"2026-09-10\"' exclude a commit authored on September 9th but merged on September 12th?",
    options: [
      "Because --since filters by AuthorDate (Sep 9), not CommitterDate/MergeDate",
      "Because Git ignores merge commits",
      "Because September 9th was a weekend",
      "Because Git logs only even-numbered days"
    ],
    correctAnswer: 0,
    explanation: "Since '--since' evaluates AuthorDate by default, a commit written prior to the boundary is excluded even if applied/merged later."
  },
  {
    id: 24,
    question: "How can you tell Git to filter dates by CommitterDate instead of AuthorDate?",
    options: [
      "Git does not have a separate --committer-since flag, but git log --committer combined with raw rev-list options can inspect committer timestamps",
      "Pass --by-committer-date",
      "Set core.dateType = committer",
      "Run git date --committer"
    ],
    correctAnswer: 0,
    explanation: "While git log flags standardly filter AuthorDate, low-level rev-list options and custom format queries can inspect committer dates."
  },
  {
    id: 25,
    question: "Which command provides a quick summary of the last 3 commits authored by Sukanta Hui?",
    options: [
      "git log -3 --author=\"Sukanta Hui\" --oneline",
      "git log --last 3 --by Sukanta",
      "git show Sukanta -3",
      "git history -n 3 -u Sukanta"
    ],
    correctAnswer: 0,
    explanation: "'git log -3 --author=\"Sukanta Hui\" --oneline' concisely limits results by count, author pattern, and single-line format."
  }
];

export default questions;
