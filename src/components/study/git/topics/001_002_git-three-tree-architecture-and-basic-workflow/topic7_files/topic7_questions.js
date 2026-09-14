/**
 * Topic 7 Questions: The Philosophy of Atomic Commits
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic7_questions = [
  {
    id: 1,
    question: "What is the strict definition of an 'Atomic Commit' in software engineering?",
    options: [
      "A commit that touches every file in the repository",
      "A commit that embodies exactly one single logical change, leaving the project in a compiling, fully testable state",
      "A commit made by automated CI/CD bots",
      "A commit with zero file changes"
    ],
    correctAnswer: 1,
    explanation: "An atomic commit contains one indivisible unit of work (feature, fix, or refactor) that can be applied, reviewed, tested, or reverted independently."
  },
  {
    id: 2,
    question: "How do atomic commits assist the automated debugging tool `git bisect`?",
    options: [
      "`git bisect` can binary-search history and pinpoint the exact commit that introduced a bug, making root-cause diagnosis instantaneous",
      "`git bisect` runs only on repositories with more than 10,000 commits",
      "`git bisect` automatically fixes memory leaks",
      "`git bisect` generates pull request comments"
    ],
    correctAnswer: 0,
    explanation: "Because atomic commits isolate changes, `git bisect` can identify the exact commit responsible for a regression without confusing side effects."
  },
  {
    id: 3,
    question: "What happens when you need to revert a bug using `git revert` on a 'Mega-Commit' containing 10 different features?",
    options: [
      "Git automatically extracts only the buggy feature",
      "Reverting the mega-commit unwinds ALL 10 features, deleting good code along with the bad",
      "Git creates a conflict that cannot be resolved",
      "The repository gets locked"
    ],
    correctAnswer: 1,
    explanation: "Reverting a non-atomic mega-commit rolls back every unrelated feature included in that commit, causing unnecessary engineering churn."
  },
  {
    id: 4,
    question: "Which of the following represents a violation of the atomic commit principle?",
    options: [
      "Refactoring 3 functions in auth.js in one commit, followed by adding a new login endpoint in a second commit",
      "Bundling a database migration, CSS redesign, Prettier reformatting of 200 files, and a tax bug fix into a single commit",
      "Writing a unit test and the code that makes it pass in the same commit",
      "Adding a new translation string and its UI label in one commit"
    ],
    correctAnswer: 1,
    explanation: "Combining unrelated changes (formatting, styling, database schemas, and tax bug fixes) into one commit destroys auditability and bisectability."
  },
  {
    id: 5,
    question: "Why should code formatting/linting changes (e.g. Prettier/ESLint reformat) NEVER be mixed with business logic changes in the same commit?",
    options: [
      "Because linters prevent Git from committing",
      "Because thousands of lines of whitespace diffs obscure the 2 lines of critical business logic changes, making human code review nearly impossible",
      "Because formatting changes double repository size",
      "Because Git diff does not support spaces"
    ],
    correctAnswer: 1,
    explanation: "Formatting noise drowns out functional changes, blinding code reviewers to subtle bugs introduced alongside whitespace changes."
  },
  {
    id: 6,
    question: "What is the 'Green Build Guarantee' rule of atomic commits?",
    options: [
      "The UI background must be green",
      "Every commit checked into the repository must compile cleanly and pass all test suites on its own",
      "Commits can only be pushed during business hours",
      "The commit message must contain the word 'green'"
    ],
    correctAnswer: 1,
    explanation: "If you break a change across commits, intermediate commits should not leave the build broken, as this ruins `git bisect` and test automation."
  },
  {
    id: 7,
    question: "What Git command allows moving a single atomic commit from one branch to another (e.g. from `main` to `hotfix-v1.0`)?",
    options: [
      "git cherry-pick <commit-hash>",
      "git transport <commit-hash>",
      "git move-commit <commit-hash>",
      "git patch-apply <commit-hash>"
    ],
    correctAnswer: 0,
    explanation: "`git cherry-pick` applies the changes introduced by a single specific commit onto your current HEAD branch."
  },
  {
    id: 8,
    question: "How do atomic commits improve the code review experience for team members?",
    options: [
      "Reviewers can review small, logical chunks step-by-step, understanding the author's train of thought without cognitive overload",
      "Reviewers don't have to read the code",
      "It eliminates the need for unit tests",
      "It reduces GitHub server traffic"
    ],
    correctAnswer: 0,
    explanation: "Atomic commits break complex pull requests into digestible, narrative steps that make code reviews faster and more thorough."
  },
  {
    id: 9,
    question: "If a feature requires both backend API changes and frontend UI changes, what is the best atomic commit practice?",
    options: [
      "Commit 1: Implement backend API endpoint with tests; Commit 2: Implement frontend UI consuming the API",
      "Commit 1: Frontend UI that fails because backend doesn't exist; Commit 2: Fix backend",
      "Wait 3 months and commit everything at launch",
      "Commit each line of code as an individual commit"
    ],
    correctAnswer: 0,
    explanation: "Structuring the PR as two atomic, functional layers (Backend API first, Frontend consumption second) keeps each commit functional and clear."
  },
  {
    id: 10,
    question: "What tool covered in Topic 5 is essential for crafting atomic commits when multiple changes occurred in one file?",
    options: [
      "git add -p (patch mode)",
      "git clean -fd",
      "git clone",
      "git branch -D"
    ],
    correctAnswer: 0,
    explanation: "`git add -p` allows developers to stage individual logical chunks (hunks) into separate atomic commits."
  },
  {
    id: 11,
    question: "Is committing half-finished code that breaks compilation acceptable if you promise to fix it in the next commit?",
    options: [
      "No, because intermediate broken commits break `git bisect` and automated CI test runners",
      "Yes, Git is designed for broken intermediate commits",
      "Only on Friday afternoons",
      "Only if you use `--force`"
    ],
    correctAnswer: 0,
    explanation: "Commits in shared branches must always be in a functioning, compiling state."
  },
  {
    id: 12,
    question: "What is an interactive rebase (`git rebase -i`) commonly used for prior to opening a Pull Request?",
    options: [
      "To squash messy work-in-progress commits (e.g. 'wip', 'fix typo', 'oops') into clean, well-documented atomic commits",
      "To delete all unit tests",
      "To push code to production",
      "To bypass code reviews"
    ],
    correctAnswer: 0,
    explanation: "Interactive rebase lets developers clean up their local scratch commit trail into a pristine series of atomic commits."
  },
  {
    id: 13,
    question: "If Swadeep refactors an existing authentication class and then adds OAuth2 Google Login, how should this be committed?",
    options: [
      "One commit: `refactor(auth): prepare base class` followed by a second commit: `feat(auth): add OAuth2 Google Login`",
      "One single mega commit: `refactor and add oauth`",
      "Ten separate commits each containing 1 variable name change",
      "Never refactor before adding features"
    ],
    correctAnswer: 0,
    explanation: "Separating pure refactoring (zero functional change) from new feature addition makes both changes easy to audit and review."
  },
  {
    id: 14,
    question: "Why does Sukanta Hui compare an atomic commit to an accounting voucher entry at Barrackpore AccoTax?",
    options: [
      "Each voucher represents one complete, balanced transaction with debit, credit, date, and narrative; you never mix payroll and electricity bills in one voucher!",
      "Because vouchers expire in 30 days",
      "Because both require stamp paper",
      "Because accounting entries cannot use letters"
    ],
    correctAnswer: 0,
    explanation: "Just like accounting vouchers represent individual, balanced financial transactions, atomic commits represent isolated, verifiable code changes."
  },
  {
    id: 15,
    question: "What does `git log --graph --oneline` look like when atomic commits are practiced?",
    options: [
      "A clean, readable chronological narrative of discrete features and fixes",
      "A chaotic tangle of 'wip' and 'fix typo' entries",
      "Completely blank",
      "A single commit with 1,000,000 lines"
    ],
    correctAnswer: 0,
    explanation: "Atomic commit history reads like a clean, professional engineering changelog."
  },
  {
    id: 16,
    question: "Does being 'atomic' mean a commit must be small (e.g. under 10 lines)?",
    options: [
      "Not necessarily: atomicity is about singularity of purpose, not physical line count (e.g., adding an entire SVG icon library in one commit is atomic if it serves one purpose)",
      "Yes, any commit over 15 lines is non-atomic",
      "Atomic commits must always be exactly 1 line",
      "Line count determines Git licensing fees"
    ],
    correctAnswer: 0,
    explanation: "Atomicity is about logical cohesion and single responsibility, not an arbitrary line limit."
  },
  {
    id: 17,
    question: "If a developer writes unit tests for a new calculation, should the test be committed with the calculation or separately?",
    options: [
      "Ideally in the same commit with the calculation (or immediately preceding in TDD), so the commit represents a complete, self-verifying unit",
      "In a completely different repository",
      "Never commit unit tests",
      "Only after 1 year"
    ],
    correctAnswer: 0,
    explanation: "Pairing implementation with its test suite ensures the atomic unit is provably correct and verifiable."
  },
  {
    id: 18,
    question: "What risk is introduced when squashing a 50-commit PR with multiple distinct features into a single commit upon merge?",
    options: [
      "Loss of granular history and inability to revert individual sub-features later without rolling back the entire pull request",
      "The repository becomes read-only",
      "GitHub crashes",
      "File hashes become invalid"
    ],
    correctAnswer: 0,
    explanation: "Squashing indiscriminately turns a multi-faceted feature branch into an opaque mega-commit."
  },
  {
    id: 19,
    question: "What is the recommended size of a pull request that adheres to atomic commit philosophy?",
    options: [
      "Small and focused (typically 1 to 5 atomic commits, under 200–400 lines of focused diff)",
      "10,000 lines touching every subsystem",
      "At least 50 commits with no descriptions",
      "Pull requests should only contain 1 character changes"
    ],
    correctAnswer: 0,
    explanation: "Small, atomic pull requests receive faster, higher-quality reviews and have drastically lower defect rates."
  },
  {
    id: 20,
    question: "Which of the following commit sequences best represents atomic craftsmanship?",
    options: [
      "1. `docs: update setup guide` -> 2. `test: add user model tests` -> 3. `feat(user): add phone number validation`",
      "1. `wip` -> 2. `fix` -> 3. `done` -> 4. `final`",
      "1. `mega commit all files`",
      "1. `oops` -> 2. `revert oops` -> 3. `fix oops`"
    ],
    correctAnswer: 0,
    explanation: "The first sequence demonstrates clear, logical, granular progression where each commit has an unambiguous responsibility."
  },
  {
    id: 21,
    question: "How does practicing atomic commits impact onboarding for new developers joining a team?",
    options: [
      "New developers can study the commit log to understand the evolution and architectural decisions of the codebase step-by-step",
      "It requires them to attend 6 months of Git training",
      "It prevents them from making changes",
      "It makes the codebase private"
    ],
    correctAnswer: 0,
    explanation: "A pristine commit history serves as authoritative documentation explaining why the system was constructed the way it was."
  },
  {
    id: 22,
    question: "What command creates a patch file from a single atomic commit that can be emailed or transferred offline?",
    options: [
      "git format-patch -1 <commit-hash>",
      "git export <commit-hash>",
      "git send-file <commit-hash>",
      "git make-patch <commit-hash>"
    ],
    correctAnswer: 0,
    explanation: "`git format-patch` exports a commit into a standardized email-ready `.patch` file."
  },
  {
    id: 23,
    question: "If a developer discovers an unrelated minor bug while implementing a new feature, what is the professional atomic workflow?",
    options: [
      "Fix the minor bug in an isolated atomic commit (or separate branch), and keep the new feature in its own atomic commit",
      "Mix the fix into the feature commit without mentioning it",
      "Ignore the bug forever",
      "Delete the repository"
    ],
    correctAnswer: 0,
    explanation: "Separating unrelated fixes into distinct atomic commits preserves clean audit trails."
  },
  {
    id: 24,
    question: "What is the primary benefit of atomic commits during automated Continuous Integration (CI) test runs?",
    options: [
      "CI builds can cache and test discrete changes reliably, identifying exact regression points",
      "CI runs in 0 milliseconds",
      "CI servers never experience hardware failures",
      "It eliminates the need for code review"
    ],
    correctAnswer: 0,
    explanation: "CI pipelines can accurately report test status per commit, providing actionable feedback to engineers."
  },
  {
    id: 25,
    question: "What is the core motto taught by Sukanta Hui regarding atomic commits?",
    options: [
      "'One Commit, One Responsibility, Always Working, Easily Reversible'",
      "'Commit once a month on payday'",
      "'The bigger the commit, the smarter the coder'",
      "'Never write commit messages'"
    ],
    correctAnswer: 0,
    explanation: "Sukanta Hui's golden rule: One Commit, One Responsibility, Always Working, Easily Reversible."
  }
];

export default topic7_questions;
