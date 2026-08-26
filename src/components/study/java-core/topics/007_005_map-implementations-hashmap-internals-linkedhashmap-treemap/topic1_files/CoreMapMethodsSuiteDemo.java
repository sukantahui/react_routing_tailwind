/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 1: Core Map Methods Suite: getOrDefault(), containsKey(), and Collection Views
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashMap;
import java.util.Map;

public class CoreMapMethodsSuiteDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: CORE Map<K, V> METHODS SUITE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Map<String, Double> courseFees = new HashMap<>();
        courseFees.put("Java Core", 8500.0);
        courseFees.put("Spring Boot", 12500.0);
        courseFees.put("GST & Taxation", 6000.0);

        // 1. Safe Query with getOrDefault():
        double javaFee = courseFees.getOrDefault("Java Core", 0.0);
        double cloudFee = courseFees.getOrDefault("AWS Cloud", 15000.0); // Not in map, returns default!

        System.out.println(">>> 1. Querying with getOrDefault():");
        System.out.println("  Java Core Fee (Found)       : ₹" + javaFee);
        System.out.println("  AWS Cloud Fee (Default Used): ₹" + cloudFee);

        // 2. Membership Validation (containsKey vs containsValue):
        System.out.println("\n>>> 2. Membership Verification:");
        System.out.println("  Contains Key 'Spring Boot'? : " + courseFees.containsKey("Spring Boot") + " (O(1) instant hash lookup)");
        System.out.println("  Contains Value 6000.0?      : " + courseFees.containsValue(6000.0) + " (O(n) linear value scan)");

        // 3. The 3 Map Views: keySet, values, entrySet:
        System.out.println("\n>>> 3. Traversing Map via entrySet() (Fastest & Most Idiomatic):");
        for (Map.Entry<String, Double> entry : courseFees.entrySet()) {
            System.out.printf("  Course: %-18s -> Fee: ₹%.2f%n", entry.getKey(), entry.getValue());
        }

        System.out.println("\n==========================================================================");
    }
}