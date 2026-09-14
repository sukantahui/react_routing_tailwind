/**
 * Topic 6: Listing and Inspecting Branches: git branch, -v, -vv, --merged
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What does running `git branch` with no arguments output?",
    answer: "It prints a list of all local branches in the repository, with an asterisk (*) and green color indicating the currently active branch."
  },
  {
    id: 2,
    question: "What extra information does `git branch -v` (verbose) provide?",
    answer: "It displays each branch's name, the short SHA-1 hash of its latest commit, and the first line of the commit subject message."
  },
  {
    id: 3,
    question: "What does `git branch -vv` (very verbose) display?",
    answer: "In addition to the commit SHA and subject, it displays the upstream tracking branch configuration (e.g. `[origin/main: ahead 1, behind 2]`)."
  },
  {
    id: 4,
    question: "What does `[origin/main: ahead 2]` mean in `git branch -vv` output?",
    answer: "It means your local branch has 2 commits that have not yet been pushed to the remote `origin/main` branch."
  },
  {
    id: 5,
    question: "What does `[origin/main: behind 3]` mean in `git branch -vv` output?",
    answer: "It means the remote `origin/main` branch has 3 commits that you have not yet fetched and merged/rebased into your local branch."
  },
  {
    id: 6,
    question: "What flag lists all remote-tracking branches in the repository?",
    answer: "`git branch -r` (or `git branch --remotes`)."
  },
  {
    id: 7,
    question: "What flag lists both local and remote-tracking branches together?",
    answer: "`git branch -a` (or `git branch --all`)."
  },
  {
    id: 8,
    question: "How can you list only the branches that have already been fully merged into your current HEAD?",
    answer: "`git branch --merged`."
  },
  {
    id: 9,
    question: "Why is `git branch --merged` crucial before performing branch cleanup?",
    answer: "It tells you which feature branches are 100% incorporated into `main` and can be safely deleted with `git branch -d` without risking code loss."
  },
  {
    id: 10,
    question: "What does `git branch --no-merged` output?",
    answer: "It lists branches that contain commits not yet merged into your current HEAD, warning you that deleting them would lose work."
  },
  {
    id: 11,
    question: "How can you sort branches by the date of their most recent commit (newest first)?",
    answer: "`git branch --sort=-committerdate`."
  },
  {
    id: 12,
    question: "How can you sort branches alphabetically?",
    answer: "`git branch --sort=refname`."
  },
  {
    id: 13,
    question: "What command displays only the name of the current active branch?",
    answer: "`git branch --show-current`."
  },
  {
    id: 14,
    question: "How can you find which branches contain a specific commit SHA?",
    answer: "`git branch --contains <commit-sha>`."
  },
  {
    id: 15,
    question: "How can you find which branches DO NOT contain a specific commit SHA?",
    answer: "`git branch --no-contains <commit-sha>`."
  },
  {
    id: 16,
    question: "What flag allows filtering branches by a glob pattern (e.g. `feature/*`)?",
    answer: "`git branch --list 'feature/*'`."
  },
  {
    id: 17,
    question: "How can you format the branch output with custom fields (like author and relative date)?",
    answer: "`git branch --format='%(refname:short) | %(committerdate:relative) | %(authorname)'`."
  },
  {
    id: 18,
    question: "Where are remote tracking branch reference files stored physically?",
    answer: "Inside `.git/refs/remotes/<remote-name>/` (e.g. `.git/refs/remotes/origin/main`)."
  },
  {
    id: 19,
    question: "What does `[origin/main: gone]` mean in `git branch -vv` output?",
    answer: "It means the remote branch was deleted on the remote repository (e.g. GitHub), but your local branch still retains the old upstream tracking reference."
  },
  {
    id: 20,
    question: "How do you clean up stale remote branch tracking references after they are deleted on GitHub?",
    answer: "`git fetch --prune` (or `git remote prune origin`)."
  },
  {
    id: 21,
    question: "Can `git branch` show branch points from another branch rather than HEAD?",
    answer: "Yes: `git branch --merged <other-branch>` or `git branch --no-merged <other-branch>`."
  },
  {
    id: 22,
    question: "What is the difference between `git branch` and `git tag` in terms of listing objects?",
    answer: "`git branch` lists movable branch references pointing to heads of branches, whereas `git tag` lists fixed release checkpoints."
  },
  {
    id: 23,
    question: "How can you inspect the upstream tracking configuration of a specific branch in `.git/config`?",
    answer: "`git config --get branch.<branch-name>.remote` and `git config --get branch.<branch-name>.merge`."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain `git branch -vv` to Swadeep Sarkar at AccoTax Barrackpore?",
    answer: "He compared `git branch -vv` to an airport departure display board that shows not just your flight number (branch), but whether your plane is early, delayed, or already landed (ahead/behind GitHub)."
  },
  {
    id: 25,
    question: "What flag enables case-insensitive pattern matching when searching branch names?",
    answer: "`git branch -i --list 'FEATURE/*'` or `git branch --ignore-case --list 'feat*'`."
  }
];

export default questions;
