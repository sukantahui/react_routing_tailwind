/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 2: Instruction Reordering: Compilers, JIT & Out-of-Order CPU Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class InstructionReorderingExplanationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: INSTRUCTION REORDERING & AS-IF-SERIAL SEMANTICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS INSTRUCTION REORDERING?");
        System.out.println("  - To maximize CPU instruction pipelining and memory throughput, 3 distinct layers reorder your code:");
        System.out.println("    1. Java Compiler (javac)      : Compiles code to optimize bytecode layout.");
        System.out.println("    2. JIT Compiler (HotSpot C2)  : Aggressively reorders machine instructions.");
        System.out.println("    3. Out-of-Order CPU Pipeline  : Modern x86/ARM processors execute instructions out of order if data dependencies allow!");
        System.out.println();
        System.out.println(">>> THE 'AS-IF-SERIAL' SEMANTICS RULE:");
        System.out.println("  - Compilers and CPUs are allowed to reorder ANY instructions as long as the result in a SINGLE THREAD is identical to source code order.");
        System.out.println("  - Example:");
        System.out.println("      int a = 1; // Line 1");
        System.out.println("      boolean ready = true; // Line 2");
        System.out.println("  - In single-threaded execution, the CPU can execute Line 2 BEFORE Line 1 with zero side effects!");
        System.out.println("  - In MULTITHREADED execution, another thread might observe 'ready == true' while 'a == 0' (uninitialized!), causing catastrophic bugs!");

        System.out.println("\n==========================================================================");
    }
}