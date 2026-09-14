/**
 * Topic 6 Questions: Creating Commits: git commit -m vs Full Editor Multi-line messages
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const topic6_questions = [
  {
    id: 1,
    question: "What physical Git object is written to `.git/objects/` when `git commit` succeeds?",
    options: [
      "A tree object only",
      "A commit object containing pointer to root tree, parent commit hash(es), author, committer, timestamp, and message",
      "A zip file of the whole repository",
      "An XML metadata document"
    ],
    correctAnswer: 1,
    explanation: "A commit object is an immutable text document containing metadata (root tree SHA, parent SHA, author, committer, timestamp, message) stored as a zlib-compressed object."
  },
  {
    id: 2,
    question: "What is the standard '50/72 rule' in Git commit message formatting?",
    options: [
      "50 commits per branch, 72 branches per project",
      "Subject line maximum 50 characters, followed by a blank line, and body paragraphs wrapped at 72 characters",
      "50 lines of code maximum per commit, 72 hours expiration",
      "50% unit test coverage, 72% integration coverage"
    ],
    correctAnswer: 1,
    explanation: "The 50/72 rule advises keeping subject titles under 50 characters (for clean formatting in `git log --oneline` and email patches) and wrapping body text at 72 characters."
  },
  {
    id: 3,
    question: "Why must there ALWAYS be a blank line between the subject line and the body of a commit message?",
    options: [
      "Because Git parsing tools (like git log --oneline, rebase, format-patch) treat everything up to the first blank line as the subject title",
      "To prevent syntax errors in GitHub actions",
      "Because Git compresses commit objects using whitespace tokens",
      "It is required by POSIX file standards"
    ],
    correctAnswer: 0,
    explanation: "Git tooling (`git log --oneline`, `git shortlog`, GitHub UI) considers the text prior to the first blank line as the summary/subject line."
  },
  {
    id: 4,
    question: "What command creates a commit with both a subject and a body directly from the CLI without opening an editor?",
    options: [
      "git commit -m 'Subject Title' -m 'Detailed body paragraph explaining why this was needed.'",
      "git commit -sb 'Subject' 'Body'",
      "git commit --double 'Subject' 'Body'",
      "git commit -m 'Subject' --body 'Body'"
    ],
    correctAnswer: 0,
    explanation: "Passing multiple `-m` flags creates distinct paragraphs separated by blank lines."
  },
  {
    id: 5,
    question: "What happens if you run `git commit` without any `-m` flag?",
    options: [
      "The commit fails with an error",
      "Git opens your configured default text editor (`core.editor`), pre-populated with commented status lines",
      "Git generates an AI commit message",
      "Git commits with an empty message"
    ],
    correctAnswer: 1,
    explanation: "Running `git commit` launches your default text editor (VS Code, Vim, Nano) allowing you to write comprehensive multi-line commit messages."
  },
  {
    id: 6,
    question: "How do you configure VS Code as your default Git commit editor?",
    options: [
      "git config --global core.editor 'code --wait'",
      "git config --global editor.name vscode",
      "git set editor code",
      "code --set-git-default"
    ],
    correctAnswer: 0,
    explanation: "`git config --global core.editor 'code --wait'` instructs Git to launch VS Code and pause terminal execution until you close the commit message tab."
  },
  {
    id: 7,
    question: "What does the `--wait` flag do when configuring an editor like `code --wait` for Git?",
    options: [
      "Delays the commit by 10 seconds",
      "Blocks Git from completing the commit until you finish writing your message and close the editor tab/window",
      "Waits for network connection",
      "Waits for automated test suites to finish"
    ],
    correctAnswer: 1,
    explanation: "Without `--wait`, GUI editors spawn a background process and immediately return control to Git, causing Git to see an empty file and abort the commit."
  },
  {
    id: 8,
    question: "What happens if you leave the commit message file completely empty and save/close your editor?",
    options: [
      "Git assigns a default timestamp as message",
      "Git aborts the commit ('Aborting commit due to empty commit message.') and nothing is committed",
      "Git creates an anonymous commit",
      "Git prompts in terminal for a password"
    ],
    correctAnswer: 1,
    explanation: "Git automatically aborts the commit if no text is provided, ensuring empty messages do not enter history."
  },
  {
    id: 9,
    question: "What does the command `git commit -a` (or `git commit -am 'message'`) do?",
    options: [
      "Automatically stages and commits ALL tracked files that have been modified or deleted, bypassing the explicit `git add` step",
      "Stages untracked new files",
      "Amends the author name",
      "Applies all stashes"
    ],
    correctAnswer: 0,
    explanation: "`-a` automatically stages tracked modifications and deletions before committing, but will NOT stage brand new untracked (`??`) files."
  },
  {
    id: 10,
    question: "Why should developers use `git commit -a` with caution?",
    options: [
      "It can accidentally commit unfinished changes in other tracked files that were not meant for this atomic commit",
      "It deletes git tags",
      "It resets branch tracking",
      "It creates merge conflicts"
    ],
    correctAnswer: 0,
    explanation: "Using `-a` sweeps all tracked modifications across your repository into the commit, violating the discipline of atomic commits."
  },
  {
    id: 11,
    question: "What does `git commit --amend` do?",
    options: [
      "Deletes the previous commit completely",
      "Replaces the most recent commit (HEAD) with a new commit containing updated staged changes and/or a revised commit message",
      "Merges two branches together",
      "Pushes to remote master"
    ],
    correctAnswer: 1,
    explanation: "`git commit --amend` replaces the current HEAD commit with a newly minted commit object incorporating any newly staged files and edited message."
  },
  {
    id: 12,
    question: "If you committed with a typo in the message, how can you fix it without creating a new commit?",
    options: [
      "git commit --amend -m 'Corrected commit message'",
      "git fix -m 'Corrected'",
      "git message update",
      "git revert HEAD"
    ],
    correctAnswer: 0,
    explanation: "`git commit --amend -m '...'` updates the commit message of the most recent commit."
  },
  {
    id: 13,
    question: "Why is it dangerous to run `git commit --amend` on commits that have ALREADY been pushed to a shared remote branch?",
    options: [
      "Because amending creates a brand-new SHA-1 hash, resulting in divergent history that forces destructive force-pushes for collaborators",
      "Because remote servers do not support amending",
      "Because GitHub will ban the repository",
      "Because it resets file permissions"
    ],
    correctAnswer: 0,
    explanation: "Amending changes the commit SHA. If already pushed, collaborators with the old SHA will experience conflicts requiring force-pushing."
  },
  {
    id: 14,
    question: "In the commit message template, what do lines starting with `#` signify?",
    options: [
      "Markdown headings included in the commit message",
      "Comments generated by Git for context that are automatically stripped out when saving the message",
      "Syntax errors",
      "Issue tracking tags"
    ],
    correctAnswer: 1,
    explanation: "Lines starting with `#` are comments showing status information and are automatically discarded by Git when creating the commit."
  },
  {
    id: 15,
    question: "Which grammatical mood should be used in the subject line of a commit message?",
    options: [
      "Past tense (e.g., 'Fixed bug in tax calculator')",
      "Imperative present tense (e.g., 'Fix bug in tax calculator')",
      "Passive voice (e.g., 'Tax calculator was updated')",
      "Continuous tense (e.g., 'Fixing tax calculation issues')"
    ],
    correctAnswer: 1,
    explanation: "Git conventions follow the imperative mood ('Fix bug', 'Add feature') matching Git's own internal messages (e.g. 'Merge branch', 'Revert commit')."
  },
  {
    id: 16,
    question: "What test does the imperative mood commit message satisfy?",
    options: [
      "'If applied, this commit will <your commit message here>'",
      "'Yesterday I did <your commit message here>'",
      "'In the future we want <your commit message here>'",
      "'The client asked to <your commit message here>'"
    ],
    correctAnswer: 0,
    explanation: "A good commit subject completes the sentence: 'If applied, this commit will [Refactor invoice parser]'."
  },
  {
    id: 17,
    question: "What command shows the author, committer, and full commit message of the latest commit?",
    options: [
      "git show HEAD",
      "git status -v",
      "git message",
      "git info"
    ],
    correctAnswer: 0,
    explanation: "`git show HEAD` displays the commit metadata, full multi-line message, and diff of the changes."
  },
  {
    id: 18,
    question: "Can a commit message include links or issue IDs (e.g., `Refs: #104`, `Closes #55`)?",
    options: [
      "Yes, referencing issue IDs in the body or footer is standard practice for issue tracking and GitHub/GitLab automation",
      "No, Git messages cannot contain `#` characters anywhere",
      "Only in paid enterprise Git servers",
      "Only if wrapped in quotes"
    ],
    correctAnswer: 0,
    explanation: "Referencing issue numbers in the commit message body allows automated issue closing and cross-referencing on GitHub and GitLab."
  },
  {
    id: 19,
    question: "What flag to `git commit` allows including verbose diffs inside the commented section of the editor?",
    options: [
      "git commit -v (or --verbose)",
      "git commit -d",
      "git commit --show-diff",
      "git commit -x"
    ],
    correctAnswer: 0,
    explanation: "`git commit -v` displays the exact unified diff in the editor below the comments, letting you inspect your changes while writing the message."
  },
  {
    id: 20,
    question: "What happens if you run `git commit --allow-empty -m 'message'`?",
    options: [
      "Git throws a validation error",
      "Git creates a valid commit object with no tree changes, useful for testing CI pipelines or marking milestones",
      "Git clears the working tree",
      "Git resets HEAD"
    ],
    correctAnswer: 1,
    explanation: "`--allow-empty` records a commit without any file changes, often used to trigger CI/CD workflows."
  },
  {
    id: 21,
    question: "What is the difference between Author and Committer in a Git commit?",
    options: [
      "Author is the person who wrote the original code; Committer is the person who applied or committed the code (e.g., via rebase or cherry-pick)",
      "Author is the project manager; Committer is the developer",
      "Author is the local machine; Committer is GitHub",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Git distinguishes between who originally authored the code (`GIT_AUTHOR_NAME`) and who committed it into the current branch (`GIT_COMMITTER_NAME`)."
  },
  {
    id: 22,
    question: "How can you specify a custom commit message template file for a repository?",
    options: [
      "git config commit.template .gitmessage.txt",
      "git template create",
      "git commit --set-template",
      "npm set commit-template"
    ],
    correctAnswer: 0,
    explanation: "`git config commit.template <path>` configures a template that automatically pre-populates the editor on every `git commit`."
  },
  {
    id: 23,
    question: "Why does Sukanta Hui discourage commit messages like `misc fixes`, `wip`, or `updated stuff`?",
    options: [
      "Because when bugs arise in production, vague commit messages make root-cause analysis (`git bisect`, `git blame`, `git log`) impossible",
      "Because Git will reject commits under 10 characters",
      "Because it violates copyright law",
      "Because GitHub charges fees for short messages"
    ],
    correctAnswer: 0,
    explanation: "Vague commit messages destroy auditability, making debugging and git archaeology painful for teams."
  },
  {
    id: 24,
    question: "What does `git commit --no-edit` do when combined with `--amend`?",
    options: [
      "Amends the staged changes into HEAD while retaining the exact existing commit message without opening an editor",
      "Deletes the commit message",
      "Locks the repository",
      "Reverts unstaged changes"
    ],
    correctAnswer: 0,
    explanation: "`git commit --amend --no-edit` includes newly staged files into the previous commit without changing the commit message."
  },
  {
    id: 25,
    question: "Which of the following represents an exemplary, professional multi-line commit message?",
    options: [
      "feat(auth): implement JWT refresh token rotation\n\nRefresh tokens previously had infinite lifespans, posing security risks on token leakage. This change introduces one-time use rotated tokens stored in Redis with 7-day TTL.\n\nCloses #204",
      "fixed some login stuff and changed token",
      "commit 2",
      "WIP on auth"
    ],
    correctAnswer: 0,
    explanation: "The first option follows Conventional Commits, has an imperative title under 50 chars, a blank line, a detailed body explaining WHY, and references an issue."
  }
];

export default topic6_questions;
