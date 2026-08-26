/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 3: java.util.HashMap Internal Architecture Deep Dive: High-Level Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class HashMapInternalArchitectureOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: HashMap INTERNAL ARCHITECTURE OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 5 FOUNDATIONAL PILLARS OF java.util.HashMap:");
        System.out.println("  1. Backing Bucket Array : 'Node<K,V>[] table' (Contiguous array of hash buckets).");
        System.out.println("  2. Hash Spread Function : 'hash = (h = key.hashCode()) ^ (h >>> 16)' (Spreads high bits into low bits).");
        System.out.println("  3. Bitwise Bucket Index : 'index = (table.length - 1) & hash' (Replaces slow modulo '%' with 1-cycle bitwise AND).");
        System.out.println("  4. Collision Handling   : Separate Chaining via Singly Linked List (Node<K,V>).");
        System.out.println("  5. Java 8 Treeification : When bucket chain >= 8 and table capacity >= 64, list converts to Red-Black Tree (TreeNode<K,V>)!");

        System.out.println("\n>>> DEFAULT TUNING CONSTANTS IN HashMap.java:");
        System.out.println("  - DEFAULT_INITIAL_CAPACITY = 16   (Must be a power of 2!)");
        System.out.println("  - MAXIMUM_CAPACITY         = 1 << 30 (1,073,741,824)");
        System.out.println("  - DEFAULT_LOAD_FACTOR      = 0.75f");
        System.out.println("  - TREEIFY_THRESHOLD        = 8");
        System.out.println("  - UNTREEIFY_THRESHOLD      = 6");
        System.out.println("  - MIN_TREEIFY_CAPACITY     = 64");

        System.out.println("\n==========================================================================");
    }
}