// topic5_questions.js
// 30 moderate to expert questions on Hibernate Query Language (HQL)

const questions = [
  {
    question: "What is the main difference between HQL and SQL?",
    shortAnswer: "HQL operates on entity objects and their properties; SQL operates on tables and columns.",
    explanation: "HQL is database-independent, uses class names, property names, and supports polymorphic queries. SQL is database-specific and ties you to a particular schema.",
    hint: "Try writing 'FROM Student' vs 'SELECT * FROM students'.",
    level: "basic",
    codeExample: "HQL: FROM Student s WHERE s.city = 'Ichapur'\nSQL: SELECT * FROM students WHERE city = 'Ichapur'"
  },
  {
    question: "What is the default return type of session.createQuery() when no type is specified?",
    shortAnswer: "org.hibernate.query.Query returning Object if using raw Hibernate, or TypedQuery with type parameter if using JPA.",
    explanation: "Modern Hibernate encourages using typed queries: session.createQuery(hql, Student.class). Without type, it returns raw Query and you need to cast results.",
    hint: "Always use the typed version to avoid ClassCastException.",
    level: "moderate",
    codeExample: "Query<Student> q = session.createQuery(\"FROM Student\", Student.class);"
  },
  {
    question: "Explain the difference between JOIN and JOIN FETCH in HQL.",
    shortAnswer: "JOIN creates a projection or allows conditions on associated entities; JOIN FETCH eagerly loads the association in the same query (solves N+1).",
    explanation: "JOIN without FETCH only returns the root entity (unless you select the association). JOIN FETCH tells Hibernate to initialize the association when loading the root entity, avoiding additional queries.",
    hint: "Use JOIN FETCH when you know you'll need the association immediately.",
    level: "expert",
    codeExample: "FROM Student s JOIN FETCH s.courses WHERE s.id = 1"
  },
  {
    question: "How can you avoid the N+1 query problem using HQL?",
    shortAnswer: "Use JOIN FETCH or use a batch fetch strategy, or write a DTO query that fetches all needed data.",
    explanation: "JOIN FETCH retrieves the association in the same SELECT. For multiple collections, consider batch size or multiple queries.",
    hint: "See the SQL log: without FETCH, one query for parent, then N for children.",
    level: "moderate",
    codeExample: "FROM Student s JOIN FETCH s.address WHERE s.city = 'Barrackpore'"
  },
  {
    question: "What is the purpose of the SELECT clause in HQL? Is it mandatory?",
    shortAnswer: "SELECT is optional – if omitted, it implies SELECT * (all properties).",
    explanation: "You can write 'FROM Student' which returns full entities. Explicit SELECT is needed for projections (specific fields) or aggregate results.",
    hint: "Use projections to improve performance when you don't need the whole entity.",
    level: "basic",
    codeExample: "SELECT s.name, s.city FROM Student s"
  },
  {
    question: "How do you perform a bulk update using HQL?",
    shortAnswer: "Use UPDATE ... SET ... WHERE query and call executeUpdate().",
    explanation: "Bulk HQL updates bypass the session cache and directly execute SQL. You need to clear() or refresh affected entities to avoid stale state.",
    hint: "After bulk update, session.clear() to avoid inconsistent persistence context.",
    level: "moderate",
    codeExample: "int updated = session.createQuery(\"UPDATE Student SET city = :newCity WHERE city = :oldCity\")\n.setParameter(\"newCity\", \"Shyamnagar\")\n.setParameter(\"oldCity\", \"Ichapur\")\n.executeUpdate();"
  },
  {
    question: "How do you write a native SQL query in Hibernate? What are the trade-offs?",
    shortAnswer: "Use session.createNativeQuery(). Trade-off: database dependency, but can use vendor-specific features.",
    explanation: "Native queries return raw SQL results; you can map to entities using addEntity() or to DTOs with @SqlResultSetMapping. They don't support caching unless explicitly configured.",
    hint: "Use native SQL for complex reports or when HQL cannot express something.",
    level: "expert",
    codeExample: "NativeQuery<Student> q = session.createNativeQuery(\"SELECT * FROM students WHERE city = ?\", Student.class);"
  },
  {
    question: "What is the difference between list() and uniqueResult()?",
    shortAnswer: "list() returns multiple rows as a List; uniqueResult() returns a single result or null (if zero rows).",
    explanation: "If the query returns more than one row, uniqueResult() throws NonUniqueResultException. For zero rows, uniqueResult() returns null (Hibernate 5+).",
    hint: "Use uniqueResult() when exactly zero or one result expected.",
    level: "moderate",
    codeExample: "Student s = session.createQuery(\"FROM Student WHERE id = :id\", Student.class)\n.setParameter(\"id\", 1L).uniqueResult();"
  },
  {
    question: "How can you paginate results in HQL without loading all rows?",
    shortAnswer: "Use setFirstResult() (offset) and setMaxResults() (limit).",
    explanation: "Hibernate translates these to database-specific pagination (LIMIT/OFFSET, ROWNUM, etc.). This is efficient even for large result sets.",
    hint: "Combine with ORDER BY for consistent pagination.",
    level: "moderate",
    codeExample: "query.setFirstResult(20).setMaxResults(10);"
  },
  {
    question: "What are named parameters and why are they better than positional parameters?",
    shortAnswer: "Named parameters use :name and are easier to read, less error-prone, and can be used multiple times.",
    explanation: "Positional parameters (?1, ?2) rely on order, which can break when query changes. Named parameters are self-documenting and safer.",
    hint: "Always prefer named parameters for maintainability.",
    level: "basic",
    codeExample: "query.setParameter(\"city\", \"Barrackpore\"); // vs setParameter(1, \"Barrackpore\")"
  },
  {
    question: "How do you write an HQL query that returns a DTO instead of an entity?",
    shortAnswer: "Use SELECT NEW fully.qualified.ClassName(field1, field2) FROM ...",
    explanation: "This constructor expression allows you to project results into a non-entity class (DTO) without needing a separate result set mapping.",
    hint: "More efficient than returning full entities when only few fields needed.",
    level: "expert",
    codeExample: "SELECT NEW com.school.dto.StudentNameDTO(s.name, s.city) FROM Student s"
  },
  {
    question: "Explain the difference between INNER JOIN and LEFT JOIN in HQL.",
    shortAnswer: "INNER JOIN returns only entities that have a matching association; LEFT JOIN returns all root entities regardless of association existence (null for missing).",
    explanation: "Same as SQL JOIN semantics. LEFT JOIN is useful when you want to include entities even if they have no related rows.",
    hint: "Use LEFT JOIN when you need to see students even if they are not enrolled in any course.",
    level: "moderate",
    codeExample: "FROM Student s LEFT JOIN s.courses c WHERE c.courseName IS NULL"
  },
  {
    question: "How does HQL handle polymorphism?",
    shortAnswer: "HQL automatically returns instances of subclasses when querying a superclass or interface.",
    explanation: "If you query 'FROM Payment', it returns all Payment, CreditCardPayment, CashPayment objects. This is implicit and requires no special syntax.",
    hint: "Use treat for downcasting: 'FROM Payment p WHERE treat(p as CreditCardPayment).cardType = 'VISA'",
    level: "expert",
    codeExample: "FROM Animal a // returns Cat, Dog, etc."
  },
  {
    question: "What is the purpose of the HQL 'SIZE' function?",
    shortAnswer: "SIZE returns the number of elements in a collection association.",
    explanation: "Can be used in WHERE clause or SELECT. Example: WHERE SIZE(s.addresses) > 2. Also use 'IS EMPTY' to check for empty collections.",
    hint: "SIZE works even with lazy collections without loading them? Actually, it may cause a query.",
    level: "moderate",
    codeExample: "FROM Student s WHERE SIZE(s.courses) > 3"
  },
  {
    question: "Can you use aggregate functions in HQL without GROUP BY?",
    shortAnswer: "Yes, single aggregate returns one row; mixing aggregate and non-aggregate forces GROUP BY.",
    explanation: "SELECT COUNT(s), AVG(s.age) FROM Student is allowed. But SELECT s.name, COUNT(s.courses) would require GROUP BY s.name.",
    hint: "Most SQL rules apply in HQL aggregates.",
    level: "moderate",
    codeExample: "SELECT MAX(s.age), MIN(s.age) FROM Student s"
  },
  {
    question: "How do you write a subquery in HQL?",
    shortAnswer: "Enclose subquery in parentheses, usually in WHERE or SELECT clause.",
    explanation: "Subqueries can refer to outer query aliases (correlated). They can return single values or lists (using IN, EXISTS, etc.).",
    hint: "Use subqueries when a JOIN is not feasible or when you need aggregation on related data.",
    level: "expert",
    codeExample: "FROM Student s WHERE s.age > (SELECT AVG(age) FROM Student)"
  },
  {
    question: "What is the difference between Query.list() and Query.scroll()?",
    shortAnswer: "list() loads all results into memory; scroll() returns a scrollable result set that fetches rows on demand (suitable for large results).",
    explanation: "scroll() uses database cursor if supported, but requires keeping the session open. Useful for processing millions of rows.",
    hint: "For very large result sets, consider StatelessSession and scroll.",
    level: "expert",
    codeExample: "ScrollableResults sr = query.scroll(); while(sr.next()) { Object[] row = sr.get(); }"
  },
  {
    question: "Explain the use of 'FETCH' with 'JOIN' in HQL and its effect on caching.",
    shortAnswer: "JOIN FETCH populates the association in the same query, and the fetched data is stored in the session cache (first-level).",
    explanation: "Second-level cache may still be queried if the entity is cacheable. JOIN FETCH can lead to repeated data if used with multiple collections.",
    hint: "Avoid JOIN FETCH on multiple collections – use batch fetching instead.",
    level: "expert",
    codeExample: "FROM Parent p JOIN FETCH p.children WHERE p.id = 1"
  },
  {
    question: "How do you use HQL with Enums?",
    shortAnswer: "Refer to enum property directly: WHERE s.status = com.school.Status.ACTIVE or by constant with .",
    explanation: "If the enum is a string persisted, you can also use a parameter: setParameter('status', Status.ACTIVE). Hibernate converts to database value.",
    hint: "Always use parameter binding for enums to avoid string concatenation.",
    level: "moderate",
    codeExample: "FROM Student s WHERE s.status = :status"
  },
  {
    question: "What is the purpose of the 'ELEMENTS' function in HQL?",
    shortAnswer: "ELEMENTS is used to refer to elements of a collection in a join, but it's largely obsolete now – standard joins are preferred.",
    explanation: "Old syntax: FROM Student s, IN(s.courses) c; new syntax: FROM Student s JOIN s.courses c.",
    hint: "Don't use ELEMENTS – use JOIN for clarity.",
    level: "expert",
    codeExample: "FROM Student s, IN(s.courses) c WHERE c.name = 'Math' // old style"
  },
  {
    question: "How can you call a stored procedure using HQL or Hibernate?",
    shortAnswer: "Use session.createStoredProcedureQuery() or @NamedStoredProcedureQuery.",
    explanation: "HQL does not directly call stored procedures; JPA 2.1 introduced StoredProcedureQuery. You can also use native SQL CallableStatement.",
    hint: "Stored procedures reduce database coupling – use with caution.",
    level: "expert",
    codeExample: "StoredProcedureQuery sp = session.createStoredProcedureQuery(\"get_students\");"
  },
  {
    question: "What is the difference between 'IN' and 'EXISTS' in HQL?",
    shortAnswer: "IN is used for a list of values or subquery result; EXISTS checks for existence of at least one row in subquery.",
    explanation: "EXISTS is often more efficient for subqueries because it stops as soon as a match is found. IN may evaluate the whole subquery.",
    hint: "Prefer EXISTS for correlated subqueries.",
    level: "expert",
    codeExample: "FROM Student s WHERE EXISTS (SELECT 1 FROM Enrollment e WHERE e.student = s AND e.grade > 90)"
  },
  {
    question: "How do you write a query that returns entities with their count of associated objects?",
    shortAnswer: "Use GROUP BY and HAVING, or SELECT entity, COUNT(association).",
    explanation: "Example: SELECT s, COUNT(c) FROM Student s JOIN s.courses c GROUP BY s. Returns List<Object[]> where first element is Student, second is count.",
    hint: "Project both the entity and the count.",
    level: "moderate",
    codeExample: "SELECT s, SIZE(s.courses) FROM Student s"
  },
  {
    question: "Explain the timezone handling when querying date/time fields in HQL.",
    shortAnswer: "HQL uses the JVM timezone unless the database or JDBC driver is configured otherwise. Use Temporal annotations.",
    explanation: "For date/time comparisons, ensure consistent timezone. You can set the session timezone using hibernate.jdbc.time_zone property.",
    hint: "Use UTC for database storage to avoid timezone issues.",
    level: "expert",
    codeExample: "hibernate.jdbc.time_zone = UTC"
  },
  {
    question: "What is the difference between 'WHERE' and 'HAVING' in HQL?",
    shortAnswer: "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
    explanation: "HAVING is used with GROUP BY and aggregate conditions (e.g., COUNT(*) > 5). You cannot use aggregates in WHERE.",
    hint: "Remember: WHERE → GROUP BY → HAVING → ORDER BY.",
    level: "moderate",
    codeExample: "SELECT city, COUNT(*) FROM Student GROUP BY city HAVING COUNT(*) > 2"
  },
  {
    question: "Can you use arithmetic expressions in HQL SELECT and WHERE clauses?",
    shortAnswer: "Yes: +, -, *, /, % can be used on numeric properties and literals.",
    explanation: "Example: SELECT s.age + 5, s.age * 1.1 FROM Student s WHERE s.age * 2 > 50.",
    hint: "Use parentheses for clarity.",
    level: "moderate",
    codeExample: "FROM Student s WHERE s.age / 2 > 10"
  },
  {
    question: "How does HQL handle caching?",
    shortAnswer: "Query results can be cached using query.setCacheable(true) if second-level cache is enabled.",
    explanation: "Query cache stores the identifiers of returned entities; the entities themselves come from entity cache. For projections, values are cached directly.",
    hint: "Enable query cache only for queries that are executed frequently with same parameters.",
    level: "expert",
    codeExample: "query.setCacheable(true).setCacheRegion(\"student.queries\");"
  },
  {
    question: "What is the purpose of the 'VERSIONED' keyword in HQL update queries?",
    shortAnswer: "UPDATE VERSIONED updates the version column of entities even if the updated fields don't include the version.",
    explanation: "It forces the version number to increment for optimistically locked entities, even if the update does not modify the entity. Useful for custom update statements.",
    hint: "Rarely needed, but important for consistency with optimistic locking.",
    level: "expert",
    codeExample: "UPDATE VERSIONED Student s SET s.city = :newCity WHERE s.city = :oldCity"
  },
  {
    question: "How do you use HQL with collections of basic types (e.g., List<String>)?",
    shortAnswer: "Reference the collection element as if it were a property: SELECT s FROM Student s JOIN s.phoneNumbers p WHERE p LIKE '91%'.",
    explanation: "If the collection is of basic type, the join element is that type. You can treat it like any other path.",
    hint: "Be careful with duplicate results: use DISTINCT.",
    level: "expert",
    codeExample: "SELECT DISTINCT s FROM Student s JOIN s.emails e WHERE e LIKE '%@school.com'"
  },
  {
    question: "What is the most common mistake when writing HQL for the first time?",
    shortAnswer: "Using table or column names instead of entity/property names, causing QuerySyntaxException.",
    explanation: "Newcomers often write 'SELECT * FROM students' and wonder why Hibernate complains. HQL is case-sensitive for properties, but not for keywords.",
    hint: "If you see 'table not mapped', you're using SQL, not HQL.",
    level: "basic",
    codeExample: "Wrong: FROM students WHERE city = 'Barrackpore'\nCorrect: FROM Student s WHERE s.city = 'Barrackpore'"
  }
];

export default questions;