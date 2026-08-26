/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 16: Real-World OOP Modeling: BankAccount, Employee, Product, Car Entities
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic16_questions = [
  {
    question: "What are the 3 essential components of an Enterprise Domain Entity in OOP?",
    shortAnswer: "1. Unique Identity (immutable ID), 2. Encapsulated State (private fields & invariants), and 3. Domain Behaviors ('Tell, Don't Ask' methods).",
    explanation: "Unlike simple data structures (structs or hashes), a true OOP domain entity has an unchangeable identity (account number, VIN, SKU), private fields guarded by business invariants, and methods that model real-world domain workflows.",
    hint: "Identity + Encapsulated State + Domain Behaviors.",
    level: "Beginner",
    codeExample: "public class BankAccount {\n    private final String accountNumber; // Identity\n    private double balance;             // State\n    public boolean deposit(...) { ... } // Behavior\n}"
  },
  {
    question: "How does the BankAccount entity enforce the Minimum Balance Invariant?",
    shortAnswer: "By asserting 'balance - withdrawalAmount >= MIN_BALANCE' in the withdraw() method before executing the deduction.",
    explanation: "If an attempted withdrawal would cause the balance to drop below ₹1,000, the method halts, logs the rejection, and leaves the account balance completely untouched.",
    hint: "Invariant check before mutating balance.",
    level: "Beginner",
    codeExample: "if (this.balance - amount < MIN_BALANCE) return false; // Invariant Guard"
  },
  {
    question: "How does the BankAccount entity guarantee Atomic Inter-Account Transfers ('transferTo')?",
    shortAnswer: "By only crediting the target account IF the source account withdrawal succeeds completely.",
    explanation: "If the source account has insufficient funds, withdrawal returns false and the target deposit is never called. This prevents phantom money creation or debit-without-credit bugs.",
    hint: "Source withdrawal must succeed before target deposit executes.",
    level: "Intermediate",
    codeExample: "public boolean transferTo(BankAccount target, double amt) {\n    if (this.withdraw(amt)) { target.deposit(amt); return true; }\n    return false;\n}"
  },
  {
    question: "What prevents an account holder from transferring money to their OWN same account?",
    shortAnswer: "An identity check: 'if (this == targetAccount) return false;'.",
    explanation: "Self-transfers can cause redundant transaction logs and concurrency locking deadlocks in multi-threaded environments. Guarding against self-transfers maintains audit hygiene.",
    hint: "Reference equality check: this == target.",
    level: "Beginner",
    codeExample: "if (this == targetAccount) throw new IllegalArgumentException(\"Cannot transfer to self\");"
  },
  {
    question: "In the Employee entity, why are HRA and DA allowances implemented as Methods rather than stored as Fields?",
    shortAnswer: "Because HRA and DA are derived percentages (40% and 20%) of the basic salary; computing them on the fly eliminates data redundancy and synchronization bugs.",
    explanation: "If HRA were a separate field and the basic salary increased, you would have to remember to recalculate HRA manually. Methods compute values dynamically from single source of truth.",
    hint: "Compute derived values dynamically to prevent stale data.",
    level: "Intermediate",
    codeExample: "public double calculateHraAllowance() { return monthlyBasicSalary * 0.40; }"
  },
  {
    question: "How does the Employee entity model the annual appraisal and promotion workflow?",
    shortAnswer: "Via 'evaluatePerformance(rating)', which validates the 1.0-5.0 score and automatically triggers a 15% merit raise if score >= 4.5.",
    explanation: "The object encapsulates the company's promotion policy within its domain behavior, keeping the business logic inside the entity rather than scattered across external controllers.",
    hint: "Encapsulating compensation rules in domain methods.",
    level: "Beginner",
    codeExample: "public void evaluatePerformance(double score) {\n    if (score >= 4.5) this.basicSalary *= 1.15;\n}"
  },
  {
    question: "What is the critical Inventory Invariant in the Product entity?",
    shortAnswer: "'stockQuantity >= 0'; stock can never become negative during order fulfillment.",
    explanation: "When fulfilling an order ('fulfillCustomerOrder(qty)'), the product verifies 'qty <= stockQuantity'. If stock is insufficient, the order is rejected immediately (Inventory Shortage).",
    hint: "Prevent overselling by guarding stock quantity.",
    level: "Beginner",
    codeExample: "if (qty > this.stockQuantity) return false; // Prevents negative inventory"
  },
  {
    question: "How does the AutomobileCar entity function as a Finite State Machine (FSM)?",
    shortAnswer: "It manages boolean state ('isEngineRunning') and speed, blocking illegal transitions (e.g. accelerating while engine is OFF).",
    explanation: "The car's methods enforce state-dependent rules: accelerating is only allowed when engine is ON, engine cannot start if fuel <= 0.5L, and stopping the engine resets speed to 0.",
    hint: "State machine transitions: OFF -> ON -> ACCELERATING -> BRAKING -> OFF.",
    level: "Intermediate",
    codeExample: "public void accelerate(int delta) {\n    if (!isEngineRunning) return; // Guard against engine-off acceleration\n    this.speed += delta;\n}"
  },
  {
    question: "Why is the vehicle VIN number or Bank Account Number marked 'final'?",
    shortAnswer: "Because domain entity identity is immutable and must never change throughout the object's lifetime.",
    explanation: "A car can change engines, color, or tires, but its VIN is permanent. Marking identity fields 'final' enforces identity immutability at compile time.",
    hint: "Identity immutability via final modifier.",
    level: "Beginner",
    codeExample: "private final String vehicleVinNumber;"
  },
  {
    question: "How does the 'Tell, Don't Ask' principle apply to Product order fulfillment?",
    shortAnswer: "Tell the product 'product.fulfillCustomerOrder(5)', rather than asking 'product.getStock()', subtracting externally, and calling 'product.setStock()'.",
    explanation: "Asking for stock and updating it externally leaks logic outside the class and invites race conditions. Telling the product to fulfill the order lets the product manage its own state safely.",
    hint: "Delegate behavior to the entity owning the data.",
    level: "Intermediate",
    codeExample: "// BAD (Ask): if (prod.getStock() >= 5) prod.setStock(prod.getStock() - 5);\n// GOOD (Tell): prod.fulfillCustomerOrder(5);"
  },
  {
    question: "Why does the BankAccount transaction history return 'Collections.unmodifiableList()'?",
    shortAnswer: "To prevent external callers from calling .clear(), .remove(), or .add() on the account's internal transaction audit log.",
    explanation: "Returning an unmodifiable view preserves the audit trail's integrity, ensuring transaction records are strictly append-only and tamper-proof.",
    hint: "Tamper-proof audit logging view.",
    level: "Intermediate",
    codeExample: "public List<String> getTransactionHistory() {\n    return Collections.unmodifiableList(this.transactionHistory);\n}"
  },
  {
    question: "How should an entity handle currency representation in enterprise Java systems?",
    shortAnswer: "Use 'java.math.BigDecimal' or minor currency units (cents/paise in 'long') for production; avoid binary floating-point round-off errors.",
    explanation: "While 'double' is suitable for conceptual tutorials, production financial engines use BigDecimal to eliminate floating-point representation anomalies (e.g. 0.1 + 0.2 = 0.30000000000000004).",
    hint: "BigDecimal for precision currency arithmetic in production.",
    level: "Advanced",
    codeExample: "private BigDecimal balance = new BigDecimal(\"15000.00\");"
  },
  {
    question: "What is an 'Aggregate Root' in Domain-Driven Design (DDD)?",
    shortAnswer: "The primary domain entity (e.g. BankAccount or Order) that acts as the gateway and invariant boundary for a cluster of associated objects.",
    explanation: "External components interact strictly with the Aggregate Root (BankAccount), which internally coordinates transaction entries and ledger lines.",
    hint: "Primary root entity guarding an entire cluster.",
    level: "Advanced",
    codeExample: "// BankAccount is the Aggregate Root managing Transaction entries"
  },
  {
    question: "How does the AutomobileCar simulate fuel consumption during acceleration?",
    shortAnswer: "Each acceleration increment deducts fuel proportionally: 'fuelLevel -= (deltaKmPerHour * 0.05)'.",
    explanation: "If fuel drops to 0 while driving, the car automatically stalls the engine ('stopEngine()'), demonstrating coupled multi-field state transitions.",
    hint: "Proportional fuel consumption based on acceleration delta.",
    level: "Intermediate",
    codeExample: "this.fuelLevel -= (delta * 0.05);\nif (this.fuelLevel <= 0) stopEngine(); // Auto-stall"
  },
  {
    question: "Can an Employee entity contain a reference to a BankAccount for automated salary disbursement?",
    shortAnswer: "Yes! OOP Association allows an Employee to hold a reference to a BankAccount and deposit monthly salary directly.",
    explanation: "Composition and Association allow modeling real-world workflows: 'employee.disburseSalaryTo(employeeAccount)'.",
    hint: "Object association for payroll integration.",
    level: "Beginner",
    codeExample: "public void disburseSalary(BankAccount account) {\n    account.deposit(calculateGrossMonthlySalary());\n}"
  },
  {
    question: "Why should the Product entity check for positive incoming units in 'restockInventory'?",
    shortAnswer: "To prevent accidental or malicious restocks with negative numbers from decreasing stock without sales.",
    explanation: "Allowing 'product.restockInventory(-50)' would act as an unlogged stock deduction, corrupting inventory accounting.",
    hint: "Restock operations must strictly require positive units.",
    level: "Beginner",
    codeExample: "if (incomingUnits <= 0) throw new IllegalArgumentException(\"Units must be positive\");"
  },
  {
    question: "What is 'Clamping' in AutomobileCar braking logic?",
    shortAnswer: "Ensuring speed never drops below 0 km/h: 'this.speed = Math.max(0, this.speed - delta)'.",
    explanation: "Braking hard should bring the car to a full stop (0 km/h) rather than causing negative velocity.",
    hint: "Speed bounded at minimum 0 km/h.",
    level: "Beginner",
    codeExample: "this.currentSpeedKmPerHour = Math.max(0, this.currentSpeedKmPerHour - delta);"
  },
  {
    question: "How does the Employee entity defend against illegal minimum wage violations in setters?",
    shortAnswer: "By rejecting any salary below statutory minimum wage (e.g. ₹15,000.00) with an IllegalArgumentException.",
    explanation: "The setter encodes labor law requirements directly into the entity, guaranteeing that no employee can ever be created or updated with an illegal sub-minimum wage.",
    hint: "Statutory compliance enforced in domain mutator.",
    level: "Intermediate",
    codeExample: "if (basicSalary < 15000.0) throw new IllegalArgumentException(\"Below minimum wage threshold\");"
  },
  {
    question: "What is 'Value Object' vs 'Entity' in domain modeling?",
    shortAnswer: "An Entity is defined by its continuous identity (ID/Account No); a Value Object is defined purely by its attributes (e.g. Money(100, \"INR\")).",
    explanation: "Two BankAccounts with ₹10,000 are distinct entities because they have different account numbers. Two Money objects of ₹10,000 are interchangeable value objects.",
    hint: "Identity-based Entity vs Attribute-based Value Object.",
    level: "Advanced",
    codeExample: "// Entity: BankAccount(id=101) != BankAccount(id=102)\n// Value Object: Money(100, \"INR\").equals(Money(100, \"INR\")) == true"
  },
  {
    question: "How should an entity handle concurrent modifications in multi-threaded banking systems?",
    shortAnswer: "By using synchronized methods, ReentrantLock, or Optimistic Locking (@Version in JPA) to serialize concurrent transactions.",
    explanation: "Synchronizing 'deposit' and 'withdraw' methods ensures that multiple threads attempting concurrent transfers cannot cause lost updates or negative balances.",
    hint: "Thread synchronization or optimistic version locks.",
    level: "Advanced",
    codeExample: "public synchronized boolean withdraw(double amt) { ... }"
  },
  {
    question: "Why should entity constructors enforce non-null arguments for mandatory fields?",
    shortAnswer: "To prevent objects from being instantiated in a 'half-baked' or corrupted state that throws NullPointerExceptions later in production.",
    explanation: "Using 'Objects.requireNonNull(name, \"Name required\")' guarantees that every live instance in memory is complete and well-formed from the moment of construction.",
    hint: "Constructors establish non-null validity at birth.",
    level: "Beginner",
    codeExample: "this.accountNumber = Objects.requireNonNull(accountNumber, \"Account number required\");"
  },
  {
    question: "What is the danger of returning mutable entity references from getters?",
    shortAnswer: "Callers can modify the internal state of child entities directly without passing through the parent aggregate's validation rules.",
    explanation: "If an Order entity returns its internal List of OrderLines directly, external code can add items without recalculating order totals or applying discounts.",
    hint: "Encapsulate aggregate child collections.",
    level: "Intermediate",
    codeExample: "public List<OrderLine> getLines() { return Collections.unmodifiableList(lines); }"
  },
  {
    question: "How does the AutomobileCar entity prevent accelerating past the maximum mechanical speed limit?",
    shortAnswer: "By capping maximum speed at 220 km/h: 'this.speed = Math.min(220, this.speed + delta)'.",
    explanation: "Physical vehicle constraints are encoded in domain rules to prevent impossible virtual speeds.",
    hint: "Upper bound clamping at top speed.",
    level: "Beginner",
    codeExample: "this.currentSpeedKmPerHour = Math.min(220, this.currentSpeedKmPerHour + delta);"
  },
  {
    question: "Can an Employee entity belong to multiple departments?",
    shortAnswer: "If domain rules allow it, the single department string can be refactored into a 'Set<Department>' without changing unrelated public methods.",
    explanation: "Encapsulation allows refactoring internal department storage while maintaining backward-compatible helper methods like 'isAssignedTo(Department)'.",
    hint: "Refactoring internal domain associations.",
    level: "Intermediate",
    codeExample: "private Set<String> departments = new HashSet<>();"
  },
  {
    question: "What is 'Domain Event Publishing' and when should a BankAccount publish events?",
    shortAnswer: "Emitting an event notification (e.g. 'AccountOverdrawnEvent', 'MoneyTransferredEvent') whenever significant state changes occur.",
    explanation: "Domain events decouple entities from notification systems, allowing SMS alerts or analytics pipelines to react asynchronously to banking actions.",
    hint: "Decoupled domain event notifications.",
    level: "Advanced",
    codeExample: "eventPublisher.publish(new FundTransferredEvent(from, to, amount));"
  },
  {
    question: "Why should entity toString() methods omit sensitive security data?",
    shortAnswer: "To prevent accidental logging of passwords, PINs, or full national identification numbers in server log files.",
    explanation: "A BankAccount's toString() should display masked account numbers ('****1001') and omit private security PINs to comply with financial privacy standards.",
    hint: "Prevent credential leakage in logging.",
    level: "Beginner",
    codeExample: "public String toString() { return \"Account[****\" + accNo.substring(accNo.length()-4) + \"]\"; }"
  },
  {
    question: "How does the Product entity support catalog categorization?",
    shortAnswer: "By maintaining category metadata alongside pricing and stock, enabling filtered searches and category-based discounting.",
    explanation: "Product entities encapsulate merchandising metadata that e-commerce engines use for inventory indexing and taxation rules.",
    hint: "Merchandising and classification metadata.",
    level: "Beginner",
    codeExample: "public String getCategory() { return category; }"
  },
  {
    question: "What is 'Bidirectional Association' and why must it be handled carefully in OOP?",
    shortAnswer: "When two entities hold references to each other (e.g. Employee <-> Department); mutators must update both sides to prevent desynchronization.",
    explanation: "If an employee changes departments, the employee must be removed from the old department's employee list and added to the new department's list simultaneously.",
    hint: "Synchronize both sides of bidirectional links.",
    level: "Advanced",
    codeExample: "public void setDepartment(Department d) { if (dept != null) dept.remove(this); d.add(this); dept = d; }"
  },
  {
    question: "Why is OOP Domain Modeling superior to procedural database table scripting?",
    shortAnswer: "OOP unites data and business rules into autonomous, self-defending objects that prevent invalid states anywhere in the application lifecycle.",
    explanation: "In procedural code, business logic is scattered across hundreds of queries and scripts. In OOP, the entity itself guarantees its own integrity 24/7.",
    hint: "Unified data and logic vs scattered procedural scripts.",
    level: "Intermediate",
    codeExample: "// Self-defending entities maintain system truth consistently across all layers"
  },
  {
    question: "What is Sukanta Hui's Living Agent Principle of OOP Domain Modeling?",
    shortAnswer: "Never design an entity as a passive corpse waiting for outside code to poke its fields. Design it as a living, intelligent agent that knows its rules, protects its honour, and defends its domain truth.",
    explanation: "At the Barrackpore academy, Sukanta Hui teaches that real-world software architecture thrives when entities (BankAccounts, Employees, Products, Cars) are empowered to enforce their own invariants. When entities defend themselves, your systems run robust, bug-free, and enterprise-grade.",
    hint: "Living, self-defending domain agents.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Living Agent Formula: Unique Identity + Private Encapsulated State + Guarded Domain Operations"
  }
];

export default topic16_questions;
