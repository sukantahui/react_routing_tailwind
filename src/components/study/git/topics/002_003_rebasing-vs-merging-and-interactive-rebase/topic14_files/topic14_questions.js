/**
 * Topic 14 Questions: Final Self-Assessment Exam
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the primary difference between `git merge` and `git rebase`?",
    answer: "`git merge` combines two divergent branches by creating a 3-way merge commit with two parents, preserving historical branch topologies. `git rebase` rewrites history by replaying commits sequentially on top of a new base tip, creating a single linear commit DAG."
  },
  {
    id: 2,
    question: "State the Golden Rule of Git Rebasing.",
    answer: "Never rebase commits that exist outside your private repository and that others may have based work on."
  },
  {
    id: 3,
    question: "What command continues an in-progress rebase after you have resolved and staged conflict files?",
    answer: "`git rebase --continue`. (Do NOT run `git commit`)."
  },
  {
    id: 4,
    question: "What does `git rebase --abort` do?",
    answer: "It cancels the rebase immediately, resets your working directory and branch pointer to the exact pre-rebase state, and deletes `.git/rebase-merge/`."
  },
  {
    id: 5,
    question: "What does `git rebase --skip` do?",
    answer: "It drops the currently conflicting commit, discarding its changes and moving immediately to the next commit in the rebase queue."
  },
  {
    id: 6,
    question: "How are commits ordered in the `git rebase -i` TODO file?",
    answer: "In chronological order: the oldest commit is at the top (line 1), and the newest commit is at the bottom."
  },
  {
    id: 7,
    question: "What is the difference between `squash` and `fixup` in interactive rebase?",
    answer: "`squash` combines the commit into the previous commit and opens an editor to merge both commit messages. `fixup` combines the commit into the previous commit and discards this commit's message."
  },
  {
    id: 8,
    question: "How do you split a single commit into multiple atomic commits during an interactive rebase?",
    answer: "Mark the commit with `edit`, run `git reset HEAD~` when paused, stage and commit the separate pieces individually, and run `git rebase --continue`."
  },
  {
    id: 9,
    question: "What command creates a targeted fixup commit for autosquash?",
    answer: "`git commit --fixup <commit_hash>`."
  },
  {
    id: 10,
    question: "What command automatically reorders and applies fixup commits?",
    answer: "`git rebase -i --autosquash <base_branch>`."
  },
  {
    id: 11,
    question: "What does the `exec` directive do in an interactive rebase?",
    answer: "It runs an arbitrary shell command (such as `npm test`) after the preceding commit is replayed. If the command fails, Git halts the rebase so you can fix the issue."
  },
  {
    id: 12,
    question: "What is stored in the `.git/rebase-merge/orig-head` file?",
    answer: "The SHA-1 hash of the feature branch tip before the rebase started, allowing Git to restore the branch if aborted."
  },
  {
    id: 13,
    question: "Why do rebased commits get completely new SHA-1 hashes?",
    answer: "Because commit hashes are cryptographic digests of the tree object, author info, committer timestamp, and parent commit hash. Changing the parent commit changes the SHA-1 digest completely."
  },
  {
    id: 14,
    question: "What safer flag should be used instead of `git push --force` after rebasing a private PR branch?",
    answer: "`git push --force-with-lease`."
  },
  {
    id: 15,
    question: "What happens if you delete a line completely from the interactive rebase TODO file?",
    answer: "Git drops (deletes) that commit from the branch history."
  },
  {
    id: 16,
    question: "What does `git config --global rebase.autoSquash true` do?",
    answer: "It makes Git automatically enable `--autosquash` on every interactive rebase without requiring the CLI flag."
  },
  {
    id: 17,
    question: "What does `git config --global rebase.autoStash true` do?",
    answer: "It automatically stashes uncommitted changes before a rebase and restores them after the rebase completes."
  },
  {
    id: 18,
    question: "What does `reword` do during an interactive rebase?",
    answer: "It keeps the commit's code changes but pauses to let you edit the commit message."
  },
  {
    id: 19,
    question: "What happens if you run `git rebase -i` and save an empty file?",
    answer: "Git cancels the rebase operation completely without modifying the branch."
  },
  {
    id: 20,
    question: "How does `git checkout --ours` vs `git checkout --theirs` behave during a rebase conflict?",
    answer: "The meaning is flipped: `--ours` refers to the upstream target branch (`main`), and `--theirs` refers to your feature branch commit being applied."
  },
  {
    id: 21,
    question: "How do you recover an accidental rebase mistake using reflog?",
    answer: "Run `git reflog`, identify the commit hash before the rebase started, and run `git reset --hard <old_commit_hash>`."
  },
  {
    id: 22,
    question: "Why does `git bisect` work faster on linear rebased histories?",
    answer: "Binary search travels along a single uninterrupted line of commits where each commit has passed tests, avoiding broken intermediate branch states."
  },
  {
    id: 23,
    question: "What is Conventional Commits format?",
    answer: "`<type>(<scope>): <subject>` with optional body and footer (e.g. `feat(invoice): add ₹50,000 threshold check`)."
  },
  {
    id: 24,
    question: "What happens to the old original commits after rebasing?",
    answer: "They become unreferenced 'dangling' objects and are eventually purged by Git's garbage collection (`git gc`) after the reflog expiry window."
  },
  {
    id: 25,
    question: "What does `git diff main...feature` (three dots) show after a rebase?",
    answer: "It shows the exact same diff as `git diff main..feature` (two dots) because the merge-base of the rebased branch IS the tip of `main`."
  },
  {
    id: 26,
    question: "What badge is awarded upon completing Module 002_003?",
    answer: "The 'Rebase Wizard Badge' 🧙‍♂️✨."
  },
  {
    id: 27,
    question: "What is the subject of the upcoming Module 002_004?",
    answer: "Git Stash (shelving uncommitted changes) & Git Worktree (working on multiple branches in parallel folders without switching)."
  },
  {
    id: 28,
    question: "What is Sukanta Sir's parting wisdom on Git Rebase mastery?",
    answer: "'Mastering rebase turns you from a passive version recorder into an active history architect. Treat your public branches with respect, and polish your private work with pride!'"
  }
];

export default questions;
