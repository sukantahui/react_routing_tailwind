/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 2: ArrayList Growth Formula: oldCapacity + (oldCapacity >> 1) = 1.5x Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class ArrayListGrowthFormulaCalculationDemo {

    // Simulating JDK ArrayList.grow(int minCapacity) bitwise growth calculation:
    public static int calculateNewCapacity(int oldCapacity) {
        // Bitwise right-shift (>> 1) is equivalent to integer division by 2:
        return oldCapacity + (oldCapacity >> 1);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: ArrayList GROWTH FORMULA (1.5x) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> STEP-BY-STEP CAPACITY EXPANSION PROGRESSION:");
        int currentCapacity = 10; // Default capacity after first add
        System.out.printf("  Initial Default Capacity : %d%n", currentCapacity);

        for (int step = 1; step <= 8; step++) {
            int nextCapacity = calculateNewCapacity(currentCapacity);
            System.out.printf("  Step %d Expansion : %4d -> %-4d (Formula: %d + (%d >> 1) = %d)%n",
                    step, currentCapacity, nextCapacity, currentCapacity, currentCapacity, nextCapacity);
            currentCapacity = nextCapacity;
        }

        System.out.println("\n>>> WHY JAVA USES A 1.5x GROWTH FACTOR (AND BITWISE >> 1):");
        System.out.println("  1. 1.5x vs 2.0x Memory Recycling: A 1.5x growth factor allows previously deallocated array memory blocks to be reused by future allocations in modern garbage collectors!");
        System.out.println("  2. Bitwise Right-Shift: 'oldCapacity >> 1' executes in 1 single CPU clock cycle, avoiding expensive division instructions.");
        System.out.println("  3. Amortized O(1) Append: Because resizing occurs exponentially less frequently as size grows, appends remain O(1) on average.");

        System.out.println("\n==========================================================================");
    }
}