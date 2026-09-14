/**
 * Topic 10: Navigating and Experimenting in Detached HEAD (GC Risks)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "Can you create new commits while in a detached HEAD state?",
    answer: "Yes, you can stage and commit files just like on a normal branch. HEAD will advance to each new commit."
  },
  {
    id: 2,
    question: "What happens to the `.git/refs/heads/` directory when you make a commit in detached HEAD?",
    answer: "Nothing. No branch pointer inside `.git/refs/heads/` is created or modified; only `.git/HEAD` is updated with the new commit SHA."
  },
  {
    id: 3,
    question: "What is an 'unreachable' or 'dangling' commit in Git?",
    answer: "A commit object in `.git/objects/` that cannot be reached by traversing backwards through ancestry links starting from any named branch ref, tag, or active HEAD."
  },
  {
    id: 4,
    question: "Why are commits created in detached HEAD at risk of garbage collection?",
    answer: "Because once you switch away to another branch, no branch pointer points to them. When their reflog entry expires, Git's garbage collector (`git gc`) will permanently prune them from disk."
  },
  {
    id: 5,
    question: "What warning does Git display if you switch away from detached HEAD after committing?",
    answer: "`Warning: you are leaving X commit(s) behind, not connected to any of your branches:` followed by the commit SHAs and instructions to rescue them."
  },
  {
    id: 6,
    question: "How long do unreferenced commits survive in Git's reflog before garbage collection by default?",
    answer: "By default, Git retains unreachable objects referenced by the reflog for 30 days (`gc.reflogExpireUnreachable=30.days`)."
  },
  {
    id: 7,
    question: "What plumbing command can identify all unreachable commits in your repository?",
    answer: "`git fsck --lost-found` or `git fsck --unreachable`."
  },
  {
    id: 8,
    question: "What does `git gc` (Garbage Collection) do in Git?",
    answer: "It cleans up unreachable dangling objects, packs loose objects into efficient packfiles, and optimizes repository disk storage."
  },
  {
    id: 9,
    question: "How can you rescue an experimental commit made in detached HEAD after switching to main?",
    answer: "Run `git reflog` to find the commit SHA, and create a branch pointing to it: `git branch <new-branch> <commit-sha>` or `git switch -c <new-branch> <commit-sha>`."
  },
  {
    id: 10,
    question: "Is detached HEAD a good place for quick exploratory prototyping?",
    answer: "Yes! It is ideal because if the experiment fails, you can simply switch to `main` without leaving cluttered temporary branches on disk."
  },
  {
    id: 11,
    question: "Can you create a branch while still in detached HEAD to save your commits before switching away?",
    answer: "Yes: running `git switch -c feature/my-experiment` instantly attaches a named branch pointer to your current commit."
  },
  {
    id: 12,
    question: "What is the difference between an unreferenced commit and an uncommitted working tree edit?",
    answer: "An unreferenced commit is safely recorded in Git's object database with a SHA hash, whereas uncommitted working tree edits are not recorded anywhere and can be wiped instantly by `git reset --hard`."
  },
  {
    id: 13,
    question: "How can you view the commit history created inside a detached HEAD state while still in it?",
    answer: "`git log --oneline` shows all commits leading up to the current detached HEAD."
  },
  {
    id: 14,
    question: "Why do detached HEAD commits disappear from `git log` once you switch to `main`?",
    answer: "`git log` only traverses the ancestry of the branch you are currently on. Because `main` does not have the detached commits in its history, they are not displayed."
  },
  {
    id: 15,
    question: "What command can display ALL commits in the repository including unreachable commits in reflog?",
    answer: "`git log --graph --decorate --oneline $(git rev-list -g --all)` or `git reflog`."
  },
  {
    id: 16,
    question: "Can you merge commits from a detached HEAD into `main`?",
    answer: "Yes: switch to `main` and run `git merge <commit-sha>` using the commit SHA from the detached HEAD experiment."
  },
  {
    id: 17,
    question: "What happens if you run `git gc --prune=now`?",
    answer: "Git forcefully prunes all unreachable objects immediately without waiting for the standard 30-day grace period."
  },
  {
    id: 18,
    question: "How does Git create commit objects during detached HEAD commits?",
    answer: "Exactly the same as regular commits: it computes the tree object, records author/committer metadata, references the parent commit SHA, and stores the object in `.git/objects/`."
  },
  {
    id: 19,
    question: "What is the reflog entry recorded when committing in detached HEAD?",
    answer: "`commit: <commit-message>` with `HEAD` moving from `<old-sha>` to `<new-sha>`."
  },
  {
    id: 20,
    question: "Can you cherry-pick a commit made in detached HEAD onto a regular branch?",
    answer: "Yes: `git switch main` followed by `git cherry-pick <detached-commit-sha>`."
  },
  {
    id: 21,
    question: "Why does Git print the advice message with the exact command to create a branch when leaving detached HEAD?",
    answer: "To prevent accidental data loss and provide an immediate one-line rescue command."
  },
  {
    id: 22,
    question: "Can you rebase while in detached HEAD?",
    answer: "Yes, Git will rebase the detached commit range onto another base commit, updating HEAD to the rebased tip."
  },
  {
    id: 23,
    question: "What directory in `.git/lost-found/` stores recovered commit objects after `git fsck --lost-found`?",
    answer: "`.git/lost-found/commit/` contains recovered commit files, and `.git/lost-found/other/` contains loose blobs and trees."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain detached HEAD experimentation to Swadeep at AccoTax Barrackpore?",
    answer: "He compared it to writing draft calculations on a disposable whiteboard. If the formula works, you take a photo and paste it into the company register (create a branch). If it fails, you wipe the board with a duster (switch back to main)."
  },
  {
    id: 25,
    question: "What is the ultimate rule for working with detached HEAD experiments?",
    answer: "Never fear experimenting in detached HEAD, but always attach a branch (`git switch -c <name>`) if you want your commits to survive long term."
  }
];

export default questions;
