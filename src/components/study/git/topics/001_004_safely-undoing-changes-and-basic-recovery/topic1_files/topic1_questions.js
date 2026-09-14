/**
 * Topic 1 FAQ Assessment Questions:
 * "Discarding Unstaged Changes: Modern git restore vs legacy git checkout"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t1-q1",
    "question": "What does `git restore <file>` do when executed on a modified tracked file?",
    "shortAnswer": "It replaces the working tree version of the file with the version currently in the Staging Area (or HEAD if unstaged), permanently discarding unstaged local modifications.",
    "options": [
      "It overwrites the working tree file with the staged/HEAD version, discarding unstaged modifications",
      "It moves the file to the operating system recycle bin",
      "It creates a backup copy named file.bak in the working directory",
      "It creates a new commit containing the discarded changes"
    ],
    "answer": "It overwrites the working tree file with the staged/HEAD version, discarding unstaged modifications",
    "explanation": "`git restore` is designed specifically to restore working tree files. If no `--source` or `--staged` flag is provided, it restores from the Index (or HEAD if the file has not been staged).",
    "hint": "Think of it as a file-level revert to your last saved checkpoint.",
    "level": "basic",
    "codeExample": "git restore src/App.jsx"
  },
  {
    "id": "undo-t1-q2",
    "question": "Why did Git 2.23 introduce `git restore` alongside `git switch`?",
    "shortAnswer": "To replace the overloaded `git checkout` command, which historically performed two completely unrelated duties: switching branches and restoring files.",
    "options": [
      "To separate branch management (`git switch`) from file restoration (`git restore`), preventing dangerous accidental checkouts",
      "Because `git checkout` was deleted from the Git binary",
      "To allow Git to work on mobile devices",
      "Because `git checkout` could only handle 100 lines of code"
    ],
    "answer": "To separate branch management (`git switch`) from file restoration (`git restore`), preventing dangerous accidental checkouts",
    "explanation": "Before Git 2.23, `git checkout <branch>` switched branches, but `git checkout -- <file>` discarded file edits. If a branch and a file shared the same name, confusing ambiguities arose.",
    "hint": "Separation of concerns for CLI safety.",
    "level": "intermediate",
    "codeExample": "# Legacy syntax:\ngit checkout -- style.css\n# Modern clean syntax:\ngit restore style.css"
  },
  {
    "id": "undo-t1-q3",
    "question": "How can a developer discard all unstaged modifications across the entire repository in one command?",
    "shortAnswer": "`git restore .` (or `git restore :/*` from any subdirectory).",
    "options": [
      "`git restore .`",
      "`git restore --all --force`",
      "`git undo *`",
      "`git delete --unstaged`"
    ],
    "answer": "`git restore .`",
    "explanation": "`git restore .` restores all tracked files in the current directory and its subdirectories to match the Index.",
    "hint": "The dot represents the current directory tree.",
    "level": "basic",
    "codeExample": "git restore ."
  },
  {
    "id": "undo-t1-q4",
    "question": "What happens if you run `git restore` on an untracked file?",
    "shortAnswer": "Git reports an error: `pathspec '<file>' did not match any file(s) known to git` because untracked files are not tracked in the Index or HEAD.",
    "options": [
      "Git throws an error because `git restore` only manages tracked files",
      "Git immediately deletes the untracked file from disk",
      "Git adds the file to `.gitignore` automatically",
      "Git creates an empty file with the same name"
    ],
    "answer": "Git throws an error because `git restore` only manages tracked files",
    "explanation": "`git restore` only acts on files Git already knows about. To remove untracked files, use `git clean`.",
    "hint": "Restore operates on tracked version history.",
    "level": "intermediate",
    "codeExample": "# For untracked files, use git clean instead:\ngit clean -f untracked_file.txt"
  },
  {
    "id": "undo-t1-q5",
    "question": "How do you restore a file to the state it was in 3 commits ago without moving HEAD?",
    "shortAnswer": "`git restore --source=HEAD~3 <file>`",
    "options": [
      "`git restore --source=HEAD~3 <file>`",
      "`git reset HEAD~3 <file>`",
      "`git checkout -b HEAD~3 <file>`",
      "`git fetch HEAD~3 <file>`"
    ],
    "answer": "`git restore --source=HEAD~3 <file>`",
    "explanation": "The `--source` parameter tells `git restore` to pull the file content from a specific commit, branch, or tree-ish rather than the Index.",
    "hint": "Use `--source` to specify the origin commit.",
    "level": "advanced",
    "codeExample": "git restore --source=HEAD~3 src/utils/taxHelper.js"
  },
  {
    "id": "undo-t1-q6",
    "question": "If a developer modified `server.js` and `index.html` without staging, and runs `git restore server.js`, what is the state of `index.html`?",
    "shortAnswer": "`index.html` remains modified in the Working Tree; only `server.js` is restored.",
    "options": [
      "`index.html` remains modified on disk; only `server.js` is restored",
      "Both files are restored",
      "`index.html` is automatically committed",
      "`index.html` is deleted from disk"
    ],
    "answer": "`index.html` remains modified on disk; only `server.js` is restored",
    "explanation": "`git restore` operates surgically on specified pathspecs, leaving other modified files completely untouched.",
    "hint": "Path-specific precision.",
    "level": "basic",
    "codeExample": "# Only server.js is restored:\ngit restore server.js"
  },
  {
    "id": "undo-t1-q7",
    "question": "What is the key danger of running `git restore .`?",
    "shortAnswer": "All uncommitted, unstaged modifications across all tracked files in the current folder are destroyed with ZERO recovery possibility.",
    "options": [
      "Any uncommitted, unstaged code changes are wiped out permanently and cannot be recovered via reflog",
      "It deletes the `.git` directory",
      "It resets remote tracking branches",
      "It causes merge conflicts on GitHub"
    ],
    "answer": "Any uncommitted, unstaged code changes are wiped out permanently and cannot be recovered via reflog",
    "explanation": "Because the unstaged code was never recorded in Git's object store (never staged with `git add` or committed), Git has no snapshot to recover it from.",
    "hint": "Unstaged work has no safety net.",
    "level": "intermediate",
    "codeExample": "# WARNING: Always run 'git diff' to review before running 'git restore .'"
  },
  {
    "id": "undo-t1-q8",
    "question": "In the legacy syntax `git checkout -- <file>`, what was the purpose of the double dash `--`?",
    "shortAnswer": "It explicitly signaled to Git that all following arguments are file paths, not branch names or option flags.",
    "options": [
      "It dis-ambiguates file paths from branch names with identical identifiers",
      "It forced Git to run in silent mode",
      "It decrypted encrypted repository files",
      "It indicated that the command should run in the background"
    ],
    "answer": "It dis-ambiguates file paths from branch names with identical identifiers",
    "explanation": "If you had a branch named `main.js` and a file named `main.js`, `git checkout main.js` would switch branches, while `git checkout -- main.js` would restore the file.",
    "hint": "Double-dash separates options/branches from file pathspecs.",
    "level": "advanced",
    "codeExample": "git checkout -- main.js"
  },
  {
    "id": "undo-t1-q9",
    "question": "Can `git restore` be used to restore a deleted tracked file in the working tree?",
    "shortAnswer": "Yes. If a tracked file was deleted from disk with `rm <file>` without staging the deletion, `git restore <file>` recreates it from the Index/HEAD.",
    "options": [
      "Yes, `git restore <file>` will recreate the deleted file in the working directory",
      "No, deleted files can only be restored via `git clone`",
      "No, you must manually recreate the file with `touch`",
      "Only if the operating system recycle bin is empty"
    ],
    "answer": "Yes, `git restore <file>` will recreate the deleted file in the working directory",
    "explanation": "A missing tracked file is simply considered a 'deleted' unstaged modification (`D filename`). Running `git restore filename` restores it from the index.",
    "hint": "Deletion is just another unstaged modification.",
    "level": "basic",
    "codeExample": "rm index.html\ngit status -s  # Output:  D index.html\ngit restore index.html  # Restored!"
  },
  {
    "id": "undo-t1-q10",
    "question": "What is the difference between `git restore -p <file>` (patch mode) and `git restore <file>`?",
    "shortAnswer": "`git restore -p` prompts interactively for each diff hunk, allowing selective discarding of specific line edits within a file.",
    "options": [
      "`git restore -p` allows interactively reviewing and discarding specific hunks of changes within a file",
      "`git restore -p` prints the file contents to standard output",
      "`git restore -p` creates a zip patch file",
      "`git restore -p` pulls changes from production"
    ],
    "answer": "`git restore -p` allows interactively reviewing and discarding specific hunks of changes within a file",
    "explanation": "Patch mode (`-p` / `--patch`) provides interactive control (`y`, `n`, `q`, `s`, `e`) over every single change chunk.",
    "hint": "Patch mode allows hunk-level surgical precision.",
    "level": "advanced",
    "codeExample": "git restore -p src/components/Invoice.jsx"
  },
  {
    "id": "undo-t1-q11",
    "question": "If you staged a file with `git add` and then made further unstaged edits to that same file, what does `git restore <file>` do?",
    "shortAnswer": "It discards the new unstaged edits and resets the file to the version currently stored in the Staging Area.",
    "options": [
      "It resets the file to the staged version in the Index, not the HEAD commit",
      "It un-stages the file from the Index",
      "It deletes the file from disk",
      "It commits the staged version"
    ],
    "answer": "It resets the file to the staged version in the Index, not the HEAD commit",
    "explanation": "By default, `git restore` uses the Index as its default source. Therefore, unstaged edits are discarded, reverting the file to what you previously `git add`ed.",
    "hint": "Default restore source is the staging index.",
    "level": "intermediate",
    "codeExample": "# File staged -> edits made -> git restore reverts to staged state"
  },
  {
    "id": "undo-t1-q12",
    "question": "How does Sukanta Sir explain `git restore <file>` to students in Barrackpore?",
    "shortAnswer": "Like using an eraser to rub out pencil marks on your draft paper, bringing the page back to how it was when you last photocopied it.",
    "options": [
      "Like using a pencil eraser on draft sketches to restore the clean drawing underneath",
      "Like buying a brand new computer",
      "Like shutting down the WiFi router",
      "Like burning the textbook"
    ],
    "answer": "Like using a pencil eraser on draft sketches to restore the clean drawing underneath",
    "explanation": "Pencil notes in the working tree can be erased without harming the ink copy already stamped into the Index or repository.",
    "hint": "Eraser on working draft.",
    "level": "basic",
    "codeExample": "git restore draft.txt"
  },
  {
    "id": "undo-t1-q13",
    "question": "What flag allows `git restore` to restore both staged and working tree versions simultaneously?",
    "shortAnswer": "`--staged --worktree` (or `-S -W`).",
    "options": [
      "`--staged --worktree` (or `-S -W`)",
      "`--nuclear`",
      "`--all-trees`",
      "`--force-all`"
    ],
    "answer": "`--staged --worktree` (or `-S -W`)",
    "explanation": "Combining `-S` and `-W` clears the Index and resets the Working Tree file to match HEAD in a single command.",
    "hint": "Both -S (staged) and -W (worktree).",
    "level": "advanced",
    "codeExample": "git restore -S -W app.js"
  },
  {
    "id": "undo-t1-q14",
    "question": "If a developer accidentally typed `git restore *` on Windows PowerShell, what issue might occur due to shell expansion?",
    "shortAnswer": "PowerShell expands `*` to all files in the directory before passing them to Git, which might include untracked files that cause pathspec errors.",
    "options": [
      "Shell globbing expands `*` before Git receives it, potentially including untracked files or skipping hidden files",
      "Windows PowerShell crashes immediately",
      "Git deletes the root C: drive",
      "No issue; PowerShell disables globbing"
    ],
    "answer": "Shell globbing expands `*` before Git receives it, potentially including untracked files or skipping hidden files",
    "explanation": "In PowerShell and Unix shells, wildcards are expanded by the shell. It is always safer to use `git restore .` or quote the wildcard `git restore '*'`. ",
    "hint": "Shell globbing vs Git pathspec parsing.",
    "level": "intermediate",
    "codeExample": "# Recommended safe cross-platform syntax:\ngit restore ."
  },
  {
    "id": "undo-t1-q15",
    "question": "What is the difference between `git restore <file>` and `git clean -f`?",
    "shortAnswer": "`git restore` operates on tracked modified files; `git clean -f` removes untracked files.",
    "options": [
      "`git restore` operates on tracked files; `git clean -f` removes untracked files",
      "`git restore` requires root permissions",
      "`git clean` operates on Git commit objects",
      "There is no difference"
    ],
    "answer": "`git restore` operates on tracked files; `git clean -f` removes untracked files",
    "explanation": "Tracked files have history in Git and can be restored. Untracked files have no history in Git and can only be cleaned/purged.",
    "hint": "Tracked modifications vs untracked files.",
    "level": "basic",
    "codeExample": "# Tracked edits: git restore <file>\n# Untracked files: git clean -f"
  },
  {
    "id": "undo-t1-q16",
    "question": "Which Git status indicator shows that a file has unstaged changes ready to be discarded by `git restore`?",
    "shortAnswer": "A red `M` in the second column of `git status -s` (` M filename`).",
    "options": [
      "A red `M` in the second column (` M filename`)",
      "A green `A` in the first column (`A  filename`)",
      "Two question marks (`?? filename`)",
      "A blue `D` in the first column (`D  filename`)"
    ],
    "answer": "A red `M` in the second column (` M filename`)",
    "explanation": "In short status, the first column represents the Staging Index and the second column represents the Working Tree.",
    "hint": "Second column = Working Tree.",
    "level": "basic",
    "codeExample": "git status -s\n# Output:  M index.html (Second column modified -> unstaged)"
  },
  {
    "id": "undo-t1-q17",
    "question": "What happens if you run `git restore --progress <file>`?",
    "shortAnswer": "Git displays progress reporting during the restore operation, useful for large binary or tree checkouts.",
    "options": [
      "It displays a progress meter during checkout/restoration",
      "It runs restore in dry-run mode",
      "It prints the commit log",
      "It measures CPU performance"
    ],
    "answer": "It displays a progress meter during checkout/restoration",
    "explanation": "`--progress` forces progress status reporting even if the output stream is not directed to a terminal.",
    "hint": "Progress reporting for large operations.",
    "level": "advanced",
    "codeExample": "git restore --progress large_asset.bin"
  },
  {
    "id": "undo-t1-q18",
    "question": "Can `git restore` be used to restore an entire subdirectory of changes?",
    "shortAnswer": "Yes, passing a directory path (e.g. `git restore src/components/`) restores all modified tracked files in that subfolder.",
    "options": [
      "Yes, `git restore src/components/` restores all modified files in that specific directory",
      "No, `git restore` only accepts single file names",
      "No, you must restore each file individually",
      "Only if the directory contains fewer than 5 files"
    ],
    "answer": "Yes, `git restore src/components/` restores all modified files in that specific directory",
    "explanation": "`git restore` accepts arbitrary pathspecs, including relative paths, directory prefixes, and glob patterns.",
    "hint": "Pathspec matching applies to directories.",
    "level": "basic",
    "codeExample": "git restore src/controllers/"
  },
  {
    "id": "undo-t1-q19",
    "question": "If a junior engineer in Barrackpore accidentally ran `git restore .` and lost their morning code, how can they prevent this in the future?",
    "shortAnswer": "Stage work frequently with `git add` or use `git stash` before experimenting.",
    "options": [
      "Make frequent checkpoint commits or stash working progress before performing bulk restores",
      "Never use Git again",
      "Disable the terminal",
      "Avoid writing code in JavaScript"
    ],
    "answer": "Make frequent checkpoint commits or stash working progress before performing bulk restores",
    "explanation": "Defensive version control: Once code is committed or stashed into Git's object store, it is virtually impossible to lose accidentally.",
    "hint": "Save early and commit often.",
    "level": "basic",
    "codeExample": "# Safety habit before risky experiments:\ngit stash push -m \"WIP: safety snapshot before restore\""
  },
  {
    "id": "undo-t1-q20",
    "question": "What is the equivalent of `git restore --source=main <file>` in legacy Git syntax?",
    "shortAnswer": "`git checkout main -- <file>`.",
    "options": [
      "`git checkout main -- <file>`",
      "`git branch main <file>`",
      "`git pull main <file>`",
      "`git merge main <file>`"
    ],
    "answer": "`git checkout main -- <file>`",
    "explanation": "In legacy syntax, passing the branch name before `--` pulled that specific file from that branch into the working tree.",
    "hint": "Checkout with branch and double-dash.",
    "level": "intermediate",
    "codeExample": "# Legacy:\ngit checkout main -- config.js\n# Modern:\ngit restore --source=main config.js"
  },
  {
    "id": "undo-t1-q21",
    "question": "When running `git restore -p`, what does the `s` (split) option do?",
    "shortAnswer": "It splits the current diff hunk into smaller distinct sub-hunks so you can discard or keep individual lines with finer granularity.",
    "options": [
      "It splits the current change hunk into smaller sub-hunks for finer control",
      "It skips the entire file",
      "It saves the file to a zip archive",
      "It switches branches"
    ],
    "answer": "It splits the current change hunk into smaller sub-hunks for finer control",
    "explanation": "If a hunk contains both a change you want to keep and a change you want to discard, typing `s` splits it into smaller chunks separated by unchanged lines.",
    "hint": "s stands for split.",
    "level": "advanced",
    "codeExample": "# Inside git restore -p:\n# (1/2) Discard this hunk [y,n,q,a,d,s,e,?]? s"
  },
  {
    "id": "undo-t1-q22",
    "question": "Why does `git restore <file>` NOT create a new commit entry in `git log`?",
    "shortAnswer": "Because it only modifies working tree files on disk and does not create commit objects or update the HEAD reference.",
    "options": [
      "It is a working tree operation that does not create commit objects or move HEAD",
      "Because Git logs only record merge commits",
      "Because it writes to `.git/trash` instead",
      "Because Git disables logging for undo commands"
    ],
    "answer": "It is a working tree operation that does not create commit objects or move HEAD",
    "explanation": "Commits are only created by `git commit`, `git merge`, or `git revert`. `git restore` simply alters disk files.",
    "hint": "Working tree operations do not generate commit objects.",
    "level": "intermediate",
    "codeExample": "git log --oneline  # Will not show restore actions"
  },
  {
    "id": "undo-t1-q23",
    "question": "If a file was deleted using the OS file explorer, which command brings it back without touching other files?",
    "shortAnswer": "`git restore <deleted_file_name>`.",
    "options": [
      "`git restore <deleted_file_name>`",
      "`git init`",
      "`git push --force`",
      "`git log -p`"
    ],
    "answer": "`git restore <deleted_file_name>`",
    "explanation": "Git views an OS file deletion as an unstaged removal. `git restore` pulls the file back from the index to disk.",
    "hint": "Restore recreates missing tracked files.",
    "level": "basic",
    "codeExample": "git restore src/assets/logo.svg"
  },
  {
    "id": "undo-t1-q24",
    "question": "What does `git restore --ours <file>` do during a merge conflict?",
    "shortAnswer": "It restores the file to the version from the current branch (HEAD) before the merge started.",
    "options": [
      "It checks out the version from the current active branch ('ours') to resolve the conflict",
      "It deletes the collaborator's commit",
      "It merges both versions automatically with AI",
      "It aborts the entire merge"
    ],
    "answer": "It checks out the version from the current active branch ('ours') to resolve the conflict",
    "explanation": "During merge conflicts, `--ours` (stage 2 in index) and `--theirs` (stage 3 in index) can be restored directly.",
    "hint": "Ours corresponds to the current branch.",
    "level": "advanced",
    "codeExample": "git restore --ours src/routes.js"
  },
  {
    "id": "undo-t1-q25",
    "question": "What is the primary takeaway for beginners regarding `git restore`?",
    "shortAnswer": "It is the standard, modern, dedicated command for discarding unstaged file changes—use it instead of `git checkout --` and always review changes before running it.",
    "options": [
      "`git restore` is modern, clear, and replaces `git checkout --`; always verify with `git diff` first because unstaged disk edits cannot be recovered",
      "`git restore` should only be used by database administrators",
      "`git restore` requires an active internet connection to GitHub",
      "`git restore` automatically creates backups in AWS S3"
    ],
    "answer": "`git restore` is modern, clear, and replaces `git checkout --`; always verify with `git diff` first because unstaged disk edits cannot be recovered",
    "explanation": "Modern Git syntax provides safety through clarity. `git restore` does one job and does it well.",
    "hint": "Modern clarity and defensive habits.",
    "level": "basic",
    "codeExample": "git diff\ngit restore broken_file.js"
  }
];

export default questions;
