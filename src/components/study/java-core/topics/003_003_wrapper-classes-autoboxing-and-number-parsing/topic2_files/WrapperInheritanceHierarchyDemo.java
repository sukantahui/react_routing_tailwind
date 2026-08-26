/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 2: Inheritance Hierarchy: java.lang.Number Superclass vs Character & Boolean
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class WrapperInheritanceHierarchyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: WRAPPER CLASS INHERITANCE HIERARCHY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The java.lang.Number Abstract Hierarchy:");
        System.out.println("  Object -> Number (abstract)");
        System.out.println("              ├── Byte");
        System.out.println("              ├── Short");
        System.out.println("              ├── Integer");
        System.out.println("              ├── Long");
        System.out.println("              ├── Float");
        System.out.println("              ├── Double");
        System.out.println("              ├── BigInteger (math)");
        System.out.println("              └── BigDecimal (math)");

        System.out.println("\n>>> 2. Non-Numeric Wrappers (Direct descendants of Object):");
        System.out.println("  Object -> Character");
        System.out.println("  Object -> Boolean");

        System.out.println("\n>>> 3. Universal Number Extraction Methods in java.lang.Number:");
        Number numRef = Integer.valueOf(42); // Polymorphic reference!
        System.out.println("  numRef.intValue()    : " + numRef.intValue());
        System.out.println("  numRef.doubleValue() : " + numRef.doubleValue());
        System.out.println("  numRef.byteValue()   : " + numRef.byteValue());

        System.out.println("\n==========================================================================");
    }
}