/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 13: java.time.temporal.ChronoUnit: Single-Unit Distance Calculations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.ChronoUnit;

public class ChronoUnitDistanceCalculationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: ChronoUnit DISTANCE CALCULATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LocalDate courseStart = LocalDate.of(2026, Month.JANUARY, 1);
        LocalDate courseEnd   = LocalDate.of(2026, Month.DECEMBER, 31);

        // Calculating Total Distance in Specific Single Units:
        long totalDays   = ChronoUnit.DAYS.between(courseStart, courseEnd);
        long totalWeeks  = ChronoUnit.WEEKS.between(courseStart, courseEnd);
        long totalMonths = ChronoUnit.MONTHS.between(courseStart, courseEnd);

        System.out.println(">>> 1. Java Core Pro Batch 2026 Duration via ChronoUnit:");
        System.out.println("  Total Days   : " + totalDays + " days");
        System.out.println("  Total Weeks  : " + totalWeeks + " weeks");
        System.out.println("  Total Months : " + totalMonths + " months");

        // Useful for billing interest calculation (e.g. days between loan issue and payment):
        LocalDate loanDate = LocalDate.of(2026, 3, 1);
        LocalDate repaymentDate = LocalDate.of(2026, 5, 15);
        long interestDays = ChronoUnit.DAYS.between(loanDate, repaymentDate);
        System.out.println("\n>>> 2. AccoTax Loan Interest Days: " + interestDays + " days for interest compounding.");

        System.out.println("\n==========================================================================");
    }
}