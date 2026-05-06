const questions = [
  {
    question: "What does `gzip` stand for and what does it do?",
    shortAnswer: "GNU zip – a file compression utility that reduces file size using DEFLATE algorithm.",
    explanation: "`gzip` compresses single files, replacing the original with a `.gz` extension by default.",
    hint: "It's similar to WinZip but command-line and standard on Unix.",
    level: "basic",
    codeExample: "gzip myfile.txt   # creates myfile.txt.gz"
  },
  {
    question: "How can you compress a file while keeping the original?",
    shortAnswer: "Use `gzip -k file` or `gzip -c file > file.gz`.",
    explanation: "`-k` (keep) is GNU extension; `-c` writes to stdout and you redirect to a new file.",
    hint: "`-k` is simpler; `-c` is portable.",
    level: "intermediate",
    codeExample: "gzip -k data.txt   # keeps data.txt and creates data.txt.gz"
  },
  {
    question: "What is the default compression level of `gzip`?",
    shortAnswer: "6 (range 1-9, where 1 is fastest, 9 is best compression).",
    explanation: "Level 6 balances speed and compression ratio. Higher levels use more CPU but produce smaller files.",
    hint: "`gzip -1` for quick compression, `-9` for archives.",
    level: "basic",
    codeExample: "gzip -9 largefile.txt   # best compression"
  },
  {
    question: "How do you decompress a `.gz` file?",
    shortAnswer: "Use `gunzip file.gz` or `gzip -d file.gz`.",
    explanation: "Both restore the original file and remove the `.gz` extension.",
    hint: "`gunzip` is equivalent to `gzip -d`.",
    level: "basic",
    codeExample: "gunzip archive.gz   # restores archive"
  },
  {
    question: "Why does `gzip` not compress directories?",
    shortAnswer: "`gzip` only compresses individual files; directories need to be archived first using `tar`.",
    explanation: "Combine `tar` and `gzip` to create `.tar.gz` archives.",
    hint: "Use `tar -czf archive.tar.gz directory/`.",
    level: "intermediate",
    codeExample: "tar -czf backup.tar.gz /home/user/data/"
  },
  {
    question: "How can you see the contents of a `.gz` file without decompressing?",
    shortAnswer: "Use `zcat file.gz` or `gzip -dc file.gz`.",
    explanation: "`zcat` outputs the decompressed data to stdout; `gzcat` on some systems.",
    hint: "Pipe to `less` for viewing: `zcat file.gz | less`.",
    level: "intermediate",
    codeExample: "zcat logfile.gz | grep 'error'"
  },
  {
    question: "What does `gzip -t` do?",
    shortAnswer: "Tests the integrity of a compressed file without decompressing it.",
    explanation: "Returns exit code 0 if the file is valid, non-zero if corrupt.",
    hint: "Use before deleting originals to ensure backup is valid.",
    level: "advanced",
    codeExample: "gzip -t important.gz && echo 'OK'"
  },
  {
    question: "How can you compress multiple files into a single `.gz`?",
    shortAnswer: "You cannot directly; you must first archive them with `tar`, then compress the tar.",
    explanation: "`tar` combines files into one stream; `gzip` compresses that stream.",
    hint: "`tar -czf archive.tar.gz file1 file2 file3`",
    level: "advanced",
    codeExample: "tar -czf allfiles.tar.gz *.txt"
  },
  {
    question: "What is the difference between `gzip` and `zip`?",
    shortAnswer: "`gzip` compresses single files; `zip` compresses multiple files into a single archive (with directory structure).",
    explanation: "`gzip` uses DEFLATE; `zip` also uses DEFLATE but includes file metadata and can store multiple entries.",
    hint: "`gzip` is common on Unix; `zip` is more cross-platform.",
    level: "intermediate",
    codeExample: "zip archive.zip file1 file2   # vs gzip file1; gzip file2"
  },
  {
    question: "How can you see the compression ratio achieved by `gzip`?",
    shortAnswer: "Use `gzip -l file.gz` or `gzip -v` during compression.",
    explanation: "`-l` lists compressed size, uncompressed size, ratio, and filename.",
    hint: "`gzip -l` works on `.gz` files only.",
    level: "intermediate",
    codeExample: "gzip -l data.gz"
  },
  {
    question: "Why does `gzip` sometimes produce a file larger than the original?",
    shortAnswer: "For very small files or already compressed data, the overhead of the gzip header and Huffman tables can outweigh savings.",
    explanation: "Compression works best on repetitive data; random or pre-compressed data may expand slightly.",
    hint: "Use `gzip` only on text, logs, or uncompressed formats.",
    level: "advanced",
    codeExample: "echo 'abc' | gzip > small.gz; ls -l small.gz   # may be larger"
  },
  {
    question: "How can you compress a file to a specific naming suffix?",
    shortAnswer: "Use `-S .suffix` or redirect output: `gzip -c file > file.custom`.",
    explanation: "The default suffix is `.gz`; you can change it but standard tools expect `.gz`.",
    hint: "Not recommended unless you have a specific need.",
    level: "expert",
    codeExample: "gzip -S .z file.txt   # creates file.txt.z"
  },
  {
    question: "What is `pigz` and how is it different from `gzip`?",
    shortAnswer: "`pigz` (parallel gzip) compresses using multiple threads for speed on multi-core systems.",
    explanation: "`pigz` produces the same format as `gzip` and is a drop-in replacement for faster compression.",
    hint: "Install `pigz` for large files on servers with many cores.",
    level: "expert",
    codeExample: "pigz -9 largefile.txt"
  },
  {
    question: "Can `gzip` compress from stdin and output to stdout?",
    shortAnswer: "Yes, `gzip -c` reads stdin and writes to stdout; often used in pipelines.",
    explanation: "Example: `tar cf - dir | gzip -c > dir.tar.gz`",
    hint: "This is how `tar -z` works internally.",
    level: "advanced",
    codeExample: "cat largefile.txt | gzip -c > file.gz"
  },
  {
    question: "How do you force `gzip` to overwrite existing output files?",
    shortAnswer: "Use `-f` (force) option.",
    explanation: "Without `-f`, `gzip` will refuse to overwrite an existing compressed file.",
    hint: "`gzip -f file.txt` overwrites file.txt.gz.",
    level: "intermediate",
    codeExample: "gzip -f already_compressed.txt"
  },
  {
    question: "What does the `-n` option do in `gzip`?",
    shortAnswer: "Prevents storing the original filename and timestamp in the compressed file.",
    explanation: "Useful for anonymizing or when the original name is irrelevant; results in slightly smaller output.",
    hint: "`-N` (opposite) stores the name (default).",
    level: "expert",
    codeExample: "gzip -n secret.log   # no original name stored"
  },
  {
    question: "Why does `gzip` remove the original file by default?",
    shortAnswer: "Historical design to save disk space; it's assumed you don't need the uncompressed version after compression.",
    explanation: "Use `-k` (keep) if you want to retain the original.",
    hint: "Back up important files before compression.",
    level: "basic",
    codeExample: "gzip -k mydata.csv   # keeps mydata.csv"
  },
  {
    question: "How can you recursively compress all files in a directory tree?",
    shortAnswer: "Use `find` in combination with `gzip` or `tar -czf`.",
    explanation: "`find . -type f -exec gzip {} \\;` compresses each file individually.",
    hint: "To create a single archive, use `tar -czf archive.tar.gz dir/`.",
    level: "advanced",
    codeExample: "find logs/ -name '*.log' -exec gzip {} \\;"
  },
  {
    question: "What is the difference between `gzip -d` and `gunzip`?",
    shortAnswer: "No difference; `gunzip` is often a symlink to `gzip -d`.",
    explanation: "Both decompress `.gz` files.",
    hint: "Use whichever is more memorable.",
    level: "basic",
    codeExample: "gzip -d file.gz   # same as gunzip file.gz"
  },
  {
    question: "How can you view the last few lines of a compressed log file?",
    shortAnswer: "`zcat file.gz | tail` or `gzip -dc file.gz | tail`.",
    explanation: "`zcat` is a shortcut for `gzip -dc`.",
    hint: "`zless` and `zmore` also work for paging.",
    level: "intermediate",
    codeExample: "zcat syslog.gz | tail -20"
  },
  {
    question: "What does the `--rsyncable` option do (GNU gzip)?",
    shortAnswer: "Makes the compressed output more friendly to `rsync` by reducing changes between similar compressed versions.",
    explanation: "Useful for backups where you ry sync incremental changes.",
    hint: "Adds a small overhead but improves rsync efficiency.",
    level: "expert",
    codeExample: "gzip --rsyncable data.log"
  },
  {
    question: "How can you apply `gzip` to a device file (e.g., `/dev/sda`)?",
    shortAnswer: "You can but it's rarely useful; use `dd if=/dev/sda | gzip > sda.gz`.",
    explanation: "Compresses the entire raw device; can restore with `gunzip -c sda.gz | dd of=/dev/sda`.",
    hint: "Extremely dangerous if misused.",
    level: "expert",
    codeExample: "dd if=/dev/zero bs=1M count=10 | gzip > zeros.gz"
  },
  {
    question: "Why does `gzip` on a JPEG or MP4 file not reduce size much?",
    shortAnswer: "Because those formats are already compressed using specialized algorithms (lossy).",
    explanation: "`gzip` expects redundancy; modern media formats have very little redundancy.",
    hint: "Only compress uncompressed data (text, logs, raw audio) for significant gains.",
    level: "intermediate",
    codeExample: "gzip photo.jpg   # negligible reduction"
  },
  {
    question: "How can you change the suffix created by `gzip`?",
    shortAnswer: "Use `-S .suffix`. Example: `gzip -S .z file.txt` produces `file.txt.z`.",
    explanation: "Standard tools expect `.gz`, so only use if you have custom needs.",
    hint: "Most decompression tools still work if you rename to `.gz`.",
    level: "expert",
    codeExample: "gzip -S .compressed data.bin"
  },
  {
    question: "What is the maximum compression level in `gzip` and is higher always better?",
    shortAnswer: "Level 9 is maximum; higher gives smaller files but much slower compression.",
    explanation: "For very large files, level 9 may be worth it; for small files, default 6 is fine.",
    hint: "Time your compression to see if level 9 is worth the wait.",
    level: "intermediate",
    codeExample: "time gzip -9 bigfile.txt"
  },
  {
    question: "How do you compress a file but keep both the original and the compressed version in a script?",
    shortAnswer: "Use `gzip -k` or `gzip -c` with redirection.",
    explanation: "`-k` is simplest; `-c` is more portable.",
    hint: "Check if `-k` is supported (GNU gzip does, BSD may not).",
    level: "intermediate",
    codeExample: "gzip -k data.txt || gzip -c data.txt > data.txt.gz"
  },
  {
    question: "What is the difference between `gzip` and `bzip2`?",
    shortAnswer: "`bzip2` compresses more effectively (smaller output) but is slower than `gzip`.",
    explanation: "`bzip2` uses Burrows-Wheeler transform; `gzip` uses LZ77. For archival, `xz` is even better.",
    hint: "Use `bzip2` for maximum compression where speed isn't critical.",
    level: "advanced",
    codeExample: "bzip2 -k file.txt   # creates file.txt.bz2"
  },
  {
    question: "How can you compress a file and see the progress?",
    shortAnswer: "Use `pv` (pipe viewer) with `gzip`: `pv file | gzip > file.gz`.",
    explanation: "`pv` shows progress, ETA, and throughput.",
    hint: "Install `pv` if not present; great for large files.",
    level: "expert",
    codeExample: "pv bigfile.log | gzip > bigfile.log.gz"
  },
  {
    question: "What happens if you `gzip` a symbolic link?",
    shortAnswer: "By default, `gzip` follows the link and compresses the target file, replacing the symlink with a compressed file.",
    explanation: "Use `-f` cautiously; to compress the link itself, you would need to archive first.",
    hint: "Backup symlinks with `tar` instead.",
    level: "advanced",
    codeExample: "ln -s realfile.txt link.txt; gzip link.txt   # compresses realfile.txt"
  },
  {
    question: "How can you preserve timestamps when compressing?",
    shortAnswer: "`gzip` by default preserves the original file's timestamp in the gzip header; use `-n` to disable.",
    explanation: "Decompression with `gunzip` restores the timestamp unless `-n` was used.",
    hint: "Test with `stat` before and after.",
    level: "intermediate",
    codeExample: "gzip file.txt; gunzip file.txt.gz; stat file.txt   # same timestamp"
  }
];

export default questions;