/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 17: Building an LRU Cache Using LinkedHashMap & removeEldestEntry()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.LinkedHashMap;
import java.util.Map;

// Complete, Production-Grade LRU Cache in ~15 lines of code:
class LruMemoryCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxCapacity;

    public LruMemoryCache(int maxCapacity) {
        // accessOrder = true enables LRU access tracking:
        super(maxCapacity, 0.75f, true);
        this.maxCapacity = maxCapacity;
    }

    // JDK Hook: Invoked by put() and putAll() after inserting a new entry:
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        // If current size exceeds maxCapacity, automatically evict eldest entry at HEAD!
        boolean shouldEvict = size() > maxCapacity;
        if (shouldEvict) {
            System.out.printf("    [LRU EVICTION HOOK] Evicting least recently used entry: %s=%s%n",
                    eldest.getKey(), eldest.getValue());
        }
        return shouldEvict;
    }
}

public class LinkedHashMapLruCacheImplementationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: PRODUCTION LRU CACHE WITH LinkedHashMap - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Create LRU Cache bounded to MAX 3 items:
        LruMemoryCache<String, String> studentCache = new LruMemoryCache<>(3);

        System.out.println(">>> 1. Ingesting 3 Items into Cache (Capacity 3):");
        studentCache.put("STU-1", "Swadeep");
        studentCache.put("STU-2", "Tuhina");
        studentCache.put("STU-3", "Abhronila");
        System.out.println("  Cache State : " + studentCache);

        System.out.println("\n>>> 2. Accessing 'STU-1' (Makes STU-1 Most Recently Used):");
        studentCache.get("STU-1");
        System.out.println("  Cache State : " + studentCache + " ('STU-2' is now Eldest/LRU)");

        System.out.println("\n>>> 3. Ingesting 4th Item 'STU-4' (Triggers Eviction of 'STU-2'):");
        studentCache.put("STU-4", "Debangshu");
        System.out.println("  Final Cache State : " + studentCache + " (STU-2 was evicted cleanly!)");

        System.out.println("\n==========================================================================");
    }
}