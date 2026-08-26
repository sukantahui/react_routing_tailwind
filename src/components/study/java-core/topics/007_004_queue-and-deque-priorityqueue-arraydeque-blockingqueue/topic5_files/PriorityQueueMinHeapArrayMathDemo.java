/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 5: PriorityQueue Internal Structure: Binary Min-Heap Array Indexing Mathematics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.PriorityQueue;

public class PriorityQueueMinHeapArrayMathDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: PriorityQueue MIN-HEAP ARRAY MATHEMATICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        // Ingest numbers in random order:
        minHeap.offer(50);
        minHeap.offer(20);
        minHeap.offer(80);
        minHeap.offer(10);
        minHeap.offer(30);
        minHeap.offer(90);

        // Inspecting private Object[] queue backing array:
        Field queueField = PriorityQueue.class.getDeclaredField("queue");
        queueField.setAccessible(true);
        Object[] queueArray = (Object[]) queueField.get(minHeap);

        System.out.println(">>> 1. Backing Object[] queue Array State:");
        System.out.println("  Active Elements in Array: " + Arrays.toString(Arrays.copyOf(queueArray, minHeap.size())));
        System.out.println("  Root of Heap (Index 0)  : " + queueArray[0] + " (Smallest element guaranteed at index 0!)");

        System.out.println("\n>>> 2. BINARY HEAP ARRAY MATHEMATICAL INDEXING FORMULAS:");
        System.out.println("  For any node at index 'i':");
        System.out.println("    - Parent Index      : (i - 1) / 2");
        System.out.println("    - Left Child Index  : (2 * i) + 1");
        System.out.println("    - Right Child Index : (2 * i) + 2");
        System.out.println();
        System.out.println(">>> 3. Tracing Tree Nodes in our Array:");
        System.out.printf("  Root [Index 0 = %d]: Left Child [Index 1 = %d], Right Child [Index 2 = %d]%n",
                queueArray[0], queueArray[1], queueArray[2]);
        System.out.printf("  Node [Index 1 = %d]: Left Child [Index 3 = %d], Right Child [Index 4 = %d]%n",
                queueArray[1], queueArray[3], queueArray[4]);

        System.out.println("\n==========================================================================");
    }
}