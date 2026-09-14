/**
 * Topic 1 FAQ Assessment Questions:
 * "How Git Branching Differs from Other VCS: Instant zero-cost branching vs copying entire directories"
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "branch-t1-q1",
    "question": "How did Centralized Version Control Systems (like SVN) implement branching at the server storage level?",
    "shortAnswer": "By creating an expensive server-side directory copy of the entire project tree into a `/branches/` folder.",
    "options": [
      "By copying the entire directory structure and all files into a `/branches/` folder on the central server",
      "By writing a 41-byte text pointer",
      "By sending a push notification to users",
      "By creating a virtual hard disk image"
    ],
    "answer": "By copying the entire directory structure and all files into a `/branches/` folder on the central server",
    "explanation": "SVN treated branches as filesystem directories (`svn copy trunk/ branches/feat/`), requiring network roundtrips and server disk duplication.",
    "hint": "SVN duplicated the full directory tree on the server.",
    "level": "basic",
    "codeExample": "# SVN: svn copy svn://server/trunk svn://server/branches/feat"
  },
  {
    "id": "branch-t1-q2",
    "question": "Why is branching in Git described as 'Zero-Cost'?",
    "shortAnswer": "Because creating a branch writes only a 41-byte pointer text file without duplicating any project source files or requiring network roundtrips.",
    "options": [
      "Because it writes only a 41-byte pointer to an existing commit object in the DAG in ~1ms without copying source files",
      "Because Git software is free of charge",
      "Because Git does not store past commits",
      "Because branches are stored in RAM only"
    ],
    "answer": "Because it writes only a 41-byte pointer to an existing commit object in the DAG in ~1ms without copying source files",
    "explanation": "Git's content-addressable DAG allows infinite branches without increasing repository file size.",
    "hint": "Branch creation time and space complexity is O(1).",
    "level": "basic",
    "codeExample": "git branch experiment # 41-byte file creation in O(1) time"
  },
  {
    "id": "branch-t1-q3",
    "question": "Can you create and switch branches in Git while working offline on a laptop without internet access?",
    "shortAnswer": "Yes, 100% offline. Git is a distributed VCS where all repository metadata and branch refs exist locally.",
    "options": [
      "Yes; all branch references and object databases are 100% local and require zero internet connection",
      "No; Git requires an active connection to GitHub",
      "Only if you have an enterprise license",
      "Only for read-only operations"
    ],
    "answer": "Yes; all branch references and object databases are 100% local and require zero internet connection",
    "explanation": "Every Git clone contains the complete repository history and DAG locally on disk.",
    "hint": "Git is fully distributed and offline-capable.",
    "level": "basic",
    "codeExample": "# Works completely offline on a train or flight:\ngit branch new-idea && git switch new-idea"
  },
  {
    "id": "branch-t1-q4",
    "question": "What software development practice emerged largely due to Git's zero-cost branching architecture?",
    "shortAnswer": "'Branch Early, Branch Often' — creating short-lived, disposable topic/feature branches for every task, bugfix, or experiment.",
    "options": [
      "Short-lived, disposable topic and feature branches for every individual task, bugfix, or spike",
      "Writing monolithic 10,000-line commits",
      "Working directly on production main branch",
      "Disabling version control on Fridays"
    ],
    "answer": "Short-lived, disposable topic and feature branches for every individual task, bugfix, or spike",
    "explanation": "Because branching is painless, modern teams create and discard dozens of feature branches daily without penalty.",
    "hint": "Short-lived topic branches for clean feature isolation.",
    "level": "basic",
    "codeExample": "# Feature branch workflow:\ngit switch -c feat-gst-calc\n# Work, commit, merge, and delete!"
  },
  {
    "id": "branch-t1-q5",
    "question": "In SVN, why were developers often hesitant to create branches?",
    "shortAnswer": "Because branching was slow, bloated the server disk, required network connection, and made subsequent merges complex and painful.",
    "options": [
      "Because branching had high network latency, consumed server disk space, and merging required manual revision tracking",
      "Because SVN charged ₹1,000 per branch",
      "Because SVN deleted branches after 24 hours",
      "Because only system administrators were allowed to branch"
    ],
    "answer": "Because branching had high network latency, consumed server disk space, and merging required manual revision tracking",
    "explanation": "Merging in early SVN required tracking revision numbers manually (e.g., `svn merge -r 100:150`), causing 'merge phobia'.",
    "hint": "SVN branching was heavy and merging was error-prone.",
    "level": "intermediate",
    "codeExample": "# SVN Merge tracking was manual and painful"
  },
  {
    "id": "branch-t1-q6",
    "question": "How does Git automatically determine the common ancestor (merge base) between two branches during a merge?",
    "shortAnswer": "By traversing the commit parent pointers in the Directed Acyclic Graph (DAG) using the `git-merge-base` algorithm.",
    "options": [
      "By traversing parent SHA pointers in the DAG to locate the closest common ancestor commit automatically",
      "By comparing file modification timestamps in Windows Explorer",
      "By asking the developer to input revision numbers",
      "By guessing based on commit messages"
    ],
    "answer": "By traversing parent SHA pointers in the DAG to locate the closest common ancestor commit automatically",
    "explanation": "Because every Git commit stores immutable parent hashes, finding the merge base is an exact graph traversal operation.",
    "hint": "Git traverses the DAG to find the merge base.",
    "level": "intermediate",
    "codeExample": "git merge-base main feature-tax\n# 7a8b9c0d (common ancestor SHA)"
  },
  {
    "id": "branch-t1-q7",
    "question": "What is the time complexity of creating a branch in Git with 100,000 files in the repository?",
    "shortAnswer": "O(1) constant time (< 1 millisecond).",
    "options": [
      "O(1) constant time (< 1ms)",
      "O(N) linear time proportional to the number of files",
      "O(N^2) quadratic time",
      "O(log N)"
    ],
    "answer": "O(1) constant time (< 1ms)",
    "explanation": "Git only writes a 41-byte text file regardless of whether the repository has 10 files or 1,000,000 files.",
    "hint": "O(1) time complexity.",
    "level": "intermediate",
    "codeExample": "# 100k files: Branch creation still takes <1ms"
  },
  {
    "id": "branch-t1-q8",
    "question": "What is the time complexity of creating a branch in SVN for a repository with 100,000 files?",
    "shortAnswer": "O(N) linear time dependent on the number of files and network latency to the central server.",
    "options": [
      "O(N) proportional to repository file count and network roundtrip latency",
      "O(1)",
      "Instantaneous",
      "O(0)"
    ],
    "answer": "O(N) proportional to repository file count and network roundtrip latency",
    "explanation": "SVN must create directory tree metadata across the network on the server.",
    "hint": "SVN scaling depends on file count and network.",
    "level": "intermediate",
    "codeExample": "# SVN branching slows down as repository grows"
  },
  {
    "id": "branch-t1-q9",
    "question": "In the classroom at Barrackpore, Tuhina wants to test an experimental library integration for 30 minutes. What is the recommended Git branching practice?",
    "shortAnswer": "Create a temporary spike branch (`git switch -c spike-lib-test`), experiment, and delete it if not needed.",
    "options": [
      "Create a quick spike branch (`git switch -c spike-lib-test`) and delete it cleanly if the experiment fails",
      "Make changes directly on `main` and comment them out later",
      "Copy the project folder to the Desktop as `project_backup_copy_2`",
      "Create a new GitHub repository"
    ],
    "answer": "Create a quick spike branch (`git switch -c spike-lib-test`) and delete it cleanly if the experiment fails",
    "explanation": "Disposable spike branches keep `main` pristine and allow total freedom to experiment without consequences.",
    "hint": "Create disposable spike branches.",
    "level": "basic",
    "codeExample": "git switch -c spike-lib-test\n# If it fails: git switch main && git branch -D spike-lib-test"
  },
  {
    "id": "branch-t1-q10",
    "question": "Why does Git switching between branches with few changes happen in fractions of a second?",
    "shortAnswer": "Because Git only updates the specific files that differ between the two commit snapshots, leaving identical files untouched.",
    "options": [
      "Because Git diffs the two tree snapshots and only modifies the files that changed between them",
      "Because Git re-downloads the files from GitHub",
      "Because Git deletes all files and re-clones",
      "Because Git uses Windows shadow copies"
    ],
    "answer": "Because Git diffs the two tree snapshots and only modifies the files that changed between them",
    "explanation": "Git's tree diffing identifies unchanged subtrees instantly by SHA matching, minimizing disk I/O.",
    "hint": "Git only updates files that actually differ.",
    "level": "intermediate",
    "codeExample": "# Switching branches only touches modified inodes"
  },
  {
    "id": "branch-t1-q11",
    "question": "What is Mercurial (Hg)'s branching model compared to Git?",
    "shortAnswer": "Mercurial historically embedded branch names permanently into commit metadata (named branches), whereas Git branches are lightweight movable pointers external to commits.",
    "options": [
      "Mercurial historically embedded branch names permanently into commit objects; Git keeps branch pointers completely separate in `.git/refs/`",
      "Mercurial does not support version control",
      "Git and Mercurial use identical source code",
      "Mercurial branches are stored in SQLite"
    ],
    "answer": "Mercurial historically embedded branch names permanently into commit objects; Git keeps branch pointers completely separate in `.git/refs/`",
    "explanation": "In Git, commit objects have zero knowledge of branch names. Branch pointers exist outside commit objects.",
    "hint": "Git branch names are external pointers, not hardcoded in commit objects.",
    "level": "advanced",
    "codeExample": "# Git commit object: tree, parent, author, committer, msg (NO branch name)"
  },
  {
    "id": "branch-t1-q12",
    "question": "True or False: A Git commit object contains the name of the branch it was created on.",
    "shortAnswer": "False. Commit objects store Tree, Parent SHA, Author, Committer, and Message; they never store branch names.",
    "options": [
      "False; commit objects do not contain branch names, only parent hashes and tree snapshots",
      "True; all commit objects store the branch name in their header",
      "True; but only on GitHub",
      "False; unless the commit was signed with GPG"
    ],
    "answer": "False; commit objects do not contain branch names, only parent hashes and tree snapshots",
    "explanation": "This separation allows commits to belong to multiple branches simultaneously without altering commit hashes.",
    "hint": "Commits are agnostic to branch names.",
    "level": "intermediate",
    "codeExample": "git cat-file -p HEAD\n# Output contains NO branch name field!"
  },
  {
    "id": "branch-t1-q13",
    "question": "What is the primary operational risk when developers in a team avoid branching and commit directly to `main`?",
    "shortAnswer": "Broken in-progress code contaminates the stable branch, disrupting CI/CD deployments and blocking colleagues.",
    "options": [
      "In-progress unstable code breaks the shared main branch and halts continuous deployment pipelines",
      "The hard drive runs out of sectors",
      "Git disables commits permanently",
      "GitHub blocks write permissions"
    ],
    "answer": "In-progress unstable code breaks the shared main branch and halts continuous deployment pipelines",
    "explanation": "Branching isolates features so `main` is always in a deployable, production-ready state.",
    "hint": "Feature isolation keeps main perpetually deployable.",
    "level": "basic",
    "codeExample": "# Never work directly on production main without branching!"
  },
  {
    "id": "branch-t1-q14",
    "question": "How does Git handle file renaming across branches compared to older VCS systems?",
    "shortAnswer": "Git detects file content similarities dynamically (heuristics) across tree hashes rather than tracking rigid file ID metadata.",
    "options": [
      "Git detects renames dynamically by matching blob content hashes across trees",
      "Git breaks completely on renamed files",
      "Git requires manual rename registration with an administrator",
      "Git changes the file extension to `.old`"
    ],
    "answer": "Git detects renames dynamically by matching blob content hashes across trees",
    "explanation": "Content-addressable storage makes rename detection flexible and seamless during branch merges.",
    "hint": "Git detects renames through content hash matching.",
    "level": "advanced",
    "codeExample": "git log --follow <renamed-file>"
  },
  {
    "id": "branch-t1-q15",
    "question": "What is a 'Spike Branch' in agile software development?",
    "shortAnswer": "A short-lived, disposable branch created solely to explore technical feasibility, investigate a bug, or prototype a feature.",
    "options": [
      "A temporary exploratory branch used to prototype an idea without any intention of long-term maintenance",
      "A branch with virus scanning enabled",
      "A branch created by an automated bot",
      "A branch that cannot be merged"
    ],
    "answer": "A temporary exploratory branch used to prototype an idea without any intention of long-term maintenance",
    "explanation": "Git's zero-cost pointers make creating and destroying spike prototypes effortless.",
    "hint": "Spike branch = disposable prototype branch.",
    "level": "basic",
    "codeExample": "git switch -c spike-graphql-prototype"
  },
  {
    "id": "branch-t1-q16",
    "question": "When you delete a Git branch, what happens to the commits that were unique to that branch?",
    "shortAnswer": "They become unreachable dangling commits in `.git/objects/`, still recoverable via `git reflog` until garbage collection runs.",
    "options": [
      "They remain in `.git/objects/` as unreachable commits and can be recovered using `git reflog`",
      "They are deleted from the disk within 1 nanosecond",
      "They are automatically merged into `main`",
      "They are converted into text files on the desktop"
    ],
    "answer": "They remain in `.git/objects/` as unreachable commits and can be recovered using `git reflog`",
    "explanation": "Deleting a branch only deletes the 41-byte pointer; the underlying commit graph nodes survive.",
    "hint": "Commits survive branch pointer deletion.",
    "level": "intermediate",
    "codeExample": "# Commits are preserved in .git/objects/ even after branch deletion"
  },
  {
    "id": "branch-t1-q17",
    "question": "How many branch pointer files can exist inside `.git/refs/heads/`?",
    "shortAnswer": "Virtually unlimited (limited only by OS filesystem file limits).",
    "options": [
      "Virtually unlimited (thousands of branches can coexist effortlessly)",
      "Maximum 10 branches",
      "Maximum 256 branches",
      "Exactly 2 branches (main and dev)"
    ],
    "answer": "Virtually unlimited (thousands of branches can coexist effortlessly)",
    "explanation": "Linux kernel repository contains thousands of branches without performance degradation.",
    "hint": "No arbitrary limit on branch counts.",
    "level": "basic",
    "codeExample": "# Thousands of branches can coexist cleanly"
  },
  {
    "id": "branch-t1-q18",
    "question": "In the Barrackpore lab, Debangshu asked: 'If Git only stores pointers, how does it know which branch I am currently on?' What is the answer?",
    "shortAnswer": "Git reads `.git/HEAD`, which stores a symbolic reference string such as `ref: refs/heads/main`.",
    "options": [
      "Git reads the `.git/HEAD` file to see which branch ref is currently active",
      "Git checks your computer hostname",
      "Git stores your branch name in environment variables",
      "Git asks the server on every command"
    ],
    "answer": "Git reads the `.git/HEAD` file to see which branch ref is currently active",
    "explanation": "`.git/HEAD` serves as the compass pointing to the active branch reference.",
    "hint": ".git/HEAD stores the active branch symbolic reference.",
    "level": "basic",
    "codeExample": "cat .git/HEAD # ref: refs/heads/main"
  },
  {
    "id": "branch-t1-q19",
    "question": "What is the primary difference in collaboration between SVN's trunk and Git's distributed feature branches?",
    "shortAnswer": "SVN requires all developers to commit to a single shared central trunk, causing frequent lockups; Git allows developers to advance isolated local branches in parallel.",
    "options": [
      "Git enables fully parallel, isolated development across independent branches without blocking teammates",
      "SVN branches are 100x faster than Git",
      "Git requires a server administrator to approve branch creation",
      "There is no difference in collaboration"
    ],
    "answer": "Git enables fully parallel, isolated development across independent branches without blocking teammates",
    "explanation": "Decentralized branching enables high-velocity parallel development across distributed teams.",
    "hint": "Parallel isolated development without blocking.",
    "level": "basic",
    "codeExample": "# Parallel team branches in Git"
  },
  {
    "id": "branch-t1-q20",
    "question": "What happens if a developer creates a branch named `feature/login` and another named `feature/login/sub` in a Git repository?",
    "shortAnswer": "On standard filesystems, it creates a folder named `feature/` containing `login` (or fails if `login` is already a file due to directory-file name conflict).",
    "options": [
      "It creates hierarchical folder structures inside `.git/refs/heads/feature/`",
      "Git throws an error and disables branching",
      "Git renames the branch to `root`",
      "It creates two separate repositories"
    ],
    "answer": "It creates hierarchical folder structures inside `.git/refs/heads/feature/`",
    "explanation": "Slash characters in branch names translate into subdirectories inside `.git/refs/heads/` (e.g. `.git/refs/heads/feature/login`).",
    "hint": "Slashes create subdirectories inside refs/heads/.",
    "level": "intermediate",
    "codeExample": ".git/refs/heads/feature/login"
  },
  {
    "id": "branch-t1-q21",
    "question": "Why can you NOT have a branch named `feat` AND a branch named `feat/login` simultaneously on standard filesystems?",
    "shortAnswer": "Because `feat` cannot simultaneously be a regular text file and a directory on the operating system filesystem inside `.git/refs/heads/`.",
    "options": [
      "Because on the filesystem, `feat` cannot be both a file and a directory at the same time in `.git/refs/heads/`",
      "Because Git has a bug with the word feat",
      "Because GitHub reserves the prefix feat",
      "Because slash is a forbidden character in Git"
    ],
    "answer": "Because on the filesystem, `feat` cannot be both a file and a directory at the same time in `.git/refs/heads/`",
    "explanation": "Operating systems cannot create a file `.git/refs/heads/feat` if a directory `.git/refs/heads/feat/` already exists (and vice versa).",
    "hint": "Filesystem cannot have a file and directory with the same name.",
    "level": "advanced",
    "codeExample": "error: cannot lock ref 'refs/heads/feat/login': 'refs/heads/feat' exists"
  },
  {
    "id": "branch-t1-q22",
    "question": "What is the recommended naming convention for team feature branches in modern software development?",
    "shortAnswer": "Categorized prefixes using slashes: `feat/`, `fix/`, `chore/`, `refactor/`, `docs/` followed by a descriptive slug (e.g. `feat/gst-invoicing`).",
    "options": [
      "Semantic prefixes like `feat/description`, `fix/issue-id`, or `chore/task`",
      "Using the developer's date of birth",
      "Naming all branches `branch1`, `branch2`, `branch3`",
      "Using random UUID strings"
    ],
    "answer": "Semantic prefixes like `feat/description`, `fix/issue-id`, or `chore/task`",
    "explanation": "Standardized prefixes structure `.git/refs/heads/` into organized subdirectories and clarify intent for peer code reviews.",
    "hint": "Semantic prefixes like feat/, fix/, chore/.",
    "level": "basic",
    "codeExample": "git switch -c feat/gst-tax-calculator"
  },
  {
    "id": "branch-t1-q23",
    "question": "True or False: In Git, checking out an earlier branch modifies the file creation timestamps of files that remained identical between both branches.",
    "shortAnswer": "False. Git leaves identical files completely untouched on disk, preserving their filesystem timestamps.",
    "options": [
      "False; Git leaves identical files untouched on disk, preserving their filesystem timestamps and caching",
      "True; Git touches and updates all file timestamps on every branch switch",
      "True; all files are deleted and recreated",
      "False; Git does not use timestamps"
    ],
    "answer": "False; Git leaves identical files untouched on disk, preserving their filesystem timestamps and caching",
    "explanation": "Preserving timestamps avoids triggering unnecessary full project recompilations in build tools (like Vite, Webpack, or Make).",
    "hint": "Git minimizes disk I/O and preserves timestamps for unchanged files.",
    "level": "intermediate",
    "codeExample": "# Unchanged files retain original timestamps for incremental build efficiency"
  },
  {
    "id": "branch-t1-q24",
    "question": "How does Git's branch model empower CI/CD automated testing on Pull Requests?",
    "shortAnswer": "CI runners can clone or checkout isolated feature branch pointers in milliseconds, run automated test suites, and report status checks before merging.",
    "options": [
      "Isolated lightweight branches allow automated CI pipelines to test changes independently without disturbing production code",
      "CI runners do not support Git branches",
      "It requires manual testing by human QA on every commit",
      "Branches automatically deploy to production without review"
    ],
    "answer": "Isolated lightweight branches allow automated CI pipelines to test changes independently without disturbing production code",
    "explanation": "Lightweight PR branches are the bedrock of automated testing and continuous integration.",
    "hint": "Isolated branch testing is the foundation of CI/CD.",
    "level": "basic",
    "codeExample": "# GitHub Actions CI triggers automatically on feature branch PRs"
  },
  {
    "id": "branch-t1-q25",
    "question": "In summary, why did Linus Torvalds' pointer-based branching model revolutionize software development?",
    "shortAnswer": "It transformed branching from a heavyweight, slow administrative event into a frictionless, instant, and daily creative tool for developers.",
    "options": [
      "It turned branching from a slow, expensive server operation into an instantaneous, frictionless, zero-cost daily workflow",
      "It removed the need to write unit tests",
      "It made computers run at 10GHz",
      "It eliminated all merge conflicts automatically"
    ],
    "answer": "It turned branching from a slow, expensive server operation into an instantaneous, frictionless, zero-cost daily workflow",
    "explanation": "Zero-cost branching enabled the modern feature-branch and pull-request workflow used across global software engineering.",
    "hint": "Frictionless, instant, zero-cost daily workflow.",
    "level": "basic",
    "codeExample": "# Instant zero-cost branching = Modern Agile Software Engineering"
  }
];

export default questions;
