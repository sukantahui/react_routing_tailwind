const questions = [
  {
    question: "What is the relationship between Hibernate Validator and Jakarta Bean Validation?",
    shortAnswer: "Jakarta Bean Validation is the specification (JSR 380); Hibernate Validator is the reference implementation.",
    explanation: "You can use any Bean Validation provider, but Hibernate Validator is the most common and includes extra features like @Length, @Range, and integration with Hibernate ORM.",
    hint: "Add dependency: org.hibernate.validator:hibernate-validator",
    level: "basic",
    codeExample: "// both API and implementation needed"
  },
  {
    question: "How do I enable automatic validation in Hibernate (JPA)?",
    shortAnswer: "By default, JPA triggers validation before persist, merge, and remove. Set javax.persistence.validation.mode to enable/disable.",
    explanation: "The default is AUTO (validation callbacks enabled). You can disable with 'none'. In Hibernate, you can also configure with hibernate.validator.apply_to_ddl to influence DDL constraints.",
    hint: "Check logs for 'Bean Validation integration' to confirm it's active.",
    level: "intermediate",
    codeExample: "<property name=\"javax.persistence.validation.mode\" value=\"AUTO\"/>"
  },
  {
    question: "What is ConstraintViolationException and how to handle it?",
    shortAnswer: "Exception thrown by Hibernate when entity validation fails. Contains set of ConstraintViolation objects.",
    explanation: "When you call persist/merge, Hibernate validates before writing to DB. On violation, it throws ConstraintViolationException. You can catch it and extract violations to show user-friendly messages.",
    hint: "In Spring, @ExceptionHandler can map it to 400 Bad Request.",
    level: "intermediate",
    codeExample: "catch (ConstraintViolationException e) { for (ConstraintViolation<?> cv : e.getConstraintViolations()) { ... } }"
  },
  {
    question: "Can I validate nested objects (e.g., an Address inside a Person)?",
    shortAnswer: "Yes, use @Valid on the nested field.",
    explanation: "@Valid triggers validation of the referenced object. You must also add validation annotations inside the nested class. Cascaded validation works recursively.",
    hint: "Without @Valid, nested objects are not validated.",
    level: "basic",
    codeExample: "public class Person { @Valid private Address address; }"
  },
  {
    question: "What are validation groups? Give an example.",
    shortAnswer: "Groups allow applying different validation rules for different use cases (e.g., create vs update).",
    explanation: "Define marker interfaces (e.g., Create.class, Update.class). Annotate constraints with groups = {Create.class}. Then call validator.validate(entity, Create.class) to only enforce that group.",
    hint: "Use groups in JPA with @Validated in Spring.",
    level: "advanced",
    codeExample: "@NotNull(groups = Update.class) private Long id;"
  },
  {
    question: "How do I create a custom constraint annotation?",
    shortAnswer: "Define an annotation with @Constraint and implement ConstraintValidator interface.",
    explanation: "Steps: 1) Create annotation with @Constraint(validatedBy = MyValidator.class). 2) Write validator class implementing isValid(). 3) Optionally provide message, groups, payload.",
    hint: "Default message can be overridden in ValidationMessages.properties.",
    level: "advanced",
    codeExample: "// @ValidPhoneNumber example shown earlier"
  },
  {
    question: "What is the difference between @Pattern and @ScriptAssert?",
    shortAnswer: "@Pattern checks a single string with regex; @ScriptAssert evaluates a script (e.g., JavaScript) on the whole object for cross-field validation.",
    explanation: "@Pattern is simple and efficient. @ScriptAssert is flexible but can be heavy; often better to write a custom validator cross-field validator for clarity.",
    hint: "@ScriptAssert example: @ScriptAssert(script = \"_this.startDate < _this.endDate\", lang = \"javascript\")",
    level: "advanced",
    codeExample: "@ScriptAssert(lang = \"javascript\", script = \"_this.password.equals(_this.confirmPassword)\")"
  },
  {
    question: "How does Hibernate Validator integrate with DDL generation (hbm2ddl)?",
    shortAnswer: "It can add database constraints (like NOT NULL, CHECK) based on validation annotations.",
    explanation: "Set hibernate.validator.apply_to_ddl=true (default true). Then @NotNull becomes NOT NULL, @Size(max=255) becomes VARCHAR(255), etc. Not all constraints map to DDL (e.g., @Pattern maps to check constraint inconsistently).",
    hint: "Use this to keep schema and validation in sync, but be careful with databases that poorly support CHECK.",
    level: "intermediate",
    codeExample: "<property name=\"hibernate.validator.apply_to_ddl\" value=\"true\"/>"
  },
  {
    question: "What is the purpose of ValidationMessages.properties?",
    shortAnswer: "It externalizes validation error messages for internationalization (i18n).",
    explanation: "Place a file ValidationMessages.properties in classpath with keys like {javax.validation.constraints.NotNull.message}=... . Use message = \"{my.custom.key}\" in annotations. Hibernate Validator resolves them.",
    hint: "Spring Boot automatically picks up messages from ValidationMessages.properties.",
    level: "intermediate",
    codeExample: "student.name.notblank=Name must not be blank"
  },
  {
    question: "How do I enforce a value that must be one of several predefined values?",
    shortAnswer: "Use @Pattern with regex, or create a custom validator that checks against an enum or list.",
    explanation: "Example: @Pattern(regexp = \"^(MALE|FEMALE|OTHER)$\") for gender. Alternatively, implement a validator that checks if value belongs to an enum constant.",
    hint: "For flexibility, consider using a custom validator that references a configurable list.",
    level: "intermediate",
    codeExample: "@Pattern(regexp = \"^ACTIVE|INACTIVE|PENDING$\") private String status;"
  },
  {
    question: "Can validation be disabled for certain operations?",
    shortAnswer: "Yes, set validation groups that are not enforced, or disable Hibernate's validation callback entirely.",
    explanation: "To disable for all, set javax.persistence.validation.mode=none. To disable for a specific persist, you can use Hibernate's Session.persist with a custom event listener, but easier is to use groups and call validator manually.",
    hint: "Often you do want validation on both create and update, but sometimes not for internal bulk operations.",
    level: "expert",
    codeExample: "Map<String, Object> props = new HashMap<>(); props.put(\"javax.persistence.validation.mode\", \"none\");"
  },
  {
    question: "How does Bean Validation handle null values?",
    shortAnswer: "By default, constraints like @Size, @Min, @Pattern allow null (they return true). Use @NotNull to forbid null.",
    explanation: "Each constraint specification states that null is considered valid unless annotated with @NotNull. This matches database behavior: NULL is allowed unless NOT NULL constraint.",
    hint: "Always combine @NotNull with other constraints if you want both not-null and value restrictions.",
    level: "basic",
    codeExample: "@NotNull @Size(min=1) // ensures non-null and non-empty"
  },
  {
    question: "How to validate method parameters and return types?",
    shortAnswer: "Use Executable Validation (method validation) via Hibernate Validator and MethodValidationPostProcessor in Spring.",
    explanation: "Annotate parameters with constraints and class with @Validated. Then when method is called, constraints are checked before execution. Return values are also validated after execution.",
    hint: "Spring Boot automatically configures MethodValidationPostProcessor if you have hibernate-validator on classpath.",
    level: "advanced",
    codeExample: "@Validated public void register(@NotNull @Email String email) { ... }"
  },
  {
    question: "What is the performance impact of Bean Validation?",
    shortAnswer: "Negligible for typical applications; validation runs in-memory and is fast.",
    explanation: "Reflection is used to read annotations, but constraints are cached. Complex regex or custom validators that hit databases can be slow. Measure if needed, but usually validating user input is a fraction of total request time.",
    hint: "Batch operations may benefit from disabling validation temporarily.",
    level: "intermediate",
    codeExample: "// no code example"
  },
  {
    question: "How do I test validation constraints in unit tests?",
    shortAnswer: "Use ValidatorFactory and Validator directly without Hibernate.",
    explanation: "Create a Validator instance, call validate(entity), and assert violations. This tests constraints independently of persistence.",
    hint: "Example: Set<ConstraintViolation<Person>> violations = validator.validate(person); assertEquals(1, violations.size());",
    level: "intermediate",
    codeExample: "ValidatorFactory factory = Validation.buildDefaultValidatorFactory(); Validator validator = factory.getValidator();"
  },
  {
    question: "What is the difference between @Valid (jakarta) and @Validated (Spring)?",
    shortAnswer: "@Valid is standard Bean Validation (supports groups indirectly), @Validated is Spring's annotation that enables group support.",
    explanation: "@Valid works with JPA, @Validated works with Spring's validation and allows specifying groups: @Validated(Update.class). Both trigger validation.",
    hint: "In Spring controllers, use @Valid to trigger validation; @Validated for groups.",
    level: "intermediate",
    codeExample: "public ResponseEntity<?> update(@Validated(Update.class) @RequestBody User user) { ... }"
  },
  {
    question: "How does constraint composition help?",
    shortAnswer: "Composition allows bundling multiple constraints into a single annotation, reducing duplication.",
    explanation: "Annotate a custom annotation with @ReportAsSingleViolation and several built-in constraints (e.g., @NotNull, @Size). Then using that one annotation applies all, with a single violation message.",
    hint: "Use @ReportAsSingleViolation to avoid multiple messages for the same field.",
    level: "expert",
    codeExample: "@NotNull @Size(min=2, max=50) @ReportAsSingleViolation public @interface ValidName { }"
  },
  {
    question: "What is the role of the EL (Expression Language) in Hibernate Validator?",
    shortAnswer: "EL is used to interpolate error messages dynamically, e.g., to include field names or constraint attributes.",
    explanation: "Messages like '${validatedValue} must be between {min} and {max}' require EL. Hibernate Validator uses Jakarta EL (or JUEL). Without EL implementation, only simple placeholder replacement works.",
    hint: "Add jakarta.el:jakarta.el-api and an implementation like org.glassfish:jakarta.el.",
    level: "advanced",
    codeExample: "message = \"Value '${validatedValue}' is not allowed\""
  },
  {
    question: "Can I use Bean Validation with Java modules (module-path)?",
    shortAnswer: "Yes, but you need to add appropriate requires and open packages for reflection.",
    explanation: "Bean Validation uses reflection to access fields. You must open your entity packages to org.hibernate.validator. Also, add requires java.validation and requires org.hibernate.validator.",
    hint: "In module-info.java: opens com.school.entity to org.hibernate.validator;",
    level: "expert",
    codeExample: "// module-info.java configuration needed"
  },
  {
    question: "How to validate that a date is in the future or past?",
    shortAnswer: "Use @Future or @Past annotations (for Date, LocalDate, etc.).",
    explanation: "@Future ensures the date is after the current moment; @Past ensures before now. There are also @FutureOrPresent and @PastOrPresent.",
    hint: "Provide a timezone if needed, but these use system default.",
    level: "basic",
    codeExample: "@Future(message = \"Event date must be in future\") private LocalDate eventDate;"
  },
  {
    question: "What is the difference between @Email and a custom pattern?",
    shortAnswer: "@Email implements a strict RFC 5322 compliant email regex, which is complex; pattern may be simpler but less accurate.",
    explanation: "@Email from Hibernate Validator also allows local parts with dots, etc. It is generally preferable to a simple regex. However, some apps prefer a milder check like \\S+@\\S+\\.\\S+.",
    hint: "For basic use, @Email is safe.",
    level: "basic",
    codeExample: "@Email private String email;"
  },
  {
    question: "How to validate a collection of elements, e.g., List<@NotBlank String>?",
    shortAnswer: "Use generic type validation: @Valid on the collection, or Hibernate's @Valid on parameterized type.",
    explanation: "In Java, you can write List<@NotBlank String>. Bean Validation 2.0 supports type annotations on generic arguments. You must also annotate the field with @Valid to trigger validation of container elements.",
    hint: "Ensure your project source level is at least Java 8.",
    level: "advanced",
    codeExample: "private List<@NotBlank String> tags;"
  },
  {
    question: "How do I validate that two fields match (e.g., password and confirmPassword)?",
    shortAnswer: "Write a custom cross-field validator or use @ScriptAssert (less recommended).",
    explanation: "A class-level validator that receives the whole object and compares the two fields. This is the cleanest approach. You can also use @ScriptAssert with JavaScript.",
    hint: "Example: @FieldMatch.List({@FieldMatch(first = \"password\", second = \"confirmPassword\")})",
    level: "advanced",
    codeExample: "// custom annotation @FieldMatch with class-level validator"
  },
  {
    question: "What is the default message interpolation algorithm?",
    shortAnswer: "It extracts message from annotation, then replaces {key} with values from the constraint's attributes or ValidationMessages.properties.",
    explanation: "Algorithm: 1) If message contains {} placeholders, resolve them using attribute values (e.g., {min}). 2) If message contains ${...} use EL. 3) Look up key in ValidationMessages.properties if present.",
    hint: "You can create custom interpolator by extending MessageInterpolator.",
    level: "advanced",
    codeExample: "message = \"Age must be between {min} and {max}\""
  },
  {
    question: "How can I temporarily disable validation for a session?",
    shortAnswer: "Set javax.persistence.validation.mode to \"none\" via property on EntityManagerFactory or use Hibernate's Session.setProperty if using native API.",
    explanation: "In JPA, you'd need a separate EntityManagerFactory for validation-off. In native Hibernate, you can call session.setProperty(\"javax.persistence.validation.mode\", \"none\") before performing bulk operations.",
    hint: "For batch processing, often better to flush and clear session periodically.",
    level: "expert",
    codeExample: "// Not recommended unless necessary."
  },
  {
    question: "What is the purpose of @ConvertGroup?",
    shortAnswer: "To convert from one validation group to another during cascaded validation.",
    explanation: "When you validate with group A and a field has @ConvertGroup(from = A, to = B), then on that field group B is used instead. Useful when you want to validate different parts of an object graph with different groups.",
    hint: "Advanced feature; rarely used.",
    level: "expert",
    codeExample: "@ConvertGroup(from = Default.class, to = Update.class) private Address address;"
  },
  {
    question: "Does Bean Validation work with inheritance?",
    shortAnswer: "Yes, constraints from parent classes and interfaces are inherited. Overriding methods inherit constraints.",
    explanation: "Constraints are inherited from superclasses. When validating an instance of a subclass, both its own constraints and those from superclasses are processed. Method validation also inherits parameter constraints.",
    hint: "Be careful not to accidentally relax constraints in subclasses.",
    level: "intermediate",
    codeExample: "public class Person { @NotBlank protected String name; } // subclass Student inherits name constraint"
  },
  {
    question: "How does validation work with lazy loading in Hibernate?",
    shortAnswer: "It validates the entity state, not the lazy associations, unless they are accessed.",
    explanation: "Validation reads constraints on fields. If you access a lazy association during validation (e.g., in a custom validator), it may trigger a database query. Avoid that within validation to prevent performance issues.",
    hint: "Do not access lazy collections in custom validators!",
    level: "advanced",
    codeExample: "// bad: accessing lazy getter in validator"
  },
  {
    question: "What is the benefit of placing validation on DTOs rather than entities?",
    shortAnswer: "DTOs are tailored to specific use cases, avoid persistence concerns, and can have different validation rules per API.",
    explanation: "Validation rules on entities might be too strict or too loose for certain operations. Using DTOs decouples the API from the database schema and allows flexible validation per endpoint.",
    hint: "In layered architectures, DTO validation is a standard pattern.",
    level: "intermediate",
    codeExample: "// REST controller validates DTO; then DTO mapped to entity"
  },
  {
    question: "Can I combine Bean Validation with database constraints (e.g., unique)?",
    shortAnswer: "Bean Validation does not enforce database uniqueness (no @UniqueConstraint annotation). Use JPA's @Column(unique=true) or a database index.",
    explanation: "Uniqueness is a database-level constraint that cannot reliably be validated before the database transaction commits (race conditions). Bean Validation does not cover that; you catch ConstraintViolationException from the DB.",
    hint: "For uniqueness, you can implement a custom validator that queries the database, but it's not transactional-safe.",
    level: "advanced",
    codeExample: "@Column(unique = true) private String username; // DB constraint"
  }
];

export default questions;