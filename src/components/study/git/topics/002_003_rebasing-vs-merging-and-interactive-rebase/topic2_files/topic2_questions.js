/**
 * Topic 2 Questions: Step-by-Step Standard Rebase Workflow
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the standard command sequence to rebase a feature branch onto main?",
    answer: "`git switch feature` followed by `git rebase main`. Alternatively: `git rebase main feature`."
  },
  {
    id: 2,
    question: "Why must your working tree be clean before running `git rebase`?",
    answer: "Git needs to check out commits and apply patches onto the working tree and staging area. Dirty unstaged or staged files could be overwritten or cause conflicts with the incoming patches."
  },
  {
    id: 3,
    question: "What should you do if you have uncommitted work when you need to rebase?",
    answer: "Either commit your changes as a temporary commit (`git commit -m 'WIP'`) or stash them using `git stash push -m 'WIP before rebase'`."
  },
  {
    id: 4,
    question: "Can git automatically stash and unstash dirty working changes during a rebase?",
    answer: "Yes, using the `--autostash` flag: `git rebase --autostash main`, or by setting `git config rebase.autoStash true` globally."
  },
  {
    id: 5,
    question: "What does the command `git rebase main feature` do?",
    answer: "It first checks out the `feature` branch automatically and then initiates a rebase onto `main`, saving you the separate `git switch` step."
  },
  {
    id: 6,
    question: "What is the role of `git pull origin main` in the standard rebase workflow?",
    answer: "It ensures your local `main` branch has the latest commits from the remote repository before you rebase your feature branch onto it."
  },
  {
    id: 7,
    question: "What happens when you run `git switch main && git merge feature` after rebasing `feature` on `main`?",
    answer: "Git performs a fast-forward merge because `feature` directly extends the tip of `main`. No merge commit is created."
  },
  {
    id: 8,
    question: "How can you check the current status while in the middle of a rebase?",
    answer: "Run `git status`. It displays the current step, which commit is being applied, and whether conflicts exist."
  },
  {
    id: 9,
    question: "What directory in `.git` contains active rebase state data?",
    answer: "The `.git/rebase-merge` or `.git/rebase-apply` directory."
  },
  {
    id: 10,
    question: "If you want to abort the rebase and go back to where you started, what command do you run?",
    answer: "`git rebase --abort`."
  },
  {
    id: 11,
    question: "What command do you run after resolving conflict files and staging them during a rebase?",
    answer: "`git rebase --continue`."
  },
  {
    id: 12,
    question: "Why should you NEVER run `git commit` when resolving a rebase conflict?",
    answer: "Running `git commit` creates a brand new detached commit manually rather than allowing Git's rebase engine to record the replayed commit and advance the rebase state."
  },
  {
    id: 13,
    question: "What happens to the author name and author email during a standard rebase?",
    answer: "They are preserved intact from the original commits. Only the committer identity and commit hash are updated."
  },
  {
    id: 14,
    question: "Does `git rebase main` update the `main` branch pointer?",
    answer: "No. It only moves the current `feature` branch pointer. `main` remains at its existing commit until you explicitly merge `feature` into `main`."
  },
  {
    id: 15,
    question: "How does `git rebase` identify which commits to replay?",
    answer: "It finds the merge-base between `main` and `feature` (the last common ancestor) and selects all commits that exist on `feature` but not on `main` (`git log main..feature`)."
  },
  {
    id: 16,
    question: "What happens if a commit on `feature` has identical changes to a commit already on `main`?",
    answer: "Git detects an empty patch diff and automatically drops (skips) that redundant commit during the rebase."
  },
  {
    id: 17,
    question: "Can you rebase a branch onto another branch's upstream remote tracking branch directly without switching to local main?",
    answer: "Yes! You can run `git fetch origin` followed by `git rebase origin/main` while on your feature branch."
  },
  {
    id: 18,
    question: "Why is `git rebase origin/main` faster than updating local main first?",
    answer: "It bypasses the need to switch to local `main`, run `git pull`, and switch back to `feature`, performing the rebase directly on the freshly fetched remote tracking ref."
  },
  {
    id: 19,
    question: "What is the risk if you force-push (`git push --force`) after a rebase on a shared branch?",
    answer: "It overwrites the remote branch history with your newly rebased hashes, corrupting branch tracking for all team members who based work on the old commits."
  },
  {
    id: 20,
    question: "What safer flag should you use instead of `git push --force` after a rebase on your own feature branch?",
    answer: "`git push --force-with-lease`. It ensures nobody else has pushed commits to the remote branch before overwriting."
  },
  {
    id: 21,
    question: "What does the command `git branch -vv` show after a rebase?",
    answer: "It shows how many commits your local branch is ahead or diverged from its remote tracking branch."
  },
  {
    id: 22,
    question: "Can you rebase multiple times on a long-running feature branch?",
    answer: "Yes, keeping a feature branch regularly rebased on `origin/main` prevents massive merge conflicts from accumulating at the end of a sprint."
  },
  {
    id: 23,
    question: "In the Barrackpore AccoTax case study, what feature was Sachin rebasing?",
    answer: "Sachin was rebasing the `feature/eway-export` branch onto `main` before submitting his ₹5,000 threshold e-way bill export pull request."
  },
  {
    id: 24,
    question: "What happens if you run `git rebase --edit-todo` during an interactive rebase?",
    answer: "It re-opens the rebase TODO file in your editor so you can modify directives for remaining commits in the queue."
  },
  {
    id: 25,
    question: "How can you verify that a rebase succeeded without breaking tests?",
    answer: "Run your test suite (`npm test`, `pytest`, `cargo test`) immediately following the rebase."
  },
  {
    id: 26,
    question: "What happens if you accidentally ran `git rebase main` on the wrong branch?",
    answer: "Run `git reflog`, identify the commit hash of your branch before the rebase, and run `git reset --hard <commit_hash>`."
  },
  {
    id: 27,
    question: "What does `git diff main...feature` (three dots) show after a successful rebase?",
    answer: "It shows the exact same diff as `git diff main..feature` (two dots) because the merge base of the rebased branch IS the tip of `main`!"
  },
  {
    id: 28,
    question: "What advice does Sukanta Sir give for daily branch hygiene?",
    answer: "Fetch daily (`git fetch origin`) and rebase private feature branches frequently (`git rebase origin/main`) to keep conflict chunks small and easily manageable."
  }
];

export default questions;
