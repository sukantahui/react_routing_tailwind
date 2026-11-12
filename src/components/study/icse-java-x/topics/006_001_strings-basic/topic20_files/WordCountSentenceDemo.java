/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 20: Word Count in a Sentence
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class WordCountSentenceDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          WORD COUNT IN A SENTENCE (ICSE)         ");
        System.out.println("==================================================");

        String sentence = "   Knowledge is power for ICSE students in Barrackpore   ";
        System.out.println("Input Sentence: \"" + sentence + "\"");

        // Standard ICSE Algorithm:
        // 1. Trim leading and trailing spaces
        // 2. Add single space at end to catch final word
        // 3. Count spaces that follow a non-space character
        String clean = sentence.trim();
        int wordCount = 0;

        if (clean.length() > 0) {
            clean = clean + " "; // Add delimiter for final word
            for (int i = 0; i < clean.length(); i++) {
                char ch = clean.charAt(i);
                if (ch == ' ' && clean.charAt(i - 1) != ' ') {
                    wordCount++;
                }
            }
        }

        System.out.println("\nCleaned Sentence: \"" + clean.trim() + "\"");
        System.out.println("Total Words Counted: " + wordCount); // 8 words

        // Extracting and displaying each word on a new line (ICSE classic)
        System.out.println("\nIndividual Word Extraction:");
        String currentWord = "";
        for (int i = 0; i < clean.length(); i++) {
            char ch = clean.charAt(i);
            if (ch != ' ') {
                currentWord = currentWord + ch;
            } else {
                if (currentWord.length() > 0) {
                    System.out.println("  - " + currentWord);
                    currentWord = ""; // Reset for next word
                }
            }
        }

        System.out.println("==================================================");
    }
}