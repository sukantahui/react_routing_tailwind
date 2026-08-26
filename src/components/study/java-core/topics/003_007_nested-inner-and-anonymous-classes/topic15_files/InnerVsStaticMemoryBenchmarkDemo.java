/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 15: Performance & Memory Footprint: Static Nested vs Member Inner Classes Benchmark
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class InnerVsStaticMemoryBenchmarkDemo {

    // Non-static inner class (contains hidden 8-byte pointer to outer object):
    public class MemberInnerNode {
        int value;
        MemberInnerNode(int v) { this.value = v; }
    }

    // Static nested class (NO outer pointer; saves RAM across millions of nodes):
    public static class StaticNestedNode {
        int value;
        StaticNestedNode(int v) { this.value = v; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: MEMORY FOOTPRINT BENCHMARK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int nodeCount = 10_000_000;
        System.out.println(">>> Analyzing Memory Cost of " + nodeCount + " Nodes:");
        System.out.println();
        System.out.println("  1. MemberInnerNode (Non-static):");
        System.out.println("     - Extra 8-byte pointer (this$0) per instance.");
        System.out.println("     - 10M nodes = ~80 MB extra memory overhead!");
        System.out.println();
        System.out.println("  2. StaticNestedNode (Static):");
        System.out.println("     - Zero outer pointer overhead.");
        System.out.println("     - Saves 80 MB of heap memory, reduces GC pressure!");

        System.out.println("\n>>> VERDICT (Effective Java Item 24):");
        System.out.println("  ALWAYS prefer static member classes over non-static unless access to enclosing instance is required!");

        System.out.println("\n==========================================================================");
    }
}