/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 11: Using java.util.Objects.hash() and Objects.equals() Utility Helpers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

import java.util.Objects;

public class ObjectsUtilityHelpersDemo {

    public static class ProfessionalDeveloper {
        private String name;
        private String primarySkill;
        private double rating;

        public ProfessionalDeveloper(String name, String skill, double rating) {
            this.name = name;
            this.primarySkill = skill;
            this.rating = rating;
        }

        // Clean, Null-Safe, Modern equals() using Objects.equals():
        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            ProfessionalDeveloper other = (ProfessionalDeveloper) obj;
            return Double.compare(this.rating, other.rating) == 0 &&
                   Objects.equals(this.name, other.name) &&
                   Objects.equals(this.primarySkill, other.primarySkill);
        }

        // Modern 1-line hashCode() using Objects.hash():
        @Override
        public int hashCode() {
            return Objects.hash(name, primarySkill, rating);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: java.util.Objects UTILITY HELPERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ProfessionalDeveloper dev1 = new ProfessionalDeveloper("Swadeep Paul", "Java Core", 9.8);
        ProfessionalDeveloper dev2 = new ProfessionalDeveloper("Swadeep Paul", "Java Core", 9.8);

        System.out.println("  dev1.equals(dev2)  : " + dev1.equals(dev2));
        System.out.println("  dev1.hashCode()    : " + dev1.hashCode());
        System.out.println("  dev2.hashCode()    : " + dev2.hashCode());

        System.out.println("\n==========================================================================");
    }
}