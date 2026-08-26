/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 9: 4. java.util.Map: Key-Value Dictionaries & Independent Hierarchy Contract
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashMap;
import java.util.Map;

public class MapInterfaceContractBehaviorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: java.util.Map<K, V> CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Map<String, String> studentCourses = new HashMap<>();

        // 1. put() and Overwriting on Duplicate Key:
        studentCourses.put("STU-101", "Java Full Stack (Barrackpore)");
        studentCourses.put("STU-102", "Python Data Science (Naihati)");
        studentCourses.put("STU-103", "GST & Taxation (Shyamnagar)");

        // Putting with existing key replaces value and returns old value:
        String oldCourse = studentCourses.put("STU-101", "Spring Boot & Microservices (Barrackpore)");

        System.out.println(">>> 1. Map Key-Value Ingestion:");
        System.out.println("  Previous Course for STU-101 : " + oldCourse);
        System.out.println("  Updated Course for STU-101  : " + studentCourses.get("STU-101"));

        // 2. Querying Keys and Values:
        System.out.println("\n>>> 2. Map Queries:");
        System.out.println("  Contains Key 'STU-102'?   : " + studentCourses.containsKey("STU-102"));
        System.out.println("  getOrDefault for STU-999  : " + studentCourses.getOrDefault("STU-999", "Unregistered"));

        // 3. The 3 Collection Views of a Map:
        System.out.println("\n>>> 3. The 3 Collection Views of java.util.Map:");
        System.out.println("  1. Key Set   (keySet())   [Set<K>]        : " + studentCourses.keySet());
        System.out.println("  2. Values    (values())   [Collection<V>] : " + studentCourses.values());
        System.out.println("  3. Entries   (entrySet()) [Set<Entry>]    : " + studentCourses.entrySet());

        System.out.println("\n>>> Iterating over Map.Entry pairs:");
        for (Map.Entry<String, String> entry : studentCourses.entrySet()) {
            System.out.printf("  Roll ID: %-8s | Course: %s%n", entry.getKey(), entry.getValue());
        }

        System.out.println("\n==========================================================================");
    }
}