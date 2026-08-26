/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 8: Format Flags: Width, Left-Alignment (-), Zero-Padding (0) & Comma Grouping (,)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class AdvancedFormatFlagsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: ADVANCED STRING FORMAT FLAGS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        long rupeeAmount = 1500000;
        int roll = 42;
        String name = "Swadeep Paul";

        System.out.println(">>> 1. Comma Thousand Grouping (%,d):");
        System.out.println("  Formatted Amount : ₹" + String.format("%,d", rupeeAmount));

        System.out.println("\n>>> 2. Zero-Padding (%05d):");
        System.out.println("  ID Badge #       : " + String.format("%05d", roll));

        System.out.println("\n>>> 3. Table Column Alignment (- for Left-Align, Width=15):");
        System.out.println(String.format("| %-20s | %-12s | %10s |", "TRAINEE NAME", "HUB", "BALANCE"));
        System.out.println("+----------------------+--------------+------------+");
        System.out.println(String.format("| %-20s | %-12s | ₹%,9.2f |", name, "Barrackpore", 75000.50));
        System.out.println(String.format("| %-20s | %-12s | ₹%,9.2f |", "Tuhina Das", "Naihati", 125000.00));

        System.out.println("\n==========================================================================");
    }
}