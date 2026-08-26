/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 1: Determining Object Liveness - Reference Counting vs GC Roots Reachability
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class LivenessRefcountingVsGcrootsDemo {

    public static class CircularNode {
        public String label;
        public CircularNode next;

        public CircularNode(String label) { this.label = label; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: LIVENESS - REF COUNTING VS GC ROOTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Creating an isolated circular reference (Island of Isolation):
        CircularNode nodeA = new CircularNode("Barrackpore Node A");
        CircularNode nodeB = new CircularNode("Barrackpore Node B");

        nodeA.next = nodeB; // A points to B
        nodeB.next = nodeA; // B points to A (Circular reference!)

        System.out.println(">>> 1. CREATING CIRCULAR REFERENCE ISLAND:");
        System.out.println("  - nodeA.next points to: " + nodeA.next.label);
        System.out.println("  - nodeB.next points to: " + nodeB.next.label);

        // 2. Severing references from the Stack (GC Root):
        nodeA = null;
        nodeB = null;

        System.out.println("\n>>> 2. SEVERING GC ROOT REFERENCES (nodeA = null, nodeB = null):");
        System.out.println("  - UNDER REFERENCE COUNTING: Both objects have count = 1 (each referenced by the other).");
        System.out.println("    --> Fatal Bug: Reference Counting CANNOT collect this memory (Memory Leak)!\n");
        System.out.println("  - UNDER JAVA GC ROOTS REACHABILITY (Tracing):");
        System.out.println("    --> GC starts at GC Roots (active stack frames). Neither Node A nor Node B is reachable.");
        System.out.println("    --> Java correctly collects both objects as Garbage! (Island of Isolation reclaimed!)");

        System.out.println("\n==========================================================================");
    }
}
