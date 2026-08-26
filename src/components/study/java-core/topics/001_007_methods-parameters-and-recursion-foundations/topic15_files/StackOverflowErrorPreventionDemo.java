/**
 * File: StackOverflowErrorPreventionDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 15)
 * Description: Demonstrates the causes, mechanics, and prevention of java.lang.StackOverflowError:
 *              1. Unbounded infinite recursion causing Call Stack exhaustion
 *              2. Non-defensive boundary traps (e.g. n == 0 with negative inputs)
 *              3. Prevention techniques: Defensive base cases, depth guards, and iterative conversion
 *              for student fee schedule calculations in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class StackOverflowErrorPreventionDemo {

    private static int globalCallCounter = 0;

    // =========================================================================
    // 1. DANGEROUS RECURSION: Non-Defensive Base Case (Crashes on negative inputs)
    // =========================================================================
    public static long dangerousCountdownSum(int n) {
        // Anti-Pattern: Exact equality 'n == 0' misses negative numbers!
        if (n == 0) {
            return 0;
        }
        // If n = -1, n - 1 becomes -2, -3, -4 ... infinite descent!
        return n + dangerousCountdownSum(n - 1);
    }

    // =========================================================================
    // 2. DEFENSIVE RECURSION: Safe Base Case + Depth Guard
    // =========================================================================
    public static long safeDefensiveSum(int n, int currentDepth, int maxSafeDepth) {
        // Guard 1: Stack Depth Guard (Prevents runaway calls)
        if (currentDepth > maxSafeDepth) {
            System.out.printf("  [DEPTH GUARD TRIPPED] Aborting recursion at depth %d to prevent StackOverflowError!%n", currentDepth);
            return 0;
        }

        // Guard 2: Defensive Base Case (Handles 0, 1, and negative numbers safely)
        if (n <= 0) {
            return 0;
        }

        // Safe Recursive Step
        return n + safeDefensiveSum(n - 1, currentDepth + 1, maxSafeDepth);
    }

    // =========================================================================
    // 3. BULLETPROOF SOLUTION: Iterative Conversion (O(1) Stack Memory)
    // =========================================================================
    public static long iterativeSafeSum(int n) {
        if (n <= 0) return 0;
        long total = 0;
        for (int i = 1; i <= n; i++) {
            total += i; // O(1) stack memory, handles N = 1,000,000 without crashing!
        }
        return total;
    }

    // Controlled demonstrator to measure stack depth before failure
    public static void probeStackLimit(int depth) {
        globalCallCounter = depth;
        probeStackLimit(depth + 1); // Deliberate infinite recursion
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 15 STACKOVERFLOWERROR PREVENTION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. TESTING DEFENSIVE BASE CASE WITH NEGATIVE INPUTS ---\n");

        // Safe call with negative input:
        long resNeg = safeDefensiveSum(-5, 0, 100);
        System.out.printf("  safeDefensiveSum(-5) returned: %d (No Crash!)%n%n", resNeg);

        System.out.println("--- 2. TESTING STACK DEPTH GUARD PROTECTION ---\n");

        // Attempting deep call with maxSafeDepth = 50:
        long resGuarded = safeDefensiveSum(100, 0, 50);
        System.out.printf("  safeDefensiveSum(100, depthLimit=50) returned: %d%n%n", resGuarded);

        System.out.println("--- 3. TESTING ITERATIVE REFACTORING FOR LARGE N = 100,000 ---\n");

        // Iterative sum with N = 100,000 (would crash recursion immediately):
        long massiveSum = iterativeSafeSum(100_000);
        System.out.printf("  iterativeSafeSum(100,000) = %d (100%% Safe in O(1) Stack Space!)%n%n", massiveSum);

        System.out.println("--- 4. MEASURING JVM THREAD STACK LIMIT BEFORE STACKOVERFLOWERROR ---\n");

        try {
            probeStackLimit(1);
        } catch (StackOverflowError e) {
            System.out.printf("  [CAUGHT StackOverflowError] JVM Thread Stack exhausted at call depth: %,d frames!%n%n",
                    globalCallCounter);
        }

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. StackOverflowError is an Error (not Exception) thrown on Call Stack exhaustion.");
        System.out.println("2. Always use defensive base cases (n <= 0 instead of n == 0).");
        System.out.println("3. Refactor deep linear recursion (N > 5,000) into iterative for/while loops.");
        System.out.println("4. Configure thread stack size via -Xss if deep recursion is unavoidable.");
        System.out.println("================================================================================");
    }
}
