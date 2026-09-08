const topic12Questions = [
  {
    id: 1,
    question: "What does the `inertia_` attribute measure in Scikit-learn's `KMeans` algorithm?",
    options: [
      "The elapsed training execution time in milliseconds",
      "The Within-Cluster Sum of Squares (sum of squared distances between each sample and its assigned centroid)",
      "The number of CPU threads utilized during convergence",
      "The classification accuracy compared to ground truth labels"
    ],
    correctAnswer: 1,
    explanation: "`inertia_` is the Within-Cluster Sum of Squares (WCSS), quantifying how internally coherent and tightly grouped the clusters are. Lower inertia indicates tighter clusters."
  },
  {
    id: 2,
    question: "What is the primary advantage of the default `init='k-means++'` over purely random centroid initialization?",
    options: [
      "It speeds up execution by skipping the distance calculation step",
      "It selects initial centroids that are distant from each other with high probability, significantly reducing convergence to bad local minima",
      "It automatically estimates the optimal number of clusters K",
      "It allows K-Means to cluster non-numeric string data"
    ],
    correctAnswer: 1,
    explanation: "`k-means++` smartly seeds initial cluster centers proportional to their squared distance from existing centers, ensuring well-spread starting positions and preventing poor local optima."
  },
  {
    id: 3,
    question: "How is the optimal number of clusters K identified using the Elbow Method?",
    options: [
      "By selecting the K value where inertia reaches exactly 0.0",
      "By identifying the inflection point on the Inertia vs K plot where the rate of decrease abruptly decelerates/flattens",
      "By choosing the maximum possible K value supported by RAM",
      "By finding where the silhouette score becomes negative"
    ],
    correctAnswer: 1,
    explanation: "The elbow point on an Inertia vs. K curve marks the point of diminishing returns, where adding further clusters yields only marginal reductions in within-cluster variance."
  },
  {
    id: 4,
    question: "Which learned attribute in `KMeans` stores the coordinates of the cluster centroids?",
    options: [
      "kmeans.centroids_",
      "kmeans.cluster_centers_",
      "kmeans.means_",
      "kmeans.centers_"
    ],
    correctAnswer: 1,
    explanation: "In Scikit-learn, the final centroid coordinates for all K clusters are stored in the `cluster_centers_` attribute as a 2D numpy array of shape (n_clusters, n_features)."
  }
];

export default topic12Questions;
