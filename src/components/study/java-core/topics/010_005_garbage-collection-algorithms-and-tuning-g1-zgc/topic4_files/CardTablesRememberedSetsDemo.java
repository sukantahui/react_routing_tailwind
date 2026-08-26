/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 4: Card Tables & Remembered Sets (RSet) - Cross-Generational Pointer Tracking
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class CardTablesRememberedSetsDemo {

    public static class LongLivedCache {
        // Old Gen object holding a reference to a newly created Young Gen object:
        public Object youngStudentRef;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: CARD TABLES & REMEMBERED SETS (RSET) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LongLivedCache oldGenCache = new LongLivedCache(); // Assume promoted to Old Gen

        // Cross-generational pointer created (Old Gen object references Young Gen object):
        oldGenCache.youngStudentRef = new Student("Swadeep Paul");

        System.out.println(">>> THE CROSS-GENERATIONAL PROBLEM:");
        System.out.println("  - Problem: During Minor GC, how does the collector know 'Swadeep Paul' in Eden is referenced by an Old Gen object without scanning the entire Old Generation?");
        System.out.println("  - Solution: THE CARD TABLE & WRITE BARRIER!\n");

        System.out.println(">>> HOW THE CARD TABLE WORKS:");
        System.out.println("  1. The Old Gen memory is divided into 512-byte blocks called 'Cards'.");
        System.out.println("  2. A Card Table byte array maps 1 byte to every 512-byte card.");
        System.out.println("  3. JIT compiler injects a 'Write Barrier' assembly instruction on field writes (old.field = young).");
        System.out.println("  4. The Write Barrier marks that 512-byte card as 'DIRTY' (0x01).");
        System.out.println("  5. During Minor GC, the JVM only scans DIRTY cards instead of the whole Old Gen!");
        System.out.println("==========================================================================");
    }

    record Student(String name) {}
}
