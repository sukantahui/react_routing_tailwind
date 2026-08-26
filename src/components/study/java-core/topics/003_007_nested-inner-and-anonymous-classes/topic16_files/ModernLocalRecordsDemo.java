/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 16: Modern Java 16+ Additions: Local Records & Local Interfaces in Method Bodies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

import java.util.List;

public class ModernLocalRecordsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: MODERN LOCAL RECORDS (JAVA 16+) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // In Java 16+, we can declare immutable 'record' types right inside a method:
        record TraineeRank(String name, String hub, int score) {
            public boolean isTopper() {
                return score >= 90;
            }
        }

        List<TraineeRank> batchResults = List.of(
                new TraineeRank("Swadeep Paul", "Barrackpore", 94),
                new TraineeRank("Tuhina Das", "Naihati", 91),
                new TraineeRank("Abhronila Das", "Shyamnagar", 88)
        );

        System.out.println(">>> Evaluated Batch Rankings via Method-Local Record:");
        for (TraineeRank rank : batchResults) {
            System.out.printf("  Trainee: %-15s | Hub: %-12s | Score: %d | Topper? %s%n",
                    rank.name(), rank.hub(), rank.score(), rank.isTopper() ? "YES 🏆" : "NO");
        }

        System.out.println("\n>>> NOTE: Local records are implicitly static, lightweight, and immutable!");

        System.out.println("\n==========================================================================");
    }
}