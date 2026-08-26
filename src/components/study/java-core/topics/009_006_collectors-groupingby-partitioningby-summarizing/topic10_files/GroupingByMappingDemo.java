/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 10: groupingBy(classifier, mapping(mapper, downstream))
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

public class GroupingByMappingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: GROUPINGBY WITH MAPPING() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentRosterEntry> entries = List.of(
            new StudentRosterEntry("Swadeep Paul", "Barrackpore", "Java Core"),
            new StudentRosterEntry("Priya Sharma", "Barrackpore", "Java Core"),
            new StudentRosterEntry("Tuhina Das", "Naihati", "Spring Boot"),
            new StudentRosterEntry("Debangshu Mukherjee", "Naihati", "Java Core"),
            new StudentRosterEntry("Abhronila Das", "Shyamnagar", "Java Core")
        );

        // 1. Group by Center -> Extract only Student Names (Map<String, List<String>>):
        System.out.println(">>> 1. Group by Center -> Extract List of Names:");
        Map<String, List<String>> namesByCenter = entries.stream()
            .collect(Collectors.groupingBy(
                StudentRosterEntry::center,
                Collectors.mapping(StudentRosterEntry::studentName, Collectors.toList())
            ));

        namesByCenter.forEach((center, names) -> {
            System.out.println("   📍 " + center + " : " + names);
        });

        // 2. Group by Course -> Extract Sorted Unique Center Names (Map<String, Set<String>>):
        System.out.println("\n>>> 2. Group by Course -> Extract Sorted Centers (TreeSet):");
        Map<String, Set<String>> centersByCourse = entries.stream()
            .collect(Collectors.groupingBy(
                StudentRosterEntry::courseTitle,
                Collectors.mapping(
                    StudentRosterEntry::center,
                    Collectors.toCollection(TreeSet::new)
                )
            ));

        centersByCourse.forEach((course, centers) -> {
            System.out.println("   📚 " + course + " : " + centers);
        });

        System.out.println("\n==========================================================================");
    }

    record StudentRosterEntry(String studentName, String center, String courseTitle) {}
}
