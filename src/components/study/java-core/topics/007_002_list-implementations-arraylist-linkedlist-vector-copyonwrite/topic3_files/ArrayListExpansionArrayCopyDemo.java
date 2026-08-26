/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 3: How ArrayList Expands: Memory Allocation & System.arraycopy() Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Arrays;

public class ArrayListExpansionArrayCopyDemo {

    // Simulating manual ArrayList growth using Arrays.copyOf & System.arraycopy:
    public static class CustomMiniArrayList<E> {
        private Object[] data;
        private int size = 0;

        public CustomMiniArrayList() {
            this.data = new Object[4]; // Small initial capacity for demonstration
        }

        public void add(E element) {
            if (size == data.length) {
                grow();
            }
            data[size++] = element;
        }

        private void grow() {
            int oldCapacity = data.length;
            int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5x
            System.out.printf("  [EXPANSION TRIGGERED] Allocating new array (Capacity: %d -> %d)...%n", oldCapacity, newCapacity);

            // High-speed native memory block copy:
            data = Arrays.copyOf(data, newCapacity);
        }

        public int size() { return size; }
        public int capacity() { return data.length; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: HOW ArrayList EXPANDS (System.arraycopy) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CustomMiniArrayList<String> list = new CustomMiniArrayList<>();
        System.out.println(">>> 1. Adding Elements and Observing Expansion Points:");

        list.add("Swadeep Paul (Barrackpore)");
        list.add("Tuhina Das (Naihati)");
        list.add("Abhronila Das (Shyamnagar)");
        list.add("Debangshu Mukherjee (Ichapur)");
        System.out.printf("  Status: Size=%d, Capacity=%d (Buffer Full!)%n", list.size(), list.capacity());

        // Adding 5th element triggers grow():
        list.add("Student 5 (New Admission)");
        System.out.printf("  Status: Size=%d, Capacity=%d (Expanded successfully!)%n", list.size(), list.capacity());

        System.out.println("\n>>> HOW System.arraycopy() ACHIEVES BLAZING SPEED:");
        System.out.println("  1. Native C/C++ Implementation: 'System.arraycopy()' is a JVM native intrinsic method.");
        System.out.println("  2. Direct SIMD Memory Transfers: Uses CPU vector instructions ('memmove') to transfer memory blocks in parallel.");

        System.out.println("\n==========================================================================");
    }
}