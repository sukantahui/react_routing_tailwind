/**
 * Topic 10 Questions: Squashing WIP and Bugfix Commits
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "Why should developers squash WIP (Work In Progress) commits before opening a Pull Request?",
    answer: "Squashing removes intermediate noise, typos, and broken debugging states, providing code reviewers with clean, atomic commits that clearly explain the feature's architecture."
  },
  {
    id: 2,
    question: "What is the difference between squashing locally via `git rebase -i` vs GitHub's 'Squash and Merge' button?",
    answer: "Local squashing via `git rebase -i` gives you full granular control to organize your work into 1, 2, or 3 distinct atomic commits before review. GitHub's 'Squash and Merge' squashes ALL branch commits indiscriminately into exactly 1 commit upon PR merge."
  },
  {
    id: 3,
    question: "Which interactive directive is fastest for squashing minor typo fixes without editing messages?",
    answer: "The `fixup` (or `f`) directive, because it combines the code into the previous commit and automatically discards the typo commit message."
  },
  {
    id: 4,
    question: "What is the structure of a Conventional Commit message?",
    answer: "`<type>(<scope>): <subject>` followed by an optional blank line, a detailed body, and footer tokens (e.g. `Closes #42`)."
  },
  {
    id: 5,
    question: "In the Barrackpore AccoTax case study, how many commits did Abhronila squash?",
    answer: "Abhronila squashed 8 messy WIP commits into 1 pristine Conventional Commit for the GSTR-1 quarterly JSON export module."
  },
  {
    id: 6,
    question: "What command lets you amend the commit message of your newly squashed commit?",
    answer: "`git commit --amend -m 'feat(scope): new message'`."
  },
  {
    id: 7,
    question: "How does squashing commits protect `git bisect` automated debugging?",
    answer: "Intermediate WIP commits often don't compile or have broken unit tests. Squashing ensures every historical commit in the master log is fully working and testable."
  },
  {
    id: 8,
    question: "Can you squash all commits on a feature branch against `main` in one command?",
    answer: "Yes, by running `git rebase -i $(git merge-base main HEAD)` or `git rebase -i main`."
  },
  {
    id: 9,
    question: "What should you do if your squashed commit breaks tests?",
    answer: "Run `git reflog` to find the commit SHA before the rebase and reset back with `git reset --hard HEAD@{1}`."
  },
  {
    id: 10,
    question: "Why should you always create a temporary backup branch before squashing?",
    answer: "Running `git branch backup-wip` gives you instant peace of mind, allowing you to compare diffs (`git diff backup-wip`) to verify that no code was lost during the squash."
  },
  {
    id: 11,
    question: "What flag allows pushing a squashed branch to GitHub safely?",
    answer: "`git push --force-with-lease`."
  },
  {
    id: 12,
    question: "What are the common Conventional Commit types?",
    answer: "`feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting), `refactor` (code restructuring), `test` (adding tests), and `chore` (build/tooling updates)."
  },
  {
    id: 13,
    question: "Can you squash 10 commits into 2 distinct logical commits in a single rebase session?",
    answer: "Yes! Use `pick` for commit 1 followed by `fixup` for commits 2-5, then `pick` for commit 6 followed by `fixup` for commits 7-10."
  },
  {
    id: 14,
    question: "What is a 'fixup commit' in Git?",
    answer: "A commit created with `git commit --fixup <target_sha>` specifically intended to be automatically squashed into an earlier commit using `--autosquash`."
  },
  {
    id: 15,
    question: "Does squashing commits change the total diff of the branch against `main`?",
    answer: "No. The final diff of the working tree against `main` (`git diff main...feature`) remains 100% identical."
  },
  {
    id: 16,
    question: "What happens if you squash a commit that added a file and another that deleted the same file?",
    answer: "The resulting squashed commit will show no file creation or deletion, cleanly eliminating the temporary file churn from history."
  },
  {
    id: 17,
    question: "Why do engineering leaders discourage committing 'fixed typo' or 'wip' directly to `main`?",
    answer: "Because it pollutes the release changelog and makes repository history look amateurish."
  },
  {
    id: 18,
    question: "What does the `git diff <backup_branch> <squashed_branch>` command output if squashing was performed perfectly?",
    answer: "It outputs completely empty (no differences), proving that all code logic was 100% preserved."
  },
  {
    id: 19,
    question: "How does squashing help changelog generators like `standard-version` or `semantic-release`?",
    answer: "Automated release tools parse Conventional Commit headers from squashed commits to automatically increment semver version numbers and generate CHANGELOG.md files."
  },
  {
    id: 20,
    question: "Can you squash commits in GUI clients like VS Code, GitKraken, or Fork?",
    answer: "Yes, by dragging and dropping commits or right-clicking and selecting 'Squash into parent'."
  },
  {
    id: 21,
    question: "What is the danger of squashing too many unrelated features into 1 giant commit?",
    answer: "It becomes difficult to revert a single feature later if one specific part causes a production regression."
  },
  {
    id: 22,
    question: "What is the golden rule for choosing how many commits to leave after squashing?",
    answer: "Leave as many commits as there are distinct, independent ideas or milestones in your pull request (usually 1 to 3 commits)."
  },
  {
    id: 23,
    question: "What happens to author credits if two developers authored commits that get squashed together?",
    answer: "The squashed commit retains the author of the first commit in the squash block. You can add `Co-authored-by: Name <email>` in the commit message body to credit co-authors."
  },
  {
    id: 24,
    question: "How does GitHub recognize co-authors in squashed PR commit messages?",
    answer: "GitHub parses lines ending with `Co-authored-by: Name <email@domain.com>` in the commit description and displays multiple author avatars."
  },
  {
    id: 25,
    question: "What is the difference between `git merge --squash` and interactive rebase squashing?",
    answer: "`git merge --squash` stages all branch changes directly into the current branch as an uncommitted working tree diff without retaining branch commit objects."
  },
  {
    id: 26,
    question: "Why should you never squash commits on a branch after the PR has been merged?",
    answer: "Because the branch commits are already integrated into the target branch; rewriting them locally has no effect upstream."
  },
  {
    id: 27,
    question: "How do you verify your squashed commit on the command line?",
    answer: "Run `git show HEAD` or `git log -1 --stat`."
  },
  {
    id: 28,
    question: "What final advice does Sukanta Sir give regarding WIP squashing?",
    answer: "'Commit as often as you want locally during the day for safety, but ALWAYS squash and polish your commits before asking a teammate for code review!'"
  }
];

export default questions;
