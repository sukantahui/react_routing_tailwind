/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 4: Creating Streams from Java Collections (List, Set, Map)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class StreamsFromCollectionsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: STREAMS FROM COLLECTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Streaming a List
        List<String> studentList = List.of("Swadeep", "Tuhina", "Abhronila", "Debangshu");
        System.out.println("1. Streaming List (Filter >= 7 chars):");
        studentList.stream()
            .filter(name -> name.length() >= 7)
            .forEach(name -> System.out.println("   - " + name));

        // 2. Streaming a Set (Deduplicated, Unordered)
        Set<String> centerSet = new HashSet<>(List.of("Barrackpore", "Naihati", "Shyamnagar", "Barrackpore"));
        System.out.println("\n2. Streaming Set (Sorted uppercase):");
        centerSet.stream()
            .sorted()
            .map(String::toUpperCase)
            .forEach(center -> System.out.println("   - " + center));

        // 3. Streaming a Map (via entrySet(), keySet(), values())
        Map<String, Double> scoreMap = new HashMap<>();
        scoreMap.put("Swadeep Paul", 92.5);
        scoreMap.put("Tuhina Das", 95.0);
        scoreMap.put("Abhronila Das", 89.0);

        System.out.println("\n3. Streaming Map via entrySet() (Distinction >= 90.0):");
        scoreMap.entrySet().stream()
            .filter(entry -> entry.getValue() >= 90.0)
            .forEach(entry -> System.out.println("   - " + entry.getKey() + " scored: " + entry.getValue() + "%"));

        System.out.println("\n==========================================================================");
    }
}
