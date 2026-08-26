/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 11: Untreeification: UNTREEIFY_THRESHOLD (6) & Memory Reclamation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class HashMapUntreeificationThresholdDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: UNTREEIFICATION THRESHOLD (6) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE HYSTERESIS BUFFER (TREEIFY 8 vs UNTREEIFY 6):");
        System.out.println("  1. Treeification Threshold  : 8 (Converts Linked List -> Red-Black Tree)");
        System.out.println("  2. Untreeification Threshold: 6 (Converts Red-Black Tree -> Linked List upon deletions / resizing)");
        System.out.println();
        System.out.println(">>> WHY UNTREEIFY_THRESHOLD IS 6 (AND NOT 7 OR 8):");
        System.out.println("  - Imagine if Treeify was 8 and Untreeify was 7:");
        System.out.println("  - Adding an 8th element would convert list -> tree.");
        System.out.println("  - Deleting 1 element would convert tree -> list.");
        System.out.println("  - Repeated add/remove in a tight loop would cause violent 'Thrashing' (constant tree rebuilding)!");
        System.out.println("  - The gap of 2 (8 vs 6) acts as a mathematical Hysteresis Damping Buffer to prevent thrashing.");

        System.out.println("\n==========================================================================");
    }
}