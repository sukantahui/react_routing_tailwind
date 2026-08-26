/**
 * Java Core Tutorial - Module 007_005: Map Implementations & HashMap Internals
 * Topic 7: Key Hash Spreading: XOR Bit-Shift Function ((h = key.hashCode()) ^ (h >>> 16))
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class HashMapXorHashSpreadingDemo {

    // Exact JDK HashMap Hash Spreading Function:
    static int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: HashMap XOR HASH SPREADING FUNCTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String studentKey = "Swadeep-Paul-Barrackpore";
        int rawHashCode = studentKey.hashCode();
        int spreadHash = hash(studentKey);

        System.out.println(">>> 1. Raw HashCode vs Spread Hash:");
        System.out.printf("  Raw Key hashCode()      : %d [Binary: %32s]%n", rawHashCode, Integer.toBinaryString(rawHashCode));
        System.out.printf("  High Bits Shifted (>>>16): %d [Binary: %32s]%n", (rawHashCode >>> 16), Integer.toBinaryString(rawHashCode >>> 16));
        System.out.printf("  Spread Hash (Raw ^ >>>16): %d [Binary: %32s]%n", spreadHash, Integer.toBinaryString(spreadHash));

        System.out.println("\n>>> WHY JAVAC APPLIES '(h ^ (h >>> 16))':");
        System.out.println("  1. Table Length is small: When table length is 16, index is computed using ONLY the lowest 4 bits ('(16-1) & hash').");
        System.out.println("  2. High-Bit Waste Hazard : Without spreading, bits 16 to 31 would NEVER participate in index calculation!");
        System.out.println("  3. XOR Spreading Solution: Shifting right by 16 bits and XORing folds the high-order bits into the low-order bits.");
        System.out.println("  4. Massive Collision Reduction: Even if two keys differ only in their upper bits, their bucket indices will now differ!");

        System.out.println("\n==========================================================================");
    }
}