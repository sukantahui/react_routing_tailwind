/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 4: The java.util.Comparator<T> Interface: Strategy Pattern via 'int compare(T o1, T o2)'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class StudentCandidate {
    private final String name;
    private final double gpa;
    private final int experienceMonths;

    public StudentCandidate(String name, double gpa, int experienceMonths) {
        this.name = name;
        this.gpa = gpa;
        this.experienceMonths = experienceMonths;
    }

    public String getName() { return name; }
    public double getGpa() { return gpa; }
    public int getExperienceMonths() { return experienceMonths; }

    @Override
    public String toString() {
        return String.format("[Name=%-10s, GPA=%.2f, Exp=%2d mo]", name, gpa, experienceMonths);
    }
}

// 1. Classical Explicit Strategy Comparator Class (by Experience Descending):
class ExperienceComparator implements Comparator<StudentCandidate> {
    @Override
    public int compare(StudentCandidate o1, StudentCandidate o2) {
        // Descending comparison: o2 vs o1:
        return Integer.compare(o2.getExperienceMonths(), o1.getExperienceMonths());
    }
}

public class ComparatorStrategyPatternDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: java.util.Comparator<T> STRATEGY PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentCandidate> candidates = new ArrayList<>(List.of(
                new StudentCandidate("Swadeep", 9.85, 24),
                new StudentCandidate("Tuhina", 9.95, 12),
                new StudentCandidate("Abhronila", 9.75, 36),
                new StudentCandidate("Debangshu", 9.60, 6)
        ));

        // 1. Sort by Strategy 1 (Experience Descending via Class):
        candidates.sort(new ExperienceComparator());
        System.out.println(">>> 1. Strategy 1: Highest Experience First (Explicit Comparator Class):");
        candidates.forEach(c -> System.out.println("  " + c));

        // 2. Sort by Strategy 2 (GPA Descending via Lambda Expression):
        candidates.sort((c1, c2) -> Double.compare(c2.getGpa(), c1.getGpa()));
        System.out.println("\n>>> 2. Strategy 2: Highest GPA First (Modern Lambda Comparator):");
        candidates.forEach(c -> System.out.println("  " + c));

        System.out.println("\n>>> HOW COMPARATOR IMPLEMENTS THE STRATEGY PATTERN (GoF):");
        System.out.println("  1. 'StudentCandidate' class remains completely untouched (Open-Closed Principle).");
        System.out.println("  2. Client algorithms inject sorting strategies dynamically into 'list.sort(comparator)'.");

        System.out.println("\n==========================================================================");
    }
}