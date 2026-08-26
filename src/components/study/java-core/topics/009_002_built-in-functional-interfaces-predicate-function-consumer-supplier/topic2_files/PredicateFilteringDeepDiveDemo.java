/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 2: java.util.function.Predicate<T>: boolean test(T t) Filtering Deep Dive
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.Predicate;

class StudentCandidate {
    final String name;
    final int marks;
    final boolean feePaid;

    public StudentCandidate(String name, int marks, boolean feePaid) {
        this.name = name;
        this.marks = marks;
        this.feePaid = feePaid;
    }
}

public class PredicateFilteringDeepDiveDemo {

    public static void filterStudents(List<StudentCandidate> list, Predicate<StudentCandidate> condition, String label) {
        System.out.println(">>> Filtered by: " + label);
        for (StudentCandidate student : list) {
            if (condition.test(student)) {
                System.out.printf("  [MATCH] %s (Marks: %d, Fee Paid: %b)%n",
                        student.name, student.marks, student.feePaid);
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: Predicate<T> FILTERING DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentCandidate> batch = List.of(
                new StudentCandidate("Swadeep Paul", 85, true),
                new StudentCandidate("Tuhina Das", 92, true),
                new StudentCandidate("Abhronila Das", 45, true),
                new StudentCandidate("Debangshu Mukherjee", 78, false)
        );

        // 1. Filter: Honors Students (Marks >= 80):
        Predicate<StudentCandidate> isHonors = student -> student.marks >= 80;
        filterStudents(batch, isHonors, "Honors Students (Marks >= 80)");

        // 2. Filter: Fee Cleared Candidates:
        Predicate<StudentCandidate> isFeeCleared = student -> student.feePaid;
        filterStudents(batch, isFeeCleared, "Fee Cleared Candidates");

        System.out.println("==========================================================================");
    }
}