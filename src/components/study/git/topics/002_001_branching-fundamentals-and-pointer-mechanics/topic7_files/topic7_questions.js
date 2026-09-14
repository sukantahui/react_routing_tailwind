/**
 * Topic 7: Renaming Branches: git branch -m and git branch -M
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What does the `-m` flag stand for in `git branch -m`?",
    answer: "The `-m` flag stands for `--move` (renaming or moving a branch reference)."
  },
  {
    id: 2,
    question: "How do you rename your currently checked-out branch in a single command?",
    answer: "`git branch -m <new-branch-name>` (e.g. `git branch -m main`)."
  },
  {
    id: 3,
    question: "How do you rename a branch without checking it out first?",
    answer: "`git branch -m <old-name> <new-name>` (e.g. `git branch -m feat-typo feature/gst`)."
  },
  {
    id: 4,
    question: "What does uppercase `-M` (`git branch -M`) do differently from lowercase `-m`?",
    answer: "Uppercase `-M` forces the rename even if a branch with the target new name already exists, overwriting and replacing that existing reference."
  },
  {
    id: 5,
    question: "What filesystem actions occur when you run `git branch -m old-name new-name`?",
    answer: "Git moves the ref file `.git/refs/heads/old-name` to `.git/refs/heads/new-name`, moves its reflog in `.git/logs/refs/heads/`, and updates `.git/HEAD` if the active branch was renamed."
  },
  {
    id: 6,
    question: "Does renaming a local branch automatically rename the corresponding branch on GitHub / remote server?",
    answer: "No. Local branch renames are strictly local. The remote branch remains named under its old name until explicitly pushed and deleted on the remote."
  },
  {
    id: 7,
    question: "What are the 3 standard steps to rename a branch both locally and on a remote server?",
    answer: "1. `git branch -m old-name new-name`\n2. `git push -u origin new-name`\n3. `git push origin --delete old-name`"
  },
  {
    id: 8,
    question: "What happens to the commit history and commit SHAs when a branch is renamed?",
    answer: "The commit history and SHA hashes are completely unchanged. Only the movable text pointer file's name changes on disk."
  },
  {
    id: 9,
    question: "What happens to the branch reflog when you rename a branch?",
    answer: "Git preserves the entire branch reflog by renaming the log file from `.git/logs/refs/heads/old-name` to `.git/logs/refs/heads/new-name`."
  },
  {
    id: 10,
    question: "How do you rename the default `master` branch to `main` in an existing local repository?",
    answer: "Checkout master if needed and run: `git branch -m master main` (or `git branch -M main`)."
  },
  {
    id: 11,
    question: "What happens if you try to rename a branch to a name that already exists using lowercase `-m`?",
    answer: "Git aborts with `fatal: a branch named '<new-name>' already exists`."
  },
  {
    id: 12,
    question: "What happens to configuration settings (like upstream tracking) in `.git/config` when a branch is renamed?",
    answer: "Git automatically updates the `[branch \"<name>\"]` section in `.git/config` to match the new branch name."
  },
  {
    id: 13,
    question: "Can you rename a remote branch directly from the local terminal without creating a local branch?",
    answer: "Git does not have a native remote-rename command; you must push the new ref and delete the old ref on the remote."
  },
  {
    id: 14,
    question: "What should teammates do on their machines after you rename a shared branch on GitHub?",
    answer: "Teammates must fetch pruned references (`git fetch -p`), switch to the new branch (`git switch new-name`), and delete their local old branch (`git branch -d old-name`)."
  },
  {
    id: 15,
    question: "What command updates your local default branch tracking after changing the default branch on GitHub?",
    answer: "`git remote set-head origin --auto` followed by `git branch -m <old> <new>` and `git branch -u origin/<new>`."
  },
  {
    id: 16,
    question: "Can you rename a branch while in a detached HEAD state?",
    answer: "No. If you run `git branch -m <new-name>` while detached, Git errors with `fatal: cannot rename the current branch while not on any.`"
  },
  {
    id: 17,
    question: "What happens if you rename a branch to include subfolder hierarchies (e.g. `feature/tax`)?",
    answer: "Git automatically creates any necessary subdirectories inside `.git/refs/heads/` and places the pointer file inside."
  },
  {
    id: 18,
    question: "Why might renaming `feature-tax` to `Feature-Tax` cause issues on Windows or macOS?",
    answer: "Because Windows and macOS filesystems are case-insensitive. A direct case-only rename might fail or require a two-step rename via a temporary name."
  },
  {
    id: 19,
    question: "How do you safely perform a case-only branch rename on Windows?",
    answer: "Rename via a temporary name: `git branch -m feature-tax temp-branch` followed by `git branch -m temp-branch Feature-Tax` (or use `git branch -M Feature-Tax`)."
  },
  {
    id: 20,
    question: "Is there any risk of losing code when running `git branch -m`?",
    answer: "No. Lowercase `-m` is completely non-destructive and will refuse to overwrite existing branches."
  },
  {
    id: 21,
    question: "What error is shown if you attempt to rename a non-existent branch?",
    answer: "`error: refname refs/heads/<name> not found`."
  },
  {
    id: 22,
    question: "What does `git branch --copy <old> <new>` (or `git branch -c`) do compared to `-m`?",
    answer: "`-c` copies the branch configuration and reflog to a new branch name without deleting the original branch, whereas `-m` renames and moves the original branch."
  },
  {
    id: 23,
    question: "What is uppercase `-C` in `git branch -C`?",
    answer: "`-C` is force copy, which duplicates a branch and overwrites an existing branch with the new name."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain branch renaming to Tuhina Mukherjee at AccoTax Barrackpore?",
    answer: "He explained that renaming a branch is like peeling off an old paper label from a plastic file folder and sticking a new clean label on it. All the accounting documents inside the folder remain completely undisturbed."
  },
  {
    id: 25,
    question: "What is the return message from Git when executing `git branch -m old new`?",
    answer: "Git silently succeeds with an exit code of 0 without printing verbose text unless an error occurs."
  }
];

export default questions;
