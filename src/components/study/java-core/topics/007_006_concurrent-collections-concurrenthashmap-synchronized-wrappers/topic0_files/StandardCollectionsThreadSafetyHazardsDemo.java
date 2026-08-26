/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 0: Why Standard Collections (HashMap, ArrayList) Are NOT Thread-Safe
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashMap;
import java.util.Map;

public class StandardCollectionsThreadSafetyHazardsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: STANDARD COLLECTIONS THREAD-SAFETY HAZARDS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // UNSYNCHRONIZED HashMap shared across 2 concurrent worker threads:
        Map<Integer, String> unsynchronizedMap = new HashMap<>();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 5000; i++) {
                unsynchronizedMap.put(i, "Thread-1-" + i);
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 5000; i < 10000; i++) {
                unsynchronizedMap.put(i, "Thread-2-" + i);
            }
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println(">>> 1. Concurrent Mutation of Plain HashMap:");
        System.out.println("  Expected Map Size : 10000");
        System.out.println("  Actual Map Size   : " + unsynchronizedMap.size() + " (Data corruption / lost updates due to race conditions!)");

        System.out.println("\n>>> 3 DEADLY HAZARDS OF CONCURRENT ACCESS TO STANDARD COLLECTIONS:");
        System.out.println("  1. Lost Updates / Silent Overwrites: Two threads writing to the same bucket overwrite each other's pointers.");
        System.out.println("  2. Inconsistent Size Field         : The 'size' integer counter is updated non-atomically (size++ is not atomic).");
        System.out.println("  3. Pre-Java 8 Infinite Loops       : In Java 7, concurrent table resizing caused circular linked list pointers (100% CPU lockup)!");

        System.out.println("\n==========================================================================");
    }
}