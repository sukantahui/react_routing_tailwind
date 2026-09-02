const questions = [
  {
    question: "In Exercise 1 with points P1(1,1), P2(2,1), P3(7,8), P4(8,8), which point has the lowest Manhattan distance row sum?",
    shortAnswer: "Point P2 (or P3) with a minimum row sum of 26.",
    explanation: "P2 distances: 1 + 0 + 12 + 13 = 26. P1 distances: 0 + 1 + 13 + 14 = 28.",
    hint: "Row sum = 26.",
    level: "basic"
  },
  {
    question: "What is the Manhattan distance between Point P1(1, 1) and Point P3(7, 8)?",
    options: ["13 (|1 - 7| + |1 - 8| = 6 + 7 = 13)", "11", "15", "9"],
    correctAnswer: 0,
    explanation: "|1 - 7| + |1 - 8| = 6 + 7 = 13.",
    level: "basic"
  },
  {
    question: "In Exercise 1, what is the cost reduction gain if Point P3 is chosen as the second medoid after P2?",
    options: ["24 (Gain on P3 = 12, Gain on P4 = 12; Total = 24)", "12", "18", "26"],
    correctAnswer: 0,
    explanation: "max(0, 12 - 0) + max(0, 13 - 1) = 12 + 12 = 24.",
    level: "intermediate"
  },
  {
    question: "What is the final total clustering cost J for Exercise 1 with medoids [P2, P3]?",
    options: ["2 (Distances: P1->P2: 1, P2->P2: 0, P3->P3: 0, P4->P3: 1)", "4", "6", "0"],
    correctAnswer: 0,
    explanation: "1 + 0 + 0 + 1 = 2.",
    level: "basic"
  },
  {
    question: "In Exercise 2, what was the cost delta Delta C when testing the swap of Medoid P1 with Point P2?",
    options: ["0 (Cost remained 5, swap rejected)", "-2", "+2", "-1"],
    correctAnswer: 0,
    explanation: "Delta C = 5 - 5 = 0; since Delta C is not negative, the swap is rejected.",
    level: "intermediate"
  },
  {
    question: "If a candidate swap produces Delta C = -3.5, should the PAM algorithm accept the swap?",
    shortAnswer: "Yes! Any swap with strictly negative Delta C (< 0) reduces the total cost and is accepted.",
    explanation: "Monotonic cost reduction requires accepting negative Delta C swaps.",
    hint: "Delta C < 0 is accepted.",
    level: "basic"
  },
  {
    question: "What is the Euclidean distance between Point (2, 5) and Point (6, 8)?",
    options: ["5.0 (sqrt((6-2)^2 + (8-5)^2) = sqrt(16 + 9) = 5)", "7.0", "6.0", "4.5"],
    correctAnswer: 0,
    explanation: "sqrt(4^2 + 3^2) = sqrt(25) = 5.0.",
    level: "basic"
  },
  {
    question: "If a cluster contains points A, B, C with intra-cluster distance sums 18, 12, 15 respectively, which point becomes the updated medoid?",
    shortAnswer: "Point B! Because it has the lowest intra-cluster distance sum (12).",
    explanation: "Intra-cluster argmin picks the point with minimum distance sum.",
    hint: "Point B has lowest sum (12).",
    level: "basic"
  },
  {
    question: "What is the Chebyshev distance between Point (1, 10) and Point (5, 4)?",
    options: ["6 (max(|1-5|, |10-4|) = max(4, 6) = 6)", "10", "4", "7.21"],
    correctAnswer: 0,
    explanation: "max(|1 - 5|, |10 - 4|) = max(4, 6) = 6.",
    level: "basic"
  },
  {
    question: "If dataset size N = 6 and K = 2, how many candidate swaps are evaluated in a single PAM SWAP iteration?",
    options: ["8 swaps (K * (N - K) = 2 * 4 = 8)", "12 swaps", "15 swaps", "6 swaps"],
    correctAnswer: 0,
    explanation: "2 medoids * 4 non-medoids = 8 candidate swap pairs.",
    level: "intermediate"
  },
  {
    question: "What is the Cosine similarity between orthogonal vectors [1, 0] and [0, 1]?",
    options: ["0.0 (Cosine Distance = 1.0)", "1.0", "-1.0", "0.5"],
    correctAnswer: 0,
    explanation: "Dot product is 0, Cosine similarity = 0, Cosine distance = 1 - 0 = 1.0.",
    level: "basic"
  },
  {
    question: "If point X has mean intra-cluster distance a(X) = 2.0 and mean nearest-cluster distance b(X) = 6.0, what is its Silhouette Coefficient?",
    options: ["+0.667 ((6 - 2) / 6 = 4/6 ≈ 0.667)", "+0.500", "+0.333", "-0.667"],
    correctAnswer: 0,
    explanation: "s(X) = (b - a) / max(a, b) = (6 - 2) / 6 = 4/6 ≈ +0.667.",
    level: "intermediate"
  },
  {
    question: "If point Y has a(Y) = 5.0 and b(Y) = 3.0, what is its Silhouette score and what does it indicate?",
    shortAnswer: "s(Y) = (3 - 5) / 5 = -0.40; indicates point Y is closer to the neighboring cluster and is likely misclassified.",
    explanation: "Negative silhouette score signals poor cluster assignment.",
    hint: "Negative silhouette score (-0.40).",
    level: "intermediate"
  },
  {
    question: "What is the main diagonal value for any pairwise distance matrix D?",
    shortAnswer: "All main diagonal elements are 0.0: D[i, i] = 0.",
    explanation: "Distance from an object to itself is zero under any metric.",
    hint: "D[i, i] = 0.",
    level: "basic"
  },
  {
    question: "How many total elements are in a precomputed distance matrix for N = 8 points?",
    options: ["64 (8 * 8 = 64 elements)", "28", "56", "16"],
    correctAnswer: 0,
    explanation: "An N x N matrix contains N^2 = 8 * 8 = 64 entries.",
    level: "basic"
  },
  {
    question: "How many UNIQUE pairwise distances exist in an N = 8 symmetric distance matrix (excluding diagonal)?",
    options: ["28 (N * (N - 1) / 2 = 8 * 7 / 2 = 28)", "64", "56", "32"],
    correctAnswer: 0,
    explanation: "8 * 7 / 2 = 28 unique off-diagonal pairs.",
    level: "intermediate"
  },
  {
    question: "Why does multiplying all feature coordinates by a factor of 10 change the numerical value of total cost J but NOT the final medoids?",
    shortAnswer: "Because scaling all dimensions uniformly multiplies all pairwise distances by 10, preserving the exact relative distance rankings.",
    explanation: "Preserves the argmin order across all points.",
    hint: "Preserves relative distance rankings.",
    level: "intermediate"
  },
  {
    question: "If K = N (each point is its own cluster), what is the total clustering cost J?",
    options: ["0.0", "N", "Infinity", "Undefined"],
    correctAnswer: 0,
    explanation: "Each point is its own medoid, so distance from each point to its medoid is 0.",
    level: "basic"
  },
  {
    question: "What is the Hamming distance between binary vectors [1, 0, 1, 1] and [1, 1, 0, 1]?",
    options: ["2 (positions 2 and 3 differ)", "1", "3", "0"],
    correctAnswer: 0,
    explanation: "Vectors differ at index 1 (0 vs 1) and index 2 (1 vs 0), total = 2.",
    level: "basic"
  },
  {
    question: "In exam problems, how do you verify if a medoid set [M1, M2] is a local minimum?",
    shortAnswer: "Test all possible (N - K) * K candidate swaps and verify that Delta C >= 0 for all of them.",
    explanation: "Proves no cost-reducing swap exists.",
    hint: "All Delta C >= 0.",
    level: "basic"
  },
  {
    question: "What is the computational complexity of computing an N x N distance matrix for d dimensions?",
    options: ["O(N^2 * d)", "O(N * d)", "O(N^3)", "O(d^2)"],
    correctAnswer: 0,
    explanation: "N * N pairs, each requiring d coordinate difference operations.",
    level: "intermediate"
  },
  {
    question: "If point P(4, 4) is tested against Medoid 1(1, 1) and Medoid 2(5, 5) using Manhattan distance, which medoid is it assigned to?",
    shortAnswer: "Medoid 2! Distance to M1 = |4-1| + |4-1| = 6; Distance to M2 = |4-5| + |4-5| = 2.",
    explanation: "Closer to Medoid 2 with distance 2.",
    hint: "Distance to M2 is 2 (closer than 6).",
    level: "basic"
  },
  {
    question: "How do you calculate the Davies-Bouldin index for K clusters?",
    shortAnswer: "DB = (1 / K) * sum_i max_{j != i} (s_i + s_j) / d(m_i, m_j), where s_i is cluster dispersion.",
    explanation: "Lower DB score indicates better clustering.",
    hint: "Ratio of cluster spread to medoid separation.",
    level: "advanced"
  },
  {
    question: "What is the primary benefit of working through numerical exercises before programming K-Medoids?",
    shortAnswer: "It builds rock-solid intuition on distance matrices, gain formulas, and swap evaluation criteria.",
    explanation: "Essential for academic exams and debugging code.",
    hint: "Solidifies mathematical intuition and matrix operations.",
    level: "basic"
  },
  {
    question: "What is the golden exam rule for K-Medoids numerical problems?",
    shortAnswer: "Always write out the complete N x N distance matrix first; everything else (row sums, gains, and swaps) flows directly from simple table lookups!",
    explanation: "Master strategy for fast, error-free exam solutions.",
    hint: "Write out the full distance matrix first.",
    level: "basic"
  }
];

export default questions;
