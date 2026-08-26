/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 14: Regex Performance Cautions: Catastrophic Backtracking & ReDoS Security (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RedosSecurityAndCatastrophicBacktrackingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: ReDoS SECURITY & BACKTRACKING CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS CATASTROPHIC BACKTRACKING (ReDoS - Regular Expression Denial of Service)?");
        System.out.println("  - Occurs when nested quantifiers like '(a+)+$' encounter non-matching input ('aaaaaaaaaaaaX').");
        System.out.println("  - The NFA regex engine tries 2^N permutation paths, causing CPU to spike to 100% and freezing the server!");

        // 2. DEFENSIVE MITIGATION 1: Using Possessive Quantifiers (++ or *+)
        // Possessive quantifiers NEVER backtrack:
        Pattern safePossessivePattern = Pattern.compile("([a-z]++)++$");
        String evilInput = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa!";

        long start = System.currentTimeMillis();
        boolean matchResult = safePossessivePattern.matcher(evilInput).matches();
        long elapsed = System.currentTimeMillis() - start;

        System.out.println("\n>>> 2. Testing Possessive Quantifier with Evil Input:");
        System.out.printf("  Execution Time: %d ms (Instant rejection! Zero CPU freeze!)%n", elapsed);
        System.out.println("  Match Result  : " + matchResult);

        System.out.println("\n>>> 3. THE 3 GOLDEN RULES FOR SAFE REGEX:");
        System.out.println("  1. NEVER nest quantifiers: avoid (a+)+ or (.*a)*");
        System.out.println("  2. Use Possessive Quantifiers (++) or Atomic Groups when appropriate.");
        System.out.println("  3. Set strict maximum character length constraints on user inputs before regex evaluation!");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 003_006 REGULAR EXPRESSIONS (PATTERN & MATCHER) 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}