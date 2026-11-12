/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 3: Immutability of String Objects and Its Advantages
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringImmutabilityDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   DEMONSTRATING STRING IMMUTABILITY IN JAVA      ");
        System.out.println("==================================================");

        // 1. Immutability Proof: Methods do NOT change original object!
        String original = "Barrackpore";
        System.out.println("[1] Original string: " + original);

        // Calling toUpperCase() produces a NEW string; original remains unchanged
        original.toUpperCase();
        System.out.println("After original.toUpperCase(): " + original); // Still "Barrackpore"!

        // 2. To capture change, reference must be reassigned
        String upper = original.toUpperCase();
        System.out.println("Assigned to new reference 'upper': " + upper); // "BARRACKPORE"

        // 3. Concatenation creates a new object
        String s1 = "Computer";
        int hashBefore = System.identityHashCode(s1);
        s1 = s1 + " Applications";
        int hashAfter = System.identityHashCode(s1);

        System.out.println("\n[2] Memory Address Trace:");
        System.out.println("Address before concatenation: " + hashBefore);
        System.out.println("Address after concatenation : " + hashAfter);
        System.out.println("Are addresses identical? " + (hashBefore == hashAfter)); // false!

        System.out.println("==================================================");
    }
}