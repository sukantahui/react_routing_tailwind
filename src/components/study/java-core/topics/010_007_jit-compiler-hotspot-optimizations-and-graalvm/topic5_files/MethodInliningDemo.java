/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 5: Method Inlining - The Holy Grail of JIT Optimization
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class MethodInliningDemo {

    public static class TuitionCalculator {
        // Small, hot helper method (Prime candidate for JIT Inlining!):
        public static double calculateMonthlyFee(double baseFee, double gstPercentage) {
            return baseFee + (baseFee * gstPercentage / 100.0);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: METHOD INLINING - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW METHOD INLINING WORKS:");
        System.out.println("  1. BEFORE INLINING (Bytecode level):");
        System.out.println("     - 'invokestatic calculateMonthlyFee' -> Pushes stack frame, copies args, jumps, returns, pops frame.\n");
        System.out.println("  2. AFTER JIT INLINING (Native Machine Code level):");
        System.out.println("     - JIT eliminates the method call completely!");
        System.out.println("     - Emits direct machine code: 'result = baseFee + (baseFee * gst / 100.0);' directly in main()!\n");

        System.out.println(">>> WHY INLINING ENABLES OTHER OPTIMIZATIONS:");
        System.out.println("  - Eliminates function call branch prediction penalty.");
        System.out.println("  - Exposes variables to Escape Analysis, Constant Folding, and Dead Code Elimination!");

        double fee = TuitionCalculator.calculateMonthlyFee(4000.0, 18.0);
        System.out.println("\n>>> Calculated Monthly Fee: ₹" + fee);
        System.out.println("==========================================================================");
    }
}
