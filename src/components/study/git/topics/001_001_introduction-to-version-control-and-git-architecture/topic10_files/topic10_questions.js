/**
 * Topic 10 Questions: Inspecting Active Configuration: git config --list --show-origin
 * Total Questions: 25 (MCQ + Short Answer + Scenario-based)
 * Educator: Sukanta Hui (Barrackpore, Coder & AccoTax)
 */

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of adding the '--show-origin' flag to 'git config --list'?",
    options: [
      "It shows the GitHub remote origin URL for the repository",
      "It reveals the exact file path or origin where each configuration key-value pair is defined",
      "It reverts all configuration files to their original system defaults",
      "It displays the origin branch from which HEAD was created"
    ],
    answer: "It reveals the exact file path or origin where each configuration key-value pair is defined",
    explanation: "Introduced in Git 2.8, '--show-origin' prefixes each configuration entry with its origin (such as 'file:/home/user/.gitconfig' or 'file:.git/config'), helping developers pinpoint exactly where a setting is loaded from."
  },
  {
    id: 2,
    question: "If 'git config --list' displays two different values for 'user.email', which value will Git actually use during a commit?",
    options: [
      "The first value listed at the top of the output",
      "The value with the most characters",
      "The last (bottom-most) value listed, representing the most specific scope in the hierarchy",
      "Git throws a syntax error and halts the commit"
    ],
    answer: "The last (bottom-most) value listed, representing the most specific scope in the hierarchy",
    explanation: "Git evaluates configuration files from least specific (system) to most specific (local/worktree). The later values override earlier ones, so the last entry shown in '--list' is the active, winning value."
  },
  {
    id: 3,
    question: "Which command lists configuration origins specifically for the 'user.name' key?",
    options: [
      "git config --show-origin user.name",
      "git show user.name --origin",
      "git origin --get user.name",
      "git config --find-file user.name"
    ],
    answer: "git config --show-origin user.name",
    explanation: "Running 'git config --show-origin user.name' outputs the source file path followed by the resolved value for that specific key."
  },
  {
    id: 4,
    question: "When '--show-origin' outputs 'file:C:/Program Files/Git/etc/gitconfig', which configuration scope is being referenced?",
    options: [
      "Worktree Scope",
      "Local Repository Scope",
      "Global User Scope",
      "System Scope"
    ],
    answer: "System Scope",
    explanation: "The file 'etc/gitconfig' within the Git installation directory houses system-wide settings applicable to all users on that computer."
  },
  {
    id: 5,
    question: "What does 'git config --show-origin --get-all user.email' display?",
    options: [
      "Only the single winning email address",
      "All definitions of 'user.email' across system, global, and local files with their respective file origins",
      "All email addresses of past committers in the Git log",
      "An encrypted hash of the user email"
    ],
    answer: "All definitions of 'user.email' across system, global, and local files with their respective file origins",
    explanation: "Combining '--get-all' with '--show-origin' lists every location where that variable is declared across the configuration cascade."
  },
  {
    id: 6,
    question: "Which flag allows you to directly open the global Git configuration file in your configured default code editor?",
    options: [
      "git config --global --edit",
      "git config --open global",
      "git edit --global",
      "git config --global --modify"
    ],
    answer: "git config --global --edit",
    explanation: "The '--edit' (or '-e') flag opens the specified configuration file in the editor configured in 'core.editor' (or VISUAL/EDITOR environment variables)."
  },
  {
    id: 7,
    question: "When Sachin inspects config inside an uninitialized folder, what will 'git config --local --list' output?",
    options: [
      "The global configuration settings",
      "A fatal error: 'fatal: --local can only be used inside a git repository'",
      "An empty file",
      "The system default configuration"
    ],
    answer: "A fatal error: 'fatal: --local can only be used inside a git repository'",
    explanation: "Local configuration relies on the '.git/config' file. Outside of an active Git repository, Git cannot access local scope and returns a fatal error."
  },
  {
    id: 8,
    question: "What does an origin prefix of 'command line:' in 'git config --show-origin' indicate?",
    options: [
      "The setting was passed dynamically via the '-c' command-line flag during execution",
      "The setting was typed in bash history",
      "The setting was set by npm scripts",
      "The setting is loaded from Windows PowerShell profile"
    ],
    answer: "The setting was passed dynamically via the '-c' command-line flag during execution",
    explanation: "When running a command like 'git -c user.name=\"Temp\" commit', the temporary override origin is reported as 'command line:'."
  },
  {
    id: 9,
    question: "Which command searches for all configuration keys matching a regex pattern, such as all 'core' variables?",
    options: [
      "git config --get-regexp '^core\\.'",
      "git config --grep core",
      "git config --filter-pattern core",
      "git find --config core"
    ],
    answer: "git config --get-regexp '^core\\.'",
    explanation: "The '--get-regexp' flag allows querying keys and values using regular expressions."
  },
  {
    id: 10,
    question: "How can you remove an unwanted key 'alias.st' from your global configuration?",
    options: [
      "git config --global --unset alias.st",
      "git config --delete alias.st",
      "git config --global --remove alias.st",
      "git config --clean alias.st"
    ],
    answer: "git config --global --unset alias.st",
    explanation: "The '--unset' flag cleanly removes the specified key from the targeted configuration file."
  },
  {
    id: 11,
    question: "What is the role of the 'includeIf' directive in modern Git configuration files?",
    options: [
      "To ignore files conditionally based on file extension",
      "To conditionally include another configuration file based on directory paths or branch names",
      "To prevent Git from committing if certain conditions fail",
      "To auto-merge branches if build passes"
    ],
    answer: "To conditionally include another configuration file based on directory paths or branch names",
    explanation: "'[includeIf \"gitdir:~/work/\"]' allows Git to dynamically load work-specific configurations (like enterprise email and signing keys) only when inside matching directories."
  },
  {
    id: 12,
    question: "If Susmita sets 'user.email' in both ~/.gitconfig and .git/config, what does 'git config user.email' output when inside the repository?",
    options: [
      "The ~/.gitconfig (Global) email",
      "The .git/config (Local) email",
      "Both emails separated by a comma",
      "An undefined variable error"
    ],
    answer: "The .git/config (Local) email",
    explanation: "Local scope has higher precedence than global scope, overriding it within the repository."
  },
  {
    id: 13,
    question: "Which command lists configuration origins for the system level only?",
    options: [
      "git config --system --list --show-origin",
      "git config --origin system",
      "git show-origin --system",
      "git system-config --list"
    ],
    answer: "git config --system --list --show-origin",
    explanation: "Combining '--system', '--list', and '--show-origin' restricts output to system-level configuration while showing the exact file path."
  },
  {
    id: 14,
    question: "If a Git variable has multiple values in the same scope file (multivar), which command safely removes all of them?",
    options: [
      "git config --unset-all <key>",
      "git config --delete-multivar <key>",
      "git config --purge <key>",
      "git config --flush <key>"
    ],
    answer: "git config --unset-all <key>",
    explanation: "'--unset-all' removes all matching occurrences of a multi-valued configuration key."
  },
  {
    id: 15,
    question: "Which command shows the raw path of the global configuration file without reading its contents?",
    options: [
      "git config --global --path",
      "git config --global --list --show-origin | head -n 1",
      "echo ~/.gitconfig",
      "Both B and C are practical methods to determine global config file location"
    ],
    answer: "Both B and C are practical methods to determine global config file location",
    explanation: "Inspecting '~/.gitconfig' or filtering the first line of '--show-origin' quickly reveals the global configuration file path."
  },
  {
    id: 16,
    question: "True or False: 'git config --show-origin' requires internet connectivity to check origin URLs.",
    options: [
      "True",
      "False"
    ],
    answer: "False",
    explanation: "'origin' here refers to the local file system source file (where the config came from), not the remote repository named 'origin'."
  },
  {
    id: 17,
    question: "What happens if you run 'git config --get nonExistentKey' in the terminal?",
    options: [
      "Git crashes with a segmentation fault",
      "Git outputs nothing and exits with a non-zero exit status code (1)",
      "Git returns 'null'",
      "Git prompts you to enter a value for nonExistentKey"
    ],
    answer: "Git outputs nothing and exits with a non-zero exit status code (1)",
    explanation: "Git returns a status code of 1 when a requested key does not exist, enabling shell scripts to test for config existence."
  },
  {
    id: 18,
    question: "When Swadeep edits '.git/config' using a text editor, what format must the file strictly adhere to?",
    options: [
      "JSON with braces",
      "YAML with 2-space indentation",
      "INI-style configuration format with sections in brackets '[section]' and key = value pairs",
      "XML schema"
    ],
    answer: "INI-style configuration format with sections in brackets '[section]' and key = value pairs",
    explanation: "Git configuration files follow the standard INI file format with sections, optional subsections, and key-value pairs."
  },
  {
    id: 19,
    question: "Which command shows the origin of the configured credential helper?",
    options: [
      "git config --show-origin credential.helper",
      "git credential origin",
      "git config --show-credential",
      "git credentials --list"
    ],
    answer: "git config --show-origin credential.helper",
    explanation: "Querying 'credential.helper' with '--show-origin' tells you if the Windows Credential Manager or macOS Keychain helper was configured at system or global level."
  },
  {
    id: 20,
    question: "Can an environment variable override values shown by 'git config --list --show-origin'?",
    options: [
      "No, files always take precedence over environment variables",
      "Yes, environment variables like GIT_AUTHOR_NAME and GIT_AUTHOR_EMAIL take precedence over config files during commit creation",
      "Only if run on Linux",
      "Only if sudo is used"
    ],
    answer: "Yes, environment variables like GIT_AUTHOR_NAME and GIT_AUTHOR_EMAIL take precedence over config files during commit creation",
    explanation: "Git checks environment variables first before falling back to configuration files for commit identity."
  },
  {
    id: 21,
    question: "In the output 'file:/etc/gitconfig  core.autocrlf=input', what does 'file:' represent?",
    options: [
      "The file protocol indicating the source was read from a disk file",
      "A typo in Git 2.8",
      "A remote file downloaded from GitHub",
      "A locked file"
    ],
    answer: "The file protocol indicating the source was read from a disk file",
    explanation: "Git uses URI schemes like 'file:' or 'command line:' to classify the origin type."
  },
  {
    id: 22,
    question: "Which of the following is the fastest way to check whether 'init.defaultBranch' is configured globally?",
    options: [
      "git config --global init.defaultBranch",
      "git branch --check-default",
      "git init --dry-run",
      "git log --branch-default"
    ],
    answer: "git config --global init.defaultBranch",
    explanation: "'git config --global <key>' directly reads only the global configuration scope."
  },
  {
    id: 23,
    question: "What is the recommended practice when sharing a project with team members regarding local vs global config?",
    options: [
      "Commit your ~/.gitconfig into the repository root",
      "Never commit personal global configs; use project-level .git/config, .editorconfig, and .gitattributes for shared standards",
      "Hardcode passwords inside .git/config",
      "Delete .git/config before pushing"
    ],
    answer: "Never commit personal global configs; use project-level .git/config, .editorconfig, and .gitattributes for shared standards",
    explanation: "Global configs belong to individual machines. Shared repo standards should be maintained through versioned files like '.gitattributes' or repo documentation."
  },
  {
    id: 24,
    question: "If 'git config --show-origin --list' shows hundreds of lines, what is the best command to pipe through on Unix/Git Bash for paging?",
    options: [
      "git config --list --show-origin | less",
      "git config --list --show-origin > nul",
      "git config --stop",
      "git pause --config"
    ],
    answer: "git config --list --show-origin | less",
    explanation: "Piping output through 'less' or 'more' allows developers to scroll and search through lengthy configuration lists."
  },
  {
    id: 25,
    question: "Why should developers periodically audit their Git config origins with '--show-origin'?",
    options: [
      "To ensure obsolete global aliases or wrong corporate email credentials are not silently corrupting new repository commits",
      "To defragment the hard disk",
      "To speed up internet bandwidth",
      "To update Git to the latest version automatically"
    ],
    answer: "To ensure obsolete global aliases or wrong corporate email credentials are not silently corrupting new repository commits",
    explanation: "Regular audits prevent identity mismatches, unexpected line-ending transformations, and broken tool integrations across multiple repositories."
  }
];

export default questions;
