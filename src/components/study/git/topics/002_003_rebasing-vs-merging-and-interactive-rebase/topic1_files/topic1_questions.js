/**
 * Topic 1 Questions: Rebase vs Merge Philosophical Comparison
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the core difference between the 'Historical Truth' philosophy and the 'Storybook' philosophy in Git?",
    answer: "The Historical Truth philosophy views Git commit history as a sacred, unalterable log of exactly what happened, when, and on which branch, favoring `git merge`. The Storybook philosophy views history as a crafted, readable narrative of how the software was constructed, favoring `git rebase` to eliminate messy intermediate noise."
  },
  {
    id: 2,
    question: "What visual difference appears in `git log --graph` between a merge workflow and a rebase workflow?",
    answer: "A merge workflow produces branching paths with criss-crossing lines and diamond-shaped merge bubbles. A rebase workflow produces a single, straight vertical line of commits with no branching divergence."
  },
  {
    id: 3,
    question: "Why do proponents of `git merge` argue against `git rebase`?",
    answer: "They argue that rebasing rewrites commit hashes, loses the original author timestamps, removes branch context, and can cause major repository breakage if executed on shared public branches."
  },
  {
    id: 4,
    question: "Why do proponents of `git rebase` dislike `git merge`?",
    answer: "They argue that frequent merge commits ('Merge branch main into feature') create cluttered 'Git knot salad' graphs that make reading history and debugging with `git bisect` tedious and difficult."
  },
  {
    id: 5,
    question: "What is a 'merge knot' or 'merge bubble'?",
    answer: "A merge knot refers to the diamond-shaped commit DAG structure that forms when a branch diverges from a common ancestor and is later joined back via a 3-way merge commit."
  },
  {
    id: 6,
    question: "How does `git bisect` benefit from a linear rebased history?",
    answer: "In a linear history, binary search progresses cleanly from commit to commit. In non-linear merge graphs, bisect may land on unfinished intermediate commits from long-running side branches, complicating automated bug localization."
  },
  {
    id: 7,
    question: "Does `git merge` change existing commit hashes?",
    answer: "No. `git merge` only creates one brand new merge commit; all existing parent commits retain their exact original SHA-1 hashes and timestamps."
  },
  {
    id: 8,
    question: "Does `git rebase` change existing commit hashes?",
    answer: "Yes. Rebase creates completely new commit objects with new hashes for every commit being replayed on top of the new base."
  },
  {
    id: 9,
    question: "What is the recommended industry hybrid workflow?",
    answer: "Developers use `git rebase` locally on their private feature branches to keep them up to date with `main`, and then integrate the final PR into `main` using either a fast-forward, squash-and-merge, or an explicit merge commit for key releases."
  },
  {
    id: 10,
    question: "How many parent commits does a merge commit have versus a rebased commit?",
    answer: "A merge commit has two (or more) parents. A rebased commit has exactly one parent."
  },
  {
    id: 11,
    question: "In the Barrackpore AccoTax ledger analogy, what represents a merge commit?",
    answer: "A staple pinning a separate bundle of notes to the main ledger with an extra summary tag explaining the merge."
  },
  {
    id: 12,
    question: "In the Barrackpore AccoTax ledger analogy, what represents a rebase?",
    answer: "Rewriting the notes cleanly on fresh pages directly following the latest official page in the main ledger."
  },
  {
    id: 13,
    question: "If two branches have conflicts, how are conflicts resolved in `git merge` vs `git rebase`?",
    answer: "In `git merge`, conflicts are resolved all at once during the single merge commit creation. In `git rebase`, conflicts must be resolved commit-by-commit as each patch is applied sequentially."
  },
  {
    id: 14,
    question: "Why might solving conflicts during rebase feel repetitive?",
    answer: "If multiple consecutive commits in your feature branch modified the same lines that conflicted with `main`, you might have to resolve conflicts repeatedly for each replayed commit."
  },
  {
    id: 15,
    question: "Can `git rerere` help during repeated rebase conflicts?",
    answer: "Yes! `git rerere` (Reuse Recorded Resolution) remembers how you resolved a conflict chunk and automatically applies the same resolution in subsequent replayed commits."
  },
  {
    id: 16,
    question: "Why is `git rebase` considered dangerous on shared team branches?",
    answer: "Because it changes commit hashes, forcing other teammates who pull the branch to see diverged histories and duplicate commits, requiring manual recovery."
  },
  {
    id: 17,
    question: "What is trunk-based development's view on rebasing?",
    answer: "Trunk-based development heavily promotes short-lived feature branches and frequent rebasing to keep branches synchronized with trunk, enabling continuous integration."
  },
  {
    id: 18,
    question: "What is Gitflow's view on merging?",
    answer: "Classic Gitflow mandates explicit `--no-ff` merge commits between `develop`, `release`, and `main` branches to preserve milestone grouping."
  },
  {
    id: 19,
    question: "Can you squash all commits on a branch into a single commit using `git merge --squash`?",
    answer: "Yes, `git merge --squash feature` stages all changes from the feature branch into the working tree and index as a single uncommitted change."
  },
  {
    id: 20,
    question: "What is the primary benefit of linear history during code reviews?",
    answer: "Reviewers can review commits sequentially, knowing each commit builds on top of the latest master codebase without hidden merge anomalies."
  },
  {
    id: 21,
    question: "Does GitHub support rebase merging in Pull Requests?",
    answer: "Yes, GitHub PRs offer three merge options: 'Create a merge commit', 'Squash and merge', and 'Rebase and merge'."
  },
  {
    id: 22,
    question: "What does GitHub's 'Rebase and merge' button do?",
    answer: "It replays the PR's commits onto the target branch tip one by one, creating single-parent commits on the target branch without a merge commit."
  },
  {
    id: 23,
    question: "What is the risk of rebasing if an intermediate commit does not compile or pass tests?",
    answer: "If an intermediate replayed commit fails tests, running `git bisect` in the future might land on that broken commit and report a false negative."
  },
  {
    id: 24,
    question: "How can you ensure every replayed commit passes tests during a rebase?",
    answer: "You can use interactive rebase with the `exec` directive (e.g. `git rebase -i --exec 'npm test' main`) to run your test suite automatically after every replayed commit."
  },
  {
    id: 25,
    question: "What is the psychological benefit of a clean rebased Git history for open source maintainers?",
    answer: "It reduces cognitive load, keeps the changelog readable, and ensures contributors deliver polished, atomic commits."
  },
  {
    id: 26,
    question: "Which approach preserves exact branch lifetime metadata?",
    answer: "Git merge with explicit merge commits preserves the exact branch inception and termination points."
  },
  {
    id: 27,
    question: "If a company has strict regulatory compliance audits, which philosophy is typically preferred for release branches?",
    answer: "The Historical Truth / Git Merge philosophy, because every event and original timestamp remains untampered and cryptographically auditable."
  },
  {
    id: 28,
    question: "What final advice does Sukanta Sir give regarding the merge vs rebase debate?",
    answer: "Do not treat version control tools dogmatically. Use rebase to refine your private work into a polished story, and use merge to record public milestones across the team."
  }
];

export default questions;
