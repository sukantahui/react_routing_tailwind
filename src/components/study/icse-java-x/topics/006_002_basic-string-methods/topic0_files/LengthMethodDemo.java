/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_002: Basic String Methods
 * Topic 0: length() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class LengthMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          STRING LENGTH() METHOD IN JAVA          ");
        System.out.println("==================================================");

        // 1. Basic length calculation
        String institute = "Coder & AccoTax";
        System.out.println("String: \"" + institute + "\"");
        System.out.println("institute.length(): " + institute.length()); // 15

        // 2. Empty string vs single space
        String empty = "";
        String space = " ";
        System.out.println("\nEmpty string \"\".length() : " + empty.length()); // 0
        System.out.println("Single space \" \".length() : " + space.length()); // 1

        // 3. Escape sequences are single characters
        String escaped = "A\tB\nC";
        System.out.println("\nEscaped string \"A\\tB\\nC\":");
        System.out.println("Visible text length: " + escaped.length()); // 5 ('A', '\t', 'B', '\n', 'C')

        // 4. Comparison with Array length
        int[] numbers = {10, 20, 30, 40};
        System.out.println("\nArray length (field without ()) : " + numbers.length); // 4
        System.out.println("String length (method with ())   : " + institute.length()); // 15

        System.out.println("==================================================");
    }
}