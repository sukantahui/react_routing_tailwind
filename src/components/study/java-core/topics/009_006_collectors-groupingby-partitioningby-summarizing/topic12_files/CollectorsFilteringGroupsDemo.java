/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 12: Collectors.filtering() (Java 9) - Retaining Empty Groups
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CollectorsFilteringGroupsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: COLLECTORS.FILTERING() (JAVA 9) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentEntry> students = List.of(
            new StudentEntry("Swadeep Paul", "Barrackpore", 94.0),
            new StudentEntry("Tuhina Das", "Naihati", 96.5),
            new StudentEntry("Abhronila Das", "Shyamnagar", 78.0),
            new StudentEntry("Debangshu Mukherjee", "Ichapur", 65.0)
        );

        // Problem: We want a Map of ALL centers to their Distinction students (score >= 90).
        // If Ichapur or Shyamnagar have NO distinction students, we still want the keys present with []!

        // Approach 1 (WRONG): Upstream stream.filter() drops Shyamnagar & Ichapur entirely!
        Map<String, List<StudentEntry>> upstreamFiltered = students.stream()
            .filter(s -> s.score() >= 90.0)
            .collect(Collectors.groupingBy(StudentEntry::center));
        System.out.println("1. Upstream filter (MISSING Shyamnagar & Ichapur keys!):\n   " + upstreamFiltered.keySet());

        // Approach 2 (CORRECT): Java 9 Collectors.filtering() preserves ALL group keys!
        Map<String, List<String>> downstreamFiltered = students.stream()
            .collect(Collectors.groupingBy(
                StudentEntry::center,
                Collectors.filtering(
                    s -> s.score() >= 90.0,
                    Collectors.mapping(StudentEntry::name, Collectors.toList())
                )
            ));

        System.out.println("\n2. Java 9 Collectors.filtering() (ALL 4 Center Keys Retained!):");
        downstreamFiltered.forEach((center, distinctionList) -> {
            System.out.println("   📍 " + center + " : " + distinctionList);
        });

        System.out.println("\n==========================================================================");
    }

    record StudentEntry(String name, String center, double score) {}
}
