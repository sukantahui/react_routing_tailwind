/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 9: Anonymous Objects: Creation and Valid Use Cases
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Anonymous Objects & The Fire-and-Forget Pattern
 * ----------------------------------------------------------------------------
 * 1. What is an Anonymous Object?
 *    - An object instantiated using the `new` keyword WITHOUT assigning its
 *      Heap reference address to a named reference variable on the Stack frame.
 *    - Syntax:
 *          new NotificationDispatcher("Barrackpore").sendSmsAlert("Swadeep", "Exam at 10 AM");
 *
 * 2. Lifecycle & Memory Dynamics:
 *    - Phase 1: JVM allocates Heap memory in Eden space.
 *    - Phase 2: Constructor executes and returns the 64-bit Heap address pointer.
 *    - Phase 3: The method (e.g. `sendSmsAlert`) executes using that pointer as `this`.
 *    - Phase 4: Statement completes. No variable on the Stack holds the pointer.
 *    - Phase 5: The object has ZERO active GC Roots and becomes immediately
 *               eligible for Garbage Collection reclamation.
 *
 * 3. The 4 Valid Production Use Cases:
 *    - Use Case 1: Single-use method invocation (Fire-and-forget execution).
 *    - Use Case 2: Passing as a transient argument to another method.
 *    - Use Case 3: Returning a fresh instance directly from a factory method.
 *    - Use Case 4: Temporary calculation / formatting helper execution.
 *
 * 4. Critical Anti-Pattern to Avoid:
 *    - Invoking multiple methods on separate anonymous objects expecting state retention:
 *          new BankAccount().deposit(5000);
 *          new BankAccount().withdraw(2000); // OPERATES ON A BRAND NEW OBJECT WITH ZERO BALANCE!
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

public class AnonymousObjectsAndUseCasesDemo {

    // ------------------------------------------------------------------------
    // Helper Class 1: NotificationDispatcher (Single-Use Task Execution)
    // ------------------------------------------------------------------------
    public static class NotificationDispatcher {
        private String campusHub;

        public NotificationDispatcher(String campusHub) {
            this.campusHub = campusHub;
        }

        public void dispatchSmsNotification(String recipient, String messageText) {
            System.out.printf("  [SMS SENT] To: %-15s | Campus: %-12s | Text: '%s' | Heap: 0x%08X\n",
                    recipient, campusHub, messageText, System.identityHashCode(this));
        }

        public void dispatchEmailDigest(String recipient, String reportTitle) {
            System.out.printf("  [EMAIL SENT] To: %-13s | Campus: %-12s | Title: '%s' | Heap: 0x%08X\n",
                    recipient, campusHub, reportTitle, System.identityHashCode(this));
        }
    }

    // ------------------------------------------------------------------------
    // Helper Class 2: PaymentGatewayReceipt (Transient Method Parameter)
    // ------------------------------------------------------------------------
    public static class PaymentGatewayReceipt {
        private String transactionId;
        private String studentName;
        private double feeAmountInr;

        public PaymentGatewayReceipt(String transactionId, String studentName, double feeAmountInr) {
            this.transactionId = transactionId;
            this.studentName = studentName;
            this.feeAmountInr = feeAmountInr;
        }

        public String getTransactionId() { return transactionId; }
        public String getStudentName() { return studentName; }
        public double getFeeAmountInr() { return feeAmountInr; }
    }

    // ------------------------------------------------------------------------
    // Helper Class 3: FeeAccountingLedger (Consumes Transient Anonymous Objects)
    // ------------------------------------------------------------------------
    public static class FeeAccountingLedger {
        private String ledgerBranch;
        private double cumulativeRevenueInr;

        public FeeAccountingLedger(String ledgerBranch) {
            this.ledgerBranch = ledgerBranch;
            this.cumulativeRevenueInr = 0.0;
        }

        // Method that accepts an anonymous or named PaymentGatewayReceipt
        public void processFeePayment(PaymentGatewayReceipt receipt) {
            this.cumulativeRevenueInr += receipt.getFeeAmountInr();
            System.out.printf("  [LEDGER RECORDED] Txn: %-10s | Student: %-12s | Paid: ₹%,9.2f | Ledger Total: ₹%,9.2f (Receipt Heap: 0x%08X)\n",
                    receipt.getTransactionId(), receipt.getStudentName(), receipt.getFeeAmountInr(),
                    this.cumulativeRevenueInr, System.identityHashCode(receipt));
        }
    }

    // ------------------------------------------------------------------------
    // Helper Class 4: Anti-Pattern Demonstrator (State Loss Across Calls)
    // ------------------------------------------------------------------------
    public static class TraineeScoreCard {
        private int totalPoints = 0;

        public void addScore(int points) {
            this.totalPoints += points;
            System.out.printf("    addScore(%d) on Object 0x%08X -> totalPoints = %d\n",
                    points, System.identityHashCode(this), this.totalPoints);
        }

        public void printFinalScore() {
            System.out.printf("    printFinalScore() on Object 0x%08X -> totalPoints = %d\n",
                    System.identityHashCode(this), this.totalPoints);
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Demonstrations of Anonymous Objects
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA CORE: ANONYMOUS OBJECTS (CREATION & PRODUCTION USE CASES)");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // USE CASE 1: Single-Use Method Invocation (Fire-and-Forget)
        // --------------------------------------------------------------------
        System.out.println(">>> USE CASE 1: Single-Use Fire-and-Forget Method Execution");
        System.out.println("Executing: new NotificationDispatcher(\"Barrackpore\").dispatchSmsNotification(...);");
        System.out.println("Note: No reference variable on Stack. Object is created, executes, and becomes GC candidate:\n");

        new NotificationDispatcher("Barrackpore")
                .dispatchSmsNotification("Swadeep Paul", "Your Java Fullstack Lab begins tomorrow at 10:00 AM.");

        new NotificationDispatcher("Naihati")
                .dispatchEmailDigest("Tuhina Das", "Weekly Spring Boot Architecture Assessment Report");

        // --------------------------------------------------------------------
        // USE CASE 2: Passing Anonymous Object as a Transient Parameter
        // --------------------------------------------------------------------
        System.out.println("\n>>> USE CASE 2: Passing Anonymous Object as Method Parameter");
        FeeAccountingLedger barrackporeLedger = new FeeAccountingLedger("Barrackpore Main");

        System.out.println("Calling ledger.processFeePayment(new PaymentGatewayReceipt(...));");
        barrackporeLedger.processFeePayment(
                new PaymentGatewayReceipt("TXN-9081", "Swadeep Paul", 8500.00)
        );

        barrackporeLedger.processFeePayment(
                new PaymentGatewayReceipt("TXN-9082", "Tuhina Das", 9200.00)
        );

        barrackporeLedger.processFeePayment(
                new PaymentGatewayReceipt("TXN-9083", "Abhronila Ray", 7500.00)
        );

        // --------------------------------------------------------------------
        // USE CASE 3: Anonymous Object in Chained Fluent Calls
        // --------------------------------------------------------------------
        System.out.println("\n>>> USE CASE 3: Temporary Calculation & Immediate Formatting");
        double baseFee = 10000.00;
        double taxAmount = new Object() {
            double calculateGst(double amount) {
                return amount * 0.18; // 18% GST calculation
            }
        }.calculateGst(baseFee);

        System.out.printf("  Calculated GST for base fee ₹%,.2f via anonymous helper: ₹%,.2f\n", baseFee, taxAmount);

        // --------------------------------------------------------------------
        // DEMO 4: The Dangerous Anti-Pattern: State Loss Across Multiple Calls
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: CRITICAL PITFALL - State Loss from Repeated Anonymous Instantiations");
        System.out.println("Beginner Mistake: Attempting to accumulate state across separate 'new' calls:");
        System.out.println("  new TraineeScoreCard().addScore(50);");
        System.out.println("  new TraineeScoreCard().addScore(30);");
        System.out.println("  new TraineeScoreCard().printFinalScore();\n");

        System.out.println("Execution Output:");
        new TraineeScoreCard().addScore(50);
        new TraineeScoreCard().addScore(30);
        new TraineeScoreCard().printFinalScore(); // Prints 0! Because it's a 3rd distinct object!

        System.out.println("\nCorrect Approach: Use a Named Reference Variable for Stateful Operations:");
        TraineeScoreCard namedCard = new TraineeScoreCard();
        namedCard.addScore(50);
        namedCard.addScore(30);
        namedCard.printFinalScore(); // Correctly prints 80!

        System.out.println("\n==========================================================================");
        System.out.println(" ANONYMOUS OBJECTS DEMONSTRATION COMPLETE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================");
    }
}
