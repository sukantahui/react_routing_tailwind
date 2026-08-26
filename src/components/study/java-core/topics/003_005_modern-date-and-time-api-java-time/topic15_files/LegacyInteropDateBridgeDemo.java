/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 15: Interoperability: Converting Between Legacy Date/Calendar and java.time
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public class LegacyInteropDateBridgeDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: LEGACY DATE <-> java.time INTEROPERABILITY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. CONVERTING LEGACY java.util.Date -> Modern Instant -> LocalDateTime:
        Date legacyDate = new Date();
        Instant instantFromLegacy = legacyDate.toInstant(); // Bridge method added in Java 8!
        LocalDateTime modernLdt = instantFromLegacy.atZone(ZoneId.systemDefault()).toLocalDateTime();

        System.out.println(">>> 1. Legacy Date -> Modern Conversion:");
        System.out.println("  Legacy Date       : " + legacyDate);
        System.out.println("  Bridged Instant   : " + instantFromLegacy);
        System.out.println("  Modern LocalDateTime: " + modernLdt);

        // 2. CONVERTING Modern Instant / ZonedDateTime -> Legacy java.util.Date:
        Instant nowUtc = Instant.now();
        Date convertedLegacyDate = Date.from(nowUtc); // Static factory method added in Java 8!

        System.out.println("\n>>> 2. Modern Instant -> Legacy Date Conversion (For legacy JDBC/APIs):");
        System.out.println("  Modern Instant    : " + nowUtc);
        System.out.println("  Converted to Date : " + convertedLegacyDate);

        System.out.println("\n>>> THE UNIVERSAL BRIDGE: java.time.Instant is the universal bridge between old and new Java dates!");

        System.out.println("\n==========================================================================");
    }
}