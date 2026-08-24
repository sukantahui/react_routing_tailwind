// topic20_files/topic20_questions.js

const questions = [
  {
    question: "What is a Connection Trap in ER modeling?",
    shortAnswer: "A structural flaw in an ER diagram pathway between related entities that creates ambiguity or breaks data retrieval pathways.",
    explanation: "Structural modeling error in entity relationship paths.",
    hint: "Structural design flaw creating ambiguity or broken query paths.",
    level: "basic"
  },
  {
    question: "What is a Fan Trap?",
    shortAnswer: "A connection trap where two 1:N relationships fan out from a single central entity (`B ◄── A ──► C`), creating ambiguity about which specific B instance relates to which specific C instance.",
    explanation: "Diverging 1:N relationships causing ambiguity.",
    hint: "Two 1:N links fanning out from a central entity.",
    level: "basic"
  },
  {
    question: "How do you detect a Fan Trap in an ER diagram?",
    shortAnswer: "Look for a central entity that has TWO OR MORE 1:N relationships diverging away from it towards other entities (`1-to-Many` and `1-to-Many`).",
    explanation: "Visual recognition pattern for fan traps.",
    hint: "Look for diverging 1:N arrows from a central entity.",
    level: "basic"
  },
  {
    question: "How do you resolve a Fan Trap?",
    shortAnswer: "By restructuring the relationships so they form a serial linear chain (`A ➔ B ➔ C`) or by adding a direct relationship between the child entities (`B ──< Works_On >── C`).",
    explanation: "Restructuring to remove path ambiguity.",
    hint: "Restructure into a serial chain or connect child entities directly.",
    level: "moderate"
  },
  {
    question: "What is a Chasm Trap?",
    shortAnswer: "A connection trap where a pathway between related entities exists in the schema, but is broken for certain entity instances because of PARTIAL (Optional) participation across intermediate links.",
    explanation: "Broken path due to optional/nullable intermediate foreign keys.",
    hint: "Broken query pathway caused by optional/nullable links.",
    level: "basic"
  },
  {
    question: "How do you detect a Chasm Trap in an ER diagram?",
    shortAnswer: "Look for a relationship pathway that relies on one or more intermediate entities with PARTIAL (0..1 / Nullable) participation.",
    explanation: "Visual recognition pattern for chasm traps.",
    hint: "Look for partial/nullable intermediate participation.",
    level: "basic"
  },
  {
    question: "How do you resolve a Chasm Trap?",
    shortAnswer: "By adding a DIRECT relationship between the origin entity and the destination entity, bypassing the optional intermediate entity.",
    explanation: "Direct relationship eliminates dependency on optional links.",
    hint: "Add a direct relationship bypassing the optional entity.",
    level: "moderate"
  },
  {
    question: "What is an example of a Fan Trap in a university schema?",
    shortAnswer: "`Department(1) ──< Employs >── (N) Professors` AND `Department(1) ──< Teaches >── (N) Courses`. We know which department a professor and course belong to, but cannot tell which specific professor teaches which specific course!",
    explanation: "Classic academic fan trap example.",
    hint: "Department employs professors and offers courses; cannot tell who teaches what.",
    level: "basic"
  },
  {
    question: "How do you resolve the university Professor-Course Fan Trap?",
    shortAnswer: "Restructure the schema: `Department(1) ➔ (N) Courses(1) ➔ (N) Professors` OR add a direct `Professors ──< Teaches >── Courses` relationship.",
    explanation: "Direct association eliminates ambiguity.",
    hint: "Direct Teaches relationship between Professors and Courses.",
    level: "basic"
  },
  {
    question: "What is an example of a Chasm Trap in real estate management?",
    shortAnswer: "`Branch(1) ──< Has >── (N) Staff(1) ──< Manages (Optional) >── (N) Properties`. If a property is currently unassigned (has no staff manager), we cannot determine which Branch owns it!",
    explanation: "Classic Connolly & Begg real estate chasm trap.",
    hint: "Unassigned property cannot find its branch through a staff member.",
    level: "basic"
  },
  {
    question: "How do you resolve the real estate Chasm Trap?",
    shortAnswer: "Add a direct `Branch(1) ──< Owns >── (N) Properties` foreign key in the `properties` table (`branch_id INT NOT NULL`).",
    explanation: "Direct ownership foreign key eliminates the chasm.",
    hint: "Add direct branch_id foreign key in properties table.",
    level: "basic"
  },
  {
    question: "What is the pitfall of 'Misidentifying an Entity as an Attribute'?",
    shortAnswer: "Storing an entire complex concept (like Department details or Supplier info) as flat strings inside another table, causing data redundancy, update anomalies, and 2NF/3NF violations.",
    explanation: "Violates normalization and creates update anomalies.",
    hint: "Storing complex concepts as flat text strings in another table.",
    level: "moderate"
  },
  {
    question: "What is the guideline for deciding whether a concept should be an Entity vs an Attribute?",
    shortAnswer: "If the concept has its own independent lifecycle, sub-attributes, or participates in relationships with other entities, it MUST be an Entity; if it is a single atomic scalar with no relationships, it is an Attribute.",
    explanation: "Core conceptual modeling decision heuristic.",
    hint: "Entity if it has sub-attributes or relationships; Attribute if simple scalar.",
    level: "basic"
  },
  {
    question: "What is the pitfall of 'Misidentifying an Attribute as an Entity' (Over-Engineering)?",
    shortAnswer: "Creating standalone tables for trivial scalar values (e.g. creating a `genders` table or `blood_groups` table with no extra attributes), adding unnecessary joins and schema complexity.",
    explanation: "Avoid unnecessary table proliferation.",
    hint: "Creating tables for simple static scalars without extra attributes.",
    level: "basic"
  },
  {
    question: "When SHOULD a scalar attribute (like `order_status`) be promoted to a full Entity table?",
    shortAnswer: "When statuses need dynamic administrative management (adding new statuses without DDL changes), multi-lingual display names, or transition workflow rules.",
    explanation: "Dynamic lookup table promotion.",
    hint: "When statuses need dynamic management, descriptions, or workflow rules.",
    level: "moderate"
  },
  {
    question: "How does SQL query behavior reveal a Fan Trap in a relational schema?",
    shortAnswer: "Joining the three tables produces a Cartesian-like product (row multiplication) on the fan arms, causing incorrect `COUNT()` and `SUM()` aggregate results.",
    explanation: "Aggregate inflation caused by fan traps.",
    hint: "Row multiplication producing inflated aggregate SUM and COUNT results.",
    level: "expert"
  },
  {
    question: "How does SQL query behavior reveal a Chasm Trap in a relational schema?",
    shortAnswer: "An `INNER JOIN` query traversing the optional link fails to return rows with NULL foreign keys; a `LEFT JOIN` returns NULL for the target entity, losing connection to the root entity.",
    explanation: "Data loss during join traversal.",
    hint: "INNER JOIN drops unlinked rows; LEFT JOIN returns NULL parent info.",
    level: "expert"
  },
  {
    question: "Can a Fan Trap occur in an M:N relationship network?",
    shortAnswer: "Yes, when two M:N relationships connect to a central bridge table without explicit cross-link constraints.",
    explanation: "M:N connection traps.",
    hint: "Yes, multi-way M:N links can have path ambiguity.",
    level: "moderate"
  },
  {
    question: "What is the difference between a Fan Trap and a Chasm Trap in terms of data accuracy?",
    shortAnswer: "A Fan Trap leads to AMBIGUITY (we get multiple possible answers and inflated counts); a Chasm Trap leads to DATA LOSS (we get no answer because the path is broken).",
    explanation: "Ambiguity vs Data Loss.",
    hint: "Fan Trap = Ambiguity; Chasm Trap = Data Loss.",
    level: "basic"
  },
  {
    question: "How do you test your ER diagram for Connection Traps during the design phase?",
    shortAnswer: "Trace specific business use-case query paths on the diagram: 1) Verify every pathway has a unique, non-ambiguous route (no Fan Traps). 2) Verify no path requires traversing an optional link to find mandatory parent data (no Chasm Traps).",
    explanation: "Path walkthrough validation methodology.",
    hint: "Trace business queries to ensure unique non-ambiguous paths without optional breaks.",
    level: "moderate"
  },
  {
    question: "In a medical schema, `Hospital(1) ➔ (N) Doctors` and `Hospital(1) ➔ (N) Patients`. Is this a Fan Trap?",
    shortAnswer: "Yes! It tells us which hospital a doctor and patient visit, but cannot tell which doctor treats which patient. We must add `Appointments` or `Treats` connecting Doctor directly to Patient.",
    explanation: "Medical fan trap example.",
    hint: "Yes, cannot tell which doctor treats which patient.",
    level: "basic"
  },
  {
    question: "In a sales schema, `Company(1) ➔ (N) Sales_Reps(1) ➔ (Optional) Customers`. Is this a Chasm Trap?",
    shortAnswer: "Yes! If a new customer has not yet been assigned a sales rep, we cannot identify which Company branch they registered with.",
    explanation: "Sales rep chasm trap example.",
    hint: "Yes, unassigned customers lose their company connection.",
    level: "basic"
  },
  {
    question: "How does Crow's Foot notation visually indicate a potential Fan Trap?",
    shortAnswer: "Two Crow's Foot 'forks' pointing outward in opposite directions from a single central entity (`>── [Entity] ──<`).",
    explanation: "Visual Crow's Foot divergence indicator.",
    hint: "Two Crow's feet branching outward from the same entity.",
    level: "moderate"
  },
  {
    question: "How does Crow's Foot notation visually indicate a potential Chasm Trap?",
    shortAnswer: "An optional circle (`O`) on an intermediate relationship line in a multi-hop query path.",
    explanation: "Optional cardinality circle indicator.",
    hint: "Optional circle symbol along an intermediate path.",
    level: "moderate"
  },
  {
    question: "Why should you never use `VARCHAR` to store comma-separated foreign keys to 'avoid creating an entity'?",
    shortAnswer: "Because it violates 1NF, makes joins impossible without slow string functions, and eliminates database-level foreign key cascading.",
    explanation: "Severe database anti-pattern.",
    hint: "Violates 1NF and prevents foreign key referential integrity.",
    level: "basic"
  },
  {
    question: "What is a 'Redundant Relationship' and how does it differ from a Chasm Trap resolution?",
    shortAnswer: "A Redundant Relationship is an unnecessary link that can be derived from other existing mandatory links; a Chasm Trap resolution is a NECESSARY link added because the indirect path is broken by optionality.",
    explanation: "Redundant link vs essential direct pathway.",
    hint: "Redundant link is derivable; Chasm resolution is necessary because indirect path is optional.",
    level: "expert"
  },
  {
    question: "How does Peter Chen notation distinguish mandatory vs optional participation?",
    shortAnswer: "Mandatory (Total) = DOUBLE LINE; Optional (Partial) = SINGLE LINE.",
    explanation: "Chen participation notation.",
    hint: "Double line = Total (Mandatory); Single line = Partial (Optional).",
    level: "basic"
  },
  {
    question: "What is the recommended refactoring when a Fan Trap is discovered in an existing production database?",
    shortAnswer: "Add a foreign key or junction table directly between the child entities, populate it via a data migration script, and update application queries to join the child tables directly.",
    explanation: "Production schema refactoring pattern.",
    hint: "Add direct link between child tables and migrate data.",
    level: "expert"
  },
  {
    question: "How does proper ER normalization prevent Connection Traps before writing a single line of SQL?",
    shortAnswer: "By forcing the designer to validate functional dependencies and verify that every business query has an unambiguous, continuous relational path.",
    explanation: "Proactive schema validation.",
    hint: "Validates functional dependencies and continuous query pathways.",
    level: "basic"
  },
  {
    question: "What is the master checklist for detecting and avoiding ER Design Pitfalls?",
    shortAnswer: "1) Check all diverging 1:N relationships for Fan Traps (ambiguity). 2) Check all multi-hop optional links for Chasm Traps (data loss). 3) Promote concepts with sub-attributes to Entities. 4) Use simple Attributes/ENUMs for pure static scalars. 5) Walk through all user stories to verify continuous query paths.",
    explanation: "Following these 5 rules guarantees trap-free, bulletproof ER architectures.",
    hint: "Inspect diverging 1:N for Fan traps, inspect optional links for Chasm traps, correct Entity vs Attribute balance, trace user queries.",
    level: "basic"
  }
];

export default questions;
