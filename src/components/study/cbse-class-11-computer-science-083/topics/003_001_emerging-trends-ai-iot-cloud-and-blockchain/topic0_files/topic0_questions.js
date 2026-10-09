const questions = [
  {
    id: 1,
    question: "What is Artificial Intelligence (AI) in computer science [Enrichment]?",
    options: [
      "A technique of creating physical robots with human skin",
      "The simulation of human intelligence processes (learning, reasoning, problem-solving) by computer systems",
      "A database that stores all internet search terms",
      "A new computer programming language replacing Python"
    ],
    correctAnswer: 1,
    explanation: "Artificial Intelligence refers to the branch of computer science dedicated to building software systems capable of performing tasks that typically require human cognition, such as visual perception, natural language understanding, and decision-making.",
    hint: "Simulation of human intelligence by computing machines."
  },
  {
    id: 2,
    question: "What is the relationship between Artificial Intelligence (AI), Machine Learning (ML), and Deep Learning (DL) [Enrichment]?",
    options: [
      "They are three completely unrelated technologies",
      "AI is the broadest field; ML is a subset of AI; DL is a subset of ML based on multi-layered artificial neural networks",
      "Deep Learning is the parent discipline containing AI and ML",
      "Machine Learning only applies to hardware robotics"
    ],
    correctAnswer: 1,
    explanation: "Hierarchically: AI is the overarching domain $\\supset$ Machine Learning (algorithms learning from statistical patterns in data) $\\supset$ Deep Learning (deep artificial neural networks with multiple hidden layers).",
    hint: "AI contains ML, which contains Deep Learning."
  },
  {
    id: 3,
    question: "Which subfield of AI allows computers to understand, interpret, and generate human languages like English, Hindi, and Bengali [Enrichment]?",
    options: [
      "Computer Vision (CV)",
      "Natural Language Processing (NLP)",
      "Robotic Process Automation",
      "Quantum Computing"
    ],
    correctAnswer: 1,
    explanation: "Natural Language Processing (NLP) combines linguistics and machine learning to enable software to analyze, translate, and synthesize human spoken and written text (e.g. Chatbots, Google Translate).",
    hint: "Natural Language Processing deals with human linguistic communication."
  },
  {
    id: 4,
    question: "What is the Internet of Things (IoT) [Enrichment]?",
    options: [
      "A collection of websites on Google Chrome",
      "A network of physical objects ('things') embedded with sensors, software, and network connectivity to collect and exchange telemetry data over the internet",
      "A replacement for standard Ethernet cables",
      "An offline local storage device"
    ],
    correctAnswer: 1,
    explanation: "IoT refers to interconnected physical devices (smart thermostats, smart meters, connected vehicles, industrial sensors) communicating telemetry over IP networks without requiring direct human-to-human interaction.",
    hint: "Physical objects with embedded sensors connected to the internet."
  },
  {
    id: 5,
    question: "Which Cloud Computing service model provides complete, on-demand software applications accessible via a web browser (e.g., Google Workspace, Microsoft 365) [Enrichment]?",
    options: [
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Software as a Service (SaaS)",
      "Hardware as a Service (HaaS)"
    ],
    correctAnswer: 2,
    explanation: "Software as a Service (SaaS) delivers fully managed, ready-to-use software applications over the internet on a subscription basis without requiring local software installation or server maintenance.",
    hint: "SaaS = Software as a Service."
  },
  {
    id: 6,
    question: "Which Cloud service model provides virtualized computing resources like virtual machines, raw storage, and network firewalls (e.g. AWS EC2, Google Compute Engine) [Enrichment]?",
    options: [
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Software as a Service (SaaS)",
      "Data as a Service (DaaS)"
    ],
    correctAnswer: 0,
    explanation: "IaaS provides fundamental raw compute infrastructure (virtual servers, block storage, VPC networks) where customers manage OS, runtime, and applications.",
    hint: "IaaS = Infrastructure as a Service."
  },
  {
    id: 7,
    question: "What is Blockchain technology [Enrichment]?",
    options: [
      "A physical lock for server rack doors",
      "A decentralized, distributed, immutable digital ledger that cryptographically links records (blocks) across a peer-to-peer network",
      "A proprietary database owned exclusively by Microsoft",
      "A method of compressing video files"
    ],
    correctAnswer: 1,
    explanation: "A Blockchain is a distributed ledger where transaction records are bundled into blocks, timestamped, cryptographically hashed using algorithms like SHA-256, and validated across a peer-to-peer network, ensuring tamper-proof immutability.",
    hint: "Decentralized, immutable distributed cryptographic ledger."
  },
  {
    id: 8,
    question: "In a blockchain, what mechanism links each new block securely to its preceding block [Enrichment]?",
    options: [
      "A database primary key",
      "The cryptographic hash of the previous block header (`previous_hash`)",
      "A shared email attachment",
      "An IP address pointer"
    ],
    correctAnswer: 1,
    explanation: "Every block contains the cryptographic hash of the preceding block's header. Altering any data in a previous block changes its hash, breaking the cryptographic chain forward across all subsequent blocks.",
    hint: "Previous block cryptographic hash."
  },
  {
    id: 9,
    question: "What is a 'Smart Contract' in Blockchain ecosystems [Enrichment]?",
    options: [
      "A legal agreement typed in MS Word",
      "A self-executing computer program deployed on a blockchain that automatically enforces agreement conditions when predefined rules are met",
      "A contract signed by a smartphone",
      "An insurance policy issued by a bank"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are autonomous code programs stored on a blockchain that automatically execute when predetermined logic criteria (e.g. 'if goods received, release payment') are validated across nodes.",
    hint: "Self-executing code on a distributed ledger."
  },
  {
    id: 10,
    question: "What is Grid Computing [Enrichment]?",
    options: [
      "Playing video games on a grid board",
      "Connecting geographically dispersed computing resources from multiple administrative domains to work collectively on a single large computational problem",
      "A power grid supply line",
      "A 2D spreadsheet calculation"
    ],
    correctAnswer: 1,
    explanation: "Grid Computing aggregates computational power from loosely coupled, heterogeneous computers across multiple locations to solve intensive scientific problems (like CERN particle simulation or climate modeling).",
    hint: "Dispersed network of computers collaborating on heavy computational workloads."
  },
  {
    id: 11,
    question: "What is Big Data characterized by (The 3 Vs) [Enrichment]?",
    options: [
      "Volume, Velocity, and Variety",
      "Voltage, Variable, and Value",
      "Vulnerability, Vector, and Visual",
      "Voice, Video, and Vowel"
    ],
    correctAnswer: 0,
    explanation: "Big Data is conventionally defined by the 3 Vs: High Volume (petabytes/exabytes of scale), High Velocity (real-time high-speed data generation), and High Variety (structured, semi-structured JSON, unstructured video/text).",
    hint: "Volume, Velocity, Variety."
  },
  {
    id: 12,
    question: "Which type of Cloud deployment model is operated exclusively for a single organization (e.g. Indian Military Defense Cloud) [Enrichment]?",
    options: [
      "Public Cloud",
      "Private Cloud",
      "Community Cloud",
      "Hybrid Cloud"
    ],
    correctAnswer: 1,
    explanation: "A Private Cloud is dedicated exclusively to a single organization, offering maximum data isolation, security governance, and compliance control.",
    hint: "Exclusively dedicated to one organization."
  },
  {
    id: 13,
    question: "What is Computer Vision (CV) in AI applications [Enrichment]?",
    options: [
      "Cleaning dirty computer screens",
      "Enabling computers to identify, classify, and understand objects from digital images, video streams, and cameras",
      "Creating eyeglasses with mini displays",
      "Enhancing monitor resolution"
    ],
    correctAnswer: 1,
    explanation: "Computer Vision enables software to process, analyze, and extract meaningful spatial features from visual inputs (e.g., facial recognition, autonomous driving lane detection, medical X-ray diagnosis).",
    hint: "Extracting meaning from visual image and video inputs."
  },
  {
    id: 14,
    question: "What is Augmented Reality (AR) compared to Virtual Reality (VR) [Enrichment]?",
    options: [
      "AR replaces reality with an entirely simulated world; VR overlays digital images onto real life.",
      "AR overlays interactive digital elements on top of the real physical environment; VR immerses the user completely into an entirely synthetic 3D environment.",
      "AR requires an internet connection; VR does not.",
      "There is no difference."
    ],
    correctAnswer: 1,
    explanation: "Augmented Reality (AR) superimposes computer-generated digital graphics onto the user's real-world physical surroundings (e.g., Pokémon GO, IKEA furniture preview), while Virtual Reality (VR) immerses the user in a fully enclosed simulated digital world via headsets.",
    hint: "AR overlays onto the real world; VR is complete synthetic immersion."
  },
  {
    id: 15,
    question: "Which cryptographic hash function is widely utilized by Bitcoin and enterprise blockchain ledgers [Enrichment]?",
    options: ["MD5", "SHA-256", "DES", "CRC32"],
    correctAnswer: 1,
    explanation: "SHA-256 (Secure Hash Algorithm 256-bit) generates a unique, deterministic, fixed 64-character hexadecimal digest for any input data, providing extreme collision resistance for blockchain blocks.",
    hint: "Secure Hash Algorithm 256."
  },
  {
    id: 16,
    question: "What role do Actuators play in an IoT ecosystem [Enrichment]?",
    options: [
      "They detect temperature changes",
      "They convert digital control commands from the controller into physical motion or mechanical action (e.g., opening a valve, turning a motor)",
      "They store battery energy",
      "They encrypt network packets"
    ],
    correctAnswer: 1,
    explanation: "While sensors measure physical environments (input), Actuators take electronic signals and perform physical real-world actions (e.g., turning on a sprinkler, closing an automated door).",
    hint: "Actuators perform physical actions based on control signals."
  },
  {
    id: 17,
    question: "What is Supervised Machine Learning [Enrichment]?",
    options: [
      "Training a machine learning model using labeled dataset containing input features and ground-truth output labels",
      "Allowing an algorithm to discover patterns without any teacher or labels",
      "A human watching the computer screen while it runs",
      "Running machine learning on a supercomputer"
    ],
    correctAnswer: 0,
    explanation: "Supervised Learning trains models using labeled training pairs $(x, y)$, adjusting internal weights to minimize prediction error on unseen data (e.g., spam classification, price prediction).",
    hint: "Trained with labeled input-output pairs."
  },
  {
    id: 18,
    question: "What is Edge Computing in IoT deployments [Enrichment]?",
    options: [
      "Processing data near the physical source (on the local device or gateway) rather than sending all raw telemetry to a distant cloud server",
      "Placing servers on the physical edge of a desk",
      "Using Microsoft Edge browser for all data transfers",
      "Running computations on border routers"
    ],
    correctAnswer: 0,
    explanation: "Edge Computing processes and analyzes telemetry locally on IoT edge nodes or local micro-datacenters, reducing network bandwidth usage and latency for real-time responsiveness.",
    hint: "Processing near the edge source of data."
  },
  {
    id: 19,
    question: "What is a Hybrid Cloud [Enrichment]?",
    options: [
      "A cloud powered by hybrid cars",
      "An infrastructure combining on-premises private cloud resources with third-party public cloud services, bound by standardized technology that enables data portability",
      "A cloud that changes color",
      "A mix of Windows and Linux servers only"
    ],
    correctAnswer: 1,
    explanation: "A Hybrid Cloud integrates private on-premise infrastructure (for sensitive customer data) with public cloud scalability (for burst workloads like festival sale traffic).",
    hint: "Combination of Private and Public Cloud infrastructure."
  },
  {
    id: 20,
    question: "What is Machine Learning Overfitting [Enrichment]?",
    options: [
      "When a model memorizes training noise so excessively that it fails to generalize accurately to new, unseen test data",
      "When the model takes up too much hard drive space",
      "When the CPU temperature rises above 90 degrees",
      "When too many users access the model concurrently"
    ],
    correctAnswer: 0,
    explanation: "Overfitting occurs when a machine learning model learns the training data and noise too well, achieving high training accuracy but performing poorly on real-world validation data.",
    hint: "Memorizing training data noise instead of learning general patterns."
  },
  {
    id: 21,
    question: "Which of the following is an example of PaaS (Platform as a Service) [Enrichment]?",
    options: [
      "Google App Engine / Heroku",
      "Amazon S3 Storage",
      "Microsoft Office 365",
      "Dropbox"
    ],
    correctAnswer: 0,
    explanation: "Platform as a Service (PaaS) provides developers with a complete development and deployment platform (database, runtime, web server) without requiring them to manage OS kernels or hardware provisioning.",
    hint: "PaaS provides app runtimes like Heroku and Google App Engine."
  },
  {
    id: 22,
    question: "What is a Consensus Algorithm in a distributed blockchain network [Enrichment]?",
    options: [
      "A protocol (e.g. Proof of Work, Proof of Stake) through which all peer nodes agree on the true, valid state of the distributed ledger",
      "A voting election for the best computer programmer",
      "A password hashing algorithm",
      "An antivirus scanning routine"
    ],
    correctAnswer: 0,
    explanation: "Consensus algorithms ensure all decentralized nodes across a distributed blockchain agree on which transactions are valid and determine the canonical order of blocks in the chain.",
    hint: "Consensus mechanisms like Proof of Work / Proof of Stake."
  },
  {
    id: 23,
    question: "Which Python standard library module provides cryptographic hashing functions like SHA-256 [Enrichment]?",
    options: ["hashlib", "crypto", "security", "sha256"],
    correctAnswer: 0,
    explanation: "The `hashlib` module in Python provides secure hashing and message digest algorithms including `hashlib.sha256()` and `hashlib.md5()`.",
    hint: "import hashlib in Python."
  },
  {
    id: 24,
    question: "What is Automated Speech Recognition (ASR) [Enrichment]?",
    options: [
      "Translating written text into printed books",
      "Converting spoken audio voice acoustic waveforms into computer-readable text strings",
      "Amplifying audio signals on a microphone",
      "Recording telephone calls"
    ],
    correctAnswer: 1,
    explanation: "ASR translates acoustic speech signals captured by microphones into machine-readable digital text (used in Siri, Alexa, and Google Voice Assistant).",
    hint: "Voice to text translation."
  },
  {
    id: 25,
    question: "Case Study: Susmita's smart organic farm in Barrackpore deploys soil moisture sensors that send readings every 10 seconds to an AWS IoT Core server. If moisture falls below 30%, a solenoid water valve opens automatically. What technologies are being used [Enrichment]?",
    options: [
      "Internet of Things (Sensors & Actuators) + Cloud Computing (AWS IoT)",
      "Traditional Flat Files + Assemblers",
      "Only Blockchain",
      "Virtual Reality"
    ],
    correctAnswer: 0,
    explanation: "The setup combines IoT input sensors (soil moisture), IoT output actuators (solenoid water valve), and Cloud Infrastructure (AWS IoT) for centralized telemetry analysis and automation.",
    hint: "IoT sensors, cloud telemetry processing, and actuator triggers."
  }
];

export default questions;
