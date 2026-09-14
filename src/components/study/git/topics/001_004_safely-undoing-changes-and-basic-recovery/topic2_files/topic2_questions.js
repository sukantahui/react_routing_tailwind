/**
 * Topic 2 FAQ Assessment Questions:
 * "Unstaging Staged Changes: Modern git restore --staged vs legacy git reset HEAD"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t2-q1",
    "question": "What is the primary purpose of running `git restore --staged <file>`?",
    "shortAnswer": "It removes the specified file from the Staging Area (Index) and replaces it with the version from HEAD, keeping your working directory changes intact.",
    "options": [
      "It un-stages the file from the Index while preserving your modifications in the working directory",
      "It deletes the file completely from disk and Git history",
      "It immediately commits the file to HEAD",
      "It creates a new branch with the staged file"
    ],
    "answer": "It un-stages the file from the Index while preserving your modifications in the working directory",
    "explanation": "`git restore --staged` targets the Staging Area (Index). It copies the file's object from HEAD into the Index, effectively canceling the prior `git add` without altering disk files.",
    "hint": "Notice that it operates on the staging index, not working tree disk files.",
    "level": "basic",
    "codeExample": "git restore --staged src/config.json"
  },
  {
    "id": "undo-t2-q2",
    "question": "What was the legacy command used to unstage a file before Git 2.23?",
    "shortAnswer": "`git reset HEAD <file>`",
    "options": [
      "`git reset HEAD <file>`",
      "`git unstage <file>`",
      "`git cancel --staged <file>`",
      "`git checkout --staged <file>`"
    ],
    "answer": "`git reset HEAD <file>`",
    "explanation": "Historically, developers used `git reset HEAD <file>` to unstage. Beginners often feared running `git reset` because reset also has destructive modes like `--hard`.",
    "hint": "Legacy command used reset with HEAD.",
    "level": "basic",
    "codeExample": "# Legacy syntax:\ngit reset HEAD config.js\n# Modern syntax:\ngit restore --staged config.js"
  },
  {
    "id": "undo-t2-q3",
    "question": "What short flag is equivalent to `git restore --staged`?",
    "shortAnswer": "`-S` (e.g. `git restore -S <file>`).",
    "options": [
      "`-S`",
      "`-s`",
      "`-u`",
      "`-i`"
    ],
    "answer": "`-S`",
    "explanation": "In Git CLI syntax, `-S` is the short flag for `--staged`, and `-W` is the short flag for `--worktree`.",
    "hint": "Capital S for Staged.",
    "level": "intermediate",
    "codeExample": "git restore -S src/index.js"
  },
  {
    "id": "undo-t2-q4",
    "question": "If a developer accidentally runs `git add .` and stages a `.env.local` file containing secrets, what is the fastest safe fix?",
    "shortAnswer": "Run `git restore --staged .env.local` to unstage it, then immediately add `.env.local` to `.gitignore`.",
    "options": [
      "Run `git restore --staged .env.local` and add it to `.gitignore`",
      "Run `git reset --hard` to delete everything",
      "Commit it and delete it in the next commit",
      "Turn off the computer"
    ],
    "answer": "Run `git restore --staged .env.local` and add it to `.gitignore`",
    "explanation": "`git restore --staged` prevents the secret from being committed to the DAG. Adding it to `.gitignore` ensures subsequent `git add .` commands ignore it.",
    "hint": "Unstage first, ignore second.",
    "level": "basic",
    "codeExample": "git restore --staged .env.local\necho '.env.local' >> .gitignore"
  },
  {
    "id": "undo-t2-q5",
    "question": "How do you unstage ALL currently staged files across the repository in a single command?",
    "shortAnswer": "`git restore --staged .` (or `git restore --staged :/*`).",
    "options": [
      "`git restore --staged .`",
      "`git restore --all-staged`",
      "`git clean -f`",
      "`git drop-index`"
    ],
    "answer": "`git restore --staged .`",
    "explanation": "`git restore --staged .` unstages all files in the current folder and subdirectories, returning their status from green (`A ` / `M `) to red (`??` / ` M`).",
    "hint": "The dot un-stages everything in the current working context.",
    "level": "basic",
    "codeExample": "git restore --staged ."
  },
  {
    "id": "undo-t2-q6",
    "question": "What does `git status -s` display after you unstage a modified file using `git restore --staged <file>`?",
    "shortAnswer": "The file's status indicator changes from a green `M ` in the first column to a red ` M` in the second column.",
    "options": [
      "The status changes from green `M ` (staged) to red ` M` (unstaged modified in working tree)",
      "The file disappears from `git status` output completely",
      "The status changes to `??`",
      "The status changes to `D `"
    ],
    "answer": "The status changes from green `M ` (staged) to red ` M` (unstaged modified in working tree)",
    "explanation": "First column is Index (green when staged). Second column is Working Tree (red when modified on disk).",
    "hint": "Col 1 is Index; Col 2 is Working Tree.",
    "level": "intermediate",
    "codeExample": "# Before: M  app.js (green staged)\n# After:   M app.js (red unstaged)"
  },
  {
    "id": "undo-t2-q7",
    "question": "What happens if you unstage a newly created, never-before-committed file using `git restore --staged <file>`?",
    "shortAnswer": "The file reverts from a green staged new file (`A  <file>`) to an untracked file (`?? <file>`) in the working directory.",
    "options": [
      "It becomes an untracked file (`?? <file>`) with code intact on disk",
      "It is deleted from the hard drive",
      "Git crashes because HEAD has no previous version",
      "It moves to the root directory"
    ],
    "answer": "It becomes an untracked file (`?? <file>`) with code intact on disk",
    "explanation": "Because HEAD never had a previous commit for this file, unstaging it removes it from the Index entirely, leaving it as an untracked file in the working directory.",
    "hint": "New files become untracked when unstaged.",
    "level": "intermediate",
    "codeExample": "touch newFeature.js\ngit add newFeature.js  # Status: A  newFeature.js\ngit restore --staged newFeature.js  # Status: ?? newFeature.js"
  },
  {
    "id": "undo-t2-q8",
    "question": "Can you unstage specific chunks of a file rather than the entire file?",
    "shortAnswer": "Yes, by running `git restore --staged -p <file>` (interactive patch mode).",
    "options": [
      "Yes, using `git restore --staged -p <file>`",
      "No, unstaging is strictly all-or-nothing per file",
      "Only if you edit `.git/index` in Notepad",
      "Only with external GUI plugins"
    ],
    "answer": "Yes, using `git restore --staged -p <file>`",
    "explanation": "`git restore --staged -p` prompts for each staged hunk (`y`, `n`, `q`, `s`, `e`), allowing you to unstage some lines while leaving other lines staged.",
    "hint": "Patch mode (-p) works for staged restoration as well.",
    "level": "advanced",
    "codeExample": "git restore --staged -p src/controllers/userController.js"
  },
  {
    "id": "undo-t2-q9",
    "question": "Why is `git restore --staged` completely safe for beginners?",
    "shortAnswer": "Because it never deletes, alters, or overwrites any code in the Working Tree files on disk.",
    "options": [
      "It only updates Git's internal staging index and never touches or deletes working tree files on disk",
      "Because it asks for an administrator password",
      "Because it uploads a backup to GitHub automatically",
      "Because it only works on small files"
    ],
    "answer": "It only updates Git's internal staging index and never touches or deletes working tree files on disk",
    "explanation": "Zero disk data loss risk: your code remains 100% untouched in your editor and on your filesystem.",
    "hint": "Operates exclusively on Index metadata.",
    "level": "basic",
    "codeExample": "# Safe command with zero risk to disk edits:\ngit restore --staged ."
  },
  {
    "id": "undo-t2-q10",
    "question": "How does Mahima in Barrackpore explain the difference between `git restore` and `git restore --staged` to her classmates?",
    "shortAnswer": "`git restore` erases the drawing on your paper; `git restore --staged` takes the paper out of the submission folder but keeps the drawing intact.",
    "options": [
      "`git restore` erases the drawing; `git restore --staged` removes the paper from the submission folder without erasing anything",
      "They are identical commands",
      "`git restore` is for Windows and `--staged` is for Mac",
      "`git restore` is for Python and `--staged` is for Java"
    ],
    "answer": "`git restore` erases the drawing; `git restore --staged` removes the paper from the submission folder without erasing anything",
    "explanation": "The submission folder is the Staging Index; the drawing on the physical paper is your Working Tree disk file.",
    "hint": "Submission folder vs drawing paper.",
    "level": "basic",
    "codeExample": "# Analogy: Remove from folder vs erase drawing"
  },
  {
    "id": "undo-t2-q11",
    "question": "What is the result of running `git restore -S -W <file>`?",
    "shortAnswer": "Both the Staging Index and the Working Tree are reset to match HEAD, discarding staged and unstaged edits simultaneously.",
    "options": [
      "Both Index and Working Tree are reset to match HEAD simultaneously",
      "The file is renamed to SW_<file>",
      "Git creates a switch branch",
      "The command fails due to conflicting options"
    ],
    "answer": "Both Index and Working Tree are reset to match HEAD simultaneously",
    "explanation": "`-S` targets the staged tree, and `-W` targets the worktree. Both are synchronized with HEAD.",
    "hint": "Staged + Worktree combined.",
    "level": "advanced",
    "codeExample": "git restore -S -W app.js"
  },
  {
    "id": "undo-t2-q12",
    "question": "What command in legacy Git was identical to `git restore --staged .`?",
    "shortAnswer": "`git reset HEAD` (or `git reset`).",
    "options": [
      "`git reset HEAD`",
      "`git checkout .`",
      "`git revert HEAD`",
      "`git branch -D`"
    ],
    "answer": "`git reset HEAD`",
    "explanation": "Running `git reset` (without mode flags) defaults to `--mixed HEAD`, which resets the Index to HEAD without touching the Working Tree.",
    "hint": "Reset HEAD clears the index.",
    "level": "intermediate",
    "codeExample": "git reset HEAD"
  },
  {
    "id": "undo-t2-q13",
    "question": "If you accidentally staged a 500MB binary file, why is unstaging it before committing critical?",
    "shortAnswer": "Once committed to the DAG, large blobs permanently bloat repository history and packfiles even if deleted in a later commit.",
    "options": [
      "To prevent bloated binary objects from being committed into the permanent Git object database and DAG history",
      "Because Git will refuse to open files larger than 1MB",
      "Because GitHub shuts down accounts with staged binaries",
      "Because binary files cannot be compiled"
    ],
    "answer": "To prevent bloated binary objects from being committed into the permanent Git object database and DAG history",
    "explanation": "Git is an append-only object store. If you commit a 500MB video, it stays in the history forever unless you rewrite the entire repository with `git filter-repo`.",
    "hint": "Permanent DAG bloat prevention.",
    "level": "advanced",
    "codeExample": "git restore --staged large_video.mp4\necho '*.mp4' >> .gitignore"
  },
  {
    "id": "undo-t2-q14",
    "question": "What does `git diff --staged` show after running `git restore --staged <file>` on a previously staged file?",
    "shortAnswer": "Empty output, because there are no longer any differences between the Staging Index and HEAD for that file.",
    "options": [
      "Empty output, because the file is no longer in the Staging Index",
      "The full diff of the working tree",
      "A list of commit hashes",
      "An error message stating that the file is missing"
    ],
    "answer": "Empty output, because the file is no longer in the Staging Index",
    "explanation": "`git diff --staged` compares the Index against HEAD. When un-staged, the Index matches HEAD, so no diff exists.",
    "hint": "Index equals HEAD after unstaging.",
    "level": "intermediate",
    "codeExample": "git diff --staged  # Returns nothing"
  },
  {
    "id": "undo-t2-q15",
    "question": "Can `git restore --staged` unstage files located in a nested subdirectory?",
    "shortAnswer": "Yes, by specifying the path (e.g. `git restore --staged src/components/`).",
    "options": [
      "Yes, pathspecs can target specific files, directories, or patterns anywhere in the repository",
      "No, you must cd into that directory first",
      "Only if the path contains no slashes",
      "Only if executed from the root directory with sudo"
    ],
    "answer": "Yes, pathspecs can target specific files, directories, or patterns anywhere in the repository",
    "explanation": "Git pathspecs work recursively and resolve relative to your current working directory or the repo root.",
    "hint": "Pathspec matching across directories.",
    "level": "basic",
    "codeExample": "git restore --staged src/components/"
  },
  {
    "id": "undo-t2-q16",
    "question": "If a developer staged changes across 3 files (`A.js`, `B.js`, `C.js`) and wants to create two separate atomic commits, what should they do?",
    "shortAnswer": "Run `git restore --staged C.js`, commit `A.js` and `B.js`, then stage and commit `C.js`.",
    "options": [
      "Unstage `C.js` with `git restore --staged C.js`, commit `A.js` & `B.js`, then stage and commit `C.js` separately",
      "Delete `C.js` and rewrite it after committing",
      "Run `git reset --hard`",
      "Commit all three in one commit with the message 'stuff'"
    ],
    "answer": "Unstage `C.js` with `git restore --staged C.js`, commit `A.js` & `B.js`, then stage and commit `C.js` separately",
    "explanation": "This workflow enables clean, atomic Conventional Commits by fine-tuning staging contents.",
    "hint": "Crafting atomic commits through precision unstaging.",
    "level": "intermediate",
    "codeExample": "git restore --staged C.js\ngit commit -m \"feat(core): implement feature A and B\"\ngit add C.js\ngit commit -m \"feat(ui): add component C\""
  },
  {
    "id": "undo-t2-q17",
    "question": "What is the difference between `git restore <file>` and `git restore --staged <file>`?",
    "shortAnswer": "`git restore` overwrites Working Tree files on disk; `git restore --staged` updates the Staging Area in the Index without touching disk files.",
    "options": [
      "`git restore` overwrites disk files; `git restore --staged` updates the Index and preserves disk files",
      "There is no difference",
      "`git restore --staged` is destructive; `git restore` is safe",
      "`git restore` requires git stash"
    ],
    "answer": "`git restore` overwrites disk files; `git restore --staged` updates the Index and preserves disk files",
    "explanation": "This is the single most important conceptual distinction for beginners in version control.",
    "hint": "Disk overwrite vs Staging Index update.",
    "level": "basic",
    "codeExample": "# Overwrites disk: git restore <file>\n# Modifies index: git restore --staged <file>"
  },
  {
    "id": "undo-t2-q18",
    "question": "When running `git restore --staged --source=HEAD~1 <file>`, what happens?",
    "shortAnswer": "The file in the Staging Index is replaced with the snapshot from `HEAD~1` instead of `HEAD`.",
    "options": [
      "The Staging Index for that file is loaded with the version from 1 commit before HEAD",
      "The working tree is wiped",
      "A new commit is created on HEAD~1",
      "The branch is deleted"
    ],
    "answer": "The Staging Index for that file is loaded with the version from 1 commit before HEAD",
    "explanation": "By combining `--staged` with `--source`, you can stage an older version of a file directly from history.",
    "hint": "Source sets the origin snapshot for the index.",
    "level": "advanced",
    "codeExample": "git restore --staged --source=HEAD~1 config.js"
  },
  {
    "id": "undo-t2-q19",
    "question": "If you staged a file deletion with `git rm <file>`, how do you cancel the staged deletion?",
    "shortAnswer": "`git restore --staged <file>` followed by `git restore <file>` to unstage the deletion and recreate the file on disk.",
    "options": [
      "`git restore --staged <file>` followed by `git restore <file>`",
      "`git checkout main`",
      "`git init`",
      "`git push`"
    ],
    "answer": "`git restore --staged <file>` followed by `git restore <file>`",
    "explanation": "Unstaging cancels the staged deletion in the Index (`D  <file> ->  D <file>`), and restoring the worktree brings the file back onto disk.",
    "hint": "Unstage index deletion first, then restore worktree.",
    "level": "intermediate",
    "codeExample": "git restore --staged schema.sql\ngit restore schema.sql"
  },
  {
    "id": "undo-t2-q20",
    "question": "Why is `git restore --staged` preferred over `git reset HEAD` in modern codebases?",
    "shortAnswer": "It has a self-explanatory name, avoids confusion with destructive reset flags (`--hard`), and follows the unified `git restore` / `git switch` mental model.",
    "options": [
      "It clearly expresses intent, avoids confusing reset flags, and prevents accidental hard resets",
      "Because `git reset` is deprecated in Git 2.45",
      "Because `git reset` does not work with SSD drives",
      "Because `git restore` runs 500% faster"
    ],
    "answer": "It clearly expresses intent, avoids confusing reset flags, and prevents accidental hard resets",
    "explanation": "Pedagogical and operational clarity: `restore --staged` tells the reader exactly what it does.",
    "hint": "Clarity of intent in developer tooling.",
    "level": "basic",
    "codeExample": "git restore --staged app.js"
  },
  {
    "id": "undo-t2-q21",
    "question": "What happens if you run `git restore --staged` on a file that has no changes staged?",
    "shortAnswer": "Git exits silently without error because the Staging Index already matches HEAD for that file.",
    "options": [
      "Git does nothing and exits cleanly",
      "Git throws a fatal error",
      "Git deletes the file",
      "Git resets the repository"
    ],
    "answer": "Git does nothing and exits cleanly",
    "explanation": "The command is idempotent: if the index already matches HEAD, no modification is needed.",
    "hint": "Idempotent behavior.",
    "level": "intermediate",
    "codeExample": "git restore --staged unchanged.txt  # No error, no change"
  },
  {
    "id": "undo-t2-q22",
    "question": "How does Sukanta Sir teach the Staging Area mental model in Barrackpore?",
    "shortAnswer": "The Staging Area is your personal pre-commit staging tray: you can add dishes to it, inspect them, take dishes off with `--staged`, and only send them to the customer when the tray is perfect.",
    "options": [
      "The Staging Area is a pre-commit tray where you can freely add and remove items until the set is perfect",
      "The Staging Area is a permanent vault",
      "The Staging Area is a cloud server in California",
      "The Staging Area is an encrypted password keeper"
    ],
    "answer": "The Staging Area is a pre-commit tray where you can freely add and remove items until the set is perfect",
    "explanation": "Git's staging area gives developers complete curation power before creating permanent commit objects.",
    "hint": "Curated pre-commit tray.",
    "level": "basic",
    "codeExample": "# Curate your staging tray:\ngit add file1.js\ngit restore --staged file2.js"
  },
  {
    "id": "undo-t2-q23",
    "question": "In `git status -s`, what does the short code `AM` indicate?",
    "shortAnswer": "The file was newly created and staged (`A`), and then modified further in the Working Tree without staging the new edits (`M`).",
    "options": [
      "The file was added to index (`A`) and then modified further in working tree (`M`)",
      "The file is in Auto-Merge mode",
      "The file is an AM radio audio file",
      "The file has an author mismatch"
    ],
    "answer": "The file was added to index (`A`) and then modified further in working tree (`M`)",
    "explanation": "Two different versions of the file exist in Git simultaneously: the staged version in the Index and the newer unstaged version on disk.",
    "hint": "A in col 1 (Index) and M in col 2 (Worktree).",
    "level": "advanced",
    "codeExample": "# Status output: AM src/calculator.js"
  },
  {
    "id": "undo-t2-q24",
    "question": "If a file has status `AM`, what does `git restore --staged <file>` do?",
    "shortAnswer": "It removes the file from the Staging Index, leaving the entire file as untracked (`??`) in the Working Tree with all edits preserved.",
    "options": [
      "It un-stages the file, turning it into an untracked file (`??`) with all code intact on disk",
      "It deletes the unstaged edits and keeps the staged version",
      "It wipes the file from disk",
      "It commits the staged part"
    ],
    "answer": "It un-stages the file, turning it into an untracked file (`??`) with all code intact on disk",
    "explanation": "Because the file was never committed to HEAD, unstaging it removes it from the Index, leaving the disk file as untracked (`??`).",
    "hint": "Unstages newly added file to untracked state.",
    "level": "advanced",
    "codeExample": "git restore --staged src/calculator.js\ngit status -s  # Output: ?? src/calculator.js"
  },
  {
    "id": "undo-t2-q25",
    "question": "What is the key defensive recommendation when staging multi-file features?",
    "shortAnswer": "Run `git status` or `git diff --staged` before every commit; if unwanted files were caught by `git add .`, unstage them immediately with `git restore --staged <file>`.",
    "options": [
      "Always inspect `git diff --staged` before committing and use `git restore --staged` to remove accidental files",
      "Never use `git add`",
      "Commit everything and let the QA team fix it",
      "Always use `git commit -a -m` blindly"
    ],
    "answer": "Always inspect `git diff --staged` before committing and use `git restore --staged` to remove accidental files",
    "explanation": "A clean developer workflow relies on staging inspection and precision unstaging before committing.",
    "hint": "Inspect staged diffs before committing.",
    "level": "basic",
    "codeExample": "git diff --staged\ngit restore --staged unwanted_file.js\ngit commit -m \"feat: clean atomic commit\""
  }
];

export default questions;
