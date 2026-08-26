/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 15: Read-Only and Write-Only Classes Using Selective Getter/Setter Exposure
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic15_questions = [
  {
    question: "What is a 'Read-Only' class in Java?",
    shortAnswer: "A class that exposes ONLY getter (accessor) methods and provides NO setter (mutator) methods.",
    explanation: "In a read-only class, all fields are initialized during constructor execution or computed lazily. External classes can read the state freely, but have zero mechanisms to mutate it.",
    hint: "Getters provided, setters omitted.",
    level: "Beginner",
    codeExample: "public class ReportCard {\n    private final double score;\n    public ReportCard(double score) { this.score = score; }\n    public double getScore() { return score; } // Read-Only\n}"
  },
  {
    question: "What is a 'Write-Only' class in Java?",
    shortAnswer: "A class that exposes ONLY setter (mutator) methods and provides NO getter (accessor) methods.",
    explanation: "Write-only classes act as ingestion sinks or consumers (e.g. password reset receivers, encrypted log streamers). External code can push data in, but cannot extract or inspect internal state.",
    hint: "Setters provided, getters omitted.",
    level: "Beginner",
    codeExample: "public class LogSink {\n    private StringBuilder buffer = new StringBuilder();\n    public void appendLog(String log) { buffer.append(log); } // Write-Only\n}"
  },
  {
    question: "What is the difference between a 'Read-Only Class' and a 'Truly Immutable Class'?",
    shortAnswer: "A read-only class has no public setters, but its internal state could still be mutated by its own methods or mutable references; an immutable class cannot change at all.",
    explanation: "If a read-only class holds a mutable Date or List and returns it without defensive copying, its state can be modified externally. A truly immutable class (like String) has final fields, a final class, and defensive copies everywhere.",
    hint: "Read-only interface vs unchangeable physical memory.",
    level: "Intermediate",
    codeExample: "// Read-only interface: no setters, but internal state might advance\n// Truly Immutable: class final, all fields final, zero state change"
  },
  {
    question: "What are the 4 main tiers in Mixed Selective Field Exposure?",
    shortAnswer: "1. Read-Only (Id, creation date), 2. Read-Write (Email, address), 3. Write-Only (Password, PIN), 4. Internal-Only (Audit count, lock flags).",
    explanation: "Enterprise domain classes rarely make all fields uniform. Selective exposure tailors access modifiers and getter/setter presence to the exact security and business needs of each field.",
    hint: "Read-Only, Read-Write, Write-Only, and Internal-Only.",
    level: "Intermediate",
    codeExample: "public int getId() { return id; } // Read-Only\npublic void setPassword(String p) { this.hash = hash(p); } // Write-Only"
  },
  {
    question: "How do Java 16+ Records naturally model Read-Only domain data?",
    shortAnswer: "Records automatically generate private final fields, canonical constructor validation, and accessor methods without setters.",
    explanation: "Records provide built-in read-only data carriers with zero boilerplate, ensuring properties cannot be modified after construction.",
    hint: "Built-in read-only data carriers in Java 16+.",
    level: "Beginner",
    codeExample: "public record TransactionReceipt(long txnId, double amountInr) {}"
  },
  {
    question: "Why should write-only password ingesters never store raw plaintext passwords in internal fields?",
    shortAnswer: "Because plaintext strings in Heap memory persist until garbage collected and can be extracted from memory dumps.",
    explanation: "Write-only setters should hash the password immediately upon ingestion (using SHA-256 or bcrypt) and overwrite or discard the temporary plaintext reference.",
    hint: "Hash immediately upon ingestion; discard plaintext.",
    level: "Intermediate",
    codeExample: "public void setPassword(String raw) { this.hash = computeHash(raw); }"
  },
  {
    question: "Can a Read-Only class have private mutator methods?",
    shortAnswer: "Yes! Internal private methods or background event listeners can update internal caches while keeping the public API strictly read-only.",
    explanation: "A class might be read-only to external callers, but internally refresh a cached stock price or calculation index.",
    hint: "Read-only to the public; mutable internally.",
    level: "Intermediate",
    codeExample: "private void refreshCache() { this.cachedVal = compute(); }"
  },
  {
    question: "How does Jackson JSON Serializer handle a Write-Only property annotated with '@JsonProperty(access = Access.WRITE_ONLY)'?",
    shortAnswer: "Jackson deserializes JSON into the property via the setter during HTTP POST/PUT, but NEVER includes the property in outgoing JSON responses.",
    explanation: "This allows client apps to send passwords or credit card CVVs into the API without Jackson accidentally returning the secret in GET responses.",
    hint: "Jackson WRITE_ONLY access property.",
    level: "Advanced",
    codeExample: "@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)\nprivate String password;"
  },
  {
    question: "What is the 'Snapshot Pattern' and how does it use Read-Only classes?",
    shortAnswer: "Capturing the state of a mutable entity at a specific point in time as an immutable, read-only snapshot object.",
    explanation: "A mutable BankAccount creates an immutable 'AccountStatementSnapshot' for the month. Callers can inspect the snapshot without any risk of affecting the active account.",
    hint: "Immutable point-in-time state capture.",
    level: "Intermediate",
    codeExample: "public AccountSnapshot takeSnapshot() { return new AccountSnapshot(this.id, this.balance); }"
  },
  {
    question: "Why is declaring a Read-Only class 'final' recommended for thread safety and immutability?",
    shortAnswer: "It prevents malicious subclasses from overriding getters or adding mutable fields that break the immutable contract.",
    explanation: "If a read-only class is non-final, a subclass could add setters and mutable state, allowing child instances to masquerade as immutable parents.",
    hint: "Final classes prevent subclass mutability breaches.",
    level: "Intermediate",
    codeExample: "public final class FinancialSnapshot { /* Immutable & unextendable */ }"
  },
  {
    question: "What is a 'Virtual Read-Only Property'?",
    shortAnswer: "A getter that returns a dynamically computed value on the fly without any underlying backing field (e.g. 'getAggregatePercentage()').",
    explanation: "Virtual read-only properties derive their values from other fields at invocation time, guaranteeing that calculated values are always fresh and consistent.",
    hint: "Calculated getter without a dedicated field.",
    level: "Beginner",
    codeExample: "public double getAggregate() { return (math + science) / 2.0; }"
  },
  {
    question: "Can a Write-Only class provide a verification method (e.g. 'verifyMatch(candidate)')?",
    shortAnswer: "Yes! A write-only class can verify candidate inputs against its internal state without ever revealing the stored secret.",
    explanation: "A verifier method takes a candidate password, hashes it, compares it with the stored hash, and returns boolean true/false—preserving complete data confidentiality.",
    hint: "Boolean verification without state exposure.",
    level: "Beginner",
    codeExample: "public boolean verifyPin(String candidate) { return hash.equals(hash(candidate)); }"
  },
  {
    question: "Why should read-only classes containing collection fields use 'Collections.unmodifiableList()'?",
    shortAnswer: "Because omitting setters is not enough; if a getter returns the raw List reference, external code can call list.add() and mutate internal state.",
    explanation: "A class without setters is not read-only if its getter leaks mutable collections. Wrapping with 'Collections.unmodifiableList()' enforces true read-only behavior.",
    hint: "Wrap collections in read-only armor.",
    level: "Intermediate",
    codeExample: "public List<String> getSkills() { return Collections.unmodifiableList(skills); }"
  },
  {
    question: "What is an 'Audit Sinkhole' in enterprise architecture and how does it use Write-Only design?",
    shortAnswer: "A security component that accepts compliance logs, signs them cryptographically, and writes them to write-once storage without allowing log reads.",
    explanation: "Write-only audit loggers prevent compromised microservices from tampering with or reading previous audit events, creating a secure append-only audit sink.",
    hint: "Append-only security log ingestion.",
    level: "Advanced",
    codeExample: "public class ComplianceAuditSink { public void appendAudit(String msg) { writeToWorm(msg); } }"
  },
  {
    question: "How does the 'final' keyword on fields reinforce a Read-Only class?",
    shortAnswer: "It ensures the field pointer cannot be modified after constructor completion, guaranteeing memory visibility and thread safety across threads.",
    explanation: "Final fields have special memory model guarantees in the JVM (JSR-133), ensuring all threads see initialized values without synchronization.",
    hint: "JVM memory model guarantees for final fields.",
    level: "Intermediate",
    codeExample: "private final int rollNumber; // Immutable once assigned in constructor"
  },
  {
    question: "Can a JavaBean specification bean be purely Read-Only?",
    shortAnswer: "Yes, the JavaBeans spec supports read-only properties by simply declaring getters without corresponding setters.",
    explanation: "PropertyDescriptor in Java Introspector marks a property as read-only if 'getWriteMethod()' returns null while 'getReadMethod()' is present.",
    hint: "ReadMethod present, WriteMethod null.",
    level: "Intermediate",
    codeExample: "// Introspector discovers read-only property when write method is absent"
  },
  {
    question: "What is the danger of returning 'this' from a Read-Only method?",
    shortAnswer: "None, provided the object has no mutating methods; fluent read-only query pipelines frequently return 'this' or new transformed instances.",
    explanation: "In read-only classes, methods returning 'this' or new instances enable fluent transformation pipelines (e.g. 'report.withFilter().format()').",
    hint: "Fluent queries on immutable state.",
    level: "Beginner",
    codeExample: "public ReportCard filterPassed() { return this; }"
  },
  {
    question: "Why should read-only classes avoid generating hashCode() from mutable external references?",
    shortAnswer: "Because if an external object mutates, the read-only object's hash code changes, corrupting its position in HashMaps and HashSets.",
    explanation: "Read-only classes must compute hashCode and equals strictly from immutable primitive fields or immutable components.",
    hint: "Hash consistency requires immutable components.",
    level: "Advanced",
    codeExample: "public int hashCode() { return Objects.hash(studentRollNumber, studentFullName); }"
  },
  {
    question: "What is 'Selective Serialization' and how does it relate to Write-Only fields?",
    shortAnswer: "Marking write-only fields with 'transient' or excluding them from serialization so sensitive ingested data is never written to disk or network.",
    explanation: "Fields like 'private transient String pinHash;' ensure write-only credentials are never serialized into sessions or caching clusters.",
    hint: "Transient modifier prevents write-only fields from serializing.",
    level: "Intermediate",
    codeExample: "private transient String paymentPinHash;"
  },
  {
    question: "Can an interface enforce a Read-Only contract on implementing classes?",
    shortAnswer: "Yes! By declaring only getter methods in the interface, callers interacting via the interface can only read data.",
    explanation: "Declaring 'public interface ReadableStudent { int getRoll(); String getName(); }' forces callers to treat the object as read-only, even if the concrete class has package-private setters.",
    hint: "Interface-segregated read-only view.",
    level: "Intermediate",
    codeExample: "public interface ReadOnlyStudent { int getRoll(); String getName(); }\nclass Student implements ReadOnlyStudent { /* Has internal setters */ }"
  },
  {
    question: "What is 'Defensive Copying on Construction' in a Read-Only class?",
    shortAnswer: "Cloning or copying mutable arguments passed into the constructor to prevent the caller from retaining a backdoor alias to internal state.",
    explanation: "If a caller passes a 'Date' or 'int[]' into a read-only constructor, writing 'this.date = new Date(d.getTime());' breaks the caller's reference.",
    hint: "Never trust external references in immutable constructors.",
    level: "Intermediate",
    codeExample: "public ReadOnlyData(int[] arr) { this.data = arr.clone(); }"
  },
  {
    question: "Why do configuration classes in microservices (e.g. @ConfigurationProperties) often use Read-Only designs in production?",
    shortAnswer: "To prevent application threads from accidentally mutating configuration settings (e.g. database URLs, timeout thresholds) at runtime.",
    explanation: "Immutable configuration beans initialized during startup guarantee that all worker threads read consistent, tamper-proof settings.",
    hint: "Immutable configuration guarantees thread safety.",
    level: "Intermediate",
    codeExample: "public final class DatabaseConfig { private final String url; public String getUrl() { return url; } }"
  },
  {
    question: "Can a Write-Only class be used to implement the 'Builder Pattern'?",
    shortAnswer: "Yes! A Builder starts as a write-only accumulator (only setters/fluent withers), and finally produces a read-only target object via build().",
    explanation: "The builder collects configuration through mutators, and seals the state into an immutable target object upon calling 'build()'.",
    hint: "Write-only accumulator building a read-only result.",
    level: "Intermediate",
    codeExample: "ReportCard card = ReportCard.builder().setRoll(101).setName(\"Swadeep\").build();"
  },
  {
    question: "What is 'Lazy Evaluation' in a Read-Only class?",
    shortAnswer: "Computing an expensive read-only property only when its getter is called for the first time, and caching it in a private field.",
    explanation: "If calculating aggregate statistics is CPU-intensive, the getter computes it on demand and caches the result for future calls.",
    hint: "Compute once on demand, cache forever.",
    level: "Intermediate",
    codeExample: "public double getGpa() {\n    if (cachedGpa == 0.0) cachedGpa = computeGpa();\n    return cachedGpa;\n}"
  },
  {
    question: "How does the 'Command Pattern' use Write-Only parameter setting?",
    shortAnswer: "Command objects receive parameters via setters or constructors and expose an 'execute()' method without revealing parameter getters.",
    explanation: "The command encapsulates the action and its arguments, executing the operation autonomously when triggered.",
    hint: "Encapsulate parameters, execute action.",
    level: "Advanced",
    codeExample: "public class SendFeeAlertCommand { public void setRecipient(String r) { ... } public void execute() { ... } }"
  },
  {
    question: "What is 'Field-Level Access Control' in security architectures?",
    shortAnswer: "Enforcing distinct read, write, and hidden permissions for individual fields within the same domain entity.",
    explanation: "In an employee record, 'id' is read-only for all; 'salary' is read-write for HR only; 'ssn' is write-only upon hiring; 'performanceRating' is internal.",
    hint: "Granular access policy per domain field.",
    level: "Advanced",
    codeExample: "// Mixed field security policy in SelectiveExposureStudentProfile"
  },
  {
    question: "Can a read-only class implement the 'Comparable' interface?",
    shortAnswer: "Yes! Read-only classes are ideal candidates for Comparable because their natural ordering never changes over time.",
    explanation: "Implementing 'compareTo()' on immutable fields (like rollNumber or timestamp) guarantees stable sorting behavior in TreeSets and sorted lists.",
    hint: "Stable sorting on immutable natural keys.",
    level: "Beginner",
    codeExample: "public final class Student implements Comparable<Student> {\n    public int compareTo(Student o) { return Integer.compare(this.roll, o.roll); }\n}"
  },
  {
    question: "Why should write-only setters avoid returning the written value?",
    shortAnswer: "Returning the value turns the setter into a getter-hybrid, violating write-only encapsulation.",
    explanation: "A write-only setter should return 'void' (or 'this' for fluent builders) without echoing back the secret argument.",
    hint: "Do not echo back ingested secrets.",
    level: "Beginner",
    codeExample: "public void setPin(String pin) { this.hash = hash(pin); } // Returns void"
  },
  {
    question: "What is 'Copy-on-Write' in immutable and read-only data structures?",
    shortAnswer: "Instead of modifying an existing read-only object, a mutator returns a BRAND NEW read-only instance with the updated value.",
    explanation: "Like String.replace() or java.time.LocalDate.plusDays(), copy-on-write preserves the original instance while returning a fresh modified copy.",
    hint: "Return a new instance on modification.",
    level: "Intermediate",
    codeExample: "public ReportCard withSpringMarks(double m) {\n    return new ReportCard(this.roll, this.name, this.branch, this.java, m, this.cloud);\n}"
  },
  {
    question: "What is Sukanta Hui's One-Way Mirror Analogy for Selective Exposure at the Barrackpore Academy?",
    shortAnswer: "A read-only class is a museum showcase (look, don't touch); a write-only class is a ballot box (drop your vote in, no one can pull it back out); a hybrid profile is a smart bank account with distinct windows for every operation.",
    explanation: "At the Barrackpore academy, Sukanta Hui teaches that master architects never give blanket read/write access to everything. By designing museum showcases (read-only), ballot boxes (write-only), and hybrid windows, your domain objects enforce airtight security and flawless data integrity.",
    hint: "Showcase (read-only), Ballot Box (write-only), Bank Teller (hybrid).",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Triple Pattern: Museum Showcase (Read-Only) | Ballot Box (Write-Only) | Hybrid Profile"
  }
];

export default topic15_questions;
