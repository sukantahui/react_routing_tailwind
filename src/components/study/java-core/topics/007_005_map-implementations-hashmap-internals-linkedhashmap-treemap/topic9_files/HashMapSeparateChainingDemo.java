/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 9: Collision Resolution: Separate Chaining via Singly Linked List (Node.next)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;

class CollidingKey {
    private final String id;

    public CollidingKey(String id) { this.id = id; }

    // FORCING HASH COLLISION: Every key returns the identical hashCode 42!
    @Override
    public int hashCode() { return 42; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CollidingKey other = (CollidingKey) obj;
        return this.id.equals(other.id);
    }

    @Override
    public String toString() { return id; }
}

public class HashMapSeparateChainingDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: SEPARATE CHAINING COLLISION RESOLUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        HashMap<CollidingKey, String> collisionMap = new HashMap<>();

        CollidingKey k1 = new CollidingKey("Key-A");
        CollidingKey k2 = new CollidingKey("Key-B");
        CollidingKey k3 = new CollidingKey("Key-C");

        collisionMap.put(k1, "Value 1 (Barrackpore)");
        collisionMap.put(k2, "Value 2 (Naihati)");
        collisionMap.put(k3, "Value 3 (Shyamnagar)");

        // Inspecting the single collided bucket:
        Field tableField = HashMap.class.getDeclaredField("table");
        tableField.setAccessible(true);
        Object[] table = (Object[]) tableField.get(collisionMap);

        int bucketIndex = (16 - 1) & (42 ^ (42 >>> 16));
        Object headNode = table[bucketIndex];

        System.out.println(">>> 1. Inspecting Collided Bucket #" + bucketIndex + ":");
        System.out.println("  Head Node: " + headNode);

        // Walking the linked list chain via reflection:
        Field nextField = headNode.getClass().getDeclaredField("next");
        nextField.setAccessible(true);

        Object secondNode = nextField.get(headNode);
        Object thirdNode = (secondNode != null) ? nextField.get(secondNode) : null;

        System.out.println("  Node 1 -> " + headNode);
        System.out.println("  Node 2 -> " + secondNode);
        System.out.println("  Node 3 -> " + thirdNode);

        System.out.println("\n>>> SEPARATE CHAINING MECHANICS:");
        System.out.println("  1. When two distinct keys hash to the same bucket: Java appends the new node to the tail of the linked list.");
        System.out.println("  2. During 'get(key)': Java computes the bucket index, then traverses the list checking 'equals()' on each node.");

        System.out.println("\n==========================================================================");
    }
}