/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 16: Mutable vs Immutable String Handling
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class MutableVsImmutableDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("      MUTABLE VS IMMUTABLE STRING HANDLING        ");
        System.out.println("==================================================");

        // 1. Immutable String: Each modification produces a NEW object
        String s = "ICSE";
        int strHash1 = System.identityHashCode(s);
        s = s + " 2026";
        int strHash2 = System.identityHashCode(s);

        System.out.println("[1] Immutable String Demonstration:");
        System.out.println("    Initial address : " + strHash1);
        System.out.println("    New address     : " + strHash2);
        System.out.println("    Did object change address? " + (strHash1 != strHash2)); // true

        // 2. Mutable StringBuilder: Modifications happen in-place!
        StringBuilder sb = new StringBuilder("ICSE");
        int sbHash1 = System.identityHashCode(sb);
        sb.append(" 2026");
        int sbHash2 = System.identityHashCode(sb);

        System.out.println("\n[2] Mutable StringBuilder Demonstration:");
        System.out.println("    Initial address : " + sbHash1);
        System.out.println("    After append()  : " + sbHash2);
        System.out.println("    Is address preserved? " + (sbHash1 == sbHash2)); // true!

        // 3. Converting between String and StringBuilder
        String finalString = sb.toString();
        System.out.println("\n[3] Conversion back to immutable String: " + finalString);

        System.out.println("==================================================");
    }
}