/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 2: Compiling Regex: Pattern.compile() vs Matcher Execution (find & group)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternCompileAndMatcherExecutionDemo {

    // Compile ONCE as static final constant for maximum performance:
    private static final Pattern HUB_PATTERN = Pattern.compile("Barrackpore|Naihati|Shyamnagar|Ichapur");

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: Pattern.compile() & Matcher.find() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String studentRecord = "Swadeep enrolled at Barrackpore hub, then visited Naihati center for exams.";

        // Create a Matcher for the target text:
        Matcher matcher = HUB_PATTERN.matcher(studentRecord);

        System.out.println(">>> Scanning Text for Academic Hub Mentions:");
        int matchCount = 0;
        while (matcher.find()) {
            matchCount++;
            System.out.printf("  Match #%d: '%s' [Found at index %d to %d]%n",
                    matchCount, matcher.group(), matcher.start(), matcher.end());
        }

        System.out.printf("\n>>> Total Academic Hubs Found: %d%n", matchCount);

        System.out.println("\n==========================================================================");
    }
}