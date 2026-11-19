/**
 * Topic 5: Structured and Unstructured Data (Foundations, Modalities & Preprocessing)
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
 * Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax
 * Location: Barrackpore, Kolkata, West Bengal, India
 * Academic Subject: BCAC701B / MCA / B.Tech Computer Science
 */

const questions = [
  {
    id: 1,
    question: "What is the primary architectural difference between Structured and Unstructured data?",
    shortAnswer: "Structured data follows a strict, predefined relational schema (tables with rows and columns); unstructured data has no predefined data model and consists of free-form text, images, or audio.",
    explanation: "Structured data conforms to a formal schema-on-write model (e.g. SQL tables, CSV, Parquet) where each column has a rigid data type (INTEGER, VARCHAR, FLOAT). Unstructured data (e.g. doctor notes, chest X-rays, customer call recordings) lacks predefined relational attributes and represents 80-90% of all enterprise information.",
    hint: "Think about an Excel table with fixed column headers vs a folder of raw MP3 audio recordings.",
    level: "Basic",
    codeExample: "# Structured Data (Tabular Pandas DataFrame):\nimport pandas as pd\ndf_structured = pd.DataFrame({'age': [24, 52], 'income_lakhs': [4.5, 12.8]})\n\n# Unstructured Data (Raw string text):\ntext_unstructured = 'Patient reports severe chest pain and persistent morning fatigue.'"
  },
  {
    id: 2,
    question: "What is Semi-Structured data, and how does it bridge the gap between Structured and Unstructured formats?",
    shortAnswer: "Semi-structured data lacks a formal relational database schema, but contains internal self-describing markers, tags, or hierarchies (like JSON, XML, or BSON).",
    explanation: "Unlike pure unstructured data (which is a raw byte stream or text), semi-structured data uses self-describing tags or key-value pairs (e.g. {\"user\": \"Mamata\", \"tags\": [\"student\", \"cardiology\"]}). It operates on a 'Schema-on-Read' philosophy, allowing flexible, nested, and evolving fields across records without modifying database DDL.",
    hint: "Look at web API responses: they are organized in keys and nested brackets, but not in strict SQL tables.",
    level: "Basic",
    codeExample: "# Semi-Structured JSON payload\npatient_json = {\n    'id': 'PT-101',\n    'vitals': {'bp': 120, 'hr': 74},\n    'allergies': ['Penicillin', 'Sulfa']\n}"
  },
  {
    id: 3,
    question: "Why can machine learning algorithms (like SVM, Logistic Regression, or XGBoost) NOT directly consume raw unstructured text or images?",
    shortAnswer: "Machine learning models are mathematical operators over vector spaces (R^d); they require numerical matrices and cannot perform matrix multiplication on raw text strings or binary image files.",
    explanation: "Algorithms optimize mathematical cost functions using linear combinations (w^T x + b), distance metrics (||x_i - x_j||), and gradient descent updates. A raw string like 'hypertension' has no intrinsic geometric meaning until it is mapped into a numerical vector space via tokenization, TF-IDF, or dense embeddings.",
    hint: "Can you multiply a matrix W by a raw string 'Hello World'?",
    level: "Basic",
    codeExample: "# Invalid ML call:\n# model.fit(['Patient has fever', 'Healthy patient'], [1, 0])  # ERROR!\n\n# Correct: Must vectorize into numerical feature matrix X in R^(N x D)\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nX = TfidfVectorizer().fit_transform(['Patient has fever', 'Healthy patient'])"
  },
  {
    id: 4,
    question: "What does the 80/20 Enterprise Data Rule state in modern data engineering?",
    shortAnswer: "Approximately 80% to 90% of all data generated and stored by enterprises is unstructured (documents, logs, images, audio), while only 10% to 20% is structured relational data.",
    explanation: "While traditional business software (ERPs, accounting ledgers, CRMs) runs primarily on structured relational databases, the massive explosion of modern data originates from customer reviews, WhatsApp messages, CCTV surveillance, sensor streams, PDFs, and diagnostic scans. Hence, modern data science must master multimodal unstructured preprocessing.",
    hint: "Think about the proportion of your personal phone storage taken by photos/voice notes vs contacts spreadsheet.",
    level: "Basic",
    codeExample: "# Enterprise Volume Distribution\nenterprise_data = {'Unstructured (Text, Images, Audio, Logs)': '80-90%', 'Structured (SQL, ERP, Ledger)': '10-20%'}"
  },
  {
    id: 5,
    question: "What is the difference between Schema-on-Write and Schema-on-Read?",
    shortAnswer: "Schema-on-Write validates and enforces structure before saving data (RDBMS); Schema-on-Read stores raw or semi-structured data as-is and applies structure only when querying or preprocessing (Data Lakes / JSON).",
    explanation: "In an RDBMS (Postgres, MySQL), inserting a record with a missing mandatory column or wrong type fails instantly (Schema-on-Write). In Big Data and NoSQL systems (S3, MongoDB, Spark), raw logs or JSON are ingested freely without validation; downstream analytics pipelines parse and extract specific keys when needed (Schema-on-Read).",
    hint: "Enforcing rules at the database door vs interpreting the rules when reading the file.",
    level: "Basic",
    codeExample: "# Schema-on-Write: SQL INSERT INTO patients (id, age) VALUES (1, 'twenty') -> FAILS!\n# Schema-on-Read: Store raw JSON, parse 'age' during Python ETL:\nimport json\nraw_data = json.loads('{\"id\": 1, \"age\": \"twenty\"}')  # Stored successfully"
  },
  {
    id: 6,
    question: "What is a Document-Term Matrix (DTM) in text preprocessing?",
    shortAnswer: "A 2D mathematical matrix where rows represent individual documents, columns represent unique vocabulary words, and cells store word occurrences or TF-IDF weights.",
    explanation: "The Document-Term Matrix transforms an unstructured corpus of text documents into a structured numerical matrix X in R^(N x |V|), where N is the number of documents and |V| is the total vocabulary size. This allows algorithms like Naive Bayes or Logistic Regression to ingest text data.",
    hint: "Rows = Sentences/Docs, Columns = Dictionary words.",
    level: "Basic",
    codeExample: "from sklearn.feature_extraction.text import CountVectorizer\ncorpus = ['Severe chest pain', 'Normal chest scan']\nvectorizer = CountVectorizer()\nX_dtm = vectorizer.fit_transform(corpus)\n# X_dtm is a 2x4 matrix"
  },
  {
    id: 7,
    question: "Why is a Bag-of-Words (BoW) Document-Term Matrix typically stored as a Sparse Matrix rather than a Dense NumPy array?",
    shortAnswer: "Because individual documents use only a tiny fraction of the total vocabulary, making over 98-99% of matrix cells zero; sparse matrices store only non-zero coordinates, saving gigabytes of memory.",
    explanation: "If a vocabulary contains 50,000 words, a typical 50-word document will have 49,950 zeros (99.9% sparsity). Storing 100,000 documents as a dense 64-bit float array would require 100,000 * 50,000 * 8 bytes = 40 GB RAM! A Compressed Sparse Row (CSR) matrix stores only the non-zero word counts, requiring less than 100 MB.",
    hint: "Why allocate RAM for 49,950 zeroes when only 50 words actually exist in the sentence?",
    level: "Moderate",
    codeExample: "from scipy.sparse import csr_matrix\nimport numpy as np\n# Dense consumes 40GB; Sparse stores only (row, col, value) triples\nsparse_dtm = csr_matrix([[0, 0, 1], [2, 0, 0], [0, 0, 0]])\nprint('Memory saved:', sparse_dtm.nnz, 'non-zero entries stored.')"
  },
  {
    id: 8,
    question: "In image preprocessing, how is an unstructured raw image file (e.g. JPEG) converted into a structured machine learning tensor?",
    shortAnswer: "By decoding the compressed image bytes into a 2D or 3D numerical matrix of pixel intensities (Height x Width x Channels), typically normalized to [0.0, 1.0].",
    explanation: "An image file is fundamentally a compressed binary bitstream. During preprocessing, image decoding libraries (OpenCV, PIL) expand it into an array of pixel values. A grayscale image yields an H x W matrix with values in [0, 255]; an RGB color image yields an H x W x 3 tensor. Dividing by 255.0 normalizes the inputs for numerical stability.",
    hint: "Think of an image as a 2D spreadsheet where each cell is a pixel brightness number from 0 to 255.",
    level: "Basic",
    codeExample: "import numpy as np\n# Synthetic 3x3 RGB image tensor\nraw_pixels = np.array([[[255, 0, 0], [0, 255, 0]], [[0, 0, 255], [128, 128, 128]]], dtype=np.float32)\nnormalized_image = raw_pixels / 255.0  # Scaled to [0.0, 1.0]"
  },
  {
    id: 9,
    question: "What is the mathematical formulation of TF-IDF, and why is it superior to raw word count frequencies?",
    shortAnswer: "TF-IDF = TF(t, d) * IDF(t, D). It penalizes common ubiquitous words (like 'patient', 'hospital') and elevates rare, highly discriminative keywords (like 'myocardial', 'hyperglycemia').",
    explanation: "Raw term counts bias models toward frequent boilerplate words. Inverse Document Frequency IDF(t) = log(N / df(t)) assigns high weights to terms that appear in very few documents and low weights to ubiquitous terms. Thus, TF-IDF measures how uniquely informative a word is to a specific document.",
    hint: "If the word 'the' appears 100 times, is it informative? If 'arsenic' appears 3 times, is it informative?",
    level: "Moderate",
    codeExample: "from sklearn.feature_extraction.text import TfidfVectorizer\ncorpus = ['Patient admitted with acute appendicitis', 'Patient admitted for routine dental checkup']\ntfidf = TfidfVectorizer().fit_transform(corpus)\n# 'Patient' and 'admitted' receive low weights; 'appendicitis' receives high weight"
  },
  {
    id: 10,
    question: "What is JSON flattening (normalization), and when is it required in a machine learning feature pipeline?",
    shortAnswer: "JSON flattening recursively unrolls nested dictionaries and lists into top-level column headers, transforming hierarchical JSON records into a 2D tabular dataframe.",
    explanation: "Web microservices, IoT streams, and Mongo databases store semi-structured JSON with nested objects (e.g. {'user': {'address': {'city': 'Barrackpore'}}}). Standard tabular estimators require a flat 2D matrix. Tools like pandas.json_normalize create compound column headers ('user_address_city') to flatten the hierarchy.",
    hint: "How do you put a folder inside a folder into a single-row Excel table?",
    level: "Moderate",
    codeExample: "import pandas as pd\nnested_json = [{'id': 1, 'vitals': {'bp': 120, 'hr': 72}}]\nflat_df = pd.json_normalize(nested_json)\n# Resulting columns: ['id', 'vitals.bp', 'vitals.hr']"
  },
  {
    id: 11,
    question: "What is Schema Drift in semi-structured data, and what catastrophic problem does it cause in production ML pipelines?",
    shortAnswer: "Schema Drift occurs when an upstream service alters JSON keys, data types, or nesting without notice, causing downstream preprocessing code to throw KeyErrors or silently generate wrong features.",
    explanation: "Because semi-structured data has no schema-on-write constraint, an API might suddenly rename 'user_age' to 'age_years', or start returning nulls or strings instead of numbers. If an ML model expects 10 exact input columns, schema drift causes pipeline crashes or silent data corruption.",
    hint: "What happens to your Python script if a JSON key you access with data['user_name'] is renamed to data['full_name']?",
    level: "Moderate",
    codeExample: "# Production defense against Schema Drift using Pydantic\nfrom pydantic import BaseModel, Field\nclass PatientSchema(BaseModel):\n    patient_id: str\n    age: int = Field(ge=0, le=120)  # Validates type and range"
  },
  {
    id: 12,
    question: "What is Cosine Similarity, and why is it preferred over Euclidean Distance when comparing unstructured text embeddings?",
    shortAnswer: "Cosine Similarity measures the cosine of the angle between two vectors, making it invariant to document length, whereas Euclidean distance is distorted by word count variations.",
    explanation: "If document A has 10 words about cardiology and document B has 100 words about the exact same cardiology topic, their Euclidean distance will be very large due to magnitude differences. Cosine similarity = (u . v) / (||u|| ||v||) measures directional alignment (topic similarity) regardless of document length.",
    hint: "Angle of direction vs length of arrow.",
    level: "Moderate",
    codeExample: "import numpy as np\nu = np.array([1, 2, 0])      # Short document\nv = np.array([10, 20, 0])    # 10x longer document on same topic\ncos_sim = np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v)) # Exactly 1.0 (Identical topic!)"
  },
  {
    id: 13,
    question: "Why does naively flattening a high-resolution 2D image (e.g. 1024x1024 RGB) into a 1D vector cause the Curse of Dimensionality in classical ML?",
    shortAnswer: "A 1024x1024x3 image produces 3,145,728 input features, causing severe overfitting, astronomical memory requirements, and complete destruction of 2D spatial locality.",
    explanation: "Flattening treats pixel (1, 1) and pixel (1, 2) as independent, unrelated features, discarding crucial 2D spatial relationships (edges, textures, shapes). Furthermore, fitting an algorithm on 3 million input dimensions requires millions of training samples to prevent overfitting. CNNs solve this via localized kernels.",
    hint: "What is 1024 * 1024 * 3, and can Logistic Regression handle that many input weights without millions of images?",
    level: "Moderate",
    codeExample: "# Naive flattening dimension count:\nh, w, c = 1024, 1024, 3\nnum_features = h * w * c  # 3,145,728 dimensions!\n# Solution: Downsample, use CNN feature extractors, or Vision Transformers"
  },
  {
    id: 14,
    question: "How is unstructured audio data preprocessed before being fed into a machine learning model?",
    shortAnswer: "Audio waveforms are converted into 2D time-frequency images (Spectrograms) or Mel-Frequency Cepstral Coefficients (MFCCs) using Short-Time Fourier Transforms (STFT).",
    explanation: "Raw audio is a 1D sequence of air pressure amplitudes sampled at 16 kHz or 44.1 kHz. Preprocessing divides the signal into short overlapping windows (e.g. 25ms), applies the Fast Fourier Transform (FFT) to extract frequencies, and maps them to the perceptual Mel scale, producing an MFCC feature matrix.",
    hint: "How does human hearing perceive sound frequencies, and how do we turn sound waves into an image?",
    level: "Moderate",
    codeExample: "# Conceptual MFCC Extraction\n# raw_audio: 16000 samples/sec -> STFT -> Mel Filterbank -> MFCCs (e.g. 13 to 40 coefficients per frame)"
  },
  {
    id: 15,
    question: "What is a Dense Embedding (e.g. Word2Vec, BERT, BioBERT), and how does it solve the limitations of Sparse TF-IDF?",
    shortAnswer: "Dense embeddings map unstructured words or sentences into continuous low-dimensional vectors (e.g. R^300 or R^768) where semantically similar words are close in vector space.",
    explanation: "Sparse TF-IDF has two flaws: orthogonality (the words 'physician' and 'doctor' share zero overlapping features, cosine similarity = 0) and high dimensionality. Dense embeddings capture latent semantic relationships: vector('doctor') is mathematically close to vector('physician') in embedding space.",
    hint: "Does TF-IDF understand that 'car' and 'automobile' mean the same thing?",
    level: "Advanced",
    codeExample: "# Dense embedding semantic proximity:\n# cos_sim(embed('cardiologist'), embed('heart doctor')) ≈ 0.89\n# In TF-IDF: cos_sim('cardiologist', 'heart doctor') == 0.0 (Zero shared words)"
  },
  {
    id: 16,
    question: "What is Multimodal Feature Fusion in machine learning systems?",
    shortAnswer: "The integration of features from multiple distinct data modalities (e.g. Structured patient vitals + Unstructured doctor notes + Unstructured X-ray images) into a unified predictive model.",
    explanation: "Real-world problems rarely exist in a single modality. In hospital ICUs, patient risk is best predicted by combining structured tabular telemetry (heart rate, blood pressure), unstructured clinical progress notes (NLP), and medical scans (computer vision). Multimodal fusion combines these sources for higher predictive power.",
    hint: "Combining a patient's lab numbers, doctor's written notes, and X-ray into one comprehensive diagnosis.",
    level: "Advanced",
    codeExample: "# Early Fusion: Horizontal concatenation of feature vectors\nimport numpy as np\nx_struct = np.array([54, 130])     # Age, BP (2 dims)\nx_text = np.array([0.42, 0.88])     # TF-IDF / NLP embedding (2 dims)\nx_image = np.array([0.15, 0.65])    # CNN feature vector (2 dims)\nx_fused = np.concatenate([x_struct, x_text, x_image]) # Combined R^6 vector"
  },
  {
    id: 17,
    question: "What is the difference between Early Fusion and Late Fusion in multimodal machine learning?",
    shortAnswer: "Early Fusion concatenates preprocessed feature vectors from all modalities before model training; Late Fusion trains separate models for each modality and combines their final prediction probabilities.",
    explanation: "In Early Fusion (feature-level fusion), a single model learns complex cross-modal interactions (e.g. how a specific blood pressure number correlates with a specific X-ray shadow). In Late Fusion (decision-level fusion), specialized models (e.g. ResNet for images, RoBERTa for text, XGBoost for tabular) output probabilities, which are averaged or blended via a meta-classifier.",
    hint: "Mix ingredients before cooking (Early) vs prepare separate dishes and plate them together (Late).",
    level: "Advanced",
    codeExample: "# Late Fusion: Ensembling individual model probabilities\np_tabular = model_xgb.predict_proba(x_tabular)[:, 1]\np_vision = model_cnn.predict_proba(x_image)[:, 1]\np_nlp = model_bert.predict_proba(x_text)[:, 1]\np_final = (0.3 * p_tabular) + (0.4 * p_vision) + (0.3 * p_nlp)"
  },
  {
    id: 18,
    question: "How do Vector Databases (e.g. Pinecone, Milvus, ChromaDB, Qdrant) handle unstructured data search in production enterprise applications?",
    shortAnswer: "They index dense vector embeddings generated by deep neural networks using Approximate Nearest Neighbor (ANN) algorithms (like HNSW) to perform sub-second semantic search.",
    explanation: "Traditional relational databases cannot index 768-dimensional float vectors efficiently with B-Trees. Vector databases store dense embeddings of unstructured text or images and use hierarchical navigable small world (HNSW) graphs to find the closest vectors in vector space in milliseconds, powering Retrieval-Augmented Generation (RAG) and reverse image search.",
    hint: "How does Google Photos find pictures of 'dogs on a beach' without any image filenames having those words?",
    level: "Advanced",
    codeExample: "# Conceptual Vector Search Query\nquery_vector = embed('severe chest discomfort and dizziness')\n# vector_db.query(vector=query_vector, top_k=5) -> returns most semantically relevant clinical notes"
  },
  {
    id: 19,
    question: "What is Stop-Word Removal, and when can removing stop-words actually HARM an unstructured text machine learning model?",
    shortAnswer: "Stop-word removal filters out high-frequency functional words ('the', 'is', 'at'); it harms models when analyzing sentiment, negation ('not', 'no'), or when using modern contextual Transformers (BERT).",
    explanation: "In classical Bag-of-Words, stop-words add noise and inflate dimensionality without providing topic signal. However, in sentiment analysis or clinical triage, removing 'not' turns 'patient is NOT responding to medication' into 'patient responding medication' (a catastrophic reversal!). Modern Transformers require stop-words to model syntactic attention.",
    hint: "What happens to the sentence 'Flight was NOT delayed' if you remove the word 'NOT'?",
    level: "Moderate",
    codeExample: "# Catastrophic Stop-word Removal on Negation:\nraw_text = 'Tumor is not malignant'\nfiltered = [w for w in raw_text.split() if w.lower() not in ['is', 'not']]\n# filtered: ['Tumor', 'malignant'] -> Meaning completely inverted!"
  },
  {
    id: 20,
    question: "What is N-Gram modeling in text vectorization, and what trade-off does it introduce?",
    shortAnswer: "N-grams group contiguous sequences of N words (e.g. bigrams: 'blood pressure'); they capture local word order context but exponentially increase vocabulary size and matrix sparsity.",
    explanation: "Unigrams (1-grams) cannot distinguish 'not good' from 'good, not'. Bigrams (2-grams) and trigrams (3-grams) capture phrase-level meaning ('acute myocardial infarction'). However, the number of unique word pairs grows quadratically with vocabulary size, requiring feature selection or frequency pruning.",
    hint: "Unigram = 'blood', Bigram = 'blood pressure', Trigram = 'high blood pressure'.",
    level: "Moderate",
    codeExample: "from sklearn.feature_extraction.text import CountVectorizer\nvec = CountVectorizer(ngram_range=(1, 2))  # Captures both unigrams and bigrams\nX = vec.fit_transform(['High blood pressure noted'])"
  },
  {
    id: 21,
    question: "In unstructured image preprocessing, what is Discrete 2D Spatial Convolution?",
    shortAnswer: "A mathematical operation where a small weight matrix (kernel) slides over a 2D image, multiplying overlapping pixel values and summing them to detect localized spatial features (edges, textures).",
    explanation: "Formally, S(i, j) = (I * K)(i, j) = ∑_m ∑_n I(i - m, j - n) K(m, n). Convolving an image with Sobel or Laplacian kernels highlights horizontal lines, vertical contours, and corners while maintaining translation invariance. This forms the foundation of Convolutional Neural Networks (CNNs).",
    hint: "A sliding magnifying glass multiplying and adding neighboring pixels to highlight edges.",
    level: "Advanced",
    codeExample: "# 3x3 Sobel Horizontal Edge Kernel\nsobel_horizontal = [\n    [-1, -2, -1],\n    [ 0,  0,  0],\n    [ 1,  2,  1]\n]"
  },
  {
    id: 22,
    question: "Why is Parquet preferred over CSV for storing large-scale structured and semi-structured tabular data in Machine Learning pipelines?",
    shortAnswer: "Parquet is a columnar binary format with snappy compression, strict schema typing, and partition pruning, making it 5x to 10x smaller and up to 50x faster to read than row-based CSVs.",
    explanation: "CSV is an uncompressed, untyped plain-text row format; every query must parse every single character across all columns from disk. Parquet stores data column-by-column with dictionary encoding and statistics (min/max per block), allowing queries to read only the specific feature columns needed for model training without loading the entire dataset into RAM.",
    hint: "Reading only the 3 columns your model needs vs parsing every text line of a 100-column CSV.",
    level: "Moderate",
    codeExample: "import pandas as pd\n# df.to_parquet('data.parquet', compression='snappy')\n# Fast column-pruned load:\n# df_subset = pd.read_parquet('data.parquet', columns=['age', 'blood_sugar'])"
  },
  {
    id: 23,
    question: "How do you handle polymorphic arrays inside semi-structured JSON records when preparing tabular ML features?",
    shortAnswer: "By computing summary aggregation statistics (array length, min, max, average) or applying multi-hot encoding / bag-of-tags vectorization.",
    explanation: "If a patient JSON has a list of varying length (e.g. {\"prescriptions\": [\"Metformin\", \"Aspirin\"]}), you cannot place variable-length lists directly into fixed SQL columns. Best practice is to extract: (1) count of items len(prescriptions), and (2) Multi-label binarization (One-Hot boolean columns: has_metformin=1, has_aspirin=1).",
    hint: "How do you turn a shopping basket with 3 items for customer A and 10 items for customer B into fixed table columns?",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import MultiLabelBinarizer\nmlb = MultiLabelBinarizer()\nprescriptions = [['Metformin', 'Aspirin'], ['Paracetamol'], ['Metformin']]\nencoded = mlb.fit_transform(prescriptions)\n# Generates clean binary columns for each unique medication"
  },
  {
    id: 24,
    question: "What is Data Leakage in unstructured text preprocessing pipelines, and how does it happen during TF-IDF vectorization?",
    shortAnswer: "Data leakage occurs when the TF-IDF vectorizer is fit on the entire dataset (including test set) before train/test splitting, allowing test document vocabulary and IDF weights to contaminate the training state.",
    explanation: "IDF weights depend on total document frequency across the corpus. If you call tfidf.fit(all_data), the model 'knows' words and frequencies from the unseen test set ahead of time, producing artificially inflated validation scores that collapse in production. Always call tfidf.fit_transform(X_train) and tfidf.transform(X_test).",
    hint: "Fit ONLY on training data; transform on test data!",
    level: "Advanced",
    codeExample: "# WRONG (LEAKAGE):\n# X_all_tfidf = tfidf.fit_transform(all_docs)\n# X_train, X_test = split(X_all_tfidf)\n\n# CORRECT:\nX_train_tfidf = tfidf.fit_transform(X_train_docs)\nX_test_tfidf = tfidf.transform(X_test_docs)"
  },
  {
    id: 25,
    question: "In enterprise data lakehouses, what is the role of Object Storage (like Amazon S3 or MinIO) for unstructured data?",
    shortAnswer: "Object storage provides virtually unlimited, low-cost, highly durable, distributed storage for raw binary files (images, audio, PDFs, text logs) accessible via REST APIs.",
    explanation: "Storing millions of multi-megabyte DICOM scans or CCTV video files directly inside an RDBMS table (as BLOBs) bloats relational database backups, degrades B-Tree indexing, and incurs massive hardware costs. Best practice is to store raw files in S3/MinIO and save only their URI paths (e.g. s3://hospital-scans/pt-101.dcm) in the structured database.",
    hint: "Store the heavy file on S3; store the file path link in SQL.",
    level: "Moderate",
    codeExample: "# Structured Database Record:\nrecord = {'patient_id': 'PT-101', 'scan_date': '2026-11-19', 's3_uri': 's3://medical-lake/scans/pt101_chest_xray.dcm'}"
  },
  {
    id: 26,
    question: "What is Subword Tokenization (e.g. Byte-Pair Encoding BPE, WordPiece), and how does it handle Out-Of-Vocabulary (OOV) words in unstructured text?",
    shortAnswer: "Subword tokenization breaks unknown or complex words into frequent subword fragments (e.g. 'unpredictable' -> 'un', 'predict', 'able'), eliminating Out-Of-Vocabulary errors.",
    explanation: "Classical word-level tokenization replaces any unseen word in test data with an unknown '<UNK>' token, losing all semantic meaning. Subword algorithms (used in BERT, GPT, LLaMA) break rare or domain-specific words into common subword pieces, enabling models to parse novel compound terms, typos, and medical jargon seamlessly.",
    hint: "Breaking compound words into meaningful Lego bricks.",
    level: "Advanced",
    codeExample: "# Subword breakdown in modern NLP:\n# 'hypercholesterolemia' -> ['hyper', '##cholesterol', '##emia']"
  },
  {
    id: 27,
    question: "When should you choose a Relational Database (Structured) over a NoSQL Document Store (Semi-Structured)?",
    shortAnswer: "Choose Relational RDBMS when data has a stable, known schema, requires ACID transactions, and involves complex multi-table JOINs; choose NoSQL when schema evolves rapidly, data is nested, and massive horizontal scaling is required.",
    explanation: "Financial ledgers, banking core accounts, and payroll demand absolute mathematical consistency (ACID) and relational integrity (foreign keys). E-commerce product catalogs with thousands of fluctuating attributes, web analytics event logs, and user profile metadata thrive in flexible NoSQL document stores (MongoDB, DynamoDB).",
    hint: "Bank accounts (ACID, rigid) vs Amazon product listings (flexible, thousands of varying specs).",
    level: "Moderate",
    codeExample: "# RDBMS: Strict foreign key constraints and atomic balances\n# NoSQL: Flexible heterogeneous catalog items where a shirt has 'size/fabric' and a laptop has 'ram/cpu'"
  },
  {
    id: 28,
    question: "What is OCR (Optical Character Recognition), and what preprocessing challenges does it present when converting unstructured paper documents to text?",
    shortAnswer: "OCR converts scanned pixel images of printed or handwritten text into digital machine-readable character strings; challenges include noise, skewed angles, varying fonts, and broken table layouts.",
    explanation: "Enterprises in West Bengal (e.g. land records, paper bills, medical prescriptions) have decades of scanned physical archives. OCR tools (Tesseract, AWS Textract) convert these to text strings, but produce OCR errors (e.g. reading 'rn' as 'm', or misreading decimal points in medical dosages). Text cleanup and regex normalization are vital.",
    hint: "Turning a photo of a doctor's handwritten prescription into a digital string.",
    level: "Moderate",
    codeExample: "# OCR Pipeline: Image Scan -> Binarization -> Tesseract OCR -> Post-Processing Regex Cleanup"
  },
  {
    id: 29,
    question: "How does Min-Max Normalization differ from Z-Score Standardization when applied to unstructured image pixel intensities?",
    shortAnswer: "Min-Max normalization scales pixel values strictly to a fixed range [0.0, 1.0] by dividing by 255.0; Z-score standardization shifts pixels to mean 0 and standard deviation 1 using ImageNet pretraining statistics.",
    explanation: "For neural networks starting from scratch, dividing raw [0, 255] pixels by 255.0 scales intensities cleanly to [0, 1]. For transfer learning with pretrained networks (ResNet, VGG, EfficientNet), pixels must be standardized with the exact mean and std of the ImageNet training corpus: (pixel/255.0 - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225].",
    hint: "Scaling to [0, 1] vs standardizing with ImageNet mean and variance.",
    level: "Expert",
    codeExample: "import numpy as np\n# Min-Max Normalization:\nimg_minmax = raw_img / 255.0\n# Standardized for Transfer Learning:\nmean = np.array([0.485, 0.456, 0.406])\nstd = np.array([0.229, 0.224, 0.225])\nimg_standardized = (img_minmax - mean) / std"
  },
  {
    id: 30,
    question: "What is the end-to-end architecture of a Modern Multimodal Enterprise Machine Learning System?",
    shortAnswer: "Raw structured data flows to SQL/Parquet; semi-structured data is normalized from JSON; unstructured data is vectorized via CNNs/Transformers; all modalities are fused into a unified feature store for training and real-time inference.",
    explanation: "In production systems (e.g. fraud detection in Salt Lake, Kolkata), (1) Transaction data is queried from PostgreSQL, (2) IoT logs are flattened from Kafka JSON streams, (3) Customer chat transcripts are embedded via RoBERTa into R^768, (4) Invoices are parsed via OCR, and (5) A feature store (Feast/Hopsworks) serves the fused feature vector to an ensembled XGBoost + Neural Network pipeline.",
    hint: "Connecting SQL tables + JSON streams + Text embeddings + Computer Vision into one production prediction pipeline.",
    level: "Expert",
    codeExample: "# Complete Multimodal Pipeline Conceptual Flow:\n# [PostgreSQL + Kafka JSON + S3 Audio/Images] -> [Feature Extractors] -> [Unified Feature Store] -> [Model Inference]"
  }
];

export default questions;
