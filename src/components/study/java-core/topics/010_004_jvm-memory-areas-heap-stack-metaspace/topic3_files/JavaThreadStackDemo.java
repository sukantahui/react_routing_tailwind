/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 3: Java Thread Stack - Private Method Execution Frames
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class JavaThreadStackDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: JAVA THREAD STACK - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. INITIATING METHOD CALL CHAIN (Pushing Stack Frames):");
        methodA("Swadeep Paul", 101);

        System.out.println("\n>>> STACK MEMORY PROPERTIES:");
        System.out.println("  1. Thread Isolation: Thread A cannot access Thread B's stack frame.");
        System.out.println("  2. Zero GC Cost    : Memory is automatically freed when the frame pops on method return.");
        System.out.println("  3. Size Tuning     : '-Xss' controls stack size per thread (default ~1MB).");
        System.out.println("==========================================================================");
    }

    static void methodA(String studentName, int id) {
        System.out.println("   --> Entering methodA() [Stack Frame 1 Pushed]");
        int internalCalculatedScore = 95;
        methodB(studentName, internalCalculatedScore);
        System.out.println("   <-- Exiting methodA() [Stack Frame 1 Popped]");
    }

    static void methodB(String studentName, int score) {
        System.out.println("      --> Entering methodB() [Stack Frame 2 Pushed]");
        System.out.println("      --> Student: " + studentName + " | Score: " + score + "%");
        System.out.println("      <-- Exiting methodB() [Stack Frame 2 Popped]");
    }
}
