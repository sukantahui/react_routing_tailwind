const questions = [
  {
    question: "Define the term 'Medoid' in machine learning.",
    shortAnswer: "A centrally located, representative data point in a cluster whose total dissimilarity to all other points in that cluster is minimal.",
    explanation: "Unlike centroids (which are virtual synthetic means), a medoid is always a real, existing observation.",
    hint: "Real data exemplar minimizing intra-cluster dissimilarity.",
    level: "basic"
  },
  {
    question: "What is the primary loss function minimized by K-Medoids?",
    shortAnswer: "Total Absolute Dissimilarity: J = sum_{i=1}^N D(x_i, m_{y_i}).",
    explanation: "Minimizes sum of pairwise distances rather than squared Euclidean errors.",
    hint: "Sum of absolute distances to assigned medoids.",
    level: "basic"
  },
  {
    question: "Why is K-Medoids considered more robust to outliers than K-Means?",
    shortAnswer: "Because it optimizes absolute distances (analogous to the median), giving distant outliers a linear penalty rather than a quadratic penalty.",
    explanation: "Has a 50% breakdown point compared to 0% for K-Means.",
    hint: "Linear penalty vs quadratic squared penalty.",
    level: "basic"
  },
  {
    question: "Who introduced the PAM (Partitioning Around Medoids) algorithm and when?",
    shortAnswer: "Leonard Kaufman and Peter J. Rousseeuw in 1987.",
    explanation: "Foundational work in robust partitional clustering.",
    hint: "Kaufman & Rousseeuw (1987).",
    level: "basic"
  },
  {
    question: "What are the two major phases of PAM?",
    shortAnswer: "1. BUILD Phase (Greedy initialization) and 2. SWAP Phase (Iterative cost-reducing replacement).",
    explanation: "BUILD seeds high-quality medoids; SWAP refines them to local optimality.",
    hint: "BUILD and SWAP phases.",
    level: "basic"
  },
  {
    question: "What is the time complexity of a single SWAP iteration in PAM?",
    options: ["O(K * (N - K)^2)", "O(N * K * d)", "O(N^3)", "O(K^2)"],
    correctAnswer: 0,
    explanation: "Evaluates K * (N - K) candidate pairs across (N - K) data points.",
    level: "intermediate"
  },
  {
    question: "What is the space complexity of K-Medoids when using a precomputed distance matrix?",
    options: ["O(N^2)", "O(N * d)", "O(K * d)", "O(N^3)"],
    correctAnswer: 0,
    explanation: "Requires an N x N floating-point matrix to store all pairwise distances.",
    level: "basic"
  },
  {
    question: "How does CLARA enable K-Medoids to scale to large datasets?",
    shortAnswer: "By drawing multiple small random subsamples, running PAM on each sample, and selecting the medoids with minimal total cost on the entire dataset.",
    explanation: "Reduces runtime while maintaining high clustering quality.",
    hint: "Random subsampling + PAM.",
    level: "intermediate"
  },
  {
    question: "What is FastPAM?",
    shortAnswer: "An exact algorithmic optimization of PAM that caches nearest and second-nearest medoid distances, speeding up execution by O(N).",
    explanation: "Reduces swap complexity to O(K * (N - K)) without changing mathematical results.",
    hint: "Exact O(N) acceleration of PAM.",
    level: "advanced"
  },
  {
    question: "Can K-Medoids operate directly on arbitrary non-Euclidean distance matrices?",
    shortAnswer: "Yes! K-Medoids only requires a pairwise distance matrix and does not require raw feature coordinates.",
    explanation: "Works on Cosine, Jaccard, Manhattan, Levenshtein, or graph hop distances.",
    hint: "Works directly on arbitrary distance matrices.",
    level: "basic"
  },
  {
    question: "What is the mathematical condition for PAM to accept a candidate swap (m -> h)?",
    shortAnswer: "The total cost difference Delta C must be strictly negative: Delta C < 0.",
    explanation: "Guarantees monotonic reduction in total clustering cost.",
    hint: "Delta C < 0.",
    level: "basic"
  },
  {
    question: "When does the K-Medoids algorithm terminate?",
    shortAnswer: "When medoid indices do not change between successive iterations (zero shift) or when no swap yields Delta C < 0.",
    explanation: "Indicates that a local minimum in total dissimilarity cost has been reached.",
    hint: "No medoids change / no negative Delta C.",
    level: "basic"
  },
  {
    question: "What is the Silhouette Coefficient formula for a point i?",
    shortAnswer: "s(i) = (b(i) - a(i)) / max(a(i), b(i)), where a(i) is intra-cluster distance and b(i) is nearest-cluster distance.",
    explanation: "Ranges from -1.0 to +1.0.",
    hint: "s(i) = (b(i) - a(i)) / max(a(i), b(i)).",
    level: "intermediate"
  },
  {
    question: "What does a negative Silhouette score s(i) < 0 signify?",
    shortAnswer: "That point i is closer on average to points in a neighboring cluster than to points in its own cluster (potential misclassification).",
    explanation: "Signals poor cluster assignment for that specific observation.",
    hint: "Point is closer to a neighboring cluster.",
    level: "basic"
  },
  {
    question: "Why does K-Medoids avoid producing empty clusters?",
    shortAnswer: "Because each medoid point belongs to its own cluster with distance 0, guaranteeing at least one member per cluster.",
    explanation: "Self-distance zero prevents cluster collapse.",
    hint: "Medoid guarantees at least 1 member.",
    level: "basic"
  },
  {
    question: "How does feature scaling affect K-Medoids distance calculations?",
    shortAnswer: "Without feature scaling, attributes with large numerical scales dominate pairwise distances, distorting cluster shapes.",
    explanation: "Feature standardization (e.g. `StandardScaler`) ensures balanced attribute weighting.",
    hint: "Prevents high-magnitude feature dominance.",
    level: "basic"
  },
  {
    question: "What is the primary Python package for K-Medoids?",
    shortAnswer: "`scikit-learn-extra` (`from sklearn_extra.cluster import KMedoids`).",
    explanation: "Standard production library for PAM, Alternate, and CLARA in Python.",
    hint: "scikit-learn-extra.",
    level: "basic"
  },
  {
    question: "What is K-Medoids++ initialization?",
    shortAnswer: "A probabilistic seeding method that picks initial medoids far apart from each other proportional to distance, accelerating convergence.",
    explanation: "Direct analogue of K-Means++ initialization.",
    hint: "Distance-weighted probabilistic seeding.",
    level: "intermediate"
  },
  {
    question: "Why is K-Medoids preferred in medical informatics over K-Means?",
    shortAnswer: "Because medoids correspond to real, verifiable patient health records that doctors can examine and trust as clinical archetypes.",
    explanation: "Authentic patient exemplars ensure clinical auditability.",
    hint: "Auditable real patient exemplars.",
    level: "basic"
  },
  {
    question: "Can K-Medoids detect non-convex spiral or ring cluster shapes?",
    shortAnswer: "No, like K-Means, K-Medoids creates convex Voronoi partitions and struggles on non-convex manifolds (use DBSCAN instead).",
    explanation: "Voronoi partitions assume convex cluster geometry.",
    hint: "Partitions are convex Voronoi cells.",
    level: "intermediate"
  },
  {
    question: "What is the difference between PAM and Alternate K-Medoids?",
    shortAnswer: "PAM evaluates global pairwise swaps (exhaustive, higher quality); Alternate recalculates medoids within each cluster independently (faster, Lloyd-style).",
    explanation: "Alternate trades exhaustive search for linear-like iteration speed.",
    hint: "Global swap evaluation vs local intra-cluster update.",
    level: "advanced"
  },
  {
    question: "How do you handle categorical attributes in K-Medoids?",
    shortAnswer: "Compute a Gower distance, Jaccard distance, or Hamming distance matrix across categorical features and pass it directly to K-Medoids.",
    explanation: "Allows clustering mixed and categorical data without artificial coordinate averaging.",
    hint: "Use Gower / Jaccard distance matrices.",
    level: "intermediate"
  },
  {
    question: "Why should you run K-Medoids with `n_init >= 10`?",
    shortAnswer: "Because K-Medoids converges to a local minimum; running multiple random restarts helps find the best overall local optimum.",
    explanation: "Protects against poor initial seeding.",
    hint: "Multi-restart protection against local minima.",
    level: "basic"
  },
  {
    question: "What is the breakdown point of the median and medoid in robust statistics?",
    options: ["50%", "0%", "100%", "25%"],
    correctAnswer: 0,
    explanation: "Medoids can tolerate up to 50% arbitrary corruption before moving outside the true data distribution.",
    level: "advanced"
  },
  {
    question: "What is the ultimate summary takeaway of Module 006_001 K-Medoids Clustering?",
    shortAnswer: "K-Medoids is the robust, exemplar-based cornerstone of unsupervised learning, delivering unmatched noise resistance, metric freedom, and real-world stakeholder interpretability.",
    explanation: "A foundational machine learning algorithm for robust data science.",
    hint: "Cornerstone of robust, interpretable exemplar clustering.",
    level: "basic"
  }
];

export default questions;
