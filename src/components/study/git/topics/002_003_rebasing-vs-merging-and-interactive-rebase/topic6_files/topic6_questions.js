/**
 * Topic 6 Questions: Rebase Control Commands (--skip & --abort)
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What does `git rebase --abort` do?",
    answer: "It completely cancels the in-progress rebase, cleans up temporary files in `.git/rebase-merge`, and restores your branch pointer and working tree back to the exact state before the rebase started."
  },
  {
    id: 2,
    question: "What does `git rebase --skip` do?",
    answer: "It drops the currently paused commit from the branch history entirely, discarding its changes and immediately advancing the rebase engine to the next commit in the queue."
  },
  {
    id: 3,
    question: "When should you use `git rebase --skip`?",
    answer: "When a commit in your feature branch has become completely redundant because its changes were already implemented or merged into the upstream base branch."
  },
  {
    id: 4,
    question: "What is the danger of using `git rebase --skip` carelessly?",
    answer: "If you skip a commit that contained unique, necessary code alongside the conflicting lines, you will permanently lose that code from your rebased branch."
  },
  {
    id: 5,
    question: "How does `git rebase --abort` know where to restore the repository to?",
    answer: "It reads the original commit SHA saved in `.git/rebase-merge/orig-head` and resets HEAD and the branch ref to that SHA."
  },
  {
    id: 6,
    question: "What does `git rebase --edit-todo` do?",
    answer: "It re-opens the rebase TODO list in your text editor while a rebase is paused, allowing you to reorder, drop, squash, or reword upcoming commits in the queue."
  },
  {
    id: 7,
    question: "What is the difference between `git rebase --abort` and `git reset --hard` during a rebase?",
    answer: "`git rebase --abort` properly terminates the rebase state and deletes `.git/rebase-merge/`. A raw `git reset --hard` might leave orphaned rebase state files on disk."
  },
  {
    id: 8,
    question: "What does `git rebase --quit` do compared to `git rebase --abort`?",
    answer: "`git rebase --abort` rolls back your branch to the original commit. `git rebase --quit` halts the rebase and cleans up `.git/rebase-merge/`, but leaves the working tree and branch at the current partially rebased commit."
  },
  {
    id: 9,
    question: "In the Barrackpore AccoTax case study, why did Mahima use `git rebase --skip`?",
    answer: "Because her commit adding `GST_RATE = 0.18` was already committed to `main` by Sukanta Sir, making her commit redundant."
  },
  {
    id: 10,
    question: "What happens if all commits on a feature branch are skipped during a rebase?",
    answer: "The feature branch ends up pointing directly to the target base tip commit."
  },
  {
    id: 11,
    question: "Can you run `git rebase --skip` when there is no active rebase session?",
    answer: "No, Git will output an error: `fatal: No rebase in progress?`."
  },
  {
    id: 12,
    question: "How can you check if a rebase is currently in progress?",
    answer: "Run `git status`. If a rebase is active, it will state `rebase in progress; onto <commit>`."
  },
  {
    id: 13,
    question: "What happens to untracked files in your working directory when you run `git rebase --abort`?",
    answer: "Untracked files are untouched and preserved safely on disk."
  },
  {
    id: 14,
    question: "What should you do if `git rebase --continue` says 'The previous cherry-pick is now empty'?",
    answer: "Run `git rebase --skip` (to drop the empty commit) or `git commit --allow-empty` (if you intentionally want to record an empty commit)."
  },
  {
    id: 15,
    question: "Is it possible to reword a commit message after skipping another commit in the same rebase?",
    answer: "Yes, you can edit the rebase queue via `git rebase --edit-todo` at any time during a pause."
  },
  {
    id: 16,
    question: "What command shows the log of the commits already applied in the current rebase session?",
    answer: "Run `cat .git/rebase-merge/done`."
  },
  {
    id: 17,
    question: "Can an IDE like VS Code trigger `git rebase --skip` and `git rebase --abort` via UI buttons?",
    answer: "Yes, VS Code's Source Control view displays dedicated buttons for 'Continue', 'Skip', and 'Abort' during a rebase."
  },
  {
    id: 18,
    question: "What is the psychological benefit of `git rebase --abort` for beginner developers?",
    answer: "It removes all fear of experimentation, knowing you can always press the bailout button and return to safety in one second."
  },
  {
    id: 19,
    question: "How can you recover a feature branch if you accidentally aborted a rebase you actually wanted?",
    answer: "The branch tip was never destroyed; it is still at its pre-rebase position. You can simply re-run the `git rebase` command."
  },
  {
    id: 20,
    question: "What happens if you resolve a conflict, stage with `git add`, and then mistakenly run `git rebase --skip`?",
    answer: "Your staged resolution will be discarded and the commit will be dropped. You would need to abort and restart to get that commit back."
  },
  {
    id: 21,
    question: "Does `git rebase --abort` delete uncommitted stashes?",
    answer: "No, Git stashes reside in `.git/refs/stash` and remain completely untouched."
  },
  {
    id: 22,
    question: "What flag can you pass to `git rebase` to prevent it from automatically dropping empty commits?",
    answer: "`git rebase --keep-empty`."
  },
  {
    id: 23,
    question: "What does `git rebase --show-current-patch` do?",
    answer: "It prints the exact patch diff of the commit currently being applied and causing the pause."
  },
  {
    id: 24,
    question: "Why is `git rebase --show-current-patch` helpful during conflict debugging?",
    answer: "It shows the original author's intention in that specific commit without having to search through git log."
  },
  {
    id: 25,
    question: "How does `git rebase --skip` update the branch DAG?",
    answer: "The skipped commit is simply omitted from the replayed chain; the next commit is applied directly on top of the previous replayed commit."
  },
  {
    id: 26,
    question: "Can you use `git rebase --abort` during an interactive rebase (`git rebase -i`)?",
    answer: "Yes, `--abort` works identically for standard and interactive rebases."
  },
  {
    id: 27,
    question: "What should you check before running `git rebase --skip`?",
    answer: "Verify with `git diff` and `git show REBASE_HEAD` that the commit truly contains nothing unique that you still need."
  },
  {
    id: 28,
    question: "What advice does Sukanta Sir give regarding the `--abort` command?",
    answer: "'Think of `git rebase --abort` as your seatbelt. When in doubt during a hairy rebase conflict, abort first, take a breath, inspect with git log, and try again calmly!'"
  }
];

export default questions;
