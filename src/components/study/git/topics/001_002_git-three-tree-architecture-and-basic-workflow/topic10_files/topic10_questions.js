/**
 * Topic 10 Questions: Ignoring Files with .gitignore (Syntax, Wildcards, Negation)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic10_questions = [
  {
    id: 1,
    question: "What is the primary function of the `.gitignore` configuration file?",
    options: [
      "To prevent designated untracked files and directories from appearing in `git status` and being accidentally staged",
      "To delete unwanted files from the hard disk",
      "To encrypt private repositories",
      "To automatically format code"
    ],
    correctAnswer: 0,
    explanation: "`.gitignore` informs Git which untracked files (build outputs, secrets, logs) should be ignored and excluded from staging."
  },
  {
    id: 2,
    question: "What does an asterisk wildcard `*` match in a `.gitignore` pattern?",
    options: [
      "Zero or more characters within a path segment",
      "Exactly one single character",
      "Only numeric digits",
      "Only uppercase letters"
    ],
    correctAnswer: 0,
    explanation: "`*` matches zero or more characters within a filename or path segment (e.g. `*.log` matches `error.log`, `app.log`, and `.log`)."
  },
  {
    id: 3,
    question: "What does the question mark `?` wildcard match in `.gitignore`?",
    options: [
      "Zero or more characters",
      "Exactly one single character (excluding path separators `/`)",
      "Only question mark characters",
      "Any boolean true/false value"
    ],
    correctAnswer: 1,
    explanation: "`?` matches exactly one character (e.g. `temp?.txt` matches `temp1.txt` and `tempa.txt`, but not `temp12.txt`)."
  },
  {
    id: 4,
    question: "What does the double asterisk `**` (glob) pattern signify in `.gitignore`?",
    options: [
      "Matches zero or more nested directory levels across the entire subtree",
      "Multiplication operator",
      "Matches only hidden folders",
      "Forces a syntax error"
    ],
    correctAnswer: 0,
    explanation: "`**` matches across multiple directory hierarchy levels (e.g. `**/logs` matches `logs`, `src/logs`, `src/api/v1/logs`)."
  },
  {
    id: 5,
    question: "What does a trailing slash `/` at the end of a pattern (e.g. `build/`) mean?",
    options: [
      "Matches directories named `build` only (ignoring regular files named `build`)",
      "Deletes the folder immediately",
      "Matches only the root directory",
      "Matches files ending in slash"
    ],
    correctAnswer: 0,
    explanation: "A trailing slash indicates that the pattern should only match directories, not regular files of that name."
  },
  {
    id: 6,
    question: "What does a leading slash `/` at the beginning of a pattern (e.g. `/config.json`) mean?",
    options: [
      "Matches `config.json` ONLY at the root directory where the `.gitignore` file resides, not in nested subdirectories",
      "Matches root operating system folder `C:/`",
      "Matches only on Linux machines",
      "Matches all folders"
    ],
    correctAnswer: 0,
    explanation: "A leading slash anchors the pattern to the directory containing that `.gitignore` file (typically the repository root)."
  },
  {
    id: 7,
    question: "What does the exclamation mark `!` prefix signify in `.gitignore` (e.g. `!important.log`)?",
    options: [
      "Negation rule: un-ignores a file that would otherwise match a previous ignore pattern",
      "Deletes the file",
      "Marks the file as emergency critical",
      "Throws a Git warning"
    ],
    correctAnswer: 0,
    explanation: "`!` negates a previous pattern, allowing specific exceptions to be re-included."
  },
  {
    id: 8,
    question: "Why does the following negation rule FAIL to track `logs/important.log`?\n\n`logs/`\n`!logs/important.log`",
    options: [
      "Because Git does not traverse into directories that have been ignored (ignoring `logs/` halts directory scanning entirely)",
      "Because Git does not support the `.log` extension",
      "Because exclamation marks only work on `.txt` files",
      "Because `logs` is a reserved keyword in Git"
    ],
    correctAnswer: 0,
    explanation: "Git optimizes performance by skipping ignored directories completely. To re-include a file inside an ignored folder, ignore folder contents with `logs/*` instead of `logs/`."
  },
  {
    id: 9,
    question: "How do you correctly ignore all files in `logs/` EXCEPT `logs/keep.log`?",
    options: [
      "logs/*\n!logs/keep.log",
      "logs/\n!logs/keep.log",
      "ignore logs except keep.log",
      "!logs/keep.log\nlogs/"
    ],
    correctAnswer: 0,
    explanation: "Ignoring `logs/*` keeps the directory searchable so the subsequent `!logs/keep.log` negation can take effect."
  },
  {
    id: 10,
    question: "What happens if a file was ALREADY committed in Git history and you subsequently add its filename to `.gitignore`?",
    options: [
      "Git automatically deletes it from the repository",
      "Git CONTINUES to track the file because `.gitignore` only applies to untracked files",
      "The repository becomes corrupted",
      "The file is hidden from your hard drive"
    ],
    correctAnswer: 1,
    explanation: "`.gitignore` only stops untracked files from being staged. Already-tracked files remain tracked until explicitly untracked with `git rm --cached`."
  },
  {
    id: 11,
    question: "How do you stop tracking an already-tracked file `config.env` that has been added to `.gitignore` without deleting it from your local disk?",
    options: [
      "git rm --cached config.env followed by a commit",
      "rm config.env",
      "git delete --save config.env",
      "git restore config.env"
    ],
    correctAnswer: 0,
    explanation: "`git rm --cached <file>` removes the file from Git's index while preserving the actual physical file in your working directory."
  },
  {
    id: 12,
    question: "What command lets you debug why a specific file is being ignored by Git?",
    options: [
      "git check-ignore -v <path/to/file>",
      "git status --why",
      "git inspect ignore",
      "git debug-gitignore"
    ],
    correctAnswer: 0,
    explanation: "`git check-ignore -v <file>` outputs the exact `.gitignore` file path, matching line number, and matching pattern."
  },
  {
    id: 13,
    question: "How are comment lines written in `.gitignore`?",
    options: [
      "Lines starting with a hash symbol `#`",
      "Lines starting with `//`",
      "Lines starting with `<!--`",
      "Lines starting with `/*`"
    ],
    correctAnswer: 0,
    explanation: "In `.gitignore`, any line starting with `#` is treated as a comment and ignored by the parser."
  },
  {
    id: 14,
    question: "How do you ignore a file whose name literally begins with a `#` character (e.g. `#notes.txt`)?",
    options: [
      "Escape the hash with a backslash: `\\#notes.txt`",
      "Use quotation marks: `\"#notes.txt\"`",
      "Write `hash-notes.txt`",
      "It is impossible"
    ],
    correctAnswer: 0,
    explanation: "Backslash `\\` escapes special characters like `#` and `!` in `.gitignore` rules."
  },
  {
    id: 15,
    question: "What does the pattern `*.{png,jpg,gif}` do in `.gitignore`?",
    options: [
      "Standard gitignore does NOT natively support brace expansion `{}`; you must write three separate lines: `*.png`, `*.jpg`, and `*.gif`",
      "Matches all image formats automatically",
      "Compresses the images into a zip file",
      "Only matches PNG files"
    ],
    correctAnswer: 0,
    explanation: "Git's fnmatch implementation does not support bash-style curly brace expansion `{}`. Each pattern must be declared on its own line."
  },
  {
    id: 16,
    question: "Can multiple `.gitignore` files exist in different subdirectories of a single repository?",
    options: [
      "Yes, patterns in subdirectory `.gitignore` files apply relative to the directory where that `.gitignore` resides, cascading with root rules",
      "No, only one `.gitignore` is permitted at the project root",
      "Only if they have different file extensions",
      "Only on macOS"
    ],
    correctAnswer: 0,
    explanation: "Git supports cascading `.gitignore` files in subdirectories, where patterns apply relative to that subdirectory."
  },
  {
    id: 17,
    question: "What does the pattern `temp/` match if placed inside `src/components/.gitignore`?",
    options: [
      "Only matches `src/components/temp/` and its subfolders",
      "Matches all `temp/` folders across the entire hard drive",
      "Matches `/temp` at root",
      "Deletes `temp` folder"
    ],
    correctAnswer: 0,
    explanation: "Subdirectory `.gitignore` rules are scoped to the directory where the file is placed."
  },
  {
    id: 18,
    question: "What does `[a-z].txt` match in `.gitignore`?",
    options: [
      "Any single lowercase letter followed by `.txt` (e.g., `a.txt`, `z.txt`)",
      "A file named `a-z.txt`",
      "All text files",
      "All uppercase letters"
    ],
    correctAnswer: 0,
    explanation: "`[a-z]` is a character set bracket expression matching any single character within the range."
  },
  {
    id: 19,
    question: "If a `.gitignore` file contains empty blank lines, how does Git handle them?",
    options: [
      "Blank lines are ignored and serve as visual separators",
      "Git throws a syntax parsing error",
      "Git ignores all files in the repo",
      "Git treats them as wildcards"
    ],
    correctAnswer: 0,
    explanation: "Empty lines in `.gitignore` are ignored by Git's pattern matcher."
  },
  {
    id: 20,
    question: "How can you tell `git status` to display ignored files prefixed with `!!` in short mode?",
    options: [
      "git status -s --ignored",
      "git status -i",
      "git status --all-files",
      "git status -v"
    ],
    correctAnswer: 0,
    explanation: "`git status -s --ignored` reveals files that match `.gitignore` patterns, marking them with `!!`."
  },
  {
    id: 21,
    question: "What happens if a developer runs `git add -f ignored_file.log`?",
    options: [
      "The `-f` (force) flag overrides `.gitignore` rules, staging the ignored file into the index",
      "Git rejects the command",
      "The .gitignore file is deleted",
      "The file is encrypted"
    ],
    correctAnswer: 0,
    explanation: "`--force` or `-f` forces Git to stage a file even if it matches `.gitignore` patterns."
  },
  {
    id: 22,
    question: "Should the `.gitignore` file itself be committed to the repository?",
    options: [
      "Yes, `.gitignore` should be committed so all team members and CI pipelines share the exact same ignore rules",
      "No, `.gitignore` should always be kept private",
      "Only in public GitHub repos",
      "Only if it contains more than 50 lines"
    ],
    correctAnswer: 0,
    explanation: "`.gitignore` is a team-wide configuration asset that must be version-controlled in the repository."
  },
  {
    id: 23,
    question: "If Swadeep creates a rule `*.bak`, which of the following files will be ignored?",
    options: [
      "`database.bak`, `server.js.bak`, and `.bak`",
      "Only `database.bak`",
      "Only files in root folder",
      "No files"
    ],
    correctAnswer: 0,
    explanation: "`*.bak` without leading slash matches any file ending in `.bak` at any directory depth."
  },
  {
    id: 24,
    question: "What does the pattern `!/build/index.html` do when combined with `/build/`?",
    options: [
      "It will NOT un-ignore `index.html` because parent `/build/` is fully ignored",
      "It makes index.html public",
      "It deploys index.html to AWS",
      "It renames index.html"
    ],
    correctAnswer: 0,
    explanation: "Because `/build/` ignores the entire folder, Git will not scan inside it to find `!/build/index.html`."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden advice before writing `.gitignore` rules?",
    options: [
      "Always test your rules with `git check-ignore -v` and run `git status -s --ignored` to verify before committing",
      "Never use wildcards in gitignore",
      "Ignore all JavaScript files",
      "Only edit gitignore from the command line"
    ],
    correctAnswer: 0,
    explanation: "Using `git check-ignore -v` and `git status --ignored` guarantees that rules match precisely as intended without accidental blind spots."
  }
];

export default topic10_questions;
