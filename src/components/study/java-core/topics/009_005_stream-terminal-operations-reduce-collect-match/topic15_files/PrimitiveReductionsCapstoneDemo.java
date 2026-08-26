/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 15: Primitive Stream Reductions - Enterprise Statistical Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.DoubleSummaryStatistics;
import java.util.List;

public class PrimitiveReductionsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: PRIMITIVE REDUCTIONS CAPSTONE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<EnterpriseStudentReport> reports = List.of(
            new EnterpriseStudentReport("Swadeep Paul", "Barrackpore", 88.5),
            new EnterpriseStudentReport("Tuhina Das", "Naihati", 95.0),
            new EnterpriseStudentReport("Abhronila Das", "Shyamnagar", 76.5),
            new EnterpriseStudentReport("Debangshu Mukherjee", "Ichapur", 92.0),
            new EnterpriseStudentReport("Priya Sharma", "Barrackpore", 84.0)
        );

        // 1. Primitive sum() via mapToDouble
        double totalScores = reports.stream()
            .mapToDouble(EnterpriseStudentReport::score)
            .sum();
        System.out.println("1. Total Sum of Scores: " + totalScores);

        // 2. Primitive average() returning OptionalDouble
        double averageScore = reports.stream()
            .mapToDouble(EnterpriseStudentReport::score)
            .average()
            .orElse(0.0);
        System.out.println("2. Class Average Score: " + String.format("%.2f", averageScore) + "%");

        // 3. DoubleSummaryStatistics: 1-Pass complete analysis
        DoubleSummaryStatistics stats = reports.stream()
            .mapToDouble(EnterpriseStudentReport::score)
            .summaryStatistics();

        System.out.println("\n3. Comprehensive 1-Pass Statistical Report:");
        System.out.println("   ==========================================");
        System.out.println("   - Total Students Evaluated : " + stats.getCount());
        System.out.println("   - Highest Score (Max)      : " + stats.getMax() + "%");
        System.out.println("   - Lowest Score (Min)       : " + stats.getMin() + "%");
        System.out.println("   - Class Average (Mean)     : " + String.format("%.2f", stats.getAverage()) + "%");
        System.out.println("   - Cumulative Sum           : " + stats.getSum());
        System.out.println("   ==========================================");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 009_005 COMPLETE: TERMINAL OPERATIONS & REDUCTIONS MASTERED!");
        System.out.println("==========================================================================");
    }

    record EnterpriseStudentReport(String name, String center, double score) {}
}
