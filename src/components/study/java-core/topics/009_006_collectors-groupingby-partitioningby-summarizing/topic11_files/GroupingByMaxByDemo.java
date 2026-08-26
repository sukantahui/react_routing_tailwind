/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 11: groupingBy(classifier, maxBy()/minBy()) - Finding Group Extremes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class GroupingByMaxByDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: GROUPINGBY WITH MAXBY() / MINBY() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentScoreMetric> metrics = List.of(
            new StudentScoreMetric("Swadeep Paul", "Barrackpore", 94.0),
            new StudentScoreMetric("Priya Sharma", "Barrackpore", 88.0),
            new StudentScoreMetric("Tuhina Das", "Naihati", 96.5),
            new StudentScoreMetric("Debangshu Mukherjee", "Naihati", 91.0),
            new StudentScoreMetric("Abhronila Das", "Shyamnagar", 89.5),
            new StudentScoreMetric("Rohan Sen", "Shyamnagar", 75.0)
        );

        // 1. Finding Top Scorer in EACH Center via maxBy():
        // Output type: Map<String, Optional<StudentScoreMetric>>
        System.out.println(">>> 1. Top Performer in Each Academic Center (Map<String, Optional<Student>>):");
        Map<String, Optional<StudentScoreMetric>> topPerCenter = metrics.stream()
            .collect(Collectors.groupingBy(
                StudentScoreMetric::center,
                Collectors.maxBy(Comparator.comparingDouble(StudentScoreMetric::score))
            ));

        topPerCenter.forEach((center, optStudent) -> {
            optStudent.ifPresent(s -> 
                System.out.println("   🏆 " + center + " Topper: " + s.name() + " (" + s.score() + "%)")
            );
        });

        // 2. Clean Unwrapping with collectingAndThen: Map<String, StudentScoreMetric> (NO Optional wrapper!)
        System.out.println("\n>>> 2. Unwrapped Topper Map using collectingAndThen(maxBy, Optional::orElseThrow):");
        Map<String, StudentScoreMetric> unwrappedToppers = metrics.stream()
            .collect(Collectors.groupingBy(
                StudentScoreMetric::center,
                Collectors.collectingAndThen(
                    Collectors.maxBy(Comparator.comparingDouble(StudentScoreMetric::score)),
                    Optional::orElseThrow
                )
            ));

        unwrappedToppers.forEach((center, s) -> {
            System.out.println("   🥇 " + center + ": " + s.name() + " [" + s.score() + "%]");
        });

        System.out.println("\n==========================================================================");
    }

    record StudentScoreMetric(String name, String center, double score) {}
}
