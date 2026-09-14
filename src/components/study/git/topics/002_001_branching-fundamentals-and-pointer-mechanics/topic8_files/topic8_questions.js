/**
 * Topic 8: Deleting Branches: Safe deletion git branch -d vs force deletion git branch -D
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What physical file is deleted when you delete a local branch?",
    answer: "Git removes the 41-byte text file located at `.git/refs/heads/<branch-name>`."
  },
  {
    id: 2,
    question: "Do commits get immediately deleted from the repository when a branch is deleted?",
    answer: "No. Commit objects remain intact inside `.git/objects/` and can still be accessed via their SHA hashes or reflog until Git garbage collection (`git gc`) purges unreferenced objects."
  },
  {
    id: 3,
    question: "What does the safe delete flag `-d` (`git branch -d`) check before deleting?",
    answer: "It checks whether all commits on the branch have been fully merged into your current active branch (or its configured upstream)."
  },
  {
    id: 4,
    question: "What happens if you run `git branch -d <name>` on a branch with unmerged commits?",
    answer: "Git aborts the deletion and displays an error explaining that the branch is not fully merged, suggesting `-D` if you are certain."
  },
  {
    id: 5,
    question: "What does uppercase `-D` (`git branch -D`) do?",
    answer: "`-D` is a shortcut for `git branch --delete --force`. It forces branch deletion unconditionally, discarding the reference regardless of merge status."
  },
  {
    id: 6,
    question: "Can you delete the branch you are currently standing on?",
    answer: "No. Git strictly forbids deleting the currently checked-out branch and returns `error: Cannot delete branch '<name>' checked out at '<path>'`."
  },
  {
    id: 7,
    question: "How do you delete a branch that you are currently working on?",
    answer: "First switch to another branch (such as `git switch main`), and then run `git branch -d <branch-name>`."
  },
  {
    id: 8,
    question: "How do you delete a remote branch on GitHub?",
    answer: "`git push origin --delete <branch-name>` (or legacy `git push origin :<branch-name>`)."
  },
  {
    id: 9,
    question: "Why might `git branch -d` fail even if your Pull Request was merged on GitHub using 'Squash and Merge'?",
    answer: "GitHub Squash & Merge creates a new squashed commit with a new SHA on `main`. Because your local feature branch commits have different SHAs, Git's local merge check doesn't recognize them as merged, requiring `git branch -D`."
  },
  {
    id: 10,
    question: "What command can delete multiple local branches simultaneously in a single command?",
    answer: "`git branch -d branch1 branch2 branch3`."
  },
  {
    id: 11,
    question: "How can you delete all local branches that have already been merged into `main`?",
    answer: "`git branch --merged main | grep -v '^[ *]*main$' | xargs git branch -d` (on Unix/macOS) or using PowerShell scripts on Windows."
  },
  {
    id: 12,
    question: "What is a 'dangling commit' created after force-deleting an unmerged branch?",
    answer: "A commit object that has no branch ref, tag, or active pointer leading to it in the commit DAG."
  },
  {
    id: 13,
    question: "How can you recover commits from an accidentally force-deleted branch?",
    answer: "Use `git reflog` to locate the commit SHA before deletion, and restore it with `git switch -c rescue-branch <commit-sha>`."
  },
  {
    id: 14,
    question: "How long do unreferenced dangling commits survive before `git gc` deletes them permanently?",
    answer: "By default, Git preserves unreferenced reflog-tracked commits for 30 days and unreferenced loose objects for 14 to 90 days."
  },
  {
    id: 15,
    question: "What flag deletes remote-tracking references locally without touching the remote server?",
    answer: "`git branch -dr origin/<branch-name>` (or `git branch -d -r origin/<branch-name>`)."
  },
  {
    id: 16,
    question: "What does `git fetch --prune` do regarding deleted remote branches?",
    answer: "It automatically scans remote repositories and removes local tracking references (`origin/<name>`) for branches that were deleted on the remote server."
  },
  {
    id: 17,
    question: "Can `git branch -d` delete a branch merged into an upstream branch other than the current branch?",
    answer: "Yes, if the branch is configured with an upstream tracking branch and all commits are present in that upstream."
  },
  {
    id: 18,
    question: "What is the return message from Git when a branch is successfully deleted?",
    answer: "`Deleted branch <name> (was <short-sha>).`"
  },
  {
    id: 19,
    question: "Why does Git print the SHA hash `(was <short-sha>)` when deleting a branch?",
    answer: "It provides the developer with an immediate reference hash to rescue the branch if deleted by mistake."
  },
  {
    id: 20,
    question: "What error occurs if you try to delete a branch name that does not exist?",
    answer: "`error: branch '<name>' not found.`"
  },
  {
    id: 21,
    question: "Can you delete a branch while in a detached HEAD state?",
    answer: "Yes, you can delete any named branch while in detached HEAD, as long as it's not checked out in another linked worktree."
  },
  {
    id: 22,
    question: "How does Git prevent deleting a branch currently checked out in another linked `git worktree`?",
    answer: "Git detects that the branch is checked out in another directory and aborts: `fatal: '<name>' is already checked out at '<path>'`."
  },
  {
    id: 23,
    question: "What is the difference between `git branch -d` and `git rm`?",
    answer: "`git branch -d` deletes a branch pointer reference, whereas `git rm` removes working tree files and stages their removal from repository history."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain branch deletion safety to Sachin at AccoTax Barrackpore?",
    answer: "He explained that `-d` is like a smart paper shredder that scans each page and beeps loudly if it contains unsubmitted tax returns, while `-D` is a manual override button."
  },
  {
    id: 25,
    question: "What Git command checks repository integrity and displays all unreachable dangling commits?",
    answer: "`git fsck --lost-found`."
  }
];

export default questions;
