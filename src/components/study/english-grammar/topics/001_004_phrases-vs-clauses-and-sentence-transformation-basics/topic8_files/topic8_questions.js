// topic8_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 8: Classroom Transformation Clinic & Worked Drills
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "During a mentoring lab at Barrackpore, a student transformed 'As soon as the siren blew, the workers left' into *'No sooner had the siren blown when the workers left'*. What was Sukanta Sir's diagnostic correction?",
    options: [
      "The correlative conjunction for 'No sooner' is 'than', NEVER 'when': 'No sooner had the siren blown THAN the workers left.'",
      "Change 'workers' to 'workmen'.",
      "Change 'blown' to 'blew'.",
      "The student's sentence is completely correct in modern slang."
    ],
    correctAnswer: 0,
    explanation: "'No sooner' mandates the correlative conjunction 'than'. 'When' is used only with 'Hardly' or 'Scarcely'.",
    explanationBn: "'No sooner'-এর সাথে সর্বদা 'than' বসে ('when' বা 'then' নয়)। 'when' কেবল 'Hardly' বা 'Scarcely'-এর সাথে বসে।"
  },
  {
    id: 2,
    question: "A student converted 'He is too slow to win the race' into *'He is so slow that he cannot win the race'* for a present-tense prompt, and *'He was too slow to win the race'* into *'He was so slow that he cannot win the race'*. What error occurred in the second attempt?",
    options: [
      "Tense mismatch: past tense 'was' requires past modal 'could not', not present 'cannot': '...that he COULD NOT win the race.'",
      "'Slow' should be 'slowly'.",
      "'Race' should be plural.",
      "'Too' cannot be used with slow."
    ],
    correctAnswer: 0,
    explanation: "When the matrix verb is past ('was'), the subordinate clause modal must also be past ('could not'): 'He was so slow that he COULD NOT win the race.'",
    explanationBn: "মূল বাক্য Past Tense ('was')-এ থাকলে Subordinate Clause-এ 'could not' বসবে ('cannot' নয়)।"
  },
  {
    id: 3,
    question: "Transform 'Only honest citizens pay taxes regularly' into a negative sentence:",
    options: [
      "None but honest citizens pay taxes regularly.",
      "Nobody pays taxes regularly.",
      "Honest citizens do not pay taxes.",
      "Only not honest citizens pay taxes."
    ],
    correctAnswer: 0,
    explanation: "'Only' qualifying human beings ('honest citizens') transforms into 'None but': 'None but honest citizens pay taxes regularly.'",
    explanationBn: "ব্যক্তিবাচক ক্ষেত্রে 'Only'-এর জায়গায় 'None but' বসে।"
  },
  {
    id: 4,
    question: "Transform 'He gave me only a pen' into a negative sentence:",
    options: [
      "He gave me nothing but a pen.",
      "He gave me none but a pen.",
      "He did not give me a pen.",
      "He gave no pen to me."
    ],
    correctAnswer: 0,
    explanation: "'Only' qualifying an inanimate thing ('a pen') transforms into 'nothing but': 'He gave me nothing but a pen.'",
    explanationBn: "বস্তুবাচক ক্ষেত্রে 'Only' পরিবর্তিত হয়ে 'nothing but' হয়।"
  },
  {
    id: 5,
    question: "Transform 'Mount Everest is the highest peak in the world' into a POSITIVE DEGREE sentence:",
    options: [
      "No other peak in the world is as high as Mount Everest.",
      "Mount Everest is as high as any peak.",
      "Very few peaks in the world are as high as Mount Everest.",
      "Mount Everest is higher than no other peak."
    ],
    correctAnswer: 0,
    explanation: "'The highest' transforms into positive degree using 'No other + singular noun + is as...as': 'No other peak in the world is as high as Mount Everest.'",
    explanationBn: "'The highest' Superlative-এর Positive রূপ: 'No other peak ... is as high as Mount Everest'।"
  },
  {
    id: 6,
    question: "Transform 'Mount Everest is the highest peak in the world' into a COMPARATIVE DEGREE sentence:",
    options: [
      "Mount Everest is higher than any other peak in the world.",
      "Mount Everest is higher than some other peaks.",
      "No peak is higher than Mount Everest.",
      "Mount Everest is highest peak."
    ],
    correctAnswer: 0,
    explanation: "'The highest' transforms into comparative degree using 'higher than any other peak': 'Mount Everest is higher than any other peak in the world.'",
    explanationBn: "Comparative Degree রূপ: 'Mount Everest is higher than any other peak in the world'।"
  },
  {
    id: 7,
    question: "Transform 'Lead is heavier than all other metals' into SUPERLATIVE degree:",
    options: [
      "Lead is the heaviest of all metals.",
      "Lead is a very heavy metal.",
      "No metal is as heavy as lead.",
      "Lead is heaviest metal."
    ],
    correctAnswer: 0,
    explanation: "'Heavier than all other metals' transforms into 'Lead is the heaviest of all metals.'",
    explanationBn: "'Heavier than all other...' Superlative-এ 'Lead is the heaviest of all metals' হয়।"
  },
  {
    id: 8,
    question: "Transform 'Very few poets in India were as great as Rabindranath Tagore' into SUPERLATIVE degree:",
    options: [
      "Rabindranath Tagore was one of the greatest poets in India.",
      "Rabindranath Tagore was the greatest poet in India.",
      "Rabindranath Tagore was greater than all poets in India.",
      "Tagore was a great poet in India."
    ],
    correctAnswer: 0,
    explanation: "'Very few...as great as' transforms into 'one of the greatest + plural noun': 'Rabindranath Tagore was one of the greatest poets in India.'",
    explanationBn: "'Very few...as great as'-এর Superlative রূপ হলো: 'Rabindranath Tagore was one of the greatest poets in India'।"
  },
  {
    id: 9,
    question: "Transform 'Rabindranath Tagore was one of the greatest poets in India' into COMPARATIVE degree:",
    options: [
      "Rabindranath Tagore was greater than most other poets in India.",
      "Rabindranath Tagore was greater than any other poet in India.",
      "No other poet was greater than Tagore.",
      "Tagore was greater of all poets."
    ],
    correctAnswer: 0,
    explanation: "'One of the greatest' transforms into comparative using 'greater than most other + plural noun': 'Rabindranath Tagore was greater than most other poets in India.'",
    explanationBn: "'One of the greatest'-এর Comparative রূপ: 'greater than most other poets'।"
  },
  {
    id: 10,
    question: "Transform 'Nobody will deny his immense contribution to science' into an AFFIRMATIVE sentence:",
    options: [
      "Everybody will admit his immense contribution to science.",
      "Somebody will deny his contribution.",
      "Nobody will admit his contribution.",
      "Will anybody deny his contribution?"
    ],
    correctAnswer: 0,
    explanation: "'Nobody will deny' transforms affirmatively into 'Everybody will admit'.",
    explanationBn: "'Nobody will deny'-এর Affirmative রূপ হলো 'Everybody will admit'।"
  },
  {
    id: 11,
    question: "Transform 'Every patriot loves his motherland' into a NEGATIVE sentence without changing meaning:",
    options: [
      "There is no patriot but loves his motherland.",
      "No patriot loves his motherland.",
      "Every patriot does not love motherland.",
      "Patriots love not motherland."
    ],
    correctAnswer: 0,
    explanation: "'Every + Noun' transforms into 'There is no + Noun + but + Verb': 'There is no patriot but loves his motherland.'",
    explanationBn: "'Every + Noun' রূপান্তর হয়ে 'There is no ... but ...' হয়।"
  },
  {
    id: 12,
    question: "Transform 'You must work hard to achieve success' using 'cannot but':",
    options: [
      "You cannot but work hard to achieve success.",
      "You cannot help work hard.",
      "You cannot work hard to achieve success.",
      "You must not work hard."
    ],
    correctAnswer: 0,
    explanation: "'Must' transforms into 'cannot but + bare infinitive': 'You cannot but work hard to achieve success.'",
    explanationBn: "'Must' পরিবর্তিত হয়ে 'cannot but + Base Verb' হয়।"
  },
  {
    id: 13,
    question: "Transform 'He is not only a brilliant coder but also an inspiring teacher' into a simple sentence with 'Besides':",
    options: [
      "Besides being a brilliant coder, he is an inspiring teacher.",
      "Being a coder he is a teacher.",
      "He is a coder and teacher.",
      "Besides he codes, he teaches."
    ],
    correctAnswer: 0,
    explanation: "'Not only...but also' converts to a simple sentence with preposition 'Besides + gerund (being)': 'Besides being a brilliant coder, he is an inspiring teacher.'",
    explanationBn: "'Not only...but also' Simple Sentence-এ 'Besides being...' কাঠামোতে রূপান্তরিত হয়।"
  },
  {
    id: 14,
    question: "Transform 'In spite of working late into the night, Swadeep felt energetic in the morning' into a COMPOUND sentence:",
    options: [
      "Swadeep worked late into the night, yet he felt energetic in the morning.",
      "Although Swadeep worked late, he felt energetic.",
      "Because Swadeep worked late, he felt energetic.",
      "Working late, Swadeep felt energetic."
    ],
    correctAnswer: 0,
    explanation: "'In spite of' transforms into a compound sentence using the adversative coordinating conjunction 'yet' or 'but': 'Swadeep worked late into the night, yet he felt energetic in the morning.'",
    explanationBn: "'In spite of' Compound Sentence-এ Adversative Conjunction 'yet' বা 'but' দ্বারা যুক্ত হয়।"
  },
  {
    id: 15,
    question: "Transform the same sentence 'In spite of working late into the night, Swadeep felt energetic in the morning' into a COMPLEX sentence:",
    options: [
      "Although Swadeep worked late into the night, he felt energetic in the morning.",
      "Swadeep worked late, and he felt energetic.",
      "Swadeep felt energetic because he worked late.",
      "Working late into the night was energetic."
    ],
    correctAnswer: 0,
    explanation: "'In spite of' transforms into a complex sentence using the subordinating conjunction 'Although': 'Although Swadeep worked late into the night, he felt energetic in the morning.'",
    explanationBn: "'In spite of' Complex Sentence-এ 'Although / Though' দ্বারা রূপান্তর করা হয়।"
  },
  {
    id: 16,
    question: "Transform 'He was too proud to apologize for his misconduct' into a complex sentence:",
    options: [
      "He was so proud that he would not apologize for his misconduct.",
      "He was so proud that he cannot apologize.",
      "He was very proud to apologize.",
      "He apologized not because of pride."
    ],
    correctAnswer: 0,
    explanation: "Past tense 'was too proud to...' transforms into 'so proud that he WOULD NOT / COULD NOT apologize': 'He was so proud that he would not apologize...'.",
    explanationBn: "Past Tense-এ 'was too proud to' পরিবর্তিত হয়ে 'so proud that he would not / could not apologize' হয়।"
  },
  {
    id: 17,
    question: "Transform 'How dare you enter the examination hall without an admit card!' into an ASSERTIVE sentence:",
    options: [
      "You have no right / should not dare to enter the examination hall without an admit card.",
      "Enter the examination hall without admit card.",
      "Did you enter the examination hall?",
      "Entering the hall without admit card is permitted."
    ],
    correctAnswer: 0,
    explanation: "'How dare you...!' translates assertively into the severe reprimand 'You have no right / should not dare to enter...'.",
    explanationBn: "'How dare you...!' Assertive-এ 'You have no right / should not dare to...' রূপ নেয়।"
  },
  {
    id: 18,
    question: "Transform 'Who does not know that honesty is the best policy?' into an ASSERTIVE sentence:",
    options: [
      "Everyone knows that honesty is the best policy.",
      "Nobody knows that honesty is the best policy.",
      "Does anyone know honesty is the best policy?",
      "Honesty is known by all."
    ],
    correctAnswer: 0,
    explanation: "Negative rhetorical question 'Who does not know...?' converts into universal affirmative 'Everyone knows that honesty is the best policy.'",
    explanationBn: "'Who does not know...?' Assertive-এ 'Everyone knows...' হয়।"
  },
  {
    id: 19,
    question: "Transform 'Can anyone count the stars in the night sky?' into an ASSERTIVE sentence:",
    options: [
      "No one can count the stars in the night sky.",
      "Everyone can count the stars in the night sky.",
      "Someone counts stars in the night sky.",
      "Count the stars in the sky."
    ],
    correctAnswer: 0,
    explanation: "Positive rhetorical question 'Can anyone count...?' implies the impossibility 'No one / Nobody can count...'.",
    explanationBn: "'Can anyone count...?' Assertive-এ 'No one can count...' হয়।"
  },
  {
    id: 20,
    question: "Transform 'What a dreadful storm struck the coastal district!' into an ASSERTIVE sentence:",
    options: [
      "A very dreadful storm struck the coastal district.",
      "Was the storm dreadful?",
      "The storm was not dreadful.",
      "How dreadful storm struck."
    ],
    correctAnswer: 0,
    explanation: "'What a dreadful storm...' transforms into 'A very dreadful storm struck the coastal district.'",
    explanationBn: "'What a dreadful storm...' Assertive-এ 'A very dreadful storm struck...' হয়।"
  },
  {
    id: 21,
    question: "Transform 'If only I had saved that critical source file before the crash!' into an ASSERTIVE sentence:",
    options: [
      "I earnestly wish that I had saved that critical source file before the crash.",
      "I saved the source file before the crash.",
      "Did I save the source file?",
      "Save the source file before crash."
    ],
    correctAnswer: 0,
    explanation: "'If only I had...' transforms into 'I earnestly / deeply wish that I had saved...'.",
    explanationBn: "'If only I had...' Assertive-এ 'I earnestly wish that I had...' হয়।"
  },
  {
    id: 22,
    question: "Transform 'May success attend all your sincere endeavors!' into an ASSERTIVE sentence:",
    options: [
      "I pray / wish that success may attend all your sincere endeavors.",
      "Success attends all your endeavors.",
      "Will success attend your endeavors?",
      "Attend your endeavors with success."
    ],
    correctAnswer: 0,
    explanation: "Optative 'May success attend...' transforms assertively into 'I pray/wish that success may attend...'.",
    explanationBn: "Optative বাক্য Assertive-এ 'I pray / wish that success may attend...' হয়।"
  },
  {
    id: 23,
    question: "Transform 'He was absent from the meeting' into a NEGATIVE sentence using the verb 'attend':",
    options: [
      "He did not attend the meeting.",
      "He attended not the meeting.",
      "He was not attending never the meeting.",
      "Did he not attend the meeting?"
    ],
    correctAnswer: 0,
    explanation: "'He was absent' transforms into 'He did not attend the meeting' (using the negative auxiliary 'did not' + antonymous action verb 'attend').",
    explanationBn: "'He was absent'-কে 'attend' Verb দিয়ে Negative করলে দাঁড়ায়: 'He did not attend the meeting'।"
  },
  {
    id: 24,
    question: "Transform 'No sooner had the sun risen than the birds began to chirp' using 'Hardly':",
    options: [
      "Hardly had the sun risen when the birds began to chirp.",
      "Hardly did the sun rise than the birds began to chirp.",
      "Hardly the sun rose when birds began to chirp.",
      "Hardly had the sun risen then the birds began to chirp."
    ],
    correctAnswer: 0,
    explanation: "'Hardly had + Subject + V3 ... WHEN ...' is the exact correlative equivalent of 'No sooner had ... than'.",
    explanationBn: "'Hardly had ... when ...' হলো 'No sooner had ... than ...'-এর যথাযথ সমার্থক কাঠামো।"
  },
  {
    id: 25,
    question: "What is the key diagnostic checkpoint to verify when finishing any sentence transformation drill?",
    options: [
      "Verify that: 1. The original meaning is 100% intact, 2. The tense has not shifted, 3. The requested target structure is strictly adhered to, 4. Punctuation matches the target sentence type.",
      "Count the number of consonants.",
      "Make sure the sentence ends with an exclamation mark.",
      "Ensure the sentence contains the word 'because'."
    ],
    correctAnswer: 0,
    explanation: "A master grammar student always runs the 4-point diagnostic audit: meaning fidelity, tense consistency, structural compliance, and immaculate punctuation.",
    explanationBn: "Transformation সম্পন্ন করার পর ৪টি বিষয় যাচাই করতে হয়: ১. মূল অর্থ অক্ষুণ্ণ আছে কিনা, ২. Tense ঠিক আছে কিনা, ৩. কাঙ্ক্ষিত কাঠামো মেনে চলা হয়েছে কিনা, এবং ৪. যতিচিহ্ন (Punctuation) যথাযথ কিনা।"
  }
];

export default questions;
