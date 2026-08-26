/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 9: Functional Transformations on Optional - Pipeline Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class FunctionalTransformationsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: FUNCTIONAL TRANSFORMATIONS ON OPTIONAL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Optional<StudentEnrollment> enrollmentOpt = Optional.of(
            new StudentEnrollment("Swadeep Paul", "Barrackpore", 94.5)
        );

        // Fluent functional pipeline on Optional:
        // 1. filter: score >= 90 (Distinction check)
        // 2. map: extract center name
        // 3. map: transform to uppercase
        // 4. orElse: fallback if any step fails or is empty
        String distinctionCenter = enrollmentOpt
            .filter(e -> e.score() >= 90.0)
            .map(StudentEnrollment::center)
            .map(String::toUpperCase)
            .orElse("NOT_QUALIFIED");

        System.out.println("Distinction Center Result: " + distinctionCenter);

        // Demonstrating failure at filter step:
        Optional<StudentEnrollment> lowScoreOpt = Optional.of(
            new StudentEnrollment("Abhronila Das", "Shyamnagar", 78.0)
        );

        String lowScoreResult = lowScoreOpt
            .filter(e -> e.score() >= 90.0) // Fails filter -> turns into Optional.empty()!
            .map(StudentEnrollment::center)
            .orElse("NOT_QUALIFIED");

        System.out.println("Low Score Student Result : " + lowScoreResult);

        System.out.println("\n==========================================================================");
    }

    record StudentEnrollment(String name, String center, double score) {}
}
