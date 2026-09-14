/**
 * Topic 12 Questions: Classroom Dialogue: Sukanta Sir and Barrackpore students on why Git is essential for every developer
 * Total Questions: 25 (MCQ + Conceptual + Scenario-based)
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "Why does Sukanta Sir emphasize that Git is NOT the same as GitHub?",
    options: [
      "Git is a local, distributed command-line version control engine, whereas GitHub is a cloud hosting service that hosts Git repositories with social collaboration tools",
      "Git is only for Windows while GitHub is only for macOS",
      "Git is an operating system kernel, whereas GitHub is a browser",
      "Git requires a paid subscription while GitHub is free"
    ],
    answer: "Git is a local, distributed command-line version control engine, whereas GitHub is a cloud hosting service that hosts Git repositories with social collaboration tools",
    explanation: "Git is the core VCS tool developed in 2005. GitHub, GitLab, and Bitbucket are cloud hosting platforms built on top of Git."
  },
  {
    id: 2,
    question: "How does Git benefit a solo developer working alone on a project with no teammates?",
    options: [
      "It doesn't provide any benefit for solo developers",
      "It provides time-travel undo capabilities, safe feature branching without fear of breaking working code, and immutable backup logs",
      "It automatically writes unit tests for the code",
      "It converts JavaScript code into C++"
    ],
    answer: "It provides time-travel undo capabilities, safe feature branching without fear of breaking working code, and immutable backup logs",
    explanation: "Solo developers gain experimental freedom, safety nets, bug isolation, and clear chronological project milestones with Git."
  },
  {
    id: 3,
    question: "Why is saving copies of project folders named 'final_v2_final_latest.zip' considered an antipattern?",
    options: [
      "ZIP files cannot be unzipped on Linux",
      "It wastes disk space, provides no granular line-by-line diffs, offers no commit author accountability, and makes collaborative merging impossible",
      "ZIP files automatically delete source code after 30 days",
      "ZIP files change file extensions"
    ],
    answer: "It wastes disk space, provides no granular line-by-line diffs, offers no commit author accountability, and makes collaborative merging impossible",
    explanation: "Ad-hoc folder copying lacks differential tracking, metadata, history searchability, and collaborative merge capabilities."
  },
  {
    id: 4,
    question: "What is the primary role of an 'Atomic Commit' as explained by Sukanta Sir?",
    options: [
      "A commit containing changes across 50 different unrelated features",
      "A small, self-contained commit that does one single logical task completely, making bug bisecting and reverting clean and safe",
      "A commit that requires nuclear authorization",
      "A commit created without a message"
    ],
    answer: "A small, self-contained commit that does one single logical task completely, making bug bisecting and reverting clean and safe",
    explanation: "Atomic commits encapsulate a single logical change, ensuring they can be cherry-picked, reviewed, or reverted without side-effects."
  },
  {
    id: 5,
    question: "When Swadeep asks if Git requires internet access to create commits and branches, what is Sukanta Sir's answer?",
    options: [
      "Yes, Git always talks to a central server",
      "No, Git is completely distributed; all commits, branches, logs, and diffs are recorded locally without needing any internet connection",
      "Only on Mondays",
      "Only if GitHub CLI is installed"
    ],
    answer: "No, Git is completely distributed; all commits, branches, logs, and diffs are recorded locally without needing any internet connection",
    explanation: "As a DVCS, Git operates 100% locally. Network access is only needed when interacting with remote repositories."
  },
  {
    id: 6,
    question: "How does Git enable seamless CI/CD automation in DevOps pipelines?",
    options: [
      "Git sends emails to developers",
      "Every commit or push acts as an automated trigger for CI/CD runners (like GitHub Actions) to test, build, and deploy software",
      "Git compiles Java code directly inside .git",
      "Git manages Kubernetes clusters directly"
    ],
    answer: "Every commit or push acts as an automated trigger for CI/CD runners (like GitHub Actions) to test, build, and deploy software",
    explanation: "Modern CI/CD pipelines listen for Git webhook events (push, pull request, tag) to trigger automated test and deployment jobs."
  },
  {
    id: 7,
    question: "What is the recommended writing style for Git commit messages?",
    options: [
      "Past tense in all lowercase ('fixed bug')",
      "Imperative mood in the present tense (e.g., 'fix: resolve authentication timeout on login')",
      "Random emojis only",
      "Single word messages like 'update', 'done', 'changes'"
    ],
    answer: "Imperative mood in the present tense (e.g., 'fix: resolve authentication timeout on login')",
    explanation: "Standard Git commit conventions use the imperative present tense ('add', 'fix', 'refactor') matching Git's own generated messages."
  },
  {
    id: 8,
    question: "In the Barrackpore lab discussion, what did Tuhina learn about the 'working tree'?",
    options: [
      "It is a directory in the cloud",
      "It represents the active files currently checked out on disk for editing and compiling",
      "It is a tree structure inside the RAM",
      "It is the .git folder"
    ],
    answer: "It represents the active files currently checked out on disk for editing and compiling",
    explanation: "The working tree consists of the actual files on your filesystem that you edit with your IDE."
  },
  {
    id: 9,
    question: "What does Abhronila realize when Sukanta Sir explains Git's cryptographic SHA hashing?",
    options: [
      "Git can detect even a single modified space or comma across any file in any historical revision",
      "Git encrypts the code so no one can read it",
      "SHA hashes make Git slower than SVN",
      "Hashing is only used for user passwords"
    ],
    answer: "Git can detect even a single modified space or comma across any file in any historical revision",
    explanation: "Cryptographic hash trees ensure that any data modification changes the hash, preventing silent corruption or tampering."
  },
  {
    id: 10,
    question: "Why should developers avoid committing large binary video files directly into Git repositories?",
    options: [
      "Git is optimized for text diffs; storing large binaries inflates repository size permanently for every clone unless using Git LFS",
      "Git cannot read video files",
      "GitHub bans all video files",
      "Videos corrupt the .git directory"
    ],
    answer: "Git is optimized for text diffs; storing large binaries inflates repository size permanently for every clone unless using Git LFS",
    explanation: "Because Git preserves all object versions forever, huge binaries bloat the repository clone size. Git LFS (Large File Storage) solves this."
  },
  {
    id: 11,
    question: "What makes Git branching fundamentally superior to branching in older centralized systems like CVS or SVN?",
    options: [
      "Git branches require manual server approval",
      "Git branching takes milliseconds by creating a tiny pointer file, without copying code files",
      "Git only allows one branch per repository",
      "Git branches delete older commits"
    ],
    answer: "Git branching takes milliseconds by creating a tiny pointer file, without copying code files",
    explanation: "In Git, branching is an O(1) operation involving writing a 41-byte text file, whereas SVN copied entire directory trees on the server."
  },
  {
    id: 12,
    question: "What did Sachin learn about resolving merge conflicts during team collaboration?",
    options: [
      "Merge conflicts are a normal part of collaboration when two developers edit the same lines in the same file; Git marks conflicts clearly for resolution",
      "Merge conflicts mean the repository is permanently corrupted",
      "The developer with the faster computer always wins the conflict",
      "Git automatically deletes conflicting files"
    ],
    answer: "Merge conflicts are a normal part of collaboration when two developers edit the same lines in the same file; Git marks conflicts clearly for resolution",
    explanation: "Conflicts occur naturally in parallel development; Git preserves both versions with conflict markers (<<<<<<<, =======, >>>>>>>) for manual reconciliation."
  },
  {
    id: 13,
    question: "Why is Git considered a career-defining skill for junior software engineers?",
    options: [
      "Because every modern software company, open-source project, and DevOps pipeline uses Git for collaboration and code review",
      "Because Git replaces the need to learn programming languages",
      "Because Git is required by law",
      "Because Git runs on mainframes"
    ],
    answer: "Because every modern software company, open-source project, and DevOps pipeline uses Git for collaboration and code review",
    explanation: "Git is the ubiquitous industry standard for code collaboration, pull requests, code reviews, and automated deployments worldwide."
  },
  {
    id: 14,
    question: "What is the primary danger of working directly on the 'main' or 'production' branch?",
    options: [
      "An untested experimental commit or typo can immediately break production or block the entire engineering team",
      "The computer will run out of memory",
      "GitHub will freeze the account",
      "The hard drive will crash"
    ],
    answer: "An untested experimental commit or typo can immediately break production or block the entire engineering team",
    explanation: "Best engineering practices dictate isolating new work on feature branches, merging into 'main' only via reviewed Pull Requests."
  },
  {
    id: 15,
    question: "What is the function of the staging area (index) that Sukanta Sir called 'the photographic viewfinder'?",
    options: [
      "It allows developers to curate and review exactly which changes and files will be included in the next snapshot commit",
      "It automatically applies camera filters to code",
      "It pushes code to staging servers",
      "It deletes unwanted code"
    ],
    answer: "It allows developers to curate and review exactly which changes and files will be included in the next snapshot commit",
    explanation: "The index provides fine-grained control to stage and commit specific modified files (or even specific lines with 'git add -p')."
  },
  {
    id: 16,
    question: "Which Git command did Susmita use to view the chronological commit history in the lab?",
    options: [
      "git log --oneline --graph --all",
      "git show history",
      "git timeline",
      "git trace-all"
    ],
    answer: "git log --oneline --graph --all",
    explanation: "'git log --oneline --graph --all' renders an ASCII tree of all commits, branches, and merges."
  },
  {
    id: 17,
    question: "What role does Git play in Open-Source software contributions?",
    options: [
      "Contributors fork a repository, make changes in a feature branch, and submit a Pull Request for review by maintainers",
      "Contributors email floppy disks to project maintainers",
      "Contributors overwrite the master repository directly",
      "Open-source projects do not use Git"
    ],
    answer: "Contributors fork a repository, make changes in a feature branch, and submit a Pull Request for review by maintainers",
    explanation: "The Fork & Pull Request workflow is the universal mechanism powering global open-source software collaboration."
  },
  {
    id: 18,
    question: "What did Mahima discover when experimenting with 'git checkout -b feature-test'?",
    options: [
      "It creates and switches to the new branch 'feature-test' in a single command",
      "It deletes all current files",
      "It reboots the system",
      "It commits all unstaged files"
    ],
    answer: "It creates and switches to the new branch 'feature-test' in a single command",
    explanation: "'git checkout -b' (or modern 'git switch -c') creates a new branch and immediately checks it out."
  },
  {
    id: 19,
    question: "What is the significance of the '.gitignore' file discussed in the Barrackpore mentorship session?",
    options: [
      "It tells Git to ignore sensitive files, API keys, build artifacts (dist/, build/), and dependencies (node_modules/) so they are not tracked",
      "It makes Git ignore all syntax errors in JavaScript",
      "It hides files in Windows File Explorer",
      "It disables Git commands in that folder"
    ],
    answer: "It tells Git to ignore sensitive files, API keys, build artifacts (dist/, build/), and dependencies (node_modules/) so they are not tracked",
    explanation: "'.gitignore' prevents cluttering the repository with generated binaries, dependencies, temporary files, and environment secrets."
  },
  {
    id: 20,
    question: "What advice did Sukanta Sir give regarding commit frequency?",
    options: [
      "Commit often with small logical units rather than waiting until the end of the week for one massive monolithic commit",
      "Commit only once per month",
      "Never commit until the entire project is completed",
      "Commit every 30 seconds automatically"
    ],
    answer: "Commit often with small logical units rather than waiting until the end of the week for one massive monolithic commit",
    explanation: "Frequent, atomic commits make tracking progress, identifying regressions, and rolling back issues effortless."
  },
  {
    id: 21,
    question: "Why is Git called a 'Content-Addressable Storage System'?",
    options: [
      "Because objects are retrieved based on the SHA hash of their content, not their file name or location",
      "Because Git stores street addresses of developers",
      "Because it works like an email server",
      "Because it is an address book for programmers"
    ],
    answer: "Because objects are retrieved based on the SHA hash of their content, not their file name or location",
    explanation: "Git indexes and locates every blob, tree, and commit by the cryptographic hash of its payload."
  },
  {
    id: 22,
    question: "What happens if two developers create the exact same commit with the same tree, author, timestamp, and message?",
    options: [
      "They generate the identical SHA hash and share the same commit object in Git",
      "Git crashes due to hash collision",
      "The second commit is rejected",
      "Git assigns random numbers to distinguish them"
    ],
    answer: "They generate the identical SHA hash and share the same commit object in Git",
    explanation: "Deterministic hashing guarantees that identical inputs always produce identical object hashes."
  },
  {
    id: 23,
    question: "How does Git protect intellectual property and audit compliance in corporate environments?",
    options: [
      "Every commit is cryptographically tied to author name, email, timestamp, and optional GPG cryptographic signatures",
      "Git locks the computer after 5 PM",
      "Git requires fingerprint scanners",
      "Git deletes code if leaked"
    ],
    answer: "Every commit is cryptographically tied to author name, email, timestamp, and optional GPG cryptographic signatures",
    explanation: "Immutable commit history with cryptographic signatures provides non-repudiation and clear provenance audit trails."
  },
  {
    id: 24,
    question: "What is the primary message Sukanta Sir leaves the students with at the end of Module 001_001?",
    options: [
      "Mastering Git fundamentals early transforms you from a code copy-paster into a disciplined, fearless software engineer",
      "Git is just a tool to memorize for exams",
      "You only need GUI apps like GitHub Desktop",
      "Never learn Git CLI"
    ],
    answer: "Mastering Git fundamentals early transforms you from a code copy-paster into a disciplined, fearless software engineer",
    explanation: "A solid command of Git architecture gives developers confidence to experiment, collaborate, and build complex software fearlessly."
  },
  {
    id: 25,
    question: "True or False: If GitHub experiences an outage, developers can still commit, branch, diff, and review history locally using Git.",
    options: [
      "True",
      "False"
    ],
    answer: "True",
    explanation: "Git's distributed nature means your local repository has 100% of all history and functionality, continuing uninterrupted even when cloud hosts are down."
  }
];

export default questions;
