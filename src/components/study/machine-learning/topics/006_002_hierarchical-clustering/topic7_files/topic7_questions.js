const questions = [
  {
    question: "What is the primary definition of Average Linkage & Ward's Method?",
    shortAnswer: "A method that constructs nested cluster hierarchies represented as binary trees.",
    explanation: "It builds a full tree without forcing a single fixed partition K.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "Does Average Linkage & Ward's Method require pre-specifying the number of clusters K?",
    shortAnswer: "No, hierarchical clustering builds the entire tree first.",
    explanation: "You select K after inspecting the dendrogram by horizontal cutting.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is a Dendrogram?",
    shortAnswer: "A tree diagram representing hierarchical cluster merges and heights.",
    explanation: "Leaves represent individual points; height represents dissimilarity.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is the time complexity of standard Agglomerative Clustering?",
    shortAnswer: "O(N^3) naive, or O(N^2 log N) optimized.",
    explanation: "Memory complexity is O(N^2) for the distance matrix.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "How does Single Linkage measure cluster distance?",
    shortAnswer: "Minimum distance between any point in Cluster A and any point in Cluster B.",
    explanation: "D(A,B) = min d(x,y).",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is the main drawback of Single Linkage?",
    shortAnswer: "The chaining effect.",
    explanation: "Long straggly clusters formed by noisy outlier points bridging distinct groups.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "How does Complete Linkage measure cluster distance?",
    shortAnswer: "Maximum distance between any point in Cluster A and any point in Cluster B.",
    explanation: "D(A,B) = max d(x,y).",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What type of clusters does Complete Linkage produce?",
    shortAnswer: "Compact, spherical clusters with bounded maximum diameter.",
    explanation: "Prevents chaining effect by penalizing large cluster sizes.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "How does Average Linkage (UPGMA) work?",
    shortAnswer: "Averages all pairwise distances between points in Cluster A and Cluster B.",
    explanation: "D(A,B) = (1 / (|A||B|)) * sum sum d(x,y).",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What objective does Ward's Minimum Variance method optimize?",
    shortAnswer: "Minimizes the increase in within-cluster Variance (Sum of Squared Errors).",
    explanation: "Merges cluster pair that causes smallest increase in total ESS.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "basic",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is the Lance-Williams Recurrence Formula?",
    shortAnswer: "A unified equation to update distance matrix entries after merging two clusters.",
    explanation: "Allows updating distances without re-evaluating all raw point pairs.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is Cophenetic Distance?",
    shortAnswer: "The height in the dendrogram where two observations are first merged into the same cluster.",
    explanation: "Denoted c_ij.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is the Cophenetic Correlation Coefficient (CPCC)?",
    shortAnswer: "Pearson correlation between original pairwise distances and cophenetic tree distances.",
    explanation: "Measures how accurately the dendrogram preserves pairwise distances.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "How do you choose K from a dendrogram?",
    shortAnswer: "By drawing a horizontal cut line across the largest vertical unbranched gap.",
    explanation: "Number of intersected vertical lines equals K.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is Agglomerative Clustering (AGNES)?",
    shortAnswer: "Bottom-up approach starting with N singletons and merging until 1 root remains.",
    explanation: "Executes N-1 total merge steps.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is Divisive Clustering (DIANA)?",
    shortAnswer: "Top-down approach starting with 1 all-inclusive root and recursively splitting.",
    explanation: "Computationally heavier without heuristic splitting rules.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "Can hierarchical clustering handle non-Euclidean distance metrics?",
    shortAnswer: "Yes, it works with Manhattan, Cosine, Jaccard, or any custom dissimilarity matrix.",
    explanation: "Does not compute mean centroid vectors.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is monotonicity in a dendrogram?",
    shortAnswer: "Merge height values must increase strictly as you move up the tree.",
    explanation: "h1 <= h2 <= ... <= h_{N-1}.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What happens if features are not scaled before hierarchical clustering?",
    shortAnswer: "Large magnitude features dominate distance calculations.",
    explanation: "Always apply z-score standardization first.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "How does Ward's method compare to K-Means?",
    shortAnswer: "Both minimize variance (ESS), but Ward's produces a deterministic hierarchy.",
    explanation: "Ward's does not require random centroid initialization.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "intermediate",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is an Inconsistency Coefficient in a dendrogram?",
    shortAnswer: "Measures height difference between a merge and lower merges in the tree.",
    explanation: "Higher values indicate distinct cluster boundaries.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "advanced",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "Can hierarchical clustering be used on streaming data?",
    shortAnswer: "No, because updating the hierarchy requires recomputing distance matrices.",
    explanation: "It is an offline algorithm.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "advanced",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "Why is hierarchical clustering deterministic?",
    shortAnswer: "Given the same dataset and linkage rule, it produces the exact same dendrogram tree every run.",
    explanation: "No random initial centroid selection.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "advanced",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "How to handle large datasets N > 50,000 in hierarchical clustering?",
    shortAnswer: "Use hybrid methods: pre-cluster with K-Means, then run hierarchical clustering on centroids.",
    explanation: "Prevents O(N^2) memory overflow.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "advanced",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  },
  {
    question: "What is the main application of hierarchical clustering in bioinformatics?",
    shortAnswer: "Phylogenetic tree construction and gene expression heatmap clustering.",
    explanation: "Identifies nested biological species relationships.",
    hint: "Think about tree structure and dissimilarity matrices.",
    level: "advanced",
    codeExample: "from scipy.cluster.hierarchy import linkage, dendrogram\nZ = linkage(X, method='ward')"
  }
];

export default questions;
