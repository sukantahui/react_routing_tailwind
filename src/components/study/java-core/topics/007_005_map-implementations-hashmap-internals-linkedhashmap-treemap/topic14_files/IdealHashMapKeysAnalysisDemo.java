/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 14: Why String and Integer Are Ideal HashMap Keys: Immutability & Cached Hash
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class IdealHashMapKeysAnalysisDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: WHY String & Integer ARE IDEAL MAP KEYS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String studentKey = "Swadeep-Paul-101";

        // Inspecting private int hash field inside String (Cached Hash Code):
        Field hashField = String.class.getDeclaredField("hash");
        hashField.setAccessible(true);

        System.out.println(">>> 1. String Cached Hash Code Optimization:");
        System.out.println("  Hash field before hashCode() call: " + hashField.getInt(studentKey));
        int computedHash = studentKey.hashCode(); // Computes once and caches in private int hash!
        System.out.println("  Computed hashCode()              : " + computedHash);
        System.out.println("  Hash field after hashCode() call : " + hashField.getInt(studentKey) + " (Cached forever!)");

        Map<String, String> cacheMap = new HashMap<>();
        cacheMap.put(studentKey, "Barrackpore Academy");

        System.out.println("\n>>> 2. 4 REASONS WHY String & Integer ARE THE BEST KEYS IN JAVA:");
        System.out.println("  1. Strict Immutability   : String and Integer are declared 'final' with all private final fields. Their state can NEVER change after creation.");
        System.out.println("  2. Cached Hash Code      : String caches its hash in a private field. Repeated 'map.get(str)' calls execute in O(1) without recalculating character math!");
        System.out.println("  3. Flawless hashCode/equals: Implements rigorous mathematical equals and uniform hash distribution.");
        System.out.println("  4. Zero Memory Corruption: Impossible to encounter the 'lost key' memory leak problem.");

        System.out.println("\n==========================================================================");
    }
}