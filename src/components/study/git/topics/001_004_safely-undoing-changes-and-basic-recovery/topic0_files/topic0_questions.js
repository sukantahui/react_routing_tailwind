/**
 * Topic 0 FAQ Assessment Questions:
 * "The Decision Matrix for Undoing Changes in Git"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t0-q1",
    "question": "What is the very first step in Git's Decision Matrix before attempting any undo command?",
    "shortAnswer": "Run `git status` to identify whether the target changes reside in the Working Tree, Staging Area, Local Commit, or Remote Branch.",
    "options": [
      "Run `git status` to identify the exact state and location of changes in the Three-Tree Architecture",
      "Immediately run `git reset --hard` to clean up the repository",
      "Delete the `.git` directory and re-clone the project",
      "Switch to a new branch without checking current status"
    ],
    "answer": "Run `git status` to identify the exact state and location of changes in the Three-Tree Architecture",
    "explanation": "Choosing the correct undo command depends entirely on where the unwanted change is located. Running `git status` (or `git status -s`) reveals whether files are unstaged, staged in index, committed locally, or already pushed upstream.",
    "hint": "Think about diagnosis before prescribing medicine.",
    "level": "basic",
    "codeExample": "# Step 1: Diagnose your current repository state:\ngit status -s"
  },
  {
    "id": "undo-t0-q2",
    "question": "Which command is recommended in modern Git (2.23+) to discard unstaged modifications in the Working Tree?",
    "shortAnswer": "`git restore <file>` (or `git restore .` for all files).",
    "options": [
      "`git restore <file>`",
      "`git undo <file>`",
      "`git cancel <file>`",
      "`git remove <file>`"
    ],
    "answer": "`git restore <file>`",
    "explanation": "Introduced in Git 2.23 to unburden `git checkout`, `git restore <file>` replaces the working tree file with the version in the Staging Area or HEAD.",
    "hint": "It restores the file back to its last staged state.",
    "level": "basic",
    "codeExample": "git restore src/components/Cart.jsx"
  },
  {
    "id": "undo-t0-q3",
    "question": "Which command is used in modern Git to remove a file from the Staging Area without deleting its working tree edits?",
    "shortAnswer": "`git restore --staged <file>`.",
    "options": [
      "`git restore --staged <file>`",
      "`git rm <file>`",
      "`git clean -f <file>`",
      "`git stash drop <file>`"
    ],
    "answer": "`git restore --staged <file>`",
    "explanation": "`git restore --staged <file>` (or `-S`) copies the file state from HEAD into the Index, effectively unstaging it while leaving your local modifications intact in your working directory.",
    "hint": "Notice the `--staged` flag.",
    "level": "basic",
    "codeExample": "git restore --staged src/config/database.json"
  },
  {
    "id": "undo-t0-q4",
    "question": "What is the primary risk of using `git reset --hard` on uncommitted working tree changes?",
    "shortAnswer": "Uncommitted, unstaged modifications are permanently deleted and CANNOT be recovered because they were never stored in Git's object database.",
    "options": [
      "Uncommitted changes are permanently lost with no chance of recovery via git reflog",
      "Git creates an automatic backup branch called `backup-head`",
      "Changes are stored in `.git/trash` for 30 days",
      "The command prompts a confirmation dialog for each file"
    ],
    "answer": "Uncommitted changes are permanently lost with no chance of recovery via git reflog",
    "explanation": "Git only protects data that has been saved into its object store via `git add` or `git commit`. Running `git reset --hard` overwrites the working tree with snapshot data, obliterating uncommitted edits forever.",
    "hint": "Git cannot restore what it never knew about.",
    "level": "intermediate",
    "codeExample": "# WARNING: Never run this with uncommitted work:\ngit reset --hard HEAD"
  },
  {
    "id": "undo-t0-q5",
    "question": "If a bad commit has ALREADY been pushed to a shared public branch on GitHub, what is the safest undo strategy?",
    "shortAnswer": "Use `git revert <commit-sha>` to create a new forward-moving commit that applies the inverse diff.",
    "options": [
      "Use `git revert <commit>` to create an inverse commit without rewriting public history",
      "Use `git reset --hard` and force push (`git push -f`) to erase history for all teammates",
      "Delete the repository on GitHub and recreate it",
      "Manually edit `.git/refs/heads/main`"
    ],
    "answer": "Use `git revert <commit>` to create an inverse commit without rewriting public history",
    "explanation": "`git revert` generates a new commit that undoes the changes of a target commit. Because it adds a new commit to the DAG rather than rewriting existing commits, collaborators won't suffer from diverged histories.",
    "hint": "Always move forward on shared branches.",
    "level": "intermediate",
    "codeExample": "git revert 8a1f3c4 -m \"revert: roll back broken discount logic\""
  },
  {
    "id": "undo-t0-q6",
    "question": "What does the Decision Matrix recommend when you just committed locally and realize you forgot to add a file or made a typo in the commit message?",
    "shortAnswer": "Stage the missing file and run `git commit --amend`.",
    "options": [
      "Stage the file and run `git commit --amend` to update the latest local commit",
      "Run `git reset --hard HEAD~5`",
      "Run `git checkout master`",
      "Create a new repository"
    ],
    "answer": "Stage the file and run `git commit --amend` to update the latest local commit",
    "explanation": "`git commit --amend` combines staged changes with the previous commit and allows editing the commit message, replacing the tip of the current branch locally.",
    "hint": "Amend means to modify or update the most recent commit.",
    "level": "basic",
    "codeExample": "git add forgotten-file.js\ngit commit --amend --no-edit"
  },
  {
    "id": "undo-t0-q7",
    "question": "In the 4-level Git Decision Matrix, match the state to the recommended command: 'Unstaged Working Tree Edits'.",
    "shortAnswer": "`git restore <file>`",
    "options": [
      "`git restore <file>`",
      "`git restore --staged <file>`",
      "`git commit --amend`",
      "`git revert <commit>`"
    ],
    "answer": "`git restore <file>`",
    "explanation": "For unstaged files (tracked files modified in working tree), `git restore <file>` discards working tree changes and synchronizes the file with the index.",
    "hint": "Working tree unstaged -> restore file.",
    "level": "basic",
    "codeExample": "git restore style.css"
  },
  {
    "id": "undo-t0-q8",
    "question": "In the Git Decision Matrix, match the state: 'Changes Staged in Index but not yet committed'.",
    "shortAnswer": "`git restore --staged <file>`",
    "options": [
      "`git restore --staged <file>`",
      "`git restore <file>`",
      "`git push --force`",
      "`git revert <commit>`"
    ],
    "answer": "`git restore --staged <file>`",
    "explanation": "For staged files, `git restore --staged <file>` removes the file from the index while keeping working tree edits intact.",
    "hint": "Staged in index -> restore --staged.",
    "level": "basic",
    "codeExample": "git restore --staged src/api.js"
  },
  {
    "id": "undo-t0-q9",
    "question": "In the Git Decision Matrix, match the state: 'Private Local Commit not yet pushed to remote'.",
    "shortAnswer": "`git reset --soft HEAD~1` or `git reset --mixed HEAD~1`.",
    "options": [
      "`git reset --soft HEAD~1` or `git reset --mixed HEAD~1` (or `git commit --amend`)",
      "`git revert` only",
      "`git clean -fdx`",
      "`git fetch --all`"
    ],
    "answer": "`git reset --soft HEAD~1` or `git reset --mixed HEAD~1` (or `git commit --amend`)",
    "explanation": "Because the commit is private and unshared, rewinding HEAD with `git reset` or amending with `--amend` is safe and clean.",
    "hint": "Private local commits can be safely reset or amended.",
    "level": "intermediate",
    "codeExample": "# Move HEAD back 1 commit but keep changes staged:\ngit reset --soft HEAD~1"
  },
  {
    "id": "undo-t0-q10",
    "question": "Why is `git reset --hard` considered dangerous for public/shared branches?",
    "shortAnswer": "It rewrites history by moving the branch pointer back, causing divergent histories and merge conflicts for all teammates who pulled the commits.",
    "options": [
      "It rewrites history, causing remote rejection and desynchronizing collaborator repositories",
      "It deletes the entire remote GitHub repository automatically",
      "It makes Git crash on Windows",
      "It locks the repository in read-only mode"
    ],
    "answer": "It rewrites history, causing remote rejection and desynchronizing collaborator repositories",
    "explanation": "When you reset a public branch and force-push, any teammate with the old commit hash will encounter divergence errors upon their next fetch/pull.",
    "hint": "Shared history must remain immutable.",
    "level": "advanced",
    "codeExample": "# On public branches, NEVER force-push reset history:\n# Use git revert instead"
  },
  {
    "id": "undo-t0-q11",
    "question": "What command is used to remove untracked, newly created scratch files from the working directory?",
    "shortAnswer": "`git clean -f` (with `-n` dry run first).",
    "options": [
      "`git clean -f`",
      "`git restore --untracked`",
      "`git reset --untracked`",
      "`git discard --all`"
    ],
    "answer": "`git clean -f`",
    "explanation": "`git clean` removes untracked files from the working tree. Git requires the `-f` (force) flag by default to prevent accidental data deletion.",
    "hint": "Clean is used for untracked files.",
    "level": "intermediate",
    "codeExample": "# Always preview first:\ngit clean -nd\n# Then execute:\ngit clean -fd"
  },
  {
    "id": "undo-t0-q12",
    "question": "If a developer accidentally ran `git commit` with an incorrect message, which is the most non-destructive fix locally?",
    "shortAnswer": "`git commit --amend -m \"correct message\"`.",
    "options": [
      "`git commit --amend -m \"correct message\"`",
      "`git reset --hard HEAD~1` followed by retyping the code",
      "`git revert HEAD`",
      "`git init`"
    ],
    "answer": "`git commit --amend -m \"correct message\"`",
    "explanation": "Amending updates the commit object's message in-place without touching working tree files or unstaging anything.",
    "hint": "Amend lets you replace the commit message directly.",
    "level": "basic",
    "codeExample": "git commit --amend -m \"docs: fix spelling in README\""
  },
  {
    "id": "undo-t0-q13",
    "question": "What is the key difference between discarding changes with `git restore` and unstaging with `git restore --staged`?",
    "shortAnswer": "`git restore` destroys working tree modifications, while `git restore --staged` preserves working tree edits and only updates the index.",
    "options": [
      "`git restore` discards working tree edits; `git restore --staged` keeps working tree edits and only unstages from index",
      "There is no difference; they are aliases",
      "`git restore --staged` deletes the file from disk",
      "`git restore` requires internet connectivity"
    ],
    "answer": "`git restore` discards working tree edits; `git restore --staged` keeps working tree edits and only unstages from index",
    "explanation": "Understanding this distinction is vital: `git restore` alters files on disk, while `git restore --staged` alters Git's staging register without losing your code edits.",
    "hint": "Restoring index vs restoring disk files.",
    "level": "intermediate",
    "codeExample": "# Unstage without losing edits:\ngit restore --staged server.js\n# Discard disk edits permanently:\ngit restore server.js"
  },
  {
    "id": "undo-t0-q14",
    "question": "Which of the following scenarios is NOT recoverable via `git reflog`?",
    "shortAnswer": "Uncommitted local modifications in the Working Tree that were overwritten by `git restore .` or `git reset --hard`.",
    "options": [
      "Uncommitted, unstaged modifications overwritten before any `git add` or `git commit`",
      "A branch deleted after being committed locally",
      "A commit reset with `git reset --hard HEAD~3`",
      "An amended commit whose previous SHA was replaced"
    ],
    "answer": "Uncommitted, unstaged modifications overwritten before any `git add` or `git commit`",
    "explanation": "Git reflog records movements of HEAD and branch refs. If file edits were never committed or staged, Git has no record of them in the object store.",
    "hint": "Reflog only tracks committed reference changes.",
    "level": "advanced",
    "codeExample": "# Reflog recovers COMMITTED states only:\ngit reflog"
  },
  {
    "id": "undo-t0-q15",
    "question": "When should a developer choose `git reset --soft HEAD~1` over `git reset --mixed HEAD~1`?",
    "shortAnswer": "When you want to keep all changes from the undone commit already staged in the Index, ready for an immediate new commit.",
    "options": [
      "When you want changes to remain staged in the Index so you can immediately recommit with adjustments",
      "When you want to wipe out all changes completely from disk",
      "When you are on a shared production branch",
      "When Git is running in offline mode"
    ],
    "answer": "When you want changes to remain staged in the Index so you can immediately recommit with adjustments",
    "explanation": "`--soft` rewinds HEAD but leaves both the Index and Working Tree untouched. All changes from the undone commit stay staged green in `git status`.",
    "hint": "Soft keeps staging area intact.",
    "level": "intermediate",
    "codeExample": "git reset --soft HEAD~1\ngit status -s"
  },
  {
    "id": "undo-t0-q16",
    "question": "What is the default reset mode when running `git reset HEAD~1` without any mode flags?",
    "shortAnswer": "`--mixed` (moves HEAD and updates Index, but leaves Working Tree files intact).",
    "options": [
      "`--mixed`",
      "`--soft`",
      "`--hard`",
      "`--merge`"
    ],
    "answer": "`--mixed`",
    "explanation": "If omitted, `git reset` defaults to `--mixed`. It unstages the changes from index back to working tree unstaged state (red in `git status`).",
    "hint": "Mixed is the safe middle ground default.",
    "level": "basic",
    "codeExample": "git reset HEAD~1  # Equivalent to git reset --mixed HEAD~1"
  },
  {
    "id": "undo-t0-q17",
    "question": "In the Decision Matrix, how does `git restore --source=HEAD~2 <file>` work?",
    "shortAnswer": "It restores the working tree file to the exact state it was in 2 commits ago, without moving the branch pointer or HEAD.",
    "options": [
      "It checks out that specific file from 2 commits ago into the working tree without moving HEAD",
      "It deletes the last 2 commits from the repository",
      "It reverts the whole repository back 2 commits",
      "It creates a new branch named HEAD~2"
    ],
    "answer": "It checks out that specific file from 2 commits ago into the working tree without moving HEAD",
    "explanation": "The `--source` flag allows cherry-picking historical file snapshots directly into the current working tree.",
    "hint": "Source specifies which commit snapshot to pull the file from.",
    "level": "advanced",
    "codeExample": "git restore --source=HEAD~2 index.html"
  },
  {
    "id": "undo-t0-q18",
    "question": "Why should `git checkout` NOT be used for file restoration in modern Git tutorials and projects?",
    "shortAnswer": "`git checkout` was overloaded with multiple conflicting duties (switching branches, creating branches, restoring files, detaching HEAD).",
    "options": [
      "`git checkout` was historically overloaded; Git 2.23 introduced dedicated commands `git switch` and `git restore` for clarity and safety",
      "`git checkout` is completely deprecated and removed in Git 2.40",
      "`git checkout` cannot run on Windows systems",
      "`git checkout` requires root administrator privileges"
    ],
    "answer": "`git checkout` was historically overloaded; Git 2.23 introduced dedicated commands `git switch` and `git restore` for clarity and safety",
    "explanation": "To prevent beginners from accidentally switching branches when they meant to discard a file (or vice versa), Git decoupled `git checkout` into `git switch` (for branches) and `git restore` (for files).",
    "hint": "Separation of concerns in CLI design.",
    "level": "intermediate",
    "codeExample": "# Modern recommended syntax:\ngit restore app.js\ngit switch feature-login"
  },
  {
    "id": "undo-t0-q19",
    "question": "What is the effect of running `git revert -n <commit>` (or `--no-commit`)?",
    "shortAnswer": "It applies the inverse changes of the specified commit to the Working Tree and Staging Area, but pauses before making the commit.",
    "options": [
      "It stages the inverted changes without automatically committing, allowing batching or inspection",
      "It deletes the commit permanently without creating any history",
      "It reverts without checking for conflicts",
      "It aborts any ongoing rebase"
    ],
    "answer": "It stages the inverted changes without automatically committing, allowing batching or inspection",
    "explanation": "The `-n` / `--no-commit` flag lets developers revert multiple commits in one clean combined revert commit or test the inverted changes before committing.",
    "hint": "-n stands for no-commit.",
    "level": "advanced",
    "codeExample": "git revert -n HEAD~2\ngit revert -n HEAD~1\ngit commit -m \"revert: roll back experimental auth pipeline\""
  },
  {
    "id": "undo-t0-q20",
    "question": "Which table summary accurately maps the Three-Tree Architecture to the undo state?",
    "shortAnswer": "Working Tree -> `git restore`; Index -> `git restore --staged`; Local HEAD -> `git reset` / `--amend`; Remote -> `git revert`.",
    "options": [
      "Working Tree: `git restore`; Index: `git restore --staged`; Local HEAD: `git reset`; Remote: `git revert`",
      "Working Tree: `git push`; Index: `git clean`; Local HEAD: `git pull`; Remote: `git init`",
      "Working Tree: `git revert`; Index: `git restore`; Local HEAD: `git clean`; Remote: `git reset`",
      "Working Tree: `git merge`; Index: `git fetch`; Local HEAD: `git branch`; Remote: `git clone`"
    ],
    "answer": "Working Tree: `git restore`; Index: `git restore --staged`; Local HEAD: `git reset`; Remote: `git revert`",
    "explanation": "This 4-tier mapping forms the bedrock of defensive version control and prevents catastrophic data loss.",
    "hint": "Remember the 4 distinct boundaries in the workflow.",
    "level": "intermediate",
    "codeExample": "# 1. Working Tree: git restore <file>\n# 2. Staging Index: git restore --staged <file>\n# 3. Local Commit: git reset [--soft|--mixed|--hard]\n# 4. Public Remote: git revert <commit>"
  },
  {
    "id": "undo-t0-q21",
    "question": "What happens if you run `git restore --staged --worktree <file>` simultaneously?",
    "shortAnswer": "It discards both the staged changes in the Index AND any unstaged changes in the Working Tree, matching the file to HEAD.",
    "options": [
      "It resets both Index and Working Tree for that file to the state of HEAD in one command",
      "It produces a syntax error because the flags are mutually exclusive",
      "It deletes the file permanently from the repository tracking",
      "It creates a patch file"
    ],
    "answer": "It resets both Index and Working Tree for that file to the state of HEAD in one command",
    "explanation": "Passing `--staged` and `--worktree` (or `-S -W`) synchronizes both trees directly from HEAD for the specified path.",
    "hint": "Both target trees are restored together.",
    "level": "advanced",
    "codeExample": "git restore -S -W src/utils.js"
  },
  {
    "id": "undo-t0-q22",
    "question": "How does Sukanta Sir describe `git revert` to students in Barrackpore?",
    "shortAnswer": "Like writing a compensatory credit/debit entry in an accounting journal rather than tearing out page pages from the ledger.",
    "options": [
      "Like writing an adjustment voucher in a financial ledger that leaves the audit trail intact while correcting the balance",
      "Like using white-out liquid on a blackboard",
      "Like throwing the hard drive away",
      "Like copying files to a USB pen drive"
    ],
    "answer": "Like writing an adjustment voucher in a financial ledger that leaves the audit trail intact while correcting the balance",
    "explanation": "In accounting (and software governance), you never destroy historical records. You post an offsetting entry. `git revert` is the exact mathematical inverse entry in Git's ledger.",
    "hint": "Auditable accounting principles applied to version control.",
    "level": "basic",
    "codeExample": "# Accounting analogy: Credit +100 -> Debit -100\ngit revert HEAD"
  },
  {
    "id": "undo-t0-q23",
    "question": "What should a developer do if `git clean -n` lists a file they actually want to keep?",
    "shortAnswer": "Add the file to `.gitignore` or stage it with `git add <file>` before executing `git clean -f`.",
    "options": [
      "Add it to `.gitignore` or stage it with `git add` before running force clean",
      "Run `git clean -f` anyway and hope for the best",
      "Close the terminal window",
      "Rename the `.git` folder"
    ],
    "answer": "Add it to `.gitignore` or stage it with `git add` before running force clean",
    "explanation": "Dry-run (`-n`) exists precisely to give you this safety check. If a file is listed that shouldn't be deleted, protect it by tracking it or ignoring it.",
    "hint": "Dry run prevents accidental file deletion.",
    "level": "intermediate",
    "codeExample": "echo 'scratch_notes.txt' >> .gitignore\ngit clean -fd"
  },
  {
    "id": "undo-t0-q24",
    "question": "Why is Git's object store described as an 'append-only' database?",
    "shortAnswer": "Git rarely deletes objects immediately; operations like amends, reverts, and soft resets merely write new objects and update movable pointer references.",
    "options": [
      "Git creates new commit/tree/blob objects and moves pointer references, leaving old objects intact in the object database until garbage collection",
      "Git can only write files to CD-ROM media",
      "Git never allows files to be modified",
      "Git only saves data once a day at midnight"
    ],
    "answer": "Git creates new commit/tree/blob objects and moves pointer references, leaving old objects intact in the object database until garbage collection",
    "explanation": "Because Git is append-only, almost any committed state can be recovered using `git reflog` and `git cat-file`, as long as uncommitted files were not discarded.",
    "hint": "Pointers move, but underlying commit objects persist.",
    "level": "advanced",
    "codeExample": "# Check orphaned/dangling objects:\ngit fsck --lost-found"
  },
  {
    "id": "undo-t0-q25",
    "question": "Which of the following commands represents a dangerous anti-pattern for a developer wanting to unstage a single file?",
    "shortAnswer": "Running `git reset --hard` when all they needed was `git restore --staged <file>`.",
    "options": [
      "Running `git reset --hard` (which destroys all uncommitted work across the entire project)",
      "Running `git restore --staged <file>`",
      "Running `git status`",
      "Running `git diff --staged`"
    ],
    "answer": "Running `git reset --hard` (which destroys all uncommitted work across the entire project)",
    "explanation": "Using a nuclear command (`git reset --hard`) for a precision surgical task (unstaging one file) is the #1 cause of catastrophic local code loss among beginners.",
    "hint": "Never use a sledgehammer to crack a walnut.",
    "level": "basic",
    "codeExample": "# DANGEROUS OVERKILL: git reset --hard\n# SAFE PRECISION: git restore --staged <file>"
  }
];

export default questions;
