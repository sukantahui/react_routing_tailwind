/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 6: The 'hashCode()' Method: Returning an Integer Hash Representation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class HashCodeConceptFoundationsDemo {

    public static class SimpleItem {
        private String itemCode;

        public SimpleItem(String code) { this.itemCode = code; }

        // Custom hashCode() calculation using prime multiplier 31:
        @Override
        public int hashCode() {
            int result = 17;
            result = 31 * result + (itemCode != null ? itemCode.hashCode() : 0);
            return result;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE hashCode() METHOD FOUNDATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SimpleItem item1 = new SimpleItem("BKP-LAPTOP-01");
        SimpleItem item2 = new SimpleItem("BKP-LAPTOP-01");

        System.out.println(">>> 1. Integer HashCode values:");
        System.out.println("  item1.hashCode() -> " + item1.hashCode());
        System.out.println("  item2.hashCode() -> " + item2.hashCode());

        System.out.println("\n>>> Why prime number 31 is traditionally used in hash algorithms:");
        System.out.println("  1. 31 is an odd prime, reducing hash bucket collisions.");
        System.out.println("  2. Modern JVMs optimize '31 * i' into '(i << 5) - i' (Fast bit-shift subtraction!).");

        System.out.println("\n==========================================================================");
    }
}