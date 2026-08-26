/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 10: Java 8 Treeification: TREEIFY_THRESHOLD (8) & MIN_TREEIFY_CAPACITY (64)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;

class HardCollidingKey implements Comparable<HardCollidingKey> {
    private final int id;

    public HardCollidingKey(int id) { this.id = id; }

    @Override
    public int hashCode() { return 100; } // Same hash forces single bucket

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        HardCollidingKey other = (HardCollidingKey) obj;
        return this.id == other.id;
    }

    @Override
    public int compareTo(HardCollidingKey other) {
        return Integer.compare(this.id, other.id);
    }

    @Override
    public String toString() { return "Key#" + id; }
}

public class HashMapTreeificationOptimizationDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: JAVA 8 TREEIFICATION OPTIMIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // We pre-set capacity to 64 to satisfy MIN_TREEIFY_CAPACITY:
        HashMap<HardCollidingKey, String> map = new HashMap<>(64);

        // Add 8 colliding keys to trigger treeification:
        for (int i = 1; i <= 8; i++) {
            map.put(new HardCollidingKey(i), "Student Record #" + i);
        }

        Field tableField = HashMap.class.getDeclaredField("table");
        tableField.setAccessible(true);
        Object[] table = (Object[]) tableField.get(map);

        int bucketIdx = (64 - 1) & (100 ^ (100 >>> 16));
        Object bucketNode = table[bucketIdx];

        System.out.println(">>> 1. Inspecting Bucket Node Type after 8 Collisions:");
        System.out.println("  Bucket Index : " + bucketIdx);
        System.out.println("  Node Class   : " + bucketNode.getClass().getName());

        boolean isTree = bucketNode.getClass().getName().contains("TreeNode");
        System.out.println("  Is Red-Black TreeNode? : " + isTree + " (Successfully Treeified into Red-Black Tree!)");

        System.out.println("\n>>> THE 2 MANDATORY CONDITIONS FOR TREEIFICATION:");
        System.out.println("  1. Bucket Collision Chain Length >= TREEIFY_THRESHOLD (8).");
        System.out.println("  2. Total Table Capacity >= MIN_TREEIFY_CAPACITY (64).");
        System.out.println("  * If chain length >= 8 but capacity < 64: HashMap resizes table instead of treeifying!");

        System.out.println("\n==========================================================================");
    }
}