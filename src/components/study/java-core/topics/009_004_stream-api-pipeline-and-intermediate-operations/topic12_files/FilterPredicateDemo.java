/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 12: filter(Predicate) - Selecting Elements Matching Conditions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;
import java.util.function.Predicate;

public class FilterPredicateDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: FILTER(PREDICATE) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentCourse> enrollments = List.of(
            new StudentCourse("Swadeep Paul", "Barrackpore", "Java Core", 92.0, true),
            new StudentCourse("Tuhina Das", "Naihati", "Spring Boot", 95.0, true),
            new StudentCourse("Abhronila Das", "Shyamnagar", "Java Core", 78.0, false),
            new StudentCourse("Debangshu Mukherjee", "Ichapur", "DevOps", 88.0, true),
            new StudentCourse("Priya Sharma", "Barrackpore", "Java Core", 84.0, true)
        );

        // 1. Basic Single Filter
        System.out.println("1. Java Core Enrolled Students:");
        enrollments.stream()
            .filter(e -> "Java Core".equals(e.course()))
            .forEach(e -> System.out.println("   - " + e.studentName() + " (" + e.center() + ")"));

        // 2. Chained Multiple Filters
        System.out.println("\n2. Active Students with Score >= 85.0 (Chained Filters):");
        enrollments.stream()
            .filter(StudentCourse::active)
            .filter(e -> e.score() >= 85.0)
            .forEach(e -> System.out.println("   - " + e.studentName() + " scored: " + e.score()));

        // 3. Composed Predicate using and() & or()
        Predicate<StudentCourse> isBarrackpore = e -> "Barrackpore".equals(e.center());
        Predicate<StudentCourse> isDistinction = e -> e.score() >= 90.0;

        System.out.println("\n3. Barrackpore Center OR Distinction Score:");
        enrollments.stream()
            .filter(isBarrackpore.or(isDistinction))
            .forEach(e -> System.out.println("   - " + e.studentName() + " (" + e.center() + ", " + e.score() + ")"));

        System.out.println("\n==========================================================================");
    }

    record StudentCourse(String studentName, String center, String course, double score, boolean active) {}
}
