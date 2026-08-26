/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 8: Downstream Collectors in groupingBy() - Architectural Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class DownstreamCollectorsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: DOWNSTREAM COLLECTORS IN GROUPINGBY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentData> students = List.of(
            new StudentData("Swadeep Paul", "Barrackpore", 94.0),
            new StudentData("Priya Sharma", "Barrackpore", 82.0),
            new StudentData("Tuhina Das", "Naihati", 96.5),
            new StudentData("Abhronila Das", "Shyamnagar", 88.0),
            new StudentData("Debangshu Mukherjee", "Naihati", 91.0)
        );

        // 1. Downstream counting(): Map<String, Long> (Student count per center)
        Map<String, Long> countPerCenter = students.stream()
            .collect(Collectors.groupingBy(StudentData::center, Collectors.counting()));
        System.out.println("1. Student Count per Center: " + countPerCenter);

        // 2. Downstream toSet(): Map<String, Set<String>> (Unique student names per center)
        Map<String, Set<String>> namesPerCenter = students.stream()
            .collect(Collectors.groupingBy(
                StudentData::center,
                Collectors.mapping(StudentData::name, Collectors.toSet())
            ));
        System.out.println("2. Unique Names per Center: " + namesPerCenter);

        // 3. Downstream averagingDouble(): Map<String, Double> (Average score per center)
        Map<String, Double> avgScorePerCenter = students.stream()
            .collect(Collectors.groupingBy(
                StudentData::center,
                Collectors.averagingDouble(StudentData::score)
            ));
        System.out.println("3. Average Score per Center: " + avgScorePerCenter);

        System.out.println("\n==========================================================================");
    }

    record StudentData(String name, String center, double score) {}
}
