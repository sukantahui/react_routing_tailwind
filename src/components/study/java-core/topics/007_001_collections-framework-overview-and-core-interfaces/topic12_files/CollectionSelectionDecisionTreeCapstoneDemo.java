/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 12: Decision Tree: Choosing the Optimal Collection Archetype (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class CollectionSelectionDecisionTreeCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: COLLECTION SELECTION DECISION TREE (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE ENTERPRISE JAVA COLLECTION DECISION TREE:");
        System.out.println("  1. Do you need KEY-VALUE pair mapping?");
        System.out.println("     ├── YES -> Use Map<K, V>");
        System.out.println("     │     ├── Need fast O(1) unordered?              -> HashMap");
        System.out.println("     │     ├── Need insertion or access ordering?    -> LinkedHashMap");
        System.out.println("     │     ├── Need sorted natural/comparator order? -> TreeMap");
        System.out.println("     │     └── Need thread-safe concurrent access?   -> ConcurrentHashMap");
        System.out.println("     │");
        System.out.println("     └── NO -> Collection<E>");
        System.out.println("           │");
        System.out.println("           ├── 2. Do you need strictly UNIQUE elements (No duplicates)?");
        System.out.println("           │     ├── YES -> Use Set<E>");
        System.out.println("           │     │     ├── Fast O(1) unordered?        -> HashSet");
        System.out.println("           │     │     ├── Insertion ordered?          -> LinkedHashSet");
        System.out.println("           │     │     └── Sorted natural order?       -> TreeSet");
        System.out.println("           │     │");
        System.out.println("           │     └── NO");
        System.out.println("           │           ├── 3. Do you need FIFO/LIFO Task Buffering?");
        System.out.println("           │           │     ├── YES (FIFO Queue / LIFO Stack) -> ArrayDeque");
        System.out.println("           │           │     └── YES (Priority dispatching)   -> PriorityQueue");
        System.out.println("           │           │");
        System.out.println("           │           └── NO -> Use List<E>");
        System.out.println("           │                 ├── Fast index reads / rare inserts -> ArrayList (DEFAULT)");
        System.out.println("           │                 └── Frequent head/tail node inserts -> LinkedList");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 007_001 COLLECTIONS OVERVIEW & CORE INTERFACES 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}