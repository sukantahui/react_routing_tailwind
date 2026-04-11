// topic0_files/topic0_questions.js
const questions = [
  {
    question: "What is a proposition in logic?",
    shortAnswer: "A declarative sentence that is either true or false.",
    explanation: "A proposition is a statement that makes a claim that can be objectively verified as either true or false. It cannot be both true and false simultaneously. Examples include 'The sky is blue' (true) and '2+2=5' (false). Questions, commands, and opinions are not propositions.",
    hint: "Ask yourself: Can this sentence be assigned a truth value of either T or F?",
    level: "basic",
    codeExample: "// In programming, conditions are propositions\nlet isRaining = true;  // proposition with value true\nlet age = 18;\nlet canVote = age >= 18;  // proposition (true/false)"
  },
  {
    question: "Can a question be considered a proposition? Why?",
    shortAnswer: "No, questions cannot be propositions because they lack a truth value.",
    explanation: "Questions ask for information but do not assert anything that can be true or false. For example, 'What is your name?' cannot be evaluated as true or false. Only declarative statements that make a claim can be propositions.",
    hint: "Think about whether you can answer a question with 'true' or 'false'.",
    level: "basic",
    codeExample: "// Questions in code don't evaluate to boolean directly\n// let userInput = prompt('What is your name?'); // Not a proposition"
  },
  {
    question: "What are the two possible truth values in classical propositional logic?",
    shortAnswer: "True (T) and False (F).",
    explanation: "Classical propositional logic operates on the principle of bivalence, meaning every proposition has exactly one of two truth values: true or false. This binary nature makes it ideal for computer science and digital electronics.",
    hint: "Think of binary: 0 and 1, on and off, yes and no.",
    level: "basic",
    codeExample: "// Boolean values in programming\nlet isComplete = true;   // Truth value T\nlet hasError = false;    // Truth value F"
  },
  {
    question: "Why is propositional logic important in computer science?",
    shortAnswer: "It forms the basis for Boolean algebra, conditional statements, and digital circuit design.",
    explanation: "Propositional logic is fundamental to programming (if-else conditions, loops), database queries (WHERE clauses), artificial intelligence (rule-based systems), and hardware design (logic gates). Understanding logic helps write bug-free code and design efficient algorithms.",
    hint: "Consider how your computer makes decisions using true/false conditions.",
    level: "moderate",
    codeExample: "// If-else statements use propositional logic\nif (user.isLoggedIn && user.hasPermission) {\n    showDashboard();  // Both propositions must be true\n}"
  },
  {
    question: "What is the difference between a proposition and a non-proposition?",
    shortAnswer: "Propositions have truth values; non-propositions (questions, commands, exclamations) do not.",
    explanation: "Propositions make assertions that can be verified. Non-propositions include interrogative sentences (questions), imperative sentences (commands), exclamatory sentences (expressions of emotion), and performative utterances ('I promise').",
    hint: "Test each sentence: Can I put 'It is true that...' in front of it?",
    level: "basic",
    codeExample: "// Proposition: x > 5 (evaluates to true/false)\n// Non-proposition: console.log('Hello') (doesn't evaluate to boolean)"
  },
  {
    question: "How does propositional logic apply to legal reasoning?",
    shortAnswer: "Laws are expressed as conditional statements that determine legal outcomes.",
    explanation: "Legal systems use propositional logic to define crimes and punishments. For example: 'If a person commits theft AND the value exceeds $500, THEN it is a felony.' Courts evaluate the truth of each proposition (did theft occur? was value > $500?) to reach a verdict.",
    hint: "Think about how judges apply 'if-then' rules to evidence.",
    level: "moderate",
    codeExample: "// Legal rule as logical expression\nlet committedTheft = true;\nlet valueExceeds500 = true;\nlet isFelony = committedTheft && valueExceeds500;  // true"
  },
  {
    question: "What makes a statement 'declarative'?",
    shortAnswer: "A declarative statement asserts a fact or makes a claim that can be true or false.",
    explanation: "Declarative sentences state information rather than asking, commanding, or exclaiming. They typically have a subject and predicate and can be negated. 'Swadeep studies in Barrackpore' is declarative; 'Study hard!' is imperative.",
    hint: "Look for statements that end with a period and make a claim.",
    level: "basic",
    codeExample: "// Declarative in code: variable assignments with conditions\nlet isStudent = (age >= 5 && age <= 22);  // Makes a claim"
  },
  {
    question: "Can opinions be propositions?",
    shortAnswer: "Only if they can be objectively verified as true or false.",
    explanation: "Subjective opinions like 'Chocolate is delicious' are not propositions because deliciousness is a matter of personal taste, not objective truth. However, 'Most people prefer chocolate' can be verified through surveys, making it a proposition.",
    hint: "Ask: Could we prove this statement using facts or evidence?",
    level: "moderate",
    codeExample: "// Subjective: let isDelicious = true; (depends on person)\n// Objective: let majorityPreferChocolate = surveyResult > 50;"
  },
  {
    question: "What role does propositional logic play in search engines?",
    shortAnswer: "Search engines use logical operators (AND, OR, NOT) to refine queries.",
    explanation: "When you search for 'Apple AND iPhone NOT fruit', you're using propositional logic. The search engine evaluates each document against these logical conditions, returning only those that satisfy the propositional expression.",
    hint: "Notice how advanced search options use AND, OR, and NOT.",
    level: "moderate",
    codeExample: "// Search query as logical expression\nlet results = documents.filter(doc => \n    doc.contains('Apple') && \n    doc.contains('iPhone') && \n    !doc.contains('fruit')\n);"
  },
  {
    question: "How does propositional logic relate to database queries?",
    shortAnswer: "SQL WHERE clauses are propositional expressions evaluated for each record.",
    explanation: "Database queries use logical operators to filter records. 'SELECT * FROM students WHERE age > 18 AND city = 'Naihati'' evaluates a proposition for each row. Only rows where the proposition is true are returned.",
    hint: "Each WHERE condition is a proposition that must be true for the row to be selected.",
    level: "moderate",
    codeExample: "SELECT * FROM employees \nWHERE salary > 50000 AND (department = 'IT' OR department = 'Engineering');"
  },
  {
    question: "What is a tautology in propositional logic?",
    shortAnswer: "A compound statement that is always true regardless of the truth values of its components.",
    explanation: "Tautologies are logically valid statements that hold true in every possible scenario. Examples include 'p OR NOT p' (law of excluded middle) and 'If p THEN p'. Tautologies are essential for logical proofs and reasoning.",
    hint: "Think of statements that cannot possibly be false, like 'It will rain or it won't rain'.",
    level: "moderate",
    codeExample: "// Tautology in code: always true\nlet alwaysTrue = (x > 0) || !(x > 0);  // Always evaluates to true"
  },
  {
    question: "What is a contradiction in propositional logic?",
    shortAnswer: "A compound statement that is always false regardless of the truth values of its components.",
    explanation: "Contradictions are logically impossible statements that are false in every possible scenario. 'p AND NOT p' is the classic example. Detecting contradictions helps identify logical errors in arguments and code.",
    hint: "Look for statements that assert something and its opposite simultaneously.",
    level: "moderate",
    codeExample: "// Contradiction: always false\nlet alwaysFalse = (x > 5) && !(x > 5);  // Never true"
  },
  {
    question: "How do you represent logical variables in propositional logic?",
    shortAnswer: "Using lowercase letters like p, q, r, s, or descriptive names.",
    explanation: "Variables represent simple propositions. For example, p could stand for 'Abhronila is from Shyamnagar', q for 'Susmita studies mathematics'. This symbolic representation allows manipulation of logical relationships without dealing with the content.",
    hint: "Think of variables as placeholders for complete statements that can be true or false.",
    level: "basic",
    codeExample: "let p = (temperature > 30);  // p: 'It is hot'\nlet q = (humidity > 70);    // q: 'It is humid'"
  },
  {
    question: "What is the difference between simple and compound propositions?",
    shortAnswer: "Simple propositions contain no logical operators; compound propositions combine multiple propositions with operators.",
    explanation: "A simple proposition (atomic) is a single declarative statement like 'Debangshu plays cricket'. A compound proposition uses operators like AND, OR, NOT to combine simple propositions: 'Debangshu plays cricket AND Tuhina studies'.",
    hint: "Look for connecting words like 'and', 'or', 'not', 'if...then' to identify compound propositions.",
    level: "basic",
    codeExample: "// Simple\nlet isSunny = true;\n// Compound\nlet goToPark = isSunny && !isRaining;"
  },
  {
    question: "Why can't we use propositional logic for statements with quantifiers like 'all' or 'some'?",
    shortAnswer: "Propositional logic lacks quantifiers; predicate logic handles such statements.",
    explanation: "Propositional logic treats statements as atomic wholes. 'All students in Barrackpore study' requires analyzing 'for every student x, x studies', which needs predicate logic with quantifiers (∀, ∃). Propositional logic would require listing each student individually.",
    hint: "Notice that 'all' refers to an entire collection, not a single proposition.",
    level: "expert",
    codeExample: "// Propositional can't express: All students passed\n// Need predicate: ∀x (Student(x) → Passed(x))\n// Propositional would need: Student1Passed AND Student2Passed AND ..."
  },
  {
    question: "How does propositional logic help in debugging code?",
    shortAnswer: "It helps analyze conditional statements and find logical errors.",
    explanation: "When debugging, you can represent code conditions as logical expressions and test all possible truth combinations. For example, a complex if-else if chain can be analyzed for coverage gaps or impossible conditions (contradictions).",
    hint: "Draw truth tables for complex conditions to verify all branches are reachable.",
    level: "moderate",
    codeExample: "// Debug: Find if all conditions are possible\nif (x > 0 && x < 10) { }\nelse if (x > 5 && x < 15) { }  // Overlap exists"
  },
  {
    question: "What is the law of excluded middle in propositional logic?",
    shortAnswer: "For any proposition p, either p is true or its negation is true (p ∨ ¬p).",
    explanation: "This fundamental law states there's no middle ground between true and false. Every proposition must be either true or false. This principle enables proof by contradiction and is essential for classical logic.",
    hint: "There's no third option; every statement is either true or false, never both or neither.",
    level: "moderate",
    codeExample: "// In code, every boolean expression is either true or false\nlet result = (age >= 18);  // No third possibility"
  },
  {
    question: "How do you convert natural language statements to logical expressions?",
    shortAnswer: "Identify propositions, assign variables, then replace logical connectives with operators.",
    explanation: "Step 1: Break into atomic propositions. Step 2: Replace 'and' with ∧, 'or' with ∨, 'not' with ~, 'if...then' with →, 'if and only if' with ↔. Step 3: Add parentheses for clarity. Example: 'If Swadeep studies and Tuhina helps, then they will pass' becomes (p ∧ q) → r.",
    hint: "Look for key words: 'and', 'or', 'not', 'if', 'then', 'only if'.",
    level: "moderate",
    codeExample: "// English: 'You can drive if you are 18 or older AND have a license'\nlet canDrive = (age >= 18) && hasLicense;"
  },
  {
    question: "What is logical equivalence?",
    shortAnswer: "Two propositions are logically equivalent if they have identical truth values in all scenarios.",
    explanation: "Logical equivalence (≡) means the statements are interchangeable in any logical context. For example, p → q (if p then q) is equivalent to ¬p ∨ q (not p or q). Recognizing equivalences simplifies complex logical expressions.",
    hint: "Check equivalence by constructing truth tables for both statements and comparing columns.",
    level: "moderate",
    codeExample: "// These two conditions are logically equivalent\nlet cond1 = !(isRaining && isCold);\nlet cond2 = !isRaining || !isCold;  // De Morgan's Law"
  },
  {
    question: "Why is propositional logic called 'sentential logic'?",
    shortAnswer: "Because it deals with whole sentences (propositions) as units rather than their internal structure.",
    explanation: "'Sentential' comes from 'sentence' - the basic unit is the complete sentence/proposition. Unlike predicate logic which analyzes subjects and predicates, propositional logic treats 'It is raining' as an indivisible atomic unit.",
    hint: "Think of each sentence as a single block that's either true or false.",
    level: "basic",
    codeExample: "// Each condition is a complete sentence unit\nlet isRaining = true;      // One sentence\nlet isCold = false;        // Another sentence"
  },
  {
    question: "How does propositional logic apply to game development?",
    shortAnswer: "Game logic uses propositions for win conditions, collisions, and AI decisions.",
    explanation: "Games evaluate propositions constantly: 'Is player health > 0?' AND 'Is enemy in range?' THEN 'Attack'. Win conditions are compound propositions: (score ≥ 100) OR (timeExpired AND hasKey). Understanding logic helps create bug-free game mechanics.",
    hint: "Every 'if' statement in game code evaluates a proposition.",
    level: "moderate",
    codeExample: "// Game win condition\nlet gameWon = (enemiesDefeated === totalEnemies) && \n             (playerHealth > 0) && \n             (keyCollected || level === 1);"
  },
  {
    question: "What is the difference between logical AND and logical OR?",
    shortAnswer: "AND (∧) is true only if both operands are true; OR (∨) is true if at least one operand is true.",
    explanation: "AND requires all conditions to be met (strict). OR requires any condition to be met (flexible). In programming, && short-circuits if first operand is false; || short-circuits if first operand is true.",
    hint: "AND = 'all must be true', OR = 'at least one true'.",
    level: "basic",
    codeExample: "// AND: Both conditions must hold\nif (age >= 18 && hasLicense) { drive(); }\n// OR: Either condition can hold\nif (isWeekend || isHoliday) { relax(); }"
  },
  {
    question: "How do you determine if a statement is a proposition when it contains vague terms?",
    shortAnswer: "If vagueness prevents objective truth evaluation, it's not a valid proposition in classical logic.",
    explanation: "Statements like 'Susmita is tall' depend on subjective definitions of 'tall'. To make it a proposition, you must define the term objectively: 'Susmita's height > 170 cm'. Without clear criteria, truth value cannot be determined.",
    hint: "Vague statements need precise definitions before they can be evaluated as true/false.",
    level: "expert",
    codeExample: "// Vague: let isTall = true; (depends on definition)\n// Precise: let isTall = heightInCm > 170; (objective)"
  },
  {
    question: "What is the role of truth tables in propositional logic?",
    shortAnswer: "Truth tables systematically show truth values of compound statements for all possible input combinations.",
    explanation: "Truth tables list every possible truth assignment to atomic propositions and compute the resulting truth value of compound expressions. They're used to prove logical equivalences, identify tautologies/contradictions, and verify argument validity.",
    hint: "For n atomic propositions, you need 2^n rows in your truth table.",
    level: "moderate",
    codeExample: "// Truth table for AND\n// p | q | p∧q\n// T | T | T\n// T | F | F\n// F | T | F\n// F | F | F"
  },
  {
    question: "How does propositional logic relate to circuit design?",
    shortAnswer: "Logic gates implement propositional operators physically in electronic circuits.",
    explanation: "AND gates output high voltage only when both inputs are high (p∧q). OR gates output high when at least one input is high (p∨q). NOT gates invert input (~p). Complex circuits combine these gates, just as compound propositions combine operators.",
    hint: "Each logic gate corresponds exactly to a logical operator.",
    level: "moderate",
    codeExample: "// Circuit: (A AND B) OR NOT C\n// Hardware: AND gate output connects to OR gate input along with NOT C"
  },
  {
    question: "What is a contingency in propositional logic?",
    shortAnswer: "A compound statement that is neither a tautology nor a contradiction—sometimes true, sometimes false.",
    explanation: "Most statements are contingencies. Their truth value depends on the truth values of their components. For example, 'p ∧ q' is true only when both p and q are true, false otherwise. Understanding contingencies helps analyze real-world logical dependencies.",
    hint: "If a statement can be both true and false depending on inputs, it's a contingency.",
    level: "moderate",
    codeExample: "// Contingency: Depends on actual values\nlet result = (temperature > 30) && (humidity < 50);\n// True on hot dry days, false otherwise"
  },
  {
    question: "Why can't future tense statements be propositions in strict logic?",
    shortAnswer: "Their truth value isn't determined at the time of evaluation.",
    explanation: "In classical logic, propositions require a definite truth value now. 'It will rain tomorrow' cannot be verified as true or false today. Some logical systems (temporal logic) handle future statements, but classical propositional logic requires present determinacy.",
    hint: "Ask: Can we verify this statement as true or false right now with available evidence?",
    level: "expert",
    codeExample: "// In classical logic, this is problematic\n// let willRainTomorrow = true; // Can't verify now\n// Better: let rainForecast = '70% chance'; // Not boolean"
  },
  {
    question: "How does propositional logic help in writing clean code?",
    shortAnswer: "It encourages breaking complex conditions into simple, composable propositions.",
    explanation: "Clean code principles align with propositional logic: name boolean variables clearly (isValid, hasPermission), avoid deeply nested conditions, use De Morgan's laws to simplify negations, and extract complex conditions into well-named functions.",
    hint: "If your condition has more than 3 operators, consider breaking it down.",
    level: "moderate",
    codeExample: "// Clean: Named propositions\nlet isAdult = age >= 18;\nlet hasConsent = consentGiven || isAdult;\nlet canProceed = hasConsent && termsAccepted;\n// Instead of: if (age>=18 && (consentGiven||age>=18) && termsAccepted)"
  },
  {
    question: "What is the relationship between propositional logic and set theory?",
    shortAnswer: "Logical operators correspond to set operations: AND (∩), OR (∪), NOT (complement).",
    explanation: "There's a direct isomorphism: propositions correspond to sets (elements where proposition is true), ∧ corresponds to intersection, ∨ to union, ~ to complement. This connection allows using Venn diagrams to visualize logical relationships.",
    hint: "Truth table rows correspond to elements in a Venn diagram region.",
    level: "expert",
    codeExample: "// Set view: p = {elements where p is true}\n// p∧q = p ∩ q\n// p∨q = p ∪ q\n// ~p = complement of p"
  },
  {
    question: "How does propositional logic apply to cybersecurity?",
    shortAnswer: "Access control policies are expressed as logical expressions evaluated for each request.",
    explanation: "Firewall rules, authentication systems, and permission checks use propositional logic. 'Allow access IF user is authenticated AND (user role = admin OR time is business hours)' is a compound proposition. Understanding logic helps design secure, non-contradictory policies.",
    hint: "Every security rule is a condition that must evaluate to true for access to be granted.",
    level: "moderate",
    codeExample: "// Access control policy\nlet grantAccess = isAuthenticated && \n                  (hasAdminRole || \n                   (isBusinessHours && hasUserRole));"
  },
  {
    question: "What are the limitations of propositional logic?",
    shortAnswer: "Cannot express relationships between objects, quantities, or use quantifiers (all, some).",
    explanation: "Propositional logic treats statements as atomic, missing internal structure. It can't express 'All students in Barrackpore passed' (needs ∀) or 'Some students failed' (needs ∃). It also can't handle relationships like 'x is taller than y' without enumerating all pairs.",
    hint: "Whenever you need to say 'for all' or 'there exists', you've outgrown propositional logic.",
    level: "expert",
    codeExample: "// Propositional fails for:\n// 'Everyone in the class passed'\n// Would need: Student1Passed AND Student2Passed AND ...\n// Predicate logic needed: ∀x (Student(x) → Passed(x))"
  }
];

export default questions;