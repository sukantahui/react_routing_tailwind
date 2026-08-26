/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 5: Collectors.groupingBy() - Overview of Classification Pipelines
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GroupingByOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: COLLECTORS.GROUPINGBY() OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentProfile> students = List.of(
            new StudentProfile("Swadeep Paul", "Barrackpore", "Java Core"),
            new StudentProfile("Tuhina Das", "Naihati", "Spring Boot"),
            new StudentProfile("Abhronila Das", "Barrackpore", "Python"),
            new StudentProfile("Debangshu Mukherjee", "Naihati", "Java Core"),
            new StudentProfile("Priya Sharma", "Barrackpore", "Java Core")
        );

        // 1. Grouping Students by Center: Map<String, List<StudentProfile>>
        System.out.println(">>> 1. Grouping Students by Academic Center:");
        Map<String, List<StudentProfile>> byCenter = students.stream()
            .collect(Collectors.groupingBy(StudentProfile::center));

        byCenter.forEach((center, list) -> {
            System.out.println("   📍 Center: " + center + " (" + list.size() + " students)");
            list.forEach(s -> System.out.println("      - " + s.name() + " [" + s.course() + "]"));
        });

        // 2. Grouping Students by Course: Map<String, List<StudentProfile>>
        System.out.println("\n>>> 2. Grouping Students by Course Title:");
        Map<String, List<StudentProfile>> byCourse = students.stream()
            .collect(Collectors.groupingBy(StudentProfile::course));

        byCourse.forEach((course, list) -> {
            System.out.println("   📚 Course: " + course + " -> " + list.stream().map(StudentProfile::name).toList());
        });

        System.out.println("\n==========================================================================");
    }

    record StudentProfile(String name, String center, String course) {}
}
