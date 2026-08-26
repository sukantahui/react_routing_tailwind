/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 9: Date & Time Creation Patterns: now(), of(), parse() Factory Methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;

public class DateTimeCreationPatternsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: DATE & TIME CREATION PATTERNS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Current System Instants (now()):
        LocalDate today = LocalDate.now();
        LocalTime nowTime = LocalTime.now();
        LocalDateTime nowDateTime = LocalDateTime.now();

        System.out.println(">>> 1. now() Factory Methods:");
        System.out.println("  LocalDate.now()         : " + today);
        System.out.println("  LocalTime.now()         : " + nowTime);
        System.out.println("  LocalDateTime.now()     : " + nowDateTime);

        // 2. Specific Instants (of()):
        LocalDate independenceDay = LocalDate.of(1947, Month.AUGUST, 15);
        LocalTime primeShowTime = LocalTime.of(19, 30, 0); // 07:30 PM

        System.out.println("\n>>> 2. of(...) Factory Methods:");
        System.out.println("  Indian Independence Day : " + independenceDay);
        System.out.println("  Prime Show Time         : " + primeShowTime);

        // 3. String Parsing (parse()):
        LocalDate parsedDate = LocalDate.parse("2026-08-26"); // ISO-8601 standard format
        LocalDateTime parsedDt = LocalDateTime.parse("2026-08-26T14:30:00");

        System.out.println("\n>>> 3. parse(...) Factory Methods (ISO-8601):");
        System.out.println("  Parsed LocalDate        : " + parsedDate);
        System.out.println("  Parsed LocalDateTime    : " + parsedDt);

        System.out.println("\n==========================================================================");
    }
}