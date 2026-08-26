/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 11: Matcher Methods: matches(), find(), group(), start(), end(), replaceAll()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherMethodsComprehensiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: Matcher METHODS COMPREHENSIVE SUITE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String rawData = "Student Swadeep has phone 9830012345, while Tuhina has 9830054321.";
        Pattern phonePattern = Pattern.compile("\\b\\d{10}\\b");
        Matcher matcher = phonePattern.matcher(rawData);

        // 1. matches() vs find():
        // matches() checks if the ENTIRE string matches; find() searches for substrings!
        System.out.println(">>> 1. matches() vs find():");
        System.out.println("  matcher.matches() : " + matcher.matches() + " (FALSE because rawData has other words!)");
        matcher.reset(); // Reset cursor after matches()!

        // 2. find(), group(), start(), end():
        System.out.println("\n>>> 2. find() Substring Search:");
        while (matcher.find()) {
            System.out.printf("  Phone Number: %s [Range: %d to %d]%n",
                    matcher.group(), matcher.start(), matcher.end());
        }

        // 3. Masking phone numbers with replaceAll():
        String maskedData = matcher.replaceAll("XXXXXXXXXX");
        System.out.println("\n>>> 3. Masked Sensitive Output via replaceAll():");
        System.out.println("  " + maskedData);

        System.out.println("\n==========================================================================");
    }
}