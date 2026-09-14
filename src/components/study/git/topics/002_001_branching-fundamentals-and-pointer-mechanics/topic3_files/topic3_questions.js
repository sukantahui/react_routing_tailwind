/**
 * Topic 3: Creating Branches: git branch <name> and inspecting .git/refs/heads/
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What physical filesystem action occurs when you run `git branch feature-gst`?",
    answer: "Git creates a new 41-byte text file named `.git/refs/heads/feature-gst` containing the 40-character commit SHA that HEAD currently points to plus a newline."
  },
  {
    id: 2,
    question: "Does `git branch <name>` switch your active working tree to the newly created branch?",
    answer: "No. `git branch <name>` strictly creates the pointer reference file. It leaves HEAD and your working directory on the current branch."
  },
  {
    id: 3,
    question: "How can you create a new branch starting from a specific historical commit instead of HEAD?",
    answer: "By passing the commit SHA as the second argument: `git branch <branch-name> <commit-sha>` (e.g. `git branch hotfix 7a8b9c0`)."
  },
  {
    id: 4,
    question: "Can you create a branch starting from a tag or another branch?",
    answer: "Yes. For example, `git branch release-v2.0 v2.0.0` or `git branch experiment feature-gst`."
  },
  {
    id: 5,
    question: "Where are local branch pointer files stored in a Git repository?",
    answer: "Inside the directory `.git/refs/heads/` relative to the repository root."
  },
  {
    id: 6,
    question: "What happens if you run `git branch` without specifying any arguments?",
    answer: "Git lists all existing local branches in the repository, with an asterisk (*) and highlighting next to the currently active branch."
  },
  {
    id: 7,
    question: "What character sequence is forbidden in Git branch names because of revision range syntax?",
    answer: "Two consecutive dots `..` are strictly forbidden (e.g. `branch..name`) as `..` is reserved for revision range queries in `git log` and `git diff`."
  },
  {
    id: 8,
    question: "Why can't a branch name contain spaces, tildes (~), carets (^), or colons (:)?",
    answer: "These characters are reserved revision specifiers in Git (e.g. `HEAD~1`, `HEAD^`, `main:path/to/file`). Allowing them in branch names would make revision parsing ambiguous."
  },
  {
    id: 9,
    question: "What happens on the filesystem when you create a branch named with slashes, like `git branch feature/billing/gst`?",
    answer: "Git creates nested subdirectories inside `.git/refs/heads/`, specifically creating `.git/refs/heads/feature/billing/gst`."
  },
  {
    id: 10,
    question: "Why does Git fail if you try to create `feature/billing` when a branch named `feature` already exists?",
    answer: "On most operating system filesystems, `.git/refs/heads/feature` is already a plain file, so the OS prevents creating a directory with the exact same name `feature/`."
  },
  {
    id: 11,
    question: "How does Git handle branch name case-sensitivity on Windows or macOS filesystems?",
    answer: "Windows (NTFS) and macOS (APFS by default) have case-insensitive filesystems. Therefore, `Feature-GST` and `feature-gst` would map to the same file on disk, potentially causing branch collision bugs."
  },
  {
    id: 12,
    question: "What plumbing command can check if a branch name is syntactically valid before creating it?",
    answer: "`git check-ref-format --branch <branch-name>` checks whether the string obeys Git's reference naming rules."
  },
  {
    id: 13,
    question: "Can a branch name end with `.lock`?",
    answer: "No. Git prohibits branch names ending with `.lock` because Git uses `.lock` files for atomic lockfile operations during reference updates."
  },
  {
    id: 14,
    question: "Can a branch be named simply `@`?",
    answer: "No. A single `@` character is a built-in shortcut alias for `HEAD` and is rejected by Git."
  },
  {
    id: 15,
    question: "What happens if you try to create a branch with a name that already exists?",
    answer: "Git aborts with `fatal: a branch named '<name>' already exists` to prevent accidental overwriting of reference pointers."
  },
  {
    id: 16,
    question: "How can you force create or reset an existing branch pointer to a new commit?",
    answer: "Using the force flag `-f`: `git branch -f <existing-branch> <target-commit>`."
  },
  {
    id: 17,
    question: "Why should developers use structured naming prefixes like `feature/`, `bugfix/`, `hotfix/`?",
    answer: "Prefixes provide clear semantic intent, enable folder-like grouping in Git GUIs and IDEs, and allow glob pattern matching in scripts (e.g. `git branch --list 'feature/*'` )."
  },
  {
    id: 18,
    question: "What command lists only branches matching a specific pattern?",
    answer: "`git branch --list 'feature/*'` or `git branch -l 'bugfix/*'`."
  },
  {
    id: 19,
    question: "What is stored inside `.git/packed-refs`?",
    answer: "When `git gc` or `git pack-refs` runs to optimize performance, thousands of individual reference files in `.git/refs/heads/` are packed into a single text file `.git/packed-refs`."
  },
  {
    id: 20,
    question: "If a branch is listed in `.git/packed-refs`, what happens if a loose file in `.git/refs/heads/` also exists?",
    answer: "Loose files in `.git/refs/heads/` take precedence over entries in `.git/packed-refs`."
  },
  {
    id: 21,
    question: "How long does it take Git to create a new branch in a repository with 500,000 commits?",
    answer: "Around 1 to 3 milliseconds! Because Git only writes a 41-byte pointer file containing the commit SHA, the repo history size does not affect branch creation time."
  },
  {
    id: 22,
    question: "Can you create a branch when the repository is empty (immediately after `git init` before any commit)?",
    answer: "No. `git branch <name>` will fail with `fatal: not a valid object name: 'main'` because there are no commits for the new branch pointer to reference yet."
  },
  {
    id: 23,
    question: "What command shows the current branch name only in modern Git scripting?",
    answer: "`git branch --show-current` returns just the name of the active branch without any asterisks or extra text."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain the creation of `feature/gst` to Mahima at AccoTax Barrackpore?",
    answer: "He explained that typing `git branch feature/gst` is like writing 'GST Draft' on a Post-it note and sticking it to the current page of the ledger without moving your pen from the main page."
  },
  {
    id: 25,
    question: "What command creates a branch and sets its upstream tracking to a remote branch in one go?",
    answer: "`git branch --track <branch-name> <remote>/<branch-name>`."
  }
];

export default questions;
