/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 0: The java.util.Queue Interface: FIFO Task & Message Processing Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Queue;

public class QueueFifoTaskProcessingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.util.Queue FIFO PROCESSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Queue<String> studentHelpdesk = new ArrayDeque<>();

        // Enqueue tasks in chronological order (FIFO):
        studentHelpdesk.offer("Ticket #101: Swadeep Paul (Barrackpore - Fee Query)");
        studentHelpdesk.offer("Ticket #102: Tuhina Das (Naihati - Course Certificate)");
        studentHelpdesk.offer("Ticket #103: Abhronila Das (Shyamnagar - Lab Access)");

        System.out.println(">>> 1. Helpdesk Queue State:");
        System.out.println("  Queue Size : " + studentHelpdesk.size());
        System.out.println("  Next in line to be served (peek()): " + studentHelpdesk.peek());

        // Dequeue tasks in strict First-In First-Out sequence:
        System.out.println("\n>>> 2. Dispatching Tasks in FIFO Sequence:");
        while (!studentHelpdesk.isEmpty()) {
            String activeTicket = studentHelpdesk.poll(); // Retrieves and removes head
            System.out.println("  [DISPATCHED] Serving: " + activeTicket);
        }

        System.out.println("\n>>> FINAL STATE: Queue is empty: " + studentHelpdesk.isEmpty());

        System.out.println("\n>>> THE FIFO QUEUE CONTRACT:");
        System.out.println("  1. First-In, First-Out: Elements are processed in exact arrival sequence.");
        System.out.println("  2. Head & Tail Access : Insertions happen at the TAIL; extractions happen at the HEAD.");
        System.out.println("  3. Buffer Pipeline    : Ideal for asynchronous messaging, thread dispatching, and printer queues.");

        System.out.println("\n==========================================================================");
    }
}