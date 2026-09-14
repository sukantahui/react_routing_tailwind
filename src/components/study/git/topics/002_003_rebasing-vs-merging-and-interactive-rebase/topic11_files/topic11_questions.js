/**
 * Topic 11 Questions: Automating Fixups with Autosquash
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is Git Autosquash?",
    answer: "Autosquash is an automated feature in `git rebase -i` that parses `fixup!` and `squash!` commit messages and automatically rearranges the rebase TODO list to place each fixup commit directly below its target commit with the correct directive."
  },
  {
    id: 2,
    question: "What command creates an autosquash-ready fixup commit?",
    answer: "`git commit --fixup <commit_hash>` (or `git commit --fixup HEAD~N`)."
  },
  {
    id: 3,
    question: "What commit message subject does `git commit --fixup <commit_hash>` generate automatically?",
    answer: "`fixup! <subject of original commit>`."
  },
  {
    id: 4,
    question: "What command triggers the automated reordering and squashing of fixup commits?",
    answer: "`git rebase -i --autosquash <base_branch>`."
  },
  {
    id: 5,
    question: "How can you make Git always enable autosquash by default without typing `--autosquash` every time?",
    answer: "Run `git config --global rebase.autoSquash true`."
  },
  {
    id: 6,
    question: "What is the difference between `git commit --fixup` and `git commit --squash`?",
    answer: "`--fixup` generates a `fixup!` commit that melds changes and discards the message; `--squash` generates a `squash!` commit that melds changes and prompts you to edit and merge both messages."
  },
  {
    id: 7,
    question: "Can you create multiple fixup commits targeting the same earlier commit?",
    answer: "Yes! Git will collect all `fixup!` commits targeting that same commit and reorder all of them directly beneath the target commit in the TODO script."
  },
  {
    id: 8,
    question: "What is `git commit --fixup=reword:<commit_hash>` used for?",
    answer: "It creates a commit specifically intended to replace the commit message of the target commit during an autosquash rebase."
  },
  {
    id: 9,
    question: "In the Barrackpore AccoTax case study, how did Sachin use `--fixup`?",
    answer: "Sachin used `git commit --fixup` to patch an 18% GST calculation error in an earlier commit without having to manually reorder lines in an interactive rebase editor."
  },
  {
    id: 10,
    question: "What happens if the target commit hash passed to `--fixup` has already been rebased or rewritten?",
    answer: "Git matches `fixup!` commits by commit subject title; if the subject matches, Git will still automatically locate and reorder it."
  },
  {
    id: 11,
    question: "Does `git commit --fixup` require you to manually write a commit message?",
    answer: "No, Git generates the `fixup! <original_subject>` message automatically."
  },
  {
    id: 12,
    question: "Can you use `git commit --fixup=amend:<commit_hash>`?",
    answer: "Yes, in modern Git (2.32+), `--fixup=amend:` creates a commit that both melds code and opens the editor to update the target commit's message."
  },
  {
    id: 13,
    question: "What happens if you run `git rebase -i` without `--autosquash` when you have `fixup!` commits?",
    answer: "The `fixup!` commits remain listed as ordinary `pick` commits at the bottom of the TODO list unless `rebase.autoSquash` is enabled in Git config."
  },
  {
    id: 14,
    question: "How does autosquash simplify code review feedback iterations?",
    answer: "When a reviewer leaves comments on 3 different commits in your PR, you can create 3 targeted `--fixup` commits and run `git rebase -i --autosquash main` to fold all fixes into their respective commits automatically."
  },
  {
    id: 15,
    question: "Can you inspect the reordered TODO script before Git executes it during autosquash?",
    answer: "Yes, because it is an interactive rebase (`-i`), Git presents the reordered TODO list in your text editor for review before applying changes."
  },
  {
    id: 16,
    question: "What happens if a fixup commit causes a conflict when folded into its target commit?",
    answer: "Git halts at the fixup step and lets you resolve the conflict with `git add` and `git rebase --continue`."
  },
  {
    id: 17,
    question: "Can you combine `--autosquash` with `--autostash`?",
    answer: "Yes: `git rebase -i --autosquash --autostash main` combines both automated powers."
  },
  {
    id: 18,
    question: "How do you specify the target commit for `--fixup` if you only know its branch-relative position?",
    answer: "You can pass relative revisions like `git commit --fixup HEAD~2` or `git commit --fixup HEAD@{1}`."
  },
  {
    id: 19,
    question: "What does `git log --grep='^fixup!'` show?",
    answer: "It filters and displays all un-squashed fixup commits on the current branch."
  },
  {
    id: 20,
    question: "Why is autosquash considered one of Git's greatest productivity boosters for senior engineers?",
    answer: "It allows developers to remain in flow while coding, making instant targeted corrections without breaking their train of thought for manual history cleanup."
  },
  {
    id: 21,
    question: "What happens if you run autosquash in non-interactive mode?",
    answer: "Using `GIT_SEQUENCE_EDITOR=true git rebase -i --autosquash main` applies all fixups instantly without opening an interactive editor window."
  },
  {
    id: 22,
    question: "Can you use autosquash during `git pull --rebase`?",
    answer: "Yes, if `rebase.autoSquash` is configured globally, `git pull --rebase` will automatically fold fixups."
  },
  {
    id: 23,
    question: "What should you do if an autosquash rebase folds a fixup into the wrong commit?",
    answer: "Run `git rebase --abort` and check the target commit SHA before running `--fixup` again."
  },
  {
    id: 24,
    question: "Does autosquash work if you pass a branch name as the base?",
    answer: "Yes: `git rebase -i --autosquash origin/main` works flawlessly."
  },
  {
    id: 25,
    question: "What happens to the author timestamp of a commit when a fixup is folded into it?",
    answer: "The original target commit's author date is preserved."
  },
  {
    id: 26,
    question: "Can you reorder non-fixup commits while an autosquash TODO file is open?",
    answer: "Yes, you can edit or reorder any line in the generated TODO script before saving."
  },
  {
    id: 27,
    question: "What alias does Sukanta Sir recommend for quick fixup commits?",
    answer: "`git config --global alias.fixup 'commit --fixup'`."
  },
  {
    id: 28,
    question: "What is the core takeaway of Topic 11?",
    answer: "Use `git commit --fixup <sha>` during active coding to tag fixes to their origin, and let `git rebase -i --autosquash` assemble clean history automatically."
  }
];

export default questions;
