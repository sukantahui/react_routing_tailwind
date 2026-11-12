/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 12: String Replacement and Modification Techniques
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringReplaceDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       STRING REPLACEMENT & MODIFICATION          ");
        System.out.println("==================================================");

        String text = "MISSISSIPPI";
        System.out.println("Original: " + text);

        // 1. replace(char oldChar, char newChar)
        // Replaces all occurrences of oldChar with newChar
        String noS = text.replace('S', 'X');
        System.out.println("\n[1] text.replace('S', 'X'): " + noS); // MIXXIXXIPPI

        // 2. replace(CharSequence target, CharSequence replacement)
        // Replaces full word or multi-char sequence
        String sentence = "I study at Shyamnagar lab.";
        String updatedSentence = sentence.replace("Shyamnagar", "Barrackpore");
        System.out.println("\n[2] Target replacement:");
        System.out.println("    Before: \"" + sentence + "\"");
        System.out.println("    After : \"" + updatedSentence + "\"");

        // 3. Vowel masking program (Classic ICSE Section B problem)
        String input = "Education";
        String masked = input.replace('a', '*')
                             .replace('e', '*')
                             .replace('i', '*')
                             .replace('o', '*')
                             .replace('u', '*')
                             .replace('A', '*')
                             .replace('E', '*')
                             .replace('I', '*')
                             .replace('O', '*')
                             .replace('U', '*');
        System.out.println("\n[3] Vowel Masking Example:");
        System.out.println("    Original: " + input);
        System.out.println("    Masked  : " + masked); // *d*c*t**n

        System.out.println("==================================================");
    }
}