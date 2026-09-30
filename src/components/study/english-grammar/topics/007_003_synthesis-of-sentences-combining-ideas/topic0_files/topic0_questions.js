// topic0_questions.js - Module 007_003: Synthesis of Sentences: Combining Simple, Compound & Complex Structures
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Combine into ONE SIMPLE SENTENCE using a Participle: 'He took his walking stick. He stepped out for an evening walk.'",
    options: [
      "Taking his walking stick, he stepped out for an evening walk.",
      "He took his walking stick and stepped out for an evening walk.",
      "As he took his walking stick, he stepped out for an evening walk.",
      "Having his walking stick taken, he stepped out for an evening walk."
    ],
    correctAnswer: "Taking his walking stick, he stepped out for an evening walk.",
    explanation: "Using the present participle 'Taking his walking stick' reduces the first finite verb into a non-finite participle phrase, leaving only one finite verb ('stepped out') in a single Simple Sentence.",
    explanationBn: "প্রথম সকর্মক ভার্বটিকে Present Participle ('Taking his walking stick') রূপান্তর করে মাত্র একটি Finite Verb ('stepped out') বজায় রেখে Simple Sentence গঠন করা হয়েছে।"
  },
  {
    id: 2,
    question: "Combine into ONE SIMPLE SENTENCE using a NOMINATIVE ABSOLUTE: 'The sun rose. The thick mist dissipated over the hills.'",
    options: [
      "When the sun rose, the thick mist dissipated over the hills.",
      "The sun having risen, the thick mist dissipated over the hills.",
      "The sun rose and the thick mist dissipated over the hills.",
      "On the rising sun, the thick mist dissipated over the hills."
    ],
    correctAnswer: "The sun having risen, the thick mist dissipated over the hills.",
    explanation: "Because both sentences have different subjects ('The sun' and 'The thick mist'), we must use a Nominative Absolute structure: [Subject 1] + [Participle] ('The sun having risen').",
    explanationBn: "দুটি বাক্যের Subject আলাদা ('The sun' এবং 'The thick mist') হওয়ায় Nominative Absolute ('The sun having risen') ব্যবহার করে Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 3,
    question: "Combine into ONE SIMPLE SENTENCE using Noun in Apposition: 'Alexander the Great was a Macedonian king. He invaded India in 326 BC.'",
    options: [
      "Alexander the Great, a Macedonian king, invaded India in 326 BC.",
      "Alexander the Great was a Macedonian king who invaded India in 326 BC.",
      "Alexander the Great invaded India in 326 BC because he was a Macedonian king.",
      "Alexander the Great was a Macedonian king and he invaded India in 326 BC."
    ],
    correctAnswer: "Alexander the Great, a Macedonian king, invaded India in 326 BC.",
    explanation: "Placing 'a Macedonian king' in apposition to the subject 'Alexander the Great' eliminates the copular verb 'was', yielding a concise Simple Sentence.",
    explanationBn: "'A Macedonian king'-কে Noun in Apposition হিসেবে ব্যবহার করে মাত্র একটি Finite Verb ('invaded') রেখে Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 4,
    question: "Combine into ONE SIMPLE SENTENCE using an Infinitive: 'He works tirelessly day and night. He wants to support his family.'",
    options: [
      "He works tirelessly day and night to support his family.",
      "He works tirelessly day and night so that he can support his family.",
      "He works tirelessly day and night and supports his family.",
      "Working tirelessly day and night, he supports his family."
    ],
    correctAnswer: "He works tirelessly day and night to support his family.",
    explanation: "The purpose clause is compressed into the infinitive phrase 'to support his family', maintaining a single finite verb ('works').",
    explanationBn: "উদ্দেশ্য প্রকাশ করতে Infinitive ('to support his family') ব্যবহার করে একটি Finite Verb ('works') বিশিষ্ট Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 5,
    question: "Combine into ONE SIMPLE SENTENCE using Preposition with Gerund: 'The magistrate heard the final testimony. He immediately pronounced the verdict.'",
    options: [
      "On hearing the final testimony, the magistrate immediately pronounced the verdict.",
      "When the magistrate heard the final testimony, he immediately pronounced the verdict.",
      "The magistrate heard the final testimony and immediately pronounced the verdict.",
      "Having the magistrate heard the final testimony, he pronounced the verdict."
    ],
    correctAnswer: "On hearing the final testimony, the magistrate immediately pronounced the verdict.",
    explanation: "The preposition 'On' followed by the gerund 'hearing' creates a prepositional phrase expressing immediate sequence in a Simple Sentence.",
    explanationBn: "Preposition 'On' + Gerund 'hearing' ব্যবহার করে একটিমাত্র Finite Verb ('pronounced') রেখে Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 6,
    question: "Combine into ONE COMPOUND SENTENCE using an Adversative Conjunction: 'He was thoroughly exhausted. He continued to climb the mountain.'",
    options: [
      "Although he was thoroughly exhausted, he continued to climb the mountain.",
      "He was thoroughly exhausted, yet he continued to climb the mountain.",
      "Being thoroughly exhausted, he continued to climb the mountain.",
      "In spite of his exhaustion, he continued to climb the mountain."
    ],
    correctAnswer: "He was thoroughly exhausted, yet he continued to climb the mountain.",
    explanation: "'Yet' (or 'but') is a coordinating adversative conjunction linking two independent clauses into a Compound Sentence. ('Although' creates a Complex sentence; 'In spite of' creates a Simple sentence).",
    explanationBn: "'Yet' একটি Adversative Coordinating Conjunction যা দুটি স্বাধীন বাক্যকে যুক্ত করে Compound Sentence তৈরি করেছে।"
  },
  {
    id: 7,
    question: "Combine into ONE COMPOUND SENTENCE using a Disjunctive / Alternative Conjunction: 'Make haste. You will miss the morning flight.'",
    options: [
      "Make haste, or you will miss the morning flight.",
      "Unless you make haste, you will miss the morning flight.",
      "Making haste, you will not miss the morning flight.",
      "If you do not make haste, you will miss the morning flight."
    ],
    correctAnswer: "Make haste, or you will miss the morning flight.",
    explanation: "'Or' (or 'otherwise / else') is a disjunctive coordinating conjunction forming a Compound Sentence.",
    explanationBn: "'Or' (অথবা/নইলে) ব্যবহার করে দুটি সমমর্যাদার ক্লজ যুক্ত করে Compound Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 8,
    question: "Combine into ONE COMPLEX SENTENCE using an Adverbial Clause of Condition: 'Work consistently throughout the semester. You will score the highest grade.'",
    options: [
      "Work consistently throughout the semester and you will score the highest grade.",
      "If you work consistently throughout the semester, you will score the highest grade.",
      "By working consistently throughout the semester, you will score the highest grade.",
      "Working consistently throughout the semester, the highest grade will be scored."
    ],
    correctAnswer: "If you work consistently throughout the semester, you will score the highest grade.",
    explanation: "'If you work consistently...' is a subordinate adverbial clause of condition modifying the principal clause, creating a Complex Sentence.",
    explanationBn: "'If'-যুক্ত শর্তমূলক ক্লজ (Subordinate Clause) মূল ক্লজের সাথে যুক্ত হয়ে Complex Sentence তৈরি করেছে।"
  },
  {
    id: 9,
    question: "Combine into ONE COMPLEX SENTENCE using an Adjective (Relative) Clause: 'A gentleman called at my office yesterday. He is a renowned architect.'",
    options: [
      "The gentleman who called at my office yesterday is a renowned architect.",
      "A gentleman called at my office yesterday, and he is a renowned architect.",
      "A gentleman calling at my office yesterday is a renowned architect.",
      "The gentleman is a renowned architect calling at my office yesterday."
    ],
    correctAnswer: "The gentleman who called at my office yesterday is a renowned architect.",
    explanation: "'Who called at my office yesterday' is a relative clause modifying 'The gentleman', producing an elegant Complex Sentence.",
    explanationBn: "'Who called at my office yesterday' Relative Clause হিসেবে 'The gentleman'-কে বর্ণনা করে Complex Sentence তৈরি করেছে।"
  },
  {
    id: 10,
    question: "Combine into ONE SIMPLE SENTENCE: 'He failed in the first attempt. He never lost hope.'",
    options: [
      "In spite of his failure in the first attempt, he never lost hope.",
      "Though he failed in the first attempt, he never lost hope.",
      "He failed in the first attempt, but he never lost hope.",
      "He failed in the first attempt; however, he never lost hope."
    ],
    correctAnswer: "In spite of his failure in the first attempt, he never lost hope.",
    explanation: "'In spite of' + noun phrase ('his failure') forms a prepositional phrase, preserving only one finite verb ('lost') in a Simple Sentence.",
    explanationBn: "'In spite of' + Noun Phrase ব্যবহার করে একটিমাত্র Finite Verb ('lost') বিশিষ্ট Simple Sentence গঠন করা হয়েছে।"
  },
  {
    id: 11,
    question: "Combine into ONE SIMPLE SENTENCE using an Adverb: 'The warrior fell on the battlefield. His death was heroic.'",
    options: [
      "The warrior fell heroically on the battlefield.",
      "The warrior fell on the battlefield and his death was heroic.",
      "When the warrior fell on the battlefield, it was heroic.",
      "The warrior who fell on the battlefield had a heroic death."
    ],
    correctAnswer: "The warrior fell heroically on the battlefield.",
    explanation: "Converting the adjective 'heroic' into the adverb 'heroically' compresses the second sentence completely, maintaining a single finite verb ('fell').",
    explanationBn: "'Heroic' শব্দটিকে Adverb 'heroically'-তে রূপান্তর করে একটিমাত্র Finite Verb ('fell') বিশিষ্ট Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 12,
    question: "Combine into ONE COMPOUND SENTENCE: 'He was found guilty. He was sentenced to five years of rigorous imprisonment.'",
    options: [
      "He was found guilty, and he was sentenced to five years of rigorous imprisonment.",
      "Having been found guilty, he was sentenced to five years of rigorous imprisonment.",
      "Because he was found guilty, he was sentenced to five years of rigorous imprisonment.",
      "Being found guilty, he was sentenced to five years of rigorous imprisonment."
    ],
    correctAnswer: "He was found guilty, and he was sentenced to five years of rigorous imprisonment.",
    explanation: "Using the coordinating conjunction 'and' joins the two independent clauses into a Compound Sentence.",
    explanationBn: "Coordinating Conjunction 'and' দিয়ে দুটি স্বাধীন বাক্য যুক্ত করে Compound Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 13,
    question: "Combine into ONE COMPLEX SENTENCE using a Noun Clause: 'The accused is innocent. I am completely convinced of it.'",
    options: [
      "I am completely convinced that the accused is innocent.",
      "The accused is innocent and I am completely convinced of it.",
      "The accused being innocent, I am completely convinced.",
      "I am convinced of the innocence of the accused."
    ],
    correctAnswer: "I am completely convinced that the accused is innocent.",
    explanation: "'That the accused is innocent' is a subordinate noun clause acting as complement to 'convinced', forming a Complex Sentence.",
    explanationBn: "'That the accused is innocent' Noun Clause হিসেবে যুক্ত হয়ে Complex Sentence তৈরি করেছে।"
  },
  {
    id: 14,
    question: "Which of the following represents an ERROR in simple sentence synthesis?",
    options: [
      "Having finished his homework, the television was switched on.",
      "Having finished his homework, Rohan switched on the television.",
      "On finishing his homework, Rohan switched on the television.",
      "Rohan, having finished his homework, switched on the television."
    ],
    correctAnswer: "Having finished his homework, the television was switched on.",
    explanation: "This creates a notorious 'Dangling Modifier' error: it makes it sound as if the television itself finished the homework!",
    explanationBn: "এটি একটি মারাত্মক Dangling Modifier ভুল; কারণ এখানে মনে হচ্ছে যেন টেলিভিশন নিজেই হোমওয়ার্ক শেষ করেছে!"
  },
  {
    id: 15,
    question: "Combine into ONE SIMPLE SENTENCE using 'Too...to': 'He is very proud. He will not apologize for his misconduct.'",
    options: [
      "He is too proud to apologize for his misconduct.",
      "He is so proud that he will not apologize for his misconduct.",
      "Because he is very proud, he will not apologize.",
      "He is very proud and will not apologize."
    ],
    correctAnswer: "He is too proud to apologize for his misconduct.",
    explanation: "'Too proud to apologize' uses the adverb 'too' and infinitive 'to apologize' to construct a concise Simple Sentence.",
    explanationBn: "'Too... to' ব্যবহার করে একটিমাত্র Finite Verb ('is') বিশিষ্ট Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 16,
    question: "Combine into ONE COMPOUND SENTENCE using an Illative Conjunction: 'The monsoon rains failed completely. The crops withered.'",
    options: [
      "The monsoon rains failed completely; therefore, the crops withered.",
      "Because the monsoon rains failed completely, the crops withered.",
      "The monsoon rains having failed completely, the crops withered.",
      "Owing to the failure of the monsoon rains, the crops withered."
    ],
    correctAnswer: "The monsoon rains failed completely; therefore, the crops withered.",
    explanation: "'Therefore' (or 'so') expresses an illative (result) connection between independent clauses in a Compound Sentence.",
    explanationBn: "'Therefore' বা 'so' কার্যকারণভিত্তিক ফলাফল প্রকাশ করে Compound Sentence গঠন করেছে।"
  },
  {
    id: 17,
    question: "Combine into ONE COMPLEX SENTENCE: 'He reached the summit of Mount Everest. The weather had turned severely hostile.'",
    options: [
      "He reached the summit of Mount Everest although the weather had turned severely hostile.",
      "He reached the summit of Mount Everest in spite of the severely hostile weather.",
      "The weather turned severely hostile, but he reached the summit of Mount Everest.",
      "The weather having turned hostile, he reached the summit."
    ],
    correctAnswer: "He reached the summit of Mount Everest although the weather had turned severely hostile.",
    explanation: "'Although the weather had turned severely hostile' is a subordinate adverbial clause of concession, creating a Complex Sentence.",
    explanationBn: "'Although'-যুক্ত ক্লজটি Subordinate Clause of Concession হিসেবে কাজ করে Complex Sentence তৈরি করেছে।"
  },
  {
    id: 18,
    question: "Combine into ONE SIMPLE SENTENCE using a Perfect Participle: 'The surgeon completed the operation. He came out to brief the family.'",
    options: [
      "Having completed the operation, the surgeon came out to brief the family.",
      "The surgeon completed the operation and came out to brief the family.",
      "When the surgeon completed the operation, he briefed the family.",
      "The surgeon came out to brief the family because he completed the operation."
    ],
    correctAnswer: "Having completed the operation, the surgeon came out to brief the family.",
    explanation: "'Having completed' (Perfect Participle) indicates an action completed prior to the main action, preserving only one finite verb ('came out').",
    explanationBn: "Perfect Participle ('Having completed') ব্যবহার করে একটিমাত্র Finite Verb ('came out') বিশিষ্ট Simple Sentence গঠন করা হয়েছে।"
  },
  {
    id: 19,
    question: "Combine into ONE COMPLEX SENTENCE: 'Tell me the truth. You will not be penalized.'",
    options: [
      "If you tell me the truth, you will not be penalized.",
      "Tell me the truth, and you will not be penalized.",
      "Tell me the truth or you will be penalized.",
      "On telling the truth, you will not be penalized."
    ],
    correctAnswer: "If you tell me the truth, you will not be penalized.",
    explanation: "'If you tell me the truth' introduces a subordinate conditional clause, forming a Complex Sentence.",
    explanationBn: "'If' দিয়ে Subordinate Clause তৈরি করে Complex Sentence গঠন করা হয়েছে।"
  },
  {
    id: 20,
    question: "What is the cardinal rule when synthesizing multiple sentences into ONE SIMPLE SENTENCE?",
    options: [
      "The resulting sentence must have exactly ONE Finite Verb.",
      "The resulting sentence must have at least two finite verbs.",
      "You must use coordinating conjunctions like 'and' or 'but'.",
      "You must always insert a relative pronoun."
    ],
    correctAnswer: "The resulting sentence must have exactly ONE Finite Verb.",
    explanation: "By syntactic definition, a Simple Sentence can contain ONLY ONE FINITE VERB. All other verbs must be transformed into non-finite forms (participles, infinitives, gerunds).",
    explanationBn: "Simple Sentence-এর একমাত্র মূল শর্ত হলো: পুরো বাক্যে শুধুমাত্র ১টি Finite Verb থাকবে; বাকি সব ভার্বকে Participle, Infinitive বা Gerund-এ রূপান্তর করতে হবে।"
  },
  {
    id: 21,
    question: "Combine into ONE SIMPLE SENTENCE: 'The poet sat by the window. He wrote an ode to autumn.'",
    options: [
      "Sitting by the window, the poet wrote an ode to autumn.",
      "The poet sat by the window and wrote an ode to autumn.",
      "While the poet sat by the window, he wrote an ode to autumn.",
      "The poet sat by the window in order to write an ode."
    ],
    correctAnswer: "Sitting by the window, the poet wrote an ode to autumn.",
    explanation: "'Sitting by the window' converts the first clause into a present participle phrase in a Simple Sentence.",
    explanationBn: "Present Participle 'Sitting by the window' ব্যবহার করে একটিমাত্র Finite Verb ('wrote') বিশিষ্ট Simple Sentence তৈরি করা হয়েছে।"
  },
  {
    id: 22,
    question: "Combine into ONE COMPOUND SENTENCE: 'The train was derailed. No passengers were severely injured.'",
    options: [
      "The train was derailed, but no passengers were severely injured.",
      "Although the train was derailed, no passengers were injured.",
      "In spite of the derailment, no passengers were injured.",
      "The train being derailed, no passengers were injured."
    ],
    correctAnswer: "The train was derailed, but no passengers were severely injured.",
    explanation: "'But' connects the two independent clauses into a Compound Sentence.",
    explanationBn: "'But' দিয়ে দুটি স্বাধীন বাক্য যুক্ত করে Compound Sentence গঠন করা হয়েছে।"
  },
  {
    id: 23,
    question: "Combine into ONE COMPLEX SENTENCE: 'He worked day and night. He wanted to secure first class.'",
    options: [
      "He worked day and night so that he might secure first class.",
      "He worked day and night to secure first class.",
      "He worked day and night and secured first class.",
      "Working day and night, he secured first class."
    ],
    correctAnswer: "He worked day and night so that he might secure first class.",
    explanation: "'So that he might secure first class' is a subordinate adverbial clause of purpose in a Complex Sentence. (Option B is simple).",
    explanationBn: "'So that he might secure first class' Subordinate Purpose Clause তৈরি করে Complex Sentence গঠন করেছে (Option B হলো Simple Sentence)।"
  },
  {
    id: 24,
    question: "Combine into ONE SIMPLE SENTENCE using Preposition with Noun: 'The war ended. The refugees returned to their homeland.'",
    options: [
      "After the end of the war, the refugees returned to their homeland.",
      "When the war ended, the refugees returned to their homeland.",
      "The war ended, and the refugees returned to their homeland.",
      "The war having ended, the refugees returned."
    ],
    correctAnswer: "After the end of the war, the refugees returned to their homeland.",
    explanation: "'After the end of the war' uses a preposition + noun phrase, leaving only 'returned' as the finite verb.",
    explanationBn: "'After the end of the war' Prepositional Phrase ব্যবহার করে Simple Sentence গঠন করা হয়েছে।"
  },
  {
    id: 25,
    question: "Combine into ONE SIMPLE SENTENCE: 'He is an honest man. There is no doubt about it.'",
    options: [
      "He is undoubtedly an honest man.",
      "There is no doubt that he is an honest man.",
      "He is an honest man and there is no doubt about it.",
      "Because he is honest, there is no doubt."
    ],
    correctAnswer: "He is undoubtedly an honest man.",
    explanation: "Compressing 'There is no doubt' into the single adverb 'undoubtedly' creates a crisp, flawless Simple Sentence with one finite verb ('is').",
    explanationBn: "'There is no doubt'-কে Adverb 'undoubtedly'-তে রূপান্তর করে মাত্র ১টি Finite Verb ('is') বিশিষ্ট ঝরঝরে Simple Sentence তৈরি করা হয়েছে।"
  }
];

export default questions;
