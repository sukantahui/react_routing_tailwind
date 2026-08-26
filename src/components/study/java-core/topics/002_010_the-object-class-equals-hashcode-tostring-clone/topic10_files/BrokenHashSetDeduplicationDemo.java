/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 10: Catastrophic Consequences of Broken hashCode in HashSet & HashMap
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

import java.util.HashSet;
import java.util.Set;

public class BrokenHashSetDeduplicationDemo {

    public static class DefectiveStudent {
        private int id;
        public DefectiveStudent(int id) { this.id = id; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            DefectiveStudent other = (DefectiveStudent) obj;
            return this.id == other.id;
        }
        // MISSING hashCode()!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: BROKEN HASHSET DEDUPLICATION BUG - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Set<DefectiveStudent> set = new HashSet<>();

        DefectiveStudent s1 = new DefectiveStudent(101);
        DefectiveStudent s2 = new DefectiveStudent(101); // DUPLICATE ID!

        set.add(s1);
        set.add(s2); // HashSet FAILS to prevent duplicate because hashCodes differ!

        System.out.println(">>> Attempted to insert duplicate student (ID 101) into HashSet:");
        System.out.println("  HashSet Size: " + set.size() + " (FAILED TO DEDUPLICATE!)");
        System.out.println("  s1.equals(s2): " + s1.equals(s2));
        System.out.println("  s1.hashCode(): " + s1.hashCode());
        System.out.println("  s2.hashCode(): " + s2.hashCode() + " (Different memory buckets!)");

        System.out.println("\n==========================================================================");
    }
}