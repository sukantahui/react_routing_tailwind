import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic5_files/structured_and_unstructured_data_basic_idea_lab.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

// =============================================================================
// MATHEMATICAL HELPER FUNCTIONS (TF-IDF, COSINE SIMILARITY, 2D CONVOLUTION)
// =============================================================================

const STOPWORDS_SET = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were",
  "will", "with", "patient", "reports", "observed", "under", "following"
]);

const tokenizeWords = (text) => {
  return String(text)
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS_SET.has(w));
};

const computeCosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : Number((dot / denom).toFixed(4));
};

// Available 2D spatial convolution filters
const CONV_KERNELS = {
  horizontalEdge: {
    name: "Sobel Horizontal Edge",
    desc: "Highlights horizontal boundaries and density gradients",
    matrix: [
      [-1, -2, -1],
      [ 0,  0,  0],
      [ 1,  2,  1]
    ]
  },
  verticalEdge: {
    name: "Sobel Vertical Edge",
    desc: "Highlights vertical contours and structural boundaries",
    matrix: [
      [-1,  0,  1],
      [-2,  0,  2],
      [-1,  0,  1]
    ]
  },
  sharpen: {
    name: "Laplacian Sharpen",
    desc: "Enhances high-frequency texture details and contrast",
    matrix: [
      [ 0, -1,  0],
      [-1,  5, -1],
      [ 0, -1,  0]
    ]
  },
  identity: {
    name: "Pass-Through Identity",
    desc: "Preserves original normalized intensities without alteration",
    matrix: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
  }
};

const Topic5 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Navigation State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");

  // Interactive Laboratory Studio State
  const [studioMode, setStudioMode] = useState("textTfidf"); // "textTfidf" | "imageConv" | "jsonNormalize"

  // 1. Text TF-IDF Studio State
  const [textDocs, setTextDocs] = useState([
    { id: "D1", title: "Mamata (Barrackpore)", text: "Patient presents with mild chest discomfort, high blood sugar, and hypertension." },
    { id: "D2", title: "Debangshu (Kolkata)", text: "Acute shortness of breath, severe heart palpitations, and critical hypertensive crisis." },
    { id: "D3", title: "Susmita (Ichapur)", text: "Routine annual health checkup, normal cardiovascular rhythm, and normal blood glucose." },
    { id: "D4", title: "Abhronila (Jadavpur)", text: "Postural dizziness, mild work stress, blood pressure marginally elevated, advised diet." }
  ]);
  const [simDocIdxA, setSimDocIdxA] = useState(0);
  const [simDocIdxB, setSimDocIdxB] = useState(1);
  const [displayTfidfMetric, setDisplayTfidfMetric] = useState("tfidf"); // "tfidf" | "tf" | "idf"

  // 2. Image Convolution Studio State
  const [imageSize, setImageSize] = useState(4); // 4x4 or 6x6
  const [activeKernelKey, setActiveKernelKey] = useState("horizontalEdge");
  const [rawPixelMatrix, setRawPixelMatrix] = useState([
    [ 35,  45, 215, 230],
    [ 40,  55, 200, 220],
    [ 30,  50, 185, 210],
    [ 25,  40, 170, 195]
  ]);

  // 3. JSON Normalization Studio State
  const [jsonDataType, setJsonDataType] = useState("clinical"); // "clinical" | "fintech" | "ecommerce"
  const [isFlattened, setIsFlattened] = useState(false);
  const [simulateDrift, setSimulateDrift] = useState(false);

  // Diagnostic Quiz State
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ---------------------------------------------------------------------------
  // JARGON BUSTER VOCABULARY
  // ---------------------------------------------------------------------------
  const jargonList = [
    {
      term: "Structured Data",
      category: "architecture",
      pronunciation: "Struk-churd Day-tuh",
      shortDef: "Information organized into strict relational tables with pre-defined column schemas.",
      deepExplanation: "Conforms to rigid Schema-on-Write semantics (SQL databases, CSV, Parquet). Every row is an entity; every column is a typed attribute (Integer, Float, Date). Machine learning estimators like XGBoost, Decision Trees, and OLS directly process structured 2D matrices X in R^(N x D).",
      equation: "X in R^{N x D}, quad x_{ij} in mathcal{D}_j"
    },
    {
      term: "Semi-Structured Data",
      category: "architecture",
      pronunciation: "Sem-ee Struk-churd",
      shortDef: "Data lacking a relational table schema, but containing self-describing tags or hierarchical trees (JSON, XML, BSON).",
      deepExplanation: "Operates on Schema-on-Read. Records can have variable fields, nested sub-dictionaries, and polymorphic arrays. Before ML training, semi-structured documents must be flattened or normalized into a tabular dataframe.",
      equation: "mathcal{T} = (V, E) quad text{where} quad v_i in text{Keys} cup text{Values}"
    },
    {
      term: "Unstructured Data",
      category: "architecture",
      pronunciation: "Un-struk-churd Day-tuh",
      shortDef: "Information with no predefined data model, encompassing raw text, images, audio, and video (80-90% of all data).",
      deepExplanation: "Because ML algorithms are mathematical operators on vector spaces, unstructured data cannot be used raw. Feature representation pipelines (tokenization, TF-IDF, CNN kernels, MFCCs) map raw bytes into structured numerical tensors.",
      equation: "phi: mathcal{U} rightarrow mathbb{R}^D"
    },
    {
      term: "The 80/20 Enterprise Paradox",
      category: "architecture",
      pronunciation: "80-20 Rule",
      shortDef: "The industrial reality that 80-90% of all real-world data is unstructured, while 80% of legacy analytics only uses structured SQL.",
      deepExplanation: "While corporate ERP and billing databases hold structured data, the vast majority of actionable signal resides in unstructured physician notes, PDFs, customer reviews, call transcripts, and security camera streams, driving the need for multimodal AI.",
      equation: "text{Vol}_{text{Unstructured}} approx 4 text{ to } 9 times text{Vol}_{text{Structured}}"
    },
    {
      term: "Document-Term Matrix (DTM)",
      category: "nlp",
      pronunciation: "D-T-M",
      shortDef: "A 2D matrix where rows represent documents and columns represent unique vocabulary words.",
      deepExplanation: "Represents an unstructured text corpus in structured tabular form. Cell (i, j) indicates either the raw count or the TF-IDF weight of word j in document i.",
      equation: "mathbf{X}_{text{DTM}} in mathbb{R}^{N times |V|}"
    },
    {
      term: "TF-IDF Weighting",
      category: "nlp",
      pronunciation: "T-F I-D-F",
      shortDef: "Term Frequency times Inverse Document Frequency; measures how uniquely informative a word is to a document.",
      deepExplanation: "Penalizes high-frequency common words across the corpus while boosting rare, discriminative domain keywords. Highly resilient against document length variations when paired with L2 normalization.",
      equation: "text{TF-IDF}(t, d) = text{TF}(t, d) times logleft(frac{1 + N}{1 + text{df}(t)}right) + 1"
    },
    {
      term: "Sparse Matrix Representation (CSR)",
      category: "nlp",
      pronunciation: "Com-pressed Sparse Row",
      shortDef: "A memory-efficient format storing only non-zero coordinates and values, saving over 98% of RAM.",
      deepExplanation: "In text analysis, most documents contain less than 1% of the entire vocabulary. Storing zeros in dense NumPy arrays causes immediate Out-Of-Memory (OOM) crashes. CSR stores three compact 1D arrays: data, indices, and indptr.",
      equation: "text{Memory Ratio} = frac{text{nnz} times (text{val} + text{idx})}{N times M times 8 text{ bytes}} ll 1"
    },
    {
      term: "Dense Embeddings",
      category: "nlp",
      pronunciation: "Dense Em-bed-dings",
      shortDef: "Continuous vector representations (e.g. Word2Vec, BERT) where semantically similar concepts are close in space.",
      deepExplanation: "Unlike sparse orthogonal TF-IDF vectors, dense embeddings map semantic concepts into low-dimensional spaces (R^300 to R^768). The words 'doctor' and 'physician' have high cosine similarity even if they share zero characters.",
      equation: "mathbf{e}_{text{word}} in mathbb{R}^d, quad text{sim}(mathbf{u}, mathbf{v}) = cos(theta)"
    },
    {
      term: "Pixel Intensity Tensor",
      category: "vision",
      pronunciation: "Pix-el Ten-sor",
      shortDef: "A multi-dimensional numerical array representing image brightness values across spatial coordinates and color channels.",
      deepExplanation: "Grayscale images are 2D matrices H x W with integer values in [0, 255]. Color images are 3D tensors H x W x 3 (Red, Green, Blue). Preprocessing scales these to [0.0, 1.0] continuous floats.",
      equation: "mathbf{I} in [0, 255]^{H times W times C} quad xrightarrow{text{norm}} quad mathbf{I}_{text{norm}} in [0.0, 1.0]^{H times W times C}"
    },
    {
      term: "Discrete 2D Spatial Convolution",
      category: "vision",
      pronunciation: "Con-vo-loo-shun",
      shortDef: "Sliding a small matrix kernel over an image to compute weighted neighborhood sums that detect edges and textures.",
      deepExplanation: "Preserves 2D spatial locality without blowing up parameter counts. Convolutional kernels (Sobel, Laplacian) detect horizontal contours, vertical boundaries, and corners while maintaining translation invariance.",
      equation: "S(i, j) = (I * K)(i, j) = sum_{m} sum_{n} I(i + m, j + n) K(m, n)"
    },
    {
      term: "JSON Flattening / Normalization",
      category: "storage",
      pronunciation: "J-SON Nor-muh-li-zay-shun",
      shortDef: "The process of recursively converting nested JSON dictionaries and arrays into tabular relational columns.",
      deepExplanation: "Maps nested keys (e.g. user -> address -> city) into compound column headers (user_address_city) so tabular models like Random Forest can ingest IoT, mobile app, and REST API payloads.",
      equation: "text{Flatten}({text{k}_1: {text{k}_2: v}}) rightarrow {text{k}_1 ext{_} ext{k}_2: v}"
    },
    {
      term: "Multimodal Feature Fusion",
      category: "storage",
      pronunciation: "Mul-ti-mo-dul Few-zhun",
      shortDef: "Combining tabular structured features, text TF-IDF vectors, and image embeddings into a single unified design matrix.",
      deepExplanation: "Enables unified predictive modeling by horizontally concatenating diverse feature vectors: X_fused = [ X_structured | X_text | X_image ] in R^(N x D).",
      equation: "mathbf{x}_{text{fused}} = mathbf{x}_{text{struct}} oplus mathbf{x}_{text{text}} oplus mathbf{x}_{text{vision}} in mathbb{R}^{d_1 + d_2 + d_3}"
    }
  ];

  const filteredJargon = useMemo(() => {
    return jargonList.filter((item) => {
      const matchesCategory =
        selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.shortDef.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  // ---------------------------------------------------------------------------
  // TF-IDF DYNAMIC CALCULATION ENGINE FOR STUDIO
  // ---------------------------------------------------------------------------
  const textAnalysis = useMemo(() => {
    const docTokens = textDocs.map((d) => tokenizeWords(d.text));
    const allWords = new Set();
    docTokens.forEach((tokens) => tokens.forEach((w) => allWords.add(w)));
    const vocab = Array.from(allWords).sort();

    const N = textDocs.length;
    const dfMap = {};
    vocab.forEach((term) => {
      let count = 0;
      docTokens.forEach((tokens) => {
        if (tokens.includes(term)) count++;
      });
      dfMap[term] = count;
    });

    const idfMap = {};
    vocab.forEach((term) => {
      idfMap[term] = Number((Math.log((1 + N) / (1 + dfMap[term])) + 1.0).toFixed(4));
    });

    const tfidfMatrix = docTokens.map((tokens) => {
      const total = tokens.length || 1;
      const termCounts = {};
      tokens.forEach((t) => (termCounts[t] = (termCounts[t] || 0) + 1));

      const rawRow = vocab.map((term) => {
        const tf = (termCounts[term] || 0) / total;
        const idf = idfMap[term];
        return tf * idf;
      });

      // L2 Normalize
      const norm = Math.sqrt(rawRow.reduce((acc, v) => acc + v * v, 0));
      return rawRow.map((v) => (norm > 0 ? Number((v / norm).toFixed(4)) : 0));
    });

    const tfMatrix = docTokens.map((tokens) => {
      const total = tokens.length || 1;
      const termCounts = {};
      tokens.forEach((t) => (termCounts[t] = (termCounts[t] || 0) + 1));
      return vocab.map((term) => Number(((termCounts[term] || 0) / total).toFixed(4)));
    });

    const zeroCount = tfidfMatrix.reduce(
      (acc, row) => acc + row.filter((v) => v === 0).length,
      0
    );
    const totalCells = N * vocab.length;
    const sparsityPct = totalCells > 0 ? ((zeroCount / totalCells) * 100).toFixed(1) : 0;

    return {
      vocab,
      docTokens,
      dfMap,
      idfMap,
      tfMatrix,
      tfidfMatrix,
      sparsityPct
    };
  }, [textDocs]);

  const activeCosineSim = useMemo(() => {
    if (!textAnalysis.tfidfMatrix[simDocIdxA] || !textAnalysis.tfidfMatrix[simDocIdxB]) return 0;
    return computeCosineSimilarity(
      textAnalysis.tfidfMatrix[simDocIdxA],
      textAnalysis.tfidfMatrix[simDocIdxB]
    );
  }, [textAnalysis, simDocIdxA, simDocIdxB]);

  // ---------------------------------------------------------------------------
  // 2D CONVOLUTION CALCULATION ENGINE FOR IMAGE STUDIO
  // ---------------------------------------------------------------------------
  const imageAnalysis = useMemo(() => {
    const raw = rawPixelMatrix;
    const h = raw.length;
    const w = raw[0].length;

    // Normalization to [0.0, 1.0]
    const normalized = raw.map((row) => row.map((p) => Number((p / 255.0).toFixed(3))));

    // Apply 3x3 kernel convolution
    const kernel = CONV_KERNELS[activeKernelKey].matrix;
    const outH = Math.max(1, h - 2);
    const outW = Math.max(1, w - 2);
    const convolved = [];

    for (let i = 0; i < outH; i++) {
      const row = [];
      for (let j = 0; j < outW; j++) {
        let acc = 0;
        for (let ki = 0; ki < 3; ki++) {
          for (let kj = 0; kj < 3; kj++) {
            acc += normalized[i + ki][j + kj] * kernel[ki][kj];
          }
        }
        row.append ? row.append(acc) : row.push(Number(acc.toFixed(3)));
      }
      convolved.push(row);
    }

    const flattened = convolved.flat();
    return {
      raw,
      normalized,
      convolved,
      flattened,
      outH,
      outW
    };
  }, [rawPixelMatrix, activeKernelKey]);

  // ---------------------------------------------------------------------------
  // 5 DIAGNOSTIC QUIZ QUESTIONS
  // ---------------------------------------------------------------------------
  const quizData = [
    {
      id: 1,
      scenario: "Semi-Structured JSON vs Relational SQL",
      question:
        "A fintech payment gateway in Salt Lake, Kolkata, logs user transactions as JSON objects with nested metadata: {\"txn_id\": \"TXN-904\", \"user\": {\"tier\": \"Gold\", \"city\": \"Kolkata\"}, \"items\": [\"Grocery\", \"Apparel\"]}. Which classification is strictly correct?",
      options: [
        { label: "A", text: "Pure Structured Data, because JSON strings are stored in computer memory." },
        { label: "B", text: "Semi-Structured Data, because it possesses internal hierarchical tags and operates on Schema-on-Read." },
        { label: "C", text: "Pure Unstructured Data, because it is impossible to run any mathematical algorithm on it." },
        { label: "D", text: "Continuous Gaussian Data, because monetary transaction amounts are real numbers." }
      ],
      correct: "B",
      explanation:
        "JSON, XML, and YAML are classic Semi-Structured data formats. They lack a rigid relational database schema (Schema-on-Write), but contain explicit self-describing key-value hierarchies. They require projective flattening (e.g. pd.json_normalize) before ingestion by standard tabular ML estimators.",
      mentorTip:
        "Always identify the data contract: Relational SQL is Structured (Schema-on-Write), JSON/XML is Semi-Structured (Schema-on-Read), and raw video/text/audio is Unstructured!"
    },
    {
      id: 2,
      scenario: "Direct Ingestion of Raw Text by Machine Learning Estimators",
      question:
        "A junior data scientist writes: `model = LogisticRegression().fit(['Patient has fever', 'Healthy patient'], [1, 0])`. What will occur?",
      options: [
        { label: "A", text: "The code will automatically convert text to ASCII numbers and train flawlessly." },
        { label: "B", text: "A TypeError will crash the program because machine learning algorithms are mathematical operators over vector spaces (R^d) and cannot perform arithmetic on raw strings." },
        { label: "C", text: "Scikit-Learn will automatically download GPT-4 to read the text in English." },
        { label: "D", text: "The model will silently output 50% accuracy on all predictions." }
      ],
      correct: "B",
      explanation:
        "Machine learning models optimize linear algebra loss functions (w^T x + b, Euclidean distance, gradient descent). They strictly require numerical 2D feature matrices X in R^(N x D). Unstructured text must first be transformed into numerical vectors via Tokenization, CountVectorizer, TF-IDF, or Dense Embeddings.",
      mentorTip:
        "Never forget: Machine learning algorithms don't know English, Hindi, or Bengali—they only know linear algebra over numbers! Vectorization is mandatory."
    },
    {
      id: 3,
      scenario: "Dense Array Allocation Disaster on Unstructured Text",
      question:
        "You vectorize 100,000 patient clinical discharge records using a 50,000-word vocabulary. A student converts the output to a dense NumPy array with `X.toarray()`. What happens to the system?",
      options: [
        { label: "A", text: "The code executes in 2 milliseconds with zero memory overhead." },
        { label: "B", text: "An immediate Out-Of-Memory (OOM) crash occurs because 100,000 x 50,000 x 8 bytes requires ~40 Gigabytes of contiguous RAM!" },
        { label: "C", text: "The vocabulary is automatically reduced to the top 5 most common words." },
        { label: "D", text: "The model automatically converts to a Convolutional Neural Network." }
      ],
      correct: "B",
      explanation:
        "A dense 100,000 x 50,000 float64 matrix requires 5,000,000,000 floats * 8 bytes = 40 GB RAM! Because typical documents contain fewer than 100 unique words (99.8% sparsity), preserving the sparse matrix (scipy.sparse.csr_matrix) stores only non-zero coordinates, consuming under 120 MB.",
      mentorTip:
        "Never call `.toarray()` on text DTMs in production! Always keep them in sparse CSR format (scipy.sparse) which Scikit-Learn algorithms natively support."
    },
    {
      id: 4,
      scenario: "Dimensionality Explosion in Raw Image Flattening",
      question:
        "An AI engineer attempts to train a Random Forest on 1024x1024 pixel RGB chest X-ray scans by naively unrolling each image with `image.flatten()`. Why is this approach fundamentally flawed?",
      options: [
        { label: "A", text: "Random Forests are mathematically prohibited from accepting floating-point numbers." },
        { label: "B", text: "Flattening generates 3,145,728 input dimensions per image, completely destroying 2D spatial locality and causing the Curse of Dimensionality." },
        { label: "C", text: "The images will become inverted in color from grayscale to green." },
        { label: "D", text: "The algorithm will require negative numbers to predict disease." }
      ],
      correct: "B",
      explanation:
        "1024 * 1024 * 3 = 3,145,728 input features! Flattening treats adjacent pixels as completely independent features, losing essential spatial relationships (edges, anatomical organs, lesions). Convolutional Neural Networks (CNNs) solve this by sliding small localized kernels to extract low-dimensional translation-invariant features.",
      mentorTip:
        "Flattening destroys spatial topology! For complex visual data, use CNNs or Vision Transformers instead of feeding raw flattened pixels to classical tabular models."
    },
    {
      id: 5,
      scenario: "Orthogonality Limitation of Sparse TF-IDF vs Dense Embeddings",
      question:
        "In a clinical review corpus, Document 1 states 'Physician examined cardiac rhythm' and Document 2 states 'Doctor checked heart beat'. What is their TF-IDF Cosine Similarity, and how do Dense Embeddings solve this?",
      options: [
        { label: "A", text: "TF-IDF similarity is 1.0; Dense Embeddings are unnecessary." },
        { label: "B", text: "TF-IDF similarity is 0.0 because they share zero common words; Dense Embeddings capture latent semantic synonyms in continuous vector space." },
        { label: "C", text: "TF-IDF similarity is negative; Dense Embeddings convert words into relational SQL." },
        { label: "D", text: "Both methods fail because medical terms cannot be represented in vector spaces." }
      ],
      correct: "B",
      explanation:
        "TF-IDF treats distinct vocabulary words as completely orthogonal dimensions. Since 'physician' and 'doctor' share no characters, their dot product is zero. Dense embeddings (like Word2Vec, BioBERT) project words into semantic vector spaces where vector('physician') and vector('doctor') have high cosine similarity (e.g. ~0.88).",
      mentorTip:
        "Remember the vocabulary orthogonality trap: TF-IDF only matches exact keywords; Dense Embeddings match semantic meaning!"
    }
  ];

  const handleQuizSelect = (optLabel) => {
    setUserAnswer(optLabel);
    setShowFeedback(true);
  };

  const currentQuiz = quizData[selectedQuizIndex];
  const isCorrect = userAnswer === currentQuiz.correct;

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16">
      {/* ========================================================================= */}
      {/* HERO HEADER */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 5
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              MAKAUT Master Syllabus
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Multimodal ML Core
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Structured, Semi-Structured &amp; Unstructured Data
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Understand the architectural taxonomy of enterprise data modalities, the 80/20 data paradox, schema-on-write vs schema-on-read, and the mathematical feature extraction pipelines (TF-IDF vector space modeling, 2D image convolution, and recursive JSON flattening) required to transform raw sensory signals into structured design matrices <span className="font-mono text-cyan-300 font-bold">X ∈ ℝ^(N×D)</span>.
          </p>

          {/* Smooth Scroll Navigation Bar */}
          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "1. Novice Masterclass & Jargon" },
              { id: "interactiveStudio", label: "2. Multimodal Vectorization Studio" },
              { id: "theory", label: "3. Vector Space Theory & Math" },
              { id: "caseStudies", label: "4. Regional Industrial Cases" },
              { id: "diagnosticQuiz", label: "5. Diagnostic Self-Quiz" },
              { id: "bestPractices", label: "6. Pitfalls & Best Practices" },
              { id: "labSection", label: "7. Python Lab Code" },
              { id: "faqSection", label: "8. FAQ & Answers" },
              { id: "notesSection", label: "9. Revision Notes" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: NOVICE MASTERCLASS & JARGON BUSTER */}
      {/* ========================================================================= */}
      <section id="noviceMasterclass" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Novice Classroom: Intuition, Taxonomy &amp; Jargon Buster
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Plain-English analogies, architectural comparison matrices, and searchable terminology glossary
            </p>
          </div>
        </div>

        {/* Sub-tabs for Novice section */}
        <div className="flex gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 max-w-xl">
          {[
            { id: "intuition", label: "Real-World Metaphors" },
            { id: "comparison", label: "3-Way Comparative Matrix" },
            { id: "jargon", label: "Interactive Jargon Buster" }
          ].map((subTab) => (
            <button
              key={subTab.id}
              onClick={() => setSelectedLessonTab(subTab.id)}
              className={clsx(
                "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all",
                selectedLessonTab === subTab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {subTab.label}
            </button>
          ))}
        </div>

        {/* SUBTAB 1: INTUITIVE METAPHORS */}
        {selectedLessonTab === "intuition" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Structured Card */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-blue-500/30 space-y-4 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg">
                📊
              </div>
              <h3 className="text-base font-bold text-white">
                Structured Data: The Meticulous Spreadsheet
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine an official banking ledger or Excel spreadsheet where every single column is strictly titled (<span className="text-blue-300 font-mono">Account_No</span>, <span className="text-blue-300 font-mono">Balance_INR</span>, <span className="text-blue-300 font-mono">KYC_Status</span>) and locked. You are prohibited from entering text in a numeric column.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="text-blue-400 font-bold">SQL / RDBMS / Parquet:</span>
                <br />• 10%–20% of enterprise volume
                <br />• Instant query speed with B-Trees
                <br />• Directly feeds XGBoost &amp; Regression
              </div>
            </div>

            {/* Semi-Structured Card */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-500/30 space-y-4 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                🏷️
              </div>
              <h3 className="text-base font-bold text-white">
                Semi-Structured: The Sticky-Note Prescription
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine a medical receipt or JSON payload with labeled tags: <span className="text-amber-300 font-mono">Doctor: "Dr. Roy"</span>, <span className="text-amber-300 font-mono">Medicines: ["Paracetamol", "Azithromycin"]</span>. It isn't locked into rigid table columns, but each piece of data carries its own descriptive label.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="text-amber-400 font-bold">JSON / XML / MongoDB:</span>
                <br />• 5%–10% of enterprise volume
                <br />• Flexible Schema-on-Read
                <br />• Flattened via pd.json_normalize()
              </div>
            </div>

            {/* Unstructured Card */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-rose-500/30 space-y-4 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
                🌊
              </div>
              <h3 className="text-base font-bold text-white">
                Unstructured Data: The Continuous River
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine a continuous voice recording of a patient consultation, a handwritten diary page, or a raw MRI brain scan. There are no predefined rows, columns, or tags—just raw, continuous sensory bitstreams that human senses naturally interpret.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="text-rose-400 font-bold">Text / Audio / Images / Video:</span>
                <br />• 80%–90% of all global data!
                <br />• Stored in S3 / MinIO Object Lakes
                <br />• Requires TF-IDF / CNN Embeddings
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: COMPARATIVE MATRIX */}
        {selectedLessonTab === "comparison" && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Comprehensive Architectural Comparison Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Detailed side-by-side analysis across engineering dimensions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 font-bold">Dimension</th>
                    <th className="p-3.5 font-bold text-blue-400">Structured Data</th>
                    <th className="p-3.5 font-bold text-amber-400">Semi-Structured Data</th>
                    <th className="p-3.5 font-bold text-rose-400">Unstructured Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="p-3.5 font-bold text-white">Schema Nature</td>
                    <td className="p-3.5 font-mono text-blue-300">Schema-on-Write (Strict DDL)</td>
                    <td className="p-3.5 font-mono text-amber-300">Schema-on-Read (Dynamic)</td>
                    <td className="p-3.5 font-mono text-rose-300">No Predefined Schema</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="p-3.5 font-bold text-white">Physical Representation</td>
                    <td className="p-3.5">Relational 2D tables (Rows &amp; Columns)</td>
                    <td className="p-3.5">Hierarchical trees, nested key-values, lists</td>
                    <td className="p-3.5">Character strings, pixel tensors, audio waveforms</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="p-3.5 font-bold text-white">Storage Tech</td>
                    <td className="p-3.5 font-mono">PostgreSQL, MySQL, Oracle, Parquet</td>
                    <td className="p-3.5 font-mono">MongoDB, Couchbase, JSON files, XML</td>
                    <td className="p-3.5 font-mono">Amazon S3, MinIO, Blob Stores, HDFS</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="p-3.5 font-bold text-white">Enterprise Share</td>
                    <td className="p-3.5 font-bold text-blue-400">10% – 20%</td>
                    <td className="p-3.5 font-bold text-amber-400">5% – 10%</td>
                    <td className="p-3.5 font-bold text-rose-400">80% – 90% (Dominant)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="p-3.5 font-bold text-white">Query Language</td>
                    <td className="p-3.5 font-mono">Declarative SQL</td>
                    <td className="p-3.5 font-mono">JSONPath, XQuery, MQL</td>
                    <td className="p-3.5 font-mono">Vector Cosine Similarity, Full-Text Search</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="p-3.5 font-bold text-white">ML Ingestion Prep</td>
                    <td className="p-3.5">Direct tabular matrix ingestion</td>
                    <td className="p-3.5">Flattening (pd.json_normalize), Key binarization</td>
                    <td className="p-3.5">Tokenization, TF-IDF, CNN Kernels, Vector Embeddings</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="p-3.5 font-bold text-white">Search Indexing</td>
                    <td className="p-3.5 font-mono">B-Tree, Hash Indexing</td>
                    <td className="p-3.5 font-mono">Inverted Document Index</td>
                    <td className="p-3.5 font-mono">HNSW, IVF Vector Index (Pinecone, ChromaDB)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBTAB 3: JARGON BUSTER */}
        {selectedLessonTab === "jargon" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { id: "all", label: "All Terms" },
                  { id: "architecture", label: "Architecture" },
                  { id: "nlp", label: "Text & NLP" },
                  { id: "vision", label: "Computer Vision" },
                  { id: "storage", label: "Storage & Lakehouse" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedJargonCategory(cat.id)}
                    className={clsx(
                      "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                      selectedJargonCategory === cat.id
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:text-white"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search definitions (e.g. TF-IDF, Sparse, JSON)..."
                value={jargonSearchQuery}
                onChange={(e) => setJargonSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJargon.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {item.term}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {item.pronunciation}
                    </span>
                  </div>
                  <p className="text-xs text-cyan-300 font-medium">
                    {item.shortDef}
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {item.deepExplanation}
                  </p>
                  {item.equation && (
                    <div className="text-[10px] font-mono bg-slate-950 p-2 rounded border border-slate-800 text-emerald-300">
                      Math: {item.equation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MULTIMODAL VECTORIZATION STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Multimodal Vectorization Laboratory
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Hands-on interactive simulators for Text TF-IDF vector spaces, 2D Image Convolution, and JSON Relational Flattening
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 max-w-2xl">
          <button
            onClick={() => setStudioMode("textTfidf")}
            className={clsx(
              "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              studioMode === "textTfidf"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            )}
          >
            Modality A: Text TF-IDF &amp; Cosine Space
          </button>
          <button
            onClick={() => setStudioMode("imageConv")}
            className={clsx(
              "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              studioMode === "imageConv"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            )}
          >
            Modality B: Image 2D Convolution &amp; Flattening
          </button>
          <button
            onClick={() => setStudioMode("jsonNormalize")}
            className={clsx(
              "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              studioMode === "jsonNormalize"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            )}
          >
            Modality C: Semi-Structured JSON Normalizer
          </button>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* STUDIO A: TEXT TF-IDF VECTOR SPACE */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "textTfidf" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📝</span> Text Vector Space &amp; Document-Term Matrix (DTM)
                </h3>
                <p className="text-xs text-slate-400">
                  Vocabulary: {textAnalysis.vocab.length} unique terms &bull; Corpus Sparsity: {textAnalysis.sparsityPct}%
                </p>
              </div>

              {/* Metric Toggle */}
              <div className="flex gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setDisplayTfidfMetric("tfidf")}
                  className={clsx("px-2.5 py-1 rounded", displayTfidfMetric === "tfidf" ? "bg-indigo-600 text-white" : "text-slate-400")}
                >
                  TF-IDF (Normalized)
                </button>
                <button
                  onClick={() => setDisplayTfidfMetric("tf")}
                  className={clsx("px-2.5 py-1 rounded", displayTfidfMetric === "tf" ? "bg-indigo-600 text-white" : "text-slate-400")}
                >
                  Raw Term Frequency (TF)
                </button>
                <button
                  onClick={() => setDisplayTfidfMetric("idf")}
                  className={clsx("px-2.5 py-1 rounded", displayTfidfMetric === "idf" ? "bg-indigo-600 text-white" : "text-slate-400")}
                >
                  IDF Weights
                </button>
              </div>
            </div>

            {/* Document Term Matrix Grid */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800 p-3">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="p-2 w-44">Document</th>
                    {textAnalysis.vocab.map((term, i) => (
                      <th key={i} className="p-2 text-center text-cyan-300 font-bold whitespace-nowrap">
                        {term}
                        {displayTfidfMetric === "idf" && (
                          <span className="block text-[10px] text-slate-500 font-normal">
                            IDF: {textAnalysis.idfMap[term]}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {textDocs.map((doc, dIdx) => (
                    <tr key={doc.id} className="hover:bg-slate-900/60 transition">
                      <td className="p-2 font-bold text-white font-sans text-xs">
                        <span className="text-indigo-400 mr-1.5">{doc.id}:</span>
                        {doc.title}
                      </td>
                      {textAnalysis.vocab.map((term, tIdx) => {
                        const val =
                          displayTfidfMetric === "tfidf"
                            ? textAnalysis.tfidfMatrix[dIdx][tIdx]
                            : displayTfidfMetric === "tf"
                            ? textAnalysis.tfMatrix[dIdx][tIdx]
                            : textAnalysis.idfMap[term];
                        const isZero = val === 0;
                        return (
                          <td
                            key={tIdx}
                            className={clsx(
                              "p-2 text-center",
                              isZero ? "text-slate-700" : "text-emerald-400 font-bold bg-emerald-500/10 rounded"
                            )}
                          >
                            {val.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cosine Similarity Comparator Panel */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>📐</span> Vector Space Angle: Pairwise Cosine Similarity
              </h4>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Doc A:</span>
                  <select
                    value={simDocIdxA}
                    onChange={(e) => setSimDocIdxA(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white text-xs font-semibold"
                  >
                    {textDocs.map((d, i) => (
                      <option key={d.id} value={i}>{d.id}: {d.title}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Doc B:</span>
                  <select
                    value={simDocIdxB}
                    onChange={(e) => setSimDocIdxB(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white text-xs font-semibold"
                  >
                    {textDocs.map((d, i) => (
                      <option key={d.id} value={i}>{d.id}: {d.title}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 ml-auto bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Cosine Similarity:</span>
                  <span className="font-mono text-base font-bold text-cyan-400">
                    {activeCosineSim}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({(activeCosineSim * 100).toFixed(1)}% Semantic Directional Match)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* STUDIO B: IMAGE CONVOLUTION & FLATTENING */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "imageConv" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🖼️</span> 2D Pixel Intensity Normalization &amp; Spatial Convolution
                </h3>
                <p className="text-xs text-slate-400">
                  Transform raw [0-255] pixels into normalized feature maps and flattened 1D tensors
                </p>
              </div>

              {/* Kernel Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Active Filter Kernel:</span>
                <select
                  value={activeKernelKey}
                  onChange={(e) => setActiveKernelKey(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-bold"
                >
                  {Object.entries(CONV_KERNELS).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3-Stage Pipeline Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* STAGE 1: RAW PIXELS */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Stage 1: Raw Pixels [0–255]
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">4×4 Unstructured</span>
                </div>
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-900 rounded-lg border border-slate-800">
                  {imageAnalysis.raw.map((row, rI) =>
                    row.map((val, cI) => (
                      <div
                        key={`${rI}-${cI}`}
                        style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                        className="h-10 rounded flex items-center justify-center text-[10px] font-mono font-bold text-indigo-400 shadow-inner"
                      >
                        <span className="bg-slate-950/80 px-1 py-0.5 rounded text-white text-[9px]">
                          {val}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Integer byte intensities decoded from JPEG/DICOM bitstream.
                </p>
              </div>

              {/* STAGE 2: 3x3 KERNEL CONVOLUTION */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    Stage 2: 2D Spatial Filter
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400">Kernel: 3×3</span>
                </div>
                {/* Kernel Weights */}
                <div className="grid grid-cols-3 gap-1 p-2 bg-slate-900 rounded-lg border border-slate-800 max-w-[140px] mx-auto">
                  {CONV_KERNELS[activeKernelKey].matrix.map((row, rI) =>
                    row.map((kVal, cI) => (
                      <div
                        key={`${rI}-${cI}`}
                        className="h-7 bg-slate-950 border border-slate-700 rounded flex items-center justify-center text-[10px] font-mono font-bold text-amber-300"
                      >
                        {kVal}
                      </div>
                    ))
                  )}
                </div>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">{CONV_KERNELS[activeKernelKey].name}</p>
                  <p>{CONV_KERNELS[activeKernelKey].desc}</p>
                </div>
              </div>

              {/* STAGE 3: CONVOLVED FEATURE MAP & FLATTENING */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Stage 3: Feature Map &amp; 1D Vector
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400">Output: 2×2 -> R^4</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-900 rounded-lg border border-slate-800 max-w-[140px] mx-auto">
                  {imageAnalysis.convolved.map((row, rI) =>
                    row.map((val, cI) => (
                      <div
                        key={`${rI}-${cI}`}
                        className="h-10 bg-indigo-950/80 border border-indigo-500/40 rounded flex items-center justify-center text-[11px] font-mono font-bold text-emerald-300"
                      >
                        {val.toFixed(2)}
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-slate-900 p-2 rounded border border-slate-800 text-[10px] font-mono text-cyan-300 truncate">
                  Flattened Vector x: [{imageAnalysis.flattened.map((v) => v.toFixed(2)).join(", ")}]
                </div>
                <p className="text-[11px] text-slate-400">
                  Ready for concatenation into multimodal feature design matrix.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* STUDIO C: SEMI-STRUCTURED JSON FLATTENER */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "jsonNormalize" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🏷️</span> Semi-Structured JSON Hierarchical Normalizer
                </h3>
                <p className="text-xs text-slate-400">
                  Simulate pandas.json_normalize() projective transformation from nested trees into 2D tables
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFlattened(!isFlattened)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-bold transition shadow-md cursor-pointer",
                    isFlattened
                      ? "bg-emerald-600 text-white shadow-emerald-600/30"
                      : "bg-indigo-600 text-white shadow-indigo-600/30"
                  )}
                >
                  {isFlattened ? "✔ Reset to Raw Hierarchical JSON" : "⚡ Execute pd.json_normalize()"}
                </button>

                <button
                  onClick={() => setSimulateDrift(!simulateDrift)}
                  className={clsx(
                    "px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer",
                    simulateDrift
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                  title="Simulate upstream API adding new keys or altering data types"
                >
                  {simulateDrift ? "⚠️ Schema Drift Active" : "Simulate Schema Drift"}
                </button>
              </div>
            </div>

            {/* Display: Tree vs Table */}
            {!isFlattened ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto space-y-1">
                <span className="text-slate-500">// Raw Semi-Structured JSON Payload (Schema-on-Read):</span>
                <pre className="text-slate-300">
{JSON.stringify(
  simulateDrift
    ? {
        patient_id: "PT-7001",
        full_name: "Mamata Banerjee",
        vitals: { systolic_bp: 138, hr: 78, o2_saturation: 98.5 },
        insurance: { provider: "SwasthyaSathi", tier: "Gold", active: true },
        medications: ["Metformin", "Amlodipine"],
        NEW_UNEXPECTED_FIELD: "Emergency admission without prior appointment",
        schema_drift_warning: "Type changed from integer to string in v2 API"
      }
    : {
        patient_id: "PT-7001",
        full_name: "Mamata Banerjee",
        vitals: { systolic_bp: 138, hr: 78 },
        insurance: { provider: "SwasthyaSathi", tier: "Gold", active: true },
        medications: ["Metformin", "Amlodipine"]
      },
  null,
  2
)}
                </pre>
              </div>
            ) : (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                  Projected 2D Relational Columns (Ready for Model Training):
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse font-mono">
                    <thead>
                      <tr className="bg-slate-900 text-indigo-300 border-b border-slate-800">
                        <th className="p-2.5">patient_id</th>
                        <th className="p-2.5">full_name</th>
                        <th className="p-2.5">vitals_systolic_bp</th>
                        <th className="p-2.5">vitals_hr</th>
                        <th className="p-2.5">insurance_provider</th>
                        <th className="p-2.5">insurance_tier</th>
                        <th className="p-2.5">medications_count</th>
                        {simulateDrift && (
                          <th className="p-2.5 text-rose-400 bg-rose-500/10">NEW_UNEXPECTED_FIELD</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      <tr>
                        <td className="p-2.5 text-white font-bold">PT-7001</td>
                        <td className="p-2.5">Mamata Banerjee</td>
                        <td className="p-2.5 text-emerald-400">138</td>
                        <td className="p-2.5 text-emerald-400">78</td>
                        <td className="p-2.5 text-cyan-300">SwasthyaSathi</td>
                        <td className="p-2.5 text-amber-300">Gold</td>
                        <td className="p-2.5 font-bold">2</td>
                        {simulateDrift && (
                          <td className="p-2.5 text-rose-300 bg-rose-500/10 text-[10px]">
                            Emergency admission...
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
                {simulateDrift && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
                    <span>⚠️</span>
                    <span>
                      <strong>Warning: Schema Drift Detected!</strong> The upstream JSON schema introduced unexpected keys that break fixed tabular input pipelines unless defensive Pydantic contracts or dynamic column filters are implemented.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: MATHEMATICAL FOUNDATIONS & VECTOR SPACE THEORY */}
      {/* ========================================================================= */}
      <section id="theory" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Foundations &amp; Vector Space Theory
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Formal mathematical definitions, TF-IDF derivation, 2D convolution equations, and Multimodal Fusion matrices
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Vector Space Model & TF-IDF */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              1. Natural Language Vector Space Model (VSM)
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Given a document collection <span className="font-mono text-white">D = &#123;d₁, ..., d_N&#125;</span> and vocabulary <span className="font-mono text-white">V = &#123;t₁, ..., t_M&#125;</span>, each document <span className="font-mono text-white">d</span> is projected into an M-dimensional geometric vector space:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono text-indigo-300">
              <div>TF(t, d) = count(t ∈ d) / ∑_(t' ∈ d) count(t' ∈ d)</div>
              <div>IDF(t, D) = ln( (1 + |D|) / (1 + df(t)) ) + 1.0</div>
              <div className="text-emerald-400 font-bold">x_(d, t) = TF(t, d) × IDF(t, D)</div>
              <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                L2 Normalization: x_norm = x / ||x||₂ where ||x||₂ = √(∑ x_i²)
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Penalizes pervasive corpus noise words while emphasizing rare, domain-specific clinical/financial markers.
            </p>
          </div>

          {/* Card 2: 2D Spatial Image Convolution */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              2. 2D Discrete Spatial Image Convolution
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              An unstructured digital image is a discrete 2D spatial intensity tensor <span className="font-mono text-white">I ∈ [0, 255]^(H×W)</span>. Discrete spatial convolution with a kernel <span className="font-mono text-white">K ∈ ℝ^(k_h × k_w)</span> extracts structural edge representations:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono text-cyan-300">
              <div>I_norm(i, j) = I_raw(i, j) / 255.0  (Scale to [0, 1])</div>
              <div className="text-emerald-400 font-bold">
                S(i, j) = (I * K)(i, j) = ∑_m ∑_n I(i + m, j + n) K(m, n)
              </div>
              <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                Flattening to 1D: vec(S) ∈ ℝ^(out_H × out_W) preserves translation invariance.
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Filters extract localized spatial frequencies without causing the dimensional explosion of naive pixel flattening.
            </p>
          </div>
        </div>

        {/* Multimodal Feature Fusion Formula Card */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">
              3. The Multimodal Feature Fusion Matrix
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
              Design Matrix ℝ^(N × D)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In modern production architectures, disparate data modalities are vectorized independently, scaled, and horizontally fused into a unified design matrix before passing to estimators (e.g. CatBoost, XGBoost, Multi-Layer Perceptrons):
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono text-center space-y-2">
            <div className="text-white font-bold">
              X_fused = [ X_structured (d₁) ∥ X_semi_structured (d₂) ∥ X_text_tfidf (d₃) ∥ X_image_conv (d₄) ]
            </div>
            <div className="text-slate-400 text-xs">
              Where total dimensionality <span className="text-cyan-300 font-bold">D = d₁ + d₂ + d₃ + d₄</span> and sample size <span className="text-cyan-300 font-bold">N</span> is preserved across all patient rows.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section id="caseStudies" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied multimodal systems deployed across healthcare, banking, manufacturing, and commerce in West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                Case 1 • Salt Lake Sector V FinTech Hub
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                FinTech &amp; Fraud
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              Multimodal Credit Underwriting &amp; Fraud Detection
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu engineered a hybrid risk-scoring engine at an enterprise payment gateway in Sector V. The model combines <strong>Structured</strong> CIBIL bureau scores and repayment history (RDBMS tables) with <strong>Semi-Structured</strong> mobile payment JSON transaction clickstreams, and <strong>Unstructured</strong> customer dispute call recordings (Whisper ASR) to detect loan default risks with 94.2% precision.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Case 2 • Kolkata Medical College &amp; SSKM Hospital
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Healthcare AI
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              Cardiovascular Emergency Triage System
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima implemented a clinical triage system across Kolkata hospitals. The system fuses <strong>Structured</strong> patient telemetry (blood pressure, fasting blood glucose, age) with <strong>Unstructured</strong> attending physician clinical progress notes (BioBERT embeddings) and <strong>Unstructured</strong> 2D DICOM chest X-ray scans (DenseNet-121) to prioritize acute myocardial infarction interventions.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                Case 3 • Howrah Railway Freight Logistics &amp; Hooghly
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Supply Chain IoT
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              Predictive Locomotive Maintenance &amp; Telematics
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Engineers at Howrah freight yards combined <strong>Structured</strong> vibration sensor time-series and diesel consumption logs with <strong>Semi-Structured</strong> JSON container manifest manifests, and <strong>Unstructured</strong> thermal infrared imaging of axle wheel bearings to forecast catastrophic mechanical failures 48 hours in advance.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                Case 4 • Barrackpore &amp; North 24 Parganas Commerce
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                E-Commerce
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              Customer Sentiment &amp; Return Fraud Analytics
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita and Abhronila analyzed retail returns across regional hubs. The engine pairs <strong>Structured</strong> order transaction IDs and return reason codes with <strong>Unstructured</strong> customer review text (TF-IDF sentiment vectors) and customer-submitted unboxing photos to detect fraudulent return requests automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DIAGNOSTIC SELF-ASSESSMENT QUIZ */}
      {/* ========================================================================= */}
      <section id="diagnosticQuiz" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Diagnostic Self-Assessment Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive scenario-based multiple-choice evaluation with instant feedback and mentor guidance
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          {/* Question Navigator Pills */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Question {selectedQuizIndex + 1} of {quizData.length}:
            </span>
            <div className="flex gap-2">
              {quizData.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuizIndex(idx);
                    setUserAnswer(null);
                    setShowFeedback(false);
                  }}
                  className={clsx(
                    "w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    selectedQuizIndex === idx
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Badge & Question Prompt */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold uppercase">
              {currentQuiz.scenario}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQuiz.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQuiz.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleQuizSelect(opt.label)}
                className={clsx(
                  "w-full p-4 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-start gap-3 cursor-pointer",
                  userAnswer === opt.label
                    ? opt.label === currentQuiz.correct
                      ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-200"
                      : "bg-rose-950/40 border-rose-500/80 text-rose-200"
                    : "bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-300"
                )}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {opt.label}
                </span>
                <span className="leading-relaxed">{opt.text}</span>
              </button>
            ))}
          </div>

          {/* Detailed Feedback & Mentor Tip */}
          {showFeedback && (
            <div
              className={clsx(
                "p-5 rounded-xl border space-y-3 transition-all",
                isCorrect
                  ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-950/30 border-rose-500/40 text-rose-200"
              )}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>{isCorrect ? "✔ Correct!" : "❌ Incorrect Answer"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQuiz.explanation}
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs text-amber-300/90 font-medium">
                <strong>Sukanta Hui Mentor Tip:</strong> {currentQuiz.mentorTip}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: COMMON PITFALLS & INDUSTRY BEST PRACTICES */}
      {/* ========================================================================= */}
      <section id="bestPractices" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            06
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Engineering Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial production lessons from multimodal data engineering teams
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pitfalls */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-rose-900/40 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Critical Mistakes to Avoid
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>
                  <strong className="text-white">Dense Matrix Conversion on TF-IDF:</strong> Calling <code className="text-rose-300 font-mono">X.toarray()</code> on a 50,000-term vocabulary instantly exhausts RAM. Always maintain sparse CSR matrix format.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>
                  <strong className="text-white">Unchecked Schema Drift:</strong> Ingesting semi-structured JSON APIs without Pydantic contracts or missing-key handlers causes silent pipeline crashes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>
                  <strong className="text-white">Naive High-Res Image Flattening:</strong> Unrolling a 1024×1024 image into 3.1 million 1D features destroys spatial topology and triggers severe overfitting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>
                  <strong className="text-white">TF-IDF Data Leakage:</strong> Fitting the vectorizer on the full corpus before splitting into train/test sets leaks test frequencies and corrupts model validation.
                </span>
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Production Engineering Best Practices
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong className="text-white">Adopt S3/MinIO Object Lakehouses:</strong> Store heavy unstructured binary files (DICOM, MP3, MP4) in object stores; store only lightweight URIs in relational SQL.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong className="text-white">Use Parquet for Intermediate Features:</strong> Replace slow, uncompressed row CSVs with columnar Apache Parquet for 5x compression and 20x faster reads.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong className="text-white">Vector Database Indexing:</strong> For unstructured text and image embeddings, use specialized vector databases (Milvus, Pinecone, ChromaDB) with HNSW graphs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong className="text-white">Evaluate Late Fusion Early:</strong> Before training a monolithic early fusion network, build domain baseline models (ResNet for vision, RoBERTa for text) and blend predictions.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: PYTHON LABORATORY CODE */}
      {/* ========================================================================= */}
      <section id="labSection" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            07
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Complete standalone Python engine implementing Multimodal Feature Extraction (TF-IDF, 2D Convolution, JSON Normalization)
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="structured_and_unstructured_data_basic_idea_lab.py"
          highlightLines={[21, 95, 115, 145, 175, 210]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section id="faqSection" className="space-y-4">
        <FAQTemplate
          title="Structured and Unstructured Data — 30 Comprehensive Assessment Questions & Solutions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: PRINTABLE NOTES */}
      {/* ========================================================================= */}
      <section id="notesSection" className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Structured and Unstructured Data (Academic Revision Handbook)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Comprehensive Study Notes"
          downloadFileName="topic5_structured_unstructured_data_notes.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: TEACHER MENTORSHIP NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Mastering the architectural distinction between Structured, Semi-Structured, and Unstructured data is the cornerstone of enterprise data science. Over 80% of real-world value lies locked in unstructured medical reports, audio calls, and visual scans. Remember: machine learning models cannot think in words or pixels—they only compute in vector spaces! Practice the TF-IDF mathematical formulas, study the 2D spatial convolution kernel calculations, and run the Python lab code to master multimodal feature fusion."
        />
      </section>
    </div>
  );
};

export default Topic5;
