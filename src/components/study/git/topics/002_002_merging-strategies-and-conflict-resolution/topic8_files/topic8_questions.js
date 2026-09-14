// ==============================================================================
// TOPIC 8 QUESTIONS & SELF-ASSESSMENT
// Module: 002_002_merging-strategies-and-conflict-resolution
// Topic: Using Graphical & Visual Merge Tools (git mergetool)
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
// ==============================================================================

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of the `git mergetool` command?",
    options: [
      "To automatically delete all conflicting files without confirmation",
      "To launch an external graphical 3-way visual merge tool to resolve unmerged conflicts interactively",
      "To convert a Git repository into a Subversion repository",
      "To compress all commits into a zip file"
    ],
    answer: 1,
    explanation: "`git mergetool` launches external GUI merge editors (e.g. VS Code, Meld, KDiff3) to provide a visual side-by-side resolution experience."
  },
  {
    id: 2,
    question: "Which four variables does Git pass to an external merge tool command?",
    options: [
      "$LOCAL, $REMOTE, $BASE, and $MERGED",
      "$USER, $PASS, $HOST, and $PORT",
      "$HEAD, $TAIL, $BODY, and $FOOTER",
      "$GIT_AUTHOR, $GIT_COMMIT, $BRANCH, and $LOG"
    ],
    answer: 0,
    explanation: "Git passes `$LOCAL` (our branch), `$REMOTE` (their incoming branch), `$BASE` (common ancestor), and `$MERGED` (the target file to save the final resolution)."
  },
  {
    id: 3,
    question: "What does the `$BASE` variable represent in a 3-way graphical merge tool?",
    options: [
      "The URL of the remote GitHub repository",
      "A temporary file containing the file's content in the common ancestor commit (Merge Base)",
      "The local hard drive root directory",
      "The primary database password"
    ],
    answer: 1,
    explanation: "`$BASE` provides the common ancestor state, allowing visual tools to show what the code looked like before either branch diverged."
  },
  {
    id: 4,
    question: "What does the `$MERGED` variable represent in `git mergetool`?",
    options: [
      "The working tree file where the user's final resolved content is saved",
      "A backup file that is deleted upon reboot",
      "The commit hash of the merge",
      "The list of author names"
    ],
    answer: 0,
    explanation: "`$MERGED` is the actual file path in your working directory where the resolved output must be written and saved."
  },
  {
    id: 5,
    question: "Why should developers configure `git config --global mergetool.keepBackup false`?",
    options: [
      "To free up space on GitHub servers",
      "To prevent Git from cluttering the working directory with `*.orig` backup files after resolving conflicts",
      "To disable Git's internal commit history",
      "To speed up internet download speed"
    ],
    answer: 1,
    explanation: "By default, Git saves a `file.js.orig` backup before running mergetool. Setting `keepBackup false` avoids cluttering your repository with unwanted `.orig` files."
  },
  {
    id: 6,
    question: "Which command configures Visual Studio Code as your default merge tool?",
    options: [
      "git config --global merge.tool vscode",
      "git config --set editor vscode",
      "git install vscode-merge",
      "git use code"
    ],
    answer: 0,
    explanation: "`git config --global merge.tool vscode` tells Git to use the VS Code configuration when `git mergetool` is invoked."
  },
  {
    id: 7,
    question: "What command disables the interactive confirmation prompt ('Hit return to start merge tool') when running `git mergetool`?",
    options: [
      "git config --global mergetool.prompt false",
      "git config --global prompt.disable true",
      "git merge --no-confirm",
      "git config mergetool.autoOpen true"
    ],
    answer: 0,
    explanation: "Setting `mergetool.prompt false` causes Git to immediately launch the graphical tool for each conflicted file without asking for enter/return confirmation."
  },
  {
    id: 8,
    question: "In the modern VS Code 3-way merge editor, where is the resulting resolved code displayed?",
    options: [
      "In a popup terminal window",
      "In the bottom pane labeled 'Result'",
      "In the left sidebar under Source Control only",
      "In an external browser tab"
    ],
    answer: 1,
    explanation: "VS Code displays 'Incoming' and 'Current' changes in side-by-side top panes and provides a live editable 'Result' pane at the bottom."
  },
  {
    id: 9,
    question: "Which of the following is a popular open-source 3-way visual diff and merge tool commonly used on Linux and Windows?",
    options: [
      "Meld",
      "WinZip",
      "Apache Tomcat",
      "Postman"
    ],
    answer: 0,
    explanation: "Meld is a widely used open-source visual diff and merge tool supported across Linux, Windows, and macOS."
  },
  {
    id: 10,
    question: "What is KDiff3 particularly famous for in merge conflict resolution?",
    options: [
      "Deleting files automatically",
      "Precise character-by-character difference highlighting and automated conflict resolution heuristics",
      "Hosting Git repositories online",
      "Running Kubernetes clusters"
    ],
    answer: 1,
    explanation: "KDiff3 is renowned for granular character-level diff highlighting and robust 3-way auto-merge capabilities."
  },
  {
    id: 11,
    question: "If there are 5 conflicted files and you run `git mergetool`, what does Git do as you save and close each file?",
    options: [
      "Aborts after the first file",
      "Sequentially opens the next conflicted file in the visual tool until all 5 are resolved",
      "Stages all 5 files immediately without opening",
      "Crashes the terminal"
    ],
    answer: 1,
    explanation: "`git mergetool` iterates through all unmerged paths one by one, launching the GUI editor for each until none remain."
  },
  {
    id: 12,
    question: "After resolving all files in a visual merge tool, what command must you execute to seal the merge?",
    options: [
      "git commit",
      "git branch -m",
      "git reset --hard",
      "git init"
    ],
    answer: 0,
    explanation: "Once all files are saved and staged, running `git commit` creates the official merge commit."
  },
  {
    id: 13,
    question: "What does the `--wait` flag in `code --wait --merge ...` do?",
    options: [
      "Causes Git to wait until the developer closes the VS Code merge tab before proceeding to the next file or command",
      "Delays opening VS Code for 60 seconds",
      "Slows down Git commit hashing",
      "Pauses background download tasks"
    ],
    answer: 0,
    explanation: "`--wait` blocks the calling Git process until the user finishes editing and closes the editor tab."
  },
  {
    id: 14,
    question: "What is the difference between `git difftool` and `git mergetool`?",
    options: [
      "`git difftool` is for comparing files read-only; `git mergetool` is specifically for resolving 3-way merge conflicts interactively",
      "`git difftool` only works on Python files",
      "`git mergetool` is deprecated",
      "There is no difference"
    ],
    answer: 0,
    explanation: "`difftool` inspects differences without modifying files, whereas `mergetool` is designed to edit and resolve active merge conflicts."
  },
  {
    id: 15,
    question: "How can you tell `git mergetool` to only open a specific conflicted file instead of all files?",
    options: [
      "git mergetool src/payroll.js",
      "git mergetool --file-only",
      "git open src/payroll.js",
      "git mergetool -1"
    ],
    answer: 0,
    explanation: "Passing the path (e.g. `git mergetool src/payroll.js`) limits the tool to just that designated file."
  },
  {
    id: 16,
    question: "In Coder & AccoTax's lab, what command did Sukanta Sir provide to inspect which merge tool is currently configured?",
    options: [
      "git config merge.tool",
      "git which mergetool",
      "git tool --list",
      "git status --tool"
    ],
    answer: 0,
    explanation: "`git config merge.tool` returns the identifier (e.g. `vscode`, `meld`, `kdiff3`) of the active merge tool."
  },
  {
    id: 17,
    question: "What happens if `git mergetool` is invoked but no external merge tool is configured in gitconfig?",
    options: [
      "Git crashes permanently",
      "Git attempts to find installed tools on the system (like vimdiff, meld, kdiff3) and prompts you to select one",
      "Git deletes the conflicted files",
      "Git fast-forwards automatically"
    ],
    answer: 1,
    explanation: "Git has a built-in discovery list and will offer to launch available fallback tools like vimdiff or meld."
  },
  {
    id: 18,
    question: "Why is the built-in terminal editor `vimdiff` useful for servers without graphical desktop environments?",
    options: [
      "It requires zero GUI / X11 display forwarding and runs entirely within SSH terminal sessions",
      "It generates animated 3D graphics",
      "It has built-in AI completion",
      "It bypasses Git merge algorithms"
    ],
    answer: 0,
    explanation: "`vimdiff` provides split-pane 3-way merge capabilities directly inside CLI terminal windows over headless SSH connections."
  },
  {
    id: 19,
    question: "If a developer makes a mistake inside a visual merge tool and wants to restart the merge tool for that file from scratch, what can they do?",
    options: [
      "Run `git checkout -m <file>` to regenerate raw conflict markers and run `git mergetool` again",
      "Reinstall the operating system",
      "Delete the repository",
      "Switch to Subversion"
    ],
    answer: 0,
    explanation: "`git checkout -m <file>` reconstructs the conflicted state in the working tree from the index stages."
  },
  {
    id: 20,
    question: "What does the 'Accept Combination' or 'Smart Merge' feature in modern GUI merge tools do?",
    options: [
      "Intelligently places both current and incoming blocks in sequence or calculates non-conflicting sub-blocks",
      "Randomly chooses lines",
      "Sends the code to a remote review server",
      "Renames variables to uppercase"
    ],
    answer: 0,
    explanation: "Smart combinations allow incorporating both branches' contributions without manual copy-pasting."
  },
  {
    id: 21,
    question: "Can `git mergetool` be used during an interactive rebase conflict?",
    options: [
      "Yes, `git mergetool` works identically during merge conflicts and rebase conflicts",
      "No, only during standard git merge",
      "Only if rebasing on GitHub",
      "Only for fast-forward merges"
    ],
    answer: 0,
    explanation: "`git mergetool` operates on any active unmerged index state, whether caused by `git merge`, `git rebase`, `git cherry-pick`, or `git revert`."
  },
  {
    id: 22,
    question: "What happens to the `.orig` files if `mergetool.keepBackup` was accidentally set to `true`?",
    options: [
      "Git creates files like `payroll.js.orig` in the directory; you can remove them with `git clean -f` or deleting them manually",
      "They become hidden root commits",
      "They are automatically pushed to production",
      "They lock the repository from future edits"
    ],
    answer: 0,
    explanation: "`.orig` backup files are untracked artifacts created by mergetool; they can be safely removed manually or via `git clean -f`."
  },
  {
    id: 23,
    question: "Which command shows all supported built-in merge tools recognized by Git?",
    options: [
      "git mergetool --tool-help",
      "git list tools",
      "git help merge-tools",
      "git tools --all"
    ],
    answer: 0,
    explanation: "`git mergetool --tool-help` lists all tools known to Git and indicates which ones are currently installed and available on your system."
  },
  {
    id: 24,
    question: "In Coder & AccoTax rate card merge, how did Sachin and Susmita resolve the hourly consulting rate in the visual merge editor?",
    options: [
      "By keeping both: standardConsultingHour = 2000 INR and premiumConsultingHour = 3500 INR",
      "By setting rate to 0 INR",
      "By deleting the JSON file",
      "By refusing to bill clients"
    ],
    answer: 0,
    explanation: "They synthesized both requirements into distinct key-value attributes within the rate card configuration."
  },
  {
    id: 25,
    question: "What is the key takeaway regarding visual merge tools taught by Sukanta Sir?",
    options: [
      "Visual tools provide clarity and speed for complex multi-line conflicts, but understanding raw CLI mechanics and conflict anatomy remains essential foundational knowledge",
      "Never use GUI tools under any circumstances",
      "GUIs always introduce bugs into Git commits",
      "Only senior architects are allowed to use VS Code"
    ],
    answer: 0,
    explanation: "Sukanta Sir emphasizes that while visual editors enhance productivity, deep knowledge of Git's index stages and raw conflict markers guarantees full technical mastery."
  }
];

export default questions;
