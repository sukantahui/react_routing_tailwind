/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 16: The MAT Dominator Tree - Retained Memory Accumulation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class MatDominatorTreeDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: THE MAT DOMINATOR TREE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS A DOMINATOR IN GRAPH THEORY:");
        System.out.println("  - Node A 'dominates' Node B if EVERY path from the GC Roots to B must pass through A.");
        System.out.println("  - Consequence: If Node A is garbage collected, Node B is GUARANTEED to become unreachable and collected too!\n");

        System.out.println(">>> DOMINATOR TREE HIERARCHY EXAMPLE:");
        System.out.println("  [GC ROOT] -> StudentRegistry (Dominator) [Retained Heap: 500 MB]");
        System.out.println("                 ├── HashMap$Node[]        [Retained Heap: 499 MB]");
        System.out.println("                 │     ├── StudentRecord 1  [Retained Heap: 250 MB]");
        System.out.println("                 │     └── StudentRecord 2  [Retained Heap: 249 MB]");
        System.out.println("                 └── RegistryConfig        [Retained Heap: 1 MB]\n");

        System.out.println(">>> WHY IT IS INVALUABLE:");
        System.out.println("  - It instantly identifies the 'Head of the Snake' — the single parent object responsible for hoarding memory!");
        System.out.println("==========================================================================");
    }
}
