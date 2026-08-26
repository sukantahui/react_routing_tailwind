/**
 * Java Core Tutorial - Module 004_006: Exception Handling Real-World Lab
 * Topic 0: Comprehensive Review of Segment 4: Throwable, Checked/Unchecked, ARM & Chaining
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class Segment4ExceptionGrandReviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: SEGMENT 4 GRAND ARCHITECTURAL REVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 6 PILLARS OF SEGMENT 4 EXCEPTION ARCHITECTURE:");
        System.out.println("  1. THROWABLE HIERARCHY : Error (Unrecoverable JVM faults) vs Exception (Recoverable).");
        System.out.println("  2. CHECKED vs UNCHECKED: Compile-time 'Catch or Specify' vs RuntimeException logic bugs.");
        System.out.println("  3. FLOW CONTROL        : Guaranteed 'finally' execution, return intercepts, nested delegation.");
        System.out.println("  4. CUSTOM DOMAIN TYPES : Extending Exception/RuntimeException with rich metadata & 4 constructors.");
        System.out.println("  5. TRY-WITH-RESOURCES  : AutoCloseable contract, LIFO teardown, and Suppressed Exceptions.");
        System.out.println("  6. PROPAGATION & CHAIN : Preserving root causes via 'initCause()' / constructor chaining.");

        System.out.println("\n>>> CLASSROOM BENCHMARK: Swadeep Paul, Tuhina Das, Abhronila Das, Debangshu Mukherjee");
        System.out.println(">>> Segment 4 provides the structural foundation for building bulletproof enterprise microservices!");

        System.out.println("\n==========================================================================");
    }
}