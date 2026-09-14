/**
 * Topic 9 Questions: Reordering Commits & Splitting a Large Commit
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "How do you reorder commits during an interactive rebase?",
    answer: "Open `git rebase -i` and rearrange the commit lines into your desired chronological order (top-to-bottom), then save and exit."
  },
  {
    id: 2,
    question: "What is an atomic commit in Git?",
    answer: "An atomic commit is a commit that encapsulates a single logical change or feature, along with its tests and documentation, leaving the repository in a fully working, compilable state."
  },
  {
    id: 3,
    question: "Which interactive rebase directive is used to split a large commit?",
    answer: "The `edit` (or `e`) directive."
  },
  {
    id: 4,
    question: "What is the key command run immediately after Git pauses on an `edit` directive to split a commit?",
    answer: "`git reset HEAD~` (mixed reset), which undoes the commit but preserves all modified files unstaged in the working tree."
  },
  {
    id: 5,
    question: "What do you do after running `git reset HEAD~` when splitting a commit?",
    answer: "Stage logical subsets of files (or hunks using `git add -p`), commit each subset individually with a dedicated message, and then run `git rebase --continue`."
  },
  {
    id: 6,
    question: "Can you split a single file's modifications into two separate commits?",
    answer: "Yes, by using patch staging: `git add -p <file>` to select specific line hunks for each commit."
  },
  {
    id: 7,
    question: "What happens if reordering two commits breaks a chronological dependency?",
    answer: "Git halts with a merge conflict at the reordered commit. You must resolve the conflict and run `git rebase --continue`."
  },
  {
    id: 8,
    question: "In the Barrackpore AccoTax case study, what two things did Swadeep split apart?",
    answer: "Swadeep split a monolithic commit containing both an unrelated database connection URI configuration and the ₹5,000 GST late filing penalty calculation."
  },
  {
    id: 9,
    question: "What command do you run to complete the rebase after splitting a commit?",
    answer: "`git rebase --continue`."
  },
  {
    id: 10,
    question: "Why are atomic commits preferred for code reviews on GitHub/GitLab?",
    answer: "They allow reviewers to review distinct, self-contained changes individually, making pull requests easier to understand, approve, or revert if a specific bug is discovered."
  },
  {
    id: 11,
    question: "Can you split multiple commits in a single interactive rebase session?",
    answer: "Yes, by marking each commit you wish to split with `edit` in the TODO file."
  },
  {
    id: 12,
    question: "What happens to the original megacommit's SHA-1 hash after splitting?",
    answer: "The original megacommit is removed from branch history and replaced by two (or more) brand new commit objects with distinct hashes."
  },
  {
    id: 13,
    question: "What should you do if you get confused while halfway through splitting a commit?",
    answer: "Run `git rebase --abort` to return safely to the exact pre-rebase state."
  },
  {
    id: 14,
    question: "Can you split a commit into three or more atomic commits?",
    answer: "Yes, you can create as many commits as needed using `git add` and `git commit` before finally calling `git rebase --continue`."
  },
  {
    id: 15,
    question: "What happens if you run `git reset --hard HEAD~` instead of `git reset HEAD~` while splitting?",
    answer: "WARNING: `git reset --hard` will erase all your uncommitted file changes! Always use soft or mixed reset (`git reset HEAD~` or `git reset --soft HEAD~`)."
  },
  {
    id: 16,
    question: "Why should you test each split commit before continuing the rebase?",
    answer: "To ensure that every new atomic commit builds cleanly and passes unit tests independently, preserving bisectability."
  },
  {
    id: 17,
    question: "Can you reorder commits and split a commit in the same interactive rebase session?",
    answer: "Yes, you can rearrange line positions and change directives to `edit` in a single session."
  },
  {
    id: 18,
    question: "What tool in VS Code helps split files into hunks visually?",
    answer: "The Source Control diff view allows you to click individual line ranges and click 'Stage Selected Ranges'."
  },
  {
    id: 19,
    question: "How does splitting commits benefit `git bisect`?",
    answer: "If a regression occurs, `git bisect` can isolate the exact 5-line bug commit instead of blaming a 1,000-line monolithic commit."
  },
  {
    id: 20,
    question: "What is the difference between `git reset HEAD~` and `git reset --soft HEAD~` for splitting?",
    answer: "`git reset HEAD~` leaves files unstaged in the working tree; `git reset --soft HEAD~` leaves all files staged in the index, requiring you to selectively unstage files (`git restore --staged <file>`)."
  },
  {
    id: 21,
    question: "How do you verify the new commit structure after a split rebase?",
    answer: "Run `git log -n <count> --stat` or `git log --oneline --graph`."
  },
  {
    id: 22,
    question: "Is commit splitting safe on shared public branches?",
    answer: "No, because it rewrites commit history, violating the Golden Rule of Rebasing."
  },
  {
    id: 23,
    question: "Can you change the author date of split commits?",
    answer: "By default, the first split commit retains the original author date, and subsequent commits receive the current timestamp."
  },
  {
    id: 24,
    question: "What is the Conventional Commits specification's stance on atomic commits?",
    answer: "Conventional Commits strongly encourages atomic commits, where each commit has a single type prefix (`feat`, `fix`, `docs`, `refactor`) reflecting one change."
  },
  {
    id: 25,
    question: "What does Git do if you run `git rebase --continue` immediately after `git reset HEAD~` without creating any new commits?",
    answer: "Git will notice uncommitted changes in your working tree and pause, asking you to either commit them or stash them before continuing."
  },
  {
    id: 26,
    question: "Can you reorder commits to move bug fixes before new features?",
    answer: "Yes, moving bugfix commits earlier in the sequence is a common practice before cherry-picking them to release branches."
  },
  {
    id: 27,
    question: "What is the maximum number of commits you can reorder at once?",
    answer: "There is no limit; Git can reorder dozens or hundreds of commits in a single TODO script."
  },
  {
    id: 28,
    question: "What core advice does Sukanta Sir give on atomic commits?",
    answer: "'One commit, one purpose. If your commit message contains the word 'AND', it should probably be split into two commits!'"
  }
];

export default questions;
