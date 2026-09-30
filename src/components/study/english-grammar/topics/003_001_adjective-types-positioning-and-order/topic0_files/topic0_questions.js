const questions = [
  {
    id: "q1",
    question: "Which of the following sentences correctly demonstrates the 'OSASCOMP' Royal Order of Adjectives?",
    options: [
      "She bought a wooden beautiful Italian old dining table.",
      "She bought a beautiful old Italian wooden dining table.",
      "She bought an Italian wooden beautiful old dining table.",
      "She bought an old beautiful wooden Italian dining table."
    ],
    correctAnswer: 1,
    explanation: "According to OSASCOMP (Opinion -> Age -> Origin -> Material -> Purpose), the correct sequence is 'beautiful' (Opinion) -> 'old' (Age) -> 'Italian' (Origin) -> 'wooden' (Material) -> 'dining' (Purpose) + table.",
    explanationBn: "OSASCOMP নিয়ম অনুযায়ী ক্রম হলো: Opinion (beautiful) -> Age (old) -> Origin (Italian) -> Material (wooden) -> Purpose (dining) + table।"
  },
  {
    id: "q2",
    question: "Identify the adjective used PREDICATIVELY in the sentence: 'The exhausted traveler was asleep.'",
    options: [
      "traveler",
      "exhausted",
      "asleep",
      "was"
    ],
    correctAnswer: 2,
    explanation: "'Asleep' appears after the linking verb 'was' and modifies the subject 'traveler', functioning predicatively. ('Exhausted' is used attributively before the noun).",
    explanationBn: "'Asleep' শব্দটি Linking Verb 'was'-এর পরে বসে Subject Complement হিসেবে Predicative ভাবে ব্যবহৃত হয়েছে।"
  },
  {
    id: "q3",
    question: "Which of the following adjectives can ONLY be used predicatively (never directly before a noun)?",
    options: [
      "Golden",
      "Afraid",
      "Wooden",
      "Ancient"
    ],
    correctAnswer: 1,
    explanation: "Adjectives starting with 'a-' such as 'afraid', 'asleep', 'alive', 'alike', 'aware', and 'alone' are strictly predicative. We say 'The boy is afraid', not 'an afraid boy'.",
    explanationBn: "'A-' দিয়ে শুরু হওয়া Adjective যেমন: afraid, asleep, alive, alike, aware সাধারণত Attributive ভাবে Noun-এর আগে বসে না; এরা শুধু Predicative ভাবে বসে।"
  },
  {
    id: "q4",
    question: "Choose the correct participial adjective pair: 'The lecture was _______, so the students felt _______.'",
    options: [
      "bored; boring",
      "boring; bored",
      "bored; bored",
      "boring; boring"
    ],
    correctAnswer: 1,
    explanation: "Present participles (-ing) describe the cause/source of the feeling ('boring lecture'), while past participles (-ed) describe the person experiencing the emotion ('bored students').",
    explanationBn: "-ing যুক্ত Participle কারণ বা উৎস বোঝায় ('boring lecture'), আর -ed যুক্ত Participle ব্যক্তির মানসিক অনুভূতি প্রকাশ করে ('bored students')।"
  },
  {
    id: "q5",
    question: "Which of the following represents a PROPER ADJECTIVE?",
    options: [
      "Victorian",
      "Magnificent",
      "Numerous",
      "Spherical"
    ],
    correctAnswer: 0,
    explanation: "'Victorian' is derived from the proper noun 'Victoria' (Queen Victoria / Victorian era) and must always be capitalized.",
    explanationBn: "Proper Noun (Victoria) থেকে গঠিত Adjective-কে Proper Adjective বলা হয় (যেমন: Victorian, Indian, Shakespearean)।"
  },
  {
    id: "q6",
    question: "Identify the Quantitative Adjective in the sentence: 'He showed much patience during the crisis.'",
    options: [
      "patience",
      "crisis",
      "much",
      "during"
    ],
    correctAnswer: 2,
    explanation: "'Much' quantifies the uncountable abstract noun 'patience', answering the question 'How much?'.",
    explanationBn: "'Much' শব্দটি 'patience' নামক Uncountable Noun-এর পরিমাণ নির্দেশ করে, তাই এটি Adjective of Quantity।"
  },
  {
    id: "q7",
    question: "Which sentence contains a correctly punctuated COMPOUND ADJECTIVE?",
    options: [
      "She is a well known author.",
      "She is a well-known author.",
      "She is an author well-known.",
      "She is well-known an author."
    ],
    correctAnswer: 1,
    explanation: "When a compound modifier precedes the noun it modifies, it should be hyphenated ('well-known author'). When it follows the verb, the hyphen is omitted ('The author is well known').",
    explanationBn: "Noun-এর ঠিক পূর্বে যখন Compound Modifier বসে, তখন তা Hyphen দিয়ে যুক্ত হয় ('well-known author')।"
  },
  {
    id: "q8",
    question: "In the phrase 'a ten-year-old boy', why is 'year' in the singular form rather than 'years'?",
    options: [
      "It is a typographical convention with no grammar rule.",
      "Because when nouns function as part of a hyphenated compound adjective, they take singular form.",
      "Because 'boy' is singular.",
      "Because 'ten' requires a singular unit in old English."
    ],
    correctAnswer: 1,
    explanation: "In English, nouns acting as adjectives or within compound hyphenated modifiers cannot take plural -s endings (e.g. 'a ten-year-old child', 'a five-pound note', 'a two-hour flight').",
    explanationBn: "Compound Adjective হিসেবে ব্যবহৃত পরিমাপক Noun সর্বদাই Singular থাকে (যেমন: 'ten-year-old', 'five-star hotel')।"
  },
  {
    id: "q9",
    question: "Identify the Demonstrative Adjective in: 'Those mangoes in the basket are deliciously sweet.'",
    options: [
      "deliciously",
      "Those",
      "sweet",
      "basket"
    ],
    correctAnswer: 1,
    explanation: "'Those' directly precedes and points out the specific noun 'mangoes', functioning as a Demonstrative Adjective.",
    explanationBn: "'Those' শব্দটি 'mangoes' Noun-এর পূর্বে বসে নির্দিষ্ট করে নির্দেশ করছে, তাই এটি Demonstrative Adjective।"
  },
  {
    id: "q10",
    question: "What is the difference between 'Those mangoes are sweet' and 'Those are sweet mangoes'?",
    options: [
      "No grammatical difference at all.",
      "In the first, 'Those' is a Demonstrative Adjective; in the second, 'Those' is a Demonstrative Pronoun.",
      "In the first, 'Those' is a Pronoun; in the second, it is an Adjective.",
      "Both are relative clauses."
    ],
    correctAnswer: 1,
    explanation: "When 'Those' is placed immediately before a noun ('Those mangoes'), it is an adjective. When 'Those' stands alone as the subject followed by a verb ('Those are...'), it is a pronoun.",
    explanationBn: "Noun-এর আগে বসলে 'Those' হলো Demonstrative Adjective; আর ক্রিয়ার পূর্বে একা বসলে 'Those' হলো Demonstrative Pronoun।"
  },
  {
    id: "q11",
    question: "Choose the correct order of adjectives to fill the blank: 'He wore a _______ jacket to the conference.'",
    options: [
      "black stylish leather",
      "stylish black leather",
      "leather stylish black",
      "stylish leather black"
    ],
    correctAnswer: 1,
    explanation: "OSASCOMP rule: 'Stylish' (Opinion) -> 'black' (Color) -> 'leather' (Material) -> jacket.",
    explanationBn: "OSASCOMP নিয়ম: Stylish (Opinion) -> black (Color) -> leather (Material) + jacket।"
  },
  {
    id: "q12",
    question: "Which of the following contains an Adjective of Number (Definite Numeral - Ordinal)?",
    options: [
      "Five runners participated in the marathon.",
      "He secured the first position in the state ranking.",
      "Some students were absent yesterday.",
      "Many questions were challenging."
    ],
    correctAnswer: 1,
    explanation: "'First', 'second', 'third' are Ordinal Definite Numeral Adjectives indicating sequence or rank. ('Five' is a Cardinal numeral).",
    explanationBn: "'First', 'second' হলো ক্রমবাচক (Ordinal) সংখ্যাবাচক বিশেষণ; আর 'one', 'five' হলো পরিমাণবাচক (Cardinal) সংখ্যা।"
  },
  {
    id: "q13",
    question: "In the sentence 'The Japanese porcelain antique vase was shattered', what is the adjective order error according to OSASCOMP?",
    options: [
      "No error, it is perfect.",
      "It should be 'antique Japanese porcelain vase' (Age -> Origin -> Material).",
      "It should be 'porcelain antique Japanese vase'.",
      "It should be 'Japanese antique porcelain vase'."
    ],
    correctAnswer: 1,
    explanation: "OSASCOMP requires: Age ('antique') before Origin ('Japanese') before Material ('porcelain'). Thus, 'antique Japanese porcelain vase'.",
    explanationBn: "OSASCOMP ক্রম অনুযায়ী: Age (antique) -> Origin (Japanese) -> Material (porcelain) + vase।"
  },
  {
    id: "q14",
    question: "Which sentence correctly uses an adjective as a NOUN COMPLEMENT?",
    options: [
      "The jury found the accused guilty.",
      "The guilty accused wept.",
      "Guilt overcame him completely.",
      "He acted guilty."
    ],
    correctAnswer: 0,
    explanation: "In 'found the accused guilty', 'guilty' is an Object Complement (an adjective completing the meaning of the direct object 'the accused').",
    explanationBn: "'found the accused guilty' বাক্যে 'guilty' হলো Direct Object 'the accused'-এর Object Complement।"
  },
  {
    id: "q15",
    question: "Identify the Distributive Numeral Adjective in: 'Each student received a certificate of merit.'",
    options: [
      "student",
      "Each",
      "certificate",
      "merit"
    ],
    correctAnswer: 1,
    explanation: "'Each' modifies 'student' by taking the individuals of a group separately, making it a Distributive Numeral Adjective.",
    explanationBn: "'Each' শব্দটি দলীয় সদস্যদের পৃথকভাবে নির্দেশ করায় এটি Distributive Numeral Adjective।"
  },
  {
    id: "q16",
    question: "Select the sentence with INCORRECT adjective placement:",
    options: [
      "The asleep child looked serene.",
      "The sleeping child looked serene.",
      "The child was asleep and serene.",
      "The soundly sleeping child rested quietly."
    ],
    correctAnswer: 0,
    explanation: "'Asleep' is strictly predicative and cannot precede the noun. 'The sleeping child' is correct.",
    explanationBn: "'Asleep' কখনো Attributive হিসেবে Noun-এর পূর্বে বসে না; Noun-এর পূর্বে 'sleeping' ব্যবহার করতে হবে।"
  },
  {
    id: "q17",
    question: "Which of the following pairs shows the correct distinction between an Interrogative Adjective and an Interrogative Pronoun?",
    options: [
      "Adjective: 'Which book is yours?' | Pronoun: 'Which is your book?'",
      "Adjective: 'Which is your book?' | Pronoun: 'Which book is yours?'",
      "Both are adjectives.",
      "Both are pronouns."
    ],
    correctAnswer: 0,
    explanation: "'Which' followed immediately by a noun ('Which book') is an Interrogative Adjective. 'Which' followed by a verb ('Which is') is an Interrogative Pronoun.",
    explanationBn: "Noun-এর আগে বসলে 'Which' হলো Interrogative Adjective ('Which book'); Verb-এর আগে একা বসলে 'Which' হলো Interrogative Pronoun ('Which is')।"
  },
  {
    id: "q18",
    question: "In the phrase 'a large square cardboard box', identify the OSASCOMP elements in order:",
    options: [
      "Opinion -> Shape -> Origin",
      "Size (large) -> Shape (square) -> Material (cardboard)",
      "Shape (large) -> Size (square) -> Purpose (cardboard)",
      "Age (large) -> Color (square) -> Material (cardboard)"
    ],
    correctAnswer: 1,
    explanation: "'Large' denotes Size, 'square' denotes Shape, and 'cardboard' denotes Material.",
    explanationBn: "'Large' = Size (আকার), 'square' = Shape (আকৃতি), 'cardboard' = Material (উপাদান)।"
  },
  {
    id: "q19",
    question: "Which adjective correctly completes the statement about sensory adjectives? 'The freshly baked bread smells _______.'",
    options: [
      "deliciously",
      "delicious",
      "in a delicious manner",
      "with deliciousness"
    ],
    correctAnswer: 1,
    explanation: "Verbs of sensation (smell, taste, feel, look, sound) act as linking verbs and must be followed by predicate ADJECTIVES ('delicious'), not adverbs ('deliciously').",
    explanationBn: "Sensory Linking Verbs (smell, taste, look, feel)-এর পরে Adjective বসে (যেমন: smells delicious), Adverb বসে না।"
  },
  {
    id: "q20",
    question: "What type of adjective is 'own' in 'He built this house with his own hands'?",
    options: [
      "Demonstrative Adjective",
      "Emphasizing Adjective",
      "Indefinite Adjective",
      "Distributive Adjective"
    ],
    correctAnswer: 1,
    explanation: "'Own' and 'very' are Emphasizing Adjectives used to add rhetorical force to the modified noun.",
    explanationBn: "'Own' এবং 'very' শব্দগুলো জোর প্রদান করতে ব্যবহৃত হয়, তাই এদের Emphasizing Adjective বলা হয়।"
  },
  {
    id: "q21",
    question: "Choose the correct order for combining these adjectives: (ancient, grey, gigantic, stone) + pillars:",
    options: [
      "ancient gigantic grey stone pillars",
      "gigantic ancient grey stone pillars",
      "stone gigantic ancient grey pillars",
      "grey gigantic ancient stone pillars"
    ],
    correctAnswer: 1,
    explanation: "OSASCOMP sequence: Size ('gigantic') -> Age ('ancient') -> Color ('grey') -> Material ('stone') + pillars.",
    explanationBn: "OSASCOMP ক্রম: Size (gigantic) -> Age (ancient) -> Color (grey) -> Material (stone) + pillars।"
  },
  {
    id: "q22",
    question: "Identify the sentence that misuses a participial adjective:",
    options: [
      "The thrilling movie kept us on the edge of our seats.",
      "The confused student asked for clarification.",
      "The result was very surprised to the entire committee.",
      "The fascinating exhibition attracted thousands of visitors."
    ],
    correctAnswer: 2,
    explanation: "The result caused the emotion, so it was 'very surprising', not 'surprised'. ('Surprised' would describe the people experiencing the shock).",
    explanationBn: "ফলাফলটি নিজে অনুভূতি তৈরি করেছে, তাই তা 'surprising' হবে; 'surprised' শুধুমাত্র অনুভবকারী ব্যক্তির ক্ষেত্রে বসে।"
  },
  {
    id: "q23",
    question: "Which of the following is a NOUN functioning as an ADJECTIVAL MODIFIER (Classifier)?",
    options: [
      "Golden coin",
      "Gold coin",
      "Shiny coin",
      "Circular coin"
    ],
    correctAnswer: 1,
    explanation: "In 'gold coin', the noun 'gold' is used directly as an adjunct/classifier modifier for the noun 'coin'. ('Golden' is a derived adjective).",
    explanationBn: "'Gold coin'-এ 'gold' একটি Noun যা অপর Noun 'coin'-এর পূর্বে Adjective Modifer হিসেবে কাজ করছে।"
  },
  {
    id: "q24",
    question: "Why is 'a three-days workshop' grammatically incorrect?",
    options: [
      "Because workshops cannot last three days.",
      "Because 'day' is an irregular plural.",
      "Because noun modifiers preceding a head noun in compound units must be singular ('a three-day workshop').",
      "Because 'three' cannot modify 'workshop'."
    ],
    correctAnswer: 2,
    explanation: "In compound noun modifiers functioning adjectivally, the unit noun is always singular: 'a three-day workshop'. (Compare with: 'a workshop of three days').",
    explanationBn: "Compound Modifier-এ Noun কখনো Plural হয় না; তাই 'a three-day workshop' সঠিক রূপ।"
  },
  {
    id: "q25",
    question: "In the sentence 'The principal gave a speech to the whole school', what type of adjective is 'whole'?",
    options: [
      "Adjective of Quality",
      "Adjective of Quantity",
      "Proper Adjective",
      "Relative Adjective"
    ],
    correctAnswer: 1,
    explanation: "'Whole' indicates total amount or quantity of an entity, functioning as an Adjective of Quantity.",
    explanationBn: "'Whole' কোনো সত্ত্বার সামগ্রিক পরিমাণ নির্দেশ করে, তাই এটি Adjective of Quantity।"
  }
];

export default questions;
