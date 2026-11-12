/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 21: Frequency of Characters in a String
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class CharacterFrequencyDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("         CHARACTER FREQUENCY ANALYSIS             ");
        System.out.println("==================================================");

        String text = "SUCCESSFUL".toUpperCase();
        System.out.println("Input Text: " + text);

        // Technique 1: Frequency Array for Letters 'A' through 'Z' (int[26])
        int[] freq = new int[26];
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (ch >= 'A' && ch <= 'Z') {
                freq[ch - 'A']++; // Maps 'A' to 0, 'B' to 1, ..., 'Z' to 25
            }
        }

        System.out.println("\n[Technique 1: Frequency Array int[26]]:");
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                char letter = (char)('A' + i);
                System.out.println("  Character '" + letter + "' occurs: " + freq[i] + " time(s)");
            }
        }

        // Technique 2: Nested Loop (Pure ICSE Syllabus style without arrays)
        System.out.println("\n[Technique 2: Pure Nested Loop Count (First-occurrence filter)]:");
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            // Check if character already appeared before index i
            if (text.indexOf(ch) == i) {
                int count = 0;
                for (int j = 0; j < text.length(); j++) {
                    if (text.charAt(j) == ch) {
                        count++;
                    }
                }
                System.out.println("  '" + ch + "' -> " + count);
            }
        }

        System.out.println("==================================================");
    }
}