// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is a Category (Union Type) in Extended ER (EER) modeling?",
    shortAnswer: "A specialized subclass representing a mathematical UNION of two or more distinct superclasses that may have completely different keys and attributes.",
    explanation: "Models heterogeneous ownership (e.g. Owner = Person ∪ Company ∪ Bank).",
    hint: "Subclass representing a mathematical union of distinct superclasses.",
    level: "basic"
  },
  {
    question: "How does a Category (Union Type) differ from standard Multiple Inheritance (Specialization Lattice)?",
    shortAnswer: "Multiple Inheritance is an INTERSECTION ($A \\cap B$): the instance MUST belong to ALL parent superclasses; a Category is a UNION ($A \\cup B$): the instance belongs to ONE of the parent superclasses.",
    explanation: "Core distinction between intersection and union subclassing.",
    hint: "Intersection (must be all) vs Union (is one of).",
    level: "expert"
  },
  {
    question: "How is a Category (Union Type) represented visually in EER diagrams?",
    shortAnswer: "As a circle containing the letter 'u' (for Union), connecting multiple distinct Superclasses to the single Category subclass rectangle.",
    explanation: "Standard visual notation for union categories in EER.",
    hint: "Circle containing the letter 'u'.",
    level: "basic"
  },
  {
    question: "What is a Total Category (Mandatory Union)?",
    shortAnswer: "A category where EVERY instance of the participating superclasses MUST belong to the category; drawn with a DOUBLE LINE connecting superclasses to the 'u' circle.",
    explanation: "Exhaustive union across participating superclasses.",
    hint: "Every superclass entity belongs to the category (double line).",
    level: "basic"
  },
  {
    question: "What is a Partial Category (Optional Union)?",
    shortAnswer: "A category where only a SUBSET of instances from the participating superclasses belong to the category; drawn with a SINGLE LINE connecting to the 'u' circle.",
    explanation: "Not all persons or companies own vehicles.",
    hint: "Only a subset of superclass entities belong to the category (single line).",
    level: "basic"
  },
  {
    question: "Why CANNOT a Category simply inherit a Primary Key from one of its superclasses?",
    shortAnswer: "Because the participating superclasses are distinct entity sets with different primary key domains (e.g. `Person` has `person_id`, while `Company` has `company_id` or `gstin`).",
    explanation: "Disparate key namespaces cannot be directly unified without a surrogate.",
    hint: "Superclasses have different, incompatible primary keys.",
    level: "moderate"
  },
  {
    question: "What is the Surrogate Master Table pattern for mapping Categories to relational schemas?",
    shortAnswer: "Creating a dedicated category table (e.g. `vehicle_owners`) with a surrogate key `owner_id INT AUTO_INCREMENT`, and linking `persons` and `companies` to it via 1:1 foreign keys.",
    explanation: "Cleanest, most robust enterprise relational mapping pattern for union types.",
    hint: "Dedicated surrogate master table referenced by superclasses and child entities.",
    level: "moderate",
    codeExample: "CREATE TABLE vehicle_owners (owner_id INT AUTO_INCREMENT PRIMARY KEY, owner_type ENUM('Person', 'Company') NOT NULL);\nCREATE TABLE persons (person_id INT PRIMARY KEY, owner_id INT UNIQUE, FOREIGN KEY (owner_id) REFERENCES vehicle_owners(owner_id));\nCREATE TABLE vehicles (reg_no VARCHAR(20) PRIMARY KEY, owner_id INT NOT NULL, FOREIGN KEY (owner_id) REFERENCES vehicle_owners(owner_id));"
  },
  {
    question: "What is the Polymorphic Association (Type Discriminator) pattern for categories, and what is its drawback?",
    shortAnswer: "Storing `owner_id` and `owner_type` columns directly in the child table (`vehicles`); drawback: standard relational engines cannot enforce Foreign Key integrity across multiple target tables on a single column.",
    explanation: "Common in ORMs (Ruby on Rails, Laravel), but lacks database-level foreign key constraints.",
    hint: "owner_id + owner_type columns; lacks database-level foreign key enforcement.",
    level: "expert"
  },
  {
    question: "In the Surrogate Master pattern, how do you query the owner of vehicle 'WB-24-A-1234' regardless of whether it is a Person or a Company?",
    shortAnswer: "Using a `LEFT JOIN` on both `persons` and `companies` through the `vehicle_owners` table, selecting `COALESCE(p.full_name, c.company_name) AS owner_name`.",
    explanation: "COALESCE unified query pattern across union superclasses.",
    hint: "LEFT JOIN on persons and companies with COALESCE.",
    level: "moderate",
    codeExample: "SELECT v.vehicle_reg_no, COALESCE(p.full_name, c.company_name) AS owner_name, o.owner_type\nFROM vehicles v\nJOIN vehicle_owners o ON v.owner_id = o.owner_id\nLEFT JOIN persons p ON o.owner_id = p.owner_id\nLEFT JOIN companies c ON o.owner_id = c.owner_id\nWHERE v.vehicle_reg_no = 'WB-24-A-1234';"
  },
  {
    question: "What is an example of a real-world entity that is a Category (Union Type)?",
    shortAnswer: "`Bank_Account_Holder` (where the holder can be an Individual Person, a Registered Corporation, or a Government Agency).",
    explanation: "Classic banking union type.",
    hint: "Bank account holder (Person or Corporation).",
    level: "basic"
  },
  {
    question: "Can a Category have attributes of its own (Category-Specific Attributes)?",
    shortAnswer: "Yes, attributes that describe the union role itself (e.g. `vehicle_owners` can have `owner_registration_date` or `tax_exemption_status`).",
    explanation: "Attributes attached to the category node.",
    hint: "Yes, attributes describing the union role.",
    level: "basic"
  },
  {
    question: "Does a Category inherit ALL attributes from ALL of its participating superclasses?",
    shortAnswer: "No, an instance of a Category inherits ONLY the attributes of the SPECIFIC superclass to which it actually belongs (e.g. an individual owner does NOT inherit company GSTIN).",
    explanation: "Selective type inheritance based on concrete superclass membership.",
    hint: "Inherits only from the specific superclass it belongs to.",
    level: "expert"
  },
  {
    question: "How does Type Inheritance in a Category differ from Type Inheritance in a standard Subclass?",
    shortAnswer: "In a standard Subclass, the child inherits from ALL parent superclasses; in a Category, the child inherits from EXACTLY ONE of the alternative parent superclasses.",
    explanation: "Selective union inheritance vs cumulative intersection inheritance.",
    hint: "Selective union inheritance vs cumulative intersection inheritance.",
    level: "expert"
  },
  {
    question: "How do you enforce that an `owner_id` in `vehicle_owners` belongs to EITHER a Person OR a Company, but never both in MySQL?",
    shortAnswer: "Using a `BEFORE INSERT` trigger or application transaction that validates exclusive single-superclass linkage.",
    explanation: "Exclusivity enforcement for union categories.",
    hint: "BEFORE INSERT triggers validating exclusive linkage.",
    level: "expert"
  },
  {
    question: "What happens when a Company entity is deleted in a Category schema with `ON DELETE CASCADE`?",
    shortAnswer: "The corresponding `vehicle_owners` record is deleted, which cascades down to delete or reassign all `vehicles` owned by that company.",
    explanation: "Cascading lifecycle across category tables.",
    hint: "Cascades to category master and child vehicles.",
    level: "basic"
  },
  {
    question: "Can a Category participate in a Many-to-Many (M:N) relationship?",
    shortAnswer: "Yes (e.g. a `Property_Owner` category can own multiple properties, and a property can be co-owned by multiple owners via an M:N bridge table).",
    explanation: "Standard relationship participation once the category master is created.",
    hint: "Yes, via standard junction table referencing owner_id.",
    level: "moderate"
  },
  {
    question: "How does UML Class Diagram notation represent a Union Type / Category?",
    shortAnswer: "UML uses an `«interface»` or `«abstract class»` implemented by `Person` and `Company`, or an explicit `XOR` constraint connecting associations.",
    explanation: "Interface implementation or XOR constraint in UML.",
    hint: "Interface implementation or XOR association constraint.",
    level: "expert"
  },
  {
    question: "Why should the `owner_id` column in `persons` and `companies` be marked `UNIQUE`?",
    shortAnswer: "To guarantee a strict 1:1 relationship between a person/company and their specific category owner identity.",
    explanation: "Enforces 1:1 surrogate identity linkage.",
    hint: "Enforces 1:1 surrogate linkage.",
    level: "basic"
  },
  {
    question: "What is the advantage of the Surrogate Category Master pattern over creating separate tables like `person_vehicles` and `company_vehicles`?",
    shortAnswer: "It allows a SINGLE `vehicles` table to store all vehicles, enabling unified queries, uniform license plate uniqueness, and single-table maintenance.",
    explanation: "Eliminates duplicate table schemas.",
    hint: "Single unified vehicles table for all owners.",
    level: "moderate"
  },
  {
    question: "How do you query all vehicles owned by Companies in Kolkata using SQL?",
    shortAnswer: "`SELECT v.vehicle_reg_no, c.company_name FROM vehicles v JOIN vehicle_owners o ON v.owner_id = o.owner_id JOIN companies c ON o.owner_id = c.owner_id WHERE c.city = 'Kolkata';`.",
    explanation: "Multi-table join filtering by company superclass.",
    hint: "JOIN vehicles -> vehicle_owners -> companies.",
    level: "basic"
  },
  {
    question: "What is an 'Exclusive Category' vs an 'Inclusive Category'?",
    shortAnswer: "Exclusive Category: an entity instance can belong to at most one superclass (Person or Company); Inclusive Category: an entity can belong to multiple superclasses simultaneously.",
    explanation: "Disjointness variations within union categories.",
    hint: "Exclusive (at most one superclass) vs Inclusive (multiple).",
    level: "moderate"
  },
  {
    question: "Can a Category act as a Superclass for further specializations?",
    shortAnswer: "Yes, once defined, a Category entity set behaves like any regular entity set in the EER diagram.",
    explanation: "Categories can participate in subsequent modeling hierarchies.",
    hint: "Yes, categories can be further specialized.",
    level: "moderate"
  },
  {
    question: "How do you create a unified database View `vw_all_vehicle_details` for developers?",
    shortAnswer: "Pre-join `vehicles`, `vehicle_owners`, `persons`, and `companies` using `LEFT JOIN` and `COALESCE`.",
    explanation: "Standard view abstraction for union types.",
    hint: "Pre-joins all category tables with COALESCE.",
    level: "basic",
    codeExample: "CREATE VIEW vw_all_vehicle_details AS\nSELECT v.vehicle_reg_no, v.vehicle_model, o.owner_type, COALESCE(p.full_name, c.company_name) AS owner_name, COALESCE(p.phone, c.contact_phone) AS owner_phone\nFROM vehicles v\nJOIN vehicle_owners o ON v.owner_id = o.owner_id\nLEFT JOIN persons p ON o.owner_id = p.owner_id\nLEFT JOIN companies c ON o.owner_id = c.owner_id;"
  },
  {
    question: "What is the primary motivation for introducing Categories into Extended ER modeling?",
    shortAnswer: "To handle real-world business scenarios where a relationship must connect to a collection of objects from heterogeneous entity sets that do not share a natural superclass.",
    explanation: "Resolves heterogeneous relationship modeling challenges.",
    hint: "Models relationships to heterogeneous entity sets.",
    level: "basic"
  },
  {
    question: "Why does standard generalization fail to represent a `Vehicle_Owner` consisting of `Person` and `Company`?",
    shortAnswer: "Because `Person` and `Company` have completely different natural meanings, different identifiers (Aadhaar vs GSTIN), and different business lifecycles, making them an unnatural common superclass.",
    explanation: "Forcing an artificial superclass violates semantic clarity.",
    hint: "Person and Company have incompatible identities and lifecycles.",
    level: "moderate"
  },
  {
    question: "How do you index the `vehicles` table for high-speed lookups by `owner_id`?",
    shortAnswer: "`CREATE INDEX idx_veh_owner ON vehicles(owner_id);`.",
    explanation: "Secondary B-Tree index on foreign key.",
    hint: "Secondary index on owner_id foreign key.",
    level: "basic"
  },
  {
    question: "What happens if a vehicle is inserted with an `owner_id` that does NOT exist in `vehicle_owners`?",
    shortAnswer: "MySQL immediately aborts with Error 1452 (foreign key constraint fails).",
    explanation: "Foreign key referential integrity protection.",
    hint: "Error 1452.",
    level: "basic"
  },
  {
    question: "Can a Category have a Weak Entity dependent on it?",
    shortAnswer: "Yes (e.g. `vehicle_owners` category can own `insurance_claims` weak entities).",
    explanation: "Weak entities can depend on category entities.",
    hint: "Yes, weak entities can reference category primary keys.",
    level: "moderate"
  },
  {
    question: "What is the difference between a Circle with 'd' vs a Circle with 'u' in EER diagrams?",
    shortAnswer: "Circle with 'd' represents a DISJOINT SPECIALIZATION of a single superclass into subclasses; Circle with 'u' represents a UNION CATEGORY combining multiple distinct superclasses into a single category subclass.",
    explanation: "Single parent splitting ('d') vs Multiple parents uniting ('u').",
    hint: "Disjoint split ('d') vs Union combine ('u').",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for modeling Union Types and Categories?",
    shortAnswer: "1) Identify heterogeneous entity sets connecting to a single relationship. 2) Draw Category circle with 'u'. 3) Use double line for Total or single line for Partial union. 4) Implement Surrogate Category Master table in MySQL. 5) Link superclasses to category master with 1:1 UNIQUE foreign keys.",
    explanation: "Following these 5 rules guarantees robust relational modeling of union categories.",
    hint: "Heterogeneous entities, 'u' circle, Surrogate master table, 1:1 UNIQUE FK links.",
    level: "basic"
  }
];

export default questions;
