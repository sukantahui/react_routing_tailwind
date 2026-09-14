/**
 * Topic 5 FAQ Assessment Questions:
 * "Demystifying git reset: How reset moves the HEAD pointer and adjusts Index and Working Tree"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t5-q1",
    "question": "What is the primary action performed by `git reset <commit>` at the repository pointer level?",
    "shortAnswer": "It moves the current branch pointer (and HEAD) to the specified commit, effectively rewinding the branch's tip in history.",
    "options": [
      "It moves the current branch ref and HEAD to point to the designated target commit",
      "It deletes the `.git` directory",
      "It switches branches to a detached HEAD state",
      "It sends an email alert to the repository administrator"
    ],
    "answer": "It moves the current branch ref and HEAD to point to the designated target commit",
    "explanation": "`git reset` fundamentally manipulates branch references. It tells the active branch to point to an earlier commit in the DAG.",
    "hint": "Reset moves the active branch ref backwards.",
    "level": "basic",
    "codeExample": "git reset HEAD~1"
  },
  {
    "id": "undo-t5-q2",
    "question": "How does `git reset` differ from `git checkout <branch>` or `git switch <branch>`?",
    "shortAnswer": "`checkout`/`switch` moves HEAD to a different branch without changing branch pointers; `reset` moves the current branch pointer itself.",
    "options": [
      "`checkout/switch` changes which branch HEAD points to without altering branch pointers; `reset` moves the current branch pointer itself",
      "`reset` is only used on Windows; `checkout` is for macOS/Linux",
      "`checkout` deletes uncommitted files, while `reset` never touches disk",
      "There is no difference"
    ],
    "answer": "`checkout/switch` changes which branch HEAD points to without altering branch pointers; `reset` moves the current branch pointer itself",
    "explanation": "Switching branches changes the HEAD symbolic pointer. Resetting moves the actual branch reference (e.g., `refs/heads/main`).",
    "hint": "Switch changes target branch; reset moves the current branch.",
    "level": "intermediate",
    "codeExample": "# git switch feat -> HEAD points to refs/heads/feat\n# git reset HEAD~1 -> refs/heads/feat pointer moves back 1 commit"
  },
  {
    "id": "undo-t5-q3",
    "question": "What are the three trees in Git's Three-Tree Architecture affected by `git reset`?",
    "shortAnswer": "HEAD (the commit snapshot), Index (staging area), and Working Tree (working directory).",
    "options": [
      "HEAD, Index (Staging Area), and Working Tree",
      "Repository, Cloud Server, and CDN",
      "Frontend, Backend, and Database",
      "Local branch, Remote branch, and Tag"
    ],
    "answer": "HEAD, Index (Staging Area), and Working Tree",
    "explanation": "Git's core data workflow revolves around the HEAD snapshot, the Staging Index, and the physical Working Directory.",
    "hint": "The three stages of Git: commit history, staging index, working files.",
    "level": "basic",
    "codeExample": "# Three Trees:\n# 1. HEAD\n# 2. Index\n# 3. Working Directory"
  },
  {
    "id": "undo-t5-q4",
    "question": "What is the default mode of `git reset` if no flag (`--soft`, `--mixed`, `--hard`) is provided?",
    "shortAnswer": "`--mixed`",
    "options": [
      "`--mixed`",
      "`--soft`",
      "`--hard`",
      "`--merge`"
    ],
    "answer": "`--mixed`",
    "explanation": "Running `git reset HEAD~1` is exactly identical to running `git reset --mixed HEAD~1`.",
    "hint": "Mixed is the balanced default mode.",
    "level": "basic",
    "codeExample": "git reset HEAD~1 # defaults to --mixed"
  },
  {
    "id": "undo-t5-q5",
    "question": "What does `HEAD~1` represent in relative Git commit syntax?",
    "shortAnswer": "The immediate parent commit of the current HEAD commit.",
    "options": [
      "The first parent commit directly preceding the current HEAD",
      "The commit created 1 hour ago",
      "The next commit that will be made in the future",
      "The initial commit in the repository"
    ],
    "answer": "The first parent commit directly preceding the current HEAD",
    "explanation": "`~1` specifies stepping back 1 generation in the linear commit hierarchy.",
    "hint": "Tilde 1 steps back 1 commit generation.",
    "level": "basic",
    "codeExample": "git reset HEAD~1 # Rewinds 1 commit"
  },
  {
    "id": "undo-t5-q6",
    "question": "What happens to the commit object that HEAD was pointing to before running `git reset HEAD~1`?",
    "shortAnswer": "The commit object remains intact in `.git/objects/` and is recorded in `git reflog`; it is NOT immediately deleted.",
    "options": [
      "It remains in the repository database as an unreachable object and can still be retrieved via `git reflog`",
      "It is instantly erased and overwritten with zeroes",
      "It is emailed to GitHub as a deleted artifact",
      "It is converted into a stash entry"
    ],
    "answer": "It remains in the repository database as an unreachable object and can still be retrieved via `git reflog`",
    "explanation": "Git never immediately destroys committed data. The commit remains reachable through the reflog until garbage collection runs.",
    "hint": "Committed objects are safe in the database.",
    "level": "intermediate",
    "codeExample": "git reflog # Shows the commit before reset"
  },
  {
    "id": "undo-t5-q7",
    "question": "What is the first step (`Phase 1`) that Git ALWAYS performs regardless of whether `--soft`, `--mixed`, or `--hard` is passed?",
    "shortAnswer": "Moves the HEAD and active branch pointer to the target commit.",
    "options": [
      "Moves the active branch pointer and HEAD to the specified target commit",
      "Formats the hard drive",
      "Deletes unstaged files",
      "Pushes to origin"
    ],
    "answer": "Moves the active branch pointer and HEAD to the specified target commit",
    "explanation": "Phase 1 is the universal pointer adjustment step across all reset modes.",
    "hint": "Pointer movement is universal to all reset modes.",
    "level": "intermediate",
    "codeExample": "# Phase 1: Update refs/heads/<current_branch> to <target_sha>"
  },
  {
    "id": "undo-t5-q8",
    "question": "If you run `git reset --soft HEAD~1`, where will the changes from the undone commit be located?",
    "shortAnswer": "In the Staging Area (Index), ready to be re-committed with `git commit`.",
    "options": [
      "In the Staging Area (Index), staged and ready to commit",
      "In the trash bin of the OS",
      "Discarded completely",
      "Only in the remote repository"
    ],
    "answer": "In the Staging Area (Index), staged and ready to commit",
    "explanation": "`--soft` stops after moving HEAD. Because the Index and Working Tree were not touched, the changes remain staged.",
    "hint": "Soft keeps changes staged in the Index.",
    "level": "basic",
    "codeExample": "git reset --soft HEAD~1\ngit status # Changes are green (staged)"
  },
  {
    "id": "undo-t5-q9",
    "question": "If you run `git reset --mixed HEAD~1`, where will the changes from the undone commit be located?",
    "shortAnswer": "In the Working Tree as unstaged modifications.",
    "options": [
      "In the Working Tree as unstaged modifications",
      "In the Staging Area as staged modifications",
      "In a newly created stash",
      "Permanently deleted"
    ],
    "answer": "In the Working Tree as unstaged modifications",
    "explanation": "`--mixed` updates the Index to match the target commit, so the changes in your working tree appear as unstaged (red in `git status`).",
    "hint": "Mixed unstages changes but preserves your physical files.",
    "level": "basic",
    "codeExample": "git reset --mixed HEAD~1\ngit status # Changes are red (unstaged)"
  },
  {
    "id": "undo-t5-q10",
    "question": "How can you undo a `git reset` if you performed it by mistake?",
    "shortAnswer": "Find the previous commit SHA using `git reflog` and reset back to it (`git reset --hard HEAD@{1}`).",
    "options": [
      "Find the previous SHA using `git reflog` and run `git reset --hard <previous-sha>`",
      "Press Ctrl+Z in the terminal",
      "Restart the operating system",
      "It is impossible to undo a reset"
    ],
    "answer": "Find the previous SHA using `git reflog` and run `git reset --hard <previous-sha>`",
    "explanation": "The `git reflog` records previous positions of HEAD, allowing instant rewinding of any reset operation.",
    "hint": "Reflog + Reset allows rewinding your undos.",
    "level": "intermediate",
    "codeExample": "git reflog\ngit reset --hard HEAD@{1}"
  },
  {
    "id": "undo-t5-q11",
    "question": "What is the difference between `HEAD^` and `HEAD~1` in Git?",
    "shortAnswer": "For linear commits, they are identical; `HEAD^` selects the first parent, while `HEAD~1` steps back 1 generation.",
    "options": [
      "On linear history they refer to the exact same parent commit; `HEAD^2` selects the second parent of a merge commit, while `HEAD~2` steps back 2 generations",
      "`HEAD^` is for Linux; `HEAD~1` is for Windows",
      "`HEAD^` deletes files; `HEAD~1` creates branches",
      "`HEAD^` is deprecated in Git 2.0"
    ],
    "answer": "On linear history they refer to the exact same parent commit; `HEAD^2` selects the second parent of a merge commit, while `HEAD~2` steps back 2 generations",
    "explanation": "Caret (`^`) selects parent numbers in merge commits; Tilde (`~`) traverses ancestral generations linearly.",
    "hint": "Caret is for parent selection; Tilde is for ancestral depth.",
    "level": "intermediate",
    "codeExample": "# HEAD~2 = grandparent commit\n# HEAD^2 = 2nd parent of a merge commit"
  },
  {
    "id": "undo-t5-q12",
    "question": "Can `git reset` be used on a specific file path (e.g., `git reset HEAD file.txt`) without moving branch pointers?",
    "shortAnswer": "Yes, path-specific reset copies the file snapshot from HEAD to the Index (unstaging it) without changing branch HEAD.",
    "options": [
      "Yes, providing a pathspec unstages the file without moving the HEAD branch pointer",
      "No, `git reset` always moves branch pointers regardless of arguments",
      "Only if the file is a `.js` file",
      "Only on repositories with more than 100 commits"
    ],
    "answer": "Yes, providing a pathspec unstages the file without moving the HEAD branch pointer",
    "explanation": "When a path is given, `git reset` modifies only the staging index for that specific file and leaves HEAD untouched.",
    "hint": "Pathspec reset acts on the index.",
    "level": "intermediate",
    "codeExample": "git reset HEAD app.js # Unstages app.js without moving HEAD"
  },
  {
    "id": "undo-t5-q13",
    "question": "In the classroom at Barrackpore, Debangshu committed 3 times locally and wants to combine them into 1 clean commit. How can he use `git reset --soft`?",
    "shortAnswer": "Run `git reset --soft HEAD~3` to bring all changes back into the staging area, then commit once with a comprehensive message.",
    "options": [
      "Run `git reset --soft HEAD~3` and then run `git commit -m \"feat: squashed feature\"`",
      "Run `git reset --hard HEAD~3`",
      "Delete the repository and start over",
      "Run `git push --force`"
    ],
    "answer": "Run `git reset --soft HEAD~3` and then run `git commit -m \"feat: squashed feature\"`",
    "explanation": "Soft reset rewinds 3 commits while keeping all combined file changes staged in the Index, ready for a single consolidated commit.",
    "hint": "Soft reset rewinds HEAD while preserving all staged modifications.",
    "level": "intermediate",
    "codeExample": "git reset --soft HEAD~3\ngit commit -m \"feat(billing): full invoicing module with tests\""
  },
  {
    "id": "undo-t5-q14",
    "question": "What is the file path inside `.git/` that stores the current branch reference that `git reset` modifies?",
    "shortAnswer": "`.git/refs/heads/<branch-name>` (e.g., `.git/refs/heads/main`).",
    "options": [
      "`.git/refs/heads/<branch-name>`",
      "`.git/config`",
      "`.git/objects/reset.dat`",
      "`.git/info/exclude`"
    ],
    "answer": "`.git/refs/heads/<branch-name>`",
    "explanation": "Branch references are 41-byte text files in `.git/refs/heads/`. Reset updates the SHA-1 hash stored inside this file.",
    "hint": "Branch pointers live in refs/heads/.",
    "level": "advanced",
    "codeExample": "cat .git/refs/heads/main # prints 40-character SHA"
  },
  {
    "id": "undo-t5-q15",
    "question": "Why is `git reset --hard` considered a potentially dangerous command?",
    "shortAnswer": "Because it overwrites unstaged working tree edits that have never been committed, making them permanently unrecoverable.",
    "options": [
      "Because any uncommitted modifications in the working directory are permanently erased and cannot be recovered via reflog",
      "Because it resets your computer's BIOS",
      "Because it disables git globally",
      "Because it deletes all remote repositories"
    ],
    "answer": "Because any uncommitted modifications in the working directory are permanently erased and cannot be recovered via reflog",
    "explanation": "Git can only recover data that has been saved into its object database (committed or staged). Unsaved working file edits are wiped.",
    "hint": "Uncommitted working tree changes are not saved in the database.",
    "level": "basic",
    "codeExample": "# DANGER: Uncommitted edits in working tree are lost:\ngit reset --hard HEAD~1"
  },
  {
    "id": "undo-t5-q16",
    "question": "What command should you always run before executing a reset to ensure no uncommitted work is accidentally destroyed?",
    "shortAnswer": "`git status`",
    "options": [
      "`git status`",
      "`git push`",
      "`git clone`",
      "`git tag`"
    ],
    "answer": "`git status`",
    "explanation": "Checking `git status` verifies whether your working tree is clean or has uncommitted modifications that could be destroyed.",
    "hint": "Always check status first.",
    "level": "basic",
    "codeExample": "git status # Clean tree = safe to proceed"
  },
  {
    "id": "undo-t5-q17",
    "question": "If HEAD points to commit C3, what is the target commit of `git reset HEAD~2`?",
    "shortAnswer": "Commit C1 (two commits prior to C3).",
    "options": [
      "Commit C1",
      "Commit C2",
      "Commit C0",
      "Commit C3"
    ],
    "answer": "Commit C1",
    "explanation": "Stepping back 2 commits from C3 lands on C1 (C3 -> C2 -> C1).",
    "hint": "Count back 2 commits: 3 - 2 = 1.",
    "level": "basic",
    "codeExample": "git reset HEAD~2 # Moves HEAD to C1"
  },
  {
    "id": "undo-t5-q18",
    "question": "Does `git reset` modify the commit date or author of historical commits that it points to?",
    "shortAnswer": "No. The historical commits remain completely unchanged; only the branch reference pointer is moved.",
    "options": [
      "No, historical commits are immutable; only the branch pointer is adjusted",
      "Yes, all historical commits have their author changed to current user",
      "Yes, timestamps are reset to current time",
      "Only if `--force` is used"
    ],
    "answer": "No, historical commits are immutable; only the branch pointer is adjusted",
    "explanation": "Reset simply points the branch ref to an existing commit object; it does not touch the existing objects in the database.",
    "hint": "Existing commit objects in the DAG are untouched.",
    "level": "intermediate",
    "codeExample": "# Commit objects remain unchanged"
  },
  {
    "id": "undo-t5-q19",
    "question": "What command can be used to reset HEAD to match the exact state of `origin/main` after fetching?",
    "shortAnswer": "`git reset --hard origin/main`",
    "options": [
      "`git reset --hard origin/main`",
      "`git pull --reset`",
      "`git checkout origin/main --force`",
      "`git sync --force`"
    ],
    "answer": "`git reset --hard origin/main`",
    "explanation": "This aligns the local branch HEAD, Index, and Working Directory to match the remote-tracking branch snapshot.",
    "hint": "Reset to the remote tracking branch ref.",
    "level": "intermediate",
    "codeExample": "git fetch origin\ngit reset --hard origin/main"
  },
  {
    "id": "undo-t5-q20",
    "question": "Can you reset HEAD forward in history after rewinding it backwards?",
    "shortAnswer": "Yes, by passing the forward commit hash (obtained from `git reflog`) to `git reset`.",
    "options": [
      "Yes, find the future commit SHA in `git reflog` and reset to it: `git reset --hard <future-sha>`",
      "No, reset only moves backward in time",
      "Only if you have an active internet connection",
      "Only on GitHub Enterprise"
    ],
    "answer": "Yes, find the future commit SHA in `git reflog` and reset to it: `git reset --hard <future-sha>`",
    "explanation": "Git reset can point to ANY valid commit object in the database, whether older or newer than current HEAD.",
    "hint": "Reset accepts any valid commit SHA in either chronological direction.",
    "level": "intermediate",
    "codeExample": "git reset --hard 8f2a10 # Fast-forwards HEAD to 8f2a10"
  },
  {
    "id": "undo-t5-q21",
    "question": "What happens if you run `git reset` with no arguments at all (i.e. just `git reset`)?",
    "shortAnswer": "It defaults to `git reset --mixed HEAD`, which unstages all currently staged files without moving the HEAD pointer.",
    "options": [
      "It unstages all staged files by copying the HEAD snapshot to the Index, leaving the working tree and HEAD intact",
      "It deletes the entire repository",
      "It resets the terminal screen",
      "It prints a help manual"
    ],
    "answer": "It unstages all staged files by copying the HEAD snapshot to the Index, leaving the working tree and HEAD intact",
    "explanation": "`git reset` defaults to target commit `HEAD` and mode `--mixed`, effectively clearing the staging index.",
    "hint": "Target defaults to HEAD, mode defaults to mixed.",
    "level": "intermediate",
    "codeExample": "git reset # Unstages everything in staging area"
  },
  {
    "id": "undo-t5-q22",
    "question": "Why is `git reset --soft` often used during interactive code refactoring?",
    "shortAnswer": "Because it unwraps a series of preliminary commits into the staging area, allowing the developer to re-organize and re-commit cleanly.",
    "options": [
      "It unwraps commit changes directly into the staging area without losing any code or unstaging files",
      "Because it runs 10x faster than other commands",
      "Because it encrypts your source code",
      "It generates automated unit tests"
    ],
    "answer": "It unwraps commit changes directly into the staging area without losing any code or unstaging files",
    "explanation": "Soft reset is ideal for collapsing experimental commits into a clean, structured atomic commit before sharing.",
    "hint": "Soft reset keeps all file modifications in the staging index.",
    "level": "intermediate",
    "codeExample": "git reset --soft HEAD~2"
  },
  {
    "id": "undo-t5-q23",
    "question": "What is the key difference in philosophy between `git reset` and `git revert`?",
    "shortAnswer": "`reset` rewinds branch pointers (rewriting history); `revert` appends a new inverse commit (preserving history).",
    "options": [
      "`reset` rewinds history by moving branch pointers; `revert` creates a new forward commit that inverses changes",
      "`reset` is for Git; `revert` is for SVN",
      "`reset` only works on branches with 1 commit",
      "`revert` deletes the commit from disk"
    ],
    "answer": "`reset` rewinds history by moving branch pointers; `revert` creates a new forward commit that inverses changes",
    "explanation": "Reset moves backward; Revert moves forward by appending an inverse snapshot. Revert is public-safe; Reset is private-safe.",
    "hint": "Reset rewinds pointers; Revert creates inverse commits.",
    "level": "basic",
    "codeExample": "# Private: git reset HEAD~1\n# Public:  git revert <sha>"
  },
  {
    "id": "undo-t5-q24",
    "question": "Suppose Mahima has staged files in the index and unstaged edits in her working tree. What will `git reset --mixed HEAD` do?",
    "shortAnswer": "It will unstage the staged files, merging them with the unstaged working tree edits without losing any work.",
    "options": [
      "It will unstage the staged files into the working tree, leaving all working directory edits intact",
      "It will discard all unstaged edits",
      "It will commit the staged files",
      "It will create a conflict marker"
    ],
    "answer": "It will unstage the staged files into the working tree, leaving all working directory edits intact",
    "explanation": "Mixed reset only updates the Index to match HEAD. The Working Directory remains untouched.",
    "hint": "Mixed mode never deletes working directory edits.",
    "level": "intermediate",
    "codeExample": "git reset --mixed HEAD"
  },
  {
    "id": "undo-t5-q25",
    "question": "In summary, what are the three distinct operations of `git reset` mapped to its three modes?",
    "shortAnswer": "--soft: Phase 1 (Move HEAD); --mixed: Phase 1 + Phase 2 (Update Index); --hard: Phase 1 + Phase 2 + Phase 3 (Overwrite Working Tree).",
    "options": [
      "--soft: Move HEAD; --mixed: Move HEAD + Sync Index; --hard: Move HEAD + Sync Index + Overwrite Working Tree",
      "--soft: Delete files; --mixed: Save files; --hard: Compress files",
      "--soft: Commit; --mixed: Push; --hard: Pull",
      "--soft: Windows; --mixed: macOS; --hard: Linux"
    ],
    "answer": "--soft: Move HEAD; --mixed: Move HEAD + Sync Index; --hard: Move HEAD + Sync Index + Overwrite Working Tree",
    "explanation": "Understanding this cumulative three-phase model makes mastering `git reset` straightforward and predictable.",
    "hint": "Phase 1 = soft, Phase 1+2 = mixed, Phase 1+2+3 = hard.",
    "level": "basic",
    "codeExample": "# --soft:  HEAD\n# --mixed: HEAD + Index\n# --hard:  HEAD + Index + Working Tree"
  }
];

export default questions;
