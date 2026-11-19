/**
 * TOPIC 11: DETECTING INCONSISTENT DATA & SEMANTIC INTEGRITY AUDITING
 * Graded Academic & Industry Certification Question Bank
 * Course: Introduction to Machine Learning (BCAC701B)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 
 * 30 Authentic Graded Questions:
 * - Tier 1: Foundation & Terminology (Q1 - Q8)
 * - Tier 2: Mathematical & Algorithmic Mechanics (Q9 - Q16)
 * - Tier 3: Machine Learning System Design & Engineering (Q17 - Q24)
 * - Tier 4: Advanced Production & Scalability Analysis (Q25 - Q30)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the defining characteristic of 'Inconsistent Data' compared to 'Missing Data' or a valid 'Statistical Outlier'?",
    options: [
      "Inconsistent data only occurs in numerical features, whereas missing data occurs only in text features.",
      "Inconsistent data represents a logical, semantic, or physical contradiction between attributes or against domain constraints (e.g., Age 5 with Marital Status 'Married'), whereas outliers are rare but physically possible values.",
      "Inconsistent data can always be automatically imputed using the mean, whereas missing data requires median imputation.",
      "Inconsistent data always produces a Python SyntaxError during script compilation."
    ],
    correctIndex: 1,
    explanation: "While missing values are null/absent and outliers are rare but theoretically possible (e.g. CEO salary of 90 LPA), inconsistent data represents an outright logical impossibility or violation of physical laws (e.g. Discharge Date before Admission Date, or Age 5 with 10 years of experience).",
    practicalTip: "Never rely purely on null-checks or standard min/max boundary checks; cross-attribute consistency checks are mandatory.",
    codeSnippet: "# Cross-field semantic contradiction check\ninvalid_rows = df[(df['age'] < 18) & (df['has_driving_license'] == True)]\nprint(f'Contradictory rows found: {len(invalid_rows)}')",
    examRelevance: "MAKAUT BCAC701B Semester Exam & Core Data Preprocessing"
  },
  {
    id: 2,
    tier: "Tier 1: Foundation & Terminology",
    question: "Which of the following is a classic example of a 'Temporal Chronology Inversion' inconsistency?",
    options: [
      "A customer's account balance is negative due to overdraft.",
      "A patient's hospital discharge date is recorded as earlier than their hospital admission date.",
      "A student's marks in Mathematics is higher than their marks in English.",
      "A weather sensor reports a temperature of 42°C in Kolkata during May."
    ],
    correctIndex: 1,
    explanation: "Temporal chronology requires that cause precedes effect, and start timestamps precede end timestamps. An event where Discharge_Date < Admission_Date is a temporal inversion inconsistency.",
    practicalTip: "In pandas, always assert: `assert (df['end_date'] >= df['start_date']).all(), 'Temporal chronology violated!'`",
    codeSnippet: "# Vectorized temporal check\ntime_violations = df[df['discharge_date'] < df['admission_date']]\nprint('Temporal inversions:', len(time_violations))",
    examRelevance: "MAKAUT Practical Data Wrangling & Clinical Data Audits"
  },
  {
    id: 3,
    tier: "Tier 1: Foundation & Terminology",
    question: "What dangerous side effect occurs when a data engineer blindly uses `pd.to_datetime(df['date'], errors='coerce')` on inconsistent date strings?",
    options: [
      "It permanently crashes the Jupyter Notebook kernel.",
      "It silently converts all malformed or unparsable date strings into NaT (null values), hiding the underlying data corruption and turning an inconsistency problem into a missing value problem.",
      "It inverts the order of all rows in the DataFrame.",
      "It automatically converts Gregorian calendar dates into the Bengali San calendar."
    ],
    correctIndex: 1,
    explanation: "Setting `errors='coerce'` forces pandas to suppress parser errors and replace corrupt strings with `NaT`. This hides data quality defects from engineers and silently pollutes downstream imputation modules.",
    practicalTip: "Always isolate and log rows where coerced values became null: `corrupted = df[df['date'].notna() & pd.to_datetime(df['date'], errors='coerce').isna()]`.",
    codeSnippet: "# Inspect unparsable dates before coercing\ncoerced = pd.to_datetime(df['date_str'], errors='coerce')\nfailed_dates = df[df['date_str'].notna() & coerced.isna()]\nprint('Corrupted date strings:', failed_dates['date_str'].tolist())",
    examRelevance: "MAKAUT Data Engineering Best Practices & Python Pitfalls"
  },
  {
    id: 4,
    tier: "Tier 1: Foundation & Terminology",
    question: "In relational data cleaning, what is a 'Denial Constraint' (DC)?",
    options: [
      "A network firewall rule that denies HTTP requests from unauthorized IP addresses.",
      "A universal first-order logic statement over tuples asserting that a specific combination of attribute predicates must NEVER evaluate to true.",
      "A database lock that prevents multiple users from editing the same row simultaneously.",
      "A machine learning loss function that penalizes negative weights."
    ],
    correctIndex: 1,
    explanation: "A Denial Constraint (DC) is expressed in first-order logic as: forall t_1, t_2 in R, NOT (phi_1 AND phi_2 AND ... AND phi_m). It generalizes functional dependencies and ordering rules into a single rigorous mathematical framework.",
    practicalTip: "Denial constraints can express both single-tuple rules (e.g. NOT(Age < 18 AND MaritalStatus == 'Married')) and multi-tuple rules (e.g. NOT(t1.PIN == t2.PIN AND t1.District != t2.District)).",
    codeSnippet: "# Conceptual Denial Constraint in Python\ndef denial_constraint(row):\n    # NOT (Age < 16 AND Experience > 0)\n    return not (row['age'] < 16 and row['experience'] > 0)",
    examRelevance: "Relational Database Theory & Advanced Data Cleaning"
  },
  {
    id: 5,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the structural format of an Indian Permanent Account Number (PAN) enforced by the Income Tax Department (ITD)?",
    options: [
      "10 numerical digits starting with 9.",
      "5 uppercase alphabetic characters, followed by 4 numerical digits, followed by 1 uppercase alphabetic character (e.g., ABCDE1234F).",
      "12 numerical digits formatted as XXXX-XXXX-XXXX.",
      "2 letters, 6 digits, and 2 letters."
    ],
    correctIndex: 1,
    explanation: "The statutory format of an Indian PAN card is strictly 10 alphanumeric characters: `^[A-Z]{5}[0-9]{4}[A-Z]{1}$`. Any string diverging from this format represents an inconsistent or fraudulent entry.",
    practicalTip: "Use regex validation during ETL ingestion to reject or flag malformed tax identifiers before they hit feature stores.",
    codeSnippet: "import re\npan_regex = re.compile(r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$')\nis_valid = bool(pan_regex.match('ABCDE1234F'))  # True",
    examRelevance: "MAKAUT Practical Python Regex & FinTech KYC Systems"
  },
  {
    id: 6,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why is the date string '04/05/2026' inherently ambiguous in data ingestion pipelines?",
    options: [
      "Because 2026 is a leap year.",
      "Because depending on whether the source system uses Indian/British format (DD/MM/YYYY) or US format (MM/DD/YYYY), it could represent either May 4, 2026 or April 5, 2026.",
      "Because slashes are illegal characters in ISO standard strings.",
      "Because Python's `datetime` module does not support single-digit months."
    ],
    correctIndex: 1,
    explanation: "When both day and month numerical values are <= 12, there is no syntactic way to distinguish DD/MM/YYYY from MM/DD/YYYY without external locale metadata or dataset-wide disambiguation.",
    practicalTip: "Inspect other rows in the column: If you find dates like '25/05/2026', the presence of 25 in the first position proves the entire column is formatted as DD/MM/YYYY.",
    codeSnippet: "# Explicit format parsing prevents locale guessing errors\ndf['date'] = pd.to_datetime(df['date_raw'], format='%d/%m/%Y')",
    examRelevance: "Global ETL Systems & Time-Series Data Preprocessing"
  },
  {
    id: 7,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is 'Scale / Unit Inconsistency' and what is a common real-world example in Indian financial datasets?",
    options: [
      "Measuring age in seconds instead of years.",
      "Mixing monthly salary figures with annual salary figures, or mixing INR in Lakhs (e.g. 12.5) with raw INR (e.g. 1,250,000) in the same column.",
      "Recording dates in different timezones.",
      "Using UTF-8 instead of ASCII encoding."
    ],
    correctIndex: 1,
    explanation: "Scale inconsistency occurs when the numerical magnitudes represent different measurement units. In Indian banking data, candidates frequently enter their monthly salary into a field labeled 'Annual Income', creating an artificial 12x deflation artifact.",
    practicalTip: "Plot a histogram or check the ratio of 95th to 5th percentile: bimodal distributions in salary often signal a monthly vs annual mix.",
    codeSnippet: "# Detect monthly salaries entered into annual column:\nmonthly_candidates = df[df['annual_income'] < 100000]\n# Fix by multiplying by 12\ndf.loc[df['annual_income'] < 100000, 'annual_income'] *= 12",
    examRelevance: "Feature Engineering & Financial Data Processing"
  },
  {
    id: 8,
    tier: "Tier 1: Foundation & Terminology",
    question: "What does a Functional Dependency violation (FD: PIN -> District) signify in a West Bengal citizen registry?",
    options: [
      "The database hard drive has bad sectors.",
      "Two records share the exact same Postal PIN Code (e.g. 700120) but list conflicting District names (e.g. one lists 'North 24 Parganas' and the other lists 'Kolkata').",
      "The PIN code has expired.",
      "The citizen has changed their phone number."
    ],
    correctIndex: 1,
    explanation: "A functional dependency X -> Y requires that identical values of X must uniquely determine Y. If PIN 700120 maps to both 'North 24 Parganas' and 'Kolkata', at least one record has an inconsistent district assignment.",
    practicalTip: "Use `df.groupby('pin_code')['district'].nunique()` to find PIN codes associated with more than 1 distinct district.",
    codeSnippet: "# Detect Functional Dependency breaches\nfd_breaches = df.groupby('pin_code')['district'].nunique()\ninconsistent_pins = fd_breaches[fd_breaches > 1].index\nprint('Inconsistent PIN codes:', inconsistent_pins.tolist())",
    examRelevance: "MAKAUT Database Systems & Data Integrity Constraints"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL & ALGORITHMIC MECHANICS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "In mathematical optimization for database repairs, what does the 'Minimum Cost Repair' problem aim to minimize?",
    options: [
      "The cloud computing bill on AWS or Google Cloud.",
      "The total distance or edit penalty Sum Dist(t, t') between the original inconsistent dataset D and the repaired consistent dataset D'.",
      "The number of rows in the resulting table.",
      "The time complexity from O(N^2) to O(1)."
    ],
    correctIndex: 1,
    explanation: "Under the Chomicki & Marcinkowski database repair framework, the goal is to produce a consistent instance D' that satisfies all constraints while minimizing total perturbation: min sum_{t in D} Dist(t, t'). Minimizing edits preserves maximal original information.",
    practicalTip: "Always prefer minimal targeted attribute imputation over deleting entire rows, unless the corruption is catastrophic.",
    codeSnippet: "# Cost-minimizing repair: only change the violating field, not the whole row\n# Cost = |x_original - x_repaired|",
    examRelevance: "MAKAUT Advanced Database Foundations & Data Quality Theory"
  },
  {
    id: 10,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "How is the Mahalanobis Distance D_M(x) formulated, and why is it superior to Euclidean distance for detecting bivariate inconsistencies?",
    options: [
      "D_M(x) = sum |x_i - mu_i|; it is faster to compute.",
      "D_M(x) = sqrt( (x - mu)^T * Sigma^(-1) * (x - mu) ); it incorporates the covariance matrix Sigma, detecting points that break the correlation structure between features.",
      "D_M(x) = max |x_i - mu_i|; it ignores negative values.",
      "D_M(x) is only applicable to text strings."
    ],
    correctIndex: 1,
    explanation: "Euclidean distance assumes spherical, uncorrelated distributions. Mahalanobis distance uses the inverse covariance matrix Sigma^(-1) to measure distance in units of standard deviation along the principal axes. A point with normal individual features that violates their typical correlation will register a high Mahalanobis distance.",
    practicalTip: "Use Mahalanobis distance to flag impossible combinations of correlated biometric signals (e.g. Systolic vs Diastolic blood pressure).",
    codeSnippet: "import numpy as np\nfrom scipy.spatial.distance import mahalanobis\n\n# Compute Mahalanobis distance\ninv_cov = np.linalg.inv(np.cov(X.T))\nd_m = mahalanobis(point, mean_vec, inv_cov)",
    examRelevance: "MAKAUT Multivariate Statistics & Outlier Mechanics"
  },
  {
    id: 11,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is the mathematical effect on the Ordinary Least Squares (OLS) regression slope beta when a numerical feature suffers from unit inconsistency (e.g. random mix of monthly and annual salaries)?",
    options: [
      "The slope beta is unaffected because linear regression is scale invariant.",
      "The slope beta suffers from 'Attenuation Bias' (Regression Dilution), pulling the estimated coefficient toward zero because the empirical variance Var(X) is artificially inflated.",
      "The slope beta becomes exactly equal to 1.0.",
      "The R-squared metric automatically increases to 1.0."
    ],
    correctIndex: 1,
    explanation: "In OLS, beta = Cov(X, Y) / Var(X). When unit errors introduce massive measurement variance without corresponding true covariance, Var(X) inflates, attenuating the regression slope toward zero: beta_obs = beta_true * [Var(X_true) / (Var(X_true) + Var(Noise))].",
    practicalTip: "Always standardize or verify unit scales before fitting linear models or computing feature importance.",
    codeSnippet: "# Attenuation Bias proof:\n# Var(X_noisy) >> Var(X_true) => beta_hat = Cov(X, Y) / Var(X_noisy) -> 0",
    examRelevance: "Econometrics & Statistical Machine Learning Foundations"
  },
  {
    id: 12,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "Given two attributes in an employee dataset: Age and Experience. Which first-order logic Denial Constraint correctly captures the physical impossibility of child labor violations in a corporate registry?",
    options: [
      "forall t, NOT ( t.age > 60 AND t.experience < 5 )",
      "forall t, NOT ( t.experience > (t.age - 16) )",
      "forall t, NOT ( t.age == t.experience )",
      "forall t, NOT ( t.experience < 0 )"
    ],
    correctIndex: 1,
    explanation: "Assuming legal full-time employment starts no earlier than age 16, a person's total professional experience cannot exceed their age minus 16: Experience <= Age - 16. Inverting this into a Denial Constraint yields: NOT (Experience > Age - 16).",
    practicalTip: "In corporate datasets, records violating this rule are almost always typos (e.g., age entered as 22 instead of 42).",
    codeSnippet: "# Vectorized DC check\ninconsistent = df[df['experience_years'] > (df['age'] - 16)]\nprint('Impossible career histories:', len(inconsistent))",
    examRelevance: "MAKAUT First-Order Logic in Data Integrity"
  },
  {
    id: 13,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "How does an inverted chronological date pair (Discharge < Admission) impact time-to-event (Survival Analysis) modeling?",
    options: [
      "It has no effect because survival analysis only uses event flags.",
      "It produces negative event durations, causing Cox Proportional Hazards and Kaplan-Meier estimators to crash or yield undefined negative hazards.",
      "It automatically converts the survival curve into a normal distribution.",
      "It increases the censoring rate."
    ],
    correctIndex: 1,
    explanation: "Survival analysis models duration T = t_event - t_entry >= 0. A negative duration is mathematically invalid in log-hazard formulations: log(h(t)) is undefined for t < 0.",
    practicalTip: "Always enforce a non-negative duration guard: `df['duration'] = (df['discharge'] - df['admission']).dt.days; assert (df['duration'] >= 0).all()`.",
    codeSnippet: "# Guard duration calculation\ndf['stay_duration'] = (df['discharge'] - df['admission']).dt.days\nassert (df['stay_duration'] >= 0).all(), 'Negative hospital stay detected!'",
    examRelevance: "Healthcare Analytics & Biostatistics"
  },
  {
    id: 14,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "In string parsing, which regular expression pattern strictly validates an Indian Goods and Services Tax Identification Number (GSTIN)?",
    options: [
      "^[0-9]{10}$",
      "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
      "^[A-Z]{3}[0-9]{7}$",
      "^[0-9]{12}$"
    ],
    correctIndex: 1,
    explanation: "An Indian GSTIN is a 15-character statutory alphanumeric code: 2 digits (State Code) + 10 characters (PAN) + 1 alphanumeric (Entity code) + 'Z' (Default character) + 1 check digit. The strict regex is `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$`.",
    practicalTip: "For West Bengal businesses, the first two state code digits are always '19'.",
    codeSnippet: "gstin_wb = '19ABCDE1234F1Z5'\nimport re\nis_wb_gstin = bool(re.match(r'^19[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$', gstin_wb))",
    examRelevance: "Commercial Data Standards & FinTech Applications"
  },
  {
    id: 15,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "Why does the presence of inconsistent records severely fragment Decision Tree models (e.g. Random Forest, XGBoost)?",
    options: [
      "Because decision trees cannot process integers.",
      "Because contradictory records with identical or near-identical features but conflicting target labels cannot be separated by standard impurity metrics (Gini / Entropy), forcing trees to grow deep, complex leaves to isolate noise.",
      "Because XGBoost requires all features to have zero mean.",
      "Because decision trees automatically delete inconsistent rows."
    ],
    correctIndex: 1,
    explanation: "If two identical or contradictory records carry conflicting class labels, the impurity of any node containing them cannot reach zero. The splitting algorithm continues to partition on irrelevant feature noise, producing severe tree overfitting and deep, fragile branches.",
    practicalTip: "Clean inconsistent labels and features prior to training tree-based models to keep tree depth shallow and generalizable.",
    codeSnippet: "# Inconsistent labels on identical features cause infinite tree splitting depth",
    examRelevance: "MAKAUT BCAC701B Tree-Based Algorithms"
  },
  {
    id: 16,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is 'Disambiguation by Majority Pattern' when resolving ambiguous date formats in an uncurated CSV file?",
    options: [
      "Asking the database administrator to vote on the format.",
      "Scanning the entire date column to find unambiguous values where day > 12 (e.g. 23/04/2026); once DD/MM/YYYY is established, applying that uniform format to ambiguous rows like 03/05/2026.",
      "Replacing all dates with the current timestamp.",
      "Sorting the dates in reverse alphabetical order."
    ],
    correctIndex: 1,
    explanation: "In single-source files, date formatting conventions are typically consistent across rows. Scanning for unambiguous records (where the first token is > 12) proves that the column follows DD/MM/YYYY, allowing safe parsing of ambiguous records like 03/05/2026.",
    practicalTip: "Always inspect the global distribution of tokens before parsing ambiguous dates.",
    codeSnippet: "# Algorithm: Find if any first component > 12\nhas_day_first = df['raw_date'].str.split('/').str[0].astype(int).max() > 12\nfmt = '%d/%m/%Y' if has_day_first else '%m/%d/%Y'",
    examRelevance: "Data Ingestion Pipeline Architecture"
  },

  // =========================================================================
  // TIER 3: MACHINE LEARNING SYSTEM DESIGN & ENGINEERING (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In an automated e-Challan camera system operated by Kolkata Traffic Police, an OCR glitch reads a motorcycle's registration plate as a commercial 10-wheel truck, generating a ticket for 'Riding without a helmet'. What architectural layer should have caught this before issuance?",
    options: [
      "A deep convolutional neural network running on the camera.",
      "A Cross-Attribute Denial Constraint Validator checking violation type against the central vehicle registry (VAHAN) before ticket generation: IF Vehicle_Class == 'Heavy Commercial' THEN REJECT Helmet_Violation.",
      "A manual printer queue.",
      "A database index on registration timestamps."
    ],
    correctIndex: 1,
    explanation: "A robust production ML system must always incorporate deterministic business validation rules as a post-inference sanity filter. The violation (no helmet) is semantically incompatible with the vehicle class (heavy commercial truck).",
    practicalTip: "Never allow raw model predictions to trigger real-world mutations without a deterministic Semantic Integrity Gateway.",
    codeSnippet: "# Semantic sanity guard in traffic enforcement\ndef validate_violation(vehicle_class, violation_type):\n    if vehicle_class in ('Heavy Commercial', 'Bus', 'Car') and violation_type == 'NO_HELMET':\n        return False  # Inconsistent! Suppress ticket\n    return True",
    examRelevance: "Applied Machine Learning Safety & System Design"
  },
  {
    id: 18,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "A digital credit scoring model in Salt Lake Sector V suffers from an elevated False Rejection Rate among senior software architects. Investigation reveals they entered monthly salaries (e.g., ₹ 85,000) into a field labeled 'Annual Income'. What is the optimal engineering remedy?",
    options: [
      "Permanently blacklist those applicants for submitting false information.",
      "Implement a pre-scoring heuristic unit check: If applicant Role is 'Senior/Lead' AND reported Annual_Income < ₹ 1,50,000, trigger an interactive UI confirmation and automatically scale by 12x upon confirmation.",
      "Retrain the model on the uncleaned monthly data.",
      "Replace all reported incomes with the state average."
    ],
    correctIndex: 1,
    explanation: "The root cause is a human-interface unit discrepancy. A senior tech lead earning ₹ 85,000 monthly is creditworthy for a large loan if scaled to ₹ 10.2 LPA, but is falsely rejected if evaluated as ₹ 85,000 annually. Detecting the scale anomaly restores model validity.",
    practicalTip: "Design client-side form validation that warns users: 'Did you mean ₹ 85,000 per month or per year?'",
    codeSnippet: "# Scale normalization heuristic\nmask = (df['role_tier'] == 'Senior') & (df['annual_income'] < 150000)\ndf.loc[mask, 'annual_income'] *= 12",
    examRelevance: "Production ML Model Debugging & FinTech Case Studies"
  },
  {
    id: 19,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "How does 'Great Expectations' or 'Pydantic' assist in preventing inconsistent data from entering production feature stores?",
    options: [
      "By accelerating matrix multiplication on GPUs.",
      "By enforcing declarative schema contracts, multi-field assertions, and semantic validation suites at pipeline boundaries before data is persisted.",
      "By compressing Parquet files by 50%.",
      "By automatically writing unit tests using generative AI."
    ],
    correctIndex: 1,
    explanation: "Data quality frameworks like Great Expectations and Pydantic provide declarative assertions (e.g. `expect_column_values_to_be_between`, `expect_column_pair_values_A_to_be_greater_than_B`) that halt pipeline execution if inconsistencies arise.",
    practicalTip: "Embed Great Expectations suites into Airflow / Prefect DAGs to fail fast before feature store ingestion.",
    codeSnippet: "# Great Expectations example\n# validator.expect_column_pair_values_a_to_be_greater_than_b(\n#     column_A='discharge_date', column_B='admission_date'\n# )",
    examRelevance: "Enterprise MLOps & Data Quality Tooling"
  },
  {
    id: 20,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In tabular classification, what happens to Neural Network representations when training data contains contradictory pairs (identical inputs X with opposing labels Y=0 and Y=1)?",
    options: [
      "The network automatically discards the conflicting rows during the first epoch.",
      "The network expends high model capacity memorizing the conflicting records via large weight norms, causing loss oscillations and destroying smooth generalization in neighboring feature regions.",
      "The cross-entropy loss becomes zero immediately.",
      "The learning rate dynamically increases to infinity."
    ],
    correctIndex: 1,
    explanation: "Deep neural networks have sufficient parameter capacity to fit random noise and conflicting labels. However, doing so creates sharp, pathological ripples in the decision boundary, degrading generalization performance on valid data.",
    practicalTip: "Use confident learning algorithms (e.g., Cleanlab) to detect and purge contradictory label noise prior to deep model training.",
    codeSnippet: "# Contradictory label detection\nconflict_mask = df.duplicated(subset=features, keep=False) & ~df.duplicated(subset=features + [target], keep=False)\nprint('Rows with contradictory labels:', conflict_mask.sum())",
    examRelevance: "Deep Learning Generalization Theory & Label Noise"
  },
  {
    id: 21,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In the West Bengal Swasthya Sathi medical claims registry, a private hospital bills for 'Neonatal ICU' for an 82-year-old patient. What type of inconsistency is this, and how should an automated auditor flag it?",
    options: [
      "A syntax error in the hospital ID.",
      "A Cross-Field Semantic Contradiction; flagged via a Denial Constraint: NOT (Patient_Age > 18 AND Medical_Procedure == 'NEONATAL_ICU').",
      "A normal statistical variance in geriatric care.",
      "A duplicate record issue."
    ],
    correctIndex: 1,
    explanation: "Neonatal intensive care is physiologically restricted to newborn infants (age < 28 days). Billed for an 82-year-old patient, it represents an unambiguous cross-field contradiction requiring claim freeze and clerical audit.",
    practicalTip: "Build domain-specific Medical Rule Knowledge Graphs to automatically link procedure codes to valid patient demographic envelopes.",
    codeSnippet: "# Healthcare rule guard\ndef audit_claim(age, procedure):\n    if age > 18 and 'neonatal' in procedure.lower():\n        return 'REJECT_PEDIATRIC_CONTRADICTION'\n    return 'VALID'",
    examRelevance: "Healthcare Fraud Analytics & GovTech Systems"
  },
  {
    id: 22,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "Why can 'Cascading Data Repairs' cause catastrophic data corruption if inconsistency resolution rules are applied sequentially without global constraint checking?",
    options: [
      "Because Python scripts run out of stack memory.",
      "Because repairing Attribute A to satisfy Rule 1 might inadvertently cause Attribute A to violate Rule 2, creating an infinite repair loop or compounding distortions across the record.",
      "Because SQL databases do not permit more than one update statement per hour.",
      "Because cascading repairs delete all database foreign keys."
    ],
    correctIndex: 1,
    explanation: "Sequential greedy repairs often create secondary violations. For example, adjusting 'Age' to fix an experience mismatch might violate an education constraint. Repairs must be formulated as a global Constraint Satisfaction Problem (CSP).",
    practicalTip: "Formulate multi-field repairs using HoloClean or probabilistic graphical models rather than chains of ad-hoc `if/else` statements.",
    codeSnippet: "# Danger of greedy sequential repair:\n# Fix 1: if age < 18: age = 18 (Now violates student grade level!)\n# Fix 2: if grade == 10: age = 15 (Now violates Fix 1!)",
    examRelevance: "Automated Data Cleaning Architecture"
  },
  {
    id: 23,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "When ingesting multi-sensor IoT telemetry from Kolkata smart city environmental monitors, Sensor A reports temperature in Celsius (32°C) while Sensor B reports in Fahrenheit (89.6°F). What is the machine learning impact if fed unstandardized into an anomaly detection model?",
    options: [
      "The model will run 2x faster.",
      "Sensor B's readings will be falsely classified as catastrophic heatwaves because their raw magnitude (89.6) dwarfs normal Celsius values (32), creating severe false alarms.",
      "The model will automatically infer the thermodynamic conversion formula.",
      "The sensor battery will drain faster."
    ],
    correctIndex: 1,
    explanation: "Machine learning algorithms interpret numbers as pure scalars without semantic units. A value of 89.6 in a column where normal values are ~30 will be flagged as an extreme statistical outlier unless converted to a uniform scale.",
    practicalTip: "Always attach metadata schemas with explicit measurement units (e.g. `temp_celsius`) to every IoT telemetry stream.",
    codeSnippet: "# Standardize IoT temperatures\ndef to_celsius(row):\n    if row['unit'] == 'F':\n        return (row['temp'] - 32) * 5 / 9\n    return row['temp']",
    examRelevance: "IoT Preprocessing & Environmental Data Systems"
  },
  {
    id: 24,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In consumer transaction logs, a user record shows: `State = 'West Bengal'` and `PIN_Code = '110001'` (New Delhi Connaught Place). What is the recommended resolution strategy?",
    options: [
      "Delete the user's entire account.",
      "Cross-reference the user's free-form Street Address and City against the National Postal Geocoding Database to determine whether the State or the PIN Code was entered incorrectly, and correct the erroneous field.",
      "Change both fields to null.",
      "Compute the average of the two state codes."
    ],
    correctIndex: 1,
    explanation: "When two fields conflict, resolving the inconsistency requires consulting an authoritative external ground-truth source (Master Geocoding Directory) to determine which field aligns with the rest of the record.",
    practicalTip: "Use external reference APIs (e.g., India Post Directory) as authoritative ground truth during entity enrichment.",
    codeSnippet: "# External geocoding lookup resolves whether PIN or State is correct",
    examRelevance: "Master Data Management (MDM) & Geocoding Verification"
  },

  // =========================================================================
  // TIER 4: ADVANCED PRODUCTION & SCALABILITY ANALYSIS (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "What is 'HoloClean' and how does it advance probabilistic data cleaning beyond simple rule engines?",
    options: [
      "A holographic optical storage device for cloud backups.",
      "A state-of-the-art data repair engine that combines Denial Constraints, statistical priors, and external knowledge bases into a unified probabilistic factor graph to predict the most likely repair for inconsistent cells.",
      "A distributed garbage collection daemon for Apache Spark.",
      "A deep learning image denoising autoencoder."
    ],
    correctIndex: 1,
    explanation: "HoloClean (Rekatsinas et al., VLDB) models dirty data as a probabilistic factor graph. It treats inconsistencies not as simple errors to be deleted, but as noisy observations, leveraging functional dependencies, corpus statistics, and machine learning to infer the ground-truth cell values.",
    practicalTip: "For large enterprise databases with intricate semantic relationships, factor-graph repair frameworks outperform fragile heuristic scripts.",
    codeSnippet: "# HoloClean factor graph framework combines:\n# P(True_Value | Dirty_Value, Denial_Constraints, Correlation_Priors)",
    examRelevance: "Cutting-Edge Data Cleaning Research & Enterprise Systems"
  },
  {
    id: 26,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "In distributed streaming pipelines (e.g. Apache Flink / Kafka), how should out-of-order events caused by mobile network latency be detected and reconciled for time-series feature generation?",
    options: [
      "By pausing the streaming cluster for 10 minutes every hour.",
      "By using Event-Time Watermarking with a bounded out-of-orderness tolerance (e.g. 5 seconds) to correctly order and window temporal events regardless of arrival time.",
      "By overwriting previous events with the latest ingestion timestamp.",
      "By dropping all events that arrive more than 1 millisecond late."
    ],
    correctIndex: 1,
    explanation: "In distributed telemetry, network lags cause events to arrive out of chronological order. Watermarks track event time progress, allowing Flink to buffer and properly sequence events within a bounded delay window before computing rolling features.",
    practicalTip: "Always configure explicit WatermarkGenerators with bounded out-of-orderness in Flink or Spark Structured Streaming.",
    codeSnippet: "# Flink watermarking\n# WatermarkStrategy.forBoundedOutOfOrderness(Duration.ofSeconds(5))\n#     .withTimestampAssigner((event, timestamp) -> event.getEventTime())",
    examRelevance: "Real-Time Streaming Systems & Distributed MLOps"
  },
  {
    id: 27,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "Under what specific condition can an automated inconsistency repair introduce severe 'Algorithmic Discrimination' or Demographic Bias?",
    options: [
      "When using 64-bit floating point numbers.",
      "When inconsistency rules are modeled on majority-group demographic norms (e.g. assuming all legal names conform to Western Given Name + Surname conventions), forcing non-conforming ethnic naming structures to be 'corrected' or rejected.",
      "When running on Linux servers.",
      "When the dataset contains no string features."
    ],
    correctIndex: 1,
    explanation: "Data cleaning rules reflect the assumptions of their authors. Enforcing strict single-surname constraints or Anglo-Saxon name lengths can flag valid South Indian (e.g. patronymic initials) or Bengali names as 'inconsistent', biasing downstream models.",
    practicalTip: "Audit data cleaning rules for demographic assumptions; ensure naming rules accommodate regional linguistic conventions across all communities.",
    codeSnippet: "# DANGER: Requiring both first and last name rejects citizens with mononyms!\n# SAFE: Support single legal names",
    examRelevance: "AI Ethics, Fairness & Inclusive Data Engineering"
  },
  {
    id: 28,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "In financial audit analytics, why is 'Benford's Law' applied as a statistical inconsistency check for expense and invoice claims?",
    options: [
      "Because it calculates compound interest.",
      "Because in naturally occurring financial datasets, the leading first digit d in {1..9} follows the logarithmic distribution P(d) = log10(1 + 1/d); fraudulent or fabricated invoices violate this empirical distribution.",
      "Because it encrypts bank account balances.",
      "Because it sorts financial records in linear time."
    ],
    correctIndex: 1,
    explanation: "Benford's Law states that the number 1 appears as the first digit in ~30.1% of naturally occurring numbers, while 9 appears in only ~4.6%. Human fraudsters fabricating fake expenses tend to uniformly distribute leading digits, creating an unmistakable statistical inconsistency.",
    practicalTip: "Use Benford's Law as a macro-level integrity screen on institutional expenditure records across municipal wards.",
    codeSnippet: "import math\ndef benford_expected_prob(digit):\n    return math.log10(1.0 + 1.0 / digit)\n# Digit 1: 30.1%, Digit 2: 17.6%, ..., Digit 9: 4.6%",
    examRelevance: "Forensic Data Analytics & Financial Fraud Detection"
  },
  {
    id: 29,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "What is 'Semantic Drift' in continuous data streaming, and how does it manifest as emerging data inconsistency over time?",
    options: [
      "The physical movement of database servers across data centers.",
      "When the operational meaning or measurement units of a feature silently change at the source (e.g. an API upgrading from reporting prices in Cents to Dollars) without updating downstream ETL schemas.",
      "When categorical variables are sorted alphabetically.",
      "When memory leaks occur in Python daemons."
    ],
    correctIndex: 1,
    explanation: "Semantic drift occurs when upstream systems alter business logic, status codes, or units without notifying downstream consumers. A field that previously recorded '0/1' for Active/Inactive suddenly receives 'PENDING/ACTIVE/SUSPENDED', causing silent parser failures.",
    practicalTip: "Implement data contract monitoring with automated payload schema validation at every microservice boundary.",
    codeSnippet: "# Schema contract guard: enforce strict enum validation\nvalid_statuses = {'ACTIVE', 'INACTIVE'}\nassert set(df['status'].unique()).issubset(valid_statuses), 'Semantic drift detected!'",
    examRelevance: "Enterprise Data Governance & MLOps System Reliability"
  },
  {
    id: 30,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "In hospital electronic health record (EHR) consolidation across West Bengal, two diagnostic codes indicate: Code A = 'Male Prostate Examination' and Code B = 'Obstetric Pregnancy Care' for the same Patient ID. What is the definitive forensic diagnosis?",
    options: [
      "The patient has a rare genetic mutation.",
      "Severe Patient Record Collision / Entity Inconsistency: Two distinct individuals (one male, one female) have been erroneously merged under the same Patient Identifier, requiring immediate medical decoupling.",
      "The hospital billing system is functioning correctly.",
      "Both codes should be deleted and replaced with a general consultation code."
    ],
    correctIndex: 1,
    explanation: "Prostate examinations apply to biological males, while obstetric pregnancy care applies to biological females. Co-occurrence in a single patient history indicates an erroneous identity merger (e.g., due to duplicate Aadhaar/phone entry). In healthcare, this is a life-threatening inconsistency.",
    practicalTip: "Maintain strict medical constraint rules in EHR pipelines to trigger immediate clinical emergency alerts upon conflicting biological diagnoses.",
    codeSnippet: "# EHR biological constraint guard\nif 'prostate_biopsy' in history and 'pregnancy_prenatal' in history:\n    raise CriticalClinicalContradictionError('Erroneous patient merger detected!')",
    examRelevance: "Clinical Decision Support Systems & Healthcare Safety"
  }
];

export default questions;
