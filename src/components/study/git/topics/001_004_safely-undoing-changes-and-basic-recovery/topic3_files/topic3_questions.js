/**
 * Topic 3 FAQ Assessment Questions:
 * "Amending the Most Recent Commit: git commit --amend"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t3-q1",
    "question": "What does `git commit --amend` do internally in Git's object store?",
    "shortAnswer": "It creates a brand new commit object that incorporates staged changes and/or updated commit messages, pointing to the same parent as the previous commit, and updates the branch HEAD to point to this new commit.",
    "options": [
      "It creates a new commit object with a new SHA-1 hash and updates HEAD to point to it, replacing the tip of the current branch",
      "It edits the existing commit object in-place without changing its SHA-1 hash",
      "It deletes the commit and reverts the repository to the initial commit",
      "It creates a branch called amend-backup"
    ],
    "answer": "It creates a new commit object with a new SHA-1 hash and updates HEAD to point to it, replacing the tip of the current branch",
    "explanation": "Because Git commit objects are cryptographically immutable, amending cannot edit a commit in-place. Instead, Git writes a new commit object with a new hash and moves the branch ref.",
    "hint": "Git objects are immutable; amending produces a replacement commit object.",
    "level": "basic",
    "codeExample": "git commit --amend -m \"feat(auth): add forgotten JWT interceptor\""
  },
  {
    "id": "undo-t3-q2",
    "question": "How can you amend a commit to add a newly staged file WITHOUT modifying the existing commit message?",
    "shortAnswer": "`git commit --amend --no-edit`",
    "options": [
      "`git commit --amend --no-edit`",
      "`git commit --amend -s`",
      "`git commit --amend --keep-message`",
      "`git commit --fast-amend`"
    ],
    "answer": "`git commit --amend --no-edit`",
    "explanation": "The `--no-edit` flag tells Git to reuse the existing commit message verbatim, avoiding opening the default text editor.",
    "hint": "Notice the `--no-edit` flag.",
    "level": "basic",
    "codeExample": "git add forgotten_test.js\ngit commit --amend --no-edit"
  },
  {
    "id": "undo-t3-q3",
    "question": "When is it completely safe to use `git commit --amend`?",
    "shortAnswer": "When the commit is purely local and has NOT yet been pushed or shared to a remote repository (like GitHub).",
    "options": [
      "When the commit exists only on your local machine and has not been pushed to a remote repository",
      "Only on Friday afternoons",
      "When working directly on the production main branch on GitHub",
      "Only when the internet is disconnected"
    ],
    "answer": "When the commit exists only on your local machine and has not been pushed to a remote repository",
    "explanation": "Amending local unpushed commits keeps history tidy and atomic without disrupting any collaborators.",
    "hint": "Local commits are private and safe to refine.",
    "level": "basic",
    "codeExample": "# Safe local workflow:\ngit commit -m \"wip message\"\n# ... realize mistake ...\ngit commit --amend -m \"feat: proper conventional commit message\""
  },
  {
    "id": "undo-t3-q4",
    "question": "What happens to the old commit object that was replaced by `git commit --amend`?",
    "shortAnswer": "It becomes an unreachable (dangling) object in `.git/objects/`, still accessible via `git reflog` until pruned by garbage collection (`git gc`).",
    "options": [
      "It becomes a dangling object in the object database, recoverable via `git reflog` until garbage collection",
      "It is immediately deleted from disk with zero bytes left",
      "It is emailed to GitHub support",
      "It is permanently moved to the system temp folder"
    ],
    "answer": "It becomes a dangling object in the object database, recoverable via `git reflog` until garbage collection",
    "explanation": "Git's append-only design means old commits are not destroyed immediately. They stay in the reflog for typically 30–90 days.",
    "hint": "Reflog keeps track of the previous HEAD commit hash.",
    "level": "intermediate",
    "codeExample": "git reflog\n# Output will show the previous commit SHA before the amend"
  },
  {
    "id": "undo-t3-q5",
    "question": "How do you change only the commit message of the most recent local commit using an interactive editor?",
    "shortAnswer": "Run `git commit --amend` with no arguments, which opens your configured `$EDITOR`.",
    "options": [
      "Run `git commit --amend` without arguments",
      "Run `git edit message`",
      "Run `git rename HEAD`",
      "Run `git update-log`"
    ],
    "answer": "Run `git commit --amend` without arguments",
    "explanation": "Executing `git commit --amend` without `-m` or `--no-edit` opens your default editor (VS Code, Nano, or Vim) with the previous message pre-populated.",
    "hint": "Opens default editor directly.",
    "level": "basic",
    "codeExample": "git commit --amend"
  },
  {
    "id": "undo-t3-q6",
    "question": "Can `git commit --amend` be used to update author information (e.g. name or email) for the previous commit?",
    "shortAnswer": "Yes, using `git commit --amend --author=\"New Author <email@domain.com>\"` or `--reset-author`.",
    "options": [
      "Yes, using `git commit --amend --author=\"Name <email>\"` or `--reset-author`",
      "No, author information is permanently locked at repository creation",
      "Only by deleting the `.git` directory",
      "Only through GitHub web UI"
    ],
    "answer": "Yes, using `git commit --amend --author=\"Name <email>\"` or `--reset-author`",
    "explanation": "If you committed with the wrong email or identity, `--author` or `--reset-author` recalculates the commit object with updated author metadata.",
    "hint": "Use `--author` or `--reset-author`.",
    "level": "intermediate",
    "codeExample": "git commit --amend --author=\"Sukanta Hui <sukanta@codernaccotax.co.in>\" --no-edit"
  },
  {
    "id": "undo-t3-q7",
    "question": "How does `git commit --amend` affect the Committer timestamp (`GIT_COMMITTER_DATE`)?",
    "shortAnswer": "It updates the Committer timestamp to the current moment, while preserving the original Author timestamp (`GIT_AUTHOR_DATE`) unless `--date` or `--reset-author` is passed.",
    "options": [
      "It updates the Committer Date to the current timestamp while keeping the original Author Date",
      "It sets both timestamps to January 1, 1970",
      "It leaves both timestamps unchanged",
      "It deletes the timestamp field"
    ],
    "answer": "It updates the Committer Date to the current timestamp while keeping the original Author Date",
    "explanation": "Git preserves when the code was originally authored while noting when the commit was amended/committed into the DAG.",
    "hint": "Author Date remains; Committer Date updates.",
    "level": "advanced",
    "codeExample": "git log --format=fuller -n 1"
  },
  {
    "id": "undo-t3-q8",
    "question": "What is a common real-world mistake developers fix using `git commit --amend`?",
    "shortAnswer": "Forgetting to stage a new file, leaving a `console.log` or debug line in code, or fixing a typo in the Conventional Commit subject header.",
    "options": [
      "Adding a forgotten unit test file or fixing a typo in the commit message before submitting a PR",
      "Changing the Git license",
      "Renaming the master branch to main",
      "Updating Node.js version"
    ],
    "answer": "Adding a forgotten unit test file or fixing a typo in the commit message before submitting a PR",
    "explanation": "Amending is the developer's polish step: it prevents messy 'oops fix typo' follow-up commits in the repository history.",
    "hint": "Polishing local commits before code review.",
    "level": "basic",
    "codeExample": "git add test/invoice.test.js\ngit commit --amend --no-edit"
  },
  {
    "id": "undo-t3-q9",
    "question": "Can `git commit --amend` modify commits older than `HEAD` (such as `HEAD~2` or `HEAD~3`)?",
    "shortAnswer": "No. `git commit --amend` strictly modifies only the single most recent commit (`HEAD`). To modify older commits, interactive rebase (`git rebase -i`) is required.",
    "options": [
      "No, `--amend` only operates on `HEAD`; older commits require interactive rebase (`git rebase -i`)",
      "Yes, by passing `git commit --amend HEAD~3`",
      "Yes, with the `--deep` flag",
      "Yes, with `git commit --amend --all`"
    ],
    "answer": "No, `--amend` only operates on `HEAD`; older commits require interactive rebase (`git rebase -i`)",
    "explanation": "Amending is a convenient shortcut for the most recent commit. For deeper history edits, `git rebase -i` is used.",
    "hint": "Amend is strictly for HEAD.",
    "level": "intermediate",
    "codeExample": "# For older commits: git rebase -i HEAD~3"
  },
  {
    "id": "undo-t3-q10",
    "question": "How does Debangshu in Barrackpore explain `git commit --amend` to junior learners?",
    "shortAnswer": "Like opening the envelope of an unposted letter, slipping in a forgotten photograph, sealing a fresh envelope, and writing a clean address on the front.",
    "options": [
      "Like opening an unposted letter envelope to insert a forgotten photo before mailing it",
      "Like burning the letter and writing a book",
      "Like sending an email attachment",
      "Like buying stamps from the post office"
    ],
    "answer": "Like opening an unposted letter envelope to insert a forgotten photo before mailing it",
    "explanation": "The letter has not left your desk (unpushed). You can unseal, update, and reseal it with zero embarrassment.",
    "hint": "Unposted letter envelope analogy.",
    "level": "basic",
    "codeExample": "# Unposted envelope -> amend locally before sending"
  },
  {
    "id": "undo-t3-q11",
    "question": "What happens if you have nothing staged in the Index and run `git commit --amend -m \"new message\"`?",
    "shortAnswer": "Git updates only the commit message of `HEAD`, keeping the exact same tree snapshot of files.",
    "options": [
      "It updates only the commit message while keeping the code changes identical",
      "Git throws an error saying 'nothing to commit'",
      "Git deletes the commit",
      "Git creates an empty commit"
    ],
    "answer": "It updates only the commit message while keeping the code changes identical",
    "explanation": "If no staged changes exist, Git reuses the tree object of the previous commit and creates a new commit object with the new message.",
    "hint": "Reuses existing tree with new message.",
    "level": "basic",
    "codeExample": "git commit --amend -m \"docs: fix typos in README\""
  },
  {
    "id": "undo-t3-q12",
    "question": "Why does the SHA-1 commit hash always change when you run `git commit --amend`?",
    "shortAnswer": "Because the SHA-1 hash is computed over the entire commit object header, tree hash, timestamp, author/committer, and message. Changing any field produces a completely new cryptographic checksum.",
    "options": [
      "The SHA-1 hash is a cryptographic checksum of all commit metadata; modifying any field produces a new hash",
      "Because Git generates random hashes on every command",
      "Because Git connects to GitHub to generate IDs",
      "Because the file size changes"
    ],
    "answer": "The SHA-1 hash is a cryptographic checksum of all commit metadata; modifying any field produces a new hash",
    "explanation": "Cryptographic hashing guarantees integrity. Even modifying a single whitespace character in the message produces a radically different hash.",
    "hint": "Cryptographic hash function sensitivity.",
    "level": "intermediate",
    "codeExample": "# Before amend: commit a1b2c3d\n# After amend:  commit f9e8d7c"
  },
  {
    "id": "undo-t3-q13",
    "question": "If you made an accidental commit on the wrong branch (e.g. on `main` instead of `feature`), is `git commit --amend` the right tool?",
    "shortAnswer": "No; `git reset --soft HEAD~1` followed by switching to the feature branch and committing there is the recommended pattern.",
    "options": [
      "No; use `git reset --soft HEAD~1`, switch to the feature branch, and commit there",
      "Yes; `git commit --amend --branch=feature`",
      "Yes; `git commit --amend -b feature`",
      "No; you must delete the repository"
    ],
    "answer": "No; use `git reset --soft HEAD~1`, switch to the feature branch, and commit there",
    "explanation": "Soft reset preserves your staged work while moving HEAD back, allowing you to branch and commit cleanly.",
    "hint": "Soft reset for branch redirection.",
    "level": "intermediate",
    "codeExample": "git reset --soft HEAD~1\ngit switch -c feature-branch\ngit commit -m \"feat: correctly on feature branch\""
  },
  {
    "id": "undo-t3-q14",
    "question": "What option can reset the author date to the current timestamp when amending?",
    "shortAnswer": "`git commit --amend --date=now` (or `--reset-author`).",
    "options": [
      "`git commit --amend --date=now` or `--reset-author`",
      "`git commit --amend --today`",
      "`git commit --amend --refresh-time`",
      "`git commit --amend --clock`"
    ],
    "answer": "`git commit --amend --date=now` or `--reset-author`",
    "explanation": "`--date=now` forces Git to update both Author Date and Committer Date to the current system clock.",
    "hint": "Date flag with now or reset-author.",
    "level": "advanced",
    "codeExample": "git commit --amend --date=now --no-edit"
  },
  {
    "id": "undo-t3-q15",
    "question": "What happens if you run `git commit --amend` on the very first commit of a brand new repository?",
    "shortAnswer": "Git successfully amends the initial root commit (a commit with zero parents).",
    "options": [
      "It amends the initial root commit without issue",
      "Git throws a 'no parent' fatal error",
      "Git requires a remote repository",
      "Git resets the repository to uninitialized"
    ],
    "answer": "It amends the initial root commit without issue",
    "explanation": "Git can amend root commits just like any other commit; the replacement commit simply has zero parent hashes.",
    "hint": "Root commits can be amended cleanly.",
    "level": "advanced",
    "codeExample": "git commit --amend -m \"feat: amended initial root commit\""
  },
  {
    "id": "undo-t3-q16",
    "question": "If a developer amended a commit and accidentally lost a file they needed from the original commit, how can they recover it?",
    "shortAnswer": "Use `git reflog` to find the SHA-1 of the pre-amend commit (e.g. `HEAD@{1}`) and run `git checkout` / `git restore --source` from that hash.",
    "options": [
      "Find the pre-amend commit SHA in `git reflog` and restore the file using `git restore --source=<old-sha> <file>`",
      "The file is lost permanently with zero recovery options",
      "Reinstall Git",
      "Check the computer's temporary cache"
    ],
    "answer": "Find the pre-amend commit SHA in `git reflog` and restore the file using `git restore --source=<old-sha> <file>`",
    "explanation": "Because the old commit was committed to Git's object store before amending, its SHA is logged in `git reflog`.",
    "hint": "Reflog records pre-amend commit hashes.",
    "level": "advanced",
    "codeExample": "git reflog\n# Look for: HEAD@{1}: commit: ...\ngit restore --source=HEAD@{1} lost_file.js"
  },
  {
    "id": "undo-t3-q17",
    "question": "What is the best practice for commit messages when using `git commit --amend`?",
    "shortAnswer": "Ensure the amended message complies with the Conventional Commits specification (`feat:`, `fix:`, `docs:`) with an imperative summary.",
    "options": [
      "Follow Conventional Commits with a clear type prefix and descriptive imperative summary",
      "Write 'amended stuff' as the message",
      "Leave the message completely blank",
      "Paste the entire diff into the first line"
    ],
    "answer": "Follow Conventional Commits with a clear type prefix and descriptive imperative summary",
    "explanation": "Conventional Commits improve repository auditability, changelog generation, and team communication.",
    "hint": "Conventional Commits standard.",
    "level": "basic",
    "codeExample": "git commit --amend -m \"fix(invoice): correct 18% GST calculation rounding\""
  },
  {
    "id": "undo-t3-q18",
    "question": "Why should you NOT use `git commit --amend` if you have already run `git push origin main`?",
    "shortAnswer": "Because your local branch and the remote branch will have different commit hashes, causing `git push` to be rejected and confusing teammates who pulled the old commit.",
    "options": [
      "It causes divergent histories between local and remote, requiring a disruptive force-push that breaks collaborators' clones",
      "GitHub automatically suspends your repository",
      "Your computer runs out of disk space",
      "Git deletes the remote tracking branch"
    ],
    "answer": "It causes divergent histories between local and remote, requiring a disruptive force-push that breaks collaborators' clones",
    "explanation": "This is the core rule of Git history: Never rewrite commits that have been shared publicly with others.",
    "hint": "Rewriting shared history causes divergence.",
    "level": "intermediate",
    "codeExample": "# On pushed branches: Use 'git revert' instead of amend"
  },
  {
    "id": "undo-t3-q19",
    "question": "What command lets you verify what will be added to the amended commit before running the amend?",
    "shortAnswer": "`git diff --staged`",
    "options": [
      "`git diff --staged`",
      "`git log -p`",
      "`git show`",
      "`git branch -a`"
    ],
    "answer": "`git diff --staged`",
    "explanation": "`git diff --staged` displays the exact patch of changes currently in the Index that will be merged into the previous commit.",
    "hint": "Inspect staging index before amending.",
    "level": "basic",
    "codeExample": "git diff --staged"
  },
  {
    "id": "undo-t3-q20",
    "question": "Can `git commit --amend` be used to sign a commit with a GPG key that was previously unsigned?",
    "shortAnswer": "Yes, by running `git commit --amend -S --no-edit`.",
    "options": [
      "Yes, using `git commit --amend -S --no-edit`",
      "No, GPG keys can only be attached to release tags",
      "Only if you recreate the repository",
      "Only through GitHub Settings"
    ],
    "answer": "Yes, using `git commit --amend -S --no-edit`",
    "explanation": "The `-S` flag attaches a cryptographic GPG signature to the newly created replacement commit object.",
    "hint": "-S flag enables GPG signing.",
    "level": "advanced",
    "codeExample": "git commit --amend -S --no-edit"
  },
  {
    "id": "undo-t3-q21",
    "question": "What does `git status` display after running `git commit --amend` successfully?",
    "shortAnswer": "`nothing to commit, working tree clean` (assuming all staged changes were included).",
    "options": [
      "`nothing to commit, working tree clean`",
      "`Your branch is 1 commit behind`",
      "`Merge conflict in progress`",
      "`Detached HEAD state`"
    ],
    "answer": "`nothing to commit, working tree clean`",
    "explanation": "The staged changes are committed into the new commit object, leaving the Index clean.",
    "hint": "Working tree is clean after successful commit.",
    "level": "basic",
    "codeExample": "git status"
  },
  {
    "id": "undo-t3-q22",
    "question": "How does Sukanta Sir describe the difference between creating a new 'fixup' commit versus amending?",
    "shortAnswer": "Amending is for private local polish before sharing; new commits are for ongoing team collaboration where audit trails matter.",
    "options": [
      "Amending polishes your local work into one clean story; new commits preserve historical milestones on shared branches",
      "Amending is only for bug fixes and new commits are only for features",
      "New commits cost ₹100 each on cloud providers",
      "There is no difference"
    ],
    "answer": "Amending polishes your local work into one clean story; new commits preserve historical milestones on shared branches",
    "explanation": "Local cleanliness vs public auditability is the cornerstone of professional version control.",
    "hint": "Private polish vs public history.",
    "level": "basic",
    "codeExample": "# Local: amend to 1 clean commit\n# Shared: create new commit"
  },
  {
    "id": "undo-t3-q23",
    "question": "If you have uncommitted changes in your working tree that are NOT staged, does `git commit --amend` include them?",
    "shortAnswer": "No. Only changes staged in the Index with `git add` are included in the amended commit; unstaged working tree edits remain unstaged.",
    "options": [
      "No, only staged changes in the Index are included; unstaged edits remain untouched on disk",
      "Yes, amend automatically stages everything on disk",
      "Git throws an error and aborts",
      "It deletes the unstaged changes"
    ],
    "answer": "No, only staged changes in the Index are included; unstaged edits remain untouched on disk",
    "explanation": "Amending obeys the standard three-tree commit rules: only what is in the Index is written into the commit tree.",
    "hint": "Standard staging rules apply to amend.",
    "level": "intermediate",
    "codeExample": "# Unstaged edits will remain in working tree after amend"
  },
  {
    "id": "undo-t3-q24",
    "question": "What is the effect of `git commit --amend --reset-author`?",
    "shortAnswer": "It updates both the author name, author email, and author date to match your current active `git config` identity and system time.",
    "options": [
      "It updates the commit author name, email, and timestamp to the current user's configuration",
      "It deletes the author information completely",
      "It changes the author to 'Anonymous'",
      "It resets the repository owner on GitHub"
    ],
    "answer": "It updates the commit author name, email, and timestamp to the current user's configuration",
    "explanation": "Useful when a commit was mistakenly created under an old email or different machine config.",
    "hint": "Resets author identity to active git config.",
    "level": "advanced",
    "codeExample": "git commit --amend --reset-author --no-edit"
  },
  {
    "id": "undo-t3-q25",
    "question": "What is the primary golden rule for `git commit --amend`?",
    "shortAnswer": "Amend freely on private local branches; NEVER amend commits that have already been pushed to shared remote branches.",
    "options": [
      "Amend freely on private local commits; never amend pushed shared history",
      "Always amend every commit 3 times",
      "Only amend on Linux operating systems",
      "Never use amend under any circumstances"
    ],
    "answer": "Amend freely on private local commits; never amend pushed shared history",
    "explanation": "This principle prevents team friction and ensures smooth collaboration in professional software teams.",
    "hint": "Private vs Public rule.",
    "level": "basic",
    "codeExample": "# The Golden Rule: Local = Amend OK; Pushed = Revert only"
  }
];

export default questions;
