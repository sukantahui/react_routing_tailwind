/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 5: Multiple Reference Variables Pointing to the Same Object (Aliasing)
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Object Aliasing & Shared Mutable State
 * ----------------------------------------------------------------------------
 * In Java:
 * 1. An object resides in a single contiguous block of Heap memory.
 * 2. When one reference variable is assigned to another:
 *        BatchProjectAccount primaryLead = new BatchProjectAccount("AI Automation Lab", 45000.00);
 *        BatchProjectAccount coLead = primaryLead;
 *        BatchProjectAccount auditor = primaryLead;
 *    No new object is created on the Heap!
 *    Instead, the Stack memory slots for `primaryLead`, `coLead`, and `auditor`
 *    all store the identical 64-bit/32-bit Heap memory address pointer (e.g. 0x4A12B890).
 *
 * 3. Side Effects of Shared Mutable State:
 *    - Any mutation executed through `coLead.spendBudget(5000.0)` directly modifies
 *      the single shared object on the Heap.
 *    - When `auditor` or `primaryLead` inspects the state, they immediately see the reduced budget.
 *
 * 4. Partial Nullification:
 *    - If `primaryLead = null;`, the Heap object is NOT garbage collected because
 *      `coLead` and `auditor` are still active GC Roots holding valid pointers!
 *    - An object is only eligible for GC when ALL reference variables are severed.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

public class MultipleReferencesSingleObjectDemo {

    // ------------------------------------------------------------------------
    // Domain Class: BatchProjectAccount (Shared Financial Ledger)
    // ------------------------------------------------------------------------
    public static class BatchProjectAccount {
        private String projectTitle;
        private String leadStudent;
        private String campusBranch;
        private double allocatedBudgetInr;
        private double totalExpensesInr;

        public BatchProjectAccount(String projectTitle, String leadStudent, String campusBranch, double allocatedBudgetInr) {
            this.projectTitle = projectTitle;
            this.leadStudent = leadStudent;
            this.campusBranch = campusBranch;
            this.allocatedBudgetInr = allocatedBudgetInr;
            this.totalExpensesInr = 0.0;
        }

        // State Mutator
        public void recordExpense(String description, double amountInr, String recordedBy) {
            if (amountInr <= 0.0) {
                System.out.println("  [Error] Expense amount must be positive.");
                return;
            }
            if ((this.totalExpensesInr + amountInr) > this.allocatedBudgetInr) {
                System.out.printf("  [Budget Alert] Expense of ₹%.2f rejected! Exceeds remaining budget.\n", amountInr);
                return;
            }
            this.totalExpensesInr += amountInr;
            System.out.printf("  [Expense Recorded by %-12s] %-25s : -₹%,9.2f | Remaining: ₹%,9.2f\n",
                    recordedBy, description, amountInr, (this.allocatedBudgetInr - this.totalExpensesInr));
        }

        public void printLedgerSummary(String accessorLabel) {
            double remainingBudget = this.allocatedBudgetInr - this.totalExpensesInr;
            System.out.printf("  +--- [Accessed via %-18s] -------------------------+\n", accessorLabel);
            System.out.printf("  | Project Title   : %-37s |\n", projectTitle);
            System.out.printf("  | Lead Student    : %-37s |\n", leadStudent);
            System.out.printf("  | Campus Branch   : %-37s |\n", campusBranch);
            System.out.printf("  | Initial Budget  : ₹%-37.2f |\n", allocatedBudgetInr);
            System.out.printf("  | Total Expenses  : ₹%-37.2f |\n", totalExpensesInr);
            System.out.printf("  | Available Funds : ₹%-37.2f |\n", remainingBudget);
            System.out.printf("  | Heap Memory Hash: 0x%08X (Physical Object Identity)      |\n", System.identityHashCode(this));
            System.out.println("  +-------------------------------------------------------------+");
        }

        // Accessors
        public String getProjectTitle() { return projectTitle; }
        public double getRemainingBudget() { return allocatedBudgetInr - totalExpensesInr; }
    }

    // ------------------------------------------------------------------------
    // Method: External Service Receiving an Aliased Reference
    // ------------------------------------------------------------------------
    public static void auditAndApproveGrant(BatchProjectAccount accountReference, double grantAmountInr) {
        System.out.println("  --> [Audit Service Invoked] Account pointer received: 0x"
                + Integer.toHexString(System.identityHashCode(accountReference)).toUpperCase());
        accountReference.recordExpense("Hardware Lab Upgrade Grant", grantAmountInr, "External Auditor");
        System.out.println("  <-- [Audit Service Completed]\n");
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Aliasing, Mutation Ripple & GC Trace
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: MULTIPLE REFERENCES POINTING TO A SINGLE OBJECT");
        System.out.println(" Educator: Sukanta Hui | Locations: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // STAGE 1: Creating 1 Heap Object with 3 Stack Reference Variables
        // --------------------------------------------------------------------
        System.out.println(">>> STAGE 1: Instantiating Single Shared Project Account");
        System.out.println("Executing: BatchProjectAccount leadRef = new BatchProjectAccount(...);");

        BatchProjectAccount leadRef = new BatchProjectAccount(
                "Barrackpore AI & Robotics Lab",
                "Swadeep Paul",
                "Barrackpore",
                75000.00
        );

        System.out.println("Creating two aliases pointing to leadRef:");
        System.out.println("  BatchProjectAccount coLeadRef = leadRef;");
        System.out.println("  BatchProjectAccount financeAuditorRef = leadRef;\n");

        BatchProjectAccount coLeadRef = leadRef;
        BatchProjectAccount financeAuditorRef = leadRef;

        // Checking Reference Equality (Identity Comparison)
        System.out.println(">>> Verifying Memory Identity using '==' Operator:");
        System.out.println("  (leadRef == coLeadRef)            : " + (leadRef == coLeadRef) + " (Identical Heap Address)");
        System.out.println("  (coLeadRef == financeAuditorRef)  : " + (coLeadRef == financeAuditorRef) + " (Identical Heap Address)");
        System.out.printf("  leadRef Stack Pointer             : 0x%08X\n", System.identityHashCode(leadRef));
        System.out.printf("  coLeadRef Stack Pointer           : 0x%08X\n", System.identityHashCode(coLeadRef));
        System.out.printf("  financeAuditorRef Stack Pointer   : 0x%08X\n\n", System.identityHashCode(financeAuditorRef));

        leadRef.printLedgerSummary("leadRef (Swadeep)");

        // --------------------------------------------------------------------
        // STAGE 2: Mutation via coLeadRef (Tuhina) Affects All References
        // --------------------------------------------------------------------
        System.out.println("\n>>> STAGE 2: Mutating State via 'coLeadRef' (Tuhina in Naihati)");
        System.out.println("Executing: coLeadRef.recordExpense(\"Sensors & Microcontrollers\", 18500.0, \"Tuhina\");");

        coLeadRef.recordExpense("Sensors & Microcontrollers", 18500.00, "Tuhina Das");

        System.out.println("\nInspecting ledger through the OTHER two reference variables:");
        leadRef.printLedgerSummary("leadRef (Swadeep)");
        financeAuditorRef.printLedgerSummary("financeAuditorRef");

        // --------------------------------------------------------------------
        // STAGE 3: External Method Mutation via Method Parameter Alias
        // --------------------------------------------------------------------
        System.out.println("\n>>> STAGE 3: Passing Alias to External Service Method");
        auditAndApproveGrant(financeAuditorRef, 12000.00);

        System.out.println("State seen by leadRef after audit service finished:");
        leadRef.printLedgerSummary("leadRef (Swadeep)");

        // --------------------------------------------------------------------
        // STAGE 4: Severing References (Nullification) & Object Reachability
        // --------------------------------------------------------------------
        System.out.println("\n>>> STAGE 4: Severing Reference 1 (leadRef = null)");
        System.out.println("Executing: leadRef = null;");
        leadRef = null;
        System.out.println("Note: 'leadRef' is null, but the Heap object is NOT collected because");
        System.out.println("      'coLeadRef' and 'financeAuditorRef' are still active GC Roots!\n");

        System.out.println("Executing: coLeadRef = null;");
        coLeadRef = null;
        System.out.println("Note: Only 1 reference remains ('financeAuditorRef').\n");

        financeAuditorRef.printLedgerSummary("financeAuditorRef");

        System.out.println("Executing: financeAuditorRef = null;");
        financeAuditorRef = null;
        System.out.println("Result: All references are now severed (0 active GC Roots).");
        System.out.println("        The BatchProjectAccount object on the Heap is now 100% eligible for GC!");

        System.out.println("\n==========================================================================");
        System.out.println(" MULTIPLE REFERENCES (ALIASING) DEMONSTRATION COMPLETE");
        System.out.println("==========================================================================");
    }
}
