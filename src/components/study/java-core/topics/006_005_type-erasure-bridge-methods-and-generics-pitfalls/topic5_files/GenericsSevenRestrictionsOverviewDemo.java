/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 5: The 7 Core Restrictions & Limitations of Java Generics (Architectural Overview)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

public class GenericsSevenRestrictionsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE 7 CORE RESTRICTIONS OF JAVA GENERICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 7 RESTRICTIONS RESULTING DIRECTLY FROM TYPE ERASURE:");
        System.out.println("  1. No Primitives           : Cannot instantiate generic types with primitives (List<int> is illegal).");
        System.out.println("  2. No 'new T()'            : Cannot create instances of type parameters directly.");
        System.out.println("  3. No Static Type Fields   : Cannot declare static fields of generic type 'T'.");
        System.out.println("  4. No Casts / Instanceof   : Cannot check 'instanceof List<String>' (erased to raw List).");
        System.out.println("  5. No Generic Arrays       : Cannot create generic array instances (new List<String>[10]).");
        System.out.println("  6. No Generic Exceptions   : Cannot create, catch, or throw parameterized exception classes.");
        System.out.println("  7. No Overload Clashes     : Cannot overload methods that erase to identical parameter types.");

        System.out.println("\n>>> WHY DO THESE RESTRICTIONS EXIST?");
        System.out.println("  - Because at runtime, the JVM has NO idea what 'T' represents!");
        System.out.println("  - Without runtime type information, the JVM cannot allocate memory for 'new T()' or 'new T[]'.");

        System.out.println("\n==========================================================================");
    }
}