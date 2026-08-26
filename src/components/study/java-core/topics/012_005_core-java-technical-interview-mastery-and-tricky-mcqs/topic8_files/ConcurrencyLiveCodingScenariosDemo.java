/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 8: Concurrency Live Coding Scenarios - Deadlock, LRU Cache & Semaphore
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ConcurrencyLiveCodingScenariosDemo {

    // Thread-Safe LRU Cache:
    public static class ThreadSafeLRUCache<K, V> {
        private final int capacity;
        private final Map<K, V> map;
        private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

        public ThreadSafeLRUCache(int capacity) {
            this.capacity = capacity;
            this.map = new LinkedHashMap<K, V>(capacity, 0.75f, true) {
                @Override
                protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                    return size() > capacity;
                }
            };
        }

        public V get(K key) {
            lock.writeLock().lock(); // access-order requires writeLock
            try { return map.get(key); }
            finally { lock.writeLock().unlock(); }
        }

        public void put(K key, V value) {
            lock.writeLock().lock();
            try { map.put(key, value); }
            finally { lock.writeLock().unlock(); }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CONCURRENCY LIVE CODING SCENARIOS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ThreadSafeLRUCache<Integer, String> cache = new ThreadSafeLRUCache<>(2);
        cache.put(1, "Barrackpore");
        cache.put(2, "Shyamnagar");
        cache.get(1); // Access 1 -> 2 becomes eldest
        cache.put(3, "Naihati"); // Evicts key 2!

        System.out.println("LRU Cache Results:");
        System.out.println("  Key 1 (Accessed) : " + cache.get(1)); // "Barrackpore"
        System.out.println("  Key 2 (Evicted)  : " + cache.get(2)); // null
        System.out.println("  Key 3 (Newest)   : " + cache.get(3)); // "Naihati"

        System.out.println("\n==========================================================================");
    }
}
