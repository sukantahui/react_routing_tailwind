/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 14: Adding Business Validation Logic Inside Setters to Protect Object Integrity
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic14_questions = [
  {
    question: "Why should setters contain business validation logic instead of blindly assigning parameters?",
    shortAnswer: "To protect object invariants, reject corrupted/malicious inputs, and guarantee that the object is always in a mathematically and logically valid state.",
    explanation: "External callers (REST controllers, UI forms, database parsers) can pass invalid data (e.g. negative prices, null names). Validating at the setter gate stops bad data from corrupting system memory.",
    hint: "Setters guard internal domain invariants against invalid external inputs.",
    level: "Beginner",
    codeExample: "public void setAge(int age) {\n    if (age < 0 || age > 120) throw new IllegalArgumentException(\"Invalid age: \" + age);\n    this.age = age;\n}"
  },
  {
    question: "Which standard Java exception should be thrown when a setter argument is invalid?",
    shortAnswer: "IllegalArgumentException (for bad arguments) and NullPointerException (for null arguments).",
    explanation: "Standard Java API design specifies throwing IllegalArgumentException (an unchecked RuntimeException) when a parameter violates domain constraints, and NullPointerException (or via Objects.requireNonNull) when a mandatory argument is null.",
    hint: "IllegalArgumentException for invalid values; NullPointerException for nulls.",
    level: "Beginner",
    codeExample: "Objects.requireNonNull(name, \"Name cannot be null\");\nif (name.isBlank()) throw new IllegalArgumentException(\"Name cannot be blank\");"
  },
  {
    question: "What is 'Input Sanitization / Normalization' inside a setter method?",
    shortAnswer: "Cleaning and standardizing input data (e.g. trimming whitespace, converting email to lowercase, removing punctuation) BEFORE validation and assignment.",
    explanation: "Sanitization removes extraneous characters (e.g. turning '+91 98301 23456' into '9830123456' or '  SWADEEP@GMAIL.COM ' into 'swadeep@gmail.com') to ensure consistent storage representation.",
    hint: "Clean data before validating and storing.",
    level: "Intermediate",
    codeExample: "this.email = email.trim().toLowerCase();"
  },
  {
    question: "Why should constructors delegate to setter methods for initialization?",
    shortAnswer: "To reuse validation logic in one single source of truth, avoiding duplicate validation code between constructors and setters.",
    explanation: "If a constructor writes 'setAge(age);' instead of 'this.age = age;', any change to age validation rules is automatically enforced across both construction and subsequent updates.",
    hint: "DRY (Don't Repeat Yourself) principle for invariant validation.",
    level: "Intermediate",
    codeExample: "public Student(int roll, String name) {\n    setRoll(roll); // Reuses setter validation\n    setName(name);\n}"
  },
  {
    question: "When should an 'IllegalStateException' be thrown from a setter instead of 'IllegalArgumentException'?",
    shortAnswer: "When the parameter itself is valid, but the object's CURRENT STATE prevents the mutation (e.g. modifying an account that has already been closed).",
    explanation: "IllegalArgumentException means 'the argument you gave me is bad'; IllegalStateException means 'the object is currently in a state where this operation is forbidden'.",
    hint: "Bad argument vs Bad object state.",
    level: "Intermediate",
    codeExample: "if (\"GRADUATED\".equals(this.status)) {\n    throw new IllegalStateException(\"Cannot modify record of a graduated student!\");\n}"
  },
  {
    question: "What is a 'Cross-Field Invariant' and how is it validated in a setter?",
    shortAnswer: "A business rule that depends on the relationship between two or more fields (e.g. 'discountPercentage > 0 requires entranceScore >= 75.0%').",
    explanation: "Some validations cannot be evaluated in isolation. A setter must check the incoming parameter against existing instance fields to ensure cross-field consistency.",
    hint: "Validating one field in relation to another field.",
    level: "Intermediate",
    codeExample: "public void setDiscount(double d) {\n    if (d > 0 && this.score < 75.0) throw new IllegalStateException(\"Score too low for discount\");\n    this.discount = d;\n}"
  },
  {
    question: "Why is 'Objects.requireNonNull(arg, message)' preferred over manual 'if (arg == null)' checks?",
    shortAnswer: "It is concise, standard in Java 7+, throws NullPointerException with a clear informative message, and enables fast JIT inlining.",
    explanation: "Objects.requireNonNull expresses developer intent directly in one clean line and returns the checked object, allowing fluent assignment: 'this.name = Objects.requireNonNull(name, \"Name required\");'.",
    hint: "Standard, concise, fluent null defense.",
    level: "Beginner",
    codeExample: "this.studentName = Objects.requireNonNull(name, \"Student name is required\");"
  },
  {
    question: "How does precompiling regex 'Pattern' objects improve setter validation performance?",
    shortAnswer: "Creating 'private static final Pattern PATTERN = Pattern.compile(\"...\")' compiles the regex state machine ONCE at class loading rather than re-compiling it on every setter call.",
    explanation: "Using 'String.matches()' compiles a new Pattern object on every single invocation, which creates CPU overhead in high-throughput applications. A static final Pattern executes in microseconds.",
    hint: "Compile regex once statically; reuse matches() across all calls.",
    level: "Intermediate",
    codeExample: "private static final Pattern PHONE_PAT = Pattern.compile(\"^[6-9]\\\\d{9}$\");\npublic void setPhone(String p) { if (!PHONE_PAT.matcher(p).matches()) throw ...; }"
  },
  {
    question: "What is the 'Fail-Fast' principle in setter validation?",
    shortAnswer: "Aborting immediately with an exception at the exact moment bad data enters the setter, rather than storing bad data and failing silently later.",
    explanation: "Failing fast stops corruption at the gate. If a negative price is accepted silently, errors might surface hours later in billing calculations where debugging is 100x harder.",
    hint: "Reject invalid inputs immediately at the point of entry.",
    level: "Beginner",
    codeExample: "if (price < 0) throw new IllegalArgumentException(\"Price cannot be negative: \" + price);"
  },
  {
    question: "Why should setters avoid swallowing errors silently (e.g. logging and continuing without updating)?",
    shortAnswer: "Because the caller assumes the mutation succeeded, leading to subtle bugs where caller and object hold divergent state expectations.",
    explanation: "If 'setFee(-500)' just prints a message without updating or throwing, the caller believes the fee was set to -500 while the object quietly retained its old value. Throwing an exception alerts the caller to failure.",
    hint: "Never fail silently in domain mutators.",
    level: "Intermediate",
    codeExample: "// BAD: if (fee < 0) return; // Silent failure!\n// GOOD: if (fee < 0) throw new IllegalArgumentException(\"Invalid fee: \" + fee);"
  },
  {
    question: "What is 'String.isBlank()' (Java 11+) and why is it superior to 'String.isEmpty()' in setter validation?",
    shortAnswer: "'isBlank()' checks if the string is empty OR contains only whitespace characters, whereas 'isEmpty()' returns false for '   '.",
    explanation: "A string containing three spaces ('   ') has length 3 and is NOT empty, but is completely blank. In Java 11+, 'name.isBlank()' properly catches whitespace-only names.",
    hint: "isBlank() catches both empty strings and whitespace-only strings.",
    level: "Beginner",
    codeExample: "if (name == null || name.isBlank()) throw new IllegalArgumentException(\"Name cannot be blank\");"
  },
  {
    question: "Can a setter method sanitize HTML/JavaScript tags to prevent Stored Cross-Site Scripting (XSS)?",
    shortAnswer: "Yes! Setters can run HTML entity encoding or HTML sanitizers on string inputs before storing them in database fields.",
    explanation: "Sanitizing user comments or student bios inside the mutator strips dangerous '<script>' tags before the text is saved to persistent storage.",
    hint: "XSS prevention through setter sanitization.",
    level: "Advanced",
    codeExample: "this.bio = HtmlSanitizer.clean(rawBio);"
  },
  {
    question: "How should a setter handle updating an immutable reference field like 'java.time.LocalDate'?",
    shortAnswer: "Validate that the date is within logical domain bounds (e.g. birthDate must be in the past: '!date.isAfter(LocalDate.now())').",
    explanation: "Because LocalDate is immutable, you don't need defensive copying, but you must validate temporal invariants (e.g. enrollment date cannot be in the year 2099).",
    hint: "Validate temporal domain constraints on date fields.",
    level: "Intermediate",
    codeExample: "if (birthDate.isAfter(LocalDate.now())) throw new IllegalArgumentException(\"Birth date cannot be in the future\");"
  },
  {
    question: "What is 'Clamping' in setter methods, and when is it appropriate vs throwing exceptions?",
    shortAnswer: "Clamping constrains an out-of-bounds value to the nearest legal limit (e.g. volume < 0 becomes 0, > 100 becomes 100).",
    explanation: "Clamping is common in UI controls (audio sliders, opacity levels, bounding boxes) where user gestures exceed bounds, whereas financial/domain entities strictly demand throwing exceptions.",
    hint: "Constrain to min/max vs Throwing exceptions.",
    level: "Intermediate",
    codeExample: "public void setVolume(int v) { this.volume = Math.max(0, Math.min(100, v)); } // Clamping"
  },
  {
    question: "How can Bean Validation annotations (Jakarta Validation) complement setter validation?",
    shortAnswer: "Annotations (@NotNull, @Min, @Pattern) provide declarative metadata for frameworks, while setter code provides programmatic runtime enforcement.",
    explanation: "Combining declarative annotations with programmatic setter validation provides layered defense: frameworks validate HTTP payloads before calling setters, and setters defend invariants if invoked directly in unit tests.",
    hint: "Dual defense: framework annotations + runtime setter guards.",
    level: "Advanced",
    codeExample: "@Min(0) @Max(100) public void setMarks(int marks) { if (marks < 0 || marks > 100) throw ...; this.marks = marks; }"
  },
  {
    question: "Why should setters avoid calling overridable public methods of the same class during validation?",
    shortAnswer: "If a subclass overrides that method, it may execute on partially initialized child state, causing unexpected behavior or NullPointerExceptions.",
    explanation: "In Java, calling an overridable method inside a constructor or setter can invoke the child's implementation before the child has finished initializing. Use private helper methods for validation.",
    hint: "Use private or final helper methods for internal validation.",
    level: "Advanced",
    codeExample: "public void setCode(String c) { validateCodePrivate(c); this.code = c; } // Private helper is safe"
  },
  {
    question: "What is 'Atomic Mutation' in a setter that updates multiple related internal variables?",
    shortAnswer: "Ensuring that either ALL related variables update successfully or NONE update if an exception occurs.",
    explanation: "If a setter computes multiple derived values, perform all validations and computations into local variables FIRST, and only assign to 'this.fields' once all checks pass completely.",
    hint: "Validate all steps before mutating instance fields.",
    level: "Advanced",
    codeExample: "double newTax = computeTax(amt); // Validate first\nthis.amount = amt; this.tax = newTax; // Atomic update"
  },
  {
    question: "Can a setter method validate against an external database or external API?",
    shortAnswer: "Technically possible, but strongly discouraged because it mixes entity state management with network I/O and creates high latency.",
    explanation: "Database uniqueness checks (e.g. 'isEmailUnique(email)') belong in a Service Layer (Domain Service), not inside the in-memory entity setter.",
    hint: "Entity setters validate format and invariants; Services validate external database uniqueness.",
    level: "Intermediate",
    codeExample: "// Service layer checks DB uniqueness; Entity setter checks email regex format"
  },
  {
    question: "What is a 'State Transition Matrix' and how does a setter enforce it?",
    shortAnswer: "A lookup table or conditional check specifying which status changes are legal (e.g. NEW -> PROCESSING is valid; CANCELLED -> DELIVERED is invalid).",
    explanation: "Finite State Machines enforce lifecycle transitions. A setter like 'transitionStatus(newStatus)' checks if the requested transition is in the allowed set and rejects illegal jumps.",
    hint: "State machine lifecycle transition enforcement.",
    level: "Intermediate",
    codeExample: "if (!currentStatus.canTransitionTo(newStatus)) throw new IllegalStateException(\"Invalid transition!\");"
  },
  {
    question: "Why should setter methods be made 'final' if they are called inside constructors?",
    shortAnswer: "To guarantee that a subclass cannot override the setter and bypass crucial invariant validation during object construction.",
    explanation: "Marking 'public final void setRoll(int r)' ensures that every subclass instance is constructed using the parent's exact validation rules without risk of override.",
    hint: "Final setters prevent subclass validation tampering.",
    level: "Intermediate",
    codeExample: "public final void setRollNumber(int r) { if (r <= 0) throw ...; this.roll = r; }"
  },
  {
    question: "How does Java 14+ Record Compact Constructor simplify setter-style validation?",
    shortAnswer: "It allows writing validation logic once without repeating parameter assignments ('this.field = field' is implicit).",
    explanation: "In records, the compact constructor 'public TraineeRecord { if (roll <= 0) throw ...; }' validates components before canonical assignment automatically.",
    hint: "Compact constructor validation in modern Java records.",
    level: "Beginner",
    codeExample: "public record Student(int roll, String name) {\n    public Student {\n        if (roll <= 0) throw new IllegalArgumentException();\n    }\n}"
  },
  {
    question: "What is the danger of returning 'boolean' (true/false) from a setter instead of throwing an exception on validation failure?",
    shortAnswer: "Callers frequently ignore boolean return values, leading to silent failures and undetected bugs.",
    explanation: "Writing 'boolean setAge(int age)' lets callers write 'student.setAge(-5);' without checking the return value. Throwing IllegalArgumentException forces explicit error handling.",
    hint: "Throw exceptions to guarantee failure notification.",
    level: "Beginner",
    codeExample: "// BAD: public boolean setAge(int age) { ... return false; }\n// GOOD: public void setAge(int age) { if (bad) throw new IllegalArgumentException(); }"
  },
  {
    question: "How should a setter handle setting a password with complexity requirements?",
    shortAnswer: "Validate length (>= 8 chars), character classes (uppercase, lowercase, digit, special symbol), and immediately hash it before storing.",
    explanation: "The setter acts as the security boundary: validate complexity rules, reject weak passwords with descriptive error messages, and hash with salt.",
    hint: "Complexity validation + Cryptographic hashing inside the mutator.",
    level: "Intermediate",
    codeExample: "public void setPassword(String p) {\n    if (!isComplex(p)) throw new IllegalArgumentException(\"Password too weak\");\n    this.hash = hash(p);\n}"
  },
  {
    question: "What is 'Deep Validation' when a setter accepts another object reference (e.g. 'setAddress(Address a)')?",
    shortAnswer: "Checking that the passed child object is not null AND that its internal state is valid and non-corrupted.",
    explanation: "If an entity receives an Address object, it should verify 'Objects.requireNonNull(a)' and optionally assert that the address contains valid postal codes before linking.",
    hint: "Validating child object integrity before linking.",
    level: "Intermediate",
    codeExample: "public void setAddress(Address a) {\n    Objects.requireNonNull(a, \"Address required\");\n    if (a.getZipCode() == null) throw new IllegalArgumentException(\"Zip required\");\n    this.address = a;\n}"
  },
  {
    question: "Can a setter trigger asynchronous audit logging without blocking the caller?",
    shortAnswer: "Yes! By publishing an event (e.g. 'eventPublisher.publishEvent(new StateChangedEvent(this))') to an async event bus.",
    explanation: "Setters can record state changes into message queues or reactive streams for decoupled audit tracking without slowing down transaction processing.",
    hint: "Decoupled async audit via event publishing.",
    level: "Advanced",
    codeExample: "public void setStatus(Status s) { this.status = s; eventBus.publish(new StatusChangeEvent(s)); }"
  },
  {
    question: "What is 'Temporal Validation' in setters handling start and end dates?",
    shortAnswer: "Ensuring that the start date precedes the end date ('startDate.isBefore(endDate)').",
    explanation: "When setting an end date, verify that it is not before the current start date, preventing negative duration intervals.",
    hint: "Ensure chronological validity across date fields.",
    level: "Intermediate",
    codeExample: "public void setEndDate(LocalDate end) {\n    if (end.isBefore(this.startDate)) throw new IllegalArgumentException(\"End cannot be before start\");\n    this.endDate = end;\n}"
  },
  {
    question: "How should a setter handle floating-point edge cases like 'Double.NaN' or 'Double.POSITIVE_INFINITY'?",
    shortAnswer: "Explicitly check 'Double.isNaN(value)' and 'Double.isInfinite(value)' and reject them with IllegalArgumentException.",
    explanation: "Accepting NaN or Infinity can corrupt arithmetic pipelines and financial calculations down the line. Always validate for finite numbers.",
    hint: "Reject NaN and Infinite floating-point values in financial setters.",
    level: "Intermediate",
    codeExample: "if (!Double.isFinite(fee) || fee < 0) throw new IllegalArgumentException(\"Invalid fee: \" + fee);"
  },
  {
    question: "What is the 'Self-Defending Object' pattern in Domain-Driven Design (DDD)?",
    shortAnswer: "An entity that encapsulates all validation rules internally, making it impossible to exist in an invalid state regardless of external context.",
    explanation: "Rather than relying on controllers or UI screens to remember validation rules, the entity itself rigorously enforces all invariants in constructors and setters.",
    hint: "Entities enforce their own domain truth.",
    level: "Advanced",
    codeExample: "// Self-defending entity: Rejects bad state anywhere in the application"
  },
  {
    question: "Why should error messages in thrown exceptions be rich and descriptive?",
    shortAnswer: "To drastically reduce debugging time in production logs by identifying the exact field name, the invalid value passed, and the violated rule.",
    explanation: "Throwing 'throw new IllegalArgumentException(\"Score must be 0-100, got: \" + score);' gives instant root-cause clarity in server stack traces.",
    hint: "Include parameter name, bad value, and expected constraint in error messages.",
    level: "Beginner",
    codeExample: "throw new IllegalArgumentException(\"Entrance score must be 0.0-100.0%. Supplied: \" + val);"
  },
  {
    question: "What is Sukanta Hui's Border Security Metaphor for Setters taught at the Barrackpore Academy?",
    shortAnswer: "A country without border security collapses from within; a class without validated setters collapses from data corruption. Inspect every passport, sanitize every crate, and turn away illegal cargo at the gate.",
    explanation: "At the Barrackpore academy, Sukanta Hui emphasizes that software bugs cost millions because bad data slips into databases undetected. By placing strict sanitization, range checks, and state transition guards inside your mutators, your systems run resilient, secure, and rock-solid.",
    hint: "Inspect every passport, sanitize every crate, defend your domain.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Setter Guard Pattern:\n// 1. Objects.requireNonNull -> 2. Sanitize/Trim -> 3. Range/Format Check -> 4. Invariant Guard -> 5. Assign"
  }
];

export default topic14_questions;
