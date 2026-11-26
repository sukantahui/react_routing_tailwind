// src/common/bengaliExplanations/module_001_002.js

/**
 * Data Types and Preprocessing - Module 001_002 Curated Explanations
 */
export const MODULE_001_002_EXPLANATIONS = {
  0: {
    topicNumber: 0,
    titleEn: "Understanding Datasets",
    titleBn: "Understanding Datasets (ডেটাসেটের ধারণা)",
    subtitleBn: "Machine Learning-এর ভিত্তিপ্রস্তর: তথ্যের সুসংগঠিত সংগ্রহ",
    simpleSummary: "সহজ কথায়, একটি Dataset হলো কোনো নির্দিষ্ট ডোমেনের উপর সুশৃঙ্খলভাবে সাজানো একগুচ্ছ তথ্যের ভাণ্ডার (Structured Collection of Data)। যেমন একটি স্কুলের সমস্ত ছাত্রছাত্রীর Name, Age, Roll Number এবং Exam Marks-এর তালিকা। Computer বা Machine কোনো সহজাত বুদ্ধি নিয়ে জন্মায় না; সে এই Dataset পড়ে পড়েই অতীত অভিজ্ঞতার মাধ্যমে ভবিষ্যৎ অনুমান (Prediction) করতে শেখে।",
    coreIntuition: "একটি শিশুকে যদি আপনি Dog আর Cat-এর ছবি না দেখিয়ে বলেন 'পার্থক্য বলো', সে পারবে না। কিন্তু আপনি যদি তাকে ১,০০০টি Dog-এর ছবি এবং ১,০০০টি Cat-এর ছবি দেখিয়ে Label করে দেন কোনটি কী, তবে সে নিজে থেকেই নতুন ছবি দেখে চিনে ফেলবে। এখানে সেই ১,০০০টি ছবির সংগ্রহটাই হলো একটি Dataset।",
    whyImportant: "Machine Learning-এ একটি সুপরিচিত প্রবাদ আছে: 'Garbage In, Garbage Out' (ভুল Data দিলে Model-এর Output-ও ভুল আসবে)। আপনার Algorithm যতই উন্নত হোক না কেন, Dataset যদি Clean ও সঠিক না হয়, তবে Model কখনোই নির্ভুল Prediction দিতে পারবে না।",
    keyPoints: [
      {
        title: "Data Collection (তথ্য সংগ্রহ)",
        explanation: "Data কীভাবে সংগ্রহ করা হয়েছে—Sensor, Survey, Web Scraping নাকি Database থেকে—তা জানা জরুরি।"
      },
      {
        title: "Features বনাম Target (ইনপুট বনাম আউটপুট)",
        explanation: "যেসব তথ্যের ভিত্তিতে Model সিদ্ধান্ত নেয় সেগুলোকে Features (ইনপুট কলাম) বলে, আর যা প্রেডিক্ট করতে হয় তাকে Target বা Label বলে।"
      },
      {
        title: "Train-Test Split (ট্রেনিং ও টেস্টিং বিভাজন)",
        explanation: "সাধারণত সম্পূর্ণ Dataset-এর ৮০% অংশ Model-কে শেখানোর জন্য (Training Set) এবং বাকি ২০% অংশ Model কেমন শিখল তা যাচাইয়ের জন্য (Testing Set) আলাদা রাখা হয়।"
      }
    ],
    realWorldAnalogy: "ব্যাংকের Loan Application: ব্যাংকে যখন কেউ Loan-এর আবেদন করেন, তখন তার Age, Monthly Income, Credit Score এবং আগের Loan History জমা থাকে। হাজার হাজার পুরোনো গ্রাহকের এই রেকর্ডের খাতাটিই হলো ব্যাংকের Loan Dataset।",
    formulaOrRule: "Dataset Matrix X ∈ ℝ^{N × d}, যেখানে N হলো মোট Samples / Rows-এর সংখ্যা এবং d হলো Features / Columns-এর সংখ্যা।",
    commonMistakes: "মনে করা যে কেবল Data-র পরিমাণ (Quantity) বেশি হলেই Model ভালো হবে। আসলে Data-র গুণমান (Quality) এবং সঠিক বৈচিত্র্যই Model-এর আসল শক্তি।",
    examTips: "পরীক্ষায় Dataset-এর সংজ্ঞা লেখার সময় Features, Target Label এবং একটি ছোট 2D Table এঁকে Input/Output চিহ্নিত করে দেখালে পুরো নম্বর পাওয়া যায়।"
  },

  1: {
    topicNumber: 1,
    titleEn: "Rows, Columns and Observations",
    titleBn: "Rows, Columns এবং Observations",
    subtitleBn: "Tabular Data-র গাঠনিক একক ও 2D Matrix-এর রূপ",
    simpleSummary: "যেকোনো Tabular Data বা টেবিলের অনুভূমিক (Horizontal) লাইনগুলোকে বলা হয় Rows, আর উল্লম্ব (Vertical) লাইনগুলোকে বলা হয় Columns। প্রতিটি Row হলো একজন ব্যক্তি বা ঘটনার সামগ্রিক রেকর্ড—যাকে Machine Learning-এ Observation, Instance বা Sample বলা হয়। আর প্রতিটি Column হলো তাদের এক একটি নির্দিষ্ট বৈশিষ্ট্য—যাকে Feature বা Attribute বলা হয়।",
    coreIntuition: "ভাবুন আপনার স্কুলের Attendance Register। সেখানে এক একটি লাইনে (Row) একজন ছাত্রের সম্পূর্ণ পরিচয় থাকে (Roll 1, Rahul Sen, Attendance 95%)। আর উপরের শিরোনামগুলো (Columns) হলো Name, Roll, Attendance। অর্থাৎ প্রতিটি ছাত্র হলো একটি Observation এবং তার গুণগুলো হলো Features।",
    whyImportant: "Machine Learning Algorithm-গুলো আসলে ম্যাথমেটিক্যাল Linear Algebra এবং Matrix Calculation। যখন আমরা Rows এবং Columns পরিষ্কার বুঝতে পারি, তখন আমরা সম্পূর্ণ টেবিলটিকে সরাসরি গণিতের 2D Design Matrix-এ রূপান্তর করতে পারি।",
    keyPoints: [
      {
        title: "Observation / Instance / Sample (সারি)",
        explanation: "প্রতিটি Row একটি একক স্বতন্ত্র বাস্তব সত্তাকে প্রকাশ করে। Dataset-এ N সংখ্যক Rows মানে আমাদের কাছে N সংখ্যক স্বাধীন Samples রয়েছে।"
      },
      {
        title: "Feature / Variable / Attribute (কলাম)",
        explanation: "প্রতিটি Column কোনো বিশেষ বৈশিষ্ট্যের পরিমাপ। d সংখ্যক Columns থাকলে আমরা বলি Data-টি d-Dimensional Feature Space-এ অবস্থান করছে।"
      },
      {
        title: "2D Matrix Representation",
        explanation: "কম্পিউটারের মেমরিতে টেবিলটি X[i][j] আকারে সংরক্ষিত হয়, যেখানে i হলো Row Index (Observation) এবং j হলো Column Index (Feature)।"
      }
    ],
    realWorldAnalogy: "হাসপাতালের Patient Records: প্রতিটি বেডের রোগী হলো এক একটি Row (Observation)। আর রোগীর Blood Pressure, Body Temperature, Pulse Rate হলো এক একটি Column (Feature)।",
    formulaOrRule: "Design Matrix: X = [x_{i,j}]_{N × d}, যেখানে i ∈ {1, 2, ..., N} এবং j ∈ {1, 2, ..., d}।",
    commonMistakes: "Rows এবং Columns গুলিয়ে ফেলা। মনে রাখবেন: Row হলো Horizontal (একটি সম্পূর্ণ রেকর্ড); Column হলো Vertical (একটি একক বৈশিষ্ট্য)।",
    examTips: "Matrix Dimension N × d লেখার সময় সবসময় আগে Rows-এর সংখ্যা (N) এবং পরে Columns-এর সংখ্যা (d) উল্লেখ করবেন।"
  },

  2: {
    topicNumber: 2,
    titleEn: "Numerical Data",
    titleBn: "Numerical Data (সংখ্যাগত ডেটা)",
    subtitleBn: "পরিমাপযোগ্য তথ্য এবং গাণিতিক হিসাব-নিকাশের ভিত্তি",
    simpleSummary: "যেসব Data সরাসরি বাস্তব সংখ্যার মাধ্যমে প্রকাশিত হয় এবং যাদের মধ্যে যোগ, বিয়োগ, গুণ, ভাগ বা গড় নির্ণয়ের মতো গাণিতিক অপারেশন (Arithmetic Operations) করা অর্থপূর্ণ, সেগুলোকে Numerical Data বলে। যেমন: Age, Height, Weight, Salary, Temperature ইত্যাদি।",
    coreIntuition: "আপনার পকেটে আছে ₹50, আর আপনার বন্ধুর পকেটে ₹100। আমরা সরাসরি বলতে পারি বন্ধুর কাছে ₹50 বেশি আছে অথবা আপনার দ্বিগুণ টাকা আছে। এই যে সরাসরি বিয়োগ ও অনুপাত করা গেল, এটাই হলো Numerical Data-র মূল বৈশিষ্ট্য।",
    whyImportant: "Computer Processor এবং Linear Regression, Neural Network-এর মতো অ্যালগরিদমগুলো স্বভাবগতভাবেই কেবল Numbers বুঝতে পারে। Numerical Features থাকলে Model খুব সহজেই দুই বিন্দুর মধ্যে Euclidean Distance বা প্রবণতার Slope হিসাব করতে পারে।",
    keyPoints: [
      {
        title: "Mathematical Measurability (পরিমাপযোগ্যতা)",
        explanation: "Numerical Values-এর নিজস্ব গাণিতিক ওজন থাকে; এরা স্রেফ কোনো নাম বা প্রতীকী কোড নয়।"
      },
      {
        title: "Statistical Summary (পরিসংখ্যানিক পরিমাপ)",
        explanation: "Mean (গড়), Median (মধ্যমা), Variance (ভেদমান) এবং Standard Deviation (প্রমাণ বিচ্যুতি) সরাসরি নির্ণয় করা সম্ভব।"
      },
      {
        title: "Scaling Requirement (স্কেলিংয়ের আবশ্যকতা)",
        explanation: "Salary যদি ₹50,000 হয় আর Age যদি 25 হয়, তবে বড় সংখ্যার Salary ছোট সংখ্যার Age-কে প্রভাবিত করতে পারে, তাই Feature Scaling দরকার হয়।"
      }
    ],
    realWorldAnalogy: "আবহাওয়া কেন্দ্রের দৈনিক রিডিং: Maximum Temperature (35.5°C), Humidity (78%), Rainfall (15.2 mm)—সবকটিই Numerical Data-র চমৎকার উদাহরণ।",
    formulaOrRule: "Feature Vector x ∈ ℝ^N, যার Sample Mean μ = (1/N) ∑ x_i এবং Variance σ² = (1/N) ∑ (x_i - μ)²।",
    commonMistakes: "Phone Number বা Pin Code-কে Numerical Data মনে করা। Pin Code সংখ্যায় লেখা হলেও (যেমন 700120) দুটি পিন কোড যোগ বা গড় করার কোনো অর্থ হয় না; তাই এরা আসলে Categorical Data!",
    examTips: "Numerical Data দুই প্রকার: Discrete (গণনাযোগ্য পূর্ণসংখ্যা) এবং Continuous (পরিমাপযোগ্য বাস্তব সংখ্যা)—এই বিভাজনটি উল্লেখ করবেন।"
  },

  3: {
    topicNumber: 3,
    titleEn: "Categorical Data",
    titleBn: "Categorical Data (ক্যাটাগরিক্যাল ডেটা)",
    subtitleBn: "Nominal ও Ordinal: শ্রেণি, বিভাগ ও বৈশিষ্ট্যের প্রকারভেদ",
    simpleSummary: "যেসব Data সংখ্যা দিয়ে পরিমাপ করা যায় না, বরং ব্যক্তি বা বস্তুকে বিভিন্ন নির্দিষ্ট দল বা শ্রেণিতে (Groups / Categories) ভাগ করে, সেগুলোকে Categorical Data বলে। যেমন: Blood Group (A, B, O), Gender (Male, Female), Education Level (High School, Bachelor, Master) ইত্যাদি।",
    coreIntuition: "একটি কাপড়ের দোকানে যখন যান, পোশাকগুলো বিভিন্ন তাকে সাজানো থাকে—'Men', 'Women', 'Kids'। এই শ্রেণিবিভাগই হলো Categories। এখানে কোনো যোগ-বিয়োগ চলে না, কিন্তু দল তৈরি করে পছন্দ বোঝা যায়।",
    whyImportant: "বাস্তব জীবনের অধিকাংশ তথ্যই Categorical। কিন্তু Machine Learning Model সরাসরি Text বা String প্রসেস করতে পারে না। তাই Categorical Data-কে One-Hot Encoding বা Ordinal Encoding-এর মাধ্যমে সংখ্যায় রূপান্তর করে তবেই Model-এ দিতে হয়।",
    keyPoints: [
      {
        title: "Nominal Data (অক্রমিক ডেটা)",
        explanation: "যেসব Categories-এর মধ্যে কোনো ছোট-বড় বা স্বাভাবিক ক্রম (Natural Order) থাকে না। যেমন: Blood Group (A, B, AB, O), City (Kolkata, Delhi, Mumbai)।"
      },
      {
        title: "Ordinal Data (ক্রমিক ডেটা)",
        explanation: "যেসব Categories-এর মধ্যে একটি সুস্পষ্ট ক্রম বা মর্যাদার ধাপ থাকে। যেমন: Customer Rating (Poor < Average < Good < Excellent)।"
      },
      {
        title: "Encoding-এর প্রয়োজনীয়তা",
        explanation: "কম্পিউটারকে বোঝাতে 'Yes'-কে 1 এবং 'No'-কে 0 হিসেবে রূপান্তর করতে হয়।"
      }
    ],
    realWorldAnalogy: "রেলওয়ের ট্রেনের কোচের শ্রেণি: Sleeper (SL), AC 3 Tier (3A), AC 2 Tier (2A), First AC (1A)। এটি একটি Ordinal Category, কারণ সুবিধার একটি নির্দিষ্ট ক্রম রয়েছে।",
    formulaOrRule: "Categorical Domain: x ∈ {C_1, C_2, ..., C_K}, যেখানে K হলো স্বতন্ত্র শ্রেণির সংখ্যা (Cardinality)।",
    commonMistakes: "Nominal Data-তে জোর করে 1, 2, 3 বসিয়ে দেওয়া। এতে Model ভুল বুঝে মনে করতে পারে 3 নম্বর শহরটি 1 নম্বর শহরের চেয়ে তিনগুণ বড়!",
    examTips: "Nominal ও Ordinal Data-র তুলনামূলক ছক তৈরি করে উদাহরণ দিলে শিক্ষকরা সবচেয়ে বেশি নম্বর দেন।"
  },

  4: {
    topicNumber: 4,
    titleEn: "Discrete and Continuous Variables",
    titleBn: "Discrete and Continuous Variables",
    subtitleBn: "Counting বনাম Measuring: PMF, PDF এবং GLM-এর ভিত্তি",
    simpleSummary: "Discrete Variables হলো সেই সমস্ত সংখ্যা যা গণনা করা যায় (Countable) এবং যা পূর্ণসংখ্যায় বিচ্ছিন্ন ধাপে অবস্থান করে (যেমন একটি পরিবারের সদস্য সংখ্যা—কখনো 3.5 হতে পারে না)। অন্যদিকে Continuous Variables হলো যা কোনো স্কেলে পরিমাপ করা হয় (Measurable) এবং দুটি মানের মাঝে অসংখ্য ভগ্নাংশ মান থাকতে পারে (যেমন Height, Weight বা Time)।",
    coreIntuition: "Stairs (সিঁড়ি) বনাম Ramp (ঢালু পথ): সিঁড়ি দিয়ে উঠলে আপনি কেবল Step 1, Step 2 বা Step 3-এ পা রাখতে পারেন—এটি Discrete। আর ঢালু পথ দিয়ে উঠলে আপনি যেকোনো ভগ্নাংশ উচ্চতায় মসৃণভাবে অবস্থান করতে পারেন—এটি Continuous!",
    whyImportant: "Discrete Count Data-র জন্য সাধারণ Linear Regression ফেল করে, কারণ এটি ঋণাত্মক মান দিতে পারে; তাই Poisson GLM (Log-Link) মডেল ব্যবহার করতে হয়। আর Continuous Data-র জন্য Gaussian PDF ও Standard Regression কার্যকর।",
    keyPoints: [
      {
        title: "Discrete Random Variables & PMF",
        explanation: "মানগুলো পূর্ণসংখ্যা (Integers ∈ ℤ)। এর সম্ভাবনা বণ্টনকে PMF (Probability Mass Function) বলে, যেখানে ∑ P(X = k) = 1.0।"
      },
      {
        title: "Continuous Random Variables & PDF",
        explanation: "মানগুলো বাস্তব সংখ্যার অবিচ্ছিন্ন রেঞ্জে থাকে (Reals ∈ ℝ)। এর সম্ভাবনা ঘনত্বকে PDF (Probability Density Function) বলে, যেখানে ∫ f(x) dx = 1.0।"
      },
      {
        title: "Zero-Probability Paradox (জিরো-প্রোবাবিলিটি প্যারাডক্স)",
        explanation: "Continuous Variable-এ একটি নিখুঁত একক নির্দিষ্ট বিন্দুর সম্ভাবনা গাণিতিকভাবে শূন্য: P(X = c) = 0; কেবল Interval বা ক্ষেত্রফলের মাধ্যমেই সম্ভাবনা মাপা হয়।"
      }
    ],
    realWorldAnalogy: "একটি বাস স্টপেজে কতজন যাত্রী বাসের অপেক্ষায় আছেন—এটি Discrete (যেমন 7 জন)। কিন্তু পরবর্তী বাসটি আসতে কত মিনিট সময় লাগবে—এটি Continuous (যেমন 6.45 মিনিট)।",
    formulaOrRule: "Discrete PMF: ∑_{k} p_k = 1.0 | Continuous PDF: ∫_{-∞}^{∞} f(x) dx = 1.0 | Poisson Link: ln(λ) = w^T x।",
    commonMistakes: "জুতার সাইজ (যেমন 6, 7, 8, 9) পরিমাপ মনে হলেও এটি Discrete, কারণ 7.234 সাইজের জুতো বাস্তবসম্মত নয়; নির্দিষ্ট ধাপেই থাকে।",
    examTips: "Discrete-এর সাথে Summation (∑) এবং Continuous-এর সাথে Integration (∫) প্রতীকের পার্থক্যটি খাতায় স্পষ্ট করে লিখবেন।"
  },

  5: {
    topicNumber: 5,
    titleEn: "Structured and Unstructured Data",
    titleBn: "Structured and Unstructured Data",
    subtitleBn: "Tabular Database বনাম Images, Audio, Video ও Text",
    simpleSummary: "Structured Data হলো সেই সমস্ত তথ্য যা একটি পূর্বনির্ধারিত ছকে—অর্থাৎ Rows এবং Columns-এর টেবিলে (যেমন SQL Database, Excel CSV)—সুসংগঠিতভাবে সাজানো থাকে। আর Unstructured Data হলো যার কোনো টেবিলের ছক থাকে না—যেমন Emails, Social Media Posts, Photographs, Voice Recordings বা Videos।",
    coreIntuition: "একটি সাজানো লাইব্রেরি যেখানে প্রতিটি বই ক্যাটাগরি ও আলমারির নম্বর অনুযায়ী সাজানো—এটি Structured Data। আর একটি পুরোনো ড্রয়ার যেখানে এলোমেলোভাবে চিঠি, ছবি ও খবরের কাগজের কাটিং রাখা—এটি Unstructured Data।",
    whyImportant: "বিশ্বের প্রায় ৮০% নতুন ডেটাই Unstructured! সাধারণ Machine Learning অ্যালগরিদম কেবল Structured Tabular Data বুঝতে পারে। কিন্তু আধুনিক Deep Learning (CNN, Transformers, LLM) তৈরি হয়েছে এই Unstructured ছবি, অডিও ও ভাষাকে ভেক্টরে রূপান্তর করে প্রসেস করার জন্য।",
    keyPoints: [
      {
        title: "Structured Data (গঠনযুক্ত)",
        explanation: "সহজে Searchable, কম মেমোরি লাগে, রিলেশনাল ডাটাবেসে SQL Query দিয়ে দ্রুত ফিল্টার করা যায়।"
      },
      {
        title: "Unstructured Data (গঠনহীন)",
        explanation: "প্রচুর মেমোরি লাগে, Feature Extraction ও Deep Learning Embeddings ছাড়া সরাসরি অ্যানালাইসিস অসম্ভব।"
      },
      {
        title: "Semi-Structured Data (আধা-গঠনযুক্ত)",
        explanation: "যেমন JSON বা XML ফাইল—যেখানে টেবিল নেই, তবে Key-Value Pairs ও Tags-এর মাধ্যমে আংশিক গঠন থাকে।"
      }
    ],
    realWorldAnalogy: "ব্যাংকের পাসবুকের লেনদেনের স্টেটমেন্ট হলো Structured Data। কিন্তু ব্যাংকের চেকের সইয়ের ছবি বা কাস্টমার সাপোর্টে গ্রাহকের অডিও কল রেকর্ডিং হলো Unstructured Data।",
    formulaOrRule: "Structured: 2D Matrix X ∈ ℝ^{N × d} | Unstructured Image: 3D/4D Tensor (Height × Width × Channels)।",
    commonMistakes: "Text File মানেই Structured মনে করা। কাস্টমার রিভিউ বা আর্টিকেল সম্পূর্ণ আনস্ট্রাকচার্ড মুক্ত টেক্সট।",
    examTips: "তিনটি স্তরের উদাহরণ মনে রাখবেন: Structured = CSV/SQL; Semi-Structured = JSON/XML; Unstructured = Images/Audio/Video।"
  },

  6: {
    topicNumber: 6,
    titleEn: "Data Preprocessing Concept",
    titleBn: "Data Preprocessing Concept",
    subtitleBn: "Garbage In, Garbage Out: কাঁচা ডেটা থেকে ক্লিন ডেটাসেট তৈরির পাইপলাইন",
    simpleSummary: "বাস্তব জগৎ থেকে সংগৃহীত Raw Data থাকে অত্যন্ত অপরিষ্কার, অসম্পূর্ণ এবং ত্রুটিপূর্ণ। সেই Raw Data-কে Clean করে, Missing Values পূরণ করে, Outliers হ্যান্ডেল করে, Features স্কেলিং করে এবং Algorithm-এর উপযোগী বানানোর সম্পূর্ণ বৈজ্ঞানিক প্রক্রিয়াকেই Data Preprocessing বলে।",
    coreIntuition: "বাজার থেকে আনা কাঁচা শাকসবজি আপনি সরাসরি কড়াইতে দিয়ে রান্না করেন না। প্রথমে সেগুলোকে বাছেন, পচা অংশ বাদ দেন, ভালো করে ধুয়ে পরিষ্কার করেন, তারপর কেটে মশলা মাখিয়ে রান্না করেন। এই বাছা, ধোয়া ও কাটার কাজটাই হলো Data Preprocessing!",
    whyImportant: "একজন Data Scientist বাস্তব কাজের ৮০% সময় ব্যয় করেন Data Preprocessing-এ। ডেটা যদি ত্রুটিপূর্ণ থাকে, তবে পৃথিবীর সবচেয়ে শক্তিশালী AI Model-ও ভুল ফলাফল দেবে। ভালো Preprocessing মানেই Model-এর উচ্চ Accuracy।",
    keyPoints: [
      {
        title: "Data Cleaning (পরিশোধন)",
        explanation: "Missing Values হ্যান্ডেল করা, Duplicate Records মুছে ফেলা এবং Typos সংশোধন করা।"
      },
      {
        title: "Feature Transformation & Scaling",
        explanation: "Skewed Data-কে স্বাভাবিক রূপ দেওয়া এবং সব ফিচারের স্কেলকে সমতায় আনা।"
      },
      {
        title: "Categorical Encoding",
        explanation: "Text Categories-কে সংখ্যায় রূপান্তর করা যাতে গাণিতিক মডেল হিসাব করতে পারে।"
      }
    ],
    realWorldAnalogy: "কারখানায় অপরিশোধিত খনিজ তেল (Crude Oil) সরাসরি গাড়িতে ব্যবহার করা যায় না; Refinery-তে শোধন করে Petrol ও Diesel বানাতে হয়। Preprocessing হলো সেই Data Refinery।",
    formulaOrRule: "Data Pipeline: Raw Data (Noise, NaN, Unscaled) ➔ Clean Design Matrix X* for Training.",
    commonMistakes: "Preprocessing স্কিপ করে সরাসরি `model.fit()` চালানো। এতে কোড রান করলেও Model অবাস্তব ভুল Prediction দেয়।",
    examTips: "Preprocessing Pipeline-এর ৪টি মূল স্তম্ভ (Cleaning, Transformation, Scaling, Encoding) ফ্লোচার্ট একে দেখালে চমৎকার নম্বর পাওয়া যায়।"
  },

  7: {
    topicNumber: 7,
    titleEn: "Data Cleaning",
    titleBn: "Data Cleaning (ডেটা ক্লিন করার পদ্ধতি)",
    subtitleBn: "Noise, Typos ও পরিমাপের ত্রুটি দূরীকরণের প্রথম সুরক্ষা স্তর",
    simpleSummary: "Data Collection-এর সময় টাইপিং মিস্টেক, বিভিন্ন সফটওয়্যারের ফরম্যাটের অমিল কিংবা সেন্সরের গণ্ডগোলের কারণে ডেটায় যেসব অসংগতি তৈরি হয়, সেগুলোকে খুঁজে বের করে সংশোধন বা বর্জন করার প্রক্রিয়াকেই Data Cleaning (বা Data Scrubbing) বলে।",
    coreIntuition: "কেউ ঠিকানার ঘরে লিখেছেন 'Kolkata', কেউ লিখেছেন 'calcutta', কেউ আবার ভুল টাইপ করে লিখেছেন 'Kolkatta'। মানুষ দেখে বুঝতে পারছে তিনটিই এক শহর, কিন্তু কম্পিউটার এগুলোকে ৩টি সম্পূর্ণ ভিন্ন শহর মনে করবে! Data Cleaning-এর কাজ হলো সবগুলোকে স্ট্যান্ডার্ডাইজ করে 'Kolkata' বানিয়ে দেওয়া।",
    whyImportant: "Noise ও ভুল তথ্য থাকলে মডেলে Attenuation Bias তৈরি হয়—অর্থাৎ Regression Coefficients সত্য মানের চেয়ে ছোট হয়ে সংকুচিত হয়ে যায় এবং মডেল বাস্তব সম্পর্ক ধরতে ব্যর্থ হয়।",
    keyPoints: [
      {
        title: "String Normalization",
        explanation: "অপ্রয়োজনীয় White Spaces মুছে ফেলা (`.strip()`) এবং সব ক্যারেক্টার Lowercase করা।"
      },
      {
        title: "Fuzzy String Matching",
        explanation: "Levenshtein Distance পরিমাপ করে টাইপোযুক্ত শব্দকে মূল শব্দের সাথে মেলানো।"
      },
      {
        title: "Domain Constraint Filtering",
        explanation: "যেমন Age যদি -5 বা 250 হয়, তবে তা অবাস্তব বিধায় ফিল্টার করে সংশোধন করা।"
      }
    ],
    realWorldAnalogy: "পরীক্ষার খাতা স্ক্যান করার সময় OMR শিটের কাটাকুটি বা অস্পষ্ট রোল নম্বর সফটওয়্যার দিয়ে ভেরিফাই করে সঠিক তালিকায় তোলার মতোই হলো Data Cleaning।",
    formulaOrRule: "Levenshtein Distance D(i, j) = min { Delete + 1, Insert + 1, Substitute + cost }।",
    commonMistakes: "ক্লিনিংয়ের নামে চোখ বন্ধ করে `df.dropna()` চালিয়ে সব Rows মুছে ফেলা। এতে মূল ডেটাসেটের ৬০-৭০% গুরুত্বপূর্ণ তথ্যই নষ্ট হয়ে যেতে পারে!",
    examTips: "Levenshtein Distance এবং Attenuation Bias শব্দ দুটি উল্লেখ করে উদাহরণ দেবেন।"
  },

  8: {
    topicNumber: 8,
    titleEn: "Handling Missing Values",
    titleBn: "Handling Missing Values (মিসিং ভ্যালু সামলানো)",
    subtitleBn: "MCAR, MAR এবং MNAR: তথ্যের শূন্যতার বৈজ্ঞানিক বিশ্লেষণ",
    simpleSummary: "সার্ভে ফর্ম পূরণ করার সময় কেউ হয়তো তার Income গোপন রেখেছেন, কিংবা Sensor বন্ধ থাকায় কিছু রিডিং রেকর্ড হয়নি। ডেটাসেটের এই ফাঁকা বা শূন্য ঘরগুলোকে Missing Values (বা NaN / Null) বলা হয়। কীভাবে এই শূন্যস্থান পূরণ করতে হয় বা বাদ দিতে হয়, তা এখানে শেখানো হয়।",
    coreIntuition: "পরীক্ষার খাতায় কোনো ছাত্র একটি প্রশ্নের উত্তর ফাঁকা রেখেছে। এখন শিক্ষক হিসেবে আপনি কি তাকে শূন্য দেবেন, নাকি অন্য প্রশ্নের উত্তরের মান দেখে একটি ন্যায্য নম্বর অনুমান করবেন, নাকি ওই প্রশ্নটাই মূল্যায়ন থেকে বাদ দেবেন? Missing Values হ্যান্ডেল করা ঠিক তেমনই সিদ্ধান্ত।",
    whyImportant: "Scikit-Learn-এর অধিকাংশ অ্যালগরিদম ইনপুটে NaN পেলে সরাসরি `ValueError` দিয়ে ক্র্যাশ করে। আবার ভুলভাবে মিসিং মান পূরণ করলে ডেটার নিজস্ব Variance নষ্ট হয়ে যায়।",
    keyPoints: [
      {
        title: "MCAR (Missing Completely at Random)",
        explanation: "সম্পূর্ণ আকস্মিক মিসিং, যার সাথে অন্য কোনো বৈশিষ্ট্যের সম্পর্ক নেই (যেমন হঠাৎ বিদ্যুৎ চলে যাওয়া)।"
      },
      {
        title: "MAR (Missing at Random)",
        explanation: "মিসিং হওয়ার কারণ অন্য কোনো কলামের উপর নির্ভরশীল (যেমন মহিলারা আয়ের ঘর ফাঁকা রাখলেও বয়সের সাথে তার যোগসূত্র থাকে)।"
      },
      {
        title: "MNAR (Missing Not at Random)",
        explanation: "মিসিং হওয়ার কারণ ওই কলামটির নিজস্ব গোপন স্বভাবের জন্য (যেমন খুব ধনী ব্যক্তিরাই ইচ্ছাকৃতভাবে আয়ের ঘর খালি রেখেছেন)।"
      }
    ],
    realWorldAnalogy: "মেডিকেল টেস্টে রোগীর Fasting Sugar রিডিং মিসিং। রোগী যদি খেয়ে আসার কারণে টেস্ট না হয় তবে তা MAR; আর ল্যাবরেটরির টেস্ট টিউব ভেঙে গেলে তা MCAR।",
    formulaOrRule: "Listwise Deletion Loss: N_{clean} = N ∏_{j=1}^d (1 - p_j) ⟹ বহুমাত্রিক ডেটায় সব সারি হারিয়ে যায়।",
    commonMistakes: "MNAR পরিস্থিতিতে সরাসরি Mean বসিয়ে দেওয়া। এতে ডেটাসেটে তীব্র Survivor Bias তৈরি হয়।",
    examTips: "Donald Rubin-এর ৩টি মিসিং মেকানিজম (MCAR, MAR, MNAR)-এর সংজ্ঞা ও পার্থক্য পরীক্ষায় প্রায়ই আসে।"
  },

  9: {
    topicNumber: 9,
    titleEn: "Mean, Median and Mode Imputation",
    titleBn: "Mean, Median এবং Mode Imputation",
    subtitleBn: "Central Tendency-র মাধ্যমে শূন্যস্থান পূরণের গাণিতিক যুক্তি",
    simpleSummary: "Missing Values দূর করার সবচেয়ে কার্যকর প্রাথমিক উপায় হলো পরিসংখ্যানের Central Tendency (গড়, মধ্যমা বা প্রচুরক) দিয়ে ফাঁকা ঘর পূরণ করা। সাধারণ সিমেট্রিক ডেটায় Mean, চরম Outliers বা Skewed ডেটায় Median, এবং Categorical ডেটায় Mode ব্যবহার করা হয়।",
    coreIntuition: "ধরা যাক একটি ডেটাসেটে ৫ জন কর্মীর মাসিক বেতন যথাক্রমে ₹২০,০০০, ₹২২,০০০, ₹২১,০০০, ₹২৩,০০০ এবং একজনের অস্বাভাবিক উচ্চ মান ₹১০,০০,০০০ (একটি চরম Outlier)। এখানে সাধারণ গড় (Mean) হিসাব করলে দাঁড়াবে ₹২,১৭,২০০—যা বাকি কর্মীদের বাস্তব বেতনের সম্পূর্ণ বিকৃত চিত্র তুলে ধরে! কিন্তু মধ্যমা (Median) নিলে মান আসে ₹২২,০০০, যা অধিকাংশ সাধারণ রেকর্ডের নিখুঁত ও বাস্তবসম্মত প্রতিনিধিত্ব করে। এই কারণেই Outlier যুক্ত ডেটায় Mean-এর বদলে Median Imputation ব্যবহার করা হয়।",
    whyImportant: "গাণিতিক প্রমাণ রয়েছে: Squared Error (L2 Loss) কমাতে Sample Mean সর্বোত্তম, Absolute Error (L1 Loss) কমাতে Sample Median সবচেয়ে Robust, এবং 0-1 Classification Loss কমাতে Mode সবচেয়ে সেরা।",
    keyPoints: [
      {
        title: "Mean Imputation (গড় প্রয়োগ)",
        explanation: "Normal Distribution-এর জন্য আদর্শ, তবে চরম Outlier-এর টানে সহজেই বিভ্রান্ত হয়।"
      },
      {
        title: "Median Imputation (মধ্যমা প্রয়োগ)",
        explanation: "Outlier-Resistant (Robust)। Salary বা House Price-এর মতো Skewed ডেটায় এটি সেরা।"
      },
      {
        title: "Mode Imputation (প্রচুরক প্রয়োগ)",
        explanation: "Categorical বা Text কলামে সর্বাধিক ঘটে যাওয়া Category-টি বসিয়ে ফাঁকা পূরণ করা হয়।"
      },
      {
        title: "Variance Deflation (ভ্যারিয়েন্স সংকোচন)",
        explanation: "একই গড় মান বারবার বসালে ডেটার নিজস্ব বৈচিত্র্য কৃত্রিমভাবে কমে যায়: Var(X_{imputed}) = (1 - p) Var(X_{obs})।"
      }
    ],
    realWorldAnalogy: "ক্লাসের কোনো ছাত্র অসুস্থতার জন্য একটি পরীক্ষায় বসতে পারেনি। তার নম্বরের ঘরে পুরো ক্লাসের Median Marks বসিয়ে রেজাল্ট প্রস্তুত করা।",
    formulaOrRule: "L2 Loss: argmin_c ∑ (x_i - c)² ⟹ c* = Mean | L1 Loss: argmin_c ∑ |x_i - c| ⟹ c* = Median।",
    commonMistakes: "চরম Outliers থাকা কোনো কলামে (যেমন Salary বা House Prices) সরাসরি Mean Imputation ব্যবহার করা। এতে ফাঁকা ঘরে অবাস্তব বড় মান বসে পুরো ডেটাসেটের বিশ্লেষণ বিকৃত করে।",
    examTips: "Variance Deflation Theorem: Var(X_{imputed}) = (1 - p) Var(X_{obs}) সমীকরণটি খাতায় লিখলে পুরো নম্বর মিলবে।"
  },

  10: {
    topicNumber: 10,
    titleEn: "Removing Duplicate Records",
    titleBn: "Removing Duplicate Records (Deduplication)",
    subtitleBn: "Data Leakage ও Overfitting রোধে নকল রেকর্ড ছাঁটাই",
    simpleSummary: "একই ব্যক্তি বা ঘটনার হুবহু একই তথ্য ডেটাসেটে ভুলবশত একাধিকবার ঢুকে পড়লে তাকে Duplicate Record বলে। Data Preprocessing-এর সময় এই অতিরিক্ত নকল কপিগুলোকে মুছে কেবল একটি মূল রেকর্ড সংরক্ষণ করার প্রক্রিয়াকেই Deduplication বলে।",
    coreIntuition: "ভোটার তালিকায় যদি একই ব্যক্তির নাম ও ছবি ৩ বার থাকে, তবে সে বেআইনিভাবে ৩টি ভোট দেওয়ার সুযোগ পাবে এবং নির্বাচনের ফল বিকৃত হবে। Dataset-এও ডুপ্লিকেট রেকর্ড থাকলে Model সেই নির্দিষ্ট ঘটনাটিকে অতিরিক্ত গুরুত্ব দিয়ে ফেলে।",
    whyImportant: "ডুপ্লিকেটের সবচেয়ে মারাত্মক পরিণতি হলো Data Leakage। যদি একই রেকর্ড Training Set এবং Testing Set উভয় জায়গাতেই থেকে যায়, তবে Model নকল করে টেস্টে ১০০% নম্বর পেয়ে যাবে, কিন্তু বাস্তবে নতুন ডেটায় শোচনীয়ভাবে ফেল করবে (Overfitting)।",
    keyPoints: [
      {
        title: "Exact Duplicates (হুবহু নকল)",
        explanation: "যেখানে সারির প্রতিটি কলামের মান অন্য একটি সারির সাথে হুবহু মিলে যায়।"
      },
      {
        title: "Partial / Key Duplicates (আংশিক নকল)",
        explanation: "যেখানে Customer ID বা Email ID এক, কিন্তু নামের বানানে সামান্য স্পেসের অমিল রয়েছে।"
      },
      {
        title: "Unique Primary Key Audit",
        explanation: "রোল নম্বর বা কাস্টমার আইডির ইউনিকনেস ভেরিফাই করে ডুপ্লিকেট চিহ্নিত করা।"
      }
    ],
    realWorldAnalogy: "অনলাইনে ট্রেনের টিকিট কাটার সময় পেমেন্ট সার্ভার হ্যাং করায় আপনি পরপর দুবার সাবমিট বোতাম চাপলেন। সিস্টেমে আপনার নামে দুটো একই টিকিট কাটা ঠেকাতে Deduplication কাজ করে।",
    formulaOrRule: "Pandas: `df.drop_duplicates(subset=[...], keep='first')`।",
    commonMistakes: "Auto-Increment Serial ID কলাম সহ ডুপ্লিকেট খোঁজা। যেহেতু সিরিয়াল নম্বর 1, 2, 3 আলাদা হয়, তাই অন্য সব কলাম এক থাকলেও সিস্টেম ডুপ্লিকেট ধরতে পারে না!",
    examTips: "Data Leakage কাকে বলে এবং কেন ডুপ্লিকেট রেকর্ড ড্রপ করা জরুরি—এই দুটি বিষয় যুক্ত করে লিখবেন।"
  },

  11: {
    topicNumber: 11,
    titleEn: "Detecting Inconsistent Data",
    titleBn: "Detecting Inconsistent Data (অসঙ্গতিপূর্ণ ডেটা)",
    subtitleBn: "লজিক্যাল রুলস ও ক্রস-ফিল্ড ভ্যালিডেশনের মাধ্যমে ভুল ধরা",
    simpleSummary: "ডেটাসেটের কিছু মান এককভাবে সংখ্যা বা টেক্সট হিসেবে বৈধ মনে হলেও সামগ্রিক যুক্তির বিচারে অসম্ভব বা স্ববিরোধী ঠেকে। যেমন: কারো Age লেখা 4 বছর, অথচ তার Education Level লেখা 'PhD'! অথবা Gender লেখা 'Male', অথচ Medical Diagnosis লেখা 'Pregnant'। এই স্ববিরোধী তথ্যই হলো Inconsistent Data।",
    coreIntuition: "একটি ফর্মে লেখা: জন্ম সাল 2010, আর বর্তমান বয়স 45 বছর! মানুষের চোখ দেখলেই বোঝে এখানে কোথাও ভুল হয়েছে। Machine Learning-এ অ্যালগরিদম চালানোর পূর্বে এই যুক্তিহীন ভুলগুলো নির্মূল করতে হয়।",
    whyImportant: "Computer কোনো যুক্তি বোঝে না। সে যদি ভুল ও স্ববিরোধী ডেটা দেখে শেখে, তবে বাস্তব প্রয়োগের সময় সে বিপজ্জনক ভুল সিদ্ধান্ত নেবে। বিশেষ করে Banking, Healthcare এবং Autonomous Systems-এ এর প্রভাব মারাত্মক।",
    keyPoints: [
      {
        title: "Range Validation (পরিসীমা যাচাই)",
        explanation: "যেমন: Exam Marks সর্বদা 0 থেকে 100-এর মধ্যে এবং Human Age 0 থেকে 120-এর মধ্যে থাকা বাধ্যতামূলক।"
      },
      {
        title: "Cross-Field Consistency (পারস্পরিক শর্ত)",
        explanation: "একটি কলামের সত্যতা অন্য কলামের মানের উপর শর্তসাপেক্ষে নির্ভর করে (Rule-Based Validation)।"
      },
      {
        title: "Temporal Inconsistency (সময়ের অসংগতি)",
        explanation: "যেমন হাসপাতালে ভর্তির তারিখের (Admission Date) আগেই যদি ছাড়ার তারিখ (Discharge Date) লেখা থাকে!"
      }
    ],
    realWorldAnalogy: "বিদ্যুৎ বিলের মিটারে চলতি মাসের রিডিং যদি আগের মাসের রিডিংয়ের চেয়ে কম আসে, তবে বুঝতে হবে রিডিং লেখায় চরম অসঙ্গতি হয়েছে।",
    formulaOrRule: "Validation Rule: IF Age < 18 THEN Married == False (Domain Constraint Check)।",
    commonMistakes: "কেবল Data Type চেক করেই নিশ্চিন্ত হওয়া। ডেটাটি Integer হলেও তার মান যে বাস্তবসম্মত নয়, সেই Business Logic চেক না করা।",
    examTips: "৩টি প্রধান অসঙ্গতির উদাহরণ দেবেন: Range Violation, Cross-Field Contradiction এবং Temporal Violation।"
  },

  12: {
    topicNumber: 12,
    titleEn: "Outlier Concept",
    titleBn: "Outlier Concept (ব্যতিক্রমী মানের ধারণা)",
    subtitleBn: "চরম মান: কখন ক্ষতিকর ত্রুটি আর কখন মহামূল্যবান আবিষ্কার?",
    simpleSummary: "একটি ডেটাসেটের অধিকাংশ তথ্য যেখানে একটি নির্দিষ্ট সীমার মধ্যে ঘোরাফেরা করে, সেখানে দু-একটি মান যদি সাধারণ দল থেকে অবিশ্বাস্য রকমের দূরে বা ব্যতিক্রমী হয়ে অবস্থান করে, তবে সেগুলোকে Outlier বা চরম মান বলা হয়।",
    coreIntuition: "একটি ক্লাসের সব ছাত্রের উচ্চতা 5 ফুট থেকে 6 ফুটের মধ্যে। হঠাৎ ক্লাসে যদি 8 ফুট লম্বা একজন মানুষ কিংবা 1 ফুট উচ্চতার কেউ আসেন, তবে তিনি পুরো দলের সাধারণ ছক ভেঙে আলাদা নজরে পড়বেন। তিনিই হলেন পরিসংখ্যানের Outlier।",
    whyImportant: "Outlier-কে সবসময় শত্রু ভাবা ভুল! Credit Card Fraud Detection বা সাইবার আক্রমণ শনাক্তকরণে Outlier-ই হলো আমাদের প্রধান লক্ষ্য। কিন্তু সাধারণ Linear Regression বা K-Means-এ একটিমাত্র চরম Outlier পুরো মডেলের সমীকরণকে টেনে নষ্ট করে দিতে পারে।",
    keyPoints: [
      {
        title: "Natural Outliers (প্রাকৃতিক ব্যতিক্রম)",
        explanation: "বাস্তবেই সত্য, তবে দুর্লভ ঘটনা। যেমন: কোনো কর্মীর কোটি টাকার বোনাস বা ক্রিকেট ম্যাচে কোনো ব্যাটসম্যানের 400 রান।"
      },
      {
        title: "Measurement / Error Outliers (ভুলজনিত)",
        explanation: "টাইপিং মিস্টেক বা সেন্সরের ত্রুটি। যেমন: ওজন লিখতে গিয়ে ভুল করে 65-এর বদলে 650 কেজি লিখে ফেলা!"
      },
      {
        title: "L2 Loss Sensitivity",
        explanation: "Linear Regression-এর Squared Error দূরত্বের বর্গ নেয়, ফলে একটি Outlier পুরো লাইনকে নিজের দিকে টেনে নেয়।"
      }
    ],
    realWorldAnalogy: "ফুটপাতের চায়ের গড় দাম ₹10 থেকে ₹20। কিন্তু 5-Star হোটেলে সেই এক কাপ চায়ের দাম ₹800। সাধারণ চায়ের ডেটাসেটে এটি একটি চরম Outlier।",
    formulaOrRule: "Outlier Condition: Distance |x_i - μ| > 3σ (Three-Sigma Rule-এর বাইরে অবস্থানকারী মান)।",
    commonMistakes: "Outlier দেখলেই না বুঝে ডিলিট করে দেওয়া। Fraud Detection ডেটাসেটে Outlier মুছে ফেললে জালিয়াতি আর কখনোই ধরা যাবে না!",
    examTips: "Outlier-এর দ্বৈত চরিত্র উল্লেখ করবেন: সাধারণ রিগ্রেশনে ক্ষতিকর, কিন্তু Anomaly Detection-এ অত্যন্ত মূল্যবান।"
  },

  13: {
    topicNumber: 13,
    titleEn: "Basic Outlier Detection",
    titleBn: "Basic Outlier Detection (Z-Score & IQR)",
    subtitleBn: "Z-Score এবং Interquartile Range (বক্সপ্লট) পদ্ধতির প্রয়োগ",
    simpleSummary: "কোনো ডেটা পয়েন্ট Outlier কিনা তা অনুমানের বদলে সুনির্দিষ্ট গাণিতিক নিয়মে বের করা হয়। এর প্রধান দুটি বৈজ্ঞানিক উপায় হলো: (১) Z-Score পদ্ধতি (Bell-shaped Normal Distribution-এর জন্য) এবং (২) IQR বা Interquartile Range পদ্ধতি (যেকোনো Skewed বা সাধারণ ডেটার জন্য)।",
    coreIntuition: "Z-Score আপনাকে বলে দেয় কোনো মান তার Mean থেকে কত কদম (Standard Deviation) দূরে দাঁড়িয়ে আছে। যদি সে 3 কদমের বেশি দূরে চলে যায়, তবে সে সন্দেহভাজন। আর IQR হলো মাঝখানের 50% শিক্ষার্থীর বিস্তার; তার 1.5 গুণের সীমানা পেরোলেই সে Outlier।",
    whyImportant: "ম্যানুয়ালি লাখ লাখ সারি পরীক্ষা করা অসম্ভব। কোডিংয়ে অ্যালগরিদম দিয়ে স্বয়ংক্রিয়ভাবে Outlier চিহ্নিত করে ডেটা ক্লিন করতে এই দুটি পরিসংখ্যানিক পদ্ধতি বিশ্বজুড়ে ব্যবহৃত হয়।",
    keyPoints: [
      {
        title: "Z-Score Method",
        explanation: "সূত্র z = (x - μ) / σ। যদি |z| > 3 হয়, তবে পয়েন্টটিকে নিশ্চিত Outlier গণ্য করা হয়।"
      },
      {
        title: "IQR (Interquartile Range) Method",
        explanation: "IQR = Q3 - Q1। Lower Fence = Q1 - 1.5 × IQR এবং Upper Fence = Q3 + 1.5 × IQR।"
      },
      {
        title: "Box Plot Visualization",
        explanation: "Box Plot-এর দুই পাশের গোঁফ (Whiskers)-এর বাইরে ছিটকে যাওয়া বিন্দুগুলোই হলো Outliers।"
      }
    ],
    realWorldAnalogy: "স্কুলের পরীক্ষায় ৯৯% ছাত্রছাত্রী ৩০ থেকে ৮০-এর মধ্যে নম্বর পেয়েছে। একজন পেয়েছে ১০০ আর একজন ০। Box Plot-এ এই ০ ও ১০০ আলাদা বিন্দু হয়ে ফুটে উঠবে।",
    formulaOrRule: "Z-Score: z = \frac{x - \mu}{\sigma} | IQR Fence: [Q_1 - 1.5 \cdot IQR, \; Q_3 + 1.5 \cdot IQR]।",
    commonMistakes: "মারাত্মক Skewed ডেটায় Z-Score ব্যবহার করা। মনে রাখবেন: Skewed ডেটায় সবসময় IQR পদ্ধতিই সেরা এবং নির্ভরযোগ্য।",
    examTips: "1.5 × IQR কেন নেওয়া হয়? উত্তর: কারণ এটি Normal Distribution-এর প্রায় 99.3% ডেটা কভার করে এবং মাত্র 0.7% চরম মানকে Outlier হিসেবে চিহ্নিত করে।"
  },

  14: {
    topicNumber: 14,
    titleEn: "Data Transformation",
    titleBn: "Data Transformation (Log & Power Transforms)",
    subtitleBn: "Skewed ডেটাকে Normal Distribution-এ রূপান্তরের কৌশল",
    simpleSummary: "বাস্তব ডেটাসেটে অধিকাংশ মান একদিকে গাদাগাদি করে থাকে এবং লম্বা একটি লেজ অন্য প্রান্তে চলে যায় (যেমন Salary বা House Prices—যেখানে অধিকাংশ মান একটি নির্দিষ্ট স্বাভাবিক পরিসরে থাকলেও অল্প কিছু চরম উচ্চ মান (High-Value Outliers) থাকে)। এই Skewed ডেটাকে গণিতের বিশেষ ফাংশন (যেমন Log বা Box-Cox) দিয়ে চেপে Bell-shaped Normal Distribution-এ রূপ দেওয়াকেই Data Transformation বলে।",
    coreIntuition: "একটি স্প্রিংকে জোরে টানলে যেমন একদিকে লম্বা হয়ে বাঁকা হয়ে যায়, আপনি যদি দুই হাত দিয়ে তাকে চেপে স্বাভাবিক গোল আকারে ফিরিয়ে আনেন, তবে স্প্রিংটি স্থিতিশীল হয়। Transformation ঠিক তেমনই ডেটার লম্বা লেজকে (Tail) চেপে স্বাভাবিক করে দেয়।",
    whyImportant: "Linear Regression এবং বহু Machine Learning অ্যালগরিদম ধরে নেয় যে Residuals বা Features-এর বণ্টন Normal হবে। ডেটা যদি প্রচণ্ড Skewed হয়, তবে Model ছোট মানের সূক্ষ্ম পার্থক্যগুলো বুঝতেই পারে না।",
    keyPoints: [
      {
        title: "Log Transformation",
        explanation: "y = log(x + 1)। Right-Skewed ডেটায় বিশাল মানের প্রভাব কমিয়ে স্বাভাবিক রূপ দেয়।"
      },
      {
        title: "Box-Cox & Yeo-Johnson Transformation",
        explanation: "পাওয়ার ট্রান্সফর্মেশন যা স্বয়ংক্রিয়ভাবে সেরা পাওয়ার প্যারামিটার (λ) অপ্টিমাইজ করে।"
      },
      {
        title: "Homoscedasticity (সম-বিস্তার)",
        explanation: "মডেলের ভুলের বিস্তারকে (Error Variance) সব মানের জন্য সমরূপ রাখা।"
      }
    ],
    realWorldAnalogy: "ভূমিকম্পের তীব্রতা মাপার Richter Scale: 6 মাত্রার চেয়ে 7 মাত্রা মানে ১০ গুণ বেশি শক্তি! Log Scale ব্যবহারে বিশাল শক্তির পার্থক্যও সহজে সাধারণ সংখ্যায় প্রকাশ করা যায়।",
    formulaOrRule: "Log1p: x' = \ln(1 + x) | Box-Cox: y^{(\lambda)} = \frac{y^\lambda - 1}{\lambda} (কেবল y > 0 এর জন্য)।",
    commonMistakes: "শূন্য বা ঋণাত্মক সংখ্যা থাকা সত্ত্বেও সরাসরি `np.log(x)` চালানো। এতে NaN বা -inf এরর আসে; তাই সবসময় `np.log1p(x)` ব্যবহার করতে হয়।",
    examTips: "Box-Cox কেবল ধনাত্মক (Positive) মানে কাজ করে, আর Yeo-Johnson ঋণাত্মক (Negative) মানেও কাজ করে—এই পয়েন্টটি মনে রাখবেন।"
  },

  15: {
    topicNumber: 15,
    titleEn: "Feature Scaling",
    titleBn: "Feature Scaling (ফিচার স্কেলিং)",
    subtitleBn: "Scale Dominance রোধ: বিভিন্ন এককের বৈশিষ্ট্যের ভারসাম্য",
    simpleSummary: "ডেটাসেটের বিভিন্ন Columns-এর পরিমাপের একক ও মান যদি মারাত্মক অসম হয় (যেমন: Age 18 থেকে 60 বছর, আর Annual Salary ₹3,00,000 থেকে ₹30,00,000), তবে Model বড় সংখ্যার Salary-কে বেশি গুরুত্ব দেয় আর Age-কে অগ্রাহ্য করে। সব Features-কে একটি নির্দিষ্ট অভিন্ন স্কেলের সীমানায় আনাকেই Feature Scaling বলে।",
    coreIntuition: "ধরা যাক একটি ডেটাসেটে দুটি ফিচার রয়েছে: Customer Age (১৮ থেকে ৬৫ বছর) এবং Annual Income (₹৩,০০,০০০ থেকে ₹৫০,০০,০০০)। গাণিতিক সূত্রে দূরত্বের পার্থক্য পরিমাপের সময় Annual Income-এর সংখ্যার পার্থক্য লাখের ঘরে হওয়ায় তা Age-এর প্রভাবকে সম্পূর্ণরূপে ঢেকে ফেলে। Feature Scaling-এর কাজ হলো বিভিন্ন এককের প্রতিটি বৈশিষ্ট্যকে একটি সুনির্দিষ্ট অভিন্ন স্কেলে রূপান্তর করে সমমর্যাদা দেওয়া।",
    whyImportant: "দূরত্বভিত্তিক মডেল (KNN, K-Means, SVM) এবং Gradient Descent ভিত্তিক মডেল (Logistic Regression, Neural Networks) স্কেলিং ছাড়া ধীরগতির ও ভুল পথে চলে।",
    keyPoints: [
      {
        title: "Distance Dominance Prevention",
        explanation: "Euclidean Distance সূত্রে বড় সংখ্যার বর্গ ছোট সংখ্যাকে সম্পূর্ণরূপে গ্রাস করা থেকে বাঁচায়।"
      },
      {
        title: "Fast Gradient Descent Convergence",
        explanation: "Loss Surface বৃত্তাকার হয়, ফলে সরু খাদের মধ্যে Zig-Zag না করে দ্রুত Global Minimum-এ পৌঁছায়।"
      },
      {
        title: "Data Leakage Prevention",
        explanation: "স্কেলারকে কেবল Training Data-য় Fit করতে হয় (`fit_transform`) এবং Testing Data-য় কেবল রূপান্তর (`transform`) করতে হয়।"
      }
    ],
    realWorldAnalogy: "আন্তর্জাতিক বাণিজ্যে ভারতীয় রুপি আর আমেরিকান ডলারকে তুলনা করার আগে যেমন একটি অভিন্ন কারেন্সিতে কনভার্ট করতে হয়, Feature Scaling-ও তেমনই একটি ইউনিভার্সাল মুদ্রা।",
    formulaOrRule: "Euclidean Distance: d(p, q) = \sqrt{\sum_{i=1}^d (p_i - q_i)^2} ⟹ বড় স্কেলের ফিচার পুরো দূরত্ব নিয়ন্ত্রণ করে।",
    commonMistakes: "Decision Tree বা Random Forest-এ জোর করে স্কেলিং করা। Tree-ভিত্তিক মডেল কেবল কলামের মানের ক্রম (Rank Order) দেখে স্প্লিট করে, তাই এদের স্কেলিংয়ের কোনো প্রয়োজনই নেই!",
    examTips: "কোন Algorithm-এ স্কেলিং বাধ্যতামূলক (KNN, SVM, Neural Nets) আর কোনটায় দরকার নেই (Decision Tree, Random Forest, Naive Bayes)—তা টেবিলে দেখাবেন।"
  },

  16: {
    topicNumber: 16,
    titleEn: "Normalization",
    titleBn: "Normalization (Min-Max Scaling)",
    subtitleBn: "সমস্ত মানকে [0, 1] বাউন্ডেড রেঞ্জে সীমাবদ্ধ করার কৌশল",
    simpleSummary: "Min-Max Normalization হলো এমন একটি স্কেলিং পদ্ধতি যা ডেটাসেটের সর্বনিম্ন মানকে 0 (Zero) এবং সর্বোচ্চ মানকে 1 (One) বানিয়ে দিয়ে মাঝখানের সমস্ত ডেটাকে আনুপাতিক হারে [0, 1] রেঞ্জের মধ্যে সুন্দরভাবে সাজিয়ে দেয়।",
    coreIntuition: "আপনার পরীক্ষার মোট নম্বর ছিল 800, আর আপনি পেয়েছেন 600। শতকরায় নিলে কত হয়? (600 / 800) = 0.75 বা 75%। ঠিক একইভাবে Normalization যেকোনো সংখ্যার নিজস্ব স্কেল মুছে ফেলে তাকে 0 থেকে 1-এর মাঝে একটি শতকরা অনুপাতে রূপান্তর করে।",
    whyImportant: "Image Processing (যেখানে Pixel Values 0 থেকে 255 থাকে) এবং Neural Network-এর Sigmoid বা Softmax অ্যাক্টিভেশন ফাংশনে [0, 1] বাউন্ডেড ডেটা ট্রেনিংকে অত্যন্ত স্থিতিশীল করে।",
    keyPoints: [
      {
        title: "Strictly Bounded Range [0, 1]",
        explanation: "রূপান্তরের পর নিশ্চিতভাবে সর্বনিম্ন মান 0 এবং সর্বোচ্চ মান 1 হবে।"
      },
      {
        title: "Extreme Sensitivity to Outliers",
        explanation: "যদি ডেটাসেটে একটি বিশাল ভুল Outlier থাকে, তবে বাকি সমস্ত সাধারণ মান 0-এর কাছাকাছি চেপে নষ্ট হয়ে যায়।"
      },
      {
        title: "Preserves Original Distribution",
        explanation: "ডেটার নিজস্ব আকৃতি বা আপেক্ষিক দূরত্বের কোনো বিকৃতি ঘটে না।"
      }
    ],
    realWorldAnalogy: "স্মার্টফোনের Battery Percentage: ব্যাটারির আসল ভোল্টেজ 3.7V থেকে 4.2V হলেও স্ক্রিনে আপনাকে 0% থেকে 100% দেখানো হয়। এটিই হলো Min-Max Scaling।",
    formulaOrRule: "Min-Max Formula: x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}} ⟹ x' \in [0, 1]।",
    commonMistakes: "Testing Data-য় যদি Training Data-র চেয়েও বড় সংখ্যা আসে, তবে মান 1-এর চেয়ে বড় হতে পারে; তাই প্রোডাকশনে Clip করতে হয়।",
    examTips: "লবে (x - x_min) এবং হরে (x_max - x_min)—সূত্রটি নিখুঁতভাবে লিখবেন।"
  },

  17: {
    topicNumber: 17,
    titleEn: "Standardization",
    titleBn: "Standardization (Z-Score Scaling)",
    subtitleBn: "Mean = 0 এবং Variance = 1: সবচেয়ে স্থিতিশীল স্কেলার",
    simpleSummary: "Standardization হলো ডেটার প্রতিটি মান থেকে তার Mean (গড়) বিয়োগ করে এবং ফলাফলকে Standard Deviation (প্রমাণ বিচ্যুতি) দিয়ে ভাগ করার প্রক্রিয়া। এর ফলে পুরো কলামটির নতুন গড় ঠিক শূন্য (μ = 0) এবং ভেদমান এক (σ² = 1) হয়ে যায়।",
    coreIntuition: "দুটি ভিন্ন কলেজ: একটি কলেজে কঠিন প্রশ্ন হওয়ায় গড় নম্বর 40; অন্য কলেজে সহজ প্রশ্ন হওয়ায় গড় নম্বর 80। এখন দুই কলেজের ফার্স্ট বয়কে কি সরাসরি নম্বর দেখে তুলনা করা যায়? না! কিন্তু Standardization করলে দুজনের নম্বরই তাদের কলেজের সাপেক্ষে Z-Score হয়ে নিখুঁত তুলনাযোগ্য হয়ে যায়।",
    whyImportant: "PCA, SVM, Logistic Regression এবং Deep Learning-এ Standardization হলো গোল্ড স্ট্যান্ডার্ড। কারণ এটি Outliers থাকলেও Min-Max-এর মতো ভেঙে পড়ে না এবং অসীম সীমার বাস্তব ডেটা গ্রহণ করতে পারে।",
    keyPoints: [
      {
        title: "Zero-Centered (μ = 0)",
        explanation: "গড় ঠিক শূন্যে থাকায় অপ্টিমাইজেশন অ্যালগরিদমে সিমেট্রিক ব্যালান্সড গ্রেডিয়েন্ট তৈরি হয়।"
      },
      {
        title: "Unit Variance (σ = 1)",
        explanation: "সমস্ত Features-এর বিস্তার বা শক্তির স্কেল অভিন্ন 1.0-এ নির্ধারিত থাকে।"
      },
      {
        title: "Unbounded (সীমাহীন)",
        explanation: "Min-Max-এর মতো এটি [0, 1]-এ বাঁধা নয়; চরম মান -3 বা +3-এর বাইরেও যেতে পারে।"
      }
    ],
    realWorldAnalogy: "আবহাওয়া অ্যানোমালি চার্ট: কোনো শহরের গড় তাপমাত্রাকে 0 ধরে দেখানো হয় যে আজকের তাপমাত্রা স্বাভাবিকের চেয়ে 2 Standard Deviation বেশি (+2) নাকি কম (-2)।",
    formulaOrRule: "Standardization Formula: z = \frac{x - \mu}{\sigma}, \quad \text{যেখানে } \mu = 0 \text{ এবং } \sigma = 1।",
    commonMistakes: "মনে করা যে Standardization করলে যেকোনো ডেটা নরমাল ডিস্ট্রিবিউশন হয়ে যায়! আসলে এটি কেবল কেন্দ্র ও স্কেল বদলায়, ডেটা আগে থেকেই Skewed থাকলে পরেও Skewed-ই থাকবে।",
    examTips: "Normalization বনাম Standardization-এর পার্থক্য পরীক্ষায় নিশ্চিত আসে: Normalization ডেটাকে [0, 1]-এ বাউন্ড করে, Standardization গড়=0 ও সিগমা=1 করে।"
  },

  18: {
    topicNumber: 18,
    titleEn: "Encoding Categorical Variables",
    titleBn: "Encoding Categorical Variables",
    subtitleBn: "Text থেকে Numbers: ক্যাটাগরিক্যাল ডেটা রূপান্তরের রোডম্যাপ",
    simpleSummary: "কম্পিউটার কেবল সংখ্যা আর গণিত বোঝে; সে 'Red', 'Blue', 'Kolkata', 'Mumbai'-এর মতো Text শব্দ বোঝে না। তাই Categorical Features-কে সুনির্দিষ্ট গাণিতিক নিয়মে সংখ্যায় রূপান্তর করার সম্পূর্ণ পদ্ধতিকে Categorical Encoding বলা হয়।",
    coreIntuition: "আপনি যদি বিদেশে গিয়ে এমন একজনের সাথে কথা বলেন যিনি আপনার ভাষা জানেন না, তখন আপনি ইশারায় কার্ড দেখিয়ে Option 1 বা Option 2 বোঝান। Encoding হলো কম্পিউটারের সামনে সেই সাংকেতিক কার্ড তুলে ধরা।",
    whyImportant: "মডেলের গাণিতিক সূত্রে Text গুণ করা অসম্ভব। ভুল Encoding পদ্ধতি বেছে নিলে Model শব্দের মাঝে মিথ্যা ছোট-বড় সম্পর্ক তৈরি করে ফেলে পুরো Prediction ধ্বংস করে দিতে পারে।",
    keyPoints: [
      {
        title: "Information Preservation (তথ্য সংরক্ষণ)",
        explanation: "শব্দের অনন্য পরিচয় যেন সংখ্যায় রূপান্তরিত হওয়ার পরেও পুরোপুরি সংরক্ষিত থাকে।"
      },
      {
        title: "Cardinality Awareness (অনন্য মানের সংখ্যা)",
        explanation: "কলামে কতগুলো Unique Values আছে। কম হলে One-Hot Encoding এবং বেশি হলে Target Encoding বা Frequency Encoding ভালো।"
      },
      {
        title: "Avoiding False Order (মিথ্যা ক্রম পরিহার)",
        explanation: "Nominal ডেটায় যাতে 1 < 2 < 3 জাতীয় কৃত্রিম ছোট-বড় সম্পর্ক তৈরি না হয়।"
      }
    ],
    realWorldAnalogy: "ফুটবল খেলোয়াড়ের জার্সির নম্বর: পিঠের 10 নম্বর জার্সির অর্থ এই নয় যে সে 2 নম্বর জার্সিধারীর চেয়ে পাঁচগুণ বেশি শক্তিশালী! এটি স্রেফ একটি আইডেন্টিটি বা Encodings।",
    formulaOrRule: "Encoding Mapping: f: \mathcal{C} \to \mathbb{R}^k, যা প্রতিটি Category C_i-কে একটি ভেক্টরে ম্যাপ করে।",
    commonMistakes: "সব Categorical কলামে চোখ বুজে Label Encoding চালানো। এতে Kolkata=1, Delhi=2, Mumbai=3 হলে Model ভুলভাবে মনে করে Mumbai শহর কলকাতার চেয়ে ৩ গুণ বড়!",
    examTips: "Nominal Data-র জন্য One-Hot Encoding এবং Ordinal Data-র জন্য Ordinal Encoding—এই সাধারণ নিয়মটি মনে রাখবেন।"
  },

  19: {
    topicNumber: 19,
    titleEn: "One-Hot Encoding",
    titleBn: "One-Hot Encoding & Dummy Variable Trap",
    subtitleBn: "Binary Flags এবং গাণিতিক Singularity এড়ানোর নিয়ম",
    simpleSummary: "One-Hot Encoding হলো এমন একটি কৌশল যেখানে কোনো কলামের প্রতিটি Unique Category-র জন্য একটি করে নতুন Binary Column (0 বা 1) তৈরি করা হয়। যে সারিতে যে Category সত্য, সেখানে 1 বসে এবং বাকি কলামগুলোতে 0 বসে।",
    coreIntuition: "ট্রাফিক সিগন্যালের ৩টি আলো—Red, Yellow, Green। যখন লাল আলো জ্বলে, তখন Red=1, বাকি দুটো=0। কোনো আলো অন্য আলোর চেয়ে বড় বা ছোট নয়; কেবল সুইচ On (1) বা Off (0)। এটিই হলো One-Hot Encoding!",
    whyImportant: "Nominal Data-য় এটি কোনো মিথ্যা ছোট-বড় ক্রম তৈরি করে না। তবে সতর্ক না থাকলে 'Dummy Variable Trap' অর্থাৎ Multicollinearity তৈরি হয়, যা Linear Regression-এর Gram Matrix-কে Singular (det=0) বানিয়ে ইনভার্স বের করা অসম্ভব করে দেয়।",
    keyPoints: [
      {
        title: "Binary Columns Creation",
        explanation: "K সংখ্যক অনন্য Category থাকলে K সংখ্যক নতুন 0/1 কলাম তৈরি হয়।"
      },
      {
        title: "Dummy Variable Trap",
        explanation: "যেহেতু সব কলামের যোগফল 1 হয়, তাই ইন্টারসেপ্ট থাকলে একটি কলাম অন্যগুলোর যোগফল হয়ে যায়, ফলে det(X^T X) = 0 হয়।"
      },
      {
        title: "Drop-First Strategy",
        explanation: "ফাঁদ এড়াতে সবসময় প্রথম কলামটি বাদ দিয়ে (K - 1) টি কলাম ব্যবহার করতে হয় (`drop_first=True`)।"
      }
    ],
    realWorldAnalogy: "MCQ পরীক্ষার OMR শিট: চারটি অপশনের (A, B, C, D) মধ্যে একটি মাত্র বৃত্ত ভরাট করা হয় (1) আর বাকি তিনটি ফাঁকা থাকে (0)।",
    formulaOrRule: "Dummy Trap Proof: \sum_{k=1}^K \mathbf{d}_k = \mathbf{1} ⟹ \det(X^T X) = 0 (ম্যাট্রিক্স ইনভার্স অসম্ভব)।",
    commonMistakes: "হাজার হাজার ক্যাটাগরি থাকা কলামে (যেমন পিন কোড) One-Hot চালানো। এতে কলামের সংখ্যা কয়েক হাজার হয়ে 'Curse of Dimensionality' তৈরি হয়।",
    examTips: "Dummy Variable Trap কীভাবে সমাধান করা হয়? উত্তর: `pd.get_dummies(df, drop_first=True)` দিয়ে রেফারেন্স কলাম বাদ দিয়ে।"
  },

  20: {
    topicNumber: 20,
    titleEn: "Ordinal Encoding",
    titleBn: "Ordinal Encoding (অর্ডিনাল এনকোডিং)",
    subtitleBn: "স্বাভাবিক ক্রম ও মর্যাদার ধারাবাহিকতা সংরক্ষণ",
    simpleSummary: "যেসব Categorical Features-এর মধ্যে একটি স্পষ্ট অন্তর্নিহিত ক্রম, ধাপ বা মর্যাদা থাকে (যেমন: Low < Medium < High), সেগুলোকে তাদের ক্রম অনুসারে 0, 1, 2, 3 পূর্ণসংখ্যায় রূপান্তর করার কৌশলকে Ordinal Encoding বলা হয়।",
    coreIntuition: "টি-শার্টের সাইজ—S, M, L, XL। আমরা স্পষ্ট জানি M সাইজ S-এর চেয়ে বড় এবং L সাইজ M-এর চেয়ে বড়। এই স্বাভাবিক ক্রমটিকে 1, 2, 3, 4 হিসেবে তুলে ধরাই হলো Ordinal Encoding।",
    whyImportant: "One-Hot Encoding-এ প্রতিটি Category-র জন্য আলাদা কলাম তৈরি হওয়ায় Dataset চওড়া হয়ে যায়। কিন্তু Ordinal Encoding-এ মাত্র একটি কলামের মাধ্যমেই সম্পূর্ণ ক্রমিক তথ্য দক্ষতার সাথে সংরক্ষণ করা যায়।",
    keyPoints: [
      {
        title: "Order Preservation (ক্রম রক্ষা)",
        explanation: "Category C_1 < C_2 হলে রূপান্তরের পরেও f(C_1) < f(C_2) বজায় থাকে।"
      },
      {
        title: "Memory Efficient",
        explanation: "কলামের সংখ্যা বাড়ে না, মাত্র 1টি কলামেই সমস্ত তথ্য সংরক্ষিত থাকে।"
      },
      {
        title: "Step Distance Caveat",
        explanation: "মনে রাখা দরকার যে ক্রম ঠিক থাকলেও দুটি ধাপের মধ্যবর্তী দূরত্ব গাণিতিকভাবে হুবহু সমান নাও হতে পারে।"
      }
    ],
    realWorldAnalogy: "হোটেলের Star Rating: 1-Star, 2-Star, 3-Star, 4-Star, 5-Star। স্টার যত বেশি, মান তত ভালো—এটি একটি নিখুঁত Ordinal বৈশিষ্ট্য।",
    formulaOrRule: "Mapping: C_{(1)} \mapsto 0, \; C_{(2)} \mapsto 1, \; \dots, \; C_{(K)} \mapsto K - 1।",
    commonMistakes: "Custom Dictionary না দিয়ে Scikit-Learn-এ ডিফল্ট সাজানো। এতে High=0, Low=1, Medium=2 হয়ে ক্রম উল্টোপাল্টা হয়ে যায়!",
    examTips: "কোড লেখার সময় সবসময় কাস্টম ম্যাপিং ডিকশনারি তৈরি করবেন: `{'Low': 1, 'Medium': 2, 'High': 3}`।"
  },

  21: {
    topicNumber: 21,
    titleEn: "Worked Example 1: Cleaning a Student Dataset",
    titleBn: "Worked Example 1: Cleaning a Student Dataset",
    subtitleBn: "হাতে-কলমে প্রজেক্ট: এলোমেলো ছাত্র রেকর্ডের সম্পূর্ণ ক্লিনিং",
    simpleSummary: "এই প্রজেক্টে আমরা একটি বাস্তব স্কুলের ছাত্রছাত্রীদের অগোছালো Dataset নিয়ে কাজ করব—যেখানে Roll Number-এ টাইপো আছে, নামের বানানে ছোট-বড় অক্ষরের অমিল আছে, কিছু Exam Marks মিসিং এবং কিছু অবৈধ মান (যেমন Age = -2 বা Marks = 150) রয়েছে। Pandas দিয়ে ধাপে ধাপে কীভাবে একে Clean করা হয় তা দেখানো হয়েছে।",
    coreIntuition: "একজন শিক্ষক পরীক্ষার খাতা দেখে খসড়া তালিকায় নম্বর তুলেছেন। কেউ রোল লেখেনি, কেউ নাম ভুল লিখেছে। হেডমাস্টারের কাছে ফাইনাল রেজাল্ট জমা দেওয়ার আগে যেমন সব ভুল সংশোধন করে পরিচ্ছন্ন তালিকা বানানো হয়, কোডিংয়ে এটিই হলো Cleaning Pipeline।",
    whyImportant: "থিওরি জানা আর বাস্তবে কোড করার মধ্যে অনেক পার্থক্য। এই হ্যান্ডস-অন উদাহরণের মাধ্যমে শিক্ষার্থীরা বুঝতে পারে বাস্তব ডেটাসেটে ক্লিনিংয়ের ধাপগুলো কোন ক্রমানুসারে সাজাতে হয়।",
    keyPoints: [
      {
        title: "Step 1: String Sanitization",
        explanation: "`df['Name'] = df['Name'].str.strip().str.title()` দিয়ে স্পেস ও ক্যাপিটালাইজেশন ঠিক করা।"
      },
      {
        title: "Step 2: Domain Constraints",
        explanation: "Age যাতে 5 থেকে 25-এর মধ্যে এবং Marks যাতে 0 থেকে 100-এর মধ্যে থাকে তা ফিল্টার করা।"
      },
      {
        title: "Step 3: Missing Marks Imputation",
        explanation: "অনুপস্থিত ছাত্রদের ক্ষেত্রে শূন্য না বসিয়ে Median Marks দিয়ে ফাঁকা পূরণ করা।"
      }
    ],
    realWorldAnalogy: "মাধ্যমিক বা উচ্চমাধ্যমিক শিক্ষা সংসদের এডমিট কার্ড ও রেজাল্ট প্রসেসিং ডেটাবেস ভ্যালিডেশন যেখানে লাখ লাখ ছাত্রের রেকর্ড অটোমেটিক স্ক্রিপ্ট দিয়ে ক্লিন করা হয়।",
    formulaOrRule: "Pipeline: Raw CSV ➔ Drop Invalids ➔ String Strip ➔ Impute Median ➔ Clean CSV Export.",
    commonMistakes: "ক্লিনিংয়ের আগে মূল ডেটাসেটের কপি না রাখা। ভুল কোড চালালে আসল Raw Data নষ্ট হয়ে যেতে পারে!",
    examTips: "পরীক্ষায় কোড চাইলে `df['Name'].str.strip()` এবং `df['Marks'].fillna(df['Marks'].median())` লিখবেন।"
  },

  22: {
    topicNumber: 22,
    titleEn: "Worked Example 2: Handling Missing Salary Values",
    titleBn: "Worked Example 2: Handling Missing Salary Values",
    subtitleBn: "কর্পোরেট পে-রোল ডেটাসেটে Stratified Median Imputation",
    simpleSummary: "একটি আইটি কোম্পানির কর্মীদের ডেটাসেটে দেখা গেল ২০% কর্মীর Salary কলামে Missing Values রয়েছে। কিন্তু জুনিয়র ট্রেইনি আর সিনিয়র ইঞ্জিনিয়ারের বেতন তো এক হতে পারে না! তাই সরল গড় না নিয়ে কীভাবে পদের বিভাগ অনুযায়ী (Job Role অনুযায়ী Stratified Group Median) নিখুঁতভাবে ফাঁকা ঘর পূরণ করা হয়, তা এখানে দেখানো হয়েছে।",
    coreIntuition: "ধরা যাক একটি প্রতিষ্ঠানে বিভিন্ন পদের (যেমন Junior Developer, Senior Architect, Executive Manager) কর্মীরা কাজ করেন। প্রতিটি পদের বেতনের নিজস্ব একটি বাস্তব কাঠামো রয়েছে। কোনো Junior Developer-এর বেতনের ঘর ফাঁকা থাকলে সম্পূর্ণ প্রতিষ্ঠানের সব পদের সামগ্রিক গড় না বসিয়ে, তার সমপদস্থ ডেভেলপারদের বেতনের মধ্যমা (Stratified Group Median) বসানোই হলো সবচেয়ে যৌক্তিক ও নিখুঁত পদ্ধতি।",
    whyImportant: "কোম্পানিতে সরাসরি সামগ্রিক Mean বসালে জুনিয়রদের বেতন অবাস্তব রকম বেশি এবং সিনিয়রদের বেতন কৃত্রিমভাবে কমে যায়। Group-based Median নিলে আয়ের বণ্টন অবিকল সত্য থাকে।",
    keyPoints: [
      {
        title: "Skewed Distribution Detection",
        explanation: "বেতনের কলাম সবসময় Right-Skewed থাকে, তাই Mean সম্পূর্ণ বর্জনীয়।"
      },
      {
        title: "Groupby Transform Syntax",
        explanation: "`df.groupby('Role')['Salary'].transform(lambda x: x.fillna(x.median()))` প্রয়োগ।"
      },
      {
        title: "Missingness Indicator Feature",
        explanation: "একটি নতুন বাইনারি কলাম `Salary_was_missing` রাখা যাতে মডেল জানতে পারে কোন মানটি ইমপিউট করা হয়েছে।"
      }
    ],
    realWorldAnalogy: "সল্টলেক সেক্টর ফাইভে অবস্থিত একটি টেক কোম্পানির পে-রোল শিট যেখানে Software Engineer, Team Lead এবং HR কর্মীদের বেতনের শূন্যস্থান পূরণ করা হচ্ছে।",
    formulaOrRule: "\hat{y}_i = \arg\min_c \sum_{j \in \Omega_{\text{Role}}} |y_j - c| ⟹ c^* = \text{Median}(\text{Salary | Role})।",
    commonMistakes: "সব কর্মীর জন্য একটি একক Global Mean বসিয়ে দেওয়া। এতে পদের স্বাভাবিক বেতনের ভারসাম্য নষ্ট হয়।",
    examTips: "Groupby Imputation-এর পান্ডাস সিনট্যাক্সটি খাতায় সুন্দর করে লিখে দেখালে পুরো নম্বর পাওয়া যায়।"
  },

  23: {
    topicNumber: 23,
    titleEn: "Worked Example 3: Encoding City and Gender Columns",
    titleBn: "Worked Example 3: Encoding City and Gender Columns",
    subtitleBn: "Binary এবং Multiclass Categorical Features-এর সঠিক এনকোডিং",
    simpleSummary: "একটি ই-কমার্স ডেটাসেটে 'Gender' কলামে রয়েছে দুটি মান (Male, Female) এবং 'City' কলামে রয়েছে একাধিক শহরের নাম (Kolkata, Siliguri, Asansol, Durgapur)। কীভাবে Gender-কে বাইনারি 0/1 এবং City-কে One-Hot Encoding-এ রূপান্তর করা হয়, তার বাস্তব প্রয়োগ।",
    coreIntuition: "সুইচবোর্ডে পাখার জন্য কেবল On/Off সুইচ (Binary)—Gender কলাম ঠিক তেমনই। কিন্তু টিভির রিমোটে বিভিন্ন চ্যানেলের জন্য যেমন আলাদা আলাদা বোতাম থাকে, City কলামও ঠিক তেমনই বহুমাত্রিক চয়েস।",
    whyImportant: "যদি কেউ City-র ঘরে Kolkata=1, Siliguri=2, Asansol=3 বসিয়ে দেয়, তবে Model ভাববে শিলিগুড়ি কলকাতার দ্বিগুণ! এই মারাত্মক ভুল কীভাবে রুখতে হয় তা এই উদাহরণের মূল শিক্ষা।",
    keyPoints: [
      {
        title: "Binary Drop-First Encoding",
        explanation: "Gender-এর ক্ষেত্রে একটি মাত্র কলাম `is_Male` (1/0) রাখাই যথেষ্ট; Female-এর জন্য অতিরিক্ত কলাম অপ্রয়োজনীয়।"
      },
      {
        title: "One-Hot Encoding with drop_first=True",
        explanation: "K টি শহরের জন্য (K - 1) টি ডামি কলাম তৈরি করে Dummy Variable Trap এড়ানো।"
      },
      {
        title: "Handling Unseen Categories",
        explanation: "Testing Data-য় অজানা নতুন কোনো শহর এলে যাতে কোড ক্র্যাশ না করে সেজন্য `handle_unknown='ignore'` রাখা।"
      }
    ],
    realWorldAnalogy: "অনলাইন ডেলিভারি সিস্টেম—যেখানে গ্রাহকের লিঙ্গ ও শহরের তথ্যের ভিত্তিতে ডেলিভারি সময় প্রেডিক্ট করা হয়।",
    formulaOrRule: "Gender ↦ {0, 1} | City ↦ [d_Kolkata, d_Siliguri, d_Asansol] with drop_first=True.",
    commonMistakes: "Scikit-Learn-এর `OneHotEncoder`-এ `handle_unknown='ignore'` সেট না করা। নতুন শহর দেখলেই সার্ভার এরর দিয়ে বন্ধ হয়ে যাবে।",
    examTips: "Binary কলামে কেন একটি কলামই যথেষ্ট (1 - x = অন্যটি) তা ব্যাখ্যা করবেন।"
  },

  24: {
    topicNumber: 24,
    titleEn: "Worked Example 4: Scaling Age and Income Features",
    titleBn: "Worked Example 4: Scaling Age and Income Features",
    subtitleBn: "StandardScaler ও RobustScaler দিয়ে সংখ্যার তীব্র বৈষম্য দূরীকরণ",
    simpleSummary: "একটি ক্রেডিট কার্ড ডেটাসেটে 'Age' কলামের মান রয়েছে 18 থেকে 65-এর মধ্যে, আর 'Annual Income' কলামের মান রয়েছে ₹3,00,000 থেকে ₹50,00,000-এর মধ্যে। এই দুই কলামকে পাশাপাশি রেখে Model Training-এর পূর্বে কীভাবে StandardScaler বা RobustScaler দিয়ে স্কেল করা হয়, তার সম্পূর্ণ ওয়ার্কফ্লো।",
    coreIntuition: "ধরা যাক লোন আবেদনকারীদের Age এবং Annual Income ফিচার দুটি পাশাপাশি রয়েছে। Scaling ছাড়া K-Nearest Neighbors (KNN) বা Gradient Descent কেবল বিশাল সংখ্যার Income দেখেই দূরত্বের পার্থক্য নির্ধারণ করবে; Age-এর কোনো প্রভাবই মডেলে অনুভূত হবে না। StandardScaler বা RobustScaler প্রয়োগ করে এই সংখ্যার তীব্র বৈষম্য দূর করা হয়।",
    whyImportant: "এই স্কেলিং না করলে Model Income কলামের বিশাল সংখ্যার কারণে বিভ্রান্ত হবে। তাছাড়া Training Data-র প্যারামিটার দিয়ে Testing Data রূপান্তর করে Data Leakage ঠেকানোর কৌশল শেখা যায়।",
    keyPoints: [
      {
        title: "fit() বনাম transform()",
        explanation: "Training Data-র Mean ও Std দিয়ে `scaler.fit(X_train)` করতে হবে এবং Testing Data-য় কেবল `scaler.transform(X_test)` চালাতে হবে।"
      },
      {
        title: "Data Leakage Prevention",
        explanation: "কখনোই Train-Test Split-এর আগে সম্পূর্ণ ডেটাসেটে একসাথে স্কেলার চালাবেন না।"
      },
      {
        title: "RobustScaler Alternative",
        explanation: "Income কলামে চরম উচ্চ মানের Outlier থাকলে StandardScaler-এর বদলে RobustScaler (Median ও IQR) ব্যবহার করা সেরা।"
      }
    ],
    realWorldAnalogy: "ব্যাংকে হোম লোনের আবেদন যাচাইকারী AI অ্যালগরিদম—যেখানে আবেদনকারীর বয়স ও বাৎসরিক উপার্জনের যৌথ বিবেচনায় ঋণ মঞ্জুর করা হয়।",
    formulaOrRule: "Workflow: X_train_scaled = scaler.fit_transform(X_train); X_test_scaled = scaler.transform(X_test);",
    commonMistakes: "Testing Data-তেও আবার নতুন করে `fit_transform()` চালানো। এতে Test Data-র নিজস্ব পরিসংখ্যান Model-এ ঢুকে পড়ে আসল মূল্যায়ন নষ্ট করে দেয়।",
    examTips: "`fit_transform()` কেবল Training Data-য় হয়, Testing Data-য় কখনোই `fit` হয় না, কেবল `transform()` হয়—এই নিয়মটি পরীক্ষায় খুব গুরুত্বপূর্ণ।"
  },

  25: {
    topicNumber: 25,
    titleEn: "Practice Problems",
    titleBn: "Practice Problems (অনুশীলনী ও সমাধান)",
    subtitleBn: "ইন্টারভিউ ও বিশ্ববিদ্যালয়ের পরীক্ষার জন্য গাণিতিক ও বাস্তব সমস্যার সমাধান",
    simpleSummary: "এই অধ্যায়ে আমরা পূর্ববর্তী সমস্ত থিওরি ও কোডিং কৌশলের উপর ভিত্তি করে বিভিন্ন জটিল বাস্তব পরিস্থিতি, ডায়াগনস্টিক সিনারিও, গাণিতিক ডেরিভেশন এবং কোডিং সমস্যার সমাধান করব। এটি শিক্ষার্থীদের যেকোনো টেকনিক্যাল ইন্টারভিউ ও পরীক্ষার জন্য শতভাগ প্রস্তুত করে তুলবে।",
    coreIntuition: "সাঁতার শেখার বই পড়া এক জিনিস, আর পুকুরের জলে নেমে সাঁতার কাটা অন্য জিনিস। Practice Problems হলো সেই গভীর জলে নেমে প্রতিটি স্ট্রোক নিখুঁতভাবে আয়ত্ত করার ময়দান।",
    whyImportant: "ইন্টারভিউ বোর্ডে কেবল সংজ্ঞা জানতে চাওয়া হয় না; একটি বাস্তব সমস্যা দিয়ে জানতে চাওয়া হয়—'এই অবস্থায় আপনি কোন Scaler বা কোন Imputer বেছে নেবেন এবং গাণিতিকভাবে প্রমাণ করুন কেন?'",
    keyPoints: [
      {
        title: "Problem 1: Missing Data Taxonomy Audit",
        explanation: "কখন Listwise Deletion করবেন আর কখন Iterative KNN Imputer ব্যবহার করবেন তার যুক্তি।"
      },
      {
        title: "Problem 2: Gram Matrix Singularity Proof",
        explanation: "Dummy Variable Trap-এর গাণিতিক প্রমাণ det(X^T X) = 0।"
      },
      {
        title: "Problem 3: Breakdown Point Analysis",
        explanation: "Mean-এর Breakdown Point 0% বনাম Median-এর Breakdown Point 50%-এর তাৎপর্য।"
      }
    ],
    realWorldAnalogy: "ড্রাইভিং লাইসেন্স পাওয়ার আগে ট্রাফিকের কঠিন সিমুলেশন টেস্টে গাড়ি চালিয়ে সমস্ত নিয়ম পালনের পরীক্ষা দেওয়া।",
    formulaOrRule: "Breakdown Point: \varepsilon^* = \min \{ m/N : \sup_{\mathcal{Z}_m} |T(\mathcal{Z})| = \infty \}।",
    commonMistakes: "মুখস্থ উত্তর দেওয়া। ডেটাসেটের ডিস্ট্রিবিউশন কেমন এবং Outlier আছে কিনা তা বিবেচনা না করে সমাধান বেছে নেওয়া।",
    examTips: "প্রতিটি উত্তরের সাথে প্রাসঙ্গিক Scikit-Learn বা Pandas ফাংশনের নাম এবং একটি বাস্তব যুক্তি লিখবেন।"
  },

  26: {
    topicNumber: 26,
    titleEn: "Master Quiz & Self-Assessment",
    titleBn: "Master Quiz & Certification",
    subtitleBn: "সম্পূর্ণ মডিউলের চূড়ান্ত মূল্যায়ন ও সার্টিফিকেশন প্রস্তুতি",
    simpleSummary: "Data Types and Preprocessing মডিউলের এটিই হলো চূড়ান্ত পরীক্ষা। এখানে সমস্ত বিষয়ের উপর Conceptual MCQs, Scenario-Based Questions এবং ম্যাথমেটিক্যাল ডেরিভেশন রয়েছে। এই কুইজ সফলভাবে সম্পন্ন করার মাধ্যমে শিক্ষার্থীরা এই মডিউলের প্রতিটি মূল নীতিতে পূর্ণ দক্ষতা অর্জন করতে সক্ষম হবে।",
    coreIntuition: "ফাইনাল পরীক্ষার মতো। এই কুইজটি আপনাকে স্পষ্ট জানিয়ে দেবে আপনি কোন কোন বিষয়ে পুরোপুরি দক্ষ হয়েছেন এবং কোথায় কোথায় আপনার আরেকটু রিভিশন প্রয়োজন।",
    whyImportant: "আত্মমূল্যায়ন ছাড়া কোনো শিখন সম্পূর্ণ হয় না। এই কুইজের প্রতিটি প্রশ্নের সাথে রয়েছে বিস্তারিত ব্যাখ্যা ও শিক্ষণীয় ফিডব্যাক, যা যেকোনো দ্বিধা সম্পূর্ণ দূর করে দেয়।",
    keyPoints: [
      {
        title: "Stevens' Scales of Measurement",
        explanation: "Nominal, Ordinal, Interval এবং Ratio স্কেলের বৈধ রূপান্তর।"
      },
      {
        title: "Rubin's Missingness & Conditional Independence",
        explanation: "MAR বনাম MNAR-এর নিখুঁত শনাক্তকরণ।"
      },
      {
        title: "Robustness & Estimator Breakdown Points",
        explanation: "Outlier পরিস্থিতিতে কোন Algorithm কেন ভেঙে পড়ে তার বৈজ্ঞানিক কারণ।"
      }
    ],
    realWorldAnalogy: "একজন ডাক্তারের ফাইনাল বোর্ড পরীক্ষা—যেখানে বিভিন্ন জটিল রোগীর কেস স্টাডি দিয়ে তার নির্ভুল রোগ নির্ণয়ের ক্ষমতা যাচাই করা হয়।",
    formulaOrRule: "Pass Mark: 80%+ পেলে আপনি এই মডিউলে সার্টিফায়েড এক্সপার্ট!",
    commonMistakes: "প্রশ্নটি ভালো করে না পড়ে উত্তর দেওয়া। বিশেষ করে 'Which of the following is FALSE' জাতীয় প্রশ্নে ভুল করা।",
    examTips: "প্রশ্নটি শান্ত মাথায় পড়ে মূল Keywords (যেমন: Nominal, Outlier, Skewed, Variance) চিহ্নিত করে তবেই সঠিক উত্তরটি বেছে নেবেন।"
  }
};

