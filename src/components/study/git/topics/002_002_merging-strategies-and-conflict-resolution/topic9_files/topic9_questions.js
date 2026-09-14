// ==============================================================================
// TOPIC 9 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Aborting a Merge Safely (git merge --abort)
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "When should a developer use `git merge --abort`?",
    options: [
      "To permanently delete their GitHub account",
      "When an in-progress merge encounters conflicts and they wish to safely cancel the merge and restore the pre-merge state",
      "To force push commits to the production server",
      "Only after a merge commit has already been finalized"
    ],
    answer: 1,
    explanation: "`git merge --abort` is specifically used to cancel an active, uncommitted merge operation and restore the working directory and index."
  },
  {
    id: 2,
    question: "What happens to the working tree files when `git merge --abort` is executed?",
    options: [
      "They are completely deleted",
      "All conflict markers and merge modifications are stripped, returning files to their exact state prior to running `git merge`",
      "They are converted into PDF documents",
      "They are uploaded to AWS S3"
    ],
    answer: 1,
    explanation: "Git cleans up all injected markers and reconstructs the working tree files to match the pre-merge HEAD commit."
  },
  {
    id: 3,
    question: "Which file inside the `.git` directory indicates that an active merge is underway?",
    options: [
      ".git/MERGE_HEAD",
      ".git/PASSWORDS",
      ".git/LOG_ERRORS",
      ".git/AUTO_SAVE"
    ],
    answer: 0,
    explanation: "The presence of `.git/MERGE_HEAD` signals to Git that an integration is currently in progress."
  },
  {
    id: 4,
    question: "What happens to `.git/MERGE_HEAD` and `.git/MERGE_MSG` when `git merge --abort` is run?",
    options: [
      "They are renamed to .bak files",
      "They are permanently deleted by Git as the merge state is dismantled",
      "They are moved to the root directory",
      "They are encrypted with GPG"
    ],
    answer: 1,
    explanation: "Git removes all temporary merge state files (`MERGE_HEAD`, `MERGE_MSG`, `MERGE_MODE`) upon aborting."
  },
  {
    id: 5,
    question: "Can `git merge --abort` undo a merge if you have already executed `git commit` to complete the merge?",
    options: [
      "Yes, it works anytime in the history of the repo",
      "No, once committed, the merge is finalized; you must use `git reset --hard HEAD~1` or `git revert -m 1 <commit_hash>`",
      "Only if you have an active internet connection",
      "Only on macOS"
    ],
    answer: 1,
    explanation: "`--abort` is only valid while a merge is in progress (uncommitted). Once committed, history undo commands (`reset` or `revert`) are required."
  },
  {
    id: 6,
    question: "What is the difference between `git merge --abort` and `git merge --quit`?",
    options: [
      "`git merge --abort` resets the working tree back to pre-merge state; `git merge --quit` removes the merge state but leaves modified working tree files intact",
      "`git merge --quit` deletes the branch",
      "`git merge --quit` is for Python only",
      "There is no difference"
    ],
    answer: 0,
    explanation: "`--quit` clears `.git/MERGE_HEAD` but retains any edits you made in your working files, while `--abort` resets everything."
  },
  {
    id: 7,
    question: "What older Git command is essentially identical to `git merge --abort`?",
    options: [
      "git reset --merge",
      "git checkout -f",
      "git stash clear",
      "git clean -fd"
    ],
    answer: 0,
    explanation: "`git reset --merge` was the legacy command used prior to the introduction of the intuitive `--abort` flag in modern Git."
  },
  {
    id: 8,
    question: "If Sachin had uncommitted changes before running `git merge`, what happens when he runs `git merge --abort`?",
    options: [
      "Git attempts to restore his pre-merge uncommitted changes if they did not conflict with the merge",
      "Git deletes all uncommitted changes permanently",
      "Git formats the disk",
      "Git logs out of Windows"
    ],
    answer: 0,
    explanation: "Git's abort mechanism tries to preserve uncommitted changes that were not part of the conflicted merge, though stashing before merging is strongly advised."
  },
  {
    id: 9,
    question: "Why should developers NEVER manually delete conflicted files using `rm` when they want to cancel a merge?",
    options: [
      "Because `rm` deletes the actual file, while the index remains stuck in an unmerged conflict state with `.git/MERGE_HEAD` active",
      "Because `rm` sends an alert to GitHub security",
      "Because `rm` locks the keyboard",
      "Because `rm` is only for Linux"
    ],
    answer: 0,
    explanation: "Deleting files with `rm` leaves Git's index and `.git/MERGE_HEAD` in a broken unmerged state. `git merge --abort` is the proper atomic rollback."
  },
  {
    id: 10,
    question: "What error does Git display if you run `git merge --abort` when no merge is actually in progress?",
    options: [
      "fatal: There is no merge to abort (MERGE_HEAD missing).",
      "fatal: All files deleted.",
      "error: GitHub server unreachable.",
      "warning: Operating system reboot required."
    ],
    answer: 0,
    explanation: "Git checks for the existence of `.git/MERGE_HEAD`; if it is missing, Git reports that no merge is currently in progress."
  },
  {
    id: 11,
    question: "In Coder & AccoTax lab, why did Sukanta Sir advise Susmita to abort an experimental merge?",
    options: [
      "Because she merged an experimental 40% tax branch into production by accident and needed to cleanly reset before re-integrating the correct branch",
      "Because her computer ran out of battery",
      "Because Git licenses expired",
      "Because the terminal font was too small"
    ],
    answer: 0,
    explanation: "Aborting is the safest strategy when an incorrect branch or experimental feature was accidentally targeted for integration."
  },
  {
    id: 12,
    question: "Can `git rebase` also be aborted safely?",
    options: [
      "Yes, using `git rebase --abort`",
      "No, rebase cannot be cancelled",
      "Only if run on Linux",
      "Only within 5 seconds of starting"
    ],
    answer: 0,
    explanation: "Git provides equivalent `--abort` flags across all major operations (`git rebase --abort`, `git cherry-pick --abort`, `git revert --abort`)."
  },
  {
    id: 13,
    question: "What does `git status` output immediately after running `git merge --abort`?",
    options: [
      "On branch <branch_name>, nothing to commit, working tree clean",
      "fatal: corrupt repository",
      "Unmerged paths (red)",
      "Detached HEAD"
    ],
    answer: 0,
    explanation: "The repository returns to its standard clean state with zero unmerged paths or leftover merge metadata."
  },
  {
    id: 14,
    question: "Does `git merge --abort` delete any commits that were already created on the feature branch?",
    options: [
      "No, commits on the feature branch remain 100% intact and untouched in the object database",
      "Yes, it wipes out all commits on the feature branch",
      "It deletes the last 3 commits",
      "It renames the commits to 'ABORTED'"
    ],
    answer: 0,
    explanation: "Commits in Git are immutable DAG objects. Aborting a merge only resets the current working tree and index; feature branch commits are untouched."
  },
  {
    id: 15,
    question: "If a developer gets confused during a conflict resolution and makes bad manual edits, what is the fastest way to start the merge over?",
    options: [
      "Run `git merge --abort` and then run `git merge <branch>` again",
      "Delete the repository folder and clone from remote",
      "Manually undo lines from memory",
      "Create a new user account"
    ],
    answer: 0,
    explanation: "Aborting and re-running the merge is the cleanest, zero-risk way to start conflict resolution with fresh markers."
  },
  {
    id: 16,
    question: "Which of the following commands does NOT abort an active merge?",
    options: [
      "git merge --abort",
      "git reset --merge",
      "git branch -D feature",
      "git merge --quit"
    ],
    answer: 2,
    explanation: "Attempting to delete a branch with `git branch -D` does not cancel or clean up the active unmerged state on HEAD."
  },
  {
    id: 17,
    question: "What happens to staged files from the conflict resolution when `git merge --abort` is run?",
    options: [
      "They are reverted back to the pre-merge HEAD commit state",
      "They are committed immediately",
      "They are saved to the clipboard",
      "They are converted into stash items"
    ],
    answer: 0,
    explanation: "All staged resolution changes are discarded, and index stage 0 is reset to the HEAD commit."
  },
  {
    id: 18,
    question: "If `git merge --abort` fails due to uncommitted pre-merge changes that were modified during conflict resolution, what is the ultimate escape hatch?",
    options: [
      "git reset --hard HEAD",
      "git push --force",
      "git reflog delete",
      "git init --bare"
    ],
    answer: 0,
    explanation: "`git reset --hard HEAD` unconditionally forces the working tree and index to match HEAD, wiping all in-flight changes."
  },
  {
    id: 19,
    question: "Why does Git prevent starting a new merge or checkout when a merge is currently in progress?",
    options: [
      "Because `.git/MERGE_HEAD` locks Git in a merge transition state until the current merge is either committed or aborted",
      "Because Git has a daily merge quota",
      "Because branches cannot exist simultaneously",
      "Because GitHub blocks parallel requests"
    ],
    answer: 0,
    explanation: "Git maintains transactional safety: you cannot start a second merge while an unresolved merge state is active."
  },
  {
    id: 20,
    question: "In VS Code's Source Control view, what button provides the equivalent of `git merge --abort`?",
    options: [
      "The 'Abort Merge' button located in the merge notification banner",
      "The 'Publish Branch' button",
      "The 'Stage All Changes' button",
      "The 'Delete Repository' button"
    ],
    answer: 0,
    explanation: "VS Code displays an 'Abort Merge' action banner whenever a conflicted merge state is detected."
  },
  {
    id: 21,
    question: "Can you run `git merge --abort` inside a script or CI/CD pipeline?",
    options: [
      "Yes, it returns exit code 0 on successful rollback and cleans the workspace",
      "No, it requires an interactive TTY terminal",
      "Only on Jenkins",
      "Only if root privileges are enabled"
    ],
    answer: 0,
    explanation: "It is fully scriptable and standard in automated testing pipelines that test mergeability."
  },
  {
    id: 22,
    question: "What is the best way to safeguard against losing uncommitted experimental code before running a merge?",
    options: [
      "Run `git stash` before initiating the merge",
      "Email the code to yourself",
      "Take a screenshot of the code",
      "Paste the code into a Word document"
    ],
    answer: 0,
    explanation: "`git stash` safely stores dirty working tree state in Git's stash stack so you can merge onto a pristine tree."
  },
  {
    id: 23,
    question: "What happens to the reflog when you run `git merge --abort`?",
    options: [
      "HEAD was never updated, so HEAD's reflog remains pointing to the original commit",
      "The reflog is wiped",
      "Reflog records an ABORT entry",
      "Reflog is sent to GitHub"
    ],
    answer: 0,
    explanation: "Because HEAD never changed to a new commit SHA during an uncommitted conflict, HEAD remains at the same reflog pointer."
  },
  {
    id: 24,
    question: "If Debangshu accidentally merges `feature/v2` instead of `feature/v1`, what should he do before doing any edits?",
    options: [
      "Immediately run `git merge --abort` and then merge `feature/v1`",
      "Push broken code to main",
      "Delete all files in v2",
      "Rename feature/v2 to feature/v1"
    ],
    answer: 0,
    explanation: "Running `git merge --abort` immediately rolls back the mistake cleanly without side effects."
  },
  {
    id: 25,
    question: "What is the core philosophical rule regarding `git merge --abort` at Coder & AccoTax?",
    options: [
      "Aborting is not a failure—it is an intelligent pause button that ensures you only integrate code when 100% prepared and aligned",
      "Never abort because it looks unprofessional",
      "Aborting counts against your quarterly bonus",
      "Only the repository administrator can abort"
    ],
    answer: 0,
    explanation: "Sukanta Sir teaches that aborting is a professional tool to guarantee code quality and avoid rushed, buggy merges."
  }
];

export default questions;
