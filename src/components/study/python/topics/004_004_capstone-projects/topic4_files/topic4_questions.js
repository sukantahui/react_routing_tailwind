// src/components/study/python/topics/004_004_capstone-projects/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Publishing projects to GitHub with Git commits, issues, and releases

const questions = [
  {
    question: "What is the 'Conventional Commits' specification and why is it important?",
    shortAnswer: "Conventional Commits is a lightweight convention on top of commit messages (e.g. 'feat:', 'fix:', 'docs:', 'refactor:', 'test:', 'chore:'), providing structured commit history that enables automated changelog generation and automatic semantic version bumping.",
    explanation: "Standardized commit syntax enabling automated release tooling.",
    hint: "Uses structured prefixes like feat: and fix: for readable history and automated changelogs.",
    level: "basic",
    codeExample: "git commit -m 'feat(admission): add Barrackpore scholarship rule'"
  },
  {
    question: "How does Semantic Versioning (SemVer: MAJOR.MINOR.PATCH) work in software releases?",
    shortAnswer: "MAJOR version increments on incompatible breaking API changes; MINOR version increments on backwards-compatible new features; PATCH version increments on backwards-compatible bug fixes.",
    explanation: "The SemVer versioning specification.",
    hint: "MAJOR = breaking changes, MINOR = new features, PATCH = bug fixes.",
    level: "basic",
    codeExample: "# 1.0.0 → 1.0.1 (Fix) → 1.1.0 (Feature) → 2.0.0 (Breaking change)"
  },
  {
    question: "What is the role of GitHub Actions in a modern Python CI/CD pipeline?",
    shortAnswer: "GitHub Actions automates continuous integration workflows on every Git push or pull request, executing test suites (pytest), linters (ruff), static type checkers (mypy), and coverage reports across multi-OS and multi-Python matrix environments.",
    explanation: "Automated continuous integration and testing with GitHub Actions.",
    hint: "Runs automated tests, linters, and type checks on every PR across Linux/Windows/macOS.",
    level: "basic",
    codeExample: "# .github/workflows/ci.yml runs on push & pull_request"
  },
  {
    question: "What is a 'Matrix Build' in GitHub Actions?",
    shortAnswer: "A strategy that automatically runs the same test job across multiple configurations simultaneously (e.g. 3 Python versions × 3 operating systems = 9 parallel test runs), ensuring cross-platform compatibility.",
    explanation: "Matrix job execution across OS and Python version combinations.",
    hint: "Runs tests concurrently across multiple Python versions and operating systems.",
    level: "moderate",
    codeExample: "strategy:\n  matrix:\n    os: [ubuntu-latest, windows-latest]\n    python: ['3.10', '3.12']"
  },
  {
    question: "What are GitHub 'Branch Protection Rules' and why should they be enabled on 'main'?",
    shortAnswer: "Branch protection rules prevent direct pushes to the 'main' branch, enforcing code reviews (PR approval requirements), linear Git history, and mandatory passing CI/CD status checks before any code can be merged.",
    explanation: "Enforcing quality gates and branch governance.",
    hint: "Blocks direct pushes to main, requiring passing CI tests and pull request code reviews.",
    level: "basic",
    codeExample: "# Enforce: Require pull request reviews + Require status checks to pass"
  },
  {
    question: "Where should GitHub Issue and Pull Request templates be placed in a repository?",
    shortAnswer: "Inside the '.github/ISSUE_TEMPLATE/' directory (for 'bug_report.md' and 'feature_request.md') and '.github/pull_request_template.md', guiding contributors to submit complete diagnostic information.",
    explanation: "Standard repository community templates location.",
    hint: "Inside the .github/ folder (.github/ISSUE_TEMPLATE/ and .github/pull_request_template.md).",
    level: "basic",
    codeExample: ".github/ISSUE_TEMPLATE/bug_report.md\n.github/pull_request_template.md"
  },
  {
    question: "What is the difference between Trunk-Based Development and Git Flow?",
    shortAnswer: "Trunk-Based Development merges small, frequent branches directly into the 'main' trunk using short-lived feature branches and continuous integration; Git Flow uses long-lived branches (main, develop, feature, release, hotfix) with scheduled release cycles.",
    explanation: "Branching strategies comparison in modern software engineering.",
    hint: "Trunk-Based uses short-lived branches merged quickly into main; Git Flow uses multiple long-lived branches.",
    level: "moderate",
    codeExample: "# Trunk-Based: feature-branch → PR → main (Fast CI/CD rhythm)"
  },
  {
    question: "How do you create and push an annotated Git release tag to GitHub?",
    shortAnswer: "Run 'git tag -a v1.0.0 -m \"Release version 1.0.0\"' and push it with 'git push origin v1.0.0' (or 'git push --tags').",
    explanation: "Creating and publishing annotated Git release tags.",
    hint: "git tag -a v1.0.0 -m 'Release 1.0.0' && git push origin v1.0.0.",
    level: "basic",
    codeExample: "git tag -a v1.0.0 -m 'Version 1.0.0 Release'\ngit push origin v1.0.0"
  },
  {
    question: "What is a 'Wheel' distribution ('.whl') in Python packaging?",
    shortAnswer: "A Wheel is a built-package format (ZIP-based archive) that can be installed instantly by 'pip' without needing to run build steps or compile C extensions at install time, providing fast and reliable package installation.",
    explanation: "Python built distribution standard (PEP 427).",
    hint: "A pre-built package archive (.whl) that pip installs instantly without build overhead.",
    level: "moderate",
    codeExample: "python -m build # Generates dist/my_package-1.0.0-py3-none-any.whl"
  },
  {
    question: "What is the purpose of 'Trusted Publishing' (OIDC) when publishing Python packages to PyPI from GitHub Actions?",
    shortAnswer: "OpenID Connect (OIDC) allows GitHub Actions workflows to publish packages to PyPI directly using short-lived cryptographic tokens, eliminating the need to store long-lived permanent API tokens in GitHub repository secrets.",
    explanation: "Modern secure package publishing via OIDC Trusted Publishing.",
    hint: "Uses short-lived tokens to publish to PyPI without storing permanent secret keys.",
    level: "complex",
    codeExample: "permissions:\n  id-token: write # Required for PyPI OIDC Trusted Publishing"
  },
  {
    question: "What is a 'Draft Release' on GitHub?",
    shortAnswer: "An unpublished release staging area that allows maintainers to prepare release notes, review changelogs, and attach compiled wheel binaries before making the release publicly visible to users.",
    explanation: "Release staging and drafting in GitHub.",
    hint: "A private staging area for release notes and wheel assets before public release.",
    level: "basic",
    codeExample: "# Draft releases allow review of release notes before publishing"
  },
  {
    question: "Why should you never use 'git commit -m \"fixes\"' or vague commit messages?",
    shortAnswer: "Vague commit messages destroy project history, make debugging regressions via 'git bisect' nearly impossible, and prevent automated tools from generating clear release changelogs.",
    explanation: "Git history hygiene and bisect debugging.",
    hint: "Destroys project history and prevents automated changelogs; always write descriptive commit messages.",
    level: "basic",
    codeExample: "# ANTI-PATTERN: git commit -m 'update code'\n# BEST PRACTICE: git commit -m 'fix(ledger): correct tuition tax rounding'"
  },
  {
    question: "What is 'git bisect' and how does clean Git history facilitate it?",
    shortAnswer: "'git bisect' uses binary search through commit history to automatically pinpoint the exact commit that introduced a bug; having small atomic commits that each pass tests makes bisecting fast and accurate.",
    explanation: "Binary search regression hunting via git bisect.",
    hint: "Uses binary search to find the exact commit that caused a regression.",
    level: "moderate",
    codeExample: "git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0.0"
  },
  {
    question: "What does the 'actions/checkout@v4' action do in GitHub Actions?",
    shortAnswer: "It clones the Git repository into the CI runner's workspace so subsequent workflow steps can access source code, test files, and configuration manifests.",
    explanation: "Repository checkout step in GitHub Actions.",
    hint: "Clones your repository code into the GitHub Actions virtual runner.",
    level: "basic",
    codeExample: "- uses: actions/checkout@v4"
  },
  {
    question: "What is the purpose of an open-source 'LICENSE' file (e.g. MIT vs Apache 2.0)?",
    shortAnswer: "The LICENSE file legally grants others permission to use, copy, modify, and distribute your software under specified terms; without a license, the code is under exclusive copyright and legally cannot be used by anyone else.",
    explanation: "Open-source legal licensing fundamentals.",
    hint: "Legally grants permission to use and modify your software; without it, code cannot be legally used.",
    level: "basic",
    codeExample: "# MIT License: Permissive, simple, allows commercial & private use"
  },
  {
    question: "How do you automatically attach binary build artifacts (wheels, tarballs) to a GitHub Release?",
    shortAnswer: "Using the 'softprops/action-gh-release' action in a release workflow triggered on Git tag push ('tags: [\"v*\"]'), uploading all files matching 'dist/*'.",
    explanation: "Automated release asset attachment.",
    hint: "Trigger on tag push and use action-gh-release to upload files in dist/*.",
    level: "moderate",
    codeExample: "- uses: softprops/action-gh-release@v2\n  with:\n    files: dist/*"
  },
  {
    question: "What is 'Squash and Merge' in GitHub Pull Requests?",
    shortAnswer: "Squash and Merge combines all intermediate commits from a feature branch into a single clean commit on the 'main' branch, keeping the main history tidy and linear.",
    explanation: "Linear git history through PR commit squashing.",
    hint: "Combines all branch commits into one single commit when merging to main.",
    level: "basic",
    codeExample: "# Consolidates 10 WIP commits into 1 clean Conventional Commit on main"
  },
  {
    question: "How do you specify Python version requirements in 'pyproject.toml'?",
    shortAnswer: "Under the '[project]' table using the 'requires-python' key (e.g. 'requires-python = \">=3.10\"').",
    explanation: "Specifying minimum supported Python runtime versions.",
    hint: "Use 'requires-python = \">=3.10\"' inside pyproject.toml.",
    level: "basic",
    codeExample: "[project]\nrequires-python = '>=3.10'"
  },
  {
    question: "What is an 'Atomic Commit' in Git?",
    shortAnswer: "An atomic commit makes a single, complete, cohesive change (and its corresponding test updates) that leaves the codebase in a working, passing state, never mixing unrelated bug fixes or refactoring.",
    explanation: "Atomic commit discipline in professional engineering.",
    hint: "A single cohesive change with its tests that leaves the test suite passing.",
    level: "basic",
    codeExample: "# Atomic commit: feature implementation + unit tests together"
  },
  {
    question: "What is the ultimate golden rule of publishing Python software to GitHub?",
    shortAnswer: "Follow Conventional Commits, protect the 'main' branch with mandatory multi-platform CI/CD quality gates, publish tagged releases with automated changelogs and wheel assets, and provide clear issue templates.",
    explanation: "The complete enterprise Python GitHub publishing standard.",
    hint: "Conventional commits + protected main + multi-OS CI/CD + tagged releases with wheels.",
    level: "basic",
    codeExample: "# Enterprise GitHub Publishing Standard"
  }
];

export default questions;
