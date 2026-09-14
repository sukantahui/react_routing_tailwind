/**
 * Topic 2: Three-Way (3-Way) Merges & Finding the Merge Base
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "Why is Git's merge algorithm called a 'Three-Way' (3-way) merge?",
    answer: "Because it compares three distinct snapshots: the common ancestor commit (Merge Base), the current active branch tip (HEAD/'ours'), and the incoming branch tip ('theirs')."
  },
  {
    id: 2,
    question: "What is a 'Merge Base' in Git?",
    answer: "The best common ancestor commit between two branches in the directed acyclic graph (DAG) where the branches originally diverged."
  },
  {
    id: 3,
    question: "What plumbing command computes the merge base commit SHA between two branches?",
    answer: "`git merge-base <branchA> <branchB>` (e.g. `git merge-base main feature-gst`)."
  },
  {
    id: 4,
    question: "How does a 3-way merge differ fundamentally from a 2-way diff?",
    answer: "A 2-way diff only knows that two files differ but cannot determine which branch made the modification. A 3-way merge uses the base snapshot to identify which branch introduced each change."
  },
  {
    id: 5,
    question: "If a line in the Base snapshot is unchanged in 'ours' but modified in 'theirs', what does Git do automatically?",
    answer: "Git automatically incorporates the modification from 'theirs' into the final merged file without conflict."
  },
  {
    id: 6,
    question: "If a line in the Base snapshot is modified in 'ours' but unchanged in 'theirs', what does Git do automatically?",
    answer: "Git automatically preserves the modification from 'ours' in the final merged file without conflict."
  },
  {
    id: 7,
    question: "Under what condition does a 3-way merge trigger a merge conflict?",
    answer: "When both 'ours' and 'theirs' have modified the exact same lines differently compared to the Base snapshot."
  },
  {
    id: 8,
    question: "How can you programmatically test whether branch A is an ancestor of branch B?",
    answer: "`git merge-base --is-ancestor branchA branchB` returns exit code 0 if true, and 1 if false."
  },
  {
    id: 9,
    question: "What is a 'criss-cross merge'?",
    answer: "A situation where two branches have merged with each other repeatedly in the past, resulting in multiple common ancestor candidates in the DAG."
  },
  {
    id: 10,
    question: "How does the `git merge-base --all` flag handle criss-cross merges?",
    answer: "`git merge-base --all branchA branchB` outputs all common ancestors."
  },
  {
    id: 11,
    question: "How does Git's recursive/ORT merge strategy resolve multiple merge bases?",
    answer: "It creates a temporary 'virtual merge base' by recursively merging the common ancestors into a single synthetic tree."
  },
  {
    id: 12,
    question: "What is the structure of the commit created at the end of a successful 3-way merge?",
    answer: "It is a 'Merge Commit' with a new commit SHA, a new tree snapshot, and TWO parent commit SHAs pointing to HEAD and the incoming branch."
  },
  {
    id: 13,
    question: "What command inspects the parents of the current merge commit?",
    answer: "`git rev-parse HEAD^1 HEAD^2` (or `git log -n 1 --pretty=raw`)."
  },
  {
    id: 14,
    question: "What is the difference between `HEAD^1` and `HEAD^2` on a merge commit?",
    answer: "`HEAD^1` is the first parent (the target branch you were on during merge), while `HEAD^2` is the second parent (the branch that was merged in)."
  },
  {
    id: 15,
    question: "Can a 3-way merge succeed automatically if both branches modified different files?",
    answer: "Yes, 100% automatically! Git takes all file additions, updates, and deletions from both branches and merges them into the new tree."
  },
  {
    id: 16,
    question: "Can a 3-way merge succeed automatically if both branches modified different lines in the same file?",
    answer: "Yes! Git's line-by-line diff engine synthesizes both changes seamlessly as long as the edited hunks do not overlap."
  },
  {
    id: 17,
    question: "What command lets you view the diff between the merge base and the incoming branch?",
    answer: "`git diff $(git merge-base main feature) feature` (or `git diff main...feature`)."
  },
  {
    id: 18,
    question: "What is the default merge commit message format in a 3-way merge?",
    answer: "`Merge branch '<branch-name>' into <target-branch>`."
  },
  {
    id: 19,
    question: "How can you supply a custom commit message for a 3-way merge commit?",
    answer: "`git merge -m \"feat: merge billing system\" feature`."
  },
  {
    id: 20,
    question: "What flag allows Git to open your default text editor to review the merge commit message before saving?",
    answer: "`git merge --edit <branch-name>` (or `--no-edit` to accept default without prompting)."
  },
  {
    id: 21,
    question: "Where are merge state files temporarily held during an ongoing 3-way merge before committing?",
    answer: "In `.git/MERGE_HEAD` and `.git/MERGE_MSG`."
  },
  {
    id: 22,
    question: "What does `git merge-base --fork-point main feature` do?",
    answer: "It finds the reflog-aware fork point where `feature` was originally branched off `main`, even if `main` was rebased since."
  },
  {
    id: 23,
    question: "Can you abort a 3-way merge if conflicts arise?",
    answer: "Yes: `git merge --abort` resets your working tree, staging index, and HEAD back to the pre-merge state."
  },
  {
    id: 24,
    question: "How did Sukanta Hui explain the 3-Way merge algorithm to Sachin and Mahima at AccoTax Barrackpore?",
    answer: "He compared it to an original master invoice template (Base). Sachin added payroll to the top; Mahima added GST to the bottom. Because both compared against the same template and edited different sections, Sukanta stapled them together effortlessly."
  },
  {
    id: 25,
    question: "Why is calculating the merge base accurately so essential for version control correctness?",
    answer: "Because without the correct merge base, Git would not know whether a difference between branches was an intentional deletion, a new addition, or a regression."
  }
];

export default questions;
