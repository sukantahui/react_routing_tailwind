/**
 * Topic 7 FAQ Dataset: Essential Git Preferences (core.editor, init.defaultBranch, color.ui)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "Why should you configure `init.defaultBranch main` globally?",
    shortAnswer: "To ensure that newly initialized repositories automatically use 'main' as their primary branch instead of the legacy 'master'.",
    explanation: "In 2020, Git version 2.28 introduced `init.defaultBranch` to align Git with GitHub, GitLab, and the broader tech industry which standardized on `main` as the universal default branch name.",
    hint: "Setting default initial branch to 'main'.",
    level: "basic",
    codeExample: "# Set default initial branch name globally:\ngit config --global init.defaultBranch main"
  },
  {
    question: "Why is the `--wait` flag mandatory when configuring VS Code as your `core.editor`?",
    shortAnswer: "The `--wait` flag instructs VS Code to keep the terminal process blocked until you close the commit message tab in VS Code.",
    explanation: "Without `--wait`, running `git commit` or `git rebase -i` would launch VS Code in the background and Git would immediately assume an empty message, causing the commit to abort.",
    hint: "Blocks Git from completing until the editor tab is closed.",
    level: "basic",
    codeExample: "# Configure VS Code with wait flag:\ngit config --global core.editor \"code --wait\""
  },
  {
    question: "What does `color.ui auto` do in Git configuration?",
    shortAnswer: "It automatically enables terminal colors when output is sent to a terminal screen, and disables colors when piping to files or scripts.",
    explanation: "With `color.ui auto`, modified files show in red, staged files in green, and branches in cyan. When you pipe output (e.g. `git log | grep ...`), color codes are suppressed to avoid corrupting text streams.",
    hint: "Terminal color highlighting that adapts to pipelines.",
    level: "basic",
    codeExample: "# Enable smart terminal colorization:\ngit config --global color.ui auto"
  },
  {
    question: "How do you configure Notepad as your default Git editor on Windows?",
    shortAnswer: "Run `git config --global core.editor \"notepad\"`.",
    explanation: "This is a simple fallback for Windows users who prefer a basic GUI text editor for commit messages.",
    hint: "`core.editor notepad`.",
    level: "basic",
    codeExample: "# Configure Notepad:\ngit config --global core.editor \"notepad\""
  },
  {
    question: "How do you configure Nano or Vim as your Git editor?",
    shortAnswer: "Run `git config --global core.editor \"nano\"` or `git config --global core.editor \"vim\"`.",
    explanation: "Nano is user-friendly in the terminal; Vim is powerful and standard on Linux servers.",
    hint: "`core.editor nano` or `core.editor vim`.",
    level: "basic",
    codeExample: "# Configure terminal editors:\ngit config --global core.editor \"nano\"\n# Or for Vim:\ngit config --global core.editor \"vim\""
  },
  {
    question: "How do you rename an existing local branch from 'master' to 'main'?",
    shortAnswer: "Run `git branch -m master main` while on the branch, or `git branch -M main`.",
    explanation: "The `-m` (move/rename) flag renames the branch pointer file without modifying any commit objects in the database.",
    hint: "Use `git branch -m` to rename.",
    level: "basic",
    codeExample: "# Rename current branch to main:\ngit branch -M main"
  },
  {
    question: "What happens when you run `git config --global --edit`?",
    shortAnswer: "Git opens your `~/.gitconfig` file directly in your configured `core.editor`.",
    explanation: "This allows you to view and edit all global settings, aliases, and diff tool configurations in one place.",
    hint: "Opens `~/.gitconfig` in default editor.",
    level: "basic",
    codeExample: "# Open config in editor:\ngit config --global --edit"
  },
  {
    question: "What is the `diff.tool` and `merge.tool` configuration in Git?",
    shortAnswer: "Preferences that specify which visual visual comparison or 3-way merge conflict editor (e.g. VS Code, Beyond Compare, KDiff3) opens on `git difftool` and `git mergetool`.",
    explanation: "Setting visual tools allows developers to resolve complex multi-file merge conflicts in a side-by-side visual interface rather than manually parsing conflict markers in text.",
    hint: "Visual diff and merge tools (`vscode`, `vimdiff`, `meld`).",
    level: "intermediate",
    codeExample: "# Configure VS Code as visual diff and merge tool:\ngit config --global diff.tool vscode\ngit config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'\ngit config --global merge.tool vscode\ngit config --global mergetool.vscode.cmd 'code --wait $MERGED'"
  },
  {
    question: "What is `pull.rebase` configuration and why do many senior developers enable it?",
    shortAnswer: "It configures `git pull` to rebase your local commits on top of incoming changes instead of creating unnecessary merge commits.",
    explanation: "By setting `git config --global pull.rebase true`, your project history remains a clean, linear chain of commits without messy 'Merge branch main of github.com' clutter commits.",
    hint: "Linear history without merge commits on pull.",
    level: "intermediate",
    codeExample: "# Enable rebase on pull globally:\ngit config --global pull.rebase true"
  },
  {
    question: "What is `push.autoSetupRemote` introduced in Git 2.37+?",
    shortAnswer: "A setting that automatically sets the upstream tracking branch on your first `git push` without requiring `-u origin <branch>`.",
    explanation: "Normally, pushing a new branch requires `git push -u origin feature-x`. With `push.autoSetupRemote = true`, running a simple `git push` automatically creates and tracks the remote branch.",
    hint: "Automatic upstream tracking on push.",
    level: "intermediate",
    codeExample: "# Enable auto setup remote:\ngit config --global push.autoSetupRemote true"
  },
  {
    question: "What is the `rerere.enabled` setting in Git and what does 'rerere' stand for?",
    shortAnswer: "'Reuse Recorded Resolution' — Git automatically remembers and replays how you resolved merge conflicts in the past.",
    explanation: "If you frequently rebase long-lived branches, resolving the same conflict repeatedly is frustrating. Enabling `rerere` causes Git to cache conflict resolutions and auto-resolve identical conflicts next time.",
    hint: "Reuse Recorded Resolution for conflicts.",
    level: "advanced",
    codeExample: "# Enable reuse recorded resolution:\ngit config --global rerere.enabled true"
  },
  {
    question: "What is `core.pager` in Git configuration?",
    shortAnswer: "The terminal paging utility (default: `less`) used by Git to display long outputs from `git log` and `git diff` page-by-page.",
    explanation: "You can customize pager flags (e.g. `core.pager = 'less -RFX'`) or disable paging with `cat` if you prefer scrolling terminal output.",
    hint: "Terminal pagination tool (less / cat).",
    level: "intermediate",
    codeExample: "# Configure pager to keep terminal output on exit:\ngit config --global core.pager 'less -RFX'"
  },
  {
    question: "How do you configure custom Git command aliases to speed up typing?",
    shortAnswer: "Using `git config --global alias.<shortcut> <command>`.",
    explanation: "Aliases allow shortcuts like `git st` for `git status`, `git co` for `git checkout`, or creating rich graphical log shortcuts.",
    hint: "`alias.<name>` configuration.",
    level: "basic",
    codeExample: "# Popular developer aliases:\ngit config --global alias.st status\ngit config --global alias.br branch\ngit config --global alias.lg \"log --graph --oneline --all\""
  },
  {
    question: "What is `help.autocorrect` in Git configuration?",
    shortAnswer: "A setting that automatically executes the closest matching command if you make a minor typo (e.g. typing `git stats` instead of `git status`).",
    explanation: "If set to a number (deciseconds, e.g. `20` = 2.0s), Git warns you of the typo and automatically runs the corrected command after a 2-second delay.",
    hint: "Auto-correct typos in Git commands.",
    level: "intermediate",
    codeExample: "# Enable auto-correct with a 2-second delay:\ngit config --global help.autocorrect 20"
  },
  {
    question: "What is `core.quotepath` and why is it important for multilingual file names?",
    shortAnswer: "Controls whether Git escapes non-ASCII characters (like Bengali, Hindi, or emojis) in file paths using octal escape sequences.",
    explanation: "By setting `core.quotepath false`, filenames containing Bengali scripts or emojis display directly in terminal output rather than as `\\340\\246...` byte strings.",
    hint: "UTF-8 / Unicode file name rendering.",
    level: "intermediate",
    codeExample: "# Display Unicode / multilingual filenames directly:\ngit config --global core.quotepath false"
  },
  {
    question: "What is `branch.sort` introduced in modern Git?",
    shortAnswer: "A setting that sorts branch lists by most recently committed date rather than alphabetical order.",
    explanation: "Setting `git config --global branch.sort -committerdate` ensures that running `git branch` lists your most active, recent branches at the top.",
    hint: "Sort branches by committer date.",
    level: "intermediate",
    codeExample: "# Sort branches by recent activity:\ngit config --global branch.sort -committerdate"
  },
  {
    question: "What is `tag.sort` in Git configuration?",
    shortAnswer: "A setting that sorts release tags naturally by semantic version numbers (`version:refname`) rather than strict alphabetical order.",
    explanation: "Alphabetical sorting orders `v1.10.0` before `v1.2.0`. Setting `tag.sort = version:refname` correctly places `v1.2.0` before `v1.10.0`.",
    hint: "Semantic version tag sorting.",
    level: "intermediate",
    codeExample: "# Sort release tags by semantic versioning:\ngit config --global tag.sort version:refname"
  },
  {
    question: "What is `diff.algorithm` and why do developers choose `histogram`?",
    shortAnswer: "Specifies the diff generation algorithm; `histogram` produces vastly cleaner, more human-readable diffs than the default Myers algorithm.",
    explanation: "Histogram diff understands code structure better, especially when moving or refactoring large function blocks, making code reviews significantly clearer.",
    hint: "Diff algorithm (myers, minimal, patience, histogram).",
    level: "advanced",
    codeExample: "# Set modern histogram diff algorithm:\ngit config --global diff.algorithm histogram"
  },
  {
    question: "What is `merge.conflictstyle` and why is `zdiff3` recommended?",
    shortAnswer: "`zdiff3` (Zealous 3-Way Diff) displays the common ancestor base code inside conflict markers alongside the two conflicting branches.",
    explanation: "Standard conflict markers only show `<<<<<<< HEAD` and `>>>>>>> branch`. `zdiff3` adds `||||||| base`, showing you exactly what the code looked like before both branches changed it, making conflict resolution 10x easier.",
    hint: "Shows the common ancestor code inside conflict markers.",
    level: "advanced",
    codeExample: "# Enable 3-way conflict markers with ancestor code:\ngit config --global merge.conflictstyle zdiff3"
  },
  {
    question: "What is `status.showUntrackedFiles` in Git configuration?",
    shortAnswer: "Controls how untracked directories are listed in `git status` (e.g. `all` displays individual files inside untracked folders).",
    explanation: "Setting `status.showUntrackedFiles all` lists every untracked file explicitly rather than just the parent folder name.",
    hint: "Granular untracked file inspection.",
    level: "intermediate",
    codeExample: "# Show all untracked files inside directories:\ngit config --global status.showUntrackedFiles all"
  },
  {
    question: "How do you backup or export your complete Git configuration?",
    shortAnswer: "Copy your `~/.gitconfig` file or track it in a personal dotfiles repository on GitHub.",
    explanation: "Developers often maintain a public or private `dotfiles` Git repository to instantly sync their aliases, editor preferences, and shell configurations to new computers.",
    hint: "Sync `~/.gitconfig` via dotfiles repo.",
    level: "basic",
    codeExample: "# Backup global config:\ncp ~/.gitconfig ~/dotfiles/gitconfig"
  },
  {
    question: "How do you view only the keys set in the global config file without system or local defaults?",
    shortAnswer: "Run `git config --global --list`.",
    explanation: "Adding `--global` restricts the output exclusively to settings saved in `~/.gitconfig`.",
    hint: "Use `--global --list`.",
    level: "basic",
    codeExample: "# List global config only:\ngit config --global --list"
  },
  {
    question: "What happens if you run `git init` on an older Git version that doesn't know about `init.defaultBranch`?",
    shortAnswer: "Git defaults to 'master'; you can simply rename it with `git branch -m main` immediately after initialization.",
    explanation: "Renaming the branch updates the `.git/HEAD` reference to point to `refs/heads/main`.",
    hint: "Rename to main with `git branch -m main`.",
    level: "basic",
    codeExample: "# Initialize and rename:\ngit init\ngit branch -m main"
  },
  {
    question: "What is `commit.verbose` in Git configuration?",
    shortAnswer: "A setting that includes the full unified diff of staged changes inside the commit message editor as comments during `git commit`.",
    explanation: "Enabling `commit.verbose true` lets you review every line of code you are about to commit directly in VS Code while writing the commit message.",
    hint: "Shows staged diff inside the commit message editor.",
    level: "intermediate",
    codeExample: "# Enable verbose commit message editor:\ngit config --global commit.verbose true"
  },
  {
    question: "What is the recommended starter `.gitconfig` for every software engineer?",
    shortAnswer: "A configuration setting `user.name`, `user.email`, `init.defaultBranch main`, `core.editor 'code --wait'`, and `color.ui auto`.",
    explanation: "These core settings establish a clean, standardized, and modern development baseline across all projects.",
    hint: "Identity + Main + VS Code Editor + Color UI.",
    level: "basic",
    codeExample: "# The 5 Golden Starter Settings:\ngit config --global user.name \"Sukanta Hui\"\ngit config --global user.email \"sukanta@codernaccotax.co.in\"\ngit config --global init.defaultBranch main\ngit config --global core.editor \"code --wait\"\ngit config --global color.ui auto"
  }
];

export default questions;
