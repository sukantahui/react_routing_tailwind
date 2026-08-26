/**
 * File: RecursiveMethodsFoundationsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 12)
 * Description: Demonstrates the foundations of Recursive Methods in Java:
 *              1. Recursive Definition: Self-referential method calls
 *              2. The Base Case: Mandatory termination condition preventing infinite loops
 *              3. The Recursive Step: Progressing monotonically towards the base case
 *              4. Practical algorithm examples: Factorial, Sum of Series, and Compound Fee Accumulation
 *              for student milestone computations in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class RecursiveMethodsFoundationsDemo {

    // =========================================================================
    // 1. CLASSIC FACTORIAL: n! = n * (n - 1)!
    // =========================================================================
    public static long calculateFactorial(int n) {
        // Base Case (Termination Condition)
        if (n <= 1) {
            return 1;
        }

        // Recursive Step (Progresses towards base case via n - 1)
        return n * calculateFactorial(n - 1);
    }

    // =========================================================================
    // 2. RECURSIVE SUM OF FIRST N NATURAL NUMBERS
    // =========================================================================
    public static long calculateNaturalSum(int n) {
        // Base Case
        if (n <= 1) {
            return n;
        }

        // Recursive Step
        return n + calculateNaturalSum(n - 1);
    }

    // =========================================================================
    // 3. RECURSIVE COMPOUND FEE ACCUMULATION
    // =========================================================================
    /**
     * Calculates future course value after 'years' of compound annual growth (e.g. 10% inflation)
     */
    public static double calculateCompoundFee(double principal, double annualRate, int years) {
        // Base Case: 0 years left -> principal is final
        if (years <= 0) {
            return principal;
        }

        // Recursive Step: Apply 1 year growth and recursively process (years - 1)
        double grownAmount = principal * (1.0 + annualRate);
        return calculateCompoundFee(grownAmount, annualRate, years - 1);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 12 RECURSIVE METHODS FOUNDATIONS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. CALCULATING FACTORIAL RECURSIVELY ---\n");

        for (int n = 1; n <= 5; n++) {
            System.out.printf("  calculateFactorial(%d)  = %d%n", n, calculateFactorial(n));
        }

        System.out.println("\n--- 2. CALCULATING NATURAL SUM RECURSIVELY ---\n");

        int months = 10;
        long sumMonths = calculateNaturalSum(months);
        System.out.printf("  Sum of first %d months (1 + 2 + ... + %d) = %d%n", months, months, sumMonths);

        System.out.println("\n--- 3. CALCULATING COMPOUND TUITION FEE ACCUMULATION ---\n");

        double baseFee = 20000.0;
        double annualInflation = 0.08; // 8% annual inflation
        int targetYears = 4;

        double projectedFee = calculateCompoundFee(baseFee, annualInflation, targetYears);
        System.out.printf("  Base Course Fee               : ₹%,.2f%n", baseFee);
        System.out.printf("  Annual Growth Rate            : 8.0%%%n");
        System.out.printf("  Projected Fee in %d Years       : ₹%,.2f%n%n", targetYears, projectedFee);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Every recursive method MUST have at least one well-defined Base Case.");
        System.out.println("2. The Recursive Step must progress monotonically towards the Base Case.");
        System.out.println("3. Without a base case, recursion runs infinitely until StackOverflowError.");
        System.out.println("4. Recursion relies on the JVM Call Stack to remember intermediate sub-problems.");
        System.out.println("================================================================================");
    }
}
