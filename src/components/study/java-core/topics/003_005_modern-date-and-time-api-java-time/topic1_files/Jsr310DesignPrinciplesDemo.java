/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 1: JSR-310 (java.time) Design Principles: Immutability, Thread-Safety & ISO-8601
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDate;
import java.time.Month;

public class Jsr310DesignPrinciplesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: JSR-310 (java.time) DESIGN PRINCIPLES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 4 Core Principles of Modern java.time (JSR-310):");
        System.out.println();
        System.out.println("  1. IMMUTABILITY & THREAD-SAFETY:");
        LocalDate admissionDate = LocalDate.of(2026, Month.AUGUST, 26);
        LocalDate graduationDate = admissionDate.plusYears(1); // Returns BRAND NEW instance!

        System.out.println("     Original Admission  : " + admissionDate + " (Unchanged!)");
        System.out.println("     Graduation Projected: " + graduationDate + " (Fresh immutable instance)");
        System.out.println();
        System.out.println("  2. INTUITIVE 1-INDEXED MONTHS & ENUMS:");
        System.out.println("     Month.JANUARY = 1, Month.AUGUST = 8, Month.DECEMBER = 12 (Zero confusion!)");
        System.out.println();
        System.out.println("  3. DOMAIN-DRIVEN SEPARATION:");
        System.out.println("     - LocalDate     : Year-Month-Day only (Birthdays, Holidays)");
        System.out.println("     - LocalTime     : Hour-Minute-Second only (Store open hours)");
        System.out.println("     - LocalDateTime : Date + Time without timezone (Movie showtimes)");
        System.out.println("     - ZonedDateTime : Date + Time + Explicit Timezone (Flight bookings)");
        System.out.println("     - Instant       : UTC Epoch timestamp (Database timestamps)");

        System.out.println("\n==========================================================================");
    }
}