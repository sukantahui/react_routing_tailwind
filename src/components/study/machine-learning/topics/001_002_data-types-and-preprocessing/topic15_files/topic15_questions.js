/**
 * TOPIC 15: FEATURE SCALING (MAGNITUDE DISTORTION & CONVERGENCE DYNAMICS)
 * Graded Academic & Industry Certification Question Bank
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 30 Authentic Multi-Tier Questions with Complete Explanations & Snippets
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the primary fundamental objective of feature scaling in machine learning?",
    options: [
      "To artificially increase the number of training observations in small datasets",
      "To calibrate independent feature ranges so that arbitrary measurement units (e.g. Rupees vs Years) do not distort distance metrics, gradients, and regularization penalties",
      "To convert continuous floating-point numbers into string representations",
      "To remove all non-linear relationships between independent variables and target variables"
    ],
    correctIndex: 1,
    explanation: "Features in real-world engineering are measured in disparate arbitrary units (e.g., Annual Income in ₹3,00,000–₹35,00,000 vs Age in 18–65). If left unscaled, features with larger numerical magnitudes dominate Euclidean distances, gradient updates, and regularization penalties, rendering other vital features statistical noise.",
    practicalTip: "Always scale continuous features before feeding them into distance-based models (KNN, K-Means, SVM) or gradient-descent optimizers (Neural Nets, Logistic Regression).",
    codeSnippet: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)",
    examRelevance: "MAKAUT BCAC701B Preprocessing Core Essentials"
  },
  {
    id: 2,
    tier: "Tier 1: Foundation & Terminology",
    question: "Which of the following machine learning model families is completely invariant (immune) to continuous feature scaling?",
    options: [
      "K-Nearest Neighbors (KNN)",
      "Support Vector Machines (SVM) with RBF kernels",
      "Tree-based ensembles (Decision Trees, Random Forests, XGBoost)",
      "Multi-Layer Perceptrons (Neural Networks)"
    ],
    correctIndex: 2,
    explanation: "Decision trees find partition thresholds using monotonic inequality tests (x_j <= threshold). Scaling a feature merely scales the candidate threshold by the exact same monotonic factor, leaving sample rankings, purity metrics (Gini/Entropy), and tree topologies 100% identical.",
    practicalTip: "Do not waste compute cycles scaling features in pure tree-based pipelines like XGBoost or LightGBM.",
    codeSnippet: "# Tree models yield identical splits whether features are scaled or unscaled\nfrom sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier().fit(X_train_raw, y_train)",
    examRelevance: "Model Invariance & Algorithm Sensitivity"
  },
  {
    id: 3,
    tier: "Tier 1: Foundation & Terminology",
    question: "In distance-based algorithms like K-Nearest Neighbors, why does an unscaled feature with values in [10,000, 100,000] completely corrupt Euclidean distance calculations when combined with a feature in [0, 1]?",
    options: [
      "Because the computer register overflows when computing square roots",
      "Because squared differences along the large-scale feature ((10,000)^2 = 10^8) dwarf differences along the small-scale feature ((0.5)^2 = 0.25) by eight orders of magnitude, making the small feature irrelevant",
      "Because Euclidean distance requires all numbers to be integers",
      "Because KNN only works when all features have negative values"
    ],
    correctIndex: 1,
    explanation: "Euclidean distance d = sqrt((x1 - y1)^2 + (x2 - y2)^2) sums squared coordinate differences. A tiny 1% difference in the large feature produces squared values in millions, completely drowning out differences in the small feature and causing KNN to search for neighbors along a 1D line rather than the full feature space.",
    practicalTip: "On unscaled data, KNN is effectively a single-feature model based on whichever column has the largest physical measurement unit.",
    codeSnippet: "# Demonstrating Euclidean dominance\nimport numpy as np\np1 = np.array([50000, 0.2])\np2 = np.array([50100, 0.9])\n# Distance is 100.002 -> Income difference completely dictates distance!",
    examRelevance: "Metric Space Distortions & K-Nearest Neighbors"
  },
  {
    id: 4,
    tier: "Tier 1: Foundation & Terminology",
    question: "In gradient descent optimization, what does a Hessian condition number of kappa(H) = 1.0 signify regarding the loss landscape?",
    options: [
      "The loss surface is completely flat and has no global minimum",
      "The loss contours are perfectly circular / spherical (isotropic), meaning the gradient points directly toward the global minimum",
      "The model has diverged and weights have become infinite",
      "The learning rate must be set to zero"
    ],
    correctIndex: 1,
    explanation: "The condition number kappa(H) = lambda_max / lambda_min measures the ratio of the steepest to flattest curvature directions of the loss surface. When kappa = 1.0, curvatures in all dimensions are equal, producing concentric hyperspherical contours where gradients point straight to the optimum without bouncing.",
    practicalTip: "Standardizing features brings kappa closer to 1.0, enabling gradient descent to converge in substantially fewer epochs.",
    codeSnippet: "# Ideal condition number in linear regression:\nHessian = X.T @ X\neigenvals = np.linalg.eigvals(Hessian)\nkappa = np.max(eigenvals) / np.min(eigenvals)",
    examRelevance: "Optimization Theory & Gradient Descent Convergence"
  },
  {
    id: 5,
    tier: "Tier 1: Foundation & Terminology",
    question: "How does unscaled data cause Support Vector Machines (SVM) with Radial Basis Function (RBF) kernels to fail?",
    options: [
      "The margin becomes infinite and all points become support vectors",
      "The term ||x - x'||^2 becomes gigantic, causing the kernel K(x, x') = exp(-gamma * ||x - x'||^2) to saturate to 0.0 for virtually all distinct sample pairs, destroying non-linear separability",
      "The SVM dual optimization problem runs out of slack variables",
      "The hyperplane turns into a quadratic parabola"
    ],
    correctIndex: 1,
    explanation: "The RBF Gaussian kernel evaluates pairwise squared Euclidean distance ||x - x'||^2. On unscaled data with large magnitudes, this distance is huge, so exp(-gamma * large_number) collapses to zero for all pairs. The kernel Gram matrix becomes an identity matrix, making every point appear isolated and destroying generalization.",
    practicalTip: "Always scale data before running SVC(kernel='rbf') or SVR. An unscaled RBF SVM will almost always predict the dummy majority class.",
    codeSnippet: "from sklearn.svm import SVC\nfrom sklearn.pipeline import make_pipeline\n# Always pipeline scaling with SVM\nmodel = make_pipeline(StandardScaler(), SVC(kernel='rbf'))",
    examRelevance: "Support Vector Machines & Kernel Methods"
  },
  {
    id: 6,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why is applying L2 (Ridge) or L1 (Lasso) regularization to UNCHECKED, unscaled features mathematically flawed?",
    options: [
      "Because regularizers only work on complex numbers",
      "Because the penalty term lambda * sum(w_j^2) penalizes all weights equally, but features on small scales naturally require huge weights to exert predictive impact, so Ridge unfairly shrinks small-scale features",
      "Because regularization makes the loss function non-convex",
      "Because Lasso regression will delete all features simultaneously"
    ],
    correctIndex: 1,
    explanation: "In y = w1*x1 + w2*x2, if x1 has range [0, 100,000] and x2 has range [0, 1], the true model needs w1 approx 0.0001 and w2 approx 10. The L2 penalty adds lambda*(w1^2 + w2^2) = lambda*(10^-8 + 100). The penalty on w2 is 10,000,000,000 times harsher than on w1, unfairly crushing feature 2 solely due to arbitrary units of measurement.",
    practicalTip: "Never fit Ridge, Lasso, or ElasticNet on unscaled data. Scikit-learn's RidgeCV and LassoCV assume features are pre-standardized.",
    codeSnippet: "# Proper regularized regression pipeline\nfrom sklearn.linear_model import Ridge\npipe = make_pipeline(StandardScaler(), Ridge(alpha=1.0))",
    examRelevance: "Regularization Theory & Penalty Equivariance"
  },
  {
    id: 7,
    tier: "Tier 1: Foundation & Terminology",
    question: "How does Principal Component Analysis (PCA) behave when applied to unscaled features where Feature 1 has variance 10^9 and Feature 2 has variance 1.0?",
    options: [
      "PCA balances both features equally using orthogonal projections",
      "The first Principal Component aligns almost 100% with Feature 1, treating Feature 2 as negligible noise simply because of measurement units",
      "PCA fails with a divide-by-zero error",
      "PCA converts both features into discrete categorical variables"
    ],
    correctIndex: 1,
    explanation: "PCA seeks orthogonal axes that maximize projected variance (max v^T Sigma v). Since Feature 1 has a variance of 10^9, its variance dominates the total covariance matrix trace. PC1 will point almost purely along the Feature 1 axis ([1.0, 0.0]^T), completely ignoring Feature 2 regardless of how informative it is.",
    practicalTip: "PCA without StandardScaler is meaningless unless all features are measured in the exact same physical unit (e.g. image pixels from 0 to 255).",
    codeSnippet: "# PCA must always be preceded by StandardScaler\nfrom sklearn.decomposition import PCA\npca_pipe = make_pipeline(StandardScaler(), PCA(n_components=2))",
    examRelevance: "Dimensionality Reduction & Covariance Alignment"
  },
  {
    id: 8,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the primary advantage of Mahalanobis distance over standard Euclidean distance?",
    options: [
      "It is scale-invariant and accounts for the covariance and correlations between features",
      "It runs 100 times faster because it ignores matrix algebra",
      "It only works on binary categorical data",
      "It guarantees that distance is always an integer"
    ],
    correctIndex: 0,
    explanation: "Mahalanobis distance d_M(p, q) = sqrt((p - q)^T Sigma^-1 (p - q)) standardizes each dimension by its sample variance and rotates the coordinate system by the inverse covariance matrix Sigma^-1. It is inherently scale-invariant: measuring income in Rupees vs Lakhs yields the exact same Mahalanobis distance.",
    practicalTip: "Mahalanobis distance is the gold standard metric for multivariate outlier detection and anomaly identification in correlated sensor streams.",
    codeSnippet: "from scipy.spatial.distance import mahalanobis\n# d = mahalanobis(u, v, inv_cov)",
    examRelevance: "Scale-Invariant Geometry & Multivariate Distance Metrics"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & FORMULAS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In the theoretical convergence analysis of gradient descent on a quadratic objective with Hessian condition number kappa, what is the error reduction factor per iteration?",
    options: [
      "||w_{t} - w*|| <= [(kappa - 1) / (kappa + 1)]^t * ||w_0 - w*||",
      "||w_{t} - w*|| <= [1 / kappa^2]^t * ||w_0 - w*||",
      "||w_{t} - w*|| <= [kappa / (2 * pi)]^t * ||w_0 - w*||",
      "||w_{t} - w*|| <= [exp(-kappa * t)] * ||w_0 - w*||"
    ],
    correctIndex: 0,
    explanation: "The classical optimization proof shows that for an L-smooth, mu-strongly convex quadratic function with condition number kappa = L / mu, the optimal constant step size yields convergence bounded by [(kappa - 1) / (kappa + 1)]^t. When kappa = 1, (1-1)/(1+1) = 0 (instant 1-step convergence). When kappa = 1000, (999/1001) approx 0.998, requiring thousands of steps to make modest progress.",
    practicalTip: "This mathematical bound proves why feature scaling is not merely aesthetic—it fundamentally controls the convergence speed of gradient-based optimizers.",
    codeSnippet: "# Theoretical convergence rate calculation\nkappa = 50.0\nrate = (kappa - 1) / (kappa + 1) # 0.9608 -> slow convergence",
    examRelevance: "MAKAUT Optimization Theory & Proofs"
  },
  {
    id: 10,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "To guarantee that standard gradient descent does NOT diverge on a loss surface with maximum Hessian eigenvalue lambda_max, what is the strict mathematical upper bound on the learning rate alpha?",
    options: [
      "alpha < 2 / lambda_max",
      "alpha < lambda_min / lambda_max",
      "alpha < 1 / (2 * pi)",
      "alpha > lambda_max^2"
    ],
    correctIndex: 0,
    explanation: "By spectral decomposition, the update along eigenvector i is w_{t+1, i} = (1 - alpha * lambda_i) * w_{t, i}. For the sequence to contract and avoid explosive oscillation, we require |1 - alpha * lambda_i| < 1 for all eigenvalues. The most restrictive condition is 1 - alpha * lambda_max > -1, which yields alpha < 2 / lambda_max.",
    practicalTip: "If one unscaled feature has huge curvature (lambda_max = 10,000), you are forced to choose alpha < 0.0002, freezing updates along flatter features.",
    codeSnippet: "# Checking maximum stable learning rate\nmax_eig = np.max(np.linalg.eigvals(H))\nalpha_limit = 2.0 / max_eig\nprint(f'Maximum stable alpha: {alpha_limit:.6f}')",
    examRelevance: "Gradient Descent Stability Limits & Learning Rate Boundaries"
  },
  {
    id: 11,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "What is the partial derivative of the Euclidean distance d_E(x, y) = sqrt(sum (x_k - y_k)^2) with respect to coordinate x_i?",
    options: [
      "partial d_E / partial x_i = (x_i - y_i) / d_E",
      "partial d_E / partial x_i = 2 * (x_i - y_i)",
      "partial d_E / partial x_i = 1 / sqrt(x_i - y_i)",
      "partial d_E / partial x_i = d_E / (x_i - y_i)"
    ],
    correctIndex: 0,
    explanation: "Using the chain rule: d/dx_i [ (sum (x_k - y_k)^2)^(1/2) ] = (1/2) * (sum (x_k - y_k)^2)^(-1/2) * 2 * (x_i - y_i) = (x_i - y_i) / d_E. This proves that the sensitivity of Euclidean distance to changes in feature i is directly proportional to the magnitude of coordinate deviation |x_i - y_i|.",
    practicalTip: "This exact derivative explains why feature scaling is critical for gradient-based embeddings like t-SNE and UMAP.",
    codeSnippet: "# Coordinate sensitivity verification in python\ndef dist_grad(x, y):\n    d = np.linalg.norm(x - y)\n    return (x - y) / d",
    examRelevance: "Vector Calculus & Metric Space Derivatives"
  },
  {
    id: 12,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "If all features are mutually uncorrelated with diagonal covariance matrix Sigma = diag(sigma_1^2, sigma_2^2, ..., sigma_d^2), what does the Mahalanobis distance d_M(p, q) reduce to?",
    options: [
      "Standard Euclidean distance: sqrt(sum (p_i - q_i)^2)",
      "Standardized Euclidean distance: sqrt(sum ((p_i - q_i) / sigma_i)^2)",
      "Manhattan L1 distance: sum |p_i - q_i|",
      "Chebyshev distance: max |p_i - q_i|"
    ],
    correctIndex: 1,
    explanation: "When Sigma is diagonal, its inverse Sigma^-1 is simply diag(1/sigma_1^2, 1/sigma_2^2, ..., 1/sigma_d^2). Plugging this into (p - q)^T Sigma^-1 (p - q) yields sum ((p_i - q_i)^2 / sigma_i^2). Taking the square root gives sqrt(sum ((p_i - q_i) / sigma_i)^2), which is exactly the Euclidean distance after standardizing each feature by its standard deviation.",
    practicalTip: "This proves that standardization is simply Mahalanobis distance under the assumption of uncorrelated feature dimensions.",
    codeSnippet: "# Uncorrelated Mahalanobis is identical to Standardized Euclidean\ndist_std = np.sqrt(np.sum(((p - q) / std_devs)**2))",
    examRelevance: "Mahalanobis Decomposition & Diagonal Covariances"
  },
  {
    id: 13,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Why is the Ordinary Least Squares (OLS) closed-form solution beta_hat = (X^T X)^(-1) X^T y theoretically scale-equivariant, yet practically vulnerable on unscaled data?",
    options: [
      "The theoretical solution adjusts weights proportionally (w_scaled = w_raw / s), but finite 64-bit floating point precision causes numerical ill-conditioning and inversion errors when inverting X^T X with high condition numbers",
      "OLS requires features to be integers, so scaling crashes matrix multiplication",
      "The OLS formula produces negative probabilities on unscaled features",
      "OLS only works when the target variable is categorical"
    ],
    correctIndex: 0,
    explanation: "Mathematically, linear regression predictions y_hat = X * beta_hat are scale-equivariant: multiplying column j by constant c divides beta_j by c, leaving predictions identical. However, in finite-precision computing, an unscaled X^T X matrix with condition number 10^14 suffers severe catastrophic cancellation and numerical instability during matrix inversion.",
    practicalTip: "Even for closed-form OLS, standardizing features prevents ill-conditioned matrix inversion errors in numpy.linalg.solve.",
    codeSnippet: "# Checking matrix conditioning before inversion\ncond_number = np.linalg.cond(X.T @ X)\nif cond_number > 1e12:\n    print('WARNING: Ill-conditioned matrix! Scale features first.')",
    examRelevance: "Scale Equivariance vs Numerical Stability"
  },
  {
    id: 14,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "When features are unscaled, how does the condition number of the Hessian matrix H relate to the condition number of the feature data matrix X?",
    options: [
      "kappa(H) = kappa(X)",
      "kappa(H) = (kappa(X))^2",
      "kappa(H) = sqrt(kappa(X))",
      "kappa(H) = ln(kappa(X))"
    ],
    correctIndex: 1,
    explanation: "In linear regression and quadratic losses, the Hessian is proportional to H = X^T X. The singular values of X are s_i, meaning the eigenvalues of X^T X are s_i^2. Therefore, the condition number of the Hessian is kappa(H) = lambda_max / lambda_min = (s_max / s_min)^2 = (kappa(X))^2. Any scaling disparity in X is squared in the optimization curvature!",
    practicalTip: "A modest scale disparity of 100 in X results in a massive condition number of 10,000 in the loss Hessian, severely crippling gradient descent.",
    codeSnippet: "# Condition number squaring demonstration\nX_cond = np.linalg.cond(X)\nH_cond = np.linalg.cond(X.T @ X)\nprint(f'X condition: {X_cond:.2f}, Hessian condition: {H_cond:.2f}') # H_cond ≈ X_cond^2",
    examRelevance: "Hessian Curvature & Singular Value Decomposition"
  },
  {
    id: 15,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In Ridge regression with penalty term alpha * I, what happens to the closed-form weight update (X^T X + alpha * I)^(-1) X^T y when feature 1 has variance 10^8 and feature 2 has variance 1.0?",
    options: [
      "alpha * I adds equal shrinkage to both diagonal terms, but alpha is negligible compared to 10^8 while overwhelmingly large compared to 1.0, shrinking weight 2 to near-zero while leaving weight 1 unregularized",
      "alpha shrinks both weights by exactly 50%",
      "alpha causes the matrix to become non-invertible",
      "Ridge regression automatically converts alpha to alpha / variance"
    ],
    correctIndex: 0,
    explanation: "The regularized matrix diagonal elements are (sum x1^2 + alpha) and (sum x2^2 + alpha). If alpha = 10, adding 10 to 100,000,000 changes the first diagonal by 0.00001% (no regularization effect). Adding 10 to 1.0 changes the second diagonal by 1000%, obliterating weight 2. This proves that unscaled Ridge regularizes small-scale features while ignoring large-scale features.",
    practicalTip: "Ridge regularization is only mathematically sound when all features are standardized to have unit variance.",
    codeSnippet: "# Showing uneven diagonal impact\ndiag_elements = np.array([1e8, 1.0])\nalpha = 10.0\nratio_change = (diag_elements + alpha) / diag_elements\n# ratio_change is [1.0000001, 11.0]!",
    examRelevance: "Ridge Regularization Analytical Mechanics"
  },
  {
    id: 16,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In Neural Networks, why does an unscaled feature with values in [1000, 5000] cause the saturation of Sigmoid or Tanh activation functions in the first hidden layer?",
    options: [
      "Because the linear combination z = w * x + b produces large positive or negative values, pushing activation functions into flat saturating regions where derivative f'(z) approx 0, triggering vanishing gradients",
      "Because Sigmoid functions produce complex numbers for inputs > 100",
      "Because unscaled features make the bias term negative",
      "Because Tanh functions only accept inputs between -1 and +1"
    ],
    correctIndex: 0,
    explanation: "When x is in thousands, even small initial weights (e.g. w = 0.01) produce net inputs z = w * x = 10 to 50. For Sigmoid, sigma(10) approx 0.99995 and its derivative sigma'(z) = sigma(z)*(1 - sigma(z)) evaluates to 0.00005. During backpropagation, error gradients are multiplied by sigma'(z), instantly killing learning across all lower layers.",
    practicalTip: "Feature scaling to mean 0 and variance 1 keeps initial activations in the linear active zone of Sigmoid/Tanh, preventing initial vanishing gradients.",
    codeSnippet: "# Checking sigmoid derivative saturation\ndef sigmoid_grad(z):\n    s = 1.0 / (1.0 + np.exp(-z))\n    return s * (1.0 - s)\nprint('Grad at z=0.5:', sigmoid_grad(0.5))  # ~0.235 (healthy)\nprint('Grad at z=20.0:', sigmoid_grad(20.0)) # ~2e-9 (vanished!)",
    examRelevance: "Vanishing Gradients & Neural Network Initialization"
  },

  // =========================================================================
  // TIER 3: ALGORITHM ARCHITECTURE & DESIGN (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why do K-Means clustering algorithms form elongated, distorted strip clusters on unscaled data instead of natural compact spherical clusters?",
    options: [
      "Because K-Means optimizes the sum of squared Euclidean distances (inertia), which treats a 1-unit error in a large-scale feature with the same weight as a 1-unit error in a small-scale feature",
      "Because K-Means requires all data points to lie strictly on the unit circle",
      "Because K-Means only clusters integers",
      "Because the cluster centroid is calculated as the median rather than the mean"
    ],
    correctIndex: 0,
    explanation: "K-Means minimizes inertia sum ||x_i - mu_c||^2. If feature 1 spans [0, 100,000] and feature 2 spans [0, 10], any partitioning along feature 2 reduces inertia by at most 100, whereas partitioning along feature 1 reduces inertia by billions. K-Means will slice the data into parallel slabs along feature 1, completely ignoring the distribution of feature 2.",
    practicalTip: "Always scale data before K-Means clustering. An unscaled K-Means model is functionally equivalent to 1-dimensional clustering along the highest-variance column.",
    codeSnippet: "# Pipeline for K-Means with scaling\nfrom sklearn.cluster import KMeans\nkmeans_pipe = make_pipeline(StandardScaler(), KMeans(n_clusters=3))",
    examRelevance: "Clustering Algorithms & Voronoi Tessellations"
  },
  {
    id: 18,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "When training a Logistic Regression model using Stochastic Gradient Descent (SGD), why does unscaled data lead to severe convergence delays even though the model is convex?",
    options: [
      "Because the loss function ceases to be convex when features are unscaled",
      "Because the gradient vector points almost perpendicular to the path toward the minimum, causing SGD to oscillate wildly across the steep ravine walls while taking tiny steps along the true descent axis",
      "Because Logistic Regression cannot calculate log-odds on numbers greater than 1.0",
      "Because unscaled data causes the learning rate to automatically reset to zero"
    ],
    correctIndex: 1,
    explanation: "Even though cross-entropy loss is convex, unscaled features create elongated elliptical level curves with high condition numbers. Gradients point in the direction of steepest local ascent (perpendicular to contour tangents), which points toward the opposite valley wall rather than along the valley floor to the minimum, resulting in wasteful zig-zag trajectories.",
    practicalTip: "Standardizing features transforms elliptical level curves into near-circular shapes, allowing SGD to take direct paths to the optimal weights.",
    codeSnippet: "from sklearn.linear_model import SGDClassifier\nsgd_pipe = make_pipeline(StandardScaler(), SGDClassifier(loss='log_loss'))",
    examRelevance: "Stochastic Gradient Descent & Convex Optimization"
  },
  {
    id: 19,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "What catastrophic engineering error occurs when StandardScaler(with_mean=True) is applied to a large scipy CSR sparse matrix (e.g., TF-IDF text features)?",
    options: [
      "The scaler silently deletes all non-zero entries",
      "Subtracting the non-zero mean from every implicit zero in the sparse matrix replaces all zeros with -mu, causing the matrix to become 100% dense and instantly exhausting server RAM",
      "The sparse matrix transposes itself automatically",
      "The Python garbage collector terminates the program"
    ],
    correctIndex: 1,
    explanation: "Sparse matrices store only non-zero coordinates to save gigabytes of memory. Centering data (with_mean=True) subtracts the column mean mu from every entry. Since mu is almost never zero, all millions of implicit zeros become non-zero values (-mu), destroying the sparse structure and expanding a 50MB matrix into a 32GB dense array that crashes production servers.",
    practicalTip: "On sparse data, always use MaxAbsScaler() or StandardScaler(with_mean=False). This scales variance without destroying the zero-sparsity structure.",
    codeSnippet: "# Safe scaling for sparse matrices:\nfrom sklearn.preprocessing import MaxAbsScaler\nsparse_scaler = MaxAbsScaler()\nX_sparse_scaled = sparse_scaler.fit_transform(X_sparse)",
    examRelevance: "High-Dimensional Sparse Matrices & Memory Management"
  },
  {
    id: 20,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "What is the critical rule regarding the placement of feature scaling during K-Fold Cross-Validation to prevent data leakage?",
    options: [
      "Fit the scaler on the entire dataset before splitting into folds, because more data gives a better mean estimate",
      "Fit the scaler strictly on the training fold (X_train_fold) during each split, and use those frozen training parameters to transform the validation fold (X_val_fold)",
      "Re-scale each row independently inside a for loop",
      "Fit the scaler only on the validation fold"
    ],
    correctIndex: 1,
    explanation: "If you scale the entire dataset prior to cross-validation, the calculated mean and standard deviation incorporate information from the validation/test folds. This subtle data leakage artificially boosts cross-validation accuracy, masking true production generalization errors. You must fit the scaler strictly on training folds.",
    practicalTip: "Use scikit-learn's Pipeline inside cross_val_score to automatically guarantee that fit_transform is called only on training splits.",
    codeSnippet: "from sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import Pipeline\npipe = Pipeline([('scaler', StandardScaler()), ('knn', KNeighborsClassifier())])\nscores = cross_val_score(pipe, X, y, cv=5) # Guaranteed leak-free!",
    examRelevance: "Cross-Validation Protocols & Data Leakage Prevention"
  },
  {
    id: 21,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "When should an ML engineer select RobustScaler (median and IQR) over StandardScaler (mean and standard deviation)?",
    options: [
      "When the dataset contains severe outliers or heavy-tailed distributions that would heavily bias the sample mean and artificially inflate standard deviation",
      "When the dataset has fewer than 5 rows",
      "When all features are categorical text strings",
      "When training a Decision Tree"
    ],
    correctIndex: 0,
    explanation: "StandardScaler computes sample mean and standard deviation, both of which have a 0% breakdown point—a single extreme outlier can inflate the standard deviation by 1000x, shrinking all normal data into a tiny cluster near 0. RobustScaler uses the median and Interquartile Range (IQR = Q3 - Q1), both of which are robust to outliers.",
    practicalTip: "For financial fraud detection or real estate data with extreme luxury estates, RobustScaler provides far cleaner feature envelopes than StandardScaler.",
    codeSnippet: "from sklearn.preprocessing import RobustScaler\nrobust_scaler = RobustScaler()\nX_robust = robust_scaler.fit_transform(X_with_outliers)",
    examRelevance: "Robust Statistics & Outlier-Resilient Scaling"
  },
  {
    id: 22,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why should binary one-hot encoded dummy variables (values strictly 0 and 1) generally NOT be standardized using StandardScaler?",
    options: [
      "Because standardizing binary variables transforms {0, 1} into arbitrary floating points (e.g. -0.42 and +2.38), destroying categorical interpretability and introducing non-zero values into sparse matrices",
      "Because StandardScaler crashes when given binary numbers",
      "Because binary numbers cannot be subtracted from their mean",
      "Because one-hot encoding requires complex eigenvalues"
    ],
    correctIndex: 0,
    explanation: "One-hot features represent presence/absence indicators with a natural geometric range of [0, 1]. Applying StandardScaler centers them to -p/sqrt(p*(1-p)) and (1-p)/sqrt(p*(1-p)), destroying their binary interpretability, stripping sparse matrices of their zeros, and skewing regularized models.",
    practicalTip: "Use ColumnTransformer to apply StandardScaler strictly to continuous numerical columns while passing one-hot encoded columns through unchanged.",
    codeSnippet: "from sklearn.compose import ColumnTransformer\npreprocessor = ColumnTransformer([\n    ('num', StandardScaler(), ['age', 'income']),\n    ('cat', 'passthrough', ['is_kolkata', 'is_barrackpore'])\n])",
    examRelevance: "Mixed-Type Preprocessing & ColumnTransformer Architecture"
  },
  {
    id: 23,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "If a regression model is trained on a scaled target variable y_scaled = (y - mu_y) / sigma_y, what essential step must be executed before reporting Root Mean Squared Error (RMSE) to business stakeholders?",
    options: [
      "Multiply RMSE by 100 to convert it into a percentage",
      "Invert the predicted target values back to their native physical units (e.g. Rupees or Liters) using y_pred_native = y_pred_scaled * sigma_y + mu_y before computing final business metrics",
      "Square the predictions to make them positive",
      "Discard the predictions because target scaling is irreversible"
    ],
    correctIndex: 1,
    explanation: "Reporting that your housing price model has an RMSE of 0.42 scaled units is meaningless to business leaders. Predictions must be unscaled using the inverse transformation y_pred = y_pred_scaled * sigma_y + mu_y so that evaluation metrics reflect actual monetary errors (e.g. RMSE = ₹3,45,000).",
    practicalTip: "Scikit-learn's TransformedTargetRegressor automatically handles target scaling and inverse transformation during predict().",
    codeSnippet: "from sklearn.compose import TransformedTargetRegressor\nregr = TransformedTargetRegressor(regressor=Ridge(), transformer=StandardScaler())\nregr.fit(X, y)\ny_pred = regr.predict(X_test) # Output is automatically in native units!",
    examRelevance: "Target Transformation Pipelines & Business Metrics"
  },
  {
    id: 24,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "How does feature scaling impact the initialization of weights in Deep Neural Networks under Xavier (Glorot) or He (Kaiming) initialization schemes?",
    options: [
      "It has no impact because neural networks ignore input scales",
      "Xavier and He initialization mathematically assume that input features have variance approximately equal to 1.0; unscaled inputs invalidate variance propagation, causing internal layer activations to explode or vanish",
      "It prevents backpropagation from computing cross-entropy loss",
      "It forces all weights in the hidden layers to be equal to zero"
    ],
    correctIndex: 1,
    explanation: "Xavier initialization sets weight variances Var(W) = 2 / (n_in + n_out) under the explicit theoretical assumption that inputs have Var(X) = 1.0, ensuring that activation variances remain stable across deep layers. If an unscaled feature has Var(X) = 10^8, initial layer activations explode by 10^8, blowing past activation limits and halting training.",
    practicalTip: "Always scale inputs to unit variance before feeding them into deep neural networks to maintain the mathematical guarantees of modern weight initializers.",
    codeSnippet: "# Variance stability proof:\n# Var(Z) = n_in * Var(W) * Var(X) -> Only equals 1.0 when Var(X) = 1.0!",
    examRelevance: "Deep Learning Initialization Dynamics & Variance Propagation"
  },

  // =========================================================================
  // TIER 4: PRODUCTION DIAGNOSTICS & SCALABILITY (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "A production model preprocessed with MinMaxScaler(feature_range=(0, 1)) receives a live incoming request with feature value x_new > x_max_train. What occurs, and how should it be handled defensively?",
    options: [
      "The Python runtime raises a fatal MemoryError",
      "MinMaxScaler outputs a value greater than 1.0 (e.g. 1.45), potentially breaking downstream assumptions; it should be configured with clip=True to cap outputs at 1.0 or switched to RobustScaler",
      "MinMaxScaler sets the output to NaN",
      "The server restarts automatically"
    ],
    correctIndex: 1,
    explanation: "By default, MinMaxScaler computes (x - min) / (max - min). If a live production record arrives with a value exceeding the training maximum, the transformed value will exceed 1.0. If downstream logic (e.g. image pixel normalization or neural net inputs) strictly expects [0, 1], this causes silent degradation. Setting clip=True bounds production values into [0, 1].",
    practicalTip: "In scikit-learn >= 0.24, always instantiate MinMaxScaler(clip=True) when deploying to live production serving environments.",
    codeSnippet: "from sklearn.preprocessing import MinMaxScaler\nsafe_scaler = MinMaxScaler(clip=True)\nX_prod_scaled = safe_scaler.fit(X_train).transform(X_unseen)",
    examRelevance: "Production Reliability & Out-of-Bounds Handling"
  },
  {
    id: 26,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In an enterprise credit scoring pipeline in Salt Lake Sector V, an engineer deploys a model where features are scaled at training time, but the serving microservice forgets to scale incoming JSON payloads. What is the observable production symptom?",
    options: [
      "The microservice crashes with an HTTP 500 error immediately",
      "The microservice silently returns valid HTTP 200 responses, but predictions are wildly inaccurate (e.g. 100% of applicants are rejected) because raw large inputs cause dot products w^T x to blow up into extreme logits",
      "The model retraining job deletes the database",
      "The client receives an invalid SSL certificate"
    ],
    correctIndex: 1,
    explanation: "This is a classic 'silent production failure'. Because JSON formats numbers identically, the model accepts the raw income (e.g. 500,000 instead of scaled 0.42). The dot product w^T x becomes massive (e.g. +50,000), forcing the sigmoid probability to 1.0 or 0.0 regardless of actual applicant risk, silently ruining credit approvals.",
    practicalTip: "Always package the scaler and model into a single serialized Scikit-Learn Pipeline or ONNX model artifact so that unscaled inputs cannot bypass the scaler.",
    codeSnippet: "# Serialize the full pipeline to prevent serving omissions\nimport joblib\njoblib.dump(full_pipeline, 'credit_model_v1.joblib')",
    examRelevance: "MLOps Production Antipatterns & Silent Failures"
  },
  {
    id: 27,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "When explaining model predictions to loan officers using SHAP (SHapley Additive exPlanations), how should feature importance and values be displayed if the model was trained on standardized features?",
    options: [
      "Display scaled z-scores directly and instruct loan officers to interpret standard deviations",
      "Use the scaler's inverse_transform() to display raw business units (e.g. 'Income = ₹4,50,000') alongside SHAP impact scores, ensuring human-interpretable explanations",
      "Re-train an unscaled model specifically for generating explanations",
      "Hide feature values and show only the final approve/reject prediction"
    ],
    correctIndex: 1,
    explanation: "Business stakeholders and regulators cannot make underwriting decisions based on z-scores like 'Applicant Income = -0.38'. Production explainability systems must map scaled feature coordinates back to native domain units (e.g. ₹4,50,000) using inverse_transform while computing SHAP attributions.",
    practicalTip: "SHAP allows passing raw feature DataFrames as the display parameter: shap.plots.waterfall(shap_values[0], display_features=df_raw.iloc[0]).",
    codeSnippet: "# Human-interpretable SHAP waterfall plot\nimport shap\nexplainer = shap.Explainer(model, X_train_scaled)\nshap_values = explainer(X_test_scaled)\n# Use native unscaled data for visualization display",
    examRelevance: "Explainable AI (XAI) & Regulatory Compliance"
  },
  {
    id: 28,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In streaming real-time applications (e.g., IoT sensor telemetry from CESC substations), why is it dangerous to compute moving standard deviations for feature scaling on single incoming batches?",
    options: [
      "Single-batch statistics suffer from high variance and concept drift; a sudden spike in a single micro-batch will artificially shrink the scale of all subsequent points in that batch",
      "Micro-batches cannot be processed using floating-point math",
      "Streaming systems only support integer data types",
      "Kafka does not allow data transformations"
    ],
    correctIndex: 0,
    explanation: "If streaming micro-batches compute scaling parameters dynamically on tiny windows (e.g. n = 10 samples), the estimated mean and variance will fluctuate wildly. An anomaly in one window will artificially inflate variance and mute true subsequent anomalies. Streaming systems must use frozen training scalers or exponential moving average (EMA) moment trackers.",
    practicalTip: "Deploy an Exponential Moving Average (EMA) Scaler with momentum=0.999 or use static parameters fitted on historical baseline data.",
    codeSnippet: "# Incremental scaling using partial_fit\nfrom sklearn.preprocessing import StandardScaler\ninc_scaler = StandardScaler()\nfor batch in stream:\n    inc_scaler.partial_fit(batch) # Updates running mean and variance safely",
    examRelevance: "Real-Time Streaming Systems & Online Preprocessing"
  },
  {
    id: 29,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "When comparing MaxAbsScaler vs MinMaxScaler, what unique property makes MaxAbsScaler preferable for centering-sensitive algorithms?",
    options: [
      "MaxAbsScaler scales features by dividing by the maximum absolute value without shifting the mean, strictly preserving exact zero entries and algebraic signs",
      "MaxAbsScaler guarantees that all values are positive",
      "MaxAbsScaler runs 10 times faster than all other scalers",
      "MaxAbsScaler automatically removes outliers"
    ],
    correctIndex: 0,
    explanation: "MaxAbsScaler computes x / max(|x|), mapping values into [-1.0, +1.0] without subtracting any constant. Because it does not shift the center of the data (0 remains exactly 0), it preserves the sign of positive and negative numbers and maintains 100% of the sparsity structure in sparse matrix representations.",
    practicalTip: "MaxAbsScaler is specifically engineered for sparse datasets and features already centered at zero with mixed signs.",
    codeSnippet: "from sklearn.preprocessing import MaxAbsScaler\nscaler = MaxAbsScaler()\nX_scaled = scaler.fit_transform(X_sparse)",
    examRelevance: "Sparsity Preservation & Scaler Taxonomies"
  },
  {
    id: 30,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "A multi-tenant SaaS ML platform serves clients in Kolkata (operating in INR) and London (operating in GBP). If both tenants submit revenue figures to a shared global regression model, what will happen if currency scaling is ignored?",
    options: [
      "The model will automatically query currency exchange rates via foreign exchange APIs",
      "The model will perceive INR revenues (e.g. 10,00,000) as being 100,000 times larger than GBP revenues (e.g. 10,000), making completely invalid cross-tenant predictions",
      "The weights will become imaginary numbers",
      "The database will refuse to store GBP currency symbols"
    ],
    correctIndex: 1,
    explanation: "Machine learning models have zero intrinsic understanding of economic purchasing power or currency exchange rates—they only see raw scalar numbers. Without normalizing revenues into a single standard base currency (e.g. USD) and subsequently standardizing, the model's predictions for foreign currency tenants will be completely corrupted.",
    practicalTip: "Always normalize currency, imperial/metric distance, and temperature units into a canonical baseline before applying standard statistical scalers.",
    codeSnippet: "# Canonical currency conversion before statistical scaling\ndf['revenue_usd'] = df.apply(lambda r: r['revenue'] * fx_rates[r['currency']], axis=1)\nX_scaled = StandardScaler().fit_transform(df[['revenue_usd']])",
    examRelevance: "Multi-Tenant Data Architecture & Currency Normalization"
  }
];

export default questions;
