/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 4: Internal Buffer Mechanics: Initial Capacity (16) & Dynamic Growth Formula ((old * 2) + 2)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class BufferCapacityAndGrowthFormulaDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: StringBuilder BUFFER CAPACITY & GROWTH - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Initial default capacity is exactly 16 characters:
        StringBuilder sb = new StringBuilder();
        System.out.println(">>> 1. Initial State:");
        System.out.println("  Length   : " + sb.length());
        System.out.println("  Capacity : " + sb.capacity() + " (Default initial buffer size = 16)");

        // 2. Filling 16 characters (Capacity remains 16):
        sb.append("1234567890123456");
        System.out.println("\n>>> 2. After appending exactly 16 characters:");
        System.out.println("  Length   : " + sb.length());
        System.out.println("  Capacity : " + sb.capacity());

        // 3. Appending 17th character triggers DYNAMIC GROWTH:
        sb.append("X");
        System.out.println("\n>>> 3. After appending 17th character (Dynamic Resizing Triggered!):");
        System.out.println("  Length   : " + sb.length());
        System.out.println("  Capacity : " + sb.capacity() + " (Calculated via formula: (16 * 2) + 2 = 34!)");

        System.out.println("\n>>> THE DYNAMIC GROWTH FORMULA:");
        System.out.println("  newCapacity = (oldCapacity * 2) + 2;");
        System.out.println("  - Old Capacity 16 -> Grows to (16 * 2) + 2 = 34");
        System.out.println("  - Old Capacity 34 -> Grows to (34 * 2) + 2 = 70");
        System.out.println("  - Old Capacity 70 -> Grows to (70 * 2) + 2 = 142");

        System.out.println("\n==========================================================================");
    }
}