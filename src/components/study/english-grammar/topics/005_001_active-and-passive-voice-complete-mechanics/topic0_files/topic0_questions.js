const questions = [
  {
    id: "q1",
    question: "What is the universal formula for converting an Active voice sentence into Passive voice?",
    options: [
      "Subject + Verb + Object",
      "Active Object -> New Subject + Appropriate form of 'BE' + Past Participle (V3) + By + Agent",
      "Subject + had + V3 + by + Object",
      "Subject + being + V3"
    ],
    correctAnswer: 1,
    explanation: "The universal passive transformation rule: The active object becomes the new grammatical subject, followed by the tense-appropriate form of the auxiliary 'BE' + the Past Participle (V3) of the main lexical verb + optional 'by + agent'.",
    explanationBn: "Passive Voice-এর সার্বজনীন রূপান্তরের সূত্র: Active-এর Object -> New Subject + Tense অনুযায়ী 'BE' verb-এর সঠিক রূপ + মূল Verb-এর V3 (Past Participle) + By + Agent।"
  },
  {
    id: "q2",
    question: "Convert into Passive voice: 'She is writing a novel.'",
    options: [
      "A novel was written by her.",
      "A novel is written by her.",
      "A novel is being written by her.",
      "A novel has been written by her."
    ],
    correctAnswer: 2,
    explanation: "Present Continuous active ('is writing') requires 'is being + V3' in the passive: 'A novel is being written by her'.",
    explanationBn: "Present Continuous Active ('is writing') Passive-এ 'is being written'-এ পরিবর্তিত হয়।"
  },
  {
    id: "q3",
    question: "Convert into Passive voice: 'They have completed the bridge.'",
    options: [
      "The bridge was completed by them.",
      "The bridge has been completed by them.",
      "The bridge is being completed by them.",
      "The bridge had been completed by them."
    ],
    correctAnswer: 1,
    explanation: "Present Perfect active ('have completed') requires 'has been + V3' in the passive: 'The bridge has been completed by them'.",
    explanationBn: "Present Perfect Active ('have completed') Passive-এ 'has been completed'-এ রূপ নেয়।"
  },
  {
    id: "q4",
    question: "Why do the Future Continuous and all three Perfect Continuous tenses lack natural standard passive forms?",
    options: [
      "Because grammar forbids the letter 'B'.",
      "Because they would require clumsy double auxiliary stacking like 'being been' (e.g. 'will be being written', 'has been being written'), which is avoided in standard English.",
      "Because they only use intransitive verbs.",
      "Because active voice is always preferred."
    ],
    correctAnswer: 1,
    explanation: "Standard English avoids awkward acoustic stacking of 'be/been + being' (e.g. 'has been being built'), so these 4 tenses generally do not have standard passive transformations.",
    explanationBn: "'Being been'-এর মতো দ্বৈত Auxiliary-র শ্রুতিকটু প্রয়োগ এড়াতে Future Continuous এবং তিনটি Perfect Continuous Tense-এর সাধারণত স্বাভাবিক Passive Voice হয় না।"
  },
  {
    id: "q5",
    question: "In a Ditransitive sentence with two objects ('The teacher taught us grammar'), which object is traditionally preferred as the new subject in passive?",
    options: [
      "Grammar (Direct Object): 'Grammar was taught to us by the teacher.'",
      "Us -> We (Indirect / Personal Object): 'We were taught grammar by the teacher.'",
      "Both are equally standard, but the Personal Object ('We') is stylistically more natural and frequent in English.",
      "Neither object can be made subject."
    ],
    correctAnswer: 2,
    explanation: "Both are grammatically valid, but transforming the Personal / Indirect Object ('We were taught grammar') is stylistically preferred in natural English discourse.",
    explanationBn: "উভয় রূপান্তরই শুদ্ধ, তবে ব্যক্তিবাচক Indirect Object-কে Subject করে বাক্য গঠন ('We were taught grammar') বেশি স্বাভাবিক ও প্রচলিত।"
  },
  {
    id: "q6",
    question: "Convert into Passive voice: 'Who wrote the Mahabharata?'",
    options: [
      "Who was written the Mahabharata by?",
      "By whom was the Mahabharata written?",
      "Whom was written the Mahabharata?",
      "By who was the Mahabharata written?"
    ],
    correctAnswer: 1,
    explanation: "'Who' in active transforms into 'By whom + auxiliary + subject + V3?': 'By whom was the Mahabharata written?' (or informally 'Who was the Mahabharata written by?').",
    explanationBn: "'Who' দিয়ে শুরু Interrogative বাক্যের Passive রূপ: 'By whom was the Mahabharata written?'।"
  },
  {
    id: "q7",
    question: "Convert into Passive voice: 'Whom did you see at the party?'",
    options: [
      "Who was seen by you at the party?",
      "By whom was you seen at the party?",
      "Who did you see at the party?",
      "Whom was seen by you at the party?"
    ],
    correctAnswer: 0,
    explanation: "'Whom' (object in active) becomes the subjective 'Who' in passive: 'Who was seen by you at the party?'",
    explanationBn: "Active-এর Object 'Whom' Passive-এ Subjective 'Who'-তে পরিবর্তিত হয়: 'Who was seen by you...?'"
  },
  {
    id: "q8",
    question: "Convert this IMPERATIVE order into Passive: 'Shut the door.'",
    options: [
      "Let the door be shut.",
      "The door should be shut by you.",
      "You are requested to shut the door.",
      "Let the door shut."
    ],
    correctAnswer: 0,
    explanation: "Imperative orders/commands follow the passive formula: 'Let + Object + be + V3 (Past Participle)': 'Let the door be shut.'",
    explanationBn: "আদেশসূচক Imperative বাক্যের Passive সূত্র: 'Let + Object + be + V3' ('Let the door be shut')।"
  },
  {
    id: "q9",
    question: "Convert this moral advice into Passive: 'Help the poor.'",
    options: [
      "Let the poor be helped.",
      "The poor should be helped.",
      "You are ordered to help the poor.",
      "The poor is helped by you."
    ],
    correctAnswer: 1,
    explanation: "For moral advice, duty, or recommendations, the standard passive uses 'Object + should be + V3': 'The poor should be helped.'",
    explanationBn: "উপদেশ বা নৈতিক কর্তব্যের ক্ষেত্রে Passive রূপ: 'The poor should be helped'।"
  },
  {
    id: "q10",
    question: "Convert the PREPOSITIONAL verb sentence: 'They laughed at the funny clown.'",
    options: [
      "The funny clown was laughed by them.",
      "The funny clown was laughed at by them.",
      "The funny clown laughed at them.",
      "The funny clown was being laughed by them."
    ],
    correctAnswer: 1,
    explanation: "Fixed dependent prepositions in prepositional/phrasal verbs CANNOT be dropped during passive transformation: 'The funny clown was laughed at by them'.",
    explanationBn: "Prepositional Verb-এর সাথে যুক্ত Preposition Passive-এ কখনো বাদ দেওয়া যায় না: 'was laughed at by them'।"
  },
  {
    id: "q11",
    question: "Convert into Passive voice: 'You must obey the rules of the road.'",
    options: [
      "The rules of the road must be obeyed.",
      "The rules of the road must obey.",
      "The rules of the road must have been obeyed.",
      "The rules of the road were obeyed."
    ],
    correctAnswer: 0,
    explanation: "Modal passive formula: 'Modal + be + V3': 'The rules of the road must be obeyed.'",
    explanationBn: "Modal Auxiliary-র Passive সূত্র: 'Modal + be + V3' ('must be obeyed')।"
  },
  {
    id: "q12",
    question: "What is a QUASI-PASSIVE (Middle Voice) sentence?",
    options: [
      "A sentence that is active in form but passive in meaning.",
      "A sentence that has no verb.",
      "A sentence with two subjects.",
      "A passive sentence with no agent."
    ],
    correctAnswer: 0,
    explanation: "Quasi-passive sentences (e.g. 'Honey tastes sweet', 'This fabric feels soft') are active in form but passive in sense ('Honey is sweet when it is tasted').",
    explanationBn: "Quasi-Passive বা Middle Voice হলো এমন বাক্য যা গঠনে Active কিন্তু অর্থগতভাবে Passive (যেমন: 'Honey tastes sweet' = 'Honey is sweet when it is tasted')।"
  },
  {
    id: "q13",
    question: "Convert the Quasi-Passive sentence 'Quinine tastes bitter' into standard passive form:",
    options: [
      "Quinine is tasted bitterly.",
      "Quinine is bitter when it is tasted.",
      "Quinine was tasted bitter.",
      "Let quinine be bitter."
    ],
    correctAnswer: 1,
    explanation: "The standard expansion for sensory quasi-passives: Subject + Linking Verb + Adjective + WHEN + it/they + is/are + V3: 'Quinine is bitter when it is tasted'.",
    explanationBn: "Quasi-Passive রূপান্তরের নিয়ম: 'Quinine is bitter when it is tasted'।"
  },
  {
    id: "q14",
    question: "Convert the Impersonal Reporting structure: 'People say that honesty is the best policy.'",
    options: [
      "It is said that honesty is the best policy.",
      "Honesty is said to be the best policy.",
      "Both A and B are correct passive transformations.",
      "Honesty was said by people."
    ],
    correctAnswer: 2,
    explanation: "Both Impersonal Passive with dummy 'It' ('It is said that...') and Subject Raising ('Honesty is said to be...') are standard and accurate.",
    explanationBn: "A ('It is said that...') এবং B ('Honesty is said to be...') উভয় রূপান্তরই সম্পূর্ণ শুদ্ধ।"
  },
  {
    id: "q15",
    question: "Why is the 'by + agent' omitted in 'The thief was arrested'?",
    options: [
      "Because the agent ('by the police') is obvious from context and redundant.",
      "Because the agent is unknown.",
      "Because passive voice forbids mentioning the police.",
      "Because 'thief' is the agent."
    ],
    correctAnswer: 0,
    explanation: "In English, the 'by + agent' phrase is omitted when the agent is obvious from context (e.g. police arrest thieves, doctors treat patients), unknown, or irrelevant.",
    explanationBn: "কর্তা যখন সার্বজনীনভাবে সুস্পষ্ট বা অপ্রয়োজনীয় (যেমন চোরকে পুলিশই গ্রেপ্তার করে), তখন 'by + agent' বাদ রাখা প্রমিত রীতি।"
  },
  {
    id: "q16",
    question: "Convert into Passive voice: 'Someone has stolen my pen.'",
    options: [
      "My pen was stolen by someone.",
      "My pen has been stolen.",
      "My pen had been stolen by someone.",
      "My pen is stolen."
    ],
    correctAnswer: 1,
    explanation: "When the agent is an indefinite pronoun ('someone', 'somebody', 'they', 'people'), it is typically omitted in the passive: 'My pen has been stolen'.",
    explanationBn: "Active-এ অনির্দিষ্ট কর্তা (someone, somebody) থাকলে Passive-এ তা বাদ পড়ে: 'My pen has been stolen'।"
  },
  {
    id: "q17",
    question: "Convert into Passive voice: 'I know him.'",
    options: [
      "He is known by me.",
      "He is known to me.",
      "He was known by me.",
      "He is known with me."
    ],
    correctAnswer: 1,
    explanation: "The verb 'know' takes the preposition 'to' in the passive, not 'by': 'He is known to me'.",
    explanationBn: "'Know' ক্রিয়ার Passive রূপান্তরের সময় 'by'-এর পরিবর্তে Preposition 'to' বসে: 'He is known to me'।"
  },
  {
    id: "q18",
    question: "Convert into Passive: 'Smoke filled the room.'",
    options: [
      "The room was filled by smoke.",
      "The room was filled with smoke.",
      "The room is filled with smoke.",
      "The room has been filled by smoke."
    ],
    correctAnswer: 1,
    explanation: "Verbs of coverage/filling (fill, cover, line, decorate) take 'with' instead of 'by': 'The room was filled with smoke'.",
    explanationBn: "'Fill', 'cover'-এর মতো ক্রিয়ায় 'by'-এর বদলে Preposition 'with' বসে: 'was filled with smoke'।"
  },
  {
    id: "q19",
    question: "Convert into Passive: 'His behavior surprised me.'",
    options: [
      "I was surprised by his behavior.",
      "I was surprised at his behavior.",
      "I am surprised at his behavior.",
      "I was surprised with his behavior."
    ],
    correctAnswer: 1,
    explanation: "Verbs of mental reaction (surprise, shock, astonish, alarm) take 'at': 'I was surprised at his behavior'.",
    explanationBn: "মানসিক প্রতিক্রিয়া প্রকাশে 'surprise', 'shock'-এর সাথে Preposition 'at' বসে: 'was surprised at his behavior'।"
  },
  {
    id: "q20",
    question: "Convert the CAUSATIVE sentence into Passive: 'The magistrate made the convict confess.'",
    options: [
      "The convict was made confess by the magistrate.",
      "The convict was made to confess by the magistrate.",
      "The convict made to confess.",
      "The convict was made confessing."
    ],
    correctAnswer: 1,
    explanation: "While causative 'make' takes a BARE infinitive in active voice ('made him confess'), it takes a FULL TO-INFINITIVE in passive voice ('was made TO confess').",
    explanationBn: "Active-এ 'make' Bare Infinitive নিলেও Passive-এ 'to' যুক্ত Full Infinitive গ্রহণ করে: 'was made TO confess'।"
  },
  {
    id: "q21",
    question: "Which of the following sentences CANNOT be converted into Passive voice?",
    options: [
      "He wrote an email.",
      "She died of malaria.",
      "They built a bridge.",
      "The teacher praised the boy."
    ],
    correctAnswer: 1,
    explanation: "'Die' is an inherently intransitive verb with no direct object. Without an object to become the new subject, passive transformation is structurally impossible.",
    explanationBn: "'Die' সম্পূর্ণ Intransitive Verb; এর কোনো Object না থাকায় এর Passive Voice অসম্ভব।"
  },
  {
    id: "q22",
    question: "Convert into Passive: 'Please grant me leave.'",
    options: [
      "Let leave be granted to me.",
      "You are requested to grant me leave.",
      "Leave should be granted to me.",
      "Leave is granted to you."
    ],
    correctAnswer: 1,
    explanation: "Polite requests introduced by 'please' or 'kindly' are converted into passive using 'You are requested to + V1...'.",
    explanationBn: "'Please' বা 'Kindly' যুক্ত অনুরোধের Passive রূপ: 'You are requested to grant me leave'।"
  },
  {
    id: "q23",
    question: "Convert into Passive: 'One should keep one's promises.'",
    options: [
      "One's promises should be kept by one.",
      "Promises should be kept.",
      "Promises must be kept by one.",
      "One should be kept promises."
    ],
    correctAnswer: 1,
    explanation: "In universal statements with the indefinite pronoun 'one', both 'one' and 'one's' are dropped in the clean passive: 'Promises should be kept.'",
    explanationBn: "অনির্দিষ্ট 'one'-এর ক্ষেত্রে Passive-এ 'one' ও 'one's' বাদ দিয়ে লেখা হয়: 'Promises should be kept'।"
  },
  {
    id: "q24",
    question: "Convert into Passive: 'The fire destroyed the historic museum.'",
    options: [
      "The historic museum is destroyed by the fire.",
      "The historic museum was destroyed by the fire.",
      "The historic museum has been destroyed by the fire.",
      "The historic museum had been destroyed by the fire."
    ],
    correctAnswer: 1,
    explanation: "Simple Past active ('destroyed') converts to 'was/were + V3' in the passive: 'The historic museum was destroyed by the fire'.",
    explanationBn: "Simple Past Active ('destroyed') Passive-এ 'was destroyed'-এ রূপান্তরিত হয়।"
  },
  {
    id: "q25",
    question: "Convert into Passive: 'They are going to build a new flyover.'",
    options: [
      "A new flyover is going to be built by them.",
      "A new flyover will be built by them.",
      "A new flyover is built by them.",
      "A new flyover has been going to build."
    ],
    correctAnswer: 0,
    explanation: "'Be going to' structures convert to 'be going to BE + V3': 'A new flyover is going to be built by them'.",
    explanationBn: "'Be going to'-র Passive রূপ: 'is going to be built'।"
  }
];

export default questions;
