/**
 * Topic 0 Questions: Git's Three-Tree Architecture: Working Directory -> Staging Area (Index) -> Repository (HEAD Commit)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Total Questions: 25 (MCQ + Conceptual + Troubleshooting)
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "What are the three distinct 'trees' managed by Git in its core architecture?",
    options: [
      "HTML DOM Tree, CSSOM Tree, and Render Tree",
      "Working Directory (Sandbox), Staging Area (Index), and Repository (HEAD Commit)",
      "Master Branch, Main Branch, and Develop Branch",
      "Local Drive, Network Drive, and Cloud Drive"
    ],
    answer: "Working Directory (Sandbox), Staging Area (Index), and Repository (HEAD Commit)",
    explanation: "Git's fundamental mental model revolves around these three trees: your editable files on disk (Working Directory), the prepared snapshot cache (.git/index), and the immutable commit database (HEAD)."
  },
  {
    id: 2,
    question: "Where is the Staging Area physically stored on your computer?",
    options: [
      "In the cloud on GitHub servers",
      "In a hidden binary file at '.git/index'",
      "In a plain text file at '~/.gitconfig'",
      "In the computer's volatile RAM only"
    ],
    answer: "In a hidden binary file at '.git/index'",
    explanation: "The Staging Area is persisted as a binary index file at '.git/index' containing file paths, modification timestamps, permissions, and staged blob SHA hashes."
  },
  {
    id: 3,
    question: "Which command moves changes from the Working Directory into the Staging Area (Index)?",
    options: [
      "git commit",
      "git add",
      "git push",
      "git checkout"
    ],
    answer: "git add",
    explanation: "'git add <file>' copies the current file content as a blob into '.git/objects/' and records its hash in '.git/index'."
  },
  {
    id: 4,
    question: "Which command records the staged snapshot from the Staging Area permanently into the Repository (HEAD)?",
    options: [
      "git commit",
      "git save",
      "git sync",
      "git stage"
    ],
    answer: "git commit",
    explanation: "'git commit' writes a root tree object reflecting the exact state of the index and creates a commit object pointing to it."
  },
  {
    id: 5,
    question: "What is the primary architectural advantage of having an intermediate Staging Area rather than committing directly from disk?",
    options: [
      "It allows developers to selectively craft atomic commits, reviewing and staging only related changes rather than blindly bundling all modified files",
      "It doubles the download speed from GitHub",
      "It eliminates the need for commit messages",
      "It encrypts the source code automatically"
    ],
    answer: "It allows developers to selectively craft atomic commits, reviewing and staging only related changes rather than blindly bundling all modified files",
    explanation: "The staging area decouples your local workspace experimentation from the repository history, letting you assemble clean, isolated, reviewable commits."
  },
  {
    id: 6,
    question: "Which command compares the changes in your Working Directory with the Staging Area (unstaged modifications)?",
    options: [
      "git diff",
      "git diff --staged",
      "git diff HEAD",
      "git log -p"
    ],
    answer: "git diff",
    explanation: "Plain 'git diff' displays line-by-line differences between the working tree on disk and the staging index."
  },
  {
    id: 7,
    question: "Which command compares what is currently staged in the Index with the last commit in HEAD?",
    options: [
      "git diff --staged (or git diff --cached)",
      "git diff",
      "git status -v",
      "git show HEAD"
    ],
    answer: "git diff --staged (or git diff --cached)",
    explanation: "'git diff --staged' (or its synonym 'git diff --cached') reveals exactly what will be included in the next commit."
  },
  {
    id: 8,
    question: "Which command compares the Working Directory directly against the HEAD commit, showing all changes (staged + unstaged)?",
    options: [
      "git diff HEAD",
      "git diff --all",
      "git diff master",
      "git log --diff"
    ],
    answer: "git diff HEAD",
    explanation: "'git diff HEAD' compares the current files on disk directly against the latest commit snapshot, ignoring the intermediate index state."
  },
  {
    id: 9,
    question: "What does Sukanta Sir mean by the 'Photographer's Viewfinder' metaphor for the Staging Area?",
    options: [
      "Git requires a webcam to verify developer facial identity",
      "You arrange subjects, check framing, and review exactly what enters the snapshot before clicking the shutter button ('git commit')",
      "Git compresses images better than Photoshop",
      "You should only commit JPEG files"
    ],
    answer: "You arrange subjects, check framing, and review exactly what enters the snapshot before clicking the shutter button ('git commit')",
    explanation: "The staging area is a preparation viewfinder where you curate the exact components of your next historical commit photo."
  },
  {
    id: 10,
    question: "Which plumbing command directly displays the file paths, permissions, and blob hashes recorded in the binary '.git/index' file?",
    options: [
      "git ls-files --stage",
      "cat .git/index",
      "git show-index",
      "git print-stage"
    ],
    answer: "git ls-files --stage",
    explanation: "'git ls-files --stage' dumps the internal contents of the binary index file in human-readable format."
  },
  {
    id: 11,
    question: "If Mahima modifies 'index.html' and runs 'git add index.html', then modifies 'index.html' AGAIN without running 'git add', what will 'git status' report?",
    options: [
      "The file is only shown under 'Changes to be committed'",
      "The file is shown in BOTH sections: 'Changes to be committed' (the first staged version) and 'Changes not staged for commit' (the second unstaged edits)",
      "Git deletes the file due to conflict",
      "Git commits the second modification automatically"
    ],
    answer: "The file is shown in BOTH sections: 'Changes to be committed' (the first staged version) and 'Changes not staged for commit' (the second unstaged edits)",
    explanation: "Git stages snapshots, not files! The staged snapshot holds version 1, while the working tree holds version 2 until staged again."
  },
  {
    id: 12,
    question: "When Sachin runs 'git commit' after the scenario in Question 11, which version of 'index.html' will be recorded in the new commit?",
    options: [
      "The first version that was staged with 'git add'",
      "The second version currently in the Working Tree",
      "A combination of both versions merged together",
      "An empty file"
    ],
    answer: "The first version that was staged with 'git add'",
    explanation: "Commits are created strictly from the contents of the Staging Area (Index), completely ignoring unstaged working directory changes."
  },
  {
    id: 13,
    question: "What happens to the Staging Area after 'git commit' completes successfully?",
    options: [
      "The '.git/index' file is deleted permanently",
      "The Staging Area remains, now matching the newly created HEAD commit tree",
      "All files in the staging area are reverted to blank",
      "The repository resets to branch main"
    ],
    answer: "The Staging Area remains, now matching the newly created HEAD commit tree",
    explanation: "After a commit, the index matches the new HEAD commit, meaning there are 0 uncommitted staged changes."
  },
  {
    id: 14,
    question: "What happens if a developer deletes a file on disk in the Working Tree?",
    options: [
      "The file is deleted from Git's entire historical commit history",
      "The deletion is recognized in the Working Tree as unstaged; running 'git add <file>' or 'git rm <file>' stages the deletion for the next commit",
      "Git crashes with a missing file error",
      "Git restores the file automatically from GitHub"
    ],
    answer: "The deletion is recognized in the Working Tree as unstaged; running 'git add <file>' or 'git rm <file>' stages the deletion for the next commit",
    explanation: "Deleting a file only affects the Working Tree until that deletion is explicitly staged into the index."
  },
  {
    id: 15,
    question: "Which command discards changes in the Working Tree and restores files to match the Staging Index (in modern Git 2.23+)?",
    options: [
      "git restore <file>",
      "git discard <file>",
      "git clean --force",
      "git undo <file>"
    ],
    answer: "git restore <file>",
    explanation: "'git restore <file>' overwrites the working tree version with the version currently in the staging index."
  },
  {
    id: 16,
    question: "Which command removes a file from the Staging Area back to unstaged status while preserving your Working Tree edits?",
    options: [
      "git restore --staged <file>",
      "git delete --stage <file>",
      "git unstage-file <file>",
      "git reset --hard"
    ],
    answer: "git restore --staged <file>",
    explanation: "'git restore --staged <file>' (or legacy 'git reset HEAD <file>') unstages the file while keeping your local code changes intact."
  },
  {
    id: 17,
    question: "True or False: The Staging Area allows you to stage partial changes (hunks) of a single file using 'git add -p'.",
    options: [
      "True",
      "False"
    ],
    answer: "True",
    explanation: "Patch mode ('git add -p') allows granular chunk-by-chunk staging within a single file."
  },
  {
    id: 18,
    question: "What is the relationship between the 'tree' object in '.git/objects' and the Staging Area?",
    options: [
      "They are identical files stored in RAM",
      "When you run 'git commit', Git serializes the state of the '.git/index' binary into a permanent SHA-hashed 'tree' object in '.git/objects/'",
      "Tree objects are created only on GitHub",
      "Tree objects delete the staging area"
    ],
    answer: "When you run 'git commit', Git serializes the state of the '.git/index' binary into a permanent SHA-hashed 'tree' object in '.git/objects/'",
    explanation: "The index is the mutable draft of the tree; committing makes it an immutable tree object in the Git object store."
  },
  {
    id: 19,
    question: "In SVN and CVS, what happened when you ran 'svn commit'?",
    options: [
      "Files moved to a staging area first",
      "Changes went directly from your local disk over the network to the central server, without any local staging intermediate",
      "SVN checked code with AI",
      "SVN created local branch pointers"
    ],
    answer: "Changes went directly from your local disk over the network to the central server, without any local staging intermediate",
    explanation: "Centralized VCS lacked a staging area; commits were atomic network pushes directly from disk to server."
  },
  {
    id: 20,
    question: "Why does the binary nature of '.git/index' make Git operations so fast?",
    options: [
      "It holds stat cache (file size, timestamp, inode) allowing Git to detect modified files without reading their full disk contents",
      "It compresses files with zip",
      "It uses quantum computing",
      "It turns off file checking"
    ],
    answer: "It holds stat cache (file size, timestamp, inode) allowing Git to detect modified files without reading their full disk contents",
    explanation: "Stat caching enables 'git status' to compare timestamps and file sizes in microseconds rather than re-hashing gigabytes of data."
  },
  {
    id: 21,
    question: "What happens if you run 'git commit -a -m \"message\"'?",
    options: [
      "Git automatically stages all tracked modified and deleted files and commits them in one step, bypassing manual 'git add'",
      "Git commits untracked new files automatically",
      "Git aborts the commit",
      "Git pushes directly to production"
    ],
    answer: "Git automatically stages all tracked modified and deleted files and commits them in one step, bypassing manual 'git add'",
    explanation: "The '-a' (all) flag auto-stages tracked modified/deleted files, but does NOT stage newly created untracked files."
  },
  {
    id: 22,
    question: "Can an untracked new file be committed using 'git commit -a -m \"...\"' without running 'git add' first?",
    options: [
      "Yes, -a commits everything",
      "No, 'git commit -a' only applies to files that are already tracked by Git; new untracked files MUST be added with 'git add' at least once",
      "Only if the file is an HTML file",
      "Only on Windows"
    ],
    answer: "No, 'git commit -a' only applies to files that are already tracked by Git; new untracked files MUST be added with 'git add' at least once",
    explanation: "Git never tracks new files automatically for safety reasons; explicit 'git add' is required to track a new file."
  },
  {
    id: 23,
    question: "What does Debangshu observe when running 'git status' when the Working Tree, Index, and HEAD are all identical?",
    options: [
      "'fatal: repository is empty'",
      "'nothing to commit, working tree clean'",
      "'merge conflict detected'",
      "'repository out of sync'"
    ],
    answer: "'nothing to commit, working tree clean'",
    explanation: "When all three trees hold identical snapshots, the repository is in a clean state."
  },
  {
    id: 24,
    question: "Why should developers check 'git status' before running destructive commands like 'git reset --hard'?",
    options: [
      "Because 'git reset --hard' will permanently overwrite unstaged Working Tree changes without any way to recover them from Git",
      "Because Git will crash otherwise",
      "To update the clock",
      "To check internet connection"
    ],
    answer: "Because 'git reset --hard' will permanently overwrite unstaged Working Tree changes without any way to recover them from Git",
    explanation: "Uncommitted, unstaged modifications in the working tree are not saved in the Git object store; hard resets wipe them irrecoverably."
  },
  {
    id: 25,
    question: "What is the primary mental model Sukanta Sir recommends to master Git's Three Trees?",
    options: [
      "Treat Working Tree as your Workbench, Staging Area as your Shipping Box, and HEAD Commit as the Sealed Sealed Container in the Warehouse",
      "Treat Git like a Dropbox sync folder",
      "Treat Git like a USB pendrive",
      "Treat Git as a real-time text editor"
    ],
    answer: "Treat Working Tree as your Workbench, Staging Area as your Shipping Box, and HEAD Commit as the Sealed Sealed Container in the Warehouse",
    explanation: "The Workbench (Working Tree) -> Shipping Box (Staging Area) -> Sealed Warehouse Archive (HEAD) is the ultimate intuitive mental model."
  }
];

export default questions;
