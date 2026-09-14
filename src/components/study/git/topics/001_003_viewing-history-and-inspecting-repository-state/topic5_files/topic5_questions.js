// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 5: Path-Specific History: Tracking commits affecting specific files or folders (git log -- <path>)
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of the double-dash '--' in 'git log -- <path>'?",
    options: [
      "It explicitly separates revisions/options from file and directory pathspecs to prevent naming ambiguities",
      "It enables recursive directory traversal",
      "It tells Git to ignore untracked files",
      "It forces Git to output in color"
    ],
    correctAnswer: 0,
    explanation: "'--' disambiguates command options and branch/commit names from file pathspecs."
  },
  {
    id: 2,
    question: "Which command lists all commits that modified files inside the 'src/billing/' folder?",
    options: [
      "git log -- src/billing/",
      "git log --folder=src/billing",
      "git log -d src/billing",
      "git path-log src/billing"
    ],
    correctAnswer: 0,
    explanation: "'git log -- src/billing/' filters commit history to only commits touching files within that directory tree."
  },
  {
    id: 3,
    question: "How can you view the commit history for all SQL migration files ending in '.sql'?",
    options: [
      "git log -- \"*.sql\"",
      "git log --file-type=sql",
      "git log -e .sql",
      "git sql-history"
    ],
    correctAnswer: 0,
    explanation: "Quoted wildcards like 'git log -- \"*.sql\"' match all files matching that glob pattern across the repository."
  },
  {
    id: 4,
    question: "If a developer has a branch named 'config.js' and a file named 'config.js', what happens when running 'git log config.js' without '--'?",
    options: [
      "Git may report an ambiguous argument error or interpret 'config.js' as a branch ref rather than a file path",
      "Git automatically deletes the branch",
      "Git displays both the branch and file history combined",
      "Git crashes"
    ],
    correctAnswer: 0,
    explanation: "Without '--', Git warns about ambiguity when an argument matches both a ref name and a filesystem path."
  },
  {
    id: 5,
    question: "Which command shows inline diffs alongside commits affecting 'app.js'?",
    options: [
      "git log -p -- app.js",
      "git log --diff-file app.js",
      "git show-all app.js",
      "git log --inspect app.js"
    ],
    correctAnswer: 0,
    explanation: "'-p' (or '-u' / '--patch') outputs the line-by-line diff patch for the specified file in each commit."
  },
  {
    id: 6,
    question: "Can you specify multiple file paths after '--' in git log?",
    options: [
      "Yes, e.g.: git log -- oneline -- package.json package-lock.json",
      "No, git log only accepts a single file path",
      "Only if they reside in the same directory",
      "Only on Linux"
    ],
    correctAnswer: 0,
    explanation: "You can pass multiple paths separated by spaces; Git matches commits that touched ANY of the listed files."
  },
  {
    id: 7,
    question: "What is the limitation of standard 'git log -- <path>' if the file was previously renamed from an older filename?",
    options: [
      "It stops at the commit where the file was renamed and does not show pre-rename history unless '--follow' is added",
      "It corrupts the git index",
      "It deletes the file from history",
      "It outputs an error code 128"
    ],
    correctAnswer: 0,
    explanation: "Standard pathspec logging stops at renames; you must pass '--follow' to track history through renames."
  },
  {
    id: 8,
    question: "How do you see the last 3 commits that modified 'README.md' in single-line format?",
    options: [
      "git log -n 3 --oneline -- README.md",
      "git log --last 3 README.md",
      "git top 3 -- README.md",
      "git show -3 README.md"
    ],
    correctAnswer: 0,
    explanation: "Combining '-n 3', '--oneline', and '-- README.md' produces a concise 3-line file history."
  },
  {
    id: 9,
    question: "What does 'git log --stat -- package.json' output?",
    options: [
      "Commits touching package.json along with insertion and deletion line statistics for that file",
      "The disk space of package.json in bytes",
      "The npm dependencies graph",
      "The server uptime"
    ],
    correctAnswer: 0,
    explanation: "'--stat' provides a summary showing the number of modified lines (+ and -) for matching files per commit."
  },
  {
    id: 10,
    question: "If Swadeep runs 'git log --author=\"Susmita\" -- src/auth.js', what commits are returned?",
    options: [
      "Commits authored by Susmita that specifically modified 'src/auth.js'",
      "All commits by Susmita, regardless of files changed",
      "All commits modifying auth.js by any author",
      "No commits"
    ],
    correctAnswer: 0,
    explanation: "Git intersects the criteria: only commits satisfying the author filter AND touching the specified pathspec are returned."
  },
  {
    id: 11,
    question: "Can pathspec filters be combined with date ranges like '--since'?",
    options: [
      "Yes: git log --since=\"1 month ago\" -- src/db/",
      "No, date ranges cannot be used with pathspecs",
      "Only when tracking the master branch",
      "Only on macOS"
    ],
    correctAnswer: 0,
    explanation: "All revision and time filters compose seamlessly with filesystem pathspecs."
  },
  {
    id: 12,
    question: "What does the pathspec ':!src/tests/' (or ':(exclude)src/tests/') do in modern Git?",
    options: [
      "Excludes commits that only modified files inside the 'src/tests/' folder",
      "Deletes test files from git log",
      "Forces a syntax error",
      "Executes tests before logging"
    ],
    correctAnswer: 0,
    explanation: "The magic pathspec ':!' or ':(exclude)' negates paths, excluding changes inside that directory."
  },
  {
    id: 13,
    question: "What does 'git log -1 --format=%h -- index.html' print?",
    options: [
      "The short commit hash of the most recent commit that touched 'index.html'",
      "The file size of index.html",
      "The HTML source code",
      "The line count of index.html"
    ],
    correctAnswer: 0,
    explanation: "'-1' limits output to 1 commit, '%h' prints the short SHA, and '-- index.html' restricts the target file."
  },
  {
    id: 14,
    question: "Why should you quote wildcard pathspecs in the terminal (e.g. 'git log -- \"*.js\"')?",
    options: [
      "To prevent the Unix/Bash shell from prematurely expanding the glob before passing it to Git",
      "To enable color output",
      "To make the query case-insensitive",
      "Because Git requires double quotes on all paths"
    ],
    correctAnswer: 0,
    explanation: "Quoting glob characters prevents the shell from expanding them to local filenames, allowing Git's internal pathspec engine to evaluate them recursively."
  },
  {
    id: 15,
    question: "How can you view the history of a file on a different branch without switching branches?",
    options: [
      "git log feature/tax -- src/tax_calc.js",
      "git checkout-log feature/tax src/tax_calc.js",
      "git inspect feature/tax:src/tax_calc.js",
      "git branch-history feature/tax"
    ],
    correctAnswer: 0,
    explanation: "Passing the branch name before '--' (e.g. 'git log branchName -- path') queries history of that file on that specific branch."
  },
  {
    id: 16,
    question: "What does the command 'git log -p -2 -- .env.example' show?",
    options: [
      "The full patch diffs for the last 2 commits that modified '.env.example'",
      "The environment variables active in the current shell",
      "The password hashes committed to the repository",
      "A dry-run simulation of git add"
    ],
    correctAnswer: 0,
    explanation: "'-p' outputs diff patches and '-2' limits output to the last 2 matching commits."
  },
  {
    id: 17,
    question: "How does Git determine if a commit modified a pathspec?",
    options: [
      "It compares the tree object SHA of that path in the commit against its parent commit's tree object",
      "It reads the commit message for mentions of the filename",
      "It checks the file modification timestamp on disk",
      "It queries a centralized indexing server"
    ],
    correctAnswer: 0,
    explanation: "Git compares the tree entry hash of the path between the commit and its parent; if the blob SHA changed, the commit touched that path."
  },
  {
    id: 18,
    question: "What does 'git log --oneline -- docs/' display?",
    options: [
      "All commits that added, modified, or deleted files inside the docs/ directory",
      "The documentation manual pages for Git",
      "All commits whose message starts with 'docs:'",
      "Only deleted documentation files"
    ],
    correctAnswer: 0,
    explanation: "Directory pathspecs match any commit with changes inside that directory tree."
  },
  {
    id: 19,
    question: "Which option simplifies history by ignoring merge commits that brought in changes identical to the target branch?",
    options: [
      "--simplify-merges",
      "--no-merges",
      "--clean-history",
      "--flatten"
    ],
    correctAnswer: 0,
    explanation: "'--simplify-merges' prunes uninteresting merge commits from path-specific history graphs."
  },
  {
    id: 20,
    question: "If Debangshu wants to see all commits modifying styles across any CSS or SCSS file, what should he run?",
    options: [
      "git log --oneline -- \"*.css\" \"*.scss\"",
      "git log --style-files",
      "git log --css-only",
      "git find-style-commits"
    ],
    correctAnswer: 0,
    explanation: "Passing multiple glob patterns matches any commit touching files matching either extension."
  },
  {
    id: 21,
    question: "What is the output of 'git log --name-only -- server.js'?",
    options: [
      "Commits modifying server.js with the list of affected file names printed beneath each commit",
      "The name of the author only",
      "The branch name only",
      "The server hostname"
    ],
    correctAnswer: 0,
    explanation: "'--name-only' lists the names of files modified in matching commits."
  },
  {
    id: 22,
    question: "What does 'git log --oneline -- .' display when run from a subdirectory?",
    options: [
      "Only commits affecting the current working directory and its subdirectories",
      "All commits across the entire repository",
      "Only hidden dot-files",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "The dot '.' pathspec scopes history strictly to the current directory and its descendants."
  },
  {
    id: 23,
    question: "How can you view the commit history for a file that was deleted in a recent commit?",
    options: [
      "git log -- path/to/deleted_file.js",
      "git log --deleted-file path/to/deleted_file.js",
      "Deleted files cannot be inspected in git log",
      "git restore --log deleted_file.js"
    ],
    correctAnswer: 0,
    explanation: "Git's object history preserves all historical paths; running 'git log -- deleted_file.js' lists all commits up to and including its deletion."
  },
  {
    id: 24,
    question: "Can you combine '--graph' with path-specific logging?",
    options: [
      "Yes: git log --graph --oneline -- src/api.js",
      "No, graph mode only works on the entire repository",
      "Only if the file was never merged",
      "Only on Linux workstations"
    ],
    correctAnswer: 0,
    explanation: "'--graph' works with pathspecs, rendering an ASCII graph representing only the commits that modified that specific path."
  },
  {
    id: 25,
    question: "Which of the following is the most effective command to see why and when a tax formula was changed in 'tax_calc.js'?",
    options: [
      "git log -p -- tax_calc.js",
      "git status -- tax_calc.js",
      "git cat-file tax_calc.js",
      "git verify tax_calc.js"
    ],
    correctAnswer: 0,
    explanation: "'git log -p -- tax_calc.js' provides both the commit messages and the exact line-by-line diff patches explaining each historical modification."
  }
];

export default questions;
