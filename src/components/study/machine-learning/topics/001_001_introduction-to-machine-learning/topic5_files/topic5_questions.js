/**
 * Topic 5: Unsupervised Learning
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is the fundamental objective of Unsupervised Learning?",
    "shortAnswer": "To discover latent patterns, intrinsic geometric structures, cluster groupings, or probability density distributions in unlabeled data D = {x_1, x_2, ..., x_N}.",
    "explanation": "In unsupervised learning, there is no supervisor or ground-truth target vector y provided during training. The algorithm must autonomously uncover underlying structures, groupings, correlations, or low-dimensional manifolds directly from the feature representations x_i.",
    "hint": "Discovering hidden structure without target labels.",
    "level": "Basic",
    "codeExample": "# Unsupervised learning on unlabeled feature matrix X\nfrom sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3).fit(X_unlabeled)"
  },
  {
    "id": 2,
    "question": "What are the four primary application domains of Unsupervised Learning?",
    "shortAnswer": "Clustering, Dimensionality Reduction, Density Estimation, and Anomaly / Novelty Detection.",
    "explanation": "Clustering groups similar observations together (e.g. customer segmentation); Dimensionality Reduction projects high-dimensional data into compact latent spaces (e.g. PCA, t-SNE); Density Estimation models the underlying data distribution P(X) (e.g. GMM, KDE); Anomaly Detection identifies rare low-density outliers.",
    "hint": "Grouping, compression/visualization, distribution fitting, outlier detection.",
    "level": "Basic",
    "codeExample": "# 4 pillars: KMeans (clustering), PCA (reduction), KDE (density), IsolationForest (anomaly)"
  },
  {
    "id": 3,
    "question": "How does the K-Means Clustering algorithm partition unlabeled data points?",
    "shortAnswer": "By iteratively alternating between assigning points to the nearest centroid and recalculating centroids as the mean of assigned points.",
    "explanation": "K-Means minimizes the Within-Cluster Sum of Squares (WCSS / Inertia): J = \u2211_{k=1}^K \u2211_{x_i \u2208 C_k} ||x_i - \u03bc_k||^2. It alternates between the Assignment Step (Voronoi partition) and the Update Step (\u03bc_k = (1 / |C_k|) \u2211_{x_i \u2208 C_k} x_i) until convergence.",
    "hint": "Assign to nearest cluster center, then recompute center as the cluster average.",
    "level": "Basic",
    "codeExample": "from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=4, init='k-means++', random_state=42)\ncluster_labels = kmeans.fit_predict(X)"
  },
  {
    "id": 4,
    "question": "What is 'Inertia' (Within-Cluster Sum of Squares) in K-Means clustering?",
    "shortAnswer": "The sum of squared Euclidean distances from each data point to its assigned cluster centroid: \u2211_{i=1}^N min_k ||x_i - \u03bc_k||^2.",
    "explanation": "Inertia quantifies cluster cohesion. A lower inertia indicates tighter, more compact clusters. However, inertia decreases monotonically with increasing K, reaching 0 when K equals the number of data points N.",
    "hint": "Internal cohesion metric measuring how tightly points pack around their centroids.",
    "level": "Moderate",
    "codeExample": "inertia = kmeans.inertia_\nprint(f'WCSS Inertia: {inertia:.2f}')"
  },
  {
    "id": 5,
    "question": "How does the 'Elbow Method' determine the optimal number of clusters K in K-Means?",
    "shortAnswer": "By plotting WCSS (Inertia) against K and choosing the value where the rate of decrease abruptly bends into an 'elbow'.",
    "explanation": "As K increases, inertia continuously drops. The point of diminishing marginal returns creates an elbow curve. Beyond this point, adding more clusters splits natural groupings into arbitrary sub-clusters without meaningful variance reduction.",
    "hint": "Look for the inflection point of diminishing returns on the inertia vs K plot.",
    "level": "Basic",
    "codeExample": "inertias = [KMeans(n_clusters=k).fit(X).inertia_ for k in range(1, 10)]\n# Plot inertias vs range(1, 10) to locate elbow bend"
  },
  {
    "id": 6,
    "question": "What does the Silhouette Coefficient measure, and what is its mathematical range?",
    "shortAnswer": "s(i) = (b(i) - a(i)) / max(a(i), b(i)), ranging from -1 (incorrect clustering) to +1 (dense, well-separated clusters).",
    "explanation": "Here a(i) is the mean intra-cluster distance of sample i to all other points in its own cluster, and b(i) is the mean nearest-cluster distance. A score near +1 indicates well-clustered instances; 0 indicates overlapping cluster borders; negative scores indicate misassigned points.",
    "hint": "Relative balance between intra-cluster cohesion and nearest-cluster separation.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import silhouette_score\nscore = silhouette_score(X, cluster_labels)\nprint(f'Silhouette Score: {score:.3f}')"
  },
  {
    "id": 7,
    "question": "Why is K-Means++ initialization vastly superior to standard random centroid initialization?",
    "shortAnswer": "It chooses initial centroids sequentially with probability proportional to their squared distance from existing centroids, preventing poor local minima.",
    "explanation": "Standard random initialization often places multiple centroids in the same dense cluster, leading to sub-optimal local minima. K-Means++ spreads initial centroids widely across the feature space, guaranteeing an O(log K) competitive approximation bound.",
    "hint": "Probabilistic distance-weighted spreading of starting cluster centers.",
    "level": "Moderate",
    "codeExample": "kmeans = KMeans(n_clusters=3, init='k-means++') # Default in scikit-learn"
  },
  {
    "id": 8,
    "question": "What is Hierarchical Agglomerative Clustering, and how does it construct clusters?",
    "shortAnswer": "A bottom-up approach that starts with every sample as its own cluster and iteratively merges the closest pair of clusters until one cluster remains.",
    "explanation": "Agglomerative clustering builds a nested hierarchy represented as a Dendrogram. The distance between clusters during merging is determined by linkage criteria such as Ward's linkage (minimizing variance increase), Complete linkage (maximum distance), or Single linkage (minimum distance).",
    "hint": "Bottom-up hierarchical merging visualized via a tree-like dendrogram.",
    "level": "Moderate",
    "codeExample": "from sklearn.cluster import AgglomerativeClustering\nagg = AgglomerativeClustering(n_clusters=3, linkage='ward')\nlabels = agg.fit_predict(X)"
  },
  {
    "id": 9,
    "question": "How does a Dendrogram assist in choosing the number of clusters in Hierarchical Clustering?",
    "shortAnswer": "By cutting across the longest vertical branches that do not intersect any horizontal merge line.",
    "explanation": "The vertical height of a horizontal line in a dendrogram represents the distance or dissimilarity at which two sub-clusters were merged. Finding the largest vertical distance between consecutive merges reveals the most natural partition of the dataset.",
    "hint": "Horizontal cut across the longest uninterrupted vertical tree stems.",
    "level": "Moderate",
    "codeExample": "from scipy.cluster.hierarchy import dendrogram, linkage\nZ = linkage(X, method='ward')\n# dendrogram(Z)"
  },
  {
    "id": 10,
    "question": "How does DBSCAN (Density-Based Spatial Clustering of Applications with Noise) differ fundamentally from K-Means?",
    "shortAnswer": "DBSCAN clusters points based on local spatial density (Eps, MinPts), discovering arbitrary shapes and automatically identifying noise outliers without requiring K upfront.",
    "explanation": "While K-Means assumes spherical clusters and assigns every point to a centroid, DBSCAN defines clusters as continuous regions of high density separated by low-density areas. Points with fewer than MinPts neighbors within radius Eps are classified as noise (label -1).",
    "hint": "Density-connected clusters vs spherical centroid partitions; handles noise natively.",
    "level": "Moderate",
    "codeExample": "from sklearn.cluster import DBSCAN\ndb = DBSCAN(eps=0.5, min_samples=5)\nlabels = db.fit_predict(X)  # -1 represents noise points"
  },
  {
    "id": 11,
    "question": "In DBSCAN, what is the distinction between Core Points, Border Points, and Noise Points?",
    "shortAnswer": "Core: \u2265 MinPts in Eps-radius; Border: < MinPts but in neighborhood of a Core point; Noise: neither Core nor Border.",
    "explanation": "Core points form the dense interior of a cluster. Border points lie on the cluster boundary (not dense enough themselves, but reachable from a core point). Noise points are isolated anomalies that do not belong to any dense region.",
    "hint": "Interior density generators, peripheral boundary points, and isolated outliers.",
    "level": "Moderate",
    "codeExample": "# Core sample indices in scikit-learn DBSCAN\ncore_indices = db.core_sample_indices_"
  },
  {
    "id": 12,
    "question": "What is Principal Component Analysis (PCA) and what mathematical property does it maximize?",
    "shortAnswer": "An orthogonal linear transformation that projects data onto principal directions maximizing explained variance.",
    "explanation": "PCA diagonalizes the empirical data covariance matrix \u03a3 = (1/N) X^T X. The first principal component is the eigenvector with the largest eigenvalue \u03bb_1, capturing the direction of greatest variance in \u211d^d. Subsequent components are mutually orthogonal and capture descending variance.",
    "hint": "Maximizing variance along orthogonal eigenvector projection axes.",
    "level": "Moderate",
    "codeExample": "from sklearn.decomposition import PCA\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(X)\nprint('Explained variance ratio:', pca.explained_variance_ratio_)"
  },
  {
    "id": 13,
    "question": "Why must data be centered (zero mean) and scaled before performing Principal Component Analysis (PCA)?",
    "shortAnswer": "PCA computes projections based on variance around the origin; uncentered or unscaled data distorts principal axes toward high-scale features.",
    "explanation": "If one feature has a variance of 10,000 (e.g. annual income in rupees) and another has a variance of 2 (e.g. age), PCA will align the first principal component almost entirely along income, ignoring age variance regardless of its true significance.",
    "hint": "Unstandardized units falsely dominate covariance matrix eigenvalues.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import StandardScaler\nX_std = StandardScaler().fit_transform(X)\npca = PCA(n_components=2).fit(X_std)"
  },
  {
    "id": 14,
    "question": "What is the 'Curse of Dimensionality' in unsupervised machine learning?",
    "shortAnswer": "As dimensionality d increases, data space volume grows exponentially, making all pairwise Euclidean distances equidistant and data extremely sparse.",
    "explanation": "In high-dimensional spaces (e.g. d > 100), the ratio between the distance to the nearest neighbor and the distance to the furthest neighbor approaches 1: lim_{d\u2192\u221e} (dist_max - dist_min) / dist_min = 0. This causes distance-based clustering algorithms (like K-Means, DBSCAN) to lose discrimination capability.",
    "hint": "All points become equally distant from each other in very high dimensions.",
    "level": "Expert",
    "codeExample": "# In high dimensions: Use PCA / t-SNE / UMAP before distance-based clustering"
  },
  {
    "id": 15,
    "question": "How does t-Distributed Stochastic Neighbor Embedding (t-SNE) preserve local data manifold structures for visualization?",
    "shortAnswer": "By converting pairwise Euclidean distances into conditional probabilities in high dimensions (Gaussian) and low dimensions (Student-t) and minimizing their KL-divergence.",
    "explanation": "t-SNE preserves local neighborhood affinities while using a heavy-tailed Student-t distribution in the low-dimensional embedding (2D/3D) to solve the 'crowding problem'. It maps complex, non-linear high-dimensional data clusters into highly interpretable visual clusters.",
    "hint": "Non-linear probabilistic manifold embedding for 2D/3D visual inspection.",
    "level": "Expert",
    "codeExample": "from sklearn.manifold import TSNE\ntsne = TSNE(n_components=2, perplexity=30.0, random_state=42)\nX_2d = tsne.fit_transform(X)"
  },
  {
    "id": 16,
    "question": "What is a Gaussian Mixture Model (GMM), and how does it perform 'soft' clustering?",
    "shortAnswer": "GMM models data as a weighted sum of K multivariate Gaussian distributions P(x) = \u2211 \u03c0_k \ud835\udca9(x | \u03bc_k, \u03a3_k), outputting posterior membership probabilities.",
    "explanation": "Unlike K-Means (which performs hard assignments where a point belongs 100% to one cluster), GMM uses Expectation-Maximization (EM) to compute the soft probability \u03b3_{ik} = P(z_i = k | x_i) that sample i belongs to cluster k. It also handles elliptical clusters of varying sizes through full covariance matrices \u03a3_k.",
    "hint": "Probabilistic soft clustering with elliptical Gaussian covariance envelopes.",
    "level": "Expert",
    "codeExample": "from sklearn.mixture import GaussianMixture\ngmm = GaussianMixture(n_components=3, covariance_type='full', random_state=42)\ngmm.fit(X)\nsoft_probs = gmm.predict_proba(X)"
  },
  {
    "id": 17,
    "question": "What are the two alternating steps of the Expectation-Maximization (EM) algorithm in GMMs?",
    "shortAnswer": "E-step: compute expected cluster responsibilities \u03b3_{ik} given current parameters; M-step: update parameters (\u03c0_k, \u03bc_k, \u03a3_k) to maximize log-likelihood.",
    "explanation": "The E-step (Expectation) estimates latent variables by calculating the posterior probability that each data point was generated by Gaussian component k. The M-step (Maximization) updates the mixture weights \u03c0_k, means \u03bc_k, and covariance matrices \u03a3_k using weighted sample statistics.",
    "hint": "Expectation of latent labels followed by Maximization of parameter likelihoods.",
    "level": "Expert",
    "codeExample": "# EM Iteration: E-step calculates responsibilities; M-step calculates new means & covariances"
  },
  {
    "id": 18,
    "question": "How does the Isolation Forest algorithm detect anomalies in an unsupervised dataset?",
    "shortAnswer": "By constructing random decision trees; anomalies are isolated closer to the tree root with significantly shorter average path lengths.",
    "explanation": "Because anomalies are few and have distinct feature values, random orthogonal splits isolate them in very few partitions compared to normal points clustered in dense regions. Anomaly score is an inverse exponential function of average tree traversal depth.",
    "hint": "Outliers require fewer random cuts to be isolated into leaf nodes.",
    "level": "Moderate",
    "codeExample": "from sklearn.ensemble import IsolationForest\niso = IsolationForest(contamination=0.05, random_state=42)\nanomalies = iso.fit_predict(X) # -1: Outlier, 1: Normal"
  },
  {
    "id": 19,
    "question": "What is an Autoencoder, and how is it used for unsupervised representation learning and anomaly detection?",
    "shortAnswer": "A neural network trained to reconstruct its input via a bottleneck latent layer; high reconstruction error indicates an anomaly.",
    "explanation": "An autoencoder consists of an Encoder f_\u03b8(x) mapping input to a compressed latent code z \u2208 \u211d^m (where m < d), and a Decoder g_\u03c6(z) reconstructing x_hat \u2248 x. Because it learns the normal data manifold, unseen anomalous inputs produce high reconstruction error ||x - x_hat||^2.",
    "hint": "Encoder-bottleneck-decoder architecture trained with self-reconstruction loss.",
    "level": "Expert",
    "codeExample": "# Reconstruction loss: loss = np.mean((x - reconstructed_x) ** 2)"
  },
  {
    "id": 20,
    "question": "What is Kernel PCA and when is it preferred over standard linear PCA?",
    "shortAnswer": "Kernel PCA uses the kernel trick to compute non-linear principal components, unwrapping non-linear data manifolds (e.g. concentric circles).",
    "explanation": "Standard PCA can only find linear orthogonal hyperplanes. Kernel PCA applies a non-linear mapping \u03c6(x) into a higher-dimensional feature space and performs PCA on the resulting kernel matrix K, allowing it to project non-linearly separable structures into linearly separable low-dimensional representations.",
    "hint": "Non-linear manifold unwrapping using kernelized covariance matrices.",
    "level": "Expert",
    "codeExample": "from sklearn.decomposition import KernelPCA\nkpca = KernelPCA(n_components=2, kernel='rbf', gamma=15)\nX_kpca = kpca.fit_transform(X)"
  },
  {
    "id": 21,
    "question": "What is Association Rule Mining in unsupervised transaction data?",
    "shortAnswer": "Finding frequent if-then item relationships (e.g. {Bread, Butter} \u2192 {Milk}) based on Support, Confidence, and Lift.",
    "explanation": "Used extensively in market basket analysis. Support measures how frequently the itemset appears: P(A \u2229 B). Confidence measures conditional probability: P(B | A) = Support(A \u222a B) / Support(A). Lift measures dependency strength: Confidence(A \u2192 B) / Support(B).",
    "hint": "Market basket co-occurrence rules using Support, Confidence, and Lift.",
    "level": "Basic",
    "codeExample": "# Support = count(A & B) / total_txns\n# Confidence = count(A & B) / count(A)\n# Lift = Confidence / Support(B)"
  },
  {
    "id": 22,
    "question": "What is the difference between Single Linkage and Complete Linkage in Hierarchical Clustering?",
    "shortAnswer": "Single linkage computes minimum distance between any pair of points (prone to chaining); Complete linkage computes maximum distance (produces compact clusters).",
    "explanation": "Single Linkage: d(A, B) = min_{a\u2208A, b\u2208B} ||a - b|| (can form long, stringy chains connecting disparate clusters). Complete Linkage: d(A, B) = max_{a\u2208A, b\u2208B} ||a - b|| (enforces tight, spherical diameter boundaries). Average linkage takes the mean pairwise distance.",
    "hint": "Minimum pairwise distance vs Maximum pairwise distance between cluster members.",
    "level": "Moderate",
    "codeExample": "agg_single = AgglomerativeClustering(linkage='single')\nagg_complete = AgglomerativeClustering(linkage='complete')"
  },
  {
    "id": 23,
    "question": "Why is K-Means clustering ineffective for non-spherical clusters (e.g., nested rings or crescent moons)?",
    "shortAnswer": "K-Means uses isotropic Euclidean distance to centroids, implicitly assuming all clusters are convex, spherical, and similarly sized.",
    "explanation": "Because K-Means partitions space using Voronoi cells (linear hyperplanes equidistant between centroids), it cannot conform to non-convex geometries. For complex non-linear shapes, density-based algorithms (DBSCAN, HDBSCAN) or spectral clustering must be used.",
    "hint": "Voronoi tessellation only creates convex polygonal cluster boundaries.",
    "level": "Moderate",
    "codeExample": "# Concentric circles dataset: KMeans fails; DBSCAN or SpectralClustering succeeds"
  },
  {
    "id": 24,
    "question": "What is Spectral Clustering and how does it leverage Graph Theory for clustering?",
    "shortAnswer": "It builds an affinity graph adjacency matrix, computes the Graph Laplacian matrix L, and applies K-Means on the eigenvectors of L.",
    "explanation": "Spectral clustering treats data points as nodes in a graph connected by similarity edges. By computing the eigenvectors of the unnormalized or normalized Graph Laplacian L = D - W (where D is the degree matrix and W is the similarity matrix), it maps complex non-linear manifolds into a space where clusters are easily separable.",
    "hint": "Graph Laplacian eigenvectors project complex manifold graphs into separable spaces.",
    "level": "Expert",
    "codeExample": "from sklearn.cluster import SpectralClustering\nspectral = SpectralClustering(n_clusters=2, affinity='nearest_neighbors')\nlabels = spectral.fit_predict(X)"
  },
  {
    "id": 25,
    "question": "What is the difference between Hard Clustering and Soft (Fuzzy) Clustering?",
    "shortAnswer": "Hard clustering assigns each data point strictly to 1 cluster (membership = 0 or 1); Soft clustering assigns a probability distribution across all clusters.",
    "explanation": "Hard clustering (K-Means) partitions the dataset into mutually exclusive subsets: x_i \u2208 C_k. Soft clustering (Fuzzy C-Means, GMM) computes membership weights w_{ik} \u2208 [0, 1] such that \u2211_{k=1}^K w_{ik} = 1, capturing boundary ambiguity.",
    "hint": "Binary 0/1 membership vs continuous probability distribution.",
    "level": "Basic",
    "codeExample": "# Hard: labels = [0, 2, 1, 0]\n# Soft: probs = [[0.85, 0.10, 0.05], [0.02, 0.08, 0.90]]"
  },
  {
    "id": 26,
    "question": "What is the Davies-Bouldin Index, and is a higher or lower score preferred?",
    "shortAnswer": "An internal clustering evaluation metric measuring similarity between clusters; a lower Davies-Bouldin index indicates better clustering.",
    "explanation": "The Davies-Bouldin Index evaluates the ratio of intra-cluster spread to inter-cluster separation: DB = (1/K) \u2211_{i=1}^K max_{j\u2260i} ((s_i + s_j) / d(\u03bc_i, \u03bc_j)). Lower values mean clusters are tight and well-separated from one another.",
    "hint": "Measures similarity between clusters: minimum score is best.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import davies_bouldin_score\ndb_index = davies_bouldin_score(X, cluster_labels)\nprint(f'Davies-Bouldin Index: {db_index:.3f}')"
  },
  {
    "id": 27,
    "question": "What is Non-Negative Matrix Factorization (NMF) and why is it popular for Topic Modeling and Image Decomposition?",
    "shortAnswer": "It factorizes non-negative matrix V \u2248 W * H where all elements are \u2265 0, producing purely additive, interpretable parts-based representations.",
    "explanation": "Unlike PCA (which allows negative eigenvector weights that cancel each other out), NMF enforces non-negativity constraints W \u2265 0, H \u2265 0. In document topic modeling, W represents document-topic weights and H represents topic-word vocabularies, making every component purely additive and human-interpretable.",
    "hint": "Additive non-negative factorization creating intuitive parts-based features.",
    "level": "Expert",
    "codeExample": "from sklearn.decomposition import NMF\nnmf = NMF(n_components=5, init='nndsvda', random_state=42)\nW = nmf.fit_transform(X_tfidf)\nH = nmf.components_"
  },
  {
    "id": 28,
    "question": "What is the Local Outlier Factor (LOF) algorithm in unsupervised anomaly detection?",
    "shortAnswer": "It computes local density of a point relative to its k nearest neighbors; points with substantially lower density than their neighbors are flagged as outliers.",
    "explanation": "Unlike global anomaly detectors, LOF handles datasets with varying densities across different regions. A point inside a sparse cluster is not an outlier, but a point lying outside an otherwise dense cluster receives an LOF score > 1 and is flagged.",
    "hint": "Compares local density of an observation to the local densities of its neighbors.",
    "level": "Moderate",
    "codeExample": "from sklearn.neighbors import LocalOutlierFactor\nlof = LocalOutlierFactor(n_neighbors=20, contamination=0.05)\noutlier_flags = lof.fit_predict(X)"
  },
  {
    "id": 29,
    "question": "What is the Calinski-Harabasz Index (Variance Ratio Criterion)?",
    "shortAnswer": "The ratio of between-cluster dispersion to within-cluster dispersion; higher values indicate denser, better-separated clusters.",
    "explanation": "Defined as CH = [SSB / (K - 1)] / [SSW / (N - K)], where SSB is between-cluster sum of squares and SSW is within-cluster sum of squares. Higher scores signify that cluster centers are far apart relative to internal cluster scatter.",
    "hint": "Ratio of between-cluster variance to within-cluster variance (higher is better).",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import calinski_harabasz_score\nch_score = calinski_harabasz_score(X, cluster_labels)\nprint(f'Calinski-Harabasz Score: {ch_score:.2f}')"
  },
  {
    "id": 30,
    "question": "How can Unsupervised Learning be utilized to accelerate Supervised Learning workflows?",
    "shortAnswer": "Via feature extraction (PCA dimensionality reduction), pre-training/embeddings (autoencoders), and semi-supervised pseudo-labeling.",
    "explanation": "Unsupervised pre-training or autoencoder feature compression transforms raw high-dimensional inputs (images, audio, text) into compact, highly informative latent vectors. These compact vectors reduce supervised model training time, combat overfitting, and drastically cut required labeled sample sizes.",
    "hint": "Extracting rich latent representations from cheap unlabeled data before supervised fine-tuning.",
    "level": "Expert",
    "codeExample": "# Unsupervised feature extraction pipeline\npca = PCA(n_components=50).fit(X_unlabeled)\nX_train_reduced = pca.transform(X_train)\nclassifier.fit(X_train_reduced, y_train)"
  }
];

export default questions;
