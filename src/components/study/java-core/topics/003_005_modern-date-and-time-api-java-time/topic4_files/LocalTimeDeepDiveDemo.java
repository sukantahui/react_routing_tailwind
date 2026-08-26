/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 4: LocalTime: Time Without Date or Timezone (Hour, Minute, Second, Nano)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalTime;

public class LocalTimeDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: java.time.LocalTime DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Current System Time (Nanosecond precision):
        LocalTime currentTime = LocalTime.now();
        System.out.println(">>> 1. Current Time: " + currentTime);

        // 2. Specific Academy Hours (HH:MM:SS):
        LocalTime openingTime = LocalTime.of(9, 30, 0);   // 09:30 AM
        LocalTime closingTime = LocalTime.of(18, 0, 0);   // 06:00 PM
        LocalTime lunchBreak  = LocalTime.parse("13:30"); // 01:30 PM parsed from String!

        System.out.println("\n>>> 2. Academy Operating Schedule:");
        System.out.println("  Opening Bell : " + openingTime);
        System.out.println("  Lunch Break  : " + lunchBreak);
        System.out.println("  Closing Bell : " + closingTime);

        // 3. Time Comparison (isBefore, isAfter):
        boolean isSchoolOpen = openingTime.isBefore(closingTime);
        System.out.println("\n>>> 3. Time Comparison:");
        System.out.println("  openingTime.isBefore(closingTime)? " + isSchoolOpen);

        System.out.println("\n==========================================================================");
    }
}