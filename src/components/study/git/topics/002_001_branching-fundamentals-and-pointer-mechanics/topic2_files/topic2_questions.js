/**
 * Topic 2: The Role of HEAD: Understanding HEAD as a symbolic reference (.git/HEAD)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What is HEAD in Git at a conceptual level?",
    answer: "HEAD is Git's special pointer that indicates the currently checked-out branch, commit, and working directory state in your repository. It answers the fundamental question: 'Where am I right now?'"
  },
  {
    id: 2,
    question: "Where is the HEAD reference stored physically on the file system?",
    answer: "HEAD is stored as a plain text file at `.git/HEAD` inside the repository root."
  },
  {
    id: 3,
    question: "What is a 'symbolic reference' (symref) in Git?",
    answer: "A symbolic reference is a pointer that does not point directly to an object SHA-1 hash, but rather points to another reference path (such as `refs/heads/main`). Git resolves the second reference to determine the actual commit."
  },
  {
    id: 4,
    question: "What does `.git/HEAD` contain when you are on a normal branch called 'main'?",
    answer: "It contains the single line: `ref: refs/heads/main` followed by a newline character."
  },
  {
    id: 5,
    question: "What command can programmatically print the symbolic reference pointed to by HEAD?",
    answer: "`git symbolic-ref HEAD` outputs the exact reference string, such as `refs/heads/main`."
  },
  {
    id: 6,
    question: "What plumbing command resolves HEAD to its underlying 40-character commit SHA-1 hash?",
    answer: "`git rev-parse HEAD` returns the full 40-character hexadecimal commit hash that HEAD currently resolves to."
  },
  {
    id: 7,
    question: "What happens to `.git/HEAD` when you switch branches using `git switch feature-gst`?",
    answer: "Git overwrites the text inside `.git/HEAD` to `ref: refs/heads/feature-gst` and updates your working directory and staging index to match the commit pointed to by that branch."
  },
  {
    id: 8,
    question: "How does HEAD participate when you create a new commit with `git commit`?",
    answer: "Git reads `.git/HEAD` to find the active branch ref (e.g. `refs/heads/main`), sets the new commit's parent to the branch's current SHA, creates the new commit, and updates `refs/heads/main` to point to the new commit SHA. HEAD itself remains pointing to `refs/heads/main`."
  },
  {
    id: 9,
    question: "What is the difference between an 'attached HEAD' and a 'detached HEAD'?",
    answer: "In an 'attached HEAD' state, `.git/HEAD` points symbolically to a branch name (`ref: refs/heads/...`). In a 'detached HEAD' state, `.git/HEAD` contains a raw 40-character commit SHA hash directly, meaning you are not on any branch."
  },
  {
    id: 10,
    question: "What is an 'unborn branch' (or orphaned HEAD) in a freshly initialized Git repository?",
    answer: "When you run `git init`, `.git/HEAD` points to `refs/heads/main`, but the file `refs/heads/main` does not exist yet because no commit has been made. HEAD is pointing to an unborn branch until the first commit creates `refs/heads/main`."
  },
  {
    id: 11,
    question: "Can `git symbolic-ref HEAD` be run when HEAD is in a detached state?",
    answer: "No. If HEAD is detached, `git symbolic-ref HEAD` errors out with `fatal: ref HEAD is not a symbolic ref`."
  },
  {
    id: 12,
    question: "What does the caret syntax `HEAD^` or `HEAD~1` represent in Git?",
    answer: "`HEAD^` (or `HEAD~1`) refers to the immediate first parent commit of the commit currently pointed to by HEAD."
  },
  {
    id: 13,
    question: "What is the difference between `HEAD~2` and `HEAD^^`?",
    answer: "Both `HEAD~2` and `HEAD^^` refer to the grandparent commit (2 commits back in the first-parent ancestry chain)."
  },
  {
    id: 14,
    question: "What is the difference between `HEAD^1` and `HEAD^2` on a merge commit?",
    answer: "`HEAD^1` refers to the first parent of the merge commit (the branch you were on when merging), while `HEAD^2` refers to the second parent (the branch that was merged in)."
  },
  {
    id: 15,
    question: "Why should developers avoid manually editing `.git/HEAD` with a text editor?",
    answer: "Manual edits bypass Git's internal safety locks, reflogs, and index synchronization, which can lead to repository corruption or unexpected index mismatches."
  },
  {
    id: 16,
    question: "What is the @ shortcut in modern Git command syntax?",
    answer: "`@` is a built-in alias for `HEAD`. For instance, `git show @` is identical to `git show HEAD`, and `@{-1}` refers to the previously checked-out branch."
  },
  {
    id: 17,
    question: "What does `@{-1}` represent in `git switch @{-1}` or `git checkout -`?",
    answer: "`@{-1}` represents the branch that was checked out immediately prior to the current branch, allowing you to toggle quickly between two branches."
  },
  {
    id: 18,
    question: "How does `git log` use HEAD when no arguments are provided?",
    answer: "When run without arguments, `git log` starts at the commit currently pointed to by HEAD and traverses backwards through parent commit pointers to the root commit."
  },
  {
    id: 19,
    question: "How does `git diff` with no arguments interact with HEAD?",
    answer: "`git diff` compares your Working Directory changes against the Staging Index, while `git diff HEAD` compares your Working Directory directly against the commit pointed to by HEAD."
  },
  {
    id: 20,
    question: "How does `git reset` affect HEAD?",
    answer: "`git reset <commit>` moves the branch pointer that HEAD currently points to backwards or forwards to the specified commit (or changes HEAD directly if detached)."
  },
  {
    id: 21,
    question: "How does `git checkout <commit>` differ from `git reset <commit>` regarding HEAD?",
    answer: "`git checkout <commit>` moves HEAD itself to point to that commit (entering detached HEAD state), leaving the original branch pointer untouched. In contrast, `git reset <commit>` moves the current branch pointer along with HEAD."
  },
  {
    id: 22,
    question: "In what file does Git log historical movements of the HEAD pointer?",
    answer: "Git logs every movement of HEAD in `.git/logs/HEAD`, which can be inspected using `git reflog`."
  },
  {
    id: 23,
    question: "In a multi-worktree repository (`git worktree`), does each worktree have its own HEAD?",
    answer: "Yes! Each linked worktree has its own dedicated `.git/worktrees/<name>/HEAD` file pointing to its own active branch."
  },
  {
    id: 24,
    question: "Can two local branches be checked out to HEAD simultaneously in the same single working tree?",
    answer: "No. A single working tree directory can only have one active HEAD pointer at any one time."
  },
  {
    id: 25,
    question: "What happens if `.git/HEAD` is deleted or corrupted?",
    answer: "Git will fail with `fatal: not a git repository (or any of the parent directories): .git` or `fatal: bad default revision 'HEAD'`. It can be restored by recreating `.git/HEAD` with `ref: refs/heads/main`."
  },
  {
    id: 26,
    question: "How did Sukanta Hui explain HEAD to Sachin and Mahima at AccoTax Barrackpore?",
    answer: "He explained HEAD as the magnetic read/write head of an old cassette player or the 'You Are Here' red pin on an interactive mall map."
  }
];

export default questions;
