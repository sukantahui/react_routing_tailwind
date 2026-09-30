// topic7_questions.js
// Topic 7: Interactive Word Classification Workbench & Diagnostics
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "In sentence diagnostics, what is the first step in parsing a complex English clause?",
    options: [
      "Find the main finite verb (the predicate engine) and identify its subject",
      "Count the vowels in the sentence",
      "Translate the sentence into Bengali word-for-word",
      "Delete all adjectives"
    ],
    correctAnswer: 0,
    answer: "Find the main finite verb (the predicate engine) and identify its subject",
    explanation: "Locating the finite verb unlocks the clause architecture, allowing you to identify the subject (who/what acts) and objects/complements.",
    explanationBn: "যেকোনো বাক্যের বিশ্লেষণ শুরু করতে হয় তার Finite Verb (সমাপিকা ক্রিয়া) এবং Subject (কর্তা) চিহ্নিত করার মাধ্যমে।",
    hint: "Start with the predicate verb and subject.",
    level: "basic"
  },
  {
    id: 2,
    question: "In the diagnostic sentence 'The exceptionally brilliant scholar solved the problem', parse the word 'exceptionally':",
    options: [
      "Adverb of Degree modifying the adjective 'brilliant'",
      "Attributive Adjective modifying 'scholar'",
      "Noun adjunct modifying 'problem'",
      "Preposition"
    ],
    correctAnswer: 0,
    answer: "Adverb of Degree modifying the adjective 'brilliant'",
    explanation: "'Exceptionally' specifies the degree of brilliance of the scholar, modifying an adjective.",
    explanationBn: "'exceptionally' হলো Adverb of Degree যা 'brilliant' Adjective-এর মাত্রা প্রকাশ করছে।",
    hint: "It answers 'How brilliant?'.",
    level: "intermediate"
  },
  {
    id: 3,
    question: "In the diagnostic sentence 'Bravo! Tuhina executed the algorithm flawlessly, and she won the prize', parse 'Bravo!':",
    options: ["Interjection expressing praise/joy", "Coordinating Conjunction", "Modal Auxiliary Verb", "Proper Noun"],
    correctAnswer: 0,
    answer: "Interjection expressing praise/joy",
    explanation: "'Bravo!' is an emotive exclamation standing syntactically independent at the front of the clause.",
    explanationBn: "'Bravo!' হলো প্রশংসা ও আনন্দ প্রকাশক Interjection।",
    hint: "An exclamatory word of praise.",
    level: "basic"
  },
  {
    id: 4,
    question: "In 'Bravo! Tuhina executed the algorithm flawlessly, and she won the prize', what part of speech is 'flawlessly'?",
    options: ["Adverb of Manner modifying 'executed'", "Attributive Adjective modifying 'algorithm'", "Noun Complement", "Conjunction"],
    correctAnswer: 0,
    answer: "Adverb of Manner modifying 'executed'",
    explanation: "'Flawlessly' tells how Tuhina executed the algorithm, modifying the transitive action verb 'executed'.",
    explanationBn: "'flawlessly' (নিখুঁতভাবে) 'executed' Verb-কে modify করে Adverb of Manner হিসেবে কাজ করছে।",
    hint: "Answers 'How did she execute it?'.",
    level: "basic"
  },
  {
    id: 5,
    question: "In 'The committee elected Debangshu president of the science club', what is the grammatical function of 'president'?",
    options: ["Object Complement renaming the direct object 'Debangshu'", "Subject Complement", "Indirect Object", "Direct Object"],
    correctAnswer: 0,
    answer: "Object Complement renaming the direct object 'Debangshu'",
    explanation: "After complex-transitive verbs (elect, appoint, make, choose), a noun renaming the direct object is an Object Complement.",
    explanationBn: "'president' শব্দটি Direct Object 'Debangshu'-র নতুন পদমর্যাদা প্রকাশ করায় Object Complement।",
    hint: "Renames the direct object after 'elected'.",
    level: "advanced"
  },
  {
    id: 6,
    question: "In the sentence 'She has a diamond necklace', parse 'diamond':",
    options: ["Noun functioning as an Adjective / Noun-Adjunct", "Transitive Verb", "Adverb of Manner", "Conjunction"],
    correctAnswer: 0,
    answer: "Noun functioning as an Adjective / Noun-Adjunct",
    explanation: "'Diamond' is nominally a material noun, but here it sits before 'necklace' to describe its material, acting attributively as a Noun Adjunct.",
    explanationBn: "'diamond' মূলত একটি Noun, কিন্তু 'necklace' Noun-এর পূর্বে বসে উপাদান বোঝানোয় Noun-Adjunct (Adjective) হিসেবে কাজ করছে।",
    hint: "Modifies the noun 'necklace'.",
    level: "intermediate"
  },
  {
    id: 7,
    question: "In 'The train arrived exactly on time', parse 'on time':",
    options: ["Prepositional phrase acting as an Adverbial modifier of time", "Direct Object Noun Phrase", "Subject Complement", "Compound Conjunction"],
    correctAnswer: 0,
    answer: "Prepositional phrase acting as an Adverbial modifier of time",
    explanation: "'On time' is a prepositional phrase modifying the verb 'arrived', answering 'When did it arrive?'.",
    explanationBn: "'on time' হলো Prepositional Phrase যা 'arrived' Verb-এর সময় নির্দেশ করে Adverbial-এর মতো কাজ করছে।",
    hint: "Preposition + noun modifying a verb.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "In 'He speaks English well, but he writes it poorly', what is the syntactic role of 'but'?",
    options: ["Coordinating Conjunction linking two independent clauses", "Preposition meaning except", "Adverb meaning only", "Relative Pronoun"],
    correctAnswer: 0,
    answer: "Coordinating Conjunction linking two independent clauses",
    explanation: "'But' joins two grammatically equal coordinate clauses expressing contrast.",
    explanationBn: "দুটি স্বাধীন বাক্যকে বিপরীত ভাব সহকারে যুক্ত করায় 'but' হলো Coordinating Conjunction।",
    hint: "FANBOYS coordinator.",
    level: "basic"
  },
  {
    id: 9,
    question: "In 'Abhronila submitted her assignment yesterday', parse 'yesterday':",
    options: ["Adverb of Time modifying 'submitted'", "Subject Noun", "Attributive Adjective", "Preposition"],
    correctAnswer: 0,
    answer: "Adverb of Time modifying 'submitted'",
    explanation: "'Yesterday' modifies the finite verb 'submitted', indicating when the action occurred.",
    explanationBn: "'yesterday' (গতকাল) 'submitted' Verb-এর সময় নির্দেশ করায় Adverb of Time।",
    hint: "Answers 'When was it submitted?'.",
    level: "basic"
  },
  {
    id: 10,
    question: "In 'Yesterday was a memorable day in Barrackpore', parse 'Yesterday':",
    options: ["Noun functioning as the Subject of the sentence", "Adverb of Time", "Preposition", "Conjunction"],
    correctAnswer: 0,
    answer: "Noun functioning as the Subject of the sentence",
    explanation: "Here 'Yesterday' occupies the grammatical Subject slot before the linking verb 'was'. Hence, it functions as a Noun.",
    explanationBn: "এখানে 'Yesterday' বাক্যের Subject হিসেবে 'was' Verb-এর পূর্বে বসায় এটি Noun হিসেবে কাজ করছে।",
    hint: "Occupies the subject slot before 'was'.",
    level: "intermediate"
  },
  {
    id: 11,
    question: "In 'The roaring waterfall cascaded down the rocky cliff', parse 'roaring':",
    options: ["Present Participle functioning as an Attributive Adjective", "Gerund Noun", "Main Predicate Verb", "Adverb of Manner"],
    correctAnswer: 0,
    answer: "Present Participle functioning as an Attributive Adjective",
    explanation: "'Roaring' is a V1+-ing verb form qualifying the noun 'waterfall' (a verbal adjective / participle).",
    explanationBn: "'roaring' (গর্জনশীল) 'waterfall' Noun-টিকে qualify করায় এটি Present Participle (Verbal Adjective)।",
    hint: "-ing word modifying a noun.",
    level: "intermediate"
  },
  {
    id: 12,
    question: "In 'Walking on the grass is strictly prohibited', parse 'Walking':",
    options: ["Gerund functioning as the head of the Subject noun phrase", "Present Participle Adjective", "Finite Action Verb", "Preposition"],
    correctAnswer: 0,
    answer: "Gerund functioning as the head of the Subject noun phrase",
    explanation: "'Walking' is a V1+-ing word functioning as the nominal subject of 'is prohibited'. Hence, it is a Gerund.",
    explanationBn: "'Walking' শব্দটি বাক্যের Subject হিসেবে Noun-এর কাজ করায় এটি Gerund।",
    hint: "Subject of the verb 'is prohibited'.",
    level: "intermediate"
  },
  {
    id: 13,
    question: "In 'Swadeep found the lecture extraordinarily enlightening', parse 'enlightening':",
    options: ["Participial Adjective functioning as Object Complement", "Gerund Subject", "Main Transitive Verb", "Adverb"],
    correctAnswer: 0,
    answer: "Participial Adjective functioning as Object Complement",
    explanation: "'Enlightening' describes the state/quality of the direct object 'the lecture' after 'found'.",
    explanationBn: "'enlightening' Direct Object 'the lecture'-এর অবস্থা প্রকাশ করায় Object Complement Adjective।",
    hint: "Modifies the direct object 'the lecture'.",
    level: "advanced"
  },
  {
    id: 14,
    question: "In 'He worked hard all day, yet he felt energetic', parse 'yet':",
    options: ["Coordinating Conjunction expressing concession / surprise", "Adverb of Time", "Preposition", "Relative Pronoun"],
    correctAnswer: 0,
    answer: "Coordinating Conjunction expressing concession / surprise",
    explanation: "'Yet' is one of the 7 FANBOYS conjunctions linking two contrasting clauses.",
    explanationBn: "'yet' হলো FANBOYS-এর অন্তর্ভুক্ত Coordinating Conjunction যা অপ্রত্যাশিত বৈপরীত্য প্রকাশ করে।",
    hint: "FANBOYS coordinator.",
    level: "basic"
  },
  {
    id: 15,
    question: "In 'The scientist had not yet published the research', parse 'yet':",
    options: ["Adverb of Time (meaning up to now)", "Coordinating Conjunction", "Preposition", "Interjection"],
    correctAnswer: 0,
    answer: "Adverb of Time (meaning up to now)",
    explanation: "In negative perfect aspect, 'yet' is an Adverb of Time meaning 'up to the present moment'.",
    explanationBn: "Negative বাক্যে 'yet' (এখনো পর্যন্ত) Adverb of Time হিসেবে ব্যবহৃত হয়েছে।",
    hint: "Modifies the verb meaning 'up to now'.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "In 'Which of these three algorithms is the most optimal?', parse 'Which':",
    options: ["Interrogative Pronoun (Subject)", "Interrogative Adjective", "Relative Pronoun", "Demonstrative Pronoun"],
    correctAnswer: 0,
    answer: "Interrogative Pronoun (Subject)",
    explanation: "'Which' stands alone before the prepositional phrase 'of these three algorithms' asking for a choice, acting as an Interrogative Pronoun.",
    explanationBn: "'Which' একা বসে পছন্দ জানতে চাওয়ায় এটি Interrogative Pronoun।",
    hint: "Stands alone asking for a choice among alternatives.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "In 'Which algorithm did you implement in the project?', parse 'Which':",
    options: ["Interrogative Adjective / Determiner modifying 'algorithm'", "Interrogative Pronoun", "Relative Pronoun", "Conjunction"],
    correctAnswer: 0,
    answer: "Interrogative Adjective / Determiner modifying 'algorithm'",
    explanation: "'Which' directly precedes and modifies the noun 'algorithm'. Hence, it is an Interrogative Adjective.",
    explanationBn: "'Which' সরাসরি 'algorithm' Noun-এর পূর্বে বসে প্রশ্ন করায় Interrogative Adjective।",
    hint: "Precedes the noun directly.",
    level: "intermediate"
  },
  {
    id: 18,
    question: "In 'Debangshu ran up the stairs', parse 'up':",
    options: ["Preposition governing the nominal object 'the stairs'", "Adverbial particle", "Adjective", "Verb"],
    correctAnswer: 0,
    answer: "Preposition governing the nominal object 'the stairs'",
    explanation: "'Up' is followed by the object 'the stairs', showing spatial upward direction (Preposition).",
    explanationBn: "'the stairs' Noun-এর পূর্বে বসে দিক নির্দেশ করায় 'up' হলো Preposition।",
    hint: "Governs the object 'the stairs'.",
    level: "basic"
  },
  {
    id: 19,
    question: "In 'The price of fuel went up rapidly', parse 'up':",
    options: ["Adverb / Particle modifying 'went'", "Preposition", "Adjective", "Noun"],
    correctAnswer: 0,
    answer: "Adverb / Particle modifying 'went'",
    explanation: "'Up' has no following nominal object and modifies the directional motion of 'went', acting as an Adverb.",
    explanationBn: "'up'-এর পরে কোনো Noun নেই; এটি 'went' Verb-এর গতি নির্দেশ করায় Adverb।",
    hint: "No following noun object; modifies the verb.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "In 'We experienced the ups and downs of competitive examinations', parse 'ups':",
    options: ["Plural Noun (Direct Object of 'experienced')", "Preposition", "Adverb", "Adjective"],
    correctAnswer: 0,
    answer: "Plural Noun (Direct Object of 'experienced')",
    explanation: "'The ups and downs' is a nominal idiom preceded by the article 'the', functioning as direct object nouns.",
    explanationBn: "'the ups and downs' (উত্থান-পতন) বাক্যে Direct Object হিসেবে Noun রূপে ব্যবহৃত হয়েছে।",
    hint: "Preceded by the article 'the' as a direct object.",
    level: "advanced"
  },
  {
    id: 21,
    question: "In 'This is an up train to Ranaghat', parse 'up':",
    options: ["Attributive Adjective modifying 'train'", "Preposition", "Adverb", "Noun"],
    correctAnswer: 0,
    answer: "Attributive Adjective modifying 'train'",
    explanation: "'Up' precedes and classifies the noun 'train' (an up train vs a down train), acting as an Adjective.",
    explanationBn: "'train' Noun-এর পূর্বে বসে ট্রেনের অভিমুখ বোঝানোয় 'up' হলো Adjective।",
    hint: "Qualifies the noun 'train'.",
    level: "intermediate"
  },
  {
    id: 22,
    question: "In sentence diagnostics, what part of speech is 'since' in 'I have lived in Barrackpore since childhood'?",
    options: ["Preposition of Time governing 'childhood'", "Subordinating Conjunction", "Adverb", "Adjective"],
    correctAnswer: 0,
    answer: "Preposition of Time governing 'childhood'",
    explanation: "'Since' is followed by the nominal object 'childhood'. Hence, it is a Preposition of Time.",
    explanationBn: "'childhood' Noun-এর পূর্বে বসে সময় নির্দেশ করায় 'since' হলো Preposition of Time।",
    hint: "Followed by a noun object.",
    level: "basic"
  },
  {
    id: 23,
    question: "In 'Since it was raining heavily, we postponed the match', parse 'Since':",
    options: ["Subordinating Conjunction of Cause / Reason", "Preposition of Time", "Adverb of Time", "Coordinating Conjunction"],
    correctAnswer: 0,
    answer: "Subordinating Conjunction of Cause / Reason",
    explanation: "'Since' introduces the adverbial clause of reason 'it was raining heavily' with its own subject and verb.",
    explanationBn: "'Since' (যেহেতু) কারণ প্রকাশক সম্পূর্ণ ক্লজ যুক্ত করায় Subordinating Conjunction।",
    hint: "Introduces a clause meaning 'because'.",
    level: "intermediate"
  },
  {
    id: 24,
    question: "In 'He left the city two years ago and has not been seen since', parse 'since':",
    options: ["Adverb of Time (meaning from that time until now)", "Preposition", "Conjunction", "Noun"],
    correctAnswer: 0,
    answer: "Adverb of Time (meaning from that time until now)",
    explanation: "'Since' stands alone modifying the verb phrase 'has not been seen' without any following object or clause.",
    explanationBn: "এখানে 'since'-এর পরে কোনো Noun বা Clause নেই; এটি একা বসে 'has not been seen' Verb-কে modify করে Adverb of Time হিসেবে কাজ করছে।",
    hint: "Stands alone at the end of the clause.",
    level: "advanced"
  },
  {
    id: 25,
    question: "What is the supreme benefit of conducting systematic sentence parsing diagnostics as taught by Sukanta Hui?",
    options: [
      "It transforms grammar from confusing guesswork into an objective, structural science where every single word's role is clearly identified",
      "It guarantees you will never need to read books again",
      "It allows you to skip all verb tenses",
      "It replaces vocabulary learning entirely"
    ],
    correctAnswer: 0,
    answer: "It transforms grammar from confusing guesswork into an objective, structural science where every single word's role is clearly identified",
    explanation: "Sentence parsing and word classification diagnostics eliminate ambiguity, giving students complete mastery over English syntax.",
    explanationBn: "বাক্য বিশ্লেষণের এই পদ্ধতি ব্যাকরণকে অনুমানের বদলে একটি সুনির্দিষ্ট বিজ্ঞানে পরিণত করে, যা শিক্ষার্থীদের ইংরেজি লেখার আত্মবিশ্বাস শতগুণ বাড়িয়ে দেয়।",
    hint: "Objective structural clarity over guesswork.",
    level: "basic"
  }
];

export default questions;
