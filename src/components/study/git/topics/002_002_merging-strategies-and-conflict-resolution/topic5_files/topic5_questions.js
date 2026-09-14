// ==============================================================================
// TOPIC 5 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: What Causes Merge Conflicts? Concurrent modifications across divergent branches
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "What is the core technical cause of a Git merge conflict?",
    options: [
      "A bug in Git's internal C source code parsing engine",
      "Concurrent modifications made to the exact same line(s) in the same file across divergent branches since their common merge base",
      "Having more than 3 developers working on the same branch at the same time",
      "Branch names exceeding 255 characters in the repository"
    ],
    answer: 1,
    explanation: "A merge conflict occurs when Git's automated 3-way merge algorithm encounters divergent changes to the same line range from a common ancestor commit and cannot safely determine author intent."
  },
  {
    id: 2,
    question: "If Sachin changes line 10 in fileA.js and Susmita changes line 95 in fileA.js on a divergent branch, what does Git do?",
    options: [
      "Git triggers a fatal merge conflict and deletes fileA.js",
      "Git cleanly and automatically merges both changes without conflict",
      "Git asks Sachin to manually approve line 95 in the terminal",
      "Git creates a corrupted merge state"
    ],
    answer: 1,
    explanation: "Because the modifications are on distant, non-overlapping line ranges, Git's 3-way merge algorithm automatically integrates both modifications cleanly."
  },
  {
    id: 3,
    question: "What happens if Branch A modifies 'taxCalculator.js' and Branch B deletes 'taxCalculator.js'?",
    options: [
      "Git silently deletes the file without informing the user",
      "Git triggers a 'modify/delete conflict' because it cannot decide whether to preserve the edits or respect the deletion",
      "Git automatically keeps the file and discards the deletion",
      "Git fast-forwards automatically"
    ],
    answer: 1,
    explanation: "A modify/delete conflict occurs when one branch edits a file while another branch deletes it. Git stops and requires human confirmation."
  },
  {
    id: 4,
    question: "What role does the common ancestor (Merge Base) play in conflict detection?",
    options: [
      "No role; Git only compares HEAD and the branch tip",
      "It serves as the baseline comparison point (O) to determine which branch actually altered specific lines (A vs O and B vs O)",
      "It stores the developer's email address and password",
      "It locks the branch against future commits"
    ],
    answer: 1,
    explanation: "In a 3-way merge, Git compares Base (O) with HEAD (A) and Base (O) with Incoming (B). If both A and B changed line X differently from O, a conflict is detected."
  },
  {
    id: 5,
    question: "If both Sachin and Susmita made the exact same identical change to line 20 (changing ₹500 to ₹1000), what does Git do upon merging?",
    options: [
      "Triggers a severe merge conflict",
      "Merges cleanly because both branches resolved to the identical final state (A == B)",
      "Duplicates line 20 twice in the final file",
      "Aborts the repository"
    ],
    answer: 1,
    explanation: "When both divergent branches make the exact same change relative to the base (O != A, O != B, but A == B), Git cleanly incorporates the change with zero conflicts."
  },
  {
    id: 6,
    question: "When Git halts due to a merge conflict, what state is the repository left in?",
    options: [
      "Corrupted and unrecoverable",
      "A paused, safe merge state where unmerged files are populated with conflict markers in the working tree and index stages 1, 2, and 3",
      "Reverted to the initial commit",
      "Locked by a system daemon"
    ],
    answer: 1,
    explanation: "The repository remains completely safe. Git sets stage 1 (Base), stage 2 (HEAD/Ours), and stage 3 (Incoming/Theirs) in the index, allowing manual resolution or safe aborting."
  },
  {
    id: 7,
    question: "Which command shows files currently in an unmerged / conflicting state?",
    options: [
      "git status",
      "git branch -D",
      "git push origin --force",
      "git tag -l"
    ],
    answer: 0,
    explanation: "Running `git status` clearly highlights 'Unmerged paths' and shows files with 'both modified', 'both added', or 'deleted by them/us'."
  },
  {
    id: 8,
    question: "What command can you execute to immediately and safely cancel an active merge conflict and restore the working tree to pristine pre-merge state?",
    options: [
      "git merge --abort",
      "git delete --force",
      "git reset --hard 000000",
      "git checkout -b clean"
    ],
    answer: 0,
    explanation: "`git merge --abort` safely unwinds the in-progress merge, restores modified files, and returns HEAD to its pre-merge commit state."
  },
  {
    id: 9,
    question: "Which index stage corresponds to the common ancestor (Merge Base) in `git ls-files -u`?",
    options: [
      "Stage 0",
      "Stage 1",
      "Stage 2",
      "Stage 3"
    ],
    answer: 1,
    explanation: "In Git's index during an unmerged state, Stage 1 is the Merge Base, Stage 2 is 'our' branch (HEAD), and Stage 3 is 'their' branch (the branch being merged in)."
  },
  {
    id: 10,
    question: "What does Stage 2 represent in `git ls-files -u`?",
    options: [
      "The incoming feature branch",
      "The current active branch (HEAD / 'ours')",
      "The stash buffer",
      "The remote tracking branch origin/main"
    ],
    answer: 1,
    explanation: "Stage 2 represents the version of the file from the current branch (HEAD, also known as 'ours')."
  },
  {
    id: 11,
    question: "What does Stage 3 represent in `git ls-files -u`?",
    options: [
      "The incoming branch (the branch being integrated / 'theirs')",
      "The common ancestor",
      "The temporary commit",
      "The staged index commit"
    ],
    answer: 0,
    explanation: "Stage 3 represents the version of the file coming from the branch being merged into HEAD ('theirs')."
  },
  {
    id: 12,
    question: "If Swadeep creates a new file `invoice.js` on `featureA` and Mahima creates `invoice.js` with different contents on `featureB`, what happens when merging?",
    options: [
      "Git silently overwrites one of the files",
      "Git triggers an 'add/add conflict' (both added) because both branches introduced the same path with differing blob hashes",
      "Git renames one file to invoice_1.js automatically",
      "Git fast-forwards"
    ],
    answer: 1,
    explanation: "An add/add conflict occurs when both branches create a file with the same path name but different contents from a base where the file did not exist."
  },
  {
    id: 13,
    question: "Why should developers avoid committing files containing unresolved conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)?",
    options: [
      "Git will automatically format the computer's hard drive",
      "These markers are raw text strings that will cause syntax errors, break production builds, or corrupt application logic",
      "GitHub blocks all repositories that contain greater-than symbols",
      "It changes the branch name to master"
    ],
    answer: 1,
    explanation: "Conflict markers are plain text injected into your code files. If staged and committed, they will cause runtime crashes and syntax errors in production."
  },
  {
    id: 14,
    question: "How can regular communication and frequent branch integration minimize merge conflicts in a team?",
    options: [
      "By keeping feature branches short-lived and frequently pulling updates from main",
      "By having only one developer work on the entire repository per month",
      "By disabling Git merge checking",
      "By using only single-line commits"
    ],
    answer: 0,
    explanation: "Short-lived branches and frequent rebasing/merging from main keep the divergence gap minimal, dramatically reducing the likelihood and severity of merge conflicts."
  },
  {
    id: 15,
    question: "What is a 'rename/rename conflict' in Git?",
    options: [
      "When a branch is renamed twice in 10 seconds",
      "When Branch A renames file.js to fileAlpha.js and Branch B renames file.js to fileBeta.js",
      "When two files have the same author",
      "When a commit message is edited using --amend"
    ],
    answer: 1,
    explanation: "A rename/rename conflict happens when two divergent branches rename the same original file into two different destination filenames."
  },
  {
    id: 16,
    question: "True or False: Merge conflicts only happen when using Git CLI, not in GUI clients like VS Code or GitKraken.",
    options: [
      "True: GUIs bypass Git's 3-way merge algorithm",
      "False: Merge conflicts are algorithmic realities determined by Git; GUIs simply provide visual interfaces to resolve them",
      "True: GUIs automatically guess developer intent",
      "False: GUIs always abort automatically"
    ],
    answer: 1,
    explanation: "Merge conflicts stem from divergent line changes in the Git object graph. GUIs use the exact same Git merge mechanics."
  },
  {
    id: 17,
    question: "In Coder & AccoTax's billing app, if Sachin edits the tax formula in lines 40-45 and Tuhina edits user authentication in lines 200-215 of the same file, will Git conflict?",
    options: [
      "Yes, any edit to the same file always conflicts",
      "No, Git easily reconciles disparate line blocks within the same file",
      "Only if they work on the same laptop",
      "Only if they use Windows OS"
    ],
    answer: 1,
    explanation: "Git's 3-way diff algorithm handles non-overlapping line ranges within the same file cleanly without manual conflict resolution."
  },
  {
    id: 18,
    question: "What setting can be configured in Git to remember how you previously resolved a conflict so it can auto-resolve it next time?",
    options: [
      "git config --global rerere.enabled true",
      "git config --global auto.fix true",
      "git config --global magic.merge true",
      "git config --global skip.conflicts true"
    ],
    answer: 0,
    explanation: "Git's `rerere` (Reuse Recorded Resolution) feature records how you resolve conflict chunks and automatically applies identical resolutions in future merges or rebases."
  },
  {
    id: 19,
    question: "Which of the following is NOT a cause of Git merge conflicts?",
    options: [
      "Simultaneous modification of the exact same line in two branches",
      "One branch modifying a file while another deletes it",
      "Two branches creating identical files in different new directories with different names",
      "Two branches renaming the same file to two different names"
    ],
    answer: 2,
    explanation: "Creating distinct files in different directories introduces no name or line collisions, so Git merges them completely cleanly."
  },
  {
    id: 20,
    question: "Why does Git never automatically 'guess' which version to pick when two developers change the same line?",
    options: [
      "Because Git lacks an internet connection to ask GitHub",
      "Because guessing could introduce catastrophic business logic bugs (e.g., picking wrong tax rate or currency amount)",
      "Because Git is single-threaded",
      "Because Linus Torvalds prohibited automation"
    ],
    answer: 1,
    explanation: "Data integrity and safety are paramount in Git. Arbitrary guessing could cause financial errors (e.g., GST ₹5000 vs ₹8080) or security vulnerabilities."
  },
  {
    id: 21,
    question: "What is the role of context lines in 3-way diff chunk matching?",
    options: [
      "Context lines (usually 3 lines above and below) help Git pinpoint where changes occurred relative to the base file",
      "Context lines are used to store author email metadata",
      "Context lines are discarded during commits",
      "Context lines count toward the repository billing quota"
    ],
    answer: 0,
    explanation: "Diff algorithms use surrounding context lines to ensure changes are applied to the exact intended position within the target file."
  },
  {
    id: 22,
    question: "What does `git diff --check` do when run before a commit?",
    options: [
      "Checks if the remote branch is online",
      "Warns if changes introduce whitespace errors or leftover conflict markers",
      "Deletes all modified files",
      "Pushes code to GitHub staging"
    ],
    answer: 1,
    explanation: "`git diff --check` inspects staged changes and warns about trailing whitespace and accidental leftover conflict markers."
  },
  {
    id: 23,
    question: "If Sachin runs `git checkout -b feature` from main, makes 5 commits, while main receives 0 commits, what happens when merging feature into main?",
    options: [
      "A guaranteed merge conflict",
      "A fast-forward merge with zero chance of conflict",
      "An ORT recursive conflict",
      "A detached HEAD state"
    ],
    answer: 1,
    explanation: "Because `main` has not diverged (it is an ancestor of `feature`), Git fast-forwards the pointer with 0% chance of a merge conflict."
  },
  {
    id: 24,
    question: "What command lists only files that have unresolved conflicts after a failed merge attempt?",
    options: [
      "git diff --name-only --diff-filter=U",
      "git branch --conflicts",
      "git log --conflicts-only",
      "git show --unmerged"
    ],
    answer: 0,
    explanation: "`git diff --name-only --diff-filter=U` lists all unmerged (conflicted) files concisely in the terminal."
  },
  {
    id: 25,
    question: "In the Coder & AccoTax lab, what is Sukanta Sir's golden rule regarding merge conflicts?",
    options: [
      "Never branch from main",
      "Conflicts are not errors to fear, but safe checkpoints where developers communicate to unite code cleanly",
      "Always delete the file that has conflicts and rewrite it from scratch",
      "Force push with --force to overwrite your teammate's code"
    ],
    answer: 1,
    explanation: "Sukanta Sir teaches that conflicts are safety mechanisms designed to preserve team code integrity and foster collaboration."
  }
];

export default questions;
