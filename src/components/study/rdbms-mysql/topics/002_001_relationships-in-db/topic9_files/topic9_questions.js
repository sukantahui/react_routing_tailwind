// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the Enhanced Entity-Relationship (EER) Modeler in MySQL Workbench?",
    shortAnswer: "A visual schema design and diagramming tool in MySQL Workbench that enables reverse engineering, forward engineering, and visual table modeling.",
    explanation: "Allows developers to visually inspect and architect relational databases.",
    hint: "Visual schema design tool in MySQL Workbench.",
    level: "basic"
  },
  {
    question: "What is 'Reverse Engineering' in MySQL Workbench EER Modeler?",
    shortAnswer: "The automated process of connecting to a live MySQL database instance, reading its schema catalog, and generating an interactive visual EER diagram.",
    explanation: "Allows developers to visually audit existing databases in seconds.",
    hint: "Generates EER diagram from existing live database.",
    level: "basic"
  },
  {
    question: "What keyboard shortcut triggers Reverse Engineering in MySQL Workbench?",
    shortAnswer: "`Ctrl + R` (or Top Menu: `Database` -> `Reverse Engineer...`).",
    explanation: "Standard shortcut for opening the Reverse Engineer wizard.",
    hint: "Ctrl + R.",
    level: "basic"
  },
  {
    question: "What is 'Forward Engineering' in MySQL Workbench?",
    shortAnswer: "The process of exporting a visual EER diagram model into an executable SQL DDL script (`CREATE TABLE`, indexes, constraints) or executing it directly on a database.",
    explanation: "Converts visual designs into production SQL.",
    hint: "Exports visual EER model into SQL DDL script.",
    level: "basic"
  },
  {
    question: "What is the visual difference between an 'Identifying' vs 'Non-Identifying' relationship line in MySQL Workbench?",
    shortAnswer: "An Identifying relationship is drawn as a SOLID line; a Non-Identifying relationship is drawn as a DASHED line.",
    explanation: "Solid indicates the parent key is part of the child's primary key; dashed indicates child has its own primary key.",
    hint: "Solid line (Identifying) vs Dashed line (Non-Identifying).",
    level: "moderate"
  },
  {
    question: "What happens when you use the '1:n Identifying Relationship' (Solid Line) tool in MySQL Workbench?",
    shortAnswer: "Workbench automatically adds the parent's Primary Key as a Foreign Key AND includes it in the child table's Composite Primary Key.",
    explanation: "Used for strong existential composition (e.g. `order_items` with PK `(order_id, product_id)`).",
    hint: "Promotes parent PK into child composite primary key.",
    level: "moderate"
  },
  {
    question: "What happens when you use the '1:n Non-Identifying Relationship' (Dashed Line) tool in MySQL Workbench?",
    shortAnswer: "Workbench adds the parent's Primary Key as a standard Foreign Key column in the child table without making it part of the child's Primary Key.",
    explanation: "Used for standard One-to-Many links (e.g. `departments` 1:n `students`).",
    hint: "Standard FK column without altering child PK.",
    level: "basic"
  },
  {
    question: "What happens when you use the 'n:m Many-to-Many Relationship' tool in MySQL Workbench?",
    shortAnswer: "Workbench automatically generates a new intermediate junction table containing foreign keys referencing both tables and a Composite Primary Key.",
    explanation: "Automates junction table creation visually.",
    hint: "Automatically creates intermediate junction table.",
    level: "basic"
  },
  {
    question: "How do you configure referential actions (`CASCADE`, `RESTRICT`, `SET NULL`) inside MySQL Workbench EER Modeler?",
    shortAnswer: "Double-click the relationship connector line (or double-click the child table -> `Foreign Keys` tab), and select the desired `On Update` and `On Delete` actions from the dropdown menus.",
    explanation: "Configurable directly inside the Foreign Key property inspector.",
    hint: "Foreign Keys tab in Table Inspector or relationship line properties.",
    level: "basic"
  },
  {
    question: "In Crow's Foot notation inside MySQL Workbench, what does a three-pronged fork symbol at the end of a line signify?",
    shortAnswer: "The 'MANY' ($N$) cardinality side of the relationship.",
    explanation: "Standard Crow's foot notation for multiplicity.",
    hint: "The Many side.",
    level: "basic"
  },
  {
    question: "In Crow's Foot notation inside MySQL Workbench, what does a single circle ('O') adjacent to the fork signify?",
    shortAnswer: "Optional modality (minimum cardinality = 0; the relationship is optional for that entity).",
    explanation: "Represents zero or more (0..N).",
    hint: "Optional modality (minimum 0).",
    level: "basic"
  },
  {
    question: "In Crow's Foot notation inside MySQL Workbench, what does a perpendicular vertical bar ('|') adjacent to the fork signify?",
    shortAnswer: "Mandatory modality (minimum cardinality = 1; at least one entity instance must exist).",
    explanation: "Represents one or more (1..N).",
    hint: "Mandatory modality (minimum 1).",
    level: "basic"
  },
  {
    question: "What is 'Schema Synchronization' in MySQL Workbench?",
    shortAnswer: "A feature that compares a visual EER model with a live database server, identifies schema differences, and generates differential `ALTER` scripts to sync them.",
    explanation: "Automates database schema diffing and migrations.",
    hint: "Compares visual model against live DB to generate ALTER diffs.",
    level: "expert"
  },
  {
    question: "How do you export an EER Diagram from MySQL Workbench as an image or document for technical documentation?",
    shortAnswer: "Top Menu: `File` -> `Export` -> `Export as PNG...`, `Export as SVG...`, or `Export as PDF...`.",
    explanation: "Generates high-resolution diagrams for client presentations and architecture docs.",
    hint: "File -> Export as PNG/SVG/PDF.",
    level: "basic"
  },
  {
    question: "What notation styles does MySQL Workbench support for EER Diagrams?",
    shortAnswer: "Crow's Foot (Default), UML, IDEF1X, Classic ER, and Barker notation.",
    explanation: "Configurable via `Model` -> `Relationship Notation`.",
    hint: "Crow's Foot, UML, IDEF1X, Classic ER, Barker.",
    level: "moderate"
  },
  {
    question: "Why should you verify the default storage engine in MySQL Workbench Model Preferences before Forward Engineering?",
    shortAnswer: "Because if the model defaults to MyISAM, foreign key constraints will be silently ignored when executed on the MySQL server; it MUST be set to `InnoDB`.",
    explanation: "InnoDB is mandatory for foreign key enforcement.",
    hint: "InnoDB is required for foreign key enforcement.",
    level: "moderate"
  },
  {
    question: "How do you organize large EER diagrams containing 50+ tables in MySQL Workbench?",
    shortAnswer: "By creating multiple Diagram Layers / Pages (Subject Area EER Canvases) or using colored Layer Boxes to group related functional domains.",
    explanation: "Deconstructs complex enterprise schemas into readable modules.",
    hint: "Multiple diagram pages and colored layer boxes.",
    level: "moderate"
  },
  {
    question: "What is a 'Model File' format used by MySQL Workbench?",
    shortAnswer: "An XML-based compressed file with the `.mwb` extension (MySQL Workbench Model).",
    explanation: "Stores the visual canvas layout, tables, notes, and relationship geometry.",
    hint: ".mwb file extension.",
    level: "basic"
  },
  {
    question: "How does MySQL Workbench visually represent a Self-Referencing table?",
    shortAnswer: "As a relationship line that loops out from the table and connects back into the same table.",
    explanation: "Visual representation of recursive hierarchies (e.g. `manager_id -> emp_id`).",
    hint: "Looping line connecting back to same table.",
    level: "basic"
  },
  {
    question: "What does the yellow key icon next to a column name in MySQL Workbench table editor indicate?",
    shortAnswer: "The column is part of the table's Primary Key (`PK`).",
    explanation: "Standard Workbench visual key glyph.",
    hint: "Primary Key column.",
    level: "basic"
  },
  {
    question: "What does the red diamond (filled diamond) icon next to a column name indicate?",
    shortAnswer: "The column has the `NOT NULL` constraint (`NN`).",
    explanation: "Indicates a mandatory attribute.",
    hint: "NOT NULL column.",
    level: "basic"
  },
  {
    question: "What does the blue diamond (empty/hollow diamond) icon next to a column name indicate?",
    shortAnswer: "The column is nullable (allows `NULL` values).",
    explanation: "Indicates an optional attribute.",
    hint: "Nullable column.",
    level: "basic"
  },
  {
    question: "What does the red diamond with a blue border or chain icon indicate?",
    shortAnswer: "The column is a Foreign Key (`FK`).",
    explanation: "Indicates a referential link to a parent table.",
    hint: "Foreign Key column.",
    level: "basic"
  },
  {
    question: "How do you rearrange overlapping relationship lines in MySQL Workbench canvas?",
    shortAnswer: "Use Top Menu: `Arrange` -> `Autolayout` or manually click and drag table boxes and line inflection anchor points.",
    explanation: "Improves visual clarity of complex entity relationships.",
    hint: "Arrange -> Autolayout or manual dragging.",
    level: "basic"
  },
  {
    question: "Can MySQL Workbench reverse engineer views, stored procedures, and triggers?",
    shortAnswer: "Yes, the Reverse Engineering wizard allows importing Routines, Triggers, Views, and User Privileges alongside tables.",
    explanation: "Comprehensive database reverse engineering.",
    hint: "Imports routines, views, and triggers.",
    level: "moderate"
  },
  {
    question: "What error occurs if you attempt to forward-engineer an EER model containing circular identifying relationships?",
    shortAnswer: "MySQL rejects the DDL with an impossible primary key dependency error because neither table can be created first.",
    explanation: "Identifying loops create impossible cyclic dependencies.",
    hint: "Cyclic primary key dependency error.",
    level: "expert"
  },
  {
    question: "How do you visually add table comments and column descriptions in MySQL Workbench?",
    shortAnswer: "Inside the Table Editor bottom dock, select the `Comments` field to document business requirements; these export directly into SQL `COMMENT` clauses.",
    explanation: "Embeds business documentation directly into the schema.",
    hint: "Comments dock in Table Editor.",
    level: "basic"
  },
  {
    question: "What is the difference between MySQL Workbench Community vs Commercial editions for EER modeling?",
    shortAnswer: "Both Community and Commercial editions include the full EER modeling, reverse engineering, and forward engineering capabilities without restriction.",
    explanation: "EER modeling is 100% free and open-source in MySQL Workbench.",
    hint: "Full EER features available in free Community edition.",
    level: "basic"
  },
  {
    question: "How do you forward-engineer a visual model to generate ONLY the SQL script without executing it against a live database?",
    shortAnswer: "Navigate to `Database` -> `Forward Engineer...` and choose 'Save to SQL Script File' or copy the generated script on the Review step.",
    explanation: "Generates `.sql` migration files for deployment pipelines.",
    hint: "Save to SQL Script File in Forward Engineer wizard.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for modeling table relationships in MySQL Workbench?",
    shortAnswer: "1) Set default engine to `InnoDB`. 2) Use Dashed lines for standard 1:N non-identifying links. 3) Use Solid lines only when parent key is part of child Composite PK. 4) Explicitly configure `On Delete` / `On Update` actions in FK inspector. 5) Export diagrams as PNG/SVG for documentation.",
    explanation: "Following these 5 rules guarantees accurate visual architecture and clean generated SQL DDL.",
    hint: "InnoDB default, Dashed for non-identifying, Solid for identifying, FK actions configured, Export PNG.",
    level: "basic"
  }
];

export default questions;
