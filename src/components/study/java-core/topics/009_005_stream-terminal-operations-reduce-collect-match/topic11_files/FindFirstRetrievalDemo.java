/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 11: findFirst() - Encounter Order Element Retrieval
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;
import java.util.Optional;

public class FindFirstRetrievalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: FINDFIRST() ENCOUNTER ORDER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentRecord> roster = List.of(
            new StudentRecord(101, "Swadeep Paul", "Barrackpore", 88.0),
            new StudentRecord(102, "Tuhina Das", "Naihati", 95.0),
            new StudentRecord(103, "Abhronila Das", "Shyamnagar", 89.0),
            new StudentRecord(104, "Debangshu Mukherjee", "Ichapur", 92.5)
        );

        // 1. Finding first student from Barrackpore
        Optional<StudentRecord> firstBarrackpore = roster.stream()
            .filter(s -> "Barrackpore".equals(s.center()))
            .findFirst();

        System.out.println("1. First Barrackpore Student: " + firstBarrackpore.map(StudentRecord::name).orElse("None"));

        // 2. Finding first student with score > 90
        Optional<StudentRecord> firstDistinction = roster.stream()
            .filter(s -> s.score() > 90.0)
            .findFirst();

        System.out.println("2. First Distinction Student (Encounter Order): " + firstDistinction.map(StudentRecord::name).orElse("None"));

        // 3. Handling no matches safely with orElseGet()
        Optional<StudentRecord> firstScholarship = roster.stream()
            .filter(s -> s.score() >= 99.0)
            .findFirst();

        StudentRecord result = firstScholarship.orElseGet(() -> new StudentRecord(0, "Default Fallback", "Barrackpore", 0.0));
        System.out.println("3. Fallback Student Record: " + result);

        System.out.println("\n==========================================================================");
    }

    record StudentRecord(int id, String name, String center, double score) {}
}
