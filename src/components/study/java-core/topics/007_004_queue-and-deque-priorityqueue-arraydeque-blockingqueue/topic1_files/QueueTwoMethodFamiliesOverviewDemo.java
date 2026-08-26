/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 1: The 2 Method Families of Queue: Exceptions vs Special-Value Handling
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class QueueTwoMethodFamiliesOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 2 METHOD FAMILIES OF java.util.Queue - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE COMPLETE QUEUE API MATRIX (2 ERROR HANDLING STRATEGIES):");
        System.out.println("+-------------------+---------------------------+---------------------------+");
        System.out.println("| Operation Type    | Throws Exception on Fail  | Returns Special Value     |");
        System.out.println("+-------------------+---------------------------+---------------------------+");
        System.out.println("| Insert (at Tail)  | add(e)                    | offer(e) -> false         |");
        System.out.println("| Remove (at Head)  | remove()                  | poll()  -> null           |");
        System.out.println("| Examine (at Head) | element()                 | peek()  -> null           |");
        System.out.println("+-------------------+---------------------------+---------------------------+");

        System.out.println("\n>>> WHEN TO USE EACH METHOD FAMILY:");
        System.out.println("  1. Use 'offer() / poll() / peek()' for bounded, concurrent, and high-throughput pipelines where failures are normal.");
        System.out.println("  2. Use 'add() / remove() / element()' when failures represent illegal program states that should abort execution.");

        System.out.println("\n==========================================================================");
    }
}