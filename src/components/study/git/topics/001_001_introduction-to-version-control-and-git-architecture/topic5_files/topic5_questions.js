/**
 * Topic 5 FAQ Dataset: Installing Git on Windows, macOS, and Linux
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "How do you check if Git is already installed on your computer?",
    shortAnswer: "Open your terminal or command prompt and run `git --version`.",
    explanation: "If Git is installed, it will return the installed version string (e.g. `git version 2.45.1.windows.1`). If not found, your shell will report 'command not found' or 'not recognized'.",
    hint: "The `--version` flag.",
    level: "basic",
    codeExample: "# Check installed version:\ngit --version"
  },
  {
    question: "What is 'Git for Windows' and what tools are bundled with it?",
    shortAnswer: "It is the official Windows package providing the Git BASH emulation terminal, Git GUI, and Windows Credential Manager.",
    explanation: "Because Windows natively uses DOS/PowerShell conventions, Git for Windows provides MinGW64/MSYS2-based Git Bash, allowing developers on Windows to use standard Unix commands (`ls`, `grep`, `cat`, `ssh`) seamlessly.",
    hint: "Git Bash, Git GUI, and Credential Manager.",
    level: "basic",
    codeExample: "# Install via winget:\nwinget install --id Git.Git -e --source winget"
  },
  {
    question: "How do you install Git on macOS using Homebrew?",
    shortAnswer: "Run `brew install git` in the macOS Terminal.",
    explanation: "While macOS comes with Apple's Xcode Command Line Tools (`xcode-select --install`), Apple's bundled Git is often several versions behind. Homebrew provides the latest stable upstream Git binary.",
    hint: "`brew install git`.",
    level: "basic",
    codeExample: "# Install latest Git via Homebrew:\nbrew install git\nwhich git # /opt/homebrew/bin/git"
  },
  {
    question: "How do you install Git on Debian or Ubuntu Linux?",
    shortAnswer: "Run `sudo apt update && sudo apt install git -y`.",
    explanation: "The Advanced Package Tool (APT) fetches and installs the official Git package along with its required shared libraries from the Ubuntu/Debian repositories.",
    hint: "Use `apt install git` with sudo privileges.",
    level: "basic",
    codeExample: "# Debian / Ubuntu installation:\nsudo apt update && sudo apt install git -y"
  },
  {
    question: "How do you install Git on Fedora or RHEL/CentOS?",
    shortAnswer: "Run `sudo dnf install git -y` (or `yum install git` on older versions).",
    explanation: "Fedora and enterprise Linux distributions use the DNF (Dandified YUM) package manager to manage RPM packages.",
    hint: "DNF package manager.",
    level: "basic",
    codeExample: "# Fedora / RHEL installation:\nsudo dnf install git -y"
  },
  {
    question: "How do you install Git on Arch Linux or Manjaro?",
    shortAnswer: "Run `sudo pacman -S git`.",
    explanation: "Arch Linux provides the bleeding-edge upstream Git build directly in the core official repository.",
    hint: "Pacman package manager.",
    level: "basic",
    codeExample: "# Arch Linux installation:\nsudo pacman -S git"
  },
  {
    question: "What is Git Bash on Windows and why is it recommended for beginners?",
    shortAnswer: "It provides a genuine Unix bash shell on Windows with essential utilities like ssh, curl, nano, and vim.",
    explanation: "Learning Git in Git Bash ensures that the exact same terminal commands work whether you are working on Windows in Barrackpore, macOS in an enterprise office, or deploying to a cloud Linux server.",
    hint: "Consistent Unix command experience across all operating systems.",
    level: "basic",
    codeExample: "# Inside Git Bash, standard Unix paths work:\npwd # /c/Users/sukanta/projects"
  },
  {
    question: "What is the Windows Credential Manager integration in Git for Windows?",
    shortAnswer: "A helper (GCM - Git Credential Manager) that securely caches your GitHub/GitLab authentication tokens in the Windows credential vault.",
    explanation: "Git Credential Manager eliminates the need to type your Personal Access Token (PAT) on every `git push`, storing OAuth tokens safely in Windows Credential Locker or macOS Keychain.",
    hint: "Caches authentication tokens securely.",
    level: "intermediate",
    codeExample: "# Inspect credential helper setting:\ngit config --global credential.helper\n# Output: manager"
  },
  {
    question: "What should you choose for 'Adjusting your PATH environment' during Windows installation?",
    shortAnswer: "Select 'Git from the command line and also from 3rd-party software' (Recommended).",
    explanation: "This option adds only the minimal `git.exe` to your Windows PATH, allowing VS Code, PowerShell, Windows Terminal, and Command Prompt to invoke Git without cluttering standard Windows tools.",
    hint: "Recommended middle option during installer wizard.",
    level: "intermediate",
    codeExample: "# Enables invoking git in PowerShell or Command Prompt:\ngit status"
  },
  {
    question: "What is the difference between Apple's bundled Git and Homebrew Git on macOS?",
    shortAnswer: "Apple's Git is tied to Xcode releases and updates slowly; Homebrew Git is the latest upstream version with faster updates and full feature sets.",
    explanation: "Apple ships Git in `/usr/bin/git`. When you install via Homebrew, it installs in `/opt/homebrew/bin/git` (Apple Silicon) or `/usr/local/bin/git` (Intel), taking PATH precedence.",
    hint: "Xcode bundled version vs upstream Homebrew build.",
    level: "intermediate",
    codeExample: "# Verify PATH priority on macOS:\nwhich -a git"
  },
  {
    question: "How can you install Git from source code on Linux for the absolute newest features?",
    shortAnswer: "Download the source tarball from kernel.org, install build dependencies, and compile using `make prefix=/usr/local all && sudo make prefix=/usr/local install`.",
    explanation: "Compiling from source is used on enterprise Linux distros when you need cutting-edge Git features (like newest sparse-checkout or SHA-256 support) not yet packaged in standard distro repos.",
    hint: "Compile from C source code with gcc and make.",
    level: "advanced",
    codeExample: "# Build dependencies on Ubuntu:\nsudo apt install build-essential libssl-dev libcurl4-gnutls-dev libexpat1-dev gettext zlib1g-dev"
  },
  {
    question: "How do you verify where the Git executable binary is located on your system?",
    shortAnswer: "Run `which git` on Unix/Git Bash or `where.exe git` on Windows PowerShell.",
    explanation: "This reveals the exact filesystem binary path being invoked by your shell, helping diagnose PATH collision issues.",
    hint: "`which` or `where` command.",
    level: "basic",
    codeExample: "# Locate Git binary:\nwhich git # /usr/bin/git"
  },
  {
    question: "What is the `git-gui` and `gitk` tool included with Git installations?",
    shortAnswer: "Tcl/Tk-based graphical interfaces built into Git for visual staging and exploring commit history DAGs.",
    explanation: "While most developers use VS Code or terminal, `gitk` is an ultra-lightweight graphical history viewer that ships with Git by default.",
    hint: "Built-in Tcl/Tk GUI viewers.",
    level: "intermediate",
    codeExample: "# Launch graphical history viewer in repository:\ngitk --all &"
  },
  {
    question: "How do you access the built-in manual pages for any Git command?",
    shortAnswer: "Run `git help <command>` or `git <command> --help` or `man git-<command>`.",
    explanation: "Git includes complete offline man pages detailing all flags, options, mechanics, and examples for every command.",
    hint: "`git help <command>`.",
    level: "basic",
    codeExample: "# Open comprehensive manual for commit command:\ngit help commit"
  },
  {
    question: "Why should you avoid installing multiple conflicting Git versions on Windows?",
    shortAnswer: "Multiple installations in different PATH locations can cause credential manager conflicts and inconsistent behavior in IDEs.",
    explanation: "If you install Git via winget, Cygwin, and standalone installers simultaneously, IDEs like VS Code might invoke an older Cygwin binary instead of Git for Windows.",
    hint: "PATH environment variable precedence conflicts.",
    level: "intermediate",
    codeExample: "# Check all Git binaries in Windows PATH:\nwhere.exe git"
  },
  {
    question: "How do you update Git to the latest version on Windows?",
    shortAnswer: "Run `git update-git-for-windows` in Git Bash or `winget upgrade Git.Git`.",
    explanation: "Git for Windows includes a built-in self-updater command that checks for new releases and downloads the installer automatically.",
    hint: "`git update-git-for-windows`.",
    level: "basic",
    codeExample: "# Update Git for Windows directly:\ngit update-git-for-windows"
  },
  {
    question: "How do you update Git to the latest version on macOS?",
    shortAnswer: "Run `brew update && brew upgrade git`.",
    explanation: "Homebrew fetches formula updates and compiles/installs the latest Git bottle.",
    hint: "`brew upgrade git`.",
    level: "basic",
    codeExample: "# Upgrade via Homebrew:\nbrew upgrade git"
  },
  {
    question: "How do you update Git on Ubuntu Linux to the newest PPA release?",
    shortAnswer: "Add the official Git maintainers PPA: `sudo add-apt-repository ppa:git-core/ppa` followed by `sudo apt update && sudo apt upgrade git`.",
    explanation: "Ubuntu LTS repositories can be months behind; the official Ubuntu `git-core/ppa` provides backported newest stable releases directly from upstream.",
    hint: "Ubuntu `ppa:git-core/ppa`.",
    level: "intermediate",
    codeExample: "# Add official Git PPA:\nsudo add-apt-repository ppa:git-core/ppa\nsudo apt update && sudo apt install git -y"
  },
  {
    question: "What is Windows Terminal and why should you use it with Git Bash?",
    shortAnswer: "Windows Terminal is Microsoft's modern, GPU-accelerated tabbed terminal supporting tabs, UTF-8 unicode, 24-bit color, and multiple profiles (PowerShell, Git Bash, WSL).",
    explanation: "Integrating Git Bash inside Windows Terminal provides a state-of-the-art terminal environment with split panes, custom themes, and fast font rendering.",
    hint: "Modern tabbed terminal from Microsoft.",
    level: "intermediate",
    codeExample: "# Windows Terminal settings can configure Git Bash as default profile."
  },
  {
    question: "What is the difference between using Git in WSL (Windows Subsystem for Linux) vs native Git for Windows?",
    shortAnswer: "WSL Git runs inside a real Linux kernel VM; Git for Windows runs natively on Win32 API.",
    explanation: "If you develop in WSL2 Ubuntu, you should run `git` inside WSL for maximum Linux filesystem I/O performance; for standard Windows projects, Git for Windows is optimal.",
    hint: "WSL2 Linux VM vs Win32 native Git.",
    level: "advanced",
    codeExample: "# Inside WSL2 Ubuntu terminal:\ngit --version # Linux binary"
  },
  {
    question: "What shell configuration file is used by Git Bash on Windows?",
    shortAnswer: "`~/.bashrc` or `~/.bash_profile` located in your user home directory (`C:\\Users\\<username>`).",
    explanation: "You can define custom aliases (e.g. `alias gs='git status'`) and shell functions inside `~/.bashrc` to boost productivity in Git Bash.",
    hint: "`~/.bashrc` in user profile directory.",
    level: "intermediate",
    codeExample: "# Add alias in ~/.bashrc:\necho \"alias gs='git status'\" >> ~/.bashrc\nsource ~/.bashrc"
  },
  {
    question: "Why does Git require SSH during advanced multi-platform setup?",
    shortAnswer: "SSH (Secure Shell) provides cryptographic public-key authentication for passwordless, highly secure pushes to GitHub, GitLab, or private Linux servers.",
    explanation: "Setting up `ssh-keygen` and adding your public key (`~/.ssh/id_ed25519.pub`) to GitHub eliminates typing passwords and enables automated scripts to push securely.",
    hint: "Public-key cryptography (`id_ed25519`).",
    level: "intermediate",
    codeExample: "# Generate secure modern SSH key:\nssh-keygen -t ed25519 -C \"sukanta@codernaccotax.co.in\""
  },
  {
    question: "What is `core.symlinks` configuration on Windows?",
    shortAnswer: "A setting that controls whether Git attempts to create real NTFS symbolic links when cloning repositories containing Unix symlinks.",
    explanation: "Windows requires Administrator privileges or Developer Mode to create NTFS symlinks. Setting `core.symlinks` helps when cross-compiling Linux repositories on Windows.",
    hint: "NTFS symbolic link support on Windows.",
    level: "advanced",
    codeExample: "# Enable symlinks during clone on Windows:\ngit clone -c core.symlinks=true <url>"
  },
  {
    question: "What is Git LFS and should you install it alongside Git?",
    shortAnswer: "Yes, Git LFS (Large File Storage) should be installed to prevent heavy binary assets (videos, PSDs, dataset models) from bloating repository size.",
    explanation: "Git LFS replaces large files with small text pointer references inside Git and stores the actual large payloads on external object storage.",
    hint: "`git lfs install`.",
    level: "intermediate",
    codeExample: "# Initialize Git LFS globally:\ngit lfs install"
  },
  {
    question: "What is the single most important first verification step after installing Git?",
    shortAnswer: "Verifying the installed version with `git --version` and confirming that Git executes cleanly in your preferred shell.",
    explanation: "Confirming the version ensures your PATH is properly wired and that you are ready to configure your user identity (`user.name` and `user.email`).",
    hint: "`git --version` verification.",
    level: "basic",
    codeExample: "# Verify installation success:\ngit --version"
  }
];

export default questions;
