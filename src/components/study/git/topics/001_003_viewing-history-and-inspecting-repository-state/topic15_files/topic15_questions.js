const questions = [
  {
    id: 1,
    question: "Which data structure does Git use under the hood to store and traverse commit histories?",
    options: [
      "Directed Acyclic Graph (DAG) of immutable commit objects",
      "Doubly-linked linear linked list",
      "Relational SQL B-Tree table",
      "Hierarchical XML DOM tree"
    ],
    correctAnswer: 0,
    explanation: "Git models history as a Directed Acyclic Graph (DAG) where each commit points backwards to one or more parent commit object SHAs."
  },
  {
    id: 2,
    question: "What does the `--decorate` option do when passed to `git log`?",
    options: [
      "Applies syntax highlighting to C and JavaScript source code diffs.",
      "Prints ref names (branch heads, tags, HEAD, remote branches) pointing to each commit.",
      "Converts commit timestamps into localized calendar emojis.",
      "Enables ASCII bar charts of lines changed per author."
    ],
    correctAnswer: 1,
    explanation: "`--decorate` prints ref names (such as `HEAD -> main`, `origin/main`, `tag: v1.0`) pointing to each commit."
  },
  {
    id: 3,
    question: "In `git log --pretty=format:\"%h %ad %s\"`, what do the placeholders `%h`, `%ad`, and `%s` represent?",
    options: [
      "%h = author host, %ad = author date, %s = signature",
      "%h = abbreviated commit hash, %ad = author date, %s = commit subject",
      "%h = hard reset flag, %ad = added files, %s = size in bytes",
      "%h = tree hash, %ad = committer date, %s = status code"
    ],
    correctAnswer: 1,
    explanation: "`%h` expands to the abbreviated commit hash, `%ad` to the author date, and `%s` to the commit subject line."
  },
  {
    id: 4,
    question: "How do you limit `git log` output to only commits authored after February 1st, 2026?",
    options: [
      "git log --after=\"2026-02-01\" (or --since=\"2026-02-01\")",
      "git log --date-start=\"2026-02-01\"",
      "git log --from=\"2026-02-01\"",
      "git log --time-range=\">2026-02-01\""
    ],
    correctAnswer: 0,
    explanation: "`--since` (or its exact synonym `--after`) limits the history log to commits made after the specified date."
  },
  {
    id: 5,
    question: "What is the difference between `git log --grep=\"fix\"` and `git log --grep=\"fix\" --all-match --grep=\"auth\"`?",
    options: [
      "The first searches for either pattern, while the second requires the commit message to match BOTH 'fix' AND 'auth'.",
      "The second searches code diffs instead of commit messages.",
      "The second searches only merge commit headers.",
      "There is no difference in search semantics."
    ],
    correctAnswer: 0,
    explanation: "By default, multiple `--grep` expressions match if ANY pattern matches (OR logic). Supplying `--all-match` requires all supplied grep patterns to match (AND logic)."
  },
  {
    id: 6,
    question: "Why should you use the `--` separator before file paths in `git log -- src/index.js`?",
    options: [
      "It disables Git hooks during the log command.",
      "It disambiguates pathspecs from branch names, tags, or options.",
      "It forces Git to calculate diffs in memory without disk I/O.",
      "It encrypts the output to avoid leaking sensitive files."
    ],
    correctAnswer: 1,
    explanation: "The `--` separator explicitly tells Git that all following arguments are file paths (pathspecs) rather than revision names or branch references."
  },
  {
    id: 7,
    question: "What information does `git log --stat` provide for each commit?",
    options: [
      "CPU and RAM usage while creating the commit.",
      "A list of modified files with the number of inserted and deleted lines, plus a summary line.",
      "The network latency of pushing the commit to origin.",
      "A static security analysis score of the commit code."
    ],
    correctAnswer: 1,
    explanation: "`--stat` shows modified file names, binary change flags, insertions/deletions per file using `+` and `-` characters, and total change count."
  },
  {
    id: 8,
    question: "How do you inspect the contents of a file `server.js` at revision `v1.2.0` without switching branches or checking it out?",
    options: [
      "git show v1.2.0:server.js",
      "git cat server.js --rev=v1.2.0",
      "git checkout v1.2.0 --dry-run server.js",
      "git log -p v1.2.0 --only server.js"
    ],
    correctAnswer: 0,
    explanation: "`git show <revision>:<path>` prints the raw blob content of the file at that revision directly to standard output."
  },
  {
    id: 9,
    question: "What is the meaning of `git diff main..feature` versus `git diff main...feature`?",
    options: [
      "`main..feature` compares the tips of both branches directly; `main...feature` compares the common ancestor against `feature`.",
      "`main..feature` compares untracked files; `main...feature` compares staged files.",
      "`main...feature` is a fast-forward merge preview; `main..feature` is a rebase preview.",
      "Both commands are identical in all versions of Git."
    ],
    correctAnswer: 0,
    explanation: "In `git diff`, two dots (`A..B`) compares the endpoint commit of A directly with B. Triple dot (`A...B`) compares the merge-base (common ancestor) of A and B with B."
  },
  {
    id: 10,
    question: "What does `git blame` display for each line in a source file?",
    options: [
      "The author name, commit hash, timestamp, line number, and line content of the last commit that touched the line.",
      "The list of all developers who reviewed the pull request containing that line.",
      "A list of all compiler errors associated with that line.",
      "The cyclomatic complexity score of each line."
    ],
    correctAnswer: 0,
    explanation: "`git blame` annotates each line of a file with the SHA of the commit that last changed it, the author's name, timestamp, and line text."
  },
  {
    id: 11,
    question: "Which flag prevents `git blame` from blaming an engineer who merely ran an automated code formatter (like Prettier or Black)?",
    options: [
      "-w (or --ignore-rev / --ignore-revs-file)",
      "--suppress-lint",
      "-f",
      "--no-format"
    ],
    correctAnswer: 0,
    explanation: "`-w` ignores whitespace-only changes, attributing lines to the author of meaningful code rather than the person who reformatted whitespace."
  },
  {
    id: 12,
    question: "How do you run `git blame` on only lines 15 through 30 of `src/auth.js`?",
    options: [
      "git blame -L 15,30 src/auth.js",
      "git blame --slice 15..30 src/auth.js",
      "git blame src/auth.js#L15-30",
      "git blame -p 15-30 src/auth.js"
    ],
    correctAnswer: 0,
    explanation: "`-L <start>,<end>` restricts `git blame` output to the designated line range."
  },
  {
    id: 13,
    question: "What is the Pickaxe operator in Git, and what flag triggers it?",
    options: [
      "A database compaction tool triggered by `git gc --pickaxe`.",
      "A history search that finds commits where a specific string's count of occurrences changed, triggered by `git log -S`.",
      "A file recovery tool triggered by `git undelete`.",
      "A merge conflict resolver triggered by `git merge --pickaxe`."
    ],
    correctAnswer: 1,
    explanation: "`git log -S <string>` (the pickaxe operator) looks for differences that introduce or remove an instance of `<string>`."
  },
  {
    id: 14,
    question: "Why does `git log -S \"PAYMENT_GATEWAY_KEY\"` find when a secret was added or deleted, while `git log --grep=\"PAYMENT_GATEWAY_KEY\"` might find nothing?",
    options: [
      "`--grep` only searches commit log messages, while `-S` searches the actual line diff patches.",
      "`-S` connects to remote secret vaults, while `--grep` works locally.",
      "`--grep` requires root administrative permissions.",
      "`-S` operates only on compiled binary files."
    ],
    correctAnswer: 0,
    explanation: "`--grep` matches text within the commit message string, whereas `-S` searches within the code changes (patches) introduced by commits."
  },
  {
    id: 15,
    question: "If a file was moved from `lib/math.js` to `src/utils/math.js`, which command ensures the log displays commits prior to the relocation?",
    options: [
      "git log --follow src/utils/math.js",
      "git log --track src/utils/math.js",
      "git log --renames src/utils/math.js",
      "git log --full-history src/utils/math.js"
    ],
    correctAnswer: 0,
    explanation: "`git log --follow <path>` follows the file history beyond renames and moves."
  },
  {
    id: 16,
    question: "What does `git log origin/main..HEAD` reveal in day-to-day development?",
    options: [
      "Commits that you have created locally on your current branch that have not yet been pushed to `origin/main`.",
      "Commits that exist on GitHub/GitLab that you need to pull.",
      "Commits that were deleted on the remote server.",
      "All pull requests currently pending review."
    ],
    correctAnswer: 0,
    explanation: "`origin/main..HEAD` lists commits reachable from `HEAD` (your local branch) that are not reachable from `origin/main` (unpushed commits)."
  },
  {
    id: 17,
    question: "What is the primary role of `git shortlog -sn`?",
    options: [
      "To summarize total commit counts per author in descending numerical order.",
      "To display short commit hashes in a single terminal line.",
      "To delete short-lived feature branches automatically.",
      "To verify SHA-256 GPG signatures on release tags."
    ],
    correctAnswer: 0,
    explanation: "`git shortlog -s -n` produces a sorted, numbered summary of commits attributed to each committer/author."
  },
  {
    id: 18,
    question: "Which command shows the difference between your staged changes and the last commit (`HEAD`)?",
    options: [
      "git diff --staged (or git diff --cached)",
      "git diff HEAD~1",
      "git diff --working-tree",
      "git status --diff"
    ],
    correctAnswer: 0,
    explanation: "`git diff --staged` (or `--cached`) displays the exact diff between the staging index and the current `HEAD` commit."
  },
  {
    id: 19,
    question: "In `git log --left-right A...B`, what does `<` denote?",
    options: [
      "Commits unique to revision A (left side)",
      "Commits unique to revision B (right side)",
      "Commits that failed CI/CD pipelines",
      "Commits made by the repository owner"
    ],
    correctAnswer: 0,
    explanation: "`<` denotes commits belonging strictly to the left-hand revision `A`, while `>` denotes commits belonging to the right-hand revision `B`."
  },
  {
    id: 20,
    question: "What does `git log -G \"regex\"` do that `git log -S \"string\"` does not?",
    options: [
      "`-G` searches diff hunks using regular expressions regardless of whether the occurrence count of the match changed.",
      "`-G` searches commit author emails only.",
      "`-G` generates an animated graph.",
      "`-G` ignores all uppercase characters automatically."
    ],
    correctAnswer: 0,
    explanation: "`git log -G <regex>` finds commits whose patch diffs add or remove lines matching the regex, even if the total count of matches remains unchanged."
  },
  {
    id: 21,
    question: "What does the option `--no-merges` do when running `git log`?",
    options: [
      "Suppresses all commits with two or more parents, presenting only direct linear work.",
      "Aborts any currently ongoing three-way merge.",
      "Converts merge commits into rebased fast-forwards.",
      "Prevents other developers from merging into the active branch."
    ],
    correctAnswer: 0,
    explanation: "`--no-merges` excludes merge commits from the history output."
  },
  {
    id: 22,
    question: "What does `git show HEAD~2` display?",
    options: [
      "The commit metadata and patch diff for the 2nd generation ancestor of the current commit.",
      "The 2nd commit in the entire repository history.",
      "The status of the two most recently modified working tree files.",
      "The 2nd branch created in the repository."
    ],
    correctAnswer: 0,
    explanation: "`HEAD~2` refers to the commit 2 steps back along the primary parent lineage from `HEAD`. `git show` displays its commit metadata and diff."
  },
  {
    id: 23,
    question: "Which command shows only the names of files that changed in each commit, with no diff text?",
    options: [
      "git log --name-only",
      "git log --list-files",
      "git log --summary-names",
      "git show --files"
    ],
    correctAnswer: 0,
    explanation: "`--name-only` prints the list of affected file paths beneath each commit record without diff hunks."
  },
  {
    id: 24,
    question: "How can you detect code that was copied or moved from another file during `git blame`?",
    options: [
      "git blame -C -C <file>",
      "git blame --copy-track <file>",
      "git blame --deep-scan <file>",
      "git blame -M <file>"
    ],
    correctAnswer: 0,
    explanation: "`-C -C` instructs `git blame` to inspect all files in the commit that created the file, detecting code moved or copied across files."
  },
  {
    id: 25,
    question: "What is the effect of running `git log --oneline --graph --all`?",
    options: [
      "Displays an ASCII visualization of all branches, tags, and commit nodes across the entire repository in a compact single-line view.",
      "Prints a list of all deleted files.",
      "Exports the git history to an SVG graph file.",
      "Validates the cryptographic hashes of every object in `.git/objects`."
    ],
    correctAnswer: 0,
    explanation: "This command renders a single-line ASCII topological graph showing all branches, tags, and commits in the repository."
  },
  {
    id: 26,
    question: "If `git diff` outputs nothing when you know you made changes to files, what is the most likely cause?",
    options: [
      "The changes have already been staged with `git add`, so you must use `git diff --staged`.",
      "Git has corrupted the local index file.",
      "The repository has exceeded 10,000 commits.",
      "Your user account does not have write permissions to `.git`."
    ],
    correctAnswer: 0,
    explanation: "Default `git diff` compares the working directory against the staging area (index). If changes were staged with `git add`, `git diff` shows nothing; `git diff --staged` is required."
  },
  {
    id: 27,
    question: "What does the `%cr` placeholder represent in custom pretty formats?",
    options: [
      "Committer date, relative (e.g., '2 days ago', '4 hours ago')",
      "Commit revision number",
      "CRC checksum of the commit object",
      "Committer repo URL"
    ],
    correctAnswer: 0,
    explanation: "`%cr` formats the committer date in relative terms (e.g. '3 weeks ago', '20 minutes ago'). `%ar` does the same for author date."
  },
  {
    id: 28,
    question: "How does `git log --author=\"Sukanta\"` match author names?",
    options: [
      "It performs a case-insensitive substring regex match on both author name and author email fields.",
      "It requires an exact match with the GPG public key ID.",
      "It searches only the commit subject line.",
      "It queries the LDAP server configured in global gitconfig."
    ],
    correctAnswer: 0,
    explanation: "`--author` matches any commit where either the author name or author email contains the specified substring or regex."
  },
  {
    id: 29,
    question: "What is the purpose of `git log -p -2`?",
    options: [
      "Displays the full patch diffs for the latest 2 commits.",
      "Runs `git log` across 2 parallel threads.",
      "Splits the output into 2 separate terminal panes.",
      "Filters commits that touched more than 2 files."
    ],
    correctAnswer: 0,
    explanation: "`-p` outputs patch diffs, and `-2` limits the count to the latest 2 commits."
  },
  {
    id: 30,
    question: "In the Barrackpore financial engine audit, why was `git blame` combined with `git log -S` to solve the missing tax exemption bug?",
    options: [
      "`git log -S` located the exact commit that deleted the function, and `git blame` identified who originally wrote and refactored the surrounding logic.",
      "`git blame` cannot run without `git log` running in the background.",
      "`git log -S` is only used to create backup branches.",
      "Both commands are required to compile the JavaScript engine."
    ],
    correctAnswer: 0,
    explanation: "Combining `-S` (pickaxe) pinpoints the exact commit that altered the symbol's presence, while `git blame` traces the line-by-line provenance of the remaining codebase before and after the change."
  }
];

export default questions;

