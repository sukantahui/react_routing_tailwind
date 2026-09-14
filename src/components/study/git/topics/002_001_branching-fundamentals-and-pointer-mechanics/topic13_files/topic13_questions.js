/**
 * Topic 13: Classroom Case Study: Sachin and Mahima inspecting .git/refs/heads/
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "What was the primary educational objective of Sachin and Mahima's classroom experiment at AccoTax Barrackpore?",
    answer: "To inspect the raw filesystem contents of `.git/refs/heads/` in real time and observe exactly how Git moves 41-byte text pointers during branch creation, switching, and committing."
  },
  {
    id: 2,
    question: "What did Sachin and Mahima discover when comparing `.git/refs/heads/main` and `.git/refs/heads/feature-gst` immediately after running `git branch feature-gst`?",
    answer: "Both files contained the exact same 40-character SHA-1 commit hash, proving that branch creation does not duplicate files or history."
  },
  {
    id: 3,
    question: "What happened to `.git/refs/heads/main` when Mahima made a new commit on `feature-gst`?",
    answer: "`.git/refs/heads/main` remained completely untouched (still pointing to Commit C1), while `.git/refs/heads/feature-gst` was updated to the new Commit C2 SHA."
  },
  {
    id: 4,
    question: "What happened when Sachin switched back to `main` and committed C3?",
    answer: "`.git/refs/heads/main` was updated with the SHA of Commit C3, creating two diverged branch pointer files pointing to different commit objects in the DAG."
  },
  {
    id: 5,
    question: "How did Sukanta Hui explain the speed of branch switching to the class?",
    answer: "Because switching branches only updates the `.git/HEAD` pointer and swaps the working tree files that differ between the two commits, it finishes in milliseconds."
  },
  {
    id: 6,
    question: "What tool did Sachin use in the terminal to watch the pointer files update continuously?",
    answer: "The `watch` command: `watch -n 1 'cat .git/refs/heads/main .git/refs/heads/feature-gst'`."
  },
  {
    id: 7,
    question: "How did this experiment dispel the myth that Git branches are physical folder copies?",
    answer: "Students saw that creating 5 new branches added zero MBs to the repository size, only creating five 41-byte text files."
  },
  {
    id: 8,
    question: "What command did Mahima run to see both diverged branches graphically in the terminal?",
    answer: "`git log --graph --oneline --all`."
  },
  {
    id: 9,
    question: "What is the role of `.git/HEAD` during Sachin's commit on `main`?",
    answer: "Git reads `.git/HEAD` (`ref: refs/heads/main`), finds that `main` is active, and writes the new commit SHA into `.git/refs/heads/main`."
  },
  {
    id: 10,
    question: "What happens to the common ancestor commit C1 when both branches diverge?",
    answer: "Commit C1 remains immutable in `.git/objects/`, serving as the shared parent for both C2 and C3 and the merge base for future integration."
  },
  {
    id: 11,
    question: "How did the students verify that no commit objects were duplicated?",
    answer: "By inspecting the object count in `.git/objects/` using `git count-objects -v` before and after branch creation."
  },
  {
    id: 12,
    question: "Can two developers working on the same machine work on two different branches simultaneously in one directory?",
    answer: "No. In a single working directory, only one branch can be checked out to HEAD at a time (unless using `git worktree`)."
  },
  {
    id: 13,
    question: "What command lets you verify the exact byte size of a branch reference file?",
    answer: "`ls -l .git/refs/heads/main` (shows 41 bytes on Linux/macOS, representing 40 hex characters plus 1 newline)."
  },
  {
    id: 14,
    question: "What did Sachin observe in `.git/HEAD` when Mahima switched to `feature-gst`?",
    answer: "The content of `.git/HEAD` changed from `ref: refs/heads/main` to `ref: refs/heads/feature-gst`."
  },
  {
    id: 15,
    question: "How did Mahima test if the branch pointer update was atomic?",
    answer: "She observed that Git writes to a temporary lockfile `.git/refs/heads/feature-gst.lock` before atomically renaming it to prevent partial writes."
  },
  {
    id: 16,
    question: "What happened when Sachin tried to create a branch named `feature-gst` with `git branch feature-gst` while it already existed?",
    answer: "Git prevented accidental overwrite by throwing `fatal: a branch named 'feature-gst' already exists`."
  },
  {
    id: 17,
    question: "How does this experiment help students understand merge conflicts later in Segment 2?",
    answer: "By visualizing C2 and C3 as divergent nodes from common ancestor C1, students clearly see why conflicting edits on the same file lines require manual resolution."
  },
  {
    id: 18,
    question: "What did Sukanta Hui say about deleting a branch after observing this experiment?",
    answer: "'Deleting a branch is just deleting a 41-byte text file with `rm`. The commits C1, C2, and C3 stay safely inside `.git/objects/`.'"
  },
  {
    id: 19,
    question: "What is the benefit of understanding Git's internals at the filesystem level?",
    answer: "It eliminates confusion, removes fear of branching, and enables rapid debugging of complex repository states."
  },
  {
    id: 20,
    question: "How did the students verify the commit parentage of Commit C2?",
    answer: "Using `git cat-file -p <C2-SHA>`, which printed the tree SHA, the parent SHA (pointing to C1), author details, and commit message."
  },
  {
    id: 21,
    question: "What does `git rev-parse feature-gst` return?",
    answer: "The exact 40-character SHA hash stored inside `.git/refs/heads/feature-gst`."
  },
  {
    id: 22,
    question: "How did Sachin test if he could manually create a branch without using `git branch`?",
    answer: "He ran `echo '<C1-SHA>' > .git/refs/heads/manual-branch`, and `git branch` immediately recognized `manual-branch` as a valid branch!"
  },
  {
    id: 23,
    question: "Why should developers still use `git branch` instead of writing manual files?",
    answer: "Because `git branch` validates ref naming rules, creates reflogs, and handles atomic lockfile safety."
  },
  {
    id: 24,
    question: "What key realization did Mahima take away from the classroom experiment?",
    answer: "That Git's entire branching system is essentially a lightweight graph of commit objects with movable text sticky notes pointing to the tips."
  },
  {
    id: 25,
    question: "What was Sukanta Hui's concluding advice to the Barrackpore cohort?",
    answer: "'Branch early, branch often, and never fear branching—because in Git, a branch is just a 41-byte bookmark on an infinite timeline!'"
  }
];

export default questions;
