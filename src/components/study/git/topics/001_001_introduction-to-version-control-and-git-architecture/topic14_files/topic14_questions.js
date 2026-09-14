/**
 * Topic 14 Questions: Self-Assessment Quiz & Short Questions for Module 001_001
 * Comprehensive 30-Question Assessment covering all topics 0 to 13
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "What is the core architectural difference between Centralized VCS (like SVN) and Distributed VCS (like Git)?",
    options: [
      "SVN requires a central server for all history and commits, whereas in Git every developer clone possesses a 100% complete copy of the full repository and history",
      "SVN works offline while Git requires internet connectivity",
      "SVN stores files as Git objects",
      "Git does not support branching"
    ],
    answer: "SVN requires a central server for all history and commits, whereas in Git every developer clone possesses a 100% complete copy of the full repository and history",
    explanation: "DVCS eliminates single points of failure by giving every developer a complete local database of all commits and branches."
  },
  {
    id: 2,
    question: "Who created Git in 2005 and for what specific project?",
    options: [
      "Guido van Rossum for Python",
      "Linus Torvalds for the Linux kernel development after the BitKeeper license dispute",
      "James Gosling for Java",
      "Brendan Eich for JavaScript"
    ],
    answer: "Linus Torvalds for the Linux kernel development after the BitKeeper license dispute",
    explanation: "Linus Torvalds designed Git in April 2005 to meet the high speed, data integrity, and non-linear development requirements of the Linux kernel."
  },
  {
    id: 3,
    question: "Which of the following configuration scopes has the highest precedence in Git?",
    options: [
      "System Scope (/etc/gitconfig)",
      "Global Scope (~/.gitconfig)",
      "Local Scope (.git/config)",
      "Runtime Command-Line flag (-c)"
    ],
    answer: "Runtime Command-Line flag (-c)",
    explanation: "Git's scope hierarchy evaluates in order: System < Global < Local < Worktree < Command-Line flags (-c)."
  },
  {
    id: 4,
    question: "What does the command 'git config --list --show-origin' do?",
    options: [
      "Shows all active configuration key-value pairs along with the exact file path or origin where each was defined",
      "Pushes configuration to GitHub origin",
      "Deletes all local configs",
      "Prints the remote repository URL"
    ],
    answer: "Shows all active configuration key-value pairs along with the exact file path or origin where each was defined",
    explanation: "'--show-origin' prefixes each configuration entry with its origin (such as 'file:/home/user/.gitconfig' or 'file:.git/config')."
  },
  {
    id: 5,
    question: "What is stored in the hidden '.git' directory?",
    options: [
      "Only user passwords",
      "The entire repository database, commit history, branch pointers, staging index, and local configurations",
      "Temporary build files that can be deleted safely at any time",
      "The VS Code workspace settings"
    ],
    answer: "The entire repository database, commit history, branch pointers, staging index, and local configurations",
    explanation: "The '.git' directory is the complete repository. Deleting it destroys all revision history."
  },
  {
    id: 6,
    question: "What does '.git/HEAD' point to during normal development?",
    options: [
      "The root directory of your hard drive",
      "A symbolic reference to the currently checked out branch (e.g., 'ref: refs/heads/main')",
      "The first commit ever made in the project",
      "The remote GitHub URL"
    ],
    answer: "A symbolic reference to the currently checked out branch (e.g., 'ref: refs/heads/main')",
    explanation: "HEAD is the pointer to the active branch. It tells Git where the next commit will be attached."
  },
  {
    id: 7,
    question: "On Windows, why is 'core.autocrlf = true' strongly recommended?",
    options: [
      "It converts CRLF line endings to LF upon commit and converts LF back to CRLF upon checkout, preventing cross-platform line ending corruption",
      "It speeds up Windows boot time",
      "It encrypts source code",
      "It makes Git work without a terminal"
    ],
    answer: "It converts CRLF line endings to LF upon commit and converts LF back to CRLF upon checkout, preventing cross-platform line ending corruption",
    explanation: "Windows uses CRLF (\\r\\n) while Unix/macOS uses LF (\\n). 'core.autocrlf=true' transparently normalizes line endings."
  },
  {
    id: 8,
    question: "On macOS and Linux, what is the recommended setting for 'core.autocrlf'?",
    options: [
      "true",
      "input",
      "crlf",
      "none"
    ],
    answer: "input",
    explanation: "'input' converts CRLF to LF upon commit, but leaves LF untouched on checkout."
  },
  {
    id: 9,
    question: "Which four basic object types exist inside '.git/objects'?",
    options: [
      "blobs, trees, commits, and annotated tags",
      "files, folders, archives, and executables",
      "branches, tags, remotes, and stashes",
      "pulls, pushes, clones, and merges"
    ],
    answer: "blobs, trees, commits, and annotated tags",
    explanation: "Git's object store is composed of 4 primitive object types: blob, tree, commit, and tag."
  },
  {
    id: 10,
    question: "What is the role of the binary '.git/index' file?",
    options: [
      "It manages internet search indexing",
      "It is the Staging Area / Cache bridging the working tree and the Git object store",
      "It compiles TypeScript into JavaScript",
      "It stores commit messages"
    ],
    answer: "It is the Staging Area / Cache bridging the working tree and the Git object store",
    explanation: "The index records the snapshot of tracked files and permissions prepared for the next commit."
  },
  {
    id: 11,
    question: "What happens when you run 'git init' inside an empty directory?",
    options: [
      "Git connects to GitHub and creates a remote repo",
      "Git creates a hidden '.git' directory initialized with HEAD, objects/, refs/, and config files",
      "Git deletes all existing files",
      "Git installs Node.js"
    ],
    answer: "Git creates a hidden '.git' directory initialized with HEAD, objects/, refs/, and config files",
    explanation: "'git init' creates the local repository skeleton inside the '.git' folder."
  },
  {
    id: 12,
    question: "Which command configures your global author name?",
    options: [
      "git config --global user.name 'Your Name'",
      "git set user 'Your Name'",
      "git author --global 'Your Name'",
      "git name 'Your Name'"
    ],
    answer: "git config --global user.name 'Your Name'",
    explanation: "'git config --global user.name' writes your author name to ~/.gitconfig."
  },
  {
    id: 13,
    question: "Which command configures your global author email?",
    options: [
      "git config --global user.email 'user@example.com'",
      "git email --global 'user@example.com'",
      "git set email 'user@example.com'",
      "git config email 'user@example.com'"
    ],
    answer: "git config --global user.email 'user@example.com'",
    explanation: "'git config --global user.email' writes your author email to ~/.gitconfig."
  },
  {
    id: 14,
    question: "What is an 'Atomic Commit'?",
    options: [
      "A commit that touches every file in the repository",
      "A small, cohesive commit that performs a single logical task and leaves the codebase in a working, compilable state",
      "A commit that requires special security keys",
      "A commit made without checking in code"
    ],
    answer: "A small, cohesive commit that performs a single logical task and leaves the codebase in a working, compilable state",
    explanation: "Atomic commits make tracking bugs, rebasing, cherry-picking, and reverting completely safe and modular."
  },
  {
    id: 15,
    question: "Why should you configure 'core.editor = code --wait' rather than simply 'code'?",
    options: [
      "Without '--wait', VS Code launches asynchronously and returns immediately, causing Git to abort the commit due to an empty commit message",
      "Because 'code' is not a valid terminal command",
      "Because '--wait' enables syntax highlighting",
      "Because VS Code requires '--wait' on all operating systems"
    ],
    answer: "Without '--wait', VS Code launches asynchronously and returns immediately, causing Git to abort the commit due to an empty commit message",
    explanation: "'--wait' halts the CLI until the user closes the message tab in VS Code."
  },
  {
    id: 16,
    question: "What is a 'Detached HEAD' in Git?",
    options: [
      "A corrupt repository state requiring re-installation",
      "A state where HEAD points directly to a commit SHA rather than to a named branch reference",
      "A deleted branch",
      "A network timeout"
    ],
    answer: "A state where HEAD points directly to a commit SHA rather than to a named branch reference",
    explanation: "When HEAD points directly to a commit SHA, new commits will not be attached to any branch."
  },
  {
    id: 17,
    question: "Which command opens your global configuration file directly in your default editor?",
    options: [
      "git config --global --edit",
      "git open --global",
      "git edit global",
      "git view config"
    ],
    answer: "git config --global --edit",
    explanation: "'git config --global --edit' launches ~/.gitconfig in the configured editor."
  },
  {
    id: 18,
    question: "Where are local branch pointers physically stored in the repository?",
    options: [
      "Inside .git/refs/heads/",
      "Inside .git/branches.json",
      "Inside ~/.gitconfig",
      "Inside .git/logs/"
    ],
    answer: "Inside .git/refs/heads/",
    explanation: "Each branch in Git is a 41-byte text file inside '.git/refs/heads/' containing a 40-character commit hash."
  },
  {
    id: 19,
    question: "Which plumbing command inspects the content and structure of any Git object hash?",
    options: [
      "git cat-file -p <hash>",
      "git view-hash <hash>",
      "git inspect <hash>",
      "git show-raw <hash>"
    ],
    answer: "git cat-file -p <hash>",
    explanation: "'git cat-file -p' pretty-prints the decoded object content from .git/objects."
  },
  {
    id: 20,
    question: "What is the difference between Git and GitHub?",
    options: [
      "Git is a local command-line version control engine; GitHub is a cloud hosting platform for Git repositories with collaborative tools",
      "Git is owned by Microsoft; GitHub is open-source",
      "Git is for frontend; GitHub is for backend",
      "There is no difference"
    ],
    answer: "Git is a local command-line version control engine; GitHub is a cloud hosting platform for Git repositories with collaborative tools",
    explanation: "Git is the underlying tool created by Linus Torvalds. GitHub is a commercial cloud hosting service."
  },
  {
    id: 21,
    question: "Why does Git use SHA cryptographic hashing for objects?",
    options: [
      "To ensure content addressability and absolute data integrity: if even one character changes, the hash changes completely",
      "To encrypt files so competitors cannot read them",
      "To compress images",
      "To speed up internet downloads"
    ],
    answer: "To ensure content addressability and absolute data integrity: if even one character changes, the hash changes completely",
    explanation: "Cryptographic hash trees make silent data corruption or tampering mathematically impossible."
  },
  {
    id: 22,
    question: "What is the command to create an alias 'git st' for 'git status'?",
    options: [
      "git config --global alias.st status",
      "git alias st=status",
      "alias gitst='git status'",
      "git config shortcut.st status"
    ],
    answer: "git config --global alias.st status",
    explanation: "Aliases are defined under the 'alias.<name>' configuration namespace."
  },
  {
    id: 23,
    question: "What does '.git/info/exclude' do compared to '.gitignore'?",
    options: [
      "'.git/info/exclude' is local-only and not shared with teammates, whereas '.gitignore' is committed and shared across the team",
      "exclude applies only to images",
      "exclude is deprecated",
      "gitignore applies only to Windows"
    ],
    answer: "'.git/info/exclude' is local-only and not shared with teammates, whereas '.gitignore' is committed and shared across the team",
    explanation: "'.git/info/exclude' stays private to your local clone since the '.git' directory is not version-controlled."
  },
  {
    id: 24,
    question: "Which command sets the global default branch for new repos to 'main'?",
    options: [
      "git config --global init.defaultBranch main",
      "git set-default-branch main",
      "git branch -m main",
      "git config default.branch main"
    ],
    answer: "git config --global init.defaultBranch main",
    explanation: "'init.defaultBranch main' configures 'main' as the default branch name for 'git init'."
  },
  {
    id: 25,
    question: "What happens if you run 'git config --local user.name' outside of a Git repository?",
    options: [
      "It fails with 'fatal: --local can only be used inside a git repository'",
      "It creates a new repository",
      "It reads the global setting",
      "It returns null"
    ],
    answer: "It fails with 'fatal: --local can only be used inside a git repository'",
    explanation: "Local scope requires the existence of '.git/config' and cannot be accessed outside a valid Git repository."
  },
  {
    id: 26,
    question: "What is stored in a Git 'tree' object?",
    options: [
      "Directory listings mapping filenames and file modes/permissions to blob and subtree SHA hashes",
      "The commit message only",
      "Plant taxonomy data",
      "The Git user configuration"
    ],
    answer: "Directory listings mapping filenames and file modes/permissions to blob and subtree SHA hashes",
    explanation: "Trees represent folder hierarchies, mapping names and permissions to child blobs and trees."
  },
  {
    id: 27,
    question: "What is stored in a Git 'blob' object?",
    options: [
      "Pure file data content, without filename, directory path, or timestamp metadata",
      "The full file with filename and modification date",
      "A compressed ZIP archive of the repository",
      "The author email"
    ],
    answer: "Pure file data content, without filename, directory path, or timestamp metadata",
    explanation: "Blobs store raw content only. Names and permissions are separated into tree objects."
  },
  {
    id: 28,
    question: "How does Git achieve instantaneous branch switching?",
    options: [
      "By updating the .git/HEAD reference pointer and refreshing the working tree from the object database without downloading files",
      "By duplicating all project files in another folder",
      "By re-cloning the repository from the cloud",
      "By rebooting the terminal"
    ],
    answer: "By updating the .git/HEAD reference pointer and refreshing the working tree from the object database without downloading files",
    explanation: "Branch switching is an O(1) pointer update in .git/HEAD followed by matching the working tree files to the tree snapshot."
  },
  {
    id: 29,
    question: "Which command unsets an erroneous global key 'user.test'?",
    options: [
      "git config --global --unset user.test",
      "git config --delete user.test",
      "git config --remove user.test",
      "git unset-key user.test"
    ],
    answer: "git config --global --unset user.test",
    explanation: "'--unset' deletes a key-value pair from the specified configuration file."
  },
  {
    id: 30,
    question: "What is the primary philosophy of Linus Torvalds when designing Git's architecture?",
    options: [
      "Speed, data integrity, full distribution, simplicity, and support for massive non-linear branching workflows",
      "Strict centralized server control with file locking",
      "Replacing all command-line tools with web browsers",
      "Requiring monthly subscription fees"
    ],
    answer: "Speed, data integrity, full distribution, simplicity, and support for massive non-linear branching workflows",
    explanation: "Git was designed from first principles to be fast, decentralized, cryptographically sound, and capable of handling thousands of parallel branches."
  }
];

export default questions;
