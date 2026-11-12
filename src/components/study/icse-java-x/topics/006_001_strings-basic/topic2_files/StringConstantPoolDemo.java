/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 2: String Constant Pool and Memory Management
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringConstantPoolDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    STRING CONSTANT POOL (SCP) & INTERN() DEMO    ");
        System.out.println("==================================================");

        // 1. Literal pooling
        String str1 = "Naihati";
        String str2 = "Naihati";
        System.out.println("str1 == str2 (Pooled literals): " + (str1 == str2)); // true

        // 2. Explicit new Heap allocation
        String str3 = new String("Naihati");
        System.out.println("str1 == str3 (SCP vs Heap)     : " + (str1 == str3)); // false

        // 3. Using the intern() method
        // intern() returns the canonical reference from the SCP
        String str4 = str3.intern();
        System.out.println("str1 == str4 (After intern())  : " + (str1 == str4)); // true
        System.out.println("str3 == str4 (Heap vs Interned): " + (str3 == str4)); // false

        // 4. Memory Efficiency Experiment at Ichapur Lab
        // Demonstrating how pooling saves memory for repeated values
        String studentA = "Class-10";
        String studentB = "Class-10";
        String studentC = "Class-10";
        System.out.println("\nAll 3 student grade references point to same SCP address:");
        System.out.println("Identity Hashcode A: " + System.identityHashCode(studentA));
        System.out.println("Identity Hashcode B: " + System.identityHashCode(studentB));
        System.out.println("Identity Hashcode C: " + System.identityHashCode(studentC));

        System.out.println("==================================================");
    }
}