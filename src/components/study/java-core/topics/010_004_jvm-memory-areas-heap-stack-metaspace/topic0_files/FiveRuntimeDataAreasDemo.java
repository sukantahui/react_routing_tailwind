/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 0: The 5 Runtime Data Areas of the Java Virtual Machine
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;

public class FiveRuntimeDataAreasDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE 5 RUNTIME DATA AREAS OF THE JVM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
        MemoryUsage nonHeapUsage = memoryBean.getNonHeapMemoryUsage();

        System.out.println(">>> 1. THREAD-SHARED RUNTIME DATA AREAS (GLOBAL ACROSS ALL THREADS):");
        System.out.println("  A. HEAP MEMORY (Objects & Arrays):");
        System.out.println("     - Initial Heap (Xms) : " + (heapUsage.getInit() / (1024 * 1024)) + " MB");
        System.out.println("     - Used Heap          : " + (heapUsage.getUsed() / (1024 * 1024)) + " MB");
        System.out.println("     - Max Heap (Xmx)     : " + (heapUsage.getMax() / (1024 * 1024)) + " MB");
        System.out.println("  B. METASPACE / METHOD AREA (Class metadata, bytecode, constant pool):");
        System.out.println("     - Used Metaspace     : " + (nonHeapUsage.getUsed() / (1024 * 1024)) + " MB\n");

        System.out.println(">>> 2. THREAD-PRIVATE RUNTIME DATA AREAS (CREATED PER THREAD):");
        System.out.println("  C. JVM THREAD STACK   : Stack frames for active method calls (Local variables, Operand stack).");
        System.out.println("  D. PC REGISTER        : Program Counter pointing to currently executing bytecode opcode.");
        System.out.println("  E. NATIVE METHOD STACK: C/C++ execution stack for JNI operations.");

        System.out.println("\n==========================================================================");
    }
}
