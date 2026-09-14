// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 1: Formatting Log Output: git log --oneline, --decorate, and graphical branching view with git log --graph --all
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "Which Git command is shorthand for 'git log --pretty=oneline --abbrev-commit'?",
    options: [
      "git log --short",
      "git log --oneline",
      "git log --compact",
      "git log --summary"
    ],
    correctAnswer: 1,
    explanation: "'git log --oneline' is a built-in shorthand that combines '--pretty=oneline' (single line per commit) and '--abbrev-commit' (abbreviates commit hashes to 7 characters by default)."
  },
  {
    id: 2,
    question: "What information does the '--decorate' flag add to the git log output?",
    options: [
      "File modification diff statistics",
      "Ref names such as branches, tags, and HEAD pointing to each commit",
      "Author email addresses and GPG signature verification badges",
      "ASCII colored graph lines representing the DAG"
    ],
    correctAnswer: 1,
    explanation: "'--decorate' adds reference names (e.g. HEAD -> main, origin/main, tag: v1.0.0) next to the commit hash to indicate which pointers currently reference that commit."
  },
  {
    id: 3,
    question: "When using 'git log --graph', what do the ASCII characters (*, |, /, \\) visually represent?",
    options: [
      "File syntax errors detected during staging",
      "The Directed Acyclic Graph (DAG) of branches, merges, and commit topology",
      "Network latency between local repository and remote origin",
      "Disk space utilized by uncompressed loose objects"
    ],
    correctAnswer: 1,
    explanation: "'git log --graph' renders the commit history graph as an ASCII text tree, showing branch splits, parallel developments, and merge joins."
  },
  {
    id: 4,
    question: "Why is the '--all' flag crucial when viewing a repository's graphical log?",
    options: [
      "It displays untracked files in the working directory",
      "It displays commits across all local and remote references, not just the current branch",
      "It forces git log to print full commit diffs for every commit",
      "It deletes stale dangling commits from the object database"
    ],
    correctAnswer: 1,
    explanation: "By default, 'git log' only follows ancestry from the current HEAD. Adding '--all' includes commits reachable from any ref (all local branches, remote branches, tags, and stashes)."
  },
  {
    id: 5,
    question: "What is the recommended Git command to create a global shortcut alias 'git lg' for the full graphical log view?",
    options: [
      "git alias make lg='log --graph --oneline --decorate --all'",
      "git config --global alias.lg 'log --graph --oneline --decorate --all'",
      "git set --global alias.lg = 'git log --all --graph'",
      "git config alias.lg.enable = true"
    ],
    correctAnswer: 1,
    explanation: "'git config --global alias.lg \"log --graph --oneline --decorate --all\"' configures a persistent shortcut accessible as 'git lg' in any repository on that machine."
  },
  {
    id: 6,
    question: "In the decoration '(HEAD -> main, origin/main)', what does 'HEAD -> main' specifically indicate?",
    options: [
      "HEAD is currently detached at commit main",
      "HEAD is an alias for the origin remote",
      "The current working branch is 'main', and HEAD points to the tip of 'main'",
      "The 'main' branch is tracking the 'HEAD' branch on origin"
    ],
    correctAnswer: 2,
    explanation: "In symbolic ref notation, 'HEAD -> main' means the HEAD pointer is attached to the local branch 'main', so new commits will advance 'main'."
  },
  {
    id: 7,
    question: "What default abbreviation length does Git use for commit hashes in '--oneline' mode?",
    options: [
      "4 characters",
      "7 characters (expanded automatically if ambiguous)",
      "10 characters",
      "40 characters"
    ],
    correctAnswer: 1,
    explanation: "Git defaults to 7 hexadecimal characters, but will dynamically increase the length if 7 characters are ambiguous in a large repository."
  },
  {
    id: 8,
    question: "If a developer is on branch 'feature/tax' and runs 'git log --oneline' without '--all', which commits are shown?",
    options: [
      "Only commits unique to feature/tax and not present on main",
      "Only commits reachable from the current HEAD (feature/tax and its ancestor commits)",
      "All commits in the entire repository across all branches",
      "Only unmerged stashes"
    ],
    correctAnswer: 1,
    explanation: "Without '--all', 'git log' traverses the DAG starting strictly from HEAD backwards through parent pointers."
  },
  {
    id: 9,
    question: "What does the decoration 'tag: v2.1.0' signify next to a commit in git log --decorate?",
    options: [
      "A Git tag reference named 'v2.1.0' points to that specific commit object",
      "The commit was created using Git version 2.1.0",
      "The author has 2.1.0 permissions",
      "The commit is marked for deletion in version 2.1.0"
    ],
    correctAnswer: 0,
    explanation: "'tag: <name>' indicates that a lightweight or annotated Git tag points directly to that commit SHA."
  },
  {
    id: 10,
    question: "Which Git config setting controls whether '--decorate' is enabled by default in modern Git versions?",
    options: [
      "log.decorate",
      "core.decorateLog",
      "ui.branchDecorate",
      "git.showRefs"
    ],
    correctAnswer: 0,
    explanation: "'log.decorate' controls ref decoration in git log. Supported values are 'false' (or 'no'), 'true' (or 'auto'), 'short', and 'full'."
  },
  {
    id: 11,
    question: "In a git log --graph output, what does a merge commit with two parents visually look like?",
    options: [
      "A single asterisk with no incoming branch lines",
      "A node where two separate ASCII lines (/ and \\) converge into an asterisk (*)",
      "A dashed red line crossing the screen",
      "A rectangular ASCII box"
    ],
    correctAnswer: 1,
    explanation: "A merge commit combines two or more parent lines of development, shown in ASCII graph as multiple incoming lines joining at the commit node (*)."
  },
  {
    id: 12,
    question: "What is the key advantage of using '--abbrev-commit' over the full 40-character SHA in terminal inspection?",
    options: [
      "It reduces network bandwidth during fetch operations",
      "It increases terminal readability and scannability while retaining unique commit identification",
      "It enables cryptographic signing of the commit",
      "It changes the commit hash in the object database"
    ],
    correctAnswer: 1,
    explanation: "Shortened 7-character hashes fit neatly into single terminal lines while still providing sufficient uniqueness for daily CLI workflows."
  },
  {
    id: 13,
    question: "What happens if you run 'git log --graph' without '--oneline'?",
    options: [
      "Git throws a command-line syntax error",
      "Git displays the full multi-line commit details with graph lines running along the left margin",
      "Git displays only branch names without commit messages",
      "Git launches the gitk GUI tool"
    ],
    correctAnswer: 1,
    explanation: "Git displays full multi-line commit blocks (Author, Date, Body) with the graph structure drawn on the left margin, which can become very tall on screen."
  },
  {
    id: 14,
    question: "How does 'git log --decorate=full' differ from the default 'git log --decorate=short'?",
    options: [
      "It shows full ref namespaces such as 'refs/heads/main' and 'refs/remotes/origin/main'",
      "It prints the full commit author biography",
      "It downloads remote branches automatically before logging",
      "It formats the output in HTML"
    ],
    correctAnswer: 0,
    explanation: "'--decorate=full' prefixes ref names with their full ref namespace path (e.g., 'refs/heads/main', 'refs/tags/v1.0') instead of the shortened display name."
  },
  {
    id: 15,
    question: "Can 'git log --graph --oneline' be combined with other filtering flags like '-n 5' or '--author'?",
    options: [
      "No, --graph is incompatible with filtering flags",
      "Yes, Git flags can be freely composed together",
      "Only if the repository has fewer than 100 commits",
      "Only when running on Linux"
    ],
    correctAnswer: 1,
    explanation: "Git flags are modular and combinable. Running 'git log --graph --oneline -n 5 --author=Debangshu' works seamlessly."
  },
  {
    id: 16,
    question: "When Sukanta Sir inspects a student's repository using 'git log --graph --oneline', he notices a commit marked '(origin/main)' behind '(HEAD -> main)'. What does this mean?",
    options: [
      "The student has deleted the remote repository",
      "The local main branch is ahead of the remote origin/main by unpushed commits",
      "The remote server rejected the branch",
      "The student's Git installation is out of date"
    ],
    correctAnswer: 1,
    explanation: "If local 'main' is ahead of 'origin/main' in the graph, the local repo has new commits that have not yet been pushed to GitHub/remote origin."
  },
  {
    id: 17,
    question: "What does an orphaned or disconnected branch look like in 'git log --graph --all'?",
    options: [
      "A parallel vertical line that never joins or stems from the main trunk",
      "A bright red flashing error icon in the terminal",
      "It is automatically omitted from the graph",
      "It appears as a circular loop"
    ],
    correctAnswer: 0,
    explanation: "An independent root or disconnected branch appears as a standalone parallel ASCII line without shared parent history."
  },
  {
    id: 18,
    question: "What is the primary reason why 'git log --graph --all' is favored over graphical desktop tools by terminal power users?",
    options: [
      "It works seamlessly over headless SSH servers and Docker containers without GUI dependencies",
      "It uses less CPU power than writing text to disk",
      "It prevents other developers from modifying files",
      "It encrypts the log output using RSA keys"
    ],
    correctAnswer: 0,
    explanation: "CLI graph tools run directly in remote SSH sessions, continuous integration pipelines, and terminal multiplexers without needing X11/GUI libraries."
  },
  {
    id: 19,
    question: "If Swadeep runs 'git log --oneline --no-decorate', what will be missing from the output?",
    options: [
      "The commit subject messages",
      "The 7-character commit hashes",
      "Branch, tag, and HEAD annotations in parentheses",
      "The chronological order"
    ],
    correctAnswer: 2,
    explanation: "'--no-decorate' strips all branch names, tags, and HEAD references, leaving only '<hash> <subject>'."
  },
  {
    id: 20,
    question: "Which of the following commands will list commits from both 'main' and 'feature/gst' even if one is not an ancestor of the other?",
    options: [
      "git log main feature/gst",
      "git log --only main",
      "git log main..feature/gst",
      "git log --join main feature/gst"
    ],
    correctAnswer: 0,
    explanation: "Passing multiple branch names separated by spaces ('git log branchA branchB') instructs Git to traverse history reachable from either branch."
  },
  {
    id: 21,
    question: "What is the purpose of setting 'color.ui = auto' or 'color.ui = always' for git log?",
    options: [
      "It compresses image files committed to Git",
      "It enables colored output for commit hashes, branch refs, and graph paths for high visual clarity",
      "It converts markdown documents to color PDFs",
      "It changes terminal font sizes"
    ],
    correctAnswer: 1,
    explanation: "'color.ui = auto' activates terminal ANSI color codes, rendering hashes in yellow, branches in green/blue, and graph tracks in multi-color lines."
  },
  {
    id: 22,
    question: "What does the notation 'HEAD -> feature/cart, origin/feature/cart' indicate in decorated log output?",
    options: [
      "The local feature/cart branch and remote tracking branch origin/feature/cart are perfectly in sync at this commit",
      "The local feature branch has diverged from origin",
      "A fast-forward merge is impossible",
      "The commit has two different commit messages"
    ],
    correctAnswer: 0,
    explanation: "When both local branch and remote-tracking branch appear together at the same commit, local and remote tips are synchronized."
  },
  {
    id: 23,
    question: "In 'git log --graph', why do lines sometimes swerve outward (/ or \\)?",
    options: [
      "To represent branch divergence or convergence during parallel feature development and merging",
      "To indicate that a developer made a syntax error",
      "Because the terminal window width is too small",
      "To signify stashed changes"
    ],
    correctAnswer: 0,
    explanation: "Diagonal slashes visually track a separate branch splitting off from a common ancestor or merging back into a target branch."
  },
  {
    id: 24,
    question: "How can you view the commit graph while paginating one screenful at a time in the terminal?",
    options: [
      "git log uses the system pager (less) by default, allowing spacebar navigation and 'q' to quit",
      "By redirecting git log to a browser window",
      "By adding '--page-size=10'",
      "By pressing Ctrl+C after every commit"
    ],
    correctAnswer: 0,
    explanation: "Git pipes log output through the configured pager ($GIT_PAGER or 'less'), allowing scroll navigation with j/k, spacebar, and 'q' to exit."
  },
  {
    id: 25,
    question: "Which of the following commands produces the most concise and complete topology visualization in standard Git CLI?",
    options: [
      "git log --graph --oneline --decorate --all",
      "git status --all --graph",
      "git show --graph --oneline",
      "git branch --graph --verbose"
    ],
    correctAnswer: 0,
    explanation: "'git log --graph --oneline --decorate --all' combines single-line summaries, ref decorations, full repository reachability, and ASCII topology into one command."
  }
];

export default questions;
