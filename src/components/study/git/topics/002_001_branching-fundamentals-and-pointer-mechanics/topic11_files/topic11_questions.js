/**
 * Topic 11: Recovering from Detached HEAD (Saving Experimental Commits)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "How do you immediately save experimental commits while still standing inside a detached HEAD state?",
    answer: "Run `git switch -c <new-branch-name>` (or `git checkout -b <new-branch-name>`). This instantly attaches a new named branch pointer to your current commit."
  },
  {
    id: 2,
    question: "What happens if you accidentally ran `git switch main` and left detached commits behind?",
    answer: "Your files in the working directory return to the `main` branch state, and the detached commits become unreferenced. However, their SHA hashes are still safely stored in `git reflog`."
  },
  {
    id: 3,
    question: "How do you recover commits left behind after switching away from detached HEAD?",
    answer: "1. Run `git reflog` to identify the commit SHA.\n2. Run `git switch -c <new-branch-name> <commit-sha>`."
  },
  {
    id: 4,
    question: "Does `git branch <new-branch-name> <commit-sha>` switch you to the newly created branch?",
    answer: "No. It creates the pointer reference file at that commit SHA, but keeps HEAD on your current branch. You would then run `git switch <new-branch-name>`."
  },
  {
    id: 5,
    question: "How can you integrate rescued experimental commits into your `main` production branch?",
    answer: "Switch to `main` (`git switch main`) and merge the rescued branch (`git merge <rescued-branch-name>`)."
  },
  {
    id: 6,
    question: "Can you selectively extract only one specific commit from a detached HEAD session into `main`?",
    answer: "Yes, using cherry-pick: `git switch main` followed by `git cherry-pick <commit-sha>`."
  },
  {
    id: 7,
    question: "How does Git reflog keep track of detached HEAD commits?",
    answer: "Every time a commit is created in detached HEAD, Git appends a line to `.git/logs/HEAD` with the new commit SHA and message."
  },
  {
    id: 8,
    question: "How far back does `git reflog` record history by default?",
    answer: "By default, Git preserves reflog entries for 90 days for reachable objects and 30 days for unreachable/dangling objects."
  },
  {
    id: 9,
    question: "What command can display the full commit history and patch diff of a dangling commit before rescuing it?",
    answer: "`git show <commit-sha>`."
  },
  {
    id: 10,
    question: "What command displays a graphical tree containing all unreachable reflog commits?",
    answer: "`git log --graph --decorate --oneline $(git rev-list -g --all)`."
  },
  {
    id: 11,
    question: "Is there any limit to the number of commits you can rescue from a detached HEAD state?",
    answer: "No. Creating a branch at the tip commit of a detached sequence automatically rescues the entire chain of parent commits leading back to the original fork point."
  },
  {
    id: 12,
    question: "What happens if you create a rescue branch at an intermediate commit instead of the tip commit?",
    answer: "The branch will only include commits up to that intermediate commit; commits made after it will remain dangling."
  },
  {
    id: 13,
    question: "What is the difference between `git switch -c rescue` and `git reset --hard` when recovering from detached HEAD?",
    answer: "`git switch -c rescue` non-destructively attaches a branch pointer to the commit, whereas `git reset --hard` moves your active branch pointer and overwrites working tree files."
  },
  {
    id: 14,
    question: "Can you create a Tag instead of a branch to save a detached HEAD commit?",
    answer: "Yes: `git tag <tag-name> <commit-sha>` will prevent the commit from being garbage collected, though tags are immutable and cannot advance."
  },
  {
    id: 15,
    question: "What is the danger of waiting more than 30 days to rescue detached commits?",
    answer: "Git's automatic background maintenance or manual `git gc` may prune expired reflog entries and delete unreachable objects permanently."
  },
  {
    id: 16,
    question: "What command forces Git to retain all unreachable objects indefinitely in configuration?",
    answer: "`git config gc.pruneExpire never` and `git config gc.reflogExpireUnreachable never`."
  },
  {
    id: 17,
    question: "How can you check if any untracked or uncommitted files were left behind when leaving detached HEAD?",
    answer: "`git status` will show any untracked files in the working directory that were not part of the committed history."
  },
  {
    id: 18,
    question: "Can you push a rescued branch to GitHub immediately after creating it?",
    answer: "Yes: `git push -u origin <rescued-branch-name>`."
  },
  {
    id: 19,
    question: "What happens if you run `git merge` while still in detached HEAD?",
    answer: "Git merges the specified branch into the detached HEAD commit, updating HEAD to the merge commit SHA while remaining detached."
  },
  {
    id: 20,
    question: "Why does Git print the commit hash in the detached HEAD departure warning message?",
    answer: "So you can immediately copy-paste the SHA and create a rescue branch with zero effort."
  },
  {
    id: 21,
    question: "Can you rescue detached commits using a Git GUI tool (like VS Code or GitKraken)?",
    answer: "Yes, by opening the Reflog view, right-clicking the commit, and choosing 'Create Branch from Commit'."
  },
  {
    id: 22,
    question: "What happens to the staging area (index) when you run `git switch -c rescue`?",
    answer: "Any staged modifications are carried over seamlessly to the new rescue branch."
  },
  {
    id: 23,
    question: "What command lists all reflog actions specific to branch switching?",
    answer: "`git reflog | grep checkout`."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain commit rescue to Debangshu Poddar at Barrackpore?",
    answer: "He explained that in Git, commits with a SHA are like books dropped in a library hallway. They aren't thrown away; they just need a catalog number (a branch pointer) so people can find them on the shelf."
  },
  {
    id: 25,
    question: "What is the fastest 1-line command to recover a lost detached commit and merge it into main?",
    answer: "`git merge <lost-commit-sha>` while on `main`."
  }
];

export default questions;
