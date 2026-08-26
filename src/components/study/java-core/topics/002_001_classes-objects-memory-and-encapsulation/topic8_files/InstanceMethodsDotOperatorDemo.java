/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 8: Instance Methods: Invoking Behaviors on Objects via Dot (.) Operator
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Instance Methods, Dot Operator & Dynamic Dispatch
 * ----------------------------------------------------------------------------
 * 1. What is an Instance Method?
 *    - A method declared without the `static` keyword inside a class.
 *    - Represents a behavior or capability of an object that operates on the
 *      object's specific instance fields.
 *    - In JVM bytecode, every instance method receives an implicit first parameter:
 *      the `this` reference handle located at slot 0 of the Local Variable Table (LVT).
 *
 * 2. The Dot (`.`) Operator:
 *    - In Java, the dot operator is the member access operator.
 *    - When writing `swadeepAccount.creditStipend(5000.0);`, the dot operator:
 *        a) Evaluates the reference on the Stack (`swadeepAccount`).
 *        b) Checks for null (if null, JVM raises NullPointerException).
 *        c) Uses the `invokevirtual` bytecode instruction to locate the method
 *           in the class vtable (Virtual Method Table).
 *        d) Passes `swadeepAccount` as `this` and invokes the method body.
 *
 * 3. Method Chaining & Fluent API Design:
 *    - By returning `this` from mutator methods, callers can chain operations
 *      fluidly with the dot operator:
 *      `account.setBranch("Barrackpore").setTier("Gold").applyBonus(1500.0);`
 *
 * 4. Static vs Instance Method Dispatch:
 *    - Static Methods   : Dispatched via `invokestatic` at compile-time (no `this` parameter).
 *    - Instance Methods : Dispatched via `invokevirtual` at runtime (requires `this` in slot 0).
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

public class InstanceMethodsDotOperatorDemo {

    // ------------------------------------------------------------------------
    // Domain Class: StudentScholarshipAccount (Demonstrating Instance Behaviors)
    // ------------------------------------------------------------------------
    public static class StudentScholarshipAccount {
        private final int accountId;
        private final String studentName;
        private String campusBranch;
        private String scholarshipTier;
        private double balanceInr;
        private int totalTransactionsCount;

        // Constructor
        public StudentScholarshipAccount(int accountId, String studentName, String campusBranch, double initialDepositInr) {
            if (accountId <= 0) throw new IllegalArgumentException("Invalid Account ID");
            if (studentName == null || studentName.trim().isEmpty()) throw new IllegalArgumentException("Name required");
            if (initialDepositInr < 0.0) throw new IllegalArgumentException("Initial deposit cannot be negative");

            this.accountId = accountId;
            this.studentName = studentName.trim();
            this.campusBranch = campusBranch;
            this.scholarshipTier = "Standard";
            this.balanceInr = initialDepositInr;
            this.totalTransactionsCount = (initialDepositInr > 0) ? 1 : 0;
        }

        // --- Instance Behavior 1: Credit Stipend (Mutator Method) ---
        public boolean creditStipend(double amountInr, String remark) {
            if (amountInr <= 0.0) {
                System.out.println("  [Error] Credit amount must be strictly positive.");
                return false;
            }
            this.balanceInr += amountInr;
            this.totalTransactionsCount++;
            System.out.printf("  [Credit (+)] ₹%,.2f credited to %s (%s) | New Balance: ₹%,.2f\n",
                    amountInr, this.studentName, remark, this.balanceInr);
            return true;
        }

        // --- Instance Behavior 2: Debit Expense (Mutator Method with Invariant Validation) ---
        public boolean debitExpense(double amountInr, String purpose) {
            if (amountInr <= 0.0) {
                System.out.println("  [Error] Debit amount must be positive.");
                return false;
            }
            if (amountInr > this.balanceInr) {
                System.out.printf("  [Debit REJECTED] Insufficient funds for %s. Requested: ₹%,.2f | Available: ₹%,.2f\n",
                        this.studentName, amountInr, this.balanceInr);
                return false;
            }
            this.balanceInr -= amountInr;
            this.totalTransactionsCount++;
            System.out.printf("  [Debit (-)] ₹%,.2f debited for %s (%s) | New Balance: ₹%,.2f\n",
                    amountInr, this.studentName, purpose, this.balanceInr);
            return true;
        }

        // --- Instance Behavior 3: Fluent Chaining Mutator (Returns 'this') ---
        public StudentScholarshipAccount upgradeTier(String newTier) {
            if (newTier != null && !newTier.trim().isEmpty()) {
                this.scholarshipTier = newTier.trim();
                System.out.printf("  [Tier Upgrade] %s upgraded to tier: %s\n", this.studentName, this.scholarshipTier);
            }
            return this; // Returns current instance for method chaining
        }

        public StudentScholarshipAccount relocateBranch(String newCampus) {
            if (newCampus != null && !newCampus.trim().isEmpty()) {
                this.campusBranch = newCampus.trim();
                System.out.printf("  [Campus Relocation] %s relocated to campus: %s\n", this.studentName, this.campusBranch);
            }
            return this; // Returns current instance for method chaining
        }

        // --- Instance Behavior 4: Pure Calculation / Accessor ---
        public double calculateAnnualProjectedInterest(double annualRatePercent) {
            if (annualRatePercent <= 0.0) return 0.0;
            return (this.balanceInr * annualRatePercent) / 100.0;
        }

        // --- Instance Behavior 5: Formatted State Display ---
        public void displayStatement() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | Account ID     : SCH-%05d                                |\n", accountId);
            System.out.printf("  | Beneficiary    : %-42s |\n", studentName);
            System.out.printf("  | Campus Branch  : %-42s |\n", campusBranch);
            System.out.printf("  | Scholarship Tier: %-41s |\n", scholarshipTier);
            System.out.printf("  | Active Balance : ₹%-42.2f |\n", balanceInr);
            System.out.printf("  | Transactions   : %-42d |\n", totalTransactionsCount);
            System.out.printf("  | Heap Memory    : 0x%08X (Implicit 'this' handle)      |\n", System.identityHashCode(this));
            System.out.println("  +-------------------------------------------------------------+");
        }

        // Static Method: Dispatched via ClassName.method() without an instance
        public static void printAcademyScholarshipPolicy() {
            System.out.println("  [Static Policy] All West Bengal academy branches (Barrackpore, Naihati,");
            System.out.println("                  Shyamnagar, Ichapur) provide 100% verified merit stipends.");
        }

        // Getters
        public int getAccountId() { return accountId; }
        public String getStudentName() { return studentName; }
        public double getBalanceInr() { return balanceInr; }
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Demonstrations of Dot Operator & Behaviors
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA CORE: INSTANCE METHODS & DOT (.) OPERATOR BEHAVIOR INVOCATION");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Static Method vs Instance Method Invocations
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Static vs Instance Method Dispatch");
        System.out.println("Invoking static method via Class identifier (invokestatic):");
        StudentScholarshipAccount.printAcademyScholarshipPolicy();

        // --------------------------------------------------------------------
        // DEMO 2: Instantiating Object and Invoking Behaviors via Dot Operator
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 2: Invoking Instance Methods on Swadeep's Object (Barrackpore)");
        StudentScholarshipAccount swadeep = new StudentScholarshipAccount(
                101, "Swadeep Paul", "Barrackpore", 15000.00
        );

        // Dot operator member invocations
        swadeep.creditStipend(6000.00, "Merit Quarter 1 Stipend");
        swadeep.debitExpense(3200.00, "Advanced Java & Spring Boot Lab Courseware");
        swadeep.debitExpense(25000.00, "High-End Server Purchase"); // Will fail gracefully due to invariant guard
        swadeep.displayStatement();

        // --------------------------------------------------------------------
        // DEMO 3: Fluent Method Chaining via Return 'this'
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Fluent Method Chaining via Dot Operator on Tuhina's Object");
        StudentScholarshipAccount tuhina = new StudentScholarshipAccount(
                102, "Tuhina Das", "Naihati", 18000.00
        );

        System.out.println("Executing chained call: tuhina.upgradeTier(\"Platinum\").relocateBranch(\"Shyamnagar Central\").creditStipend(4500.0, \"Hackathon Prize\");");
        tuhina.upgradeTier("Platinum")
              .relocateBranch("Shyamnagar Central")
              .creditStipend(4500.00, "State Hackathon 1st Prize");

        tuhina.displayStatement();

        // --------------------------------------------------------------------
        // DEMO 4: Calculating Derived Values without Mutating State
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Invoking Pure Calculation Behaviors");
        double interestRate = 6.5; // 6.5% per annum
        double swadeepInterest = swadeep.calculateAnnualProjectedInterest(interestRate);
        double tuhinaInterest = tuhina.calculateAnnualProjectedInterest(interestRate);

        System.out.printf("  Swadeep Projected Annual Interest @ %.1f%% : ₹%,.2f\n", interestRate, swadeepInterest);
        System.out.printf("  Tuhina Projected Annual Interest  @ %.1f%% : ₹%,.2f\n", interestRate, tuhinaInterest);

        System.out.println("\n==========================================================================");
        System.out.println(" INSTANCE METHODS & DOT OPERATOR DEMONSTRATION COMPLETE");
        System.out.println("==========================================================================");
    }
}
