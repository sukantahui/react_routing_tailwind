/**
 * Topic 4: Switching Branches: Modern git switch vs legacy git checkout
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "Why did Git introduce `git switch` in version 2.23 (August 2019)?",
    answer: "To decouple the overloaded responsibilities of `git checkout` (which handled both switching branches and discarding uncommitted file edits), providing a safer, single-purpose command specifically for branch switching."
  },
  {
    id: 2,
    question: "What is the primary danger of using legacy `git checkout` for file discarding?",
    answer: "If a developer mistakenly types `git checkout filename` intending to switch to a branch named 'filename', but a file with that name exists, Git wipes the uncommitted edits in that file permanently without confirmation."
  },
  {
    id: 3,
    question: "What companion command was introduced alongside `git switch` to handle file restoration?",
    answer: "`git restore` was introduced in Git 2.23 specifically to handle discarding unstaged file changes and unstaging files from the Index."
  },
  {
    id: 4,
    question: "What happens to `.git/HEAD` when you run `git switch feature-gst`?",
    answer: "Git updates `.git/HEAD` to contain the symbolic reference `ref: refs/heads/feature-gst` and updates the working tree files to match that branch's tip commit."
  },
  {
    id: 5,
    question: "What does the hyphen shortcut in `git switch -` do?",
    answer: "It switches back to the previously checked-out branch (equivalent to `git switch @{-1}`)."
  },
  {
    id: 6,
    question: "What happens if you have uncommitted, unstaged modifications in files when switching branches?",
    answer: "If the modified files do not conflict with differences between the two branches, Git carries over the changes. If they do conflict, Git safely aborts the switch with an error."
  },
  {
    id: 7,
    question: "What error message does Git display if uncommitted changes would be overwritten by a branch switch?",
    answer: "`error: Your local changes to the following files would be overwritten by checkout. Please commit your changes or stash them before you switch branches.`"
  },
  {
    id: 8,
    question: "How can you safely preserve dirty uncommitted changes before switching branches?",
    answer: "By using `git stash` (or committing as a WIP commit) before switching, and running `git stash pop` after switching."
  },
  {
    id: 9,
    question: "What flag in `git switch` allows forcing a branch switch even if there are uncommitted changes, attempting a 3-way merge?",
    answer: "`git switch --merge <branch>` (or `git switch -m <branch>`) attempts to merge local changes into the target branch."
  },
  {
    id: 10,
    question: "What flag allows force-switching to another branch while throwing away local uncommitted changes?",
    answer: "`git switch --discard-changes <branch>` (or `git switch -f <branch>`)."
  },
  {
    id: 11,
    question: "What command in `git switch` allows navigating to a detached HEAD commit safely?",
    answer: "`git switch --detach <commit-sha>` cleanly enters a detached HEAD state without confusing branch semantics."
  },
  {
    id: 12,
    question: "Can `git switch` be used to switch to a remote-tracking branch directly?",
    answer: "Yes. If a branch exists on a remote (e.g. `origin/feature-gst`) and not locally, running `git switch feature-gst` automatically creates a local tracking branch pointing to `origin/feature-gst`."
  },
  {
    id: 13,
    question: "What is Git's 'guess' mode in `git switch <name>`?",
    answer: "When `<name>` does not exist locally, Git automatically guesses that you want to track a matching remote branch `origin/<name>` and sets up upstream tracking automatically."
  },
  {
    id: 14,
    question: "How can you disable the automatic remote branch guessing behavior in `git switch`?",
    answer: "By passing the `--no-guess` flag: `git switch --no-guess <name>`."
  },
  {
    id: 15,
    question: "Is `git checkout` deprecated or removed from Git?",
    answer: "No. `git checkout` remains supported for backward compatibility with existing legacy scripts, but `git switch` and `git restore` are the officially recommended modern standards."
  },
  {
    id: 16,
    question: "How does `git switch` improve the experience for developers in IDEs and terminals?",
    answer: "It provides clearer error messages, dedicated tab auto-completion strictly for branch names, and eliminates accidental file overwrites."
  },
  {
    id: 17,
    question: "What is the difference between `git switch main` and `git restore .`?",
    answer: "`git switch main` changes your active branch to `main`, whereas `git restore .` discards all uncommitted modifications in your current working directory."
  },
  {
    id: 18,
    question: "What happens to untracked files when you switch branches?",
    answer: "Untracked files are preserved in your working directory unless a file with the exact same name exists in the branch you are switching to, in which case Git aborts."
  },
  {
    id: 19,
    question: "What command lets you check the current active branch name without any listing output?",
    answer: "`git branch --show-current`."
  },
  {
    id: 20,
    question: "Can you switch branches while an interactive rebase or merge conflict is unresolved?",
    answer: "Git will generally prevent switching branches during an in-progress merge or rebase unless you abort the operation first (`git merge --abort` or `git rebase --abort`)."
  },
  {
    id: 21,
    question: "What low-level reflog entry is recorded when you switch branches?",
    answer: "Git writes an entry to `.git/logs/HEAD` noting: `checkout: moving from <old-branch> to <new-branch>`."
  },
  {
    id: 22,
    question: "How does `git switch` update timestamps on files in the working directory?",
    answer: "Git only touches and updates the filesystem modification timestamps of files that actually differ between the two branches; unchanged files keep their existing timestamps."
  },
  {
    id: 23,
    question: "Why is updating only changed files during `git switch` beneficial for build tools?",
    answer: "Incremental build systems (like Vite, Webpack, Make, and Gradle) only recompile modified files, making branch switching extremely fast."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain `git switch` vs `git checkout` to Abhronila Das at Barrackpore?",
    answer: "He compared `git checkout` to a Swiss army knife with 20 blades where opening the wrong blade cuts your finger, whereas `git switch` is a safe, dedicated steering wheel."
  },
  {
    id: 25,
    question: "What is the output of `git switch` when switching to an existing branch?",
    answer: "`Switched to branch '<branch-name>'` along with upstream tracking status if configured."
  }
];

export default questions;
