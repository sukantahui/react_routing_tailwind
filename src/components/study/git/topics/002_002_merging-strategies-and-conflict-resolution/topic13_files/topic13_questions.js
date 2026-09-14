// ==============================================================================
// TOPIC 13 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Hands-on Terminal Lab: 3-Way Conflict Simulation & Resolution Sandbox
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "What is the command to calculate the common ancestor commit between `main` and `feature/corporate`?",
    options: [
      "git merge-base main feature/corporate",
      "git find-ancestor main feature/corporate",
      "git base-commit main feature/corporate",
      "git diff-ancestor main feature/corporate"
    ],
    answer: 0,
    explanation: "`git merge-base branchA branchB` outputs the exact 40-character SHA of the best common ancestor commit."
  },
  {
    id: 2,
    question: "When Git halts during `git merge feature/corporate`, what command confirms which files have unresolved conflicts?",
    options: [
      "git status (or git diff --name-only --diff-filter=U)",
      "git branch -a",
      "git push --status",
      "git log --conflicts"
    ],
    answer: 0,
    explanation: "`git status` and `git diff --name-only --diff-filter=U` list all files in an unmerged conflicting state."
  },
  {
    id: 3,
    question: "What command inspects the 3 distinct index stages for all unmerged files in the repository?",
    options: [
      "git ls-files -u",
      "git index --list",
      "git stages --view",
      "git show-index"
    ],
    answer: 0,
    explanation: "`git ls-files -u` prints stage 1 (base), stage 2 (ours/HEAD), and stage 3 (theirs/incoming) entries."
  },
  {
    id: 4,
    question: "What is the purpose of running `git diff --check` before committing a resolved conflict?",
    options: [
      "It verifies that no leftover conflict marker strings (`<<<<<<<`, `=======`, `>>>>>>>`) or whitespace errors remain in staged files",
      "It uploads changes to the testing server",
      "It checks for syntax errors in Python",
      "It restarts the Git daemon"
    ],
    answer: 0,
    explanation: "`git diff --check` scans staged changes for accidental leftover marker strings and whitespace issues."
  },
  {
    id: 5,
    question: "How do you verify that the resulting commit has exactly two parent commits?",
    options: [
      "git rev-list --parents -n 1 HEAD",
      "git count-parents",
      "git show --topology",
      "git verify-merge"
    ],
    answer: 0,
    explanation: "`git rev-list --parents -n 1 HEAD` lists the latest commit hash followed by the hashes of all its direct parent commits."
  },
  {
    id: 6,
    question: "If `src/rateConfig.json` has conflicts in a JSON format, can conflict markers break JSON parsers?",
    options: [
      "Yes, `JSON.parse()` will throw a `SyntaxError: Unexpected token < in JSON` immediately if conflict markers are left in the file",
      "No, JSON parsers ignore `<` symbols",
      "JSON auto-resolves Git conflicts",
      "Git does not inject markers into JSON"
    ],
    answer: 0,
    explanation: "JSON strictly requires valid key-value pairs; conflict markers render the entire document invalid JSON syntax."
  },
  {
    id: 7,
    question: "What happens when you run `git add .` on a repository with resolved files?",
    options: [
      "Git stages all resolved files, converting index stages 1, 2, and 3 into Stage 0",
      "Git commits the files immediately",
      "Git discards the resolutions",
      "Git switches back to main"
    ],
    answer: 0,
    explanation: "`git add` marks unmerged paths as resolved and prepares them in Stage 0 for the upcoming merge commit."
  },
  {
    id: 8,
    question: "If a developer needs to inspect the incoming feature version of `src/taxCalculator.js` without markers, how can they read it directly?",
    options: [
      "git show :3:src/taxCalculator.js",
      "git show remote",
      "git read incoming",
      "git cat feature"
    ],
    answer: 0,
    explanation: "`git show :3:<path>` prints Stage 3 (incoming branch version) directly from the index."
  },
  {
    id: 9,
    question: "How do you inspect the common ancestor (base) version of a file from the index during an active conflict?",
    options: [
      "git show :1:src/taxCalculator.js",
      "git show base",
      "git ancestor src/taxCalculator.js",
      "git cat stage1"
    ],
    answer: 0,
    explanation: "`git show :1:<path>` prints Stage 1 (common base version) directly from the index."
  },
  {
    id: 10,
    question: "How do you inspect the local HEAD version of a file from the index during an active conflict?",
    options: [
      "git show :2:src/taxCalculator.js",
      "git show ours",
      "git stage2 view",
      "git read local"
    ],
    answer: 0,
    explanation: "`git show :2:<path>` prints Stage 2 (local HEAD version) directly from the index."
  },
  {
    id: 11,
    question: "What command displays a graphical ASCII tree of all branches, commits, and merge points?",
    options: [
      "git log --graph --oneline --all",
      "git tree --graph",
      "git ascii-log",
      "git show-graph"
    ],
    answer: 0,
    explanation: "`git log --graph --oneline --all` provides a clear ASCII visualization of commit DAG branching and merging history."
  },
  {
    id: 12,
    question: "In the terminal lab, what was the baseline consultation rate before branches diverged?",
    options: [
      "₹1,500/hr (with 18% GST)",
      "₹5,000/hr",
      "₹500/hr",
      "₹10,000/hr"
    ],
    answer: 0,
    explanation: "The initial baseline commit C1 configured hourlyRate to ₹1,500 with 18% standard GST."
  },
  {
    id: 13,
    question: "What rate changes did the `feature/corporate` branch introduce?",
    options: [
      "Hourly rate of ₹3,500 and GST rate of 28% (Luxury Corporate Slab)",
      "Hourly rate of ₹500",
      "Free consulting",
      "Hourly rate of ₹10,000"
    ],
    answer: 0,
    explanation: "The corporate branch increased rates to ₹3,500/hr and 28% GST for luxury corporate clients."
  },
  {
    id: 14,
    question: "What rate changes did the `main` branch introduce concurrently?",
    options: [
      "Standard revised hourly rate of ₹2,000 and 12% reduced GST rate",
      "Rate of ₹5,000",
      "Rate of ₹1,000",
      "Zero GST"
    ],
    answer: 0,
    explanation: "The main branch updated the standard revised slab to ₹2,000/hr and 12% essential GST."
  },
  {
    id: 15,
    question: "How did the final synthesized resolution in `src/rateConfig.json` handle both pricing models?",
    options: [
      "By storing both `standardHourlyRate: 2000` and `corporateHourlyRate: 3500`",
      "By deleting the JSON configuration",
      "By picking ₹2,000 and ignoring corporate clients",
      "By charging ₹0"
    ],
    answer: 0,
    explanation: "The resolution preserved both business tiers into explicit configuration attributes."
  },
  {
    id: 16,
    question: "What does `git log --oneline main..feature/corporate` show before merging?",
    options: [
      "Only the commits on `feature/corporate` that are NOT present on `main`",
      "All commits in the entire repo",
      "Only the merge base commit",
      "Nothing"
    ],
    answer: 0,
    explanation: "The double-dot syntax `branchA..branchB` shows commits reachable from branchB but not branchA."
  },
  {
    id: 17,
    question: "What does `git merge --no-commit feature/corporate` do?",
    options: [
      "Performs the 3-way merge and stages changes in the index, but pauses before creating the merge commit even if there are 0 conflicts",
      "Deletes the commit",
      "Aborts the merge",
      "Rebases the branch"
    ],
    answer: 0,
    explanation: "`--no-commit` allows developers to inspect and test the auto-merged results before the merge commit is recorded."
  },
  {
    id: 18,
    question: "If a developer makes a syntax error while manually editing `src/taxCalculator.js`, when will it be caught?",
    options: [
      "When running unit tests (`npm test` / `node src/taxCalculator.js`) before committing",
      "When pushing to GitHub",
      "Never",
      "When turning off the computer"
    ],
    answer: 0,
    explanation: "Running test suites immediately after editing conflict markers catches syntax and logic errors before they are committed."
  },
  {
    id: 19,
    question: "Can Git's merge base calculation handle complex histories with multiple branching and merging cycles?",
    options: [
      "Yes, `git merge-base` uses graph traversal algorithms to find the lowest common ancestor (LCA) in the DAG",
      "No, it only works on straight lines",
      "Only if branches are fewer than 3",
      "Only on Linux"
    ],
    answer: 0,
    explanation: "Git's merge-base algorithm finds the Lowest Common Ancestor (LCA) in arbitrary DAG commit topologies."
  },
  {
    id: 20,
    question: "What does `git merge-base --all branchA branchB` output if there are multiple common ancestors (criss-cross merge)?",
    options: [
      "All common ancestor commit hashes",
      "An error message",
      "The latest commit",
      "The oldest commit"
    ],
    answer: 0,
    explanation: "`--all` prints every maximal common ancestor when a criss-cross merge creates multiple merge bases."
  },
  {
    id: 21,
    question: "How do you test if your bash lab script executed cleanly without errors?",
    options: [
      "Check that the terminal exits with exit code 0 (`echo $?` returns 0)",
      "Check if computer beeps",
      "Check if Windows restarts",
      "Check if files are renamed"
    ],
    answer: 0,
    explanation: "In bash scripts configured with `set -euo pipefail`, exit code 0 confirms complete, uninterrupted success."
  },
  {
    id: 22,
    question: "What happens to the `.git/MERGE_MSG` file once `git commit` finishes successfully?",
    options: [
      "Git cleans up and deletes `.git/MERGE_MSG`",
      "It becomes a permanent branch",
      "It is emailed to GitHub",
      "It is encrypted"
    ],
    answer: 0,
    explanation: "Git removes temporary merge message scaffolding as soon as the commit is written to the object store."
  },
  {
    id: 23,
    question: "In VS Code, what keyboard shortcut opens the integrated terminal to run lab commands?",
    options: [
      "Ctrl + ` (Backtick) or Cmd + `",
      "Ctrl + Alt + Delete",
      "Alt + F4",
      "Ctrl + P"
    ],
    answer: 0,
    explanation: "Ctrl+` (or Cmd+` on macOS) toggles the integrated terminal in Visual Studio Code."
  },
  {
    id: 24,
    question: "Why does Sukanta Sir insist that every student run the standalone bash lab on their own local machine?",
    options: [
      "Because muscle memory in the terminal builds true engineering mastery and eliminates merge conflict fear forever",
      "To use up hard drive space",
      "To test internet bandwidth",
      "Because GUI tools are forbidden"
    ],
    answer: 0,
    explanation: "Hands-on terminal practice develops intuition, muscle memory, and professional confidence."
  },
  {
    id: 25,
    question: "What is the final state of the repository after completing Topic 13's terminal lab?",
    options: [
      "A fully integrated, tested, and green repository with a clean 2-parent merge commit uniting corporate and standard tax tiers",
      "A broken, conflicted repository",
      "An empty directory",
      "A detached HEAD state"
    ],
    answer: 0,
    explanation: "The repository concludes with a verified, cleanly resolved merge commit joining both feature lineages into `main`."
  }
];

export default questions;
