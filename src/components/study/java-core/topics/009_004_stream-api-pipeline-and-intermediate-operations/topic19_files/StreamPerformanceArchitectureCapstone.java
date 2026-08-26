/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 19: Stateless vs Stateful Operations: Enterprise Architecture & Performance Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class StreamPerformanceArchitectureCapstone {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 19: STREAM PIPELINE PERFORMANCE CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<EnterpriseStudent> students = List.of(
            new EnterpriseStudent(1, "Swadeep Paul", "Barrackpore", "Java Core", 94.0),
            new EnterpriseStudent(2, "Tuhina Das", "Naihati", "Spring Boot", 96.5),
            new EnterpriseStudent(3, "Abhronila Das", "Shyamnagar", "Java Core", 88.0),
            new EnterpriseStudent(4, "Debangshu Mukherjee", "Ichapur", "Microservices", 91.0),
            new EnterpriseStudent(5, "Priya Sharma", "Barrackpore", "Java Core", 79.5),
            new EnterpriseStudent(6, "Anish Dey", "Titagarh", "Java Core", 85.0),
            new EnterpriseStudent(7, "Swadeep Paul", "Barrackpore", "Java Core", 94.0) // Duplicate
        );

        System.out.println(">>> PRODUCTION PIPELINE OPTIMIZATION PATTERN:");
        System.out.println("  1. Filter early (stateless filter reduces N before expensive steps)");
        System.out.println("  2. Deduplicate (stateful distinct on reduced subset)");
        System.out.println("  3. Map to DTO (stateless 1-to-1 transformation)");
        System.out.println("  4. Sort (stateful sorted on smallest possible subset)");
        System.out.println("  5. Paginate (stateful limit/skip)\n");

        List<StudentDTO> topPerformers = students.stream()
            // Step 1: Filter early (reduce volume)
            .filter(s -> "Java Core".equals(s.course()) && s.score() >= 80.0)
            // Step 2: Deduplicate
            .distinct()
            // Step 3: Map to lightweight DTO
            .map(s -> new StudentDTO(s.name(), s.center(), s.score()))
            // Step 4: Sort by score descending
            .sorted(Comparator.comparingDouble(StudentDTO::score).reversed())
            // Step 5: Paginate top 3
            .limit(3)
            // Step 6: Collect
            .collect(Collectors.toList());

        System.out.println(">>> FINAL OPTIMIZED RESULT (Top 3 Java Core Distinction Students):");
        topPerformers.forEach(dto -> System.out.println("   🏆 " + dto));

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 009_004 MASTERED: 20 TOPICS COMPLETE & ENTERPRISE READY!");
        System.out.println("==========================================================================");
    }

    record EnterpriseStudent(int id, String name, String center, String course, double score) {}
    record StudentDTO(String name, String center, double score) {
        @Override
        public String toString() {
            return name + " (" + center + ") - " + score + "%";
        }
    }
}
