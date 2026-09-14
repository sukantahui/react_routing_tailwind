/**
 * Topic 13 Questions: Hands-on Terminal Lab: Complete environment setup, verification, and default editor configuration
 * Total Questions: 25 (MCQ + Lab Troubleshooting + CLI Commands)
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "Which command correctly configures VS Code as the default Git editor and forces Git to wait until the commit message file is closed?",
    options: [
      "git config --global core.editor 'code --wait'",
      "git config --global editor.code true",
      "git set-editor vscode",
      "git config editor 'code -n'"
    ],
    answer: "git config --global core.editor 'code --wait'",
    explanation: "The '--wait' argument instructs VS Code to hold the terminal process open until you close the active commit message tab, allowing Git to capture the message."
  },
  {
    id: 2,
    question: "What happens if you configure 'core.editor = code' without the '--wait' flag when running 'git commit'?",
    options: [
      "Git will crash immediately",
      "VS Code opens the commit file and Git immediately completes the commit with an empty message or aborts before you can type anything",
      "Git switches back to Vim automatically",
      "VS Code freezes"
    ],
    answer: "VS Code opens the commit file and Git immediately completes the commit with an empty message or aborts before you can type anything",
    explanation: "Without '--wait', the 'code' command immediately returns control to the shell, causing Git to assume the file was left empty and aborting the commit."
  },
  {
    id: 3,
    question: "Which command sets the default branch name to 'main' for all future repositories created with 'git init'?",
    options: [
      "git config --global init.defaultBranch main",
      "git branch --default-name main",
      "git config branch.main default",
      "git rename-master main"
    ],
    answer: "git config --global init.defaultBranch main",
    explanation: "'init.defaultBranch main' configures Git to create new repositories with 'main' as the default branch instead of the legacy 'master'."
  },
  {
    id: 4,
    question: "On Windows workstations, what is the recommended setting for 'core.autocrlf'?",
    options: [
      "true",
      "false",
      "input",
      "none"
    ],
    answer: "true",
    explanation: "'core.autocrlf = true' converts CRLF to LF on commit and converts LF back to CRLF on checkout, standardizing Windows repositories for cross-platform safety."
  },
  {
    id: 5,
    question: "On macOS or Linux workstations, what is the recommended setting for 'core.autocrlf'?",
    options: [
      "input",
      "true",
      "crlf",
      "auto"
    ],
    answer: "input",
    explanation: "'core.autocrlf = input' ensures that any accidental CRLF endings are converted to LF on commit, while keeping checked-out files with native Unix LF endings."
  },
  {
    id: 6,
    question: "Which command creates a short alias 'git st' for 'git status'?",
    options: [
      "git config --global alias.st status",
      "git alias st=status",
      "alias gitst='git status'",
      "git config --shortcut st status"
    ],
    answer: "git config --global alias.st status",
    explanation: "Git aliases are created under the 'alias.<name>' configuration namespace."
  },
  {
    id: 7,
    question: "Which command creates an alias 'git lg' to render a beautiful one-line graph of all commits?",
    options: [
      "git config --global alias.lg \"log --oneline --graph --all --decorate\"",
      "git config --global alias.lg \"graph --all\"",
      "git config alias.graph lg",
      "git alias tree='git log'"
    ],
    answer: "git config --global alias.lg \"log --oneline --graph --all --decorate\"",
    explanation: "Defining 'alias.lg' bundles comprehensive log visualization flags into a quick 2-letter command."
  },
  {
    id: 8,
    question: "What is the primary command to verify that your global user name was successfully recorded?",
    options: [
      "git config --global user.name",
      "git show user",
      "git whoami",
      "git check user.name"
    ],
    answer: "git config --global user.name",
    explanation: "Running 'git config --global user.name' outputs the registered author name."
  },
  {
    id: 9,
    question: "If 'git commit' fails with 'fatal: empty ident name (for <>) not allowed', what configuration step was omitted?",
    options: [
      "Setting user.name and/or user.email via 'git config --global'",
      "Installing Python",
      "Creating an SSH key",
      "Running git push"
    ],
    answer: "Setting user.name and/or user.email via 'git config --global'",
    explanation: "Git strictly requires an author identity (name and email) before it can create any commit object."
  },
  {
    id: 10,
    question: "Which command enables colorful CLI output across diffs, branches, and status reports?",
    options: [
      "git config --global color.ui auto",
      "git color --enable",
      "git config color true",
      "git ui --rainbow"
    ],
    answer: "git config --global color.ui auto",
    explanation: "'color.ui = auto' tells Git to output colored ANSI escape sequences whenever output is sent to a terminal."
  },
  {
    id: 11,
    question: "How can you test if your default editor configuration is working without making a fake commit?",
    options: [
      "git config --global --edit",
      "git test-editor",
      "git open-editor",
      "git editor --verify"
    ],
    answer: "git config --global --edit",
    explanation: "'git config --global --edit' attempts to open ~/.gitconfig in the configured core.editor, immediately proving if the editor launch succeeds."
  },
  {
    id: 12,
    question: "When configuring Git on a shared multi-user server, why should you use '--global' instead of '--system'?",
    options: [
      "'--global' scopes your settings to your private user directory (~/.gitconfig) without altering settings for other users on the machine",
      "'--global' is faster than '--system'",
      "'--system' requires internet access",
      "'--global' encrypts the files"
    ],
    answer: "'--global' scopes your settings to your private user directory (~/.gitconfig) without altering settings for other users on the machine",
    explanation: "Global scope is isolated to the logged-in user's home folder, respecting multi-user security."
  },
  {
    id: 13,
    question: "What is the command to verify which Git binary is currently being executed by your shell?",
    options: [
      "which git (on Unix/macOS/Git Bash) or where.exe git (on Windows CMD/PowerShell)",
      "git location",
      "git find-binary",
      "git path --verify"
    ],
    answer: "which git (on Unix/macOS/Git Bash) or where.exe git (on Windows CMD/PowerShell)",
    explanation: "The shell utilities 'which' or 'where.exe' identify the absolute path of the executable located in your system PATH environment variable."
  },
  {
    id: 14,
    question: "What does setting 'pull.rebase = false' globally do?",
    options: [
      "Sets the standard merge commit strategy as the default behavior when running 'git pull'",
      "Disables all git pull operations",
      "Deletes remote branches automatically",
      "Forces fast-forward merges only"
    ],
    answer: "Sets the standard merge commit strategy as the default behavior when running 'git pull'",
    explanation: "In modern Git, specifying pull.rebase (false for standard merge, true for rebase) silences ambiguous pull warnings."
  },
  {
    id: 15,
    question: "Which command removes an erroneously entered alias 'alias.ci'?",
    options: [
      "git config --global --unset alias.ci",
      "git alias --delete ci",
      "git remove-alias ci",
      "git unalias ci"
    ],
    answer: "git config --global --unset alias.ci",
    explanation: "The '--unset' flag cleanly deletes configuration keys."
  },
  {
    id: 16,
    question: "If a user wants Nano as their Git editor, which command should they run?",
    options: [
      "git config --global core.editor nano",
      "git set-nano",
      "git config nano --default",
      "git editor nano"
    ],
    answer: "git config --global core.editor nano",
    explanation: "'core.editor nano' configures the lightweight terminal text editor Nano."
  },
  {
    id: 17,
    question: "If a user wants Vim as their Git editor, which command should they run?",
    options: [
      "git config --global core.editor vim",
      "git set-vim",
      "git config vim --global",
      "git vim true"
    ],
    answer: "git config --global core.editor vim",
    explanation: "'core.editor vim' configures Vim as the default commit message editor."
  },
  {
    id: 18,
    question: "Which command prints all active global configuration keys and values only?",
    options: [
      "git config --global --list",
      "git show --global",
      "git global-config",
      "git config-list global"
    ],
    answer: "git config --global --list",
    explanation: "Combining '--global' and '--list' filters output strictly to the ~/.gitconfig file."
  },
  {
    id: 19,
    question: "What does the exit code 0 of a bash test script checking 'git --version' indicate?",
    options: [
      "Git is installed and successfully executable on the system PATH",
      "Git is missing",
      "The system must be rebooted",
      "Git version is 0.0"
    ],
    answer: "Git is installed and successfully executable on the system PATH",
    explanation: "A return code of 0 in POSIX shells represents successful command execution."
  },
  {
    id: 20,
    question: "What should you check if 'code --wait' fails with 'code: command not found'?",
    options: [
      "Open VS Code, press Ctrl+Shift+P / Cmd+Shift+P, and select 'Shell Command: Install 'code' command in PATH'",
      "Reinstall Windows",
      "Uninstall Git",
      "Switch to Python"
    ],
    answer: "Open VS Code, press Ctrl+Shift+P / Cmd+Shift+P, and select 'Shell Command: Install 'code' command in PATH'",
    explanation: "VS Code includes a command palette action to register its CLI executable into the operating system PATH environment."
  },
  {
    id: 21,
    question: "What does 'git config --get-regexp' do during environment verification scripts?",
    options: [
      "It queries multiple configuration keys matching a regex pattern, ideal for automated test assertions in CI/CD and lab scripts",
      "It modifies regular expressions in code files",
      "It compresses regex strings",
      "It deletes configuration keys"
    ],
    answer: "It queries multiple configuration keys matching a regex pattern, ideal for automated test assertions in CI/CD and lab scripts",
    explanation: "'git config --get-regexp' matches keys using regular expressions, facilitating scriptable config audits."
  },
  {
    id: 22,
    question: "True or False: Configuring 'user.name' and 'user.email' automatically authenticates you with GitHub.",
    options: [
      "True",
      "False"
    ],
    answer: "False",
    explanation: "user.name and user.email are purely metadata author stamps embedded in commit objects. Authentication requires SSH keys or Personal Access Tokens (PAT)."
  },
  {
    id: 23,
    question: "Why should developers avoid putting passwords or tokens in 'user.name' or 'user.email'?",
    options: [
      "Because commit metadata is public and permanently recorded in plain text in the Git object history",
      "Because Git will hash passwords incorrectly",
      "Because the keyboard will lock",
      "Because GitHub forbids passwords"
    ],
    answer: "Because commit metadata is public and permanently recorded in plain text in the Git object history",
    explanation: "Commit author data is baked into immutable commit objects and exposed publicly to anyone with read access to the repository."
  },
  {
    id: 24,
    question: "Which command shows the entire configuration cascade including the file origins in a single readable command?",
    options: [
      "git config --list --show-origin",
      "git origin-all",
      "git config-map",
      "git inspect"
    ],
    answer: "git config --list --show-origin",
    explanation: "This is the universal diagnostic command for auditing all active configurations."
  },
  {
    id: 25,
    question: "What is the ultimate benefit of executing a complete environment setup script when onboarding a new machine?",
    options: [
      "It eliminates human error, standardizes repository defaults, ensures line-ending safety, and ensures immediate readiness for production commits",
      "It downloads 100 GB of games",
      "It speeds up CPU clock frequency",
      "It updates the BIOS"
    ],
    answer: "It eliminates human error, standardizes repository defaults, ensures line-ending safety, and ensures immediate readiness for production commits",
    explanation: "Automated setup guarantees consistent, collision-free, professional development environments across machines."
  }
];

export default questions;
