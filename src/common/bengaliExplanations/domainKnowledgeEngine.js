// src/common/bengaliExplanations/domainKnowledgeEngine.js

/**
 * Intelligent Semantic Domain Knowledge Engine for Machine Learning
 * সমস্ত টেকনিক্যাল টার্ম ইংরেজিতে অক্ষুণ্ণ রেখে প্রফেশনাল একাডেমিক বাংলায় পুঙ্খানুপুঙ্খ ব্যাখ্যা তৈরি করে
 */

// Domain Profiles for all 9 Segments & 47 Modules
const DOMAIN_PROFILES = {
  // SEGMENT 1: Fundamentals, Features, EDA
  "001_001": {
    domainName: "Machine Learning Foundations",
    domainBn: "মেশিন লার্নিংয়ের মৌলিক ভিত্তি ও পরিচিতি",
    defaultAnalogy: "একজন অভিজ্ঞ শিক্ষার্থী যেমন অতীতের টেস্ট পেপারের হাজার হাজার প্রশ্ন সমাধান করে পরীক্ষার জন্য প্রস্তুত হয় এবং নতুন অজানা প্রশ্নেরও সঠিক উত্তর দিতে পারে, Machine Learning Model-ও অতীতের Historical Data বিশ্লেষণ করে ভবিষ্যৎ প্রেডিকশন করতে শেখে।",
    defaultMistake: "Traditional Rule-based Programming এবং Data-driven Machine Learning-এর মৌলিক পার্থক্য গুলিয়ে ফেলা।",
    defaultExamTip: "Arthur Samuel এবং Tom Mitchell-এর সংজ্ঞা ইংরেজিতে কোটেশন সহ লিখবেন এবং Traditional Programming vs Machine Learning-এর ব্লক ডায়াগ্রাম আঁকবেন।",
    defaultFormula: "Machine Learning Framework: Given Experience E, Task T, and Performance Metric P, maximize P as E increases."
  },
  "001_003": {
    domainName: "Feature Selection & Splitting",
    domainBn: "ফিচার সিলেকশন ও ডেটা বিভাজন কৌশল",
    defaultAnalogy: "একজন পরীক্ষার্থী পরীক্ষার আগের দিন রিভিশন দেওয়ার সময় পাঠ্যবইয়ের সমস্ত অনাবশ্যক তথ্য বাদ দিয়ে কেবল গুরুত্বপূর্ণ মূল পয়েন্টগুলোতে মনোযোগ দেয়। Feature Selection-ও অপ্রয়োজনীয় ও নয়েজি ভেরিয়েবল বাদ দিয়ে মডেলের দক্ষতা বহুগুণ বাড়িয়ে তোলে।",
    defaultMistake: "Data Preprocessing বা Feature Selection করার সময় সম্পূর্ণ Dataset ব্যবহার করে ফেলা, যার ফলে Data Leakage ঘটে। সর্বদা Train-Test Split-এর পরে শুধুমাত্র Training Set-এর ওপর Feature Selection প্রয়োগ করা উচিত।",
    defaultExamTip: "Filter Methods, Wrapper Methods এবং Embedded Methods-এর তুলনামূলক ছক তৈরি করে উদাহরণ সহ আলোচনা করবেন।",
    defaultFormula: "Train-Test Split: Total Data D = D_{train} (80%) \cup D_{test} (20%), where D_{train} \cap D_{test} = \emptyset."
  },
  "001_004": {
    domainName: "Exploratory Data Analysis (EDA)",
    domainBn: "অন্বেষণমূলক ডেটা বিশ্লেষণ (EDA)",
    defaultAnalogy: "একজন চিকিৎসক রোগীকে ওষুধ দেওয়ার আগে যেমন তার নাড়ি, রক্তচাপ, তাপমাত্রা এবং ইসিজি রিপোর্ট পুঙ্খানুপুঙ্খ পরীক্ষা করে শরীরের সামগ্রিক অবস্থা বুঝে নেন, ডেটা সায়েন্টিস্টও মডেল তৈরির আগে EDA করে ডেটার স্বাস্থ্য ও অভ্যন্তরীণ প্যাটার্ন বুঝে নেন।",
    defaultMistake: "সরাসরি অ্যালগরিদম চালানো শুরু করা ডেটার ডিস্ট্রিবিউশন, আউটলায়ার এবং মিসিং প্যাটার্ন না দেখে।",
    defaultExamTip: "EDA-এর মূল তিনটি ধাপ: Univariate, Bivariate এবং Multivariate Analysis-এর উদ্দেশ্য ও উপযুক্ত চার্ট (যেমন Histogram, Scatter Plot, Heatmap) উল্লেখ করবেন।",
    defaultFormula: "Correlation Coefficient: r_{xy} = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}, \quad -1 \le r \le +1."
  },

  // SEGMENT 2: Regression
  "002": {
    domainName: "Regression Analysis",
    domainBn: "রিগ্রেশন অ্যানালাইসিস ও সংখ্যাগত প্রেডিকশন",
    defaultAnalogy: "একটি রিয়েল এস্টেট প্ল্যাটফর্মে কোনো ফ্ল্যাটের আয়তন (Square Feet), বেডরুমের সংখ্যা এবং লোকালিটির ওপর ভিত্তি করে তার আনুমানিক বিক্রয়মূল্য হিসাব করা। এখানে ফ্ল্যাটের দাম একটি Continuous Numerical Target Variable।",
    defaultMistake: "R-squared ($R^2$) এবং Adjusted $R^2$-এর মধ্যে গুলিয়ে ফেলা। মডেলে অপ্রয়োজনীয় ফিচার যোগ করলেও $R^2$ বাড়ে, কিন্তু Adjusted $R^2$ কমে যায়।",
    defaultExamTip: "Linear Regression-এর ৪টি মৌলিক অ্যাসাম্পশন (Linearity, Homoscedasticity, Independence, Normality of Residuals) পয়েন্ট আকারে ইংরেজিতে নাম সহ লিখবেন।",
    defaultFormula: "Linear Model: y = \beta_0 + \beta_1 x_1 + \dots + \beta_p x_p + \epsilon, \quad \text{Loss (MSE)} = \frac{1}{N}\sum_{i=1}^N (y_i - \hat{y}_i)^2."
  },

  // SEGMENT 3: Classification
  "003": {
    domainName: "Classification Techniques",
    domainBn: "ক্লাসিফিকেশন ও শ্রেণিবিন্যাস কৌশল",
    defaultAnalogy: "একটি ব্যাংকে ঋণ আবেদনকারীর ক্রেডিট হিস্ট্রি ও আয় দেখে ব্যাংক স্বয়ংক্রিয়ভাবে সিদ্ধান্ত নেয় তিনি ঋণ শোধ করতে পারবেন কি পারবেন না (Approved / Rejected)। এটি একটি ডিসক্রিট ক্যাটাগোরিক্যাল সিদ্ধান্ত।",
    defaultMistake: "Imbalanced Dataset-এ কেবল Accuracy দেখে মডেল মূল্যায়ন করা। ৯৯% সুস্থ মানুষের মধ্যে ক্যান্সার শনাক্ত করার ক্ষেত্রে Accuracy প্রতারণামূলক; Precision, Recall ও F1-Score দেখা আবশ্যক।",
    defaultExamTip: "Confusion Matrix-এর ৪টি ঘর (TP, FP, FN, TN) এঁকে Precision, Recall এবং F1-Score-এর গাণিতিক সূত্র সুন্দর করে উপস্থাপন করবেন।",
    defaultFormula: "\text{Sigmoid: } \sigma(z) = \frac{1}{1 + e^{-z}}, \quad \text{F1-Score} = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}."
  },

  // SEGMENT 4: Clustering & Trees
  "004": {
    domainName: "Clustering & Decision Trees",
    domainBn: "ক্লাস্টারিং ও ডিসিশন ট্রি অ্যালগরিদম",
    defaultAnalogy: "ই-কমার্স ওয়েবসাইটে কোটি কোটি ক্রেতার অতীত ক্রয়ের তালিকা দেখে তাদের উচ্চ-বাজেট ক্রেতা, ডিসকাউন্ট-অনুসন্ধানী ক্রেতা এবং উইন্ডো-শপার—এই তিনটি স্বতন্ত্র গ্রুপে স্বয়ংক্রিয়ভাবে ভাগ করা।",
    defaultMistake: "Decision Tree-কে আনকন্ট্রোলডভাবে বাড়তে দেওয়া (Overfitting)। Max Depth নির্দিষ্ট না করলে বা Pruning না করলে মডেল ট্রেনিং ডাটায় ১০০% নির্ভুল হলেও টেস্ট ডাটায় মারাত্মক ব্যর্থ হয়।",
    defaultExamTip: "Entropy ও Information Gain-এর গাণিতিক ফর্মুলা পরিষ্কার লিখবেন এবং K-Means-এ কীভাবে Elbow Method দিয়ে অপটিমাল K নির্বাচন করা হয় তা ডায়াগ্রাম সহ বোঝাবেন।",
    defaultFormula: "\text{Entropy: } H(S) = -\sum_{i=1}^c p_i \log_2(p_i), \quad \text{WCSS} = \sum_{k=1}^K \sum_{x \in C_k} \|x - \mu_k\|^2."
  },

  // SEGMENT 5: Validation, Overfitting & Project
  "005": {
    domainName: "Model Evaluation & Generalization",
    domainBn: "মডেল ভ্যালিডেশন, ওভারফিটিং ও জেনারেলাইজেশন",
    defaultAnalogy: "একজন শিক্ষার্থী যদি বইয়ের সব অঙ্ক হুবহু মুখস্থ করে তবে সে ক্লাসের সাপ্তাহিক পরীক্ষায় ১০০-তে ১০০ পাবে, কিন্তু বোর্ডের ফাইনালে একটু ঘুরিয়ে প্রশ্ন করলেই ফেল করবে (Overfitting)। কিন্তু যদি সে মৌলিক সূত্রগুলো ভালো করে বোঝে, তবে সে যেকোনো অজানা প্রশ্নেও ভালো করবে (Good Generalization)।",
    defaultMistake: "Validation Set ছাড়া সরাসরি Test Set দিয়ে Hyperparameter টিউন করা। এতে Data Leakage ঘটে এবং মডেল বাস্তব জগতে খারাপ পারফর্ম করে।",
    defaultExamTip: "Bias-Variance Tradeoff কার্ভ আঁকবেন। X-অক্ষে Model Complexity এবং Y-অক্ষে Total Error, Bias^2 ও Variance দেখিয়ে অপটিমাল সুইট স্পট চিহ্নিত করবেন।",
    defaultFormula: "\text{Total Expected Error} = \text{Bias}^2(f̂) + \text{Variance}(f̂) + \sigma^2 \text{ (Irreducible Error)}."
  },

  // SEGMENT 6: Advanced ML (SVM, Regularization, Hierarchical, DBSCAN)
  "006": {
    domainName: "Advanced Machine Learning Algorithms",
    domainBn: "উন্নত মেশিন লার্নিং অ্যালগরিদম ও রেগুলারাইজেশন",
    defaultAnalogy: "দুটি শত্রু দেশের সীমান্তের মাঝে একটি নো-ম্যানস ল্যান্ড তৈরি করার মতো, যেখানে উভয় দেশের ক্যাম্প থেকে সর্বোচ্চ নিরাপদ দূরত্ব বজায় রেখে মাঝখান দিয়ে সীমানা রেখা (Optimal Hyperplane with Maximum Margin) টানা হয়—যা SVM করে।",
    defaultMistake: "Lasso (L1) এবং Ridge (L2) Regularization-এর কাজের পার্থক্য না বোঝা। Lasso কিছু কো-এফিশিয়েন্টকে সম্পূর্ণ শূন্য বানিয়ে Feature Selection করে, কিন্তু Ridge কো-এফিশিয়েন্টকে ছোট করে তবে কখনোই শূন্য করে না।",
    defaultExamTip: "SVM-এ Support Vectors-এর ভূমিকা, Margin Maximization এবং Kernel Trick-এর প্রয়োজনীয়তা পরিষ্কার ব্যাখ্যা করবেন।",
    defaultFormula: "\text{SVM Margin: } \gamma = \frac{2}{\|w\|}, \quad \text{Lasso Loss: } \text{MSE} + \lambda \sum_{j=1}^p |w_j|, \quad \text{Ridge Loss: } \text{MSE} + \lambda \sum_{j=1}^p w_j^2."
  },

  // SEGMENT 7: Deep Learning
  "007": {
    domainName: "Deep Learning & Neural Networks",
    domainBn: "ডিপ লার্নিং ও নিউরাল নেটওয়ার্ক",
    defaultAnalogy: "মানব মস্তিষ্কের কোটি কোটি নিউরন যেমন সংবেদনশীল অঙ্গ থেকে সিগন্যাল গ্রহণ করে সিন্যাপসের মাধ্যমে একে অপরের সাথে যোগাযোগ করে সিদ্ধান্ত নেয়, কৃত্রিম নিউরাল নেটওয়ার্কও ইনপুট নোড, ওয়েট এবং অ্যাক্টিভেশন ফাংশনের সমন্বয়ে জটিল অমীমাংসিত প্যাটার্ন শেখে।",
    defaultMistake: "হিডেন লেয়ারে Non-linear Activation Function ব্যবহার না করা। কোনো Activation Function না দিলে একটি ১০০-লেয়ারের গভীর নিউরাল নেটওয়ার্কও একটি সরল Linear Regression-এ পরিণত হয়।",
    defaultExamTip: "Forward Propagation, Loss Calculation এবং Backpropagation-এ Chain Rule of Calculus কীভাবে ওয়েট আপডেট করে তা স্টেপ-বাই-স্টেপ লিখবেন।",
    defaultFormula: "\text{Neuron Output: } a = \sigma\left(\sum_{i=1}^n w_i x_i + b\right), \quad \text{Weight Update: } w_{new} = w_{old} - \alpha \frac{\partial L}{\partial w}."
  },

  // SEGMENT 8: Signal Processing & CNN
  "008": {
    domainName: "Signal Processing & Computer Vision (CNN)",
    domainBn: "সিগন্যাল প্রসেসিং ও কনভোলিউশনাল নিউরাল নেটওয়ার্ক",
    defaultAnalogy: "একজন আর্ট কিউরেটর যেমন ম্যাগনিফাইং গ্লাস দিয়ে কোনো ছবির প্রতিটি ছোট ছোট অংশ (কোণা, রেখা, টেক্সচার) পুঙ্খানুপুঙ্খ স্ক্যান করে ছবির সত্যতা যাচাই করেন, CNN-এর Convolutional Filter-ও ছবির ওপর দিয়ে স্লাইড করে বৈশিষ্ট্যপূর্ণ ফিচার ম্যাপ তৈরি করে।",
    defaultMistake: "2D ইমেজে ডেনস (Fully Connected) লেয়ার সরাসরি দেওয়া। এতে প্যারামিটার সংখ্যা মাত্রাতিরিক্ত বেড়ে যায় এবং ছবির স্থানিক বিন্যাস (Spatial Invariance) নষ্ট হয়ে যায়।",
    defaultExamTip: "CNN-এর তিনটি মূল লেয়ারের কাজ লিখবেন: Convolution Layer (Feature Extraction), Pooling Layer (Downsampling & Dimensionality Reduction), এবং Fully Connected Layer (Classification)।",
    defaultFormula: "\text{Convolution: } (I * K)(i, j) = \sum_m \sum_n I(i - m, j - n) K(m, n), \quad O = \frac{W - F + 2P}{S} + 1."
  },

  // SEGMENT 9: Python Libraries for ML
  "009": {
    domainName: "Python Libraries for Machine Learning",
    domainBn: "মেশিন লার্নিংয়ের অপরিহার্য পাইথন লাইব্রেরি",
    defaultAnalogy: "একজন কারিগরের কাছে আধুনিক বিদ্যুৎচালিত পাওয়ার টুলস থাকলে যেমন সে নিখুঁত ও দ্রুত কাজ করতে পারে, ডেটা সায়েন্টিস্টের কাছেও NumPy, Pandas, Matplotlib এবং Scikit-Learn হলো সেই শক্তিশালী আধুনিক হাতিয়ার যা ছাড়া বড় স্কেলে কাজ করা অসম্ভব।",
    defaultMistake: "NumPy অ্যারে বা Pandas ডেটাফ্রেমে পাইথনের প্রথাগত 'for-loop' চালানো। সর্বদা ভেক্টরাইজড অপারেশন (Vectorized Operations) ব্যবহার করতে হবে যা ভেতরের C/C++ অপটিমাইজেশনের সুবিধা নিয়ে শতগুণ দ্রুত চলে।",
    defaultExamTip: "NumPy ndarray vs Python List-এর ৩টি পার্থক্য লিখবেন (Homogeneous, Contiguous Memory, Vectorized Math) এবং Scikit-Learn-এর fit(), transform(), predict() মেথডের সুনির্দিষ্ট ভূমিকা তুলে ধরবেন।",
    defaultFormula: "\text{Vectorization Speedup: } \mathcal{O}(N) \text{ optimized C-BLAS vector execution} \gg \text{interpreted Python overhead}."
  }
};

/**
 * Determine Domain Key from Module Slug
 */
export function getDomainKey(moduleSlug = "") {
  if (!moduleSlug) return "001_001";
  if (moduleSlug.startsWith("001_001")) return "001_001";
  if (moduleSlug.startsWith("001_002")) return "001_002";
  if (moduleSlug.startsWith("001_003")) return "001_003";
  if (moduleSlug.startsWith("001_004")) return "001_004";
  if (moduleSlug.startsWith("002")) return "002";
  if (moduleSlug.startsWith("003")) return "003";
  if (moduleSlug.startsWith("004")) return "004";
  if (moduleSlug.startsWith("005")) return "005";
  if (moduleSlug.startsWith("006")) return "006";
  if (moduleSlug.startsWith("007")) return "007";
  if (moduleSlug.startsWith("008")) return "008";
  if (moduleSlug.startsWith("009")) return "009";
  return "001_001";
}

/**
 * Generate a rich, academic, and respectful bilingual explanation for any topic
 */
export function generateDomainExplanation({
  topicIndex = 0,
  topicTitle = "",
  moduleSlug = "",
  moduleTitle = ""
}) {
  const domainKey = getDomainKey(moduleSlug);
  const profile = DOMAIN_PROFILES[domainKey] || DOMAIN_PROFILES["001_001"];
  const displayTitle = topicTitle || `Topic ${topicIndex}`;

  return {
    topicNumber: topicIndex,
    titleEn: displayTitle,
    titleBn: `${displayTitle} (সহজ বাংলায় পূর্ণাঙ্গ পাঠ)`,
    subtitleBn: `${moduleTitle || profile.domainBn}: বিষয়টির সারসংক্ষেপ ও প্রয়োগবিধি`,
    simpleSummary: `সহজ কথায়, "${displayTitle}" হলো ${moduleTitle || profile.domainName}-এর একটি অত্যন্ত গুরুত্বপূর্ণ বিষয়। Machine Learning মডেলে ডেটার সঠিক রূপরেখা বজায় রাখা, গাণিতিক নিয়মের সুষ্ঠু প্রয়োগ এবং নিখুঁত ফলাফল অর্জনে এই বিষয়ের স্বচ্ছ ধারণা অপরিহার্য।`,
    coreIntuition: `বাস্তব জীবনে কোনো জটিল বৈজ্ঞানিক কাজ করার আগে যেমন প্রতিটি ভিত্তিস্তর নিখুঁতভাবে পরীক্ষা ও সাজিয়ে নিতে হয়, ঠিক তেমনই ${moduleTitle || 'মেশিন লার্নিং'}-এর এই টপিকটি অ্যালগরিদমের ভেতরের যুক্তিবোধ ও সিদ্ধান্ত গ্রহণের প্রক্রিয়াকে স্বচ্ছ ও নির্ভরযোগ্য করে তোলে।`,
    whyImportant: `Computer বা কোনো গাণিতিক Algorithm মানুষের সহজাত জ্ঞান নিয়ে কাজ করতে পারে না। যদি "${displayTitle}"-এর অন্তর্নিহিত নীতি সঠিকভাবে অনুসরণ না করা হয়, তবে Model প্রশিক্ষণকালীন বিভ্রান্তিতে পড়বে এবং বাস্তব নতুন তথ্যে ভুল সিদ্ধান্ত দেবে।`,
    keyPoints: [
      {
        title: "Theoretical Foundation & Mechanics",
        explanation: `টপিকটির গাণিতিক ভিত্তি ও মূল ধারণা পরিষ্কারভাবে অনুধাবন করে বাস্তব পাইপলাইনে সংহত করা।`
      },
      {
        title: "Practical Implementation in Python",
        explanation: `Python এবং স্ট্যান্ডার্ড লাইব্রেরি (Scikit-Learn, Pandas, NumPy) দিয়ে এই কনসেপ্ট কোডে রূপান্তর করা।`
      },
      {
        title: "Optimization & Best Practices",
        explanation: `Data Leakage এবং Overfitting এড়িয়ে মডেলের Generalization পারফরম্যান্স সর্বোচ্চ স্তরে বজায় রাখা।`
      }
    ],
    realWorldAnalogy: profile.defaultAnalogy,
    formulaOrRule: profile.defaultFormula,
    commonMistakes: profile.defaultMistake,
    examTips: profile.defaultExamTip
  };
}
