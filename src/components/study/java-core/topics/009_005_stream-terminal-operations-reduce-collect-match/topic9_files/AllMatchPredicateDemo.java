/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 9: allMatch(Predicate) - Universal Condition Verification & Vacuous Truth
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class AllMatchPredicateDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ALLMATCH(PREDICATE) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentEligibility> batch = List.of(
            new StudentEligibility("Swadeep Paul", 88.5, true),
            new StudentEligibility("Tuhina Das", 95.0, true),
            new StudentEligibility("Abhronila Das", 76.0, true),
            new StudentEligibility("Debangshu Mukherjee", 91.5, true)
        );

        // 1. Check if ALL students are active (All true -> returns true)
        boolean allActive = batch.stream()
            .allMatch(StudentEligibility::active);
        System.out.println("1. Are all students active? " + allActive);

        // 2. Check if ALL students scored >= 80.0 (Abhronila has 76.0 -> short-circuits on Abhronila!)
        boolean allDistinction = batch.stream()
            .peek(s -> System.out.println("   [EVALUATING] " + s.name() + " (" + s.score() + ")"))
            .allMatch(s -> s.score() >= 80.0);
        System.out.println("2. Did all students achieve >= 80%? " + allDistinction);

        // 3. VACUOUS TRUTH: allMatch on an EMPTY stream returns TRUE!
        boolean emptyAllMatch = List.<String>of().stream().allMatch(s -> s.startsWith("X"));
        System.out.println("\n3. allMatch on empty stream (Vacuous Truth): " + emptyAllMatch);

        System.out.println("\n==========================================================================");
    }

    record StudentEligibility(String name, double score, boolean active) {}
}
