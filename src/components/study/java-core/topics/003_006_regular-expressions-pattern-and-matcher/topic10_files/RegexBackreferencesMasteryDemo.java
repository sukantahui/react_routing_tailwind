/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 10: Backreferences (\\1, \\2): Detecting Repeated Words & Duplicate Tokens
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexBackreferencesMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: REGEX BACKREFERENCES (\\1, \\2) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Finding duplicate consecutive words (e.g. "the the" typo):
        // Pattern: (\\b\\w+) matches a word -> \\s+ spaces -> \\1 matches the EXACT same word captured in Group 1!
        Pattern duplicateWordPattern = Pattern.compile("\\b(\\w+)\\s+\\1\\b", Pattern.CASE_INSENSITIVE);

        String sampleArticle = "Java is the the best language for for enterprise backend systems.";
        Matcher matcher = duplicateWordPattern.matcher(sampleArticle);

        System.out.println(">>> 1. Original Text with Grammatical Typos:");
        System.out.println("  "" + sampleArticle + """);

        System.out.println("\n>>> 2. Detecting Repeated Words via Backreference \\1:");
        while (matcher.find()) {
            System.out.printf("  Duplicate Found: '%s' (Word: '%s')%n", matcher.group(0), matcher.group(1));
        }

        // Replacing duplicate words automatically:
        String cleanedArticle = duplicateWordPattern.matcher(sampleArticle).replaceAll("$1");
        System.out.println("\n>>> 3. Sanitized Text via replaceAll("$1"):");
        System.out.println("  "" + cleanedArticle + """);

        System.out.println("\n==========================================================================");
    }
}