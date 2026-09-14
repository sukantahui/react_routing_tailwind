/**
 * Topic 4 Questions: Staging Changes: git add variations, deletions vs new files
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic4_questions = [
  {
    id: 1,
    question: "What physical action occurs inside the `.git` directory when you run `git add <file>`?",
    options: [
      "A commit object is created with the author's signature",
      "A blob object containing compressed file contents is written to `.git/objects/` and the `.git/index` binary file is updated",
      "A branch is merged automatically",
      "The working tree file is locked as read-only"
    ],
    correctAnswer: 1,
    explanation: "`git add` hashes the file content, compresses it with zlib, stores it as a blob in `.git/objects/`, and records its file path and SHA-1 hash in `.git/index`."
  },
  {
    id: 2,
    question: "What is the key difference between `git add .` and `git add -A` (or `git add --all`) when executed from a nested subdirectory?",
    options: [
      "`git add .` stages from the current directory downwards, while `git add -A` stages changes across the entire repository regardless of current directory",
      "`git add .` only stages new files, while `git add -A` only stages modifications",
      "`git add .` deletes untracked files, while `git add -A` ignores deletions",
      "There is zero difference in any circumstance"
    ],
    correctAnswer: 0,
    explanation: "`git add .` is path-scoped to the current working directory (`.`) and its subdirectories, whereas `git add -A` operates repository-wide from root."
  },
  {
    id: 3,
    question: "What does the command `git add -u` (or `git add --update`) do?",
    options: [
      "It updates the Git binary to the newest version",
      "It stages modifications and deletions of tracked files ONLY, completely ignoring untracked new files",
      "It pushes unstaged files to the remote upstream",
      "It unstages all currently staged files"
    ],
    correctAnswer: 1,
    explanation: "`git add -u` stages updates to already-tracked files (both modified and deleted), but will NOT add any new untracked (`??`) files."
  },
  {
    id: 4,
    question: "In modern Git (version 2.0+), does `git add .` stage deleted files in the current directory?",
    options: [
      "Yes, in Git 2.0+ `git add .` stages modifications, new files, and deletions within the current directory subtree",
      "No, `git add .` never stages deletions",
      "Only if `--force` is passed",
      "Only on Linux operating systems"
    ],
    correctAnswer: 0,
    explanation: "Since Git 2.0, `git add .` includes file deletions within the current directory and its descendants."
  },
  {
    id: 5,
    question: "Why is running `git add *` often considered dangerous or flawed compared to `git add .`?",
    options: [
      "It deletes all branches",
      "The shell expands `*` to filenames matching standard glob rules, which ignores dotfiles (e.g. `.env`, `.gitignore`) and can exceed shell command-line length limits",
      "`git add *` requires root sudo permissions",
      "`git add *` creates corrupted blobs"
    ],
    correctAnswer: 1,
    explanation: "`*` is expanded by your shell before Git sees it, missing hidden dotfiles (like `.gitignore`) and causing potential parameter list length errors on large codebases."
  },
  {
    id: 6,
    question: "If you delete a tracked file `utils.js` with `rm utils.js`, which command will stage this deletion?",
    options: [
      "git add utils.js",
      "git add -u",
      "git add -A",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All of the listed commands (`git add utils.js`, `git add -u`, `git add -A`, and `git rm utils.js`) will successfully stage the deletion in the index."
  },
  {
    id: 7,
    question: "What command removes a file from both the working directory on disk AND stages the deletion in one step?",
    options: [
      "git rm <file>",
      "git clean <file>",
      "git drop <file>",
      "git purge <file>"
    ],
    correctAnswer: 0,
    explanation: "`git rm <file>` deletes the file from disk and stages the deletion into the index in a single operation."
  },
  {
    id: 8,
    question: "What does `git rm --cached <file>` do?",
    options: [
      "Clears the browser cache",
      "Removes the file from the Staging Area (index) and Git tracking, but LEAVES the file intact on your hard drive (working tree)",
      "Permanently wipes the file from disk",
      "Reverts the file to its previous commit"
    ],
    correctAnswer: 1,
    explanation: "`git rm --cached <file>` untracks the file from Git index without deleting the actual physical file from the working directory."
  },
  {
    id: 9,
    question: "Suppose you created a temporary file `secret.env` and accidentally ran `git add .`. How can you unstage it without deleting it from disk?",
    options: [
      "git restore --staged secret.env",
      "git rm -f secret.env",
      "rm secret.env",
      "git commit -m 'temp'"
    ],
    correctAnswer: 0,
    explanation: "`git restore --staged secret.env` (or `git reset HEAD secret.env` in older Git) removes the file from the staging area while keeping the file on disk."
  },
  {
    id: 10,
    question: "Which flag allows staging changes interactively chunk-by-chunk?",
    options: [
      "git add -p (or --patch)",
      "git add -i",
      "Both git add -p and git add -i",
      "git add --chunk"
    ],
    correctAnswer: 2,
    explanation: "Both `git add -p` (patch mode) and `git add -i` (interactive menu) allow granular hunk staging."
  },
  {
    id: 11,
    question: "What happens if you run `git add` on a file listed in `.gitignore`?",
    options: [
      "Git silently ignores the command with no warning",
      "Git refuses to add it and outputs an error message explaining that the file is ignored",
      "Git crashes",
      "Git deletes the .gitignore file"
    ],
    correctAnswer: 1,
    explanation: "Git prevents accidental staging of ignored files and prints a message suggesting `-f` if forced addition is intended."
  },
  {
    id: 12,
    question: "How can you force Git to stage a file that is currently matched by `.gitignore` rules?",
    options: [
      "git add -f <file> (or --force)",
      "git add --override <file>",
      "git add --bypass <file>",
      "git config ignore=false"
    ],
    correctAnswer: 0,
    explanation: "Passing `-f` or `--force` to `git add` overrides `.gitignore` patterns."
  },
  {
    id: 13,
    question: "What is the effect of running `git add src/`?",
    options: [
      "Stages only the folder metadata without files",
      "Stages all changes, new files, and deletions within the `src/` directory subtree",
      "Deletes the src directory",
      "Creates a new Git submodule"
    ],
    correctAnswer: 1,
    explanation: "Passing a directory path stages all changes (additions, edits, deletions) located inside that subtree."
  },
  {
    id: 14,
    question: "If Susmita creates 5 new files in `backend/` and edits 2 existing files in `frontend/`, which command stages ONLY the `backend/` additions?",
    options: [
      "git add backend/",
      "git add .",
      "git add -A",
      "git add -u"
    ],
    correctAnswer: 0,
    explanation: "`git add backend/` targets only changes inside the `backend` folder."
  },
  {
    id: 15,
    question: "Why is `git add .` considered an anti-pattern when working on multiple unrelated features concurrently?",
    options: [
      "It violates the principle of Atomic Commits by bundling disparate, unrelated changes together",
      "It makes the repository download speed slower",
      "It triggers mandatory code reviews",
      "It corrupts Git log timestamps"
    ],
    correctAnswer: 0,
    explanation: "Blind staging with `git add .` groups unrelated edits into single commits, destroying bisectability and making code reviews chaotic."
  },
  {
    id: 16,
    question: "What command stages all `.css` files in the current repository?",
    options: [
      "git add '*.css'",
      "git add *.css",
      "git add --css",
      "Both git add '*.css' and git add *.css (with slight globbing nuances)"
    ],
    correctAnswer: 3,
    explanation: "`git add '*.css'` lets Git internal pathspec match recursively across all subfolders, whereas unquoted `*.css` matches only in the current working directory."
  },
  {
    id: 17,
    question: "What is the difference between quoting a glob (`git add '*.js'`) and not quoting it (`git add *.js`)?",
    options: [
      "Quoted glob is evaluated by Git recursively across all directories; unquoted glob is expanded by the bash/zsh shell only in the current directory",
      "Unquoted glob encrypts the files",
      "There is no difference",
      "Quoted glob only works in Windows PowerShell"
    ],
    correctAnswer: 0,
    explanation: "Quoting preserves the wildcard for Git's internal pathspec engine, enabling recursive matching across subdirectories."
  },
  {
    id: 18,
    question: "If you have 10 modified files and want to stage 9 of them, what is the cleanest workflow?",
    options: [
      "Run `git add -u` then `git restore --staged <unwanted-file>`",
      "Delete the 10th file from disk",
      "Commit all 10 files and revert 1 file later",
      "Re-clone the repository"
    ],
    correctAnswer: 0,
    explanation: "Stage all tracked modifications with `git add -u` and selectively unstage the single unwanted file with `git restore --staged`."
  },
  {
    id: 19,
    question: "What command allows you to add changes interactively through an in-terminal menu interface?",
    options: [
      "git add -i",
      "git menu",
      "git add --gui",
      "git prompt"
    ],
    correctAnswer: 0,
    explanation: "`git add -i` opens an interactive command prompt allowing status inspection, updating, reverting, and patching."
  },
  {
    id: 20,
    question: "What happens if you run `git add` on an empty directory?",
    options: [
      "Git creates a directory blob object",
      "Git tracks directories natively with SHA hashes",
      "Git does nothing because Git tracks content (files/blobs), not empty directory trees",
      "Git throws a fatal directory error"
    ],
    correctAnswer: 2,
    explanation: "Git tracks file contents (blobs) and directories containing files (trees). It cannot track a completely empty directory without a placeholder file like `.gitkeep`."
  },
  {
    id: 21,
    question: "What is the conventional purpose of placing a `.gitkeep` file inside a directory?",
    options: [
      "To prevent Git from tracking the folder",
      "To provide a non-empty file so Git tracks and preserves the directory structure in commits",
      "To lock the folder permissions",
      "To enforce encryption"
    ],
    correctAnswer: 1,
    explanation: "Because Git cannot stage empty folders, creating a `.gitkeep` (or `.keep`) file ensures the directory is committed to source control."
  },
  {
    id: 22,
    question: "Which command shows the raw list of files currently held inside `.git/index` (the staging area)?",
    options: [
      "git ls-files --stage",
      "git show index",
      "git status --raw",
      "git cat-file index"
    ],
    correctAnswer: 0,
    explanation: "`git ls-files --stage` outputs the mode, blob SHA-1 hash, stage number, and file path for every item in the staging index."
  },
  {
    id: 23,
    question: "What happens to the staging area if you edit a file after running `git add` on it?",
    options: [
      "The staging area automatically updates in real-time",
      "The staging area retains the snapshot of the file as it was when `git add` was executed; subsequent edits remain unstaged",
      "The commit fails with a collision error",
      "The file is reverted to the HEAD commit"
    ],
    correctAnswer: 1,
    explanation: "`git add` captures an immutable content snapshot at that precise moment in time."
  },
  {
    id: 24,
    question: "If a developer wants to stage all tracked changes AND untracked new files, but NOT deleted files, is there a direct flag?",
    options: [
      "git add --ignore-removal .",
      "git add --no-delete",
      "git add -k",
      "git add --keep-deleted"
    ],
    correctAnswer: 0,
    explanation: "`git add --ignore-removal .` stages new and modified files while ignoring deleted files."
  },
  {
    id: 25,
    question: "Why does Sukanta Hui emphasize understanding `git add` before learning commit commands?",
    options: [
      "Because staging is the curation workshop where clean, professional commit history is deliberately crafted",
      "Because Git requires 100 adds before a commit is allowed",
      "Because commits are permanent and cannot be seen on GitHub",
      "Because staging area uses less RAM"
    ],
    correctAnswer: 0,
    explanation: "The staging area is the deliberate curation zone that separates messy local drafting from clean, production-ready version history."
  }
];

export default topic4_questions;
