"""
=============================================================================
TOPIC 10: REMOVING DUPLICATE RECORDS & ENTITY RESOLUTION
Module: Data Types and Preprocessing (BCAC701B)
Academic Practical Laboratory & Industrial Simulation Engine
Author: Sukanta Hui | Senior Consultant & Educator | Barrackpore, West Bengal
Institute: Coder & AccoTax
=============================================================================

This laboratory engine provides a comprehensive, production-grade implementation
of duplicate record detection, record linkage, and entity resolution from scratch,
requiring ZERO external third-party dependencies (built solely with standard Python).

Core Algorithmic Modules Implemented:
1. Canonical Hashing Engine (MD5 & SHA-256 for Exact Duplication).
2. Metric-Based String Distances:
   - Levenshtein Distance (Dynamic Programming Wagner-Fischer algorithm).
   - Jaro Similarity & Jaro-Winkler Similarity (Prefix scale p=0.1).
   - Character N-Gram Jaccard Similarity.
   - Soundex Phonetic Encoding (Russell & Odell).
3. Indexing & Blocking Engine:
   - Naive All-Pairs Comparison: O(N^2).
   - Inverted Index Blocking: O(Sum(B_k^2)) << O(N^2).
   - Reduction Ratio (RR) and Candidate Pair Evaluation.
4. Fellegi-Sunter Probabilistic Record Linkage:
   - Multi-feature agreement vector gamma.
   - Log-likelihood weight calculation.
   - Match, Clerical Review, and Non-Match decision boundaries.
5. Golden Master Record Resolution:
   - Recency vs Completeness (Null-coalescence) vs Authority merging.
6. Empirical Simulation:
   - West Bengal municipal and e-commerce entity resolution benchmarks.
=============================================================================
"""

import math
import hashlib
import re
import time
from typing import List, Dict, Any, Tuple, Set, Optional
from dataclasses import dataclass

# =====================================================================
# 1. PHONETIC & STRING SIMILARITY ALGORITHMS (FROM FIRST PRINCIPLES)
# =====================================================================

def soundex(text: str) -> str:
    """
    Computes the American Soundex code for phonetic matching of names.
    Maps letters to phonetic digits while ignoring vowels and silent letters.
    """
    if not text:
        return "0000"
    
    clean = re.sub(r'[^A-Za-z]', '', text).upper()
    if not clean:
        return "0000"
    
    first_letter = clean[0]
    
    # Mapping table
    mapping = {
        'B': '1', 'F': '1', 'P': '1', 'V': '1',
        'C': '2', 'G': '2', 'J': '2', 'K': '2', 'Q': '2', 'S': '2', 'X': '2', 'Z': '2',
        'D': '3', 'T': '3',
        'L': '4',
        'M': '5', 'N': '5',
        'R': '6'
    }
    
    digits = [first_letter]
    prev_code = mapping.get(first_letter, '0')
    
    for char in clean[1:]:
        code = mapping.get(char, '0')
        if code != '0':
            if code != prev_code:
                digits.append(code)
            prev_code = code
        else:
            prev_code = '0'
            
    # Format to 1 letter followed by exactly 3 digits
    res = "".join(digits[:4])
    return res.ljust(4, '0')


def levenshtein_distance(s1: str, s2: str) -> int:
    """
    Computes the exact Levenshtein Edit Distance using dynamic programming.
    Time Complexity: O(M * N), Space Complexity: O(min(M, N)).
    """
    m, n = len(s1), len(s2)
    if m < n:
        return levenshtein_distance(s2, s1)
    
    if n == 0:
        return m
    
    previous_row = list(range(n + 1))
    for i, c1 in enumerate(s1):
        current_row = [i + 1] + [0] * n
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (0 if c1 == c2 else 1)
            current_row[j + 1] = min(insertions, deletions, substitutions)
        previous_row = current_row
        
    return previous_row[n]


def levenshtein_similarity(s1: str, s2: str) -> float:
    """
    Normalized Levenshtein similarity score in [0.0, 1.0].
    sim(s1, s2) = 1.0 - (edit_distance / max(len(s1), len(s2)))
    """
    max_len = max(len(s1), len(s2))
    if max_len == 0:
        return 1.0
    dist = levenshtein_distance(s1, s2)
    return max(0.0, 1.0 - (dist / max_len))


def jaro_similarity(s1: str, s2: str) -> float:
    """
    Computes Jaro similarity metric designed specifically for short text (names).
    Formula: J = (1/3) * (m/|s1| + m/|s2| + (m - t)/m)
    where m = matching characters within window floor(max(|s1|, |s2|)/2) - 1,
    and t = number of transpositions / 2.
    """
    len1, len2 = len(s1), len(s2)
    if len1 == 0 and len2 == 0:
        return 1.0
    if len1 == 0 or len2 == 0:
        return 0.0
    
    match_distance = max(len1, len2) // 2 - 1
    if match_distance < 0:
        match_distance = 0
        
    s1_matches = [False] * len1
    s2_matches = [False] * len2
    
    matches = 0
    for i in range(len1):
        start = max(0, i - match_distance)
        end = min(i + match_distance + 1, len2)
        for j in range(start, end):
            if not s2_matches[j] and s1[i] == s2[j]:
                s1_matches[i] = True
                s2_matches[j] = True
                matches += 1
                break
                
    if matches == 0:
        return 0.0
        
    # Count transpositions
    k = 0
    transpositions = 0
    for i in range(len1):
        if s1_matches[i]:
            while not s2_matches[k]:
                k += 1
            if s1[i] != s2[k]:
                transpositions += 1
            k += 1
            
    half_transpositions = transpositions // 2
    
    return (
        (matches / len1) +
        (matches / len2) +
        ((matches - half_transpositions) / matches)
    ) / 3.0


def jaro_winkler_similarity(s1: str, s2: str, prefix_scale: float = 0.1, max_l: int = 4) -> float:
    """
    Jaro-Winkler similarity with prefix bonus for initial common characters.
    J_W = J + L * p * (1 - J)
    """
    j = jaro_similarity(s1, s2)
    if j < 0.7:  # Standard Winkler condition: prefix bonus applied only if J >= 0.7
        return j
    
    # Calculate common prefix length up to max_l characters
    prefix_len = 0
    for c1, c2 in zip(s1[:max_l], s2[:max_l]):
        if c1 == c2:
            prefix_len += 1
        else:
            break
            
    return j + (prefix_len * prefix_scale * (1.0 - j))


def ngram_jaccard_similarity(s1: str, s2: str, n: int = 2) -> float:
    """
    Character N-Gram Jaccard similarity.
    Splits string into n-character shingles and computes |A intersection B| / |A union B|.
    """
    def get_ngrams(s: str) -> Set[str]:
        s_padded = f"#{s.strip().lower()}#"
        return {s_padded[i:i+n] for i in range(len(s_padded) - n + 1)}
    
    grams1 = get_ngrams(s1)
    grams2 = get_ngrams(s2)
    
    if not grams1 and not grams2:
        return 1.0
    if not grams1 or not grams2:
        return 0.0
        
    intersection = len(grams1 & grams2)
    union = len(grams1 | grams2)
    return intersection / union if union > 0 else 0.0


# =====================================================================
# 2. EXACT HASHING & CANONICAL DEDUPLICATION
# =====================================================================

def canonicalize_record(record: Dict[str, Any], keys: Optional[List[str]] = None) -> str:
    """
    Normalizes a record dictionary into a deterministic canonical string.
    Trims whitespace, converts to lowercase, handles None types consistently,
    and sorts keys.
    """
    target_keys = sorted(keys) if keys else sorted(record.keys())
    tokens = []
    for k in target_keys:
        val = record.get(k)
        if val is None:
            norm_val = "<NULL>"
        elif isinstance(val, str):
            norm_val = re.sub(r'\s+', ' ', val.strip().lower())
        elif isinstance(val, (int, float)):
            norm_val = f"{val:.4f}" if isinstance(val, float) else str(val)
        else:
            norm_val = str(val).strip().lower()
        tokens.append(f"{k}:{norm_val}")
    return "|".join(tokens)


def compute_record_hash(canonical_str: str, algorithm: str = "sha256") -> str:
    """
    Returns cryptographic digest of canonical record string.
    """
    if algorithm == "md5":
        return hashlib.md5(canonical_str.encode('utf-8')).hexdigest()
    return hashlib.sha256(canonical_str.encode('utf-8')).hexdigest()


# =====================================================================
# 3. FELLEGI-SUNTER PROBABILISTIC RECORD LINKAGE
# =====================================================================

@dataclass
class LinkageFieldSpec:
    field_name: str
    metric: str  # 'exact', 'jaro_winkler', 'levenshtein', 'jaccard', 'soundex'
    threshold: float
    m_prob: float  # P(agree | Match)
    u_prob: float  # P(agree | Unmatched)


class FellegiSunterModel:
    """
    Implementation of the classic 1969 Fellegi-Sunter Model for Record Linkage.
    Computes agreement/disagreement log-likelihood ratio weights:
      w_agree = log2( m / u )
      w_disagree = log2( (1 - m) / (1 - u) )
    """
    def __init__(self, specs: List[LinkageFieldSpec], match_threshold: float, review_threshold: float):
        self.specs = specs
        self.match_threshold = match_threshold
        self.review_threshold = review_threshold
        self.weights = {}
        self._calculate_weights()

    def _calculate_weights(self):
        for s in self.specs:
            m = max(min(s.m_prob, 0.999), 0.001)
            u = max(min(s.u_prob, 0.999), 0.001)
            w_agree = math.log2(m / u)
            w_disagree = math.log2((1.0 - m) / (1.0 - u))
            self.weights[s.field_name] = {
                "agree": w_agree,
                "disagree": w_disagree
            }

    def evaluate_pair(self, rec1: Dict[str, Any], rec2: Dict[str, Any]) -> Tuple[float, str, Dict[str, Any]]:
        total_weight = 0.0
        field_diagnostics = {}
        
        for s in self.specs:
            val1 = str(rec1.get(s.field_name, "")).strip().lower()
            val2 = str(rec2.get(s.field_name, "")).strip().lower()
            
            if not val1 or not val2:
                # Missing value in one of the records receives neutral weight 0
                sim_score = 0.0
                agreed = False
                field_weight = 0.0
            else:
                if s.metric == "exact":
                    sim_score = 1.0 if val1 == val2 else 0.0
                elif s.metric == "jaro_winkler":
                    sim_score = jaro_winkler_similarity(val1, val2)
                elif s.metric == "levenshtein":
                    sim_score = levenshtein_similarity(val1, val2)
                elif s.metric == "jaccard":
                    sim_score = ngram_jaccard_similarity(val1, val2, n=2)
                elif s.metric == "soundex":
                    sim_score = 1.0 if soundex(val1) == soundex(val2) else 0.0
                else:
                    sim_score = 1.0 if val1 == val2 else 0.0
                    
                agreed = (sim_score >= s.threshold)
                field_weight = self.weights[s.field_name]["agree"] if agreed else self.weights[s.field_name]["disagree"]
                
            total_weight += field_weight
            field_diagnostics[s.field_name] = {
                "val1": val1,
                "val2": val2,
                "score": round(sim_score, 3),
                "agreed": agreed,
                "weight": round(field_weight, 2)
            }
            
        if total_weight >= self.match_threshold:
            decision = "MATCH"
        elif total_weight >= self.review_threshold:
            decision = "CLERICAL_REVIEW"
        else:
            decision = "NON_MATCH"
            
        return round(total_weight, 2), decision, field_diagnostics


# =====================================================================
# 4. BLOCKING & CANOPY CLUSTERING (AVOIDING O(N^2))
# =====================================================================

class BlockingEngine:
    """
    Partitions records into candidate blocks using one or more blocking keys.
    Prevents quadratic explosion by evaluating pairs only within the same block.
    """
    @staticmethod
    def generate_blocks(records: List[Dict[str, Any]], blocking_key_func) -> Dict[str, List[int]]:
        blocks: Dict[str, List[int]] = {}
        for idx, rec in enumerate(records):
            b_key = blocking_key_func(rec)
            if b_key not in blocks:
                blocks[b_key] = []
            blocks[b_key].append(idx)
        return blocks

    @staticmethod
    def compute_candidate_pairs(blocks: Dict[str, List[int]]) -> Set[Tuple[int, int]]:
        pairs: Set[Tuple[int, int]] = set()
        for b_key, indices in blocks.items():
            if len(indices) < 2:
                continue
            for i in range(len(indices)):
                for j in range(i + 1, len(indices)):
                    idx1 = min(indices[i], indices[j])
                    idx2 = max(indices[i], indices[j])
                    pairs.add((idx1, idx2))
        return pairs


# =====================================================================
# 5. GOLDEN RECORD MASTER SYNTHESIS
# =====================================================================

def synthesize_golden_record(cluster: List[Dict[str, Any]], strategy: str = "most_complete") -> Dict[str, Any]:
    """
    Consolidates a cluster of duplicate records into a single authoritative 'Golden Record'.
    Strategies:
      - 'most_complete': Takes non-null, longest, or highest quality value per attribute.
      - 'recency': Uses record with latest 'updated_at' or 'timestamp'.
      - 'first': Keeps the original first record seen.
    """
    if not cluster:
        return {}
    if len(cluster) == 1 or strategy == "first":
        return dict(cluster[0])
        
    if strategy == "recency":
        sorted_cluster = sorted(cluster, key=lambda x: str(x.get("timestamp", "")), reverse=True)
        return dict(sorted_cluster[0])
        
    # Strategy: 'most_complete'
    all_keys = set()
    for rec in cluster:
        all_keys.update(rec.keys())
        
    golden: Dict[str, Any] = {}
    for key in sorted(all_keys):
        candidates = [rec[key] for rec in cluster if rec.get(key) not in (None, "", "N/A", "null")]
        if not candidates:
            golden[key] = None
        else:
            # Pick longest string or most specific value
            if all(isinstance(c, str) for c in candidates):
                best_val = max(candidates, key=lambda x: len(x.strip()))
            elif all(isinstance(c, (int, float)) for c in candidates):
                best_val = max(candidates)  # or average
            else:
                best_val = candidates[0]
            golden[key] = best_val
            
    golden["_merge_count"] = len(cluster)
    return golden


# =====================================================================
# 6. COMPREHENSIVE INDUSTRIAL BENCHMARK (WEST BENGAL CASE STUDIES)
# =====================================================================

def run_comprehensive_laboratory() -> Dict[str, Any]:
    print("=" * 80)
    print("  ACADEMIC & INDUSTRIAL BENCHMARK: REMOVING DUPLICATE RECORDS")
    print("  Course: BCAC701B | Machine Learning Preprocessing Laboratory")
    print("  Author: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    # -------------------------------------------------------------
    # EXPERIMENT 1: Exact vs Subkey Duplication in Municipal Registry
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 1] EXACT & SUBKEY RECORD DEDUPLICATION (KMC Property Tax) ---")
    
    municipal_raw = [
        {"id": "KMC-01", "owner": "Subhashish Roy", "ward": "085", "pin": "700029", "assessment": 45000, "timestamp": "2026-01-10"},
        {"id": "KMC-02", "owner": "Moumita Sen",     "ward": "093", "pin": "700047", "assessment": 32000, "timestamp": "2026-02-14"},
        # Exact duplicate of KMC-01
        {"id": "KMC-03", "owner": "Subhashish Roy", "ward": "085", "pin": "700029", "assessment": 45000, "timestamp": "2026-01-10"},
        # Subkey duplicate of KMC-02 (same property owner & pin, but updated assessment & newer timestamp)
        {"id": "KMC-04", "owner": "Moumita Sen",     "ward": "093", "pin": "700047", "assessment": 38500, "timestamp": "2026-03-20"},
        {"id": "KMC-05", "owner": "Debangshu Naskar","ward": "101", "pin": "700084", "assessment": 51000, "timestamp": "2026-01-22"},
        # Exact duplicate of KMC-05
        {"id": "KMC-06", "owner": "Debangshu Naskar","ward": "101", "pin": "700084", "assessment": 51000, "timestamp": "2026-01-22"},
    ]

    print(f"Total Raw Input Records: {len(municipal_raw)}")
    
    # 1. Exact Full-Row Hash Deduplication
    seen_hashes: Set[str] = set()
    exact_deduped: List[Dict[str, Any]] = []
    
    for rec in municipal_raw:
        # Exclude synthetic auto-increment ID to evaluate canonical data payload
        canonical_str = canonicalize_record(rec, keys=["owner", "ward", "pin", "assessment", "timestamp"])
        digest = compute_record_hash(canonical_str, algorithm="sha256")
        if digest not in seen_hashes:
            seen_hashes.add(digest)
            exact_deduped.append(rec)
            
    print(f"-> After Exact Full-Row Deduplication (SHA-256): {len(exact_deduped)} records (Removed {len(municipal_raw) - len(exact_deduped)})")
    for r in exact_deduped:
        print(f"   [RETAINED] {r['id']} | {r['owner']} | Ward: {r['ward']} | Tax: Rs {r['assessment']} | Date: {r['timestamp']}")

    # 2. Business Subkey Deduplication (Subkey = ["owner", "pin"])
    subkey_groups: Dict[str, List[Dict[str, Any]]] = {}
    for rec in exact_deduped:
        b_key = f"{rec['owner'].strip().lower()}##{rec['pin']}"
        if b_key not in subkey_groups:
            subkey_groups[b_key] = []
        subkey_groups[b_key].append(rec)
        
    golden_municipal: List[Dict[str, Any]] = []
    for b_key, cluster in subkey_groups.items():
        golden = synthesize_golden_record(cluster, strategy="recency")
        golden_municipal.append(golden)
        
    print(f"-> After Business Subkey Resolution (Strategy='recency'): {len(golden_municipal)} unique legal entities")
    for r in golden_municipal:
        print(f"   [GOLDEN] {r['id']} | {r['owner']} | Ward: {r['ward']} | Tax: Rs {r['assessment']} (Resolved via recency {r['timestamp']})")

    # -------------------------------------------------------------
    # EXPERIMENT 2: Probabilistic Record Linkage & Fuzzy Duplication
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 2] FELLEGI-SUNTER FUZZY LINKAGE (Salt Lake & Barrackpore E-Commerce) ---")
    
    customer_records = [
        {"cid": "C101", "name": "Abhronila Banerjee", "phone": "9830112233", "address": "Block CF, Sector 1, Salt Lake, Kolkata", "pin": "700064"},
        {"cid": "C102", "name": "Abhranila Banerji",  "phone": "9830112233", "address": "CF Block, Saltlake Sec-I",              "pin": "700064"},
        {"cid": "C103", "name": "Debangshu Mukherjee","phone": "9433221100", "address": "45 S.N. Banerjee Road, Barrackpore",    "pin": "700120"},
        {"cid": "C104", "name": "Debangsu Mukhopadhyay","phone":"9433221100","address": "45 SN Banerjee Rd, Barrackpore, Kol",   "pin": "700120"},
        {"cid": "C105", "name": "Susmita Chakraborty","phone": "9831998877", "address": "Station Road, Ichapur, North 24 Pgs",   "pin": "700144"},
        {"cid": "C106", "name": "Mahima Paul",        "phone": "9123456789", "address": "College Street, Kolkata",               "pin": "700073"}
    ]

    linkage_specs = [
        LinkageFieldSpec(field_name="name",    metric="jaro_winkler", threshold=0.82, m_prob=0.92, u_prob=0.03),
        LinkageFieldSpec(field_name="phone",   metric="exact",        threshold=1.00, m_prob=0.98, u_prob=0.001),
        LinkageFieldSpec(field_name="address", metric="jaccard",      threshold=0.35, m_prob=0.85, u_prob=0.05),
        LinkageFieldSpec(field_name="pin",     metric="exact",        threshold=1.00, m_prob=0.95, u_prob=0.02)
    ]

    fs_model = FellegiSunterModel(specs=linkage_specs, match_threshold=10.0, review_threshold=4.0)

    print("Calculated Fellegi-Sunter Attribute Weights:")
    for f, w in fs_model.weights.items():
        print(f"  Field: {f:<10} | w_agree: +{w['agree']:.2f} | w_disagree: {w['disagree']:.2f}")

    # Evaluate all pairs (N = 6, pairs = 15)
    n_rec = len(customer_records)
    total_pairs = n_rec * (n_rec - 1) // 2
    evaluated_pairs = 0
    matches_found = []
    reviews_found = []

    print(f"\nEvaluating Pairwise Record Linkage ({total_pairs} pairs)...")
    for i in range(n_rec):
        for j in range(i + 1, n_rec):
            evaluated_pairs += 1
            r1, r2 = customer_records[i], customer_records[j]
            weight, decision, diag = fs_model.evaluate_pair(r1, r2)
            
            if decision == "MATCH":
                matches_found.append((r1['cid'], r2['cid'], weight, diag))
                print(f"  âœ” [MATCH DETECTED] ({r1['cid']} <-> {r2['cid']}) Total Weight: {weight:+.2f}")
                print(f"     Names: '{r1['name']}' vs '{r2['name']}' (JW: {diag['name']['score']})")
                print(f"     Phone: '{r1['phone']}' vs '{r2['phone']}' (Exact: {diag['phone']['agreed']})")
                print(f"     Addrs: '{r1['address']}' vs '{r2['address']}' (Jaccard: {diag['address']['score']})")
            elif decision == "CLERICAL_REVIEW":
                reviews_found.append((r1['cid'], r2['cid'], weight, diag))
                print(f"  âš  [CLERICAL REVIEW] ({r1['cid']} <-> {r2['cid']}) Weight: {weight:+.2f}")

    # -------------------------------------------------------------
    # EXPERIMENT 3: Scalability & Blocking Reduction Ratio
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 3] BLOCKING PERFORMANCE & REDUCTION RATIO BENCHMARK ---")
    
    # Synthesize scaled dataset of 2,000 records across 20 PIN codes
    simulated_dataset: List[Dict[str, Any]] = []
    districts = ["Barrackpore", "Salt Lake", "Kolkata", "Howrah", "Ichapur", "Barasat", "Dum Dum", "Kalyani"]
    pin_codes = [f"700{i:03d}" for i in range(1, 21)]
    
    random_seed = 42
    # Simple deterministic pseudorandom generator for zero dependencies
    def pseudo_rand(val: int) -> int:
        return (val * 1103515245 + 12345) & 0x7FFFFFFF

    curr = random_seed
    for idx in range(2000):
        curr = pseudo_rand(curr)
        pin_idx = curr % len(pin_codes)
        curr = pseudo_rand(curr)
        dist_idx = curr % len(districts)
        
        simulated_dataset.append({
            "idx": idx,
            "pin": pin_codes[pin_idx],
            "district": districts[dist_idx],
            "first_letter": chr(65 + (curr % 26))
        })

    total_synthetic = len(simulated_dataset)
    naive_comparisons = total_synthetic * (total_synthetic - 1) // 2
    
    # 1. Blocking by PIN Code
    pin_blocks = BlockingEngine.generate_blocks(simulated_dataset, lambda r: r["pin"])
    candidate_pairs_pin = BlockingEngine.compute_candidate_pairs(pin_blocks)
    
    reduction_ratio_pin = (1.0 - (len(candidate_pairs_pin) / naive_comparisons)) * 100.0
    
    print(f"Synthetic Records: {total_synthetic:,}")
    print(f"Naive All-Pairs Comparisons O(N^2): {naive_comparisons:,} pairs")
    print(f"PIN Code Blocking Candidate Pairs: {len(candidate_pairs_pin):,} pairs across {len(pin_blocks)} blocks")
    print(f"Reduction Ratio (RR): {reduction_ratio_pin:.2f}% comparisons eliminated!")
    
    # 2. Multi-key Compound Blocking: (PIN Code + First Letter of Name)
    compound_blocks = BlockingEngine.generate_blocks(
        simulated_dataset,
        lambda r: f"{r['pin']}_{r['first_letter']}"
    )
    candidate_pairs_compound = BlockingEngine.compute_candidate_pairs(compound_blocks)
    reduction_ratio_compound = (1.0 - (len(candidate_pairs_compound) / naive_comparisons)) * 100.0
    
    print(f"Compound Blocking (PIN + Initial): {len(candidate_pairs_compound):,} pairs across {len(compound_blocks)} blocks")
    print(f"Reduction Ratio (RR): {reduction_ratio_compound:.2f}% comparisons eliminated!")

    # -------------------------------------------------------------
    # EXPERIMENT 4: Impact of Duplicate Leakage on ML Generalization
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 4] MATHEMATICAL PROOF: DATA LEAKAGE FROM UNCLEAN DUPLICATES ---")
    print("Scenario: A 100-sample dataset contains 20% duplicate records.")
    print("When train_test_split is performed WITHOUT prior deduplication:")
    
    n_samples = 100
    n_dupes = 20
    p_train = 0.8
    p_test = 0.2
    
    # Probability that at least one duplicate pair splits across train and test:
    # 1 - (p_train^2 + p_test^2)^n_dupes
    p_both_train = p_train * p_train
    p_both_test = p_test * p_test
    p_split = 2.0 * p_train * p_test  # 2 * 0.8 * 0.2 = 0.32 per duplicate pair
    p_any_leak = 1.0 - ((p_both_train + p_both_test) ** n_dupes)
    
    expected_leaked_pairs = n_dupes * p_split
    
    print(f"Duplicate pairs in dataset: {n_dupes}")
    print(f"Probability of cross-split contamination per duplicate pair: {p_split * 100:.1f}%")
    print(f"Expected number of leaked duplicate pairs into test set: {expected_leaked_pairs:.1f}")
    print(f"Probability that test set is mathematically contaminated: {p_any_leak * 100:.4f}%")
    print("Conclusion: Deduplication MUST strictly precede train/test partition to maintain validity.")

    print("\n" + "=" * 80)
    print("  LABORATORY EXECUTION COMPLETE: ALL 4 EXPERIMENTS CONVERGED SUCCESSFULLY")
    print("=" * 80)

    return {
        "status": "SUCCESS",
        "exact_deduplicated_count": len(exact_deduped),
        "golden_record_count": len(golden_municipal),
        "fuzzy_matches_found": len(matches_found),
        "reduction_ratio_pin": round(reduction_ratio_pin, 2),
        "reduction_ratio_compound": round(reduction_ratio_compound, 2),
        "leakage_probability": round(p_any_leak, 4)
    }

if __name__ == "__main__":
    run_comprehensive_laboratory()
