/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 14: Formatting & Parsing: java.time.format.DateTimeFormatter (Thread-Safe)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeFormatterMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: DateTimeFormatter MASTERY (THREAD-SAFE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LocalDateTime now = LocalDateTime.of(2026, 8, 26, 15, 30, 45);

        // 1. Predefined Standard ISO Formatter:
        String isoOutput = now.format(DateTimeFormatter.ISO_DATE_TIME);
        System.out.println(">>> 1. ISO Standard Format: " + isoOutput);

        // 2. Custom Indian Standard Date-Time Pattern (dd/MM/yyyy hh:mm a):
        DateTimeFormatter indianPattern = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm:ss a");
        String formattedIndian = now.format(indianPattern);
        System.out.println("\n>>> 2. Indian Standard Format: " + formattedIndian);

        // 3. Custom Formal Text Pattern (dd-MMMM-yyyy):
        DateTimeFormatter formalPattern = DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy");
        String formalText = now.format(formalPattern);
        System.out.println("\n>>> 3. Formal Calendar Text   : " + formalText);

        // 4. Parsing Custom Formatted String back to LocalDateTime:
        String inputStr = "26/08/2026 03:30:45 PM";
        LocalDateTime parsedBack = LocalDateTime.parse(inputStr, indianPattern);
        System.out.println("\n>>> 4. Parsed from Custom String: " + parsedBack);

        System.out.println("\n>>> KEY ADVANTAGE: DateTimeFormatter is 100% IMMUTABLE and THREAD-SAFE (Unlike SimpleDateFormat)!");

        System.out.println("\n==========================================================================");
    }
}