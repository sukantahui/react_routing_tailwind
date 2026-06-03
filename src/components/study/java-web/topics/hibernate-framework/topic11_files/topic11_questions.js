// 30 FAQ questions - moderate to expert level about Hibernate properties file configuration
const questions = [
    {
        question: "What is the purpose of hibernate.properties file?",
        shortAnswer: "It stores Hibernate configuration as key-value pairs for database connection and behavior settings.",
        explanation: "hibernate.properties is a standard Java properties file placed in the classpath. Hibernate automatically loads it and uses the properties to configure the SessionFactory, JDBC connection, dialect, caching, and other settings. It's an alternative to hibernate.cfg.xml.",
        hint: "Think of it like a .env file for Hibernate.",
        level: "basic",
        codeExample: "hibernate.dialect=org.hibernate.dialect.MySQLDialect\nhibernate.connection.url=jdbc:mysql://localhost/db"
    },
    {
        question: "How does Hibernate merge properties from multiple sources?",
        shortAnswer: "Properties defined programmatically override those in hibernate.properties, and hibernate.cfg.xml overrides both.",
        explanation: "Hibernate uses a precedence order: 1) Explicit Configuration.addProperties() calls, 2) System properties, 3) hibernate.properties file, 4) hibernate.cfg.xml. XML has highest precedence. This allows environment-specific overrides.",
        hint: "Experiment: add same property in both file and code – check which one takes effect.",
        level: "intermediate",
        codeExample: "Configuration config = new Configuration();\nconfig.setProperty(\"hibernate.show_sql\", \"false\"); // overrides file"
    },
    {
        question: "Can I use environment variables inside hibernate.properties?",
        shortAnswer: "Yes, by using placeholder substitution when loading properties programmatically.",
        explanation: "The properties file itself does not natively resolve ${ENV_VAR}. However, you can read the file, replace placeholders using System.getenv(), then pass to Configuration. Hibernate 5+ also supports 'hibernate.connection.username' = '${DB_USER}' with a custom InterpolationHelper.",
        hint: "Look into Spring's PropertyPlaceholderHelper or implement a simple loop.",
        level: "expert",
        codeExample: "String url = System.getenv(\"DB_URL\");\nprops.setProperty(\"hibernate.connection.url\", url);"
    },
    {
        question: "What happens if both hibernate.properties and hibernate.cfg.xml are present?",
        shortAnswer: "XML overrides properties; both are merged but XML takes precedence.",
        explanation: "Hibernate loads the properties file first, then applies XML configuration. Any property defined in XML will replace the value from .properties. This is useful when you want default values in .properties but environment overrides in XML.",
        hint: "Check the logs: 'hibernate.cfg.xml found, overriding properties'.",
        level: "intermediate",
        codeExample: "// If XML has <property name='hibernate.show_sql'>false</property>, it wins."
    },
    {
        question: "How to set Hibernate connection pool using properties file?",
        shortAnswer: "Use provider-specific properties like hibernate.c3p0.* or hibernate.hikari.*.",
        explanation: "Hibernate supports multiple connection pools. For HikariCP (recommended), add: hibernate.hikari.maximumPoolSize=10, hibernate.hikari.idleTimeout=300000. For c3p0, prefix with hibernate.c3p0. The provider JAR must be in classpath.",
        hint: "Most production apps prefer HikariCP due to performance.",
        level: "advanced",
        codeExample: "hibernate.hikari.maximumPoolSize=20\nhibernate.hikari.connectionTimeout=30000"
    },
    {
        question: "Can I use hibernate.properties with JPA (Persistence.createEntityManagerFactory)?",
        shortAnswer: "Not directly; JPA expects persistence.xml, but you can pass properties programmatically.",
        explanation: "JPA's Persistence.createEntityManagerFactory accepts a Map of properties. You can load hibernate.properties and use that map. However, Hibernate-native SessionFactory supports .properties out-of-the-box.",
        hint: "Map<String, Object> props = new Properties(); props.load(...);\nEntityManagerFactory emf = Persistence.createEntityManagerFactory(\"unitName\", props);",
        level: "expert",
        codeExample: "Properties props = new Properties();\nprops.load(getClass().getResourceAsStream(\"/hibernate.properties\"));\nEntityManagerFactory emf = Persistence.createEntityManagerFactory(\"myPU\", props);"
    },
    {
        question: "What is the key property to specify SQL dialect in .properties?",
        shortAnswer: "hibernate.dialect",
        explanation: "Dialects tell Hibernate which SQL variant to generate. Common values: org.hibernate.dialect.PostgreSQLDialect, org.hibernate.dialect.MySQL8Dialect, org.hibernate.dialect.Oracle12cDialect. Missing dialect can cause runtime SQL errors.",
        hint: "Always set dialect explicitly for production, never rely on auto-detection.",
        level: "basic",
        codeExample: "hibernate.dialect=org.hibernate.dialect.H2Dialect"
    },
    {
        question: "How to hide database credentials in hibernate.properties?",
        shortAnswer: "Never commit real credentials. Use externalized configuration (env variables, secrets manager) and inject at runtime.",
        explanation: "Store credentials outside version control. In code, read from environment variables or a secure vault. Build the Properties object programmatically and add to Configuration. Or use a wrapper that decrypts values.",
        hint: "Tools like HashiCorp Vault or AWS Secrets Manager are industry standard.",
        level: "expert",
        codeExample: "String password = System.getenv(\"DB_PASSWORD\");\nprops.setProperty(\"hibernate.connection.password\", password);"
    },
    {
        question: "What does hibernate.hbm2ddl.auto=update do exactly?",
        shortAnswer: "It updates the database schema to match entity mappings without dropping tables.",
        explanation: "The 'update' value alters existing tables (adds columns, constraints) but does not delete columns or tables. It's convenient for development but risky for production because it may cause data loss if columns are renamed. Use 'validate' or migration tools in production.",
        hint: "Never use 'create-drop' in production; that drops schema on SessionFactory shutdown.",
        level: "intermediate",
        codeExample: "hibernate.hbm2ddl.auto=update  // dev only"
    },
    {
        question: "How to enable batch processing using properties file?",
        shortAnswer: "Set hibernate.jdbc.batch_size to a positive integer, e.g., 20.",
        explanation: "Batch size controls number of JDBC statements queued before sending to DB. Also set hibernate.order_inserts=true and hibernate.order_updates=true to improve batching efficiency. For JDBC batch to work, disable identity ID generators if possible.",
        hint: "Measure performance with hibernate.generate_statistics=true.",
        level: "advanced",
        codeExample: "hibernate.jdbc.batch_size=25\nhibernate.order_inserts=true"
    },
    {
        question: "What is the difference between hibernate.show_sql and hibernate.format_sql?",
        shortAnswer: "show_sql prints SQL to console; format_sql pretty-prints it with indentation.",
        explanation: "show_sql=true logs every SQL statement executed. format_sql=true beautifies the output (line breaks, indentation) for readability. Both are for development only; turn off in production for performance and log cleanliness.",
        hint: "Combine with logging category org.hibernate.SQL=DEBUG for more control.",
        level: "basic",
        codeExample: "hibernate.show_sql=true\nhibernate.format_sql=true"
    },
    {
        question: "Can I configure second-level cache via properties file?",
        shortAnswer: "Yes, using hibernate.cache.use_second_level_cache, hibernate.cache.region.factory_class, etc.",
        explanation: "Enable caching: hibernate.cache.use_second_level_cache=true. Choose a provider like EhCache or Redis: set hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory. Also configure TTLs per region.",
        hint: "Don't forget to annotate entities with @Cacheable.",
        level: "advanced",
        codeExample: "hibernate.cache.use_second_level_cache=true\nhibernate.cache.region.factory_class=org.hibernate.cache.ehcache.EhCacheRegionFactory"
    },
    {
        question: "What property controls connection auto-commit behavior?",
        shortAnswer: "hibernate.connection.autocommit",
        explanation: "Default is false (Hibernate manages transactions). Setting to true makes each JDBC statement auto-commit, which breaks Hibernate's transaction boundaries. Only change if you know exactly what you're doing and bypass Hibernate tx.",
        hint: "Almost always keep it false and use session.beginTransaction() / commit().",
        level: "intermediate",
        codeExample: "hibernate.connection.autocommit=false   // recommended"
    },
    {
        question: "How to specify schema name for all tables in properties?",
        shortAnswer: "Use hibernate.default_schema property.",
        explanation: "This sets the default schema/catalog for all tables without annotations. Overridden by @Table(schema=...). Useful for multi-tenant databases or legacy schemas.",
        hint: "Example: hibernate.default_schema=public",
        level: "intermediate",
        codeExample: "hibernate.default_schema=my_schema"
    },
    {
        question: "What is the purpose of hibernate.current_session_context_class?",
        shortAnswer: "It defines how current session is bound to the execution context (thread, JTA, managed).",
        explanation: "Typical value: 'thread' for single-threaded web apps. With this, SessionFactory.getCurrentSession() returns a session bound to the current thread, automatically flushed and closed at transaction end. For JTA in Java EE, use 'jta'.",
        hint: "Pair with transaction boundaries carefully to avoid session leaks.",
        level: "intermediate",
        codeExample: "hibernate.current_session_context_class=thread"
    },
    {
        question: "Can I mix hibernate.properties and programmatic configuration for different environments?",
        shortAnswer: "Yes, load default properties from file then override with environment-specific maps.",
        explanation: "A common pattern: have base.properties, then during build or runtime, load additional properties based on active profile (dev, test, prod). Use Configuration.addProperties() sequentially; later additions override earlier ones.",
        hint: "Spring Boot does this automatically with application-{profile}.properties.",
        level: "expert",
        codeExample: "Configuration cfg = new Configuration();\ncfg.addProperties(defaultProps);\ncfg.addProperties(envProps);"
    },
    {
        question: "What happens if the JDBC driver class is not in classpath but specified in properties?",
        shortAnswer: "Hibernate throws an exception during SessionFactory building: ClassNotFoundException.",
        explanation: "The driver_class property is used to load the JDBC driver via reflection. If the driver JAR is missing or the class name is misspelled, Hibernate cannot create connections. Add the driver dependency (e.g., postgresql-42.x.jar) to the classpath.",
        hint: "For Maven, add <dependency> for the database driver.",
        level: "basic",
        codeExample: "hibernate.connection.driver_class=com.mysql.cj.jdbc.Driver // MySQL 8+"
    },
    {
        question: "How to enable SQL comment generation via properties file?",
        shortAnswer: "Set hibernate.use_sql_comments=true",
        explanation: "When enabled, Hibernate adds comments to the generated SQL explaining which operation triggered it (e.g., '/* load Student */'). Useful for debugging N+1 queries and understanding Hibernate internals. No performance penalty in dev.",
        hint: "Combine with show_sql to see the comments in logs.",
        level: "intermediate",
        codeExample: "hibernate.use_sql_comments=true"
    },
    {
        question: "What does 'hibernate.jdbc.fetch_size' do?",
        shortAnswer: "Suggest the number of rows to fetch from JDBC ResultSet at a time.",
        explanation: "Sets the fetch size hint to the JDBC driver, influencing how many rows are retrieved per network round-trip. Default driver-dependent. Tuning this can reduce memory footprint and speed up large queries. Typical values: 100, 500.",
        hint: "Start with 100 and benchmark.",
        level: "advanced",
        codeExample: "hibernate.jdbc.fetch_size=200"
    },
    {
        question: "Can I specify multiple properties files?",
        shortAnswer: "Not automatically, but you can load multiple files programmatically and merge.",
        explanation: "Hibernate only auto-loads one 'hibernate.properties' from classpath. For multiple files, manually load additional Properties objects and use Configuration.addProperties() for each. Useful for separating secrets from non-sensitive configs.",
        hint: "Put common properties in base file, environment overrides in separate files.",
        level: "expert",
        codeExample: "Properties common = load(\"common.properties\");\nProperties secrets = load(\"secrets.properties\");\ncfg.addProperties(common).addProperties(secrets);"
    },
    {
        question: "How to disable Hibernate's automatic schema validation?",
        shortAnswer: "Set hibernate.hbm2ddl.auto=none or remove the property entirely.",
        explanation: "By default, if you don't specify hbm2ddl.auto, Hibernate does NOT validate or alter schema. To explicitly disable, set to 'none' or 'validate' only if you want checks. Many experienced devs set 'validate' in production to catch mapping errors early.",
        hint: "Using 'update' in production is dangerous; prefer Flyway for schema migrations.",
        level: "intermediate",
        codeExample: "hibernate.hbm2ddl.auto=none"
    },
    {
        question: "What property controls Hibernate's statement logging?",
        shortAnswer: "hibernate.show_sql and logging category org.hibernate.SQL (for more control).",
        explanation: "Beyond show_sql, set logging level for org.hibernate.SQL to DEBUG to see parameters (if combined with org.hibernate.type.descriptor.sql.BasicBinder). Logging framework configuration (log4j, logback) gives more flexibility.",
        hint: "Use P6Spy for production-grade SQL logging.",
        level: "intermediate",
        codeExample: "hibernate.show_sql=false // then in logback.xml: <logger name='org.hibernate.SQL' level='DEBUG'/>"
    },
    {
        question: "Can I use hibernate.properties with Hibernate Reactive?",
        shortAnswer: "Yes, but with reactive pool specific properties (hibernate.vertx.*).",
        explanation: "Hibernate Reactive uses a different connection pool (Vert.x). Properties still work similarly but use 'hibernate.connection.url' remains; however you also need 'hibernate.vertx.pool.size'. Refer to Hibernate Reactive docs.",
        hint: "Reactive requires Mutiny API, not traditional JDBC.",
        level: "expert",
        codeExample: "hibernate.vertx.pool.size=10"
    },
    {
        question: "How to set a custom naming strategy via properties?",
        shortAnswer: "Use hibernate.physical_naming_strategy or hibernate.implicit_naming_strategy.",
        explanation: "Physical naming converts logical names to table/column names (e.g., camelCase to snake_case). Implicit naming handles undecorated names. Popular example: SpringPhysicalNamingStrategy. Provide fully qualified class name.",
        hint: "Default naming strategy is rudimentary; many projects implement custom strategy.",
        level: "advanced",
        codeExample: "hibernate.physical_naming_strategy=org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy"
    },
    {
        question: "What is the property to enable JDBC batching for versioned entities?",
        shortAnswer: "hibernate.jdbc.batch_versioned_data",
        explanation: "By default, Hibernate does not batch updates for entities with version/timestamp (optimistic locking). Set this to true to allow batching of versioned data, improving bulk update performance.",
        hint: "Enabling may cause issues with some databases; test thoroughly.",
        level: "expert",
        codeExample: "hibernate.jdbc.batch_versioned_data=true"
    },
    {
        question: "How to configure connection timeout in properties?",
        shortAnswer: "Via hibernate.connection.timeout or pool-specific properties like hibernate.hikari.connectionTimeout.",
        explanation: "hibernate.connection.timeout is the legacy property in seconds (default 0 = infinite). For HikariCP, use microsecond-precision: hibernate.hikari.connectionTimeout=30000 (30 seconds). Adjust based on network latency and database load.",
        hint: "Too short timeouts cause failed connections in high-load scenarios.",
        level: "intermediate",
        codeExample: "hibernate.hikari.connectionTimeout=30000"
    },
    {
        question: "What is the difference between hibernate.hbm2ddl.auto=create and create-drop?",
        shortAnswer: "create keeps tables after app stops; create-drop drops them on SessionFactory shutdown.",
        explanation: "'create' drops and recreates schema at startup, but leaves tables when JVM exits. 'create-drop' additionally drops all tables when SessionFactory closes (useful for unit tests). Neither is safe for production.",
        hint: "For testing, use create-drop with an in-memory H2 database.",
        level: "basic",
        codeExample: "hibernate.hbm2ddl.auto=create-drop   // test only"
    },
    {
        question: "Can property values be overridden via JVM system properties?",
        shortAnswer: "Yes, JVM -D arguments override hibernate.properties values.",
        explanation: "If you set, e.g., -Dhibernate.connection.url=jdbc:postgresql://localhost/test, Hibernate uses that value. This happens because Hibernate's Configuration constructor merges system properties by default. Useful for Docker containers.",
        hint: "But be careful: both programmatic and system properties override file values.",
        level: "intermediate",
        codeExample: "java -Dhibernate.connection.password=secret -jar myapp.jar"
    },
    {
        question: "How to verify that Hibernate loaded the properties file correctly?",
        shortAnswer: "Enable DEBUG logging for 'org.hibernate.cfg.Environment'.",
        explanation: "Set logging level DEBUG for category org.hibernate.cfg.Environment. Then during bootstrap you'll see lines like 'Loaded properties from hibernate.properties: ...'. Also you can call configuration.getProperties() after building.",
        hint: "In logback.xml: <logger name='org.hibernate.cfg.Environment' level='DEBUG'/>",
        level: "basic",
        codeExample: "// No code, just logging configuration."
    },
    {
        question: "What does 'hibernate.cache.use_query_cache' do?",
        shortAnswer: "Enables caching of query results (in addition to second-level cache).",
        explanation: "Set to true allows caching of HQL/Criteria query results. Requires setting 'hibernate.cache.use_second_level_cache=true' as well. Queries need to be explicitly marked as cacheable via .setCacheable(true)."
    }
];

export default questions;