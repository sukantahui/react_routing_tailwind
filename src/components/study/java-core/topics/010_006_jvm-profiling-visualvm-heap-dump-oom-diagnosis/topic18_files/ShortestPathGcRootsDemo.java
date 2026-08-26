/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 18: Shortest Path to GC Roots - Finding the Offending Pointer
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class ShortestPathGcRootsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 18: SHORTEST PATH TO GC ROOTS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> STEP-BY-STEP WORKFLOW IN ECLIPSE MAT:");
        System.out.println("  1. Right-click the leaked instance in Histogram or Dominator Tree.");
        System.out.println("  2. Select: 'Path to GC Roots' -> 'exclude all phantom/weak/soft references'.");
        System.out.println("  3. Examine the resulting tree of strong pointers:\n");

        System.out.println(">>> SAMPLE PATH TO GC ROOT TRACE:");
        System.out.println("  [GC ROOT] Java Thread 'http-nio-8080-exec-1' (Local variable: requestContext)");
        System.out.println("    └── com.coderaccotax...UserSessionContext (field: 'pendingOrders')");
        System.out.println("          └── java.util.ArrayList (field: 'elementData')");
        System.out.println("                └── Object[14] -> com.coderaccotax...StudentRecord (LEAKED OBJECT!)\n");

        System.out.println(">>> RESOLUTION:");
        System.out.println("  - Offending field identified: UserSessionContext.pendingOrders.");
        System.out.println("  - Fix: Clear 'pendingOrders' when request finishes!");
        System.out.println("==========================================================================");
    }
}
