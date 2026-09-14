/**
 * Topic 15 Questions: Module 001_002 Comprehensive Self-Assessment (30 Questions)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic15_questions = [
  {
    id: 1,
    question: "What are the Three Trees that form the core architectural foundation of a local Git repository?",
    options: [
      "Working Directory, Staging Area (Index), and Repository (HEAD)",
      "Local Branch, Remote Tracking Branch, and Remote Upstream",
      "Master, Develop, and Feature branches",
      "RAM, Hard Drive, and Cloud"
    ],
    correctAnswer: 0,
    explanation: "Git manages local state across three distinct structures: the Working Directory (files on disk), the Staging Area / Index (`.git/index`), and the HEAD Commit repository snapshot."
  },
  {
    id: 2,
    question: "Which of the Three Trees is a binary file residing directly inside the hidden `.git/` folder?",
    options: [
      "The Staging Area (Index) at `.git/index`",
      "The Working Directory",
      "The operating system file explorer",
      "The README.md"
    ],
    correctAnswer: 0,
    explanation: "The Staging Area is implemented as a fast binary index file located at `.git/index`."
  },
  {
    id: 3,
    question: "What does the short status output `?? app.js` indicate?",
    options: [
      "The file is untracked on disk and not yet registered in the Index or Git repository",
      "The file has a merge conflict",
      "The file is corrupted",
      "The file is staged for deletion"
    ],
    correctAnswer: 0,
    explanation: "`??` represents an untracked file present in the working tree."
  },
  {
    id: 4,
    question: "In `git status -s`, what does the two-character code `MM` mean?",
    options: [
      "The file was modified and staged into the Index (left M), and then modified AGAIN in the working tree without re-staging (right M)",
      "The file has two merge conflicts",
      "The file was moved twice",
      "The file is marked for manual commit"
    ],
    correctAnswer: 0,
    explanation: "`MM` represents a dual-state file with staged content in Index and newer unstaged edits on disk."
  },
  {
    id: 5,
    question: "What is the key operational difference between `git init` and `git clone`?",
    options: [
      "`git init` creates a blank new repository locally from scratch, while `git clone` downloads an existing remote repository with its full commit history and configures `origin`",
      "`git init` uploads files to GitHub, while `git clone` downloads files",
      "`git clone` deletes the local repository",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "`git init` bootstraps a local empty repository; `git clone` copies a complete remote repository."
  },
  {
    id: 6,
    question: "What does `git add -u` (or `git add --update`) stage?",
    options: [
      "Modifications and deletions of already-tracked files ONLY, ignoring untracked `??` files",
      "All files including untracked files",
      "Only newly created files",
      "Only `.js` files"
    ],
    correctAnswer: 0,
    explanation: "`git add -u` updates tracked files only, preventing untracked scratch files from entering staging."
  },
  {
    id: 7,
    question: "In modern Git 2.0+, what is the difference between `git add .` and `git add -A` when executed inside a nested subfolder?",
    options: [
      "`git add .` is path-scoped to the current directory and its children, while `git add -A` stages across the entire repository root",
      "`git add .` skips deletions, while `git add -A` includes deletions",
      "`git add -A` deletes untracked files",
      "They are completely identical regardless of working directory"
    ],
    correctAnswer: 0,
    explanation: "`git add .` is scoped to the current directory (`.`), while `git add -A` operates repository-wide."
  },
  {
    id: 8,
    question: "In `git add -p` (interactive patch mode), what key automatically splits a diff hunk into smaller sub-hunks?",
    options: [
      "s",
      "y",
      "e",
      "d"
    ],
    correctAnswer: 0,
    explanation: "`s` splits a hunk into smaller sub-hunks if separated by unmodified context lines."
  },
  {
    id: 9,
    question: "When is the `s` (split) option in `git add -p` NOT available?",
    options: [
      "When changes occur on consecutive adjacent lines without intervening unchanged context code",
      "When the file is in Python",
      "When Git is offline",
      "When the file has more than 10 lines"
    ],
    correctAnswer: 0,
    explanation: "Adjacent changes cannot be automatically split by Git; manual editing (`e`) is required."
  },
  {
    id: 10,
    question: "What command lets you discard unstaged working tree changes to `invoice.js` in modern Git?",
    options: [
      "git restore invoice.js",
      "git discard invoice.js",
      "git clean -f invoice.js",
      "git unstage invoice.js"
    ],
    correctAnswer: 0,
    explanation: "`git restore <file>` discards working tree changes."
  },
  {
    id: 11,
    question: "What command removes a file from the Staging Index back to unstaged working tree status without losing edits?",
    options: [
      "git restore --staged <file>",
      "rm <file>",
      "git drop <file>",
      "git commit --cancel"
    ],
    correctAnswer: 0,
    explanation: "`git restore --staged <file>` unstages changes while preserving physical disk content."
  },
  {
    id: 12,
    question: "What is the standard '50/72 rule' for Git commit messages?",
    options: [
      "Subject line maximum 50 characters, followed by 1 blank line, and body text wrapped at 72 characters",
      "50 commits per milestone, 72 lines of code per file",
      "50% comments, 72% logic",
      "Commit expires in 72 hours"
    ],
    correctAnswer: 0,
    explanation: "The 50/72 rule produces readable summaries in `git log --oneline` and clean terminal wrapping."
  },
  {
    id: 13,
    question: "What does `git commit --amend` do?",
    options: [
      "Replaces the latest HEAD commit with newly staged changes and/or updated commit message",
      "Deletes git history",
      "Merges all local branches",
      "Pushes to remote master"
    ],
    correctAnswer: 0,
    explanation: "`--amend` replaces the current HEAD commit object."
  },
  {
    id: 14,
    question: "Why should `git commit --amend` NEVER be run on commits already pushed to a shared remote branch?",
    options: [
      "Because amending creates a brand-new SHA-1 hash, resulting in divergent history that breaks collaboration for teammates",
      "Because GitHub will ban the user",
      "Because Git crashes",
      "Because file permissions become read-only"
    ],
    correctAnswer: 0,
    explanation: "Rewriting published history forces destructive force-pushes for collaborators."
  },
  {
    id: 15,
    question: "What is the core defining characteristic of an 'Atomic Commit'?",
    options: [
      "It represents one single, self-contained logical change that leaves the repository in a compiling, fully testable state",
      "It contains exactly 10,000 lines of code",
      "It is executed by artificial intelligence",
      "It touches every folder in the project"
    ],
    correctAnswer: 0,
    explanation: "Atomic commits maintain single responsibility and independent revertability."
  },
  {
    id: 16,
    question: "How do atomic commits assist the automated root-cause tool `git bisect`?",
    options: [
      "`git bisect` can binary-search history and pinpoint the exact isolated commit responsible for a regression",
      "`git bisect` compresses commit objects",
      "`git bisect` creates pull requests automatically",
      "`git bisect` only runs on weekend nights"
    ],
    correctAnswer: 0,
    explanation: "Isolated changes allow `git bisect` to locate bugs without confounding noise."
  },
  {
    id: 17,
    question: "In the Conventional Commits specification, which type indicates a new user-facing feature that triggers a MINOR SemVer bump?",
    options: [
      "feat",
      "fix",
      "chore",
      "docs"
    ],
    correctAnswer: 0,
    explanation: "`feat` corresponds to MINOR version updates in Semantic Versioning."
  },
  {
    id: 18,
    question: "How is a BREAKING CHANGE signaled in Conventional Commits to trigger a MAJOR SemVer bump?",
    options: [
      "Adding a `!` after type/scope (e.g. `feat(api)!: ...`) or adding `BREAKING CHANGE:` in the commit footer",
      "Writing 'EMERGENCY' in all caps",
      "Adding 5 exclamation marks in the filename",
      "Deleting the repository"
    ],
    correctAnswer: 0,
    explanation: "`!` or `BREAKING CHANGE:` explicitly marks breaking updates."
  },
  {
    id: 19,
    question: "What Conventional Commit type is used for code changes that improve runtime execution performance?",
    options: [
      "perf",
      "speed",
      "fast",
      "optimize"
    ],
    correctAnswer: 0,
    explanation: "`perf` is the official Conventional Commit type for performance enhancements."
  },
  {
    id: 20,
    question: "What Conventional Commit type is used for internal code cleanup that neither fixes a bug nor adds a feature?",
    options: [
      "refactor",
      "style",
      "chore",
      "fix"
    ],
    correctAnswer: 0,
    explanation: "`refactor` modifies code structure without altering observable functionality."
  },
  {
    id: 21,
    question: "What does the command `git diff` (with no flags) compare?",
    options: [
      "Working Directory on disk vs Staging Area (Index) [Unstaged changes]",
      "Staging Area vs HEAD",
      "Local branch vs remote branch",
      "First commit vs latest commit"
    ],
    correctAnswer: 0,
    explanation: "`git diff` displays unstaged modifications."
  },
  {
    id: 22,
    question: "What does `git diff --staged` (or `git diff --cached`) compare?",
    options: [
      "Staging Area (Index) vs HEAD Commit [Staged changes ready to commit]",
      "Working Directory vs Index",
      "Working Directory vs Remote origin",
      "Branch A vs Branch B"
    ],
    correctAnswer: 0,
    explanation: "`git diff --staged` shows what will be incorporated into the upcoming commit."
  },
  {
    id: 23,
    question: "In a `.gitignore` pattern, what does a leading slash `/` signify (e.g. `/config.json`)?",
    options: [
      "Anchors the pattern to match `config.json` only at the directory where `.gitignore` lives (usually root), not in subdirectories",
      "Matches root Linux directory",
      "Deletes the file",
      "Matches all directories"
    ],
    correctAnswer: 0,
    explanation: "A leading slash prevents matching in nested subdirectories."
  },
  {
    id: 24,
    question: "In `.gitignore`, what does the negation prefix `!` signify (e.g. `!keep.log`)?",
    options: [
      "Un-ignores a file that would otherwise match an earlier ignore rule",
      "Throws a Git warning",
      "Forces encryption",
      "Marks the file as read-only"
    ],
    correctAnswer: 0,
    explanation: "`!` creates an exception to re-include specific files."
  },
  {
    id: 25,
    question: "If `secret.env` was ALREADY committed to Git history last month and is now added to `.gitignore`, what must be done to stop tracking it?",
    options: [
      "Run `git rm --cached secret.env` and commit the removal",
      "Delete the hard drive",
      "Nothing, .gitignore deletes it automatically",
      "Run git pull --force"
    ],
    correctAnswer: 0,
    explanation: "`.gitignore` only affects untracked files; tracked files require `git rm --cached`."
  },
  {
    id: 26,
    question: "Should lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) be committed in application repositories?",
    options: [
      "YES! Lockfiles must be committed to guarantee 100% reproducible builds across team machines and CI runners",
      "No, lockfiles cause merge conflicts and must be ignored",
      "Only on Linux",
      "Only in open-source projects"
    ],
    correctAnswer: 0,
    explanation: "Lockfiles guarantee deterministic dependencies and must be committed for applications."
  },
  {
    id: 27,
    question: "Where should personal developer OS metadata (`.DS_Store`, `Thumbs.db`) and editor swap files be ignored?",
    options: [
      "In the developer's personal global `~/.gitignore_global` (via `core.excludesfile`)",
      "In the team's shared .gitignore",
      "In the package.json file",
      "They cannot be ignored"
    ],
    correctAnswer: 0,
    explanation: "Global ignore files keep team repositories clean from individual workstation clutter."
  },
  {
    id: 28,
    question: "What is the purpose of the `.git/info/exclude` file?",
    options: [
      "To specify repository-specific ignore rules on a single local clone without modifying or sharing the team's `.gitignore`",
      "To delete git objects",
      "To store user passwords",
      "To configure remote URLs"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` is a local-only private exclusion sandbox."
  },
  {
    id: 29,
    question: "What diagnostic command pinpoints the exact file and line number causing a file to be ignored by Git?",
    options: [
      "git check-ignore -v <file>",
      "git status --why",
      "git inspect <file>",
      "git find-ignore <file>"
    ],
    correctAnswer: 0,
    explanation: "`git check-ignore -v` prints the matching ignore rule and its configuration source."
  },
  {
    id: 30,
    question: "Who is the course mentor for the Git Master Series at Coder & AccoTax, Barrackpore?",
    options: [
      "Sukanta Hui",
      "Mr. CNAT",
      "Linus Torvalds",
      "Anonymous Bot"
    ],
    correctAnswer: 0,
    explanation: "Sukanta Hui is the Founder and Lead Educator at Coder & AccoTax, Barrackpore."
  }
];

export default topic15_questions;
