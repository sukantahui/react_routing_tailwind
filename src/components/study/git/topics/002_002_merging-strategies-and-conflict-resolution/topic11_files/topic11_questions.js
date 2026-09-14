// ==============================================================================
// TOPIC 11 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Merge Strategies & Algorithms: Recursive vs Modern ORT Strategy
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "What does the acronym 'ORT' stand for in Git's modern merge engine?",
    options: [
      "Open Repository Transmission",
      "Ostensibly Recursive's Twin",
      "Object Resolution Tree",
      "Optimal Redundant Tag"
    ],
    answer: 1,
    explanation: "Elijah Newren named the new engine 'ORT' as a humorous acronym for 'Ostensibly Recursive's Twin' because it replaced the legacy recursive strategy while remaining backward-compatible."
  },
  {
    id: 2,
    question: "Starting from Git version 2.33 (released in 2021), what is the default merge strategy for 3-way merges?",
    options: [
      "ort",
      "recursive",
      "octopus",
      "resolve"
    ],
    answer: 0,
    explanation: "`ort` replaced `recursive` as Git's default 3-way merge strategy starting in Git 2.33."
  },
  {
    id: 3,
    question: "What major performance advantage does the ORT strategy offer over the legacy recursive strategy?",
    options: [
      "Up to 500x faster execution in complex rebase and merge scenarios with intelligent memoization and rename detection",
      "It bypasses cryptographic SHA verification",
      "It requires no RAM",
      "It only runs on 64-core supercomputers"
    ],
    answer: 0,
    explanation: "ORT was redesigned from the ground up for massive performance improvements, caching rename computations across multi-commit merges and rebases."
  },
  {
    id: 4,
    question: "What is the critical technical difference between `-s ours` (strategy) and `-X ours` (strategy option)?",
    options: [
      "`-s ours` discards ALL incoming changes unconditionally (even clean non-conflicting files); `-X ours` only picks our version on conflicting line collisions while cleanly merging all non-conflicting files",
      "`-s ours` is for Linux; `-X ours` is for Windows",
      "`-X ours` deletes the repository",
      "There is no difference"
    ],
    answer: 0,
    explanation: "`-s ours` uses the `ours` strategy which ignores the entire incoming tree. `-X ours` is an option passed to the `ort` strategy to favor local changes only on conflict chunks."
  },
  {
    id: 5,
    question: "What does the `octopus` merge strategy do?",
    options: [
      "Merges more than two branches simultaneously in a single merge commit",
      "Deletes 8 branches at once",
      "Only works with marine biology repositories",
      "Splits 1 commit into 8 commits"
    ],
    answer: 0,
    explanation: "The `octopus` strategy is used when merging 3 or more branch heads simultaneously into a single merge commit (used frequently in Linux kernel integration)."
  },
  {
    id: 6,
    question: "Can the `octopus` strategy resolve complex 3-way line conflicts across multiple branches?",
    options: [
      "No, octopus refuses to do complex conflict resolution and will abort if any branch cannot be cleanly merged automatically",
      "Yes, it opens 8 split panes in VS Code",
      "Yes, it uses AI to guess",
      "Only if run on GitHub Enterprise"
    ],
    answer: 0,
    explanation: "Octopus merge requires clean non-conflicting merges across all branches; if conflicts exist, it aborts, requiring sequential 2-way merges instead."
  },
  {
    id: 7,
    question: "How does the ORT strategy handle rename/modify collisions (e.g. Branch A renamed file.js to src/file.js, while Branch B edited file.js)?",
    options: [
      "It crashes with a segmentation fault",
      "It accurately detects the rename, moves the file to src/file.js, and seamlessly applies Branch B's modifications to the new path",
      "It creates duplicate copies of both files",
      "It ignores the rename"
    ],
    answer: 1,
    explanation: "ORT includes sophisticated rename and directory-rename detection algorithms that automatically apply concurrent edits to the renamed destination path."
  },
  {
    id: 8,
    question: "Which flag passes a strategy option (like `ours` or `theirs`) to the default merge engine?",
    options: [
      "-X (or --strategy-option)",
      "-s (or --strategy)",
      "-o (or --option)",
      "-f (or --force)"
    ],
    answer: 0,
    explanation: "`-s` specifies the high-level strategy (e.g. `ort`, `ours`, `octopus`), while `-X` passes fine-grained options to that strategy."
  },
  {
    id: 9,
    question: "What does `git merge -X ignore-all-space feature` do?",
    options: [
      "Deletes all whitespace in the entire project",
      "Ignores all whitespace differences (spaces vs tabs, indentation changes) when determining merge conflicts",
      "Compresses files into zip archives",
      "Fails if a space character is typed"
    ],
    answer: 1,
    explanation: "`-X ignore-all-space` treats lines with differing whitespace as identical, preventing noisy conflicts caused by code formatters like Prettier."
  },
  {
    id: 10,
    question: "What is the `subtree` merge strategy used for?",
    options: [
      "Merging two repositories where one repository is nested inside a subfolder of another",
      "Pruning dead branches",
      "Visualizing git tree branches with green ASCII leaves",
      "Managing Git submodules"
    ],
    answer: 0,
    explanation: "The `subtree` strategy automatically shifts directory prefixes so a secondary repository can be merged into a subfolder of a host repository."
  },
  {
    id: 11,
    question: "Why was the legacy `recursive` merge strategy called 'recursive'?",
    options: [
      "Because when multiple common ancestors existed (in criss-cross merges), it recursively merged the ancestors to create a virtual common base commit",
      "Because it caused infinite recursion loops in Git",
      "Because it recursively scanned the hard drive",
      "Because Linus Torvalds liked recursive functions"
    ],
    answer: 0,
    explanation: "In criss-cross merge topologies with multiple merge bases, it called itself recursively to generate a synthetic common ancestor tree."
  },
  {
    id: 12,
    question: "How does ORT handle criss-cross merges with multiple merge bases?",
    options: [
      "It uses an optimized virtual merge base construction without the quadratic slowdowns of the old recursive algorithm",
      "It skips merge base calculation entirely",
      "It creates an octopus merge",
      "It asks the user to pick one commit"
    ],
    answer: 0,
    explanation: "ORT builds on the recursive concept but adds advanced caching, conflict memoization, and conflict-free sub-tree skipping."
  },
  {
    id: 13,
    question: "If Sachin runs `git merge -X theirs feature/discount`, what will happen to lines that have NO conflicts?",
    options: [
      "They will be replaced with incoming changes",
      "They will be cleanly merged from both branches normally; only conflicting lines will automatically choose `theirs`",
      "They will be deleted",
      "Git will prompt for each line"
    ],
    answer: 1,
    explanation: "Strategy options (`-X`) only influence the resolution of conflicting lines. Non-conflicting additions and modifications from both branches merge cleanly."
  },
  {
    id: 14,
    question: "Which strategy option allows specifying custom diff algorithms (e.g. `histogram` or `patience`) during a merge?",
    options: [
      "-X diff-algorithm=histogram",
      "-s histogram",
      "--algo=patience",
      "-X math=patience"
    ],
    answer: 0,
    explanation: "`-X diff-algorithm=<name>` configures the internal diff engine used during the 3-way merge calculation."
  },
  {
    id: 15,
    question: "What is the primary benefit of the `histogram` diff algorithm over the traditional `myers` algorithm?",
    options: [
      "It reduces memory consumption",
      "It produces cleaner, more intuitive diffs when matching matching code structures and brackets in programming languages",
      "It generates bar charts in the terminal",
      "It eliminates merge conflicts 100%"
    ],
    answer: 1,
    explanation: "Histogram diff handles nested code structures, repeated lines, and bracket closures much more intuitively than standard Myers diff."
  },
  {
    id: 16,
    question: "Can you explicitly force Git to use the old legacy recursive strategy if needed?",
    options: [
      "Yes, by running `git merge -s recursive <branch>`",
      "No, the recursive strategy was permanently deleted from Git source code",
      "Only on 32-bit Linux",
      "Only by downgrading Git to version 1.0"
    ],
    answer: 0,
    explanation: "Git retains backward compatibility, allowing `git merge -s recursive <branch>` if legacy behavior is specifically required."
  },
  {
    id: 17,
    question: "In Coder & AccoTax lab, when Sachin moved `ledger.js` to `src/billing/clientLedger.js` and updated GST to 12%, while main updated turnover to ₹75,00,000, what did ORT do?",
    options: [
      "ORT created 2 separate conflicting files",
      "ORT automatically integrated the turnover change into the renamed file path with 0 conflicts",
      "ORT aborted the merge",
      "ORT deleted the folder"
    ],
    answer: 1,
    explanation: "ORT's directory and rename detection engine tracked the file relocation and accurately merged the turnover update into the new location."
  },
  {
    id: 18,
    question: "What command displays all merge strategies available in your current Git installation?",
    options: [
      "git merge -s help (or git merge --help)",
      "git show strategies",
      "git list --strategies",
      "git config merge.list"
    ],
    answer: 0,
    explanation: "Consulting `git merge --help` lists supported built-in strategies (`ort`, `recursive`, `resolve`, `octopus`, `ours`, `subtree`)."
  },
  {
    id: 19,
    question: "When is the `ours` strategy (`-s ours`) practically useful in production?",
    options: [
      "When integrating a feature branch that was completely rewritten from scratch elsewhere, but you want to record the branch as merged to retire it without pulling any of its code",
      "Every single day on main",
      "When writing unit tests",
      "Never"
    ],
    answer: 0,
    explanation: "`-s ours` allows creating a merge commit that records DAG ancestry while strictly keeping our current code tree unchanged."
  },
  {
    id: 20,
    question: "What is `renormalize` strategy option (`-X renormalize`) used for?",
    options: [
      "Runs a full 3-way merge check after adjusting line endings according to `.gitattributes` (`crlf` / `lf`)",
      "Formats code with clang-format",
      "Normalizes database records",
      "Resets user passwords"
    ],
    answer: 0,
    explanation: "`-X renormalize` forces Git to normalize CRLF/LF line endings according to `.gitattributes` before performing 3-way diff matching."
  },
  {
    id: 21,
    question: "How does ORT handle large-scale rebasing with thousands of commits compared to recursive?",
    options: [
      "ORT caches tree and rename computations across commit replays, reducing execution time from minutes/hours to seconds",
      "ORT skips testing",
      "ORT requires 128GB of RAM",
      "ORT turns commits into zip files"
    ],
    answer: 0,
    explanation: "ORT's state caching prevents re-computing identical directory renames and unchanged subtrees across hundreds of consecutive rebased commits."
  },
  {
    id: 22,
    question: "If Swadeep merges with `git merge -s resolve branchB`, what happens if branchB and main have two independent common ancestors (criss-cross merge)?",
    options: [
      "Resolve will fail or pick one arbitrarily because it only supports a single common ancestor",
      "Resolve will crash the operating system",
      "Resolve will create an octopus merge",
      "Resolve will convert to ORT automatically"
    ],
    answer: 0,
    explanation: "The legacy `resolve` strategy only handles single merge bases; `ort` and `recursive` are needed for multi-base criss-cross topologies."
  },
  {
    id: 23,
    question: "What does `-X find-renames=<n>` option control?",
    options: [
      "Sets the similarity index percentage threshold (e.g. `-X find-renames=90` for 90% similarity) used for rename detection during merge",
      "Finds the first N renamed files",
      "Renames N commits",
      "Limits branch search to N seconds"
    ],
    answer: 0,
    explanation: "`-X find-renames=<n>` configures Git's similarity threshold for detecting file renames during 3-way merge."
  },
  {
    id: 24,
    question: "Why did Elijah Newren write ORT in pure C rather than modifying the existing recursive script?",
    options: [
      "The recursive engine had decades of accumulated technical debt, global variables, and index coupling that prevented proper optimization and thread safety",
      "Because C was newly invented",
      "Because Python was banned by Git",
      "Because GitHub demanded it"
    ],
    answer: 0,
    explanation: "Elijah Newren redesigned the merge engine from scratch with clean abstractions, decoupling it from the working tree index and enabling massive performance gains."
  },
  {
    id: 25,
    question: "What is Sukanta Sir's practical advice regarding merge strategies for modern software engineers?",
    options: [
      "Trust the default ORT engine for 99% of work, and leverage strategy options like `-X ours`, `-X theirs`, and `-X ignore-space-change` when resolving complex automated merges",
      "Always use `-s ours` for all team merges",
      "Never use Git versions newer than 2015",
      "Avoid merge strategies entirely"
    ],
    answer: 0,
    explanation: "Sukanta Sir recommends relying on modern ORT defaults while mastering `-X` strategy options for targeted automated resolutions."
  }
];

export default questions;
