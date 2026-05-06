const questions = [
  {
    question: "What does `tar -czf` do?",
    shortAnswer: "Creates a compressed archive using gzip (.tar.gz).",
    explanation: "c = create, z = gzip, f = file. It archives and compresses in one step.",
    hint: "Commonly used for source code distribution.",
    level: "basic",
    codeExample: "tar -czf archive.tar.gz /path/to/dir"
  },
  {
    question: "How do you extract a .tar.gz file?",
    shortAnswer: "`tar -xzf archive.tar.gz` or simply `tar -xf archive.tar.gz` (auto-detects).",
    explanation: "x = extract, z = gzip decompress, f = file. Most modern tar auto-detects compression method.",
    hint: "`tar -xf` works for .tar.gz, .tar.bz2, and .tar.xz.",
    level: "basic",
    codeExample: "tar -xzf archive.tar.gz"
  },
  {
    question: "What is the difference between .tar.gz and .tgz?",
    shortAnswer: "No difference; .tgz is a shorthand for .tar.gz.",
    explanation: "Both represent a tar archive compressed with gzip.",
    hint: "Windows sometimes prefers .tgz for short filenames.",
    level: "basic",
    codeExample: "tar -czf archive.tgz folder/"
  },
  {
    question: "What flag creates a .tar.bz2 archive?",
    shortAnswer: "`-j` instead of `-z`: `tar -cjf archive.tar.bz2 dir/`",
    explanation: "bzip2 generally gives better compression than gzip but is slower.",
    hint: "Think 'j' for bzip2 (mnemonic: 'j' follows 'g'?).",
    level: "intermediate",
    codeExample: "tar -cjf backup.tar.bz2 /home/user"
  },
  {
    question: "How do you create a .tar.xz archive?",
    shortAnswer: "Use `-J` flag: `tar -cJf archive.tar.xz dir/`",
    explanation: "xz provides the highest compression ratio but is slower.",
    hint: "Capital J for xz (since 'j' taken by bzip2).",
    level: "intermediate",
    codeExample: "tar -cJf images.tar.xz pictures/"
  },
  {
    question: "Which compression method gives the smallest file size?",
    shortAnswer: "xz typically gives the smallest size, followed by bzip2, then gzip.",
    explanation: "Trade-off: xz is slowest to compress/decompress, gzip fastest.",
    hint: "For long-term archives, use xz; for frequent transfers, use gzip.",
    level: "intermediate",
    codeExample: "time tar -cJf archive.tar.xz data/   # slower but smaller"
  },
  {
    question: "Can tar extract a compressed archive without specifying the method?",
    shortAnswer: "Yes, with GNU tar: `tar -xf archive.tar.xz` auto-detects compression.",
    explanation: "It reads the magic bytes to determine gzip, bzip2, or xz.",
    hint: "Useful in scripts where compression method may vary.",
    level: "advanced",
    codeExample: "tar -xf archive.tar.bz2   # auto-detects bzip2"
  },
  {
    question: "How do you set the compression level when using tar?",
    shortAnswer: "Use `--use-compress-program` or set environment variable, e.g., `tar -czf - --use-compress-program='gzip -9'`.",
    explanation: "Alternatively, pipe to external compressor: `tar -cf - dir | gzip -9 > archive.tar.gz`.",
    hint: "Default compression level is usually 6.",
    level: "expert",
    codeExample: "tar -czf - data/ | gzip -9 > best.tar.gz"
  },
  {
    question: "What is the advantage of compressing a tar archive over compressing files individually?",
    shortAnswer: "Tar compresses the entire stream, allowing better redundancy detection across files.",
    explanation: "Similar files across the archive can be compressed together, improving ratio.",
    hint: "Tar + compression leverages cross-file similarities.",
    level: "advanced",
    codeExample: "tar -czf together.tar.gz *.txt   # better than zip each txt"
  },
  {
    question: "How do you exclude directories when creating a compressed tar?",
    shortAnswer: "Use `--exclude` pattern: `tar -czf backup.tar.gz /home --exclude='*.mp4' --exclude='Downloads'`",
    explanation: "Exclude patterns use shell wildcards, can be multiple.",
    hint: "Use `--exclude-vcs` to skip .git/.svn directories.",
    level: "advanced",
    codeExample: "tar -czf project.tar.gz myproject --exclude='node_modules'"
  },
  {
    question: "Why might my `.tar.gz` file be larger than the original directory?",
    shortAnswer: "If the data is already compressed (JPEG, MP4, ZIP), or very small files, overhead may increase size.",
    explanation: "Tar headers add 512 bytes per file; compression can't reduce random data.",
    hint: "Use `tar -cf - | gzip` but skip compression if no gain.",
    level: "advanced",
    codeExample: "tar -cf uncompressed.tar photos/   # may be smaller than .tar.gz"
  },
  {
    question: "How can you view the contents of a .tar.gz without extracting?",
    shortAnswer: "`tar -tzf archive.tar.gz` or `tar -tf archive.tar.gz`.",
    explanation: "`-t` lists, `-z` handles gzip decompression on the fly.",
    hint: "Add `-v` for detailed listing.",
    level: "intermediate",
    codeExample: "tar -tzf archive.tar.gz | grep readme"
  },
  {
    question: "How do you extract a single file from a compressed tar?",
    shortAnswer: "`tar -xzf archive.tar.gz path/to/file`",
    explanation: "Provide the exact path as listed by `tar -tzf`.",
    hint: "Use quotes if filename has spaces.",
    level: "advanced",
    codeExample: "tar -xzf backup.tar.gz home/user/important.txt"
  },
  {
    question: "What is parallel compression with tar?",
    shortAnswer: "Using `pigz`, `pbzip2`, or `xz -T` to compress in parallel across multiple CPU cores.",
    explanation: "Example: `tar -cf - data | pigz -9 > archive.tar.gz`",
    hint: "Dramatically speeds up compression on multi-core systems.",
    level: "expert",
    codeExample: "tar -cf - logs/ | pigz -p 4 > logs.tar.gz"
  },
  {
    question: "How do you create an encrypted compressed tar archive?",
    shortAnswer: "Pipe to `gpg`: `tar -czf - data | gpg -c > data.tar.gz.gpg`",
    explanation: "Decrypt: `gpg -d data.tar.gz.gpg | tar -xzf -`",
    hint: "Use `-c` for symmetric password encryption.",
    level: "expert",
    codeExample: "tar -czf - secrets/ | gpg --symmetric --cipher-algo AES256 > secrets.tar.gz.gpg"
  },
  {
    question: "What happens if you run `tar -czf archive.tar.gz directory/` and directory changes during archiving?",
    shortAnswer: "Tar will archive files as they were when opened; warnings may appear.",
    explanation: "Use `--warning=no-file-changed` to suppress, but data may be inconsistent.",
    hint: "For live data, consider snapshots or rsync first.",
    level: "expert",
    codeExample: "tar -czf backup.tar.gz --warning=no-file-changed /active/dir"
  },
  {
    question: "How do you split a large .tar.gz into smaller parts?",
    shortAnswer: "Use `split`: `tar -czf - bigdir | split -b 50m - archive.part.`",
    explanation: "Recombine: `cat archive.part.* | tar -xzf -`",
    hint: "Useful for transferring large archives via email or USB.",
    level: "advanced",
    codeExample: "split -b 100m archive.tar.gz 'archive.part'"
  },
  {
    question: "Why use `tar -cf - . | ssh user@host 'tar -xf -'`?",
    shortAnswer: "Streams a compressed (or uncompressed) tar over SSH without intermediate file.",
    explanation: "Common for remote backups and migrations.",
    hint: "Add `z` for compression before sending: `tar -czf - . | ssh host 'tar -xzf -'`",
    level: "expert",
    codeExample: "tar -czf - /home | ssh backup@server 'cat > home_backup.tar.gz'"
  },
  {
    question: "What does `tar --delete` do?",
    shortAnswer: "Deletes files from a tar archive (cannot be used on compressed tar).",
    explanation: "You must decompress first, delete, then recompress.",
    hint: "Works only on uncompressed `.tar`.",
    level: "expert",
    codeExample: "tar -f archive.tar --delete file.txt"
  },
  {
    question: "How can you verify the integrity of a .tar.gz file?",
    shortAnswer: "`tar -tzf archive.tar.gz > /dev/null` returns 0 if all headers are valid.",
    explanation: "Does not check data integrity fully; use `gzip -t` for gzip layer, but tar only checks structure.",
    hint: "Combine with `gzip -t archive.tar.gz && tar -tzf archive.tar.gz`",
    level: "advanced",
    codeExample: "gzip -t archive.tar.gz && echo 'gzip OK'"
  },
  {
    question: "What is the maximum size for a .tar.gz archive?",
    shortAnswer: "Limited by file system and tar format (GNU tar supports large files > 4GB with POSIX extensions).",
    explanation: "Modern tar handles terabytes; ensure you use `--format=posix` for huge archives.",
    hint: "Use `--format=gnu` if you have very large UIDs/GIDs.",
    level: "expert",
    codeExample: "tar --format=posix -czf huge.tar.gz /data"
  },
  {
    question: "How do you add files to an existing .tar.gz without recreating?",
    shortAnswer: "You cannot directly. Decompress to .tar, append with `tar -r`, then recompress.",
    explanation: "Compressed archives are not directly updatable; consider using `zip` if updates frequent.",
    hint: "`gunzip archive.tar.gz; tar -rf archive.tar newfile; gzip archive.tar`",
    level: "expert",
    codeExample: "gunzip archive.tar.gz && tar -rf archive.tar newfile && gzip archive.tar"
  },
  {
    question: "What does `tar -tvf archive.tar.gz` show?",
    shortAnswer: "Verbose list of contents with permissions, size, and modification time.",
    explanation: "`-t` list, `-v` verbose, `-z` gzip (auto-detected).",
    hint: "Shows same as `ls -l` for each file.",
    level: "intermediate",
    codeExample: "tar -tvf archive.tar.gz | head -10"
  },
  {
    question: "Can tar compress to multiple files (like split)?",
    shortAnswer: "Yes, use `-M` (multi-volume) and `--tape-length=N` for old-style; better to use `split`.",
    explanation: "`tar -cM -L 1024 -f archive.tar file` creates multi-volume.",
    hint: "Modern approach: `tar -czf - large | split -b 50m - archive.part.`",
    level: "expert",
    codeExample: "tar -czf - bigdir | split -b 1G - backup.tar.gz.part."
  },
  {
    question: "How do you transform filenames during tar creation?",
    shortAnswer: "Use `--transform` or `--xform` with sed expression: `--transform='s/^home//'`",
    explanation: "Useful to strip prefixes or alter paths.",
    hint: "`--transform='s/^\.\///'` removes leading ./",
    level: "expert",
    codeExample: "tar -czf archive.tar.gz --transform='s/^\.\///' ."
  },
  {
    question: "Why does `tar -czf` sometimes hang?",
    shortAnswer: "Most likely forgetting `-f` or specifying it incorrectly: `tar -czf archive.tar.gz dir` is correct; `tar -czf archive.tar.gz` missing source will read from stdin.",
    explanation: "Without source file/directory, tar reads from stdin and appears to hang.",
    hint: "Always provide source after the options.",
    level: "intermediate",
    codeExample: "# Wrong: tar -czf archive.tar.gz (hangs)\n# Correct: tar -czf archive.tar.gz ."
  },
  {
    question: "What does the `--checkpoint-action` do with compression?",
    shortAnswer: "Prints progress during archiving, useful for long compressions.",
    explanation: "Example: `tar -czf backup.tar.gz --checkpoint=1000 --checkpoint-action=echo='%u files' /home`",
    hint: "Can also use `pv` for progress.",
    level: "expert",
    codeExample: "tar -czf backup.tar.gz --checkpoint=500 --checkpoint-action=dot /home"
  },
  {
    question: "How can you test the compression ratio without writing to disk?",
    shortAnswer: "Pipe to a compressor and check size: `tar -cf - dir | gzip -c | wc -c`",
    explanation: "Counts bytes output by gzip, compares with original size from `du`.",
    hint: "`printf 'original: %d\\ncompressed: %d\\n' $(du -sb dir | cut -f1) $(tar -cf - dir | gzip -c | wc -c)`",
    level: "expert",
    codeExample: "orig=$(du -sb dir | cut -f1); comp=$(tar -cf - dir | gzip -c | wc -c); echo \"ratio: $(echo \"scale=2; $comp/$orig*100\" | bc)%\""
  },
  {
    question: "What is a sparse file and how does tar handle it?",
    shortAnswer: "Sparse files contain holes (empty blocks). GNU tar with `-S` detects and archives sparse files efficiently.",
    explanation: "Without `-S`, holes are filled with zeros, wasting space.",
    hint: "Add `-S` when archiving virtual machine disk images.",
    level: "expert",
    codeExample: "tar -cSf sparse.tar.gz sparse_file.img"
  },
  {
    question: "How do you compress a tar archive with different algorithms in parallel?",
    shortAnswer: "Use `tar -cf - dir | pigz -9 | tee >(md5sum > checksum.txt) > archive.tar.gz`",
    explanation: "Pigz handles parallel gzip; similar for pbzip2, xz -T.",
    hint: "`xz -T0` uses all cores.",
    level: "expert",
    codeExample: "tar -cf - data/ | xz -T4 -9 > data.tar.xz"
  },
  {
    question: "What is the difference between `tar -czf` and `zip -r`?",
    shortAnswer: "Tar preserves Unix permissions, symlinks, and device files; zip is more cross-platform but lacks some Unix metadata.",
    explanation: "Tar is preferred for system backups; zip for sharing with Windows users.",
    hint: "Use `zip` for simple archiving across platforms, `tar` for full Unix fidelity.",
    level: "intermediate",
    codeExample: "tar -czf backup.tar.gz /home vs zip -r backup.zip /home"
  }
];

export default questions;