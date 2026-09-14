/**
 * Topic 1 Questions: The Lifecycle of File Status: Untracked, Unmodified, Modified, and Staged
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Total Questions: 25 (MCQ + Short Status Syntax + Scenarios)
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "What are the four primary lifecycle statuses a file can hold in a Git repository?",
    options: [
      "Draft, Review, Approved, Published",
      "Untracked, Unmodified, Modified, and Staged",
      "Public, Private, Protected, Static",
      "Binary, Text, Executable, Archive"
    ],
    answer: "Untracked, Unmodified, Modified, and Staged",
    explanation: "Git classifies every file in the working directory into these four distinct lifecycle states."
  },
  {
    id: 2,
    question: "What defines an 'Untracked' file in Git?",
    options: [
      "A file that was corrupted during a crash",
      "Any file in your working directory that was neither part of the last commit snapshot nor has been added to the staging index",
      "A file tracked by SVN instead of Git",
      "A file marked with read-only permissions"
    ],
    answer: "Any file in your working directory that was neither part of the last commit snapshot nor has been added to the staging index",
    explanation: "Untracked files are new files created in the working tree that Git is not monitoring until you run 'git add'."
  },
  {
    id: 3,
    question: "What does 'git status -s' (or 'git status --short') display for an untracked file?",
    options: [
      "??",
      "A ",
      " M",
      "D "
    ],
    answer: "??",
    explanation: "'??' indicates that the file is untracked (present in working tree, absent from index and HEAD)."
  },
  {
    id: 4,
    question: "In the short status output 'M  app.js' (green 'M' in column 1, space in column 2), what does this indicate?",
    options: [
      "app.js is modified in the working tree but NOT staged",
      "app.js is modified and STAGED in the index, ready to be committed",
      "app.js is deleted",
      "app.js has merge conflicts"
    ],
    answer: "app.js is modified and STAGED in the index, ready to be committed",
    explanation: "Column 1 represents the Staging Index state compared to HEAD. 'M ' means modified changes are staged in the index."
  },
  {
    id: 5,
    question: "In the short status output ' M app.js' (space in column 1, red 'M' in column 2), what does this indicate?",
    options: [
      "app.js is modified in the working tree but has NOT been staged into the index",
      "app.js is committed",
      "app.js is an untracked file",
      "app.js is ignored by .gitignore"
    ],
    answer: "app.js is modified in the working tree but has NOT been staged into the index",
    explanation: "Column 2 represents the Working Tree state compared to the Index. ' M' means changes exist on disk that are unstaged."
  },
  {
    id: 6,
    question: "What does the short status 'MM app.js' (both columns showing 'M') mean?",
    options: [
      "The file is in a dual state: modified and staged, then modified AGAIN in the working tree without being re-staged",
      "The file is duplicated on the hard drive",
      "The file was created by Microsoft",
      "The file has a merge conflict"
    ],
    answer: "The file is in a dual state: modified and staged, then modified AGAIN in the working tree without being re-staged",
    explanation: "'MM' means the index holds a staged version, but newer unstaged modifications exist in the working directory."
  },
  {
    id: 7,
    question: "In short status, what does 'A  server.js' signify?",
    options: [
      "A new file has been added and staged in the index",
      "The file is archived",
      "The file has an author tag",
      "The file is corrupted"
    ],
    answer: "A new file has been added and staged in the index",
    explanation: "'A ' indicates a newly created file that has been added to the staging index for the first time."
  },
  {
    id: 8,
    question: "Which state transition occurs when you execute 'git commit' on staged files?",
    options: [
      "Staged -> Unmodified",
      "Staged -> Untracked",
      "Modified -> Untracked",
      "Unmodified -> Staged"
    ],
    answer: "Staged -> Unmodified",
    explanation: "Committing records the staged state into HEAD, making the working tree, index, and HEAD identical (Unmodified)."
  },
  {
    id: 9,
    question: "Which command transitions a tracked file from 'Unmodified' to 'Untracked' while keeping the file safely on your hard drive?",
    options: [
      "git rm --cached <file>",
      "git delete <file>",
      "git unpin <file>",
      "git detach <file>"
    ],
    answer: "git rm --cached <file>",
    explanation: "'git rm --cached <file>' removes the file from Git's index tracking while keeping the physical file intact in your working tree."
  },
  {
    id: 10,
    question: "What command transitions a file from 'Modified' back to 'Unmodified' by discarding all unstaged local edits on disk?",
    options: [
      "git restore <file>",
      "git clean <file>",
      "git revert-disk <file>",
      "git rollback <file>"
    ],
    answer: "git restore <file>",
    explanation: "'git restore <file>' discards working tree changes and restores the file to match the index."
  },
  {
    id: 11,
    question: "What happens when you edit an 'Unmodified' file in your code editor?",
    options: [
      "It automatically moves to the Staged state",
      "It transitions to the 'Modified' (unstaged) state in the Working Tree",
      "It becomes Untracked",
      "Git prompts you for a password"
    ],
    answer: "It transitions to the 'Modified' (unstaged) state in the Working Tree",
    explanation: "Modifying a tracked file changes its state from Unmodified to Modified."
  },
  {
    id: 12,
    question: "In short status, what does ' D index.html' represent?",
    options: [
      "index.html was deleted in the working tree, but the deletion is NOT yet staged in the index",
      "index.html is a draft",
      "index.html is duplicated",
      "index.html is staged for deletion"
    ],
    answer: "index.html was deleted in the working tree, but the deletion is NOT yet staged in the index",
    explanation: "' D' in column 2 indicates that the file was deleted on disk but the deletion has not been staged with 'git add' or 'git rm'."
  },
  {
    id: 13,
    question: "In short status, what does 'D  index.html' represent?",
    options: [
      "The deletion of index.html has been staged in the index, ready to be committed",
      "The file is dangerous",
      "The file was restored",
      "The file is on the D: drive"
    ],
    answer: "The deletion of index.html has been staged in the index, ready to be committed",
    explanation: "'D ' in column 1 means the file deletion is staged in the index."
  },
  {
    id: 14,
    question: "Why does Git distinguish between 'Untracked' and 'Ignored' files?",
    options: [
      "Untracked files will show up in 'git status' warnings, whereas Ignored files (matching .gitignore) are completely hidden from status to avoid clutter",
      "Ignored files are deleted automatically",
      "Untracked files are encrypted",
      "There is no difference"
    ],
    answer: "Untracked files will show up in 'git status' warnings, whereas Ignored files (matching .gitignore) are completely hidden from status to avoid clutter",
    explanation: "Ignored files are untracked files deliberately suppressed from status reports via '.gitignore'."
  },
  {
    id: 15,
    question: "Which command shows ignored files in 'git status' if you need to troubleshoot ignore rules?",
    options: [
      "git status --ignored",
      "git show-ignored",
      "git list-hidden",
      "git status -i"
    ],
    answer: "git status --ignored",
    explanation: "'--ignored' forces Git to display ignored files in the status report."
  },
  {
    id: 16,
    question: "When Susmita creates a new file 'styles.css', what is its status before running any Git command?",
    options: [
      "Untracked",
      "Unmodified",
      "Modified",
      "Staged"
    ],
    answer: "Untracked",
    explanation: "Brand new files created on disk start in the Untracked state."
  },
  {
    id: 17,
    question: "What happens when Susmita runs 'git add styles.css' on the new file?",
    options: [
      "It transitions from Untracked directly to Staged (marked 'A ' in git status -s)",
      "It is committed immediately",
      "It is uploaded to GitHub",
      "It becomes Unmodified"
    ],
    answer: "It transitions from Untracked directly to Staged (marked 'A ' in git status -s)",
    explanation: "'git add' on an untracked file stages it into the index for its initial commit."
  },
  {
    id: 18,
    question: "What state does 'styles.css' reach immediately after running 'git commit -m \"feat: add stylesheet\"'?",
    options: [
      "Unmodified",
      "Modified",
      "Untracked",
      "Staged"
    ],
    answer: "Unmodified",
    explanation: "Committing transitions staged changes into the new HEAD commit, making the file Unmodified."
  },
  {
    id: 19,
    question: "What does the short status 'AM file.js' mean?",
    options: [
      "A new file was added to the index (A in column 1), and then modified again on disk without re-staging (M in column 2)",
      "The file was created in the morning (AM)",
      "The file is animated",
      "The file requires admin permissions"
    ],
    answer: "A new file was added to the index (A in column 1), and then modified again on disk without re-staging (M in column 2)",
    explanation: "'AM' indicates that the file was staged as a new addition, but subsequent edits exist in the working tree."
  },
  {
    id: 20,
    question: "Which command un-stages a staged modification back to 'Modified' without losing the code edits?",
    options: [
      "git restore --staged <file>",
      "git reset --hard",
      "git clean -f",
      "git checkout --force"
    ],
    answer: "git restore --staged <file>",
    explanation: "'git restore --staged' removes the file snapshot from the index without touching the working tree file."
  },
  {
    id: 21,
    question: "What happens if you run 'git clean -df' in your repository?",
    options: [
      "Git permanently deletes all untracked files and directories from your working tree",
      "Git formats all JavaScript code",
      "Git empties the recycle bin",
      "Git commits all modified files"
    ],
    answer: "Git permanently deletes all untracked files and directories from your working tree",
    explanation: "'git clean -df' forcefully removes untracked files (-f) and directories (-d) from disk."
  },
  {
    id: 22,
    question: "Why is 'git clean -df' considered dangerous if run without a dry run?",
    options: [
      "Because untracked files are not in Git's object database; once deleted, they cannot be recovered by Git",
      "Because it resets Windows passwords",
      "Because it corrupts HEAD",
      "Because it changes file extensions"
    ],
    answer: "Because untracked files are not in Git's object database; once deleted, they cannot be recovered by Git",
    explanation: "Since Git has no record of untracked files, disk deletion is permanent. Running 'git clean -n' (dry run) is best practice."
  },
  {
    id: 23,
    question: "What flag allows you to test what 'git clean' would delete without actually deleting anything?",
    options: [
      "-n (or --dry-run)",
      "-t (test)",
      "-c (check)",
      "--preview"
    ],
    answer: "-n (or --dry-run)",
    explanation: "'git clean -n' previews which untracked files will be removed without deleting anything."
  },
  {
    id: 24,
    question: "In the lifecycle, can a file move directly from 'Modified' to 'Unmodified' without committing?",
    options: [
      "Yes, by using 'git restore <file>' to discard the modified changes and revert to the HEAD snapshot",
      "No, only commits can make files unmodified",
      "Only if the computer reboots",
      "Only on macOS"
    ],
    answer: "Yes, by using 'git restore <file>' to discard the modified changes and revert to the HEAD snapshot",
    explanation: "Discarding modifications restores the file to match the clean HEAD/index state, returning it to Unmodified."
  },
  {
    id: 25,
    question: "Why is understanding the 4 file states crucial for professional developers?",
    options: [
      "It prevents committing broken half-finished code, ensures clean staging reviews, and protects against accidental data loss",
      "It increases typing speed by 50%",
      "It is required by browser engines",
      "It bypasses GitHub authentication"
    ],
    answer: "It prevents committing broken half-finished code, ensures clean staging reviews, and protects against accidental data loss",
    explanation: "Mastery of file lifecycle states gives developers total confidence and precision over every line of code entering the repository."
  }
];

export default questions;
