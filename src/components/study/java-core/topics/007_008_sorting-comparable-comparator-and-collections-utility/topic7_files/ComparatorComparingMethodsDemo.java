/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 7: Declarative Sorting: Comparator.comparing() & Primitive comparingInt/Double
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class AccoTaxFaculty {
    private final String name;
    private final double salary;
    private final int experienceYears;

    public AccoTaxFaculty(String name, double salary, int experienceYears) {
        this.name = name;
        this.salary = salary;
        this.experienceYears = experienceYears;
    }

    public String getName() { return name; }
    public double getSalary() { return salary; }
    public int getExperienceYears() { return experienceYears; }

    @Override
    public String toString() {
        return String.format("[Faculty: %-10s | Salary: ₹%,.2f | Exp: %2d yrs]", name, salary, experienceYears);
    }
}

public class ComparatorComparingMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: Comparator.comparing() & PRIMITIVE SPECIALIZATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<AccoTaxFaculty> facultyList = new ArrayList<>(List.of(
                new AccoTaxFaculty("Swadeep", 45000.0, 5),
                new AccoTaxFaculty("Tuhina", 55000.0, 8),
                new AccoTaxFaculty("Abhronila", 42000.0, 3),
                new AccoTaxFaculty("Debangshu", 60000.0, 10)
        ));

        // 1. Comparator.comparing() with Method Reference:
        facultyList.sort(Comparator.comparing(AccoTaxFaculty::getName));
        System.out.println(">>> 1. Sorted by Name (Comparator.comparing(AccoTaxFaculty::getName)):");
        facultyList.forEach(f -> System.out.println("  " + f));

        // 2. Primitive Specialization: comparingDouble() (Zero Auto-Boxing Overhead!):
        facultyList.sort(Comparator.comparingDouble(AccoTaxFaculty::getSalary).reversed());
        System.out.println("\n>>> 2. Sorted by Salary Descending (comparingDouble().reversed()):");
        facultyList.forEach(f -> System.out.println("  " + f));

        // 3. Primitive Specialization: comparingInt():
        facultyList.sort(Comparator.comparingInt(AccoTaxFaculty::getExperienceYears));
        System.out.println("\n>>> 3. Sorted by Experience Ascending (comparingInt()):");
        facultyList.forEach(f -> System.out.println("  " + f));

        System.out.println("\n>>> PERFORMANCE BENEFIT OF comparingInt / comparingDouble:");
        System.out.println("  - 'Comparator.comparing(f -> f.getSalary())' auto-boxes double -> Double, allocating thousands of wrapper objects.");
        System.out.println("  - 'Comparator.comparingDouble(AccoTaxFaculty::getSalary)' uses raw primitive double comparisons (ZERO heap allocations!).");

        System.out.println("\n==========================================================================");
    }
}