/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 7: ZoneId vs ZoneOffset: Managing Daylight Saving Time (DST) & Offset Rules
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.zone.ZoneRules;

public class ZoneIdAndOffsetRulesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: ZoneId vs ZoneOffset & DST RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. ZoneOffset (Fixed numerical offset from UTC):
        ZoneOffset fixedOffset = ZoneOffset.of("+05:30"); // Indian Standard Time fixed offset
        System.out.println(">>> 1. Fixed ZoneOffset: " + fixedOffset);

        // 2. ZoneId (Geographical region with dynamic DST rules):
        ZoneId nyZone = ZoneId.of("America/New_York");
        ZoneRules rules = nyZone.getRules();

        System.out.println("\n>>> 2. Geographical ZoneId ('America/New_York'):");
        System.out.println("  Is DST Active in Summer? " + rules.isDaylightSavings(ZonedDateTime.now(nyZone).toInstant()));

        System.out.println("\n>>> 3. KEY DIFFERENCE:");
        System.out.println("  - ZoneOffset ('+05:30', 'UTC', '-04:00') is a CONSTANT numerical shift.");
        System.out.println("  - ZoneId ('America/New_York', 'Europe/London') contains full historical & future DST transition rules!");

        System.out.println("\n==========================================================================");
    }
}