/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 5: Stop-The-World (STW) Pauses & JVM Safepoints
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class StwSafepointsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: STOP-THE-WORLD (STW) PAUSES & SAFEPOINTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS A STOP-THE-WORLD (STW) PAUSE:");
        System.out.println("  1. The JVM brings ALL active application threads (mutators) to a complete halt.");
        System.out.println("  2. During the pause, no application code executes; only GC threads run.");
        System.out.println("  3. Why necessary: Prevents object references from shifting while GC is copying memory!\n");

        System.out.println(">>> WHAT IS A JVM SAFEPOINT:");
        System.out.println("  - A predetermined point in bytecode execution where thread state is completely stable.");
        System.out.println("  - Safepoint locations: Loop backwards branches, method invocations, JNI returns.");
        System.out.println("  - JIT compiler injects polling instructions (Safepoint Polls) so threads check if GC requested a pause.");

        System.out.println("\n==========================================================================");
    }
}
