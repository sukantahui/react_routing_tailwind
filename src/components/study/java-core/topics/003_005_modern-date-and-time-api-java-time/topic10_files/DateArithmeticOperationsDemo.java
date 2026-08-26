/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 10: Date Arithmetic (Immutable Operations): plusDays(), minusMonths(), withDayOfMonth()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDate;
import java.time.Month;

public class DateArithmeticOperationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: IMMUTABLE DATE ARITHMETIC - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LocalDate invoiceDate = LocalDate.of(2026, Month.JANUARY, 15);
        System.out.println(">>> 1. Base Invoice Date: " + invoiceDate);

        // 1. Adding Days, Weeks, Months, Years:
        LocalDate paymentDueDate = invoiceDate.plusDays(30);   // Net 30 payment terms
        LocalDate nextQuarter    = invoiceDate.plusMonths(3);
        LocalDate nextYear       = invoiceDate.plusYears(1);

        System.out.println("\n>>> 2. Forward Additions (plus...):");
        System.out.println("  Due Date (+30 Days)  : " + paymentDueDate);
        System.out.println("  Next Quarter (+3 Mo) : " + nextQuarter);
        System.out.println("  Next Year (+1 Yr)    : " + nextYear);

        // 2. Subtractions (minus...):
        LocalDate auditPast = invoiceDate.minusMonths(6);
        System.out.println("\n>>> 3. Backward Subtractions (minus...):");
        System.out.println("  Past Audit (-6 Mo)   : " + auditPast);

        // 3. Absolute Adjusters (with...):
        LocalDate monthStart = invoiceDate.withDayOfMonth(1);   // First day of month
        LocalDate leapEnd    = LocalDate.of(2024, 2, 10).withDayOfMonth(29); // Leap year handling

        System.out.println("\n>>> 4. Temporal Mutation Adjusters (with...):");
        System.out.println("  First Day of Month   : " + monthStart);
        System.out.println("  Leap Year Adjusted   : " + leapEnd);

        System.out.println("\n==========================================================================");
    }
}