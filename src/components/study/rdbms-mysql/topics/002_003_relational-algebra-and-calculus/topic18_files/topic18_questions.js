// topic18_files/topic18_questions.js

const questions = [
  {
    question: "What is Domain Relational Calculus (DRC)?",
    shortAnswer: "A non-procedural formal query language based on first-order predicate logic where variables range over individual attribute values (domains) rather than entire tuples: $$\\left\\{ \\langle x_1, x_2, \\dots, x_n \\rangle \\mid P(x_1, \\dots, x_n) \\right\\}$$.",
    explanation: "Core definition of Domain Relational Calculus.",
    hint: "Calculus where variables represent individual column/attribute values: { <x1..xn> | P(x1..xn) }.",
    level: "basic"
  },
  {
    question: "What is the primary difference between Tuple Relational Calculus (TRC) and Domain Relational Calculus (DRC)?",
    shortAnswer: "In TRC, variables represent whole rows/tuples ($t \\in R$), whereas in DRC, variables represent individual column cells/domain values ($\\langle x_1, x_2, x_3 \\rangle \\in R$).",
    explanation: "TRC vs DRC variable granularity distinction.",
    hint: "TRC variables represent entire tuples; DRC variables represent single column values.",
    level: "basic"
  },
  {
    question: "What is the general mathematical syntax of a DRC expression?",
    shortAnswer: "$$\\left\\{ \\langle x_1, x_2, \\dots, x_n \\rangle \\mid P(x_1, x_2, \\dots, x_n) \\right\\}$$, where $\\langle x_1, \\dots, x_n \\rangle$ are free domain variables and $P$ is a predicate formula.",
    explanation: "DRC mathematical syntax template.",
    hint: "{ <x1, x2, ..., xn> | P(x1, ..., xn) }.",
    level: "basic"
  },
  {
    question: "What are the atomic formulas (atoms) in DRC?",
    shortAnswer: "1) Relation Membership: $\\langle x_1, \\dots, x_k \\rangle \\in R$, 2) Variable-Constant Comparison: $x_i \\ \\theta \\ c$, 3) Variable-Variable Comparison: $x_i \\ \\theta \\ x_j$.",
    explanation: "Atomic formulas in DRC.",
    hint: "<x1..xk> ∈ R, xi θ c, and xi θ xj.",
    level: "basic"
  },
  {
    question: "What commercial/visual query language was directly inspired by Domain Relational Calculus?",
    shortAnswer: "Query-By-Example (QBE), invented by Moshé Zloof at IBM in 1977.",
    explanation: "Historical impact of DRC on visual database interfaces.",
    hint: "Query-By-Example (QBE) by IBM.",
    level: "basic"
  },
  {
    question: "What is Codd's Reduction Theorem (Codd's Equivalence Theorem)?",
    shortAnswer: "A foundational theorem proving that Relational Algebra, Safe Tuple Relational Calculus, and Safe Domain Relational Calculus all have EXACTLY IDENTICAL expressive power ($RA \\equiv TRC_{safe} \\equiv DRC_{safe}$).",
    explanation: "Codd's Reduction Theorem definition.",
    hint: "Relational Algebra ≡ Safe TRC ≡ Safe DRC in expressive power.",
    level: "basic"
  },
  {
    question: "What is the formal definition of 'Relational Completeness'?",
    shortAnswer: "A query language is relationally complete if it can express every query that can be formulated in safe Relational Algebra (or Safe TRC / Safe DRC).",
    explanation: "Relational completeness definition.",
    hint: "Ability to express any query formulated in safe Relational Algebra.",
    level: "basic"
  },
  {
    question: "Is modern SQL a relationally complete language?",
    shortAnswer: "Yes! In fact, SQL is 'more than relationally complete' because it includes aggregation, sorting, transitive closure (recursive CTEs), and window functions.",
    explanation: "SQL expressive power relative to relational completeness.",
    hint: "Yes, SQL is fully relationally complete and extends beyond pure RA.",
    level: "basic"
  },
  {
    question: "How do you express: 'Find the names of students living in Kolkata' in DRC?",
    shortAnswer: "$$\\left\\{ \\langle n \\rangle \\mid \\exists i, f \\ (\\langle i, n, \\text{'Kolkata'}, f \\rangle \\in \\text{Students}) \\right\\}$$.",
    explanation: "Basic DRC query with constant substitution.",
    hint: "{ <n> | ∃i, f (<i, n, 'Kolkata', f> ∈ Students) }.",
    level: "basic"
  },
  {
    question: "Why are positional ordering and schema knowledge critical when writing DRC expressions?",
    shortAnswer: "Because DRC relation atoms $\\langle x_1, x_2, \\dots, x_k \\rangle \\in R$ bind variables based strictly on their positional index in the table's schema definition.",
    explanation: "Positional dependency of DRC domain variables.",
    hint: "Variables are bound strictly by their positional column index in the table schema.",
    level: "moderate"
  },
  {
    question: "What does an underscore (\\_) or anonymous variable mean in DRC / QBE notations?",
    shortAnswer: "It represents an existential 'don't care' variable for an attribute whose value is irrelevant to the query output and filtering predicates.",
    explanation: "Anonymous don't-care variables in DRC.",
    hint: "An anonymous variable indicating an attribute we don't care about.",
    level: "moderate"
  },
  {
    question: "How is an Equijoin between `Students(id, name, city)` and `Enrollments(student_id, course_id, grade)` expressed in DRC?",
    shortAnswer: "$$\\left\\{ \\langle n, c \\rangle \\mid \\exists s, ci, g \\ (\\langle s, n, ci \\rangle \\in \\text{Students} \\land \\langle s, c, g \\rangle \\in \\text{Enrollments}) \\right\\}$$, using the shared domain variable $s$.",
    explanation: "DRC join using shared domain variables.",
    hint: "{ <n, c> | ∃s, ci, g (<s, n, ci> ∈ Students ∧ <s, c, g> ∈ Enrollments) }.",
    level: "basic"
  },
  {
    question: "What is an 'Unsafe DRC Expression'?",
    shortAnswer: "An expression $\\left\\{ \\langle x \\rangle \\mid \\neg(\\langle x \\rangle \\in R) \\right\\}$ that generates an infinite set of values from the universe not contained in $R$.",
    explanation: "Unsafe DRC definition.",
    hint: "An expression producing infinite domain values.",
    level: "basic"
  },
  {
    question: "What makes a DRC expression 'Safe' according to Codd's Safety Criterion?",
    shortAnswer: "1) Every free variable must appear in a positive relation membership atom, 2) Bound variables in $\\exists$ must be range-restricted, and 3) All output values must come from the active domain $\\text{DOM}(P)$.",
    explanation: "Safety conditions for DRC.",
    hint: "All variables are range-restricted to active database relation domains.",
    level: "expert"
  },
  {
    question: "What is Codd's Reduction Algorithm?",
    shortAnswer: "A constructive mathematical algorithm that converts any safe DRC or TRC expression into an equivalent procedural Relational Algebra expression tree.",
    explanation: "Codd's Reduction Algorithm function.",
    hint: "Algorithm converting calculus formulas into relational algebra trees.",
    level: "expert"
  },
  {
    question: "How do you express: 'Find students enrolled in NO courses' in DRC?",
    shortAnswer: "$$\\left\\{ \\langle s, n \\rangle \\mid \\exists c \\ (\\langle s, n, c \\rangle \\in \\text{Students} \\land \\neg \\exists co, g \\ (\\langle s, co, g \\rangle \\in \\text{Enrollments})) \\right\\}$$.",
    explanation: "Negated existential membership in DRC (Antijoin).",
    hint: "{ <s, n> | ∃c (<s, n, c> ∈ Students ∧ ¬∃co, g (<s, co, g> ∈ Enrollments)) }.",
    level: "moderate"
  },
  {
    question: "How do you express: 'Find students enrolled in ALL core courses' in DRC?",
    shortAnswer: "$$\\left\\{ \\langle s, n \\rangle \\mid \\exists ci \\ (\\langle s, n, ci \\rangle \\in \\text{Students} \\land \\forall c, t \\ (\\langle c, t \\rangle \\in \\text{Core\\_Courses} \\rightarrow \\exists g \\ (\\langle s, c, g \\rangle \\in \\text{Enrollments}))) \\right\\}$$.",
    explanation: "Universal implication in DRC.",
    hint: "{ <s, n> | ... ∀c, t (<c, t> ∈ CoreCourses → ∃g (<s, c, g> ∈ Enrollments)) }.",
    level: "expert"
  },
  {
    question: "How does QBE represent the projection of `name` and `city` from `Students`?",
    shortAnswer: "In a 2D table grid with table header `Students | student_id | full_name | city | admission_fee |`, the user enters `| | P._N | P._C | |` where `P.` stands for 'Print' (Project).",
    explanation: "QBE grid syntax for projection.",
    hint: "Uses P. (Print) prefix in the visual table column cells.",
    level: "moderate"
  },
  {
    question: "How does QBE represent a join between `Students` and `Enrollments`?",
    shortAnswer: "By placing the same example variable (e.g. `_ID`) into the `student_id` columns of both the `Students` and `Enrollments` grid tables.",
    explanation: "QBE join mechanism using example variables.",
    hint: "Places the same example variable (e.g. _ID) in both table grids.",
    level: "moderate"
  },
  {
    question: "Can Datalog be considered a variant of Domain Relational Calculus?",
    shortAnswer: "Yes! Datalog is a declarative logic programming language for databases directly based on DRC with Horn clauses and recursion support.",
    explanation: "Datalog relationship to DRC.",
    hint: "Yes, Datalog is a Horn-clause logic extension of DRC.",
    level: "expert"
  },
  {
    question: "What is Transitive Closure, and can classical pure RA, TRC, and DRC express it?",
    shortAnswer: "Transitive closure (e.g. finding all indirect manager-employee hierarchies of arbitrary depth) CANNOT be expressed in pure first-order RA/TRC/DRC; it requires recursion (`WITH RECURSIVE`).",
    explanation: "First-order logic limits on recursion and transitive closure.",
    hint: "No, transitive closure requires recursive extensions like WITH RECURSIVE.",
    level: "expert"
  },
  {
    question: "Why did SQL (based on TRC) become more widely adopted than QBE (based on DRC) for textual programming?",
    shortAnswer: "Because English-like clause-based syntax (`SELECT-FROM-WHERE`) is more natural to embed in textual application code than positional domain variable vectors or 2D graphical grids.",
    explanation: "Syntax ergonomics leading to SQL dominance.",
    hint: "Clause-based syntax is easier to embed in application programming languages.",
    level: "basic"
  },
  {
    question: "How do you express: 'Find all distinct cities represented in Students' in DRC?",
    shortAnswer: "$$\\left\\{ \\langle c \\rangle \\mid \\exists i, n, f \\ (\\langle i, n, c, f \\rangle \\in \\text{Students}) \\right\\}$$.",
    explanation: "Projection to single domain variable in DRC.",
    hint: "{ <c> | ∃i, n, f (<i, n, c, f> ∈ Students) }.",
    level: "basic"
  },
  {
    question: "What happens if a domain variable appears in the output header $\\langle x \\rangle$ but is NOT present in any relation atom?",
    shortAnswer: "The expression is UNSAFE because $x$ can take any arbitrary value from the infinite universe.",
    explanation: "Unbound free variable safety violation in DRC.",
    hint: "The expression becomes unsafe and non-computable.",
    level: "basic"
  },
  {
    question: "What is the equivalent SQL query for: $\\left\\{ \\langle n, f \\rangle \\mid \\exists i, c \\ (\\langle i, n, c, f \\rangle \\in \\text{Students} \\land c = \\text{'Barrackpore'} \\land f > 4000) \\right\\}$?",
    shortAnswer: "`SELECT full_name, admission_fee FROM students WHERE city = 'Barrackpore' AND admission_fee > 4000;`.",
    explanation: "DRC to SQL translation.",
    hint: "SELECT full_name, admission_fee FROM students WHERE city = 'Barrackpore' AND admission_fee > 4000.",
    level: "basic"
  },
  {
    question: "In what year did Edgar F. Codd receive the ACM Turing Award for his relational model and calculus foundations?",
    shortAnswer: "In 1981, for his fundamental and continuing contributions to the theory and practice of database management systems.",
    explanation: "Codd's Turing Award recognition.",
    hint: "1981 ACM Turing Award.",
    level: "basic"
  },
  {
    question: "How do you evaluate whether a new database query language is Relationally Complete?",
    shortAnswer: "By proving that it can simulate the 5 fundamental Relational Algebra operators: Selection ($\sigma$), Projection ($\pi$), Cartesian Product ($\times$), Set Union ($\cup$), and Set Difference ($-$).",
    explanation: "Relational completeness proof technique.",
    hint: "By proving it can simulate the 5 core Relational Algebra operators.",
    level: "expert"
  },
  {
    question: "What is the relationship between DRC and First-Order Predicate Logic (FOL)?",
    shortAnswer: "DRC is a direct specialization of FOL where the universe of discourse is restricted to the active domain of relational database tables.",
    explanation: "DRC formal logic foundation.",
    hint: "DRC is FOL restricted to active database domains.",
    level: "moderate"
  },
  {
    question: "How does DRC handle multi-attribute equality conditions ($R.A = S.B \\land R.C = S.D$)?",
    shortAnswer: "By using the SAME domain variable names in both positional slots across relation atoms: $\\langle x, y, z \\rangle \\in R \\land \\langle x, w, z \\rangle \\in S$.",
    explanation: "Multi-attribute join matching via identical domain variables.",
    hint: "Reuses identical variable names in matching column positions.",
    level: "moderate"
  },
  {
    question: "What is the master checklist for mastering Domain Relational Calculus (DRC) & Codd's Theorem?",
    shortAnswer: "1) Use $\\{ \\langle x_1..x_n \\rangle \\mid P(x_1..x_n) \\}$ syntax. 2) Match variables strictly to positional table schema slots. 3) Reuse variable names across relation atoms to express joins. 4) Ensure Safety by binding all free variables to positive table atoms. 5) Understand Codd's Theorem: $RA \\equiv TRC_{safe} \\equiv DRC_{safe}$. 6) Know that DRC is the formal basis of QBE.",
    explanation: "Master summary of DRC concepts and Codd's Theorem.",
    hint: "Syntax, Positional binding, Shared join variables, Safety, Codd Equivalence Theorem, QBE basis.",
    level: "basic"
  }
];

export default questions;
