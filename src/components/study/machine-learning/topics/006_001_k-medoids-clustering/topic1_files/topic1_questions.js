const questions = [
  {
    question: "What is the key structural difference between a Centroid and a Medoid?",
    shortAnswer: "A Centroid is a virtual mathematical average vector, whereas a Medoid is an actual data point from the original dataset.",
    explanation: "Centroids are calculated using mean formulas, while medoids are selected directly from dataset instances.",
    hint: "Virtual average vs. real observed data instance.",
    level: "basic"
  },
  {
    question: "Why does an extreme outlier distort a Centroid much more than a Medoid?",
    shortAnswer: "Centroids minimize squared Euclidean distances (L2^2), which amplifies outlier effects quadratically. Medoids minimize absolute distances (L1), behaving like robust medians.",
    explanation: "Squaring errors gives disproportionate pulling weight to distant outliers.",
    hint: "Squared error vs. absolute distance.",
    level: "intermediate"
  },
  {
    question: "Can a centroid be computed for categorical or graph data without embedding?",
    shortAnswer: "No, arithmetic mean cannot be calculated for categorical labels (e.g. mean of 'Red' and 'Blue').",
    explanation: "Medoids can be found on any domain where pairwise distances can be measured.",
    hint: "Centroids require continuous numeric vectors.",
    level: "basic"
  },
  {
    question: "What is the mathematical equation for finding the centroid of a cluster C?",
    shortAnswer: "mu = (1 / |C|) * sum_{x in C} x",
    explanation: "Computes the component-wise average of all coordinate vectors in the cluster.",
    hint: "Sum of vectors divided by count.",
    level: "basic"
  },
  {
    question: "What is the mathematical equation for identifying the medoid m of a cluster C?",
    shortAnswer: "m = argmin_{y in C} sum_{x in C} D(x, y)",
    explanation: "Selects the specific point y in C that yields the smallest total distance to all other members x in C.",
    hint: "Argmin of total intra-cluster distance.",
    level: "intermediate"
  },
  {
    question: "How does the computational cost of updating a Centroid compare to finding a Medoid in a cluster with n_k points?",
    shortAnswer: "Centroid update is O(n_k * d) (fast linear sum), while finding a Medoid is O(n_k^2 * d) (all-pairs distance comparison).",
    explanation: "Medoids require evaluating all pairwise distances within the cluster.",
    hint: "O(n) linear mean vs O(n^2) quadratic search.",
    level: "intermediate"
  },
  {
    question: "In text clustering (NLP), why are medoids preferred over centroids for document summarization?",
    shortAnswer: "A medoid represents an actual, readable document from the corpus, whereas a centroid TF-IDF vector is a synthetic blend of mixed vocabulary that corresponds to no readable text.",
    explanation: "A real document medoid can be presented directly to human users as the cluster summary.",
    hint: "Exemplar document interpretability.",
    level: "basic"
  },
  {
    question: "What happens if a cluster contains two equidistant candidate points with identical minimum total dissimilarity?",
    shortAnswer: "Either point can be chosen arbitrarily as the medoid without affecting the minimum total cost value.",
    explanation: "Ties are broken systematically (e.g. by lowest index or first encountered).",
    hint: "Arbitrary tie-breaking.",
    level: "intermediate"
  },
  {
    question: "Why can't K-Means centroids be used directly on road-network shortest-path distance matrices?",
    shortAnswer: "Because Euclidean coordinates do not reflect road obstacles (rivers, one-way streets, bridges), and averaging GPS coordinates might place a depot on a lake.",
    explanation: "K-Medoids works directly on road graph distance matrices, picking an actual street intersection.",
    hint: "Road network graph distances vs Euclidean space.",
    level: "advanced"
  },
  {
    question: "What is the 1D statistical analogue of Centroid vs Medoid?",
    shortAnswer: "Mean vs Median.",
    explanation: "Centroid is multidimensional Mean; Medoid is multidimensional Median constrained to data points.",
    hint: "Mean vs Median in multi-dimensions.",
    level: "basic"
  },
  {
    question: "Is the Medoid of a cluster always located at the geometric center of the bounding box?",
    shortAnswer: "No, the medoid is located at the highest density concentration of points that minimizes pairwise distances.",
    explanation: "In skewed clusters, the medoid aligns with the dense core, not the geometric midpoint.",
    hint: "Density center, not bounding box midpoint.",
    level: "intermediate"
  },
  {
    question: "Which algorithm uses centroids: K-Means or K-Medoids?",
    options: ["K-Means", "K-Medoids", "Both", "Neither"],
    correctAnswer: 0,
    explanation: "K-Means uses centroids (means); K-Medoids uses medoids (exemplars)."
  },
  {
    question: "Which algorithm uses medoids: K-Means or K-Medoids?",
    options: ["K-Medoids", "K-Means", "Both", "Neither"],
    correctAnswer: 0,
    explanation: "K-Medoids uses medoids."
  },
  {
    question: "Can a centroid accidentally equal an existing data point in a dataset?",
    shortAnswer: "Yes, by coincidence, but it is not constrained to be one.",
    explanation: "In K-Medoids, it is strictly constrained to be an element of the input set.",
    hint: "Centroids may coincide by chance, but Medoids are guaranteed.",
    level: "basic"
  },
  {
    question: "How do missing values affect centroid calculation vs medoid identification?",
    shortAnswer: "Centroids cannot be computed if components are NaN. Medoids can use pairwise distance metrics that tolerate missing pairwise attributes.",
    explanation: "Pairwise distance formulas can ignore missing dimensions pairwise.",
    hint: "Pairwise missing attribute handling.",
    level: "advanced"
  },
  {
    question: "In image segmentation, what does a medoid pixel represent compared to a centroid RGB color?",
    shortAnswer: "The medoid is an actual sampled RGB color from the original photograph, preserving true natural palette tones.",
    explanation: "Centroid colors may blend disparate colors into unnatural muddy gray averages.",
    hint: "Natural sampled palette tone.",
    level: "intermediate"
  },
  {
    question: "If all points in a cluster lie on the circumference of a circle, where is the centroid vs the medoid?",
    shortAnswer: "The centroid lies at the hollow center of the circle (where no data exists); the medoid lies on the circumference (where actual data points reside).",
    explanation: "Centroids can fall into empty feature space, while medoids must be on the support data.",
    hint: "Hollow center vs circumference data point.",
    level: "advanced"
  },
  {
    question: "What is the Geometric Median in continuous space vs the Medoid?",
    shortAnswer: "Geometric median is any continuous point in R^d minimizing sum of distances; Medoid restricts this point to the discrete sample set.",
    explanation: "Medoid is the sample-constrained version of geometric median.",
    hint: "Continuous vs sample-constrained.",
    level: "advanced"
  },
  {
    question: "Why is Centroid calculation much easier to parallelize on GPUs using matrix operations?",
    shortAnswer: "Computing a vector mean is a simple reduction sum operation that scales linearly and trivially on SIMD hardware.",
    explanation: "Medoid search requires evaluating all pairwise distance combinations, requiring more memory bandwidth.",
    hint: "Vector reduction sum vs all-pairs distance matrix.",
    level: "advanced"
  },
  {
    question: "Can K-Medoids medoids be inspected directly as pandas DataFrame rows?",
    shortAnswer: "Yes, `df.iloc[kmedoids.medoid_indices_]` extracts the exact original records.",
    explanation: "Provides 100% transparent interpretability for business analysts.",
    hint: "Direct DataFrame row extraction.",
    level: "basic",
    codeExample: "exemplar_rows = df.iloc[kmed.medoid_indices_]"
  },
  {
    question: "What happens when you add a single outlier with value 1,000,000 to a cluster of points near 10?",
    shortAnswer: "The centroid jumps dramatically toward 1,000,000; the medoid stays firmly in the cluster near 10.",
    explanation: "Demonstrates the extreme outlier breakdown point difference.",
    hint: "Centroid jumps; medoid stays stable.",
    level: "basic"
  },
  {
    question: "What metric is minimized when calculating a 1D centroid vs 1D medoid?",
    shortAnswer: "Centroid minimizes sum of squared deviations; Medoid minimizes sum of absolute deviations.",
    explanation: "Corresponds directly to L2 vs L1 loss optimization.",
    hint: "L2 squared loss vs L1 absolute loss.",
    level: "intermediate"
  },
  {
    question: "Why is a Medoid guaranteed to satisfy domain constraints (e.g. integer counts or binary flags)?",
    shortAnswer: "Because it was generated by the true underlying data-generating process and is an observed instance from the dataset.",
    explanation: "Centroids can have impossible values like 2.4 children or 0.7 gender status.",
    hint: "Domain constraints preserved automatically.",
    level: "basic"
  },
  {
    question: "In DNA / Protein sequence clustering, why are centroids completely invalid?",
    shortAnswer: "You cannot average strings of nucleotide sequences ('ATCG') into an arithmetic mean; medoids use edit distances (Levenshtein) directly.",
    explanation: "Biological sequences lack vector spaces but have well-defined edit distances.",
    hint: "String edit distances without vector spaces.",
    level: "intermediate"
  },
  {
    question: "What is the bottom-line rule for choosing between Centroids and Medoids?",
    shortAnswer: "Choose Centroids when speed and continuous Euclidean metrics matter; choose Medoids when interpretability, outlier resistance, and non-Euclidean data are paramount.",
    explanation: "Balances computational efficiency against robustness and validity.",
    hint: "Speed vs. Robustness & Domain Validity.",
    level: "basic"
  }
];

export default questions;
