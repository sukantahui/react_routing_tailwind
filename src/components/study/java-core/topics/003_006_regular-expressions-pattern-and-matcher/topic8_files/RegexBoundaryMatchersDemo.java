/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 8: Boundary Matchers: Line Anchors (^, $) and Word Boundaries (\b, \B)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexBoundaryMatchersDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: REGEX BOUNDARY MATCHERS (^, $, \\b, \\B) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Word Boundary (\\b) vs Substring Matching:");
        String sentence = "Java is great, JavaScript is flexible, and avaj is reverse.";

        // Matching whole word 'Java' only (not 'JavaScript' or 'avaj'):
        Pattern wordPattern = Pattern.compile("\\bJava\\b");
        Matcher wordMatcher = wordPattern.matcher(sentence);

        System.out.println("  Sentence: "" + sentence + """);
        int count = 0;
        while (wordMatcher.find()) {
            count++;
            System.out.printf("  Found Whole Word: '%s' at index %d%n", wordMatcher.group(), wordMatcher.start());
        }
        System.out.println("  Total 'Java' whole words found: " + count + " (Ignored 'JavaScript'!)");

        System.out.println("\n>>> 2. Line Anchors (^ Start of Line, $ End of Line):");
        Pattern phonePattern = Pattern.compile("^\\+91[6-9]\\d{9}$");
        String mobile = "+919830012345";
        System.out.println("  Mobile Number: " + mobile);
        System.out.println("  Strict Exact Match (^...$): " + phonePattern.matcher(mobile).matches());

        System.out.println("\n==========================================================================");
    }
}