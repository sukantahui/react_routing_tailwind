// ==============================================================================
// TOPIC 7 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Step-by-Step Conflict Resolution Workflow
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "What is the recommended first step when a Git merge halts with a conflict message?",
    options: [
      "Immediately run `git push origin main --force`",
      "Run `git status` to identify all files listed under 'Unmerged paths'",
      "Delete the repository directory and clone again",
      "Restart the operating system"
    ],
    answer: 1,
    explanation: "`git status` gives an immediate, crystal-clear summary of which files have conflicts ('both modified', 'both added', etc.) and provides instructions."
  },
  {
    id: 2,
    question: "Which command shows the exact line-by-line differences and conflict markers across all unmerged files?",
    options: [
      "git diff",
      "git log -n 1",
      "git branch -v",
      "git tag --list"
    ],
    answer: 0,
    explanation: "Running `git diff` during an unmerged state displays the active conflict markers and the competing changes for each conflicted file."
  },
  {
    id: 3,
    question: "After manually editing a conflicted file and removing all conflict markers, how do you mark that file as resolved in Git?",
    options: [
      "Run `git add <filename>`",
      "Run `git resolve --complete <filename>`",
      "Rename the file to `<filename>.resolved`",
      "Run `git rm <filename>`"
    ],
    answer: 0,
    explanation: "`git add <filename>` stages the resolved file and transitions it from an unmerged stage state (1, 2, 3) to the standard resolved stage (0)."
  },
  {
    id: 4,
    question: "Once all conflicted files have been resolved and staged with `git add`, what is the final step to conclude the merge?",
    options: [
      "Run `git commit` (or `git merge --continue`)",
      "Run `git switch main`",
      "Run `git merge --abort`",
      "Run `git branch -d feature`"
    ],
    answer: 0,
    explanation: "Running `git commit` reads `.git/MERGE_MSG`, creates the official merge commit with two parents, and finishes the merge lifecycle."
  },
  {
    id: 5,
    question: "What happens if you run `git merge --continue` after staging all resolved files?",
    options: [
      "It deletes the feature branch",
      "It is an alias for completing the merge commit, identical to running `git commit`",
      "It skips the remaining commits",
      "It reverts the changes"
    ],
    answer: 1,
    explanation: "`git merge --continue` checks that no unmerged paths remain and then invokes `git commit` to create the merge commit."
  },
  {
    id: 6,
    question: "What happens if a developer runs `git commit` while some files are still in an unmerged state?",
    options: [
      "Git commits anyway, corrupting the repository",
      "Git blocks the commit with an error stating that unmerged files still exist",
      "Git silently deletes the conflicted files",
      "Git opens a pull request automatically"
    ],
    answer: 1,
    explanation: "Git refuses to commit until all conflicted files have been staged with `git add` or removed with `git rm`."
  },
  {
    id: 7,
    question: "How do you handle a conflict where Branch A modified `config.json` while Branch B deleted `config.json` (modify/delete conflict), if your team decides the file SHOULD be kept?",
    options: [
      "Run `git add config.json`",
      "Run `git rm config.json`",
      "Run `git merge --abort`",
      "Run `git clean -f`"
    ],
    answer: 0,
    explanation: "Running `git add config.json` keeps the modified version and stages it for the merge commit."
  },
  {
    id: 8,
    question: "In the same modify/delete conflict, if your team agrees that the file SHOULD be deleted, what command resolves it?",
    options: [
      "git rm config.json",
      "git add config.json",
      "git reset config.json",
      "git push origin --delete config.json"
    ],
    answer: 0,
    explanation: "Running `git rm config.json` confirms the deletion and stages the removal for the merge commit."
  },
  {
    id: 9,
    question: "What should you ALWAYS do between editing conflict markers (Step 3) and staging/committing (Steps 4 & 5)?",
    options: [
      "Run tests / build scripts (`npm test`, `npm run build`, etc.) to verify code correctness and syntax",
      "Delete the `.git` directory",
      "Power cycle the computer",
      "Create a new remote repository"
    ],
    answer: 0,
    explanation: "Verifying that the combined code compiles, passes linting, and runs unit tests ensures you don't commit broken logic into the shared branch."
  },
  {
    id: 10,
    question: "If Sachin and Susmita find a complex conflict in `taxCalculator.js`, what is the best practice before finalizing the resolution?",
    options: [
      "Communicate directly (via Slack, call, or desk visit) to agree on the unified business logic",
      "Have Sachin silently overwrite Susmita's work",
      "Close the laptop and pretend nothing happened",
      "Delete both branches"
    ],
    answer: 0,
    explanation: "Effective conflict resolution is fundamentally a communication task between the authors of the divergent code changes."
  },
  {
    id: 11,
    question: "What command lets you check if any conflict markers were accidentally left behind in the working tree?",
    options: [
      "git diff --check",
      "git log --markers",
      "git branch --validate",
      "git status --clean"
    ],
    answer: 0,
    explanation: "`git diff --check` scans for leftover conflict markers and trailing whitespace errors."
  },
  {
    id: 12,
    question: "What does the default commit message generated by Git for a resolved merge look like?",
    options: [
      "Merge branch 'feature-name'",
      "Fix bug",
      "Auto commit",
      "WIP changes"
    ],
    answer: 0,
    explanation: "Git pre-populates the commit message with `Merge branch '<branch_name>'` and lists the conflicted files in comments within `.git/MERGE_MSG`."
  },
  {
    id: 13,
    question: "Can you customize the merge commit message when finalizing a resolved conflict with `git commit`?",
    options: [
      "No, Git locks the commit message permanently",
      "Yes, you can edit the message in the text editor or supply `-m 'custom message'` with `git commit`",
      "Only if authorized with a GitHub Pro subscription",
      "Only in Git GUI"
    ],
    answer: 1,
    explanation: "You have full freedom to explain the conflict resolution details in the commit message editor or via `git commit -m`."
  },
  {
    id: 14,
    question: "Which of the following commands safely aborts an in-progress merge conflict without losing prior uncommitted work from before the merge?",
    options: [
      "git merge --abort",
      "git reset --hard HEAD~10",
      "rm -rf .git",
      "git branch -D main"
    ],
    answer: 0,
    explanation: "`git merge --abort` restores the repository to its pre-merge condition and safely reinstates your working tree."
  },
  {
    id: 15,
    question: "What does `git diff --name-only --diff-filter=U` output?",
    options: [
      "A list of only the file paths that have unresolved merge conflicts",
      "All untracked files",
      "User commit statistics",
      "The URL of upstream remotes"
    ],
    answer: 0,
    explanation: "`--diff-filter=U` filters Git diff output specifically for Unmerged files, listing their paths cleanly."
  },
  {
    id: 16,
    question: "If a conflict occurs in an image asset `banner.png`, how do you choose the incoming feature branch's version?",
    options: [
      "git checkout --theirs -- banner.png && git add banner.png",
      "git restore --banner",
      "git merge --image",
      "git pull --replace banner.png"
    ],
    answer: 0,
    explanation: "`git checkout --theirs -- banner.png` extracts Stage 3 (incoming branch) version and replaces the working tree copy."
  },
  {
    id: 17,
    question: "How do you choose your current branch's version of a binary asset during a merge conflict?",
    options: [
      "git checkout --ours -- banner.png && git add banner.png",
      "git discard incoming",
      "git stash pop",
      "git commit --ours"
    ],
    answer: 0,
    explanation: "`git checkout --ours -- banner.png` extracts Stage 2 (HEAD/ours) version and stages it."
  },
  {
    id: 18,
    question: "Why does `git status` show files in red and green after partial resolution?",
    options: [
      "Red indicates files still containing unmerged conflicts; green indicates files already resolved and staged with `git add`",
      "It is a visual theme for holiday seasons",
      "Red means files have syntax errors; green means files have 100% test coverage",
      "Green means remote files; red means local files"
    ],
    answer: 0,
    explanation: "In `git status`, red unmerged paths need resolution and staging; green items are staged and ready to be committed."
  },
  {
    id: 19,
    question: "What state is the repository in if you run `git log --graph --oneline` after completing Step 5 of the conflict resolution workflow?",
    options: [
      "A linear single-branch history with squashed commits",
      "A 3-way merge commit is visible at the tip with two parent branches joining together into HEAD",
      "A detached HEAD state",
      "An empty repository"
    ],
    answer: 1,
    explanation: "Completing Step 5 creates a standard merge commit joining both divergent branch histories."
  },
  {
    id: 20,
    question: "If Swadeep accidentally stages a conflicted file containing markers without editing it, can he unstage it before committing?",
    options: [
      "No, once staged it is permanent",
      "Yes, using `git restore --staged <file>` or `git reset <file>`",
      "Only by deleting the repository",
      "Only with `git rm -f`"
    ],
    answer: 1,
    explanation: "Running `git restore --staged <file>` safely unstages the file so it can be edited and cleaned properly."
  },
  {
    id: 21,
    question: "What is the role of Git's `.git/MERGE_HEAD` file during an unresolved conflict?",
    options: [
      "It stores the commit SHA of the incoming branch being merged into HEAD",
      "It stores the user's SSH private key",
      "It contains the full text of all conflicted files",
      "It locks the keyboard from typing"
    ],
    answer: 0,
    explanation: "`.git/MERGE_HEAD` records the commit hash of the incoming branch until the merge commit is created or aborted."
  },
  {
    id: 22,
    question: "When does Git delete the `.git/MERGE_HEAD` file?",
    options: [
      "When the merge commit is successfully created via `git commit`, or when the merge is aborted via `git merge --abort`",
      "Never, it persists forever",
      "Only when the branch is pushed to GitHub",
      "When the terminal is closed"
    ],
    answer: 0,
    explanation: "Once the merge commit is finalized or aborted, Git removes `.git/MERGE_HEAD` as the repository returns to a standard clean state."
  },
  {
    id: 23,
    question: "Can conflict resolution be automated using Git merge drivers or attributes?",
    options: [
      "No, all conflicts must be resolved in notepad",
      "Yes, `.gitattributes` can specify custom merge drivers (e.g. `merge=union`, `merge=ours`, or custom JSON/package-lock drivers)",
      "Only for C++ header files",
      "Only on macOS"
    ],
    answer: 1,
    explanation: "`.gitattributes` supports configuring custom merge drivers (like `merge=ours` or union drivers) for specific file paths."
  },
  {
    id: 24,
    question: "In Coder & AccoTax's payroll system, if Sachin set metro HRA to 24% and Susmita set revised national HRA to 27%, what was the optimal resolution created by Sukanta Sir?",
    options: [
      "Hardcoding 0%",
      "Implementing dynamic logic: `const HRA_PERCENT = isMetro ? 0.27 : 0.24;` to satisfy both business requirements",
      "Deleting the payroll calculator entirely",
      "Paying all employees ₹1,00,000"
    ],
    answer: 1,
    explanation: "Sukanta Sir combined both requirements cleanly into a parameterized function supporting city-based metro differentiation."
  },
  {
    id: 25,
    question: "What is the five-step conflict resolution mantra taught by Sukanta Sir at Barrackpore?",
    options: [
      "Push, Force, Delete, Reclone, Pray",
      "Identify (`git status`), Review (`git diff`), Clean & Test (edit code), Stage (`git add`), and Finalize (`git commit`)",
      "Checkout, Stash, Drop, Rebase, Branch",
      "Wait, Delay, Postpone, Ignore, Forget"
    ],
    answer: 1,
    explanation: "The 5-step mantra: Status &rarr; Diff &rarr; Edit & Test &rarr; Stage &rarr; Commit ensures reliable, zero-stress conflict resolution."
  }
];

export default questions;
