/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 8: Instant: Instantaneous Point on UTC Timeline (The Enterprise Database Standard)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.Instant;

public class InstantUtcTimestampMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: java.time.Instant UTC TIMESTAMPS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Current UTC Instant:
        Instant nowUtc = Instant.now();
        System.out.println(">>> 1. Current Global UTC Instant: " + nowUtc);

        // 2. Epoch Seconds and Milliseconds (Since 1970-01-01T00:00:00Z):
        long epochSeconds = nowUtc.getEpochSecond();
        long epochMillis  = nowUtc.toEpochMilli();
        int nanoAdjustment = nowUtc.getNano();

        System.out.println("\n>>> 2. Machine Timeline Breakdown:");
        System.out.println("  Epoch Seconds  : " + epochSeconds);
        System.out.println("  Epoch Millis   : " + epochMillis + " ms");
        System.out.println("  Nano Precision : " + nanoAdjustment + " ns");

        // 3. Creating Instant from raw Epoch Millis (Database timestamp retrieval):
        Instant restoredInstant = Instant.ofEpochMilli(epochMillis);
        System.out.println("\n>>> 3. Restored from Database Millis: " + restoredInstant);

        System.out.println("\n>>> GOLDEN RULE FOR BACKEND ARCHITECTURE:");
        System.out.println("  ALWAYS store 'Instant' (UTC ISO-8601) in databases (e.g. 'created_at', 'updated_at')!");

        System.out.println("\n==========================================================================");
    }
}