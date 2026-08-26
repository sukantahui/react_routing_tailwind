/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 6: Calculating Sum, Min, Max & Custom Business Aggregations via reduce()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class CustomAggregationsReduceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: CUSTOM AGGREGATIONS WITH REDUCE() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<CourseEnrollment> enrollments = List.of(
            new CourseEnrollment("Java Core", 3500.0, 18),
            new CourseEnrollment("Spring Boot", 5000.0, 12),
            new CourseEnrollment("Microservices", 6000.0, 8),
            new CourseEnrollment("Full Stack DevOps", 8500.0, 10)
        );

        // 1. Total Revenue: sum of (fee * studentCount)
        double totalRevenue = enrollments.stream()
            .map(e -> e.fee() * e.studentCount())
            .reduce(0.0, Double::sum);
        System.out.println("1. Total Projected Revenue: ₹" + totalRevenue);

        // 2. Highest Course Fee via reduce(BinaryOperator)
        CourseEnrollment mostExpensive = enrollments.stream()
            .reduce((c1, c2) -> c1.fee() >= c2.fee() ? c1 : c2)
            .orElseThrow();
        System.out.println("2. Most Premium Course: " + mostExpensive.title() + " (₹" + mostExpensive.fee() + ")");

        // 3. Custom Business Accumulator: Building a formatted batch report summary
        String batchSummary = enrollments.stream()
            .map(e -> String.format("[%s: %d students]", e.title(), e.studentCount()))
            .reduce("ACADEMY BATCH REPORT: ", (accum, item) -> accum + " | " + item);
        System.out.println("\n3. Formatted Batch Summary:\n   " + batchSummary);

        System.out.println("\n==========================================================================");
    }

    record CourseEnrollment(String title, double fee, int studentCount) {}
}
