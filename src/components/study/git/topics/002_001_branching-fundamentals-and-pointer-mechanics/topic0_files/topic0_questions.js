/**
 * Topic 0 FAQ Assessment Questions:
 * "What is a Branch in Git? Demystifying branches as lightweight 41-byte text pointers containing SHA-1 commit hashes"
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "branch-t0-q1",
    "question": "What is a Git branch at the physical filesystem level inside the `.git` directory?",
    "shortAnswer": "A simple 41-byte text file inside `.git/refs/heads/` containing a 40-character SHA-1 commit hash followed by a newline character.",
    "options": [
      "A lightweight 41-byte text file in `.git/refs/heads/` containing a 40-character commit SHA hash",
      "A complete duplicate copy of all files in the project stored in a separate directory",
      "A binary database index with encrypted file snapshots",
      "A cloud link stored on GitHub servers"
    ],
    "answer": "A lightweight 41-byte text file in `.git/refs/heads/` containing a 40-character commit SHA hash",
    "explanation": "Unlike legacy VCS systems that copy whole directories, Git branches are merely 41-byte pointers to commit objects in the DAG.",
    "hint": "Think about the tiny 41-byte file in .git/refs/heads/.",
    "level": "basic",
    "codeExample": "cat .git/refs/heads/main\n# 7a8b9c0d1e2f3456789abcdef0123456789abcde"
  },
  {
    "id": "branch-t0-q2",
    "question": "Where are local branch pointer files stored within the repository?",
    "shortAnswer": "`.git/refs/heads/`",
    "options": [
      "`.git/refs/heads/`",
      "`.git/branches/`",
      "`.git/objects/heads/`",
      "`.git/config/branches/`"
    ],
    "answer": "`.git/refs/heads/`",
    "explanation": "Local branch references reside in `.git/refs/heads/` (e.g. `.git/refs/heads/main` or `.git/refs/heads/feature-login`).",
    "hint": "Heads are stored in refs/heads/.",
    "level": "basic",
    "codeExample": "ls -la .git/refs/heads/"
  },
  {
    "id": "branch-t0-q3",
    "question": "What is the computational and storage cost of creating a new branch in Git?",
    "shortAnswer": "Virtually zero cost: it takes ~1 millisecond and consumes exactly 41 bytes of disk space.",
    "options": [
      "Virtually zero: it creates a 41-byte text file in ~1 millisecond without copying any project files",
      "It requires duplicate storage equal to the size of the entire project repository",
      "It takes 1 minute and requires an active internet connection",
      "It consumes 100MB of RAM per branch"
    ],
    "answer": "Virtually zero: it creates a 41-byte text file in ~1 millisecond without copying any project files",
    "explanation": "Because Git creates a pointer rather than duplicating files, branching is near-instantaneous and incredibly lightweight.",
    "hint": "Branch creation writes only 41 bytes to disk.",
    "level": "basic",
    "codeExample": "git branch feature-x # Instantaneous 41-byte file creation"
  },
  {
    "id": "branch-t0-q4",
    "question": "What happens to a branch pointer when you make a new commit while on that branch?",
    "shortAnswer": "The branch pointer file is updated with the new commit's SHA-1 hash, automatically moving forward to point to the new commit.",
    "options": [
      "The branch pointer file is automatically updated with the newly generated commit SHA-1 hash",
      "A new branch is created automatically",
      "The old branch is deleted",
      "The branch pointer remains static at the initial commit"
    ],
    "answer": "The branch pointer file is automatically updated with the newly generated commit SHA-1 hash",
    "explanation": "Branches in Git are movable pointers that automatically advance with each commit made on them.",
    "hint": "Branch pointers automatically advance forward upon commit.",
    "level": "basic",
    "codeExample": "# Commit C1 -> main points to C1\n# Commit C2 -> main moves forward to point to C2"
  },
  {
    "id": "branch-t0-q5",
    "question": "How does Git's branch model differ fundamentally from Centralized VCS systems like Subversion (SVN)?",
    "shortAnswer": "SVN copies the entire directory tree into a `/branches/` folder; Git simply writes a 41-byte hash pointer to an existing commit DAG node.",
    "options": [
      "SVN makes an expensive full-directory copy on the server; Git creates an instant 41-byte pointer to an existing commit object in the DAG",
      "SVN does not support branching at all",
      "Git requires server approval for every branch",
      "SVN branches are immutable text files"
    ],
    "answer": "SVN makes an expensive full-directory copy on the server; Git creates an instant 41-byte pointer to an existing commit object in the DAG",
    "explanation": "This pointer architecture is Linus Torvalds' defining design breakthrough that makes branching frictionless in Git.",
    "hint": "Pointer reference vs full directory copy.",
    "level": "intermediate",
    "codeExample": "# SVN: svn copy trunk/ branches/feat/ (Copies entire directory tree)\n# Git: git branch feat (Writes 41 bytes)"
  },
  {
    "id": "branch-t0-q6",
    "question": "If you have two branches, `main` and `feature-tax`, pointing to the exact same commit, how many copies of the project files exist in Git's object store?",
    "shortAnswer": "Only ONE copy. Both branch ref files contain the exact same commit hash.",
    "options": [
      "Exactly one copy; both branch text files contain the identical commit SHA hash",
      "Two complete duplicate copies",
      "Four copies",
      "Zero copies"
    ],
    "answer": "Exactly one copy; both branch text files contain the identical commit SHA hash",
    "explanation": "Git stores file blobs once. Multiple branches pointing to the same commit reference the exact same underlying tree and blob objects.",
    "hint": "Two pointers can reference the exact same commit object.",
    "level": "basic",
    "codeExample": "cat .git/refs/heads/main         # 7a8b9c...\ncat .git/refs/heads/feature-tax # 7a8b9c... (Exact same SHA)"
  },
  {
    "id": "branch-t0-q7",
    "question": "What is the role of `.git/HEAD` in relation to branch pointers?",
    "shortAnswer": "`.git/HEAD` is a symbolic reference that points to the name of the currently active branch ref (e.g., `ref: refs/heads/main`).",
    "options": [
      "It is a symbolic reference pointing to the active branch ref in `.git/refs/heads/`",
      "It stores the repository password",
      "It contains the project license",
      "It lists all deleted files"
    ],
    "answer": "It is a symbolic reference pointing to the active branch ref in `.git/refs/heads/`",
    "explanation": "HEAD tells Git which branch pointer should advance when a new commit is created.",
    "hint": "HEAD points to the currently checked-out branch ref.",
    "level": "basic",
    "codeExample": "cat .git/HEAD\n# Output: ref: refs/heads/main"
  },
  {
    "id": "branch-t0-q8",
    "question": "What command resolves a branch name into its full 40-character commit SHA-1 hash via Git plumbing?",
    "shortAnswer": "`git rev-parse <branch-name>`",
    "options": [
      "`git rev-parse <branch-name>`",
      "`git hash <branch-name>`",
      "`git get-sha <branch-name>`",
      "`git pointer <branch-name>`"
    ],
    "answer": "`git rev-parse <branch-name>`",
    "explanation": "`git rev-parse` takes any friendly reference (branch name, tag, relative ref) and returns its exact hexadecimal SHA hash.",
    "hint": "rev-parse parses refs to SHAs.",
    "level": "intermediate",
    "codeExample": "git rev-parse main\n# 7a8b9c0d1e2f3456789abcdef0123456789abcde"
  },
  {
    "id": "branch-t0-q9",
    "question": "What happens when you delete a branch using `git branch -d <branch-name>`?",
    "shortAnswer": "Git simply deletes the 41-byte text file inside `.git/refs/heads/<branch-name>`. The commit objects remain in `.git/objects/`.",
    "options": [
      "Git deletes the 41-byte ref file in `.git/refs/heads/`; the underlying commit objects remain safe in `.git/objects/`",
      "Git immediately erases all code and commits created on that branch",
      "Git formats the partition",
      "Git sends an alert to GitHub"
    ],
    "answer": "Git deletes the 41-byte ref file in `.git/refs/heads/`; the underlying commit objects remain safe in `.git/objects/`",
    "explanation": "Deleting a branch only removes the named pointer reference. The commits in the DAG remain intact and reachable via `git reflog`.",
    "hint": "Deleting a branch deletes the pointer file, not the commit objects.",
    "level": "intermediate",
    "codeExample": "git branch -d feat-login # Deletes .git/refs/heads/feat-login"
  },
  {
    "id": "undo-t0-q10",
    "question": "In the classroom at Barrackpore, Sachin created 50 branches to experiment with different CSS layouts. Will this slow down his Git repository performance or bloat his disk?",
    "shortAnswer": "No. 50 branches consume less than 2.5 kilobytes of disk space and have zero impact on repository performance.",
    "options": [
      "No; 50 branches consume only ~2KB of disk space and have zero performance overhead in Git",
      "Yes; 50 branches will make Git crash",
      "Yes; his hard drive will fill up with 50 copies of the code",
      "Only if he pushes them to GitHub"
    ],
    "answer": "No; 50 branches consume only ~2KB of disk space and have zero performance overhead in Git",
    "explanation": "Because branches are 41-byte files, creating dozens of branches is standard, lightweight, and encouraged in modern Git workflows.",
    "hint": "Branches are zero-cost pointers.",
    "level": "basic",
    "codeExample": "# 50 branches = 50 * 41 bytes = ~2.05 KB total"
  },
  {
    "id": "branch-t0-q11",
    "question": "What is the default name for the primary branch in modern Git installations (Git 2.28+)?",
    "shortAnswer": "`main`",
    "options": [
      "`main`",
      "`master`",
      "`trunk`",
      "`production`"
    ],
    "answer": "`main`",
    "explanation": "Modern Git defaults to `main` as configured via `init.defaultBranch = main`.",
    "hint": "Modern default branch name is main.",
    "level": "basic",
    "codeExample": "git config --global init.defaultBranch main"
  },
  {
    "id": "branch-t0-q12",
    "question": "What happens if you manually edit `.git/refs/heads/main` with a text editor and change its 40-character hash?",
    "shortAnswer": "Git will immediately treat the branch tip as pointing to the new commit hash (essentially performing a manual `git reset`).",
    "options": [
      "The branch pointer will move to the new commit SHA immediately (a manual pointer reset)",
      "Git will crash permanently",
      "The editor will corrupt all repository blobs",
      "GitHub will block your account"
    ],
    "answer": "The branch pointer will move to the new commit SHA immediately (a manual pointer reset)",
    "explanation": "Because Git reads the ref file directly on every command, changing the hash inside changes where the branch tip points.",
    "hint": "Changing the hash in the ref file moves the branch tip.",
    "level": "advanced",
    "codeExample": "# Manual pointer update: echo \"<sha>\" > .git/refs/heads/main"
  },
  {
    "id": "branch-t0-q13",
    "question": "What is the difference between a branch pointer and a Git lightweight tag?",
    "shortAnswer": "A branch pointer moves forward automatically when new commits are made; a tag is a static pointer that stays fixed at its designated commit forever.",
    "options": [
      "A branch pointer moves forward with new commits; a tag stays permanently pinned to a specific commit",
      "Tags are stored in GitHub cloud only",
      "Branches cannot be merged, but tags can",
      "Tags are 1MB in size"
    ],
    "answer": "A branch pointer moves forward with new commits; a tag stays permanently pinned to a specific commit",
    "explanation": "Both are 41-byte pointers in `.git/refs/`, but branches are dynamic/mutable while tags are static/immutable release milestones.",
    "hint": "Branches are movable; tags are static pins.",
    "level": "intermediate",
    "codeExample": "# Branch in .git/refs/heads/ (moves on commit)\n# Tag in .git/refs/tags/ (static permanent pin)"
  },
  {
    "id": "branch-t0-q14",
    "question": "When a branch is packed into `.git/packed-refs` during `git gc`, where does the branch reference live?",
    "shortAnswer": "Inside the single flat text file `.git/packed-refs` to optimize filesystem performance for repos with thousands of branches.",
    "options": [
      "Inside the `.git/packed-refs` file",
      "Inside `.git/config`",
      "In the cloud",
      "In Windows Registry"
    ],
    "answer": "Inside the `.git/packed-refs` file",
    "explanation": "Git packs old loose references from `.git/refs/heads/` into `.git/packed-refs` for faster inode lookups.",
    "hint": "Loose refs are packed into .git/packed-refs.",
    "level": "advanced",
    "codeExample": "cat .git/packed-refs\n# <sha> refs/heads/main"
  },
  {
    "id": "branch-t0-q15",
    "question": "What command creates a new branch named `feature-auth` WITHOUT switching to it?",
    "shortAnswer": "`git branch feature-auth`",
    "options": [
      "`git branch feature-auth`",
      "`git switch feature-auth`",
      "`git checkout feature-auth`",
      "`git make-branch feature-auth`"
    ],
    "answer": "`git branch feature-auth`",
    "explanation": "`git branch <name>` creates the pointer file in `.git/refs/heads/<name>` and leaves HEAD on the current active branch.",
    "hint": "git branch creates without switching.",
    "level": "basic",
    "codeExample": "git branch feature-auth"
  },
  {
    "id": "branch-t0-q16",
    "question": "Why is branching in Git referred to as 'Zero-Cost Abstraction'?",
    "shortAnswer": "Because creating, switching, and deleting branches requires near-zero CPU time, near-zero memory, and exactly 41 bytes of disk space.",
    "options": [
      "Because branch operations manipulate lightweight pointers rather than copying file trees",
      "Because Git is free and open source",
      "Because GitHub does not charge for private repos",
      "Because branches have no names"
    ],
    "answer": "Because branch operations manipulate lightweight pointers rather than copying file trees",
    "explanation": "Branches act as virtual pointers over the content-addressable DAG, eliminating duplication costs.",
    "hint": "Lightweight pointer mechanics eliminate file duplication.",
    "level": "basic",
    "codeExample": "# Zero-cost: O(1) branch creation time"
  },
  {
    "id": "branch-t0-q17",
    "question": "What character encoding and length does a commit SHA-1 hash have in a branch ref file?",
    "shortAnswer": "40 hexadecimal characters (0-9, a-f) representing a 160-bit hash.",
    "options": [
      "40 hexadecimal characters (160 bits)",
      "64 base64 characters",
      "32 alphanumeric characters",
      "128 decimal digits"
    ],
    "answer": "40 hexadecimal characters (160 bits)",
    "explanation": "SHA-1 hashes in Git are represented as 40 hexadecimal characters.",
    "hint": "SHA-1 produces a 40-character hexadecimal string.",
    "level": "intermediate",
    "codeExample": "# Length: 40 chars + 1 newline = 41 bytes"
  },
  {
    "id": "branch-t0-q18",
    "question": "In the classroom at Barrackpore, Mahima ran `ls .git/refs/heads/` on a newly initialized repo with 0 commits. What did she find?",
    "shortAnswer": "The directory was empty because Git does not write the branch ref file until the initial commit is created.",
    "options": [
      "The directory was empty; branch pointer files are only written after the first commit is created",
      "It contained a 1GB file",
      "It contained a file named `master.exe`",
      "The folder did not exist"
    ],
    "answer": "The directory was empty; branch pointer files are only written after the first commit is created",
    "explanation": "Before the first commit (the unborn branch state), `.git/refs/heads/` has no files, even though `.git/HEAD` contains `ref: refs/heads/main`.",
    "hint": "Unborn branch: ref file is created upon initial commit.",
    "level": "intermediate",
    "codeExample": "# Before initial commit: .git/refs/heads/ is empty"
  },
  {
    "id": "branch-t0-q19",
    "question": "What is an 'Unborn Branch' in Git?",
    "shortAnswer": "A state where HEAD points to a branch name (e.g. `refs/heads/main`) that does not yet have any commit history or ref file on disk.",
    "options": [
      "A state in a brand new repository where HEAD points to a branch ref that has not yet had its initial commit created",
      "A branch that has been deleted",
      "A branch with merge conflicts",
      "A corrupted branch"
    ],
    "answer": "A state in a brand new repository where HEAD points to a branch ref that has not yet had its initial commit created",
    "explanation": "When you run `git init`, you are on an unborn branch until your very first `git commit` writes the root commit and creates the ref file.",
    "hint": "Unborn branch = brand new repo prior to commit #1.",
    "level": "intermediate",
    "codeExample": "# On branch main\n# No commits yet (Unborn branch state)"
  },
  {
    "id": "branch-t0-q20",
    "question": "What command displays all local branches along with their current commit SHA and commit subject message?",
    "shortAnswer": "`git branch -v` (or `git branch --verbose`).",
    "options": [
      "`git branch -v` (or `--verbose`)",
      "`git branch --all-data`",
      "`git branch -s`",
      "`git show-branches`"
    ],
    "answer": "`git branch -v` (or `--verbose`)",
    "explanation": "`-v` adds the short commit hash and commit subject line next to each branch name.",
    "hint": "-v stands for verbose.",
    "level": "basic",
    "codeExample": "git branch -v"
  },
  {
    "id": "branch-t0-q21",
    "question": "How does Git determine which commit is the 'tip' or latest snapshot of a branch?",
    "shortAnswer": "By reading the 40-character SHA hash stored inside that branch's text file in `.git/refs/heads/<branch>`.",
    "options": [
      "By reading the SHA-1 hash stored inside `.git/refs/heads/<branch-name>`",
      "By looking at file modification timestamps on disk",
      "By checking GitHub's API",
      "By counting the lines of code in the project"
    ],
    "answer": "By reading the SHA-1 hash stored inside `.git/refs/heads/<branch-name>`",
    "explanation": "The SHA inside the ref file directly points to the tip commit object of that branch.",
    "hint": "The ref file content defines the tip commit.",
    "level": "basic",
    "codeExample": "# Tip commit = SHA in .git/refs/heads/<branch>"
  },
  {
    "id": "branch-t0-q22",
    "question": "True or False: Creating 1,000 branches in a Git repository slows down the speed of `git commit` or `git status`.",
    "shortAnswer": "False. Git operations look up the active branch pointer directly; the total number of branches does not degrade performance.",
    "options": [
      "False; branch lookup is O(1) direct file access and does not degrade commit or status speed",
      "True; Git slows down exponentially after 10 branches",
      "True; but only on Windows",
      "False; but only if the computer has 64GB RAM"
    ],
    "answer": "False; branch lookup is O(1) direct file access and does not degrade commit or status speed",
    "explanation": "Git's architecture uses direct file lookups, keeping performance instantaneous regardless of branch count.",
    "hint": "O(1) pointer lookups keep Git fast.",
    "level": "basic",
    "codeExample": "# Performance is O(1) independent of branch count"
  },
  {
    "id": "branch-t0-q23",
    "question": "Can two different branch names point to different commits in history at the same time?",
    "shortAnswer": "Yes. Each branch file holds its own independent 40-character SHA hash.",
    "options": [
      "Yes; each branch ref file independently records the commit hash at the tip of its own timeline",
      "No; all branches must point to the same commit",
      "Only if they have the same author",
      "Only on weekends"
    ],
    "answer": "Yes; each branch ref file independently records the commit hash at the tip of its own timeline",
    "explanation": "Independent pointer files allow multiple developers or features to advance on divergent paths simultaneously.",
    "hint": "Branches advance independently.",
    "level": "basic",
    "codeExample": "main -> Commit C5\nfeature-gst -> Commit F2"
  },
  {
    "id": "branch-t0-q24",
    "question": "What is the command to view all local AND remote-tracking branches in a repository?",
    "shortAnswer": "`git branch -a` (or `git branch --all`).",
    "options": [
      "`git branch -a` (or `git branch --all`)",
      "`git branch -r`",
      "`git show-branches --everywhere`",
      "`git remote --branches`"
    ],
    "answer": "`git branch -a` (or `git branch --all`)",
    "explanation": "`-a` displays both local branches (in `refs/heads/`) and remote-tracking branches (in `refs/remotes/`).",
    "hint": "-a displays all local and remote branches.",
    "level": "basic",
    "codeExample": "git branch -a"
  },
  {
    "id": "branch-t0-q25",
    "question": "In summary, what is the best mental model for understanding a Git branch?",
    "shortAnswer": "A Git branch is simply a movable sticky note (a 41-byte text pointer) that points to a commit in the DAG and slides forward automatically as new commits are added.",
    "options": [
      "A movable bookmark/pointer (41 bytes) referencing a commit in the DAG that slides forward as you commit",
      "A heavy duplicate folder of the entire codebase",
      "A permanent lock on your source code",
      "A network cable connecting to GitHub"
    ],
    "answer": "A movable bookmark/pointer (41 bytes) referencing a commit in the DAG that slides forward as you commit",
    "explanation": "Demystifying branches as lightweight movable pointers makes branching and pointer mechanics intuitive and effortless.",
    "hint": "A branch is just a movable bookmark.",
    "level": "basic",
    "codeExample": "# Branch = Movable 41-byte pointer to a commit in the DAG"
  }
];

export default questions;
