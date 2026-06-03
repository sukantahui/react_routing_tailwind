const questions = [
  {
    question: "What is the difference between local and JTA transactions in Hibernate?",
    shortAnswer: "Local transactions manage a single database via JDBC; JTA coordinates multiple resources (databases, queues) using a transaction manager.",
    explanation: "Local transactions are simpler and sufficient for most applications. JTA (Java Transaction API) is needed when you have distributed transactions across multiple XA-compliant resources, e.g., updating two databases or a database and a JMS queue.",
    hint: "Think about whether your app talks to more than one transactional system.",
    level: "basic",
    codeExample: "// Local: session.beginTransaction(); // JTA: UserTransaction utx = ...; utx.begin();"
  },
  {
    question: "How do I enable JTA transaction support in Hibernate?",
    shortAnswer: "Set hibernate.transaction.coordinator_class=jta and provide a JTA platform implementation.",
    explanation: "You need to configure the transaction coordinator class and the JTA platform (e.g., BitronixJtaPlatform, JBossJtaPlatform). Also set hibernate.current_session_context_class=jta so that getCurrentSession() joins the ongoing JTA transaction.",
    hint: "Don't forget to add a JTA library like Bitronix or Narayana to your classpath.",
    level: "intermediate",
    codeExample: "<property name='hibernate.transaction.coordinator_class'>jta</property>"
  },
  {
    question: "What happens if I call session.beginTransaction() inside a JTA transaction?",
    shortAnswer: "It may cause an exception or start a nested transaction that is not portable.",
    explanation: "Hibernate's JTA integration expects the application to not call beginTransaction(). Instead, you rely on UserTransaction or container-managed transactions. Calling beginTransaction() can lead to IllegalStateException or inconsistent behavior.",
    hint: "In JTA mode, simply use session.getTransaction() for status, but never begin.",
    level: "advanced",
    codeExample: "// Wrong: session.beginTransaction(); // Correct: rely on utx.begin() before opening session."
  },
  {
    question: "What is the purpose of session.flush() before commit?",
    shortAnswer: "It synchronizes the persistence context with the database before transaction commit.",
    explanation: "flush() executes SQL DML operations (INSERT, UPDATE, DELETE) but does not commit the transaction. You might call it manually to ensure constraints are checked early or to get generated IDs. Commit will automatically flush, but manual flush is useful for batching or large insertions.",
    hint: "In local transactions, flush() without commit will still write to DB, but those changes are rolled back if rollback occurs.",
    level: "intermediate",
    codeExample: "session.flush(); // forces SQL execution; later tx.commit() makes them permanent."
  },
  {
    question: "How can I rollback a transaction without throwing an exception?",
    shortAnswer: "Call tx.rollback() explicitly.",
    explanation: "You can rollback a transaction at any point before commit. After rollback, the session becomes unusable for further modifications; you should close it and open a new session for new work.",
    hint: "If you need to continue using the same session after rollback, call session.clear() but it's not recommended.",
    level: "basic",
    codeExample: "if (someCondition) tx.rollback(); // then session.close();"
  },
  {
    question: "What is the difference between session.flush() and tx.commit()?",
    shortAnswer: "flush() only executes SQL; commit() finalizes the transaction and then flushes if not already flushed.",
    explanation: "Commit makes changes permanent and releases database locks. Flush just sends the changes to the database but they are still within the transaction; they will be rolled back if the transaction rolls back. Commit always flushes before committing.",
    hint: "You can call flush() multiple times within a transaction.",
    level: "basic",
    codeExample: "session.flush(); // writes to DB, still uncommitted"
  },
  {
    question: "What is the significance of hibernate.connection.autocommit=false?",
    shortAnswer: "It disables auto-commit mode, requiring explicit transaction boundaries.",
    explanation: "When set to false (the default), each SQL statement does not automatically commit. Hibernate then uses its own Transaction API to begin/commit. If set to true, each statement is committed immediately, breaking ACID across multiple operations.",
    hint: "Never set autocommit=true in a Hibernate application unless you understand the consequences.",
    level: "intermediate",
    codeExample: "hibernate.connection.autocommit=false // recommended"
  },
  {
    question: "Can I use Hibernate with JTA in a standalone Java application?",
    shortAnswer: "Yes, using a standalone JTA provider like Bitronix or Atomikos.",
    explanation: "You need to configure the JTA transaction manager and set Hibernate's coordinator_class and jta.platform accordingly. The transaction manager must be started before Hibernate and enlisted resources (like DataSource) must be XA-capable.",
    hint: "Bitronix is easier for learning; for production, consider Atomikos or Narayana.",
    level: "expert",
    codeExample: "// Bitronix setup: TransactionManagerServices.getTransactionManager().start();"
  },
  {
    question: "What is the default transaction timeout in Hibernate?",
    shortAnswer: "No default timeout; it depends on the underlying JDBC driver or transaction manager.",
    explanation: "For local transactions, Hibernate does not enforce a timeout unless you set hibernate.transaction.jta.timeout or hibernate.transaction.jdbc.timeout. For JTA, you can set timeout on UserTransaction: utx.setTransactionTimeout(seconds).",
    hint: "Always set reasonable timeouts to avoid long-held locks.",
    level: "intermediate",
    codeExample: "utx.setTransactionTimeout(30); // 30 seconds"
  },
  {
    question: "How do I know if a transaction is active?",
    shortAnswer: "Call tx.isActive() on the Transaction object.",
    explanation: "After beginTransaction() returns, isActive() returns true. After commit or rollback, it becomes false. This helps avoid calling commit on a rolled-back transaction.",
    hint: "Always check isActive() before committing in a catch-all finally block.",
    level: "basic",
    codeExample: "if (tx != null && tx.isActive()) tx.commit();"
  },
  {
    question: "What is the difference between REQUIRED and REQUIRES_NEW propagation in JTA?",
    shortAnswer: "REQUIRED joins existing transaction; REQUIRES_NEW suspends current and creates a new one.",
    explanation: "These are JTA transaction attributes (in EJB/Spring). REQUIRED uses the existing transaction if any, else starts a new one. REQUIRES_NEW always starts a fresh transaction, suspending the current one. Hibernate sessions should be bound per transaction.",
    hint: "REQUIRES_NEW can cause deadlocks if overused — use sparingly.",
    level: "expert",
    codeExample: "@Transactional(propagation = Propagation.REQUIRES_NEW)"
  },
  {
    question: "Why should I avoid transaction-per-operation pattern?",
    shortAnswer: "It leads to excessive database round-trips and inconsistent reads.",
    explanation: "Each operation (save, delete) in its own transaction causes many commits, reducing performance and breaking atomicity. Instead, group multiple operations into a single transaction.",
    hint: "The typical pattern is transaction-per-request or transaction-per-use-case.",
    level: "intermediate",
    codeExample: "// Bad: for each item { begin; save; commit; } // Good: begin; for all items save; commit;"
  },
  {
    question: "Can I use savepoints in Hibernate transactions?",
    shortAnswer: "Yes, via JDBC 3.0 savepoints using Transaction.setSavepoint().",
    explanation: "Hibernate's Transaction interface provides setSavepoint(String name) and releaseSavepoint(Savepoint sp). This allows partial rollback within a transaction, useful for nested operations where you want to rollback only part of the work.",
    hint: "Savepoints are not supported by all databases; test before production use.",
    level: "advanced",
    codeExample: "Savepoint sp = tx.setSavepoint(\"beforeUpdate\"); // ... if error, tx.rollback(sp);"
  },
  {
    question: "What is the purpose of hibernate.current_session_context_class?",
    shortAnswer: "It defines how the current session is bound to the transaction context.",
    explanation: "Possible values: 'thread' (default, binds to thread), 'jta' (binds to JTA transaction), 'managed' (for container). With 'thread', each thread has its own session; with 'jta', the session is associated with the ongoing JTA transaction.",
    hint: "In web applications, 'thread' is common but beware of session-per-thread anti-pattern.",
    level: "intermediate",
    codeExample: "<property name='hibernate.current_session_context_class'>thread</property>"
  },
  {
    question: "How does Hibernate handle optimistic locking during transactions?",
    shortAnswer: "Using @Version attribute; the DB row version is checked on update.",
    explanation: "Optimistic locking assumes conflicts are rare. Hibernate increments a version column and checks that the version hasn't changed since loading. If a concurrent update occurred, an OptimisticLockException is thrown, and the transaction is rolled back.",
    hint: "Always handle OptimisticLockException gracefully – retry the transaction.",
    level: "advanced",
    codeExample: "@Version private int version;"
  },
  {
    question: "What is the difference between javax.transaction.UserTransaction and javax.transaction.TransactionManager?",
    shortAnswer: "UserTransaction is for application code; TransactionManager is for container internals.",
    explanation: "UserTransaction allows programmatic transaction control (begin, commit, rollback). TransactionManager provides additional operations like suspend, resume, and is used by containers and frameworks. In JTA, you typically obtain UserTransaction via JNDI.",
    hint: "For most applications, only UserTransaction is needed.",
    level: "expert",
    codeExample: "UserTransaction utx = (UserTransaction) new InitialContext().lookup(\"java:comp/UserTransaction\");"
  },
  {
    question: "Can I mix Hibernate's Transaction API with Spring's @Transactional?",
    shortAnswer: "You shouldn't; Spring controls transactions, so don't use session.beginTransaction() when using @Transactional.",
    explanation: "When using Spring, @Transactional manages the transaction lifecycle. Hibernate's Transaction API would interfere. Instead, rely on Spring's transaction synchronization, and Hibernate will automatically join the Spring-managed transaction.",
    hint: "If you see HibernateTransactionManager in logs, you are in Spring mode - avoid manual transaction calls.",
    level: "intermediate",
    codeExample: "@Transactional // Spring handles begin/commit; no session.beginTransaction() needed"
  },
  {
    question: "What is the purpose of XAResource in JTA?",
    shortAnswer: "XAResource enables a resource (e.g., database) to participate in a two-phase commit protocol.",
    explanation: "JTA uses XAResource interfaces to coordinate transactions across multiple resources. Hibernate provides XAResource wrappers for JDBC connections, allowing the database to participate in distributed transactions managed by a JTA transaction manager.",
    hint: "Only XA-compliant JDBC drivers can be used with JTA distributed transactions.",
    level: "expert",
    codeExample: "// Hibernate internally enlists XAResource when using JTA platform"
  },
  {
    question: "How to set transaction isolation level in Hibernate properties?",
    shortAnswer: "Use hibernate.connection.isolation with values 1,2,4,8 (READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE).",
    explanation: "These correspond to Connection.TRANSACTION_* constants. The isolation level is set on each JDBC connection obtained. Note that Hibernate does not change isolation during a transaction, so it's set at connection start.",
    hint: "READ_COMMITTED (2) is the typical safe choice for most applications.",
    level: "intermediate",
    codeExample: "hibernate.connection.isolation=2"
  },
  {
    question: "What happens to Lazy-loaded associations after transaction commit?",
    shortAnswer: "They become inaccessible (LazyInitializationException) if the session is closed.",
    explanation: "The Hibernate session must be open to load lazy associations. After transaction commit (and session close), accessing a lazy collection throws LazyInitializationException. To avoid this, either initialize before closing or use fetch joins.",
    hint: "Open Session in View pattern is a workaround but can lead to performance issues.",
    level: "intermediate",
    codeExample: "Hibernate.initialize(student.getCourses()); // before commit"
  },
  {
    question: "Can I rollback a transaction after evicting entities?",
    shortAnswer: "Yes, rollback works regardless of eviction; it reverts database changes but not in-memory state.",
    explanation: "Evict() removes an entity from the session cache. After rollback, the database is unchanged, but the evicted entity in memory may still hold old values. You should discard the entity after rollback and reload fresh data.",
    hint: "After rollback, it's safest to close the session and open a new one.",
    level: "advanced",
    codeExample: "session.evict(student); // student detached; rollback still effective on DB"
  },
  {
    question: "What is the difference between programmatic and declarative transaction management?",
    shortAnswer: "Programmatic uses explicit begin/commit in code; declarative uses annotations/AOP.",
    explanation: "Programmatic gives fine-grained control but clutters code. Declarative (e.g., @Transactional) is cleaner and recommended. Spring and Java EE containers provide declarative management, allowing you to define transaction boundaries via configuration.",
    hint: "For new projects, prefer declarative transaction management.",
    level: "intermediate",
    codeExample: "@Transactional // declarative vs tx.begin(); // programmatic"
  },
  {
    question: "How do I debug transaction leaks (unclosed transactions)?",
    shortAnswer: "Enable logging for org.hibernate.transaction and monitor active transaction count.",
    explanation: "Set log level DEBUG for categories: org.hibernate.engine.transaction.internal.TransactionImpl and org.hibernate.resource.transaction. You can also use a JDBC proxy like log4jdbc to see when commits/rollbacks happen.",
    hint: "Some Hibernate statistics also expose transaction counts: getStatistics().getTransactionCount()",
    level: "expert",
    codeExample: "logger.debug(\"Transaction count: \" + sessionFactory.getStatistics().getTransactionCount());"
  },
  {
    question: "What is the heuristics exception in JTA?",
    shortAnswer: "A heuristics exception occurs when some resources commit but others rollback during two-phase commit.",
    explanation: "This is a partial failure state – the transaction manager could not guarantee atomicity. Heuristic decisions are rare and usually indicate a bug or resource failure. The application should log and possibly perform manual cleanup.",
    hint: "Heuristic exceptions are very serious and require manual intervention.",
    level: "expert",
    codeExample: "// javax.transaction.HeuristicMixedException thrown"
  },
  {
    question: "Can I use both JDBC and Hibernate operations in the same transaction?",
    shortAnswer: "Yes, if using the same underlying JDBC connection, but not advisable.",
    explanation: "You can obtain the JDBC connection from Hibernate via session.doWork(Connection). But mixing raw JDBC can bypass Hibernate's cache and may cause inconsistencies. If you must, ensure both share the same transaction by committing via Hibernate.",
    hint: "Better to perform all operations through Hibernate unless you have special needs.",
    level: "advanced",
    codeExample: "session.doWork(connection -> { // raw JDBC work }); // participates in current tx"
  },
  {
    question: "What does hibernate.transaction.auto_close_session do?",
    shortAnswer: "It automatically closes the session after transaction completion (commit/rollback).",
    explanation: "When true, the session is closed as soon as the transaction ends. This is a legacy convenience but can lead to premature closing if not careful. Modern Hibernate applications manage session lifecycle explicitly.",
    hint: "Automatic closing is not recommended – always close session in finally block.",
    level: "intermediate",
    codeExample: "<property name='hibernate.transaction.auto_close_session'>false</property>"
  },
  {
    question: "How to handle long-running transactions with Hibernate?",
    shortAnswer: "Avoid them; break into smaller transactions. If unavoidable, use session.clear() or evict to avoid memory bloat.",
    explanation: "Long transactions hold database locks and accumulate managed entities in the first-level cache, causing memory growth. Periodically call session.clear() and flush() to detach entities. Alternatively, use stateless sessions for bulk operations.",
    hint: "For reporting queries, consider using a separate non-transactional session.",
    level: "expert",
    codeExample: "if (count % 100 == 0) { session.flush(); session.clear(); }"
  },
  {
    question: "What is the rollback-only flag in JTA?",
    shortAnswer: "A marker set on transaction to force rollback even if commit is called later.",
    explanation: "You can call setRollbackOnly() on the Transaction object. This ensures that any attempt to commit will actually rollback. This is useful when a component detects an error that shouldn't be fatal to the caller but must abort the transaction.",
    hint: "In Spring, @Transactional(rollbackFor=Exception.class) automatically marks rollback-only.",
    level: "advanced",
    codeExample: "tx.setRollbackOnly(); // later tx.commit() will throw RollbackException"
  },
  {
    question: "Can I start a transaction without a JDBC connection?",
    shortAnswer: "No, a transaction requires an active connection.",
    explanation: "Calling beginTransaction() will lazily obtain a JDBC connection from the pool. If no connection is available (e.g., pool exhausted), the call will block or throw an exception. The connection is held until commit/rollback.",
    hint: "Make sure your connection pool is properly sized to accommodate concurrent transactions.",
    level: "basic",
    codeExample: "Transaction tx = session.beginTransaction(); // obtains connection"
  },
  {
    question: "How do I verify that a transaction was committed successfully?",
    shortAnswer: "Catch any exception after commit; if none, commit succeeded.",
    explanation: "The commit() method throws HibernateException or TransactionException on failure. In JTA, commit may throw RollbackException, HeuristicRollbackException, etc. Always wrap commit in try-catch to determine success.",
    hint: "After commit, you can also query the database to double-check changes.",
    level: "intermediate",
    codeExample: "try { tx.commit(); } catch (Exception e) { // commit failed }"
  }
];

export default questions;