/**
 * Topic 13 Questions: Classroom Walkthrough (Invoice Management Project with Atomic Commits)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic13_questions = [
  {
    id: 1,
    question: "In the Barrackpore Invoice Management project, what was the first atomic commit executed by Sachin?",
    options: [
      "`chore: initialize repository and configure .gitignore`",
      "`feat: write 5,000 lines of UI code`",
      "`fix: everything`",
      "`wip: invoice`"
    ],
    correctAnswer: 0,
    explanation: "Professional workflow begins with repository initialization and `.gitignore` setup to prevent committing junk from day one."
  },
  {
    id: 2,
    question: "Why did Susmita commit unit tests (`test(core): ...`) before the calculation algorithm was finalized?",
    options: [
      "Following Test-Driven Development (TDD) principles to establish clear behavioral expectations and maintain the 'Green Build Guarantee'",
      "Because Git requires test files before code files",
      "Because tests take longer to upload to GitHub",
      "To increase line count"
    ],
    correctAnswer: 0,
    explanation: "Committing tests first or alongside features ensures unambiguous verification standards."
  },
  {
    id: 3,
    question: "When Abhronila fixed a rounding bug in `calc.js`, she also added debugging logs. Which command did she use to stage ONLY the bug fix?",
    options: [
      "git add -p calc.js",
      "git add .",
      "git add -A",
      "git commit -am 'fix'"
    ],
    correctAnswer: 0,
    explanation: "`git add -p` (patch mode) allowed her to stage the calculation fix while leaving debug logs unstaged."
  },
  {
    id: 4,
    question: "What Conventional Commit type did Debangshu use when extracting discount logic into a separate helper without altering calculations?",
    options: [
      "refactor(calc): extract discount helper into separate module",
      "feat(calc): extract discount helper",
      "fix: extracted helper",
      "chore: helper extracted"
    ],
    correctAnswer: 0,
    explanation: "`refactor` is specifically designated for internal structural improvements that leave observable functionality unchanged."
  },
  {
    id: 5,
    question: "What command did the team run before every commit to inspect staged diffs and prevent secret leakage?",
    options: [
      "git diff --staged",
      "git pull",
      "git branch",
      "git clean"
    ],
    correctAnswer: 0,
    explanation: "Running `git diff --staged` audits the exact snapshot staged in the index ready for commitment."
  },
  {
    id: 6,
    question: "How did the team structure their commit messages according to the 50/72 rule?",
    options: [
      "50-character imperative title, a blank line, and 72-character wrapped body explaining why the change was made",
      "50 words per message, 72 commits per day",
      "50 files per commit",
      "72 commits per branch"
    ],
    correctAnswer: 0,
    explanation: "The 50/72 rule ensures clean summaries in `git log --oneline` and readable multi-line bodies."
  },
  {
    id: 7,
    question: "When Mahima added a temporary local benchmark script `speed_test.js`, where did she add its path so team teammates wouldn't see it?",
    options: [
      ".git/info/exclude",
      "team .gitignore",
      "README.md",
      "package.json"
    ],
    correctAnswer: 0,
    explanation: "`.git/info/exclude` is the private local exclusion file that is never shared with the remote team."
  },
  {
    id: 8,
    question: "What was the result when the team ran `git log --oneline --graph` at the end of the walkthrough?",
    options: [
      "A pristine, readable chronological history of discrete features, tests, and refactors",
      "A mess of 'wip' and 'fix typo' commits",
      "A blank screen",
      "An out-of-memory error"
    ],
    correctAnswer: 0,
    explanation: "Discipline in atomic commits produces an elegant, professional git log history."
  },
  {
    id: 9,
    question: "How did Conventional Commits simplify the generation of the client-facing CHANGELOG for the project?",
    options: [
      "Automated tools parsed the `feat` and `fix` commit headers to generate a formatted markdown CHANGELOG.md in 1 second",
      "The team had to spend 4 hours writing it manually in Microsoft Word",
      "GitHub banned the repo",
      "It deleted previous commits"
    ],
    correctAnswer: 0,
    explanation: "Machine-readable commit logs enable instantaneous, automated changelog generation."
  },
  {
    id: 10,
    question: "What command did Sukanta Hui teach the cohort to alias as `git st` for rapid status checks?",
    options: [
      "git config --global alias.st 'status -sb'",
      "git alias st='status'",
      "alias git='git st'",
      "npm i -g git-st"
    ],
    correctAnswer: 0,
    explanation: "`git status -sb` provides compact two-column status with branch tracking info."
  },
  {
    id: 11,
    question: "If a severe bug were introduced in Commit 5, how easily could the team revert it?",
    options: [
      "Run `git revert <SHA-of-commit-5>` cleanly because Commit 5 was atomic and isolated",
      "They would have to delete the entire project and start over",
      "Reverting would break all other commits",
      "Git does not support reverting"
    ],
    correctAnswer: 0,
    explanation: "Atomic commits guarantee clean, conflict-free rollbacks using `git revert`."
  },
  {
    id: 12,
    question: "What is the primary lesson taught by Sukanta Hui throughout this invoice walkthrough?",
    options: [
      "Professional version control is about intentional curation of history, not just cloud backup",
      "Always commit directly to main with `-m 'update'`",
      "Never write unit tests",
      "Ignore .gitignore"
    ],
    correctAnswer: 0,
    explanation: "Git is a precision tool for crafting living technical documentation and auditable software releases."
  },
  {
    id: 13,
    question: "Which student was responsible for configuring the initial `.gitignore` rules in the project?",
    options: [
      "Sachin",
      "Mahima",
      "Susmita",
      "Abhronila"
    ],
    correctAnswer: 0,
    explanation: "Sachin began the project by creating `.gitignore` and committing the initial repository structure."
  },
  {
    id: 14,
    question: "Which command reveals the exact diff introduced by Sachin's initial commit?",
    options: [
      "git show HEAD~6 (or specific SHA)",
      "git diff",
      "git status",
      "git reflog"
    ],
    correctAnswer: 0,
    explanation: "`git show <SHA>` displays the metadata and diff for that specific commit."
  },
  {
    id: 15,
    question: "What file extension was used for the unit tests in the project walkthrough?",
    options: [
      ".test.js (or .spec.js)",
      ".txt",
      ".exe",
      ".doc"
    ],
    correctAnswer: 0,
    explanation: "JavaScript testing conventions use `.test.js` or `.spec.js`."
  },
  {
    id: 16,
    question: "Did the team commit `.env` or `.env.example` in the repository?",
    options: [
      "They committed `.env.example` with dummy values and ignored `.env` in `.gitignore`",
      "They committed `.env` with real database passwords",
      "They ignored both files",
      "They deleted `.env.example`"
    ],
    correctAnswer: 0,
    explanation: "Best practice is committing `.env.example` while strictly ignoring `.env`."
  },
  {
    id: 17,
    question: "What happened when Sachin tested `git status -s` after running `git add calc.js` and making a subsequent edit?",
    options: [
      "The status showed `MM calc.js` indicating dual staged and unstaged modifications",
      "Git threw an error",
      "The file was deleted",
      "The staged changes were lost"
    ],
    correctAnswer: 0,
    explanation: "`MM` signifies that a file has staged changes in Index and newer unstaged changes in the Working Tree."
  },
  {
    id: 18,
    question: "How did the team resolve the `MM` dual state before committing?",
    options: [
      "They ran `git add calc.js` again to update the staging area with the latest changes",
      "They deleted the repository",
      "They ran git reset --hard",
      "They ignored calc.js"
    ],
    correctAnswer: 0,
    explanation: "Re-running `git add` synchronizes the Staging Area Index with the newest Working Tree edits."
  },
  {
    id: 19,
    question: "What tool did the team use to verify that no secret files were staged before pushing?",
    options: [
      "git status -s and git diff --staged",
      "Google Chrome",
      "Windows Notepad",
      "Calculator"
    ],
    correctAnswer: 0,
    explanation: "`git status -s` and `git diff --staged` are the primary visual verification tools."
  },
  {
    id: 20,
    question: "Which command verified that the `.DS_Store` file was properly ignored by the global ignore file?",
    options: [
      "git check-ignore -v .DS_Store",
      "git find .DS_Store",
      "git status --ds",
      "git hide .DS_Store"
    ],
    correctAnswer: 0,
    explanation: "`git check-ignore -v` pinpoints the matching ignore rule and its source file."
  },
  {
    id: 21,
    question: "What was the final commit in the walkthrough project?",
    options: [
      "`docs: update API documentation in README`",
      "`fix: final`",
      "`done`",
      "`commit 7`"
    ],
    correctAnswer: 0,
    explanation: "Susmita completed the project with a clean `docs:` commit updating the README."
  },
  {
    id: 22,
    question: "How many distinct team members contributed atomic commits to this invoice walkthrough?",
    options: [
      "5 students (Sachin, Mahima, Susmita, Abhronila, Debangshu)",
      "Only 1 person",
      "100 bots",
      "0 students"
    ],
    correctAnswer: 0,
    explanation: "All 5 Barrackpore cohort students contributed focused, atomic commits."
  },
  {
    id: 23,
    question: "Why was this project walkthrough successful without any merge conflicts?",
    options: [
      "Because each student worked on well-defined atomic modules with clean staging and commit practices",
      "Because they only used 1 branch",
      "Because Git disabled conflicts",
      "Because they did not write code"
    ],
    correctAnswer: 0,
    explanation: "Atomic commit discipline and clear modularization prevent merge collisions."
  },
  {
    id: 24,
    question: "Can this invoice management repository be cloned and verified using the bash lab script?",
    options: [
      "Yes, `topic13_files/invoice_project_walkthrough_lab.sh` executes the full walkthrough automatically",
      "No, bash scripts cannot run Git commands",
      "Only on macOS",
      "Only with root access"
    ],
    correctAnswer: 0,
    explanation: "The companion bash lab script recreates the entire multi-commit history automatically."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's final verdict on the cohort's performance?",
    options: [
      "'Exemplary engineering craftsmanship: clean commits, zero bloat, complete test coverage, and professional auditability!'",
      "'Too many commits'",
      "'Failed'",
      "'Do it over'"
    ],
    correctAnswer: 0,
    explanation: "The cohort demonstrated production-grade Git mastery."
  }
];

export default topic13_questions;
