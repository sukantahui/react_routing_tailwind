/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 13: count(), min(Comparator) & max(Comparator)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class CountMinMaxAggregationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: COUNT(), MIN() & MAX() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentScoreCard> cards = List.of(
            new StudentScoreCard("Swadeep Paul", "Barrackpore", 88.5),
            new StudentScoreCard("Tuhina Das", "Naihati", 95.0),
            new StudentScoreCard("Abhronila Das", "Shyamnagar", 76.0),
            new StudentScoreCard("Debangshu Mukherjee", "Ichapur", 91.5)
        );

        // 1. count(): Returns long count of matching elements
        long distinctionCount = cards.stream()
            .filter(c -> c.score() >= 85.0)
            .count();
        System.out.println("1. Distinction Students Count (score >= 85): " + distinctionCount);

        // 2. max(Comparator): Top scorer
        Optional<StudentScoreCard> topScorer = cards.stream()
            .max(Comparator.comparingDouble(StudentScoreCard::score));
        topScorer.ifPresent(s -> System.out.println("2. Highest Scorer (Max): " + s.name() + " (" + s.score() + "%)"));

        // 3. min(Comparator): Lowest scorer
        Optional<StudentScoreCard> lowestScorer = cards.stream()
            .min(Comparator.comparingDouble(StudentScoreCard::score));
        lowestScorer.ifPresent(s -> System.out.println("3. Lowest Scorer (Min): " + s.name() + " (" + s.score() + "%)"));

        System.out.println("\n==========================================================================");
    }

    record StudentScoreCard(String name, String center, double score) {}
}
