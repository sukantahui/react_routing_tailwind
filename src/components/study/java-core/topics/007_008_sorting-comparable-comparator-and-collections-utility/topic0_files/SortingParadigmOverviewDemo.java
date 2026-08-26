/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 0: Sorting Objects in Java: Natural Ordering vs Custom Strategy Ordering
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class TraineeRecord implements Comparable<TraineeRecord> {
    private final int roll;
    private final String name;
    private final double gpa;

    public TraineeRecord(int roll, String name, double gpa) {
        this.roll = roll;
        this.name = name;
        this.gpa = gpa;
    }

    public int getRoll() { return roll; }
    public String getName() { return name; }
    public double getGpa() { return gpa; }

    // 1. NATURAL ORDERING: Ascending Roll Number
    @Override
    public int compareTo(TraineeRecord other) {
        return Integer.compare(this.roll, other.roll);
    }

    @Override
    public String toString() {
        return String.format("[Roll=%d, Name=%-9s, GPA=%.2f]", roll, name, gpa);
    }
}

public class SortingParadigmOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: SORTING PARADIGMS (NATURAL vs CUSTOM) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<TraineeRecord> trainees = new ArrayList<>(List.of(
                new TraineeRecord(104, "Swadeep", 9.85),
                new TraineeRecord(101, "Tuhina", 9.95),
                new TraineeRecord(103, "Abhronila", 9.75),
                new TraineeRecord(102, "Debangshu", 9.60)
        ));

        // 1. Natural Ordering (Comparable):
        Collections.sort(trainees);
        System.out.println(">>> 1. Sorted by Natural Ordering (Comparable -> Roll Ascending):");
        trainees.forEach(t -> System.out.println("  " + t));

        // 2. Custom Strategy Ordering (Comparator):
        trainees.sort(Comparator.comparingDouble(TraineeRecord::getGpa).reversed());
        System.out.println("\n>>> 2. Sorted by Custom Strategy (Comparator -> Highest GPA First):");
        trainees.forEach(t -> System.out.println("  " + t));

        System.out.println("\n>>> THE 2 SORTING PARADIGMS IN JAVA:");
        System.out.println("  1. Natural Ordering (Comparable<T>) : Intrinsic to the class. Implements single 'compareTo()'. Represents default sorting.");
        System.out.println("  2. Strategy Ordering (Comparator<T>): External strategy. Implements 'compare(o1, o2)'. Allows infinite dynamic sorting criteria.");

        System.out.println("\n==========================================================================");
    }
}