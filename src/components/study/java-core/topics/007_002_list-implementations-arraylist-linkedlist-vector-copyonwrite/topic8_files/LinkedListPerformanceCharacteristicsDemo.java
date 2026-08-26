/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 8: LinkedList Performance: O(1) Head/Tail vs O(n) Indexed Access (Nearest End Traversal)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.LinkedList;

public class LinkedListPerformanceCharacteristicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: LinkedList PERFORMANCE & NEAREST-END TRAVERSAL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LinkedList<Integer> list = new LinkedList<>();
        for (int i = 0; i < 50000; i++) list.add(i);

        // 1. O(1) HEAD INSERTION / DELETION (Pointer updates only):
        long t1 = System.nanoTime();
        list.addFirst(-1);
        long t2 = System.nanoTime();
        System.out.printf(">>> 1. O(1) Head Insertion (addFirst) : %d ns%n", (t2 - t1));

        // 2. O(n) MIDDLE ACCESS (Requires traversing pointers from nearest end!):
        long t3 = System.nanoTime();
        int midVal = list.get(25000); // Must traverse 25,000 pointers!
        long t4 = System.nanoTime();
        System.out.printf(">>> 2. O(n) Middle Access (get(25000)): %d ns (val=%d)%n", (t4 - t3), midVal);

        System.out.println("\n>>> HOW LinkedList.node(int index) OPTIMIZES TRAVERSAL:");
        System.out.println("  - If index < (size >> 1): Starts from 'first' node and traverses FORWARD using 'node.next'.");
        System.out.println("  - If index >= (size >> 1): Starts from 'last' node and traverses BACKWARD using 'node.prev'.");
        System.out.println("  - Traverses at most n/2 nodes, but still fundamentally O(n) linear time!");

        System.out.println("\n==========================================================================");
    }
}