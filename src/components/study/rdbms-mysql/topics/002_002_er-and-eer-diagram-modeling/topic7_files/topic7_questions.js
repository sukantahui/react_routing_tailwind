// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What are the three most prominent data modeling notations used in database design?",
    shortAnswer: "1) Peter Chen Notation (1976), 2) Martin / Information Engineering (Crow's Foot) Notation, and 3) UML (Unified Modeling Language) Class Diagram Notation.",
    explanation: "The dominant visual notations in academic and industry practice.",
    hint: "Peter Chen, Crow's Foot (IE), and UML Class Diagrams.",
    level: "basic"
  },
  {
    question: "How does Peter Chen notation represent an Entity vs an Attribute vs a Relationship?",
    shortAnswer: "Entity = Rectangle; Attribute = Oval branching outside; Relationship = Diamond with name.",
    explanation: "Classic 3-symbol conceptual vocabulary.",
    hint: "Rectangle, Oval, Diamond.",
    level: "basic"
  },
  {
    question: "How does Crow's Foot (Martin / IE) notation represent an Entity and its Attributes?",
    shortAnswer: "As a multi-compartment Rectangle where the table name is in the header, Primary Keys are in the top compartment, and non-key attributes are listed directly inside.",
    explanation: "Eliminates outer ovals for clean, compact diagrams.",
    hint: "Rectangle with internal attribute compartments.",
    level: "basic"
  },
  {
    question: "How does UML Class Diagram notation represent an Entity and its Attributes?",
    shortAnswer: "As a 3-compartment Class Box: Top compartment = Class Name; Middle = Attributes and Data Types; Bottom = Methods/Operations.",
    explanation: "Object-oriented modeling standard.",
    hint: "3-compartment Class Box.",
    level: "basic"
  },
  {
    question: "Why is Crow's Foot notation preferred over Peter Chen notation for large enterprise schemas?",
    shortAnswer: "Crow's Foot lists attributes inside the entity rectangle, avoiding hundreds of branching ovals that clutter diagrams with 50+ tables.",
    explanation: "Extreme visual compactness for large schemas.",
    hint: "Avoids visual oval clutter in large multi-table schemas.",
    level: "basic"
  },
  {
    question: "What does the Crow's Foot symbol `||` (Double Vertical Bar) represent?",
    shortAnswer: "Mandatory Exactly One (1:1 with Total Participation).",
    explanation: "Min = 1, Max = 1.",
    hint: "Mandatory Exactly One.",
    level: "basic"
  },
  {
    question: "What does the Crow's Foot symbol `o|` (Circle + Bar) represent?",
    shortAnswer: "Optional Zero or One (0:1 with Partial Participation).",
    explanation: "Min = 0, Max = 1.",
    hint: "Optional Zero or One.",
    level: "basic"
  },
  {
    question: "What does the Crow's Foot symbol `>|` (Bar + Crow's Foot) represent?",
    shortAnswer: "Mandatory One or More (1:N with Total Participation).",
    explanation: "Min = 1, Max = N.",
    hint: "Mandatory One or More.",
    level: "basic"
  },
  {
    question: "What does the Crow's Foot symbol `>o` (Circle + Crow's Foot) represent?",
    shortAnswer: "Optional Zero or More (0:N with Partial Participation).",
    explanation: "Min = 0, Max = N.",
    hint: "Optional Zero or More.",
    level: "basic"
  },
  {
    question: "How is Total Participation represented in Peter Chen vs Crow's Foot vs UML?",
    shortAnswer: "Peter Chen: Double Line (`═══`); Crow's Foot: Vertical Bar (`|`); UML: Multiplicity starting with 1 (`1..*` or `1`).",
    explanation: "Cross-notation mapping of mandatory participation.",
    hint: "Double line (Chen) vs Bar (Crow's foot) vs 1..* (UML).",
    level: "moderate"
  },
  {
    question: "How is a Weak Entity represented in Peter Chen vs Crow's Foot vs UML?",
    shortAnswer: "Peter Chen: Double Rectangle (`[[ ]]`); Crow's Foot: Rounded Rectangle / Solid identifying line; UML: Composition (Solid Black Diamond `◆`).",
    explanation: "Cross-notation mapping of weak entities.",
    hint: "Double rectangle vs Rounded rectangle vs Solid Diamond Composition.",
    level: "moderate"
  },
  {
    question: "How are Multi-Valued Attributes represented in Peter Chen vs Crow's Foot vs UML?",
    shortAnswer: "Peter Chen: Double Oval; Crow's Foot: Dedicated child table; UML: Multiplicity `[0..*]` or separate class with `1..*` association.",
    explanation: "Visual representations of multi-valued attributes.",
    hint: "Double oval vs child table vs [0..*] array.",
    level: "moderate"
  },
  {
    question: "How are Derived Attributes represented in Peter Chen vs UML?",
    shortAnswer: "Peter Chen: Dashed Oval; UML: Prefixing the attribute name with a forward slash (`/age : Integer`).",
    explanation: "Slash prefix is the standard UML derived attribute convention.",
    hint: "Dashed oval (Chen) vs forward slash prefix (UML).",
    level: "moderate"
  },
  {
    question: "Which modeling notation is natively used by MySQL Workbench EER Modeler?",
    shortAnswer: "Crow's Foot (Information Engineering) notation.",
    explanation: "Standard industry ER modeling notation in Workbench.",
    hint: "Crow's Foot / Information Engineering.",
    level: "basic"
  },
  {
    question: "How does UML represent Generalization / Specialization (Inheritance) compared to EER notation?",
    shortAnswer: "UML uses a solid line with a Hollow Triangle pointing from subclass to superclass; EER uses a circle with 'd' (disjoint) or 'o' (overlapping) and a subset symbol (`⊂`).",
    explanation: "Object-oriented inheritance notation vs EER category circle.",
    hint: "Hollow triangle in UML vs 'd'/'o' circle in EER.",
    level: "moderate"
  },
  {
    question: "What is an 'Association Class' in UML, and what does it correspond to in relational ER modeling?",
    shortAnswer: "A class attached to an association line that holds attributes of the relationship; corresponds to an M:N Junction / Bridge table in relational modeling.",
    explanation: "UML mechanism for modeling relationship attributes on M:N links.",
    hint: "Corresponds to an M:N Junction table.",
    level: "expert"
  },
  {
    question: "What is the difference between UML Aggregation (Hollow Diamond `◇`) and UML Composition (Solid Diamond `◆`) in database terms?",
    shortAnswer: "Aggregation represents a loose, non-identifying relationship (child survives parent deletion); Composition represents a Weak Entity with existence dependency (child is deleted via CASCADE when parent is deleted).",
    explanation: "Direct mapping to weak entity lifecycle cascading.",
    hint: "Loose reference vs Weak entity existence dependency.",
    level: "expert"
  },
  {
    question: "Can relationship diamonds exist in Crow's Foot notation?",
    shortAnswer: "No, Crow's Foot notation connects entities directly with relationship lines and places verb phrases on the lines, completely omitting relationship diamonds.",
    explanation: "Crow's foot achieves compactness by dropping diamonds.",
    hint: "No diamonds in Crow's Foot notation.",
    level: "basic"
  },
  {
    question: "Why do academic textbooks (like Silberschatz and Elmasri/Navathe) prefer Peter Chen notation?",
    shortAnswer: "Because Peter Chen notation clearly separates Entities, Relationships, Attributes, and Identifiers into distinct geometric shapes, making theoretical concepts explicit for teaching.",
    explanation: "Pedagogical clarity of geometric separation.",
    hint: "Pedagogical clarity of distinct geometric shapes.",
    level: "moderate"
  },
  {
    question: "Why do enterprise database architects prefer Crow's Foot notation over Peter Chen notation?",
    shortAnswer: "Because Crow's Foot notation scales to hundreds of tables on a single architecture diagram and directly mirrors physical relational table structures and foreign key lines.",
    explanation: "Scalability and direct physical schema mapping.",
    hint: "Scales to hundreds of tables without visual clutter.",
    level: "basic"
  },
  {
    question: "In UML Class diagrams, what does `{id}` or stereotype `<<PK>>` next to an attribute signify?",
    shortAnswer: "It designates that attribute as the Primary Key identifier of the class/table.",
    explanation: "Stereotype or modifier for entity identifiers.",
    hint: "Designates the Primary Key identifier.",
    level: "basic"
  },
  {
    question: "How is a Ternary Relationship drawn in Crow's Foot notation?",
    shortAnswer: "Crow's Foot notation does NOT support direct 3-way line junctions; it requires promoting the ternary relationship into an explicit Associative Entity table connecting 3 binary lines.",
    explanation: "Crow's foot enforces binary connections.",
    hint: "Promoted to an Associative Entity with 3 binary lines.",
    level: "expert"
  },
  {
    question: "How do you distinguish between Identifying and Non-Identifying relationships in MySQL Workbench Crow's Foot diagrams?",
    shortAnswer: "Identifying relationships (Weak entities) are drawn with a SOLID line; Non-Identifying relationships are drawn with a DASHED line.",
    explanation: "Workbench visual convention for foreign key propagation.",
    hint: "Solid line (Identifying) vs Dashed line (Non-Identifying).",
    level: "moderate"
  },
  {
    question: "What is IDEF1X notation?",
    shortAnswer: "A US Federal Government standard data modeling notation derived from Peter Chen and Information Engineering, using rectangles, rounded boxes, and solid/dashed lines.",
    explanation: "Defense and federal government database standard.",
    hint: "US Federal Government data modeling standard.",
    level: "expert"
  },
  {
    question: "How are composite attributes drawn in Crow's Foot notation?",
    shortAnswer: "They are already flattened into individual column names inside the entity box (e.g. `street`, `city`, `pincode`).",
    explanation: "Crow's Foot models logical/physical tables directly.",
    hint: "Flattened directly into individual column rows.",
    level: "basic"
  },
  {
    question: "What is the equivalent of Peter Chen's Dashed Underline (Partial Key) in UML?",
    shortAnswer: "An attribute with modifier `{discriminator}` or marked as part of a composite key alongside the parent foreign key.",
    explanation: "UML representation of partial keys.",
    hint: "Discriminator modifier in UML.",
    level: "moderate"
  },
  {
    question: "Can an engineering team use Peter Chen for conceptual modeling and Crow's Foot for physical modeling on the same project?",
    shortAnswer: "Yes, this is standard industry practice: Chen notation for conceptual requirements gathering, followed by Crow's Foot in MySQL Workbench for physical schema generation.",
    explanation: "Seamless progression across the database lifecycle.",
    hint: "Standard industry lifecycle practice.",
    level: "basic"
  },
  {
    question: "What is the Barker's ER Notation (used by Oracle Designer)?",
    shortAnswer: "A variation of Crow's Foot notation using soft boxes with rounded corners, `#` for primary keys, `*` for mandatory attributes, and `o` for optional attributes.",
    explanation: "Classic Oracle ER modeling standard.",
    hint: "Oracle notation using #, *, and o.",
    level: "expert"
  },
  {
    question: "How do you map a UML `1..*` multiplicity into MySQL DDL?",
    shortAnswer: "Foreign key column in child table declared `NOT NULL` (enforces minimum 1 parent).",
    explanation: "Mandatory participation on the foreign key.",
    hint: "NOT NULL on child foreign key column.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for choosing and applying ER notations in database projects?",
    shortAnswer: "1) Use Peter Chen notation for academic teaching and initial business domain modeling. 2) Use Crow's Foot (IE) for MySQL Workbench and production DDL generation. 3) Use UML Class Diagrams when collaborating with full-stack software engineers. 4) Never mix symbols from different notations on the same diagram.",
    explanation: "Following these 4 rules guarantees crystal-clear architectural communication.",
    hint: "Chen for conceptual, Crow's foot for MySQL DDL, UML for OO code, Never mix notation symbols.",
    level: "basic"
  }
];

export default questions;
