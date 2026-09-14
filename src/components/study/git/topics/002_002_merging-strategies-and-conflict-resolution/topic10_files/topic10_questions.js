// ==============================================================================
// TOPIC 10 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Squash Merging (git merge --squash)
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "What is the primary effect of running `git merge --squash feature`?",
    options: [
      "It deletes all files in the feature branch",
      "It combines all changes from the feature branch into a single set of staged changes on the current branch without immediately committing",
      "It pushes the branch to GitHub immediately",
      "It creates 10 separate merge commits"
    ],
    answer: 1,
    explanation: "`git merge --squash` pulls all modifications from the feature branch, applies them to the working tree and index, and leaves them staged ready for a single commit."
  },
  {
    id: 2,
    question: "How many parent commits does a commit resulting from `git merge --squash` have?",
    options: [
      "1 parent (the previous HEAD commit on the target branch)",
      "2 parents (both HEAD and the feature branch tip)",
      "3 parents",
      "0 parents (it is an orphan commit)"
    ],
    answer: 0,
    explanation: "Unlike a standard 3-way merge commit which has 2 parents, a squash commit has only 1 parent, preserving a strictly linear history."
  },
  {
    id: 3,
    question: "Does `git merge --squash` automatically create a commit in your repository?",
    options: [
      "Yes, immediately with a generic message",
      "No, it stages all modified files and stops, requiring you to execute `git commit` manually",
      "Only if run on GitHub.com",
      "Only if the branch has fewer than 3 commits"
    ],
    answer: 1,
    explanation: "`git merge --squash` intentionally stops with changes staged in the index so you can write a clean, atomic commit message."
  },
  {
    id: 4,
    question: "Where does Git store the collated list of individual commit messages from the feature branch during a squash merge?",
    options: [
      ".git/SQUASH_MSG",
      ".git/MERGE_HEAD",
      ".git/HISTORY_LOG",
      ".git/COMMIT_EDITMSG.old"
    ],
    answer: 0,
    explanation: "Git automatically generates `.git/SQUASH_MSG`, compiling the subjects and bodies of all squashed commits for reference."
  },
  {
    id: 5,
    question: "Why is squash merging widely adopted by enterprise engineering teams for Pull Requests / Merge Requests?",
    options: [
      "It reduces repository size by 99%",
      "It condenses dozens of intermediate 'WIP' and 'fix typo' micro-commits into a single clean, review-friendly atomic commit on `main`",
      "It prevents junior developers from making mistakes",
      "It removes the need for unit testing"
    ],
    answer: 1,
    explanation: "Squashing keeps the main production branch linear, readable, and free of noisy debugging micro-commits."
  },
  {
    id: 6,
    question: "What is the crucial golden rule to follow after squash-merging a feature branch?",
    options: [
      "Immediately delete the feature branch and do not continue developing on it",
      "Keep developing on the feature branch for 6 more months",
      "Never commit on main again",
      "Rebase main onto the feature branch"
    ],
    answer: 0,
    explanation: "Because Git does not record a parent link between the squash commit and the feature branch, continuing to work on that branch will lead to false conflicts on future merges."
  },
  {
    id: 7,
    question: "Why does continuing to work on a feature branch after a squash merge cause future merge conflicts?",
    options: [
      "Because Git forgets the user's password",
      "Because the common ancestor (merge base) did not advance, so Git sees all previous commits as new, conflicting changes on the next merge",
      "Because GitHub blocks branches after 1 squash",
      "Because branch names expire after 24 hours"
    ],
    answer: 1,
    explanation: "Without a merge commit parent, the merge base remains back at the original branching point, causing Git to re-evaluate already integrated lines."
  },
  {
    id: 8,
    question: "What is the difference between `git merge --squash` and interactive rebase `git rebase -i` squash?",
    options: [
      "`git merge --squash` creates a single commit on the target branch without altering the original feature branch commits; interactive rebase rewrites the history on the branch itself",
      "`git merge --squash` only works on Python repositories",
      "Interactive rebase cannot squash commits",
      "There is no difference"
    ],
    answer: 0,
    explanation: "Merge squash operates across branches at merge time; interactive rebase squashes and rewrites commit objects within a single branch history."
  },
  {
    id: 9,
    question: "Can a merge conflict occur during `git merge --squash`?",
    options: [
      "No, squash merges are immune to conflicts",
      "Yes, if the cumulative changes from the feature branch collide with concurrent changes on `main` since the merge base",
      "Only if the repository is hosted on GitLab",
      "Only if more than 50 files are changed"
    ],
    answer: 1,
    explanation: "Squash merges use standard 3-way diff reconciliation; if concurrent edits exist on the same lines, a conflict will occur."
  },
  {
    id: 10,
    question: "If a conflict occurs during `git merge --squash`, how do you abort it?",
    options: [
      "git merge --abort",
      "git cancel --squash",
      "git reset --hard HEAD",
      "Both A and C work depending on whether MERGE_HEAD was created (usually `git reset --hard HEAD` resets staged squash changes cleanly)"
    ],
    answer: 3,
    explanation: "Because `--squash` does not set `MERGE_HEAD`, running `git reset --hard HEAD` completely resets the staged squash changes."
  },
  {
    id: 11,
    question: "In Coder & AccoTax's invoice generator feature, Sachin made 4 WIP commits. How did Sukanta Sir squash them into main?",
    options: [
      "`git switch main && git merge --squash feature/invoice-generator && git commit -m 'feat(invoice): ...'`",
      "`git push origin --force`",
      "`git checkout feature/invoice-generator && git commit --amend`",
      "`git branch -m main invoice`"
    ],
    answer: 0,
    explanation: "Switching to main, running `git merge --squash`, and committing the staged changes cleanly consolidated all 4 commits."
  },
  {
    id: 12,
    question: "What does GitHub's 'Squash and merge' green button do under the hood?",
    options: [
      "Runs `git merge --no-ff`",
      "Executes the equivalent of `git merge --squash`, commits with the PR title/description, and points the commit to main with 1 parent",
      "Deletes the main branch",
      "Converts the PR into an issue"
    ],
    answer: 1,
    explanation: "GitHub's 'Squash and merge' button performs a server-side squash merge, creating a single clean commit on the target branch."
  },
  {
    id: 13,
    question: "Which git command deletes a local branch that was squash-merged (since Git won't consider it 'fully merged' due to missing parent link)?",
    options: [
      "git branch -d <branch>",
      "git branch -D <branch> (force delete flag)",
      "git delete-branch <branch>",
      "git rm --branch <branch>"
    ],
    answer: 1,
    explanation: "Because `--squash` doesn't create a merge commit DAG link, safe delete (`-d`) will warn that the branch isn't fully merged. Force delete (`-D`) is required."
  },
  {
    id: 14,
    question: "What is a key disadvantage of squash merging compared to standard merge?",
    options: [
      "You lose granular commit-by-commit historical timeline and author timestamps for intermediate development steps",
      "The repository becomes corrupted",
      "Commits take 10 times longer to push",
      "It requires a paid Git enterprise license"
    ],
    answer: 0,
    explanation: "Squashing trades micro-historical granularity for macro-level log clarity."
  },
  {
    id: 15,
    question: "When is preserving granular commits preferred over squash merging?",
    options: [
      "When individual commits represent independent, carefully crafted atomic architectural migrations or library upgrades with dedicated unit test proofs",
      "When all commits are titled 'WIP'",
      "When commits have spelling mistakes",
      "Never"
    ],
    answer: 0,
    explanation: "Well-structured multi-commit features (e.g. step 1: refactor, step 2: add feature, step 3: deprecate old API) benefit from preserving atomic commits via `--no-ff` or rebase."
  },
  {
    id: 16,
    question: "What does `git log --graph` look like after 5 consecutive squash merges on main?",
    options: [
      "A tangled spiderweb of merge knots",
      "A perfectly straight vertical linear line of single-parent commits",
      "A circular loop",
      "An empty screen"
    ],
    answer: 1,
    explanation: "Because each squash commit has exactly 1 parent, the graph remains a 100% clean, linear vertical train track."
  },
  {
    id: 17,
    question: "Can you edit individual files staged by `git merge --squash` before running `git commit`?",
    options: [
      "No, staged files are locked",
      "Yes, you have full freedom to add, edit, or remove files before committing the squashed change",
      "Only if you use Linux",
      "Only if the branch has 1 commit"
    ],
    answer: 1,
    explanation: "Because changes are staged in the index, you can run formatting, delete scratch files, or update configs prior to committing."
  },
  {
    id: 18,
    question: "Does `git merge --squash` modify any commits on the feature branch itself?",
    options: [
      "Yes, it wipes all commits on the feature branch",
      "No, the feature branch remains completely unchanged and unaltered in the repository object database",
      "It renames all feature branch commits to 'SQUASHED'",
      "It moves the feature branch pointer to main"
    ],
    answer: 1,
    explanation: "Like all merge commands, squash merge only affects the currently checked out branch (`HEAD`); the source feature branch is untouched."
  },
  {
    id: 19,
    question: "If Mahima wants to squash 10 commits but keep 2 distinct authors in the final log, can a single squash commit have two distinct author fields?",
    options: [
      "Yes, Git natively supports two `Author:` headers per commit",
      "No, a Git commit object strictly has one author; co-authors are credited using `Co-authored-by: Name <email>` trailers in the commit message body",
      "Only in Git 3.0",
      "Only on Bitbucket"
    ],
    answer: 1,
    explanation: "Git commit headers store exactly one author, but industry standard `Co-authored-by:` trailers in the commit message give attribution to collaborators."
  },
  {
    id: 20,
    question: "What command inspects the exact diff that will be committed after running `git merge --squash feature`?",
    options: [
      "git diff --staged (or git diff --cached)",
      "git log -p",
      "git status -v",
      "git show HEAD"
    ],
    answer: 0,
    explanation: "`git diff --staged` shows the full unified diff of all staged changes ready to be committed."
  },
  {
    id: 21,
    question: "What command checks the parent count of the latest commit on `main` to verify it was a squash commit?",
    options: [
      "git rev-list --parents -n 1 HEAD",
      "git verify --parents",
      "git branch --parent-check",
      "git log --parent-count"
    ],
    answer: 0,
    explanation: "`git rev-list --parents -n 1 HEAD` lists the commit hash followed by its parent hashes. Two tokens total means exactly 1 parent."
  },
  {
    id: 22,
    question: "Why should long-lived feature branches NEVER be integrated using squash merge if they plan to stay alive?",
    options: [
      "Because Git will automatically delete the repository",
      "Because lack of merge commit parentage breaks future merge base calculation, resulting in massive repeated conflicts on every subsequent merge",
      "Because squashing increases network latency",
      "Because GitHub forbids long-lived branches"
    ],
    answer: 1,
    explanation: "Long-lived branches must use standard merges or rebases so that the common ancestor advances with each integration."
  },
  {
    id: 23,
    question: "In Coder & AccoTax accounting software, when is squash merge the recommended strategy?",
    options: [
      "For small-to-medium feature branches and bugfixes that contain multiple experimental WIP commits created during local testing",
      "For annual release milestones",
      "For database schema migrations that need step-by-step audit logs",
      "Never"
    ],
    answer: 0,
    explanation: "Squashing is ideal for consolidating exploratory daily development work into clean, production-ready milestone commits."
  },
  {
    id: 24,
    question: "If Sachin runs `git merge --squash feature` and decides he doesn't want to commit it, how does he reset his working directory completely?",
    options: [
      "git reset --hard HEAD",
      "git delete all",
      "git clean -X",
      "git branch -D"
    ],
    answer: 0,
    explanation: "`git reset --hard HEAD` discards all staged and unstaged changes, returning the workspace to pristine HEAD state."
  },
  {
    id: 25,
    question: "What is Sukanta Sir's summary rule for squash merging?",
    options: [
      "Squash to tell a clean, professional story in the main log, but always delete the feature branch right after to avoid ghost conflicts",
      "Always squash every single commit in the entire repository into 1 commit",
      "Never squash because micro-commits are sacred",
      "Squashing is only for open-source contributors"
    ],
    answer: 0,
    explanation: "Sukanta Sir highlights that squash merges produce clean production storytelling, provided the feature branch is retired immediately after integration."
  }
];

export default questions;
