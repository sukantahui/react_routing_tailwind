/**
 * Topic 12 Questions: Classroom Deep-Dive 12-to-2 Commit Transformation
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "In the Barrackpore classroom deep-dive, what was the primary objective of Sukanta Sir's demonstration?",
    answer: "To demonstrate how to take a disorganized 12-commit feature branch filled with typos, WIP commits, and debug statements, and restructure it into exactly 2 pristine, review-ready Conventional Commits using interactive rebase."
  },
  {
    id: 2,
    question: "What were the two logical domains identified in Debangshu's 12 commits?",
    answer: "1. Core Invoice & ₹ GST Calculation Engine (`feat(invoice)`), and 2. PDF Export & Template Rendering (`feat(pdf)`)."
  },
  {
    id: 3,
    question: "How did Sukanta Sir handle the commit containing `console.log debug statements`?",
    answer: "He marked it with the `drop` (or `d`) directive, removing the temporary debugging statements completely from the Git history."
  },
  {
    id: 4,
    question: "Why is it important to create a backup branch (`git branch backup-pr`) before restructuring 12 commits?",
    answer: "It allows you to run `git diff backup-pr...HEAD` after the rebase to mathematically prove that no actual functional code was accidentally lost or altered during the restructuring."
  },
  {
    id: 5,
    question: "What directive was used to fold 'fixed typo in state' into the invoice feature commit?",
    answer: "The `fixup` directive, which combines the fix into the parent commit without cluttering the commit log."
  },
  {
    id: 6,
    question: "How should you order commits when grouping unrelated files across multiple commits in a rebase script?",
    answer: "Group all commits modifying domain A together at the top under one `pick` directive, followed by all commits modifying domain B under a second `pick` directive."
  },
  {
    id: 7,
    question: "What command verifies that the final squashed branch has zero diff compared to the pre-rebase branch?",
    answer: "`git diff backup-pr HEAD`."
  },
  {
    id: 8,
    question: "What feedback did the enterprise client give after seeing Debangshu's restructured Pull Request?",
    answer: "The Pull Request was approved in under 5 minutes because the commit history was clean, self-explanatory, and followed Conventional Commits."
  },
  {
    id: 9,
    question: "What Conventional Commit type and scope was chosen for the first restructured commit?",
    answer: "`feat(invoice): implement invoice generation and GST calculation engine`."
  },
  {
    id: 10,
    question: "What Conventional Commit type and scope was chosen for the second restructured commit?",
    answer: "`feat(pdf): add PDF export generator with Barrackpore regional header`."
  },
  {
    id: 11,
    question: "Can reordering 12 commits cause merge conflicts?",
    answer: "Yes, if an earlier commit relies on a function or variable created in a later commit that was moved ahead of it."
  },
  {
    id: 12,
    question: "How can you resolve dependency conflicts when reordering commits?",
    answer: "Either move the foundational dependency commit before the dependent commit, or resolve the conflict markers and continue with `git rebase --continue`."
  },
  {
    id: 13,
    question: "Why did Debangshu author 12 messy commits during the week in the first place?",
    answer: "Because making frequent small commits locally is good developer practice for saving work in progress and preventing data loss while experimenting."
  },
  {
    id: 14,
    question: "At what point in the development lifecycle should the 12-to-2 restructuring happen?",
    answer: "Immediately after the feature is completed and tested, but BEFORE opening the public Pull Request or asking teammates for code review."
  },
  {
    id: 15,
    question: "How does the `exec` directive assist in large 12-commit restructuring sessions?",
    answer: "Placing `exec npm test` after each consolidated `pick` commit ensures that both of the new atomic commits compile and pass tests independently."
  },
  {
    id: 16,
    question: "What is the difference between squashing 12 commits into 1 single commit versus 2 logical commits?",
    answer: "Squashing into 2 logical commits separates the invoice backend logic from the PDF UI template logic, allowing independent testing, code reviewing, and future cherry-picking."
  },
  {
    id: 17,
    question: "What should you do if an interactive rebase fails or gets tangled during complex restructuring?",
    answer: "Run `git rebase --abort` to return instantly to your backup state, re-examine the commit dependencies, and try again."
  },
  {
    id: 18,
    question: "How does VS Code's Interactive Rebase Editor make this restructuring visual?",
    answer: "VS Code displays a drag-and-drop UI where you can visually drag commit rows to reorder them and select directives from simple dropdown menus."
  },
  {
    id: 19,
    question: "Can you edit the author name or date during a 12-commit rebase restructuring?",
    answer: "Yes, by using the `edit` directive and amending with `--author='Name <email>'` or `--date='...'`."
  },
  {
    id: 20,
    question: "What happens to the 12 original commit objects in `.git/objects` after the rebase?",
    answer: "They become unreferenced (dangling) commits, safely stored in `git reflog` for 30-90 days until garbage collection runs."
  },
  {
    id: 21,
    question: "How does restructuring PR history benefit team onboarding?",
    answer: "New developers reading the repository git log can understand the architecture in 5 minutes instead of getting confused by weeks of trial-and-error noise."
  },
  {
    id: 22,
    question: "What command shows the summary of files changed across the two new commits?",
    answer: "`git log -n 2 --stat`."
  },
  {
    id: 23,
    question: "What is the role of the PR description versus the squashed commit messages?",
    answer: "The squashed commit messages explain *what* changed at the codebase level; the PR description summarizes *why* the business requirements were met and links to tickets."
  },
  {
    id: 24,
    question: "Why should you not include `console.log` or temporary debug flags in review-ready commits?",
    answer: "Because debug code can leak into production, cause memory leaks, or expose sensitive customer data in client browsers."
  },
  {
    id: 25,
    question: "What is the maximum number of commits a professional Pull Request should typically contain?",
    answer: "Most high-performing engineering teams prefer PRs to contain between 1 and 3 focused, atomic commits."
  },
  {
    id: 26,
    question: "How does `git log --oneline` look after restructuring 12 commits into 2?",
    answer: "It displays just two crisp, clean lines with conventional prefixes, making the branch history crystal clear."
  },
  {
    id: 27,
    question: "Can you delete the `backup-before-restructure` branch once the PR is merged?",
    answer: "Yes, once the PR is merged into `main`, you can safely delete the local backup branch (`git branch -D backup-before-restructure`)."
  },
  {
    id: 28,
    question: "What master lesson did the Barrackpore students take away from this workshop?",
    answer: "'Raw development is messy, but engineering craftsmanship is intentional. Always polish your commit history before presenting your work to the world!'"
  }
];

export default questions;
