const questions = [
  {
    question: "What is the primary architectural trade-off between K-Means and K-Medoids?",
    shortAnswer: "K-Means offers superior computational speed and linear scaling, while K-Medoids provides superior outlier robustness and real exemplar interpretability.",
    explanation: "Linear scaling vs robust discrete exemplar optimization.",
    hint: "Speed vs Robustness & Interpretability.",
    level: "basic"
  },
  {
    question: "Why does K-Means fail when applied to categorical data or arbitrary distance matrices?",
    shortAnswer: "Because K-Means requires computing arithmetic vector means (centroids), which cannot be calculated for non-numeric labels or distance-only graphs.",
    explanation: "You cannot take the mean of categorical features.",
    hint: "Requires vector coordinates for mean calculation.",
    level: "basic"
  },
  {
    question: "How does the loss function of K-Means (SSE) mathematically differ from K-Medoids (Total Dissimilarity)?",
    shortAnswer: "K-Means minimizes sum of squared Euclidean errors (L2^2); K-Medoids minimizes sum of absolute distances (L1 / General D).",
    explanation: "Squaring in K-Means gives massive leverage to distant anomalies.",
    hint: "Squared error vs absolute distance.",
    level: "intermediate"
  },
  {
    question: "Which algorithm scales better to big data with N = 10,000,000 points: K-Means or K-Medoids?",
    options: ["K-Means (O(N * K * d))", "K-Medoids PAM (O(N^2))", "Both scale identically", "Neither"],
    correctAnswer: 0,
    explanation: "K-Means scales linearly with N and parallelizes effortlessly on GPUs and Spark clusters.",
    level: "basic"
  },
  {
    question: "Why is K-Medoids preferred when clustering medical patient records?",
    shortAnswer: "Because the medoid is an actual patient record, preventing doctors from reviewing impossible synthetic 'average' patient vitals.",
    explanation: "Real clinical exemplars build trust with physicians.",
    hint: "Real patient exemplar interpretability.",
    level: "basic"
  },
  {
    question: "Can K-Means use Manhattan distance as its loss function?",
    shortAnswer: "No, K-Means strictly minimizes squared Euclidean distance (using Manhattan with means is mathematically inconsistent; K-Medians uses medians for Manhattan).",
    explanation: "Lloyd's centroid update is only optimal for squared Euclidean loss.",
    hint: "Centroid update requires squared Euclidean loss.",
    level: "advanced"
  },
  {
    question: "What is the memory footprint difference between K-Means and K-Medoids on N = 50,000 points?",
    shortAnswer: "K-Means requires O(N * d) (~10 MB), while precomputed K-Medoids requires an N x N matrix (~20 GB).",
    explanation: "Highlights the memory bottleneck of pairwise distance matrices.",
    hint: "Linear feature storage vs quadratic distance matrix.",
    level: "intermediate"
  },
  {
    question: "How does CLARA enable K-Medoids to handle larger datasets?",
    shortAnswer: "By applying PAM to multiple smaller random subsamples and picking the best overall medoids.",
    explanation: "Combines PAM accuracy with sub-sampling scalability.",
    hint: "Sampling-based scaling.",
    level: "intermediate"
  },
  {
    question: "What is the breakdown point of the median/medoid compared to the mean/centroid?",
    shortAnswer: "Medoids have a 50% breakdown point (can tolerate up to 50% corrupted data), whereas centroids have a 0% breakdown point (a single outlier can corrupt the mean arbitrarily).",
    explanation: "Fundamental theorem in robust statistics.",
    hint: "50% breakdown point vs 0%.",
    level: "advanced"
  },
  {
    question: "Which algorithm is suitable for clustering network graph nodes where only shortest path hop counts are known?",
    shortAnswer: "K-Medoids, because it operates directly on graph shortest-path distance matrices without feature coordinates.",
    explanation: "K-Means cannot run on graph adjacency matrices directly without node embeddings.",
    hint: "Graph distance matrix clustering.",
    level: "intermediate"
  },
  {
    question: "Do both K-Means and K-Medoids require pre-specifying the number of clusters K?",
    shortAnswer: "Yes, both are partitional clustering algorithms that require K as an input parameter.",
    explanation: "Both rely on user-defined K or Elbow / Silhouette evaluation.",
    hint: "Both require K.",
    level: "basic"
  },
  {
    question: "In document clustering using Cosine distance, which algorithm is mathematically valid out of the box?",
    shortAnswer: "K-Medoids (or Spherical K-Means), because standard K-Means centroid updates do not optimize Cosine distance.",
    explanation: "K-Medoids accepts Cosine distance natively.",
    hint: "Native Cosine distance optimization.",
    level: "intermediate"
  },
  {
    question: "If a company has 1,000 clean continuous sensor data streams, which algorithm should they deploy for real-time edge processing?",
    shortAnswer: "K-Means, because linear time complexity ensures minimal latency on microcontrollers.",
    explanation: "Low computational overhead on continuous data.",
    hint: "K-Means for low-latency edge deployment.",
    level: "basic"
  },
  {
    question: "Can both K-Means and K-Medoids get trapped in local minima?",
    shortAnswer: "Yes, both algorithms are greedy optimization heuristics that depend on initial cluster center placement.",
    explanation: "Both benefit from multi-start strategies (`n_init=10`).",
    hint: "Both converge to local minima.",
    level: "basic"
  },
  {
    question: "How does the sensitivity to feature scaling compare between K-Means and K-Medoids?",
    shortAnswer: "Both algorithms are highly sensitive to feature scaling and require standardization/normalization before clustering.",
    explanation: "Distance calculations in both methods are distorted by unscaled feature ranges.",
    hint: "Both require feature scaling.",
    level: "basic"
  },
  {
    question: "What is K-Medians clustering and how does it relate to K-Means and K-Medoids?",
    shortAnswer: "K-Medians computes component-wise continuous medians in R^d; K-Medoids restricts the center to actual dataset points.",
    explanation: "K-Medoids is sample-constrained, while K-Medians calculates synthetic coordinate medians.",
    hint: "Continuous coordinate medians vs discrete sample points.",
    level: "advanced"
  },
  {
    question: "Why can't K-Means be used for facility location planning (e.g. fire station placement)?",
    shortAnswer: "Because a centroid average coordinate might place a fire station in the middle of a lake or railway junction, while a medoid selects an actual candidate parcel.",
    explanation: "Physical infrastructure must be built on valid land addresses.",
    hint: "Requires physically valid building addresses.",
    level: "basic"
  },
  {
    question: "What is the computational complexity of assigning test points to clusters in K-Means vs K-Medoids?",
    shortAnswer: "Identical: O(K * d) per query point, calculating distance to K centers and picking the minimum.",
    explanation: "Prediction inference speed is identical.",
    hint: "Identical O(K * d) inference complexity.",
    level: "intermediate"
  },
  {
    question: "How do you evaluate clustering quality for both K-Means and K-Medoids?",
    shortAnswer: "Using Silhouette Score, Davies-Bouldin Index, or Calinski-Harabasz Index.",
    explanation: "Standard internal cluster validation metrics apply to both.",
    hint: "Silhouette and Davies-Bouldin scores.",
    level: "basic"
  },
  {
    question: "What is the effect of noisy background dimensions on K-Means vs K-Medoids?",
    shortAnswer: "Both suffer from distance dilution, but K-Medoids with L1 Manhattan distance degrades more gracefully than K-Means with L2.",
    explanation: "L1 distance is less sensitive to noisy coordinate spread.",
    hint: "L1 distance degrades more gracefully.",
    level: "intermediate"
  },
  {
    question: "Why is K-Medoids more expensive to update in distributed MapReduce environments than K-Means?",
    shortAnswer: "K-Means only requires summing vectors in the Reduce phase (linear); K-Medoids requires all-to-all member distance calculations.",
    explanation: "MapReduce reduction sum is trivial for means.",
    hint: "Reduction sum vs all-to-all shuffle.",
    level: "advanced"
  },
  {
    question: "Can K-Means produce singleton clusters more easily than K-Medoids?",
    shortAnswer: "Yes, empty clusters can occur in K-Means when all points migrate to other centroids; in K-Medoids, the medoid guarantees at least 1 member.",
    explanation: "Medoid anchors its own cluster.",
    hint: "Medoid guarantees non-empty cluster.",
    level: "intermediate"
  },
  {
    question: "What is the primary Python package for K-Means vs K-Medoids?",
    shortAnswer: "K-Means is in `sklearn.cluster.KMeans`; K-Medoids is in `sklearn_extra.cluster.KMedoids`.",
    explanation: "Standard library distribution locations.",
    hint: "sklearn vs sklearn-extra.",
    level: "basic"
  },
  {
    question: "What is the summary benchmark takeaway comparing K-Means and K-Medoids?",
    shortAnswer: "K-Means is the champion of raw speed and massive data; K-Medoids is the champion of noise robustness, metric flexibility, and real-world exemplar interpretability.",
    explanation: "The two pillars of partitional clustering.",
    hint: "Speed Champion vs Robustness & Interpretability Champion.",
    level: "basic"
  },
  {
    question: "If your client requires showing real customer profiles as cluster personas, which algorithm MUST you use?",
    shortAnswer: "K-Medoids, because its medoids are 100% authentic customer records from the database.",
    explanation: "Centroids produce uninterpretable blended fractional accounts.",
    hint: "K-Medoids for authentic customer persona records.",
    level: "basic"
  }
];

export default questions;
