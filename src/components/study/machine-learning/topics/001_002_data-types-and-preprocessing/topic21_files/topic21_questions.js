/**
 * Topic 21: Worked Example 1: Cleaning a student dataset
 * 30 Masterclass Assessment Questions (Foundation to Industrial Scale)
 * Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax | Barrackpore
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & DATA HYGIENE CONCEPTS (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    question: "What is the 'Garbage-In, Garbage-Out' (GIGO) theorem in machine learning and why is data cleaning non-negotiable?",
    shortAnswer: "If training data contains systematic corruptions or measurement noise, empirical risk minimization converges to biased parameters; no model architecture or tuning can overcome contaminated inputs.",
    explanation: "Supervised algorithms optimize weights to fit empirical observations: w_hat = argmin (1/N) sum L(h(x_i; w), y_i). If x_i or y_i contains typos, erroneous sentinels, or duplicate records, the loss surface is distorted, leading to false decision boundaries and poor real-world generalization.",
    hint: "Can the most advanced deep neural network make accurate predictions if the inputs are full of typos and negative ages?",
    level: "Basic",
    codeExample: "# GIGO illustration:\n# Corrupted input: age = 210, marks = -999\n# Model fits bogus weights to accommodate 210 and -999!"
  },
  {
    id: 2,
    question: "What is the difference between an Exact Duplicate record and a Key Duplicate record?",
    shortAnswer: "An exact duplicate has identical values across every single column, whereas a key duplicate shares the same unique identifier (primary key) but has slight discrepancies in other attributes.",
    explanation: "In student databases, exact duplicates occur when a row is accidentally exported or submitted twice (e.g. duplicate web form clicks). Key duplicates occur when a student registers under roll number 'WB-001' with 'BCA', and later re-registers as 'wb-001' with 'B.Tech' due to system migration.",
    hint: "Think about checking all columns vs checking only the Roll Number.",
    level: "Basic",
    codeExample: "# Exact duplicate:\n# ['WB-001', 'Susmita', 88] and ['WB-001', 'Susmita', 88]\n# Key duplicate:\n# ['WB-001', 'Susmita', 88] and ['wb-001', 'Susmita Sen', 90]"
  },
  {
    id: 3,
    question: "What is a Sentinel Value in legacy datasets?",
    shortAnswer: "A predetermined artificial value (such as -999, 9999, or 'NA') used by legacy databases to represent missing or non-applicable data in non-nullable columns.",
    explanation: "Older relational systems often prohibited NULL in numeric columns. Programmers used extreme numbers like -999 or 0 to denote missing exam marks. If unhandled, modern ML models treat -999 as a literal quantitative mark, drastically distorting averages and gradient descent updates.",
    hint: "Why would a student's exam score be listed as -999?",
    level: "Basic",
    codeExample: "# Convert sentinel to NaN:\nimport numpy as np\ndf['marks'] = df['marks'].replace(-999.0, np.nan)"
  },
  {
    id: 4,
    question: "Why does trailing and leading whitespace in categorical strings cause critical pipeline errors?",
    shortAnswer: "Because string equality comparisons treat 'Barrackpore' and 'Barrackpore ' as completely different categories, fragmenting sample counts and bloating One-Hot matrices.",
    explanation: "In Python, 'Barrackpore' == 'Barrackpore ' evaluates to False because of the trailing space character. If encoded with One-Hot Encoding, this creates two separate columns for the same physical city, splitting sample support and causing high-cardinality inflation.",
    hint: "What does 'Kolkata' == 'Kolkata ' return?",
    level: "Basic",
    codeExample: "city1 = 'Barrackpore'\ncity2 = 'Barrackpore '\nassert (city1 == city2) == False\nassert (city1.strip() == city2.strip()) == True"
  },
  {
    id: 5,
    question: "What is an Out-of-Range Boundary defect in student records?",
    shortAnswer: "A value that violates known domain-specific physical constraints, such as Age = -3 or Examination Marks = 950 out of 100.",
    explanation: "College students have physiological age boundaries (typically 17 to 40 years). Similarly, percentage marks cannot exceed 100 or fall below 0. Values like -3 or 950 are typographical entry errors (e.g. accidental negative sign or omitted decimal point) that violate closed interval invariants.",
    hint: "Can a student have an age of 210 or marks of 950 on a 100-mark test?",
    level: "Basic",
    codeExample: "# Range check assertion:\nassert 0.0 <= student_marks <= 100.0, 'Invalid mark boundary!'"
  },
  {
    id: 6,
    question: "What is a Cross-Field Logical Contradiction in an academic dataset?",
    shortAnswer: "A scenario where two or more fields in the same record contain mutually exclusive or logically incompatible information according to business rules.",
    explanation: "If a college's official passing rule is Marks >= 40.0, a record with Marks = 28.0 and Status = 'PASS' is a logical contradiction. Similarly, Attendance = 95% with Total Days Present = 2 / 100 violates arithmetic integrity. These must be resolved deterministically.",
    hint: "Can a student with 25% marks have 'PASS' status under a 40% passing rule?",
    level: "Basic",
    codeExample: "# Consistency rule:\nif marks >= 40.0:\n    status = 'PASS'\nelse:\n    status = 'FAIL'"
  },
  {
    id: 7,
    question: "What does the term 'Entity Resolution' mean in student data cleaning?",
    shortAnswer: "The process of identifying and standardizing multiple textual aliases, abbreviations, and misspellings that refer to the exact same real-world entity.",
    explanation: "In West Bengal student databases, applicants enter 'Calcutta', 'kolkata', 'Kolkata ', and 'KOLKATA'. Entity resolution maps all these typographical variants to the single canonical entity 'Kolkata'.",
    hint: "Mapping 'Calcutta' and 'Kolkata' to a single standard name.",
    level: "Basic",
    codeExample: "district_map = {'CALCUTTA': 'Kolkata', 'KOLKATA ': 'Kolkata'}\nclean_district = district_map.get(raw.strip().upper(), raw.title())"
  },
  {
    id: 8,
    question: "What are the four primary defect categories classified in data hygiene frameworks?",
    shortAnswer: "1. Syntactic (formatting/casing), 2. Semantic (invalid/sentinel values), 3. Structural (duplicates/schema type collisions), 4. Logical (cross-field contradictions).",
    explanation: "This formal 4-part taxonomy structures data cleaning into distinct algorithmic validation layers, ensuring all formatting, boundary, schema, and relational business rules are validated systematically.",
    hint: "Syntax, Semantics, Structure, Logic.",
    level: "Basic",
    codeExample: "# Syntactic: 'mca ' -> 'MCA'\n# Semantic: -999 -> NaN\n# Structural: duplicate roll_no\n# Logical: marks=20 with status='PASS'"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & FORMULATIONS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    question: "Formulate the Primary Key Uniqueness Invariant for relational dataset D.",
    shortAnswer: "| { PK(r) : r in D } | == | D | = N. The cardinality of the set of extracted normalized primary keys must equal total row count.",
    explanation: "Let D be a dataset of N records and PK(r) be the normalized primary key extraction function (e.g. roll_no). If the cardinality of unique keys is strictly less than N, a collision exists, proving the presence of duplicate entity registrations.",
    hint: "If you have 100 rows, how many unique roll numbers must exist?",
    level: "Intermediate",
    codeExample: "# Primary key uniqueness invariant:\nassert len(set(df['roll_no'])) == len(df), 'Key collision detected!'"
  },
  {
    id: 10,
    question: "State the mathematical clamping operator pi_{[a, b]}(x) used for domain boundary outlier correction.",
    shortAnswer: "pi_{[a, b]}(x) = max( a, min(x, b) ), projecting out-of-bounds values onto the closest boundary of the closed interval [a, b].",
    explanation: "When an attribute must strictly reside within [a, b] (e.g. marks in [0, 100]), values exceeding b are clamped to b, and values below a are clamped to a. This projects unphysical measurements onto the permissible convex boundary.",
    hint: "Take the minimum with the upper bound, then the maximum with the lower bound.",
    level: "Intermediate",
    codeExample: "def clamp(x, low=0.0, high=100.0):\n    return max(low, min(x, high))\n\nprint(clamp(105.0)) # 100.0\nprint(clamp(-12.0))  # 0.0"
  },
  {
    id: 11,
    question: "Why is the sample median mathematically optimal for imputing missing exam marks compared to the mean?",
    shortAnswer: "Because the sample median is the unique minimizer of L1 loss (sum of absolute errors): median(M) = argmin sum |m_i - c|, and has a 50% breakdown point against extreme outliers.",
    explanation: "The sample mean minimizes L2 squared loss, making it highly sensitive to outliers: a single typo of 950.0 marks inflates the mean drastically. The median has a 50% breakdown point, remaining completely stable even if up to half the cohort has extreme corrupted marks.",
    hint: "What loss function does the median minimize? What is its breakdown point?",
    level: "Intermediate",
    codeExample: "# L1 optimality:\n# Median minimizes: sum |x_i - c|\n# Mean minimizes:   sum (x_i - c)^2"
  },
  {
    id: 12,
    question: "Formulate the Levenshtein Distance recurrence relation for two strings s_1 and s_2.",
    shortAnswer: "lev(s_1, s_2) = 1 + min(lev(tail(s_1), s_2), lev(s_1, tail(s_2)), lev(tail(s_1), tail(s_2))) when characters differ, and lev(tail(s_1), tail(s_2)) when characters match.",
    explanation: "Levenshtein distance measures the minimum number of single-character insertions, deletions, or substitutions required to transform string s_1 into s_2. In entity resolution, it provides a deterministic metric to cluster misspelled regional names (e.g. 'Barackpore' vs 'Barrackpore').",
    hint: "Cost of deletion, insertion, or substitution.",
    level: "Intermediate",
    codeExample: "# Levenshtein('Barackpore', 'Barrackpore') = 1 (insert 'r')"
  },
  {
    id: 13,
    question: "What is the mathematical formulation of Jaro-Winkler string similarity and why is it tailored for municipal names?",
    shortAnswer: "JW(s_1, s_2) = Sim_Jaro + l * p * (1 - Sim_Jaro), giving bonus weight to shared prefixes up to length l <= 4 with scaling factor p = 0.1.",
    explanation: "Most typographical errors in proper nouns (like West Bengal districts) occur in the middle or end of words rather than the beginning. By placing extra mathematical weight on matching prefixes, Jaro-Winkler accurately identifies spelling variations like 'Kolkata' vs 'Kolkatta' while avoiding false positive matches.",
    hint: "It boosts similarity when the first few letters match perfectly.",
    level: "Intermediate",
    codeExample: "# Jaro-Winkler gives high score to ('Kolkata', 'Kolkatta') because prefix 'Kolk' matches"
  },
  {
    id: 14,
    question: "Formulate the Boolean predicate rule for functional dependency Marks -> Status under university passing threshold theta.",
    shortAnswer: "I( Marks >= theta ) == I( Status == 'PASS' ), where I is the indicator function.",
    explanation: "If a student has Marks >= 40.0, the left-hand indicator is 1. If Status is 'PASS', the right-hand indicator is 1, satisfying the invariant (1 == 1). If Status is 'FAIL', the equation evaluates to 1 == 0, triggering an automated logical reconciliation.",
    hint: "Compare indicator of passing score with indicator of pass status.",
    level: "Intermediate",
    codeExample: "is_score_pass = (marks >= 40.0)\nis_status_pass = (status.upper() == 'PASS')\nassert is_score_pass == is_status_pass, 'Contradiction detected!'"
  },
  {
    id: 15,
    question: "What is the Error Rate formula for evaluating the hygiene improvement of a dataset before and after cleaning?",
    shortAnswer: "Error_Rate = (Total Defective Fields) / (Total Evaluated Fields) = (sum_{i,j} I(cell_{i,j} is invalid)) / (N * D).",
    explanation: "To quantify cleaning impact for academic audits, the total count of corruptions (duplicates, typos, sentinels, contradictions) is divided by the total matrix cell count (N * D). A robust pipeline reduces Error_Rate from 15-20% down to 0.0%.",
    hint: "Fraction of corrupt cells over total cells in the matrix.",
    level: "Intermediate",
    codeExample: "# error_rate = total_defects / (num_rows * num_columns)"
  },
  {
    id: 16,
    question: "Why does Departmental Group Median Imputation preserve subgroup distribution variance better than Global Median Imputation?",
    shortAnswer: "Because it computes medians conditioned on department D: m_hat = median(M | dept = D), preserving intrinsic performance differences between academic disciplines.",
    explanation: "If Computer Science marks center at 85% while Mechanical Engineering marks center at 55%, global median imputation assigns ~70% to missing entries in both departments, artificially deflating CS performance and inflating ME performance. Conditioning on department preserves authentic departmental distributions.",
    hint: "Conditional median vs unconditional global median.",
    level: "Intermediate",
    codeExample: "df['marks'] = df.groupby('dept')['marks'].transform(lambda g: g.fillna(g.median()))"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE & ENGINEERING IMPLEMENTATION (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    question: "What is Idempotency in data engineering and why must cleaning pipelines satisfy f(f(X)) = f(X)?",
    shortAnswer: "Idempotency guarantees that executing the cleaning pipeline multiple times produces no additional changes after the first run, preventing unintended side effects during pipeline retries.",
    explanation: "In distributed workflow managers (Apache Airflow, Kubeflow), tasks frequently retry upon transient network or worker errors. If a cleaning step is non-idempotent (e.g. appending a prefix or re-scaling already scaled values), running it twice corrupts the data. Idempotency guarantees absolute stability.",
    hint: "f(f(x)) = f(x): doing it twice leaves the result identical to doing it once.",
    level: "Advanced",
    codeExample: "# Idempotent strip and uppercase:\ndef clean_text(s):\n    return s.strip().upper()\n\nassert clean_text(clean_text('  kolkata  ')) == clean_text('  kolkata  ')"
  },
  {
    id: 18,
    question: "Why is `errors='coerce'` in Pandas `pd.to_numeric()` dangerous if used without logging?",
    shortAnswer: "Because it silently converts invalid or corrupted strings into NaN, masking OCR extraction errors or bad data entries without creating an audit trail.",
    explanation: "Calling `pd.to_numeric(df['marks'], errors='coerce')` turns '95.0' into 95.0, but turns 'Ninety-Five' or '95A' into `NaN` with zero warnings. Without an audit log, the team cannot identify whether the value was originally blank or a corrupted entry, destroying data provenance.",
    hint: "Does errors='coerce' alert you when a string fails to convert?",
    level: "Advanced",
    codeExample: "# SAFE PRODUCTION PATTERN:\nbad_mask = pd.to_numeric(df['marks'], errors='coerce').isna() & df['marks'].notna()\nif bad_mask.any():\n    logger.warning(f'Corrupted values detected: {df.loc[bad_mask, \"marks\"].tolist()}')"
  },
  {
    id: 19,
    question: "How does Scikit-Learn's `MissingIndicator` support Data Provenance in missing value imputation pipelines?",
    shortAnswer: "It generates a complementary binary column indicating whether each original cell was imputed (1) or observed (0), allowing downstream models to learn missingness signals.",
    explanation: "When an imputer replaces a null mark with a median, the model cannot distinguish between a student who actually scored that median versus one whose data was missing. `MissingIndicator` (or `SimpleImputer(add_indicator=True)`) preserves provenance, allowing the algorithm to adjust predictions if missingness correlates with risk.",
    hint: "Adds an extra column: 1 if imputed, 0 if genuine.",
    level: "Advanced",
    codeExample: "from sklearn.impute import SimpleImputer\nimputer = SimpleImputer(strategy='median', add_indicator=True)\nX_imputed = imputer.fit_transform(X)"
  },
  {
    id: 20,
    question: "Why should `dropna()` NOT be used as the default cleaning strategy for academic datasets?",
    shortAnswer: "Because it induces severe sample attrition and introduces selection bias if missingness is correlated with socioeconomic or performance factors (MAR / MNAR).",
    explanation: "Calling `df.dropna()` on a dataset with 10 features where each feature has 5% missingness can discard up to 40% of all student records. Furthermore, if economically disadvantaged students are less likely to report parental income, dropping those rows systematically excludes an entire demographic subgroup.",
    hint: "What happens to your dataset size if you drop any row with even one missing cell?",
    level: "Advanced",
    codeExample: "# High attrition danger:\n# df.dropna() -> Drops 350 out of 1000 students!\n# Better: Impute marks using departmental median"
  },
  {
    id: 21,
    question: "How do you detect and resolve decimal shift typographical errors (e.g. Marks = 950.0 out of 100) using vectorized Pandas logic?",
    shortAnswer: "Identify values where marks > 100 and marks <= 1000, and divide them by 10 to recover the true decimal score.",
    explanation: "Data entry operators typing on numpads frequently omit the decimal point, entering '950' instead of '95.0'. A targeted rule `df.loc[(df['marks'] > 100) & (df['marks'] <= 1000), 'marks'] /= 10.0` deterministically recovers the intended score and logs the correction.",
    hint: "If marks are 950 on a 100-mark test, what did the operator likely intend to type?",
    level: "Advanced",
    codeExample: "typo_mask = (df['marks'] > 100.0) & (df['marks'] <= 1000.0)\ndf.loc[typo_mask, 'marks'] /= 10.0"
  },
  {
    id: 22,
    question: "How do you implement an immutable, reproducible cleaning pipeline using Scikit-Learn's `FunctionTransformer`?",
    shortAnswer: "Wrap custom Python cleaning functions inside FunctionTransformer and integrate them into a Scikit-Learn Pipeline.",
    explanation: "Wrapping cleaning functions in `FunctionTransformer` ensures that the exact same sequence of data cleaning transformations applied during training is executed during live production inference, preventing training-serving skew.",
    hint: "Use from sklearn.preprocessing import FunctionTransformer.",
    level: "Advanced",
    codeExample: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import FunctionTransformer\n\ndef clean_text_df(df):\n    df_clean = df.copy()\n    df_clean['district'] = df_clean['district'].str.strip().str.title()\n    return df_clean\n\ncleaning_pipeline = Pipeline([('text_cleaner', FunctionTransformer(clean_text_df))])"
  },
  {
    id: 23,
    question: "Why must deduplication be performed BEFORE missing value imputation?",
    shortAnswer: "Because duplicate rows artificially skew the calculation of group medians and means, distorting the imputation values applied to legitimate records.",
    explanation: "If a student with an extreme or erroneous mark is duplicated 10 times in the raw CSV, those duplicate records will pull the departmental median or mean toward that corrupted value. Deduplicating first ensures that imputation statistics reflect genuine cohort distributions.",
    hint: "Do duplicate records belong in your average calculations?",
    level: "Advanced",
    codeExample: "# CORRECT PIPELINE SEQUENCE:\n# 1. df = df.drop_duplicates()\n# 2. median = df.groupby('dept')['marks'].median()\n# 3. df['marks'] = df['marks'].fillna(median)"
  },
  {
    id: 24,
    question: "How does Pandas `drop_duplicates(subset=['roll_no'], keep='first')` resolve primary key collisions?",
    shortAnswer: "It inspects the designated subset column, identifies colliding keys, and retains only the first occurrence while discarding subsequent duplicate registrations.",
    explanation: "In student registration systems, specifying `subset=['roll_no']` guarantees that every record in the output DataFrame has a unique Roll Number. Pairing it with `.sort_values('timestamp')` ensures the most recent or verified submission is retained.",
    hint: "Use subset=['roll_no'] to enforce primary key uniqueness.",
    level: "Advanced",
    codeExample: "df_clean = df.sort_values('timestamp').drop_duplicates(subset=['roll_no'], keep='last')"
  },

  // =========================================================================
  // TIER 4: INDUSTRIAL SCALE, AUDITING & PRODUCTION EDGE CASES (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    question: "What is a 'Data Contract' in modern enterprise ML architecture and how does it prevent dirty data from reaching production pipelines?",
    shortAnswer: "A formal schema specification (e.g. using Pydantic or Great Expectations) that validates data types, range bounds, and nullability at the API ingestion boundary before data enters downstream models.",
    explanation: "Data contracts act as strict gatekeepers: if an incoming college upload contains negative ages, missing roll numbers, or unknown department codes, the contract validation raises a validation exception and rejects the payload at ingestion, preventing corrupted records from entering the data warehouse.",
    hint: "Think of an API schema gatekeeper like Pydantic or Great Expectations.",
    level: "Expert",
    codeExample: "# Pydantic Data Contract:\nfrom pydantic import BaseModel, Field\nclass StudentRecord(BaseModel):\n    roll_no: str = Field(pattern=r'^WB-\\d{4}-\\d{3}$')\n    age: int = Field(ge=17, le=40)\n    marks: float = Field(ge=0.0, le=100.0)"
  },
  {
    id: 26,
    question: "In the MAKAUT examination portal, a legacy script calculated marks averages using `df['marks'].mean()`. Why did this cause 12,000 students to falsely receive failing grades?",
    shortAnswer: "Because absent students were encoded with sentinel value -999; taking the arithmetic mean included -999 as a real score, driving cohort averages negative.",
    explanation: "If 10 students score 80 marks and 2 absent students have sentinel mark -999: Sum = 800 + (-1998) = -1198. Mean = -1198 / 12 = -99.8%! The arithmetic mean treated the sentinel code as a literal negative exam score, destroying the grading curve.",
    hint: "What happens to a class average when you add -999 to it?",
    level: "Expert",
    codeExample: "# Legacy bug:\nmarks = [85.0, 90.0, -999.0]\nprint('Naive mean:', sum(marks) / len(marks)) # -274.67! (Catastrophic error)"
  },
  {
    id: 27,
    question: "Under India's Digital Personal Data Protection (DPDP) Act 2023, why is an immutable audit log required during student data cleaning?",
    shortAnswer: "Because modifying or imputing student records constitutes data processing; regulatory compliance requires full traceability of who altered data, what formula was applied, and original values.",
    explanation: "The DPDP Act 2023 and academic accreditation bodies mandate that educational institutions maintain an unalterable audit trail. If a student's mark is imputed or their age is corrected, the institution must be able to prove why the change was made and preserve the original raw record for regulatory audits.",
    hint: "Regulatory law requires proof of how and why personal records were altered.",
    level: "Expert",
    codeExample: "# Audit log entry:\n# {'timestamp': '2026-11-19T10:00:00Z', 'action': 'IMPUTATION', 'field': 'marks', 'old': None, 'new': 78.5, 'rule': 'dept_median'}"
  },
  {
    id: 28,
    question: "A data pipeline performs group median imputation on the combined training and test set before evaluating an XGBoost student dropout model. Diagnose the flaw.",
    shortAnswer: "Data leakage: test set marks contributed to the calculation of departmental medians, giving the training pipeline illicit access to future test distributions.",
    explanation: "Computing statistics across the entire dataset blurs the strict boundary between training and testing. If the test set has an unusually high concentration of failing marks, the departmental median is pulled downward, leaking test information into the training features. Always fit imputers strictly on X_train.",
    hint: "Did the test set influence the median calculation?",
    level: "Expert",
    codeExample: "# CATASTROPHIC DATA LEAKAGE:\n# imputer.fit(df) # Fits on EVERYTHING!\n\n# CORRECT ZERO-LEAKAGE PATTERN:\n# imputer.fit(X_train)\n# X_train_clean = imputer.transform(X_train)\n# X_test_clean  = imputer.transform(X_test)"
  },
  {
    id: 29,
    question: "How do you detect Data Drift in student admission records across successive academic years?",
    shortAnswer: "By computing Kolmogorov-Smirnov (KS) tests on continuous marks and Population Stability Index (PSI) on categorical districts across academic cohorts.",
    explanation: "If the 2024 student intake has a median entrance mark of 82%, and the 2025 intake has a median entrance mark of 58%, the underlying population distribution has drifted. Monitoring KS-statistics and PSI alerts engineers to retrain models and recalibrate imputation medians.",
    hint: "Use statistical distribution comparison tests like KS-test and PSI.",
    level: "Expert",
    codeExample: "from scipy.stats import ks_2samp\nstat, p_val = ks_2samp(marks_2024, marks_2025)\n# If p_val < 0.05, significant cohort distribution drift detected!"
  },
  {
    id: 30,
    question: "Summarize the 6-stage golden execution sequence for cleaning a relational tabular dataset.",
    shortAnswer: "1. Schema Ingestion -> 2. Canonical Deduplication -> 3. String & Entity Normalization -> 4. Sentinel Resolution & Imputation -> 5. Outlier Range Clamping -> 6. Logical Cross-Field Consistency.",
    explanation: "Executing in this exact deterministic order ensures that duplicates don't skew imputation statistics, strings are clean before entity matching, sentinels are removed before numerical clamping, and logical rules reconcile all final cross-field dependencies.",
    hint: "Ingest, Deduplicate, Normalize, Impute, Clamp, Reconcile.",
    level: "Expert",
    codeExample: "# The 6-Stage Golden Sequence:\n# raw -> dedup -> text_norm -> impute -> clamp_outliers -> cross_field_rules -> clean"
  }
];

export default questions;
