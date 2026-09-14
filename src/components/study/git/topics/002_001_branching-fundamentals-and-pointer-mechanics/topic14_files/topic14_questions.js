/**
 * Topic 14: Hands-on Terminal Lab: Complete Branching Drills
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the primary objective of the Hands-on Terminal Lab in Module 002_001?",
    answer: "To practice end-to-end branch pointer mechanics, atomic switching, detached HEAD experimentation, commit rescue, 3-dot diffing, and safe branch cleanup in a live shell environment."
  },
  {
    id: 2,
    question: "What is the fastest command to create and switch to a new branch called `feature/tax-v2`?",
    answer: "`git switch -c feature/tax-v2`."
  },
  {
    id: 3,
    question: "How do you navigate into a detached HEAD state on a historical commit SHA?",
    answer: "`git switch --detach <commit-sha>` (or `git checkout <commit-sha>`)."
  },
  {
    id: 4,
    question: "What happens if you make 3 commits in detached HEAD and then switch to `main` without creating a branch?",
    answer: "The 3 commits become unreachable dangling objects in `.git/objects/`, recorded only in `git reflog`."
  },
  {
    id: 5,
    question: "How do you rescue those 3 commits from detached HEAD into a permanent branch?",
    answer: "Run `git reflog` to get the tip commit SHA, then run `git switch -c <branch-name> <commit-sha>`."
  },
  {
    id: 6,
    question: "How do you compare changes made on `feature` against `main` from the merge base (PR view)?",
    answer: "`git diff main...feature`."
  },
  {
    id: 7,
    question: "Why does `git branch -d feature` succeed after merging into `main`?",
    answer: "Because all commits from `feature` are fully reachable from `main`, satisfying Git's merge safety check."
  },
  {
    id: 8,
    question: "Why does `git branch -d feature` fail if `feature` has unmerged commits?",
    answer: "Git protects you from accidental data loss by detecting unreachable commits and requiring uppercase `-D` for explicit override."
  },
  {
    id: 9,
    question: "How do you check which local branches have already been merged into the current branch?",
    answer: "`git branch --merged`."
  },
  {
    id: 10,
    question: "How do you inspect the latest commit message for each branch?",
    answer: "`git branch -v`."
  },
  {
    id: 11,
    question: "What command shows upstream tracking sync status (ahead/behind)?",
    answer: "`git branch -vv`."
  },
  {
    id: 12,
    question: "How do you rename the current active branch to `main`?",
    answer: "`git branch -m main`."
  },
  {
    id: 13,
    question: "What is the shortcut to switch back to the previously active branch?",
    answer: "`git switch -`."
  },
  {
    id: 14,
    question: "Where are local branch pointer files stored on disk?",
    answer: "In `.git/refs/heads/`."
  },
  {
    id: 15,
    question: "Where is the active HEAD pointer stored on disk?",
    answer: "In `.git/HEAD`."
  },
  {
    id: 16,
    question: "What is the exact size of a loose branch pointer file on disk?",
    answer: "41 bytes (40 hexadecimal characters for SHA-1 plus 1 newline character)."
  },
  {
    id: 17,
    question: "How long does it take Git to create a branch in a repository with 1 million commits?",
    answer: "Around 1 to 3 milliseconds, because writing a 41-byte text file is an O(1) constant time operation."
  },
  {
    id: 18,
    question: "How do you discard unstaged modifications in a file using modern Git?",
    answer: "`git restore <filename>`."
  },
  {
    id: 19,
    question: "How do you unstage a staged file using modern Git?",
    answer: "`git restore --staged <filename>`."
  },
  {
    id: 20,
    question: "Can you delete a remote branch on GitHub using the `git push` command?",
    answer: "Yes: `git push origin --delete <branch-name>`."
  },
  {
    id: 21,
    question: "What command finds the common ancestor SHA between two branches?",
    answer: "`git merge-base branchA branchB`."
  },
  {
    id: 22,
    question: "How do you list all branches including remote-tracking branches?",
    answer: "`git branch -a`."
  },
  {
    id: 23,
    question: "What command renders an ASCII graphical tree of all branches and commits?",
    answer: "`git log --graph --oneline --all`."
  },
  {
    id: 24,
    question: "How did Sukanta Hui review lab completion with students in Barrackpore?",
    answer: "He had students run the automated bash drill script and inspect the graphical ASCII DAG tree at the end to verify perfect pointer movement."
  },
  {
    id: 25,
    question: "What is the single most valuable habit developed in this lab?",
    answer: "Creating micro-feature branches (`git switch -c`) for every individual task and cleaning them up (`git branch -d`) after merging."
  }
];

export default questions;
