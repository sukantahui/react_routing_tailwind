/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 1: The Synchronized Wrapper Approach: Collections.synchronizedMap() & Iteration Locks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class SynchronizedWrappersAndIterationLockDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: Collections.synchronizedMap() & ITERATION LOCK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Wrapping standard HashMap with synchronized wrapper:
        Map<String, String> syncMap = Collections.synchronizedMap(new HashMap<>());

        syncMap.put("BRK-101", "Swadeep Paul");
        syncMap.put("NAI-102", "Tuhina Das");
        syncMap.put("SHY-103", "Abhronila Das");

        System.out.println(">>> 1. Synchronized Map Populated Safely:");
        System.out.println("  Size: " + syncMap.size());

        // 2. MANDATORY USER SYNCHRONIZATION DURING ITERATION:
        // JDK Warning: Must manually synchronize on the map instance when traversing it!
        System.out.println("\n>>> 2. Thread-Safe Iteration (Manual Synchronized Block Required!):");
        synchronized (syncMap) { // MANDATORY LOCK!
            for (Map.Entry<String, String> entry : syncMap.entrySet()) {
                System.out.println("  Entry: " + entry.getKey() + " -> " + entry.getValue());
            }
        }

        System.out.println("\n>>> HOW SYNCHRONIZED WRAPPERS WORK:");
        System.out.println("  1. Decorator Pattern : 'Collections.synchronizedMap(m)' wraps the underlying map inside 'SynchronizedMap'.");
        System.out.println("  2. Coarse Mutex Lock : Every method (put, get, remove) is wrapped with 'synchronized(mutex) { return m.put(k,v); }'.");
        System.out.println("  3. Iteration Trap    : Iterators are NOT synchronized! Developers MUST wrap iteration in a 'synchronized(map)' block.");

        System.out.println("\n==========================================================================");
    }
}