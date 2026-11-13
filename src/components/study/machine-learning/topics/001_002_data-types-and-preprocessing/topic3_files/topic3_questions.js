/**
 * Topic 3: Categorical Data
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Module: Data Types and Preprocessing (001_002_data-types-and-preprocessing)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is categorical data, and how does it fundamentally differ from numerical data?",
    "shortAnswer": "Categorical data represents qualitative attributes, labels, or distinct groups lacking inherent arithmetic scale, whereas numerical data represents measurable quantities.",
    "explanation": "Numerical data allows mathematical operations (e.g. 50 kg + 10 kg = 60 kg; income can be doubled). Categorical data represents qualitative classes (e.g. City 'Kolkata', Blood Group 'O+'). Arithmetic operations like addition, subtraction, or scalar multiplication have no mathematical meaning on categories.",
    "hint": "Think about whether adding two values together produces a meaningful mathematical quantity.",
    "level": "Basic",
    "codeExample": "# Numerical: Arithmetically valid\nage_1, age_2 = 25, 30\nmean_age = (age_1 + age_2) / 2  # 27.5 years (Meaningful)\n\n# Categorical: String labels without arithmetic\ncity_1, city_2 = 'Kolkata', 'Barrackpore'\n# city_1 + city_2 produces string concatenation, not a mathematical sum"
  },
  {
    "id": 2,
    "question": "What is the crucial difference between Nominal and Ordinal categorical data?",
    "shortAnswer": "Nominal data has no natural order or hierarchy; Ordinal data possesses an intrinsic, meaningful rank order.",
    "explanation": "Nominal categories (e.g. Blood Group: A, B, AB, O; Eye Color: Brown, Blue; City: Kolkata, Mumbai) can only be checked for equality (== or !=). Ordinal categories (e.g. Education: High School < Bachelors < Masters < PhD; Survey Rating: Poor < Average < Good < Excellent) have a defined sequence, allowing relational comparisons (<, >), though distances between ranks are not calibrated.",
    "hint": "Ask: Can these categories be logically sorted in ascending order from lowest to highest?",
    "level": "Basic",
    "codeExample": "# Nominal: Order is arbitrary\nnominal_colors = ['Red', 'Green', 'Blue']  # Red is not 'greater than' Blue\n\n# Ordinal: Order is intrinsic and meaningful\nordinal_tiers = ['Bronze', 'Silver', 'Gold', 'Platinum']  # Platinum > Gold > Silver > Bronze"
  },
  {
    "id": 3,
    "question": "What is Binary (Dichotomous) categorical data, and what is the difference between symmetric and asymmetric binary data?",
    "shortAnswer": "Binary data has exactly two mutually exclusive states. Symmetric binary states have equal importance, whereas asymmetric binary states have one rare, high-impact outcome.",
    "explanation": "Binary features take values like {0, 1} or {True, False}. In symmetric binary variables (e.g. Gender: Male/Female, Coin Flip: Heads/Tails), both outcomes carry equal analytical weight. In asymmetric binary variables (e.g. Disease Screening: Positive/Negative; Fraud Detection: Fraud/Clean), the positive class is rare and of paramount interest.",
    "hint": "Two states: is one outcome significantly rarer and more critical to detect than the other?",
    "level": "Basic",
    "codeExample": "# Symmetric: Equal importance\nis_subscribed = [1, 0, 1, 1, 0]\n\n# Asymmetric: Rare critical positive event (<0.1%)\nis_cancerous = [0, 0, 0, 1, 0, 0, 0]  # Detecting '1' is far more crucial than '0'"
  },
  {
    "id": 4,
    "question": "Why cannot machine learning models (like Linear Regression or Neural Networks) process raw categorical strings directly?",
    "shortAnswer": "Machine learning algorithms compute dot products, distance metrics, and gradients over numeric tensors; strings cannot be mathematically multiplied or differentiated.",
    "explanation": "Models compute hypotheses like y = w^T x + b. Multiplying a learned weight float w = 0.45 by the string 'Barrackpore' causes a mathematical TypeError. Similarly, gradient descent computes partial derivatives with respect to numeric weights, which requires continuous numerical feature inputs.",
    "hint": "Can you compute the gradient or dot product of a string?",
    "level": "Basic",
    "codeExample": "# Why ML fails on raw strings:\nimport numpy as np\nw = 0.75\nx_cat = 'Kolkata'\n# dot_product = w * x_cat  # TypeError: can't multiply sequence by non-int of type 'float'"
  },
  {
    "id": 5,
    "question": "What is Cardinality in categorical data, and why is it important?",
    "shortAnswer": "Cardinality is the total number of unique distinct categories present in a categorical feature.",
    "explanation": "A column like 'Gender' typically has cardinality 2 or 3 (Low Cardinality). A column like 'Postal PIN Code' or 'Product SKU ID' may have cardinality in the thousands (High Cardinality). Cardinality dictates the choice of encoding strategy: low cardinality suits One-Hot Encoding, while high cardinality causes matrix explosion and requires Target Encoding or Embeddings.",
    "hint": "Count the number of distinct values returned by df['column'].nunique().",
    "level": "Basic",
    "codeExample": "import pandas as pd\ndf = pd.DataFrame({'Gender': ['M', 'F', 'F', 'M'], 'PIN': ['700120', '700122', '700120', '700091']})\nprint('Gender Cardinality:', df['Gender'].nunique())  # 2 (Low)\nprint('PIN Cardinality:', df['PIN'].nunique())        # 3 (Potentially thousands in full dataset)"
  },
  {
    "id": 6,
    "question": "Which measure of central tendency is mathematically valid for Nominal categorical data?",
    "shortAnswer": "The Mode (most frequent category). Mean and Median are completely undefined and mathematically invalid for Nominal data.",
    "explanation": "For nominal categories like ['Kolkata', 'Barrackpore', 'Kolkata', 'Howrah'], you cannot sum the names and divide by 4 to get a 'Mean City'. Nor can you sort them to find a 'Median City'. Only the Mode ('Kolkata', appearing twice) is mathematically valid because it relies solely on frequency counts.",
    "hint": "Think about which statistic is based purely on frequency of occurrence.",
    "level": "Basic",
    "codeExample": "from collections import Counter\ncities = ['Kolkata', 'Barrackpore', 'Kolkata', 'Howrah']\nmode_city = Counter(cities).most_common(1)[0][0]\nprint('Valid Central Tendency (Mode):', mode_city)  # Output: Kolkata"
  },
  {
    "id": 7,
    "question": "Can Median be computed on Ordinal categorical data?",
    "shortAnswer": "Yes. Because Ordinal data possesses an intrinsic sortable rank order, the middle ranked category is a mathematically valid Median.",
    "explanation": "If satisfaction survey ratings are sorted in order: ['Poor', 'Average', 'Average', 'Good', 'Excellent'], the middle value at index 2 is 'Average'. This represents the true 50th percentile rank. However, Mean remains invalid because the psychological distance between 'Poor' and 'Average' may not equal the distance between 'Good' and 'Excellent'.",
    "hint": "Can you arrange the records from lowest to highest rank and pick the middle element?",
    "level": "Moderate",
    "codeExample": "ratings = ['Poor', 'Average', 'Average', 'Good', 'Excellent']\n# Sorted rank indices: [0, 1, 1, 2, 3]\n# Median rank index is 1 -> 'Average'"
  },
  {
    "id": 8,
    "question": "What is the 'Arbitrary Integer Encoding Trap' when applied to Nominal categorical variables?",
    "shortAnswer": "Assigning arbitrary numbers (e.g. Kolkata=1, Barrackpore=2, Howrah=3) to nominal data forces a false mathematical order and distance onto algorithms.",
    "explanation": "If a linear regression or distance-based model sees Kolkata=1, Barrackpore=2, Howrah=3, it assumes that Howrah is 'three times larger' than Kolkata, that Barrackpore is the exact average of Kolkata and Howrah (1 + 3 = 4 / 2 = 2), and that Howrah > Barrackpore > Kolkata. This artificial geometric bias distorts model coefficients and causes negative transfer.",
    "hint": "What does a regression weight do when multiplied by 3 vs multiplied by 1?",
    "level": "Moderate",
    "codeExample": "# Toxic for Linear Models & KNN on Nominal Data:\n# mapping = {'Kolkata': 1, 'Barrackpore': 2, 'Howrah': 3}\n# Model assumes: Howrah - Barrackpore == Barrackpore - Kolkata (Nonsensical!)"
  },
  {
    "id": 9,
    "question": "What is One-Hot Encoding (OHE), and how does it represent categorical data?",
    "shortAnswer": "OHE converts each categorical value into a binary indicator vector of length K, where exactly one position is 1 and all others are 0.",
    "explanation": "For a feature with K unique categories, OHE creates K binary columns. If a record has City = 'Barrackpore', the 'City_Barrackpore' column gets a 1, while 'City_Kolkata' and 'City_Howrah' get 0. This places all categories at equal Euclidean distance (sqrt(2)) from one another in orthogonal vector space.",
    "hint": "Binary indicator columns where exactly one element is 'hot' (1).",
    "level": "Basic",
    "codeExample": "import pandas as pd\ndf = pd.DataFrame({'City': ['Kolkata', 'Barrackpore', 'Howrah']})\nohe_df = pd.get_dummies(df, prefix='City')\nprint(ohe_df)\n# City_Barrackpore  City_Howrah  City_Kolkata\n# 0                 0            0             1\n# 1                 1            0             0\n# 2                 0            1             0"
  },
  {
    "id": 10,
    "question": "What is the 'Dummy Variable Trap', and how does it cause Perfect Multicollinearity?",
    "shortAnswer": "When all K one-hot columns are included alongside an intercept term, the columns sum to 1.0, creating linear dependency and making matrix inversion impossible.",
    "explanation": "In an unregularized linear regression model y = w_0 + w_1 x_1 + ... + w_k x_k, the sum of all K one-hot columns is always identically equal to the bias column (constant 1.0). This creates singular matrix X^T X with zero determinant, causing Ordinary Least Squares (OLS) solver failure. Mitigation: Drop one reference category (use k - 1 dummy columns).",
    "hint": "If you know whether a customer is NOT from Kolkata or Howrah, do you already know they are from Barrackpore?",
    "level": "Moderate",
    "codeExample": "# Drop first column to prevent Dummy Variable Trap in Linear Regression:\nfrom sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(drop='first', sparse_output=False)\nX_encoded = ohe.fit_transform([['Kolkata'], ['Barrackpore'], ['Howrah']])\nprint('Columns created for 3 categories:', X_encoded.shape[1])  # Output: 2"
  },
  {
    "id": 11,
    "question": "Why is One-Hot Encoding inappropriate for High-Cardinality categorical features?",
    "shortAnswer": "It drastically increases matrix dimensionality and sparsity, exhausting memory and causing the Curse of Dimensionality and severe overfitting.",
    "explanation": "If an Indian e-commerce platform has 20,000 postal PIN codes or 100,000 product SKUs, One-Hot Encoding creates 100,000 new sparse columns. For 1,000,000 rows, this produces a matrix with 100 Billion elements (99.999% zeroes), crashing server RAM and diluting the statistical power of training data.",
    "hint": "Imagine 10,000 columns where 9,999 entries per row are zeroes.",
    "level": "Moderate",
    "codeExample": "# 5000 categories -> 5000 new columns\n# Sparsity = (5000 - 1) / 5000 = 99.98% zeroes per row!"
  },
  {
    "id": 12,
    "question": "How should an engineer handle rare categories that appear with very low frequency (e.g. < 1% of rows)?",
    "shortAnswer": "By grouping rare categories into a single composite category, typically labeled 'Other' or 'Rare'.",
    "explanation": "Categories with only 1 or 2 occurrences across thousands of rows lack statistical significance to learn reliable weights. Left isolated in one-hot encoding, models overfit to these individual rows. Grouping all categories with frequency below a threshold (e.g. 1%) into 'Other' reduces cardinality and improves model generalization.",
    "hint": "Bucket the long tail of low-frequency classes into a single collective bin.",
    "level": "Moderate",
    "codeExample": "import pandas as pd\ncounts = df['City'].value_counts(normalize=True)\nrare_cities = counts[counts < 0.01].index\ndf['City_Cleaned'] = df['City'].replace(rare_cities, 'Other')"
  },
  {
    "id": 13,
    "question": "What is the 'Unseen Category Hazard' during production inference, and how is it resolved in Scikit-Learn?",
    "shortAnswer": "When a new test or production sample contains a category not present during training, causing pipeline crashes unless handle_unknown='ignore' is configured.",
    "explanation": "If training data only contains City in {'Kolkata', 'Barrackpore'}, and an inference request arrives with City = 'Durgapur', a naive encoder throws a KeyError. Setting handle_unknown='ignore' in Scikit-Learn's OneHotEncoder outputs a row of all zeroes for the unknown category, allowing the pipeline to execute safely.",
    "hint": "What happens if a new city appears that was never seen in historical training data?",
    "level": "Moderate",
    "codeExample": "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(handle_unknown='ignore', sparse_output=False)\nohe.fit([['Kolkata'], ['Barrackpore']])\n# Safe transformation on unseen category 'Durgapur':\nresult = ohe.transform([['Durgapur']])\nprint(result)  # [[0. 0.]] (Zero row instead of throwing an exception)"
  },
  {
    "id": 14,
    "question": "What is Frequency Encoding (Count Encoding), and when is it useful?",
    "shortAnswer": "Replacing each category with its empirical frequency or percentage count in the training dataset.",
    "explanation": "Frequency encoding replaces strings with their dataset popularity: Frequency(c) = Count(c) / N. It preserves cardinality without expanding dimensionality (1 column remains 1 column). It is particularly useful in tree-based models where the frequency of a category correlates with the target (e.g. rare transaction types being more fraudulent).",
    "hint": "Replace the category name with how common it is in the dataset.",
    "level": "Moderate",
    "codeExample": "import pandas as pd\ndf = pd.DataFrame({'City': ['Kolkata', 'Kolkata', 'Kolkata', 'Barrackpore']})\nfreq_map = df['City'].value_counts(normalize=True).to_dict()\ndf['City_Freq'] = df['City'].map(freq_map)\nprint(df)\n#          City  City_Freq\n# 0     Kolkata       0.75\n# 1     Kolkata       0.75\n# 2     Kolkata       0.75\n# 3  Barrackpore      0.25"
  },
  {
    "id": 15,
    "question": "What is Target Encoding (Mean Encoding), and what is its primary danger?",
    "shortAnswer": "Replacing each category with the average target value for that category; its primary danger is severe Target Leakage and Overfitting.",
    "explanation": "For binary classification, Target Encoding replaces category c with P(y=1 | x=c). While effective for high cardinality without dimensionality expansion, if category 'c' only appears twice in training and both had y=1, the model learns a noisy probability of 1.0, failing to generalize to test data. Mitigation requires smoothing with global prior and out-of-fold cross-validation.",
    "hint": "Using the target variable y to encode features x creates a risk of leakage.",
    "level": "Expert",
    "codeExample": "# Smoothed Target Encoding formula:\n# S_c = (Count_c * Mean_c + m * Global_Mean) / (Count_c + m)\n# Where 'm' is a smoothing parameter (regularization weight)"
  },
  {
    "id": 16,
    "question": "How do Tree-based algorithms (Random Forest, XGBoost) treat integer-encoded categorical features compared to Linear Models?",
    "shortAnswer": "Tree models partition features via orthogonal threshold splits; they do not assume linear proportionality, but can still be misled by arbitrary category orders.",
    "explanation": "In linear regression, encoding Kolkata=1, Barrackpore=2, Howrah=3 enforces y = w * x, meaning Howrah has 3x the slope effect. A Decision Tree, however, can make non-linear splits like 'if City <= 1 (Kolkata) go left, else go right'. However, if related categories are not adjacent in the arbitrary integer order, the tree requires many inefficient splits to isolate them.",
    "hint": "Trees make if-else threshold checks rather than calculating dot products.",
    "level": "Moderate",
    "codeExample": "# In Decision Tree:\n# Split 'City <= 1.5' isolates Kolkata (1) from Barrackpore (2) and Howrah (3)\n# But isolating Kolkata (1) and Howrah (3) together requires multiple fragmented splits!"
  },
  {
    "id": 17,
    "question": "What are Entity Embeddings (Categorical Embeddings) in Deep Learning?",
    "shortAnswer": "Dense continuous vector representations learned for discrete categories via neural network embedding layers.",
    "explanation": "Popularized by Guo & Berkhahn (2016) in the Rossmann Kaggle competition, Entity Embeddings map each discrete category to a low-dimensional continuous vector (e.g. R^16) through a trainable embedding lookup layer. Similar categories (e.g. neighboring cities 'Kolkata' and 'Howrah') naturally cluster together in embedding space.",
    "hint": "Word2Vec applied to tabular categorical columns.",
    "level": "Expert",
    "codeExample": "# PyTorch / Keras Embedding layer for 1000 categories into 16 dimensions:\n# embedding_layer = nn.Embedding(num_embeddings=1000, embedding_dim=16)"
  },
  {
    "id": 18,
    "question": "Why is Mean Imputation strictly forbidden for missing categorical data?",
    "shortAnswer": "Categorical variables have no mathematical arithmetic mean; computing a mean on text strings or arbitrary codes yields meaningless nonsense.",
    "explanation": "If 10% of values in a 'Blood_Group' column are missing (NaN), you cannot calculate an average blood group. Imputing with the mean of arbitrary numerical codes (e.g. A=1, B=2, AB=3, O=4 -> Mean = 2.5) creates a nonexistent category. Categorical missing values must be imputed with the Mode or a dedicated category like 'Missing' / 'Unknown'.",
    "hint": "What is the average of 'Doctor', 'Engineer', and 'Lawyer'?",
    "level": "Basic",
    "codeExample": "import pandas as pd\ns = pd.Series(['A+', 'B+', None, 'A+'])\n# Correct Imputation:\nmode_val = s.mode()[0]\ns_imputed = s.fillna(mode_val)\nprint(s_imputed)  # Output: ['A+', 'B+', 'A+', 'A+']"
  },
  {
    "id": 19,
    "question": "What is the Chi-Square (χ²) Test of Independence in categorical data analysis?",
    "shortAnswer": "A statistical hypothesis test measuring whether a significant association exists between two categorical variables by comparing observed vs expected frequencies.",
    "explanation": "The Chi-Square test evaluates the null hypothesis H_0 that two categorical features (e.g. Gender and Loan Default) are independent. The test statistic compares observed counts O_{ij} in a contingency table against expected counts E_{ij} under independence: χ² = ∑ (O_{ij} - E_{ij})² / E_{ij}. A small p-value (< 0.05) indicates strong predictive association.",
    "hint": "Comparing contingency table counts against expected random distribution.",
    "level": "Moderate",
    "codeExample": "from scipy.stats import chi2_contingency\ncontingency_table = [[50, 10], [20, 40]]  # Row: Gender, Col: Churn\nchi2, p_val, dof, expected = chi2_contingency(contingency_table)\nprint(f'p-value: {p_val:.5f}')  # If p < 0.05, feature is statistically relevant"
  },
  {
    "id": 20,
    "question": "What is Cramér's V, and how does it differ from the Chi-Square statistic?",
    "shortAnswer": "Cramér's V is a normalized measure of association between two nominal categorical variables, bounded between 0.0 (no relationship) and 1.0 (perfect association).",
    "explanation": "While the raw Chi-Square statistic scales with sample size N and contingency table dimensions (making it difficult to interpret strength of association), Cramér's V normalizes it: V = sqrt( χ² / (N * min(r - 1, c - 1)) ). It provides an effect-size correlation coefficient for categorical data analogous to Pearson's r for continuous data.",
    "hint": "The categorical correlation coefficient bounded between 0 and 1.",
    "level": "Expert",
    "codeExample": "import numpy as np\n# V = sqrt( chi2 / (n * min(rows - 1, cols - 1)) )\n# V = 0.85 indicates a very strong association between two nominal features"
  },
  {
    "id": 21,
    "question": "When should an Ordinal categorical variable be treated with One-Hot Encoding instead of Ordinal Encoding?",
    "shortAnswer": "When the relationship between the ordinal categories and the target variable is non-monotonic or non-linear.",
    "explanation": "Ordinal encoding forces a monotonic trend (as rank increases, model response increases or decreases steadily). If the target response is non-monotonic (e.g. Customer satisfaction: 'Very Low' churns, 'Medium' churns lowest, 'Very High' demands discounts and churns high), One-Hot Encoding allows the model to learn independent, non-linear weights for each rank.",
    "hint": "Does higher rank always guarantee a uniformly higher target response?",
    "level": "Moderate",
    "codeExample": "# If Target doesn't scale monotonically with Tier:\n# Bronze -> 10% Churn, Silver -> 5% Churn, Gold -> 35% Churn (U-shaped non-monotonic!)\n# One-Hot Encoding allows independent coefficients for each tier."
  },
  {
    "id": 22,
    "question": "How does CatBoost handle categorical features natively during training?",
    "shortAnswer": "CatBoost uses Ordered Target Statistics computed over online random permutations of the dataset to prevent target leakage.",
    "explanation": "Traditional target encoding uses the entire dataset to compute category averages, causing target leakage. CatBoost simulates a streaming online setup: for each row, it computes target statistics using ONLY the observations that precede it in a random permutation, adding a prior regularizer. This prevents overfitting without manual one-hot encoding.",
    "hint": "Ordered target statistics evaluated over random permutation sequences.",
    "level": "Expert",
    "codeExample": "from catboost import CatBoostClassifier\nmodel = CatBoostClassifier(cat_features=['City', 'Education_Tier'])\n# Automatically encodes categories on-the-fly without leakage!"
  },
  {
    "id": 23,
    "question": "What is the Gower Distance metric, and why is it used for clustering mixed data?",
    "shortAnswer": "A distance metric designed for datasets containing both numerical and categorical variables, scaling distances between 0 and 1 for each feature type.",
    "explanation": "Standard Euclidean distance cannot measure distance between 'Kolkata' and 'Barrackpore'. Gower distance computes partial dissimilarity: for continuous numerical features, it uses normalized absolute difference |x_i - x_j| / Range; for categorical nominal features, it assigns 0 if categories match and 1 if they differ. The weighted average produces an overall distance matrix.",
    "hint": "Distance measure combining normalized range difference with categorical indicator matching.",
    "level": "Expert",
    "codeExample": "# Gower distance for category: d(cat1, cat2) = 0 if cat1 == cat2 else 1\n# Allows K-Medoids or Hierarchical Clustering on mixed tabular data."
  },
  {
    "id": 24,
    "question": "What is Binary Encoding, and how does it bridge the gap between One-Hot Encoding and Integer Encoding?",
    "shortAnswer": "It converts integer-encoded categories into binary digits and splits each bit into a separate column, achieving O(log2 K) dimensionality.",
    "explanation": "For 1,024 categories, One-Hot Encoding creates 1,024 columns. Integer Encoding creates 1 column but introduces false linear order. Binary Encoding assigns integers 0 to 1,023, converts each integer to a 10-bit binary string (e.g. 5 -> '0000000101'), and creates 10 binary columns. This achieves substantial dimensional reduction (10 vs 1,024) while avoiding large artificial distances.",
    "hint": "Base-2 binary representation splitting bits across log2(K) columns.",
    "level": "Moderate",
    "codeExample": "# Category 5 -> Binary '101' -> Col_2=1, Col_1=0, Col_0=1\n# 1,000 categories -> only 10 binary columns instead of 1,000 one-hot columns!"
  },
  {
    "id": 25,
    "question": "What is the difference between Label Encoding and Ordinal Encoding in Scikit-Learn?",
    "shortAnswer": "LabelEncoder is intended strictly for 1D target labels y; OrdinalEncoder is intended for 2D input feature matrices X.",
    "explanation": "A common mistake among beginners is using LabelEncoder() across multiple input feature columns. In Scikit-Learn, LabelEncoder expects a 1D array of target labels. OrdinalEncoder is explicitly designed for multi-column feature matrices X and supports explicit category order definitions and unknown category handling.",
    "hint": "Check the Scikit-Learn documentation for X (2D features) vs y (1D target).",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import OrdinalEncoder\n# Correct for features X:\noe = OrdinalEncoder(categories=[['Low', 'Medium', 'High']])\nX_encoded = oe.fit_transform([['Medium'], ['Low'], ['High']])"
  },
  {
    "id": 26,
    "question": "Why does K-Means clustering fail when categorical features are naively integer-encoded?",
    "shortAnswer": "K-Means computes Euclidean distance and geometric cluster centroids (means), which are arithmetically meaningless on categorical codes.",
    "explanation": "If 'Religion' or 'City' is encoded as 0, 1, 2, K-Means calculates cluster centers by averaging these integers, producing centroids like 'City = 1.4'. Furthermore, Euclidean distance sqrt((1 - 0)^2) vs sqrt((2 - 0)^2) falsely treats category 2 as twice as distant from 0 as category 1 is. K-Modes or K-Prototypes must be used instead.",
    "hint": "K-Means computes arithmetic means of cluster members; categories cannot be averaged.",
    "level": "Moderate",
    "codeExample": "# For categorical clustering, use K-Modes (matches categories) rather than K-Means:\n# from kmodes.kmodes import KModes\n# km = KModes(n_clusters=3).fit(X_categorical)"
  },
  {
    "id": 27,
    "question": "What is Hash Encoding (the Hashing Trick) for high-cardinality categorical variables?",
    "shortAnswer": "Applying a deterministic hash function to map unbounded category strings into a fixed-size vector space of N buckets.",
    "explanation": "FeatureHasher or HashingVectorizer maps raw strings directly into a fixed number of bins (e.g. 128 or 256 columns) using MurmurHash3 without maintaining an in-memory vocabulary dictionary. It supports streaming and infinite cardinality, but risks hash collisions where different categories share the same bin.",
    "hint": "Deterministic hashing into fixed-width buckets without storing a vocabulary.",
    "level": "Expert",
    "codeExample": "from sklearn.feature_extraction import FeatureHasher\nhasher = FeatureHasher(n_features=8, input_type='string')\n# Maps arbitrary strings into exactly 8 sparse dimensions"
  },
  {
    "id": 28,
    "question": "What is Weight of Evidence (WoE) encoding, and why is it popular in credit scoring?",
    "shortAnswer": "WoE measures the log-ratio of good borrowers to bad borrowers for each category, producing a monotonic linear relationship with log-odds.",
    "explanation": "WoE = ln( (% of Non-Defaults in category c) / (% of Defaults in category c) ). Used extensively in financial risk and credit rating scorecards, WoE transforms categorical features into a continuous scale that has a strictly linear relationship with the logit target in Logistic Regression, facilitating regulatory compliance and interpretability.",
    "hint": "Log-odds ratio comparing the distribution of events vs non-events within a category.",
    "level": "Expert",
    "codeExample": "# WoE = ln( Distribution_Good / Distribution_Bad )\n# Information Value (IV) evaluates overall predictive power of the categorical feature"
  },
  {
    "id": 29,
    "question": "How should Ordinal categories be explicitly sorted in Scikit-Learn's OrdinalEncoder to prevent alphabetical distortion?",
    "shortAnswer": "Pass an explicit list of category lists in ascending rank order via the 'categories' parameter.",
    "explanation": "By default, OrdinalEncoder sorts categories alphabetically. If passed ['Low', 'Medium', 'High'], alphabetical sorting assigns High=0, Low=1, Medium=2, completely destroying the real semantic order (Low < Medium < High). Supplying categories=[['Low', 'Medium', 'High']] forces the correct mapping (Low=0, Medium=1, High=2).",
    "hint": "Pass the desired ordered hierarchy explicitly in the categories argument.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import OrdinalEncoder\n# Explicit order:\noe = OrdinalEncoder(categories=[['Poor', 'Fair', 'Good', 'Excellent']])\noe.fit([['Poor'], ['Excellent'], ['Good']])"
  },
  {
    "id": 30,
    "question": "Why must categorical features representing protected attributes (e.g. Religion, Caste, Gender) be audited for indirect proxy encoding in regulated industries?",
    "shortAnswer": "Other high-cardinality categorical features (like Neighborhood or Postal PIN Code) can act as proxies for protected classes, causing indirect algorithmic bias.",
    "explanation": "Even if an Indian FinTech company removes 'Religion' or 'Caste' from loan approval models, high-cardinality features like 'Neighborhood', 'College Name', or 'PIN Code' may strongly correlate with socioeconomic or protected demographic groups. Machine learning models will inadvertently learn discriminatory proxy biases unless explicitly audited and mitigated.",
    "hint": "Dropping the protected column does not prevent other features from acting as proxies.",
    "level": "Expert",
    "codeExample": "# Proxy Correlation Audit:\n# Check mutual information / Cramér's V between PIN_Code and Protected_Attribute"
  }
];

export default questions;
