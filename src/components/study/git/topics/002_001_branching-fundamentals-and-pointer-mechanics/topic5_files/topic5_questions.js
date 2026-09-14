/**
 * Topic 5: Creating and Switching in One Step: git switch -c and git checkout -b
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What does the `-c` flag stand for in `git switch -c <branch-name>`?",
    answer: "The `-c` flag stands for `--create`. It creates a new branch pointer and immediately switches HEAD to it in a single atomic step."
  },
  {
    id: 2,
    question: "What was the traditional legacy command used before Git 2.23 for one-step creation and switching?",
    answer: "`git checkout -b <branch-name>` (where `-b` meant create new branch and checkout)."
  },
  {
    id: 3,
    question: "What physical files are created or modified when running `git switch -c feature-gst`?",
    answer: "Git creates the new 41-byte pointer file `.git/refs/heads/feature-gst` with the current commit SHA, and updates `.git/HEAD` with `ref: refs/heads/feature-gst`."
  },
  {
    id: 4,
    question: "What happens if you run `git switch -c <name>` with a branch name that already exists?",
    answer: "Git aborts with `fatal: a branch named '<name>' already exists` to prevent accidental overwriting."
  },
  {
    id: 5,
    question: "How can you force create or reset an existing branch and switch to it in one step?",
    answer: "Use uppercase `-C`: `git switch -C <branch-name>` (equivalent to legacy `git checkout -B <branch-name>`)."
  },
  {
    id: 6,
    question: "How can you create and switch to a new branch starting from a specific historical commit SHA?",
    answer: "Pass the starting commit SHA as the second argument: `git switch -c <branch-name> <commit-sha>` (e.g. `git switch -c hotfix-v1 7a8b9c0`)."
  },
  {
    id: 7,
    question: "How can you create and switch to a new branch starting from a release tag?",
    answer: "`git switch -c release-patch v1.4.0`."
  },
  {
    id: 8,
    question: "What does `git switch --orphan <branch-name>` do?",
    answer: "It creates a brand-new branch with an empty root commit state (no parents and no previous commit history), commonly used for documentation branches like `gh-pages`."
  },
  {
    id: 9,
    question: "How does `git switch -c` handle dirty uncommitted changes in your workspace?",
    answer: "Because you are branching from the exact same commit you are currently standing on, Git carries over all your uncommitted files into the new branch smoothly without any conflicts."
  },
  {
    id: 10,
    question: "What is the recommended workflow if you started modifying code on `main` by mistake and want to move those edits to a new feature branch?",
    answer: "Simply run `git switch -c feature-my-work`. Your unstaged/staged edits cleanly transfer to the new branch where you can commit them safely."
  },
  {
    id: 11,
    question: "What is the equivalent long-form flag for `-c` in `git switch`?",
    answer: "`git switch --create <branch-name>`."
  },
  {
    id: 12,
    question: "What is the equivalent long-form flag for `-C` in `git switch`?",
    answer: "`git switch --force-create <branch-name>`."
  },
  {
    id: 13,
    question: "Can you create a new branch from a remote branch and track it in one step?",
    answer: "Yes: `git switch -c <local-branch> --track <remote>/<remote-branch>`."
  },
  {
    id: 14,
    question: "What happens if you run `git switch -c` in an empty repository before any commits exist?",
    answer: "It creates an unborn branch by setting `.git/HEAD` to `ref: refs/heads/<branch-name>`, which will be created upon the first commit."
  },
  {
    id: 15,
    question: "Why is `git switch -c` considered superior to running `git branch <name>` followed by `git switch <name>`?",
    answer: "It reduces keystrokes, prevents the common human error of forgetting to switch after creating the branch, and ensures atomic operation in automation scripts."
  },
  {
    id: 16,
    question: "How does Git's reflog record a `git switch -c feature-x` command?",
    answer: "The branch's reflog is initialized with `branch: Created from HEAD`, and HEAD's reflog records `checkout: moving from <old-branch> to <new-branch>`."
  },
  {
    id: 17,
    question: "Can you specify a 3-part slash hierarchy in `git switch -c` (e.g. `git switch -c team/user/feature`)?",
    answer: "Yes. Git will automatically create the subfolder hierarchy `.git/refs/heads/team/user/feature`."
  },
  {
    id: 18,
    question: "What happens if you run `git switch -C main` while standing on `feature`?",
    answer: "Git resets the `main` branch pointer to match the commit of `feature` and switches your HEAD to `main`. Use with caution as old commits unique to `main` could become dangling."
  },
  {
    id: 19,
    question: "Is there any performance difference between `git switch -c` and `git checkout -b`?",
    answer: "No. Both commands execute in under 5 milliseconds because they perform the identical filesystem operations."
  },
  {
    id: 20,
    question: "What happens to the staging index (staged files) during `git switch -c`?",
    answer: "All staged files remain staged in the index and move seamlessly with you to the new branch."
  },
  {
    id: 21,
    question: "How do modern IDEs (like VS Code, WebStorm, and Cursor) implement the 'New Branch' UI button?",
    answer: "Under the hood, they invoke `git switch -c <branch-name>` (or `git checkout -b <branch-name>`)."
  },
  {
    id: 22,
    question: "Can `git switch -c` be used to create a branch from a stash entry?",
    answer: "To create a branch directly from a stash, use `git stash branch <branch-name>`, which creates the branch and pops the stash automatically."
  },
  {
    id: 23,
    question: "What error occurs if the branch name contains invalid characters in `git switch -c`?",
    answer: "`fatal: '<invalid-name>' is not a valid branch name.`"
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain `git switch -c` to Debangshu Poddar at Barrackpore?",
    answer: "He explained that instead of writing a Post-it label, sticking it on the ledger, and then reaching over to move your pen, `git switch -c` writes the label, sticks it on the page, and places your pen right onto the new section in one fluid movement."
  },
  {
    id: 25,
    question: "What is the return message from Git when executing `git switch -c feature/epf-calc`?",
    answer: "`Switched to a new branch 'feature/epf-calc'`."
  }
];

export default questions;
