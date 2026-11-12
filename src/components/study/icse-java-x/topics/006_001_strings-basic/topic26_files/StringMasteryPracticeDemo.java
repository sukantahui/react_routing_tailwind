/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 26: Practice Problems (MCQ and Coding)
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringMasteryPracticeDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   ICSE CLASS X STRING MASTERY PRACTICE PROBLEMS  ");
        System.out.println("==================================================");

        // Practice Program 1: Piglatin Converter (Classic ICSE Section B)
        // Find first vowel, move preceding consonant cluster to end, append "AY"
        String word1 = "LONDON";
        String word2 = "TROUBLE";
        System.out.println("[Program 1: Piglatin Conversion]:");
        System.out.println("    \"LONDON\"  -> " + toPiglatin(word1));  // ONDONLAY
        System.out.println("    \"TROUBLE\" -> " + toPiglatin(word2)); // OUBLETRAY

        // Practice Program 2: Title Case / Capitalize First Letter of Each Word
        String sentence = "swadeep studies in barrackpore computer lab";
        System.out.println("\n[Program 2: Title Case Conversion]:");
        System.out.println("    Before: \"" + sentence + "\"");
        System.out.println("    After : \"" + toTitleCase(sentence) + "\"");

        // Practice Program 3: Count Vowels and Consonants
        countVowelsConsonants("ICSE Computer Applications 2026");

        System.out.println("==================================================");
    }

    // ICSE Piglatin Algorithm
    public static String toPiglatin(String word) {
        String w = word.toUpperCase();
        for (int i = 0; i < w.length(); i++) {
            char ch = w.charAt(i);
            if (ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                return w.substring(i) + w.substring(0, i) + "AY";
            }
        }
        return w + "AY"; // If no vowel found
    }

    // ICSE Title Case Algorithm
    public static String toTitleCase(String str) {
        String s = " " + str.trim(); // Add leading space
        String res = "";
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == ' ' && i + 1 < s.length()) {
                res = res + " " + Character.toUpperCase(s.charAt(i + 1));
                i++; // Skip the capitalized char
            } else {
                res = res + ch;
            }
        }
        return res.trim();
    }

    // ICSE Vowel & Consonant Counter
    public static void countVowelsConsonants(String str) {
        int v = 0, c = 0;
        String s = str.toUpperCase();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch >= 'A' && ch <= 'Z') {
                if (ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                    v++;
                } else {
                    c++;
                }
            }
        }
        System.out.println("\n[Program 3: Letter Analysis for \"" + str + "\"]:");
        System.out.println("    Vowels: " + v + " | Consonants: " + c);
    }
}