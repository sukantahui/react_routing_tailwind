/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 7: Quantifiers: Greedy (*), Reluctant (*?), and Possessive (*+) Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexQuantifiersComparisonDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: REGEX QUANTIFIERS (GREEDY vs RELUCTANT vs POSSESSIVE)");
        System.out.println("==========================================================================\n");

        String htmlSnippet = "<b>Java Core</b> and <b>AccoTax</b>";

        // 1. GREEDY Quantifier (.*) -> Eats as much text as possible (Matches from first <b> to LAST </b>!):
        Pattern greedyPat = Pattern.compile("<b>.*</b>");
        Matcher greedyMatch = greedyPat.matcher(htmlSnippet);
        System.out.println(">>> 1. GREEDY Match (.*):");
        while (greedyMatch.find()) {
            System.out.println("  " + greedyMatch.group()); // Outputs entire string!
        }

        // 2. RELUCTANT / LAZY Quantifier (.*?) -> Stops at the EARLIEST possible match:
        Pattern lazyPat = Pattern.compile("<b>.*?</b>");
        Matcher lazyMatch = lazyPat.matcher(htmlSnippet);
        System.out.println("\n>>> 2. RELUCTANT / LAZY Match (.*?):");
        while (lazyMatch.find()) {
            System.out.println("  " + lazyMatch.group()); // Cleanly matches each tag individually!
        }

        // 3. POSSESSIVE Quantifier (.*+) -> Eats everything and NEVER backtracks (Prevents ReDoS attacks!):
        Pattern posPat = Pattern.compile("<b>.*+</b>");
        System.out.println("\n>>> 3. POSSESSIVE Match (.*+): " + posPat.matcher(htmlSnippet).matches());

        System.out.println("\n==========================================================================");
    }
}