const questions = [
  {
    id: 1,
    question: "Why is feature scaling essential prior to computing Euclidean distances in KNN or K-Means clustering?",
    options: [
      "To prevent Python memory overflow",
      "Because features with large raw numerical scales will disproportionately dominate the Euclidean distance calculation, ignoring features with smaller scales",
      "Because Euclidean distance only accepts integers",
      "To convert 2D arrays to 1D"
    ],
    correctAnswer: 1,
    explanation: "Euclidean distance squares coordinate differences. A difference of ₹5,000 in salary completely overwhelms a difference of 5 years in age unless scaled."
  },
  {
    id: 2,
    question: "What function in `scipy.spatial.distance` calculates the pairwise distance between two separate matrices X_test and X_train in a single C-speed vector call?",
    options: [
      "distance.cdist()",
      "distance.pdist()",
      "distance.euclid_all()",
      "distance.cross_table()"
    ],
    correctAnswer: 0,
    explanation: "`cdist(XA, XB, metric='euclidean')` computes the distance matrix between all pairs of rows in XA and XB."
  },
  {
    id: 3,
    question: "How does K-Means clustering utilize `scipy.spatial.distance.cdist` during the inference assignment phase?",
    options: [
      "It deletes the cluster labels",
      "It computes the distance between each new observation and all cluster centroids, assigning the sample to the minimum distance centroid via `np.argmin()`",
      "It randomly picks a centroid without computing distances",
      "It calculates p-values for all clusters"
    ],
    correctAnswer: 1,
    explanation: "`np.argmin(cdist(new_samples, centroids), axis=1)` assigns each sample to its closest centroid."
  }
];

export default questions;
