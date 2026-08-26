/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 2: The JVM Heap Area - Object Instances & Array Allocations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class JvmHeapAreaDemo {

    public static class StudentRecord {
        private final int id;
        private final String name;
        private final double[] examMarks; // Array allocated on heap!

        public StudentRecord(int id, String name, double[] examMarks) {
            this.id = id;
            this.name = name;
            this.examMarks = examMarks;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE JVM HEAP AREA - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // Object instance and double array allocated directly on the Heap:
        StudentRecord student = new StudentRecord(101, "Swadeep Paul", new double[]{92.5, 88.0, 95.0});

        System.out.println(">>> 1. ALLOCATION IN HEAP MEMORY:");
        System.out.println("  - 'student' reference variable : Resides on the JVM Thread STACK.");
        System.out.println("  - 'StudentRecord' instance     : Resides on the HEAP.");
        System.out.println("  - 'examMarks' double[] array   : Resides on the HEAP.\n");

        System.out.println(">>> 2. HEAP MEMORY FLAGS:");
        System.out.println("  - Initial Heap Size : -Xms (e.g. -Xms2g)");
        System.out.println("  - Maximum Heap Size : -Xmx (e.g. -Xmx4g)");
        System.out.println("  - Best Practice     : Set -Xms equal to -Xmx in production to avoid resizing pauses!");

        System.out.println("\n==========================================================================");
    }
}
