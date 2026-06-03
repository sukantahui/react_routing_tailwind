// topic1_files/topic1_questions.js
const questions = [
  {
    question: "What is a proposition in logic?",
    shortAnswer: "A declarative sentence that is either true or false.",
    explanation: "A proposition (or statement) is a sentence that asserts a fact and can be assigned a truth value of either True or False, but not both. Questions, commands, and exclamations are not propositions.",
    hint: "Ask: Can I put 'It is true that...' before the sentence?",
    level: "basic",
    codeExample: "// Boolean variables in programming are propositions\nlet isRaining = true;   // proposition with value True\nlet isWeekend = false;  // proposition with value False"
  },
  {
    question: "Is 'What time is it?' a proposition? Why?",
    shortAnswer: "No, because it is a question, not a declarative statement.",
    explanation: "Questions are interrogative sentences that request information but do not assert anything that can be true or false. Only declarative sentences can be propositions.",
    hint: "Try to assign a truth value to a question — it doesn't make sense.",
    level: "basic",
    codeExample: "// Not a proposition:\n// let answer = prompt('What time is it?');  // This is a question, not a boolean"
  },
  {
    question: "Can a command be a proposition?",
    shortAnswer: "No, commands are imperative sentences and lack truth value.",
    explanation: "Commands (imperatives) like 'Close the door' or 'Study hard' do not assert facts; they request actions. They cannot be evaluated as true or false, so they are not propositions.",
    hint: "Think: Can you say 'It is true that close the door'? No.",
    level: "basic",
    codeExample: "// Not a proposition:\nconsole.log('Please sit down');  // Command/request"
  },
  {
    question: "What are the two possible truth values of a proposition?",
    shortAnswer: "True (T) and False (F).",
    explanation: "In classical propositional logic, every proposition has exactly one of two truth values: true (T, 1) or false (F, 0). This is called the principle of bivalence.",
    hint: "Think binary: 0 or 1, on or off, yes or no.",
    level: "basic",
    codeExample: "let isComplete = true;   // truth value T\nlet hasError = false;   // truth value F"
  },
  {
    question: "Is 'This statement is false' a proposition?",
    shortAnswer: "No, it's a paradox with no consistent truth value.",
    explanation: "If it is true, then it says it is false → contradiction. If it is false, then it says it is false is false → meaning it is true → contradiction. This self-referential paradox violates the requirement that a proposition must be either true or false, not both or neither.",
    hint: "Try assigning a truth value and see what happens — it leads to a loop.",
    level: "moderate",
    codeExample: "// This would cause infinite recursion in code:\n// let paradox = !paradox;  // Not allowed in any language"
  },
  {
    question: "Is 'x + 2 = 7' a proposition?",
    shortAnswer: "No, because x is a variable without a specific value.",
    explanation: "This is an open sentence. Its truth value depends on the value of x. Without binding x to a specific number, we cannot determine if it's true or false. Once x is assigned (e.g., x=5), it becomes a proposition.",
    hint: "A proposition must have a definite truth value at the time of evaluation.",
    level: "moderate",
    codeExample: "let x;                // undefined\n// let equation = (x + 2 === 7);  // Not a proposition yet\nx = 5;\nlet equation = (x + 2 === 7);  // Now it's a proposition (false)"
  },
  {
    question: "Is 'Swadeep lives in Barrackpore' a proposition?",
    shortAnswer: "Yes, it is a declarative statement that can be verified as true or false.",
    explanation: "Assuming we can check Swadeep's residence, this sentence makes a factual claim. It is either true (if he does live there) or false (if he doesn't). Therefore it qualifies as a proposition.",
    hint: "Can we gather evidence to confirm or deny the statement?",
    level: "basic",
    codeExample: "let swadeepAddress = 'Barrackpore';\nlet livesInBarrackpore = (swadeepAddress === 'Barrackpore');  // proposition"
  },
  {
    question: "Why are opinions like 'Chocolate is delicious' not considered propositions?",
    shortAnswer: "Because deliciousness is subjective and not objectively verifiable.",
    explanation: "A proposition requires objective verification. 'Chocolate is delicious' depends on personal taste; what's delicious to one person may not be to another. To make it a proposition, we need an objective measure, e.g., '85% of surveyed people said chocolate is delicious'.",
    hint: "Ask: Could two reasonable people disagree without one being wrong? If yes, it's likely not a proposition.",
    level: "moderate",
    codeExample: "// Not a proposition:\n// let isDelicious = true;  // Subjective\n// Proposition:\nlet likePercentage = 85;\nlet majorityLikes = likePercentage > 50;  // Objective"
  },
  {
    question: "Is 'It will rain tomorrow' a proposition?",
    shortAnswer: "In classical logic, no, because its truth value is not yet determined.",
    explanation: "Classical propositional logic requires a definite truth value at the time of evaluation. Future contingents cannot be verified as true or false today. Some extended logics (temporal logic) handle future statements, but in basic propositional logic, they are not considered propositions.",
    hint: "Can you determine now, with certainty, whether it will rain tomorrow?",
    level: "expert",
    codeExample: "// In programming, we might still use it, but it's a prediction, not a fact:\nlet rainForecast = getWeatherForecast();  // Not a proposition until tomorrow"
  },
  {
    question: "Is 'The Earth is flat' a proposition?",
    shortAnswer: "Yes, it is a proposition, even though it is false.",
    explanation: "Being false does not disqualify a statement from being a proposition. The statement makes a definite claim that can be verified (and is false). Propositions can be either true or false — both are valid truth values.",
    hint: "False propositions are still propositions.",
    level: "basic",
    codeExample: "let earthIsFlat = false;  // This is a valid proposition (false)"
  },
  {
    question: "What is the difference between a proposition and a sentence?",
    shortAnswer: "All propositions are sentences, but not all sentences are propositions.",
    explanation: "Sentences include declarative, interrogative, imperative, and exclamatory types. Only declarative sentences that assert a truth-evaluable claim are propositions. Questions, commands, and exclamations are sentences but not propositions.",
    hint: "Think of propositions as a subset of sentences — the ones that can be true or false.",
    level: "basic",
    codeExample: "// Sentences:\n'Hello' (exclamation) → not a proposition\n'What time is it?' (question) → not a proposition\n'The sky is blue' (declarative) → proposition"
  },
  {
    question: "Can a proposition be both true and false?",
    shortAnswer: "No, that violates the principle of non-contradiction.",
    explanation: "In classical logic, a proposition cannot be simultaneously true and false. It must have exactly one truth value. Statements that appear to be both (like 'This sentence is false') are paradoxes and are not considered valid propositions.",
    hint: "Truth is exclusive: T or F, never both.",
    level: "moderate",
    codeExample: "// Cannot happen:\n// let p = true && false;  // Not allowed as a single proposition's value"
  },
  {
    question: "Is 'Abhronila scored 95% on her exam' a proposition?",
    shortAnswer: "Yes, if we can verify her actual score.",
    explanation: "This is a factual claim about a specific person's performance. Assuming we have access to her exam record, we can determine if the statement is true or false. Therefore it is a proposition.",
    hint: "Specific, verifiable claims are usually propositions.",
    level: "basic",
    codeExample: "let actualScore = 95;\nlet abhronilaScored95 = (actualScore === 95);  // proposition (true or false)"
  },
  {
    question: "How does propositional logic handle ambiguous statements like 'She is tall'?",
    shortAnswer: "It requires disambiguation or is not a valid proposition.",
    explanation: "'She is tall' is ambiguous because 'tall' lacks a precise definition. To become a proposition, we must define 'tall' objectively, e.g., 'Her height > 170 cm'. Without such definition, the truth value cannot be determined, so it is not a proposition in classical logic.",
    hint: "If reasonable people could disagree due to vagueness, it's not a proposition.",
    level: "moderate",
    codeExample: "// Vague:\n// let isTall = true;\n// Clear proposition:\nlet height = 175;  // cm\nlet isTall = height > 170;  // Now objective"
  },
  {
    question: "Is '2 + 2 = 5' a proposition?",
    shortAnswer: "Yes, it is a false proposition.",
    explanation: "It is a declarative mathematical statement that makes a definite claim. The claim is false (since 2+2=4), but it is still a proposition because it has a truth value (false).",
    hint: "False statements are still propositions.",
    level: "basic",
    codeExample: "let sum = 2 + 2;\nlet isEqual = (sum === 5);  // false, but still a proposition"
  },
  {
    question: "Why are performative utterances like 'I promise to pay you' not propositions?",
    shortAnswer: "They perform an action rather than asserting a fact.",
    explanation: "Performative utterances (e.g., 'I promise', 'I apologize', 'I declare') are actions in themselves, not descriptions of facts. They cannot be evaluated as true or false — they are either sincere or insincere, but that's a different dimension.",
    hint: "Saying 'I promise' creates a promise, it doesn't report a fact.",
    level: "expert",
    codeExample: "// Not a proposition:\n// console.log('I promise');  // Performative\n// Instead, the fact that a promise was made can be a proposition:\nlet promiseMade = true;  // That is a proposition"
  },
  {
    question: "What is an open sentence in logic?",
    shortAnswer: "A statement containing free variables whose truth value depends on variable values.",
    explanation: "Open sentences like 'x > 5' or 'He lives in Shyamnagar' are not propositions until the variables (x, 'he') are assigned specific values. They become propositions when the variables are bound or quantified.",
    hint: "Look for words like 'somebody', 'something', or variables like x, y.",
    level: "moderate",
    codeExample: "// Open sentence:\n// let isGreater = x > 5;   // x undefined\n// Closed proposition:\nlet x = 10;\nlet isGreater = x > 5;   // true"
  },
  {
    question: "Can a sentence with a pronoun be a proposition?",
    shortAnswer: "Yes, if the pronoun's referent is clear and fixed.",
    explanation: "'He is a teacher' can be a proposition if 'he' refers to a specific person (e.g., Mr. Das). Without a clear referent, it's an open sentence. Once the referent is known, we can verify the claim.",
    hint: "Pronouns must have antecedents. 'He' is ambiguous until we know who 'he' is.",
    level: "moderate",
    codeExample: "let person = { name: 'Mr. Das', job: 'teacher' };\nlet isTeacher = (person.job === 'teacher');  // proposition (true)"
  },
  {
    question: "What role do truth values play in database queries?",
    shortAnswer: "WHERE clause conditions are propositions evaluated per row.",
    explanation: "Each row in a database is evaluated against a proposition (condition). If the proposition evaluates to true, the row is included; if false, it's excluded. This is a direct application of propositional logic.",
    hint: "Think of each row as a possible world, and the WHERE clause as a proposition to test.",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE city = 'Naihati' AND age >= 18;\n-- For each row, (city='Naihati' AND age>=18) is a proposition evaluated to T or F"
  },
  {
    question: "How can you test if a sentence is a proposition?",
    shortAnswer: "Try to assign it a truth value of True or False.",
    explanation: "The definitive test: Can you reasonably say 'It is true that...' or 'It is false that...'? If yes, and the statement is declarative, it's a proposition. If the sentence makes no sense when prefixed that way, it's not a proposition.",
    hint: "Prefix with 'It is true that...' — does the resulting sentence make sense?",
    level: "basic",
    codeExample: "// Test:\n// 'It is true that the sky is blue' → makes sense → proposition\n// 'It is true that please sit down' → nonsense → not a proposition"
  },
  {
    question: "Is a scientific hypothesis a proposition?",
    shortAnswer: "Yes, hypotheses are propositions that can be tested for truth.",
    explanation: "A hypothesis like 'Increasing study time improves test scores' is a proposition — it makes a definite claim that can be empirically tested and found true or false (within confidence intervals). This is the basis of the scientific method.",
    hint: "Science uses propositions that are falsifiable — they can be proven false by evidence.",
    level: "moderate",
    codeExample: "let studyTime = 10;  // hours\nlet testScore = 90;\nlet hypothesis = (studyTime > 5 && testScore > 85);  // testable proposition"
  },
  {
    question: "What is the principle of bivalence?",
    shortAnswer: "Every proposition is either true or false, not both, not neither.",
    explanation: "Bivalence is a foundational principle of classical logic. It asserts that there are exactly two truth values, and every proposition takes exactly one of them. This excludes many-valued logics, fuzzy logic, and truth-value gaps.",
    hint: "Binary logic: only two options.",
    level: "expert",
    codeExample: "// Bivalence in code: boolean values are only true or false\nlet x: boolean = true;   // valid\nlet y: boolean = false;  // valid\n// let z: boolean = 'maybe';  // not allowed in typed boolean systems"
  },
  {
    question: "Can a proposition be about the future in programming?",
    shortAnswer: "In code, we treat future conditions as propositions at evaluation time.",
    explanation: "While philosophical logic may reject future contingents, programming languages evaluate conditions at runtime. 'If (date > deadline)' is evaluated at that moment, with the future date compared to current time — it yields a definite boolean value.",
    hint: "Computers don't worry about metaphysics; they evaluate expressions now.",
    level: "moderate",
    codeExample: "let deadline = new Date('2025-12-31');\nlet isPastDeadline = (new Date() > deadline);  // Evaluates to true or false now"
  },
  {
    question: "Why is 'This sentence has five words.' a proposition?",
    shortAnswer: "Because it is a declarative sentence that can be verified as true or false.",
    explanation: "The sentence refers to itself (self-referential) but not paradoxically. It claims to have five words. Counting the words: 'This', 'sentence', 'has', 'five', 'words' — indeed five. So it's true. Self-reference is allowed as long as it doesn't create a paradox.",
    hint: "Self-reference is not automatically paradoxical — only when it creates contradictions.",
    level: "expert",
    codeExample: "let sentence = 'This sentence has five words.';\nlet wordCount = sentence.split(' ').length;\nlet isTrue = (wordCount === 5);  // true"
  },
  {
    question: "How do you represent a proposition in symbolic logic?",
    shortAnswer: "Using propositional variables like p, q, r.",
    explanation: "Symbolic logic abstracts away content, representing propositions with letters. For example, p could stand for 'Tuhina studies in Shyamnagar'. This allows manipulation of logical relationships without worrying about the specific meaning.",
    hint: "Think of p, q, r as placeholders for complete true/false statements.",
    level: "basic",
    codeExample: "let p = (age >= 18);   // p represents the proposition 'age >= 18'\nlet q = hasLicense;     // q represents 'hasLicense'"
  },
  {
    question: "What is the difference between a proposition and a fact?",
    shortAnswer: "A proposition is a statement; a fact is a true proposition.",
    explanation: "A proposition is any declarative sentence that can be true or false. A fact is a proposition that is actually true (corresponds to reality). False propositions are not facts. All facts are propositions, but not all propositions are facts.",
    hint: "Facts are a subset of propositions — the true ones.",
    level: "moderate",
    codeExample: "let proposition1 = 'The sky is green';   // proposition (false)\nlet proposition2 = 'The sky is blue';   // proposition (true, also a fact)\n// Both are propositions, only proposition2 is a fact"
  },
  {
    question: "Is a rhetorical question a proposition?",
    shortAnswer: "No, because it's still a question, not a declarative statement.",
    explanation: "Rhetorical questions like 'Who knows?' or 'Isn't it obvious?' are not meant to be answered; they are stylistic devices. However, they do not assert a truth-evaluable claim. They remain non-propositions.",
    hint: "Even if the answer seems obvious, the form is still interrogative, not declarative.",
    level: "moderate",
    codeExample: "// Not a proposition:\n// 'Isn't the sky blue?' (rhetorical question)\n// Proposition:\n'The sky is blue.' (declarative)"
  },
  {
    question: "Can a proposition contain a logical operator?",
    shortAnswer: "Yes, compound propositions combine simple propositions using operators.",
    explanation: "While atomic propositions are simple statements, compound propositions (e.g., p ∧ q, p ∨ q) are also propositions — they have truth values determined by their components and the operators. The result is still either true or false.",
    hint: "Operators combine propositions to form new propositions.",
    level: "basic",
    codeExample: "let p = (age >= 18);\nlet q = hasLicense;\nlet canDrive = p && q;  // compound proposition (true only if both true)"
  },
  {
    question: "Why do we need the concept of a proposition in computer science?",
    shortAnswer: "It formalizes conditions, decisions, and boolean logic in programming.",
    explanation: "Every if-statement condition, while-loop condition, and boolean expression is a proposition. Understanding propositions helps programmers write clear conditions, avoid logical errors, and design correct algorithms.",
    hint: "Your code's decision points all evaluate propositions.",
    level: "moderate",
    codeExample: "if (user.isLoggedIn && user.hasPermission) {\n    // The condition is a compound proposition\n    // It must evaluate to true to enter this block\n}"
  },
  {
    question: "What is a truth value gap?",
    shortAnswer: "A situation where a statement lacks a definite truth value (neither true nor false).",
    explanation: "Some logics allow truth value gaps for paradoxical or vague statements. Classical propositional logic rejects gaps, insisting every proposition is either true or false. Truth value gaps appear in many-valued logics or when dealing with future contingents.",
    hint: "Classical logic: no gaps. Non-classical logics: sometimes gaps.",
    level: "expert",
    codeExample: "// In classical logic, this is not allowed:\n// let p; // p has no truth value\n// But in code, uninitialized booleans are errors, not gaps"
  },
  {
    question: "How can you identify a proposition in a legal document?",
    shortAnswer: "Look for declarative clauses that assert facts subject to verification.",
    explanation: "Legal documents contain both performative ('The parties agree to...') and declarative ('The defendant was present on the date'). The declarative statements are propositions because they can be proven true or false with evidence.",
    hint: "Legal facts are propositions: 'The contract was signed on Jan 1' can be true or false.",
    level: "moderate",
    codeExample: "// Proposition in legal context:\nlet signedDate = new Date('2024-01-01');\nlet wasSignedOnTime = (signedDate <= deadline);  // verifiable"
  }
];

export default questions;