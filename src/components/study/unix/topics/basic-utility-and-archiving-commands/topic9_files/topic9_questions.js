const questions = [
  {
    question: "What does the `unzip` command do?",
    shortAnswer: "Extracts files from ZIP archives created by `zip` or other programs.",
    explanation: "`unzip` restores files, directories, and timestamps, and can also list or test archives.",
    hint: "Use `unzip -l` to see contents without extracting.",
    level: "basic",
    codeExample: "unzip archive.zip"
  },
  {
    question: "How do you extract a ZIP file to a specific directory?",
    shortAnswer: "Use the `-d` option: `unzip archive.zip -d /target/dir`",
    explanation: "The target directory is created if it doesn't exist.",
    hint: "Always extract to a subdirectory to avoid clutter.",
    level: "basic",
    codeExample: "unzip backup.zip -d restore_folder/"
  },
  {
    question: "How can you see what's inside a ZIP file without extracting?",
    shortAnswer: "`unzip -l archive.zip` or `unzip -v` for verbose details.",
    explanation: "Lists filenames, sizes, timestamps, and compression ratios.",
    hint: "Always preview before extracting.",
    level: "basic",
    codeExample: "unzip -l archive.zip | less"
  },
  {
    question: "How do you test if a ZIP file is corrupted?",
    shortAnswer: "`unzip -t archive.zip`",
    explanation: "Tests CRC checksums of all files; returns exit code 0 if valid.",
    hint: "Do this before extracting important data.",
    level: "intermediate",
    codeExample: "unzip -t archive.zip && echo 'OK'"
  },
  {
    question: "How do you extract only specific files from a ZIP?",
    shortAnswer: "Provide filenames after the archive: `unzip archive.zip file1.txt file2.txt`",
    explanation: "You can use wildcards but must quote them: `unzip archive.zip \"*.txt\"`.",
    hint: "Quote wildcards to prevent shell expansion.",
    level: "intermediate",
    codeExample: "unzip documents.zip \"*.pdf\""
  },
  {
    question: "How do you exclude certain files from extraction?",
    shortAnswer: "Use `-x` followed by patterns: `unzip archive.zip -x \"*.log\"`",
    explanation: "Patterns are shell-style wildcards; multiple patterns allowed.",
    hint: "Combine with inclusion for fine control.",
    level: "advanced",
    codeExample: "unzip archive.zip -x \"*secret*\" \"*.tmp\""
  },
  {
    question: "How do you prevent `unzip` from overwriting existing files?",
    shortAnswer: "Use `-n` (never overwrite) or `-o` (force overwrite).",
    explanation: "Default behavior is to prompt if the file exists; `-n` skips, `-o` overwrites without prompt.",
    hint: "Use `-n` in scripts to avoid interactive prompts.",
    level: "intermediate",
    codeExample: "unzip -n archive.zip   # skip existing files"
  },
  {
    question: "Can `unzip` extract password-protected ZIP files?",
    shortAnswer: "Yes, with `-P password` (insecure) or it prompts interactively.",
    explanation: "The encryption is weak; consider `7z` for stronger crypto.",
    hint: "`-P` is not recommended because password appears in process list.",
    level: "intermediate",
    codeExample: "unzip -P mypassword secret.zip"
  },
  {
    question: "What is the purpose of `-j` in `unzip`?",
    shortAnswer: "Junk paths: extracts files without directory structure.",
    explanation: "All files are placed directly in the extraction directory, ignoring subfolders.",
    hint: "Be careful of filename collisions.",
    level: "advanced",
    codeExample: "unzip -j archive.zip -d flat/"
  },
  {
    question: "How do you extract only newer files from a ZIP (update)?",
    shortAnswer: "Use `-u` (update): `unzip -u archive.zip`",
    explanation: "Extracts only files that are newer than existing copies or do not exist.",
    hint: "Useful for incremental updates.",
    level: "advanced",
    codeExample: "unzip -u patch.zip -d /application/"
  },
  {
    question: "Why does `unzip` sometimes ask for overwrite confirmation?",
    shortAnswer: "Because extracted files already exist; `unzip` defaults to interactive mode.",
    explanation: "Use `-n` (never) or `-o` (overwrite) to bypass.",
    hint: "In scripts, always specify one of these options.",
    level: "basic",
    codeExample: "unzip -o archive.zip   # overwrite all"
  },
  {
    question: "How can you extract a ZIP to stdout without writing files?",
    shortAnswer: "Use `unzip -p archive.zip filename` (prints file content).",
    explanation: "Useful for piping a single file to another command.",
    hint: "`unzip -p archive.zip README.md | less`",
    level: "advanced",
    codeExample: "unzip -p docs.zip chapter1.txt | wc -l"
  },
  {
    question: "What does the `-q` option do?",
    shortAnswer: "Quiet mode: suppresses normal output messages.",
    explanation: "Only errors are displayed. Useful in scripts.",
    hint: "Combine with `-o` for silent overwrite.",
    level: "intermediate",
    codeExample: "unzip -q archive.zip -d output/"
  },
  {
    question: "Can `unzip` handle ZIP files larger than 4GB?",
    shortAnswer: "Yes, if compiled with large file support (ZIP64).",
    explanation: "Most modern versions support ZIP64; older ones may fail.",
    hint: "Test with `unzip -t large.zip` first.",
    level: "expert",
    codeExample: "unzip hugefile.zip   # may need up-to-date unzip"
  },
  {
    question: "How do you extract a ZIP using `unzip` without changing timestamps?",
    shortAnswer: "Use `-DD` (no time restoration) or `--d`? Actually `unzip` by default restores timestamps. To disable: `unzip -DD archive.zip`.",
    explanation: "`-DD` forces current timestamp on extracted files.",
    hint: "Also used to avoid metadata corruption in some workflows.",
    level: "expert",
    codeExample: "unzip -DD archive.zip -d current_time/"
  },
  {
    question: "Why does `unzip` sometimes produce 'unsupported compression method 98'?",
    shortAnswer: "The archive uses newer compression (e.g., LZMA) not supported by classic unzip.",
    explanation: "Use `7z` or `p7zip` instead for such archives.",
    hint: "`7z x archive.zip` will handle modern methods.",
    level: "expert",
    codeExample: "7z x archive.zip   # better compatibility"
  },
  {
    question: "How do you extract a ZIP file with international (UTF-8) filenames?",
    shortAnswer: "Use `-O` charset option: `unzip -O cp850 archive.zip` on Windows; Linux often auto-detects.",
    explanation: "Older ZIPs may use non-UTF-8 encoding; specify correct charset.",
    hint: "`-O utf-8` usually correct for modern files.",
    level: "expert",
    codeExample: "unzip -O windows-1252 old_archive.zip"
  },
  {
    question: "What is the difference between `unzip` and `gunzip`?",
    shortAnswer: "`unzip` extracts .zip archives (multiple files); `gunzip` decompresses .gz (single file).",
    explanation: "They are for different compression formats (PKZIP vs gzip).",
    hint: "Use `unzip` for `.zip`, `gunzip` for `.gz`.",
    level: "basic",
    codeExample: "unzip archive.zip vs gunzip file.gz"
  },
  {
    question: "How can you batch extract multiple ZIP files?",
    shortAnswer: "Loop over them: `for f in *.zip; do unzip \"$f\" -d \"${f%.zip}\"; done`",
    explanation: "Extracts each ZIP into a folder named after the archive (without .zip).",
    hint: "Add `-q` for quiet bulk extraction.",
    level: "intermediate",
    codeExample: "for zip in *.zip; do unzip -q \"$zip\" -d \"${zip%.zip}\"; done"
  },
  {
    question: "Can `unzip` extract from stdin?",
    shortAnswer: "Yes: `cat archive.zip | unzip` or `unzip -`",
    explanation: "Useful when zip file is generated by another command.",
    hint: "Example: `curl -s http://example.com/file.zip | unzip -d /tmp -`",
    level: "expert",
    codeExample: "unzip -p - archive.zip   # needs filename; better: cat archive.zip | unzip -"
  },
  {
    question: "How do you extract only the newest file from a ZIP?",
    shortAnswer: "Pipe `unzip -l` to sort and tail, then extract that single file.",
    explanation: "`unzip -l` shows timestamps; `tail -1` gets last (usually newest).",
    hint: "`unzip -l archive.zip | tail -1 | awk '{print $4}' | xargs unzip archive.zip`",
    level: "expert",
    codeExample: "latest=$(unzip -l archive.zip | grep -v '/$' | tail -1 | awk '{print $4}'); unzip archive.zip \"$latest\""
  },
  {
    question: "What does `unzip -Z` do?",
    shortAnswer: "Displays ZIP archive info similar to `zipinfo`, e.g., `unzip -Z1` lists filenames only.",
    explanation: "`-Z` accepts suboptions (1,2, etc.) for different output formats.",
    hint: "`unzip -Z1 archive.zip` gives one file per line.",
    level: "expert",
    codeExample: "unzip -Z1 archive.zip | xargs -I{} file {}"
  },
  {
    question: "Why does `unzip` on Linux preserve execute permissions?",
    shortAnswer: "Because ZIP format stores Unix file permissions (if created on Unix with `zip -r`).",
    explanation: "Windows ZIP tools may not store execute bits; result may have default permissions.",
    hint: "Use `unzip -X` to restore original permissions if stored.",
    level: "advanced",
    codeExample: "unzip -X archive.zip   # restore extra fields"
  },
  {
    question: "How can you fix a truncated ZIP file?",
    shortAnswer: "Use `zip -F` or `zip -FF` to attempt repair, or use `unzip -t output` to see what's recoverable.",
    explanation: "If only central directory is missing, `unzip` may still extract using local headers.",
    hint: "`zip -FF corrupt.zip --out repaired.zip`",
    level: "expert",
    codeExample: "unzip -t partial.zip   # lists files that can be extracted"
  },
  {
    question: "What is the purpose of the `-a` option in `unzip`?",
    shortAnswer: "Converts DOS/Windows text files to Unix text format (CR+LF to LF).",
    explanation: "Useful when extracting archives created on Windows to avoid ^M characters.",
    hint: "`unzip -a archive.zip` also works the other way with `-aa`.",
    level: "advanced",
    codeExample: "unzip -a win_archive.zip   # fixes line endings"
  },
  {
    question: "Can `unzip` list files without decompressing them?",
    shortAnswer: "Yes, `-l` and `-v` list without extraction.",
    explanation: "These read the central directory quickly.",
    hint: "`unzip -l` shows compressed sizes, CRC.",
    level: "basic",
    codeExample: "unzip -l archive.zip"
  },
  {
    question: "How do you extract files with spaces in names using `unzip`?",
    shortAnswer: "Quote the filename: `unzip archive.zip \"my file.txt\"`",
    explanation: "Shell treats spaces as argument separators; quotes keep them together.",
    hint: "Use tab completion or escape spaces with backslash.",
    level: "intermediate",
    codeExample: "unzip archive.zip 'My Document.pdf'"
  },
  {
    question: "What is the difference between `unzip` and `jar xf`?",
    shortAnswer: "`jar xf` extracts JAR files (which are ZIPs with metadata). `unzip` also works on JARs but may ignore manifest.",
    explanation: "Both can extract; `jar` preserves Java-specific attributes.",
    hint: "Use `jar xf` for Java classpath extraction.",
    level: "expert",
    codeExample: "jar xf my.jar   # extracts META-INF as well"
  },
  {
    question: "Why does `unzip` give 'caution: filename not matched' error?",
    shortAnswer: "The pattern or filename specified does not exist in the archive.",
    explanation: "Check spelling or use `unzip -l` to verify exact names.",
    hint: "Wildcards must be quoted.",
    level: "intermediate",
    codeExample: "unzip archive.zip 'readme.txt'   # ensure file exists"
  },
  {
    question: "How do you create a shell script to unzip and move contents up one level?",
    shortAnswer: "Extract then move: `unzip archive.zip -d temp/ && mv temp/* . && rmdir temp`",
    explanation: "This flattens a ZIP that has a single root directory.",
    hint: "Be cautious of dotfiles and conflicts.",
    level: "advanced",
    codeExample: "unzip -q archive.zip -d extracted && mv extracted/* . && rm -rf extracted"
  },
  {
    question: "What does `unzip -v` output besides file list?",
    shortAnswer: "Verbose headers including compression method, file attributes, and total compression ratio.",
    explanation: "Useful for detailed archive inspection.",
    hint: "`unzip -v archive.zip | less`",
    level: "advanced",
    codeExample: "unzip -v archive.zip | head -30"
  }
];

export default questions;