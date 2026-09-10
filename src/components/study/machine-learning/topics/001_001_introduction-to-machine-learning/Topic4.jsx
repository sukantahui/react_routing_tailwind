import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic4_files/supervised_learning_lab.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

const Topic4 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");
  
  // Dedicated Teacher's Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Weight Tuning Slider (Novice Intuition Studio)
  const [weightInput, setWeightInput] = useState(7.0);
  const [biasInput, setBiasInput] = useState(25.0);

  // Existing interactive studio parameter
  const [parameterScale, setParameterScale] = useState(50);
  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sample student dataset from Barrackpore & Kolkata (Study Hours vs Exam Marks)
  const studentData = [
    { name: "Mamata (Barrackpore)", hours: 2, actualMarks: 40 },
    { name: "Mahima (Kolkata)", hours: 4, actualMarks: 55 },
    { name: "Susmita (Ichapur)", hours: 6, actualMarks: 72 },
    { name: "Debangshu (Salt Lake)", hours: 8, actualMarks: 85 },
    { name: "Abhronila (Jadavpur)", hours: 10, actualMarks: 96 }
  ];

  // Calculate live Mean Squared Error (MSE) based on teacher's interactive knobs
  const calculateLiveLoss = () => {
    let totalSqError = 0;
    const evaluated = studentData.map((s) => {
      const predMarks = Math.min(100, Math.max(0, +(weightInput * s.hours + biasInput).toFixed(1)));
      const error = +(predMarks - s.actualMarks).toFixed(1);
      const sqError = +(error ** 2).toFixed(1);
      totalSqError += sqError;
      return {
        ...s,
        predMarks,
        error,
        sqError
      };
    });
    const mse = +(totalSqError / studentData.length).toFixed(2);
    return { evaluated, mse };
  };

  const { evaluated: liveEvaluations, mse: liveMse } = calculateLiveLoss();

  // Comprehensive Jargon Glossary Data for Supervised Learning
  const jargonTerms = [
    {
      id: "ground-truth",
      term: "Ground Truth / Label (y)",
      category: "core",
      badge: "Target Variable",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "ɡraʊnd truːθ",
      plainEnglish: "The real, verified answer or outcome recorded in historical records that we want the AI to learn to predict.",
      everydayAnalogy: "The answer key printed on the back page of a math workbook that lets you verify if your solution is correct.",
      whyItMatters: "Supervised learning cannot happen without ground truth; the model uses it to compute how far off its guess was."
    },
    {
      id: "features",
      term: "Feature Vector (x) & Feature Matrix (X)",
      category: "core",
      badge: "Input Data",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈfiː.tʃər ˈvɛk.tər",
      plainEnglish: "The list of measurable clues, measurements, and numerical properties describing each observation.",
      everydayAnalogy: "When examining a flat in Barrackpore, features are: [Square Footage, Number of Bedrooms, Distance to Railway Station, Floor Level].",
      whyItMatters: "Features are the sensory clues the algorithm processes to calculate its prediction."
    },
    {
      id: "hypothesis",
      term: "Hypothesis Function h(x) / ŷ (y-hat)",
      category: "math",
      badge: "The AI Brain",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "haɪˈpɒθ.ə.sɪs",
      plainEnglish: "The mathematical formula or guessing engine that transforms input features (x) into a predicted output (ŷ).",
      everydayAnalogy: "A doctor's mental checklist: 'If blood sugar is X and blood pressure is Y, then the diabetes risk score is Z.'",
      whyItMatters: "Training an ML model simply means finding the best hypothesis function that produces the lowest mistakes."
    },
    {
      id: "weights-bias",
      term: "Weights (w) & Bias (b)",
      category: "math",
      badge: "Learnable Knobs",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "weɪts & ˈbaɪ.əs",
      plainEnglish: "Weights are multiplier knobs deciding how important each feature is. Bias is the baseline starting value even when all features are zero.",
      everydayAnalogy: "In cooking a curry: weight is how many spoonfuls of spice to add per person; bias is the base water and salt in the pot before adding spices.",
      whyItMatters: "During training, the algorithm turns these weight knobs back and forth until predictions match reality."
    },
    {
      id: "loss-function",
      term: "Loss Function L(ŷ, y) vs Cost Function J(w)",
      category: "math",
      badge: "Error Penalty",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "lɒs ˈfʌŋk.ʃən",
      plainEnglish: "Loss measures the mistake on a single sample. Cost Function is the total average mistake across all thousands of samples in the dataset.",
      everydayAnalogy: "In an archery match: loss is how many centimeters your single arrow missed the bullseye; cost function is your average missed distance across 50 shots.",
      whyItMatters: "Gradient descent works by continually pushing this cost score downwards toward zero."
    },
    {
      id: "mse",
      term: "Mean Squared Error (MSE)",
      category: "regression",
      badge: "Regression Loss",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "miːn skweəd ˈɛr.ər",
      plainEnglish: "Squaring each error, adding them up, and taking the average. Squaring makes all errors positive and penalizes big mistakes severely.",
      everydayAnalogy: "Missing a train by 1 minute is a minor inconvenience (penalty 1² = 1). Missing it by 10 minutes makes you miss your flight (penalty 10² = 100).",
      whyItMatters: "The standard default loss function used for continuous regression problems (like house prices or temperatures)."
    },
    {
      id: "cross-entropy",
      term: "Cross-Entropy Loss (Log Loss)",
      category: "classification",
      badge: "Classification Loss",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "krɒs ˈɛn.trə.pi",
      plainEnglish: "A penalty score for classification that heavily punishes the model when it is confidently wrong.",
      everydayAnalogy: "If a student says 'I am 99% certain 2 + 2 = 5', the teacher gives a massive reprimand because they were overconfident in a mistake.",
      whyItMatters: "Forces classification models to output well-calibrated, truthful probability percentages (0% to 100%)."
    },
    {
      id: "gradient-descent",
      term: "Gradient Descent & Learning Rate (α)",
      category: "optimization",
      badge: "Optimization",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈɡreɪ.di.ənt dɪˈsɛnt",
      plainEnglish: "Gradient Descent is walking downhill step-by-step in the dark to find the lowest point of error. The Learning Rate (α) is the size of each step.",
      everydayAnalogy: "Walking down a misty hill in Darjeeling: feeling the slope with your feet and taking careful steps downwards until you reach the valley floor.",
      whyItMatters: "It is the fundamental mathematical workhorse that trains almost every AI model from linear regression to deep neural networks."
    },
    {
      id: "overfitting",
      term: "Overfitting (Rote Memorization)",
      category: "validation",
      badge: "Generalization Trap",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˌəʊ.vəˈfɪt.ɪŋ",
      plainEnglish: "When an AI memorizes the training data perfectly (like a student memorizing textbook questions) but completely fails on new, unseen test questions.",
      everydayAnalogy: "A student who memorizes 'Question 3 answer is Option C' without understanding the formula, and fails the exam when question numbers change.",
      whyItMatters: "An overfitted model has 100% training accuracy but is useless in real-world deployment."
    },
    {
      id: "underfitting",
      term: "Underfitting (Oversimplification)",
      category: "validation",
      badge: "High Bias",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˌʌn.dəˈfɪt.ɪŋ",
      plainEnglish: "When a model is too simple to capture the underlying pattern, performing terribly on both training and test data.",
      everydayAnalogy: "Drawing a flat straight line through a rollercoaster curve and claiming you captured the shape.",
      whyItMatters: "Requires adding more features, tuning hyperparameters, or picking a more capable non-linear algorithm."
    },
    {
      id: "bias-variance",
      term: "Bias-Variance Tradeoff",
      category: "validation",
      badge: "Fundamental Balance",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈbaɪ.əs ˈveə.ri.əns",
      plainEnglish: "The delicate balance between being too stubborn and simplistic (High Bias / Underfitting) vs being too volatile and hyper-sensitive to noise (High Variance / Overfitting).",
      everydayAnalogy: "A student who either ignores all real-world advice (High Bias) vs a student who changes their entire career plan every time they read a single tweet (High Variance).",
      whyItMatters: "The central sweet spot every machine learning engineer spends their career trying to hit."
    },
    {
      id: "train-test-split",
      term: "Train / Validation / Test Split",
      category: "validation",
      badge: "Evaluation Protocol",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "treɪn tɛst splɪt",
      plainEnglish: "Splitting data into 3 parts: Training set (study material), Validation set (mock tests to tune parameters), and Test set (final board exam locked in a vault).",
      everydayAnalogy: "Practicing homework problems at home (Train), taking mock tests in tuition class (Validation), and sitting for the official WB Board exam (Test).",
      whyItMatters: "Guarantees that your accuracy score is genuine and not an illusion of memorization."
    },
    {
      id: "data-leakage",
      term: "Data Leakage",
      category: "validation",
      badge: "Critical Bug",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈdeɪ.tə ˈliː.kɪdʒ",
      plainEnglish: "When information from the future or from the test set accidentally contaminates the training set during data preparation.",
      everydayAnalogy: "A student accidentally finding the exact final board exam question paper under the teacher's desk the night before the exam.",
      whyItMatters: "Produces artificially high lab accuracy (99.9%) that catastrophically crashes to 40% when deployed live in production."
    },
    {
      id: "sigmoid",
      term: "Sigmoid Function σ(z)",
      category: "classification",
      badge: "Probability S-Curve",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "ˈsɪɡ.mɔɪd",
      plainEnglish: "A smooth S-shaped mathematical curve that squashes any real number between -∞ and +∞ into a clean probability between 0 and 1 (0% to 100%).",
      everydayAnalogy: "A dimmer switch that smoothly transitions a light bulb from completely OFF (0.0) to full brightness (1.0).",
      whyItMatters: "Used in Logistic Regression and Neural Networks to convert raw feature sums into class probabilities."
    },
    {
      id: "regularization",
      term: "Regularization (L1 Lasso / L2 Ridge)",
      category: "optimization",
      badge: "Overfitting Buster",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˌrɛɡ.jʊ.lə.raɪˈzeɪ.ʃən",
      plainEnglish: "Adding a penalty term (λ||w||) to the cost function to prevent weights from growing excessively large and complex.",
      everydayAnalogy: "Occam's Razor: a teacher deducting points if a student writes a 20-page complicated essay when a clean 1-page summary answers the question.",
      whyItMatters: "Prevents models from chasing random noise in the data, drastically improving real-world generalization."
    }
  ];

  // Filtered Jargon List
  const filteredJargon = useMemo(() => {
    return jargonTerms.filter((item) => {
      const matchesCat = selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.everydayAnalogy.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  // Novice Classroom Step-by-Step Lessons
  const classroomLessons = {
    intuition: {
      id: "intuition",
      title: "1. The Big Picture: How Supervised Learning Works",
      tagline: "The Apprentice Chef with Recipe Cards",
      icon: "👨‍🍳",
      intro: "Imagine you are an apprentice chef in a renowned kitchen in Kolkata. Your master chef does not ask you to guess ingredients out of thin air. Instead, they hand you 1,000 recipe cards (Features X) alongside photographs and taste profiles of the perfect final dishes (Labels y).",
      steps: [
        {
          num: "Step 1",
          title: "Observation (Feature Ingestion)",
          desc: "You look at the recipe: 500g mutton, 2 spoons mustard oil, 1 spoon turmeric (Feature inputs x)."
        },
        {
          num: "Step 2",
          title: "Cooking & Guessing (Forward Prediction ŷ)",
          desc: "You cook the curry using your current cooking settings and taste it (Model predicts outcome ŷ)."
        },
        {
          num: "Step 3",
          title: "Master Chef's Critique (Loss Calculation L)",
          desc: "The head chef tastes your curry and says: 'Good flavor, but 3 grams too salty!' (Loss measures the gap between ŷ and real truth y)."
        },
        {
          num: "Step 4",
          title: "Nudging the Knobs (Weight Updates via Gradient Descent)",
          desc: "On your next dish, you dial down the salt knob slightly to correct your error (Optimizer updates weights w)."
        }
      ],
      coreTakeaway: "Supervised Learning is simply a continuous loop of Guessing ➔ Measuring the Mistake ➔ Correcting the Knobs until mistakes become near zero!"
    },
    regressionVsClass: {
      id: "regressionVsClass",
      title: "2. The Two Kingdoms: Regression vs Classification",
      tagline: "Continuous Numbers vs Categorical Buckets",
      icon: "⚖️",
      intro: "Every supervised learning problem in the universe falls into one of two kingdoms depending on what kind of answer (y) you want the computer to produce.",
      comparisons: [
        {
          type: "Kingdom 1: Regression",
          color: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300",
          question: "How much? How many? What continuous number?",
          outputNature: "A continuous, real number along an infinite smooth scale (y ∈ ℝ).",
          stories: [
            "Predicting the resale price of an apartment in Salt Lake in ₹ Lakhs (e.g., ₹78.45 Lakhs).",
            "Predicting tomorrow's temperature in Kolkata in °C (e.g., 34.6°C).",
            "Predicting a student's final semester percentage (e.g., 88.5%)."
          ],
          standardLoss: "Mean Squared Error (MSE): squares the difference between predicted and actual numbers."
        },
        {
          type: "Kingdom 2: Classification",
          color: "border-indigo-500/50 bg-indigo-950/20 text-indigo-300",
          question: "Which bucket? Which category? Which label?",
          outputNature: "A discrete category or probability distribution over classes (y ∈ {0, 1} or {A, B, C}).",
          stories: [
            "Predicting if an email in your inbox is 'Spam' vs 'Legitimate' (Binary Classification).",
            "Predicting if a bank loan applicant in Barrackpore will 'Default (1)' vs 'Pay on Time (0)'.",
            "Diagnosing a medical scan into 'Normal', 'Pneumonia', or 'Tuberculosis' (Multiclass Classification)."
          ],
          standardLoss: "Binary Cross-Entropy / Log Loss: heavily penalizes confident wrong guesses."
        }
      ],
      coreTakeaway: "If the output is a continuous number that can be measured on a ruler or scale, it is Regression. If the output is a category label or bucket, it is Classification."
    },
    optimization: {
      id: "optimization",
      title: "3. The Math Made Simple: Linear Equations & Gradient Descent",
      tagline: "How the Computer Adjusts Its Knobs in the Dark",
      icon: "📉",
      intro: "Let's demystify the classic equation: ŷ = w · x + b. It looks like high school algebra because it IS high school algebra!",
      breakdown: [
        {
          symbol: "x (Input Feature)",
          meaning: "The input measurement. For example, weekly study hours (e.g. 6 hours)."
        },
        {
          symbol: "w (Weight / Multiplier Knob)",
          meaning: "How much impact study hours have on the score. If w = 7.5, each additional study hour adds 7.5 marks."
        },
        {
          symbol: "b (Bias / Base Offset)",
          meaning: "The baseline score a student would get even with 0 study hours (e.g. base knowledge = 25 marks)."
        },
        {
          symbol: "ŷ (Predicted Output)",
          meaning: "The calculated guess: ŷ = (7.5 × 6) + 25 = 70 marks."
        }
      ],
      gradientIntuition: "Gradient Descent is like walking down a mountain in Darjeeling on a foggy morning. You cannot see the bottom valley (minimum error), but you can feel the slope of the ground beneath your boots. You take small, steady steps in the direction that goes downhill until the slope becomes completely flat (gradient = 0)!"
    },
    validation: {
      id: "validation",
      title: "4. The Golden Rule: Train, Validation, & Test Sets",
      tagline: "Homework vs Mock Tests vs The Final Board Exam",
      icon: "🛡️",
      intro: "The biggest amateur mistake in Machine Learning is testing your model on the exact same data it used to study. That is like giving a student the exact questions with answers the night before the exam!",
      splits: [
        {
          name: "1. Training Set (70% of Data)",
          role: "The Textbook & Homework",
          desc: "The model looks at features X and answers y repeatedly, adjusting weights to learn patterns."
        },
        {
          name: "2. Validation Set (15% of Data)",
          role: "Weekly Mock Tests",
          desc: "Used by the engineer to compare different algorithms, tune hyperparameters (like learning rate), and detect overfitting early."
        },
        {
          name: "3. Test Set (15% of Data)",
          role: "The Final Board Exam",
          desc: "Locked in a vault! Evaluated only ONCE at the very end to get an honest, unbiased measure of real-world accuracy."
        }
      ],
      coreTakeaway: "Never touch or peek at the Test Set during model training or hyperparameter tuning. Doing so causes Data Leakage and ruins production credibility."
    }
  };

  // Interactive Diagnostic Quiz for Supervised Learning
  const quizQuestions = [
    {
      id: 0,
      title: "Diagnostic 1: Real Estate Price Estimation",
      scenario: "A real estate agency in New Town, Kolkata has 10,000 records of flat sales. For each flat, they know [Carpet Area in sq.ft, Number of Balconies, Distance to Metro in km] and the final recorded sale price in ₹ Lakhs (e.g. ₹64.5 Lakhs, ₹112.0 Lakhs). What kind of machine learning task is this?",
      options: [
        { id: "reg", label: "Supervised Learning — Regression", isCorrect: true, explanation: "Correct! You have ground-truth answers (y = Sale Price in ₹ Lakhs) and the target is a continuous real-valued number along a smooth scale." },
        { id: "class", label: "Supervised Learning — Classification", isCorrect: false, explanation: "Incorrect. Sale price in ₹ Lakhs is not a discrete bucket/category; it is a continuous numerical quantity. This is Regression." },
        { id: "unsupervised", label: "Unsupervised Clustering", isCorrect: false, explanation: "Incorrect. You already have exact historical selling prices (y). Ignoring them would discard your most valuable ground-truth label!" }
      ]
    },
    {
      id: 1,
      title: "Diagnostic 2: Credit Card Fraud Triage",
      scenario: "A digital bank in Salt Lake Sector V monitors 500,000 daily UPI transactions. Each transaction has [Amount in ₹, Device ID, IP Location, Merchant Category]. The compliance team has flagged every historical transaction as either 'Fraud (1)' or 'Legitimate (0)'. What task is this?",
      options: [
        { id: "reg", label: "Supervised Learning — Regression", isCorrect: false, explanation: "Incorrect. The target outcome is not a continuous measurement; it is a binary category ('Fraud' vs 'Legitimate')." },
        { id: "class", label: "Supervised Learning — Binary Classification", isCorrect: true, explanation: "Spot on! The model must classify transactions into two discrete categorical buckets: Fraud (1) vs Legitimate (0) using historical verified labels." },
        { id: "unsupervised", label: "Unsupervised PCA", isCorrect: false, explanation: "Incorrect. PCA is for dimensionality reduction. Since you already possess verified fraud labels, supervised classification is the correct choice." }
      ]
    },
    {
      id: 2,
      title: "Diagnostic 3: High Lab Score but Production Failure",
      scenario: "Mamata trains a neural network on 1,000 student records in Barrackpore. In her Jupyter notebook, the training accuracy is 99.8%. However, when deployed live in the college admission portal on new applicants, its accuracy crashes to 58.2%. What happened?",
      options: [
        { id: "underfit", label: "The model is Underfitting due to high bias", isCorrect: false, explanation: "Incorrect. An underfitted model would have terrible accuracy on both training and test data. Here, training accuracy was 99.8%!" },
        { id: "overfit", label: "The model is Overfitting (Memorized training noise and failed to generalize)", isCorrect: true, explanation: "Masterful diagnosis! 99.8% training accuracy paired with 58.2% test accuracy is the classic textbook hallmark of Overfitting (high variance). The model memorized quirks instead of learning general patterns." },
        { id: "unsupervised", label: "The algorithm turned into unsupervised learning", isCorrect: false, explanation: "Incorrect. Algorithms don't randomly switch paradigms; the failure is due to severe lack of regularization and validation controls." }
      ]
    },
    {
      id: 3,
      title: "Diagnostic 4: Scaling Before Splitting Bug",
      scenario: "Debangshu computes the mean and standard deviation across his ENTIRE dataset before splitting it into Train and Test partitions. Why is this considered an engineering violation?",
      options: [
        { id: "leakage", label: "Data Leakage: Test set statistics contaminated the training environment", isCorrect: true, explanation: "Exact! Computing normalization scalers across the full dataset leaks statistical information from the test set into the training phase, giving an unrealistically optimistic evaluation." },
        { id: "syntax", label: "It causes a Python syntax error in scikit-learn", isCorrect: false, explanation: "Incorrect. The code will execute without syntax errors, but the mathematical evaluation will be tainted and invalid in real life." },
        { id: "underfit", label: "It forces the model into high bias underfitting", isCorrect: false, explanation: "Incorrect. Data leakage causes optimistic overestimation of performance, not underfitting." }
      ]
    }
  ];

  const currentQuiz = quizQuestions[selectedQuizIndex];
  const activeClassroomLesson = classroomLessons[selectedLessonTab];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 4
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Foundational ML
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Supervised Learning
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Beginner-to-Master Edition
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Supervised Learning: The Complete Masterclass
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Master the core engine of predictive artificial intelligence. Understand how machines learn from labeled ground truth, discover the mathematical mechanics of <span className="text-cyan-400 font-semibold">Regression</span> and <span className="text-indigo-400 font-semibold">Classification</span>, explore loss minimization via <span className="text-emerald-400 font-semibold">Gradient Descent</span>, and demystify every piece of technical jargon with simple, relatable everyday analogies.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "liveKnobStudio", label: "1. Interactive Loss & Weight Knob Studio" },
              { id: "theory", label: "2. Formal Mathematical Foundations" },
              { id: "caseStudies", label: "3. Regional Industrial Cases" },
              { id: "diagnosticQuiz", label: "4. Interactive Diagnostic Quiz" },
              { id: "bestPractices", label: "5. Pitfalls & Best Practices" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400 scale-105"
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
      {/* DEDICATED SECTION: TEACHER SUKANTA'S NOVICE CLASSROOM & JARGON BUSTER */}
      {/* ========================================================================= */}
      <section id="noviceMasterclass" className="bg-slate-900/95 p-6 sm:p-8 rounded-2xl border border-indigo-500/40 shadow-2xl space-y-8 scroll-mt-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/30 border border-blue-400">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Master Teacher&apos;s Novice Classroom: Supervised Learning
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Zero Jargon Barrier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Teaching the principles of Supervised Learning step-by-step to beginners with zero intimidating barriers
              </p>
            </div>
          </div>
          <div className="text-xs text-indigo-300 bg-indigo-950/70 border border-indigo-800 px-3.5 py-1.5 rounded-xl font-mono">
            Teacher Sukanta Hui • Barrackpore
          </div>
        </div>

        {/* Warm Conversational Teacher Welcome */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 p-6 rounded-2xl border border-indigo-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <span>💬</span>
            <span>Teacher Sukanta to a Curious Student:</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            &quot;Hello, my student! When people hear the term <strong>Supervised Learning</strong>, they often imagine a robot being controlled by a joystick. But that is not what &apos;supervision&apos; means in data science. In machine learning, <strong>supervision simply means having an Answer Key (Ground Truth y)</strong> for every question in your dataset.&quot;
          </p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Let us explore the 4 essential modules of Supervised Learning below. Click through each tab to build intuition before we touch any math!
          </p>
        </div>

        {/* 4 Interactive Lesson Selector Tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: "intuition", title: "1. The Big Picture", icon: "👨‍🍳", subtitle: "Apprentice Chef Analogy" },
              { id: "regressionVsClass", title: "2. The Two Kingdoms", icon: "⚖️", subtitle: "Regression vs Classification" },
              { id: "optimization", title: "3. Math Made Simple", icon: "📉", subtitle: "Weights, Biases & Gradients" },
              { id: "validation", title: "4. The Golden Rule", icon: "🛡️", subtitle: "Train, Validation & Test Sets" }
            ].map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonTab(lesson.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2.5",
                  selectedLessonTab === lesson.id
                    ? "bg-slate-900 border-indigo-400 ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-600/20 scale-102"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{lesson.icon}</span>
                  <span className={clsx(
                    "text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase",
                    selectedLessonTab === lesson.id ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400"
                  )}>
                    Step {lesson.id === "intuition" ? "1" : lesson.id === "regressionVsClass" ? "2" : lesson.id === "optimization" ? "3" : "4"}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{lesson.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{lesson.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Lesson Content Card */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-indigo-900/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeClassroomLesson.icon}</span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{activeClassroomLesson.title}</h3>
                <span className="text-xs text-indigo-300 font-medium">{activeClassroomLesson.tagline}</span>
              </div>
            </div>
            <span className="text-xs font-mono bg-slate-900 text-slate-400 px-3 py-1 rounded-lg border border-slate-800">
              Interactive Lesson Module
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            {activeClassroomLesson.intro}
          </p>

          {/* Module 1: Intuition Steps */}
          {selectedLessonTab === "intuition" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeClassroomLesson.steps.map((st, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">{st.num}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-1">{st.title}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed mt-2">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 2: Regression vs Classification */}
          {selectedLessonTab === "regressionVsClass" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeClassroomLesson.comparisons.map((c, idx) => (
                <div key={idx} className={clsx("p-5 rounded-xl border space-y-3", c.color)}>
                  <h4 className="text-base font-bold">{c.type}</h4>
                  <div className="text-xs font-mono font-semibold text-white bg-slate-950/60 p-2.5 rounded border border-slate-800">
                    Core Question: &quot;{c.question}&quot;
                  </div>
                  <p className="text-xs text-slate-300"><strong>Nature of Output:</strong> {c.outputNature}</p>
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-200 block">Real-World Regional Examples:</span>
                    <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                      {c.stories.map((s, sIdx) => (
                        <li key={sIdx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-[11px] text-slate-400 bg-slate-950/80 p-2.5 rounded border border-slate-800">
                    <strong className="text-white">Default Loss Metric:</strong> {c.standardLoss}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 3: Math Made Simple */}
          {selectedLessonTab === "optimization" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeClassroomLesson.breakdown.map((b, idx) => (
                  <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-xs font-mono font-bold text-indigo-400">{b.symbol}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{b.meaning}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 rounded-xl border border-indigo-800/40 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <span>🏔️</span> Gradient Descent in Simple Words:
                </div>
                <p>{activeClassroomLesson.gradientIntuition}</p>
              </div>
            </div>
          )}

          {/* Module 4: Validation Sets */}
          {selectedLessonTab === "validation" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeClassroomLesson.splits.map((sp, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">{sp.name}</span>
                  <h4 className="text-sm font-bold text-white">{sp.role}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{sp.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Core Takeaway Footer */}
          {activeClassroomLesson.coreTakeaway && (
            <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-800/50 flex items-center gap-2.5 text-xs text-emerald-200">
              <span className="text-base">💡</span>
              <span><strong>Teacher&apos;s Golden Takeaway:</strong> {activeClassroomLesson.coreTakeaway}</span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SUB-SECTION: JARGON BUSTER & NOVICE GLOSSARY */}
        {/* ========================================================================= */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Supervised Learning Jargon Buster
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every technical term in Supervised Learning translated into everyday plain English
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Terms" },
                { id: "core", label: "Core Foundations" },
                { id: "math", label: "Math & Equations" },
                { id: "regression", label: "Regression" },
                { id: "classification", label: "Classification" },
                { id: "validation", label: "Validation & Generalization" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedJargonCategory(cat.id)}
                  className={clsx(
                    "px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer",
                    selectedJargonCategory === cat.id
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={jargonSearchQuery}
              onChange={(e) => setJargonSearchQuery(e.target.value)}
              placeholder="🔍 Search any technical term (e.g. 'Overfitting', 'MSE', 'Bias-Variance', 'Sigmoid', 'Data Leakage')..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {jargonSearchQuery && (
              <button
                onClick={() => setJargonSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Term Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJargon.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-mono">{item.term}</h4>
                    <span className={clsx("text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0", item.badgeColor)}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                      In Plain English:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.plainEnglish}
                    </p>
                  </div>

                  <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                      <span>💡</span> Everyday Analogy:
                    </span>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">
                      &quot;{item.everydayAnalogy}&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  <span className="text-indigo-300 font-semibold">Why it matters: </span>
                  {item.whyItMatters}
                </div>
              </div>
            ))}
          </div>

          {filteredJargon.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching technical terms found for &quot;{jargonSearchQuery}&quot;. Try searching for &quot;MSE&quot;, &quot;Loss&quot;, or &quot;Weights&quot;.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE LOSS & WEIGHT KNOB STUDIO */}
      {/* ========================================================================= */}
      <section id="liveKnobStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Weight Knob &amp; Loss Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Turn the mathematical weight ($w$) and bias ($b$) knobs to fit a model to 5 student records in Barrackpore
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Knob 1: Weight w */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-indigo-300 font-bold">Weight Knob (w - Study Hour Multiplier):</span>
                <span className="text-cyan-400 font-bold text-sm">{weightInput} marks/hr</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="15.0"
                step="0.5"
                value={weightInput}
                onChange={(e) => setWeightInput(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <p className="text-[11px] text-slate-400">Controls the slope of the prediction line.</p>
            </div>

            {/* Knob 2: Bias b */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-purple-300 font-bold">Bias Knob (b - Baseline Starting Marks):</span>
                <span className="text-purple-400 font-bold text-sm">{biasInput} marks</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={biasInput}
                onChange={(e) => setBiasInput(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <p className="text-[11px] text-slate-400">Controls the baseline height where the line crosses 0 hours.</p>
            </div>
          </div>

          {/* Live Hypothesis Formula Display & Total MSE */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 p-4 rounded-xl border border-indigo-900/50 gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Current Learned Hypothesis:</span>
              <div className="text-sm sm:text-base font-mono font-bold text-cyan-300">
                Marks = ({weightInput} × Hours) + {biasInput}
              </div>
            </div>
            <div className="text-center sm:text-right bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Current Mean Squared Error (MSE):</span>
              <span className={clsx(
                "text-lg font-mono font-bold",
                liveMse < 15 ? "text-emerald-400" : liveMse < 60 ? "text-amber-400" : "text-rose-400"
              )}>
                {liveMse} {liveMse < 15 ? "🎯 (Near Optimal!)" : liveMse < 60 ? "⚠️ (Suboptimal)" : "❌ (High Loss)"}
              </span>
            </div>
          </div>

          {/* Student Evaluation Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-900/60">
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Weekly Study Hours (x)</th>
                  <th className="p-3">Actual Marks (y)</th>
                  <th className="p-3">Model Prediction (ŷ)</th>
                  <th className="p-3">Error (ŷ - y)</th>
                  <th className="p-3">Squared Error (ŷ - y)²</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                {liveEvaluations.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-3 font-sans font-medium text-white">{row.name}</td>
                    <td className="p-3">{row.hours} hrs</td>
                    <td className="p-3 text-emerald-400 font-bold">{row.actualMarks}</td>
                    <td className="p-3 text-cyan-300 font-bold">{row.predMarks}</td>
                    <td className="p-3 text-amber-300">{row.error > 0 ? `+${row.error}` : row.error}</td>
                    <td className="p-3 text-rose-300">{row.sqError}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: FORMAL MATHEMATICAL FOUNDATIONS */}
      {/* ========================================================================= */}
      <section id="theory" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Formal Mathematical Formulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Empirical risk minimization, loss gradient equations, and optimization objectives
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Empirical Risk Minimization (ERM)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {"Supervised machine learning formalizes the task as discovering optimal parameter weights w* that minimize the empirical risk over dataset D = {(x_i, y_i)}_{i=1}^N:"}
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"w* = argmin_w [ (1/N) ∑_{i=1}^N L(h(x_i; w), y_i) + λ Ω(w) ]"}
            </div>
            <p className="text-[11px] text-slate-400">
              Where $L$ is the task-specific loss function and $\lambda \Omega(w)$ is the regularization penalty preventing excessive model capacity.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Gradient Descent Update Rule</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Parameters are iteratively updated along the negative gradient of the loss surface:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"w_{t+1} = w_t - α ∇_w J(w_t)"}
            </div>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside pt-1">
              <li><strong className="text-white">$\alpha$:</strong> Learning rate scaling step size along the manifold.</li>
              <li><strong className="text-white">$\nabla J$:</strong> Vector of partial derivatives $\partial J / \partial w_j$.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: REAL-WORLD REGIONAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section id="caseStudies" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied supervised learning deployments across Bengal technology hubs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400">Case 1 • Barrackpore Academic Lab</span>
              <span className="text-[10px] px-2 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">Classification</span>
            </div>
            <h3 className="text-base font-bold text-white">Student Academic Analytics &amp; Mentoring</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima implemented a Random Forest classifier analyzing weekly quiz submissions, lab attendance %, and assignment completion rhythms to predict distinction qualification with 94.2% ROC-AUC.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">Case 2 • Kolkata Salt Lake Sector V</span>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">Regression</span>
            </div>
            <h3 className="text-base font-bold text-white">Real Estate Valuation Engine</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu deployed an XGBoost regression model trained on 18,000 property registries in Salt Lake and New Town, predicting flat commercial market values with an RMSE of ₹3.2 Lakhs.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 3 • Ichapur Retail Center</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Classification</span>
            </div>
            <h3 className="text-base font-bold text-white">Retail Customer Churn Prevention</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita engineered a supervised logistic model predicting whether a customer will churn within 30 days based on RFM transaction velocity, achieving 91.5% sensitivity for timely voucher interventions.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">Case 4 • Jadavpur Medical Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">Deep Classification</span>
            </div>
            <h3 className="text-base font-bold text-white">Clinical Chest Radiograph Diagnosis</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila trained a Convolutional Neural Network (CNN) classifier on 40,000 doctor-annotated chest radiographs, matching senior radiologist diagnostic accuracy on pneumonia detection.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: INTERACTIVE DIAGNOSTIC QUIZ */}
      {/* ========================================================================= */}
      <section id="diagnosticQuiz" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Supervised Learning Diagnostic Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your engineering knowledge: Solve real-world problem formulations
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          {/* Diagnostic Tabs */}
          <div className="flex flex-wrap gap-2">
            {quizQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuizIndex(idx);
                  setUserAnswer(null);
                  setShowFeedback(false);
                }}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  selectedQuizIndex === idx
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Scenario Problem</span>
              <h3 className="text-base sm:text-lg font-bold text-white">{currentQuiz.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {currentQuiz.scenario}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Select the correct engineering decision:</span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentQuiz.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setUserAnswer(opt.id);
                      setShowFeedback(true);
                    }}
                    className={clsx(
                      "p-3.5 rounded-xl border text-left transition-all text-xs sm:text-sm font-medium cursor-pointer flex items-center justify-between",
                      userAnswer === opt.id
                        ? opt.isCorrect
                          ? "bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40"
                          : "bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/40"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    )}
                  >
                    <span>{opt.label}</span>
                    {showFeedback && userAnswer === opt.id && (
                      <span className="font-bold text-sm">
                        {opt.isCorrect ? "✅ Correct!" : "❌ Try again"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {showFeedback && userAnswer && (
              <div className={clsx(
                "p-4 rounded-xl border space-y-1.5 animate-fadeIn text-xs sm:text-sm",
                currentQuiz.options.find((o) => o.id === userAnswer)?.isCorrect
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                  : "bg-rose-950/40 border-rose-800 text-rose-200"
              )}>
                <div className="font-bold flex items-center gap-1.5">
                  <span>💡 Teacher&apos;s Feedback:</span>
                </div>
                <p className="leading-relaxed">
                  {currentQuiz.options.find((o) => o.id === userAnswer)?.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      {/* ========================================================================= */}
      <section id="bestPractices" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key engineering guidelines for robust supervised machine learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Data Leakage:</strong> Fitting data scalers or transformers on test partitions before splitting.</li>
              <li><strong className="text-white">Class Imbalance Ignorance:</strong> Measuring accuracy on 99:1 imbalanced classes where trivial guessing gives 99% accuracy.</li>
              <li><strong className="text-white">Overfitting Blindness:</strong> Evaluating models solely on training loss without cross-validation splits.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Industry Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Isolate Test Set:</strong> Always lock away the test set before performing any imputation or feature engineering.</li>
              <li><strong className="text-white">Baseline Benchmark:</strong> Establish a simple baseline (e.g. Logistic Regression or Mean Predictor) before training complex deep models.</li>
              <li><strong className="text-white">Regularization Discipline:</strong> Use L1/L2 penalties and early stopping to prevent weights from memorizing dataset noise.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PYTHON LABORATORY */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            06
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive standalone lab script executing supervised evaluation over student cohorts
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="supervised_learning_lab.py"
          highlightLines={[25, 26, 35, 45]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Supervised Learning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Supervised Learning Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="topic4_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Mastering Supervised learning in Introduction to Machine Learning is essential for building scalable, reliable Machine Learning systems. Focus on understanding how mathematical optimization interfaces with real-world feature matrices. Practice the laboratory code, verify the step-by-step derivations, and remember: data cleanliness and rigorous validation are 80% of machine learning success!"
        />
      </section>
    </div>
  );
};

export default Topic4;
