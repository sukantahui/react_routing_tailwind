/**
 * Topic 1 FAQ Dataset: Evolution of VCS (Local -> Centralized -> Distributed)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "What is a Local Version Control System (Generation 1)?",
    shortAnswer: "A system that keeps track of file revisions and patchsets on a single local computer without network synchronization capabilities.",
    explanation: "Local VCS tools (such as RCS - Revision Control System) maintained a simple patch database on a single disk. While they automated undoing local file changes, they completely lacked multi-developer team collaboration and offered zero resilience against disk corruption.",
    hint: "Think about tools that stored deltas on one local machine.",
    level: "basic",
    codeExample: "# Historical RCS command creating revision:\nci -u myfile.c"
  },
  {
    question: "What are Centralized Version Control Systems (CVCS - Generation 2)?",
    shortAnswer: "Systems where a single central server holds all historical versions, and clients checkout working copies of files over a network.",
    explanation: "Examples of CVCS include CVS, Subversion (SVN), and Perforce. Developers connect to a central master server. When committing, diffing, or viewing historical logs, a round-trip network request to the server is mandatory.",
    hint: "Think of SVN or CVS architecture.",
    level: "basic",
    codeExample: "# SVN checkout requiring live server connection:\nsvn checkout http://svn.server.com/repo/trunk"
  },
  {
    question: "What is a Distributed Version Control System (DVCS - Generation 3)?",
    shortAnswer: "A system where every client's clone is a complete repository mirror containing the full project history and object database.",
    explanation: "In DVCS (Git, Mercurial), developers do not just check out the latest snapshot of files; they mirror the entire repository locally. If the main server crashes, any developer's local repository can be used to restore the entire project history.",
    hint: "Every clone is an independent, complete server replica.",
    level: "basic",
    codeExample: "# Full repository clone with all history:\ngit clone https://github.com/org/repo.git"
  },
  {
    question: "Why is Centralized VCS considered to have a Single Point of Failure (SPOF)?",
    shortAnswer: "If the central server's hard disk dies without backups, all historical versions and logs are permanently lost.",
    explanation: "In CVCS, clients only have their individual working copies of the latest files, not the database of past revisions. If the central database is corrupted or destroyed, you only retain whatever snapshot was checked out locally. In DVCS, every developer possesses the full historical database.",
    hint: "Where does the commit history live in SVN vs Git?",
    level: "basic",
    codeExample: "# In Git, local history is self-contained in .git folder:\nls -la .git"
  },
  {
    question: "Can you commit code in Git without an internet connection?",
    shortAnswer: "Yes, 100% of commits, diffs, branches, and logs are recorded locally in the .git database with zero network connection required.",
    explanation: "Because Git is a distributed VCS, `git commit` writes directly to your local object database on your laptop. You can work during flights, remote train journeys from Barrackpore to Kolkata, or internet outages, and push to a remote server later.",
    hint: "Does 'git commit' talk to GitHub immediately?",
    level: "basic",
    codeExample: "# Commit locally offline:\ngit add .\ngit commit -m 'feat: implement offline caching layer'"
  },
  {
    question: "How do branching operations differ between Subversion (SVN) and Git?",
    shortAnswer: "SVN creates branches by copying folder directories on the central server, while Git creates branches instantly as 41-byte pointer files.",
    explanation: "In SVN, branching is heavyweight because it simulates branches via directory copying (`/trunk` to `/branches/feature`), requiring server communication. In Git, a branch is merely a 41-byte text file containing a 40-character SHA-1 commit hash, making branch creation instantaneous and memory-efficient.",
    hint: "Compare copying a directory vs writing a 40-character hash pointer.",
    level: "intermediate",
    codeExample: "# Git branch creation is instantaneous:\ngit branch feature/payment-gateway\ncat .git/refs/heads/feature/payment-gateway"
  },
  {
    question: "Why were diffs and log operations slow in Centralized VCS?",
    shortAnswer: "Because every diff and log inspection required querying the remote central server across the network.",
    explanation: "In SVN, running `svn log` or `svn diff -r 10:20` requires sending network packets to the central server, waiting for query execution, and streaming responses. In Git, the entire commit graph lives on your SSD, executing in sub-milliseconds.",
    hint: "Think about network latency vs local SSD reads.",
    level: "intermediate",
    codeExample: "# Instant local history inspection in Git:\ngit log -n 5 --stat"
  },
  {
    question: "What is delta-based storage vs snapshot-based storage in VCS evolution?",
    shortAnswer: "Old VCS systems stored base files plus a list of incremental text differences (deltas); Git stores full filesystem snapshots with SHA deduplication.",
    explanation: "Systems like CVS and SVN think of their data as a set of files and the changes (deltas) made to each file over time. Git thinks of its data more like a series of snapshots of a miniature filesystem, where unchanged files are reused via cryptographic SHA-1/SHA-256 tree pointers.",
    hint: "Delta = diff accumulation; Snapshot = miniature filesystem state.",
    level: "intermediate",
    codeExample: "# Git stores complete tree snapshots:\ngit cat-file -p HEAD"
  },
  {
    question: "How does DVCS eliminate merge bottlenecks in large software teams?",
    shortAnswer: "Developers can branch, experiment, and merge locally in parallel without requiring permissions or server locking.",
    explanation: "In CVCS, teams often used file locking or avoided branching due to painful merges. In DVCS, non-linear branching is frictionless; developers work in parallel feature branches and integrate changes using advanced 3-way merge algorithms.",
    hint: "Think about team members working simultaneously without blocking each other.",
    level: "intermediate",
    codeExample: "# Create and switch to an isolated feature branch:\ngit switch -c feature/auth-redesign"
  },
  {
    question: "What role did BitKeeper play in the evolution from CVCS to Git?",
    shortAnswer: "BitKeeper was the commercial DVCS used by the Linux kernel team from 2002 to 2005 before licensing conflicts triggered the creation of Git.",
    explanation: "In 2002, the Linux kernel community began using the proprietary DVCS BitKeeper. In 2005, the relationship between BitKeeper and the Linux community broke down over reverse-engineering disputes. This prompted Linus Torvalds to design and build Git from scratch in just a few weeks.",
    hint: "Think about the proprietary tool that inspired Git's birth in 2005.",
    level: "intermediate",
    codeExample: "# Git was created in 2005 as an open-source, ultra-fast DVCS."
  },
  {
    question: "What is cryptographic data integrity in Generation 3 VCS?",
    shortAnswer: "Everything in Git is checksummed using cryptographic hashes (SHA-1/SHA-256) before it is stored, making silent corruption impossible.",
    explanation: "In Git, every file content (blob), directory tree, and commit object is named by its cryptographic hash. It is mathematically impossible to alter the contents of a file or commit message without changing the commit hash, ensuring an immutable audit trail.",
    hint: "Can someone secretly change a historical commit without changing its hash?",
    level: "intermediate",
    codeExample: "# Inspect commit hash integrity:\ngit log -1 --format='%H %s'"
  },
  {
    question: "How does a peer-to-peer workflow work in Git without a central server?",
    shortAnswer: "Two developers can pull commits directly between their local machines over SSH or local network without any GitHub or GitLab intermediary.",
    explanation: "Because every Git repository is a full-fledged server, Developer Susmita in Barrackpore can directly pull changes from Developer Sachin on the same Wi-Fi using `git pull susmita@192.168.1.10:/projects/app`. GitHub is merely a convenient centralized host for DVCS.",
    hint: "Is GitHub technically required for Git to work across two laptops?",
    level: "intermediate",
    codeExample: "# Add peer developer's local network machine as remote:\ngit remote add peer-sachin user@192.168.1.50:/home/user/myproject\ngit fetch peer-sachin"
  },
  {
    question: "What is Mercurial (hg) and how does it relate to Git?",
    shortAnswer: "Mercurial is another Generation 3 DVCS launched in 2005 alongside Git, written primarily in Python and C.",
    explanation: "When BitKeeper revoked its license in 2005, Matt Mackall created Mercurial, while Linus Torvalds created Git. Both are modern distributed version control systems, but Git achieved dominant industry adoption due to its raw speed, flexibility, and GitHub's popularity.",
    hint: "Another open-source DVCS created in April 2005.",
    level: "intermediate",
    codeExample: "# Mercurial repository clone (for comparison):\nhg clone http://selenic.com/repo/hello"
  },
  {
    question: "Why do enterprise software companies prefer DVCS over CVCS today?",
    shortAnswer: "DVCS increases developer velocity, eliminates server downtime risks, enables robust CI/CD integration, and simplifies code review via Pull Requests.",
    explanation: "In modern agile and DevOps workflows, developers commit frequently, run isolated branch tests, and collaborate via Pull Requests. DVCS provides the architectural foundation for automated CI/CD pipelines, code reviews, and microservice repo governance.",
    hint: "Think about developer speed, automated testing, and CI/CD pipelines.",
    level: "advanced",
    codeExample: "# Feature branch workflow in modern CI/CD:\ngit switch -c feature/order-service\ngit push -u origin feature/order-service"
  },
  {
    question: "What is a 'monorepo' vs 'polyrepo' in modern DVCS architecture?",
    shortAnswer: "A monorepo stores multiple projects/microservices in a single Git repository, while polyrepo uses a separate Git repository for each service.",
    explanation: "Large tech companies (Google, Meta, Uber) use monorepos with sparse-checkout and virtual filesystem tools, while others prefer polyrepos. Git accommodates both models through tools like `git sparse-checkout` and submodules.",
    hint: "Single shared repo vs many independent repos.",
    level: "advanced",
    codeExample: "# Enable sparse-checkout for large monorepos:\ngit sparse-checkout init --cone\ngit sparse-checkout set packages/frontend"
  },
  {
    question: "What is the difference between SVN revision numbers and Git SHA-1 hashes?",
    shortAnswer: "SVN uses sequential integers (r1, r2, r3) managed by a central server, while Git uses decentralized 160-bit cryptographic SHA hashes.",
    explanation: "Because SVN has one central coordinator, it can sequentially number commits. In Git, multiple developers create commits simultaneously across disconnected computers; cryptographic hashes guarantee unique, collision-resistant commit identification without coordination.",
    hint: "Sequential integers vs decentralized cryptographic hashes.",
    level: "advanced",
    codeExample: "# Git commit hash vs SVN revision:\n# SVN: r14920\n# Git: e7a9c8b3d4f56123456789abcdef0123456789ab"
  },
  {
    question: "Why is Git's three-state model (Working Directory, Staging Area, Repository) an advancement over older VCS?",
    shortAnswer: "The Staging Area (Index) gives developers granular control to craft clean, atomic commits containing only specific changes.",
    explanation: "In older VCS, you committed entire modified files directly. Git introduces the Staging Area (`git add -p`), enabling you to review, stage specific line chunks, and produce clean atomic commits that make code review and regression debugging far more effective.",
    hint: "What does the staging area (index) allow you to do with partial files?",
    level: "advanced",
    codeExample: "# Stage specific interactive hunks:\ngit add -p src/main.js"
  },
  {
    question: "How does Git handle file renaming compared to CVS and SVN?",
    shortAnswer: "Git does not track renames with explicit metadata; it dynamically detects renames using content similarity hashing.",
    explanation: "Older VCS required special `svn mv` commands and struggled when files were renamed while being modified. Git detects renames dynamically by analyzing blob content similarity percentages during diffs and merges, drastically simplifying refactoring.",
    hint: "Dynamic content similarity detection vs explicit rename tracking.",
    level: "advanced",
    codeExample: "# Inspect commit with rename detection:\ngit log --follow -M src/App.jsx"
  },
  {
    question: "What happens when you run 'git clone' under the hood?",
    shortAnswer: "Git initializes a local repository, fetches all objects, trees, and refs from the remote, builds the local commit graph, and checks out the default branch.",
    explanation: "A clone performs three stages: 1) `git init` locally, 2) downloads the packfile containing all blobs, trees, commits, and tags from remote, 3) checks out HEAD (usually `main`) into your working directory. The result is a 100% complete mirror.",
    hint: "Init + Packfile Download + Working Tree Checkout.",
    level: "advanced",
    codeExample: "# Clone with detailed network progress:\ngit clone --progress https://github.com/torvalds/linux.git"
  },
  {
    question: "Can an enterprise run its own internal Git server instead of GitHub?",
    shortAnswer: "Yes, companies can host internal Git servers using GitLab Self-Managed, GitHub Enterprise Server, Gitea, or plain bare Git over SSH.",
    explanation: "Because Git is free, open-source software, organizations with high regulatory or data privacy constraints (banks, defense) run internal Git bare servers on private intranet networks without sending code to third-party cloud servers.",
    hint: "Think about private bare Git repositories on Linux servers.",
    level: "advanced",
    codeExample: "# Initialize a bare Git server on Linux:\ngit init --bare /srv/git/banking_app.git"
  },
  {
    question: "What is a 'fast-forward' merge in Git that was impossible in Centralized VCS?",
    shortAnswer: "A merge where the target branch pointer simply moves forward along the commit history without creating an extra merge commit.",
    explanation: "If no divergent commits exist on the base branch, Git simply advances the branch pointer to the tip of the incoming branch. Older CVCS always required committing a new revision to represent branch unification.",
    hint: "Pointer movement vs creating an artificial merge node.",
    level: "advanced",
    codeExample: "# Fast-forward merge:\ngit switch main\ngit merge --ff-only feature/login"
  },
  {
    question: "How does Git ensure backward compatibility across different operating systems?",
    shortAnswer: "Git uses platform-neutral internal object formats and handles OS differences (like CRLF/LF line endings and file permissions) through config filters.",
    explanation: "Windows uses CRLF (`\\r\\n`), Linux/macOS use LF (`\\n`). Git normalizes all text files to LF internally in its object database and converts them upon checkout based on `core.autocrlf` or `.gitattributes`.",
    hint: "Line ending normalization (CRLF vs LF).",
    level: "basic",
    codeExample: "# Set recommended Windows line ending filter:\ngit config --global core.autocrlf true"
  },
  {
    question: "What is the primary difference between Git and GitHub?",
    shortAnswer: "Git is the local command-line version control engine; GitHub is a cloud-hosted platform providing remote Git hosting, Pull Requests, and CI/CD.",
    explanation: "Git is the distributed version control tool created by Linus Torvalds. GitHub is a commercial web-based hosting service acquired by Microsoft that hosts Git repositories and adds collaborative UI features such as issue tracking, discussions, and GitHub Actions.",
    hint: "Engine (Git) vs Cloud Platform (GitHub).",
    level: "basic",
    codeExample: "# Git runs locally; GitHub provides remote backup & collaboration:\ngit remote -v"
  },
  {
    question: "What is a 'detached HEAD' state in Git?",
    shortAnswer: "A state where HEAD points directly to a specific commit hash rather than a named branch pointer.",
    explanation: "When you run `git checkout <commit-hash>`, HEAD points to that commit. You can view, compile, and experiment, but new commits created in this state will become orphaned if you switch away without creating a branch.",
    hint: "HEAD pointing to a commit hash instead of a branch name.",
    level: "intermediate",
    codeExample: "# Enter detached HEAD to inspect historical release:\ngit checkout e7a9c8b\n# Recover by creating a branch:\ngit switch -c recovery-branch"
  },
  {
    question: "Why did Linus Torvalds refuse to base Git on existing VCS tools in 2005?",
    shortAnswer: "Existing tools (CVS, SVN, Monotone) were too slow, centralized, and incapable of processing the Linux kernel's massive patch volume.",
    explanation: "In 2005, the Linux kernel had thousands of active global contributors. Applying, diffing, and merging patches in SVN took minutes per patch. Linus required a system where patch application took under 3 seconds and branch switching was instant.",
    hint: "Raw speed and handling thousands of daily patches.",
    level: "intermediate",
    codeExample: "# Git was engineered for sub-second patch application and tree diffing."
  }
];

export default questions;
