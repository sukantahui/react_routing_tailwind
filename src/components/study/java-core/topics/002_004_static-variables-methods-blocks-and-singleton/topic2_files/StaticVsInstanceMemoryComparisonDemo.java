/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 2: Memory Comparison: Static Variables vs Instance Variables
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticVsInstanceMemoryComparisonDemo {

    public static class TraineeNode {
        // 1. Static Variable: 1 copy in Metaspace / Class mirror
        public static String hub = "Barrackpore";

        // 2. Instance Variables: Copied on Heap for EVERY 'new' object
        private String name;
        private double fee;

        public TraineeNode(String name, double fee) {
            this.name = name;
            this.fee = fee;
        }

        public void print() {
            System.out.printf("  [0x%08X] Name: %-15s | Fee: ₹%.2f | Shared Hub: %s\n",
                    System.identityHashCode(this), name, fee, hub);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: STATIC VS INSTANCE MEMORY COMPARISON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeNode s1 = new TraineeNode("Swadeep Paul", 5000.0);
        TraineeNode s2 = new TraineeNode("Tuhina Das", 6000.0);

        s1.print();
        s2.print();

        System.out.println("\n==========================================================================");
    }
}