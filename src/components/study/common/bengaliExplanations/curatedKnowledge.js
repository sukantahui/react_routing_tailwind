// src/common/bengaliExplanations/curatedKnowledge.js

/**
 * Curated High-Yield Explanations across Segments 1-9
 * সমস্ত প্রয়োজনীয় টেকনিক্যাল টার্ম ইংরেজিতে এবং বিশুদ্ধ একাডেমিক বাংলায় ব্যাখ্যা
 */

export const CURATED_MODULE_EXPLANATIONS = {
  // =========================================================================
  // SEGMENT 1: 001_001 - Introduction to Machine Learning
  // =========================================================================
  "001_001_introduction-to-machine-learning": {
    0: {
      topicNumber: 0,
      titleEn: "Meaning and scope of Machine Learning",
      titleBn: "Meaning and Scope of Machine Learning (মেশিন লার্নিংয়ের পরিধি ও সংজ্ঞা)",
      subtitleBn: "অভিজ্ঞতার ভিত্তিতে স্বয়ংক্রিয়ভাবে শেখার বিজ্ঞান ও আধুনিক প্রযুক্তি",
      simpleSummary: "Machine Learning (ML) হলো Artificial Intelligence (AI)-এর এমন একটি শাখা, যেখানে Computer-কে প্রতিটি পদক্ষেপের জন্য আলাদা করে Explicit Programming না করে পূর্বের Data ও Experience থেকে নিজে নিজে শিখতে ও সঠিক Prediction বা Decision নিতে সক্ষম করা হয়।",
      coreIntuition: "Arthur Samuel (1959)-এর ভাষায়: 'Machine Learning gives computers the ability to learn without being explicitly programmed.' প্রথাগত সফটওয়্যারে আমরা Input এবং Rules দিই, আউটপুট আসে। কিন্তু Machine Learning-এ আমরা Input এবং কাঙ্ক্ষিত Output (Data) দিই, আর কম্পিউটার নিজে থেকেই তাদের মধ্যবর্তী Rule বা Mathematical Function আবিষ্কার করে ফেলে।",
      whyImportant: "আধুনিক বিশ্বে Big Data-র যুগে তথ্যের পরিমাণ এত বিশাল যে মানুষের পক্ষে সব জটিল প্যাটার্ন ম্যানুয়ালি কোড করে লেখা অসম্ভব। যেমন—হাজার হাজার বিভিন্ন ধরনের Hand-written Digit চেনা বা Real-time Fraud Detection-এর জন্য ML ছাড়া বিকল্প নেই।",
      keyPoints: [
        {
          title: "Data-Driven Decision Making",
          explanation: "নিয়ম মুখস্থ করার বদলে বিশাল Historical Dataset অ্যানালাইসিস করে সিদ্ধান্ত নেওয়া হয়।"
        },
        {
          title: "Generalization Capability",
          explanation: "Model শুধু ট্রেনিং ডাটা মুখস্থ করে না, সম্পূর্ণ নতুন Unseen Data-তেও নির্ভুল সিদ্ধান্ত দিতে সক্ষম।"
        },
        {
          title: "Interdisciplinary Nature",
          explanation: "Computer Science, Linear Algebra, Calculus, Statistics এবং Probability Theory-র সমন্বয়ে ML গঠিত।"
        }
      ],
      realWorldAnalogy: "একজন আবহাওয়া বিশেষজ্ঞ যেমন বছরের পর বছর বাতাসের আর্দ্রতা, চাপ ও তাপমাত্রা পর্যবেক্ষণ করে আগামীকালের বৃষ্টির পূর্বাভাস দেন, ML Model-ও লাখ লাখ অতীতের রেকর্ডের প্যাটার্ন চিনে আগামীকালের আবহাওয়া প্রেডিক্ট করে।",
      formulaOrRule: "Tom Mitchell Formulation: A computer program is said to learn from experience E with respect to task T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.",
      commonMistakes: "AI এবং Machine Learning-কে হুবহু একই মনে করা। আসলে AI হলো সামগ্রিক লক্ষ্য (Intelligent Behavior), আর Machine Learning হলো সেই লক্ষ্য অর্জনের প্রধান গাণিতিক অ্যালগরিদমিক পদ্ধতি।",
      examTips: "Arthur Samuel এবং Tom Mitchell-এর সংজ্ঞা দুটি ইংরেজিতে কোটেশন দিয়ে লিখলে পরীক্ষায় পুরো নম্বর পাওয়া যায়। সাথে Traditional Programming vs ML-এর একটি ব্লক ডায়াগ্রাম আঁকবেন।"
    },
    1: {
      topicNumber: 1,
      titleEn: "Machine Learning vs traditional programming",
      titleBn: "Machine Learning বনাম Traditional Programming",
      subtitleBn: "নিয়মভিত্তিক অ্যালগরিদম বনাম ডেটা-ভিত্তিক প্যাটার্ন লার্নিং",
      simpleSummary: "Traditional Programming-এ প্রোগ্রামার নিজে হাতে গাণিতিক Logic ও Rules লিখে দেয় এবং Computer সেই Rules অনুযায়ী Data প্রসেস করে Answers তৈরি করে। অপরদিকে Machine Learning-এ আমরা Computer-কে Data এবং Answers প্রদান করি, এবং Algorithm স্বয়ংক্রিয়ভাবে তাদের ভেতরের Rules বা Model তৈরি করে।",
      coreIntuition: "Traditional Programming হলো রন্ধনপ্রণালী দেখে রান্না করার মতো—সব নিয়ম নির্দিষ্ট। আর Machine Learning হলো একজন মাস্টার শেফের মতো, যে হাজারটা চমৎকার খাবারের স্বাদ পরীক্ষা করে নিজেই বুঝতে পারে কোন মসলার অনুপাত কতটা হওয়া উচিত।",
      whyImportant: "ছবিতে বেড়াল চেনা, মানুষের কণ্ঠস্বর বোঝা বা স্টক মার্কেটের গতিবিধির মতো বাস্তব জীবনের জটিল সমস্যাগুলোর কোনো ফিক্সড 'if-else' নিয়ম লেখা সম্ভব নয়। তাই ML পদ্ধতিই একমাত্র কার্যকর সমাধান।",
      keyPoints: [
        {
          title: "Traditional Programming Flow",
          explanation: "Data + Rules ➔ Computer ➔ Output (Answers)।"
        },
        {
          title: "Machine Learning Flow",
          explanation: "Data + Outputs ➔ Machine Learning Algorithm ➔ Learned Rules (Model)।"
        },
        {
          title: "Adaptability & Scalability",
          explanation: "নতুন ধরনের ডাটা আসলে Traditional কোড বারবার বদলাতে হয়, কিন্তু ML Model নতুন ডাটা দিয়ে শুধু Re-train করলেই নিজেকে মানিয়ে নেয়।"
        }
      ],
      realWorldAnalogy: "ইমেলের Spam Filter: আগে মানুষ স্প্যাম চিহ্নিত করতে নির্দিষ্ট কিছু শব্দের তালিকা (যেমন 'Win Lottery') বানিয়ে if-else লিখত। স্প্যামাররা বানান একটু বদলে দিলে কোড ব্যর্থ হতো। কিন্তু ML স্প্যাম ফিল্টার কোটি কোটি মেইলের প্যাটার্ন নিজে শিখে নেয়, কোনো হার্ডকোডেড নিয়মের ওপর নির্ভর করে না।",
      formulaOrRule: "Traditional: Output = f(Input) [যেখানে f প্রোগ্রামারের জানা]। Machine Learning: Find f̂ such that f̂(Input) ≈ Output [f̂ অ্যালগরিদম দ্বারা অপটিমাইজড]।",
      commonMistakes: "মনে করা যে ML সব জায়গায় ব্যবহার করা উচিত। সরল যোগ-বিয়োগ বা ফিক্সড ট্যাক্স ক্যালকুলেশনে Traditional Programming দ্রুত, ১০০% নির্ভুল এবং সাশ্রয়ী; সেখানে ML-এর কোনো প্রয়োজন নেই।",
      examTips: "পরীক্ষায় ইনপুট-আউটপুট ফ্লো-এর দুটি তুলনামূলক আয়তক্ষেত্রাকার ডায়াগ্রাম (Data & Rules ➔ Output vs Data & Output ➔ Rules) অবশ্যই আঁকবেন।"
    },
    3: {
      topicNumber: 3,
      titleEn: "Types of Machine Learning",
      titleBn: "Types of Machine Learning (মেশিন লার্নিংয়ের প্রধান ৩টি শাখা)",
      subtitleBn: "Supervised, Unsupervised এবং Reinforcement Learning-এর রূপরেখা",
      simpleSummary: "Machine Learning প্রধানত তিনটি মূল শাখায় বিভক্ত: ১. Supervised Learning (যেখানে ইনপুট ডেটার সাথে সঠিক উত্তর বা Label থাকে), ২. Unsupervised Learning (যেখানে কোনো Label থাকে না, অ্যালগরিদম ডেটার অন্তর্নিহিত গঠন বা ক্লাস্টার খুঁজে বের করে), এবং ৩. Reinforcement Learning (যেখানে এজেন্ট পরিবেশের সাথে মিথস্ক্রিয়া করে পুরস্কার ও শাস্তির মাধ্যমে শেখে)।",
      coreIntuition: "১. ক্লাসরুমে শিক্ষকের উপস্থিতিতে উত্তরমালা দেখে শেখা হলো Supervised। ২. কোনো শিক্ষক ছাড়া একদল বই নিজে নিজে বিষয়ভিত্তিক সাজানো হলো Unsupervised। ৩. সাইকেল চালানো শেখার সময় পড়ে গেলে আঘাত (Penalty) আর ব্যালান্স রাখতে পারলে আনন্দ (Reward) পেয়ে শেখা হলো Reinforcement Learning।",
      whyImportant: "কোন সমস্যাটি কোন ক্যাটাগরিতে পড়ে তা না বুঝলে সঠিক অ্যালগরিদম নির্বাচন করা অসম্ভব। লেবেলযুক্ত ডাটা থাকলে আমরা Supervised ব্যবহার করি, গ্রাহক ভাগ করতে Unsupervised এবং গেম বা রোবটিক্সে Reinforcement বেছে নিই।",
      keyPoints: [
        {
          title: "Supervised Learning",
          explanation: "Input (X) এবং Ground Truth Output (Y) দেওয়া থাকে। লক্ষ্য হলো ফাংশন f(X) ≈ Y শেখা।"
        },
        {
          title: "Unsupervised Learning",
          explanation: "কেবল Input (X) দেওয়া থাকে, কোনো Target Label থাকে না। লক্ষ্য হলো Data Distribution ও Clustering বের করা।"
        },
        {
          title: "Reinforcement Learning (RL)",
          explanation: "Agent, Environment, State, Action, এবং Reward Signal-এর ভিত্তিতে অপটিমাল পলিসি শেখে।"
        }
      ],
      realWorldAnalogy: "Supervised: ব্যাংকের পূর্বের ঋণগ্রহীতাদের তথ্য ও তাদের খেলাপি (Default) হওয়ার রেকর্ড দেখে নতুন আবেদনকারী ঋণ শোধ করতে পারবে কিনা তা নির্ণয়। Unsupervised: গ্রাহকদের কেনাকাটার ধরন দেখে বিভিন্ন সেগমেন্টে ভাগ করা। Reinforcement: দাবা খেলায় বা ভিডিও গেমে কম্পিউটারের জয়লাভের কৌশল শেখা।",
      formulaOrRule: "Supervised: D = {(x_i, y_i)}_{i=1}^N. Unsupervised: D = {x_i}_{i=1}^N. RL: max_π E[\sum_{t=0}^T \gamma^t R_t].",
      commonMistakes: "Semi-supervised Learning-কে ভুলে যাওয়া। বাস্তবে অনেক সময় অল্প কিছু Labeled Data এবং প্রচুর Unlabeled Data থাকে, যা Semi-supervised-এর অন্তর্ভুক্ত।",
      examTips: "একটি পরিষ্কার টেবিল বানিয়ে Data Type (Labeled vs Unlabeled vs Feedback), Main Algorithms (Regression/Trees vs K-Means/PCA vs Q-Learning), এবং Goal তুলনা করবেন।"
    },
    4: {
      topicNumber: 4,
      titleEn: "Supervised learning",
      titleBn: "Supervised Learning (তত্ত্বাবধানভিত্তিক শিক্ষা)",
      subtitleBn: "Labeled Data থেকে ইনপুট-আউটপুট ম্যাপিং শেখার পদ্ধতি",
      simpleSummary: "Supervised Learning হলো মেশিন লার্নিংয়ের সবচেয়ে জনপ্রিয় ও বহুল ব্যবহৃত শাখা। এতে অ্যালগরিদমকে এমন একটি Training Dataset দেওয়া হয় যাতে ইনপুট Features-এর পাশাপাশি প্রতিটি উদাহরণের জন্য কাঙ্ক্ষিত সঠিক আউটপুট (Label বা Target) আগে থেকেই নির্দিষ্ট থাকে। মডেলটি ইনপুট থেকে আউটপুটের সম্পর্ক শিখে নিয়ে ভবিষ্যতে সম্পূর্ণ নতুন ইনপুটের জন্য সঠিক আউটপুট প্রেডিক্ট করে।",
      coreIntuition: "একজন শিক্ষক যখন ছাত্রকে প্রশ্ন ও তার সঠিক সমাধান সম্বলিত গাইডবুক দিয়ে শেখান এবং ছাত্রটি সেই প্যাটার্ন আয়ত্ত করে পরীক্ষার হলে নতুন প্রশ্নের সঠিক উত্তর লেখে, সেটাই হলো Supervised Learning।",
      whyImportant: "বাস্তব জীবনের অধিকাংশ ব্যবসায়িক সমস্যা—যেমন ইমেইল স্প্যাম নাকি ইনবক্স, রোগীর রোগ পজিটিভ নাকি নেগেটিভ, বা বাড়ির দাম কত হবে—সবই Supervised Learning ফ্রেমওয়ার্কে সমাধান করা হয়।",
      keyPoints: [
        {
          title: "Regression Problem",
          explanation: "যখন Target Variable একটি Continuous Numerical Value (যেমন: দাম, তাপমাত্রা, বয়স)।"
        },
        {
          title: "Classification Problem",
          explanation: "যখন Target Variable বিচ্ছিন্ন বা Discrete Category (যেমন: Yes/No, Cat/Dog/Bird, Grade A/B/C)।"
        },
        {
          title: "Training & Loss Minimization",
          explanation: "মডেল তার প্রেডিকশন এবং আসল লেবেলের মধ্যকার পার্থক্য (Loss) মেপে অপটিমাইজারের সাহায্যে ওয়েট আপডেট করে।"
        }
      ],
      realWorldAnalogy: "মেডিকেল ডায়াগনস্টিক ল্যাব: রক্ত পরীক্ষার বিভিন্ন ভ্যালু (Hemoglobin, Sugar, Platelet count হলো Features) এবং বিশেষজ্ঞ চিকিৎসকের কনফার্ম করা রিপোর্ট (Diabetic: Yes/No হলো Target Label)। এই ডেটা দিয়ে মডেল ট্রেন করা হলে নতুন রোগীর রক্ত রিপোর্ট দেখে সে ডায়াবেটিস প্রেডিক্ট করতে পারে।",
      formulaOrRule: "মডেল গোল: ŷ = f(X; θ), Loss Function: L(y, ŷ)। প্যারামিটার অপটিমাইজেশন: θ* = argmin_θ \frac{1}{N} \sum_{i=1}^N L(y_i, f(x_i; θ)).",
      commonMistakes: "Overfitting উপেক্ষা করা। ট্রেনিং ডাটায় ১০০% নির্ভুল হওয়া মানেই মডেল ভালো নয়; টেস্ট ডাটায় কেমন ফলাফল দেয় সেটাই আসল মাপকাঠি।",
      examTips: "Regression এবং Classification-এর পার্থক্য উদাহরণসহ লিখবেন। Regression-এর আউটপুট Continuous আর Classification-এর আউটপুট Discrete/Categorical।"
    }
  },

  // =========================================================================
  // SEGMENT 2: 002_001 - Simple Linear Regression
  // =========================================================================
  "002_001_simple-linear-regression": {
    0: {
      topicNumber: 0,
      titleEn: "Meaning of regression",
      titleBn: "Meaning of Regression (রিগ্রেশনের সংজ্ঞা ও উদ্দেশ্য)",
      subtitleBn: "চলকের পারস্পরিক সম্পর্ক থেকে সংখ্যাগত মান অনুমানের গাণিতিক পদ্ধতি",
      simpleSummary: "Regression হলো এমন একটি পরিসংখ্যানগত ও Supervised Machine Learning পদ্ধতি, যার সাহায্যে এক বা একাধিক স্বাধীন চলক (Independent Variables / Features)-এর ওপর ভিত্তি করে একটি অবিচ্ছিন্ন সংখ্যাগত নির্ভরশীল চলক (Continuous Numerical Dependent Variable / Target)-এর ভবিষ্যৎ মান অনুমান বা প্রেডিক্ট করা হয়।",
      coreIntuition: "বাস্তব জীবনে অনেক ঘটনার মধ্যে প্রত্যক্ষ সম্পর্ক থাকে। যেমন—গ্রীষ্মকালে তাপমাত্রা বাড়লে আইসক্রিম বিক্রির পরিমাণ বাড়ে; কোনো ছাত্র যত বেশি ঘণ্টা পড়াশোনা করে তার পরীক্ষার নম্বর তত বাড়ে। এই ধরনের সংখ্যাগত সম্পর্ককে গাণিতিক সমীকরণে রূপান্তর করাই হলো Regression।",
      whyImportant: "বাস্তব জগতে ব্যবসা, অর্থনীতি, চিকিৎসাবিজ্ঞান এবং প্রকৌশলে অধিকাংশ সিদ্ধান্তই সংখ্যাগত অনুমানের ওপর নির্ভরশীল—যেমন আগামী মাসের বিক্রয় লক্ষ্যমাত্রা কত হবে বা একটি পণ্যের উৎপাদন খরচ কত দাঁড়াবে।",
      keyPoints: [
        {
          title: "Continuous Numerical Target",
          explanation: "Regression-এর আউটপুট সর্বদা বাস্তব সংখ্যা (Real Number), যেমন: মূল্য, তাপমাত্রা, শেয়ার সূচক।"
        },
        {
          title: "Cause and Effect Analysis",
          explanation: "কোন ফিচার টার্গেট ভ্যারিয়েবলের ওপর কতটা শক্তিশালী প্রভাব ফেলছে তা সহগের (Coefficients) মাধ্যমে জানা যায়।"
        },
        {
          title: "Predictive Modeling",
          explanation: "অতীতের ঐতিহাসিক তথ্যের প্রবণতা (Trend) বুঝে ভবিষ্যতের সম্ভাব্য মান গণনা করা যায়।"
        }
      ],
      realWorldAnalogy: "একজন গাড়ি প্রস্তুতকারক যখন কোনো গাড়ির ইঞ্জিনের হর্সপাওয়ার ও ওজনের ওপর ভিত্তি করে তার মাইলেজ (কিলোমিটার প্রতি লিটার) কত হবে তা গাণিতিকভাবে হিসাব করেন, তিনি আসলে একটি Regression Model ব্যবহার করছেন।",
      formulaOrRule: "General Regression Formula: Y = f(X) + \epsilon, \quad \text{where } E(\epsilon) = 0, \quad \text{Var}(\epsilon) = \sigma^2.",
      commonMistakes: "Regression এবং Correlation-কে এক ভাবা। Correlation শুধু দুটি চলকের পারস্পরিক সম্পর্কের তীব্রতা বোঝায়, কিন্তু Regression একটি নির্দিষ্ট ভবিষ্যদ্বাণীমূলক সমীকরণ (Equation) প্রদান করে।",
      examTips: "Regression-এর সংজ্ঞা লেখার সময় 'Continuous Target Variable', 'Independent vs Dependent Variables' এবং 'Error term (ε)' শব্দগুলো স্পষ্টভাবে লিখবেন।"
    },
    3: {
      topicNumber: 3,
      titleEn: "Simple linear regression model",
      titleBn: "Simple Linear Regression Model",
      subtitleBn: "একক ইনপুট থেকে আউটপুট অনুমানের সরলরৈখিক সমীকরণ",
      simpleSummary: "Simple Linear Regression হলো রিগ্রেশনের সবচেয়ে মৌলিক ও প্রাচীনতম রূপ। এতে ঠিক একটিমাত্র স্বাধীন চলক (Single Independent Variable X) ব্যবহার করে একটি নির্ভরশীল চলক (Dependent Variable Y)-এর মান অনুমান করা হয়। এই দুই চলকের মধ্যবর্তী সম্পর্ককে একটি সরলরেখা (Straight Line) দ্বারা প্রকাশ করা হয়।",
      coreIntuition: "গ্রাফ পেপারে যদি আমরা X এবং Y-এর বিন্দুগুলো প্লট করি এবং সেই বিন্দুগুলোর মাঝখান দিয়ে এমন একটি সরলরেখা টানি যা সব বিন্দুর সবচেয়ে কাছাকাছি থাকে (Best Fit Line), তবে সেই রেখাটিই হলো Simple Linear Regression Model।",
      whyImportant: "এটি মেশিন লার্নিংয়ের 'Hello World'। এর মাধ্যমে Cost Function, Gradient Descent, এবং OLS (Ordinary Least Squares)-এর মতো মৌলিক কনসেপ্টগুলো সহজে বোঝা যায় যা ভবিষ্যতে জটিল নিউরাল নেটওয়ার্কেও ব্যবহৃত হয়।",
      keyPoints: [
        {
          title: "Single Feature (একক ফিচার)",
          explanation: "মডেলে মাত্র একটি ইনপুট কলাম X থাকে।"
        },
        {
          title: "Parameters: Slope and Intercept",
          explanation: "সরলরেখাটির দুটি প্যারামিটার থাকে: ঢাল বা Slope (\beta_1) এবং ওয়াই-ছেদক বা Intercept (\beta_0)।"
        },
        {
          title: "Linearity Assumption",
          explanation: "ধরে নেওয়া হয় X এবং Y-এর মধ্যে সরাসরি সরলরৈখিক সম্পর্ক বিদ্যমান।"
        }
      ],
      realWorldAnalogy: "পড়াশোনার ঘণ্টা (X) বনাম পরীক্ষার নম্বর (Y): কোনো ছাত্র যদি প্রতিদিন গড়ে ১ ঘণ্টা বেশি পড়ে তবে তার পরীক্ষায় কত নম্বর বাড়তে পারে, তা একটি সরলরেখা দিয়ে হিসাব করা।",
      formulaOrRule: "Hypothesis Equation: \hat{y} = \beta_0 + \beta_1 x, \quad \beta_1 = \frac{\text{Cov}(X, Y)}{\text{Var}(X)}, \quad \beta_0 = \bar{y} - \beta_1 \bar{x}.",
      commonMistakes: "মনে করা যে বাস্তব জীবনের সব সম্পর্কই সরলরৈখিক। যদি সম্পর্কটি বক্ররৈখিক (Non-linear) হয়, তবে Simple Linear Regression মারাত্মক আন্ডারফিটিং (Underfitting) ঘটাবে।",
      examTips: "গ্রাফে X ও Y অক্ষ এঁকে Scatter Points দেখাবেন এবং তাদের মাঝখান দিয়ে Best Fit Line এঁকে Slope (\beta_1) ও Intercept (\beta_0) চিহ্নিত করবেন।"
    },
    10: {
      topicNumber: 10,
      titleEn: "Cost function: Mean Squared Error (MSE)",
      titleBn: "Cost Function: Mean Squared Error (MSE)",
      subtitleBn: "মডেলের ভুল পরিমাপ ও অপটিমাইজেশনের ভিত্তিপ্রস্তর",
      simpleSummary: "Cost Function (বা Loss Function) হলো এমন একটি গাণিতিক ফাংশন যা পরিমাপ করে আমাদের মডেলের প্রেডিকশন আসল উত্তরের চেয়ে গড়ে কতটা ভুল হচ্ছে। Simple Linear Regression-এ সবচেয়ে বহুল ব্যবহৃত Cost Function হলো Mean Squared Error (MSE), যা প্রতিটি পয়েন্টের ভুলের বর্গের গড় মান হিসাব করে।",
      coreIntuition: "ভাবুন একজন আর্চার বা তীরন্দাজ টার্গেটে তীর ছুড়ছে। প্রতিটি তীর লক্ষ্যবিন্দু থেকে কতটা দূরে লাগল তা মেপে গড় দূরত্ব বের করাই হলো Cost Function। যে তীরের দূরত্ব যত কম, তীরন্দাজের লক্ষ্য তত নিখুঁত।",
      whyImportant: "মডেল নিজে নিজে ভালো বা খারাপ বিচার করতে পারে না। Cost Function মডেলকে একটি একক সংখ্যা (Scalar Value) দেয় যা যত কম হবে, মডেল তত নির্ভুল হবে। Gradient Descent অ্যালগরিদম এই Cost Function-কে শূন্যের কাছাকাছি নামিয়ে আনার চেষ্টা করে।",
      keyPoints: [
        {
          title: "Squaring the Residuals (বর্গ করার কারণ)",
          explanation: "ভুল ধনাত্মক (+ve) বা ঋণাত্মক (-ve) যাই হোক না কেন, বর্গ করলে তা ধনাত্মক হয় এবং বড় ভুলগুলোকে বেশি পেনাল্টি দেয়।"
        },
        {
          title: "Differentiability (অন্তরীকরণযোগ্যতা)",
          explanation: "MSE একটি Smooth এবং Convex ফাংশন, তাই এর প্রথম ডেরিভেটিভ সহজে নিয়ে গ্লোবাল মিনিমামে পৌঁছানো যায়।"
        },
        {
          title: "Sensitivity to Outliers",
          explanation: "বর্গ করার কারণে আউটলায়ার বা চরম মান থাকলে MSE খুব দ্রুত বৃদ্ধি পায়।"
        }
      ],
      realWorldAnalogy: "একজন দরজির কাপড় সেলাই: কাঙ্ক্ষিত মাপের চেয়ে কাপড় ১ সেন্টিমিটার ছোট হলে তা সহজে মেরামত করা যায়, কিন্তু ৫ সেন্টিমিটার ছোট হলে পুরো কাপড়টাই নষ্ট হয়ে যায়। MSE বড় ভুলকে বর্গের হারে শাস্তি দেয়।",
      formulaOrRule: "MSE Cost Function: J(\beta_0, \beta_1) = \frac{1}{2N} \sum_{i=1}^N (y_i - (\beta_0 + \beta_1 x_i))^2.",
      commonMistakes: "Loss Function এবং Cost Function-এর পার্থক্য না বোঝা। একটি একক ডেটা পয়েন্টের ভুল হলো Loss, আর পুরো ডেটাসেটের গড় ভুল হলো Cost Function।",
      examTips: "MSE-এর গাণিতিক সমীকরণটি লিখবেন এবং কেন বর্গ করা হয় (১. চিহ্নহীন ধনাত্মক মান করা, ২. বড় ভুলকে জরিমানা করা, ৩. সহজে ডেরিভেটিভ করা) এই ৩টি কারণ পয়েন্ট আকারে লিখবেন।"
    }
  },

  // =========================================================================
  // SEGMENT 3: 003_001 - Logistic Regression
  // =========================================================================
  "003_001_logistic-regression": {
    0: {
      topicNumber: 0,
      titleEn: "Classification concept",
      titleBn: "Classification Concept (শ্রেণিবিন্যাসের মূল ধারণা)",
      subtitleBn: "ডিসক্রিট বা ক্যাটাগোরিক্যাল আউটপুট অনুমানের কৌশল",
      simpleSummary: "Classification হলো Supervised Machine Learning-এর এমন একটি শাখা, যার উদ্দেশ্য হলো কোনো ডেটা পয়েন্টকে তার বৈশিষ্ট্যের ওপর ভিত্তি করে পূর্বনির্ধারিত দুই বা ততোধিক স্বতন্ত্র শ্রেণীতে (Discrete Classes বা Categories) অন্তর্ভুক্ত করা। যেমন: একটি ইমেল স্প্যাম নাকি আসল, টিউমারটি বিনাইন নাকি ম্যালিগন্যান্ট।",
      coreIntuition: "পোস্ট অফিসে যখন চিঠি আসে, কর্মী চিঠির পিনকোড দেখে চিঠিগুলোকে নির্দিষ্ট শহরের ব্যাগে আলাদা আলাদা করে রাখেন। চিঠির ঠিকানা হলো Features আর শহরের নাম হলো Class Label। এই বাছাই প্রক্রিয়াই হলো Classification।",
      whyImportant: "বাস্তব জগতে সিদ্ধান্ত গ্রহণের অধিকাংশ প্রক্রিয়াই হ্যাঁ/না বা নির্দিষ্ট বিকল্পের মধ্যে সীমাবদ্ধ থাকে। ফ্রড ডিটেকশন, রোগ নির্ণয়, ফেস রিকগনিশন ইত্যাদি সব প্রধান AI অ্যাপ্লিকেশনই Classification-এর ওপর ভিত্তি করে তৈরি।",
      keyPoints: [
        {
          title: "Binary Classification",
          explanation: "যখন সম্ভাব্য ফলাফল মাত্র দুটি (যেমন: 0 বা 1, True বা False, Pass বা Fail)।"
        },
        {
          title: "Multiclass Classification",
          explanation: "যখন সম্ভাব্য ফলাফল তিন বা ততোধিক (যেমন: লাল, সবুজ, নীল বা ডিজিট 0 থেকে 9)।"
        },
        {
          title: "Decision Boundary",
          explanation: "যে জ্যামিতিক রেখা বা সারফেস বিভিন্ন ক্লাসের ডেটা পয়েন্টগুলোকে একে অপরের থেকে পৃথক করে।"
        }
      ],
      realWorldAnalogy: "ব্যাংকে ক্রেডিট কার্ডের স্বয়ংক্রিয় ফ্রড ডিটেকশন সিস্টেম: প্রতিবার সোয়াইপ করার সময় লেনদেনটিকে 'বৈধ (Legitimate)' অথবা 'প্রতারণামূলক (Fraud)' ক্যাটাগরিতে ভাগ করা।",
      formulaOrRule: "Classification Mapping: f: \mathcal{X} \rightarrow \mathcal{Y}, \quad \text{where } \mathcal{Y} \in \{0, 1\} \text{ (Binary) or } \mathcal{Y} \in \{1, 2, \dots, K\} \text{ (Multiclass)}.",
      commonMistakes: "Regression এবং Classification-এর পার্থক্য গুলিয়ে ফেলা। স্টুডেন্ট পরীক্ষায় কত মার্কস পাবে (যেমন ৭৮.৫) তা Regression, কিন্তু সে পাস করবে নাকি ফেল করবে তা Classification।",
      examTips: "Binary vs Multiclass Classification-এর তুলনা ছক আকারে লিখবেন এবং একটি 2D প্লটে দুটি ভিন্ন প্রতীকের (বৃত্ত ও ক্রস) ডেটা পয়েন্ট এঁকে মাঝে Decision Boundary দেখাবেন।"
    },
    3: {
      topicNumber: 3,
      titleEn: "Logistic Regression",
      titleBn: "Logistic Regression (লজিস্টিক রিগ্রেশন)",
      subtitleBn: "সম্ভাব্যতা ভিত্তিক ক্লাসিফিকেশনের শক্তিশালী অ্যালগরিদম",
      simpleSummary: "নামে 'Regression' হলেও Logistic Regression মূলত একটি ক্লাসিফিকেশন অ্যালগরিদম। এটি ইনপুট ফিচারের ওপর ভিত্তি করে একটি ঘটনা ঘটার সম্ভাব্যতা (Probability p between 0 and 1) পরিমাপ করে এবং একটি নির্দিষ্ট থ্রেশহোল্ড (যেমন 0.5)-এর ওপর ভিত্তি করে ডেটাকে Class 0 অথবা Class 1-এ বিভক্ত করে।",
      coreIntuition: "Linear Regression অসীম পর্যন্ত বিস্তৃত মান (-\infty থেকে +\infty) দিতে পারে যা কোনো ঘটনার সম্ভাবনা (Probability) হতে পারে না। Logistic Regression একটি বিশেষ S-আকৃতির Sigmoid ফাংশন ব্যবহার করে সেই সরলরেখাকে সংকুচিত করে 0 থেকে 1-এর সীমার মধ্যে আটকে ফেলে।",
      whyImportant: "এটি যেকোনো ক্লাসিফিকেশন সমস্যার জন্য ইন্ডাস্ট্রির প্রথম বেঞ্চমার্ক মডেল। এটি শুধু ক্লাস বলে দেয় না, বরং মডেল কতটা নিশ্চিত (Probability Score) তাও জানিয়ে দেয়। এটি দ্রুত, সহজে ব্যাখ্যাযোগ্য (Interpretable) এবং রিসোর্স-সাশ্রয়ী।",
      keyPoints: [
        {
          title: "Sigmoid / Logistic Function",
          explanation: "যে কোনো বাস্তব সংখ্যাকে 0 এবং 1-এর মধ্যবর্তী সম্ভাবনায় রূপান্তরিত করে।"
        },
        {
          title: "Decision Threshold",
          explanation: "সাধারণত P >= 0.5 হলে Class 1, নতুবা Class 0। তবে মেডিকেল ক্ষেত্রে থ্রেশহোল্ড কমিয়ে 0.3 বা 0.2 করা যায়।"
        },
        {
          title: "Log-Odds / Logit Link",
          explanation: "ইনপুট ভ্যারিয়েবলের লিনিয়ার কম্বিনেশনের সাথে লজিস্টিক সমীকরণ লগ-অডস লিঙ্ক করে।"
        }
      ],
      realWorldAnalogy: "একজন রোগীর টিউমারের সাইজের ওপর ভিত্তি করে চিকিৎসকের সম্ভাবনা নির্ণয়: সাইজ খুব ছোট হলে ম্যালিগন্যান্ট হওয়ার সম্ভাবনা ০.০২ (২%), কিন্তু সাইজ ৫ সেন্টিমিটারের বেশি হলে সম্ভাবনা ০.৯৮ (৯৮%)।",
      formulaOrRule: "Sigmoid Equation: P(Y=1|X) = \sigma(z) = \frac{1}{1 + e^{-z}}, \quad \text{where } z = \beta_0 + \beta_1 x_1 + \dots + \beta_p x_p.",
      commonMistakes: "Logistic Regression-এ Ordinary Least Squares (MSE) ব্যবহার করার চেষ্টা করা। Logistic Regression-এ MSE দিলে Cost Function নন-কনভেক্স (Non-convex) হয়ে যায়, তাই সর্বদা Binary Cross-Entropy (Log Loss) ব্যবহার করতে হয়।",
      examTips: "পরীক্ষায় Sigmoid ফাংশনের S-কার্ভ গ্রাফটি এঁকে Z=0-তে মান 0.5 এবং Z ➔ \infty-তে 1 ও Z ➔ -\infty-তে 0 দেখিয়ে সমীকরণটি লিখবেন।"
    }
  },

  // =========================================================================
  // SEGMENT 4: 004_001 - K-Means Clustering
  // =========================================================================
  "004_001_k-means-clustering": {
    0: {
      topicNumber: 0,
      titleEn: "Clustering concept",
      titleBn: "Clustering Concept (ক্লাস্টারিংয়ের মূল ধারণা)",
      subtitleBn: "লেবেলবিহীন ডেটার নিজস্ব সাদৃশ্যের ভিত্তিতে দল গঠন",
      simpleSummary: "Clustering হলো একটি Unsupervised Machine Learning টেকনিক, যেখানে কোনো পূর্বনির্ধারিত লেবেল বা উত্তর ছাড়াই একগুচ্ছ ডেটা পয়েন্টের পারস্পরিক সাদৃশ্য (Similarity) ও দূরত্বের ওপর ভিত্তি করে তাদেরকে কয়েকটি অর্থবহ দলে বা গুচ্ছে (Clusters) বিভক্ত করা হয়। একই ক্লাস্টারের পয়েন্টগুলো একে অপরের সাথে দারুণভাবে সাদৃশ্যপূর্ণ হয়, কিন্তু অন্য ক্লাস্টারের পয়েন্ট থেকে সম্পূর্ণ ভিন্ন হয়।",
      coreIntuition: "ভাবুন আপনার টেবিলে ছড়িয়ে থাকা লাল, নীল ও সবুজ রঙের অনেকগুলো মার্বেল। কেউ আপনাকে কিছু না বললেও আপনি নিজে থেকেই রঙ অনুযায়ী মার্বেলগুলোকে ৩টি আলাদা পাত্রে সাজিয়ে ফেলবেন। এই স্বয়ংক্রিয় গ্রুপিংই হলো Clustering।",
      whyImportant: "বাস্তব জগতে অধিকাংশ ডেটাই আনলেবেলড (Unlabeled)। মানুষের পক্ষে কোটি কোটি ডেটা পয়েন্টে ম্যানুয়ালি লেবেল বসানো অসম্ভব। ক্লাস্টারিং ডেটার অন্তর্নিহিত প্যাটার্ন উন্মোচন করে নতুন অন্তর্দৃষ্টি (Insights) এনে দেয়।",
      keyPoints: [
        {
          title: "High Intra-cluster Similarity",
          explanation: "একই দলের ভেতরের ডেটা পয়েন্টগুলোর মধ্যে দূরত্ব সর্বনিম্ন থাকে।"
        },
        {
          title: "Low Inter-cluster Similarity",
          explanation: "ভিন্ন ভিন্ন দলের মধ্যবর্তী দূরত্ব সর্বোচ্চ থাকে।"
        },
        {
          title: "Unsupervised Paradigm",
          explanation: "এখানে কোনো শিক্ষক বা টার্গেট লেবেল থাকে না; ডেটা নিজেই তার গঠন প্রকাশ করে।"
        }
      ],
      realWorldAnalogy: "ই-কমার্স বা সুপারমার্কেটে কাস্টমার সেগমেন্টেশন: গ্রাহকদের কেনাকাটার বাজেট এবং ক্রয়ের ফ্রিকোয়েন্সির ওপর ভিত্তি করে ভিআইপি ক্রেতা, রেগুলার ক্রেতা এবং ডিসকাউন্ট সন্ধানকারী গ্রুপ তৈরি করা।",
      formulaOrRule: "Objective: \min \sum_{k=1}^K \sum_{x \in C_k} \|x - \mu_k\|^2, \quad \text{where } \mu_k \text{ is the mean of cluster } C_k.",
      commonMistakes: "Clustering এবং Classification-এর পার্থক্য গুলিয়ে ফেলা। Classification-এ আগে থেকেই ক্লাসের নাম জানা থাকে (Supervised), কিন্তু Clustering-এ ক্লাসের কোনো নাম বা লেবেল জানা থাকে না (Unsupervised)।",
      examTips: "Intra-cluster variance বনাম Inter-cluster variance-এর সংজ্ঞা লিখবেন এবং একটি 2D প্লটে তিনটি বৃত্তাকার গুচ্ছ এঁকে ক্লাস্টার চিহ্নিত করবেন।"
    },
    3: {
      topicNumber: 3,
      titleEn: "K-Means algorithm",
      titleBn: "K-Means Algorithm (কে-মিন্স অ্যালগরিদম)",
      subtitleBn: "সেন্ট্রয়েড ভিত্তিক ইটারেটিভ ক্লাস্টারিংয়ের জনপ্রিয় অ্যালগরিদম",
      simpleSummary: "K-Means হলো সবচেয়ে জনপ্রিয় ও দ্রুতগতির সেন্ট্রয়েড-ভিত্তিক পার্টশনিং ক্লাস্টারিং অ্যালগরিদম। এটি সম্পূর্ণ ডেটাসেটকে ব্যবহারকারীর নির্ধারিত K সংখ্যক ক্লাস্টারে ভাগ করে। অ্যালগরিদমটি বারবার দুটি ধাপ পুনরাবৃত্তি করে: ১. প্রতিটি ডেটা পয়েন্টকে তার নিকটতম সেন্ট্রয়েডের ক্লাস্টারে অ্যাসাইন করা, এবং ২. ক্লাস্টারের সমস্ত পয়েন্টের গড় নিয়ে নতুন সেন্ট্রয়েড হিসাব করা।",
      coreIntuition: "একটি নতুন শহরের K টি ভিন্ন এলাকায় K টি পুলিশ ফাঁড়ি বসানোর মতো। প্রথমে যেকোনো জায়গায় ফাঁড়িগুলো বসানো হলো। তারপর প্রতিটি বাড়ির মানুষ তার কাছের ফাঁড়িতে রিপোর্ট করল। এরপর ফাঁড়িগুলোকে ঠিক সেই এলাকার বাড়িগুলোর ভৌগোলিক কেন্দ্রবিন্দুতে স্থানান্তর করা হলো। এই প্রক্রিয়া বাড়ি ও ফাঁড়ির অবস্থান স্থির না হওয়া পর্যন্ত চলতে থাকে।",
      whyImportant: "অত্যন্ত দ্রুত এবং বিশাল বিগ ডেটাসেটে সহজে স্কেল করতে পারে (Time Complexity O(N K d i))। ইমেজ কম্প্রেশন, ডকুমেন্ট ক্লাস্টারিং এবং কাস্টমার সেগমেন্টেশনে এটি প্রথম পছন্দ।",
      keyPoints: [
        {
          title: "Initialization (শুরু)",
          explanation: "প্রথমে র্যান্ডমলি K টি প্রাথমিক সেন্ট্রয়েড নির্বাচন করা হয়।"
        },
        {
          title: "Assignment Step",
          explanation: "প্রতিটি ডেটা পয়েন্টের জন্য ইউক্লিডিয়ান দূরত্ব মেপে নিকটতম সেন্ট্রয়েডের সাথে ট্যাগ করা হয়।"
        },
        {
          title: "Update Step",
          explanation: "প্রতিটি ক্লাস্টারের ডেটা পয়েন্টগুলোর গড় অবস্থান নিয়ে নতুন সেন্ট্রয়েড নির্ধারিত হয়।"
        },
        {
          title: "Convergence",
          explanation: "যখন সেন্ট্রয়েডের অবস্থান আর পরিবর্তিত হয় না, অ্যালগরিদম থেমে যায়।"
        }
      ],
      realWorldAnalogy: "একটি আন্তর্জাতিক সম্মেলনের প্রতিনিধিদের ভাষা অনুযায়ী টেবিল বরাদ্দ করা: প্রথমে টেবিলে প্রতিনিধিরা বসেন, তারপর তাদের সাধারণ ভাষার সাথে মিল রেখে টেবিলের আসন বিন্যাস পুনর্বিন্যাস করা হয়।",
      formulaOrRule: "Centroid Update Formula: \mu_k = \frac{1}{|C_k|} \sum_{x_i \in C_k} x_i, \quad \text{Euclidean Distance: } d(x, \mu) = \sqrt{\sum_{j=1}^d (x_j - \mu_j)^2}.",
      commonMistakes: "K-এর মান আগে থেকেই না বুঝে র্যান্ডমভাবে সিলেক্ট করা এবং ডেটা নরমালাইজ না করা। স্কেলিং না করলে বড় স্কেলের ফিচার পুরো দূরত্ব গণনাকে প্রভাবিত করে ফেলে।",
      examTips: "K-Means-এর ৪টি ধাপ (Initialize ➔ Assign ➔ Update ➔ Converge) ফ্লোচার্ট এঁকে উপস্থাপন করবেন এবং অপটিমাল K নির্বাচনের জন্য Elbow Method-এর কার্ভটি আঁকবেন।"
    }
  },

  // =========================================================================
  // SEGMENT 9: 009_001 - NumPy Essentials
  // =========================================================================
  "009_001_numpy-essentials": {
    0: {
      topicNumber: 0,
      titleEn: "Introduction to NumPy",
      titleBn: "Introduction to NumPy (নামপাই পরিচিতি ও প্রয়োজনীয়তা)",
      subtitleBn: "পাইথনে বৈজ্ঞানিক কম্পিউটিং ও উচ্চগতির বহুমাত্রিক অ্যারে প্রসেসিং",
      simpleSummary: "NumPy (Numerical Python) হলো পাইথনের সবচেয়ে অপরিহার্য কোর সায়েন্টিফিক লাইব্রেরি। এটি বহুমাত্রিক অ্যারে (ndarray) এবং ম্যাট্রিক্সের ওপর অত্যন্ত দ্রুত গাণিতিক ও লিনিয়ার অ্যালজেব্রা গণনা সম্পাদনের সুবিধা দেয়। আধুনিক প্রায় সব ডেটা সায়েন্স লাইব্রেরি—Pandas, SciPy, Scikit-Learn, TensorFlow—NumPy-এর ওপর ভিত্তি করে নির্মিত।",
      coreIntuition: "সাধারণ পাইথন লিস্ট হলো বিভিন্ন ধরণের জিনিস রাখা একটি ড্রয়ারের মতো—এতে ওভারহেড অনেক বেশি এবং ধীরগতির। কিন্তু NumPy অ্যারে হলো একটি সুনির্দিষ্ট সামরিক প্যারেডের মতো—সবকিছু সমজাতীয় (Homogeneous) এবং মেমোরিতে পরপর সংলগ্ন (Contiguous) থাকে, ফলে বিদ্যুৎগতিতে প্রসেস হয়।",
      whyImportant: "পাইথনে সাধারণ লুপের মাধ্যমে লাখ লাখ সংখ্যার গুণ বা ম্যাট্রিক্স গুণ করতে গেলে অনেক সময় নষ্ট হয়। NumPy সি (C) এবং ফোরট্রান (Fortran)-এ লেখা ব্যাকএন্ড ব্যবহার করে ভেক্টরাইজড অপারেশন চালায় যা সাধারণ পাইথনের চেয়ে ৫০ থেকে ১০০ গুণ দ্রুত।",
      keyPoints: [
        {
          title: "ndarray Object",
          explanation: "একই ধরণের উপাত্ত বিশিষ্ট দ্রুতগতির এন-ডাইমেনশনাল অ্যারে স্ট্রাকচার।"
        },
        {
          title: "Vectorization",
          explanation: "কোনো পাইথন 'for-loop' ছাড়াই সরাসরি সম্পূর্ণ অ্যারের ওপর গাণিতিক অপারেশন প্রয়োগ।"
        },
        {
          title: "Contiguous Memory Allocation",
          explanation: "কম্পিউটারের র‍্যামে একটানা ব্লকে ডেটা জমা থাকে, ফলে CPU Cache অপটিমাইজেশন সর্বোচ্চ কাজে লাগে।"
        }
      ],
      realWorldAnalogy: "একটি গুদামে এক এক করে জিনিসপত্র বয়ে নেওয়ার বদলে একটি স্বয়ংক্রিয় কনভেয়ার বেল্টের মাধ্যমে একসাথে হাজার হাজার পণ্য দ্রুত পরিবহন করা।",
      formulaOrRule: "Import Convention: import numpy as np, \quad arr = np.array([1, 2, 3]), \quad \text{Speedup: } \mathcal{O}(N) \text{ C-optimized} \gg \text{Python Bytecode Loop}.",
      commonMistakes: "NumPy অ্যারেতে বিভিন্ন ডেটা টাইপ (যেমন স্ট্রিং এবং সংখ্যা) মেশানোর চেষ্টা করা। NumPy সর্বদা সম্পূর্ণ অ্যারেকে একটি একক ডেটা টাইপে (যেমন স্ট্রিং) আপকাস্ট করে দেয়।",
      examTips: "Python List vs NumPy Array-এর ৩টি মূল পার্থক্য লিখবেন: ১. Homogeneous vs Heterogeneous, ২. Contiguous Memory vs Pointer Array, ৩. Vectorized Math vs Explicit Loops।"
    },
    2: {
      topicNumber: 2,
      titleEn: "ndarray concept",
      titleBn: "ndarray Concept (এন-ডাইমেনশনাল অ্যারের গঠন)",
      subtitleBn: "NumPy-এর মূল ডেটা স্ট্রাকচার ও মেমোরি লেআউট",
      simpleSummary: "ndarray (N-dimensional Array) হলো NumPy-এর প্রাণকেন্দ্র। এটি একটি সমজাতীয় (Homogeneous) উপাত্তের গ্রিড যা শূন্য, এক বা একাধিক মাত্রার হতে পারে। এটি মেমোরিতে অত্যন্ত সংকুচিত আকারে সংরক্ষিত থাকে এবং এর প্রতিটি এলিমেন্টের আকার পূর্বনির্দিষ্ট (যেমন int32, float64)।",
      coreIntuition: "০-ডি হলো একটি একক বিন্দু বা সংখ্যা (Scalar), ১-ডি হলো একটি লাইন বা স্কেল (Vector), ২-ডি হলো একটি কাগজের পৃষ্ঠা বা টেবিল (Matrix), এবং ৩-ডি হলো একটি বই বা কালার ছবির লাল-সবুজ-নীল চ্যানেলযুক্ত কিউব (Tensor)।",
      whyImportant: "মেশিন লার্নিংয়ের সমস্ত ডেটা আসলে সংখ্যা ও ম্যাট্রিক্স। ইমেজ, টেক্সট বা অডিও যাই হোক না কেন, কম্পিউটার শেষ পর্যন্ত সেগুলোকে ndarray-তে কনভার্ট করে তবেই অ্যালগরিদমে ইনপুট দেয়।",
      keyPoints: [
        {
          title: "shape & ndim Attribute",
          explanation: "shape অ্যারের প্রতিটি ডাইমেনশনের সাইজ বলে এবং ndim মোট মাত্রার সংখ্যা জানায়।"
        },
        {
          title: "dtype Attribute",
          explanation: "অ্যারেতে কোন ধরণের ডেটা আছে (যেমন: int64, float32, bool) তা প্রকাশ করে।"
        },
        {
          title: "Broadcasting Capability",
          explanation: "ভিন্ন আকারের দুটি অ্যারেকে স্বয়ংক্রিয়ভাবে প্রসারিত করে পরস্পরের মধ্যে গাণিতিক অপারেশন চালানোর জাদু।"
        }
      ],
      realWorldAnalogy: "একটি বহুতল অ্যাপার্টমেন্ট বিল্ডিং: তলা নম্বর, করিডোর নম্বর এবং ফ্ল্যাট নম্বর মিলে যেমন প্রতিটি কক্ষের সুনির্দিষ্ট ৩ডি স্থানাঙ্ক (Coordinate) পাওয়া যায়, ndarray-ও ঠিক তেমনই মাল্টি-ডাইমেনশনাল ইনডেক্সিং করে।",
      formulaOrRule: "Dimensional Hierarchy: 0D = Scalar, 1D = Vector (shape: (n,)), 2D = Matrix (shape: (m, n)), 3D+ = Tensor (shape: (d1, d2, d3)).",
      commonMistakes: "অ্যারের .shape এবং .size-এর মধ্যে তালগোল পাকানো। shape হলো মাত্রাগত আকার (যেমন (3, 4)), আর size হলো মোট উপাদানের সংখ্যা (যেমন 12)।",
      examTips: "একটি ১-ডি, ২-ডি এবং ৩-ডি অ্যারের চিত্র এঁকে shape, ndim এবং dtype বৈশিষ্ট্যগুলো পয়েন্ট করে পরীক্ষায় দেখাবেন।"
    }
  }
};
