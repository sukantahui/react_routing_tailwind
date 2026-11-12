/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_002: Basic String Methods
 * Topic 6: toUpperCase() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class ToUpperCaseMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       TOUPPERCASE() METHOD IN JAVA (ICSE)        ");
        System.out.println("==================================================");

        String student = "swadeep mukherjee";
        System.out.println("Original: \"" + student + "\"");

        // 1. Converting full string to uppercase
        String upper = student.toUpperCase();
        System.out.println("\nFull Uppercase: \"" + upper + "\"");

        // 2. Converting individual character to uppercase (Character class vs String)
        char firstLetter = Character.toUpperCase(student.charAt(0));
        System.out.println("\nIndividual Character Uppercase:");
        System.out.println("First letter capitalized: '" + firstLetter + "'");

        // 3. ICSE Classic: Title case conversion demo
        String[] words = student.split(" ");
        String titleCase = "";
        for (String w : words) {
            titleCase = titleCase + Character.toUpperCase(w.charAt(0)) + w.substring(1) + " ";
        }
        System.out.println("\nTitle Case: \"" + titleCase.trim() + "\"");

        System.out.println("==================================================");
    }
}