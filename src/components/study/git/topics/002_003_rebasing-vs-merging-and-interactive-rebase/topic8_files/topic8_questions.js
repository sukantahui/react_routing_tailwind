/**
 * Topic 8 Questions: Interactive Rebase Command Directives
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What does the `pick` directive do in an interactive rebase?",
    answer: "It includes the commit as-is without altering its commit message, author timestamp, or code diff."
  },
  {
    id: 2,
    question: "What does the `reword` directive do?",
    answer: "It applies the commit's code changes but opens a text editor allowing you to rewrite or fix the commit message."
  },
  {
    id: 3,
    question: "What does the `edit` directive do during an interactive rebase?",
    answer: "It pauses the rebase at that specific commit, allowing you to amend the commit (`git commit --amend`), add forgotten files, or split the commit into multiple smaller atomic commits before running `git rebase --continue`."
  },
  {
    id: 4,
    question: "What is the difference between `squash` and `fixup`?",
    answer: "`squash` combines the commit into the previous commit AND opens an editor to concatenate or edit both commit messages. `fixup` combines the commit into the previous commit but DISCARDS this commit's message, keeping only the previous message."
  },
  {
    id: 5,
    question: "What does the `drop` directive do?",
    answer: "It removes the commit entirely from the replayed branch history. (Deleting the line from the TODO file has the exact same effect)."
  },
  {
    id: 6,
    question: "What does the `exec` directive do in an interactive rebase?",
    answer: "It executes a shell command (such as `npm test` or `make build`) after the preceding commit is applied. If the command returns a non-zero exit code (failure), Git pauses the rebase so you can fix the issue."
  },
  {
    id: 7,
    question: "Can you run `exec` across every single commit automatically?",
    answer: "Yes, by passing the `--exec` flag when launching rebase: `git rebase -i --exec 'npm test' main`."
  },
  {
    id: 8,
    question: "Can you squash the very first commit on the top line of the TODO list?",
    answer: "No. The first commit has no previous commit within the selected rebase range to squash into. Attempting to squash the first commit will cause Git to throw an error."
  },
  {
    id: 9,
    question: "What is `fixup -C <commit>` used for in modern Git?",
    answer: "It melds the commit into the previous commit and replaces the previous commit's message with this commit's message, opening an editor to review."
  },
  {
    id: 10,
    question: "What are the single-letter shortcuts for `pick`, `reword`, `edit`, `squash`, `fixup`, `drop`, and `exec`?",
    answer: "`p` (pick), `r` (reword), `e` (edit), `s` (squash), `f` (fixup), `d` (drop), `x` (exec)."
  },
  {
    id: 11,
    question: "In the Barrackpore AccoTax case study, what did Susmita use `exec` for?",
    answer: "Susmita used `exec ./test.sh` to ensure every intermediate commit on her TDS calculation branch compiled and passed automated tax compliance test suites."
  },
  {
    id: 12,
    question: "How do you split a single large commit into two smaller commits during an interactive rebase?",
    answer: "Mark the commit with `edit`. When Git pauses at that commit, run `git reset HEAD~`, stage individual files with `git add` and commit them separately, then run `git rebase --continue`."
  },
  {
    id: 13,
    question: "What happens if you accidentally write `pick` on all lines?",
    answer: "Git will replay all commits exactly as they were without making any changes."
  },
  {
    id: 14,
    question: "What happens if you reword a commit message in an interactive rebase?",
    answer: "The commit's SHA-1 hash will change because the commit message is part of the cryptographic hash digest."
  },
  {
    id: 15,
    question: "Can you chain multiple `squash` or `fixup` directives consecutively?",
    answer: "Yes! A sequence like `pick A`, `squash B`, `squash C`, `fixup D` will combine all four commits into a single commit."
  },
  {
    id: 16,
    question: "What happens if an `exec` command fails during a rebase?",
    answer: "Git halts the rebase with the error code, leaving your working directory in the state of the failing commit so you can debug and fix the code."
  },
  {
    id: 17,
    question: "After fixing a failure triggered by an `exec` directive, what command do you run?",
    answer: "Stage your fixes (`git add`), amend the commit (`git commit --amend`), and run `git rebase --continue`."
  },
  {
    id: 18,
    question: "What does the `break` (or `b`) directive do in an interactive rebase?",
    answer: "It stops the rebase at that point (similar to a breakpoint in debugging) without modifying any commit, allowing you to inspect the working tree."
  },
  {
    id: 19,
    question: "What does the `label` and `reset` directives do in advanced interactive rebases?",
    answer: "They allow creating temporary branch labels and resetting back to them, enabling rebasing of complex merge branch topologies (`--rebase-merges`)."
  },
  {
    id: 20,
    question: "Why is `fixup` generally preferred over `squash` for minor typo commits?",
    answer: "Because you don't need to manually delete the 'fix typo' commit message in an editor; `fixup` discards the useless message automatically."
  },
  {
    id: 21,
    question: "Can you reword the commit message of a commit that you are also editing files in?",
    answer: "Yes, when marked with `edit`, you can amend both the files and message with `git commit --amend -m 'New Message'`."
  },
  {
    id: 22,
    question: "What happens if you use `drop` on a commit that introduced a function needed by subsequent commits?",
    answer: "The subsequent replayed commits will fail to apply with merge conflicts because the expected function no longer exists."
  },
  {
    id: 23,
    question: "How do you view which directive caused the current pause during a rebase?",
    answer: "Run `git status`. It displays whether you are paused on an `edit`, `conflict`, or failed `exec`."
  },
  {
    id: 24,
    question: "What is the shortcut in VS Code interactive rebase UI to change a directive?",
    answer: "Select the dropdown next to the commit and choose 'Pick', 'Squash', 'Fixup', 'Edit', or 'Drop'."
  },
  {
    id: 25,
    question: "Can you reorder directives freely in the TODO file?",
    answer: "Yes, as long as `squash` and `fixup` always follow a `pick` or `edit` commit."
  },
  {
    id: 26,
    question: "What happens if you mark the first line of the rebase script as `squash`?",
    answer: "Git throws a fatal error: `cannot 'squash' without a previous commit`."
  },
  {
    id: 27,
    question: "How does `exec` improve Continuous Integration (CI) test reliability?",
    answer: "It guarantees that every single commit on your feature branch compiles and passes tests independently, ensuring `git bisect` never breaks."
  },
  {
    id: 28,
    question: "What summary mantra does Sukanta Sir teach for interactive rebase directives?",
    answer: "'Pick to keep, reword to speak, edit to tweak, squash to combine, fixup to refine, drop to delete, and exec to test every line!'"
  }
];

export default questions;
