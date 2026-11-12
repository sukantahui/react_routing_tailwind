/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 22: Removing Duplicate Characters from a String
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class RemoveDuplicateCharsDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("      REMOVING DUPLICATE CHARACTERS (ICSE)        ");
        System.out.println("==================================================");

        String original = "MISSISSIPPI";
        System.out.println("Original String: \"" + original + "\"");

        // Algorithm 1: Accumulator with indexOf() Check (Standard ICSE)
        String unique = "";
        for (int i = 0; i < original.length(); i++) {
            char ch = original.charAt(i);
            // If character is not already present in 'unique', append it!
            if (unique.indexOf(ch) == -1) {
                unique = unique + ch;
            }
        }
        System.out.println("\n[Algorithm 1: unique.indexOf(ch) == -1]:");
        System.out.println("Deduplicated Output: \"" + unique + "\""); // "MISP"

        // Algorithm 2: Boolean Visited Array for ASCII [256]
        boolean[] seen = new boolean[256];
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < original.length(); i++) {
            char ch = original.charAt(i);
            if (!seen[ch]) {
                seen[ch] = true;
                sb.append(ch);
            }
        }
        System.out.println("\n[Algorithm 2: Boolean Visited Array]:");
        System.out.println("Deduplicated Output: \"" + sb.toString() + "\""); // "MISP"

        System.out.println("==================================================");
    }
}