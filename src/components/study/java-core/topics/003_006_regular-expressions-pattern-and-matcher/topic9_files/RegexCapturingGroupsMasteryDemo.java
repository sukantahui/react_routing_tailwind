/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 9: Capturing Groups () and Non-Capturing Groups (?:) in java.util.regex
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexCapturingGroupsMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: CAPTURING & NON-CAPTURING GROUPS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Parsing Date Format "2026-08-26" using 3 Capturing Groups ():
        Pattern datePattern = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");
        String inputDate = "Admission Date: 2026-08-26";
        Matcher matcher = datePattern.matcher(inputDate);

        if (matcher.find()) {
            System.out.println(">>> 1. Capturing Groups Breakdown (1-indexed):");
            System.out.println("  Group 0 (Entire Match) : " + matcher.group(0));
            System.out.println("  Group 1 (Year YYYY)    : " + matcher.group(1));
            System.out.println("  Group 2 (Month MM)     : " + matcher.group(2));
            System.out.println("  Group 3 (Day DD)       : " + matcher.group(3));
        }

        // 2. Non-Capturing Group (?:) -> Groups logic without saving memory:
        // Matching http or https without creating an extra group:
        Pattern urlPattern = Pattern.compile("(?:https?://)?([\\w.]+)\\b");
        Matcher urlMatcher = urlPattern.matcher("Visit https://coderaccotax.com for tutorials");

        if (urlMatcher.find()) {
            System.out.println("\n>>> 2. Non-Capturing Group (?:https?://) Demonstration:");
            System.out.println("  Group 1 (Domain Only)  : " + urlMatcher.group(1));
        }

        System.out.println("\n==========================================================================");
    }
}