/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 5: Capacity Rules: Default Initial Capacity (16) & Power of Two Mandate
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;

public class HashMapCapacityPowerOfTwoDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: HashMap CAPACITY & POWER OF TWO MANDATE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Requesting non-power-of-two capacity (e.g. 10):
        HashMap<Integer, String> customMap = new HashMap<>(10);
        customMap.put(1, "Test Entry"); // Triggers table allocation

        Field tableField = HashMap.class.getDeclaredField("table");
        tableField.setAccessible(true);
        Object[] table = (Object[]) tableField.get(customMap);

        System.out.println(">>> 1. Capacity Rounding (tableSizeFor()):");
        System.out.println("  Requested Capacity : 10");
        System.out.println("  Actual Table Length: " + table.length + " (Rounded up to nearest power of 2: 16!)");

        System.out.println("\n>>> WHY CAPACITY MUST ALWAYS BE A POWER OF 2 (2^n):");
        System.out.println("  1. If capacity is a power of 2 (e.g., 16 = 0001 0000 in binary):");
        System.out.println("     - '(capacity - 1)' becomes a clean bitmask of all 1s (15 = 0000 1111).");
        System.out.println("  2. This allows index calculation: 'index = (n - 1) & hash'!");
        System.out.println("  3. Bitwise AND '&' executes in 1 CPU clock cycle, whereas modulo '%' takes 20-40 CPU cycles!");
        System.out.println("  4. If capacity is NOT a power of 2, bitmasking fails and uneven bucket distribution causes severe collisions.");

        System.out.println("\n==========================================================================");
    }
}