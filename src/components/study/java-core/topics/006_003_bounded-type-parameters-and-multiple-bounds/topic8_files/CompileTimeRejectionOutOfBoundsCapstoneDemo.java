/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 8: Compile-Time Rejection of Out-of-Bound Type Arguments (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

class BoundedTaxLedger<T extends Number> {
    private final T totalAmount;
    public BoundedTaxLedger(T amt) { this.totalAmount = amt; }
    public double getAmount() { return totalAmount.doubleValue(); }
}

public class CompileTimeRejectionOutOfBoundsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: COMPILE-TIME BOUND REJECTION CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. VALID TYPE ARGUMENTS (Within Upper Bound 'Number'):
        BoundedTaxLedger<Double> valid1 = new BoundedTaxLedger<>(8500.50);
        BoundedTaxLedger<Integer> valid2 = new BoundedTaxLedger<>(5000);
        System.out.println(">>> 1. Valid Bounded Instantiations Accepted by Compiler:");
        System.out.println("  Valid Double Ledger : ₹" + valid1.getAmount());
        System.out.println("  Valid Integer Ledger: ₹" + valid2.getAmount());

        // 2. INVALID TYPE ARGUMENTS (Rejected at Compile Time by javac):
        System.out.println("\n>>> 2. HOW THE COMPILER REJECTS OUT-OF-BOUND ARGUMENTS:");
        System.out.println("  Code: 'BoundedTaxLedger<String> invalid = new BoundedTaxLedger<>("₹5000");'");
        System.out.println("  Compile Error: 'type argument java.lang.String is not within bounds of type-variable T'");
        System.out.println("  Reason: String does not extend java.lang.Number!");

        System.out.println("\n>>> 3 CORE BENEFITS OF COMPILE-TIME REJECTION:");
        System.out.println("  1. Zero Runtime Cost: Type safety verified entirely at compile time.");
        System.out.println("  2. Eliminates Defensive Type Checking: No 'if (!(obj instanceof Number))' code required.");
        System.out.println("  3. Self-Documenting APIs: Generic signatures communicate constraints clearly to other engineers.");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 006_003 BOUNDED TYPE PARAMETERS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}