/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 13: Rules of super(): Must Be the First Statement in Child Constructor
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class SuperCallFirstStatementRulesDemo {

    public static class SmartParent {
        protected String centerCode;

        public SmartParent(String centerCode) {
            this.centerCode = centerCode;
        }
    }

    public static class SmartChild extends SmartParent {
        private String candidateName;

        // Static helper function is PERMITTED in super(...) argument
        public static String sanitizeHub(String rawHub) {
            return "HUB-" + rawHub.trim().toUpperCase();
        }

        // VALID: super() as strict statement 1
        public SmartChild(String rawHub, String candidateName) {
            super(sanitizeHub(rawHub)); // Line 1: VALID!
            this.candidateName = candidateName;
            System.out.printf("  [INITIALIZED] Candidate: %s at %s\n", candidateName, this.centerCode);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: RULES OF super() CALL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SmartChild child = new SmartChild("barrackpore north", "Swadeep Paul");

        System.out.println("\n==========================================================================");
    }
}