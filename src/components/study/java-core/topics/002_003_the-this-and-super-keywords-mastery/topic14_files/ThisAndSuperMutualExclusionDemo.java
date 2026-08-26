/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 14: Why this() and super() Cannot Both Be Written in Same Constructor Body
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class ThisAndSuperMutualExclusionDemo {

    public static class BasePerson {
        public BasePerson() {
            System.out.println("  [PARENT] BasePerson initialized ONCE on Heap.");
        }
    }

    public static class Trainee extends BasePerson {
        private int id;
        private String name;

        // Constructor 1: Uses this() to chain to Constructor 2
        public Trainee(int id) {
            this(id, "Provisional"); // Delegates to Constructor 2
            // super(); // CANNOT be written here! Both this() and super() require Line 1!
        }

        // Constructor 2: Uses implicit super() to initialize parent
        public Trainee(int id, String name) {
            super(); // Line 1: Parent initialized here!
            this.id = id;
            this.name = name;
            System.out.printf("  [CHILD] Trainee #%d (%s) initialized.\n", this.id, this.name);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: this() & super() MUTUAL EXCLUSION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Instantiating Trainee via 1-arg constructor (which chains via this()):");
        Trainee t = new Trainee(101);

        System.out.println("\n>>> Architectural Reason for Mutual Exclusion:");
        System.out.println("  1. If both were allowed, the parent constructor would execute TWICE for 1 object!");
        System.out.println("  2. Both 'this()' and 'super()' demand to be the FIRST statement on Line 1.");
        System.out.println("  3. Therefore, they are mutually exclusive in any single constructor body.");

        System.out.println("\n==========================================================================");
    }
}