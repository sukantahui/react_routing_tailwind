/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 7: java.util.LinkedList Implementing Both List and Deque Interfaces
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class LinkedListDualInterfaceContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: LinkedList AS BOTH List & Deque - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LinkedList<String> dualList = new LinkedList<>();

        // 1. AS A LIST (Index-based access):
        List<String> asList = dualList;
        asList.add("Swadeep Paul");
        asList.add("Tuhina Das");
        System.out.println(">>> 1. Accessed via List Interface: " + asList.get(0));

        // 2. AS A DEQUE (Head & Tail operations):
        Deque<String> asDeque = dualList;
        asDeque.addFirst("Abhronila Das (Inserted at Head)");
        asDeque.addLast("Debangshu Mukherjee (Inserted at Tail)");

        System.out.println("\n>>> 2. After Deque Head & Tail Additions:");
        System.out.println("  Peek First : " + asDeque.peekFirst());
        System.out.println("  Peek Last  : " + asDeque.peekLast());
        System.out.println("  All Items  : " + dualList);

        // 3. AS A FIFO QUEUE / LIFO STACK:
        asDeque.push("Stack Top Item"); // LIFO push
        System.out.println("\n>>> 3. LIFO Pop : " + asDeque.pop());

        System.out.println("\n>>> DUAL INTERFACE ARCHITECTURE:");
        System.out.println("  - LinkedList implements 'java.util.List<E>' AND 'java.util.Deque<E>'.");
        System.out.println("  - Provides List operations (get, set, indexOf) + Deque operations (addFirst, removeLast, push, pop, poll).");

        System.out.println("\n==========================================================================");
    }
}