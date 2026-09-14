/**
 * Topic 2 FAQ Dataset: Centralized vs Distributed VCS
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "What is a Single Point of Failure (SPOF) in version control?",
    shortAnswer: "A vulnerability where the failure of one central component (the server) causes the entire engineering system to stop or lose data.",
    explanation: "In Centralized VCS like SVN, the central server is a SPOF. If the server goes down, no developer can commit, branch, or view history. If the central disk crashes without backups, all historical commits and tags are permanently erased.",
    hint: "Think about what happens if the only server holding your project history crashes.",
    level: "basic",
    codeExample: "# In CVCS, if server goes down:\nsvn commit # Error: Server connection refused"
  },
  {
    question: "How does Git eliminate the Single Point of Failure problem?",
    shortAnswer: "Every clone contains the full commit history and object database, acting as an autonomous backup.",
    explanation: "Because Git is distributed, every developer's laptop has a 100% complete copy of the repository. If GitHub or a company's internal server dies, any developer can push their local repository to a new server, instantly restoring the entire project history.",
    hint: "Where is the full history stored in Git?",
    level: "basic",
    codeExample: "# Any clone can seed a new remote server:\ngit remote set-url origin https://new-server.com/repo.git\ngit push --all origin"
  },
  {
    question: "Why can Git execute commits, logs, and diffs so much faster than SVN?",
    shortAnswer: "Git reads and writes directly to the local SSD filesystem inside `.git`, while SVN requires network round-trips to the central server.",
    explanation: "In SVN, running `svn diff` or `svn log` sends network packets across the internet to the server, queries the database, and streams the results. Git executes queries against your local DAG and compressed blobs on your local SSD in milliseconds.",
    hint: "Local SSD memory speed vs internet network latency.",
    level: "basic",
    codeExample: "# Sub-millisecond local execution:\ngit log --graph --oneline -n 10"
  },
  {
    question: "What physical file represents a branch in Git?",
    shortAnswer: "A 41-byte plain text file containing a 40-character SHA-1 commit hash followed by a newline.",
    explanation: "In Git, branches are stored inside `.git/refs/heads/<branch-name>`. Creating a branch doesn't copy files or directories; it simply writes a 41-byte file containing the current commit hash, making branch creation take under 1 millisecond.",
    hint: "Check the contents of `.git/refs/heads/main`.",
    level: "basic",
    codeExample: "# View actual branch pointer file:\ncat .git/refs/heads/main\n# Output: 7f2a1b9c8d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a"
  },
  {
    question: "Why was branching considered dangerous or painful in Centralized VCS?",
    shortAnswer: "Because branching in CVCS was slow, copied directories on the server, and merging divergent branches was notoriously error-prone.",
    explanation: "In SVN, branching created a physical copy of the `/trunk` directory under `/branches/feature`. Merging required manually tracking revision ranges (e.g. `svn merge -r 100:150`), often resulting in lost edits and conflicts, leading to the term 'merge hell'.",
    hint: "Manual revision range tracking in SVN merges.",
    level: "intermediate",
    codeExample: "# Complex SVN merge requiring manual revision numbers:\nsvn merge -r 1200:1250 http://svn.server.com/repo/branches/feature"
  },
  {
    question: "How does Git's 3-way merge algorithm compare to older CVCS merges?",
    shortAnswer: "Git automatically finds the Best Common Ancestor (merge base) between two branches using the DAG and automatically merges non-conflicting changes.",
    explanation: "Because Git stores an immutable Directed Acyclic Graph (DAG) of commits with parent pointers, running `git merge` automatically finds the exact common ancestor commit (the merge base) and computes a 3-way diff between base, branch A, and branch B.",
    hint: "Git finds the merge base automatically using commit parent pointers.",
    level: "intermediate",
    codeExample: "# Find merge base commit automatically:\ngit merge-base main feature/payment"
  },
  {
    question: "Can two Git developers collaborate if their company's internet connection fails?",
    shortAnswer: "Yes, developers on the same local network or Wi-Fi can pull and fetch directly from each other over SSH or Git protocol.",
    explanation: "Because every Git repository is a standalone server, Developer Sachin in Barrackpore can run `git pull susmita@192.168.1.15:/path/to/repo` directly over LAN, exchanging commits and collaborating without any cloud connection.",
    hint: "Peer-to-peer repository synchronization.",
    level: "intermediate",
    codeExample: "# Peer-to-peer git fetch over local network:\ngit fetch user@192.168.1.20:/home/user/project feature/login"
  },
  {
    question: "What is 'packfile compression' in Git and why does it keep clones compact?",
    shortAnswer: "Git compresses objects with zlib and uses sliding-window delta compression to store file differences efficiently in `.pack` files.",
    explanation: "When Git packs objects (via `git gc` or before network transfer), it identifies similar files across history, stores one full version, and stores the others as compact binary deltas, dramatically reducing repository size on disk.",
    hint: "Delta compression inside packfiles.",
    level: "intermediate",
    codeExample: "# Manually trigger repository optimization and repacking:\ngit gc --aggressive --prune=now"
  },
  {
    question: "What happens if a developer creates commits offline in Git and later connects to the internet?",
    shortAnswer: "All local commits remain safely recorded; the developer simply runs `git push` to upload their commit chain to the remote server.",
    explanation: "When offline, you can create 50 commits across 5 branches. When you regain internet access, running `git push origin <branch>` transfers the commit objects to the server in a single fast network transaction.",
    hint: "Local commits are preserved and pushed in bulk.",
    level: "intermediate",
    codeExample: "# Push 10 offline commits at once:\ngit push origin main"
  },
  {
    question: "Why do Centralized VCS systems require file locking in some legacy teams?",
    shortAnswer: "Because merge resolution in CVCS was so difficult that teams locked files to prevent simultaneous editing by two developers.",
    explanation: "Older tools like Visual SourceSafe and early CVS supported pessimistic file locking (`checkout -lock`), meaning only one developer could edit a file at a time. Git uses optimistic non-blocking concurrency where multiple developers edit files simultaneously and merge changes cleanly.",
    hint: "Pessimistic file locking vs optimistic branch merging.",
    level: "intermediate",
    codeExample: "# Git allows simultaneous editing without file locking."
  },
  {
    question: "What is the difference between CVCS revision numbers and Git commit hashes?",
    shortAnswer: "CVCS uses sequential integers (1, 2, 3...) assigned by the server; Git uses 160-bit SHA hashes generated locally and deterministically.",
    explanation: "In SVN, commit numbers are sequential because a single server assigns IDs. In Git, millions of developers create commits offline without a central coordinator; cryptographic SHA hashes guarantee globally unique IDs based on tree contents, parent hash, author, and timestamp.",
    hint: "Central sequence counter vs decentralized cryptographic fingerprint.",
    level: "intermediate",
    codeExample: "# Inspect full 40-character SHA-1 hash:\ngit rev-parse HEAD"
  },
  {
    question: "What are the security advantages of Git's decentralized cryptographic model?",
    shortAnswer: "History is immutable; no rogue server administrator or hacker can alter a past commit without breaking every subsequent SHA hash.",
    explanation: "In CVCS, a database administrator on the central server could modify file contents in a historical revision without leaving a cryptographic trail. In Git, every commit hash includes the hash of its parent commit, forming an immutable Merkle tree audit ledger.",
    hint: "Merkle tree parent hash chaining prevents tampering.",
    level: "advanced",
    codeExample: "# Verify commit signature with GPG:\ngit verify-commit HEAD"
  },
  {
    question: "What is a 'bare' repository in Git compared to a standard repository?",
    shortAnswer: "A bare repository contains only the `.git` database without a checked-out working directory; it is used on servers to receive pushes.",
    explanation: "Standard repositories have working files where developers edit code. Server repositories (like those on GitHub or internal Linux servers) are initialized with `git init --bare` so multiple developers can push commits without conflicting with a server working directory.",
    hint: "Server repository with no working tree files.",
    level: "advanced",
    codeExample: "# Create a bare remote repository on a server:\ngit init --bare /var/git/project.git"
  },
  {
    question: "How does Git handle binary files compared to Perforce (CVCS)?",
    shortAnswer: "Perforce was built specifically for massive binary assets; Git requires Git LFS (Large File Storage) to handle giant binaries efficiently.",
    explanation: "Because Git clones download full history, storing gigabytes of uncompressed 3D models or video files directly in Git bloats the repo. Perforce handles massive binaries natively, while Git uses Git LFS to replace binaries with text pointers and store heavy files on cloud storage.",
    hint: "Git LFS for large binaries vs Perforce native handling.",
    level: "advanced",
    codeExample: "# Track large Photoshop and 3D files with Git LFS:\ngit lfs track '*.psd'\ngit lfs track '*.blend'"
  },
  {
    question: "What is the role of Git's Directed Acyclic Graph (DAG)?",
    shortAnswer: "It is the mathematical graph structure where commits are nodes pointing backward to their parent nodes, preventing circular loops.",
    explanation: "In Git, every commit points to zero, one (normal commit), or multiple (merge commit) parents. The graph is 'directed' (arrows point backward to parents) and 'acyclic' (it is impossible to loop back to yourself), enabling fast history traversals and merge computations.",
    hint: "Nodes and directed edges with no cycles.",
    level: "advanced",
    codeExample: "# Visualize the DAG in terminal:\ngit log --graph --oneline --all"
  },
  {
    question: "Why does Git rarely suffer from corrupted repositories?",
    shortAnswer: "Git writes immutable objects atomically and validates data with checksums before writing to disk.",
    explanation: "When Git writes a blob, tree, or commit object, it writes to a temporary file and uses an atomic rename. Existing objects are never overwritten in place. Running `git fsck` checks the cryptographic validity of all objects in the database.",
    hint: "Atomic writes and `git fsck` integrity verification.",
    level: "advanced",
    codeExample: "# Verify full database integrity:\ngit fsck --full"
  },
  {
    question: "What is the difference between `git fetch` and `git pull` in terms of DVCS architecture?",
    shortAnswer: "`git fetch` updates your local copy of remote tracking branches without altering your working tree; `git pull` does a fetch plus merges into your current branch.",
    explanation: "`git fetch origin` downloads all new commit objects into your local `.git` repository safely. Your working files remain untouched. `git pull` executes `git fetch` and then runs `git merge FETCH_HEAD`, which modifies your active working files.",
    hint: "Safe remote object download vs download + automatic merge.",
    level: "basic",
    codeExample: "# Safe inspection workflow:\ngit fetch origin\ngit log HEAD..origin/main\ngit merge origin/main"
  },
  {
    question: "How does Git enable Code Review workflows like Pull Requests?",
    shortAnswer: "Developers push isolated feature branches to a shared remote repository where peers inspect diffs and discuss before merging.",
    explanation: "Because branches are cheap and isolated, developers can publish a topic branch to GitHub and open a Pull Request. CI/CD runs automated test suites and teammates review diffs line by line before the code is merged into `main`.",
    hint: "Branch isolation + cloud diff inspection + automated CI.",
    level: "basic",
    codeExample: "# Push feature branch for review:\ngit push -u origin feature/order-receipt"
  },
  {
    question: "What is the difference between CVS and Subversion (SVN)?",
    shortAnswer: "SVN was created in 2000 as a direct replacement for CVS, introducing atomic multi-file commits and directory versioning.",
    explanation: "In CVS (1990), if a network connection failed during a 5-file commit, 3 files were committed and 2 were not, leaving the repository in a broken state. SVN introduced atomic transactions (all files commit or none do).",
    hint: "CVS had non-atomic commits; SVN fixed atomic commits.",
    level: "intermediate",
    codeExample: "# SVN introduced atomic transaction revision numbers."
  },
  {
    question: "What is an 'upstream' repository in a fork-and-pull collaborative model?",
    shortAnswer: "The original authoritative repository from which a developer's personal fork was cloned.",
    explanation: "In open source and large enterprise workflows, developers fork the main repository to their account, clone locally, and configure an `upstream` remote pointing to the parent repository to pull continuous community updates.",
    hint: "The central project repository vs your personal fork.",
    level: "intermediate",
    codeExample: "# Add upstream remote to track original repo:\ngit remote add upstream https://github.com/original-org/project.git\ngit fetch upstream"
  },
  {
    question: "Why does Git make experimentation risk-free for developers?",
    shortAnswer: "You can create a temporary branch, try radical architectural changes, and if it fails, delete the branch with zero impact on main.",
    explanation: "Because branching takes milliseconds and main remains untouched, developers are encouraged to experiment freely. If an experiment works, it merges into main; if it fails, `git branch -D experiment` deletes the branch safely.",
    hint: "Cheap disposable branches protect the stable production code.",
    level: "basic",
    codeExample: "# Create experiment and discard if needed:\ngit switch -c exp/new-ui\n# If failed:\ngit switch main\ngit branch -D exp/new-ui"
  },
  {
    question: "What is the role of the reflog in Git's disaster recovery model?",
    shortAnswer: "The Reference Log (reflog) records every movement of HEAD on your local machine, allowing recovery of 'deleted' commits.",
    explanation: "Even if you accidentally delete a branch or run `git reset --hard`, the commit objects remain in your local repository for days. `git reflog` lists the exact SHA-1 hashes of where your HEAD was, allowing instant recovery.",
    hint: "Local movement log of HEAD for disaster recovery.",
    level: "advanced",
    codeExample: "# View reflog and recover a lost commit:\ngit reflog\ngit reset --hard HEAD@{2}"
  },
  {
    question: "How does Git support multiple remotes simultaneously?",
    shortAnswer: "A local Git repository can configure and synchronize with multiple remote servers (e.g. origin, upstream, backup, staging).",
    explanation: "Unlike CVCS which locks you to one central URL, Git allows you to define multiple named remotes (`origin` pointing to GitHub, `backup` pointing to GitLab, `prod` pointing to an AWS bare server) and push/fetch selectively.",
    hint: "`git remote add <name> <url>` allows multiple endpoints.",
    level: "advanced",
    codeExample: "# Configure multiple remotes:\ngit remote add backup git@gitlab.com:org/app.git\ngit push backup main"
  },
  {
    question: "Why is Git called a 'content-addressable filesystem'?",
    shortAnswer: "Because every object stored in Git is retrieved and referenced by the SHA hash of its content, not its filename.",
    explanation: "If you have 10 identical images or files with different names in different folders, Git stores the content object (blob) exactly once in its database. The directory trees merely point to the same SHA-1 hash, saving massive disk space.",
    hint: "Objects named by their cryptographic content hash.",
    level: "advanced",
    codeExample: "# Hash content without committing:\necho 'Hello Barrackpore' | git hash-object --stdin"
  },
  {
    question: "What is the primary summary difference between CVCS and DVCS in one sentence?",
    shortAnswer: "CVCS relies on a single central server for all version database queries; DVCS gives every developer a full, independent, cryptographic repository engine.",
    explanation: "Centralized VCS centralizes power and risk on one server, whereas Distributed VCS empowers every developer with total offline autonomy, instantaneous local operations, and peer-to-peer resilience.",
    hint: "Central server dependency vs decentralized local autonomy.",
    level: "basic",
    codeExample: "# DVCS gives every developer full control over history."
  }
];

export default questions;
