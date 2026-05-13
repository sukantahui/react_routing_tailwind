const questions = [
  {
    question: "Why is connection pooling important for Hibernate applications?",
    shortAnswer: "Reusing database connections drastically reduces overhead and improves performance.",
    explanation: "Creating a database connection is expensive (network handshake, authentication, memory). Connection pools pre-create connections, allowing reuse across requests. Without pooling, each Hibernate operation would open/close a connection, leading to high latency and resource exhaustion.",
    hint: "Never use DriverManager directly in production.",
    level: "basic",
    codeExample: "// With HikariCP, connections are borrowed from a pool"
  },
  {
    question: "What is the default connection pool in Hibernate when no provider is specified?",
    shortAnswer: "Hibernate has a built-in minimal pooling, but it's not suitable for production.",
    explanation: "Hibernate's internal pool (DriverManagerConnectionProvider) creates connections on demand without proper pooling features. It's only intended for testing. For production, you must configure an external pool like HikariCP or c3p0.",
    hint: "Always add a dedicated pooling library to your project.",
    level: "intermediate",
    codeExample: "hibernate.connection.provider_class=com.zaxxer.hikari.hibernate.HikariConnectionProvider"
  },
  {
    question: "What are the key differences between c3p0 and HikariCP?",
    shortAnswer: "HikariCP is faster, more reliable, and recommended for modern applications; c3p0 is legacy but still used.",
    explanation: "HikariCP uses lock-free algorithms, has significantly lower overhead, faster connection acquisition, and features like leak detection. c3p0 is older, known to have performance issues under load, but is still functional.",
    hint: "For new projects, choose HikariCP.",
    level: "basic",
    codeExample: "// HikariCP properties: hibernate.hikari.maximumPoolSize=10"
  },
  {
    question: "How do I configure HikariCP with Hibernate using properties file?",
    shortAnswer: "Set properties prefixed with 'hibernate.hikari.' in hibernate.properties.",
    explanation: "Hibernate automatically passes properties with 'hibernate.hikari.' prefix to HikariCP. Key properties: maximumPoolSize, minimumIdle, connectionTimeout, idleTimeout, leakDetectionThreshold.",
    hint: "Set hibernate.connection.provider_class to com.zaxxer.hikari.hibernate.HikariConnectionProvider.",
    level: "intermediate",
    codeExample: "hibernate.hikari.maximumPoolSize=20\nhibernate.hikari.minimumIdle=10"
  },
  {
    question: "How do I choose the optimal maximumPoolSize?",
    shortAnswer: "A common formula: (CPU cores * 2) + number of background threads, but measure under load.",
    explanation: "Too many connections overload the database; too few cause thread waiting. For OLTP, start with 10-20 per database node. For heavy analytics, fewer connections with larger statement batches. Use monitoring to adjust.",
    hint: "HikariCP's default (10) is safe; benchmark with realistic load.",
    level: "advanced",
    codeExample: "// No code, but use JMX to monitor active connections"
  },
  {
    question: "What is connection leak detection and how to enable it in HikariCP?",
    shortAnswer: "Leak detection logs stack traces for connections borrowed longer than a threshold.",
    explanation: "Set hibernate.hikari.leakDetectionThreshold to milliseconds (e.g., 10000). If a connection is not returned to pool within that time, HikariCP logs a warning with the stack trace where the connection was acquired. Essential for finding unclosed Sessions.",
    hint: "Set the threshold 2-3 times longer than your longest normal query.",
    level: "intermediate",
    codeExample: "hibernate.hikari.leakDetectionThreshold=15000"
  },
  {
    question: "What happens when the connection pool is exhausted?",
    shortAnswer: "Threads waiting for a connection block until a connection is released or connectionTimeout expires.",
    explanation: "If all connections are active and max pool size is reached, new requests for a connection wait (queue). If wait time exceeds connectionTimeout (default 30 seconds), Hibernate throws an exception (e.g., SQLException or HibernateException).",
    hint: "Monitor pool metrics to detect exhaustion early.",
    level: "intermediate",
    codeExample: "hibernate.hikari.connectionTimeout=30000"
  },
  {
    question: "What is the difference between connectionTimeout and idleTimeout in HikariCP?",
    shortAnswer: "connectionTimeout is max wait for a connection; idleTimeout is time an idle connection stays in pool.",
    explanation: "connectionTimeout applies when a thread requests a connection and none is available: how long to wait before failing. idleTimeout removes idle connections that exceed the time (only relevant if minIdle < maxPoolSize).",
    hint: "idleTimeout should be less than database or firewall timeout to avoid stale connections.",
    level: "advanced",
    codeExample: "hibernate.hikari.idleTimeout=300000\nhibernate.hikari.connectionTimeout=30000"
  },
  {
    question: "Can Hibernate work without any connection pool?",
    shortAnswer: "Yes, but only for development, not production.",
    explanation: "Without explicit pooling, Hibernate uses DriverManagerConnectionProvider, which opens a new connection for each Session open and closes it on close. This is extremely inefficient for web applications and will exhaust resources quickly.",
    hint: "Add HikariCP as soon as you move beyond local testing.",
    level: "basic",
    codeExample: "// Not recommended"
  },
  {
    question: "How do I monitor connection pool statistics in HikariCP?",
    shortAnswer: "Enable JMX registration and use JConsole or Micrometer.",
    explanation: "Set hibernate.hikari.registerMbeans=true. Then via JMX you can see active connections, idle, pending threads, total acquisitions, etc. For metrics frameworks, HikariCP exposes meters via Micrometer or Dropwizard.",
    hint: "Spring Boot automatically exposes HikariCP metrics if actuator is enabled.",
    level: "intermediate",
    codeExample: "hibernate.hikari.registerMbeans=true"
  },
  {
    question: "Does HikariCP cache PreparedStatements?",
    shortAnswer: "No, HikariCP does not cache statements; it relies on JDBC driver or Hibernate's statement cache.",
    explanation: "Unlike c3p0, HikariCP focuses on connection management only. Statement caching is delegated to the database driver (e.g., PostgreSQL with prepareThreshold) or Hibernate's hibernate.c3p0.max_statements (c3p0) or hibernate.jdbc.batch_size. This simplifies HikariCP and improves performance.",
    hint: "Use Hibernate's built-in statement batching for performance.",
    level: "advanced",
    codeExample: "hibernate.jdbc.batch_size=20"
  },
  {
    question: "How to configure connection test query in HikariCP?",
    shortAnswer: "Set hibernate.hikari.connectionTestQuery = \"SELECT 1\" (database dependent).",
    explanation: "A connection test query validates that a connection is still alive before lending it to the application. HikariCP runs it periodically based on idleTimeout and when connections are borrowed. For PostgreSQL, use \"SELECT 1\". For MySQL, \"SELECT 1\" works. Oracle uses \"SELECT 1 FROM DUAL\".",
    hint: "Use connectionTestQuery for databases that don't support JDBC4's Connection.isValid().",
    level: "intermediate",
    codeExample: "hibernate.hikari.connectionTestQuery=SELECT 1"
  },
  {
    question: "What is the purpose of hibernate.c3p0.unreturnedConnectionTimeout?",
    shortAnswer: "Detects connections that were never returned to the pool and eventually closes them.",
    explanation: "If a connection is borrowed but never closed (leaked), this timeout forces rollback and close of the connection after the specified seconds. It helps prevent pool exhaustion from leaked connections.",
    hint: "Set to a value greater than your longest expected operation.",
    level: "intermediate",
    codeExample: "hibernate.c3p0.unreturnedConnectionTimeout=30"
  },
  {
    question: "Why am I getting 'Connection is not available, request timed out'?",
    shortAnswer: "The connection pool is exhausted; all connections are busy and your request waited longer than connectionTimeout.",
    explanation: "Common causes: connection leak (not closing Session), database slow queries holding connections, or maximumPoolSize too small for concurrency level. Check active connection count and thread wait times.",
    hint: "Enable leak detection to find missing close() calls.",
    level: "intermediate",
    codeExample: "// Example error: java.sql.SQLTransientConnectionException"
  },
  {
    question: "Can I use a DataSource from JNDI with Hibernate and still get pooling?",
    shortAnswer: "Yes, the DataSource itself (e.g., from Tomcat, WildFly) should have pooling configured; Hibernate will use it.",
    explanation: "Configure JNDI DataSource in your application server with your preferred pool (typically the server's built-in pool). Then in Hibernate set hibernate.connection.datasource JNDI name. Hibernate does not add another layer of pooling.",
    hint: "Avoid double pooling (pool inside pool) – it wastes resources.",
    level: "advanced",
    codeExample: "hibernate.connection.datasource=java:comp/env/jdbc/SchoolDB"
  },
  {
    question: "How to set minimumIdle in HikariCP to a lower value to save resources?",
    shortAnswer: "Set hibernate.hikari.minimumIdle to a number smaller than maximumPoolSize (e.g., 5).",
    explanation: "minimumIdle controls how many idle connections HikariCP tries to maintain. If you have low traffic, setting it lower reduces idle connections. However, under traffic spikes, the pool may need to create new connections, which adds latency.",
    hint: "For most applications, default (same as maximumPoolSize) is fine.",
    level: "intermediate",
    codeExample: "hibernate.hikari.minimumIdle=5"
  },
  {
    question: "What is the hibernate.connection.provider_class property?",
    shortAnswer: "Specifies the class that implements ConnectionProvider, e.g., HikariCP or c3p0 provider.",
    explanation: "To use a custom pool, set this to the pool's Hibernate integration class. For HikariCP: com.zaxxer.hikari.hibernate.HikariConnectionProvider. For c3p0: org.hibernate.connection.C3P0ConnectionProvider.",
    hint: "If you set hibernate.hikari properties, Hibernate automatically uses HikariCP? Not always – explicitly set provider_class.",
    level: "intermediate",
    codeExample: "hibernate.connection.provider_class=com.zaxxer.hikari.hibernate.HikariConnectionProvider"
  },
  {
    question: "How does connection pooling interact with Hibernate's Session?",
    shortAnswer: "Each Session obtains a JDBC connection from the pool when needed (usually on first database operation).",
    explanation: "The connection is held until Session is closed. Therefore, long-lived sessions keep connections occupied, reducing pool efficiency. Best practice: open and close sessions per transaction/request.",
    hint: "Never keep a Session open across multiple user requests.",
    level: "basic",
    codeExample: "try (Session session = sessionFactory.openSession()) { // connection borrowed from pool }"
  },
  {
    question: "Does Hibernate need a separate connection pool for second-level cache?",
    shortAnswer: "No, second-level cache does not use JDBC connections; it's separate in-memory or external cache.",
    explanation: "Second-level cache (e.g., EhCache, Redis) has its own connection management. It does not interfere with database connection pools. The pool is only for database operations.",
    hint: "Cache connections are configured independently.",
    level: "intermediate",
    codeExample: "// No overlap"
  },
  {
    question: "How to configure validationTimeout in HikariCP?",
    shortAnswer: "Set hibernate.hikari.validationTimeout (default 5000 ms).",
    explanation: "validationTimeout is the maximum time a connection test query can take. If the test exceeds this, the connection is considered invalid and evicted. This is separate from connectionTimeout.",
    hint: "Keep validationTimeout shorter than connectionTimeout.",
    level: "advanced",
    codeExample: "hibernate.hikari.validationTimeout=3000"
  },
  {
    question: "Can I share a connection pool across multiple SessionFactory instances?",
    shortAnswer: "Yes, if you use the same DataSource instance for all SessionFactory configurations.",
    explanation: "Create a single DataSource (e.g., HikariDataSource) programmatically and pass it to each Configuration's .addDataSource(). That way, multiple persistence units share the same pool, saving resources.",
    hint: "Be mindful of transaction isolation across units; they still see separate database connections.",
    level: "expert",
    codeExample: "configuration.setProperty(\"hibernate.connection.datasource\", sharedDataSource);"
  },
  {
    question: "What are the symptoms of a connection leak in production?",
    shortAnswer: "Gradually increasing response times, eventual timeouts, 'too many connections' DB error.",
    explanation: "As leaked connections are not returned, the pool's active count reaches maxPoolSize. New requests wait (increasing latency) and eventually time out. Database side shows more open connections than expected.",
    hint: "Use leakDetectionThreshold and monitor active connection trends.",
    level: "intermediate",
    codeExample: "// Log example: Connection leak detected"
  },
  {
    question: "How do I close idle connections after a period of inactivity?",
    shortAnswer: "Set idleTimeout in HikariCP and perhaps minimumIdle=0.",
    explanation: "idleTimeout removes connections that have been idle longer than the timeout (default 10 minutes). Setting minimumIdle=0 allows the pool to shrink to zero over time, saving resources on low-traffic apps.",
    hint: "But creating new connections on a surge adds latency; tune accordingly.",
    level: "advanced",
    codeExample: "hibernate.hikari.idleTimeout=300000\nhibernate.hikari.minimumIdle=0"
  },
  {
    question: "Is c3p0 still actively maintained?",
    shortAnswer: "c3p0 is in maintenance mode; no new features; use HikariCP instead.",
    explanation: "The last major c3p0 release was years ago. While it still works, known issues in high-concurrency scenarios and lack of modern features make HikariCP the clear choice for new projects.",
    hint: "If you're on a legacy project using c3p0, consider migrating.",
    level: "intermediate",
    codeExample: "// No code"
  },
  {
    question: "What is the difference between hibernate.c3p0.max_size and hibernate.hikari.maximumPoolSize?",
    shortAnswer: "Both define the maximum number of connections in the pool; different property names for different providers.",
    explanation: "c3p0 uses max_size; HikariCP uses maximumPoolSize. They work similarly: the pool will never exceed this number. Set both appropriately based on your DB's connection limit.",
    hint: "Make sure the total of all pool max sizes doesn't exceed database max_connections.",
    level: "basic",
    codeExample: "hibernate.c3p0.max_size=20 // c3p0\nhibernate.hikari.maximumPoolSize=20 // HikariCP"
  },
  {
    question: "How to test a connection pool configuration in isolation?",
    shortAnswer: "Write a small test that borrows and returns connections under concurrency and monitors metrics.",
    explanation: "Use ExecutorService to simulate multiple threads, each acquiring a connection, holding it for a random time, and releasing. Check that pool size stays within max and no exceptions occur.",
    hint: "HikariCP provides HikariDataSource.getHikariPoolMXBean() to monitor during tests.",
    level: "advanced",
    codeExample: "// JMeter or simple Java concurrency test"
  },
  {
    question: "Does HikariCP support connection validation on borrow?",
    shortAnswer: "Yes, via connectionTestQuery or JDBC4's isValid().",
    explanation: "HikariCP by default uses JDBC4's Connection.isValid() API for validation, which does not require an explicit query. If your driver doesn't support it, set connectionTestQuery. HikariCP also tests connections periodically during idle time.",
    hint: "isValid() is more efficient than a test query.",
    level: "intermediate",
    codeExample: "// No query needed for most modern JDBC drivers"
  },
  {
    question: "What is the typical cause of 'HikariPool-1 - Connection is not available, request timed out after 30000ms'?",
    shortAnswer: "All connections are busy and the request queue waited 30 seconds with no free connection.",
    explanation: "Usually caused by a connection leak (unclosed statements or sessions) or a database performance issue causing queries to take very long. Check for active connections that exceed normal duration.",
    hint: "Set leakDetectionThreshold to identify which code path is holding connections too long.",
    level: "intermediate",
    codeExample: "// Enable leak detection: 10000ms"
  },
  {
    question: "How do I configure connection pool properties when using Spring Boot with Hibernate?",
    shortAnswer: "Use application.properties with spring.datasource.hikari.* or spring.datasource.c3p0.*.",
    explanation: "Spring Boot auto-configures HikariCP if on classpath. You can set pool properties directly: spring.datasource.hikari.maximumPoolSize=20. Hibernate will use that DataSource automatically.",
    hint: "Do not mix spring.datasource.hikari properties with hibernate.hikari properties – use the former.",
    level: "intermediate",
    codeExample: "spring.datasource.hikari.maximumPoolSize=20\nspring.datasource.hikari.leakDetectionThreshold=10000"
  },
  {
    question: "What happens to a pooled connection after a network failure?",
    shortAnswer: "The connection becomes stale; HikariCP or c3p0 evicts it after validation fails.",
    explanation: "When a connection is borrowed and the network has failed, the next operation will throw an exception. The pool can detect this during validation (test query) and remove the invalid connection, creating a new one if needed.",
    hint: "Setting connectionTestQuery helps detect dead connections faster.",
    level: "advanced",
    codeExample: "// No code"
  }
];

export default questions;