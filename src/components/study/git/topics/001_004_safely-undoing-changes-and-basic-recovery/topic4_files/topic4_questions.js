/**
 * Topic 4 FAQ Assessment Questions:
 * "Understanding Commit Rewriting Risks: Why amending pushed commits causes diverged remote history"
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    "id": "undo-t4-q1",
    "question": "Why does amending a commit that was already pushed to a remote repository result in push rejection?",
    "shortAnswer": "Because amending creates a brand new commit with a different SHA-1 hash that does not have the remote branch's tip as an ancestor, causing Git to reject non-fast-forward updates.",
    "options": [
      "Amending produces a new commit hash; the remote branch tip is no longer an ancestor of the local branch, violating fast-forward rules",
      "Git remote servers crash when amended files are uploaded",
      "Amending deletes the local Git repository credentials",
      "GitHub automatically bans accounts that amend commits"
    ],
    "answer": "Amending produces a new commit hash; the remote branch tip is no longer an ancestor of the local branch, violating fast-forward rules",
    "explanation": "Git only permits fast-forward pushes unless forced. Since the amended commit replaces the old commit rather than building on top of it, the histories have diverged.",
    "hint": "Think about fast-forward parentage versus branched divergence.",
    "level": "intermediate",
    "codeExample": "git push origin main\n# ! [rejected]        main -> main (non-fast-forward)"
  },
  {
    "id": "undo-t4-q2",
    "question": "What is the primary danger of running `git push --force` on a shared collaborative branch like `main`?",
    "shortAnswer": "It overwrites remote history, potentially erasing teammates' committed work and causing corrupted, confusing histories on colleagues' local checkouts.",
    "options": [
      "It overwrites the remote branch pointer and can permanently destroy commits pushed by teammates who based their work on the original commit",
      "It deletes all files in the root folder of the local operating system",
      "It changes the repository license to GPLv3",
      "It makes the repository private automatically"
    ],
    "answer": "It overwrites the remote branch pointer and can permanently destroy commits pushed by teammates who based their work on the original commit",
    "explanation": "Force-pushing forcefully moves the remote ref without checking if anyone else has committed on top of the original commit.",
    "hint": "Overwriting shared pointers causes data loss for collaborators.",
    "level": "intermediate",
    "codeExample": "# DANGEROUS on shared branches:\ngit push --force origin main"
  },
  {
    "id": "undo-t4-q3",
    "question": "What safer alternative to `git push --force` should always be preferred on feature branches?",
    "shortAnswer": "`git push --force-with-lease`",
    "options": [
      "`git push --force-with-lease`",
      "`git push --safe`",
      "`git push --try-harder`",
      "`git push --ignore-errors`"
    ],
    "answer": "`git push --force-with-lease`",
    "explanation": "`--force-with-lease` checks if the remote reference matches your local tracking branch before overwriting, preventing you from accidentally destroying a teammate's unexpected commits.",
    "hint": "Look for the lease concept.",
    "level": "intermediate",
    "codeExample": "git push --force-with-lease origin feat-login"
  },
  {
    "id": "undo-t4-q4",
    "question": "What does Git report in `git status` after you amend a commit that already exists on `origin/main`?",
    "shortAnswer": "It reports that your branch and `origin/main` have diverged, and have 1 and 1 different commits each, respectively.",
    "options": [
      "Your branch and 'origin/main' have diverged, and have 1 and 1 different commits each",
      "Your branch is up to date with 'origin/main'",
      "Your branch is ahead of 'origin/main' by 1 commit",
      "Your local repository is corrupted"
    ],
    "answer": "Your branch and 'origin/main' have diverged, and have 1 and 1 different commits each",
    "explanation": "The local branch has the new amended commit (C1'), while the remote tracking branch still has the original commit (C1). Both stem from C0.",
    "hint": "Both branches have 1 unique commit stemming from the common ancestor.",
    "level": "basic",
    "codeExample": "Your branch and 'origin/main' have diverged,\nand have 1 and 1 different commits each, respectively."
  },
  {
    "id": "undo-t4-q5",
    "question": "What is the 'Golden Rule of Git' regarding history rewriting?",
    "shortAnswer": "Never rewrite history on a public or shared branch that other developers rely on.",
    "options": [
      "Never rewrite public history that other developers might have pulled or branched from",
      "Always commit with the `--force` flag",
      "Never create more than 5 commits per day",
      "Always delete the `.git` folder before pushing"
    ],
    "answer": "Never rewrite public history that other developers might have pulled or branched from",
    "explanation": "Rewriting private local branches is recommended for cleanliness, but rewriting shared public branches creates chaos for teammates.",
    "hint": "Private = rewrite safely; Public = append or revert only.",
    "level": "basic",
    "codeExample": "# For public branches, use:\ngit revert <commit-sha>"
  },
  {
    "id": "undo-t4-q6",
    "question": "If you already pushed a commit with a typo to a shared branch, what is the professional, non-destructive way to fix it?",
    "shortAnswer": "Make a new commit with the fix or use `git revert` to undo faulty logic, and push normally.",
    "options": [
      "Create a new follow-up commit that fixes the issue and push it normally",
      "Run `git reset --hard HEAD~1` and force push",
      "Delete the repository on GitHub and re-create it",
      "Ask all colleagues to format their hard drives"
    ],
    "answer": "Create a new follow-up commit that fixes the issue and push it normally",
    "explanation": "Adding a new commit moves history forward linearly and avoids all remote conflicts and synchronization issues for teammates.",
    "hint": "Always move forward on shared branches.",
    "level": "basic",
    "codeExample": "echo \"fixed code\" > file.js\ngit commit -am \"fix: correct typo in tax calculation\"\ngit push origin main"
  },
  {
    "id": "undo-t4-q7",
    "question": "What happens if a teammate runs `git pull` after you force-pushed an amended commit over a commit they already had locally?",
    "shortAnswer": "Git will either attempt a 3-way merge that revives the old commit or fail with conflicting histories.",
    "options": [
      "Git may create an unwanted merge commit that brings the old amended commit back into history",
      "The teammate's computer will shut down",
      "Git will automatically rewrite the teammate's local branches without warning",
      "The remote server will revert to initial commit"
    ],
    "answer": "Git may create an unwanted merge commit that brings the old amended commit back into history",
    "explanation": "Because the teammate's local history still contains C1, a standard `git pull` (merge) will merge C1 and C1', resurrecting the faulty old code.",
    "hint": "Pulling merges the old and new branches.",
    "level": "advanced",
    "codeExample": "# Teammate's log will show duplicate/conflicting commits after merge"
  },
  {
    "id": "undo-t4-q8",
    "question": "Which command allows you to view the exact divergence between your current branch and its upstream tracking branch?",
    "shortAnswer": "`git log --graph --oneline --decorate HEAD @{u}` or `git log --left-right --boundary HEAD...@{u}`",
    "options": [
      "`git log --graph --oneline --decorate HEAD @{u}`",
      "`git show --diverge`",
      "`git diff --branches-all`",
      "`git status --force-show`"
    ],
    "answer": "`git log --graph --oneline --decorate HEAD @{u}`",
    "explanation": "`@{u}` refers to the upstream tracking branch (e.g., origin/main), allowing visual inspection of diverging commits.",
    "hint": "Notice the @{u} upstream syntax.",
    "level": "intermediate",
    "codeExample": "git log --oneline --graph --boundary HEAD...@{u}"
  },
  {
    "id": "undo-t4-q9",
    "question": "Can GitHub repository administrators prevent accidental force-pushes on main?",
    "shortAnswer": "Yes, by configuring Branch Protection Rules or Repository Rulesets to block force pushes.",
    "options": [
      "Yes, by enabling 'Require a pull request' and checking 'Do not allow force pushes' in Branch Protection Rules",
      "No, Git does not allow blocking force pushes",
      "Only if the server is hosted on Linux",
      "Only by deleting write permissions for everyone"
    ],
    "answer": "Yes, by enabling 'Require a pull request' and checking 'Do not allow force pushes' in Branch Protection Rules",
    "explanation": "Branch protection rules in GitHub / GitLab are standard enterprise safeguards against destructive history rewriting.",
    "hint": "Branch Protection Rules enforce push constraints.",
    "level": "basic",
    "codeExample": "# GitHub Settings -> Branches -> Add rule -> Restrict force pushes"
  },
  {
    "id": "undo-t4-q10",
    "question": "What is the difference between `git push -f` and `git push --force-with-lease`?",
    "shortAnswer": "`git push -f` blindly overwrites the remote regardless of remote state; `--force-with-lease` only overwrites if the remote ref hasn't changed since your last fetch.",
    "options": [
      "`--force-with-lease` only overwrites if the remote ref has not been updated by someone else since your last fetch",
      "`-f` only works on master branch",
      "`--force-with-lease` is a paid GitHub enterprise feature",
      "There is no functional difference"
    ],
    "answer": "`--force-with-lease` only overwrites if the remote ref has not been updated by someone else since your last fetch",
    "explanation": "`--force-with-lease` acts as an atomic compare-and-swap on the remote branch ref.",
    "hint": "Lease provides a safety check against race conditions.",
    "level": "intermediate",
    "codeExample": "git push --force-with-lease origin feature-branch"
  },
  {
    "id": "undo-t4-q11",
    "question": "Why is a Git commit hash described as cryptographically immutable?",
    "shortAnswer": "Because the hash is calculated from all tree data, author/committer timestamps, parent hashes, and message; changing any detail alters the resulting SHA hash completely.",
    "options": [
      "Because the SHA hash is calculated from every single byte of metadata, parent references, and content snapshots",
      "Because commits are encrypted with an RSA 4096-bit private key",
      "Because Linux Torvalds holds the secret master key",
      "Because it is locked by the operating system kernel"
    ],
    "answer": "Because the SHA hash is calculated from every single byte of metadata, parent references, and content snapshots",
    "explanation": "The SHA algorithm generates a unique fingerprint. Any modification generates an entirely new hash.",
    "hint": "Hash sensitivity ensures data integrity.",
    "level": "intermediate",
    "codeExample": "# Hash depends on: Tree + Parent SHA + Author + Committer + Message"
  },
  {
    "id": "undo-t4-q12",
    "question": "How does a teammate fix their local branch if someone force-pushed a legitimate rebased/amended branch that they were working on?",
    "shortAnswer": "`git fetch origin && git reset --hard origin/<branch>`",
    "options": [
      "`git fetch origin` followed by `git reset --hard origin/<branch>`",
      "`git push --force`",
      "`git clean -fdx`",
      "`git checkout origin/<branch>`"
    ],
    "answer": "`git fetch origin` followed by `git reset --hard origin/<branch>`",
    "explanation": "Fetching the new remote state and hard resetting local HEAD to match `origin/<branch>` aligns the developer's tree with the newly rewritten remote pointer.",
    "hint": "Fetch first, then reset to the remote tracking branch.",
    "level": "advanced",
    "codeExample": "git fetch origin\ngit reset --hard origin/feat-login"
  },
  {
    "id": "undo-t4-q13",
    "question": "If you amend a commit on a personal feature branch with only you collaborating, is force pushing acceptable?",
    "shortAnswer": "Yes, using `--force-with-lease` on an unshared personal feature branch or PR branch is standard practice for clean history.",
    "options": [
      "Yes, using `git push --force-with-lease` on your isolated feature branch is standard industry practice",
      "No, you must delete your GitHub repository and re-fork",
      "No, you should never push again",
      "Only if you have fewer than 10 lines of code"
    ],
    "answer": "Yes, using `git push --force-with-lease` on your isolated feature branch is standard industry practice",
    "explanation": "Feature branches prior to PR merge can be cleaned and polished using rebase/amend and safe force-with-lease pushes.",
    "hint": "Isolated feature branches can be curated before merging.",
    "level": "basic",
    "codeExample": "git commit --amend -m \"feat: complete feature\"\ngit push --force-with-lease origin feature-xyz"
  },
  {
    "id": "undo-t4-q14",
    "question": "What is the output symbol for local vs remote commits in `git log --left-right HEAD...@{u}`?",
    "shortAnswer": "`<` denotes commits unique to the left ref (HEAD), and `>` denotes commits unique to the right ref (`@{u}`).",
    "options": [
      "`<` indicates commits only in HEAD; `>` indicates commits only in upstream",
      "`+` means added and `-` means removed",
      "`*` means local and `!` means remote",
      "There are no symbols, only colors"
    ],
    "answer": "`<` indicates commits only in HEAD; `>` indicates commits only in upstream",
    "explanation": "The `--left-right` flag marks commits with directional angle brackets based on which side of the symmetric difference (`...`) they belong to.",
    "hint": "Left is local HEAD (<), right is upstream (>).",
    "level": "intermediate",
    "codeExample": "git log --left-right --oneline HEAD...origin/main"
  },
  {
    "id": "undo-t4-q15",
    "question": "Suppose Sachin amended a commit on `main` and ran `git push -f`. Susmita then ran `git pull`. What kind of commit will be created in Susmita's local repo?",
    "shortAnswer": "A merge commit combining her local original commit with Sachin's amended commit, duplicating changes.",
    "options": [
      "A redundant merge commit that re-introduces the original un-amended commit back into the tree",
      "A fast-forward commit",
      "An atomic commit",
      "No commit; Git will delete her repository"
    ],
    "answer": "A redundant merge commit that re-introduces the original un-amended commit back into the tree",
    "explanation": "Git pull attempts to merge upstream with local. Since both share an older common ancestor, Git merges them, re-adding the discarded code.",
    "hint": "Git pull defaults to merging divergent tips.",
    "level": "advanced",
    "codeExample": "# Merge commit re-merges C1 and C1'"
  },
  {
    "id": "undo-t4-q16",
    "question": "Why does Git never allow editing existing commit objects in place inside `.git/objects/`?",
    "shortAnswer": "Because Git is a content-addressable database where object addresses are strict hash checksums of their contents.",
    "options": [
      "Because Git is a content-addressable storage engine where the storage key is the cryptographic checksum of the content itself",
      "Because hard drives do not support text editing",
      "Because file permissions in Linux block in-place edits",
      "Because of WebAssembly constraints"
    ],
    "answer": "Because Git is a content-addressable storage engine where the storage key is the cryptographic checksum of the content itself",
    "explanation": "If the content changes, its address (SHA-1 hash) must change. In-place modification is mathematically impossible in content-addressable systems.",
    "hint": "Content-addressable storage guarantees tamper-evidence.",
    "level": "advanced",
    "codeExample": "# Hash(object_content) = object_key"
  },
  {
    "id": "undo-t4-q17",
    "question": "What is the recommended Git configuration setting to prevent automatic merge commits when pulling?",
    "shortAnswer": "`git config --global pull.rebase true` or `git config --global pull.ff only`",
    "options": [
      "`git config --global pull.ff only` or `pull.rebase true`",
      "`git config --global pull.force true`",
      "`git config --global merge.disabled true`",
      "`git config --global git.safety maximum`"
    ],
    "answer": "`git config --global pull.ff only` or `pull.rebase true`",
    "explanation": "Setting `pull.ff only` prevents accidental merge commits if branches diverge, giving the developer a chance to inspect changes safely.",
    "hint": "Look for fast-forward only or rebase options.",
    "level": "intermediate",
    "codeExample": "git config --global pull.ff only"
  },
  {
    "id": "undo-t4-q18",
    "question": "In Git's DAG (Directed Acyclic Graph), what relationship do an original commit C1 and its amended version C1' have?",
    "shortAnswer": "They are sibling nodes that share the same parent commit C0, but have different commit hashes and trees.",
    "options": [
      "They are sibling nodes sharing the same parent commit C0",
      "C1' is a child of C1",
      "C1 is a child of C1'",
      "They are the exact same node in the graph"
    ],
    "answer": "They are sibling nodes sharing the same parent commit C0",
    "explanation": "Amending duplicates the parent pointer from C0 to create C1', leaving C1 and C1' as independent branches of the DAG.",
    "hint": "Both branch out from the same parent C0.",
    "level": "intermediate",
    "codeExample": "   C1 (pushed, orphaned on local)\n  /\nC0\n  \\\n   C1' (amended, new HEAD)"
  },
  {
    "id": "undo-t4-q19",
    "question": "Which tool or log in Git allows you to recover the original commit hash if you amended by accident?",
    "shortAnswer": "`git reflog`",
    "options": [
      "`git reflog`",
      "`git recover`",
      "`git undelete`",
      "`git trash`"
    ],
    "answer": "`git reflog`",
    "explanation": "The reference log records every change to HEAD. The previous commit hash before amending is preserved in `reflog`.",
    "hint": "The black box recorder of Git.",
    "level": "basic",
    "codeExample": "git reflog\n# HEAD@{1}: commit (amend): ...\n# HEAD@{2}: commit: original message"
  },
  {
    "id": "undo-t4-q20",
    "question": "If you accidentally amended a commit on your local branch and want to restore the un-amended state using reflog, what command do you run?",
    "shortAnswer": "`git reset --hard HEAD@{1}` (or the specific SHA from reflog).",
    "options": [
      "`git reset --hard HEAD@{1}`",
      "`git checkout origin`",
      "`git revert HEAD`",
      "`git stash pop`"
    ],
    "answer": "`git reset --hard HEAD@{1}`",
    "explanation": "Resetting hard to `HEAD@{1}` moves the HEAD pointer and working tree back to where it was immediately before the amend command.",
    "hint": "Point HEAD back to the state before the amend operation.",
    "level": "intermediate",
    "codeExample": "git reset --hard HEAD@{1}"
  },
  {
    "id": "undo-t4-q21",
    "question": "True or False: Running `git commit --amend` modifies the original author date timestamp by default.",
    "shortAnswer": "False. It preserves the AuthorDate and only updates the CommitDate unless `--date` or `--reset-author` is passed.",
    "options": [
      "False; it preserves the original author date while updating the committer date",
      "True; all dates are wiped and reset to 1970",
      "True; both author and committer dates always change to current time",
      "False; Git does not store dates in commits"
    ],
    "answer": "False; it preserves the original author date while updating the committer date",
    "explanation": "Git distinguishes between Author (who wrote the code) and Committer (who applied the commit). Amending updates the committer date.",
    "hint": "Author date stays preserved unless explicitly reset.",
    "level": "intermediate",
    "codeExample": "git commit --amend --date=\"now\" # explicitly changes author date"
  },
  {
    "id": "undo-t4-q22",
    "question": "When Mahima pushed a feature branch to GitHub and opened a Pull Request, the CI failed due to a lint error. Can she safely amend and `--force-with-lease` push to her PR branch?",
    "shortAnswer": "Yes, rewriting history on an isolated personal PR branch before it is merged into `main` is widely accepted and recommended in most engineering teams.",
    "options": [
      "Yes, amending and force-pushing with lease to a personal PR branch keeps the final merge history clean",
      "No, she must delete her GitHub account",
      "No, CI runners will explode",
      "Only if she closes the PR first"
    ],
    "answer": "Yes, amending and force-pushing with lease to a personal PR branch keeps the final merge history clean",
    "explanation": "Pre-merge PR branches are considered developer workspaces. Polishing commits before merging to main is standard practice.",
    "hint": "PR branches are still in-flight developer branches.",
    "level": "basic",
    "codeExample": "git add .\ngit commit --amend --no-edit\ngit push --force-with-lease origin feat-tax-calc"
  },
  {
    "id": "undo-t4-q23",
    "question": "What happens to the unreachable dangling commits in `.git/objects/` over time?",
    "shortAnswer": "They remain on disk until pruned by Git's automatic garbage collection (`git gc`), typically after 30 to 90 days.",
    "options": [
      "They remain until pruned by `git gc` (garbage collection) after their reflog expiry period",
      "They are deleted within 1 millisecond",
      "They are uploaded to Linus Torvalds' server",
      "They cause permanent hard drive corruption"
    ],
    "answer": "They remain until pruned by `git gc` (garbage collection) after their reflog expiry period",
    "explanation": "Git's garbage collection protects dangling objects for a grace period (default 30 days for unreachable, 90 days for reflog entries).",
    "hint": "Git garbage collector (git gc) cleans up old dangling objects.",
    "level": "advanced",
    "codeExample": "git gc --prune=now # forces immediate cleanup"
  },
  {
    "id": "undo-t4-q24",
    "question": "In a corporate enterprise environment with compliance regulations (e.g., SOC2, ISO27001), why are force-pushes on production branches strictly blocked?",
    "shortAnswer": "To ensure audit trail immutability and prevent intentional or accidental erasure of code changes and peer review records.",
    "options": [
      "To maintain an immutable, tamper-proof audit trail of all approved and deployed source code changes",
      "Because Git servers run slower with force-pushes",
      "Because force-push requires payment of ₹50,000 per push",
      "To save internet bandwidth"
    ],
    "answer": "To maintain an immutable, tamper-proof audit trail of all approved and deployed source code changes",
    "explanation": "Security frameworks require non-repudiation and permanent auditability. Overwriting history destroys verifiable audit trails.",
    "hint": "Compliance demands immutable audit records.",
    "level": "intermediate",
    "codeExample": "# Compliance rule: No history alterations on production/release refs"
  },
  {
    "id": "undo-t4-q25",
    "question": "What is the key takeaway for everyday developer workflows when deciding whether to amend or create a new commit?",
    "shortAnswer": "Amend private local commits freely; create new follow-up commits for anything that has already touched a shared remote branch.",
    "options": [
      "Amend private local commits freely to maintain clean atomic history; create new follow-up commits on shared remote branches",
      "Never commit at all",
      "Always amend everything, even months-old production releases",
      "Only amend when working on Sundays"
    ],
    "answer": "Amend private local commits freely to maintain clean atomic history; create new follow-up commits on shared remote branches",
    "explanation": "This simple heuristic ensures clean local history while guaranteeing total safety and collaboration harmony on shared team branches.",
    "hint": "Private = polish freely; Shared = append forward.",
    "level": "basic",
    "codeExample": "# Private branch: amend & rebase\n# Shared branch: new commit or git revert"
  }
];

export default questions;
