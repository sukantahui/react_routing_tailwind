/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 13: Searching Within Strings
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringSearchingMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          SEARCHING WITHIN STRINGS IN JAVA        ");
        System.out.println("==================================================");

        String text = "BARRACKPORE - EDUCATION FOR ICSE";
        System.out.println("Target Text: \"" + text + "\"");

        // 1. indexOf(char ch) & indexOf(String str)
        System.out.println("\n[1] Forward Search (indexOf):");
        System.out.println("    indexOf('A')       : " + text.indexOf('A')); // 1
        System.out.println("    indexOf('A', 2)    : " + text.indexOf('A', 2)); // 4 (searching from index 2)
        System.out.println("    indexOf("ICSE")    : " + text.indexOf("ICSE")); // 28
        System.out.println("    indexOf("KOLKATA") : " + text.indexOf("KOLKATA")); // -1 (Not found!)

        // 2. lastIndexOf(char ch) & lastIndexOf(String str)
        System.out.println("\n[2] Backward Search (lastIndexOf):");
        System.out.println("    lastIndexOf('A')   : " + text.lastIndexOf('A')); // 4
        System.out.println("    lastIndexOf('E')   : " + text.lastIndexOf('E')); // 31 (last letter of ICSE)

        // 3. startsWith(String prefix) & endsWith(String suffix)
        System.out.println("\n[3] Prefix & Suffix Validation:");
        System.out.println("    startsWith("BARRACK") : " + text.startsWith("BARRACK")); // true
        System.out.println("    endsWith("ICSE")      : " + text.endsWith("ICSE")); // true
        System.out.println("    startsWith("ICSE")    : " + text.startsWith("ICSE")); // false

        // 4. contains(CharSequence s)
        System.out.println("\n[4] Substring Existence (contains):");
        System.out.println("    contains("EDUCATION") : " + text.contains("EDUCATION")); // true
        System.out.println("    contains("education") : " + text.contains("education")); // false (case-sensitive!)

        System.out.println("==================================================");
    }
}