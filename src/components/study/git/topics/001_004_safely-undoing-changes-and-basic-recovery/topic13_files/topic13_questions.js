/**
 * Topic 13 FAQ Assessment Questions:
 * "Hands-on Terminal Lab: Practicing git restore, commit --amend, soft/mixed/hard resets, and safe git revert"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t13-q1",
    "question": "What is the primary objective of completing the Module 004 Terminal Lab drills?",
    "shortAnswer": "To build muscle memory and instinct for selecting the exact right undo command across working tree, staging, local commit, and shared remote states.",
    "options": [
      "To build instinctive muscle memory across all 4 Git undo mechanisms and verify recovery protocols",
      "To delete test files on GitHub",
      "To learn how to install Linux",
      "To write SQL stored procedures"
    ],
    "answer": "To build instinctive muscle memory across all 4 Git undo mechanisms and verify recovery protocols",
    "explanation": "Hands-on terminal practice turns theoretical understanding of Git's Three Trees into automated, panic-free engineering reflexes.",
    "hint": "Muscle memory across all undo mechanisms.",
    "level": "basic",
    "codeExample": "# Run module_004_full_recovery_lab.sh"
  },
  {
    "id": "undo-t13-q2",
    "question": "In Drill 1, what two commands were used to completely discard a staged error back to pristine HEAD state?",
    "shortAnswer": "`git restore --staged <file>` followed by `git restore <file>`.",
    "options": [
      "`git restore --staged <file>` followed by `git restore <file>`",
      "`git reset --hard`",
      "`git clean -f`",
      "`git revert HEAD`"
    ],
    "answer": "`git restore --staged <file>` followed by `git restore <file>`",
    "explanation": "Step 1 unstages the file from Index to working tree; Step 2 discards the working tree modification.",
    "hint": "Unstage first with --staged, then discard with restore.",
    "level": "basic",
    "codeExample": "git restore --staged app.js\ngit restore app.js"
  },
  {
    "id": "undo-t13-q3",
    "question": "In Drill 2, how did we amend the commit without altering its message when adding a newly staged file?",
    "shortAnswer": "`git commit --amend --no-edit`",
    "options": [
      "`git commit --amend --no-edit`",
      "`git commit --amend -m \"\"`",
      "`git commit --re-add`",
      "`git commit --update`"
    ],
    "answer": "`git commit --amend --no-edit`",
    "explanation": "`--no-edit` instructs Git to reuse the existing commit message verbatim.",
    "hint": "Use --no-edit to keep the message unchanged.",
    "level": "basic",
    "codeExample": "git add helper.js\ngit commit --amend --no-edit"
  },
  {
    "id": "undo-t13-q4",
    "question": "In Drill 3, what command allowed us to restore the commit wiped by `git reset --hard HEAD~1`?",
    "shortAnswer": "`git reset --hard <pre-reset-sha>` (or `git reset --hard HEAD@{1}`).",
    "options": [
      "`git reset --hard HEAD@{1}` (or the pre-reset SHA)",
      "`git undo`",
      "`git fetch origin`",
      "`git checkout backup`"
    ],
    "answer": "`git reset --hard HEAD@{1}` (or the pre-reset SHA)",
    "explanation": "Reflog keeps track of the previous HEAD commit hash, making recovery instantaneous.",
    "hint": "Reset hard to HEAD@{1} using reflog.",
    "level": "intermediate",
    "codeExample": "git reflog\ngit reset --hard HEAD@{1}"
  },
  {
    "id": "undo-t13-q5",
    "question": "In Drill 4, what is the consequence of reverting a revert commit?",
    "shortAnswer": "It re-applies the original changes forward in time, restoring the feature code cleanly.",
    "options": [
      "It re-applies the original feature changes into the codebase forward in time",
      "It deletes all git branches",
      "It creates an infinite loop in Git",
      "It corrupts the object database"
    ],
    "answer": "It re-applies the original feature changes into the codebase forward in time",
    "explanation": "Reverting an inverse patch yields the original forward patch. This is standard re-reverting.",
    "hint": "Inverse of inverse = original code restored.",
    "level": "intermediate",
    "codeExample": "git revert <revert-sha>"
  },
  {
    "id": "undo-t13-q6",
    "question": "In Drill 5, why is `git clean -nd` run before `git clean -fd`?",
    "shortAnswer": "To preview all untracked files and directories slated for deletion, verifying no valuable files are destroyed.",
    "options": [
      "To perform a non-destructive dry-run preview before executing permanent deletions",
      "Because Git requires commands to be run in alphabetical order",
      "To stage the untracked files",
      "To format the hard drive"
    ],
    "answer": "To perform a non-destructive dry-run preview before executing permanent deletions",
    "explanation": "Dry-run previews eliminate blind deletion hazards.",
    "hint": "Always preview with dry run first.",
    "level": "basic",
    "codeExample": "git clean -nd # preview\ngit clean -fd # delete"
  },
  {
    "id": "undo-t13-q7",
    "question": "What is the exit code returned by a shell lab script when all automated verification tests pass successfully?",
    "shortAnswer": "`0` (Zero).",
    "options": [
      "`0` (indicates success)",
      "`1`",
      "`-1`",
      "`255`"
    ],
    "answer": "`0` (indicates success)",
    "explanation": "In POSIX shell scripting, exit code 0 represents flawless execution.",
    "hint": "Exit code 0 means success.",
    "level": "basic",
    "codeExample": "echo $? # prints 0"
  },
  {
    "id": "undo-t13-q8",
    "question": "If you want to run the full master lab in an isolated test folder, which directory path variable is commonly used?",
    "shortAnswer": "A temporary directory like `/tmp/git_lab_$$` (or `%TEMP%` on Windows).",
    "options": [
      "A temporary sandbox directory (e.g. `/tmp/git_lab_$$`)",
      "`/` (root directory)",
      "`C:\\Windows\\System32`",
      "`~/.ssh`"
    ],
    "answer": "A temporary sandbox directory (e.g. `/tmp/git_lab_$$`)",
    "explanation": "Sandbox directories isolate experiments and prevent any contamination of real production projects.",
    "hint": "Use temporary sandbox directories.",
    "level": "basic",
    "codeExample": "SANDBOX_DIR=\"/tmp/git_test_$$\""
  },
  {
    "id": "undo-t13-q9",
    "question": "In the classroom at Barrackpore, Debangshu wants to automate checking his working directory cleanliness after running lab drills. What command checks if the tree is clean?",
    "shortAnswer": "`git status --porcelain` (produces empty output if clean).",
    "options": [
      "`git status --porcelain`",
      "`git verify --clean`",
      "`git check-tree`",
      "`git inspect -q`"
    ],
    "answer": "`git status --porcelain`",
    "explanation": "`--porcelain` produces machine-parseable output. If output is empty, the repository is 100% clean.",
    "hint": "--porcelain gives machine-parseable status.",
    "level": "intermediate",
    "codeExample": "[ -z \"$(git status --porcelain)\" ] && echo \"Clean!\""
  },
  {
    "id": "undo-t13-q10",
    "question": "What command shows the exact SHA hash of the current HEAD commit?",
    "shortAnswer": "`git rev-parse HEAD` (or `git rev-parse --short HEAD`).",
    "options": [
      "`git rev-parse HEAD`",
      "`git show-head`",
      "`git hash --current`",
      "`git id`"
    ],
    "answer": "`git rev-parse HEAD`",
    "explanation": "`git rev-parse` is the standard plumbing command to resolve object identifiers.",
    "hint": "rev-parse resolves references to SHA hashes.",
    "level": "intermediate",
    "codeExample": "git rev-parse --short HEAD"
  },
  {
    "id": "undo-t13-q11",
    "question": "Which reset mode allows you to collapse 4 exploratory commits into 1 commit without changing any file content or losing staged status?",
    "shortAnswer": "`git reset --soft HEAD~4`",
    "options": [
      "`git reset --soft HEAD~4`",
      "`git reset --hard HEAD~4`",
      "`git reset --mixed HEAD~4`",
      "`git clean -fd`"
    ],
    "answer": "`git reset --soft HEAD~4`",
    "explanation": "Soft reset keeps all file changes staged in the Index, ready for a consolidated commit.",
    "hint": "Soft reset preserves staged changes.",
    "level": "basic",
    "codeExample": "git reset --soft HEAD~4\ngit commit -m \"feat: squashed feature\""
  },
  {
    "id": "undo-t13-q12",
    "question": "How can you view the reflog history with relative timestamps?",
    "shortAnswer": "`git reflog --date=relative`",
    "options": [
      "`git reflog --date=relative`",
      "`git reflog -t`",
      "`git reflog --time`",
      "`git log --reflog-time`"
    ],
    "answer": "`git reflog --date=relative`",
    "explanation": "Passing `--date=relative` displays human-friendly strings like '2 minutes ago' or '1 hour ago'.",
    "hint": "--date=relative formats timestamps.",
    "level": "intermediate",
    "codeExample": "git reflog --date=relative"
  },
  {
    "id": "undo-t13-q13",
    "question": "What happens if you run `git restore --staged --worktree .` in a repository with staged and unstaged tracked changes?",
    "shortAnswer": "All staged and unstaged tracked file modifications across the entire repository are discarded to match HEAD.",
    "options": [
      "All tracked modifications in both Index and Working Tree are discarded back to match HEAD",
      "All commits are deleted",
      "All untracked files are deleted",
      "A new commit is created"
    ],
    "answer": "All tracked modifications in both Index and Working Tree are discarded back to match HEAD",
    "explanation": "Combines clearing the staging index and reverting all working tree edits in one command.",
    "hint": "Discards both staged and working tree modifications.",
    "level": "intermediate",
    "codeExample": "git restore --staged --worktree ."
  },
  {
    "id": "undo-t13-q14",
    "question": "Why does `git revert` work cleanly even when the target commit has multiple files across different folders?",
    "shortAnswer": "Because Git computes the complete tree diff of the commit and generates corresponding inverse patches for all modified files in that commit.",
    "options": [
      "Because Git calculates the full tree snapshot diff and inverts every file change contained in that commit",
      "Because revert only works on 1 file at a time",
      "Because revert moves files to `/tmp`",
      "Because Git converts files to JSON"
    ],
    "answer": "Because Git calculates the full tree snapshot diff and inverts every file change contained in that commit",
    "explanation": "Commits represent repository-wide snapshots; revert inverts the complete changeset atomically.",
    "hint": "Revert acts on the complete commit changeset.",
    "level": "intermediate",
    "codeExample": "# Reverts all files touched by that commit"
  },
  {
    "id": "undo-t13-q15",
    "question": "What is the difference between `git reset --hard HEAD` and `git restore --staged --worktree .`?",
    "shortAnswer": "For tracked files they have the exact same effect; however `reset --hard` also adjusts the branch pointer if targeting a different commit.",
    "options": [
      "On HEAD they have identical effects on tracked files; `reset` can also rewind to other commits, while `restore` only restores file content",
      "`restore` requires root access",
      "`reset` deletes the `.git` folder",
      "There is no difference"
    ],
    "answer": "On HEAD they have identical effects on tracked files; `reset` can also rewind to other commits, while `restore` only restores file content",
    "explanation": "`git restore` is designed for file-level recovery, while `git reset` is designed for branch pointer manipulation.",
    "hint": "Restore is for file content; Reset is for branch pointers.",
    "level": "intermediate",
    "codeExample": "# Both clean tracked changes when targeted at HEAD"
  },
  {
    "id": "undo-t13-q16",
    "question": "How do you test if your local Git repository has any uncommitted changes in a bash script?",
    "shortAnswer": "`git diff-index --quiet HEAD --` (exits 0 if clean, 1 if changes exist).",
    "options": [
      "`git diff-index --quiet HEAD --`",
      "`git status --test`",
      "`git check-clean`",
      "`git is-clean`"
    ],
    "answer": "`git diff-index --quiet HEAD --`",
    "explanation": "`git diff-index --quiet HEAD --` is a standard Git plumbing command used in scripts to check for changes without producing stdout.",
    "hint": "diff-index --quiet is standard plumbing for clean checks.",
    "level": "advanced",
    "codeExample": "if git diff-index --quiet HEAD --; then echo \"Clean\"; fi"
  },
  {
    "id": "undo-t13-q17",
    "question": "In Drill 2, what would happen if we ran `git commit --amend` WITHOUT staging any files and without changing the message?",
    "shortAnswer": "It would simply update the commit timestamp (CommitterDate) and generate a new commit SHA hash with the identical content.",
    "options": [
      "It updates the committer timestamp and calculates a new commit SHA hash with identical content",
      "Git throws an error",
      "Git deletes the commit",
      "Git opens GitHub"
    ],
    "answer": "It updates the committer timestamp and calculates a new commit SHA hash with identical content",
    "explanation": "Because the committer timestamp changes, the cryptographic hash must change, creating a new commit object.",
    "hint": "Timestamp changes produce a new commit SHA.",
    "level": "intermediate",
    "codeExample": "git commit --amend --no-edit # Updates timestamp & SHA"
  },
  {
    "id": "undo-t13-q18",
    "question": "What command lists all dangling objects in the repository after running various resets and amends in the lab?",
    "shortAnswer": "`git fsck --lost-found`",
    "options": [
      "`git fsck --lost-found`",
      "`git clean --dangling`",
      "`git objects --lost`",
      "`git show-dangling`"
    ],
    "answer": "`git fsck --lost-found`",
    "explanation": "`git fsck` scans object storage and exports dangling blobs and commits into `.git/lost-found/`.",
    "hint": "fsck --lost-found exports dangling objects.",
    "level": "advanced",
    "codeExample": "git fsck --lost-found"
  },
  {
    "id": "undo-t13-q19",
    "question": "What is the primary reason for running lab scripts in automated testing environments?",
    "shortAnswer": "To verify that version control workflows function deterministically across different operating systems and environments.",
    "options": [
      "To ensure deterministic, reproducible version control behavior across developer systems",
      "To increase CPU temperature",
      "To generate large log files",
      "To test internet bandwidth"
    ],
    "answer": "To ensure deterministic, reproducible version control behavior across developer systems",
    "explanation": "Automated lab testing confirms that scripts and procedures execute predictably everywhere.",
    "hint": "Ensures deterministic, reproducible behavior.",
    "level": "basic",
    "codeExample": "# Automated script execution ensures repeatability"
  },
  {
    "id": "undo-t13-q20",
    "question": "If you amend a commit 5 times in a row, how many entries will be added to `git reflog`?",
    "shortAnswer": "5 separate entries (one for each commit/amend action).",
    "options": [
      "5 separate reflog entries recording each intermediate state",
      "Only 1 entry",
      "Zero entries",
      "10 entries"
    ],
    "answer": "5 separate reflog entries recording each intermediate state",
    "explanation": "Reflog records every single transition of HEAD. Every amend is logged as a separate jump.",
    "hint": "Every pointer movement creates a reflog entry.",
    "level": "intermediate",
    "codeExample": "# Reflog logs every single amend step"
  },
  {
    "id": "undo-t13-q21",
    "question": "How can you view a graphical log of the repository during lab exercises?",
    "shortAnswer": "`git log --graph --oneline --decorate --all`",
    "options": [
      "`git log --graph --oneline --decorate --all`",
      "`git graph --show`",
      "`git visual-log`",
      "`git tree-view`"
    ],
    "answer": "`git log --graph --oneline --decorate --all`",
    "explanation": "The `--graph --oneline --decorate --all` flags render the complete DAG branching structure in clean ASCII format.",
    "hint": "--graph --oneline --decorate --all renders the ASCII DAG.",
    "level": "basic",
    "codeExample": "git log --graph --oneline --decorate --all"
  },
  {
    "id": "undo-t13-q22",
    "question": "What flag can you pass to `git clean` to ignore `.gitignore` rules and purge all untracked files including build outputs?",
    "shortAnswer": "`-x`",
    "options": [
      "`-x`",
      "`-f`",
      "`-d`",
      "`-a`"
    ],
    "answer": "`-x`",
    "explanation": "`-x` tells `git clean` to ignore the ignore rules and delete everything untracked.",
    "hint": "-x removes ignored files too.",
    "level": "basic",
    "codeExample": "git clean -fdx"
  },
  {
    "id": "undo-t13-q23",
    "question": "In the Barrackpore lab, Mahima ran `git restore --source=HEAD~2 src/app.js`. What did this command do?",
    "shortAnswer": "It restored `src/app.js` in her working tree to the exact version from 2 commits ago without moving the current HEAD pointer.",
    "options": [
      "It restored `src/app.js` to its version from 2 commits ago without moving the HEAD branch pointer",
      "It rewound HEAD by 2 commits",
      "It deleted `src/app.js`",
      "It staged all files"
    ],
    "answer": "It restored `src/app.js` to its version from 2 commits ago without moving the HEAD branch pointer",
    "explanation": "`--source` selectively pulls historical file states into the active workspace without altering branch pointers.",
    "hint": "--source pulls specific file versions without moving HEAD.",
    "level": "intermediate",
    "codeExample": "git restore --source=HEAD~2 src/app.js"
  },
  {
    "id": "undo-t13-q24",
    "question": "True or False: Running all 5 drills in the lab script guarantees zero data loss if executed properly.",
    "shortAnswer": "True. The lab script demonstrates how Git's object store and reflog preserve all committed state.",
    "options": [
      "True; Git's object database and reflog safeguard all committed state throughout the drills",
      "False; Git randomly loses commits during scripts",
      "True; but only if run on macOS",
      "False; git restore deletes commits"
    ],
    "answer": "True; Git's object database and reflog safeguard all committed state throughout the drills",
    "explanation": "Git's architecture ensures that all committed snapshots remain safe and recoverable.",
    "hint": "Git's object store is durable and reliable.",
    "level": "basic",
    "codeExample": "# Lab script demonstrates 100% data preservation"
  },
  {
    "id": "undo-t13-q25",
    "question": "In summary, what is the master decision framework for undoing changes in Git?",
    "shortAnswer": "1. Unstaged edits -> `git restore`. 2. Staged edits -> `git restore --staged`. 3. Local commits -> `git commit --amend` or `git reset`. 4. Public pushed commits -> `git revert`. 5. Untracked junk -> `git clean`.",
    "options": [
      "Unstaged: restore | Staged: restore --staged | Local commit: reset/amend | Public commit: revert | Untracked: clean",
      "Always use git reset --hard for everything",
      "Always delete repository and clone again",
      "Never undo anything"
    ],
    "answer": "Unstaged: restore | Staged: restore --staged | Local commit: reset/amend | Public commit: revert | Untracked: clean",
    "explanation": "This 5-pillar matrix represents the complete mental model for safe Git recovery.",
    "hint": "The 5 Pillars of Git Undo.",
    "level": "basic",
    "codeExample": "# 1. Unstaged: restore\n# 2. Staged: restore --staged\n# 3. Local: reset / amend\n# 4. Public: revert\n# 5. Untracked: clean"
  }
];

export default questions;
