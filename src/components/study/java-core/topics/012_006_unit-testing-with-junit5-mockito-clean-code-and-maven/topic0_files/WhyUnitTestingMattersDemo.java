/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 0: Why Unit Testing is Non-Negotiable in Professional Development
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class WhyUnitTestingMattersDemo {

    public static class FeeCalculator {
        public static double calculateDiscountedFee(double baseFee, int attendancePercentage) {
            if (baseFee < 0) {
                throw new IllegalArgumentException("Base fee cannot be negative");
            }
            if (attendancePercentage > 90) {
                return baseFee * 0.80; // 20% scholarship discount for Barrackpore scholars
            }
            return baseFee;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY AUTOMATED UNIT TESTING IS NON-NEGOTIABLE");
        System.out.println(" EDUCATOR: SUKANTA HUI | ACADEMIC HUB: BARRACKPORE, WB");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. CORE BENEFITS OF AUTOMATED UNIT TESTING:");
        System.out.println("  - Zero Regression Fear : Immediate validation whenever codebase changes.");
        System.out.println("  - Living Documentation : Tests specify exact expected software behavior.");
        System.out.println("  - Faster Debugging     : Pinpoints defect root cause in milliseconds.");
        System.out.println("  - Better Architecture  : Testable code forces clean loose coupling.\n");

        System.out.println(">>> 2. MANUAL SMOKE TEST (FeeCalculator):");
        double fee = FeeCalculator.calculateDiscountedFee(5000.0, 95);
        System.out.println("  Discounted Fee for 95% attendance: ₹" + fee + " (Expected: ₹4000.0)");

        System.out.println("\n==========================================================================");
    }
}
