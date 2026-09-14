/**
 * Topic 6 FAQ Assessment Questions:
 * "The Three Modes of git reset: --soft, --mixed, and --hard"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t6-q1",
    "question": "Which `git reset` mode moves HEAD to the target commit while leaving both the Index and Working Tree completely untouched?",
    "shortAnswer": "`--soft`",
    "options": [
      "`--soft`",
      "`--mixed`",
      "`--hard`",
      "`--keep`"
    ],
    "answer": "`--soft`",
    "explanation": "`git reset --soft` only modifies the HEAD branch reference, leaving changes staged in the Index.",
    "hint": "Soft is the gentlest reset option.",
    "level": "basic",
    "codeExample": "git reset --soft HEAD~1"
  },
  {
    "id": "undo-t6-q2",
    "question": "What is the primary practical use case for `git reset --soft HEAD~n`?",
    "shortAnswer": "Squashing several messy, exploratory commits into a single clean commit before sharing or submitting a PR.",
    "options": [
      "Squashing multiple recent commits into one clean staged commit",
      "Erasing the entire repository",
      "Publishing a release to npm",
      "Reformatting code with Prettier"
    ],
    "answer": "Squashing multiple recent commits into one clean staged commit",
    "explanation": "Soft reset rolls back the commit count while keeping all modified files staged in the Index, ready for a single `git commit`.",
    "hint": "Squash multiple commits into one.",
    "level": "intermediate",
    "codeExample": "git reset --soft HEAD~3\ngit commit -m \"feat: squashed feature\""
  },
  {
    "id": "undo-t6-q3",
    "question": "What does `git reset --mixed HEAD~1` do to the files that were in the undone commit?",
    "shortAnswer": "It updates the Index so that those changes become unstaged modifications in your working directory.",
    "options": [
      "It moves the changes to the working directory as unstaged modifications (red in git status)",
      "It deletes the files from your hard drive",
      "It creates a zip file backup in `/tmp`",
      "It opens an interactive rebase editor"
    ],
    "answer": "It moves the changes to the working directory as unstaged modifications (red in git status)",
    "explanation": "Mixed reset syncs the Index to match the target commit, so all subsequent edits appear as unstaged working tree changes.",
    "hint": "Mixed mode unstages changes but preserves your physical files.",
    "level": "basic",
    "codeExample": "git reset --mixed HEAD~1 # or simply 'git reset HEAD~1'"
  },
  {
    "id": "undo-t6-q4",
    "question": "What is the primary practical use case for `git reset --mixed HEAD~1`?",
    "shortAnswer": "Splitting a large, monolithic commit into multiple small, atomic commits.",
    "options": [
      "Splitting a single bulky commit into multiple smaller atomic commits",
      "Connecting to a remote database",
      "Encrypting commit messages",
      "Downloading GitHub desktop"
    ],
    "answer": "Splitting a single bulky commit into multiple smaller atomic commits",
    "explanation": "By returning all file changes to the unstaged state, you can selectively `git add` and `git commit` individual logical parts.",
    "hint": "Unstage everything so you can re-stage into atomic pieces.",
    "level": "intermediate",
    "codeExample": "git reset HEAD~1\ngit add auth.js && git commit -m \"feat(auth): login\"\ngit add db.js && git commit -m \"feat(db): schema\""
  },
  {
    "id": "undo-t6-q5",
    "question": "Which `git reset` mode will forcibly overwrite your working directory to match the target commit snapshot?",
    "shortAnswer": "`--hard`",
    "options": [
      "`--hard`",
      "`--soft`",
      "`--mixed`",
      "`--safe`"
    ],
    "answer": "`--hard`",
    "explanation": "`git reset --hard` moves HEAD, updates the Index, AND overwrites the Working Tree with the target commit snapshot.",
    "hint": "Hard is the most aggressive mode.",
    "level": "basic",
    "codeExample": "git reset --hard HEAD~1"
  },
  {
    "id": "undo-t6-q6",
    "question": "If you had uncommitted edits in your working directory and ran `git reset --hard HEAD~1`, can those uncommitted edits be recovered via `git reflog`?",
    "shortAnswer": "No. `git reflog` only tracks commits. Uncommitted working tree changes that were never staged or committed are permanently lost.",
    "options": [
      "No, uncommitted edits never entered Git's object store and cannot be recovered via reflog",
      "Yes, `git reflog` restores all uncommitted files automatically",
      "Yes, by running `git recover --all`",
      "Yes, GitHub automatically keeps a cloud backup"
    ],
    "answer": "No, uncommitted edits never entered Git's object store and cannot be recovered via reflog",
    "explanation": "Git's safety guarantees only apply to data committed or staged into the object database. Working file edits never stored in Git are destroyed.",
    "hint": "Git cannot restore what was never saved in its database.",
    "level": "intermediate",
    "codeExample": "# CAUTION: Uncommitted edits are permanently lost!"
  },
  {
    "id": "undo-t6-q7",
    "question": "What is the output of `git status` immediately following a successful `git reset --soft HEAD~1`?",
    "shortAnswer": "The modified files appear in green under 'Changes to be committed'.",
    "options": [
      "Green text under 'Changes to be committed'",
      "Red text under 'Changes not staged for commit'",
      "'nothing to commit, working tree clean'",
      "A merge conflict prompt"
    ],
    "answer": "Green text under 'Changes to be committed'",
    "explanation": "Because the Index was preserved while HEAD moved backwards, the difference between HEAD and Index shows up as staged changes.",
    "hint": "Staged changes are green.",
    "level": "basic",
    "codeExample": "# Changes to be committed: (in green)"
  },
  {
    "id": "undo-t6-q8",
    "question": "What is the output of `git status` immediately following a successful `git reset --mixed HEAD~1`?",
    "shortAnswer": "The modified files appear in red under 'Changes not staged for commit'.",
    "options": [
      "Red text under 'Changes not staged for commit'",
      "Green text under 'Changes to be committed'",
      "'nothing to commit, working tree clean'",
      "A detached HEAD warning"
    ],
    "answer": "Red text under 'Changes not staged for commit'",
    "explanation": "Because the Index was synced to match the older commit, the modified files on disk appear as unstaged working tree changes.",
    "hint": "Unstaged modifications appear in red.",
    "level": "basic",
    "codeExample": "# Changes not staged for commit: (in red)"
  },
  {
    "id": "undo-t6-q9",
    "question": "What is the output of `git status` immediately following a successful `git reset --hard HEAD~1` (assuming no untracked files existed)?",
    "shortAnswer": "`nothing to commit, working tree clean`",
    "options": [
      "'nothing to commit, working tree clean'",
      "Red text under 'Changes not staged for commit'",
      "Green text under 'Changes to be committed'",
      "A fatal syntax error"
    ],
    "answer": "'nothing to commit, working tree clean'",
    "explanation": "All three trees (HEAD, Index, Working Directory) are synchronized to the exact same target commit snapshot.",
    "hint": "All three trees match, resulting in a clean status.",
    "level": "basic",
    "codeExample": "nothing to commit, working tree clean"
  },
  {
    "id": "undo-t6-q10",
    "question": "Which of the following commands is completely identical to `git reset HEAD~1`?",
    "shortAnswer": "`git reset --mixed HEAD~1`",
    "options": [
      "`git reset --mixed HEAD~1`",
      "`git reset --soft HEAD~1`",
      "`git reset --hard HEAD~1`",
      "`git revert HEAD~1`"
    ],
    "answer": "`git reset --mixed HEAD~1`",
    "explanation": "`--mixed` is the default flag when none is explicitly supplied.",
    "hint": "Mixed is the built-in default.",
    "level": "basic",
    "codeExample": "git reset HEAD~1"
  },
  {
    "id": "undo-t6-q11",
    "question": "How does `git reset --hard` handle untracked files (new files that have never been staged or committed)?",
    "shortAnswer": "It leaves untracked files untouched; untracked files are not tracked in the commit snapshot and require `git clean` to remove.",
    "options": [
      "It leaves untracked files untouched",
      "It deletes untracked files immediately",
      "It stages all untracked files",
      "It commits untracked files to a backup branch"
    ],
    "answer": "It leaves untracked files untouched",
    "explanation": "`git reset --hard` only resets tracked files. Untracked files are ignored by reset and must be cleaned using `git clean`.",
    "hint": "Reset only affects tracked files; use git clean for untracked.",
    "level": "intermediate",
    "codeExample": "# Untracked files remain in working directory after reset --hard"
  },
  {
    "id": "undo-t6-q12",
    "question": "In the classroom at Barrackpore, Abhronila accidentally ran `git reset --hard HEAD~1` on a commit that was already committed. Can she recover the code from that commit?",
    "shortAnswer": "Yes! The commit was committed, so its SHA is recorded in `git reflog`. Running `git reset --hard HEAD@{1}` will restore everything.",
    "options": [
      "Yes! Because it was committed, it is saved in `.git/objects/` and can be restored using `git reflog`",
      "No, hard reset permanently destroys hard drive sectors",
      "Only if she has a physical tape backup",
      "Only if she pays a recovery fee"
    ],
    "answer": "Yes! Because it was committed, it is saved in `.git/objects/` and can be restored using `git reflog`",
    "explanation": "Any committed snapshot is safe in Git's object store. `reflog` reveals its SHA hash for instant recovery.",
    "hint": "Committed work is safe and recoverable via reflog.",
    "level": "intermediate",
    "codeExample": "git reflog\ngit reset --hard HEAD@{1}"
  },
  {
    "id": "undo-t6-q13",
    "question": "What is the command to reset the current branch to match the remote `origin/main` branch exactly, discarding all local commits and file edits?",
    "shortAnswer": "`git reset --hard origin/main` (after `git fetch origin`).",
    "options": [
      "`git reset --hard origin/main`",
      "`git reset --soft origin/main`",
      "`git checkout origin/main`",
      "`git push --force`"
    ],
    "answer": "`git reset --hard origin/main`",
    "explanation": "This discards local divergent commits and syncs HEAD, Index, and Working Tree with the fetched remote branch state.",
    "hint": "Hard reset to the remote tracking branch.",
    "level": "intermediate",
    "codeExample": "git fetch origin\ngit reset --hard origin/main"
  },
  {
    "id": "undo-t6-q14",
    "question": "What flag can be used with `git reset` that acts like `--hard` but keeps working tree changes that don't conflict?",
    "shortAnswer": "`--merge` or `--keep`",
    "options": [
      "`--merge` (or `--keep`)",
      "`--safe`",
      "`--try`",
      "`--preserve`"
    ],
    "answer": "`--merge` (or `--keep`)",
    "explanation": "`--merge` resets Index and updates Working Tree files that are different between the target commit and HEAD, but aborts if it would overwrite unstaged modifications.",
    "hint": "Look for merge/keep modes.",
    "level": "advanced",
    "codeExample": "git reset --merge HEAD~1"
  },
  {
    "id": "undo-t6-q15",
    "question": "If you want to unstage all files in your staging area without losing any local modifications, which command should you use?",
    "shortAnswer": "`git reset` (or `git reset HEAD` or `git restore --staged .`).",
    "options": [
      "`git reset` (or `git reset HEAD`)",
      "`git reset --hard`",
      "`git commit --amend`",
      "`git clean -f`"
    ],
    "answer": "`git reset` (or `git reset HEAD`)",
    "explanation": "`git reset` defaults to `--mixed HEAD`, resetting the Index to match HEAD and leaving working files intact.",
    "hint": "Unstage without touching disk files.",
    "level": "basic",
    "codeExample": "git reset"
  },
  {
    "id": "undo-t6-q16",
    "question": "What happens if you run `git reset --soft` to an arbitrary commit SHA from 5 commits ago?",
    "shortAnswer": "HEAD is rewound 5 commits, and all cumulative changes from all 5 commits are staged together in the Index.",
    "options": [
      "All cumulative changes from the last 5 commits are placed together into the Staging Area",
      "Git will prompt for 5 separate commit messages",
      "Only the 5th commit changes are staged",
      "Git reports an invalid reference error"
    ],
    "answer": "All cumulative changes from the last 5 commits are placed together into the Staging Area",
    "explanation": "Because HEAD moved back 5 commits while the Index retained the state of HEAD before the reset, the diff between HEAD and Index encompasses all 5 commits.",
    "hint": "All 5 commits' diffs are staged in the Index.",
    "level": "intermediate",
    "codeExample": "git reset --soft HEAD~5"
  },
  {
    "id": "undo-t6-q17",
    "question": "Which reset mode is safest when you are unsure about what changes you might discard?",
    "shortAnswer": "`--soft` or `--mixed`, because neither modifies your physical working directory files.",
    "options": [
      "`--soft` or `--mixed`, as neither deletes working tree files",
      "`--hard`",
      "`--force`",
      "None of them are safe"
    ],
    "answer": "`--soft` or `--mixed`, as neither deletes working tree files",
    "explanation": "Both `--soft` and `--mixed` guarantee that no code edits on disk will be lost.",
    "hint": "Soft and mixed preserve working files.",
    "level": "basic",
    "codeExample": "# Safe: git reset --mixed HEAD~1"
  },
  {
    "id": "undo-t6-q18",
    "question": "Can `git reset --soft` be used with a specific file path (e.g. `git reset --soft HEAD file.txt`)?",
    "shortAnswer": "No. Passing paths to `git reset` cannot be combined with `--soft` or `--hard`; pathspec reset only operates on the Index.",
    "options": [
      "No, pathspec reset does not accept `--soft` or `--hard` options",
      "Yes, it stages the specific file only",
      "Yes, it resets only that file to soft mode",
      "Only in Git version 1.8"
    ],
    "answer": "No, pathspec reset does not accept `--soft` or `--hard` options",
    "explanation": "When specifying a file path, `git reset` updates only the staging entry for that path; mode flags are disallowed.",
    "hint": "Pathspec reset only modifies the staging index.",
    "level": "advanced",
    "codeExample": "# Invalid: git reset --soft HEAD file.txt\n# Valid:   git reset HEAD file.txt"
  },
  {
    "id": "undo-t6-q19",
    "question": "How can you view the history of HEAD pointer changes caused by various resets?",
    "shortAnswer": "`git reflog show HEAD`",
    "options": [
      "`git reflog`",
      "`git log --resets`",
      "`git show --history`",
      "`git status -v`"
    ],
    "answer": "`git reflog`",
    "explanation": "`git reflog` shows every single transition of HEAD, including `reset: moving to HEAD~1` entries.",
    "hint": "Reflog records all HEAD pointer jumps.",
    "level": "basic",
    "codeExample": "git reflog"
  },
  {
    "id": "undo-t6-q20",
    "question": "Why should you never use `git reset --hard` on a branch that has been pushed to a shared remote without team coordination?",
    "shortAnswer": "Because it rewinds your local pointer, which would require a force-push to update the remote, disrupting everyone on the team.",
    "options": [
      "Because updating the remote would require a force-push that disrupts and diverges teammates' repositories",
      "Because GitHub blocks all IP addresses that perform resets",
      "Because hard reset deletes the remote repository on the server",
      "Because it invalidates your SSH keys"
    ],
    "answer": "Because updating the remote would require a force-push that disrupts and diverges teammates' repositories",
    "explanation": "Reset rewrites history. Pushing rewritten history over a shared branch requires force-pushing, which causes collaborator conflicts.",
    "hint": "Reset rewrites history; use revert for shared branches.",
    "level": "basic",
    "codeExample": "# On shared branches, use git revert instead!"
  },
  {
    "id": "undo-t6-q21",
    "question": "Suppose Sachin ran `git add .` and staged 10 files. He then realized he only wanted to commit 2 files. Which reset mode should he run?",
    "shortAnswer": "`git reset` (or `git reset --mixed`), then stage the 2 specific files with `git add`.",
    "options": [
      "`git reset` (default mixed) to unstage all files, then `git add` the desired 2 files",
      "`git reset --hard`",
      "`git reset --soft`",
      "`git commit --amend`"
    ],
    "answer": "`git reset` (default mixed) to unstage all files, then `git add` the desired 2 files",
    "explanation": "Mixed reset clears the staging area without destroying his edits in the working tree, allowing clean selective staging.",
    "hint": "Clear staging area without losing edits.",
    "level": "basic",
    "codeExample": "git reset\ngit add file1.js file2.js\ngit commit -m \"feat: selective commit\""
  },
  {
    "id": "undo-t6-q22",
    "question": "What happens if you run `git reset --hard HEAD` (pointing to the current HEAD)?",
    "shortAnswer": "It discards all uncommitted modifications in both the Index and Working Tree, returning the repository to a clean state matching HEAD.",
    "options": [
      "It wipes all staged and unstaged changes in tracked files, reverting everything to match the last commit",
      "It deletes the last commit",
      "It creates a new commit called HEAD",
      "Nothing happens"
    ],
    "answer": "It wipes all staged and unstaged changes in tracked files, reverting everything to match the last commit",
    "explanation": "Because HEAD is not moving, only Phases 2 and 3 occur: Index and Working Tree are forcefully synced to current HEAD.",
    "hint": "Instant cleanup of all uncommitted tracked changes.",
    "level": "intermediate",
    "codeExample": "git reset --hard HEAD # Wipes all uncommitted edits in tracked files"
  },
  {
    "id": "undo-t6-q23",
    "question": "True or False: `git reset --soft HEAD~1` modifies the actual file content on your hard disk.",
    "shortAnswer": "False. It leaves the physical files on disk 100% untouched.",
    "options": [
      "False; it only updates the HEAD commit pointer",
      "True; it reformats the files to UTF-8",
      "True; it comments out new code",
      "False; but it deletes empty directories"
    ],
    "answer": "False; it only updates the HEAD commit pointer",
    "explanation": "`--soft` does not touch the Staging Index or the physical Working Directory.",
    "hint": "Soft only moves the HEAD ref.",
    "level": "basic",
    "codeExample": "# Physical files are identical before and after --soft"
  },
  {
    "id": "undo-t6-q24",
    "question": "What is the recommended defensive workflow when you need to perform `git reset --hard` but want a safety net for your uncommitted changes?",
    "shortAnswer": "Run `git stash` or `git commit` to a temporary backup branch first.",
    "options": [
      "Create a temporary safety branch or run `git stash -u` before executing the hard reset",
      "Take a screenshot of your code",
      "Disconnect your network cable",
      "Copy-paste code into Notepad"
    ],
    "answer": "Create a temporary safety branch or run `git stash -u` before executing the hard reset",
    "explanation": "Stashing or creating a temporary backup branch stores your working directory state in Git's database, ensuring zero possibility of data loss.",
    "hint": "Stash or commit to a backup branch before hard reset.",
    "level": "intermediate",
    "codeExample": "git branch backup-before-reset\ngit reset --hard HEAD~1"
  },
  {
    "id": "undo-t6-q25",
    "question": "In summary, match each reset mode to its primary use case:",
    "shortAnswer": "--soft: Squashing/re-committing; --mixed: Splitting/re-staging; --hard: Discarding changes completely.",
    "options": [
      "--soft: Squashing/re-packaging commits; --mixed: Splitting commits/re-staging; --hard: Completely discarding work",
      "--soft: Push; --mixed: Fetch; --hard: Clone",
      "--soft: Merging; --mixed: Rebasing; --hard: Cherry-picking",
      "--soft: Documentation; --mixed: Tests; --hard: Production code"
    ],
    "answer": "--soft: Squashing/re-packaging commits; --mixed: Splitting commits/re-staging; --hard: Completely discarding work",
    "explanation": "This mnemonic encapsulates the professional use cases for each reset mode.",
    "hint": "Soft = Squash, Mixed = Split, Hard = Discard.",
    "level": "basic",
    "codeExample": "# Soft: Squash | Mixed: Split | Hard: Discard"
  }
];

export default questions;
