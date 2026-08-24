/**
 * Topic 22: Foreign Key – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a foreign key in a relational database?",
    shortAnswer:
      "A foreign key is a column (or set of columns) in one table that refers to the primary key of another table, establishing a relationship.",
    explanation:
      "Foreign keys enforce referential integrity, ensuring that values in the foreign key column exist in the referenced table. They are the mechanism for linking tables.",
    hint: "Think about how tables are connected.",
    level: "basic",
    codeExample: "FOREIGN KEY (StudentID) REFERENCES Students(StudentID)",
  },
  {
    question: "What is referential integrity?",
    shortAnswer:
      "Referential integrity ensures that foreign key values always point to existing rows in the referenced table.",
    explanation:
      "It prevents orphaned records and maintains consistency across related tables. It is enforced by the database through foreign key constraints.",
    hint: "Think about why every order must have a valid customer.",
    level: "basic",
  },
  {
    question: "What is the difference between a primary key and a foreign key?",
    shortAnswer:
      "A primary key uniquely identifies a row within its own table; a foreign key references a primary key (or candidate key) in another table.",
    explanation:
      "Primary keys are about entity integrity; foreign keys are about referential integrity and relationships.",
    hint: "Think about the difference between internal uniqueness and external reference.",
    level: "basic",
  },
  {
    question: "Can a foreign key reference a candidate key that is not a primary key?",
    shortAnswer:
      "Yes, a foreign key can reference any candidate key (i.e., any column with a UNIQUE constraint), not just the primary key.",
    explanation:
      "However, it's most common to reference the primary key for simplicity and convention.",
    hint: "Think about referencing a unique email instead of the primary key.",
    level: "intermediate",
  },
  {
    question: "What happens if you try to insert a row with a foreign key value that doesn't exist?",
    shortAnswer:
      "The database will reject the insert and throw a foreign key violation error.",
    explanation:
      "This is how referential integrity is enforced. The foreign key must reference an existing row in the parent table.",
    hint: "Think about trying to add an order for a non-existent customer.",
    level: "basic",
  },
  {
    question: "What is ON DELETE CASCADE in a foreign key constraint?",
    shortAnswer:
      "ON DELETE CASCADE automatically deletes child rows when the parent row is deleted.",
    explanation:
      "This maintains referential integrity by removing dependent records. Use with caution as it can cause unintentional data loss.",
    hint: "Think about deleting a customer and all their orders.",
    level: "intermediate",
    codeExample: "FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE",
  },
  {
    question: "What is ON DELETE RESTRICT (or NO ACTION)?",
    shortAnswer:
      "ON DELETE RESTRICT prevents the deletion of a parent row if child rows exist.",
    explanation:
      "This is the default behavior in many databases. It ensures that a row with dependencies cannot be deleted.",
    hint: "Think about not being able to delete a customer with orders.",
    level: "intermediate",
    codeExample: "FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE RESTRICT",
  },
  {
    question: "What is ON DELETE SET NULL?",
    shortAnswer:
      "ON DELETE SET NULL sets the foreign key column to NULL when the parent row is deleted.",
    explanation:
      "This requires the foreign key column to allow NULL values. It preserves child rows but breaks the link to the parent.",
    hint: "Think about keeping orders but losing the customer reference.",
    level: "intermediate",
    codeExample: "FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE SET NULL",
  },
  {
    question: "What is ON DELETE SET DEFAULT?",
    shortAnswer:
      "ON DELETE SET DEFAULT sets the foreign key column to its default value when the parent row is deleted.",
    explanation:
      "The default value must be defined and must exist in the parent table.",
    hint: "Think about setting a default customer ID.",
    level: "intermediate",
    codeExample: "FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE SET DEFAULT",
  },
  {
    question: "Can a foreign key reference the same table (self-referencing)?",
    shortAnswer:
      "Yes, a foreign key can reference the same table, creating a self-referencing relationship.",
    explanation:
      "This is used for hierarchical data, like employee-manager relationships, where ManagerID references EmployeeID.",
    hint: "Think about an employee with a manager who is also an employee.",
    level: "intermediate",
  },
  {
    question: "What is a composite foreign key?",
    shortAnswer:
      "A composite foreign key is a foreign key that references a composite primary key (multiple columns).",
    explanation:
      "If a parent table has a composite primary key (A, B), a foreign key in a child table must also have columns (A, B) to reference it.",
    hint: "Think about referencing a two-column primary key.",
    level: "intermediate",
    codeExample: "FOREIGN KEY (StudentID, CourseID) REFERENCES Enrollments(StudentID, CourseID)",
  },
  {
    question: "How do you create a foreign key in SQL?",
    shortAnswer:
      "You define a foreign key using the FOREIGN KEY constraint in CREATE TABLE or ALTER TABLE.",
    explanation:
      "Example: FOREIGN KEY (StudentID) REFERENCES Students(StudentID). You can also specify cascading actions.",
    hint: "Think about the SQL syntax for linking tables.",
    level: "basic",
    codeExample: "FOREIGN KEY (StudentID) REFERENCES Students(StudentID)",
  },
  {
    question: "Can a foreign key allow NULL values?",
    shortAnswer:
      "Yes, a foreign key column can allow NULL values, but then the constraint is not enforced for NULLs.",
    explanation:
      "NULL means the relationship is optional. If it's NOT NULL, then every row must reference a valid parent row.",
    hint: "Think about an order that might not have a customer yet.",
    level: "intermediate",
  },
  {
    question: "What happens when you update a primary key that is referenced by a foreign key?",
    shortAnswer:
      "By default, the update is rejected if ON UPDATE RESTRICT is used. With ON UPDATE CASCADE, the foreign key is also updated.",
    explanation:
      "Updating primary keys is generally not recommended. Surrogate keys avoid this problem.",
    hint: "Think about the ripple effect of changing a student ID.",
    level: "expert",
    codeExample: "FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON UPDATE CASCADE",
  },
  {
    question: "What is the difference between ON DELETE CASCADE and ON DELETE SET NULL?",
    shortAnswer:
      "CASCADE deletes child rows; SET NULL sets the foreign key to NULL (requires column to allow NULL).",
    explanation:
      "CASCADE removes dependent data; SET NULL preserves child rows but breaks the relationship.",
    hint: "Think about losing vs. breaking the link.",
    level: "intermediate",
  },
  {
    question: "Can foreign keys create circular references?",
    shortAnswer:
      "Yes, tables can have foreign keys referencing each other (circular references), but this can cause problems with inserts and deletes.",
    explanation:
      "Careful design is needed to avoid deadlocks. Often, one side of the relationship is made optional (NULLable).",
    hint: "Think about two tables referencing each other.",
    level: "expert",
  },
  {
    question: "Why are foreign keys important for data integrity?",
    shortAnswer:
      "Foreign keys enforce referential integrity, preventing orphaned records and ensuring data consistency across related tables.",
    explanation:
      "They automatically validate that relationships are valid, reducing the need for application-level checks.",
    hint: "Think about why you can't have an order without a customer.",
    level: "basic",
  },
  {
    question: "What is an orphaned record?",
    shortAnswer:
      "An orphaned record is a row in a child table that references a non-existent row in the parent table.",
    explanation:
      "This violates referential integrity and leads to data inconsistencies. Foreign keys prevent this.",
    hint: "Think about an order that points to a customer that doesn't exist.",
    level: "intermediate",
  },
  {
    question: "Can a foreign key reference a unique key instead of a primary key?",
    shortAnswer:
      "Yes, a foreign key can reference a column with a UNIQUE constraint (a candidate key).",
    explanation:
      "For example, you could reference Email instead of StudentID, as long as Email is unique.",
    hint: "Think about referencing a unique email.",
    level: "intermediate",
  },
  {
    question: "How do foreign keys affect join performance?",
    shortAnswer:
      "Foreign keys themselves don't directly improve performance, but they ensure relationships are valid. However, foreign key columns should be indexed for join performance.",
    explanation:
      "Indexing foreign key columns speeds up joins and reduces the cost of referential integrity checks.",
    hint: "Think about why you'd index a column used in joins.",
    level: "expert",
  },
  {
    question: "Can a foreign key be used to enforce data validation?",
    shortAnswer:
      "Yes, foreign keys enforce that values exist in the referenced table, which is a form of validation.",
    explanation:
      "For example, a foreign key ensures that a product ID in an order item exists in the products table.",
    hint: "Think about ensuring valid product references.",
    level: "intermediate",
  },
  {
    question: "What are the common naming conventions for foreign keys?",
    shortAnswer:
      "Common conventions include FK_ChildTable_ParentTable or FK_ColumnName. For example, FK_Enrollments_Students.",
    explanation:
      "Clear naming helps identify the relationship and the constraint's purpose.",
    hint: "Think about naming constraints for clarity.",
    level: "intermediate",
  },
  {
    question: "Can a foreign key be part of a composite primary key?",
    shortAnswer:
      "Yes, a column that is part of a foreign key can also be part of a composite primary key.",
    explanation:
      "In junction tables, the foreign keys together often form the composite primary key.",
    hint: "Think about a primary key made of two foreign keys.",
    level: "intermediate",
  },
  {
    question: "What happens to foreign keys when you truncate a table?",
    shortAnswer:
      "Truncating a parent table that has foreign key references will fail unless the child table is also truncated first or CASCADE is supported.",
    explanation:
      "TRUNCATE is a DDL operation that removes all rows. It may not work if foreign keys are present, as the constraints must be checked.",
    hint: "Think about why TRUNCATE might fail.",
    level: "expert",
  },
  {
    question: "Can foreign keys cause deadlocks?",
    shortAnswer:
      "Yes, foreign keys can contribute to deadlocks if multiple transactions modify related tables in conflicting orders.",
    explanation:
      "Proper transaction design and using appropriate isolation levels can mitigate deadlocks.",
    hint: "Think about two transactions locking tables in opposite order.",
    level: "expert",
  },
  {
    question: "How do you drop a foreign key constraint?",
    shortAnswer:
      "You drop a foreign key constraint using ALTER TABLE DROP FOREIGN KEY (MySQL) or DROP CONSTRAINT (SQL Server/Oracle).",
    explanation:
      "For example: ALTER TABLE Enrollments DROP FOREIGN KEY FK_Enrollments_Students;",
    hint: "Think about removing the relationship.",
    level: "intermediate",
    codeExample: "ALTER TABLE Enrollments DROP FOREIGN KEY FK_Enrollments_Students;",
  },
  {
    question: "Can foreign keys be disabled temporarily?",
    shortAnswer:
      "Yes, many databases allow you to temporarily disable foreign key constraints, often for bulk loading or maintenance.",
    explanation:
      "For example, MySQL has FOREIGN_KEY_CHECKS = 0;. This should be done with caution and re-enabled afterward.",
    hint: "Think about turning off constraints for a bulk import.",
    level: "expert",
  },
  {
    question: "What is the difference between RESTRICT and NO ACTION?",
    shortAnswer:
      "In most databases, RESTRICT and NO ACTION are similar. RESTRICT checks the constraint immediately, while NO ACTION is deferred (checked at commit time) in some DBMS.",
    explanation:
      "In practice, they are often used interchangeably. Check your database's documentation.",
    hint: "Think about immediate vs. deferred checking.",
    level: "expert",
  },
  {
    question: "Can a foreign key reference a view?",
    shortAnswer:
      "No, foreign keys must reference base tables, not views. Views are virtual and cannot enforce referential integrity.",
    explanation:
      "Foreign keys need to ensure that the referenced rows exist, which is only possible with base tables.",
    hint: "Think about why a view can't be a parent table.",
    level: "expert",
  },
  {
    question: "How do foreign keys interact with indexing?",
    shortAnswer:
      "Foreign key columns should be indexed to avoid full table scans during join operations and to speed up referential integrity checks.",
    explanation:
      "Some databases automatically create indexes on foreign key columns; others require you to do it manually.",
    hint: "Think about the performance impact of joins.",
    level: "expert",
  },
  {
    question: "What is the role of foreign keys in database normalization?",
    shortAnswer:
      "Foreign keys implement relationships defined during normalization, ensuring that data is stored in separate tables and linked correctly.",
    explanation:
      "Normalization creates separate tables for entities; foreign keys are the mechanism to maintain relationships between them.",
    hint: "Think about how normalised tables are linked.",
    level: "intermediate",
  },
];

export default questions;