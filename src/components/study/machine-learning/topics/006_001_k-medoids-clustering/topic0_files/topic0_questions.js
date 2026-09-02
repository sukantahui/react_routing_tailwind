const questions = [
  {
    question: "What is the primary definition of a 'Medoid' in K-Medoids clustering?",
    shortAnswer: "A medoid is an actual data point in a cluster that minimizes the sum of dissimilarities to all other points in that cluster.",
    explanation: "Unlike a centroid (which is a calculated average coordinate that may not exist in the dataset), a medoid is always a real, observed instance from the input data.",
    hint: "An actual data point minimizing intra-cluster dissimilarity.",
    level: "basic",
    codeExample: "medoid = min(cluster_points, key=lambda m: sum(distance(m, p) for p in cluster_points))"
  },
  {
    question: "How does the objective cost function of K-Medoids differ from K-Means?",
    shortAnswer: "K-Medoids minimizes total absolute dissimilarity (L1 or general distance), while K-Means minimizes Sum of Squared Errors (SSE / L2 squared).",
    explanation: "Because K-Means squares distances, extreme outliers exert enormous pulling force on centroids. K-Medoids uses absolute distances, making it significantly more robust.",
    hint: "Absolute error minimization vs squared error minimization.",
    level: "intermediate"
  },
  {
    question: "Why is K-Medoids considered much more robust to outliers than K-Means?",
    shortAnswer: "Because medoids are actual central points and absolute distance metrics prevent isolated extreme outliers from dragging the cluster centers.",
    explanation: "In median-like statistics, an extreme value on the periphery does not change the identity of the central item.",
    hint: "Similar to how median is robust compared to mean.",
    level: "basic"
  },
  {
    question: "Can K-Medoids be used with arbitrary non-Euclidean distance metrics (such as Manhattan, Cosine, or Jaccard distances)?",
    shortAnswer: "Yes! K-Medoids only requires a pairwise distance matrix between data points, so ANY valid distance or dissimilarity metric can be used.",
    explanation: "K-Means requires computing average vectors, which is undefined for categorical or graph data. K-Medoids only needs pairwise distances.",
    hint: "Arbitrary distance matrix flexibility.",
    level: "intermediate"
  },
  {
    question: "What is the most famous algorithm used to implement K-Medoids clustering?",
    shortAnswer: "PAM (Partitioning Around Medoids), proposed by Leonard Kaufman and Peter J. Rousseeuw in 1987.",
    explanation: "PAM iteratively swaps medoid and non-medoid points to find the configuration with minimal total cost.",
    hint: "Partitioning Around Medoids (PAM).",
    level: "basic"
  },
  {
    question: "What is the computational time complexity of the standard PAM algorithm per iteration?",
    options: ["O(k * (n - k)^2)", "O(n * k)", "O(n log n)", "O(k^3)"],
    correctAnswer: 0,
    explanation: "PAM tests swapping every medoid (k) with every non-medoid (n - k) and recalculates costs across (n - k) objects, yielding O(k(n-k)^2).",
    level: "advanced"
  },
  {
    question: "What is CLARA (Clustering Large Applications)?",
    shortAnswer: "An extension of PAM designed for large datasets that draws multiple subsamples, applies PAM to each sample, and selects the best overall medoids.",
    explanation: "CLARA reduces computational overhead from O(n^2) to O(k*s^2 + k*(n-k)) where s is the subsample size.",
    hint: "Sampling-based PAM for large datasets.",
    level: "intermediate"
  },
  {
    question: "What is CLARANS (Clustering Large Applications based upon RANdomized Search)?",
    shortAnswer: "A randomized search heuristic that samples a subset of medoid swaps rather than testing all possible pairs exhaustively.",
    explanation: "Combines the accuracy of PAM with the scalability of randomized graph traversal.",
    hint: "Randomized neighbor search for medoid swaps.",
    level: "advanced"
  },
  {
    question: "In what real-world domain is having an actual existing data point as a cluster center (Medoid) particularly beneficial?",
    shortAnswer: "Medical patient profiling, facility location logistics, and text document summarization.",
    explanation: "A hospital needs a real representative patient record, not an artificial average 'virtual patient' with impossible fractional symptoms.",
    hint: "Interpretability and real-world exemplars.",
    level: "basic"
  },
  {
    question: "Does K-Medoids require the user to pre-specify the number of clusters 'k'?",
    shortAnswer: "Yes, like K-Means, K-Medoids is a partitional algorithm that requires choosing 'k' beforehand or determining it via Silhouette analysis or Elbow method.",
    explanation: "'k' represents the number of medoids to select.",
    hint: "Requires predefined k value.",
    level: "basic"
  },
  {
    question: "How does K-Medoids assign non-medoid data points to clusters during each iteration?",
    shortAnswer: "Each non-medoid point is assigned to its nearest medoid according to the chosen distance metric.",
    explanation: "Point x belongs to cluster i if dist(x, m_i) <= dist(x, m_j) for all j.",
    hint: "Assigned to the nearest medoid.",
    level: "basic"
  },
  {
    question: "What happens when you run K-Means on a dataset with non-numeric categorical features vs K-Medoids?",
    shortAnswer: "K-Means fails because you cannot compute an arithmetic mean of categories. K-Medoids succeeds using Jaccard or Hamming distance.",
    explanation: "Categorical exemplars can be directly selected as medoids.",
    hint: "Categorical and discrete data compatibility.",
    level: "intermediate"
  },
  {
    question: "What is the silhouette score in the context of K-Medoids validation?",
    shortAnswer: "A metric measuring how similar an object is to its own cluster compared to other clusters, ranging from -1 to +1.",
    explanation: "Used to determine the optimal number of medoids (k).",
    hint: "Cluster cohesion vs separation metric.",
    level: "intermediate"
  },
  {
    question: "What is the primary disadvantage of K-Medoids compared to K-Means?",
    shortAnswer: "Higher computational complexity and slower execution speed on large datasets.",
    explanation: "Calculating pairwise distances and testing candidate swaps takes O(n^2) operations compared to K-Means' O(n*k*d).",
    hint: "Higher computational and time complexity.",
    level: "basic"
  },
  {
    question: "If a dataset has 5 points with coordinates 1, 2, 4, 8, 100 on a 1D line, what is the centroid vs the medoid?",
    shortAnswer: "The centroid (mean) is 23 (heavily distorted by 100), whereas the medoid (median point) is 4 (undistorted).",
    explanation: "Calculated: Mean = (1+2+4+8+100)/5 = 23. Medoid = 4, because it is an actual central point minimizing sum of absolute distances.",
    hint: "Centroid is 23 (artificial); Medoid is 4 (real data point).",
    level: "basic"
  },
  {
    question: "Is K-Medoids guaranteed to converge to a global minimum?",
    shortAnswer: "No, PAM converges to a local minimum of the total cost function depending on initial medoid selection.",
    explanation: "Multiple random initializations are typically run to find the best local optimum.",
    hint: "Local minimum convergence.",
    level: "intermediate"
  },
  {
    question: "What is the difference between PAM BUILD phase and SWAP phase?",
    shortAnswer: "The BUILD phase selects initial k medoids sequentially. The SWAP phase iteratively replaces medoids with non-medoids to reduce total cost.",
    explanation: "BUILD is a greedy initialization; SWAP performs optimization.",
    hint: "Initialization (BUILD) vs Iterative optimization (SWAP).",
    level: "intermediate"
  },
  {
    question: "Which Python scikit-learn compatible package provides an optimized K-Medoids implementation?",
    shortAnswer: "`scikit-learn-extra` (providing `from sklearn_extra.cluster import KMedoids`).",
    explanation: "Provides fast Cython-accelerated PAM, CLARA, and Alternate algorithms.",
    hint: "scikit-learn-extra library.",
    level: "basic",
    codeExample: "from sklearn_extra.cluster import KMedoids\nkmed = KMedoids(n_clusters=3, metric='manhattan', random_state=42).fit(X)"
  },
  {
    question: "What does `kmed.medoid_indices_` contain in scikit-learn-extra?",
    shortAnswer: "The indices of the actual data rows in dataset X that serve as the cluster medoids.",
    explanation: "Allows direct retrieval of the real exemplar data instances: `X[kmed.medoid_indices_]`.",
    hint: "Row indices of the chosen medoids.",
    level: "basic"
  },
  {
    question: "Why is Manhattan distance (L1) commonly preferred over Euclidean distance (L2) in K-Medoids?",
    shortAnswer: "Manhattan distance reinforces median-like robust behavior and avoids squaring coordinate differences.",
    explanation: "L1 distance is natural for grid networks and absolute deviation optimization.",
    hint: "Reinforces median-like robustness.",
    level: "intermediate"
  },
  {
    question: "Can K-Medoids work directly on a precomputed distance matrix?",
    shortAnswer: "Yes! Set `metric='precomputed'` and pass an N x N distance matrix directly to the model.",
    explanation: "Useful when feature coordinates are unknown, but pairwise distances or dissimilarities are available.",
    hint: "metric='precomputed'.",
    level: "intermediate",
    codeExample: "kmed = KMedoids(n_clusters=2, metric='precomputed').fit(dist_matrix)"
  },
  {
    question: "What stopping condition indicates that K-Medoids (PAM) has converged?",
    shortAnswer: "When no proposed swap between a medoid and a non-medoid decreases the total cost (total cost change >= 0).",
    explanation: "At this point, a local minimum has been reached.",
    hint: "No swap yields negative cost change.",
    level: "intermediate"
  },
  {
    question: "How does the 'Alternate' (Fast K-Medoids / Voronoi iteration) heuristic work?",
    shortAnswer: "It alternates between assigning points to medoids and updating medoids as the minimum-dissimilarity point within each cluster (similar to K-Means Lloyd algorithm).",
    explanation: "Much faster than full PAM O(k(n-k)^2) while preserving medoid guarantees.",
    hint: "Lloyd-style alternation for medoids.",
    level: "advanced"
  },
  {
    question: "In facility location problems (e.g. placing fire stations or Amazon delivery hubs), why is K-Medoids the mathematical model of choice?",
    shortAnswer: "Because a facility must be constructed at an actual physical land parcel / address in the city, not in the middle of a lake or river like a centroid average.",
    explanation: "A centroid average might place a warehouse on water, whereas a medoid is guaranteed to be a real candidate address.",
    hint: "Facility must be at a real existing geographic location.",
    level: "basic"
  },
  {
    question: "What is the golden takeaway when choosing between K-Means and K-Medoids?",
    shortAnswer: "Use K-Means for massive, clean, continuous numerical data; use K-Medoids when data has noise/outliers, non-Euclidean metrics, or demands real exemplar interpretability.",
    explanation: "K-Medoids trades computational speed for extreme robustness and exact data instance representation.",
    hint: "Speed vs Robustness & Exemplar Interpretability.",
    level: "basic"
  }
];

export default questions;
