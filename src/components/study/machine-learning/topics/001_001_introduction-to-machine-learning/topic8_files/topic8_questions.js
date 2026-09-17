/**
 * Topic 8: Clustering Overview
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is the primary definition and goal of Clustering in machine learning?",
    "shortAnswer": "An unsupervised technique that partitions unlabeled data points into groups (clusters) such that intra-cluster similarity is maximized and inter-cluster similarity is minimized.",
    "explanation": "Clustering organizes data instances without pre-existing target labels. Points within the same cluster share high geometric or probabilistic affinity, while points in different clusters are distinctly separated according to a distance metric.",
    "hint": "High internal cohesion and high external separation of unlabeled instances.",
    "level": "Basic",
    "codeExample": "from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3).fit(X)"
  },
  {
    "id": 2,
    "question": "What are the four major taxonomic paradigms of Clustering algorithms?",
    "shortAnswer": "Partitioning (e.g. K-Means, K-Medoids), Hierarchical (Agglomerative, Divisive), Density-Based (DBSCAN, OPTICS), and Model-Based / Distributional (GMM).",
    "explanation": "Partitioning divides data into non-overlapping subsets. Hierarchical constructs a nested tree hierarchy. Density-based discovers clusters of arbitrary shape separated by sparse regions. Model-based fits statistical mixture distributions to data.",
    "hint": "Centroid partitions, hierarchical dendrograms, density regions, and statistical distributions.",
    "level": "Moderate",
    "codeExample": "# 4 paradigms: KMeans (centroid), Agglomerative (tree), DBSCAN (density), GaussianMixture (distribution)"
  },
  {
    "id": 3,
    "question": "How does K-Medoids (PAM - Partitioning Around Medoids) differ from standard K-Means?",
    "shortAnswer": "K-Medoids uses actual dataset data points as cluster centers (medoids) instead of virtual calculated arithmetic means, making it robust to outliers.",
    "explanation": "K-Means computes the mean vector \u03bc_k, which can be heavily pulled by extreme outliers. K-Medoids chooses an existing exemplar point m_k that minimizes the sum of pairwise dissimilarities \u2211 d(x_i, m_k), accommodating arbitrary non-Euclidean distance metrics (e.g. Manhattan, cosine).",
    "hint": "Cluster center is an actual data point rather than a virtual mathematical average.",
    "level": "Moderate",
    "codeExample": "# K-Medoids: Minimizes sum of L1/arbitrary distances to actual data points"
  },
  {
    "id": 4,
    "question": "What are the common Linkage criteria used in Agglomerative Hierarchical Clustering?",
    "shortAnswer": "Ward Linkage (minimizes variance increase), Complete Linkage (maximum distance), Single Linkage (minimum distance), and Average Linkage (mean distance).",
    "explanation": "Ward's linkage merges clusters that result in the smallest increase in total within-cluster sum of squares. Complete linkage ensures all points in a merged cluster are within a maximum diameter threshold. Single linkage can produce elongated 'chaining' artifacts.",
    "hint": "Mathematical rules determining distance between two sets of points during merging.",
    "level": "Moderate",
    "codeExample": "from sklearn.cluster import AgglomerativeClustering\nclusterer = AgglomerativeClustering(n_clusters=4, linkage='ward')"
  },
  {
    "id": 5,
    "question": "What are the two foundational hyperparameters of DBSCAN and what do they control?",
    "shortAnswer": "Eps (\u03b5 - neighborhood radius) and MinPts (minimum number of points within \u03b5-radius required to form a core dense region).",
    "explanation": "Eps defines the local spatial search distance. MinPts determines the minimum density threshold. If a point has \u2265 MinPts within distance Eps, it becomes a Core Point; otherwise it is tested as a Border Point or flagged as Noise.",
    "hint": "Radius of neighborhood ball and minimum point count threshold.",
    "level": "Basic",
    "codeExample": "from sklearn.cluster import DBSCAN\ndb = DBSCAN(eps=0.3, min_samples=10).fit(X)"
  },
  {
    "id": 6,
    "question": "What is the HDBSCAN algorithm and how does it improve upon standard DBSCAN?",
    "shortAnswer": "Hierarchical DBSCAN; it extracts flat clusters of varying densities across a cluster hierarchy without requiring a fixed global Eps parameter.",
    "explanation": "Standard DBSCAN struggles when a dataset contains both dense and sparse clusters because a single global Eps cannot fit both. HDBSCAN performs DBSCAN over all possible \u03b5 values, constructs a cluster tree, and extracts the most stable clusters based on persistence.",
    "hint": "Handles varying cluster densities automatically via hierarchical density persistence.",
    "level": "Expert",
    "codeExample": "# HDBSCAN handles variable density clusters seamlessly\n# import hdbscan\n# clusterer = hdbscan.HDBSCAN(min_cluster_size=15).fit(X)"
  },
  {
    "id": 7,
    "question": "What is the Adjusted Rand Index (ARI) in clustering evaluation?",
    "shortAnswer": "An external evaluation metric that measures the similarity between clustering assignments and true ground truth labels, adjusted for chance.",
    "explanation": "ARI evaluates all pairs of samples: pairs in the same cluster vs pairs in different clusters. It ranges from -1 to +1, where +1 indicates perfect clustering match, 0 indicates random chance cluster assignments, and negative scores indicate independence.",
    "hint": "External validation against ground truth labels adjusted for chance agreement.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import adjusted_rand_score\nari = adjusted_rand_score(labels_true, labels_pred)"
  },
  {
    "id": 8,
    "question": "What is Normalized Mutual Information (NMI) in clustering validation?",
    "shortAnswer": "An external metric measuring the mutual information shared between predicted clusters and true class partitions, normalized between 0 and 1.",
    "explanation": "NMI = 2 * I(Y; C) / [H(Y) + H(C)], where I(Y; C) is mutual information and H is Shannon entropy. NMI equals 1.0 if cluster assignments perfectly reconstruct the true classes, invariant to cluster label permutations.",
    "hint": "Information-theoretic similarity metric between true classes and predicted clusters.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import normalized_mutual_info_score\nnmi = normalized_mutual_info_score(labels_true, labels_pred)"
  },
  {
    "id": 9,
    "question": "What is the difference between Internal and External Clustering Validation Metrics?",
    "shortAnswer": "Internal metrics use only feature geometry without ground truth (e.g. Silhouette, Davies-Bouldin); External metrics require true class labels (e.g. ARI, NMI).",
    "explanation": "In genuine unsupervised production settings where ground truth is completely unavailable, practitioners must rely exclusively on internal metrics (measuring compactness and separation). External metrics are used in research benchmarking when labels are known.",
    "hint": "Feature geometry metrics vs benchmarking against known target labels.",
    "level": "Basic",
    "codeExample": "# Internal (No true labels): silhouette_score(X, labels)\n# External (Requires true labels): adjusted_rand_score(y_true, labels)"
  },
  {
    "id": 10,
    "question": "What is OPTICS (Ordering Points To Identify the Clustering Structure)?",
    "shortAnswer": "A density-based algorithm that creates an ordered reachability plot to visualize clusters of varying densities along a 1D profile.",
    "explanation": "OPTICS extends DBSCAN by storing the Core Distance and Reachability Distance for each point. Graphing reachability distances yields a valley plot where deep 'valleys' correspond to dense clusters and peaks represent noise or cluster dividers.",
    "hint": "Reachability plot whose valleys represent clusters of varying spatial density.",
    "level": "Expert",
    "codeExample": "from sklearn.cluster import OPTICS\noptics = OPTICS(min_samples=10).fit(X)\n# Reachability distances: optics.reachability_"
  },
  {
    "id": 11,
    "question": "Why is Euclidean Distance often suboptimal for high-dimensional text document clustering?",
    "shortAnswer": "High-dimensional sparse TF-IDF vectors are distorted by document length differences; Cosine Distance measures angular topic orientation independently of length.",
    "explanation": "A short article and a long book on the same topic have similar word frequency proportions but radically different vector Euclidean lengths. Cosine similarity cos(\u03b8) = (u \u00b7 v) / (||u|| ||v||) measures directional alignment, ignoring document length.",
    "hint": "Angular orientation vs Euclidean magnitude distortion in sparse TF-IDF spaces.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics.pairwise import cosine_distances\ncos_dist = cosine_distances(tfidf_matrix)"
  },
  {
    "id": 12,
    "question": "What is Mean Shift Clustering and how does it find cluster modes?",
    "shortAnswer": "A non-parametric centroid-seeking algorithm that shifts candidate center points toward regions of highest data density using a kernel density gradient.",
    "explanation": "Mean Shift places a kernel window (bandwidth h) over each point and iteratively shifts the window toward the local mean (density mode) until convergence. Points that converge to the same mode are assigned to the same cluster, automatically determining K.",
    "hint": "Iterative hill-climbing toward local density peaks via kernel gradients.",
    "level": "Expert",
    "codeExample": "from sklearn.cluster import MeanShift\nms = MeanShift(bandwidth=1.5).fit(X)\ncluster_centers = ms.cluster_centers_"
  },
  {
    "id": 13,
    "question": "What is Affinity Propagation and how do data points exchange messages to choose exemplars?",
    "shortAnswer": "Points exchange Responsibility r(i, k) and Availability a(i, k) messages along a similarity network until high-affinity exemplars emerge.",
    "explanation": "Affinity Propagation does not require K upfront. Responsibility r(i, k) quantifies how well-suited point k is to serve as exemplar for point i. Availability a(i, k) reflects how appropriate it is for point i to choose k as its exemplar based on feedback from other points.",
    "hint": "Message-passing network communicating Responsibility and Availability between instances.",
    "level": "Expert",
    "codeExample": "from sklearn.cluster import AffinityPropagation\naff_prop = AffinityPropagation(damping=0.8).fit(X)"
  },
  {
    "id": 14,
    "question": "What is BIRCH (Balanced Iterative Reducing and Clustering using Hierarchies)?",
    "shortAnswer": "An online memory-efficient clustering algorithm for massive streaming datasets that builds a compact Clustering Feature (CF) Tree in a single pass.",
    "explanation": "BIRCH summarizes large sub-clusters into compact CF tuples (N, LS, SS) where N is number of points, LS is linear sum of points, and SS is square sum of points. This allows incremental O(N) clustering of millions of records within limited RAM.",
    "hint": "CF-Tree summary representation for massive, streaming, out-of-core datasets.",
    "level": "Expert",
    "codeExample": "from sklearn.cluster import Birch\nbirch = Birch(threshold=0.5, n_clusters=5).fit(X)"
  },
  {
    "id": 15,
    "question": "What is Fuzzy C-Means (FCM) clustering and what is its fuzzifier exponent m?",
    "shortAnswer": "A soft clustering algorithm where points belong to all clusters with fractional degrees; m > 1 controls the degree of cluster fuzziness/overlap.",
    "explanation": "FCM minimizes J_m = \u2211_{i=1}^N \u2211_{k=1}^K u_{ik}^m ||x_i - c_k||^2 where u_{ik} is membership degree. When m = 1, FCM degenerates to standard hard K-Means. When m > 1 (typically m = 2), points near cluster borders have gradual, soft membership transitions.",
    "hint": "Degree of membership sharing controlled by fuzzification parameter m.",
    "level": "Moderate",
    "codeExample": "# FCM membership condition: sum(u_ik for k=1..K) == 1.0 for every sample i"
  },
  {
    "id": 16,
    "question": "How does Feature Scaling impact K-Means clustering outcomes?",
    "shortAnswer": "Unscaled features with large numerical ranges completely dominate Euclidean distance calculations, rendering other features irrelevant.",
    "explanation": "If customer Age ranges from 18-70 (range 52) and Annual Spend ranges from 1,000-500,000 (range 499,000), distance is 99.99% determined by spend. Standardizing features to mean=0 and variance=1 (StandardScaler) ensures all attributes contribute equally.",
    "hint": "Equalizing variance across all feature columns before computing Euclidean distances.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(X)\nkmeans.fit(X_scaled)"
  },
  {
    "id": 17,
    "question": "What is the Dunn Index in cluster quality evaluation?",
    "shortAnswer": "The ratio of the smallest inter-cluster distance to the largest intra-cluster diameter; higher Dunn Index indicates superior clustering.",
    "explanation": "Dunn = min_{1\u2264i<j\u2264K} d(C_i, C_j) / max_{1\u2264k\u2264K} diam(C_k). It rewards widely separated clusters that are internally compact. However, it is computationally expensive O(N^2) and sensitive to isolated outliers.",
    "hint": "Smallest gap between different clusters divided by largest internal cluster diameter.",
    "level": "Moderate",
    "codeExample": "# Dunn Index = min(Inter-cluster distance) / max(Cluster diameter)"
  },
  {
    "id": 18,
    "question": "Why can K-Means converge to different cluster solutions on different runs?",
    "shortAnswer": "K-Means is a greedy algorithm sensitive to initial centroid placement, converging to different local minima of the non-convex WCSS objective.",
    "explanation": "The K-Means loss function is non-convex. Different random initial centroid seeds lead the algorithm down different gradient trajectories. Running K-Means with `n_init=10` or `n_init=20` executes multiple independent initializations and retains the run with lowest inertia.",
    "hint": "Sensitivity to initial random seeds requires multiple independent restarts (n_init).",
    "level": "Basic",
    "codeExample": "kmeans = KMeans(n_clusters=4, n_init=20, random_state=42)"
  },
  {
    "id": 19,
    "question": "What is Spectral Bisection in Graph-Based Clustering?",
    "shortAnswer": "Partitioning a graph into two clusters based on the sign (+ / -) of the elements in the Fiedler Vector (2nd smallest eigenvector of Graph Laplacian L).",
    "explanation": "The smallest eigenvalue of unnormalized Laplacian L is always \u03bb_1 = 0 (with constant eigenvector). The second smallest eigenvalue \u03bb_2 (algebraic connectivity) and its eigenvector (Fiedler vector) provide the optimal continuous relaxation of the graph Minimum Cut problem.",
    "hint": "Fiedler vector sign partitioning solves the relaxed normalized graph cut problem.",
    "level": "Expert",
    "codeExample": "# Fiedler vector partition: cluster_A = (fiedler_vec > 0); cluster_B = (fiedler_vec <= 0)"
  },
  {
    "id": 20,
    "question": "How can Categorical Features be clustered using the K-Modes algorithm?",
    "shortAnswer": "K-Modes replaces Euclidean distance with simple matching dissimilarity and replaces cluster arithmetic means with categorical modes.",
    "explanation": "Because computing arithmetic averages on categorical strings (e.g. 'Red', 'Blue') is meaningless, K-Modes defines dissimilarity as the number of mismatched attributes: d(x, y) = \u2211 I(x_j \u2260 y_j). The cluster center is updated to the most frequent categorical mode per feature.",
    "hint": "Categorical matching dissimilarity and frequency mode centers.",
    "level": "Moderate",
    "codeExample": "# K-Modes: Used for pure categorical survey/demographic customer clustering"
  },
  {
    "id": 21,
    "question": "What is K-Prototypes clustering?",
    "shortAnswer": "An algorithm that unifies K-Means and K-Modes to cluster mixed datasets containing both numerical and categorical features.",
    "explanation": "K-Prototypes optimizes a combined dissimilarity function: d(x, c) = d_Euclidean(x_num, c_num)^2 + \u03b3 * d_Matching(x_cat, c_cat). The parameter \u03b3 balances the relative weight between numerical Euclidean distances and categorical mismatch penalties.",
    "hint": "Harmonizes Euclidean distance for continuous columns and mode matching for categorical columns.",
    "level": "Moderate",
    "codeExample": "# Mixed data clustering: Distance = Num_Euclidean^2 + gamma * Cat_Mismatches"
  },
  {
    "id": 22,
    "question": "What is Biclustering (Co-Clustering) in tabular data analysis?",
    "shortAnswer": "Simultaneously clustering both rows (samples) and columns (features) to discover localized sub-matrix patterns (e.g. gene expression profiles).",
    "explanation": "Traditional clustering groups either rows or columns globally. Biclustering identifies subsets of rows that exhibit consistent, correlated behavior across only a specific subset of columns (e.g. patients who over-express a specific subset of 10 genes).",
    "hint": "Simultaneous row and column sub-matrix grouping in bioinformatics and text analysis.",
    "level": "Expert",
    "codeExample": "from sklearn.cluster import SpectralCoclustering\ncocluster = SpectralCoclustering(n_clusters=3, random_state=42).fit(X)"
  },
  {
    "id": 23,
    "question": "What is Consensus Clustering (Ensemble Clustering)?",
    "shortAnswer": "Combining multiple distinct clustering runs or different algorithms into a unified, more stable co-association matrix.",
    "explanation": "Individual clustering algorithms can be noisy or sensitive to hyperparameters. Consensus clustering aggregates multiple clustering partitions (from different random seeds, subsets, or algorithms) into an N x N co-occurrence matrix, applying final agglomeration on the consensus matrix.",
    "hint": "Aggregating multiple clustering iterations to maximize cluster stability and robustness.",
    "level": "Expert",
    "codeExample": "# Consensus matrix entry C_ij = frequency that sample i and sample j share a cluster"
  },
  {
    "id": 24,
    "question": "What is the Cophenetic Correlation Coefficient in hierarchical clustering?",
    "shortAnswer": "A measure of how faithfully a dendrogram preserves the original pairwise Euclidean distances between data points.",
    "explanation": "It computes the linear correlation between the original pairwise distances and the cophenetic distances (the vertical height in the dendrogram where two points first merge). A value closer to 1.0 indicates high structural fidelity of the hierarchical tree.",
    "hint": "Correlation between original distance matrix and dendrogram merge heights.",
    "level": "Expert",
    "codeExample": "from scipy.cluster.hierarchy import cophenet, linkage\nfrom scipy.spatial.distance import pdist\nZ = linkage(X, 'ward')\nc, coph_dists = cophenet(Z, pdist(X))"
  },
  {
    "id": 25,
    "question": "How can Clustering be applied for Image Compression and Color Quantization?",
    "shortAnswer": "By clustering all 24-bit RGB pixel colors into K centroids (e.g. K=16) and replacing every pixel with its nearest centroid color.",
    "explanation": "A standard image has up to 16.7 million possible RGB colors (3 bytes per pixel). Running K-Means with K=16 clusters the color space into 16 representative palette colors. The compressed file stores only a 16-color lookup table and 4-bit index pointers per pixel.",
    "hint": "Replacing millions of pixel colors with K representative cluster palette centroids.",
    "level": "Basic",
    "codeExample": "# Color quantization: kmeans = KMeans(n_clusters=16).fit(pixel_array)\n# compressed_img = kmeans.cluster_centers_[kmeans.labels_]"
  },
  {
    "id": 26,
    "question": "What is the Gap Statistic method for choosing the optimal number of clusters K?",
    "shortAnswer": "It compares total within-cluster variation W_k with its expected value under an appropriate null reference distribution generated via Monte Carlo simulation.",
    "explanation": "Gap(k) = E*_n{log(W_k)} - log(W_k). The optimal K is the smallest k such that Gap(k) \u2265 Gap(k+1) - s_{k+1}, identifying where the clustering of the real data significantly outperforms clustering on uniformly random noise.",
    "hint": "Statistical comparison of cluster dispersion against a uniform random baseline.",
    "level": "Expert",
    "codeExample": "# Gap(K) = Expected_Log_Inertia(Uniform_Random) - Observed_Log_Inertia(Real_Data)"
  },
  {
    "id": 27,
    "question": "Why is customer segmentation using K-Means often preceded by RFM (Recency, Frequency, Monetary) feature extraction?",
    "shortAnswer": "Raw transaction logs are continuous timestamp streams; RFM aggregates each customer into 3 standardized behavioral dimensions ideal for spatial clustering.",
    "explanation": "K-Means requires fixed-dimension numerical vectors. RFM extracts: Recency (days since last purchase), Frequency (total orders in past year), and Monetary Value (total revenue generated). Log-transforming and scaling RFM features yields distinct, actionable business segments.",
    "hint": "Transforming transactional records into standardized 3D behavioral feature vectors.",
    "level": "Basic",
    "codeExample": "# RFM aggregation: df.groupby('customer_id').agg({'date': 'max', 'order_id': 'count', 'amount': 'sum'})"
  },
  {
    "id": 28,
    "question": "What is the Purity metric in external clustering validation?",
    "shortAnswer": "The percentage of total data points that are correctly assigned to the majority class within their respective clusters: (1/N) \u2211_k max_j |C_k \u2229 L_j|.",
    "explanation": "Each cluster is assigned to the class which is most frequent in the cluster. Purity ranges from 0 to 1 (1.0 = perfect purity). However, purity trivially equals 1.0 if K = N (every point in its own cluster), so it cannot be used to evaluate different values of K.",
    "hint": "Proportion of points matching the majority ground-truth label in each cluster.",
    "level": "Moderate",
    "codeExample": "def cluster_purity(y_true, y_pred):\n    cm = confusion_matrix(y_true, y_pred)\n    return np.sum(np.amax(cm, axis=0)) / np.sum(cm)"
  },
  {
    "id": 29,
    "question": "How can Semi-Supervised Must-Link and Cannot-Link constraints be integrated into K-Means (COP-KMeans)?",
    "shortAnswer": "During the assignment step, an instance is assigned to the nearest centroid only if the assignment does not violate any Must-Link or Cannot-Link rule.",
    "explanation": "If assigning point x_i to cluster C_k causes a Must-Link partner to be in a different cluster, or a Cannot-Link partner to be in the same cluster, C_k is rejected and the next closest valid centroid is chosen. If no valid centroid exists, the algorithm fails.",
    "hint": "Constrained assignment step verifying pairwise constraints before binding to a centroid.",
    "level": "Expert",
    "codeExample": "# COP-KMeans: Rejects nearest centroid if pairwise constraints are violated"
  },
  {
    "id": 30,
    "question": "What is the primary role of Clustering in Exploratory Data Analysis (EDA)?",
    "shortAnswer": "Uncovering natural customer archetypes, discovering hidden data anomalies, and revealing latent multi-modal distributions in unlabelled datasets.",
    "explanation": "Before developing complex predictive models, clustering helps data scientists understand data heterogeneity, identify distinct sub-populations (e.g. high-risk vs low-risk patient groups), detect outlier corruptions, and engineer powerful categorical segment features.",
    "hint": "Revealing natural groupings and data heterogeneity prior to supervised modeling.",
    "level": "Basic",
    "codeExample": "# Clustering as Feature Engineering: X['cluster_id'] = kmeans.predict(X)"
  }
];

export default questions;
