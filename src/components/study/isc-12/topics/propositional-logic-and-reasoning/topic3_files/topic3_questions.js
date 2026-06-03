// topic3_files/topic3_questions.js
const questions = [
  {
    question: "What is a logical variable?",
    shortAnswer: "A symbol (like p, q, r) that represents a proposition.",
    explanation: "Logical variables are placeholders for propositions. They allow us to reason about logical structure without focusing on specific content. Each variable can be assigned True or False depending on the actual truth of the proposition it represents.",
    hint: "Think of x in algebra, but for true/false statements.",
    level: "basic",
    codeExample: "let p = (age >= 18);  // p represents the proposition 'age >= 18'"
  },
  {
    question: "Why do we use letters like p, q, r for logical variables?",
    shortAnswer: "Tradition and convenience — they are short and distinct.",
    explanation: "The use of p, q, r comes from historical logic texts. They are easy to write, not easily confused with numbers, and provide enough distinct symbols for most basic problems. For more variables, we use subscripts (p₁, p₂) or continue the alphabet.",
    hint: "It's a convention, like using x, y, z for unknowns in algebra.",
    level: "basic",
    codeExample: "// Common mapping:\n// p: first proposition\n// q: second proposition\n// r: third proposition"
  },
  {
    question: "Can a logical variable be True or False itself?",
    shortAnswer: "No, the variable represents a proposition; the proposition has a truth value.",
    explanation: "A variable is a symbol. It stands for a proposition, and that proposition is either true or false. We often say 'p is true' as shorthand for 'the proposition represented by p is true'. But the variable p is not itself true or false.",
    hint: "Distinguish between the name and the thing it names.",
    level: "moderate",
    codeExample: "let p = (5 > 3);  // p represents a true proposition\n// We say 'p is true', but p is the variable name"
  },
  {
    question: "How do you map an English sentence to a logical variable?",
    shortAnswer: "Identify an atomic proposition and assign it a letter like p.",
    explanation: "Step 1: Find a declarative sentence that can be true/false. Step 2: Choose a letter (p for first, q for second). Step 3: Write 'Let p = \"sentence\"'. For example: Let p = \"Swadeep studies in Barrackpore\".",
    hint: "Each distinct proposition gets its own variable.",
    level: "basic",
    codeExample: "// English: 'It is raining and cold'\nlet p = 'It is raining';\nlet q = 'It is cold';\n// Expression: p && q"
  },
  {
    question: "What does p ∧ q mean in terms of the underlying propositions?",
    shortAnswer: "It means both propositions represented by p and q are true.",
    explanation: "The ∧ symbol (AND) combines propositions. If p stands for 'Swadeep studies' and q stands for 'Tuhina plays', then p ∧ q means 'Swadeep studies AND Tuhina plays' is true.",
    hint: "The variables stand for whole propositions; operators combine them.",
    level: "basic",
    codeExample: "let p = (age >= 18);\nlet q = hasLicense;\nlet canDrive = p && q;  // p ∧ q in logic"
  },
  {
    question: "What if I need more than three variables?",
    shortAnswer: "Use subscripts: p₁, p₂, p₃, p₄, or continue with s, t, u.",
    explanation: "Standard practice: after p, q, r, you can use s, t, u, or use subscripts like p₁, p₂, p₃, p₄, or use a, b, c, d. Subscripts are especially useful when you have many variables (e.g., p₁ through p₁₀).",
    hint: "Subscripts keep variables organized and avoid running out of letters.",
    level: "moderate",
    codeExample: "let p1 = isRaining;\nlet p2 = isCold;\nlet p3 = isWindy;\nlet p4 = isDark;"
  },
  {
    question: "Can I use any letter as a logical variable?",
    shortAnswer: "Yes, as long as you define it clearly. Common choices are p, q, r, s, a, b, c.",
    explanation: "While p, q, r are traditional, any letter (or symbol with a subscript) can be used. The key is consistency and clarity. In programming, descriptive names like 'isLoggedIn' are preferred over single letters.",
    hint: "For readability, choose letters that help you remember the proposition.",
    level: "basic",
    codeExample: "let a = 'Abhronila passed';\nlet b = 'Susmita passed';\n// Works fine, but p, q are conventional"
  },
  {
    question: "What is the difference between p and ¬p?",
    shortAnswer: "p is a proposition; ¬p (not p) is its negation.",
    explanation: "p represents the original proposition. ¬p (or ~p) represents the opposite truth value. If p is true, ¬p is false; if p is false, ¬p is true. They are different logical expressions, but both involve the variable p.",
    hint: "Negation flips the truth value.",
    level: "basic",
    codeExample: "let p = (5 > 3);   // true\nlet notP = !p;        // false\n// p and notP are different expressions"
  },
  {
    question: "How do you represent 'It is not raining' using variables?",
    shortAnswer: "Let p = 'It is raining', then ¬p represents 'It is not raining'.",
    explanation: "First assign a variable to the positive proposition. Then apply the negation operator. This is more systematic than creating a new variable for the negated version, though you could also let q = 'It is not raining'.",
    hint: "Always define your variables for positive propositions when possible.",
    level: "basic",
    codeExample: "let p = isRaining;\nlet notRaining = !p;  // ¬p"
  },
  {
    question: "Can the same variable represent different propositions in different parts of an expression?",
    shortAnswer: "No, within one expression, each variable stands for the same proposition throughout.",
    explanation: "A variable is a placeholder. Once you define p = 'It is raining', every occurrence of p in that logical expression refers to that same proposition. Using p for two different meanings would cause confusion and logical errors.",
    hint: "Consistency: same letter = same proposition.",
    level: "moderate",
    codeExample: "// Wrong: p = 'Raining' here, p = 'Cold' there\n// Right: p always means the same thing"
  },
  {
    question: "What does it mean to 'assign truth values' to variables?",
    shortAnswer: "To decide whether each variable's proposition is true or false in a given scenario.",
    explanation: "A truth assignment is a function that maps each variable to either T (true) or F (false). For example, if p = 'It is raining' and it is actually raining, we assign p = T. Truth assignments are used to evaluate compound statements.",
    hint: "Think of it as setting the real-world facts for each proposition.",
    level: "moderate",
    codeExample: "// Given: p = (age >= 18), age = 20\nlet truthAssignment = { p: true };\n// Now evaluate p && q based on assignment"
  },
  {
    question: "Why do we need variables if we already have the English sentences?",
    shortAnswer: "Variables allow abstraction, conciseness, and manipulation of logical structure.",
    explanation: "With variables, we can write general laws (like p ∧ q ≡ q ∧ p) that apply to any propositions. Without variables, we'd have to repeat long sentences. Variables also enable truth tables and algebraic manipulation.",
    hint: "Variables let you focus on form, not content.",
    level: "moderate",
    codeExample: "// Without variables: 'It is raining and cold' ≡ 'Cold and raining'\n// With variables: p ∧ q ≡ q ∧ p (works for any p, q)"
  },
  {
    question: "How do logical variables relate to Boolean variables in programming?",
    shortAnswer: "They are essentially the same concept — variables that hold true/false values.",
    explanation: "In programming, boolean variables (bool in C++, boolean in Java, bool in Python) store truth values. They are used in conditions exactly like logical variables. The main difference: programming variables are mutable and can be reassigned.",
    hint: "Programming's 'boolean' is the direct implementation of logical variables.",
    level: "basic",
    codeExample: "bool p = true;   // C++\nboolean q = false; // Java\nlet r = true;      // JavaScript"
  },
  {
    question: "What is the purpose of using subscripts like p₁, p₂?",
    shortAnswer: "To create many distinct variable names when needed.",
    explanation: "Subscripts allow an infinite supply of variable names. They are especially useful when dealing with many propositions (e.g., in computer science algorithms or when generalizing to n variables). Subscripts are read as 'p sub one', 'p sub two'.",
    hint: "Use subscripts for systematic naming, like array indices.",
    level: "moderate",
    codeExample: "let p1 = condition1;\nlet p2 = condition2;\n// ... up to pn"
  },
  {
    question: "How do you represent 'Abhronila studies and Susmita practices' using variables?",
    shortAnswer: "Let p = 'Abhronila studies', q = 'Susmita practices', then p ∧ q.",
    explanation: "Identify the two atomic propositions. Assign p to the first, q to the second. The word 'and' corresponds to the ∧ operator. So the compound proposition is p ∧ q.",
    hint: "Break the sentence into smallest truth-evaluable parts.",
    level: "basic",
    codeExample: "let p = abhronilaStudies;\nlet q = susmitaPractices;\nlet result = p && q;  // p ∧ q"
  },
  {
    question: "Can a logical variable represent a compound proposition?",
    shortAnswer: "Yes, but typically variables represent atomic propositions for clarity.",
    explanation: "While you can assign a variable to any proposition (simple or compound), it's standard practice to use variables for atomic propositions. This allows you to see the logical structure. However, for convenience, you might define r = (p ∧ q) as a shorthand.",
    hint: "Compound variables are fine but can hide internal structure.",
    level: "expert",
    codeExample: "let p = (age >= 18);\nlet q = hasLicense;\nlet r = p && q;  // r is a compound proposition variable"
  },
  {
    question: "What is a truth assignment in logic?",
    shortAnswer: "A mapping from each variable to either True or False.",
    explanation: "A truth assignment (or interpretation) specifies the truth value of each propositional variable. For n variables, there are 2ⁿ possible truth assignments. Truth assignments are used to evaluate compound statements and build truth tables.",
    hint: "Each row of a truth table is a different truth assignment.",
    level: "moderate",
    codeExample: "// Truth assignment: p = true, q = false, r = true\n// Then evaluate (p && q) || r  → (true && false) || true = false || true = true"
  },
  {
    question: "Why do we use p, q, r in that order?",
    shortAnswer: "Convention: p for first proposition, q for second, r for third.",
    explanation: "There's no logical necessity, but it's a widely followed convention. It makes communication easier because readers expect p to be the first proposition mentioned, q the second, etc. Breaking convention is allowed but should be clearly stated.",
    hint: "Follow the convention unless you have a good reason not to.",
    level: "basic",
    codeExample: "// Standard:\n// Let p = 'It is raining'\n// Let q = 'It is cold'\n// Not standard but okay:\n// Let a = 'It is raining'"
  },
  {
    question: "How do you handle the same proposition appearing multiple times?",
    shortAnswer: "Use the same variable for all occurrences.",
    explanation: "If the same proposition appears multiple times in a compound statement, use the same variable each time. For example, 'If it rains, then the ground gets wet, and if it rains, I take an umbrella' uses p for 'it rains' in both places.",
    hint: "Same proposition = same variable.",
    level: "moderate",
    codeExample: "let p = isRaining;\nlet q = groundWet;\nlet r = takeUmbrella;\n// Expression: (p → q) ∧ (p → r)"
  },
  {
    question: "What is the difference between a logical variable and a propositional constant?",
    shortAnswer: "Variables can vary; constants are fixed True or False.",
    explanation: "Propositional constants are ⊤ (always true) and ⊥ (always false). They never change. Variables like p can be true in one scenario and false in another. Constants are rarely used in basic logic but appear in some contexts.",
    hint: "Variables are flexible; constants are fixed.",
    level: "expert",
    codeExample: "// In some logic systems:\n// ⊤ represents always true\n// ⊥ represents always false\n// p can be either"
  },
  {
    question: "How do you represent 'Either Swadeep comes or Tuhina comes, but not both'?",
    shortAnswer: "Let p = 'Swadeep comes', q = 'Tuhina comes', then (p ∨ q) ∧ ¬(p ∧ q).",
    explanation: "This is the exclusive OR (XOR). It says at least one is true (p ∨ q) and not both are true (¬(p ∧ q)). Using variables makes the structure clear without repeating the long names.",
    hint: "Exclusive or = (p OR q) AND NOT (p AND q).",
    level: "moderate",
    codeExample: "let p = swadeepComes;\nlet q = tuhinaComes;\nlet exclusiveOr = (p || q) && !(p && q);"
  },
  {
    question: "Can numbers be used as logical variables?",
    shortAnswer: "No, numbers typically represent truth values (0 for false, 1 for true) or are used as subscripts.",
    explanation: "Using numbers as variable names (like 1, 2, 3) would be confusing because they already have meaning as truth values in some contexts (1=true, 0=false). Stick to letters, possibly with numeric subscripts like p₁.",
    hint: "Avoid confusion: use letters, not bare numbers.",
    level: "basic",
    codeExample: "// Not recommended:\n// let 1 = isRaining;\n// Good:\nlet p1 = isRaining;"
  },
  {
    question: "What does it mean to 'evaluate' a logical expression with variables?",
    shortAnswer: "Substitute the truth values of variables and compute the result using operator rules.",
    explanation: "Given a truth assignment (e.g., p = T, q = F), replace each variable with its truth value, then apply the definitions of operators (AND, OR, NOT) step by step to get the final truth value of the whole expression.",
    hint: "Like arithmetic: substitute numbers, then compute.",
    level: "moderate",
    codeExample: "// Expression: p ∧ (q ∨ ¬p)\n// Assignment: p = T, q = F\n// Substitute: T ∧ (F ∨ ¬T) = T ∧ (F ∨ F) = T ∧ F = F"
  },
  {
    question: "Why are variables called 'propositional variables'?",
    shortAnswer: "Because they vary over propositions (different propositions in different contexts).",
    explanation: "Just as algebraic variables vary over numbers, propositional variables vary over propositions. In different problems, the same variable letter can stand for different propositions, but within one problem it's fixed.",
    hint: "Variable = can stand for different things in different uses.",
    level: "basic",
    codeExample: "// In problem 1: p = 'It is raining'\n// In problem 2: p = 'Swadeep studies'\n// Same letter, different meaning in different contexts"
  },
  {
    question: "How do you represent 'If Debangshu studies, then he will pass' using variables?",
    shortAnswer: "Let p = 'Debangshu studies', q = 'He will pass', then p → q.",
    explanation: "Identify the antecedent (if part) and consequent (then part). Assign p to the antecedent, q to the consequent. The implication operator → connects them. Variables keep the expression concise.",
    hint: "Implication: p → q means 'if p then q'.",
    level: "basic",
    codeExample: "let p = debangshuStudies;\nlet q = willPass;\nlet implication = p ? q : true;  // p → q in logic"
  },
  {
    question: "What is the scope of a logical variable?",
    shortAnswer: "The entire logical expression or problem in which it is defined.",
    explanation: "Once you define 'Let p = ...', that variable refers to that proposition throughout the current problem. Different problems can reuse p for different meanings. In programming terms, the scope is the current context or function.",
    hint: "Variable definitions are local to the problem or expression.",
    level: "moderate",
    codeExample: "// In this truth table, p means the same thing in all rows\n// p | q | p ∧ q\n// T | T | T\n// ..."
  },
  {
    question: "Can you use descriptive names like 'isRaining' instead of p in formal logic?",
    shortAnswer: "Yes, in applied logic and computer science, descriptive names are preferred.",
    explanation: "While textbooks use p, q for brevity, real-world applications (programming, formal verification) use descriptive names. The underlying concept is identical; only the naming differs. Descriptive names improve readability.",
    hint: "In code, always use descriptive names. In logic exercises, follow the convention.",
    level: "basic",
    codeExample: "// Descriptive names are better:\nlet isUserLoggedIn = true;\nlet hasAdminPermission = false;\nlet canAccessDashboard = isUserLoggedIn && hasAdminPermission;"
  },
  {
    question: "How do you represent 'It is not true that both Swadeep and Tuhina are present'?",
    shortAnswer: "Let p = 'Swadeep is present', q = 'Tuhina is present', then ¬(p ∧ q).",
    explanation: "The phrase 'both ... and ...' corresponds to conjunction (p ∧ q). 'It is not true that' negates the whole conjunction, so ¬(p ∧ q). By De Morgan's law, this is equivalent to ¬p ∨ ¬q (Swadeep absent OR Tuhina absent).",
    hint: "Negation of 'both' means 'at least one is absent'.",
    level: "moderate",
    codeExample: "let p = swadeepPresent;\nlet q = tuhinaPresent;\nlet notBoth = !(p && q);  // ¬(p ∧ q)"
  },
  {
    question: "What is the difference between p and 'p' (quoted)?",
    shortAnswer: "p without quotes is the variable; 'p' with quotes is the propositional content.",
    explanation: "In logic texts, when we write 'Let p = \"It is raining\"', the quotes indicate the English sentence. p alone is the variable. This distinction is important for understanding that p is not the sentence itself but a name for it.",
    hint: "Quotes around content, no quotes for variable.",
    level: "moderate",
    codeExample: "// Variable p represents the proposition 'It is raining'\nlet p = (weather === 'rain');"
  },
  {
    question: "How many distinct truth assignments exist for 4 variables?",
    shortAnswer: "2⁴ = 16 distinct truth assignments.",
    explanation: "Each variable can be T or F independently. For n variables, there are 2ⁿ possible combinations. For 4 variables (p, q, r, s), you have 2×2×2×2 = 16 assignments, from all false to all true.",
    hint: "Exponential growth: each new variable doubles the assignments.",
    level: "moderate",
    codeExample: "// 2 variables: 4 assignments (TT, TF, FT, FF)\n// 3 variables: 8 assignments\n// 4 variables: 16 assignments"
  },
  {
    question: "What is a well-formed formula (WFF) in terms of variables?",
    shortAnswer: "A syntactically correct expression using variables and operators.",
    explanation: "A WFF follows the rules: variables are WFFs; if φ is a WFF, then ¬φ is a WFF; if φ and ψ are WFFs, then (φ ∧ ψ), (φ ∨ ψ), (φ → ψ), (φ ↔ ψ) are WFFs. Parentheses must match. Not all strings of symbols are WFFs.",
    hint: "WFFs are grammatically correct logical expressions.",
    level: "expert",
    codeExample: "// WFF: (p ∧ q) ∨ ¬r\n// Not WFF: p ∧ q ∨ (missing parenthesis or mismatched)"
  }
];

export default questions;