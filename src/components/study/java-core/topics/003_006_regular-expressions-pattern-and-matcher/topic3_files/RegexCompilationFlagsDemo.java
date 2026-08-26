/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 3: Regex Compilation Flags: CASE_INSENSITIVE, MULTILINE & DOTALL Modes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexCompilationFlagsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: REGEX COMPILATION FLAGS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. CASE_INSENSITIVE Flag (Pattern.CASE_INSENSITIVE or (?i)):
        Pattern casePattern = Pattern.compile("java", Pattern.CASE_INSENSITIVE);
        Matcher caseMatcher = casePattern.matcher("Java, JAVA, and jAvA");
        System.out.println(">>> 1. CASE_INSENSITIVE Matches:");
        while (caseMatcher.find()) {
            System.out.println("  Found: " + caseMatcher.group());
        }

        // 2. DOTALL Flag (Pattern.DOTALL or (?s)):
        // By default, dot '.' matches ANY char EXCEPT newlines (\n).
        // DOTALL mode makes dot '.' match newline characters as well!
        String multiLineText = "<div>\n  <p>Hello Barrackpore</p>\n</div>";
        Pattern dotAllPattern = Pattern.compile("<div>.*</div>", Pattern.DOTALL);
        System.out.println("\n>>> 2. DOTALL Matching across newlines: " + dotAllPattern.matcher(multiLineText).matches());

        // 3. Combining multiple flags using Bitwise OR (|):
        Pattern combined = Pattern.compile("^swadeep", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
        System.out.println("\n>>> 3. Combined Flags (CASE_INSENSITIVE | MULTILINE) Configured!");

        System.out.println("\n==========================================================================");
    }
}