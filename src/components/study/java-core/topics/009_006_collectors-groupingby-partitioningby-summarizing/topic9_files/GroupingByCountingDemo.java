/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 9: groupingBy(classifier, counting()) - Frequency Tables & Distribution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GroupingByCountingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: GROUPINGBY WITH COUNTING() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentCourseEnrollment> enrollments = List.of(
            new StudentCourseEnrollment("Swadeep Paul", "Java Core"),
            new StudentCourseEnrollment("Priya Sharma", "Java Core"),
            new StudentCourseEnrollment("Tuhina Das", "Spring Boot"),
            new StudentCourseEnrollment("Abhronila Das", "Java Core"),
            new StudentCourseEnrollment("Debangshu Mukherjee", "DevOps"),
            new StudentCourseEnrollment("Anish Dey", "Spring Boot"),
            new StudentCourseEnrollment("Rohan Sen", "Java Core")
        );

        // 1. Enrollment Count by Course (Histogram)
        System.out.println(">>> 1. Course Enrollment Frequency Histogram:");
        Map<String, Long> courseCounts = enrollments.stream()
            .collect(Collectors.groupingBy(
                StudentCourseEnrollment::courseTitle,
                Collectors.counting()
            ));

        courseCounts.forEach((course, count) -> {
            System.out.println("   📊 " + course + ": " + count + " students enrolled");
        });

        // 2. Word Frequency Counter in a Sentence
        String text = "java streams are fast and java streams are declarative and clean";
        Map<String, Long> wordFrequencies = Arrays.stream(text.split(" "))
            .collect(Collectors.groupingBy(
                word -> word,
                Collectors.counting()
            ));

        System.out.println("\n>>> 2. Word Frequency Distribution:");
        wordFrequencies.forEach((word, freq) -> {
            System.out.println("   - '" + word + "': " + freq + " times");
        });

        System.out.println("\n==========================================================================");
    }

    record StudentCourseEnrollment(String studentName, String courseTitle) {}
}
