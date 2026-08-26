/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 16: Bill Pugh Singleton Implementation Using Static Inner Helper Class
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class BillPughSingletonPatternDemo {

    public static class BillPughRegistryManager {

        private BillPughRegistryManager() {
            System.out.println("  [BILL PUGH SINGLETON] Instance born via ClassLoader synchronization!");
        }

        // STATIC INNER HELPER CLASS:
        // Loaded into memory ONLY when getInstance() references BillPughHolder!
        private static class BillPughHolder {
            private static final BillPughRegistryManager INSTANCE = new BillPughRegistryManager();
        }

        // High performance global access (100% thread-safe with ZERO synchronized overhead!)
        public static BillPughRegistryManager getInstance() {
            return BillPughHolder.INSTANCE;
        }

        public void printInfo() {
            System.out.println("  -> Bill Pugh Registry active! HashCode: " + System.identityHashCode(this));
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: BILL PUGH SINGLETON PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Accessing Bill Pugh Singleton:");
        BillPughRegistryManager r1 = BillPughRegistryManager.getInstance();
        r1.printInfo();

        System.out.println("\n>>> 2. Accessing second time:");
        BillPughRegistryManager r2 = BillPughRegistryManager.getInstance();
        r2.printInfo();

        System.out.println("\n>>> Is r1 == r2? " + (r1 == r2));

        System.out.println("\n==========================================================================");
    }
}