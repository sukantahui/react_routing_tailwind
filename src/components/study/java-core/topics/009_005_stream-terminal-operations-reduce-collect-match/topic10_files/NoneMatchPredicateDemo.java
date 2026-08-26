/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 10: noneMatch(Predicate) - Total Absence Condition Matching
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class NoneMatchPredicateDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: NONEMATCH(PREDICATE) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentExam> exams = List.of(
            new StudentExam("Swadeep Paul", 88.0),
            new StudentExam("Tuhina Das", 94.5),
            new StudentExam("Abhronila Das", 78.0),
            new StudentExam("Debangshu Mukherjee", 91.0)
        );

        // 1. Check if NO students failed (Score < 40.0) -> returns true
        boolean noFailures = exams.stream()
            .noneMatch(e -> e.score() < 40.0);
        System.out.println("1. Did zero students fail the exam? " + noFailures);

        // 2. Check if NO students have a score below 80.0 (Abhronila has 78.0 -> returns false!)
        boolean noOneBelow80 = exams.stream()
            .noneMatch(e -> e.score() < 80.0);
        System.out.println("2. Are there zero students scoring below 80%? " + noOneBelow80);

        // 3. Behavior on empty stream: returns true (Vacuously true)
        boolean emptyNoneMatch = List.<String>of().stream().noneMatch(s -> true);
        System.out.println("3. noneMatch on empty stream: " + emptyNoneMatch);

        System.out.println("\n>>> DE MORGAN EQUIVALENCE:");
        System.out.println("  stream.noneMatch(p) === stream.allMatch(p.negate())");
        System.out.println("==========================================================================");
    }

    record StudentExam(String name, double score) {}
}
