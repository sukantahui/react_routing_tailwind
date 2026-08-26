/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 4: Summarization Collectors - counting(), summing(), averaging(), summarizing()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.stream.Collectors;

public class SummarizationCollectorsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: SUMMARIZATION COLLECTORS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentFeeRecord> feeRecords = List.of(
            new StudentFeeRecord("Swadeep Paul", "Barrackpore", 3500.0),
            new StudentFeeRecord("Tuhina Das", "Naihati", 5000.0),
            new StudentFeeRecord("Abhronila Das", "Shyamnagar", 3500.0),
            new StudentFeeRecord("Debangshu Mukherjee", "Ichapur", 6000.0)
        );

        // 1. Collectors.counting()
        long count = feeRecords.stream()
            .collect(Collectors.counting());
        System.out.println("1. Total Enrolled Students via counting(): " + count);

        // 2. Collectors.summingDouble()
        double totalFees = feeRecords.stream()
            .collect(Collectors.summingDouble(StudentFeeRecord::fee));
        System.out.println("2. Total Fees Collected via summingDouble(): ₹" + totalFees);

        // 3. Collectors.averagingDouble()
        double averageFee = feeRecords.stream()
            .collect(Collectors.averagingDouble(StudentFeeRecord::fee));
        System.out.println("3. Average Course Fee via averagingDouble(): ₹" + averageFee);

        // 4. Collectors.summarizingDouble() -> DoubleSummaryStatistics
        DoubleSummaryStatistics stats = feeRecords.stream()
            .collect(Collectors.summarizingDouble(StudentFeeRecord::fee));
        System.out.println("\n4. Comprehensive Summary Statistics:");
        System.out.println("   - Count   : " + stats.getCount());
        System.out.println("   - Min Fee : ₹" + stats.getMin());
        System.out.println("   - Max Fee : ₹" + stats.getMax());
        System.out.println("   - Sum     : ₹" + stats.getSum());
        System.out.println("   - Average : ₹" + stats.getAverage());

        System.out.println("\n==========================================================================");
    }

    record StudentFeeRecord(String name, String center, double fee) {}
}
