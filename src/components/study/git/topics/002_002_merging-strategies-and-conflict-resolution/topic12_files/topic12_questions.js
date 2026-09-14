// ==============================================================================
// TOPIC 12 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Classroom Drama: AuthController Conflict Simulation & Resolution
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "In the Barrackpore lab case study, what caused the merge conflict between Sachin's and Susmita's branches?",
    options: [
      "They had incompatible Git versions",
      "Both branched from the same base commit and concurrently modified the core `loginUser` function in `AuthController.js` with competing signatures and return payloads",
      "Susmita deleted the Git repository",
      "Sachin forgot to push his branch to GitHub"
    ],
    answer: 1,
    explanation: "Both developers made divergent modifications to the exact same function in `AuthController.js`, causing Git's 3-way merge engine to halt with a content conflict."
  },
  {
    id: 2,
    question: "Why was neither 'Accept Current' nor 'Accept Incoming' the correct engineering resolution in this scenario?",
    options: [
      "Because choosing current would discard MFA OTP security, while choosing incoming would discard stateless JWT token authentication",
      "Because VS Code disables both buttons on Mondays",
      "Because Git requires all files to be deleted during conflicts",
      "Because both developers would be fired"
    ],
    answer: 0,
    explanation: "Picking one blindly sacrifices half of the application's required business requirements; synthesizing both delivers complete functionality."
  },
  {
    id: 3,
    question: "How did Sukanta Sir guide Sachin and Susmita to resolve the conflict architecturally?",
    options: [
      "By creating a 2-step verification workflow where OTP verification is performed first, and upon success, a signed JWT token is issued",
      "By throwing away the authentication system and making everything public",
      "By having Sachin rewrite the entire application in Python",
      "By flipping a coin"
    ],
    answer: 0,
    explanation: "Sukanta Sir demonstrated combining both features into a clean logical sequence: validate password &rarr; validate OTP &rarr; issue JWT token."
  },
  {
    id: 4,
    question: "What is the very first thing developers should do before attempting to edit complex conflict markers in a critical file like `AuthController.js`?",
    options: [
      "Communicate with the author of the competing branch to understand business requirements and intent",
      "Delete the conflict markers blindly",
      "Force push to main",
      "Run `git reset --hard`"
    ],
    answer: 0,
    explanation: "Direct peer communication is the most critical first step in resolving architectural code collisions safely."
  },
  {
    id: 5,
    question: "After rewriting `AuthController.js` to combine JWT and MFA logic, what must be done before running `git add` and `git commit`?",
    options: [
      "Run automated unit tests (`npm test`) to ensure all auth paths and status codes pass without regressions",
      "Shut down the server permanently",
      "Format the laptop hard drive",
      "Rename the branch"
    ],
    answer: 0,
    explanation: "Testing validates that manual resolution didn't introduce syntax errors or break existing business logic."
  },
  {
    id: 6,
    question: "What would happen if the conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) were accidentally committed inside `AuthController.js`?",
    options: [
      "Node.js would throw a `SyntaxError: Unexpected token '<'` upon starting the server, causing a production outage",
      "Node.js would automatically skip those lines",
      "Git would fix the markers automatically on push",
      "The server would run twice as fast"
    ],
    answer: 0,
    explanation: "Conflict delimiters are invalid JavaScript syntax; leaving them in code breaks interpretation and crashes Node.js applications."
  },
  {
    id: 7,
    question: "Why did Sachin's branch merge into `main` without conflict in Step 5 of the lab, while Susmita's merge conflicted in Step 6?",
    options: [
      "Sachin was the first to merge, so `main` had not yet diverged from his merge base; when Susmita tried to merge next, `main` already contained Sachin's changes",
      "Sachin used a special superuser flag",
      "Git favors male names over female names",
      "Susmita's branch was corrupted"
    ],
    answer: 0,
    explanation: "The first branch to merge onto an unchanged target branch integrates cleanly; subsequent divergent branches must reconcile against the newly updated target."
  },
  {
    id: 8,
    question: "If Susmita had pulled or merged `main` into her `feature/mfa-otp` branch before attempting to merge into `main`, where would the conflict have occurred?",
    options: [
      "Locally on her private `feature/mfa-otp` branch, keeping `main` completely clean and stable",
      "On the GitHub production server",
      "Nowhere, it would vanish",
      "In the cloud database"
    ],
    answer: 0,
    explanation: "Rebasing or merging `main` into your feature branch beforehand resolves conflicts locally on your feature branch, leaving `main` unblocked."
  },
  {
    id: 9,
    question: "What is the benefit of resolving conflicts on your local feature branch rather than directly on `main`?",
    options: [
      "It protects the shared `main` branch from broken intermediate states and ensures that only fully tested, green builds are integrated",
      "It speeds up Wi-Fi speed",
      "It requires zero commits",
      "It avoids needing to learn Git"
    ],
    answer: 0,
    explanation: "Local resolution on the feature branch isolates experimental conflict resolution from shared team environments."
  },
  {
    id: 10,
    question: "What status code should `AuthController.js` return if the MFA OTP code is invalid?",
    options: [
      "HTTP 403 Forbidden (or 401 Unauthorized)",
      "HTTP 200 OK",
      "HTTP 500 Internal Server Error",
      "HTTP 404 Not Found"
    ],
    answer: 0,
    explanation: "403 Forbidden (or 401 Unauthorized) accurately communicates failed credential authentication."
  },
  {
    id: 11,
    question: "How does the Barrackpore lab case study demonstrate that merge conflicts are not errors?",
    options: [
      "By showing that the conflict prompted a vital architectural discussion resulting in a superior, dual-secured authentication engine",
      "By demonstrating that Git is buggy",
      "By proving that all code should be in 1 file",
      "By showing that developers shouldn't work in teams"
    ],
    answer: 0,
    explanation: "Conflicts force cross-team synchronization that prevents accidental regression and fosters architectural excellence."
  },
  {
    id: 12,
    question: "What command inspects the unmerged state of `AuthController.js` during the active conflict?",
    options: [
      "git ls-files -u src/controllers/AuthController.js",
      "git show auth",
      "git inspect conflict",
      "git verify file"
    ],
    answer: 0,
    explanation: "`git ls-files -u` displays the Stage 1, Stage 2, and Stage 3 blob hashes for that specific conflicted file."
  },
  {
    id: 13,
    question: "What is the role of Stage 1 in the unmerged `AuthController.js` index?",
    options: [
      "The original baseline cookie-session version before either Sachin or Susmita started editing",
      "The latest commit on GitHub",
      "Sachin's JWT version",
      "Susmita's MFA version"
    ],
    answer: 0,
    explanation: "Stage 1 holds the Merge Base common ancestor code."
  },
  {
    id: 14,
    question: "What is the role of Stage 2 in the unmerged `AuthController.js` index?",
    options: [
      "Sachin's JWT version (the version currently on `HEAD` / `main`)",
      "Susmita's MFA version",
      "The common base",
      "The final resolved file"
    ],
    answer: 0,
    explanation: "Stage 2 represents the active target branch (`HEAD`), which had already integrated Sachin's JWT code."
  },
  {
    id: 15,
    question: "What is the role of Stage 3 in the unmerged `AuthController.js` index?",
    options: [
      "Susmita's MFA version (the incoming change being merged in)",
      "Sachin's JWT version",
      "The base commit",
      "The staging index"
    ],
    answer: 0,
    explanation: "Stage 3 represents the incoming branch being merged (`feature/mfa-otp`)."
  },
  {
    id: 16,
    question: "If Susmita realizes mid-way through resolution that her branch is missing critical SMS gateway dependencies, what command should she run to pause cleanly?",
    options: [
      "git merge --abort",
      "git push origin main",
      "git clean -fdx",
      "git drop"
    ],
    answer: 0,
    explanation: "`git merge --abort` immediately rolls back the conflicted state so she can install dependencies on her branch first."
  },
  {
    id: 17,
    question: "How can developers prevent file collision dramas like `AuthController.js` in large enterprise repositories?",
    options: [
      "By adhering to Modular Single Responsibility Principle (e.g. separating `jwtAuthService.js` and `otpService.js` from the controller)",
      "By banning branches",
      "By locking files on a central server",
      "By writing all code on a single line"
    ],
    answer: 0,
    explanation: "Modular architecture isolates distinct concerns into separate service modules, minimizing simultaneous line collisions in monolithic controller files."
  },
  {
    id: 18,
    question: "What does `git diff --check` output after Sukanta Sir cleans the conflict markers from `AuthController.js`?",
    options: [
      "Empty output with exit code 0 (confirming zero marker leftovers and clean whitespace)",
      "A list of errors",
      "A prompt asking for password",
      "A confirmation link"
    ],
    answer: 0,
    explanation: "When code is clean and free of leftover conflict markers, `git diff --check` exits silently with status code 0."
  },
  {
    id: 19,
    question: "What command creates the final merge commit once `AuthController.js` is staged?",
    options: [
      "git commit -m 'merge: integrate JWT stateless auth with MFA OTP verification'",
      "git push --all",
      "git tag v1.0",
      "git finish merge"
    ],
    answer: 0,
    explanation: "Running `git commit` finalizes the resolution and records the 2-parent merge commit in the DAG history."
  },
  {
    id: 20,
    question: "What does `git log --graph --oneline` show after completing this merge?",
    options: [
      "A unified graph showing both `feature/jwt-auth` and `feature/mfa-otp` branches joining into `main`",
      "An empty log",
      "A detached HEAD pointer",
      "A linear log with 0 branches"
    ],
    answer: 0,
    explanation: "The DAG visually exhibits both branch lineages converging gracefully into the merge commit on `main`."
  },
  {
    id: 21,
    question: "In Coder & AccoTax's client portal, what financial parameter was preserved in the resolved payload?",
    options: [
      "consultationFeeBalance: 1200 (₹1,200 standard consultation fee balance)",
      "taxSlab: 50%",
      "discount: 99%",
      "penalty: 5000"
    ],
    answer: 0,
    explanation: "The resolved payload retained the client consultation fee balance parameter of ₹1,200 along with token and MFA status."
  },
  {
    id: 22,
    question: "Why should developers write a descriptive merge commit message instead of using default 'Merge branch...' when resolving significant architectural conflicts?",
    options: [
      "To document for future maintainers how the competing business requirements (JWT vs MFA) were unified",
      "Because Git requires at least 50 words",
      "To increase GitHub contribution points",
      "To satisfy linters"
    ],
    answer: 0,
    explanation: "A detailed merge commit message provides indispensable audit context for future developers investigating why specific logic was chosen."
  },
  {
    id: 23,
    question: "If Swadeep wants to view what `AuthController.js` looked like before either Sachin or Susmita touched it, what command can he run?",
    options: [
      "git show $(git merge-base HEAD feature/mfa-otp):src/controllers/AuthController.js",
      "git history raw",
      "git show initial",
      "git base view"
    ],
    answer: 0,
    explanation: "Using `git show <merge_base_sha>:<file_path>` inspects the pristine common ancestor state directly from the object database."
  },
  {
    id: 24,
    question: "What is the psychological breakthrough students experience during this classroom drama lab?",
    options: [
      "Fear of merge conflicts is completely replaced with systematic confidence and collaborative problem-solving skills",
      "Fear of Git increases",
      "Students stop using version control",
      "Students prefer using floppy disks"
    ],
    answer: 0,
    explanation: "Experiencing a real-world collision in a safe lab environment permanently demystifies merge conflicts."
  },
  {
    id: 25,
    question: "What is the core takeaway motto framed on the wall at Coder & AccoTax Barrackpore?",
    options: [
      "Great developers don't choose 'mine vs yours'—they craft 'ours'!",
      "Always merge with --force",
      "Never write code in teams",
      "First commit wins"
    ],
    answer: 0,
    explanation: "Sukanta Sir's motto reinforces that collaboration and code synthesis are the hallmarks of senior engineering excellence."
  }
];

export default questions;
