/**
 * Topic 7 Questions: Interactive Rebase Mastery
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is Git Interactive Rebase?",
    answer: "Interactive Rebase (`git rebase -i`) is an interactive tool in Git that opens a script of upcoming commits in a text editor, allowing you to reorder, squash, fix up, edit, drop, or reword commits before applying them."
  },
  {
    id: 2,
    question: "What does the command `git rebase -i HEAD~3` do?",
    answer: "It opens an interactive rebase editor containing the last 3 commits on the current branch."
  },
  {
    id: 3,
    question: "What does `git rebase -i main` do when run on a feature branch?",
    answer: "It opens an interactive rebase session for all commits on the feature branch that were authored since diverging from the `main` branch."
  },
  {
    id: 4,
    question: "How is commit order structured in the interactive rebase TODO file compared to `git log`?",
    answer: "In `git log`, the newest commit is on top. In the interactive rebase TODO file, commits are listed chronologically: the OLDEST commit is at the top, and the NEWEST commit is at the bottom."
  },
  {
    id: 5,
    question: "Why does the rebase TODO file place the oldest commit on top?",
    answer: "Because Git replays the script from line 1 downward, applying the oldest commit first on top of the base."
  },
  {
    id: 6,
    question: "What happens if you delete a line completely from the interactive rebase TODO file?",
    answer: "Git interprets deleting a line as an instruction to DROP (delete) that commit from the branch history."
  },
  {
    id: 7,
    question: "What should you do if you opened `git rebase -i` by accident and want to cancel without making changes?",
    answer: "Either delete all lines in the editor and save/quit, or exit the editor and immediately run `git rebase --abort`."
  },
  {
    id: 8,
    question: "Which environment variable determines which text editor Git opens for interactive rebasing?",
    answer: "`GIT_SEQUENCE_EDITOR` (falls back to `GIT_EDITOR`, `VISUAL`, `EDITOR`, or core.editor config)."
  },
  {
    id: 9,
    question: "What command configures VS Code as the default editor for interactive rebases?",
    answer: "`git config --global core.editor 'code --wait'`."
  },
  {
    id: 10,
    question: "In the Barrackpore AccoTax case study, what did Sachin accomplish using `git rebase -i HEAD~4`?",
    answer: "Sachin combined 4 messy WIP and typo commits into 1 clean, conventional commit before submitting his code review."
  },
  {
    id: 11,
    question: "Can you reorder commits simply by cutting and pasting lines in the interactive rebase TODO file?",
    answer: "Yes! Git will replay the commits in the exact top-to-bottom order you arrange in the TODO file."
  },
  {
    id: 12,
    question: "What happens if reordering two commits creates a dependency conflict?",
    answer: "Git will pause on the reordered commit and ask you to resolve the conflict before continuing with `git rebase --continue`."
  },
  {
    id: 13,
    question: "What is the recommended safety step before initiating an interactive rebase?",
    answer: "Create a backup branch pointer: `git branch backup-before-rebase` so you can instantly restore if needed."
  },
  {
    id: 14,
    question: "What is the root commit syntax to interactively rebase from the very first commit of a repository?",
    answer: "`git rebase -i --root`."
  },
  {
    id: 15,
    question: "What does the `--autosquash` flag do during `git rebase -i`?",
    answer: "It automatically rearranges `fixup!` and `squash!` commits directly under their target commits in the TODO list."
  },
  {
    id: 16,
    question: "Can you rebase interactively onto a remote tracking branch like `origin/main`?",
    answer: "Yes: `git rebase -i origin/main`."
  },
  {
    id: 17,
    question: "What happens if you leave comment lines starting with `#` in the TODO file?",
    answer: "Git ignores all comment lines starting with `#`."
  },
  {
    id: 18,
    question: "What directive is used by default for all commits in the initial TODO list?",
    answer: "The `pick` (or `p`) directive."
  },
  {
    id: 19,
    question: "How can you view the commit hashes before they were rewritten by interactive rebase?",
    answer: "By inspecting `git reflog`."
  },
  {
    id: 20,
    question: "Can interactive rebase be used to remove passwords or API keys committed in local commits?",
    answer: "Yes, by dropping the offending commit or editing it with the `edit` directive before pushing upstream."
  },
  {
    id: 21,
    question: "Why should you NOT use interactive rebase on commits pushed to public team branches?",
    answer: "Because it changes commit SHA-1 hashes, violating the Golden Rule of Rebasing and breaking teammates' branches."
  },
  {
    id: 22,
    question: "What happens if you save an empty file in the interactive rebase editor?",
    answer: "Git cancels the rebase operation completely without modifying your branch."
  },
  {
    id: 23,
    question: "What command lets you check the status of an ongoing interactive rebase?",
    answer: "`git status`."
  },
  {
    id: 24,
    question: "How does Git identify the target commit when you run `git rebase -i <commit_sha>`?",
    answer: "The commit `<commit_sha>` itself is NOT included in the TODO list; the list includes all commits starting from the immediate child of `<commit_sha>` up to `HEAD`."
  },
  {
    id: 25,
    question: "Can you run interactive rebase on a branch with uncommitted changes?",
    answer: "Only if you pass `--autostash` or have `rebase.autoStash` enabled in Git config; otherwise, Git requires a clean working tree."
  },
  {
    id: 26,
    question: "What does `git rebase -i --onto <newbase> <oldbase>` allow you to do?",
    answer: "It allows you to transplant a range of commits (`oldbase..HEAD`) onto an entirely different branch or base commit (`newbase`) interactively."
  },
  {
    id: 27,
    question: "How does interactive rebase improve repository documentation quality?",
    answer: "It allows engineers to craft clear, atomic commit histories with meaningful messages before sharing code for peer review."
  },
  {
    id: 28,
    question: "What is Sukanta Sir's favorite quote about interactive rebase?",
    answer: "'Interactive rebase is the sculptor's chisel of Git: it lets you turn raw, messy coding stone into a clean work of engineering art.'"
  }
];

export default questions;
