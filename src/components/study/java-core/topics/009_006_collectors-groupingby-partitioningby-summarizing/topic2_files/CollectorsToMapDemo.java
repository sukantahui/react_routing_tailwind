/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 2: Collectors.toMap() - Key-Value Mapping & Key Collision Resolution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class CollectorsToMapDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: COLLECTORS.TOMAP() & KEY MERGE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentCourseScore> records = List.of(
            new StudentCourseScore(101, "Swadeep Paul", "Java Core", 92.0),
            new StudentCourseScore(102, "Tuhina Das", "Spring Boot", 95.0),
            new StudentCourseScore(103, "Abhronila Das", "Java Core", 88.0),
            new StudentCourseScore(101, "Swadeep Paul", "Advanced Microservices", 96.0) // Duplicate Key ID 101!
        );

        // 1. Resolving Duplicate Key Collisions with Merge Function: (existingVal, newVal) -> newVal
        System.out.println(">>> 1. toMap with Merge Function (Resolving Duplicate ID 101):");
        Map<Integer, Double> studentScores = records.stream()
            .collect(Collectors.toMap(
                StudentCourseScore::id,                             // Key Mapper
                StudentCourseScore::score,                          // Value Mapper
                (existingScore, newScore) -> Math.max(existingScore, newScore) // Merge: keep highest score!
            ));
        System.out.println("   Result Map (Highest score for ID 101): " + studentScores);

        // 2. toMap with Custom Map Supplier (TreeMap for sorted keys):
        System.out.println("\n>>> 2. toMap with TreeMap Supplier (Sorted by Key):");
        TreeMap<Integer, String> sortedNameMap = records.stream()
            .collect(Collectors.toMap(
                StudentCourseScore::id,
                StudentCourseScore::name,
                (oldName, newName) -> oldName,                     // Keep existing on tie
                TreeMap::new                                       // Custom Map Factory
            ));
        System.out.println("   TreeMap Result: " + sortedNameMap);

        System.out.println("\n==========================================================================");
    }

    record StudentCourseScore(int id, String name, String course, double score) {}
}
