/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 6: Character Classes: Simple [abc], Negated [^abc], Ranges [a-z], Unions & Intersections
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexCharacterClassesMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: REGEX CHARACTER CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Character Class Variants Cheatsheet:");
        System.out.println("  [abc]       : Matches 'a', 'b', or 'c' (Simple set)");
        System.out.println("  [^abc]      : Negation: Any character EXCEPT 'a', 'b', or 'c'");
        System.out.println("  [a-zA-Z]    : Range: Any English letter (lower or upper case)");
        System.out.println("  [0-9]       : Range: Any decimal digit (Equivalent to \\d)");
        System.out.println("  [a-z&&[def]]: Intersection: Matches ONLY 'd', 'e', or 'f'");

        // Validating Indian PAN Card Format: 5 Letters + 4 Digits + 1 Letter (e.g. ABCDE1234F)
        String panCard = "ABCDE1234F";
        Pattern panPattern = Pattern.compile("[A-Z]{5}[0-9]{4}[A-Z]");
        boolean isPanValid = panPattern.matcher(panCard).matches();

        System.out.println("\n>>> 2. Indian PAN Card Validation Example:");
        System.out.println("  PAN String   : " + panCard);
        System.out.println("  Is Valid PAN : " + isPanValid + " (Matches [A-Z]{5}[0-9]{4}[A-Z])");

        System.out.println("\n==========================================================================");
    }
}