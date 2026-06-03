// topic0_questions.js – 20 FAQ questions (moderate → expert)
// Topic: "Why vi/vim? – ubiquity on all Unix/Linux systems"

const questions = [
  {
    question: "What does it mean that vi is part of the POSIX specification?",
    shortAnswer: "Any POSIX-compliant Unix or Unix-like system must include a `vi` editor.",
    explanation: "POSIX (Portable Operating System Interface) standardizes system interfaces, including a mandatory `vi` editor. This guarantees that on any certified system—Linux, macOS, BSD, Solaris, AIX—vi will be present. No other visual editor is required.",
    hint: "Think about what happens when you boot a minimal LiveCD or a Docker scratch image.",
    level: "moderate",
    codeExample: "$ command -v vi\n/usr/bin/vi"
  },
  {
    question: "Why is `vi` preferred over `nano` or `emacs` in system recovery situations?",
    shortAnswer: "Only vi is guaranteed to be installed in single-user mode, initramfs, or emergency shells.",
    explanation: "Recovery environments often mount only the bare minimum filesystem. Many distributions keep /usr/bin/vi in the root partition, while nano/emacs may reside on separate partitions that are not mounted. vi is also statically linked in some busybox builds.",
    hint: "What happens if /usr is not mounted? Where is vi typically located?",
    level: "moderate",
    codeExample: "# In initramfs shell\nvi /etc/fstab   # works\nnano /etc/fstab # command not found"
  },
  {
    question: "What is the difference between `vi` and `vim` when discussing ubiquity?",
    shortAnswer: "`vi` is the POSIX required editor; `vim` is an enhanced clone that may not be installed everywhere.",
    explanation: "Many modern systems symlink `vi` to `vim` in a compatibility mode. However, on truly minimal systems (Alpine Linux, BusyBox, embedded devices), you may get the original `nvi` or `elvis`. The basic vi keybindings and commands are identical, but vim extras like syntax highlighting might be missing.",
    hint: "Run `vi --version` on different systems. Look for 'Vi Improved' vs 'nvi'.",
    level: "moderate",
    codeExample: "$ vi --version\nVIM - Vi IMproved 9.0\n# vs\n$ vi --version\nnvi version 1.81.6 (Berkeley)"
  },
  {
    question: "How can you verify if a remote server has vi without logging in interactively?",
    shortAnswer: "Use SSH to run a non‑interactive command: `ssh user@host 'command -v vi'`",
    explanation: "You can test for the presence of vi without opening a full shell. This is useful in provisioning scripts or Ansible playbooks to decide which editor to set as default.",
    hint: "Combine `ssh` with `which vi` or `type vi`.",
    level: "expert",
    codeExample: "ssh backup@192.168.1.100 'command -v vi' && echo \"vi available\""
  },
  {
    question: "What is `ex` and how does it relate to vi ubiquity?",
    shortAnswer: "`ex` is the line‑editor mode of vi; it is always available wherever vi is present.",
    explanation: "The POSIX specification also requires the `ex` editor (the line‑oriented predecessor). It is useful in scripts that need to edit files without opening a full‑screen interface. `vi` is essentially the visual mode of `ex`.",
    hint: "Try `ex -c '%p' -c 'q' /etc/passwd` – it prints the file without a screen.",
    level: "expert",
    codeExample: "$ ex -s hello.txt <<< 'iHello world' . wq\n# edits hello.txt non‑interactively"
  },
  {
    question: "Why might a Docker container have vi but not vim?",
    shortAnswer: "Alpine‑based images often install `busybox-vi` (a minimal vi) to save space, omitting full vim.",
    explanation: "Container images focus on size. The `busybox` binary includes a tiny vi clone that satisfies POSIX. Installing full vim would add 20+ MB. Many official images (nginx, node:alpine) keep only the minimal vi.",
    hint: "Check the size difference: `busybox` vs `vim` packages.",
    level: "moderate",
    codeExample: "$ docker run --rm alpine sh -c 'command -v vi && vi --version'\nvi is /usr/bin/vi\nBusyBox v1.36.0"
  },
  {
    question: "What does the `view` command do, and why is it important for beginners?",
    shortAnswer: "`view` opens a file in read‑only mode; it is the same as `vi -R` and helps prevent accidental edits.",
    explanation: "When exploring system configuration files, using `view` ensures you cannot accidentally write changes. It's an extremely safe way to learn vi navigation without risk.",
    hint: "Try `view /etc/passwd` – try to write with `:w` and see what happens.",
    level: "moderate",
    codeExample: "view /etc/ssh/sshd_config\n# If you try :w, vi warns 'File is read only'"
  },
  {
    question: "How do you force write a file with vi when you opened it without sufficient permissions?",
    shortAnswer: "Use `:w !sudo tee %` to write using sudo, or `:w !chown` tricks.",
    explanation: "If you forgot to use `sudo vi file`, you can still save changes by piping the buffer through sudo. This is a vi‑only survival skill, not available in other editors without plugins.",
    hint: "The `%` symbol in vi stands for the current filename.",
    level: "expert",
    codeExample: ":w !sudo tee % > /dev/null"
  },
  {
    question: "Which environment variable can you set to make other programs default to vi?",
    shortAnswer: "`EDITOR=vi` or `VISUAL=vi` – used by `crontab -e`, `git commit`, `sudo -e`, and many CLI tools.",
    explanation: "Setting these variables makes the entire Unix ecosystem use vi. Ubiquity is not just about the editor itself but its integration into the workflow.",
    hint: "Add `export EDITOR=vi` to your `~/.bashrc`.",
    level: "moderate",
    codeExample: "$ export EDITOR=vi\n$ crontab -e   # opens cron table in vi"
  },
  {
    question: "What is the significance of the `vi` command being available in BusyBox?",
    shortAnswer: "BusyBox provides a lightweight vi that works on embedded systems, rescue disks, and initramfs, ensuring vi is present almost everywhere.",
    explanation: "BusyBox is used by OpenWrt, Alpine, many router firmwares, and Android terminals. Its `vi` applet implements a surprising amount of POSIX functionality in a tiny binary.",
    hint: "Run `busybox vi --help` on a system with busybox.",
    level: "expert",
    codeExample: "$ busybox vi\n# opens vi from busybox without full vim"
  },
  {
    question: "How can you recover a swap file when vi crashes on a shared server?",
    shortAnswer: "Use `vi -r filename` to recover, then delete the `.swp` file after saving.",
    explanation: "Because vi is ubiquitous, the recovery mechanism is well‑known across systems. Instead of losing work, administrators can recover from `.filename.swp` even if the original session died.",
    hint: "Look for hidden swap files with `ls -la .*.swp`",
    level: "expert",
    codeExample: "$ vi -r myconfig.conf\n# Recovery complete.  :wq"
  },
  {
    question: "Why do some minimal Unix systems only provide `vi` and not `vim`?",
    shortAnswer: "Size constraints and POSIX compliance: `vi` (e.g., `nvi` or `elvis`) is smaller and meets the minimal requirement.",
    explanation: "Embedded systems with 4MB flash cannot host full vim. But a 150KB `vi` is fine. The ubiquity argument holds because the basic editing commands are identical.",
    hint: "Compare file sizes: `/usr/bin/vi` vs `/usr/bin/vim` on a Linux desktop.",
    level: "moderate",
    codeExample: "$ ls -lh /usr/bin/vi /usr/bin/vim\n-rwxr-xr-x 1 root root 180K vi\n-rwxr-xr-x 1 root root 2.2M vim"
  },
  {
    question: "What is the `-R` flag in vi, and when should it be used?",
    shortAnswer: "`vi -R` opens a file read‑only, same as `view`. It protects novice users from accidental changes.",
    explanation: "When teaching new students, using `vi -R` on system files (like `/etc/group`) prevents costly mistakes. It is also useful for reviewing logs.",
    hint: "Run `vi -R /var/log/syslog` – try to modify.",
    level: "moderate",
    codeExample: "$ vi -R important.cfg\n# Status line shows \"Readonly\""
  },
  {
    question: "How do you change the default editor in `sudo` to vi without editing system configs?",
    shortAnswer: "Set `SUDO_EDITOR=vi` or `visudo` to configure the `editor` variable.",
    explanation: "`sudo` respects the `SUDO_EDITOR` environment variable, then `VISUAL`, then `EDITOR`. This allows per‑user choice without affecting system defaults.",
    hint: "Add `export SUDO_EDITOR=vi` to your shell profile.",
    level: "expert",
    codeExample: "$ export SUDO_EDITOR=vi\n$ sudo -e /etc/hosts   # opens in vi"
  },
  {
    question: "What is the `ex` command `%s/old/new/g` and why does it work even without full vim?",
    shortAnswer: "Substitution is part of the original vi/ex feature set, required by POSIX.",
    explanation: "Even the most minimal vi implementation that follows POSIX must support `:s` for substitution. This makes complex file transformations possible on any system.",
    hint: "Try it on a busybox system with `echo 'hello' | ex -s +'%s/hello/hi/' +'%p' -c 'q!' /dev/stdin`",
    level: "moderate",
    codeExample: ":s/foo/bar/g            # change on current line\n:%s/foo/bar/g          # change whole file"
  },
  {
    question: "How can you use vi as a pager like `less`?",
    shortAnswer: "Use `view -` or `vi -R -` to read from stdin, or simply `vi /var/log/messages` and navigate with vi commands.",
    explanation: "Because vi is always available, you can replace `less` with `view` and get powerful search, search with `n`, and even edit. Less is not always installed on minimal systems; vi is.",
    hint: "`command -v less` vs `command -v view` – compare.",
    level: "expert",
    codeExample: "$ dmesg | view -"
  },
  {
    question: "What is the difference between `:q` and `:q!` in vi?",
    shortAnswer: "`:q` quits only if no changes; `:q!` discards changes and quits forcibly.",
    explanation: "Novices often get stuck because they forget to save. `:q!` is the emergency escape that always works, even when you accidentally opened a write‑protected file.",
    hint: "Try it: edit a file, make a change, then type `:q` – vi refuses. Then `:q!` works.",
    level: "beginner",
    codeExample: ":q     # 'No write since last change' error\n:q!    # quits immediately"
  },
  {
    question: "Why is it beneficial to learn `vi` over GUI editors if you are a system administrator?",
    shortAnswer: "Servers often have no GUI, and vi works over SSH, serial consoles, and in rescue modes.",
    explanation: "A sysadmin may need to edit configuration files on a remote machine that has no X11, no web server for cloud IDEs, and no network for downloading tools. vi is the only constant.",
    hint: "Think of a headless Raspberry Pi, a cloud VM, or a network switch running busybox.",
    level: "moderate",
    codeExample: "# Over a 300 baud serial console, vi still works fine"
  },
  {
    question: "What does `vi -c` allow you to do, and why is it important for automation?",
    shortAnswer: "The `-c` flag executes an ex command after opening the file, enabling scripted edits.",
    explanation: "You can perform non‑interactive editing by chaining commands: `vi -c 'normal dd' -c 'wq' file`. This works on any vi, not just vim, giving you a portable `sed`‑like capability.",
    hint: "Combine with `-es` (ex mode silent) for pure scripting.",
    level: "expert",
    codeExample: "$ vi -c '%s/old/new/g' -c 'wq' config.txt"
  },
  {
    question: "How can you instruct beginners to practice vi without risking system files?",
    shortAnswer: "Use `vimtutor` (if available) or create a playground: `cp /etc/hosts /tmp/practice && vi /tmp/practice`.",
    explanation: "Because vi is everywhere, they can practice on any machine. The `vimtutor` command is the built‑in interactive tutorial, but even without it, they can copy any text file and edit safely.",
    hint: "`cd /tmp; cp ~/.bashrc ./practice; vi practice` – no risk.",
    level: "moderate",
    codeExample: "$ cp /etc/hosts ~/myhosts\n$ vi ~/myhosts   # safe for practice"
  }
];

export default questions;