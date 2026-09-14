/**
 * Topic 7 FAQ Assessment Questions:
 * "The Golden Safety Rule of git reset --hard: Understanding what is permanently unrecoverable vs what is in Git's object store"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t7-q1",
    "question": "What category of changes is permanently unrecoverable by Git after running `git reset --hard`?",
    "shortAnswer": "Uncommitted and unstaged edits sitting only in the working tree.",
    "options": [
      "Uncommitted, unstaged modifications in working tree files that were never saved to Git's object database",
      "Commits that were committed 3 weeks ago",
      "Git tags",
      "Remote branch commits"
    ],
    "answer": "Uncommitted, unstaged modifications in working tree files that were never saved to Git's object database",
    "explanation": "Because Git only tracks data that has entered its object database (via `git add` or `git commit`), unstaged in-memory/disk edits are overwritten without a backup.",
    "hint": "Git cannot restore what was never committed or staged.",
    "level": "basic",
    "codeExample": "# Uncommitted modifications in working tree are lost forever"
  },
  {
    "id": "undo-t7-q2",
    "question": "Can committed snapshots that were rewound by `git reset --hard HEAD~5` be recovered?",
    "shortAnswer": "Yes! Because commits are saved as immutable objects in `.git/objects/`, their SHA hashes remain in `git reflog`.",
    "options": [
      "Yes, by finding the prior commit SHA in `git reflog` and running `git reset --hard <sha>`",
      "No, once hard reset is run, all commits are deleted from the disk",
      "Only if the computer has not been turned off",
      "Only by contacting GitHub customer support"
    ],
    "answer": "Yes, by finding the prior commit SHA in `git reflog` and running `git reset --hard <sha>`",
    "explanation": "Committed objects stay in `.git/objects/` for at least 30-90 days before garbage collection runs. Reflog preserves their references.",
    "hint": "Committed data is saved in Git's object database.",
    "level": "basic",
    "codeExample": "git reflog\ngit reset --hard HEAD@{1}"
  },
  {
    "id": "undo-t7-q3",
    "question": "What is `git reflog`?",
    "shortAnswer": "A local journal that records every single change to repository reference pointers (HEAD and branch tips) in chronological order.",
    "options": [
      "A local chronological recording of every time HEAD or a branch ref changed position",
      "A cloud log hosted on AWS",
      "A list of deleted Git accounts",
      "A Markdown file in the project root"
    ],
    "answer": "A local chronological recording of every time HEAD or a branch ref changed position",
    "explanation": "Reflog acts as a flight data recorder for Git, making it possible to recover almost any deleted branch, commit, or reset.",
    "hint": "The flight recorder / safety net of Git.",
    "level": "basic",
    "codeExample": "git reflog"
  },
  {
    "id": "undo-t7-q4",
    "question": "How long does `git reflog` retain history entries by default before expiration?",
    "shortAnswer": "90 days for reachable entries and 30 days for unreachable entries.",
    "options": [
      "90 days for reachable references and 30 days for unreachable references",
      "24 hours",
      "5 minutes",
      "Forever, it is never cleaned"
    ],
    "answer": "90 days for reachable references and 30 days for unreachable references",
    "explanation": "The default configuration (`gc.reflogExpire = 90 days`, `gc.reflogExpireUnreachable = 30 days`) gives developers plenty of time to recover lost commits.",
    "hint": "Default is 90 days / 30 days.",
    "level": "intermediate",
    "codeExample": "# gc.reflogExpire = 90 days"
  },
  {
    "id": "undo-t7-q5",
    "question": "If you ran `git add .` on a file but did NOT run `git commit`, and then ran `git reset --hard`, is that file's content in the object database?",
    "shortAnswer": "Yes. `git add` writes a blob object into `.git/objects/`. It can be located using `git fsck --lost-found`.",
    "options": [
      "Yes, `git add` created a blob object in `.git/objects/` which can be recovered using `git fsck --lost-found`",
      "No, only `git commit` writes to the object database",
      "No, `git reset --hard` purges the blob object instantly",
      "Yes, but only if the file was less than 1KB"
    ],
    "answer": "Yes, `git add` created a blob object in `.git/objects/` which can be recovered using `git fsck --lost-found`",
    "explanation": "Staging a file immediately compresses its content and writes a SHA-1 blob into `.git/objects/`, making it recoverable via `git fsck`.",
    "hint": "git add creates blob objects immediately.",
    "level": "advanced",
    "codeExample": "git fsck --lost-found\n# Look inside .git/lost-found/other/"
  },
  {
    "id": "undo-t7-q6",
    "question": "What is the simplest defensive step you should take before running `git reset --hard` when you want a foolproof safety net?",
    "shortAnswer": "Create a temporary safety branch: `git branch safety-backup` or run `git stash -u`.",
    "options": [
      "Create a quick backup branch: `git branch safety-backup` or run `git stash -u`",
      "Restart the terminal window",
      "Delete all untracked files",
      "Clone the repository again"
    ],
    "answer": "Create a quick backup branch: `git branch safety-backup` or run `git stash -u`",
    "explanation": "Creating a branch pointer or stash entry ensures all current state is recorded under a named ref, eliminating any chance of accidental loss.",
    "hint": "Branch or stash before resetting.",
    "level": "basic",
    "codeExample": "git branch backup-before-reset\ngit reset --hard HEAD~2"
  },
  {
    "id": "undo-t7-q7",
    "question": "In the classroom at Barrackpore, Tuhina accidentally reset her branch to `HEAD~3`. She ran `git reflog` and saw: `HEAD@{1}: commit: feat(invoice): calculate GST`. What command should she run to restore her repository?",
    "shortAnswer": "`git reset --hard HEAD@{1}`",
    "options": [
      "`git reset --hard HEAD@{1}`",
      "`git reset --soft HEAD~1`",
      "`git restore .`",
      "`git clean -f`"
    ],
    "answer": "`git reset --hard HEAD@{1}`",
    "explanation": "`HEAD@{1}` refers to the state immediately before the reset command occurred.",
    "hint": "Reset hard to the reflog index prior to the reset.",
    "level": "basic",
    "codeExample": "git reset --hard HEAD@{1}"
  },
  {
    "id": "undo-t7-q8",
    "question": "Does `git reflog` get pushed to remote servers like GitHub when you run `git push`?",
    "shortAnswer": "No. `git reflog` is strictly local to your machine and is never shared over the network.",
    "options": [
      "No, reflog is completely private and local to your repository clone",
      "Yes, reflogs are stored in the GitHub repository wiki",
      "Yes, but only for repository owners",
      "Only if you push with `--reflog` flag"
    ],
    "answer": "No, reflog is completely private and local to your repository clone",
    "explanation": "Reflog tracks local pointer movements on your individual filesystem. It is never transferred during push or pull operations.",
    "hint": "Reflog is 100% local to each developer machine.",
    "level": "intermediate",
    "codeExample": "# Reflog is never transferred over network"
  },
  {
    "id": "undo-t7-q9",
    "question": "What command triggers Git's internal garbage collection that permanently purges unreferenced dangling objects?",
    "shortAnswer": "`git gc` (or `git gc --prune=now`).",
    "options": [
      "`git gc`",
      "`git clean`",
      "`git purge`",
      "`git vacuum`"
    ],
    "answer": "`git gc`",
    "explanation": "`git gc` (Garbage Collect) packs refs and prunes old, unreachable objects whose reflog entries have expired.",
    "hint": "gc stands for garbage collection.",
    "level": "intermediate",
    "codeExample": "git gc --prune=now"
  },
  {
    "id": "undo-t7-q10",
    "question": "What is a 'dangling commit' in Git terminology?",
    "shortAnswer": "A commit that exists in `.git/objects/` but is not directly or indirectly referenced by any active branch, tag, or HEAD.",
    "options": [
      "A commit object in the database that is no longer reachable from any branch or tag reference",
      "A commit with syntax errors",
      "A commit created without an email address",
      "A commit that failed continuous integration"
    ],
    "answer": "A commit object in the database that is no longer reachable from any branch or tag reference",
    "explanation": "When you reset or amend, the old commit becomes disconnected from the active branch tips, forming a dangling node in the DAG.",
    "hint": "Dangling = unreferenced by active branch pointers.",
    "level": "intermediate",
    "codeExample": "# Dangling commit found by git fsck"
  },
  {
    "id": "undo-t7-q11",
    "question": "How does `git fsck` help in disaster recovery?",
    "shortAnswer": "It scans the Git object database and lists all dangling blobs, trees, and commits that are not attached to any active branch.",
    "options": [
      "It verifies repository database integrity and reports dangling or unreferenced objects",
      "It repairs broken hard drive partitions",
      "It scans for computer viruses in source code",
      "It checks for misspelled JavaScript variable names"
    ],
    "answer": "It verifies repository database integrity and reports dangling or unreferenced objects",
    "explanation": "`fsck` (File System Check) audits Git's object store and can locate orphaned commits and blobs.",
    "hint": "fsck stands for file system check.",
    "level": "advanced",
    "codeExample": "git fsck --unreachable --no-reflogs"
  },
  {
    "id": "undo-t7-q12",
    "question": "If you delete a branch named `feature-tax` using `git branch -D feature-tax`, can it be recovered using `git reflog`?",
    "shortAnswer": "Yes! The tip commit of that branch before deletion is listed in `git reflog`. You can recreate the branch with `git branch feature-tax <sha>`.",
    "options": [
      "Yes, find the last commit SHA of that branch in `git reflog` and re-create it with `git branch feature-tax <sha>`",
      "No, `-D` permanently deletes all commit objects",
      "Only if the branch had less than 3 commits",
      "Only if the branch was merged to main"
    ],
    "answer": "Yes, find the last commit SHA of that branch in `git reflog` and re-create it with `git branch feature-tax <sha>`",
    "explanation": "Deleting a branch only deletes the 41-byte ref file in `.git/refs/heads/`. The commit objects remain safe in `.git/objects/`.",
    "hint": "Branch deletion only removes the pointer ref; commits survive.",
    "level": "intermediate",
    "codeExample": "git reflog\ngit branch feature-tax 8f9a12c"
  },
  {
    "id": "undo-t7-q13",
    "question": "What does the notation `HEAD@{2}` mean in Git?",
    "shortAnswer": "The commit that HEAD pointed to two reference changes ago.",
    "options": [
      "The state of HEAD two actions/pointer changes ago",
      "The commit created 2 days ago",
      "The second branch in the repository",
      "The commit authored by user #2"
    ],
    "answer": "The state of HEAD two actions/pointer changes ago",
    "explanation": "Curly braces with an integer in reflog syntax represent the index into the reference log history.",
    "hint": "Reflog indexing steps back through pointer movements.",
    "level": "basic",
    "codeExample": "git show HEAD@{2}"
  },
  {
    "id": "undo-t7-q14",
    "question": "Can you use time-based specifiers with reflog, such as `HEAD@{'yesterday'}` or `HEAD@{'1.hour.ago'}`?",
    "shortAnswer": "Yes, Git reflog supports friendly date and relative time queries.",
    "options": [
      "Yes, Git reflog supports relative time specifiers like `HEAD@{'1.hour.ago'}`",
      "No, only numeric indices are supported",
      "Only on macOS systems",
      "Only with GitHub Pro"
    ],
    "answer": "Yes, Git reflog supports relative time specifiers like `HEAD@{'1.hour.ago'}`",
    "explanation": "Git's date parser allows querying reflog entries by relative timestamps.",
    "hint": "Time-based reflog specifiers are built-in.",
    "level": "intermediate",
    "codeExample": "git reset --hard HEAD@{\"2.hours.ago\"}"
  },
  {
    "id": "undo-t7-q15",
    "question": "Why is Git considered one of the safest version control systems ever built regarding committed code?",
    "shortAnswer": "Because Git's object store is append-only by design; operations create new objects rather than overwriting existing ones.",
    "options": [
      "Because Git's object database is append-only; standard commands add new data and move pointers without deleting objects",
      "Because Git creates 10 duplicate copies of every file on AWS",
      "Because Git locks your keyboard during errors",
      "Because Git requires fingerprint authentication"
    ],
    "answer": "Because Git's object database is append-only; standard commands add new data and move pointers without deleting objects",
    "explanation": "Git almost never deletes object files during standard day-to-day operations. As long as you commit, your code is safe.",
    "hint": "Append-only architecture preserves history.",
    "level": "basic",
    "codeExample": "# Git object store is append-only"
  },
  {
    "id": "undo-t7-q16",
    "question": "What is the single most important habit for a beginner to avoid ever losing code in Git?",
    "shortAnswer": "Commit frequently with small, atomic commits; once code is committed, it is virtually impossible to lose.",
    "options": [
      "Commit frequently in small atomic units; committed data is protected in Git's object store",
      "Never turn off your monitor",
      "Save all code in a single 10,000 line file",
      "Disable git status"
    ],
    "answer": "Commit frequently in small atomic units; committed data is protected in Git's object store",
    "explanation": "Frequent commits ensure that even if you perform a mistaken reset or checkout, `git reflog` can immediately restore your work.",
    "hint": "Commit early, commit often.",
    "level": "basic",
    "codeExample": "# Frequent atomic commits = absolute safety net"
  },
  {
    "id": "undo-t7-q17",
    "question": "If you lose a file after `git reset --hard` that you never staged and never committed, is there any Git command that can bring it back?",
    "shortAnswer": "No. Git was never told about the file, so it cannot restore it. You must rely on IDE local history or OS backups.",
    "options": [
      "No; Git has no record of uncommitted/unstaged file content. You must check IDE local history or OS file recovery",
      "Yes, `git undo-hard`",
      "Yes, `git fetch --all-files`",
      "Yes, `git emergency-restore`"
    ],
    "answer": "No; Git has no record of uncommitted/unstaged file content. You must check IDE local history or OS file recovery",
    "explanation": "Git only protects what it stores. If an edit never reached the staging index or a commit, Git cannot help.",
    "hint": "Check VS Code Local History or OS backups if Git never saw the file.",
    "level": "basic",
    "codeExample": "# Check VS Code Timeline / Local History for uncommitted recovery"
  },
  {
    "id": "undo-t7-q18",
    "question": "How does VS Code's 'Local History' / Timeline feature complement Git's safety model?",
    "shortAnswer": "VS Code saves periodic local file revisions on disk independently of Git, providing a recovery safety net for uncommitted edits.",
    "options": [
      "It saves file snapshots automatically on every file save, allowing recovery of uncommitted files overwritten by hard resets",
      "It replaces Git completely",
      "It uploads uncommitted files to Microsoft Azure",
      "It prevents developers from running terminal commands"
    ],
    "answer": "It saves file snapshots automatically on every file save, allowing recovery of uncommitted files overwritten by hard resets",
    "explanation": "IDE local history provides a secondary safety net for raw file edits that were never staged into Git.",
    "hint": "VS Code Timeline tracks file saves locally.",
    "level": "intermediate",
    "codeExample": "# In VS Code: Right-click file -> Timeline -> View previous local save"
  },
  {
    "id": "undo-t7-q19",
    "question": "What does `git reflog expire --expire=now --all` do?",
    "shortAnswer": "It immediately invalidates and purges all reflog entries across all branches, removing the safety net.",
    "options": [
      "It purges all reflog records immediately, eliminating the reference safety net",
      "It upgrades the reflog to version 2",
      "It creates an index of all files",
      "It compresses the repository size by 99%"
    ],
    "answer": "It purges all reflog records immediately, eliminating the reference safety net",
    "explanation": "Expiring reflogs immediately makes all unreachable commits candidates for pruning during `git gc`.",
    "hint": "Expire removes the reflog entries.",
    "level": "advanced",
    "codeExample": "git reflog expire --expire=now --all"
  },
  {
    "id": "undo-t7-q20",
    "question": "What is the difference between `git log` and `git reflog`?",
    "shortAnswer": "`git log` displays the commit history along the active branch's ancestry; `git reflog` shows the local chronological history of HEAD movements.",
    "options": [
      "`git log` shows commit graph ancestry of the current branch; `git reflog` shows local chronological movements of HEAD",
      "`git reflog` is only for remote repositories",
      "`git log` only shows the last 3 commits",
      "There is no difference"
    ],
    "answer": "`git log` shows commit graph ancestry of the current branch; `git reflog` shows local chronological movements of HEAD",
    "explanation": "`git log` traverses parent pointers; `git reflog` is an append-only transaction journal of your local pointer jumps.",
    "hint": "Log shows DAG ancestry; reflog shows pointer movement journal.",
    "level": "intermediate",
    "codeExample": "# git log = commit tree\n# git reflog = your local action history"
  },
  {
    "id": "undo-t7-q21",
    "question": "Can you checkout a specific commit from reflog to inspect it without resetting your current branch?",
    "shortAnswer": "Yes, `git checkout <sha>` or `git switch --detach <sha>` enters a detached HEAD state to inspect the historical code safely.",
    "options": [
      "Yes, `git checkout <sha>` lets you inspect the old commit in a detached HEAD state without modifying your current branch",
      "No, you must always run a hard reset",
      "Only if you clone to a new folder",
      "Only if the commit is on GitHub"
    ],
    "answer": "Yes, `git checkout <sha>` lets you inspect the old commit in a detached HEAD state without modifying your current branch",
    "explanation": "Checking out the SHA directly puts you into detached HEAD mode to inspect or run tests without moving your branch pointer.",
    "hint": "Detached HEAD lets you inspect any historical commit safely.",
    "level": "intermediate",
    "codeExample": "git checkout HEAD@{3}"
  },
  {
    "id": "undo-t7-q22",
    "question": "Suppose Sachin made a mistake during a rebase and lost 10 commits. What is his immediate step to restore the branch?",
    "shortAnswer": "Check `git reflog`, identify the commit SHA right before the rebase started (e.g. `HEAD@{10}`), and run `git reset --hard <sha>`.",
    "options": [
      "Open `git reflog`, find the commit before `rebase: checkout`, and run `git reset --hard <sha>`",
      "Re-install Git",
      "Delete the repository",
      "Run `git push --force`"
    ],
    "answer": "Open `git reflog`, find the commit before `rebase: checkout`, and run `git reset --hard <sha>`",
    "explanation": "Reflog records the exact SHA before any rebase, reset, or merge, allowing 100% full recovery in one command.",
    "hint": "Find pre-rebase SHA in reflog and reset hard.",
    "level": "intermediate",
    "codeExample": "git reflog\n# Look for entry: checkout: moving from ...\ngit reset --hard 4a9f123"
  },
  {
    "id": "undo-t7-q23",
    "question": "True or False: If you clone a repository from GitHub to a new machine, your local `git reflog` from your old computer will be transferred automatically.",
    "shortAnswer": "False. Reflog is purely local to each individual machine repository instance.",
    "options": [
      "False; reflog is never transmitted over network clone/fetch operations",
      "True; reflogs are stored in the git cloud",
      "True; if both computers use the same email address",
      "False; but it is saved in `.gitignore`"
    ],
    "answer": "False; reflog is never transmitted over network clone/fetch operations",
    "explanation": "Reflog is an internal, per-clone activity log.",
    "hint": "Reflogs do not sync across machines.",
    "level": "basic",
    "codeExample": "# Reflog is per-machine only"
  },
  {
    "id": "undo-t7-q24",
    "question": "What is the command to create a new branch from a lost commit found in `git reflog` without modifying your current branch?",
    "shortAnswer": "`git branch rescue-branch <commit-sha>`",
    "options": [
      "`git branch rescue-branch <commit-sha>`",
      "`git checkout -b rescue-branch --delete-old`",
      "`git reset --branch rescue-branch <sha>`",
      "`git recover-branch rescue-branch`"
    ],
    "answer": "`git branch rescue-branch <commit-sha>`",
    "explanation": "`git branch <name> <start-point>` creates a new named branch pointing directly to the specified SHA.",
    "hint": "git branch <name> <sha> attaches a new pointer to any commit.",
    "level": "basic",
    "codeExample": "git branch rescue-feature 8f1b3c4"
  },
  {
    "id": "undo-t7-q25",
    "question": "In summary, what is the Golden Safety Hierarchy of Git data recovery?",
    "shortAnswer": "1. Committed code = Completely safe (recoverable via reflog). 2. Staged code = Safe in object store (recoverable via fsck). 3. Uncommitted/unstaged code = Volatile (lost on hard reset).",
    "options": [
      "Committed = 100% Safe (Reflog); Staged = Stored (fsck blobs); Uncommitted = Volatile (Lost on hard reset)",
      "All code is equally lost",
      "All code is automatically backed up to GitHub",
      "Git cannot recover anything once reset is run"
    ],
    "answer": "Committed = 100% Safe (Reflog); Staged = Stored (fsck blobs); Uncommitted = Volatile (Lost on hard reset)",
    "explanation": "This hierarchy explains exactly what Git protects and why frequent commits are the ultimate developer insurance policy.",
    "hint": "Committed > Staged > Uncommitted.",
    "level": "basic",
    "codeExample": "# 1. Committed: Reflog\n# 2. Staged: git fsck\n# 3. Uncommitted: IDE Local History"
  }
];

export default questions;
