/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 13: Synchronized Wrappers: Collections.synchronizedList/Set/Map & The Iteration Mutex Trap
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class SynchronizedWrappersDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: Collections SYNCHRONIZED WRAPPERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Wrapping unsynchronized ArrayList with a synchronized decorator:
        List<String> rawList = new ArrayList<>();
        List<String> syncList = Collections.synchronizedList(rawList);

        syncList.add("Barrackpore Central");
        syncList.add("Naihati Junction");

        System.out.println(">>> 1. Synchronized List State: " + syncList);

        // 2. THE CRITICAL ITERATION MUTEX TRAP:
        // Individual methods (add, get, remove) are synchronized internally on 'this' mutex,
        // BUT compound iteration MUST be explicitly synchronized by the user!
        System.out.println("\n>>> 2. Mandatory Explicit Synchronization During Iteration:");
        synchronized (syncList) { // MUST acquire lock on syncList manually!
            Iterator<String> it = syncList.iterator();
            while (it.hasNext()) {
                System.out.println("  Thread-Safe Iteration Item: " + it.next());
            }
        } // Lock released

        System.out.println("\n>>> WHY MANUAL SYNCHRONIZATION IS REQUIRED FOR ITERATION:");
        System.out.println("  - The iterator returned by 'syncList.iterator()' does NOT hold the lock across multiple hasNext()/next() calls.");
        System.out.println("  - Without the 'synchronized(syncList)' block, another thread can mutate the list between hasNext() and next(), crashing with CME!");

        System.out.println("\n==========================================================================");
    }
}