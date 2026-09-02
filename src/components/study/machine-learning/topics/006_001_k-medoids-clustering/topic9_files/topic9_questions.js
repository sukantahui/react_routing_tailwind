const questions = [
  {
    question: "In the worked example with points A(1,2), B(2,3), C(3,2), D(8,7), E(9,8), why is Point B chosen as the first medoid?",
    shortAnswer: "Because Point B has the lowest sum of distances to all other points (Row sum = 26).",
    explanation: "BUILD phase selects the global minimum distance sum point first.",
    hint: "Row sum is 26 (lowest).",
    level: "basic"
  },
  {
    question: "What is the Manhattan distance between Point A(1, 2) and Point D(8, 7)?",
    options: ["12 (|1 - 8| + |2 - 7| = 7 + 5 = 12)", "10", "14", "8"],
    correctAnswer: 0,
    explanation: "|1 - 8| + |2 - 7| = 7 + 5 = 12.",
    level: "basic"
  },
  {
    question: "How is the second medoid chosen in the worked example BUILD phase?",
    shortAnswer: "By evaluating the cost reduction gain for all remaining points {A, C, D, E} and selecting the point with the highest gain (Point E, Gain = 20).",
    explanation: "Candidate E reduces distance to D and E significantly.",
    hint: "Point with highest cost reduction gain.",
    level: "intermediate"
  },
  {
    question: "What is the total clustering cost for the initial medoid configuration [B, E]?",
    options: ["6 (|A-B|=2 + |B-B|=0 + |C-B|=2 + |D-E|=2 + |E-E|=0)", "12", "18", "26"],
    correctAnswer: 0,
    explanation: "Distances to nearest medoid: A->B: 2, B->B: 0, C->B: 2, D->E: 2, E->E: 0. Total = 2 + 0 + 2 + 2 + 0 = 6.",
    level: "basic"
  },
  {
    question: "Which points are assigned to Cluster 1 (Medoid B) in the worked example?",
    shortAnswer: "Points A(1,2), B(2,3), and C(3,2).",
    explanation: "All three points are closer to B than to E.",
    hint: "Points A, B, and C.",
    level: "basic"
  },
  {
    question: "Which points are assigned to Cluster 2 (Medoid E) in the worked example?",
    shortAnswer: "Points D(8,7) and E(9,8).",
    explanation: "Points D and E are closer to E than to B.",
    hint: "Points D and E.",
    level: "basic"
  },
  {
    question: "When testing a swap of Medoid B with Point A in the SWAP phase, what is the resulting cost change Delta C?",
    shortAnswer: "Delta C = +2 (Cost increases from 6 to 8), so the swap is rejected.",
    explanation: "Since Delta C > 0, the swap degrades cluster quality.",
    hint: "Delta C is positive (+2), so swap is rejected.",
    level: "intermediate"
  },
  {
    question: "When testing a swap of Medoid E with Point D in the SWAP phase, what is the cost change?",
    shortAnswer: "Delta C = 0 (Cost remains 6), so no strict cost improvement is gained.",
    explanation: "Points D and E are symmetric partners with distance 2.",
    hint: "Cost remains 6 (Delta = 0).",
    level: "intermediate"
  },
  {
    question: "Why does the PAM algorithm stop after evaluating all possible candidate swaps in this worked example?",
    shortAnswer: "Because no proposed swap achieves a strictly negative Delta C (min Delta C >= 0).",
    explanation: "Proves that the configuration [B, E] is a local minimum.",
    hint: "No swap yields negative Delta C.",
    level: "basic"
  },
  {
    question: "What is the Euclidean distance between Point B(2, 3) and Point C(3, 2)?",
    options: ["sqrt(2) ≈ 1.414", "2.0", "1.0", "4.0"],
    correctAnswer: 0,
    explanation: "sqrt((3 - 2)^2 + (2 - 3)^2) = sqrt(1 + 1) = sqrt(2) ≈ 1.414.",
    level: "basic"
  },
  {
    question: "Why was Manhattan distance used in this numerical example rather than Euclidean distance?",
    shortAnswer: "To keep all manual arithmetic computations in clean integer arithmetic for easy classroom calculation.",
    explanation: "Manhattan distances between integer coordinates remain integers.",
    hint: "Maintains clean integer arithmetic.",
    level: "basic"
  },
  {
    question: "What is the Silhouette score of Point A(1, 2) in the final clusters {A, B, C} and {D, E}?",
    shortAnswer: "s(A) = (b(A) - a(A)) / max(a(A), b(A)) = (13 - 2) / 13 = 11/13 ≈ +0.846 (Strongly clustered).",
    explanation: "a(A) = mean dist to {B,C} = (2+2)/2 = 2; b(A) = mean dist to {D,E} = (12+14)/2 = 13.",
    hint: "Positive silhouette score near 0.85.",
    level: "advanced"
  },
  {
    question: "If Point F(50, 50) were added to this dataset, how would the medoid of Cluster 1 change?",
    shortAnswer: "It would not change! Medoid B remains at (2, 3) because medoids are robust against distant outliers.",
    explanation: "Illustrates the outlier resistance of K-Medoids.",
    hint: "Medoid remains unchanged at Point B.",
    level: "basic"
  },
  {
    question: "What would happen to the K-Means centroid of Cluster 1 if Point F(50, 50) were assigned to it?",
    shortAnswer: "The centroid would be pulled dramatically from (2, 2.33) to (14, 14.25).",
    explanation: "Contrasts centroid distortion against medoid stability.",
    hint: "Centroid is drastically pulled.",
    level: "basic"
  },
  {
    question: "How many non-medoid points exist in this 5-point dataset with K=2?",
    options: ["3 points (N - K = 5 - 2 = 3)", "2 points", "5 points", "0 points"],
    correctAnswer: 0,
    explanation: "N - K = 5 - 2 = 3 non-medoid points (Points A, C, D).",
    level: "basic"
  },
  {
    question: "How many candidate swaps must be evaluated in each iteration of the SWAP phase for this example?",
    options: ["6 swaps (K * (N - K) = 2 * 3 = 6)", "10 swaps", "2 swaps", "25 swaps"],
    correctAnswer: 0,
    explanation: "2 medoids * 3 non-medoids = 6 candidate swap pairs.",
    level: "intermediate"
  },
  {
    question: "What is the main diagonal sum of the 5x5 distance matrix in this worked example?",
    shortAnswer: "0 (All diagonal elements are zero).",
    explanation: "The distance from any point to itself is always zero.",
    hint: "Diagonal sum is 0.",
    level: "basic"
  },
  {
    question: "If Point C(3, 2) were selected as Medoid 1 instead of Point B(2, 3), what would the total clustering cost be?",
    shortAnswer: "Total cost would still be 6 (Cost is symmetric for B and C).",
    explanation: "Points B and C have identical distance properties relative to A, D, and E.",
    hint: "Symmetric total cost = 6.",
    level: "intermediate"
  },
  {
    question: "What does the gain calculation in the BUILD phase represent intuitively?",
    shortAnswer: "The total distance saved across all data points by having a second medoid available to service nearby points.",
    explanation: "Measures the reduction in travel distance.",
    hint: "Distance saved by adding second medoid.",
    level: "intermediate"
  },
  {
    question: "How do you verify in Python that the final clusters match the manual calculation?",
    shortAnswer: "Run `KMedoids(n_clusters=2, metric='manhattan').fit(X)` and print `medoid_indices_`.",
    explanation: "Returns `[1, 4]` corresponding to Points B and E.",
    hint: "kmed.medoid_indices_ matches [1, 4].",
    level: "basic",
    codeExample: "from sklearn_extra.cluster import KMedoids\nkmed = KMedoids(n_clusters=2, metric='manhattan').fit(X)\nprint(kmed.medoid_indices_)"
  },
  {
    question: "What is the maximum intra-cluster distance in Cluster 1 {A, B, C}?",
    shortAnswer: "2 units (between A-B, A-C, and B-C).",
    explanation: "All points in Cluster 1 are within 2 Manhattan units of each other.",
    hint: "Max intra-cluster distance = 2.",
    level: "basic"
  },
  {
    question: "What is the inter-cluster distance between Medoid B(2, 3) and Medoid E(9, 8)?",
    options: ["12 (|2 - 9| + |3 - 8| = 7 + 5 = 12)", "10", "14", "8"],
    correctAnswer: 0,
    explanation: "|2 - 9| + |3 - 8| = 7 + 5 = 12.",
    level: "basic"
  },
  {
    question: "Why is the inter-cluster distance (12) significantly larger than the intra-cluster distances (2)?",
    shortAnswer: "Because the dataset has two well-separated, distinct clusters, resulting in high cluster quality.",
    explanation: "High separation vs low cohesion is the hallmark of good clustering.",
    hint: "High separation vs low cohesion.",
    level: "basic"
  },
  {
    question: "Could K-Means have found a non-integer centroid on this dataset?",
    shortAnswer: "Yes! Centroid 1 would be ((1+2+3)/3, (2+3+2)/3) = (2.0, 2.33), which is not an integer and not an actual point in the dataset.",
    explanation: "Contrasts continuous centroid arithmetic with discrete medoid points.",
    hint: "Centroid 1 has fractional coordinate (2.0, 2.33).",
    level: "basic"
  },
  {
    question: "What is the primary educational value of completing this manual worked example?",
    shortAnswer: "It demystifies the PAM algorithm by proving that K-Medoids is simple, deterministic matrix arithmetic that can be solved by hand on paper.",
    explanation: "Builds deep intuition for algorithm internals.",
    hint: "Demystifies PAM through transparent step-by-step matrix math.",
    level: "basic"
  }
];

export default questions;
