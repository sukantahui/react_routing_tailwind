/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 8: Spurious Wakeups: POSIX Kernel Realities & Why Threads Wake Spontaneously
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class SpuriousWakeupsMechanismDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: SPURIOUS WAKEUPS MECHANICS & POSIX SIGNALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS A 'SPURIOUS WAKEUP'?");
        System.out.println("  - A Spurious Wakeup occurs when a waiting thread wakes up from 'wait()' WITHOUT any thread having called 'notify()' or 'notifyAll()', and without being interrupted or timing out!");
        System.out.println();
        System.out.println(">>> WHY DO SPURIOUS WAKEUPS OCCUR IN MODERN COMPUTERS?");
        System.out.println("  1. OS Kernel Design (POSIX Threads / Windows Kernel):");
        System.out.println("     - On Linux/Unix (pthreads) and Windows, low-level OS condition variables can experience spurious wakeups due to kernel interrupt handlers, context switch optimizations, or multi-core CPU signal broadcasts.");
        System.out.println("     - Eliminating spurious wakeups at the OS kernel level would cause severe performance penalties on multi-core hardware.");
        System.out.println("  2. Java Specification Guarantee:");
        System.out.println("     - Java Memory Model explicitly permits spurious wakeups.");
        System.out.println("     - Programmers MUST assume spurious wakeups CAN AND WILL HAPPEN!");
        System.out.println();
        System.out.println(">>> HOW TO DEFEND AGAINST SPURIOUS WAKEUPS (THE IMMUTABLE LAW):");
        System.out.println("  - ALWAYS check the condition inside a 'while' loop:");
        System.out.println("    while (!conditionReady) {");
        System.out.println("        lock.wait(); // If spurious wakeup happens, loop re-evaluates condition and goes back to sleep!");
        System.out.println("    }");

        System.out.println("\n==========================================================================");
    }
}