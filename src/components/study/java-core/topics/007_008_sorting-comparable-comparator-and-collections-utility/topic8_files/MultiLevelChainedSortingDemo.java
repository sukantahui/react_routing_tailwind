/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 8: Multi-Level Chained Sorting: thenComparing() & Multi-Column SQL-Like Ordering
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class StudentPlacementCandidate {
    private final String department;
    private final double gpa;
    private final String name;

    public StudentPlacementCandidate(String department, double gpa, String name) {
        this.department = department;
        this.gpa = gpa;
        this.name = name;
    }

    public String getDepartment() { return department; }
    public double getGpa() { return gpa; }
    public String getName() { return name; }

    @Override
    public String toString() {
        return String.format("[Dept: %-12s | GPA: %.2f | Name: %-10s]", department, gpa, name);
    }
}

public class MultiLevelChainedSortingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: MULTI-LEVEL CHAINED SORTING (thenComparing) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentPlacementCandidate> candidateList = new ArrayList<>(List.of(
                new StudentPlacementCandidate("Accounting", 9.85, "Swadeep"),
                new StudentPlacementCandidate("IT", 9.95, "Tuhina"),
                new StudentPlacementCandidate("Accounting", 9.85, "Abhronila"), // Same Dept, Same GPA!
                new StudentPlacementCandidate("IT", 9.70, "Debangshu"),
                new StudentPlacementCandidate("Accounting", 9.60, "Sourav")
        ));

        // Multi-level chained comparator (Like SQL: ORDER BY department ASC, gpa DESC, name ASC):
        Comparator<StudentPlacementCandidate> multiLevelSort = Comparator
                .comparing(StudentPlacementCandidate::getDepartment)                   // 1. Primary: Dept Ascending
                .thenComparing(StudentPlacementCandidate::getGpa, Collections.reverseOrder()) // 2. Secondary: GPA Descending
                .thenComparing(StudentPlacementCandidate::getName);                    // 3. Tertiary: Name Alphabetical

        candidateList.sort(multiLevelSort);

        System.out.println(">>> Multi-Level Chained Sort (Dept ASC -> GPA DESC -> Name ASC):");
        candidateList.forEach(c -> System.out.println("  " + c));

        System.out.println("\n>>> HOW thenComparing() WORKS AS A TIE-BREAKER:");
        System.out.println("  1. Primary comparator compares elements. If result != 0, it returns the result immediately.");
        System.out.println("  2. If primary comparator produces a TIE (result == 0), execution cascades down to 'thenComparing()'.");
        System.out.println("  3. You can chain unlimited tie-breakers seamlessly!");

        System.out.println("\n==========================================================================");
    }
}