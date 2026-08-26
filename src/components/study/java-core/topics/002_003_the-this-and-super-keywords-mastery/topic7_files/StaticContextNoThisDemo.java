/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 7: Why 'this' Cannot Be Used Inside Static Contexts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class StaticContextNoThisDemo {

    public static class CampusConfig {
        private static String academicCenter = "Barrackpore Central Hub";
        private String traineeName;

        public CampusConfig(String traineeName) {
            this.traineeName = traineeName; // VALID: Instance context has 'this'
        }

        // STATIC METHOD (Class-level context in Metaspace)
        public static void printCenterInfo() {
            System.out.println("  [STATIC METHOD] Academic Center: " + academicCenter);

            // ================================================================
            // WHY 'this' IS STRICTLY FORBIDDEN IN STATIC CONTEXTS:
            // ================================================================
            // 1. Static methods belong to the Class and are invoked on the class,
            //    not on any Heap object (e.g. 'CampusConfig.printCenterInfo()').
            // 2. No Heap instance reference exists in local variable slot 0!
            // 3. Writing 'this.traineeName' causes a COMPILE-TIME ERROR:
            //    "non-static variable this cannot be referenced from a static context"
            // ================================================================
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: WHY 'this' IS FORBIDDEN IN STATIC CONTEXTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CampusConfig.printCenterInfo();

        CampusConfig s1 = new CampusConfig("Swadeep Paul");
        System.out.println("  Created instance for Swadeep. Instance context has 'this', static does not.");

        System.out.println("\n==========================================================================");
    }
}