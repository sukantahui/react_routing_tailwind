/**
 * Topic 15: Self-Assessment Quiz & Short Questions for Module 002_001
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is a Git branch at the physical filesystem level?",
    answer: "A lightweight 41-byte plain text file inside `.git/refs/heads/` containing the 40-character SHA-1 hash of the commit it points to plus a newline."
  },
  {
    id: 2,
    question: "How does Git branching differ from SVN branching in terms of time and space complexity?",
    answer: "Git branching is O(1) constant time (~2ms) and consumes 41 bytes of disk, whereas SVN branching is O(N) linear time, copying entire directory trees on the server."
  },
  {
    id: 3,
    question: "What is the primary role of `.git/HEAD` in Git's architecture?",
    answer: "It is a symbolic reference (symref) that tracks the currently checked-out branch (e.g. `ref: refs/heads/main`) and determines where the next commit will attach."
  },
  {
    id: 4,
    question: "Does `git branch feature-gst` switch your active working tree to that new branch?",
    answer: "No. `git branch` strictly creates the reference file; your active HEAD remains on the current branch."
  },
  {
    id: 5,
    question: "Why was `git switch` introduced in Git 2.23 to replace `git checkout` for branch navigation?",
    answer: "To eliminate the ambiguity and risk of `git checkout`, which dangerously mixed branch navigation with destructive file restoration."
  },
  {
    id: 6,
    question: "What modern atomic command creates and switches to a new branch in a single step?",
    answer: "`git switch -c <branch-name>`."
  },
  {
    id: 7,
    question: "What does `git branch -vv` display that `git branch` does not?",
    answer: "It displays the commit SHA, subject message, and upstream remote tracking sync status (`[origin/main: ahead X, behind Y]`)."
  },
  {
    id: 8,
    question: "How do you rename your currently checked-out local branch?",
    answer: "`git branch -m <new-branch-name>`."
  },
  {
    id: 9,
    question: "What is the difference between `git branch -d` and `git branch -D`?",
    answer: "`-d` performs a safety check and refuses to delete unmerged branches, while `-D` forces deletion unconditionally."
  },
  {
    id: 10,
    question: "What defines a 'Detached HEAD' state in Git?",
    answer: "A state where `.git/HEAD` contains a raw 40-character commit SHA directly rather than pointing to a branch reference in `.git/refs/heads/`."
  },
  {
    id: 11,
    question: "Name three common triggers that enter a Detached HEAD state.",
    answer: "1. Checking out a commit SHA directly (`git switch --detach <sha>`)\n2. Checking out a tag (`git checkout v1.0.0`)\n3. Checking out a remote branch directly (`git checkout origin/main`)."
  },
  {
    id: 12,
    question: "Why are commits made in detached HEAD at risk of garbage collection?",
    answer: "Because no branch reference points to them. Once you switch away, they become dangling and will eventually be purged by `git gc`."
  },
  {
    id: 13,
    question: "How do you rescue experimental commits after leaving a detached HEAD state?",
    answer: "Find the commit SHA in `git reflog`, then run `git switch -c <rescue-branch-name> <commit-sha>`."
  },
  {
    id: 14,
    question: "What is the difference between `git diff A..B` and `git diff A...B`?",
    answer: "`A..B` compares the endpoints of both branches directly, while `A...B` compares from their common merge base to B (the PR view)."
  },
  {
    id: 15,
    question: "What plumbing command computes the common ancestor of two branches?",
    answer: "`git merge-base branchA branchB`."
  },
  {
    id: 16,
    question: "What command lists only branches that have been fully integrated into the current HEAD?",
    answer: "`git branch --merged`."
  },
  {
    id: 17,
    question: "What command lists branches that still contain unintegrated work?",
    answer: "`git branch --no-merged`."
  },
  {
    id: 18,
    question: "How do you switch back to the previously active branch using a shortcut?",
    answer: "`git switch -`."
  },
  {
    id: 19,
    question: "What command deletes a remote branch on GitHub?",
    answer: "`git push origin --delete <branch-name>`."
  },
  {
    id: 20,
    question: "Can you delete a branch that you are currently standing on?",
    answer: "No. Git aborts with an error; you must switch to another branch first."
  },
  {
    id: 21,
    question: "What does `@{-1}` represent in modern Git revision syntax?",
    answer: "The previously checked-out branch name."
  },
  {
    id: 22,
    question: "What command displays only the active branch name without extra formatting?",
    answer: "`git branch --show-current`."
  },
  {
    id: 23,
    question: "How do you sort branches by most recent commit date?",
    answer: "`git branch --sort=-committerdate`."
  },
  {
    id: 24,
    question: "What command discards unstaged working directory file modifications in modern Git?",
    answer: "`git restore <filename>`."
  },
  {
    id: 25,
    question: "What happens to uncommitted changes when you switch branches with `git switch`?",
    answer: "If the modified files do not conflict with differences between the branches, Git transfers them seamlessly; if they conflict, Git aborts the switch safely."
  },
  {
    id: 26,
    question: "What is an 'unborn branch' in a newly initialized Git repository?",
    answer: "A state where `.git/HEAD` points to `refs/heads/main`, but the file does not exist yet because no commit has been made."
  },
  {
    id: 27,
    question: "How does Git pack thousands of loose branch files to optimize performance?",
    answer: "By consolidating them into `.git/packed-refs` via `git pack-refs` or `git gc`."
  },
  {
    id: 28,
    question: "What command removes stale local remote-tracking references for branches deleted on GitHub?",
    answer: "`git fetch --prune` (or `git fetch -p`)."
  },
  {
    id: 29,
    question: "How does `git switch --orphan <name>` differ from `git switch -c <name>`?",
    answer: "`--orphan` creates a branch with zero history and an empty root commit state, while `-c` branches from current HEAD."
  },
  {
    id: 30,
    question: "What is the next topic module in Segment 2 of the Git Curriculum?",
    answer: "Module 002_002: Merging Strategies and Conflict Resolution (Fast-Forward vs 3-Way Merges, Conflict Markers, and Resolution Workflows)."
  }
];

export default questions;
