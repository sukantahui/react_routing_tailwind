/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 0: Flaws of Legacy Date APIs: java.util.Date & Calendar (Mutability, 0-Indexed Months)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.util.Calendar;
import java.util.Date;

public class LegacyDateFlawsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: FLAWS OF LEGACY DATE APIS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 4 Fatal Flaws of java.util.Date & java.util.Calendar:");
        System.out.println();
        System.out.println("  1. MUTABILITY & THREAD-SAFETY DISASTER:");
        Date mutableDate = new Date();
        long originalTime = mutableDate.getTime();
        mutableDate.setTime(0); // Mutates internal state in-place!
        System.out.println("     A shared Date can be altered silently by any thread without locks!");
        System.out.println();
        System.out.println("  2. CONFUSING 0-INDEXED MONTHS:");
        Calendar cal = Calendar.getInstance();
        cal.set(2026, 0, 15); // Month 0 is JANUARY! Month 11 is DECEMBER!
        System.out.println("     Setting month to '0' produces: " + cal.getTime() + " (January!)");
        System.out.println();
        System.out.println("  3. YEAR OFFSET CONFUSION:");
        System.out.println("     In java.util.Date, getYear() returns (currentYear - 1900). For 2026, it returns 126!");
        System.out.println();
        System.out.println("  4. NOT THREAD-SAFE SimpleDateFormat:");
        System.out.println("     SimpleDateFormat corrupted timestamps when shared across multi-threaded web servers.");

        System.out.println("\n==========================================================================");
    }
}