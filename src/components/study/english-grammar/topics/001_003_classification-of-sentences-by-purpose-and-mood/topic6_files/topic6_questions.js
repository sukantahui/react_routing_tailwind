// topic6_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// Topic 6: Classroom Practice Lab: Tone Modulation & Question Tags
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "During a mentoring lab at Barrackpore, a student wrote: 'He has little money left, hasn't he?'. How did Sukanta Sir correct this?",
    options: [
      "'Little' is a negative quantifier, so the tag must be positive: 'has he?' (or 'does he?')",
      "Change the tag to 'isn't he?'",
      "Change 'money' to 'moneys'",
      "The student's tag is already completely correct"
    ],
    correctAnswer: 0,
    explanation: "'Little' (without 'a') denotes a negative quantity ('almost none'). Therefore, the statement is semantically negative and requires a positive question tag: 'has he?' or 'does he?'.",
    explanationBn: "'Little' না-বোধক পরিমাণ ('প্রায় নেই') বোঝায়, তাই বাক্যটি Negative এবং এর Tag অবশ্যই Positive হবে: 'has he?' বা 'does he?'।"
  },
  {
    id: 2,
    question: "In the sentence 'You think you are very smart, ________?', what is the rule for selecting the tag in complex sentences containing an opinion matrix clause ('You think...')?",
    options: [
      "The tag attaches to the main clause subject and verb: 'don't you?'",
      "The tag attaches to the subordinate clause: 'aren't you?'",
      "Both 'don't you?' and 'aren't you?' are acceptable",
      "Complex sentences cannot take question tags"
    ],
    correctAnswer: 0,
    explanation: "When the main subject is 2nd or 3rd person ('You think...'), the tag applies to the main matrix clause: 'You think..., don't you?'. (Contrast with 1st person 'I think he is honest, isn't he?').",
    explanationBn: "Second/Third Person যুক্ত বাক্যে ('You think...') Tag মূল Matrix Clause অনুযায়ী হয়: 'don't you?'।"
  },
  {
    id: 3,
    question: "Select the correct tag for: 'I think Swadeep will top the coding hackathon, ________?'",
    options: [
      "don't I?",
      "won't he?",
      "will he?",
      "do I?"
    ],
    correctAnswer: 1,
    explanation: "In sentences introduced by 1st-person opinion matrices ('I think / I believe / I suppose...'), the tag is formed based on the SUBORDINATE CLAUSE subject and verb: 'won't he?'.",
    explanationBn: "First Person ('I think / I believe...') দিয়ে শুরু হওয়া বাক্যে Tag Question মূলত Subordinate Clause-এর উপর ভিত্তি করে গঠিত হয়: 'won't he?'।"
  },
  {
    id: 4,
    question: "What is the correct tag for: 'I don't suppose anybody called while we were out, ________?'",
    options: [
      "did they?",
      "didn't they?",
      "do I?",
      "don't I?"
    ],
    correctAnswer: 0,
    explanation: "Negative raising in the main clause ('I don't suppose') makes the entire proposition negative. The subordinate subject 'anybody' takes pronoun 'they' and a positive tag: 'did they?'.",
    explanationBn: "'I don't suppose' পুরো বক্তব্যকে না-বোধক করে দেয় এবং 'anybody'-র জন্য Pronoun 'they' বসে, তাই Positive Tag হবে: 'did they?'।"
  },
  {
    id: 5,
    question: "Choose the correct tag for: 'Pass me that wrench, ________?' when delivered as an urgent informal command:",
    options: [
      "will you?",
      "can you?",
      "could you?",
      "All of the above are pragmatically valid spoken tags"
    ],
    correctAnswer: 3,
    explanation: "In spoken discourse, 'will you?', 'can you?', 'would you?', and 'could you?' are all acceptable imperative tags varying only by degree of politeness and familiarity.",
    explanationBn: "কথোপকথনে Imperative বাক্যের ক্ষেত্রে 'will you?', 'can you?', 'would you?', 'could you?' সবগুলোই ভদ্রতার তারতম্য অনুযায়ী প্রযোজ্য।"
  },
  {
    id: 6,
    question: "What is the correct tag for the negative imperative: 'Don't touch that high-voltage terminal, ________?'",
    options: [
      "will you?",
      "won't you?",
      "shall you?",
      "must you?"
    ],
    correctAnswer: 0,
    explanation: "Negative imperatives with 'Don't' strictly mandate the positive tag 'will you?': 'Don't touch..., will you?'.",
    explanationBn: "না-বোধক Imperative বাক্যে ('Don't...') সর্বদা Positive Tag 'will you?' ব্যবহৃত হয়।"
  },
  {
    id: 7,
    question: "What is the correct tag for: 'Let's take a 10-minute break from the CSS lab, ________?'",
    options: [
      "shall we?",
      "will we?",
      "don't we?",
      "can we?"
    ],
    correctAnswer: 0,
    explanation: "'Let's' (inclusive proposal for joint action) strictly takes 'shall we?'.",
    explanationBn: "যৌথ পদক্ষেপের প্রস্তাব 'Let's'-এর ক্ষেত্রে Tag সর্বদা 'shall we?' হয়।"
  },
  {
    id: 8,
    question: "Choose the correct tag for: 'Let Debangshu handle the database configuration, ________?'",
    options: [
      "shall we?",
      "will you?",
      "won't he?",
      "does he?"
    ],
    correctAnswer: 1,
    explanation: "'Let + 3rd person' is an imperative command/request to the listener ('You'), hence taking the tag 'will you?'.",
    explanationBn: "'Let + Third Person' মূলত শ্রোতা (You)-র প্রতি একটি নির্দেশ বা অনুরোধ, তাই এর Tag হয় 'will you?'।"
  },
  {
    id: 9,
    question: "What is the correct tag for: 'Somebody left their umbrella in the classroom, ________?'",
    options: [
      "didn't they?",
      "didn't he?",
      "did they?",
      "wasn't it?"
    ],
    correctAnswer: 0,
    explanation: "'Somebody' is positive (requiring negative tag 'didn't') and refers to a person, requiring plural pronoun 'they': 'didn't they?'.",
    explanationBn: "'Somebody' হ্যাঁ-বোধক শব্দ এবং Tag-এ এর পরিবর্তে 'they' বসে, তাই সঠিক Tag: 'didn't they?'।"
  },
  {
    id: 10,
    question: "What is the correct tag for: 'Everything is clear to the class, ________?'",
    options: [
      "isn't it?",
      "aren't they?",
      "is it?",
      "doesn't it?"
    ],
    correctAnswer: 0,
    explanation: "'Everything' is an inanimate singular pronoun taking 'it' and negative tag: 'isn't it?'.",
    explanationBn: "'Everything' বস্তুবাচক ও Singular হওয়ায় Pronoun 'it' বসে এবং Tag হবে Negative: 'isn't it?'।"
  },
  {
    id: 11,
    question: "What is the correct tag for: 'Neither of them came to the tutorial, ________?'",
    options: [
      "did they?",
      "didn't they?",
      "did he?",
      "didn't he?"
    ],
    correctAnswer: 0,
    explanation: "'Neither' is negative, mandating a positive tag with plural pronoun 'they': 'did they?'.",
    explanationBn: "'Neither' না-বোধক হওয়ায় Tag হবে Positive ('did they?')।"
  },
  {
    id: 12,
    question: "Choose the correct tag for: 'You have your breakfast at 8 AM every morning, ________?' (where 'have' means 'eat' in simple present):",
    options: [
      "haven't you?",
      "don't you?",
      "aren't you?",
      "hadn't you?"
    ],
    correctAnswer: 1,
    explanation: "When 'have' is an action verb (eat/drink/experience), question formation uses dummy operator 'do': 'don't you?'.",
    explanationBn: "'Have' যখন খাওয়া বা কোনো কাজ করা অর্থে মূল Verb হিসেবে বসে, তখন Tag-এ 'don't you?' ব্যবহৃত হয়।"
  },
  {
    id: 13,
    question: "What is the correct tag for: 'She has had a lot of problems lately, ________?'",
    options: [
      "hasn't she?",
      "hadn't she?",
      "doesn't she?",
      "didn't she?"
    ],
    correctAnswer: 0,
    explanation: "In the present perfect tense 'has had', the first 'has' is the auxiliary verb. Thus, the tag is 'hasn't she?'.",
    explanationBn: "Present Perfect Tense 'has had'-এ প্রথম 'has' হলো Auxiliary Verb, তাই Tag হবে: 'hasn't she?'।"
  },
  {
    id: 14,
    question: "What is the correct tag for: 'You must not reveal the password to anyone, ________?'",
    options: [
      "must you?",
      "mustn't you?",
      "should you?",
      "can you?"
    ],
    correctAnswer: 0,
    explanation: "A negative modal statement ('must not') takes a positive tag with the same modal: 'must you?'.",
    explanationBn: "Negative Modal 'must not'-এর ক্ষেত্রে Positive Tag হবে 'must you?'।"
  },
  {
    id: 15,
    question: "What is the correct tag for: 'Students must obey the laboratory safety rules, ________?'",
    options: [
      "mustn't they?",
      "must they?",
      "shouldn't they?",
      "don't they?"
    ],
    correctAnswer: 0,
    explanation: "A positive modal statement ('must') takes a contracted negative tag: 'mustn't they?'.",
    explanationBn: "Positive Modal 'must'-এর ক্ষেত্রে Negative Tag হবে 'mustn't they?'।"
  },
  {
    id: 16,
    question: "Select the correct tag for: 'He could scarcely breathe in the suffocating smoke, ________?'",
    options: [
      "could he?",
      "couldn't he?",
      "can he?",
      "can't he?"
    ],
    correctAnswer: 0,
    explanation: "'Scarcely' makes the clause semantically negative, requiring a positive tag with the modal 'could': 'could he?'.",
    explanationBn: "'Scarcely' বাক্যকে Negative করে দেয়, তাই Modal 'could'-এর সাথে Positive Tag হবে: 'could he?'।"
  },
  {
    id: 17,
    question: "What is the correct tag for: 'Nothing could be done under those circumstances, ________?'",
    options: [
      "could it?",
      "couldn't it?",
      "could they?",
      "can it?"
    ],
    correctAnswer: 0,
    explanation: "'Nothing' is negative and inanimate ('it'). With modal 'could', the positive tag is 'could it?'.",
    explanationBn: "'Nothing' না-বোধক ও বস্তুবাচক ('it'), তাই Modal 'could'-এর সাথে Positive Tag হবে 'could it?'।"
  },
  {
    id: 18,
    question: "In spoken discourse, if a teacher says 'You have done the homework, haven't you? $\searrow$' with a FALLING intonation, what does the teacher mean?",
    options: [
      "The teacher is virtually certain you did it and expects your agreement.",
      "The teacher has no idea and is asking a genuine question.",
      "The teacher is confused about the homework assignment.",
      "The teacher is speaking an incomplete sentence."
    ],
    correctAnswer: 0,
    explanation: "Falling pitch on a question tag indicates expectation of agreement/confirmation, not genuine doubt.",
    explanationBn: "Tag-এ Falling Tone নির্দেশ করে বক্তা নিশ্চিত এবং শ্রোতার কাছ থেকে সম্মতি আশা করছে।"
  },
  {
    id: 19,
    question: "If a student asks 'You haven't seen my USB drive anywhere, have you? $\nearrow$' with a RISING intonation, what does the student mean?",
    options: [
      "The student is genuinely asking because they do not know the answer.",
      "The student is commanding you to buy a USB drive.",
      "The student is certain you took the USB drive.",
      "The student is reciting poetry."
    ],
    correctAnswer: 0,
    explanation: "Rising intonation on a tag turns it into a real, genuine information inquiry where the speaker is uncertain.",
    explanationBn: "Tag-এ Rising Tone মানে বক্তা সত্যই জানে না এবং প্রকৃত তথ্য জানতে চাইছে।"
  },
  {
    id: 20,
    question: "What is the correct tag for: 'There are twenty workstations in this computer lab, ________?'",
    options: [
      "aren't there?",
      "aren't they?",
      "isn't there?",
      "are there?"
    ],
    correctAnswer: 0,
    explanation: "Existential 'there' acts as the dummy subject pronoun in question tags: 'aren't there?'.",
    explanationBn: "Existential 'There' বাক্যের Subject হলে Tag-এ 'there'-ই বসে: 'aren't there?'।"
  },
  {
    id: 21,
    question: "What is the correct tag for: 'That was an exceptionally brilliant lecture by Sukanta Sir, ________?'",
    options: [
      "wasn't it?",
      "wasn't that?",
      "was it?",
      "isn't it?"
    ],
    correctAnswer: 0,
    explanation: "The demonstrative pronoun 'that' is replaced by 'it' in question tags: 'wasn't it?'.",
    explanationBn: "'That' Subject হলে Tag Question-এ Pronoun হিসেবে 'it' বসে: 'wasn't it?'।"
  },
  {
    id: 22,
    question: "What is the correct tag for: 'Those aren't your notebooks, ________?'",
    options: [
      "are they?",
      "are those?",
      "aren't they?",
      "is it?"
    ],
    correctAnswer: 0,
    explanation: "'Those' is replaced by 'they' in question tags, and the negative statement takes a positive tag: 'are they?'.",
    explanationBn: "'Those'-এর পরিবর্তে Tag-এ 'they' বসে এবং Negative বাক্যের জন্য Positive Tag হবে 'are they?'।"
  },
  {
    id: 23,
    question: "Identify the INCORRECT tag among the following:",
    options: [
      "I am your teacher, aren't I?",
      "Let's solve this puzzle, shall we?",
      "She rarely comes late, doesn't she?",
      "Nobody called, did they?"
    ],
    correctAnswer: 2,
    explanation: "'She rarely comes late' is negative because of 'rarely', so its tag MUST BE POSITIVE: 'does she?' (NOT 'doesn't she?').",
    explanationBn: "'Rarely' থাকায় বাক্যটি Negative, তাই Tag হবে 'does she?' ('doesn't she?' ভুল)।"
  },
  {
    id: 24,
    question: "What is the correct tag for: 'You'd rather go by metro train, ________?'",
    options: [
      "wouldn't you?",
      "hadn't you?",
      "didn't you?",
      "shouldn't you?"
    ],
    correctAnswer: 0,
    explanation: "'You'd rather' expands to 'You would rather'. Thus, the contracted negative tag is 'wouldn't you?'.",
    explanationBn: "'You'd rather' হলো 'You would rather'-এর সংক্ষিপ্ত রূপ, তাই এর Tag হবে 'wouldn't you?'।"
  },
  {
    id: 25,
    question: "What is the correct tag for: 'You'd better see a doctor immediately, ________?'",
    options: [
      "hadn't you?",
      "wouldn't you?",
      "shouldn't you?",
      "didn't you?"
    ],
    correctAnswer: 0,
    explanation: "'You'd better' expands to 'You had better'. Thus, the question tag is 'hadn't you?'.",
    explanationBn: "'You'd better' হলো 'You had better'-এর সংক্ষিপ্ত রূপ, তাই এর Tag হবে 'hadn't you?'।"
  }
];

export default questions;
