// topic2_files/topic2_questions.js
const questions = [
  {
    question: "What is the main difference between a proposition and a non-proposition?",
    shortAnswer: "Propositions have truth value (true/false); non-propositions do not.",
    explanation: "Propositions are declarative sentences that can be evaluated as true or false. Non-propositions include questions, commands, exclamations, performatives, open sentences, and paradoxes — they cannot be assigned a truth value.",
    hint: "Ask: Can I say 'It is true that...' before the sentence?",
    level: "basic",
    codeExample: "// Proposition\nlet isRaining = true;\n// Non-proposition (command)\nconsole.log('Please close the window');"
  },
  {
    question: "Is 'Please close the door' a proposition? Why?",
    shortAnswer: "No, because it's a command (imperative), not a declarative sentence.",
    explanation: "Commands request action; they do not assert anything that can be true or false. The sentence 'Please close the door' cannot be evaluated as true or false — it's either obeyed or not, but that's different from truth value.",
    hint: "Try prefixing with 'It is true that' — 'It is true that please close the door' is nonsense.",
    level: "basic",
    codeExample: "// Not a proposition\n// closeDoor(); // command\n// Proposition: userClickedClose = true;"
  },
  {
    question: "Can a question ever be a proposition?",
    shortAnswer: "No, questions are interrogative and lack truth value.",
    explanation: "Questions ask for information but do not assert facts. Even rhetorical questions are still questions grammatically and cannot be true or false. However, the statement 'He asked a question' is a proposition about the question.",
    hint: "The question itself isn't true/false, but reporting the question can be.",
    level: "basic",
    codeExample: "let userQuestion = 'What time is it?';  // not a proposition\nlet askedQuestion = true;  // proposition about the question"
  },
  {
    question: "What is an open sentence? Why is it not a proposition?",
    shortAnswer: "A sentence with free variables whose truth depends on the variable values.",
    explanation: "Open sentences like 'x + 3 = 7' or 'He lives in Barrackpore' (when 'he' is unspecified) have no definite truth value until the variables are assigned. Without binding, they are not propositions.",
    hint: "If you need more information to decide true/false, it's likely an open sentence.",
    level: "moderate",
    codeExample: "let x;  // undefined\nlet equation = (x + 3 === 7);  // open sentence, not a proposition\nx = 4;\nlet proposition = (x + 3 === 7);  // now a proposition (true)"
  },
  {
    question: "Is 'This statement is false' a proposition?",
    shortAnswer: "No, it's a paradox with no consistent truth value.",
    explanation: "If true, then it says it's false → contradiction. If false, then it says it's false is false → meaning it's true → contradiction. This self-referential loop violates the requirement that a proposition must be either true or false, not both or neither.",
    hint: "Try assigning a truth value and see what happens — you'll get a contradiction.",
    level: "expert",
    codeExample: "// This would cause infinite recursion:\n// let paradox = !paradox;  // not allowed"
  },
  {
    question: "Is an exclamation like 'Wow!' a proposition?",
    shortAnswer: "No, exclamations express emotion, not a truth-evaluable claim.",
    explanation: "Exclamatory sentences ('What a beautiful day!', 'Oh no!') convey feelings or reactions. They do not assert facts that can be verified as true or false, so they are non-propositions.",
    hint: "You can't agree or disagree with 'Wow!' in terms of truth.",
    level: "basic",
    codeExample: "// Not a proposition:\nconsole.log('Hurray!');\n// Proposition:\nlet isExcited = true;"
  },
  {
    question: "How can you convert a command into a proposition?",
    shortAnswer: "Report the command as a fact: 'He commanded to close the door'.",
    explanation: "While the command itself ('Close the door') is not a proposition, the statement about the command is a proposition because it can be true or false (did he actually command that?). This distinction is important in logic and law.",
    hint: "The proposition is about the utterance, not the utterance itself.",
    level: "moderate",
    codeExample: "// Command: 'Close the door'\n// Proposition:\nlet commandGiven = true;  // or false if no command was given"
  },
  {
    question: "Is a performative utterance like 'I promise' a proposition?",
    shortAnswer: "No, performatives perform an action rather than asserting a fact.",
    explanation: "When you say 'I promise', you are making a promise, not describing a fact. The utterance itself is the action. However, the statement 'He made a promise' is a proposition.",
    hint: "Performatives are doing something, not saying something true/false.",
    level: "expert",
    codeExample: "// Performative (not a proposition):\n// console.log('I promise to pay');\n// Proposition about performative:\nlet promiseMade = true;"
  },
  {
    question: "Why is 'She is a doctor' not always a proposition?",
    shortAnswer: "If 'she' is unspecified, it's an open sentence with no definite truth value.",
    explanation: "The pronoun 'she' must refer to a specific person. Without a clear referent, the sentence is ambiguous and cannot be evaluated. Once we know 'she' refers to, say, 'Susmita', then 'Susmita is a doctor' becomes a proposition (true or false depending on Susmita's profession).",
    hint: "Pronouns need antecedents to make the sentence truth-evaluable.",
    level: "moderate",
    codeExample: "let person = { name: 'Susmita', job: 'doctor' };\nlet isDoctor = (person.job === 'doctor');  // proposition"
  },
  {
    question: "Can a sentence be both a proposition and a non-proposition?",
    shortAnswer: "No, a sentence either has a truth value or it doesn't — it's exclusive.",
    explanation: "Classification is based on the sentence's form and context. A given sentence in a given context cannot be both. However, the same string of words might be ambiguous: 'Fire!' could be an exclamation (non-prop) or a declarative 'There is fire' (proposition).",
    hint: "Context determines classification; a sentence can't be both simultaneously.",
    level: "moderate",
    codeExample: "// Ambiguous: 'Fire!'\n// As exclamation: non-proposition\n// As statement: proposition (true if fire exists)"
  },
  {
    question: "Is a rhetorical question a proposition?",
    shortAnswer: "No, it's still a question grammatically, so no truth value.",
    explanation: "Rhetorical questions like 'Who knows?' are not meant to be answered, but they remain interrogative sentences. They do not assert a claim that can be true or false, hence non-propositions.",
    hint: "The form is interrogative, regardless of intent.",
    level: "basic",
    codeExample: "// Not a proposition:\n// 'Isn't the sky blue?' (rhetorical question)\n// Proposition:\n'The sky is blue.'"
  },
  {
    question: "Why is 'x + 2 = 5' not a proposition in math class?",
    shortAnswer: "Because x is a variable without a specific value, making it an open sentence.",
    explanation: "In algebra, x is unknown. Until x is assigned a number, the equation cannot be evaluated as true or false. Once we say 'Let x = 3', then '3+2=5' becomes a true proposition.",
    hint: "Propositions require all terms to be defined.",
    level: "basic",
    codeExample: "let x;  // undefined\nlet equation = (x + 2 === 5);  // open sentence\nx = 3;\nlet proposition = (x + 2 === 5);  // true proposition"
  },
  {
    question: "Is a hypothetical statement like 'If it rains, the ground will be wet' a proposition?",
    shortAnswer: "Yes, the conditional as a whole is a proposition (true or false).",
    explanation: "The entire 'if-then' statement makes a claim about the relationship between two conditions. It can be evaluated: is it true that whenever it rains, the ground gets wet? That claim is either true (in normal circumstances) or false (if the ground is covered). So conditionals are propositions.",
    hint: "The conditional is a single compound proposition, not an open sentence.",
    level: "moderate",
    codeExample: "let proposition = (isRaining => groundWet);  // true or false as a whole"
  },
  {
    question: "How does programming treat non-propositions?",
    shortAnswer: "Most programming languages require boolean expressions (propositions) in conditions.",
    explanation: "In if, while, for conditions, the expression must evaluate to a boolean (true/false). Non-propositions like commands or questions have no equivalent; assignment statements (x=5) are not propositions (they are commands to assign), but comparison (x==5) is a proposition.",
    hint: "Assignment (=) vs equality (==) — one is command, one is proposition.",
    level: "moderate",
    codeExample: "// Non-proposition (command): x = 5;\n// Proposition (boolean expression): x === 5\nif (x === 5) {  // proposition in condition\n    console.log('x is 5');\n}"
  },
  {
    question: "Is 'This sentence has five words.' a proposition?",
    shortAnswer: "Yes, it is a self-referential but non-paradoxical proposition.",
    explanation: "The sentence refers to itself. Counting the words: 'This', 'sentence', 'has', 'five', 'words' — indeed five. So it is true. Self-reference is allowed as long as it doesn't create a paradox (like 'This sentence is false').",
    hint: "Self-reference alone doesn't break proposition status; only paradoxes do.",
    level: "expert",
    codeExample: "let sentence = 'This sentence has five words.';\nlet wordCount = sentence.split(' ').length;\nlet isTrue = (wordCount === 5);  // true"
  },
  {
    question: "Can a sentence with vague terms like 'tall' be a proposition?",
    shortAnswer: "Only if 'tall' is defined objectively; otherwise it's not a proposition.",
    explanation: "Vague predicates lack precise boundaries. 'Swadeep is tall' — tall relative to what? Without an objective threshold (e.g., height > 180 cm), reasonable people may disagree, so the sentence lacks a definite truth value in classical logic.",
    hint: "Define your terms to turn vague statements into propositions.",
    level: "moderate",
    codeExample: "// Vague: let isTall = true;\n// Precise: let isTall = heightInCm > 180;"
  },
  {
    question: "Why are 'please' and 'thank you' not propositions?",
    shortAnswer: "They are expressive or performative, not declarative.",
    explanation: "'Please' is a polite marker for requests (imperative), 'thank you' expresses gratitude (exclamatory/performative). Neither makes a factual claim that can be true or false. They are social gestures, not propositions.",
    hint: "You can't say 'It is true that please' — it's nonsense.",
    level: "basic",
    codeExample: "// Not propositions:\n// console.log('Please help');\n// console.log('Thank you');\n// Proposition: userSaidPlease = true;"
  },
  {
    question: "Is a mathematical conjecture a proposition?",
    shortAnswer: "Yes, even if unproven, it is a proposition because it is either true or false.",
    explanation: "Goldbach's conjecture ('Every even number >2 is sum of two primes') has a definite truth value in mathematics, even though we don't know which. It is a proposition because it is truth-evaluable in principle. This is the realist view.",
    hint: "Unknown truth value ≠ no truth value. Propositions can be unknown but still truth-apt.",
    level: "expert",
    codeExample: "// Even if we don't know the answer:\nlet goldbachConjecture = true;  // or false, but it's a proposition"
  },
  {
    question: "How does the 'So what?' test help identify non-propositions?",
    shortAnswer: "If asking 'So what?' makes sense, it might be a proposition; if not, it's likely non-proposition.",
    explanation: "Propositions have consequences; you can ask 'So what if it's true?' Non-propositions like commands or exclamations don't invite that question meaningfully. This is a heuristic, not a strict rule.",
    hint: "Test: 'Close the door. So what?' — doesn't make sense. 'It is raining. So what?' — makes sense.",
    level: "moderate",
    codeExample: "// Proposition: isRaining → So what? (wear a coat)\n// Command: closeDoor → So what? (nonsensical)"
  },
  {
    question: "Can a single word be a proposition?",
    shortAnswer: "Yes, if it's a declarative sentence like 'Fire!' (meaning 'There is fire').",
    explanation: "Single-word utterances can be propositions if they implicitly make a claim. 'Fire!' as an exclamation is non-propositional, but as a warning meaning 'There is a fire' it is a proposition. Context matters.",
    hint: "One-word propositions are elliptical; they imply a full declarative sentence.",
    level: "moderate",
    codeExample: "// 'Fire!' as proposition (if it means there is fire)\nlet fireExists = true;\n// As exclamation, non-proposition"
  },
  {
    question: "What is the role of non-propositions in everyday communication?",
    shortAnswer: "They serve social, emotional, and directive functions, not factual reporting.",
    explanation: "Questions gather information, commands direct action, exclamations express emotion, performatives enact social contracts. Logic focuses on propositions, but non-propositions are essential for human interaction.",
    hint: "Not everything needs to be true/false; non-propositions have other uses.",
    level: "basic",
    codeExample: "// Non-propositions are useful:\n// askQuestion('What time?');\n// giveCommand('Stop');\n// expressEmotion('Hurray!');"
  },
  {
    question: "Is a sentence with a universal quantifier like 'All students passed' a proposition?",
    shortAnswer: "Yes, it is a proposition (it is either true or false).",
    explanation: "Even though it quantifies over a domain, the statement makes a definite claim about the world. It can be verified (by checking each student's result) and thus has a truth value. This is a proposition, though predicate logic is needed to analyze its internal structure.",
    hint: "Quantified statements are propositions; they are just not atomic in predicate logic.",
    level: "moderate",
    codeExample: "let allPassed = students.every(s => s.score >= 40);  // proposition"
  },
  {
    question: "Why is 'The current King of France is bald' considered a proposition by some logicians?",
    shortAnswer: "It is a proposition (false) under Russell's theory of descriptions.",
    explanation: "Bertrand Russell argued that such statements are meaningful and false because there is no current King of France. The statement asserts existence and uniqueness, and since those fail, the whole is false. So it has a truth value, hence a proposition.",
    hint: "Even referring expressions that fail can result in false propositions, not nonsense.",
    level: "expert",
    codeExample: "let currentKingOfFrance = null;\nlet isBald = (currentKingOfFrance && currentKingOfFrance.isBald) || false;  // false proposition"
  },
  {
    question: "Is a conditional with a false antecedent still a proposition?",
    shortAnswer: "Yes, it is a proposition (true by material implication).",
    explanation: "In propositional logic, 'If false then anything' is considered true. The conditional statement as a whole has a truth value (true) and is therefore a proposition, even if the antecedent is false.",
    hint: "Truth of conditional depends on the relationship, not just the parts in isolation.",
    level: "moderate",
    codeExample: "let p = false;\nlet q = true;\nlet implication = (!p || q);  // true proposition"
  },
  {
    question: "How do you handle indexicals like 'I' or 'now' in proposition classification?",
    shortAnswer: "They are propositions once the context fixes reference; otherwise open sentences.",
    explanation: "'I am hungry' is a proposition when uttered by a specific speaker at a specific time — it can be true or false. Without context (who is 'I'?), it's an open sentence. In logic, we often treat them as propositions after fixing the context.",
    hint: "Indexicals depend on context; in a fixed context, they yield propositions.",
    level: "expert",
    codeExample: "let speaker = { name: 'Abhronila', isHungry: true };\nlet proposition = speaker.isHungry;  // true or false"
  },
  {
    question: "Is '2 + 2 = 5' a proposition?",
    shortAnswer: "Yes, it is a false proposition.",
    explanation: "Being false does not disqualify a statement from being a proposition. The sentence is declarative and has a definite truth value (false). So it is a proposition.",
    hint: "False propositions are still propositions.",
    level: "basic",
    codeExample: "let sum = 2 + 2;\nlet isEqual = (sum === 5);  // false, but a proposition"
  },
  {
    question: "Can a non-proposition be used as a premise in a logical argument?",
    shortAnswer: "No, only propositions can serve as premises or conclusions.",
    explanation: "Logical arguments require statements that can be true or false to evaluate validity. Non-propositions (questions, commands) have no truth value, so they cannot be premises. However, you can reason about non-propositions by turning them into propositions (e.g., 'He asked a question').",
    hint: "Arguments need truth-evaluable statements.",
    level: "moderate",
    codeExample: "// Invalid premise: 'Please sit down' (not a proposition)\n// Valid premise: 'He said please sit down' (proposition)"
  },
  {
    question: "What is the difference between a proposition and a sentence in linguistics?",
    shortAnswer: "Proposition is the meaning/content; sentence is the syntactic form.",
    explanation: "A sentence is a grammatical string. A proposition is the abstract truth-evaluable content. Different sentences can express the same proposition ('It's raining' and 'Il pleut'). Non-propositional sentences express no proposition.",
    hint: "Proposition is what is said; sentence is how it's said.",
    level: "expert",
    codeExample: "// Two sentences, same proposition:\n// 'The sky is blue' and 'The sky is azure'\nlet proposition = (skyColor === 'blue');"
  },
  {
    question: "Why is 'Maybe it will rain' not a proposition?",
    shortAnswer: "Because 'maybe' indicates uncertainty, not a definite truth claim.",
    explanation: "The word 'maybe' expresses possibility, not actuality. The statement does not assert that it will rain; it asserts that rain is possible. In classical logic, modal statements can be propositions if we interpret them as 'It is possible that it rains', which has a truth value (true if rain is not impossible).",
    hint: "Modal logic treats 'possibly' as a propositional operator; but in basic logic, such vagueness often excludes it.",
    level: "moderate",
    codeExample: "// 'Maybe it will rain' → convert to proposition:\nlet rainPossible = true;  // or false if rain is impossible"
  },
  {
    question: "How do you teach the difference between propositions and non-propositions effectively?",
    shortAnswer: "Use the 'true/false test' and many contrasting examples.",
    explanation: "Give students a list of sentences and ask them to assign true/false. For non-propositions, they will see it's impossible. Emphasize that false propositions are still propositions. Use role-play: act out commands and questions, then ask 'Can this be true?'",
    hint: "Practice with real-life sentences from Shyamnagar, Barrackpore, Naihati.",
    level: "basic",
    codeExample: "// Exercise: classify each\n// 'Close the window.' → non-prop\n// 'The window is closed.' → proposition (could be true/false)"
  },
  {
    question: "Is a tautology like 'It will rain or it will not rain' a proposition?",
    shortAnswer: "Yes, it is a proposition (a true one).",
    explanation: "Tautologies are compound propositions that are true in all possible circumstances. They have a definite truth value (true), so they are propositions. The fact that they are always true doesn't make them non-propositions.",
    hint: "Always-true propositions are still propositions.",
    level: "moderate",
    codeExample: "let p = isRaining;\nlet tautology = p || !p;  // always true, but a proposition"
  }
];

export default questions;