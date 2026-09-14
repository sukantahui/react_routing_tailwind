/**
 * Topic 9 FAQ Dataset: Configuration Scope Hierarchy
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "What is the precedence order of Git configuration scopes from lowest to highest priority?",
    shortAnswer: "1. System (`--system`) -> 2. Global (`--global`) -> 3. Local (`--local`) -> 4. Worktree (`--worktree`) -> 5. Environment Variables.",
    explanation: "If a setting is defined at multiple levels, Git uses the most specific level. For example, a `user.email` defined in `.git/config` (local) always overrides `~/.gitconfig` (global).",
    hint: "System < Global < Local < Worktree < Env Variables.",
    level: "basic",
    codeExample: "# Local config overrides global config:\ngit config --local user.email \"work@corp.com\""
  },
  {
    question: "What is the default scope when you run `git config <key> <value>` inside a repository without flags?",
    shortAnswer: "The Local scope (`--local`), which writes directly to `.git/config` of the active repository.",
    explanation: "If you are inside a Git repository, omitting `--global` or `--system` automatically targets the local repository config.",
    hint: "Default is `--local` when inside a repository.",
    level: "basic",
    codeExample: "# These two commands are identical when inside a repo:\ngit config user.name \"Sukanta\"\ngit config --local user.name \"Sukanta\""
  },
  {
    question: "Where is the System configuration file stored on Linux, macOS, and Windows?",
    shortAnswer: "`/etc/gitconfig` on Linux and macOS; `C:\\Program Files\\Git\\etc\\gitconfig` on Windows.",
    explanation: "System config affects all user accounts on the entire computer. Editing it requires Administrator / root privileges.",
    hint: "`/etc/gitconfig`.",
    level: "basic",
    codeExample: "# Edit system config on Linux:\nsudo git config --system core.autocrlf input"
  },
  {
    question: "Where is the Global configuration file stored on disk?",
    shortAnswer: "`~/.gitconfig` (or `~/.config/git/config` adhering to XDG standards).",
    explanation: "This file belongs exclusively to the logged-in user and contains personal settings across all repositories on that user's account.",
    hint: "`~/.gitconfig` in user home directory.",
    level: "basic",
    codeExample: "# Global config location:\ncat ~/.gitconfig"
  },
  {
    question: "Where is the Local configuration file stored on disk?",
    shortAnswer: "Inside the repository's `.git/config` file.",
    explanation: "This file is specific to one individual project folder. When you delete the project or clone a fresh copy, local settings are not shared globally.",
    hint: "`.git/config` inside repository root.",
    level: "basic",
    codeExample: "# Local config file location:\ncat .git/config"
  },
  {
    question: "What is the Worktree scope (`--worktree`) in Git configuration?",
    shortAnswer: "A scope that applies to an individual linked worktree folder when using `git worktree add` for simultaneous branch development.",
    explanation: "Introduced in Git 2.20+, enabling `extensions.worktreeConfig` allows multiple linked worktrees of the same repository to maintain separate branch or sparse-checkout configs in `.git/config.worktree`.",
    hint: "Worktree-specific configuration.",
    level: "advanced",
    codeExample: "# Enable worktree config extension:\ngit config extensions.worktreeConfig true\ngit config --worktree user.name \"Sukanta (Feature Worktree)\""
  },
  {
    question: "How do environment variables like `GIT_AUTHOR_EMAIL` interact with the configuration hierarchy?",
    shortAnswer: "Environment variables take absolute precedence, overriding local, global, and system configuration files.",
    explanation: "When Git resolves author information, it checks `GIT_AUTHOR_NAME` and `GIT_AUTHOR_EMAIL` first. If present, it ignores all `.gitconfig` files.",
    hint: "Environment variables have the highest priority.",
    level: "advanced",
    codeExample: "# Run a commit with ad-hoc environment override:\nGIT_AUTHOR_EMAIL=\"bot@ci.com\" git commit -m \"automated build\""
  },
  {
    question: "How do you trace which configuration file set a specific property?",
    shortAnswer: "Run `git config --list --show-origin`.",
    explanation: "The `--show-origin` option prints the exact URI (e.g. `file:/home/user/.gitconfig` or `file:.git/config`) alongside every key-value pair.",
    hint: "`--show-origin` flag.",
    level: "basic",
    codeExample: "# Trace config origin:\ngit config --list --show-origin | grep user"
  },
  {
    question: "What is the `includeIf` conditional configuration feature in `~/.gitconfig`?",
    shortAnswer: "A feature that dynamically includes different config files based on the filesystem path of the repository.",
    explanation: "You can keep personal open-source projects in `~/personal/` and corporate client work in `~/work/`. Using `[includeIf \"gitdir:~/work/\"] path = ~/.gitconfig-work`, Git automatically switches emails based on folder location!",
    hint: "Conditional config loading based on `gitdir:` path.",
    level: "advanced",
    codeExample: "# Inside ~/.gitconfig:\n[includeIf \"gitdir:~/work/\"]\n  path = ~/.gitconfig-work"
  },
  {
    question: "How do you view only the configuration keys defined at a specific scope?",
    shortAnswer: "Combine the scope flag with `--list`, e.g. `git config --global --list` or `git config --local --list`.",
    explanation: "This filters out inherited defaults and displays only the key-value pairs stored in that designated file.",
    hint: "`git config --<scope> --list`.",
    level: "basic",
    codeExample: "# View only local repository keys:\ngit config --local --list"
  },
  {
    question: "How do you remove a setting from the local config without affecting the global default?",
    shortAnswer: "Run `git config --local --unset <key>` inside the repository.",
    explanation: "This deletes the key from `.git/config`, causing Git to cleanly fall back to the value defined in `~/.gitconfig`.",
    hint: "`git config --local --unset <key>`.",
    level: "basic",
    codeExample: "# Remove local override:\ngit config --local --unset user.email"
  },
  {
    question: "Can multiple values exist for the same configuration key?",
    shortAnswer: "Yes, Git supports multi-valued keys (e.g. `remote.origin.fetch` or multiple `include` paths).",
    explanation: "To add multiple values without overwriting existing ones, use `git config --add <key> <value>`. To retrieve all values, use `git config --get-all <key>`.",
    hint: "Multi-valued keys with `--add` and `--get-all`.",
    level: "intermediate",
    codeExample: "# Get all fetch refspecs for origin:\ngit config --get-all remote.origin.fetch"
  },
  {
    question: "What happens if a setting is defined in both `~/.gitconfig` and `~/.config/git/config`?",
    shortAnswer: "`~/.gitconfig` takes precedence because legacy explicit home files are read after XDG config files.",
    explanation: "Git reads the XDG config path first, then `~/.gitconfig`. Values in `~/.gitconfig` overwrite earlier definitions.",
    hint: "`~/.gitconfig` overrides XDG `~/.config/git/config`.",
    level: "advanced",
    codeExample: "# XDG standard config path:\n~/.config/git/config"
  },
  {
    question: "What is `GIT_CONFIG_GLOBAL` environment variable?",
    shortAnswer: "An environment variable that forces Git to use a custom file path instead of `~/.gitconfig`.",
    explanation: "Useful in testing environments and CI/CD pipelines to provide a clean, isolated global configuration.",
    hint: "`GIT_CONFIG_GLOBAL` path override.",
    level: "advanced",
    codeExample: "# Run Git with isolated temporary global config:\nGIT_CONFIG_GLOBAL=/tmp/custom_gitconfig git status"
  },
  {
    question: "What is `GIT_CONFIG_NOSYSTEM` environment variable?",
    shortAnswer: "An environment variable that tells Git to skip reading `/etc/gitconfig` entirely.",
    explanation: "Setting `GIT_CONFIG_NOSYSTEM=1` guarantees that no host machine system-wide defaults interfere with automated test suites or sandbox runs.",
    hint: "Bypasses system `/etc/gitconfig`.",
    level: "advanced",
    codeExample: "# Disable system config:\nGIT_CONFIG_NOSYSTEM=1 git config --list"
  },
  {
    question: "How does Git handle boolean configuration values?",
    shortAnswer: "Git accepts `true`, `yes`, `on`, `1` as true; and `false`, `no`, `off`, `0` as false.",
    explanation: "Git's parser is flexible, allowing developers to write `core.autocrlf = true` or `core.autocrlf = 1` interchangeably.",
    hint: "True/Yes/On/1 vs False/No/Off/0.",
    level: "basic",
    codeExample: "# Both are identical:\ngit config --global color.ui true\ngit config --global color.ui 1"
  },
  {
    question: "How do you edit a custom configuration file directly using `git config`?",
    shortAnswer: "Use `git config --file <path> <key> <value>` (or `-f <path>`).",
    explanation: "This allows reading or writing settings to arbitrary INI configuration files (e.g. `.gitmodules` or `.gitattributes`).",
    hint: "`--file <path>` flag.",
    level: "intermediate",
    codeExample: "# Edit submodules config directly:\ngit config --file .gitmodules submodule.ui.branch main"
  },
  {
    question: "What section headers are standard inside Git configuration files?",
    shortAnswer: "`[user]`, `[core]`, `[init]`, `[color]`, `[alias]`, `[remote \"origin\"]`, `[branch \"main\"]`, and `[diff]`.",
    explanation: "Git uses standard INI section syntax with brackets, supporting sub-section names in quotes for remotes and branches.",
    hint: "INI section syntax: `[section \"subsection\"]`.",
    level: "intermediate",
    codeExample: "# Sample INI section in .git/config:\n[branch \"main\"]\n  remote = origin\n  merge = refs/heads/main"
  },
  {
    question: "How do you get the integer value of a config property in shell scripts?",
    shortAnswer: "Use `git config --int <key>` or `git config --type=int <key>`.",
    explanation: "Git normalizes formatted values (e.g. `1k`, `1m`, `1g`) into standard integer byte counts automatically.",
    hint: "`--type=int`.",
    level: "advanced",
    codeExample: "# Query integer value:\ngit config --type=int core.bigFileThreshold"
  },
  {
    question: "How do you get boolean values normalized to 'true' or 'false' in bash scripts?",
    shortAnswer: "Use `git config --bool <key>` or `git config --type=bool <key>`.",
    explanation: "Normalizes `1`, `yes`, `on` to canonical `true` string for safe bash comparisons.",
    hint: "`--type=bool`.",
    level: "advanced",
    codeExample: "# In shell script:\nif [ \"$(git config --bool core.autocrlf)\" = \"true\" ]; then echo \"CRLF Active\"; fi"
  },
  {
    question: "Why should developers NEVER commit `.git/config` to remote repositories?",
    shortAnswer: "`.git/config` is part of the local `.git` administrative folder and is not a tracked file; repository tracking is for source code.",
    explanation: "Local configs often contain sensitive developer-specific paths, private tokens in remote URLs, or local hooks that should never be published.",
    hint: "`.git/config` is private local metadata.",
    level: "basic",
    codeExample: "# `.git` folder is ignored by repository commit trees."
  },
  {
    question: "How does the `core.sharedRepository` setting work in group enterprise environments?",
    shortAnswer: "It configures POSIX file permission masks (umask) on `.git/objects` so multiple developers in the same Linux group can write to a shared repository.",
    explanation: "Used on shared Linux servers where developers share a group (e.g. `developers`) and push via local filesystem access.",
    hint: "Group permissions on shared server repos (`core.sharedRepository = group`).",
    level: "advanced",
    codeExample: "# Enable group write permissions on bare repo:\ngit config core.sharedRepository group"
  },
  {
    question: "How do you rename a configuration section in `git config`?",
    shortAnswer: "Use `git config --rename-section <old-name> <new-name>`.",
    explanation: "Commonly used by Git internally when renaming remotes (`git remote rename origin upstream`).",
    hint: "`--rename-section`.",
    level: "intermediate",
    codeExample: "# Rename config section:\ngit config --rename-section branch.oldname branch.newname"
  },
  {
    question: "How do you delete an entire configuration section?",
    shortAnswer: "Use `git config --remove-section <section-name>`.",
    explanation: "Removes all keys inside the specified section in one command.",
    hint: "`--remove-section`.",
    level: "intermediate",
    codeExample: "# Delete remote config section:\ngit config --remove-section remote.oldorigin"
  },
  {
    question: "What is the single golden rule of Git configuration hierarchy?",
    shortAnswer: "Specific local settings always override broader global and system settings, giving developers complete granular control per project.",
    explanation: "Mastering the hierarchy ensures you never send the wrong email to a client, while keeping your personal preferences consistent across your entire operating system.",
    hint: "Local overrides Global overrides System.",
    level: "basic",
    codeExample: "# Local > Global > System."
  }
];

export default questions;
