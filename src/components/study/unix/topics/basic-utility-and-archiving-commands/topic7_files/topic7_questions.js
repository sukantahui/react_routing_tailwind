const questions = [
  {
    question: "What does `gunzip` do?",
    shortAnswer: "Decompresses files compressed with `gzip`, restoring the original file.",
    explanation: "`gunzip` is equivalent to `gzip -d`. It removes the `.gz` extension and restores the original content.",
    hint: "Think of it as the opposite of `gzip`.",
    level: "basic",
    codeExample: "gunzip archive.gz   # restores archive"
  },
  {
    question: "How is `gunzip` different from `gzip -d`?",
    shortAnswer: "There is no difference; `gunzip` is often a symbolic link to `gzip -d`.",
    explanation: "Both commands perform identical decompression. `gunzip` exists for convenience and historical reasons.",
    hint: "Use whichever you prefer.",
    level: "basic",
    codeExample: "gzip -d file.gz   # same as gunzip file.gz"
  },
  {
    question: "How can you decompress a `.gz` file while keeping the compressed version?",
    shortAnswer: "Use `gunzip -k file.gz` (GNU) or `gunzip -c file.gz > output`.",
    explanation: "`-k` keeps the original `.gz`; `-c` writes to stdout which you can redirect to a new name.",
    hint: "`-k` is simplest if available.",
    level: "intermediate",
    codeExample: "gunzip -k data.gz   # keeps data.gz and creates data"
  },
  {
    question: "What does `gunzip -t` do?",
    shortAnswer: "Tests the integrity of a compressed file without extracting it.",
    explanation: "Returns exit code 0 if the file is valid and not corrupt.",
    hint: "Use before wasting time decompressing a large corrupted file.",
    level: "advanced",
    codeExample: "gunzip -t backup.gz && echo 'OK'"
  },
  {
    question: "Can `gunzip` decompress files that are not named with `.gz`?",
    shortAnswer: "Yes, but you may need to specify the suffix with `-S` or rename the file.",
    explanation: "By default, `gunzip` expects `.gz`; use `-S .custom` or rename to `.gz`.",
    hint: "Not common; standard practice is using `.gz` extensions.",
    level: "expert",
    codeExample: "gunzip -S .z compressed.z"
  },
  {
    question: "Why does `gunzip` complain about a file not being in gzip format?",
    shortAnswer: "The file is either not compressed with gzip, or it's corrupted.",
    explanation: "`gunzip` checks the magic bytes (0x1F 0x8B) at the start; if missing, it refuses.",
    hint: "Use `file` command to identify file type.",
    level: "intermediate",
    codeExample: "file unknown.bin"
  },
  {
    question: "How do you decompress a file to a different name or location?",
    shortAnswer: "Use `gunzip -c file.gz > /path/newfilename`.",
    explanation: "`-c` writes to stdout; you can redirect to any path or name.",
    hint: "The original `.gz` remains untouched.",
    level: "intermediate",
    codeExample: "gunzip -c archive.gz > /tmp/restored.txt"
  },
  {
    question: "What is the difference between `gunzip` and `unzip`?",
    shortAnswer: "`gunzip` works on `.gz` (single file); `unzip` works on `.zip` archives (multiple files).",
    explanation: "They are different formats created by different tools (gzip vs PKZIP).",
    hint: "`unzip` is for `.zip` files, common on Windows.",
    level: "basic",
    codeExample: "unzip archive.zip   # vs gunzip archive.gz"
  },
  {
    question: "How can you decompress multiple `.gz` files with a single command?",
    shortAnswer: "`gunzip *.gz` or `gunzip file1.gz file2.gz`.",
    explanation: "`gunzip` accepts multiple arguments and decompresses each.",
    hint: "Be careful: all original `.gz` files will be removed unless you use `-k`.",
    level: "intermediate",
    codeExample: "gunzip -k *.gz   # keep all compressed"
  },
  {
    question: "What does the `-f` option do in `gunzip`?",
    shortAnswer: "Force decompression even if output file already exists.",
    explanation: "Without `-f`, `gunzip` refuses to overwrite an existing file.",
    hint: "Use only when you are sure about overwriting.",
    level: "advanced",
    codeExample: "gunzip -f data.gz   # overwrites existing data"
  },
  {
    question: "How can you view the contents of a `.gz` file without decompressing to disk?",
    shortAnswer: "Use `zcat file.gz` or `gunzip -c file.gz` piped to `less`.",
    explanation: "`zcat` is a common alias for `gunzip -c`.",
    hint: "`zless` and `zmore` also work.",
    level: "intermediate",
    codeExample: "zcat log.gz | grep error"
  },
  {
    question: "What happens when you run `gunzip` on a `.tar.gz` file?",
    shortAnswer: "It decompresses to a `.tar` file (not a directory).",
    explanation: "`gunzip` only decompresses; you still need `tar xf` to extract the archive contents.",
    hint: "Use `tar -xzf file.tar.gz` to do both steps.",
    level: "intermediate",
    codeExample: "gunzip archive.tar.gz   # creates archive.tar\ntar xf archive.tar"
  },
  {
    question: "Why does `gunzip` sometimes fail with 'unexpected end of file'?",
    shortAnswer: "The compressed file is truncated or incomplete.",
    explanation: "This means the archive is missing data; likely incomplete download or partial backup.",
    hint: "Try re-downloading or restoring from backup.",
    level: "advanced",
    codeExample: "gunzip -t partial.gz   # returns error"
  },
  {
    question: "How can you decompress a file and preserve the original timestamp?",
    shortAnswer: "`gunzip` does this by default (using the timestamp stored in the gzip header).",
    explanation: "When decompressing, the original modification time is restored unless you use `-n`.",
    hint: "`ls -l` before and after shows same timestamp.",
    level: "basic",
    codeExample: "gunzip oldfile.gz; ls -l oldfile   # timestamp matches original"
  },
  {
    question: "Can `gunzip` handle multiple concatenated gzip files?",
    shortAnswer: "Yes; if a file contains concatenated gzip streams, `gunzip` decompresses all of them.",
    explanation: "Example: `cat a.gz b.gz > combined.gz`; `gunzip combined.gz` produces combined file with both decompressed streams concatenated.",
    hint: "Rare but useful for log rotation.",
    level: "expert",
    codeExample: "cat part1.gz part2.gz > full.gz; gunzip full.gz"
  },
  {
    question: "What is the difference between `gunzip` and `gzip -d` when used with `-c`?",
    shortAnswer: "No difference; both output to stdout.",
    explanation: "`gunzip -c` and `gzip -dc` are identical.",
    hint: "Choose based on readability.",
    level: "basic",
    codeExample: "gzip -dc file.gz | wc -l   # same as gunzip -c file.gz | wc -l"
  },
  {
    question: "How can you recursively decompress all `.gz` files in a directory tree?",
    shortAnswer: "Use `find . -name '*.gz' -exec gunzip {} \\;`",
    explanation: "`find` traverses directories and runs `gunzip` on each matching file.",
    hint: "Add `-k` to keep compressed files.",
    level: "advanced",
    codeExample: "find logs/ -type f -name '*.gz' -exec gunzip -k {} \\;"
  },
  {
    question: "What does the `-l` option do in `gunzip`?",
    shortAnswer: "Lists information about compressed files (size, ratio, name).",
    explanation: "`gzip -l` works on `.gz` files to show compressed/uncompressed sizes and compression ratio.",
    hint: "Useful before decompressing to see expected size.",
    level: "intermediate",
    codeExample: "gzip -l archive.gz"
  },
  {
    question: "Can `gunzip` decompress files from stdin?",
    shortAnswer: "Yes, if you use `-c` and provide no filename, it reads from stdin.",
    explanation: "Example: `cat file.gz | gunzip -c > output`",
    hint: "This is used in pipelines.",
    level: "advanced",
    codeExample: "cat backup.gz | gunzip -c | tar xf -"
  },
  {
    question: "Why is `gunzip` sometimes slower than `gzip`?",
    shortAnswer: "Decompression is generally faster than compression, but for very large files, disk I/O matters.",
    explanation: "Usually `gunzip` is faster because decompression is less CPU-intensive than compression.",
    hint: "Test with `time gunzip large.gz`.",
    level: "intermediate",
    codeExample: "time gunzip hugefile.gz"
  },
  {
    question: "How can you decompress a file but change its extension?",
    shortAnswer: "Use `gunzip -c file.gz > file.new`",
    explanation: "`-c` lets you redirect to any filename; the original `.gz` remains.",
    hint: "Remember that the new file name may not reflect the original content type.",
    level: "advanced",
    codeExample: "gunzip -c data.gz > data_uncompressed.txt"
  },
  {
    question: "What is `pigz -d`?",
    shortAnswer: "Parallel version of `gunzip` using multiple cores for faster decompression.",
    explanation: "`pigz -d` decompresses a `.gz` file in parallel, much faster on multi-core systems.",
    hint: "Install `pigz` for large files.",
    level: "expert",
    codeExample: "pigz -d largefile.gz"
  },
  {
    question: "What happens if you try to `gunzip` a file that is not a gzip archive?",
    shortAnswer: "`gunzip` prints an error and leaves the file unchanged.",
    explanation: "It checks the magic number; fails with 'not in gzip format'.",
    hint: "Use `file` to identify unknown files.",
    level: "basic",
    codeExample: "echo 'hello' > test; gunzip test   # error"
  },
  {
    question: "How can you decompress multiple files while preserving timestamps?",
    shortAnswer: "`gunzip` already preserves timestamps by default. Use `-N` to restore original name as well.",
    explanation: "`-N` stores original name; `-n` disables.",
    hint: "Default is to restore name and timestamp.",
    level: "advanced",
    codeExample: "gunzip -N archive.gz"
  },
  {
    question: "What is the purpose of `gunzip -q`?",
    shortAnswer: "Quiet mode: suppresses warnings and error messages.",
    explanation: "Useful in scripts where you don't want stderr clutter.",
    hint: "Combine with `-f` for silent force.",
    level: "advanced",
    codeExample: "gunzip -q corrupt.gz 2>/dev/null"
  },
  {
    question: "Can `gunzip` handle files larger than 4GB?",
    shortAnswer: "Yes, if the system supports large files (modern Linux does).",
    explanation: "The gzip format allows large files; `gunzip` on 64-bit systems handles TB sizes.",
    hint: "Test with `dd if=/dev/zero bs=1M count=5000 | gzip > big.gz`",
    level: "expert",
    codeExample: "gunzip huge.gz   # works if file system permits"
  },
  {
    question: "How do you decompress a file encrypted with gzip?",
    shortAnswer: "gzip does not support encryption. Use `gpg` or `openssl` for encrypted compression.",
    explanation: "If the file is password-protected, it wasn't done by standard gzip.",
    hint: "Use `gpg -d file.gz.gpg` if encrypted with GPG.",
    level: "expert",
    codeExample: "gpg -d encrypted.gz.gpg | gunzip"
  },
  {
    question: "What is the difference between `gunzip` and `gzip -d` regarding exit codes?",
    shortAnswer: "None; both return 0 on success, non-zero on failure.",
    explanation: "Exit codes: 1 for general error, 2 for corrupt file, etc.",
    hint: "Check with `echo $?` after command.",
    level: "intermediate",
    codeExample: "gunzip bad.gz; echo $?   # non-zero"
  },
  {
    question: "How can you create a script that automatically decompresses `.gz` files in a watched folder?",
    shortAnswer: "Use `inotifywait` (Linux) or `fswatch` (macOS) to trigger `gunzip` on new files.",
    explanation: "Monitor directory and run `gunzip` when a `.gz` file appears.",
    hint: "Also check `systemd.path` units for production.",
    level: "expert",
    codeExample: "inotifywait -m incoming/ -e create --format '%f' | while read f; do gunzip \"incoming/$f\"; done"
  },
  {
    question: "Why does `gunzip` sometimes produce a file with a different size than expected?",
    shortAnswer: "The original file size is stored in the gzip footer; `gunzip` restores exactly that size.",
    explanation: "If you suspect mismatch, the corruption may have altered the footer.",
    hint: "Use `gzip -l` to compare stored vs actual.",
    level: "advanced",
    codeExample: "gzip -l suspect.gz   # compare uncompressed size"
  }
];

export default questions;