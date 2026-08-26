/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 0: What is the Stream API? Declarative vs Imperative Processing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class WhatIsStreamApiDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS THE STREAM API? - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<Student> students = List.of(
            new Student("Swadeep Paul", "Barrackpore", 88.5),
            new Student("Tuhina Das", "Naihati", 94.0),
            new Student("Abhronila Das", "Shyamnagar", 76.0),
            new Student("Debangshu Mukherjee", "Ichapur", 91.5),
            new Student("Priya Sharma", "Barrackpore", 65.0)
        );

        // --- 1. OLD IMPERATIVE STYLE (HOW to do it: loops, temp collections, mutable flags) ---
        List<String> topStudentsImperative = new ArrayList<>();
        for (Student s : students) {
            if (s.getScore() >= 85.0) {
                topStudentsImperative.add(s.getName().toUpperCase());
            }
        }
        Collections.sort(topStudentsImperative);
        System.out.println("1. Top Students (Imperative Loop): " + topStudentsImperative);

        // --- 2. MODERN DECLARATIVE STREAM PIPELINE (WHAT to do: filter, map, sorted, collect) ---
        List<String> topStudentsDeclarative = students.stream()
            .filter(s -> s.getScore() >= 85.0)           // Filter condition
            .map(s -> s.getName().toUpperCase())        // Transformation
            .sorted()                                   // Ordering
            .collect(Collectors.toList());              // Terminal collection

        System.out.println("2. Top Students (Stream Pipeline): " + topStudentsDeclarative);

        System.out.println("\n>>> KEY BENEFITS OF STREAM API:");
        System.out.println("  1. Declarative: Expresses intent cleanly without boilerplate loops.");
        System.out.println("  2. Composable: Pipelines easily chain filter, map, sort, limit operations.");
        System.out.println("  3. Parallelizable: Seamless transition to multi-core processing via .parallelStream().");
        System.out.println("==========================================================================");
    }

    static class Student {
        private final String name;
        private final String center;
        private final double score;

        public Student(String name, String center, double score) {
            this.name = name;
            this.center = center;
            this.score = score;
        }

        public String getName() { return name; }
        public String getCenter() { return center; }
        public double getScore() { return score; }
    }
}
