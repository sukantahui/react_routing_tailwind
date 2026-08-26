/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 3: LocalDate: Date Without Time or Timezone (Creation & Inspection)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;

public class LocalDateDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: java.time.LocalDate DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Current System Date:
        LocalDate today = LocalDate.now();
        System.out.println(">>> 1. Current Date: " + today);

        // 2. Specific Date Factory Method:
        LocalDate batchStart = LocalDate.of(2026, Month.SEPTEMBER, 1);
        System.out.println(">>> 2. Specific Date : " + batchStart);

        // 3. Inspecting Individual Date Fields:
        int year = batchStart.getYear();
        Month month = batchStart.getMonth();
        int dayOfMonth = batchStart.getDayOfMonth();
        DayOfWeek dayOfWeek = batchStart.getDayOfWeek();
        boolean isLeapYear = batchStart.isLeapYear();

        System.out.println("\n>>> 3. Field Inspections for Batch Start:");
        System.out.println("  Year         : " + year);
        System.out.println("  Month        : " + month + " (Value: " + month.getValue() + ")");
        System.out.println("  Day of Month : " + dayOfMonth);
        System.out.println("  Day of Week  : " + dayOfWeek);
        System.out.println("  Is Leap Year : " + isLeapYear);

        System.out.println("\n==========================================================================");
    }
}