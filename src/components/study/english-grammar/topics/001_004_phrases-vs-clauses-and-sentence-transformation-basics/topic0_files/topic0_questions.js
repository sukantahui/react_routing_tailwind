// topic0_questions.js
// Module 001_004: Phrases vs Clauses & Sentence Transformation Basics
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the fundamental difference between a Phrase and a Clause?",
    options: [
      "A phrase contains a finite verb, while a clause does not.",
      "A clause contains a subject and a finite verb, whereas a phrase lacks a subject-finite verb combination.",
      "A phrase is always longer than a clause.",
      "A clause cannot express a complete thought."
    ],
    correctAnswer: 1,
    explanation: "A clause must contain both a Subject and a Finite Verb (e.g., 'because she was tired'), while a phrase is a group of related words lacking a subject-finite verb predication (e.g., 'because of her fatigue').",
    explanationBn: "Clause-এ অবশ্যই একটি Subject এবং একটি Finite Verb থাকবে, কিন্তু Phrase হলো কয়েকটি শব্দের সমষ্টি যেখানে কোনো Subject-Finite Verb কম্বিনেশন থাকে না।"
  },
  {
    id: 2,
    question: "In the sentence 'The girl with long dark hair is Swadeep's sister', what type of phrase is 'with long dark hair'?",
    options: [
      "Adverb Phrase",
      "Adjective Phrase",
      "Noun Phrase",
      "Verb Phrase"
    ],
    correctAnswer: 1,
    explanation: "'With long dark hair' modifies and describes the noun 'The girl' (answering 'Which girl?'). It is an Adjective (Prepositional) Phrase.",
    explanationBn: "'With long dark hair' অংশটি 'The girl' Noun-কে বর্ণনা করছে (কোন মেয়েটি?), তাই এটি Adjective Phrase।"
  },
  {
    id: 3,
    question: "In the sentence 'She solved the algorithm in a very clever manner', what type of phrase is 'in a very clever manner'?",
    options: [
      "Adverb Phrase of Manner",
      "Adjective Phrase",
      "Noun Phrase",
      "Infinitive Phrase"
    ],
    correctAnswer: 0,
    explanation: "It modifies the verb 'solved', answering 'How did she solve it?'. It is an Adverb Phrase of Manner (equivalent to 'cleverly').",
    explanationBn: "এটি 'solved' Verb-কে modify করে কাজের পদ্ধতি বোঝাচ্ছে ('cleverly'-এর সমান), তাই এটি Adverb Phrase of Manner।"
  },
  {
    id: 4,
    question: "Transform the Affirmative sentence 'Man is mortal' into a Negative sentence WITHOUT changing its meaning.",
    options: [
      "Man is not immortal.",
      "Man is never mortal.",
      "No man is mortal.",
      "Man does not live."
    ],
    correctAnswer: 0,
    explanation: "Transformation requires preserving semantic truth while altering syntactic form. 'Man is mortal' transforms by using a negative particle + antonym: 'Man is not immortal.'",
    explanationBn: "অর্থ অপরিবর্তিত রেখে হ্যাঁ-বোধক থেকে না-বোধকে রূপান্তরের নিয়ম হলো Not + বিপরীত শব্দ (Antonym) ব্যবহার করা: 'Man is not immortal.'।"
  },
  {
    id: 5,
    question: "Transform 'As soon as the teacher entered the classroom, the students stood up' into a Negative sentence.",
    options: [
      "No sooner had the teacher entered the classroom than the students stood up.",
      "Hardly the teacher entered when the students stood up.",
      "As soon as the teacher not entered, the students did not stand.",
      "The teacher entered and the students stood."
    ],
    correctAnswer: 0,
    explanation: "'As soon as...' affirmatively transforms into the negative comparative construction 'No sooner had + Subject + V3... than...'.",
    explanationBn: "'As soon as...'-কে নেগেটিভে রূপান্তরের নিয়ম হলো 'No sooner had + Subject + V3... than...' ব্যবহার করা।"
  },
  {
    id: 6,
    question: "In 'He admitted that he had made a calculation error', what is 'that he had made a calculation error'?",
    options: [
      "Adjective Clause",
      "Noun Clause functioning as Direct Object",
      "Adverb Clause of Reason",
      "Prepositional Phrase"
    ],
    correctAnswer: 1,
    explanation: "The clause serves as the direct object of the transitive verb 'admitted' (answering 'Admitted what?'). It is a Noun Clause.",
    explanationBn: "এটি 'admitted' Transitive Verb-এর Direct Object হিসেবে কাজ করছে ('কী স্বীকার করেছিল?'), তাই এটি Noun Clause।"
  },
  {
    id: 7,
    question: "Transform the Assertive sentence 'Everyone loves flowers' into an Interrogative sentence.",
    options: [
      "Who does not love flowers?",
      "Does everyone love flowers?",
      "Do anyone love flowers?",
      "Who loves flowers?"
    ],
    correctAnswer: 0,
    explanation: "'Everyone + positive verb' transforms into a rhetorical interrogative: 'Who does not love flowers?'.",
    explanationBn: "'Everyone + positive verb' যুক্ত বাক্যকে প্রশ্নবোধকে রূপান্তরের নিয়ম: 'Who does not love flowers?'।"
  },
  {
    id: 8,
    question: "Transform 'Only Swadeep can solve this programming challenge' into a Negative sentence.",
    options: [
      "None but Swadeep can solve this programming challenge.",
      "No one except Swadeep cannot solve this challenge.",
      "Swadeep only cannot solve this challenge.",
      "Never Swadeep can solve this challenge."
    ],
    correctAnswer: 0,
    explanation: "When 'Only' or 'Alone' refers to a person, it transforms to the negative phrase 'None but': 'None but Swadeep can solve this programming challenge.'",
    explanationBn: "ব্যক্তির ক্ষেত্রে 'Only / Alone' থাকলে Negative-এ রূপান্তরের সময় 'None but' ব্যবহার করতে হয়।"
  },
  {
    id: 9,
    question: "Transform 'She is too weak to walk without support' into a complex sentence with 'so... that'.",
    options: [
      "She is so weak that she cannot walk without support.",
      "She is very weak so she can walk.",
      "She is so weak to walk.",
      "She is weak that she cannot walk."
    ],
    correctAnswer: 0,
    explanation: "'Too + Adj + to-infinitive' expressing negative consequence transforms into 'so + Adj + that + Subject + cannot/could not + V1': 'She is so weak that she cannot walk without support.'",
    explanationBn: "'Too... to'-কে 'So... that... not' দিয়ে রূপান্তরের নিয়ম: 'She is so weak that she cannot walk without support.'।"
  },
  {
    id: 10,
    question: "In the sentence 'I met a student who had secured the first rank in WBCS', what is 'who had secured the first rank in WBCS'?",
    options: [
      "Noun Clause",
      "Adjective (Relative) Clause",
      "Adverb Clause of Time",
      "Noun Phrase"
    ],
    correctAnswer: 1,
    explanation: "The clause modifies and qualifies the antecedent noun 'a student'. It is an Adjective (Relative) Clause.",
    explanationBn: "এই Clause-টি তার পূর্ববর্তী Noun 'a student'-কে qualify করছে, তাই এটি Adjective (Relative) Clause।"
  },
  {
    id: 11,
    question: "Transform 'Where there is smoke, there is fire' into a Negative sentence.",
    options: [
      "There is no smoke without fire.",
      "There is no smoke and no fire.",
      "Smoke is not fire.",
      "Fire is never without smoke."
    ],
    correctAnswer: 0,
    explanation: "The standard negative transformation of this universal adage is: 'There is no smoke without fire.'",
    explanationBn: "এই প্রবাদটির মানসম্মত Negative রূপান্তর হলো: 'There is no smoke without fire.'।"
  },
  {
    id: 12,
    question: "In 'He left the meeting because he was unwell', what is 'because he was unwell'?",
    options: [
      "Adverb Clause of Reason",
      "Noun Clause",
      "Adjective Clause",
      "Prepositional Phrase"
    ],
    correctAnswer: 0,
    explanation: "The clause answers 'Why did he leave?' and modifies the matrix verb 'left'. It is an Adverb Clause of Reason/Cause.",
    explanationBn: "এই Clause-টি 'left' Verb-এর কারণ নির্দেশ করছে (কেন চলে গিয়েছিল?), তাই এটি Adverb Clause of Reason।"
  },
  {
    id: 13,
    question: "Transform the Exclamatory sentence 'How beautiful the Victoria Memorial looks at night!' into an Assertive sentence.",
    options: [
      "The Victoria Memorial looks very beautiful at night.",
      "Does the Victoria Memorial look beautiful at night?",
      "The Victoria Memorial looks how beautiful at night.",
      "What beautiful the Victoria Memorial looks!"
    ],
    correctAnswer: 0,
    explanation: "'How + Adjective' transforms into 'Subject + Verb + very/extremely + Adjective': 'The Victoria Memorial looks very beautiful at night.'",
    explanationBn: "'How + Adjective'-কে Assertive-এ রূপান্তরের নিয়ম: 'The Victoria Memorial looks very beautiful at night.'।"
  },
  {
    id: 14,
    question: "Transform 'You must avoid fried foods to remain healthy' into a Compound sentence.",
    options: [
      "Avoid fried foods, or you will not remain healthy.",
      "If you avoid fried foods you remain healthy.",
      "Because you avoid fried foods you remain healthy.",
      "Remaining healthy requires avoiding fried foods."
    ],
    correctAnswer: 0,
    explanation: "A compound sentence requires two independent clauses connected by a coordinating conjunction (like 'or' / 'otherwise'): 'Avoid fried foods, or you will not remain healthy.'",
    explanationBn: "Compound Sentence তৈরি করতে Coordinating Conjunction ('or' / 'otherwise') ব্যবহার করতে হয়: 'Avoid fried foods, or you will not remain healthy.'।"
  },
  {
    id: 15,
    question: "In 'Walking along the riverbank in Barrackpore, I met my mentor', what is 'Walking along the riverbank in Barrackpore'?",
    options: [
      "Participle Phrase",
      "Noun Clause",
      "Finite Clause",
      "Adverb Clause"
    ],
    correctAnswer: 0,
    explanation: "It is a non-finite Participial Phrase modifying the subject pronoun 'I'. It contains no finite verb.",
    explanationBn: "এটি একটি Participial Phrase যা Subject 'I'-কে modify করছে (এতে কোনো Finite Verb নেই)।"
  },
  {
    id: 16,
    question: "Transform 'He is the wisest scholar in the district' into Comparative degree.",
    options: [
      "He is wiser than any other scholar in the district.",
      "He is wiser than all scholars in the district.",
      "No other scholar is as wise as he.",
      "He is most wise."
    ],
    correctAnswer: 0,
    explanation: "Superlative 'the wisest' transforms to Comparative with 'wiser than any other + singular noun': 'He is wiser than any other scholar in the district.'",
    explanationBn: "Superlative থেকে Comparative-এ রূপান্তরের নিয়ম: 'wiser than any other scholar in the district'।"
  },
  {
    id: 17,
    question: "Transform 'Every rose has a thorn' into a Negative sentence.",
    options: [
      "There is no rose without a thorn.",
      "No rose has a thorn.",
      "Every rose has not a thorn.",
      "A rose without a thorn does not exist."
    ],
    correctAnswer: 0,
    explanation: "'Every + Noun' transforms into 'There is no + Noun + without...': 'There is no rose without a thorn.'",
    explanationBn: "'Every + Noun' যুক্ত বাক্যের Negative রূপান্তর হলো: 'There is no rose without a thorn.'।"
  },
  {
    id: 18,
    question: "In 'I know the time when the train will arrive', what is 'when the train will arrive'?",
    options: [
      "Adjective (Relative) Clause",
      "Noun Clause",
      "Adverb Clause of Time",
      "Prepositional Phrase"
    ],
    correctAnswer: 0,
    explanation: "Because the relative adverb 'when' directly modifies the antecedent noun 'the time', it functions as an Adjective Clause (not an adverb clause).",
    explanationBn: "'When'-এর পূর্বে স্পষ্ট Antecedent Noun 'the time' রয়েছে, তাই এটি Adjective Clause।"
  },
  {
    id: 19,
    question: "Transform 'I was doubtful whether he would attend' into a Negative sentence.",
    options: [
      "I was not sure whether he would attend.",
      "I was not doubtful whether he would attend.",
      "I did not doubt that he would attend.",
      "I was never doubtful."
    ],
    correctAnswer: 0,
    explanation: "'Doubtful' transforms to negative 'not sure': 'I was not sure whether he would attend.'",
    explanationBn: "'Doubtful' (সন্দিহান)-কে Negative করতে 'not sure' (নিশ্চিত ছিলাম না) ব্যবহার করা হয়।"
  },
  {
    id: 20,
    question: "Transform 'Can an Ethiopian change his skin?' into an Assertive sentence.",
    options: [
      "An Ethiopian cannot change his skin.",
      "An Ethiopian can change his skin.",
      "Does an Ethiopian change his skin?",
      "No Ethiopian has skin."
    ],
    correctAnswer: 0,
    explanation: "A positive rhetorical question transforms into a negative assertive statement: 'An Ethiopian cannot change his skin.'",
    explanationBn: "হ্যাঁ-বোধক Rhetorical Question না-বোধক Assertive বিবৃতিতে রূপান্তরিত হয়: 'An Ethiopian cannot change his skin.'।"
  },
  {
    id: 21,
    question: "In 'Whatever you decide will be respected by the council', what is 'Whatever you decide'?",
    options: [
      "Noun Clause functioning as Subject",
      "Adverb Clause of Concession",
      "Adjective Clause",
      "Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "The clause functions as the complete grammatical Subject of the passive verb group 'will be respected'. It is a Noun Clause.",
    explanationBn: "এই Noun Clause-টি বাক্যের মূল Verb 'will be respected'-এর Subject হিসেবে কাজ করছে।"
  },
  {
    id: 22,
    question: "Transform 'He left no stone unturned to secure the first rank' into an Affirmative sentence.",
    options: [
      "He tried every possible means to secure the first rank.",
      "He turned every stone.",
      "He did not turn stones.",
      "He tried not to fail."
    ],
    correctAnswer: 0,
    explanation: "The negative idiom 'left no stone unturned' affirmatively transforms to 'tried every possible means / spared no effort'.",
    explanationBn: "'Left no stone unturned' (চেষ্টার কোনো ত্রুটি রাখেনি)-এর Affirmative রূপ হলো: 'He tried every possible means to secure the first rank.'।"
  },
  {
    id: 23,
    question: "In 'Although he was fatigued, he continued studying', what is 'Although he was fatigued'?",
    options: [
      "Adverb Clause of Concession / Contrast",
      "Noun Clause",
      "Adjective Clause",
      "Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "'Although' introduces a subordinate clause of concession/contrast modifying the matrix clause. It is an Adverb Clause of Concession.",
    explanationBn: "'Although' বিপরীত শর্ত নির্দেশ করে Adverb Clause of Concession হিসেবে বসেছে।"
  },
  {
    id: 24,
    question: "Transform 'Only a graduate is eligible for this managerial post' into a Negative sentence.",
    options: [
      "None but a graduate is eligible for this managerial post.",
      "No one except a graduate is not eligible.",
      "A graduate only is eligible.",
      "Nobody is eligible."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to eligible persons transforms to 'None but': 'None but a graduate is eligible for this managerial post.'",
    explanationBn: "ব্যক্তির যোগ্যতার ক্ষেত্রে 'Only'-এর পরিবর্তে 'None but' বসে।"
  },
  {
    id: 25,
    question: "Why is mastering Phrase vs Clause and Sentence Transformation the cornerstone of defensive English writing?",
    options: [
      "Because it enables writers to vary sentence rhythm, avoid monotony, combine complex ideas effortlessly, and excel in competitive examinations like WBCS, SSC CGL, and ICSE/ISC.",
      "Because it eliminates the need to use commas.",
      "Because it makes all sentences simple.",
      "Because it only applies to legal contracts."
    ],
    correctAnswer: 0,
    explanation: "Sentence transformation gives writers complete syntactic control, allowing them to shift emphasis, eliminate wordiness, and express complex logical relationships with absolute precision.",
    explanationBn: "Phrase ও Clause-এর পার্থক্য এবং Sentence Transformation আয়ত্ত করলে লেখায় বৈচিত্র্য আসে এবং বোর্ড ও প্রতিযোগিতামূলক পরীক্ষায় 'Do as Directed' সেকশনে শতভাগ নম্বর নিশ্চিত হয়।"
  }
];

export default questions;
