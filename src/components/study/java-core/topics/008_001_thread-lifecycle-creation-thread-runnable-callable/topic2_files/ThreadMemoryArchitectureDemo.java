/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 2: Thread Memory Architecture: Shared Heap vs Private Call Stack & PC Register
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadMemoryArchitectureDemo {

    // 1. SHARED HEAP DATA (Accessible by ALL Threads -> Vulnerable to Race Conditions!):
    private static int sharedAccountBalance = 50000;

    public static void processTransaction(String studentName, int amount) {
        // 2. PRIVATE CALL STACK DATA (Local Variables -> 100% Thread-Safe!):
        int localFee = amount + 500; // Allocated exclusively on calling thread's private stack!
        System.out.printf("[%s Thread] Processing Local Fee: ₹%d (On Private Stack)%n", studentName, localFee);

        // Modifying shared heap state:
        sharedAccountBalance += localFee;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THREAD MEMORY ARCHITECTURE (HEAP vs STACK) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        processTransaction("Swadeep", 2000);
        processTransaction("Tuhina", 3000);

        System.out.println("\n>>> SHARED HEAP BALANCE AFTER TRANSACTIONS: ₹" + sharedAccountBalance);

        System.out.println("\n>>> JVM THREAD MEMORY BREAKDOWN:");
        System.out.println("  1. SHARED ACROSS ALL THREADS:");
        System.out.println("     - Java Heap Memory : Stores all object instances (new Student()) and static fields.");
        System.out.println("     - Metaspace        : Stores loaded class definitions, method bytecode, and constants.");
        System.out.println();
        System.out.println("  2. PRIVATE PER THREAD (ISOLATED):");
        System.out.println("     - Call Stack       : Stores stack frames for method invocations, local primitive variables, and object references.");
        System.out.println("     - PC Register      : Program Counter tracking the memory address of the next bytecode instruction to execute.");
        System.out.println("     - Native Stack     : For JNI C/C++ library invocations.");

        System.out.println("\n==========================================================================");
    }
}