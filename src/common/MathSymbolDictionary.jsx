import React, { useState, useMemo, useCallback } from "react";
import clsx from "clsx";

export const mathSymbolsData = [
  // =========================================================================
  // 1. MACHINE LEARNING & DEEP LEARNING ACTIVATIONS & LOSSES
  // =========================================================================
  {
    id: "sigmoid",
    symbol: "σ(z)",
    latex: "\\sigma(z) = \\frac{1}{1 + e^{-z}}",
    name: "Sigmoid / Logistic Activation",
    pronunciation: "/ˈsɪɡ.mɔɪd/ (SIG-moyd)",
    speakText: "Sigma of z, or Sigmoid function",
    category: "ml",
    subCategory: "Activation Functions",
    tags: ["activation", "logistic", "probability", "neural network", "binary classification"],
    badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800",
    meaning: "Smooth, continuous S-shaped non-linear activation curve that squashes any real-valued number (-∞ to +∞) strictly into the probability interval (0.0, 1.0).",
    example: "P(y = 1 | x) = σ(wᵀx + b) = 1 / (1 + e^{-(wᵀx + b)})",
    codeSnippet: "torch.sigmoid(z)  # or 1 / (1 + np.exp(-z))",
    context: "Calculates the probability that a student passes an exam (e.g. 0.94 => 94% pass probability) or an email is spam."
  },
  {
    id: "relu",
    symbol: "ReLU(z)",
    latex: "\\text{ReLU}(z) = \\max(0, z)",
    name: "Rectified Linear Unit (ReLU)",
    pronunciation: "/ˈrɛl.juː/ (REL-yoo)",
    speakText: "ReLU, Rectified Linear Unit",
    category: "ml",
    subCategory: "Activation Functions",
    tags: ["activation", "deep learning", "neural network", "non-linearity", "sparsity"],
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
    meaning: "Piecewise linear activation function that returns z if positive, and 0 otherwise. Mitigates vanishing gradient problem in deep feedforward and convolutional neural networks.",
    example: "a^{[l]} = \\text{ReLU}(W^{[l]} a^{[l-1]} + b^{[l]})",
    codeSnippet: "import torch.nn as nn\nrelu = nn.ReLU()  # max(0, z)",
    context: "Default activation function used across modern hidden layers in computer vision (CNNs) and dense deep networks."
  },
  {
    id: "softmax",
    symbol: "Softmax(z)",
    latex: "\\text{Softmax}(z_i) = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}",
    name: "Softmax Probability Function",
    pronunciation: "/ˈsɒft.mæks/ (SOFT-max)",
    speakText: "Softmax function",
    category: "ml",
    subCategory: "Activation Functions",
    tags: ["activation", "probability", "multiclass", "classification", "transformers", "attention"],
    badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800",
    meaning: "Generalizes the sigmoid function to multi-class classification, converting a vector of K arbitrary real-valued raw logits into a normalized probability distribution summing to exactly 1.0.",
    example: "\\hat{y}_c = \\frac{\\exp(z_c)}{\\sum_{k=1}^C \\exp(z_k)}, \\quad \\sum_{c=1}^C \\hat{y}_c = 1.0",
    codeSnippet: "torch.softmax(logits, dim=-1)",
    context: "Used in multi-class student grade prediction (Grade A, B, C, D) and attention heads in modern Large Language Models (LLMs)."
  },
  {
    id: "tanh",
    symbol: "tanh(z)",
    latex: "\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}",
    name: "Hyperbolic Tangent Activation",
    pronunciation: "/tæn.tʃ/ or /ˈtæn.dʒənt/ (TAN-h / Hyperbolic Tangent)",
    speakText: "Hyperbolic Tangent of z",
    category: "ml",
    subCategory: "Activation Functions",
    tags: ["activation", "zero-centered", "neural network", "rnn", "lstm"],
    badgeColor: "text-blue-400 bg-blue-950/60 border-blue-800",
    meaning: "Zero-centered S-shaped activation function mapping all real numbers to the interval (-1.0, +1.0). Having mean zero accelerates gradient optimization compared to standard logistic sigmoid.",
    example: "c_t = \\tanh(W_c [h_{t-1}, x_t] + b_c)",
    codeSnippet: "torch.tanh(z)  # or np.tanh(z)",
    context: "Fundamental building block in Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) cell candidate states."
  },
  {
    id: "gelu",
    symbol: "GELU(z)",
    latex: "\\text{GELU}(z) = z \\cdot \\Phi(z) = z \\cdot P(X \\le z), \\quad X \\sim \\mathcal{N}(0, 1)",
    name: "Gaussian Error Linear Unit (GELU)",
    pronunciation: "/ˈdʒɛl.juː/ (JEL-yoo)",
    speakText: "GELU, Gaussian Error Linear Unit",
    category: "ml",
    subCategory: "Activation Functions",
    tags: ["activation", "transformers", "bert", "gpt", "llm", "deep learning"],
    badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
    meaning: "Smooth non-linear activation scaling input z by the cumulative distribution function of the standard normal distribution. Weights inputs by their value rather than gating deterministically.",
    example: "\\text{GELU}(z) \\approx 0.5z \\cdot (1 + \\tanh(\\sqrt{2/\\pi}(z + 0.044715z^3)))",
    codeSnippet: "torch.nn.GELU()",
    context: "The standard activation function inside Transformer feed-forward blocks in GPT-4, BERT, RoBERTa, and Claude."
  },
  {
    id: "loss_bce",
    symbol: "ℒ_BCE",
    latex: "\\mathcal{L}_{\\text{BCE}} = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\log(\\hat{y}_i) + (1 - y_i) \\log(1 - \\hat{y}_i) \\right]",
    name: "Binary Cross-Entropy Loss (Log Loss)",
    pronunciation: "/ˈbaɪ.nə.ri krɒs ˈɛn.trə.pi/ (Binary Cross Entropy)",
    speakText: "Binary Cross Entropy Loss",
    category: "ml",
    subCategory: "Loss Functions",
    tags: ["loss", "classification", "cross entropy", "likelihood", "optimization"],
    badgeColor: "text-rose-400 bg-rose-950/60 border-rose-800",
    meaning: "Measures the divergence between the true binary label y ∈ {0, 1} and the predicted probability output ŷ ∈ (0, 1). Heavily penalizes high-confidence wrong predictions.",
    example: "\\text{Loss} = -[y \\log \\hat{y} + (1-y) \\log(1-\\hat{y})]",
    codeSnippet: "loss_fn = torch.nn.BCELoss()",
    context: "The primary loss function for logistic regression, binary medical diagnostics (e.g. disease detected vs healthy), and click-through prediction."
  },
  {
    id: "loss_mse",
    symbol: "ℒ_MSE",
    latex: "\\mathcal{L}_{\\text{MSE}} = \\frac{1}{N} \\sum_{i=1}^N (\\hat{y}_i - y_i)^2",
    name: "Mean Squared Error Loss (L2 Loss)",
    pronunciation: "/miːn skwɛərd ˈɛr.ər/ (Mean Squared Error)",
    speakText: "Mean Squared Error Loss",
    category: "ml",
    subCategory: "Loss Functions",
    tags: ["loss", "regression", "mse", "l2", "least squares"],
    badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800",
    meaning: "Averages the squared Euclidean difference between model predictions ŷ and true continuous targets y. Quadratic penalty makes it sensitive to large outliers.",
    example: "\\mathcal{J}(w, b) = \\frac{1}{2N} \\sum_{i=1}^N (w^T x_i + b - y_i)^2",
    codeSnippet: "loss_fn = torch.nn.MSELoss()  # np.mean((y_pred - y_true)**2)",
    context: "Core objective function for linear regression, real estate price estimation, student test mark forecasts, and stock market modeling."
  },
  {
    id: "loss_mae",
    symbol: "ℒ_MAE",
    latex: "\\mathcal{L}_{\\text{MAE}} = \\frac{1}{N} \\sum_{i=1}^N |\\hat{y}_i - y_i|",
    name: "Mean Absolute Error (L1 Loss)",
    pronunciation: "/miːn ˈæb.sə.luːt ˈɛr.ər/ (Mean Absolute Error)",
    speakText: "Mean Absolute Error Loss",
    category: "ml",
    subCategory: "Loss Functions",
    tags: ["loss", "regression", "mae", "l1", "robust"],
    badgeColor: "text-teal-400 bg-teal-950/60 border-teal-800",
    meaning: "Averages the absolute differences between predictions and targets. More robust to dataset outliers than MSE because errors increase linearly rather than quadratically.",
    example: "\\text{MAE} = \\frac{1}{N} \\sum |\\hat{y}_i - y_i|",
    codeSnippet: "loss_fn = torch.nn.L1Loss()",
    context: "Preferred in financial modeling and sensor data when extreme outlier data points should not distort parameter discovery."
  },
  {
    id: "adam_params",
    symbol: "β₁, β₂",
    latex: "m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t, \\quad v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2",
    name: "Beta 1 & Beta 2 (Adam Optimizer Decay Rates)",
    pronunciation: "/ˈbeɪ.tə wʌn, ˈbeɪ.tə tuː/ (BAY-tuh one, BAY-tuh two)",
    speakText: "Beta 1 and Beta 2 decay parameters",
    category: "ml",
    subCategory: "Optimization",
    tags: ["optimization", "adam", "learning rate", "momentum", "deep learning"],
    badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800",
    meaning: "Exponential decay hyperparameters controlling the first moment (momentum mean) and second uncentered moment (variance) of historical gradients in Adam optimizer.",
    example: "\\text{Defaults: } \\beta_1 = 0.9, \\quad \\beta_2 = 0.999, \\quad \\varepsilon = 10^{-8}",
    codeSnippet: "torch.optim.Adam(model.parameters(), lr=1e-3, betas=(0.9, 0.999))",
    context: "Controls adaptive learning rate scaling across every neural network parameter during deep learning training."
  },

  // =========================================================================
  // 2. LINEAR ALGEBRA & VECTOR CALCULUS
  // =========================================================================
  {
    id: "transpose_dot",
    symbol: "wᵀx",
    latex: "\\mathbf{w}^T \\mathbf{x} = \\sum_{j=1}^d w_j x_j = w_1 x_1 + w_2 x_2 + \\dots + w_d x_d",
    name: "Vector Transpose & Dot Product",
    pronunciation: "/ˈtrænz.poʊz dɒt ˈprɒd.ʌkt/ (TRANS-pose dot product)",
    speakText: "w transpose x, or dot product of w and x",
    category: "algebra",
    subCategory: "Vector Operations",
    tags: ["algebra", "dot product", "matrix", "linear combination", "weights"],
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
    meaning: "Flips column vector w into a row vector to calculate the scalar inner product: the sum of component-wise multiplications between features and weights.",
    example: "h(\\mathbf{x}) = \\mathbf{w}^T \\mathbf{x} + b = w_1 \\cdot \\text{Hours} + w_2 \\cdot \\text{Attendance} + b",
    codeSnippet: "np.dot(w, x)  # or w @ x",
    context: "Calculates the weighted score across student attendance, internal exam marks, and study hours in linear models."
  },
  {
    id: "real_space",
    symbol: "ℝᵈ",
    latex: "\\mathbf{x} \\in \\mathbb{R}^d",
    name: "Blackboard Bold R (d-Dimensional Real Space)",
    pronunciation: "/aːr tuː ðə diː/ (R-d / Real Numbers Space)",
    speakText: "R d, d-dimensional real coordinate space",
    category: "algebra",
    subCategory: "Vector Spaces",
    tags: ["sets", "geometry", "continuous", "real space", "vector"],
    badgeColor: "text-blue-400 bg-blue-950/60 border-blue-800",
    meaning: "The mathematical vector space consisting of all ordered d-tuples of continuous real numbers.",
    example: "\\mathbf{w} \\in \\mathbb{R}^3 \\implies \\mathbf{w} = [w_{\\text{size}}, w_{\\text{beds}}, w_{\\text{age}}], \\quad b \\in \\mathbb{R}",
    codeSnippet: "x = np.zeros(shape=(d,), dtype=np.float32)",
    context: "Declares that the feature vector contains continuous quantitative variables (like house square footage, student marks)."
  },
  {
    id: "l2_norm",
    symbol: "||w||₂",
    latex: "\\|\\mathbf{w}\\|_2 = \\sqrt{\\sum_{j=1}^d w_j^2} = \\sqrt{w_1^2 + w_2^2 + \\dots + w_d^2}",
    name: "L2 Euclidean Norm (Vector Magnitude)",
    pronunciation: "/ɛl tuː nɔːrm/ (L-TWO NORM)",
    speakText: "L 2 Euclidean Norm",
    category: "algebra",
    subCategory: "Norms & Regularization",
    tags: ["norm", "distance", "magnitude", "ridge", "regularization"],
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
    meaning: "The standard geometric Euclidean length or magnitude of a vector measured from the origin. Squared L2 norm is used in Ridge regression and weight decay.",
    example: "\\mathcal{J}_{\\text{Ridge}} = \\frac{1}{N} \\sum L_i + \\lambda \\|\\mathbf{w}\\|_2^2",
    codeSnippet: "np.linalg.norm(w, ord=2)",
    context: "Prevents weights from exploding to extreme values, ensuring model predictions remain smooth and generalize well."
  },
  {
    id: "l1_norm",
    symbol: "||w||₁",
    latex: "\\|\\mathbf{w}\\|_1 = \\sum_{j=1}^d |w_j| = |w_1| + |w_2| + \\dots + |w_d|",
    name: "L1 Manhattan Norm (Lasso Regularizer)",
    pronunciation: "/ɛl wʌn nɔːrm/ (L-ONE NORM / Manhattan)",
    speakText: "L 1 Manhattan Norm",
    category: "algebra",
    subCategory: "Norms & Regularization",
    tags: ["norm", "lasso", "sparsity", "feature selection", "regularization"],
    badgeColor: "text-teal-400 bg-teal-950/60 border-teal-800",
    meaning: "Sum of the absolute values of vector coefficients. Promotes exact parameter sparsity by driving redundant feature weights to exactly 0.",
    example: "\\mathcal{J}_{\\text{Lasso}} = \\frac{1}{N} \\sum L_i + \\lambda \\sum_{j=1}^d |w_j|",
    codeSnippet: "np.linalg.norm(w, ord=1)",
    context: "Automated feature selection: zeros out irrelevant student metrics (e.g. favorite color) while retaining predictive study metrics."
  },
  {
    id: "frobenius_norm",
    symbol: "||A||_F",
    latex: "\\|\\mathbf{A}\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n A_{ij}^2} = \\sqrt{\\text{Tr}(\\mathbf{A}^T \\mathbf{A})}",
    name: "Frobenius Matrix Norm",
    pronunciation: "/froʊˈbeɪ.ni.əs nɔːrm/ (froh-BAY-nee-us norm)",
    speakText: "Frobenius Matrix Norm",
    category: "algebra",
    subCategory: "Matrix Operations",
    tags: ["norm", "matrix", "deep learning", "weight decay", "linear algebra"],
    badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800",
    meaning: "The matrix analogue of the vector Euclidean L2 norm, computed as the square root of the sum of the absolute squares of its elements.",
    example: "\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{task}} + \\frac{\\lambda}{2} \\sum_{l} \\|\\mathbf{W}^{[l]}\\|_F^2",
    codeSnippet: "np.linalg.norm(A, 'fro')",
    context: "Used in Weight Decay for deep neural network weight matrices W to prevent overfitting across multiple layers."
  },
  {
    id: "matrix_inverse",
    symbol: "A⁻¹",
    latex: "\\mathbf{A} \\mathbf{A}^{-1} = \\mathbf{A}^{-1} \\mathbf{A} = \\mathbf{I}_n",
    name: "Matrix Inverse",
    pronunciation: "/eɪ ˈɪn.vɜːrs/ (A-INVERSE)",
    speakText: "A inverse, inverse matrix",
    category: "algebra",
    subCategory: "Matrix Operations",
    tags: ["matrix", "inverse", "ols", "normal equation", "linear algebra"],
    badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800",
    meaning: "The unique multiplicative inverse of a non-singular square matrix. Multiplied by A, it produces the identity matrix I.",
    example: "\\mathbf{w}^* = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y} \\quad \\text{(OLS Normal Equation)}",
    codeSnippet: "np.linalg.inv(A)  # or np.linalg.pinv(A)",
    context: "Enables closed-form analytical derivation of optimal linear regression weights without running iterative gradient descent."
  },
  {
    id: "eigen_system",
    symbol: "Av = λv",
    latex: "\\mathbf{A} \\mathbf{v} = \\lambda \\mathbf{v}, \\quad \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0",
    name: "Eigenvalue (λ) & Eigenvector (v)",
    pronunciation: "/ˈaɪ.ɡən ˈvæl.juː/ (EYE-gun value)",
    speakText: "Eigenvalue lambda and eigenvector v",
    category: "algebra",
    subCategory: "Eigendecomposition",
    tags: ["pca", "eigenvalue", "eigenvector", "dimensionality reduction", "covariance"],
    badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800",
    meaning: "An eigenvector v is a non-zero vector that changes only by a scalar factor λ (the eigenvalue) when linear transformation A is applied.",
    example: "\\mathbf{\\Sigma} \\mathbf{u}_1 = \\lambda_1 \\mathbf{u}_1 \\quad \\text{(Principal Component Analysis - PCA)}",
    codeSnippet: "eigenvalues, eigenvectors = np.linalg.eig(A)",
    context: "Foundational in Principal Component Analysis (PCA) to compress 100 features into 2 principal axes of maximum variance."
  },
  {
    id: "svd",
    symbol: "U Σ Vᵀ",
    latex: "\\mathbf{A} = \\mathbf{U} \\mathbf{\\Sigma} \\mathbf{V}^T",
    name: "Singular Value Decomposition (SVD)",
    pronunciation: "/ɛs viː diː/ (S-V-D)",
    speakText: "Singular Value Decomposition, U Sigma V transpose",
    category: "algebra",
    subCategory: "Factorization",
    tags: ["svd", "factorization", "recommendation", "compression", "pca"],
    badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
    meaning: "Factorization of any m × n real matrix A into orthogonal matrix U, diagonal matrix Σ with singular values, and orthogonal matrix V.",
    example: "\\mathbf{A} \\approx \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T \\quad \\text{(Low-Rank Matrix Approximation)}",
    codeSnippet: "U, S, Vt = np.linalg.svd(A)",
    context: "Powers Netflix & Spotify recommender engines (collaborative filtering), image compression, and latent semantic analysis."
  },
  {
    id: "hadamard_product",
    symbol: "A ⊙ B",
    latex: "(\\mathbf{A} \\odot \\mathbf{B})_{ij} = A_{ij} \\cdot B_{ij}",
    name: "Hadamard Element-wise Product",
    pronunciation: "/ˈhæd.ə.mɑːrd ˈprɒd.ʌkt/ (HAD-uh-mard product)",
    speakText: "Hadamard element-wise product of A and B",
    category: "algebra",
    subCategory: "Matrix Operations",
    tags: ["hadamard", "element-wise", "lstm", "rnn", "attention"],
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
    meaning: "Binary operation that takes two matrices of the same dimensions and produces a new matrix where each element (i, j) is the product of elements from A and B.",
    example: "\\mathbf{c}_t = \\mathbf{f}_t \\odot \\mathbf{c}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{c}}_t \\quad \\text{(LSTM Forget & Input Gate)}",
    codeSnippet: "A * B  # in numpy / pytorch (standard element-wise)",
    context: "Used in LSTM and GRU neural network architectures to selectively filter or forget memory cell contents."
  },

  // =========================================================================
  // 3. CALCULUS, GRADIENTS & OPTIMIZATION
  // =========================================================================
  {
    id: "gradient_del",
    symbol: "∇f",
    latex: "\\nabla f(\\mathbf{w}) = \\begin{bmatrix} \\frac{\\partial f}{\\partial w_1} & \\frac{\\partial f}{\\partial w_2} & \\dots & \\frac{\\partial f}{\\partial w_d} \\end{bmatrix}^T",
    name: "Nabla / Del (Gradient Vector)",
    pronunciation: "/ˈnæb.lə/ (NAB-luh) or /dɛl/ (DEL)",
    speakText: "Nabla, or Gradient of f",
    category: "calculus",
    subCategory: "Derivatives & Gradients",
    tags: ["gradient", "derivative", "gradient descent", "optimization", "calculus"],
    badgeColor: "text-rose-400 bg-rose-950/60 border-rose-800",
    meaning: "Vector of all first-order partial derivatives of a scalar multivariate function. Points in the direction of greatest rate of increase (steepest slope).",
    example: "\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\alpha \\nabla_{\\mathbf{w}} \\mathcal{J}(\\mathbf{w}_t)",
    codeSnippet: "loss.backward()  # PyTorch computes gradient vector w.grad",
    context: "Guides the learning algorithm on how much and in which direction to tune each weight parameter to eliminate student prediction errors."
  },
  {
    id: "partial_deriv",
    symbol: "∂f / ∂x",
    latex: "\\frac{\\partial f}{\\partial x_i} = \\lim_{h \\to 0} \\frac{f(x_1, \\dots, x_i + h, \\dots, x_n) - f(x_1, \\dots, x_n)}{h}",
    name: "Partial Derivative (Del / Partial d)",
    pronunciation: "/ˈpɑːr.ʃəl diː/ (PAR-shul d)",
    speakText: "Partial derivative of f with respect to x",
    category: "calculus",
    subCategory: "Derivatives & Gradients",
    tags: ["calculus", "derivative", "sensitivity", "backpropagation"],
    badgeColor: "text-rose-400 bg-rose-950/60 border-rose-800",
    meaning: "Measures the rate of change of a multivariable function with respect to one single variable while holding all other variables constant.",
    example: "\\frac{\\partial \\mathcal{J}}{\\partial w_1} = \\frac{1}{N} \\sum_{i=1}^N (\\hat{y}_i - y_i) x_{i1}",
    codeSnippet: "dw1 = (1/N) * np.sum((y_pred - y) * x1)",
    context: "Calculates the sensitivity of total model loss when only the 'study hours' weight w₁ is adjusted."
  },
  {
    id: "hessian_matrix",
    symbol: "∇²f / H",
    latex: "\\mathbf{H}_{ij} = \\frac{\\partial^2 f}{\\partial w_i \\partial w_j}",
    name: "Hessian Matrix (Second-Order Partials)",
    pronunciation: "/ˈhɛs.i.ən ˈmeɪ.trɪks/ (HESS-ee-un matrix)",
    speakText: "Hessian matrix, second order partial derivatives",
    category: "calculus",
    subCategory: "Curvature & Second Order",
    tags: ["hessian", "curvature", "second order", "newton raphson", "saddle point"],
    badgeColor: "text-red-400 bg-red-950/60 border-red-800",
    meaning: "Square matrix of second-order partial derivatives describing the local curvature of a multivariable loss function surface.",
    example: "\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\mathbf{H}^{-1} \\nabla \\mathcal{J}(\\mathbf{w}_t) \\quad \\text{(Newton-Raphson Step)}",
    codeSnippet: "torch.autograd.functional.hessian(loss_func, inputs)",
    context: "Determines whether an optimization critical point is a local minimum, local maximum, or a saddle point in deep loss landscapes."
  },
  {
    id: "argmin",
    symbol: "argmin",
    latex: "\\mathbf{w}^* = \\arg\\min_{\\mathbf{w}} \\mathcal{J}(\\mathbf{w})",
    name: "Argmin (Argument of Minimum)",
    pronunciation: "/ɑːrɡ mɪn/ (ARG-min)",
    speakText: "Argmin, argument of minimum",
    category: "calculus",
    subCategory: "Optimization",
    tags: ["optimization", "argmin", "minimizer", "optimal parameters", "loss"],
    badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800",
    meaning: "Returns the argument (the parameter coordinates w*) that produces the minimum value of the objective function J(w), rather than the value itself.",
    example: "(\\mathbf{w}^*, b^*) = \\arg\\min_{\\mathbf{w}, b} \\left[ \\frac{1}{N} \\sum_{i=1}^N L(h(\\mathbf{x}_i; \\mathbf{w}, b), y_i) + \\lambda \\Omega(\\mathbf{w}) \\right]",
    codeSnippet: "best_w = w_values[np.argmin(losses)]",
    context: "The mathematical goal of training: find the exact weights (e.g. w=7.30, b=26.29) that minimize student prediction error."
  },
  {
    id: "integral",
    symbol: "∫",
    latex: "\\int_{-\\infty}^{\\infty} p(x) \\, dx = 1.0",
    name: "Continuous Integral (Area under Curve)",
    pronunciation: "/ˈɪn.tɪ.ɡrəl/ (IN-tih-grul)",
    speakText: "Integral from minus infinity to plus infinity",
    category: "calculus",
    subCategory: "Integration",
    tags: ["integral", "calculus", "probability density", "continuous", "expectation"],
    badgeColor: "text-sky-400 bg-sky-950/60 border-sky-800",
    meaning: "Continuous summation operator calculating the accumulated area under a mathematical curve or probability density function.",
    example: "\\mathbb{E}[X] = \\int_{-\\infty}^\\infty x \\cdot p(x) \\, dx",
    codeSnippet: "scipy.integrate.quad(f, -np.inf, np.inf)",
    context: "Computes total probability in continuous Gaussian distributions and marginal likelihoods in Bayesian learning."
  },

  // =========================================================================
  // 4. PROBABILITY, STATISTICS & INFORMATION THEORY
  // =========================================================================
  {
    id: "y_hat",
    symbol: "ŷ",
    latex: "\\hat{y} = h(\\mathbf{x}; \\mathbf{w}, b)",
    name: "Y-Hat (Predicted / Estimated Outcome)",
    pronunciation: "/waɪ hæt/ (WYE-hat)",
    speakText: "y hat, predicted target",
    category: "statistics",
    subCategory: "Estimation",
    tags: ["prediction", "estimate", "hypothesis", "ground truth", "residual"],
    badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
    meaning: "The statistical estimate or prediction produced by the machine learning hypothesis function, explicitly distinguished from ground truth target y.",
    example: "\\text{Residual Error } e_i = y_i - \\hat{y}_i = \\text{Actual Marks} - \\text{Predicted Marks}",
    codeSnippet: "y_hat = model.predict(X)",
    context: "ŷ = 66.4 marks (model's prediction for 5.5 study hours) vs y = 62.0 marks (student's actual verified score)."
  },
  {
    id: "expectation",
    symbol: "𝔼[X]",
    latex: "\\mathbb{E}[X] = \\sum_{x} x \\cdot P(X = x) \\quad \\text{or} \\quad \\int x \\cdot p(x) \\, dx",
    name: "Expectation (Expected Value / Theoretical Mean)",
    pronunciation: "/ˌɛk.spɛkˈteɪ.ʃən/ (ex-pek-TAY-shun)",
    speakText: "Expectation of X, or Expected Value",
    category: "statistics",
    subCategory: "Probability",
    tags: ["probability", "expectation", "mean", "reinforcement learning", "statistics"],
    badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800",
    meaning: "The long-run average value of repetitions of the random experiment represented by random variable X.",
    example: "\\mathcal{R}_{\\text{emp}}(\\mathbf{w}) = \\mathbb{E}_{(\\mathbf{x}, y) \\sim \\mathcal{D}}[L(h(\\mathbf{x}; \\mathbf{w}), y)]",
    codeSnippet: "np.mean(samples)  # empirical sample estimate of E[X]",
    context: "Used in Empirical Risk Minimization and cumulative expected discounted rewards in Reinforcement Learning."
  },
  {
    id: "variance_std",
    symbol: "μ, σ²",
    latex: "\\mu = \\frac{1}{N} \\sum x_i, \\quad \\sigma^2 = \\frac{1}{N} \\sum (x_i - \\mu)^2",
    name: "Mu (Population Mean) & Sigma-Squared (Variance)",
    pronunciation: "/mjuː/ (MYEW) & /ˈsɪɡ.mə skwɛərd/ (SIG-muh squared)",
    speakText: "Mu mean and sigma squared variance",
    category: "statistics",
    subCategory: "Distributions",
    tags: ["mean", "variance", "standard deviation", "normalization", "standardization"],
    badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
    meaning: "Mu (μ) measures the central tendency (average), while Sigma-squared (σ²) measures the statistical dispersion / spread of values around the mean.",
    example: "x_{\\text{standardized}} = \\frac{x - \\mu}{\\sigma} \\quad \\sim \\mathcal{N}(0, 1)",
    codeSnippet: "x_norm = (x - np.mean(x)) / np.std(x)",
    context: "Standardizes disparate features (e.g. Attendance 0-100% and Study Hours 0-12 hrs) onto an identical scale for stable gradient descent."
  },
  {
    id: "conditional_prob",
    symbol: "P(A | B)",
    latex: "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{P(B \\mid A) P(A)}{P(B)}",
    name: "Conditional Probability (Bayes' Rule)",
    pronunciation: "/pruːv/ (P of A GIVEN B)",
    speakText: "Probability of A given B, Bayes rule",
    category: "statistics",
    subCategory: "Probability",
    tags: ["bayes", "conditional", "naive bayes", "posterior", "likelihood"],
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
    meaning: "The probability of event A occurring given that event B is known to have already occurred. Core foundation of Bayesian inference.",
    example: "P(\\text{Spam} \\mid \\text{words}) = \\frac{P(\\text{words} \\mid \\text{Spam}) P(\\text{Spam})}{P(\\text{words})}",
    codeSnippet: "p_spam_given_words = (p_words_given_spam * p_spam) / p_words",
    context: "Calculates the probability that an incoming email is Spam given the occurrence of trigger keywords ('free', 'win', 'prize')."
  },
  {
    id: "kl_divergence",
    symbol: "D_KL(P || Q)",
    latex: "D_{\\text{KL}}(P \\parallel Q) = \\sum_{x} P(x) \\log \\left( \\frac{P(x)}{Q(x)} \\right)",
    name: "Kullback-Leibler (KL) Divergence",
    pronunciation: "/keɪ ɛl daɪˈvɜːr.dʒəns/ (K-L Divergence)",
    speakText: "Kullback Leibler Divergence of P from Q",
    category: "statistics",
    subCategory: "Information Theory",
    tags: ["information theory", "entropy", "divergence", "vae", "generative ai"],
    badgeColor: "text-pink-400 bg-pink-950/60 border-pink-800",
    meaning: "Asymmetric statistical metric measuring how much information is lost when probability distribution Q is used to approximate true distribution P.",
    example: "\\mathcal{L}_{\\text{VAE}} = \\text{ReconstructionLoss} + D_{\\text{KL}}(q_\\phi(z|x) \\parallel p(z))",
    codeSnippet: "kl_loss = torch.sum(P * (torch.log(P) - torch.log(Q)))",
    context: "Forces latent embedding spaces in Variational Autoencoders (VAEs) and generative diffusion models to adhere to a smooth standard Gaussian."
  },
  {
    id: "shannon_entropy",
    symbol: "H(X)",
    latex: "H(X) = -\\sum_{i=1}^n P(x_i) \\log_2 P(x_i)",
    name: "Shannon Entropy (Information Content)",
    pronunciation: "/ˈʃæn.ən ˈɛn.trə.pi/ (SHAN-un entropy)",
    speakText: "Shannon Entropy of X",
    category: "statistics",
    subCategory: "Information Theory",
    tags: ["entropy", "decision trees", "information gain", "uncertainty", "random forest"],
    badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800",
    meaning: "Quantifies the expected amount of information, surprise, or uncertainty inherent in the possible outcomes of a random variable X.",
    example: "\\text{Information Gain} = H(\\text{Parent}) - \\sum \\frac{|S_v|}{|S|} H(S_v)",
    codeSnippet: "-np.sum(p * np.log2(p + 1e-12))",
    context: "Used by Decision Tree split algorithms (ID3 and C4.5) to decide which feature (e.g. Attendance vs Test Marks) creates the purest split."
  },

  // =========================================================================
  // 5. REINFORCEMENT LEARNING & DYNAMIC PROGRAMMING
  // =========================================================================
  {
    id: "q_function",
    symbol: "Q(s, a)",
    latex: "Q^*(s, a) = \\mathbb{E} \\left[ R_{t+1} + \\gamma \\max_{a'} Q^*(s_{t+1}, a') \\mid s_t = s, a_t = a \\right]",
    name: "Q-Value Function (Action-Value Function)",
    pronunciation: "/kjuː ˈvæl.juː/ (KYEW value)",
    speakText: "Q value function of state s and action a",
    category: "rl",
    subCategory: "Q-Learning & MDP",
    tags: ["reinforcement learning", "bellman equation", "q-learning", "dqn", "agent"],
    badgeColor: "text-blue-400 bg-blue-950/60 border-blue-800",
    meaning: "Expected total cumulative discounted future reward starting from state s, taking action a, and thereafter following the optimal policy.",
    example: "Q(s, a) \\leftarrow Q(s, a) + \\alpha \\left[ r + \\gamma \\max_{a'} Q(s', a') - Q(s, a) \\right]",
    codeSnippet: "q_target = reward + gamma * torch.max(q_next_state)",
    context: "Fundamental to autonomous driving, game playing agents (AlphaGo), and robotics to evaluate the value of executing moves."
  },
  {
    id: "policy_pi",
    symbol: "π(a | s)",
    latex: "\\pi(a \\mid s) = P(A_t = a \\mid S_t = s)",
    name: "Policy Function (Agent Behavior Distribution)",
    pronunciation: "/paɪ əv eɪ ɡɪv.ən ɛs/ (PYE of a given s)",
    speakText: "Policy pi of action a given state s",
    category: "rl",
    subCategory: "Policy Gradients",
    tags: ["reinforcement learning", "policy", "ppo", "actor critic", "rlhf"],
    badgeColor: "text-violet-400 bg-violet-950/60 border-violet-800",
    meaning: "A mapping from perceived states of the environment to probabilities of selecting each possible action.",
    example: "\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta} \\left[ \\nabla_\\theta \\log \\pi_\\theta(a \\mid s) Q^{\\pi_\\theta}(s, a) \\right]",
    codeSnippet: "action_probs = policy_net(state)  # Softmax distribution over actions",
    context: "Used in Proximal Policy Optimization (PPO) for Reinforcement Learning from Human Feedback (RLHF) in training ChatGPT and Claude."
  },

  // =========================================================================
  // 6. DISCRETE MATHEMATICS, LOGIC & SET THEORY
  // =========================================================================
  {
    id: "element_of",
    symbol: "∈",
    latex: "x_i \\in \\mathcal{X}, \\quad y_i \\in \\mathcal{Y}",
    name: "Element Of (Set Membership)",
    pronunciation: "/ɪn/ (IN) or /bɪˈlɒŋz tuː/ (belongs to)",
    speakText: "Element of, or belongs to",
    category: "discrete",
    subCategory: "Set Theory",
    tags: ["sets", "membership", "discrete math", "domain", "logic"],
    badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
    meaning: "Indicates that an object or mathematical variable is a constituent member of a specified set.",
    example: "\\mathbf{x} \\in \\mathbb{R}^d, \\quad y \\in \\{0, 1\\}",
    codeSnippet: "assert x in feature_space",
    context: "Declares that the target label y is discrete binary ({0, 1} for Pass/Fail) or continuous real numbers."
  },
  {
    id: "for_all",
    symbol: "∀",
    latex: "\\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}",
    name: "Universal Quantifier (For All / For Every)",
    pronunciation: "/fɔːr ɔːl/ (FOR ALL)",
    speakText: "Universal quantifier, for all",
    category: "discrete",
    subCategory: "Formal Logic",
    tags: ["logic", "quantifier", "discrete math", "proof", "predicate"],
    badgeColor: "text-violet-400 bg-violet-950/60 border-violet-800",
    meaning: "Formal predicate logic symbol stating that the following proposition holds universally true for every element in the domain.",
    example: "\\forall \\mathbf{x} \\in \\mathcal{D}, \\quad P(\\mathbf{x}) \\ge 0",
    codeSnippet: "all(condition(x) for x in dataset)",
    context: "Used in mathematical proofs of learning convergence and generalization error bounds."
  },
  {
    id: "there_exists",
    symbol: "∃",
    latex: "\\exists \\mathbf{w}^* \\in \\mathbb{R}^d \\text{ such that } \\mathcal{J}(\\mathbf{w}^*) \\le \\mathcal{J}(\\mathbf{w})",
    name: "Existential Quantifier (There Exists)",
    pronunciation: "/ðɛər ɪɡˈzɪsts/ (THERE EXISTS)",
    speakText: "Existential quantifier, there exists",
    category: "discrete",
    subCategory: "Formal Logic",
    tags: ["logic", "quantifier", "discrete math", "proof", "predicate"],
    badgeColor: "text-violet-400 bg-violet-950/60 border-violet-800",
    meaning: "Formal logic symbol asserting that there is at least one element in the domain satisfying the subsequent statement.",
    example: "\\exists \\mathbf{w} \\text{ such that } \\nabla \\mathcal{J}(\\mathbf{w}) = \\mathbf{0}",
    codeSnippet: "any(condition(x) for x in dataset)",
    context: "Used in convex optimization theorems proving the existence of a global minimum."
  },
  {
    id: "implication",
    symbol: "⟹",
    latex: "A \\implies B \\iff \\neg A \\lor B",
    name: "Material Implication (If... Then...)",
    pronunciation: "/ɪmˈplaɪz/ (IM-ply-z)",
    speakText: "Implies, if A then B",
    category: "discrete",
    subCategory: "Propositional Logic",
    tags: ["logic", "implication", "discrete math", "proof", "inference"],
    badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800",
    meaning: "Logical connector stating that whenever premise A is true, conclusion B is guaranteed to also be true.",
    example: "\\nabla^2 f(\\mathbf{w}) \\succ 0 \\implies f \\text{ is strictly convex}",
    codeSnippet: "if premise: assert conclusion",
    context: "Used in rule-based expert systems, theorem provers, and algorithmic inductive proofs."
  },
  {
    id: "big_o",
    symbol: "𝒪(g(n))",
    latex: "f(n) = \\mathcal{O}(g(n)) \\iff \\exists c > 0, n_0 > 0 \\text{ s.t. } |f(n)| \\le c |g(n)| \\quad \\forall n \\ge n_0",
    name: "Big-O Notation (Asymptotic Upper Bound)",
    pronunciation: "/bɪɡ oʊ/ (BIG-OH)",
    speakText: "Big O of g of n, asymptotic upper bound",
    category: "discrete",
    subCategory: "Algorithmic Complexity",
    tags: ["complexity", "big o", "algorithms", "runtime", "scalability"],
    badgeColor: "text-rose-400 bg-rose-950/60 border-rose-800",
    meaning: "Classifies the worst-case asymptotic computational time or memory growth rate of an algorithm as input size n grows to infinity.",
    example: "\\text{Matrix Multiply: } \\mathcal{O}(n^3), \\quad \\text{Linear Regression Inference: } \\mathcal{O}(d)",
    codeSnippet: "# Complexity: O(N * d) for single epoch gradient pass",
    context: "Evaluates how algorithms scale when processing millions of student records or billions of web tokens."
  }
];

export default function MathSymbolDictionary({ className = "" }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [copiedSymbol, setCopiedSymbol] = useState(null);
  const [copiedLatex, setCopiedLatex] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [speakingId, setSpeakingId] = useState(null);
  const [activeModalSymbol, setActiveModalSymbol] = useState(null);

  const categories = useMemo(() => [
    { id: "all", label: "All Symbols", count: mathSymbolsData.length },
    { id: "ml", label: "Machine & Deep Learning", count: mathSymbolsData.filter(s => s.category === "ml").length },
    { id: "algebra", label: "Linear Algebra & Vectors", count: mathSymbolsData.filter(s => s.category === "algebra").length },
    { id: "calculus", label: "Calculus & Optimization", count: mathSymbolsData.filter(s => s.category === "calculus").length },
    { id: "statistics", label: "Statistics & Probability", count: mathSymbolsData.filter(s => s.category === "statistics").length },
    { id: "rl", label: "Reinforcement Learning", count: mathSymbolsData.filter(s => s.category === "rl").length },
    { id: "discrete", label: "Discrete Math & Logic", count: mathSymbolsData.filter(s => s.category === "discrete").length }
  ], []);

  // Quick Filter Tags
  const popularTags = useMemo(() => [
    "activation", "loss", "optimization", "probability", "matrix", "norm", "calculus", "deep learning", "regularization", "logic"
  ], []);

  // Filter Algorithm
  const filtered = useMemo(() => {
    return mathSymbolsData.filter((item) => {
      const matchCat = category === "all" || item.category === category;
      const matchTag = !selectedTag || (item.tags && item.tags.includes(selectedTag));
      
      const q = query.toLowerCase().trim();
      const matchQ =
        !q ||
        item.symbol.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.pronunciation.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.context.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));

      return matchCat && matchTag && matchQ;
    });
  }, [category, selectedTag, query]);

  // Audio Speech Pronunciation
  const handleSpeak = useCallback((item) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const textToSpeak = item.speakText || item.name;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    setSpeakingId(item.id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleCopySymbol = useCallback((sym) => {
    navigator.clipboard?.writeText(sym);
    setCopiedSymbol(sym);
    setTimeout(() => setCopiedSymbol(null), 1800);
  }, []);

  const handleCopyLatex = useCallback((latex) => {
    navigator.clipboard?.writeText(latex);
    setCopiedLatex(latex);
    setTimeout(() => setCopiedLatex(null), 1800);
  }, []);

  return (
    <div className={clsx("bg-slate-900/90 p-4 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl space-y-6 select-text", className)}>
      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-2xl shadow-inner">
            🔣
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Mathematical Symbol &amp; Pronunciation Dictionary
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive phonetic pronunciations, formal definitions, LaTeX notation, and code implementations
            </p>
          </div>
        </div>

        {/* View Mode Toggle & Badge Counter */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode("grid")}
              className={clsx(
                "px-3 py-1.5 rounded-lg transition-colors cursor-pointer",
                viewMode === "grid" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={clsx(
                "px-3 py-1.5 rounded-lg transition-colors cursor-pointer",
                viewMode === "table" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Table View
            </button>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-purple-950/70 border border-purple-800 text-xs font-mono text-purple-300 font-bold">
            {filtered.length} / {mathSymbolsData.length} Symbols
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEARCH CONTROLS & CATEGORY PILLS */}
      {/* ========================================================================= */}
      <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setSelectedTag(null); }}
                className={clsx(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5",
                  category === cat.id && !selectedTag
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                )}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              placeholder="Search symbol, sound e.g. sigma, relu, kl..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-900 text-xs px-3.5 py-2.5 pl-8 pr-7 rounded-lg border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <span className="absolute left-2.5 top-3 text-slate-500 text-xs">🔍</span>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Tag Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-900 text-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Quick Filters:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={clsx(
                "px-2.5 py-0.5 rounded-full text-[11px] font-mono transition cursor-pointer",
                selectedTag === tag
                  ? "bg-indigo-600 text-white font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
              )}
            >
              #{tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[10px] text-rose-400 hover:underline ml-1 cursor-pointer font-mono"
            >
              Reset Tag
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: GRID CARDS VIEW */}
      {/* ========================================================================= */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 space-y-3.5 flex flex-col justify-between group shadow-lg hover:shadow-purple-950/20 relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Header: Glyph + Name + Category + Action Icons */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      onClick={() => handleCopySymbol(item.symbol)}
                      className="text-2xl sm:text-3xl font-black font-serif text-white bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-800 group-hover:scale-105 transition-transform cursor-pointer hover:border-purple-500"
                      title="Click to copy symbol"
                    >
                      {item.symbol}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{item.name}</h3>
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">{item.category}</span>
                        {item.subCategory && (
                          <span className="text-[10px] text-slate-500 font-mono">• {item.subCategory}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSpeak(item)}
                      className={clsx(
                        "p-1.5 rounded-lg text-xs border transition cursor-pointer",
                        speakingId === item.id
                          ? "bg-purple-600 text-white border-purple-400 animate-pulse"
                          : "bg-slate-900 text-slate-400 hover:text-purple-300 hover:bg-slate-800 border-slate-800"
                      )}
                      title="Listen to pronunciation"
                    >
                      🔊
                    </button>
                    <button
                      onClick={() => handleCopySymbol(item.symbol)}
                      className="text-[11px] px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
                      title="Copy symbol"
                    >
                      {copiedSymbol === item.symbol ? "✓" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Phonetic Pronunciation Badge */}
                <div className="flex items-center justify-between p-2 bg-purple-950/40 rounded-lg border border-purple-900/50 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold">IPA:</span>
                    <span className="font-mono font-bold text-purple-200">
                      {item.pronunciation}
                    </span>
                  </div>
                  <button
                    onClick={() => handleSpeak(item)}
                    className="text-[10px] text-purple-400 hover:underline cursor-pointer"
                  >
                    Play 🔊
                  </button>
                </div>

                {/* Mathematical Role & Meaning */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.meaning}
                </p>
              </div>

              {/* Formula & Tutorial Context */}
              <div className="space-y-2 pt-2.5 border-t border-slate-800/80">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 break-words select-all flex items-center justify-between">
                  <span>{item.example}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate italic">💡 {item.context}</span>
                  <button
                    onClick={() => setActiveModalSymbol(item)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold underline shrink-0 ml-2 cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW MODE 2: TABLE CHEATSHEET VIEW */
        /* ========================================================================= */
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead className="bg-slate-900 text-slate-300 uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5 border-r border-slate-800">Symbol</th>
                <th className="p-3.5 border-r border-slate-800">Name &amp; Category</th>
                <th className="p-3.5 border-r border-slate-800">Pronunciation</th>
                <th className="p-3.5 border-r border-slate-800">Meaning</th>
                <th className="p-3.5">Formula Example</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3.5 border-r border-slate-800 font-serif text-xl font-bold text-white whitespace-nowrap">
                    {item.symbol}
                  </td>
                  <td className="p-3.5 border-r border-slate-800">
                    <div className="font-bold text-white font-sans text-xs">{item.name}</div>
                    <span className="text-[10px] text-purple-400 uppercase font-mono">{item.category}</span>
                  </td>
                  <td className="p-3.5 border-r border-slate-800 text-purple-200 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(item)}
                        className="text-xs hover:scale-125 transition-transform cursor-pointer"
                        title="Pronounce"
                      >
                        🔊
                      </button>
                      <span>{item.pronunciation}</span>
                    </div>
                  </td>
                  <td className="p-3.5 border-r border-slate-800 font-sans text-slate-300 text-xs max-w-xs">
                    {item.meaning}
                  </td>
                  <td className="p-3.5 text-cyan-300 text-[11px] max-w-xs break-words">
                    {item.example}
                  </td>
                  <td className="p-3.5 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleCopySymbol(item.symbol)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] cursor-pointer"
                    >
                      {copiedSymbol === item.symbol ? "✓" : "Copy"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DETAILED INSPECTION MODAL */}
      {/* ========================================================================= */}
      {activeModalSymbol && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-purple-500/60 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-serif font-black text-white bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                  {activeModalSymbol.symbol}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeModalSymbol.name}</h3>
                  <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                    Category: {activeModalSymbol.category} ({activeModalSymbol.subCategory})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveModalSymbol(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Pronunciation Banner */}
            <div className="p-3 bg-purple-950/50 rounded-xl border border-purple-800/60 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="text-[10px] text-purple-400 font-mono uppercase font-bold">Phonetic Pronunciation:</div>
                <div className="text-sm font-mono text-purple-200 font-bold">{activeModalSymbol.pronunciation}</div>
              </div>
              <button
                onClick={() => handleSpeak(activeModalSymbol)}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>🔊</span> Listen Audio
              </button>
            </div>

            {/* Definition */}
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">Mathematical Definition:</div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {activeModalSymbol.meaning}
              </p>
            </div>

            {/* LaTeX & Formula */}
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400 uppercase font-bold">
                <span>LaTeX Notation &amp; Formula:</span>
                <button
                  onClick={() => handleCopyLatex(activeModalSymbol.latex || activeModalSymbol.example)}
                  className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                >
                  {copiedLatex === (activeModalSymbol.latex || activeModalSymbol.example) ? "✓ Copied LaTeX" : "Copy LaTeX"}
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300 select-all">
                {activeModalSymbol.latex || activeModalSymbol.example}
              </div>
            </div>

            {/* Code Implementation */}
            {activeModalSymbol.codeSnippet && (
              <div className="space-y-1 font-mono text-xs">
                <div className="text-slate-400 uppercase font-bold">Python / PyTorch Code Implementation:</div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 overflow-x-auto">
                  {activeModalSymbol.codeSnippet}
                </pre>
              </div>
            )}

            {/* Real World Context */}
            <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/50 text-xs space-y-1">
              <div className="text-indigo-300 font-bold">💡 Real-World Machine Learning Application:</div>
              <p className="text-slate-300">{activeModalSymbol.context}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
