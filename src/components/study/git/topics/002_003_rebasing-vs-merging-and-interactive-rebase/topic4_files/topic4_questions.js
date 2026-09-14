/**
 * Topic 4 Questions: The Golden Rule of Rebasing
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is the Golden Rule of Git Rebasing?",
    answer: "Never rebase commits that exist outside your private repository and that others may have based work on."
  },
  {
    id: 2,
    question: "What happens when you rebase a commit that a colleague has already pulled?",
    answer: "You create a new commit with a different hash. When your colleague pulls after you force-push, their Git sees two different histories and tries to merge them, re-introducing the old commit alongside the new one and creating duplicated changes."
  },
  {
    id: 3,
    question: "Why does `git push` reject a normal push after you have rebased a pushed branch?",
    answer: "Because rebasing rewrites commit hashes, making your local history no longer a direct descendant (fast-forward) of the remote branch tip."
  },
  {
    id: 4,
    question: "What dangerous flag overrides Git's rejection after a rebase?",
    answer: "`git push --force` (or `git push -f`)."
  },
  {
    id: 5,
    question: "Why is `git push --force-with-lease` safer than `git push --force`?",
    answer: "`--force-with-lease` checks if the remote branch reference still points to the commit you last fetched. If a colleague pushed new work in the interim, Git refuses to overwrite their work."
  },
  {
    id: 6,
    question: "Is it safe to rebase a private feature branch that only you work on?",
    answer: "Yes, as long as nobody else is pulling or basing work on that branch."
  },
  {
    id: 7,
    question: "Why should `main` or `master` never be rebased?",
    answer: "Because `main` is the central source of truth for the entire team and CI/CD pipelines. Rewriting its history will corrupt clones across every developer on the team."
  },
  {
    id: 8,
    question: "What setting can repository admins enable on GitHub/GitLab to enforce the Golden Rule?",
    answer: "Branch Protection Rules that disable force-pushing on protected branches like `main` and `develop`."
  },
  {
    id: 9,
    question: "In the Barrackpore AccoTax case study, what disaster occurred when Abhronila rebased the staging branch?",
    answer: "Tuhina's test suite broke with 14 duplicate GST functions because Abhronila's force-push duplicated historical commits across the team's local repos."
  },
  {
    id: 10,
    question: "How can a teammate recover if someone force-pushed a rebased branch they were working on?",
    answer: "They can run `git fetch origin` and rebase their local commits onto the updated remote branch using `git rebase --onto origin/branch <old_base> <local_branch>`."
  },
  {
    id: 11,
    question: "What does `git pull --rebase` do when remote history has changed normally?",
    answer: "It fetches remote updates and replays your local unpushed commits on top of them, preventing useless local merge commits."
  },
  {
    id: 12,
    question: "Can rebasing public branches break CI/CD pipelines?",
    answer: "Yes, CI/CD runners caching previous commit hashes may fail to check out or run incremental builds properly."
  },
  {
    id: 13,
    question: "What is a 'zombie commit' created by violating the Golden Rule?",
    answer: "A zombie commit is an old commit that was rewritten during a rebase but got resurrected when an unsuspecting teammate merged their un-rebased local branch."
  },
  {
    id: 14,
    question: "Is it safe to rebase commits that are only staged or in your local reflog?",
    answer: "Yes, 100% safe because those changes exist solely on your local computer."
  },
  {
    id: 15,
    question: "What should you do if you need to update a shared feature branch with changes from `main`?",
    answer: "Use `git merge main` instead of `git rebase main` so existing commit hashes on the shared branch remain intact."
  },
  {
    id: 16,
    question: "What does `git rebase --fork-point` do?",
    answer: "It automatically uses reflog data to detect the original commit where your branch was forked, preventing already-rebased commits from being duplicated."
  },
  {
    id: 17,
    question: "Why do open source maintainers request contributors to rebase their Pull Requests?",
    answer: "Because PR branches are isolated forks owned by a single contributor. Rebasing them keeps the project's upstream history clean without affecting other contributors."
  },
  {
    id: 18,
    question: "What should you communicate to your team if you accidentally force-push a rewritten branch?",
    answer: "Notify the team immediately, provide the new commit hash, and instruct everyone to reset their local branches to `origin/<branch>` before pushing."
  },
  {
    id: 19,
    question: "Does `git revert` violate the Golden Rule?",
    answer: "No. `git revert` creates a new forward commit that inverts previous changes, preserving existing commit hashes."
  },
  {
    id: 20,
    question: "How can you tell if a branch has other contributors before deciding to rebase?",
    answer: "Check `git log --format='%an' <branch>` or inspect contributor avatars on the GitHub/GitLab Pull Request page."
  },
  {
    id: 21,
    question: "What is the psychological rule of thumb taught by Sukanta Sir for rebasing?",
    answer: "'If you pushed it and someone pulled it, treat it as carved in granite; if it is on your local laptop, treat it as clay.'"
  },
  {
    id: 22,
    question: "Can tag objects be broken by rebasing tagged commits?",
    answer: "Yes, lightweight or annotated tags pointing to old commit hashes will point to orphaned commits if those commits are rewritten."
  },
  {
    id: 23,
    question: "What happens if two developers work on the same branch and both rebase independently?",
    answer: "They create two completely different sets of commit hashes, leading to severe merge conflict headaches and duplicate commits."
  },
  {
    id: 24,
    question: "What is the difference between `git push -f` and `git push --force-with-lease` in terms of network safety?",
    answer: "`git push -f` blindfolds Git and forces overwrite regardless of remote state; `--force-with-lease` checks if remote ref equals expected ref before updating."
  },
  {
    id: 25,
    question: "What is the best alternative to rebasing when collaborating on long-lived integration branches?",
    answer: "Merge with `--no-ff` to clearly document sprint integration milestones."
  },
  {
    id: 26,
    question: "Why does GitHub allow repository admins to disable force pushes entirely?",
    answer: "To ensure no team member can accidentally rewrite history or delete branches on production repositories."
  },
  {
    id: 27,
    question: "What command lets you view the reflog of remote tracking references?",
    answer: "`git reflog show origin/<branch>`."
  },
  {
    id: 28,
    question: "What is the ultimate takeaway of Topic 4?",
    answer: "Rebase locally to clean up your work; merge publicly to share and preserve collaborative history."
  }
];

export default questions;
