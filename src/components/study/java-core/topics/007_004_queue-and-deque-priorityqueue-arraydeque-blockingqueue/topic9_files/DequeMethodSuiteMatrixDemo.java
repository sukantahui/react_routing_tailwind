/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 9: Deque Method Suite: offerFirst/Last, pollFirst/Last & peekFirst/Last Matrix
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Deque;

public class DequeMethodSuiteMatrixDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: Deque COMPLETE METHOD MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Deque<String> deque = new ArrayDeque<>();

        // 1. Safe Special-Value Additions (offerFirst & offerLast):
        deque.offerFirst("Swadeep (Head)");
        deque.offerLast("Tuhina (Tail)");
        deque.offerFirst("Abhronila (New Head)");

        System.out.println(">>> 1. Ingestion via offerFirst & offerLast:");
        System.out.println("  Deque Elements: " + deque);

        // 2. Safe Inspection (peekFirst & peekLast):
        System.out.println("\n>>> 2. Inspection (peekFirst & peekLast):");
        System.out.println("  peekFirst() : " + deque.peekFirst());
        System.out.println("  peekLast()  : " + deque.peekLast());

        // 3. Safe Extraction (pollFirst & pollLast):
        System.out.println("\n>>> 3. Extraction (pollFirst & pollLast):");
        System.out.println("  pollFirst() : " + deque.pollFirst() + " (Extracted Head)");
        System.out.println("  pollLast()  : " + deque.pollLast() + " (Extracted Tail)");
        System.out.println("  Remaining   : " + deque);

        System.out.println("\n>>> THE COMPLETE DEQUE METHOD MATRIX (12 CORE METHODS):");
        System.out.println("+-------------------+---------------------------+---------------------------+");
        System.out.println("| Position & Action | Throws Exception on Fail  | Returns Special Value     |");
        System.out.println("+-------------------+---------------------------+---------------------------+");
        System.out.println("| Insert at Head    | addFirst(e) / push(e)     | offerFirst(e) -> false    |");
        System.out.println("| Insert at Tail    | addLast(e) / add(e)       | offerLast(e) -> false     |");
        System.out.println("| Remove from Head  | removeFirst() / pop()     | pollFirst() -> null       |");
        System.out.println("| Remove from Tail  | removeLast()              | pollLast() -> null        |");
        System.out.println("| Examine Head      | getFirst() / element()    | peekFirst() -> null       |");
        System.out.println("| Examine Tail      | getLast()                 | peekLast() -> null        |");
        System.out.println("+-------------------+---------------------------+---------------------------+");

        System.out.println("\n==========================================================================");
    }
}