/**
 * Topic 3 Questions: How Rebase Works Under the Hood
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the very first calculation Git performs when `git rebase` is invoked?",
    answer: "Git runs a `git merge-base` calculation between the upstream base branch and the current feature branch to identify their lowest common ancestor commit."
  },
  {
    id: 2,
    question: "How does Git extract the changes made on the feature branch during a rebase?",
    answer: "Git extracts the diffs for all commits from the merge-base to the feature branch tip and converts them into sequential patch files stored in the repository's `.git/rebase-merge/` directory."
  },
  {
    id: 3,
    question: "What directory in `.git/` stores the temporary rebase control files?",
    answer: "The `.git/rebase-merge/` directory (or `.git/rebase-apply/` in older Git engines)."
  },
  {
    id: 4,
    question: "What is stored in the `.git/rebase-merge/onto` file?",
    answer: "The 40-character SHA-1 hash of the target base commit onto which the patches will be replayed."
  },
  {
    id: 5,
    question: "What is stored in the `.git/rebase-merge/orig-head` file?",
    answer: "The commit SHA-1 of the feature branch tip before the rebase operation was started, allowing complete rollback if aborted."
  },
  {
    id: 6,
    question: "What is stored in the `.git/rebase-merge/git-rebase-todo` file?",
    answer: "The list of commit hashes and command directives (pick, squash, reword, etc.) waiting to be replayed in sequence."
  },
  {
    id: 7,
    question: "What state is the HEAD pointer in while Git replays patches during a rebase?",
    answer: "HEAD is in a detached state (`detached HEAD`), pointing directly to each newly created commit as patches are applied."
  },
  {
    id: 8,
    question: "Why does each replayed commit get a brand new SHA-1 commit hash?",
    answer: "Because a commit's hash is a cryptographic digest of its tree object, author info, committer timestamp, and its parent commit SHA. Since its parent has changed to the new base tip, the hash changes completely."
  },
  {
    id: 9,
    question: "What happens to the author timestamp versus the committer timestamp during a rebase?",
    answer: "Git preserves the original Author Timestamp (when the code was originally authored) but sets the Committer Timestamp to the exact moment the rebase replayed the patch."
  },
  {
    id: 10,
    question: "What does Git do when all patches in the rebase queue have been successfully applied?",
    answer: "Git updates the branch reference (`.git/refs/heads/<branch>`) to point to the latest replayed commit, re-attaches HEAD to that branch ref, and deletes the `.git/rebase-merge` folder."
  },
  {
    id: 11,
    question: "What happens to the original commits (C and D) after a rebase?",
    answer: "They become unreferenced 'dangling commits'. They still exist in the `.git/objects` database and are recorded in `git reflog`, but no branch points to them."
  },
  {
    id: 12,
    question: "When are dangling commits permanently deleted from disk?",
    answer: "When Git runs automatic or manual garbage collection (`git gc` / `git prune`) and the commits exceed the reflog expiry period (typically 30 to 90 days)."
  },
  {
    id: 13,
    question: "How does Git handle patch application if a patch produces an empty diff?",
    answer: "Git detects that the changes already exist in the target base and automatically skips the patch without error."
  },
  {
    id: 14,
    question: "What happens in the `.git/` folder if a conflict occurs during patch replay?",
    answer: "Git writes conflict markers to the affected files, stops the rebase, and records the current commit hash in `.git/rebase-merge/stopped-sha`."
  },
  {
    id: 15,
    question: "What command reads `.git/rebase-merge/orig-head` to restore the repo when you want to give up?",
    answer: "`git rebase --abort` reads `orig-head` and resets HEAD and the branch ref to that exact original hash."
  },
  {
    id: 16,
    question: "What algorithm does Git use to apply each patch during a modern rebase?",
    answer: "Git uses a 3-way merge algorithm (historically via `git am` or `git merge-recursive`, and in modern Git via the `ort` merge engine) to apply each patch delta."
  },
  {
    id: 17,
    question: "Can you manually inspect the `.git/rebase-merge` folder while a rebase is paused on a conflict?",
    answer: "Yes, you can use `cat`, `ls`, or VS Code to inspect the files inside `.git/rebase-merge/` to see exactly what Git is doing."
  },
  {
    id: 18,
    question: "What is the difference between `--apply` (legacy am backend) and `--merge` (modern merge backend) in `git rebase`?",
    answer: "The `--apply` backend used `git format-patch` and `git am` (email patches) and struggled with directory renames. The modern default `--merge` backend uses the internal 3-way merge engine, handles renames gracefully, and supports interactive directives."
  },
  {
    id: 19,
    question: "What is a 'cherry-pick loop' in the context of rebase engine mechanics?",
    answer: "Conceptually, `git rebase` can be understood as an automated loop that resets the branch to the base tip and executes `git cherry-pick` sequentially for every commit in the branch range."
  },
  {
    id: 20,
    question: "In the Barrackpore AccoTax case study, how did Sukanta Sir demonstrate rebase internals to Sachin and Susmita?",
    answer: "Sukanta Sir used `git merge-base` to reveal the common ancestor commit hash, then showed how Git rewound HEAD to commit F and generated patch files in `.git/rebase-merge`."
  },
  {
    id: 21,
    question: "What does the file `.git/rebase-merge/done` contain?",
    answer: "A historical log of all commits and directives that have been successfully replayed during the current rebase session."
  },
  {
    id: 22,
    question: "If Git crashes or your computer shuts down during a rebase, is repository state lost?",
    answer: "No. The state is preserved on disk in `.git/rebase-merge/`. When you reopen your terminal, `git status` will report the in-progress rebase and allow you to continue or abort."
  },
  {
    id: 23,
    question: "Can Git rebase perform binary file patching?",
    answer: "Yes, the modern merge-based rebase engine can handle binary files as long as they don't produce unresolvable merge conflicts."
  },
  {
    id: 24,
    question: "How does Git maintain file permission flags (chmod +x) during rebase commit replay?",
    answer: "File mode changes (100644 vs 100755) are recorded in Git tree objects and faithfully reapplied in each new commit."
  },
  {
    id: 25,
    question: "What happens if a commit message contained GPG signing signatures during rebase?",
    answer: "Because the commit object is recreated with new parent hashes and timestamps, old GPG signatures become invalid. You must pass the `-S` or `--gpg-sign` flag to re-sign rebased commits."
  },
  {
    id: 26,
    question: "What does the `--no-ff` option do when passed to `git rebase`?",
    answer: "`git rebase --no-ff` forces Git to replay commits even if the current branch is already a direct descendant of the target base."
  },
  {
    id: 27,
    question: "How does `git reflog` store the pre-rebase commits?",
    answer: "Reflog stores entries like `rebase (start): checkout main` and `rebase (finish): returning to refs/heads/feature`, allowing you to reference the commit SHA prior to the rebase."
  },
  {
    id: 28,
    question: "What is the key insight about Git commits under the hood?",
    answer: "Commits in Git are immutable snapshots. You cannot 'move' a commit; rebasing simply creates new twin snapshots on a new foundation and abandons the old ones."
  }
];

export default questions;
