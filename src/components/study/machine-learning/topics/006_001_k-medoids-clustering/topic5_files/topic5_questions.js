const questions = [
  {
    question: "What is the primary objective of the Medoid Update step in alternate K-Medoids?",
    shortAnswer: "To find the member point within each cluster that minimizes the sum of distances to all other points in that same cluster.",
    explanation: "Ensures the cluster exemplar is as central as possible to its assigned members.",
    hint: "Minimizes intra-cluster sum of distances.",
    level: "basic"
  },
  {
    question: "What is the mathematical definition of the updated medoid m_k^* for cluster C_k?",
    shortAnswer: "m_k^* = argmin_{y in C_k} sum_{x in C_k} D(x, y)",
    explanation: "Combinatorial argmin across all points currently assigned to cluster C_k.",
    hint: "Argmin of sum of intra-cluster distances.",
    level: "basic"
  },
  {
    question: "How does the medoid update time complexity compare to K-Means centroid update for a cluster of size N_k?",
    shortAnswer: "Centroid update is O(N_k * d) (linear average); Medoid update is O(N_k^2 * d) (quadratic pairwise comparison).",
    explanation: "Testing all candidates in the cluster requires evaluating an N_k x N_k distance submatrix.",
    hint: "O(N_k) linear mean vs O(N_k^2) pairwise evaluation.",
    level: "intermediate"
  },
  {
    question: "Can the updated medoid of a cluster be a point that was not assigned to that cluster?",
    shortAnswer: "No, in standard alternate K-Medoids, the search is strictly restricted to members currently assigned to that cluster.",
    explanation: "m_k^* in C_k ensures cluster self-containment.",
    hint: "Restricted strictly to cluster members.",
    level: "basic"
  },
  {
    question: "What happens if an existing medoid already has the lowest sum of intra-cluster distances?",
    shortAnswer: "The medoid does not change; it remains as the cluster representative for the next iteration.",
    explanation: "If no other point has a lower total distance, the current medoid is retained.",
    hint: "Medoid remains unchanged.",
    level: "basic"
  },
  {
    question: "If all K medoids remain identical after the update step, what does this signify?",
    shortAnswer: "Convergence! The algorithm has reached a stable local minimum and terminates.",
    explanation: "No medoids moved, so assignments in the next step will be identical.",
    hint: "Algorithm convergence.",
    level: "basic"
  },
  {
    question: "How can precomputing the full N x N distance matrix accelerate the medoid update step?",
    shortAnswer: "By extracting the submatrix of precomputed distances directly, replacing distance arithmetic with fast array slice sums.",
    explanation: "Eliminates redundant square roots and difference calculations.",
    hint: "Fast array slice summation from precomputed matrix.",
    level: "intermediate"
  },
  {
    question: "If a cluster contains 3 points with pairwise distances d(A,B)=2, d(A,C)=4, d(B,C)=3, which point is the updated medoid?",
    shortAnswer: "Point B! TotalDist(A) = 2+4 = 6; TotalDist(B) = 2+3 = 5; TotalDist(C) = 4+3 = 7. Minimum is B (Total = 5).",
    explanation: "Point B has the smallest sum of distances to all other cluster members.",
    hint: "Point B has lowest total distance (5).",
    level: "basic"
  },
  {
    question: "What is the difference between global PAM SWAP and cluster-wise Medoid Update?",
    shortAnswer: "PAM SWAP evaluates all cross-cluster point exchanges globally; cluster-wise update only searches within each assigned cluster locally.",
    explanation: "Cluster-wise update is the Alternate / Voronoi iteration heuristic.",
    hint: "Global cross-cluster swap vs local intra-cluster update.",
    level: "advanced"
  },
  {
    question: "Why does the medoid update step guarantee that the total intra-cluster cost will never increase?",
    shortAnswer: "Because the update explicitly chooses the candidate that minimizes total distance, which is at least as good as the current medoid.",
    explanation: "Intra-cluster cost is monotonically non-increasing.",
    hint: "Explicitly minimizes distance sum.",
    level: "basic"
  },
  {
    question: "Can medoid selection be parallelized across multiple CPU cores?",
    shortAnswer: "Yes! Since each of the K clusters updates its medoid independently, all K cluster medoid updates can execute concurrently in parallel.",
    explanation: "Embarrassingly parallel across the K cluster partitions.",
    hint: "Independent parallel execution across K clusters.",
    level: "intermediate"
  },
  {
    question: "What happens if a cluster has only 1 point (singleton cluster)?",
    shortAnswer: "That single point is trivially selected as the medoid with total intra-cluster distance = 0.",
    explanation: "A single point has distance 0 to itself.",
    hint: "Single point is trivially the medoid.",
    level: "basic"
  },
  {
    question: "How does feature scaling impact the medoid selection outcome within a cluster?",
    shortAnswer: "Scaling ensures all feature dimensions contribute proportionally to intra-cluster distance sums, preventing high-magnitude features from biasing medoid selection.",
    explanation: "Preserves balanced multi-attribute geometric centrality.",
    hint: "Balances attribute contributions to distance sums.",
    level: "intermediate"
  },
  {
    question: "In text document clustering, how is the medoid update step interpreted?",
    shortAnswer: "Finding the single document in the topic folder that shares the highest average cosine similarity with all other documents in that folder.",
    explanation: "The updated document becomes the authoritative topic summary.",
    hint: "Most representative document in the topic.",
    level: "basic"
  },
  {
    question: "What is the 'Geometric Median' problem and why is finding a medoid a discrete relaxation of it?",
    shortAnswer: "The Fermat-Weber geometric median problem seeks any continuous point in R^d minimizing sum of distances; medoid search restricts the solution space to the discrete dataset.",
    explanation: "Medoid is the combinatorial, sample-constrained variant of the geometric median.",
    hint: "Discrete relaxation of Fermat-Weber problem.",
    level: "advanced"
  },
  {
    question: "Can an outlier point ever be selected as the updated medoid of a normal cluster?",
    shortAnswer: "Virtually never, because an outlier at the cluster periphery has large distances to all other members, resulting in a very high distance sum.",
    explanation: "The minimum distance sum naturally rejects peripheral outliers.",
    hint: "Outliers have high distance sums and are rejected.",
    level: "basic"
  },
  {
    question: "How does the Alternate K-Medoids algorithm alternate between its two main steps?",
    shortAnswer: "1. Assignment Step: Assign all points to nearest medoids. 2. Update Step: Recalculate medoids within each cluster. Repeat until convergence.",
    explanation: "Direct analogue of Lloyd's K-Means algorithm.",
    hint: "Alternate between Assignment and Update steps.",
    level: "basic"
  },
  {
    question: "What is the maximum number of pairwise distances computed when updating a cluster of size 100?",
    options: ["10,000 (or 4,950 unique pairs)", "100", "200", "1,000"],
    correctAnswer: 0,
    explanation: "An intra-cluster distance matrix for 100 points contains 100 * 100 = 10,000 entries (4,950 strictly off-diagonal unique pairs).",
    level: "basic"
  },
  {
    question: "In logistics (e.g. Amazon hub placement in Shyamnagar), what does the updated medoid represent?",
    shortAnswer: "The specific existing warehouse address that minimizes total driving kilometers for all delivery vans assigned to that regional zone.",
    explanation: "Provides the exact optimal facility dispatch address.",
    hint: "Minimum transit kilometers warehouse address.",
    level: "basic"
  },
  {
    question: "How does scikit-learn-extra implement the alternate update heuristic?",
    shortAnswer: "`method='alternate'` in `KMedoids`.",
    explanation: "Provides fast Lloyd-style alternation for large datasets.",
    hint: "method='alternate'.",
    level: "basic",
    codeExample: "kmed = KMedoids(n_clusters=3, method='alternate').fit(X)"
  },
  {
    question: "What metric is used to evaluate medoid stability across iterations?",
    shortAnswer: "Tracking whether `medoid_indices_` changes from iteration t to t+1.",
    explanation: "If indices match, medoids have stabilized.",
    hint: "Tracking medoid index stability.",
    level: "basic"
  },
  {
    question: "Can tie-breaking during medoid selection cause cycling in rare pathological cases?",
    shortAnswer: "Yes, inconsistent tie-breaking between equidistant candidates can cause infinite loops; strict index tie-breaking rules prevent this.",
    explanation: "Consistent tie-breaking guarantees strict termination.",
    hint: "Strict index tie-breaking prevents cycling.",
    level: "advanced"
  },
  {
    question: "Why is medoid selection completely immune to arithmetic precision underflow compared to calculating centroids?",
    shortAnswer: "Because medoids are selected from existing input rows without performing continuous floating-point averaging or division.",
    explanation: "Selects real data objects without floating-point quantization drift.",
    hint: "Combinatorial selection avoids division drift.",
    level: "intermediate"
  },
  {
    question: "How does the medoid update step handle missing attribute values if a pairwise distance matrix is supplied?",
    shortAnswer: "It simply sums the precomputed matrix rows without needing to impute or average missing feature coordinates.",
    explanation: "Operates purely on pairwise distances.",
    hint: "Row sums of precomputed distance matrix.",
    level: "intermediate"
  },
  {
    question: "What is the core takeaway of Medoid Selection and Update in machine learning?",
    shortAnswer: "It guarantees that the cluster exemplar is always an optimal, physical representative that minimizes intra-cluster dissimilarity.",
    explanation: "Delivers maximum intra-cluster cohesion and real-world interpretability.",
    hint: "Optimal physical exemplar minimizing intra-cluster dissimilarity.",
    level: "basic"
  }
];

export default questions;
