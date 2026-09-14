const questions = [
  {
    id: 1,
    question: "In a forensic repository audit, what is the primary purpose of combining `git shortlog` with the flags `-s` and `-n`?",
    options: [
      "To display commit messages sorted alphabetically by author surname.",
      "To generate a summarized commit count per author, sorted in descending numerical order.",
      "To suppress merge commits and show diff statistics per developer.",
      "To list only staged and unstaged file alterations grouped by author."
    ],
    correctAnswer: 1,
    explanation: "`git shortlog -s -n` (or `--summary --numbered`) suppresses commit descriptions, counts total commits authored by each contributor, and sorts them numerically in descending order."
  },
  {
    id: 2,
    question: "A legacy function `calculateEmergencyVatExemption()` was deleted from the repository months ago, and its original file path is unknown. Which command will locate the exact commit that deleted it?",
    options: [
      "git log --grep=\"calculateEmergencyVatExemption\" --all",
      "git log -S \"calculateEmergencyVatExemption\" --oneline",
      "git blame --deleted=\"calculateEmergencyVatExemption\"",
      "git show --search-string=\"calculateEmergencyVatExemption\""
    ],
    correctAnswer: 1,
    explanation: "The pickaxe operator `git log -S <string>` inspects diff patches across all commits to find commits where the number of occurrences of the target string changed (such as deletion or introduction)."
  },
  {
    id: 3,
    question: "When running `git log --left-right main...feature/gst-optimization`, what do the `<` and `>` markers in the output indicate?",
    options: [
      "`<` indicates commits unique to the left branch (`main`), while `>` indicates commits unique to the right branch (`feature/gst-optimization`).",
      "`<` indicates commits that contain merge conflicts, while `>` indicates clean commits.",
      "`<` indicates commits authored before the merge-base, while `>` indicates commits authored after.",
      "`<` indicates commits modifying root files, while `>` indicates commits modifying subdirectories."
    ],
    correctAnswer: 0,
    explanation: "In symmetric difference log queries (`A...B`), the `--left-right` flag prefixes commits exclusive to reference `A` with `<` and commits exclusive to reference `B` with `>`."
  },
  {
    id: 4,
    question: "Why should an engineer use `git blame -w -C` instead of standard `git blame` when auditing refactored code?",
    options: [
      "It suppresses author names and shows only UNIX timestamps.",
      "It ignores pure whitespace modifications (`-w`) and tracks code lines that were copied or moved from other files (`-C`).",
      "It automatically reverts the target lines back to their original state.",
      "It runs the blame inspection in non-interactive parallel worker threads."
    ],
    correctAnswer: 1,
    explanation: "`-w` ignores whitespace-only changes (like code formatting or indentation), and `-C` detects lines moved or copied from other files in the same commit, finding the true author of the business logic."
  },
  {
    id: 5,
    question: "What does the command `git log -n 5 --since=\"2026-01-01\" --author=\"Debangshu\" --stat` accomplish?",
    options: [
      "It lists all commits across all branches authored by Debangshu in 2026.",
      "It shows at most 5 commits made by Debangshu since Jan 1, 2026, including changed file names and line insertion/deletion metrics.",
      "It resets the working tree to Debangshu's 5th commit of 2026.",
      "It compares Debangshu's current branch against the commit from Jan 1, 2026."
    ],
    correctAnswer: 1,
    explanation: "`-n 5` limits output to 5 commits, `--since` bounds the chronological start, `--author` filters by committer/author name, and `--stat` appends binary/text diff modification statistics."
  },
  {
    id: 6,
    question: "How does `git diff main...feature` differ from `git diff main..feature`?",
    options: [
      "`main...feature` compares the tip of `feature` directly against the common ancestor (merge-base) of `main` and `feature`.",
      "`main...feature` runs an interactive three-way merge tool.",
      "`main...feature` is invalid syntax in Git 2.x.",
      "`main..feature` compares against the merge-base, whereas `main...feature` compares the two tips."
    ],
    correctAnswer: 0,
    explanation: "In `git diff`, triple-dot `A...B` calculates diffs between the common ancestor of A and B and the tip of B (showing only changes introduced on branch B since divergence)."
  },
  {
    id: 7,
    question: "Which command exports commit history with abbreviated hash, ISO author date, author name, and subject in a custom tabular format?",
    options: [
      "git log --pretty=format:\"%h | %ad | %an | %s\" --date=iso",
      "git log --export-table --hash --date --author --message",
      "git show --format=table",
      "git log --custom=\"%H %D %A %M\""
    ],
    correctAnswer: 0,
    explanation: "The `--pretty=format:` placeholder `%h` gives the short hash, `%ad` the author date (formatted by `--date=iso`), `%an` the author name, and `%s` the commit subject."
  },
  {
    id: 8,
    question: "If a file was renamed from `src/legacy_tax.js` to `src/calculators/gst.js`, which flag ensures `git log` displays commits preceding the rename?",
    options: [
      "--track-renames",
      "--follow",
      "--detect-moves",
      "--preserve-history"
    ],
    correctAnswer: 1,
    explanation: "`git log --follow <path>` instructs Git to continue listing the history of a single file beyond renames and file moves."
  },
  {
    id: 9,
    question: "What is the key difference between `git log -S <regex>` and `git log -G <regex>`?",
    options: [
      "`-S` searches commit messages, while `-G` searches diffs.",
      "`-S` treats strings as literal symbols and counts changes in occurrence, while `-G` looks for regex matches anywhere in diff hunks.",
      "`-S` is faster but requires Git LFS, while `-G` works only on local tags.",
      "There is no difference; they are aliases."
    ],
    correctAnswer: 1,
    explanation: "`git log -S` (Pickaxe) checks if the number of occurrences of the string changed. `git log -G` matches any added or removed diff line against the provided regular expression."
  },
  {
    id: 10,
    question: "Which command displays the full metadata, patch diff, and file statistics of a specific commit SHA `c8f92a1`?",
    options: [
      "git inspect c8f92a1",
      "git show --stat c8f92a1",
      "git blame -f c8f92a1",
      "git diff --commit=c8f92a1"
    ],
    correctAnswer: 1,
    explanation: "`git show <SHA>` displays the commit metadata and patch diff. Adding `--stat` includes the file modification summary at the top."
  },
  {
    id: 11,
    question: "In forensic auditing, what does the flag `--no-merges` do when passed to `git log` or `git shortlog`?",
    options: [
      "It prevents merges from occurring in the local repository.",
      "It filters out merge commits (commits with more than one parent) from the history view.",
      "It flattens the commit history and deletes merge branches.",
      "It highlights only pull request merge commits."
    ],
    correctAnswer: 1,
    explanation: "`--no-merges` excludes all commits with two or more parents, ensuring only direct code contributions are presented."
  },
  {
    id: 12,
    question: "Which command inspects lines 40 to 65 of `src/server.js` to determine author and commit provenance?",
    options: [
      "git log --lines 40-65 src/server.js",
      "git blame -L 40,65 src/server.js",
      "git diff -L 40:65 src/server.js",
      "git show src/server.js:40-65"
    ],
    correctAnswer: 1,
    explanation: "`git blame -L 40,65 <path>` scopes blame output specifically to the line range 40 through 65."
  },
  {
    id: 13,
    question: "What is the output of `git log --graph --oneline --decorate --all`?",
    options: [
      "An ASCII-art graphical representation of all branch topologies, commits, and ref pointers across the entire repository.",
      "A JSON-formatted string sent to standard output.",
      "A graphical HTML file opened in the default browser.",
      "A summary of unstaged working tree diffs."
    ],
    correctAnswer: 0,
    explanation: "This command renders an ASCII graph displaying branch histories, merge topologies, abbreviated SHAs, and ref tags/heads across all references."
  },
  {
    id: 14,
    question: "How can you search for commits whose commit message contains the Jira ticket ID `TAX-9421`?",
    options: [
      "git log --grep=\"TAX-9421\"",
      "git log -S \"TAX-9421\"",
      "git find --message=\"TAX-9421\"",
      "git log --filter-message=\"TAX-9421\""
    ],
    correctAnswer: 0,
    explanation: "`git log --grep=\"<pattern>\"` filters the commit history by searching commit log messages."
  },
  {
    id: 15,
    question: "What does the command `git log --name-status --oneline` output?",
    options: [
      "Author names and their online status in the Git server.",
      "Abbreviated commit hashes, subjects, and status letters (A, M, D, R) for modified files in each commit.",
      "The health status of the `.git` directory objects.",
      "All branches with their upstream sync status."
    ],
    correctAnswer: 1,
    explanation: "`--name-status` shows single-letter change indicators (`A` for added, `M` for modified, `D` for deleted, `R` for renamed) alongside filenames for each commit."
  },
  {
    id: 16,
    question: "During a security audit, you need to find when a hardcoded API token `sk_live_998877` was introduced or removed. Which command is most reliable?",
    options: [
      "git log -S \"sk_live_998877\" -p",
      "git log --grep=\"sk_live_998877\"",
      "git blame --all-files sk_live_998877",
      "git diff --search=\"sk_live_998877\""
    ],
    correctAnswer: 0,
    explanation: "`git log -S \"sk_live_998877\" -p` finds every commit where the occurrence count of the token changed and displays the corresponding patch diff."
  },
  {
    id: 17,
    question: "What does `git log origin/main..HEAD` display in a team workflow?",
    options: [
      "All commits on `origin/main` that have not yet been pulled locally.",
      "All commits present on the current local branch (`HEAD`) that have not yet been pushed to `origin/main`.",
      "A diff of unstaged files compared against `origin/main`.",
      "A list of merge conflicts between the local branch and `origin/main`."
    ],
    correctAnswer: 1,
    explanation: "Two-dot range `A..B` in `git log` means reachable from B but not reachable from A. Therefore, `origin/main..HEAD` lists outgoing unpushed local commits."
  },
  {
    id: 18,
    question: "If `git blame` attributes an entire file to a single commit because someone reformatted braces across the project, how can you ignore that commit in future blames?",
    options: [
      "Add the commit SHA to `.git-blame-ignore-revs` and run `git blame --ignore-revs-file .git-blame-ignore-revs`.",
      "Delete the commit from history using `git reset --hard`.",
      "Use `git blame --skip-reformat`.",
      "Use `git log --suppress-formatting`."
    ],
    correctAnswer: 0,
    explanation: "Git supports `--ignore-revs-file <file>` (and the config `blame.ignoreRevsFile`), allowing teams to record large formatting/refactor commit SHAs so blame steps over them."
  },
  {
    id: 19,
    question: "What happens when you run `git log --oneline -- index.js utils.js`?",
    options: [
      "It merges `index.js` into `utils.js`.",
      "It filters commit history to only commits that modified either `index.js` or `utils.js`.",
      "It displays diffs between `index.js` and `utils.js`.",
      "It errors out because only one pathspec is allowed."
    ],
    correctAnswer: 1,
    explanation: "Passing multiple file pathspecs after `--` restricts `git log` to commits that touched any of the specified paths."
  },
  {
    id: 20,
    question: "What does `git log --patch-with-stat` do?",
    options: [
      "It shows both the diffstat summary and the full unified diff patch for each commit.",
      "It creates an emailable `.patch` file on disk.",
      "It checks if patches can be applied cleanly without merge conflicts.",
      "It displays author statistics inside the diff header."
    ],
    correctAnswer: 0,
    explanation: "`--patch-with-stat` (or `-p --stat`) outputs both the high-level modification numbers/filenames and the complete code diffs for every commit."
  },
  {
    id: 21,
    question: "Which formatting token in `git log --pretty=format:` outputs the author's email address?",
    options: [
      "%ae",
      "%an",
      "%ce",
      "%cd"
    ],
    correctAnswer: 0,
    explanation: "`%ae` expands to the author's email address (`%an` is author name, `%ce` is committer email, `%cd` is committer date)."
  },
  {
    id: 22,
    question: "How do you search commit history for additions or removals of any function named with the regex pattern `calculate.*Rate`?",
    options: [
      "git log -G \"calculate.*Rate\"",
      "git log --find-fn=\"calculate.*Rate\"",
      "git grep --history \"calculate.*Rate\"",
      "git blame --regex=\"calculate.*Rate\""
    ],
    correctAnswer: 0,
    explanation: "`git log -G \"<regex>\"` scans diff hunks across all commits for added or removed lines matching the regular expression."
  },
  {
    id: 23,
    question: "What does `git log --merges` do?",
    options: [
      "Automatically merges all branches into HEAD.",
      "Displays only commits that have two or more parents (merge commits).",
      "Suppresses merge conflicts in the history log.",
      "Renders a graph of unmerged working directory files."
    ],
    correctAnswer: 1,
    explanation: "`--merges` filters the history to show only merge commits, useful for reviewing PR integration milestones."
  },
  {
    id: 24,
    question: "What command lets you view the state of a file `config/app.json` as it existed 3 commits ago on `main`?",
    options: [
      "git show main~3:config/app.json",
      "git checkout main~3 --print config/app.json",
      "git log -p -3 config/app.json",
      "git view main~3 config/app.json"
    ],
    correctAnswer: 0,
    explanation: "`git show <revision>:<path>` retrieves and outputs the exact file blob content at the specified historical revision without touching the working tree."
  },
  {
    id: 25,
    question: "In the Barrackpore lab simulation, why is reconstructing history via command-line flags superior to relying on a web UI when debugging outages?",
    options: [
      "Web UIs cannot connect to git servers during network outages, and CLI flags (`-S`, `-w`, `-C`, `--left-right`) offer forensic power unavailable in standard web diff viewers.",
      "Web UIs alter commit hashes when viewing diffs.",
      "Git CLI operates only on encrypted blockchain logs.",
      "Web UIs are restricted to viewing only the latest 3 commits."
    ],
    correctAnswer: 0,
    explanation: "Command-line forensics allows offline, scriptable, zero-latency execution of advanced operators (`-S`, `-G`, `-w`, `-C`, `--follow`, `--left-right`) that web interfaces either truncate or do not support."
  }
];

export default questions;

