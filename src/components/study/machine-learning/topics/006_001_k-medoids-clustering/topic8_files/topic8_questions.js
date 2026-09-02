const questions = [
  {
    question: "What is the single greatest advantage of K-Medoids over K-Means?",
    shortAnswer: "Extreme robustness against extreme outliers and noise, combined with 100% authentic exemplar interpretability.",
    explanation: "Minimizing absolute distance prevents outliers from corrupting cluster centers.",
    hint: "Outlier robustness & real exemplar interpretability.",
    level: "basic"
  },
  {
    question: "What is the primary computational bottleneck of standard PAM K-Medoids?",
    shortAnswer: "Its quadratic memory storage O(N^2) for distance matrices and cubic-like swap evaluation complexity O(K*(N-K)^2).",
    explanation: "Severely limits scalability on datasets with N > 50,000 observations.",
    hint: "O(N^2) memory and O(K*(N-K)^2) runtime.",
    level: "basic"
  },
  {
    question: "How does CLARA (Clustering Large Applications) overcome PAM's computational limitation?",
    shortAnswer: "It extracts multiple random subsamples of size (40 + 2k), applies PAM to each sample, and selects the medoid set that yields the minimum total cost on the entire dataset.",
    explanation: "Scales K-Medoids to hundreds of thousands of observations.",
    hint: "Sampling-based PAM approximation.",
    level: "intermediate"
  },
  {
    question: "Can K-Medoids detect non-convex, manifold, or arbitrary cluster shapes (like concentric circles)?",
    shortAnswer: "No, like K-Means, K-Medoids partitions data into convex Voronoi cells and struggles on non-convex or winding spiral manifolds.",
    explanation: "Density-based algorithms like DBSCAN are required for complex manifold shapes.",
    hint: "Convex Voronoi cells struggle on arbitrary manifold shapes.",
    level: "intermediate"
  },
  {
    question: "Why is K-Medoids particularly suitable for clustering categorical or string data?",
    shortAnswer: "Because it only requires computing pairwise distances (e.g. Hamming, Jaccard, Levenshtein) and never needs to compute impossible arithmetic averages of text.",
    explanation: "Operates naturally on non-numeric domains.",
    hint: "Operates directly on pairwise string/categorical distances.",
    level: "basic"
  },
  {
    question: "What is the breakdown point of K-Medoids compared to K-Means?",
    shortAnswer: "K-Medoids has a 50% breakdown point (can tolerate up to 50% arbitrary corruption), whereas K-Means has a 0% breakdown point.",
    explanation: "A single infinite outlier breaks K-Means entirely.",
    hint: "50% breakdown point vs 0%.",
    level: "advanced"
  },
  {
    question: "How does FastPAM optimize standard PAM without losing mathematical accuracy?",
    shortAnswer: "FastPAM caches the nearest and second-nearest medoid distances for all points, eliminating the inner loop and reducing complexity to O(K*(N-K)).",
    explanation: "Achieves an O(N) runtime speedup while producing the exact same mathematical clusters.",
    hint: "FastPAM reduces complexity to O(K*(N-K)).",
    level: "advanced"
  },
  {
    question: "What is the memory size of an N=20,000 float64 distance matrix?",
    options: ["~3.2 GB", "~320 MB", "~32 MB", "~32 GB"],
    correctAnswer: 0,
    explanation: "20,000 * 20,000 * 8 bytes = 3,200,000,000 bytes = ~3.2 GB.",
    level: "intermediate"
  },
  {
    question: "Why must users still be cautious when choosing the number of clusters K in K-Medoids?",
    shortAnswer: "Choosing K too low merges distinct sub-cohorts; choosing K too high overfits and fragments homogeneous groups.",
    explanation: "Requires validation using Silhouette Analysis or Elbow curve.",
    hint: "Risk of under-clustering or over-clustering.",
    level: "basic"
  },
  {
    question: "In what scenario is K-Medoids strictly required over K-Means by industry regulations?",
    shortAnswer: "When regulatory compliance (e.g. FDA in healthcare or GDPR in EU banking) demands that every cluster exemplar corresponds to an identifiable real-world case.",
    explanation: "Synthetic virtual averages cannot be audited as physical evidence.",
    hint: "Auditable real-world exemplar compliance.",
    level: "basic"
  },
  {
    question: "What is the Alternate K-Medoids algorithm trade-off compared to PAM?",
    shortAnswer: "Alternate algorithm runs much faster (like K-Means Lloyd iteration), but may settle in slightly poorer local minima than exhaustive PAM.",
    explanation: "Trades exhaustive search quality for linear-like execution speed.",
    hint: "Faster speed vs slightly lower partition quality.",
    level: "intermediate"
  },
  {
    question: "How does K-Medoids handle datasets where feature coordinates are completely unknown, but a pairwise dissimilarity matrix is provided?",
    shortAnswer: "It processes the dissimilarity matrix directly using `metric='precomputed'` without requiring feature coordinates.",
    explanation: "K-Means cannot execute without raw feature coordinate matrices.",
    hint: "Direct precomputed matrix processing.",
    level: "basic"
  },
  {
    question: "What is CLARANS (Clustering Large Applications based upon RANdomized Search)?",
    shortAnswer: "A randomized graph search algorithm that samples a subset of neighbor swaps rather than searching all pairs exhaustively.",
    explanation: "Blends PAM quality with randomized efficiency.",
    hint: "Randomized neighbor swap search.",
    level: "advanced"
  },
  {
    question: "Can K-Medoids clusters be distorted if features have wildly different numerical scales?",
    shortAnswer: "Yes! Like all distance-based algorithms, unscaled features will heavily bias distances toward large-scale attributes.",
    explanation: "Feature standardization (e.g. `StandardScaler`) is always required.",
    hint: "Sensitive to feature scale without normalization.",
    level: "basic"
  },
  {
    question: "How does K-Medoids perform when clusters have significantly different densities and sizes?",
    shortAnswer: "Like K-Means, K-Medoids can struggle with clusters of vastly unequal sizes and densities, tending to split large clusters.",
    explanation: "Partitional Voronoi geometry assumes relatively uniform spatial spread.",
    hint: "Struggles with unequal cluster densities.",
    level: "intermediate"
  },
  {
    question: "Why is K-Medoids less prone to generating empty clusters than K-Means?",
    shortAnswer: "Because each medoid point is guaranteed to belong to its own cluster with distance 0, ensuring at least one member per cluster.",
    explanation: "Self-distance zero prevents cluster collapse.",
    hint: "Self-distance zero prevents empty clusters.",
    level: "basic"
  },
  {
    question: "What is the advantage of using Manhattan distance (L1) over Euclidean distance (L2) within K-Medoids?",
    shortAnswer: "Manhattan distance reinforces median-like behavior, providing maximum outlier immunity and natural grid navigation.",
    explanation: "Avoids squaring coordinate differences.",
    hint: "Reinforces median-like robustness.",
    level: "intermediate"
  },
  {
    question: "In Python, what is the recommended library for production-grade K-Medoids clustering?",
    shortAnswer: "`scikit-learn-extra` (`from sklearn_extra.cluster import KMedoids`).",
    explanation: "Provides highly optimized Cython implementations of PAM, Alternate, and CLARA.",
    hint: "scikit-learn-extra library.",
    level: "basic"
  },
  {
    question: "Can K-Medoids be used for semi-supervised clustering where certain medoids are fixed in advance?",
    shortAnswer: "Yes, initial medoids can be manually seeded with known domain landmarks, and the algorithm will cluster points around them.",
    explanation: "Enables guided domain-driven clustering.",
    hint: "Manual medoid landmark seeding.",
    level: "basic"
  },
  {
    question: "What happens if a dataset contains extreme duplicate records in K-Medoids?",
    shortAnswer: "Duplicates simply form high-density attraction points with pairwise distance 0, which K-Medoids handles robustly.",
    explanation: "Does not cause numerical instability.",
    hint: "Zero distance duplicates handled robustly.",
    level: "basic"
  },
  {
    question: "Why is parallelizing K-Medoids across multiple CPU cores beneficial?",
    shortAnswer: "Pairwise distance computation and independent intra-cluster medoid searches can be distributed concurrently across cores.",
    explanation: "Significantly reduces wall-clock execution time.",
    hint: "Parallel distance matrix and cluster updates.",
    level: "intermediate"
  },
  {
    question: "What metric is best used to validate whether K-Medoids produced high-quality clusters?",
    shortAnswer: "Silhouette Analysis (values > 0.5 indicate strong, cohesive cluster structures).",
    explanation: "Measures both intra-cluster cohesion and inter-cluster separation.",
    hint: "Silhouette score > 0.5.",
    level: "basic"
  },
  {
    question: "How does K-Medoids handle missing values when computing pairwise distance matrices?",
    shortAnswer: "Pairwise distance functions (e.g. Nan-Euclidean) can compute distance over available shared features, ignoring missing dimensions pairwise.",
    explanation: "Avoids dropping entire rows or arbitrary global mean imputation.",
    hint: "Pairwise missing attribute tolerance.",
    level: "advanced"
  },
  {
    question: "What is the primary trade-off when selecting between PAM and CLARA in `scikit-learn-extra`?",
    shortAnswer: "PAM provides exact exhaustive optimization (best for N < 5,000); CLARA provides fast sampling approximation (best for N > 5,000).",
    explanation: "Balances exactness against big data scalability.",
    hint: "Exact PAM vs Sampling CLARA.",
    level: "basic"
  },
  {
    question: "What is the ultimate engineering rule for K-Medoids advantages and limitations?",
    shortAnswer: "Use K-Medoids when your priority is noise robustness, non-Euclidean metrics, or authentic physical exemplars; switch to CLARA when dataset size N grows large.",
    explanation: "Provides the perfect balance between accuracy, robustness, and performance.",
    hint: "Robustness priority + CLARA scaling for large N.",
    level: "basic"
  }
];

export default questions;
