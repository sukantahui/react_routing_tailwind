/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 10: TreeSet Ordering: Natural Ordering (Comparable) vs Custom (Comparator)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Comparator;
import java.util.TreeSet;

class TraineeProfile implements Comparable<TraineeProfile> {
    private final int roll;
    private final String name;
    private final double gpa;

    public TraineeProfile(int roll, String name, double gpa) {
        this.roll = roll;
        this.name = name;
        this.gpa = gpa;
    }

    public int getRoll() { return roll; }
    public String getName() { return name; }
    public double getGpa() { return gpa; }

    // NATURAL ORDERING: Ascending Roll Number
    @Override
    public int compareTo(TraineeProfile other) {
        return Integer.compare(this.roll, other.roll);
    }

    @Override
    public String toString() {
        return String.format("[Roll=%d, Name=%-8s, GPA=%.2f]", roll, name, gpa);
    }
}

public class TreeSetNaturalVsCustomOrderingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: TreeSet NATURAL vs CUSTOM ORDERING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeProfile t1 = new TraineeProfile(104, "Swadeep", 9.85);
        TraineeProfile t2 = new TraineeProfile(101, "Tuhina", 9.95);
        TraineeProfile t3 = new TraineeProfile(103, "Abhronila", 9.75);

        // 1. NATURAL ORDERING (Comparable: by Roll Ascending):
        TreeSet<TraineeProfile> naturalSet = new TreeSet<>();
        naturalSet.add(t1);
        naturalSet.add(t2);
        naturalSet.add(t3);

        System.out.println(">>> 1. Natural Ordering (Comparable - by Roll Number):");
        naturalSet.forEach(t -> System.out.println("  " + t));

        // 2. CUSTOM ORDERING (Comparator: by GPA Descending):
        Comparator<TraineeProfile> gpaDescComparator = Comparator.comparingDouble(TraineeProfile::getGpa).reversed();
        TreeSet<TraineeProfile> customSet = new TreeSet<>(gpaDescComparator);
        customSet.addAll(naturalSet);

        System.out.println("\n>>> 2. Custom Ordering (Comparator - by Highest GPA First):");
        customSet.forEach(t -> System.out.println("  " + t));

        System.out.println("\n==========================================================================");
    }
}