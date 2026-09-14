/**
 * Topic 12 Questions: Local Exclusions (.git/info/exclude) & Global gitignore
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic12_questions = [
  {
    id: 1,
    question: "What is the primary difference between `.gitignore` and `.git/info/exclude`?",
    options: [
      "`.gitignore` is tracked and committed to the repository for all team members, whereas `.git/info/exclude` is local to your machine and never committed or shared",
      "`.git/info/exclude` only works on Linux",
      "`.git/info/exclude` deletes files automatically",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` provides local-only ignore rules for a single repository without modifying the shared, committed `.gitignore` file."
  },
  {
    id: 2,
    question: "Where is the local repository-specific exclude file physically located?",
    options: [
      "Inside the hidden `.git/info/exclude` path in the repository root",
      "In the user's home folder `~/.exclude`",
      "In `C:/Windows/System32`",
      "Inside `node_modules`"
    ],
    correctAnswer: 0,
    explanation: "Every Git repository automatically generates `.git/info/exclude` upon initialization."
  },
  {
    id: 3,
    question: "How do you configure a global `.gitignore` file that applies to ALL Git repositories on your computer?",
    options: [
      "git config --global core.excludesfile ~/.gitignore_global",
      "git global-ignore enable",
      "npm install -g git-ignore",
      "git set global.ignore = true"
    ],
    correctAnswer: 0,
    explanation: "The `core.excludesfile` Git config setting points Git to your workstation's global ignore file."
  },
  {
    id: 4,
    question: "Which of the following items belongs in a developer's personal global `~/.gitignore_global` rather than the shared project `.gitignore`?",
    options: [
      "Personal OS and editor artifacts like `.DS_Store`, `Thumbs.db`, `*.swp` (Vim swap files), and `*.sublime-project`",
      "`node_modules/`",
      "`package.json`",
      "Application database migrations"
    ],
    correctAnswer: 0,
    explanation: "Developer-specific editor tools and OS artifacts should reside in global ignore files to avoid cluttering project repositories."
  },
  {
    id: 5,
    question: "When should a developer use `.git/info/exclude` instead of `.gitignore`?",
    options: [
      "When creating a local one-off scratch script (e.g. `scratch_test.js` or `my_notes.txt`) that shouldn't be committed, but shouldn't modify the team's shared `.gitignore`",
      "When committing production code",
      "When creating a new Git tag",
      "When opening a Pull Request"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` is ideal for private, temporary, or experimental local files specific to one repository."
  },
  {
    id: 6,
    question: "What syntax is supported inside `.git/info/exclude` and `~/.gitignore_global`?",
    options: [
      "The exact same wildcard, pattern, and negation syntax as standard `.gitignore`",
      "Only regular expressions",
      "Only single file paths with no wildcards",
      "JSON syntax"
    ],
    correctAnswer: 0,
    explanation: "All three ignore tiers use the identical fnmatch pattern syntax."
  },
  {
    id: 7,
    question: "What is the priority order when Git checks ignore rules across the three tiers?",
    options: [
      "1. Command line flags -> 2. Local `.gitignore` (closest to file) -> 3. `.git/info/exclude` -> 4. Global `core.excludesfile`",
      "1. Global -> 2. Local -> 3. Command line",
      "1. .git/info/exclude -> 2. Global -> 3. .gitignore",
      "All tiers have equal random priority"
    ],
    correctAnswer: 0,
    explanation: "Git searches from the most specific (file/subdirectory `.gitignore`) out to repository-level (`.git/info/exclude`) and finally system-wide (`core.excludesfile`)."
  },
  {
    id: 8,
    question: "What command displays the exact rule and file source (including `.git/info/exclude` or global ignore) causing a file to be ignored?",
    options: [
      "git check-ignore -v <file>",
      "git inspect ignore",
      "git why <file>",
      "git status --source"
    ],
    correctAnswer: 0,
    explanation: "`git check-ignore -v <file>` outputs the exact path (whether `.gitignore`, `.git/info/exclude`, or global file) and line number."
  },
  {
    id: 9,
    question: "Does cloning a repository from GitHub clone the creator's `.git/info/exclude` file?",
    options: [
      "No! The `.git` internal directory is purely local; remote repositories only transfer committed tree objects and refs",
      "Yes, all `.git` internal files are cloned",
      "Only on GitHub Enterprise",
      "Only if `--full-git` is specified"
    ],
    correctAnswer: 0,
    explanation: "Remote operations only sync committed objects and branches; local `.git/info/exclude` is never transmitted."
  },
  {
    id: 10,
    question: "Where is the default XDG global Git ignore file located on Linux and macOS if `core.excludesfile` is not explicitly set?",
    options: [
      "~/.config/git/ignore",
      "/etc/gitignore",
      "/var/git/ignore",
      "~/.gitconfig"
    ],
    correctAnswer: 0,
    explanation: "In standard Git versions, if `core.excludesfile` is unset, Git checks `~/.config/git/ignore` (or `$XDG_CONFIG_HOME/git/ignore`)."
  },
  {
    id: 11,
    question: "Why is putting personal IDE settings (like Emacs backup files `*~` or Vim swap files `*.swp`) into team `.gitignore` considered poor practice?",
    options: [
      "Because not all team members use Vim or Emacs, and cluttering the team `.gitignore` with 50 different editor quirks creates maintenance noise",
      "Because Git will crash if there are more than 10 lines in .gitignore",
      "Because Vim files cannot be ignored",
      "Because it breaks CI builds"
    ],
    correctAnswer: 0,
    explanation: "Personal tooling configurations belong in personal global ignore files, keeping team `.gitignore` focused on project artifacts."
  },
  {
    id: 12,
    question: "If a file matches a rule in `.git/info/exclude`, what does `git status -s` show?",
    options: [
      "Nothing (the file is hidden from status)",
      "?? filename",
      "EX filename",
      "An error message"
    ],
    correctAnswer: 0,
    explanation: "Files ignored by `.git/info/exclude` are completely omitted from standard status output."
  },
  {
    id: 13,
    question: "How do you view files ignored by `.git/info/exclude` in `git status`?",
    options: [
      "git status -s --ignored",
      "git status --exclude-list",
      "git list-ignored",
      "git view-hidden"
    ],
    correctAnswer: 0,
    explanation: "`git status --ignored` reveals all ignored files regardless of which ignore tier matched them."
  },
  {
    id: 14,
    question: "Can you un-ignore a file in `.git/info/exclude` using negation `!` if it was ignored in `.gitignore`?",
    options: [
      "Yes, patterns evaluated in later stages can override previous patterns according to Git precedence rules",
      "No, .gitignore always wins permanently",
      "Only for image files",
      "Only on Windows"
    ],
    correctAnswer: 0,
    explanation: "Git evaluates patterns sequentially across levels; negation rules can re-include files."
  },
  {
    id: 15,
    question: "If Swadeep creates a local database dump `backup_test.sql` in his repo, which tier should he use to ignore it?",
    options: [
      "Add `backup_test.sql` to `.git/info/exclude`",
      "Push it to GitHub",
      "Delete Git",
      "Edit everyone's .gitconfig"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` is the ideal place for local, developer-specific temporary test data."
  },
  {
    id: 16,
    question: "What command lets you verify your current global excludes file configuration?",
    options: [
      "git config --get core.excludesfile",
      "git show-global-ignore",
      "git ignore --list-global",
      "git global status"
    ],
    correctAnswer: 0,
    explanation: "`git config --get core.excludesfile` prints the file path currently configured for global ignores."
  },
  {
    id: 17,
    question: "Can `.git/info/exclude` be shared across different branches of the same local repository?",
    options: [
      "Yes! Because `.git/info/` lives inside the `.git` directory, it remains persistent across all branch checkouts in that repository",
      "No, each branch has a separate .git/info folder",
      "Only on main branch",
      "Only on detached HEAD"
    ],
    correctAnswer: 0,
    explanation: "The `.git` directory is shared across all local branches in that repository, keeping `.git/info/exclude` active regardless of active branch."
  },
  {
    id: 18,
    question: "What happens if `.git/info/exclude` is deleted?",
    options: [
      "Only local exclusions are lost; the Git repository and its commits remain completely intact and functional",
      "The repository is corrupted",
      "All branches are deleted",
      "Git stops working"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` is an optional helper file; deleting it has no adverse effect on repository history."
  },
  {
    id: 19,
    question: "How can you create a global `.gitignore_global` file on Windows PowerShell?",
    options: [
      "New-Item -Path \"$HOME/.gitignore_global\" -ItemType File; git config --global core.excludesfile \"$HOME/.gitignore_global\"",
      "git make-global-ignore",
      "notepad win-ignore.txt",
      "npm init -g ignore"
    ],
    correctAnswer: 0,
    explanation: "Creating the file in the user's home profile and setting `core.excludesfile` configures global ignores on Windows."
  },
  {
    id: 20,
    question: "If a developer wants to force-add a file that matches `.git/info/exclude`, what flag is used?",
    options: [
      "git add -f <file>",
      "git add --override <file>",
      "git add -x <file>",
      "git force-stage <file>"
    ],
    correctAnswer: 0,
    explanation: "Passing `-f` (force) overrides all ignore tiers."
  },
  {
    id: 21,
    question: "Why does Sukanta Hui call `.git/info/exclude` the 'Developer's Private Sandbox'?",
    options: [
      "Because you can experiment with private scripts, test dumps, and benchmarks without modifying or dirtying the team's shared repository files",
      "Because it runs in Docker",
      "Because it is encrypted with AES-256",
      "Because it only works for teachers"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` gives each developer a private area to ignore experimental files without affecting team teammates."
  },
  {
    id: 22,
    question: "Does `git clean -X` remove files ignored by `.git/info/exclude`?",
    options: [
      "Yes, `git clean -X` (or `-x`) removes all ignored files including those matched by `.git/info/exclude`",
      "No, git clean ignores .git/info/exclude",
      "Only on Linux",
      "Only if run as admin"
    ],
    correctAnswer: 0,
    explanation: "`git clean -X` cleans all untracked ignored files across all ignore mechanisms."
  },
  {
    id: 23,
    question: "Can comments be added inside `.git/info/exclude`?",
    options: [
      "Yes, lines starting with `#` are treated as comments",
      "No, comments are forbidden",
      "Only using `//`",
      "Only using HTML comments"
    ],
    correctAnswer: 0,
    explanation: "Comment syntax (`#`) is identical across all Git ignore files."
  },
  {
    id: 24,
    question: "What is the recommended practice when setting up a new development workstation?",
    options: [
      "Create a global `~/.gitignore_global` for OS metadata (`.DS_Store`, `Thumbs.db`) and configure `git config --global core.excludesfile ~/.gitignore_global` once",
      "Add OS files to every single project .gitignore manually",
      "Never ignore OS files",
      "Delete operating system metadata manually every hour"
    ],
    correctAnswer: 0,
    explanation: "Setting up a global ignore once per machine ensures OS clutter is automatically silenced across all future repositories."
  },
  {
    id: 25,
    question: "Which of the following summaries accurately reflects the Three Tiers of Git Ignoring?",
    options: [
      "Tier 1: `.gitignore` (Team-wide/Committed) | Tier 2: `.git/info/exclude` (Local repo/Private) | Tier 3: `~/.gitignore_global` (Machine-wide/Private)",
      "Tier 1: Global | Tier 2: Cloud | Tier 3: Local",
      "Tier 1: Public | Tier 2: Protected | Tier 3: Private",
      "Tier 1: Server | Tier 2: Client | Tier 3: Database"
    ],
    correctAnswer: 0,
    explanation: "This accurately describes the three-tiered scoping model of Git's ignore architecture."
  }
];

export default topic12_questions;
