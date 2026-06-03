// topic0_questions.js
// 30 expert-level questions on ORM vs JDBC for deep understanding

const questions = [
  {
    question: "What is the primary difference between JDBC and ORM?",
    shortAnswer: "JDBC requires manual SQL and object mapping; ORM automates these tasks.",
    explanation: "JDBC is a low-level API where developers write SQL and manually map ResultSet to objects. ORM frameworks like Hibernate map Java objects directly to database tables, generating SQL automatically and reducing boilerplate.",
    hint: "Think about the level of abstraction and who writes the SQL.",
    level: "moderate",
    codeExample: "JDBC: String sql = \"SELECT * FROM user\";\nORM: session.createQuery(\"from User\", User.class);"
  },
  {
    question: "What is the N+1 query problem in ORM?",
    shortAnswer: "When one query fetches parent entities and then N additional queries fetch each child collection.",
    explanation: "Example: fetching 10 students lazily loads each student's addresses. That's 1 query for students + 10 queries for addresses = 11 queries. Can be solved with JOIN FETCH or batch fetching.",
    hint: "Watch out for lazy loading inside loops.",
    level: "expert",
    codeExample: "// Problem:\nList<Student> students = session.createQuery(\"from Student\").list();\nfor(Student s: students) { s.getAddresses().size(); }\n// Solution:\nsession.createQuery(\"from Student s join fetch s.addresses\").list();"
  },
  {
    question: "Can you use both JDBC and Hibernate in the same application?",
    shortAnswer: "Yes, but careful with transaction boundaries and session management.",
    explanation: "Common pattern: use Hibernate for CRUD, fallback to JDBC for bulk operations or complex reporting queries. Ensure both use the same DataSource to avoid locking issues.",
    hint: "Spring's JdbcTemplate can work alongside Hibernate SessionFactory.",
    level: "expert",
    codeExample: "// Get raw connection from Hibernate session\nSession session = entityManager.unwrap(Session.class);\nsession.doWork(connection -> { /* JDBC code */ });"
  },
  {
    question: "What is the role of @Transactional in Spring Data JPA compared to manual JDBC transactions?",
    shortAnswer: "@Transactional declaratively manages transaction boundaries; JDBC requires manual commit/rollback.",
    explanation: "In JDBC you call connection.commit() and connection.rollback(). With ORM and Spring, @Transactional wraps the method in a transaction, flushes the session automatically, and rolls back on runtime exception.",
    hint: "Think about exception propagation and declarative vs imperative.",
    level: "moderate",
    codeExample: "@Transactional\npublic void saveStudent(Student s) {\n    // no explicit commit needed\n    studentRepository.save(s);\n}"
  },
  {
    question: "How does Hibernate's first-level cache compare to JDBC?",
    shortAnswer: "First-level cache is session-scoped and reduces duplicate SELECTs; JDBC has no built-in cache.",
    explanation: "Within a Hibernate session, if you fetch the same entity twice by ID, only one SQL query is executed. JDBC would execute two queries unless you manually cache the result.",
    hint: "Try fetching the same object twice in a single session.",
    level: "moderate",
    codeExample: "Session s = factory.openSession();\nBook b1 = s.get(Book.class, 1L); // SQL executed\nBook b2 = s.get(Book.class, 1L); // from cache, no SQL"
  },
  {
    question: "What is the difference between get() and load() in Hibernate?",
    shortAnswer: "get() immediately hits the database and returns null if not found; load() returns a proxy and throws exception if not found.",
    explanation: "get() is suitable when you need the data right away. load() is useful when you only need a reference (e.g., setting parent for a child) without actually fetching the state.",
    hint: "Consider performance and existence guarantees.",
    level: "moderate",
    codeExample: "Book b = session.load(Book.class, id); // no SQL\nb.getTitle(); // SQL now"
  },
  {
    question: "What is the main advantage of using HQL over native SQL?",
    shortAnswer: "HQL is object-oriented, database-independent, and supports polymorphic queries.",
    explanation: "HQL works with entity names and property names, not table/column names. It reduces vendor lock-in. JDBC's native SQL ties you to a specific database dialect.",
    hint: "Switching from MySQL to PostgreSQL – what changes?",
    level: "moderate",
    codeExample: "// HQL\nfrom Student s where s.age > 18\n// Native SQL\nSELECT * FROM student WHERE age > 18"
  },
  {
    question: "Explain the concept of 'dirty checking' in ORM. How is it different from JDBC?",
    shortAnswer: "Hibernate automatically detects changes to managed entities and issues UPDATEs at flush time; JDBC requires explicit UPDATE statements.",
    explanation: "When you modify a property of a persistent object, Hibernate compares snapshot and snapshot-dirty states during flush. JDBC forces developers to write and execute UPDATE manually.",
    hint: "Modify a student's name inside a transaction – do you need to call update()?",
    level: "expert",
    codeExample: "session.beginTransaction();\nStudent s = session.get(Student.class, 1L);\ns.setName(\"New Name\");\nsession.getTransaction().commit(); // UPDATE is auto-generated"
  },
  {
    question: "What is the purpose of the @GeneratedValue annotation? Is there a JDBC equivalent?",
    shortAnswer: "@GeneratedValue configures primary key generation strategies (AUTO, IDENTITY, SEQUENCE, TABLE). JDBC would require manual handling of generated keys via getGeneratedKeys().",
    explanation: "Hibernate abstracts the database-specific key generation. JDBC gives you more control but more boilerplate and portability issues.",
    hint: "Try using IDENTITY on MySQL vs SEQUENCE on PostgreSQL.",
    level: "moderate",
    codeExample: "@Id @GeneratedValue(strategy = GenerationType.IDENTITY)\nprivate Long id;"
  },
  {
    question: "How does exception handling differ between JDBC and Hibernate?",
    shortAnswer: "JDBC throws SQLException (checked), while Hibernate uses HibernateException (unchecked) or PersistenceException (JPA).",
    explanation: "Unchecked exceptions in Hibernate simplify code because you don't have to catch every low-level SQL error. But you still need to handle constraint violations and roll back transactions.",
    hint: "Which one forces try-catch for every database call?",
    level: "moderate",
    codeExample: "// JDBC requires catch\n} catch (SQLException e) { ... }\n// Hibernate - no forced catch but you may handle PersistenceException"
  },
  {
    question: "What is the difference between fetch type LAZY and EAGER in ORM, and how does JDBC simulate it?",
    shortAnswer: "LAZY loads associations on-demand; EAGER loads them immediately (via JOIN or separate SELECT). JDBC would need explicit JOINs or separate queries to achieve either.",
    explanation: "EAGER can cause performance issues if overused (cartesian product). LAZY can cause LazyInitializationException if accessed outside session. JDBC gives full control but lacks automatic lazy loading.",
    hint: "Check when you open and close the session.",
    level: "expert",
    codeExample: "@OneToMany(fetch = FetchType.LAZY)\nprivate List<Order> orders;"
  },
  {
    question: "How would you implement pagination in JDBC vs Hibernate?",
    shortAnswer: "JDBC uses LIMIT/OFFSET or ROWNUM; Hibernate provides setFirstResult() and setMaxResults() that work across databases.",
    explanation: "Hibernate translates these methods into database-specific pagination (e.g., LIMIT for MySQL, ROWNUM for Oracle). JDBC forces you to write dialect-specific SQL fragments.",
    hint: "What happens when you move from H2 to Oracle?",
    level: "moderate",
    codeExample: "// Hibernate\nQuery q = session.createQuery(\"from Student\");\nq.setFirstResult(20).setMaxResults(10);\n// JDBC\nString sql = \"SELECT * FROM student LIMIT 10 OFFSET 20\"; // MySQL only"
  },
  {
    question: "What are the benefits of using Hibernate's Criteria API over raw JDBC?",
    shortAnswer: "Criteria API allows dynamic, type-safe query building without string concatenation, reducing SQL injection risk.",
    explanation: "JDBC often requires concatenating user input into SQL strings, leading to injection vulnerabilities. Criteria API uses programmatic predicates and parameter binding.",
    hint: "How would you add a dynamic 'where' clause based on user input?",
    level: "moderate",
    codeExample: "// JPA CriteriaBuilder\ncb.equal(root.get(\"name\"), name);\n// JDBC vulnerable version\nString sql = \"SELECT * FROM student WHERE name = '\" + name + \"'\";"
  },
  {
    question: "How does connection pooling differ between bare JDBC and Hibernate?",
    shortAnswer: "JDBC requires manual pooling setup (e.g., HikariCP). Hibernate integrates pooling out-of-the-box via c3p0 or HikariCP configuration.",
    explanation: "JDBC DriverManager.getConnection() creates a new physical connection each time, which is expensive. Hibernate's connection pool reuses connections and dramatically improves performance.",
    hint: "Check your production logs for 'connection open/close'.",
    level: "expert",
    codeExample: "// Hibernate config\n<property name=\"hibernate.c3p0.max_size\">20</property>"
  },
  {
    question: "What is the purpose of hbm2ddl.auto in Hibernate, and is there a JDBC equivalent?",
    shortAnswer: "hbm2ddl.auto automates schema validation, update, or creation. JDBC has no built-in schema generation; you must use external tools or run DDL scripts manually.",
    explanation: "Common values: validate, update, create, create-drop. In development, 'update' (or 'create-drop') is convenient. In production, usually 'validate' or none.",
    hint: "What would 'create-drop' do to your data at application shutdown?",
    level: "moderate",
    codeExample: "<property name=\"hibernate.hbm2ddl.auto\">update</property>"
  },
  {
    question: "Explain the concept of 'detached objects' in Hibernate. Does JDBC have anything similar?",
    shortAnswer: "Detached objects are persistent objects no longer associated with a session. JDBC has no concept of object state tracking; everything is manual.",
    explanation: "After session.close(), the object becomes detached. You can modify it and later merge() it back. JDBC would require re-fetching and comparing all fields manually.",
    hint: "Think about web applications where entities are sent to the UI.",
    level: "expert",
    codeExample: "session.close();\nstudent.setName(\"New\");\nSession newSession = factory.openSession();\nnewSession.merge(student);"
  },
  {
    question: "What is the difference between Hibernate's @NaturalId and a regular column? When would you use JDBC for natural keys?",
    shortAnswer: "@NaturalId marks a business key (e.g., email) for caching and load-by-natural-id. JDBC requires manual queries for such lookups.",
    explanation: "Hibernate can cache natural ID lookups and provides loadByNaturalId() API. JDBC would need a SELECT by that column every time, with no automatic caching.",
    hint: "What if 'email' is unique and frequently used in WHERE clauses?",
    level: "expert",
    codeExample: "@NaturalId\nprivate String email;\n// usage\nsession.byNaturalId(User.class).using(\"email\", email).load();"
  },
  {
    question: "How do you handle BLOB/CLOB data in JDBC vs Hibernate?",
    shortAnswer: "Both support BLOB/CLOB, but Hibernate provides @Lob and automatic conversion to byte[]/String, while JDBC requires streaming or getBlob() methods.",
    explanation: "Hibernate simplifies large object handling by mapping them directly to Java types. JDBC needs special handling (InputStream, Reader) and resource management.",
    hint: "What's the risk of reading a 100MB image into memory?",
    level: "moderate",
    codeExample: "@Lob\nprivate byte[] photo; // Hibernate\n// JDBC\nBlob blob = rs.getBlob(\"photo\");\nInputStream is = blob.getBinaryStream();"
  },
  {
    question: "What is the 'Open Session in View' pattern, and why is it controversial?",
    shortAnswer: "OSIV keeps the Hibernate session open throughout the view rendering to avoid LazyInitializationException, but it can cause connection holding issues.",
    explanation: "In web apps, if you close session before rendering, lazy collections throw exception. OSIV delays closing until after view. However, it can lead to N+1 queries and holds DB connections longer.",
    hint: "Balance between convenience and scalability.",
    level: "expert",
    codeExample: "// Spring property\nspring.jpa.open-in-view=true // default in some versions"
  },
  {
    question: "How does batch processing differ between JDBC and Hibernate?",
    shortAnswer: "JDBC uses addBatch() and executeBatch(); Hibernate uses batching properties and session.flush()/clear() to avoid memory overflow.",
    explanation: "Hibernate's batching is transparent but requires configuration (hibernate.jdbc.batch_size). Without batching, Hibernate may still issue many single INSERT statements. JDBC batching is explicit but faster for pure bulk inserts.",
    hint: "What happens to the persistence context when you insert 10000 entities?",
    level: "expert",
    codeExample: "// Hibernate batch\nfor(int i=0;i<10000;i++) {\n    session.save(entity);\n    if(i%50==0) { session.flush(); session.clear(); }\n}"
  },
  {
    question: "What are the pros and cons of using native queries in Hibernate compared to pure JDBC?",
    shortAnswer: "Native queries in Hibernate return managed entities but bypass certain Hibernate optimizations; pure JDBC returns raw results and no caching.",
    explanation: "Hibernate's native queries can still map results to entities using @SqlResultSetMapping. However, they skip the first-level cache and might lead to stale data. Pure JDBC gives full control but no object mapping.",
    hint: "When do you absolutely need native query over HQL?",
    level: "expert",
    codeExample: "@Query(value = \"SELECT * FROM student WHERE age > :age\", nativeQuery = true)\nList<Student> findByAgeNative(@Param(\"age\") int age);"
  },
  {
    question: "Explain the purpose of the 'merge' operation versus 'update' in Hibernate. How would you handle similar logic in JDBC?",
    shortAnswer: "merge() copies state from a detached entity to a persistent entity; update() reattaches. JDBC would require manual field-by-field copy or an UPDATE statement.",
    explanation: "merge returns a managed copy, leaving the original unchanged. update throws exception if the object is detached and no database row exists. JDBC doesn't track states.",
    hint: "Try merging an entity that already exists in the session.",
    level: "expert",
    codeExample: "Student managed = session.merge(detachedStudent); // safer"
  },
  {
    question: "What is Hibernate's 'version-less' optimistic locking with @OptimisticLock(excluded)?",
    shortAnswer: "It allows excluding certain fields from version increment. JDBC must manually implement optimistic locking using a version column or timestamp.",
    explanation: "Hibernate uses a version column by default. But you can annotate fields as @OptimisticLock(excluded=true) so they don't cause version increments when modified. JDBC would need custom logic.",
    hint: "Useful for updating counters without changing the row version.",
    level: "expert",
    codeExample: "@Version private int version;\n@OptimisticLock(excluded=true)\nprivate int viewCount;"
  },
  {
    question: "How do you implement inheritance mapping in Hibernate (SINGLE_TABLE, JOINED, TABLE_PER_CLASS) and what's the JDBC alternative?",
    shortAnswer: "Hibernate provides three strategies; JDBC requires manual discriminator or separate table handling on every query.",
    explanation: "SINGLE_TABLE uses a discriminator column; JOINED uses normalized tables; TABLE_PER_CLASS creates a table per concrete class. JDBC would force you to UNION or join manually and map the result.",
    hint: "Which strategy gives the best performance for polymorphic queries?",
    level: "expert",
    codeExample: "@Inheritance(strategy = InheritanceType.JOINED)\npublic abstract class Vehicle { }"
  },
  {
    question: "What is the 'Proxy Pattern' in Hibernate and how does it relate to lazy loading?",
    shortAnswer: "Hibernate uses dynamic proxies or bytecode enhancement to intercept method calls on lazy associations and load data on demand.",
    explanation: "When you call load() or access a lazy @ManyToOne, Hibernate returns a proxy that looks like the real object but has no database data until a method is invoked. JDBC has no proxy concept.",
    hint: "Why does calling getId() on a proxy not trigger a SELECT?",
    level: "expert",
    codeExample: "Book b = session.load(Book.class, id); // proxy\nb.getTitle(); // now SQL"
  },
  {
    question: "Explain the concept of 'flush mode' in Hibernate (AUTO, COMMIT, MANUAL). JDBC has no equivalent.",
    shortAnswer: "Flush mode determines when Hibernate synchronizes the persistence context with the database. JDBC executes each statement immediately unless you explicitly batch.",
    explanation: "AUTO flushes before queries; COMMIT flushes only at transaction commit; MANUAL requires explicit flush(). This contrasts with JDBC where each insert/update is sent immediately.",
    hint: "What happens when you query after an UPDATE but before commit?",
    level: "expert",
    codeExample: "session.setHibernateFlushMode(FlushMode.COMMIT);"
  },
  {
    question: "How does Hibernate's @DynamicInsert and @DynamicUpdate affect performance compared to JDBC?",
    shortAnswer: "They generate SQL that includes only changed columns, reducing network traffic and preserving defaults. JDBC can achieve similar with dynamic SQL building.",
    explanation: "By default, Hibernate includes all columns in UPDATE/INSERT. Dynamic* annotations generate column lists at runtime. JDBC gives you full control but at the cost of manual string building.",
    hint: "Useful when you have large tables with many nullable columns and default values.",
    level: "expert",
    codeExample: "@DynamicUpdate\n@Entity\npublic class User { ... }"
  },
  {
    question: "What are the benefits of using Spring Data JPA over raw Hibernate or JDBC?",
    shortAnswer: "Spring Data JPA provides repository abstraction, automatic query derivation, and pagination, reducing boilerplate even further than Hibernate alone.",
    explanation: "With JDBC you write all DAO code. With Hibernate you write some. With Spring Data JPA you often write only an interface. It builds on Hibernate but adds method name parsing and query by example.",
    hint: "What method name would you write to find by last name and age?",
    level: "expert",
    codeExample: "interface StudentRepo extends JpaRepository<Student, Long> {\n    List<Student> findByLastNameAndAgeGreaterThan(String lastName, int age);\n}"
  },
  {
    question: "How do you handle multi-tenancy in Hibernate vs JDBC?",
    shortAnswer: "Hibernate supports schema, database, or discriminator-based multi-tenancy. JDBC would require manually switching connections or including tenant filters in every query.",
    explanation: "Hibernate can intercept connection to set tenant ID via @TenantId or schema switching. JDBC forces you to handle tenant isolation at the connection or query level, which is error-prone.",
    hint: "Think of SaaS applications where each customer's data is isolated.",
    level: "expert",
    codeExample: "<property name=\"hibernate.multiTenancy\">SCHEMA</property>"
  },
  {
    question: "Last question: In terms of debugging and performance tuning, which approach (JDBC vs ORM) is easier for a beginner?",
    shortAnswer: "JDBC is easier for understanding SQL, but ORM hides complexity, making debugging harder initially.",
    explanation: "With JDBC, you see every SQL, every mapping. With Hibernate, issues like N+1 queries, LazyInitializationException, or proxy serialization are non-obvious. However, for simple CRUD, ORM is faster to develop.",
    hint: "What would you prefer when you need to analyze an unexpected slow query?",
    level: "expert",
    codeExample: "// Enable SQL logging in Hibernate\n<property name=\"hibernate.show_sql\">true</property>\n<property name=\"hibernate.format_sql\">true</property>"
  }
];

export default questions;