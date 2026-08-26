/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 6: Load Factor (0.75f) & Threshold Calculation: Balancing Time vs Space
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;

public class HashMapLoadFactorThresholdDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: LOAD FACTOR (0.75f) & RESIZE THRESHOLD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        HashMap<Integer, String> studentRegister = new HashMap<>(16, 0.75f);

        Field thresholdField = HashMap.class.getDeclaredField("threshold");
        thresholdField.setAccessible(true);

        Field tableField = HashMap.class.getDeclaredField("table");
        tableField.setAccessible(true);

        // Add 12 elements (Capacity 16 * Load Factor 0.75 = Threshold 12):
        for (int i = 1; i <= 12; i++) {
            studentRegister.put(i, "Student #" + i);
        }

        Object[] tableBefore = (Object[]) tableField.get(studentRegister);
        int thresholdBefore = (int) thresholdField.get(studentRegister);

        System.out.println(">>> 1. State at 12 Elements (At Threshold Boundary):");
        System.out.println("  Map Size          : " + studentRegister.size());
        System.out.println("  Table Capacity    : " + tableBefore.length);
        System.out.println("  Resize Threshold  : " + thresholdBefore);

        // Add 13th element -> Triggers immediate table doubling (Resizing to 32):
        studentRegister.put(13, "Student #13 (Triggers Resize!)");

        Object[] tableAfter = (Object[]) tableField.get(studentRegister);
        int thresholdAfter = (int) thresholdField.get(studentRegister);

        System.out.println("\n>>> 2. State at 13 Elements (After Doubling):");
        System.out.println("  Map Size          : " + studentRegister.size());
        System.out.println("  New Table Capacity: " + tableAfter.length + " (Doubled from 16 -> 32!)");
        System.out.println("  New Threshold     : " + thresholdAfter + " (32 * 0.75 = 24)");

        System.out.println("\n>>> WHY 0.75f IS THE OPTIMAL DEFAULT LOAD FACTOR:");
        System.out.println("  - Load Factor = (Element Count / Table Capacity).");
        System.out.println("  - Higher Load Factor (e.g. 1.0) : Saves memory, but increases bucket collision frequency and lookup latency.");
        System.out.println("  - Lower Load Factor (e.g. 0.5)  : Reduces collisions, but wastes large amounts of unused heap array memory.");
        System.out.println("  - 0.75 is the mathematically proven sweet spot based on Poisson distribution probability.");

        System.out.println("\n==========================================================================");
    }
}