/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 4: The Node<K,V>[] table Array: Hash Buckets & Linked Node Structure
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;

public class HashMapNodeTableBucketsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: HashMap Node<K,V>[] TABLE BUCKETS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        HashMap<String, Integer> centerAccounts = new HashMap<>();
        centerAccounts.put("Barrackpore", 101);
        centerAccounts.put("Naihati", 102);

        // Inspecting private transient Node<K,V>[] table:
        Field tableField = HashMap.class.getDeclaredField("table");
        tableField.setAccessible(true);
        Object[] table = (Object[]) tableField.get(centerAccounts);

        System.out.println(">>> 1. Inspecting 'Node<K,V>[] table' Array:");
        System.out.println("  Table Array Object : " + table.getClass().getTypeName());
        System.out.println("  Table Array Length : " + table.length + " (Default capacity 16)");

        System.out.println("\n>>> 2. Inspecting Non-Empty Hash Buckets:");
        for (int i = 0; i < table.length; i++) {
            if (table[i] != null) {
                System.out.printf("  Bucket [%2d]: Node -> %s%n", i, table[i]);
            }
        }

        System.out.println("\n>>> THE Node<K,V> DATA STRUCTURE IN JDK SOURCE:");
        System.out.println("  static class Node<K,V> implements Map.Entry<K,V> {");
        System.out.println("      final int hash;");
        System.out.println("      final K key;");
        System.out.println("      V value;");
        System.out.println("      Node<K,V> next; // Singly linked list pointer for collision chaining!");
        System.out.println("  }");

        System.out.println("\n==========================================================================");
    }
}