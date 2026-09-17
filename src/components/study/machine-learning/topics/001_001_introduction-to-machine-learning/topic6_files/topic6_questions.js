/**
 * Topic 6: Semi-Supervised Learning
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is the fundamental setup and motivation behind Semi-Supervised Learning?",
    "shortAnswer": "Leveraging a small amount of labeled data L alongside a large corpus of unlabeled data U (where |U| >> |L|) to build more accurate predictive models.",
    "explanation": "In real-world applications (e.g. medical pathology, speech recognition, legal document analysis), acquiring labeled targets requires expensive, time-consuming human expert annotation, whereas unlabeled raw data is cheap and abundant. Semi-supervised learning exploits the geometry of U to improve generalization.",
    "hint": "Small labeled subset + huge unlabeled pool to reduce human annotation costs.",
    "level": "Basic",
    "codeExample": "# Labeled: (X_labeled, y_labeled) [e.g. 500 samples]\n# Unlabeled: X_unlabeled [e.g. 50,000 samples]"
  },
  {
    "id": 2,
    "question": "What are the three core structural assumptions that enable Semi-Supervised Learning to work?",
    "shortAnswer": "Smoothness Assumption, Cluster Assumption (Low-Density Separation), and Manifold Assumption.",
    "explanation": "1. Smoothness: If two points x_1, x_2 are close in high-density space, their labels y_1, y_2 should be identical. 2. Cluster: The decision boundary should pass through low-density regions (not slice through dense clusters). 3. Manifold: High-dimensional data lies on a lower-dimensional Riemannian manifold.",
    "hint": "Smoothness, low-density decision boundaries, and lower-dimensional manifold geometry.",
    "level": "Expert",
    "codeExample": "# Assumption: Decision boundary w^T x + b = 0 lies in low data-density gaps"
  },
  {
    "id": 3,
    "question": "How does the Self-Training (Pseudo-Labeling) algorithm operate?",
    "shortAnswer": "Train a base classifier on labeled data L, predict probabilities on unlabeled data U, add highly confident pseudo-labeled samples into L, and retrain iteratively.",
    "explanation": "In Self-Training, the model acts as its own teacher. Unlabeled samples where the predicted maximum class probability exceeds a high confidence threshold (e.g., max_k P(y=k|x) > 0.95) are assigned pseudo-labels and concatenated with the genuine training set for the next iteration.",
    "hint": "Iterative bootstrap training on top confident model predictions.",
    "level": "Basic",
    "codeExample": "from sklearn.semi_supervised import SelfTrainingClassifier\nfrom sklearn.svm import SVC\nbase_svc = SVC(probability=True, gamma='auto')\nself_trainer = SelfTrainingClassifier(base_svc, threshold=0.9, max_iter=10)\nself_trainer.fit(X_combined, y_combined_with_neg1)"
  },
  {
    "id": 4,
    "question": "What is 'Confirmation Bias' (Error Propagation) in Self-Training, and how can it degrade model accuracy?",
    "shortAnswer": "When the model assigns an incorrect pseudo-label with high confidence, reinforcing its own mistake in subsequent training iterations.",
    "explanation": "If an initial weak classifier erroneously labels an out-of-distribution unlabeled sample with high probability, that false label becomes ground truth in future epochs. The model repeatedly learns from its own hallucinations, drifting away from the true data distribution.",
    "hint": "Self-reinforcing feedback loops of false high-confidence pseudo-labels.",
    "level": "Moderate",
    "codeExample": "# Mitigation: Use high confidence threshold (tau=0.95) and label smoothing"
  },
  {
    "id": 5,
    "question": "How does Label Propagation work in semi-supervised graph-based learning?",
    "shortAnswer": "By constructing a similarity graph over all data points and propagating known labels across graph edges via random walk transition probabilities until convergence.",
    "explanation": "An affinity matrix W is constructed using an RBF kernel W_{ij} = exp(-\u03b3 ||x_i - x_j||^2). Label distributions Y are iteratively updated as Y^{(t+1)} = D^{-1} W Y^{(t)}, while clamping the initial labeled instances to their true ground truth at every iteration.",
    "hint": "Heat diffusion / random walk of labels across a fully connected similarity graph.",
    "level": "Moderate",
    "codeExample": "from sklearn.semi_supervised import LabelPropagation\nlabel_prop = LabelPropagation(kernel='rbf', gamma=20, max_iter=1000)\nlabel_prop.fit(X_combined, y_combined_with_neg1)"
  },
  {
    "id": 6,
    "question": "What is the difference between Label Propagation and Label Spreading in scikit-learn?",
    "shortAnswer": "Label Propagation clamps initial labels strictly (hard clamping); Label Spreading uses normalized Graph Laplacian with soft clamping (regularization).",
    "explanation": "Label Spreading optimizes an objective with a regularization parameter \u03b1 \u2208 (0, 1) that allows the algorithm to adjust slightly noisy initial labels: Y^{(t+1)} = \u03b1 S Y^{(t)} + (1 - \u03b1) Y^{(0)}, where S is the normalized graph Laplacian D^{-1/2} W D^{-1/2}. This makes Label Spreading more robust to label noise.",
    "hint": "Hard label clamping vs softly regularized normalized Laplacian diffusion.",
    "level": "Expert",
    "codeExample": "from sklearn.semi_supervised import LabelSpreading\nlabel_spread = LabelSpreading(kernel='rbf', alpha=0.2, max_iter=30)\nlabel_spread.fit(X_combined, y_combined_with_neg1)"
  },
  {
    "id": 7,
    "question": "In scikit-learn semi-supervised estimators, how are unlabeled samples represented in the target array `y`?",
    "shortAnswer": "By assigning the integer value `-1` to all unlabeled data points in the target vector.",
    "explanation": "Scikit-learn convention requires labeled instances to have integer class tags 0, 1, ..., K-1, while all unlabeled instances are marked with `-1`. Estimators like `LabelPropagation`, `LabelSpreading`, and `SelfTrainingClassifier` identify `-1` as missing labels to infer.",
    "hint": "Negative one (-1) represents unlabeled instances.",
    "level": "Basic",
    "codeExample": "import numpy as np\ny_semi = np.copy(y_true)\ny_semi[unlabeled_indices] = -1 # Flagged for semi-supervised inference"
  },
  {
    "id": 8,
    "question": "What is the Co-Training paradigm in Semi-Supervised Learning?",
    "shortAnswer": "Training two separate classifiers on two conditionally independent feature views of the data, each pseudo-labeling unlabeled examples to teach the other.",
    "explanation": "Introduced by Blum and Mitchell (1998), Co-Training requires features to be split into two views X = (X_1, X_2) that are conditionally independent given class y. Classifier 1 (trained on X_1) pseudo-labels its most confident samples and adds them to Classifier 2's training set (trained on X_2), and vice-versa.",
    "hint": "Two independent feature views teaching each other iteratively (e.g. web page text vs hyperlink anchor text).",
    "level": "Expert",
    "codeExample": "# View 1: Web page body text -> Model 1\n# View 2: Inbound anchor link text -> Model 2\n# Model 1 teaches Model 2 on unlabeled web pages"
  },
  {
    "id": 9,
    "question": "What is Transductive Learning versus Inductive Learning in the semi-supervised context?",
    "shortAnswer": "Transductive predicts labels only for the specific given unlabeled points U; Inductive learns a general mapping function f(x) for any future unseen test point.",
    "explanation": "Transductive algorithms (like Graph Label Propagation) operate directly on the closed dataset L \u222a U and cannot predict on a new point x_new without rebuilding the graph. Inductive algorithms (like Self-Training or Semi-Supervised SVMs) output a parameterized decision function f(x) usable on arbitrary new samples.",
    "hint": "Predicting on given unlabeled pool vs learning a generalizable decision rule for future queries.",
    "level": "Moderate",
    "codeExample": "# Transductive: Evaluates existing unlabeled graph nodes directly\n# Inductive: model.predict(X_novel_test_point)"
  },
  {
    "id": 10,
    "question": "What is a Semi-Supervised Support Vector Machine (S3VM / Transductive SVM)?",
    "shortAnswer": "An SVM formulation that maximizes the margin over labeled points while placing the hyperplane through the lowest-density clearance gap of unlabeled points.",
    "explanation": "S3VM incorporates an unlabeled loss term min_{w, b, y_u} (1/2)||w||^2 + C \u2211 L(y_l, w^T x_l + b) + C* \u2211 L(y_u, w^T x_u + b), searching for both optimal weights w and optimal binary label assignments y_u \u2208 {-1, +1} on unlabeled points that maximize margin separation.",
    "hint": "Finds a wide-margin hyperplane passing through the emptiest region of unlabeled data.",
    "level": "Expert",
    "codeExample": "# S3VM Objective: Penalizes hyperplane from passing through dense unlabeled clusters"
  },
  {
    "id": 11,
    "question": "How does Semi-Supervised learning with Generative Mixture Models (EM with missing labels) work?",
    "shortAnswer": "The joint likelihood combines labeled sample log-probabilities with unlabeled marginal log-probabilities, optimized via the EM algorithm.",
    "explanation": "Total log-likelihood is log L(\u03b8) = \u2211_{i\u2208L} log [P(y_i|\u03b8) P(x_i|y_i, \u03b8)] + \u2211_{j\u2208U} log [\u2211_k P(y_j=k|\u03b8) P(x_j|y_j=k, \u03b8)]. The labeled data pins down component identities, while the unlabeled data refines mean \u03bc_k and covariance \u03a3_k estimates.",
    "hint": "EM joint likelihood optimization over known and marginal missing class components.",
    "level": "Expert",
    "codeExample": "# Labeled data sets initial Gaussian component means; Unlabeled data refines covariance shapes"
  },
  {
    "id": 12,
    "question": "What is the Manifold Regularization framework (e.g., Laplacian SVM)?",
    "shortAnswer": "Augmenting standard supervised loss with an intrinsic graph Laplacian penalty: J(f) = Supervised_Loss + \u03b3_A ||f||_K^2 + \u03b3_I f^T L f.",
    "explanation": "The term f^T L f = (1/2) \u2211_{i,j} W_{ij} (f(x_i) - f(x_j))^2 penalizes sharp changes in function predictions between neighboring points along the data manifold. This ensures the learned hypothesis varies smoothly across the high-density data manifold.",
    "hint": "Penalizes model output differences between adjacent data points on the manifold graph.",
    "level": "Expert",
    "codeExample": "# Manifold penalty = sum(W_ij * (f(x_i) - f(x_j))**2)"
  },
  {
    "id": 13,
    "question": "What is Consistency Regularization in modern semi-supervised deep learning (e.g., FixMatch, MixMatch)?",
    "shortAnswer": "Enforcing that model predictions on a weakly augmented sample match predictions on a strongly augmented version of the same unlabeled sample.",
    "explanation": "Consistency regularization states that small perturbations to input x (e.g., cropping, color jitter, Gaussian noise) should not alter predicted class probability P(y | x). The loss term L_u = ||f_\u03b8(Augment(x)) - f_\u03b8(x)||^2 forces the model to be robust and stable across local neighborhoods.",
    "hint": "Enforcing identical predictions on perturbed or augmented copies of unlabeled images.",
    "level": "Expert",
    "codeExample": "# Consistency loss: mse(model(weak_augmented_x), model(strong_augmented_x))"
  },
  {
    "id": 14,
    "question": "What is FixMatch, and how does it combine Pseudo-Labeling with Consistency Regularization?",
    "shortAnswer": "It generates a hard pseudo-label from a weakly augmented image if confidence exceeds threshold \u03c4 (e.g. 0.95), then trains the model to predict that label on a strongly augmented version.",
    "explanation": "1. Pass unlabeled image x_u through weak augmentation (flip/shift) \u2192 get probability p_u. 2. If max(p_u) \u2265 \u03c4, create one-hot pseudo-label q_u = argmax(p_u). 3. Pass x_u through strong augmentation (AutoAugment/Cutout) \u2192 get p_strong. 4. Compute cross-entropy loss H(q_u, p_strong).",
    "hint": "Weak augmentation pseudo-labels guide strong augmentation training.",
    "level": "Expert",
    "codeExample": "# FixMatch: If max(p_weak) > 0.95: loss = cross_entropy(p_strong, argmax(p_weak))"
  },
  {
    "id": 15,
    "question": "Why can Semi-Supervised Learning sometimes perform WORSE than purely Supervised Learning?",
    "shortAnswer": "When model structural assumptions (smoothness, cluster separation) fail to hold, unlabeled data injects misleading inductive bias and reinforces incorrect pseudo-labels.",
    "explanation": "If class boundaries do not lie in low-density regions, or if the labeled data is non-representative (biased sample), forcing the decision boundary away from unlabeled data clusters will push it into the wrong location. In such cases, unlabeled data introduces negative transfer.",
    "hint": "Violating the low-density cluster assumption leads to negative transfer.",
    "level": "Moderate",
    "codeExample": "# Negative transfer occurs when unlabeled distribution misaligns with true class boundaries"
  },
  {
    "id": 16,
    "question": "How can Active Learning be contrasted with Semi-Supervised Learning?",
    "shortAnswer": "Active Learning queries an expert human oracle to label the most uncertain points; Semi-Supervised learning infers labels autonomously without human intervention.",
    "explanation": "In Active Learning, the algorithm actively identifies high-uncertainty instances (e.g. near the decision boundary) and requests ground-truth labels from a human annotator. In Semi-Supervised learning, the algorithm leverages unlabeled data algorithmically using mathematical assumptions without requesting external human feedback.",
    "hint": "Human-in-the-loop query strategy vs automated algorithmic exploitation of unlabeled geometry.",
    "level": "Moderate",
    "codeExample": "# Active Learning: queries human for label of x where P(y=1|x) \u2248 0.5\n# Semi-Supervised: autonomously pseudo-labels x where P(y=1|x) > 0.95"
  },
  {
    "id": 17,
    "question": "What is the RBF (Radial Basis Function) affinity kernel used in graph construction for semi-supervised learning?",
    "shortAnswer": "W_{ij} = exp(-\u03b3 ||x_i - x_j||^2) = exp(- ||x_i - x_j||^2 / (2 \u03c3^2)).",
    "explanation": "The RBF kernel computes a continuous similarity score between 0 and 1. If two points are identical, W_{ii} = 1.0; as distance increases, similarity decays exponentially toward 0. The hyperparameter \u03b3 controls how rapidly affinity drops with distance.",
    "hint": "Gaussian bell-curve similarity metric between pairwise feature vectors.",
    "level": "Moderate",
    "codeExample": "import numpy as np\ndef rbf_kernel(x1, x2, gamma=1.0):\n    dist_sq = np.sum((x1 - x2) ** 2)\n    return np.exp(-gamma * dist_sq)"
  },
  {
    "id": 18,
    "question": "What is the Graph Laplacian matrix L and its normalized version L_norm?",
    "shortAnswer": "Unnormalized: L = D - W; Normalized: L_sym = D^{-1/2} L D^{-1/2} = I - D^{-1/2} W D^{-1/2} (where D is the diagonal degree matrix).",
    "explanation": "The degree matrix D is diagonal with D_{ii} = \u2211_j W_{ij}. The Graph Laplacian measures how a signal diverges from its local neighborhood mean. It plays a central role in manifold regularization, spectral clustering, and label spreading.",
    "hint": "Degree matrix minus adjacency weight matrix.",
    "level": "Expert",
    "codeExample": "# Graph Laplacian computation\nD = np.diag(np.sum(W, axis=1))\nL = D - W"
  },
  {
    "id": 19,
    "question": "What is Entropy Regularization (Shannon Entropy Minimization) on unlabeled data?",
    "shortAnswer": "Adding a loss term that minimizes the entropy of predicted probabilities on unlabeled data: L_entropy = - \u2211_{k=1}^K P(y=k|x_u) log P(y=k|x_u).",
    "explanation": "High entropy means the model is uncertain (e.g. 50/50 probability), which occurs when the decision boundary passes right through a data cluster. Minimizing entropy forces the model to make confident, decisive predictions near 0 or 1 on unlabeled samples, pushing the boundary into low-density valleys.",
    "hint": "Forces the model to output confident predictions (near 0 or 1) on unlabeled instances.",
    "level": "Expert",
    "codeExample": "# Entropy penalty: Forces sharp confident predictions on unlabeled points\ndef entropy_loss(probs):\n    return -np.sum(probs * np.log(probs + 1e-12), axis=-1)"
  },
  {
    "id": 20,
    "question": "What is the role of the 'Temperature' parameter T in Softmax sharpening for pseudo-labeling?",
    "shortAnswer": "It scales logits before softmax: p_k = exp(z_k / T) / \u2211 exp(z_j / T); T < 1 sharpens the distribution toward a one-hot vector.",
    "explanation": "Lowering temperature T (e.g., T = 0.5) exaggerates the difference between high and low logits, turning soft probability distributions into confident, sharp categorical targets. When T \u2192 0, softmax approaches the argmax step function.",
    "hint": "Temperature scaling controls the sharpness or softness of probability distributions.",
    "level": "Moderate",
    "codeExample": "def sharpened_softmax(logits, T=0.5):\n    scaled = logits / T\n    exp_s = np.exp(scaled - np.max(scaled))\n    return exp_s / np.sum(exp_s)"
  },
  {
    "id": 21,
    "question": "What is Semi-Supervised Clustering (Constrained Clustering)?",
    "shortAnswer": "Clustering guided by domain background knowledge expressed as Must-Link and Cannot-Link pairwise constraints.",
    "explanation": "Must-Link constraint (x_i, x_j) specifies that two samples must be assigned to the same cluster. Cannot-Link constraint (x_a, x_b) specifies that two samples must never share a cluster. Algorithms like COP-KMeans enforce these constraints during centroid assignment.",
    "hint": "Must-Link (same cluster) and Cannot-Link (different cluster) supervisor hints.",
    "level": "Moderate",
    "codeExample": "# COP-KMeans: Rejects centroid assignments that violate Must-Link or Cannot-Link constraints"
  },
  {
    "id": 22,
    "question": "How can Semi-Supervised Learning be implemented via Unsupervised Pre-training followed by Supervised Fine-Tuning?",
    "shortAnswer": "Train an autoencoder or contrastive model on all data (L \u222a U) to learn general representations, then fine-tune a classification head on labeled data L.",
    "explanation": "This two-stage approach is the dominant paradigm in modern foundation models (e.g., BERT, GPT, Vision Transformers). Stage 1 learns rich contextual feature embeddings from massive unlabeled datasets; Stage 2 updates weights using cross-entropy on the small labeled target dataset.",
    "hint": "Pre-train representation encoder on unlabeled data, fine-tune linear head on labeled data.",
    "level": "Moderate",
    "codeExample": "# Step 1: encoder = train_masked_autoencoder(X_all)\n# Step 2: classifier = train_head(encoder(X_labeled), y_labeled)"
  },
  {
    "id": 23,
    "question": "What is Tri-Training in Semi-Supervised Learning?",
    "shortAnswer": "An extension of Co-Training that uses three classifiers; an unlabeled sample is pseudo-labeled for the 3rd classifier if the other 2 agree on its label.",
    "explanation": "Tri-Training eliminates the strict requirement for two conditionally independent feature views. Three diverse classifiers are trained on bootstrap resamples of L. If classifier 1 and classifier 2 agree on an unlabeled sample's prediction, it is safely pseudo-labeled and added to classifier 3's training set.",
    "hint": "2-out-of-3 agreement voting to validate pseudo-labels without separate feature views.",
    "level": "Expert",
    "codeExample": "# If Model_A.predict(x) == Model_B.predict(x): Model_C.train_on(x, label)"
  },
  {
    "id": 24,
    "question": "What is the k-Nearest Neighbor Graph construction method for Label Propagation?",
    "shortAnswer": "Connecting each data point only to its k nearest Euclidean neighbors in the affinity matrix W, creating a sparse graph.",
    "explanation": "Instead of building a dense N x N matrix (which scales poorly as O(N^2) memory), the k-NN graph connects each node only to its k closest neighbors: W_{ij} = exp(-\u03b3 ||x_i - x_j||^2) if x_j \u2208 kNN(x_i), else 0. This enables efficient sparse matrix multiplications.",
    "hint": "Sparse affinity matrix retaining only top-k closest Euclidean connections.",
    "level": "Moderate",
    "codeExample": "from sklearn.semi_supervised import LabelPropagation\nlp = LabelPropagation(kernel='knn', n_neighbors=7)"
  },
  {
    "id": 25,
    "question": "What is MixMatch in Semi-Supervised Deep Learning?",
    "shortAnswer": "A holistic framework that unifies pseudo-labeling, consistency regularization with sharpening, and Mixup data augmentation on labeled and unlabeled pools.",
    "explanation": "MixMatch generates low-entropy pseudo-labels for unlabeled data, applies strong augmentations, and mixes both labeled and unlabeled samples using Mixup: x' = \u03bb x_1 + (1 - \u03bb) x_2; y' = \u03bb y_1 + (1 - \u03bb) y_2. This encourages smooth decision boundaries between classes.",
    "hint": "Combines pseudo-labeling, entropy reduction, and Mixup convex linear interpolations.",
    "level": "Expert",
    "codeExample": "# Mixup operation: x_mixed = lambda * x1 + (1 - lambda) * x2"
  },
  {
    "id": 26,
    "question": "Why is semi-supervised learning particularly valuable in Medical Diagnostic Imaging (e.g. MRI, CT scans)?",
    "shortAnswer": "Raw scans are captured in massive numbers during routine clinical exams, but segmenting tumors requires hours of scarce, costly radiologist labor.",
    "explanation": "A hospital may possess 200,000 anonymized chest X-rays (unlabeled), but only 500 scans annotated by expert radiologists. Semi-supervised learning utilizes the 200,000 unlabeled scans to learn anatomical tissue variations, enabling the 500 labeled scans to achieve clinical-grade classification accuracy.",
    "hint": "High cost of certified radiologist annotation vs cheap availability of raw scan archives.",
    "level": "Basic",
    "codeExample": "# Medical pipeline: 200k unlabeled X-rays + 500 radiologist-labeled scans"
  },
  {
    "id": 27,
    "question": "What is the role of Class Balancing in Pseudo-Labeling pipelines?",
    "shortAnswer": "Preventing the model from overwhelmingly pseudo-labeling the majority class and starving minority classes.",
    "explanation": "Because models are naturally more confident in majority classes, naive threshold pseudo-labeling assigns thousands of majority pseudo-labels and almost zero minority pseudo-labels. Class-balanced or curriculum thresholding adjusts the confidence threshold per class dynamically.",
    "hint": "Adaptive per-class thresholds to prevent majority class dominance.",
    "level": "Moderate",
    "codeExample": "# Class-adaptive threshold: tau_c = base_tau * (class_frequency_c / max_freq)"
  },
  {
    "id": 28,
    "question": "What is Virtual Adversarial Training (VAT) in semi-supervised learning?",
    "shortAnswer": "Finding the smallest input perturbation r_vadv that maximizes the change in model output distribution and penalizing it on unlabeled data.",
    "explanation": "VAT computes an adversarial direction r_vadv using the gradient of the KL-divergence D_{KL}(p(y|x) || p(y|x + r)). It minimizes this KL divergence on unlabeled samples, enforcing local distributional smoothness along the most sensitive direction in feature space.",
    "hint": "Adversarial directional perturbation to enforce maximum local smoothness.",
    "level": "Expert",
    "codeExample": "# VAT loss = KL_Divergence(P(y|x_unlabeled), P(y|x_unlabeled + r_vadv))"
  },
  {
    "id": 29,
    "question": "How can Semi-Supervised Learning be evaluated reliably if ground-truth labels for the test set are available to the researcher?",
    "shortAnswer": "By comparing the semi-supervised model against a purely supervised baseline trained exclusively on the small labeled subset L under identical test splits.",
    "explanation": "The primary benchmark is: Performance(Semi-Supervised on L \u222a U) > Performance(Supervised on L alone). If the semi-supervised model matches the performance of a supervised model trained on 10x more labeled data, the label efficiency gain is quantitatively proven.",
    "hint": "Benchmark against baseline trained only on L to quantify label efficiency multiplier.",
    "level": "Moderate",
    "codeExample": "# Benchmark: Supervised(L) vs SemiSupervised(L + U) vs FullySupervised(L + U_ground_truth)"
  },
  {
    "id": 30,
    "question": "What is the overarching advantage of Semi-Supervised Learning in enterprise industry applications?",
    "shortAnswer": "It drastically reduces expensive human labeling bottlenecks while unlocking the latent predictive power of enterprise big data silos.",
    "explanation": "Enterprises collect petabytes of customer clickstreams, sensor logs, voice audio, and text tickets. Semi-supervised learning bridges the gap between massive unlabeled data lakes and strict production accuracy requirements, slashing data labeling budgets by up to 80-90%.",
    "hint": "Slashing data annotation overhead while monetizing large unlabeled data assets.",
    "level": "Basic",
    "codeExample": "# Enterprise ROI: Achieving 94% accuracy with 1,000 labeled records instead of 50,000"
  }
];

export default questions;
