/**
 * Topic 8 Questions: Conventional Commits Specification
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic8_questions = [
  {
    id: 1,
    question: "What is the primary structure of a Conventional Commit message?",
    options: [
      "<type>[optional scope]: <description>",
      "[date] [author] <message>",
      "git::commit -> <message>",
      "CHANGE: <type> = <description>"
    ],
    correctAnswer: 0,
    explanation: "The Conventional Commits v1.0.0 specification defines the structure as `<type>[optional scope]: <description>`, followed by optional body and footer(s)."
  },
  {
    id: 2,
    question: "Which Conventional Commit type corresponds to a MINOR version bump in Semantic Versioning (SemVer)?",
    options: [
      "feat",
      "fix",
      "chore",
      "docs"
    ],
    correctAnswer: 0,
    explanation: "`feat` introduces a new feature to the codebase, which maps to a MINOR release bump (e.g. 1.2.0 -> 1.3.0)."
  },
  {
    id: 3,
    question: "Which Conventional Commit type corresponds to a PATCH version bump in Semantic Versioning?",
    options: [
      "fix",
      "feat",
      "ci",
      "build"
    ],
    correctAnswer: 0,
    explanation: "`fix` patches a bug in your codebase, which maps to a PATCH release bump (e.g. 1.2.0 -> 1.2.1)."
  },
  {
    id: 4,
    question: "How is a BREAKING CHANGE denoted in Conventional Commits to trigger a MAJOR SemVer bump?",
    options: [
      "Placing an exclamation mark `!` after the type/scope (e.g. `feat(api)!: drop v1 endpoints`) OR adding a `BREAKING CHANGE:` footer",
      "Capitalizing the entire commit message in all caps",
      "Writing 'EMERGENCY' in the body",
      "Adding a warning emoji in the branch name"
    ],
    correctAnswer: 0,
    explanation: "A breaking change is signaled either with a `!` before the colon (e.g., `feat!:`) or with `BREAKING CHANGE:` in the footer."
  },
  {
    id: 5,
    question: "What does the `refactor` type signify?",
    options: [
      "A code change that neither fixes a bug nor adds a new feature (e.g., extracting functions, restructuring files)",
      "Rewriting the whole application from scratch",
      "Deleting obsolete repositories",
      "Changing the project manager"
    ],
    correctAnswer: 0,
    explanation: "`refactor` denotes internal code cleanup or restructurings that do not alter externally observable behavior."
  },
  {
    id: 6,
    question: "What is the difference between the `style` type and `refactor` type?",
    options: [
      "`style` is for visual CSS only",
      "`style` is for changes that do not affect the meaning of the code (white-space, formatting, semi-colons, Prettier), whereas `refactor` changes code structure",
      "`style` modifies database tables",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "`style` covers non-functional formatting rules (whitespace, lint fixes), while `refactor` alters the code structure without modifying business logic."
  },
  {
    id: 7,
    question: "Which type should be used when updating GitHub Actions workflow `.github/workflows/ci.yml`?",
    options: [
      "ci",
      "feat",
      "docs",
      "style"
    ],
    correctAnswer: 0,
    explanation: "`ci` is specifically reserved for changes to CI configuration files and automation scripts (e.g., GitHub Actions, Travis, CircleCI)."
  },
  {
    id: 8,
    question: "Which type should be used when updating `package.json` dependencies or webpack/vite configuration?",
    options: [
      "build",
      "perf",
      "docs",
      "feat"
    ],
    correctAnswer: 0,
    explanation: "`build` designates changes that affect the build system or external package dependencies (e.g., npm, webpack, Vite, maven)."
  },
  {
    id: 9,
    question: "What does the `perf` type represent?",
    options: [
      "Performance improvement code changes",
      "Periodic automated backup",
      "Permanent file deletion",
      "Product requirement definition"
    ],
    correctAnswer: 0,
    explanation: "`perf` is used for code changes that specifically improve runtime speed or memory performance."
  },
  {
    id: 10,
    question: "What does the `docs` type represent?",
    options: [
      "Documentation only changes (e.g., updating README, JSDoc comments, API documentation)",
      "Docker container creation",
      "Doctor appointment scheduler",
      "Database schemas"
    ],
    correctAnswer: 0,
    explanation: "`docs` is strictly used for documentation changes."
  },
  {
    id: 11,
    question: "What does the `test` type represent?",
    options: [
      "Adding missing unit/integration tests or refactoring existing test suites",
      "Testing in production without committing",
      "Temporary trial commits",
      "Beta testing invites"
    ],
    correctAnswer: 0,
    explanation: "`test` covers additions or corrections to automated test suites."
  },
  {
    id: 12,
    question: "What does the `chore` type represent?",
    options: [
      "Routine maintenance tasks, updating .gitignore, or updating license headers",
      "A broken build",
      "A major feature launch",
      "A database deadlock"
    ],
    correctAnswer: 0,
    explanation: "`chore` covers miscellaneous maintenance tasks that do not modify src files or test files."
  },
  {
    id: 13,
    question: "In `feat(invoice): add PDF invoice generation`, what is `(invoice)`?",
    options: [
      "The optional noun describing the section/scope of the codebase affected",
      "The author's name",
      "The branch name",
      "The ticket priority"
    ],
    correctAnswer: 0,
    explanation: "The optional scope enclosed in parentheses specifies the module or component affected by the commit."
  },
  {
    id: 14,
    question: "How do automated tools (e.g. `semantic-release`, `standard-version`) use Conventional Commits?",
    options: [
      "They automatically calculate the next SemVer version number, create Git release tags, and compile a structured CHANGELOG.md without human intervention",
      "They delete obsolete branches",
      "They reformat all images in the repo",
      "They submit app store reviews"
    ],
    correctAnswer: 0,
    explanation: "Conventional Commits allows CI pipelines to completely automate releases, semantic versioning, and changelog generation."
  },
  {
    id: 15,
    question: "Is `Feat: add login` (capitalized type) strictly valid according to Conventional Commits standard?",
    options: [
      "Types are conventionally written in lowercase (`feat:`, `fix:`) for consistency with linters like commitlint",
      "Yes, types must always be uppercase",
      "Only if written in bold",
      "Only in Python projects"
    ],
    correctAnswer: 0,
    explanation: "Conventional Commits rules recommend lowercase types (`feat:`, `fix:`, `docs:`) to prevent parser discrepancies."
  },
  {
    id: 16,
    question: "Should there be a space after the colon in `feat: add login`?",
    options: [
      "Yes, the colon must be followed by a single space before the description",
      "No, colons must connect directly with no spaces",
      "Two spaces are required",
      "A tab is required"
    ],
    correctAnswer: 0,
    explanation: "The specification requires a single space after the colon: `<type>[scope]: <description>`."
  },
  {
    id: 17,
    question: "What tool is widely used to enforce Conventional Commits rules in Git via pre-commit hooks?",
    options: [
      "@commitlint/cli with husky",
      "eslint",
      "prettier",
      "webpack"
    ],
    correctAnswer: 0,
    explanation: "`commitlint` coupled with `husky` pre-commit/commit-msg hooks prevents non-compliant commit messages from being created."
  },
  {
    id: 18,
    question: "Which of the following is a valid Conventional Commit with breaking change footer?",
    options: [
      "feat(api): change user response payload format\n\nBREAKING CHANGE: The `user_name` field has been renamed to `username`.",
      "BREAKING CHANGE FEAT: user api payload changed",
      "feat: breaking change made",
      "api: change user format (breaking)"
    ],
    correctAnswer: 0,
    explanation: "The first example correctly places `BREAKING CHANGE:` in the footer with a clear description."
  },
  {
    id: 19,
    question: "What does the `revert` type represent?",
    options: [
      "A commit that reverts a previous commit, referencing its SHA in the header or body (e.g. `revert: feat(auth): add google login`)",
      "A branch deletion",
      "A merge conflict resolution",
      "A database rollback"
    ],
    correctAnswer: 0,
    explanation: "`revert:` indicates that a previous commit has been reverted."
  },
  {
    id: 20,
    question: "Why does Sukanta Hui mandate Conventional Commits in the Barrackpore accounting project?",
    options: [
      "Because when clients request changelogs for GST audit compliance, a complete formatted CHANGELOG can be generated in 1 second",
      "Because GitHub blocks unformatted commits",
      "Because it reduces disk space on AWS",
      "Because it compiles C++ faster"
    ],
    correctAnswer: 0,
    explanation: "Conventional Commits enables instantaneous generation of client-facing release notes and transparent audit trails."
  },
  {
    id: 21,
    question: "Can a Conventional Commit description end with a period `.`?",
    options: [
      "Standard conventions recommend NO trailing period in the subject description line",
      "A trailing period is mandatory",
      "Two trailing periods are required",
      "Only in French repositories"
    ],
    correctAnswer: 0,
    explanation: "Subject lines are concise headings and should not conclude with a trailing period."
  },
  {
    id: 22,
    question: "Which type should be used when adding an index to a database column to speed up queries without altering API signatures?",
    options: [
      "perf(db): add index on invoice_date column",
      "feat: database index",
      "style: db index",
      "chore: speed up db"
    ],
    correctAnswer: 0,
    explanation: "`perf(db)` accurately reflects a performance improvement."
  },
  {
    id: 23,
    question: "Can multiple scopes be specified in a commit (e.g., `feat(auth,billing): ...`)?",
    options: [
      "While some teams allow comma-separated scopes, touching multiple distinct domains often signals that the commit should be broken into two atomic commits",
      "Multiple scopes are strictly forbidden by Git binary",
      "Scopes can only be numbers",
      "Scopes are required in every commit"
    ],
    correctAnswer: 0,
    explanation: "A commit touching multiple unrelated scopes often violates the single-responsibility principle of atomic commits."
  },
  {
    id: 24,
    question: "What is the relationship between Conventional Commits and the Angular Commit Guidelines?",
    options: [
      "Conventional Commits is directly based on the Angular Commit Guidelines, formalized as an open industry-wide standard",
      "They are completely unrelated and conflicting",
      "Angular banned Conventional Commits",
      "Conventional Commits only works in Angular projects"
    ],
    correctAnswer: 0,
    explanation: "The Conventional Commits specification originated from the Angular team's established commit message conventions."
  },
  {
    id: 25,
    question: "Which of the following is the most professional Conventional Commit message?",
    options: [
      "fix(tax): handle zero-quantity items without throwing DivisionByZero error\n\nWhen an invoice was submitted with zero line items, the tax computation threw an unhandled exception. Added guard condition to return 0.00 immediately.\n\nFixes #142",
      "fixed zero qty bug",
      "TAX BUG FIX",
      "fix: bugs"
    ],
    correctAnswer: 0,
    explanation: "The first option adheres to all rules: clear type/scope, imperative summary without period, informative body explaining context and resolution, and issue reference."
  }
];

export default topic8_questions;
