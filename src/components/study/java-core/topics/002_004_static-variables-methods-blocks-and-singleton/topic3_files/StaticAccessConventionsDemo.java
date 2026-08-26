/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 3: Accessing Static Variables: ClassName.var vs objectRef.var
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticAccessConventionsDemo {

    public static class AcademicConfig {
        public static String hubName = "Barrackpore Academic Hub";
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: STATIC ACCESS CONVENTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. BEST PRACTICE: Accessing via Class Name (Crystal-clear intent)
        System.out.println(">>> 1. Recommended: Access via Class Name:");
        System.out.println("  AcademicConfig.hubName = " + AcademicConfig.hubName);

        // 2. DISCOURAGED: Accessing via Object Reference
        AcademicConfig ref = new AcademicConfig();
        System.out.println("\n>>> 2. Discouraged: Access via object reference 'ref.hubName':");
        System.out.println("  ref.hubName = " + ref.hubName);

        // 3. NULL REFERENCE TRICK:
        AcademicConfig nullRef = null;
        System.out.println("\n>>> 3. Null Reference Access (No NullPointerException thrown!):");
        // The compiler replaces 'nullRef.hubName' with 'AcademicConfig.hubName' at compile time!
        System.out.println("  nullRef.hubName = " + nullRef.hubName);

        System.out.println("\n==========================================================================");
    }
}