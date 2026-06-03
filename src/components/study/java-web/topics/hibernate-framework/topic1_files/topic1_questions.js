// topic1_questions.js
// 30 moderate to expert questions on Hibernate Architecture

const questions = [
  {
    question: "What is the difference between SessionFactory and Session in Hibernate?",
    shortAnswer: "SessionFactory is heavyweight, thread-safe, created once; Session is lightweight, per unit of work, thread-unsafe.",
    explanation: "SessionFactory holds configuration, mapping metadata, and connection pool. Session represents a single database conversation and contains first-level cache. You obtain a Session from SessionFactory.",
    hint: "Think of SessionFactory as a factory that produces Sessions, like a car factory producing cars.",
    level: "moderate",
    codeExample: "SessionFactory factory = new Configuration().configure().buildSessionFactory();\nSession session = factory.openSession();"
  },
  {
    question: "Explain the role of the Transaction interface in Hibernate. What happens if you forget to call commit()?",
    shortAnswer: "Transaction defines atomic unit of work. Without commit(), changes are not persisted and will be rolled back when session closes.",
    explanation: "Transaction.begin() starts a JDBC/JTA transaction. commit() flushes changes and ends transaction. If you forget commit(), all modifications are lost (rollback). Use try-catch-finally to ensure commit or rollback.",
    hint: "Try modifying an object inside a session without transaction – no UPDATE is issued.",
    level: "moderate",
    codeExample: "Transaction tx = session.beginTransaction();\nsession.save(obj);\ntx.commit(); // If missing, no INSERT"
  },
  {
    question: "Is SessionFactory thread-safe? What about Session?",
    shortAnswer: "SessionFactory is thread-safe (can be shared across threads). Session is NOT thread-safe and should be used only within one thread.",
    explanation: "SessionFactory is immutable after creation, so multiple threads can safely call openSession(). Session has mutable state (first-level cache, persistence context) and concurrent access leads to exceptions.",
    hint: "Never store a Session in a static field or use it across HTTP requests in a web app.",
    level: "moderate",
    codeExample: "// Correct: one factory, session per thread\nSession session = factory.openSession();\n// Wrong: shared session between threads"
  },
  {
    question: "What is the purpose of the Configuration object?",
    shortAnswer: "Configuration loads mapping metadata (annotations/XML) and builds SessionFactory.",
    explanation: "It parses hibernate.cfg.xml, reads properties, and collects entity classes. After configuration, buildSessionFactory() creates the immutable SessionFactory. Since 5.x, you can also use BootstrapServiceRegistryBuilder.",
    hint: "You can also configure programmatically without XML.",
    level: "moderate",
    codeExample: "Configuration cfg = new Configuration();\ncfg.addAnnotatedClass(Student.class);\ncfg.setProperty(\"hibernate.connection.url\", \"...\");"
  },
  {
    question: "What does the openSession() vs getCurrentSession() do?",
    shortAnswer: "openSession() always creates a new Session. getCurrentSession() returns the session bound to the current thread or transaction context (requires configuration).",
    explanation: "getCurrentSession() is used with thread-bound or JTA-bound sessions; you don't need to manually close it. openSession() requires explicit closing. Modern JPA uses EntityManager which is similar.",
    hint: "In Spring, @Transactional uses getCurrentSession() style automatically.",
    level: "expert",
    codeExample: "<property name=\"hibernate.current_session_context_class\">thread</property>\nSession session = factory.getCurrentSession();"
  },
  {
    question: "What is the first-level cache? Which component manages it?",
    shortAnswer: "First-level cache is a session-scoped cache that stores entities retrieved during the session. Managed by the Session object.",
    explanation: "When you get an object by ID within the same session, Hibernate returns the cached instance without querying DB. It ensures repeatable reads and reduces SQL traffic.",
    hint: "Fetch the same entity twice – see how many SQL queries appear.",
    level: "moderate",
    codeExample: "Session s = factory.openSession();\nBook b1 = s.get(Book.class, 1L); // SQL\nBook b2 = s.get(Book.class, 1L); // from cache, no SQL"
  },
  {
    question: "What is a StatelessSession and when would you use it?",
    shortAnswer: "StatelessSession is a command-oriented API without first-level cache, dirty checking, or lazy loading. Used for batch processing or large datasets.",
    explanation: "It doesn't track changes, so every operation hits the DB. Much lower memory footprint. Useful for bulk insert/update and when you don't need persistence context features.",
    hint: "If you are inserting 10,000 rows, StatelessSession can be much faster.",
    level: "expert",
    codeExample: "StatelessSession ss = factory.openStatelessSession();\nTransaction tx = ss.beginTransaction();\nss.insert(student); // directly inserts\ntx.commit();\nss.close();"
  },
  {
    question: "Explain the difference between evict(), clear(), and flush() on Session.",
    shortAnswer: "evict() removes a single object from cache, clear() removes all, flush() synchronizes cache with DB but doesn't clear.",
    explanation: "flush() executes SQL to update DB, but objects remain in cache. evict() removes one object – future gets will query DB. clear() removes all objects. Use flush+clear for batch processing.",
    hint: "Try evict() after update but before commit – update might still be sent if flush mode is AUTO.",
    level: "expert",
    codeExample: "session.flush(); // send SQL\nsession.evict(student); // remove student from cache\nsession.clear(); // remove all"
  },
  {
    question: "How does Hibernate handle connection pooling out of the box?",
    shortAnswer: "Historically uses built-in pooling (deprecated), but recommends c3p0, HikariCP, or Apache DBCP via configuration.",
    explanation: "Set hibernate.c3p0.* properties or hibernate.hikari.* to enable pooling. Without pooling, every Session.openSession() may create a new physical connection.",
    hint: "Check logs for 'HikariCP' if you've configured it.",
    level: "moderate",
    codeExample: "<property name=\"hibernate.c3p0.max_size\">20</property>"
  },
  {
    question: "What is the purpose of hibernate.dialect property?",
    shortAnswer: "Dialect tells Hibernate which SQL dialect to generate for specific database (e.g., MySQL, PostgreSQL, Oracle).",
    explanation: "Different databases have different SQL syntax (e.g., LIMIT vs ROWNUM, sequences vs identity). Dialect translates Hibernate operations into database-specific SQL.",
    hint: "If you switch from MySQL to Oracle without changing dialect, pagination queries may fail.",
    level: "moderate",
    codeExample: "<property name=\"hibernate.dialect\">org.hibernate.dialect.PostgreSQLDialect</property>"
  },
  {
    question: "What is the difference between Session.load() and Session.get() regarding exceptions?",
    shortAnswer: "get() returns null if entity not found; load() throws ObjectNotFoundException when accessed (or immediately if using Hibernate 5+ with proxy).",
    explanation: "get() hits the database immediately. load() returns a proxy that may throw exception when you first access a property (except identifier). Use load() when you know the entity exists.",
    hint: "If you try load() with non-existent ID and never access any property, no exception? Test it.",
    level: "expert",
    codeExample: "Book b = session.load(Book.class, 999L); // no immediate DB call\nString title = b.getTitle(); // throws ObjectNotFoundException if not exists"
  },
  {
    question: "What is the role of the Interceptor interface?",
    shortAnswer: "Interceptor allows you to intercept calls to the session (save, update, delete, load) for cross-cutting concerns like auditing or logging.",
    explanation: "You can implement Interceptor and pass to sessionFactory.openSession(interceptor). Methods like onSave(), onFlushDirty(), etc. Called before certain operations.",
    hint: "Used to implement soft deletes or set 'last_updated' timestamps automatically.",
    level: "expert",
    codeExample: "Session session = sessionFactory.openSession(new AuditInterceptor());"
  },
  {
    question: "How can you access the JDBC Connection from a Hibernate Session?",
    shortAnswer: "Use Session.doWork(Work) or Session.doReturningWork(ReturningWork) to execute native JDBC code within the session's connection.",
    explanation: "This allows running custom SQL or stored procedures while still participating in the same transaction. Also unwrap(Connection.class) may work with certain configurations.",
    hint: "Be careful not to close the connection manually – Hibernate manages it.",
    level: "expert",
    codeExample: "session.doWork(connection -> {\n    PreparedStatement st = connection.prepareStatement(\"...\");\n    st.execute();\n});"
  },
  {
    question: "What is the difference between Hibernate's JPA EntityManager and Session?",
    shortAnswer: "Session is Hibernate's native API; EntityManager is the JPA standard API. Session has extra methods (evict, save, etc.) not in JPA.",
    explanation: "EntityManager is the JPA equivalent of Session. Use Hibernate's Session when you need Hibernate-specific features; otherwise use EntityManager for portability.",
    hint: "Spring Data JPA uses EntityManager under the hood.",
    level: "moderate",
    codeExample: "Session session = entityManager.unwrap(Session.class);"
  },
  {
    question: "What happens to the first-level cache when session.clear() is called?",
    shortAnswer: "All objects in the session cache become detached and any unflushed changes are lost (they are not written to DB).",
    explanation: "clear() removes all entities from the persistence context. If you had pending changes not flushed, they are forgotten. Use clear() after a batch operation to free memory.",
    hint: "Call flush() before clear() to save pending changes.",
    level: "expert",
    codeExample: "session.save(entity); // not flushed\nsession.clear(); // entity becomes detached, no INSERT"
  },
  {
    question: "What is the purpose of sessionFactory.getCache()?",
    shortAnswer: "It provides access to second-level cache management operations such as evicting entities, collections, or entire regions.",
    explanation: "Second-level cache is shared across sessions. getCache() lets you programmatically clear cached data without restarting the application.",
    hint: "Useful when you know some data has changed externally (e.g., via bulk SQL).",
    level: "expert",
    codeExample: "sessionFactory.getCache().evictEntity(Student.class, 1L);"
  },
  {
    question: "Explain the concept of 'session per request' pattern in web applications.",
    shortAnswer: "Open a session at the beginning of an HTTP request and close it at the end, usually via a filter or interceptor.",
    explanation: "This pattern ties session lifetime to request scope, avoiding LazyInitializationException when rendering views. However, it can cause N+1 queries if not careful.",
    hint: "Spring's OpenSessionInViewFilter implements this pattern.",
    level: "expert",
    codeExample: "// Filter: open session -> process request -> close session"
  },
  {
    question: "What are the differences between Hibernate 5 and 6 architecture?",
    shortAnswer: "Hibernate 6 introduces a new SQM (Semantic Query Model) layer, improved bootstrapping, and better Jakarta Persistence alignment.",
    explanation: "Hibernate 6 moved to a new query parser and reworked the SessionFactory building process. Dialects are more modular. For most users, architecture is similar but internally changed.",
    hint: "Check if you can upgrade without changing code – Hibernate 6 requires jakarta.* packages.",
    level: "expert",
    codeExample: "// Bootstrapping in Hibernate 6: new BootstrapServiceRegistryBuilder()"
  },
  {
    question: "How do you configure Hibernate programmatically without XML?",
    shortAnswer: "Use Configuration class or ServiceRegistryBuilder to set properties and add annotated classes.",
    explanation: "You can bypass hibernate.cfg.xml entirely by setting all properties via setProperty() and adding mapping resources or annotated classes.",
    hint: "Useful for test environments where you don't want external files.",
    level: "moderate",
    codeExample: "Configuration cfg = new Configuration();\ncfg.setProperty(\"hibernate.connection.url\", \"jdbc:h2:mem:test\");\ncfg.addAnnotatedClass(MyEntity.class);\nSessionFactory sf = cfg.buildSessionFactory();"
  },
  {
    question: "What is the purpose of the hbm2ddl.auto property in relation to architecture?",
    shortAnswer: "It controls automatic schema generation: validate, update, create, create-drop.",
    explanation: "This tool is part of Hibernate's tooling layer. In development, 'update' adds missing tables/columns. In production, 'validate' checks schema compatibility.",
    hint: "Never use 'create-drop' in production – data loss!",
    level: "moderate",
    codeExample: "<property name=\"hibernate.hbm2ddl.auto\">validate</property>"
  },
  {
    question: "Can you have multiple SessionFactory instances in one JVM?",
    shortAnswer: "Yes, typically one per database or per configuration. But each is heavy, so only if needed.",
    explanation: "For multiple databases, you'd have separate configurations and SessionFactory instances. Use them as singletons per database.",
    hint: "Think of microservices sharing a JVM – unlikely, but possible.",
    level: "expert",
    codeExample: "SessionFactory sf1 = forDb1();\nSessionFactory sf2 = forDb2();"
  },
  {
    question: "What is the default flush mode and how does it affect query execution?",
    shortAnswer: "Default is AUTO, which flushes before any query that might be affected by pending changes.",
    explanation: "Hibernate tries to avoid stale reads by flushing before queries if the pending changes might affect the result. COMMIT mode only flushes at commit time.",
    hint: "In AUTO, calling createQuery() may trigger an unexpected flush.",
    level: "expert",
    codeExample: "session.setFlushMode(FlushMode.COMMIT); // no flush before queries"
  },
  {
    question: "What is the lifecycle of a Session? Open -> ... -> Close. What operations are illegal after close?",
    shortAnswer: "After close, any operation using the session throws IllegalStateException. You cannot fetch, update, or refresh entities.",
    explanation: "Closed session cannot be reused. Any lazily loaded associations after close cause LazyInitializationException.",
    hint: "Always check session.isOpen() before using.",
    level: "moderate",
    codeExample: "session.close();\nsession.save(obj); // throws exception"
  },
  {
    question: "How does the JDBC connection acquisition work within the Session architecture?",
    shortAnswer: "Session lazily acquires a JDBC connection when needed (first DB operation), then releases it after transaction commit or when closed (depending on configuration).",
    explanation: "Hibernate uses a borrowing pattern: session.openSession() does not immediately get a connection. The connection is borrowed from the pool when the session needs to execute SQL.",
    hint: "Enable connection logging to see when connections are actually opened.",
    level: "expert",
    codeExample: "Session s = factory.openSession(); // no connection yet\ns.save(obj); // connection borrowed now"
  },
  {
    question: "What is the purpose of the 'session.replicate()' method?",
    shortAnswer: "replicate() allows copying an entity from another source (e.g., another database) while preserving its ID and version.",
    explanation: "Useful for data import, replication, or cache warming. It overrides Hibernate's normal ID generation and version checking.",
    hint: "Be careful with duplicate primary keys.",
    level: "expert",
    codeExample: "session.replicate(studentFromOtherDb, ReplicationMode.EXCEPTION);"
  },
  {
    question: "What is the benefit of using @Immutable entities?",
    shortAnswer: "Hibernate optimizes immutable entities by skipping dirty checking and some cache locking.",
    explanation: "Marking an entity as @Immutable tells Hibernate that the entity never changes. Updates will throw an exception. This improves performance for read-only data.",
    hint: "Use for lookup tables like Country or State.",
    level: "moderate",
    codeExample: "@Immutable\n@Entity\npublic class Country { ... }"
  },
  {
    question: "How does Hibernate's multi-tenancy architecture differ from single-tenant?",
    shortAnswer: "Multi-tenancy requires a tenant identifier to separate data; Hibernate supports database, schema, or discriminator strategies.",
    explanation: "Instead of one SessionFactory per tenant, you can use one SessionFactory configured with a MultiTenantConnectionProvider. This adds a tenant ID to each session.",
    hint: "SaaS apps with shared database but isolated schemas use 'schema' strategy.",
    level: "expert",
    codeExample: "Session session = factory.withOptions().tenantIdentifier(\"tenant1\").openSession();"
  },
  {
    question: "What is the difference between Hibernate's 'native' and 'flushed' batch sizes?",
    shortAnswer: "hibernate.jdbc.batch_size controls statement batching; hibernate.batch_versioned_data controls versioned batches.",
    explanation: "Batch size determines how many statements are grouped in a single JDBC batch. Versioned data batching is for optimistic locking rows.",
    hint: "Set batch size to 20-50 for optimal performance.",
    level: "expert",
    codeExample: "<property name=\"hibernate.jdbc.batch_size\">20</property>"
  },
  {
    question: "Explain the architecture behind Hibernate's event system.",
    shortAnswer: "Event system uses listeners (e.g., PreInsertEventListener) that can hook into session operations to add custom behavior.",
    explanation: "Events are fired before/after operations like save, update, delete, load. You can implement listeners and register them in the configuration.",
    hint: "Useful for creating audit logs without cluttering business code.",
    level: "expert",
    codeExample: "Configuration cfg = new Configuration();\ncfg.getEventListeners().setPreInsertEventListeners(new PreInsertEventListener[]{...});"
  },
  {
    question: "Finally: What is the overall architectural benefit of Hibernate over plain JDBC?",
    shortAnswer: "Hibernate provides a persistence layer that abstracts boilerplate, caching, and object mapping, letting developers focus on business logic.",
    explanation: "The architecture separates concerns: mapping metadata, session management, transaction demarcation, and query generation. This leads to cleaner, more maintainable code, especially for complex object graphs.",
    hint: "Think about the long-term cost of maintaining thousands of lines of manual JDBC mapping code.",
    level: "moderate",
    codeExample: "// Hibernate: 2 lines for CRUD\nsession.save(student);\n// JDBC: ~20 lines with try-catch and mapping"
  }
];

export default questions;