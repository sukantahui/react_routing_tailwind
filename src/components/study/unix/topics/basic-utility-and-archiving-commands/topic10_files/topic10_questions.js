const questions = [
  {
    question: "What does the `tar` command do?",
    shortAnswer: "Archives multiple files and directories into a single file (tarball), preserving metadata.",
    explanation: "Tar stands for Tape ARchiver. It does not compress by default but can be combined with compressors.",
    hint: "Think of it as a 'suitcase' for files.",
    level: "basic",
    codeExample: "tar -cf archive.tar file1 file2/"
  },
  {
    question: "How do you create a tar archive?",
    shortAnswer: "`tar -cf archive.tar files...` (c = create, f = file).",
    explanation: "Always include `-f` followed by the archive name.",
    hint: "Order matters: `-f` must be followed by the archive name.",
    level: "basic",
    codeExample: "tar -cf backup.tar documents/ photos/"
  },
  {
    question: "How do you extract a tar archive?",
    shortAnswer: "`tar -xf archive.tar` (x = extract).",
    explanation: "Use `-v` for verbose output, `-C` to extract to a different directory.",
    hint: "`tar -xvf archive.tar` shows progress.",
    level: "basic",
    codeExample: "tar -xf archive.tar -C /destination/"
  },
  {
    question: "What is the purpose of the `-z` option in tar?",
    shortAnswer: "Compress the archive using gzip (creates `.tar.gz` or `.tgz`).",
    explanation: "`-z` filters the archive through gzip, both for creation and extraction.",
    hint: "Combine `-czf` to create compressed archive.",
    level: "intermediate",
    codeExample: "tar -czf archive.tar.gz documents/"
  },
  {
    question: "How do you list contents of a tar archive without extracting?",
    shortAnswer: "`tar -tf archive.tar` (t = list).",
    explanation: "Add `-v` for detailed listing (permissions, size, date).",
    hint: "`tar -tvf archive.tar | less`",
    level: "basic",
    codeExample: "tar -tf archive.tar"
  },
  {
    question: "What is the difference between `tar -czf` and `tar -cjf`?",
    shortAnswer: "`-z` uses gzip compression (.tar.gz); `-j` uses bzip2 compression (.tar.bz2).",
    explanation: "bzip2 typically compresses better but slower. Also `-J` for xz (.tar.xz).",
    hint: "Choose `-j` for best compression, `-z` for speed and compatibility.",
    level: "intermediate",
    codeExample: "tar -cjf better.tar.bz2 largefile"
  },
  {
    question: "How do you extract a specific file from a tar archive?",
    shortAnswer: "`tar -xf archive.tar path/to/file`",
    explanation: "Provide the exact path as listed by `tar -tf`.",
    hint: "Use `tar -xf archive.tar --wildcards '*.txt'` for patterns.",
    level: "advanced",
    codeExample: "tar -xf backup.tar documents/readme.txt"
  },
  {
    question: "How can you exclude files when creating a tar archive?",
    shortAnswer: "Use `--exclude=pattern` multiple times or `-X` with a file list.",
    explanation: "Patterns are shell-style wildcards.",
    hint: "`tar -czf backup.tar.gz /home --exclude=*.mp4 --exclude=*.tmp`",
    level: "advanced",
    codeExample: "tar -czf archive.tar --exclude='*.log' ."
  },
  {
    question: "Why do I get 'tar: Removing leading `/' from member names'?",
    shortAnswer: "Tar removes absolute path root by default to prevent accidental overwrites.",
    explanation: "To keep absolute paths, use `-P` (--absolute-names), but it's risky.",
    hint: "Change to directory first: `cd /path && tar -cf archive.tar .`",
    level: "intermediate",
    codeExample: "tar -cf archive.tar -C /home/user ."
  },
  {
    question: "How do you append files to an existing tar archive?",
    shortAnswer: "Use `-r` (append) option: `tar -rf archive.tar newfile.txt`",
    explanation: "Cannot append to compressed archives (`.tar.gz` etc.) – decompress first.",
    hint: "Only works on uncompressed tar archives.",
    level: "expert",
    codeExample: "tar -rf backup.tar additional.txt"
  },
  {
    question: "What does `tar -u` do?",
    shortAnswer: "Updates archive by appending files that are newer than those in the archive.",
    explanation: "Useful for incremental backups without full re-archiving.",
    hint: "Only for uncompressed archives.",
    level: "expert",
    codeExample: "tar -uf backup.tar changed_file.txt"
  },
  {
    question: "How do you extract without overwriting existing files?",
    shortAnswer: "Use `--keep-old-files` or `--skip-old-files` flag.",
    explanation: "Prevents tar from overwriting files on disk.",
    hint: "Different tar versions may have `-k` (keep).",
    level: "advanced",
    codeExample: "tar -xf archive.tar --skip-old-files"
  },
  {
    question: "How do you preserve file permissions when extracting tar?",
    shortAnswer: "Use `-p` (--preserve-permissions) or extract as root.",
    explanation: "Without `-p`, extracted files get default umask permissions.",
    hint: "Crucial for system backups and restoring home directories.",
    level: "intermediate",
    codeExample: "tar -xpf backup.tar"
  },
  {
    question: "What is a snapshot file in tar?",
    shortAnswer: "A file used with `--listed-incremental` to track changes for incremental backups.",
    explanation: "Tar stores metadata about files, then later only backs up changed files.",
    hint: "`tar -czg snapshot.snar -f level1.tar.gz .` creates incremental backup.",
    level: "expert",
    codeExample: "tar -czf backup0.tar.gz --listed-incremental=backup.snar ."
  },
  {
    question: "How can you create a tar archive from a list of files in a text file?",
    shortAnswer: "Use `-T` or `--files-from`: `tar -czf archive.tar -T filelist.txt`",
    explanation: "Each line in filelist.txt is a file/directory to archive.",
    hint: "Useful when file list is generated by `find`.",
    level: "advanced",
    codeExample: "find . -name '*.log' > logs.txt; tar -czf logs.tar.gz -T logs.txt"
  },
  {
    question: "Can tar archive or extract to/from stdout?",
    shortAnswer: "Yes, specify `-f -` to use stdin/stdout.",
    explanation: "Common in pipelines: `tar -cf - . | ssh host 'tar -xf -'`",
    hint: "This is how remote backups work.",
    level: "expert",
    codeExample: "tar -czf - documents/ | ssh user@host 'cat > remote.tar.gz'"
  },
  {
    question: "What is the difference between `tar -xzf` and `tar -xvf`?",
    shortAnswer: "`-z` decompresses gzip; `-v` verbose; they can be combined.",
    explanation: "`tar -xzf` for .tar.gz; `-xjf` for .tar.bz2; `-xvf` for uncompressed with verbosity.",
    hint: "Always match compression flag when extracting.",
    level: "basic",
    codeExample: "tar -xzvf archive.tar.gz"
  },
  {
    question: "How do you verify a tar archive after creation?",
    shortAnswer: "Use `tar -tvf archive.tar` to list contents and compare, or `tar -df` to compare with disk.",
    explanation: "`-d` (diff) compares archive with filesystem.",
    hint: "`tar -df archive.tar` shows differences.",
    level: "advanced",
    codeExample: "tar -dvf backup.tar && echo 'OK'"
  },
  {
    question: "Why does tar sometimes produce 'Cannot create symlink' errors?",
    shortAnswer: "Usually when extracting as non-root and symlink target is outside extraction directory.",
    explanation: "Tar respects symlinks; if target doesn't exist or permissions deny, error occurs.",
    hint: "Use `--absolute-names` or check symlink targets.",
    level: "advanced",
    codeExample: "tar -xhf archive.tar   # avoid extracting symlinks as files"
  },
  {
    question: "How do you extract an archive while stripping leading path components?",
    shortAnswer: "Use `--strip-components=N` to remove N leading directories.",
    explanation: "Example: archive contains `./home/user/file.txt`; `--strip-components=2` extracts as `file.txt`.",
    hint: "Useful for flattening tarballs.",
    level: "expert",
    codeExample: "tar -xzf archive.tar --strip-components=1 -C /target"
  },
  {
    question: "What is the maximum file size tar can handle?",
    shortAnswer: "Modern tar (GNU) supports large files > 4GB, up to filesystem limits.",
    explanation: "UID/GID > 8M? Extended POSIX headers (pax) support large values.",
    hint: "Use `--format=posix` or `--format=gnu` for large files.",
    level: "expert",
    codeExample: "tar --format=posix -cf large.tar hugefile.dat"
  },
  {
    question: "How can you compress a tar archive using multiple CPUs?",
    shortAnswer: "Pipe tar output to parallel compressors like `pigz`, `pbzip2`, `xz -T`.",
    explanation: "`tar -cf - . | pigz -9 > archive.tar.gz`",
    hint: "Install `pigz` for faster gzip compression.",
    level: "expert",
    codeExample: "tar -cf - data/ | pigz -p 4 > parallel.tar.gz"
  },
  {
    question: "What is the purpose of `--checkpoint` in tar?",
    shortAnswer: "Prints progress messages every N records; useful for very large backups.",
    explanation: "`--checkpoint=1000` prints a dot every 1000 files.",
    hint: "Combine with `--checkpoint-action=echo` for custom messages.",
    level: "expert",
    codeExample: "tar -czf backup.tar.gz --checkpoint=1000 --checkpoint-action=echo='%u files' /home"
  },
  {
    question: "How do you create a tar archive that preserves SELinux contexts?",
    shortAnswer: "Use `--selinux` flag: `tar --selinux -cf archive.tar /path`",
    explanation: "Stores and restores SELinux security contexts.",
    hint: "Requires root or appropriate permissions.",
    level: "expert",
    codeExample: "tar --selinux -cf backup_with_selinux.tar /etc"
  },
  {
    question: "Can tar archive device files?",
    shortAnswer: "Yes, tar can archive block/character devices, FIFOs, sockets (with `--preserve-permissions`).",
    explanation: "Useful for backing up `/dev` but restore may require root.",
    hint: "Add `-p` to preserve special file types.",
    level: "expert",
    codeExample: "sudo tar -cpf dev_backup.tar /dev/null"
  },
  {
    question: "How do you generate a tarball of a directory but exclude version control directories?",
    shortAnswer: "`tar -czf project.tar.gz --exclude='.git' --exclude='.svn' project/`",
    explanation: "Multiple `--exclude` patterns or use `--exclude-vcs` (GNU tar).",
    hint: "`--exclude-vcs` is simpler.",
    level: "intermediate",
    codeExample: "tar -czf src.tar.gz --exclude-vcs myproject/"
  },
  {
    question: "What is the difference between `tar -x` and `tar -xvf`?",
    shortAnswer: "`-v` adds verbose output; `-x` extracts silently.",
    explanation: "Verbose shows each file as it's extracted.",
    hint: "Verbose useful for monitoring but slows down slightly.",
    level: "basic",
    codeExample: "tar -xf archive.tar   # silent\ntar -xvf archive.tar  # verbose"
  },
  {
    question: "How do you extract a single directory from a large tarball?",
    shortAnswer: "`tar -xf archive.tar path/to/dir`",
    explanation: "Tar will extract only that directory and its contents.",
    hint: "Use `tar -tf` to find the exact path first.",
    level: "intermediate",
    codeExample: "tar -xf backup.tar home/user/Documents"
  },
  {
    question: "Why do I get 'tar: Error exit delayed from previous errors'?",
    shortAnswer: "Some files were not archived due to permission errors or changes during archiving.",
    explanation: "Tar continues but returns a non-zero exit code. Check stderr for details.",
    hint: "Run with `--warning=no-file-changed` to ignore certain errors.",
    level: "advanced",
    codeExample: "tar -cf archive.tar . 2>&1 | grep 'cannot open'"
  },
  {
    question: "How can you create an encrypted tar archive?",
    shortAnswer: "Tar itself doesn't encrypt; pipe through `gpg`: `tar -czf - data | gpg -c > encrypted.tar.gz.gpg`",
    explanation: "Decrypt with `gpg -d encrypted.tar.gz.gpg | tar -xzf -`",
    hint: "`gpg -c` uses symmetric encryption; password is safe.",
    level: "expert",
    codeExample: "tar -czf - secret/ | gpg -c > secret.tar.gz.gpg"
  },
  {
    question: "What does the `--warning=no-timestamp` flag do?",
    shortAnswer: "Suppresses warnings when file timestamps changed during archiving.",
    explanation: "Tar normally warns if a file is modified after being read.",
    hint: "Useful for busy directories where you accept small inconsistencies.",
    level: "expert",
    codeExample: "tar -czf busy_backup.tar.gz --warning=no-file-changed /active/log"
  }
];

export default questions;