const questions = [
  {
    question: "What is the formal definition of a mathematical metric (distance function)?",
    shortAnswer: "A function d(x, y) satisfying: 1) Non-negativity, 2) Identity of indiscernibles (d(x,y)=0 iff x=y), 3) Symmetry (d(x,y)=d(y,x)), and 4) Triangle Inequality (d(x,z) <= d(x,y) + d(y,z)).",
    explanation: "These four axioms define a formal metric space.",
    hint: "Non-negativity, identity, symmetry, triangle inequality.",
    level: "intermediate"
  },
  {
    question: "What is the formula for Minkowski Distance of order p between vectors x and y?",
    shortAnswer: "D(x, y) = (sum_{i=1}^d |x_i - y_i|^p)^(1/p)",
    explanation: "For p=1 it yields Manhattan distance; for p=2 it yields Euclidean distance; as p -> infinity it yields Chebyshev distance.",
    hint: "Generalized Lp norm formula.",
    level: "basic"
  },
  {
    question: "Why is Cosine Distance particularly suited for high-dimensional text and document clustering?",
    shortAnswer: "Because it measures the angle between word-frequency vectors rather than document length (magnitude).",
    explanation: "A short article and a long article on the same topic share similar word directions even though their Euclidean distance is large.",
    hint: "Directional angle invariant to document length.",
    level: "basic"
  },
  {
    question: "What is the Manhattan (City-Block / L1) distance between points (2, 5) and (6, 1)?",
    options: ["8", "5.65", "4", "16"],
    correctAnswer: 0,
    explanation: "|2 - 6| + |5 - 1| = 4 + 4 = 8.",
    level: "basic"
  },
  {
    question: "What is the Euclidean (L2) distance between points (0, 0) and (3, 4)?",
    options: ["5", "7", "25", "3.5"],
    correctAnswer: 0,
    explanation: "sqrt((3-0)^2 + (4-0)^2) = sqrt(9 + 16) = sqrt(25) = 5.",
    level: "basic"
  },
  {
    question: "What is Chebyshev distance (L_infinity norm)?",
    shortAnswer: "The maximum absolute coordinate difference between two points along any single dimension: max_i |x_i - y_i|.",
    explanation: "Represents the number of moves a King needs on a chessboard to travel between two squares.",
    hint: "Maximum coordinate difference (Chessboard distance).",
    level: "intermediate"
  },
  {
    question: "What is Jaccard Distance used for in clustering?",
    shortAnswer: "Measuring dissimilarity between binary sets or boolean attributes: 1 - (|A cap B| / |A cup B|).",
    explanation: "Commonly used in market basket analysis and user preference overlap.",
    hint: "1 - Jaccard Similarity.",
    level: "basic"
  },
  {
    question: "Why must continuous features be scaled (normalized/standardized) before applying distance-based clustering?",
    shortAnswer: "Features with large numerical ranges (e.g. Salary in ₹ Lakhs) will completely dominate features with small ranges (e.g. Age in years) in distance calculations.",
    explanation: "Without scaling, distance is disproportionately biased toward the largest scale attribute.",
    hint: "Prevents large-scale features from dominating distances.",
    level: "basic"
  },
  {
    question: "What is the Curse of Dimensionality in distance-based clustering?",
    shortAnswer: "In high-dimensional spaces, the ratio between the distance to the nearest point and the distance to the farthest point approaches 1 (distance concentration phenomenon).",
    explanation: "All points become equidistant, rendering distance metrics less discriminative.",
    hint: "Distance concentration in high dimensions.",
    level: "advanced"
  },
  {
    question: "What is Mahalanobis Distance and how does it differ from Euclidean distance?",
    shortAnswer: "It measures distance scaled by the covariance matrix of the dataset, accounting for feature correlations and variance.",
    explanation: "D_M(x, y) = sqrt((x - y)^T * Sigma^{-1} * (x - y)).",
    hint: "Covariance-weighted distance.",
    level: "advanced"
  },
  {
    question: "What is Levenshtein (Edit) Distance in string and sequence clustering?",
    shortAnswer: "The minimum number of single-character edits (insertions, deletions, substitutions) required to transform one string into another.",
    explanation: "Used in bio-informatics (DNA alignment) and spell checking.",
    hint: "Edit distance for strings.",
    level: "intermediate"
  },
  {
    question: "What is the dimensions of a pairwise distance matrix for a dataset of 1,000 observations?",
    options: ["1000 x 1000", "1000 x 2", "500 x 500", "1000 x d"],
    correctAnswer: 0,
    explanation: "Pairwise matrix computes distances between all N items, resulting in an N x N (1000 x 1000) square matrix.",
    level: "basic"
  },
  {
    question: "Why is a pairwise distance matrix always symmetric along its main diagonal?",
    shortAnswer: "Because distance functions satisfy symmetry: d(x_i, x_j) = d(x_j, x_i).",
    explanation: "The distance from point A to point B equals the distance from B to A.",
    hint: "Metric symmetry axiom.",
    level: "basic"
  },
  {
    question: "What are all the values along the main diagonal of a pairwise distance matrix?",
    shortAnswer: "All zeros (0.0), because the distance from any point to itself is always zero (d(x_i, x_i) = 0).",
    explanation: "Identity of indiscernibles requires d(x, x) = 0.",
    hint: "Diagonal elements are all 0.",
    level: "basic"
  },
  {
    question: "Can K-Medoids work directly on an arbitrary N x N dissimilarity matrix even if no coordinate features exist?",
    shortAnswer: "Yes! K-Medoids only needs pairwise distances to evaluate medoid candidate total costs.",
    explanation: "This enables clustering graph nodes, customer relationship matrices, and psychometric surveys.",
    hint: "K-Medoids requires only pairwise distances.",
    level: "intermediate"
  },
  {
    question: "What is Canberra Distance and where is it used?",
    shortAnswer: "A weighted version of Manhattan distance sensitive to values near zero: sum (|x_i - y_i| / (|x_i| + |y_i|)).",
    explanation: "Commonly used in information retrieval and bioinformatics.",
    hint: "Relative difference metric sensitive to small numbers.",
    level: "advanced"
  },
  {
    question: "What happens if you use Cosine Distance on raw unnormalized word counts vs normalized TF-IDF vectors?",
    shortAnswer: "Cosine distance automatically normalizes vector lengths, so raw count vectors yield the same directional similarity as normalized vectors.",
    explanation: "Cosine formula divides by the vector norms in its denominator.",
    hint: "Scale-invariant angular distance.",
    level: "intermediate"
  },
  {
    question: "What is Hamming Distance?",
    shortAnswer: "The number of positions at which two equal-length strings or binary vectors have different symbols/bits.",
    explanation: "Used for categorical attributes and error-correcting codes.",
    hint: "Count of differing bit positions.",
    level: "basic"
  },
  {
    question: "How does Gower's Distance handle mixed datasets with both numerical and categorical attributes?",
    shortAnswer: "It computes normalized range differences for numerical features and matching indicators for categorical features, combining them into a single 0-to-1 similarity index.",
    explanation: "Standard solution for clustering real-world mixed-type tabular databases.",
    hint: "Mixed-type attribute distance metric.",
    level: "advanced"
  },
  {
    question: "Why does Manhattan distance create diamond-shaped equidistant contours in 2D space while Euclidean creates circular contours?",
    shortAnswer: "Because |x| + |y| = c forms a rotated square (diamond), whereas x^2 + y^2 = r^2 forms a circle.",
    explanation: "Illustrates the geometric difference between L1 and L2 unit balls.",
    hint: "Diamond contour vs. circle contour.",
    level: "intermediate"
  },
  {
    question: "What is the Python SciPy module used to compute pairwise distance matrices efficiently?",
    shortAnswer: "`scipy.spatial.distance.pdist` and `scipy.spatial.distance.cdist`.",
    explanation: "Provides highly optimized C-implemented distance routines.",
    hint: "scipy.spatial.distance.",
    level: "basic",
    codeExample: "from scipy.spatial.distance import cdist\ndist_matrix = cdist(X, X, metric='cityblock')"
  },
  {
    question: "How does Correlation Distance relate to Pearson Correlation r?",
    shortAnswer: "Correlation Distance = 1 - r (ranging from 0 for perfectly correlated to 2 for perfectly anti-correlated).",
    explanation: "Used when tracking synchronized trend patterns across time series.",
    hint: "1 - Pearson r.",
    level: "intermediate"
  },
  {
    question: "What is the primary risk of using Euclidean distance on sparse high-dimensional data (e.g. 10,000 TF-IDF features)?",
    shortAnswer: "High sparsity causes all document pairs to share zero for most features, making Euclidean distance dominated by vector lengths rather than shared words.",
    explanation: "Cosine distance is preferred for high-dimensional sparse representations.",
    hint: "Sparsity bias in Euclidean distance.",
    level: "advanced"
  },
  {
    question: "What distance metric should be chosen when clustering physical delivery addresses in a city grid network like Kolkata or Barrackpore?",
    shortAnswer: "Manhattan Distance (L1), because vehicles must travel along orthogonal streets and avenues rather than flying through buildings.",
    explanation: "City-block distance reflects physical street navigation.",
    hint: "Manhattan / City-block distance for street grids.",
    level: "basic"
  },
  {
    question: "What is the ultimate rule for distance metric selection in machine learning?",
    shortAnswer: "The distance metric must match the natural geometry and domain semantics of the data-generating process.",
    explanation: "Using the wrong distance metric renders even the most advanced clustering algorithms ineffective.",
    hint: "Match metric to domain semantics.",
    level: "basic"
  }
];

export default questions;
