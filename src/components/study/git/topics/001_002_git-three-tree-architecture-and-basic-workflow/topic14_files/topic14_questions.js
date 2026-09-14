/**
 * Topic 14 Questions: Hands-on Terminal Lab (Full Module 001_002 Workflow Synthesis)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic14_questions = [
  {
    id: 1,
    question: "What is the recommended modern Git command to initialize a new repository with default branch named `main` in one step?",
    options: [
      "git init -b main <repo_name>",
      "git init --branch=main && git rename master main",
      "git new-repo main",
      "git create --main"
    ],
    correctAnswer: 0,
    explanation: "`git init -b main <repo_name>` creates the folder and initializes the repository with `main` as the default branch directly."
  },
  {
    id: 2,
    question: "In Phase 2 of the lab, why is it critical to commit `.gitignore` before creating temporary build files?",
    options: [
      "To prevent build artifacts and `.env` secrets from ever appearing as untracked files or being accidentally staged",
      "Because Git will not allow commits without a gitignore file",
      "Because npm requires .gitignore",
      "To speed up hard drive access"
    ],
    correctAnswer: 0,
    explanation: "Committing `.gitignore` first ensures that generated build outputs or secret files are automatically silenced."
  },
  {
    id: 3,
    question: "When using `git add -p` on a modified file in Phase 3, what key do you press to accept and stage the current hunk?",
    options: [
      "y",
      "n",
      "s",
      "q"
    ],
    correctAnswer: 0,
    explanation: "`y` (yes) stages the currently displayed hunk into the staging index."
  },
  {
    id: 4,
    question: "When using `git add -p`, what key do you press to leave a debug `console.log` statement unstaged in your working directory?",
    options: [
      "n",
      "y",
      "d",
      "e"
    ],
    correctAnswer: 0,
    explanation: "`n` (no) skips the hunk, keeping it in the working tree without adding it to the staging area."
  },
  {
    id: 5,
    question: "After committing your clean feature, how do you discard the leftover unstaged debug logs from your working tree in modern Git?",
    options: [
      "git restore <file>",
      "git checkout -- <file>",
      "Both git restore <file> and git checkout -- <file>",
      "git delete-debug"
    ],
    correctAnswer: 2,
    explanation: "`git restore <file>` (modern) and `git checkout -- <file>` (classic) discard unstaged modifications in the working tree."
  },
  {
    id: 6,
    question: "What command lets you verify that only the intended code is staged right before you run `git commit`?",
    options: [
      "git diff --staged",
      "git diff",
      "git status -u",
      "git show"
    ],
    correctAnswer: 0,
    explanation: "`git diff --staged` displays the exact differences staged in the index relative to HEAD."
  },
  {
    id: 7,
    question: "Which of the following commit messages strictly follows the Conventional Commits v1.0.0 standard?",
    options: [
      "feat(pos): add cash payment round-off calculation",
      "ADDED CASH PAYMENT ROUND OFF",
      "feat: added cash payment round-off calculation.",
      "cash payment fix"
    ],
    correctAnswer: 0,
    explanation: "Option 1 has lowercase type, optional scope, space after colon, imperative mood, and no trailing period."
  },
  {
    id: 8,
    question: "What does `git status -sb` show in terminal?",
    options: [
      "Short 2-column status prefixed with branch name and upstream tracking info",
      "Full verbose status",
      "Commit log history",
      "List of stashes"
    ],
    correctAnswer: 0,
    explanation: "`-s` enables short format and `-b` adds branch tracking information."
  },
  {
    id: 9,
    question: "What is the purpose of `.git/info/exclude` in Phase 2 of the lab?",
    options: [
      "To ignore private scratch scripts specific to this repository without altering the shared team `.gitignore`",
      "To delete temporary branches",
      "To configure Git credentials",
      "To compress git objects"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` provides a private, uncommitted exclusion mechanism for that specific repository clone."
  },
  {
    id: 10,
    question: "What command undoes a specific commit by creating a new inverse commit with opposite changes?",
    options: [
      "git revert <commit-hash>",
      "git reset --hard",
      "git undo",
      "git back"
    ],
    correctAnswer: 0,
    explanation: "`git revert` records a new commit that exactly inverts the specified commit's diff."
  },
  {
    id: 11,
    question: "Why does running `git check-ignore -v <filename>` help during lab troubleshooting?",
    options: [
      "It displays the exact file path and line number of the `.gitignore` or exclude rule matching that file",
      "It deletes the ignore file",
      "It tests internet bandwidth",
      "It reformats the file with Prettier"
    ],
    correctAnswer: 0,
    explanation: "`git check-ignore -v` pinpoints why a file is ignored and from which configuration file."
  },
  {
    id: 12,
    question: "If a new file is created on disk and has never been staged, what status code does `git status -s` show?",
    options: [
      "??",
      "A ",
      " M",
      "MM"
    ],
    correctAnswer: 0,
    explanation: "`??` designates an untracked file."
  },
  {
    id: 13,
    question: "If a file is staged and then modified again in the working tree, what status code appears in `git status -s`?",
    options: [
      "MM",
      "M ",
      " M",
      "??"
    ],
    correctAnswer: 0,
    explanation: "`MM` represents dual modifications: staged in Index and unstaged in Working Tree."
  },
  {
    id: 14,
    question: "What command shows the commit graph in a compact, single-line format in terminal?",
    options: [
      "git log --oneline --graph --decorate",
      "git log --tree",
      "git graph",
      "git visual"
    ],
    correctAnswer: 0,
    explanation: "`git log --oneline --graph --decorate` prints an ASCII branch and commit graph."
  },
  {
    id: 15,
    question: "What is the effect of running `git add -N <newfile>` on a newly created untracked file?",
    options: [
      "Registers an intent-to-add entry in the index so that `git add -p` and `git diff` can recognize the file without staging its content yet",
      "Deletes the file",
      "Commits the file with an empty message",
      "Locks the file"
    ],
    correctAnswer: 0,
    explanation: "`git add -N` (intent-to-add) allows patch staging on brand new files."
  },
  {
    id: 16,
    question: "Can `git commit --amend` be used to fix a typo in the most recent commit message in the lab?",
    options: [
      "Yes, `git commit --amend -m 'new message'` updates the HEAD commit message cleanly",
      "No, commit messages can never be changed",
      "Only if GitHub approves",
      "Only on Linux"
    ],
    correctAnswer: 0,
    explanation: "`--amend` replaces the latest unpushed commit."
  },
  {
    id: 17,
    question: "What command verifies that your local repository has zero uncommitted modifications and a clean working tree?",
    options: [
      "git status",
      "git clean",
      "git branch",
      "git push"
    ],
    correctAnswer: 0,
    explanation: "`git status` prints 'nothing to commit, working tree clean' when all trees are synchronized."
  },
  {
    id: 18,
    question: "What is the primary benefit of practicing with the executable bash script `full_module_workflow_lab.sh`?",
    options: [
      "It allows students to execute, inspect, and verify the entire 6-phase Git workflow in an isolated temporary environment",
      "It installs Windows updates",
      "It creates an AWS account",
      "It replaces VS Code"
    ],
    correctAnswer: 0,
    explanation: "The lab script provides an automated, reproducible sandbox for practicing all Module 001_002 commands."
  },
  {
    id: 19,
    question: "In Phase 4, what is the role of the blank line between the commit subject and body?",
    options: [
      "It separates the subject from the body so tools like `git log --oneline` and GitHub PR generators can parse them accurately",
      "It is required by the JavaScript compiler",
      "It prevents merge conflicts",
      "It reduces commit object size"
    ],
    correctAnswer: 0,
    explanation: "Git conventions require a blank line after the subject for proper summary parsing."
  },
  {
    id: 20,
    question: "What command displays the raw contents of the latest commit object in the object database?",
    options: [
      "git cat-file -p HEAD",
      "git show-raw",
      "git cat commit",
      "git inspect HEAD"
    ],
    correctAnswer: 0,
    explanation: "`git cat-file -p HEAD` pretty-prints the low-level commit object headers, author timestamp, and message."
  },
  {
    id: 21,
    question: "If a developer needs to unstage a single file `config.js` without losing changes on disk, what command is used?",
    options: [
      "git restore --staged config.js",
      "rm config.js",
      "git delete config.js",
      "git revert config.js"
    ],
    correctAnswer: 0,
    explanation: "`git restore --staged <file>` unstages the file while keeping disk modifications intact."
  },
  {
    id: 22,
    question: "What does `git diff HEAD~1 HEAD` display?",
    options: [
      "The exact diff introduced between the parent commit (HEAD~1) and the latest commit (HEAD)",
      "Differences between local and remote branches",
      "Unstaged changes only",
      "Differences between stashes"
    ],
    correctAnswer: 0,
    explanation: "Comparing `HEAD~1` to `HEAD` reveals the changes introduced by the most recent commit."
  },
  {
    id: 23,
    question: "Why should developers avoid `git add *` in the terminal lab?",
    options: [
      "Because shell globbing misses hidden dotfiles like `.gitignore` and `.env.example`",
      "Because it deletes all files",
      "Because Git deprecated the asterisk",
      "Because it requires sudo"
    ],
    correctAnswer: 0,
    explanation: "Unquoted `*` is expanded by the shell and ignores hidden dotfiles."
  },
  {
    id: 24,
    question: "What is the hallmark of a successful lab run according to Sukanta Hui?",
    options: [
      "Clean atomic commits, zero committed secrets/debug logs, passing tests, and total mastery of the 3-tree model",
      "A 5,000-line single commit",
      "Committing node_modules to GitHub",
      "Disabling Git tracking"
    ],
    correctAnswer: 0,
    explanation: "Success is demonstrated through disciplined, production-grade version control craftsmanship."
  },
  {
    id: 25,
    question: "How can students clean up the temporary directory created by the lab script when finished?",
    options: [
      "Run `rm -rf <LAB_DIR>` as instructed at the end of the script output",
      "Reboot computer",
      "Reinstall Git",
      "Format hard drive"
    ],
    correctAnswer: 0,
    explanation: "The script outputs the exact path to remove the temporary lab directory safely."
  }
];

export default topic14_questions;
