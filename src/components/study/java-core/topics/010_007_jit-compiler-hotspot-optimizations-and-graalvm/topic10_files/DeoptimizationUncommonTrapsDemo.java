/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 10: De-optimization & Uncommon Traps - Bailing Out Safely
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class DeoptimizationUncommonTrapsDemo {

    public interface FeeDiscount {
        double applyDiscount(double fee);
    }

    public static class StandardDiscount implements FeeDiscount {
        @Override public double applyDiscount(double fee) { return fee * 0.90; }
    }

    // New class introduced later at runtime:
    public static class SpecialScholarshipDiscount implements FeeDiscount {
        @Override public double applyDiscount(double fee) { return fee * 0.50; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: DE-OPTIMIZATION & UNCOMMON TRAPS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        FeeDiscount standard = new StandardDiscount();

        System.out.println(">>> 1. WARMING UP MONOMORPHIC CALL SITE (100% StandardDiscount):");
        for (int i = 0; i < 50_000; i++) {
            calculateFinalFee(standard, 1000.0);
        }
        System.out.println("  - JIT compiled calculateFinalFee() at Level 4 with speculative devirtualization!\n");

        System.out.println(">>> 2. BREAKING SPECULATIVE ASSUMPTION WITH NEW CLASS:");
        FeeDiscount special = new SpecialScholarshipDiscount();
        double fee = calculateFinalFee(special, 1000.0);
        System.out.println("  - Passed 'SpecialScholarshipDiscount' -> Uncommon Trap triggered!");
        System.out.println("  - HotSpot safely DE-OPTIMIZED back to Interpreter / C1!");
        System.out.println("  - Calculated Fee: ₹" + fee);

        System.out.println("\n==========================================================================");
    }

    static double calculateFinalFee(FeeDiscount discount, double baseFee) {
        return discount.applyDiscount(baseFee); // Speculatively inlined by C2
    }
}
