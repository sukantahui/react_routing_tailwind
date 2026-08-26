/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 3: Tiered Levels 1-3 - C1 (Client) Compiler & Profiling Tiers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class TieredLevels1To3C1Demo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: TIERED LEVELS 1 TO 3 (C1 COMPILER) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 SUB-TIERS OF THE C1 COMPILER:");
        System.out.println("  - Level 1 (Simple C1)   : Compiles directly to native code with NO profiling (used for trivial methods).");
        System.out.println("  - Level 2 (Limited C1)  : Compiles with invocation and backedge profiling counters.");
        System.out.println("  - Level 3 (Full C1 MDO) : Injects full MethodDataObjects (MDO) profiling probes into the native code!\n");

        System.out.println(">>> WHAT MDO (METHOD DATA OBJECTS) MEASURES AT LEVEL 3:");
        System.out.println("  1. Branch Probabilities : Is 'if (condition)' taken 99.9% of the time?");
        System.out.println("  2. Type Feedback        : Is the method parameter always 'StudentImpl' (Monomorphic call site)?");
        System.out.println("  3. Null Check Frequency : Is the reference ever null?");
        System.out.println("  4. Loop Iteration Counts: How many iterations do loops typically execute?");

        System.out.println("\n==========================================================================");
    }
}
