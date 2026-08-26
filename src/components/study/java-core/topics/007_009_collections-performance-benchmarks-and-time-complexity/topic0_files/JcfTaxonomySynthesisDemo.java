/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 0: Review of All JCF Collections: 11 Core Concrete Implementations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class JcfTaxonomySynthesisDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: ALL 11 CORE JCF CONCRETE IMPLEMENTATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 11 CORE CONCRETE DATA STRUCTURES IN JCF:");
        System.out.println("  1. List Implementations:");
        System.out.println("     - ArrayList       : Resizable contiguous array. O(1) random access by index.");
        System.out.println("     - LinkedList      : Doubly linked list. O(1) head/tail manipulation, O(n) index seek.");
        System.out.println();
        System.out.println("  2. Queue & Deque Implementations:");
        System.out.println("     - ArrayDeque      : Resizable circular array buffer. Blazingly fast LIFO stack / FIFO queue.");
        System.out.println("     - PriorityQueue   : Binary Min-Heap array. O(log n) enqueue/dequeue, O(1) peek minimum.");
        System.out.println();
        System.out.println("  3. Set Implementations (Uniqueness):");
        System.out.println("     - HashSet         : Backed by HashMap. O(1) constant-time uniqueness checks.");
        System.out.println("     - LinkedHashSet   : Hash table + Doubly-linked bucket order. Preserves insertion order.");
        System.out.println("     - TreeSet         : Red-Black self-balancing binary search tree. O(log n) sorted order.");
        System.out.println();
        System.out.println("  4. Map Implementations (Key-Value):");
        System.out.println("     - HashMap         : Node<K,V>[] table + TreeBin. O(1) average lookup, O(log n) worst collision.");
        System.out.println("     - LinkedHashMap   : HashMap + doubly linked list. Insertion-order or LRU Access-order.");
        System.out.println("     - TreeMap         : Red-Black tree map. O(log n) sorted key queries & NavigableMap.");
        System.out.println();
        System.out.println("  5. Concurrent Collections:");
        System.out.println("     - ConcurrentHashMap: CAS empty bucket + synchronized head lock + lock-free volatile reads.");

        System.out.println("\n==========================================================================");
    }
}