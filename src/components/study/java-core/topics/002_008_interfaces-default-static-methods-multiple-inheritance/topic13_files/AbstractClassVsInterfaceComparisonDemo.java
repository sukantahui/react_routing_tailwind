/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 13: Abstract Class vs Interface: Comprehensive Comparison
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class AbstractClassVsInterfaceComparisonDemo {

    // 1. ABSTRACT CLASS: Encapsulates mutable instance state + constructors
    public abstract static class BaseDevice {
        protected String serialNumber; // Mutable instance field
        public BaseDevice(String serial) { this.serialNumber = serial; } // Constructor!
        public abstract void powerOn();
    }

    // 2. INTERFACE: Pure behavioral contract + multiple inheritance of type
    public interface NetworkConnectable {
        String DEFAULT_PROTOCOL = "TLS 1.3"; // Strictly public static final constant!
        void connectToWifi(String ssid); // Abstract contract
    }

    // 3. Child Class combining both:
    public static class SmartWorkstation extends BaseDevice implements NetworkConnectable {
        public SmartWorkstation(String serial) { super(serial); }

        @Override
        public void powerOn() {
            System.out.println("  [HARDWARE] Smart Workstation booted: " + serialNumber);
        }

        @Override
        public void connectToWifi(String ssid) {
            System.out.printf("  [WIFI] Connected to '%s' using %s\n", ssid, DEFAULT_PROTOCOL);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: ABSTRACT CLASS VS INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SmartWorkstation ws = new SmartWorkstation("BKP-WS-NODE-99");
        ws.powerOn();
        ws.connectToWifi("Barrackpore-Academy-Gigabit");

        System.out.println("\n>>> Deciding Factor Guide:");
        System.out.println("  - Choose Abstract Class when: Sharing state (fields) & constructors across related classes.");
        System.out.println("  - Choose Interface when     : Defining a contract/capability across unrelated classes or need multiple inheritance.");

        System.out.println("\n==========================================================================");
    }
}