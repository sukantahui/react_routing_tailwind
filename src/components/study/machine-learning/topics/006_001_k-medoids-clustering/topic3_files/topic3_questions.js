const questions = [
  {
    question: "Who originally designed the PAM (Partitioning Around Medoids) algorithm and in what year?",
    shortAnswer: "Leonard Kaufman and Peter J. Rousseeuw in 1987.",
    explanation: "Introduced in their landmark work 'Clustering by means of Medoids'.",
    hint: "Kaufman & Rousseeuw (1987).",
    level: "basic"
  },
  {
    question: "What are the two major phases of the standard PAM algorithm?",
    shortAnswer: "1. The BUILD phase (greedy initialization of k medoids) and 2. The SWAP phase (iterative cost-decreasing medoid replacement).",
    explanation: "BUILD provides a high-quality initial configuration; SWAP iteratively refines medoids toward a local optimum.",
    hint: "BUILD phase and SWAP phase.",
    level: "basic"
  },
  {
    question: "How is the very first medoid selected during the BUILD phase of PAM?",
    shortAnswer: "It is chosen as the single point in the entire dataset that minimizes the sum of distances to all other points (the global medoid).",
    explanation: "first_medoid = argmin_i sum_j d(x_i, x_j).",
    hint: "Point minimizing sum of distances to all other points.",
    level: "basic"
  },
  {
    question: "How are subsequent medoids (from 2 to k) chosen in the BUILD phase?",
    shortAnswer: "In each step, the non-medoid point that maximizes the reduction in total clustering cost is added greedily.",
    explanation: "Calculates the gain: sum max(0, D_current(j) - d(j, candidate)).",
    hint: "Maximizes reduction in total clustering cost.",
    level: "intermediate"
  },
  {
    question: "What does the SWAP phase evaluate at every iteration?",
    shortAnswer: "All possible pairs of (current medoid m, non-medoid h) to calculate the total cost change Delta C.",
    explanation: "Determines if replacing m with h reduces the total dissimilarity across all N points.",
    hint: "Tests replacing medoid m with non-medoid h.",
    level: "basic"
  },
  {
    question: "What is the mathematical condition required for a candidate swap (m -> h) to be accepted?",
    shortAnswer: "The total cost difference Delta C must be negative (Delta C < 0), and PAM selects the swap with the most negative Delta C.",
    explanation: "Guarantees monotonic decrease in total clustering cost.",
    hint: "Delta C < 0 (Cost decrease).",
    level: "basic"
  },
  {
    question: "When does the SWAP phase of the PAM algorithm terminate?",
    shortAnswer: "When no possible swap of any medoid with any non-medoid yields a negative Delta C (min Delta C >= 0).",
    explanation: "Indicates that a local minimum in total dissimilarity cost has been reached.",
    hint: "No swap reduces cost.",
    level: "basic"
  },
  {
    question: "What is the time complexity of a single SWAP iteration in PAM?",
    options: ["O(k * (n - k)^2)", "O(n * k)", "O(n^3)", "O(k^2)"],
    correctAnswer: 0,
    explanation: "There are k medoids and (n - k) non-medoids (k*(n-k) pairs), and evaluating each pair requires examining (n-k) points, yielding O(k*(n-k)^2).",
    level: "advanced"
  },
  {
    question: "Why does PAM scale poorly on large datasets with N > 50,000 observations?",
    shortAnswer: "Because its O(k*(n-k)^2) per-iteration complexity and O(N^2) distance matrix memory become computational bottlenecks.",
    explanation: "Requires millions of pairwise distance evaluations.",
    hint: "Quadratic memory and cubic-like swap evaluations.",
    level: "intermediate"
  },
  {
    question: "How does CLARA (Clustering Large Applications) solve PAM's scalability limitation?",
    shortAnswer: "CLARA draws multiple small random subsamples (e.g. sample size 40 + 2k), runs PAM on each subsample, and selects the best overall medoids for the full dataset.",
    explanation: "Drastically reduces execution time while maintaining good cluster approximations.",
    hint: "Sampling-based PAM approximation.",
    level: "intermediate"
  },
  {
    question: "How does FastPAM (Faster Partitioning Around Medoids) optimize the SWAP phase?",
    shortAnswer: "FastPAM re-arranges the nested loops and caches nearest/second-nearest medoid distances, reducing per-iteration complexity from O(k*(n-k)^2) to O(k*(n-k)).",
    explanation: "Achieves an O(n) speedup without altering the exact mathematical result.",
    hint: "FastPAM reduces complexity to O(k*(n-k)).",
    level: "advanced"
  },
  {
    question: "Is PAM guaranteed to reach the global minimum cost?",
    shortAnswer: "No, PAM is a greedy local search heuristic that converges to a local minimum.",
    explanation: "Like K-Means, running PAM from multiple random or greedy starts helps locate the best local optimum.",
    hint: "Converges to local minimum.",
    level: "basic"
  },
  {
    question: "What are the 4 case categories considered when calculating the contribution C_{jih} of point j to a swap (i -> h)?",
    shortAnswer: "Case 1: j currently in i's cluster, closer to h; Case 2: j currently in i's cluster, closer to second-best medoid; Case 3: j in another cluster, closer to h; Case 4: j in another cluster, unaffected.",
    explanation: "Standard 4-case decomposition in Kaufman & Rousseeuw's original PAM formulation.",
    hint: "4 assignment transition cases.",
    level: "advanced"
  },
  {
    question: "Can PAM be applied directly to an asymmetric distance matrix?",
    shortAnswer: "PAM mathematically assumes symmetric distances d(i, j) = d(j, i); for asymmetric matrices, it is standard to symmetrize: D_sym = (D + D^T) / 2.",
    explanation: "Ensures consistent intra-cluster distance calculations.",
    hint: "Requires symmetric distance matrix.",
    level: "intermediate"
  },
  {
    question: "How does PAM assign non-medoid points to clusters once medoids are fixed?",
    shortAnswer: "Each non-medoid point j is assigned to the medoid m with the smallest distance d(j, m).",
    explanation: "Creates Voronoi-like partitions in the metric space.",
    hint: "Assigned to the nearest medoid.",
    level: "basic"
  },
  {
    question: "What is the memory requirement for storing a precomputed distance matrix of N = 10,000 float64 points?",
    options: ["~800 MB (10,000 * 10,000 * 8 bytes)", "~8 MB", "~80 MB", "~8 GB"],
    correctAnswer: 0,
    explanation: "10^8 elements * 8 bytes = 800,000,000 bytes = ~800 MB.",
    level: "intermediate"
  },
  {
    question: "Why is the BUILD phase of PAM deterministic?",
    shortAnswer: "Because it sequentially picks the exact point minimizing global distance, with deterministic greedy selection for subsequent medoids.",
    explanation: "Unlike random K-Means initialization, standard PAM BUILD produces identical initial medoids on identical data.",
    hint: "Deterministic greedy initial medoid selection.",
    level: "intermediate"
  },
  {
    question: "Can user-defined domain experts manually seed the initial medoids before running the SWAP phase?",
    shortAnswer: "Yes, domain experts can inject known initial exemplar records, and PAM will iteratively refine them.",
    explanation: "Highly valuable for semi-supervised clustering in healthcare and banking.",
    hint: "Expert medoid seeding.",
    level: "basic"
  },
  {
    question: "What is the difference between PAM and the Alternate (Lloyd-like) K-Medoids algorithm?",
    shortAnswer: "PAM evaluates all potential point swaps systematically (slower, higher quality), while Alternate updates medoids within each cluster independently (faster, like K-Means).",
    explanation: "Alternate algorithm has O(N * K) steps like K-Means Lloyd's algorithm.",
    hint: "Exhaustive swap testing vs cluster-wise medoid update.",
    level: "advanced"
  },
  {
    question: "In Python, which parameter in `sklearn_extra.cluster.KMedoids` selects the PAM algorithm?",
    shortAnswer: "`method='pam'` (Options: `'pam'`, `'alternate'`).",
    explanation: "Configures exact Kaufman & Rousseeuw PAM execution.",
    hint: "method='pam'.",
    level: "basic",
    codeExample: "from sklearn_extra.cluster import KMedoids\nkmed = KMedoids(n_clusters=3, method='pam', metric='manhattan')"
  },
  {
    question: "What happens if max_iter is reached before Delta C >= 0?",
    shortAnswer: "The algorithm stops at the current medoid configuration and returns the best assignments achieved so far.",
    explanation: "Protects against excessively long runtimes.",
    hint: "Stops at maximum iteration cap.",
    level: "basic"
  },
  {
    question: "Does the total cost of PAM ever increase from one iteration to the next?",
    shortAnswer: "No, PAM strictly accepts swaps where Delta C < 0, ensuring monotonic decrease in total cost.",
    explanation: "Total cost is strictly non-increasing.",
    hint: "Monotonically non-increasing cost.",
    level: "basic"
  },
  {
    question: "Why is PAM preferred over K-Means when the number of data points N is modest (e.g. N < 2,000)?",
    shortAnswer: "Because PAM guarantees robust real exemplars, avoids outlier sensitivity, and N < 2000 runs in under a second on modern CPUs.",
    explanation: "Computational overhead is negligible on small-to-medium datasets.",
    hint: "Superior quality and negligible cost for modest N.",
    level: "basic"
  },
  {
    question: "How does PAM ensure clusters are non-empty?",
    shortAnswer: "Because each chosen medoid trivially belongs to its own cluster with distance 0.",
    explanation: "Every cluster has at least its own medoid.",
    hint: "Medoid guarantees at least 1 member.",
    level: "basic"
  },
  {
    question: "What is the primary architectural value of the PAM algorithm in modern machine learning?",
    shortAnswer: "It provides a mathematically sound, interpretable benchmark for robust exemplar-based partitional clustering.",
    explanation: "Serves as the golden standard for non-Euclidean clustering algorithms.",
    hint: "Golden benchmark for exemplar partitional clustering.",
    level: "basic"
  }
];

export default questions;
