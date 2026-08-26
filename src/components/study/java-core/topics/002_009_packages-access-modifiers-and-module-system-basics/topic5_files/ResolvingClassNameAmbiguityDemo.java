/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 5: Resolving Class Name Ambiguity with Duplicate Names (java.util.Date vs java.sql.Date)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

// If you write both:
// import java.util.Date;
// import java.sql.Date;
// -> COMPILE ERROR: "Date is already defined in a single-type import"

// RESOLUTION STRATEGY:
// 1. Import one (or neither) and use the Fully Qualified Class Name (FQCN) for the other!
import java.util.Date; // Primary utility Date

public class ResolvingClassNameAmbiguityDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: RESOLVING CLASS NAME AMBIGUITY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Using imported simple name for java.util.Date:
        Date utilDate = new Date();
        System.out.println("  [java.util.Date] Current Timestamp: " + utilDate);

        // 2. Using Fully Qualified Name (FQCN) for conflicting java.sql.Date:
        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
        System.out.println("  [java.sql.Date]  SQL Database Date: " + sqlDate);

        System.out.println("\n>>> Ambiguity Resolution Rules:");
        System.out.println("  - An explicit single-type import wins over wildcard imports.");
        System.out.println("  - When 2 conflicting classes must be used in the same method, use the FQCN for at least one!");

        System.out.println("\n==========================================================================");
    }
}