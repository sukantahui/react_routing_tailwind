/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 8: Static Initialization Blocks (SIB): Execution During Class Loading
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

import java.util.HashMap;
import java.util.Map;

public class StaticInitializationBlockDemo {

    public static class RegionalCenterRegistry {
        // Complex static collection
        public static final Map<String, String> HUB_DIRECTORS = new HashMap<>();

        // STATIC INITIALIZATION BLOCK (SIB):
        // Executes ONCE when RegionalCenterRegistry is loaded by ClassLoader
        static {
            System.out.println("  [SIB EXECUTING] Populating regional hub registry...");
            HUB_DIRECTORS.put("BKP", "Sukanta Hui (Barrackpore Central)");
            HUB_DIRECTORS.put("NHT", "Naihati Regional Branch");
            HUB_DIRECTORS.put("SHY", "Shyamnagar Tech Lab");
            HUB_DIRECTORS.put("ICP", "Ichapur Extension Center");
            System.out.println("  [SIB COMPLETED] Registry populated with " + HUB_DIRECTORS.size() + " hubs.");
        }

        public static String getDirector(String code) {
            return HUB_DIRECTORS.getOrDefault(code, "Unknown Hub");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: STATIC INITIALIZATION BLOCKS (SIB) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Accessing Static Method (Triggers Class Loading & SIB):");
        String dir = RegionalCenterRegistry.getDirector("BKP");
        System.out.println("  Director for BKP: " + dir);

        System.out.println("\n>>> 2. Accessing Second Time (SIB does NOT re-execute):");
        String dir2 = RegionalCenterRegistry.getDirector("NHT");
        System.out.println("  Director for NHT: " + dir2);

        System.out.println("\n==========================================================================");
    }
}