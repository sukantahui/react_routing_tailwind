/**
 * Topic 0 FAQ Assessment Questions:
 * "What is Version Control and why software projects fail without it"
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  // ─── BASIC QUESTIONS (1 - 9) ──────────────────────────────────────────
  {
    id: "vcs-q1",
    question: "What is a Version Control System (VCS)?",
    shortAnswer: "A software system that records changes to a file or set of files over time so specific versions can be recalled, audited, and compared later.",
    options: [
      "A software system that records changes to files over time to enable history recall and collaboration",
      "A cloud backup hard drive that automatically compresses .zip folders",
      "A compiler plugin that formats source code syntax before runtime",
      "A database server used solely for storing user login credentials"
    ],
    answer: "A software system that records changes to files over time to enable history recall and collaboration",
    explanation: "A Version Control System (VCS) acts as an immutable ledger and time machine for code. It tracks who made changes, when they were made, what was changed, and why, allowing developers to revert bad states and collaborate seamlessly.",
    hint: "Think about having a full historical log with undo/redo capabilities.",
    level: "basic",
    codeExample: "# Check repository history in Git:\ngit log --oneline"
  },
  {
    id: "vcs-q2",
    question: "Why is saving files as 'project_v1.zip', 'project_final.zip', 'project_final_FINAL.zip' considered an anti-pattern?",
    shortAnswer: "Manual naming is error-prone, consumes unnecessary disk space, offers no atomic diffs, and causes silent file overwrites during team collaboration.",
    options: [
      "It is perfectly fine for small teams of 2 to 3 developers",
      "It provides no concurrency safety, lacks line-by-line diffs, and causes accidental overwrites",
      "It makes the operating system kernel run out of file descriptors",
      "Zip files are encrypted and cannot be opened on Linux operating systems"
    ],
    answer: "It provides no concurrency safety, lacks line-by-line diffs, and causes accidental overwrites",
    explanation: "Manual zip backups provide zero visibility into what changed between revisions. When multiple team members save over the same folder, late saves silently destroy prior work without triggering conflicts.",
    hint: "What happens if two developers edit the same file in a shared folder simultaneously?",
    level: "basic",
    codeExample: "# In Git, changes are tracked automatically without duplicating folders:\ngit status"
  },
  {
    id: "vcs-q3",
    question: "What are the '5 W's' captured by every proper Version Control commit?",
    shortAnswer: "Who (Author), When (Timestamp), What (Diff), Where (Files/Tree), and Why (Commit Message).",
    options: [
      "Who, When, What, Where, and Why",
      "Width, Weight, Window, Web, and Wireless",
      "Windows, Webpack, WebSocket, Worker, and Wrapper",
      "Write, Wait, Watch, Wipe, and Warning"
    ],
    answer: "Who, When, What, Where, and Why",
    explanation: "Every VCS commit records metadata: Who made the commit (Author & Email), When it was committed (Timestamp), What was changed (Delta/Diff), Where it changed (File paths), and Why it was done (Descriptive commit message).",
    hint: "Consider the audit trail required when investigating a software regression.",
    level: "basic",
    codeExample: "git show HEAD"
  },
  {
    id: "vcs-q4",
    question: "How does a Version Control System prevent accidental file loss?",
    shortAnswer: "By storing immutable snapshots and tracking changes in a dedicated internal database (.git directory).",
    options: [
      "By storing immutable history snapshots in an internal object store",
      "By permanently write-protecting the user's hard drive",
      "By uploading all files to a public FTP server every 5 seconds",
      "By disallowing the use of the delete key in text editors"
    ],
    answer: "By storing immutable history snapshots in an internal object store",
    explanation: "Once code is committed into a VCS like Git, the snapshot is immutably stored in the repository database. Even if you accidentally delete files in your working directory, Git can restore them instantly.",
    hint: "Think about restoring deleted files from your repository database.",
    level: "basic",
    codeExample: "# Restore a deleted file from the latest commit:\ngit restore deleted_file.js"
  },
  {
    id: "vcs-q5",
    question: "What is the primary difference between a simple cloud drive (like Google Drive or Dropbox) and a VCS like Git?",
    shortAnswer: "Cloud drives synchronize whole file states on save; a VCS provides intentional atomic commits, line-by-line diffs, branching, and merge conflict resolution.",
    options: [
      "VCS allows atomic snapshots, branch isolation, and line-by-line conflict resolution",
      "Cloud drives only work on Windows, whereas Git works only on Linux",
      "Git is a paid enterprise service while cloud storage is always free",
      "There is no difference; both are identical backup systems"
    ],
    answer: "VCS allows atomic snapshots, branch isolation, and line-by-line conflict resolution",
    explanation: "Cloud storage synchronizes every autosave blindly, leading to 'conflicted copy' files when two developers write code. Git requires intentional commits and understands code structure, enabling automatic 3-way line merging.",
    hint: "Can Dropbox intelligently merge two edits made on different functions in the same file?",
    level: "basic",
    codeExample: "# Git performs intelligent merge reconciliation:\ngit merge feature-branch"
  },
  {
    id: "vcs-q6",
    question: "What is a 'Commit' in Version Control terminology?",
    shortAnswer: "An intentional, immutable snapshot of staged changes recorded with an author, timestamp, and descriptive message.",
    options: [
      "A permanent checkpoint/snapshot of your staged changes in the repository history",
      "A temporary file saved when your computer runs out of RAM",
      "A command that uploads files directly to a public server without local verification",
      "An automated test script that runs inside the browser console"
    ],
    answer: "A permanent checkpoint/snapshot of your staged changes in the repository history",
    explanation: "A commit is a discrete milestone in your project. Like a game save point, it captures the exact state of your code so you can return to it at any time.",
    hint: "Think of a save checkpoint in a video game.",
    level: "basic",
    codeExample: 'git commit -m "feat(auth): implement student login endpoint"'
  },
  {
    id: "vcs-q7",
    question: "What is a 'Working Directory' (or Working Tree) in a version-controlled project?",
    shortAnswer: "The actual folder on your local filesystem containing the active files you are currently editing.",
    options: [
      "The local directory containing the uncompressed files you are actively editing and compiling",
      "The remote server room hosted at GitHub headquarters",
      "The hidden internal cache where Git stores compressed binary blobs",
      "The operating system's temporary swap partition"
    ],
    answer: "The local directory containing the uncompressed files you are actively editing and compiling",
    explanation: "The Working Tree is your active sandbox. It extracts a specific revision from the repository database onto your disk so you can write code in your IDE (VS Code, etc.).",
    hint: "Where do your `.js` and `.html` files actually sit on your laptop?",
    level: "basic",
    codeExample: "# Check what has changed in your working tree:\ngit status"
  },
  {
    id: "vcs-q8",
    question: "Why should commit messages be descriptive rather than generic (e.g. 'fixed stuff', 'changes')?",
    shortAnswer: "Descriptive messages explain the 'why' and context of changes, making future debugging, auditing, and reviews efficient.",
    options: [
      "Descriptive messages provide essential context when debugging or auditing regressions later",
      "The Git compiler throws a fatal syntax error if a message is shorter than 20 characters",
      "Short messages corrupt the SHA-1 cryptographic checksum calculation",
      "GitHub automatically rejects repositories with short commit messages"
    ],
    answer: "Descriptive messages provide essential context when debugging or auditing regressions later",
    explanation: "When a bug appears six months later, reading 'fix(payment): resolve ₹0 invoice rounding error' immediately informs the team, whereas 'changes' forces engineers to read hundreds of diff lines blindly.",
    hint: "Imagine having to read 50 commits called 'update' during a midnight production outage.",
    level: "basic",
    codeExample: '# Good commit message:\ngit commit -m "fix(tax): correct GST rate calculation for West Bengal intra-state supply"'
  },
  {
    id: "vcs-q9",
    question: "Which of the following is an open-source distributed version control system?",
    shortAnswer: "Git.",
    options: [
      "Git",
      "Microsoft Excel 2019",
      "Adobe Photoshop",
      "Google Chrome Developer Tools"
    ],
    answer: "Git",
    explanation: "Git is the world's most widely adopted open-source distributed version control system, created by Linus Torvalds in 2005.",
    hint: "Created originally for the Linux kernel development.",
    level: "basic",
    codeExample: "git --version"
  },

  // ─── INTERMEDIATE QUESTIONS (10 - 18) ─────────────────────────────────
  {
    id: "vcs-q10",
    question: "What is the 'Single Point of Failure' vulnerability in Centralized VCS (CVCS) like SVN or CVS?",
    shortAnswer: "If the central server goes down or gets corrupted, no developer can commit, branch, or access project history.",
    options: [
      "If the central repository server is offline or corrupt, all developers lose commit and history capabilities",
      "Centralized systems cannot store text files larger than 1 megabyte",
      "Developers must use floppy disks to transfer files between branches",
      "The central server requires manual rebooting after every 10 commits"
    ],
    answer: "If the central repository server is offline or corrupt, all developers lose commit and history capabilities",
    explanation: "In CVCS, the central server holds the entire database. If the network drops or the server's disk dies without a backup, all history is lost. In DVCS (Git), every local clone is a 100% complete backup.",
    hint: "What happens in SVN if you are on a train with no Wi-Fi?",
    level: "intermediate",
    codeExample: "# In Git, full history operations work 100% offline:\ngit log --graph"
  },
  {
    id: "vcs-q11",
    question: "What is the difference between delta-based version control and snapshot-based version control?",
    shortAnswer: "Delta-based stores file changes as incremental diffs; snapshot-based (Git) records the complete tree state at each commit, using pointers for unchanged files.",
    options: [
      "Delta systems store list of file diffs; Git stores a mini-filesystem snapshot with pointers to unchanged blobs",
      "Delta systems only work on numbers; snapshot systems only work on strings",
      "Delta-based systems are always 100x faster than snapshot systems",
      "Snapshot systems take physical screenshots of your desktop monitor"
    ],
    answer: "Delta systems store list of file diffs; Git stores a mini-filesystem snapshot with pointers to unchanged blobs",
    explanation: "Traditional systems (CVS/SVN) thought of data as a base file plus a series of incremental diffs (deltas). Git thinks of data as a stream of snapshots over time; if a file hasn't changed, Git simply links to the previously stored blob.",
    hint: "Think of Git as taking a permanent picture of the whole project directory.",
    level: "intermediate",
    codeExample: "# Inspect object types representing trees and snapshots:\ngit cat-file -t HEAD"
  },
  {
    id: "vcs-q12",
    question: "In a team environment, how does a Version Control System handle two developers editing different lines of the same file?",
    shortAnswer: "It performs an automated 3-way merge, combining both changes into the file without manual intervention.",
    options: [
      "It automatically merges both non-conflicting changes cleanly using 3-way merge algorithms",
      "It deletes the file and asks both developers to re-type their code from memory",
      "It accepts the file from whichever developer has higher administrative privileges",
      "It silently discards the earlier commit and keeps only the latest timestamp"
    ],
    answer: "It automatically merges both non-conflicting changes cleanly using 3-way merge algorithms",
    explanation: "Because VCS tracks changes down to the exact line number, if Sachin edits line 10 and Mahima edits line 50 of the same file, Git combines both modifications automatically and seamlessly.",
    hint: "Merge conflicts only happen when changes overlap on the exact same lines.",
    level: "intermediate",
    codeExample: "git merge feature-branch"
  },
  {
    id: "vcs-q13",
    question: "What is a 'Merge Conflict' and why is it actually a safety feature rather than an error?",
    shortAnswer: "A merge conflict occurs when competing changes are made to the same lines; Git halts and asks a human to resolve it rather than making a dangerous guess.",
    options: [
      "It is a defensive safety halt preventing Git from guessing and potentially corrupting business logic",
      "It is a critical software bug in Git that requires reinstalling the operating system",
      "It occurs only when your computer hard drive runs out of free disk space",
      "It means the repository has been permanently corrupted by malicious actors"
    ],
    answer: "It is a defensive safety halt preventing Git from guessing and potentially corrupting business logic",
    explanation: "If two developers modify the exact same line with contradictory code, Git refuses to guess which one is correct. It marks the conflict cleanly and requires human verification, safeguarding production reliability.",
    hint: "Would you want Git to arbitrarily pick one developer's banking logic over another's?",
    level: "intermediate",
    codeExample: "<<<<<<< HEAD\nconst TAX_RATE = 0.18;\n=======\nconst TAX_RATE = 0.12;\n>>>>>>> feature-tax"
  },
  {
    id: "vcs-q14",
    question: "Why does Git provide superior branching speed and efficiency compared to older systems like SVN?",
    shortAnswer: "In Git, a branch is merely a 41-byte text pointer pointing to a commit SHA; in SVN, a branch is a heavy directory copy.",
    options: [
      "In Git, a branch is a lightweight 41-byte pointer to a commit hash; in SVN, it copies the entire folder structure",
      "Git compresses branches using proprietary hardware acceleration chips",
      "Git branches are stored in RAM and never written to disk",
      "Git branches cannot contain more than 5 files at a time"
    ],
    answer: "In Git, a branch is a lightweight 41-byte pointer to a commit hash; in SVN, it copies the entire folder structure",
    explanation: "Creating a branch in Git takes less than a millisecond because it merely writes a commit SHA hash to a file in `.git/refs/heads/`. In SVN, creating a branch was a slow, server-heavy full directory duplication.",
    hint: "Look inside `.git/refs/heads/main`—it is just one line containing a 40-character SHA hash!",
    level: "intermediate",
    codeExample: "# Creating a branch in Git is instantaneous:\ngit branch feature-new-ui"
  },
  {
    id: "vcs-q15",
    question: "What role does the hidden `.git` directory play in a project initialized with Git?",
    shortAnswer: "It contains the entire repository database, object storage (blobs, trees, commits), configurations, and reference pointers.",
    options: [
      "It is the complete repository database holding all historical snapshots, objects, configs, and refs",
      "It is a temporary cache folder that can be deleted safely every morning",
      "It contains the installer files for updating Git to the latest version",
      "It stores the browser cookies for GitHub web authentication"
    ],
    answer: "It is the complete repository database holding all historical snapshots, objects, configs, and refs",
    explanation: "The `.git` folder IS the repository. The other files in your project are just working copies checked out from `.git`. If you delete `.git`, you delete the entire history and version control tracking for that project.",
    hint: "Never delete `.git` unless you intend to completely remove version tracking.",
    level: "intermediate",
    codeExample: "# Inspect contents of .git directory:\nls -la .git"
  },
  {
    id: "vcs-q16",
    question: "How does Version Control enable safe experimentation through feature branching?",
    shortAnswer: "Developers can branch off production code, experiment freely, and either merge the feature or delete the branch with zero impact on the stable codebase.",
    options: [
      "By isolating experimental code on a separate branch without impacting the main stable codebase",
      "By executing code in a cloud sandbox before allowing it to touch the local CPU",
      "By encrypting the experimental code so nobody else can see it",
      "By automatically converting dynamic code into static HTML files"
    ],
    answer: "By isolating experimental code on a separate branch without impacting the main stable codebase",
    explanation: "Feature branches provide complete isolation. A developer in Kolkata or Barrackpore can rewrite entire architectures on `experiment-rewrite` while team members continue shipping bug fixes safely on `main`.",
    hint: "Think of parallel universes in sci-fi movies.",
    level: "intermediate",
    codeExample: "# Switch to a safe experimental branch:\ngit switch -c experiment-ai-feature"
  },
  {
    id: "vcs-q17",
    question: "What is 'Code Regression' and how does Version Control assist in diagnosing it?",
    shortAnswer: "A bug introduced into a previously working feature; VCS allows developers to diff historical commits and use binary search (git bisect) to find the exact breaking change.",
    options: [
      "A regression is a defect in previously working code; VCS lets you diff revisions and binary-search the exact commit that broke it",
      "A regression is when the code runs backwards in the terminal",
      "A regression occurs when an application exceeds 10,000 lines of CSS",
      "A regression is an automatic downgrade of your operating system kernel"
    ],
    answer: "A regression is a defect in previously working code; VCS lets you diff revisions and binary-search the exact commit that broke it",
    explanation: "When an existing feature breaks, VCS allows you to compare the current broken code against the last known working release to immediately spot what lines caused the regression.",
    hint: "Think about finding the needle in a haystack by comparing two known points in history.",
    level: "intermediate",
    codeExample: "# Compare working commit with broken commit:\ngit diff v1.0.0..HEAD"
  },
  {
    id: "vcs-q18",
    question: "What is meant by 'Atomic Commits' in professional Git workflows?",
    shortAnswer: "Each commit encapsulates one single, complete, logical change that leaves the project in a buildable and working state.",
    options: [
      "A commit that addresses exactly one logical task or bug fix, leaving the build in a working state",
      "A commit that requires nuclear energy verification from a cloud server",
      "A commit that must be larger than 500 files to qualify as valid",
      "A commit that automatically splits into 10 separate sub-commits"
    ],
    answer: "A commit that addresses exactly one logical task or bug fix, leaving the build in a working state",
    explanation: "An atomic commit does one thing and does it completely. It never mixes unrelated tasks (like fixing a login bug AND redesigning the footer in the same commit), making rollbacks and code reviews clean and risk-free.",
    hint: "One logical change per commit.",
    level: "intermediate",
    codeExample: '# Atomic: Only touches auth logic\ngit commit -m "fix(auth): prevent null pointer on empty password submission"'
  },

  // ─── ADVANCED QUESTIONS (19 - 26) ─────────────────────────────────────
  {
    id: "vcs-q19",
    question: "How does Git ensure cryptographic data integrity for every object and historical commit in its DAG?",
    shortAnswer: "Every blob, tree, and commit is addressed by a cryptographic hash (SHA-1 / SHA-256); modifying a single byte changes its ID and invalidates the entire chain.",
    options: [
      "By generating SHA hashes based on content and parent hashes, creating an immutable cryptographic chain",
      "By storing private RSA keys on hardware security modules inside the CPU",
      "By requiring two-factor SMS authentication for every local terminal command",
      "By password-protecting individual text files inside the operating system"
    ],
    answer: "By generating SHA hashes based on content and parent hashes, creating an immutable cryptographic chain",
    explanation: "Git is content-addressable. If anyone alters a single character in an old commit, that commit's SHA changes, which changes all child commit SHAs downstream. It is impossible to alter past history without breaking the entire cryptographic chain.",
    hint: "Think of a cryptographic Merkle tree or blockchain-like history ledger.",
    level: "advanced",
    codeExample: "# Inspect commit hash and parent hash:\ngit cat-file -p HEAD"
  },
  {
    id: "vcs-q20",
    question: "In enterprise software engineering, why is a Pull Request (PR) / Code Review workflow impossible without a VCS foundation?",
    shortAnswer: "VCS provides the precise line-by-line diffs, branch isolation, and commit context necessary for reviewers to audit, comment, and test code before merging.",
    options: [
      "VCS isolates proposed changes on branches and provides exact line diffs for peer review and automated CI checks",
      "PRs are only used to calculate developer salaries at the end of the month",
      "VCS converts JavaScript into binary machine code so managers can inspect it",
      "Without VCS, GitHub servers refuse to accept incoming HTTP web traffic"
    ],
    answer: "VCS isolates proposed changes on branches and provides exact line diffs for peer review and automated CI checks",
    explanation: "A Pull Request is a formal request to merge one branch into another. Without VCS branching and diffing, teams would have to manually compare printed code or zip files, making automated linting, CI tests, and peer auditing impossible.",
    hint: "How could automated CI/CD know what changed without branch diffs?",
    level: "advanced",
    codeExample: "# Inspect changes between current branch and main before opening PR:\ngit diff main...feature-branch"
  },
  {
    id: "vcs-q21",
    question: "What catastrophic outcome can occur when developers commit build artifacts, node_modules, or binaries into version control?",
    shortAnswer: "Repository bloat, merge conflicts in auto-generated files, performance degradation, and permanent history inflation.",
    options: [
      "Repository size balloons drastically, cloning becomes extremely slow, and auto-generated files trigger endless merge conflicts",
      "The computer operating system immediately deletes the project directory",
      "The Git command line tool converts into read-only mode permanently",
      "The node_modules folder gets uploaded to the Windows Registry"
    ],
    answer: "Repository size balloons drastically, cloning becomes extremely slow, and auto-generated files trigger endless merge conflicts",
    explanation: "VCS is built for human-authored source code. Generated binaries, dependencies (`node_modules`), and build bundles (`/dist`) change every build. Checking them in bloats the `.git` database permanently and causes merge chaos. That is why `.gitignore` is mandatory.",
    hint: "Why do we always add `node_modules/` to `.gitignore`?",
    level: "advanced",
    codeExample: "# Essential .gitignore rules:\nnode_modules/\ndist/\n.env\n*.log"
  },
  {
    id: "vcs-q22",
    question: "How does Git's distributed architecture provide superior disaster recovery over centralized VCS?",
    shortAnswer: "Every clone is a full backup of the entire project history; if the central host is destroyed, any developer's local repo can restore the complete server.",
    options: [
      "Every developer clone contains the complete historical object store and reflog, enabling full server reconstruction",
      "Git automatically uploads encrypted backups to 10 independent satellite arrays",
      "Git repositories can re-generate deleted source code using machine learning heuristics",
      "Centralized servers do not allow creating database backups"
    ],
    answer: "Every developer clone contains the complete historical object store and reflog, enabling full server reconstruction",
    explanation: "If GitHub or an enterprise GitLab server suffers total catastrophic hardware loss, any engineer who cloned the repo yesterday possesses 100% of the commits, branches, tags, and blobs needed to restore the entire corporate codebase.",
    hint: "Every clone is a complete mirror of history.",
    level: "advanced",
    codeExample: "# Push all branches and tags to a newly provisioned server:\ngit push --all new-remote\ngit push --tags new-remote"
  },
  {
    id: "vcs-q23",
    question: "What is the difference between Git (the tool) and GitHub (the platform)?",
    shortAnswer: "Git is the local open-source command-line version control software; GitHub is a cloud hosting platform and collaboration portal built on top of Git.",
    options: [
      "Git is the local VCS tool/engine; GitHub is a cloud platform for remote hosting, code reviews, and CI/CD",
      "Git was developed by Microsoft; GitHub was developed by Linus Torvalds",
      "Git is a web browser; GitHub is an operating system kernel",
      "There is no difference; they are two different brand names for the exact same software"
    ],
    answer: "Git is the local VCS tool/engine; GitHub is a cloud platform for remote hosting, code reviews, and CI/CD",
    explanation: "Git runs locally on your laptop (Windows, macOS, Linux) without needing the internet. GitHub, GitLab, and Bitbucket are cloud hosting platforms that provide remote repository storage, pull request reviews, issue tracking, and CI/CD pipelines.",
    hint: "Can you run `git init` and `git commit` on an airplane with no internet connection?",
    level: "advanced",
    codeExample: "# Git runs locally:\ngit init\n# GitHub is connected as a remote:\ngit remote add origin https://github.com/codernaccotax/repo.git"
  },
  {
    id: "vcs-q24",
    question: "If a developer accidentally commits a sensitive API key or password into Git, why does simply deleting it in the next commit NOT secure the secret?",
    shortAnswer: "Git history is immutable; the secret remains permanently recorded in the earlier commit object and can be viewed by anyone who clones the repository.",
    options: [
      "Because previous commits are permanent and the secret remains visible in historical commit diffs",
      "Because Git immediately publishes all passwords to public search engines",
      "Because text editors create hidden backup files on the desktop",
      "Because the operating system kernel prevents deleting strings that contain numbers"
    ],
    answer: "Because previous commits are permanent and the secret remains visible in historical commit diffs",
    explanation: "Git never deletes past snapshots unless history is explicitly rewritten (e.g. with `git filter-repo` or BFG Repo-Cleaner). Anyone running `git log -p` or `git checkout` on the older commit can read the secret. Once leaked, the credential must be immediately revoked at the provider!",
    hint: "Remember: Git is an append-only time machine. Deleting something today doesn't erase yesterday's photo.",
    level: "advanced",
    codeExample: "# Revoke the leaked key immediately at your provider, then scrub history:\ngit filter-repo --invert-paths --path .env"
  },
  {
    id: "vcs-q25",
    question: "How does Version Control support modern Continuous Integration and Continuous Deployment (CI/CD) pipelines?",
    shortAnswer: "VCS events (pushes, PRs, tags) trigger automated build, test, and deployment workflows based on precise commit hashes.",
    options: [
      "Webhook events on commits and pull requests automatically trigger automated test suites and deployment pipelines",
      "CI/CD engines replace the need for writing unit tests in JavaScript or Python",
      "VCS compiles code faster than native compilers by bypassing syntax checks",
      "CI/CD pipelines only execute when developers manually click a physical button in the data center"
    ],
    answer: "Webhook events on commits and pull requests automatically trigger automated test suites and deployment pipelines",
    explanation: "Modern DevOps depends entirely on Git. When a developer in Barrackpore pushes to `main` or opens a PR, GitHub Actions triggers automated test runners, Docker container builds, and cloud deployments tied directly to that commit SHA.",
    hint: "Think of Git commit triggers in GitHub Actions.",
    level: "advanced",
    codeExample: "# GitHub Actions workflow trigger:\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]"
  },
  {
    id: "vcs-q26",
    question: "During a technical interview, how would you explain why an organization should mandate Git across all software and DevOps teams?",
    shortAnswer: "Git provides end-to-end traceability, branch isolation, risk-free rollbacks, concurrent collaboration, and automated CI/CD integration, ensuring high software velocity and production stability.",
    options: [
      "Git eliminates data loss, enables fearless collaboration through branching, ensures regulatory auditability, and powers modern CI/CD automation",
      "Git is required by law for all computers connected to the public internet",
      "Git eliminates the need for software engineers to write documentation",
      "Git guarantees that code will never have syntax errors or runtime bugs"
    ],
    answer: "Git eliminates data loss, enables fearless collaboration through branching, ensures regulatory auditability, and powers modern CI/CD automation",
    explanation: "An enterprise without Git cannot scale, cannot audit changes for security compliance, cannot review code effectively, and cannot recover rapidly from production failures. Git is the fundamental nervous system of modern software engineering.",
    hint: "Structure your answer around collaboration, safety, auditing, and DevOps automation.",
    level: "advanced",
    codeExample: "# The foundational command for every enterprise project:\ngit init"
  }
];

export default questions;
