/**
 * Topic 2 Questions: Creating a Local Repository: git init vs Cloning an Existing Repository (git clone)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Total Questions: 25 (MCQ + Conceptual + Scenarios)
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "What is the primary difference between 'git init' and 'git clone'?",
    options: [
      "'git init' creates a new empty repository locally from scratch, while 'git clone' copies an existing remote repository with all its history and branches",
      "'git init' requires internet, while 'git clone' is offline",
      "'git init' is for Python, while 'git clone' is for JavaScript",
      "'git init' deletes old files, while 'git clone' recovers them"
    ],
    answer: "'git init' creates a new empty repository locally from scratch, while 'git clone' copies an existing remote repository with all its history and branches",
    explanation: "'git init' initializes a blank repository, whereas 'git clone' replicates an existing remote repository including full commit history."
  },
  {
    id: 2,
    question: "What does 'git clone' automatically configure for you that 'git init' does not?",
    options: [
      "A remote tracking reference named 'origin' pointing to the source URL",
      "A paid GitHub pro account",
      "An automated unit testing suite",
      "A Windows desktop shortcut"
    ],
    answer: "A remote tracking reference named 'origin' pointing to the source URL",
    explanation: "'git clone' automatically sets up the remote connection named 'origin' and creates remote-tracking branches."
  },
  {
    id: 3,
    question: "Which command initializes a new Git repository inside a new directory named 'barrackpore-portal'?",
    options: [
      "git init barrackpore-portal",
      "git new barrackpore-portal",
      "git create barrackpore-portal",
      "git start barrackpore-portal"
    ],
    answer: "git init barrackpore-portal",
    explanation: "'git init <directory-name>' creates the folder if it does not exist and initializes a Git repository inside it."
  },
  {
    id: 4,
    question: "What does running 'git clone https://github.com/facebook/react.git my-react' do?",
    options: [
      "Clones the React repository into a local folder named 'my-react' instead of the default 'react'",
      "Renames the remote repository on GitHub to my-react",
      "Creates a new branch named my-react",
      "Deletes the local React clone"
    ],
    answer: "Clones the React repository into a local folder named 'my-react' instead of the default 'react'",
    explanation: "Supplying a second argument to 'git clone' specifies the destination directory name on your local disk."
  },
  {
    id: 5,
    question: "What is a 'Shallow Clone' in Git and how is it executed?",
    options: [
      "Cloning only the most recent commit(s) using 'git clone --depth 1 <url>', saving bandwidth and disk space",
      "Cloning a repository without files",
      "Cloning into a USB drive",
      "Cloning only text files"
    ],
    answer: "Cloning only the most recent commit(s) using 'git clone --depth 1 <url>', saving bandwidth and disk space",
    explanation: "'--depth <N>' truncates history to the latest N commits, dramatically accelerating CI/CD pipeline builds."
  },
  {
    id: 6,
    question: "What is a 'Bare Repository' created with 'git init --bare'?",
    options: [
      "A server-side repository containing only the .git database without any checked-out editable working tree files",
      "An unencrypted repository",
      "A repository without commits",
      "A repository that runs in the browser"
    ],
    answer: "A server-side repository containing only the .git database without any checked-out editable working tree files",
    explanation: "Bare repositories are used on central servers (like GitHub/GitLab servers) as push/pull hubs; they have no working directory."
  },
  {
    id: 7,
    question: "What dangerous mistake occurs if a student runs 'git init' in their user home directory (e.g. C:\\Users\\Sachin or /home/sachin)?",
    options: [
      "Git begins tracking every single file, download, desktop shortcut, and browser cache on the computer as unversioned files in a massive repository",
      "The computer operating system crashes immediately",
      "The user's password is deleted",
      "Git uninstalls itself"
    ],
    answer: "Git begins tracking every single file, download, desktop shortcut, and browser cache on the computer as unversioned files in a massive repository",
    explanation: "Initializing Git in the home root folder causes Git to monitor all personal files, creating severe status pollution and slowdowns."
  },
  {
    id: 8,
    question: "How can you fix the accidental 'git init in home directory' mistake?",
    options: [
      "Delete the hidden '.git' directory in the home folder (e.g. 'rm -rf ~/.git' or delete 'C:\\Users\\Username\\.git')",
      "Reinstall the operating system",
      "Run 'git reset --hard /'",
      "Run 'git commit -m \"fix\"'"
    ],
    answer: "Delete the hidden '.git' directory in the home folder (e.g. 'rm -rf ~/.git' or delete 'C:\\Users\\Username\\.git')",
    explanation: "Deleting the hidden '.git' directory removes the repository structure without harming personal user files."
  },
  {
    id: 9,
    question: "Which command clones only a specific single branch from a multi-branch repository?",
    options: [
      "git clone --single-branch --branch <branch-name> <url>",
      "git clone -b <branch-name> --only <url>",
      "git fetch --branch-only <url>",
      "git clone-branch <branch-name> <url>"
    ],
    answer: "git clone --single-branch --branch <branch-name> <url>",
    explanation: "Combining '--single-branch' and '--branch' fetches history strictly for that targeted branch."
  },
  {
    id: 10,
    question: "What is the difference between cloning via HTTPS vs cloning via SSH?",
    options: [
      "HTTPS uses URLs like 'https://...' and authenticates with Personal Access Tokens, while SSH uses 'git@...' and authenticates using asymmetric public/private SSH key pairs",
      "HTTPS is only for Windows; SSH is only for Linux",
      "HTTPS clones code; SSH clones only documentation",
      "HTTPS is 10x slower than SSH"
    ],
    answer: "HTTPS uses URLs like 'https://...' and authenticates with Personal Access Tokens, while SSH uses 'git@...' and authenticates using asymmetric public/private SSH key pairs",
    explanation: "HTTPS relies on token/web authentication, while SSH uses public/private cryptographic key pairs without prompting for passwords."
  },
  {
    id: 11,
    question: "Can 'git init' be run safely in a directory that already has existing code files?",
    options: [
      "Yes, Git will initialize .git and leave all existing files intact as 'Untracked' files ready to be staged",
      "No, git init wipes all existing files",
      "Only if all files are written in C",
      "Only if the folder is completely empty"
    ],
    answer: "Yes, Git will initialize .git and leave all existing files intact as 'Untracked' files ready to be staged",
    explanation: "'git init' is non-destructive; it only creates the '.git' folder, allowing you to version-control existing projects."
  },
  {
    id: 12,
    question: "What happens if you run 'git init' inside a directory that is ALREADY a Git repository?",
    options: [
      "It reinitializes the existing repository safely, picking up newly configured template files or hooks without destroying commits or history",
      "It deletes all branches",
      "It creates a clone on GitHub",
      "It causes a fatal error"
    ],
    answer: "It reinitializes the existing repository safely, picking up newly configured template files or hooks without destroying commits or history",
    explanation: "Running 'git init' in an existing repo is safe; it will not overwrite commits or branches."
  },
  {
    id: 13,
    question: "Which command specifies an initial default branch name of 'main' when running 'git init' in modern Git?",
    options: [
      "git init --initial-branch=main (or git init -b main)",
      "git init --name main",
      "git start --main",
      "git init-main"
    ],
    answer: "git init --initial-branch=main (or git init -b main)",
    explanation: "'--initial-branch=main' sets the initial branch name during initialization."
  },
  {
    id: 14,
    question: "When Sachin clones a project with 'git clone', which branch is checked out by default in his working tree?",
    options: [
      "The default branch configured on the remote repository (typically 'main' or 'master')",
      "All branches simultaneously",
      "An empty branch",
      "The oldest branch in the repository"
    ],
    answer: "The default branch configured on the remote repository (typically 'main' or 'master')",
    explanation: "'git clone' queries the remote HEAD pointer and checks out the default branch into the working tree."
  },
  {
    id: 15,
    question: "How can you view the remote URL configured by 'git clone'?",
    options: [
      "git remote -v",
      "git show-url",
      "git origin-info",
      "git remote-list"
    ],
    answer: "git remote -v",
    explanation: "'git remote -v' lists all configured remote names and their fetch/push URLs."
  },
  {
    id: 16,
    question: "If you initialize a local repo with 'git init', how do you connect it to a newly created GitHub repository?",
    options: [
      "git remote add origin <github-repo-url>",
      "git connect origin <url>",
      "git link <url>",
      "git push --create <url>"
    ],
    answer: "git remote add origin <github-repo-url>",
    explanation: "'git remote add origin <url>' binds the remote alias 'origin' to the GitHub repository URL."
  },
  {
    id: 17,
    question: "What is the primary drawback of using a shallow clone ('--depth 1') in daily development?",
    options: [
      "You cannot run 'git log' to inspect older historical commits or perform deep 'git bisect' across history unless you un-shallow with 'git fetch --unshallow'",
      "You cannot edit code files",
      "The files are read-only",
      "It requires double disk space"
    ],
    answer: "You cannot run 'git log' to inspect older historical commits or perform deep 'git bisect' across history unless you un-shallow with 'git fetch --unshallow'",
    explanation: "Shallow clones lack older commit history, making deep retrospective audits unavailable until unshallowed."
  },
  {
    id: 18,
    question: "Which command converts a shallow clone into a complete full-history repository?",
    options: [
      "git fetch --unshallow",
      "git clone --expand",
      "git pull --deep",
      "git history --full"
    ],
    answer: "git fetch --unshallow",
    explanation: "'git fetch --unshallow' downloads all missing historical objects from the remote repository."
  },
  {
    id: 19,
    question: "What happens if you clone a repository that contains submodules?",
    options: [
      "By default, submodule directories will be empty unless you pass '--recurse-submodules' or run 'git submodule update --init --recursive'",
      "Submodules are deleted",
      "Git refuses to clone",
      "All submodules are merged into main"
    ],
    answer: "By default, submodule directories will be empty unless you pass '--recurse-submodules' or run 'git submodule update --init --recursive'",
    explanation: "'--recurse-submodules' ensures that nested submodule repositories are cloned automatically."
  },
  {
    id: 20,
    question: "What protocol does 'git://' represent?",
    options: [
      "The unauthenticated native Git daemon protocol (fast, but lacks encryption and authentication, mostly deprecated in favor of HTTPS/SSH)",
      "A browser protocol for WebSockets",
      "An encrypted VPN protocol",
      "A local network protocol"
    ],
    answer: "The unauthenticated native Git daemon protocol (fast, but lacks encryption and authentication, mostly deprecated in favor of HTTPS/SSH)",
    explanation: "The native git:// protocol has no authentication or encryption, so modern hosting platforms use HTTPS/SSH."
  },
  {
    id: 21,
    question: "What does 'git clone --bare <url>' create?",
    options: [
      "A bare clone repository containing only the Git database without any working tree files",
      "An unzipped file",
      "A text file with URLs",
      "A temporary preview"
    ],
    answer: "A bare clone repository containing only the Git database without any working tree files",
    explanation: "A bare clone is ideal for creating backup mirrors or self-hosted Git server endpoints."
  },
  {
    id: 22,
    question: "Can you clone a local repository from another folder on the same computer without using the internet?",
    options: [
      "Yes, 'git clone /path/to/local/project' works completely offline using filesystem paths",
      "No, Git always requires an internet connection",
      "Only on Linux",
      "Only if GitHub CLI is running"
    ],
    answer: "Yes, 'git clone /path/to/local/project' works completely offline using filesystem paths",
    explanation: "Git supports local file paths as remote URLs, allowing instantaneous offline cloning between folders."
  },
  {
    id: 23,
    question: "When Mahima runs 'git init' inside a folder, does Git upload anything to GitHub automatically?",
    options: [
      "No, 'git init' is a 100% local operation on your computer's filesystem; Git has zero connection to GitHub until you explicitly configure remotes and push",
      "Yes, it creates a public repository immediately",
      "Yes, if connected to Wi-Fi",
      "Only if logged into Windows"
    ],
    answer: "No, 'git init' is a 100% local operation on your computer's filesystem; Git has zero connection to GitHub until you explicitly configure remotes and push",
    explanation: "Git is completely local. 'git init' never interacts with network servers."
  },
  {
    id: 24,
    question: "What is the recommended naming convention when initializing a Git project repository?",
    options: [
      "Kebab-case in lowercase (e.g., 'invoice-management-system') without spaces or special characters",
      "PascalCase with spaces ('Invoice Management System Final')",
      "All uppercase ('INVOICE')",
      "Random numbers"
    ],
    answer: "Kebab-case in lowercase (e.g., 'invoice-management-system') without spaces or special characters",
    explanation: "Kebab-case prevents cross-platform URL encoding issues across Windows, macOS, and Linux servers."
  },
  {
    id: 25,
    question: "What summary advice does Sukanta Sir give regarding when to use 'init' vs 'clone'?",
    options: [
      "Use 'git init' when creating a new idea from scratch; use 'git clone' whenever joining an existing team or contributing to open source",
      "Always use git init only",
      "Always use git clone only",
      "Never use git clone"
    ],
    answer: "Use 'git init' when creating a new idea from scratch; use 'git clone' whenever joining an existing team or contributing to open source",
    explanation: "'init' is for original genesis; 'clone' is for collaborative participation in established projects."
  }
];

export default questions;
