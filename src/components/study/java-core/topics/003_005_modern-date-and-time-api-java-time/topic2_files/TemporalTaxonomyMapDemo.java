/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 2: Core Temporal Classes Taxonomy Map: Date vs Time vs DateTime vs Instant
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.*;

public class TemporalTaxonomyMapDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: TEMPORAL TAXONOMY MAP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| Class Name        | Has Date? (Y-M-D) | Has Time? (H:M:S) | Has Timezone?     |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| LocalDate         | YES               | NO                | NO                |");
        System.out.println("| LocalTime         | NO                | YES               | NO                |");
        System.out.println("| LocalDateTime     | YES               | YES               | NO                |");
        System.out.println("| ZonedDateTime     | YES               | YES               | YES (ZoneId)      |");
        System.out.println("| OffsetDateTime    | YES               | YES               | YES (ZoneOffset)  |");
        System.out.println("| Instant           | Timeline UTC      | Timeline UTC      | UTC (Epoch Nanos) |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");

        System.out.println("\n>>> Decision Guide for Enterprise Applications:");
        System.out.println("  1. Student Date of Birth (DOB) -> Use 'LocalDate'");
        System.out.println("  2. Academy Opening Bell (09:00)-> Use 'LocalTime'");
        System.out.println("  3. Offline Exam Schedule       -> Use 'LocalDateTime'");
        System.out.println("  4. International Zoom Class    -> Use 'ZonedDateTime'");
        System.out.println("  5. Database Audit CreatedAt    -> Use 'Instant'");

        System.out.println("\n==========================================================================");
    }
}