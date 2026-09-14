/**
 * Topic 0 Questions: Deep Dive into git log (SHA-1 Hashes, Author vs Committer, Timestamps)
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic0_questions = [
  {
    id: 1,
    question: "In what chronological order does `git log` output commit entries by default?",
    options: [
      "Reverse-chronological order (newest commit at the top, oldest at the bottom)",
      "Alphabetical order by commit message",
      "Chronological order (oldest commit first)",
      "Random order based on memory layout"
    ],
    correctAnswer: 0,
    explanation: "`git log` begins at the current `HEAD` commit and follows parent pointers backwards, presenting history in reverse-chronological order."
  },
  {
    id: 2,
    question: "What cryptographic hashing algorithm does standard Git use to compute the 40-character commit checksum?",
    options: [
      "SHA-1 (160-bit cryptographic hash formatted as 40 hexadecimal characters)",
      "MD5 (128-bit hash)",
      "AES-256 encryption",
      "CRC32 checksum"
    ],
    correctAnswer: 0,
    explanation: "Git historically uses SHA-1 (and optionally SHA-256 in modern versions) to generate a 40-character unique hexadecimal object ID."
  },
  {
    id: 3,
    question: "What is the key architectural difference between the 'Author' and the 'Committer' in a Git commit object?",
    options: [
      "Author is the person who originally wrote the code; Committer is the person who applied or committed the patch (e.g. during rebase, cherry-pick, or amend)",
      "Author is the junior developer; Committer is the manager",
      "Author is stored on GitHub; Committer is stored on local disk",
      "There is no difference in Git"
    ],
    correctAnswer: 0,
    explanation: "Git records both identities: the Author created the code (`AuthorDate`), while the Committer wrote the commit to the repository (`CommitDate`)."
  },
  {
    id: 4,
    question: "Which command flag causes `git log` to display BOTH Author and Committer details along with their separate timestamps?",
    options: [
      "git log --format=fuller",
      "git log --two-author",
      "git log -v",
      "git log --all-info"
    ],
    correctAnswer: 0,
    explanation: "`git log --format=fuller` (or `--format=full`) exposes both Author and Committer names, emails, and distinct timestamps."
  },
  {
    id: 5,
    question: "How does Git's Directed Acyclic Graph (DAG) enable `git log` to traverse history backwards?",
    options: [
      "Each commit object contains explicit pointer reference(s) to the SHA-1 hash of its parent commit(s)",
      "Git maintains a centralized SQL database of all commits",
      "Git reads the file creation dates from the operating system",
      "Git connects to GitHub to query the history"
    ],
    correctAnswer: 0,
    explanation: "Every commit object (except the initial root commit) contains `parent <SHA>` header metadata pointing to its direct predecessor in the DAG."
  },
  {
    id: 6,
    question: "What command displays the raw text contents and headers of the commit object currently pointed to by HEAD?",
    options: [
      "git cat-file -p HEAD",
      "git show-raw HEAD",
      "git dump-commit",
      "cat .git/HEAD"
    ],
    correctAnswer: 0,
    explanation: "`git cat-file -p HEAD` extracts and pretty-prints the raw object data (tree SHA, parent SHA, author, committer, and message)."
  },
  {
    id: 7,
    question: "What does the first commit in a brand new repository (the root commit) have in common with all subsequent commits?",
    options: [
      "It has a root tree object, author, committer, and message, but has ZERO parent pointers",
      "It has 10 parent pointers",
      "It is always named 'init'",
      "It does not have an author"
    ],
    correctAnswer: 0,
    explanation: "The initial commit is special only because it has no parent pointer (it is the root node of the DAG)."
  },
  {
    id: 8,
    question: "What happens when a commit is created during a merge of two branches?",
    options: [
      "The merge commit object contains TWO parent SHA pointers (e.g. parent 1 and parent 2)",
      "Git deletes the older branch history",
      "Git creates two separate commit objects with the same name",
      "The commit object has no parents"
    ],
    correctAnswer: 0,
    explanation: "A merge commit joins two branches and stores references to both parent commits in its header."
  },
  {
    id: 9,
    question: "How many characters is the full SHA-1 checksum displayed by default in `git log`?",
    options: [
      "40 hexadecimal characters",
      "16 characters",
      "64 characters",
      "128 characters"
    ],
    correctAnswer: 0,
    explanation: "A SHA-1 hash is 160 bits long, represented as a 40-character hexadecimal string (e.g. `e3b0c44298fc1c149afbf4c8996fb92427ae41e4`)."
  },
  {
    id: 10,
    question: "What is an abbreviated (short) commit SHA-1, and how many characters does Git use by default?",
    options: [
      "A unique prefix of the SHA (typically 7 characters) sufficient to disambiguate the object within the repository",
      "A random 3-digit PIN",
      "The first 2 letters of the author's name",
      "A base64 encoded integer"
    ],
    correctAnswer: 0,
    explanation: "Git uses at least 7 characters by default (e.g. `git log --oneline`), extending the length dynamically if hash collisions occur."
  },
  {
    id: 11,
    question: "If Swadeep rewrites a commit message using `git commit --amend`, what happens to the Author and Committer timestamps?",
    options: [
      "The Author Date remains unchanged (reflecting when the code was written), but the Commit Date updates to the current timestamp",
      "Both timestamps are deleted",
      "Git sets both timestamps to Jan 1, 1970",
      "The commit hash remains identical"
    ],
    correctAnswer: 0,
    explanation: "`git commit --amend` retains the original Author Date while updating the Commit Date to the current time."
  },
  {
    id: 12,
    question: "Which environment variable overrides the author name for commits created in the current shell session?",
    options: [
      "GIT_AUTHOR_NAME",
      "USER_NAME",
      "GIT_USER",
      "AUTHOR"
    ],
    correctAnswer: 0,
    explanation: "`GIT_AUTHOR_NAME` overrides the configured `user.name` for the current process."
  },
  {
    id: 13,
    question: "Which environment variable overrides the author timestamp for historical commit simulation?",
    options: [
      "GIT_AUTHOR_DATE",
      "GIT_TIMESTAMP",
      "COMMIT_TIME",
      "SYSTEM_DATE"
    ],
    correctAnswer: 0,
    explanation: "`GIT_AUTHOR_DATE` (and `GIT_COMMITTER_DATE`) allows overriding timestamps."
  },
  {
    id: 14,
    question: "What terminal pager does Git use by default on Unix/Linux/macOS when viewing `git log`?",
    options: [
      "less",
      "cat",
      "nano",
      "grep"
    ],
    correctAnswer: 0,
    explanation: "Git pipes log output through the `less` pager, allowing keyboard navigation (`q` to quit, `space` for next page, `/` to search)."
  },
  {
    id: 15,
    question: "How do you exit `git log` when viewing a long history inside the terminal pager?",
    options: [
      "Press the `q` key",
      "Press Ctrl+C 10 times",
      "Type 'exit' and press Enter",
      "Close the terminal window"
    ],
    correctAnswer: 0,
    explanation: "Pressing `q` immediately exits the pager and returns you to the shell prompt."
  },
  {
    id: 16,
    question: "What does the command `git log -n 5` (or `git log -5`) do?",
    options: [
      "Limits the output to the 5 most recent commits",
      "Displays commits from branch 5",
      "Deletes 5 commits",
      "Skips the first 5 commits"
    ],
    correctAnswer: 0,
    explanation: "`-n <number>` limits the number of commits shown by `git log`."
  },
  {
    id: 17,
    question: "What does the `HEAD -> main` indicator next to a commit in `git log` signify?",
    options: [
      "`HEAD` (your current working location) is currently attached to the `main` branch tip at this exact commit",
      "The branch is broken",
      "The commit was pushed to GitHub",
      "The commit is locked"
    ],
    correctAnswer: 0,
    explanation: "`HEAD -> main` denotes that HEAD is pointing to the `main` branch ref at that commit."
  },
  {
    id: 18,
    question: "What does `origin/main` in `git log` represent?",
    options: [
      "The Remote Tracking Branch pointer showing where the `main` branch was on the remote `origin` server during the last fetch/pull",
      "The local main branch",
      "The origin story of Git",
      "The author of the repository"
    ],
    correctAnswer: 0,
    explanation: "`origin/main` is the local remote-tracking branch reflecting the state of the remote `origin`."
  },
  {
    id: 19,
    question: "Why does changing a single character in a commit message completely alter the commit's 40-character SHA-1 hash?",
    options: [
      "Because SHA-1 is a cryptographic hash of the entire commit object data (tree SHA, parent SHA, author, committer, date, and message). Any bit change alters the hash completely (avalanche effect)",
      "Because Git assigns random hashes",
      "Because commit messages are encrypted with a password",
      "Because Git relies on operating system UUIDs"
    ],
    correctAnswer: 0,
    explanation: "The cryptographic avalanche effect guarantees that any change in metadata produces a completely distinct hash."
  },
  {
    id: 20,
    question: "If a commit's parent hash is changed (e.g. during a rebase), what happens to that commit's SHA-1 hash?",
    options: [
      "Its SHA-1 hash changes, which in turn causes all downstream child commits to change their SHA-1 hashes as well",
      "The hash remains unchanged",
      "Git merges the commits automatically",
      "The commit becomes untracked"
    ],
    correctAnswer: 0,
    explanation: "Because child commits reference parent hashes, modifying any historical commit cascades new hashes down the entire descendant chain."
  },
  {
    id: 21,
    question: "What command displays commit history with the full raw commit headers, including GPG signature verification status?",
    options: [
      "git log --show-signature",
      "git log --gpg-all",
      "git verify-log",
      "git log --crypto"
    ],
    correctAnswer: 0,
    explanation: "`git log --show-signature` checks and validates cryptographic GPG/SSH signatures on commits."
  },
  {
    id: 22,
    question: "Why is `git log` considered the fundamental tool for code auditing and security forensics?",
    options: [
      "Because it provides an immutable, cryptographically-linked audit trail of every modification, author, committer, and timestamp in the project's lifetime",
      "Because it runs anti-virus scans",
      "Because it tracks user keystrokes in real-time",
      "Because it scans for open network ports"
    ],
    correctAnswer: 0,
    explanation: "The Git DAG provides a tamper-evident audit trail of software evolution."
  },
  {
    id: 23,
    question: "How can you view the commit log of a branch `feature-tax` without checking it out first?",
    options: [
      "git log feature-tax",
      "git view feature-tax",
      "git log --branch=feature-tax",
      "git show-branch feature-tax"
    ],
    correctAnswer: 0,
    explanation: "Passing a branch name to `git log` traverses history starting from that branch's tip pointer."
  },
  {
    id: 24,
    question: "What does the command `git log HEAD~3..HEAD` display?",
    options: [
      "The last 3 commits leading up to the current HEAD",
      "All commits except the last 3",
      "A diff of 3 files",
      "3 random commits"
    ],
    correctAnswer: 0,
    explanation: "Revision range `HEAD~3..HEAD` shows commits reachable from `HEAD` but not from `HEAD~3` (the latest 3 commits)."
  },
  {
    id: 25,
    question: "What core insight does Sukanta Hui share about reading `git log` in professional engineering?",
    options: [
      "Reading git log is reading the architectural narrative of the system; engineers who master log inspection solve bugs 5x faster than those who guess",
      "Never read git log because it is outdated",
      "Only managers should read git log",
      "Git log is only useful for calculating salaries"
    ],
    correctAnswer: 0,
    explanation: "History inspection turns the commit log into an active diagnostic tool for understanding design decisions and debugging regressions."
  }
];

export default topic0_questions;
