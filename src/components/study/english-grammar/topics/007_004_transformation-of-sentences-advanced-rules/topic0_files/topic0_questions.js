// topic0_questions.js - Module 007_004: Advanced Sentence Transformation & Structural Interchange
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Transform into a COMPLEX SENTENCE by removing 'Too...to': 'He is too frail to undertake this arduous expedition.'",
    options: [
      "He is so frail that he cannot undertake this arduous expedition.",
      "He is very frail and cannot undertake this arduous expedition.",
      "Because he is frail, he will not undertake this expedition.",
      "Being frail, he cannot undertake this arduous expedition."
    ],
    correctAnswer: "He is so frail that he cannot undertake this arduous expedition.",
    explanation: "The standard transformation formula for 'too + Adj + to + V' in the present tense is 'so + Adj + that + Subject + cannot + V', creating a Complex sentence.",
    explanationBn: "'Too... to'-কে রূপান্তরের সাধারণ নিয়ম হলো 'so + Adj + that + Subject + cannot + V1', যা একটি Complex Sentence গঠন করে।"
  },
  {
    id: 2,
    question: "Transform into a NEGATIVE SENTENCE without altering meaning: 'All human beings are mortal.'",
    options: [
      "No human being is immortal.",
      "All human beings are not mortal.",
      "Human beings cannot live forever.",
      "There is no human being who is not mortal."
    ],
    correctAnswer: "No human being is immortal.",
    explanation: "Affirmative universal statements ('All X are Y') transform into negative statements by using the antonym of the predicate adjective ('No X is non-Y' -> 'No human being is immortal').",
    explanationBn: "অর্থের পরিবর্তন না করে Affirmative-কে Negative করতে বিপরীতার্থক শব্দ (antonym: mortal -> immortal) এবং 'No' ব্যবহার করা হয়।"
  },
  {
    id: 3,
    question: "Transform using 'No sooner... than': 'As soon as the judge entered the courtroom, everyone stood up in respect.'",
    options: [
      "No sooner did the judge enter the courtroom than everyone stood up in respect.",
      "No sooner did the judge entered the courtroom when everyone stood up in respect.",
      "No sooner the judge entered the courtroom than everyone stood up in respect.",
      "No sooner had the judge enter the courtroom then everyone stood up in respect."
    ],
    correctAnswer: "No sooner did the judge enter the courtroom than everyone stood up in respect.",
    explanation: "'No sooner' triggers negative auxiliary inversion ('No sooner did the judge enter...') and strictly pairs with the correlative conjunction 'than'.",
    explanationBn: "'No sooner did + Subject + V1... than' ব্যাকরণগতভাবে সঠিক ইনভার্সন ও কোরিলেটিভ রূপ।"
  },
  {
    id: 4,
    question: "Transform using 'Hardly... when': 'As soon as the whistle blew, the sprinters dashed forward.'",
    options: [
      "Hardly had the whistle blown when the sprinters dashed forward.",
      "Hardly did the whistle blow than the sprinters dashed forward.",
      "Hardly the whistle had blown when the sprinters dashed forward.",
      "Hardly had the whistle blown then the sprinters dashed forward."
    ],
    correctAnswer: "Hardly had the whistle blown when the sprinters dashed forward.",
    explanation: "'Hardly' triggers auxiliary inversion ('Hardly had + Subject + V3...') and strictly pairs with 'when'.",
    explanationBn: "'Hardly had + Subject + V3... when' হলো ইনভার্সনের সঠিক রূপ।"
  },
  {
    id: 5,
    question: "Transform into an ASSERTIVE SENTENCE: 'Who does not know the great William Shakespeare?'",
    options: [
      "Everyone knows the great William Shakespeare.",
      "No one knows the great William Shakespeare.",
      "Someone knows the great William Shakespeare.",
      "William Shakespeare is known by many people."
    ],
    correctAnswer: "Everyone knows the great William Shakespeare.",
    explanation: "Rhetorical questions starting with 'Who does not...?' transform into universal affirmative assertive statements starting with 'Everyone / Everybody...'.",
    explanationBn: "'Who does not...?' দিয়ে গঠিত অলঙ্কারিক প্রশ্নবাচক বাক্যকে Assertive করতে 'Everyone / Everybody knows...' ব্যবহার করতে হয়।"
  },
  {
    id: 6,
    question: "Transform into an EXCLAMATORY SENTENCE: 'It is a very astonishing and magnificent discovery.'",
    options: [
      "What an astonishing and magnificent discovery it is!",
      "How an astonishing and magnificent discovery it is!",
      "What a discovery that is astonishing and magnificent!",
      "How astonishing discovery it is!"
    ],
    correctAnswer: "What an astonishing and magnificent discovery it is!",
    explanation: "When modifying a noun phrase with an indefinite article ('a very magnificent discovery'), the exclamatory form begins with 'What a/an + Adj + Noun + Subject + Verb!'.",
    explanationBn: "Noun Phrase থাকলে 'What a/an + Adj + Noun + Subject + Verb!' দিয়ে Exclamatory বাক্য গঠিত হয়।"
  },
  {
    id: 7,
    question: "Transform into an ASSERTIVE SENTENCE: 'How sweet the moonlight sleeps upon this bank!'",
    options: [
      "The moonlight sleeps very sweetly upon this bank.",
      "The moonlight does not sleep sweet upon this bank.",
      "Does the moonlight sleep sweetly upon this bank?",
      "Sweet moonlight is sleeping upon this bank."
    ],
    correctAnswer: "The moonlight sleeps very sweetly upon this bank.",
    explanation: "'How + Adjective/Adverb' transforms into 'very + Adjective/Adverb' in the affirmative assertive structure.",
    explanationBn: "'How sweet...!' Assertive বাক্যে 'very sweetly'-তে রূপান্তরিত হয়।"
  },
  {
    id: 8,
    question: "Transform using 'Unless': 'If you do not attend the laboratory sessions regularly, you will not be permitted to sit for the finals.'",
    options: [
      "Unless you attend the laboratory sessions regularly, you will not be permitted to sit for the finals.",
      "Unless you do not attend the laboratory sessions, you will be permitted.",
      "Unless you attend the laboratory sessions, you will be permitted to sit for finals.",
      "If unless you attend the laboratory sessions, you will not sit for finals."
    ],
    correctAnswer: "Unless you attend the laboratory sessions regularly, you will not be permitted to sit for the finals.",
    explanation: "'Unless' replaces 'If... not' in the conditional clause. Note: 'Unless' itself must not contain a negative word in its clause.",
    explanationBn: "'Unless' শব্দটি 'If... not'-এর পরিবর্তে বসে; 'unless'-এর ভেতরের ক্লজটিতে আর 'not' বসে না।"
  },
  {
    id: 9,
    question: "Transform from SIMPLE to COMPLEX: 'He admitted his guilt.'",
    options: [
      "He admitted that he was guilty.",
      "He was guilty and he admitted it.",
      "Being guilty, he admitted it.",
      "His guilt was admitted by him."
    ],
    correctAnswer: "He admitted that he was guilty.",
    explanation: "Expanding the noun phrase 'his guilt' into the subordinate noun clause 'that he was guilty' transforms the simple sentence into a Complex Sentence.",
    explanationBn: "Noun Phrase 'his guilt'-কে Subordinate Noun Clause 'that he was guilty'-তে সম্প্রসারিত করে Complex Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 10,
    question: "Transform from COMPLEX to SIMPLE: 'We hope that we shall win the championship.'",
    options: [
      "We hope to win the championship.",
      "We hope and we shall win the championship.",
      "Winning the championship is our hope and desire.",
      "That we shall win the championship is our hope."
    ],
    correctAnswer: "We hope to win the championship.",
    explanation: "Contracting the noun clause 'that we shall win...' into the infinitive phrase 'to win the championship' transforms the complex sentence into a concise Simple Sentence.",
    explanationBn: "Noun Clause-টিকে Infinitive 'to win'-এ সংকুচিত করে ১টি Finite Verb বিশিষ্ট Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 11,
    question: "Transform from SIMPLE to COMPOUND: 'Besides being an eminent surgeon, Dr. Roy is a generous philanthropist.'",
    options: [
      "Dr. Roy is not only an eminent surgeon but also a generous philanthropist.",
      "Although Dr. Roy is an eminent surgeon, he is a philanthropist.",
      "Dr. Roy being an eminent surgeon is also a philanthropist.",
      "Dr. Roy is an eminent surgeon who is a generous philanthropist."
    ],
    correctAnswer: "Dr. Roy is not only an eminent surgeon but also a generous philanthropist.",
    explanation: "Using the cumulative correlative conjunction 'not only... but also' coordinates the two independent clauses into a Compound Sentence.",
    explanationBn: "'Not only... but also' ব্যবহার করে দুটি সমমর্যাদার ক্লজযুক্ত Compound Sentence গঠন করা হয়েছে।"
  },
  {
    id: 12,
    question: "Transform from COMPOUND to COMPLEX: 'Work hard, and you will achieve success.'",
    options: [
      "If you work hard, you will achieve success.",
      "By working hard, you will achieve success.",
      "Working hard leads to success.",
      "You will achieve success because of your hard work."
    ],
    correctAnswer: "If you work hard, you will achieve success.",
    explanation: "Converting the first coordinating imperative clause into a conditional subordinate clause ('If you work hard...') yields a Complex Sentence.",
    explanationBn: "প্রথম স্বাধীন ক্লজটিকে 'If'-যুক্ত Subordinate Conditional Clause-এ রূপান্তর করে Complex Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 13,
    question: "Transform by replacing the NOUN 'agreement' with its VERB form: 'We arrived at an agreement on the terms of the treaty.'",
    options: [
      "We agreed on the terms of the treaty.",
      "We made an agree on the terms of the treaty.",
      "We were in agree with the terms of the treaty.",
      "The terms of the treaty were agreeable to us."
    ],
    correctAnswer: "We agreed on the terms of the treaty.",
    explanation: "The noun 'agreement' is replaced by its active verb form 'agreed', simplifying the predicate while preserving the exact meaning.",
    explanationBn: "Noun 'agreement'-কে Verb 'agreed'-এ রূপান্তর করে বাক্যের রূপান্তর সম্পন্ন করা হয়েছে।"
  },
  {
    id: 14,
    question: "Transform by replacing the ADJECTIVE 'careful' with its ADVERB form: 'She gave a careful examination to the microscopic specimen.'",
    options: [
      "She examined the microscopic specimen carefully.",
      "She did a carefully examination of the specimen.",
      "Her examination was done with care and carefully.",
      "Carefully she gave an examination to the specimen."
    ],
    correctAnswer: "She examined the microscopic specimen carefully.",
    explanation: "The adjective 'careful' becomes the adverb 'carefully', modifying the active verb 'examined'.",
    explanationBn: "Adjective 'careful'-কে Adverb 'carefully'-তে এবং Noun 'examination'-কে Verb 'examined'-এ রূপান্তর করা হয়েছে।"
  },
  {
    id: 15,
    question: "Transform into an AFFIRMATIVE SENTENCE: 'There is no smoke without fire.'",
    options: [
      "Where there is smoke, there is fire.",
      "Smoke always has fire inside it.",
      "Fire causes smoke to rise everywhere.",
      "Smoke and fire are always together."
    ],
    correctAnswer: "Where there is smoke, there is fire.",
    explanation: "The double negative proverb 'no smoke without fire' transforms affirmatively into the conditional/locative 'Where there is smoke, there is fire.'",
    explanationBn: "'Where there is smoke, there is fire' হলো 'There is no smoke without fire'-এর ইতিবাচক (Affirmative) রূপান্তর।"
  },
  {
    id: 16,
    question: "Transform into a NEGATIVE SENTENCE: 'As soon as he saw the tiger, he fled.'",
    options: [
      "No sooner did he see the tiger than he fled.",
      "He did not see the tiger and fled.",
      "He saw the tiger but did not flee.",
      "Unless he saw the tiger, he did not flee."
    ],
    correctAnswer: "No sooner did he see the tiger than he fled.",
    explanation: "'No sooner... than' is the direct negative equivalent of the affirmative 'As soon as'.",
    explanationBn: "'As soon as'-যুক্ত বাক্যকে Negative করতে 'No sooner did... than' ব্যবহৃত হয়।"
  },
  {
    id: 17,
    question: "Transform into an INTERROGATIVE SENTENCE: 'Their glory can never fade.'",
    options: [
      "Can their glory ever fade?",
      "Can their glory never fade?",
      "Why will their glory fade?",
      "Will their glory fade forever?"
    ],
    correctAnswer: "Can their glory ever fade?",
    explanation: "The negative assertive 'never' transforms into 'ever' in the rhetorical interrogative question.",
    explanationBn: "Assertive বাক্যের 'never' প্রশ্নবাচক (Interrogative) বাক্যে 'ever'-এ পরিবর্তিত হয়।"
  },
  {
    id: 18,
    question: "Transform into an ASSERTIVE SENTENCE: 'O that I were a bird!'",
    options: [
      "I wish that I were a bird.",
      "I am a bird in my imagination.",
      "Why am I not a bird?",
      "It is strange that I am a bird."
    ],
    correctAnswer: "I wish that I were a bird.",
    explanation: "The optative/exclamatory longing 'O that...!' or 'Would that...!' transforms into 'I wish that...' in the assertive form.",
    explanationBn: "'O that...!' বা 'Would that...!'-যুক্ত আকুল আকাঙ্ক্ষামূলক বাক্য Assertive-এ 'I wish that...'-এ রূপান্তর হয়।"
  },
  {
    id: 19,
    question: "Transform into a COMPLEX SENTENCE: 'He was too tired to walk another mile.'",
    options: [
      "He was so tired that he could not walk another mile.",
      "He was very tired and could not walk another mile.",
      "Being very tired, he could not walk another mile.",
      "In spite of his tiredness, he walked another mile."
    ],
    correctAnswer: "He was so tired that he could not walk another mile.",
    explanation: "Because the main verb is past tense ('was'), the 'that'-clause uses 'could not' ('so tired that he could not walk').",
    explanationBn: "অতীতকালের ক্ষেত্রে 'was' থাকায় 'so... that he COULD not' ব্যবহৃত হয়ে Complex Sentence গঠন করে।"
  },
  {
    id: 20,
    question: "Transform by replacing the VERB 'succeeded' with its NOUN form: 'He succeeded in all his business enterprises.'",
    options: [
      "He achieved success in all his business enterprises.",
      "He made a succeed in all his business enterprises.",
      "He was successful of all business enterprises.",
      "Success was being had by him in all enterprises."
    ],
    correctAnswer: "He achieved success in all his business enterprises.",
    explanation: "The verb 'succeeded' is converted into the abstract noun 'success' governed by the light verb 'achieved'.",
    explanationBn: "Verb 'succeeded'-কে Noun 'success'-এ রূপান্তর করে 'achieved success' লেখা হয়েছে।"
  },
  {
    id: 21,
    question: "Transform into a SIMPLE SENTENCE: 'He worked hard so that he might pass the test.'",
    options: [
      "He worked hard to pass the test.",
      "He worked hard and passed the test.",
      "Because he worked hard, he passed.",
      "Working hard, he was passing the test."
    ],
    correctAnswer: "He worked hard to pass the test.",
    explanation: "'So that he might pass' is an adverbial purpose clause, which is contracted into the infinitive phrase 'to pass the test' in a Simple Sentence.",
    explanationBn: "Complex বাক্যের Purpose Clause-টিকে Infinitive 'to pass'-এ সংকুচিত করে Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 22,
    question: "Transform from NEGATIVE to AFFIRMATIVE: 'He did not fail to attend every single lecture.'",
    options: [
      "He attended every single lecture without exception.",
      "He failed to attend some lectures.",
      "He never attended any single lecture.",
      "Did he attend every single lecture?"
    ],
    correctAnswer: "He attended every single lecture without exception.",
    explanation: "'Did not fail to attend' is a litotes / double negative meaning 'He attended diligently / without exception'.",
    explanationBn: "'Did not fail to attend' (উপস্থিত হতে ব্যর্থ হননি)-এর ইতিবাচক রূপান্তর হলো 'He attended... without exception'।"
  },
  {
    id: 23,
    question: "Transform into a COMPOUND SENTENCE: 'In spite of being punished, he repeated the offense.'",
    options: [
      "He was punished, yet he repeated the offense.",
      "Although he was punished, he repeated the offense.",
      "Being punished, he repeated the offense.",
      "Because he was punished, he repeated the offense."
    ],
    correctAnswer: "He was punished, yet he repeated the offense.",
    explanation: "'In spite of' (Simple) transforms into 'yet' or 'but' in a Compound Sentence. ('Although' is Complex).",
    explanationBn: "'In spite of' (Simple) বাক্যকে Compound করতে Coordinating Conjunction 'yet' বা 'but' ব্যবহার করা হয়।"
  },
  {
    id: 24,
    question: "Transform using 'Only': 'None but the brave deserve the fair.'",
    options: [
      "Only the brave deserve the fair.",
      "The brave only deserve the fair.",
      "Only brave people are deserving fair.",
      "All brave people only deserve fair."
    ],
    correctAnswer: "Only the brave deserve the fair.",
    explanation: "'None but' transforms directly into the affirmative limiter 'Only' ('Only the brave...').",
    explanationBn: "'None but' সরাসরি Affirmative 'Only'-তে রূপান্তরিত হয়।"
  },
  {
    id: 25,
    question: "What is the inviolable rule of Sentence Transformation in English grammar?",
    options: [
      "The structural form changes, but the original semantic meaning remains 100% identical.",
      "The meaning must change to fit the new grammatical form.",
      "You must always make the sentence longer.",
      "Transformation is only allowed for simple sentences."
    ],
    correctAnswer: "The structural form changes, but the original semantic meaning remains 100% identical.",
    explanation: "Transformation of sentences is the syntactic process of changing the grammatical form or pattern of a sentence without altering its core semantic meaning in the slightest degree.",
    explanationBn: "Transformation-এর একমাত্র অলঙ্ঘনীয় নিয়ম হলো: বাক্যের ব্যাকরণগত গঠন পরিবর্তিত হলেও মূল ভাব বা অর্থ ১০০% অপরিবর্তিত থাকবে।"
  }
];

export default questions;
