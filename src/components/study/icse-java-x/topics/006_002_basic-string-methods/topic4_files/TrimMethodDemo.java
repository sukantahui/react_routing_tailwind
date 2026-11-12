/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_002: Basic String Methods
 * Topic 4: trim() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class TrimMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          TRIM() METHOD IN JAVA (ICSE)            ");
        System.out.println("==================================================");

        String messy = "   Barrackpore Education Center   ";
        System.out.println("Raw String     : \"" + messy + "\"");
        System.out.println("Raw Length     : " + messy.length());

        // 1. Invoking trim()
        String clean = messy.trim();
        System.out.println("\nCleaned String : \"" + clean + "\"");
        System.out.println("Cleaned Length : " + clean.length());

        // 2. Demonstrating that intermediate spaces remain intact
        System.out.println("\nNotice: Intermediate spaces between 'Education' and 'Center' are preserved!");

        // 3. String consisting solely of spaces
        String emptySpaces = "      ";
        System.out.println("\nAll-space string trimmed length: " + emptySpaces.trim().length()); // 0

        System.out.println("==================================================");
    }
}