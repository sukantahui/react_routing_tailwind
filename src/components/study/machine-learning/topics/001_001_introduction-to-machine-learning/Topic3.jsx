import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import typesOfMlLab from "./topic3_files/types_of_ml_lab.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const Topic3 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");
  const [selectedParadigm, setSelectedParadigm] = useState("supervised");
  
  // Dedicated Teacher's Classroom State
  const [teacherParadigmTab, setTeacherParadigmTab] = useState("supervised");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedDiagnosticCase, setSelectedDiagnosticCase] = useState(0);
  const [userSelectedAnswer, setUserSelectedAnswer] = useState(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);

  // Interactive Simulator State for Paradigms (Existing Section)
  const [rlStep, setRlStep] = useState(0);
  const [semiSpreadLevel, setSemiSpreadLevel] = useState(1);

  const svgId = useId();

  // Smooth scroll helper
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Comprehensive Jargon Glossary Data
  const jargonTerms = [
    {
      id: "ground-truth",
      term: "Ground Truth / Target (y)",
      category: "supervised",
      badge: "Supervised ML",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "ɡraʊnd truːθ",
      plainEnglish: "The verified real-world answer key or final outcome we want the computer to predict.",
      everydayAnalogy: "Like the answer key printed at the back of your mathematics textbook that tells you whether your calculated answer is right or wrong.",
      whyItMatters: "Without ground truth, supervised algorithms cannot calculate their mistakes or improve."
    },
    {
      id: "features",
      term: "Feature Vector (x)",
      category: "supervised",
      badge: "All ML Paradigms",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈfiː.tʃər ˈvɛk.tər",
      plainEnglish: "The list of measurable clues, attributes, or characteristics used by the model to make a prediction.",
      everydayAnalogy: "When buying mangoes at Barrackpore market, the features are: [Weight in grams, Color shade, Sweet aroma strength, Softness].",
      whyItMatters: "Features are the only sensory inputs the machine algorithm has to understand reality."
    },
    {
      id: "supervision",
      term: "Supervision (Feedback Signal)",
      category: "supervised",
      badge: "Supervised ML",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "ˌsuː.pɚˈvɪʒ.ən",
      plainEnglish: "External guidance telling the machine whether its guess was accurate and by how much it missed.",
      everydayAnalogy: "A caring teacher sitting right next to you, marking your math homework with a red pen and explaining your mistake immediately.",
      whyItMatters: "Defines the learning paradigm: Direct supervision = Supervised; No supervision = Unsupervised; Reward signals = Reinforcement."
    },
    {
      id: "loss-function",
      term: "Loss Function / Cost Function L(ŷ, y)",
      category: "supervised",
      badge: "Core Optimization",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "lɒs ˈfʌŋk.ʃən",
      plainEnglish: "A penalty score calculation measuring the numerical distance between the model's prediction (ŷ) and the real truth (y).",
      everydayAnalogy: "Like archery: if the bullseye is at the center (0 mm error), your penalty is 0. If you hit 20 cm away, you get a penalty score of 20.",
      whyItMatters: "Machine learning is simply the quest to drive this penalty score down as close to zero as possible."
    },
    {
      id: "regression-vs-classification",
      term: "Regression vs Classification",
      category: "supervised",
      badge: "Supervised ML",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "rɪˈɡrɛʃ.ən vs ˌklæs.ɪ.fɪˈkeɪ.ʃən",
      plainEnglish: "Regression predicts continuous numbers (e.g. ₹ price, temperature); Classification predicts discrete categories or bucket labels (e.g. Yes/No, Cat/Dog).",
      everydayAnalogy: "Asking 'How tall is this student in centimeters?' is Regression. Asking 'Will this student pass or fail the semester exam?' is Classification.",
      whyItMatters: "Dictates which loss function (Mean Squared Error vs Cross-Entropy) and mathematical algorithm you must choose."
    },
    {
      id: "decision-boundary",
      term: "Decision Boundary / Hyperplane",
      category: "supervised",
      badge: "Classification",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "dɪˈsɪʒ.ən ˈbaʊn.də.ri",
      plainEnglish: "The mathematical dividing line or wall drawn through data space that separates one category from another.",
      everydayAnalogy: "A fence drawn across a football field: anything to the left belongs to Team A, anything to the right belongs to Team B.",
      whyItMatters: "In classification, the model's job is to find the most accurate fence that misclassifies as few points as possible."
    },
    {
      id: "unlabeled-data",
      term: "Unlabeled Dataset (No y)",
      category: "unsupervised",
      badge: "Unsupervised ML",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ʌnˈleɪ.bəld ˈdeɪ.tə",
      plainEnglish: "Raw observations containing only feature measurements (x) without any pre-assigned answers or target categories (y).",
      everydayAnalogy: "A giant box of 10,000 mixed Lego bricks with zero instructions or color tags dumped on the floor.",
      whyItMatters: "95% of data generated in the world (videos, server logs, audio, text) is unlabeled because human tagging is extremely expensive."
    },
    {
      id: "centroid",
      term: "Centroid & Clustering",
      category: "unsupervised",
      badge: "Unsupervised ML",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈsɛn.trɔɪd",
      plainEnglish: "A centroid is the geometric center point of a group of similar data points. Clustering is the act of grouping points around their nearest center.",
      everydayAnalogy: "In a classroom where students naturally gather into friend circles during lunch, the centroid is the imaginary table right in the middle of each group.",
      whyItMatters: "Algorithms like k-Means use centroids to automatically segment customer buying habits without human instructions."
    },
    {
      id: "euclidean-distance",
      term: "Euclidean Distance",
      category: "unsupervised",
      badge: "Geometry",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "juːˈklɪd.i.ən ˈdɪs.təns",
      plainEnglish: "The ordinary straight-line distance between two points measured with a ruler using the Pythagorean theorem (d = √(Δx² + Δy²)).",
      everydayAnalogy: "How the crow flies from Barrackpore Railway Station to Ichapur Post Office in a straight line.",
      whyItMatters: "Clustering algorithms assume data points that are close in Euclidean distance share similar real-world properties."
    },
    {
      id: "dimensionality-reduction",
      term: "Dimensionality Reduction & Manifold",
      category: "unsupervised",
      badge: "Feature Engineering",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "daɪˌmɛn.ʃəˈnæl.ə.ti rɪˈdʌk.ʃən",
      plainEnglish: "Compressing 500 feature columns into 2 or 3 essential dimensions while retaining the core patterns and shapes.",
      everydayAnalogy: "Taking a 3D shadow puppet and projecting its 2D shadow onto a wall so you can clearly see the shape of a bird.",
      whyItMatters: "Prevents the 'Curse of Dimensionality' and allows humans to visualize high-dimensional datasets on 2D screens."
    },
    {
      id: "anomaly-detection",
      term: "Anomaly Detection (Outlier Analysis)",
      category: "unsupervised",
      badge: "Unsupervised ML",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "əˈnɒm.ə.li dɪˈtɛk.ʃən",
      plainEnglish: "Finding rare, abnormal data points that look completely different from the normal pattern of the crowd.",
      everydayAnalogy: "Spotting a person wearing a heavy woolen coat on a blazing 42°C summer afternoon in Kolkata.",
      whyItMatters: "Essential for catching credit card bank frauds, factory machine breakdowns, and cybersecurity intrusions."
    },
    {
      id: "label-propagation",
      term: "Label Propagation",
      category: "semiSupervised",
      badge: "Semi-Supervised ML",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈleɪ.bəl ˌprɒp.əˈɡeɪ.ʃən",
      plainEnglish: "Spreading known labels from a handful of tagged points to untagged neighbors through density pathways on a graph.",
      everydayAnalogy: "Like a rumor spreading through a classroom: if one student in the front row knows the exam date, they whisper it to adjacent friends until the entire room knows.",
      whyItMatters: "Allows medical teams to train diagnostic models with only 100 doctor-verified scans alongside 50,000 unverified ones."
    },
    {
      id: "pseudo-labeling",
      term: "Pseudo-Labeling (Self-Training)",
      category: "semiSupervised",
      badge: "Semi-Supervised ML",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈsjuː.dəʊ ˈleɪ.bəl.ɪŋ",
      plainEnglish: "When a model makes highly confident predictions on unlabeled data, we treat those confident predictions as temporary ground truth and re-train.",
      everydayAnalogy: "A student who learns 5 algebra formulas, tests themselves on 100 practice questions, and marks questions they are 99% confident about to build a bigger study set.",
      whyItMatters: "Bootstraps weak models into strong models using vast amounts of free unlabeled data."
    },
    {
      id: "agent-and-environment",
      term: "Agent & Environment",
      category: "reinforcement",
      badge: "Reinforcement Learning",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈeɪ.dʒənt & ɪnˈvaɪ.rən.mənt",
      plainEnglish: "The 'Agent' is the learner or decision-maker (the robot/player); the 'Environment' is the world or system the agent lives in and interacts with.",
      everydayAnalogy: "A toddler (Agent) exploring the living room (Environment) with soft rugs, toy boxes, and sharp table corners.",
      whyItMatters: "In RL, there is no static training dataset table; data is generated live through the agent's actions."
    },
    {
      id: "state-action-reward",
      term: "State (s), Action (a), Reward (r)",
      category: "reinforcement",
      badge: "Reinforcement Learning",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "steɪt, ˈæk.ʃən, rɪˈwɔːd",
      plainEnglish: "State is where the agent is right now; Action is the move it decides to make; Reward is the immediate numerical praise (+10) or penalty (-5) it receives.",
      everydayAnalogy: "Playing Super Mario: State = Mario standing before a pit; Action = Pressing the Jump button; Reward = +100 points for collecting a coin, or -100 for falling in.",
      whyItMatters: "The universal language of all trial-and-error decision systems."
    },
    {
      id: "policy",
      term: "Policy (π)",
      category: "reinforcement",
      badge: "Reinforcement Learning",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈpɒl.ə.si (paɪ)",
      plainEnglish: "The master game strategy or brain rulebook mapping any current state to the best action to take.",
      everydayAnalogy: "A chess grandmaster's mental rule: 'Whenever my opponent moves their knight here, I will always move my bishop there.'",
      whyItMatters: "Training in Reinforcement Learning means iteratively improving this policy until it becomes unbeatable."
    },
    {
      id: "discount-factor",
      term: "Discount Factor (γ - Gamma)",
      category: "reinforcement",
      badge: "Reinforcement Learning",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈdɪs.kaʊnt ˈfæk.tər (ˈɡæm.ə)",
      plainEnglish: "A number between 0 and 1 that controls whether the agent is short-sighted (seeking instant gratification) or far-sighted (planning long-term rewards).",
      everydayAnalogy: "Choosing between getting ₹100 right now (γ near 0) versus waiting 1 year for ₹50,000 (γ near 1).",
      whyItMatters: "Ensures mathematical convergence and allows agents to sacrifice temporary pawns for long-term chess checkmates."
    },
    {
      id: "self-supervised",
      term: "Self-Supervised Pretext Task",
      category: "modern",
      badge: "Modern GenAI & LLMs",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "sɛlf ˈsuː.pɚˌvaɪzd ˈpriː.tɛkst",
      plainEnglish: "An artificial puzzle created automatically from raw text/images (like blanking out words) so the model can train itself with zero human annotation.",
      everydayAnalogy: "Taking a Bengali newspaper, blacking out every 5th word with a marker, and challenging yourself to guess the hidden words to master grammar.",
      whyItMatters: "The foundational engine powering modern Large Language Models (ChatGPT, Claude, Gemini, BERT)."
    },
    {
      id: "alignment-rlhf",
      term: "RLHF / Policy Alignment",
      category: "modern",
      badge: "Modern GenAI & LLMs",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "əˈlaɪn.mənt",
      plainEnglish: "Reinforcement Learning from Human Feedback: using human ratings to refine an AI so it gives helpful, polite, and safe responses.",
      everydayAnalogy: "Finishing school or etiquette training for an extremely intelligent bookworm student so they communicate politely in a workplace.",
      whyItMatters: "Turns raw text-completers into safe, helpful conversational assistants."
    }
  ];

  // Filtered Jargon List
  const filteredJargon = useMemo(() => {
    return jargonTerms.filter((item) => {
      const matchesCategory = selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.everydayAnalogy.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  // Master Teacher Paradigm Lessons
  const teacherLessons = {
    supervised: {
      id: "supervised",
      title: "Supervised Learning",
      subtitle: "The Classroom with Flashcards and Answer Keys",
      icon: "🎯",
      themeColor: "from-blue-600/20 via-indigo-950 to-slate-900",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      coreQuestion: "How do you teach a child what an elephant looks like?",
      teacherOpening:
        "Welcome to our classroom! Think back to when you were in primary school. How did your teacher teach you arithmetic or biology? They gave you a question, you tried solving it, and then your teacher checked your answer with a red pen. If you got it wrong, they told you the correct answer. That is exactly what Supervised Learning is.",
      theStory:
        "Imagine you have 10,000 flashcards. On the front of each card, there is a photograph of an animal with its height, weight, and ear size (Features X). On the back of each card, the word 'Elephant' or 'Giraffe' is clearly stamped (Ground Truth y). The computer looks at the front, makes a guess, flips the card to see the answer, adjusts its internal mathematical weights when it makes a mistake, and repeats this 10,000 times until it rarely guesses wrong!",
      subtypes: [
        {
          name: "1. Classification (Categorization)",
          desc: "The computer predicts which bucket or category something belongs to.",
          examples: ["Is this email Spam or Important?", "Will this Kolkata bank applicant Default on their loan or Pay on time?", "Is this tumor Benign or Malignant?"]
        },
        {
          name: "2. Regression (Number Prediction)",
          desc: "The computer predicts a continuous, measurable numerical value along a smooth scale.",
          examples: ["Predicting house price in ₹ Lakhs in Barrackpore", "Predicting tomorrow's temperature in °C", "Predicting semester exam percentage (0-100%)"]
        }
      ],
      goldenRule: "If your dataset comes with a dedicated 'answer column' prepared by humans, you are doing Supervised Learning.",
      pitfall: "Beginners often mistake continuous numbers formatted as codes (e.g. Pin codes like 700120) for regression targets. Pin codes are categorical class labels, not continuous quantities!"
    },
    unsupervised: {
      id: "unsupervised",
      title: "Unsupervised Learning",
      subtitle: "The Curious Explorer in an Unlabeled Library",
      icon: "🔍",
      themeColor: "from-emerald-600/20 via-slate-950 to-slate-900",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      coreQuestion: "What if nobody gives you any answer key or categories at all?",
      teacherOpening:
        "Now imagine a completely different scenario. You enter an ancient library in Kolkata. There are 50,000 books scattered on the floor with their covers ripped off and no catalog. Nobody tells you which book is poetry, which is mathematics, or which is history. How would you organize them? You would look for natural similarities: page thickness, font styles, diagram shapes, and vocabulary. That is Unsupervised Learning!",
      theStory:
        "In Unsupervised Learning, there is NO teacher, NO answer key (no target column y), and NO praise or penalty. We hand the computer raw feature measurements X and say: 'Find the hidden patterns and structure in this chaos on your own.' The computer measures mathematical distances between data points and groups similar ones together.",
      subtypes: [
        {
          name: "1. Clustering (Grouping Buddies)",
          desc: "Automatically partitioning data into natural groups based on geometric proximity.",
          examples: ["Segmenting 40,000 Ichapur retail shoppers into 'Bargain Seekers', 'Weekend Splurgers', and 'VIPs'", "Grouping news articles by topic"]
        },
        {
          name: "2. Dimensionality Reduction (Smart Compression)",
          desc: "Squashing a dataset with 500 feature columns down to 2 or 3 essential dimensions without losing core patterns.",
          examples: ["PCA (Principal Component Analysis) to visualize complex customer DNA on a 2D scatter plot", "t-SNE for word embeddings"]
        },
        {
          name: "3. Anomaly Detection (Spotting Outliers)",
          desc: "Identifying rare events that look radically different from all normal baseline clusters.",
          examples: ["Detecting stolen credit card UPI transactions in Salt Lake Sector V", "Detecting vibrating cracks in factory turbines"]
        }
      ],
      goldenRule: "If you only have feature columns X and zero answer columns y, you are doing Unsupervised Learning.",
      pitfall: "Expecting clustering algorithms (like k-Means) to name the clusters in human words. k-Means will only output 'Cluster 0, Cluster 1, Cluster 2'. You (the human analyst) must inspect the points and assign the business meaning!"
    },
    semiSupervised: {
      id: "semiSupervised",
      title: "Semi-Supervised Learning",
      subtitle: "The Detective with 3 Clues and 1000 Suspects",
      icon: "🌱",
      themeColor: "from-purple-600/20 via-slate-950 to-slate-900",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      coreQuestion: "What if human labels are too expensive or time-consuming to create?",
      teacherOpening:
        "Here is a real problem every software company faces: getting human experts to label data is insanely expensive! Imagine you work at a hospital in Jadavpur with 50,000 chest X-rays. A senior radiologist charges ₹1,000 per scan and only has time to label 500 scans. What about the other 49,500 scans? Do we throw them away? Absolutely not! That's where Semi-Supervised Learning comes to the rescue.",
      theStory:
        "Semi-Supervised Learning is the smart hybrid. We take a small handful of labeled 'seed' examples (say 2% of the dataset) and combine them with a massive ocean of unlabeled data (98%). Using the natural geometric shape and density bridges of the unlabeled data, the algorithm propagates the labels from the known seeds to their closest unlabeled neighbors, like water flowing through connected valleys.",
      subtypes: [
        {
          name: "1. Label Propagation (Whispering Neighbors)",
          desc: "Building a mathematical graph where points connected by short distances pass their labels along.",
          examples: ["Spreading known medical diagnoses to visually identical unannotated radiographs", "Social network community detection"]
        },
        {
          name: "2. Pseudo-Labeling (Confidence Bootstrapping)",
          desc: "Training a model on the 2% seed data, predicting labels for the 98% unlabeled pool, keeping only the 99% confident predictions, and adding them into the training set.",
          examples: ["Language sentiment analysis when manual annotators only labeled 100 tweets", "Document classification across legal registries"]
        }
      ],
      goldenRule: "Small labeled dataset (1-5%) + Huge unlabeled dataset (95-99%) = Semi-Supervised Learning.",
      pitfall: "Semi-supervised learning fails if different classes are hopelessly tangled together in high-density regions. It relies on the assumption that decision boundaries pass through empty, low-density regions."
    },
    reinforcement: {
      id: "reinforcement",
      title: "Reinforcement Learning",
      subtitle: "Learning to Ride a Bicycle through Scrapes and Cheers",
      icon: "🕹️",
      themeColor: "from-rose-600/20 via-slate-950 to-slate-900",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      coreQuestion: "How did you learn to ride a bicycle as a child?",
      teacherOpening:
        "Did someone give you a dataset of 10,000 labeled spreadsheets before you rode your bicycle? No! Did you read a 500-page physics book on centrifugal force? No! You got on the bicycle, pushed the pedals, lost balance, scraped your knee (negative penalty), adjusted your posture, felt the thrill of moving forward 5 meters (positive reward), and tried again. That trial-and-error loop is Reinforcement Learning!",
      theStory:
        "In Reinforcement Learning, there is NO fixed dataset table at the beginning. An autonomous software 'Agent' is placed inside an interactive 'Environment'. At every moment, the agent observes its current situation (State s), chooses a move (Action a), and receives feedback from the world (Reward +10 or Penalty -1). Over millions of trial-and-error attempts, it discovers the optimal sequence of actions to maximize its total score.",
      subtypes: [
        {
          name: "1. Game Playing & Virtual Arenas",
          desc: "Agents mastering chess, Go, video games, and simulation worlds by playing against themselves millions of times.",
          examples: ["AlphaGo defeating world champion Go players", "Dota 2 and StarCraft AI bots"]
        },
        {
          name: "2. Autonomous Robotics & Control",
          desc: "Physical controllers learning balance, motor torques, and drone stabilization under turbulent wind.",
          examples: ["Self-driving car lane keeping and obstacle braking", "Smart warehouse robotic arm grasping"]
        },
        {
          name: "3. Dynamic Resource Optimization",
          desc: "Managing real-time financial trading, server loads, or green energy grids.",
          examples: ["Barrackpore solar microgrid battery charging arbitrage", "Data center cooling optimization saving millions in power"]
        }
      ],
      goldenRule: "If learning happens interactively through trial, error, states, actions, and delayed rewards/penalties, you are doing Reinforcement Learning.",
      pitfall: "Trying to use Reinforcement Learning for static, tabular Excel data where Supervised Regression would solve the problem 10,000 times faster with zero trial-and-error instability."
    },
    modern: {
      id: "modern",
      title: "Modern GenAI & Foundation Models",
      subtitle: "The Grand Symphony: Combining All Learning Paradigms",
      icon: "✨",
      themeColor: "from-amber-600/20 via-slate-950 to-slate-900",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      coreQuestion: "How are modern models like ChatGPT, Claude, and Gemini actually built?",
      teacherOpening:
        "Here is the secret of the modern AI revolution: state-of-the-art Generative AI does not use just one paradigm—it builds an assembly line combining Self-Supervised, Supervised, and Reinforcement Learning into one breathtaking masterpiece!",
      theStory:
        "Think of building a world-class doctor: First, they spend 10 years reading millions of medical textbooks on their own (Self-Supervised Pre-training). Next, a senior surgeon guides them through 500 specific clinical case studies (Supervised Fine-Tuning). Finally, they practice rounds under hospital supervision, receiving positive feedback for empathetic care and warnings for bedside manner (Reinforcement Learning with Human Feedback - RLHF).",
      subtypes: [
        {
          name: "Stage 1: Self-Supervised Pre-training",
          desc: "Ingesting terabytes of raw unannotated internet text by predicting the next word or fill-in-the-blanks.",
          examples: ["GPT-4 predicting the next token across trillions of web documents", "BERT predicting masked words"]
        },
        {
          name: "Stage 2: Supervised Instruction Tuning (SFT)",
          desc: "Fine-tuning on 50,000 curated high-quality human prompt-response examples to learn how to follow instructions.",
          examples: ["Teaching the raw model to write clean Python code on command", "Formatting answers into neat bullet points"]
        },
        {
          name: "Stage 3: RLHF Alignment (The Politeness & Safety Ring)",
          desc: "Using Reinforcement Learning (PPO) against human preference ratings to eliminate hallucinations and toxicity.",
          examples: ["Refusing harmful queries politely", "Prioritizing helpful, truthful explanations"]
        }
      ],
      goldenRule: "Modern Foundation AI = Self-Supervised (Pre-training) ➔ Supervised (Instruction Tuning) ➔ Reinforcement Learning (RLHF Alignment).",
      pitfall: "Thinking that LLMs are purely 'unsupervised'. They start with self-supervision on raw text, but require rigorous supervised tuning and reinforcement learning to become useful conversational assistants."
    }
  };

  // Interactive Diagnostic Scenarios Data
  const diagnosticScenarios = [
    {
      id: 0,
      title: "Case 1: Hospital Diabetes Detection",
      context: "A hospital in Barrackpore has a database of 25,000 patient records. Each record has [Fasting Sugar, BMI, Blood Pressure, Age] and a doctor-verified column stating 1 (Diabetic) or 0 (Non-diabetic). You need to build a system to screen new walk-in patients.",
      options: [
        { id: "supervised", label: "Supervised Learning (Classification)", isCorrect: true, explanation: "Correct! We have clear input features X and an exact ground-truth answer column y ('Diabetic' vs 'Non-diabetic') for every historical patient. This is textbook Supervised Classification." },
        { id: "unsupervised", label: "Unsupervised Clustering", isCorrect: false, explanation: "Incorrect. We already have verified doctor diagnosis labels for all 25,000 patients! Ignoring those labels and doing unsupervised clustering would waste the most valuable asset you have." },
        { id: "reinforcement", label: "Reinforcement Learning", isCorrect: false, explanation: "Incorrect. There is no interactive environment or trial-and-error action loop here. We have a static dataset of medical records." }
      ]
    },
    {
      id: 1,
      title: "Case 2: E-Commerce Shopper Personas",
      context: "An online fashion store in Kolkata has 300,000 customer transaction histories with [Monthly Spend, Visit Frequency, Return Rate, Cart Size]. Management has no predefined categories and wants to discover natural customer behavioral types for targeted promotions.",
      options: [
        { id: "supervised", label: "Supervised Regression", isCorrect: false, explanation: "Incorrect. Management has no target answer column y (no predefined categories). You cannot do supervised learning without labels." },
        { id: "unsupervised", label: "Unsupervised Learning (Clustering)", isCorrect: true, explanation: "Spot on! There are no predefined labels or target columns. The algorithm must explore the raw feature space {x} and group customers into natural behavioral clusters (e.g. k-Means)." },
        { id: "semiSupervised", label: "Semi-Supervised Label Propagation", isCorrect: false, explanation: "Incorrect. Semi-supervised requires at least some seed labels (1-5%). Here, management has zero labels." }
      ]
    },
    {
      id: 2,
      title: "Case 3: Massive Legal Document Triage",
      context: "A law firm in Salt Lake has 80,000 legal contracts. Due to steep lawyer hourly rates, only 400 contracts have been manually reviewed and tagged as 'High Risk' or 'Standard'. The remaining 79,600 contracts are unreviewed. They want to classify the rest accurately without spending ₹50 Lakhs on manual review.",
      options: [
        { id: "semiSupervised", label: "Semi-Supervised Learning (Label Propagation / Pseudo-labeling)", isCorrect: true, explanation: "Brilliant! You have a small labeled seed set (400 contracts = 0.5%) alongside a massive unlabeled pool (79,600 contracts). Semi-supervised techniques will leverage text embeddings to propagate labels at minimal cost." },
        { id: "supervised", label: "Supervised Learning on all 80,000 contracts", isCorrect: false, explanation: "Incorrect. You only have labels for 400 contracts, leaving 79,600 without labels. Training purely supervised on 400 will overfit and ignore 99.5% of your data." },
        { id: "reinforcement", label: "Reinforcement Learning", isCorrect: false, explanation: "Incorrect. Legal document tagging is a static classification task on text embeddings, not a sequential MDP." }
      ]
    },
    {
      id: 3,
      title: "Case 4: Autonomous Delivery Drone Navigation",
      context: "An engineering team is designing an autonomous drone to deliver emergency medicine across the Hooghly river between Barrackpore and Serampore. The drone must learn how to adjust its rotor speeds dynamically against unpredictable river wind gusts to land safely on a moving barge.",
      options: [
        { id: "reinforcement", label: "Reinforcement Learning (Agent & Environment)", isCorrect: true, explanation: "Bingo! The drone is an Agent inside a dynamic physical Environment (wind, velocity, GPS). It takes real-time motor actions, receives rewards (+score for smooth landing, -penalty for tilt/crash), and learns through trial-and-error simulation." },
        { id: "unsupervised", label: "Unsupervised PCA", isCorrect: false, explanation: "Incorrect. PCA is for static dimensionality reduction. It cannot control dynamic drone rotor speeds in real time." },
        { id: "supervised", label: "Supervised Regression on Excel tables", isCorrect: false, explanation: "Incorrect. You cannot capture every chaotic wind gust and turbulent flight angle in a static spreadsheet. The drone needs an active closed-loop policy." }
      ]
    },
    {
      id: 4,
      title: "Case 5: Building a Bengali Grammar Intelligence Model",
      context: "A university research lab has 100 GB of raw unannotated Bengali novels, poems, and encyclopedias. They want to create a foundation language model that understands grammar, sentence syntax, and world knowledge before fine-tuning it for student Q&A.",
      options: [
        { id: "modern", label: "Self-Supervised Pre-training (Next-Token / Masked Prediction)", isCorrect: true, explanation: "Masterful! With 100 GB of raw text and zero human labels, the model creates its own supervisory pretext tasks (predicting the next word or filling blanks) to acquire deep linguistic knowledge." },
        { id: "supervised", label: "Supervised Classification with 1 human annotator", isCorrect: false, explanation: "Incorrect. One human annotator cannot manually label 100 gigabytes of text. Self-supervised learning is the mandatory first step for foundation LLMs." },
        { id: "reinforcement", label: "Reinforcement Learning from Scratch", isCorrect: false, explanation: "Incorrect. Training an LLM with RL from scratch without language pre-training will generate random gibberish." }
      ]
    }
  ];

  const currentDiagnostic = diagnosticScenarios[selectedDiagnosticCase];

  // Paradigm Information Data for Formal Taxonomy Section
  const paradigms = {
    supervised: {
      id: "supervised",
      title: "Supervised Learning",
      tagline: "Direct Feedback from Labeled Ground-Truth",
      badge: "Labeled Pairs (x, y)",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "🎯",
      dataRequirement: "D = {(x₁, y₁), (x₂, y₂), ..., (x_N, y_N)} where x_i ∈ ℝᵈ, y_i ∈ Y",
      feedback: "Direct, immediate, instance-by-instance ground-truth supervision.",
      objective: "min_w (1/N) ∑ L(h(x_i; w), y_i) + λ Ω(w)",
      subcategories: [
        { name: "Regression", desc: "Predicts continuous real-valued targets (e.g. flat prices in ₹ Lakhs, temperature, stock index)." },
        { name: "Classification", desc: "Predicts discrete categorical class labels (e.g. Spam vs Ham, Loan Default 0/1, Grade A/B/C)." }
      ],
      algorithms: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "XGBoost & LightGBM", "Support Vector Machines (SVM)", "Convolutional Neural Networks (CNN)"],
      realWorldExample: "Predicting semester exam distinction qualification for students in Barrackpore using labeled historical records."
    },
    unsupervised: {
      id: "unsupervised",
      title: "Unsupervised Learning",
      tagline: "Structure & Pattern Discovery from Unlabeled Data",
      badge: "Unlabeled Features {x}",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "🔍",
      dataRequirement: "D = {x₁, x₂, ..., x_N} where x_i ∈ ℝᵈ (No target column y)",
      feedback: "Zero external supervisory feedback; self-guided optimization.",
      objective: "min_C ∑ ||x_i - μ_c||² (Cluster variance minimization / density estimation)",
      subcategories: [
        { name: "Clustering", desc: "Groups similar instances together based on distance/density metrics (k-Means, DBSCAN, Hierarchical)." },
        { name: "Dimensionality Reduction", desc: "Compresses high-dimensional feature spaces while preserving maximum variance (PCA, t-SNE, UMAP)." },
        { name: "Anomaly Detection", desc: "Identifies rare low-density outliers in unlabeled data streams (Isolation Forest, One-Class SVM)." }
      ],
      algorithms: ["k-Means & k-Medoids", "DBSCAN & HDBSCAN", "Principal Component Analysis (PCA)", "Isolation Forest", "Autoencoders"],
      realWorldExample: "Segmenting 40,000 retail shoppers in Ichapur into 4 distinct behavioral clusters based on RFM spend habits."
    },
    semiSupervised: {
      id: "semiSupervised",
      title: "Semi-Supervised Learning",
      tagline: "Leveraging Sparse Labeled Seeds with Massive Unlabeled Pools",
      badge: "Small D_L + Massive D_U",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "🌱",
      dataRequirement: "D_L = {(x_i, y_i)}_{i=1}^l (1-5% labeled) + D_U = {x_j}_{j=l+1}^{l+u} (95% unlabeled)",
      feedback: "Direct supervisory signal on seed instances; propagated to unlabeled pool via geometric smoothness.",
      objective: "min_f [ Loss(f(D_L), y_L) + γ_smoothness · Smoothness_Manifold(f(D_U)) ]",
      subcategories: [
        { name: "Label Propagation", desc: "Propagates labels across high-density graph neighborhoods along the data manifold." },
        { name: "Pseudo-Labeling", desc: "Iteratively assigns artificial labels to high-confidence model predictions on unlabeled points." },
        { name: "Consistency Regularization", desc: "Enforces identical predictions under stochastic data augmentations (FixMatch)." }
      ],
      algorithms: ["Label Propagation & Spreading", "Self-Training with Pseudo-Labels", "Co-Training", "FixMatch & MixMatch"],
      realWorldExample: "Classifying 50,000 chest X-rays in Jadavpur where only 1,000 have been manually annotated by expert radiologists."
    },
    reinforcement: {
      id: "reinforcement",
      title: "Reinforcement Learning",
      tagline: "Sequential Decision Making via Action-Reward Interactions",
      badge: "State-Action-Reward (MDP)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      icon: "🕹️",
      dataRequirement: "Markov Decision Process (MDP): (S, A, P, R, γ) with trajectory logs (s_t, a_t, r_t, s_{t+1})",
      feedback: "Evaluative scalar reward / penalty signals r_t delayed over time steps.",
      objective: "max_π E [ ∑_{k=0}^∞ γ^k · r_{t+k+1} ] (Maximize expected cumulative discounted return)",
      subcategories: [
        { name: "Value-Based Methods", desc: "Learns optimal state-action value function Q*(s, a) (Q-Learning, Deep Q-Networks)." },
        { name: "Policy Gradient Methods", desc: "Directly optimizes parameter weights of the policy network π_θ(a|s) (REINFORCE, PPO)." },
        { name: "Actor-Critic Architectures", desc: "Combines a policy actor with a value-function critic for stable optimization (A2C, SAC)." }
      ],
      algorithms: ["Q-Learning & SARSA", "Deep Q-Networks (DQN)", "Proximal Policy Optimization (PPO)", "Soft Actor-Critic (SAC)", "Deep Deterministic Policy Gradient (DDPG)"],
      realWorldExample: "Optimizing charging, storage, and selling decisions for a smart battery microgrid in Barrackpore to maximize power revenue."
    }
  };

  const currentFormalParadigm = paradigms[selectedParadigm];
  const activeTeacherLesson = teacherLessons[teacherParadigmTab];

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
              BCAC701B • Module 1 • Topic 3
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Taxonomy &amp; Paradigms
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Core ML Taxonomy
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Beginner-to-Master Edition
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Types of Machine Learning
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore the foundational classification of Machine Learning into <span className="text-blue-400 font-semibold">Supervised</span>, <span className="text-emerald-400 font-semibold">Unsupervised</span>, <span className="text-purple-400 font-semibold">Semi-Supervised</span>, and <span className="text-rose-400 font-semibold">Reinforcement Learning</span>. Demystified with simple language, memorable everyday analogies, and a complete technical jargon-buster for novice students.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "taxonomy", label: "1. The 4-Paradigm Taxonomy" },
              { id: "interactiveStudio", label: "2. Interactive Paradigm Studio" },
              { id: "foundationCycle", label: "3. Modern Foundation AI Lifecycle" },
              { id: "caseStudies", label: "4. Real-World Regional Cases" },
              { id: "diagnosticLab", label: "5. Paradigm Diagnostic Quiz" }
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/30 border border-indigo-400">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Master Teacher&apos;s Novice Classroom
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Zero Jargon Barrier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                A simple, intuitive, step-by-step masterclass explaining the 4 types of Machine Learning to beginners
              </p>
            </div>
          </div>
          <div className="text-xs text-indigo-300 bg-indigo-950/70 border border-indigo-800 px-3.5 py-1.5 rounded-xl font-mono">
            Teacher Sukanta Hui • Barrackpore
          </div>
        </div>

        {/* Warm Teacher Welcome Box */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 p-6 rounded-2xl border border-indigo-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <span>💬</span>
            <span>A Personal Word from Your Teacher to You:</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            &quot;Welcome, my dear student! Take a deep breath. When you first open an advanced Machine Learning textbook, you are bombarded with terrifying Greek symbols like <code className="font-mono text-cyan-300">argmin ∑ L(h(x), y)</code>, Markov Decision Processes, manifolds, and hyperplanes. It looks like rocket science, but I promise you: <strong>Machine Learning is just common human intuition expressed in mathematical code</strong>.&quot;
          </p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            There is no single magic algorithm that solves everything. Instead, computers learn in <strong>four distinct styles</strong>, just like humans do. Let us explore each style one by one with simple everyday stories!
          </p>
        </div>

        {/* 5 Interactive Paradigm Lessons Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Select a Learning Style to Explore:
            </span>
            <span className="text-xs text-slate-500">Click any card below</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { id: "supervised", title: "1. Supervised", icon: "🎯", subtitle: "With Flashcards & Answers", color: "blue" },
              { id: "unsupervised", title: "2. Unsupervised", icon: "🔍", subtitle: "Exploring Raw Chaos", color: "emerald" },
              { id: "semiSupervised", title: "3. Semi-Supervised", icon: "🌱", subtitle: "Few Clues + Big Mystery", color: "purple" },
              { id: "reinforcement", title: "4. Reinforcement", icon: "🕹️", subtitle: "Riding Bicycle & Rewards", color: "rose" },
              { id: "modern", title: "5. Modern LLMs", icon: "✨", subtitle: "The All-in-One Symphony", color: "amber" }
            ].map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setTeacherParadigmTab(lesson.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3",
                  teacherParadigmTab === lesson.id
                    ? "bg-slate-900 border-indigo-400 ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-600/20 scale-102"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{lesson.icon}</span>
                  <span className={clsx(
                    "text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase",
                    teacherParadigmTab === lesson.id ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400"
                  )}>
                    {lesson.id === "modern" ? "Modern AI" : "Core ML"}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{lesson.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{lesson.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Lesson Deep Dive Card */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-indigo-900/60 shadow-xl space-y-6">
          {/* Lesson Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeTeacherLesson.icon}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeTeacherLesson.title}
                </h3>
              </div>
              <p className="text-sm text-indigo-300 font-medium">
                {activeTeacherLesson.subtitle}
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono flex items-center gap-2">
              <span className="text-indigo-400 font-bold">Key Question:</span>
              <span>&quot;{activeTeacherLesson.coreQuestion}&quot;</span>
            </div>
          </div>

          {/* The Story & Teacher Dialogue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📖</span> The Everyday Metaphor &amp; Intuition
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {activeTeacherLesson.theStory}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⭐</span> The Teacher&apos;s Golden Memory Hook
                </span>
                <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-800/60 text-xs text-emerald-200 font-medium">
                  {activeTeacherLesson.goldenRule}
                </div>
              </div>
            </div>

            {/* Subtypes Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>🧩</span> Sub-types Broken Down
              </span>
              <div className="space-y-3">
                {activeTeacherLesson.subtypes.map((sub, idx) => (
                  <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <h4 className="text-xs font-bold text-white flex items-center justify-between">
                      <span>{sub.name}</span>
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{sub.desc}</p>
                    <div className="pt-1 border-t border-slate-800/60">
                      <span className="text-[10px] font-mono text-indigo-300 font-bold block mb-0.5">Real Examples:</span>
                      <ul className="text-[10px] text-slate-400 space-y-0.5 list-disc list-inside">
                        {sub.examples.map((ex, exIdx) => (
                          <li key={exIdx}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pitfall & Novice Gotcha */}
          <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-900/50 flex items-start gap-3 text-xs">
            <span className="text-lg">⚠️</span>
            <div>
              <strong className="text-rose-300 font-bold block mb-0.5">Common Novice Misconception to Avoid:</strong>
              <span className="text-slate-300 leading-relaxed">{activeTeacherLesson.pitfall}</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUB-SECTION: INTERACTIVE JARGON BUSTER & GLOSSARY DICTIONARY */}
        {/* ========================================================================= */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  The &quot;No Jargon Left Behind&quot; Dictionary
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every difficult mathematical or technical term in this topic translated into plain, everyday English
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Terms" },
                { id: "supervised", label: "Supervised" },
                { id: "unsupervised", label: "Unsupervised" },
                { id: "semiSupervised", label: "Semi-Supervised" },
                { id: "reinforcement", label: "Reinforcement" },
                { id: "modern", label: "GenAI/LLM" }
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

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={jargonSearchQuery}
              onChange={(e) => setJargonSearchQuery(e.target.value)}
              placeholder="🔍 Search any technical term (e.g. 'Centroid', 'Loss Function', 'Reward', 'Ground Truth')..."
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

                  {/* Plain English Translation */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                      In Plain English:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.plainEnglish}
                    </p>
                  </div>

                  {/* Everyday Analogy */}
                  <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                      <span>💡</span> Everyday Analogy:
                    </span>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">
                      &quot;{item.everydayAnalogy}&quot;
                    </p>
                  </div>
                </div>

                {/* Why it matters */}
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  <span className="text-indigo-300 font-semibold">Why it matters: </span>
                  {item.whyItMatters}
                </div>
              </div>
            ))}
          </div>

          {filteredJargon.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching technical terms found for &quot;{jargonSearchQuery}&quot;. Try searching for &quot;Loss&quot;, &quot;Feature&quot;, or &quot;Policy&quot;.
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SUB-SECTION: QUICK SUMMARY CHEAT SHEET */}
        {/* ========================================================================= */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              The 30-Second Paradigm Cheat Sheet for Novices
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-900/60">
                  <th className="p-3">Paradigm</th>
                  <th className="p-3">Human Teacher Analogy</th>
                  <th className="p-3">Data You Feed In</th>
                  <th className="p-3">Feedback Signal</th>
                  <th className="p-3">When To Pick It</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-blue-400 flex items-center gap-1.5">
                    <span>🎯</span> Supervised
                  </td>
                  <td className="p-3">School student studying solved flashcards with answers on back</td>
                  <td className="p-3 font-mono text-cyan-300">Features (X) + Labels (y)</td>
                  <td className="p-3 text-emerald-400">Direct, immediate error (red pen)</td>
                  <td className="p-3">When you have historical labeled outcomes (e.g. loan defaults, house prices)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>🔍</span> Unsupervised
                  </td>
                  <td className="p-3">Organizing an uncataloged library into natural piles by book thickness</td>
                  <td className="p-3 font-mono text-emerald-300">{"Features only {x} (No y)"}</td>
                  <td className="p-3 text-slate-400">None (Self-organized distances)</td>
                  <td className="p-3">When you have zero labels and want to find customer groups or anomalies</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-purple-400 flex items-center gap-1.5">
                    <span>🌱</span> Semi-Supervised
                  </td>
                  <td className="p-3">Student with 2 solved math proofs who propagates steps to 100 unsolved ones</td>
                  <td className="p-3 font-mono text-purple-300">1-5% Labeled + 95% Unlabeled</td>
                  <td className="p-3 text-purple-400">Direct on seeds, whispered to neighbors</td>
                  <td className="p-3">When labeling data requires expensive human doctors/lawyers</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-rose-400 flex items-center gap-1.5">
                    <span>🕹️</span> Reinforcement
                  </td>
                  <td className="p-3">Learning to ride a bicycle by pedaling, falling, and getting cheers</td>
                  <td className="p-3 font-mono text-rose-300">State-Action Trajectories in Environment</td>
                  <td className="p-3 text-amber-400">Delayed reward (+10 points) / penalty</td>
                  <td className="p-3">When controlling dynamic robots, video games, or live energy grids</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: THE 4-PARADIGM TAXONOMY (FORMAL MATHEMATICAL SPECS) */}
      {/* ========================================================================= */}
      <section id="taxonomy" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Four Foundational Machine Learning Paradigms (Formal Taxonomy)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Categorized by Training Data Annotation Structure and the Presence of Feedback Signals
            </p>
          </div>
        </div>

        {/* 4 Paradigm Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: "supervised", title: "Supervised", badge: "Labels (x, y)", icon: "🎯", color: "blue", border: "border-blue-800 hover:border-blue-500" },
            { id: "unsupervised", title: "Unsupervised", badge: "No Labels {x}", icon: "🔍", color: "emerald", border: "border-emerald-800 hover:border-emerald-500" },
            { id: "semiSupervised", title: "Semi-Supervised", badge: "Sparse Labels", icon: "🌱", color: "purple", border: "border-purple-800 hover:border-purple-500" },
            { id: "reinforcement", title: "Reinforcement", badge: "Action-Reward", icon: "🕹️", color: "rose", border: "border-rose-800 hover:border-rose-500" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedParadigm(item.id)}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer space-y-2 flex flex-col justify-between",
                selectedParadigm === item.id
                  ? "bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-500/20"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {item.badge}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-[11px] text-slate-400">{paradigms[item.id].tagline}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Paradigm Detailed Breakdown Card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-indigo-900/50 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className={clsx("text-xs font-mono font-bold uppercase px-2.5 py-1 rounded border", currentFormalParadigm.badgeColor)}>
                {currentFormalParadigm.badge}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">
                {currentFormalParadigm.title} — {currentFormalParadigm.tagline}
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              Feedback: {currentFormalParadigm.feedback}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Mathematical Objective</span>
              <div className="text-xs font-mono text-indigo-300 bg-slate-950 p-2.5 rounded border border-slate-800 overflow-x-auto">
                {currentFormalParadigm.objective}
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                Data Format: <span className="font-mono text-slate-300">{currentFormalParadigm.dataRequirement}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Subcategories &amp; Tasks</span>
              <div className="space-y-1.5 text-xs text-slate-300">
                {currentFormalParadigm.subcategories.map((sub, idx) => (
                  <div key={idx}>
                    <strong className="text-white">• {sub.name}:</strong> {sub.desc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">Representative Algorithms</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentFormalParadigm.algorithms.map((algo, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {algo}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Regional Industrial Case</span>
              <p className="text-xs text-slate-300">{currentFormalParadigm.realWorldExample}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INTERACTIVE PARADIGM STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Learning Paradigm Simulation Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live visual demonstration of how each learning paradigm operates on its respective data representation
            </p>
          </div>
        </div>

        {/* Dynamic Simulation Box based on selectedParadigm */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          {selectedParadigm === "supervised" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-400 uppercase">Supervised Decision Boundary ($w^\top x + b = 0$)</span>
                <span className="text-slate-400 font-mono">Blue = Pass (1) | Red = Fail (0)</span>
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900 rounded-lg border border-slate-800">
                {/* Decision boundary line */}
                <line x1="40" y1="160" x2="360" y2="20" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
                <text x="220" y="70" fill="#60a5fa" fontSize="10" fontStyle="italic">Learned Decision Boundary</text>

                {/* Positive Points (Blue) */}
                <circle cx="280" cy="50" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <circle cx="320" cy="40" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <circle cx="340" cy="70" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <circle cx="260" cy="80" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <text x="310" y="95" fill="#93c5fd" fontSize="9">Class 1: Pass</text>

                {/* Negative Points (Red) */}
                <circle cx="80" cy="140" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <circle cx="120" cy="150" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <circle cx="70" cy="110" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <circle cx="140" cy="120" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <text x="70" y="165" fill="#fda4af" fontSize="9">Class 0: Fail</text>
              </svg>
              <div className="text-xs text-slate-400">
                Every data instance has a known label $y$. The algorithm adjusts weights $w$ to draw a separating hyperplane.
              </div>
            </div>
          )}

          {selectedParadigm === "unsupervised" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 uppercase">Unsupervised k-Means Centroid Discovery</span>
                <span className="text-slate-400 font-mono">No labels supplied (Self-Organized)</span>
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900 rounded-lg border border-slate-800">
                {/* Cluster 1 Core (Green) */}
                <circle cx="100" cy="90" r="45" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeDasharray="3 3" />
                <circle cx="80" cy="80" r="5" fill="#34d399" />
                <circle cx="110" cy="70" r="5" fill="#34d399" />
                <circle cx="95" cy="110" r="5" fill="#34d399" />
                <polygon points="100,82 108,98 92,98" fill="#fbbf24" stroke="#d97706" />
                <text x="60" y="150" fill="#34d399" fontSize="9">Cluster A (Budget Shoppers)</text>

                {/* Cluster 2 Core (Purple) */}
                <circle cx="290" cy="90" r="45" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeDasharray="3 3" />
                <circle cx="270" cy="80" r="5" fill="#a78bfa" />
                <circle cx="310" cy="75" r="5" fill="#a78bfa" />
                <circle cx="285" cy="110" r="5" fill="#a78bfa" />
                <polygon points="290,82 298,98 282,98" fill="#fbbf24" stroke="#d97706" />
                <text x="240" y="150" fill="#a78bfa" fontSize="9">Cluster B (Premium VIPs)</text>
              </svg>
              <div className="text-xs text-slate-400">
                The algorithm calculates centroids (yellow triangles) and groups points by Euclidean distance without ground-truth labels.
              </div>
            </div>
          )}

          {selectedParadigm === "semiSupervised" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-purple-400 uppercase">Semi-Supervised Label Propagation Wave</span>
                <button
                  onClick={() => setSemiSpreadLevel((prev) => (prev >= 3 ? 1 : prev + 1))}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs cursor-pointer font-semibold"
                >
                  Step Wave Spread (Step {semiSpreadLevel}/3)
                </button>
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900 rounded-lg border border-slate-800">
                {/* Seed Node 1 */}
                <circle cx="60" cy="90" r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                <text x="60" y="70" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Seed (Pass)</text>

                {/* Graph Edges */}
                <line x1="60" y1="90" x2="130" y2="60" stroke="#475569" strokeWidth="1.5" />
                <line x1="60" y1="90" x2="130" y2="120" stroke="#475569" strokeWidth="1.5" />
                <line x1="130" y1="60" x2="200" y2="90" stroke="#475569" strokeWidth="1.5" />
                <line x1="130" y1="120" x2="200" y2="90" stroke="#475569" strokeWidth="1.5" />

                {/* Step 1 Propagation Nodes */}
                <circle cx="130" cy="60" r="7" fill={semiSpreadLevel >= 2 ? "#3b82f6" : "#64748b"} />
                <circle cx="130" cy="120" r="7" fill={semiSpreadLevel >= 2 ? "#3b82f6" : "#64748b"} />

                {/* Step 2 Propagation Node */}
                <circle cx="200" cy="90" r="7" fill={semiSpreadLevel >= 3 ? "#3b82f6" : "#64748b"} />

                {/* Unlabeled Right Cluster */}
                <circle cx="340" cy="90" r="8" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                <text x="340" y="70" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold">Seed (Fail)</text>
                <line x1="340" y1="90" x2="270" y2="90" stroke="#475569" strokeWidth="1.5" />
                <circle cx="270" cy="90" r="7" fill={semiSpreadLevel >= 2 ? "#f43f5e" : "#64748b"} />
              </svg>
              <div className="text-xs text-slate-400">
                Notice how knowledge from 2 labeled seed nodes flows along density graph paths to annotate all unlabeled gray nodes.
              </div>
            </div>
          )}

          {selectedParadigm === "reinforcement" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-rose-400 uppercase">Reinforcement Learning 1D Q-Agent Gridworld</span>
                <button
                  onClick={() => setRlStep((prev) => (prev >= 4 ? 0 : prev + 1))}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs cursor-pointer font-semibold"
                >
                  Execute Agent Step (State: S{rlStep})
                </button>
              </div>

              {/* 5-Cell Grid */}
              <div className="grid grid-cols-5 gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
                {[0, 1, 2, 3, 4].map((cellIdx) => (
                  <div
                    key={cellIdx}
                    className={clsx(
                      "h-20 rounded-lg border flex flex-col items-center justify-center font-mono text-xs transition-all duration-300",
                      rlStep === cellIdx
                        ? "bg-rose-950 border-rose-500 shadow-lg shadow-rose-500/30 text-white scale-105"
                        : cellIdx === 4
                        ? "bg-emerald-950/40 border-emerald-700 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-500"
                    )}
                  >
                    <div className="text-[10px]">State S{cellIdx}</div>
                    <div className="text-lg">
                      {rlStep === cellIdx ? "🤖" : cellIdx === 4 ? "🏆" : "▫️"}
                    </div>
                    <div className="text-[9px]">
                      {cellIdx === 4 ? "Reward +10" : "Penalty -1"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-400">
                The agent receives a scalar penalty (-1) at each step to discourage looping, receiving a +10 reward upon reaching Goal State S4.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE MODERN FOUNDATION AI LIFECYCLE */}
      {/* ========================================================================= */}
      <section id="foundationCycle" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Modern Foundation AI Lifecycle (Combining All Paradigms)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How state-of-the-art Generative AI pipelines unify Self-Supervised, Supervised, and Reinforcement Learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Stage 1: Pre-training</span>
            <h3 className="text-base font-bold text-white">Self-Supervised Pretext</h3>
            <p className="text-xs text-slate-300">
              The model ingests terabytes of raw text or images, optimizing next-token or masked-patch prediction without human labels, learning generalized grammar, world facts, and visual primitives.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Stage 2: Fine-Tuning</span>
            <h3 className="text-base font-bold text-white">Supervised Instruction Tuning (SFT)</h3>
            <p className="text-xs text-slate-300">
              Human experts write 50,000 high-quality question-answer dialogues. The pre-trained model is fine-tuned with supervised cross-entropy loss to follow instructions and generate clean code/answers.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Stage 3: Alignment</span>
            <h3 className="text-base font-bold text-white">RLHF / PPO Policy Alignment</h3>
            <p className="text-xs text-slate-300">
              Human evaluators rank response candidates. A reward model is trained on these preferences, and Reinforcement Learning (PPO) optimizes the model to maximize helpfulness and eliminate hallucinations.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: REAL-WORLD REGIONAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section id="caseStudies" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Concrete enterprise deployments matching each learning paradigm
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1: Supervised */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400">Case 1 • Kolkata Banking Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">Supervised Classification</span>
            </div>
            <h3 className="text-base font-bold text-white">Retail Loan Default Risk Scoring</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima built an XGBoost classifier on 100,000 historical bank applicants in Kolkata. Given CIBIL score, monthly income in ₹, and repayment histories, the model predicts default probability with 94.8% ROC-AUC.
            </p>
          </div>

          {/* Case 2: Unsupervised */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Case 2 • Ichapur Retail Center</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">Unsupervised k-Means</span>
            </div>
            <h3 className="text-base font-bold text-white">Shopper RFM Behavioral Segmentation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita clustered 40,000 unlabeled loyalty card transaction logs across Ichapur into 4 distinct groups (Champions, Loyal Spenders, Dormant Accounts, At-Risk Shoppers) to automate personalized discount vouchers.
            </p>
          </div>

          {/* Case 3: Semi-Supervised */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 3 • Jadavpur Medical Lab</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Semi-Supervised Spreading</span>
            </div>
            <h3 className="text-base font-bold text-white">Chest Radiograph Anomaly Triage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila leveraged 1,000 radiologist-annotated X-rays combined with 49,000 unlabeled hospital scans. Using label propagation on deep visual embeddings, the model achieved diagnostic sensitivity matching full supervised models at a 90% labeling cost reduction.
            </p>
          </div>

          {/* Case 4: Reinforcement Learning */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">Case 4 • Barrackpore Solar Farm</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">Reinforcement Learning</span>
            </div>
            <h3 className="text-base font-bold text-white">Microgrid Battery Charge Arbitrage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu trained a Deep Q-Network (DQN) agent optimizing battery charge/discharge cycles in Barrackpore based on real-time grid electricity tariffs (₹/kWh) and solar forecasts, increasing annual clean energy revenue by 28%.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INTERACTIVE PARADIGM DIAGNOSTIC QUIZ */}
      {/* ========================================================================= */}
      <section id="diagnosticLab" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Paradigm Selection Diagnostic
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your engineering intuition: Pick the correct machine learning paradigm for each real-world challenge
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          {/* Scenario Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {diagnosticScenarios.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedDiagnosticCase(idx);
                  setUserSelectedAnswer(null);
                  setHasSubmittedAnswer(false);
                }}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  selectedDiagnosticCase === idx
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                Case {idx + 1}
              </button>
            ))}
          </div>

          {/* Current Scenario Card */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Industry Scenario</span>
              <h3 className="text-lg font-bold text-white">{currentDiagnostic.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {currentDiagnostic.context}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Which paradigm should you deploy?</span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentDiagnostic.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setUserSelectedAnswer(opt.id);
                      setHasSubmittedAnswer(true);
                    }}
                    className={clsx(
                      "p-3.5 rounded-xl border text-left transition-all text-xs sm:text-sm font-medium cursor-pointer flex items-center justify-between",
                      userSelectedAnswer === opt.id
                        ? opt.isCorrect
                          ? "bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40"
                          : "bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/40"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    )}
                  >
                    <span>{opt.label}</span>
                    {hasSubmittedAnswer && userSelectedAnswer === opt.id && (
                      <span className="font-bold text-sm">
                        {opt.isCorrect ? "✅ Correct!" : "❌ Try again"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Teacher Feedback Explanation Box */}
            {hasSubmittedAnswer && userSelectedAnswer && (
              <div className={clsx(
                "p-4 rounded-xl border space-y-1.5 animate-fadeIn text-xs sm:text-sm",
                currentDiagnostic.options.find((o) => o.id === userSelectedAnswer)?.isCorrect
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                  : "bg-rose-950/40 border-rose-800 text-rose-200"
              )}>
                <div className="font-bold flex items-center gap-1.5">
                  <span>💡 Teacher&apos;s Feedback:</span>
                </div>
                <p className="leading-relaxed">
                  {currentDiagnostic.options.find((o) => o.id === userSelectedAnswer)?.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PITFALLS & BEST PRACTICES */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            06
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Paradigm Selection Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Criteria for selecting the right paradigm without wasting computational budget
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Mistakes &amp; Misconceptions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Using RL for Static Data:</strong> Applying complex reinforcement learning to tabular datasets where supervised regression is 100x faster.</li>
              <li><strong className="text-white">Ignoring Semi-Supervised Assumptions:</strong> Running label propagation when class clusters overlap densely in feature space.</li>
              <li><strong className="text-white">Confusing Clustering with Classification:</strong> Expecting unsupervised k-Means to output predefined human business labels automatically.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Industry Best Practices
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Data-First Selection:</strong> If ground-truth labels exist, always start with Supervised Learning (e.g. Random Forest).</li>
              <li><strong className="text-white">Exploratory Clustering:</strong> Use unsupervised PCA and k-Means during initial EDA to discover hidden dataset groupings.</li>
              <li><strong className="text-white">Pre-train then Fine-tune:</strong> Use self-supervised pre-training to bootstrap performance on small domain datasets.</li>
            </ul>
          </div>
        </div>

        {/* Instructor Tip */}
        <div className="bg-gradient-to-r from-slate-950 to-indigo-950/60 p-5 rounded-xl border border-indigo-800/40 space-y-2 text-xs">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <span>💡</span> Instructor Tip &amp; Golden Rule:
          </div>
          <p className="text-slate-300 italic">
            &quot;The four learning paradigms are not isolated silos—they form a cohesive spectrum. When building production AI systems, you will often pre-train on unlabeled data (Self-Supervised), fine-tune on domain samples (Supervised), and refine the policy via action feedback (Reinforcement Learning). Master all four to become a complete ML engineer.&quot;
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: PYTHON LABORATORY LOADER */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            07
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive simulation executing Supervised, Unsupervised, Semi-Supervised, and RL agents in pure Python
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={typesOfMlLab}
          title="types_of_ml_lab.py"
          highlightLines={[20, 21, 40, 50, 75, 80, 100, 115]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FAQ ACCORDION TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Types of Machine Learning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: PRINTABLE PLAIN TEXT STUDY NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Types of Machine Learning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Study Note"
          downloadFileName="topic3_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: TEACHER'S NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Whenever a student asks me 'Which type of Machine Learning is best?', I tell them: The best type is the one dictated by your data annotation reality! If you have clean labeled targets, use Supervised Learning. If your data is unannotated, use Unsupervised Clustering. If labeling is costly, use Semi-Supervised methods. If you are controlling dynamic physical robots or games, use Reinforcement Learning. Master the taxonomy to always choose the right tool!"
        />
      </section>
    </div>
  );
};

export default Topic3;
