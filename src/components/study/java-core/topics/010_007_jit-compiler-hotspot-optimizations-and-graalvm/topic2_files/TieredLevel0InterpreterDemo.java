/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 2: Tiered Level 0 - Interpreted Bytecode & Invocation Counters
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class TieredLevel0InterpreterDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: TIERED LEVEL 0 (INTERPRETED BYTECODE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW LEVEL 0 OPERATES (Template Interpreter):");
        System.out.println("  1. When JVM boots, it maps each bytecode opcode to a tiny snippet of native assembly code.");
        System.out.println("  2. Level 0 executes instructions directly without compiling the entire method.");
        System.out.println("  3. HotSpot maintains TWO internal counters per method:");
        System.out.println("     - Invocation Counter : Incremented every time the method is called.");
        System.out.println("     - Backedge Counter   : Incremented every time a loop executes a backward jump.\n");

        System.out.println(">>> TRIGGERING COMPILATION:");
        System.out.println("  - When (Invocation Counter + Backedge Counter) > CompileThreshold:");
        System.out.println("  - The JVM queues a compilation request to the C1 JIT Compiler thread (Level 3)!");
        System.out.println("==========================================================================");
    }
}
