/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 7: The Mandatory Contract Between equals() and hashCode()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

import java.util.Objects;

public class EqualsHashCodeContractDemo {

    public static class TraineeBadge {
        private int badgeId;
        private String hub;

        public TraineeBadge(int id, String hub) {
            this.badgeId = id;
            this.hub = hub;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            TraineeBadge other = (TraineeBadge) obj;
            return this.badgeId == other.badgeId && Objects.equals(this.hub, other.hub);
        }

        // MANDATORY RULE: If two objects are equal according to equals(),
        // calling hashCode() on each of them MUST produce the EXACT same integer!
        @Override
        public int hashCode() {
            return Objects.hash(badgeId, hub);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: THE MANDATORY equals() AND hashCode() CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeBadge b1 = new TraineeBadge(501, "Barrackpore");
        TraineeBadge b2 = new TraineeBadge(501, "Barrackpore");

        System.out.println(">>> 1. Rule 1: If a.equals(b) is true -> a.hashCode() MUST equal b.hashCode():");
        System.out.println("  b1.equals(b2)         : " + b1.equals(b2));
        System.out.println("  b1.hashCode() == b2.hashCode(): " + (b1.hashCode() == b2.hashCode()));

        System.out.println("\n>>> 2. Rule 2: If a.hashCode() == b.hashCode() -> equals() may or may not be true (Collision):");
        System.out.println("  (Hash collisions are mathematically possible and handled by collection linked buckets).");

        System.out.println("\n==========================================================================");
    }
}