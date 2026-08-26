/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 6: Single-Level groupingBy() - Custom Range & Tier Classification
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SingleLevelGroupingByDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: SINGLE-LEVEL GROUPINGBY() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentScoreItem> students = List.of(
            new StudentScoreItem("Swadeep Paul", 94.0),
            new StudentScoreItem("Tuhina Das", 96.5),
            new StudentScoreItem("Abhronila Das", 78.0),
            new StudentScoreItem("Debangshu Mukherjee", 88.5),
            new StudentScoreItem("Priya Sharma", 62.0),
            new StudentScoreItem("Anish Dey", 45.0)
        );

        // Classifying students into Grade Tiers via custom lambda classifier:
        // Tier 1: Distinction (>= 85)
        // Tier 2: First Division (>= 60 and < 85)
        // Tier 3: Pass (>= 40 and < 60)
        Map<String, List<StudentScoreItem>> gradeTierMap = students.stream()
            .collect(Collectors.groupingBy(s -> {
                if (s.score() >= 85.0) return "DISTINCTION (>= 85%)";
                if (s.score() >= 60.0) return "FIRST DIVISION (60-84%)";
                return "PASS CLASS (40-59%)";
            }));

        System.out.println(">>> CLASSIFICATION BY PERFORMANCE TIER:");
        gradeTierMap.forEach((tier, list) -> {
            System.out.println("   🏅 " + tier + ":");
            list.forEach(s -> System.out.println("      - " + s.name() + " (" + s.score() + "%)"));
        });

        System.out.println("\n==========================================================================");
    }

    record StudentScoreItem(String name, double score) {}
}
