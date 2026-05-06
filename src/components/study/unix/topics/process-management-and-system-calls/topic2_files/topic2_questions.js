// topic2_questions.js
const questions = [
  {
    question: "What is the init process and why is its PID always 1?",
    shortAnswer: "init is the first userspace process started by the kernel; it gets PID 1 because it is the oldest process.",
    explanation: "The kernel reserves PID 1 for the init process. All other processes are descendants of init. Killing init leads to kernel panic.",
    hint: "ps -p 1 shows the init program. No other process can have PID 1.",
    level: "basic",
    codeExample: "echo $$  # current shell PID (not 1 unless you are init)"
  },
  {
    question: "What happens to orphan processes in Unix?",
    shortAnswer: "They are reparented to init (PID 1).",
    explanation: "When a parent dies, the kernel finds the nearest 'reaper' – by default PID 1. init will eventually wait() for them, preventing zombies.",
    hint: "Write a program: fork, parent exits immediately, child sleeps. Check child's PPID.",
    level: "intermediate",
    codeExample: "ps -o pid,ppid,comm -C sleep"
  },
  {
    question: "Can init process be killed by SIGKILL?",
    shortAnswer: "No, the kernel ignores SIGKILL for PID 1.",
    explanation: "For safety, kernel treats PID 1 specially – many signals are ignored. You can only shut down via proper system calls (reboot, poweroff).",
    hint: "sudo kill -9 1 does nothing but may confuse.",
    level: "intermediate",
    codeExample: "sudo strace -p 1  # shows system calls but cannot kill"
  },
  {
    question: "What is the difference between SysV init, Upstart, and systemd?",
    shortAnswer: "SysV uses sequential runlevel scripts; Upstart was event-based; systemd uses parallel, dependency-based unit files.",
    explanation: "Systemd has become the standard on most Linux distros. Each has its own configuration and boot speed characteristics.",
    hint: "ls -l /sbin/init shows symlink to systemd or upstart.",
    level: "intermediate",
    codeExample: "systemd-analyze critical-chain"
  },
  {
    question: "What is a 'subreaper' process?",
    shortAnswer: "A process that becomes the adoptive parent for orphaned descendants within its process subtree.",
    explanation: "Linux `prctl(PR_SET_CHILD_SUBREAPER)` allows any process to act like init for its descendants. Useful for containers.",
    hint: "Docker's --init flag runs tini as subreaper.",
    level: "expert",
    codeExample: "prctl(PR_SET_CHILD_SUBREAPER, 1);"
  },
  {
    question: "How can I see the entire process tree starting from init?",
    shortAnswer: "Use `pstree` or `ps -ef --forest`.",
    explanation: "These tools show parent-child relationships visually. `pstree -p` also shows PIDs.",
    hint: "pstree -p 1 shows all processes.",
    level: "basic",
    codeExample: "pstree -aps $$  # show tree of current shell"
  },
  {
    question: "What is the boot process role of init?",
    shortAnswer: "Init executes system initialization scripts, mounts filesystems, starts daemons, and finally launches login managers.",
    explanation: "In systemd, it reads default.target and resolves dependencies. In SysV, it runs /etc/inittab and /etc/rc.d scripts.",
    hint: "systemctl get-default shows current target.",
    level: "intermediate",
    codeExample: "grep 'init' /var/log/boot.log"
  },
  {
    question: "What happens if init crashes?",
    shortAnswer: "Kernel panic – the system becomes unusable because there's no process to manage others or handle signals.",
    explanation: "Modern init systems (systemd) are very robust and restart critical components, but if init itself dies, the kernel halts.",
    hint: "You cannot 'restart' init without rebooting.",
    level: "advanced",
    codeExample: "echo c > /proc/sysrq-trigger  # cause crash (dangerous)"
  },
  {
    question: "What is the 'double-fork' technique?",
    shortAnswer: "Fork a child, then the child forks again and exits immediately, making the grandchild reparented to init − used to daemonize.",
    explanation: "The grandchild becomes an orphan adopted by init, detaching from the terminal and avoiding zombie creation.",
    hint: "Common pattern in old daemons (like syslogd).",
    level: "expert",
    codeExample: "if (fork() > 0) exit(0); setsid(); if (fork() > 0) exit(0);"
  },
  {
    question: "Why do containers need a special init process?",
    shortAnswer: "Because the entrypoint process becomes PID 1 inside the container. If it doesn't reap zombies, the container accumulates zombie processes.",
    explanation: "Init in a container must call wait() on its children. Tools like tini or dumb-init act as lightweight init.",
    hint: "docker run --init uses /sbin/docker-init.",
    level: "expert",
    codeExample: "docker run --init -it ubuntu bash"
  },
  {
    question: "How to find out which init system is running?",
    shortAnswer: "Check `ps -p 1 -o comm=`, or `systemctl --version`, or `init --version`.",
    explanation: "systemd will respond to systemctl, SysV init shows up as `init` (older).",
    hint: "ls -l /sbin/init",
    level: "basic",
    codeExample: "if command -v systemctl >/dev/null; then echo systemd; else echo SysV; fi"
  },
  {
    question: "What signals can be sent to init?",
    shortAnswer: "SIGTERM, SIGINT, SIGHUP may be ignored. SIGWINCH, SIGUSR1 have special meanings (e.g., re-run inittab).",
    explanation: "On SysV, SIGINT (Ctrl+Alt+Del) triggers shutdown. On systemd, SIGRTMIN+... used for power events.",
    hint: "sudo kill -USR1 1  # may cause reconfiguration.",
    level: "advanced",
    codeExample: "kill -WINCH 1  # ignored on many systems"
  },
  {
    question: "What is the historical significance of init in Unix?",
    shortAnswer: "Init was introduced in Research Unix Version 6 (1975) and has been the root process ever since.",
    explanation: "Over decades, init evolved from a simple script executor to complex event-driven systems.",
    hint: "Read 'The Design of the UNIX Operating System' by Maurice Bach.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does systemd handle orphan reaping differently from SysV init?",
    shortAnswer: "Both reparent orphans to PID 1, but systemd uses a more active reaper mechanism and service supervision.",
    explanation: "systemd keeps track of service processes and can restart them. It also supports `Delegate=yes` for subreaper in scopes.",
    hint: "systemd's `DefaultDependencies` affect orphan handling.",
    level: "expert",
    codeExample: "systemd-run --scope -p Delegate=yes command"
  },
  {
    question: "What is the 'initramfs' and its relation to init?",
    shortAnswer: "An initial RAM filesystem loaded by the bootloader. It contains a minimal init that mounts the real root and executes /sbin/init.",
    explanation: "The initramfs init (often /init) prepares devices and pivots to the real root filesystem.",
    hint: "lsinitramfs /boot/initrd.img-$(uname -r)",
    level: "expert",
    codeExample: "dmesg | grep initrd"
  },
  {
    question: "Can a process become init in a new namespace?",
    shortAnswer: "Yes, by using `unshare --fork --pid` or `clone(CLONE_NEWPID)`. The first process in the new PID namespace gets PID 1 inside that namespace.",
    explanation: "This is how containers isolate process trees. The namespace's init can be killed without affecting the host.",
    hint: "unshare -p -f --mount-proc",
    level: "expert",
    codeExample: "sudo unshare -p -f --mount-proc /bin/bash"
  },
  {
    question: "Why does `kill -9 1` not work?",
    shortAnswer: "The kernel has a special case: for PID 1, SIGKILL is silently ignored.",
    explanation: "This prevents accidental system shutdown. Only a proper reboot call or hardware reset can stop init.",
    hint: "Check source code: kernel/signal.c – 'force_sig_info_to_task' skips for PID 1.",
    level: "intermediate",
    codeExample: "sudo strace -e kill kill -9 1"
  },
  {
    question: "What does the 'init=/bin/bash' kernel parameter do?",
    shortAnswer: "Overrides the default init program. Boots directly into a bash shell as PID 1, bypassing normal init.",
    explanation: "Used for recovery. But careful: many system services won't run, and you'll need to remount / as rw.",
    hint: "Add to GRUB command line: init=/bin/bash",
    level: "expert",
    codeExample: "mount -o remount,rw /"
  },
  {
    question: "What is the purpose of `/etc/inittab`?",
    shortAnswer: "Configuration file for SysV init that defines runlevels, terminal getty processes, and shutdown actions.",
    explanation: "Not used by systemd. Systemd uses unit files instead.",
    hint: "cat /etc/inittab  # likely not present on systemd systems.",
    level: "intermediate",
    codeExample: "grep -v '^#' /etc/inittab"
  },
  {
    question: "How does init handle hardware power buttons?",
    shortAnswer: "Init (or systemd-logind) listens to input events or ACPI and triggers a graceful shutdown.",
    explanation: "Systemd has `HandlePowerKey` in `/etc/systemd/logind.conf`. SysV uses `acpid` daemon.",
    hint: "systemctl poweroff",
    level: "advanced",
    codeExample: "grep HandlePowerKey /etc/systemd/logind.conf"
  },
  {
    question: "What is a 'zombie' process under init?",
    shortAnswer: "A terminated child of init whose exit status hasn't been waited for yet. Init will eventually wait() and clean it.",
    explanation: "Since init's main loop includes wait(), zombies don't persist under init for long.",
    hint: "ps aux | grep defunct",
    level: "intermediate",
    codeExample: "while true; do : ; done &  # parent exits quickly, child becomes zombie? No, init reaps."
  },
  {
    question: "How can I debug init configuration errors?",
    shortAnswer: "Use `systemd-analyze verify` for systemd, or check `/var/log/messages` for SysV init.",
    explanation: "Boot with `systemd.log_level=debug` on kernel command line for verbose logs.",
    hint: "journalctl -b -p 3 -u systemd",
    level: "advanced",
    codeExample: "systemd-analyze blame"
  },
  {
    question: "What is the difference between 'init' and 'systemd' as PID 1?",
    shortAnswer: "init is the traditional name; systemd is a modern implementation that provides many more features (parallel startup, socket activation, cgroup management).",
    explanation: "Systemd is backwards compatible with many init scripts but replaces `/sbin/init` with a symlink to systemd.",
    hint: "file /sbin/init",
    level: "basic",
    codeExample: "systemctl --version"
  },
  {
    question: "What is a 'runlevel' and how does systemd replace it?",
    shortAnswer: "Runlevels are states (0-6) in SysV init; systemd uses 'targets' (multi-user.target, graphical.target, etc.).",
    explanation: "Runlevel 3 is multi-user, 5 is graphical. Systemd targets are more flexible and allow parallel activation.",
    hint: "systemctl list-units --type=target",
    level: "intermediate",
    codeExample: "systemctl get-default"
  },
  {
    question: "Can init be used to restart a crashed daemon automatically?",
    shortAnswer: "SysV init does not auto-restart by default; systemd can (Restart=always in unit file).",
    explanation: "Systemd tracks service processes and restarts them if configured, which is a major improvement over SysV.",
    hint: "systemctl cat sshd | grep Restart",
    level: "advanced",
    codeExample: "systemctl show -p Restart sshd"
  },
  {
    question: "What does 'reparenting' mean in process context?",
    shortAnswer: "Changing a process's parent PID (PPID) to another process (usually init).",
    explanation: "Kernel performs reparenting automatically when a parent exits. The new parent becomes the reaper.",
    hint: "Observe PPID before and after parent death using `ps`.",
    level: "intermediate",
    codeExample: "while true; do ps -o pid,ppid,comm -p $child_pid; sleep 1; done"
  },
  {
    question: "What is the relationship between init and /proc/1/",
    shortAnswer: "/proc/1/ is the process information directory for init, containing memory maps, file descriptors, etc.",
    explanation: "You can inspect what init is doing (open files, environment, etc.) with ls /proc/1/",
    hint: "sudo cat /proc/1/cmdline",
    level: "basic",
    codeExample: "sudo ls -l /proc/1/fd"
  },
  {
    question: "How to change the init system on a running Linux?",
    shortAnswer: "You cannot replace init without rebooting. Switching distros or using a different init requires reinstallation or major surgery.",
    explanation: "Some distributions provide alternatives (e.g., Devuan uses SysV instead of systemd), but it's a fundamental system change.",
    hint: "Boot with init=/path/to/other/init as a one‑time test.",
    level: "expert",
    codeExample: "sudo apt install sysvinit-core  # risk"
  },
  {
    question: "What is the 'control group' (cgroup) role of init?",
    shortAnswer: "Systemd (as PID 1) is the root of the cgroup tree and manages resource limits for all processes.",
    explanation: "Cgroups allow init to track and limit memory, CPU, and I/O for groups of processes. Systemd uses this to implement service isolation.",
    hint: "systemd-cgls",
    level: "expert",
    codeExample: "cat /proc/self/cgroup"
  },
  {
    question: "What is a 'zombie reaper' in Linux?",
    shortAnswer: "A process that calls wait() to clean up terminated children – by default init, but any subreaper qualifies.",
    explanation: "When a process becomes a subreaper, it inherits zombie orphans from its descendants.",
    hint: "man prctl",
    level: "expert",
    codeExample: "prctl(PR_SET_CHILD_SUBREAPER, 1); while (wait(NULL) > 0);"
  },
  {
    question: "Why does init ignore SIGTERM but not SIGINT?",
    shortAnswer: "Historical design: SIGTERM is considered 'polite kill' which init should ignore, while SIGINT triggers shutdown (Ctrl+Alt+Del).",
    explanation: "Modern systems (systemd) treat SIGTERM as a request to re-exec itself, not terminate.",
    hint: "kill -TERM 1  # systemd re-execs, not dies.",
    level: "advanced",
    codeExample: "sudo strace -p 1 -e signal"
  }
];

export default questions;