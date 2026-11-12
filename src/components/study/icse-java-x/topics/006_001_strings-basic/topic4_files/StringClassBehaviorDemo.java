/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 4: Working with String Class and Object Behavior
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringClassBehaviorDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    STRING CLASS HIERARCHY & OBJECT BEHAVIOR      ");
        System.out.println("==================================================");

        // 1. String as an Object: inherits from java.lang.Object
        String institute = "Coder & AccoTax";
        Object obj = institute; // Upcasting to Object
        System.out.println("[1] institute.toString() : " + institute.toString());
        System.out.println("    obj.getClass().getName(): " + obj.getClass().getName());

        // 2. CharSequence polymorphic interface
        CharSequence seq = "Barrackpore Education";
        System.out.println("\n[2] Polymorphic CharSequence length(): " + seq.length());
        System.out.println("    seq.charAt(0): " + seq.charAt(0));

        // 3. String is Comparable
        String word1 = "Apple";
        String word2 = "Banana";
        System.out.println("\n[3] Comparable Interface Implementation:");
        System.out.println("    word1.compareTo(word2): " + word1.compareTo(word2)); // Negative

        // 4. Checking instance type
        boolean isString = institute instanceof String;
        boolean isCharSeq = institute instanceof CharSequence;
        boolean isObj = institute instanceof Object;
        System.out.println("\n[4] Type Checks:");
        System.out.println("    instanceof String       : " + isString);
        System.out.println("    instanceof CharSequence : " + isCharSeq);
        System.out.println("    instanceof Object       : " + isObj);

        System.out.println("==================================================");
    }
}