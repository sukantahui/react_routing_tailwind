/**
 * Topic 12 FAQ Assessment Questions:
 * "Classroom Troubleshooting: Restoring accidentally modified database migration scripts"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t12-q1",
    "question": "In the classroom case study, what is the very first action Sukanta Sir instructed Abhronila and Tuhina to perform before typing any undo command?",
    "shortAnswer": "Run `git status` and inspect file diffs without executing any modifying commands.",
    "options": [
      "Run `git status` and `git diff` to understand exactly which files are staged, unstaged, and untracked",
      "Run `git reset --hard HEAD` immediately",
      "Delete the repository folder",
      "Re-install Git"
    ],
    "answer": "Run `git status` and `git diff` to understand exactly which files are staged, unstaged, and untracked",
    "explanation": "Triaging the exact three-tree state prevents accidental destruction of valid work.",
    "hint": "Inspection and status check is always Step 1.",
    "level": "basic",
    "codeExample": "git status\ngit diff --staged"
  },
  {
    "id": "undo-t12-q2",
    "question": "Which command cleanly unstages the staged database migration files (`001_users.sql`, `002_tax_rates.sql`) without deleting their contents?",
    "shortAnswer": "`git restore --staged db/migrations/001_users.sql db/migrations/002_tax_rates.sql`",
    "options": [
      "`git restore --staged db/migrations/001_users.sql db/migrations/002_tax_rates.sql`",
      "`git clean -f db/migrations/`",
      "`git rm db/migrations/001_users.sql`",
      "`git checkout --delete`"
    ],
    "answer": "`git restore --staged db/migrations/001_users.sql db/migrations/002_tax_rates.sql`",
    "explanation": "`git restore --staged` removes entries from the Index, safely leaving working tree files intact.",
    "hint": "restore --staged unstages files.",
    "level": "basic",
    "codeExample": "git restore --staged db/migrations/*.sql"
  },
  {
    "id": "undo-t12-q3",
    "question": "How can you restore all modified files inside the `db/migrations/` directory back to the last commit snapshot in one command?",
    "shortAnswer": "`git restore db/migrations/`",
    "options": [
      "`git restore db/migrations/`",
      "`git reset --files db/migrations/`",
      "`git clean -fd db/migrations/`",
      "`git pull --force`"
    ],
    "answer": "`git restore db/migrations/`",
    "explanation": "Passing a directory path to `git restore` reverts all unstaged tracked file edits within that folder.",
    "hint": "git restore <dir-path> restores the whole directory.",
    "level": "basic",
    "codeExample": "git restore db/migrations/"
  },
  {
    "id": "undo-t12-q4",
    "question": "What is the legacy Git command equivalent to `git restore db/migrations/`?",
    "shortAnswer": "`git checkout -- db/migrations/`",
    "options": [
      "`git checkout -- db/migrations/`",
      "`git switch -- db/migrations/`",
      "`git reset --hard db/migrations/`",
      "`git revert --files db/migrations/`"
    ],
    "answer": "`git checkout -- db/migrations/`",
    "explanation": "Prior to Git 2.23, `git checkout -- <path>` was used to discard working tree modifications.",
    "hint": "Legacy command is git checkout -- <path>.",
    "level": "intermediate",
    "codeExample": "git checkout -- db/migrations/"
  },
  {
    "id": "undo-t12-q5",
    "question": "Why are database migration scripts considered high-risk files in software engineering teams?",
    "shortAnswer": "Because unintended alterations can corrupt production database schemas, cause irreversible data loss, or break replication pipelines.",
    "options": [
      "Because corrupt migration scripts can break production database schemas and cause permanent data loss",
      "Because SQL files are 100x larger than JavaScript files",
      "Because Git cannot track .sql files",
      "Because database drivers require XML format"
    ],
    "answer": "Because corrupt migration scripts can break production database schemas and cause permanent data loss",
    "explanation": "Database migrations execute directly against schema engines; version control accuracy is paramount.",
    "hint": "Database schema integrity is critical for data persistence.",
    "level": "basic",
    "codeExample": "# Production migrations must always remain pristine and reproducible"
  },
  {
    "id": "undo-t12-q6",
    "question": "If Abhronila wanted to see the exact line changes in the staged migration scripts before unstaging them, which command should she run?",
    "shortAnswer": "`git diff --staged` (or `git diff --cached`).",
    "options": [
      "`git diff --staged`",
      "`git diff`",
      "`git show --working`",
      "`git status -v`"
    ],
    "answer": "`git diff --staged`",
    "explanation": "`git diff --staged` displays the diff between HEAD and the Staging Index.",
    "hint": "Use --staged to inspect the staging area diff.",
    "level": "basic",
    "codeExample": "git diff --staged db/migrations/001_users.sql"
  },
  {
    "id": "undo-t12-q7",
    "question": "How can you view only the unstaged line changes in `db/migrations/003_invoices.sql`?",
    "shortAnswer": "`git diff db/migrations/003_invoices.sql`",
    "options": [
      "`git diff db/migrations/003_invoices.sql`",
      "`git diff --staged`",
      "`git log -p db/migrations/`",
      "`git status --details`"
    ],
    "answer": "`git diff db/migrations/003_invoices.sql`",
    "explanation": "`git diff <path>` shows differences between the Staging Index and the Working Tree.",
    "hint": "Default git diff shows unstaged changes.",
    "level": "basic",
    "codeExample": "git diff db/migrations/003_invoices.sql"
  },
  {
    "id": "undo-t12-q8",
    "question": "What is the recommended 4-step sequence for resolving complex multi-tier working tree contamination?",
    "shortAnswer": "1. Audit (git status/diff), 2. Unstage (git restore --staged), 3. Discard working edits (git restore), 4. Prune untracked (git clean -nd / -fd).",
    "options": [
      "1. Audit (status/diff) -> 2. Unstage (--staged) -> 3. Discard (restore) -> 4. Prune (clean)",
      "1. Delete .git -> 2. Re-init -> 3. Commit -> 4. Push",
      "1. Reset --hard -> 2. Clean -fdx -> 3. Pray -> 4. Exit",
      "1. Push -> 2. Pull -> 3. Fetch -> 4. Merge"
    ],
    "answer": "1. Audit (status/diff) -> 2. Unstage (--staged) -> 3. Discard (restore) -> 4. Prune (clean)",
    "explanation": "This systematic outside-in approach gives complete safety and transparency.",
    "hint": "Audit -> Unstage -> Restore -> Clean.",
    "level": "basic",
    "codeExample": "# 1. Audit -> 2. Unstage -> 3. Restore -> 4. Clean"
  },
  {
    "id": "undo-t12-q9",
    "question": "If Tuhina had already committed the broken migration scripts locally (but not pushed), which command would unwrap that commit safely into the working directory?",
    "shortAnswer": "`git reset HEAD~1` (or `git reset --mixed HEAD~1`).",
    "options": [
      "`git reset HEAD~1`",
      "`git clean -fd`",
      "`git restore .`",
      "`git branch -D main`"
    ],
    "answer": "`git reset HEAD~1`",
    "explanation": "Mixed reset unwraps the commit so the file edits return to the working tree for inspection or discarding.",
    "hint": "Mixed reset unwraps the commit to working files.",
    "level": "basic",
    "codeExample": "git reset HEAD~1"
  },
  {
    "id": "undo-t12-q10",
    "question": "If the broken migration was already pushed to GitHub's `main` branch, which command must be used instead of reset?",
    "shortAnswer": "`git revert <commit-sha>`",
    "options": [
      "`git revert <commit-sha>`",
      "`git reset --hard HEAD~1`",
      "`git clean -fdx`",
      "`git checkout -b fix`"
    ],
    "answer": "`git revert <commit-sha>`",
    "explanation": "On public/shared branches, `git revert` is the only safe, non-destructive remediation command.",
    "hint": "Use revert on public branches.",
    "level": "basic",
    "codeExample": "git revert <commit-sha>\ngit push origin main"
  },
  {
    "id": "undo-t12-q11",
    "question": "What command allows you to restore a single file from a specific historical commit SHA rather than HEAD?",
    "shortAnswer": "`git restore --source=<commit-sha> <file-path>` (or legacy `git checkout <sha> -- <path>`).",
    "options": [
      "`git restore --source=<commit-sha> <file-path>`",
      "`git reset <sha> <file-path>`",
      "`git clean <sha> <file-path>`",
      "`git fetch <sha> <file-path>`"
    ],
    "answer": "`git restore --source=<commit-sha> <file-path>`",
    "explanation": "The `--source` flag extracts the version of the file as it existed in any arbitrary commit in the repository's history.",
    "hint": "Use --source to specify a historical commit.",
    "level": "intermediate",
    "codeExample": "git restore --source=8f1a2b db/migrations/001_users.sql"
  },
  {
    "id": "undo-t12-q12",
    "question": "In the classroom at Barrackpore, Abhronila wanted to preserve her experimental queries in `temp_queries.sql` while cleaning other junk logs. How should she do that?",
    "shortAnswer": "Add `temp_queries.sql` to `.gitignore` or use `git clean -fd -e temp_queries.sql`.",
    "options": [
      "Use `git clean -fd -e temp_queries.sql` to explicitly exclude it from deletion",
      "Rename it to `temp_queries.txt`",
      "Run `git clean -fdx`",
      "It is impossible"
    ],
    "answer": "Use `git clean -fd -e temp_queries.sql` to explicitly exclude it from deletion",
    "explanation": "The `-e` flag allows selective exclusion of valuable untracked scripts.",
    "hint": "-e excludes files from clean.",
    "level": "intermediate",
    "codeExample": "git clean -fd -e \"temp_queries.sql\""
  },
  {
    "id": "undo-t12-q13",
    "question": "What does `git restore --staged --worktree <path>` do?",
    "shortAnswer": "It simultaneously unstages the file and discards its working directory modifications in one step.",
    "options": [
      "It unstages the file from the Index AND discards all modifications in the Working Tree simultaneously",
      "It commits the file and pushes to GitHub",
      "It deletes the file from Git history",
      "It creates a branch called worktree"
    ],
    "answer": "It unstages the file from the Index AND discards all modifications in the Working Tree simultaneously",
    "explanation": "Combining `--staged` and `--worktree` resets both Tree 2 (Index) and Tree 3 (Working Tree) to match Tree 1 (HEAD).",
    "hint": "Combines unstaging with working tree discard.",
    "level": "intermediate",
    "codeExample": "git restore --staged --worktree db/migrations/001_users.sql"
  },
  {
    "id": "undo-t12-q14",
    "question": "How can you check if a specific migration script has ever been modified in past commits?",
    "shortAnswer": "`git log -p db/migrations/001_users.sql`",
    "options": [
      "`git log -p db/migrations/001_users.sql`",
      "`git status -p`",
      "`git clean --history`",
      "`git diff --all-time`"
    ],
    "answer": "`git log -p db/migrations/001_users.sql`",
    "explanation": "`git log -p <file>` displays the complete chronological patch history of that specific file across all commits.",
    "hint": "git log -p <file> shows the full file change history.",
    "level": "basic",
    "codeExample": "git log -p db/migrations/001_users.sql"
  },
  {
    "id": "undo-t12-q15",
    "question": "What happens if you run `git restore .` in the root of your project?",
    "shortAnswer": "All unstaged modifications in all tracked files across the entire project are discarded to match the Index/HEAD.",
    "options": [
      "All unstaged modifications across all tracked files in the workspace are discarded",
      "All untracked files are deleted",
      "All commits are deleted",
      "A new commit is created"
    ],
    "answer": "All unstaged modifications across all tracked files in the workspace are discarded",
    "explanation": "Dot (`.`) specifies the current directory and all subdirectories recursively.",
    "hint": "Dot applies restore recursively across all tracked files.",
    "level": "basic",
    "codeExample": "git restore ."
  },
  {
    "id": "undo-t12-q16",
    "question": "Can `git restore .` delete new untracked files?",
    "shortAnswer": "No. `git restore` only touches tracked files; untracked files require `git clean`.",
    "options": [
      "No; `git restore` never touches untracked files",
      "Yes; it deletes all untracked files",
      "Only if they are `.sql` files",
      "Only if run as root"
    ],
    "answer": "No; `git restore` never touches untracked files",
    "explanation": "Restore is restricted to tracked files in the repository index.",
    "hint": "Restore ignores untracked files.",
    "level": "basic",
    "codeExample": "# Untracked files remain untouched by git restore"
  },
  {
    "id": "undo-t12-q17",
    "question": "What is the primary benefit of maintaining database migrations inside Git version control?",
    "shortAnswer": "It ensures reproducible database state across all team environments (development, staging, production) aligned with application code.",
    "options": [
      "It guarantees deterministic, synchronized schema versioning across all developer and production environments",
      "It makes SQL queries execute 10x faster",
      "It eliminates the need for database backups",
      "It encrypts the database passwords"
    ],
    "answer": "It guarantees deterministic, synchronized schema versioning across all developer and production environments",
    "explanation": "Version-controlled migrations enable repeatable deployments and automated CI testing.",
    "hint": "Synchronizes schema state across environments.",
    "level": "intermediate",
    "codeExample": "# Schema migrations tracked alongside application code"
  },
  {
    "id": "undo-t12-q18",
    "question": "If you accidentally ran `git restore .` and lost an uncommitted method you wrote 5 minutes ago, what should you check first?",
    "shortAnswer": "Your IDE's Local History / Timeline feature (e.g. VS Code Timeline).",
    "options": [
      "Check VS Code Timeline / Local History for recently saved file snapshots",
      "Run `git reflog`",
      "Run `git fsck`",
      "Run `git pull`"
    ],
    "answer": "Check VS Code Timeline / Local History for recently saved file snapshots",
    "explanation": "IDE Local History preserves editor saves on disk even when Git working tree files are discarded.",
    "hint": "Check IDE Timeline for uncommitted file saves.",
    "level": "basic",
    "codeExample": "# VS Code: File Explorer -> Timeline view"
  },
  {
    "id": "undo-t12-q19",
    "question": "What is the output of `git status` when all migrations have been restored and untracked scratch files cleaned?",
    "shortAnswer": "`nothing to commit, working tree clean`",
    "options": [
      "'nothing to commit, working tree clean'",
      "'Changes to be committed'",
      "'Untracked files present'",
      "'Detached HEAD'"
    ],
    "answer": "'nothing to commit, working tree clean'",
    "explanation": "A clean tree indicates that HEAD, Index, and Working Directory are in perfect alignment.",
    "hint": "Clean status confirms full recovery.",
    "level": "basic",
    "codeExample": "nothing to commit, working tree clean"
  },
  {
    "id": "undo-t12-q20",
    "question": "How can you discard staged changes in a specific file and restore it to HEAD in a single command in modern Git?",
    "shortAnswer": "`git restore --staged --worktree <file-path>`",
    "options": [
      "`git restore --staged --worktree <file-path>`",
      "`git reset --hard <file-path>`",
      "`git checkout -f <file-path>`",
      "`git clean -f <file-path>`"
    ],
    "answer": "`git restore --staged --worktree <file-path>`",
    "explanation": "`git restore --staged --worktree` updates both the Staging Index and Working Tree to match HEAD simultaneously.",
    "hint": "Combines --staged and --worktree in one command.",
    "level": "intermediate",
    "codeExample": "git restore --staged --worktree db/migrations/001_users.sql"
  },
  {
    "id": "undo-t12-q21",
    "question": "Why is running `git reset --hard` generally discouraged when you only want to restore one specific folder?",
    "shortAnswer": "Because `git reset --hard` resets the ENTIRE repository, destroying uncommitted work in all other folders.",
    "options": [
      "Because `git reset --hard` wipes all uncommitted work across the entire repository rather than just the target folder",
      "Because reset does not support Windows paths",
      "Because reset only works on branch names",
      "Because reset requires admin permissions"
    ],
    "answer": "Because `git reset --hard` wipes all uncommitted work across the entire repository rather than just the target folder",
    "explanation": "`git restore <path>` is scoped and surgical; `git reset --hard` is global and destructive.",
    "hint": "Surgical scoped restore is safer than global hard reset.",
    "level": "basic",
    "codeExample": "# Scoped: git restore db/migrations/ (Safe for other folders)"
  },
  {
    "id": "undo-t12-q22",
    "question": "In the Barrackpore lab, Tuhina wanted to see who wrote the original SQL migration before it was modified. Which command should she run?",
    "shortAnswer": "`git blame db/migrations/001_users.sql`",
    "options": [
      "`git blame db/migrations/001_users.sql`",
      "`git status -u`",
      "`git reflog db/migrations/`",
      "`git audit db/migrations/`"
    ],
    "answer": "`git blame db/migrations/001_users.sql`",
    "explanation": "`git blame` displays line-by-line author attribution, commit hash, and timestamp.",
    "hint": "git blame shows author attribution per line.",
    "level": "basic",
    "codeExample": "git blame db/migrations/001_users.sql"
  },
  {
    "id": "undo-t12-q23",
    "question": "True or False: `git restore --staged` modifies the file content in your working tree.",
    "shortAnswer": "False. It only updates the Staging Index (Index), leaving the working tree file content 100% untouched.",
    "options": [
      "False; it only modifies the Index and leaves working tree edits intact",
      "True; it erases working tree edits",
      "True; it comments out modified code",
      "False; but it stages all other files"
    ],
    "answer": "False; it only modifies the Index and leaves working tree edits intact",
    "explanation": "`--staged` targets Tree 2 (Index) without altering Tree 3 (Working Tree).",
    "hint": "--staged only operates on the staging index.",
    "level": "basic",
    "codeExample": "# Working tree content is unchanged by git restore --staged"
  },
  {
    "id": "undo-t12-q24",
    "question": "What is the best way to safeguard in-progress database schema work before attempting complex Git recovery operations?",
    "shortAnswer": "Run `git stash -u` or create a temporary branch `git branch schema-backup`.",
    "options": [
      "Create a quick backup branch (`git branch schema-backup`) or run `git stash -u`",
      "Delete the `.git` folder",
      "Take a screenshot of the terminal",
      "Disconnect from the internet"
    ],
    "answer": "Create a quick backup branch (`git branch schema-backup`) or run `git stash -u`",
    "explanation": "Creating a safety checkpoint branch guarantees you have a safe baseline to return to if needed.",
    "hint": "Branch or stash before recovery.",
    "level": "basic",
    "codeExample": "git branch backup-before-recovery"
  },
  {
    "id": "undo-t12-q25",
    "question": "In summary, what is the core lesson from Sukanta Sir's troubleshooting session?",
    "shortAnswer": "Never panic; analyze the Three Trees with `git status` and `git diff`, and apply scoped, non-destructive restore tools surgically.",
    "options": [
      "Analyze the Three Trees first, avoid blind global resets, and apply surgical scoped restore commands",
      "Always delete repositories when errors happen",
      "Never use Git for database migrations",
      "Only senior architects should use terminal commands"
    ],
    "answer": "Analyze the Three Trees first, avoid blind global resets, and apply surgical scoped restore commands",
    "explanation": "Defensive version control and surgical command selection turn potential catastrophes into simple 2-minute fixes.",
    "hint": "Stay calm, inspect trees, restore surgically.",
    "level": "basic",
    "codeExample": "# Professional protocol: Inspect -> Unstage -> Restore -> Clean"
  }
];

export default questions;
