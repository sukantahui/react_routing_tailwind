// topic6_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 6: Assertive ↔ Interrogative Rhetorical Transformation
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the core polarity rule when transforming an Assertive statement into an Interrogative Rhetorical question?",
    options: [
      "Affirmative Assertive becomes Negative Interrogative; Negative Assertive becomes Positive Interrogative.",
      "Both must always be affirmative.",
      "Both must always be negative.",
      "Interrogative sentences cannot be rhetorical."
    ],
    correctAnswer: 0,
    explanation: "To preserve identical semantic assertion, positive statements require negative rhetorical questions ('Everyone knows' -> 'Who does not know?'), while negative statements require positive rhetorical questions ('Nobody can' -> 'Who can?').",
    explanationBn: "অর্থ অপরিবর্তিত রাখতে হ্যাঁ-বোধক বিবৃতি না-বোধক Rhetorical প্রশ্নে এবং না-বোধক বিবৃতি হ্যাঁ-বোধক Rhetorical প্রশ্নে রূপান্তরিত হয়।"
  },
  {
    id: 2,
    question: "Transform 'Everyone loves motherland' into an interrogative rhetorical sentence:",
    options: [
      "Who does not love motherland?",
      "Does everyone love motherland?",
      "Why does everyone love motherland?",
      "Who loves motherland?"
    ],
    correctAnswer: 0,
    explanation: "'Everyone / Everybody' converts into 'Who does not + Base Verb...?': 'Who does not love motherland?'",
    explanationBn: "'Everyone / Everybody' রূপান্তরিত হয়ে 'Who does not...?' হয়।"
  },
  {
    id: 3,
    question: "Transform 'Nobody can escape death' into an interrogative rhetorical sentence:",
    options: [
      "Who can escape death?",
      "Can nobody escape death?",
      "Why can nobody escape death?",
      "Who cannot escape death?"
    ],
    correctAnswer: 0,
    explanation: "'Nobody / No one' converts into positive 'Who can + Verb...?': 'Who can escape death?'",
    explanationBn: "'Nobody / No one' রূপান্তরিত হয়ে 'Who can...?' হয়।"
  },
  {
    id: 4,
    question: "Transform 'Their glory can never fade' into an interrogative rhetorical sentence:",
    options: [
      "When can their glory fade?",
      "Can their glory never fade?",
      "Why can their glory fade?",
      "How their glory can fade?"
    ],
    correctAnswer: 0,
    explanation: "'Never' in an assertive sentence converts into 'When can...?' (or 'Can...ever...?'): 'When can their glory fade?' or 'Can their glory ever fade?'.",
    explanationBn: "'Never' যুক্ত বাক্য 'When can...?' বা 'Can...ever...?' রূপ নেয়।"
  },
  {
    id: 5,
    question: "Transform 'There is no use in crying over spilt milk' into an interrogative sentence:",
    options: [
      "What is the use of crying over spilt milk?",
      "Why is there crying over spilt milk?",
      "Is there use in crying over spilt milk?",
      "Who cries over spilt milk?"
    ],
    correctAnswer: 0,
    explanation: "'There is no use in...' transforms into the classic rhetorical question 'What is the use of...?' (or 'Why cry over...?').",
    explanationBn: "'There is no use in...' রূপান্তরিত হয়ে 'What is the use of...?' হয়।"
  },
  {
    id: 6,
    question: "Transform 'Blood is thicker than water' into an interrogative rhetorical sentence:",
    options: [
      "Is not blood thicker than water?",
      "Is blood thicker than water?",
      "Why is blood water?",
      "How is blood thicker than water?"
    ],
    correctAnswer: 0,
    explanation: "A positive universal truth transforms into a contracted negative interrogative: 'Is not blood thicker than water?' / 'Isn't blood thicker than water?'.",
    explanationBn: "হ্যাঁ-বোধক সার্বজনীন সত্য Negative Interrogative-এ রূপান্তরিত হয়: 'Isn't blood thicker than water?'"
  },
  {
    id: 7,
    question: "Transform 'You cannot expect gratitude from an ungrateful person' into an interrogative sentence:",
    options: [
      "Can you expect gratitude from an ungrateful person?",
      "Cannot you expect gratitude?",
      "Why do you expect gratitude?",
      "Who expects gratitude?"
    ],
    correctAnswer: 0,
    explanation: "A negative assertion ('cannot expect') transforms into a positive rhetorical question: 'Can you expect gratitude from an ungrateful person?'.",
    explanationBn: "না-বোধক বক্তব্য 'cannot expect' Positive প্রশ্নে রূপান্তরিত হয়ে 'Can you expect...?' হয়।"
  },
  {
    id: 8,
    question: "Transform 'It does not matter if we fail this sprint once' into an interrogative sentence:",
    options: [
      "What though we fail this sprint once?",
      "Does it matter if we fail?",
      "Why did we fail this sprint?",
      "When do we fail this sprint?"
    ],
    correctAnswer: 0,
    explanation: "'It does not matter if / though...' transforms into the idiomatic rhetorical inquiry 'What though...?' or 'What does it matter if...?'.",
    explanationBn: "'It does not matter if/though...' বাগধারাটি 'What though...?' রূপ নেয়।"
  },
  {
    id: 9,
    question: "Transform 'Friendship is nothing but an empty name' into an interrogative sentence:",
    options: [
      "What is friendship but an empty name?",
      "Is friendship an empty name?",
      "Why is friendship an empty name?",
      "Who names friendship?"
    ],
    correctAnswer: 0,
    explanation: "'A is nothing but B' transforms into 'What is A but B?': 'What is friendship but an empty name?'",
    explanationBn: "'Nothing but' যুক্ত বাক্য Interrogative-এ 'What is ... but ...?' কাঠামো ধারণ করে।"
  },
  {
    id: 10,
    question: "Transform 'Nowhere in Bengal will you find such historic terracotta temples' into an interrogative sentence:",
    options: [
      "Where in Bengal will you find such historic terracotta temples?",
      "Will you find historic temples nowhere?",
      "Can you find historic temples in Bengal?",
      "Why are historic temples in Bengal?"
    ],
    correctAnswer: 0,
    explanation: "'Nowhere' converts into 'Where': 'Where in Bengal will you find such historic terracotta temples?'.",
    explanationBn: "'Nowhere' রূপান্তরিত হয়ে 'Where will you find...?' হয়।"
  },
  {
    id: 11,
    question: "Transform 'We can never repay our parents' selfless sacrifice' into an interrogative sentence:",
    options: [
      "Can we ever repay our parents' selfless sacrifice?",
      "Can we never repay our parents' sacrifice?",
      "Why do we repay our parents' sacrifice?",
      "Who repays parents' sacrifice?"
    ],
    correctAnswer: 0,
    explanation: "'Never' converts into 'ever' with auxiliary inversion: 'Can we ever repay our parents' selfless sacrifice?'.",
    explanationBn: "'Never' পরিবর্তিত হয়ে 'ever' হয়: 'Can we ever repay...?'"
  },
  {
    id: 12,
    question: "Transform the rhetorical question 'Who does not wish to be happy in life?' into an ASSERTIVE sentence:",
    options: [
      "Everyone wishes to be happy in life.",
      "Nobody wishes to be happy in life.",
      "Someone wishes to be happy.",
      "Do people wish to be happy?"
    ],
    correctAnswer: 0,
    explanation: "'Who does not wish...?' converts into the universal affirmative assertion 'Everyone wishes to be happy in life.'",
    explanationBn: "'Who does not wish...?' Assertive-এ রূপান্তরিত হয়ে 'Everyone wishes...' হয়।"
  },
  {
    id: 13,
    question: "Transform the rhetorical question 'Who can touch the blue sky with bare hands?' into an ASSERTIVE sentence:",
    options: [
      "No one can touch the blue sky with bare hands.",
      "Everyone can touch the blue sky.",
      "Someone can touch the blue sky.",
      "Touch the blue sky if you can."
    ],
    correctAnswer: 0,
    explanation: "'Who can touch...?' asserts the impossibility of the action, converting into 'No one / Nobody can touch...'.",
    explanationBn: "'Who can touch...?' অসম্ভবতা নির্দেশ করে Assertive-এ 'No one can touch...' রূপ নেয়।"
  },
  {
    id: 14,
    question: "Transform 'Can a leopard change its spots?' into an ASSERTIVE sentence:",
    options: [
      "A leopard cannot change its spots.",
      "A leopard can change its spots.",
      "A leopard always changes spots.",
      "Leopards change spots."
    ],
    correctAnswer: 0,
    explanation: "The positive rhetorical question implies the negative assertion 'A leopard cannot change its spots.'",
    explanationBn: "'Can a leopard...?' Assertive-এ 'A leopard cannot change its spots' হয়।"
  },
  {
    id: 15,
    question: "Transform 'Is this the proper way to treat an esteemed mentor?' into an ASSERTIVE sentence:",
    options: [
      "This is not the proper way to treat an esteemed mentor.",
      "This is the proper way to treat an esteemed mentor.",
      "Treat an esteemed mentor properly.",
      "Why treat a mentor this way?"
    ],
    correctAnswer: 0,
    explanation: "The positive question transforms into the reproachful negative assertion 'This is not the proper way to treat an esteemed mentor.'",
    explanationBn: "'Is this the proper way...?' রূপান্তরিত হয়ে 'This is not the proper way...' হয়।"
  },
  {
    id: 16,
    question: "Transform 'Is there any man who does not make mistakes?' into an ASSERTIVE sentence:",
    options: [
      "There is no man who does not make mistakes / Every man makes mistakes.",
      "Every man does not make mistakes.",
      "No man makes mistakes.",
      "Mistakes are made by no man."
    ],
    correctAnswer: 0,
    explanation: "'Is there any man who does not...?' transforms into 'Every man makes mistakes' or 'There is no man but makes mistakes'.",
    explanationBn: "'Is there any man who does not...?' Assertive-এ 'Every man makes mistakes' রূপ নেয়।"
  },
  {
    id: 17,
    question: "Transform 'What is the point of learning syntax if you do not write code?' into an ASSERTIVE sentence:",
    options: [
      "There is no point in learning syntax if you do not write code.",
      "There is some point in learning syntax.",
      "Learning syntax is very pointed.",
      "Write code after learning syntax."
    ],
    correctAnswer: 0,
    explanation: "'What is the point of...' transforms assertively into 'There is no point in...'.",
    explanationBn: "'What is the point of...' Assertive-এ 'There is no point in...' হয়।"
  },
  {
    id: 18,
    question: "Transform 'Honesty is the best policy' into an interrogative rhetorical sentence:",
    options: [
      "Is not honesty the best policy?",
      "Is honesty the best policy?",
      "Why is honesty policy?",
      "Who says honesty is best?"
    ],
    correctAnswer: 0,
    explanation: "Positive statement transforms into negative interrogative: 'Is not honesty the best policy?' / 'Isn't honesty the best policy?'.",
    explanationBn: "'Honesty is the best policy'-এর Interrogative রূপ: 'Isn't honesty the best policy?'"
  },
  {
    id: 19,
    question: "Transform 'Nothing can be accomplished without sincere effort' into an interrogative sentence:",
    options: [
      "Can anything be accomplished without sincere effort?",
      "Can nothing be accomplished without effort?",
      "Why can nothing be accomplished?",
      "What can be accomplished with effort?"
    ],
    correctAnswer: 0,
    explanation: "'Nothing' transforms into 'anything' in positive interrogative syntax: 'Can anything be accomplished without sincere effort?'.",
    explanationBn: "'Nothing' পরিবর্তিত হয়ে 'Can anything be accomplished...?' হয়।"
  },
  {
    id: 20,
    question: "Transform 'Everyone has heard of Rabindranath Tagore' into an interrogative sentence:",
    options: [
      "Who has not heard of Rabindranath Tagore?",
      "Has everyone heard of Rabindranath Tagore?",
      "Why has everyone heard of Tagore?",
      "Who heard of Tagore?"
    ],
    correctAnswer: 0,
    explanation: "'Everyone has heard...' transforms into 'Who has not heard of Rabindranath Tagore?'.",
    explanationBn: "'Everyone has heard...' রূপান্তরিত হয়ে 'Who has not heard of...?' হয়।"
  },
  {
    id: 21,
    question: "Transform 'Shall I ever forget those inspiring lectures at Barrackpore?' into an ASSERTIVE sentence:",
    options: [
      "I shall never forget those inspiring lectures at Barrackpore.",
      "I shall always forget those lectures.",
      "I can forget those lectures.",
      "Never forget those lectures."
    ],
    correctAnswer: 0,
    explanation: "'Shall I ever forget...?' transforms into 'I shall never forget...'.",
    explanationBn: "'Shall I ever forget...?' Assertive-এ 'I shall never forget...' হয়।"
  },
  {
    id: 22,
    question: "Transform 'No one can doubt his supreme intellectual integrity' into an interrogative sentence:",
    options: [
      "Who can doubt his supreme intellectual integrity?",
      "Can no one doubt his integrity?",
      "Why can no one doubt his integrity?",
      "Who cannot doubt his integrity?"
    ],
    correctAnswer: 0,
    explanation: "'No one can doubt...' transforms into 'Who can doubt his supreme intellectual integrity?'.",
    explanationBn: "'No one can doubt...' রূপান্তরিত হয়ে 'Who can doubt...?' হয়।"
  },
  {
    id: 23,
    question: "What is the primary rhetorical effect of transforming an assertive statement into a rhetorical question in speech or debate?",
    options: [
      "It directly challenges the listener, elevates dramatic tension, and makes the assertion appear undeniable and self-evident.",
      "It makes the statement uncertain.",
      "It asks the listener for homework answers.",
      "It removes all punctuation."
    ],
    correctAnswer: 0,
    explanation: "Rhetorical questions engage the audience actively by compelling them to formulate the inevitable affirmative conclusion in their own minds.",
    explanationBn: "Rhetorical প্রশ্ন শ্রোতাকে মানসিকভাবে সক্রিয় করে তোলে এবং বক্তব্যকে অকাট্য ও স্বতঃসিদ্ধ সত্য হিসেবে উপস্থাপন করে।"
  },
  {
    id: 24,
    question: "Which of the following transformations represents an ERROR in rhetorical inversion?",
    options: [
      "Assertive: 'He is a great scholar.' ===> Interrogative: 'Is he a great scholar?' (Error: lacks negative polarity)",
      "Assertive: 'He is a great scholar.' ===> Interrogative: 'Isn't he a great scholar?' (Correct)",
      "Assertive: 'Nobody came.' ===> Interrogative: 'Did anybody come?' (Correct)",
      "Assertive: 'Everyone agreed.' ===> Interrogative: 'Who disagreed?' (Correct)"
    ],
    correctAnswer: 0,
    explanation: "'Is he a great scholar?' without negative marker 'not' becomes a genuine inquiry rather than a rhetorical transformation asserting his scholarship.",
    explanationBn: "'Is he a great scholar?' 'not' ছাড়া কেবল একটি সাধারণ প্রশ্ন হয়ে দাঁড়ায়, জোরালো বক্তব্য প্রকাশ করে না।"
  },
  {
    id: 25,
    question: "Identify the correct conversion of 'Can money buy genuine happiness?' into an assertive statement:",
    options: [
      "Money cannot buy genuine happiness.",
      "Money can buy genuine happiness.",
      "Money buys happiness always.",
      "Happiness is bought by money."
    ],
    correctAnswer: 0,
    explanation: "'Can money buy genuine happiness?' implies the self-evident negative answer: 'Money cannot buy genuine happiness.'",
    explanationBn: "'Can money buy genuine happiness?'-এর Assertive রূপ হলো: 'Money cannot buy genuine happiness'।"
  }
];

export default questions;
