/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 3: The Java Memory Model (JMM) Specification (JSR-133 Overhaul)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class JavaMemoryModelSpecificationOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: THE JAVA MEMORY MODEL (JMM / JSR-133) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS THE JAVA MEMORY MODEL (JMM)?");
        System.out.println("  - The JMM is the formal specification defining how threads interact through memory.");
        System.out.println("  - It defines exact rules for WHEN a write by one thread is GUARANTEED to become VISIBLE to another thread.");
        System.out.println("  - Major Overhaul: JSR-133 (Java 5.0) fixed the broken memory model of Java 1.4.");
        System.out.println();
        System.out.println(">>> THE TWO CRITICAL GUARANTEES OF JMM:");
        System.out.println("  1. Visibility  : Under what conditions does Thread B see the memory writes made by Thread A?");
        System.out.println("  2. Ordering    : Under what conditions does Thread B see memory operations occur in program source order?");
        System.out.println();
        System.out.println(">>> HOW JMM BRIDGES HARDWARE DIFFERENCES:");
        System.out.println("  - Intel x86 has strong hardware memory ordering (Total Store Order).");
        System.out.println("  - ARM / Apple Silicon has weak hardware memory ordering (aggressive reordering).");
        System.out.println("  - The JMM provides a UNIFIED, CROSS-PLATFORM contract: Write once, run correctly everywhere with identical memory semantics!");

        System.out.println("\n==========================================================================");
    }
}