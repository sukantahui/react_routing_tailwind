/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 1: String Creation Using Literals vs New Keyword
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 * Students: Swadeep, Tuhina, Abhronila, Debangshu
 */

public class StringCreationMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   STRING CREATION: LITERALS VS NEW KEYWORD       ");
        System.out.println("==================================================");

        // 1. Creation using String Literal (Stored in String Constant Pool)
        String s1 = "Barrackpore";
        String s2 = "Barrackpore"; // Reuses existing object in SCP!

        // 2. Creation using 'new' Keyword (Forced Heap Allocation)
        String s3 = new String("Barrackpore"); // Creates a separate object on Heap
        String s4 = new String("Barrackpore"); // Creates yet another separate Heap object

        System.out.println("[1] Reference Equality Check (==):");
        System.out.println("s1 == s2 (Both literals in SCP) : " + (s1 == s2)); // true
        System.out.println("s1 == s3 (SCP literal vs Heap)  : " + (s1 == s3)); // false
        System.out.println("s3 == s4 (Two distinct Heap objs): " + (s3 == s4)); // false

        System.out.println("\n[2] Content Equality Check (equals()):");
        System.out.println("s1.equals(s2) : " + s1.equals(s2)); // true
        System.out.println("s1.equals(s3) : " + s1.equals(s3)); // true
        System.out.println("s3.equals(s4) : " + s3.equals(s4)); // true

        // 3. Creation from Character Array (ICSE Board Question)
        char[] letters = {'S', 'w', 'a', 'd', 'e', 'e', 'p'};
        String s5 = new String(letters);
        System.out.println("\n[3] String created from char array: " + s5);

        // 4. Creation from Sub-array of Characters
        // new String(charArray, startIndex, count)
        String s6 = new String(letters, 0, 3); // Takes 3 chars starting from index 0
        System.out.println("[4] String created from sub-array: " + s6); // "Swa"

        System.out.println("==================================================");
    }
}