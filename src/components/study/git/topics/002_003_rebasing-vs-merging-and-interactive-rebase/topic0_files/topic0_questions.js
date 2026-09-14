/**
 * Topic 0 Questions: What is Git Rebase? Replaying commits on top of a new base tip
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is Git Rebase in simple terms?",
    answer: "Git Rebase is the process of taking commits from one branch and replaying them one-by-one on top of another base commit or branch tip. Instead of creating a diamond merge commit, it rewrites the starting point (base) of your branch so that it appears to have been built directly off the latest commit of the target branch."
  },
  {
    id: 2,
    question: "How does git rebase differ fundamentally from git merge?",
    answer: "Git merge joins two divergent branch tips together by creating a new 3-way merge commit with two parents, preserving the exact non-linear timeline. Git rebase moves the entire feature branch to begin from the tip of the target branch, re-applying changes as new single-parent commits and producing a completely straight, linear history."
  },
  {
    id: 3,
    question: "Do rebased commits keep their original SHA-1 commit hashes?",
    answer: "No. Because each replayed commit has a new parent commit, a new author/committer timestamp, and potentially diff modifications, its SHA-1 hash is completely recalculated. The rebased commits are brand new objects in Git's object database."
  },
  {
    id: 4,
    question: "What happens to the old original commits after rebasing?",
    answer: "The old commit objects remain temporarily in `.git/objects` but are no longer referenced by any branch ref. They can still be found in `git reflog` until Git's garbage collection (`git gc`) purges them after the reflog expiration window (typically 30–90 days)."
  },
  {
    id: 5,
    question: "What is the command sequence to rebase a feature branch onto main?",
    answer: "First switch to the feature branch: `git switch feature`, then run `git rebase main`. Alternatively, in a single command: `git rebase main feature`."
  },
  {
    id: 6,
    question: "What is a 'base tip' in the context of git rebase?",
    answer: "The 'base tip' is the commit on which your feature commits will be re-anchored. For example, in `git rebase main`, the current tip commit of the `main` branch serves as the new base tip."
  },
  {
    id: 7,
    question: "Why do software engineering teams prefer linear history created by rebasing?",
    answer: "Linear history simplifies code reviews, makes `git log` readable without maze-like merge graphs, eliminates clutter from 'Merge branch main into feature' commits, and makes tools like `git bisect` fast and unambiguous."
  },
  {
    id: 8,
    question: "What does Git do under the hood during step 1 of git rebase?",
    answer: "Git runs an internal `git merge-base` calculation between the current branch and the upstream branch to identify the common ancestor commit."
  },
  {
    id: 9,
    question: "Where does Git store the temporary patches while rebasing?",
    answer: "Git stores temporary patch files and metadata inside the `.git/rebase-apply/` or `.git/rebase-merge/` directory inside your local repository."
  },
  {
    id: 10,
    question: "Can git rebase cause merge conflicts?",
    answer: "Yes. As Git replays each commit sequentially on top of the new base, if any commit modifies the same lines as changes present in the target branch, Git pauses the rebase and prompts you to resolve the conflict before continuing."
  },
  {
    id: 11,
    question: "What command do you run after resolving a conflict during git rebase?",
    answer: "After resolving the conflicted files and staging them with `git add <file>`, you run `git rebase --continue`. You do NOT run `git commit`."
  },
  {
    id: 12,
    question: "What happens if you run git rebase --abort during an in-progress rebase?",
    answer: "Git immediately halts the rebase operation, purges the `.git/rebase-merge` folder, and resets your working tree and branch pointer back to the exact state before `git rebase` was invoked."
  },
  {
    id: 13,
    question: "Why should you never rebase commits that have already been pushed to a public/shared branch?",
    answer: "Because rebasing rewrites commit hashes. If teammates have pulled the original commits and built new work on top of them, rebasing forces duplicate commits and messy synchronization conflicts for everyone on the team."
  },
  {
    id: 14,
    question: "Is git rebase non-destructive or destructive?",
    answer: "Locally, it is safe because old commits are preserved in `git reflog`. However, it is considered a history-rewriting operation because it changes the lineage and commit hashes of the branch."
  },
  {
    id: 15,
    question: "How does git log --graph look after a feature branch is rebased onto main and then fast-forward merged?",
    answer: "It looks like a single perfectly straight vertical line with zero branches or merge bubbles."
  },
  {
    id: 16,
    question: "In the Barrackpore AccoTax case study, what problem did rebasing solve for Sachin and Mahima?",
    answer: "It prevented multiple messy 'Merge main into feature' synchronization commits while they were developing the ₹ GST calculation module alongside Sukanta Sir's core ledger updates."
  },
  {
    id: 17,
    question: "What is the difference between git rebase main and git merge main when run on a feature branch?",
    answer: "`git merge main` pulls main's new commits into feature via a 2-parent merge commit. `git rebase main` lifts feature's commits and puts them at the very end of main's commits without creating any merge commit."
  },
  {
    id: 18,
    question: "What is the upstream parameter in git rebase <upstream>?",
    answer: "The `<upstream>` parameter is the branch or commit reference against which the current branch is compared and onto which the branch will be re-based."
  },
  {
    id: 19,
    question: "Does git rebase change the committer date or author date?",
    answer: "Git preserves the original 'Author Date' (when the code was originally written) but updates the 'Committer Date' (when the rebase replayed the commit)."
  },
  {
    id: 20,
    question: "Can you rebase onto a specific commit hash instead of a branch name?",
    answer: "Yes, you can run `git rebase <commit_sha>` or `git rebase --onto <newbase> <upstream> <branch>`."
  },
  {
    id: 21,
    question: "What is the difference between git pull and git pull --rebase?",
    answer: "`git pull` performs a `git fetch` followed by `git merge origin/<branch>`, which can introduce a merge commit. `git pull --rebase` fetches and then replays your local unpushed commits on top of the fetched remote branch, keeping history linear."
  },
  {
    id: 22,
    question: "What happens if a commit on your feature branch makes a change that already exists on main?",
    answer: "Git detects that the patch delta results in an empty diff and automatically drops the redundant commit during the rebase."
  },
  {
    id: 23,
    question: "How can you undo a rebase if you made a mistake and haven't pushed yet?",
    answer: "You can find your branch's commit hash before the rebase by running `git reflog`, then reset back to it using `git reset --hard HEAD@{n}` or `git reset --hard <old_hash>`."
  },
  {
    id: 24,
    question: "What does git rebase --skip do?",
    answer: "It skips the currently conflicting commit, discarding its changes and proceeding to replay the remaining commits in the queue."
  },
  {
    id: 25,
    question: "Is rebasing supported in all Git GUI tools like VS Code, GitKraken, and Sourcetree?",
    answer: "Yes, almost all modern Git graphical tools provide one-click 'Rebase current branch on...' and interactive rebase visualizers."
  },
  {
    id: 26,
    question: "Why does git bisect work better on rebased linear histories?",
    answer: "On a linear history, binary search travels straight down one commit chain. In diamond-merged histories, bisect may test commits on side branches where code was in an intermediate broken state."
  },
  {
    id: 27,
    question: "What role does the HEAD pointer play during an ongoing rebase?",
    answer: "During a rebase, HEAD is temporarily detached and moves commit-by-commit as each patch is applied on top of the target base."
  },
  {
    id: 28,
    question: "What is the Golden Rule of Git Rebase?",
    answer: "Never rebase a branch that is public and shared with other developers. Only rebase private, local branches before merging them upstream."
  }
];

export default questions;
