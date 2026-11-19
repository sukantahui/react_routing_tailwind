/**
 * Topic 7: Data Cleaning & Rectification Architecture
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Course: BCAC701B (MAKAUT Aligned) - Introduction to Machine Learning
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  // =========================================================================
  // BASIC QUESTIONS (1 - 8)
  // =========================================================================
  {
    id: 1,
    question: "What is the primary definition and objective of Data Cleaning in machine learning?",
    shortAnswer: "Data Cleaning is the systematic detection, diagnosis, and rectification of corrupt, inaccurate, incomplete, duplicated, or improperly formatted records to ensure data integrity prior to model training.",
    explanation: "Unlike general preprocessing which handles scaling and feature encoding, Data Cleaning specifically eliminates dirt, sensor glitches, syntax discrepancies, and contradictions so that algorithms learn true ground-truth relationships rather than noise.",
    hint: "Think about removing dirt, errors, and noise versus transforming clean data for models.",
    level: "Basic",
    codeExample: "# Basic Data Cleaning Pipeline in Pandas\ndef basic_clean(df):\n    df = df.drop_duplicates()\n    df['city'] = df['city'].str.strip().str.title()\n    return df"
  },
  {
    id: 2,
    question: "How do structural defects differ from semantic contradictions in raw datasets?",
    shortAnswer: "Structural defects are syntax, formatting, or casing flaws (e.g. 'kolkata' vs 'Kolkata'); semantic contradictions violate real-world business logic (e.g. Age=8 with 15 years of employment).",
    explanation: "Structural issues can often be resolved with regex, whitespace stripping, and casing standardizers. Semantic contradictions require domain-specific logical validation rules (e.g., ensuring child age does not co-occur with professional experience or negative tax dues).",
    hint: "One is about how data is spelled or formatted; the other is about whether the data makes logical sense.",
    level: "Basic",
    codeExample: "# Structural fix: strip and title\ndf['city'] = df['city'].str.strip().str.title()\n\n# Semantic fix: validate logical contradiction\nmask = (df['age'] < 18) & (df['years_employed'] > 0)\ndf.loc[mask, 'years_employed'] = 0"
  },
  {
    id: 3,
    question: "What are hidden sentinel values and why do standard pandas .isna() functions fail to detect them?",
    shortAnswer: "Sentinels are valid numerical or text constants (e.g. -999, 9999, 'N/A', 'Unknown') used by legacy databases to mark missing data; because they are valid types, standard null-checkers treat them as legitimate observations.",
    explanation: "If a medical monitor records -999 when an oxygen sensor unplugs, Python reads it as a valid integer. `df.isna()` returns False, causing the mean blood oxygen calculation to include -999, which heavily skews training features.",
    hint: "Does Python consider -999 as NaN or as a real integer?",
    level: "Basic",
    codeExample: "import pandas as pd\nimport numpy as np\n\ns = pd.Series([98.5, 99.0, -999, 97.2])\n# Wrong: naively computes mean including -999\nprint('Corrupted mean:', s.mean())  # ~ -201.07!\n# Correct: replace sentinels with NaN\ns_clean = s.replace([-999, 9999], np.nan)\nprint('Corrected mean:', s_clean.mean())  # 98.23"
  },
  {
    id: 4,
    question: "What is the difference between Exact Duplicates and Fuzzy Near-Duplicates?",
    shortAnswer: "Exact duplicates are identical across all column values and byte hashes; fuzzy near-duplicates refer to the same physical entity recorded with minor variations (e.g. 'S. Hui' vs 'Sukanta Hui').",
    explanation: "Exact duplicates are trivial to evict using hash sets or `df.drop_duplicates()`. Fuzzy near-duplicates require string similarity metrics like Levenshtein distance, Jaro-Winkler, or phonetic matching to detect and consolidate.",
    hint: "Think about byte-for-byte identical rows versus typos or abbreviated names for the same person.",
    level: "Basic",
    codeExample: "# Exact Deduplication\ndf_exact = df.drop_duplicates(subset=['citizen_id'])\n\n# Fuzzy detection requires similarity algorithms\nfrom difflib import SequenceMatcher\nsim = SequenceMatcher(None, 'Sukanta Hui', 'S. Hui').ratio()\nprint('Fuzzy Similarity:', sim)  # ~0.67"
  },
  {
    id: 5,
    question: "Why can running df.dropna() without prior exploratory profiling severely damage model training?",
    shortAnswer: "Listwise deletion discards every row with even one missing value; if missingness is spread across multiple columns, it can accidentally destroy the majority of the dataset, inducing severe survivorship bias.",
    explanation: "In a dataset with 40 columns each missing just 3% of values randomly, running `dropna()` eliminates over 70% of all observations. Furthermore, if vulnerable or rural citizen demographics have higher missingness, dropping them creates extreme demographic bias.",
    hint: "What percentage of data remains if 30 columns each have 2% independent missing entries?",
    level: "Basic",
    codeExample: "# Example of massive information loss\nimport pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame(np.random.choice([1.0, np.nan], size=(1000, 30), p=[0.97, 0.03]))\nprint(f'Before dropna: {len(df)} rows')\nprint(f'After dropna:  {len(df.dropna())} rows')  # Typically drops ~60% of data!"
  },
  {
    id: 6,
    question: "What is whitespace normalization and why are non-breaking spaces (Unicode \\u00a0) problematic?",
    shortAnswer: "Whitespace normalization removes leading, trailing, and redundant interior spaces; non-breaking spaces (&nbsp; or \\u00a0) fail standard ASCII strip routines, causing identical strings to fail equality checks.",
    explanation: "Web scrapers frequently ingest non-breaking spaces. When joining tables on citizen name, `'Sukanta Hui'` with a normal space does not equal `'Sukanta\\u00a0Hui'` with a non-breaking space, causing silent relational join failures.",
    hint: "Why would two strings that look identical to human eyes evaluate to False in `s1 == s2`?",
    level: "Basic",
    codeExample: "import unicodedata, re\nraw_str = 'Sukanta\\u00a0Hui   '\n# Standard strip does not remove internal non-breaking space!\nclean_str = unicodedata.normalize('NFKD', raw_str).strip()\nclean_str = re.sub(r'\\s+', ' ', clean_str)\nprint('Normalized:', repr(clean_str))"
  },
  {
    id: 7,
    question: "How do inconsistent categorical casings (e.g. 'Kolkata', 'kolkata', 'KOLKATA') harm One-Hot Encoding?",
    shortAnswer: "One-Hot Encoding treats strings case-sensitively, creating separate binary columns for each spelling variation and unnecessarily fragmenting statistical sample weight.",
    explanation: "If 1,000 citizens from Kolkata are split across 'Kolkata' (700), 'kolkata' (200), and 'KOLKATA' (100), three distinct orthogonal features are created. The model treats them as three independent locations, reducing statistical power and confusing tree splits.",
    hint: "How many columns does `pd.get_dummies` create if a city name has 3 casing variations?",
    level: "Basic",
    codeExample: "import pandas as pd\n\ncities = pd.Series(['Kolkata', 'kolkata', 'KOLKATA'])\nprint('Uncleaned One-Hot Columns:', pd.get_dummies(cities).columns.tolist())\n# Cleaned:\nclean_cities = cities.str.strip().str.title()\nprint('Cleaned One-Hot Columns:', pd.get_dummies(clean_cities).columns.tolist())"
  },
  {
    id: 8,
    question: "What is an Audit Trail or Data Lineage Log in an enterprise data cleaning pipeline?",
    shortAnswer: "An immutable log recording every correction, row deletion, and modification made during cleaning, documenting the original value, new value, rule triggered, and timestamp.",
    explanation: "In regulated domains like healthcare and civic tax registries, mutating raw data silently destroys reproducibility and legal compliance. An audit trail allows engineers to verify why a value was imputed or modified and reconstruct the raw input if necessary.",
    hint: "How do you prove to an auditor that an algorithm didn't tamper with financial records?",
    level: "Basic",
    codeExample: "audit_log = []\ndef log_correction(rec_id, field, old_val, new_val, reason):\n    audit_log.append({\n        'record_id': rec_id, 'field': field,\n        'original': old_val, 'corrected': new_val, 'reason': reason\n    })"
  },

  // =========================================================================
  // MODERATE QUESTIONS (9 - 16)
  // =========================================================================
  {
    id: 9,
    question: "Explain the mathematical formulation and dynamic programming computation of Levenshtein Edit Distance.",
    shortAnswer: "Levenshtein distance measures the minimum number of single-character insertions, deletions, or substitutions required to transform string s1 into s2 using a dynamic programming matrix.",
    explanation: "The recurrence is D(i, j) = min(D(i-1, j) + 1, D(i, j-1) + 1, D(i-1, j-1) + cost), where cost = 0 if s1[i] == s2[j] else 1. The matrix runs in O(|s1| * |s2|) time, providing an exact edit distance used to detect fuzzy typographical duplicates.",
    hint: "Recall the 3 allowed edit operations: insert, delete, substitute.",
    level: "Moderate",
    codeExample: "def levenshtein(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0] = i\n    for j in range(n+1): dp[0][j] = j\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            cost = 0 if s1[i-1] == s2[j-1] else 1\n            dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost)\n    return dp[m][n]"
  },
  {
    id: 10,
    question: "How does random measurement noise in feature inputs cause Attenuation Bias in Linear Regression?",
    shortAnswer: "When an explanatory feature contains random measurement noise X_dirty = X + Delta, the estimated coefficient beta_hat is systematically biased towards zero (underestimating the relationship).",
    explanation: "Under the classical Errors-in-Variables model, E[beta_hat] = beta * (sigma_X^2 / (sigma_X^2 + sigma_Delta^2)). Because the noise variance sigma_Delta^2 > 0, the shrinkage factor is strictly less than 1.0, diluting the perceived impact of the predictor.",
    hint: "What happens to the denominator (sigma_X^2 + sigma_Delta^2) as sensor noise increases?",
    level: "Moderate",
    codeExample: "# Attenuation Bias Demonstration\nimport numpy as np\nnp.random.seed(42)\nX_true = np.random.normal(0, 1, 1000)\ny = 3.0 * X_true + np.random.normal(0, 0.5, 1000)\n# Add random sensor measurement noise\nX_noisy = X_true + np.random.normal(0, 1.5, 1000)\nslope_true = np.polyfit(X_true, y, 1)[0]   # ~ 3.0\nslope_noisy = np.polyfit(X_noisy, y, 1)[0] # ~ 0.92 (Heavily attenuated!)"
  },
  {
    id: 11,
    question: "Why does dropping records containing missing values introduce Survivorship Bias in predictive models?",
    shortAnswer: "If missingness is not completely random (e.g. failing businesses or critically ill patients fail to report metrics), dropping them trains the model only on surviving, healthier entities.",
    explanation: "If you are predicting student dropout rates at a college and unmotivated students stop taking optional quizzes, discarding students with missing quiz grades trains the model exclusively on diligent students, blinding it to the exact dropout risk factors.",
    hint: "Who is most likely to fail to fill out a survey or questionnaire?",
    level: "Moderate",
    codeExample: "# Survivorship bias: Discarding nulls purges the at-risk cohort\n# df_clean = df[df['attended_review'].notna()]\n# Result: You just dropped 80% of students who will fail the course!"
  },
  {
    id: 12,
    question: "When is Rule-Based Domain Validation strongly preferred over Machine Learning Anomaly Detection for data cleaning?",
    shortAnswer: "When physical, legal, biological, or arithmetic constraints are known with deterministic certainty (e.g., Age >= 0, Tax >= 0, Discharge Date >= Admission Date).",
    explanation: "ML anomaly detection (like Isolation Forests) is non-deterministic and can produce false positives on legitimate rare events while missing obvious arithmetic rule violations. Deterministic assertions guarantee 100% adherence to domain rules without training data dependencies.",
    hint: "Do you need a neural network to check if a person's age is negative?",
    level: "Moderate",
    codeExample: "# Rule-Based Assertion in Pandas\nassert (df['age'] >= 0).all(), 'Negative age detected!'\nassert (df['discharge_date'] >= df['admission_date']).all(), 'Time travel detected!'"
  },
  {
    id: 13,
    question: "How does the Jaro-Winkler string distance metric differ from standard Levenshtein distance, and why is it favored for person names?",
    shortAnswer: "Jaro-Winkler focuses on character transpositions and assigns higher similarity scores to strings that share a common prefix, mirroring real-world human name spelling patterns.",
    explanation: "In citizen registries, typos in first and last names rarely affect the first 3-4 letters (e.g. 'Banerjee' vs 'Banerji', 'Chakraborty' vs 'Chakravorty'). Jaro-Winkler scales up similarity if the initial prefix matches, making it far superior to Levenshtein for entity resolution.",
    hint: "Why are humans less likely to make a typo on the very first letter of their own surname?",
    level: "Moderate",
    codeExample: "# Jaro-Winkler gives a bonus for matching prefixes (e.g. 'Baner...')\n# Sim_JW = Sim_Jaro + L * p * (1 - Sim_Jaro)\n# where L is length of matching prefix and p is constant scaling factor (0.1)"
  },
  {
    id: 14,
    question: "What are cross-field logical constraints and how do you programmatically detect violations in customer records?",
    shortAnswer: "Cross-field constraints check the arithmetic or logical consistency between two or more interdependent columns (e.g. Total_Loan = Principal + Interest; Work_Experience <= Age - 16).",
    explanation: "A single column might be completely valid on its own (e.g. Age = 7 is valid for a human; Experience = 10 is valid for a career), but their joint intersection is physically impossible. Cross-field validation flags these multidimensional contradictions.",
    hint: "Can two fields both be valid individually, yet impossible together?",
    level: "Moderate",
    codeExample: "import pandas as pd\n# Cross-field violation mask\nviolations = df[df['years_employed'] > (df['age'] - 16)]\nprint(f'Detected {len(violations)} impossible age-experience combinations.')"
  },
  {
    id: 15,
    question: "How should non-standard regional measurement units (such as Maund, Seer, and Quintal) be parsed and standardized?",
    shortAnswer: "Using regex unit-extraction tokenizers that extract both the numeric magnitude and unit label, multiplying by conversion factors to map all entries into standard SI kilograms.",
    explanation: "In wholesale agricultural mandis across West Bengal, transactions mix metric kg, quintals (100 kg), maunds (~37.32 kg), and seers (~0.933 kg). Parsing requires regex extraction of the unit suffix and multiplying into a single canonical float column.",
    hint: "How do you compare 2 maunds of fish with 70 kilograms of fish mathematically?",
    level: "Moderate",
    codeExample: "CONVERSIONS = {'kg': 1.0, 'quintal': 100.0, 'maund': 37.32, 'seer': 0.933}\ndef parse_weight_to_kg(entry_str):\n    import re\n    match = re.match(r'([0-9.]+)\\s*([a-zA-Z]+)', str(entry_str))\n    if match:\n        val, unit = float(match.group(1)), match.group(2).lower()\n        return val * CONVERSIONS.get(unit, 1.0)\n    return None"
  },
  {
    id: 16,
    question: "What is Phonetic String Matching (Soundex / Metaphone) and when is it essential for deduplication?",
    shortAnswer: "Phonetic matching indexes words by their spoken pronunciation rather than exact spelling, allowing detection of homophones and transliteration variations (e.g. 'Banerjee' vs 'Bondopadhyay').",
    explanation: "When digitizing Indian administrative records from Bengali or Hindi to English, multiple transliterations exist for identical names (e.g. 'Choudhury', 'Chowdhury', 'Chowdhuri'). Soundex maps consonants to numeric sound codes, grouping identical phonemes.",
    hint: "How does software recognize that 'Smith' and 'Smyth' sound exactly the same?",
    level: "Moderate",
    codeExample: "# Phonetic indexing maps distinct spellings to identical sound codes\n# e.g. Soundex('Mukherjee') == Soundex('Mukherji') -> 'M262'"
  },

  // =========================================================================
  // ADVANCED QUESTIONS (17 - 24)
  // =========================================================================
  {
    id: 17,
    question: "What is the computational complexity of exhaustive pairwise deduplication on N records, and how is it optimized with Blocking?",
    shortAnswer: "Exhaustive pairwise comparison requires O(N^2) string similarity calculations; Blocking partitions records into smaller buckets sharing an exact attribute (e.g. Ward Number or PIN code), reducing comparisons to O(N * (N/B)).",
    explanation: "Comparing 1,000,000 citizen records pairwise requires (10^6)^2 / 2 = 5 * 10^11 Levenshtein calculations, taking weeks of CPU time. Blocking restricts comparisons only to records sharing identical PIN codes or Soundex phonemes, slashing computation by 99%.",
    hint: "Why compare a citizen in Barrackpore with a citizen in Darjeeling if they can never be the same person?",
    level: "Advanced",
    codeExample: "# Blocking by PIN code\ndef blocked_deduplication(records):\n    from collections import defaultdict\n    blocks = defaultdict(list)\n    for r in records:\n        blocks[r['pin_code']].append(r)\n    # Only compare records WITHIN the same pin_code block!\n    for pin, group in blocks.items():\n        pairwise_fuzzy_match(group)"
  },
  {
    id: 18,
    question: "How does Errors-in-Variables (EIV) modeling address attenuation bias mathematically?",
    shortAnswer: "EIV modeling assumes features have additive error X_obs = X_true + u, and uses Instrumental Variables (IV) or Total Least Squares (Orthogonal Distance Regression) to recover unbiased coefficients.",
    explanation: "Standard OLS assumes independent variables are measured with zero error. When measurement error u ~ N(0, sigma_u^2) exists, ODR minimizes orthogonal Euclidean distance to the fitted hyper-plane rather than vertical squared residuals, correcting the shrinkage factor.",
    hint: "Instead of minimizing vertical residuals (y - y_hat)^2, what if you minimize perpendicular distance from the point to the line?",
    level: "Advanced",
    codeExample: "from scipy.odr import ODR, Model, RealData\n# Orthogonal Distance Regression (ODR) for noisy features\ndef f(B, x): return B[0]*x + B[1]\nmodel = Model(f)\ndata = RealData(X_noisy, y_noisy, sx=1.5, sy=0.5)\nodr = ODR(data, model, beta0=[1.0, 0.0])\noutput = odr.run()\nprint('ODR Unbiased Beta:', output.beta[0])"
  },
  {
    id: 19,
    question: "Explain the trade-off between Precision and Recall when setting the similarity threshold for fuzzy entity resolution.",
    shortAnswer: "A high threshold (e.g. 0.95) maximizes Precision (ensuring merged entities are truly the same) but sacrifices Recall (missing subtle duplicates); a low threshold (e.g. 0.65) catches all duplicates but merges distinct people.",
    explanation: "In banking fraud, missing a duplicate entity (low recall) allows money laundering. In medical surgery records, mistakenly merging two distinct patients with similar names (low precision) can lead to operating on the wrong person. The threshold must be tuned to domain cost matrices.",
    hint: "What is worse: merging two different patients, or having two records for the same patient?",
    level: "Advanced",
    codeExample: "# Setting threshold balance\n# High threshold (0.92): Few merges, zero false merges (High Precision)\n# Low threshold (0.75): Many merges, risky accidental merges (High Recall)"
  },
  {
    id: 20,
    question: "How do Multi-Sensor Agreement Rules differentiate between a genuine cardiac arrest and a mechanical ICU lead disconnect?",
    shortAnswer: "By evaluating corroborating telemetry: if ECG heart rate drops to 0 bpm, but SpO2 pulse waveform and arterial blood pressure remain stable, the event is categorized as an artifact rather than arrest.",
    explanation: "Cleaning medical telemetry requires cross-sensor multivariate logic. A true cardiac arrest causes instantaneous collapse across SpO2, blood pressure, and respiratory sensors. Isolated zero readings in a single channel are classified as sensor lead detachment and imputed.",
    hint: "Can a patient have zero pulse while maintaining normal blood oxygen and consciousness?",
    level: "Advanced",
    codeExample: "def clean_icu_telemetry(row):\n    if row['ecg_bpm'] == 0:\n        if row['spo2_pct'] > 90 and row['art_pressure'] > 60:\n            row['ecg_bpm'] = np.nan  # Lead disconnect artifact!\n            row['artifact_flag'] = True\n    return row"
  },
  {
    id: 21,
    question: "Why must Unicode NFKD normalization be applied prior to regex matching on web-scraped data?",
    shortAnswer: "Unicode allows characters to be represented via different code points (e.g. single precomposed character vs letter + combining accent); NFKD decomposes characters into canonical forms so regex matches consistently.",
    explanation: "For example, 'é' can be stored as \\u00e9 (precomposed) or \\u0065 + \\u0301 (decomposed). To a regex pattern `[a-z]`, the decomposed version matches 'e' but leaves the floating accent dangling, producing corrupted string splits.",
    hint: "What happens when the same human visual glyph has two completely different byte representations in Unicode?",
    level: "Advanced",
    codeExample: "import unicodedata\ns1 = '\\u00e9'        # Precomposed 'é'\ns2 = 'e\\u0301'       # Decomposed 'e' + accent\nprint('Direct equality:', s1 == s2)  # False!\nprint('Normalized equality:', unicodedata.normalize('NFKD', s1) == unicodedata.normalize('NFKD', s2))  # True"
  },
  {
    id: 22,
    question: "What is the difference between Deterministic Record Linkage and Probabilistic Record Linkage (Fellegi-Sunter model)?",
    shortAnswer: "Deterministic linkage requires exact match across designated unique keys (e.g. Aadhaar or PAN); Probabilistic linkage computes match weights across multiple non-unique identifiers to infer entity identity.",
    explanation: "Deterministic linkage fails when primary keys contain typos or are missing. The Fellegi-Sunter method calculates log-likelihood ratio weights for agreeing vs disagreeing fields (Name, DOB, PIN code), summing evidence to classify pairs as Match, Non-Match, or Potential Match.",
    hint: "Can you link records if neither record has an Aadhaar number, but names, addresses, and birthdays match?",
    level: "Advanced",
    codeExample: "# Probabilistic Linkage Weight: w = log2(m_i / u_i) for agreement\n# where m_i = P(agree | match), u_i = P(agree | non-match)"
  },
  {
    id: 23,
    question: "How do you construct an automated pipeline stage to detect schema-level type contamination (e.g. numbers stored as strings with currency symbols)?",
    shortAnswer: "By attempting numeric coercion with error coercion to NaN, comparing the resulting null ratio against original nulls, and applying regex to extract currency symbols and commas.",
    explanation: "Legacy data frequently stores revenues as '₹ 14,500.00' or 'Rs. 14500/-'. An automated type cleaner uses regex `re.sub(r'[^0-9.]', '', s)` to strip currency tokens and comma separators before casting to `float64`.",
    hint: "How does a machine convert '₹ 1,500.50' into a raw floating-point 1500.5?",
    level: "Advanced",
    codeExample: "import re, pandas as pd\ndef sanitize_currency_col(series):\n    return series.astype(str).apply(\n        lambda s: float(re.sub(r'[^0-9.]', '', s)) if re.search(r'\\d', s) else None\n    )"
  },
  {
    id: 24,
    question: "When should impossible negative values (e.g. Property Tax = -Rs 500) be inverted (sign flip) versus set to NaN for imputation?",
    shortAnswer: "Invert (abs(x)) if manual entry slip is proven (e.g. hyphen typed as minus); set to NaN if the value indicates a semantic adjustment (e.g. tax refund/rebate) that violates the positive feature domain.",
    explanation: "If municipal audit logs show data entry operators accidentally typed a dash before tax amounts, taking the absolute value restores ground truth. If the negative value represents a tax credit or rebate, forcing it positive corrupts financial meaning; it must be separated into a distinct feature.",
    hint: "Is -500 an accidental minus sign, or does it represent a Rs 500 tax refund?",
    level: "Advanced",
    codeExample: "# Diagnostic check: Is negative value an entry typo or a refund?\n# If refund: create a separate 'tax_credit' feature, do not blindly abs()!"
  },

  // =========================================================================
  // EXPERT QUESTIONS (25 - 30)
  // =========================================================================
  {
    id: 25,
    question: "Explain the Fellegi-Sunter mathematical framework for probabilistic record linkage and how m-probabilities and u-probabilities are estimated.",
    shortAnswer: "m-probability = P(field agrees | pair is a True Match); u-probability = P(field agrees | pair is a True Non-Match). The agreement weight is w_agree = log2(m/u) and disagreement weight is w_disagree = log2((1-m)/(1-u)).",
    explanation: "A match on a rare surname (e.g., 'Chakraborty') has very low u-probability (rare by chance), resulting in a massive positive log-likelihood weight. A match on 'Gender' has high u (~0.5), yielding little evidence. Summing weights across fields provides mathematically optimal Bayesian classification.",
    hint: "Why is matching on a rare surname far more conclusive evidence than matching on Gender?",
    level: "Expert",
    codeExample: "# Fellegi-Sunter weight calculation\nimport numpy as np\ndef fs_weight(m, u, agree=True):\n    return np.log2(m / u) if agree else np.log2((1 - m) / (1 - u))\n# Surname match: m=0.95, u=0.001 -> Weight = +9.89 bits of evidence!\nprint('Weight for matching rare surname:', round(fs_weight(0.95, 0.001, True), 2))"
  },
  {
    id: 26,
    question: "How do distributed engines (such as Apache Spark) perform fuzzy entity deduplication at billion-record scale using MinHash and Locality-Sensitive Hashing (LSH)?",
    shortAnswer: "MinHash LSH hashes character n-grams into low-dimensional signature buckets such that strings with high Jaccard similarity collide in the same hash bucket with high probability, avoiding O(N^2) comparisons.",
    explanation: "Instead of comparing all pairs across 1 billion rows (10^18 operations), Spark shingle-tokenizes text into 3-grams, computes MinHash signatures, and applies LSH banding. Candidate pairs are only extracted from hash bucket collisions, reducing comparisons to near-linear O(N) complexity.",
    hint: "How can you place similar strings into the same hash bucket without comparing them first?",
    level: "Expert",
    codeExample: "# PySpark MinHash LSH for distributed fuzzy deduplication\n# from pyspark.ml.feature import MinHashLSH, HashingTF, RegexTokenizer\n# model = MinHashLSH(inputCol='features', outputCol='hashes', numHashTables=5)\n# model.approxSimilarityJoin(df, df, threshold=0.8, distCol='JaccardDistance')"
  },
  {
    id: 27,
    question: "How do Modern Data Observability tools (e.g. Great Expectations, Monte Carlo) detect silent data corruption before model inference?",
    shortAnswer: "By compiling declarative data contracts and assertions (distribution bounds, null thresholds, schema integrity, freshness SLAs) that run in-line during ingestion and halt pipelines upon breach.",
    explanation: "Rather than waiting for a model's live revenue predictions to collapse, observability frameworks run assertions like `expect_column_values_to_not_be_null()` and `expect_column_kl_divergence_to_be_less_than()`. Violations trigger automated pipeline halts and alerting.",
    hint: "How does software test data distributions before allowing them into a trained model?",
    level: "Expert",
    codeExample: "# Great Expectations declarative assertion\n# validator.expect_column_values_to_be_between('age', min_value=18, max_value=100)\n# validator.expect_column_unique_value_count_to_be_between('locality', min_value=5, max_value=50)"
  },
  {
    id: 28,
    question: "Why can automated outlier purging in medical diagnostic datasets accidentally eliminate rare, life-threatening pathologies?",
    shortAnswer: "Life-threatening acute events (e.g. malignant hypertension, diabetic ketoacidosis) present as extreme statistical outliers; purging them removes the vital positive training cases from the clinical model.",
    explanation: "In oncology and emergency triage, 99% of patients have normal vital signs. A patient in septic shock has extreme body temperature and white blood cell count. If an automated script drops everything beyond 3 standard deviations, it purges the very pathology the model is designed to detect.",
    hint: "What does an extreme outlier in an emergency room dataset usually mean?",
    level: "Expert",
    codeExample: "# DANGER: Naive outlier removal in medical data destroys positive labels\n# clean_df = df[np.abs(z_scores) < 3.0]  # ERASING ACUTE EMERGENCY PATIENTS!"
  },
  {
    id: 29,
    question: "How does Graph-Based Entity Resolution (Connected Components / Community Detection) cluster multi-table entity duplicates?",
    shortAnswer: "By modeling candidate records as graph nodes and similarity matches above a threshold as edges; connected component algorithms extract subgraphs representing unified physical entities.",
    explanation: "If Record A matches Record B (via phone number) and Record B matches Record C (via street address and last name), transitivity implies A, B, and C represent the same individual. Connected component graph algorithms cluster them together into a single resolved golden entity record.",
    hint: "If A is B, and B is C, what is the relationship between A and C?",
    level: "Expert",
    codeExample: "import networkx as nx\nG = nx.Graph()\nG.add_edge('Record_A', 'Record_B')\nG.add_edge('Record_B', 'Record_C')\nclusters = list(nx.connected_components(G))\nprint('Resolved Entity Cluster:', clusters)  # [{'Record_A', 'Record_B', 'Record_C'}]"
  },
  {
    id: 30,
    question: "In continuous real-time streaming architectures (e.g. Apache Flink / Kafka), how is stateful deduplication performed using sliding time windows and Bloom Filters?",
    shortAnswer: "Streaming engines maintain a stateful Bloom filter or RocksDB hash index over a sliding time window (e.g. 10 minutes); incoming messages probe the filter to instantly evict duplicate retries.",
    explanation: "In real-time IoT or smart meter ingestion, network retransmissions flood Kafka topics. Flink maintains a memory-efficient probabilistic Bloom filter of seen message hashes over sliding window delta_t. If a message hash exists in the filter, it is dropped in sub-millisecond latency without querying external databases.",
    hint: "How do you detect duplicates in a stream of 100,000 events per second without querying a slow database?",
    level: "Expert",
    codeExample: "# Conceptual Streaming Deduplication using sliding window Bloom Filter\n# if bloom_filter.contains(event.hash):\n#     drop_event(event) # Evicts duplicate within 10-minute retry window\n# else:\n#     bloom_filter.add(event.hash)\n#     emit_event(event)"
  }
];

export default questions;
