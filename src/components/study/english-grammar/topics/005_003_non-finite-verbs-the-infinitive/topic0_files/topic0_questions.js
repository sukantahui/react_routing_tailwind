const questions = [
  {
    id: "q1",
    question: "What is a NON-FINITE verb?",
    options: [
      "A verb that changes its form based on the tense, number, and person of the subject.",
      "A verb that is NOT bound by tense, person, or number, and does not act as the primary finite predicate of a clause.",
      "A verb that cannot take an object.",
      "A verb that only occurs in questions."
    ],
    correctAnswer: 1,
    explanation: "Non-finite verbs (infinitives, gerunds, participles) are infinite and unbounded by subject-verb concord or tense markers.",
    explanationBn: "Non-Finite Verb (অসমাপিকা ক্রিয়া) কাল (Tense), পুরুষ (Person) বা বচন (Number) দ্বারা সীমাবদ্ধ নয় এবং মূল সমাপিকা ক্রিয়া হিসেবে কাজ করে না।"
  },
  {
    id: "q2",
    question: "Identify the sentence that correctly uses a BARE INFINITIVE after a causative verb in ACTIVE voice:",
    options: [
      "She made the child to eat his vegetables.",
      "She made the child eat his vegetables.",
      "She made the child eating his vegetables.",
      "She made the child ate his vegetables."
    ],
    correctAnswer: 1,
    explanation: "In active voice, causative verbs 'make' and 'let' are strictly followed by a BARE infinitive (without 'to'): 'made the child eat'.",
    explanationBn: "Active Voice-এ Causative Verb 'make' এবং 'let'-এর পরে 'to' ছাড়া Bare Infinitive ('eat') বসে।"
  },
  {
    id: "q3",
    question: "What happens when causative 'make' is transformed into PASSIVE voice?",
    options: [
      "It retains the bare infinitive: 'He was made write.'",
      "It MUST take a full TO-INFINITIVE: 'He was made TO write.'",
      "It changes into a gerund: 'He was made writing.'",
      "Causative verbs cannot be made passive."
    ],
    correctAnswer: 1,
    explanation: "While causative 'make' takes a bare infinitive in active voice, it REQUIRES a full to-infinitive in the passive: 'He was made TO write the letter'.",
    explanationBn: "Causative 'make' Active-এ Bare Infinitive নিলেও Passive Voice-এ 'to'-যুক্ত Full Infinitive গ্রহণ করে: 'was made TO write'।"
  },
  {
    id: "q4",
    question: "Which of the following sensory verbs triggers a Bare Infinitive to indicate observing the ENTIRE completed action?",
    options: [
      "I saw him cross the busy street.",
      "I saw him to cross the busy street.",
      "I saw him crossed the busy street.",
      "I saw him having crossed."
    ],
    correctAnswer: 0,
    explanation: "Sensory verbs (see, hear, watch, notice, feel) + Bare Infinitive ('cross') denotes witnessing the complete action from beginning to end. (Participle 'crossing' denotes witnessing an action in progress).",
    explanationBn: "Sensory Verbs-এর পর Bare Infinitive ('cross') সম্পূর্ণ কাজটি প্রত্যক্ষ করা বোঝায়।"
  },
  {
    id: "q5",
    question: "Which of the following phrases MUST be followed by a Bare Infinitive?",
    options: [
      "Had better",
      "Would rather",
      "Sooner than",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "'Had better', 'would rather', 'would sooner', and 'sooner than' are all invariant triggers for the Bare Infinitive without 'to'.",
    explanationBn: "'Had better', 'would rather', 'sooner than'-এর পর সর্বদা Bare Infinitive (to ছাড়া) বসে।"
  },
  {
    id: "q6",
    question: "Identify the grammatical role of the to-infinitive in: 'To err is human; to forgive is divine.'",
    options: [
      "Subject of the verb 'is' (acting as a nominal noun)",
      "Direct object",
      "Adverb of purpose",
      "Adjective modifier"
    ],
    correctAnswer: 0,
    explanation: "'To err' and 'to forgive' function as nominal subjects of the copular verb 'is'.",
    explanationBn: "'To err' এবং 'to forgive' এখানে Noun-এর মতো বাক্যের Subject হিসেবে ব্যবহৃত হয়েছে।"
  },
  {
    id: "q7",
    question: "Identify the to-infinitive functioning as an ADJECTIVE modifying a noun in: 'He has no money to waste.'",
    options: [
      "to waste",
      "money",
      "has",
      "no"
    ],
    correctAnswer: 0,
    explanation: "'To waste' modifies the noun 'money' (specifying what kind of money / for what purpose), acting as an Adjectival Infinitive.",
    explanationBn: "'To waste' Infinitive-টি Noun 'money'-কে বিশেষিত করায় Adjective হিসেবে কাজ করছে।"
  },
  {
    id: "q8",
    question: "Identify the to-infinitive functioning as an ADVERB of purpose in: 'She went to the library to consult the reference encyclopedia.'",
    options: [
      "to consult",
      "went",
      "to the library",
      "reference"
    ],
    correctAnswer: 0,
    explanation: "'To consult' answers 'Why did she go?', acting as an Adverbial Infinitive of Purpose modifying the verb 'went'.",
    explanationBn: "'To consult' উদ্দেশ্য (Purpose) প্রকাশ করায় Adverbial Infinitive হিসেবে কাজ করছে।"
  },
  {
    id: "q9",
    question: "What is a 'SPLIT INFINITIVE'?",
    options: [
      "Inserting an adverb between the particle 'to' and the base verb (e.g. 'to boldly go').",
      "Dropping the 'to' from an infinitive.",
      "Combining two infinitives with 'and'.",
      "Converting an infinitive into a gerund."
    ],
    correctAnswer: 0,
    explanation: "A Split Infinitive occurs when an adverbial modifier is placed between 'to' and the verb root ('to really understand', 'to boldly go').",
    explanationBn: "Infinitive-এর 'to' এবং মূল Verb-এর মাঝে Adverb প্রবেশ করালে তাকে Split Infinitive বলা হয় (যেমন: 'to boldly go')।"
  },
  {
    id: "q10",
    question: "Identify the PERFECT INFINITIVE in: 'He claims to have completed the assignment yesterday.'",
    options: [
      "claims",
      "to have completed",
      "completed",
      "yesterday"
    ],
    correctAnswer: 1,
    explanation: "'To have + V3 (completed)' is the Perfect Infinitive, referring to an action completed prior to the time of the main verb 'claims'.",
    explanationBn: "'To have completed' হলো Perfect Infinitive, যা মূল ক্রিয়ার পূর্ববর্তী সম্পন্ন কাজকে নির্দেশ করে।"
  },
  {
    id: "q11",
    question: "Identify the CONTINUOUS INFINITIVE in: 'She pretended to be studying when her father walked in.'",
    options: [
      "pretended",
      "to be studying",
      "walked",
      "studying"
    ],
    correctAnswer: 1,
    explanation: "'To be + V-ing (studying)' is the Continuous Infinitive, indicating an ongoing activity simultaneous with the main clause.",
    explanationBn: "'To be studying' হলো Continuous Infinitive, যা চলমান অবস্থা প্রকাশ করে।"
  },
  {
    id: "q12",
    question: "Identify the PASSIVE INFINITIVE in: 'There is a lot of work to be done.'",
    options: [
      "to be done",
      "is",
      "work",
      "lot"
    ],
    correctAnswer: 0,
    explanation: "'To be + V3 (done)' is the Passive Infinitive.",
    explanationBn: "'To be done' হলো Passive Infinitive।"
  },
  {
    id: "q13",
    question: "Synthesize these two sentences using 'too... to': 'He is very weak. He cannot walk without support.'",
    options: [
      "He is too weak to walk without support.",
      "He is so weak to walk without support.",
      "He is weak enough to walk without support.",
      "He is too weak that he cannot walk."
    ],
    correctAnswer: 0,
    explanation: "'Too + adjective + to-infinitive' conveys the negative inability ('too weak to walk' = so weak that he cannot walk).",
    explanationBn: "'Too... to' নেতিবাচক অক্ষমতা প্রকাশ করে বাক্য সংযোজন করে: 'He is too weak to walk without support'।"
  },
  {
    id: "q14",
    question: "Synthesize these sentences using 'enough to': 'She is very intelligent. She can solve this complex equation.'",
    options: [
      "She is too intelligent to solve this equation.",
      "She is intelligent enough to solve this complex equation.",
      "She is enough intelligent to solve this equation.",
      "She is so intelligent to solve."
    ],
    correctAnswer: 1,
    explanation: "Adjective + 'enough to + V1' expresses positive capability: 'intelligent enough to solve'. ('Enough intelligent' is word-order error).",
    explanationBn: "ইতিবাচক সক্ষমতা প্রকাশে 'Adjective + enough to' বসে: 'intelligent enough to solve'।"
  },
  {
    id: "q15",
    question: "Choose the correct sentence regarding the preposition 'but' (meaning 'except'):",
    options: [
      "He did nothing but to weep all day.",
      "He did nothing but weep all day.",
      "He did nothing but weeping all day.",
      "He did nothing but wept all day."
    ],
    correctAnswer: 1,
    explanation: "When 'but' or 'except' follows 'do/did/does nothing', it is followed by a BARE infinitive: 'did nothing but weep'.",
    explanationBn: "'Do/did nothing but'-এর পরে 'to' ছাড়া Bare Infinitive 'weep' বসে।"
  },
  {
    id: "q16",
    question: "Which of the following verbs requires a TO-INFINITIVE rather than a gerund?",
    options: [
      "Enjoy",
      "Avoid",
      "Decide",
      "Mind"
    ],
    correctAnswer: 2,
    explanation: "'Decide', 'hope', 'promise', 'refuse', 'plan', 'agree', and 'manage' are followed by to-infinitives (e.g. 'He decided to study'). 'Enjoy', 'avoid', and 'mind' take gerunds.",
    explanationBn: "'Decide', 'promise', 'hope'-এর পর To-Infinitive বসে ('decided to go'); আর 'enjoy', 'avoid'-এর পর Gerund বসে।"
  },
  {
    id: "q17",
    question: "Correct the error: 'I heard him to shout in the darkness.'",
    options: [
      "I heard him shout in the darkness. (or: shouting)",
      "I heard him shouted.",
      "I heard him to be shouting.",
      "I heard him shout to."
    ],
    correctAnswer: 0,
    explanation: "Sensory verb 'heard' takes a Bare Infinitive ('shout') or Present Participle ('shouting'), never a to-infinitive.",
    explanationBn: "Sensory Verb 'hear'-এর পর 'to' বসে না; 'heard him shout' (Bare Infinitive) বা 'shouting' হবে।"
  },
  {
    id: "q18",
    question: "In the sentence 'Let him go', what form is 'go'?",
    options: [
      "To-Infinitive",
      "Bare Infinitive",
      "Present Participle",
      "Finite verb"
    ],
    correctAnswer: 1,
    explanation: "'Go' is a Bare Infinitive governed by the causative verb 'let'.",
    explanationBn: "'Let'-এর পর 'go' হলো Bare Infinitive।"
  },
  {
    id: "q19",
    question: "Which of the following represents a PERFECT PASSIVE INFINITIVE?",
    options: [
      "to be informed",
      "to have been informed",
      "to have informed",
      "to be informing"
    ],
    correctAnswer: 1,
    explanation: "'To have been + V3 (informed)' is the Perfect Passive Infinitive (e.g. 'He expected to have been informed earlier').",
    explanationBn: "'To have been informed' হলো Perfect Passive Infinitive।"
  },
  {
    id: "q20",
    question: "Select the sentence with INCORRECT infinitive usage:",
    options: [
      "You had better consult a specialist.",
      "You had better to consult a specialist.",
      "I would rather starve than beg.",
      "She bade him leave the room."
    ],
    correctAnswer: 1,
    explanation: "'Had better' MUST take a bare infinitive. 'Had better to consult' is an error.",
    explanationBn: "'Had better'-এর পর 'to' বসানো মারাত্মক ভুল; শুদ্ধ রূপ: 'had better consult'।"
  },
  {
    id: "q21",
    question: "What is the function of the infinitive in: 'This water is not fit to drink'?",
    options: [
      "Adverb modifying the adjective 'fit'",
      "Noun subject",
      "Direct object",
      "Prepositional object"
    ],
    correctAnswer: 0,
    explanation: "'To drink' modifies the predicate adjective 'fit' (specifying in what respect it is fit), functioning as an Adverbial Infinitive.",
    explanationBn: "'To drink' Adjective 'fit'-কে মডিফাই করায় Adverbial Infinitive হিসেবে কাজ করছে।"
  },
  {
    id: "q22",
    question: "Convert 'He was so tired that he could not work' using 'too... to':",
    options: [
      "He was too tired to work.",
      "He was too tired to not work.",
      "He was too tired that he worked.",
      "He was tired enough to work."
    ],
    correctAnswer: 0,
    explanation: "'So tired that he could not work' converts cleanly into 'too tired to work'.",
    explanationBn: "'He was too tired to work' সঠিক রূপান্তর।"
  },
  {
    id: "q23",
    question: "Identify the causative verb that allows BOTH bare infinitive and to-infinitive in modern English:",
    options: [
      "Make",
      "Let",
      "Help",
      "Bid"
    ],
    correctAnswer: 2,
    explanation: "'Help' can take either a bare infinitive ('She helped me pack') or a full to-infinitive ('She helped me to pack') in standard English.",
    explanationBn: "'Help' ক্রিয়ার পর Bare Infinitive ('help me pack') অথবা To-Infinitive ('help me to pack') উভয়ই ব্যাকরণসম্মত।"
  },
  {
    id: "q24",
    question: "Why is 'She made me to laugh' incorrect in English?",
    options: [
      "Because 'made' in active voice is a causative verb that requires a bare infinitive ('made me laugh').",
      "Because 'laugh' is an irregular verb.",
      "Because 'me' should be 'I'.",
      "Because 'laugh' cannot be an infinitive."
    ],
    correctAnswer: 0,
    explanation: "Causative 'make' in active voice takes a bare infinitive without 'to'.",
    explanationBn: "Active Voice-এ Causative 'make'-এর সাথে 'to' বসে না; 'made me laugh' সঠিক।"
  },
  {
    id: "q25",
    question: "What is the passive form of 'I saw him pick up the wallet'?",
    options: [
      "He was seen pick up the wallet by me.",
      "He was seen TO pick up the wallet by me.",
      "He was seen picked up the wallet.",
      "He was saw to pick up the wallet."
    ],
    correctAnswer: 1,
    explanation: "When sensory verbs taking bare infinitives in active voice are converted into the passive, the infinitive acquires 'TO': 'He was seen TO pick up the wallet'.",
    explanationBn: "Sensory Verb-এর Active Bare Infinitive Passive-এ পরিবর্তিত হলে 'to' যুক্ত হয়: 'was seen TO pick up'।"
  }
];

export default questions;
