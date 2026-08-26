/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 8: anyMatch(Predicate) - Existential Condition Matching
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class AnyMatchPredicateDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: ANYMATCH(PREDICATE) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentAccount> accounts = List.of(
            new StudentAccount("Swadeep Paul", "Barrackpore", true, 92.5),
            new StudentAccount("Tuhina Das", "Naihati", true, 95.0),
            new StudentAccount("Abhronila Das", "Shyamnagar", false, 78.0),
            new StudentAccount("Debangshu Mukherjee", "Ichapur", true, 91.0)
        );

        // 1. Check if ANY student is from Naihati
        boolean hasNaihatiStudent = accounts.stream()
            .anyMatch(acc -> "Naihati".equals(acc.center()));
        System.out.println("1. Is there any student from Naihati center? " + hasNaihatiStudent);

        // 2. Check if ANY student has an inactive account
        boolean hasInactiveStudent = accounts.stream()
            .anyMatch(acc -> !acc.active());
        System.out.println("2. Are there any inactive student accounts? " + hasInactiveStudent);

        // 3. Check if ANY student scored 100 (No one has 100 -> evaluates entire stream and returns false)
        boolean hasCentum = accounts.stream()
            .anyMatch(acc -> acc.score() == 100.0);
        System.out.println("3. Did anyone achieve a perfect 100% score? " + hasCentum);

        // 4. Calling anyMatch on an EMPTY stream: ALWAYS FALSE
        boolean emptyMatch = List.<String>of().stream().anyMatch(s -> true);
        System.out.println("4. anyMatch on empty stream: " + emptyMatch);

        System.out.println("\n==========================================================================");
    }

    record StudentAccount(String name, String center, boolean active, double score) {}
}
