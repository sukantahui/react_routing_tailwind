// topic1_questions.js - 30 questions about Unix File System Structure

const questions = [
  {
    question: "What is the root directory in Unix?",
    shortAnswer: "The topmost directory, denoted by `/`.",
    explanation: "All files and directories are descendants of the root directory. Unlike Windows, Unix has no drive letters; everything is under `/`.",
    hint: "Think of `/` as the trunk of a tree.",
    level: "basic",
    codeExample: "cd /"
  },
  {
    question: "What is the difference between an absolute and a relative path?",
    shortAnswer: "Absolute starts from root (`/home/user/file`); relative starts from current directory (`docs/file`).",
    explanation: "Absolute paths always begin with `/`. Relative paths never start with `/` and are resolved relative to the current working directory.",
    hint: "Use `pwd` to see current directory, then try both types.",
    level: "basic",
    codeExample: "cd /var/log    # absolute\ncd log          # relative if /var/log is current"
  },
  {
    question: "What is an inode?",
    shortAnswer: "A data structure storing file metadata (permissions, timestamps, block pointers) but not the filename.",
    explanation: "Inodes are identified by numbers unique within a filesystem. Directories map filenames to inode numbers. The `ls -i` command shows inode numbers.",
    hint: "The inode is the 'real' file; filenames are just labels.",
    level: "intermediate",
    codeExample: "stat myfile.txt"
  },
  {
    question: "What is the difference between a hard link and a symbolic link?",
    shortAnswer: "Hard link = extra directory entry pointing to same inode; symlink = special file containing a path.",
    explanation: "Hard links cannot cross filesystems or link to directories (except . and ..). Symlinks can point to anything, but become dangling if target is deleted.",
    hint: "Hard links are like identical twins; symlinks are like shortcuts.",
    level: "intermediate",
    codeExample: "ln target hardlink   # hard\nln -s target symlink # symlink"
  },
  {
    question: "Name three standard directories under `/` and their purposes.",
    shortAnswer: "/bin (essential binaries), /etc (configuration files), /home (user home directories).",
    explanation: "/var (variable data like logs), /usr (user programs and data), /tmp (temporary files). Each directory follows the Filesystem Hierarchy Standard (FHS).",
    hint: "Check `man hier` for the full hierarchy.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the `/proc` filesystem?",
    shortAnswer: "A virtual filesystem providing process and kernel information as files.",
    explanation: "/proc contains runtime system information (e.g., /proc/cpuinfo, /proc/meminfo, /proc/[pid]/). It exists only in memory.",
    hint: "Try `cat /proc/version` to see kernel version.",
    level: "intermediate",
    codeExample: "cat /proc/self/status"
  },
  {
    question: "What does the `df` command show?",
    shortAnswer: "Disk free space – filesystem disk usage and available space.",
    explanation: "`df -h` shows human‑readable sizes. It reports total, used, available, and mount points for each mounted filesystem.",
    hint: "Use `df -i` to check inode usage (can run out even if disk has space).",
    level: "basic",
    codeExample: "df -h"
  },
  {
    question: "What is the `du` command used for?",
    shortAnswer: "Estimates file and directory space usage.",
    explanation: "`du -sh */` shows total size of each subdirectory. It sums sizes of all files inside.",
    hint: "`du -h --max-depth=1` is equivalent to `du -sh */`.",
    level: "basic",
    codeExample: "du -sh ~"
  },
  {
    question: "What is a mount point?",
    shortAnswer: "A directory where an additional filesystem is attached to the root tree.",
    explanation: "For example, an external USB drive might be mounted at `/mnt/usb`. After mounting, the drive's contents appear under that directory.",
    hint: "Use `mount` without arguments to see all mounted filesystems.",
    level: "intermediate",
    codeExample: "mount /dev/sdb1 /mnt/data"
  },
  {
    question: "What does the `find` command do in the context of the filesystem?",
    shortAnswer: "Searches for files/directories matching criteria (name, size, type, etc.).",
    explanation: "`find` traverses directory trees and can execute commands on found items. It is extremely powerful for batch operations.",
    hint: "Always test with `-print` before adding `-delete`.",
    level: "intermediate",
    codeExample: "find /home -name \"*.pdf\" -size +10M"
  },
  {
    question: "What is the difference between `/tmp` and `/var/tmp`?",
    shortAnswer: "/tmp is usually cleared on reboot; /var/tmp persists across reboots.",
    explanation: "Both are for temporary files, but /var/tmp is more persistent. Best practice: use /tmp for short‑lived data, /var/tmp for data that should survive a reboot.",
    hint: "Check your distribution's tmpfiles.d configuration.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is a ‘sticky bit’ and where is it commonly used?",
    shortAnswer: "A permission that restricts file deletion in a directory to the file owner, directory owner, or root.",
    explanation: "Common on `/tmp` (mode 1777). Without sticky bit, any user could delete any file in a world‑writable directory.",
    hint: "`ls -ld /tmp` shows `drwxrwxrwt` – the `t` indicates sticky bit.",
    level: "advanced",
    codeExample: "chmod +t shared_dir/"
  },
  {
    question: "What is the maximum number of hard links to a file?",
    shortAnswer: "Filesystem dependent (often 65,000). Directories cannot have hard links except `.` and `..`.",
    explanation: "Each hard link increments the link count in the inode. When count reaches zero, the file is deleted.",
    hint: "Use `ln` to create more links and `ls -l` to see link count.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why can't you create a hard link to a directory?",
    shortAnswer: "To avoid circular references and complexities in filesystem traversal.",
    explanation: "Most Unix filesystems forbid hard links to directories except the special `.` and `..` entries. Symbolic links should be used for directories instead.",
    hint: "`ln -d` is not allowed on most systems.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the Filesystem Hierarchy Standard (FHS)?",
    shortAnswer: "A standard defining the structure and content of Unix directories.",
    explanation: "FHS ensures that applications can predict where to find binaries, libraries, configuration, and data across different Unix-like systems.",
    hint: "Read `man hier` for a summary.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the purpose of the `/lost+found` directory?",
    shortAnswer: "Stores recovered file fragments after a filesystem check (fsck).",
    explanation: "When the filesystem is corrupted, `fsck` moves orphaned inodes and data into `lost+found` with numeric names. Usually empty on healthy systems.",
    hint: "Only root can read it.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How does the `ln` command behave with existing target?",
    shortAnswer: "If the target exists and is a file, `ln` creates a hard link (new name). If target is a directory, it creates links inside it (by default).",
    explanation: "Use `ln -f` to force replacement, or `ln -n` to treat a symlink as a normal file.",
    hint: "Check `man ln` for edge cases.",
    level: "advanced",
    codeExample: "ln existing_file new_link"
  },
  {
    question: "What is the difference between `rm` and `unlink`?",
    shortAnswer: "`rm` is a command that can remove many files/directories; `unlink` is a system call/command that removes a single file (and cannot remove directories).",
    explanation: "`unlink()` system call removes a directory entry. The `unlink` command is a thin wrapper around it.",
    hint: "`rm` uses `unlink()` for regular files.",
    level: "expert",
    codeExample: "unlink myfile.txt"
  },
  {
    question: "What does `mount --bind` do?",
    shortAnswer: "Mounts a directory tree at another point, making it appear in two locations simultaneously.",
    explanation: "Useful for chroots, containers, or making a subtree accessible elsewhere without copying.",
    hint: "Example: `mount --bind /home/swadeep /mnt/backup_swadeep`.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a ‘dangling symlink’?",
    shortAnswer: "A symbolic link whose target no longer exists.",
    explanation: "It still exists as a file, but attempts to read/write will fail with `No such file or directory`.",
    hint: "Use `find -L` to locate dangling symlinks.",
    level: "intermediate",
    codeExample: "find . -type l -xtype l"
  },
  {
    question: "How can you find all files with a specific inode number?",
    shortAnswer: "`find / -inum <inode> 2>/dev/null`",
    explanation: "This searches the entire filesystem (excluding permission errors) for any directory entry referencing that inode.",
    hint: "Works only within the same filesystem; use `-xdev` to stay on one filesystem.",
    level: "advanced",
    codeExample: "find /home -inum 12345"
  },
  {
    question: "What is the `stat` command used for?",
    shortAnswer: "Displays detailed inode information (size, permissions, timestamps, link count, etc.).",
    explanation: "`stat` is more comprehensive than `ls -l` for a single file. Useful for debugging timestamps and permission issues.",
    hint: "Try `stat .` for current directory.",
    level: "basic",
    codeExample: "stat /etc/passwd"
  },
  {
    question: "What is the difference between `/bin` and `/usr/bin` in traditional Unix?",
    shortAnswer: "/bin contained essential binaries needed in single‑user mode; /usr/bin held non‑essential user binaries.",
    explanation: "Many modern distributions merge them into `/usr/bin` (with `/bin` a symlink to `/usr/bin`).",
    hint: "Check `ls -l /bin` on your system.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the purpose of the `/sbin` directory?",
    shortAnswer: "System binaries – essential for booting, recovery, and system administration (e.g., fdisk, mkfs, ifconfig).",
    explanation: "Usually only root can execute these. Some modern systems symlink `/sbin` to `/usr/sbin`.",
    hint: "These are for system maintenance, not normal user commands.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you check which filesystem a particular directory belongs to?",
    shortAnswer: "Use `df -h /path/to/dir` or `findmnt /path/to/dir`.",
    explanation: "`df` shows the mount point and filesystem type. Useful for understanding where disk space is consumed.",
    hint: "`df -T` also shows filesystem type (ext4, xfs, etc.).",
    level: "intermediate",
    codeExample: "df -h /var/log"
  },
  {
    question: "What is the purpose of the `/dev` directory?",
    shortAnswer: "Contains device files that represent hardware devices (disk, terminal, random number generator).",
    explanation: "Interacting with these files (read, write, ioctl) communicates with device drivers. For example, `/dev/sda` is the first SCSI/SATA disk.",
    hint: "`ls -l /dev` shows major/minor numbers.",
    level: "intermediate",
    codeExample: "cat /dev/urandom | head -c 10"
  },
  {
    question: "What is the difference between a block device and a character device?",
    shortAnswer: "Block devices (e.g., disks) transfer data in fixed blocks; character devices (e.g., terminals) transfer byte streams.",
    explanation: "Block devices support random access and buffering; character devices are sequential. The `ls -l` first character is `b` or `c`.",
    hint: "`/dev/sda` is block; `/dev/tty` is character.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the `/run` directory used for?",
    shortAnswer: "Runtime variable data; replaced `/var/run` on many systems. It is tmpfs (in memory).",
    explanation: "Stores PID files, socket files, and other transient system data. Cleared on reboot.",
    hint: "Check `man hier` for /run.",
    level: "advanced",
    codeExample: "ls /run"
  },
  {
    question: "What does the `chroot` command do?",
    shortAnswer: "Changes the root directory for a process and its children to a specified directory.",
    explanation: "Used to create a ‘jail’ or for recovery environments. It restricts access to the rest of the filesystem.",
    hint: "Requires root privileges.",
    level: "expert",
    codeExample: "chroot /newroot /bin/bash"
  }
];

export default questions;