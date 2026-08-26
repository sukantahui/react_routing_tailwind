/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 4: Meta-Characters Breakdown: \d, \D, \s, \S, \w, \W and '.'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMetaCharactersCatalogDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: REGEX META-CHARACTERS CATALOG - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+---------------+---------------------------------------+---------------------+");
        System.out.println("| Meta-Char     | Meaning / Definition                  | Equivalent Class    |");
        System.out.println("+---------------+---------------------------------------+---------------------+");
        System.out.println("| .             | Any character (except newline default)| [^\\n\\r]            |");
        System.out.println("| \\d           | Any digit [0-9]                       | [0-9]               |");
        System.out.println("| \\D           | Any NON-digit                         | [^0-9]              |");
        System.out.println("| \\s           | Any whitespace (space, tab, newline)  | [ \\t\\n\\x0B\\f\\r]  |");
        System.out.println("| \\S           | Any NON-whitespace                    | [^\\s]               |");
        System.out.println("| \\w           | Word character (letters, digits, _)   | [a-zA-Z_0-9]        |");
        System.out.println("| \\W           | NON-word character (punctuation, etc) | [^\\w]               |");
        System.out.println("+---------------+---------------------------------------+---------------------+");

        // Example: Extracting all digits from a registration string:
        String reg = "Trainee_ID: BKP-2026-9874";
        Pattern digitPattern = Pattern.compile("\\d+");
        Matcher digitMatcher = digitPattern.matcher(reg);

        System.out.println("\n>>> Extracting All Numbers from: "" + reg + """);
        while (digitMatcher.find()) {
            System.out.println("  Extracted Number: " + digitMatcher.group());
        }

        System.out.println("\n==========================================================================");
    }
}