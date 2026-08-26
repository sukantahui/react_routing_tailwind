/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 6: ZonedDateTime: Full Timestamp with Explicit ZoneId (Asia/Kolkata, UTC)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: java.time.ZonedDateTime - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Live lecture scheduled in Kolkata, West Bengal:
        ZoneId kolkataZone = ZoneId.of("Asia/Kolkata"); // IST (+05:30)
        LocalDateTime localSchedule = LocalDateTime.of(2026, 8, 26, 20, 0, 0); // 08:00 PM IST

        ZonedDateTime kolkataLecture = ZonedDateTime.of(localSchedule, kolkataZone);
        System.out.println(">>> 1. Scheduled Live Class (Kolkata Hub IST):");
        System.out.println("  " + kolkataLecture);

        // 2. Converting the exact same global instant to other global timezones:
        ZoneId newYorkZone = ZoneId.of("America/New_York"); // EDT (-04:00)
        ZoneId londonZone  = ZoneId.of("Europe/London");    // BST (+01:00)
        ZoneId tokyoZone   = ZoneId.of("Asia/Tokyo");        // JST (+09:00)

        ZonedDateTime newYorkTime = kolkataLecture.withZoneSameInstant(newYorkZone);
        ZonedDateTime londonTime  = kolkataLecture.withZoneSameInstant(londonZone);
        ZonedDateTime tokyoTime   = kolkataLecture.withZoneSameInstant(tokyoZone);

        System.out.println("\n>>> 2. International Webinar Broadcast Times for Overseas Trainees:");
        System.out.println("  London Trainee View    : " + londonTime);
        System.out.println("  New York Trainee View  : " + newYorkTime);
        System.out.println("  Tokyo Trainee View     : " + tokyoTime);

        System.out.println("\n==========================================================================");
    }
}