/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 4: Program Counter (PC) Register - Bytecode Instruction Pointer
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class ProgramCounterPcRegisterDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: PROGRAM COUNTER (PC) REGISTER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS THE PROGRAM COUNTER (PC) REGISTER:");
        System.out.println("  1. Each Java thread has its own private PC Register created when the thread starts.");
        System.out.println("  2. If the thread is executing a Java method, PC holds the offset/address of the current bytecode instruction.");
        System.out.println("  3. If executing a Native (C/C++) method, the PC Register value is 'undefined'.\n");

        System.out.println(">>> ROLE DURING THREAD CONTEXT SWITCHING:");
        System.out.println("  - When CPU switches from Thread 1 to Thread 2, Thread 1's PC is saved.");
        System.out.println("  - When Thread 1 resumes, the CPU reads its PC Register to continue execution at the exact instruction!\n");

        System.out.println(">>> UNIQUE JVM PROPERTY:");
        System.out.println("  - The PC Register is the ONLY memory area in the JVM specification that NEVER throws OutOfMemoryError!");
        System.out.println("==========================================================================");
    }
}
