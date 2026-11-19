"""
=============================================================================
TOPIC 5: STRUCTURED AND UNSTRUCTURED DATA (BASIC IDEA & FEATURE PIPELINES)
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Interactive Multimodal Vectorization Engine
Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax
Location: Barrackpore, Kolkata, West Bengal, India
Course Code: BCAC701B / MCA / B.Tech Computer Science
=============================================================================

This comprehensive laboratory engine demonstrates:
1. Data Modality Triad:
   - Structured Data: Relational tabular records with fixed schema-on-write.
   - Semi-Structured Data: Hierarchical, self-describing JSON with nested attributes.
   - Unstructured Data: Free-form clinical text notes and 2D grayscale image matrices.
2. Unstructured Text Vectorization:
   - Custom Tokenizer, Stop-word filter, and Vocabulary Builder.
   - Mathematical TF-IDF (Term Frequency - Inverse Document Frequency) implementation.
   - Sparse vector generation and pairwise Cosine Similarity calculation.
3. Unstructured Image Preprocessing:
   - 2D pixel intensity normalization ([0, 255] -> [0.0, 1.0]).
   - Discrete 2D spatial convolution with edge-detection kernels.
   - Vector flattening into 1D numerical representation.
4. Semi-Structured JSON Normalization:
   - Recursive dictionary flattening of nested keys into relational columns.
5. Multimodal Feature Fusion:
   - Horizontal concatenation of Tabular + Text TF-IDF + Image features
     into a unified design matrix X in R^(N x D) ready for machine learning.
=============================================================================
"""

import math
import json
import re
from typing import List, Dict, Any, Tuple, Set


# =============================================================================
# 1. SYNTHETIC MULTIMODAL HEALTHCARE DATASET (BARRACKPORE CLINICAL HUB)
# =============================================================================

def get_sample_multimodal_records() -> List[Dict[str, Any]]:
    """
    Returns 5 multimodal patient records containing:
    1. Structured: age, blood_pressure, blood_sugar, prior_visits
    2. Semi-Structured: nested JSON clinical visit metadata with nested tags
    3. Unstructured Text: doctor's free-form examination narrative
    4. Unstructured Image: synthetic 4x4 micro chest X-ray pixel intensity matrix
    """
    return [
        {
            "patient_id": "PT-7001",
            "name": "Mamata Banerjee (Barrackpore)",
            # Structured tabular features
            "structured": {
                "age": 52,
                "systolic_bp": 138,
                "blood_sugar_fasting": 110.5,
                "prior_admissions": 2
            },
            # Semi-structured hierarchical JSON
            "semi_structured_json": {
                "insurance": {"provider": "SwasthyaSathi", "tier": "Gold", "active": True},
                "triage": {"urgency_code": 2, "ward": "Cardiology"},
                "lab_tests": ["ECG", "HbA1c", "LipidProfile"]
            },
            # Unstructured text narrative
            "unstructured_text": (
                "Patient presents with mild chest discomfort and fatigue. "
                "History of controlled hypertension and elevated fasting blood sugar. "
                "Recommended resting ECG and low-sodium diet."
            ),
            # Unstructured 2D image matrix (4x4 synthetic grayscale pixels [0-255])
            "unstructured_image": [
                [45, 60, 210, 220],
                [50, 75, 195, 205],
                [40, 55, 180, 190],
                [35, 50, 160, 175]
            ],
            "target_risk_level": "Moderate"
        },
        {
            "patient_id": "PT-7002",
            "name": "Debangshu Mukherjee (Kolkata)",
            "structured": {
                "age": 64,
                "systolic_bp": 165,
                "blood_sugar_fasting": 185.0,
                "prior_admissions": 5
            },
            "semi_structured_json": {
                "insurance": {"provider": "Mediclaim", "tier": "Platinum", "active": True},
                "triage": {"urgency_code": 1, "ward": "ICU"},
                "lab_tests": ["CardiacEnzymes", "Troponin", "Echo"]
            },
            "unstructured_text": (
                "Acute shortness of breath and severe palpitations following exertion. "
                "Uncontrolled diabetes and critical hypertensive crisis observed. "
                "Immediate intensive care monitoring required."
            ),
            "unstructured_image": [
                [220, 230, 240, 250],
                [210, 225, 235, 245],
                [180, 200, 215, 230],
                [170, 190, 205, 220]
            ],
            "target_risk_level": "High"
        },
        {
            "patient_id": "PT-7003",
            "name": "Susmita Sen (Ichapur)",
            "structured": {
                "age": 28,
                "systolic_bp": 115,
                "blood_sugar_fasting": 88.0,
                "prior_admissions": 0
            },
            "semi_structured_json": {
                "insurance": {"provider": "CorporateGroup", "tier": "Standard", "active": True},
                "triage": {"urgency_code": 3, "ward": "GeneralOPD"},
                "lab_tests": ["RoutineBlood", "Thyroid"]
            },
            "unstructured_text": (
                "Annual preventative health screening. Patient reports high energy levels and no chest pain. "
                "Normal cardiovascular rhythm and normal blood glucose observed."
            ),
            "unstructured_image": [
                [30, 35, 40, 45],
                [32, 38, 42, 48],
                [28, 34, 39, 44],
                [25, 30, 35, 40]
            ],
            "target_risk_level": "Low"
        },
        {
            "patient_id": "PT-7004",
            "name": "Abhronila Das (Jadavpur)",
            "structured": {
                "age": 45,
                "systolic_bp": 128,
                "blood_sugar_fasting": 102.0,
                "prior_admissions": 1
            },
            "semi_structured_json": {
                "insurance": {"provider": "SwasthyaSathi", "tier": "Silver", "active": True},
                "triage": {"urgency_code": 3, "ward": "GeneralOPD"},
                "lab_tests": ["CBC", "LipidProfile"]
            },
            "unstructured_text": (
                "Patient notes recurring tension headaches and mild postural dizziness. "
                "Blood pressure marginally elevated under work stress. Advised lifestyle modifications."
            ),
            "unstructured_image": [
                [70, 85, 120, 130],
                [75, 90, 125, 135],
                [65, 80, 115, 125],
                [60, 75, 110, 120]
            ],
            "target_risk_level": "Moderate"
        },
        {
            "patient_id": "PT-7005",
            "name": "Mahima Paul (Salt Lake)",
            "structured": {
                "age": 71,
                "systolic_bp": 172,
                "blood_sugar_fasting": 210.0,
                "prior_admissions": 6
            },
            "semi_structured_json": {
                "insurance": {"provider": "Mediclaim", "tier": "SeniorCitizen", "active": False},
                "triage": {"urgency_code": 1, "ward": "ICU"},
                "lab_tests": ["CardiacEnzymes", "RenalPanel", "ECG"]
            },
            "unstructured_text": (
                "Severe dyspnea and orthopnea. Acute exacerbation of chronic congestive heart failure. "
                "Critical hyperglycemia and hypertensive urgency noted. Urgent IV medication initiated."
            ),
            "unstructured_image": [
                [230, 240, 250, 255],
                [220, 235, 245, 250],
                [210, 225, 235, 240],
                [195, 210, 220, 230]
            ],
            "target_risk_level": "High"
        }
    ]


# =============================================================================
# 2. UNSTRUCTURED TEXT PREPROCESSING & TF-IDF VECTORIZER (FROM SCRATCH)
# =============================================================================

STOPWORDS: Set[str] = {
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
    "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were",
    "will", "with", "patient", "reports", "observed", "under", "following"
}

class UnstructuredTextVectorizer:
    """
    Mathematical TF-IDF Vectorizer built from first principles:
    TF(t, d) = count(t in d) / total_words(d)
    IDF(t, D) = log( (1 + |D|) / (1 + df(t)) ) + 1.0 (Scikit-Learn smoothed convention)
    Vector = L2-normalized [TF * IDF]
    """
    def __init__(self, top_n_vocab: int = 12):
        self.top_n = top_n_vocab
        self.vocabulary: Dict[str, int] = {}
        self.idf_: Dict[str, float] = {}

    @staticmethod
    def tokenize(text: str) -> List[str]:
        cleaned = re.sub(r"[^a-zA-Z0-9\s]", "", text.lower())
        tokens = cleaned.split()
        return [t for t in tokens if t not in STOPWORDS and len(t) > 2]

    def fit(self, documents: List[str]):
        doc_tokens = [self.tokenize(doc) for doc in documents]
        n_docs = len(documents)

        # Count document frequency (df) for each word
        df_counts: Dict[str, int] = {}
        for tokens in doc_tokens:
            unique_in_doc = set(tokens)
            for word in unique_in_doc:
                df_counts[word] = df_counts.get(word, 0) + 1

        # Select top-N most informative terms (by highest document frequency & length)
        sorted_terms = sorted(df_counts.keys(), key=lambda w: (-df_counts[w], w))
        self.vocabulary = {term: idx for idx, term in enumerate(sorted_terms[:self.top_n])}

        # Calculate smoothed IDF: log((1 + N) / (1 + df)) + 1
        for term in self.vocabulary:
            df = df_counts.get(term, 0)
            self.idf_[term] = math.log((1 + n_docs) / (1 + df)) + 1.0

    def transform(self, documents: List[str]) -> List[List[float]]:
        feature_matrix = []
        for doc in documents:
            tokens = self.tokenize(doc)
            total_tokens = len(tokens) if tokens else 1

            # Compute TF
            tf: Dict[str, float] = {}
            for t in tokens:
                if t in self.vocabulary:
                    tf[t] = tf.get(t, 0) + 1.0

            # Vector in vocabulary space
            vec = [0.0] * len(self.vocabulary)
            for term, idx in self.vocabulary.items():
                term_tf = tf.get(term, 0.0) / total_tokens
                term_idf = self.idf_[term]
                vec[idx] = term_tf * term_idf

            # L2 Normalization
            norm = math.sqrt(sum(v * v for v in vec))
            if norm > 0:
                vec = [round(v / norm, 4) for v in vec]
            feature_matrix.append(vec)

        return feature_matrix


# =============================================================================
# 3. UNSTRUCTURED IMAGE PROCESSOR (NORMALIZATION & 2D CONVOLUTION)
# =============================================================================

class UnstructuredImageProcessor:
    """
    Preprocesses 2D pixel matrices into normalized, feature-extracted vectors:
    1. Pixel Scaling: Maps raw [0, 255] integer intensities to [0.0, 1.0] continuous space.
    2. Spatial Feature Convolution: Applies a 3x3 Edge-Detection Sobel/Laplacian kernel.
    3. Global Flattening: Unrolls 2D spatial grid into a 1D feature vector in R^d.
    """
    HORIZONTAL_EDGE_KERNEL = [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
    ]

    @classmethod
    def normalize_pixels(cls, matrix: List[List[int]]) -> List[List[float]]:
        return [[round(pixel / 255.0, 4) for pixel in row] for row in matrix]

    @classmethod
    def apply_convolution(cls, matrix: List[List[float]]) -> List[List[float]]:
        """Applies valid 3x3 horizontal edge convolution to a 4x4 matrix (resulting in 2x2 output)."""
        kernel = cls.HORIZONTAL_EDGE_KERNEL
        h, w = len(matrix), len(matrix[0])
        out_h, out_w = h - 2, w - 2
        convolved = []

        for i in range(out_h):
            row = []
            for j in range(out_w):
                acc = 0.0
                for ki in range(3):
                    for kj in range(3):
                        acc += matrix[i + ki][j + kj] * kernel[ki][kj]
                row.append(round(acc, 4))
            convolved.append(row)

        return convolved

    @classmethod
    def flatten(cls, matrix: List[List[Any]]) -> List[float]:
        return [float(val) for row in matrix for val in row]


# =============================================================================
# 4. SEMI-STRUCTURED JSON FLATTENER (RECURSIVE JSON-TO-TABLE)
# =============================================================================

def flatten_semi_structured_json(nested_dict: Dict[str, Any], parent_key: str = "", sep: str = "_") -> Dict[str, Any]:
    """
    Recursively projects hierarchical JSON keys into flat tabular columns
    (Mirroring the functionality of pandas.json_normalize).
    Example: {"insurance": {"provider": "SwasthyaSathi"}} -> {"insurance_provider": "SwasthyaSathi"}
    """
    items = []
    for k, v in nested_dict.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_semi_structured_json(v, new_key, sep=sep).items())
        elif isinstance(v, list):
            # Encode list length and join elements as compact categorical summary
            items.append((f"{new_key}_count", len(v)))
            items.append((f"{new_key}_joined", "|".join(str(item) for item in v)))
        else:
            items.append((new_key, v))
    return dict(items)


# =============================================================================
# 5. COSINE SIMILARITY ENGINE (VECTOR SPACE DISTANCE)
# =============================================================================

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return round(dot_product / (norm1 * norm2), 4)


# =============================================================================
# 6. MAIN MULTIMODAL FEATURE FUSION LABORATORY PIPELINE
# =============================================================================

def run_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX - ADVANCED MACHINE LEARNING LABORATORY")
    print("TOPIC 5: STRUCTURED AND UNSTRUCTURED DATA (BASIC IDEA & FEATURE PIPELINES)")
    print("Academic Subject: BCAC701B | Data Types and Preprocessing")
    print("Mentor: Sukanta Hui | Barrackpore, West Bengal, India")
    print("=" * 80)

    records = get_sample_multimodal_records()
    print(f"\n[+] Ingested {len(records)} Multimodal Patient Cohort Records from Barrackpore Clinical Hub.")

    # -------------------------------------------------------------------------
    # PART A: STRUCTURED DATA TABULAR MATRIX
    # -------------------------------------------------------------------------
    print("\n" + "-" * 80)
    print("1. STRUCTURED DATA: Tabular Feature Matrix (Fixed Schema-on-Write)")
    print("-" * 80)
    struct_headers = ["age", "systolic_bp", "blood_sugar_fasting", "prior_admissions"]
    print(f"{'Patient ID':<12} | {'Name':<24} | " + " | ".join(f"{h:>18}" for h in struct_headers))
    print("-" * 80)
    
    structured_matrix = []
    for rec in records:
        s = rec["structured"]
        row = [s["age"], s["systolic_bp"], s["blood_sugar_fasting"], s["prior_admissions"]]
        structured_matrix.append(row)
        print(f"{rec['patient_id']:<12} | {rec['name'][:24]:<24} | " + " | ".join(f"{val:>18}" for val in row))

    # -------------------------------------------------------------------------
    # PART B: SEMI-STRUCTURED JSON FLATTENING
    # -------------------------------------------------------------------------
    print("\n" + "-" * 80)
    print("2. SEMI-STRUCTURED DATA: Hierarchical JSON Normalization (Schema-on-Read)")
    print("-" * 80)
    print("Raw Hierarchical JSON for PT-7001:")
    print(json.dumps(records[0]["semi_structured_json"], indent=2))
    
    flattened_json_list = [flatten_semi_structured_json(r["semi_structured_json"]) for r in records]
    print("\nFlattened Tabular Output (Equivalent to pd.json_normalize):")
    sample_flat = flattened_json_list[0]
    for key, val in sample_flat.items():
        print(f"  -> Column '{key:<28}': {val}")

    # -------------------------------------------------------------------------
    # PART C: UNSTRUCTURED TEXT TF-IDF VECTORIZATION
    # -------------------------------------------------------------------------
    print("\n" + "-" * 80)
    print("3. UNSTRUCTURED TEXT DATA: Mathematical TF-IDF Vector Space Model")
    print("-" * 80)
    raw_texts = [r["unstructured_text"] for r in records]
    vectorizer = UnstructuredTextVectorizer(top_n_vocab=10)
    vectorizer.fit(raw_texts)

    print("Learned Top-10 Vocabulary & Computed Inverse Document Frequency (IDF):")
    for term, idx in vectorizer.vocabulary.items():
        print(f"  [Index {idx:>2}] Term: '{term:<18}' | IDF Weight: {vectorizer.idf_[term]:.4f}")

    tfidf_matrix = vectorizer.transform(raw_texts)
    print("\nResulting TF-IDF Feature Vectors (L2 Normalized):")
    for rec, vec in zip(records, tfidf_matrix):
        print(f"  {rec['patient_id']} ({rec['name'][:16]}): {[round(x, 3) for x in vec]}")

    # Pairwise Cosine Similarity between Patient 1 and others
    print("\nText Semantic Cosine Similarity relative to Patient 1 (Mamata):")
    p1_vec = tfidf_matrix[0]
    for i in range(1, len(records)):
        sim = cosine_similarity(p1_vec, tfidf_matrix[i])
        print(f"  Sim(PT-7001, {records[i]['patient_id']} - {records[i]['name'][:20]}) = {sim:.4f}")

    # -------------------------------------------------------------------------
    # PART D: UNSTRUCTURED IMAGE PROCESSING (PIXEL NORMALIZATION & CONVOLUTION)
    # -------------------------------------------------------------------------
    print("\n" + "-" * 80)
    print("4. UNSTRUCTURED IMAGE DATA: Intensity Normalization & Edge Convolution")
    print("-" * 80)
    p1_img_raw = records[0]["unstructured_image"]
    print("Raw 4x4 Pixel Matrix for PT-7001 (Integer intensities [0-255]):")
    for row in p1_img_raw:
        print("  " + "  ".join(f"{p:>4}" for p in row))

    p1_img_norm = UnstructuredImageProcessor.normalize_pixels(p1_img_raw)
    print("\nNormalized Pixel Matrix ([0.0 - 1.0] continuous scale):")
    for row in p1_img_norm:
        print("  " + "  ".join(f"{p:>6.3f}" for p in row))

    p1_img_conv = UnstructuredImageProcessor.apply_convolution(p1_img_norm)
    print("\nConvolved 2x2 Spatial Feature Matrix (Horizontal Edge Detection Kernel):")
    for row in p1_img_conv:
        print("  " + "  ".join(f"{p:>7.3f}" for p in row))

    image_feature_vectors = [
        UnstructuredImageProcessor.flatten(
            UnstructuredImageProcessor.apply_convolution(
                UnstructuredImageProcessor.normalize_pixels(r["unstructured_image"])
            )
        )
        for r in records
    ]

    # -------------------------------------------------------------------------
    # PART E: MULTIMODAL FEATURE FUSION (THE MACHINE LEARNING INPUT MATRIX)
    # -------------------------------------------------------------------------
    print("\n" + "-" * 80)
    print("5. MULTIMODAL FEATURE FUSION: Unifying Disparate Data Modalities into R^(N x D)")
    print("-" * 80)
    print("Formula: X_fused = [ X_structured (4) | X_text_tfidf (10) | X_image_conv (4) ] in R^(5 x 18)\n")

    fused_matrix = []
    for i in range(len(records)):
        fused_row = structured_matrix[i] + tfidf_matrix[i] + image_feature_vectors[i]
        fused_matrix.append(fused_row)
        print(f"  {records[i]['patient_id']} -> Fused Vector Length: {len(fused_row)} features | Target: {records[i]['target_risk_level']}")

    print("\n" + "=" * 80)
    print("[✔] LABORATORY VERIFICATION SUCCESSFUL:")
    print("    Demonstrated how Unstructured text (TF-IDF) and Image (Convolution) signals")
    print("    and Semi-Structured JSON (Flattening) are transformed into a strict")
    print("    numerical 2D feature matrix X in R^(N x D) for model training.")
    print("=" * 80)


if __name__ == "__main__":
    run_laboratory()
