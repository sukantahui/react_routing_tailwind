// Module 001_003: Viewing Commit History & Inspecting Changes
// Topic 12: Tracking Renamed and Moved Files: git log --follow <file> across historical refactorings
// Questions Author: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "What happens if you run 'git log -- <filepath>' on a file that was previously renamed, WITHOUT passing '--follow'?",
    options: [
      "Git displays history only up to the commit where the file was renamed, hiding all older commits under previous filenames",
      "Git throws an error and aborts",
      "Git displays the entire history automatically",
      "Git deletes the commit history"
    ],
    correctAnswer: 0,
    explanation: "Without '--follow', pathspec logging stops at the rename boundary because it only matches the literal current filename string."
  },
  {
    id: 2,
    question: "How does Git internally track file renames?",
    options: [
      "Git does not store explicit rename metadata; it computes dynamic content similarity between deleted and created blobs across tree objects at query time",
      "Git stores a rename table in .git/renames.db",
      "Git relies on filesystem inode numbers",
      "Git modifies commit hashes on rename"
    ],
    correctAnswer: 0,
    explanation: "Git dynamically detects renames by calculating content similarity (default 50% threshold) between deleted and newly created blobs."
  },
  {
    id: 3,
    question: "Which command lists the full history of 'src/tax/gst_calculator.js' including all previous filenames across historical refactorings?",
    options: [
      "git log --follow --oneline -- src/tax/gst_calculator.js",
      "git log --track-rename src/tax/gst_calculator.js",
      "git history --all-names src/tax/gst_calculator.js",
      "git log --rename-full src/tax/gst_calculator.js"
    ],
    correctAnswer: 0,
    explanation: "'--follow' instructs Git to continue listing the history of a single file beyond renames."
  },
  {
    id: 4,
    question: "What is a major limitation of the '--follow' option in current Git CLI?",
    options: [
      "It only works on a single file path, not on entire directories or multiple files",
      "It only works on the master branch",
      "It requires internet access",
      "It only supports C source files"
    ],
    correctAnswer: 0,
    explanation: "'--follow' in standard Git is restricted to single file paths."
  },
  {
    id: 5,
    question: "What default content similarity threshold does Git require to classify a file deletion + creation as a rename?",
    options: [
      "50% similarity",
      "10% similarity",
      "90% similarity",
      "100% exact match only"
    ],
    correctAnswer: 0,
    explanation: "Git uses a default 50% similarity score (customizable via '-M<percent>' such as '-M80%')."
  },
  {
    id: 6,
    question: "How can you view the patch diffs across all historical renames of 'app_service.js'?",
    options: [
      "git log --follow -p -- app_service.js",
      "git diff --follow app_service.js",
      "git patch-history --follow app_service.js",
      "git show-renames app_service.js"
    ],
    correctAnswer: 0,
    explanation: "Combining '--follow' and '-p' outputs line-level diff patches across all historical names of the file."
  },
  {
    id: 7,
    question: "If a file was moved from 'lib/calc.js' to 'src/tax/gst.js' with 'git mv', which command verifies the rename status in staging?",
    options: [
      "git status (shows 'renamed: lib/calc.js -> src/tax/gst.js')",
      "git diff --name-status",
      "Both A and B",
      "git check-mv"
    ],
    correctAnswer: 2,
    explanation: "Both 'git status' and 'git diff --name-status' (showing 'R100') detect and display staged rename operations."
  },
  {
    id: 8,
    question: "What does 'git log --stat -M' show for a commit that renamed a file?",
    options: [
      "Displays the transformation as '{old_dir => new_dir}/filename' with percentage similarity",
      "Displays 100% deletion of old file and 100% insertion of new file",
      "Displays an error message",
      "Hides the commit"
    ],
    correctAnswer: 0,
    explanation: "'-M' activates rename detection in stat summaries, formatting moves as '{old => new}/file'."
  },
  {
    id: 9,
    question: "What happens if a developer renames a file AND completely rewrites 90% of its code in the same commit?",
    options: [
      "The similarity drops below 50%, so Git may treat it as a deletion of the old file and creation of an unrelated new file",
      "Git merges the two files",
      "Git rejects the commit",
      "Git locks the file"
    ],
    correctAnswer: 0,
    explanation: "If similarity falls below the threshold, Git cannot heuristically connect the pre-image and post-image."
  },
  {
    id: 10,
    question: "What is the best practice when performing large refactoring and file reorganization in Git?",
    options: [
      "Perform the file renames/moves in one commit (pure git mv), and then make code edits in a subsequent commit",
      "Rename files and rewrite all code in the same commit",
      "Delete the repository and re-initialize",
      "Never rename files in Git"
    ],
    correctAnswer: 0,
    explanation: "Separating pure renames (100% similarity) from logic changes preserves 100% clean rename detection."
  },
  {
    id: 11,
    question: "How can you specify a 90% similarity threshold when running git log with rename detection?",
    options: [
      "git log --follow -M90% -- file.js",
      "git log --similarity=90 file.js",
      "git log --strict-rename file.js",
      "git log --match-90 file.js"
    ],
    correctAnswer: 0,
    explanation: "'-M<percent>' (e.g. '-M90%' or '-M09') sets the minimum similarity threshold."
  },
  {
    id: 12,
    question: "How does 'git blame' handle renamed and moved files?",
    options: [
      "git blame automatically follows renames backwards into previous filenames by default",
      "git blame crashes on renamed files",
      "You must pass '--follow' to git blame",
      "git blame only inspects the first commit"
    ],
    correctAnswer: 0,
    explanation: "'git blame' traces line provenance across renames and file moves automatically."
  },
  {
    id: 13,
    question: "What does 'git mv old_name.js new_name.js' actually do under the hood?",
    options: [
      "It moves the file on disk, stages the removal of old_name.js, and stages the addition of new_name.js",
      "It writes a rename metadata entry into .git/objects",
      "It creates a hard symlink",
      "It requires a remote server connection"
    ],
    correctAnswer: 0,
    explanation: "'git mv' is syntactic convenience for: mv old new && git add -A."
  },
  {
    id: 14,
    question: "What does the notation 'R100 lib/calc.js src/calc.js' mean in git diff --name-status?",
    options: [
      "The file was renamed with 100% identical content (zero lines modified during move)",
      "The file was rejected 100 times",
      "The file was removed and restored",
      "The file has 100 revisions"
    ],
    correctAnswer: 0,
    explanation: "'R100' indicates a Rename with 100% content similarity."
  },
  {
    id: 15,
    question: "If Swadeep renamed 'invoice.js' to 'InvoiceService.ts' 3 months ago, how can Mahima find when 'invoice.js' was first created?",
    options: [
      "git log --follow --reverse --oneline -- InvoiceService.ts",
      "git log --first InvoiceService.ts",
      "git find-genesis InvoiceService.ts",
      "git show --first-name InvoiceService.ts"
    ],
    correctAnswer: 0,
    explanation: "Combining '--follow' and '--reverse' traces all the way back to the root creation commit under the original name."
  },
  {
    id: 16,
    question: "Can '--follow' be combined with author filters like '--author'?",
    options: [
      "Yes: git log --follow --author=\"Susmita\" --oneline -- src/tax_calc.js",
      "No, --follow disables author filtering",
      "Only on macOS workstations",
      "Only for files smaller than 10KB"
    ],
    correctAnswer: 0,
    explanation: "All standard Git filtering flags compose seamlessly with '--follow'."
  },
  {
    id: 17,
    question: "What happens if you run 'git log --follow -- src/' on a directory?",
    options: [
      "Git does not support '--follow' on directories and behaves like normal pathspec logging",
      "Git renames all files inside src/",
      "Git crashes with a memory leak",
      "Git deletes the folder"
    ],
    correctAnswer: 0,
    explanation: "'--follow' is designed and supported strictly for single file pathspecs."
  },
  {
    id: 18,
    question: "How can you view the commit that performed the rename operation?",
    options: [
      "Run 'git log --follow --stat -- <file>' and find the commit showing '{old => new}'",
      "Check the branch name",
      "Run git status --renames",
      "Check package.json"
    ],
    correctAnswer: 0,
    explanation: "The stat output visually indicates the rename commit with '{old_name => new_name}'."
  },
  {
    id: 19,
    question: "What does 'git diff -M --summary' show?",
    options: [
      "High-level file creation, deletion, and rename mode summaries with similarity percentages",
      "A 1-sentence English summary of the diff",
      "A list of authors",
      "The disk memory summary"
    ],
    correctAnswer: 0,
    explanation: "'--summary' outputs created/deleted/renamed file mode descriptions."
  },
  {
    id: 20,
    question: "Why does Git use heuristic content similarity instead of file tracking IDs like TFS/Perforce?",
    options: [
      "Because Git's content-addressable architecture focuses on file content snapshots rather than filesystem metadata, making merges and cherry-picks robust",
      "Because Linus Torvalds forgot to add file IDs",
      "To save 4 bytes of disk space",
      "Because file IDs are illegal in Linux"
    ],
    correctAnswer: 0,
    explanation: "Content similarity tracking avoids fragile metadata tracking and works naturally with distributed branching and merging."
  },
  {
    id: 21,
    question: "What does 'git log --follow -n 5 -- src/tax.js' output?",
    options: [
      "The 5 most recent commits affecting 'src/tax.js', traversing across any past renames",
      "The 5 oldest commits",
      "5 files in src/",
      "5 branches"
    ],
    correctAnswer: 0,
    explanation: "'-n 5' limits the followed history to the 5 most recent commits."
  },
  {
    id: 22,
    question: "How can you check if Git's rename detection is enabled in your configuration?",
    options: [
      "Check 'diff.renames' (defaults to 'true')",
      "Check 'core.trackRenames'",
      "Check 'git.enableMv'",
      "Check 'log.followDefault'"
    ],
    correctAnswer: 0,
    explanation: "'diff.renames' controls whether Git automatically detects renames."
  },
  {
    id: 23,
    question: "What does 'git blame -C -C' do on moved code?",
    options: [
      "Traces line authorship back to the original file even if lines were copy-pasted into a brand new file",
      "Blames two files simultaneously",
      "Compiles C++ files twice",
      "Checks GPG certificates"
    ],
    correctAnswer: 0,
    explanation: "'-C -C' detects lines copied from other files when the current file was created."
  },
  {
    id: 24,
    question: "If a file was renamed 3 times ('a.js' -> 'b.js' -> 'c.js' -> 'd.js'), how many renames will 'git log --follow -- d.js' traverse?",
    options: [
      "All 3 renames, all the way back to the creation of 'a.js'",
      "Only the last rename from 'c.js'",
      "Only 1 rename",
      "Zero renames"
    ],
    correctAnswer: 0,
    explanation: "'--follow' iteratively follows the lineage across all historical renames back to root creation."
  },
  {
    id: 25,
    question: "Which of the following is the best command to inspect the complete origin and evolutionary history of a refactored file?",
    options: [
      "git log --follow -p -- src/tax/gst_calculator.js",
      "git log --all src/tax/gst_calculator.js",
      "git show --full src/tax/gst_calculator.js",
      "git history src/tax/gst_calculator.js"
    ],
    correctAnswer: 0,
    explanation: "'git log --follow -p -- <file>' combines iterative rename traversal with full unified diff inspection."
  }
];

export default questions;
