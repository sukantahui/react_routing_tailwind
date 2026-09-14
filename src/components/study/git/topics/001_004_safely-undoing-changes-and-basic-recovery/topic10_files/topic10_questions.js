/**
 * Topic 10 FAQ Assessment Questions:
 * "Cleaning Untracked Files and Directories: git clean with dry-run (-n), force (-f), recursive directory (-d), and ignored file (-x) options"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t10-q1",
    "question": "What is the primary purpose of the `git clean` command?",
    "shortAnswer": "To remove untracked files and directories from the working tree that are not managed by Git.",
    "options": [
      "To remove untracked files and directories from the working directory",
      "To compress Git commit objects",
      "To delete branches older than 30 days",
      "To format source code with ESLint"
    ],
    "answer": "To remove untracked files and directories from the working directory",
    "explanation": "While `git reset` and `git restore` operate on tracked files, `git clean` is specifically designed for untracked artifacts.",
    "hint": "Clean targets untracked files.",
    "level": "basic",
    "codeExample": "git clean -nd"
  },
  {
    "id": "undo-t10-q2",
    "question": "What happens if you run `git clean` with no flags on a default Git installation?",
    "shortAnswer": "Git refuses to delete anything and exits with a fatal error because `clean.requireForce` is set to `true` by default.",
    "options": [
      "Git refuses to run and displays a fatal error stating `-f`, `-n`, or `-i` is required",
      "Git immediately deletes all untracked files without confirmation",
      "Git creates a zip backup in `/tmp`",
      "Git prompts for user login"
    ],
    "answer": "Git refuses to run and displays a fatal error stating `-f`, `-n`, or `-i` is required",
    "explanation": "The `clean.requireForce` guardrail is an intentional built-in safety net against catastrophic accidental file deletions.",
    "hint": "Git requires explicit force or dry-run flags.",
    "level": "basic",
    "codeExample": "fatal: clean.requireForce defaults to true and neither -i, -n, nor -f given; refusing to clean"
  },
  {
    "id": "undo-t10-q3",
    "question": "Which `git clean` flag performs a dry-run, showing what files WOULD be deleted without deleting anything?",
    "shortAnswer": "`-n` (or `--dry-run`).",
    "options": [
      "`-n` (or `--dry-run`)",
      "`-d`",
      "`-f`",
      "`-t`"
    ],
    "answer": "`-n` (or `--dry-run`)",
    "explanation": "`-n` performs a preview simulation, printing 'Would remove <filename>' for every candidate file.",
    "hint": "-n stands for dry-run simulation.",
    "level": "basic",
    "codeExample": "git clean -n"
  },
  {
    "id": "undo-t10-q4",
    "question": "Which flag is required to delete whole untracked directories in addition to individual files?",
    "shortAnswer": "`-d`",
    "options": [
      "`-d`",
      "`-r`",
      "`-a`",
      "`-p`"
    ],
    "answer": "`-d`",
    "explanation": "By default, `git clean` ignores untracked folders unless the `-d` (directories) flag is supplied.",
    "hint": "-d cleans directories recursively.",
    "level": "basic",
    "codeExample": "git clean -fd"
  },
  {
    "id": "undo-t10-q5",
    "question": "What is the difference between `-x` (lowercase) and `-X` (uppercase) in `git clean`?",
    "shortAnswer": "`-x` deletes both ignored and non-ignored untracked files; `-X` deletes ONLY ignored files.",
    "options": [
      "`-x` removes both untracked and ignored files; `-X` removes ONLY ignored files (preserving non-ignored untracked files)",
      "`-x` is for Linux; `-X` is for Windows",
      "`-x` deletes tracked files; `-X` deletes commits",
      "There is no difference"
    ],
    "answer": "`-x` removes both untracked and ignored files; `-X` removes ONLY ignored files (preserving non-ignored untracked files)",
    "explanation": "`-X` is useful when you want to wipe build outputs (like `dist/`) without touching newly created un-staged source files.",
    "hint": "Lowercase x deletes everything; Uppercase X deletes only ignored.",
    "level": "intermediate",
    "codeExample": "# Wipe only ignored build artifacts:\ngit clean -fdX"
  },
  {
    "id": "undo-t10-q6",
    "question": "What command completely resets a repository to an absolute pristine state (undoing all tracked modifications + deleting all untracked files & build artifacts)?",
    "shortAnswer": "`git reset --hard HEAD && git clean -fdx`",
    "options": [
      "`git reset --hard HEAD && git clean -fdx`",
      "`git clean -f`",
      "`git restore .`",
      "`git checkout main --force`"
    ],
    "answer": "`git reset --hard HEAD && git clean -fdx`",
    "explanation": "This pair is the standard developer nuke: `reset --hard` resets tracked files; `clean -fdx` purges all untracked and ignored files.",
    "hint": "Hard reset tracked + Clean -fdx untracked & ignored.",
    "level": "intermediate",
    "codeExample": "git reset --hard HEAD\ngit clean -fdx"
  },
  {
    "id": "undo-t10-q7",
    "question": "In the classroom at Barrackpore, Tuhina created a temporary scratch folder `temp_notes/` and 3 test scripts. She wants to delete them safely. What command should she run first?",
    "shortAnswer": "`git clean -nd` (to preview the deletions first).",
    "options": [
      "`git clean -nd` to preview what will be deleted",
      "`git clean -fd` immediately without checking",
      "`rm -rf *`",
      "`git reset --hard`"
    ],
    "answer": "`git clean -nd` to preview what will be deleted",
    "explanation": "Running a dry-run first is the essential defensive practice to prevent accidental deletion of important files.",
    "hint": "Always preview with dry-run (-n) first.",
    "level": "basic",
    "codeExample": "git clean -nd"
  },
  {
    "id": "undo-t10-q8",
    "question": "Can files deleted by `git clean -fd` be recovered using `git reflog`?",
    "shortAnswer": "No. Untracked files were never in Git's database or reflog; once deleted by `git clean`, they are permanently gone from disk.",
    "options": [
      "No, untracked files were never stored in Git's database and cannot be recovered via Git",
      "Yes, `git reflog --untracked` will restore them",
      "Yes, Git moves them to `.git/trash/`",
      "Yes, GitHub automatically restores them"
    ],
    "answer": "No, untracked files were never stored in Git's database and cannot be recovered via Git",
    "explanation": "`git clean` performs direct OS filesystem unlink deletions. Reflog has no record of untracked files.",
    "hint": "Untracked deletions are unrecoverable in Git.",
    "level": "basic",
    "codeExample": "# Untracked deletions are permanent in Git!"
  },
  {
    "id": "undo-t10-q9",
    "question": "Which flag allows you to clean untracked files in a specific subdirectory only (e.g. `src/components/temp/`)?",
    "shortAnswer": "Provide the pathspec directly: `git clean -fd src/components/temp/`.",
    "options": [
      "`git clean -fd src/components/temp/`",
      "`git clean --dir-only`",
      "`git clean -path`",
      "`git clean -s`"
    ],
    "answer": "`git clean -fd src/components/temp/`",
    "explanation": "Passing a pathspec restricts `git clean` to the specified directory subtree.",
    "hint": "Pathspec restricts clean to subfolders.",
    "level": "intermediate",
    "codeExample": "git clean -fd src/temp/"
  },
  {
    "id": "undo-t10-q10",
    "question": "What does the `-e <pattern>` (or `--exclude`) flag do in `git clean`?",
    "shortAnswer": "It excludes files matching the specified pattern from being deleted during the clean operation.",
    "options": [
      "It excludes matching files/patterns from deletion",
      "It encrypts matching files",
      "It exports matching files to a zip",
      "It emails matching files"
    ],
    "answer": "It excludes matching files/patterns from deletion",
    "explanation": "`-e` allows custom exclusion patterns on the fly without modifying `.gitignore`.",
    "hint": "-e stands for exclude pattern.",
    "level": "intermediate",
    "codeExample": "git clean -fd -e \"*.env\" -e \"config/local.json\""
  },
  {
    "id": "undo-t10-q11",
    "question": "Why is `git clean -fdx` commonly used in CI/CD pipeline test runners before running automated builds?",
    "shortAnswer": "To guarantee a 100% clean build environment free of cached dependencies, leftover artifacts, and stale build outputs.",
    "options": [
      "To ensure an immaculate test environment without stale build cache or contaminated artifacts",
      "To download the latest Linux kernel",
      "To format the hard drive of the runner",
      "To generate code coverage charts"
    ],
    "answer": "To ensure an immaculate test environment without stale build cache or contaminated artifacts",
    "explanation": "CI runners use clean builds to ensure repeatable test outcomes and eliminate intermittent cache bugs.",
    "hint": "Guarantees reproducible clean builds.",
    "level": "intermediate",
    "codeExample": "# CI script:\ngit clean -fdx\nnpm install\nnpm test"
  },
  {
    "id": "undo-t10-q12",
    "question": "Suppose you have a `.env` file that is listed in `.gitignore`. What will happen if you run `git clean -fd` (WITHOUT `-x`)?",
    "shortAnswer": "The `.env` file will NOT be deleted because standard `git clean` respects `.gitignore` rules.",
    "options": [
      "The `.env` file will be preserved safely because `-x` was not passed",
      "The `.env` file will be deleted immediately",
      "Git will prompt for confirmation for `.env`",
      "Git will crash"
    ],
    "answer": "The `.env` file will be preserved safely because `-x` was not passed",
    "explanation": "Without `-x`, `git clean` protects all ignored files from being touched.",
    "hint": "Ignored files are protected unless -x is passed.",
    "level": "intermediate",
    "codeExample": "# .env is safe under git clean -fd"
  },
  {
    "id": "undo-t10-q13",
    "question": "What happens if you run `git clean -fdx` on a project with `.env` in `.gitignore`?",
    "shortAnswer": "The `.env` file WILL be deleted because `-x` instructs Git to delete all ignored files.",
    "options": [
      "The `.env` file will be deleted because `-x` removes ignored files",
      "Git will protect `.env` automatically",
      "Git will convert `.env` to `.env.example`",
      "The terminal will beep"
    ],
    "answer": "The `.env` file will be deleted because `-x` removes ignored files",
    "explanation": "Because `-x` overrides `.gitignore` protection, secret `.env` files will be purged unless explicitly excluded with `-e`.",
    "hint": "-x deletes all ignored files including .env.",
    "level": "intermediate",
    "codeExample": "git clean -fdx -e \".env\" # Protects .env while cleaning everything else"
  },
  {
    "id": "undo-t10-q14",
    "question": "How can you protect a local `.env` file while running `git clean -fdx` to purge `node_modules` and `dist/`?",
    "shortAnswer": "Pass `-e .env` or `-e .env.local`: `git clean -fdx -e .env`.",
    "options": [
      "`git clean -fdx -e .env`",
      "`git clean -fdx --keep-secrets`",
      "`git clean --safe-env`",
      "`git clean -fdx -p`"
    ],
    "answer": "`git clean -fdx -e .env`",
    "explanation": "The `-e` flag allows selective protection of valuable untracked environment files.",
    "hint": "Use -e to exclude files from clean.",
    "level": "intermediate",
    "codeExample": "git clean -fdx -e \".env*\""
  },
  {
    "id": "undo-t10-q15",
    "question": "What Git configuration option can be set if you want `git clean` to run without requiring the `-f` flag?",
    "shortAnswer": "`git config clean.requireForce false` (Not recommended for safety).",
    "options": [
      "`git config clean.requireForce false`",
      "`git config clean.auto true`",
      "`git config clean.noWarning 1`",
      "`git config clean.forceAlways true`"
    ],
    "answer": "`git config clean.requireForce false`",
    "explanation": "Setting `clean.requireForce false` disables the safety check, though keeping it enabled (`true`) is strongly recommended.",
    "hint": "clean.requireForce controls the force flag requirement.",
    "level": "advanced",
    "codeExample": "git config clean.requireForce false"
  },
  {
    "id": "undo-t10-q16",
    "question": "Does `git clean` touch tracked modified files that have uncommitted edits?",
    "shortAnswer": "No. `git clean` only affects UNTRACKED files. Tracked modified files must be discarded using `git restore` or `git reset`.",
    "options": [
      "No; `git clean` only targets untracked files and leaves tracked files untouched",
      "Yes; it wipes all tracked edits",
      "Only if they are inside a folder named `temp`",
      "Only if they are JavaScript files"
    ],
    "answer": "No; `git clean` only targets untracked files and leaves tracked files untouched",
    "explanation": "Git cleanly divides responsibilities: `restore`/`reset` for tracked files, `clean` for untracked files.",
    "hint": "Clean only touches untracked files.",
    "level": "basic",
    "codeExample": "# Tracked edits are untouched by git clean"
  },
  {
    "id": "undo-t10-q17",
    "question": "What is the mnemonic for the most commonly used safe preview command for `git clean`?",
    "shortAnswer": "`git clean -nd` ('n' = dry-run, 'd' = directories).",
    "options": [
      "`git clean -nd`",
      "`git clean -fd`",
      "`git clean -all`",
      "`git clean -preview`"
    ],
    "answer": "`git clean -nd`",
    "explanation": "Running `git clean -nd` shows all untracked files and directories that are slated for removal.",
    "hint": "-nd = dry-run with directories.",
    "level": "basic",
    "codeExample": "git clean -nd"
  },
  {
    "id": "undo-t10-q18",
    "question": "What is the difference between `git clean -f` and `git clean -fd`?",
    "shortAnswer": "`git clean -f` only removes individual untracked files; `git clean -fd` removes untracked files AND untracked directories.",
    "options": [
      "`-f` only deletes untracked files, leaving untracked folders; `-fd` deletes both untracked files and folders",
      "`-f` is fast; `-fd` is slow",
      "`-f` deletes commits; `-fd` deletes branches",
      "There is no difference"
    ],
    "answer": "`-f` only deletes untracked files, leaving untracked folders; `-fd` deletes both untracked files and folders",
    "explanation": "Without `-d`, Git will leave entire untracked directory structures in your working tree.",
    "hint": "-d is required to remove folders.",
    "level": "basic",
    "codeExample": "git clean -fd # Deletes files and folders"
  },
  {
    "id": "undo-t10-q19",
    "question": "In the classroom at Barrackpore, Debangshu generated 2GB of compilation cache inside `.cache/` which is in `.gitignore`. Which command will delete ONLY the ignored cache without touching untracked test scripts?",
    "shortAnswer": "`git clean -fdX` (uppercase X).",
    "options": [
      "`git clean -fdX`",
      "`git clean -fdx`",
      "`git clean -fd`",
      "`git reset --hard`"
    ],
    "answer": "`git clean -fdX`",
    "explanation": "Uppercase `-X` removes only ignored files and folders, keeping untracked non-ignored source files safe.",
    "hint": "Uppercase -X purges only ignored files.",
    "level": "intermediate",
    "codeExample": "git clean -fdX"
  },
  {
    "id": "undo-t10-q20",
    "question": "Does `git clean` move files to the operating system's Recycle Bin / Trash?",
    "shortAnswer": "No. `git clean` deletes files directly at the filesystem level; they bypass the OS recycle bin.",
    "options": [
      "No; it unlinks files directly from the filesystem, bypassing the OS Recycle Bin",
      "Yes; all files are sent to the Desktop Trash folder",
      "Yes; but only on macOS",
      "Only if `--trash` is supplied"
    ],
    "answer": "No; it unlinks files directly from the filesystem, bypassing the OS Recycle Bin",
    "explanation": "Terminal file unlinks bypass the desktop trash bin. Always dry-run first!",
    "hint": "Terminal deletions bypass the recycle bin.",
    "level": "basic",
    "codeExample": "# Files bypass the OS Recycle Bin"
  },
  {
    "id": "undo-t10-q21",
    "question": "How can you run `git clean` with interactive prompts to confirm every single file deletion?",
    "shortAnswer": "`git clean -i` (or `--interactive`).",
    "options": [
      "`git clean -i` (or `--interactive`)",
      "`git clean --ask`",
      "`git clean -q`",
      "`git clean --confirm`"
    ],
    "answer": "`git clean -i` (or `--interactive`)",
    "explanation": "`git clean -i` launches an interactive menu with options to filter, select numbers, or ask on each file.",
    "hint": "-i launches interactive mode.",
    "level": "basic",
    "codeExample": "git clean -i"
  },
  {
    "id": "undo-t10-q22",
    "question": "What is the output format of `git clean -n`?",
    "shortAnswer": "`Would remove <relative-path-to-file>` for every matched file.",
    "options": [
      "`Would remove <path>`",
      "`Deleted <path>`",
      "`Staged <path>`",
      "`Backup created at <path>`"
    ],
    "answer": "`Would remove <path>`",
    "explanation": "The explicit 'Would remove' text confirms that it is a non-destructive simulation preview.",
    "hint": "'Would remove' indicates dry-run.",
    "level": "basic",
    "codeExample": "Would remove scratch.txt\nWould remove temp.log"
  },
  {
    "id": "undo-t10-q23",
    "question": "If you have untracked files that you want to keep temporarily while cleaning the rest of the workspace, what command should you use instead?",
    "shortAnswer": "`git stash -u` (or `git stash --include-untracked`).",
    "options": [
      "`git stash -u` (or `git stash --include-untracked`)",
      "`git clean --stash`",
      "`git hide`",
      "`git pause`"
    ],
    "answer": "`git stash -u` (or `git stash --include-untracked`)",
    "explanation": "`git stash -u` packages untracked files into the stash stack so they can be popped back later.",
    "hint": "Stash with -u preserves untracked files for later.",
    "level": "intermediate",
    "codeExample": "git stash -u\n# Do your clean work, then:\ngit stash pop"
  },
  {
    "id": "undo-t10-q24",
    "question": "True or False: `git clean` deletes files stored inside the `.git` directory.",
    "shortAnswer": "False. `git clean` operates strictly inside the working tree and never touches `.git` internals.",
    "options": [
      "False; `.git` directory contents are protected and never touched by `git clean`",
      "True; it cleans all commits from `.git`",
      "True; but only with `-f`",
      "False; unless you pass `--delete-git`"
    ],
    "answer": "False; `.git` directory contents are protected and never touched by `git clean`",
    "explanation": "The repository database in `.git/` is completely excluded from working tree clean operations.",
    "hint": "Repository database is never touched by clean.",
    "level": "basic",
    "codeExample": "# .git internals are 100% safe"
  },
  {
    "id": "undo-t10-q25",
    "question": "In summary, what is the professional golden rule for running `git clean`?",
    "shortAnswer": "Never run `git clean -f` without running `git clean -n` (dry-run) first.",
    "options": [
      "Always execute a dry-run (`git clean -nd`) first before running force clean (`git clean -fd`)",
      "Never use git clean",
      "Always use `--force` without looking",
      "Only clean on weekends"
    ],
    "answer": "Always execute a dry-run (`git clean -nd`) first before running force clean (`git clean -fd`)",
    "explanation": "This simple defensive reflex prevents accidental data loss across your entire engineering career.",
    "hint": "Dry-run first, force clean second.",
    "level": "basic",
    "codeExample": "# Step 1: git clean -nd\n# Step 2: git clean -fd"
  }
];

export default questions;
