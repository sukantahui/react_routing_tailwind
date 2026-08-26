/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 15: distinct() - Deduplicating Elements using equals & hashCode
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;
import java.util.Objects;

public class DistinctOperationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: DISTINCT() DEDUPLICATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Deduplicating Primitive Wrappers / Strings (equals/hashCode already built-in)
        List<String> centerNames = List.of(
            "Barrackpore", "Naihati", "Barrackpore", "Shyamnagar", "Naihati", "Ichapur"
        );
        System.out.println("1. Original Centers: " + centerNames);
        List<String> uniqueCenters = centerNames.stream()
            .distinct()
            .toList();
        System.out.println("   Deduplicated via distinct(): " + uniqueCenters);

        // 2. Custom Object Deduplication (Record automatically provides equals & hashCode)
        List<CourseEnrollment> enrollments = List.of(
            new CourseEnrollment("Swadeep Paul", "Java Core"),
            new CourseEnrollment("Tuhina Das", "Spring Boot"),
            new CourseEnrollment("Swadeep Paul", "Java Core"), // Duplicate
            new CourseEnrollment("Abhronila Das", "Java Core")
        );

        System.out.println("\n2. Deduplicating Custom Objects (CourseEnrollment):");
        List<CourseEnrollment> uniqueEnrollments = enrollments.stream()
            .distinct()
            .toList();
        uniqueEnrollments.forEach(e -> System.out.println("   - " + e));

        System.out.println("\n==========================================================================");
    }

    record CourseEnrollment(String studentName, String courseTitle) {}
}
