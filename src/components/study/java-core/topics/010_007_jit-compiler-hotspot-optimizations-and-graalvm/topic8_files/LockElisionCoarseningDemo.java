/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 8: Lock Elision & Lock Coarsening - JIT Concurrency Optimizations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class LockElisionCoarseningDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: LOCK ELISION & LOCK COARSENING - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. LOCK ELISION (Removing Redundant Synchronization):");
        System.out.println("  - Example: Calling 'StringBuffer.append()' inside a local method.");
        System.out.println("  - In Java source : 'public synchronized StringBuffer append(String s) { ... }'");
        System.out.println("  - Escape Analysis: Proves the StringBuffer NEVER escapes the method.");
        System.out.println("  - JIT Compilation: JIT completely REMOVES the lock in native assembly! Zero locking overhead!\n");

        System.out.println(">>> 2. LOCK COARSENING (Merging Consecutive Locks):");
        System.out.println("  - Code written by developer:");
        System.out.println("    synchronized(lock) { doTask1(); }");
        System.out.println("    synchronized(lock) { doTask2(); }");
        System.out.println("    synchronized(lock) { doTask3(); }\n");
        System.out.println("  - JIT Native Code: Merges all 3 into ONE single synchronized block around all three calls!");
        System.out.println("  - Eliminates 2 redundant lock acquire and release cycles!");

        System.out.println("\n==========================================================================");
    }
}
