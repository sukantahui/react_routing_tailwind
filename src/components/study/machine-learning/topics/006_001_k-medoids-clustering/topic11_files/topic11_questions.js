const questions = [
  {
    question: "In Practice Problem 1 with customers C1(2,5), C2(3,8), C3(8,2), C4(9,3), C5(20,20), which customer is the extreme high-spend outlier?",
    shortAnswer: "Customer C5(20, 20).",
    explanation: "C5 spends ₹20,000 at frequency 20, far beyond the normal customer cluster range.",
    hint: "Customer C5.",
    level: "basic"
  },
  {
    question: "Why does Customer C5(20, 20) NOT pull the medoid of Cluster 1 away from the main cluster core?",
    shortAnswer: "Because K-Medoids minimizes absolute Manhattan distance, making the medoid selection immune to the outlier's extreme magnitude.",
    explanation: "The 50% breakdown point protects cluster medoids from extreme anomalies.",
    hint: "Outlier immunity of absolute dissimilarity minimization.",
    level: "basic"
  },
  {
    question: "In Practice Problem 2 with diamond points (0,2), (2,0), (0,-2), (-2,0), why do all 4 points have identical distance row sums?",
    shortAnswer: "Due to 4-fold rotational and reflection symmetry around the origin.",
    explanation: "Every point has one neighbor at distance 2*sqrt(2), two at distance 2*sqrt(2), and one at distance 4.",
    hint: "Rotational symmetry.",
    level: "intermediate"
  },
  {
    question: "How can K-Medoids distance-to-medoid metrics be used for Outlier / Anomaly Detection?",
    shortAnswer: "By computing the distance from each point to its assigned medoid and flagging points where distance exceeds a threshold (e.g. D > 2.5 * Median Distance).",
    explanation: "Distant points in a Voronoi cell represent anomalies.",
    hint: "Thresholding distance to assigned medoid.",
    level: "intermediate"
  },
  {
    question: "If a dataset has N = 10 points and we want K = 3 clusters, how many possible medoid combinations exist?",
    options: ["120 (10 * 9 * 8 / 6 = 120)", "1,000", "30", "720"],
    correctAnswer: 0,
    explanation: "C(10, 3) = (10 * 9 * 8) / (3 * 2 * 1) = 720 / 6 = 120.",
    level: "basic"
  },
  {
    question: "What is the Silhouette Coefficient range?",
    options: ["-1.0 to +1.0", "0.0 to 1.0", "-infinity to +infinity", "0.0 to 100.0"],
    correctAnswer: 0,
    explanation: "Silhouette score ranges strictly from -1.0 (misclassified) to +1.0 (perfectly clustered).",
    level: "basic"
  },
  {
    question: "What does an average dataset Silhouette Score of +0.72 indicate?",
    shortAnswer: "Strong, well-separated, and highly cohesive clustering structure.",
    explanation: "Scores above 0.70 indicate optimal cluster structure.",
    hint: "Strong cluster structure.",
    level: "basic"
  },
  {
    question: "If points A(0,0), B(1,0), C(0,1), D(1,1) form a unit square, what is the Manhattan distance from A to D?",
    options: ["2 (|0 - 1| + |0 - 1| = 1 + 1 = 2)", "1.414", "1", "4"],
    correctAnswer: 0,
    explanation: "|0 - 1| + |0 - 1| = 1 + 1 = 2.",
    level: "basic"
  },
  {
    question: "What is the Euclidean distance from A(0,0) to D(1,1)?",
    options: ["sqrt(2) ≈ 1.414", "2.0", "1.0", "1.732"],
    correctAnswer: 0,
    explanation: "sqrt(1^2 + 1^2) = sqrt(2) ≈ 1.414.",
    level: "basic"
  },
  {
    question: "Why does PAM produce identical clusters regardless of whether data is shuffled?",
    shortAnswer: "Because the greedy BUILD phase deterministically evaluates row sums in index order, and the distance matrix is permutation-invariant.",
    explanation: "Deterministic initialization ensures reproducible output.",
    hint: "Deterministic BUILD phase.",
    level: "intermediate"
  },
  {
    question: "How does the Elbow Method assist in solving practice problems where K is unknown?",
    shortAnswer: "By plotting Total Cost J vs K (from 1 to 10) and selecting the 'elbow' point where the rate of cost reduction drops sharply.",
    explanation: "Identifies diminishing returns for additional clusters.",
    hint: "Point where cost reduction rate diminishes.",
    level: "basic"
  },
  {
    question: "In Python, how do you compute pairwise distance matrices using SciPy?",
    shortAnswer: "`scipy.spatial.distance.cdist(X, X, metric='cityblock')` (for Manhattan) or `metric='euclidean'`.",
    explanation: "High-performance C-optimized distance matrix calculation.",
    hint: "scipy.spatial.distance.cdist.",
    level: "basic",
    codeExample: "from scipy.spatial.distance import cdist\nD = cdist(X, X, metric='cityblock')"
  },
  {
    question: "If two candidate medoids produce the exact same total cost J, which one should be selected according to standard tie-breaking?",
    shortAnswer: "The point that appeared first in the original dataset index (lowest index number).",
    explanation: "Deterministic tie-breaking rule.",
    hint: "Lowest index point.",
    level: "basic"
  },
  {
    question: "What happens if you run K-Medoids on a dataset where all features are identical constants (e.g. all points at (5, 5))?",
    shortAnswer: "All pairwise distances are 0; total cost J = 0, and any K points serve as valid medoids trivially.",
    explanation: "Degenerate zero-variance dataset.",
    hint: "Total cost is 0.",
    level: "basic"
  },
  {
    question: "Why should you never use `StandardScaler` on categorical one-hot encoded variables before computing Jaccard distance?",
    shortAnswer: "Because one-hot variables are binary indicators; scaling converts them to artificial continuous floats, destroying the set-intersection logic of Jaccard distance.",
    explanation: "Jaccard distance requires raw binary 0/1 indicator values.",
    hint: "Preserves discrete 0/1 binary set logic.",
    level: "advanced"
  },
  {
    question: "What is the Calinski-Harabasz score and how does it evaluate K-Medoids clusters?",
    shortAnswer: "It is the ratio of between-cluster dispersion to within-cluster dispersion (higher score is better).",
    explanation: "Standard internal validation index.",
    hint: "Variance ratio criterion.",
    level: "intermediate"
  },
  {
    question: "In practice problems involving spatial GIS coordinates (latitude/longitude), which distance formula should you use?",
    shortAnswer: "Haversine Distance (Great-circle spherical distance on Earth's surface).",
    explanation: "Accounts for Earth's curvature.",
    hint: "Haversine great-circle distance.",
    level: "intermediate"
  },
  {
    question: "What is the effect of redundant, highly correlated features on K-Medoids distance calculations?",
    shortAnswer: "They give double weight to that specific underlying attribute, effectively distorting distance proximity toward the duplicated feature.",
    explanation: "Feature selection or PCA helps remove redundant multicollinearity.",
    hint: "Overweights correlated dimensions.",
    level: "intermediate"
  },
  {
    question: "How do you calculate cluster purity when comparing K-Medoids output against ground truth class labels?",
    shortAnswer: "Assign each cluster the majority ground-truth label, count all correctly matching instances, and divide by total N.",
    explanation: "Standard external validation metric.",
    hint: "Sum of majority label counts divided by N.",
    level: "basic"
  },
  {
    question: "Why is self-assessment through practice problems essential before deploying clustering algorithms in production?",
    shortAnswer: "It trains engineers to foresee edge cases like outliers, metric mismatch, feature scale bias, and local minima traps.",
    explanation: "Prevents costly pipeline errors in production.",
    hint: "Prepares engineers for edge cases and production traps.",
    level: "basic"
  },
  {
    question: "What is the difference between an 'internal' validation metric and an 'external' validation metric in clustering?",
    shortAnswer: "Internal metrics (Silhouette, Inertia) use only feature geometry; external metrics (Adjusted Rand Index, Purity) compare clusters against true ground-truth labels.",
    explanation: "Internal needs no labels; external requires ground truth.",
    hint: "Geometry-only vs ground-truth comparison.",
    level: "intermediate"
  },
  {
    question: "If a practice problem asks for K=3 on N=5 points, what is the number of non-medoid points?",
    options: ["2 points (5 - 3 = 2)", "3 points", "5 points", "0 points"],
    correctAnswer: 0,
    explanation: "N - K = 5 - 3 = 2 non-medoid points.",
    level: "basic"
  },
  {
    question: "What is the time complexity of calculating the Silhouette Score for all N points?",
    options: ["O(N^2)", "O(N)", "O(K)", "O(N^3)"],
    correctAnswer: 0,
    explanation: "Requires all-to-all pairwise distances, scaling as O(N^2).",
    level: "intermediate"
  },
  {
    question: "How does the `sklearn.metrics.silhouette_score` function handle precomputed distance matrices?",
    shortAnswer: "`silhouette_score(D, labels, metric='precomputed')`",
    explanation: "Passes the N x N distance matrix directly without recomputing distances.",
    hint: "metric='precomputed'.",
    level: "basic",
    codeExample: "from sklearn.metrics import silhouette_score\nscore = silhouette_score(D, labels, metric='precomputed')"
  },
  {
    question: "What is the ultimate takeaway from solving K-Medoids practice problems?",
    shortAnswer: "Independent problem solving builds true algorithmic fluency, equipping you to design robust, noise-resilient machine learning systems with complete confidence.",
    explanation: "Marks full mastery of the K-Medoids clustering paradigm.",
    hint: "Builds true algorithmic fluency and production readiness.",
    level: "basic"
  }
];

export default questions;
