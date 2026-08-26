/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 15: Thread Creation Approaches Comparison: Thread vs Runnable vs Callable
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadCreationComparisonGrandMatrixDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: THREAD CREATION APPROACHES GRAND MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 THREAD CREATION MECHANISMS COMPARED:");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| Creation Approach | Inheritance Slot? | Return Value?     | Checked Exception?| Thread Pool Reuse?|");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| 1. Extends Thread | BURNS SLOT (Bad)  | NO (void)         | NO                | NO (Tightly bound)|");
        System.out.println("| 2. Runnable Class | PRESERVED (Good)  | NO (void)         | NO                | YES (Direct reuse)|");
        System.out.println("| 3. Runnable Lambda| PRESERVED (Clean) | NO (void)         | NO                | YES (Inline tasks)|");
        System.out.println("| 4. Callable<V>    | PRESERVED (Best)  | YES (Returns <V>) | YES (throws Ex)   | YES (Via Future)  |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+-------------------+");

        System.out.println("\n>>> ARCHITECTURAL RECOMMENDATION FOR MODERN JAVA APPLICATIONS:");
        System.out.println("  - Use Runnable Lambda : For simple fire-and-forget background asynchronous jobs (e.g. sending logs/emails).");
        System.out.println("  - Use Callable<V>     : For tasks that compute values, query databases, or call external REST APIs.");
        System.out.println("  - AVOID Extends Thread: Never subclass Thread in production architectures.");

        System.out.println("\n==========================================================================");
    }
}