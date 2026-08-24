// topic17_files/topic17_questions.js

const questions = [
  {
    question: "What is Tuple Relational Calculus (TRC)?",
    shortAnswer: "A non-procedural / declarative formal query language based on first-order predicate logic where variables range over tuples of relations: $$\\{ t \\mid P(t) \\}$$.",
    explanation: "Core definition of Tuple Relational Calculus.",
    hint: "Declarative query language where variables represent whole tuples: { t | P(t) }.",
    level: "basic"
  },
  {
    question: "What is the fundamental philosophical difference between Relational Algebra and Relational Calculus?",
    shortAnswer: "Relational Algebra is PROCEDURAL (specifies HOW to retrieve data step-by-step); Relational Calculus is DECLARATIVE (specifies WHAT data is desired without retrieval algorithms).",
    explanation: "Procedural vs declarative distinction.",
    hint: "Algebra specifies HOW; Calculus specifies WHAT.",
    level: "basic"
  },
  {
    question: "What is a 'Tuple Variable' in TRC?",
    shortAnswer: "A mathematical variable (typically denoted $t, u, v, s$) whose allowable domain of values is the set of all tuples belonging to a relation.",
    explanation: "Tuple variable definition in TRC.",
    hint: "A variable that ranges over complete rows/tuples of a relation.",
    level: "basic"
  },
  {
    question: "What are the three types of Atomic Formulas (Atoms) in TRC?",
    shortAnswer: "1) Relation Membership: $t \\in R$, 2) Attribute-Constant Comparison: $t.A \\ \\theta \\ c$, 3) Attribute-Attribute Comparison: $t.A \\ \\theta \\ u.B$.",
    explanation: "The 3 atomic formula types in TRC.",
    hint: "t ∈ R, t.A θ c, and t.A θ u.B.",
    level: "basic"
  },
  {
    question: "What is the Existential Quantifier (∃) in TRC?",
    shortAnswer: "$$\\exists u \\in S \\ (P(u))$$. It asserts that there exists AT LEAST ONE tuple $u$ in relation $S$ for which predicate formula $P(u)$ is TRUE.",
    explanation: "Existential quantifier semantics.",
    hint: "∃ means 'there exists at least one tuple'.",
    level: "basic"
  },
  {
    question: "What is the Universal Quantifier (∀) in TRC?",
    shortAnswer: "$$\\forall u \\in S \\ (P(u))$$. It asserts that FOR EVERY tuple $u$ in relation $S$, predicate formula $P(u)$ is TRUE.",
    explanation: "Universal quantifier semantics.",
    hint: "∀ means 'for all / every tuple'.",
    level: "basic"
  },
  {
    question: "What is Quantifier Duality (De Morgan's Laws for Quantifiers) in TRC?",
    shortAnswer: "$$\\forall u \\ P(u) \\equiv \\neg \\exists u \\ \\neg P(u)$$ and $$\\exists u \\ P(u) \\equiv \\neg \\forall u \\ \\neg P(u)$$.",
    explanation: "Duality transformation rules for first-order logic quantifiers.",
    hint: "∀u P(u) ≡ ¬∃u ¬P(u) and ∃u P(u) ≡ ¬∀u ¬P(u).",
    level: "expert"
  },
  {
    question: "What is an 'Unsafe Expression' in Relational Calculus?",
    shortAnswer: "An expression that can evaluate to an infinite number of tuples (e.g. $\\{ t \\mid \\neg(t \\in \\text{Students}) \\}$, which represents all infinite non-student entities in the universe).",
    explanation: "Definition of unsafe non-terminating calculus expressions.",
    hint: "An expression that returns an infinite number of tuples.",
    level: "basic"
  },
  {
    question: "What is the 'Domain of a Formula' $\\text{DOM}(P)$ in TRC safety definitions?",
    shortAnswer: "The finite set of all constant values appearing explicitly in the formula $P$ plus all values currently stored in the attributes of the referenced database relations.",
    explanation: "Definition of active domain DOM(P).",
    hint: "The finite set of all constants in query formula and database relations.",
    level: "expert"
  },
  {
    question: "What is the formal definition of a 'Safe TRC Expression'?",
    shortAnswer: "An expression $\\{ t \\mid P(t) \\}$ where: 1) all values in result tuple $t$ belong to $\\text{DOM}(P)$, 2) for every $\\exists u(Q(u))$, $u \\in \\text{DOM}(Q)$, and 3) for every $\\forall u(Q(u))$, $u \\notin \\text{DOM}(Q)$ makes $Q(u)$ vacuously true.",
    explanation: "The 3 formal conditions for domain-bounded safety.",
    hint: "All result values and quantified subformulas are strictly bounded within DOM(P).",
    level: "expert"
  },
  {
    question: "How do you express: 'Find the names and cities of all students paying fee > ₹4,000' in TRC?",
    shortAnswer: "$$\\{ t.\\text{full\\_name}, t.\\text{city} \\mid t \\in \\text{Students} \\land t.\\text{admission\\_fee} > 4000 \\}$$.",
    explanation: "Basic TRC projection and selection query.",
    hint: "{ t.name, t.city | t ∈ Students ∧ t.fee > 4000 }.",
    level: "basic"
  },
  {
    question: "How do you express an Equijoin between `Students` and `Enrollments` in TRC?",
    shortAnswer: "$$\\{ s.\\text{full\\_name}, e.\\text{course\\_id} \\mid s \\in \\text{Students} \\land \\exists e \\in \\text{Enrollments} (e.\\text{student\\_id} = s.\\text{student\\_id}) \\}$$.",
    explanation: "TRC existential join formulation.",
    hint: "{ s.name, e.course | s ∈ Students ∧ ∃e ∈ Enrollments (e.id = s.id) }.",
    level: "basic"
  },
  {
    question: "What is a 'Free Variable' versus a 'Bound Variable' in a TRC formula?",
    shortAnswer: "A Bound Variable is quantified by $\\exists$ or $\\forall$; a Free Variable is not quantified and represents the output tuple(s) in the result expression.",
    explanation: "Free vs bound variable distinction in mathematical logic.",
    hint: "Bound variables are quantified by ∃ or ∀; Free variables appear in the result header.",
    level: "moderate"
  },
  {
    question: "How do you express: 'Find students enrolled in AT LEAST ONE course' in TRC?",
    shortAnswer: "$$\\{ s \\mid s \\in \\text{Students} \\land \\exists e \\in \\text{Enrollments} (e.\\text{student\\_id} = s.\\text{student\\_id}) \\}$$.",
    explanation: "Existential quantifier for 1:N existence.",
    hint: "{ s | s ∈ Students ∧ ∃e ∈ Enrollments (e.student_id = s.student_id) }.",
    level: "basic"
  },
  {
    question: "How do you express: 'Find students enrolled in NO courses' (Unenrolled / Inactive) in TRC?",
    shortAnswer: "$$\\{ s \\mid s \\in \\text{Students} \\land \\neg \\exists e \\in \\text{Enrollments} (e.\\text{student\\_id} = s.\\text{student\\_id}) \\}$$.",
    explanation: "Negated existential quantifier for non-existence (Antijoin).",
    hint: "{ s | s ∈ Students ∧ ¬∃e ∈ Enrollments (e.id = s.id) }.",
    level: "basic"
  },
  {
    question: "How do you express: 'Find students who have enrolled in ALL core courses' in TRC?",
    shortAnswer: "$$\\{ s \\mid s \\in \\text{Students} \\land \\forall c \\in \\text{Core\\_Courses} (\\exists e \\in \\text{Enrollments} (e.\\text{student\\_id} = s.\\text{student\\_id} \\land e.\\text{course\\_id} = c.\\text{course\\_id})) \\}$$.",
    explanation: "Universal quantifier for relational division in TRC.",
    hint: "{ s | s ∈ Students ∧ ∀c ∈ CoreCourses (∃e ∈ Enrollments (...)) }.",
    level: "expert"
  },
  {
    question: "How is the universal TRC query above transformed using De Morgan's Law into an equivalent existential TRC formula?",
    shortAnswer: "$$\\{ s \\mid s \\in \\text{Students} \\land \\neg \\exists c \\in \\text{Core\\_Courses} (\\neg \\exists e \\in \\text{Enrollments} (e.\\text{student\\_id} = s.\\text{student\\_id} \\land e.\\text{course\\_id} = c.\\text{course\\_id})) \\}$$.",
    explanation: "Double negation translation corresponding to SQL NOT EXISTS.",
    hint: "{ s | s ∈ Students ∧ ¬∃c ∈ CoreCourses (¬∃e ∈ Enrollments (...)) }.",
    level: "expert"
  },
  {
    question: "What commercial query language was directly modeled after Tuple Relational Calculus?",
    shortAnswer: "QUEL (Query Language, used in the original Berkeley INGRES database) and SQL (which adopted TRC declarative concepts).",
    explanation: "Historical foundation of QUEL and SQL from TRC.",
    hint: "QUEL (INGRES) and SQL.",
    level: "moderate"
  },
  {
    question: "Is Tuple Relational Calculus computationally equivalent to Relational Algebra?",
    shortAnswer: "Yes! Codd's Theorem proved that Relational Algebra and Safe Relational Calculus have EXACTLY EQUAL expressive power (Relational Completeness).",
    explanation: "Codd's Equivalence Theorem.",
    hint: "Yes, Relational Algebra and Safe Relational Calculus have identical expressive power.",
    level: "basic"
  },
  {
    question: "What is the result of $\\{ t \\mid t \\in \\text{Students} \\land t.\\text{city} = \\text{'Barrackpore'} \\lor t.\\text{city} = \\text{'Kolkata'} \\}$?",
    shortAnswer: "All student tuples residing in either Barrackpore or Kolkata (Union of the two city subsets).",
    explanation: "Disjunctive boolean logic in TRC.",
    hint: "Students from Barrackpore or Kolkata.",
    level: "basic"
  },
  {
    question: "How do you express a Self-Join in TRC to find students who share the same city as Mamata?",
    shortAnswer: "$$\\{ s.\\text{full\\_name} \\mid s \\in \\text{Students} \\land \\exists m \\in \\text{Students} (m.\\text{full\\_name} = \\text{'Mamata Hui'} \\land s.\\text{city} = m.\\text{city} \\land s.\\text{student\\_id} \\neq m.\\text{student\\_id}) \\}$$.",
    explanation: "Self-join formulation in TRC.",
    hint: "{ s.name | s ∈ Students ∧ ∃m ∈ Students (m.name = 'Mamata' ∧ s.city = m.city) }.",
    level: "moderate"
  },
  {
    question: "Why is $\\{ t \\mid t \\notin \\text{Students} \\}$ mathematically unsafe?",
    shortAnswer: "Because it asks for every element in the universe that is not in `Students`, which is infinite and impossible to compute.",
    explanation: "Unsafe complement demonstration.",
    hint: "It represents an infinite complement set.",
    level: "basic"
  },
  {
    question: "How can an unsafe negation formula be made safe in TRC?",
    shortAnswer: "By intersecting it with a bounded relation: $\\{ t \\mid t \\in \\text{All\\_Candidates} \\land \\neg(t \\in \\text{Enrolled\\_Students}) \\}$.",
    explanation: "Range restriction safety pattern.",
    hint: "Bind the free variable to a finite domain relation: t ∈ All_Candidates ∧ ¬(...).",
    level: "moderate"
  },
  {
    question: "What role did E.F. Codd play in developing Tuple Relational Calculus?",
    shortAnswer: "Codd introduced TRC (under the name 'Relational Calculus' based on first-order predicate logic) in his seminal 1971 and 1972 papers establishing relational database query theory.",
    explanation: "Historical foundation of TRC by Codd.",
    hint: "Introduced by E.F. Codd in 1971-1972 papers.",
    level: "basic"
  },
  {
    question: "How does an RDBMS query engine translate a declarative TRC expression into executable code?",
    shortAnswer: "Using Codd's Reduction Algorithm, which translates the non-procedural calculus formula into an equivalent procedural Relational Algebra query tree.",
    explanation: "Codd's reduction algorithm from calculus to algebra.",
    hint: "Translates calculus formulas into procedural relational algebra query trees.",
    level: "expert"
  },
  {
    question: "Can arithmetic calculations (like GST or discounts) be expressed in classical TRC?",
    shortAnswer: "Pure classical first-order TRC does not include arithmetic functions; Extended Relational Calculus introduces scalar function terms to support arithmetic expressions.",
    explanation: "Classical vs extended calculus.",
    hint: "Classical TRC is pure predicate logic; extended TRC adds scalar arithmetic.",
    level: "moderate"
  },
  {
    question: "How do you express: 'Find the maximum admission fee in Students' in Extended TRC?",
    shortAnswer: "$$\\{ t.\\text{fee} \\mid t \\in \\text{Students} \\land \\neg \\exists u \\in \\text{Students} (u.\\text{fee} > t.\\text{fee}) \\}$$.",
    explanation: "Maximum determination in pure predicate logic.",
    hint: "Find tuple t where no tuple u exists with a higher fee: ¬∃u (u.fee > t.fee).",
    level: "expert"
  },
  {
    question: "What is Implication ($\\rightarrow$) in TRC logic: $P \\rightarrow Q$?",
    shortAnswer: "$$P \\rightarrow Q \\equiv \\neg P \\lor Q$$. In database queries, it is used with $\\forall$: $\\forall u (u \\in \\text{CoreCourses} \\rightarrow \\dots)$ ('If $u$ is a core course, then student enrolled in $u$').",
    explanation: "Logical implication in universal queries.",
    hint: "P → Q ≡ ¬P ∨ Q (Used in ∀ queries).",
    level: "expert"
  },
  {
    question: "Why do universities teach Tuple Relational Calculus in computer science curricula?",
    shortAnswer: "Because it teaches the formal mathematical foundations of declarative query languages, predicate logic reasoning, and query safety bounds.",
    explanation: "Academic and theoretical significance of TRC.",
    hint: "Teaches formal declarative predicate logic foundations of database theory.",
    level: "basic"
  },
  {
    question: "What is the master checklist for mastering Tuple Relational Calculus (TRC)?",
    shortAnswer: "1) Use $\\{ t \\mid P(t) \\}$ syntax. 2) Always bind variables ($t \\in R$) to guarantee Safety. 3) Use $\\exists$ for existence / inner joins. 4) Use $\\neg \\exists$ for non-existence / antijoins. 5) Use $\\forall$ or $\\neg \\exists \\neg$ for universal 'for all' division queries. 6) Remember: Safe TRC $\\equiv$ Relational Algebra in expressive power.",
    explanation: "Master summary of Tuple Relational Calculus rules.",
    hint: "{ t | P(t) } syntax, Variable binding, Safety bounds, ∃ for existence, ∀ for all, Codd equivalence.",
    level: "basic"
  }
];

export default questions;
