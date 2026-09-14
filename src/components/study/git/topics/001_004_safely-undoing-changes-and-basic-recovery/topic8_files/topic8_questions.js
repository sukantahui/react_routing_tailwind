/**
 * Topic 8 FAQ Assessment Questions:
 * "Safe Undo for Public/Shared Branches: git revert <commit>"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t8-q1",
    "question": "What is the primary architectural difference between `git revert` and `git reset`?",
    "shortAnswer": "`git reset` rewinds history by moving branch pointers backwards; `git revert` moves history forward by creating a brand new commit that inverts the targeted changes.",
    "options": [
      "`git reset` rewinds and rewrites history; `git revert` creates a new forward commit that inverts the specified changes",
      "`git revert` only works on branches with fewer than 5 commits",
      "`git reset` is for GitHub; `git revert` is for local offline repos",
      "`git revert` deletes commit objects from disk"
    ],
    "answer": "`git reset` rewinds and rewrites history; `git revert` creates a new forward commit that inverts the specified changes",
    "explanation": "Because `git revert` appends a new commit forward in time, it does not rewrite history, making it completely safe for shared team branches.",
    "hint": "Revert moves history forward with an inverse commit.",
    "level": "basic",
    "codeExample": "git revert 8f2a10c"
  },
  {
    "id": "undo-t8-q2",
    "question": "Why is `git revert` safe for public/shared team branches like `main`?",
    "shortAnswer": "Because it preserves existing commit SHAs and ancestors, allowing teammates to pull cleanly without non-fast-forward push rejections or branch divergence.",
    "options": [
      "Because it does not alter historical commit hashes, allowing teammates to pull updates cleanly via fast-forward merges",
      "Because it bypasses GitHub branch protection rules",
      "Because it encrypts the code on the remote server",
      "Because it ignores merge conflicts automatically"
    ],
    "answer": "Because it does not alter historical commit hashes, allowing teammates to pull updates cleanly via fast-forward merges",
    "explanation": "Teammates pulling a revert commit simply receive a new commit that undoes the unwanted code without breaking their branch ancestry.",
    "hint": "Revert maintains linear ancestry for collaborators.",
    "level": "basic",
    "codeExample": "# Teammates pull normally:\ngit pull origin main"
  },
  {
    "id": "undo-t8-q3",
    "question": "What command reverts the most recent commit on the active branch without opening the default text editor?",
    "shortAnswer": "`git revert --no-edit HEAD`",
    "options": [
      "`git revert --no-edit HEAD`",
      "`git revert -f HEAD`",
      "`git reset --revert HEAD`",
      "`git undo --last`"
    ],
    "answer": "`git revert --no-edit HEAD`",
    "explanation": "The `--no-edit` flag accepts the standard auto-generated revert commit message ('Revert \"feat: ...\"') without prompting the editor.",
    "hint": "Notice the --no-edit flag.",
    "level": "basic",
    "codeExample": "git revert --no-edit HEAD"
  },
  {
    "id": "undo-t8-q4",
    "question": "What does the `--no-commit` (or `-n`) option do when passed to `git revert`?",
    "shortAnswer": "It applies the inverse changes directly to the Staging Area and Working Tree without creating the revert commit immediately.",
    "options": [
      "It stages the inverse changes in the Index without creating a commit, allowing you to combine reverts or tweak files first",
      "It prints a simulation of the revert without modifying anything",
      "It deletes the commit permanently from the server",
      "It prevents the revert from appearing in `git log`"
    ],
    "answer": "It stages the inverse changes in the Index without creating a commit, allowing you to combine reverts or tweak files first",
    "explanation": "Using `-n` is helpful when you want to revert multiple commits simultaneously into a single cohesive rollback commit.",
    "hint": "-n stages inverse changes without auto-committing.",
    "level": "intermediate",
    "codeExample": "git revert -n commitA commitB\ngit commit -m \"revert: rollback payments module v2\""
  },
  {
    "id": "undo-t8-q5",
    "question": "What happens if the code modified by the target commit was also edited by later commits in the repository?",
    "shortAnswer": "Git will pause the revert operation and prompt the developer to resolve a merge conflict.",
    "options": [
      "Git triggers a merge conflict that must be manually resolved before committing the revert",
      "Git crashes and aborts the entire repository",
      "Git overwrites all later commits silently",
      "Git deletes the conflicting files"
    ],
    "answer": "Git triggers a merge conflict that must be manually resolved before committing the revert",
    "explanation": "Because reverting is essentially a 3-way patch operation, subsequent edits to the same lines cause standard conflict markers.",
    "hint": "Conflicting subsequent lines trigger standard merge conflicts.",
    "level": "intermediate",
    "codeExample": "# Resolve conflicts in editor, then:\ngit add <conflicted-file>\ngit revert --continue"
  },
  {
    "id": "undo-t8-q6",
    "question": "How do you abort an in-progress revert operation if conflicts become too complicated?",
    "shortAnswer": "`git revert --abort`",
    "options": [
      "`git revert --abort`",
      "`git reset --stop`",
      "`git cancel`",
      "`git checkout -f`"
    ],
    "answer": "`git revert --abort`",
    "explanation": "`git revert --abort` discards all in-progress revert state and returns your working tree and staging index to the state prior to calling revert.",
    "hint": "--abort safely returns you to pre-revert state.",
    "level": "basic",
    "codeExample": "git revert --abort"
  },
  {
    "id": "undo-t8-q7",
    "question": "Can you revert a commit that occurred 10 commits ago in the repository history?",
    "shortAnswer": "Yes! You can pass any historical commit SHA to `git revert`.",
    "options": [
      "Yes, `git revert <commit-sha>` can target any historical commit in the branch's past",
      "No, revert only works on the most recent commit (HEAD)",
      "Only if the commit was created within the last 24 hours",
      "Only if you have administrative privileges on GitHub"
    ],
    "answer": "Yes, `git revert <commit-sha>` can target any historical commit in the branch's past",
    "explanation": "Git computes the inverse diff of that specific historical commit and applies it on top of current HEAD.",
    "hint": "Any historical SHA can be targeted.",
    "level": "basic",
    "codeExample": "git revert 3a4b5c6"
  },
  {
    "id": "undo-t8-q8",
    "question": "What is the auto-generated commit message format produced by `git revert`?",
    "shortAnswer": "`Revert \"<original-commit-subject>\"` followed by `This reverts commit <full-sha>.` in the body.",
    "options": [
      "`Revert \"<original-commit-subject>\"` with `This reverts commit <sha>` in the body",
      "`Deleted commit <sha>`",
      "`Rollback error`",
      "`Undo changes`"
    ],
    "answer": "`Revert \"<original-commit-subject>\"` with `This reverts commit <sha>` in the body",
    "explanation": "This standard message format provides automated traceability back to the original commit SHA for auditing and compliance.",
    "hint": "Standard message references the original commit hash.",
    "level": "intermediate",
    "codeExample": "Revert \"feat(tax): add 18% GST calculation\"\n\nThis reverts commit 7a8b9c0d1e2f..."
  },
  {
    "id": "undo-t8-q9",
    "question": "In the classroom at Barrackpore, Susmita deployed a commit that caused a production billing crash on GitHub. Which command should she run to fix production safely?",
    "shortAnswer": "Run `git revert HEAD`, test locally, and `git push origin main`.",
    "options": [
      "Run `git revert HEAD` and push the new revert commit to `origin main`",
      "Run `git reset --hard HEAD~1` and force push",
      "Delete the GitHub repository",
      "Shut down the production server"
    ],
    "answer": "Run `git revert HEAD` and push the new revert commit to `origin main`",
    "explanation": "Reverting and pushing cleanly creates a forward deployment that restores stability without rewriting history.",
    "hint": "Revert + normal push is the standard production rollback procedure.",
    "level": "basic",
    "codeExample": "git revert --no-edit HEAD\ngit push origin main"
  },
  {
    "id": "undo-t8-q10",
    "question": "How do you revert a sequence of multiple commits from `commitA` to `commitB`?",
    "shortAnswer": "`git revert commitA..commitB` or `git revert commitA commitB commitC`",
    "options": [
      "`git revert commitA..commitB`",
      "`git revert --all`",
      "`git revert --range commitA commitB`",
      "`git reset --revert-range`"
    ],
    "answer": "`git revert commitA..commitB`",
    "explanation": "Git supports range syntax for revert, applying the inverse commits in reverse chronological order.",
    "hint": "Two-dot range syntax works with revert.",
    "level": "intermediate",
    "codeExample": "git revert 1a2b3c..4d5e6f"
  },
  {
    "id": "undo-t8-q11",
    "question": "Why does enterprise compliance auditing prefer `git revert` over `git reset` for production rollbacks?",
    "shortAnswer": "Because `git revert` preserves the full history of the original commit, the author, the bug, and the rollback reason, ensuring full non-repudiation.",
    "options": [
      "Because it preserves a complete, tamper-proof historical audit trail of all deployments and remediations",
      "Because it reduces cloud storage costs by 50%",
      "Because it complies with USB driver standards",
      "Because it runs faster on Windows servers"
    ],
    "answer": "Because it preserves a complete, tamper-proof historical audit trail of all deployments and remediations",
    "explanation": "Security frameworks (SOC2, ISO) require immutable audit logs. Erasing history with reset violates compliance requirements.",
    "hint": "Audit trails require immutable, traceable history.",
    "level": "intermediate",
    "codeExample": "# Full trace: Commit -> Bug discovered -> Revert commit logged"
  },
  {
    "id": "undo-t8-q12",
    "question": "Can you revert a revert commit (i.e. 're-reverting') if you want to bring the feature back after fixing a bug?",
    "shortAnswer": "Yes! Reverting a revert commit creates a new commit that reapplies the original changes.",
    "options": [
      "Yes, running `git revert <revert-commit-sha>` cleanly reapplies the original feature code",
      "No, Git throws a cyclic dependency error",
      "Only if you manually retype all the code",
      "Only with interactive rebase"
    ],
    "answer": "Yes, running `git revert <revert-commit-sha>` cleanly reapplies the original feature code",
    "explanation": "An inverse of an inverse is the original patch! Re-reverting is a standard Git workflow.",
    "hint": "Inverse of inverse = original code reapplied.",
    "level": "intermediate",
    "codeExample": "git revert <sha-of-the-revert-commit>"
  },
  {
    "id": "undo-t8-q13",
    "question": "If commit C1 added 5 lines to `index.js`, what does `git revert C1` do in its patch?",
    "shortAnswer": "It deletes those exact 5 lines from `index.js`.",
    "options": [
      "It deletes those 5 lines from `index.js`",
      "It duplicates those 5 lines",
      "It comments out the lines",
      "It encrypts the file"
    ],
    "answer": "It deletes those 5 lines from `index.js`",
    "explanation": "Revert applies the exact inverse diff. Additions become deletions, and deletions become additions.",
    "hint": "Additions become deletions; deletions become additions.",
    "level": "basic",
    "codeExample": "# C1: +function calc() {}\n# Revert C1: -function calc() {}"
  },
  {
    "id": "undo-t8-q14",
    "question": "If commit C2 deleted a file `legacy_auth.js`, what does `git revert C2` do?",
    "shortAnswer": "It recreates the `legacy_auth.js` file with its original content.",
    "options": [
      "It recreates `legacy_auth.js` with its exact content before deletion",
      "It creates an empty file called `legacy_auth.js`",
      "It deletes all other auth files",
      "It prints a warning"
    ],
    "answer": "It recreates `legacy_auth.js` with its exact content before deletion",
    "explanation": "The inverse of file deletion is file recreation with original blob contents.",
    "hint": "Inverse of deletion is resurrection.",
    "level": "basic",
    "codeExample": "# Reverts file deletion by recreating it"
  },
  {
    "id": "undo-t8-q15",
    "question": "What command continues a revert operation after you have resolved all conflict markers in conflicted files?",
    "shortAnswer": "`git revert --continue`",
    "options": [
      "`git revert --continue`",
      "`git revert --resume`",
      "`git revert --finish`",
      "`git commit --revert-ok`"
    ],
    "answer": "`git revert --continue`",
    "explanation": "After staging the resolved files with `git add`, running `git revert --continue` records the final revert commit.",
    "hint": "--continue finishes the operation after conflict resolution.",
    "level": "basic",
    "codeExample": "git add .\ngit revert --continue"
  },
  {
    "id": "undo-t8-q16",
    "question": "What is the effect of `git revert` on the working directory?",
    "shortAnswer": "It modifies working tree files to reflect the inverse changes and stages them in the Index.",
    "options": [
      "It updates the working tree and stages the inverse modifications in the Index",
      "It deletes all uncommitted files",
      "It does not touch the working tree",
      "It locks the directory for editing"
    ],
    "answer": "It updates the working tree and stages the inverse modifications in the Index",
    "explanation": "Revert updates both the Working Tree and the Index to construct and commit the inverse snapshot.",
    "hint": "Revert touches both working tree and staging index.",
    "level": "intermediate",
    "codeExample": "# Working tree is updated to reflect reversed code"
  },
  {
    "id": "undo-t8-q17",
    "question": "Why does `git revert` never require a force push (`git push -f`)?",
    "shortAnswer": "Because the branch tip simply moves forward by 1 commit, which satisfies fast-forward ancestry on the remote.",
    "options": [
      "Because it creates a new child commit on top of HEAD, satisfying standard fast-forward rules",
      "Because revert disables Git's network security check",
      "Because GitHub has a built-in exemption for revert commits",
      "Because revert commits have zero file size"
    ],
    "answer": "Because it creates a new child commit on top of HEAD, satisfying standard fast-forward rules",
    "explanation": "The new commit is a descendant of the current remote tip. Therefore, standard non-force `git push` succeeds instantly.",
    "hint": "Child commits build linearly on top of parent tips.",
    "level": "basic",
    "codeExample": "git push origin main # Succeeds normally"
  },
  {
    "id": "undo-t8-q18",
    "question": "Suppose Sachin ran `git revert HEAD` and then realized he actually needed the code. Can he recover the undone code?",
    "shortAnswer": "Yes! He can either run `git revert HEAD` (re-reverting) or reset back using `git reset --hard HEAD~1` if local.",
    "options": [
      "Yes, by running `git revert HEAD` again to undo the revert, or resetting back",
      "No, reverted code is permanently erased",
      "Only if he writes the code again manually",
      "Only on Linux machines"
    ],
    "answer": "Yes, by running `git revert HEAD` again to undo the revert, or resetting back",
    "explanation": "Re-reverting is a safe forward action that restores the reverted changes.",
    "hint": "Revert the revert commit to restore code.",
    "level": "basic",
    "codeExample": "git revert HEAD # Re-reverts the last revert commit!"
  },
  {
    "id": "undo-t8-q19",
    "question": "Can `git revert` be used on an untracked file?",
    "shortAnswer": "No. `git revert` only operates on commits in history, not untracked files.",
    "options": [
      "No, `git revert` only accepts commit references or ranges",
      "Yes, `git revert <untracked-file>`",
      "Only if the file is tracked in `.gitignore`",
      "Only if staged"
    ],
    "answer": "No, `git revert` only accepts commit references or ranges",
    "explanation": "Revert is a commit-level operation. To remove untracked files, use `git clean`.",
    "hint": "Revert acts on commits, clean acts on untracked files.",
    "level": "basic",
    "codeExample": "# Use git clean for untracked files, not git revert"
  },
  {
    "id": "undo-t8-q20",
    "question": "When reverting multiple commits in a range `git revert A..D`, in what order does Git apply the reverts?",
    "shortAnswer": "In reverse chronological order (D, then C, then B) to properly unravel changes.",
    "options": [
      "In reverse chronological order (newest to oldest)",
      "In chronological order (oldest to newest)",
      "In alphabetical order of commit author",
      "In random order"
    ],
    "answer": "In reverse chronological order (newest to oldest)",
    "explanation": "Unravelling from the newest commit backward avoids unnecessary dependency conflicts.",
    "hint": "Unravels newest to oldest.",
    "level": "intermediate",
    "codeExample": "git revert HEAD~3..HEAD"
  },
  {
    "id": "undo-t8-q21",
    "question": "What flag can you pass to `git revert` to sign the newly created revert commit with your GPG key?",
    "shortAnswer": "`-S` (or `--gpg-sign`).",
    "options": [
      "`-S` (or `--gpg-sign`)",
      "`--crypto`",
      "`--secure`",
      "`--lock`"
    ],
    "answer": "`-S` (or `--gpg-sign`)",
    "explanation": "Like `git commit`, `git revert -S` cryptographically signs the new revert commit object.",
    "hint": "-S signs commits with GPG.",
    "level": "intermediate",
    "codeExample": "git revert -S HEAD"
  },
  {
    "id": "undo-t8-q22",
    "question": "What is the primary advantage of `git revert` when multiple developers in Barrackpore are working simultaneously on `dev` branch?",
    "shortAnswer": "Nobody experiences rejected pushes, broken local branch tracking, or lost commits.",
    "options": [
      "Seamless collaboration: all teammates receive the fix on next pull without diverging branches",
      "It speeds up internet connection speeds",
      "It disables everyone else's write access",
      "It prevents developers from making further commits"
    ],
    "answer": "Seamless collaboration: all teammates receive the fix on next pull without diverging branches",
    "explanation": "Because revert appends a regular commit, team synchronization remains completely frictionless.",
    "hint": "Frictionless synchronization for team members.",
    "level": "basic",
    "codeExample": "# Seamless team synchronization"
  },
  {
    "id": "undo-t8-q23",
    "question": "True or False: `git revert` deletes the original buggy commit from `git log`.",
    "shortAnswer": "False. The original commit remains in `git log`, followed by the new revert commit.",
    "options": [
      "False; both the original commit and the revert commit appear in `git log`",
      "True; it erases the original commit from log",
      "True; but only on GitHub",
      "False; it renames the original commit to 'DELETED'"
    ],
    "answer": "False; both the original commit and the revert commit appear in `git log`",
    "explanation": "Revert preserves full transparency. Both the error and the fix are visible in history.",
    "hint": "History is preserved transparently.",
    "level": "basic",
    "codeExample": "# Log shows: C1 (buggy commit) -> C2 (revert commit)"
  },
  {
    "id": "undo-t8-q24",
    "question": "What should you do if `git revert` results in a merge conflict that you cannot resolve right now?",
    "shortAnswer": "Run `git revert --abort` to cancel the revert cleanly.",
    "options": [
      "Run `git revert --abort` to return to the clean state before starting the revert",
      "Delete your operating system user account",
      "Run `git push --force`",
      "Close your laptop"
    ],
    "answer": "Run `git revert --abort` to return to the clean state before starting the revert",
    "explanation": "`--abort` is the universal, safe emergency brake for Git operations in conflict states.",
    "hint": "--abort is the safe emergency exit.",
    "level": "basic",
    "codeExample": "git revert --abort"
  },
  {
    "id": "undo-t8-q25",
    "question": "In summary, what is the simple rule of thumb for choosing between `git reset` and `git revert`?",
    "shortAnswer": "Private local branches -> `git reset`; Public shared branches -> `git revert`.",
    "options": [
      "Private local commits = git reset; Public/shared commits = git revert",
      "Use git reset in the morning; git revert in the evening",
      "Use git revert for JS files; git reset for CSS files",
      "Never use either command"
    ],
    "answer": "Private local commits = git reset; Public/shared commits = git revert",
    "explanation": "This golden rule ensures maximum local flexibility while maintaining total remote safety.",
    "hint": "Private = Reset, Public = Revert.",
    "level": "basic",
    "codeExample": "# Private: git reset HEAD~1\n# Shared:  git revert <sha>"
  }
];

export default questions;
