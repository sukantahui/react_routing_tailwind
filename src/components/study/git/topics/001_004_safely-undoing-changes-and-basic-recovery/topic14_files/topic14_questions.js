/**
 * Topic 14 FAQ Assessment Questions:
 * "Self-Assessment Quiz & Short Questions for Module 001_004"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-m4-q1",
    "question": "Which command is specifically designed to discard unstaged modifications in a tracked file in modern Git (2.23+)?",
    "shortAnswer": "`git restore <file>`",
    "options": [
      "`git restore <file>`",
      "`git reset <file>`",
      "`git clean <file>`",
      "`git revert <file>`"
    ],
    "answer": "`git restore <file>`",
    "explanation": "`git restore` replaces the overloaded `git checkout -- <file>` syntax for discarding working tree edits.",
    "hint": "Modern command for discarding unstaged file modifications.",
    "level": "basic",
    "codeExample": "git restore src/app.js"
  },
  {
    "id": "undo-m4-q2",
    "question": "How do you unstage a staged file from the Index without altering your edits in the working directory?",
    "shortAnswer": "`git restore --staged <file>`",
    "options": [
      "`git restore --staged <file>`",
      "`git clean -f <file>`",
      "`git reset --hard <file>`",
      "`git checkout --delete <file>`"
    ],
    "answer": "`git restore --staged <file>`",
    "explanation": "Passing `--staged` targets Tree 2 (Index) while leaving Tree 3 (Working Tree) intact.",
    "hint": "--staged unstages without losing edits.",
    "level": "basic",
    "codeExample": "git restore --staged config.json"
  },
  {
    "id": "undo-m4-q3",
    "question": "What is the primary risk of running `git commit --amend` on a commit that has already been pushed to `origin/main`?",
    "shortAnswer": "It changes the commit's SHA hash, causing diverged histories with the remote and requiring a destructive force push that breaks teammates' checkouts.",
    "options": [
      "It generates a new SHA-1 hash, resulting in non-fast-forward push rejections and divergent history for teammates",
      "It deletes all files in the repository root",
      "It uninstalls Git from your operating system",
      "It changes the repository license to MIT"
    ],
    "answer": "It generates a new SHA-1 hash, resulting in non-fast-forward push rejections and divergent history for teammates",
    "explanation": "Commit objects are immutable. Amending replaces the commit with a sibling commit of different SHA.",
    "hint": "Amending pushed commits causes remote divergence.",
    "level": "intermediate",
    "codeExample": "# Pushed commits should never be amended"
  },
  {
    "id": "undo-m4-q4",
    "question": "Which `git reset` mode rewinds the HEAD pointer and syncs the Staging Index, but leaves your physical working files intact as unstaged edits?",
    "shortAnswer": "`--mixed` (the default mode).",
    "options": [
      "`--mixed`",
      "`--soft`",
      "`--hard`",
      "`--keep`"
    ],
    "answer": "`--mixed`",
    "explanation": "`--mixed` is the default reset mode, updating HEAD and Index while preserving working files.",
    "hint": "Mixed mode unstages changes but preserves files.",
    "level": "basic",
    "codeExample": "git reset HEAD~1 # defaults to --mixed"
  },
  {
    "id": "undo-m4-q5",
    "question": "Which `git reset` mode leaves changes staged in the Index (green in `git status`) after rewinding HEAD?",
    "shortAnswer": "`--soft`",
    "options": [
      "`--soft`",
      "`--mixed`",
      "`--hard`",
      "`--force`"
    ],
    "answer": "`--soft`",
    "explanation": "`--soft` only moves the HEAD ref, leaving the Index and Working Tree untouched.",
    "hint": "Soft mode preserves staged changes.",
    "level": "basic",
    "codeExample": "git reset --soft HEAD~1"
  },
  {
    "id": "undo-m4-q6",
    "question": "If you accidentally ran `git reset --hard HEAD~3`, where can you find the commit SHA to restore your 3 commits?",
    "shortAnswer": "`git reflog`",
    "options": [
      "`git reflog`",
      "Windows Recycle Bin",
      "GitHub Issues",
      "`.gitignore`"
    ],
    "answer": "`git reflog`",
    "explanation": "`git reflog` tracks every pointer transition of HEAD, allowing instantaneous recovery.",
    "hint": "The flight data recorder of Git.",
    "level": "basic",
    "codeExample": "git reflog"
  },
  {
    "id": "undo-m4-q7",
    "question": "What type of changes CANNOT be recovered using `git reflog` after running `git reset --hard`?",
    "shortAnswer": "Uncommitted and unstaged working tree modifications.",
    "options": [
      "Uncommitted and unstaged file modifications that were never committed or staged",
      "Commits created 2 weeks ago",
      "Commits made by teammates",
      "Git tags"
    ],
    "answer": "Uncommitted and unstaged file modifications that were never committed or staged",
    "explanation": "Git only tracks data in its database. Uncommitted edits sitting only in working memory are lost.",
    "hint": "Git cannot restore what was never committed or staged.",
    "level": "basic",
    "codeExample": "# Uncommitted working tree edits are lost forever"
  },
  {
    "id": "undo-m4-q8",
    "question": "Why is `git revert` the required tool for undoing changes on shared, public branches?",
    "shortAnswer": "Because it creates a new forward commit that inverts changes without rewriting or deleting historical commit SHAs.",
    "options": [
      "Because it appends a new inverse commit forward in time, preserving linear history and avoiding merge conflicts for teammates",
      "Because it runs without requiring a terminal",
      "Because it requires zero disk space",
      "Because it bypasses continuous integration"
    ],
    "answer": "Because it appends a new inverse commit forward in time, preserving linear history and avoiding merge conflicts for teammates",
    "explanation": "Teammates pull a revert commit seamlessly without rejected non-fast-forward errors.",
    "hint": "Revert moves history forward safely.",
    "level": "basic",
    "codeExample": "git revert <commit-sha>"
  },
  {
    "id": "undo-m4-q9",
    "question": "When reverting a merge commit, why must you pass the `-m 1` option?",
    "shortAnswer": "Because merge commits have multiple parents, and `-m 1` tells Git to treat Parent 1 (the mainline branch receiving the merge) as the baseline.",
    "options": [
      "Because merge commits have multiple parents; `-m 1` specifies Parent 1 (mainline) as the baseline to preserve",
      "Because it limits the revert to 1 minute",
      "Because it only reverts 1 file",
      "Because `-m 1` is an admin password"
    ],
    "answer": "Because merge commits have multiple parents; `-m 1` specifies Parent 1 (mainline) as the baseline to preserve",
    "explanation": "Git needs to know which parent branch to measure the inverse diff against.",
    "hint": "-m 1 designates the receiving mainline branch.",
    "level": "intermediate",
    "codeExample": "git revert -m 1 <merge-sha>"
  },
  {
    "id": "undo-t14-q10",
    "question": "What is the 're-reverting' technique?",
    "shortAnswer": "Running `git revert` on a previous revert commit to re-apply the original feature code after bugs have been addressed.",
    "options": [
      "Reverting a revert commit to re-introduce the original feature code back into history",
      "Reverting 2 commits at once",
      "Resetting all branches to initial commit",
      "Re-installing Git"
    ],
    "answer": "Reverting a revert commit to re-introduce the original feature code back into history",
    "explanation": "Reverting an inverse patch regenerates the original positive patch forward in time.",
    "hint": "Revert the revert commit to restore code.",
    "level": "intermediate",
    "codeExample": "git revert <revert-commit-sha>"
  },
  {
    "id": "undo-m4-q11",
    "question": "Which `git clean` command previews untracked files and directories without deleting anything?",
    "shortAnswer": "`git clean -nd`",
    "options": [
      "`git clean -nd`",
      "`git clean -fd`",
      "`git clean -x`",
      "`git clean -a`"
    ],
    "answer": "`git clean -nd`",
    "explanation": "`-n` is the dry-run flag, and `-d` includes untracked directories.",
    "hint": "-nd = dry run with directories.",
    "level": "basic",
    "codeExample": "git clean -nd"
  },
  {
    "id": "undo-m4-q12",
    "question": "What flag is required in `git clean` to purge files and directories matched by `.gitignore` (e.g. `node_modules/`, `dist/`)?",
    "shortAnswer": "`-x` (or `-X` for ONLY ignored files).",
    "options": [
      "`-x`",
      "`-i`",
      "`-f`",
      "`-d`"
    ],
    "answer": "`-x`",
    "explanation": "`-x` overrides `.gitignore` protection to delete ignored files.",
    "hint": "-x cleans ignored files.",
    "level": "basic",
    "codeExample": "git clean -fdx"
  },
  {
    "id": "undo-m4-q13",
    "question": "How do you launch the interactive clean menu in Git?",
    "shortAnswer": "`git clean -i` (or `git clean -id`).",
    "options": [
      "`git clean -i`",
      "`git clean --menu`",
      "`git clean --wizard`",
      "`git clean -prompt`"
    ],
    "answer": "`git clean -i`",
    "explanation": "`-i` opens the 6-option interactive cleaning interface.",
    "hint": "-i stands for interactive.",
    "level": "basic",
    "codeExample": "git clean -id"
  },
  {
    "id": "undo-m4-q14",
    "question": "In the Three-Tree Architecture, what are the three trees?",
    "shortAnswer": "HEAD (Commit snapshot), Index (Staging area), and Working Tree (Working directory files).",
    "options": [
      "HEAD, Index (Staging Area), and Working Tree",
      "Client, Server, and Database",
      "Master, Main, and Develop",
      "Git, GitHub, and GitLab"
    ],
    "answer": "HEAD, Index (Staging Area), and Working Tree",
    "explanation": "The Three-Tree model forms the foundation of all Git operations.",
    "hint": "HEAD, Index, Working Tree.",
    "level": "basic",
    "codeExample": "# Tree 1: HEAD | Tree 2: Index | Tree 3: Working Tree"
  },
  {
    "id": "undo-m4-q15",
    "question": "What does `git restore --staged --worktree <file>` do?",
    "shortAnswer": "It unstages the file and discards its working directory modifications simultaneously, restoring it completely to HEAD.",
    "options": [
      "It simultaneously unstages the file and discards its working tree changes, resetting it to match HEAD",
      "It commits the file",
      "It deletes the file from Git history",
      "It pushes the file to origin"
    ],
    "answer": "It simultaneously unstages the file and discards its working tree changes, resetting it to match HEAD",
    "explanation": "Combines Index clearing and Working Tree rollback in a single operation.",
    "hint": "Resets both Index and Working Tree to HEAD.",
    "level": "intermediate",
    "codeExample": "git restore --staged --worktree app.js"
  },
  {
    "id": "undo-m4-q16",
    "question": "What is the safer alternative to `git push --force` when updating an isolated feature branch after amending?",
    "shortAnswer": "`git push --force-with-lease`",
    "options": [
      "`git push --force-with-lease`",
      "`git push --safe`",
      "`git push --try-harder`",
      "`git push --protect`"
    ],
    "answer": "`git push --force-with-lease`",
    "explanation": "`--force-with-lease` checks if remote ref has changed before overwriting, preventing data loss on shared PRs.",
    "hint": "Look for lease keyword.",
    "level": "intermediate",
    "codeExample": "git push --force-with-lease origin feat-tax"
  },
  {
    "id": "undo-m4-q17",
    "question": "How long does `git reflog` protect unreachable commits by default before garbage collection?",
    "shortAnswer": "30 days for unreachable objects (90 days for reachable ones).",
    "options": [
      "30 days for unreachable objects and 90 days for reachable references",
      "10 minutes",
      "24 hours",
      "Forever"
    ],
    "answer": "30 days for unreachable objects and 90 days for reachable references",
    "explanation": "Git's garbage collection grace period provides a generous recovery window.",
    "hint": "30 days / 90 days default.",
    "level": "intermediate",
    "codeExample": "# gc.reflogExpireUnreachable = 30 days"
  },
  {
    "id": "undo-m4-q18",
    "question": "Which command allows you to view the commit history for a specific file across all past commits?",
    "shortAnswer": "`git log -p <file-path>`",
    "options": [
      "`git log -p <file-path>`",
      "`git status <file-path>`",
      "`git clean <file-path>`",
      "`git show-file <file-path>`"
    ],
    "answer": "`git log -p <file-path>`",
    "explanation": "`-p` generates the inline patch diff for each historical commit modifying that file.",
    "hint": "git log -p shows file patch history.",
    "level": "basic",
    "codeExample": "git log -p src/server.js"
  },
  {
    "id": "undo-m4-q19",
    "question": "What is the difference between `git clean -fd` and `git clean -fdx`?",
    "shortAnswer": "`-fd` protects files listed in `.gitignore`; `-fdx` removes both untracked and ignored files.",
    "options": [
      "`-fd` respects `.gitignore`; `-fdx` deletes ignored files too (like `node_modules/` and `.env`)",
      "`-fd` deletes commits; `-fdx` deletes branches",
      "`-fd` is for Linux; `-fdx` is for Windows",
      "There is no difference"
    ],
    "answer": "`-fd` respects `.gitignore`; `-fdx` deletes ignored files too (like `node_modules/` and `.env`)",
    "explanation": "`-x` strips all `.gitignore` immunity during cleanup.",
    "hint": "-x removes ignored files as well.",
    "level": "basic",
    "codeExample": "git clean -fd # respects .gitignore\ngit clean -fdx # wipes .gitignore matches too"
  },
  {
    "id": "undo-m4-q20",
    "question": "If you need to protect a specific untracked file like `.env` while running `git clean -fdx`, which option should you pass?",
    "shortAnswer": "`-e .env` (or `--exclude=.env`).",
    "options": [
      "`-e .env`",
      "`--protect .env`",
      "`--keep .env`",
      "`-p .env`"
    ],
    "answer": "`-e .env`",
    "explanation": "`-e` specifies custom pattern exclusions on the fly.",
    "hint": "-e stands for exclude.",
    "level": "intermediate",
    "codeExample": "git clean -fdx -e \".env*\""
  },
  {
    "id": "undo-m4-q21",
    "question": "In the classroom at Barrackpore, Sachin wants to squash 3 recent local commits into 1 single commit. Which command should he use?",
    "shortAnswer": "`git reset --soft HEAD~3` followed by `git commit -m \"feat: combined feature\"`.",
    "options": [
      "`git reset --soft HEAD~3` followed by `git commit`",
      "`git reset --hard HEAD~3`",
      "`git clean -fd`",
      "`git revert HEAD~3`"
    ],
    "answer": "`git reset --soft HEAD~3` followed by `git commit`",
    "explanation": "Soft reset keeps all modified files staged in the Index, ready for one clean commit.",
    "hint": "Soft reset squashes commits while keeping changes staged.",
    "level": "intermediate",
    "codeExample": "git reset --soft HEAD~3\ngit commit -m \"feat: squashed feature\""
  },
  {
    "id": "undo-m4-q22",
    "question": "What is the command to create a new branch from a commit SHA found in `git reflog` without moving your active branch pointer?",
    "shortAnswer": "`git branch rescue-branch <commit-sha>`",
    "options": [
      "`git branch rescue-branch <commit-sha>`",
      "`git checkout rescue-branch --new`",
      "`git restore --branch rescue-branch`",
      "`git reset rescue-branch <sha>`"
    ],
    "answer": "`git branch rescue-branch <commit-sha>`",
    "explanation": "`git branch <name> <start-point>` creates a new named ref pointing directly to that commit.",
    "hint": "git branch <name> <sha> attaches a branch ref to any commit.",
    "level": "basic",
    "codeExample": "git branch rescue-branch 8f2a10c"
  },
  {
    "id": "undo-m4-q23",
    "question": "True or False: `git restore` can modify commit history.",
    "shortAnswer": "False. `git restore` only modifies the Working Tree and/or Staging Index, never commit history.",
    "options": [
      "False; `git restore` operates only on working files and index, never commit objects",
      "True; it rewrites commits",
      "True; it creates merge commits",
      "False; but it deletes git tags"
    ],
    "answer": "False; `git restore` operates only on working files and index, never commit objects",
    "explanation": "Restore is strictly a file-level restoration utility.",
    "hint": "Restore does not touch commit history.",
    "level": "basic",
    "codeExample": "# Commit history is 100% untouched by git restore"
  },
  {
    "id": "undo-m4-q24",
    "question": "What command restores a file to the exact version from 3 commits ago in your working tree without moving HEAD?",
    "shortAnswer": "`git restore --source=HEAD~3 <file>`",
    "options": [
      "`git restore --source=HEAD~3 <file>`",
      "`git reset HEAD~3 <file>`",
      "`git clean HEAD~3 <file>`",
      "`git revert HEAD~3 <file>`"
    ],
    "answer": "`git restore --source=HEAD~3 <file>`",
    "explanation": "The `--source` flag pulls historical file snapshots without changing branch references.",
    "hint": "--source specifies historical commit source.",
    "level": "intermediate",
    "codeExample": "git restore --source=HEAD~3 app.js"
  },
  {
    "id": "undo-m4-q25",
    "question": "What is the ultimate golden rule for Git disaster recovery?",
    "shortAnswer": "If it was committed, it is safe in Git's object store and recoverable via `git reflog`. Always inspect with `git status` and never run blind destructive commands.",
    "options": [
      "Committed code is never lost; stay calm, inspect with `git status`/`diff`, and use `git reflog` for rescue",
      "Always format your hard drive when Git errors occur",
      "Never make commits",
      "Only use Git in the cloud"
    ],
    "answer": "Committed code is never lost; stay calm, inspect with `git status`/`diff`, and use `git reflog` for rescue",
    "explanation": "This principle underpins all professional defensive version control workflows.",
    "hint": "Committed code is safe in Git's database.",
    "level": "basic",
    "codeExample": "# Commit early, commit often, and trust the Three Trees!"
  }
];

export default questions;
