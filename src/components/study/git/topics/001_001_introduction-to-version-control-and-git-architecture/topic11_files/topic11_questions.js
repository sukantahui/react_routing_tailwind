/**
 * Topic 11 Questions: Anatomy of the .git Directory: Overview of HEAD, objects, refs, config, hooks, and index
 * Total Questions: 25 (MCQ + Short Answer + Scenario-based)
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "What happens to a project's revision history if the hidden '.git' directory is deleted?",
    options: [
      "The working tree files are permanently destroyed",
      "The entire repository history, commits, branches, and tags are lost, leaving only unversioned raw files in the working directory",
      "Git automatically recreates .git from the cloud backup",
      "The repository reverts to its initial empty commit"
    ],
    answer: "The entire repository history, commits, branches, and tags are lost, leaving only unversioned raw files in the working directory",
    explanation: "The '.git' directory holds the complete database, commit history, and metadata. Deleting it converts the directory into a regular unversioned folder."
  },
  {
    id: 2,
    question: "What does the '.git/HEAD' file typically contain during normal branch development?",
    options: [
      "A binary executable file that compiles code",
      "A symbolic reference to the current active branch (e.g., 'ref: refs/heads/main')",
      "The latest commit message in plain text",
      "A list of all contributors to the repository"
    ],
    answer: "A symbolic reference to the current active branch (e.g., 'ref: refs/heads/main')",
    explanation: "HEAD is a pointer indicating which branch is currently checked out. In normal state, it points to 'refs/heads/<branch>'."
  },
  {
    id: 3,
    question: "What condition causes Git to enter a 'Detached HEAD' state?",
    options: [
      "When the user is disconnected from the internet",
      "When HEAD points directly to a specific commit SHA hash rather than a named branch reference",
      "When the '.git/HEAD' file is deleted",
      "When merge conflicts occur in a file"
    ],
    answer: "When HEAD points directly to a specific commit SHA hash rather than a named branch reference",
    explanation: "Checking out a commit hash or remote tag directly causes HEAD to store that raw commit hash instead of a branch reference, creating a detached HEAD."
  },
  {
    id: 4,
    question: "Which four object types are stored inside the '.git/objects' database?",
    options: [
      "blobs, trees, commits, and annotated tags",
      "branches, tags, remotes, and stashes",
      "files, folders, permissions, and timestamps",
      "pull requests, issues, forks, and actions"
    ],
    answer: "blobs, trees, commits, and annotated tags",
    explanation: "Git's content-addressable storage revolves around 4 primitive object types: blob (file content), tree (directory structure), commit (snapshot metadata), and tag (annotated tag metadata)."
  },
  {
    id: 5,
    question: "How are files named and structured inside '.git/objects'?",
    options: [
      "Numbered sequentially from 0001 to 9999",
      "Using the 40-character SHA-1 hash: first 2 characters form the subfolder name, and the remaining 38 characters form the filename",
      "Using the original filename plus a timestamp extension",
      "Encrypted with AES-256 using the user's password"
    ],
    answer: "Using the 40-character SHA-1 hash: first 2 characters form the subfolder name, and the remaining 38 characters form the filename",
    explanation: "Git divides the 40-character hexadecimal hash into a 2-char directory (e.g., objects/4b/) and 38-char filename to avoid filesystem performance degradation from having thousands of files in a single folder."
  },
  {
    id: 6,
    question: "What is the binary file '.git/index' responsible for?",
    options: [
      "Indexing Google search queries for the repository",
      "Serving as the Staging Area / Cache between the working tree and the Git object database",
      "Storing developer usernames and passwords",
      "Managing build dependencies"
    ],
    answer: "Serving as the Staging Area / Cache between the working tree and the Git object database",
    explanation: "The '.git/index' file is a binary cache mapping file paths, modification timestamps, permissions, and staged blob SHA hashes."
  },
  {
    id: 7,
    question: "What is physically stored inside a branch file such as '.git/refs/heads/feature-login'?",
    options: [
      "A complete copy of all code files in that branch",
      "A 40-character hexadecimal SHA-1 hash pointing to the tip commit of that branch (plus newline)",
      "A list of file diffs between feature-login and main",
      "The full branch history in JSON format"
    ],
    answer: "A 40-character hexadecimal SHA-1 hash pointing to the tip commit of that branch (plus newline)",
    explanation: "Branches in Git are merely lightweight pointers—a 41-byte text file storing the commit SHA representing the branch tip."
  },
  {
    id: 8,
    question: "What is the difference between '.gitignore' and '.git/info/exclude'?",
    options: [
      ".gitignore is tracked and shared across the team via version control, while .git/info/exclude is purely local and never committed or shared",
      ".gitignore only works on Linux, whereas exclude works on Windows",
      ".gitignore is deprecated in Git 2.x",
      ".git/info/exclude applies to global user files only"
    ],
    answer: ".gitignore is tracked and shared across the team via version control, while .git/info/exclude is purely local and never committed or shared",
    explanation: "'.git/info/exclude' provides local-only ignore rules that remain private to the developer's workstation because the '.git' folder is not tracked."
  },
  {
    id: 9,
    question: "Why do default hook scripts in '.git/hooks' end with the extension '.sample'?",
    options: [
      "Because they are written in a special programming language called Sample",
      "To keep them disabled by default until the user explicitly removes the '.sample' extension and makes them executable",
      "Because Git hooks can only be run inside virtual machines",
      "Because they are unit tests"
    ],
    answer: "To keep them disabled by default until the user explicitly removes the '.sample' extension and makes them executable",
    explanation: "Git ignores files with '.sample'. To activate a hook like 'pre-commit', you rename 'pre-commit.sample' to 'pre-commit' and ensure executable permissions."
  },
  {
    id: 10,
    question: "Which low-level (plumbing) command displays the content and type of any Git object hash?",
    options: [
      "git cat-file -p <hash>",
      "git view <hash>",
      "git print-object <hash>",
      "git show-raw <hash>"
    ],
    answer: "git cat-file -p <hash>",
    explanation: "'git cat-file -p <hash>' pretty-prints the content of any object (blob, tree, commit, or tag)."
  },
  {
    id: 11,
    question: "What does the directory '.git/refs/remotes/' store?",
    options: [
      "Remote server passwords",
      "Pointers to the last known commit hashes of branches on remote repositories (e.g., origin/main)",
      "Downloaded ZIP archives of GitHub releases",
      "API access tokens"
    ],
    answer: "Pointers to the last known commit hashes of branches on remote repositories (e.g., origin/main)",
    explanation: "Remote-tracking branch references reside in '.git/refs/remotes/<remote-name>/', updated whenever 'git fetch' or 'git pull' runs."
  },
  {
    id: 12,
    question: "What is stored in the '.git/logs/' directory?",
    options: [
      "Server access access.log files",
      "Reflog records tracking the historical movement of HEAD and branch references over time",
      "Crash logs and bug reports",
      "Compilation error output"
    ],
    answer: "Reflog records tracking the historical movement of HEAD and branch references over time",
    explanation: "The '.git/logs/' folder powers the 'git reflog' command, preserving chronological logs of where HEAD and branches were pointing."
  },
  {
    id: 13,
    question: "What is the primary function of '.git/objects/pack/'?",
    options: [
      "To store npm packages",
      "To store compacted, zlib-compressed packfiles (.pack) and their index files (.idx) created during garbage collection or clone/fetch",
      "To create zip files for deployment",
      "To archive deleted branches"
    ],
    answer: "To store compacted, zlib-compressed packfiles (.pack) and their index files (.idx) created during garbage collection or clone/fetch",
    explanation: "Git packs multiple loose objects into compressed packfiles with delta-compression to optimize disk space and network transfer speeds."
  },
  {
    id: 14,
    question: "Which file contains the local repository configuration options, such as remote URLs and branch tracking?",
    options: [
      ".git/config",
      ".git/HEAD",
      ".git/repository.json",
      "~/.gitconfig"
    ],
    answer: ".git/config",
    explanation: "Local repository-specific settings are saved in '.git/config' in INI format."
  },
  {
    id: 15,
    question: "When Mahima stages a new file 'app.js' using 'git add', what happens inside '.git'?",
    options: [
      "A commit object is created immediately",
      "A new blob object containing the content of 'app.js' is written to '.git/objects/' and the '.git/index' file is updated with its hash and filepath",
      "The file is pushed to GitHub",
      "A new branch is created"
    ],
    answer: "A new blob object containing the content of 'app.js' is written to '.git/objects/' and the '.git/index' file is updated with its hash and filepath",
    explanation: "Staging a file immediately hashes the file, writes the compressed blob into '.git/objects/', and updates '.git/index' with the blob hash and metadata."
  },
  {
    id: 16,
    question: "Does a 'blob' object in Git store the file's name or its directory path?",
    options: [
      "Yes, the blob contains the full filename and file creation date",
      "No, a blob contains ONLY the raw file contents; filenames and paths are stored inside 'tree' objects",
      "Only on Windows systems",
      "Only if the file is smaller than 1 MB"
    ],
    answer: "No, a blob contains ONLY the raw file contents; filenames and paths are stored inside 'tree' objects",
    explanation: "In Git, blobs are pure content without names. Trees map filenames and file permissions (like 100644 or 100755) to blob SHA hashes."
  },
  {
    id: 17,
    question: "What does the '.git/description' file do?",
    options: [
      "It provides the GitHub repository description shown on the web page",
      "It is an old legacy file used primarily by GitWeb to display the project description",
      "It holds the project license text",
      "It is required by git commit --amend"
    ],
    answer: "It is an old legacy file used primarily by GitWeb to display the project description",
    explanation: "'.git/description' was designed for GitWeb (the default web CGI interface bundled with Git) and is unused by GitHub or GitLab."
  },
  {
    id: 18,
    question: "Which command lists all staged files recorded in the binary '.git/index' file?",
    options: [
      "git ls-files --stage",
      "git cat-file index",
      "git print index",
      "git show-index-tree"
    ],
    answer: "git ls-files --stage",
    explanation: "'git ls-files --stage' prints permissions, SHA hashes, stage numbers, and paths for all items in the index."
  },
  {
    id: 19,
    question: "If Debangshu copies the '.git' folder from Project A into an empty directory on another computer, what happens?",
    options: [
      "Git reports corruption and deletes the directory",
      "Running 'git checkout .' or 'git restore .' recreates the entire working tree with 100% of commit history intact",
      "The repository requires re-cloning from GitHub",
      "All branches are lost except main"
    ],
    answer: "Running 'git checkout .' or 'git restore .' recreates the entire working tree with 100% of commit history intact",
    explanation: "The '.git' directory is the full repository. Rebuilding the working tree from the object database is instantaneous via checkout."
  },
  {
    id: 20,
    question: "What is stored in a 'commit' object in Git?",
    options: [
      "Pointer to the top-level root tree object, parent commit SHA(s), author and committer metadata (name, email, timestamp), and commit message",
      "A diff of all modified lines since day one",
      "A list of installed VS Code extensions",
      "The user's SSH private key"
    ],
    answer: "Pointer to the top-level root tree object, parent commit SHA(s), author and committer metadata (name, email, timestamp), and commit message",
    explanation: "A commit object is a lightweight metadata document pointing to the root tree snapshot and predecessor commit(s)."
  },
  {
    id: 21,
    question: "Why does Git use SHA-1 / SHA-256 cryptographic hashing to name objects in '.git/objects'?",
    options: [
      "To guarantee content addressability and data integrity: if a single byte changes, the object gets a completely new hash",
      "To encrypt files so they cannot be read by competitors",
      "To compress files by 99%",
      "To sort files alphabetically"
    ],
    answer: "To guarantee content addressability and data integrity: if a single byte changes, the object gets a completely new hash",
    explanation: "Content addressability ensures complete cryptographic integrity. Any data corruption or tampering immediately invalidates the object hash."
  },
  {
    id: 22,
    question: "What is the role of '.git/refs/tags/'?",
    options: [
      "Storing commit tags (like v1.0.0, release-candidate) pointing to specific immutable commit snapshots",
      "Storing HTML meta tags for documentation",
      "Storing user profile tags",
      "Managing branch labels"
    ],
    answer: "Storing commit tags (like v1.0.0, release-candidate) pointing to specific immutable commit snapshots",
    explanation: "Tags stored in '.git/refs/tags/' mark specific milestones in history (lightweight tags contain commit SHAs, annotated tags point to tag objects)."
  },
  {
    id: 23,
    question: "True or False: Hook scripts inside '.git/hooks' are automatically cloned when you run 'git clone'.",
    options: [
      "True",
      "False"
    ],
    answer: "False",
    explanation: "For security reasons (preventing execution of malicious arbitrary code upon clone), Git never transfers hooks across the network during clone/fetch."
  },
  {
    id: 24,
    question: "Which command can be run to compress and clean up unreferenced objects inside '.git/objects'?",
    options: [
      "git gc (garbage collection)",
      "git cleanup",
      "git vacuum",
      "git prune-all"
    ],
    answer: "git gc (garbage collection)",
    explanation: "'git gc' packs loose objects, consolidates refs into 'packed-refs', and removes unreachable expired objects."
  },
  {
    id: 25,
    question: "Why should a developer never commit the '.git' folder into another Git repository as a subfolder (unless configured as a submodule)?",
    options: [
      "Because Git will recognize it as a nested repository and refuse to track its internal files, creating a dirty submodule state",
      "Because Windows will crash",
      "Because files will be duplicated indefinitely",
      "Because Git commands will run 10x slower"
    ],
    answer: "Because Git will recognize it as a nested repository and refuse to track its internal files, creating a dirty submodule state",
    explanation: "Git detects embedded '.git' directories and treats them as sub-repos, skipping their files unless properly managed with 'git submodule'."
  }
];

export default questions;
