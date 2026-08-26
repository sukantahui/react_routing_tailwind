/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 16: Enterprise Architecture Best Practices: UTC Instants in DB & Local UI Formatting (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class EnterpriseUtcArchitectureCapstoneDemo {

    public static class OrderAuditService {

        // 1. DB Layer: Store UTC Instant in database (PostgreSQL / MySQL)
        public static Instant recordOrderPlacement() {
            Instant createdUtc = Instant.now();
            System.out.println("  [DATABASE LAYER] Storing UTC Instant: " + createdUtc);
            return createdUtc;
        }

        // 2. UI Layer: Format the UTC Instant into the User's Local Timezone
        public static String formatForClientUi(Instant dbTimestamp, String clientZoneId) {
            ZoneId zone = ZoneId.of(clientZoneId);
            ZonedDateTime clientZdt = dbTimestamp.atZone(zone);
            DateTimeFormatter uiFmt = DateTimeFormatter.ofPattern("dd-MMM-yyyy hh:mm:ss a (zzz)");
            return clientZdt.format(uiFmt);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: ENTERPRISE UTC ARCHITECTURE CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Order Placed on E-Commerce Platform:");
        Instant orderTimestamp = OrderAuditService.recordOrderPlacement();

        System.out.println("\n>>> 2. Rendering Order Confirmation for Global Customers:");
        String kolkataDisplay = OrderAuditService.formatForClientUi(orderTimestamp, "Asia/Kolkata");
        String londonDisplay  = OrderAuditService.formatForClientUi(orderTimestamp, "Europe/London");
        String tokyoDisplay   = OrderAuditService.formatForClientUi(orderTimestamp, "Asia/Tokyo");

        System.out.println("  Kolkata Customer UI Display : " + kolkataDisplay);
        System.out.println("  London Customer UI Display  : " + londonDisplay);
        System.out.println("  Tokyo Customer UI Display   : " + tokyoDisplay);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 003_005 MODERN DATE & TIME API (JSR 310) 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}