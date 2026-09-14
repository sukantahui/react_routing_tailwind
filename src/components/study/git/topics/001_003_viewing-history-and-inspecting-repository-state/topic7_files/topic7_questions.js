// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 7: Inspecting Specific Commits with git show: Viewing commit metadata, parents, and patch diff for any commit hash
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What does 'git show' display by default when run without arguments?",
    options: [
      "The commit metadata and full patch diff for the commit currently referenced by HEAD",
      "All branches in the repository",
      "The git status of the working tree",
      "The contents of the .git/config file"
    ],
    correctAnswer: 0,
    explanation: "Running 'git show' with no arguments defaults to inspecting the latest commit at HEAD."
  },
  {
    id: 2,
    question: "How can you view the historical content of 'config.json' from commit '7b1e4a8' without checking out that commit?",
    options: [
      "git show 7b1e4a8:config.json",
      "git cat 7b1e4a8 config.json",
      "git log --view 7b1e4a8 config.json",
      "git checkout --read 7b1e4a8 config.json"
    ],
    correctAnswer: 0,
    explanation: "The syntax 'git show <commit-ish>:<filepath>' dumps the exact historical file content directly to stdout."
  },
  {
    id: 3,
    question: "What is the primary difference between 'git log' and 'git show'?",
    options: [
      "'git log' traverses and lists commit history streams; 'git show' inspects one specific object (commit, tag, blob, or tree) in detail",
      "'git log' only works on main; 'git show' works on branches",
      "'git show' deletes old commits",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "'git log' is a multi-commit history traverser, while 'git show' is an individual object inspector."
  },
  {
    id: 4,
    question: "What does 'git show --stat 7b1e4a8' output?",
    options: [
      "The commit metadata and file modification statistics for commit 7b1e4a8, omitting the full diff patch",
      "The CPU statistics of the Git server",
      "A graph of all branches",
      "The memory size of the repository"
    ],
    correctAnswer: 0,
    explanation: "Adding '--stat' replaces the full unified diff with a concise list of modified files and +/- histogram counts."
  },
  {
    id: 5,
    question: "What type of diff format does 'git show' generate by default for a 2-parent merge commit?",
    options: [
      "Combined diff (diff --cc), showing only lines that conflict or differ from both parents",
      "Standard two-way unified diff against the first parent only",
      "A raw binary dump",
      "No diff is generated for merge commits"
    ],
    correctAnswer: 0,
    explanation: "For merge commits, 'git show' uses combined diff format ('diff --cc') by default."
  },
  {
    id: 6,
    question: "How can you instruct 'git show' to display the diff of a merge commit specifically against its first parent?",
    options: [
      "git show -m --first-parent <merge-commit>",
      "git show --parent=1 <merge-commit>",
      "git show --diff-first <merge-commit>",
      "git show -1p <merge-commit>"
    ],
    correctAnswer: 0,
    explanation: "'-m --first-parent' splits the merge commit and produces a traditional unified diff against parent 1."
  },
  {
    id: 7,
    question: "What does 'git show v1.0.0' display when 'v1.0.0' is an annotated tag?",
    options: [
      "The tagger identity, date, tag annotation message, GPG signature, and the commit object it points to",
      "Only the short 7-character hash",
      "A list of all files in the release .zip",
      "The GitHub download count"
    ],
    correctAnswer: 0,
    explanation: "'git show' on an annotated tag prints the full tag object header followed by the tagged commit details."
  },
  {
    id: 8,
    question: "How do you inspect the commit from 2 generations before HEAD?",
    options: [
      "git show HEAD~2 (or git show HEAD^^)",
      "git show HEAD-2",
      "git show --back=2",
      "git show HEAD:2"
    ],
    correctAnswer: 0,
    explanation: "'HEAD~2' (or 'HEAD^^') uses ancestry reference syntax to point to the grandparent commit of HEAD."
  },
  {
    id: 9,
    question: "Can 'git show' be used to inspect a Git tree object (directory listing)?",
    options: [
      "Yes, e.g.: git show HEAD^{tree} or git show 7b1e4a8:src/",
      "No, git show only works on commits",
      "Only if converted to a tarball",
      "Only on macOS"
    ],
    correctAnswer: 0,
    explanation: "'git show' can inspect any Git object type, including tree objects (directory listings) and raw blobs."
  },
  {
    id: 10,
    question: "What does 'git show --name-only 7b1e4a8' display?",
    options: [
      "The commit metadata and simply the list of file paths modified by that commit",
      "The author's first name only",
      "The branch name only",
      "The repository nickname"
    ],
    correctAnswer: 0,
    explanation: "'--name-only' prints just the list of filenames altered in that commit without diff patches or line counts."
  },
  {
    id: 11,
    question: "How can you view the patch for ONLY 'src/tax/gst.js' inside commit '7b1e4a8'?",
    options: [
      "git show 7b1e4a8 -- src/tax/gst.js",
      "git show 7b1e4a8:src/tax/gst.js --diff",
      "git diff 7b1e4a8 src/tax/gst.js",
      "git view-patch 7b1e4a8 src/tax/gst.js"
    ],
    correctAnswer: 0,
    explanation: "Adding '-- <path>' to 'git show <commit>' scopes the resulting patch strictly to that specified file."
  },
  {
    id: 12,
    question: "What does 'git show -s 7b1e4a8' (or 'git show --no-patch 7b1e4a8') do?",
    options: [
      "Suppresses diff generation entirely, displaying only the commit metadata and message",
      "Shows statistics only",
      "Shows silent output (exit code only)",
      "Shows staging area"
    ],
    correctAnswer: 0,
    explanation: "'-s' (or '--no-patch') suppresses diff output, printing only the commit header and message."
  },
  {
    id: 13,
    question: "What is the output of 'git show HEAD:README.md > old_readme.md'?",
    options: [
      "Saves the HEAD version of README.md to a local file named 'old_readme.md'",
      "Renames README.md in the repository",
      "Deletes README.md",
      "Creates a new branch named old_readme.md"
    ],
    correctAnswer: 0,
    explanation: "Standard shell redirection captures the stdout of 'git show <ref>:<file>' into a local file on disk."
  },
  {
    id: 14,
    question: "How can you check the GPG signature verification of a specific commit with git show?",
    options: [
      "git show --show-signature 7b1e4a8",
      "git show --verify-gpg 7b1e4a8",
      "git verify 7b1e4a8",
      "git gpg-check 7b1e4a8"
    ],
    correctAnswer: 0,
    explanation: "'--show-signature' verifies and prints the GPG cryptographic signature embedded in the commit object."
  },
  {
    id: 15,
    question: "If Swadeep wants to see what changes were made in a stash entry, which command can he run?",
    options: [
      "git show stash@{0}",
      "git stash --view",
      "git inspect stash",
      "git log stash"
    ],
    correctAnswer: 0,
    explanation: "Stash entries are commit objects in Git; 'git show stash@{0}' displays the diff of the stash."
  },
  {
    id: 16,
    question: "What does 'git show :0:app.js' display during a merge conflict?",
    options: [
      "The common ancestor stage (stage 0 / index version) of 'app.js'",
      "An empty file",
      "A syntax error",
      "The latest stash"
    ],
    correctAnswer: 0,
    explanation: "In index syntax, ':0:filename', ':1:filename' (base), ':2:filename' (ours), ':3:filename' (theirs) inspect index conflict stages."
  },
  {
    id: 17,
    question: "How can Susmita view the word-by-word diff of a commit using git show?",
    options: [
      "git show --word-diff 7b1e4a8",
      "git show --words 7b1e4a8",
      "git diff --words 7b1e4a8",
      "git show -w 7b1e4a8"
    ],
    correctAnswer: 0,
    explanation: "'--word-diff' highlights inline word mutations rather than full lines."
  },
  {
    id: 18,
    question: "What does 'git show --format=raw 7b1e4a8' display?",
    options: [
      "The exact internal commit object including tree pointer, parent pointers, author, committer, and raw commit body",
      "Binary machine opcodes",
      "JSON formatted output",
      "The disk sector location"
    ],
    correctAnswer: 0,
    explanation: "'--format=raw' reveals the exact low-level header structure stored in the Git object database."
  },
  {
    id: 19,
    question: "Why does 'git show 7b1e4a8' display a diff against its parent, rather than against HEAD?",
    options: [
      "Because a commit is fundamentally a snapshot whose delta is naturally defined relative to its direct parent commit",
      "Because HEAD is always newer than 7b1e4a8",
      "Because git show cannot compare with HEAD",
      "Because git show is an alias for git diff"
    ],
    correctAnswer: 0,
    explanation: "A commit's changeset is defined by comparing its tree object against its parent commit's tree object."
  },
  {
    id: 20,
    question: "What happens if you pass an invalid or non-existent commit hash to 'git show'?",
    options: [
      "Git outputs 'fatal: bad object <hash>' and exits with a non-zero exit code",
      "Git creates a new commit with that hash",
      "Git resets HEAD to master",
      "Git prints the oldest commit in the repo"
    ],
    correctAnswer: 0,
    explanation: "Git validates object existence and terminates with 'fatal: bad object' if the hash cannot be found."
  },
  {
    id: 21,
    question: "How can you view the commit that introduced tag 'v2.0.0'?",
    options: [
      "git show v2.0.0",
      "git tag --view v2.0.0",
      "git commit-from-tag v2.0.0",
      "git show-tag v2.0.0"
    ],
    correctAnswer: 0,
    explanation: "'git show <tagname>' displays both the tag details and the underlying commit object."
  },
  {
    id: 22,
    question: "Can you pass multiple commit hashes to 'git show' (e.g., 'git show hashA hashB')?",
    options: [
      "Yes, Git displays each commit's metadata and patch sequentially in the pager",
      "No, git show only accepts exactly one hash",
      "Only if hashA is an ancestor of hashB",
      "Only when running on Linux"
    ],
    correctAnswer: 0,
    explanation: "You can pass multiple commit identifiers to 'git show' to inspect them sequentially."
  },
  {
    id: 23,
    question: "What does 'git show --oneline -s 7b1e4a8' output?",
    options: [
      "7b1e4a8 followed by the commit subject line",
      "The full diff without commit message",
      "The file list only",
      "A single space character"
    ],
    correctAnswer: 0,
    explanation: "Combining '--oneline' with '-s' outputs only the 7-character hash and subject line."
  },
  {
    id: 24,
    question: "How do you view a commit while ignoring all carriage return / CRLF line ending differences?",
    options: [
      "git show --ignore-space-at-eol 7b1e4a8",
      "git show --no-crlf 7b1e4a8",
      "git show --clean-eol 7b1e4a8",
      "git show -e 7b1e4a8"
    ],
    correctAnswer: 0,
    explanation: "'--ignore-space-at-eol' treats carriage returns at line ends as harmless whitespace."
  },
  {
    id: 25,
    question: "Which of the following is the fastest command to check which files were modified in commit '3a4f891' without viewing diffs?",
    options: [
      "git show --stat 3a4f891 (or git show --name-only 3a4f891)",
      "git log -1 3a4f891",
      "git diff 3a4f891",
      "git status 3a4f891"
    ],
    correctAnswer: 0,
    explanation: "'git show --stat 3a4f891' or 'git show --name-only 3a4f891' gives immediate visibility into modified files."
  }
];

export default questions;
