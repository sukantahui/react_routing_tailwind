/**
 * Topic 3 FAQ Dataset: Origins of Git & Linus Torvalds
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "Who created Git and in what year was it born?",
    shortAnswer: "Linus Torvalds, the creator of the Linux operating system kernel, created Git in April 2005.",
    explanation: "Linus Torvalds designed and wrote the initial implementation of Git in April 2005 to replace BitKeeper for Linux kernel development. Git became self-hosting on April 7, 2005, just days after its first commit.",
    hint: "Think of the creator of the Linux kernel in 2005.",
    level: "basic",
    codeExample: "# The first Git commit was created on April 7, 2005:\n# 'Initial revision of \"git\", the information manager from hell'"
  },
  {
    question: "What specific crisis triggered the creation of Git in 2005?",
    shortAnswer: "The breakdown of relations between the Linux kernel community and BitMover (the creator of BitKeeper).",
    explanation: "From 2002 to 2005, the Linux kernel used the proprietary BitKeeper DVCS for free. When Andrew Tridgell reverse-engineered BitKeeper's protocols, BitMover revoked the free license, forcing Linus to build an open-source replacement immediately.",
    hint: "BitKeeper license revocation in April 2005.",
    level: "basic",
    codeExample: "# BitKeeper dispute led to the birth of Git and Mercurial in April 2005."
  },
  {
    question: "Why did Linus Torvalds reject Subversion (SVN) and CVS for Linux development?",
    shortAnswer: "They were too slow, centralized, required constant network access, and could not handle thousands of concurrent non-linear patches.",
    explanation: "In 2005, the Linux kernel had hundreds of maintainers submitting thousands of patches daily. In SVN, applying and merging patches took minutes per commit; Linus required a system where patch operations took under 3 seconds.",
    hint: "Performance, centralization, and slow branch merges in SVN.",
    level: "basic",
    codeExample: "# SVN performance was unacceptable for high-throughput kernel development."
  },
  {
    question: "What does the name 'Git' mean according to Linus Torvalds?",
    shortAnswer: "Linus humorously named it after British slang for an unpleasant or stubborn person, playfully referring to himself.",
    explanation: "Linus Torvalds jokingly stated: 'I'm an egotistical bastard, and I name all my projects after myself. First Linux, now Git.' It can also be interpreted as a random three-letter combination that was unassigned in Unix command binaries.",
    hint: "British slang for a stubborn or unpleasant person.",
    level: "basic",
    codeExample: "# git (noun): British slang for an unpleasant/stubborn person."
  },
  {
    question: "Who is Junio Hamano and what is his role in Git's history?",
    shortAnswer: "Junio Hamano joined Git development in April 2005 and took over as the lead maintainer in July 2005, a role he holds to this day.",
    explanation: "After writing the core architecture in C and releasing Linux Kernel 2.6.12 with Git, Linus Torvalds handed the project maintenance to Junio Hamano. Junio has overseen Git's evolution for over 20 years, authoring thousands of foundational patches.",
    hint: "The current and long-standing lead maintainer of Git.",
    level: "basic",
    codeExample: "# Check Git maintainer in Git repository log:\ngit log --author='Junio C Hamano'"
  },
  {
    question: "What does it mean that Git became 'self-hosting' on April 7, 2005?",
    shortAnswer: "It means the Git software was used to manage and track its own source code repository.",
    explanation: "Self-hosting is a major milestone in compiler and tool development. On April 7, 2005, Linus Torvalds initialized a Git repository to track Git's own C source code, proving the tool's stability and usability.",
    hint: "Using Git to version control Git itself.",
    level: "intermediate",
    codeExample: "# Clone the official Git source code repository:\ngit clone https://github.com/git/git.git"
  },
  {
    question: "What programming language is the core of Git written in and why?",
    shortAnswer: "Git is written in pure C for raw speed, direct memory control, and zero-overhead POSIX filesystem access.",
    explanation: "Linus chose C because system-level version control requires manipulating millions of file descriptors, computing SHA hashes, and memory-mapping files (mmap) at hardware speed with zero runtime overhead.",
    hint: "The same language Linux is written in: C.",
    level: "intermediate",
    codeExample: "# Git uses high-performance C libraries (zlib, libcurl, pcre2)."
  },
  {
    question: "What are 'Plumbing' vs 'Porcelain' commands in Git architecture?",
    shortAnswer: "Plumbing commands are low-level core primitives; Porcelain commands are user-friendly developer interfaces built on top.",
    explanation: "Linus designed Git as a content-addressable toolkit. Low-level commands like `git hash-object`, `git cat-file`, `git write-tree`, and `git commit-tree` are 'plumbing'. User-facing commands like `git add`, `git commit`, `git checkout`, and `git log` are 'porcelain'.",
    hint: "Plumbing = low-level pipes; Porcelain = user-friendly fixtures (like sinks/toilets).",
    level: "intermediate",
    codeExample: "# Low-level Plumbing:\ngit hash-object -w file.txt\n# High-level Porcelain:\ngit add file.txt"
  },
  {
    question: "What was the first Linux kernel release fully managed by Git?",
    shortAnswer: "Linux Kernel 2.6.12, released on June 16, 2005.",
    explanation: "After just two months of development, Git was battle-tested on the entire multi-million line Linux kernel codebase, successfully managing the release of version 2.6.12 without a single data corruption incident.",
    hint: "Kernel version 2.6.12 in June 2005.",
    level: "intermediate",
    codeExample: "# Linux 2.6.12 was the milestone release powered by Git."
  },
  {
    question: "Why did Linus Torvalds design Git around immutable content rather than file deltas?",
    shortAnswer: "Because comparing snapshots and checking SHA hashes is vastly faster and mathematically less prone to corruption than calculating delta chains.",
    explanation: "Older VCS (SCCS, CVS, SVN) stored base files plus a list of text changes. If any intermediate delta file was corrupted, all future revisions were destroyed. Git stores immutable objects indexed by SHA-1 hash; corruption in one object is instantly detected and isolated.",
    hint: "Immutable snapshot nodes vs chained delta diffs.",
    level: "intermediate",
    codeExample: "# Every object in Git is an immutable compressed zlib blob."
  },
  {
    question: "How did Linus achieve sub-second branch creation in Git?",
    shortAnswer: "By defining a branch as a simple pointer (a text file with a 40-character SHA hash) instead of copying directories.",
    explanation: "In SVN, branching created server directory duplicates. Linus realized that because commits point to immutable tree snapshots, a branch is nothing more than a pointer to the newest commit. Creating a branch is just writing 41 bytes to disk.",
    hint: "A branch is just a 41-byte text pointer.",
    level: "intermediate",
    codeExample: "# Create branch pointer in sub-milliseconds:\ngit branch feature/kernel-driver"
  },
  {
    question: "What was the role of the BitMover BitKeeper controversy in the open-source movement?",
    shortAnswer: "It unified the open-source community around the necessity of having 100% free and open-source developer infrastructure.",
    explanation: "Relying on a proprietary tool (BitKeeper) for the world's most critical open-source project (Linux) created immense fragility. The controversy permanently established that open-source operating systems must be developed on open-source version control systems.",
    hint: "Never depend on proprietary software for open-source infrastructure.",
    level: "intermediate",
    codeExample: "# Git is released under the GNU General Public License (GPL) v2."
  },
  {
    question: "How long did it take Linus Torvalds to write the first working prototype of Git?",
    shortAnswer: "Approximately 10 to 14 days in early April 2005.",
    explanation: "Linus started writing Git on April 3, 2005. By April 7, it could commit and branch itself. By April 18, it performed its first multi-branch merge between Linus and Al Viro.",
    hint: "Less than two weeks for the initial working engine.",
    level: "basic",
    codeExample: "# Development started on April 3, 2005; self-hosting on April 7, 2005."
  },
  {
    question: "Why did Git use SHA-1 instead of a traditional relational database (like SQLite/MySQL)?",
    shortAnswer: "Because a cryptographic hash provides a deterministic, collision-resistant global ID that can be computed offline without a central database coordinator.",
    explanation: "If Git used MySQL or SQLite, managing unique primary keys across thousands of disconnected laptops would require complex consensus algorithms. SHA-1 computes a unique 160-bit ID purely from content and parent hashes with zero network coordination.",
    hint: "Content-based cryptographic hashing vs central database auto-increment IDs.",
    level: "advanced",
    codeExample: "# SHA hash is deterministically calculated from object header + content:\necho -e 'blob 12\\0Hello World' | sha1sum"
  },
  {
    question: "What is Git's transition from SHA-1 to SHA-256 (Object Format)?",
    shortAnswer: "Git has engineered support for SHA-256 (256-bit hashes) to future-proof against SHA-1 collision vulnerabilities.",
    explanation: "While SHA-1 remains default for backward compatibility, modern Git versions support initializing repositories with `git init --object-format=sha256` for ultra-high security cryptographic integrity.",
    hint: "SHA-256 object format in modern Git.",
    level: "advanced",
    codeExample: "# Initialize a repository using SHA-256 hashing:\ngit init --object-format=sha256 my_secure_repo"
  },
  {
    question: "How did Git's architecture influence the rise of GitHub in 2008?",
    shortAnswer: "Git's lightweight branching and decentralized DAG made GitHub's Fork & Pull Request model simple, scalable, and revolutionary.",
    explanation: "In 2008, Chris Wanstrath, PJ Hyett, and Tom Preston-Werner founded GitHub around Git's distributed architecture. Because forking a Git repo is an instant server copy and merging is branch-based, GitHub built the modern social coding revolution on top of Git.",
    hint: "GitHub launched in 2008 based on Git's DVCS engine.",
    level: "advanced",
    codeExample: "# GitHub launched in 2008: 'Git repository hosting made easy'."
  },
  {
    question: "What is the Linux kernel maintainer workflow that Git was specifically built to handle?",
    shortAnswer: "The 'Dictator and Lieutenants' workflow, where subsystem maintainers pull patches and Linus acts as the benevolent dictator pulling trusted branches.",
    explanation: "Git's peer-to-peer architecture allows subsystem maintainers (lieutenants, e.g., network, memory, USB) to collect, review, and merge patches from hundreds of developers into subsystem trees. Linus then pulls from lieutenants into the main kernel tree.",
    hint: "Benevolent Dictator and Lieutenants hierarchical workflow.",
    level: "advanced",
    codeExample: "# Lieutenant workflow: git remote add net-tree ... && git merge net-tree/main"
  },
  {
    question: "What is the origin of the term 'Merkle Tree' in Git's architectural design?",
    shortAnswer: "Named after Ralph Merkle (1979), it is a tree of cryptographic hashes where leaf nodes are data blobs and parent nodes are hashes of their children.",
    explanation: "Git's directory tree objects contain SHA hashes of sub-trees and blobs, and commits contain hashes of root trees and parent commits. This forms a Merkle DAG, guaranteeing that any modification to a single byte changes every ancestor hash up to HEAD.",
    hint: "Cryptographic hash trees invented by Ralph Merkle.",
    level: "advanced",
    codeExample: "# Inspect root tree referenced by commit:\ngit cat-file -p HEAD^{tree}"
  },
  {
    question: "How does Git maintain backward compatibility with old Linux kernel patches from 2005?",
    shortAnswer: "Git's underlying object database specification (blobs, trees, commits, tags) has remained stable and backward-compatible for over 20 years.",
    explanation: "A Git repository created with Linus Torvalds' initial release in April 2005 can be read, diffed, and committed to using Git 2.45+ today without any migration or conversion required.",
    hint: "Immutable, stable object format for 20+ years.",
    level: "intermediate",
    codeExample: "# Git 2.x seamlessly reads Git 1.x repositories."
  },
  {
    question: "What is the license of Git and why is it important?",
    shortAnswer: "GNU General Public License (GPL) version 2, guaranteeing that Git remains free and open-source forever.",
    explanation: "By releasing Git under GPL v2, Linus ensured that no corporation can privatize or revoke access to Git, preventing any repeat of the BitKeeper licensing fiasco.",
    hint: "GPL v2 open-source license.",
    level: "basic",
    codeExample: "# Git license: GNU General Public License v2.0."
  },
  {
    question: "What is the difference between `git-format-patch` and email-based workflows in kernel development?",
    shortAnswer: "`git format-patch` generates email-compliant patch files with author metadata and commit messages for mailing list reviews.",
    explanation: "Before web Pull Requests, Linux kernel developers used `git format-patch` to turn commits into emails and `git am` (Apply Mailbox) to apply them cleanly into local trees, a workflow still actively used for Linux kernel patches today.",
    hint: "Email patches (`git format-patch` and `git am`).",
    level: "advanced",
    codeExample: "# Generate email patch file:\ngit format-patch -1 HEAD\n# Apply email patch:\ngit am 0001-feat-add-driver.patch"
  },
  {
    question: "How did Linus ensure that Git is immune to silent data corruption (bit rot)?",
    shortAnswer: "Every read and write operation recalculates SHA hashes, immediately detecting hardware bit-rot or network corruption.",
    explanation: "When Git reads an object from disk, it hashes the content and compares it with the object's 40-character filename. If a single bit flipped on your SSD, Git reports `corrupt object` immediately rather than propagating corrupted code.",
    hint: "Recalculating SHA hashes on read and write.",
    level: "advanced",
    codeExample: "# Run repository integrity audit:\ngit fsck --lost-found"
  },
  {
    question: "What was the significance of Git replacing Monotone and Arch in 2005?",
    shortAnswer: "Monotone and GNU Arch were early open-source DVCS tools, but their performance was 100x too slow for kernel-scale workloads.",
    explanation: "Linus evaluated Monotone before building Git. While he praised Monotone's cryptographic ideas, performing a full kernel commit took over 30 minutes in Monotone. Linus built Git to perform the same operation in 3 seconds.",
    hint: "Monotone had good concepts but lacked extreme C-level speed.",
    level: "intermediate",
    codeExample: "# Git prioritized 100x performance optimization over academic abstraction."
  },
  {
    question: "What lesson can engineering students in Barrackpore learn from the creation of Git?",
    shortAnswer: "True engineering breakthroughs occur when you understand fundamental data structures (DAG, hashing, trees) and optimize for real-world bottlenecks.",
    explanation: "Linus didn't invent hashing or trees; he combined them into a simple, ultra-fast C architecture to solve a real practical problem. Mastering core computer science foundations enables developers to build world-changing tools.",
    hint: "Mastering core CS data structures to solve real engineering bottlenecks.",
    level: "basic",
    codeExample: "# Core CS in Git: DAG + SHA-1 + Tree Objects + Zlib Compression."
  },
  {
    question: "What is the primary summary takeaway about the origins of Git?",
    shortAnswer: "Git was created out of necessity in April 2005 by Linus Torvalds to deliver sub-second, distributed, cryptographically secure version control for Linux.",
    explanation: "From a weekend prototype to the global standard for software development, Git's origin is a testament to the power of open-source engineering, raw performance focus, and immutable cryptographic data structures.",
    hint: "Linus Torvalds, April 2005, Linux Kernel, Speed, Integrity.",
    level: "basic",
    codeExample: "# Git: The bedrock of modern software engineering since 2005."
  }
];

export default questions;
