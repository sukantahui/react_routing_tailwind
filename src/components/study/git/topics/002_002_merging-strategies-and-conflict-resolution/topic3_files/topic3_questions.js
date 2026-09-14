/**
 * Topic 3: The Merge Commit: Understanding why a merge commit has two (or more) parent commits
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What makes a merge commit unique compared to a standard Git commit?",
    answer: "A standard commit has exactly one parent commit, whereas a merge commit contains references to two (or more) parent commits in its raw commit object."
  },
  {
    id: 2,
    question: "How do you inspect the raw low-level object contents of a merge commit?",
    answer: "Using the plumbing command `git cat-file -p <merge-commit-sha>`."
  },
  {
    id: 3,
    question: "What are the two `parent` headers listed inside a standard 3-way merge commit?",
    answer: "1. `parent <SHA1>`: The tip of the branch you were standing on (Parent 1 / HEAD).\n2. `parent <SHA2>`: The tip of the branch you merged in (Parent 2 / incoming)."
  },
  {
    id: 4,
    question: "What does `HEAD^1` refer to on a merge commit?",
    answer: "The first parent of the merge commit (the main/target branch lineage you were on when executing `git merge`)."
  },
  {
    id: 5,
    question: "What does `HEAD^2` refer to on a merge commit?",
    answer: "The second parent of the merge commit (the tip of the incoming branch that was merged in)."
  },
  {
    id: 6,
    question: "What does `HEAD~1` refer to on a merge commit?",
    answer: "`HEAD~1` is equivalent to `HEAD^1`, following the first-parent ancestry lineage back one generation."
  },
  {
    id: 7,
    question: "What is an 'Octopus Merge' in Git?",
    answer: "A merge commit that has three or more parent commits, created when merging multiple branches simultaneously (`git merge branch1 branch2 branch3`)."
  },
  {
    id: 8,
    question: "Why does `git revert <merge-commit-sha>` fail if run without flags?",
    answer: "Because Git does not know which of the two parent histories should be considered the mainline to keep, returning `error: commit <sha> is a merge but no -m option was given.`"
  },
  {
    id: 9,
    question: "What flag must you pass to revert a merge commit successfully?",
    answer: "`git revert -m 1 <merge-commit-sha>` (specifying parent 1 as the mainline to preserve)."
  },
  {
    id: 10,
    question: "What does `git log --first-parent` display?",
    answer: "It traverses only the first parent of each merge commit, providing a clean, high-level overview of the mainline branch without getting cluttered by individual feature branch commits."
  },
  {
    id: 11,
    question: "What does `git show <merge-commit-sha>` display by default?",
    answer: "It displays the commit metadata and a 'combined diff' (`diff --cc`), showing only lines where both parents conflicted or were resolved."
  },
  {
    id: 12,
    question: "How can you view the full diff between a merge commit and its first parent?",
    answer: "`git diff <merge-commit-sha>^1 <merge-commit-sha>` (or `git show -m --first-parent <merge-commit-sha>`)."
  },
  {
    id: 13,
    question: "How does a merge commit participate in subsequent future merges?",
    answer: "It becomes an ancestor node in the DAG, allowing future merges between the same branches to compute a new, updated Merge Base."
  },
  {
    id: 14,
    question: "Can a root commit in Git have parents?",
    answer: "No. The initial root commit created in a fresh repository has zero parents."
  },
  {
    id: 15,
    question: "What happens to the tree object referenced by a merge commit?",
    answer: "The tree object records the complete root directory snapshot containing the synthesized code from both parents."
  },
  {
    id: 16,
    question: "Is the commit SHA of a merge commit deterministic?",
    answer: "Yes, it is the SHA-1 (or SHA-256) hash of the commit object header, tree SHA, parent SHAs, author metadata, timestamp, and commit message."
  },
  {
    id: 17,
    question: "What does `git rev-parse HEAD^@` output on a merge commit?",
    answer: "It outputs the SHAs of ALL parents of the merge commit on separate lines."
  },
  {
    id: 18,
    question: "What happens if you rebase a branch containing a merge commit using default `git rebase`?",
    answer: "By default, `git rebase` flattens the history and drops merge commits unless you pass `--rebase-merges` (`-r`)."
  },
  {
    id: 19,
    question: "What flag in `git rebase` preserves merge commits and branch topologies?",
    answer: "`git rebase --rebase-merges` (or `git rebase -r`)."
  },
  {
    id: 20,
    question: "Can you amend a merge commit using `git commit --amend`?",
    answer: "Yes, you can edit the commit message or add staged files to the merge commit before pushing."
  },
  {
    id: 21,
    question: "Why do some open-source projects prefer `--first-parent` logs for release notes?",
    answer: "Because each first-parent merge commit cleanly represents a merged Pull Request milestone."
  },
  {
    id: 22,
    question: "What is the difference between `git diff HEAD^1` and `git diff HEAD^2` on a merge commit?",
    answer: "`git diff HEAD^1` shows what changes the merge introduced relative to `main`, while `git diff HEAD^2` shows what changes it introduced relative to the feature branch."
  },
  {
    id: 23,
    question: "What temporary file stores the incoming merge parents during an ongoing merge conflict?",
    answer: "`.git/MERGE_HEAD`."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain merge commit parentage to Sachin at AccoTax Barrackpore?",
    answer: "He explained that a regular commit has one mother (the previous commit), but a merge commit has two parents (main and feature), officially linking two family trees in the accounting database."
  },
  {
    id: 25,
    question: "What command verifies whether a specific commit SHA is a merge commit or a normal commit?",
    answer: "`git rev-parse <sha>^2` returns a valid SHA if it is a merge commit, or errors with `fatal: ambiguous argument '<sha>^2'` if it is a single-parent commit."
  }
];

export default questions;
