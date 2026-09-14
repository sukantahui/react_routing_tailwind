/**
 * Topic 12: Comparing Branches: git diff branchA..branchB vs git diff branchA...branchB
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What does the two-dot syntax `git diff branchA..branchB` do?",
    answer: "It performs a direct endpoint-to-endpoint comparison between the tip commit snapshot of `branchA` and the tip commit snapshot of `branchB`."
  },
  {
    id: 2,
    question: "What does the three-dot syntax `git diff branchA...branchB` do?",
    answer: "It finds the common ancestor (merge base) of `branchA` and `branchB`, and compares that common ancestor snapshot against the tip of `branchB`."
  },
  {
    id: 3,
    question: "Which diff notation (`..` or `...`) is used by GitHub and GitLab Pull Requests to display code changes?",
    answer: "Three-dot diff (`git diff base...feature`), because it isolates only the changes introduced on the feature branch since it diverged from the base branch."
  },
  {
    id: 4,
    question: "What happens in a two-dot diff (`git diff main..feature`) if new commits were added to `main` after `feature` branched off?",
    answer: "The two-dot diff will display changes from `main` as deletions (or reversals) because it compares the raw endpoints directly."
  },
  {
    id: 5,
    question: "Is `git diff branchA branchB` identical to `git diff branchA..branchB`?",
    answer: "Yes. In `git diff`, passing two branches separated by a space is completely equivalent to the two-dot notation."
  },
  {
    id: 6,
    question: "What plumbing command finds the common ancestor SHA between two branches?",
    answer: "`git merge-base <branchA> <branchB>`."
  },
  {
    id: 7,
    question: "How can you manually replicate `git diff main...feature` using `git merge-base`?",
    answer: "`git diff $(git merge-base main feature) feature`."
  },
  {
    id: 8,
    question: "Why does three-dot notation have the opposite meaning in `git log` compared to `git diff`?",
    answer: "In `git log`, `A...B` means symmetric difference (all commits in A or B, but not both), whereas in `git diff`, `A...B` means diff from the merge base to B."
  },
  {
    id: 9,
    question: "What does `git log branchA..branchB` display?",
    answer: "It lists all commits reachable from `branchB` that are NOT reachable from `branchA` (i.e. commits unique to branchB)."
  },
  {
    id: 10,
    question: "What does `git log branchA...branchB --left-right` display?",
    answer: "It lists commits unique to either branch, with `<` indicating commits on `branchA` and `>` indicating commits on `branchB`."
  },
  {
    id: 11,
    question: "What happens in `git diff main...feature` if `main` has not changed at all since `feature` was branched?",
    answer: "The merge base is identical to the tip of `main`, so both two-dot and three-dot diffs produce identical output."
  },
  {
    id: 12,
    question: "How do you compare your current checked-out branch against `main` using three-dot diff?",
    answer: "`git diff main...` (leaving the second side blank defaults to `HEAD`)."
  },
  {
    id: 13,
    question: "What flag in `git diff` shows only the names of modified files between two branches?",
    answer: "`git diff --name-only branchA...branchB`."
  },
  {
    id: 14,
    question: "What flag shows modification statistics (lines added/deleted) between two branches?",
    answer: "`git diff --stat branchA...branchB`."
  },
  {
    id: 15,
    question: "How can you view word-level diffs when comparing branches?",
    answer: "`git diff --word-diff branchA...branchB`."
  },
  {
    id: 16,
    question: "How do you ignore whitespace-only changes when comparing branches?",
    answer: "`git diff -w branchA...branchB` (or `git diff --ignore-all-space branchA...branchB`)."
  },
  {
    id: 17,
    question: "Can you compare a specific folder or file path between two branches?",
    answer: "Yes: `git diff main...feature -- src/components/Billing.jsx`."
  },
  {
    id: 18,
    question: "What does `git diff main...feature` return if `feature` has zero unique commits?",
    answer: "It returns an empty output with an exit code of 0."
  },
  {
    id: 19,
    question: "How can you use `git diff` in a CI/CD script to verify no forbidden files were edited in a PR?",
    answer: "`git diff --name-only origin/main...HEAD | grep 'protected_config/'`."
  },
  {
    id: 20,
    question: "What happens if there are multiple common ancestors between two diverged branches (criss-cross merge)?",
    answer: "`git merge-base` selects one optimal merge base, or `git merge-base --all` lists all common ancestors."
  },
  {
    id: 21,
    question: "How do you visually launch a GUI diff tool (like VS Code or Beyond Compare) for branch comparison?",
    answer: "`git difftool main...feature`."
  },
  {
    id: 22,
    question: "What is the exit code of `git diff --exit-code branchA...branchB`?",
    answer: "It returns 0 if there are no differences, and 1 if differences exist, which is useful for automation scripts."
  },
  {
    id: 23,
    question: "Can you compare remote tracking branches using dot notation?",
    answer: "Yes: `git diff origin/main...origin/feature-gst`."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain 2-dot vs 3-dot diff to Sachin and Mahima at AccoTax Barrackpore?",
    answer: "He explained that 2-dot diff is like comparing Sachin's current desk against Mahima's current desk (showing everything different between them), while 3-dot diff is like comparing Mahima's desk today against what her desk looked like on Monday morning before she started her project."
  },
  {
    id: 25,
    question: "Which comparison should you always run before pushing a feature branch for peer review?",
    answer: "`git diff main...HEAD` to preview the exact diff your reviewers will see on GitHub."
  }
];

export default questions;
