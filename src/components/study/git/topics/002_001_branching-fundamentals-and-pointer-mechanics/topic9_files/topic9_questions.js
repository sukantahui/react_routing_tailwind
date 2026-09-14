/**
 * Topic 9: The Detached HEAD State: Causes and Direct Commit Checkouts
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the 'Detached HEAD' state in Git?",
    answer: "A state where HEAD points directly to a specific commit SHA-1 hash rather than pointing symbolically to a branch reference in `.git/refs/heads/`."
  },
  {
    id: 2,
    question: "What does `.git/HEAD` contain when in a detached HEAD state?",
    answer: "It contains the raw 40-character hexadecimal SHA-1 commit hash (e.g. `7a8b9c0d1e2f3456789abcdef0123456789abcde`) instead of `ref: refs/heads/...`."
  },
  {
    id: 3,
    question: "What is the most common trigger that causes a detached HEAD state?",
    answer: "Explicitly checking out a commit SHA directly using `git checkout <commit-sha>` or `git switch --detach <commit-sha>`."
  },
  {
    id: 4,
    question: "Why does checking out a release tag (e.g. `git checkout v1.0.0`) put you in detached HEAD?",
    answer: "Because tags are permanent, immutable pointers to specific commits rather than movable branch references."
  },
  {
    id: 5,
    question: "Why does checking out a remote-tracking branch directly (e.g. `git checkout origin/main`) cause a detached HEAD?",
    answer: "Remote-tracking branches (`origin/main`) are read-only pointers updated by `git fetch`. You cannot commit directly to them without creating a local branch."
  },
  {
    id: 6,
    question: "Is Detached HEAD a bug or repository corruption?",
    answer: "No! It is an intentional, core feature of Git designed for historical inspection, time-travel debugging, and disposable experimentation."
  },
  {
    id: 7,
    question: "What command in modern Git explicitly enters detached HEAD?",
    answer: "`git switch --detach <commit-sha>` (or `git checkout <commit-sha>`)."
  },
  {
    id: 8,
    question: "What does `git status` display when in detached HEAD?",
    answer: "`HEAD detached at <commit-sha>` (or `HEAD detached from <commit-sha>`)."
  },
  {
    id: 9,
    question: "Can you compile and run code while in detached HEAD?",
    answer: "Yes! Your working tree reflects the exact state of the checked-out commit, allowing full build, test, and execution."
  },
  {
    id: 10,
    question: "Can you create new commits while in detached HEAD?",
    answer: "Yes, you can create commits. HEAD will advance with each commit, but no named branch reference will track them."
  },
  {
    id: 11,
    question: "What happens to commits created in detached HEAD if you switch back to `main` without creating a branch?",
    answer: "They become unreferenced (dangling) commits, not visible in normal `git log`, and will eventually be cleaned up by `git gc`."
  },
  {
    id: 12,
    question: "How does `git bisect` utilize detached HEAD?",
    answer: "`git bisect` automatically checks out intermediate commits in detached HEAD mode to test whether a bug is present during binary search."
  },
  {
    id: 13,
    question: "How do you safely leave detached HEAD and return to your main branch?",
    answer: "`git switch main` (or `git checkout main`)."
  },
  {
    id: 14,
    question: "What warning does Git print when you switch away from detached HEAD with unbranched commits?",
    answer: "`Warning: you are leaving 1 commit behind, not connected to any of your branches:` followed by the commit SHA."
  },
  {
    id: 15,
    question: "How does Git reflog help if you left detached HEAD commits behind?",
    answer: "Git reflog records the SHA of every commit made in detached HEAD, allowing you to attach a branch to it at any time."
  },
  {
    id: 16,
    question: "What does `git branch` show when in detached HEAD?",
    answer: "It displays `* (HEAD detached at <short-sha>)` at the top of the branch list."
  },
  {
    id: 17,
    question: "Can you create a branch directly from your detached HEAD position?",
    answer: "Yes: `git switch -c new-feature` or `git branch new-feature`."
  },
  {
    id: 18,
    question: "What happens if you run `git checkout HEAD~3`?",
    answer: "Git checks out the great-grandparent commit (3 commits back from current HEAD) in a detached HEAD state."
  },
  {
    id: 19,
    question: "Why do continuous integration (CI/CD) runners often clone repositories in detached HEAD mode?",
    answer: "CI runners checkout the exact commit SHA that triggered the build pipeline to guarantee reproducible builds without branch volatility."
  },
  {
    id: 20,
    question: "What happens if you run `git symbolic-ref HEAD` in detached HEAD?",
    answer: "It returns an error: `fatal: ref HEAD is not a symbolic ref`."
  },
  {
    id: 21,
    question: "Can you run `git diff` while in detached HEAD?",
    answer: "Yes, `git diff` works normally, comparing your working tree to the detached commit."
  },
  {
    id: 22,
    question: "Can you modify and commit files while in detached HEAD?",
    answer: "Yes, you can stage and commit just like normal; only the pointer attachment behavior differs."
  },
  {
    id: 23,
    question: "How does Git determine the commit message when checking out a tag in detached HEAD?",
    answer: "Git prints the tag name, tagger annotations, and underlying commit object details."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain detached HEAD to Mahima at AccoTax Barrackpore?",
    answer: "He explained that checking out a branch is like taking an elevator that stays attached to the cable (the branch ref), while detached HEAD is like stepping out onto a glass observation deck at floor 50 to take photos without tying down an elevator."
  },
  {
    id: 25,
    question: "What is the recommended modern command to inspect a historical commit without causing confusion?",
    answer: "`git switch --detach <commit-sha>`."
  }
];

export default questions;
