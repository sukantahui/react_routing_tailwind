/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 8: Catastrophic Consequences of Overriding equals() Without hashCode() in HashMaps
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

import java.util.HashMap;
import java.util.Map;

public class BrokenHashCodeConsequencesDemo {

    // BROKEN CLASS: Overrides equals() but FAILS to override hashCode()!
    public static class BrokenKey {
        private String keyName;

        public BrokenKey(String name) { this.keyName = name; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            BrokenKey other = (BrokenKey) obj;
            return this.keyName != null && this.keyName.equals(other.keyName);
        }

        // MISSING hashCode()! Uses default Object.hashCode() based on memory address!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: BROKEN hashCode() DISASTER IN HASHMAPS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Map<BrokenKey, String> map = new HashMap<>();

        BrokenKey k1 = new BrokenKey("SWADEEP_RECORD");
        map.put(k1, "Enrolled in Full Stack Java (Barrackpore)");

        // Creating a duplicate key with identical logical value:
        BrokenKey k2 = new BrokenKey("SWADEEP_RECORD");

        System.out.println(">>> 1. Verifying that k1.equals(k2) is TRUE:");
        System.out.println("  k1.equals(k2): " + k1.equals(k2));

        System.out.println("\n>>> 2. Attempting to retrieve from HashMap using k2:");
        String result = map.get(k2); // Returns NULL because k2 landed in a different bucket!

        System.out.println("  map.get(k2)  : " + result + " -> CATASTROPHIC DATA LOSS (NULL)!");
        System.out.println("\n>>> WHY IT FAILED:");
        System.out.println("  1. 'map.put(k1)' placed the entry into Bucket A based on k1's memory address.");
        System.out.println("  2. 'map.get(k2)' searched in Bucket B based on k2's memory address.");
        System.out.println("  3. The HashMap never even called 'equals()' because it searched the wrong bucket!");

        System.out.println("\n==========================================================================");
    }
}