/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 5: LocalDateTime: Combining Date & Time (Creation, Combination & Decomposition)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;

public class LocalDateTimeDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: java.time.LocalDateTime DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Current System Date & Time:
        LocalDateTime currentDateTime = LocalDateTime.now();
        System.out.println(">>> 1. Current DateTime: " + currentDateTime);

        // 2. Combining an existing LocalDate and LocalTime:
        LocalDate examDate = LocalDate.of(2026, Month.DECEMBER, 15);
        LocalTime examTime = LocalTime.of(10, 0, 0); // 10:00 AM

        LocalDateTime examSchedule = LocalDateTime.of(examDate, examTime);
        // Alternative syntax: examDate.atTime(examTime)
        System.out.println("\n>>> 2. Combined Exam Schedule: " + examSchedule);

        // 3. Decomposing LocalDateTime back into Date and Time:
        LocalDate extractedDate = examSchedule.toLocalDate();
        LocalTime extractedTime = examSchedule.toLocalTime();

        System.out.println("\n>>> 3. Decomposed Components:");
        System.out.println("  Extracted Date : " + extractedDate);
        System.out.println("  Extracted Time : " + extractedTime);

        System.out.println("\n==========================================================================");
    }
}