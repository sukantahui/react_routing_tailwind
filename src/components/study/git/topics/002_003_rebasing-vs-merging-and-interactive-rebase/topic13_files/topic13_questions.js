/**
 * Topic 13 Questions: Hands-on Terminal Lab Sandbox
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the primary objective of this hands-on terminal laboratory?",
    answer: "To practice the complete end-to-end Git rebase lifecycle: linearizing a divergent branch, performing interactive rebase, squashing WIP commits, dropping debug logs, and testing with `exec`."
  },
  {
    id: 2,
    question: "What command creates and switches to a new feature branch in modern Git?",
    answer: "`git switch -c <branch_name>`."
  },
  {
    id: 3,
    question: "How do you rebase a feature branch onto `main`?",
    answer: "`git switch <feature_branch>` followed by `git rebase main`."
  },
  {
    id: 4,
    question: "What does the command `git rebase -i --exec './test.sh' main` do?",
    answer: "It starts an interactive rebase against `main` and automatically inserts the `exec ./test.sh` directive after every single commit in the TODO queue."
  },
  {
    id: 5,
    question: "What happens if a test fails during an `exec` directive in the rebase?",
    answer: "Git halts the rebase at the failing commit with an error code, allowing you to debug the failure, stage the fix with `git add`, and amend or continue."
  },
  {
    id: 6,
    question: "How do you perform a fast-forward merge once the feature branch is rebased?",
    answer: "Switch to `main` (`git switch main`) and run `git merge <feature_branch>`."
  },
  {
    id: 7,
    question: "What flag in `git log` displays a visual ASCII branch tree?",
    answer: "`--graph` (e.g. `git log --graph --oneline --all --decorate`)."
  },
  {
    id: 8,
    question: "In the Barrackpore AccoTax case study, what feature was tested in the terminal lab?",
    answer: "The `feature/tax-audit` module incorporating ₹10 Lakh threshold audit rules."
  },
  {
    id: 9,
    question: "Why does `git log --graph` show a straight line after a rebase and fast-forward merge?",
    answer: "Because all feature commits were replayed directly on top of the latest commit of `main`, creating a continuous, single-path timeline with zero branch divergence."
  },
  {
    id: 10,
    question: "What command lets you verify that no uncommitted changes exist before starting the lab?",
    answer: "`git status`."
  },
  {
    id: 11,
    question: "Can you run this entire laboratory in an isolated temporary directory?",
    answer: "Yes, by executing `bash topic13_lab.sh` or running the commands in `/tmp/git_lab`."
  },
  {
    id: 12,
    question: "How do you delete the feature branch cleanly after merging into `main`?",
    answer: "`git branch -d feature/tax-audit`."
  },
  {
    id: 13,
    question: "Why does `git branch -d` succeed without warning after a rebase and fast-forward merge?",
    answer: "Because `main` now contains all rebased commits, so Git recognizes the branch as fully merged."
  },
  {
    id: 14,
    question: "What is the difference between `git log main..feature` and `git log feature..main`?",
    answer: "`main..feature` shows commits on `feature` not yet in `main`; `feature..main` shows commits on `main` not yet in `feature`."
  },
  {
    id: 15,
    question: "How do you view the full commit metadata for the latest commit after the lab?",
    answer: "`git show HEAD`."
  },
  {
    id: 16,
    question: "What does the `git reflog` show at the end of the lab?",
    answer: "It displays the chronological history of HEAD pointer jumps, including the branch switch, rebase starts, patch replays, and fast-forward merge."
  },
  {
    id: 17,
    question: "Can you run `pytest` or `npm test` instead of `./test.sh` with the `exec` directive?",
    answer: "Yes, `exec` accepts any valid shell command or binary executable in your PATH."
  },
  {
    id: 18,
    question: "What should you do if an interactive rebase fails due to a syntax error in your code?",
    answer: "Edit the file, verify the fix with your test runner, stage with `git add`, and run `git rebase --continue`."
  },
  {
    id: 19,
    question: "How does `git diff main feature` look immediately after a successful rebase?",
    answer: "It shows the exact cumulative code diff introduced by the feature branch."
  },
  {
    id: 20,
    question: "What happens if you run `git merge --no-ff feature` instead of a fast-forward merge?",
    answer: "Git will create an explicit 2-parent merge commit preserving the branch envelope even though the branch was linear."
  },
  {
    id: 21,
    question: "How can you test if your Git repository has any dangling unreferenced objects?",
    answer: "`git fsck --lost-found`."
  },
  {
    id: 22,
    question: "Why is practicing in a terminal sandbox repo recommended before working on client code?",
    answer: "It builds muscle memory and confidence with rebase controls (`--continue`, `--skip`, `--abort`) in a zero-risk environment."
  },
  {
    id: 23,
    question: "What environment variable allows non-interactive testing of interactive rebases in scripts?",
    answer: "`GIT_SEQUENCE_EDITOR`."
  },
  {
    id: 24,
    question: "What does `GIT_SEQUENCE_EDITOR=cat` do when passed to `git rebase -i`?",
    answer: "It prints the TODO list to stdout and immediately accepts it without opening an editor."
  },
  {
    id: 25,
    question: "How do you verify the exit code of the last run terminal command?",
    answer: "`echo $?` (in bash) or `$LASTEXITCODE` (in PowerShell)."
  },
  {
    id: 26,
    question: "What is the key takeaway of Drill 4 (Linearization)?",
    answer: "Rebasing your feature branch before merging guarantees a zero-conflict, fast-forward integration into `main`."
  },
  {
    id: 27,
    question: "What is the key takeaway of Drill 5 (Testing with Exec)?",
    answer: "Automating test validation during rebase guarantees that your commit history never introduces broken intermediate builds."
  },
  {
    id: 28,
    question: "What final advice does Sukanta Sir give to students completing this lab?",
    answer: "'Run this lab script twice: once to understand the mechanics, and a second time to master the speed and confidence of professional rebase workflows!'"
  }
];

export default questions;
