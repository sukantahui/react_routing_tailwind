export const topic2Questions = [
  {
    id: 1,
    question: "Which of the following best defines Machine Learning (ML)?",
    options: [
      "Explicitly programming every single logic rule using nested if-else statements",
      "A subset of AI that allows software systems to learn and improve from experience without being explicitly programmed",
      "A hardware acceleration device used strictly for graphics rendering",
      "A robotic operating mechanism that operates only on pre-recorded audio tracks"
    ],
    correctAnswer: 1,
    explanationEn: "Machine Learning (ML) is a subset of AI where mathematical models learn patterns from empirical data rather than relying solely on manually written rule-based logic.",
    explanationBn: "মেশিন লার্নিং (ML) হলো কৃত্রিম বুদ্ধিমত্তার (AI) একটি শাখা যেখানে কম্পিউটার ডেটা থেকে প্যাটার্ন শিখে নিজে সিদ্ধান্ত নিতে পারে, প্রতিটা নিয়ম আলাদাভাবে কোড না করেই।"
  },
  {
    id: 2,
    question: "In Supervised Learning, the training dataset consists of:",
    options: [
      "Only input features without any target labels",
      "Input features paired with corresponding ground-truth output labels",
      "Random reward signals generated from an interactive environment",
      "Unstructured audio streams with no metadata"
    ],
    correctAnswer: 1,
    explanationEn: "Supervised Learning requires labeled data consisting of input features (X) and target ground-truth output labels (Y), allowing the algorithm to minimize error.",
    explanationBn: "সুপারভাইজড লার্নিংয়ে ইনপুট ডেটার (X) সাথে তার সঠিক আউটপুট লেবেল (Y) জোড়া হিসেবে দেওয়া থাকে যাতে মডেল ভুলের পরিমাণ কমাতে পারে।"
  },
  {
    id: 3,
    question: "Which learning paradigm is used when predicting continuous numerical values like tomorrow's temperature or house prices?",
    options: [
      "Classification (Supervised Learning)",
      "Regression (Supervised Learning)",
      "Clustering (Unsupervised Learning)",
      "Reinforcement Learning"
    ],
    correctAnswer: 1,
    explanationEn: "Regression is a supervised learning task where the target output variable is continuous and numeric (e.g., price, temperature, stock index).",
    explanationBn: "রিগ্রেশন (Regression) হলো সুপারভাইজড লার্নিংয়ের এমন একটি কাজ যেখানে আউটপুট একটি চলমান সংখ্যাসূচক মান (যেমন তাপমাত্রা, বাড়ির দাম)।"
  },
  {
    id: 4,
    question: "Categorizing incoming emails into 'Spam' or 'Inbox' is an example of which ML task?",
    options: [
      "Binary Classification",
      "Linear Regression",
      "K-Means Clustering",
      "Dimensionality Reduction"
    ],
    correctAnswer: 0,
    explanationEn: "Classifying data into discrete categories (here, Spam vs. Non-Spam) is a Supervised Binary Classification task.",
    explanationBn: "ইমেল স্প্যাম নাকি ইনবক্সে যাবে—এই ধরনের দুটি আলাদা শ্রেণীতে ভাগ করাকে বাইনারি ক্লাসিফিকেশন (Binary Classification) বলে।"
  },
  {
    id: 5,
    question: "Which of the following is the primary characteristic of Unsupervised Learning?",
    options: [
      "Models are trained using labeled output values from domain experts",
      "Models explore unlabeled data to discover hidden patterns, groupings, and underlying structures",
      "Agents learn through trail-and-error rewards in dynamic video game worlds",
      "Systems strictly follow human voice prompts without processing numbers"
    ],
    correctAnswer: 1,
    explanationEn: "Unsupervised Learning processes unlabelled datasets to find intrinsic clusters, associations, and geometric densities without supervisor feedback.",
    explanationBn: "আনসুপারভাইজড লার্নিংয়ে কোনো লেবেলযুক্ত আউটপুট থাকে না; অ্যালগরিদম নিজেই ডেটার ভেতরের লুকানো গঠন বা ক্লাস্টার খুঁজে বের করে।"
  },
  {
    id: 6,
    question: "Customer segmentation in e-commerce (grouping buyers by purchasing habits without predefined classes) is achieved using:",
    options: [
      "Reinforcement Q-Learning",
      "Clustering (e.g., K-Means in Unsupervised Learning)",
      "Supervised Polynomial Regression",
      "Deterministic Finite Automata"
    ],
    correctAnswer: 1,
    explanationEn: "Customer segmentation groups similar customer profiles based on similarity metrics using clustering algorithms like K-Means.",
    explanationBn: "গ্রাহকদের কেনাকাটার ধরনের ওপর ভিত্তি করে বিভিন্ন দলে ভাগ করা (Customer Segmentation) আনসুপারভাইজড ক্লাস্টারিং দ্বারা করা হয়।"
  },
  {
    id: 7,
    question: "In Reinforcement Learning (RL), an autonomous agent learns optimal policies through:",
    options: [
      "Labeled pairs of input images and names",
      "Interacting with an environment and receiving rewards or penalties",
      "Clustering customer geographic locations",
      "Hardcoded switch-case conditions"
    ],
    correctAnswer: 1,
    explanationEn: "Reinforcement Learning relies on trial-and-error interactions where an agent takes actions in an environment to maximize cumulative reward.",
    explanationBn: "রিইনফোর্সমেন্ট লার্নিংয়ে একটি এজেন্ট পরিবেশের সাথে মিথস্ক্রিয়া করে পুরষ্কার (Reward) বা শাস্তির (Penalty) মাধ্যমে সর্বোত্তম কাজ শেখে।"
  },
  {
    id: 8,
    question: "Which of the following systems famously used Reinforcement Learning to defeat human champions in chess and Go?",
    options: [
      "AlphaGo / AlphaZero by DeepMind",
      "Simple Linear Regression in Excel",
      "PageRank algorithm",
      "Dijkstra's Shortest Path Algorithm"
    ],
    correctAnswer: 0,
    explanationEn: "AlphaGo and AlphaZero utilized deep reinforcement learning and self-play to master board games without human guidance.",
    explanationBn: "ডিপমাইন্ডের AlphaGo এবং AlphaZero ডিপ রিইনফোর্সমেন্ট লার্নিং ও সেলফ-প্লে ব্যবহারের মাধ্যমে দাবা ও গো খেলায় চ্যাম্পিয়নদের পরাজিত করেছে।"
  },
  {
    id: 9,
    question: "What distinguishes Deep Learning (DL) from traditional Machine Learning?",
    options: [
      "Deep Learning uses shallow single-node decision trees only",
      "Deep Learning utilizes deep Artificial Neural Networks (ANNs) with multiple hidden layers to automatically extract features",
      "Deep Learning works only on static relational SQL tables",
      "Deep Learning requires zero computing power and executes entirely in RAM registers"
    ],
    correctAnswer: 1,
    explanationEn: "Deep Learning uses multi-layered artificial neural networks (deep ANNs) that automatically perform hierarchical feature extraction from raw data.",
    explanationBn: "ডিপ লার্নিংয়ে বহুস্তরবিশিষ্ট নিউরাল নেটওয়ার্ক (ANN) ব্যবহৃত হয় যা ডেটা থেকে জটিল বৈশিষ্ট্যগুলি নিজে থেকেই বের করে নিতে পারে।"
  },
  {
    id: 10,
    question: "What are the three fundamental layers of an Artificial Neural Network (ANN)?",
    options: [
      "Server layer, Router layer, Client layer",
      "Input layer, Hidden layer(s), and Output layer",
      "Header layer, Payload layer, Footer layer",
      "RAM layer, Cache layer, SSD layer"
    ],
    correctAnswer: 1,
    explanationEn: "An ANN is composed of an Input Layer (receives data), one or more Hidden Layers (computes weights, biases, and activations), and an Output Layer (produces predictions).",
    explanationBn: "একটি কৃত্রিম নিউরাল নেটওয়ার্ক প্রধানত ইনপুট লেয়ার, এক বা একাধিক হিডেন লেয়ার এবং আউটপুট লেয়ার নিয়ে গঠিত।"
  },
  {
    id: 11,
    question: "Which neural network architecture is specifically designed for computer vision and 2D image analysis?",
    options: [
      "Recurrent Neural Network (RNN)",
      "Convolutional Neural Network (CNN)",
      "Simple Linear Perceptron",
      "Decision Stump"
    ],
    correctAnswer: 1,
    explanationEn: "Convolutional Neural Networks (CNNs) use convolutional kernels/filters to detect spatial hierarchies and features in image arrays.",
    explanationBn: "কনভোলিউশনাল নিউরাল নেটওয়ার্ক (CNN) বিশেষভাবে ছবি ও কম্পিউটার ভিশনের কাজে স্থানিক বৈশিষ্ট্য শনাক্ত করতে ব্যবহৃত হয়।"
  },
  {
    id: 12,
    question: "Which neural network architecture specializes in sequential data such as time-series forecasting, speech audio, and text sentences?",
    options: [
      "Recurrent Neural Network (RNN / LSTM / GRU)",
      "Convolutional Neural Network (CNN)",
      "K-Nearest Neighbors (KNN)",
      "Principal Component Analysis (PCA)"
    ],
    correctAnswer: 0,
    explanationEn: "RNNs and their variants (LSTM/GRU) possess internal memory loops suited for sequential and time-dependent input sequences.",
    explanationBn: "রিকারেন্ট নিউরাল নেটওয়ার্ক (RNN / LSTM) ধারাবাহিক ডেটা যেমন টেক্সট বাক্য, অডিও ও টাইম-সিরিজ বিশ্লেষণের জন্য ব্যবহৃত হয়।"
  },
  {
    id: 13,
    question: "In neural network math, what does the 'Activation Function' do?",
    options: [
      "Powers off the computer when training is completed",
      "Introduces non-linearity into the network, enabling it to learn complex non-linear boundaries",
      "Deletes duplicate records from the CSV file",
      "Encrypts the weights with RSA-2048 keys"
    ],
    correctAnswer: 1,
    explanationEn: "Activation functions (e.g., ReLU, Sigmoid, Softmax) introduce non-linear transformations, enabling networks to model non-linear real-world relationships.",
    explanationBn: "অ্যাক্টিভেশন ফাংশন (যেমন ReLU, Sigmoid) নিউরাল নেটওয়ার্কে নন-লিনিয়ারিটি যুক্ত করে যাতে এটি জটিল প্যাটার্ন শিখতে পারে।"
  },
  {
    id: 14,
    question: "What occurs during the 'Training' phase of a Machine Learning model?",
    options: [
      "Model weights and parameters are iteratively adjusted using optimization algorithms (e.g., Gradient Descent) to minimize loss",
      "The software is packaged into an executable installer",
      "End-users submit queries without any changes to model parameters",
      "Code is translated into pure HTML markup"
    ],
    correctAnswer: 0,
    explanationEn: "Training is the computational phase where loss is computed and backpropagated to update synaptic weights via optimization algorithms.",
    explanationBn: "ট্রেনিং পর্বে অপ্টিমাইজেশন অ্যালগরিদমের মাধ্যমে নেটওয়ার্কের ওয়েট ও বায়াস ক্রমাগত পরিবর্তন করে ত্রুটির হার কমানো হয়।"
  },
  {
    id: 15,
    question: "What is 'Overfitting' in Machine Learning?",
    options: [
      "When a model performs exceptionally well on training data but fails to generalize to unseen test data",
      "When a model is too simple to capture even basic patterns in training data",
      "When a dataset has zero rows and cannot be loaded",
      "When training completes in less than one millisecond"
    ],
    correctAnswer: 0,
    explanationEn: "Overfitting occurs when a model memorizes the training data including its noise, resulting in poor generalisation on new test data.",
    explanationBn: "ওভারফিটিং (Overfitting) হলো যখন কোনো মডেল ট্রেনিং ডেটা মুখস্থ করে ফেলে খুব বেশি নম্বর পায় কিন্তু নতুন কোনো অজানা ডেটাতে খারাপ ফলাফল দেয়।"
  },
  {
    id: 16,
    question: "What is 'Underfitting' in Machine Learning?",
    options: [
      "When a model is overly complex with billions of parameters",
      "When a model is too simplistic to learn underlying relationships, performing poorly on both training and test data",
      "When data is stored on optical discs instead of SSDs",
      "When training runs continuously for more than 100 days"
    ],
    correctAnswer: 1,
    explanationEn: "Underfitting occurs when the model has insufficient capacity or inadequate features to learn the underlying trend in the data.",
    explanationBn: "আন্ডারফিটিং (Underfitting) হলো যখন মডেলটি খুবই সরল প্রকৃতির হওয়ায় মূল প্যাটার্নও ধরতে পারে না এবং ট্রেনিং ও টেস্ট উভয় ডেটাতেই খারাপ ফল দেয়।"
  },
  {
    id: 17,
    question: "Why do data scientists split a dataset into Training and Testing sets (e.g., 80% train, 20% test)?",
    options: [
      "To save hard drive storage space",
      "To objectively evaluate model generalization ability on unseen data",
      "Because Python lists cannot hold more than 100 items",
      "To convert text files into binary images"
    ],
    correctAnswer: 1,
    explanationEn: "Splitting data prevents data leakage and provides an unbiased evaluation of how the model performs on real-world unseen examples.",
    explanationBn: "ডেটাকে ট্রেনিং এবং টেস্টিং সেটে ভাগ করা হয় যাতে অজানা নতুন ডেটার ওপর মডেলটির নির্ভুলতা নিরপেক্ষভাবে পরিমাপ করা যায়।"
  },
  {
    id: 18,
    question: "Which of the following is a classic Supervised Learning classification algorithm?",
    options: [
      "Decision Trees / Random Forest",
      "K-Means Clustering",
      "Q-Learning",
      "DBSCAN Density Clustering"
    ],
    correctAnswer: 0,
    explanationEn: "Decision Trees, Random Forests, Support Vector Machines (SVM), and Logistic Regression are standard supervised classification algorithms.",
    explanationBn: "ডিসিশন ট্রি ও র্যান্ডম ফরেস্ট হলো জনপ্রিয় সুপারভাইজড লার্নিং ক্লাসিফিকেশন অ্যালগরিদম।"
  },
  {
    id: 19,
    question: "Which term describes the process of calculating error gradient backward through the network layers to update weights?",
    options: [
      "Backpropagation",
      "Forward propagation",
      "Linear interpolation",
      "Lexical Tokenization"
    ],
    correctAnswer: 0,
    explanationEn: "Backpropagation uses the calculus chain rule to calculate gradients of the loss function with respect to weights from output layer back to input.",
    explanationBn: "ব্যাকপ্রোপাগেশন (Backpropagation) হলো আউটপুট থেকে ইনপুটের দিকে এরর গ্রেডিয়েন্ট হিসাব করে ওয়েট আপডেট করার প্রক্রিয়া।"
  },
  {
    id: 20,
    question: "In an e-commerce recommendation engine, discovering that 'users who bought Bread also bought Butter' is an application of:",
    options: [
      "Association Rule Mining (Unsupervised Learning)",
      "Reinforcement Q-Learning",
      "Deep Convolutional Filters",
      "Boolean Logic Minimization"
    ],
    correctAnswer: 0,
    explanationEn: "Association rule learning (e.g., Apriori algorithm) discovers interesting co-occurrence relations between items in transaction databases.",
    explanationBn: "কেনাকাটার ক্ষেত্রে কোন জিনিসের সাথে কোন জিনিস কেনা হয় তা খুঁজে বের করা অ্যাসোসিয়েশন রুল মাইনিং (আনসুপারভাইজড লার্নিং) এর অংশ।"
  },
  {
    id: 21,
    question: "Self-driving cars learning navigation and obstacle avoidance strategies in simulation environments primarily combine computer vision with:",
    options: [
      "Deep Reinforcement Learning",
      "Pure Static Lookup Tables",
      "Simple Bubble Sort",
      "Basic SQL Joins"
    ],
    correctAnswer: 0,
    explanationEn: "Autonomous vehicles use Deep Reinforcement Learning (DRL) combined with perception neural nets to navigate complex traffic situations.",
    explanationBn: "স্বয়ংক্রিয় গাড়িগুলো কম্পিউটার ভিশন ও ডিপ রিইনফোর্সমেন্ট লার্নিংয়ের সমন্বয়ে পরিবেশের সাথে মানিয়ে নিয়ে ড্রাইভ করতে শেখে।"
  },
  {
    id: 22,
    question: "Which metric is commonly used to evaluate the performance of a Supervised Classification model?",
    options: [
      "Accuracy, Precision, Recall, and F1-Score",
      "Mean Squared Error (MSE) only",
      "CPU Clock Speed in GHz",
      "Network Ping Latency in ms"
    ],
    correctAnswer: 0,
    explanationEn: "Classification models are assessed using confusion matrix metrics such as Accuracy, Precision, Recall, and F1-Score.",
    explanationBn: "ক্লাসিফিকেশন মডেলের দক্ষতা পরিমাপের জন্য অ্যাক্যুরেসি, প্রিসিশন, রিকল ও F1-স্কোর ব্যবহৃত হয়।"
  },
  {
    id: 23,
    question: "Which metric is commonly used to evaluate the performance of a Supervised Regression model?",
    options: [
      "Mean Squared Error (MSE) and Root Mean Squared Error (RMSE)",
      "Accuracy percentage only",
      "F1-Score and ROC-AUC curve",
      "Word Error Rate (WER)"
    ],
    correctAnswer: 0,
    explanationEn: "Regression models predict continuous numbers, so loss is measured by error distances like MSE, RMSE, and Mean Absolute Error (MAE).",
    explanationBn: "রিগ্রেশন মডেল যেহেতু সংখ্যাসূচক মান প্রেডিক্ট করে, তাই এর পরিমাপের জন্য Mean Squared Error (MSE) বা MAE ব্যবহৃত হয়।"
  },
  {
    id: 24,
    question: "What is 'Feature Engineering' in Machine Learning?",
    options: [
      "Designing the plastic exterior case of a physical server",
      "Selecting, transforming, and extracting the most informative variables from raw data to improve model learning",
      "Overclocking the GPU graphics memory",
      "Replacing Python source code with assembly language"
    ],
    correctAnswer: 1,
    explanationEn: "Feature Engineering is the process of using domain knowledge to extract features from raw data that make machine learning algorithms work better.",
    explanationBn: "ফিচার ইঞ্জিনিয়ারিং হলো কাঁচা ডেটা থেকে সবচেয়ে অর্থপূর্ণ বৈশিষ্ট্যগুলো বাছাই ও রূপান্তর করা যাতে মডেল আরও ভালো শিখতে পারে।"
  },
  {
    id: 25,
    question: "Transfer Learning in Deep Learning refers to:",
    options: [
      "Transferring physical hard disks between two computer labs",
      "Taking a pre-trained model developed for a task and reusing/fine-tuning it on a related new task",
      "Converting python scripts into PDF documents",
      "Translating code automatically from C++ to Java"
    ],
    correctAnswer: 1,
    explanationEn: "Transfer Learning leverages knowledge gained while solving one problem (e.g., ImageNet classification) and applying it to a different but related problem.",
    explanationBn: "ট্রান্সফার লার্নিং হলো একটি বড় ডেটাসেটে আগে থেকে ট্রেন করা মডেলের জ্ঞানকে অন্য একটি নির্দিষ্ট নতুন কাজে পুনরায় ব্যবহার ও ফাইন-টিউন করা।"
  }
];
