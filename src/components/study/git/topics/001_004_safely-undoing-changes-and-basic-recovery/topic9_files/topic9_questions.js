/**
 * Topic 9 FAQ Assessment Questions:
 * "Reverting Reverts and Handling Merge Commit Reverts: Overview of git revert -m 1 <merge_commit>"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t9-q1",
    "question": "Why does running `git revert <merge-commit-sha>` without any options result in an error?",
    "shortAnswer": "Because a merge commit has multiple parents, so Git cannot determine which branch's changes should be treated as the baseline to invert without the `-m` option.",
    "options": [
      "Because merge commits have multiple parent commits and Git requires the `-m` (mainline) parent number to calculate the diff",
      "Because merge commits cannot be reverted under any circumstances",
      "Because Git requires an admin password to revert merges",
      "Because merge commits contain compressed images"
    ],
    "answer": "Because merge commits have multiple parent commits and Git requires the `-m` (mainline) parent number to calculate the diff",
    "explanation": "To generate an inverse diff, Git needs to compare the merge commit against one specific parent. The `-m` flag designates that baseline parent.",
    "hint": "Merge commits have multiple parents; -m specifies the mainline parent.",
    "level": "intermediate",
    "codeExample": "error: commit 7a8b9c is a merge but no -m option was given."
  },
  {
    "id": "undo-t9-q2",
    "question": "What does `-m 1` represent in the command `git revert -m 1 <merge-commit-sha>`?",
    "shortAnswer": "It designates Parent 1 (the branch you were on when running the merge, typically `main`) as the mainline.",
    "options": [
      "Parent 1 (the mainline branch that received the merge) is preserved, inverting changes from Parent 2",
      "It limits the revert to 1 file only",
      "It runs the revert 1 minute in the future",
      "It sets commit priority to 1"
    ],
    "answer": "Parent 1 (the mainline branch that received the merge) is preserved, inverting changes from Parent 2",
    "explanation": "Parent 1 is the branch you checked out before running `git merge`. Inverting relative to Parent 1 removes all code brought in by the merged feature branch.",
    "hint": "-m 1 designates the receiving branch (main) as the mainline.",
    "level": "intermediate",
    "codeExample": "git revert -m 1 3d4e5f6"
  },
  {
    "id": "undo-t9-q3",
    "question": "How can you view the ordered list of parents for a specific merge commit?",
    "shortAnswer": "Run `git show <merge-commit-sha>` or `git cat-file -p <merge-commit-sha>`.",
    "options": [
      "Run `git show <merge-commit-sha>` or `git cat-file -p <merge-commit-sha>` and look at the `Merge:` line",
      "Run `git parent --list`",
      "Run `git status -m`",
      "Check `.git/parents.txt`"
    ],
    "answer": "Run `git show <merge-commit-sha>` or `git cat-file -p <merge-commit-sha>` and look at the `Merge:` line",
    "explanation": "The `Merge:` header displays parent hashes in order: Parent 1 (first hash) and Parent 2 (second hash).",
    "hint": "Inspect the Merge header in git show or git cat-file.",
    "level": "basic",
    "codeExample": "git show 7a8b9c\n# Merge: 1a2b3c4 5d6e7f8 (1a2b3c4 = Parent 1, 5d6e7f8 = Parent 2)"
  },
  {
    "id": "undo-t9-q4",
    "question": "What is the famous 'Re-merging a Reverted Merge' problem documented by Linus Torvalds?",
    "shortAnswer": "Git's DAG still records the original merge, so future merges from the same branch will ignore the previously merged commits, resulting in missing code.",
    "options": [
      "Future merges from the feature branch will omit the original commits because Git's history records them as already merged",
      "The Git repository becomes permanently read-only",
      "Git crashes due to a stack overflow",
      "All branches are renamed to master"
    ],
    "answer": "Future merges from the feature branch will omit the original commits because Git's history records them as already merged",
    "explanation": "Git only brings in commits that are not already part of the target branch's ancestral graph. Since the original merge commit is still in history, those commits are skipped.",
    "hint": "DAG history remembers the merge; old commits are considered already merged.",
    "level": "advanced",
    "codeExample": "# Reverting a merge deletes the changes, but keeps the merge node in the DAG!"
  },
  {
    "id": "undo-t9-q5",
    "question": "What is the standard solution when you want to re-merge a feature branch whose merge was previously reverted?",
    "shortAnswer": "Revert the revert commit first (`git revert <revert-commit-sha>`), then merge the updated feature branch.",
    "options": [
      "Revert the revert commit (`git revert <revert-sha>`) before merging the new bug-fix commits",
      "Delete the repository and clone from scratch",
      "Copy-paste the files manually via FTP",
      "Force-push the old feature branch"
    ],
    "answer": "Revert the revert commit (`git revert <revert-sha>`) before merging the new bug-fix commits",
    "explanation": "Reverting the revert re-applies the original feature diff into mainline, allowing new work on the feature branch to integrate cleanly.",
    "hint": "Revert the revert to bring back the original patch.",
    "level": "advanced",
    "codeExample": "git revert <sha-of-the-revert-commit>\ngit merge feature-branch-v2"
  },
  {
    "id": "undo-t9-q6",
    "question": "What happens if you run `git revert -m 2 <merge_commit_sha>` instead of `-m 1`?",
    "shortAnswer": "Parent 2 (the feature branch) is preserved as mainline, and all changes from Parent 1 (the main branch) are inverted.",
    "options": [
      "Parent 2 is treated as the mainline, inverting changes from Parent 1 (usually NOT what you want)",
      "It reverts both branches simultaneously",
      "It deletes the second commit in history",
      "It causes an instant syntax error"
    ],
    "answer": "Parent 2 is treated as the mainline, inverting changes from Parent 1 (usually NOT what you want)",
    "explanation": "Choosing `-m 2` makes Git treat the side branch as the base and reverts everything unique to `main`.",
    "hint": "-m 2 keeps the side branch and reverts mainline.",
    "level": "intermediate",
    "codeExample": "# Usually you want -m 1, not -m 2!"
  },
  {
    "id": "undo-t9-q7",
    "question": "In the classroom at Barrackpore, Sachin merged `feature-tax` into `main`, but the build failed on CI. What command should he run on `main` to rollback the merge?",
    "shortAnswer": "`git revert -m 1 HEAD`",
    "options": [
      "`git revert -m 1 HEAD`",
      "`git reset --hard HEAD~1` and force push",
      "`git revert HEAD`",
      "`git branch -d feature-tax`"
    ],
    "answer": "`git revert -m 1 HEAD`",
    "explanation": "Running `git revert -m 1 HEAD` rolls back the merge on `main` cleanly and safely for the entire team.",
    "hint": "Use -m 1 on HEAD for the merge commit.",
    "level": "basic",
    "codeExample": "git revert -m 1 HEAD --no-edit\ngit push origin main"
  },
  {
    "id": "undo-t9-q8",
    "question": "Can a merge commit with 3 parents (an Octopus merge) be reverted?",
    "shortAnswer": "Yes, by passing `-m <1|2|3>` to specify which parent is the mainline.",
    "options": [
      "Yes, by passing `-m <number>` matching the desired parent",
      "No, octopus merges are permanently irreversible",
      "Only if performed in GitHub web interface",
      "Only with git cherry-pick"
    ],
    "answer": "Yes, by passing `-m <number>` matching the desired parent",
    "explanation": "Git supports `-m 1`, `-m 2`, `-m 3` for octopus merges with multiple parents.",
    "hint": "Mainline index selects any valid parent index.",
    "level": "advanced",
    "codeExample": "git revert -m 1 <octopus-merge-sha>"
  },
  {
    "id": "undo-t9-q9",
    "question": "What is an alternative to 're-reverting' when re-introducing a feature whose merge was reverted?",
    "shortAnswer": "Rebase the feature branch onto the latest `main` branch, which generates brand new commit SHAs.",
    "options": [
      "Rebase the feature branch onto the latest `main` branch to generate new commit SHAs",
      "Rename the branch to `main`",
      "Delete all unit tests",
      "Change the author email address"
    ],
    "answer": "Rebase the feature branch onto the latest `main` branch to generate new commit SHAs",
    "explanation": "Rebasing creates fresh commit objects with different SHAs that Git does not recognize as having been merged previously.",
    "hint": "Rebasing gives the feature commits new SHA identities.",
    "level": "intermediate",
    "codeExample": "git switch feature-branch\ngit rebase main"
  },
  {
    "id": "undo-t9-q10",
    "question": "What is the default commit message generated when reverting a merge commit?",
    "shortAnswer": "`Revert \"Merge branch 'feature' into main\"` with a note detailing parentage.",
    "options": [
      "`Revert \"Merge branch 'feature' into main\"`",
      "`Merge Cancelled`",
      "`Undo Branch`",
      "`Rollback Commit`"
    ],
    "answer": "`Revert \"Merge branch 'feature' into main\"`",
    "explanation": "Git prepends `Revert` to the original merge commit title.",
    "hint": "Prepends Revert to the merge commit subject.",
    "level": "basic",
    "codeExample": "Revert \"Merge branch 'feature-tax' into main\""
  },
  {
    "id": "undo-t9-q11",
    "question": "Why does GitHub's 'Revert' button on Pull Requests use `git revert -m 1` under the hood?",
    "shortAnswer": "Because PR merges create a merge commit where `main` is Parent 1 and the PR branch is Parent 2.",
    "options": [
      "Because Parent 1 is always the base branch (main) and Parent 2 is the head PR branch",
      "Because GitHub only supports the number 1",
      "Because it is hardcoded in Ruby on Rails",
      "Because it deletes the pull request branch"
    ],
    "answer": "Because Parent 1 is always the base branch (main) and Parent 2 is the head PR branch",
    "explanation": "GitHub automated PR merge commits consistently place the target base branch as Parent 1.",
    "hint": "Target base branch is always Parent 1 on PR merges.",
    "level": "intermediate",
    "codeExample": "# GitHub PR Revert = git revert -m 1 <pr_merge_sha>"
  },
  {
    "id": "undo-t9-q12",
    "question": "If you revert a merge commit, does Git delete the feature branch itself?",
    "shortAnswer": "No. The feature branch ref and all its original commits remain completely untouched in the repository.",
    "options": [
      "No; the feature branch and its commits remain intact in the database",
      "Yes; it deletes the feature branch locally and remotely",
      "It renames the feature branch to `deleted-branch`",
      "It locks the branch against future pushes"
    ],
    "answer": "No; the feature branch and its commits remain intact in the database",
    "explanation": "Reverting only affects the active branch (`main`). The feature branch pointer is separate and untouched.",
    "hint": "Branch refs are independent.",
    "level": "basic",
    "codeExample": "# Feature branch remains untouched"
  },
  {
    "id": "undo-t9-q13",
    "question": "What is the effect of `git revert -m 1` on files that were ONLY modified on `main` and not touched by the feature branch?",
    "shortAnswer": "They remain completely unaffected; only the changes introduced by the feature branch are reversed.",
    "options": [
      "They are completely unaffected",
      "They are reverted to their initial state",
      "They are deleted",
      "They trigger merge conflicts"
    ],
    "answer": "They are completely unaffected",
    "explanation": "Git diffs Parent 1 against the merge commit. Unrelated files on `main` have no diff and are left untouched.",
    "hint": "Only changes introduced by Parent 2 are inverted.",
    "level": "intermediate",
    "codeExample": "# Only files touched by the feature branch are modified"
  },
  {
    "id": "undo-t9-q14",
    "question": "What command allows you to inspect the commit object content and parent hashes directly?",
    "shortAnswer": "`git cat-file -p <commit-sha>`",
    "options": [
      "`git cat-file -p <commit-sha>`",
      "`git show --raw-parents`",
      "`git debug-commit`",
      "`cat .git/objects/<sha>`"
    ],
    "answer": "`git cat-file -p <commit-sha>`",
    "explanation": "`cat-file -p` pretty-prints raw object data, showing tree, parent 1, parent 2, author, and committer.",
    "hint": "cat-file -p pretty-prints raw Git object contents.",
    "level": "intermediate",
    "codeExample": "git cat-file -p HEAD\n# tree ...\n# parent 1a2b3c...\n# parent 4d5e6f..."
  },
  {
    "id": "undo-t9-q15",
    "question": "Suppose Mahima resolved merge conflicts when merging a feature branch. When she later reverts that merge with `-m 1`, what happens to those manual conflict resolutions?",
    "shortAnswer": "They are inverted along with the rest of the feature changes, returning the files to the clean Parent 1 state.",
    "options": [
      "The entire merged result is inverted back to match the exact snapshot of Parent 1 (main)",
      "The conflicts reappear in the editor",
      "Only the conflicting files are deleted",
      "The resolution is saved to `.git/conflicts.txt`"
    ],
    "answer": "The entire merged result is inverted back to match the exact snapshot of Parent 1 (main)",
    "explanation": "Because Parent 1 is the baseline, Git reverts all net differences between the merge commit and Parent 1.",
    "hint": "Returns state to match Parent 1 snapshot.",
    "level": "advanced",
    "codeExample": "# Snapshot is restored to match Parent 1"
  },
  {
    "id": "undo-t9-q16",
    "question": "Can you abort a merge commit revert if conflicts arise during the revert process?",
    "shortAnswer": "Yes, with `git revert --abort`.",
    "options": [
      "`git revert --abort`",
      "`git reset --merge-abort`",
      "`git revert --stop`",
      "`git cancel`"
    ],
    "answer": "`git revert --abort`",
    "explanation": "`git revert --abort` cancels the revert and restores the pre-revert working tree state.",
    "hint": "--abort cancels the operation.",
    "level": "basic",
    "codeExample": "git revert --abort"
  },
  {
    "id": "undo-t9-q17",
    "question": "Why is it dangerous to rebase a shared branch instead of reverting a merge commit?",
    "shortAnswer": "Because rebasing rewrites all subsequent commit SHAs, requiring a force-push that disrupts all collaborators.",
    "options": [
      "Rebasing rewrites commit hashes, requiring a destructive force push that breaks teammates' repositories",
      "Rebasing cannot handle JavaScript files",
      "Rebasing deletes GitHub issues",
      "Rebasing uses too much RAM"
    ],
    "answer": "Rebasing rewrites commit hashes, requiring a destructive force push that breaks teammates' repositories",
    "explanation": "Rebase is a history-rewriting operation. On public branches, `git revert -m 1` is always preferred.",
    "hint": "Rebasing rewrites public history; revert appends safely.",
    "level": "intermediate",
    "codeExample": "# Rebase = History rewrite | Revert = Append safe commit"
  },
  {
    "id": "undo-t9-q18",
    "question": "True or False: A Fast-Forward merge creates a merge commit with multiple parents that requires `git revert -m 1`.",
    "shortAnswer": "False. A fast-forward merge does NOT create a merge commit; it only moves the branch pointer forward.",
    "options": [
      "False; Fast-forward merges do not produce merge commits, only 3-way (`--no-ff`) merges create multi-parent commits",
      "True; all merges in Git have 2 parents",
      "True; fast-forward merges have 3 parents",
      "False; fast-forward merges cannot be reverted at all"
    ],
    "answer": "False; Fast-forward merges do not produce merge commits, only 3-way (`--no-ff`) merges create multi-parent commits",
    "explanation": "In a fast-forward merge, the branch pointer simply slides to the tip of the feature branch. There is no merge commit object.",
    "hint": "Fast-forward merges do not create merge commit objects.",
    "level": "intermediate",
    "codeExample": "# Fast-forward: HEAD moves to tip without merge commit"
  },
  {
    "id": "undo-t9-q19",
    "question": "If a fast-forward merge occurred, how do you revert the changes introduced by the merged feature?",
    "shortAnswer": "Revert the individual commit SHAs using `git revert commitA..commitB` or reset if strictly local.",
    "options": [
      "Revert the individual commits using a range: `git revert <first-commit>^..<last-commit>`",
      "Run `git revert -m 1 HEAD`",
      "Run `git merge --undo`",
      "Delete the local branch"
    ],
    "answer": "Revert the individual commits using a range: `git revert <first-commit>^..<last-commit>`",
    "explanation": "Since there is no single merge commit, reverting the commit range in reverse order is the correct approach.",
    "hint": "Revert the commit range since no merge commit exists.",
    "level": "advanced",
    "codeExample": "git revert C1^..C3"
  },
  {
    "id": "undo-t9-q20",
    "question": "What is the Linus Torvalds how-to document on reverting merges titled in the official Git documentation?",
    "shortAnswer": "`revert-a-faulty-merge.txt` (or 'How-To: Revert a Faulty Merge').",
    "options": [
      "`howto/revert-a-faulty-merge.txt`",
      "`undo-disaster.md`",
      "`git-emergency-guide.pdf`",
      "`linux-kernel-merging.doc`"
    ],
    "answer": "`howto/revert-a-faulty-merge.txt`",
    "explanation": "Written by Linus Torvalds, this classic how-to document in Git core documentation explains the parentage semantics and re-merging mechanics.",
    "hint": "The official how-to is named revert-a-faulty-merge.",
    "level": "advanced",
    "codeExample": "# Documentation: Documentation/howto/revert-a-faulty-merge.txt"
  },
  {
    "id": "undo-t9-q21",
    "question": "In the classroom at Barrackpore, Swadeep created a PR with 5 commits that got merged into main. The merge commit hash is `9b8a7c6`. How does Swadeep revert the entire PR in one command?",
    "shortAnswer": "`git revert -m 1 9b8a7c6`",
    "options": [
      "`git revert -m 1 9b8a7c6`",
      "`git revert 9b8a7c6`",
      "`git reset --hard 9b8a7c6~1`",
      "`git clean -fd 9b8a7c6`"
    ],
    "answer": "`git revert -m 1 9b8a7c6`",
    "explanation": "Specifying `-m 1` on the merge commit undoes all 5 commits introduced by the PR in one single operation.",
    "hint": "git revert -m 1 <merge_sha> rolls back the whole PR.",
    "level": "basic",
    "codeExample": "git revert -m 1 9b8a7c6 --no-edit"
  },
  {
    "id": "undo-t9-q22",
    "question": "When you revert a merge commit, does Git remove the commit hashes of the feature branch from the repository's `.git/objects/` database?",
    "shortAnswer": "No. The objects remain in the database as part of the immutable DAG history.",
    "options": [
      "No; the commit objects remain in `.git/objects/` and in the commit graph",
      "Yes; all feature commits are deleted from the disk",
      "Only if you pass `--purge`",
      "Only after 1 hour"
    ],
    "answer": "No; the commit objects remain in `.git/objects/` and in the commit graph",
    "explanation": "Git never erases historical objects on revert; it only records an inverse state change.",
    "hint": "Git history is immutable; revert appends new data.",
    "level": "basic",
    "codeExample": "# Commit objects remain in .git/objects/"
  },
  {
    "id": "undo-t9-q23",
    "question": "What is the recommended Git log command to visually inspect merge commits and their multiple parent lines?",
    "shortAnswer": "`git log --graph --oneline --decorate -n 10`",
    "options": [
      "`git log --graph --oneline --decorate`",
      "`git show --tree-all`",
      "`git branch --graph`",
      "`git status --visual`"
    ],
    "answer": "`git log --graph --oneline --decorate`",
    "explanation": "The `--graph` option draws ASCII branch convergence lines showing both parent branches merging into the merge node.",
    "hint": "--graph draws DAG branching lines.",
    "level": "basic",
    "codeExample": "git log --graph --oneline --decorate"
  },
  {
    "id": "undo-t9-q24",
    "question": "What should a developer do if they accidentally ran `git revert -m 2` instead of `git revert -m 1` on their local branch before pushing?",
    "shortAnswer": "Reset back with `git reset --hard HEAD~1` or revert the mistake with `git revert HEAD`.",
    "options": [
      "Run `git reset --hard HEAD~1` to undo the mistaken local revert commit immediately",
      "Format their computer",
      "Push to origin to test",
      "Delete all branch refs"
    ],
    "answer": "Run `git reset --hard HEAD~1` to undo the mistaken local revert commit immediately",
    "explanation": "Since the mistaken revert commit was only created locally, a simple `git reset --hard HEAD~1` cleanly rewinds before it was pushed.",
    "hint": "Local mistakes can be rewound with reset.",
    "level": "intermediate",
    "codeExample": "git reset --hard HEAD~1"
  },
  {
    "id": "undo-t9-q25",
    "question": "In summary, what is the two-step formula for handling a faulty merge commit in production?",
    "shortAnswer": "Step 1: Emergency rollback using `git revert -m 1 <merge_sha>`. Step 2: Fix bug on feature branch and re-revert the revert commit before re-merging.",
    "options": [
      "Step 1: Immediate rollback via `git revert -m 1 <merge_sha>`; Step 2: Re-revert the rollback commit when re-merging fixed feature",
      "Step 1: Delete repository; Step 2: Recreate repository",
      "Step 1: Force push main; Step 2: Pray",
      "Step 1: Rebase main; Step 2: Tag release"
    ],
    "answer": "Step 1: Immediate rollback via `git revert -m 1 <merge_sha>`; Step 2: Re-revert the rollback commit when re-merging fixed feature",
    "explanation": "This professional industry protocol ensures instant production stability and seamless future feature integration.",
    "hint": "1. Revert merge with -m 1; 2. Re-revert when fixed.",
    "level": "basic",
    "codeExample": "# 1. git revert -m 1 <merge_sha>\n# 2. git revert <revert_sha> (when fixed)"
  }
];

export default questions;
