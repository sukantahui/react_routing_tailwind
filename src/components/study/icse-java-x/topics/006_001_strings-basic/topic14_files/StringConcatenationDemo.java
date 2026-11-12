/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 14: String Concatenation Using + and concat()
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringConcatenationDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     STRING CONCATENATION: + VS CONCAT()          ");
        System.out.println("==================================================");

        // 1. Using the + operator (Universal: works with primitives, objects, null)
        String s1 = "Barrackpore";
        String s2 = " Center";
        String combinedPlus = s1 + s2;
        System.out.println("[1] Using + operator: " + combinedPlus);

        // 2. Using concat() method (Strict: only accepts String, throws NPE on null)
        String combinedConcat = s1.concat(s2);
        System.out.println("[2] Using concat() method: " + combinedConcat);

        // 3. Precedence & Evaluation Order (Classic ICSE Section A Question)
        System.out.println("\n[3] ICSE Board Precedence Traps:");
        System.out.println("    \"Result: \" + 10 + 20   -> " + ("Result: " + 10 + 20));   // "Result: 1020"
        System.out.println("    \"Result: \" + (10 + 20) -> " + ("Result: " + (10 + 20))); // "Result: 30"
        System.out.println("    10 + 20 + \" Result\"    -> " + (10 + 20 + " Result"));    // "30 Result"

        // 4. Concatenation with null
        String nullStr = null;
        System.out.println("\n[4] Null Handling:");
        System.out.println("    \"Text: \" + nullStr -> " + ("Text: " + nullStr)); // "Text: null"
        // nullStr.concat("Text"); // Throws NullPointerException!

        System.out.println("==================================================");
    }
}