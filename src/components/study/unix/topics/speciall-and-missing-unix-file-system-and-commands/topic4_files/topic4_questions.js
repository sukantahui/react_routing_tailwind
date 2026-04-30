// topic4_questions.js - 30 questions about file timestamps (atime, mtime, ctime)

const questions = [
  {
    question: "What does atime stand for and when is it updated?",
    shortAnswer: "Access time – updated when the file is read (e.g., `cat`, `less`, `head`).",
    explanation: "The kernel updates atime whenever a process opens the file for reading. This can be disabled with `noatime` mount option to improve performance.",
    hint: "Think 'last time someone looked at this file'.",
    level: "basic",
    codeExample: "cat file.txt   # updates atime"
  },
  {
    question: "What does mtime represent?",
    shortAnswer: "Modification time – the last time the file's content was changed.",
    explanation: "Updates when data is written to the file (e.g., `echo >> file`, `vi`, `cp`). This is the default timestamp shown by `ls -l`.",
    hint: "mtime = 'content modified'.",
    level: "basic",
    codeExample: "echo 'new' >> file   # updates mtime"
  },
  {
    question: "What is ctime and what triggers its update?",
    shortAnswer: "Change time – updates when file metadata changes (permissions, ownership, link count) OR when atime/mtime change.",
    explanation: "ctime is not 'creation time'; it's 'status change time'. It always becomes current time whenever any inode metadata changes, including changes to atime or mtime.",
    hint: "ctime changes even if you only read a file (atime updates) unless noatime mount.",
    level: "intermediate",
    codeExample: "chmod 644 file   # updates ctime only"
  },
  {
    question: "Which `ls` option shows atime?",
    shortAnswer: "`ls -lu`",
    explanation: "The `-u` flag sorts by access time and displays it. For just displaying without sorting, `ls -l --time=atime` (GNU) or `ls -lu`.",
    hint: "u for 'access' (maybe historical).",
    level: "basic",
    codeExample: "ls -lu"
  },
  {
    question: "Which `ls` option shows ctime?",
    shortAnswer: "`ls -lc`",
    explanation: "`-c` sorts and displays by status change time (ctime).",
    hint: "c for 'change'.",
    level: "basic",
    codeExample: "ls -lc"
  },
  {
    question: "What command shows all three timestamps in human-readable detail?",
    shortAnswer: "`stat filename`",
    explanation: "`stat` displays atime, mtime, ctime, and additional metadata like birth time (if supported).",
    hint: "`stat` is available on Linux and BSD.",
    level: "basic",
    codeExample: "stat /etc/passwd"
  },
  {
    question: "Does `chmod 755 file` change atime?",
    shortAnswer: "No, it changes only ctime (metadata change).",
    explanation: "Permissions are metadata, so only ctime updates. atime and mtime remain as they were.",
    hint: "Use `stat` before and after to verify.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Does `cat file > /dev/null` change ctime?",
    shortAnswer: "Yes, because atime changes, which is metadata, so ctime also updates (on most systems).",
    explanation: "Even though only atime was meant to change, the kernel treats the update to atime as a metadata change, thus ctime also updates to the current time.",
    hint: "This surprises beginners – ctime is not independent.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How can you disable atime updates to improve performance?",
    shortAnswer: "Mount the filesystem with the `noatime` option (or `relatime` which is default on many Linux systems).",
    explanation: "`noatime` completely disables atime updates; `relatime` updates atime only if previous atime < mtime or ctime, reducing writes.",
    hint: "Check `/etc/fstab` or use `mount -o remount,noatime /mountpoint`.",
    level: "advanced",
    codeExample: "mount -o remount,noatime /home"
  },
  {
    question: "What happens to timestamps when you move a file within the same filesystem (`mv file newdir/`)?",
    shortAnswer: "atime and mtime stay the same; ctime changes because the directory entry (metadata) is updated.",
    explanation: "The inode remains unchanged, but the directory entry is modified (the file's path changed), so ctime updates.",
    hint: "Use `stat` before and after move.",
    level: "intermediate",
    codeExample: "mv file1 file2   # ctime changes"
  },
  {
    question: "Does copying a file with `cp` preserve timestamps?",
    shortAnswer: "By default, no; it sets new timestamps (atime, mtime, ctime to copy time). Use `cp -p` to preserve timestamps.",
    explanation: "`cp -p` preserves mtime and atime (and ownership if possible). ctime will be the copy time because it's a new file.",
    hint: "`rsync -t` also preserves mtime.",
    level: "basic",
    codeExample: "cp -p source dest"
  },
  {
    question: "What is the difference between mtime and ctime when you rename a file?",
    shortAnswer: "mtime unchanged (content untouched); ctime changes because metadata (filename) changed.",
    explanation: "Renaming only updates the directory entry, which is metadata, so only ctime updates.",
    hint: "Important for backup software that uses mtime for incremental backups – renaming won't trigger a re-backup.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can a user directly set ctime to an arbitrary value?",
    shortAnswer: "No, ctime is managed by the kernel and reflects the last time metadata changed. Only system calls that change metadata can affect it.",
    explanation: "There is no system call to set ctime arbitrarily; it's a side effect. This prevents tampering with audit trails.",
    hint: "ctime is sometimes used in forensics to detect file tampering.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What does `find -mtime +5` mean?",
    shortAnswer: "Find files whose modification time is more than 5 days ago (strictly older than 5*24 hours).",
    explanation: "`+5` means > 5 days, `-5` means < 5 days, `5` means exactly 5 days (within the last 24 hours after 5 days ago).",
    hint: "`-mtime 0` means within last 24 hours.",
    level: "intermediate",
    codeExample: "find /var/log -mtime +30"
  },
  {
    question: "What does `find -atime -1` do?",
    shortAnswer: "Finds files accessed less than 24 hours ago.",
    explanation: "Useful for identifying recently read files. But beware of `noatime` mounts which may not update atime.",
    hint: "Combine with `-type f` to restrict to regular files.",
    level: "intermediate",
    codeExample: "find . -atime -1 -type f"
  },
  {
    question: "What is the difference between `find -ctime` and `find -mtime`?",
    shortAnswer: "`-ctime` checks status change time; `-mtime` checks content modification time.",
    explanation: "`-ctime` will match files whose metadata (permissions, ownership, link count, or any timestamp) changed. Useful for detecting permission changes or moves.",
    hint: "Use `-ctime` for security monitoring.",
    level: "advanced",
    codeExample: "find /bin -ctime -1   # binaries whose metadata changed recently"
  },
  {
    question: "Why does `ls -l` sometimes show different dates for old files?",
    shortAnswer: "By default, `ls -l` shows mtime. For very old files, year is shown instead of time to save space.",
    explanation: "`ls` uses a compact format: for files modified within last 6 months, it shows time; otherwise shows year.",
    hint: "Use `ls -l --full-time` to see full timestamps.",
    level: "basic",
    codeExample: "ls -l --full-time file"
  },
  {
    question: "What is the birth time (btime) of a file?",
    shortAnswer: "The creation time of the file; not POSIX, but supported by some filesystems (ext4, XFS, ZFS).",
    explanation: "Not all filesystems store creation time; Linux `stat` shows 'Birth' if available. Use `stat -c %w` to print.",
    hint: "Birth time is also called 'crtime'.",
    level: "advanced",
    codeExample: "stat --format='%w' file"
  },
  {
    question: "Does `touch` change ctime?",
    shortAnswer: "Yes, because it changes atime and/or mtime, which are metadata, so ctime updates as well.",
    explanation: "Even if you use `touch -a` or `touch -m`, ctime will become the current time because you are modifying timestamps.",
    hint: "There is no way to change atime or mtime without also changing ctime.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What happens to ctime when you create a hard link?",
    shortAnswer: "ctime of the original file changes because the link count (metadata) increases.",
    explanation: "The inode's nlink field is metadata, so any change (link or unlink) updates ctime.",
    hint: "`ln file hardlink` then `stat file` – ctime is newer.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you find files that have been accessed in the last 10 minutes?",
    shortAnswer: "`find . -amin -10` (minutes) or `find . -atime -0.0069` using decimals (but better to use `-amin`).",
    explanation: "`-amin` finds accessed minutes ago. `-cmin` for ctime, `-mmin` for mtime.",
    hint: "`-amin` is GNU find; POSIX only has `-atime`.",
    level: "intermediate",
    codeExample: "find /tmp -amin -10"
  },
  {
    question: "Does `mv` across filesystems preserve timestamps?",
    shortAnswer: "When moving across filesystems, `mv` actually copies then deletes; the new file gets current timestamps (atime, mtime, ctime all set to copy time).",
    explanation: "Cross-device move is not atomic; it's a copy+delete, so the destination is a new inode. Use `cp -p && rm` to preserve mtime/atime.",
    hint: "Check `df .` to see if source and destination are same filesystem.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What does `stat -c %Y file` output?",
    shortAnswer: "The modification time (mtime) in seconds since the Unix epoch (1970-01-01 UTC).",
    explanation: "Useful for scripting comparisons. `%X` atime, `%Y` mtime, `%Z` ctime.",
    hint: "Example: `now=$(date +%s); mtime=$(stat -c %Y file); diff=$((now - mtime))`.",
    level: "advanced",
    codeExample: "stat -c '%Y' myfile"
  },
  {
    question: "Why might `ls -lu` show the same time as `ls -l` for a recently modified file?",
    shortAnswer: "Because after modification, mtime and atime could be close, but more likely atime may not be updated if `noatime` is set, or if the file was just created, all times are the same.",
    explanation: "When a file is created, all three timestamps are set to the creation time. As you read/modify, they diverge.",
    hint: "Create a new file and immediately run both commands.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the purpose of `noatime` mount option?",
    shortAnswer: "Disables updating access times on files, reducing disk writes and improving performance.",
    explanation: "On busy servers, atime updates can cause significant I/O. `relatime` is a compromise: update atime only if it's older than mtime or ctime.",
    hint: "Check current mount options with `mount | grep noatime`.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Does `rsync` preserve timestamps by default?",
    shortAnswer: "No, `rsync` preserves timestamps only with the `-t` (or `-a` which implies `-t`) option.",
    explanation: "`-a` (archive) preserves permissions, ownership, timestamps, etc. Without it, timestamps are set to transfer time.",
    hint: "Always use `-a` when making backups to preserve timestamps.",
    level: "intermediate",
    codeExample: "rsync -av source/ dest/"
  },
  {
    question: "What happens to ctime when a file is truncated with `> file`?",
    shortAnswer: "The file's mtime and ctime update to current time (content changed). atime may also change depending on how the shell opens the file.",
    explanation: "Truncation changes file size, which is content change, so mtime updates; ctime follows.",
    hint: "`> file` is equivalent to `cat /dev/null > file`.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you list files in order of their last access time (most recent first)?",
    shortAnswer: "`ls -ltu` – `-t` sorts by time, `-u` uses atime.",
    explanation: "Combine `-t` (sort by time) with `-u` (use atime) and optionally `-r` for reverse.",
    hint: "`ls -ltr` sorts by mtime oldest first.",
    level: "intermediate",
    codeExample: "ls -ltu"
  },
  {
    question: "What is the difference between `ctime` and `mtime` when you change a file's content?",
    shortAnswer: "Both update to the current time. mtime records content change; ctime records that metadata (mtime) changed.",
    explanation: "Any change to content updates mtime, and because mtime is metadata, ctime also updates. They will be identical if done in the same operation.",
    hint: "They diverge only if metadata changes without content change (e.g., chmod).",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What does the `-newer` test in `find` do?",
    shortAnswer: "Finds files newer than a reference file: `find . -newer ref.txt` finds files with mtime later than ref.txt's mtime.",
    explanation: "There are also `-newerXY` variants: `-newerat`, `-newermt`, `-newerct` for comparing specific timestamps.",
    hint: "Useful for incremental backups: `find . -newer last_backup.txt`.",
    level: "advanced",
    codeExample: "find . -type f -newermt '2024-01-01'"
  }
];

export default questions;