import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic10_files/removing_duplicate_records_lab.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

// =============================================================================
// DATASET BENCHMARK: SALT LAKE SECTOR V QUICK-COMMERCE CUSTOMER ROSTER
// =============================================================================

const RAW_CUSTOMERS = [
  {
    id: "C101",
    name: "Abhronila Banerjee",
    phone: "9830112233",
    address: "Block CF, Sector 1, Salt Lake, Kolkata",
    pin: "700064",
    orders: 14,
    balance: 450.0,
    timestamp: "2026-02-10",
    entity: "Abhronila Banerjee",
    type: "original"
  },
  {
    id: "C102",
    name: "Abhronila Banerjee",
    phone: "9830112233",
    address: "Block CF, Sector 1, Salt Lake, Kolkata",
    pin: "700064",
    orders: 14,
    balance: 450.0,
    timestamp: "2026-02-10",
    entity: "Abhronila Banerjee",
    type: "exact_duplicate" // Identical payload to C101
  },
  {
    id: "C103",
    name: "Abhranila Banerji",
    phone: "9830112233",
    address: "CF Block, Saltlake Sec-I",
    pin: "700064",
    orders: 2,
    balance: 0.0,
    timestamp: "2026-03-01",
    entity: "Abhronila Banerjee",
    type: "fuzzy_duplicate" // Same phone, typo in name & abbreviated address
  },
  {
    id: "C104",
    name: "Debangshu Mukherjee",
    phone: "9433221100",
    address: "45 S.N. Banerjee Road, Barrackpore",
    pin: "700120",
    orders: 8,
    balance: 120.0,
    timestamp: "2026-01-15",
    entity: "Debangshu Mukherjee",
    type: "original"
  },
  {
    id: "C105",
    name: "Debangsu Mukhopadhyay",
    phone: "9433221100",
    address: "45 SN Banerjee Rd, Barrackpore",
    pin: "700120",
    orders: 5,
    balance: 230.0,
    timestamp: "2026-02-28",
    entity: "Debangshu Mukherjee",
    type: "fuzzy_duplicate" // Bengali surname variant Mukhopadhyay/Mukherjee
  },
  {
    id: "C106",
    name: "Susmita Chakraborty",
    phone: "9831998877",
    address: "Station Road, Ichapur, North 24 Pgs",
    pin: "700144",
    orders: 19,
    balance: 890.0,
    timestamp: "2026-03-12",
    entity: "Susmita Chakraborty",
    type: "original"
  },
  {
    id: "C107",
    name: "Susmita Chakraborty",
    phone: "9831998877",
    address: "Station Road, Ichapur, North 24 Pgs",
    pin: "700144",
    orders: 19,
    balance: 890.0,
    timestamp: "2026-03-12",
    entity: "Susmita Chakraborty",
    type: "exact_duplicate" // Exact retry duplicate of C106
  },
  {
    id: "C108",
    name: "Mahima Paul",
    phone: "9123456789",
    address: "College Street, Kolkata",
    pin: "700073",
    orders: 31,
    balance: 1540.0,
    timestamp: "2026-03-14",
    entity: "Mahima Paul",
    type: "original"
  }
];

// Pre-synthesized Golden Master records
const GOLDEN_CUSTOMERS = [
  {
    id: "GOLD-01",
    name: "Abhronila Banerjee",
    phone: "9830112233",
    address: "Block CF, Sector 1, Salt Lake, Kolkata",
    pin: "700064",
    orders: 16, // Sum of 14 + 2
    balance: 450.0,
    timestamp: "2026-03-01", // Latest timestamp
    sourceCluster: ["C101", "C102", "C103"]
  },
  {
    id: "GOLD-02",
    name: "Debangshu Mukherjee",
    phone: "9433221100",
    address: "45 S.N. Banerjee Road, Barrackpore",
    pin: "700120",
    orders: 13, // Sum of 8 + 5
    balance: 350.0, // Consolidated balance
    timestamp: "2026-02-28",
    sourceCluster: ["C104", "C105"]
  },
  {
    id: "GOLD-03",
    name: "Susmita Chakraborty",
    phone: "9831998877",
    address: "Station Road, Ichapur, North 24 Pgs",
    pin: "700144",
    orders: 19,
    balance: 890.0,
    timestamp: "2026-03-12",
    sourceCluster: ["C106", "C107"]
  },
  {
    id: "GOLD-04",
    name: "Mahima Paul",
    phone: "9123456789",
    address: "College Street, Kolkata",
    pin: "700073",
    orders: 31,
    balance: 1540.0,
    timestamp: "2026-03-14",
    sourceCluster: ["C108"]
  }
];

// =============================================================================
// JARGON & TAXONOMY DATA
// =============================================================================

const JARGON_TERMS = [
  {
    term: "Exact Duplicate",
    tag: "Byte Equality",
    desc: "A record whose attributes are byte-for-byte identical to another across all columns. Detected in O(N) using cryptographic hash digests (MD5/SHA-256)."
  },
  {
    term: "Business Subkey Duplicate",
    tag: "Domain Model",
    desc: "Records that share identical primary domain identifiers (e.g. Aadhaar, Voter ID, Phone + PIN) but carry mutating timestamps, balances, or status codes."
  },
  {
    term: "Fuzzy / Syntactic Duplicate",
    tag: "Probabilistic Linkage",
    desc: "Records representing the same physical entity that differ due to spelling typos, abbreviations, name inversion, or optical character recognition (OCR) errors."
  },
  {
    term: "Fellegi-Sunter Model",
    tag: "Decision Theory",
    desc: "The 1969 mathematical foundation of probabilistic record linkage using log-likelihood ratio weights to classify pairs into Match, Clerical Review, or Non-Match."
  },
  {
    term: "Levenshtein Distance",
    tag: "Topological Metric",
    desc: "The minimum count of single-character insertions, deletions, and substitutions required to morph one string into another via Wagner-Fischer Dynamic Programming."
  },
  {
    term: "Jaro-Winkler Metric",
    tag: "Name Matching",
    desc: "A metric tailored for personal names that combines character matching and transposition penalties with an upward bonus for common initial prefixes (up to 4 chars)."
  },
  {
    term: "Blocking & Canopies",
    tag: "Indexing Scalability",
    desc: "Partitioning records into candidate blocks using coarse keys (e.g. Postal PIN Code or Soundex) to avoid quadratic O(N^2) pairwise comparison explosion."
  },
  {
    term: "Reduction Ratio (RR)",
    tag: "Scalability Metric",
    desc: "The percentage of quadratic comparisons pruned by blocking: RR = 1 - (Candidate Pairs / [N*(N-1)/2]). Production targets exceed 98%."
  },
  {
    term: "Pairs Completeness (Recall)",
    tag: "Recall Metric",
    desc: "The proportion of true duplicate pairs captured within the candidate blocks. A high Reduction Ratio must never compromise Pairs Completeness."
  },
  {
    term: "Golden Master Record",
    tag: "Single Source of Truth",
    desc: "The authoritative synthetic composite record assembled by null-coalescence, recency resolution, and attribute union across a duplicate entity cluster."
  },
  {
    term: "Data Leakage Contamination",
    tag: "ML Pathology",
    desc: "When duplicates split across train and test sets, allowing models to memorize training instances, producing artificial 99% test accuracy that collapses in production."
  },
  {
    term: "Locality-Sensitive Hashing (LSH)",
    tag: "Sub-Quadratic Scale",
    desc: "An algorithmic family of hash functions (e.g. MinHash) where similar records collide in the same hash buckets with high probability, reducing complexity to O(N^1.2)."
  }
];

// =============================================================================
// ALGORITHMIC COMPARATOR HELPER FUNCTIONS (PURE JS FROM FIRST PRINCIPLES)
// =============================================================================

function computeLevenshtein(s1, s2) {
  const a = s1.trim().toLowerCase();
  const b = s2.trim().toLowerCase();
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

function computeJaro(s1, s2) {
  const a = s1.trim().toLowerCase();
  const b = s2.trim().toLowerCase();
  const len1 = a.length;
  const len2 = b.length;
  if (len1 === 0 && len2 === 0) return 1.0;
  if (len1 === 0 || len2 === 0) return 0.0;

  const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;
  const aMatches = new Array(len1).fill(false);
  const bMatches = new Array(len2).fill(false);

  let matches = 0;
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, len2);
    for (let j = start; j < end; j++) {
      if (!bMatches[j] && a[i] === b[j]) {
        aMatches[i] = true;
        bMatches[j] = true;
        matches++;
        break;
      }
    }
  }

  if (matches === 0) return 0.0;

  let k = 0;
  let transpositions = 0;
  for (let i = 0; i < len1; i++) {
    if (aMatches[i]) {
      while (!bMatches[k]) k++;
      if (a[i] !== b[k]) transpositions++;
      k++;
    }
  }

  const halfTranspositions = transpositions / 2;
  return (
    (matches / len1 + matches / len2 + (matches - halfTranspositions) / matches) / 3.0
  );
}

function computeJaroWinkler(s1, s2) {
  const jaro = computeJaro(s1, s2);
  if (jaro < 0.7) return jaro;

  const a = s1.trim().toLowerCase();
  const b = s2.trim().toLowerCase();
  let prefix = 0;
  const maxPrefix = Math.min(4, Math.min(a.length, b.length));
  for (let i = 0; i < maxPrefix; i++) {
    if (a[i] === b[i]) prefix++;
    else break;
  }
  return jaro + prefix * 0.1 * (1.0 - jaro);
}

function computeBigramJaccard(s1, s2) {
  const getBigrams = (str) => {
    const clean = `#${str.trim().toLowerCase()}#`;
    const set = new Set();
    for (let i = 0; i < clean.length - 1; i++) {
      set.add(clean.substring(i, i + 2));
    }
    return set;
  };

  const setA = getBigrams(s1);
  const setB = getBigrams(s2);
  if (setA.size === 0 && setB.size === 0) return 1.0;
  if (setA.size === 0 || setB.size === 0) return 0.0;

  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union > 0 ? intersection / union : 0.0;
}

function computeSoundex(text) {
  if (!text) return "0000";
  const clean = text.replace(/[^A-Za-z]/g, "").toUpperCase();
  if (!clean) return "0000";

  const firstLetter = clean[0];
  const mapping = {
    B: "1", F: "1", P: "1", V: "1",
    C: "2", G: "2", J: "2", K: "2", Q: "2", S: "2", X: "2", Z: "2",
    D: "3", T: "3",
    L: "4",
    M: "5", N: "5",
    R: "6"
  };

  const digits = [firstLetter];
  let prevCode = mapping[firstLetter] || "0";

  for (let i = 1; i < clean.length; i++) {
    const code = mapping[clean[i]] || "0";
    if (code !== "0") {
      if (code !== prevCode) {
        digits.push(code);
      }
      prevCode = code;
    } else {
      prevCode = "0";
    }
  }

  const res = digits.slice(0, 4).join("");
  return res.padEnd(4, "0");
}

// Preset string comparator pairs
const PRESET_STRING_PAIRS = [
  {
    name: "Bengali Surname Variant",
    str1: "Debangshu Mukherjee",
    str2: "Debangsu Mukhopadhyay",
    context: "Same person; phonetic and linguistic transliteration variance."
  },
  {
    name: "Spelling Typo in Name",
    str1: "Abhronila Banerjee",
    str2: "Abhranila Banerji",
    context: "Minor vowel typo ('o' vs 'a') and standard suffix clipping ('ee' vs 'i')."
  },
  {
    name: "Kolkata Address & Pin Abbreviation",
    str1: "Park Street, Kolkata",
    str2: "Park St, Kol-16",
    context: "Common street abbreviation and municipal postal zone clipping."
  },
  {
    name: "Suburban Railway Station Name",
    str1: "Barrackpore Station",
    str2: "Barrackpur Stn",
    context: "Colonial British spelling vs contemporary phonetic Hindi/Bengali transliteration."
  },
  {
    name: "Entirely Distinct Entities",
    str1: "Susmita Chakraborty",
    str2: "Mahima Paul",
    context: "Unrelated individuals; must strictly yield Non-Match."
  }
];

// =============================================================================
// DIAGNOSTIC SCENARIO QUIZ
// =============================================================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: "scen-1",
    scenario: "Municipal Tax Ledger Contamination",
    question: "Kolkata Municipal Corporation (KMC) discovers 40,000 property assessment rows where owner names, ward numbers, and property tax amounts are completely identical, but the `entry_id` column contains unique UUIDs. A junior engineer runs `df.drop_duplicates()`. What happens?",
    options: [
      "All 40,000 duplicate rows are immediately purged from the database.",
      "ZERO rows are dropped because the unique `entry_id` makes every single row technically unique in full-column comparison.",
      "Pandas raises a fatal KeyError on UUID columns.",
      "The database automatically detects the business key and keeps the latest entry."
    ],
    correctIndex: 1,
    rationale: "Default `df.drop_duplicates()` evaluates all columns. Because `entry_id` contains a unique UUID on each row, no two rows evaluate as identical. The engineer must explicitly specify `subset=['owner_name', 'ward_no', 'tax_amount']`.",
    mentorTip: "Sukanta Hui's Law: Never trust default `drop_duplicates()` on production tables with surrogate keys!"
  },
  {
    id: "scen-2",
    scenario: "Cross-Validation Data Leakage",
    question: "You have a dataset with 1,000 transactions containing 100 identical duplicate pairs. You run 5-fold cross-validation without deduplication and achieve 98.4% ROC-AUC. When deployed to production, AUC plummets to 64.2%. What mathematical failure occurred?",
    options: [
      "The learning rate was set too high during stochastic gradient descent.",
      "Data Leakage across CV folds: For 80% of duplicate pairs, one instance landed in the training fold and the twin landed in the validation fold, enabling the model to trivially memorize labels.",
      "The dataset suffered from multicollinearity between independent numerical features.",
      "The GPU experienced floating-point underflow on cross-entropy calculations."
    ],
    correctIndex: 1,
    rationale: "With random splitting, there is a 32% to 80% probability that duplicate pairs land across training and validation folds. The model memorizes exact feature-label pairs, giving an illusory 98% benchmark that fails on unseen real production distributions.",
    mentorTip: "Always execute deduplication as the FIRST step before any train_test_split or K-Fold partitioning!"
  },
  {
    id: "scen-3",
    scenario: "Quadratic Scalability Wall",
    question: "A quick-commerce startup in Salt Lake Sector V expands from 10,000 customers to 1,000,000 customers. Their overnight pairwise deduplication script (evaluating Jaro-Winkler similarity) previously took 1 minute. How long will it take now if naive all-pairs comparison is used?",
    options: [
      "100 minutes (~1.6 hours).",
      "10,000 minutes (~6.9 days) because complexity scales quadratically: (1,000,000 / 10,000)^2 = 10,000x longer!",
      "The time remains 1 minute because Python runs in parallel.",
      "1,000 minutes (~16.6 hours)."
    ],
    correctIndex: 1,
    rationale: "Naive pairwise comparison is O(N^2). Increasing N by 100x multiplies the operations by 100^2 = 10,000x. A 1-minute runtime explodes to 10,000 minutes (~7 days)! Blocking by Postal PIN code or Soundex is mandatory to reduce complexity.",
    mentorTip: "When N exceeds 50,000, naive O(N^2) pairwise comparisons are computationally suicidal. Implement blocking immediately."
  },
  {
    id: "scen-4",
    scenario: "Golden Master Conflict Resolution",
    question: "In a duplicate customer cluster, Customer Record 1 has {Phone: '9830112233', Address: 'Salt Lake', Email: null, Balance: 400} and Customer Record 2 has {Phone: '9830112233', Address: null, Email: 'ab@kol.in', Balance: 400}. Using `keep='first'` will permanently destroy which critical data?",
    options: [
      "The Phone number.",
      "The Email address ('ab@kol.in') will be permanently erased because Record 1 had null for that attribute.",
      "The Balance amount.",
      "None; pandas automatically creates a backup."
    ],
    correctIndex: 1,
    rationale: "Simple row dropping with `keep='first'` discards Record 2 entirely, throwing away valid data that was missing in Record 1. The proper architecture is 'Golden Master Null-Coalescence' which merges non-null fields across cluster members.",
    mentorTip: "Deduplication is not just deletion; in enterprise systems, it is Entity Resolution and Golden Record synthesis."
  },
  {
    id: "scen-5",
    scenario: "Phonetic vs Orthographic Linkage",
    question: "Why does standard Levenshtein distance give a poor similarity score for 'Banerjee' vs 'Bandopadhyay' despite them referring to the exact same Bengali caste/surname?",
    options: [
      "Because Levenshtein distance only operates on English words.",
      "Because Levenshtein measures character-level syntactic edit distance, whereas 'Banerjee' and 'Bandopadhyay' are etymological cognates with completely different spelling orthography, requiring domain synonym dictionaries.",
      "Because 'Bandopadhyay' contains more than 10 characters.",
      "Because dynamic programming algorithms crash on non-Latin vowels."
    ],
    correctIndex: 1,
    rationale: "Pure string distance metrics (Levenshtein, Jaro) only evaluate character sequence edits. They possess zero cultural or ontological knowledge. When names undergo profound linguistic shifts (e.g. Mukhopadhyay <-> Mukherjee), domain alias tables or phonetic dictionaries are required.",
    mentorTip: "Combine metric string distances with regional alias tables when engineering datasets for West Bengal institutions."
  }
];

// =============================================================================
// MAIN COMPONENT: TOPIC 10
// =============================================================================

const Topic10 = () => {
  // Navigation & Interactive Studio State
  const [activeTab, setActiveTab] = useState("studio"); // 'studio', 'math', 'cases', 'pitfalls', 'notes'
  const [studioMode, setStudioMode] = useState("roster"); // 'roster', 'comparator', 'blocking'
  const [rosterView, setRosterView] = useState("raw"); // 'raw', 'exact', 'fuzzy', 'golden'
  
  // String Comparator State
  const [compStr1, setCompStr1] = useState("Debangshu Mukherjee");
  const [compStr2, setCompStr2] = useState("Debangsu Mukhopadhyay");
  const [fsThreshold, setFsThreshold] = useState(12.0);

  // Scalability / Blocking Sandbox State
  const [datasetSize, setDatasetSize] = useState(50000);
  const [blockingStrategy, setBlockingStrategy] = useState("pin"); // 'none', 'pin', 'compound'

  // Jargon search filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const svgId = useId();

  // ---------------------------------------------------------------------------
  // REACTIVE COMPUTATIONS: STRING COMPARATOR
  // ---------------------------------------------------------------------------
  const stringMetrics = useMemo(() => {
    const levDist = computeLevenshtein(compStr1, compStr2);
    const maxLen = Math.max(compStr1.trim().length, compStr2.trim().length);
    const levSim = maxLen > 0 ? Math.max(0, 1.0 - levDist / maxLen) : 1.0;
    const jaro = computeJaro(compStr1, compStr2);
    const jw = computeJaroWinkler(compStr1, compStr2);
    const jaccard = computeBigramJaccard(compStr1, compStr2);
    const s1Soundex = computeSoundex(compStr1);
    const s2Soundex = computeSoundex(compStr2);
    const soundexMatch = s1Soundex === s2Soundex;

    // Fellegi-Sunter mock log-likelihood weight:
    // Name similarity + Soundex bonus
    let weight = 0.0;
    if (jw >= 0.85) weight += 6.5;
    else if (jw >= 0.70) weight += 2.0;
    else weight -= 4.0;

    if (soundexMatch) weight += 5.0;
    else weight -= 2.0;

    if (jaccard >= 0.40) weight += 4.0;
    else weight -= 1.5;

    let decision = "NON_MATCH";
    if (weight >= fsThreshold) decision = "MATCH";
    else if (weight >= fsThreshold - 6.0) decision = "CLERICAL_REVIEW";

    return {
      levDist,
      levSim: (levSim * 100).toFixed(1),
      jaro: (jaro * 100).toFixed(1),
      jw: (jw * 100).toFixed(1),
      jaccard: (jaccard * 100).toFixed(1),
      s1Soundex,
      s2Soundex,
      soundexMatch,
      weight: weight.toFixed(2),
      decision
    };
  }, [compStr1, compStr2, fsThreshold]);

  // ---------------------------------------------------------------------------
  // REACTIVE COMPUTATIONS: BLOCKING SANDBOX
  // ---------------------------------------------------------------------------
  const blockingMetrics = useMemo(() => {
    const N = datasetSize;
    const naivePairs = (N * (N - 1)) / 2;
    let candidatePairs = naivePairs;
    let blocksCount = 1;

    if (blockingStrategy === "pin") {
      blocksCount = 20; // 20 typical Kolkata & North 24 Pgs postal zones
      const avgPerBlock = N / blocksCount;
      candidatePairs = blocksCount * ((avgPerBlock * (avgPerBlock - 1)) / 2);
    } else if (blockingStrategy === "compound") {
      blocksCount = 130; // 20 PIN codes x ~6.5 initial letter partitions
      const avgPerBlock = N / blocksCount;
      candidatePairs = blocksCount * ((avgPerBlock * (avgPerBlock - 1)) / 2);
    }

    const reductionRatio = ((1.0 - candidatePairs / naivePairs) * 100).toFixed(2);
    // Estimated time assuming 1,000,000 comparisons/sec in Python
    const opsPerSec = 1000000;
    const timeSec = candidatePairs / opsPerSec;
    let timeFormatted = "";
    if (timeSec < 1.0) timeFormatted = `${(timeSec * 1000).toFixed(0)} ms`;
    else if (timeSec < 60) timeFormatted = `${timeSec.toFixed(1)} seconds`;
    else if (timeSec < 3600) timeFormatted = `${(timeSec / 60).toFixed(1)} minutes`;
    else timeFormatted = `${(timeSec / 3600).toFixed(1)} hours`;

    return {
      naivePairs: naivePairs.toLocaleString(),
      candidatePairs: Math.round(candidatePairs).toLocaleString(),
      blocksCount,
      reductionRatio,
      timeFormatted
    };
  }, [datasetSize, blockingStrategy]);

  // ---------------------------------------------------------------------------
  // REACTIVE COMPUTATIONS: JARGON FILTER
  // ---------------------------------------------------------------------------
  const filteredJargon = useMemo(() => {
    return JARGON_TERMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "ALL" || item.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const uniqueTags = useMemo(() => {
    const set = new Set(JARGON_TERMS.map((j) => j.tag));
    return ["ALL", ...Array.from(set)];
  }, []);

  // ---------------------------------------------------------------------------
  // QUIZ HANDLERS
  // ---------------------------------------------------------------------------
  const handleSelectOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const quizScore = useMemo(() => {
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score++;
    });
    return score;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-7xl mx-auto pb-20 font-sans">
      {/* =====================================================================
          HERO BANNER & ACADEMIC HEADER
          ===================================================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full shadow-inner">
              BCAC701B • Data Types and Preprocessing • Topic 10
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Production Entity Resolution
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              MAKAUT & Gate CS Aligned
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Removing Duplicate Records & Entity Resolution
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Master the mathematics and systems engineering of data deduplication: from exact byte-level
            cryptographic hashing (MD5/SHA-256) to the probabilistic <strong>Fellegi-Sunter model</strong>,
            topological edit distance metrics (Levenshtein, Jaro-Winkler), sub-quadratic{" "}
            <strong>O(N²) blocking architectures</strong>, and Golden Master record synthesis across real-world
            West Bengal municipal and e-commerce platforms.
          </p>

          {/* STICKY-READY NAVIGATION JUMP BAR */}
          <div className="pt-4 border-t border-indigo-800/30">
            <nav className="flex flex-wrap gap-2 text-xs sm:text-sm font-medium">
              {[
                { id: "#novice-metaphors", label: "1. Novice Masterclass" },
                { id: "#taxonomy-flow", label: "2. Duplication Taxonomy" },
                { id: "#interactive-studio", label: "3. Deduplication Studio" },
                { id: "#math-formulation", label: "4. Mathematical Theorems" },
                { id: "#blocking-engine", label: "5. O(N²) Scalability & Blocking" },
                { id: "#case-studies", label: "6. Regional Case Studies" },
                { id: "#diagnostic-quiz", label: "7. Diagnostic Assessment" },
                { id: "#production-pitfalls", label: "8. Engineering Pitfalls" },
                { id: "#practical-workbench", label: "9. Practical Workbench" }
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700/60 transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 1: NOVICE MASTERCLASS (METAPHORS & JARGON BUSTER)
          ===================================================================== */}
      <section id="novice-metaphors" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            1. Novice Masterclass: Core Intuition & Jargon Buster
          </h2>
        </div>

        {/* METAPHORS CAROUSEL / GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-indigo-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              🖨️
            </div>
            <h3 className="text-lg font-bold text-indigo-200">The Xerox Copy Trap</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Imagine an election ballot box where an elector photocopies their voting slip 20 times.
              In machine learning, duplicate training rows act exactly like counterfeit voting slips: they
              artificially amplify empirical gradient updates, forcing the model to over-optimize for identical
              repeated instances.
            </p>
            <div className="text-xs text-indigo-400 font-mono bg-indigo-950/60 p-2.5 rounded-lg border border-indigo-800/40">
              Analogy: Exact Duplicate = Stacking identical weights on one side of a balance scale.
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              🛂
            </div>
            <h3 className="text-lg font-bold text-cyan-200">The Dual Passport Mystery</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A citizen holds a voter card registered as <em>"Abhronila Banerjee"</em> and a tax card registered
              as <em>"Abhranila Banerji"</em>. While byte comparison fails to match them, both represent the exact
              same human being. Fuzzy deduplication uses metric distances to resolve multiple records to a single
              underlying identity.
            </p>
            <div className="text-xs text-cyan-400 font-mono bg-cyan-950/60 p-2.5 rounded-lg border border-cyan-800/40">
              Analogy: Fuzzy Linkage = Detecting that Clark Kent and Superman are the same person.
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              📮
            </div>
            <h3 className="text-lg font-bold text-emerald-200">The Sorting Post Office</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If a postman compared every letter in West Bengal against every other letter, delivery would take centuries!
              Instead, letters are first routed by <strong>PIN Code (700064)</strong>. Comparing only within the same
              ward or PIN block eliminates 99% of comparisons — this is the mathematical magic of <strong>Blocking</strong>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/40">
              Analogy: Blocking = Partitioning letters into postal bags before street-level matching.
            </div>
          </div>
        </div>

        {/* SEARCHABLE JARGON BUSTER */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📚</span> Searchable Jargon Buster (12 Core Terms)
              </h3>
              <p className="text-xs text-slate-400">
                Filter by topic tag or search any data deduplication and entity resolution term.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search term or definition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-sm px-3.5 py-1.5 rounded-lg text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          {/* TAG PILLS */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={clsx(
                  "px-3 py-1 text-xs rounded-full font-semibold transition-colors duration-150",
                  selectedTag === tag
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* JARGON CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredJargon.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-colors duration-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-indigo-300">{item.term}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: DUPLICATION TAXONOMY & DECISION MATRIX
          ===================================================================== */}
      <section id="taxonomy-flow" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-cyan-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            2. The 4-Tier Duplication Taxonomy & Architectural Decision Matrix
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl bg-slate-900/90">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950 text-slate-300 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Duplication Category</th>
                <th className="p-4">Mathematical Condition</th>
                <th className="p-4">Detection Engine</th>
                <th className="p-4">Complexity</th>
                <th className="p-4">ML Risk Severity</th>
                <th className="p-4">Canonical Remedy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-indigo-300">
                  Tier 1: Exact Duplicates
                  <div className="text-xs text-slate-400 font-normal">Bitwise identical across all columns</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  r_i[k] == r_j[k] ∀ k ∈ [1..D]
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-xs">
                    SHA-256 / MD5 Hash Map
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-emerald-400">O(N) Average</td>
                <td className="p-4">
                  <span className="text-red-400 font-semibold">Critical</span> (Data Leakage & Gradient Skew)
                </td>
                <td className="p-4 text-xs">
                  <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">df.drop_duplicates()</code>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-cyan-300">
                  Tier 2: Business Subkey Duplicates
                  <div className="text-xs text-slate-400 font-normal">Identical primary key, varying timestamps</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  Key(r_i) == Key(r_j) ∧ r_i.ts ≠ r_j.ts
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs">
                    SQL GROUP BY / Subkey Map
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-emerald-400">O(N) Hash Partition</td>
                <td className="p-4">
                  <span className="text-amber-400 font-semibold">High</span> (Stale State Distortion)
                </td>
                <td className="p-4 text-xs">
                  <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">keep='last'</code> or Recency Max
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-emerald-300">
                  Tier 3: Fuzzy / Syntactic Duplicates
                  <div className="text-xs text-slate-400 font-normal">Spelling typos, OCR errors, abbreviations</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  Sim(r_i.name, r_j.name) ≥ τ
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-xs">
                    Fellegi-Sunter + Jaro-Winkler
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-red-400">O(N²) Naive / O(B·K²) Blocked</td>
                <td className="p-4">
                  <span className="text-amber-400 font-semibold">High</span> (Entity Fragmentation)
                </td>
                <td className="p-4 text-xs">
                  Probabilistic Linkage & Clerical Review
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-purple-300">
                  Tier 4: Semantic Duplicates
                  <div className="text-xs text-slate-400 font-normal">Conceptual identity across synonyms</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  Cosine(e_i, e_j) ≥ 0.90
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono text-xs">
                    Transformer Embeddings + HNSW
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-amber-400">O(N log N) Approximate</td>
                <td className="p-4">
                  <span className="text-blue-400 font-semibold">Moderate</span> (Sparse Representation)
                </td>
                <td className="p-4 text-xs">
                  Vector KNN Cluster Merge
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: INTERACTIVE DEDUPLICATION STUDIO (3 DYNAMIC MODES)
          ===================================================================== */}
      <section id="interactive-studio" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                3. Interactive Deduplication Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Switch between the live Sector V customer arena, algorithmic metric comparator, and O(N²) blocking sandbox.
              </p>
            </div>
          </div>

          {/* STUDIO MODE TABS */}
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {[
              { id: "roster", label: "Mode A: Customer Arena" },
              { id: "comparator", label: "Mode B: Metric Comparator" },
              { id: "blocking", label: "Mode C: O(N²) Blocking Sandbox" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStudioMode(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all duration-150",
                  studioMode === tab.id
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------------
            MODE A: LIVE CUSTOMER ROSTER BENCHMARK ARENA
            ------------------------------------------------------------------- */}
        {studioMode === "roster" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏢</span> Salt Lake Sector V Quick-Commerce Entity Resolution
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect how identical network retries, fuzzy name typos, and address variants distort analytics.
                </p>
              </div>

              {/* RESOLUTION STRATEGY TOGGLE */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "raw", label: "1. Raw Telemetry (Dirty)" },
                  { id: "exact", label: "2. Exact Hash Dedup (SHA-256)" },
                  { id: "fuzzy", label: "3. Fuzzy Linkage (JW ≥ 0.85)" },
                  { id: "golden", label: "4. Golden Master Synthesis" }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setRosterView(btn.id)}
                    className={clsx(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 border",
                      rosterView === btn.id
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-indigo-500/50"
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC METRICS DASHBOARD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Records</span>
                <span className="text-2xl font-extrabold text-white">
                  {rosterView === "raw" ? "8 Rows" : rosterView === "exact" ? "6 Rows" : "4 Unique Entities"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {rosterView === "raw" ? "Contains 4 duplicate entries" : rosterView === "exact" ? "2 exact duplicates dropped" : "100% entity consolidation"}
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Data Redundancy</span>
                <span className={clsx(
                  "text-2xl font-extrabold",
                  rosterView === "raw" ? "text-red-400" : rosterView === "exact" ? "text-amber-400" : "text-emerald-400"
                )}>
                  {rosterView === "raw" ? "50.0% Dirty" : rosterView === "exact" ? "25.0% Residual" : "0.0% Pristine"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {rosterView === "golden" ? "Golden Master achieved" : "Storage footprint bloated"}
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Leakage Risk Index</span>
                <span className={clsx(
                  "text-2xl font-extrabold",
                  rosterView === "raw" ? "text-red-400" : rosterView === "exact" ? "text-amber-400" : "text-emerald-400"
                )}>
                  {rosterView === "raw" ? "99.9% Critical" : rosterView === "exact" ? "48.0% Moderate" : "0.0% Zero Leakage"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Train/Test split contamination
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Order Revenue Accuracy</span>
                <span className="text-2xl font-extrabold text-cyan-400">
                  {rosterView === "raw" ? "₹ 3,680 (Distorted)" : rosterView === "exact" ? "₹ 3,230 (Skewed)" : "₹ 3,230 (Resolved)"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {rosterView === "golden" ? "Consolidated balance: ₹ 3,230" : "Double counting customer orders"}
                </span>
              </div>
            </div>

            {/* CUSTOMER TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-300 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Record ID</th>
                    <th className="p-3.5">Customer Name</th>
                    <th className="p-3.5">Phone Number</th>
                    <th className="p-3.5">Delivery Address</th>
                    <th className="p-3.5">PIN Code</th>
                    <th className="p-3.5">Orders</th>
                    <th className="p-3.5">Wallet Balance</th>
                    <th className="p-3.5">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {rosterView === "golden" ? (
                    GOLDEN_CUSTOMERS.map((g) => (
                      <tr key={g.id} className="bg-emerald-950/10 hover:bg-emerald-950/20">
                        <td className="p-3.5 font-mono font-bold text-emerald-400">{g.id}</td>
                        <td className="p-3.5 font-bold text-white flex items-center gap-2">
                          <span>👤</span> {g.name}
                        </td>
                        <td className="p-3.5 font-mono text-cyan-300">{g.phone}</td>
                        <td className="p-3.5 text-slate-300">{g.address}</td>
                        <td className="p-3.5 font-mono text-slate-400">{g.pin}</td>
                        <td className="p-3.5 font-bold text-indigo-300">{g.orders} orders</td>
                        <td className="p-3.5 font-bold text-emerald-300">₹ {g.balance.toFixed(2)}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            GOLDEN MASTER (Merged {g.sourceCluster.join(", ")})
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    RAW_CUSTOMERS.map((c) => {
                      const isExactDropped = rosterView !== "raw" && c.type === "exact_duplicate";
                      const isFuzzyLinked = (rosterView === "fuzzy" || rosterView === "golden") && c.type === "fuzzy_duplicate";

                      return (
                        <tr
                          key={c.id}
                          className={clsx(
                            "transition-colors duration-150",
                            isExactDropped && "opacity-30 bg-red-950/20 line-through",
                            isFuzzyLinked && "bg-cyan-950/20 border-l-4 border-cyan-500",
                            !isExactDropped && !isFuzzyLinked && "hover:bg-slate-900/50"
                          )}
                        >
                          <td className="p-3.5 font-mono text-slate-400">{c.id}</td>
                          <td className="p-3.5 font-semibold text-white">{c.name}</td>
                          <td className="p-3.5 font-mono text-cyan-400">{c.phone}</td>
                          <td className="p-3.5 text-slate-300">{c.address}</td>
                          <td className="p-3.5 font-mono text-slate-400">{c.pin}</td>
                          <td className="p-3.5 text-indigo-300 font-semibold">{c.orders}</td>
                          <td className="p-3.5 text-emerald-300 font-semibold">₹ {c.balance.toFixed(2)}</td>
                          <td className="p-3.5">
                            {c.type === "original" ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                UNIQUE ENTITY
                              </span>
                            ) : c.type === "exact_duplicate" ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                                {isExactDropped ? "DROPPED (SHA-256 HASH MATCH)" : "EXACT RETRY DUPLICATE"}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                {rosterView === "fuzzy" ? "FUZZY LINKED (JW: 0.90)" : "FUZZY SPELLING TYPO"}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* EDUCATIONAL ANNOTATION BOX */}
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/30 text-xs text-slate-300 space-y-2">
              <span className="text-indigo-400 font-bold block">💡 Architectural Observation:</span>
              <p>
                In Mode 2, SHA-256 exact deduplication successfully catches rows <code className="text-cyan-300">C102</code> and <code className="text-cyan-300">C107</code> because they are byte-identical.
                However, notice that row <code className="text-cyan-300">C103</code> (<em>"Abhranila Banerji"</em>) completely slips past exact hashing! Only Mode 3 (Probabilistic Linkage) catches it.
                Finally, in Mode 4, simple deletion is abandoned in favor of <strong>Golden Master Synthesis</strong>, which coalesces order history (14 + 2 = 16 orders) and preserves genuine customer lifetime value!
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODE B: ALGORITHMIC METRIC COMPARATOR & FELLEGI-SUNTER VERDICT
            ------------------------------------------------------------------- */}
        {studioMode === "comparator" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-cyan-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔬</span> Multi-Metric String Distance & Probabilistic Linkage Lab
                </h3>
                <p className="text-xs text-slate-400">
                  Select a real-world West Bengal naming anomaly or type custom strings to watch mathematical edit distances compute live!
                </p>
              </div>

              {/* PRESET PAIR SELECTOR */}
              <select
                onChange={(e) => {
                  const preset = PRESET_STRING_PAIRS[parseInt(e.target.value)];
                  if (preset) {
                    setCompStr1(preset.str1);
                    setCompStr2(preset.str2);
                  }
                }}
                className="bg-slate-950 text-xs text-indigo-300 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Load Regional Example...</option>
                {PRESET_STRING_PAIRS.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* LIVE INPUT FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">String A (Reference Record)</label>
                <input
                  type="text"
                  value={compStr1}
                  onChange={(e) => setCompStr1(e.target.value)}
                  className="w-full bg-slate-950 border border-indigo-900/60 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-400"
                  placeholder="e.g. Debangshu Mukherjee"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider">String B (Candidate Duplicate)</label>
                <input
                  type="text"
                  value={compStr2}
                  onChange={(e) => setCompStr2(e.target.value)}
                  className="w-full bg-slate-950 border border-cyan-900/60 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. Debangsu Mukhopadhyay"
                />
              </div>
            </div>

            {/* METRICS DISPLAY GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Levenshtein Edit</span>
                <span className="text-2xl font-extrabold text-white">{stringMetrics.levDist} Edits</span>
                <span className="text-[11px] text-indigo-400 block font-mono">Similarity: {stringMetrics.levSim}%</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Jaro-Winkler Score</span>
                <span className="text-2xl font-extrabold text-cyan-400">{stringMetrics.jw}%</span>
                <span className="text-[11px] text-slate-400 block font-mono">Standard Jaro: {stringMetrics.jaro}%</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bigram Jaccard</span>
                <span className="text-2xl font-extrabold text-emerald-400">{stringMetrics.jaccard}%</span>
                <span className="text-[11px] text-slate-400 block font-mono">2-Char Shingle Overlap</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Soundex Code</span>
                <span className="text-2xl font-extrabold text-purple-400">
                  {stringMetrics.s1Soundex} vs {stringMetrics.s2Soundex}
                </span>
                <span className={clsx(
                  "text-[11px] font-bold block font-mono",
                  stringMetrics.soundexMatch ? "text-emerald-400" : "text-amber-400"
                )}>
                  {stringMetrics.soundexMatch ? "✔ Phonetic Match" : "✖ Phonetic Divergence"}
                </span>
              </div>
            </div>

            {/* FELLEGI-SUNTER DECISION CARD */}
            <div className={clsx(
              "p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
              stringMetrics.decision === "MATCH" && "bg-emerald-950/20 border-emerald-500/50",
              stringMetrics.decision === "CLERICAL_REVIEW" && "bg-amber-950/20 border-amber-500/50",
              stringMetrics.decision === "NON_MATCH" && "bg-red-950/20 border-red-500/50"
            )}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fellegi-Sunter Automated Verdict:</span>
                  <span className={clsx(
                    "px-3 py-1 text-xs font-extrabold rounded-full tracking-wider border",
                    stringMetrics.decision === "MATCH" && "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
                    stringMetrics.decision === "CLERICAL_REVIEW" && "bg-amber-500/20 text-amber-300 border-amber-500/50",
                    stringMetrics.decision === "NON_MATCH" && "bg-red-500/20 text-red-300 border-red-500/50"
                  )}>
                    {stringMetrics.decision === "MATCH" && "✔ DEFINITE MATCH (A1)"}
                    {stringMetrics.decision === "CLERICAL_REVIEW" && "⚠️ CLERICAL REVIEW (A2)"}
                    {stringMetrics.decision === "NON_MATCH" && "✖ DEFINITE NON-MATCH (A3)"}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Calculated Log-Likelihood Weight: <strong className="text-white font-mono">{stringMetrics.weight} bits</strong> (Match Threshold: ≥ {fsThreshold} bits).
                </p>
              </div>

              {/* THRESHOLD SLIDER */}
              <div className="w-full sm:w-64 space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>Sensitivity Threshold:</span>
                  <span className="text-indigo-300">{fsThreshold} bits</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="18"
                  step="0.5"
                  value={fsThreshold}
                  onChange={(e) => setFsThreshold(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODE C: THE O(N^2) SCALABILITY & BLOCKING SANDBOX
            ------------------------------------------------------------------- */}
        {studioMode === "blocking" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-emerald-900/40 shadow-2xl space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚡</span> The Quadratic O(N²) Scalability Wall & Blocking Engine
              </h3>
              <p className="text-xs text-slate-400">
                Explore why pairwise comparisons break down at scale and how partitioning records into inverted index blocks slashes execution from days to milliseconds.
              </p>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300 uppercase tracking-wider">Dataset Size (N Records):</span>
                  <span className="text-indigo-400 font-mono">{datasetSize.toLocaleString()} rows</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  step="5000"
                  value={datasetSize}
                  onChange={(e) => setDatasetSize(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1,000 (Small)</span>
                  <span>100,000 (Municipal)</span>
                  <span>500,000 (Statewide)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Blocking Architecture</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "none", label: "No Blocking (Naive O(N²))" },
                    { id: "pin", label: "PIN Code (20 Blocks)" },
                    { id: "compound", label: "Compound PIN+Initial (130 Blocks)" }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setBlockingStrategy(s.id)}
                      className={clsx(
                        "p-2 text-xs font-bold rounded-lg border transition-all text-center",
                        blockingStrategy === s.id
                          ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* LIVE SCALABILITY TELEMETRY */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Candidate Pairs</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">{blockingMetrics.candidatePairs}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Out of {blockingMetrics.naivePairs} total</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Blocks</span>
                <span className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono">{blockingMetrics.blocksCount} Partition(s)</span>
                <span className="text-[10px] text-slate-500 block mt-1">Inverted index keys</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Reduction Ratio (RR)</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">{blockingMetrics.reductionRatio}%</span>
                <span className="text-[10px] text-slate-500 block mt-1">Comparisons eliminated</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Est. Execution Time</span>
                <span className={clsx(
                  "text-xl sm:text-2xl font-extrabold font-mono",
                  blockingStrategy === "none" && datasetSize > 50000 ? "text-red-400" : "text-cyan-400"
                )}>
                  {blockingMetrics.timeFormatted}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">At 10⁶ comparisons/sec</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 text-xs text-slate-300">
              <strong className="text-emerald-400 block mb-1">Key Takeaway for Gate CS & MAKAUT:</strong>
              When deduplicating 500,000 citizen records without blocking, naive comparisons exceed <strong>124 Billion operations</strong>, taking over <strong>34.7 hours</strong>!
              By introducing compound blocking (PIN code + Initial letter), operations plummet by <strong>99.23%</strong>, reducing execution time to just <strong>16 minutes</strong> with negligible impact on Pairs Completeness.
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 4: MATHEMATICAL FORMULATIONS & PROOFS
          ===================================================================== */}
      <section id="math-formulation" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            4. Mathematical Formulations & Rigorous Theoretical Proofs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FELLEGI SUNTER THEOREM */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📐</span> 1. The Fellegi-Sunter Likelihood Ratio
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto">
              {"W(γ) = ∑_{k=1}^K log₂ [ P(γ_k | M) / P(γ_k | U) ]"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              For an agreement vector γ across K attributes, the log-likelihood weight is additive under conditional independence.
              When an attribute agrees (γ_k = 1):
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-emerald-400">w_agree = log₂( m_k / u_k ) &gt; 0</div>
              <div className="text-red-400">w_disagree = log₂( (1 - m_k) / (1 - u_k) ) &lt; 0</div>
            </div>
            <p className="text-xs text-slate-400">
              Fellegi and Sunter proved that this decision rule minimizes total risk for any pre-specified false match tolerance μ and false non-match tolerance λ.
            </p>
          </div>

          {/* LEVENSHTEIN DYNAMIC PROGRAMMING */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🔄</span> 2. Wagner-Fischer Levenshtein DP Recurrence
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-950 font-mono text-xs text-cyan-200 overflow-x-auto whitespace-pre">
{`D(i, j) = min {
  D(i-1, j) + 1,             (Deletion)
  D(i, j-1) + 1,             (Insertion)
  D(i-1, j-1) + cost(s1[i], s2[j])
}`}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Base cases: D(i, 0) = i and D(0, j) = j. The substitution cost is 0 if characters match, and 1 otherwise.
              Normalized similarity bounded in [0, 1] is given by:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300">
              Sim_Lev(s1, s2) = 1.0 - [ D(|s1|, |s2|) / max(|s1|, |s2|) ]
            </div>
          </div>

          {/* JARO WINKLER FORMULATION */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>✍️</span> 3. Jaro & Jaro-Winkler Metric
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950 font-mono text-xs text-emerald-200 overflow-x-auto">
              {"J = (1/3) * [ (m/|s1|) + (m/|s2|) + ((m - t)/m) ]"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Where m is matching characters within window ⌊max(|s1|, |s2|)/2⌋ - 1, and t is half the number of transpositions.
              The Winkler prefix extension provides:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300">
              J_W = J + L · p · (1 - J)   (where L ≤ 4, p = 0.1, J ≥ 0.7)
            </div>
          </div>

          {/* DATA LEAKAGE CONTAMINATION PROOF */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>☣️</span> 4. Mathematical Proof of Data Leakage
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Let a dataset contain k duplicate pairs {`{r_A, r_B}`}. Partition into train (proportion p_tr) and test (proportion p_te).
              The probability that a duplicate pair is split across folds is:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-purple-300">
              P(Split) = 2 · p_tr · p_te = 2 · 0.8 · 0.2 = 0.32 (32%)
            </div>
            <p className="text-xs text-slate-300">
              The probability that AT LEAST ONE duplicate contaminates the test set across k pairs is:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-purple-300">
              P(Leakage) = 1 - (p_tr² + p_te²)^k = 1 - (0.68)^k
            </div>
            <p className="text-[11px] text-slate-400">
              For k = 20 duplicate pairs, P(Leakage) = <strong>99.955%</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: REGIONAL WEST BENGAL INDUSTRIAL CASE STUDIES
          ===================================================================== */}
      <section id="case-studies" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-cyan-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            5. Real-World Regional Industrial Case Studies (West Bengal)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Case Study 1: Municipal Governance
              </span>
              <span className="text-xs text-slate-500">KMC Purba Bhavan</span>
            </div>
            <h3 className="text-base font-bold text-white">KMC Property Tax Assessment Deduplication</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Kolkata Municipal Corporation (KMC) maintained 144 disparate ward registers. Citizens registering renovated flats frequently generated duplicate records with differing street numbers (e.g. <em>"45 S.N. Banerjee Rd"</em> vs <em>"45 SN Banerjee Road, 2nd Fl"</em>).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-indigo-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Inverted index blocking on Ward Code + Owner Surname Soundex, followed by Fellegi-Sunter Jaccard address matching.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: 38,400 duplicate premises merged; ₹ 42.6 Cr recovered.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Case Study 2: Public Healthcare
              </span>
              <span className="text-xs text-slate-500">Govt. of West Bengal</span>
            </div>
            <h3 className="text-base font-bold text-white">Swasthya Sathi & Ration Card (PDS) Consolidation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Department of Health encountered cross-border duplicate enrollments across North 24 Parganas and Nadia districts. Duplicate beneficiaries doubled the allocated ₹ 5 Lakh family healthcare insurance limit.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-cyan-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Aadhaar deterministic hash matching combined with Jaro-Winkler (0.88 threshold) on Bengali transliterated names.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Purged 4.2% ghost registrations without clerical backlog.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Case Study 3: Quick-Commerce Dark Stores
              </span>
              <span className="text-xs text-slate-500">Salt Lake Sector V Hub</span>
            </div>
            <h3 className="text-base font-bold text-white">Abuse Prevention via Customer Entity Resolution</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Hyper-local quick-commerce apps in Salt Lake & New Town suffered from coupon code fraud ("FIRST50"). Tech workers created burner accounts using new phone numbers to order repeatedly to the same office tower.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-emerald-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Composite entity resolution on [Device Hardware UUID + Delivery GPS Closeness (&lt; 20m) + Card Fingerprint].</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Slashed promotional leakages by 87% across 12 dark store hubs.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Case Study 4: Academic Counseling
              </span>
              <span className="text-xs text-slate-500">Haringhata Campus</span>
            </div>
            <h3 className="text-base font-bold text-white">MAKAUT Centralized Admissions Registry</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Students participating in WBJEE counseling rounds registered multiple times with slight variations in HS Roll Numbers and father's initials, causing false vacancy allocations in engineering colleges.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-purple-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Blocking on High School Board Code + Levenshtein distance on candidate name and Date of Birth.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: 100% elimination of double-allocated seats across 114 affiliated colleges.</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: DIAGNOSTIC SELF-ASSESSMENT QUIZ
          ===================================================================== */}
      <section id="diagnostic-quiz" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                6. Diagnostic Self-Assessment Quiz (Scenario Challenge)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                5 authentic engineering scenarios evaluating deduplication strategies and system design judgment.
              </p>
            </div>
          </div>

          {quizSubmitted && (
            <div className="flex items-center gap-2 bg-indigo-950 border border-indigo-700 px-4 py-2 rounded-xl">
              <span className="text-xs text-slate-300">Your Score:</span>
              <span className="text-lg font-extrabold text-cyan-300">
                {quizScore} / {DIAGNOSTIC_QUESTIONS.length}
              </span>
              <button
                onClick={() => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className="ml-3 text-xs text-indigo-400 underline hover:text-indigo-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((q, qIdx) => (
            <div
              key={q.id}
              className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Scenario {qIdx + 1}: {q.scenario}
                </span>
                {quizSubmitted && (
                  <span className={clsx(
                    "text-xs font-bold px-2.5 py-0.5 rounded-full border",
                    quizAnswers[q.id] === q.correctIndex
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                      : "bg-red-500/20 text-red-300 border-red-500/50"
                  )}>
                    {quizAnswers[q.id] === q.correctIndex ? "✔ Correct" : "✖ Incorrect"}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>

              {/* OPTIONS */}
              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={quizSubmitted}
                      className={clsx(
                        "p-3.5 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 border flex items-center justify-between",
                        !quizSubmitted && isSelected && "bg-indigo-900/40 border-indigo-500 text-white shadow-md",
                        !quizSubmitted && !isSelected && "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950",
                        quizSubmitted && isCorrect && "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold",
                        quizSubmitted && isSelected && !isCorrect && "bg-red-950/40 border-red-500 text-red-200 line-through",
                        quizSubmitted && !isSelected && !isCorrect && "bg-slate-950/40 border-slate-900 text-slate-500"
                      )}
                    >
                      <span>{opt}</span>
                      <span className="font-mono text-xs opacity-60">[{String.fromCharCode(65 + optIdx)}]</span>
                    </button>
                  );
                })}
              </div>

              {/* POST-SUBMISSION FEEDBACK */}
              {quizSubmitted && (
                <div className="pt-3 border-t border-slate-800 text-xs space-y-1.5">
                  <div className="text-slate-300">
                    <strong className="text-cyan-300">Rationale: </strong>
                    {q.rationale}
                  </div>
                  <div className="text-indigo-400 font-mono bg-indigo-950/50 p-2 rounded-lg border border-indigo-900/40">
                    💬 {q.mentorTip}
                  </div>
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted && (
            <div className="text-center pt-2">
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < DIAGNOSTIC_QUESTIONS.length}
                className={clsx(
                  "px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl",
                  Object.keys(quizAnswers).length === DIAGNOSTIC_QUESTIONS.length
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                )}
              >
                Submit Diagnostic Assessment ({Object.keys(quizAnswers).length}/{DIAGNOSTIC_QUESTIONS.length} Answered)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: PRODUCTION PITFALLS & ARCHITECTURAL ANTI-PATTERNS
          ===================================================================== */}
      <section id="production-pitfalls" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-red-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            7. Production Engineering Pitfalls & Anti-Patterns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 1
            </div>
            <h3 className="text-sm font-bold text-white">The Blind `drop_duplicates()` Default Trap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Executing <code className="text-cyan-300">df.drop_duplicates()</code> without parameters checks all columns.
              If an auto-incrementing ID column (e.g. <code className="text-cyan-300">row_id</code> or <code className="text-cyan-300">created_at</code>)
              exists, exactly <strong>0 rows</strong> will be dropped.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Explicitly specify <code className="text-cyan-300">subset=['col1', 'col2']</code>.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 2
            </div>
            <h3 className="text-sm font-bold text-white">Train-Test Partition Before Deduplication</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Splitting data before deduplicating guarantees data leakage. As mathematically proven, duplicate pairs split across folds with ~32% probability, yielding artificially high benchmark scores that fail in production.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Deduplication MUST strictly precede train/test splitting.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 3
            </div>
            <h3 className="text-sm font-bold text-white">The Fragile Single-Key Blocking Trap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Blocking strictly by PIN Code means that if a user mistypes their PIN (e.g. 700064 typed as 700065), their records will never be compared, creating permanent False Negatives.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Deploy Multi-Pass Blocking (Union of PIN + Surname Soundex).
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 4
            </div>
            <h3 className="text-sm font-bold text-white">The Case & Whitespace Illusion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cryptographic hashes exhibit the avalanche effect: <code className="text-cyan-300">"Kolkata"</code> and <code className="text-cyan-300">"Kolkata "</code> evaluate to completely different SHA-256 digests.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Apply canonicalization (trim, lower, unicode normalize) first.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 5
            </div>
            <h3 className="text-sm font-bold text-white">The Clickstream Frequency Erasure</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In IoT telemetry or user logins, repeated rows represent physical intensity. Blindly dropping them deletes critical behavioral signals.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Aggregate into a <code className="text-cyan-300">frequency_count</code> feature rather than dropping.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 6
            </div>
            <h3 className="text-sm font-bold text-white">Giant Component Collapse</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In graph-based transitive closure, a single false link (e.g. placeholder phone '9999999999') merges thousands of distinct citizens into one monstrous mega-cluster.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Blacklist default/dummy values before constructing linkage graphs.
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: PRACTICAL WORKBENCH & INTEGRATED LOADERS
          ===================================================================== */}
      <section id="practical-workbench" className="space-y-8 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              8. Practical Workbench & Academic Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Access the pure Python simulation lab, comprehensive study handbook, and 30 graded examination questions.
            </p>
          </div>
        </div>

        {/* WORKBENCH SUB-TABS */}
        <div className="flex border-b border-slate-800">
          {[
            { id: "python", label: "🐍 Python Simulation Engine" },
            { id: "handbook", label: "📖 Academic Handbook (Note)" },
            { id: "qbank", label: "🎯 30 Graded Questions (Q-Bank)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-5 py-3 text-xs sm:text-sm font-bold transition-all border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT TABS */}
        {activeTab === "python" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Pure Python Deduplication Laboratory</h3>
                <p className="text-xs text-slate-400">
                  Zero external dependencies. Contains exact SHA-256 canonical hashing, Levenshtein DP, Jaro-Winkler, N-gram Jaccard, Soundex, and Fellegi-Sunter linkage.
                </p>
              </div>
            </div>
            <PythonFileLoader
              fileName="removing_duplicate_records_lab.py"
              code={labCode}
            />
          </div>
        )}

        {activeTab === "handbook" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Comprehensive Revision Notes & Handbook</h3>
                <p className="text-xs text-slate-400">
                  Theoretical foundations, Fellegi-Sunter decision rules, blocking equations, and West Bengal industrial case studies.
                </p>
              </div>
            </div>
            <PlainTextPrint
              fileName="topic10_note.txt"
              content={noteText}
            />
          </div>
        )}

        {activeTab === "qbank" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">30 Graded Questions & Viva-Voce Bank</h3>
                <p className="text-xs text-slate-400">
                  Structured across 4 mastery tiers (Foundation, Mechanics, Architecture, Scalability) with detailed solutions and practical tips.
                </p>
              </div>
            </div>
            <FAQTemplate
              title="Topic 10: Removing Duplicate Records — Graded Examination Bank"
              questions={questions}
            />
          </div>
        )}
      </section>

      {/* =====================================================================
          MENTOR SIGNATURE COMPONENT
          ===================================================================== */}
      <Teacher />
    </div>
  );
};

export default Topic10;
