/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 7: volatile Guarantee 2: Hardware Memory Barriers & Preventing Reordering
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class VolatileMemoryBarriersInstructionFencesDemo {

    private static int preparedData = 0;
    // VOLATILE PUBLICATION FLAG:
    private static volatile boolean published = false;

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: volatile MEMORY BARRIERS & HARDWARE FENCES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW volatile PREVENTS INSTRUCTION REORDERING:");
        System.out.println("  1. Producer Thread Actions:");
        System.out.println("     preparedData = 9999;     // Plain write (Normal store)");
        System.out.println("     // [STORESTORE BARRIER INSERTED BY JVM]");
        System.out.println("     published = true;        // Volatile write (Release Barrier)");
        System.out.println();
        System.out.println("  2. Consumer Thread Actions:");
        System.out.println("     if (published) {         // Volatile read (Acquire Barrier)");
        System.out.println("         // [LOADLOAD & LOADSTORE BARRIERS INSERTED BY JVM]");
        System.out.println("         int x = preparedData;// Plain read (Guaranteed to see 9999!)");
        System.out.println("     }");
        System.out.println();
        System.out.println(">>> THE 4 CANONICAL JMM MEMORY BARRIERS:");
        System.out.println("  - StoreStore Barrier : Ensures all previous writes are flushed before the volatile write.");
        System.out.println("  - StoreLoad Barrier  : Prevents volatile write from being reordered with subsequent reads (heaviest fence).");
        System.out.println("  - LoadLoad Barrier   : Ensures volatile read happens before any subsequent reads.");
        System.out.println("  - LoadStore Barrier  : Ensures volatile read happens before any subsequent writes.");

        System.out.println("\n==========================================================================");
    }
}