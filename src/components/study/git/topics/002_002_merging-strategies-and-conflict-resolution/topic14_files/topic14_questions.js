// ==============================================================================
// TOPIC 14 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Self-Assessment Quiz & Comprehensive Exam for Module 002_002
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "Under what exact topological condition can Git execute a Fast-Forward (FF) merge?",
    options: [
      "When both branches have made more than 10 commits",
      "When the current branch tip is a direct ancestor of the incoming branch tip (no divergence on current branch)",
      "When `--no-ff` is passed explicitly",
      "Only on GitHub Enterprise"
    ],
    answer: 1,
    explanation: "Fast-forward merges occur when there is a linear path from the current commit to the target branch tip, allowing pointer advancement without a merge commit."
  },
  {
    id: 2,
    question: "How many parent commit hashes are stored in the DAG header of a standard 3-way merge commit?",
    options: [
      "1 parent",
      "2 (or more) parents",
      "0 parents",
      "4 parents always"
    ],
    answer: 1,
    explanation: "A merge commit records multiple parent hashes in its commit object header, linking the divergent branch histories together."
  },
  {
    id: 3,
    question: "Which command identifies the common ancestor commit used by Git to perform a 3-way merge between two branches?",
    options: [
      "git merge-base branchA branchB",
      "git find-common branchA branchB",
      "git show-base branchA branchB",
      "git ancestor-check branchA branchB"
    ],
    answer: 0,
    explanation: "`git merge-base branchA branchB` computes and outputs the Lowest Common Ancestor (LCA) commit SHA."
  },
  {
    id: 4,
    question: "Why would an engineering team enforce `git merge --no-ff` for all feature branch integrations?",
    options: [
      "To prevent developers from pushing code",
      "To explicitly preserve the feature branch boundary and historical grouping in the git log, even if a fast-forward was topologically possible",
      "To make repository cloning faster",
      "To avoid having commit messages"
    ],
    answer: 1,
    explanation: "`--no-ff` guarantees an explicit merge commit is created, making it easy to revert entire features as a single unit and preserving branch topology."
  },
  {
    id: 5,
    question: "What is the primary technical cause of a Git merge conflict?",
    options: [
      "Concurrent modifications made to the exact same line range in the same file across divergent branches relative to their common merge base",
      "A bug in the C compiler",
      "Having more than 2 branches in a repository",
      "Branch names with spaces"
    ],
    answer: 0,
    explanation: "Conflicts occur when Git's automated 3-way diff reconciliation cannot safely decide between competing changes to the same lines."
  },
  {
    id: 6,
    question: "In standard conflict markers, what does the text between `<<<<<<< HEAD` and `=======` represent?",
    options: [
      "The local changes on the current active branch where the merge was triggered (Ours / Stage 2)",
      "The incoming changes from the other branch",
      "The common ancestor code",
      "Git configuration variables"
    ],
    answer: 0,
    explanation: "The upper section represents the state of the code in HEAD (your current local branch) before the merge."
  },
  {
    id: 7,
    question: "What does the line `=======` represent in conflict markers?",
    options: [
      "A mathematical equality test",
      "The boundary partition dividing local changes (above) from incoming changes (below)",
      "A comment ignored by JavaScript",
      "A fast-forward confirmation"
    ],
    answer: 1,
    explanation: "`=======` partitions the competing code blocks within the conflicted region."
  },
  {
    id: 8,
    question: "What does enabling `merge.conflictStyle = zdiff3` add to conflict markers?",
    options: [
      "A third section `||||||| base` showing the common ancestor code before divergence",
      "Zip file compression",
      "A live video stream",
      "Dark mode syntax highlighting"
    ],
    answer: 0,
    explanation: "`zdiff3` inserts a `||||||| base` section displaying the common ancestor version, providing vital context on why changes occurred."
  },
  {
    id: 9,
    question: "What are the 5 steps in the professional conflict resolution workflow?",
    options: [
      "1. git status &rarr; 2. git diff &rarr; 3. Edit & Test &rarr; 4. git add &rarr; 5. git commit",
      "1. Push &rarr; 2. Force &rarr; 3. Reset &rarr; 4. Reclone &rarr; 5. Pray",
      "1. Stash &rarr; 2. Pop &rarr; 3. Drop &rarr; 4. Clear &rarr; 5. Exit",
      "1. Checkout &rarr; 2. Branch &rarr; 3. Tag &rarr; 4. Log &rarr; 5. Push"
    ],
    answer: 0,
    explanation: "The 5-step lifecycle: Identify paths &rarr; Review diffs &rarr; Edit/clean & test &rarr; Stage resolutions &rarr; Finalize merge commit."
  },
  {
    id: 10,
    question: "What command immediately cancels an uncommitted in-progress merge conflict and restores the working directory to pristine pre-merge state?",
    options: [
      "git merge --abort",
      "git delete --all",
      "git reset --hard 0000",
      "git cancel"
    ],
    answer: 0,
    explanation: "`git merge --abort` dismantles `.git/MERGE_HEAD`, resets index stages, and restores working files."
  },
  {
    id: 11,
    question: "What is the key difference between `git merge --squash` and a standard merge commit?",
    options: [
      "A squash merge produces a single commit with 1 parent (linear), whereas a standard merge commit has 2 parents (DAG knot)",
      "A squash merge deletes the target branch",
      "A squash merge only works on Windows",
      "There is no difference"
    ],
    answer: 0,
    explanation: "Squashing combines all feature branch modifications into a single-parent commit on the target branch."
  },
  {
    id: 12,
    question: "Why MUST you delete a feature branch immediately after squash-merging it into main?",
    options: [
      "Because Git did not record a merge parent relationship, so continuing to work on that branch will cause repeated duplicate conflicts on future merges",
      "Because GitHub charges a fee for inactive branches",
      "Because Git locks branches after 1 merge",
      "To save RAM on the server"
    ],
    answer: 0,
    explanation: "Without a merge commit parent link, the merge base does not advance, causing Git to re-evaluate already integrated changes."
  },
  {
    id: 13,
    question: "What is the modern default merge strategy in Git 2.33+?",
    options: [
      "ort (Ostensibly Recursive's Twin)",
      "recursive",
      "octopus",
      "resolve"
    ],
    answer: 0,
    explanation: "Git 2.33 transitioned the default 3-way merge engine to `ort`, delivering 500x speedups and advanced rename detection."
  },
  {
    id: 14,
    question: "What is the difference between `-s ours` and `-X ours`?",
    options: [
      "`-s ours` discards 100% of incoming changes unconditionally; `-X ours` uses the ORT engine and only favors our version on conflicting lines while cleanly merging non-conflicting files",
      "`-s ours` only works for Python",
      "`-X ours` deletes all files",
      "They are identical aliases"
    ],
    answer: 0,
    explanation: "`-s ours` ignores the incoming branch completely. `-X ours` is a strategy option that auto-picks our version only during line conflicts."
  },
  {
    id: 15,
    question: "Which command launches configured visual 3-way merge editors (such as VS Code, Meld, or KDiff3)?",
    options: [
      "git mergetool",
      "git open-gui",
      "git visual-merge",
      "git diff-gui"
    ],
    answer: 0,
    explanation: "`git mergetool` invokes external GUI tools for resolving active unmerged conflicts."
  },
  {
    id: 16,
    question: "What does `git diff --check` verify?",
    options: [
      "That no leftover conflict markers (`<<<<<<<`) or whitespace errors exist in staged files",
      "That the Wi-Fi connection is active",
      "That all passwords are encrypted",
      "That the branch is pushed to GitHub"
    ],
    answer: 0,
    explanation: "`git diff --check` scans for accidental leftover delimiter markers and whitespace problems before committing."
  },
  {
    id: 17,
    question: "What are the four variables passed to `git mergetool`?",
    options: [
      "$LOCAL, $REMOTE, $BASE, and $MERGED",
      "$HEAD, $TAIL, $TOP, and $BOTTOM",
      "$USER, $PASS, $HOST, and $PORT",
      "$REPO, $COMMIT, $TREE, and $BLOB"
    ],
    answer: 0,
    explanation: "Git passes `$LOCAL` (ours), `$REMOTE` (theirs), `$BASE` (ancestor), and `$MERGED` (output destination)."
  },
  {
    id: 18,
    question: "Which index stages are active during an unresolved merge conflict?",
    options: [
      "Stage 1 (Base), Stage 2 (Ours/HEAD), and Stage 3 (Theirs/Incoming)",
      "Only Stage 0",
      "Stage 4 and Stage 5",
      "Stage Alpha and Stage Beta"
    ],
    answer: 0,
    explanation: "In an unmerged state, Git stores Stage 1 (Merge Base), Stage 2 (Local HEAD), and Stage 3 (Incoming) in the index."
  },
  {
    id: 19,
    question: "How do you inspect the Stage 3 version of `tax.js` directly from the terminal?",
    options: [
      "git show :3:tax.js",
      "git cat remote:tax.js",
      "git show incoming/tax.js",
      "git read-stage 3 tax.js"
    ],
    answer: 0,
    explanation: "`git show :3:<path>` retrieves the Stage 3 blob content from the index."
  },
  {
    id: 20,
    question: "In Coder & AccoTax lab, when Sachin and Susmita conflicted in `AuthController.js`, what was the correct resolution?",
    options: [
      "Synthesizing both requirements: validating MFA OTP first, then issuing a stateless JWT token upon success",
      "Deleting authentication completely",
      "Choosing Sachin's version and firing Susmita",
      "Hardcoding false"
    ],
    answer: 0,
    explanation: "Synthesizing both requirements into a 2-step verification engine achieved both security and performance goals."
  },
  {
    id: 21,
    question: "What strategy option ignores whitespace differences when merging?",
    options: [
      "-X ignore-all-space (or -X ignore-space-change)",
      "-s no-whitespace",
      "--strip-spaces",
      "-X tabs-to-spaces"
    ],
    answer: 0,
    explanation: "`-X ignore-all-space` prevents code formatting differences from triggering false merge conflicts."
  },
  {
    id: 22,
    question: "What does `git rev-list --parents -n 1 HEAD` output for a standard merge commit?",
    options: [
      "Three SHA tokens total: the merge commit SHA followed by its 2 parent commit SHAs",
      "Only 1 SHA token",
      "An error",
      "All branch names"
    ],
    answer: 0,
    explanation: "Listing parents for a 2-parent merge commit prints the commit hash and both parent commit hashes."
  },
  {
    id: 23,
    question: "What happens if a conflict occurs in a binary image file `logo.png`?",
    options: [
      "Git treats it as binary and requires choosing `--ours` or `--theirs` via `git checkout --ours/--theirs -- logo.png` followed by `git add`",
      "Git inserts text markers into the image pixels",
      "Git converts the image into an SVG",
      "Git crashes"
    ],
    answer: 0,
    explanation: "Git cannot inject text markers into binaries; developers use `git checkout --ours/--theirs` to choose the desired version."
  },
  {
    id: 24,
    question: "What setting prevents Git from generating `*.orig` backup files during visual merge tool operations?",
    options: [
      "git config --global mergetool.keepBackup false",
      "git config --global backup.disable true",
      "git no-orig",
      "git clean --always"
    ],
    answer: 0,
    explanation: "Setting `mergetool.keepBackup false` stops Git from leaving `.orig` backup files in your working tree."
  },
  {
    id: 25,
    question: "What does the `octopus` merge strategy do?",
    options: [
      "Merges 3 or more branches simultaneously in a single merge commit (used when all branches integrate cleanly)",
      "Deletes 8 commits",
      "Creates 8 branches",
      "Is deprecated"
    ],
    answer: 0,
    explanation: "Octopus merge merges more than 2 branches at once into a single commit with 3+ parent hashes."
  },
  {
    id: 26,
    question: "If `git commit` is run while files are still unmerged, what does Git do?",
    options: [
      "Blocks the commit with a fatal error: unmerged files exist",
      "Commits anyway",
      "Deletes the files",
      "Pushes to GitHub"
    ],
    answer: 0,
    explanation: "Git guards against committing unmerged states and requires staging or removing all unmerged paths first."
  },
  {
    id: 27,
    question: "What is the role of `.git/MERGE_HEAD`?",
    options: [
      "It records the commit SHA of the incoming branch being merged until the merge is completed or aborted",
      "It stores the user's password",
      "It contains the full project source code",
      "It stores Git tags"
    ],
    answer: 0,
    explanation: "`.git/MERGE_HEAD` acts as the active merge lock and stores the incoming parent's commit hash."
  },
  {
    id: 28,
    question: "How does `git merge --no-commit feature` help during complex integrations?",
    options: [
      "It performs the merge and stages changes, allowing testing and inspection before the commit is finalized",
      "It deletes the commit history",
      "It prevents future commits",
      "It skips merge base calculation"
    ],
    answer: 0,
    explanation: "`--no-commit` pauses after automatic 3-way resolution so developers can test the working tree before creating the commit."
  },
  {
    id: 29,
    question: "What is the next module in the Git & GitHub Master Curriculum after Module 002_002?",
    options: [
      "002_003_rebasing-vs-merging-and-interactive-rebase (Git Rebase & Linearization)",
      "001_001 Introduction",
      "004_001 GitHub Actions",
      "005_001 Security"
    ],
    answer: 0,
    explanation: "Module 002_003 covers Git Rebase mechanics, the Golden Rule of Rebasing, and interactive rebase mastery."
  },
  {
    id: 30,
    question: "What is the core philosophical message taught by Sukanta Sir across Module 002_002?",
    options: [
      "Merge conflicts are not errors to fear, but protective checkpoints that empower developers to communicate and build superior synthesized software together",
      "Never create branches",
      "Always commit directly to main",
      "Use Git only for solo projects"
    ],
    answer: 0,
    explanation: "Sukanta Sir emphasizes that merging and conflict resolution are collaborative superpowers at the heart of modern software engineering."
  }
];

export default questions;
