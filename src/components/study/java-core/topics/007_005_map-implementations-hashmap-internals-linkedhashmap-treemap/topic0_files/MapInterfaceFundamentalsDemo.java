/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 0: The java.util.Map Interface: Key-Value Association & Unique Key Mapping
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashMap;
import java.util.Map;

public class MapInterfaceFundamentalsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.util.Map<K, V> FUNDAMENTALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Map<String, String> studentBranches = new HashMap<>();

        // 1. Associating Unique Keys with Values:
        studentBranches.put("STU-101", "Barrackpore Central");
        studentBranches.put("STU-102", "Naihati Center");
        studentBranches.put("STU-103", "Shyamnagar Hub");

        System.out.println(">>> 1. Populated Student Branch Mapping:");
        System.out.println("  Map Size: " + studentBranches.size());
        System.out.println("  Entries : " + studentBranches);

        // 2. Overwriting Value on Existing Key (Returns Previous Value):
        String previousBranch = studentBranches.put("STU-101", "Ichapur Extension");
        System.out.println("\n>>> 2. Overwriting Key 'STU-101':");
        System.out.println("  Previous Branch : " + previousBranch);
        System.out.println("  Updated Branch  : " + studentBranches.get("STU-101"));

        System.out.println("\n>>> CORE PROPERTIES OF java.util.Map<K, V>:");
        System.out.println("  1. Key Uniqueness : Each key maps to at most one value. Duplicate keys overwrite existing values.");
        System.out.println("  2. Multiple Values: Distinct keys can map to the exact same value (e.g. multiple students in Barrackpore).");
        System.out.println("  3. Independent    : Does not extend 'java.util.Collection' because it models 2-dimensional associations.");

        System.out.println("\n==========================================================================");
    }
}