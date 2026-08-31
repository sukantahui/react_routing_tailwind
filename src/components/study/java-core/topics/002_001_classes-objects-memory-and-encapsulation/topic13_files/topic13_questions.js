/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 13: Getter and Setter Methods: Accessor and Mutator Conventions
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic13_questions = [
  {
    question: "What is the JavaBean Specification convention for Accessor (Getter) methods?",
    shortAnswer: "Prefix 'get' followed by the capitalized property name (e.g. 'getStudentName()'); for primitive boolean types, prefix 'is' (e.g. 'isActive()').",
    explanation: "The JavaBeans standard defines 'get<PropertyName>()' for returning a field's value without parameters. For primitive booleans, 'is<PropertyName>()' or 'has<PropertyName>()' is the official standard.",
    hint: "get for standard types; is for primitive booleans.",
    level: "Beginner",
    codeExample: "public String getName() { return name; }\npublic boolean isEnrolled() { return isEnrolled; }"
  },
  {
    question: "What is the JavaBean Specification convention for Mutator (Setter) methods?",
    shortAnswer: "Prefix 'set' followed by the capitalized property name, taking 1 argument of the property's type and returning 'void'.",
    explanation: "A standard setter must have the signature 'public void set<PropertyName>(PropertyType value)'. It mutates the internal state and optionally validates input.",
    hint: "set + CapitalizedName with void return.",
    level: "Beginner",
    codeExample: "public void setName(String name) { this.name = name; }"
  },
  {
    question: "Why do frameworks like Spring Boot, Jackson, and Hibernate strictly require JavaBean naming conventions?",
    shortAnswer: "Because they use Reflection and Introspection to dynamically discover properties, serialize JSON, bind form parameters, and map database columns.",
    explanation: "Jackson looks for 'getStudentName()' to create the JSON key '\"studentName\"'. Hibernate inspects 'setBalance()' to populate entity state from database rows. Violating conventions breaks framework automation.",
    hint: "Reflection introspection relies on standardized prefixes.",
    level: "Intermediate",
    codeExample: "// Jackson converts getCourseFee() → { \"courseFee\": 8500.0 }"
  },
  {
    question: "What is the naming rule difference between primitive 'boolean' and wrapper 'Boolean' getters?",
    shortAnswer: "Primitive 'boolean' uses 'isPropertyName()'; Wrapper 'Boolean' (object reference) uses 'getPropertyName()'.",
    explanation: "Because a wrapper Boolean can be 'null' in addition to true/false, the JavaBeans spec dictates that object wrappers use 'get', while only primitive booleans use 'is'.",
    hint: "Primitive boolean = is...(); Wrapper Boolean = get...().",
    level: "Intermediate",
    codeExample: "private boolean active;       // public boolean isActive()\nprivate Boolean remoteAccess; // public Boolean getRemoteAccess()"
  },
  {
    question: "What is an 'Indexed Getter/Setter' in the JavaBeans specification?",
    shortAnswer: "Methods that get or set an individual element at a specific index in an array or collection property.",
    explanation: "Indexed accessors follow the signature: 'public T getProperty(int index)' and 'public void setProperty(int index, T value)', allowing item-level access without returning the whole collection.",
    hint: "Index-based element accessors.",
    level: "Intermediate",
    codeExample: "public String getSkill(int index) { return skills[index]; }\npublic void setSkill(int index, String skill) { this.skills[index] = skill; }"
  },
  {
    question: "What is a 'Fluent Setter' and how does it deviate from traditional JavaBeans?",
    shortAnswer: "A fluent setter returns 'this' (the object reference) instead of 'void' to enable method chaining.",
    explanation: "While JavaBeans standard specifies 'void', modern builder APIs return 'this' (e.g. 'public Student withName(String n) { this.name = n; return this; }'), enabling chained invocations.",
    hint: "Returns 'this' for method chaining.",
    level: "Beginner",
    codeExample: "public Student withName(String name) { this.name = name; return this; }"
  },
  {
    question: "Why should a field name with two consecutive uppercase letters (e.g. 'uName') be avoided?",
    shortAnswer: "It causes Introspector decapitalization ambiguity in JavaBeans property mapping (e.g. 'getuName()' vs 'getUName()').",
    explanation: "The JavaBeans spec dictates that if the first two characters of a property are capitalized (e.g. 'URL'), decapitalization keeps both uppercase. Odd casings like 'uName' or 'eMail' create bugs in Jackson and Spring binding.",
    hint: "Stick to standard camelCase like 'userName' or 'email'.",
    level: "Advanced",
    codeExample: "// BAD: private String eMail; → Getter: geteMail() vs getEMail()\n// GOOD: private String email; → Getter: getEmail()"
  },
  {
    question: "What is the difference between a JavaBean and a POJO (Plain Old Java Object)?",
    shortAnswer: "A JavaBean is a stricter POJO that implements Serializable, has a no-arg constructor, and exposes private fields via standard getters/setters.",
    explanation: "All JavaBeans are POJOs, but not all POJOs are JavaBeans. A POJO can have any constructor or method signature, whereas a JavaBean strictly complies with the 1997 Component specification.",
    hint: "JavaBean = POJO + Serializable + No-arg constructor + Getters/Setters.",
    level: "Beginner",
    codeExample: "// JavaBean: public class Student implements Serializable { public Student() {} ... }"
  },
  {
    question: "Why should getter methods generally avoid performing heavy I/O or network calls?",
    shortAnswer: "Getters are expected by frameworks and developers to be lightweight, idempotent, side-effect-free, and execute in O(1) time.",
    explanation: "Frameworks (like debuggers, serializers, and UI binders) call getters frequently. If a getter triggers a database query or REST call, it can cause latency spikes, N+1 query problems, and thread blocking.",
    hint: "Getters must be fast, lightweight, and side-effect-free.",
    level: "Intermediate",
    codeExample: "// BAD: public double getBalance() { return fetchFromRemoteBankApi(); }\n// GOOD: public double getBalance() { return this.balance; }"
  },
  {
    question: "Can a getter method compute a derived property that has no underlying field?",
    shortAnswer: "Yes! A 'Virtual Property' calculates its return value on the fly from other existing fields.",
    explanation: "Writing 'public String getFullName() { return firstName + \" \" + lastName; }' exposes a 'fullName' property to frameworks and callers even though no 'private String fullName' field exists.",
    hint: "Calculated property without dedicated field storage.",
    level: "Beginner",
    codeExample: "public String getFullName() { return firstName + \" \" + lastName; }"
  },
  {
    question: "How does Project Lombok (@Getter / @Setter) generate accessors at compile-time?",
    shortAnswer: "Using an Annotation Processor that modifies the Abstract Syntax Tree (AST) to inject standard getter/setter bytecode during compilation.",
    explanation: "Lombok eliminates boilerplate code by generating compliant JavaBeans accessors and mutators in bytecode while keeping the source code clean and concise.",
    hint: "Annotation processor AST bytecode injection.",
    level: "Intermediate",
    codeExample: "@Getter @Setter public class Student { private String name; }"
  },
  {
    question: "What happens if a getter method returns a mutable internal array directly?",
    shortAnswer: "It violates encapsulation by giving the caller a direct alias to the array, allowing external elements to be mutated.",
    explanation: "Arrays in Java are always mutable. To prevent representation exposure, getters should return a clone ('return array.clone();') or an unmodifiable List.",
    hint: "Always clone arrays before returning in getters.",
    level: "Intermediate",
    codeExample: "public String[] getSkills() { return skills.clone(); } // Safe defensive copy"
  },
  {
    question: "Can a setter method be marked 'final' and what is the benefit?",
    shortAnswer: "Yes! Marking a setter 'final' prevents subclasses from overriding it, guaranteeing that validation logic cannot be bypassed in children.",
    explanation: "If a parent class has strict invariant validation in 'public final void setAge(int age)', no subclass can override it to remove the validation check.",
    hint: "Locks validation rules across the inheritance tree.",
    level: "Intermediate",
    codeExample: "public final void setRollNumber(int roll) { if (roll <= 0) throw ...; this.roll = roll; }"
  },
  {
    question: "What is a 'Write-Only' property in JavaBean architecture?",
    shortAnswer: "A property that has a public setter but no getter (e.g. setPassword(String pwd)).",
    explanation: "Write-only properties accept configuration or credentials from callers/frameworks without allowing other components to read the stored secret back out.",
    hint: "Setter provided, getter omitted.",
    level: "Beginner",
    codeExample: "public void setSecretPin(String pin) { this.pinHash = hash(pin); } // No getSecretPin()"
  },
  {
    question: "What is a 'Read-Only' property in JavaBean architecture?",
    shortAnswer: "A property that has a public getter but no setter (e.g. getAccountId()).",
    explanation: "Read-only properties expose state (initialized during construction or computed dynamically) while preventing outside classes from modifying it.",
    hint: "Getter provided, setter omitted.",
    level: "Beginner",
    codeExample: "public int getAccountId() { return this.accountId; } // No setAccountId()"
  },
  {
    question: "How does the 'record' feature in Java 16+ name its accessor methods?",
    shortAnswer: "Records omit the 'get' prefix and use the component name directly (e.g. 'student.name()' instead of 'student.getName()').",
    explanation: "Record accessors use mathematical / functional naming: 'public int rollNumber()' and 'public String studentFullName()', departing from legacy JavaBeans 'get' prefixes.",
    hint: "Records use componentName() rather than getComponentName().",
    level: "Intermediate",
    codeExample: "record Student(int roll, String name) {}\nint r = student.roll(); // Component accessor"
  },
  {
    question: "Why should setter parameters use the exact same name as the instance field?",
    shortAnswer: "It makes code self-documenting and uses 'this.fieldName = fieldName' to clearly distinguish field from parameter.",
    explanation: "Writing 'public void setName(String name) { this.name = name; }' is standard Java idiom. Disambiguating with 'this.' makes the binding explicit.",
    hint: "Parameter shadows field; use 'this.' to assign.",
    level: "Beginner",
    codeExample: "public void setBranch(String branch) { this.branch = branch; }"
  },
  {
    question: "What is 'Lazy Initialization' inside a getter method?",
    shortAnswer: "Deferring object creation until the getter is called for the very first time.",
    explanation: "If an object or heavy report is expensive to create and may not always be needed, the getter checks if the field is null, instantiates it on demand, and caches it.",
    hint: "Create on first get() call.",
    level: "Intermediate",
    codeExample: "public Report getReport() {\n    if (report == null) report = generateHeavyReport();\n    return report;\n}"
  },
  {
    question: "How do ORM frameworks like Hibernate handle entities with getters/setters vs direct field access?",
    shortAnswer: "Hibernate can use 'AccessType.PROPERTY' (invoking getters/setters, triggering validation) or 'AccessType.FIELD' (using direct bytecode/reflection injection).",
    explanation: "Property access routes database column reads and writes through getters and setters, allowing business logic to run during entity hydration.",
    hint: "Property access vs Field access in JPA/Hibernate.",
    level: "Advanced",
    codeExample: "@Access(AccessType.PROPERTY) // Enforces getter/setter execution on DB load"
  },
  {
    question: "Can a setter method throw a checked exception?",
    shortAnswer: "Technically yes in Java syntax, but it is strongly discouraged by the JavaBeans specification and breaks framework auto-binding.",
    explanation: "Frameworks like Spring MVC and Jackson cannot handle checked exceptions in setters during HTTP parameter binding. Setters should throw IllegalArgumentException (unchecked) on validation errors.",
    hint: "Use unchecked RuntimeExceptions (IllegalArgumentException) in setters.",
    level: "Intermediate",
    codeExample: "public void setScore(int s) {\n    if (s < 0) throw new IllegalArgumentException(\"Score cannot be negative\");\n}"
  },
  {
    question: "What is 'VetoableChangeListener' in the java.beans package?",
    shortAnswer: "A listener mechanism allowing external subscribers to validate and potentially reject (veto) a proposed property change in a JavaBean.",
    explanation: "Before a constrained property is updated, the setter fires a PropertyChangeEvent. If any listener throws a PropertyVetoException, the setter reverts the change.",
    hint: "Constrained property change listener in java.beans.",
    level: "Advanced",
    codeExample: "vetoSupport.fireVetoableChange(\"fee\", oldFee, newFee);"
  },
  {
    question: "Can an accessor method have arguments?",
    shortAnswer: "No, standard property getters must take ZERO arguments (except indexed getters which take 1 int index).",
    explanation: "A method like 'public String getName(String format)' is a general business method, NOT a JavaBean getter property.",
    hint: "Standard getters take no parameters.",
    level: "Beginner",
    codeExample: "public String getName() { return name; } // Valid getter: 0 arguments"
  },
  {
    question: "Why should getters returning Collections never return null?",
    shortAnswer: "To prevent callers from having to write null checks and avoid NullPointerExceptions in for-each loops.",
    explanation: "If a list has no elements, return 'Collections.emptyList()' rather than 'null'. Callers can safely write 'for(var item : bean.getItems())' with zero NPE risk.",
    hint: "Always return empty collections, never null.",
    level: "Beginner",
    codeExample: "public List<String> getSkills() { return skills.isEmpty() ? Collections.emptyList() : skills; }"
  },
  {
    question: "What is 'PropertyDescriptor' in the java.beans.Introspector API?",
    shortAnswer: "A standard Java reflection class that describes a JavaBean property by pairing its getter (ReadMethod) and setter (WriteMethod).",
    explanation: "Introspector.getBeanInfo(Class).getPropertyDescriptors() is how Spring and Java frameworks programmatically discover and link matching getters and setters.",
    hint: "Introspection metadata pairing getter and setter.",
    level: "Advanced",
    codeExample: "PropertyDescriptor pd = new PropertyDescriptor(\"studentName\", TraineeEnrollmentBean.class);\nMethod getter = pd.getReadMethod(); // getStudentFullName"
  },
  {
    question: "How does the 'synchronized' modifier on getters and setters support Thread Safety?",
    shortAnswer: "It prevents race conditions by acquiring the object's monitor lock on both reads and writes of shared mutable state.",
    explanation: "If Thread A is writing via 'setFee()' and Thread B is reading via 'getFee()', synchronizing both methods guarantees visibility and atomic state transitions.",
    hint: "Synchronize both getter and setter for thread-safe access.",
    level: "Intermediate",
    codeExample: "public synchronized double getFee() { return fee; }\npublic synchronized void setFee(double f) { this.fee = f; }"
  },
  {
    question: "What is the difference between an Immutable Class and a JavaBean?",
    shortAnswer: "JavaBeans are typically mutable with public no-arg constructors and setters; Immutable classes have final fields, no setters, and initialize via constructors.",
    explanation: "Traditional JavaBeans were designed for mutable component builders. Modern microservices favor immutable records/DTOs for concurrency safety.",
    hint: "Mutable component bean vs immutable domain record.",
    level: "Intermediate",
    codeExample: "// JavaBean: mutable with setters\n// Immutable: final fields + constructor only"
  },
  {
    question: "Can a setter method trigger secondary side-effects like recalculating total balances or notifying listeners?",
    shortAnswer: "Yes! Encapsulating state modification inside a setter allows updating dependent cached fields and firing change notifications.",
    explanation: "When 'setUnitPrice(p)' is called, the setter can automatically update 'this.totalPrice = this.quantity * p' and notify listeners, keeping internal state consistent.",
    hint: "Centralized state mutation enables automated dependency updates.",
    level: "Intermediate",
    codeExample: "public void setPrice(double price) {\n    this.price = price;\n    recalculateTotal(); // Automated side-effect\n}"
  },
  {
    question: "What is the danger of providing a setter for a collection property (e.g. 'setSkills(List<String> s)')?",
    shortAnswer: "Direct assignment creates an external alias and can overwrite the internal collection with an unvalidated or null list.",
    explanation: "A setter like 'this.skills = s;' lets callers pass null or clear the list from outside. It is safer to clear and copy: 'this.skills.clear(); if(s!=null) this.skills.addAll(s);'.",
    hint: "Copy collection contents; do not overwrite the list reference.",
    level: "Intermediate",
    codeExample: "public void setSkills(List<String> list) {\n    this.skills = (list != null) ? new ArrayList<>(list) : new ArrayList<>();\n}"
  },
  {
    question: "What is 'Bean Validation' (JSR 380 / Jakarta Validation) on getters and setters?",
    shortAnswer: "Standardized annotations like @NotNull, @Size, @Min, @Email placed on fields or getters to enforce declarative domain constraints.",
    explanation: "Frameworks like Hibernate Validator automatically validate annotated properties before persisting to databases or handling REST payloads.",
    hint: "Declarative validation annotations on JavaBean properties.",
    level: "Intermediate",
    codeExample: "@NotNull @Size(min = 2, max = 50) private String studentName;"
  },
  {
    question: "What is Sukanta Hui's Pedagogical Rule on Getters and Setters at the Barrackpore Academy?",
    shortAnswer: "Never treat getters and setters as mindless robotic boilerplate. Every setter is a border security checkpoint, and every getter is a protective diplomatic courier.",
    explanation: "At the Barrackpore academy, Sukanta Hui teaches that an unvalidated setter is an open invitation to data corruption. Validate inputs rigorously at the setter gate, return safe defensive copies from getters, and follow JavaBean naming rules so enterprise frameworks work with your code effortlessly.",
    hint: "Setters are border checkpoints; getters are diplomatic couriers.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Rule: Validate at setter → Guard invariants → Return unmodifiable/defensive copies from getters"
  }
];

export default topic13_questions;
