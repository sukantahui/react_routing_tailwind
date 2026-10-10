const questions = [
  {
    id: 1,
    question: "Who is widely regarded as the 'Father of Artificial Intelligence' for coining the term 'Artificial Intelligence' in 1956?",
    options: [
      "Alan Turing",
      "John McCarthy",
      "Charles Babbage",
      "Geoffrey Hinton"
    ],
    correctAnswer: 1,
    explanation: "John McCarthy coined the term 'Artificial Intelligence' at the Dartmouth Conference in 1956.",
    hint: "Dartmouth conference organizer 1956."
  },
  {
    id: 2,
    question: "Which landmark test was proposed by Alan Turing in 1950 to evaluate whether a machine can exhibit human-indistinguishable intelligence?",
    options: [
      "Voight-Kampff Test",
      "Turing Test (Imitation Game)",
      "CAPTCHA Benchmark",
      "Stanford-Binet AI Test"
    ],
    correctAnswer: 1,
    explanation: "Alan Turing introduced the Turing Test (originally called the Imitation Game) in 1950 to evaluate machine conversational intelligence.",
    hint: "Alan Turing's imitation game."
  },
  {
    id: 3,
    question: "Which category of Artificial Intelligence encompasses all currently existing real-world AI applications (like Siri, autonomous vehicles, and medical diagnostic tools)?",
    options: [
      "Artificial Narrow Intelligence (ANI / Weak AI)",
      "Artificial General Intelligence (AGI / Strong AI)",
      "Artificial Superintelligence (ASI)",
      "Quantum AI"
    ],
    correctAnswer: 0,
    explanation: "All current AI systems operate within specific predefined task domains and are classified as Artificial Narrow Intelligence (ANI / Weak AI).",
    hint: "Narrow or Weak AI."
  },
  {
    id: 4,
    question: "What is Artificial General Intelligence (AGI)?",
    options: [
      "An AI system designed exclusively to play chess",
      "A hypothetical future AI system possessing human-level cognitive versatility capable of solving unfamiliar problems across diverse domains",
      "A database management system for storing images",
      "A robotics hardware sensor"
    ],
    correctAnswer: 1,
    explanation: "AGI (Strong AI) refers to a theoretical machine that can understand, learn, and apply knowledge across any intellectual task just like a human.",
    hint: "Human-level broad intelligence."
  },
  {
    id: 5,
    question: "Which of the following is the core reasoning brain of an AI Expert System that applies logical rules to facts to deduce conclusions?",
    options: [
      "Inference Engine",
      "Knowledge Base",
      "User Interface",
      "Cache Memory"
    ],
    correctAnswer: 0,
    explanation: "The Inference Engine is the brain of an expert system that performs forward or backward chaining to draw logical conclusions from the knowledge base.",
    hint: "Deductive reasoning brain."
  },
  {
    id: 6,
    question: "What is stored inside the 'Knowledge Base' of an AI Expert System?",
    options: [
      "Raw unformatted binary audio clips",
      "Domain-specific facts, heuristics, and IF-THEN rules gathered from human domain experts",
      "Operating system kernel instructions",
      "RAM memory addresses"
    ],
    correctAnswer: 1,
    explanation: "The Knowledge Base stores structured expert rules (IF condition THEN action), domain principles, and verified facts.",
    hint: "Expert rules and domain facts."
  },
  {
    id: 7,
    question: "Which AI program developed by IBM defeated World Chess Champion Garry Kasparov in 1997?",
    options: [
      "Deep Blue",
      "Watson",
      "AlphaGo",
      "ELIZA"
    ],
    correctAnswer: 0,
    explanation: "IBM Deep Blue defeated Garry Kasparov in a six-game chess match in 1997.",
    hint: "IBM's chess supercomputer."
  },
  {
    id: 8,
    question: "Which historical AI program created in 1966 by Joseph Weizenbaum simulated a Rogerian psychotherapist?",
    options: [
      "MYCIN",
      "DENDRAL",
      "ELIZA",
      "Siri"
    ],
    correctAnswer: 2,
    explanation: "ELIZA was an early natural language processing computer program that simulated conversation using pattern matching.",
    hint: "ELIZA psychotherapist chatbot."
  },
  {
    id: 9,
    question: "Which famous expert system was developed in the 1970s at Stanford University to diagnose bacterial blood infections?",
    options: [
      "MYCIN",
      "DENDRAL",
      "Deep Blue",
      "ChatGPT"
    ],
    correctAnswer: 0,
    explanation: "MYCIN was a pioneering rule-based medical expert system used to identify bacteria causing severe infections and recommend antibiotics.",
    hint: "MYCIN medical expert system."
  },
  {
    id: 10,
    question: "Which of the following represents the correct hierarchical relationship between AI, Machine Learning (ML), and Deep Learning (DL)?",
    options: [
      "Deep Learning ⊃ Machine Learning ⊃ Artificial Intelligence",
      "Artificial Intelligence ⊃ Machine Learning ⊃ Deep Learning",
      "Machine Learning ⊃ Artificial Intelligence ⊃ Deep Learning",
      "Artificial Intelligence = Machine Learning = Deep Learning"
    ],
    correctAnswer: 1,
    explanation: "Artificial Intelligence is the broad umbrella discipline; Machine Learning is a subset of AI; and Deep Learning is a specialized subset of ML using multi-layered artificial neural networks.",
    hint: "AI contains ML, which contains Deep Learning."
  },
  {
    id: 11,
    question: "Which subfield of AI enables computers to extract meaningful information from digital images, videos, and visual inputs?",
    options: [
      "Natural Language Processing",
      "Computer Vision",
      "Speech Synthesis",
      "Expert Systems"
    ],
    correctAnswer: 1,
    explanation: "Computer Vision is the branch of AI enabling machines to perceive, process, and analyze visual imagery (e.g. facial recognition, object tracking).",
    hint: "Visual processing."
  },
  {
    id: 12,
    question: "What is Artificial Superintelligence (ASI)?",
    options: [
      "A software program that runs 10% faster than Python",
      "A hypothetical evolutionary stage where machine intelligence surpasses the collective cognitive capacity of all humanity combined",
      "A multi-core CPU architecture",
      "An image compression algorithm"
    ],
    correctAnswer: 1,
    explanation: "ASI refers to machine intelligence that vastly exceeds the best human brains in every discipline, including creativity, general wisdom, and social skills.",
    hint: "Intelligence beyond all humanity."
  },
  {
    id: 13,
    question: "In the Turing Test, what role does the human interrogator play?",
    options: [
      "Writing python code to debug the computer",
      "Engaging in natural language text conversations with a hidden human and a hidden machine, attempting to determine which is which",
      "Measuring clock speeds in GHz",
      "Soldering electronic microchips"
    ],
    correctAnswer: 1,
    explanation: "The interrogator asks questions via a terminal and tries to distinguish the machine from the human solely based on conversational responses.",
    hint: "Distinguishing human from machine."
  },
  {
    id: 14,
    question: "Which of the following is an example of an AI-powered Recommendation Engine?",
    options: [
      "Netflix recommending movies based on viewing history",
      "A simple digital wristwatch counting seconds",
      "A standard HDMI cable transmitting video",
      "A physical optical mouse"
    ],
    correctAnswer: 0,
    explanation: "Recommendation engines on Netflix, Spotify, and Amazon use machine learning algorithms to suggest tailored content.",
    hint: "Personalized content suggestions."
  },
  {
    id: 15,
    question: "Which of the following describes a Heuristic in AI problem solving?",
    options: [
      "An exact mathematical formula that guarantees the optimum solution after calculating every possibility for 100 years",
      "A practical rule-of-thumb or educated guess that speeds up search algorithms to find a good-enough solution quickly",
      "A type of memory register in CPUs",
      "An operating system error log"
    ],
    correctAnswer: 1,
    explanation: "A heuristic is a mental shortcut or thumb rule that provides a quick, satisfactory solution in complex state spaces (e.g. in chess tree search).",
    hint: "Rule of thumb shortcut."
  },
  {
    id: 16,
    question: "Which AI program defeated World Go Champion Lee Sedol in 2016?",
    options: [
      "AlphaGo (Google DeepMind)",
      "Deep Blue",
      "Watson",
      "ELIZA"
    ],
    correctAnswer: 0,
    explanation: "Google DeepMind's AlphaGo defeated 18-time world Go champion Lee Sedol in Seoul, South Korea in 2016.",
    hint: "AlphaGo."
  },
  {
    id: 17,
    question: "What is Knowledge Engineering in the context of Expert Systems?",
    options: [
      "Designing mechanical gears for robots",
      "The process of extracting, organizing, and encoding human domain expertise into structured rules for the knowledge base",
      "Installing RAM chips in servers",
      "Formatting hard drives"
    ],
    correctAnswer: 1,
    explanation: "Knowledge engineering involves knowledge engineers interviewing human experts to translate their diagnostic skills into IF-THEN rules.",
    hint: "Translating expert knowledge into rules."
  },
  {
    id: 18,
    question: "Which of the following is NOT an AI capability?",
    options: [
      "Speech recognition",
      "Facial detection in cameras",
      "Deterministic passive electrical conduction through a copper wire",
      "Autonomous vehicle lane tracking"
    ],
    correctAnswer: 2,
    explanation: "Passive physical electrical conduction in a wire is basic electromagnetism, not cognitive AI processing.",
    hint: "Physical passive wire conduction."
  },
  {
    id: 19,
    question: "What ethical challenge is most prominent in algorithmic AI decision-making?",
    options: [
      "Algorithmic Bias (perpetuating human historical discrimination present in training datasets)",
      "Transistors becoming too cold",
      "Hard drives spinning too quietly",
      "Computers running out of English letters"
    ],
    correctAnswer: 0,
    explanation: "Algorithmic bias occurs when AI models learn and amplify historical prejudices or demographic disparities contained in training datasets.",
    hint: "Bias in training data."
  },
  {
    id: 20,
    question: "In autonomous vehicles, what sensor fusion combination typically powers AI perception?",
    options: [
      "Cameras, LiDAR (Light Detection and Ranging), Radar, and Ultrasonic sensors",
      "Only a standard thermometer",
      "Only a mechanical speedometer",
      "Only a barometer"
    ],
    correctAnswer: 0,
    explanation: "Autonomous self-driving cars combine multi-spectral cameras, LiDAR point clouds, Radar, and Ultrasonic sensors to perceive 360-degree surroundings.",
    hint: "LiDAR, cameras, and Radar."
  },
  {
    id: 21,
    question: "What does 'Forward Chaining' mean in an Expert System inference engine?",
    options: [
      "Starting with known facts and applying rules forward to deduce new facts or final conclusions (Data-Driven)",
      "Starting with a goal and working backwards to verify facts (Goal-Driven)",
      "Deleting files in alphabetical order",
      "Reversing network cables"
    ],
    correctAnswer: 0,
    explanation: "Forward chaining is a data-driven reasoning approach that starts with known facts and moves forward through IF-THEN rules until a goal is reached.",
    hint: "Data-driven forward reasoning."
  },
  {
    id: 22,
    question: "What does 'Backward Chaining' mean in an Expert System inference engine?",
    options: [
      "Starting with a hypothesized goal or conclusion and working backward to check if supporting facts exist in the database (Goal-Driven)",
      "Erasing the operating system",
      "Rebooting the server",
      "Running code in reverse"
    ],
    correctAnswer: 0,
    explanation: "Backward chaining is a goal-driven reasoning technique commonly used in diagnostic systems to test hypotheses against evidence.",
    hint: "Goal-driven backward verification."
  },
  {
    id: 23,
    question: "Which of the following is a classic example of Artificial Narrow Intelligence (ANI)?",
    options: [
      "A smartphone spam filter that detects unsolicited SMS messages",
      "A conscious robot that writes original philosophy and paints portraits with human emotional depth",
      "A sentient machine running a government",
      "A human teacher"
    ],
    correctAnswer: 0,
    explanation: "An SMS spam filter is a dedicated single-purpose classification tool (ANI).",
    hint: "Single-task SMS filter."
  },
  {
    id: 24,
    question: "What term describes the sudden breakthrough when AI reaches human-level intelligence and begins recursively self-improving at an exponential rate?",
    options: [
      "Technological Singularity",
      "Quantum Entanglement",
      "Overclocking",
      "Buffer Overflow"
    ],
    correctAnswer: 0,
    explanation: "The Technological Singularity is the hypothetical future point where autonomous recursive self-improvement triggers runaway superintelligence.",
    hint: "Technological Singularity."
  },
  {
    id: 25,
    question: "Why is Artificial Intelligence included as an enrichment emerging trend in CBSE Class XI Computer Science?",
    options: [
      "To prepare students for cutting-edge computational paradigms transforming global industries, research, and ethics",
      "Because Python will be discontinued",
      "Because binary numbers will no longer be used",
      "To eliminate the need for computer monitors"
    ],
    correctAnswer: 0,
    explanation: "Introducing emerging trends gives senior secondary students holistic technical awareness of modern computing revolutions shaping industry and academia.",
    hint: "Holistic modern technical readiness."
  }
];

export default questions;
