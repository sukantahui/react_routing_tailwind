/**
 * Topic 8 FAQ Dataset: Handling Line Endings (CRLF vs LF and core.autocrlf)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "What is the difference between CRLF and LF line endings?",
    shortAnswer: "CRLF (`\\r\\n` / Carriage Return + Line Feed) is used by Windows; LF (`\\n` / Line Feed) is used by Unix, Linux, and macOS.",
    explanation: "Typewriters had two actions: carriage return (move printhead to left) and line feed (scroll paper up). Windows kept both bytes (`0x0D 0x0A`), while Unix streamlined to a single linefeed byte (`0x0A`).",
    hint: "Windows = `\\r\\n` (CRLF); Unix/Linux/Mac = `\\n` (LF).",
    level: "basic",
    codeExample: "# Inspect line endings using file command:\nfile script.sh # Output: ASCII text, with CRLF line terminators"
  },
  {
    question: "What happens if a Windows developer commits CRLF line endings to a shared Linux project without normalization?",
    shortAnswer: "The entire file will appear modified in `git diff`, polluting git blame and causing bash scripts (`.sh`) to crash on Linux servers.",
    explanation: "When a Linux interpreter (like `bash` or `python`) reads a script with `\\r\\n`, it sees `#!/bin/bash\\r`. Linux fails with `\\r: command not found` or `bad interpreter`, causing production outage.",
    hint: "Invisible `\\r` breaks Linux bash interpreters.",
    level: "basic",
    codeExample: "# Common Linux error caused by CRLF in shell scripts:\n/bin/bash^M: bad interpreter: No such file or directory"
  },
  {
    question: "What does `git config --global core.autocrlf true` do on Windows?",
    shortAnswer: "It converts LF to CRLF when checking out files to your working directory, and converts CRLF back to clean LF when committing into the repository.",
    explanation: "This allows Windows editors to display files with native Windows CRLF endings while ensuring the repository object database stores pure, normalized Unix LF.",
    hint: "Checkout as CRLF, commit as LF (Recommended for Windows).",
    level: "basic",
    codeExample: "# Set recommended Windows line ending filter:\ngit config --global core.autocrlf true"
  },
  {
    question: "What does `git config --global core.autocrlf input` do on macOS and Linux?",
    shortAnswer: "It keeps LF on checkout, and converts any accidental CRLF to LF on commit.",
    explanation: "On Unix systems, files are already LF, so no conversion is needed on checkout. The `input` setting serves as a safety filter ensuring no accidental Windows CRLF gets committed into the repository.",
    hint: "No conversion on checkout; converts to LF on commit (Recommended for Mac/Linux).",
    level: "basic",
    codeExample: "# Set recommended macOS/Linux filter:\ngit config --global core.autocrlf input"
  },
  {
    question: "What is a `.gitattributes` file and why is it superior to `core.autocrlf`?",
    shortAnswer: "`.gitattributes` is a version-controlled repository configuration file that enforces consistent line endings across all team members regardless of their personal machine settings.",
    explanation: "Relying on developers to remember to set `core.autocrlf` in their local global config is fragile. `.gitattributes` lives in the repository root and enforces strict line ending rules across Windows, Mac, Linux, and CI/CD pipelines.",
    hint: "Repository-level version-controlled line ending rules.",
    level: "intermediate",
    codeExample: "# Sample .gitattributes:\n* text=auto eol=lf\n*.sh text eol=lf\n*.png binary"
  },
  {
    question: "What does `* text=auto` in `.gitattributes` mean?",
    shortAnswer: "Git will automatically detect text vs binary files and normalize text files to LF in the repository.",
    explanation: "Git analyzes the file byte contents. If it is text, Git handles line ending normalization; if it contains null bytes (binary), Git leaves the bytes 100% untouched.",
    hint: "Automatic text detection and LF normalization.",
    level: "intermediate",
    codeExample: "# Universal standard in .gitattributes:\n* text=auto"
  },
  {
    question: "What happens if a binary file (like a PNG image or ZIP archive) is mistakenly processed by CRLF conversion?",
    shortAnswer: "The binary file will become corrupt and unreadable because byte sequences matching `0x0D 0x0A` will be altered.",
    explanation: "This is why binary files must always be marked with `*.png binary` or `*.pdf -text` in `.gitattributes`.",
    hint: "Line ending conversion corrupts raw binary bytes.",
    level: "intermediate",
    codeExample: "# Explicitly protect binary assets in .gitattributes:\n*.png binary\n*.jpg binary\n*.pdf binary"
  },
  {
    question: "How do you renormalize an entire existing repository after adding `.gitattributes`?",
    shortAnswer: "Run `git add --renormalize .` and commit the changes.",
    explanation: "The `--renormalize` flag forces Git to re-evaluate every tracked file in your working tree against `.gitattributes` and re-stage files with corrected LF line endings in a single atomic commit.",
    hint: "`git add --renormalize .`.",
    level: "intermediate",
    codeExample: "# Fix line endings across entire repo:\ngit add --renormalize .\ngit commit -m \"chore: normalize repository line endings via .gitattributes\""
  },
  {
    question: "What warning does Git display when converting line endings: 'warning: CRLF will be replaced by LF'?",
    shortAnswer: "It notifies you that Git detected CRLF in your working file and will normalize it to LF in the object database.",
    explanation: "This is a normal, healthy notification indicating that `core.autocrlf` or `.gitattributes` is doing its job properly.",
    hint: "Normal notification of automatic LF normalization.",
    level: "basic",
    codeExample: "# Warning message example:\n# warning: in the working copy of 'index.js', CRLF will be replaced by LF by Git"
  },
  {
    question: "What does `core.safecrlf true` do in Git configuration?",
    shortAnswer: "It prevents commits and warns if a line ending conversion cannot be reversed cleanly without data loss.",
    explanation: "Setting `core.safecrlf = true` checks if a conversion would lose data (e.g. converting a file with mixed line endings that might be a binary file) and aborts the commit if irreversible.",
    hint: "Safety validation preventing irreversible line ending conversions.",
    level: "advanced",
    codeExample: "# Enable safe CRLF checking:\ngit config --global core.safecrlf true"
  },
  {
    question: "How do you check the line endings of a file in VS Code?",
    shortAnswer: "Look at the bottom-right status bar in VS Code, which displays 'CRLF' or 'LF' (and allows 1-click toggling).",
    explanation: "Clicking on the 'CRLF' / 'LF' label in the VS Code status bar allows you to switch the active file's line ending format instantly.",
    hint: "Bottom right status bar in VS Code.",
    level: "basic",
    codeExample: "# VS Code status bar displays and toggles 'LF' vs 'CRLF'."
  },
  {
    question: "What Linux command converts a file with CRLF endings to LF in place?",
    shortAnswer: "`dos2unix <filename>` (or using `sed -i 's/\\r$//' <filename>`).",
    explanation: "The `dos2unix` utility strips out Carriage Return (`\\r`) bytes, converting Windows DOS text files into clean Unix text files.",
    hint: "`dos2unix` utility or `sed` substitution.",
    level: "intermediate",
    codeExample: "# Convert Windows file to Unix LF:\ndos2unix deploy.sh"
  },
  {
    question: "What Linux command converts a Unix LF file to Windows CRLF?",
    shortAnswer: "`unix2dos <filename>`.",
    explanation: "The counterpart to `dos2unix`, adding `\\r` before each newline.",
    hint: "`unix2dos` utility.",
    level: "intermediate",
    codeExample: "# Convert Unix file to Windows CRLF:\nunix2dos readme.txt"
  },
  {
    question: "Why do Docker container builds fail when shell scripts have CRLF endings?",
    shortAnswer: "Because Docker containers run Linux; Linux tries to execute `#!/bin/sh\\r`, which fails to locate the `/bin/sh\\r` executable.",
    explanation: "This is one of the most common production bugs when Windows developers build Docker images. Enforcing `eol=lf` on `Dockerfile` and `*.sh` in `.gitattributes` prevents this entirely.",
    hint: "Docker runs Linux containers where `\\r` breaks shebangs.",
    level: "intermediate",
    codeExample: "# Enforce LF for Docker files:\nDockerfile text eol=lf\n*.sh text eol=lf"
  },
  {
    question: "What does `text=auto eol=lf` in `.gitattributes` accomplish?",
    shortAnswer: "It ensures that text files are checked out with Unix LF endings on all operating systems (Windows, Mac, and Linux).",
    explanation: "Because modern Windows code editors (VS Code, Notepad, JetBrains) support LF natively, enforcing `eol=lf` creates total cross-platform parity.",
    hint: "Forces LF across checkout on all operating systems.",
    level: "advanced",
    codeExample: "# Force universal LF across all platforms:\n* text=auto eol=lf"
  },
  {
    question: "How can you view hidden `\\r` characters in Git diff output?",
    shortAnswer: "Run `git diff --ws-error-highlight=all` or check `core.whitespace = cr-at-eol`.",
    explanation: "This highlights carriage returns and trailing whitespace in bright red, making invisible characters immediately visible during diff inspection.",
    hint: "`--ws-error-highlight`.",
    level: "advanced",
    codeExample: "# Highlight carriage returns in diff:\ngit diff --ws-error-highlight=all"
  },
  {
    question: "What is `core.eol` in Git configuration?",
    shortAnswer: "Sets the default end-of-line style for files in the working directory when `core.autocrlf` is unset (`lf`, `crlf`, or `native`).",
    explanation: "`native` uses the OS line ending; `lf` forces Unix endings.",
    hint: "`core.eol` setting.",
    level: "advanced",
    codeExample: "# Set default EOL to LF:\ngit config --global core.eol lf"
  },
  {
    question: "What happens if a developer on Linux sets `core.autocrlf = true`?",
    shortAnswer: "Git will convert their native LF files into Windows CRLF on checkout, creating unnecessary carriage returns on Linux.",
    explanation: "Linux developers should NEVER set `core.autocrlf true`; they should set `core.autocrlf input` or rely on `.gitattributes`.",
    hint: "Setting `true` on Linux creates unwanted CRLF on checkout.",
    level: "intermediate",
    codeExample: "# Correct Linux setting:\ngit config --global core.autocrlf input"
  },
  {
    question: "How can you inspect the hex bytes of a file to check for `0D 0A` vs `0A`?",
    shortAnswer: "Using `hexdump -C <file>` or `xxd <file>` in terminal.",
    explanation: "Hexdump shows the exact bytes: `0d 0a` represents CRLF, and `0a` represents LF.",
    hint: "`hexdump -C` or `xxd` byte inspection.",
    level: "advanced",
    codeExample: "# Inspect line ending bytes:\nhexdump -C file.txt | head -n 2"
  },
  {
    question: "What is the role of `.editorconfig` alongside `.gitattributes`?",
    shortAnswer: "`.editorconfig` configures your text editor while typing (setting `end_of_line = lf`), while `.gitattributes` enforces it when Git commits.",
    explanation: "Together, `.editorconfig` (editor behavior) and `.gitattributes` (VCS behavior) guarantee 100% line ending consistency across teams.",
    hint: "Editor behavior (.editorconfig) + Git behavior (.gitattributes).",
    level: "intermediate",
    codeExample: "# .editorconfig standard:\n[*]\nend_of_line = lf\ninsert_final_newline = true"
  },
  {
    question: "Why does `git diff` show entire file changes when only 1 line was edited?",
    shortAnswer: "Because a line ending change from LF to CRLF modified every single line ending character in the entire file.",
    explanation: "To Git's byte comparison engine, changing `\\n` to `\\r\\n` on 1,000 lines means all 1,000 lines are different. Proper normalization prevents this phantom diff problem.",
    hint: "Every line has a modified ending byte.",
    level: "basic",
    codeExample: "# Phantom diff: 500 lines modified when you only touched 1 word."
  },
  {
    question: "How do you ignore whitespace changes temporarily during a `git diff`?",
    shortAnswer: "Run `git diff -w` (or `git diff --ignore-all-space`).",
    explanation: "The `-w` flag tells Git to ignore all whitespace and line ending differences, showing only genuine code changes.",
    hint: "`-w` or `--ignore-all-space` flag.",
    level: "basic",
    codeExample: "# Ignore line ending and whitespace differences:\ngit diff -w"
  },
  {
    question: "How do you ignore whitespace changes during a merge or rebase?",
    shortAnswer: "Use `git merge -Xignore-all-space` or `git rebase -Xignore-all-space`.",
    explanation: "This instructs Git's 3-way merge strategy to ignore whitespace and line ending discrepancies when resolving divergent branches.",
    hint: "`-Xignore-all-space` merge strategy option.",
    level: "advanced",
    codeExample: "# Merge ignoring whitespace conflicts:\ngit merge -Xignore-all-space feature/refactor"
  },
  {
    question: "What should you do if an entire repository already has mixed line endings?",
    shortAnswer: "Add `.gitattributes` with `* text=auto eol=lf`, run `git add --renormalize .`, and commit.",
    explanation: "This single commit cleans the entire repository history moving forward, saving countless hours of debugging.",
    hint: "Add `.gitattributes` and run `git add --renormalize .`.",
    level: "basic",
    codeExample: "# Standard remediation:\necho \"* text=auto eol=lf\" > .gitattributes\ngit add --renormalize .\ngit commit -m \"chore: enforce LF line endings\""
  },
  {
    question: "What is the single golden rule for line endings across all operating systems?",
    shortAnswer: "Always store Unix LF (`\\n`) in the Git object database, configure `core.autocrlf` properly, and commit a `.gitattributes` file in every repository.",
    explanation: "Adhering to this golden rule guarantees seamless collaboration between Windows, Mac, and Linux developers and eliminates Docker and cloud deployment failures.",
    hint: "Store LF in repo, configure autocrlf, commit .gitattributes.",
    level: "basic",
    codeExample: "# Universal Rule: LF in repository database at all times."
  }
];

export default questions;
