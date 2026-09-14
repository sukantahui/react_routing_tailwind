/**
 * Topic 3 Questions: Inspecting Working Tree Status (git status and short format git status -s)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic3_questions = [
  {
    id: 1,
    question: "What does the left (first) column in `git status -s` represent?",
    options: [
      "The status of the working tree compared to the staging area",
      "The status of the staging area (index) compared to the HEAD (last commit)",
      "The status of the remote branch compared to the local branch",
      "The status of untracked files"
    ],
    correctAnswer: 1,
    explanation: "In `git status -s` (two-column format XY), X (column 1) represents the staging area (Index) status relative to HEAD, and Y (column 2) represents the working tree status relative to the index."
  },
  {
    id: 2,
    question: "What does the right (second) column in `git status -s` represent?",
    options: [
      "The status of the remote repository",
      "The status of the staging area compared to HEAD",
      "The status of the working tree compared to the staging area (index)",
      "The file permissions in the operating system"
    ],
    correctAnswer: 2,
    explanation: "Column 2 (Y) shows whether changes exist in the working directory that have not yet been staged into the index."
  },
  {
    id: 3,
    question: "What does the status code `??` indicate in `git status -s`?",
    options: [
      "A corrupted git object",
      "A merge conflict in the file",
      "An untracked file that exists on disk but is not in the index or git repo",
      "A file that has been deleted from the index"
    ],
    correctAnswer: 2,
    explanation: "`??` designates an untracked file—a file in the working directory that is neither tracked in the index nor ignored by .gitignore."
  },
  {
    id: 4,
    question: "What does the status code `A ` (with a trailing space) indicate in `git status -s`?",
    options: [
      "A new file has been added to the staging area and not yet committed, with no unstaged modifications",
      "The file is archived in Git LFS",
      "The file has been deleted automatically",
      "The file is awaiting merge resolution"
    ],
    correctAnswer: 0,
    explanation: "An 'A' in the first column and a space in the second column means the new file is staged in the index (added) with no subsequent unstaged working tree changes."
  },
  {
    id: 5,
    question: "What does the status code ` M` (space followed by M) mean in `git status -s`?",
    options: [
      "The file is staged and ready to commit",
      "The file has been modified in the working tree, but the modifications are NOT staged in the index",
      "The file has been moved to a new branch",
      "The file has been merged successfully"
    ],
    correctAnswer: 1,
    explanation: "A space in column 1 and 'M' in column 2 means the index matches HEAD, but the working tree has unstaged modifications."
  },
  {
    id: 6,
    question: "What does the status code `M ` (M followed by a space) mean in `git status -s`?",
    options: [
      "The file was modified in the working tree and has been staged into the index; it is ready to be committed",
      "The file is locked by another developer",
      "The file was merged without conflicts",
      "The file is missing from the working directory"
    ],
    correctAnswer: 0,
    explanation: "'M' in column 1 and space in column 2 indicates that modifications have been staged into the index (Index differs from HEAD, working tree matches Index)."
  },
  {
    id: 7,
    question: "If `git status -s` outputs `MM app.js`, what does this signify?",
    options: [
      "The file has multiple merge conflicts",
      "The file was modified and staged, and then modified AGAIN in the working tree without staging the second modification",
      "The file has two different author signatures",
      "The file is duplicated across two directories"
    ],
    correctAnswer: 1,
    explanation: "`MM` indicates that changes were staged into the index (left M), but subsequent edits were made in the working tree that remain unstaged (right M)."
  },
  {
    id: 8,
    question: "Which flag can you add to `git status -s` to display branch and tracking information on the top line?",
    options: [
      "-b (or --branch)",
      "-v",
      "--all",
      "-t"
    ],
    correctAnswer: 0,
    explanation: "`git status -sb` or `git status -s -b` outputs the short status prefixed with the current branch name and upstream tracking info (e.g. `## main...origin/main [ahead 1]`)."
  },
  {
    id: 9,
    question: "In the long format of `git status`, under which header do staged modifications appear?",
    options: [
      "Untracked files:",
      "Changes not staged for commit:",
      "Changes to be committed:",
      "Unmerged paths:"
    ],
    correctAnswer: 2,
    explanation: "Changes staged in the index ready for the next commit appear under 'Changes to be committed:'."
  },
  {
    id: 10,
    question: "Under which header do tracked files with unstaged changes appear in `git status`?",
    options: [
      "Changes not staged for commit:",
      "Changes to be committed:",
      "Untracked files:",
      "Ignored files:"
    ],
    correctAnswer: 0,
    explanation: "Tracked files with modifications in the working tree that have not been staged appear under 'Changes not staged for commit:'."
  },
  {
    id: 11,
    question: "What does the status code ` D` (space followed by D) represent in `git status -s`?",
    options: [
      "File deleted from the index only",
      "File deleted in the working directory on disk, but the deletion is NOT yet staged in the index",
      "Directory removed from git history",
      "Duplicate file detected"
    ],
    correctAnswer: 1,
    explanation: "A space in column 1 and 'D' in column 2 signifies that the file was deleted in the working tree, but `git add/rm` has not been run to stage the deletion."
  },
  {
    id: 12,
    question: "What does the status code `D ` (D followed by space) mean in `git status -s`?",
    options: [
      "Deletion of the file has been staged in the index and is ready to be committed",
      "The working tree has deleted files that cannot be recovered",
      "The file is marked for deprecation",
      "The remote repository deleted the file"
    ],
    correctAnswer: 0,
    explanation: "'D' in column 1 indicates that the removal of the file has been staged in the index."
  },
  {
    id: 13,
    question: "What does the code `AM` in `git status -s` mean?",
    options: [
      "A file was newly created, staged in index (A), and then edited further in the working tree (M) without staging the update",
      "A file was automatically merged",
      "An automated commit is pending",
      "A file is both archived and modified"
    ],
    correctAnswer: 0,
    explanation: "`AM` means a new untracked file was staged with `git add`, and then modified in the working tree without re-staging."
  },
  {
    id: 14,
    question: "What status code does `git status -s` output when a file has an unresolved merge conflict?",
    options: [
      "XX",
      "UU",
      "CC",
      "?!"
    ],
    correctAnswer: 1,
    explanation: "`UU` indicates unmerged / both modified conflict status."
  },
  {
    id: 15,
    question: "Which command reveals files ignored by `.gitignore` along with their status?",
    options: [
      "git status --ignored",
      "git status --hidden",
      "git status -x",
      "git status --skip-worktree"
    ],
    correctAnswer: 0,
    explanation: "`git status --ignored` displays ignored files, showing them prefixed with `!!` in short mode."
  },
  {
    id: 16,
    question: "What is the primary benefit of using `git status -s` in automated scripts or shell prompts?",
    options: [
      "It consumes zero CPU",
      "Its compact, deterministic output is easy to parse programmatically and takes up minimal terminal space",
      "It automatically resolves git conflicts",
      "It commits the files automatically"
    ],
    correctAnswer: 1,
    explanation: "`git status -s` provides a predictable, 2-column machine- and human-readable format ideal for custom prompts (zsh, bash, starship) and CI/CD scripts."
  },
  {
    id: 17,
    question: "If an entire folder `src/components/` is untracked with 5 files inside, what does `git status -s` show by default?",
    options: [
      "Every individual file listed with `??`",
      "Only `?? src/components/` (directory summary)",
      "Nothing until git add is run",
      "An error message"
    ],
    correctAnswer: 1,
    explanation: "By default, Git collapses untracked directories to `?? dir_name/`. To see all internal files, use `git status -uall` (or `-u`)."
  },
  {
    id: 18,
    question: "Which flag forces `git status` to list all individual files inside untracked directories?",
    options: [
      "-uall (or --untracked-files=all)",
      "--deep",
      "-r",
      "--recurse-submodules"
    ],
    correctAnswer: 0,
    explanation: "`git status -uall` (or `--untracked-files=all`) forces Git to traverse and list every untracked file individually."
  },
  {
    id: 19,
    question: "What does the status code `R ` represent in `git status -s`?",
    options: [
      "File was rejected by pre-commit hook",
      "File was renamed in the index (staged rename) from old path to new path",
      "File is read-only",
      "Remote branch was reset"
    ],
    correctAnswer: 1,
    explanation: "'R ' indicates a renamed file staged in the index (e.g. `R  old.js -> new.js`)."
  },
  {
    id: 20,
    question: "Mahima deletes `styles.css` using `rm styles.css`. She runs `git status -s`. What does she see?",
    options: [
      "D  styles.css",
      " D styles.css",
      "?? styles.css",
      "styles.css deleted permanently"
    ],
    correctAnswer: 1,
    explanation: "Since she deleted it on disk with OS `rm` without running `git add styles.css` or `git rm styles.css`, the deletion is unstaged, displaying ` D styles.css`."
  },
  {
    id: 21,
    question: "Debangshu runs `git rm report.pdf` in terminal. What does `git status -s` output?",
    options: [
      " D report.pdf",
      "D  report.pdf",
      "?? report.pdf",
      "RM report.pdf"
    ],
    correctAnswer: 1,
    explanation: "`git rm` deletes the file from disk and automatically stages the deletion in the index, resulting in `D  report.pdf` (left column D)."
  },
  {
    id: 22,
    question: "If working directory is completely clean and identical to HEAD, what does `git status` print?",
    options: [
      "nothing to commit, working tree clean",
      "repository empty",
      "all files staged",
      "status 0"
    ],
    correctAnswer: 0,
    explanation: "When Working Tree == Index == HEAD, Git prints 'nothing to commit, working tree clean'."
  },
  {
    id: 23,
    question: "What does `git status` print if files are staged in the index, but there are no unstaged modifications in the working tree?",
    options: [
      "working tree clean, nothing to commit",
      "Changes to be committed: (with staged files listed in green)",
      "fatal: ambiguous argument",
      "Repository locked"
    ],
    correctAnswer: 1,
    explanation: "When the Index differs from HEAD, Git displays 'Changes to be committed:' listing the staged changes."
  },
  {
    id: 24,
    question: "Why should a developer run `git status` immediately before running `git commit`?",
    options: [
      "To refresh the network connection to GitHub",
      "To verify that exactly the intended changes (and no accidental debug logs or private keys) are staged in the index",
      "Because Git will fail to commit without a prior status command",
      "To unlock the .git/index file"
    ],
    correctAnswer: 1,
    explanation: "Running `git status` right before committing prevents staging accidental files, secrets, or leaving intended edits behind in the working tree."
  },
  {
    id: 25,
    question: "How can you create a permanent short alias `git st` for `git status -sb`?",
    options: [
      "git config --global alias.st 'status -sb'",
      "git alias st='status -sb'",
      "alias git status='git st'",
      "npm install -g git-st"
    ],
    correctAnswer: 0,
    explanation: "`git config --global alias.st 'status -sb'` creates a convenient global shortcut allowing you to run `git st`."
  }
];

export default topic3_questions;
