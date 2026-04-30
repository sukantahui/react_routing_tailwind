// topic7_questions.js - 30 questions about du and df commands

const questions = [
  {
    question: "What is the difference between `df` and `du`?",
    shortAnswer: "`df` reports file system block usage (including metadata, reserved blocks); `du` sums file sizes within a directory tree.",
    explanation: "`df` shows usage at the partition level, while `du` shows usage at the directory/file level. They can differ due to system metadata, open deleted files, and reserved space.",
    hint: "Think of `df` as the gas tank gauge (whole partition), `du` as measuring the volume of your luggage.",
    level: "basic",
    codeExample: "df -h / ; du -sh /home"
  },
  {
    question: "How do you display disk usage in human‑readable form (e.g., 4.2G, 12M)?",
    shortAnswer: "Use `df -h` or `du -h`.",
    explanation: "`-h` stands for 'human-readable'. It uses powers of 1024 (KiB, MiB, GiB). For powers of 1000 (KB, MB, GB), use `-H`.",
    hint: "`-h` is easier to read than raw block counts.",
    level: "basic",
    codeExample: "df -h"
  },
  {
    question: "What does `df -i` show?",
    shortAnswer: "Inode usage (total, used, free, percentage) instead of block usage.",
    explanation: "A filesystem can run out of inodes before it runs out of blocks (especially with many tiny files). `df -i` helps diagnose 'no space left' errors when `df -h` shows free blocks.",
    hint: "Inode exhaustion manifests as 'no space' even though `df` says free space remains.",
    level: "intermediate",
    codeExample: "df -i /home"
  },
  {
    question: "How do you check the total size of a directory (including all subdirectories)?",
    shortAnswer: "`du -sh /path/to/directory`",
    explanation: "`-s` (summary) gives a total; `-h` makes it human-readable. Omit `-s` to see per-subdirectory breakdown.",
    hint: "Add `--max-depth=1` to see immediate children sizes.",
    level: "basic",
    codeExample: "du -sh /var/log"
  },
  {
    question: "Why might `du` and `df` show different used space for the same filesystem?",
    shortAnswer: "`df` includes filesystem metadata (inodes, journal, superblock), reserved blocks (5% by default), and space used by deleted but still open files.",
    explanation: "`du` only counts blocks actually occupied by file data. The difference is usually small but can be significant on filesystems with many small files or active deleted files.",
    hint: "Run `lsof | grep deleted` to find open deleted files.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What does `du -s` do?",
    shortAnswer: "Displays only the total size for each argument, suppressing per‑file/subdirectory details.",
    explanation: "Useful for getting a quick total without listing all the subdirectories.",
    hint: "Often combined with `-h`: `du -sh`.",
    level: "basic",
    codeExample: "du -sh /home"
  },
  {
    question: "How can you find the largest directories in `/home`?",
    shortAnswer: "`du -sh /home/* | sort -h` or `du -sh /home/* | sort -rh | head -10` for top ten.",
    explanation: "`sort -h` handles human‑readable suffixes (K, M, G). Reverse with `-r`.",
    hint: "You can also use `ncdu` for an interactive view.",
    level: "intermediate",
    codeExample: "du -sh /var/* | sort -h"
  },
  {
    question: "What is the `--max-depth` option in `du`?",
    shortAnswer: "Limits the depth of directory recursion. `--max-depth=1` shows only immediate children.",
    explanation: "Prevents traversing millions of subdirectories. Useful for high‑level summaries.",
    hint: "`--max-depth=0` is equivalent to `-s`.",
    level: "intermediate",
    codeExample: "du -h --max-depth=2 /usr"
  },
  {
    question: "How do you check the total space used by all files with a specific extension (e.g., `.log`)?",
    shortAnswer: "`find . -name '*.log' -exec du -ch {} + | tail -1`",
    explanation: "`find` collects files, `du -c` gives grand total, `tail -1` extracts the total line.",
    hint: "Be careful with spaces in filenames; use `-print0` and `xargs -0` if needed.",
    level: "advanced",
    codeExample: "find /var/log -name '*.log' -exec du -ch {} + | grep total$"
  },
  {
    question: "What does the `-x` option do for `du` and `df`?",
    shortAnswer: "Restricts the command to a single file system; does not cross mount points.",
    explanation: "When you run `df -x tmpfs`, it excludes tmpfs filesystems. For `du`, `du -x /` will not descend into `/mnt` or `/home` if they are separate filesystems.",
    hint: "Useful to limit slow network filesystem traversal.",
    level: "advanced",
    codeExample: "du -shx /"
  },
  {
    question: "How do you make `df` display only certain columns?",
    shortAnswer: "Use `--output` option: `df -h --output=source,size,used,avail,pcent,target`",
    explanation: "GNU `df` allows customising output. Useful for scripting.",
    hint: "`df --help` shows column names.",
    level: "expert",
    codeExample: "df -h --output=target,pcent"
  },
  {
    question: "What is the default block size for `df` and `du`?",
    shortAnswer: "Typically 1024 bytes (1K) on most systems. Use `-k` for kilobytes, `-m` for megabytes, `-B` for custom.",
    explanation: "Without `-h`, numbers are shown in 1K blocks (KIBIBYTES). This historical default can be confusing.",
    hint: "Always use `-h` for human‑readable output.",
    level: "intermediate",
    codeExample: "df -k"
  },
  {
    question: "How can you exclude certain directories from `du` calculation?",
    shortAnswer: "Use `--exclude=PATTERN` (GNU du) or pipe through `grep -v`.",
    explanation: "Example: `du -sh --exclude='.git' --exclude='node_modules' .`",
    hint: "Multiple `--exclude` options are allowed.",
    level: "advanced",
    codeExample: "du -sh --exclude='*cache*' /home"
  },
  {
    question: "What does `du -a` do?",
    shortAnswer: "Shows disk usage for files as well as directories (normally `du` shows only directories).",
    explanation: "`-a` (all) lists every file, which can produce huge output on large trees.",
    hint: "Often used with `sort` to find largest files: `du -a | sort -nr | head -10`.",
    level: "intermediate",
    codeExample: "du -ah | sort -rh | head -10"
  },
  {
    question: "What is a ‘reserved block’ in `df` output?",
    shortAnswer: "A percentage of filesystem blocks reserved for root (typically 5%). Prevents ordinary users from filling the disk completely.",
    explanation: "`df` shows 'Available' as blocks free for non‑root users. Root can use the reserved blocks.",
    hint: "Change reserved percentage with `tune2fs -m` (for ext4).",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you check disk usage of a remote server?",
    shortAnswer: "Use `ssh` to run `df` or `du` remotely: `ssh user@server 'df -h'`.",
    explanation: "If you have NFS mounts, you can run `df` locally on the client. For du, it's usually faster to run on the server.",
    hint: "Avoid running `du` over NFS – it's extremely slow.",
    level: "intermediate",
    codeExample: "ssh admin@host 'du -sh /data'"
  },
  {
    question: "What is the purpose of `du -c`?",
    shortAnswer: "Displays a grand total at the end (like `--total`).",
    explanation: "`du -c file1 dir2` gives individual totals plus a grand summary line.",
    hint: "Combine with `-h` and `awk` to extract total.",
    level: "intermediate",
    codeExample: "du -ch *.log | tail -1"
  },
  {
    question: "How can you find files that are deleted but still occupy space?",
    shortAnswer: "`lsof | grep deleted` shows processes holding deleted files open.",
    explanation: "The space is not freed until all references are closed. Restart the process or kill it to release space.",
    hint: "Check `df` before/after killing the process.",
    level: "expert",
    codeExample: "sudo lsof | grep -i deleted"
  },
  {
    question: "What is the difference between `du -h` and `du -H`?",
    shortAnswer: "`-h` uses 1024‑based units (KiB, MiB, GiB); `-H` uses 1000‑based (KB, MB, GB).",
    explanation: "`-H` is the SI standard (powers of 10). Most users prefer `-h` because storage is traditionally marketed in binary, but disk manufacturers use SI.",
    hint: "`du -h` is more common in scripts.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you make `df` show only local filesystems (exclude network and pseudo filesystems)?",
    shortAnswer: "`df -x tmpfs -x devtmpfs -x nfs -x cifs -x fuseblk` or use `-l` (local) on some systems.",
    explanation: "`-l` (local) limits to local devices; not all versions support it. Explicit exclude is more portable.",
    hint: "Combine `-x` options to filter out virtual filesystems.",
    level: "advanced",
    codeExample: "df -h -x tmpfs -x devtmpfs"
  },
  {
    question: "What does `du --apparent-size` do?",
    shortAnswer: "Shows the actual number of bytes in each file, not the space allocated on disk (which may be larger due to block rounding).",
    explanation: "Due to block sizes (e.g., 4KB), a 1 byte file uses 4KB. `--apparent-size` shows 1, while default shows 4KB.",
    hint: "Useful for sparse files where apparent size is much smaller than allocated.",
    level: "advanced",
    codeExample: "du --apparent-size -h file"
  },
  {
    question: "How can you check disk usage on all mounted NFS shares?",
    shortAnswer: "`df -t nfs -h` (list only NFS type) or `df -h | grep ':/'`.",
    explanation: "NFS mounts often appear with `:/path` in the 'Filesystem' column.",
    hint: "Running `du` over NFS is slow; prefer `ssh` to the server.",
    level: "advanced",
    codeExample: "df -h -t nfs"
  },
  {
    question: "What is the `-B` option in `df`?",
    shortAnswer: "Sets block size. Example: `df -BM` shows sizes in megabytes (using 1,048,576 bytes).",
    explanation: "`-B` allows custom units: `K`, `M`, `G`, or a number. `df -B 4096` shows block count in 4K units.",
    hint: "Useful for scripts expecting specific block sizes.",
    level: "expert",
    codeExample: "df -B 1M"
  },
  {
    question: "Why does `df` show 'Used' + 'Available' not equal 'Size'?",
    shortAnswer: "Because of reserved blocks (for root) and metadata overhead (superblock, inodes, journal).",
    explanation: "Reserved blocks appear as part of 'Used' from root's perspective, but 'Available' excludes them for non‑root users.",
    hint: "Run `df -h` as root to see different 'Available'.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you find the total size of all files modified in the last 7 days?",
    shortAnswer: "`find /path -type f -mtime -7 -exec du -ch {} + | grep total$`",
    explanation: "The `-exec du -ch` sums sizes; pipe to `grep total` for the final line.",
    hint: "Add `-size` to filter by file size as well.",
    level: "expert",
    codeExample: "find . -type f -mtime -7 -exec du -ch {} + | tail -1"
  },
  {
    question: "What does the `-total` line in `du -c` represent?",
    shortAnswer: "The sum of all sizes for arguments passed to `du`.",
    explanation: "When you run `du -c file1 dir2`, you get per-item lines and a final 'total' line that includes everything.",
    hint: "Use `head -n -1` to remove total line.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you check disk usage of only the current directory (excluding subdirectories)?",
    shortAnswer: "`du -sh --max-depth=0` or simply `du -sh` (which shows current directory total, not children).",
    explanation: "`du -sh` on a directory shows the total size of that directory including all subdirectories. To see only immediate children, use `du -sh --max-depth=1 *`.",
    hint: "`du -sh .` sums everything under `.`; it does not list children.",
    level: "basic",
    codeExample: "du -sh --max-depth=0"
  },
  {
    question: "What is the fastest way to get the size of a directory without descending into subdirectories?",
    shortAnswer: "`stat --format='%s' directory` is fast but gives directory size (metadata), not content size.",
    explanation: "For content size, you must sum files; `du` is the right tool. There is no quick metadata‑only total for content.",
    hint: "`du` is optimized but still must traverse.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you view disk usage in a more interactive, visual way?",
    shortAnswer: "Use `ncdu` (NCurses Disk Usage).",
    explanation: "`ncdu` provides an interactive interface allowing navigation, sorting, and deletion. Install via package manager.",
    hint: "`ncdu` is not available by default; install with `sudo apt install ncdu`.",
    level: "advanced",
    codeExample: "ncdu /home"
  },
  {
    question: "What does `df --total` do?",
    shortAnswer: "Displays a grand total line at the end of the output, summing all filesystems displayed.",
    explanation: "Useful for summarizing across multiple mounts. Example: `df -h --total`.",
    hint: "Works with `-x` to exclude certain types.",
    level: "intermediate",
    codeExample: "df -h --total -x tmpfs"
  }
];

export default questions;