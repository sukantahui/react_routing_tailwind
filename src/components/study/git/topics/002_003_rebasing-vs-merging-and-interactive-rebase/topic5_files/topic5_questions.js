/**
 * Topic 5 Questions: Handling Conflicts During Rebase
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What causes a merge conflict during a rebase?",
    answer: "A conflict occurs when a replayed patch modifies the same lines in a file that were already modified in the upstream target branch or in a previously replayed commit."
  },
  {
    id: 2,
    question: "What does Git do when a conflict is encountered during `git rebase`?",
    answer: "Git halts the rebase, writes standard conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) into the conflicting files, and pauses at the conflicting commit."
  },
  {
    id: 3,
    question: "What is the meaning of `<<<<<<< HEAD` in a rebase conflict?",
    answer: "In a rebase conflict, `HEAD` represents the current state of the base branch tip (or previously replayed commit) onto which your patch is being applied."
  },
  {
    id: 4,
    question: "What is the meaning of `>>>>>>> <commit_hash>` in a rebase conflict?",
    answer: "It represents the changes being introduced by the specific commit currently being replayed from your feature branch."
  },
  {
    id: 5,
    question: "What are the three steps to resolve a rebase conflict?",
    answer: "1. Open the file and edit the conflicting lines, 2. Stage the resolved file with `git add <file>`, 3. Run `git rebase --continue`."
  },
  {
    id: 6,
    question: "Why should you NEVER run `git commit` when resolving a rebase conflict?",
    answer: "Running `git commit` creates an extra detached commit instead of allowing Git's rebase engine to record the replayed commit properly and advance the sequencer."
  },
  {
    id: 7,
    question: "What happens if you run `git rebase --abort` during a conflict?",
    answer: "Git stops the rebase entirely and resets your branch and working directory back to the exact state before the rebase command was initiated."
  },
  {
    id: 8,
    question: "What does `git rebase --skip` do when paused on a conflict?",
    answer: "It completely discards the changes in the current conflicting commit and proceeds to apply the remaining commits in the rebase queue."
  },
  {
    id: 9,
    question: "When is it appropriate to use `git rebase --skip`?",
    answer: "When all changes from your conflicting commit are already present in the target upstream branch, making the commit redundant."
  },
  {
    id: 10,
    question: "Can multiple commits on a feature branch trigger conflicts during a single rebase session?",
    answer: "Yes. If your feature branch has 5 commits that touch the same lines, you may need to resolve conflicts and run `git rebase --continue` for each conflicting commit in sequence."
  },
  {
    id: 11,
    question: "What is Git `rerere` and how does it help with rebase conflicts?",
    answer: "`rerere` stands for 'Reuse Recorded Resolution'. When enabled (`git config --global rerere.enabled true`), Git records how you resolved a conflict hunk and automatically applies that exact resolution if the same conflict appears in subsequent commits."
  },
  {
    id: 12,
    question: "How can you check which file is conflicting during a rebase?",
    answer: "Run `git status`. Conflicted files are listed under 'Unmerged paths:'."
  },
  {
    id: 13,
    question: "How can you launch a graphical visual merge tool during a rebase conflict?",
    answer: "Run `git mergetool` to open your configured diff/merge editor (such as VS Code, Meld, or KDiff3)."
  },
  {
    id: 14,
    question: "In the Barrackpore AccoTax case study, what file experienced a conflict?",
    answer: "`TaxEngine.js` experienced a conflict because Sachin added Section 87A ₹7 Lakh tax rebate logic while Sukanta Sir added a 15% surcharge bracket on `main`."
  },
  {
    id: 15,
    question: "What does the file `.git/rebase-merge/stopped-sha` contain?",
    answer: "The commit SHA of the original commit that caused the rebase to pause on a conflict."
  },
  {
    id: 16,
    question: "Can you change the commit message while resolving a rebase conflict?",
    answer: "Yes, when you run `git rebase --continue`, Git will open your text editor to let you review or edit the commit message before committing the replayed patch."
  },
  {
    id: 17,
    question: "What happens if resolving a conflict results in an empty change (no diff)?",
    answer: "Git will prompt you that the patch is empty and advise you to run `git rebase --skip` or `git commit --allow-empty`."
  },
  {
    id: 18,
    question: "What should you do if you get confused during a multi-commit rebase conflict?",
    answer: "Run `git rebase --abort` immediately to safely return to your clean starting point without losing any data."
  },
  {
    id: 19,
    question: "How does resolving conflicts in `git rebase` compare with `git merge`?",
    answer: "In `git merge`, you resolve all conflicts across both branches at once in a single merge commit. In `git rebase`, you resolve conflicts incrementally commit-by-commit as each patch is applied."
  },
  {
    id: 20,
    question: "What is the danger of resolving rebase conflicts carelessly?",
    answer: "Accidentally deleting newly merged code from the upstream branch or introducing syntax errors that break downstream commits."
  },
  {
    id: 21,
    question: "Can you run unit tests before running `git rebase --continue`?",
    answer: "Yes! While Git is paused on a conflict, your working directory contains the exact state of that replayed commit, so you can run `npm test` to verify correctness before continuing."
  },
  {
    id: 22,
    question: "What does `git diff --check` do during a rebase conflict?",
    answer: "It checks your working directory for leftover conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) or whitespace errors before you stage and continue."
  },
  {
    id: 23,
    question: "What happens if you accidentally stage a file containing raw conflict markers?",
    answer: "Git will commit the raw text markers into your source code, causing syntax errors in your application."
  },
  {
    id: 24,
    question: "How does `git checkout --ours` vs `git checkout --theirs` behave during a rebase?",
    answer: "In a rebase, `--ours` refers to the upstream base branch (`HEAD`), and `--theirs` refers to your incoming feature branch patch! (This is the reverse of `git merge`)."
  },
  {
    id: 25,
    question: "Why is the meaning of `--ours` and `--theirs` flipped during a rebase?",
    answer: "Because during a rebase, `HEAD` is sitting on the target base branch (`main`), so `main` is 'ours' and your feature branch being replayed is 'theirs'."
  },
  {
    id: 26,
    question: "What command can you use to edit the remaining rebase queue during a conflict pause?",
    answer: "`git rebase --edit-todo` opens the remaining instruction queue in your editor."
  },
  {
    id: 27,
    question: "How can you view the original commit that caused the conflict while paused?",
    answer: "Run `git log -1 --stat $(cat .git/rebase-merge/stopped-sha)` or `git show REBASE_HEAD`."
  },
  {
    id: 28,
    question: "What core advice does Sukanta Sir give for dealing with rebase conflicts?",
    answer: "Stay calm, inspect `git status`, resolve file by file, run tests, stage with `git add`, and use `git rebase --continue`. Never run `git commit`!"
  }
];

export default questions;
