/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 13: Collectors.partitioningBy() - Binary Predicate Partitioning
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CollectorsPartitioningByDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: COLLECTORS.PARTITIONINGBY() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentScoreItem> students = List.of(
            new StudentScoreItem("Swadeep Paul", 94.0),
            new StudentScoreItem("Tuhina Das", 96.5),
            new StudentScoreItem("Abhronila Das", 78.0),
            new StudentScoreItem("Debangshu Mukherjee", 88.5),
            new StudentScoreItem("Priya Sharma", 55.0),
            new StudentScoreItem("Anish Dey", 38.0)
        );

        // 1. Partitioning by Passing Grade (Score >= 40.0): Map<Boolean, List<StudentScoreItem>>
        System.out.println(">>> 1. Partitioning by Pass (>= 40.0) vs Fail (< 40.0):");
        Map<Boolean, List<StudentScoreItem>> passedPartition = students.stream()
            .collect(Collectors.partitioningBy(s -> s.score() >= 40.0));

        System.out.println("   Passed Students (true)  : " + passedPartition.get(true).stream().map(StudentScoreItem::name).toList());
        System.out.println("   Failed Students (false) : " + passedPartition.get(false).stream().map(StudentScoreItem::name).toList());

        // 2. Partitioning with Downstream counting(): Map<Boolean, Long>
        System.out.println("\n>>> 2. Distinction (>= 85%) Headcount Partition:");
        Map<Boolean, Long> distinctionCounts = students.stream()
            .collect(Collectors.partitioningBy(
                s -> s.score() >= 85.0,
                Collectors.counting()
            ));

        System.out.println("   Distinction Count (true)     : " + distinctionCounts.get(true));
        System.out.println("   Non-Distinction Count (false): " + distinctionCounts.get(false));

        System.out.println("\n==========================================================================");
    }

    record StudentScoreItem(String name, double score) {}
}
