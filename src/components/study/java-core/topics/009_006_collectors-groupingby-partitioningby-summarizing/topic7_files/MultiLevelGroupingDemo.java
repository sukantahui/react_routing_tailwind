/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 7: Multi-Level Nested groupingBy() Pipelines
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MultiLevelGroupingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: MULTI-LEVEL NESTED GROUPINGBY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<EnrollmentRecord> enrollments = List.of(
            new EnrollmentRecord("Swadeep Paul", "Barrackpore", "Java Core"),
            new EnrollmentRecord("Priya Sharma", "Barrackpore", "Java Core"),
            new EnrollmentRecord("Rohan Sen", "Barrackpore", "Spring Boot"),
            new EnrollmentRecord("Tuhina Das", "Naihati", "Spring Boot"),
            new EnrollmentRecord("Debangshu Mukherjee", "Naihati", "Java Core"),
            new EnrollmentRecord("Abhronila Das", "Shyamnagar", "Java Core")
        );

        // 2-Level Multi-Grouping:
        // Outer Key: Center (String)
        // Inner Key: Course (String)
        // Value: List<EnrollmentRecord>
        // Result Type: Map<String, Map<String, List<EnrollmentRecord>>>
        Map<String, Map<String, List<EnrollmentRecord>>> hierarchy = enrollments.stream()
            .collect(Collectors.groupingBy(
                EnrollmentRecord::center,                                    // Level 1: Group by Center
                Collectors.groupingBy(EnrollmentRecord::course)             // Level 2: Group by Course
            ));

        System.out.println(">>> 2-TIER NESTED HIERARCHY (Center -> Course -> Students):");
        hierarchy.forEach((center, courseMap) -> {
            System.out.println("📍 CENTER: " + center);
            courseMap.forEach((course, studentList) -> {
                System.out.println("   📚 " + course + " (" + studentList.size() + " students):");
                studentList.forEach(s -> System.out.println("      - " + s.studentName()));
            });
        });

        System.out.println("\n==========================================================================");
    }

    record EnrollmentRecord(String studentName, String center, String course) {}
}
