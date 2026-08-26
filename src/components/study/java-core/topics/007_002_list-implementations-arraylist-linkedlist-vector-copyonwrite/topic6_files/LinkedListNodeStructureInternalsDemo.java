/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 6: java.util.LinkedList Internal Mechanics: Doubly Linked List Node Structure
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.LinkedList;

public class LinkedListNodeStructureInternalsDemo {

    // Simulating internal Node<E> structure of java.util.LinkedList:
    public static class MiniNode<E> {
        E item;
        MiniNode<E> next;
        MiniNode<E> prev;

        MiniNode(MiniNode<E> prev, E element, MiniNode<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: LinkedList DOUBLY LINKED NODE INTERNALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LinkedList<String> list = new LinkedList<>();
        list.add("Swadeep Paul (Barrackpore)");
        list.add("Tuhina Das (Naihati)");
        list.add("Abhronila Das (Shyamnagar)");

        System.out.println(">>> 1. LinkedList Elements:");
        System.out.println("  " + list);

        System.out.println("\n>>> ANATOMY OF A LinkedList NODE (java.util.LinkedList.Node<E>):");
        System.out.println("  +-----------------------------------------------------------+");
        System.out.println("  |                      Node<E> Structure                    |");
        System.out.println("  |  [Node<E> prev (8B)] | [E item (8B)] | [Node<E> next (8B)]|");
        System.out.println("  +-----------------------------------------------------------+");
        System.out.println();
        System.out.println(">>> MEMORY OVERHEAD PER ELEMENT:");
        System.out.println("  - ArrayList : Stores raw 4-8 byte pointer in elementData[].");
        System.out.println("  - LinkedList: Allocates a separate Node object on the heap for EVERY element (24-32 bytes overhead per node!).");
        System.out.println("  - Pointer Chasing: Nodes are scattered across the heap, causing frequent CPU Cache Misses.");

        System.out.println("\n==========================================================================");
    }
}