/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 6: Tricky Riddle 7 - HashMap Keys Missing hashCode & equals
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

import java.util.HashMap;
import java.util.Map;

public class TrickyRiddle7HashMapHashCodeContractDemo {

    // Missing hashCode & equals:
    public static class BrokenKey {
        int id;
        public BrokenKey(int id) { this.id = id; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TRICKY RIDDLE 7: HASHMAP HASHCODE/EQUALS CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Map<BrokenKey, String> map = new HashMap<>();
        BrokenKey k1 = new BrokenKey(101);
        BrokenKey k2 = new BrokenKey(101);

        map.put(k1, "Student: Swadeep Paul");

        System.out.println("1. Lookup with k1 (Exact same reference):");
        System.out.println("   map.get(k1) -> " + map.get(k1)); // "Student: Swadeep Paul"

        System.out.println("
2. Lookup with k2 (Different reference, same id=101):");
        System.out.println("   map.get(k2) -> " + map.get(k2)); // NULL! (Default identity hashCode differs)

        System.out.println("
RULE: For HashMap keys, you MUST override both hashCode() & equals() together!");

        System.out.println("\n==========================================================================");
    }
}
