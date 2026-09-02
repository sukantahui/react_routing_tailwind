const questions = [
  {
    question: "What mathematical rule governs cluster assignment in K-Medoids?",
    shortAnswer: "Each data point x is assigned to the medoid m_k that has the minimum distance: argmin_k D(x, m_k).",
    explanation: "Creates hard partitional clusters where every point belongs to its closest exemplar.",
    hint: "Minimum distance to medoids.",
    level: "basic"
  },
  {
    question: "What is a Voronoi Cell in the context of K-Medoids cluster assignment?",
    shortAnswer: "A geometric convex region containing all points that are closer to a specific medoid than to any other medoid in the dataset.",
    explanation: "Partitions the continuous or discrete feature space into K non-overlapping sectors.",
    hint: "Region of closest proximity to a medoid.",
    level: "intermediate"
  },
  {
    question: "How does the distance metric affect the shape of the Voronoi decision boundaries?",
    shortAnswer: "Euclidean distance produces straight hyperplane boundaries; Manhattan distance produces piecewise linear (stepped/zigzag) boundaries.",
    explanation: "Metric topology directly shapes the partition geometry.",
    hint: "Straight hyperplanes vs. piecewise linear steps.",
    level: "intermediate"
  },
  {
    question: "How are equidistant ties handled during cluster assignment?",
    shortAnswer: "Ties are broken deterministically by picking the medoid with the smallest index or first encountered in memory.",
    explanation: "Ensures reproducible and stable cluster assignments.",
    hint: "Deterministic index tie-breaking.",
    level: "basic"
  },
  {
    question: "What is the distance from a medoid to its own cluster center?",
    options: ["0.0", "1.0", "Depends on dataset variance", "Average cluster radius"],
    correctAnswer: 0,
    explanation: "Since the medoid is an actual member of the cluster, D(m_k, m_k) = 0.",
    level: "basic"
  },
  {
    question: "Can an empty cluster occur during K-Medoids cluster assignment?",
    shortAnswer: "No, because every medoid point m_k will always assign itself to its own cluster with distance 0, guaranteeing at least one member.",
    explanation: "Guarantees that each of the K clusters contains at least 1 point.",
    hint: "Medoid guarantees non-empty cluster.",
    level: "basic"
  },
  {
    question: "What is the time complexity of assigning N points to K medoids in d-dimensional space?",
    options: ["O(N * K * d)", "O(N^2)", "O(K^3)", "O(d^2)"],
    correctAnswer: 0,
    explanation: "For each of the N points, we compute distances to K medoids across d dimensions, requiring O(N * K * d) operations.",
    level: "intermediate"
  },
  {
    question: "In Python scikit-learn-extra, how do you predict the cluster assignment for new, unseen test data points?",
    shortAnswer: "`kmedoids.predict(X_new)`",
    explanation: "Computes the distance from new points to fitted medoids and returns the index of the closest medoid.",
    hint: "kmedoids.predict(X_test).",
    level: "basic",
    codeExample: "y_pred = kmed.predict(X_test)"
  },
  {
    question: "What is a 'Fuzzy' or 'Soft' cluster assignment vs the 'Hard' assignment used in K-Medoids?",
    shortAnswer: "Hard assignment assigns each point 100% to a single cluster; soft assignment computes probability memberships across all K clusters.",
    explanation: "K-Medoids uses hard assignment, while Fuzzy C-Medoids uses soft probabilities.",
    hint: "Binary membership vs probabilistic membership.",
    level: "intermediate"
  },
  {
    question: "How does cluster assignment enable Out-of-Sample classification?",
    shortAnswer: "By treating the K learned medoids as 1-Nearest-Neighbor prototypes for incoming query points.",
    explanation: "New points are classified based on closest medoid proximity.",
    hint: "1-NN prototype classification.",
    level: "intermediate"
  },
  {
    question: "What is the second-closest medoid and why is it tracked in advanced algorithms like FastPAM?",
    shortAnswer: "It is the medoid m_2 with the second smallest distance to point x; tracking it allows FastPAM to compute cost changes instantly when the primary medoid is removed.",
    explanation: "Eliminates redundant inner loops during swap evaluations.",
    hint: "Fallback medoid if current medoid is swapped out.",
    level: "advanced"
  },
  {
    question: "If point P is at (5, 5), Medoid 1 is at (2, 5), and Medoid 2 is at (9, 5), which cluster does P belong to under Euclidean distance?",
    options: ["Cluster 1 (Dist = 3)", "Cluster 2 (Dist = 4)", "Both", "Neither"],
    correctAnswer: 0,
    explanation: "Distance to M1 is |5 - 2| = 3; Distance to M2 is |5 - 9| = 4. P is assigned to Cluster 1.",
    level: "basic"
  },
  {
    question: "What is the Silhouette Coefficient of a point based on its cluster assignment?",
    shortAnswer: "s(i) = (b(i) - a(i)) / max(a(i), b(i)), where a(i) is mean intra-cluster distance and b(i) is mean nearest-cluster distance.",
    explanation: "Measures quality of assignment: near +1 is well-assigned, near -1 is mis-assigned.",
    hint: "Cohesion vs separation ratio.",
    level: "intermediate"
  },
  {
    question: "Why should features be scaled before performing cluster assignment?",
    shortAnswer: "Unscaled features will bias assignments toward dimensions with arbitrarily large units (e.g. income in Rupees vs age in years).",
    explanation: "Ensures all feature dimensions contribute proportionally to proximity.",
    hint: "Prevents large-unit attribute dominance.",
    level: "basic"
  },
  {
    question: "What is the effect on cluster assignments if a non-medoid point is far away from all medoids?",
    shortAnswer: "It will still be assigned to whichever medoid is least distant among the K medoids, but its high distance contributes to total cost.",
    explanation: "Partitional clustering forces every point into one of the K clusters.",
    hint: "Assigned to the least distant medoid.",
    level: "basic"
  },
  {
    question: "Can cluster assignments change from one PAM iteration to the next?",
    shortAnswer: "Yes! Whenever a medoid swap occurs, points re-evaluate their proximity to the new medoid set and may migrate to new clusters.",
    explanation: "Points naturally reassign to whichever medoid is now closest.",
    hint: "Points migrate when medoids swap.",
    level: "basic"
  },
  {
    question: "What is a distance profile vector for an observation x?",
    shortAnswer: "A 1 x K vector [D(x, m_1), D(x, m_2), ..., D(x, m_K)] recording the distance from x to each medoid.",
    explanation: "Used for assignment and soft cluster confidence scoring.",
    hint: "Distances to all K medoids.",
    level: "intermediate"
  },
  {
    question: "How do you calculate the cluster assignment purity if ground truth labels are available?",
    shortAnswer: "Purity = (1 / N) * sum_k max_j |C_k cap L_j|, measuring the proportion of correctly grouped class labels.",
    explanation: "Standard external validation metric.",
    hint: "Majority class proportion per cluster.",
    level: "intermediate"
  },
  {
    question: "In customer segmentation, what does a customer's cluster assignment represent?",
    shortAnswer: "It identifies the customer persona group that this individual most closely matches, represented by the exemplar medoid customer.",
    explanation: "Allows targeted marketing based on the medoid customer's real purchasing habits.",
    hint: "Customer persona group alignment.",
    level: "basic"
  },
  {
    question: "Can an observation be assigned to a cluster if its distance to that cluster's medoid is large?",
    shortAnswer: "Yes, because partitional clustering guarantees exhaustive assignment of every data point in the dataset.",
    explanation: "Unlike density-based DBSCAN (which labels outliers as noise), K-Medoids assigns every point.",
    hint: "Partitional clustering is exhaustive.",
    level: "basic"
  },
  {
    question: "What data structure can accelerate nearest-medoid assignment for large K in Euclidean spaces?",
    shortAnswer: "KD-Trees, Ball Trees, or HNSW approximate nearest neighbor indexes.",
    explanation: "Reduces search time from O(K) to O(log K).",
    hint: "Spatial indexing trees (KD-Tree, BallTree).",
    level: "advanced"
  },
  {
    question: "How does K-Medoids cluster assignment differ when using a precomputed distance matrix?",
    shortAnswer: "Assignments are determined by direct row lookup: `argmin_k D[i, medoid_k]` without performing coordinate math.",
    explanation: "Direct table lookup takes O(K) array accesses.",
    hint: "Direct distance matrix row lookup.",
    level: "intermediate"
  },
  {
    question: "What is the primary indicator that a point was poorly assigned to its cluster?",
    shortAnswer: "A negative silhouette coefficient s(i) < 0, indicating that the point is closer to a neighboring cluster's medoid than its own.",
    explanation: "Signifies potential boundary ambiguity.",
    hint: "Negative silhouette score.",
    level: "intermediate"
  },
  {
    question: "How do you extract the array of cluster labels in `scikit-learn-extra` after fitting?",
    shortAnswer: "`kmedoids.labels_`",
    explanation: "Contains an integer array of cluster assignments from 0 to K-1 for all training points.",
    hint: "kmedoids.labels_ attribute.",
    level: "basic",
    codeExample: "labels = kmed.labels_"
  },
  {
    question: "What is the golden principle of cluster assignment in K-Medoids?",
    shortAnswer: "Every observation is anchored to the real exemplar medoid that minimizes its personal dissimilarity.",
    explanation: "Guarantees localized proximity and transparent grouping.",
    hint: "Anchored to the closest real exemplar.",
    level: "basic"
  }
];

export default questions;
