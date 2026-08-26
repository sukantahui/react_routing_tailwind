/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 1: Tiered Compilation in HotSpot - The 5 Execution Levels (0 to 4)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class TieredCompilationOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: TIERED COMPILATION (LEVELS 0 TO 4) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 5 TIERS OF HOTSPOT COMPILATION:");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  TIER / LEVEL    ENGINE             PROFILING         PURPOSE");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  Level 0         Interpreter        Invocation count  Instant startup, counts hot methods.");
        System.out.println("  Level 1         C1 (Client)        None              Fast compilation, zero profiling.");
        System.out.println("  Level 2         C1 (Client)        Basic             Lightweight profiling (call counts).");
        System.out.println("  Level 3         C1 (Client)        Full MDO          Full profiling (branches, type feedback).");
        System.out.println("  Level 4         C2 (Server) / Graal None (Uses L3)   Aggressive, heavy optimization (peak speed).");
        System.out.println("  -----------------------------------------------------------------------------------------\n");

        System.out.println(">>> TIERED COMPILATION FLAGS:");
        System.out.println("  - Enabled by Default : -XX:+TieredCompilation");
        System.out.println("  - View Compilation   : -XX:+PrintCompilation (prints tier levels 1, 2, 3, 4)");
        System.out.println("==========================================================================");
    }
}
