/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 12: Statistical Analysis: Collections.min(), max(), frequency(), and disjoint()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Collections;
import java.util.List;
import java.util.Set;

public class CollectionsStatisticalAnalysisDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: Collections STATISTICAL ANALYSIS METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> feeReceipts = List.of(5000, 8500, 5000, 12000, 5000, 9500);

        // 1. min() and max():
        int lowestFee = Collections.min(feeReceipts);
        int highestFee = Collections.max(feeReceipts);

        System.out.println(">>> 1. Extremes (min & max):");
        System.out.println("  Lowest Fee Receipt  : ₹" + lowestFee);
        System.out.println("  Highest Fee Receipt : ₹" + highestFee);

        // 2. frequency(): Counting Occurrences of a Target Value:
        int count5000 = Collections.frequency(feeReceipts, 5000);
        System.out.println("\n>>> 2. Frequency Analysis:");
        System.out.println("  Number of ₹5,000 receipts : " + count5000 + " occurrences");

        // 3. disjoint(): Testing if Two Collections Share Zero Common Elements:
        Set<String> barrackporeCourses = Set.of("Java Core", "Spring Boot", "GST & Taxation");
        Set<String> medicalCourses = Set.of("Anatomy", "Pharmacology");
        Set<String> commerceCourses = Set.of("GST & Taxation", "Auditing");

        boolean isDisjointMedical = Collections.disjoint(barrackporeCourses, medicalCourses);
        boolean isDisjointCommerce = Collections.disjoint(barrackporeCourses, commerceCourses);

        System.out.println("\n>>> 3. Set Intersection Analysis (Collections.disjoint):");
        System.out.println("  Barrackpore vs Medical  (Disjoint?): " + isDisjointMedical + " (Zero shared courses)");
        System.out.println("  Barrackpore vs Commerce (Disjoint?): " + isDisjointCommerce + " (Shares 'GST & Taxation'!)");

        System.out.println("\n==========================================================================");
    }
}