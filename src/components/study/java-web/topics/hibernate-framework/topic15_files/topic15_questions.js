const questions = [
  {
    question: "What is hbm2ddl in Hibernate?",
    shortAnswer: "A tool that generates database schema from entity mappings (forward engineering).",
    explanation: "hbm2ddl (Hibernate Mapping to Data Definition Language) reads entity classes or XML mappings and produces SQL DDL statements to create/update tables. It can be run via the hbm2ddl.auto property or as a standalone tool.",
    hint: "Use 'validate' in production to check schema without changes.",
    level: "basic",
    codeExample: "hibernate.hbm2ddl.auto=update"
  },
  {
    question: "What does the hbm2ddl.auto value 'update' do?",
    shortAnswer: "Alters existing database schema to match entity mappings without dropping tables.",
    explanation: "The 'update' operation adds new columns or constraints but never removes existing ones. It's safe for development but can lead to schema drift. Cannot handle column renames or type changes.",
    hint: "For production schema migrations, use dedicated tools like Flyway.",
    level: "intermediate",
    codeExample: "hibernate.hbm2ddl.auto=update"
  },
  {
    question: "What is reverse engineering in Hibernate Tools?",
    shortAnswer: "Generating Hibernate entity classes and mapping files from an existing database schema.",
    explanation: "Reverse engineering reads database metadata (tables, columns, foreign keys) and creates annotated Java classes or XML mapping files. It's ideal for working with legacy databases or speeding up initial development.",
    hint: "Use hibernate.reveng.xml to customize the generation (e.g., exclude tables).",
    level: "basic",
    codeExample: "hbm2java -cfg hibernate.cfg.xml -reveng hibernate.reveng.xml -output src/"
  },
  {
    question: "How do I configure Hibernate Tools for reverse engineering?",
    shortAnswer: "Create a hibernate.reveng.xml file with table selection, type mappings, and customizations.",
    explanation: "The reveng.xml file controls which tables to include/exclude, how to map SQL types to Java types, and special column handling (e.g., primary key generation strategy). You also need a Hibernate configuration file with database connection details.",
    hint: "Place reveng.xml and hibernate.cfg.xml in the classpath.",
    level: "intermediate",
    codeExample: "<table name=\"STUDENT\" class=\"com.school.Student\"> <column name=\"FULL_NAME\" property=\"name\"/> </table>"
  },
  {
    question: "What is the difference between hbm2java and hbm2ddl?",
    shortAnswer: "hbm2java generates Java code from a database; hbm2ddl generates SQL from Java entities.",
    explanation: "hbm2java is a reverse engineering tool: database → Java. hbm2ddl is forward engineering: Java mappings → SQL. Both are part of the Hibernate Tools suite.",
    hint: "Use hbm2java when you have an existing database; use hbm2ddl when you start with entities.",
    level: "basic",
    codeExample: "hbm2java → create Student.java; hbm2ddl → create CREATE TABLE student (...) ;"
  },
  {
    question: "Can hbm2ddl generate a drop script instead of create?",
    shortAnswer: "Yes, use the '--drop' option or set hbm2ddl.auto=create to drop first, then create.",
    explanation: "The SchemaExport tool can generate separate drop and create scripts. The 'drop' option outputs DROP TABLE statements, while 'create' outputs CREATE TABLE. In hibernate.cfg.xml, set hbm2ddl.auto=create-drop to drop schema on SessionFactory shutdown.",
    hint: "Generate scripts to file with hbm2ddl.import_files and SchemaExport --output.",
    level: "intermediate",
    codeExample: "java -cp ... org.hibernate.tool.hbm2ddl.SchemaExport --config=hibernate.cfg.xml --drop --output=drop.sql"
  },
  {
    question: "How do I exclude certain tables during reverse engineering?",
    shortAnswer: "Use <table exclude=\"true\"/> in hibernate.reveng.xml.",
    explanation: "Add <table name=\"AUDIT_LOG\" exclude=\"true\"/> to prevent generating entities for logs, temp tables, or other unwanted tables. You can also use pattern matching with match-schema and match-table.",
    hint: "Exclude tables that are not needed to keep your code clean.",
    level: "intermediate",
    codeExample: "<schema-selection match-table=\"^(?!TEMP_).*\"/> <!-- exclude tables starting with TEMP_ -->"
  },
  {
    question: "What is the purpose of hibernate.reveng.xml column type mapping?",
    shortAnswer: "To map database-specific column types to Hibernate types or Java classes.",
    explanation: "For example, a TINYINT(1) column can be mapped to 'boolean' instead of 'byte'. Type mapping improves generated entity code readability. This is done via <type-mapping> and <sql-type> elements.",
    hint: "Useful for databases with non-standard types (e.g., PostgreSQL JSON).",
    level: "advanced",
    codeExample: "<sql-type jdbc-type=\"BIT\" hibernate-type=\"boolean\"/>"
  },
  {
    question: "How do I run Hibernate Tools from Maven?",
    shortAnswer: "Use the hibernate3-maven-plugin or the more up-to-date hibernate-tools-maven-plugin.",
    explanation: "Add the plugin to your pom.xml, configure the goals (hbm2java, hbm2ddl, etc.), and run 'mvn hibernate3:hbm2java'. The plugin uses your hibernate.cfg.xml and reveng.xml.",
    hint: "In modern projects, consider using JPA's schema generation (jakarta.persistence.schema-generation) instead.",
    level: "advanced",
    codeExample: "<plugin><groupId>org.codehaus.mojo</groupId><artifactId>hibernate3-maven-plugin</artifactId>...</plugin>"
  },
  {
    question: "Can Hibernate Tools generate JPA annotations instead of XML mappings?",
    shortAnswer: "Yes, with reverse engineering you can output annotated Java entities directly.",
    explanation: "Set 'jdk5='true' and 'ejb3='true' in the hbm2java configuration. The tool will generate @Entity, @Table, @Column annotations instead of .hbm.xml files.",
    hint: "This is the preferred way for modern applications.",
    level: "advanced",
    codeExample: "<property name=\"jdk5\">true</property> <property name=\"ejb3\">true</property>"
  },
  {
    question: "What is the difference between 'create' and 'create-drop' for hbm2ddl.auto?",
    shortAnswer: "'create' drops and recreates schema at startup; 'create-drop' additionally drops schema when SessionFactory closes.",
    explanation: "'create' leaves tables after app shutdown. 'create-drop' is useful for unit tests: schema is created, used, then dropped, leaving no residue. Both are unsafe for production.",
    hint: "During development, 'create-drop' with an in-memory database (H2) is convenient.",
    level: "basic",
    codeExample: "hibernate.hbm2ddl.auto=create-drop"
  },
  {
    question: "How do I customize the class name generated by reverse engineering?",
    shortAnswer: "Use the <table name=\"DB_TABLE\" class=\"MyEntity\"/> attribute in reveng.xml.",
    explanation: "By default, table 'STUDENT_MASTER' becomes class 'StudentMaster'. To override, provide the 'class' attribute. You can also add a <schema-selection> pattern to change naming strategy globally.",
    hint: "Keep generated class names consistent with your project's naming conventions.",
    level: "intermediate",
    codeExample: "<table name=\"STDNT\" class=\"Student\"/>"
  },
  {
    question: "What is the Hibernate Tools Eclipse plugin?",
    shortAnswer: "An IDE plugin that provides reverse engineering wizards, HQL editor, and mapping diagrams.",
    explanation: "The plugin (part of JBoss Tools) allows you to connect to a database, generate entities with a few clicks, and test HQL queries interactively. It also supports mapping visualization.",
    hint: "IntelliJ IDEA has similar features via JPA Buddy or built-in persistence tools.",
    level: "intermediate",
    codeExample: "Install from Eclipse Marketplace: 'Hibernate Tools'"
  },
  {
    question: "How do I generate DAO classes using Hibernate Tools?",
    shortAnswer: "Use the 'hbm2dao' component (often via Ant or Maven) with a custom template.",
    explanation: "Hibernate Tools includes a built-in DAO generator that outputs basic CRUD methods. You can customize the velocity templates to match your coding style.",
    hint: "Many developers prefer to generate only entities and write DAOs manually or use Spring Data JPA.",
    level: "advanced",
    codeExample: "<component name=\"hbm2dao\" outputDirectory=\"src/main/java\"/>"
  },
  {
    question: "What is the purpose of the 'hbm2doc' tool?",
    shortAnswer: "Generates HTML documentation of your Hibernate mappings.",
    explanation: "hbm2doc reads mapping files and produces a browsable HTML report showing entity relationships, properties, and database schema. Useful for understanding complex ORM models.",
    hint: "Outdated in many projects; use Javadoc + annotations instead.",
    level: "expert",
    codeExample: "hbm2doc --input=mappings/ --output=docs/"
  },
  {
    question: "Can I reverse engineer to Kotlin or other JVM languages?",
    shortAnswer: "Not directly with Hibernate Tools, but you can post-process Java code or use other tools.",
    explanation: "Hibernate Tools generates Java only. You can use Java-to-Kotlin converters or write your own post-processor. Alternatively, use IntelliJ's JPA Buddy which supports Kotlin.",
    hint: "For Kotlin, consider using exposed ORM or Ktorm instead of Hibernate.",
    level: "expert",
    codeExample: "// Not supported out of the box"
  },
  {
    question: "How do I test if hbm2ddl validation passes?",
    shortAnswer: "Set hbm2ddl.auto=validate and run your application; if mismatches exist, Hibernate throws SchemaValidationException.",
    explanation: "Validation checks that database schema matches entities: column names, types, constraints. It does not modify the database. The exception includes details of the mismatch.",
    hint: "Run this as part of your CI pipeline to catch schema drift.",
    level: "intermediate",
    codeExample: "hibernate.hbm2ddl.auto=validate"
  },
  {
    question: "What is the difference between hbm2ddl and Flyway/Liquibase?",
    shortAnswer: "hbm2ddl is for simple schema generation; Flyway/Liquibase are for versioned schema migrations.",
    explanation: "hbm2ddl cannot handle migrations like renaming columns or splitting tables without data loss. Flyway scripts are explicit and version-controlled, allowing safe incremental updates.",
    hint: "Use hbm2ddl only for development; use Flyway in production.",
    level: "advanced",
    codeExample: "// No code example"
  },
  {
    question: "How do I generate Hibernate XML mappings from an existing database using command line?",
    shortAnswer: "Use the 'hbm2hbmxml' Ant task or the org.hibernate.tool.hbm2x.HibernateMappingTool class.",
    explanation: "Similar to hbm2java, but produces .hbm.xml files instead of annotations. The command line class is org.hibernate.tool.hbm2x.HibernateMappingTool.",
    hint: "Annotations are preferred over XML; use this only for legacy projects.",
    level: "advanced",
    codeExample: "java -cp hibernate-tools.jar org.hibernate.tool.hbm2x.HibernateMappingTool --config=hibernate.cfg.xml --reveng=hibernate.reveng.xml"
  },
  {
    question: "Can I use hbm2ddl with JPA-only projects (no Hibernate mapping files)?",
    shortAnswer: "Yes, if you use Hibernate as the JPA provider, hbm2ddl works with @Entity annotations.",
    explanation: "Hibernate's schema generation tool reads JPA annotations from entity classes. You don't need XML mappings. Just point the tool to your entity package.",
    hint: "Set 'hibernate.archive.autodetection' to scan classes.",
    level: "basic",
    codeExample: "<property name=\"hibernate.archive.autodetection\" value=\"class\"/>"
  },
  {
    question: "What is the purpose of the 'hibernate.id.new_generator_mappings' property?",
    shortAnswer: "Switches between legacy Hibernate ID generators and JPA 2.0-compliant ones during schema generation.",
    explanation: "When generating DDL, this property affects the generated primary key column definition. Modern applications should set it to true for better spec compliance.",
    hint: "Set to true for new projects.",
    level: "intermediate",
    codeExample: "hibernate.id.new_generator_mappings=true"
  },
  {
    question: "How do I generate only specific tables during reverse engineering?",
    shortAnswer: "Use <include-table> or schema-selection.match-table with a regex.",
    explanation: "In hibernate.reveng.xml, specify <schema-selection match-table=\"STUDENT|COURSE\"/>. Omitted tables are ignored. Alternatively, list multiple <table> elements without exclude.",
    hint: "This prevents generating hundreds of entities from a large schema.",
    level: "intermediate",
    codeExample: "<schema-selection match-table=\"USER|ORDER\"/>"
  },
  {
    question: "What is the 'hibernate.hbm2ddl.import_files' property?",
    shortAnswer: "Specifies an SQL script to run after schema creation, e.g., to insert initial data.",
    explanation: "Hibernate executes the SQL file (from classpath) after generating schema. Useful for seeding development data. Multiple files can be separated by commas.",
    hint: "File format: each SQL statement separated by semicolons or line breaks.",
    level: "intermediate",
    codeExample: "hibernate.hbm2ddl.import_files=import.sql,data.sql"
  },
  {
    question: "How does Hibernate Tools handle inheritance mapping during reverse engineering?",
    shortAnswer: "It does not automatically detect inheritance; you must manually define inheritance after generation.",
    explanation: "Reverse engineering cannot infer polymorphic relationships from foreign keys alone. You'll get separate tables with no inheritance. You must refactor generated classes or add inheritance mapping manually.",
    hint: "Use a DTO pattern or manually adjust the generated entities.",
    level: "expert",
    codeExample: "// Not automatic, requires manual @Inheritance(strategy=...)"
  },
  {
    question: "Can I run Hibernate Tools from Gradle?",
    shortAnswer: "Yes, using the gradle-hibernate-plugin or by invoking Ant tasks from Gradle.",
    explanation: "Although not officially supported, community plugins exist. Alternatively, you can write a Gradle task that executes the Hibernate Tools Ant task using Gradle's Ant integration.",
    hint: "Consider using JPA's schema generation for new Gradle projects.",
    level: "advanced",
    codeExample: "task hbm2java(type: JavaExec) { ... }"
  },
  {
    question: "What is the difference between SchemaExport and SchemaUpdate?",
    shortAnswer: "SchemaExport generates full DDL; SchemaUpdate applies incremental changes to existing schema.",
    explanation: "SchemaExport creates CREATE and DROP scripts. SchemaUpdate compares current schema with mappings and generates ALTER statements. SchemaUpdate is used when hbm2ddl.auto=update.",
    hint: "SchemaUpdate cannot drop columns or change types; use migration tools for that.",
    level: "intermediate",
    codeExample: "new SchemaUpdate(configuration).execute(true, true);"
  },
  {
    question: "How do I set a custom naming strategy for reverse engineering?",
    shortAnswer: "Implement your own NamingStrategy and pass it to Configuration.",
    explanation: "For reverse engineering (hbm2java), you can provide a custom NamingStrategy to control how table/column names map to class/property names. This requires extending DelegatingReverseEngineeringStrategy.",
    hint: "Complex; often easier to post-process with a script.",
    level: "expert",
    codeExample: "revEng.setReverseEngineeringStrategy(new CustomStrategy(revEng));"
  },
  {
    question: "What is the Hibernate Console in Eclipse?",
    shortAnswer: "A perspective in Eclipse that allows interactive HQL/JPA queries against a running database using Hibernate.",
    explanation: "You can open a Hibernate Console configuration, connect to your database, write HQL queries, and see results instantly. It also shows generated SQL and execution times.",
    hint: "Great for learning HQL and debugging queries.",
    level: "intermediate",
    codeExample: "// No code, open Hibernate Console view in Eclipse"
  },
  {
    question: "Is it safe to commit generated entity classes to version control?",
    shortAnswer: "Yes, but treat them as read-only; avoid manual modifications to regenerated sections.",
    explanation: "If you need to customize, use a separate subclass or add non-persistent methods. Or use a template that includes custom code sections. Regeneration will overwrite manual changes.",
    hint: "Use JPA annotations and run reverse engineering only occasionally.",
    level: "basic",
    codeExample: "// Generated class example"
  },
  {
    question: "How do I add Javadoc comments to reverse engineered entities?",
    shortAnswer: "Use a custom velocity template, or add the 'meta' tag in reveng.xml for table/column comments.",
    explanation: "Add <meta attribute=\"class-description\">Student details</meta> inside table element. This string appears as Javadoc in the generated class. For columns, use <column> with <comment>.",
    hint: "Database comments can also be read if you set 'use-existing-comments' to true.",
    level: "advanced",
    codeExample: "<meta attribute=\"class-description\">Represents a registered student</meta>"
  }
];

export default questions;