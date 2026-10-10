export const topic3Questions = [
  {
    id: 1,
    question: "What does NLP stand for in Artificial Intelligence?",
    options: [
      "Natural Language Processing",
      "Network Layer Protocol",
      "Non-Linear Programming",
      "Neural Logic Processor"
    ],
    correctAnswer: 0,
    explanationEn: "NLP stands for Natural Language Processing, the branch of AI dedicated to making computers understand and generate human languages.",
    explanationBn: "NLP এর পূর্ণরূপ হলো Natural Language Processing (প্রাকৃতিক ভাষা প্রক্রিয়াকরণ), যা কম্পিউটারকে মানুষের ভাষা বুঝতে ও তৈরি করতে সাহায্য করে।"
  },
  {
    id: 2,
    question: "Which subfield of NLP deals with converting structured computer data into readable human sentences?",
    options: [
      "Natural Language Generation (NLG)",
      "Natural Language Understanding (NLU)",
      "Optical Character Recognition (OCR)",
      "Speech Synthesizer Kernel"
    ],
    correctAnswer: 0,
    explanationEn: "Natural Language Generation (NLG) transforms structured internal data into natural human-readable text output.",
    explanationBn: "ন্যাচারাল ল্যাঙ্গুয়েজ জেনারেশন (NLG) কম্পিউটারের ভেতরের ডেটাকে মানুষের পাঠযোগ্য স্বাভাবিক বাক্যে রূপান্তর করে।"
  },
  {
    id: 3,
    question: "The process of splitting a paragraph or sentence into individual words or symbols is known as:",
    options: [
      "Tokenization",
      "Vectorization",
      "Quantization",
      "Serialization"
    ],
    correctAnswer: 0,
    explanationEn: "Tokenization is the initial NLP step that segments continuous strings of text into individual units called tokens.",
    explanationBn: "একটি বাক্য বা অনুচ্ছেদকে ক্ষুদ্র ক্ষুদ্র শব্দ বা চিহ্নে বিভক্ত করার প্রক্রিয়াকে টোকেনাইজেশন (Tokenization) বলা হয়।"
  },
  {
    id: 4,
    question: "Why are 'Stop Words' (such as 'the', 'is', 'in', 'at') typically filtered out in basic NLP pipelines?",
    options: [
      "Because they corrupt computer memory files",
      "Because they occur with very high frequency but carry little unique contextual or semantic meaning",
      "Because Python strings cannot store vowels",
      "Because they are forbidden by unicode character standards"
    ],
    correctAnswer: 1,
    explanationEn: "Stop words are high-frequency grammatical glue words that add minimal discriminative value to classification tasks.",
    explanationBn: "স্টপ ওয়ার্ডস (যেমন the, is, at) বাক্যে বারবার আসে কিন্তু বাক্যের মূল ভাব বা বিষয়বস্তু নির্ধারণে বিশেষ ভূমিকা রাখে না।"
  },
  {
    id: 5,
    question: "What is the crucial difference between 'Stemming' and 'Lemmatization'?",
    options: [
      "Stemming uses crude heuristic rules to chop word ends, while Lemmatization uses morphological dictionary analysis to find the true root base",
      "Stemming is for English only, whereas Lemmatization is for SQL queries",
      "Stemming converts audio into text, while Lemmatization converts text into audio",
      "There is no difference; they are exact synonyms"
    ],
    correctAnswer: 0,
    explanationEn: "Stemming cuts suffixes crudely (e.g., 'caring' -> 'car'), while Lemmatization maps words to valid morphological dictionary lemmas (e.g., 'caring' -> 'care', 'better' -> 'good').",
    explanationBn: "স্টெமிং ব্যাকরণগত নিয়ম না দেখে শব্দের শেষ অংশ কেটে ফেলে, কিন্তু লেমাটাইজেশন অভিধান ও ব্যাকরণগত গঠন অনুসারে সঠিক মূল শব্দ (Lemma) বের করে।"
  },
  {
    id: 6,
    question: "Which of the following is an example of an Automatic Speech Recognition (ASR) system?",
    options: [
      "Apple Siri and Amazon Alexa converting spoken voice into text commands",
      "A laser printer printing an invoice",
      "A hard disk defragmenter utility",
      "A barcode scanner reading a price tag"
    ],
    correctAnswer: 0,
    explanationEn: "Voice assistants like Siri and Alexa capture spoken voice waveforms and convert them into text representations using ASR.",
    explanationBn: "সিরি বা অ্যালেক্সা ব্যবহারকারীর মুখের কথাকে টেক্সট নির্দেশে রূপান্তর করতে অটোমেটিক স্পিচ রিকগনিশন (ASR) ব্যবহার করে।"
  },
  {
    id: 7,
    question: "Determining whether a customer's product review expresses positive, negative, or neutral sentiment is called:",
    options: [
      "Sentiment Analysis (Opinion Mining)",
      "Database Normalization",
      "Data Compression",
      "Syntax Parsing"
    ],
    correctAnswer: 0,
    explanationEn: "Sentiment analysis (opinion mining) analyzes subjective emotions, opinions, and polarity in text.",
    explanationBn: "গ্রাহকের মতামতের মানসিক ভাব (ইতিবাচক, নেতিবাচক বা নিরপেক্ষ) বিশ্লেষণ করাকে সেন্টিমেন্ট অ্যানালাইসিস (Sentiment Analysis) বলে।"
  },
  {
    id: 8,
    question: "A chatbot that answers queries strictly by matching predefined keywords to hardcoded answers without understanding context is a:",
    options: [
      "Rule-based (Scripted) Chatbot",
      "Generative AI Transformer Chatbot",
      "Quantum Artificial Agent",
      "Deep Reinforcement Network"
    ],
    correctAnswer: 0,
    explanationEn: "Rule-based chatbots rely on hardcoded decision trees and keyword matchers, lacking contextual adaptability.",
    explanationBn: "রুল-বেসড চ্যাটবট শুধুমাত্র নির্দিষ্ট কী-ওয়ার্ড বা স্ক্রিপ্টের ওপর ভিত্তি করে উত্তর দেয়, প্রাসঙ্গিক প্রেক্ষাপট বুঝতে পারে না।"
  },
  {
    id: 9,
    question: "What is Part-of-Speech (POS) Tagging in NLP?",
    options: [
      "Labeling each token with its grammatical category such as Noun, Verb, Adjective, or Adverb",
      "Counting the total number of characters in a string",
      "Encrypting words with HTTPS certificates",
      "Translating code from Python to C++"
    ],
    correctAnswer: 0,
    explanationEn: "POS Tagging annotates tokens with grammatical categories (e.g., NN for noun, VB for verb) based on syntactic context.",
    explanationBn: "POS ট্যাগিং বাক্যের প্রতিটি শব্দকে তার ব্যাকরণগত শ্রেণী (বিশেষ্য, ক্রিয়া, বিশেষণ ইত্যাদি) হিসেবে চিহ্নিত করে।"
  },
  {
    id: 10,
    question: "Named Entity Recognition (NER) is used to locate and identify:",
    options: [
      "Names of people, organizations, geographic locations, dates, and currency quantities",
      "Pixel color values in an image",
      "Memory leak addresses in C programs",
      "Wi-Fi router MAC addresses"
    ],
    correctAnswer: 0,
    explanationEn: "NER extracts domain-specific entities such as persons, companies, locations, and timestamps from unstructured text.",
    explanationBn: "নেমড এন্টিটি রিকগনিশন (NER) টেক্সট থেকে ব্যক্তি, প্রতিষ্ঠান, স্থান, তারিখ ইত্যাদির নাম শনাক্ত ও আলাদা করে।"
  },
  {
    id: 11,
    question: "Google Translate converting text from Hindi to English using deep neural networks is an example of:",
    options: [
      "Neural Machine Translation (NMT)",
      "Optical Disk Formatting",
      "Packet Switching",
      "Lexical Hashing"
    ],
    correctAnswer: 0,
    explanationEn: "Neural Machine Translation (NMT) utilizes sequence-to-sequence deep neural models to translate entire sentences between languages accurately.",
    explanationBn: "নিউরাল মেশিন ট্রান্সলেশন (NMT) নিউরাল নেটওয়ার্ক ব্যবহারের মাধ্যমে এক ভাষা থেকে অন্য ভাষায় স্বয়ংক্রিয় অনুবাদ সম্পন্ন করে।"
  },
  {
    id: 12,
    question: "Why is human language difficult for computers to understand accurately?",
    options: [
      "Human language contains ambiguity, homonyms, sarcasm, cultural idioms, and slang",
      "Computers only operate at 50 Hz electrical frequency",
      "Human sentences cannot be stored in binary 0s and 1s",
      "Microprocessors overheat when reading punctuation marks"
    ],
    correctAnswer: 0,
    explanationEn: "Natural language is highly unstructured and ambiguous; words often have multiple meanings depending on context (polysemy, sarcasm, idioms).",
    explanationBn: "মানুষের ভাষায় ব্যঙ্গ, রূপক, অপভ্রংশ এবং একই শব্দের একাধিক অর্থ (দ্ব্যর্থবোধকতা) থাকায় কম্পিউটারের পক্ষে তা নির্ভুলভাবে বোঝা কঠিন।"
  },
  {
    id: 13,
    question: "What is 'Lexical Ambiguity' in NLP?",
    options: [
      "When a single word has multiple distinct meanings (e.g., 'bank' as a river bank vs. financial bank)",
      "When a microphone fails to record audio input",
      "When a sentence has more than 50 words",
      "When an HTML tag is left unclosed"
    ],
    correctAnswer: 0,
    explanationEn: "Lexical ambiguity occurs when a single word token carries multiple possible semantic interpretations.",
    explanationBn: "লেক্সিক্যাল অ্যাম্বিগুয়িটি হলো যখন একটি একক শব্দের একাধিক অর্থ থাকে (যেমন 'Bank' মানে নদীর তীর আবার ব্যাংক প্রতিষ্ঠানও হতে পারে)।"
  },
  {
    id: 14,
    question: "Which of the following describes 'Syntactic Ambiguity'?",
    options: [
      "A sentence can be parsed with multiple grammatical structures (e.g., 'I saw the man with a telescope')",
      "A word spelled backwards creates an invalid token",
      "A sound file containing background noise",
      "A keyboard typing in uppercase letters only"
    ],
    correctAnswer: 0,
    explanationEn: "Syntactic ambiguity arises when a sentence structure allows multiple parse trees (who had the telescope? The man or the speaker?).",
    explanationBn: "সিনট্যাক্টিক অ্যাম্বিগুয়িটি ঘটে যখন একটি বাক্যের গঠন এমন হয় যে একাধিক ব্যাকরণগত ব্যাখ্যা সম্ভব হয়।"
  },
  {
    id: 15,
    question: "Modern large language models (LLMs) like GPT-4, Claude, and Gemini are based on which revolutionary neural network architecture?",
    options: [
      "Transformer Architecture (with Self-Attention mechanisms)",
      "Single-layer Perceptron",
      "Radial Basis Function Networks",
      "Simple Bubble Sorter"
    ],
    correctAnswer: 0,
    explanationEn: "The Transformer architecture, introduced by Google in 2017 ('Attention Is All You Need'), forms the backbone of modern LLMs.",
    explanationBn: "আধুনিক বৃহৎ ল্যাঙ্গুয়েজ মডেলগুলো (LLMs) ট্রান্সফরমার (Transformer) আর্কিটেকচার ও সেলফ-অ্যাটেনশন মেকানিজমের ওপর ভিত্তি করে গঠিত।"
  },
  {
    id: 16,
    question: "What is 'Word Embedding' (e.g., Word2Vec, GloVe) in NLP?",
    options: [
      "Representing words as high-dimensional continuous vectors where semantically similar words are positioned close to each other",
      "Printing words in bold letters on a computer screen",
      "Translating words into Morse code",
      "Compressing text files using ZIP algorithms"
    ],
    correctAnswer: 0,
    explanationEn: "Word embeddings represent vocabulary as mathematical dense vectors in geometric space capturing semantic relationships.",
    explanationBn: "ওয়ার্ড এমবেডিং হলো শব্দগুলোকে ভেক্টর বা সংখ্যাসূচক মানে রূপান্তর করা যাতে সমার্থক শব্দগুলো গাণিতিক দূরত্বের দিক থেকে কাছাকাছি থাকে।"
  },
  {
    id: 17,
    question: "Which Indian Government digital initiative aims to provide AI-powered real-time language translation across various Indian languages?",
    options: [
      "Digital Bhashini (National Language Translation Mission)",
      "Aadhaar Vault",
      "DigiLocker Kernel",
      "Bharat BillPay"
    ],
    correctAnswer: 0,
    explanationEn: "Project Bhashini is India's AI-led national language translation mission for seamless multilingual communication across Indian languages.",
    explanationBn: "ভাষিণী (Project Bhashini) হলো ভারতের জাতীয় ভাষা অনুবাদ মিশন যা ভারতীয় ভাষাগুলোর মধ্যে AI নির্ভর রিয়েল-টাইম অনুবাদের কাজ করে।"
  },
  {
    id: 18,
    question: "In speech recognition systems, converting analog sound waves into digital signals requires sampling via:",
    options: [
      "Analog-to-Digital Converter (ADC)",
      "Digital Video Disc (DVD)",
      "Graphics Processing Unit (GPU) display port",
      "Static RAM Cache"
    ],
    correctAnswer: 0,
    explanationEn: "Microphones capture analog pressure waves which are digitized into discrete time-series amplitude samples via an ADC.",
    explanationBn: "মাইক্রোফোনে আসা এনালগ শব্দ তরঙ্গকে ডিজিটালে রূপান্তর করার জন্য এনালগ-টু-ডিজিটাল কনভার্টার (ADC) ব্যবহৃত হয়।"
  },
  {
    id: 19,
    question: "What is a 'Phoneme' in speech processing?",
    options: [
      "The smallest distinct unit of sound in a spoken language that distinguishes one word from another",
      "A special smartphone antenna",
      "A compressed image format for vocal cords",
      "A database table holding user passwords"
    ],
    correctAnswer: 0,
    explanationEn: "A phoneme is the fundamental acoustic building block of human speech sounds in a spoken dialect.",
    explanationBn: "ফোনিম (Phoneme) বা ধ্বনিমূল হলো মানুষের কথার ক্ষুদ্রতম একক যা একটি শব্দ থেকে অন্য শব্দকে আলাদা করতে সাহায্য করে।"
  },
  {
    id: 20,
    question: "What is Text-to-Speech (TTS) synthesis?",
    options: [
      "Converting written text input into spoken artificial human voice output",
      "Transcribing human voice into text files",
      "Translating Python code into C++",
      "Generating subtitles for silent video clips"
    ],
    correctAnswer: 0,
    explanationEn: "Text-to-Speech (TTS) synthesis systems generate synthetic spoken voice audio from written textual input.",
    explanationBn: "টেক্সট-টু-স্পিচ (TTS) হলো লিখিত টেক্সটকে কৃত্রিম মানুষের কণ্ঠস্বরে রূপান্তর করার প্রযুক্তি।"
  },
  {
    id: 21,
    question: "Which of the following is a key application of Sentiment Analysis in business?",
    options: [
      "Monitoring brand reputation and customer satisfaction on social media",
      "Increasing the CPU clock frequency of enterprise servers",
      "Partitioning a hard drive into NTFS sectors",
      "Cooling the data center server racks"
    ],
    correctAnswer: 0,
    explanationEn: "Businesses use sentiment analysis on tweets, reviews, and feedback to track customer perception and brand health.",
    explanationBn: "ব্যবসার ক্ষেত্রে সোশ্যাল মিডিয়া বা রিভিউ থেকে গ্রাহকদের সন্তুষ্টি ও ব্র্যান্ডের সুনাম পর্যবেক্ষণ করতে সেন্টিমেন্ট অ্যানালাইসিস ব্যবহৃত হয়।"
  },
  {
    id: 22,
    question: "In conversational chatbots, 'Intent' refers to:",
    options: [
      "The underlying objective or purpose behind what a user is asking for",
      "The physical speed at which the user is typing",
      "The size of the user's monitor screen",
      "The operating system installed on the client machine"
    ],
    correctAnswer: 0,
    explanationEn: "Intent represents the user's communicative goal or intention (e.g., 'book_ticket', 'check_balance', 'cancel_order').",
    explanationBn: "চ্যাটবটের ক্ষেত্রে 'ইনটেন্ট' (Intent) বলতে বোঝায় ব্যবহারকারী ঠিক কী উদ্দেশ্য বা তথ্য জানতে চেয়ে প্রশ্ন করেছেন।"
  },
  {
    id: 23,
    question: "In a chatbot query like 'Book a train to Delhi on Monday', what is 'Delhi' in NLP terminology?",
    options: [
      "An Entity (Slot Value)",
      "An Intent",
      "A Stop Word",
      "A Punctuation Token"
    ],
    correctAnswer: 0,
    explanationEn: "'Delhi' is a named geographical Entity extracted to fill the destination parameter slot.",
    explanationBn: "'দিল্লি' হলো একটি Entity (স্থানভিত্তিক প্যারামিটার) যা নির্দিষ্ট তথ্য বোঝাতে ব্যবহৃত হয়েছে।"
  },
  {
    id: 24,
    question: "How do modern contextual chatbots differ from 1960s ELIZA-like chatbots?",
    options: [
      "Modern chatbots understand deep context and generate fluent answers using neural LLMs, whereas ELIZA only used simple pattern matching substitution",
      "ELIZA was more powerful than modern AI supercomputers",
      "Modern chatbots only communicate via Morse code beeps",
      "ELIZA required 5G cellular connectivity"
    ],
    correctAnswer: 0,
    explanationEn: "ELIZA (1966) used simple syntactic substitution rules without understanding meaning, whereas modern LLM chatbots comprehend semantics and context.",
    explanationBn: "১৯৬৬ সালের ELIZA শুধুমাত্র সরল প্যাটার্ন ম্যাচিং করত, কিন্তু বর্তমান চ্যাটবটগুলো ডিপ নিউরাল LLM ব্যবহারের মাধ্যমে গভীর অর্থ ও প্রেক্ষাপট বোঝে।"
  },
  {
    id: 25,
    question: "What is an N-gram in NLP text analysis?",
    options: [
      "A contiguous sequence of n items (characters or words) from a given sample of text",
      "A unit of weight in computer hardware",
      "A digital signature algorithm for emails",
      "A visual diagram of an optical fiber cable"
    ],
    correctAnswer: 0,
    explanationEn: "An N-gram is a contiguous sequence of n words (Unigram = 1 word, Bigram = 2 words, Trigram = 3 words) used in statistical language modeling.",
    explanationBn: "N-gram হলো কোনো টেক্সট থেকে পর্যায়ক্রমিক n সংখ্যক শব্দের বা অক্ষরের একটি ধারাবাহিক গুচ্ছ (যেমন ইউনিগ্রাম, বাইগ্রাম, ট্রাইগ্রাম)।"
  }
];
