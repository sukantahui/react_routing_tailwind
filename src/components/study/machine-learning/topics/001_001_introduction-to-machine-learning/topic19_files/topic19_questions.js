/**
 * Topic 19: Practice Problems
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "Given input vector x = [0.80, 0.90]^T, weights w = [2.0, 3.0]^T, and bias b = -3.5, what is the value of the linear logit z = w^T x + b?",
    "shortAnswer": "z = (2.0 * 0.80) + (3.0 * 0.90) - 3.5 = 1.60 + 2.70 - 3.5 = +0.80.",
    "explanation": "The linear logit computes the affine dot product between weight vector w and feature vector x plus bias b: z = w_1 x_1 + w_2 x_2 + b. In this problem: 1.60 + 2.70 - 3.50 = +0.80.",
    "hint": "Multiply corresponding elements, sum them, and add the bias intercept.",
    "level": "Basic",
    "codeExample": "x = np.array([0.80, 0.90])\nw = np.array([2.0, 3.0])\nb = -3.5\nz = np.dot(w, x) + b  # 0.80"
  },
  {
    "id": 2,
    "question": "For a logit z = +0.80, what is the predicted classification probability y_hat = \u03c3(z) using the standard logistic sigmoid function?",
    "shortAnswer": "y_hat = 1 / (1 + e^-0.80) = 1 / (1 + 0.4493) = 1 / 1.4493 \u2248 0.6900 (69.0%).",
    "explanation": "The sigmoid function \u03c3(z) squashes any real value z \u2208 (-\u221e, +\u221e) into (0, 1). With z = 0.80: e^-0.80 \u2248 0.449329, yielding probability 1 / 1.449329 = 0.6900.",
    "hint": "Evaluate \u03c3(z) = 1 / (1 + exp(-z)).",
    "level": "Basic",
    "codeExample": "z = 0.80\ny_hat = 1.0 / (1.0 + np.exp(-z))  # 0.68997"
  },
  {
    "id": 3,
    "question": "If the true label is y = 1 (Pass) and the model predicted y_hat = 0.6900, what is the Binary Cross-Entropy Loss L for this single observation?",
    "shortAnswer": "L = - [ 1 \u00b7 ln(0.6900) + 0 \u00b7 ln(1 - 0.6900) ] = -ln(0.6900) \u2248 0.3711.",
    "explanation": "For positive label y = 1, Binary Cross-Entropy simplifies to -ln(y_hat). With y_hat = 0.69, -ln(0.6900) = 0.3711. If the prediction had been y_hat = 0.99, loss would be -ln(0.99) = 0.010.",
    "hint": "For y = 1, loss is the negative natural logarithm of predicted probability.",
    "level": "Basic",
    "codeExample": "y_true = 1\ny_hat = 0.6900\nloss = -np.log(y_hat)  # 0.37106"
  },
  {
    "id": 4,
    "question": "Calculate the Euclidean Distance between query customer Q(2, 4) and training customer A(5, 8).",
    "shortAnswer": "d(Q, A) = sqrt((5 - 2)^2 + (8 - 4)^2) = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5.0.",
    "explanation": "Euclidean distance is the L2 norm of the difference vector: ||x_A - x_Q||_2 = sqrt( \u2211 (x_{A,j} - x_{Q,j})^2 ). The 3-4-5 right triangle Pythagorean metric yields exactly 5.0 units.",
    "hint": "Square the coordinate differences, sum them, and compute the square root.",
    "level": "Basic",
    "codeExample": "q = np.array([2, 4])\na = np.array([5, 8])\ndist = np.linalg.norm(a - q)  # 5.0"
  },
  {
    "id": 5,
    "question": "Given 3 nearest neighbors with distances d_A=2.0 (Class 1), d_B=3.0 (Class 0), and d_C=4.0 (Class 1), what is the majority-vote classification prediction of 3-NN?",
    "shortAnswer": "Class 1 (by 2-to-1 majority vote).",
    "explanation": "In standard unweighted k-NN with k=3, the algorithm takes the mode of the neighbor classes: Neighbors A and C belong to Class 1, while Neighbor B belongs to Class 0. Majority vote selects Class 1.",
    "hint": "Count the number of neighbors in each class among the 3 closest points.",
    "level": "Basic",
    "codeExample": "neighbors = [1, 0, 1]\nprediction = max(set(neighbors), key=neighbors.count)  # 1"
  },
  {
    "id": 6,
    "question": "In distance-weighted 3-NN with weights w_i = 1 / d_i, what are the class scores for Class 1 (d_A=2, d_C=4) vs Class 0 (d_B=3)?",
    "shortAnswer": "Score(Class 1) = 1/2 + 1/4 = 0.75; Score(Class 0) = 1/3 \u2248 0.333; Predicts Class 1.",
    "explanation": "Distance weighting sums inverse distances per class: Class 1 score = 0.50 + 0.25 = 0.75. Class 0 score = 0.333. Because 0.75 > 0.333, the model assigns Class 1 with weighted confidence.",
    "hint": "Sum 1/d for each class candidate.",
    "level": "Moderate",
    "codeExample": "w1 = 1.0/2.0 + 1.0/4.0  # 0.75\nw0 = 1.0/3.0            # 0.333"
  },
  {
    "id": 7,
    "question": "In K-Means clustering, if Cluster 1 contains points P_1(2, 4), P_2(4, 6), and P_3(6, 8), what are the updated centroid coordinates \u03bc_1?",
    "shortAnswer": "\u03bc_1 = ( (2+4+6)/3, (4+6+8)/3 ) = ( 12/3, 18/3 ) = (4.0, 6.0).",
    "explanation": "The K-Means centroid update step computes the component-wise arithmetic mean of all points assigned to cluster C_k: \u03bc_k = (1 / |C_k|) \u2211_{x \u2208 C_k} x.",
    "hint": "Compute the average X coordinate and average Y coordinate across assigned points.",
    "level": "Basic",
    "codeExample": "pts = np.array([[2, 4], [4, 6], [6, 8]])\ncentroid = np.mean(pts, axis=0)  # array([4., 6.])"
  },
  {
    "id": 8,
    "question": "What is the Within-Cluster Sum of Squares (Inertia contribution) for Cluster 1 points P_1(2,4), P_2(4,6), P_3(6,8) around centroid \u03bc_1(4,6)?",
    "shortAnswer": "Inertia = ||P_1 - \u03bc||^2 + ||P_2 - \u03bc||^2 + ||P_3 - \u03bc||^2 = ((-2)^2 + (-2)^2) + (0^2 + 0^2) + (2^2 + 2^2) = 8 + 0 + 8 = 16.0.",
    "explanation": "P_1 squared distance: (-2)\u00b2 + (-2)\u00b2 = 8. P_2 squared distance: 0\u00b2 + 0\u00b2 = 0. P_3 squared distance: 2\u00b2 + 2\u00b2 = 8. Total cluster inertia = 8 + 0 + 8 = 16.0.",
    "hint": "Sum the squared Euclidean distances from each point to the centroid.",
    "level": "Basic",
    "codeExample": "pts = np.array([[2, 4], [4, 6], [6, 8]])\ncentroid = np.array([4, 6])\nwcss = np.sum((pts - centroid) ** 2)  # 16"
  },
  {
    "id": 9,
    "question": "In Naive Bayes text classification, if Vocabulary |V| = 5, Spam word count = 20, and word 'prize' appears 3 times in Spam, what is the Laplace smoothed likelihood P('prize' | Spam)?",
    "shortAnswer": "P('prize' | Spam) = (Count + 1) / (Total_Words + |V|) = (3 + 1) / (20 + 5) = 4 / 25 = 0.16 (16.0%).",
    "explanation": "Laplace smoothing with \u03b1 = 1 uses formula P(w|C) = (count(w, C) + 1) / (total_words_C + |V|). With count=3, total=20, and |V|=5: (3+1)/(20+5) = 4/25 = 0.16.",
    "hint": "Add 1 to numerator and vocabulary size |V| to denominator.",
    "level": "Basic",
    "codeExample": "p_prize_spam = (3 + 1) / (20 + 5)  # 0.16"
  },
  {
    "id": 10,
    "question": "If training house prices are y = [50, 60, 70] and model predictions are y_hat = [48, 62, 65], what is the Mean Squared Error (MSE)?",
    "shortAnswer": "Residuals = [-2, +2, -5]; Squared = [4, 4, 25]; MSE = (4 + 4 + 25) / 3 = 33 / 3 = 11.0 (Lakhs\u00b2).",
    "explanation": "MSE = (1/N) \u2211 (y_i - y_hat_i)\u00b2. e_1 = 50 - 48 = 2 (e\u00b2 = 4); e_2 = 60 - 62 = -2 (e\u00b2 = 4); e_3 = 70 - 65 = 5 (e\u00b2 = 25). Mean squared error = 33 / 3 = 11.0.",
    "hint": "Compute residuals, square them, and find their arithmetic mean.",
    "level": "Basic",
    "codeExample": "y_true = np.array([50, 60, 70])\ny_pred = np.array([48, 62, 65])\nmse = np.mean((y_true - y_pred) ** 2)  # 11.0"
  },
  {
    "id": 11,
    "question": "What is the Root Mean Squared Error (RMSE) for the predictions in Question 10 (MSE = 11.0)?",
    "shortAnswer": "RMSE = sqrt(11.0) \u2248 3.3166 Lakhs.",
    "explanation": "RMSE is the square root of MSE, returning error to the original target scale in \u20b9 Lakhs: sqrt(11.0) = 3.3166 Lakhs.",
    "hint": "Take the square root of MSE.",
    "level": "Basic",
    "codeExample": "rmse = np.sqrt(11.0)  # 3.31662"
  },
  {
    "id": 12,
    "question": "What is the Mean Absolute Error (MAE) for true y = [50, 60, 70] and predictions y_hat = [48, 62, 65]?",
    "shortAnswer": "MAE = (|50 - 48| + |60 - 62| + |70 - 65|) / 3 = (2 + 2 + 5) / 3 = 9 / 3 = 3.0 Lakhs.",
    "explanation": "MAE = (1/N) \u2211 |y_i - y_hat_i| = (2 + 2 + 5) / 3 = 9 / 3 = 3.0 Lakhs.",
    "hint": "Average the absolute values of the residuals.",
    "level": "Basic",
    "codeExample": "mae = np.mean(np.abs(np.array([50, 60, 70]) - np.array([48, 62, 65])))  # 3.0"
  },
  {
    "id": 13,
    "question": "Given actual targets y = [10, 20, 30] with mean y_bar = 20, and predictions y_hat = [12, 19, 28], calculate the R\u00b2 Score.",
    "shortAnswer": "SS_res = 2^2 + (-1)^2 + (-2)^2 = 4 + 1 + 4 = 9; SS_tot = (-10)^2 + 0^2 + 10^2 = 200; R\u00b2 = 1 - (9/200) = 1 - 0.045 = 0.955 (95.5%).",
    "explanation": "R\u00b2 = 1 - (SS_res / SS_tot). SS_res = (10-12)\u00b2 + (20-19)\u00b2 + (30-28)\u00b2 = 4 + 1 + 4 = 9. SS_tot = (10-20)\u00b2 + (20-20)\u00b2 + (30-20)\u00b2 = 100 + 0 + 100 = 200. R\u00b2 = 1 - 0.045 = 0.955.",
    "hint": "R\u00b2 = 1 - (Residual Sum of Squares / Total Sum of Squares).",
    "level": "Moderate",
    "codeExample": "y = np.array([10, 20, 30])\ny_pred = np.array([12, 19, 28])\nr2 = 1.0 - np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2)  # 0.955"
  },
  {
    "id": 14,
    "question": "In a 1D gradient descent step, current weight is w = 5.0, learning rate \u03b1 = 0.1, and loss gradient dJ/dw = +6.0. What is the updated weight w_new?",
    "shortAnswer": "w_new = w - \u03b1 * (dJ/dw) = 5.0 - (0.1 * 6.0) = 5.0 - 0.60 = 4.40.",
    "explanation": "Gradient descent step subtracts learning rate times gradient: w := w - \u03b1 \u2207J. Because gradient is positive (+6.0), the loss increases with w, so the algorithm reduces w to 4.40.",
    "hint": "Subtract \u03b1 times gradient from current weight.",
    "level": "Basic",
    "codeExample": "w = 5.0\nalpha = 0.1\ngrad = 6.0\nw_new = w - alpha * grad  # 4.40"
  },
  {
    "id": 15,
    "question": "In a binary classification confusion matrix with TP=80, FP=20, FN=10, TN=90, calculate Classification Accuracy.",
    "shortAnswer": "Accuracy = (TP + TN) / Total = (80 + 90) / (80 + 20 + 10 + 90) = 170 / 200 = 0.85 (85.0%).",
    "explanation": "Accuracy measures the proportion of total correct predictions (both positive and negative) over total evaluated samples: (80 + 90) / 200 = 85%.",
    "hint": "Sum of diagonal cells divided by sum of all four matrix cells.",
    "level": "Basic",
    "codeExample": "tp, fp, fn, tn = 80, 20, 10, 90\nacc = (tp + tn) / (tp + fp + fn + tn)  # 0.85"
  },
  {
    "id": 16,
    "question": "Using the confusion matrix in Question 15 (TP=80, FP=20, FN=10, TN=90), calculate Precision.",
    "shortAnswer": "Precision = TP / (TP + FP) = 80 / (80 + 20) = 80 / 100 = 0.80 (80.0%).",
    "explanation": "Precision evaluates exactness: out of 100 instances predicted positive (80 TP + 20 FP), 80 were truly positive: 80 / 100 = 0.80.",
    "hint": "True Positives divided by total predicted positives.",
    "level": "Basic",
    "codeExample": "precision = 80 / (80 + 20)  # 0.80"
  },
  {
    "id": 17,
    "question": "Using the confusion matrix in Question 15 (TP=80, FP=20, FN=10, TN=90), calculate Recall (Sensitivity).",
    "shortAnswer": "Recall = TP / (TP + FN) = 80 / (80 + 10) = 80 / 90 \u2248 0.8889 (88.9%).",
    "explanation": "Recall evaluates completeness: out of 90 actual positive cases in reality (80 TP + 10 FN), the model successfully detected 80: 80 / 90 = 0.8889.",
    "hint": "True Positives divided by total actual positive instances.",
    "level": "Basic",
    "codeExample": "recall = 80 / (80 + 10)  # 0.8889"
  },
  {
    "id": 18,
    "question": "Given Precision = 0.80 and Recall = 0.8889 (8/9), calculate the F1-Score.",
    "shortAnswer": "F1 = 2 * (Precision * Recall) / (Precision + Recall) = 2 * (0.80 * 0.8889) / (0.80 + 0.8889) = 1.4222 / 1.6889 \u2248 0.8421 (84.2%).",
    "explanation": "F1 is the harmonic mean: 2 * (0.8 * 8/9) / (0.8 + 8/9) = 2 * (6.4/9) / (15.2/9) = 12.8 / 15.2 = 16/19 \u2248 0.8421.",
    "hint": "Harmonic mean: 2 * (P * R) / (P + R).",
    "level": "Basic",
    "codeExample": "p, r = 0.80, 8.0/9.0\nf1 = 2 * (p * r) / (p + r)  # 0.8421"
  },
  {
    "id": 19,
    "question": "Calculate the Manhattan Distance (L1 Norm) between vectors u = [1, 2, 5] and v = [4, 6, 1].",
    "shortAnswer": "d_1(u, v) = |1 - 4| + |2 - 6| + |5 - 1| = 3 + 4 + 4 = 11.0.",
    "explanation": "Manhattan distance is the sum of absolute coordinate differences along orthogonal grid axes: \u2211 |u_j - v_j| = 3 + 4 + 4 = 11.0.",
    "hint": "Sum of absolute coordinate differences.",
    "level": "Basic",
    "codeExample": "u = np.array([1, 2, 5])\nv = np.array([4, 6, 1])\nmanhattan = np.sum(np.abs(u - v))  # 11"
  },
  {
    "id": 20,
    "question": "Calculate the Cosine Similarity between vector a = [3, 4] and vector b = [6, 8].",
    "shortAnswer": "a \u00b7 b = (3*6 + 4*8) = 18 + 32 = 50; ||a|| = sqrt(9+16) = 5; ||b|| = sqrt(36+64) = 10; cos(\u03b8) = 50 / (5 * 10) = 50 / 50 = 1.0.",
    "explanation": "Because vector b is an exact positive scalar multiple of vector a (b = 2 * a), they point in the exact same spatial direction (angle \u03b8 = 0\u00b0), giving cosine similarity cos(0\u00b0) = 1.0.",
    "hint": "Collinear vectors in the same direction have cosine similarity 1.0.",
    "level": "Basic",
    "codeExample": "a = np.array([3, 4])\nb = np.array([6, 8])\ncos_sim = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))  # 1.0"
  },
  {
    "id": 21,
    "question": "Calculate the Cosine Similarity between orthogonal vectors u = [1, 0] and v = [0, 5].",
    "shortAnswer": "u \u00b7 v = (1*0 + 0*5) = 0; cos(\u03b8) = 0 / (1 * 5) = 0.0 (angle \u03b8 = 90\u00b0).",
    "explanation": "Perpendicular vectors have a dot product of zero, indicating zero directional alignment: cos(90\u00b0) = 0.0.",
    "hint": "Dot product of perpendicular orthogonal vectors is zero.",
    "level": "Basic",
    "codeExample": "u = np.array([1, 0])\nv = np.array([0, 5])\ncos_sim = np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))  # 0.0"
  },
  {
    "id": 22,
    "question": "For feature values x = [10, 20, 30, 40, 50], calculate the Min-Max Normalized value of x_3 = 30.",
    "shortAnswer": "x_norm = (30 - 10) / (50 - 10) = 20 / 40 = 0.50.",
    "explanation": "Min-Max scaling formula: (x - x_min) / (x_max - x_min). With min=10 and max=50: (30 - 10) / (50 - 10) = 20 / 40 = 0.50.",
    "hint": "Subtract minimum and divide by the total range (max - min).",
    "level": "Basic",
    "codeExample": "x = np.array([10, 20, 30, 40, 50])\nx_norm = (30 - x.min()) / (x.max() - x.min())  # 0.50"
  },
  {
    "id": 23,
    "question": "For feature values with mean \u03bc = 100 and standard deviation \u03c3 = 15, calculate the Standardized (Z-Score) value for raw score x = 130.",
    "shortAnswer": "z = (130 - 100) / 15 = 30 / 15 = +2.0 (2 standard deviations above the mean).",
    "explanation": "Standardization formula: z = (x - \u03bc) / \u03c3. With x=130, \u03bc=100, \u03c3=15: z = 30 / 15 = +2.0.",
    "hint": "Subtract mean and divide by standard deviation.",
    "level": "Basic",
    "codeExample": "z = (130 - 100) / 15.0  # 2.0"
  },
  {
    "id": 24,
    "question": "Given sample P_1 in Cluster A with intra-cluster mean distance a = 2.0, and nearest-cluster mean distance b = 6.0, calculate its Silhouette Coefficient s.",
    "shortAnswer": "s = (b - a) / max(a, b) = (6.0 - 2.0) / max(2.0, 6.0) = 4.0 / 6.0 \u2248 +0.6667.",
    "explanation": "Silhouette formula: s = (b - a) / max(a, b). With a=2.0 and b=6.0: (6 - 2)/6 = 4/6 = +0.6667, indicating high cluster compactness and distinct separation.",
    "hint": "Difference between inter-cluster distance and intra-cluster distance divided by their maximum.",
    "level": "Moderate",
    "codeExample": "a, b = 2.0, 6.0\ns = (b - a) / max(a, b)  # 0.6667"
  },
  {
    "id": 25,
    "question": "Given 5 data points [10, 20, 30, 40, 1000], calculate the Median and compare it to the Mean to demonstrate outlier resistance.",
    "shortAnswer": "Median = 30.0; Mean = (10+20+30+40+1000)/5 = 1100/5 = 220.0.",
    "explanation": "The single outlier (1000) drags the arithmetic mean from ~25 to 220.0. The median (middle sorted value) remains steady at 30.0, demonstrating non-parametric robustness.",
    "hint": "Middle sorted value vs arithmetic sum divided by 5.",
    "level": "Basic",
    "codeExample": "data = [10, 20, 30, 40, 1000]\nprint('Median:', np.median(data))  # 30.0\nprint('Mean:', np.mean(data))      # 220.0"
  },
  {
    "id": 26,
    "question": "In Gini Impurity calculation, if a decision tree node has 6 Pass and 4 Fail samples (p_1 = 0.6, p_0 = 0.4), what is the Gini Impurity?",
    "shortAnswer": "Gini = 1 - (p_1^2 + p_0^2) = 1 - (0.6^2 + 0.4^2) = 1 - (0.36 + 0.16) = 1 - 0.52 = 0.48.",
    "explanation": "Gini Impurity formula: I_G(p) = 1 - \u2211 p_i\u00b2. With p_1=0.6 and p_0=0.4: 1 - (0.36 + 0.16) = 0.48 (maximum binary impurity is 0.50 for 50/50 balance).",
    "hint": "1 minus the sum of squared class probabilities.",
    "level": "Moderate",
    "codeExample": "p1, p0 = 0.6, 0.4\ngini = 1.0 - (p1**2 + p0**2)  # 0.48"
  },
  {
    "id": 27,
    "question": "In Shannon Entropy calculation for the same node (p_1 = 0.5, p_0 = 0.5), what is the Entropy in bits?",
    "shortAnswer": "H = - [ 0.5 log_2(0.5) + 0.5 log_2(0.5) ] = - [ 0.5(-1) + 0.5(-1) ] = -(-1.0) = 1.0 bit.",
    "explanation": "Shannon Entropy H = - \u2211 p_i log_2(p_i). For an evenly split binary node (50% positive, 50% negative), entropy reaches its theoretical maximum of 1.0 bit.",
    "hint": "Negative sum of p_i times base-2 logarithm of p_i.",
    "level": "Moderate",
    "codeExample": "p = 0.5\nentropy = -(p * np.log2(p) + (1-p) * np.log2(1-p))  # 1.0"
  },
  {
    "id": 28,
    "question": "What is the L2 Ridge penalty value for weight vector w = [3, -4] with regularization strength \u03bb = 0.5?",
    "shortAnswer": "Penalty = (\u03bb/2) ||w||_2^2 = (0.5 / 2) * (3^2 + (-4)^2) = 0.25 * (9 + 16) = 0.25 * 25 = 6.25.",
    "explanation": "Ridge penalty is (\u03bb/2) \u2211 w_j\u00b2. For w = [3, -4]: sum of squares is 3\u00b2 + (-4)\u00b2 = 9 + 16 = 25. Multiplying by 0.5/2 gives 6.25.",
    "hint": "Half lambda times the sum of squared weights.",
    "level": "Basic",
    "codeExample": "w = np.array([3, -4])\npenalty = 0.5 * 0.5 * np.sum(w**2)  # 6.25"
  },
  {
    "id": 29,
    "question": "What is the L1 Lasso penalty value for weight vector w = [3, -4] with regularization strength \u03bb = 0.5?",
    "shortAnswer": "Penalty = \u03bb \u2211 |w_j| = 0.5 * (|3| + |-4|) = 0.5 * (3 + 4) = 0.5 * 7 = 3.50.",
    "explanation": "Lasso penalty is \u03bb \u2211 |w_j|. For w = [3, -4]: sum of absolute values is 3 + 4 = 7. Multiplying by \u03bb = 0.5 gives 3.50.",
    "hint": "Lambda times the sum of absolute weight values.",
    "level": "Basic",
    "codeExample": "w = np.array([3, -4])\npenalty = 0.5 * np.sum(np.abs(w))  # 3.5"
  },
  {
    "id": 30,
    "question": "If a dataset has N = 100 samples and we perform 5-Fold Cross-Validation, how many samples are in the training fold and validation fold in each iteration?",
    "shortAnswer": "Training fold = 80 samples (4/5 of N); Validation fold = 20 samples (1/5 of N).",
    "explanation": "K-Fold splits N into K equal partitions of size N/K = 100/5 = 20. In each of the 5 iterations, 1 fold (20 samples) is held out for validation and the remaining K-1 folds (80 samples) are used for model training.",
    "hint": "(K-1)/K for training and 1/K for validation.",
    "level": "Basic",
    "codeExample": "# 5-Fold CV on 100 samples: Train=80, Val=20 per fold across 5 iterations"
  }
];

export default questions;
