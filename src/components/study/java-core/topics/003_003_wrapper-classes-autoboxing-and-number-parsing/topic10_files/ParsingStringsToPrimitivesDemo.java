/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 10: Parsing Strings to Primitives: parseInt, parseDouble, parseBoolean
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class ParsingStringsToPrimitivesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: PARSING STRINGS TO PRIMITIVES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Parsing Integers:
        int age = Integer.parseInt("25");
        System.out.println("  Integer.parseInt("25")       : " + age);

        // 2. Parsing Floating-Point Decimals:
        double fee = Double.parseDouble("45000.75");
        System.out.println("  Double.parseDouble("45000.75") : " + fee);

        // 3. Parsing Booleans:
        boolean active = Boolean.parseBoolean("true");
        boolean invalidBool = Boolean.parseBoolean("anythingElse"); // Any non-"true" string returns false!
        System.out.println("  Boolean.parseBoolean("true")  : " + active);
        System.out.println("  Boolean.parseBoolean("xyz")   : " + invalidBool + " (Defaults to false without exception!)");

        // 4. Distinction: 'parseInt()' vs 'valueOf()':
        int primitiveInt = Integer.parseInt("100");     // Returns primitive 'int'
        Integer wrapperInt = Integer.valueOf("100");   // Returns wrapper 'Integer' object from cache

        System.out.println("\n>>> parseInt() vs valueOf():");
        System.out.println("  Integer.parseInt("100") -> Returns primitive int (Stack)");
        System.out.println("  Integer.valueOf("100")  -> Returns Integer object (Heap/Cache)");

        System.out.println("\n==========================================================================");
    }
}