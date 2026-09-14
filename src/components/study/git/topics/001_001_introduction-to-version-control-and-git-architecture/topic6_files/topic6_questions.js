/**
 * Topic 6 FAQ Dataset: Configuring Git Identity (user.name and user.email)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "Why is configuring `user.name` and `user.email` the first mandatory step in Git?",
    shortAnswer: "Because Git embeds this identity immutably into every single commit object you create.",
    explanation: "Unlike SVN where identity is checked by the server on commit, Git bakes your name and email directly into the local commit object header. The SHA-1 hash of the commit is calculated over this identity string.",
    hint: "Immutable author identity embedded in every commit.",
    level: "basic",
    codeExample: "# Configure global identity:\ngit config --global user.name \"Sukanta Hui\"\ngit config --global user.email \"sukanta@codernaccotax.co.in\""
  },
  {
    question: "Where is the global configuration file stored on disk?",
    shortAnswer: "In the user's home directory as `~/.gitconfig` (or `C:\\Users\\<username>\\.gitconfig` on Windows).",
    explanation: "This INI-style text file contains your system-wide personal settings for all repositories on your computer.",
    hint: "`~/.gitconfig` in user home directory.",
    level: "basic",
    codeExample: "# View raw global config file:\ncat ~/.gitconfig"
  },
  {
    question: "What is the difference between `git config --global` and `git config --local`?",
    shortAnswer: "`--global` applies to all repositories for the current user; `--local` applies only to the current repository, overriding global settings.",
    explanation: "If you work on personal open-source projects using your personal email, but have a work repository requiring your corporate email, you set `--local user.email` inside that specific work project folder.",
    hint: "System-wide default vs repository-specific override.",
    level: "basic",
    codeExample: "# Set repo-specific work email:\ncd ~/work/client-project\ngit config --local user.email \"sukanta.hui@corporate.com\""
  },
  {
    question: "What is the difference between an 'Author' and a 'Committer' in Git?",
    shortAnswer: "The 'Author' is the person who originally wrote the code; the 'Committer' is the person who committed or applied the change to the repository.",
    explanation: "When you author a commit and push it, you are both. But when a maintainer cherry-picks or applies your emailed patch (`git am`) or rebases your branch, the original author is preserved while the committer updates to the maintainer.",
    hint: "Original code writer (Author) vs commit applier/rebaser (Committer).",
    level: "intermediate",
    codeExample: "# Inspect both Author and Committer:\ngit log -1 --format='Author: %an <%ae>%nCommitter: %cn <%ce>'"
  },
  {
    question: "How does GitHub link your commits to your GitHub user profile?",
    shortAnswer: "GitHub matches the `user.email` embedded in your commit objects with the verified email addresses registered on your GitHub account.",
    explanation: "If your `user.email` in Git matches an email listed in your GitHub Account Settings -> Emails, your GitHub avatar and profile link appear on the commit, and the green contribution activity chart updates.",
    hint: "Matching `user.email` with GitHub verified email list.",
    level: "basic",
    codeExample: "# Verify local email matches GitHub:\ngit config user.email"
  },
  {
    question: "What happens if you make commits without configuring `user.name` and `user.email`?",
    shortAnswer: "Git will guess your identity from your local OS username and hostname (e.g. `sachin@DESKTOP-ABC.localdomain`) or refuse to commit.",
    explanation: "Modern Git versions will warn or error out: `*** Please tell me who you are. Run git config ...`. Older versions silently committed with system hostnames, creating messy and un-attributable logs.",
    hint: "Git falls back to OS username@hostname or halts with an error.",
    level: "basic",
    codeExample: "# Example fallback author string: user@DESKTOP-89J2K1.localdomain"
  },
  {
    question: "How can you view your currently active `user.name` and `user.email`?",
    shortAnswer: "Run `git config user.name` and `git config user.email`.",
    explanation: "This command checks the effective active value, resolving through the Local -> Global -> System hierarchy.",
    hint: "Query specific keys with `git config <key>`.",
    level: "basic",
    codeExample: "# Query active identity:\ngit config user.name\ngit config user.email"
  },
  {
    question: "How do you change your identity for only ONE specific project?",
    shortAnswer: "Navigate inside the project directory and run `git config --local user.name \"Name\"` and `git config --local user.email \"email\"`.",
    explanation: "This writes directly to `.git/config` inside that project without altering your global `~/.gitconfig`.",
    hint: "Use `--local` inside the target repository.",
    level: "basic",
    codeExample: "# Configure repository-specific identity:\ngit config --local user.name \"Sukanta Hui (Client A)\"\ngit config --local user.email \"sukanta@client-a.com\""
  },
  {
    question: "Can you change the author identity of commits you already created in the past?",
    shortAnswer: "Yes, for the most recent commit use `git commit --amend --reset-author`; for older history use `git rebase -i` or `git-filter-repo`.",
    explanation: "Because commit hashes are immutable, changing the author changes the commit SHA and rewrites history. Never rewrite history on shared branches that colleagues have already pulled.",
    hint: "`git commit --amend --reset-author` rewrites the latest commit.",
    level: "intermediate",
    codeExample: "# Update author of latest unpushed commit:\ngit commit --amend --reset-author --no-edit"
  },
  {
    question: "What is the `includeIf` directive in `~/.gitconfig` and why is it useful?",
    shortAnswer: "It allows conditional inclusion of config files based on directory paths (e.g. automatically applying work email for all repos in `~/work/`).",
    explanation: "Instead of manually configuring `--local` for every work repo, you can configure `includeIf.gitdir:~/work/` in `~/.gitconfig` to automatically load a `~/.gitconfig-work` file.",
    hint: "Conditional config inclusion based on folder path (`includeIf.gitdir:`).",
    level: "advanced",
    codeExample: "# Inside ~/.gitconfig:\n[includeIf \"gitdir:~/work/\"]\n  path = ~/.gitconfig-work"
  },
  {
    question: "How do you unset or delete a configured Git key?",
    shortAnswer: "Run `git config --global --unset <key>` (or `--local --unset`).",
    explanation: "This removes the specified key-value pair from the designated configuration file.",
    hint: "Use the `--unset` flag.",
    level: "intermediate",
    codeExample: "# Unset a key:\ngit config --global --unset user.signingkey"
  },
  {
    question: "What is GitHub's 'Keep my email addresses private' feature?",
    shortAnswer: "A setting where GitHub provides a private proxy email (e.g. `ID+username@users.noreply.github.com`) to prevent exposing personal emails in public commit logs.",
    explanation: "Because commit logs are publicly readable on open-source repositories, developers who want privacy configure their Git client with their GitHub `noreply` email address.",
    hint: "Private `noreply.github.com` email address.",
    level: "intermediate",
    codeExample: "# Set private GitHub noreply email:\ngit config --global user.email \"123456+sukantahui@users.noreply.github.com\""
  },
  {
    question: "How do you check which configuration file (System, Global, or Local) set a specific value?",
    shortAnswer: "Run `git config --list --show-origin`.",
    explanation: "This flag prints the exact filesystem path (e.g. `file:/home/user/.gitconfig`) alongside every configuration property, making conflict diagnosis effortless.",
    hint: "`--show-origin`.",
    level: "intermediate",
    codeExample: "# Inspect config origins:\ngit config --list --show-origin | grep user"
  },
  {
    question: "Can you sign Git commits cryptographically to prove your identity?",
    shortAnswer: "Yes, using GPG (GNU Privacy Guard) or SSH keys via `user.signingkey` and `commit.gpgsign = true`.",
    explanation: "Commit signing attaches a cryptographic digital signature to the commit. Platforms like GitHub display a green 'Verified' badge next to the commit, proving the code was authored by the genuine key owner.",
    hint: "GPG or SSH commit signing (`commit.gpgsign`).",
    level: "advanced",
    codeExample: "# Enable global GPG commit signing:\ngit config --global user.signingkey <GPG-KEY-ID>\ngit config --global commit.gpgsign true"
  },
  {
    question: "What is the difference between system-level (`--system`) and global-level (`--global`) config?",
    shortAnswer: "System config affects all users on the entire OS; Global config affects only the currently logged-in user account.",
    explanation: "System config lives in `/etc/gitconfig` (Unix) or `C:\\Program Files\\Git\\etc\\gitconfig` (Windows) and requires Administrator/root privileges to edit.",
    hint: "All users on machine (`/etc/gitconfig`) vs current user profile (`~/.gitconfig`).",
    level: "intermediate",
    codeExample: "# System config requires sudo on Linux:\nsudo git config --system core.autocrlf true"
  },
  {
    question: "Why should you never use fake or temporary emails in Git commits for client work?",
    shortAnswer: "Because commit history is permanent; fake emails ruin accountability, audit trails, and client compliance.",
    explanation: "Enterprise compliance audits (SOC2, ISO 27001) inspect Git logs to verify that all code was authored by authorized employees with verifiable corporate email addresses.",
    hint: "Audit compliance and professional accountability.",
    level: "basic",
    codeExample: "# Always use verifiable professional identity."
  },
  {
    question: "How does environment variable `GIT_AUTHOR_NAME` interact with `git config`?",
    shortAnswer: "Environment variables (`GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`) override both local and global `git config` settings.",
    explanation: "Git checks environment variables first before reading config files. This is heavily utilized in CI/CD pipelines (like GitHub Actions) to set bot author identities during automated deployments.",
    hint: "Environment variables have the highest precedence.",
    level: "advanced",
    codeExample: "# Override author for single command:\nGIT_AUTHOR_NAME='Deploy Bot' git commit -m 'chore: release build'"
  },
  {
    question: "How do you open your global Git configuration in your default text editor?",
    shortAnswer: "Run `git config --global --edit`.",
    explanation: "This command opens `~/.gitconfig` directly in your configured editor (VS Code, Nano, Vim) for fast manual editing.",
    hint: "Use the `--edit` flag.",
    level: "basic",
    codeExample: "# Open config in editor:\ngit config --global --edit"
  },
  {
    question: "What characters are prohibited in `user.name`?",
    shortAnswer: "Angle brackets (`<` and `>`), newlines (`\\n`), and unprintable control characters.",
    explanation: "Because Git formats commit headers as `Author: Name <email> timestamp tz`, including angle brackets in the name field corrupts the parser.",
    hint: "Angle brackets (`< >`) are reserved for email boundaries.",
    level: "intermediate",
    codeExample: "# Valid: 'Sukanta Hui'\n# Invalid: 'Sukanta <Hui>'"
  },
  {
    question: "What is `GIT_COMMITTER_NAME` vs `GIT_AUTHOR_NAME`?",
    shortAnswer: "`GIT_AUTHOR_NAME` defines who created the code; `GIT_COMMITTER_NAME` defines who finalized or rebased the commit object.",
    explanation: "Both are recorded in the commit metadata. By default, `git commit` sets both to the active `user.name` and `user.email`.",
    hint: "Author created the code; Committer committed the snapshot.",
    level: "advanced",
    codeExample: "# Format commit showing both author and committer dates:\ngit log -1 --format='Author Date: %ad%nCommit Date: %cd'"
  },
  {
    question: "How do you check if a local repository has overridden your global email?",
    shortAnswer: "Run `git config --local user.email` inside the repository.",
    explanation: "If a local email is set, it will print the local email. If not set, it will exit with a non-zero return code (key not found in local config).",
    hint: "Check local scope specifically.",
    level: "basic",
    codeExample: "# Check local override:\ngit config --local user.email"
  },
  {
    question: "Can two team members share the same computer without mixing up their Git commit identities?",
    shortAnswer: "Yes, by configuring distinct OS user accounts or setting `git config --local user.name` and `user.email` in their respective project folders.",
    explanation: "In a shared training lab at Barrackpore, student Sachin and student Susmita can set `--local` identity in their individual project folders so each commit reflects the correct author.",
    hint: "Repository-level (`--local`) configuration per student project.",
    level: "basic",
    codeExample: "# In Sachin's folder:\ngit config --local user.name 'Sachin Sharma'\n# In Susmita's folder:\ngit config --local user.name 'Susmita Roy'"
  },
  {
    question: "What is the recommended casing convention for `user.name`?",
    shortAnswer: "Use standard Title Case with your genuine first and last name (e.g. 'Sukanta Hui').",
    explanation: "Avoid cryptic usernames (like `coder_x99`). In professional software development, clear real names foster trust and clear peer review communication.",
    hint: "Professional Title Case (First Last).",
    level: "basic",
    codeExample: "# Best Practice:\ngit config --global user.name 'Sukanta Hui'"
  },
  {
    question: "Does changing `user.name` in `~/.gitconfig` change the name on past GitHub commits?",
    shortAnswer: "No, historical commits already created retain their original author metadata permanently.",
    explanation: "Only new commits created after the configuration change will carry the updated `user.name` and `user.email`.",
    hint: "Past commits are immutable.",
    level: "basic",
    codeExample: "# Config changes only affect FUTURE commits."
  },
  {
    question: "What is the golden rule for Git identity configuration?",
    shortAnswer: "Always configure your global identity immediately after installing Git, and ensure your email exactly matches your GitHub verified account.",
    explanation: "Setting this up once guarantees that every commit you write across your entire career is properly attributed, verified, and integrated with collaborative tooling.",
    hint: "Set global identity once, accurately, with verified email.",
    level: "basic",
    codeExample: "# Set it once and code with confidence:\ngit config --global user.name 'Sukanta Hui'\ngit config --global user.email 'sukanta@codernaccotax.co.in'"
  }
];

export default questions;
