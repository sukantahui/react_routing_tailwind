/**
 * Topic 1: Fast-Forward (FF) Merges: Moving the target pointer forward without creating a merge commit
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    id: 1,
    question: "Under what exact DAG condition does Git perform a Fast-Forward merge?",
    answer: "A Fast-Forward merge occurs when the target branch currently checked out is a direct ancestor of the incoming branch, meaning no commits were added to the target branch since the fork."
  },
  {
    id: 2,
    question: "Does a Fast-Forward merge create a new merge commit object?",
    answer: "No. Git simply updates the target branch pointer file in `.git/refs/heads/` to point to the incoming branch tip's SHA-1 hash."
  },
  {
    id: 3,
    question: "What does Git output in the terminal when a merge is fast-forwarded?",
    answer: "It displays `Updating <old-sha>..<new-sha>` followed by the word `Fast-forward` and file change statistics."
  },
  {
    id: 4,
    question: "What is the primary advantage of Fast-Forward merging?",
    answer: "It creates a perfectly linear, clean commit history without unnecessary merge commit nodes."
  },
  {
    id: 5,
    question: "What is the primary drawback of Fast-Forward merging in large enterprise teams?",
    answer: "It dissolves the visual boundary of the feature branch, making it harder to identify which group of commits belonged to a specific feature or release sprint."
  },
  {
    id: 6,
    question: "What flag enforces that a merge MUST be fast-forward, aborting if it cannot be fast-forwarded?",
    answer: "`git merge --ff-only <branch-name>`."
  },
  {
    id: 7,
    question: "What flag prevents a fast-forward merge even when Git is able to fast-forward, forcing a merge commit?",
    answer: "`git merge --no-ff <branch-name>`."
  },
  {
    id: 8,
    question: "What error message does Git produce if `git merge --ff-only` fails because branches diverged?",
    answer: "`fatal: Not possible to fast-forward, aborting.`"
  },
  {
    id: 9,
    question: "Why do many teams configure `git config pull.ff only`?",
    answer: "To ensure that `git pull` only updates local branches if it can be done cleanly without creating unexpected merge commits."
  },
  {
    id: 10,
    question: "How long does a fast-forward merge take to execute on a repository with 500,000 commits?",
    answer: "Under 5 milliseconds, because it only updates a 41-byte text file on disk and checks out the changed files."
  },
  {
    id: 11,
    question: "Can a Fast-Forward merge ever produce a merge conflict?",
    answer: "No! A fast-forward merge can never produce a merge conflict because there are no competing or divergent changes to reconcile."
  },
  {
    id: 12,
    question: "What happens to the feature branch pointer after a fast-forward merge into `main`?",
    answer: "Both `main` and `feature` point to the exact same commit SHA. The `feature` branch remains intact until explicitly deleted."
  },
  {
    id: 13,
    question: "What happens if you run `git branch -d feature` immediately after a fast-forward merge?",
    answer: "It succeeds cleanly because Git sees that all commits on `feature` are fully reachable from `main`."
  },
  {
    id: 14,
    question: "How can you tell from `git log` that a fast-forward merge occurred?",
    answer: "The commit history appears completely linear with no branching forks, merge commit nodes, or multi-parent entries."
  },
  {
    id: 15,
    question: "How does `git merge` decide whether to use Fast-Forward or 3-Way merge by default?",
    answer: "Git runs `git merge-base HEAD <incoming>`. If the merge base SHA is identical to HEAD SHA, Git automatically uses Fast-Forward unless `--no-ff` is configured."
  },
  {
    id: 16,
    question: "Can you fast-forward merge when you have uncommitted changes in your working tree?",
    answer: "Only if the uncommitted changes do not conflict with any files modified in the incoming commits; otherwise Git safely blocks the merge."
  },
  {
    id: 17,
    question: "What is the global Git configuration to enforce `--no-ff` on all merges by default?",
    answer: "`git config --global merge.ff false`."
  },
  {
    id: 18,
    question: "What is the global Git configuration to enforce `--ff-only` on all merges?",
    answer: "`git config --global merge.ff only`."
  },
  {
    id: 19,
    question: "How does GitHub's 'Rebase and Merge' button relate to fast-forward merges?",
    answer: "GitHub rebases the feature commits onto `main` and then performs a linear fast-forward merge on the remote repository."
  },
  {
    id: 20,
    question: "What happens to the commit SHAs during a fast-forward merge?",
    answer: "The commit SHAs remain 100% identical; not a single commit object is rewritten or recreated."
  },
  {
    id: 21,
    question: "What happens to the author and committer timestamps during a fast-forward merge?",
    answer: "All timestamps and author attributions are preserved exactly as originally committed on the feature branch."
  },
  {
    id: 22,
    question: "If `main` has commit C1 and `feature` has C1 -> C2 -> C3, what is the parent of C3 after an FF merge?",
    answer: "Commit C2 remains the single parent of C3."
  },
  {
    id: 23,
    question: "What is recorded in `.git/logs/HEAD` during a fast-forward merge?",
    answer: "`merge <branch-name>: Fast-forward` with HEAD moving from old SHA to new SHA."
  },
  {
    id: 24,
    question: "How did Sukanta Hui demonstrate fast-forward merges to Sachin and Mahima at AccoTax Barrackpore?",
    answer: "He showed how Mahima walked 3 steps forward in the hallway while Sachin stood still at the door. Sachin catching up to Mahima simply required walking those same 3 steps along the exact same straight line."
  },
  {
    id: 25,
    question: "When should developers intentionally avoid fast-forward merges using `--no-ff`?",
    answer: "When completing milestone features or release versions where preserving an explicit merge commit and pull request grouping is desired for audit trails."
  }
];

export default questions;
