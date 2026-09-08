const topic19Questions = [
  {
    id: 1,
    question: "Why should `scaler.inverse_transform()` be applied to `kmeans.cluster_centers_` when presenting clustering results to business stakeholders?",
    options: [
      "To convert centroids back from dimensionless Z-scores into real-world physical units (e.g. counts, hours, dollars)",
      "To compute classification accuracy",
      "Because K-Means deletes the original dataset",
      "To sort clusters in ascending order"
    ],
    correctAnswer: 0,
    explanation: "Because KMeans is trained on scaled data, the raw `cluster_centers_` are in Z-score units. Calling `scaler.inverse_transform()` maps them back into physical, understandable units."
  },
  {
    id: 2,
    question: "What does a high positive Silhouette Score (e.g., +0.72) indicate about a clustering result?",
    options: [
      "The model has overfitted to training noise",
      "The clusters are well separated, dense, and cohesive with minimal overlap",
      "The dataset contains 72% missing values",
      "K-Means required 72 iterations to converge"
    ],
    correctAnswer: 1,
    explanation: "The Silhouette coefficient measures how similar an object is to its own cluster compared to other clusters. Values near +1.0 indicate excellent cluster separation and internal compactness."
  },
  {
    id: 3,
    question: "How does `pipeline.predict(X_new)` handle new incoming samples when the pipeline consists of `StandardScaler` followed by `KMeans`?",
    options: [
      "It randomly guesses a cluster ID",
      "It standardizes X_new using the previously learned mean and scale, then assigns it to the nearest cluster centroid based on Euclidean distance",
      "It re-clusters the entire historical dataset from scratch",
      "It raises a NotFittedError"
    ],
    correctAnswer: 1,
    explanation: "The Pipeline automatically pipes `X_new` through `scaler.transform()` using the stored training statistics and passes the scaled vector to `kmeans.predict()`, which assigns it to the closest centroid."
  },
  {
    id: 4,
    question: "What does a negative Silhouette Score for a sample signify?",
    options: [
      "The sample is equidistant from all centroids",
      "The sample is closer to points in a neighboring cluster than to points in its own assigned cluster (likely misclustered)",
      "The sample has zero variance",
      "The sample contains negative values"
    ],
    correctAnswer: 1,
    explanation: "A negative silhouette score indicates that the sample's average distance to its own cluster members ($a$) is greater than its distance to the nearest alternative cluster ($b$), implying potential misassignment."
  }
];

export default topic19Questions;
