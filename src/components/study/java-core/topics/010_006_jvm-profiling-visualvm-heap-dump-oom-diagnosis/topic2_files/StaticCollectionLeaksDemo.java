/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 2: Static Collection Leaks - Unbounded Maps & Eviction Policies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.util.LinkedHashMap;
import java.util.Map;

public class StaticCollectionLeaksDemo {

    // 1. LEAK ANTIPATTERN: Unbounded Static Map (Grows infinitely)
    // private static final Map<String, Object> UNBOUNDED_LEAK = new HashMap<>();

    // 2. PRODUCTION FIX: Bounded LRU (Least-Recently-Used) Cache
    public static class BoundedLruCache<K, V> extends LinkedHashMap<K, V> {
        private final int maxEntries;

        public BoundedLruCache(int maxEntries) {
            super(maxEntries, 0.75f, true); // true = access-order
            this.maxEntries = maxEntries;
        }

        @Override
        protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
            return size() > maxEntries; // Evict eldest entry when limit is exceeded!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: STATIC COLLECTION LEAKS & LRU CACHES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BoundedLruCache<Integer, String> studentCache = new BoundedLruCache<>(3);

        System.out.println(">>> 1. Adding 3 students to bounded LRU cache (Limit = 3):");
        studentCache.put(101, "Swadeep Paul");
        studentCache.put(102, "Tuhina Das");
        studentCache.put(103, "Abhronila Das");
        System.out.println("  - Cache contents: " + studentCache);

        System.out.println("\n>>> 2. Accessing student 101 (Promoting it to most-recently used):");
        studentCache.get(101);

        System.out.println("\n>>> 3. Inserting student 104 (Exceeds capacity -> Evicts eldest entry 102!):");
        studentCache.put(104, "Debangshu Mukherjee");
        System.out.println("  - Cache contents after eviction: " + studentCache);
        System.out.println("  - Notice student 102 was safely evicted! Zero memory leak! ✅");

        System.out.println("\n==========================================================================");
    }
}
