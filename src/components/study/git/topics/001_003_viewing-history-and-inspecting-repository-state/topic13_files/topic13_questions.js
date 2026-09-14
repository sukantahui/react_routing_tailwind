// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 13: Classroom Case Study: Debangshu and Swadeep diagnosing an unexpected production price discount calculation bug using git blame and git log -S
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "In the Barrackpore discount calculation incident, what was the first command Swadeep used to locate who modified the faulty formula line?",
    options: [
      "git blame -w -L 12,18 src/billing/discount_engine.js",
      "git reset --hard HEAD~5",
      "git log --all --stat",
      "git status"
    ],
    correctAnswer: 0,
    explanation: "'git blame -w -L 12,18' immediately identified the commit hash and author responsible for the faulty formula line."
  },
  {
    id: 2,
    question: "Why was 'git show 7b1e4a8' crucial after identifying Debangshu's commit hash with git blame?",
    options: [
      "It displayed the commit message 'test(promo): temp 50% discount test', proving the change was an accidental debug leak rather than malice",
      "It automatically deployed the fix to production",
      "It deleted Debangshu's Git account",
      "It encrypted the source code"
    ],
    correctAnswer: 0,
    explanation: "'git show' revealed the commit message and intent, providing vital engineering context for root-cause analysis."
  },
  {
    id: 3,
    question: "Which command allowed the team to find when the safety boundary 'MAX_DISCOUNT_CAP' was originally removed from the codebase?",
    options: [
      "git log -S \"MAX_DISCOUNT_CAP\" -p",
      "git grep \"MAX_DISCOUNT_CAP\"",
      "git status --find-cap",
      "git diff --deleted MAX_DISCOUNT_CAP"
    ],
    correctAnswer: 0,
    explanation: "'git log -S' (the pickaxe) searched the historical diff stream to locate the exact commit where the cap was deleted."
  },
  {
    id: 4,
    question: "Why did 'git grep \"MAX_DISCOUNT_CAP\"' fail to find the safety cap constant in the workspace?",
    options: [
      "Because the constant had been deleted in an earlier commit and no longer existed in the active working tree",
      "Because git grep only works on uppercase words",
      "Because the file was untracked",
      "Because git grep is case-sensitive"
    ],
    correctAnswer: 0,
    explanation: "'git grep' only searches active files on disk, making it useless for finding deleted constants."
  },
  {
    id: 5,
    question: "What core ethical lesson does Sukanta Sir emphasize during production bug post-mortems?",
    options: [
      "Use Git forensics for blameless root-cause analysis and systemic safeguards, never for personal shaming",
      "Always delete the commits of junior engineers who make mistakes",
      "Disable git log permissions for students",
      "Ban temporary testing commits completely"
    ],
    correctAnswer: 0,
    explanation: "Blameless post-mortems focus on process improvement, pre-commit hooks, and test automation rather than personal blame."
  },
  {
    id: 6,
    question: "How did Swadeep recover the exact implementation of 'MAX_DISCOUNT_CAP' once the deletion commit SHA 'e4a9012' was found?",
    options: [
      "By running 'git show e4a9012~1:src/billing/discount_engine.js'",
      "By rewriting the entire algorithm from memory",
      "By resetting HEAD to e4a9012",
      "By restoring from external tape backup"
    ],
    correctAnswer: 0,
    explanation: "Inspecting the parent revision ('e4a9012~1') extracted the original constant definition cleanly without disrupting the workspace."
  },
  {
    id: 7,
    question: "Which automated tooling mechanism would have prevented Debangshu's debug commit from reaching production in the first place?",
    options: [
      "A pre-commit or CI linter hook that rejects debug commits matching 'temp' or non-standard multipliers, plus automated unit test suites",
      "Disabling Git on developer laptops",
      "Running git init on every deployment",
      "Requiring all commits to be signed by Linus Torvalds"
    ],
    correctAnswer: 0,
    explanation: "Pre-commit hooks and automated CI unit tests catch rogue constants and debugging values before merges."
  },
  {
    id: 8,
    question: "What is the 'Golden Tri-Factor' of Git code forensics demonstrated in this case study?",
    options: [
      "1. git blame (Line Attribution) -> 2. git show (Commit Context) -> 3. git log -S (Historical Retrieval)",
      "git init -> git add -> git commit",
      "git push -> git pull -> git clone",
      "git branch -> git checkout -> git merge"
    ],
    correctAnswer: 0,
    explanation: "Combining blame (who/which commit), show (why/what diff), and pickaxe (when created/destroyed) provides complete forensic power."
  },
  {
    id: 9,
    question: "What was the role of the '-w' flag when Swadeep ran 'git blame' on the discount engine file?",
    options: [
      "It ensured that a recent indentation/formatting pass did not hide the commit that actually altered the discount formula",
      "It opened the blame output in a web browser",
      "It wrote the report to disk",
      "It checked the whole repository"
    ],
    correctAnswer: 0,
    explanation: "'-w' bypassed whitespace shifts, attributing the formula modification directly to the logic commit."
  },
  {
    id: 10,
    question: "If a developer wants to see the author and date for lines 10 to 20 in a file, which command should be used?",
    options: [
      "git blame -L 10,20 <file>",
      "git log -L 10,20 <file>",
      "git diff -L 10,20 <file>",
      "git check -L 10,20 <file>"
    ],
    correctAnswer: 0,
    explanation: "'git blame -L 10,20 <file>' isolates attribution strictly to the specified line span."
  },
  {
    id: 11,
    question: "Why is Conventional Commits helpful when debugging incidents with git log?",
    options: [
      "It allows filtering commits by type (e.g. 'git log --grep=\"^feat(promo)\"') to trace related feature launches quickly",
      "It enforces automated compilation in Git",
      "It encrypts passwords in commit subjects",
      "It reduces git bundle sizes"
    ],
    correctAnswer: 0,
    explanation: "Structured commit prefixes enable fast regex filtering across release histories."
  },
  {
    id: 12,
    question: "What did Debangshu do once the root cause was discovered?",
    options: [
      "He took immediate ownership, explained the debug context, and collaborated on a hotfix with unit test coverage",
      "He deleted the repository history with git rebase",
      "He denied writing the commit",
      "He blamed Swadeep"
    ],
    correctAnswer: 0,
    explanation: "Professional engineers embrace transparent accountability and focus on constructive resolution."
  },
  {
    id: 13,
    question: "What does 'git diff HEAD~1 HEAD' verify during hotfix development?",
    options: [
      "The exact delta introduced by the hotfix commit relative to its immediate parent",
      "The differences between staging and working tree",
      "The remote server status",
      "The stash list"
    ],
    correctAnswer: 0,
    explanation: "Comparing HEAD~1 to HEAD confirms that only the hotfix changes were applied in the final commit."
  },
  {
    id: 14,
    question: "How can you view the commit log of only the 'src/billing/' subsystem during the week of the incident?",
    options: [
      "git log --since=\"2026-09-08\" --until=\"2026-09-14\" --oneline -- src/billing/",
      "git log --billing-week",
      "git search billing 2026-09",
      "git inspect-week src/billing/"
    ],
    correctAnswer: 0,
    explanation: "Combining date windows and directory pathspecs scopes history to the relevant timeline and subsystem."
  },
  {
    id: 15,
    question: "What command creates a signed release tag marking the production hotfix milestone?",
    options: [
      "git tag -a v1.1.1 -m \"Hotfix: restore 10% discount cap and fix billing multiplier\"",
      "git release create v1.1.1",
      "git tag --make v1.1.1",
      "git mark-hotfix v1.1.1"
    ],
    correctAnswer: 0,
    explanation: "'git tag -a <tag> -m <msg>' creates an annotated milestone checkpoint in Git history."
  },
  {
    id: 16,
    question: "What does 'git log -S \"discountMultiplier\" -p' show?",
    options: [
      "All historical commits that added or removed the 'discountMultiplier' variable, along with full unified diffs",
      "The current memory value of discountMultiplier",
      "The variable declaration in node_modules",
      "A JavaScript stack trace"
    ],
    correctAnswer: 0,
    explanation: "It unearths every historical mutation of the variable name across the repository timeline."
  },
  {
    id: 17,
    question: "How can Susmita verify that all unit tests pass before deploying the hotfix?",
    options: [
      "Run the project test runner (e.g. 'npm test' or 'jest') in the terminal sandbox",
      "Run git test --all",
      "Run git verify-code",
      "Run git check-syntax"
    ],
    correctAnswer: 0,
    explanation: "Automated test suites (e.g. npm test) execute validation assertions against the patched codebase."
  },
  {
    id: 18,
    question: "Why should teams maintain automated test assertions for maximum discount thresholds?",
    options: [
      "To guarantee that accidental variable mutations immediately fail in CI before reaching production",
      "To satisfy Git requirements",
      "To increase repository file count",
      "To slow down the release cycle"
    ],
    correctAnswer: 0,
    explanation: "Unit test assertions act as automated safety rails preventing financial regressions."
  },
  {
    id: 19,
    question: "What does 'git show --stat HEAD' show immediately after creating the hotfix commit?",
    options: [
      "The files modified and line additions/deletions in the hotfix commit",
      "The server uptime",
      "The total memory size of .git",
      "The list of untracked files"
    ],
    correctAnswer: 0,
    explanation: "'--stat' validates the footprint of the hotfix commit."
  },
  {
    id: 20,
    question: "What is the danger of pushing temporary debugging code directly to shared team branches?",
    options: [
      "It can get deployed to staging/production without review, causing revenue loss or system instability",
      "It breaks the local hard drive",
      "It changes the Git version",
      "It disables git commit"
    ],
    correctAnswer: 0,
    explanation: "Debug values bypassed into shared branches risk slipping into production deployments."
  },
  {
    id: 21,
    question: "How can Git stashes prevent debug leakage?",
    options: [
      "Developers can stash experimental debug tweaks (git stash) rather than committing them into the main feature branch",
      "Git stashes automatically encrypt passwords",
      "Git stashes delete broken code",
      "Git stashes require manager approval"
    ],
    correctAnswer: 0,
    explanation: "Stashing isolates temporary local modifications from official branch history."
  },
  {
    id: 22,
    question: "What does 'git log --stat -1' confirm before opening a pull request?",
    options: [
      "That only intended files were modified in the commit",
      "That the remote server is online",
      "That the author email is verified",
      "That GitHub Actions is running"
    ],
    correctAnswer: 0,
    explanation: "Reviewing '--stat' guarantees clean commit hygiene."
  },
  {
    id: 23,
    question: "What command displays who wrote the 'applyPujaDiscount' function before it was refactored?",
    options: [
      "git log --follow -S \"applyPujaDiscount\" -p",
      "git who applyPujaDiscount",
      "git inspect applyPujaDiscount",
      "git find applyPujaDiscount"
    ],
    correctAnswer: 0,
    explanation: "Combining '--follow' and '-S' tracks the function across historical refactorings and moves."
  },
  {
    id: 24,
    question: "What does 'git show <commit_hash> --stat' output during post-mortem reporting?",
    options: [
      "A clean summary of files affected by that specific historical commit",
      "A complete binary diff",
      "The author's system IP",
      "The terminal colors"
    ],
    correctAnswer: 0,
    explanation: "It produces concise metric evidence for incident documentation."
  },
  {
    id: 25,
    question: "Which of the following workflows represents the best practice sequence for solving production code regressions?",
    options: [
      "1. Diagnose with git blame/show -> 2. Recover context with git log -S -> 3. Write failing unit test -> 4. Apply hotfix -> 5. Verify and tag release",
      "1. Delete repository -> 2. Re-clone -> 3. Push to master",
      "1. Run git reset --hard -> 2. Force push -> 3. Hope it works",
      "1. Blame colleague -> 2. Disable tests -> 3. Ship hotfix"
    ],
    correctAnswer: 0,
    explanation: "Forensic diagnosis, context recovery, test-driven fix, verification, and tagging form the gold standard incident resolution workflow."
  }
];

export default questions;
